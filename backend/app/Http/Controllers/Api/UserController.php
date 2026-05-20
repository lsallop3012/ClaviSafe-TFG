<?php

namespace App\Http\Controllers\Api;

use App\Enums\RoleSlug;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /** GET /api/users?q=&page=&perPage=  (admin only) */
    public function index(Request $request)
    {
        $perPage = max(1, min(100, (int) $request->query('perPage', 20)));
        $q = $request->query('q');

        $query = User::query();
        if ($q) {
            $query->where(function ($w) use ($q) {
                $w->where('name', 'like', "%{$q}%")
                  ->orWhere('email', 'like', "%{$q}%");
            });
        }

        $paginator = $query->paginate($perPage);

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'page'       => $paginator->currentPage(),
                'perPage'    => $paginator->perPage(),
                'total'      => $paginator->total(),
                'totalPages' => $paginator->lastPage(),
            ],
        ]);
    }

    /** GET /api/users/{user} — public profile */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /** PUT /api/users/{user} — self OR admin */
    public function update(Request $request, User $user)
    {
        $me = $request->user();
        if ($me->id !== $user->id && !$me->isAdmin()) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $rules = [
            'name'   => ['sometimes', 'string', 'max:255', 'unique:users,name,' . $user->id],
            'email'  => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'bio'    => ['sometimes', 'nullable', 'string', 'max:500'],
            'avatar' => ['sometimes', 'nullable', 'string'],
            'password' => ['sometimes', 'string', 'min:6'],
        ];
        // Only admins can change roles
        if ($me->isAdmin()) {
            $rules['role'] = ['sometimes', 'in:admin,user'];
        }

        $data = $request->validate($rules);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        if (isset($data['email'])) {
            $data['email'] = strtolower($data['email']);
        }

        // Translate "role" string to role_id
        if (isset($data['role'])) {
            $role = Role::where('slug', $data['role'])->first();
            if ($role) $data['role_id'] = $role->id;
            unset($data['role']);
        }

        $user->update($data);

        return response()->json($user->fresh());
    }

    /** DELETE /api/users/{user} — admin only */
    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response()->json(['message' => "You can't delete yourself."], 400);
        }
        $user->delete();
        return response()->json(['ok' => true]);
    }
}
