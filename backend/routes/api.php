<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    /*
    |--------------------------------------------------------------------------
    | Rutas públicas
    |--------------------------------------------------------------------------
    */
    Route::post('/login',    [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

    /* Rutas públicas - usuario anónimo */
    Route::get('boards', [BoardController::class, 'index'])->name('boards.index');
    Route::get('/boards/{board}/images',    [BoardController::class, 'listImages'])->name('boards.images.index');
    Route::get('/boards/{board}/images/{image}',    [BoardController::class, 'showImage'])->name('boards.images.show');
    
    Route::get('images', [ImageController::class, 'index'])->name('images.index');
    Route::get('/images/{image}', [ImageController::class, 'show'])->name('images.show');
    Route::get('/images/{image}/likes', [ImageController::class, 'likes'])->name('images.likes');

    /*
    |--------------------------------------------------------------------------
    | Rutas autenticadas
    |--------------------------------------------------------------------------
    */
    Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });
        





    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/users',          [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}',   [UserController::class, 'show'])->name('users.show');
        Route::put('/users/{user}',   [UserController::class, 'update'])->name('users.update');
        Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}',[UserController::class, 'destroy'])->name('users.destroy');

        Route::get('boards', [BoardController::class, 'index'])->name('boards.index');
        Route::get('/boards/{board}/images',    [BoardController::class, 'listImages'])->name('boards.images.index');
        Route::post('/boards/{board}/images',   [BoardController::class, 'addImage'])->name('boards.images.create');
        Route::delete('/boards/{board}/images', [BoardController::class, 'removeImage'])->name('boards.images.destroy');

        Route::get('images', [ImageController::class, 'index'])->name('images.index');
        Route::post('/images/{image}/like', [ImageController::class, 'toggleLike'])->name('images.like');
        Route::post('/images/{image}/save', [ImageController::class, 'toggleSave'])->name('images.save');
    });
});