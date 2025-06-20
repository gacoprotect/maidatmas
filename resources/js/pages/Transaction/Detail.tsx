import { TransactionDetail } from '@/types';
import {
    AlertCircle,
    ArrowDown,
    ArrowUp,
    Banknote,
    CheckCircle,
    Clock,
    Copy,
    CreditCard,
    Landmark,
    Share2,
    ShoppingCart,
    Smartphone,
    Wallet,
    X,
    XCircle,
} from 'lucide-react';
import React from 'react';

interface TransactionDetailProps {
    transaction: TransactionDetail;
    onClose: () => void;
}

const Detail: React.FC<TransactionDetailProps> = ({ transaction, onClose }) => {
    const getStatusIcon = (status: 'success' | 'pending' | 'failed') => {
        switch (status) {
            case 'success':
                return <CheckCircle className="text-green-500" size={24} />;
            case 'pending':
                return <Clock className="text-yellow-500" size={24} />;
            case 'failed':
                return <XCircle className="text-red-500" size={24} />;
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'topup':
            case 'deposit':
                return <ArrowDown className="rounded-full bg-blue-100 p-2 text-blue-500" size={40} />;
            case 'payment':
            case 'purchase':
                return <ShoppingCart className="rounded-full bg-purple-100 p-2 text-purple-500" size={40} />;
            case 'transfer':
                return <ArrowUp className="rounded-full bg-orange-100 p-2 text-orange-500" size={40} />;
            case 'withdraw':
                return <Wallet className="rounded-full bg-amber-100 p-2 text-amber-500" size={40} />;
            case 'bank_transfer':
            case 'credit_card':
                return <CreditCard className="rounded-full bg-indigo-100 p-2 text-indigo-500" size={40} />;
            default:
                return <Banknote className="rounded-full bg-gray-100 p-2 text-gray-500" size={40} />;
        }
    };

    const formatCurrency = (amount: string) => {
        const num = parseFloat(amount);
        return num.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getVaInfo = () => {
        if (transaction.payment_data.va_numbers && transaction.payment_data.va_numbers.length > 0) {
            const va = transaction.payment_data.va_numbers[0];
            return {
                bank: va.bank.toUpperCase(),
                number: va.va_number,
            };
        } else if (transaction.payment_data.permata_va_number) {
            return {
                bank: 'Permata',
                number: transaction.payment_data.permata_va_number,
            };
        }
        return null;
    };

    const vaInfo = getVaInfo();

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30">
            <div className="mx-auto max-h-screen w-full max-w-xl overflow-y-auto bg-white shadow">
                <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                    <button onClick={onClose}>
                        <X size={24} />
                    </button>
                    <h2 className="text-lg font-bold">Detail Transaksi</h2>
                    <div className="w-6"></div>
                </div>

                <div className="p-6">
                    <div className="mb-8 flex flex-col items-center">
                        <div className="mb-4">{getTypeIcon(transaction.type || transaction.payment_type)}</div>
                        <div className={`text-2xl font-bold ${parseFloat(transaction.amount) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {parseFloat(transaction.amount) > 0 ? '+' : ''}
                            {formatCurrency(transaction.amount)}
                        </div>
                        <div className="mt-4 flex items-center rounded-full bg-gray-100 px-4 py-2">
                            {getStatusIcon(transaction.status)}
                            <span className="ml-2 font-medium capitalize">
                                {transaction.status === 'pending' ? 'Menunggu Pembayaran' : transaction.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 rounded-xl bg-gray-50 p-4">
                        <h3 className="mb-3 font-bold">Detail Transaksi</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="flex items-center text-gray-500">
                                    <Landmark className="mr-2" size={16} />
                                    Metode Pembayaran
                                </span>
                                <span className="font-medium capitalize">{transaction.payment_type.replace('_', ' ')}</span>
                            </div>

                            {vaInfo && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="flex items-center text-gray-500">
                                            <Landmark className="mr-2" size={16} />
                                            Bank
                                        </span>
                                        <span className="font-medium">{vaInfo.bank}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center text-gray-500">
                                            <CreditCard className="mr-2" size={16} />
                                            Nomor Virtual Account
                                        </span>
                                        <div className="flex items-center">
                                            <span className="mr-2 font-medium">{vaInfo.number}</span>
                                            <Copy size={16} className="text-gray-400" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {transaction.phone && (
                                <div className="flex justify-between">
                                    <span className="flex items-center text-gray-500">
                                        <Smartphone className="mr-2" size={16} />
                                        Nomor Telepon
                                    </span>
                                    <span className="font-medium">{transaction.phone}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-500">Tanggal Transaksi</span>
                                <span className="font-medium">{formatDate(transaction.created_at)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">ID Transaksi</span>
                                <div className="flex items-center">
                                    <span className="mr-2 font-medium">{transaction.id}</span>
                                    <Copy size={16} className="text-gray-400" />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Order ID</span>
                                <div className="flex items-center">
                                    <span className="mr-2 font-medium">{transaction.order_id}</span>
                                    <Copy size={16} className="text-gray-400" />
                                </div>
                            </div>

                            <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                                <span className="font-bold">Total</span>
                                <span className="text-lg font-bold">{formatCurrency(transaction.payment_data.gross_amount)}</span>
                            </div>
                        </div>
                    </div>

                    {transaction.status === 'pending' && transaction.expiry_time && (
                        <div className="mb-6 border-l-4 border-yellow-500 bg-yellow-50 p-4">
                            <div className="flex">
                                <AlertCircle className="mr-2 text-yellow-500" />
                                <p className="text-yellow-700">
                                    Batas pembayaran sampai{' '}
                                    {new Date(transaction.expiry_time).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    )}

                    {transaction.status === 'failed' && transaction.failure_message && (
                        <div className="mb-6 border-l-4 border-red-500 bg-red-50 p-4">
                            <div className="flex">
                                <AlertCircle className="mr-2 text-red-500" />
                                <p className="text-red-700">{transaction.failure_message}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button className="mr-2 flex flex-1 items-center justify-center rounded-lg bg-gray-100 py-3">
                            <Share2 className="mr-2" size={18} />
                            Bagikan
                        </button>
                        <button className="ml-2 flex flex-1 items-center justify-center rounded-lg bg-gray-100 py-3">
                            <Copy className="mr-2" size={18} />
                            Salin ID
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
