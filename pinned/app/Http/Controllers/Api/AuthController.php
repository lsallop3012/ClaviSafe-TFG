<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Procesa el login del usuario
    public function login(Request $request)
    {
        $credenciales = $request->only('email', 'password');

        // Busca el usuario y lo autentica
        if (Auth::attempt($credenciales)) {
            // Token de autenticación para API
            $user = Auth::user();
            /** @var User $user */
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token]);
        } else {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
    }

    
}
