<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\TableroController;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth', 'role:admin')->group(function () {
    Route::resource('imagenes', App\Http\Controllers\ImagenController::class);
});


Route::post('/login', AuthController::class, 'login');
Route::get('/imagenes', ImagenController::class, 'index');
Route::get('/tableros', TableroController::class, 'index');
