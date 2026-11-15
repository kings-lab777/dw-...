import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Freelancer } from '../../types';
import {
  UserCheck,
  Star,
  DollarSign,
  ExternalLink,
  ShieldCheck,
  Search,
  Briefcase,
  FolderGit2,
  CheckCircle2,
  Clock,
  Plus,
  X
} from 'lucide-react';

export const FreelancersModule: React.FC = () => {
  const { freelancers, updateFreelancerStatus, projects, showToast, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [allocateModalFl, setAllocateModalFl] = useState<Freelancer | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');

  const domains = ['All', 'Product Design & Design Systems', 'Mobile Engineering (Android/iOS)', 'DevOps & Site Reliability'];

  const filteredFreelancers = freelancers.filter((fl) => {
    const matchesSearch =
      fl.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fl.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      fl.skillDomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || fl.skillDomain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocateModalFl) return;
    const proj = projects.find((p) => p.id === selectedProjectId);
    showToast(`Allocated ${allocateModalFl.fullName} to project: ${proj?.name || 'Selected Project'}!`, 'success');
    setAllocateModalFl(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search talent by skills, domain, name..."
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
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-300' 
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className={`flex items-center gap-2 text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span className="w-2 h-2 rounded-full bg-[#00c853]" />
          <span>{freelancers.filter((f) => f.status === 'available').length} Contractors Available Now</span>
        </div>
      </div>

      {/* Freelancers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFreelancers.map((fl) => (
          <div
            key={fl.id}
            className={`rounded-2xl p-5 space-y-4 border transition-all flex flex-col justify-between ${
              darkMode 
                ? 'bg-[#14171d] border-slate-800 hover:border-slate-700 shadow-xl' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={fl.avatarUrl}
                      alt={fl.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                        darkMode ? 'border-[#14171d]' : 'border-white'
                      } ${
                        fl.status === 'available'
                          ? 'bg-[#00c853]'
                          : fl.status === 'busy'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold flex items-center gap-1.5 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {fl.fullName}
                      {fl.kycVerified && (
                        <span title="KYC & Skill Verified">
                          <ShieldCheck className="w-4 h-4 text-[#00c853] shrink-0" />
                        </span>
                      )}
                    </h3>
                    <p className={`text-xs line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{fl.skillDomain}</p>
                    <div className="flex items-center gap-1 mt-0.5 text-amber-500 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{fl.rating}</span>
                      <span className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>({fl.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <select
                  value={fl.status}
                  onChange={(e) => updateFreelancerStatus(fl.id, e.target.value as any)}
                  className={`px-2 py-1 rounded-lg border text-[10px] font-bold focus:outline-none ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-800 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {fl.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                      darkMode 
                        ? 'bg-slate-800/80 text-slate-300 border-slate-700/60' 
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Rates & Financial Summary */}
              <div className={`grid grid-cols-2 gap-3 p-3 rounded-xl border text-xs mb-3 ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Hourly Rate</span>
                  <span className="font-mono font-bold text-[#00c853] text-sm mt-0.5 block">
                    ₹{(fl.hourlyRate * 80).toLocaleString()} / hr
                  </span>
                </div>
                <div>
                  <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>DigiWorku Earned</span>
                  <span className={`font-mono font-bold text-sm mt-0.5 block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    ₹{(fl.totalEarned * 80).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Portfolio Link */}
              <a
                href={fl.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#00c853] hover:underline flex items-center gap-1 font-bold transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View Verified Portfolio &amp; Case Studies</span>
              </a>
            </div>

            {/* Allocate Action */}
            <div className={`pt-3 border-t ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
              <button
                onClick={() => setAllocateModalFl(fl)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-[#00c853] hover:text-white text-slate-200' 
                    : 'bg-slate-100 hover:bg-[#00c853] hover:text-white text-slate-800'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Allocate to Project</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Allocate Project Modal */}
      {allocateModalFl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <UserCheck className="w-4 h-4 text-[#00c853]" />
                Allocate {allocateModalFl.fullName}
              </h3>
              <button
                onClick={() => setAllocateModalFl(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAllocate} className="p-6 space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Target Project</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
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

              <div className={`p-3 rounded-xl border space-y-1 ${
                darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="flex justify-between">
                  <span>Contractor Rate:</span>
                  <span className="font-mono text-[#00c853] font-bold">₹{(allocateModalFl.hourlyRate * 80).toLocaleString()}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Skill Domain:</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{allocateModalFl.skillDomain}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAllocateModalFl(null)}
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
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
