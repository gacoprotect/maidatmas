<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('nouid', 50)->collation('utf8mb3_general_ci');
            $table->foreign('nouid')->references('nouid')->on('tindentitas')->onDelete('cascade');

            $table->string('order_id')->unique();
            $table->decimal('amount', 16, 2);
            $table->string('bank');
            $table->string('phone');
            $table->string('va_number')->nullable();
            $table->string('payment_type');
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->enum('type', ['topup', 'payment', 'withdraw', 'refund'])->default('topup');
            $table->text('note')->nullable()->after('type');
            $table->json('payment_data')->nullable();
            $table->text('failure_message')->nullable();
            $table->timestamp('expiry_time')->nullable();
            $table->timestamps();

            $table->index('nouid');
            $table->index('order_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
