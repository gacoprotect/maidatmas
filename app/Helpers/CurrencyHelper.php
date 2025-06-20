<?php

if (!function_exists('format_rupiah')) {
    /**
     * Format number to Rupiah currency
     *
     * @param float|int|string $amount
     * @param bool $withSymbol
     * @return string
     */
    function format_rupiah($amount, bool $withSymbol = true): string
    {
        $amount = is_numeric($amount) ? $amount : (float) str_replace(['.', ','], '', $amount);
        $formatted = number_format($amount, 0, ',', '.');
        
        return $withSymbol ? 'Rp' . $formatted : $formatted;
    }
}