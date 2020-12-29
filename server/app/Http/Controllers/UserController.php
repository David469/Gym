<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index() 
    {
        $users = DB::table('users')->paginate(4);

        return response()->json(['users' => $users]);
    }
    
    public function registration(Request $request)
    {
    	$validate=Validator::make($request->all(),
        [
            'name'=>'required',
            'surname'=>'required',
            'email'=>'unique:users|email|required',
            'password'=>'required'      
        ],
        [
        ]);

        if($validate->fails()) {
            return response()->json(['errors'=>$validate->errors()], 200);
        }

    	return User::forceCreate([
        'name' => $request['name'],
        'surname'=>$request['surname'],
        'email' => $request['email'],
        'password' => Hash::make($request['password']),
        'api_token' => Str::random(80),
    	]);
    }

    public function authorisation(Request $request)
    {
        $validate=Validator::make($request->all(),
        [
            'email'=>'email|required|exists:users,email',
            'password'=>'required|'      
        ],
        [
        ]);

        if($validate->fails()) {
            return response()->json(['errors'=>$validate->errors()], 200);
        }

        $user=User::where('email',$request->email)->first();
        $check=Hash::check(
            $request->password,
            $user->password);
        if($check)
        {
            return response()->json(['api_token'=>$user->api_token]);
        }
        else
        {
            return response()->json(['errors'=>['password'=>['Неверный пароль']]], 200);
        }
    }

    public function show($id)
    {
        return response()->json([User::find($id)]);
    }

    public function destroy($id)
    {
        return User::destroy($id);
    }
}
