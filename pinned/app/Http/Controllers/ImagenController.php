<?php

namespace App\Http\Controllers;
use App\Models\Imagen;
use App\Services\ImagenService;
use Illuminate\Http\Request;

class ImagenController extends Controller
{
    protected $imagenService;

    public function __construct(ImagenService $imagenService)
    {
        $this->imagenService = $imagenService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $imagen = Imagen::all();
        // también funciona el método return $image;
        return $imagen -> toJson();
    }

    /**
     * Show the form for creating a new resource.
     */

    // $this->imagenService->crearImagen($validate);

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Imagen $imagen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Imagen $imagen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Imagen $imagen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Imagen $imagen)
    {
        //
    }
}
