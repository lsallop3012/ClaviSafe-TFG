<?php

namespace App\Services;
use App\Models\Imagen;

class ImagenService
{
    /*
        Crea una imagen con los datos proporcionados
    */
    public function crearImagen(array $datos): Imagen
    {
        return Imagen::create($datos);
    }
}