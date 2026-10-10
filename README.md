# Jajal Medical Case Management

A role-based medical case management application built with Laravel, React, Inertia.js, and MySQL. It provides a dashboard for managing fictitious medical cases with search, filtering, sorting, validation, and role-based access control.

## Features

- Dashboard listing medical cases with pagination.
- Search cases by case number, patient name, or condition.
- Filter cases by status and priority.
- Sort cases by supported fields.
- Create, view, update, and delete medical cases, subject to permissions.
- Role-based authorization for Admin and Viewer users.
- Server-side validation using Laravel Form Requests.
- Database seeders for demo users and 20 fictitious medical cases.
- Responsive React interface powered by Inertia.js.
- Automated tests for core application behavior.

## Tech Stack

- Backend: PHP, Laravel
- Frontend: React, TypeScript, Inertia.js
- Database: MySQL
- Testing: PHPUnit/Pest-compatible Laravel test suite

## Requirements

Install the following before running the project:

- PHP version compatible with the Laravel application
- Composer
- Node.js and npm
- MySQL Server

## Local Setup

Clone the repository and enter the project directory:

```bash
git clone https://github.com/MdShahil13/jajal-medical-case-management.git
cd jajal-medical-case-management
```

Install backend and frontend dependencies:

```bash
composer install
npm install
```

Create your local environment file:

```bash
cp .env.example .env
php artisan key:generate
```

Configure your `.env` file with your local MySQL database name and credentials. Create the database in MySQL before running migrations.

Run the migrations and seed demo data:

```bash
php artisan migrate --seed
```

Start the Laravel development server:

```bash
php artisan serve
```

In a second terminal, start the frontend development server:

```bash
npm run dev
```

Open the local URL shown by Laravel in your browser.

## Demo Accounts

The local development database is seeded with these demo accounts:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `AdminDemo123!` |
| Viewer | `viewer@example.com` | `ViewerDemo123!` |

These credentials are for local demonstration only. Do not use them in a production deployment.

## Authorization

- **Admin:** Can view and manage medical cases.
- **Viewer:** Can view medical cases but cannot create, update, or delete them.

## Testing

Run the automated test suite:

```bash
php artisan test
```

Build frontend assets for production:

```bash
npm run build
```

## Documentation

- [Database design](docs/database.md)
- [Requirements traceability](docs/traceability.md)

## Privacy and Security

All seeded medical case records are fictitious demonstration data. Do not enter real patient information into this demo application. Keep `.env`, credentials, and other secrets out of version control.

## Project Status

Developed as a Software Developer Intern assignment for Jajal Medical Services Pvt. Ltd.