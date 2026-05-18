<?php

namespace App\Services;

use App\Models\Role;

class RoleService
{
    public function lista()
    {
        return Role::all();
    }
}