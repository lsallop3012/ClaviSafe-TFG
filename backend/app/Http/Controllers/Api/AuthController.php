<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credenciales = $request->only('email', 'password');

        if (Auth::attempt($credenciales)) {
            $user = Auth::user();
            /** @var \App\Models\User $user */
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
    }
}
