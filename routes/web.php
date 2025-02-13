<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::group(['prefix' => 'siswa', 'middleware' => ['auth']], function () {
    // Dashboard Siswa
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('siswa.dashboard');

    // Rute Absensi
    Route::prefix('absensi')->group(function () {
        Route::get('/', [AbsensiController::class, 'index'])->name('absensi.index');
        Route::post('/', [AbsensiController::class, 'store']);
        Route::put('/{id}', [AbsensiController::class, 'update']);
        Route::delete('/{id}', [AbsensiController::class, 'delete']);
    });

    // Rute Jurnal
    Route::prefix('jurnalharian')->group(function () {
        Route::get('/', [JurnalController::class, 'index'])->name('jurnal.index');
        Route::post('/', [JurnalController::class, 'store']);
        Route::put('/{id}', [JurnalController::class, 'update']);
        Route::delete('/{id}', [JurnalController::class, 'delete']);
    });
});




Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
