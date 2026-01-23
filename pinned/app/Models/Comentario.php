<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    /**
     * Atributos de la tabla Comentario.
     *
     * @var list<string>
     */
    protected $fillable = [
        'contenido',
        'user_id',
        'imagen_id',
    ];
}
