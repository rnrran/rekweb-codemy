<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware(['auth'])->group(function () {
    Route::get('/', [ArticleController::class, 'index'])->name('articles.index');  // Daftar artikel
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');  // Form buat artikel
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');  // Simpan artikel
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');  // Form edit artikel
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');  // Update artikel
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');  // Hapus artikel
});

// Route::resource('articles', ArticleController::class);
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');  // Daftar artikel
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');