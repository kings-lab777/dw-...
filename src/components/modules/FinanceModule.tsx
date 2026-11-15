import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RestrictedAccessView } from '../modals/RestrictedAccessView';
import { InvoiceRecord, BusinessExpense, FreelancerPayout } from '../../types';
import {
  IndianRupee,
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
  X,
  PieChart,
  DollarSign,
  Send,
  Building,
  Check,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const FinanceModule: React.FC = () => {
  const {
    currentRole,
    hasAccessTo,
    payroll,
    invoices,
    expenses,
    financialSummary,
    processPayrollItem,
    createInvoice,
    recordInvoicePayment,
    addBusinessExpense,
    freelancerPayouts,
    releaseFreelancerPayout,
    clients,
    projects,
    darkMode,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payouts' | 'expenses' | 'payroll'>('overview');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<InvoiceRecord | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // New Invoice Form
  const [invClientId, setInvClientId] = useState(clients[0]?.id || '');
  const [invProjectId, setInvProjectId] = useState(projects[0]?.id || '');
  const [invAmount, setInvAmount] = useState('650000');
  const [invDueDate, setInvDueDate] = useState('2026-12-10');

  // Record Payment Form
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<InvoiceRecord['payments'][0]['paymentMethod']>('NEFT/IMPS');
  const [paymentNotes, setPaymentNotes] = useState('');

  // New Expense Form
  const [expCategory, setExpCategory] = useState<BusinessExpense['category']>('Software & Tools');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('25000');
  const [expProjectId, setExpProjectId] = useState(projects[0]?.id || '');

  // RBAC Guardrail: Strictly restrict if not authorized
  if (!hasAccessTo('finance')) {
    return <RestrictedAccessView moduleName="Finance & Accounting" />;
  }

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === invClientId) || clients[0];
    const project = projects.find((p) => p.id === invProjectId) || projects[0];
    const subtotal = parseFloat(invAmount) || 100000;
    const taxAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;

    createInvoice({
      invoiceNumber: `DW-INV-2026-${Math.floor(8900 + Math.random() * 99)}`,
      clientId: client.id,
      clientName: client.companyName,
      clientEmail: client.email,
      projectId: project.id,
      projectName: project.name,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invDueDate,
      subtotal,
      taxAmount,
      totalAmount,
      status: 'sent'
    });

    setShowInvoiceModal(false);
  };

  const handleOpenPayment = (inv: InvoiceRecord) => {
    setSelectedInvoiceForPayment(inv);
    const remaining = inv.totalAmount - inv.amountPaid;
    setPaymentAmount(String(remaining));
    setShowPaymentModal(true);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;
    const amt = parseFloat(paymentAmount) || 0;
    if (amt <= 0) {
      showToast('Please enter a valid payment amount', 'warning');
      return;
    }

    recordInvoicePayment(selectedInvoiceForPayment.id, amt, paymentMethod, paymentNotes);
    setShowPaymentModal(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc.trim()) return;
    const prj = projects.find((p) => p.id === expProjectId);

    addBusinessExpense({
      category: expCategory,
      description: expDesc,
      amount: parseFloat(expAmount) || 0,
      date: new Date().toISOString().split('T')[0],
      projectId: prj?.id,
      projectName: prj?.name,
      loggedBy: 'Finance Ops',
      status: 'approved'
    });

    setShowExpenseModal(false);
    setExpDesc('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER & METRIC BANNER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Finance &amp; Corporate Ledger
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Strictly denominated in INR (₹). Invoicing, installment collections, project profitability &amp; payouts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Client Invoice</span>
          </button>

          <button
            onClick={() => setShowExpenseModal(true)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}
          >
            <Plus className="w-4 h-4 text-amber-500" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FINANCIAL TELEMETRY CARDS (Strict INR ₹) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border transition-all space-y-2 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Monthly Revenue</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{(financialSummary.monthlyRevenue / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-bold text-[#00c853] flex items-center bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              <ArrowUpRight className="w-3.5 h-3.5" /> +28.4%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
            <span>Collected: ₹{(financialSummary.collectedRevenue / 100000).toFixed(2)}L</span>
            <span className="text-amber-500 font-bold">Due: ₹{(financialSummary.outstandingRevenue / 100000).toFixed(2)}L</span>
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all space-y-2 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Realized Net Profit</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black font-mono text-[#00c853]`}>
              ₹{(financialSummary.netProfit / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              {financialSummary.profitMarginPercent}% Margin
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold">
            Total Expenses: ₹{(financialSummary.totalExpenses / 100000).toFixed(2)}L
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all space-y-2 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Freelancer Commitments</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black font-mono text-purple-500`}>
              ₹{(financialSummary.freelancerCommitments / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              {freelancerPayouts.filter((p) => p.status === 'eligible').length} Pending
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold">
            Strictly gated by QC deliverable acceptance
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all space-y-2 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Annual YTD Revenue</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{(financialSummary.totalRevenueYTD / 10000000).toFixed(2)} Cr
            </span>
            <span className="text-xs font-bold text-[#00c853] bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20">
              FY 2026-27
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold">
            Corporate GST filings: Up to date (GSTR-3B)
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. NAVIGATION TABS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border w-fit ${
        darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        {(['overview', 'invoices', 'payouts', 'expenses', 'payroll'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab === 'overview'
              ? 'Project Profitability'
              : tab === 'payouts'
                ? 'Freelancer Payouts'
                : tab}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. TAB CONTENTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* TAB 1: PROJECT PROFITABILITY OVERVIEW */}
      {activeTab === 'overview' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Project-wise Profitability &amp; Cost Ledger
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Realized profit calculation: Client Revenue minus staff salaries, freelancer payouts, and infrastructure expenses
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
              Avg Gross Margin: 56.8%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b text-[10px] uppercase tracking-wider ${
                  darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <th className="py-3 px-4 font-bold">Project Name</th>
                  <th className="py-3 px-4 font-bold">Client Account</th>
                  <th className="py-3 px-4 font-bold text-right">Agreed Budget</th>
                  <th className="py-3 px-4 font-bold text-right">Actual Cost Spent</th>
                  <th className="py-3 px-4 font-bold text-right">Net Profit</th>
                  <th className="py-3 px-4 font-bold text-right">Net Margin</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {projects.map((proj) => {
                  const profit = proj.budget - proj.spent;
                  const margin = proj.budget > 0 ? Math.round((profit / proj.budget) * 100) : 0;

                  return (
                    <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-[#0f1115] transition-colors">
                      <td className="py-3.5 px-4 font-bold">
                        <div className="text-slate-900 dark:text-white">{proj.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{proj.code}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {proj.clientName}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                        ₹{proj.budget.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-amber-500 font-bold">
                        ₹{proj.spent.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#00c853]">
                        ₹{profit.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-blue-500">
                        {margin}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          proj.status === 'delayed'
                            ? 'bg-rose-500/10 text-rose-500'
                            : proj.status === 'completed' || proj.status === 'approved'
                              ? 'bg-[#00c853]/10 text-[#00c853]'
                              : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {proj.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES & PARTIAL INSTALLMENTS */}
      {activeTab === 'invoices' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Corporate Invoices &amp; Installment Schedules
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Track milestone invoices, partial installment receipts, GST breakdowns and due dates
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => {
              const remaining = inv.totalAmount - inv.amountPaid;
              const isPaid = inv.status === 'paid';
              const isPartial = inv.status === 'partially_paid';

              return (
                <div
                  key={inv.id}
                  className={`p-4 rounded-2xl border space-y-3 transition-all ${
                    darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-blue-500">{inv.invoiceNumber}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isPaid
                            ? 'bg-[#00c853]/10 text-[#00c853]'
                            : isPartial
                              ? 'bg-amber-500/10 text-amber-500'
                              : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {inv.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {inv.clientName} • {inv.projectName}
                      </h4>
                      <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1 font-mono">
                        <span>Issued: {inv.issueDate}</span>
                        <span>Due: {inv.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Total with GST</span>
                        <div className={`text-base font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          ₹{inv.totalAmount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] font-mono font-bold">
                          {isPaid ? (
                            <span className="text-[#00c853]">Fully Settled</span>
                          ) : (
                            <span className="text-amber-500">Due: ₹{remaining.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </div>

                      {!isPaid && (
                        <button
                          onClick={() => handleOpenPayment(inv)}
                          className="px-3.5 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Record Payment</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Payment history list */}
                  {inv.payments && inv.payments.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Payment Receipts:
                      </span>
                      {inv.payments.map((p) => (
                        <div key={p.id} className="flex items-center justify-between text-slate-400 font-mono">
                          <span>✓ Cleared ₹{p.amount.toLocaleString('en-IN')} via {p.paymentMethod} ({p.paidAt})</span>
                          <span className="text-slate-500">Ref: {p.transactionReference}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FREELANCER PAYOUTS DISBURSEMENT */}
      {activeTab === 'payouts' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Freelancer Compensation &amp; Payout Release Center
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Gated by Quality Assurance. Payouts are released directly via UPI / NEFT with instant expense ledger sync
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {freelancerPayouts.map((payout) => {
              const isPaid = payout.status === 'paid';
              return (
                <div
                  key={payout.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isPaid
                          ? 'bg-[#00c853]/10 text-[#00c853]'
                          : payout.status === 'eligible'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {payout.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Due: {payout.dueOn}</span>
                    </div>
                    <h4 className={`text-sm font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {payout.freelancerName} • {payout.projectName}
                    </h4>
                    <p className={`text-xs text-slate-400 mt-0.5`}>
                      Deliverable: {payout.taskTitle}
                    </p>
                    {payout.paymentReference && (
                      <span className="text-[10px] font-mono text-[#00c853] block mt-1">
                        Cleared Ref: {payout.paymentReference} ({payout.paidAt})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Agreed Payout</span>
                      <span className="text-lg font-black font-mono text-[#00c853]">
                        ₹{payout.amount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {!isPaid && (
                      <button
                        onClick={() => releaseFreelancerPayout(payout.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Disburse via UPI / NEFT</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: EXPENSES LEDGER */}
      {activeTab === 'expenses' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Business Operating Expenses (INR ₹)
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Software licenses, hosting infrastructure, marketing campaigns and verified vendor disbursements
              </p>
            </div>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500">
                      {exp.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{exp.date}</span>
                  </div>
                  <div className={`font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {exp.description}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-amber-500 text-sm">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">By: {exp.loggedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PAYROLL */}
      {activeTab === 'payroll' && (
        <div className={`rounded-3xl border p-6 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className={`text-base font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Employee Payroll &amp; Monthly Compensation
              </h3>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Strictly confidential staff compensation ledger (Accessible only to Super Admin &amp; Finance)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">Period: November 2026</span>
          </div>

          <div className="space-y-3">
            {payroll.map((pay) => (
              <div
                key={pay.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {pay.employeeName}
                  </h4>
                  <div className="text-slate-400 text-xs">
                    {pay.role} • {pay.department}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    {pay.paymentMethod} • Processed: {pay.processedDate || 'Scheduled'}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Net Payout</span>
                    <span className={`text-base font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      ₹{pay.netSalary.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {pay.status === 'paid' ? (
                    <span className="px-3 py-1.5 rounded-xl bg-[#00c853]/10 text-[#00c853] font-bold text-xs border border-[#00c853]/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed
                    </span>
                  ) : (
                    <button
                      onClick={() => processPayrollItem(pay.id)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                    >
                      Process Transfer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. MODALS (INVOICE, PAYMENT INSTALLMENT & EXPENSE) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateInvoice}
            className={`w-full max-w-lg rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Generate Corporate Client Invoice</h3>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Client Account</label>
                  <select
                    value={invClientId}
                    onChange={(e) => setInvClientId(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.companyName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Associated Project</label>
                  <select
                    value={invProjectId}
                    onChange={(e) => setInvProjectId(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Invoice Amount Subtotal (₹)</label>
                  <input
                    type="number"
                    required
                    value={invAmount}
                    onChange={(e) => setInvAmount(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    required
                    value={invDueDate}
                    onChange={(e) => setInvDueDate(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
                18% GST will be applied automatically (₹{Math.round((parseFloat(invAmount) || 0) * 0.18).toLocaleString('en-IN')}).
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Issue Invoice
              </button>
            </div>
          </form>
        </div>
      )}

      {showPaymentModal && selectedInvoiceForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleRecordPayment}
            className={`w-full max-w-md rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black">Record Client Payment</h3>
                <p className="text-xs text-slate-400">Invoice: {selectedInvoiceForPayment.invoiceNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 font-mono ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="UPI">UPI Direct</option>
                  <option value="NEFT/IMPS">NEFT / RTGS / IMPS</option>
                  <option value="Bank Transfer">Bank Transfer (SWIFT / Wire)</option>
                  <option value="Stripe/Card">Stripe / Credit Card</option>
                  <option value="Cheque">Corporate Cheque</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Notes / Transaction Reference</label>
                <input
                  type="text"
                  placeholder="e.g. HDFC-RTGS-982103819 or Advance Milestone 2"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white text-xs font-bold shadow-md shadow-[#00c853]/20"
              >
                Confirm Payment Receipt
              </button>
            </div>
          </form>
        </div>
      )}

      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddExpense}
            className={`w-full max-w-md rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Log Business Expense</h3>
              <button
                type="button"
                onClick={() => setShowExpenseModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Expense Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Software & Tools">Software & Tools</option>
                  <option value="Infrastructure & Hosting">Infrastructure & Hosting</option>
                  <option value="Marketing">Marketing & Ads</option>
                  <option value="Office & Admin">Office & Admin</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Cloud Cluster Renewal for Nov"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Amount (INR ₹)</label>
                <input
                  type="number"
                  required
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 font-mono ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExpenseModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
