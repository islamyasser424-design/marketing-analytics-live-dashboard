import React from 'react';
import { ExternalLink, Github, BarChart3, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-brand-pale/40 dark:border-brand-darkBorder bg-white/70 dark:bg-brand-darkBg/70 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center p-1.5 border border-brand-teal/30">
              <svg viewBox="0 0 256 256" className="w-full h-full" fill="none">
                <path d="M36 102H70L88 78L104 116L126 62L146 102H220" stroke="#D9ED92" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <g fill="#76C893">
                  <rect x="66" y="152" width="28" height="46" rx="14" />
                  <rect x="114" y="132" width="28" height="66" rx="14" />
                  <rect x="162" y="112" width="28" height="86" rx="14" fill="#52B69A" />
                </g>
              </svg>
            </div>
            <div>
              <div className="text-sm font-extrabold text-brand-navy dark:text-white">
                MarketPulse Analytics
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Created by <strong>Islam Yasser</strong> • Data Analyst & BI Specialist
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <a 
              href="https://github.com/islamyasser424-design/marketing-analytics-live-dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-navy dark:hover:text-brand-lime transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href="https://islamyasser424-design.github.io/portfolio-/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-navy dark:hover:text-brand-lime transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Portfolio</span>
            </a>
          </div>

        </div>

        {/* Legal & Data disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-brand-darkBorder/40 text-[10px] text-slate-400 dark:text-slate-500 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            Dataset: 200,002 marketing campaigns (2021). CTR = Sum(Clicks)/Sum(Impressions)*100. Average ROI as reported.
          </p>
          <div className="flex items-center gap-1 text-brand-sea font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>Power BI & DAX Verified Model</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
