import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RestrictedAccessView } from '../modals/RestrictedAccessView';
import { InvoiceRecord } from '../../types';
import {
  CircleDollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Shield,
  Download,
  Calendar,
  Layers,
  X
} from 'lucide-react';

export const FinanceModule: React.FC = () => {
  const {
    currentRole,
    hasAccessTo,
    payroll,
    invoices,
    financialSummary,
    processPayrollItem,
    createInvoice,
    clients,
    projects,
    darkMode
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'payroll' | 'invoices'>('overview');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // New Invoice Form
  const [invClientId, setInvClientId] = useState(clients[0]?.id || '');
  const [invProjectId, setInvProjectId] = useState(projects[0]?.id || '');
  const [invAmount, setInvAmount] = useState('250000');
  const [invDueDate, setInvDueDate] = useState('2026-12-01');

  // RBAC Guardrail: Strictly restrict if not Super Admin or Finance Manager
  if (!hasAccessTo('finance')) {
    return <RestrictedAccessView moduleName="Finance & Payroll" />;
  }

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === invClientId) || clients[0];
    const project = projects.find((p) => p.id === invProjectId) || projects[0];
    const amount = parseFloat(invAmount) || 150000;

    createInvoice({
      invoiceNumber: `INV-2026-${Math.floor(8900 + Math.random() * 99)}`,
      clientId: client.id,
      clientName: client.companyName,
      projectId: project.id,
      projectName: project.name,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invDueDate,
      subtotal: amount,
      taxAmount: amount * 0.18,
      totalAmount: amount * 1.18,
      status: 'sent'
    });

    setShowInvoiceModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Security Classification Banner */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
        darkMode ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50 border-purple-200 text-purple-900'
      }`}>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          <span className={`font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-purple-950'}`}>
            RESTRICTED EXECUTIVE FINANCE VAULT
          </span>
          <span className={darkMode ? 'text-slate-400' : 'text-purple-700'}>• Clearance: Level 4 Super Admin &amp; Finance Chief</span>
        </div>
        <span className="font-mono text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
          AUDITED UNDER GAAP &amp; GST
        </span>
      </div>

      {/* Tabs */}
      <div className={`flex items-center gap-2 border-b pb-3 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
              : darkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>P&amp;L Health &amp; Financial Trend</span>
        </button>

        <button
          onClick={() => setActiveTab('payroll')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'payroll'
              ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
              : darkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Employee Payroll Ledger</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
            darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
          }`}>
            {payroll.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'invoices'
              ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
              : darkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Client Invoices &amp; Receivables</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#00c853]/20 text-[#00c853] font-mono font-bold">
            ₹{(financialSummary.pendingInvoicesAmount / 1000).toFixed(0)}k
          </span>
        </button>
      </div>

      {/* Tab 1: P&L Health Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
              darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>YTD Revenue</span>
              <div className={`text-2xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                ₹{(financialSummary.totalRevenueYTD / 100000).toFixed(2)} Lakhs
              </div>
              <span className="text-[11px] text-[#00c853] font-bold flex items-center mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +28% vs previous fiscal cycle
              </span>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
              darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Monthly Revenue (Nov)</span>
              <div className="text-2xl font-black text-[#00c853] font-mono mt-1">
                ₹{financialSummary.monthlyRevenue.toLocaleString()}
              </div>
              <span className={`text-[11px] mt-1 block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Forecast: ₹15L (Target Achieved)</span>
            </div>

            <div className={`p-5 rounded-2xl border transition-colors duration-200 ${
              darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Monthly Expenses</span>
              <div className={`text-2xl font-black font-mono mt-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                ₹{financialSummary.totalExpenses.toLocaleString()}
              </div>
              <span className={`text-[11px] mt-1 block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Payroll, Cloud &amp; Infra</span>
            </div>

            <div className={`p-5 rounded-2xl border ${
              darkMode 
                ? 'bg-gradient-to-br from-[#14171d] to-[#041a12] border-[#00c853]/30 shadow-xl' 
                : 'bg-emerald-50/50 border-emerald-200 shadow-sm'
            }`}>
              <span className="text-[11px] font-bold text-[#00c853] uppercase tracking-wider">Net Operating Profit</span>
              <div className={`text-2xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                ₹{financialSummary.netProfit.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#00c853] font-bold mt-1 block">
                {financialSummary.profitMarginPercent}% Operating Margin
              </span>
            </div>
          </div>

          {/* Monthly Trend Visual Graph (Last 6 Months) */}
          <div className={`rounded-2xl p-6 space-y-4 border transition-colors duration-200 ${
            darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Monthly Cash Flow &amp; Profit Trend (2026)</h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Revenue (emerald green) vs. Operating Expenses (slate)</p>
              </div>
            </div>

            <div className={`grid grid-cols-6 gap-3 items-end pt-8 h-64 border-b pb-4 ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              {financialSummary.monthlyTrend.map((m) => {
                const revHeight = (m.revenue / 170000) * 100;
                const expHeight = (m.expenses / 170000) * 100;

                return (
                  <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1.5 w-full justify-center h-full">
                      {/* Revenue Bar */}
                      <div
                        className="w-5 md:w-8 bg-[#00c853] rounded-t-md hover:opacity-90 transition-all cursor-pointer relative group"
                        style={{ height: `${revHeight}%` }}
                        title={`Revenue: ₹${m.revenue.toLocaleString()}`}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          ₹{(m.revenue / 1000).toFixed(0)}k
                        </div>
                      </div>

                      {/* Expense Bar */}
                      <div
                        className={`w-5 md:w-8 rounded-t-md transition-all cursor-pointer relative group ${
                          darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        style={{ height: `${expHeight}%` }}
                        title={`Expenses: ₹${m.expenses.toLocaleString()}`}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          ₹{(m.expenses / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                    <span className={`text-[11px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Employee Payroll Ledger */}
      {activeTab === 'payroll' && (
        <div className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`p-4 border-b flex items-center justify-between ${
            darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'
          }`}>
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Monthly Staff Compensation Ledger
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pay Period: November 2026</p>
            </div>
            <div className="text-xs font-mono text-[#00c853] font-bold">
              Total Disbursement: ₹{payroll.reduce((acc, p) => acc + p.netSalary, 0).toLocaleString()}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase tracking-wider font-semibold border-b ${
                darkMode ? 'bg-[#090d15] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Role / Department</th>
                  <th className="py-3 px-4">Base Salary</th>
                  <th className="py-3 px-4">Bonus</th>
                  <th className="py-3 px-4">Deductions</th>
                  <th className="py-3 px-4">Net Payout</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                darkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-100 text-slate-700'
              }`}>
                {payroll.map((pay) => (
                  <tr key={pay.id} className={darkMode ? 'hover:bg-slate-900/60 transition-colors' : 'hover:bg-slate-50/80 transition-colors'}>
                    <td className={`py-3 px-4 font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{pay.employeeName}</td>
                    <td className="py-3 px-4">
                      <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{pay.role}</div>
                      <div className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{pay.department}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold">₹{pay.baseSalary.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-[#00c853] font-bold">+₹{pay.bonus.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-rose-500 font-semibold">-₹{pay.deductions.toLocaleString()}</td>
                    <td className={`py-3 px-4 font-mono font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      ₹{pay.netSalary.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30 text-[10px] font-bold uppercase">
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {pay.status !== 'paid' ? (
                        <button
                          onClick={() => processPayrollItem(pay.id)}
                          className="px-3 py-1 rounded-lg bg-[#00c853] hover:bg-[#00af48] text-white font-bold text-[11px] transition-all cursor-pointer shadow-xs"
                        >
                          Disburse
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#00c853] font-mono font-bold">Disbursed ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Client Invoices */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Issued Client Invoices &amp; Accounts Receivable
            </h3>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Invoice</span>
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
            darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <table className="w-full text-left text-xs">
              <thead className={`uppercase tracking-wider font-semibold border-b ${
                darkMode ? 'bg-[#090d15] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Client Company</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                darkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-100 text-slate-700'
              }`}>
                {invoices.map((inv) => (
                  <tr key={inv.id} className={darkMode ? 'hover:bg-slate-900/60 transition-colors' : 'hover:bg-slate-50/80 transition-colors'}>
                    <td className={`py-3 px-4 font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{inv.invoiceNumber}</td>
                    <td className={`py-3 px-4 font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{inv.clientName}</td>
                    <td className={`py-3 px-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{inv.projectName}</td>
                    <td className={`py-3 px-4 font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{inv.issueDate}</td>
                    <td className="py-3 px-4 font-mono text-amber-600 dark:text-amber-400 font-semibold">{inv.dueDate}</td>
                    <td className={`py-3 px-4 font-mono font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      ₹{inv.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          inv.status === 'paid'
                            ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <FileText className="w-4 h-4 text-[#00c853]" />
                Dispatch Client Invoice
              </h3>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Target Client</label>
                <select
                  value={invClientId}
                  onChange={(e) => setInvClientId(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Associated Project</label>
                <select
                  value={invProjectId}
                  onChange={(e) => setInvProjectId(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Amount (₹ INR)</label>
                  <input
                    type="number"
                    value={invAmount}
                    onChange={(e) => setInvAmount(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Due Date</label>
                  <input
                    type="date"
                    value={invDueDate}
                    onChange={(e) => setInvDueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
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
                  Dispatch Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
