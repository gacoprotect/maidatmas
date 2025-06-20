<?php

namespace App\Http\Controllers;

use App\Models\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Transaction;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopupController extends Controller
{
    public function index($nouid)
    {
        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $identitas->siswa()->first();

        return Inertia::render('Topup', [
            'nouid' => $nouid,
            'siswa' => $siswa,
        ]);
    }

    public function charge(Request $request, $nouid)
    {
        $request->validate([
            'bank' => 'required|string',
            'amount' => 'required|numeric|min:10000',
            'phone' => 'required|string',
        ]);

        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $identitas->siswa()->first();

        $midtrans = new MidtransService();

        $orderId = 'topup-' . uniqid();

        // Map bank to payment type
        $paymentType = match ($request->bank) {
            'bca', 'bri', 'bni', 'cimb' => 'bank_transfer',
            'permata' => 'permata',
            'mandiri' => 'echannel',
            default => throw new \Exception('Unsupported bank selected'),
        };

        $params = [
            'payment_type' => $paymentType,
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $request->amount,
            ],
            'customer_details' => [
                'first_name' => $siswa->name ?? 'Customer',
                'phone' => $request->phone,
            ],
        ];

        // Add payment-specific parameters
        if ($paymentType === 'bank_transfer') {
            $params['bank_transfer'] = ['bank' => $request->bank];
        } elseif ($paymentType === 'echannel') {
            $params['echannel'] = [
                'bill_info1' => 'Payment:',
                'bill_info2' => 'Topup for ' . ($siswa->namlen ?? 'Customer'),
            ];
        }

        try {
            $transaction = Transaction::create([
                'nouid' => $nouid,
                'order_id' => $orderId,
                'amount' => $request->amount,
                'bank' => $request->bank,
                'phone' => $request->phone,
                'status' => 'pending',
                'type' => 'topup',
                'payment_type' => $paymentType,
            ]);

            $response = $midtrans->chargeBankTransfer($params);

            $updateData = [
                'payment_data' => $response,
                'expiry_time' => $response->expiry_time ?? null,
            ];

            // Handle VA number assignment
            if (isset($response->va_numbers)) {
                $updateData['va_number'] = $response->va_numbers[0]->va_number;
            } elseif ($paymentType === 'permata') {
                $updateData['va_number'] = $response->permata_va_number;
            } elseif ($paymentType === 'echannel') {
                $updateData['va_number'] = $response->bill_key;
            }

            $transaction->update($updateData);

            return redirect()->intended(route('payment.instruction', [
                'nouid' => $nouid,
                'orderId' => $orderId
            ], absolute: false));
        } catch (\Exception $e) {
            logger('Topup failed: ' . $e->getMessage());

            if (isset($transaction)) {
                $transaction->update([
                    'status' => 'failed',
                    'failure_message' => $e->getMessage(),
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed. Please try again.',
            ], 500);
        }
    }

    public function paymentInstruction($nouid, $orderId)
    {
        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $transaction = Transaction::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->firstOrFail();
        return Inertia::render('PaymentInstruction', [
            'nouid' => $nouid,
            'order_id' => $orderId,
            'transaction' => $transaction,
            'siswa' => $identitas->siswa()->first(),

        ]);
    }
}
