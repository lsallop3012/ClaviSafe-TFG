<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RoleSlug;

class Role extends Model
{
    // No requiere timestamps
    public $timestamps = false;
    
    protected $casts = [
        // Transforma automáticamente el campo 'slug' a la enumeración RoleSlug al acceder a él
        'slug' => RoleSlug::class,
    ];
}