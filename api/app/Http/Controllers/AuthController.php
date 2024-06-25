<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;



class AuthController extends Controller {

    public function register(Request $request) {
        // return response()->json([$request->all()]);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'secondeName' => 'required|string',
            'email' => 'bail|required|string|unique:users|email',
            'password' => 'bail|required|confirmed|string|min:6',
        ]);
        
        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 401);
        }

        $user = new User([
            'name' => $request->name,
            'secondeName' => $request->secondeName,
            'email'=> $request->email,
            'password' => Hash::make($request->password)
        ]);

        $user->save();
        return response()->json(['message' => "Votre compte a bien ete crée"], 200);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => "Il y'a heu une erreur pendant la connexion"], 400);
        }

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => "L'email ou le mot de passe est incorect"], 401);
        }

        $User = $request->user();
        $tokenResult = $User->createToken('token');
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addDay();
        $token->save();

        return response()->json(['data' => [
            'user' => Auth::user(),
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ]]);

    }

    public function isLoged() {
        if (Auth::check()) {
            return response()->json(['status' => 200]);
        }
    }

    public function deconnection() {
        Auth::user()->tokens->each(function($token) {
            $token->delete();
        });
        return response()->json(['status' => 200, 'message' => "L'utilisateur c'est bien deconnecté", 200]);
    }
}
