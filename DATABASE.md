# DigiWorku Commander — Supabase Database Architecture (DATABASE.md)

## 🗄️ Database Overview

DigiWorku Commander connects to a production **Supabase PostgreSQL** database instance with full Row Level Security (RLS) enforcement.

- **Supabase Cloud Endpoint**: `https://rjxbdjgagizjmjwnlbxx.supabase.co`
- **DDL Migration Script File**: [`supabase/schema.sql`](supabase/schema.sql)

---

## 📊 Relational Schema & Tables

### 1. `public.profiles`
Stores team members, designations, skills, and base salaries.
- `id` (UUID, Primary Key)
- `full_name` (TEXT)
- `email` (TEXT, Unique)
- `role` (`user_role` ENUM: `super_admin`, `hr_manager`, `project_manager`, `sales_manager`, `team_member`, `qa_manager`, `finance_manager`, `freelancer`)
- `department` (TEXT)
- `designation` (TEXT)
- `avatar_url` (TEXT)
- `phone` (TEXT)
- `skills` (TEXT Array)
- `kyc_status` (TEXT: `verified`, `pending`, `rejected`)
- `kyc_documents` (JSONB)
- `is_active` (BOOLEAN)
- `base_salary` (NUMERIC(12, 2))

### 2. `public.attendance`
Daily check-in/out records, late arrival detection, and location coordinates.
- `id` (UUID, Primary Key)
- `user_id` (UUID, References `profiles.id`)
- `date` (DATE)
- `check_in_time` (TIMESTAMPTZ)
- `check_out_time` (TIMESTAMPTZ)
- `total_duration_minutes` (INTEGER)
- `is_late` (BOOLEAN)
- `late_reason` (TEXT)
- `status` (TEXT: `present`, `late`, `half_day`, `absent`, `on_leave`)
- `location_coords` (JSONB)

### 3. `public.leaves`
Employee time-off applications and management approvals.
- `id` (UUID, Primary Key)
- `user_id` (UUID, References `profiles.id`)
- `leave_type` (TEXT: `annual`, `sick`, `casual`, `emergency`)
- `start_date` (DATE)
- `end_date` (DATE)
- `total_days` (INTEGER)
- `reason` (TEXT)
- `status` (TEXT: `pending`, `approved`, `rejected`)
- `reviewed_by` (UUID, References `profiles.id`)

### 4. `public.internal_tasks`
Tasks supporting the 4-lane Kanban Board.
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `description` (TEXT)
- `status` (TEXT: `backlog`, `in_progress`, `qa_ready`, `done`)
- `priority` (TEXT: `low`, `medium`, `high`, `critical`)
- `assignee_id` (UUID, References `profiles.id`)
- `project_id` (UUID, References `projects.id`)
- `due_date` (DATE)
- `estimated_hours` (NUMERIC)
- `spent_hours` (NUMERIC)
- `checklist` (JSONB)
- `attachments` (JSONB)

### 5. `public.clients` & `public.projects`
- `clients`: Lead tracking, contract values, health scores, and contact dossiers.
- `projects`: Project codes (`APX-2026`), budgets, burn-rates, tech stacks, and staging URLs.
- `project_milestones`: Delivery phases, due dates, statuses (`pending`, `under_qc`, `approved_by_client`, `paid`), and milestone payouts.

### 6. `public.payouts` & `public.invoices` (Finance Restricted)
- `payouts`: Milestone disbursements and employee salary payments.
- `invoices`: Accounts receivable with line items, due dates, and payment statuses (`draft`, `sent`, `paid`, `overdue`).

### 7. `public.qc_reviews`
- `qc_reviews`: 100-Point checklist criteria, scores, deliverable preview URLs, and 3-way decisions (`approve`, `request_revisions`, `reject`).

### 8. `public.chat_channels` & `public.internal_chats`
- Real-time team messages across public channels (`#announcements`, `#qc-alerts`, `#dev-team`) and direct messages.

---

## 🛡️ Row Level Security (RLS) Policy Guide

| Table | Policy | Enforced Restriction |
| :--- | :--- | :--- |
| `profiles` | `Public profile view` | All authenticated users can view staff profiles |
| `payouts` | `Finance staff view payouts` | **Restricted**: Only `super_admin`, `finance_manager`, or individual recipient |
| `invoices` | `Finance staff view invoices`| **Restricted**: Only `super_admin`, `finance_manager`, and `sales_manager` |
| `attendance`| `Staff can view attendance` | Staff view their own attendance; HR and Admins view all |
| `qc_reviews`| `QC evaluate` | Only `super_admin`, `qa_manager`, and `project_manager` can record gate decisions |

---

## 🚀 How to Execute Migration in Supabase

1. Open your Supabase Dashboard at [https://supabase.com/dashboard/project/rjxbdjgagizjmjwnlbxx](https://supabase.com/dashboard/project/rjxbdjgagizjmjwnlbxx).
2. Go to the **SQL Editor** on the left menu (or click [New Query](https://supabase.com/dashboard/project/rjxbdjgagizjmjwnlbxx/sql/new)).
3. Copy the entire contents of [`supabase/schema.sql`](supabase/schema.sql).
4. Click **Run** (Ctrl + Enter) to instantiate all tables, ENUM types, indexes, and RLS security policies.
