import React from 'react';
import { MarketingDataset, FilterState } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell 
} from 'recharts';
import { Share2, MousePointerClick, Check } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface ChannelsViewProps {
  data: MarketingDataset;
  filters: FilterState;
  onSelectChannel: (channel: string) => void;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({ 
  data, 
  filters, 
  onSelectChannel 
}) => {
  const { by_channel } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-sea" />
            <span>Channel Performance & Interactive Filtering</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click on any chart bar or table row to cross-filter the entire dashboard
          </p>
        </div>

        {filters.channel !== 'all' && (
          <div className="flex items-center gap-2 bg-brand-navy text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            <span>Filtered: {filters.channel}</span>
            <button
              onClick={() => onSelectChannel('all')}
              className="text-brand-lime hover:underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversion Rate vs CTR */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <span>Conversion Rate vs CTR (%)</span>
              <MousePointerClick className="w-3.5 h-3.5 text-brand-sea" />
            </h3>
            <span className="text-[10px] text-brand-sea font-bold">Interactive</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Yield comparison across distribution platforms (click to filter)
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_channel} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectChannel(e.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip hint="👆 Click to filter by this channel" />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ctr" fill="#184E77" name="ctr" radius={[6, 6, 0, 0]} cursor="pointer">
                  {by_channel.map((entry) => {
                    const isSelected = filters.channel === entry.name;
                    const isFiltered = filters.channel !== 'all';
                    return (
                      <Cell 
                        key={`cell-ctr-${entry.name}`} 
                        opacity={isFiltered && !isSelected ? 0.35 : 1}
                        stroke={isSelected ? '#D9ED92' : 'none'}
                        strokeWidth={isSelected ? 2.5 : 0}
                      />
                    );
                  })}
                </Bar>
                <Bar dataKey="avg_conversion" fill="#76C893" name="avg_conversion" radius={[6, 6, 0, 0]} cursor="pointer">
                  {by_channel.map((entry) => {
                    const isSelected = filters.channel === entry.name;
                    const isFiltered = filters.channel !== 'all';
                    return (
                      <Cell 
                        key={`cell-conv-${entry.name}`} 
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

        {/* Acquisition Cost (CAC) by Channel */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <span>Customer Acquisition Cost (Avg CAC)</span>
              <MousePointerClick className="w-3.5 h-3.5 text-brand-sea" />
            </h3>
            <span className="text-[10px] text-brand-sea font-bold">Interactive</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Unweighted average spend required per conversion (click to filter)
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_channel} 
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectChannel(e.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip hint="👆 Click to filter by this channel" />} />
                <Bar dataKey="avg_cac" fill="#1A759F" name="avg_cac" radius={[6, 6, 0, 0]} cursor="pointer">
                  {by_channel.map((entry) => {
                    const isSelected = filters.channel === entry.name;
                    const isFiltered = filters.channel !== 'all';
                    return (
                      <Cell 
                        key={`cell-cac-${entry.name}`} 
                        fill={isSelected ? '#184E77' : '#1A759F'}
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

      </div>

      {/* Comprehensive Channel Performance Table with Row Selection */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-brand-darkBorder flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <span>Channel Performance Matrix</span>
            <span className="text-[11px] font-normal text-slate-500">(Click any row to filter)</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Ranked by DAX Channel Rank
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-brand-darkBg/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-brand-darkBorder">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4 text-right">Campaigns</th>
                <th className="py-3 px-4 text-right">Total Clicks</th>
                <th className="py-3 px-4 text-right">CTR</th>
                <th className="py-3 px-4 text-right">Conversion Rate</th>
                <th className="py-3 px-4 text-right">Avg ROI</th>
                <th className="py-3 px-4 text-right">Avg CAC</th>
                <th className="py-3 px-4 text-right">Engagement</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {by_channel.map((ch) => {
                const isSelected = filters.channel === ch.name;
                return (
                  <tr 
                    key={ch.name} 
                    onClick={() => onSelectChannel(ch.name)}
                    className={`cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-brand-navy/10 dark:bg-brand-mint/15 font-bold' 
                        : 'hover:bg-brand-lightBg/60 dark:hover:bg-brand-navy/20'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-brand-lime">
                      #{ch.rank || 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-white flex items-center gap-2">
                      <span>{ch.name}</span>
                      {isSelected && <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-navy text-white dark:bg-brand-mint dark:text-brand-navy">Active</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                      {ch.count.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-700 dark:text-slate-200">
                      {(ch.clicks / 1_000_000).toFixed(2)}M
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-brand-sea dark:text-brand-mint">
                      {ch.ctr}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700 dark:text-slate-200">
                      {ch.avg_conversion}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-brand-navy dark:text-brand-lime">
                      {ch.avg_roi}x
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                      ${Math.round(ch.avg_cac || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-brand-teal dark:text-brand-pale">
                      {ch.avg_engagement || 0} / 10
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                          isSelected 
                            ? 'bg-brand-navy text-white border-brand-navy dark:bg-brand-mint dark:text-brand-navy' 
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
