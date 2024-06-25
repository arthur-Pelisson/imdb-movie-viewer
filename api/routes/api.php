<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;

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


Route::get('/', function () {
    return 'Hello World';
});




Route::prefix('auth')->group(function () {  
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('movie')->group(function () {  
    Route::get('/movies', [MovieController::class, 'movies']);
    Route::post('/searchMovie', [MovieController::class, 'searchMovie']);
    Route::get('/getMovieById/{id}', [MovieController::class, 'getMovieById']);
    Route::get('/getGenres', [GenreController::class, 'getgenres']);

});


Route::middleware('auth:api')->group(function () {
    Route::prefix('user')->group(function() {
        Route::post('/addFavoris', [UserController::class, 'addFavoris']);
        Route::get('/getFavoris', [UserController::class, 'getFavoris']);
    });
    
    Route::get('/isLoged', [AuthController::class, 'isLoged']);
    Route::get('/deconnection', [AuthController::class, 'deconnection']);
});


