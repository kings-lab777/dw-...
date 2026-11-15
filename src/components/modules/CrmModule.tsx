import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientLead, LeadStatus, ClientQuote, QuoteItem, ServiceCategoryKey } from '../../types';
import {
  Building2,
  Plus,
  Search,
  IndianRupee,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  Globe,
  Activity,
  ArrowRight,
  CheckCircle2,
  X,
  FileCheck2,
  Calendar,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';

export const CrmModule: React.FC = () => {
  const {
    clients,
    updateClientStatus,
    addClient,
    convertLeadToClient,
    quotes,
    addQuote,
    convertProposalToProject,
    services,
    currentRole,
    currentUser,
    darkMode,
    showToast,
    setActiveModule
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientLead | null>(clients[0] || null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('srv-01');

  // New Client Form
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newContractVal, setNewContractVal] = useState('1850000');
  const [newSource, setNewSource] = useState<ClientLead['leadSource']>('Website Inquiry');
  const [newRequirement, setNewRequirement] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Quote Generator Form
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Custom Web Application Architecture & PostgreSQL Database Schema', quantity: 1, rate: 850000, amount: 850000 },
    { id: '2', description: 'Enterprise UI/UX Design System & Interactive Figma Prototype', quantity: 1, rate: 450000, amount: 450000 },
    { id: '3', description: 'Razorpay Multi-currency Gateway & Webhook Infrastructure', quantity: 1, rate: 350000, amount: 350000 },
    { id: '4', description: 'Comprehensive 100-Point Security Penetration & QC Audit', quantity: 1, rate: 200000, amount: 200000 }
  ]);
  const [quoteTerms, setQuoteTerms] = useState('Payment Schedule: 40% upfront advance, 40% on Staging Verification, 20% on Final Quality Acceptance. Includes DigiWorku 90-day comprehensive SLA warranty.');
  const [quoteTaxRate, setQuoteTaxRate] = useState(18); // 18% GST

  // 7-Stage Sales Pipeline
  const pipelineStages: { id: LeadStatus; label: string; dotColor: string }[] = [
    { id: 'new_lead', label: 'New Lead', dotColor: 'bg-blue-500' },
    { id: 'contacted', label: 'Contacted', dotColor: 'bg-cyan-500' },
    { id: 'qualified', label: 'Qualified', dotColor: 'bg-indigo-500' },
    { id: 'requirement_received', label: 'Requirements', dotColor: 'bg-purple-500' },
    { id: 'proposal_sent', label: 'Proposal Sent', dotColor: 'bg-amber-500' },
    { id: 'negotiation', label: 'Negotiation', dotColor: 'bg-orange-500' },
    { id: 'won', label: 'Won / Client', dotColor: 'bg-[#00c853]' }
  ];

  const filteredClients = clients.filter((c) =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateSubtotal = () => quoteItems.reduce((acc, curr) => acc + curr.amount, 0);
  const calculateTotal = () => {
    const sub = calculateSubtotal();
    return sub + sub * (quoteTaxRate / 100);
  };

  const handleSelectServiceTemplate = (serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
    const srv = services.find((s) => s.id === serviceId);
    if (!srv) return;

    setQuoteItems([
      {
        id: `qi-${Date.now()}-1`,
        description: `${srv.name} — Architecture, Core Engineering & Implementation`,
        quantity: 1,
        rate: srv.clientQuotation,
        amount: srv.clientQuotation
      },
      {
        id: `qi-${Date.now()}-2`,
        description: `DigiWorku Quality Control Sweep, Performance Tuning & SLA Verification`,
        quantity: 1,
        rate: Math.round(srv.clientQuotation * 0.15),
        amount: Math.round(srv.clientQuotation * 0.15)
      }
    ]);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newEmail.trim()) return;

    addClient({
      companyName: newCompany,
      industry: newIndustry || 'Technology Enterprise',
      contactPerson: newContact || 'Procurement Officer',
      email: newEmail,
      phone: newPhone || '+91 98101 22340',
      website: newWebsite || 'https://digiworku.in',
      status: 'new_lead',
      contractValue: parseFloat(newContractVal) || 1850000,
      healthScore: 90,
      leadSource: newSource,
      requirementSummary: newRequirement,
      notes: newNotes,
      lastContactDate: new Date().toISOString().split('T')[0]
    });

    setShowAddClientModal(false);
    setNewCompany('');
    setNewEmail('');
    setNewContact('');
    setNewRequirement('');
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    const sub = calculateSubtotal();
    const tax = sub * (quoteTaxRate / 100);
    const total = sub + tax;

    addQuote({
      id: `qt-${Date.now()}`,
      quoteNumber: `DW-QT-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientId: selectedClient.id,
      clientName: selectedClient.companyName,
      clientEmail: selectedClient.email,
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: quoteItems,
      subtotal: sub,
      taxRate: quoteTaxRate,
      taxAmount: tax,
      total,
      terms: quoteTerms,
      status: 'sent'
    });

    updateClientStatus(selectedClient.id, 'proposal_sent');
    setShowQuoteModal(false);
  };

  const handleConvertWonLead = (leadId: string) => {
    const updated = convertLeadToClient(leadId);
    setSelectedClient(updated);
  };

  const handleConvertQuoteToProject = (quoteId: string) => {
    const newProj = convertProposalToProject(quoteId);
    setActiveModule('projects');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER & METRIC SUMMARY */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            CRM &amp; Client Pipeline Management
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Lead qualification, 13-service proposal drafting, client conversion and contract relationships
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddClientModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Lead</span>
          </button>

          {selectedClient && (
            <button
              onClick={() => setShowQuoteModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Draft Proposal / Quote (₹)</span>
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. 7-STAGE INTERACTIVE SALES FUNNEL BAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`p-4 rounded-3xl border transition-all duration-200 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>DigiWorku Client Acquisition Pipeline</span>
          <span className="font-mono text-blue-500">{clients.length} Total Accounts in Pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {pipelineStages.map((stage) => {
            const count = clients.filter((c) => {
              if (stage.id === 'won') return c.status === 'won' || c.status === 'active_client';
              if (stage.id === 'new_lead') return c.status === 'new_lead' || c.status === 'lead';
              return c.status === stage.id;
            }).length;

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
                  <span className={`w-2 h-2 rounded-full ${stage.dotColor}`} />
                  <span className={`truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{stage.label}</span>
                </div>
                <div className={`text-base font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. MAIN CRM SPLIT: CLIENT DIRECTORY & CLIENT DOSSIER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Accounts Directory */}
        <div className={`rounded-3xl border p-5 space-y-4 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search companies, contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                darkMode ? 'bg-[#0f1115] border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              const isWon = client.status === 'won' || client.status === 'active_client';

              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500 shadow-sm'
                      : darkMode
                        ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold truncate ${
                      isSelected ? 'text-blue-500 font-black' : darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {client.companyName}
                    </h4>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isWon
                        ? 'bg-[#00c853]/15 text-[#00c853]'
                        : 'bg-amber-500/15 text-amber-500'
                    }`}>
                      {client.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{client.contactPerson}</span>
                    <span className="font-mono text-[#00c853] font-bold">
                      ₹{(client.contractValue / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Client Dossier & Proposals Hub */}
        {selectedClient ? (
          <div className={`lg:col-span-2 rounded-3xl border p-6 space-y-6 ${
            darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-wider">
                  {selectedClient.industry}
                </span>
                <h2 className={`text-xl font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedClient.companyName}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-500" /> {selectedClient.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#00c853]" /> {selectedClient.phone}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-purple-500" /> {selectedClient.website}</span>
                </div>
              </div>

              {/* Conversion Button */}
              {selectedClient.status !== 'won' && selectedClient.status !== 'active_client' ? (
                <button
                  onClick={() => handleConvertWonLead(selectedClient.id)}
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00c853]/20 cursor-pointer shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Convert Lead to Active Client</span>
                </button>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 text-xs font-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Verified Corporate Client
                </span>
              )}
            </div>

            {/* Requirement Summary & Financial Scope */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Contract Potential</span>
                <div className="text-xl font-black font-mono mt-1 text-[#00c853]">
                  ₹{(selectedClient.contractValue / 100000).toFixed(2)}L
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">INR ₹ Valuation</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Acquisition Source</span>
                <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {selectedClient.leadSource || 'Website Inbound'}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Attribution Channel</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Account Health</span>
                <div className="text-xl font-black font-mono mt-1 text-blue-500">
                  {selectedClient.healthScore}/100
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Engagement Velocity</span>
              </div>
            </div>

            {/* Client Proposals & Quotes Issued */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Proposals &amp; Quotations Issued
                </h3>
                <span className="text-xs text-slate-400 font-bold">18% GST Applicable</span>
              </div>

              {quotes.filter((q) => q.clientId === selectedClient.id).length === 0 ? (
                <div className={`p-6 text-center text-xs border rounded-2xl ${
                  darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
                }`}>
                  No quotations issued yet. Click "Draft Proposal / Quote" to create an itemized proposal from our 13 service catalogue.
                </div>
              ) : (
                quotes.filter((q) => q.clientId === selectedClient.id).map((quote) => (
                  <div
                    key={quote.id}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-black text-blue-500">{quote.quoteNumber}</span>
                        <div className={`text-xs font-bold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          Total: ₹{quote.total.toLocaleString('en-IN')} (incl. GST)
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                          {quote.status}
                        </span>

                        {quote.status !== 'accepted' && (
                          <button
                            onClick={() => handleConvertQuoteToProject(quote.id)}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                          >
                            <span>Accept &amp; Launch Project</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs border-t pt-2 border-slate-200 dark:border-slate-800">
                      {quote.items.map((it) => (
                        <div key={it.id} className="flex items-center justify-between text-slate-400 text-[11px]">
                          <span>• {it.description}</span>
                          <span className="font-mono text-slate-300">₹{it.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Activity History */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                Contact &amp; Negotiation Timeline
              </span>
              <div className="space-y-2">
                {selectedClient.activityHistory.map((act, i) => (
                  <div key={i} className="text-xs p-3 rounded-xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{act.date} • {act.author}</span>
                    </div>
                    <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{act.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-xs text-slate-400">
            Select a client account to inspect details
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. MODALS (REGISTER LEAD & DRAFT PROPOSAL) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateClient}
            className={`w-full max-w-lg rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Register Inbound Client Lead</h3>
              <button
                type="button"
                onClick={() => setShowAddClientModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Health Systems"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Industry Sector</label>
                  <input
                    type="text"
                    placeholder="e.g. Healthcare Tech"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Primary Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Samir Gupta"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="samir@apexhealth.in"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Estimated Budget Potential (₹)</label>
                  <input
                    type="number"
                    value={newContractVal}
                    onChange={(e) => setNewContractVal(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Lead Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Website Inquiry">Website Inquiry</option>
                    <option value="Referral">Client Referral</option>
                    <option value="LinkedIn">LinkedIn B2B</option>
                    <option value="WhatsApp">WhatsApp Direct</option>
                    <option value="Outreach">Enterprise Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Requirement Brief</label>
                <textarea
                  rows={2}
                  placeholder="Summary of client's requirements, features, and desired delivery deadline..."
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddClientModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Register Account
              </button>
            </div>
          </form>
        </div>
      )}

      {showQuoteModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleGenerateQuote}
            className={`w-full max-w-2xl rounded-3xl p-6 border transition-all max-h-[90vh] overflow-y-auto space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black">Draft Client Proposal &amp; Quotation</h3>
                <p className="text-xs text-slate-400">Recipient: {selectedClient.companyName} ({selectedClient.contactPerson})</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Service Catalogue Loader */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold block text-blue-500">
                Load Template from 13 DigiWorku Services:
              </label>
              <select
                value={selectedServiceForQuote}
                onChange={(e) => handleSelectServiceTemplate(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                  darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} (Base: ₹{s.clientQuotation.toLocaleString('en-IN')})</option>
                ))}
              </select>
            </div>

            {/* Line items list */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Itemized Deliverables &amp; Milestones</span>
              <div className="space-y-2">
                {quoteItems.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 text-xs">
                    <input
                      type="text"
                      className={`col-span-8 p-2 rounded-xl border text-xs ${
                        darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...quoteItems];
                        updated[idx].description = e.target.value;
                        setQuoteItems(updated);
                      }}
                    />
                    <input
                      type="number"
                      className={`col-span-4 p-2 rounded-xl border text-xs font-mono text-right ${
                        darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      value={item.amount}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        const updated = [...quoteItems];
                        updated[idx].amount = val;
                        updated[idx].rate = val;
                        setQuoteItems(updated);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Subtotal, Tax & Total */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono">₹{calculateSubtotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>GST ({quoteTaxRate}%):</span>
                <span className="font-mono">₹{(calculateSubtotal() * (quoteTaxRate / 100)).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between font-bold text-sm text-[#00c853] pt-1 border-t border-slate-200 dark:border-slate-800">
                <span>Total Proposal Valuation:</span>
                <span className="font-mono">₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#00c853] hover:bg-[#00b047] text-white text-xs font-bold shadow-md shadow-[#00c853]/20"
              >
                Issue Formal Quotation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
