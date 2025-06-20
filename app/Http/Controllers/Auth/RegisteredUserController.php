<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Indentitas;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create($nouid): Response
    {
        $indentitas = Indentitas::with('siswa')
            ->where('nouid', $nouid)
            ->firstOrFail();

        return Inertia::render('Auth/Register', [
            'indentitas' => $indentitas
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, $nouid): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        logger('RegisteredUserController', ['request' => $request->all(), 'nouid' => $nouid]);

        $validated = $request->validate([
            'pin' => 'required|digits:6|numeric|confirmed',
            'pin_confirmation' => 'required|digits:6',
            'phone' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        try {
            $indentitas = Indentitas::with('siswa')
                ->where('nouid', $nouid)
                ->firstOrFail();

            if (!$indentitas->siswa) {
                return back()->withErrors(['pin' => 'Data siswa tidak ditemukan']);
            }

            // Update PIN dan nomor telepon
            $indentitas->siswa->update([
                'pin' => $validated['pin'],
                'tel' => $this->formatPhoneNumber($validated['phone']) // Simpan ke kolom tel
            ]);

            event(new Registered($indentitas->siswa));

            Auth::login($indentitas->siswa);
            session(['current_nouid' => $nouid]);

            return redirect()->intended(route('siswa.index', ['nouid' => $nouid]));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            logger()->error('Indentitas not found', ['nouid' => $nouid, 'error' => $e->getMessage()]);
            return back()->withErrors(['pin' => 'Data identitas tidak ditemukan']);
        } catch (\Exception $e) {
            logger()->error('Error saving data', ['error' => $e->getMessage()]);
            return back()->withErrors(['pin' => 'Gagal menyimpan data. Silakan coba lagi.']);
        }
    }
    protected function formatPhoneNumber($number): string
    {
        $number = preg_replace('/[^0-9]/', '', $number);

        // Hilangkan prefix 0 atau 62 jika ada
        if (str_starts_with($number, '0')) {
            $number = substr($number, 1);
        } elseif (str_starts_with($number, '62')) {
            $number = substr($number, 2);
        }

        return '62' . $number;
    }
    public function verifphone(Request $request, $nouid)
    {
        $request->validate([
            'number' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        $phone = $this->formatPhoneNumber($request->number);
        $indentitas = Indentitas::with('siswa')
            ->where('nouid', $nouid)
            ->firstOrFail();


        if (!$indentitas->siswa) {
            return back()->withErrors(['tel' => 'Data siswa tidak ditemukan']);
        }

        //apakah user telah memiliki tel di kolom tel tabel tsiswa?
        if ($indentitas->siswa->tel !== null) {
        }
        // Update tel
        $indentitas->siswa->tel = $phone;
        $indentitas->siswa->save();
    }
}
