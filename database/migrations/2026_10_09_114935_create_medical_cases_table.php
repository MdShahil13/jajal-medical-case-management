
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medical_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case_number')->unique();
            $table->string('patient_name');
            $table->string('patient_email')->nullable();
            $table->string('patient_phone')->nullable();
            $table->string('condition');
            $table->text('description')->nullable();
            $table->string('status')->default('open');
            $table->string('priority')->default('medium');
            $table->date('opened_at')->nullable();
            $table->date('closed_at')->nullable();
            $table->foreignId('assigned_to')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->constrained('users')
                ->cascadeOnDelete();
            $table->timestamps();

            $table->index(['status', 'priority']);
            $table->index('opened_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_cases');
    }
};