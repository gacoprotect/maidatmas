<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Indentitas;
use App\Models\Siswa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class PasswordResetLinkController extends Controller
{
    /**
     * Maximum attempts for reset requests
     */
    const MAX_ATTEMPTS = 3;
    
    /**
     * Decay minutes for rate limiting
     */
    const DECAY_MINUTES = 15;

    /**
     * Show the password reset link request view.
     */
    public function create(Request $request, $nouid): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'nouid' => $nouid,
            'status' => session('status'),
            'errors' => session('errors')?->getBag('default')->getMessages(),
            'remainingAttempts' => $this->remainingAttempts($request),
            'availableAt' => $this->availableAt($request),
        ]);
    }

    /**
     * Handle an incoming password reset link request using phone number.
     */
    public function store(Request $request, $nouid): RedirectResponse
    {
        // Apply rate limiting
        $this->ensureIsNotRateLimited($request);

        $request->validate([
            'phone' => [
                'required',
                'string',
                'regex:/^[0-9]+$/',
                'min:10',
                'max:15',
                function ($attribute, $value, $fail) use ($nouid) {
                    $formattedPhone = $this->formatPhoneNumber($value);
                    $exists = Indentitas::where('nouid', $nouid)
                        ->whereHas('siswa', function($query) use ($formattedPhone) {
                            $query->where('tel', $formattedPhone);
                        })
                        ->exists();
                    
                    if (!$exists) {
                        $fail('Nomor telepon tidak terdaftar untuk ID ini');
                    }
                }
            ],
        ]);

        try {
            $indentitas = Indentitas::where('nouid', $nouid)->firstOrFail();
            $siswa = $indentitas->siswa()->firstOrFail();

            // Generate reset token with expiration
            $token = Password::createToken($siswa);
            $resetUrl = route('password.reset', [
                'token' => $token,
                'nouid' => $nouid,
                'phone' => $this->formatPhoneNumber($request->phone)
            ]);

            // Log the reset attempt
            Log::info('Reset PIN requested', [
                'nouid' => $nouid,
                'phone' => $siswa->tel,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'time' => now()->toDateTimeString()
            ]);

            // Send via WhatsApp
            $message = "🔐 *Reset PIN* 🔐\n\n" .
                       "Anda meminta reset PIN untuk akun Anda.\n\n" .
                       "Klik link berikut untuk reset PIN:\n" .
                       "{$resetUrl}\n\n" .
                       "*Link ini berlaku 60 menit.*\n\n" .
                       "Jika Anda tidak meminta ini, abaikan pesan ini.";

            $response = Http::timeout(15)
                ->retry(3, 1000)
                ->post(env('API_WA'), [
                    'number' => $siswa->tel,
                    'pesan' => $message,
                    'idclient' => env('WA_CLIENT_ID', '13')
                ]);

            if (!$response->successful()) {
                throw new \Exception('Failed to send WhatsApp message');
            }

            // Clear rate limiter on success
            RateLimiter::clear($this->throttleKey($request));

            return back()->with('status', 'Link reset PIN telah dikirim ke WhatsApp Anda. Cek pesan masuk Anda.');

        } catch (\Exception $e) {
            Log::error('Reset PIN error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
                'nouid' => $nouid
            ]);
            
            // Hit rate limiter on failure
            RateLimiter::hit($this->throttleKey($request));

            return back()->withErrors(['phone' => 'Gagal mengirim link reset. Silakan coba lagi nanti.']);
        }
    }

    /**
     * Format phone number to standard format (62xxxxxxxxxx)
     */
    protected function formatPhoneNumber($number): string
    {
        $number = preg_replace('/[^0-9]/', '', $number);

        if (str_starts_with($number, '0')) {
            return '62' . substr($number, 1);
        }

        if (!str_starts_with($number, '62')) {
            return '62' . $number;
        }

        return $number;
    }

    /**
     * Ensure the request is not rate limited.
     */
    protected function ensureIsNotRateLimited(Request $request): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey($request), self::MAX_ATTEMPTS)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'phone' => [
                'Terlalu banyak permintaan reset. Silakan coba lagi dalam ' . 
                Carbon::now()->addSeconds($seconds)->diffForHumans(null, true) . '.'
            ],
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    protected function throttleKey(Request $request): string
    {
        return Str::transliterate(Str::lower($request->ip()) . '|' . $request->nouid);
    }

    /**
     * Get remaining attempts
     */
    protected function remainingAttempts(Request $request): int
    {
        return RateLimiter::remainingAttempts(
            $this->throttleKey($request),
            self::MAX_ATTEMPTS
        );
    }

    /**
     * Get available at timestamp
     */
    protected function availableAt(Request $request): ?int
    {
        if (RateLimiter::tooManyAttempts($this->throttleKey($request), self::MAX_ATTEMPTS)) {
            return RateLimiter::availableIn($this->throttleKey($request));
        }

        return null;
    }
}