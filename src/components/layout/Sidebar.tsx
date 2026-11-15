import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavModule } from '../../types';
import {
  LayoutDashboard,
  Users2,
  Building2,
  FileCheck2,
  FolderGit2,
  KanbanSquare,
  Milestone,
  ShieldCheck,
  PackageCheck,
  UserCheck,
  Briefcase,
  Clock,
  LineChart,
  CircleDollarSign,
  Receipt,
  CreditCard,
  Wallet,
  Coins,
  Bot,
  Bell,
  FolderArchive,
  Activity,
  ShieldAlert,
  Boxes,
  FileSpreadsheet,
  History,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Command,
  Globe,
  LogOut,
  Building
} from 'lucide-react';

interface SidebarProps {
  onTogglePortalMode?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenQuickCreate?: () => void;
}

interface NavItem {
  id: NavModule;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  onTogglePortalMode,
  onOpenCommandPalette,
  onOpenQuickCreate
}) => {
  const { activeModule, setActiveModule, darkMode, showToast, currentRole } = useApp();

  // Collapsible groups state
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    admin: false,
    workspace: false
  });

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // 8 Structured Groups following Master Specification Part 2.3
  const navGroups: NavGroup[] = [
    {
      id: 'core',
      title: 'CORE PLATFORM',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      id: 'bizdev',
      title: 'BUSINESS DEVELOPMENT',
      items: [
        { id: 'leads', label: 'Leads & Enquiries', icon: Users2, badge: 'Pipeline' },
        { id: 'clients', label: 'Clients', icon: Building2 },
        { id: 'proposals', label: 'Proposals & Quotations', icon: FileCheck2 },
      ]
    },
    {
      id: 'projects',
      title: 'PROJECT OPERATIONS',
      items: [
        { id: 'projects', label: 'Projects', icon: FolderGit2, badge: 6 },
        { id: 'tasks', label: 'Tasks & Workboard', icon: KanbanSquare, badge: 16 },
        { id: 'milestones', label: 'Milestones', icon: Milestone },
        { id: 'qc', label: 'Quality Control', icon: ShieldCheck, badge: '94%' },
        { id: 'deliverables', label: 'Deliverables', icon: PackageCheck },
      ]
    },
    {
      id: 'workforce',
      title: 'WORKFORCE',
      items: [
        { id: 'employees', label: 'Employees', icon: UserCheck, badge: 8 },
        { id: 'freelancers', label: 'Freelancers', icon: Briefcase, badge: 'Talent' },
        { id: 'attendance', label: 'Attendance & Leave', icon: Clock, badge: 'Live' },
        { id: 'workload', label: 'Workload & Capacity', icon: LineChart },
      ]
    },
    {
      id: 'finance',
      title: 'FINANCE (₹ INR)',
      items: [
        { id: 'finance', label: 'Financial Overview', icon: CircleDollarSign },
        { id: 'invoices', label: 'Invoices', icon: Receipt },
        { id: 'payments', label: 'Payments & Collections', icon: CreditCard },
        { id: 'expenses', label: 'Expenses', icon: Wallet },
        { id: 'payouts', label: 'Freelancer Payouts', icon: Coins },
      ]
    },
    {
      id: 'intelligence',
      title: 'INTELLIGENCE',
      items: [
        { id: 'analytics', label: 'Analytics & Reports', icon: LineChart },
        { id: 'ai', label: 'AI Business Assistant', icon: Bot, badge: 'Flash' },
      ]
    },
    {
      id: 'workspace',
      title: 'WORKSPACE',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
        { id: 'documents', label: 'Documents Vault', icon: FolderArchive },
        { id: 'activity', label: 'Activity Center', icon: Activity },
      ]
    },
    {
      id: 'admin',
      title: 'ADMINISTRATION',
      items: [
        { id: 'users', label: 'Users & Permissions', icon: ShieldAlert },
        { id: 'departments', label: 'Departments & Services', icon: Boxes },
        { id: 'templates', label: 'Project Templates', icon: FileSpreadsheet },
        { id: 'audit', label: 'Audit Logs', icon: History },
        { id: 'settings', label: 'Company Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col justify-between border-r transition-all duration-200 select-none ${
        darkMode
          ? 'bg-[#0c1017] border-slate-800 text-slate-300'
          : 'bg-[#f8fafc] border-slate-200/80 text-slate-700'
      }`}
    >
      {/* Top Workspace Header (Linear/Stripe Style) */}
      <div>
        <div className={`p-4 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800 bg-[#0c1017]' : 'border-slate-200/80 bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              DW
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-xs tracking-tight truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  DigiWorku
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
                  COMMANDER
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block truncate">
                Gurugram HQ • Ops OS
              </span>
            </div>
          </div>

          {/* Quick Create Trigger Button */}
          {onOpenQuickCreate && (
            <button
              onClick={onOpenQuickCreate}
              className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Quick Create (Lead, Project, Task, Invoice...)"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Global Command Palette Quick Shortcut */}
        <div className="p-3 pb-1">
          <button
            onClick={onOpenCommandPalette}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <span className="flex items-center gap-2">
              <Command className="w-3.5 h-3.5 text-slate-400" />
              <span>Search or jump to...</span>
            </span>
            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Main Navigation Scroll Area (8 Grouped Sections) */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] pr-2 scrollbar-thin">
          {navGroups.map((group) => {
            const isCollapsed = collapsedGroups[group.id];

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Title Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer`}
                >
                  <span>{group.title}</span>
                  {isCollapsed ? (
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  )}
                </button>

                {/* Group Navigation Items */}
                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeModule === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveModule(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/25'
                              : darkMode
                              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive ? 'text-white' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
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
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Bar & Public Switcher */}
      <div className={`p-3 border-t space-y-2 ${
        darkMode ? 'border-slate-800 bg-[#0c1017]' : 'border-slate-200/80 bg-white'
      }`}>
        <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Backend &amp; DB Live
          </span>
          <span className="font-mono text-[10px]">Port 5000</span>
        </div>

        <div className="flex items-center gap-2">
          {onTogglePortalMode && (
            <button
              onClick={onTogglePortalMode}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Open Public Customer Portal"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Public Portal</span>
            </button>
          )}

          <button
            onClick={() => showToast('Session active for Vir Kanwlia (Super Admin)', 'info')}
            className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-200'
            }`}
            title="Session Details"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
