<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Muestra la vista con el formulario de login
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // Procesa el login del usuario
    public function login(Request $request)
    {
        $credenciales = $request->only('email', 'password');

        // Busca el usuario y lo autentica
        if (Auth::attempt($credenciales)) {
            // Regenerar la sesión para evitar fijación de sesión
            $request->session()->regenerate();
            return redirect()->route('dashboard.index');
        } else {
            return back()->withErrors([
                'email' => 'Inicio de sesión fallido',
            ]);
        }
    }

    // Procesa el logout del usuario
    public function logout()
    {
        Auth::logout();
        return redirect()->route('home.index');
    }
}
