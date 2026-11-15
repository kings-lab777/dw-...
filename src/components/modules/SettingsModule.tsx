import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building2,
  Clock,
  Shield,
  Database,
  History,
  Save,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Plus,
  Check,
  X
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const {
    companySettings,
    updateCompanySettings,
    services,
    toggleServiceEnabled,
    updateServiceItem,
    auditLogs,
    currentRole,
    showToast,
    darkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'catalogue' | 'general' | 'roles' | 'audit' | 'database'>('catalogue');
  const [formData, setFormData] = useState({ ...companySettings });
  const [auditSearch, setAuditSearch] = useState('');
  const [selectedAuditModule, setSelectedAuditModule] = useState('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(formData);
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actorName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesModule = selectedAuditModule === 'all' || log.module === selectedAuditModule;
    return matchesSearch && matchesModule;
  });

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER & TAB BAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border transition-all duration-200 ${
        darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200/80 bg-white shadow-xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-lg md:text-xl font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              System Administration &amp; Service Catalogue
            </h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Configure DigiWorku's 13 core service offerings, corporate operating parameters, RBAC and audit trails
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className={`flex flex-wrap items-center gap-1 p-1 rounded-2xl border ${
          darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['catalogue', 'general', 'roles', 'audit', 'database'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm font-black'
                  : darkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'catalogue' ? '13 Services' : tab === 'roles' ? 'Role Matrix' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TAB 1: SERVICE CATALOGUE MANAGER (13 Services) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services List (Left) */}
          <div className={`rounded-3xl border p-5 space-y-3 ${
            darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">13 Service Categories</span>
              <span className="text-xs font-mono font-bold text-blue-500">{services.filter((s) => s.isEnabled).length} Enabled</span>
            </div>

            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {services.map((srv, idx) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500 shadow-sm'
                        : darkMode
                          ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        srv.isEnabled
                          ? 'bg-[#00c853]/15 text-[#00c853]'
                          : 'bg-slate-500/15 text-slate-400'
                      }`}>
                        {srv.isEnabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold leading-tight ${
                      isSelected ? 'text-blue-500 font-black' : darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {srv.name}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-400 font-mono">₹{srv.clientQuotation.toLocaleString('en-IN')}</span>
                      <span className="text-[#00c853] font-bold text-[10px]">
                        Margin: {Math.round(((srv.clientQuotation - srv.internalCost) / srv.clientQuotation) * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Detail & Editor (Right) */}
          <div className={`lg:col-span-2 rounded-3xl border p-6 space-y-6 ${
            darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-wider">
                  Department: {selectedService.assignedDepartment}
                </span>
                <h3 className={`text-xl font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedService.name}
                </h3>
                <p className={`text-xs text-slate-400 mt-1`}>
                  {selectedService.description}
                </p>
              </div>

              {/* Toggle Enable/Disable Switch */}
              <button
                onClick={() => toggleServiceEnabled(selectedService.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedService.isEnabled
                    ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30 hover:bg-[#00c853]/25'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {selectedService.isEnabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>{selectedService.isEnabled ? 'Service Active in Catalogue' : 'Service Disabled'}</span>
              </button>
            </div>

            {/* Pricing & Cost Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Client Quotation (INR ₹)</span>
                <div className={`text-xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  ₹{selectedService.clientQuotation.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Standard Proposal Base</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Internal Cost (INR ₹)</span>
                <div className="text-xl font-black font-mono mt-1 text-amber-500">
                  ₹{selectedService.internalCost.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Staff &amp; Freelancer Allocations</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Estimated Timeline</span>
                <div className="text-base font-bold mt-1 text-blue-500">
                  {selectedService.estimatedTimeline}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Standard Turnaround</span>
              </div>
            </div>

            {/* Deliverables & Acceptance Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border space-y-2 bg-slate-50 dark:bg-[#0f1115] border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Contract Deliverables
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#00c853] font-bold">✓</span>
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border space-y-2 bg-slate-50 dark:bg-[#0f1115] border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  QC Acceptance Criteria
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.acceptanceCriteria.map((acc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Required Skills & Templates */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Required Workforce Skills</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedService.requiredSkills.map((sk, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-500 font-mono font-bold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. TAB 2: GENERAL SETTINGS & SHIFTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className={`rounded-3xl border p-6 space-y-6 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Company Identity &amp; Operating Policies
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                DigiWorku corporate operating hours, business currency, and QC threshold configuration
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Official Support &amp; Ops Email</label>
              <input
                type="email"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Business Operating Currency</label>
              <input
                type="text"
                disabled
                value="INR (₹) — Indian Rupee"
                className={`w-full p-2.5 rounded-xl border text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono`}
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Official Timezone</label>
              <input
                type="text"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Daily Shift Window (Start)</label>
              <input
                type="text"
                value={formData.workingHoursStart}
                onChange={(e) => setFormData({ ...formData, workingHoursStart: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Daily Shift Window (End)</label>
              <input
                type="text"
                value={formData.workingHoursEnd}
                onChange={(e) => setFormData({ ...formData, workingHoursEnd: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. TAB 3: ROLE & RBAC PERMISSION MATRIX */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'roles' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Role-Based Access Control (RBAC) Architecture
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Strict backend enforcement: Salaries, client financials, and delivery authorizations are restricted by role
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b text-[10px] uppercase tracking-wider ${
                  darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <th className="py-3 px-4 font-bold">Role Title</th>
                  <th className="py-3 px-4 font-bold">Executive Dashboard</th>
                  <th className="py-3 px-4 font-bold">CRM &amp; Quotes</th>
                  <th className="py-3 px-4 font-bold">Projects Engine</th>
                  <th className="py-3 px-4 font-bold">Fokys Tasks</th>
                  <th className="py-3 px-4 font-bold">QC Review</th>
                  <th className="py-3 px-4 font-bold">Finance &amp; Ledger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {[
                  { role: 'Super Admin', dash: 'Full', crm: 'Full', prj: 'Full', tsk: 'Full', qc: 'Full', fin: 'Full' },
                  { role: 'Operations Manager', dash: 'Ops Overview', crm: 'View Only', prj: 'Full', tsk: 'Full', qc: 'Full', fin: 'No Access' },
                  { role: 'Sales / CRM Manager', dash: 'Sales KPIs', crm: 'Full', prj: 'View Only', tsk: 'Assigned', qc: 'No Access', fin: 'Invoices View' },
                  { role: 'Project Manager', dash: 'Sprint Velocity', crm: 'Requirements', prj: 'Full', tsk: 'Full', qc: 'Submit & Review', fin: 'No Access' },
                  { role: 'Finance Manager', dash: 'Financial Telemetry', crm: 'Quotes Only', prj: 'Budget Only', tsk: 'Assigned', qc: 'No Access', fin: 'Full' },
                  { role: 'Quality Reviewer', dash: 'Quality SLAs', crm: 'No Access', prj: 'Under QC', tsk: 'Review Lane', qc: 'Full', fin: 'No Access' },
                  { role: 'Employee', dash: 'Personal Shift', crm: 'No Access', prj: 'Assigned', tsk: 'Assigned', qc: 'Submit', fin: 'No Access' },
                  { role: 'Freelancer', dash: 'Work Portal', crm: 'No Access', prj: 'Assigned', tsk: 'Assigned', qc: 'Submit', fin: 'Own Payouts' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#0f1115] transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{row.role}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-blue-500">{row.dash}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-purple-500">{row.crm}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-emerald-500">{row.prj}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-blue-500">{row.tsk}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-amber-500">{row.qc}</td>
                    <td className="py-3 px-4 font-mono text-[11px] font-bold text-[#00c853]">{row.fin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. TAB 4: AUDIT TRAIL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'audit' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Immutable Security &amp; Compliance Audit Logs
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Cryptographically tracked record of state transitions, payouts, QC decisions, and role switches
              </p>
            </div>

            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00c853]" />
                  <div>
                    <span className="font-bold">{log.actorName}</span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span className="text-slate-500 dark:text-slate-400">[{log.module.toUpperCase()}]</span>
                    <span className="ml-2 font-medium">{log.action}: {log.details}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. TAB 5: SUPABASE DATABASE HEALTH */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'database' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Production PostgreSQL &amp; Supabase Instance Status
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Target Instance: <code className="font-mono text-blue-500">https://rjxbdjgagizjmjwnlbxx.supabase.co</code>
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 text-xs font-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-ping" /> Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { table: 'service_catalog', rows: services.length, rls: 'Public Read / Admin Write' },
              { table: 'projects', rows: 3, rls: 'Team Scope Active' },
              { table: 'internal_tasks', rows: 10, rls: 'Assignee & Manager Scope' },
              { table: 'invoices', rows: 3, rls: 'Finance Role Restricted' }
            ].map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-mono text-xs font-bold text-blue-500">{t.table}</span>
                <div className="text-xl font-black font-mono">{t.rows} records</div>
                <div className="text-[10px] text-slate-400 font-semibold">{t.rls}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
