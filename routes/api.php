<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicalCaseController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:10,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/cases', [MedicalCaseController::class, 'index']);
    Route::get('/cases/{medicalCase}', [MedicalCaseController::class, 'show']);

    Route::middleware('can:create,App\Models\MedicalCase')->group(function () {
        Route::post('/cases', [MedicalCaseController::class, 'store']);
    });

    Route::put('/cases/{medicalCase}', [MedicalCaseController::class, 'update']);
    Route::delete('/cases/{medicalCase}', [MedicalCaseController::class, 'destroy']);
});
