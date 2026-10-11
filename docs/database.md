# Database Design

## Overview

The application uses MySQL and Laravel Eloquent ORM. Its main application tables are `users` and `medical_cases`. Laravel and Sanctum also use supporting tables for authentication, sessions, caching, queues, and API tokens as configured by the application.

## Users

The `users` table stores application accounts.

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `name` | User's name |
| `email` | Unique login email |
| `password` | Hashed password |
| `role` | Application role, such as `admin` or `viewer` |
| `created_at`, `updated_at` | Timestamps |

## Medical Cases

The `medical_cases` table stores medical case records.

| Field | Purpose |
|---|---|
| `id` | Auto-incrementing primary key |
| `case_number` | Unique case identifier |
| `patient_reference` | Fictitious patient identifier |
| `surgeon_name` | Surgeon associated with the case |
| `implant_type` | Type of implant |
| `status` | Draft, Planning, In Review, Approved, Completed, or Cancelled |
| `priority` | Low, Medium, or High |
| `surgery_date` | Optional planned surgery date |
| `created_by` | Foreign key to the user who created the case |
| `assigned_to` | Optional foreign key to the assigned user, retained from the original schema |
| `created_at`, `updated_at` | Timestamps |

### Legacy Fields

The database retains the following legacy columns from the original schema:

- `patient_name`
- `patient_email`
- `patient_phone`
- `condition`
- `description`
- `opened_at`
- `closed_at`

The `patient_name` and `condition` fields were made nullable to support the newer case structure. Other legacy fields remain in the database for compatibility with existing records and code. The current assignment interface uses patient reference, surgeon name, implant type, and surgery date.

## Relationships

- A medical case belongs to its creator through `created_by`.
- A medical case may belong to an assigned user through `assigned_to`.
- A user can create multiple cases.
- A user can be assigned multiple cases.

## Constraints and Indexes

- `case_number` has a unique constraint.
- `created_by` references `users.id`; the configured foreign key uses cascading deletion.
- `assigned_to` references `users.id` and becomes null when the assigned user is deleted.
- The original schema includes indexes for status and priority, and for `opened_at`.

Refer to the actual migration files in `database/migrations/` for the authoritative schema and foreign-key behavior.

## Seed Data

The development seeders provide Admin and Viewer demo accounts and 20 fictitious medical cases. Seeders may update existing demo records, depending on their implementation.

Never use real patient information in a demonstration environment.
