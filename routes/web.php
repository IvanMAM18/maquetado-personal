<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/entrar', function () {
    return view('auth.login');
})->name('entrar');

Route::post('/entrar', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('entrar');

Route::middleware(['auth','roles'])->group(function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/home/{any}', [App\Http\Controllers\HomeController::class, 'index'])
         ->where('any', '.*');
    
    // Rutas para embarcaciones

    
    Route::prefix('/embarcaciones')->group(function() {
        Route::get('/data', [App\Http\Controllers\EmbarcacionController::class, 'getDataAll']);
        Route::get('/find/{id}', [App\Http\Controllers\EmbarcacionController::class, 'find']);
        Route::post('/registro', [App\Http\Controllers\EmbarcacionController::class, 'registroEmbarcacion']);
        Route::put('/update/{id}', [App\Http\Controllers\EmbarcacionController::class, 'update']);
        Route::delete('/delete/{id}', [App\Http\Controllers\EmbarcacionController::class, 'destroy']);
        Route::get('/csv', [App\Http\Controllers\EmbarcacionController::class, 'obtenerCSVRegistrados']);
        Route::get('/excel', [App\Http\Controllers\EmbarcacionController::class, 'createXLS']);
    });
});

Route::get('/user', [App\Http\Controllers\UserController::class, 'self']);


Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);