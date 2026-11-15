import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const RestrictedAccessView: React.FC<{ moduleName: string }> = ({ moduleName }) => {
  const { currentRole, switchRole } = useApp();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#0b1324] border border-rose-500/30 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500"></div>

        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-5">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Access Strictly Restricted</h2>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          The <span className="font-semibold text-rose-300">{moduleName}</span> module contains confidential enterprise financial data, salaries, or governance controls.
        </p>

        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-left mb-6 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Role:</span>
            <span className="font-mono text-amber-400 font-bold uppercase">{currentRole.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Security Clearance:</span>
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Insufficient Level
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] text-slate-400 mb-2">
            Switch role via simulator to inspect this module:
          </p>
          <button
            onClick={() => switchRole('super_admin')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Simulate as Super Admin</span>
          </button>
          <button
            onClick={() => switchRole('finance_manager')}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
          >
            <span>Simulate as Finance Manager</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
