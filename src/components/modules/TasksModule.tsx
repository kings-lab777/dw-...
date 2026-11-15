import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InternalTask, TaskStatus, TaskPriority } from '../../types';
import {
  KanbanSquare,
  Plus,
  CheckCircle2,
  Clock,
  Paperclip,
  CheckSquare,
  Square,
  ArrowRight,
  ArrowUpRight,
  Filter,
  Search,
  X,
  AlertTriangle,
  User,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  ExternalLink,
  Send,
  Calendar,
  Layers,
  Sparkles,
  ArrowDownRight
} from 'lucide-react';

export const TasksModule: React.FC = () => {
  const {
    tasks,
    updateTaskStatus,
    toggleTaskChecklist,
    addTask,
    submitTaskWork,
    projects,
    employees,
    freelancers,
    currentUser,
    darkMode,
    showToast,
    setActiveModule
  } = useApp();

  // Filters and views
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'kanban' | 'list' | 'timeline'>('kanban');
  const [selectedTask, setSelectedTask] = useState<InternalTask | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeLaneForCreate, setActiveLaneForCreate] = useState<TaskStatus>('backlog');

  // Deliverable submission state (for QA handover)
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // New Task Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<InternalTask['categoryTag']>('Engineering');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || '');
  const [newAssigneeId, setNewAssigneeId] = useState(currentUser.id);
  const [newDueDate, setNewDueDate] = useState('2026-11-25');
  const [newEstHours, setNewEstHours] = useState('16');

  // Fokys 4-Column Lanes mapping
  const fokysColumns: { id: TaskStatus; label: string; count: number; dotColor: string }[] = [
    {
      id: 'backlog',
      label: 'Scheduled',
      count: tasks.filter((t) => t.status === 'backlog').length,
      dotColor: 'bg-blue-500'
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      count: tasks.filter((t) => t.status === 'in_progress').length,
      dotColor: 'bg-amber-500'
    },
    {
      id: 'qa_ready',
      label: 'Review',
      count: tasks.filter((t) => t.status === 'qa_ready').length,
      dotColor: 'bg-purple-500'
    },
    {
      id: 'done',
      label: 'Completed',
      count: tasks.filter((t) => t.status === 'done').length,
      dotColor: 'bg-[#00c853]'
    }
  ];

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProjectFilter === 'all' || t.projectId === selectedProjectFilter;
    const matchesTeam = selectedTeamFilter === 'all' || t.categoryTag === selectedTeamFilter;
    return matchesSearch && matchesProject && matchesTeam;
  });

  // Metric 1: Priority counts
  const highPriorityCount = tasks.filter((t) => t.priority === 'high' || t.priority === 'critical').length;
  const mediumPriorityCount = tasks.filter((t) => t.priority === 'medium').length;
  const lowPriorityCount = tasks.filter((t) => t.priority === 'low').length;
  const totalTasks = tasks.length || 1;
  const highPct = Math.round((highPriorityCount / totalTasks) * 100);
  const medPct = Math.round((mediumPriorityCount / totalTasks) * 100);
  const lowPct = Math.round((lowPriorityCount / totalTasks) * 100);

  // Metric 2: Status distribution for Donut Chart
  const scheduledCount = tasks.filter((t) => t.status === 'backlog').length;
  const inProgCount = tasks.filter((t) => t.status === 'in_progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'qa_ready').length;
  const completedCount = tasks.filter((t) => t.status === 'done').length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const proj = projects.find((p) => p.id === newProjectId) || projects[0];
    const assignee = employees.find((e) => e.id === newAssigneeId) || currentUser;

    addTask({
      title: newTitle,
      description: newDesc,
      categoryTag: newCategory,
      status: activeLaneForCreate,
      priority: newPriority,
      progressPercent: activeLaneForCreate === 'done' ? 100 : activeLaneForCreate === 'qa_ready' ? 85 : activeLaneForCreate === 'in_progress' ? 40 : 0,
      assigneeId: assignee.id,
      assigneeName: assignee.fullName,
      assigneeAvatar: assignee.avatarUrl,
      assigneeType: 'employee',
      projectId: proj.id,
      projectName: proj.name,
      dueDate: newDueDate,
      estimatedHours: parseFloat(newEstHours) || 8,
      spentHours: 0,
      commentsCount: 2,
      checklist: [
        { id: `c-${Date.now()}-1`, text: 'Scoping & technical brief verification', completed: false },
        { id: `c-${Date.now()}-2`, text: 'Automated test suite & QA validation', completed: false }
      ],
      attachments: []
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleOpenSubmission = (task: InternalTask) => {
    setSelectedTask(task);
    setDeliverableUrl(task.submissionUrl || '');
    setDeliverableNotes(task.submissionNotes || '');
    setShowSubmissionModal(true);
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !deliverableUrl.trim()) {
      showToast('Please provide a valid deliverable preview URL', 'warning');
      return;
    }
    submitTaskWork(selectedTask.id, deliverableUrl.trim(), deliverableNotes.trim());
    setShowSubmissionModal(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. FOKYS TOP ACTION HEADER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule('dashboard')}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            &lt; Back
          </button>
          <div>
            <h1 className={`text-xl md:text-2xl font-black font-display tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Task Overview
            </h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              DigiWorku Kanban engine, sprint velocity &amp; deliverable handoffs
            </p>
          </div>
        </div>

        {/* Action Buttons & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveLaneForCreate('backlog');
              setShowCreateModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>

          <button
            onClick={() => setActiveModule('projects')}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-blue-500" />
            <span>Add Project</span>
          </button>

          <select
            value={selectedProjectFilter}
            onChange={(e) => setSelectedProjectFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={selectedTeamFilter}
            onChange={(e) => setSelectedTeamFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Teams</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Communication">Communication</option>
            <option value="Development">Development</option>
            <option value="Reporting">Reporting</option>
          </select>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FOKYS 4 TOP METRIC CARDS (Exact Replica) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Priority Overview (Vertical Bar Frequency Graph) */}
        <div className={`p-5 rounded-3xl border transition-all duration-200 space-y-3 relative overflow-hidden ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Priority Overview
            </span>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
              <span className={`text-xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{highPriorityCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
              <span className={`text-xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{mediumPriorityCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span className={`text-xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{lowPriorityCount}</span>
              <span className="text-[10px] text-slate-400 font-semibold">Low</span>
            </div>
          </div>

          {/* Fokys Authentic Frequency Vertical-Line Bar Visual */}
          <div className="h-10 flex items-end gap-1 pt-2">
            {/* High priority red lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`h-${i}`} className="w-1.5 rounded-full bg-rose-500" style={{ height: `${20 + (i % 4) * 5}px` }} />
            ))}
            {/* Medium priority amber lines */}
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={`m-${i}`} className="w-1.5 rounded-full bg-amber-400" style={{ height: `${22 + (i % 5) * 4}px` }} />
            ))}
            {/* Low priority emerald lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`l-${i}`} className="w-1.5 rounded-full bg-emerald-400" style={{ height: `${18 + (i % 3) * 6}px` }} />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>{highPct}% High</span>
            <span>{medPct}% Medium</span>
            <span>{lowPct}% Low</span>
          </div>
        </div>

        {/* Metric 2: Progress Status Overview (Donut Chart with Total in center) */}
        <div className={`p-5 rounded-3xl border transition-all duration-200 space-y-3 relative overflow-hidden ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Progress Status Overview
            </span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            {/* SVG Donut */}
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                <circle cx="18" cy="18" r="14" fill="transparent" stroke={darkMode ? '#1e293b' : '#f1f5f9'} strokeWidth="4" />
                {/* Completed (Emerald) */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="31 69" strokeDashoffset="0" />
                {/* Scheduled (Blue) */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="31 69" strokeDashoffset="-31" />
                {/* Review (Purple) */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#a855f7" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-62" />
                {/* In Progress (Amber) */}
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="18 82" strokeDashoffset="-87" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-[10px] text-slate-400 leading-none`}>Total</span>
                <span className={`text-sm font-black font-mono leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{tasks.length}</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-1 text-[11px] font-semibold w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10b981]" /> Completed</span>
                <span className="font-mono font-bold text-slate-400">31%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Scheduled</span>
                <span className="font-mono font-bold text-slate-400">31%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#a855f7]" /> Review</span>
                <span className="font-mono font-bold text-slate-400">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> In Progress</span>
                <span className="font-mono font-bold text-slate-400">18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric 3: Avg. Review Time */}
        <div className={`p-5 rounded-3xl border transition-all duration-200 space-y-2 flex flex-col justify-between ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Avg. Review Time
            </span>
            <span className="text-xs font-bold text-[#00c853] bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> 2.6%
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              2.8
            </span>
            <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              days
            </span>
          </div>

          <div className={`text-[11px] font-semibold text-slate-400 border-t pt-2 ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            -2.6% vs last week turnaround SLA
          </div>
        </div>

        {/* Metric 4: Avg. Completion Time */}
        <div className={`p-5 rounded-3xl border transition-all duration-200 space-y-2 flex flex-col justify-between ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Avg. Completion Time
            </span>
            <span className="text-xs font-bold text-[#00c853] bg-[#00c853]/10 px-2 py-0.5 rounded-full border border-[#00c853]/20 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> 8.7%
            </span>
          </div>

          <div className="flex items-baseline gap-2 pt-1">
            <span className={`text-3xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              4.2
            </span>
            <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              days
            </span>
          </div>

          <div className={`text-[11px] font-semibold text-slate-400 border-t pt-2 ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            -3.4% vs last week milestone velocity
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. FOKYS SEARCH & VIEW SELECTOR BAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className={`p-1 rounded-2xl border flex items-center gap-1 ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setSelectedView('kanban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedView === 'kanban' ? 'bg-blue-600 text-white shadow-xs' : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kanban View
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedView === 'list' ? 'bg-blue-600 text-white shadow-xs' : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List View
            </button>
          </div>

          <button className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            darkMode ? 'bg-[#14171d] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
          }`}>
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FOKYS 4-COLUMN KANBAN BOARD */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {fokysColumns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-3xl p-4 border transition-colors space-y-3 flex flex-col min-h-[580px] ${
                darkMode ? 'bg-[#0f1115] border-slate-800/80' : 'bg-slate-50/70 border-slate-200/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {col.label}
                  </h3>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600 border border-slate-200 shadow-xs'
                  }`}>
                    {colTasks.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveLaneForCreate(col.id);
                    setShowCreateModal(true);
                  }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-slate-400 hover:text-white hover:bg-blue-600 transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800' : 'bg-white border border-slate-200 shadow-xs'
                  }`}
                  title="Add Task to this lane"
                >
                  +
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className={`p-8 text-center text-xs font-medium border-2 border-dashed rounded-2xl ${
                    darkMode ? 'border-slate-800/80 text-slate-600' : 'border-slate-200 text-slate-400'
                  }`}>
                    No tasks in {col.label}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 cursor-pointer group hover:scale-[1.01] ${
                        darkMode
                          ? 'bg-[#14171d] border-slate-800 hover:border-blue-500/50 shadow-sm'
                          : 'bg-white border-slate-200/90 hover:border-blue-500/50 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {/* Category Label with Diagonal Arrow (Fokys signature) */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 group-hover:text-blue-500 transition-colors`}>
                          <span>{task.categoryTag || 'Engineering'}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {task.dueDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                        darkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {task.title}
                      </h4>

                      {/* Progress Bar & Percentage (Fokys signature) */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                          <span>Progress</span>
                          <span className="font-mono text-blue-500">{task.progressPercent}%</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                          darkMode ? 'bg-slate-800' : 'bg-slate-100'
                        }`}>
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              task.progressPercent === 100
                                ? 'bg-[#00c853]'
                                : task.progressPercent >= 70
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                            }`}
                            style={{ width: `${task.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Bottom row: Assignee avatar, comments count, priority badge */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.assigneeAvatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'}
                            alt={task.assigneeName}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            title={task.assigneeName}
                          />
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <MessageSquare className="w-3 h-3" /> {task.commentsCount || 10}
                          </span>
                        </div>

                        {/* Priority Badge */}
                        <div className="flex items-center gap-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              task.priority === 'critical' || task.priority === 'high'
                                ? 'bg-rose-500'
                                : task.priority === 'medium'
                                  ? 'bg-amber-400'
                                  : 'bg-[#00c853]'
                            }`}
                          />
                          <span className={`text-[10px] font-bold capitalize ${
                            task.priority === 'critical' || task.priority === 'high'
                              ? 'text-rose-500'
                              : task.priority === 'medium'
                                ? 'text-amber-500'
                                : 'text-[#00c853]'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. TASK DETAILS MODAL (Checklist, Work Submission & QA Handover) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border transition-all max-h-[90vh] overflow-y-auto space-y-5 ${
            darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-wider">
                  {selectedTask.categoryTag || 'Engineering'} • {selectedTask.projectName}
                </span>
                <h3 className="text-lg font-black mt-1">{selectedTask.title}</h3>
                <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {selectedTask.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subtasks Checklist */}
            <div className="space-y-2 pt-2">
              <span className={`text-xs font-black uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Subtasks &amp; Deliverables Checklist
              </span>
              <div className="space-y-2">
                {selectedTask.checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleTaskChecklist(selectedTask.id, item.id)}
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        item.completed ? 'bg-[#00c853] border-[#00c853] text-white' : 'border-slate-400'
                      }`}>
                        {item.completed && <CheckSquare className="w-3 h-3" />}
                      </div>
                      <span className={item.completed ? 'line-through text-slate-400' : 'font-medium'}>
                        {item.text}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{item.completed ? 'Done' : 'Pending'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Submission / QA Deliverable Handover */}
            <div className={`p-4 rounded-2xl border space-y-2 ${
              darkMode ? 'bg-[#0f1115] border-blue-500/30' : 'bg-blue-50/50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Work Deliverable Handover (QC Gate)
                </span>
                {selectedTask.submissionUrl && (
                  <a
                    href={selectedTask.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View Deliverable <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {selectedTask.submissionUrl
                  ? `Submitted URL: ${selectedTask.submissionUrl} (${selectedTask.submissionNotes || 'No notes'})`
                  : 'Submit completed GitHub PR, Figma design URL, or staging link to hand over this task to the Quality Control Engine.'}
              </p>
              <button
                onClick={() => handleOpenSubmission(selectedTask)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{selectedTask.submissionUrl ? 'Update Submission' : 'Submit Work for QA Review'}</span>
              </button>
            </div>

            {/* Status Switcher & Close */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Move Lane:</span>
                <select
                  value={selectedTask.status}
                  onChange={(e) => {
                    updateTaskStatus(selectedTask.id, e.target.value as any);
                    setSelectedTask({ ...selectedTask, status: e.target.value as any });
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="backlog">Scheduled</option>
                  <option value="in_progress">In Progress</option>
                  <option value="qa_ready">Review / QA Ready</option>
                  <option value="done">Completed</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. DELIVERABLE SUBMISSION MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showSubmissionModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSubmitDeliverable}
            className={`w-full max-w-lg rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <span>Submit Work Deliverable for QA</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmissionModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Deliverable URL (Staging, GitHub PR, Figma)</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/digiworku/... or https://staging.digiworku.in/..."
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Submission Notes &amp; Verification Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe implemented features, tested edge cases, or special QA instructions..."
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmissionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Hand Over to QA Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. CREATE TASK MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateTask}
            className={`w-full max-w-lg rounded-3xl p-6 border transition-all space-y-4 ${
              darkMode ? 'bg-[#14171d] border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black">Create Kanban Task</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Multi-Currency Checkout Gateway"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category Tag</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Communication">Communication</option>
                    <option value="Development">Development</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Finance">Finance</option>
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Associated Project</label>
                  <select
                    value={newProjectId}
                    onChange={(e) => setNewProjectId(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Assignee</label>
                  <select
                    value={newAssigneeId}
                    onChange={(e) => setNewAssigneeId(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.fullName} ({emp.department})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Description &amp; Acceptance Criteria</label>
                <textarea
                  rows={2}
                  placeholder="Task instructions, edge cases, and expected deliverable..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
                    darkMode ? 'bg-[#0f1115] border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
