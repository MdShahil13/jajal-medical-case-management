# Requirements Traceability

This document maps the Jajal Medical Case Management assignment requirements to implementation files and automated tests.

| Requirement                                         | Implementation                                                                                        | Verification                                     |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Laravel application with React and Inertia.js       | Laravel routes, React/TypeScript pages, Inertia.js                                                    | `npm run build`                                  |
| MySQL persistence                                   | `database/migrations/`, `app/Models/MedicalCase.php`                                                  | `php artisan migrate:status`                     |
| Admin and Viewer roles                              | `app/Models/User.php`, `app/Policies/MedicalCasePolicy.php`                                           | `tests/Feature/MedicalCaseAuthorizationTest.php` |
| Case creation and validation                        | `app/Http/Requests/StoreMedicalCaseRequest.php`, `app/Http/Controllers/Api/MedicalCaseController.php` | `tests/Feature/MedicalCaseApiTest.php`           |
| Case updates and deletion                           | Medical case controller and policy                                                                    | Verify through the application and API           |
| Search, status filter, priority filter, and sorting | Medical case controller and `resources/js/pages/medical-cases/index.tsx`                              | Manual UI verification                           |
| API authentication                                  | `app/Http/Controllers/Api/AuthController.php`, `routes/api.php`                                       | API login tests                                  |
| API pagination and case retrieval                   | `app/Http/Controllers/Api/MedicalCaseController.php`                                                  | Manual API verification                          |
| Duplicate case number validation                    | Store and update request validation                                                                   | Duplicate-case API test                          |
| Viewer cannot delete a case                         | `app/Policies/MedicalCasePolicy.php`                                                                  | Viewer-delete API test                           |
| Demo accounts and sample cases                      | `database/seeders/`                                                                                   | Run seeders and verify demo login                |
| Database documentation                              | `docs/database.md`                                                                                    | Compare against migrations                       |
| Automated tests                                     | `tests/Feature/`, `tests/Unit/`                                                                       | `php artisan test`                               |

## Verification Checklist

- [x] API login and invalid-login handling tested.
- [x] Unauthenticated API access rejected.
- [x] Admin API case creation tested.
- [x] Duplicate case number rejected.
- [x] Viewer API deletion denied.
- [x] Role authorization tests pass.
- [ ] Verify web-based create, edit, delete, and detail pages.
- [ ] Verify dashboard counts, search, filters, sorting, and pagination.
- [ ] Verify database documentation against the final migrations.
- [ ] Verify fresh setup instructions using a separate test database.
- [ ] Confirm repository visibility is public.
- [ ] Confirm no secrets or real patient data are committed.

Only mark remaining items complete after verifying them against the final codebase.
