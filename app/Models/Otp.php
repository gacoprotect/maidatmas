<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Otp extends Model
{
    use HasFactory;

    protected $table = 'totps';

    protected $fillable = [
        'phone',
        'otp',
        'expires_at',
    ];

    protected $dates = ['expires_at'];
}
