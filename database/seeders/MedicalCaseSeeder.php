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

        $implantTypes = [
            'Patient-Specific Cranial Implant',
            'Custom Mandibular Implant',
            'Orthopedic Bone Plate',
            'Spinal Implant',
            'Patient-Specific Hip Implant',
        ];

        $surgeons = [
            'Dr. A. Patel',
            'Dr. R. Shah',
            'Dr. K. Mehta',
            'Dr. S. Desai',
            'Dr. N. Joshi',
        ];

        $statuses = [
            'Draft',
            'Planning',
            'In Review',
            'Approved',
            'Completed',
            'Cancelled',
        ];

        $priorities = ['Low', 'Medium', 'High'];

        for ($i = 1; $i <= 20; $i++) {
            MedicalCase::updateOrCreate(
                ['case_number' => sprintf('CASE-%04d', $i)],
                [
                    'patient_reference' => sprintf('PAT-%04d', $i),
                    'surgeon_name' => $surgeons[($i - 1) % count($surgeons)],
                    'implant_type' => $implantTypes[($i - 1) % count($implantTypes)],
                    'status' => $statuses[($i - 1) % count($statuses)],
                    'priority' => $priorities[($i - 1) % count($priorities)],
                    'surgery_date' => now()
                        ->addDays($i)
                        ->toDateString(),
                    'assigned_to' => $i % 2 === 0
                        ? $admin->id
                        : $viewer->id,
                    'created_by' => $admin->id,
                ]
            );
        }
    }
}