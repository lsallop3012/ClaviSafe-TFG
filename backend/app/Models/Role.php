<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RoleSlug;

class Role extends Model
{
    public $timestamps = false;
    
    protected $casts = [
        'slug' => RoleSlug::class,
    ];
}