import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NavModule } from '../../types';
import {
  Search,
  Command,
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
  Plus,
  ArrowRight,
  X
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickCreate?: (type?: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickCreate
}) => {
  const { setActiveModule, projects, tasks, clients, employees, darkMode } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Actions catalog
  const pages: { id: NavModule; label: string; group: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Executive Dashboard', group: 'Core', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads & Enquiries Pipeline', group: 'Business Development', icon: Users2 },
    { id: 'clients', label: 'Client Directory & Accounts', group: 'Business Development', icon: Building2 },
    { id: 'proposals', label: 'Proposals & Quotations Builder', group: 'Business Development', icon: FileCheck2 },
    { id: 'projects', label: 'Projects & Milestone Engine', group: 'Project Operations', icon: FolderGit2 },
    { id: 'tasks', label: 'Tasks & Workboard (Fokys)', group: 'Project Operations', icon: KanbanSquare },
    { id: 'milestones', label: 'Milestones & Delivery Gates', group: 'Project Operations', icon: Milestone },
    { id: 'qc', label: 'Quality Control (100-Point Gate)', group: 'Project Operations', icon: ShieldCheck },
    { id: 'deliverables', label: 'Deliverables Register', group: 'Project Operations', icon: PackageCheck },
    { id: 'employees', label: 'Employees & Workforce Hub', group: 'Workforce', icon: UserCheck },
    { id: 'freelancers', label: 'Freelancers & Talent Network', group: 'Workforce', icon: Briefcase },
    { id: 'attendance', label: 'Attendance & Leave Register', group: 'Workforce', icon: Clock },
    { id: 'workload', label: 'Workload & Capacity Planning', group: 'Workforce', icon: LineChart },
    { id: 'finance', label: 'Financial Overview & P&L', group: 'Finance', icon: CircleDollarSign },
    { id: 'invoices', label: 'Invoices & Billing', group: 'Finance', icon: Receipt },
    { id: 'payments', label: 'Payments & Collections (₹ INR)', group: 'Finance', icon: CreditCard },
    { id: 'expenses', label: 'Business & Project Expenses', group: 'Finance', icon: Wallet },
    { id: 'payouts', label: 'Freelancer Disbursements', group: 'Finance', icon: Coins },
    { id: 'analytics', label: 'Analytics & SLA Intelligence', group: 'Intelligence', icon: LineChart },
    { id: 'ai', label: 'AI Business Assistant (ChatGPT-style)', group: 'Intelligence', icon: Bot },
    { id: 'notifications', label: 'Notifications Center', group: 'Workspace', icon: Bell },
    { id: 'documents', label: 'Documents Vault', group: 'Workspace', icon: FolderArchive },
    { id: 'activity', label: 'Global Activity Center', group: 'Workspace', icon: Activity },
    { id: 'users', label: 'Users & Permissions (RBAC)', group: 'Administration', icon: ShieldAlert },
    { id: 'departments', label: 'Departments & Service Catalogue', group: 'Administration', icon: Boxes },
    { id: 'templates', label: 'Project Templates', group: 'Administration', icon: FileSpreadsheet },
    { id: 'audit', label: 'Audit Trail Logs', group: 'Administration', icon: History },
    { id: 'settings', label: 'Company Settings', group: 'Administration', icon: Settings },
  ];

  const filteredPages = pages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase()) ||
    p.group.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all ${
        darkMode ? 'bg-[#0f121a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Search Input Bar */}
        <div className="p-4 border-b flex items-center gap-3 border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, page name, or search project/task..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold focus:outline-none placeholder:text-slate-400"
          />
          <kbd className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
          }`}>
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Create Actions */}
          {onOpenQuickCreate && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Quick Actions
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {[
                  { label: 'New Lead', type: 'lead' },
                  { label: 'New Project', type: 'project' },
                  { label: 'New Task', type: 'task' },
                  { label: 'New Proposal', type: 'proposal' },
                  { label: 'New Invoice', type: 'invoice' },
                  { label: 'Ask AI Copilot', type: 'ai' }
                ].map((act) => (
                  <button
                    key={act.label}
                    onClick={() => {
                      onClose();
                      if (act.type === 'ai') {
                        setActiveModule('ai');
                      } else {
                        onOpenQuickCreate(act.type);
                      }
                    }}
                    className={`p-2 rounded-xl text-left text-xs font-bold border transition-colors flex items-center justify-between cursor-pointer ${
                      darkMode
                        ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500 text-slate-300'
                        : 'bg-slate-50 border-slate-200/80 hover:border-blue-500 text-slate-700'
                    }`}
                  >
                    <span>{act.label}</span>
                    <Plus className="w-3.5 h-3.5 text-blue-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Matches */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Navigation Pages ({filteredPages.length})
            </span>
            <div className="space-y-0.5 pt-1">
              {filteredPages.slice(0, 10).map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveModule(p.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      darkMode
                        ? 'hover:bg-slate-800/80 text-slate-200'
                        : 'hover:bg-blue-50/70 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-left">{p.label}</div>
                        <div className="text-[10px] text-slate-400 text-left">{p.group}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matching Tasks */}
          {query.trim() && filteredTasks.length > 0 && (
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Matching Tasks ({filteredTasks.length})
              </span>
              <div className="space-y-1 pt-1">
                {filteredTasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveModule('tasks');
                      onClose();
                    }}
                    className={`w-full p-2.5 rounded-xl text-xs text-left border flex items-center justify-between transition-colors cursor-pointer ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{t.title}</div>
                      <div className="text-[10px] text-slate-400">{t.projectName} • {t.status}</div>
                    </div>
                    <span className="text-[10px] font-mono text-blue-500 font-bold">{t.progressPercent}%</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-3 border-t flex items-center justify-between text-[11px] text-slate-400 ${
          darkMode ? 'border-slate-800 bg-[#090d14]' : 'border-slate-100 bg-slate-50'
        }`}>
          <span>Navigation shortcut: Use arrow keys or click</span>
          <span className="font-mono font-bold">DigiWorku Commander</span>
        </div>
      </div>
    </div>
  );
};
