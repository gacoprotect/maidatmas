import bca from '@/components/assets/bca.png';
import bni from '@/components/assets/bni.png';
import bri from '@/components/assets/bri.png';
import mandiri from '@/components/assets/mandiri.png';
import permata from '@/components/assets/permata.png';
import InputGroup from '@/components/InputGroup';
import AppLayout from '@/Layout/AppLayout';
import { Bank, Nominal, Siswa } from '@/types';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

interface TopupProps {
    siswa: Siswa;
    nouid: string;
    onClose: () => void;
}

const Topup: React.FC<TopupProps> = ({ siswa, nouid, onClose }) => {
    const banks: Bank[] = [
        { id: 1, title: 'BCA', name: 'bca', logo: bca, payment_type: 'bank_transfer' },
        { id: 2, title: 'BNI', name: 'bni', logo: bni, payment_type: 'bank_transfer' },
        { id: 3, title: 'BRI', name: 'bri', logo: bri, payment_type: 'bank_transfer' },
        { id: 4, title: 'Mandiri', name: 'mandiri', logo: mandiri, payment_type: 'bank_transfer' },
        { id: 5, title: 'Permata', name: 'permata', logo: permata, payment_type: 'bank_transfer' },
    ];

    const nominals: Nominal[] = [
        { id: 1, amount: 50000 },
        { id: 2, amount: 100000 },
        { id: 3, amount: 200000 },
        { id: 4, amount: 500000 },
        { id: 5, amount: 1000000 },
    ];

    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [customNominal, setCustomNominal] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const bank = banks.find((bank) => bank.name === selectedBank);
        const nominalValue = customNominal
            ? parseInt(customNominal)
            : selectedNominal
              ? nominals.find((n) => n.id === selectedNominal)?.amount
              : null;

        if (!bank || !nominalValue || !phoneNumber) {
            setError('Harap lengkapi semua data!');
            setIsLoading(false);
            return;
        }

        if (nominalValue < 10000) {
            setError('Nominal minimal Rp 10.000');
            setIsLoading(false);
            return;
        }

        try {
            const response = router.post(
                route('topup.charge', nouid),
                {
                    bank: bank.name,
                    amount: nominalValue,
                    phone: phoneNumber,
                    nouid: nouid,
                },
                {
                    onSuccess: () => {
                        console.log(response);
                    },
                    onError: (data) => {
                        setError(data?.message || 'Terjadi kesalahan saat memproses pembayaran');
                    },
                },
            );

            
        } catch (err) {
            setError('Terjadi kesalahan saat memproses pembayaran');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout title="Top Up">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => onClose()} className="flex items-center space-x-2">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Topup Saldo</h1>
                </div>

                <div className="p-6">
                    <div className="mb-6 rounded-lg bg-gray-50 p-4">
                        <h2 className="mb-2 text-lg font-semibold">Informasi Siswa</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm text-gray-600">Nama</p>
                                <p className="font-medium">{siswa.namlen}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">NISN</p>
                                <p className="font-medium">{siswa.nis}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Kelas</p>
                                <p className="font-medium">{siswa.kel}</p>
                            </div>
                        </div>
                    </div>
                    {error && <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        {/* Pilih Bank */}
                        <div className="mb-6">
                            <h2 className="mb-3 text-lg font-semibold">Pilih Bank</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {banks.map((bank) => (
                                    <button
                                        key={bank.id}
                                        type="button"
                                        className={`flex flex-col items-center rounded-lg border p-3 ${
                                            selectedBank === bank.name ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                        }`}
                                        onClick={() => setSelectedBank(bank.name)}
                                    >
                                        <img src={bank.logo} alt={bank.name} className="mb-1 h-8" />
                                        <span className="text-sm">{bank.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pilih Nominal */}
                        <div className="mb-6">
                            <h2 className="mb-3 text-lg font-semibold text-primary">Pilih Nominal</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {nominals.map((nominal) => (
                                    <button
                                        key={nominal.id}
                                        type="button"
                                        className={`rounded-lg border p-3 transition-all ${
                                            selectedNominal === nominal.id
                                                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                                : 'border-primary bg-primary-foreground hover:bg-primary-foreground/40'
                                        }`}
                                        onClick={() => {
                                            setSelectedNominal(nominal.id);
                                            setCustomNominal('');
                                        }}
                                    >
                                        <div className="font-medium">Rp {nominal.amount.toLocaleString('id-ID')}</div>
                                    </button>
                                ))}

                                {/* Input Nominal Custom */}
                                <InputGroup
                                    onChange={(value) => {
                                        setCustomNominal(value ? String(value) : '');
                                        setSelectedNominal(null);
                                    }}
                                    name="nominal"
                                    placeholder="Masukkan Nominal Topup Anda"
                                    value={customNominal}
                                    prefix="Rp"
                                    className="col-span-2"
                                    type="number"
                                    min="10000"
                                />
                            </div>
                        </div>

                        {/* Nomor Handphone */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                                Nomor Handphone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full rounded-lg border border-gray-300 p-3"
                                placeholder="Contoh: 081234567890"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        {/* Tombol Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:bg-blue-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Informasi tambahan */}
            <div className="mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-3 text-lg font-semibold">Informasi Penting</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Pastikan nomor handphone yang dimasukkan benar</li>
                    <li>Proses topup membutuhkan waktu 1-5 menit</li>
                    <li>Jika mengalami kendala, hubungi customer service kami</li>
                    <li>Minimal topup Rp 10.000</li>
                </ul>
            </div>
        </AppLayout>
    );
};

export default Topup;
