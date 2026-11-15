import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectMilestone, ProjectStatus, ServiceCategoryKey } from '../../types';
import {
  FolderGit2,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertTriangle,
  Play,
  ShieldCheck,
  Plus,
  GitBranch,
  Layers,
  ChevronRight,
  TrendingUp,
  FileText,
  UserCheck,
  Send,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProjectsModule: React.FC = () => {
  const {
    projects,
    updateMilestoneStatus,
    updateProject,
    addProject,
    addMilestone,
    services,
    employees,
    freelancers,
    setActiveModule,
    currentRole,
    darkMode,
    showToast,
    createInvoice
  } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);

  // New Project Form
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<ServiceCategoryKey>('website_development');
  const [newProjectBudget, setNewProjectBudget] = useState('1850000');
  const [newProjectManagerId, setNewProjectManagerId] = useState(employees[0]?.id || '');
  const [newProjectStartDate, setNewProjectStartDate] = useState('2026-11-20');
  const [newProjectEndDate, setNewProjectEndDate] = useState('2026-12-30');

  // New Milestone Form
  const [newMsTitle, setNewMsTitle] = useState('');
  const [newMsAmount, setNewMsAmount] = useState('450000');
  const [newMsDueDate, setNewMsDueDate] = useState('2026-12-15');

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const lifecycleStages: { id: ProjectStatus; label: string }[] = [
    { id: 'draft', label: 'Draft' },
    { id: 'quoted', label: 'Quoted' },
    { id: 'awaiting_approval', label: 'Awaiting Approval' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'planning', label: 'Planning' },
    { id: 'active', label: 'In Progress' },
    { id: 'internal_qc', label: 'Internal QC' },
    { id: 'client_review', label: 'Client Review' },
    { id: 'revision', label: 'Revision' },
    { id: 'approved', label: 'Approved' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'completed', label: 'Completed' }
  ];

  const getLifecycleStageIndex = (status: ProjectStatus): number => {
    const idx = lifecycleStages.findIndex((s) => s.id === status);
    return idx === -1 ? 5 : idx;
  };

  const currentStageIndex = getLifecycleStageIndex(activeProject.status);

  // Profitability calculations
  const grossProfit = activeProject.budget - activeProject.spent;
  const grossMargin = activeProject.budget > 0 ? Math.round((grossProfit / activeProject.budget) * 100) : 0;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const mgr = employees.find((e) => e.id === newProjectManagerId) || employees[0];
    const budgetNum = parseFloat(newProjectBudget) || 100000;

    addProject({
      name: newProjectName,
      code: `DW-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: `cli-${Date.now()}`,
      clientName: newProjectClient || 'Corporate Client',
      serviceCategory: newProjectCategory,
      managerId: mgr.id,
      managerName: mgr.fullName,
      status: 'confirmed',
      startDate: newProjectStartDate,
      endDate: newProjectEndDate,
      budget: budgetNum,
      estimatedCost: Math.round(budgetNum * 0.45),
      spent: 0,
      currency: 'INR',
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      progress: 0,
      riskFactor: 'low',
      daysDelayed: 0,
      assignedEmployees: [mgr.id],
      assignedFreelancers: [],
      deliveryAuthorized: false,
      milestones: [
        {
          id: `ms-${Date.now()}-1`,
          projectId: `proj-new`,
          title: 'Discovery, Technical Scoping & Design Prototype',
          orderIndex: 1,
          dueDate: newProjectStartDate,
          status: 'pending',
          amount: Math.round(budgetNum * 0.4)
        },
        {
          id: `ms-${Date.now()}-2`,
          projectId: `proj-new`,
          title: 'Core Development & API Integrations',
          orderIndex: 2,
          dueDate: newProjectEndDate,
          status: 'pending',
          amount: Math.round(budgetNum * 0.6)
        }
      ]
    });

    setShowCreateProjectModal(false);
    setNewProjectName('');
    setNewProjectClient('');
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsTitle.trim()) return;

    addMilestone(activeProject.id, {
      title: newMsTitle,
      orderIndex: activeProject.milestones.length + 1,
      dueDate: newMsDueDate,
      status: 'pending',
      amount: parseFloat(newMsAmount) || 100000
    });

    setShowAddMilestoneModal(false);
    setNewMsTitle('');
  };

  const handleGenerateInvoiceFromProject = () => {
    createInvoice({
      invoiceNumber: `DW-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: activeProject.clientId,
      clientName: activeProject.clientName,
      projectId: activeProject.id,
      projectName: activeProject.name,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal: activeProject.budget,
      taxAmount: Math.round(activeProject.budget * 0.18),
      totalAmount: Math.round(activeProject.budget * 1.18),
      status: 'sent'
    });
    setActiveModule('finance');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER & PROJECT SELECTOR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Project Management Engine
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            End-to-end client-to-delivery lifecycle, milestones, budget profitability &amp; QA handoffs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateProjectModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>

          <button
            onClick={() => setActiveModule('qc')}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-[#00c853]' : 'bg-white border-slate-200 text-[#00c853] shadow-xs'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>QC Inspection Gate</span>
          </button>
        </div>
      </div>

      {/* Project Selector Horizontal Tabs */}
      <div className={`flex items-center gap-2 overflow-x-auto pb-2 border-b ${
        darkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        {projects.map((proj) => {
          const isSelected = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : darkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>{proj.name}</span>
              {proj.status === 'delayed' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Project Delayed" />
              )}
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. PROJECT OVERVIEW CARD & PROFITABILITY BADGE */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 relative overflow-hidden space-y-6 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md font-bold ${
                darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                {activeProject.code}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-wider">
                {activeProject.serviceCategory?.replace(/_/g, ' ') || 'Website Development'}
              </span>
              <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                activeProject.status === 'delayed'
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                  : activeProject.status === 'completed' || activeProject.status === 'approved'
                    ? 'bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30'
                    : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}>
                {activeProject.status.replace(/_/g, ' ')}
              </span>
            </div>

            <h2 className={`text-2xl font-black font-display tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeProject.name}
            </h2>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Client: <span className="font-bold text-slate-800 dark:text-slate-200">{activeProject.clientName}</span> • Project Lead: <span className="font-bold">{activeProject.managerName}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {activeProject.stagingUrl && (
              <a
                href={activeProject.stagingUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors ${
                  darkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white' : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-900'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                <span>Staging Sandbox</span>
              </a>
            )}

            <button
              onClick={handleGenerateInvoiceFromProject}
              className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Issue Invoice (₹)</span>
            </button>
          </div>
        </div>

        {/* 12-Stage Lifecycle Stepper */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>Project Lifecycle Progression</span>
            <span className="text-blue-500 font-mono">Stage {currentStageIndex + 1} of {lifecycleStages.length}</span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-1">
            {lifecycleStages.map((stage, idx) => {
              const isPassed = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    updateProject({ ...activeProject, status: stage.id });
                    showToast(`Project stage set to: ${stage.label}`, 'info');
                  }}
                  className={`p-1.5 rounded-xl text-center border text-[9px] font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : isPassed
                        ? 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/30'
                        : darkMode
                          ? 'bg-[#0f1115] text-slate-500 border-slate-800'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                  title={`Click to set stage to ${stage.label}`}
                >
                  <div className="truncate">{stage.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Profitability & Workload Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Agreed Budget</span>
            <div className={`text-xl font-black font-mono mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{(activeProject.budget / 100000).toFixed(2)}L
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Agreed Client Revenue</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Actual Cost Spent</span>
            <div className="text-xl font-black font-mono mt-1 text-amber-500">
              ₹{(activeProject.spent / 100000).toFixed(2)}L
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Staff + Freelancers + Tools</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Projected Net Margin</span>
            <div className="text-xl font-black font-mono mt-1 text-[#00c853]">
              {grossMargin}%
            </div>
            <span className="text-[10px] text-[#00c853] font-bold">₹{(grossProfit / 100000).toFixed(2)}L Net Profit</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Delivery SLA Status</span>
            <div className="text-xl font-black font-mono mt-1 text-blue-500">
              {activeProject.progress}%
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">Target: {activeProject.endDate}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. MILESTONE ROADMAP & APPROVAL GATES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className={`p-6 rounded-3xl border transition-all duration-200 space-y-4 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className={`text-base font-black font-display ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Milestone Delivery Roadmap &amp; Payout Gates
            </h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Every milestone links directly to client contract deliverables, QA approvals and payment schedules
            </p>
          </div>

          <button
            onClick={() => setShowAddMilestoneModal(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="space-y-3">
          {activeProject.milestones.map((ms) => (
            <div
              key={ms.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                darkMode ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{ms.orderIndex}
                </div>
                <div>
                  <h4 className={`text-xs font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {ms.title}
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      ms.status === 'approved_by_client' || ms.status === 'paid'
                        ? 'bg-[#00c853]/10 text-[#00c853]'
                        : ms.status === 'under_qc'
                          ? 'bg-purple-500/10 text-purple-600'
                          : 'bg-amber-500/10 text-amber-600'
                    }`}>
                      {ms.status.replace(/_/g, ' ')}
                    </span>
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" /> Due: {ms.dueDate}
                    </span>
                    <span className="font-mono text-[#00c853] font-bold">
                      Payout: ₹{ms.amount.toLocaleString('en-IN')}
                    </span>
                    {ms.deliverableUrl && (
                      <a href={ms.deliverableUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                        Preview <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Advance Milestone Status */}
              <div className="flex items-center gap-2">
                <select
                  value={ms.status}
                  onChange={(e) => updateMilestoneStatus(activeProject.id, ms.id, e.target.value as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="under_qc">Under QC</option>
                  <option value="approved_by_client">Approved by Client</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. MODALS (CREATE PROJECT & ADD MILESTONE) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showCreateProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateProject}
            className={`w-full max-w-lg rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Initialize New DigiWorku Project</h3>
              <button
                type="button"
                onClick={() => setShowCreateProjectModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fintech Mobile App Redesign"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Technologies"
                    value={newProjectClient}
                    onChange={(e) => setNewProjectClient(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Service Category</label>
                  <select
                    value={newProjectCategory}
                    onChange={(e) => setNewProjectCategory(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.category}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Agreed Budget (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={newProjectBudget}
                    onChange={(e) => setNewProjectBudget(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Assigned Project Manager</label>
                  <select
                    value={newProjectManagerId}
                    onChange={(e) => setNewProjectManagerId(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateProjectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {showAddMilestoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddMilestone}
            className={`w-full max-w-md rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Add Milestone</h3>
              <button
                type="button"
                onClick={() => setShowAddMilestoneModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staging QA & Security Penetration Testing"
                  value={newMsTitle}
                  onChange={(e) => setNewMsTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Payout Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={newMsAmount}
                    onChange={(e) => setNewMsAmount(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Target Due Date</label>
                  <input
                    type="date"
                    required
                    value={newMsDueDate}
                    onChange={(e) => setNewMsDueDate(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddMilestoneModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
