<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    /*
    |--------------------------------------------------------------------------
    | Anon
    |--------------------------------------------------------------------------
    */
    Route::post('/login',    [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

    Route::get('/images',                [ImageController::class, 'index'])->name('images.index');
    Route::get('/images/{image}',        [ImageController::class, 'show'])->name('images.show');
    Route::get('/boards',                [BoardController::class, 'index'])->name('boards.index');
    Route::get('/boards/{board}',        [BoardController::class, 'show'])->name('boards.show');
    Route::get('/boards/{board}/images', [BoardController::class, 'listImages'])->name('boards.images.index');

    /*
    |--------------------------------------------------------------------------
    | User (auth:sanctum)
    |--------------------------------------------------------------------------
    */
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me',      [AuthController::class, 'me'])->name('auth.me');
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');

        Route::post('/images/{image}/like', [ImageController::class, 'toggleLike'])->name('images.like');
        Route::post('/boards',              [BoardController::class, 'store'])->name('boards.store');
        Route::post('/boards/{board}/save', [BoardController::class, 'saveImage'])->name('boards.save');

        // Self-service profile update (any authed user can edit own profile)
        Route::match(['put', 'patch'], '/users/{user}', [UserController::class, 'update'])
            ->name('users.update');
    });

    /*
    |--------------------------------------------------------------------------
    | Admin (auth:sanctum + admin)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::apiResource('users',  UserController::class)->except(['update']);
        Route::apiResource('images', ImageController::class)->except(['index', 'show']);
        Route::apiResource('boards', BoardController::class)->except(['index', 'show']);
    });
});
