<?php

namespace App\Helpers;

class MaskingHelper
{
    /**
     * Masking untuk string umum (nama, kelas, dll)
     */
    public static function maskString(?string $value): string
    {
        // Handle null, empty string, atau whitespace saja
        if (empty(trim($value ?? ''))) {
            return '';
        }

        return collect(explode(' ', $value))
            ->map(function ($word) {
                $length = strlen($word);
                if ($length <= 2) return $word;

                return substr($word, 0, 1) . str_repeat('*', $length - 2) . substr($word, -1);
            })
            ->implode(' ');
    }

    /**
     * Masking untuk nomor khusus format 11***32
     */
    public static function maskNumber(?string $number): string
    {
        $number = trim($number ?? '');
        $length = strlen($number);

        if ($length <= 4) return $number;

        return substr($number, 0, 2) . str_repeat('*', $length - 4) . substr($number, -2);
    }

    /**
     * Masking untuk nomor telepon 085*****21
     */
    public static function maskPhone(?string $phone): string
    {
        $phone = trim($phone ?? '');
        $length = strlen($phone);

        if ($length <= 5) return $phone;

        return substr($phone, 0, 3) . str_repeat('*', $length - 5) . substr($phone, -2);
    }

    public static function maskClass(?string $class): string
    {
        $class = trim($class ?? '');

        if (empty($class)) {
            return '';
        }

        // Handle format romawi (VIIA → **IA)
        if (preg_match('/^[IVXLCDM]+[A-Z]*$/i', $class)) {
            $length = strlen($class);
            if ($length <= 2) return $class;

            return str_repeat('*', $length - 2) . substr($class, -2);
        }
        // Handle format angka (7A → *A)
        elseif (preg_match('/^\d+[A-Z]*$/i', $class)) {
            $length = strlen($class);
            if ($length <= 1) return $class;

            return '*' . substr($class, -1);
        }
        // Format lain (default masking)
        else {
            return self::maskString($class);
        }
    }
}
