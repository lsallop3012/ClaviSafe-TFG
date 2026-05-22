<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function list()
    {
        return User::all();
    }

    public function create(array $data): User
    {
        $user = User::create($data);
        return $user;
    }

    public function update(User $user, array $data): User
    {
        $user->update($data);
        return $user;
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
