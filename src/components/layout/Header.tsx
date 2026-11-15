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
  Globe
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
    showToast,
    darkMode,
    toggleDarkMode
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'super_admin', label: 'Super Admin', desc: 'Full root access to all 12 modules & settings' },
    { id: 'hr_manager', label: 'HR Manager', desc: 'Employees, Attendance, Leave requests, Culture' },
    { id: 'project_manager', label: 'Project Manager', desc: 'Tasks, Projects, Radar, QA, Freelancers' },
    { id: 'sales_manager', label: 'Sales Manager', desc: 'Client CRM, Pipelines, Quote generator' },
    { id: 'team_member', label: 'Team Member', desc: 'Tasks & Time only (Strictly NO Finance/Salaries)' },
    { id: 'qa_manager', label: 'QA Manager', desc: 'QC 100-Pt Engine, Gate keeper, Sandbox' },
    { id: 'finance_manager', label: 'Finance Manager', desc: 'Payroll, Invoices, P&L reports, Disbursements' },
    { id: 'freelancer', label: 'Freelancer', desc: 'Contractor view: Assigned tasks & Deliverables' }
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
        return 'Executive Operations Dashboard';
      case 'employees':
        return 'Workforce Hub & KYC Vault';
      case 'attendance':
        return 'Attendance & Live Shift Tracker';
      case 'tasks':
        return 'Kanban Pipeline Tasks';
      case 'crm':
        return 'Client & CRM Leads Pipeline';
      case 'projects':
        return 'Project Milestones & Staging';
      case 'freelancers':
        return 'Freelancer Talent Network';
      case 'finance':
        return 'Finance, Payroll & P&L Engine';
      case 'chat':
        return 'Internal Chat Support Hub';
      case 'qc':
        return 'QC 100-Point Audit Engine';
      case 'analytics':
        return 'Performance & SLA Analytics';
      case 'ai':
        return 'DigiWorku AI Operations Copilot';
      case 'notifications':
        return 'System Notifications & Operational Alerts';
      case 'settings':
        return 'System Configuration & Enterprise Audit';
      default:
        return 'DigiWorku Commander';
    }
  };

  return (
    <header className={`h-16 px-4 md:px-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md select-none transition-colors duration-200 ${
      darkMode ? 'bg-[#14171d]/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
    }`}>
      {/* Title */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className={`text-sm md:text-base font-black tracking-tight font-display ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {getModuleTitle()}
          </h1>
          <p className={`text-[10px] font-bold hidden sm:block ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            DigiWorku Operations Hub • Live Real-time Matrix
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Attendance Punch Widget */}
        <div className={`flex items-center rounded-xl p-1 border text-xs ${
          darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          <div className={`flex items-center gap-2 px-3 py-1 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCheckedIn ? 'bg-[#00c853]' : 'bg-slate-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isCheckedIn ? 'bg-[#00c853]' : 'bg-slate-600'}`}></span>
            </span>
            <span className={`font-bold text-[11px] ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Shift:</span>
            <span className={`font-mono font-bold text-xs ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>{isCheckedIn ? formatElapsedTime(elapsedSeconds) : 'Offline'}</span>
            {isLateToday && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold">
                Late
              </span>
            )}
          </div>

          <button
            onClick={toggleCheckIn}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black transition-all text-xs cursor-pointer ${
              isCheckedIn
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border border-amber-500/30'
                : 'bg-[#00c853] hover:bg-[#00af48] text-white shadow-md shadow-[#00c853]/20'
            }`}
          >
            {isCheckedIn ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Punch Out</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Punch In</span>
              </>
            )}
          </button>
        </div>

        {/* Live Sync Button */}
        <button
          onClick={() => showToast('Syncing telemetry with Supabase Cloud...', 'info')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          title="Sync Telemetry"
        >
          <RefreshCw className="w-4 h-4 text-[#00c853]" />
        </button>

        {/* Public Portal Switcher */}
        {onTogglePortalMode && (
          <button
            onClick={onTogglePortalMode}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 text-xs font-bold transition-all cursor-pointer"
            title="Switch to DigiWorku Public Portal"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Portal</span>
          </button>
        )}

        {/* Supabase Status Pill */}
        <button
          onClick={onOpenSupabaseModal}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 hover:bg-[#00c853]/20 transition-all text-xs font-bold cursor-pointer"
          title="Supabase PostgreSQL Cloud DB"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Supabase Live</span>
        </button>

        {/* RBAC Role Simulator Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
              darkMode 
                ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#00c853]" />
            <div className="text-left hidden sm:block">
              <div className={`text-[9px] uppercase font-black ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Role View</div>
              <div className={`text-xs font-bold capitalize ${darkMode ? 'text-white' : 'text-slate-900'}`}>{currentRole.replace('_', ' ')}</div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          </button>

          {roleDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setRoleDropdownOpen(false)}
              />
              <div className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className={`px-3 py-2 border-b ${darkMode ? 'border-slate-800/80' : 'border-slate-200/80'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>RBAC Role Simulator</span>
                    <span className="text-[10px] text-[#00c853] font-mono font-bold">8 Roles</span>
                  </div>
                  <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Switch perspective to test role permissions</p>
                </div>

                <div className="py-1 space-y-0.5 max-h-80 overflow-y-auto">
                  {roles.map((r) => {
                    const isSelected = currentRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          switchRole(r.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#00c853]/15 text-[#00c853] font-bold border border-[#00c853]/30'
                            : darkMode ? 'hover:bg-slate-800/80 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isSelected ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00c853]" />
                          ) : (
                            <div className={`w-3.5 h-3.5 rounded-full border ${darkMode ? 'border-slate-600' : 'border-slate-300'}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{r.label}</div>
                          <div className={`text-[10px] truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{r.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
