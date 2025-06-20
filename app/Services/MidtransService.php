<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\CoreApi;



class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function chargeBankTransfer(array $params)
    {
        try {
            $api = CoreApi::charge($params);
            logger('CoreAoi Response : ' , [$api]);
            return $api;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}