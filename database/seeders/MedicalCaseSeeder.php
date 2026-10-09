<?php

namespace Database\Seeders;

use App\Models\MedicalCase;
use App\Models\User;
use Illuminate\Database\Seeder;

class MedicalCaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->firstOrFail();
        $viewer = User::where('email', 'viewer@example.com')->firstOrFail();

        $conditions = [
            'General Checkup',
            'Cardiology Review',
            'Orthopedic Consultation',
            'Diabetes Follow-up',
            'Respiratory Assessment',
        ];

        $priorities = ['low', 'medium', 'high'];
        $statuses = ['open', 'in_progress', 'closed'];

        for ($i = 1; $i <= 20; $i++) {
            $status = $statuses[($i - 1) % count($statuses)];

            MedicalCase::updateOrCreate(
                ['case_number' => sprintf('CASE-%04d', $i)],
                [
                    'patient_name' => "Demo Patient {$i}",
                    'patient_email' => "patient{$i}@example.com",
                    'patient_phone' => null,
                    'condition' => $conditions[($i - 1) % count($conditions)],
                    'description' => "Fictional case record {$i} for application testing.",
                    'status' => $status,
                    'priority' => $priorities[($i - 1) % count($priorities)],
                    'opened_at' => now()->subDays($i)->toDateString(),
                    'closed_at' => $status === 'closed'
                        ? now()->subDays(max(0, $i - 1))->toDateString()
                        : null,
                    'assigned_to' => $i % 2 === 0 ? $admin->id : $viewer->id,
                    'created_by' => $admin->id,
                ]
            );
        }
    }
}