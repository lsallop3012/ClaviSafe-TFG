<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\RolSlug;

class Rol extends Model
{
    // No timestamps required
    public $timestamps = false;

    protected $casts = [
        'slug' => RolSlug::class,
    ];
}
