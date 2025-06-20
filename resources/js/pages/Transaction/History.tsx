import { TransactionDetail } from '@/types';
import { ArrowDown, ArrowUp, Banknote, CheckCircle, Clock, CreditCard, ShoppingCart, Wallet, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import Detail from './Detail';
import AppLayout from '@/Layout/AppLayout';
import { FaArrowAltCircleLeft } from 'react-icons/fa';



type HistoryProps = { onClose: () => void };

const History: React.FC<HistoryProps> = ({ onClose }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);

    const transactions: TransactionDetail[] = [
        {
            id: 1,
            nouid: '12345',
            order_id: 'ORDER-123',
            amount: '500000.00',
            bank: 'bca',
            phone: '08123456789',
            va_number: '1234567890',
            payment_type: 'bank_transfer',
            status: 'pending',
            type: 'topup',
            note: 'Top up saldo',
            payment_data: {
                currency: 'IDR',
                order_id: 'ORDER-123',
                va_numbers: [{ bank: 'bca', va_number: '1234567890' }],
                expiry_time: '2023-08-17 23:59:59',
                merchant_id: 'M123',
                status_code: '201',
                fraud_status: 'pending',
                gross_amount: '500000.00',
                payment_type: 'bank_transfer',
                status_message: 'Success',
                transaction_id: 'T123',
                transaction_time: '2023-08-15 10:30:00',
                transaction_status: 'pending',
            },
            failure_message: null,
            expiry_time: '2023-08-17T23:59:59Z',
            created_at: '2023-08-15T10:30:00Z',
            updated_at: '2023-08-15T10:30:00Z',
        },
        {
            id: 2,
            nouid: '12346',
            order_id: 'ORDER-124',
            amount: '-150000.00',
            bank: '',
            phone: '',
            va_number: '',
            payment_type: 'credit_card',
            status: 'success',
            type: 'payment',
            note: 'Pembelian makanan',
            payment_data: {
                currency: 'IDR',
                order_id: 'ORDER-124',
                expiry_time: '',
                merchant_id: 'M124',
                status_code: '200',
                fraud_status: 'accept',
                gross_amount: '150000.00',
                payment_type: 'credit_card',
                status_message: 'Success',
                transaction_id: 'T124',
                transaction_time: '2023-08-14 19:45:00',
                transaction_status: 'capture',
            },
            failure_message: null,
            expiry_time: '',
            created_at: '2023-08-14T19:45:00Z',
            updated_at: '2023-08-14T19:45:00Z',
        },
    ];
    const getStatusIcon = (status: 'success' | 'pending' | 'failed') => {
        switch (status) {
            case 'success':
                return <CheckCircle className="text-green-500" size={16} />;
            case 'pending':
                return <Clock className="text-yellow-500" size={16} />;
            case 'failed':
                return <XCircle className="text-red-500" size={16} />;
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'topup':
            case 'deposit':
                return <ArrowDown className="text-blue-500" size={20} />;
            case 'payment':
            case 'purchase':
                return <ShoppingCart className="text-purple-500" size={20} />;
            case 'transfer':
                return <ArrowUp className="text-orange-500" size={20} />;
            case 'withdraw':
                return <Wallet className="text-amber-500" size={20} />;
            case 'bank_transfer':
            case 'credit_card':
                return <CreditCard className="text-indigo-500" size={20} />;
            default:
                return <Banknote className="text-gray-500" size={20} />;
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
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout title="Top Up">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => onClose()} className="flex items-center space-x-2">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Riwayat Transaksi</h1>
                </div>
            <div className="divide-y">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex cursor-pointer items-center p-4 transition-colors hover:bg-gray-50"
                        onClick={() => setSelectedTransaction(transaction)}
                    >
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            {getTypeIcon(transaction.type || transaction.payment_type)}
                        </div>

                        <div className="flex-1">
                            <h3 className="font-medium capitalize">{transaction.type || transaction.payment_type.replace('_', ' ')}</h3>
                            <p className="text-sm text-gray-500">{transaction.note || `Order: ${transaction.order_id}`}</p>
                            <div className="mt-1 flex items-center text-sm">
                                {getStatusIcon(transaction.status)}
                                <span className="ml-1 text-gray-500 capitalize">{transaction.status}</span>
                            </div>
                        </div>

                        <div className={`text-right ${parseFloat(transaction.amount) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="font-medium">
                                {parseFloat(transaction.amount) > 0 ? '+' : ''}
                                {formatCurrency(transaction.amount)}
                            </div>
                            <div className="mt-1 text-xs text-gray-400">{formatDate(transaction.created_at)}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedTransaction && <Detail transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
        </div>
        </AppLayout>
    );
};

export default History;
