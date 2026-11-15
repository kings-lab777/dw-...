import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Play,
  Square,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  MapPin,
  Plus,
  Send,
  UserCheck,
  X
} from 'lucide-react';

export const AttendanceModule: React.FC = () => {
  const {
    isCheckedIn,
    checkInTime,
    elapsedSeconds,
    toggleCheckIn,
    isLateToday,
    attendanceRecords,
    leaveRequests,
    submitLeaveRequest,
    reviewLeaveRequest,
    currentRole,
    currentUser,
    darkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'daily' | 'leaves'>('daily');
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Leave Form State
  const [leaveType, setLeaveType] = useState<'annual' | 'sick' | 'casual' | 'emergency'>('annual');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [endDate, setEndDate] = useState('2026-11-22');
  const [totalDays, setTotalDays] = useState(3);
  const [reason, setReason] = useState('');

  const formatElapsedTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    submitLeaveRequest({
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason
    });
    setShowLeaveModal(false);
    setReason('');
  };

  const isManagerOrAdmin = ['super_admin', 'admin', 'hr_manager', 'project_manager'].includes(currentRole);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Real-time Punch Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stopwatch Punch Station */}
        <div className={`lg:col-span-2 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border transition-colors duration-200 relative overflow-hidden ${
          darkMode 
            ? 'bg-[#14171d] border-slate-800 shadow-xl' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                OFFICIAL WORK SHIFT: 09:30 AM – 06:30 PM
              </span>
            </div>
            <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {isCheckedIn ? 'Shift In Progress' : 'Workstation Idle (Checked Out)'}
            </h2>
            <p className={`text-xs max-w-md ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isCheckedIn
                ? `Punched IN at ${checkInTime}. Real-time geolocation coordinates verified at DigiWorku HQ Network.`
                : 'Punched OUT. Click the button to log your arrival and start shift tracking.'}
            </p>
            {isLateToday && (
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Arrival marked after 09:30 AM shift threshold</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className={`text-4xl md:text-5xl font-mono font-extrabold tracking-widest px-6 py-3 rounded-2xl border shadow-inner ${
              darkMode 
                ? 'bg-[#0f1115] text-white border-slate-800' 
                : 'bg-slate-50 text-slate-900 border-slate-200'
            }`}>
              {isCheckedIn ? formatElapsedTime(elapsedSeconds) : '00:00:00'}
            </div>

            <button
              onClick={toggleCheckIn}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-xl cursor-pointer ${
                isCheckedIn
                  ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/20'
                  : 'bg-[#00c853] hover:bg-[#00af48] text-white shadow-[#00c853]/20'
              }`}
            >
              {isCheckedIn ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Punch Out of Shift</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Punch In to Shift</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Leave Quota Card */}
        <div className={`rounded-2xl p-6 flex flex-col justify-between space-y-4 border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={`font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Leave Balance</span>
              <span className="font-mono text-[#00c853] font-bold">2026 Allotment</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>19</span>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/ 24 days remaining</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`flex justify-between ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Annual Paid Leaves:</span>
              <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>14 left</span>
            </div>
            <div className={`flex justify-between ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Medical / Sick:</span>
              <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>4 left</span>
            </div>
            <div className={`flex justify-between ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Casual / Emergency:</span>
              <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>1 left</span>
            </div>
          </div>

          <button
            onClick={() => setShowLeaveModal(true)}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              darkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-[#00c853]" />
            <span>Apply for Time Off</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher: Logs vs. Leave Requests */}
      <div className={`flex items-center gap-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'daily'
              ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
              : darkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Attendance Log &amp; Shift Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'leaves'
              ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
              : darkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Leave Approvals Workflow</span>
          {leaveRequests.filter((l) => l.status === 'pending').length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono font-bold">
              {leaveRequests.filter((l) => l.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Daily Attendance Table */}
      {activeTab === 'daily' && (
        <div className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`p-4 border-b flex items-center justify-between ${
            darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Shift Records (Today &amp; Historical)
            </h3>
            <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {attendanceRecords.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase tracking-wider font-semibold border-b ${
                darkMode ? 'bg-[#090d15] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                <tr>
                  <th className="py-3 px-4">Team Member</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Punch In</th>
                  <th className="py-3 px-4">Status / Shift Check</th>
                  <th className="py-3 px-4">Location / Workstation</th>
                  <th className="py-3 px-4">Duration</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                darkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-100 text-slate-700'
              }`}>
                {attendanceRecords.map((rec) => (
                  <tr key={rec.id} className={darkMode ? 'hover:bg-slate-900/60 transition-colors' : 'hover:bg-slate-50/80 transition-colors'}>
                    <td className={`py-3 px-4 font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{rec.userName}</td>
                    <td className={`py-3 px-4 font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{rec.date}</td>
                    <td className={`py-3 px-4 font-mono ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{rec.checkInTime}</td>
                    <td className="py-3 px-4">
                      {rec.status === 'late' ? (
                        <div className="inline-flex flex-col">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold w-fit">
                            Late Arrival
                          </span>
                          {rec.lateReason && (
                            <span className="text-[10px] text-slate-400 mt-0.5 italic">{rec.lateReason}</span>
                          )}
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 text-[10px] font-bold">
                          On-Time Present
                        </span>
                      )}
                    </td>
                    <td className={`py-3 px-4 flex items-center gap-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{rec.location}</span>
                    </td>
                    <td className={`py-3 px-4 font-mono font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {Math.floor(rec.durationMinutes / 60)}h {rec.durationMinutes % 60}m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Leaves & Approvals Workflow */}
      {activeTab === 'leaves' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Leave Requests &amp; Governance Pipeline
            </h3>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply for Leave</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveRequests.map((leave) => (
              <div
                key={leave.id}
                className={`rounded-2xl p-5 space-y-4 border transition-colors duration-200 ${
                  darkMode ? 'bg-[#14171d] border-slate-800 shadow-lg' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{leave.userName}</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{leave.department}</p>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded capitalize inline-block mt-1 font-semibold ${
                      darkMode ? 'bg-slate-800 text-[#00c853]' : 'bg-slate-100 text-[#00c853]'
                    }`}>
                      {leave.leaveType} Leave • {leave.totalDays} Days
                    </span>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                      leave.status === 'approved'
                        ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                        : leave.status === 'rejected'
                        ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className={`flex items-center gap-1.5 font-mono text-[11px] ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Calendar className="w-3.5 h-3.5" /> {leave.startDate} to {leave.endDate}
                  </div>
                  <p className="pt-1 italic">"{leave.reason}"</p>
                </div>

                {/* Manager / HR Review Controls */}
                {leave.status === 'pending' && isManagerOrAdmin && (
                  <div className={`flex items-center gap-2 pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    <button
                      onClick={() => reviewLeaveRequest(leave.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#00c853]/15 hover:bg-[#00c853]/25 text-[#00c853] border border-[#00c853]/30 text-xs font-bold transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Request</span>
                    </button>
                    <button
                      onClick={() => reviewLeaveRequest(leave.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Calendar className="w-4 h-4 text-[#00c853]" />
                Apply for Time Off / Leave
              </h3>
              <button
                onClick={() => setShowLeaveModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="annual">Annual Paid Vacation</option>
                  <option value="sick">Sick / Medical Leave</option>
                  <option value="casual">Casual / Personal</option>
                  <option value="emergency">Emergency Absence</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Total Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={totalDays}
                  onChange={(e) => setTotalDays(parseInt(e.target.value) || 1)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Reason / Handover Notes</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  placeholder="Detail coverage handover or purpose of absence..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
