import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: Siswa;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Siswa {
    nis?: string;
    nisn?: string;
    namlen?: string;
    nampan?: string;
    namman?: string;
    temlah?: string;
    tgllah?: string;
    jenkel?: string;
    tel?: string;
    ket?: string;
    sta?: string;
    staqd?: string;
    rev?: string;
    createdby?: string;
    updatedby?: string;
    kel?: string;
    ala?: string;
    pin?: string;
}

export interface Bank {
    id: number;
    title: string;
    name: string;
    logo: string;
    payment_type: string;
}

export interface Nominal {
    id: number;
    amount: number;
}

export interface PaymentData {
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: string;
    va_numbers?: Array<{
        bank: string;
        va_number: string;
    }>;
    permata_va_number?: string;
}

export interface PaymentDataResponse {
    nouid: string;
    order_id: string;
    transaction: TransactionDetail;
}

export interface TransactionDetail {
    id: number;
    nouid: string;
    order_id: string;
    amount: string;
    bank: string;
    phone: string;
    va_number: string;
    payment_type: string;
    status: 'success'|'pending'|'failed';
    type: string;
    note: string;
    payment_data: MidtransPaymentData;
    failure_message: string | null;
    expiry_time: string; // ISO timestamp
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface MidtransPaymentData {
    currency: string;
    order_id: string;
    bill_key?:string;
    biller_code?:string;
    va_numbers?: VirtualAccount[];
    permata_va_number?:string
    expiry_time: string; // format: YYYY-MM-DD HH:mm:ss
    merchant_id: string;
    status_code: string;
    fraud_status: string;
    gross_amount: string;
    payment_type: string;
    status_message: string;
    transaction_id: string;
    transaction_time: string; // format: YYYY-MM-DD HH:mm:ss
    transaction_status: string;
}

export interface VirtualAccount {
    bank: string;
    va_number: string;
}