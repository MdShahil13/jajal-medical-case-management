# Requirements Traceability

This document maps the Jajal Medical Case Management assignment requirements to implementation files and verification steps.

## Requirement Mapping

| Requirement                                   | Implementation                                                           | Verification                                     |
| --------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| Laravel application with React and Inertia.js | Laravel routes and React/TypeScript pages                                | `npm run build`                                  |
| MySQL persistence                             | `database/migrations/`, `app/Models/MedicalCase.php`                     | `php artisan migrate:status`                     |
| Admin and Viewer roles                        | `app/Models/User.php`, `app/Policies/MedicalCasePolicy.php`              | `tests/Feature/MedicalCaseAuthorizationTest.php` |
| Case creation and validation                  | `app/Http/Requests/StoreMedicalCaseRequest.php`                          | `tests/Feature/MedicalCaseApiTest.php`           |
| Case updates and deletion                     | `app/Http/Controllers/MedicalCaseController.php`, API controller, policy | Manual web/API verification                      |
| Search, status and priority filters           | Medical case controller and `resources/js/pages/medical-cases/index.tsx` | Manual UI verification                           |
| Dashboard counts                              | Web medical case controller and dashboard page                           | Manual UI verification                           |
| API authentication                            | `app/Http/Controllers/Api/AuthController.php`, `routes/api.php`          | API authentication tests                         |
| API listing and retrieval                     | `app/Http/Controllers/Api/MedicalCaseController.php`                     | Manual API verification                          |
| Duplicate case number validation              | Store and update request validation                                      | Duplicate-case API test                          |
| Viewer cannot delete a case                   | `app/Policies/MedicalCasePolicy.php`                                     | Viewer-delete API test                           |
| Demo accounts and sample cases                | `database/seeders/`                                                      | Run seeders and verify demo login                |
| Database documentation                        | `docs/database.md`                                                       | Compare with migrations                          |
| Automated tests                               | `tests/Feature/`, `tests/Unit/`                                          | `php artisan test`                               |

## Verification Checklist

### Automated Checks

- [x] Valid API login returns a token.
- [x] Invalid API login returns an unauthorized response.
- [x] Unauthenticated API access is rejected.
- [x] Admin API case creation succeeds.
- [x] Duplicate case numbers are rejected.
- [x] Viewer API deletion is denied.
- [x] Role authorization tests pass.
- [x] Frontend production build succeeds.

### Manual Checks

- [x] Web login works.
- [x] Dashboard renders after login.
- [x] Admin can create a case through the web interface.
- [x] Verify editing an existing case.
- [x] Verify case detail page displays all expected fields.
- [x] Verify Admin deletion through the web interface.
- [x] Verify Viewer cannot create, update, or delete through the web interface.
- [x] Verify dashboard counts, search, filters, sorting, and pagination.
- [x] Verify the database documentation against the final migrations.
- [x] Confirm the GitHub repository is public.
- [x] Confirm `.env`, tokens, and other secrets are not committed.
- [x] Verify setup instructions against a fresh development database.

Only mark an item complete after verifying it against the final codebase.

## Known Scope and Limitations

- The application is intended for demonstration and assignment evaluation.
- Seeded cases use fictitious data.
- Deployment and production infrastructure should be documented separately if configured.
