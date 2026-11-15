import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Freelancer, InternalTask } from '../../types';
import {
  UserCheck,
  Star,
  ExternalLink,
  ShieldCheck,
  Search,
  Briefcase,
  CheckCircle2,
  Clock,
  Plus,
  X,
  UploadCloud,
  AlertTriangle,
  IndianRupee,
  Smartphone,
  Eye,
  Send,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const FreelancersModule: React.FC = () => {
  const {
    freelancers,
    updateFreelancerStatus,
    projects,
    tasks,
    freelancerPayouts,
    submitTaskWork,
    showToast,
    darkMode
  } = useApp();

  // Mode: Agency Operations vs Freelancer Self-Service Portal
  const [activeTab, setActiveTab] = useState<'manager' | 'portal'>('manager');
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string>(freelancers[0]?.id || '');

  // Agency View State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [allocateModalFl, setAllocateModalFl] = useState<Freelancer | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [agreedFee, setAgreedFee] = useState('35000');

  // Contractor Self-Service State
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState<InternalTask | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const currentContractor = freelancers.find((f) => f.id === selectedFreelancerId) || freelancers[0];

  const domains = [
    'All',
    'Product Design & Design Systems',
    'Mobile Engineering (Android/iOS)',
    'DevOps & Site Reliability',
    'Technical SEO & Content',
    'Full-Stack Web Development',
    '3D & Motion Graphics'
  ];

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
    showToast(
      `Allocated ${allocateModalFl.fullName} to project "${proj?.name || 'Selected Project'}" at ₹${Number(agreedFee).toLocaleString('en-IN')}`,
      'success'
    );
    setAllocateModalFl(null);
  };

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForSubmission) return;
    if (!submissionUrl.trim()) {
      showToast('Please provide a live deliverable URL (Figma/Drive/GitHub PR)', 'warning');
      return;
    }
    submitTaskWork(selectedTaskForSubmission.id, submissionUrl, submissionNotes);
    showToast(`Deliverable submitted for QC review: "${selectedTaskForSubmission.title}"`, 'success');
    setSelectedTaskForSubmission(null);
    setSubmissionUrl('');
    setSubmissionNotes('');
  };

  // Find contractor's assigned tasks (matching contractor name or department)
  const contractorTasks = tasks.filter(
    (t) =>
      (t.assignedTo || [t.assigneeName]).some((name: string) =>
        name.toLowerCase().includes(currentContractor.fullName.split(' ')[0].toLowerCase())
      ) ||
      (t.categoryTag || '').toLowerCase().includes(currentContractor.skillDomain.split(' ')[0].toLowerCase())
  );

  const contractorPayouts = freelancerPayouts.filter(
    (p) => p.freelancerId === currentContractor.id || p.freelancerName === currentContractor.fullName
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Module Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Freelance Workforce & Talent Operations
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] font-bold border border-[#00c853]/30">
              India Network • ₹ INR Standard
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage external domain specialists, task allocations, and contractor self-service delivery portals
          </p>
        </div>

        {/* View Switcher */}
        <div className={`p-1 rounded-xl border flex items-center gap-1 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('manager')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'manager'
                ? 'bg-[#00c853] text-white shadow-sm'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Talent Directory ({freelancers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'portal'
                ? 'bg-[#00c853] text-white shadow-sm'
                : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Freelancer Portal (Self-Service)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: AGENCY TALENT DIRECTORY (MANAGER VIEW) */}
      {/* ========================================================================= */}
      {activeTab === 'manager' && (
        <div className="space-y-6">
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
              <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
              <span>{freelancers.filter((f) => f.status === 'available').length} Available for Active Sprints</span>
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
                        <h3 className={`text-sm font-bold flex items-center gap-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {fl.fullName}
                          {fl.kycVerified && (
                            <span title="KYC & Skill Verified by DigiWorku">
                              <ShieldCheck className="w-4 h-4 text-[#00c853] shrink-0" />
                            </span>
                          )}
                        </h3>
                        <p className={`text-xs line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{fl.skillDomain}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-amber-500 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{fl.rating}</span>
                          <span className={`text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            ({fl.reviewsCount} reviews)
                          </span>
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
                      <option value="busy">Busy (In Sprint)</option>
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
                      <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Hourly / Sprint Rate
                      </span>
                      <span className="font-mono font-bold text-[#00c853] text-sm mt-0.5 block">
                        ₹{fl.hourlyRate.toLocaleString('en-IN')} / hr
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Total Disbursed (INR)
                      </span>
                      <span className={`font-mono font-bold text-sm mt-0.5 block ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        ₹{fl.totalEarned.toLocaleString('en-IN')}
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
                    <span>View Verified Case Studies &amp; Dribbble/GitHub</span>
                  </a>
                </div>

                {/* Allocate Action & Portal Shortcut */}
                <div className={`pt-3 border-t flex items-center gap-2 ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                  <button
                    onClick={() => {
                      setSelectedFreelancerId(fl.id);
                      setActiveTab('portal');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Portal</span>
                  </button>
                  <button
                    onClick={() => setAllocateModalFl(fl)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00c853]/20 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Allocate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FREELANCER SELF-SERVICE PORTAL */}
      {/* ========================================================================= */}
      {activeTab === 'portal' && (
        <div className="space-y-6">
          {/* Active Contractor Identity Switcher */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <img
                src={currentContractor.avatarUrl}
                alt={currentContractor.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-[#00c853]/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentContractor.fullName}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] font-bold border border-[#00c853]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> KYC Verified Contractor
                  </span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentContractor.skillDomain} • DigiWorku ID: DW-CONT-{currentContractor.id.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Switch Contractor:</span>
              <select
                value={selectedFreelancerId}
                onChange={(e) => setSelectedFreelancerId(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                  darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                {freelancers.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.fullName} ({f.skillDomain.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contractor Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Total Earned to Date
              </span>
              <div className="text-2xl font-black text-[#00c853] font-mono mt-1">
                ₹{currentContractor.totalEarned.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Transferred directly to registered bank account via UPI / NEFT</span>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Pending / Processing Payouts
              </span>
              <div className="text-2xl font-black text-amber-500 font-mono mt-1">
                ₹{contractorPayouts
                  .filter((p) => p.status !== 'paid')
                  .reduce((acc, p) => acc + p.amount, 0)
                  .toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Released immediately upon QA verification passing</span>
            </div>

            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wider block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Client Satisfaction Score
              </span>
              <div className="text-2xl font-black text-[#00c853] font-mono mt-1 flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-current text-amber-400" />
                <span>{currentContractor.rating} / 5.0</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Based on {currentContractor.reviewsCount} completed sprint milestones</span>
            </div>
          </div>

          {/* Assigned Tasks & Deliverable Submissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <Layers className="w-4 h-4 text-[#00c853]" />
                Assigned Sprint Deliverables &amp; Work Tasks
              </h3>
              <span className="text-xs text-[#00c853] font-semibold font-mono">
                {contractorTasks.length} Active Tasks
              </span>
            </div>

            {contractorTasks.length === 0 ? (
              <div className={`p-8 rounded-2xl border text-center ${darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'}`}>
                <CheckCircle2 className="w-8 h-8 text-[#00c853] mx-auto mb-2" />
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>All Tasks Completed!</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  No pending deliverables assigned. You will be notified when new sprints are allocated.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractorTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-2xl p-5 border space-y-3 transition-all ${
                      darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20">
                          {t.categoryTag}
                        </span>
                        <h4 className={`text-sm font-bold mt-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.title}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        t.qcReviewStatus === 'approved'
                          ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                          : t.qcReviewStatus === 'in_review'
                          ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                          : t.qcReviewStatus === 'revision_requested'
                          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                          : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.qcReviewStatus ? t.qcReviewStatus.replace('_', ' ') : t.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.description}
                    </p>

                    {/* Revision Feedback Alert if any */}
                    {t.qcReviewStatus === 'revision_requested' && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>QA Auditor Revision Notes:</span>
                        </div>
                        <p className="text-[11px] leading-relaxed pl-5">
                          {t.submissionNotes || 'Please adjust the mobile checkout spacing and verify dark mode contrast before resubmitting.'}
                        </p>
                      </div>
                    )}

                    {/* Deliverable URL preview if submitted */}
                    {t.submissionUrl && (
                      <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-1.5 truncate">
                          <ExternalLink className="w-3.5 h-3.5 text-[#00c853] shrink-0" />
                          <span className="truncate text-slate-400 font-mono text-[11px]">{t.submissionUrl}</span>
                        </div>
                        <span className="text-[10px] text-[#00c853] font-bold shrink-0">Submitted</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`pt-3 border-t flex items-center justify-between ${
                      darkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Due: {t.dueDate}</span>
                      </div>

                      <button
                        onClick={() => setSelectedTaskForSubmission(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          t.qcReviewStatus === 'revision_requested'
                            ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20'
                            : t.submissionUrl
                            ? darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-[#00c853] hover:bg-[#00af48] text-white shadow-md shadow-[#00c853]/20'
                        }`}
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{t.submissionUrl ? 'Update Deliverable' : 'Submit Work for QC'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contractor Payouts History */}
          <div className={`rounded-2xl p-5 border space-y-4 ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <IndianRupee className="w-4 h-4 text-[#00c853]" />
              Disbursement &amp; Payout Records (INR ₹)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="pb-3 font-semibold">Project &amp; Milestone</th>
                    <th className="pb-3 font-semibold">Agreed Fee</th>
                    <th className="pb-3 font-semibold">Payment Status</th>
                    <th className="pb-3 font-semibold">Scheduled Date</th>
                    <th className="pb-3 font-semibold">UTR / Transaction Ref</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                  {contractorPayouts.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3">
                        <span className={`font-bold block ${darkMode ? 'text-white' : 'text-slate-900'}`}>{p.projectName}</span>
                        <span className="text-[10px] text-slate-400">{p.taskTitle || 'Contract Milestone'}</span>
                      </td>
                      <td className="py-3 font-mono font-bold text-[#00c853]">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          p.status === 'paid'
                            ? 'bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30'
                            : p.status === 'processing'
                            ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                            : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{p.dueOn}</td>
                      <td className="py-3 font-mono text-[11px] text-slate-400">
                        {p.paymentReference || 'Pending QC Release'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: SUBMIT WORK DELIVERABLE MODAL */}
      {/* ========================================================================= */}
      {selectedTaskForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ${
            darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-5 border-b flex items-center justify-between ${
              darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <UploadCloud className="w-4 h-4 text-[#00c853]" />
                Submit Deliverable for QC Audit
              </h3>
              <button
                onClick={() => setSelectedTaskForSubmission(null)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeliverableSubmit} className="p-6 space-y-4 text-xs">
              <div className={`p-3 rounded-xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-[10px] font-semibold uppercase block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Task Title</span>
                <span className={`font-bold block text-sm mt-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedTaskForSubmission.title}
                </span>
                <span className="text-[11px] text-[#00c853] font-mono mt-1 block">
                  Category: {selectedTaskForSubmission.categoryTag}
                </span>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Live Deliverable URL (Figma / GitHub PR / Drive / Staging Link) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/digiworku/repo/pull/42 or Figma link"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Completion &amp; Handover Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail test coverage, responsive viewport checks, or key additions made..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForSubmission(null)}
                  className={`px-4 py-2 rounded-xl font-medium cursor-pointer ${
                    darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold shadow-md shadow-[#00c853]/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to QC Queue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ALLOCATE CONTRACTOR TO PROJECT */}
      {/* ========================================================================= */}
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
                <X className="w-4 h-4" />
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

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Agreed Milestone Payout (INR ₹)
                </label>
                <input
                  type="number"
                  value={agreedFee}
                  onChange={(e) => setAgreedFee(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-[#00c853] font-mono ${
                    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className={`p-3 rounded-xl border space-y-1 ${
                darkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="flex justify-between">
                  <span>Contractor Standard Rate:</span>
                  <span className="font-mono text-[#00c853] font-bold">₹{allocateModalFl.hourlyRate.toLocaleString('en-IN')}/hr</span>
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
