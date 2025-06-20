import { Head, useForm, usePage } from '@inertiajs/react';
import { FaArrowLeft, FaUnlockAlt } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import { MdError } from 'react-icons/md';


interface ForgotPinPageProps {
    errors: {
        phone?: string;
        [key: string]: unknown;
    };
    flash: {
        status?: string;
        [key: string]: unknown;
    };
    remainingAttempts: number | null;
    availableAt: number;
    [key: string]: unknown; // Add index signature to satisfy PageProps constraint
}

export default function ForgotPin({ nouid }: { nouid: string }) {
    const { errors, flash, remainingAttempts, availableAt } = usePage<ForgotPinPageProps>().props;
    const { data, setData, post, processing } = useForm({
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(`/${nouid}/forgot-pin`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Lupa PIN" />

            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
                <div className="text-center">
                    <FaUnlockAlt className="mx-auto h-12 w-12 text-blue-500" />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Lupa PIN?</h2>
                    <p className="mt-2 text-sm text-gray-600">Masukkan nomor WhatsApp terdaftar untuk mendapatkan link reset</p>
                </div>

                {remainingAttempts !== null && remainingAttempts < 3 && (
                    <div className="rounded-md bg-yellow-50 p-4">
                        <p className="text-sm text-yellow-700">
                            {remainingAttempts > 0
                                ? `Anda memiliki ${remainingAttempts} percobaan tersisa.`
                                : `Terlalu banyak percobaan. Silakan coba lagi dalam ${availableAt} menit.`}
                        </p>
                    </div>
                )}

                {errors.phone && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex items-center">
                            <MdError className="h-5 w-5 text-red-400" />
                            <p className="ml-3 text-sm text-red-700">{errors.phone}</p>
                        </div>
                    </div>
                )}

                {flash.status && (
                    <div className="rounded-md bg-green-50 p-4">
                        <p className="text-sm text-green-700">{flash.status}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Nomor WhatsApp
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            autoFocus
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            disabled={processing || remainingAttempts === 0}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
                        >
                            <FaArrowLeft className="mr-1.5" />
                            Kembali
                        </button>

                        <button
                            type="submit"
                            disabled={processing || remainingAttempts === 0}
                            className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${
                                processing || remainingAttempts === 0 ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {processing ? (
                                <>
                                    <ImSpinner8 className="mr-2 animate-spin" />
                                    Mengirim...
                                </>
                            ) : (
                                'Kirim Link Reset'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
