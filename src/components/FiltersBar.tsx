import React from 'react';
import { FilterState } from '../types';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface FiltersBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  channels: string[];
  types: string[];
  audiences: string[];
  locations: string[];
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  setFilters,
  channels,
  types,
  audiences,
  locations,
}) => {
  const hasActiveFilters = 
    filters.channel !== 'all' || 
    filters.campaignType !== 'all' || 
    filters.audience !== 'all' || 
    filters.location !== 'all' || 
    filters.search.trim() !== '';

  const resetFilters = () => {
    setFilters({
      channel: 'all',
      campaignType: 'all',
      audience: 'all',
      location: 'all',
      search: '',
    });
  };

  return (
    <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-4 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm mb-6 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            placeholder="Search campaigns, companies, keywords..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-brand-darkBg border border-slate-200 dark:border-brand-darkBorder text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-wrap">
          
          {/* Channel */}
          <select
            value={filters.channel}
            onChange={(e) => setFilters(prev => ({ ...prev, channel: e.target.value }))}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-brand-darkBg border border-slate-200 dark:border-brand-darkBorder text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
          >
            <option value="all">All Channels</option>
            {channels.map(ch => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>

          {/* Campaign Type */}
          <select
            value={filters.campaignType}
            onChange={(e) => setFilters(prev => ({ ...prev, campaignType: e.target.value }))}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-brand-darkBg border border-slate-200 dark:border-brand-darkBorder text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
          >
            <option value="all">All Types</option>
            {types.map(tp => (
              <option key={tp} value={tp}>{tp}</option>
            ))}
          </select>

          {/* Audience */}
          <select
            value={filters.audience}
            onChange={(e) => setFilters(prev => ({ ...prev, audience: e.target.value }))}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-brand-darkBg border border-slate-200 dark:border-brand-darkBorder text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
          >
            <option value="all">All Audiences</option>
            {audiences.map(aud => (
              <option key={aud} value={aud}>{aud}</option>
            ))}
          </select>

          {/* Location */}
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-brand-darkBg border border-slate-200 dark:border-brand-darkBorder text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}

      </div>
    </div>
  );
};
