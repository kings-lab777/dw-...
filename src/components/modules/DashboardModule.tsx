import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SvgTrendChart } from '../dashboard/SvgTrendChart';
import {
  Folder,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Play,
  Square,
  Sparkles,
  Bot,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  DollarSign,
  Calendar,
  FileCheck2,
  ShieldAlert,
  Clock4,
  ExternalLink,
  Filter
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const {
    projects,
    tasks,
    financialSummary,
    attendanceRecords,
    leaveRequests,
    qcReviews,
    employees,
    auditLogs,
    currentRole,
    currentUser,
    setActiveModule,
    isCheckedIn,
    toggleCheckIn,
    showToast,
    darkMode
  } = useApp();

  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'last_month' | 'custom'>('month');

  // Computed metrics based on actual state
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.isActive).length;
  const presentToday = attendanceRecords.filter((a) => a.status === 'present' || a.status === 'late').length;
  const absentToday = Math.max(0, totalEmployees - presentToday);

  const activeProjects = projects.filter((p) => p.status === 'active' || p.status === 'delayed');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const delayedProjects = projects.filter((p) => p.status === 'delayed' || (p.daysDelayed && p.daysDelayed > 0));

  const pendingTasks = tasks.filter((t) => t.status !== 'done');
  const completedTasks = tasks.filter((t) => t.status === 'done');

  const pendingApprovalsCount =
    leaveRequests.filter((l) => l.status === 'pending').length +
    qcReviews.filter((q) => q.decision === 'pending').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto relative select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. COMPANY OVERVIEW & TELEMETRY BANNER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden rounded-2xl border transition-colors duration-200 p-6 ${
        darkMode 
          ? 'border-slate-800 bg-[#14171d] shadow-xl' 
          : 'border-slate-200 bg-white shadow-sm'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00c853]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c853] animate-ping" />
                COMMAND HUB ONLINE
              </span>
              <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                • 14 Operations Subsystems Synchronized
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-black font-display tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Welcome back, {currentUser.fullName}
            </h2>
            <p className={`text-xs max-w-2xl font-medium ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              DigiWorku Workforce Operating System telemetry: {totalEmployees} employees registered ({activeEmployees} active), {activeProjects.length} active projects in delivery pipeline, and {presentToday} personnel on-duty.
            </p>
          </div>

          {/* Quick Date Filters */}
          <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border shrink-0 ${
            darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['today', 'week', 'month', 'last_month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateFilter(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  dateFilter === range
                    ? 'bg-[#00c853] text-white shadow-md shadow-[#00c853]/20 font-black'
                    : darkMode 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. CORE METRICS BENTO GRID (4 Primary KPI Cards) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Projects */}
        <div className={`p-5 rounded-2xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode 
            ? 'bg-[#14171d] border-slate-800 shadow-xl hover:border-slate-700' 
            : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider font-display ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Active Projects</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Folder className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeProjects.length}
            </span>
            <span className="text-xs font-bold text-[#00c853] flex items-center bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              <ArrowUpRight className="w-3.5 h-3.5" /> {completedProjects.length} Done
            </span>
          </div>
          <div className={`text-[10px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {delayedProjects.length} flagged on radar
          </div>
        </div>

        {/* Card 2: Monthly Revenue (Strictly INR ₹) */}
        <div className={`p-5 rounded-2xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode 
            ? 'bg-[#14171d] border-slate-800 shadow-xl hover:border-slate-700' 
            : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider font-display ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Monthly Revenue</span>
            <div className="p-2 rounded-xl bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            {currentRole === 'team_member' || currentRole === 'freelancer' ? (
              <span className="text-xs font-mono text-slate-400 italic">Confidential (RBAC)</span>
            ) : (
              <>
                <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  ₹{(financialSummary.monthlyRevenue / 1000).toFixed(0)}k
                </span>
                <span className="text-xs font-bold text-[#00c853] flex items-center bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +28% MoM
                </span>
              </>
            )}
          </div>
          <div className={`text-[10px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Net Margin: {financialSummary.profitMarginPercent}% • ₹ INR Ledger
          </div>
        </div>

        {/* Card 3: Tasks Pipeline */}
        <div className={`p-5 rounded-2xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode 
            ? 'bg-[#14171d] border-slate-800 shadow-xl hover:border-slate-700' 
            : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider font-display ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Pending Tasks</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {pendingTasks.length}
            </span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              {completedTasks.length} Done
            </span>
          </div>
          <div className={`text-[10px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Sprint 44 • 90% SLA Target
          </div>
        </div>

        {/* Card 4: Workforce On Duty */}
        <div className={`p-5 rounded-2xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode 
            ? 'bg-[#14171d] border-slate-800 shadow-xl hover:border-slate-700' 
            : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider font-display ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Workforce Present</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {presentToday}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00c853] bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c853] animate-pulse" />
              {absentToday} Absent
            </span>
          </div>
          <div className={`text-[10px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {totalEmployees} total staff roster
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. REVENUE & EXPENSE OVERVIEW CHART */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SvgTrendChart
        title="DigiWorku Revenue & Milestone Velocity (INR ₹)"
        metric="₹18,45,000"
        growth="+28.4% vs previous cycle"
        data={[45, 62, 70, 85, 102, 128, 160]}
        labels={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec (Proj)']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. CRITICAL ALERTS & PENDING APPROVALS GRID */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts: Delayed Project Radar */}
        <div className={`rounded-2xl border p-6 space-y-4 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Delayed Project Radar
                </h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Automated SLA risk detection &amp; bottleneck tracker
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-black">
              {delayedProjects.length} Flagged
            </span>
          </div>

          <div className="space-y-3">
            {delayedProjects.length === 0 ? (
              <div className={`p-8 text-center text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                ✓ No delayed projects. All client SLAs on track!
              </div>
            ) : (
              delayedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-xl border transition-all space-y-2 ${
                    darkMode 
                      ? 'bg-[#0f1115] border-amber-500/30 hover:border-amber-500/60' 
                      : 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{proj.name}</span>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-black">
                      {proj.daysDelayed || 2} Days Delayed
                    </span>
                  </div>
                  <div className={`flex items-center justify-between text-[11px] ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <span>Client: {proj.clientName}</span>
                    <span>Budget: ₹{proj.budget.toLocaleString()}</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className="h-full bg-amber-500" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Approvals Hub */}
        <div className={`rounded-2xl border p-6 space-y-4 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Pending Approvals Queue
                </h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Milestone QA decisions, leaves, and invoices
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-black">
              {pendingApprovalsCount} Items
            </span>
          </div>

          <div className="space-y-3">
            {leaveRequests.filter((l) => l.status === 'pending').slice(0, 2).map((l) => (
              <div 
                key={l.id} 
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className={`font-bold block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {l.userName} — {l.leaveType.toUpperCase()} LEAVE
                  </span>
                  <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {l.totalDays} day(s) from {l.startDate}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModule('attendance')}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-[10px] hover:bg-blue-500/20 cursor-pointer"
                >
                  Review
                </button>
              </div>
            ))}

            {qcReviews.filter((q) => q.decision === 'pending').slice(0, 2).map((q) => (
              <div 
                key={q.id} 
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className={`font-bold block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    QC: {q.milestoneTitle}
                  </span>
                  <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {q.projectName} • Score: {q.overallScore}%
                  </span>
                </div>
                <button
                  onClick={() => setActiveModule('qc')}
                  className="px-2.5 py-1 rounded-lg bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 font-bold text-[10px] hover:bg-[#00c853]/20 cursor-pointer"
                >
                  Audit Gate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. RECENT ACTIVITIES & QUICK ACTIONS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities (2 Cols) */}
        <div className={`lg:col-span-2 rounded-2xl border p-6 space-y-4 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <h3 className={`text-sm font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <Activity className="w-4 h-4 text-[#00c853]" />
              <span>Real-Time Enterprise Activity Stream</span>
            </h3>
            <button
              onClick={() => setActiveModule('settings')}
              className={`text-xs font-bold cursor-pointer ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              View Full Audit Trail →
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map((log) => (
              <div 
                key={log.id} 
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00c853] shrink-0" />
                  <div>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{log.actorName}</span>
                    <span className={`mx-1.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{log.action}: {log.details}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-mono whitespace-nowrap ml-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {log.timestamp.slice(11)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Actions */}
        <div className={`rounded-2xl border p-6 space-y-4 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <h3 className={`text-sm font-black flex items-center gap-2 pb-2 border-b ${
            darkMode ? 'text-white border-slate-800' : 'text-slate-900 border-slate-100'
          }`}>
            <Sparkles className="w-4 h-4 text-[#00c853]" />
            <span>Quick Ops Actions</span>
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => setActiveModule('tasks')}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-[#0f1115] hover:bg-slate-800 border-slate-800 text-white' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-[#00c853]" />
                <span>Create Kanban Task</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveModule('crm')}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-[#0f1115] hover:bg-slate-800 border-slate-800 text-white' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Register Client Lead</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveModule('ai')}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-[#0f1115] hover:bg-slate-800 border-slate-800 text-white' 
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-purple-500" />
                <span>Ask AI Copilot Diagnostic</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={toggleCheckIn}
              className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                isCheckedIn
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300'
                  : 'bg-[#00c853]/10 border-[#00c853]/30 text-[#00c853]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4" />
                <span>{isCheckedIn ? 'Punch Out Current Shift' : 'Punch In Operator Shift'}</span>
              </div>
              <span className="text-[10px] font-mono font-black">{isCheckedIn ? 'ACTIVE' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
