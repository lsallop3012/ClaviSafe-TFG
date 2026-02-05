<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ImagenController;

Route::get('/imagenes', [ImagenController::class, 'index']);