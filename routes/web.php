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
Route::get('/foro-emprendedores-registro', function () {
    return view('welcome');
});
// Route::get('/registro-expo-emprendedores', function () {
//     return view('welcome');
// });

//Rutas anteriores
// Route::post('/registro-expo-emprendedores', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'registroParticipante']);
// Route::get('/dashboard', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index']);
// Route::get('/dashboard_get_registrados', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'all']);
// Route::get('/dashboard_get_registrados_totales', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'numeroDeRegistros']);
// Route::get('/dashboard_get_registrados_csv', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'obtenerCSVRegistrados']);
// Route::get('/dashboard/registros', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index']);

// Rutas para Expo Emprendedores
Route::post('/registro-expo-emprendedores', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'registroParticipante'])->defaults('tipo', 'expo');
Route::get('/dashboard/expo', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index'])->defaults('tipo', 'expo');
Route::get('/dashboard_get_registrados_expo', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'all'])->defaults('tipo', 'expo');
Route::get('/dashboard_get_registrados_totales_expo', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'numeroDeRegistros'])->defaults('tipo', 'expo');
Route::get('/dashboard_get_registrados_csv_expo', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'obtenerCSVRegistrados'])->defaults('tipo', 'expo');
Route::get('/dashboard/registros/expo', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index'])->defaults('tipo', 'expo');

// Rutas para Foro Emprendedores
Route::post('/registro-foro-emprendedores', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'registroParticipante'])->defaults('tipo', 'foro');
Route::get('/dashboard/foro', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index'])->defaults('tipo', 'foro');
Route::get('/dashboard_get_registrados_foro', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'all'])->defaults('tipo', 'foro');
Route::get('/dashboard_get_registrados_totales_foro', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'numeroDeRegistros'])->defaults('tipo', 'foro');
Route::get('/dashboard_get_registrados_csv_foro', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'obtenerCSVRegistrados'])->defaults('tipo', 'foro');
Route::get('/dashboard/registros/foro', [App\Http\Controllers\EmprendedoresParticipantesController::class, 'index'])->defaults('tipo', 'foro');

// Ruta dashboard principal (redirige a expo por defecto)
Route::get('/dashboard', function () {
    return redirect('/dashboard/registros/foro');
});


Route::get('/user', [App\Http\Controllers\UserController::class, 'self']);
//Route::get('/user', [App\Http\Controllers\HomeController::class, 'index']);

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/entrar', function () { return view('auth.login'); });
Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);

Route::post('/entrar', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('entrar');

/*Route::get('/session', function(Illuminate\Http\Request $request) {
    $request->session()->put('test', 'joad');

    return [
        'data' => $request->session()->all(),
        'key' => $request->session()->get('key')
    ];
});*/

/*Route::get('/force-login', function() {
    $token = Auth::attempt([
        'name' => 'Admin',
        'password' => 'SAlpz.'
    ]);

    return ['token' => $token];
});*/