<?php

use App\Http\Controllers\MedicalCaseController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('medical-cases.index');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::resource('medical-cases', MedicalCaseController::class);
});
