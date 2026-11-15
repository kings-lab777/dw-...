import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  History,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  CreditCard,
  FolderGit2,
  AlertTriangle,
  KanbanSquare,
  Filter
} from 'lucide-react';

export const ActivityModule: React.FC = () => {
  const { auditLogs, darkMode, showToast } = useApp();
  const [filterModule, setFilterModule] = useState<string>('all');

  const activities = [
    {
      id: 'act-1',
      user: 'Vir Kanwlia',
      role: 'Super Admin',
      action: 'Authorized Milestone 2 Payout',
      details: 'Approved ₹4,50,000 disbursement for Nordic Retail omnichannel release',
      time: '12 minutes ago',
      category: 'Finance',
      icon: CreditCard,
      status: 'success'
    },
    {
      id: 'act-2',
      user: 'Aria Montgomery',
      role: 'QC Lead',
      action: 'Passed 100-Point Quality Gate',
      details: 'Quality score 96/100 verified on Apollo Telehealth core microservices',
      time: '45 minutes ago',
      category: 'Quality Control',
      icon: ShieldCheck,
      status: 'success'
    },
    {
      id: 'act-3',
      user: 'Rohit Verma',
      role: 'Operations Manager',
      action: 'Converted Lead to Confirmed Project',
      details: 'Apollo Telehealth Ltd moved from Proposal Sent into In Progress (₹18.5L SOW)',
      time: '2 hours ago',
      category: 'CRM & Pipeline',
      icon: FolderGit2,
      status: 'info'
    },
    {
      id: 'act-4',
      user: 'Marcus Chen',
      role: 'Senior Full-Stack Engineer',
      action: 'Submitted Task Deliverable',
      details: 'Submitted staging preview for Supabase Realtime WebSocket Channels',
      time: '3 hours ago',
      category: 'Tasks',
      icon: KanbanSquare,
      status: 'info'
    },
    {
      id: 'act-5',
      user: 'Priya Sharma',
      role: 'Sales Manager',
      action: 'Drafted Client Proposal Quotation',
      details: 'Created ₹29,00,000 proposal for Fintech Mobile Wallet Architecture',
      time: '5 hours ago',
      category: 'Sales',
      icon: Activity,
      status: 'info'
    }
  ];

  const filtered = activities.filter((act) =>
    filterModule === 'all' || act.category.toLowerCase().includes(filterModule.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Global Activity Center &amp; Audit Trail
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Immutable real-time audit logs of all operational, financial, and quality events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Event Categories</option>
            <option value="finance">Finance &amp; Payouts</option>
            <option value="quality">Quality &amp; Review</option>
            <option value="crm">CRM &amp; Leads</option>
            <option value="tasks">Tasks &amp; Deliverables</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className={`rounded-3xl border p-6 ${
        darkMode ? 'bg-[#0f121a] border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex items-start gap-4 pl-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 z-10 ${
                  darkMode ? 'bg-[#14171d] border-slate-800 text-blue-400' : 'bg-white border-slate-100 text-blue-600 shadow-xs'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                  darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-slate-50/80 border-slate-200/80 text-slate-900'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{item.user}</span>
                      <span className="text-[10px] text-slate-400">({item.role})</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {item.action}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
