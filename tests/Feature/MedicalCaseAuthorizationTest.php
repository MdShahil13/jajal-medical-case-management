<?php

namespace Tests\Feature;

use App\Models\MedicalCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MedicalCaseAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_medical_cases(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->assertTrue(
            $admin->can('create', MedicalCase::class)
        );
    }

    public function test_viewer_cannot_create_medical_cases(): void
    {
        $viewer = User::factory()->create(['role' => 'viewer']);

        $this->assertFalse(
            $viewer->can('create', MedicalCase::class)
        );
    }

    public function test_viewer_can_view_medical_cases(): void
    {
        $viewer = User::factory()->create(['role' => 'viewer']);

        $this->assertTrue(
            $viewer->can('viewAny', MedicalCase::class)
        );
    }

    public function test_admin_can_view_medical_cases(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->assertTrue(
            $admin->can('viewAny', MedicalCase::class)
        );
    }
}