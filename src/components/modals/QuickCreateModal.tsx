import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserPlus,
  Building,
  FileCheck,
  FolderPlus,
  KanbanSquare,
  Receipt,
  Wallet,
  UserCheck,
  Briefcase
} from 'lucide-react';

interface QuickCreateModalProps {
  isOpen: boolean;
  initialType?: string;
  onClose: () => void;
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  isOpen,
  initialType = 'task',
  onClose
}) => {
  const {
    addTask,
    addClient,
    addProject,
    addExpense,
    createInvoice,
    addEmployee,
    addFreelancer,
    projects,
    currentUser,
    darkMode,
    showToast,
    setActiveModule
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialType || 'task');

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskProjectId, setTaskProjectId] = useState(projects[0]?.id || '');

  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadValue, setLeadValue] = useState('50000');

  const [projectName, setProjectName] = useState('');
  const [projectBudget, setProjectBudget] = useState('150000');
  const [projectClient, setProjectClient] = useState('');

  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('5000');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'task') {
      if (!taskTitle.trim()) return;
      const proj = projects.find((p) => p.id === taskProjectId) || projects[0];
      addTask({
        title: taskTitle.trim(),
        description: taskDesc.trim(),
        categoryTag: 'Engineering',
        status: 'backlog',
        priority: 'medium',
        progressPercent: 0,
        assigneeId: currentUser.id,
        assigneeName: currentUser.fullName,
        assigneeAvatar: currentUser.avatarUrl,
        assigneeType: 'employee',
        projectId: proj?.id || 'proj-01',
        projectName: proj?.name || 'DigiWorku Core Project',
        dueDate: '2026-11-30',
        estimatedHours: 8,
        spentHours: 0,
        commentsCount: 0,
        checklist: [],
        attachments: []
      });
      showToast('⚡ Task created and added to Scheduled lane', 'success');
      setActiveModule('tasks');
    } else if (activeTab === 'lead') {
      if (!leadName.trim()) return;
      addClient({
        companyName: leadCompany || `${leadName}'s Company`,
        industry: 'Digital Services & Tech',
        contactPerson: leadName,
        email: `${leadName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: '+91 98765 43210',
        website: 'https://digiworku.in',
        status: 'new_lead',
        contractValue: parseFloat(leadValue) || 50000,
        healthScore: 85,
        notes: `Interested in DigiWorku digital workforce services. Budget approx ₹${leadValue}`,
        leadSource: 'Website Inquiry',
        requirementSummary: 'Inbound enquiry through quick-create action',
        serviceCategory: 'website_development',
        lastContactDate: new Date().toISOString().split('T')[0]
      });
      showToast('Inbound Lead recorded in CRM pipeline', 'success');
      setActiveModule('leads');
    } else if (activeTab === 'project') {
      if (!projectName.trim()) return;
      addProject({
        name: projectName.trim(),
        code: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
        clientId: 'cli-01',
        clientName: projectClient || 'Enterprise Client',
        serviceCategory: 'website_development',
        managerId: currentUser.id,
        managerName: currentUser.fullName,
        status: 'planning',
        startDate: '2026-11-15',
        endDate: '2026-12-30',
        budget: parseFloat(projectBudget) || 150000,
        estimatedCost: Math.round((parseFloat(projectBudget) || 150000) * 0.45),
        spent: 0,
        currency: 'INR',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        progress: 5,
        milestones: [
          {
            id: `m-${Date.now()}-1`,
            projectId: `proj-${Date.now()}`,
            title: 'Discovery & UX Blueprint',
            orderIndex: 1,
            dueDate: '2026-11-25',
            status: 'in_progress',
            amount: Math.round((parseFloat(projectBudget) || 150000) * 0.3)
          }
        ],
        assignedEmployees: [currentUser.id],
        assignedFreelancers: []
      });
      showToast('New Project initialized with Milestone Stage 1', 'success');
      setActiveModule('projects');
    } else if (activeTab === 'expense') {
      if (!expenseDesc.trim()) return;
      addExpense({
        description: expenseDesc.trim(),
        amount: parseFloat(expenseAmount) || 5000,
        category: 'Infrastructure & Cloud',
        date: new Date().toISOString().split('T')[0]
      });
      showToast('💸 Business Expense recorded in Finance Ledger', 'success');
      setActiveModule('expenses');
    }

    onClose();
  };

  const tabs = [
    { id: 'task', label: 'New Task', icon: KanbanSquare },
    { id: 'lead', label: 'New Lead', icon: UserPlus },
    { id: 'project', label: 'New Project', icon: FolderPlus },
    { id: 'expense', label: 'New Expense', icon: Wallet },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 transition-all ${
        darkMode ? 'bg-[#0f121a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-extrabold tracking-tight">Quick Create Record</h3>
            <p className="text-xs text-slate-400">Instantly generate connected business records</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 my-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreate} className="space-y-4">
          {activeTab === 'task' && (
            <>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Supabase RLS policies"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Assign To Project
                </label>
                <select
                  value={taskProjectId}
                  onChange={(e) => setTaskProjectId(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Instructions for the assigned team member or freelancer..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </>
          )}

          {activeTab === 'lead' && (
            <>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Prospect / Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Khanna"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Khanna Logistics Pvt Ltd"
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Estimated Deal Value (₹ INR)
                </label>
                <input
                  type="number"
                  value={leadValue}
                  onChange={(e) => setLeadValue(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </>
          )}

          {activeTab === 'project' && (
            <>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Telehealth Platform"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apollo Telehealth Ltd"
                  value={projectClient}
                  onChange={(e) => setProjectClient(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Agreed Project Budget (₹ INR)
                </label>
                <input
                  type="number"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </>
          )}

          {activeTab === 'expense' && (
            <>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Expense Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Production EC2 Server & S3 Storage"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Amount in INR (₹)
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
            </>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
