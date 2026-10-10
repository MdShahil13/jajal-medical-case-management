# Database Design

## Overview

The application uses MySQL and Laravel Eloquent ORM. Its main tables are `users` and `medical_cases`, with Laravel's standard authentication and migration infrastructure.

## Users

The `users` table stores application accounts.

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `name` | User's name |
| `email` | Unique login email |
| `password` | Hashed password |
| `role` | Authorization role, such as `admin` or `viewer` |
| `created_at`, `updated_at` | Timestamps |

## Medical Cases

The `medical_cases` table stores case-management records.

| Field | Purpose |
|---|---|
| `id` | Primary key |
| `case_number` | Unique case identifier |
| `patient_name` | Fictitious patient name |
| `patient_email` | Optional contact email |
| `patient_phone` | Optional contact phone |
| `condition` | Medical condition or case category |
| `description` | Optional case description |
| `status` | Case status: `open`, `in_progress`, or `closed` |
| `priority` | Priority: `low`, `medium`, or `high` |
| `opened_at` | Optional opening date |
| `closed_at` | Optional closing date |
| `assigned_to` | Optional foreign key to the assigned user |
| `created_by` | Foreign key to the user who created the case |
| `created_at`, `updated_at` | Timestamps |

## Relationships

- A medical case belongs to the user assigned to it through `assigned_to`; this relationship is optional.
- A medical case belongs to the user who created it through `created_by`.
- A user can be assigned multiple cases.
- A user can create multiple cases.

## Indexes and Constraints

- `case_number` is unique.
- `assigned_to` references `users.id` and becomes null if the assigned user is deleted.
- `created_by` references `users.id`; deleting the creator is restricted by the configured cascading behavior.
- The schema includes indexes for status and priority, and for `opened_at`.

## Seed Data

The seeders create demo Admin and Viewer accounts and 20 fictitious medical cases. Never use real patient data in demonstration environments.