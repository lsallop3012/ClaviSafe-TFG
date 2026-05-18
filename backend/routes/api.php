<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/users', [UserController::class, 'index']);

    Route::apiResource('boards', BoardController::class);

    Route::apiResource('images', ImageController::class);
});