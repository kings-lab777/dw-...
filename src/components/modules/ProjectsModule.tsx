import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectMilestone } from '../../types';
import {
  FolderGit2,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertTriangle,
  Play,
  ShieldCheck,
  Plus,
  GitBranch,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ProjectsModule: React.FC = () => {
  const { projects, updateMilestoneStatus, setActiveModule, currentRole, darkMode } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const getMilestoneBadge = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'approved_by_client':
        return 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30';
      case 'under_qc':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30';
      case 'in_progress':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30';
      case 'paid':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30';
      default:
        return darkMode ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Project Selector Tab Bar */}
      <div className={`flex items-center gap-2 overflow-x-auto pb-2 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        {projects.map((proj) => {
          const isSelected = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30 shadow-sm'
                  : darkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>{proj.name}</span>
              {proj.status === 'delayed' && (
                <span className="w-2 h-2 rounded-full bg-amber-500" title="Project Delayed" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Project Overview Header */}
      <div className={`rounded-2xl p-6 border transition-colors duration-200 relative overflow-hidden space-y-5 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                {activeProject.code}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  activeProject.status === 'delayed'
                    ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                    : 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                }`}
              >
                {activeProject.status}
              </span>
            </div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activeProject.name}</h2>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Enterprise Client: <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeProject.clientName}</span> • Lead PM: {activeProject.managerName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeProject.stagingUrl && (
              <a
                href={activeProject.stagingUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#00c853]" />
                <span>Staging Sandbox</span>
              </a>
            )}
            <button
              onClick={() => setActiveModule('qc')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c853]/10 hover:bg-[#00c853]/20 text-[#00c853] border border-[#00c853]/30 text-xs font-bold transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Inspect QC Engine</span>
            </button>
          </div>
        </div>

        {/* Project Metrics Summary Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t text-xs ${
          darkMode ? 'border-slate-800/80' : 'border-slate-100'
        }`}>
          <div>
            <span className={`block uppercase text-[10px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Total Budget</span>
            <span className={`font-mono font-bold text-sm mt-0.5 block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              ₹{activeProject.budget.toLocaleString()}
            </span>
          </div>
          <div>
            <span className={`block uppercase text-[10px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Budget Burned</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm mt-0.5 block">
              ₹{activeProject.spent.toLocaleString()}
            </span>
          </div>
          <div>
            <span className={`block uppercase text-[10px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Overall Completion</span>
            <span className="font-mono font-bold text-[#00c853] text-sm mt-0.5 block">
              {activeProject.progress}%
            </span>
          </div>
          <div>
            <span className={`block uppercase text-[10px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Milestone Target</span>
            <span className={`font-mono font-semibold text-xs mt-0.5 block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {activeProject.endDate}
            </span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className={`text-[11px] font-semibold uppercase ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tech Stack:</span>
          {activeProject.techStack.map((tech, idx) => (
            <span
              key={idx}
              className={`text-[10px] px-2 py-0.5 rounded-md border font-mono ${
                darkMode 
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700/60' 
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Milestone Roadmap Schedule */}
      <div className={`rounded-2xl p-6 space-y-4 border transition-colors duration-200 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Milestone Delivery Roadmap</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sequential delivery phases, approval gates &amp; contract payouts</p>
          </div>
        </div>

        <div className="space-y-3">
          {activeProject.milestones.map((ms) => (
            <div
              key={ms.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                darkMode 
                  ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl border text-[#00c853] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  0{ms.orderIndex}
                </div>
                <div>
                  <h4 className={`font-bold text-xs flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {ms.title}
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getMilestoneBadge(ms.status)}`}>
                      {ms.status.replace(/_/g, ' ')}
                    </span>
                  </h4>
                  <div className={`flex items-center gap-3 text-[11px] mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" /> Due: {ms.dueDate}
                    </span>
                    <span className="font-mono text-[#00c853] font-bold">
                      Payout: ₹{ms.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestone Status Advance Action */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={ms.status}
                  onChange={(e) => updateMilestoneStatus(activeProject.id, ms.id, e.target.value as any)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#00c853] transition-colors ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-slate-200 text-slate-900 shadow-sm'
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
    </div>
  );
};
