import React from 'react';

export interface DigiWorkuLogoProps {
  variant?: 'full' | 'icon' | 'squircle';
  className?: string;
  height?: number | string;
}

export const DigiWorkuLogo: React.FC<DigiWorkuLogoProps> = ({
  variant = 'full',
  className = '',
  height = 36,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* DigiWorku Glowing Emerald Squircle Icon */}
      <div 
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-2 shadow-lg shadow-emerald-500/20 border border-emerald-400/30"
        style={{ width: height, height }}
      >
        <span className="text-white font-black font-mono text-base tracking-tighter">D</span>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#030712]" />
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-black text-xl text-white font-display">
            DigiWorku<span className="text-emerald-400 font-mono text-xs ml-1 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">OPS</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Workforce OS
          </span>
        </div>
      )}
    </div>
  );
};
