# Requirements Traceability

This document maps the assignment requirements to the corresponding application components.

| Requirement                    | Implementation                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| Laravel application            | Laravel backend and routing                                                        |
| MySQL persistence              | Laravel migrations and Eloquent models                                             |
| React interface                | React and TypeScript pages rendered through Inertia.js                             |
| Dashboard                      | `resources/js/pages/medical-cases/index.tsx`                                       |
| Medical case CRUD              | `app/Http/Controllers/MedicalCaseController.php` and medical-case pages            |
| Admin and Viewer roles         | `app/Models/User.php` and the role migration                                       |
| Authorization                  | `app/Policies/MedicalCasePolicy.php`                                               |
| Request validation             | `app/Http/Requests/StoreMedicalCaseRequest.php` and `UpdateMedicalCaseRequest.php` |
| Demo accounts and sample cases | `database/seeders/UserSeeder.php` and `MedicalCaseSeeder.php`                      |
| Search and filters             | Medical case controller and dashboard                                              |
| Automated tests                | `tests/Feature/`                                                                   |
| Database documentation         | `docs/database.md`                                                                 |

## Verification Checklist

Before submission, verify each item against the final repository:

- [x] Admin can create, update, and delete cases.
- [x] Viewer can view cases but cannot modify them.
- [x] Search, status filter, and priority filter work.
- [x] Invalid form data is rejected by server-side validation.
- [x] The database can be initialized with migrations and seeders.
- [x] Required feature tests pass.
- [x] Frontend production build succeeds.
- [x] API endpoints and API tests are implemented if required by the assignment.
- [x] No secrets or real patient data are committed.
- [x] README setup instructions work on a fresh local environment.

Only mark a requirement as complete after verifying it in the final codebase.
