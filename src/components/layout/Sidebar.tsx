import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavModule } from '../../types';
import {
  LayoutGrid,
  BarChart3,
  Calendar,
  Users,
  FileText,
  CircleDollarSign,
  MessageSquare,
  Clock,
  HelpCircle,
  KanbanSquare,
  ShieldCheck,
  Folder,
  Settings,
  LogOut,
  Sparkles,
  Globe,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onTogglePortalMode?: () => void;
}

interface NavItem {
  id: NavModule;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onTogglePortalMode }) => {
  const { activeModule, setActiveModule, darkMode, showToast } = useApp();

  // Navigation matching Image 1 (TaskFlow AI) + Core DigiWorku OS modules
  const primaryNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'analytics', label: 'Statistics', icon: BarChart3 },
    { id: 'tasks', label: 'Kanban Tasks (Fokys)', icon: KanbanSquare, badge: 16 },
    { id: 'attendance', label: 'Schedule', icon: Calendar },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'crm', label: 'CRM & Leads', icon: FileText, badge: 'Active' },
    { id: 'finance', label: 'Finance', icon: CircleDollarSign },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'qc', label: 'QC 100-Point Gate', icon: ShieldCheck, badge: '94%' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col justify-between border-r transition-all duration-200 select-none ${
      darkMode ? 'bg-[#0f121a] border-slate-800' : 'bg-white border-slate-100 shadow-[2px_0_12px_rgba(0,0,0,0.02)]'
    }`}>
      {/* Brand Header matching TaskFlow AI styling */}
      <div>
        <div className={`px-6 py-6 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800/80' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            {/* Blue triangular brand logo from screenshot */}
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-base tracking-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  DigiWorku AI
                </span>
              </div>
              <span className={`text-[10px] font-semibold block ${
                darkMode ? 'text-slate-400' : 'text-slate-400'
              }`}>
                Enterprise OS
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          </div>
        </div>

        {/* Navigation Items (Exact pill styling from Image 1) */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-320px)] pr-2">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/25'
                    : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : darkMode
                        ? 'bg-slate-800 text-blue-400 border border-blue-500/20'
                        : 'bg-blue-50 text-blue-600 border border-blue-200/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card & Logout (Exact replica of Image 1 TaskFlow AI) */}
      <div className="p-4 space-y-3">
        {/* Track. Analyze. Succeed. Promo Card */}
        <div className={`p-4 rounded-3xl border transition-all ${
          darkMode
            ? 'bg-gradient-to-b from-blue-950/40 to-slate-900/60 border-blue-900/40 text-white'
            : 'bg-gradient-to-b from-blue-50/80 to-blue-50/40 border-blue-100/80 text-slate-900'
        }`}>
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-[#2563eb] flex items-center justify-center mb-2.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
            </svg>
          </div>
          <h4 className="text-xs font-black leading-tight text-slate-900 dark:text-white">
            Track.<br />Analyze.<br />Succeed.
          </h4>
          <p className="text-[10px] text-slate-400 font-medium mt-1 leading-snug">
            Monitor progress, set goals, and achieve results faster!
          </p>
          <button
            onClick={() => setActiveModule('settings')}
            className="w-full mt-3 py-2 px-3 rounded-full bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            Upgrade Now
          </button>
        </div>

        {/* Public Website & Logout */}
        <div className="pt-1 flex items-center justify-between text-xs font-semibold px-2 text-slate-400">
          {onTogglePortalMode && (
            <button
              onClick={onTogglePortalMode}
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </button>
          )}

          <button
            onClick={() => showToast('🔒 Session active for Vir Kanwlia (Super Admin)', 'info')}
            className="hover:text-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
