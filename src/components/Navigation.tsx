import React from 'react';
import { TabType } from '../types';
import { 
  LayoutDashboard, 
  Share2, 
  Target, 
  Users, 
  Globe, 
  TrendingUp, 
  Table 
} from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'channels', label: 'Channels', icon: Share2 },
  { id: 'campaigns', label: 'Campaigns', icon: Target },
  { id: 'audiences', label: 'Audiences', icon: Users },
  { id: 'geography', label: 'Geography', icon: Globe },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'explorer', label: 'Explorer', icon: Table },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-brand-pale/40 dark:border-brand-darkBorder bg-white/70 dark:bg-brand-darkBg/70 backdrop-blur-sm sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar" aria-label="Dashboard Sections">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-navy text-white dark:bg-brand-mint dark:text-brand-navy shadow-sm scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white hover:bg-brand-lightBg dark:hover:bg-brand-navy/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-lime dark:text-brand-navy' : 'text-brand-sea'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
