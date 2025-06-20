import { Modal } from '@/components/ui/Modal';
import { maskPhoneNumber } from '@/lib/utils';
import { Siswa } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const SetupPinPage = ({ setHasPined, hasPin, open, onClose }: { setHasPined: () => void; hasPin: boolean; open: boolean; onClose: () => void }) => {
    const { siswa, message, errors, nouid } = usePage<{ message: string; siswa: Siswa; errors: Record<string, string>; nouid: string }>().props;
    const [step, setStep] = useState<'phone' | 'otp' | 'pin'>('phone');
    const [countdown, setCountdown] = useState(0);
    const { data, setData, post, processing, reset } = useForm({
        phone: '',
        otp: '',
        pin: '',
        pin_confirmation: '',
    });
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const otpRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const pinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const confirmPinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    // Handle countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = hasPin ? route('siswa.forgot-pin', { nouid: nouid as string }) : route('otp.send', { nouid: nouid as string });
        post(url, {
            onSuccess: () => {
                setStep('otp');
                setCountdown(60);
                if (otpRefs.current[0]) {
                    otpRefs.current[0].focus();
                }
            },
        });
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${nouid}/otp/verify`, {
            onSuccess: () => {
                setStep('pin');
                if (pinRefs.current[0]) {
                    pinRefs.current[0].focus();
                }
            },
        });
    };

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${nouid}/setup-pin`, {
            onSuccess: () => {
                onClose();
                setHasPined();
                reset();
                setStep('phone');
            },
        });
    };

    const resendOtp = () => {
        post(`/${nouid}/otp/send`, {
            onSuccess: () => {
                setCountdown(60);
            },
        });
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, '');

        // Update OTP value
        const newOtp = data.otp.split('');
        newOtp[index] = value.charAt(value.length - 1) || '';
        setData('otp', newOtp.join(''));

        // Auto focus next input if there's a value
        if (value && index < 5 && otpRefs.current[index + 1]) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handlePinChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: 'pin' | 'pin_confirmation',
        refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    ) => {
        const value = e.target.value.replace(/\D/g, '');

        // Update pin value
        const newPin = data[field].split('');
        newPin[index] = value.charAt(value.length - 1) || '';
        setData(field, newPin.join(''));

        // Auto focus next input if there's a value
        if (value && index < 5 && refs.current[index + 1]) {
            refs.current[index + 1]?.focus();
        }

        // Auto switch to confirmation field when PIN is complete
        if (field === 'pin' && newPin.join('').length === 6 && confirmPinRefs.current[0]) {
            confirmPinRefs.current[0]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, refs: React.MutableRefObject<(HTMLInputElement | null)[]>) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !data.otp[index] && index > 0 && refs.current[index - 1]) {
            refs.current[index - 1]?.focus();
        }
    };

    const renderPhoneStep = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-center text-2xl font-bold text-gray-900">
                    {hasPin ? 'Masukkan Nomor HP Anda yang terdaftar' : 'Daftarkan Nomor HP Anda'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Kami akan mengirimkan kode OTP ke nomor ini <br />
                    {maskPhoneNumber(siswa.tel ?? '')}
                </p>
            </div>

            {errors.phone && <div className="text-center text-sm text-red-500">{errors.phone}</div>}

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Nomor Handphone
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">+62</span>
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            className="block w-full rounded-md border border-gray-300 py-2 pl-12 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="8123456789"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value.replace(/\D/g, ''))}
                            required
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing || data.phone.length < 10}
                        className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                            data.phone.length >= 10 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'cursor-not-allowed bg-gray-400'
                        } focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                    >
                        {processing ? 'Mengirim OTP...' : 'Kirim Kode OTP'}
                    </button>
                </div>
            </form>
        </div>
    );

    const renderOtpStep = () => (
        <div className="space-y-6">
            <button onClick={() => setStep('phone')} className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <ArrowLeftIcon className="mr-1 h-4 w-4" />
                Kembali
            </button>

            <div>
                <h2 className="text-center text-2xl font-bold text-gray-900">Verifikasi OTP</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Masukkan 6 digit kode OTP yang dikirim ke +62{data.phone}</p>
            </div>

            {errors && <div className="text-center text-sm text-red-500">{errors.message}</div>}

            <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center space-x-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                otpRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            maxLength={1}
                            required
                            autoComplete="off"
                            className={`h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${
                                errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                            value={data.otp[index] || ''}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index, otpRefs)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                <div className="text-center">
                    {countdown > 0 ? (
                        <p className="text-sm text-gray-500">Kirim ulang OTP dalam {countdown} detik</p>
                    ) : (
                        <button type="button" onClick={resendOtp} className="text-sm text-blue-600 hover:text-blue-800">
                            Kirim Ulang OTP
                        </button>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing || data.otp.length !== 6}
                        className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                            data.otp.length === 6 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'cursor-not-allowed bg-gray-400'
                        } focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                    >
                        {processing ? 'Memverifikasi...' : 'Verifikasi'}
                    </button>
                </div>
            </form>
        </div>
    );

    const renderPinStep = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-center text-2xl font-bold text-gray-900">Buat PIN 6 Digit Baru</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Untuk keamanan akun Anda</p>
            </div>

            {(errors.pin || errors.pin_confirmation) && (
                <div className="text-center text-sm text-red-500">{errors.pin || errors.pin_confirmation}</div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="pin" className="mb-2 block text-center text-sm font-medium text-gray-700">
                            Masukkan PIN Baru
                        </label>
                        <div className="flex justify-center space-x-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        pinRefs.current[index] = el;
                                    }}
                                    type={inputType}
                                    inputMode="numeric"
                                    pattern="[0-9]"
                                    maxLength={1}
                                    required
                                    autoComplete="off"
                                    className={`h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${
                                        errors.pin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    value={data.pin[index] || ''}
                                    onChange={(e) => handlePinChange(e, index, 'pin', pinRefs)}
                                    onKeyDown={(e) => handleKeyDown(e, index, pinRefs)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="pin_confirmation" className="mb-2 block text-center text-sm font-medium text-gray-700">
                            Konfirmasi PIN Baru
                        </label>
                        <div className="flex justify-center space-x-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        confirmPinRefs.current[index] = el;
                                    }}
                                    type={inputType}
                                    inputMode="numeric"
                                    pattern="[0-9]"
                                    maxLength={1}
                                    required
                                    autoComplete="off"
                                    className={`h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${
                                        errors.pin_confirmation
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    value={data.pin_confirmation[index] || ''}
                                    onChange={(e) => handlePinChange(e, index, 'pin_confirmation', confirmPinRefs)}
                                    onKeyDown={(e) => handleKeyDown(e, index, confirmPinRefs)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                            onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                        >
                            {inputType === 'password' ? (
                                <>
                                    <EyeIcon className="mr-1 h-4 w-4" />
                                    Tampilkan PIN
                                </>
                            ) : (
                                <>
                                    <EyeOffIcon className="mr-1 h-4 w-4" />
                                    Sembunyikan PIN
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing || data.pin.length !== 6 || data.pin !== data.pin_confirmation}
                        className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                            data.pin.length === 6 && data.pin === data.pin_confirmation
                                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                : 'cursor-not-allowed bg-gray-400'
                        } focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan PIN'}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <Modal isOpen={open} onClose={onClose}>
            <div className="flex items-center justify-center">
                <Head title={step === 'phone' ? 'Daftar Nomor HP' : step === 'otp' ? 'Verifikasi OTP' : 'Buat PIN'} />

                <div className="w-full max-w-md rounded-lg">
                    {message && (
                        <div className={`mb-4 text-center text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`}>
                            {message}
                        </div>
                    )}

                    {step === 'phone' && renderPhoneStep()}
                    {step === 'otp' && renderOtpStep()}
                    {step === 'pin' && renderPinStep()}
                </div>
            </div>
        </Modal>
    );
};

export default SetupPinPage;
