<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function list()
    {
        return User::all();
    }
}
