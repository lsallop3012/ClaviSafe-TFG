<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RoleSlug;

class Role extends Model
{
<<<<<<< HEAD
    public $timestamps = false;
    
    protected $casts = [
=======
    // No requiere timestamps
    public $timestamps = false;
    
    protected $casts = [
        // Transforma automáticamente el campo 'slug' a la enumeración RoleSlug al acceder a él
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
        'slug' => RoleSlug::class,
    ];
}