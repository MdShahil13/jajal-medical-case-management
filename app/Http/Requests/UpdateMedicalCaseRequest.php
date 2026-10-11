<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMedicalCaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        $case = $this->route('medical_case');

        return $case && ($this->user()?->can('update', $case) ?? false);
    }

    public function rules(): array
    {
        $case = $this->route('medical_case');

        return [
            'case_number' => [
                'required', 'string', 'max:255',
                Rule::unique('medical_cases', 'case_number')->ignore($case?->id),
            ],
            'patient_reference' => ['required', 'string', 'max:255'],
            'surgeon_name' => ['required', 'string', 'max:255'],
            'implant_type' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in([
                'Draft', 'Planning', 'In Review', 'Approved', 'Completed', 'Cancelled',
            ])],
            'priority' => ['required', Rule::in(['Low', 'Medium', 'High'])],
            'surgery_date' => ['nullable', 'date'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}