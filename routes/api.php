<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', 'UserController')->only(['index']);
Route::apiResource('users.appointments', 'AppointmentController')->shallow();

// Route::apiResource('dashboard', 'DashboardController')->only(['index']);

Route::get('dashboard', 'DashboardController@index');
Route::get('time-left/{appointmentId}', 'DashboardController@timeLeft');
