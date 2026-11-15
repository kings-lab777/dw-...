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
  ExternalLink
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const {
    companySettings,
    updateCompanySettings,
    auditLogs,
    currentRole,
    showToast,
    darkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'general' | 'audit' | 'database'>('general');
  const [formData, setFormData] = useState({ ...companySettings });
  const [auditSearch, setAuditSearch] = useState('');
  const [selectedAuditModule, setSelectedAuditModule] = useState('all');

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

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-colors duration-200 ${
        darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00c853]/10 border border-[#00c853]/20 flex items-center justify-center text-[#00c853]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-lg md:text-xl font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              System Configuration &amp; Audit
            </h2>
            <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Enterprise policy parameters, shift windows, cloud integrations, and immutable security audit logs
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${
          darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'general' 
                ? 'bg-[#00c853] text-white font-black shadow-xs' 
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            General &amp; Shifts
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit' 
                ? 'bg-[#00c853] text-white font-black shadow-xs' 
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Trail ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'database' 
                ? 'bg-[#00c853] text-white font-black shadow-xs' 
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Database &amp; RLS
          </button>
        </div>
      </div>

      {/* Tab 1: General Settings */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enterprise Identity */}
            <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${
              darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <div className={`flex items-center gap-2 pb-2 border-b ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <Building2 className="w-4 h-4 text-[#00c853]" />
                <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Company Identity</h3>
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  LEGAL ENTITY NAME
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:border-[#00c853] outline-none font-semibold ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  OPERATIONS DISPATCH EMAIL
                </label>
                <input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:border-[#00c853] outline-none font-semibold ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  OFFICIAL SUPPORT PHONE
                </label>
                <input
                  type="text"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:border-[#00c853] outline-none font-semibold ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  DEFAULT LEDGER CURRENCY
                </label>
                <input
                  type="text"
                  value={formData.defaultCurrency}
                  disabled
                  className={`w-full h-10 px-3.5 rounded-xl border text-xs font-mono font-bold ${
                    darkMode ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                />
              </div>
            </div>

            {/* Shift & Time Configuration */}
            <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${
              darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <div className={`flex items-center gap-2 pb-2 border-b ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <Clock className="w-4 h-4 text-[#00c853]" />
                <h3 className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Shift Windows &amp; Timezone</h3>
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  ENTERPRISE TIMEZONE
                </label>
                <input
                  type="text"
                  value={formData.timezone}
                  disabled
                  className={`w-full h-10 px-3.5 rounded-xl border text-xs font-mono font-bold ${
                    darkMode ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    SHIFT COMMENCE
                  </label>
                  <input
                    type="text"
                    value={formData.workingHoursStart}
                    onChange={(e) => setFormData({ ...formData, workingHoursStart: e.target.value })}
                    className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:border-[#00c853] outline-none font-semibold font-mono ${
                      darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    SHIFT CONCLUDE
                  </label>
                  <input
                    type="text"
                    value={formData.workingHoursEnd}
                    onChange={(e) => setFormData({ ...formData, workingHoursEnd: e.target.value })}
                    className={`w-full h-10 px-3.5 rounded-xl border text-xs focus:border-[#00c853] outline-none font-semibold font-mono ${
                      darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  QC PASSING SCORE THRESHOLD (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={70}
                    max={100}
                    value={formData.qcPassingThreshold}
                    onChange={(e) => setFormData({ ...formData, qcPassingThreshold: parseInt(e.target.value) })}
                    className="flex-1 accent-[#00c853]"
                  />
                  <span className="font-mono text-sm font-black text-[#00c853]">{formData.qcPassingThreshold}%</span>
                </div>
                <span className={`text-[10px] block mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Milestones under this score require revision before client presentation.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#00c853]/20 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CONFIGURATION PARAMETERS</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Security & Audit Trail */}
      {activeTab === 'audit' && (
        <div className={`p-6 rounded-2xl border space-y-4 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
            darkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <div>
              <h3 className={`text-sm font-extrabold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <History className="w-4 h-4 text-[#00c853]" />
                <span>Enterprise Audit Trail</span>
              </h3>
              <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Every state transition, approval, shift punch, and administrative event is recorded
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className={`pl-8 pr-3 py-1.5 rounded-xl border text-xs focus:border-[#00c853] outline-none ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <select
                value={selectedAuditModule}
                onChange={(e) => setSelectedAuditModule(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border text-xs focus:border-[#00c853] outline-none cursor-pointer ${
                  darkMode ? 'border-slate-800 bg-slate-900/60 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'
                }`}
              >
                <option value="all">All Modules</option>
                <option value="attendance">Attendance</option>
                <option value="tasks">Tasks</option>
                <option value="crm">CRM</option>
                <option value="projects">Projects</option>
                <option value="finance">Finance</option>
                <option value="qc">QC Engine</option>
                <option value="employees">Employees</option>
                <option value="settings">Settings</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`text-[10px] uppercase border-b font-extrabold ${
                  darkMode ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-200'
                }`}>
                  <th className="py-2.5">Timestamp</th>
                  <th className="py-2.5">Actor</th>
                  <th className="py-2.5">Action</th>
                  <th className="py-2.5">Module</th>
                  <th className="py-2.5">Event Details</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-medium ${
                darkMode ? 'divide-slate-800/40 text-slate-300' : 'divide-slate-100 text-slate-700'
              }`}>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className={darkMode ? 'hover:bg-slate-800/20' : 'hover:bg-slate-50'}>
                    <td className={`py-3 font-mono text-[11px] whitespace-nowrap ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{log.timestamp}</td>
                    <td className={`py-3 font-bold whitespace-nowrap ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      <div>{log.actorName}</div>
                      <span className="text-[9px] text-[#00c853] uppercase font-mono font-bold">{log.actorRole}</span>
                    </td>
                    <td className={`py-3 font-extrabold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{log.action}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        {log.module}
                      </span>
                    </td>
                    <td className={`py-3 max-w-xs truncate ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{log.details}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Database & Cloud Integration */}
      {activeTab === 'database' && (
        <div className={`p-6 rounded-2xl border space-y-6 transition-colors duration-200 ${
          darkMode ? 'border-slate-800 bg-[#14171d] shadow-xl' : 'border-slate-200 bg-white shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-3 border-b ${
            darkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <div>
              <h3 className={`text-sm font-extrabold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Database className="w-4 h-4 text-[#00c853]" />
                <span>Supabase PostgreSQL Cloud Integration</span>
              </h3>
              <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Target Instance: <span className={`font-mono ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>https://rjxbdjgagizjmjwnlbxx.supabase.co</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                <span className="w-2 h-2 rounded-full bg-[#00c853] animate-ping" />
                Live Cloud Sync Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border space-y-1 ${
              darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Tables</span>
              <div className={`text-2xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>12 Tables</div>
              <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>internal_tasks, attendance, payouts...</span>
            </div>

            <div className={`p-4 rounded-xl border space-y-1 ${
              darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Row Level Security</span>
              <div className="text-2xl font-black text-[#00c853] font-mono">100% Enforced</div>
              <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Strict salary &amp; dossier guardrails</span>
            </div>

            <div className={`p-4 rounded-xl border space-y-1 ${
              darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
            }`}>
              <span className={`text-[10px] uppercase font-extrabold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Client Fallback</span>
              <div className="text-2xl font-black text-blue-500 font-mono">Resilient Offline</div>
              <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Automatic localStorage syncing</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            darkMode ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}>
            <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>PostgreSQL Migration DDL File</h4>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              The complete relational migration script with all table definitions, indexes, foreign keys, triggers, and Row Level Security policies is verified at <span className="text-[#00c853] font-mono font-bold">supabase/schema.sql</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
