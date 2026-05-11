<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Autenticación
        if (Auth::attempt($credentials)) {

            $request->session()->regenerate();
            return redirect()->route('dashboard.index');
        } else {
            return back()->withErrors([
                'email' => 'Incorrect email or password.',
            ]);
        }
    }

    // Logout del usuario
    public function logout()
    {
        Auth::logout();
        return redirect()->route('home.index');
    }
}
