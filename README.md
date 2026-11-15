# DigiWorku Commander — Enterprise Internal Operations OS

**DigiWorku Commander** is a mission-critical, enterprise-grade Internal Operations OS engineered for DigiWorku's distributed workforce, creative developers, QA engineers, project managers, and executive leadership.

---

## 🎨 Enterprise Design System
- **Theme**: Ultra Dark Obsidian Enterprise UI
- **Deep Background**: `#030712` (Slate 950 deep obsidian)
- **Cards & Surfaces**: `#0f172a` (Slate 900) & `#1e293b` (Slate 800)
- **Primary Accent**: `#10b981` (Emerald 500) & `#059669` (Emerald 600)
- **Alert / Warning**: `#f59e0b` (Amber 500) & `#ef4444` (Rose 500)
- **Typography**: Plus Jakarta Sans, Inter, JetBrains Mono
- **Icons**: Lucide React

---

## 🚀 12 Fully-Functional Operational Modules

### **M1: Executive Dashboard**
- Real-time counters: Active Projects, Monthly Revenue, Pending Approvals, Team On Duty
- **Delayed Project Radar**: Visual SLA risk detection, days delayed indicator, bottleneck analysis, and 1-click mitigation actions
- **Sprint 44 Velocity**: Story points committed vs. completed
- Quick operational triggers & system status ticker

### **M2: Employee Management & KYC Vault**
- Workforce roster with designations, departments, join dates, and contact details
- Skills matrix with proficiency tags
- **KYC Documents Vault**: Government IDs, contracts, and certifications with verification badges
- Instant Active/Inactive operational status toggle & Add Member modal

### **M3: Attendance & Time Tracker**
- **1-Click Check-In / Check-Out**: Live stopwatch timer (`HH:MM:SS`), geolocation tracking, and shift verification
- **Late Arrival Tracker**: Automatically flags arrivals past 09:30 AM with reason logging
- Historical attendance audit table with durations and workstation IP/location
- **Leave Request & Approvals Workflow**: Apply for Annual, Sick, Casual, or Emergency leave; manager 1-click Approve/Decline gate

### **M4: Task Management (Kanban Board)**
- Interactive 4-lane Kanban Board: `Backlog` → `In Progress` → `QA Ready` → `Done`
- Priority badges: Critical (Rose), High (Amber), Medium (Blue), Low (Slate)
- 1-click workflow lane advancement
- Task Details Drawer with checklist progress, attachments, estimated vs. spent hours

### **M5: Client & CRM Pipeline**
- Inbound leads sync & Kanban pipeline: `Lead` → `Contacted` → `Proposal Sent` → `Active Client`
- Client dossiers with valuation, health scores, and communications history
- **Interactive Quote & Estimate Generator**: Itemized deliverable pricing, tax calculations, payment terms, and instant proposal issuance

### **M6: Project Management & Milestones**
- Milestone delivery roadmaps with sequential phases (01 to N)
- Budget utilization tracking (Allocated vs. Burned vs. Margin)
- Deliverable staging repos and sandbox review links
- Client acceptance sign-off gates

### **M7: Freelancer Talent Network**
- Talent directory of vetted contractors with domain tags, verified ratings (1-5★), and portfolios
- Hourly and milestone rate tracking ($/hr)
- Real-time availability toggles (`Available`, `Busy`, `On Leave`)
- Direct project allocation modal & lifetime payout ledgers

### **M8: Finance & Payroll (Strictly Restricted)**
- **Strict RBAC Guardrail**: Blocked from regular team members; accessible only by Super Admin and Finance Manager
- Executive P&L Overview: YTD Revenue, Monthly Revenue, Operating Expenses, Net Operating Margin (50.9%)
- 6-Month cash flow trend graph
- Employee payroll ledger with base salaries, bonuses, deductions, and 1-click "Disburse" action
- Client Accounts Receivable & invoice dispatch generator

