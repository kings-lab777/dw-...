import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavModule } from '../../types';
import {
  BarChart3,
  Users,
  Folder,
  HelpCircle,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Layers,
  Briefcase,
  Settings,
  CircleDollarSign,
  ShieldCheck,
  Bot,
  Globe,
  Clock,
  KanbanSquare,
  Sparkles,
  ExternalLink,
  Zap,
  Activity
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
  const { activeModule, setActiveModule, darkMode } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { id: 'crm', label: 'CRM & Client Leads', icon: HelpCircle, badge: 'Pipeline' },
    { id: 'projects', label: 'Projects & Staging', icon: Folder, badge: 'Active' },
    { id: 'tasks', label: 'Kanban Tasks (Fokys)', icon: KanbanSquare, badge: 16 },
    { id: 'qc', label: 'QC 100-Point Gate', icon: ShieldCheck, badge: '94%' },
    { id: 'employees', label: 'Workforce Hub & KYC', icon: Users, badge: 8 },
    { id: 'freelancers', label: 'Freelancer Network', icon: UserCheck, badge: 'Talent' },
    { id: 'finance', label: 'Finance & Payroll (₹)', icon: CircleDollarSign },
    { id: 'attendance', label: 'Shift & Time Tracker', icon: Clock, badge: 'Live' },
    { id: 'analytics', label: 'Growth & SLA Analytics', icon: TrendingUp },
    { id: 'ai', label: 'DigiWorku AI Copilot', icon: Bot, badge: 'Flash' },
    { id: 'settings', label: 'Services & System Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col justify-between border-r transition-all duration-200 select-none ${
      darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Exact DigiWorku Brand Header */}
      <div>
        <div className={`p-5 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800/80' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00c853] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#00c853]/20">
              DW
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-sm tracking-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  DigiWorku
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30">
                  COMMANDER
                </span>
              </div>
              <span className={`text-[10px] font-bold block ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Operator Control Hub
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c853] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00c853]"></span>
            </span>
          </div>
        </div>

        {/* Navigation Modules */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00c853] text-white shadow-md shadow-[#00c853]/25'
                    : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-black/20 text-white'
                        : darkMode
                        ? 'bg-slate-800 text-[#00c853] border border-[#00c853]/20'
                        : 'bg-emerald-50 text-[#00c853] border border-emerald-200'
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

      {/* Bottom Switcher: Public Ecosystem Portal */}
      <div className={`p-4 border-t space-y-2.5 ${darkMode ? 'border-slate-800/80 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'}`}>
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
          <span className="flex items-center gap-1.5 text-xs text-[#00c853]">
            <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
            Backend Connected
          </span>
          <span className="font-mono text-[10px]">Port 5000</span>
        </div>

        {onTogglePortalMode && (
          <button
            onClick={onTogglePortalMode}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-xs'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#00c853]" />
            <span>Open Public Website</span>
          </button>
        )}
      </div>
    </aside>
  );
};
