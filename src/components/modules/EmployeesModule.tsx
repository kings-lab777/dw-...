import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee, UserRole, LeaveRequest } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  X,
  Lock,
  IndianRupee,
  Activity,
  Award,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react';

export const EmployeesModule: React.FC = () => {
  const {
    employees,
    toggleEmployeeActive,
    addEmployee,
    currentRole,
    currentUser,
    leaveRequests,
    submitLeaveRequest,
    reviewLeaveRequest,
    showToast,
    darkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'directory' | 'leaves' | 'performance'>('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Sensitive data authorization check
  const canViewSensitiveData = ['super_admin', 'operations_manager', 'finance_manager'].includes(currentRole);

  // New Employee Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newDesignation, setNewDesignation] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('team_member');
  const [newPhone, setNewPhone] = useState('+91 98765 43210');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Tailwind');
  const [newSalary, setNewSalary] = useState('65000');

  // Leave Form State
  const [leaveType, setLeaveType] = useState<LeaveRequest['leaveType']>('annual');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveReason, setLeaveReason] = useState('');

  const departments = [
    'All',
    'Executive Leadership',
    'Engineering',
    'People & Culture',
    'Delivery Management',
    'Quality Assurance',
    'Revenue & Growth',
    'Corporate Finance'
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addEmployee({
      fullName: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      designation: newDesignation.trim() || 'Software Engineer',
      phone: newPhone.trim() || '+91 98765 43210',
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      skills: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0],
      baseSalary: parseInt(newSalary) || 60000,
      kycStatus: 'verified',
      workloadScore: 65,
      completedTasksCount: 12,
      ratingScore: 4.8,
      kycDocuments: [
        {
          id: `kyc_${Date.now()}_1`,
          name: 'National Identity Proof (PAN / Aadhaar)',
          type: 'Identity Proof',
          fileSize: '1.4 MB',
          uploadedAt: 'Today',
          verified: true
        },
        {
          id: `kyc_${Date.now()}_2`,
          name: 'DigiWorku Employment Contract',
          type: 'Employment Contract',
          fileSize: '850 KB',
          uploadedAt: 'Today',
          verified: true
        }
      ]
    });

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewDesignation('');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) {
      showToast('Please state a reason for your leave application', 'warning');
      return;
    }
    submitLeaveRequest({
      leaveType,
      startDate,
      endDate,
      totalDays: 2,
      reason: leaveReason
    });
    setShowLeaveModal(false);
    setLeaveReason('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              DigiWorku Team &amp; Workforce Operations
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] font-bold border border-[#00c853]/30">
              Internal Payroll &amp; Workload
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage employee directories, performance ratings, attendance leaves, and role-guarded compensation
          </p>
        </div>

        {/* Tab Controls */}
        <div className={`p-1 rounded-xl border flex items-center gap-1 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-[#00c853] text-white shadow-sm'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Roster ({employees.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('leaves')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'leaves'
                ? 'bg-[#00c853] text-white shadow-sm'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Leaves &amp; Attendance ({leaveRequests.filter((l) => l.status === 'pending').length} Pending)</span>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'performance'
                ? 'bg-[#00c853] text-white shadow-sm'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Performance &amp; Workload</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EMPLOYEE DIRECTORY & ROSTER */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search employee by name, role or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] w-64 md:w-80 transition-colors ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                  }`}
                />
              </div>

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className={`rounded-2xl border transition-all p-5 flex flex-col justify-between relative overflow-hidden ${
                  darkMode
                    ? emp.isActive
                      ? 'bg-[#14171d] border-slate-800 hover:border-slate-700 shadow-xl'
                      : 'bg-[#0f1115] border-slate-800/40 opacity-60'
                    : emp.isActive
                      ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  {/* Header: Avatar, Name, Toggle */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.fullName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                            darkMode ? 'border-[#14171d]' : 'border-white'
                          } ${emp.isActive ? 'bg-[#00c853]' : 'bg-slate-400'}`}
                        />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {emp.fullName}
                          {emp.kycStatus === 'verified' && (
                            <span title="KYC Verified">
                              <ShieldCheck className="w-4 h-4 text-[#00c853] shrink-0" />
                            </span>
                          )}
                        </h3>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{emp.designation}</p>
                        <span className="text-[10px] font-mono text-[#00c853] font-bold">
                          {emp.department}
                        </span>
                      </div>
                    </div>

                    {/* Status Toggle Button */}
                    <button
                      onClick={() => toggleEmployeeActive(emp.id)}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold border transition-all cursor-pointer ${
                        emp.isActive
                          ? 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/20 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20'
                          : darkMode
                            ? 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-[#00c853]/10 hover:text-[#00c853]'
                            : 'bg-slate-200 text-slate-500 border-slate-300 hover:bg-[#00c853]/10 hover:text-[#00c853]'
                      }`}
                      title="Click to toggle operational status"
                    >
                      {emp.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Compensation & Workload Strip (Role-Guarded) */}
                  <div className={`grid grid-cols-2 gap-2 p-2.5 rounded-xl border text-xs mb-3 ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Monthly Salary
                      </span>
                      {canViewSensitiveData ? (
                        <span className="font-mono font-bold text-[#00c853] text-xs mt-0.5 block">
                          ₹{emp.baseSalary.toLocaleString('en-IN')} / mo
                        </span>
                      ) : (
                        <span className="font-mono text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Confidential
                        </span>
                      )}
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Workload Capacity
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (emp.workloadScore || 60) > 80 ? 'bg-rose-500' : 'bg-[#00c853]'
                            }`}
                            style={{ width: `${emp.workloadScore || 60}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[10px] text-slate-400">{emp.workloadScore || 60}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className={`space-y-1 text-xs mb-4 p-2.5 rounded-xl border ${
                    darkMode
                      ? 'bg-[#0f1115] border-slate-800/80 text-slate-400'
                      : 'bg-slate-50 border-slate-200/80 text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{emp.phone}</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="mb-4">
                    <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Skills &amp; Proficiencies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {emp.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                            darkMode
                              ? 'bg-slate-800/80 text-slate-300 border-slate-700/60'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {emp.skills.length > 4 && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                          darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                        }`}>
                          +{emp.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                  darkMode ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <span className={`text-[11px] flex items-center gap-1 ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <Calendar className="w-3 h-3" /> Since {emp.joinDate}
                  </span>

                  <button
                    onClick={() => setSelectedEmp(emp)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      darkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-[#00c853]" />
                    <span>KYC Vault ({emp.kycDocuments.length})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LEAVES & ATTENDANCE OPERATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'leaves' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Employee Leave &amp; Absence Requests
              </h2>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Review incoming leave applications and approve time off across departments
              </p>
            </div>

            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Request Leave</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Pending Applications
              </span>
              <div className="text-2xl font-black text-amber-500 font-mono mt-1">
                {leaveRequests.filter((l) => l.status === 'pending').length}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Awaiting manager or HR clearance</span>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Approved This Month
              </span>
              <div className="text-2xl font-black text-[#00c853] font-mono mt-1">
                {leaveRequests.filter((l) => l.status === 'approved').length}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Processed within team capacity buffers</span>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Attendance Rate Today
              </span>
              <div className="text-2xl font-black text-[#00c853] font-mono mt-1">
                98.4%
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Across Gurgaon, Bangalore &amp; Remote</span>
            </div>
          </div>

          {/* Leave Requests Table */}
          <div className={`rounded-2xl p-5 border space-y-4 ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Incoming Leave Applications Queue
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="pb-3 font-semibold">Employee</th>
                    <th className="pb-3 font-semibold">Department</th>
                    <th className="pb-3 font-semibold">Leave Type</th>
                    <th className="pb-3 font-semibold">Dates &amp; Duration</th>
                    <th className="pb-3 font-semibold">Reason</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id}>
                      <td className="py-3">
                        <span className={`font-bold block ${darkMode ? 'text-white' : 'text-slate-900'}`}>{leave.userName}</span>
                        <span className="text-[10px] text-slate-400">Applied: {leave.appliedAt}</span>
                      </td>
                      <td className="py-3 text-slate-400">{leave.department}</td>
                      <td className="py-3 capitalize font-semibold">{leave.leaveType}</td>
                      <td className="py-3">
                        <span className={`block font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                          {leave.startDate} to {leave.endDate}
                        </span>
                        <span className="text-[10px] text-slate-400">{leave.totalDays} Days</span>
                      </td>
                      <td className="py-3 text-slate-400 max-w-xs truncate">{leave.reason}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          leave.status === 'approved'
                            ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                            : leave.status === 'rejected'
                            ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {leave.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => reviewLeaveRequest(leave.id, 'approved')}
                              className="px-2.5 py-1 rounded-lg bg-[#00c853] hover:bg-[#00af48] text-white text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => reviewLeaveRequest(leave.id, 'rejected')}
                              className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400">Reviewed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: WORKLOAD & PERFORMANCE ANALYTICS (TaskFlow AI style) */}
      {/* ========================================================================= */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Performance Ratings Card (TaskFlow style) */}
            <div className={`p-6 rounded-2xl border space-y-5 ${
              darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Employee Performance Ratings
                  </h3>
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Benchmark evaluation of delivery punctuality and task precision
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#00c853] font-mono">89%</span>
                  <span className="text-[10px] text-slate-400 block">Organization Average</span>
                </div>
              </div>

              {/* Segmented Legend */}
              <div className="flex items-center gap-4 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-500">Tasks Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-500">Presence &amp; SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-slate-500">Completed Reviews</span>
                </div>
              </div>

              {/* Segmented Bars by Employee */}
              <div className="space-y-4">
                {employees.slice(0, 5).map((emp) => (
                  <div key={emp.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={emp.avatarUrl} alt={emp.fullName} className="w-5 h-5 rounded-full object-cover" />
                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{emp.fullName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00c853] font-bold">{emp.completedTasksCount || 14} Deliverables</span>
                    </div>

                    <div className="h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                      <div className="bg-rose-500 h-full" style={{ width: '45%' }} title="Tasks Completed: 45%" />
                      <div className="bg-amber-400 h-full" style={{ width: '35%' }} title="Presence & SLA: 35%" />
                      <div className="bg-indigo-500 h-full" style={{ width: '20%' }} title="Completed Reviews: 20%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Status & Capacity Distribution */}
            <div className={`p-6 rounded-2xl border space-y-5 ${
              darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Workforce Composition &amp; Capacity
                </h3>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Employment status segmentation across all 13 service wings
                </p>
              </div>

              {/* Segmented Bar */}
              <div className="space-y-2">
                <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                  <div className="bg-indigo-600 h-full" style={{ width: '64%' }} title="Permanent: 64%" />
                  <div className="bg-teal-400 h-full" style={{ width: '23%' }} title="Contract: 23%" />
                  <div className="bg-amber-400 h-full" style={{ width: '13%' }} title="Probation: 13%" />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Permanent
                    </div>
                    <div className="text-xl font-bold font-mono mt-1 text-slate-900 dark:text-white">64%</div>
                    <span className="text-[10px] text-slate-400">Core Engineering &amp; QA</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-xs text-teal-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-teal-400" /> Contract
                    </div>
                    <div className="text-xl font-bold font-mono mt-1 text-slate-900 dark:text-white">23%</div>
                    <span className="text-[10px] text-slate-400">Specialist Domain Sprints</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Probation
                    </div>
                    <div className="text-xl font-bold font-mono mt-1 text-slate-900 dark:text-white">13%</div>
                    <span className="text-[10px] text-slate-400">90-Day Evaluation</span>
                  </div>
                </div>
              </div>

              {/* Departmental Workload Gauge */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className={`text-xs font-bold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Departmental Utilization Index
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Engineering &amp; Cloud Systems</span>
                    <span className="font-mono font-bold text-[#00c853]">82% Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Quality Assurance &amp; Gate Testing</span>
                    <span className="font-mono font-bold text-amber-500">94% (Near Cap)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Product Design &amp; UI/UX</span>
                    <span className="font-mono font-bold text-[#00c853]">71% Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD EMPLOYEE MODAL */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Plus className="w-4 h-4 text-[#00c853]" />
                Onboard New DigiWorku Employee
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Vikram Rao"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="vikram@digiworku.com"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {departments.filter((d) => d !== 'All').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Designation</label>
                  <input
                    type="text"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    placeholder="Lead Full-Stack Architect"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Monthly Salary (INR ₹)</label>
                  <input
                    type="number"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-xl font-medium cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold shadow-md shadow-[#00c853]/20 cursor-pointer"
                >
                  Onboard Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: APPLY FOR LEAVE MODAL */}
      {/* ========================================================================= */}
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
                Submit Leave Application
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

            <form onSubmit={handleApplyLeave} className="p-6 space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="annual">Annual Paid Leave</option>
                  <option value="sick">Medical / Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="emergency">Family Emergency</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Reason / Handover Note *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail planned absence and handover arrangement..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className={`px-4 py-2 rounded-xl font-medium cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold shadow-md shadow-[#00c853]/20 cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: KYC DOCUMENTS VAULT */}
      {/* ========================================================================= */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmp.avatarUrl}
                  alt={selectedEmp.fullName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className={`text-sm font-bold flex items-center gap-1.5 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {selectedEmp.fullName} — KYC Vault
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedEmp.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmp(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {!canViewSensitiveData ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-center space-y-2">
                  <Lock className="w-8 h-8 mx-auto" />
                  <p className="font-bold">Confidential Government ID &amp; KYC Vault</p>
                  <p className="text-[11px] leading-relaxed">
                    National ID (PAN/Aadhaar) and compensation records are encrypted under role-based access controls.
                    Please contact Super Admin or HR for access.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Verified Official Documents ({selectedEmp.kycDocuments.length})
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#00c853]">
                      KYC Status: {selectedEmp.kycStatus.toUpperCase()}
                    </span>
                  </div>

                  {selectedEmp.kycDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#00c853]/10 text-[#00c853] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{doc.name}</h4>
                          <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {doc.type} • {doc.fileSize} • Uploaded {doc.uploadedAt}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-[#00c853] px-2 py-0.5 rounded bg-[#00c853]/10 border border-[#00c853]/20">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmp(null)}
                  className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Close Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
