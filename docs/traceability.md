# Requirements Traceability

This document maps the Jajal Medical Case Management assignment requirements to implementation files and verification steps.

## Requirement Mapping

| Requirement | Implementation | Verification |
|---|---|---|
| Laravel application with React and Inertia.js | Laravel routes and React/TypeScript pages | `npm run build` |
| MySQL persistence | `database/migrations/`, `app/Models/MedicalCase.php` | `php artisan migrate:status` |
| Admin and Viewer roles | `app/Models/User.php`, `app/Policies/MedicalCasePolicy.php` | `tests/Feature/MedicalCaseAuthorizationTest.php` |
| Case creation and validation | `app/Http/Requests/StoreMedicalCaseRequest.php`, `app/Http/Controllers/MedicalCaseController.php` | `tests/Feature/MedicalCaseApiTest.php` |
| Case updates and deletion | Web and API medical case controllers, policy | Manual web/API verification |
| Search, status filtering, and priority filtering | Medical case controller and `resources/js/pages/medical-cases/index.tsx` | Manual UI verification |
| Dashboard counts | Web medical case controller and dashboard page | Manual UI verification |
| API authentication | `app/Http/Controllers/Api/AuthController.php`, `routes/api.php` | API authentication tests |
| API listing, pagination, and retrieval | `app/Http/Controllers/Api/MedicalCaseController.php` | Manual API verification |
| Duplicate case number validation | Store and update request validation | Duplicate-case API test |
| Viewer cannot delete a case | `app/Policies/MedicalCasePolicy.php` | Viewer-delete API test |
| Demo accounts and sample cases | `database/seeders/` | Run seeders and verify demo login |
| Database documentation | `docs/database.md` | Compare documentation with migrations |
| Automated tests | `tests/Feature/`, `tests/Unit/` | `php artisan test` |

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
- [x] Editing an existing case has been verified.
- [x] The case detail page displays the expected fields.
- [x] Admin deletion through the web interface has been verified.
- [x] Viewer cannot create, update, or delete cases through the web interface.
- [x] Dashboard counts, search, filters, sorting, and pagination have been verified.
- [x] Database documentation has been checked against the migrations.
- [x] GitHub repository visibility has been confirmed as public.
- [x] `.env`, API tokens, and other secrets are not committed.
- [x] Setup instructions have been checked against a fresh development database.

Only mark a checklist item complete if you have personally verified it against the current codebase and environment. Change any unverified `[x]` item to `[ ]`.

## Known Scope and Limitations

- The application is intended for demonstration and assignment evaluation.
- Seeded medical case records use fictitious data.
- Deployment and production infrastructure are not included until a deployment has been configured and verified.
- The database and application configuration must be set up separately for each deployment environment.

## Final Verification Commands

Run the following commands from the project root:

```bash
php artisan test
npm run build
php artisan migrate:status
git status
```

Review the results before submitting the repository. Ensure that no environment files, credentials, tokens, or real patient information are committed.
