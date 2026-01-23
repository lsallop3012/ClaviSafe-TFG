<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    /**
     * Atributos de la tabla Imagen.
     *
     * @var list<string>
     */
    protected $fillable = [
        'url',
        'nombre',
        'descripcion',
        'fecha_subida',
        'user_id',
    ];
}
