<?php

namespace App\Http\Controllers\Api;

use App\Enums\RoleSlug;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        // Acepta email o username en el campo "email"
        $login = strtolower(trim($data['email']));
        $user  = User::whereRaw('LOWER(email) = ?', [$login])
            ->orWhereRaw('LOWER(name) = ?', [$login])
            ->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => ['sometimes', 'string', 'max:255', 'unique:users,name'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $userRole = Role::where('slug', RoleSlug::USER->value)->first();

        // Si el frontend no envía name, se genera a partir del email
        $name = !empty($data['name'])
            ? trim($data['name'])
            : explode('@', strtolower($data['email']))[0];

        $user = User::create([
            'name'     => $name,
            'email'    => strtolower($data['email']),
            'password' => Hash::make($data['password']),
            'role_id'  => $userRole?->id,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user->fresh(),
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();
        return response()->json(['ok' => true]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
