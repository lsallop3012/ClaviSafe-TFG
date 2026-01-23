<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    /**
     * Atributos de la tabla Rol.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
    ];
}
