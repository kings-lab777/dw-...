import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Search,
  Command,
  Plus,
  Sun,
  Moon,
  Bell,
  Settings,
  Database,
  Shield,
  ChevronDown,
  Play,
  Square,
  Globe,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  onOpenSupabaseModal: () => void;
  onTogglePortalMode?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenQuickCreate?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSupabaseModal,
  onTogglePortalMode,
  onOpenCommandPalette,
  onOpenQuickCreate
}) => {
  const {
    currentRole,
    currentUser,
    switchRole,
    activeModule,
    setActiveModule,
    isCheckedIn,
    elapsedSeconds,
    toggleCheckIn,
    darkMode,
    toggleDarkMode,
    showToast
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'super_admin', label: 'Super Admin', desc: 'Full root access to all modules & financials' },
    { id: 'operations_manager', label: 'Operations Manager', desc: 'End-to-end ops, workload & allocations' },
    { id: 'project_manager', label: 'Project Manager', desc: 'Projects, Fokys tasks & deliverable handoffs' },
    { id: 'sales_manager', label: 'Sales Manager', desc: 'CRM pipeline, inbound leads & proposals' },
    { id: 'finance_manager', label: 'Finance Manager', desc: 'Invoices, partial payments & P&L in INR' },
    { id: 'qc_reviewer', label: 'QC Reviewer', desc: '100-Point quality gates & delivery signoffs' },
    { id: 'team_member', label: 'Team Member', desc: 'Assigned tasks & time tracking only' },
    { id: 'freelancer', label: 'Freelancer', desc: 'Contractor portal: Tasks & INR payouts' }
  ];

  const formatElapsedTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBreadcrumbInfo = () => {
    switch (activeModule) {
      case 'dashboard':
        return { group: 'Executive', title: 'Dashboard Overview' };
      case 'leads':
      case 'crm':
        return { group: 'Business Development', title: 'Leads & Enquiries' };
      case 'clients':
        return { group: 'Business Development', title: 'Client Directory' };
      case 'proposals':
        return { group: 'Business Development', title: 'Proposals & Quotations' };
      case 'projects':
        return { group: 'Project Operations', title: 'Projects' };
      case 'tasks':
        return { group: 'Project Operations', title: 'Tasks & Workboard (Fokys)' };
      case 'milestones':
        return { group: 'Project Operations', title: 'Milestones Engine' };
      case 'qc':
        return { group: 'Project Operations', title: 'Quality Control Gate' };
      case 'deliverables':
        return { group: 'Project Operations', title: 'Deliverables Register' };
      case 'employees':
        return { group: 'Workforce', title: 'Employees & KYC' };
      case 'freelancers':
        return { group: 'Workforce', title: 'Freelancers Network' };
      case 'attendance':
        return { group: 'Workforce', title: 'Attendance & Leave' };
      case 'workload':
        return { group: 'Workforce', title: 'Workload & Capacity' };
      case 'finance':
        return { group: 'Finance', title: 'Financial Overview (₹)' };
      case 'invoices':
        return { group: 'Finance', title: 'Invoices & Billing' };
      case 'payments':
        return { group: 'Finance', title: 'Payments & Collections' };
      case 'expenses':
        return { group: 'Finance', title: 'Business Expenses' };
      case 'payouts':
        return { group: 'Finance', title: 'Freelancer Payouts' };
      case 'analytics':
        return { group: 'Intelligence', title: 'Analytics & SLA Intelligence' };
      case 'ai':
        return { group: 'Intelligence', title: 'DigiWorku AI Copilot' };
      case 'notifications':
        return { group: 'Workspace', title: 'Notifications Center' };
      case 'documents':
        return { group: 'Workspace', title: 'Documents Vault' };
      case 'activity':
        return { group: 'Workspace', title: 'Activity Center' };
      case 'users':
        return { group: 'Administration', title: 'Users & Permissions' };
      case 'departments':
      case 'services':
        return { group: 'Administration', title: 'Departments & Service Catalogue' };
      case 'templates':
        return { group: 'Administration', title: 'Project Templates' };
      case 'audit':
        return { group: 'Administration', title: 'Audit Trail Logs' };
      case 'settings':
        return { group: 'Administration', title: 'Company Settings' };
      default:
        return { group: 'DigiWorku', title: 'Commander OS' };
    }
  };

  const breadcrumb = getBreadcrumbInfo();

  return (
    <header className={`h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 select-none border-b ${
      darkMode ? 'bg-[#0c1017]/95 backdrop-blur-md border-slate-800' : 'bg-white/95 backdrop-blur-md border-slate-200/80'
    }`}>
      {/* Left: Breadcrumbs & Context Title (Linear/Stripe Standard) */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-400 hidden sm:inline">
          DigiWorku
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 hidden sm:inline" />
        <span className="font-semibold text-slate-400 hidden sm:inline">
          {breadcrumb.group}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 hidden sm:inline" />
        <h2 className={`font-extrabold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {breadcrumb.title}
        </h2>
      </div>

      {/* Right Controls: Command Palette, Quick Create, Shift, DB, Theme, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Command Palette Trigger */}
        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-600'
            }`}>
              Ctrl K
            </kbd>
          </button>
        )}

        {/* Global Quick-Create Button */}
        {onOpenQuickCreate && (
          <button
            onClick={onOpenQuickCreate}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
          </button>
        )}

        {/* Shift Punch-In / Timer */}
        <button
          onClick={toggleCheckIn}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isCheckedIn
              ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
              : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-400'
          }`}
          title={isCheckedIn ? 'Click to End Active Shift' : 'Click to Punch-In Shift'}
        >
          {isCheckedIn ? (
            <>
              <Square className="w-3 h-3 fill-current" />
              <span className="font-mono text-[11px]">{formatElapsedTime(elapsedSeconds)}</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span className="text-[11px]">Punch In</span>
            </>
          )}
        </button>

        {/* Supabase DB Status */}
        <button
          onClick={onOpenSupabaseModal}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold cursor-pointer"
          title="Supabase Database Live"
        >
          <Database className="w-3 h-3" />
          <span className="font-mono text-[10px]">DB Live</span>
        </button>

        {/* Sun / Moon Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Bell Notifications */}
        <button
          onClick={() => setActiveModule('notifications')}
          className={`w-8 h-8 rounded-xl border flex items-center justify-center relative transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs'
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Profile Avatar with Role Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 cursor-pointer focus:outline-none"
            title="Profile & Operational Role"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Vir Kanwlia"
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-2xs"
            />
          </button>

          {roleDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
                Switch Operational Role
              </div>
              <div className="space-y-1 mt-1 max-h-72 overflow-y-auto">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                      currentRole === r.id
                        ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-900/40 dark:text-blue-400'
                        : darkMode
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Shield className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold">{r.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal leading-tight">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
