-- ==============================================================================
-- DIGIWORKU COMMANDER — ENTERPRISE DATABASE SCHEMA & RLS POLICIES
-- Multi-Tenant Workforce Operating System (DigiWorku India)
-- Currency Standard: INR (₹)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILES & RBAC ROLES (8 Distinct Enterprise Roles)
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'operations_manager',
  'sales_manager',
  'project_manager',
  'finance_manager',
  'qc_reviewer',
  'team_member',
  'freelancer'
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE, -- references auth.users(id) on delete cascade
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'team_member',
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  skills TEXT[] DEFAULT '{}',
  kyc_status TEXT NOT NULL DEFAULT 'pending', -- pending, verified, rejected
  kyc_documents JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  base_salary NUMERIC(12, 2) DEFAULT 0.00, -- INR ₹
  workload_score INTEGER DEFAULT 60,       -- 0-100% capacity
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SERVICE CATALOGUE (13 Service Categories)
CREATE TABLE IF NOT EXISTS public.service_catalog (
  id TEXT PRIMARY KEY,
  category_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT NOT NULL,
  estimated_timeline_days INTEGER NOT NULL DEFAULT 14,
  internal_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,  -- INR ₹
  client_quotation NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  acceptance_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
  required_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CRM LEADS & PROPOSALS
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'Website Enquiry',
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, requirements_received, proposal_sent, negotiation, won, lost
  estimated_deal_value NUMERIC(12, 2) DEFAULT 0.00, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  notes TEXT,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  converted_client_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_number TEXT NOT NULL UNIQUE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  service_category_key TEXT REFERENCES public.service_catalog(category_key),
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 18.00, -- 18% GST standard in India
  tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_quotation NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'sent', -- draft, sent, approved, rejected
  deliverables JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  industry TEXT,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  status TEXT NOT NULL DEFAULT 'active_client', -- lead, contacted, proposal_sent, active_client, churned
  contract_value NUMERIC(12, 2) DEFAULT 0.00,  -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  health_score INTEGER NOT NULL DEFAULT 85,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. PROJECTS & MILESTONES (12-Stage Lifecycle & Delivery Gate)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  service_category_key TEXT REFERENCES public.service_catalog(category_key),
  status TEXT NOT NULL DEFAULT 'planning', -- draft, quoted, awaiting_approval, confirmed, planning, in_progress, internal_qc, client_review, revision, approved, delivered, completed, archived
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,       -- INR ₹
  estimated_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- INR ₹
  spent NUMERIC(12, 2) NOT NULL DEFAULT 0.00,          -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  delivery_authorized BOOLEAN NOT NULL DEFAULT false, -- Mandatory gate: cannot deliver until QC passes
  qc_approval_date TIMESTAMPTZ,
  tech_stack TEXT[] DEFAULT '{}',
  repo_url TEXT,
  staging_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, in_progress, under_qc, approved_by_client, paid
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  deliverable_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. INTERNAL TASKS & WORKFLOW (Fokys Board Structure)
CREATE TABLE IF NOT EXISTS public.internal_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category_tag TEXT NOT NULL DEFAULT 'Engineering',
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, in_progress, review, completed
  priority TEXT NOT NULL DEFAULT 'medium',   -- low, medium, high
  progress_percent INTEGER NOT NULL DEFAULT 0,
  assignee_ids TEXT[] DEFAULT '{}',
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  due_date DATE,
  estimated_hours NUMERIC(6, 2) DEFAULT 0,
  spent_hours NUMERIC(6, 2) DEFAULT 0,
  submission_url TEXT,
  submission_notes TEXT,
  qc_review_status TEXT, -- pending, in_review, approved, revision_requested
  checklist JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. ATTENDANCE & LEAVES
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  total_duration_minutes INTEGER DEFAULT 0,
  is_late BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'present', -- present, late, half_day, absent, on_leave
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_daily_attendance UNIQUE (user_id, date)
);

CREATE TABLE IF NOT EXISTS public.leaves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL, -- annual, sick, casual, emergency
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL DEFAULT 1,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. FREELANCER TALENT & CONTRACTOR PAYOUTS
CREATE TABLE IF NOT EXISTS public.freelancers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  skill_domain TEXT NOT NULL,
  hourly_rate NUMERIC(10, 2) NOT NULL, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  rating NUMERIC(3, 2) DEFAULT 4.8,
  reviews_count INTEGER DEFAULT 12,
  portfolio_url TEXT,
  total_earned NUMERIC(12, 2) DEFAULT 0.00, -- INR ₹
  active_projects_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available', -- available, busy, on_leave
  kyc_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.freelancer_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES public.freelancers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  task_id UUID REFERENCES public.internal_tasks(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending_approval', -- pending_approval, eligible, processing, paid
  due_on DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_reference TEXT, -- UPI / NEFT UTR number
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. INVOICES, INSTALLMENTS & PAYMENTS
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,       -- INR ₹
  tax_rate NUMERIC(5, 2) DEFAULT 18.00,   -- 18% GST
  tax_amount NUMERIC(12, 2) DEFAULT 0.00, -- INR ₹
  total_amount NUMERIC(12, 2) NOT NULL,   -- INR ₹
  amount_paid NUMERIC(12, 2) DEFAULT 0.00, -- Supports partial payments / installment schedules
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'sent',    -- draft, sent, partial, paid, overdue
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  payments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- Server Infrastructure, SaaS Subscriptions, Office Operations, etc.
  description TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL, -- INR ₹
  currency TEXT NOT NULL DEFAULT 'INR',
  date DATE NOT NULL,
  recorded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  payment_method TEXT NOT NULL DEFAULT 'Corporate Bank Transfer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. QUALITY CONTROL (QC) 100-POINT AUDIT ENGINE
CREATE TABLE IF NOT EXISTS public.qc_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  milestone_title TEXT NOT NULL,
  task_id UUID REFERENCES public.internal_tasks(id) ON DELETE SET NULL,
  submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  overall_score INTEGER NOT NULL DEFAULT 100,
  decision TEXT NOT NULL DEFAULT 'pending', -- pending, approve, request_revisions, reject
  revision_count INTEGER NOT NULL DEFAULT 0,
  delivery_authorized BOOLEAN NOT NULL DEFAULT false,
  comments TEXT,
  deliverable_preview_url TEXT,
  checklist_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qc_reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to fetch user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Super Admin has full unrestricted access
CREATE POLICY super_admin_all_profiles ON public.profiles FOR ALL TO authenticated USING (public.get_current_user_role() = 'super_admin');
CREATE POLICY super_admin_all_projects ON public.projects FOR ALL TO authenticated USING (public.get_current_user_role() = 'super_admin');
CREATE POLICY super_admin_all_finance ON public.invoices FOR ALL TO authenticated USING (public.get_current_user_role() IN ('super_admin', 'finance_manager'));
CREATE POLICY super_admin_all_expenses ON public.expenses FOR ALL TO authenticated USING (public.get_current_user_role() IN ('super_admin', 'finance_manager'));

-- Service catalog is readable by all authenticated team members
CREATE POLICY service_catalog_read ON public.service_catalog FOR SELECT TO authenticated USING (true);

-- Tasks visible to assigned members, project managers, and super admins
CREATE POLICY task_read ON public.internal_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY task_update ON public.internal_tasks FOR UPDATE TO authenticated USING (
  public.get_current_user_role() IN ('super_admin', 'project_manager', 'operations_manager', 'qc_reviewer', 'team_member', 'freelancer')
);
