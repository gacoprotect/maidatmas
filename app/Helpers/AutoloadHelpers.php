<?php

use Illuminate\Support\Facades\Log;

// Autoload all PHP files in the current directory except this file
foreach (glob(__DIR__ . '/*.php') as $filename) {
    if (basename($filename) !== 'AutoloadHelpers.php') {
        try {
            require_once $filename;
        } catch (Throwable $e) {
            Log::error("Failed to load helper file: {$filename}", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}