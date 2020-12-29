<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->input('name')!='hello')
        {
            return response()->json(['errors'=>'api_token Пользователь не авторизован'], 201);
        }
        return $next($request);
    }
}
