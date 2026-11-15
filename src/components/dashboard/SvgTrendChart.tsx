import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SvgTrendChartProps {
  title?: string;
  metric?: string;
  growth?: string;
  data?: number[];
  labels?: string[];
}

export const SvgTrendChart: React.FC<SvgTrendChartProps> = ({
  title = "Revenue & Milestone Velocity",
  metric = "₹18,45,000",
  growth = "+28.4% vs last month",
  data = [42, 58, 65, 78, 92, 115, 140],
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
}) => {
  const { darkMode } = useApp();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 680;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...data) * 1.15;
  const minVal = Math.min(...data) * 0.85;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y, val };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - 10} L ${points[0].x.toFixed(1)} ${height - 10} Z`;

  return (
    <div className={`relative overflow-hidden rounded-3xl border transition-colors duration-200 p-6 shadow-sm ${
      darkMode 
        ? 'border-slate-800/80 bg-[#14171d] shadow-2xl' 
        : 'border-slate-200/80 bg-white shadow-slate-200/50'
    }`}>
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#00c853]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <span className={`text-[11px] font-black uppercase tracking-wider block mb-1 font-display ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {title}
          </span>
          <div className="flex items-baseline gap-3">
            <span className={`text-3xl font-black font-mono ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {metric}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00c853] bg-[#00c853]/10 px-2.5 py-0.5 rounded-full border border-[#00c853]/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {growth}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Wave Chart */}
      <div className="w-full overflow-x-auto relative z-10">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 overflow-visible select-none">
          <defs>
            <linearGradient id="emeraldGlowArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00c853" stopOpacity={darkMode ? "0.35" : "0.20"} />
              <stop offset="100%" stopColor="#00c853" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill="url(#emeraldGlowArea)" />

          {/* Line curve */}
          <path d={linePath} fill="none" stroke="#00c853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === i ? 7 : 4}
                className={`transition-all duration-200 ${
                  hoveredIndex === i 
                    ? 'fill-[#00c853] stroke-white stroke-2' 
                    : darkMode 
                      ? 'fill-[#0f1115] stroke-[#00c853] stroke-2' 
                      : 'fill-white stroke-[#00c853] stroke-2'
                }`}
              />
              <text 
                x={pt.x} 
                y={height - 2} 
                textAnchor="middle" 
                className={`text-[10px] font-mono font-bold ${
                  darkMode ? 'fill-slate-500' : 'fill-slate-400'
                }`}
              >
                {labels[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
