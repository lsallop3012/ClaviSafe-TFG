<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RolAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $rol): Response
    {
        $user = Auth::user();

        if ($user->rol->id !== $rol) {
            // Si no cumple el rol, se deniega el acceso
            abort(403);
        }

        // Pasa a evaluar el siguiente middleware (si lo hubiere)
        return $next($request);
    }
}
