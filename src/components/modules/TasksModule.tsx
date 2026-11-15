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
  Filter,
  Search,
  X,
  AlertTriangle,
  User,
  ShieldCheck
} from 'lucide-react';

export const TasksModule: React.FC = () => {
  const { tasks, updateTaskStatus, toggleTaskChecklist, addTask, projects, employees, currentUser, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<InternalTask | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Task Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || '');
  const [newAssigneeId, setNewAssigneeId] = useState(currentUser.id);
  const [newDueDate, setNewDueDate] = useState('2026-11-20');
  const [newEstHours, setNewEstHours] = useState('16');

  const lanes: { id: TaskStatus; label: string }[] = [
    { id: 'backlog', label: 'Backlog' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'qa_ready', label: 'QA Ready' },
    { id: 'done', label: 'Done' }
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || t.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default:
        return darkMode 
          ? 'bg-slate-700/40 text-slate-300 border-slate-600' 
          : 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const proj = projects.find((p) => p.id === newProjectId) || projects[0];
    const assignee = employees.find((e) => e.id === newAssigneeId) || currentUser;

    addTask({
      title: newTitle,
      description: newDesc,
      status: 'backlog',
      priority: newPriority,
      assigneeId: assignee.id,
      assigneeName: assignee.fullName,
      assigneeAvatar: assignee.avatarUrl,
      projectId: proj.id,
      projectName: proj.name,
      dueDate: newDueDate,
      estimatedHours: parseFloat(newEstHours) || 8,
      spentHours: 0,
      checklist: [
        { id: `c-${Date.now()}-1`, text: 'Initial design review and architectural scoping', completed: false },
        { id: `c-${Date.now()}-2`, text: 'Write automated unit & integration test coverage', completed: false }
      ],
      attachments: []
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
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
              placeholder="Search tasks, assignees, or projects..."
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
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all shadow-md shadow-[#00c853]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Kanban Task</span>
        </button>
      </div>

      {/* 4-Lane Interactive Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {lanes.map((lane) => {
          const laneTasks = filteredTasks.filter((t) => t.status === lane.id);

          return (
            <div
              key={lane.id}
              className={`rounded-2xl border p-3.5 space-y-3 min-h-[520px] flex flex-col justify-start transition-colors duration-200 ${
                darkMode
                  ? 'border-slate-800 bg-[#14171d]/90'
                  : 'border-slate-200/90 bg-slate-100/60 shadow-sm'
              }`}
            >
              {/* Lane Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-xs uppercase tracking-wider ${
                    darkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {lane.label}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                  }`}>
                    {laneTasks.length}
                  </span>
                </div>
              </div>

              {/* Tasks in Lane */}
              <div className="space-y-3 flex-1">
                {laneTasks.map((task) => {
                  const completedChecklist = task.checklist.filter((c) => c.completed).length;
                  const totalChecklist = task.checklist.length;

                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all group space-y-3 ${
                        darkMode
                          ? 'bg-[#0f1115] hover:bg-[#151922] border-slate-800 hover:border-slate-700 shadow-md'
                          : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      {/* Priority Tag & Task ID */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`text-[10px] font-mono font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {task.id}
                        </span>
                      </div>

                      {/* Title & Project Name */}
                      <div>
                        <h4 className={`text-xs font-bold transition-colors line-clamp-2 ${
                          darkMode ? 'text-white group-hover:text-[#00c853]' : 'text-slate-900 group-hover:text-[#00c853]'
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-[#00c853] font-bold truncate mt-0.5">
                          {task.projectName}
                        </p>
                      </div>

                      {/* Checklist & Hours Meta */}
                      <div className={`flex items-center justify-between text-[11px] pt-1 border-t ${
                        darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}>
                        {totalChecklist > 0 ? (
                          <span className="flex items-center gap-1 font-mono">
                            <CheckSquare className="w-3 h-3 text-slate-400" />
                            {completedChecklist}/{totalChecklist}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">No checklist</span>
                        )}

                        <span className={`flex items-center gap-1 font-mono font-semibold ${
                          darkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.spentHours}h / {task.estimatedHours}h
                        </span>
                      </div>

                      {/* Assignee & Fast Lane Advance */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          {task.assigneeAvatar ? (
                            <img
                              src={task.assigneeAvatar}
                              alt={task.assigneeName}
                              className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                              <User className="w-3 h-3 text-slate-400" />
                            </div>
                          )}
                          <span className={`text-[11px] truncate max-w-[90px] font-medium ${
                            darkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {task.assigneeName.split(' ')[0]}
                          </span>
                        </div>

                        {/* Quick Advance Button */}
                        {lane.id !== 'done' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus: TaskStatus =
                                lane.id === 'backlog'
                                  ? 'in_progress'
                                  : lane.id === 'in_progress'
                                  ? 'qa_ready'
                                  : 'done';
                              updateTaskStatus(task.id, nextStatus);
                            }}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              darkMode
                                ? 'bg-slate-800 hover:bg-[#00c853] hover:text-white text-slate-400'
                                : 'bg-slate-100 hover:bg-[#00c853] hover:text-white text-slate-600'
                            }`}
                            title="Advance to next workflow lane"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {laneTasks.length === 0 && (
                  <div className={`py-12 text-center text-xs border border-dashed rounded-xl ${
                    darkMode ? 'text-slate-600 border-slate-800/80' : 'text-slate-400 border-slate-200'
                  }`}>
                    No tasks in {lane.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Drawer Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className={`border rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityBadge(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
                <span className={`font-mono text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {selectedTask.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div>
                <h3 className={`text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedTask.title}</h3>
                <p className="text-xs text-[#00c853] font-bold">Project: {selectedTask.projectName}</p>
                <p className={`text-xs mt-2 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedTask.description}
                </p>
              </div>

              {/* Status Switcher */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Workflow Lane Status:</span>
                <div className="flex items-center gap-1.5">
                  {(['backlog', 'in_progress', 'qa_ready', 'done'] as TaskStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateTaskStatus(selectedTask.id, st);
                        setSelectedTask({ ...selectedTask, status: st });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                        selectedTask.status === st
                          ? 'bg-[#00c853] text-white shadow-sm shadow-[#00c853]/20'
                          : darkMode 
                            ? 'bg-slate-800 text-slate-400 hover:text-white' 
                            : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                <div className={`flex items-center justify-between text-xs font-semibold ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>Subtask Checklist</span>
                  <span className="font-mono text-[#00c853] text-[11px] font-bold">
                    {selectedTask.checklist.filter((c) => c.completed).length} / {selectedTask.checklist.length} Completed
                  </span>
                </div>

                <div className="space-y-1.5">
                  {selectedTask.checklist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleTaskChecklist(selectedTask.id, item.id)}
                      className={`w-full text-left p-2.5 rounded-xl border flex items-start gap-2.5 text-xs transition-colors cursor-pointer ${
                        darkMode 
                          ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#00c853] shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className={item.completed ? 'line-through text-slate-400' : darkMode ? 'text-slate-200' : 'text-slate-800'}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meta Grid: Assignee, Due Date, Spent Hours */}
              <div className={`grid grid-cols-2 gap-3 text-xs p-3.5 rounded-xl border ${
                darkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Assignee</span>
                  <span className={`font-semibold mt-0.5 block ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedTask.assigneeName}</span>
                </div>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Target Deadline</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold mt-0.5 block">{selectedTask.dueDate}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedTask(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <KanbanSquare className="w-4 h-4 text-[#00c853]" />
                Create New Kanban Task
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  placeholder="e.g. Implement WebAuthn Passkeys"
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Project Alignment</label>
                <select
                  value={newProjectId}
                  onChange={(e) => setNewProjectId(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Assignee</label>
                  <select
                    value={newAssigneeId}
                    onChange={(e) => setNewAssigneeId(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName} ({e.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Target Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Est. Hours</label>
                  <input
                    type="number"
                    value={newEstHours}
                    onChange={(e) => setNewEstHours(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                      darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Task Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  placeholder="Technical acceptance criteria and deliverable specs..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
