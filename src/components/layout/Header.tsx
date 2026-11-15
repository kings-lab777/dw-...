import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Search,
  Mic,
  Sun,
  Moon,
  Bell,
  Settings,
  Database,
  Shield,
  ChevronDown,
  Play,
  Square,
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
    setActiveModule,
    isCheckedIn,
    elapsedSeconds,
    toggleCheckIn,
    darkMode,
    toggleDarkMode,
    showToast
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <header className={`h-20 px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 select-none ${
      darkMode ? 'bg-[#0f121a]/90 backdrop-blur-md border-b border-slate-800' : 'bg-[#f4f7fb]/90 backdrop-blur-md'
    }`}>
      {/* Left: Greeting matching Image 1 ("Hello, Shakib! 👋") */}
      <div>
        <h1 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}>
          <span>Hello, Vir!</span>
          <span>👋</span>
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Welcome and Let's do checkouts your projects!
        </p>
      </div>

      {/* Right: Search bar with Mic, Theme, Bell, Settings, and Profile Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Pill Search Box matching Image 1 */}
        <div className="relative hidden md:flex items-center">
          <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all ${
            darkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus-within:border-blue-500'
              : 'bg-white border-slate-200/80 text-slate-700 focus-within:border-blue-500 shadow-xs'
          }`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none w-44 placeholder:text-slate-400"
            />
            <button
              onClick={() => showToast('🎤 Voice assistant ready (Listening...)', 'info')}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              title="Voice Search"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Shift Punch-In / Timer */}
        <button
          onClick={toggleCheckIn}
          className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
            isCheckedIn
              ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
              : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
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

        {/* Database Status Button */}
        <button
          onClick={onOpenSupabaseModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-bold cursor-pointer"
          title="Supabase Database Live"
        >
          <Database className="w-3 h-3" />
          <span className="font-mono text-[10px]">DB Live</span>
        </button>

        {/* Sun / Moon Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Bell Notifications with Red Dot */}
        <button
          onClick={() => setActiveModule('notifications')}
          className={`w-9 h-9 rounded-full border flex items-center justify-center relative transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Settings Icon */}
        <button
          onClick={() => setActiveModule('settings')}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs'
          }`}
          title="System Settings"
        >
          <Settings className="w-4 h-4" />
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
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
            />
          </button>

          {roleDropdownOpen && (
            <div className={`absolute right-0 mt-3 w-72 rounded-3xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'
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
                    className={`w-full text-left p-2.5 rounded-2xl text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
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
