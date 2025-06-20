import { Modal } from '@/components/ui/Modal';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaKey } from 'react-icons/fa';

interface PinFormData {
    pin: string;
    nouid: string;
    [key: string]: string;
}

interface PinPageProps {
    setOpenSetupPin: () => void;
    hasPin: boolean;
    open: boolean;
    onClose: () => void;
}

const PinPage: React.FC<PinPageProps> = ({ setOpenSetupPin, hasPin, open, onClose }) => {
    const { errors, nouid } = usePage<{ errors: Record<string, string>; nouid: string }>().props;
    const { data, setData, post, processing,reset } = useForm<PinFormData>({
        pin: '',
        nouid: nouid ?? '',
    });
    const [inputType, setInputType] = useState<'password' | 'text'>('password');

    const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    // Get nouid from URL path
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const nouidFromUrl = pathParts[1];
        setData('nouid', nouidFromUrl);
    }, [setData]);

    // Focus first input when modal opens
    useEffect(() => {
        if (open && inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(data.pin)) {
            return;
        }

        post(`/${data.nouid}/verify-pin`, {
            preserveState: true,
            onSuccess: () => {
                onClose();
                reset();
            },
            onError: () => {
                setData('pin', '');
                // Refocus first input on error
                if (inputRefs.current[0]) {
                    inputRefs.current[0]?.focus();
                }
            },
        });
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, '');

        // Update pin value
        const newPin = data.pin.split('');
        newPin[index] = value.charAt(value.length - 1) || '';
        setData('pin', newPin.join(''));

        // Auto focus next input if there's a value
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !data.pin[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);

        if (pasteData.length > 0) {
            setData('pin', pasteData);
            // Focus the last input with pasted data
            const focusIndex = Math.min(pasteData.length - 1, 5);
            if (inputRefs.current[focusIndex]) {
                inputRefs.current[focusIndex]?.focus();
            }
        }
    };

    return (
        <Modal title={hasPin ? '' : 'Anda Belum Membuat PIN'} isOpen={open} onClose={onClose}>
            {hasPin ? (
                <div className="flex items-center justify-center">
                    <Head title="Masukkan PIN" />

                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masukkan PIN</h2>
                        </div>

                        {errors.pin && <div className="mb-4 text-center text-sm text-red-500">{errors.pin}</div>}

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="flex justify-center space-x-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type={inputType}
                                        inputMode="numeric"
                                        pattern="[0-9]"
                                        maxLength={1}
                                        required
                                        autoComplete="off"
                                        className="h-12 w-12 rounded-md border border-gray-300 text-center text-2xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        value={data.pin[index] || ''}
                                        onChange={(e) => handlePinChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                    onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                                >
                                    {inputType === 'password' ? 'Tampilkan PIN' : 'Sembunyikan PIN'}
                                </button>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <button
                                    type="submit"
                                    disabled={processing || data.pin.length !== 6}
                                    className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
                                        data.pin.length === 6
                                            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                                            : 'cursor-not-allowed bg-gray-400'
                                    }`}
                                >
                                    {processing ? 'Memverifikasi...' : 'Masuk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center">
                    <p className="max-w-md text-sm">Silakan verifikasi nomor WhatsApp Anda dan buat PIN terlebih dahulu sebelum melanjutkan.</p>
                    <button
                        onClick={setOpenSetupPin}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Buat PIN</span>
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default PinPage;
