<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;


Route::post('/midtrans/callback', [TransactionController::class, 'handleCallback']);
