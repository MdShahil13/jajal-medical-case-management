<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedicalCaseRequest;
use App\Http\Requests\UpdateMedicalCaseRequest;
use App\Models\MedicalCase;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MedicalCaseController extends Controller
{
    public function index(Request $request): Response
    {
        abort_unless(
            $request->user()->can('viewAny', MedicalCase::class),
            403
        );

        $query = MedicalCase::query()
            ->with(['assignedUser:id,name', 'creator:id,name']);

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('case_number', 'like', "%{$search}%")
                    ->orWhere('patient_name', 'like', "%{$search}%")
                    ->orWhere('condition', 'like', "%{$search}%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($priority = $request->query('priority')) {
            $query->where('priority', $priority);
        }

        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');

        if (! in_array($sort, [
            'case_number',
            'patient_name',
            'status',
            'priority',
            'opened_at',
            'created_at',
        ], true)) {
            $sort = 'created_at';
        }

        if (! in_array($direction, ['asc', 'desc'], true)) {
            $direction = 'desc';
        }

        $cases = $query
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

       return Inertia::render('medical-cases/index', [
    'cases' => $cases,
    'dashboard' => [
        'total' => MedicalCase::count(),
        'planning' => MedicalCase::where('status', 'Planning')->count(),
        'inReview' => MedicalCase::where('status', 'In Review')->count(),
        'approved' => MedicalCase::where('status', 'Approved')->count(),
        'completed' => MedicalCase::where('status', 'Completed')->count(),
    ],
    'filters' => $request->only([
        'search',
        'status',
        'priority',
        'sort',
        'direction',
    ]),
    'canManage' => $request->user()->can(
        'create',
        MedicalCase::class
    ),
]);
    }

    public function create(Request $request): Response
    {
        abort_unless(
            $request->user()->can('create', MedicalCase::class),
            403
        );

        return Inertia::render('medical-cases/create', [
            'users' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(
        StoreMedicalCaseRequest $request
    ): RedirectResponse {
        MedicalCase::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
        ]);

        return to_route('medical-cases.index')
            ->with('success', 'Medical case created successfully.');
    }

    public function show(
        Request $request,
        MedicalCase $medicalCase
    ): Response {
        abort_unless(
            $request->user()->can('view', $medicalCase),
            403
        );

        $medicalCase->load([
            'assignedUser:id,name',
            'creator:id,name',
        ]);

        return Inertia::render('medical-cases/show', [
            'medicalCase' => $medicalCase,
            'canManage' => $request->user()->can(
                'update',
                $medicalCase
            ),
        ]);
    }

    public function edit(
        Request $request,
        MedicalCase $medicalCase
    ): Response {
        abort_unless(
            $request->user()->can('update', $medicalCase),
            403
        );

        return Inertia::render('medical-cases/edit', [
            'medicalCase' => $medicalCase,
            'users' => User::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function update(
        UpdateMedicalCaseRequest $request,
        MedicalCase $medicalCase
    ): RedirectResponse {
        $medicalCase->update($request->validated());

        return to_route('medical-cases.show', $medicalCase)
            ->with('success', 'Medical case updated successfully.');
    }

    public function destroy(
        Request $request,
        MedicalCase $medicalCase
    ): RedirectResponse {
        abort_unless(
            $request->user()->can('delete', $medicalCase),
            403
        );

        $medicalCase->delete();

        return to_route('medical-cases.index')
            ->with('success', 'Medical case deleted successfully.');
    }
}
