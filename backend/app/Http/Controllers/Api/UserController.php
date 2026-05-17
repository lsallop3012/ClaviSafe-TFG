<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::with(['rol', 'boards', 'images', 'comments', 'likes'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'rol_id' => ['required', 'exists:roles,id'],
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response($user->load(['rol', 'boards', 'images', 'comments', 'likes']), 201);
    }

    public function show(User $user)
    {
        return $user->load(['rol', 'boards', 'images', 'comments', 'likes']);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['sometimes', 'string', 'min:8'],
            'rol_id' => ['sometimes', 'exists:roles,id'],
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $user->load(['rol', 'boards', 'images', 'comments', 'likes']);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
