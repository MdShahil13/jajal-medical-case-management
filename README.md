# Jajal Medical Case Management

A role-based medical case management application built with Laravel, React, TypeScript, Inertia.js, and MySQL. The application provides a dashboard for managing fictitious medical cases, with search, filtering, sorting, pagination, validation, and role-based access control.

## Features

- Dashboard with total, Planning, In Review, Approved, and Completed case counts.
- Search by Case Number or Surgeon Name.
- Filter cases by Status and Priority.
- Sort and paginate case listings.
- View medical case details.
- Create, update, and delete cases with role-based permissions.
- Admin and Viewer roles.
- Server-side validation using Laravel Form Requests.
- REST API secured with Laravel Sanctum.
- Seeders for demo users and 20 fictitious medical cases.
- Responsive React interface using Inertia.js.
- Automated tests for authentication, API access, case creation, duplicate case numbers, and role authorization.

## Tech Stack

- **Backend:** PHP, Laravel
- **Frontend:** React, TypeScript, Inertia.js
- **Database:** MySQL
- **API Authentication:** Laravel Sanctum
- **Testing:** Laravel automated test suite

## Requirements

Install the following:

- PHP version compatible with the project dependencies
- Composer
- Node.js and npm
- MySQL Server

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/MdShahil13/jajal-medical-case-management.git
cd jajal-medical-case-management
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure the environment

Create your local environment file:

```bash
cp .env.example .env
php artisan key:generate
```

On Windows, you can also create `.env` by copying `.env.example` in File Explorer.

Configure your `.env` file with your local MySQL database name and credentials. Create the database before running migrations.

### 4. Run migrations and seed demo data

```bash
php artisan migrate --seed
```

Run this against a new or appropriately prepared development database. Do not use destructive migration commands against a database containing data you need to preserve.

### 5. Start the application

In the first terminal:

```bash
php artisan serve
```

In a second terminal:

```bash
npm run dev
```

Open the local URL provided by Laravel, normally `http://127.0.0.1:8000`.

## Demo Accounts

The development seeder provides the following demo accounts:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `AdminDemo123!` |
| Viewer | `viewer@example.com` | `ViewerDemo123!` |

These are development-only credentials. Change or disable demo accounts before any public production deployment.

## Authorization

- **Admin:** Can view, create, update, and delete medical cases.
- **Viewer:** Can view medical cases but cannot create, update, or delete them.

Authorization is enforced server-side; hiding a button in the interface is not the only access-control mechanism.

## REST API

Protected endpoints require a bearer token obtained through `POST /api/login`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/login` | Authenticate and obtain a token |
| POST | `/api/logout` | Revoke the current API token |
| GET | `/api/cases` | List cases with pagination and supported filters |
| POST | `/api/cases` | Create a case (Admin only) |
| GET | `/api/cases/{id}` | Retrieve case details |
| PUT | `/api/cases/{id}` | Update a case (Admin only) |
| DELETE | `/api/cases/{id}` | Delete a case (Admin only) |

Example login request:

```json
{
  "email": "admin@example.com",
  "password": "AdminDemo123!"
}
```

Send the returned token in the `Authorization` header:

```text
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

API responses use a consistent JSON structure for success and error messages where implemented. Validation errors and authorization failures return appropriate HTTP status codes.

## Medical Case Fields

- **Case Number:** Required and unique.
- **Patient Reference:** Required fictitious identifier.
- **Surgeon Name:** Required.
- **Implant Type:** Required.
- **Status:** Draft, Planning, In Review, Approved, Completed, or Cancelled.
- **Priority:** Low, Medium, or High.
- **Surgery Date:** Optional.
- **Created By and timestamps:** Maintained by the application.

## Testing

Run the automated tests:

```bash
php artisan test
```

Build frontend assets:

```bash
npm run build
```

## Documentation

- [Database Design](docs/database.md)
- [Requirements Traceability](docs/traceability.md)

## Privacy and Security

All seeded medical case records are fictitious. Do not enter real patient information into this demonstration application.

Keep `.env`, API tokens, passwords, and other secrets out of version control.

## Project Status

Developed as a Software Developer Intern assignment for Jajal Medical Services Pvt. Ltd.
