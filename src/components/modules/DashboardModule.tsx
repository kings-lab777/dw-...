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
  ArrowDownRight,
  Plus,
  Play,
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
  Filter,
  CheckSquare,
  Award,
  ChevronDown,
  Briefcase,
  IndianRupee,
  MapPin,
  Check
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
    freelancers,
    freelancerPayouts,
    auditLogs,
    currentRole,
    currentUser,
    setActiveModule,
    isCheckedIn,
    toggleCheckIn,
    showToast,
    darkMode,
    dateFilter,
    setDateFilter
  } = useApp();

  // TaskFlow AI interactive schedule tab & monthly work hours
  const [scheduleTab, setScheduleTab] = useState<'meetings' | 'events' | 'holidays'>('meetings');
  const [selectedDay, setSelectedDay] = useState<number>(4);
  const [workHoursPeriod, setWorkHoursPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [hoveredHourIndex, setHoveredHourIndex] = useState<number | null>(4);

  // Computed metrics based on actual state
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.isActive).length;
  const presentToday = attendanceRecords.filter((a) => a.status === 'present' || a.status === 'late').length;
  const absentToday = Math.max(0, totalEmployees - presentToday);

  const activeProjects = projects.filter((p) => p.status === 'active' || p.status === 'delayed' || p.status === 'in_progress');
  const completedProjects = projects.filter((p) => p.status === 'completed' || p.status === 'approved' || p.status === 'delivered');
  const delayedProjects = projects.filter((p) => p.status === 'delayed' || (p.daysDelayed && p.daysDelayed > 0));

  const pendingTasks = tasks.filter((t) => t.status !== 'done');
  const completedTasks = tasks.filter((t) => t.status === 'done');

  const pendingApprovalsCount =
    leaveRequests.filter((l) => l.status === 'pending').length +
    qcReviews.filter((q) => q.decision === 'pending').length;

  const currentProject = projects[0] || {
    id: 'proj-01',
    name: 'Redesign Finance App',
    clientName: 'Apex Financial Technologies Ltd.',
    managerName: 'Nicole Foster',
    designLeadName: 'Fernando Agaro',
    endDate: 'Oct 24, 2026',
    daysDelayed: 2,
    progress: 74,
    status: 'active'
  };

  // Mock Work Hours Curve Data (Matching TaskFlow AI chart)
  const workHoursMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const workTimeData = [20, 24, 18, 26, 22, 28, 38, 25, 32, 29, 24, 28]; // 'Jun' = 28 hours (hovered)
  const overTimeData = [12, 14, 10, 16, 15, 19, 24, 17, 21, 18, 16, 19];

  // Performance ratings data
  const performanceEmployees = [
    { name: 'Gerard', role: 'Full Stack Engineer', taskPercent: 42, presencePercent: 30, meetingPercent: 28, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Nicole', role: 'Project Manager', taskPercent: 55, presencePercent: 25, meetingPercent: 20, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    { name: 'Nando', role: 'UI/UX Lead', taskPercent: 48, presencePercent: 32, meetingPercent: 20, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { name: 'Julia', role: 'Quality Lead', taskPercent: 38, presencePercent: 35, meetingPercent: 27, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP EXECUTIVE HEADER & DATE FILTER BAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 relative overflow-hidden ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00c853]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00c853] animate-ping" />
                COMMAND CENTER LIVE
              </span>
              <span className={`text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                • Workforce OS &amp; Operations Pipeline
              </span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-black font-display tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Hello, {currentUser.fullName}! 👋
            </h1>
            <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Welcome back to DigiWorku Commander. Tracking {activeProjects.length} active client projects, {pendingTasks.length} pending tasks, and ₹{(financialSummary.monthlyRevenue / 100000).toFixed(2)} Lakhs revenue velocity.
            </p>
          </div>

          {/* Date Filter Pills */}
          <div className={`flex flex-wrap items-center gap-1 p-1 rounded-2xl border shrink-0 ${
            darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['today', '7d', '30d', 'this_month', 'last_month', 'quarter'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setDateFilter(opt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dateFilter === opt
                    ? 'bg-[#00c853] text-white shadow-sm font-black'
                    : darkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt === '7d' ? '7 Days' : opt === '30d' ? '30 Days' : opt.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TOP METRIC CARDS (Alpha & Fokys Style) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly Revenue (INR ₹) */}
        <div className={`p-5 rounded-3xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-black uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Total Revenue</span>
            <div className="p-2 rounded-2xl bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{(financialSummary.monthlyRevenue / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-bold text-[#00c853] flex items-center bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              <ArrowUpRight className="w-3.5 h-3.5" /> +28.4%
            </span>
          </div>
          <div className={`text-[11px] font-semibold flex items-center justify-between ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>Collected: ₹{(financialSummary.collectedRevenue / 100000).toFixed(2)}L</span>
            <span className="text-amber-500 font-bold">Due: ₹{(financialSummary.outstandingRevenue / 100000).toFixed(2)}L</span>
          </div>
        </div>

        {/* Metric 2: Net Profit & Margin */}
        <div className={`p-5 rounded-3xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-black uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Realized Net Profit</span>
            <div className="p-2 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{(financialSummary.netProfit / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-bold text-blue-500 flex items-center bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              {financialSummary.profitMarginPercent}% Margin
            </span>
          </div>
          <div className={`text-[11px] font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Expenses: ₹{(financialSummary.totalExpenses / 100000).toFixed(2)}L • Fixed + Variable
          </div>
        </div>

        {/* Metric 3: Active Projects & SLAs */}
        <div className={`p-5 rounded-3xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-black uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Active Projects</span>
            <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
              <Folder className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeProjects.length}
            </span>
            <span className="text-xs font-bold text-purple-500 flex items-center bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              {completedProjects.length} Delivered
            </span>
          </div>
          <div className={`text-[11px] font-semibold flex items-center justify-between ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>{delayedProjects.length} Delayed on Radar</span>
            <span className="text-[#00c853] font-bold">97.2% SLA</span>
          </div>
        </div>

        {/* Metric 4: Workforce & Attendance */}
        <div className={`p-5 rounded-3xl border transition-all space-y-2 relative overflow-hidden group ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-black uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Workforce Active</span>
            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {presentToday} / {totalEmployees}
            </span>
            <span className="text-xs font-bold text-[#00c853] flex items-center bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              {freelancers.length} Freelancers
            </span>
          </div>
          <div className={`text-[11px] font-semibold flex items-center justify-between ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>{absentToday} on scheduled leave</span>
            <span className="text-blue-500 font-bold">Shift: 09:00 - 18:00</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. TASKFLOW AI BENTO SECTION: WORK HOURS CHART & CURRENT PROJECT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Employee Work Hours Line Chart */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border transition-all duration-200 space-y-4 relative overflow-hidden ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className={`text-base font-black font-display tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Employee Work Hours
              </h2>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Operational bandwidth, sprint work time &amp; overtime telemetry
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-blue-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Work Time
                </span>
                <span className="flex items-center gap-1.5 text-purple-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Over Time
                </span>
              </div>

              <select
                value={workHoursPeriod}
                onChange={(e) => setWorkHoursPeriod(e.target.value as any)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>

          {/* Dual-Curve SVG Line Chart with Interactive Tooltip (TaskFlow AI replica) */}
          <div className="relative pt-6 pb-2">
            <svg viewBox="0 0 650 180" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="workGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="overGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              {[40, 30, 20, 10, 0].map((h, i) => {
                const y = 20 + i * 32;
                return (
                  <g key={i}>
                    <line x1="30" y1={y} x2="630" y2={y} stroke={darkMode ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.8)'} strokeDasharray="3 3" />
                    <text x="5" y={y + 4} fill={darkMode ? '#64748b' : '#94a3b8'} fontSize="9" fontFamily="monospace">{h}h</text>
                  </g>
                );
              })}

              {/* Work Time Line (Blue) */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={workTimeData.map((val, idx) => `${40 + idx * 48},${148 - (val / 40) * 128}`).join(' ')}
              />

              {/* Over Time Line (Purple) */}
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={overTimeData.map((val, idx) => `${40 + idx * 48},${148 - (val / 40) * 128}`).join(' ')}
              />

              {/* Data points */}
              {workTimeData.map((val, idx) => {
                const cx = 40 + idx * 48;
                const cy = 148 - (val / 40) * 128;
                const isHovered = hoveredHourIndex === idx;
                return (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredHourIndex(idx)}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 5 : 3.5}
                      fill={isHovered ? '#3b82f6' : '#ffffff'}
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                    {isHovered && (
                      <g>
                        <rect x={cx - 32} y={cy - 30} width="64" height="22" rx="6" fill="#0f172a" />
                        <text x={cx} y={cy - 16} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          {val} hours
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Month labels */}
              {workHoursMonths.map((m, idx) => (
                <text
                  key={idx}
                  x={40 + idx * 48}
                  y="172"
                  textAnchor="middle"
                  fill={hoveredHourIndex === idx ? (darkMode ? '#ffffff' : '#0f172a') : (darkMode ? '#64748b' : '#94a3b8')}
                  fontSize="10"
                  fontWeight={hoveredHourIndex === idx ? 'bold' : 'normal'}
                >
                  {m}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Column: "Current Project" Card (TaskFlow AI replica) */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className={`text-sm font-black font-display tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Current Project
              </h3>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                •••
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Project Name
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h4 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentProject.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    In Progress
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Project Manager
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                      alt="PM"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {currentProject.managerName || 'Nicole Foster'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Design Lead
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Design Lead"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {currentProject.designLeadName || 'Fernando Agaro'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Assigned Team
                  </span>
                  <div className="flex -space-x-2 mt-1.5">
                    {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'].map((src, i) => (
                      <img key={i} src={src} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#14171d] object-cover" alt="team" />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-[#14171d] text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-300">
                      +4
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Due Date
                  </span>
                  <div className={`text-xs font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentProject.endDate}
                  </div>
                  <span className="text-[10px] font-bold text-rose-500 flex items-center justify-end gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> 2 Days Left
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveModule('projects')}
            className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <span>View Full Project Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. PERFORMANCE RATINGS, NOTES, SCHEDULE & RECENT COMPLETED */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Widget 1: Employee Performance Ratings */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Performance Ratings
            </h3>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer">•••</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>89%</span>
            <span className={`text-[11px] leading-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              We take pride in our workforce's consistent punctuality and quality.
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {performanceEmployees.map((emp, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{emp.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">4.9 ★</span>
                  </div>
                  {/* Segmented bar */}
                  <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                    <div style={{ width: `${emp.taskPercent}%` }} className="h-full bg-rose-500" title="Tasks Completed" />
                    <div style={{ width: `${emp.presencePercent}%` }} className="h-full bg-amber-400" title="Presence" />
                    <div style={{ width: `${emp.meetingPercent}%` }} className="h-full bg-purple-600" title="Meetings" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Tasks</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Presence</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Meetings</span>
          </div>
        </div>

        {/* Widget 2: Notes / Action Items */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Operational Notes
            </h3>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer">•••</span>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Rendora Web & App', tags: [{ label: 'Research', color: 'bg-amber-500/10 text-amber-600' }, { label: 'Illustration', color: 'bg-pink-500/10 text-pink-600' }], date: '9 Dec 2026', done: true },
              { title: 'Orixo Branding & New Logo', tags: [{ label: 'Marketing', color: 'bg-emerald-500/10 text-emerald-600' }, { label: 'Strategy', color: 'bg-blue-500/10 text-blue-600' }], date: '12 Dec 2026', done: false },
              { title: 'Redesign PaySleep Finance App', tags: [{ label: 'Dashboard', color: 'bg-purple-500/10 text-purple-600' }, { label: 'UI Design', color: 'bg-cyan-500/10 text-cyan-600' }], date: '12 Dec 2026', done: false },
              { title: 'Wireframe OfXo Landing Page', tags: [{ label: 'Website', color: 'bg-amber-500/10 text-amber-600' }, { label: 'Wireframe', color: 'bg-indigo-500/10 text-indigo-600' }], date: '13 Dec 2026', done: false }
            ].map((note, i) => (
              <div key={i} className="space-y-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                    note.done ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {note.done && <Check className="w-3 h-3" />}
                  </div>
                  <span className={`text-xs font-bold leading-tight ${
                    note.done ? 'line-through text-slate-400' : darkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {note.title}
                  </span>
                </div>
                <div className="flex items-center justify-between pl-6">
                  <div className="flex items-center gap-1.5">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${t.color}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{note.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Schedule Calendar & Meetings (TaskFlow AI replica) */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Schedule &amp; Calls
            </h3>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer">•••</span>
          </div>

          {/* Mini Calendar strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Nov 2026</span>
              <div className="flex items-center gap-1">
                <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">&lt;</button>
                <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">&gt;</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] font-semibold text-slate-400">{d}</span>
              ))}
              {[3, 4, 5, 6, 7, 8, 9].map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={`w-7 h-7 mx-auto rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white shadow-sm'
                      : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 pt-1">
            {(['meetings', 'events', 'holidays'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setScheduleTab(tab)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold capitalize transition-all cursor-pointer ${
                  scheduleTab === tab
                    ? 'bg-blue-600 text-white'
                    : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Meeting cards */}
          <div className="space-y-2 pt-1">
            {[
              { title: 'Brief for color & design tokens', time: '2:00 - 3:40 PM', loc: 'Delhi HQ' },
              { title: 'Sprint backlog milestone review', time: '4:00 - 5:00 PM', loc: 'Google Meet' }
            ].map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-bold text-slate-800 dark:text-slate-100">{m.title}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono">{m.time}</span>
                  <span className="flex items-center gap-1 font-semibold"><MapPin className="w-3 h-3 text-blue-500" /> {m.loc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 4: Recent Completed Deliverables (TaskFlow AI replica) */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Recent Completed
            </h3>
            <button
              onClick={() => setActiveModule('projects')}
              className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {[
              { tag: 'Illustration', tagColor: 'bg-purple-500/10 text-purple-600', name: 'Rendora Web & App', date: '9 Dec 2026' },
              { tag: 'UI Design', tagColor: 'bg-blue-500/10 text-blue-600', name: 'Orixo Branding & New Logo', date: '9 Dec 2026' },
              { tag: 'Web Development', tagColor: 'bg-amber-500/10 text-amber-600', name: 'Wireframe OfXo Landing Page', date: '9 Dec 2026' },
              { tag: 'AI Solutions', tagColor: 'bg-emerald-500/10 text-emerald-600', name: 'OCR Invoice Extraction', date: '10 Dec 2026' }
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-2xl border space-y-1 bg-slate-50 dark:bg-[#0f1115] border-slate-200 dark:border-slate-800">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
                <div className={`text-xs font-bold pt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. EMPLOYMENT STATUS & LEAVE SUMMARY BARS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employment Status */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Employment Status &amp; Roster
            </h3>
            <span className="text-slate-400 hover:text-slate-600 cursor-pointer">•••</span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            <div style={{ width: '64%' }} className="h-full bg-purple-600" title="Permanent 64%" />
            <div style={{ width: '23%' }} className="h-full bg-blue-500" title="Contract 23%" />
            <div style={{ width: '13%' }} className="h-full bg-amber-400" title="Probation 13%" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-purple-600 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-600" /> Permanent
              </span>
              <div className={`text-lg font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                12
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">64%</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-blue-500 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Contract
              </span>
              <div className={`text-lg font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                4
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">23%</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-amber-500 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Probation
              </span>
              <div className={`text-lg font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                2
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">13%</span>
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 flex flex-col justify-between ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className={`text-sm font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Leave Balance &amp; Operations
              </h3>
              <span className="text-slate-400 hover:text-slate-600 cursor-pointer">•••</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Annual Leave Remaining
                </span>
                <div className={`text-2xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  34 Days
                </div>
                <button
                  onClick={() => setActiveModule('attendance')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Request Leave &gt;
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className={`text-[11px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Sick Leave Used YTD
                </span>
                <div className={`text-2xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  12 Days
                </div>
                <button
                  onClick={() => setActiveModule('attendance')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Audit Ledger &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Quick Shift Punch Action */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-500">
              Shift: {currentUser.fullName} ({currentUser.department})
            </span>
            <button
              onClick={toggleCheckIn}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isCheckedIn
                  ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-[#00c853] text-white shadow-md shadow-[#00c853]/20 hover:bg-[#00b047]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isCheckedIn ? 'Punch Out Shift' : 'Punch In Operator Shift'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
