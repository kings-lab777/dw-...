import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavModule } from '../../types';
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Users,
  CheckSquare,
  CircleDollarSign,
  MessageSquare,
  Clock,
  HelpCircle,
  LogOut,
  FolderKanban,
  UserCheck,
  ShieldCheck,
  Building2,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, darkMode } = useApp();

  const navItems: { id: NavModule; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks (Fokys)', icon: FolderKanban, badge: '16' },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'crm', label: 'CRM & Leads', icon: HelpCircle },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'freelancers', label: 'Freelancers', icon: UserCheck },
    { id: 'finance', label: 'Finance', icon: CircleDollarSign },
    { id: 'qc', label: 'Quality (QC)', icon: ShieldCheck, badge: '94%' },
    { id: 'attendance', label: 'Schedule', icon: Calendar },
    { id: 'analytics', label: 'Statistics', icon: BarChart3 },
    { id: 'chat', label: 'Messages', icon: MessageSquare, badge: '?' },
    { id: 'ai', label: 'AI Copilot', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col justify-between p-4 border-r transition-all duration-200 select-none ${
      darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
    }`}>
      {/* Top Brand Logo (Exact TaskFlow AI Style) */}
      <div>
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/25">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
            </svg>
          </div>
          <div>
            <div className={`text-base font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              TaskFlow <span className="text-[#2563eb]">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              DigiWorku OS
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-600/20'
                    : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === '?'
                        ? 'w-4 h-4 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center text-[10px]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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

      {/* Bottom Promo Card & Logout (Exact TaskFlow AI Style) */}
      <div className="space-y-3 pt-3">
        {/* Track. Analyze. Succeed. Promo Card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-blue-50/60 border-blue-100/70'
        }`}>
          <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center mb-2 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <h4 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Track. Analyze. Succeed.
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Monitor progress, set goals, and achieve results faster!
          </p>
          <button
            onClick={() => setActiveModule('settings')}
            className="mt-3 w-full py-1.5 px-3 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            Upgrade Now
          </button>
        </div>

        {/* Logout Link */}
        <button
          onClick={() => alert('Logged out from DigiWorku TaskFlow AI.')}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
