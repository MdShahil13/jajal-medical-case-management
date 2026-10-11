<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMedicalCaseRequest;
use App\Http\Requests\UpdateMedicalCaseRequest;
use App\Models\MedicalCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MedicalCaseController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request): JsonResponse
    {
        $cases = MedicalCase::query()
            ->with(['creator:id,name', 'assignedUser:id,name'])
            ->when($request->filled('status'), fn ($query) =>
                $query->where('status', $request->query('status')))
            ->when($request->filled('priority'), fn ($query) =>
                $query->where('priority', $request->query('priority')))
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->query('search');

                $query->where(function ($q) use ($search) {
                    $q->where('case_number', 'like', "%{$search}%")
                        ->orWhere('surgeon_name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Cases retrieved successfully.',
            'data' => $cases,
        ]);
    }

    public function store(StoreMedicalCaseRequest $request): JsonResponse
    {
        $case = MedicalCase::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Case created successfully.',
            'data' => $case->load(['creator:id,name', 'assignedUser:id,name']),
        ], 201);
    }

    public function show(MedicalCase $medicalCase): JsonResponse
    {
        $this->authorize('view', $medicalCase);

        return response()->json([
            'success' => true,
            'message' => 'Case retrieved successfully.',
            'data' => $medicalCase->load(['creator:id,name', 'assignedUser:id,name']),
        ]);
    }

    public function update(
        UpdateMedicalCaseRequest $request,
        MedicalCase $medicalCase
    ): JsonResponse {
        $medicalCase->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Case updated successfully.',
            'data' => $medicalCase->fresh()
                ->load(['creator:id,name', 'assignedUser:id,name']),
        ]);
    }

    public function destroy(MedicalCase $medicalCase): JsonResponse
    {
        $this->authorize('delete', $medicalCase);

        $medicalCase->delete();

        return response()->json([
            'success' => true,
            'message' => 'Case deleted successfully.',
            'data' => null,
        ]);
    }
}
