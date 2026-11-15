-- ==============================================================================
-- DIGIWORKU COMMANDER — ENTERPRISE DATABASE SCHEMA & RLS POLICIES
-- Target Supabase Instance: https://rjxbdjgagizjmjwnlbxx.supabase.co
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILES & RBAC
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'hr_manager',
  'project_manager',
  'sales_manager',
  'team_member',
  'qa_manager',
  'finance_manager',
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
  base_salary NUMERIC(12, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. CLIENTS & CRM PIPELINE
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  industry TEXT,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  status TEXT NOT NULL DEFAULT 'lead', -- lead, contacted, proposal_sent, active_client, churned
  contract_value NUMERIC(12, 2) DEFAULT 0.00,
  health_score INTEGER NOT NULL DEFAULT 85,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROJECTS & MILESTONES
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active', -- planning, active, delayed, on_hold, completed
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  spent NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'USD',
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
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  deliverable_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. INTERNAL TASKS & KANBAN
CREATE TABLE IF NOT EXISTS public.internal_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog', -- backlog, in_progress, qa_ready, done
  priority TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  due_date DATE,
  estimated_hours NUMERIC(6, 2) DEFAULT 0,
  spent_hours NUMERIC(6, 2) DEFAULT 0,
  checklist JSONB DEFAULT '[]'::jsonb,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. ATTENDANCE & TIME TRACKER
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  total_duration_minutes INTEGER DEFAULT 0,
  is_late BOOLEAN NOT NULL DEFAULT false,
  late_reason TEXT,
  status TEXT NOT NULL DEFAULT 'present', -- present, late, half_day, absent, on_leave
  ip_address TEXT,
  location_coords JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_daily_attendance UNIQUE (user_id, date)
);

-- 6. LEAVE REQUESTS
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
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. FREELANCER DIRECTORY
CREATE TABLE IF NOT EXISTS public.freelancers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  skill_domain TEXT NOT NULL,
  hourly_rate NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  rating NUMERIC(3, 2) DEFAULT 4.8,
  portfolio_url TEXT,
  total_earned NUMERIC(12, 2) DEFAULT 0.00,
  active_projects_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available', -- available, busy, on_leave
  kyc_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. FINANCE & PAYOUTS (RESTRICTED)
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_type TEXT NOT NULL DEFAULT 'employee', -- employee, freelancer
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, processed, rejected
  payout_type TEXT NOT NULL DEFAULT 'salary', -- salary, milestone, bonus, reimbursement
  processed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  tax_rate NUMERIC(5, 2) DEFAULT 0.00,
  tax_amount NUMERIC(12, 2) DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'sent', -- draft, sent, paid, overdue
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. QUALITY CONTROL (QC) REVIEWS
CREATE TABLE IF NOT EXISTS public.qc_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  task_id UUID REFERENCES public.internal_tasks(id) ON DELETE SET NULL,
  submitted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  overall_score INTEGER NOT NULL DEFAULT 100,
  checklist_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  decision TEXT NOT NULL DEFAULT 'pending', -- pending, approve, request_revisions, reject
  comments TEXT,
  deliverable_preview_url TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. CHAT CHANNELS & MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_channels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_direct_message BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.internal_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id TEXT NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  reactions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qc_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_chats ENABLE ROW LEVEL SECURITY;

-- Helper function to fetch user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: anyone can view basic profiles; only self or admin can edit
CREATE POLICY "Public profile view" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "User can update self or admin" ON public.profiles FOR UPDATE USING (
  user_id = auth.uid() OR public.get_current_user_role() = 'super_admin'
);

-- Tasks: visible to authenticated staff
CREATE POLICY "Staff view tasks" ON public.internal_tasks FOR SELECT USING (true);
CREATE POLICY "Staff insert/update tasks" ON public.internal_tasks FOR ALL USING (true);

-- Finance (payouts & invoices): STRICTLY RESTRICTED to super_admin and finance_manager
CREATE POLICY "Finance staff view payouts" ON public.payouts FOR SELECT USING (
  public.get_current_user_role() IN ('super_admin', 'finance_manager')
  OR recipient_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Finance staff modify payouts" ON public.payouts FOR ALL USING (
  public.get_current_user_role() IN ('super_admin', 'finance_manager')
);

CREATE POLICY "Finance staff view invoices" ON public.invoices FOR SELECT USING (
  public.get_current_user_role() IN ('super_admin', 'finance_manager', 'sales_manager')
);
CREATE POLICY "Finance staff modify invoices" ON public.invoices FOR ALL USING (
  public.get_current_user_role() IN ('super_admin', 'finance_manager')
);

-- Attendance: team can view & submit their own; HR/Admin can view all
CREATE POLICY "Staff can view attendance" ON public.attendance FOR SELECT USING (
  user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  OR public.get_current_user_role() IN ('super_admin', 'hr_manager', 'project_manager')
);
CREATE POLICY "Staff can punch attendance" ON public.attendance FOR INSERT WITH CHECK (
  user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  OR public.get_current_user_role() IN ('super_admin', 'hr_manager')
);

-- Chats: all team members can read and send
CREATE POLICY "Chat view" ON public.internal_chats FOR SELECT USING (true);
CREATE POLICY "Chat send" ON public.internal_chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Chat channel view" ON public.chat_channels FOR SELECT USING (true);

-- QC Reviews: viewable by staff; modifiable by qa_manager, pm, super_admin
CREATE POLICY "QC view" ON public.qc_reviews FOR SELECT USING (true);
CREATE POLICY "QC evaluate" ON public.qc_reviews FOR ALL USING (
  public.get_current_user_role() IN ('super_admin', 'qa_manager', 'project_manager')
);

-- Projects & Clients
CREATE POLICY "Projects view" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Clients view" ON public.clients FOR SELECT USING (
  public.get_current_user_role() NOT IN ('freelancer')
);
