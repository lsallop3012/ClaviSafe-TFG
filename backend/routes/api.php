<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\UserController;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
    Route::post('/google',   [AuthController::class, 'google']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users',          [UserController::class, 'index']);
    Route::get('/users/{user}',   [UserController::class, 'show']);
    Route::put('/users/{user}',   [UserController::class, 'update']);
    Route::patch('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}',[UserController::class, 'destroy']);

    Route::apiResource('boards', BoardController::class);
    Route::get('/boards/{board}/images',    [BoardController::class, 'listImages']);
    Route::post('/boards/{board}/images',   [BoardController::class, 'addImage']);
    Route::delete('/boards/{board}/images', [BoardController::class, 'removeImage']);

    Route::apiResource('images', ImageController::class);
    Route::post('/images/{image}/like', [ImageController::class, 'toggleLike']);
    Route::post('/images/{image}/save', [ImageController::class, 'toggleSave']);

    Route::get('/images/{image}/comments',  [CommentController::class, 'listForImage']);
    Route::post('/images/{image}/comments', [CommentController::class, 'storeForImage']);
    Route::delete('/comments/{comment}',    [CommentController::class, 'destroy']);
});
