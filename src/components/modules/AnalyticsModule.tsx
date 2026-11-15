import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Target,
  Zap,
  Star,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  const { performance, darkMode } = useApp();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top 3 High-Level Delivery KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Enterprise SLA On-Time Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#00c853]/10 text-[#00c853] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {performance.slaDeliveryRate}%
            </span>
            <span className="text-xs text-[#00c853] font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +1.8% vs last cycle
            </span>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            96 out of 100 client milestones delivered within SLA window
          </p>
        </div>

        <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Average Quality Gate Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {performance.overallQualityScore}
            </span>
            <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ 100</span>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Aggregated across all 100-Point QC gate audits
          </p>
        </div>

        <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Active Talent Headcount
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {performance.activeWorkforce}
            </span>
            <span className="text-xs text-purple-600 dark:text-purple-300 font-bold">Engineers &amp; Specialists</span>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Combined core internal team + vetted contractors
          </p>
        </div>
      </div>

      {/* Main Grid: Sprint Velocity + Department Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint Velocity Burn-Up */}
        <div className={`rounded-2xl p-6 space-y-4 border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <Zap className="w-4 h-4 text-[#00c853]" />
              Sprint Velocity &amp; Story Points Delivery
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Story points committed vs. finished across the last 5 sprints
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {performance.sprintVelocity.map((sp) => {
              const percent = Math.round((sp.completed / sp.committed) * 100);
              return (
                <div key={sp.sprint} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{sp.sprint}</span>
                    <span className={`font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {sp.completed} / {sp.committed} Points ({percent}%)
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="bg-gradient-to-r from-[#00c853] to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department SLA Accuracy */}
        <div className={`rounded-2xl p-6 space-y-4 border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Department Performance Breakdown
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              SLA adherence, tasks finished &amp; customer satisfaction index
            </p>
          </div>

          <div className="space-y-3">
            {performance.departmentRankings.map((dept) => (
              <div
                key={dept.department}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <h4 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{dept.department}</h4>
                  <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {dept.tasksCompleted} Completed Tasks • {dept.satisfactionScore}★ CSAT
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-[#00c853] text-sm">
                    {dept.onTimeRate}%
                  </div>
                  <span className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>On-Time SLA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers Leaderboard */}
      <div className={`rounded-2xl p-6 space-y-4 border transition-colors duration-200 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <Award className="w-4 h-4 text-amber-500" />
              Sprint 44 Top Performers Leaderboard
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recognizing exceptional engineering, design &amp; QA excellence</p>
          </div>
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Gold Star Tier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performance.topPerformers.map((performer, idx) => (
            <div
              key={performer.id}
              className={`p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                darkMode 
                  ? 'bg-[#0f1115] border-slate-800 hover:border-amber-500/40 shadow-md' 
                  : 'bg-slate-50 border-slate-200 hover:border-amber-500/40 shadow-xs'
              }`}
            >
              <div className="relative">
                <img
                  src={performer.avatar}
                  alt={performer.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold font-mono text-[10px] flex items-center justify-center shadow">
                  #{idx + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className={`font-bold text-xs truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{performer.name}</h4>
                </div>
                <p className={`text-[11px] truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{performer.role}</p>

                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20 font-bold">
                    {performer.badge}
                  </span>
                  <span className="text-[10px] text-[#00c853] font-mono font-bold">
                    {performer.accuracyPercent}% Acc
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
