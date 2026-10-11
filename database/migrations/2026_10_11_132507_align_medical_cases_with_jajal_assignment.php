<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('medical_cases', function (Blueprint $table) {
            $table->string('patient_reference')->nullable();
            $table->string('surgeon_name')->nullable();
            $table->string('implant_type')->nullable();
            $table->date('surgery_date')->nullable();
        });

        DB::table('medical_cases')->orderBy('id')->each(
            function ($case) {
                DB::table('medical_cases')
                    ->where('id', $case->id)
                    ->update([
                        'patient_reference' => 'DEMO-' . $case->id,
                        'surgeon_name' => 'Demo Surgeon',
                        'implant_type' => $case->condition,
                        'surgery_date' => $case->opened_at,
                    ]);
            }
        );

        DB::table('medical_cases')
            ->where('status', 'open')
            ->update(['status' => 'Draft']);

        DB::table('medical_cases')
            ->where('status', 'in_progress')
            ->update(['status' => 'Planning']);

        DB::table('medical_cases')
            ->where('status', 'closed')
            ->update(['status' => 'Completed']);

        DB::table('medical_cases')
            ->where('priority', 'low')
            ->update(['priority' => 'Low']);

        DB::table('medical_cases')
            ->where('priority', 'medium')
            ->update(['priority' => 'Medium']);

        DB::table('medical_cases')
            ->where('priority', 'high')
            ->update(['priority' => 'High']);
    }

    public function down(): void
    {
        Schema::table('medical_cases', function (Blueprint $table) {
            $table->dropColumn([
                'patient_reference',
                'surgeon_name',
                'implant_type',
                'surgery_date',
            ]);
        });
    }
};