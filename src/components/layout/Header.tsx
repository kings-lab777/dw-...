import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Clock,
  Play,
  Square,
  Database,
  ChevronDown,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  onOpenSupabaseModal: () => void;
  onTogglePortalMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSupabaseModal, onTogglePortalMode }) => {
  const {
    currentRole,
    currentUser,
    switchRole,
    activeModule,
    isCheckedIn,
    checkInTime,
    elapsedSeconds,
    toggleCheckIn,
    isLateToday,
    darkMode,
    toggleDarkMode
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

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'dashboard':
        return 'Executive Operations Command';
      case 'crm':
        return 'CRM & Client Leads Pipeline';
      case 'projects':
        return 'Projects & Milestone Engine';
      case 'tasks':
        return 'Kanban Workflow (Fokys Board)';
      case 'qc':
        return 'Quality Assurance & Delivery Gate';
      case 'employees':
        return 'Workforce Directory & KYC Vault';
      case 'freelancers':
        return 'Freelancer Talent & Disbursements';
      case 'finance':
        return 'Finance, Invoicing & P&L Ledger (₹)';
      case 'attendance':
        return 'Attendance & Live Shift Tracker';
      case 'analytics':
        return 'Performance & SLA Intelligence';
      case 'ai':
        return 'DigiWorku AI Assistant';
      case 'settings':
        return 'Service Catalogue & Enterprise Settings';
      default:
        return 'DigiWorku Commander';
    }
  };

  return (
    <header className={`h-16 px-4 md:px-6 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md select-none transition-colors duration-200 ${
      darkMode ? 'bg-[#0f1115]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-xs'
    }`}>
      {/* Title & Founder Badge */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`text-sm md:text-base font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {getModuleTitle()}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] font-bold border border-[#00c853]/30 hidden sm:inline-block">
              DigiWorku India (₹)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
            Vir Kanwlia • Founder &amp; Executive Commander
          </p>
        </div>
      </div>

      {/* Right Controls: Shift Tracker, Role Switcher, Database Status, Theme */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Attendance / Shift Tracker */}
        <button
          onClick={toggleCheckIn}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isCheckedIn
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20'
              : 'bg-[#00c853]/10 border-[#00c853]/30 text-[#00c853] hover:bg-[#00c853]/20'
          }`}
          title={isCheckedIn ? 'Click to End Active Shift' : 'Click to Punch-In Shift'}
        >
          {isCheckedIn ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono">{formatElapsedTime(elapsedSeconds)}</span>
              <span className="hidden md:inline text-[10px]">End Shift</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Punch In</span>
            </>
          )}
        </button>

        {/* Public Portal Switcher */}
        {onTogglePortalMode && (
          <button
            onClick={onTogglePortalMode}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#00c853]" />
            <span>Public Site</span>
          </button>
        )}

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              darkMode
                ? 'bg-[#14171d] border-slate-800 text-white hover:border-[#00c853]/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-[#00c853]/40 shadow-xs'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#00c853]" />
            <span className="capitalize">{currentRole.replace('_', ' ')}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 ${
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
                    className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                      currentRole === r.id
                        ? 'bg-[#00c853]/15 text-[#00c853] font-bold'
                        : darkMode
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
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

        {/* Database Status */}
        <button
          onClick={onOpenSupabaseModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-[#00c853]/10 text-[#00c853] text-xs font-bold cursor-pointer"
          title="Supabase Database Live"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden md:inline font-mono text-[11px]">DB Live</span>
        </button>

        {/* Sun / Moon Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-[#14171d] border-slate-800 text-amber-400 hover:text-white'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
