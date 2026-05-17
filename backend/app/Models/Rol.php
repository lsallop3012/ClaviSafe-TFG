<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\RolSlug;

class Rol extends Model
{
    use HasFactory;
    // No timestamps required
    public $timestamps = false;

    protected $casts = [
        'slug' => RolSlug::class,
    ];
}
