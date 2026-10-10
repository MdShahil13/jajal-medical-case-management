<?php

namespace App\Http\Requests;

use App\Models\MedicalCase;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMedicalCaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        $case = $this->route('medical_case');

        return $case instanceof MedicalCase
            && ($this->user()?->can('update', $case) ?? false);
    }

    public function rules(): array
    {
        $case = $this->route('medical_case');

        return [
            'case_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('medical_cases', 'case_number')->ignore($case),
            ],
            'patient_name' => ['required', 'string', 'max:255'],
            'patient_email' => ['nullable', 'email', 'max:255'],
            'patient_phone' => ['nullable', 'string', 'max:30'],
            'condition' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['required', Rule::in(['open', 'in_progress', 'closed'])],
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'opened_at' => ['nullable', 'date'],
            'closed_at' => ['nullable', 'date', 'after_or_equal:opened_at'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
