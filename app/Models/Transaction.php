<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'nouid',
        'order_id',
        'amount',
        'bank',
        'phone',
        'va_number',
        'payment_type',
        'status',
        'type',
        'note',
        'payment_data',
        'failure_message',
        'expiry_time',
    ];

    protected $casts = [
        'payment_data' => 'array',
        'expiry_time' => 'datetime',
        'amount' => 'decimal:2',
        'type' => 'string',
        'note' => 'string',
    ];
    

    /**
     * Relasi ke model Tindentitas
     * Menggunakan foreign key 'nouid' yang unik
     */
    public function indentitas()
    {
        return $this->belongsTo(Indentitas::class, 'nouid', 'nouid');
    }
}
