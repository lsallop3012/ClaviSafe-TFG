<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Imagen;

class ImagenController extends Controller
{
    //
    public function index()
    {
        //
        $imagen = Imagen::all();
        return response()->json($imagen);
    }

    public function store(Request $request)
    {
        //
        $url = $request->input('url');
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $fecha_subida = $request->input('fecha_subida');
        $user_id = $request->input('user_id');  

        $id = Imagen::create([
            'url' => $url,
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'fecha_subida' => $fecha_subida,
            'user_id' => $user_id
        ])->id;

        return Imagen::find($id)->toJson();
    }
}
