<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\StudentController;
use App\Models\Absensi;
use App\Providers\Filament\AdminPanelProvider;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::group(['prefix' => 'siswa', 'middleware' => ['auth']],function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('siswa.dashboard');

    Route::post('/absensi', [AbsensiController::class, 'store']);
    Route::get('/absensi', [AbsensiController::class, 'index'])->name('absensi.index');
    Route::put('/absensi/{id}', [AbsensiController::class, 'update']);
    Route::delete('/absensi/{id}', [AbsensiController::class, 'delete']);

    Route::get('/jurnalharian', [JurnalController::class, 'index'])->name('jurnal.index');
    Route::put('/jurnalharian/{id}', [JurnalController::class, 'update']);
    Route::post('/jurnalharian', [JurnalController::class, 'store']);
    Route::delete('/jurnalharian/{id}', [JurnalController::class, 'delete']);
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
