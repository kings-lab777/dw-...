import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Clock,
  UserCheck,
  Lock,
  Unlock,
  Layers,
  FileCheck
} from 'lucide-react';

export const QcModule: React.FC = () => {
  const {
    qcReviews,
    submitQcDecision,
    toggleQcChecklistItem,
    approveQcAndAuthorizeDelivery,
    requestQcRevision,
    projects,
    services,
    employees,
    currentUser,
    darkMode
  } = useApp();

  const [selectedReviewId, setSelectedReviewId] = useState<string>(qcReviews[0]?.id || '');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [reviewComments, setReviewComments] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState(currentUser.fullName);

  const activeReview = qcReviews.find((r) => r.id === selectedReviewId) || qcReviews[0];
  const linkedProject = projects.find((p) => p.id === activeReview?.projectId);
  const linkedService = services.find(
    (s) => s.category === linkedProject?.serviceCategory || s.category === (linkedProject?.serviceCategoryKey as any)
  );

  const categories = [
    { id: 'code_quality', label: '1. Code Quality, Types & Lint' },
    { id: 'ui_ux', label: '2. UI/UX Polish & Responsiveness' },
    { id: 'performance_seo', label: '3. Performance & Speed Standards' },
    { id: 'security', label: '4. Security & Sensitive Data Handling' }
  ];

  const getViewportWidth = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      default:
        return 'w-full';
    }
  };

  const handleApprove = () => {
    if (!activeReview) return;
    approveQcAndAuthorizeDelivery(activeReview.id, activeReview.projectId);
  };

  const handleRequestRevision = () => {
    if (!activeReview) return;
    const notes = reviewComments || 'Requires refinement according to acceptance criteria checklist.';
    requestQcRevision(activeReview.id, notes);
  };

  const handleReject = () => {
    if (!activeReview) return;
    submitQcDecision(activeReview.id, 'reject', reviewComments || 'Deliverable failed essential specifications.');
  };

  if (!activeReview) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto">
        <CheckCircle2 className="w-12 h-12 text-[#00c853] mx-auto mb-3" />
        <h2 className="text-lg font-bold">All Quality Audits Up to Date</h2>
        <p className="text-xs text-slate-500 mt-1">No deliverable milestones are currently pending QC gate audit.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* Top Review Selector & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Quality Assurance &amp; Gate Engine
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00c853]/10 text-[#00c853] font-bold border border-[#00c853]/30">
              100-Point Audit Engine
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Mandatory gate: Projects cannot be delivered or marked complete until QA approval is certified
          </p>
        </div>

        {/* Audit Queue Dropdown */}
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Audit Target:</span>
          <select
            value={selectedReviewId}
            onChange={(e) => setSelectedReviewId(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] transition-colors ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            {qcReviews.map((r) => (
              <option key={r.id} value={r.id}>
                {r.projectName} — {r.milestoneTitle} ({r.decision})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QC Status & Decision Banner */}
      <div className={`rounded-2xl p-6 border transition-colors duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30">
              {linkedProject?.category || 'Service Quality Audit'}
            </span>
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              • Submitter: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{activeReview.submittedByName}</strong>
            </span>
            {activeReview.revisionCount > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold border border-amber-500/30">
                Revision Round #{activeReview.revisionCount}
              </span>
            )}
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {activeReview.projectName} — {activeReview.milestoneTitle}
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
            <span>Submitted: {activeReview.submittedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#00c853]" />
              Assigned QA Auditor:
              <select
                value={selectedReviewer}
                onChange={(e) => setSelectedReviewer(e.target.value)}
                className={`ml-1 bg-transparent border-b border-dashed text-xs focus:outline-none ${
                  darkMode ? 'border-slate-700 text-white' : 'border-slate-300 text-slate-900'
                }`}
              >
                {employees
                  .filter((e) => e.department === 'Quality Assurance' || e.role === 'super_admin' || e.role === 'operations_manager')
                  .map((e) => (
                    <option key={e.id} value={e.fullName} className={darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      {e.fullName} ({e.designation})
                    </option>
                  ))}
              </select>
            </span>
          </div>
        </div>

        {/* Score & Delivery Authorization Status */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <div className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Inspection Score
            </div>
            <div className="text-3xl font-black text-[#00c853] font-mono">
              {activeReview.overallScore} / 100
            </div>
          </div>

          <div className={`h-12 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

          <div>
            <div className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Client Delivery Gate
            </div>
            {activeReview.deliveryAuthorized ? (
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-xl bg-[#00c853]/15 text-[#00c853] border border-[#00c853]/30 mt-1">
                <Unlock className="w-3.5 h-3.5" /> Authorized for Delivery
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 mt-1">
                <Lock className="w-3.5 h-3.5" /> Delivery Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Checklist & Acceptance Criteria + Deliverable Sandbox Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 100-Point Checklist + Service Acceptance Criteria (5 cols) */}
        <div className={`lg:col-span-5 rounded-2xl p-5 space-y-4 border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Service-Specific Acceptance Criteria Banner */}
          {linkedService && linkedService.acceptanceCriteria && (
            <div className={`p-4 rounded-xl border space-y-2 ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
            }`}>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#00c853]" />
                <h3 className={`text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {linkedService.name} — Acceptance Criteria
                </h3>
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-500 dark:text-slate-400">
                {linkedService.acceptanceCriteria.map((crit, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {crit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={`flex items-center justify-between pb-2 border-b ${
            darkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <ShieldCheck className="w-4 h-4 text-[#00c853]" />
              100-Point Inspection Criteria
            </h3>
            <span className="text-[10px] font-mono text-[#00c853] font-bold">
              {activeReview.checklistItems.filter((i) => i.passed).length} of {activeReview.checklistItems.length} Passed
            </span>
          </div>

          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const items = activeReview.checklistItems.filter((i) => i.category === cat.id);
              if (items.length === 0) return null;

              return (
                <div key={cat.id} className="space-y-2">
                  <div className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                    darkMode
                      ? 'bg-slate-900/80 text-slate-300 border-slate-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {cat.label}
                  </div>

                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleQcChecklistItem(activeReview.id, item.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          item.passed
                            ? darkMode
                              ? 'bg-[#0f1115] border-[#00c853]/40'
                              : 'bg-emerald-50/40 border-emerald-200'
                            : darkMode
                              ? 'bg-[#0f1115] border-slate-800 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="mt-0.5">
                          {item.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#00c853]" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold ${
                            item.passed
                              ? darkMode ? 'text-white' : 'text-slate-900'
                              : darkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {item.title}
                          </div>
                          <p className={`text-[10px] mt-0.5 leading-relaxed ${
                            darkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Feedback / Comments Input */}
          <div className={`pt-2 border-t space-y-2 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <label className={`block text-[11px] font-semibold uppercase ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              QA Auditor Assessment &amp; Instructions
            </label>
            <textarea
              rows={2}
              value={reviewComments || activeReview.comments}
              onChange={(e) => setReviewComments(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
              placeholder="Provide specific notes on acceptance criteria compliance or required fixes..."
            />
          </div>

          {/* 3-Way Decision Gate Actions */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleApprove}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Gate Decision: Approve &amp; Authorize Client Delivery</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleRequestRevision}
                className="py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-300 border border-amber-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Request Revision</span>
              </button>

              <button
                onClick={handleReject}
                className="py-2 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject Milestone</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Deliverable Sandbox Preview (7 cols) */}
        <div className={`lg:col-span-7 rounded-2xl flex flex-col overflow-hidden border transition-colors duration-200 min-h-[680px] ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Sandbox Top Control Bar */}
          <div className={`p-3 border-b flex items-center justify-between ${
            darkMode ? 'border-slate-800 bg-[#0f1115]' : 'border-slate-100 bg-slate-50'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-[#00c853]/80" />
              <span className={`text-xs font-mono ml-2 font-semibold truncate max-w-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {activeReview.deliverablePreviewUrl || 'https://staging.digiworku.internal/deliverable'}
              </span>
            </div>

            {/* Viewport Switcher */}
            <div className={`flex items-center rounded-lg p-0.5 border ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewportMode === 'desktop' ? 'bg-[#00c853] text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                }`}
                title="Desktop (1440px)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewportMode === 'tablet' ? 'bg-[#00c853] text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                }`}
                title="Tablet (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewportMode === 'mobile' ? 'bg-[#00c853] text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                }`}
                title="Mobile Viewport (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sandbox Container (Centered Preview Area) */}
          <div className={`flex-1 p-4 flex items-center justify-center overflow-auto ${
            darkMode ? 'bg-[#090d15]' : 'bg-slate-100'
          }`}>
            <div
              className={`${getViewportWidth()} transition-all duration-300 rounded-xl overflow-hidden border shadow-2xl min-h-[560px] flex flex-col ${
                darkMode ? 'bg-[#14171d] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Deliverable Mock App Inside Sandbox */}
              <div className={`p-4 border-b flex items-center justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#00c853] flex items-center justify-center text-white font-bold text-xs">
                    DW
                  </div>
                  <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeReview.projectName} — Milestone Sandbox Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 font-bold">
                  Staging Verified
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1">
                <div className={`p-4 rounded-xl border space-y-2 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[11px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Deliverable Details
                  </span>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    <span>Target Milestone:</span>
                    <span className="font-semibold">{activeReview.milestoneTitle}</span>
                  </div>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span>Service Track:</span>
                    <span className="font-mono text-[#00c853] font-bold">{linkedProject?.category || 'Standard Service'}</span>
                  </div>
                  <div className={`flex justify-between text-xs font-bold text-[#00c853] pt-2 border-t ${
                    darkMode ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <span>Delivery Authorization:</span>
                    <span className="font-mono">{activeReview.deliveryAuthorized ? 'APPROVED (UNLOCKED)' : 'PENDING AUDIT'}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border space-y-3 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[11px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Automated Verification Hooks
                  </span>
                  <div className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <span className={`font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lighthouse Performance: 98/100</span>
                    <span className="text-[#00c853] font-bold text-[10px]">PASS</span>
                  </div>
                  <div className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <span className={`font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>TypeScript Typecheck &amp; ESLint</span>
                    <span className="text-[#00c853] font-bold text-[10px]">0 Errors</span>
                  </div>
                </div>
              </div>

              <div className={`p-2.5 text-center text-[10px] border-t font-medium ${
                darkMode ? 'bg-slate-900 text-slate-500 border-slate-800' : 'bg-slate-50 text-slate-400 border-slate-100'
              }`}>
                DigiWorku Sandbox Container • Quality Gate Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
