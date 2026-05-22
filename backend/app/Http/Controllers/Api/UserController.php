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

    public function show(User $user)
    {
        return response()->json($user);
    }

    /** POST /api/users  (admin only — creates a user) */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255', 'unique:users,name'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'bio'      => ['nullable', 'string', 'max:500'],
            'avatar'   => ['nullable', 'string'],
            'role'     => ['sometimes', 'in:admin,user'],
        ]);

        $data['email']    = strtolower($data['email']);
        $data['password'] = Hash::make($data['password']);

        $roleSlug = $data['role'] ?? RoleSlug::USER->value;
        unset($data['role']);

        $role = Role::where('slug', $roleSlug)->first();
        $data['role_id'] = $role?->id;

        $user = User::create($data);

        return response()->json($user->fresh(), 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
        'name'     => ['sometimes', 'string', 'max:255', 'unique:users,name,' . $user->id],
        'email'    => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
        'bio'      => ['sometimes', 'nullable', 'string', 'max:500'],
        'avatar'   => ['sometimes', 'nullable', 'string'],
        'password' => ['sometimes', 'string', 'min:6'],
        'role'     => ['sometimes', 'in:admin,user'],
    ]);

    if (isset($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    }
    if (isset($data['email'])) {
        $data['email'] = strtolower($data['email']);
    }
    if (isset($data['role'])) {
        $role = Role::where('slug', $data['role'])->first();
        if ($role) {
            $data['role_id'] = $role->id;
        }
        unset($data['role']);
    }

    $user->update($data);
    return response()->json($user->fresh());
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
        return response()->json(['message' => "You can't delete yourself."], 400);
        }
        $user->delete();
        return response()->json(['ok' => true]);
    }
}
