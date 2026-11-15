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
  ChevronRight
} from 'lucide-react';

export const QcModule: React.FC = () => {
  const { qcReviews, submitQcDecision, toggleQcChecklistItem, currentUser, darkMode } = useApp();
  const [selectedReviewId, setSelectedReviewId] = useState<string>(qcReviews[0]?.id || '');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [reviewComments, setReviewComments] = useState('');

  const activeReview = qcReviews.find((r) => r.id === selectedReviewId) || qcReviews[0];

  const categories = [
    { id: 'code_quality', label: '1. Code Quality & Types' },
    { id: 'ui_ux', label: '2. UI/UX Polish & Responsiveness' },
    { id: 'performance_seo', label: '3. Performance & Lighthouse' },
    { id: 'security', label: '4. Security & RLS Compliance' }
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

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto select-none">
      {/* QC Header & Decision Banner */}
      <div className={`rounded-2xl p-6 border transition-colors duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30">
              QC GATE ENGINE: 100-POINT AUDIT
            </span>
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>• Reviewer: {currentUser.fullName}</span>
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {activeReview.projectName} — {activeReview.milestoneTitle}
          </h2>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Submitted by: <span className={`font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{activeReview.submittedByName}</span> • Staging Ready
          </p>
        </div>

        {/* Score & Status Pill */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Audit Score</div>
            <div className="text-3xl font-black text-[#00c853] font-mono">
              {activeReview.overallScore} / 100
            </div>
          </div>

          <div className={`h-10 w-[1px] ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

          <div>
            <div className={`text-[10px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gate Status</div>
            <span
              className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full inline-block mt-0.5 ${
                activeReview.decision === 'approve'
                  ? 'bg-[#00c853]/20 text-[#00c853] border border-[#00c853]/30'
                  : activeReview.decision === 'request_revisions'
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                  : activeReview.decision === 'reject'
                  ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                  : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {activeReview.decision.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 100-Point Checklist + Deliverable Sandbox Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 100-Point Checklist (5 cols) */}
        <div className={`lg:col-span-5 rounded-2xl p-5 space-y-4 border transition-colors duration-200 ${
          darkMode ? 'bg-[#14171d] border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-sm'
        }`}>
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

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
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
              Inspector Auditor Comments
            </label>
            <textarea
              rows={2}
              value={reviewComments || activeReview.comments}
              onChange={(e) => setReviewComments(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-[#00c853] ${
                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
              placeholder="Notes on mobile layout, performance, or revision instructions..."
            />
          </div>

          {/* 3-Way Decision Gate Actions */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => submitQcDecision(activeReview.id, 'approve', reviewComments)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#00c853] hover:bg-[#00af48] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00c853]/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Gate Decision 1: Approve for Client Release</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => submitQcDecision(activeReview.id, 'request_revisions', reviewComments)}
                className="py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-300 border border-amber-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Request Revisions</span>
              </button>

              <button
                onClick={() => submitQcDecision(activeReview.id, 'reject', reviewComments)}
                className="py-2 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject Gate</span>
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
              <span className={`text-xs font-mono ml-2 font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                https://nordic-checkout.staging.digiworku.internal
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
                    N
                  </div>
                  <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Nordic Living Checkout Demo</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/20 font-bold">
                  Stripe Multi-Currency
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1">
                <div className={`p-4 rounded-xl border space-y-2 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[11px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Order Summary</span>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    <span>Stockholm Oak Ergonomic Chair x 2</span>
                    <span className="font-mono font-bold">₹48,000 INR</span>
                  </div>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span>Express European Courier (DHL)</span>
                    <span className="font-mono text-[#00c853] font-bold">₹0 Free</span>
                  </div>
                  <div className={`flex justify-between text-xs font-bold text-[#00c853] pt-2 border-t ${
                    darkMode ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <span>Total Due (Taxes Included):</span>
                    <span className="font-mono">₹48,000</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border space-y-3 ${
                  darkMode ? 'bg-[#0f1115] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`text-[11px] uppercase font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Payment Method Verified</span>
                  <div className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <span className={`font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>•••• •••• •••• 4242</span>
                    <span className="text-[#00c853] font-bold text-[10px]">Stripe Elements Verified</span>
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-[#00c853] hover:bg-[#00af48] text-white font-bold text-xs transition-colors cursor-pointer">
                    Simulate Complete Order (200 OK)
                  </button>
                </div>
              </div>

              <div className={`p-2.5 text-center text-[10px] border-t font-medium ${
                darkMode ? 'bg-slate-900 text-slate-500 border-slate-800' : 'bg-slate-50 text-slate-400 border-slate-100'
              }`}>
                Sandboxed Isolated Container • No External Network Leakage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
