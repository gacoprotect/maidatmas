<?php

namespace App\Http\Middleware;

use App\Models\Indentitas;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyNouid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $nouid = $request->route('nouid');
        
        if (!Indentitas::where('nouid', $nouid)->exists()) {
            abort(404);
        }

        if (Auth::guard('siswa')->check() && session('current_nouid') !== $nouid) {
            Auth::guard('siswa')->logout();
            session()->forget('current_nouid');

            return redirect()->route('siswa.index', ['nouid' => $nouid])
                ->with('error', 'Sesi tidak valid, silakan login kembali');
        }
        return $next($request);
    }
}
