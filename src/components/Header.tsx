import React from 'react';
import { Moon, Sun, Download, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onExport: () => void;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, onExport, lastUpdated }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-brand-darkBg/90 backdrop-blur-md border-b border-brand-pale/40 dark:border-brand-darkBorder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              {/* Standalone SVG Logo Mark matching the exact uploaded image */}
              <div className="w-12 h-12 rounded-2xl bg-brand-navy shadow-md flex items-center justify-center p-2 border border-brand-teal/30 group-hover:scale-105 transition-transform flex-shrink-0">
                <svg viewBox="0 0 256 256" className="w-full h-full" fill="none">
                  <path 
                    d="M36 102H70L88 78L104 116L126 62L146 102H220" 
                    stroke="#D9ED92" 
                    strokeWidth="16" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <g fill="#76C893">
                    <rect x="66" y="152" width="28" height="46" rx="14" />
                    <rect x="114" y="132" width="28" height="66" rx="14" />
                    <rect x="162" y="112" width="28" height="86" rx="14" fill="#52B69A" />
                  </g>
                </svg>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-brand-navy dark:text-white font-sans">
                    MarketPulse
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-brand-blue dark:text-brand-mint">
                    Analytics
                  </span>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-brand-sea"></span>
                  <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Marketing Intelligence
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Data Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-lime/30 dark:bg-brand-navy/60 border border-brand-mint/40 text-brand-navy dark:text-brand-lime text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-sea animate-pulse"></span>
              <span>LIVE DATA (200k Records)</span>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={onExport}
              title="Export filtered records to CSV"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-brand-darkCard text-brand-navy dark:text-brand-lime border border-brand-pale/50 dark:border-brand-darkBorder hover:bg-brand-lightBg dark:hover:bg-brand-navy/50 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-brand-sea" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="p-2.5 rounded-xl bg-white dark:bg-brand-darkCard text-brand-navy dark:text-brand-lime border border-brand-pale/50 dark:border-brand-darkBorder hover:bg-brand-lightBg dark:hover:bg-brand-navy/50 transition-all shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4 text-brand-lime" /> : <Moon className="w-4 h-4 text-brand-navy" />}
            </button>

            {/* Portfolio Link Button */}
            <a
              href="https://islamyasser424-design.github.io/portfolio-/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-brand-navy hover:bg-brand-blue text-white transition-all shadow-sm"
            >
              <span>Portfolio</span>
              <span className="text-brand-lime">↗</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
