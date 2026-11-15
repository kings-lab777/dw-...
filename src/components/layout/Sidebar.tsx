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
  Lock,
  Plus,
  Clock,
  KanbanSquare,
  Globe,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  onTogglePortalMode?: () => void;
}

interface NavItem {
  id: NavModule;
  label: string;
  moduleCode: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onTogglePortalMode }) => {
  const { activeModule, setActiveModule, hasAccessTo, currentRole, currentUser, notifications, darkMode, toggleDarkMode } = useApp();

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Executive Dashboard', moduleCode: 'M1', icon: BarChart3 },
    { id: 'employees', label: 'Workforce Hub & KYC', moduleCode: 'M2', icon: Users, badge: 8 },
    { id: 'attendance', label: 'Shift & Time Tracker', moduleCode: 'M3', icon: Clock, badge: 'Live' },
    { id: 'tasks', label: 'Kanban Tasks Pipeline', moduleCode: 'M4', icon: KanbanSquare, badge: 5 },
    { id: 'crm', label: 'Client CRM & Leads', moduleCode: 'M5', icon: HelpCircle },
    { id: 'projects', label: 'Projects & Milestones', moduleCode: 'M6', icon: Folder, badge: '1 Alert' },
    { id: 'freelancers', label: 'Freelancer Network', moduleCode: 'M7', icon: UserCheck, badge: 3 },
    { id: 'finance', label: 'Finance & Payroll', moduleCode: 'M8', icon: CircleDollarSign },
    { id: 'chat', label: 'Chat Support Hub', moduleCode: 'M9', icon: MessageSquare, badge: 3 },
    { id: 'qc', label: 'QC 100-Point Engine', moduleCode: 'M10', icon: ShieldCheck, badge: '94%' },
    { id: 'analytics', label: 'Growth & SLA Analytics', moduleCode: 'M11', icon: TrendingUp },
    { id: 'ai', label: 'DigiWorku AI Copilot', moduleCode: 'M12', icon: Bot, badge: 'Flash' },
    { id: 'notifications', label: 'Notifications Hub', moduleCode: 'M13', icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : undefined },
    { id: 'settings', label: 'System Settings', moduleCode: 'M14', icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col border-r transition-all duration-200 select-none ${
      darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Exact DigiWorku Brand Header */}
      <div className={`p-5 border-b flex items-center justify-between ${
        darkMode ? 'border-slate-800/80' : 'border-slate-200/80'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00c853] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#00c853]/20">
            DW
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-black text-sm tracking-tight font-display ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                DigiWorku
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                COMMANDER
              </span>
            </div>
            <span className={`text-[10px] font-bold block ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Operator Control Node
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

      {/* Navigation Modules (Exact DigiWorku SidebarNavButton styling) */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          const accessible = hasAccessTo(item.id);

          return (
            <button
              key={item.id}
              onClick={() => accessible && setActiveModule(item.id)}
              disabled={!accessible}
              className={`w-full flex items-center justify-between p-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00c853] text-white shadow-md shadow-[#00c853]/20 font-black'
                  : accessible
                  ? darkMode
                    ? 'text-slate-300 hover:text-[#00c853] hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : darkMode
                  ? 'text-slate-600 cursor-not-allowed hover:bg-transparent'
                  : 'text-slate-300 cursor-not-allowed hover:bg-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-white' : accessible ? (darkMode ? 'text-slate-400' : 'text-slate-500') : 'text-slate-400'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {!accessible ? (
                  <Lock className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                ) : item.badge !== undefined ? (
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : darkMode
                        ? 'bg-[#00c853]/15 text-[#00c853]'
                        : 'bg-emerald-50 text-[#00c853] border border-emerald-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
        {/* Navigation to Public Portal */}
        {onTogglePortalMode && (
          <div className={`pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <button
              onClick={onTogglePortalMode}
              className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl text-xs font-bold text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 shrink-0" />
                <span>Public Portal</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-600 font-mono">
                Live
              </span>
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar Footer with Exact Action Button & Operator Card */}
      <div className={`p-4 border-t space-y-3 ${
        darkMode ? 'border-slate-800/80 bg-[#14171d]' : 'border-slate-200/80 bg-slate-50/50'
      }`}>
        <button
          onClick={() => setActiveModule('tasks')}
          className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-xs font-black text-white bg-[#00c853] hover:bg-[#00af48] shadow-md shadow-[#00c853]/15 transition-all select-none cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PIPELINE TASK</span>
        </button>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#00c853]/40"
            />
            <div className="min-w-0">
              <span className={`text-xs font-bold truncate block ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {currentUser.fullName}
              </span>
              <span className="text-[9px] text-[#00c853] font-extrabold uppercase block capitalize">
                {currentRole.replace('_', ' ')}
              </span>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
