import React from 'react';
import { MarketingDataset, FilterState } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { Globe, MapPin, Languages, MousePointerClick } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface GeographyViewProps {
  data: MarketingDataset;
  filters: FilterState;
  onSelectLocation: (loc: string) => void;
}

export const GeographyView: React.FC<GeographyViewProps> = ({ 
  data, 
  filters, 
  onSelectLocation 
}) => {
  const { by_location, by_language } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-sea" />
            <span>Geographic Markets & Language Dynamics</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any location bar or table row to cross-filter the entire dashboard
          </p>
        </div>

        {filters.location !== 'all' && (
          <div className="flex items-center gap-2 bg-brand-blue text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            <span>Filtered: {filters.location}</span>
            <button
              onClick={() => onSelectLocation('all')}
              className="text-brand-lime hover:underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Location Performance - INTERACTIVE */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-teal" />
              <span>Top Metropolitan Markets (Click to filter)</span>
            </h3>
            <span className="text-[10px] text-brand-sea font-bold flex items-center gap-1">
              <MousePointerClick className="w-3 h-3" />
              <span>Interactive</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Regional campaign concentration and click efficiency
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_location} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectLocation(e.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip hint="👆 Click to filter by this location" />} />
                <Bar dataKey="ctr" fill="#184E77" name="ctr" radius={[6, 6, 0, 0]} cursor="pointer">
                  {by_location.map((entry) => {
                    const isSelected = filters.location === entry.name;
                    const isFiltered = filters.location !== 'all';
                    return (
                      <Cell 
                        key={`cell-loc-${entry.name}`} 
                        fill={isSelected ? '#52B69A' : '#184E77'}
                        opacity={isFiltered && !isSelected ? 0.35 : 1}
                        stroke={isSelected ? '#D9ED92' : 'none'}
                        strokeWidth={isSelected ? 2.5 : 0}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Performance */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <Languages className="w-4 h-4 text-brand-accent" />
              <span>Language Localization ROI</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">Copy Yield</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Campaign returns by localized ad copy language
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_language} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 6]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
                <Tooltip content={<CustomTooltip hint="Language ROI average" />} />
                <Bar dataKey="avg_roi" fill="#76C893" name="avg_roi" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Locations Table */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-brand-darkBorder flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white">
            Market Location Breakdown <span className="text-slate-400 text-xs font-normal">(Click row to filter)</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {by_location.length} Active Regions
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-brand-darkBg/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-brand-darkBorder">
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Campaigns</th>
                <th className="py-3 px-4 text-right">Total Clicks</th>
                <th className="py-3 px-4 text-right">CTR</th>
                <th className="py-3 px-4 text-right">Conversion Rate</th>
                <th className="py-3 px-4 text-right">Avg ROI</th>
                <th className="py-3 px-4 text-right">Avg CAC</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {by_location.map((loc) => {
                const isSelected = filters.location === loc.name;
                return (
                  <tr 
                    key={loc.name} 
                    onClick={() => onSelectLocation(loc.name)}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-brand-navy/10 dark:bg-brand-mint/15 font-bold' 
                        : 'hover:bg-brand-lightBg/50 dark:hover:bg-brand-navy/20'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-sea" />
                      <span>{loc.name}</span>
                      {isSelected && <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-blue text-white">Active</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                      {loc.count.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-700 dark:text-slate-200">
                      {(loc.clicks / 1_000_000).toFixed(2)}M
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-brand-sea dark:text-brand-mint">
                      {loc.ctr}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700 dark:text-slate-200">
                      {loc.avg_conversion}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-brand-navy dark:text-brand-lime">
                      {loc.avg_roi}x
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                      ${Math.round(loc.avg_cac || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                          isSelected 
                            ? 'bg-brand-blue text-white border-brand-blue' 
                            : 'border-slate-200 dark:border-brand-darkBorder text-slate-500'
                        }`}
                      >
                        {isSelected ? 'Filtered' : 'Filter'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
