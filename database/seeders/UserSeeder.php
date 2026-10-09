<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Demo Admin',
                'password' => 'AdminDemo123!',
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'viewer@example.com'],
            [
                'name' => 'Demo Viewer',
                'password' => 'ViewerDemo123!',
                'role' => 'viewer',
            ]
        );
    }
}