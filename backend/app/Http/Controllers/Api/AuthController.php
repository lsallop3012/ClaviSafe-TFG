<?php

namespace App\Http\Controllers\Api;

use App\Enums\RoleSlug;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * POST /api/auth/register
     * Body: { name, email, password }
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'min:2', 'max:255', 'unique:users,name'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $userRole = Role::where('slug', RoleSlug::USER->value)->firstOrFail();

        $user = User::create([
            'name'     => $data['name'],
            'email'    => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'role_id'  => $userRole->id,
            'provider' => 'local',
        ]);

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user->fresh(),
        ], 201);
    }

    /**
     * POST /api/auth/login
     * Body: { name, password }  // "name" accepts username OR email
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $identifier = strtolower($data['name']);

        $user = User::where('name', $data['name'])
            ->orWhere('email', $identifier)
            ->first();

        if (!$user || !$user->password || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Username or password incorrect.'], 401);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    /**
     * POST /api/auth/google
     * Body: { email, name, picture, sub, email_verified }
     *
     * Client passes the decoded Google ID token payload. For production you
     * should verify the JWT signature against Google's public keys here
     * (e.g. with the google/apiclient package). For the TFG demo we trust
     * the client (the same way Sanctum trusts the client to send a token).
     */
    public function google(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'sub'   => ['required', 'string'],
            'name'  => ['nullable', 'string'],
            'picture' => ['nullable', 'string'],
            'email_verified' => ['nullable', 'boolean'],
        ]);

        $email = strtolower($data['email']);

        // 1. Already linked by google_sub?
        $user = User::where('google_sub', $data['sub'])->first();

        // 2. Match by email — link existing local account to Google.
        if (!$user) {
            $user = User::where('email', $email)->first();
            if ($user) {
                $user->forceFill([
                    'provider'   => 'google',
                    'google_sub' => $data['sub'],
                    'avatar'     => $user->avatar ?: ($data['picture'] ?? null),
                    'email_verified_at' => $user->email_verified_at ?: now(),
                ])->save();
            }
        }

        // 3. New user.
        if (!$user) {
            $userRole = Role::where('slug', RoleSlug::USER->value)->firstOrFail();
            $base = preg_replace('/[^a-z0-9._-]/', '', strtolower($data['name'] ?? explode('@', $email)[0]));
            $base = substr($base ?: 'user', 0, 24);
            $candidate = $base;
            $n = 2;
            while (User::where('name', $candidate)->exists()) {
                $candidate = $base . $n;
                $n++;
            }
            $user = User::create([
                'name'       => $candidate,
                'email'      => $email,
                'password'   => null,
                'role_id'    => $userRole->id,
                'provider'   => 'google',
                'google_sub' => $data['sub'],
                'avatar'     => $data['picture'] ?? null,
                'email_verified_at' => now(),
            ]);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    /**
     * POST /api/auth/logout (requires Bearer token)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['ok' => true]);
    }

    /**
     * GET /api/auth/me (requires Bearer token)
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
