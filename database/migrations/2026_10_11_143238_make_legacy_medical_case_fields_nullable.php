<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('medical_cases', function (Blueprint $table) {
            $table->string('patient_name')->nullable()->change();
            $table->string('condition')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Keep these fields nullable to avoid breaking existing records.
    }
};
