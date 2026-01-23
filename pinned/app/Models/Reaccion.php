<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaccion extends Model
{
    /**
     * Atributos de la tabla Reacción.
     *
     * @var list<string>
     */
    protected $fillable = [
        'contenido',
        'user_id',
        'imagen_id',    ];
}
