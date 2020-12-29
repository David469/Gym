<?php

use Illuminate\Http\Request;
use App\Product;

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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::resource('products', 'ProductController');
Route::get('priceup', 'ProductController@indexByPriceUp');
Route::get('pricedown', 'ProductController@indexByPriceDown');

Route::resource('comments', 'CommentController');

Route::post('registration', 'UserController@registration');
Route::post('authorisation', 'UserController@authorisation');
Route::get('users', 'UserController@index');
Route::delete('users/{id}', 'UserController@destroy');
Route::get('users/{id}', 'UserController@show');