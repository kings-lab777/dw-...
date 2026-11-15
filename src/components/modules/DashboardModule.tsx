import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const { setActiveModule, darkMode } = useApp();

  const [activeMonthFilter, setActiveMonthFilter] = useState<'Monthly' | 'Weekly' | 'Yearly'>('Monthly');
  const [selectedDay, setSelectedDay] = useState<number>(4);
  const [scheduleTab, setScheduleTab] = useState<'Meetings' | 'Events' | 'Holiday'>('Meetings');

  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, title: 'Rendora Web & App', tags: [{ name: 'Research', color: 'bg-amber-100 text-amber-700' }, { name: 'Illustration', color: 'bg-pink-100 text-pink-700' }], date: '9 Dec 2026', done: true },
    { id: 2, title: 'Orixo Branding & New Logo', tags: [{ name: 'Marketing', color: 'bg-emerald-100 text-emerald-700' }, { name: 'Strategy', color: 'bg-orange-100 text-orange-700' }], date: '12 Dec 2026', done: false },
    { id: 3, title: 'Redesign PaySleep Finance App', tags: [{ name: 'Dashboard', color: 'bg-blue-100 text-blue-700' }, { name: 'UI Design', color: 'bg-cyan-100 text-cyan-700' }], date: '12 Dec 2026', done: false },
    { id: 4, title: 'Wireframe OfXo Landing Page', tags: [{ name: 'Website', color: 'bg-yellow-100 text-yellow-700' }, { name: 'Wireframe', color: 'bg-purple-100 text-purple-700' }], date: '13 Dec 2026', done: false }
  ]);

  const toggleNote = (id: number) => {
    setNotes(notes.map(n => n.id === id ? { ...n, done: !n.done } : n));
  };

  // Recent Completed list
  const recentCompleted = [
    { id: 1, tag: 'Illustration', tagColor: 'bg-blue-100 text-blue-600', title: 'Rendora Web & App', date: '9 Dec 2026' },
    { id: 2, tag: 'UI Design', tagColor: 'bg-purple-100 text-purple-600', title: 'Orixo Branding & New Logo', date: '9 Dec 2026' },
    { id: 3, tag: 'Web Development', tagColor: 'bg-amber-100 text-amber-700', title: 'Wireframe OfXo Landing Page', date: '9 Dec 2026' },
    { id: 4, tag: 'Illustration', tagColor: 'bg-blue-100 text-blue-600', title: 'Oyonix Thanos Illustration', date: '9 Dec 2026' },
    { id: 5, tag: 'Web Development', tagColor: 'bg-amber-100 text-amber-700', title: 'Development Oyo TrabsSport', date: '9 Dec 2026' },
    { id: 6, tag: 'UI Design', tagColor: 'bg-purple-100 text-purple-600', title: 'Expo Research & Design', date: '9 Dec 2026' },
    { id: 7, tag: 'Web Development', tagColor: 'bg-amber-100 text-amber-700', title: 'Develop Niuxons', date: '9 Dec 2026' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* ========================================================================= */}
      {/* MAIN TOP SECTION: 2 COLUMNS (Left 8 cols, Right 4 cols) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT & CENTER: 8 COLUMNS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. EMPLOYEE WORK HOURS (Large Curved Dual-Line Chart) */}
          <div className={`p-6 rounded-3xl border transition-all ${
            darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Employee Work Hours
              </h2>

              <div className="relative">
                <button
                  onClick={() => setActiveMonthFilter(activeMonthFilter === 'Monthly' ? 'Weekly' : 'Monthly')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    darkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{activeMonthFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* SVG Chart with 28 Hours Tooltip Highlight */}
            <div className="relative h-64 w-full pt-4">
              {/* Y-Axis Guidelines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-medium">
                <div className="flex items-center gap-2"><span>40h</span><div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/80" /></div>
                <div className="flex items-center gap-2"><span>30h</span><div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/80" /></div>
                <div className="flex items-center gap-2"><span>20h</span><div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/80" /></div>
                <div className="flex items-center gap-2"><span>10h</span><div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/80" /></div>
                <div className="flex items-center gap-2"><span>0h</span><div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800/80" /></div>
              </div>

              {/* The SVG Canvas */}
              <svg className="w-full h-full overflow-visible pl-7" viewBox="0 0 700 200" preserveAspectRatio="none">
                {/* Purple Curve: Over Time */}
                <path
                  d="M 10 140 Q 60 110 120 135 T 240 100 T 360 145 T 480 120 T 600 90 T 690 120"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Blue Curve: Work Time */}
                <path
                  d="M 10 110 Q 70 70 130 90 T 250 80 T 330 40 T 420 120 T 520 85 T 600 135 T 690 70"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Dots on nodes */}
                <circle cx="10" cy="110" r="3.5" fill="#2563eb" />
                <circle cx="130" cy="90" r="3.5" fill="#2563eb" />
                <circle cx="250" cy="80" r="3.5" fill="#2563eb" />
                <circle cx="330" cy="40" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx="420" cy="120" r="3.5" fill="#2563eb" />
                <circle cx="520" cy="85" r="3.5" fill="#2563eb" />
                <circle cx="600" cy="135" r="3.5" fill="#2563eb" />
                <circle cx="690" cy="70" r="3.5" fill="#2563eb" />

                <circle cx="120" cy="135" r="3.5" fill="#a855f7" />
                <circle cx="240" cy="100" r="3.5" fill="#a855f7" />
                <circle cx="360" cy="145" r="3.5" fill="#a855f7" />
                <circle cx="480" cy="120" r="3.5" fill="#a855f7" />
                <circle cx="600" cy="90" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Exact '28 hours' Black Tooltip Pin pointing to Jun peak */}
              <div className="absolute top-[16px] left-[45%] -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                  28 hours
                </div>
                <div className="w-1.5 h-1.5 bg-slate-900 rotate-45 -mt-1" />
              </div>
            </div>

            {/* X-Axis Months with Jun pill active */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pl-7 pr-2 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span className="bg-[#2563eb] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                Jun
              </span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>

            {/* Bottom Legend */}
            <div className="flex items-center gap-6 mt-5 pl-7 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Work Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
                <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Over Time</span>
              </div>
            </div>
          </div>

          {/* 2. MIDDLE ROW: 2 SUB-CARDS (Performance Ratings + Notes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Employee Performance Ratings */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Employee Performance Ratings
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  89%
                </span>
                <p className="text-[11px] text-slate-400 leading-snug">
                  We take great pride in our employees' consistent punctuality and quality of work.
                </p>
              </div>

              {/* Segmented Progress Bars by Employee */}
              <div className="space-y-3.5">
                {[
                  { name: 'Gerard', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80', seg1: '40%', seg2: '35%', seg3: '25%' },
                  { name: 'Nicole', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80', seg1: '30%', seg2: '45%', seg3: '25%' },
                  { name: 'Nando', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80', seg1: '45%', seg2: '30%', seg3: '25%' },
                  { name: 'Julia', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80', seg1: '35%', seg2: '40%', seg3: '25%' }
                ].map((emp) => (
                  <div key={emp.name} className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <span className="text-xs font-bold w-12 truncate text-slate-700 dark:text-slate-300">{emp.name}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden flex gap-0.5 bg-slate-100 dark:bg-slate-800">
                      <div className="bg-pink-500 h-full rounded-l-full" style={{ width: emp.seg1 }} />
                      <div className="bg-amber-400 h-full" style={{ width: emp.seg2 }} />
                      <div className="bg-purple-600 h-full rounded-r-full" style={{ width: emp.seg3 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Task Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Presence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Completed Meeting</span>
                </div>
              </div>
            </div>

            {/* Notes Checklist */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Notes
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-start gap-2.5 group">
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="mt-0.5 text-slate-400 hover:text-[#2563eb] transition-colors cursor-pointer"
                    >
                      {note.done ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-bold leading-tight ${
                        note.done ? 'line-through text-slate-400' : darkMode ? 'text-white' : 'text-slate-800'
                      }`}>
                        {note.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {note.tags.map((t, idx) => (
                          <span key={idx} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.color}`}>
                            {t.name}
                          </span>
                        ))}
                        <span className="text-[10px] text-slate-400 ml-auto flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3" /> {note.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. BOTTOM ROW: EMPLOYMENT STATUS + LEAVE SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Employment Status */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Employment Status
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Bar */}
              <div className="h-2.5 rounded-full overflow-hidden flex gap-1 bg-slate-100 dark:bg-slate-800 mb-5">
                <div className="bg-purple-600 h-full rounded-l-full" style={{ width: '64%' }} />
                <div className="bg-cyan-500 h-full" style={{ width: '23%' }} />
                <div className="bg-amber-400 h-full rounded-r-full" style={{ width: '13%' }} />
              </div>

              {/* 3 Status Columns */}
              <div className="grid grid-cols-3 gap-2 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-purple-600" /> Permanent
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">573</div>
                  <span className="text-[11px] text-slate-400 font-semibold">64%</span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" /> Contract
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">148</div>
                  <span className="text-[11px] text-slate-400 font-semibold">23%</span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Probation
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">69</div>
                  <span className="text-[11px] text-slate-400 font-semibold">13%</span>
                </div>
              </div>
            </div>

            {/* Leave Summary */}
            <div className={`p-6 rounded-3xl border transition-all ${
              darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Leave Summary
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/60 dark:bg-slate-800/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Annual Leave</span>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">34 Days</div>
                  <button
                    onClick={() => setActiveModule('employees')}
                    className="mt-2 text-[11px] font-bold text-[#2563eb] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Request Leave &gt;
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/60 dark:bg-slate-800/60 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Sick Leave Used</span>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">78 Days</div>
                  <button
                    onClick={() => setActiveModule('employees')}
                    className="mt-2 text-[11px] font-bold text-[#2563eb] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Request Leave &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. UPGRADE YOUR PLAN BANNER (Solid Royal Blue) */}
          <div className="p-6 rounded-3xl bg-[#2563eb] text-white flex items-center justify-between shadow-lg shadow-blue-500/20">
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">Upgrade Your Plan</h3>
              <p className="text-xs text-blue-100 mt-0.5">Unlock 50+ enterprise integrations, custom pipelines &amp; unlimited seats</p>
            </div>
            <button
              onClick={() => setActiveModule('settings')}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#2563eb] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 4 COLUMNS (Current Project, Schedule, Recent Completed) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Current Project Card */}
          <div className={`p-6 rounded-3xl border transition-all ${
            darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Current Project
              </h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Project Name</span>
                  <h4 className={`text-sm font-extrabold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Redesign Finance App
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  ● In Progress
                </span>
              </div>

              {/* Roles */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Project Manager</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                      alt="Nicole Foster"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Nicole Foster</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Design Lead</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                      alt="Fernando Agaro"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Fernando Agaro</span>
                  </div>
                </div>
              </div>

              {/* Team Avatars + Due Date */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Team</span>
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-[#111622] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80" alt="team" />
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-[#111622] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="team" />
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-[#111622] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="team" />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Due Date</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Oct 24, 2025</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      ⏱ 2 Days Left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className={`p-6 rounded-3xl border transition-all ${
            darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Schedule
              </h3>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Strip */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Jan 2025
                </span>
                <div className="flex items-center gap-1 text-slate-400">
                  <button className="p-1 hover:text-slate-600"><ChevronLeft className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:text-slate-600"><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* Day numbers */}
              <div className="flex items-center justify-between text-center">
                {[
                  { day: 'M', num: 3 },
                  { day: 'T', num: 4 },
                  { day: 'W', num: 5 },
                  { day: 'T', num: 6 },
                  { day: 'F', num: 7 },
                  { day: 'S', num: 8 },
                  { day: 'S', num: 9 }
                ].map((d) => (
                  <button
                    key={d.num}
                    onClick={() => setSelectedDay(d.num)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[10px] text-slate-400 font-semibold">{d.day}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        selectedDay === d.num
                          ? 'bg-[#2563eb] text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {d.num}
                    </span>
                  </button>
                ))}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 pt-2">
                {(['Meetings', 'Events', 'Holiday'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setScheduleTab(tab)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      scheduleTab === tab
                        ? 'bg-[#2563eb] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Event Cards */}
              <div className="space-y-2.5 pt-2">
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/60 dark:bg-slate-800/60 dark:border-slate-700 space-y-1.5">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Brief for reference, color, style</h5>
                  <div className="text-[10px] text-slate-400 font-medium">2:00 - 3:40 PM</div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex -space-x-1.5">
                      <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80" alt="u" />
                      <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="u" />
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> San Diego, CA</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100/60 dark:bg-slate-800/60 dark:border-slate-700 space-y-1.5">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Design System &amp; Tokens Alignment</h5>
                  <div className="text-[10px] text-slate-400 font-medium">4:00 - 5:00 PM</div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex -space-x-1.5">
                      <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="u" />
                      <img className="w-5 h-5 rounded-full border border-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80" alt="u" />
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> Remote Zoom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Completed List */}
          <div className={`p-6 rounded-3xl border transition-all ${
            darkMode ? 'bg-[#111622] border-slate-800' : 'bg-white border-slate-100 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Recent Completed
              </h3>
              <button
                onClick={() => setActiveModule('tasks')}
                className="text-[11px] font-bold text-[#2563eb] hover:underline cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3.5">
              {recentCompleted.map((item) => (
                <div key={item.id} className="space-y-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center justify-between text-xs font-bold pt-0.5">
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{item.title}</span>
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
