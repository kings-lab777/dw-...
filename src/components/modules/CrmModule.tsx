import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientLead, LeadStatus, ClientQuote, QuoteItem } from '../../types';
import {
  Building2,
  Plus,
  Search,
  DollarSign,
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
  Calendar
} from 'lucide-react';

export const CrmModule: React.FC = () => {
  const { clients, updateClientStatus, addClient, addQuote, currentRole, currentUser, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientLead | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // New Client Form
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newContractVal, setNewContractVal] = useState('150000');
  const [newNotes, setNewNotes] = useState('');

  // Quote Generator Form
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Core Application Architecture & Database Schema Design', quantity: 1, rate: 45000, amount: 45000 },
    { id: '2', description: 'Interactive Frontend UI Development (React + Tailwind)', quantity: 80, rate: 800, amount: 64000 },
    { id: '3', description: '100-Point QA Security & Performance Compliance Sweep', quantity: 1, rate: 25000, amount: 25000 }
  ]);
  const [quoteTerms, setQuoteTerms] = useState('50% upfront retainer, 50% upon milestone staging acceptance.');
  const [quoteTaxRate, setQuoteTaxRate] = useState(18); // 18% GST

  const stages: { id: LeadStatus; label: string }[] = [
    { id: 'lead', label: 'Inbound Lead' },
    { id: 'contacted', label: 'Discovery & Contacted' },
    { id: 'proposal_sent', label: 'Proposal / Quote Sent' },
    { id: 'active_client', label: 'Active Enterprise Client' }
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

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newEmail.trim()) return;

    addClient({
      companyName: newCompany,
      industry: newIndustry || 'Technology Enterprise',
      contactPerson: newContact,
      email: newEmail,
      phone: newPhone || '+91 98765 43210',
      website: newWebsite || 'https://digiworku.com',
      status: 'lead',
      contractValue: parseFloat(newContractVal) || 150000,
      healthScore: 85,
      notes: newNotes,
      lastContactDate: new Date().toISOString().split('T')[0]
    });

    setShowAddClientModal(false);
    setNewCompany('');
    setNewContact('');
    setNewEmail('');
  };

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    const sub = calculateSubtotal();
    const tax = sub * (quoteTaxRate / 100);
    const total = sub + tax;

    const quote: ClientQuote = {
      id: `quote-${Date.now()}`,
      quoteNumber: `QTE-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientId: selectedClient.id,
      clientName: selectedClient.companyName,
      clientEmail: selectedClient.email,
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: '2026-12-15',
      items: quoteItems,
      subtotal: sub,
      taxRate: quoteTaxRate,
      taxAmount: tax,
      total: total,
      terms: quoteTerms,
      status: 'sent'
    };

    addQuote(quote);
    updateClientStatus(selectedClient.id, 'proposal_sent');
    setShowQuoteModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, leads, or contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] w-64 md:w-80 transition-colors ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
              }`}
            />
          </div>
        </div>

        <button
          onClick={() => setShowAddClientModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Inbound Lead</span>
        </button>
      </div>

      {/* CRM Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {stages.map((stage) => {
          const stageClients = filteredClients.filter((c) => c.status === stage.id);

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border p-3.5 space-y-3 min-h-[520px] flex flex-col justify-start transition-colors duration-200 ${
                darkMode
                  ? 'border-slate-800 bg-[#14171d]/90'
                  : 'border-slate-200/90 bg-slate-100/60 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between px-1">
                <span className={`font-bold text-xs uppercase tracking-wider ${
                  darkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {stage.label}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  {stageClients.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {stageClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all group space-y-3 ${
                      darkMode
                        ? 'bg-[#0f1115] hover:bg-[#151922] border-slate-800 hover:border-slate-700 shadow-md'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold transition-colors ${
                        darkMode ? 'text-white group-hover:text-[#00c853]' : 'text-slate-900 group-hover:text-[#00c853]'
                      }`}>
                        {client.companyName}
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {client.industry}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between text-xs pt-1 border-t ${
                      darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}>
                      <span className="font-medium">Contract Value:</span>
                      <span className="font-mono font-bold text-[#00c853]">
                        ₹{client.contractValue.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`text-[11px] truncate max-w-[120px] font-medium ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {client.contactPerson}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 font-bold">
                          {client.healthScore}% Health
                        </span>

                        {stage.id !== 'active_client' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const next: LeadStatus =
                                stage.id === 'lead'
                                  ? 'contacted'
                                  : stage.id === 'contacted'
                                  ? 'proposal_sent'
                                  : 'active_client';
                              updateClientStatus(client.id, next);
                            }}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              darkMode 
                                ? 'bg-slate-800 hover:bg-[#00c853] hover:text-white text-slate-400' 
                                : 'bg-slate-100 hover:bg-[#00c853] hover:text-white text-slate-600'
                            }`}
                            title="Advance stage"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageClients.length === 0 && (
                  <div className={`py-12 text-center text-xs border border-dashed rounded-xl ${
                    darkMode ? 'text-slate-600 border-slate-800/80' : 'text-slate-400 border-slate-200'
                  }`}>
                    No clients in {stage.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Dossier & History Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className={`border rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div>
                <h3 className={`text-base font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Building2 className="w-5 h-5 text-[#00c853]" />
                  {selectedClient.companyName}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedClient.industry}</p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
              {/* Primary Contact Bar */}
              <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-xl border ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Primary Contact</span>
                  <span className={`font-semibold mt-0.5 block ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedClient.contactPerson}</span>
                  <span className={`block mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{selectedClient.email}</span>
                </div>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Contract Valuation</span>
                  <span className="font-mono text-[#00c853] font-bold text-sm mt-0.5 block">
                    ₹{selectedClient.contractValue.toLocaleString()}
                  </span>
                  <span className={`block mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{selectedClient.phone}</span>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <span className={`font-semibold block mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Executive Notes &amp; SLA Expectations</span>
                <p className={`p-3 rounded-xl border leading-relaxed italic ${
                  darkMode ? 'bg-slate-900/40 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  "{selectedClient.notes || 'No confidential notes recorded yet.'}"
                </p>
              </div>

              {/* CRM Interaction Log */}
              <div>
                <span className={`font-semibold block mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>Communications &amp; Activity Log</span>
                <div className="space-y-2">
                  {selectedClient.activityHistory.map((act, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border space-y-1 ${
                      darkMode ? 'bg-slate-900/80 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{act.date}</span>
                        <span className="text-[#00c853] font-bold">{act.author}</span>
                      </div>
                      <p className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{act.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`pt-2 flex items-center justify-between border-t ${
                darkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00c853]/15 hover:bg-[#00c853]/25 text-[#00c853] border border-[#00c853]/30 font-bold text-xs transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Formal Estimate / Quote</span>
                </button>

                <button
                  onClick={() => setSelectedClient(null)}
                  className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Generator Modal */}
      {showQuoteModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className={`border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <FileCheck2 className="w-4 h-4 text-[#00c853]" />
                  Issue Estimate / Quote for {selectedClient.companyName}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Formal itemized deliverable pricing</p>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateQuote} className="p-6 space-y-4 text-xs">
              <div className="space-y-2">
                <span className={`font-semibold block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Deliverable Line Items</span>
                {quoteItems.map((item) => (
                  <div key={item.id} className={`grid grid-cols-12 gap-2 p-2.5 rounded-xl border items-center ${
                    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="col-span-7">
                      <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{item.description}</span>
                    </div>
                    <div className={`col-span-2 text-center font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Qty: {item.quantity}
                    </div>
                    <div className={`col-span-3 text-right font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      ₹{item.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className={`block mb-1 font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Payment Terms</label>
                  <input
                    type="text"
                    value={quoteTerms}
                    onChange={(e) => setQuoteTerms(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div className={`p-3.5 rounded-xl border space-y-1 text-right ${
                  darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex justify-between ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span>Subtotal:</span>
                    <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>₹{calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span>GST (18%):</span>
                    <span className={`font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>₹{(calculateSubtotal() * 0.18).toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between text-[#00c853] font-bold text-sm pt-1 border-t ${
                    darkMode ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <span>Total Estimate:</span>
                    <span className="font-mono">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
                >
                  Dispatch Quote &amp; Move to Proposal Sent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Lead Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Building2 className="w-4 h-4 text-[#00c853]" />
                Add Inbound Client Lead
              </h3>
              <button
                onClick={() => setShowAddClientModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="e.g. CyberDefense Ltd."
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Industry</label>
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="e.g. SaaS / Fintech"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Contact Person</label>
                  <input
                    type="text"
                    required
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="e.g. Johnathan Smith"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Contract Valuation (₹)</label>
                  <input
                    type="number"
                    value={newContractVal}
                    onChange={(e) => setNewContractVal(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Website URL</label>
                  <input
                    type="text"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Requirements &amp; Context</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  placeholder="Scope of work requested, target delivery timeframe, etc."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
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
                  Add Lead to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
