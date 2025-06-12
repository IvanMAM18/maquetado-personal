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

    // Embarcaciones
// Embarcaciones
Route::get('/embarcaciones', [App\Http\Controllers\EjemploEmbarcacionController::class, 'index']);
Route::get('/embarcaciones-welcome', [App\Http\Controllers\EjemploEmbarcacionController::class, 'indexWelcome']);
Route::get('/embarcaciones-admin', [App\Http\Controllers\EjemploEmbarcacionController::class, 'indexAdmin']);
Route::get('/embarcaciones-dashboard', [App\Http\Controllers\EjemploEmbarcacionController::class, 'indexDashboard']);
Route::get('/embarcaciones-data', [App\Http\Controllers\EjemploEmbarcacionController::class, 'getDataAll']);
Route::get('/embarcaciones-excel', [App\Http\Controllers\EjemploEmbarcacionController::class, 'createXLS']);
Route::post('/embarcaciones-store', [App\Http\Controllers\EjemploEmbarcacionController::class, 'store']);
Route::put('/embarcaciones-update/{id}', [App\Http\Controllers\EjemploEmbarcacionController::class, 'update']);
Route::delete('/embarcaciones-delete/{id}', [App\Http\Controllers\EjemploEmbarcacionController::class, 'destroy']);
Route::post('/cambiar-estado-embarcacion/{id}', [App\Http\Controllers\EjemploEmbarcacionController::class, 'sendStatusEmail']);


    // Rutas para embarcaciones
    Route::prefix('/embarcaciones')->group(function() {
        // Vistas
        // Route::get('/', [App\Http\Controllers\EmbarcacionController::class, 'index']);
        // Route::get('/admin', [App\Http\Controllers\EmbarcacionController::class, 'indexAdmin']);
        
        // Operaciones CRUD
        Route::get('/', [App\Http\Controllers\EmbarcacionController::class, 'all']); // Listar todas
        Route::get('/data', [App\Http\Controllers\EmbarcacionController::class, 'getDataAll']); // Datos completos con relaciones
        Route::get('/{id}', [App\Http\Controllers\EmbarcacionController::class, 'find']); // Obtener una específica
        Route::post('/registro', [App\Http\Controllers\EmbarcacionController::class, 'registroEmbarcacion']); // Crear
        Route::put('/{id}', [App\Http\Controllers\EmbarcacionController::class, 'update']); // Actualizar
        Route::delete('/{id}', [App\Http\Controllers\EmbarcacionController::class, 'destroy']); // Eliminar
        
        // Exportaciones
        Route::get('/export/csv', [App\Http\Controllers\EmbarcacionController::class, 'obtenerCSVRegistrados']);
        Route::get('/export/excel', [App\Http\Controllers\EmbarcacionController::class, 'createXLS']);
        
        // Servicios (si necesitas exponerlos)
        Route::get('/servicios/listado', function() {
            return response()->json(App\Http\Controllers\EmbarcacionController::$servicios);
        });
    });
});

Route::get('/user', [App\Http\Controllers\UserController::class, 'self']);


Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);