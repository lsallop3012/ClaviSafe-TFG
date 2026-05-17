<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ImageService;

class ImageController extends Controller
{
    public function index(ImageService $imageService)
    {
        $imagenes = $imageService->list();
        return response()->json($imagenes);
    }
    public function store(Request $request, ImageService $imageService)
    {
        $nombre = $request->input("name");
        $url = $request->input("url");
        $descripcion = $request->input("description");
        $fecha_subida = $request->input("upload_date");
        $user_id = $request->input("user_id");

        $imageService->create(['name' => $nombre, 'url' => $url, 'description' => $descripcion, 'upload_date' => $fecha_subida, 'user_id' => $user_id]);

        return response()->json(['message' => 'Imagen created correctly'], 201);
    }
}
