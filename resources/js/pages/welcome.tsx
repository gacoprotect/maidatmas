import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaWallet, FaMoneyBillWave, FaShieldAlt, FaQrcode, FaSchool, FaUserGraduate, FaUserShield, FaHistory } from 'react-icons/fa';
import bca from '@/components/assets/bca.png'
import bri from '@/components/assets/bri.png'
import bni from '@/components/assets/bni.png'
import mandiri from '@/components/assets/mandiri.png'
import permata from '@/components/assets/permata.png'
import { MdPayment, MdAccountBalance, MdNotifications } from 'react-icons/md';

export default function Welcome() {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Head title="SchoolPay - Dompet Digital Sekolah" />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-24 px-4 sm:px-6 lg:px-8 shadow-lg">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-md">
                            <FaWallet className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
                            SchoolPay Indonesia
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Solusi pembayaran digital terintegrasi untuk sekolah di Indonesia
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild variant="secondary" size="lg" className="shadow-md hover:shadow-lg transition-all">
                                <Link href="/a70c1330">Coba Sekarang</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                                <Link href="#payment-methods">Metode Pembayaran</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fitur Utama */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Fitur Unggulan</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Membantu manajemen keuangan sekolah lebih efisien dan transparan
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 shadow-md">
                                <FaMoneyBillWave className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white">Pembayaran Sekolah</h3>
                        </CardHeader>
                        <CardContent className="text-center text-gray-200">
                            Bayar SPP, uang gedung, seragam, dan kebutuhan sekolah lainnya secara digital tanpa ribet.
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 shadow-md">
                                <FaQrcode className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white">Transaksi Kantin</h3>
                        </CardHeader>
                        <CardContent className="text-center text-gray-200">
                            Belanja di kantin sekolah cukup scan QR Code tanpa perlu bawa uang cash.
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200/50">
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 shadow-md">
                                <FaShieldAlt className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white">Keamanan Transaksi</h3>
                        </CardHeader>
                        <CardContent className="text-center text-gray-200">
                            Sistem keamanan berlapis dengan verifikasi OTP untuk setiap transaksi.
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Metode Pembayaran */}
            <div id="payment-methods" className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Metode Pembayaran</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Top up saldo menggunakan metode pembayaran digital populer di Indonesia
                        </p>
                    </div>

                    <div className="space-y-12">
                                                {/* Transfer Bank */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Transfer Bank</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                                {[
                                    { logo: bca, name: "BCA", alt: "Bank Central Asia" },
                                    { logo: bri, name: "BRI", alt: "Bank Rakyat Indonesia" },
                                    { logo: bni, name: "BNI", alt: "Bank Negara Indonesia" },
                                    { logo: mandiri, name: "Mandiri", alt: "Bank Mandiri" },
                                    { logo: permata, name: "Permata", alt: "Bank Permata" }
                                ].map((bank, index) => (
                                    <div key={index} className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                        <div className="p-2 h-12 flex items-center">
                                            <img 
                                                src={bank.logo} 
                                                alt={bank.alt} 
                                                className="h-full object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium text-gray-700">{bank.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Cara Kerja */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Cara Menggunakan</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Akses dompet digital sekolah Anda dalam 4 langkah mudah
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { icon: <FaUserGraduate className="h-8 w-8" />, step: "1", title: "Login", description: "Gunakan NISN dan password" },
                            { icon: <MdPayment className="h-8 w-8" />, step: "2", title: "Top Up", description: "Isi saldo via metode pembayaran" },
                            { icon: <FaQrcode className="h-8 w-8" />, step: "3", title: "Bayar", description: "Scan QR Code atau input kode pembayaran" },
                            { icon: <FaHistory className="h-8 w-8" />, step: "4", title: "Riwayat", description: "Cek transaksi di menu history" }
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">
                                    {item.step}
                                </div>
                                <div className="mt-4 p-3 rounded-full bg-blue-100 text-blue-600">
                                    {item.icon}
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
                                <p className="mt-2 text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fitur Orang Tua */}
            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-lg text-white">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                                    <FaUserShield className="h-12 w-12" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Kontrol Orang Tua</h2>
                                <p className="mt-4 leading-relaxed">
                                    Orang tua dapat memantau pengeluaran anak, menerima notifikasi real-time, 
                                    dan mengatur limit pengeluaran harian/mingguan melalui aplikasi khusus orang tua.
                                </p>
                                <div className="mt-6">
                                    <Button asChild variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                                        <Link href="/orangtua">Info untuk Orang Tua</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fitur Sekolah */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Manfaat untuk Sekolah</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Sistem terintegrasi yang memudahkan administrasi keuangan sekolah
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <MdAccountBalance className="h-8 w-8 text-blue-600" />, title: "Laporan Otomatis", description: "Pencatatan keuangan otomatis dengan laporan real-time" },
                            { icon: <MdNotifications className="h-8 w-8 text-green-600" />, title: "Notifikasi", description: "Pemberitahuan pembayaran tepat waktu" },
                            { icon: <FaSchool className="h-8 w-8 text-purple-600" />, title: "Manajemen Tagihan", description: "Membuat dan mengelola berbagai jenis tagihan sekolah" }
                        ].map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                                        {feature.icon}
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                                </CardHeader>
                                <CardContent className="text-center text-gray-200">
                                    {feature.description}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl">Siap beralih ke pembayaran digital?</h2>
                    <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
                        Daftarkan sekolah Anda sekarang dan dapatkan kemudahan bertransaksi
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                            <Link href="/demo">Request Demo</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
                            <Link href="/daftar">Daftar Sekolah</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}