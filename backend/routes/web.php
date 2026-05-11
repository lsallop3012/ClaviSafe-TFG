<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\SavedImagesController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Home y static pages
Route::get('/', [HomeController::class, 'index'])->name('home.index');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::resource('images', ImageController::class);
});
