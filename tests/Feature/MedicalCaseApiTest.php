<?php

namespace Tests\Feature;

use App\Models\MedicalCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\PersonalAccessToken;
use Tests\TestCase;

class MedicalCaseApiTest extends TestCase
{
    use RefreshDatabase;

    
private function validCaseData(): array
{
    return [
        'case_number' => 'CASE-TEST-001',
        'patient_name' => 'Test Patient',
        'patient_reference' => 'PAT-TEST-001',
        'surgeon_name' => 'Dr. Test Surgeon',
        'implant_type' => 'Hip Implant',
        'status' => 'Planning',
        'priority' => 'High',
        'surgery_date' => '2026-12-15',
    ];
}


    public function test_valid_api_login_returns_token(): void
    {
        $user = User::factory()->create([
            'email' => 'admin-test@example.com',
            'password' => bcrypt('TestPassword123!'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin-test@example.com',
            'password' => 'TestPassword123!',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.user.id', $user->id)
            ->assertJsonStructure(['data' => ['token', 'user']]);
    }

    public function test_invalid_api_login_returns_401(): void
    {
        User::factory()->create([
            'email' => 'admin-test@example.com',
            'password' => bcrypt('TestPassword123!'),
            'role' => 'admin',
        ]);

        $this->postJson('/api/login', [
            'email' => 'admin-test@example.com',
            'password' => 'WrongPassword123!',
        ])->assertUnauthorized()
            ->assertJsonPath('success', false);
    }

    public function test_guest_cannot_access_cases_api(): void
    {
        $this->getJson('/api/cases')->assertUnauthorized();
    }

    public function test_admin_can_create_case_through_api(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin, 'sanctum')
            ->postJson('/api/cases', $this->validCaseData())
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.case_number', 'CASE-TEST-001');

        $this->assertDatabaseHas('medical_cases', [
            'case_number' => 'CASE-TEST-001',
            'created_by' => $admin->id,
        ]);
    }

    public function test_duplicate_case_number_is_rejected(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

       
MedicalCase::create([
    ...$this->validCaseData(),
    'case_number' => 'CASE-DUPLICATE-001',
    'created_by' => $admin->id,
]);


        $data = $this->validCaseData();
        $data['case_number'] = 'CASE-DUPLICATE-001';

        $this->actingAs($admin, 'sanctum')
            ->postJson('/api/cases', $data)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('case_number');
    }

    public function test_viewer_cannot_delete_case_through_api(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $viewer = User::factory()->create(['role' => 'viewer']);

        
$case = MedicalCase::create([
    ...$this->validCaseData(),
    'case_number' => 'CASE-VIEWER-001',
    'created_by' => $admin->id,
]);


        $token = $viewer->createToken('test-viewer')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->deleteJson('/api/cases/'.$case->id)
            ->assertForbidden();

        $this->assertDatabaseHas('medical_cases', [
            'id' => $case->id,
        ]);

        PersonalAccessToken::where('tokenable_id', $viewer->id)
            ->where('tokenable_type', $viewer->getMorphClass())
            ->delete();
    }
}
