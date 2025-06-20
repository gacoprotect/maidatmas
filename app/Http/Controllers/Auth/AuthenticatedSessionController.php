<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('siswa.index', [
            'nouid' => $request->input('nouid')
        ], absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request, $nouid): RedirectResponse
    {

        Auth::guard('siswa')->logout();
        session()->forget('current_nouid');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }
}
