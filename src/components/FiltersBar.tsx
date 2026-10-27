import React from 'react';
import { FilterState } from '../types';
import { Search, RotateCcw, X, MousePointer } from 'lucide-react';

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

      {/* Active Filter Badges from Chart Interactivity */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-brand-darkBorder/60 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-bold text-brand-navy dark:text-brand-lime mr-1">
            <MousePointer className="w-3.5 h-3.5 text-brand-sea" />
            <span>Active Filters:</span>
          </div>

          {filters.channel !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-navy text-white text-xs font-bold shadow-sm">
              <span>Channel: {filters.channel}</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, channel: 'all' }))}
                className="hover:text-brand-lime ml-1"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.campaignType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-teal text-white text-xs font-bold shadow-sm">
              <span>Type: {filters.campaignType}</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, campaignType: 'all' }))}
                className="hover:text-brand-lime ml-1"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.audience !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-sea text-white text-xs font-bold shadow-sm">
              <span>Audience: {filters.audience}</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, audience: 'all' }))}
                className="hover:text-brand-lime ml-1"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.location !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-blue text-white text-xs font-bold shadow-sm">
              <span>Location: {filters.location}</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, location: 'all' }))}
                className="hover:text-brand-lime ml-1"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.search.trim() !== '' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700 text-white text-xs font-bold shadow-sm">
              <span>Search: "{filters.search}"</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="hover:text-brand-lime ml-1"
                title="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] text-slate-500 hover:text-rose-500 font-semibold underline ml-auto"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