### **M9: Internal Team Communication**
- Real-time communication channels: `#announcements`, `#qc-alerts`, `#dev-team`, `#general`, and DMs
- Displays role badges for every sender (Super Admin, Lead PM, Senior Engineer, etc.)
- Message posting with auto-scroll, timestamps, reactions, and attachments
- Automated event integration (e.g. QC failure auto-broadcasts to `#qc-alerts`)

### **M10: Quality Control (QC) Engine**
- **100-Point Inspection Checklist** across 5 categories:
  1. Code Quality & TypeScript Strictness
  2. UI/UX Polish & Responsiveness
  3. Performance & Lighthouse 100/100
  4. Security & RLS Compliance
  5. Client Specification Adherence
- **Live Deliverable Sandbox Preview**:
  - Live interactive preview of client deliverables
  - Viewport switcher: Desktop (1440px), Tablet (768px), and Mobile (375px)
- **3-Way Decision Gate**:
  - `Approve for Client Release` (promotes milestone with celebration toast)
  - `Request Revisions` (notifies assignee with review comments)
  - `Reject Gate` (escalates to Lead PM with audit log)

### **M11: Performance & Department SLA Analytics**
- Sprint velocity & story points delivery trends
- Department SLA on-time rates (Engineering: 98.2%, QA: 99.1%, Design: 95.0%)
- **Sprint 44 Top Performers Leaderboard**: Recognizing Sprint MVPs, Zero Defect Guardians, and Pixel Perfect designers

### **M12: DigiWorku AI Assistant (Gemini Flash)**
- Context-aware intelligence connected to all 12 operational subsystems
- Answers complex operational queries:
  - *"Which projects are currently delayed?"*
  - *"Summarize sprint velocity for Sprint 44"*
  - *"Show team members with spare capacity"*
  - *"Draft client status email for Nordic Living"*
- Context-aware RBAC (refuses to disclose confidential financial figures to unauthorized roles)

---

## 🛡️ Role-Based Access Control (RBAC) Matrix

| Role | Dashboard | Employees | Attendance | Tasks | CRM | Projects | Freelancers | Finance & Payroll | Chat | QC Engine | Analytics | AI Copilot |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Super Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **HR Manager** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| **Project Manager** | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Sales Manager** | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Team Member** | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | 🔒 **BLOCKED** | ✅ | ❌ | ❌ | ✅ |
| **QA Manager** | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| **Finance Manager**| ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Freelancer** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | 🔒 **BLOCKED** | ✅ | ❌ | ❌ | ✅ |

> **Interactive Role Simulator**: Use the dropdown in the top header to instantly switch between any of the 8 roles to test RBAC gates and UI adaptations in real time!

---

## 🗄️ Supabase Production Database Integration

- **Target Instance**: `https://rjxbdjgagizjmjwnlbxx.supabase.co`
- **Complete PostgreSQL DDL Script**: Located at [`supabase/schema.sql`](supabase/schema.sql)
  - 12 Production Tables: `profiles`, `internal_tasks`, `attendance`, `leaves`, `clients`, `projects`, `project_milestones`, `freelancers`, `payouts`, `invoices`, `qc_reviews`, `internal_chats`, `chat_channels`.
  - Strict Row Level Security (RLS) policies configured for all roles.
  - Ready to execute directly in your [Supabase SQL Editor](https://supabase.com/dashboard/project/rjxbdjgagizjmjwnlbxx/sql/new).

---

## 📦 Multi-Platform Packaging Commands

### 1. Run in Development Mode:
```bash
npm run dev
```

### 2. Verify TypeScript Compilation & Production Web Build:
```bash
npm run build
```

### 3. Generate Windows Desktop App (.exe):
```bash
npm run build:exe
```
> Pre-configured with Electron 34+ and `electron-builder` to package into `dist-package/DigiWorku-Commander-Setup.exe`.

### 4. Generate Android Mobile App (.apk):
```bash
npm run build:apk
```
> Pre-configured with Capacitor 6+ and `@capacitor/android` to synchronize web assets and compile debug APK in `android/app/build/outputs/apk/debug/app-debug.apk`.
