import React from 'react';
import { MarketingDataset, FilterState } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { Target, Clock, Layers, MousePointerClick } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface CampaignsViewProps {
  data: MarketingDataset;
  filters: FilterState;
  onSelectType: (type: string) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ 
  data, 
  filters, 
  onSelectType 
}) => {
  const { by_type, by_duration } = data;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-teal" />
            <span>Campaign Architecture & Duration Analysis</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any campaign type bar or card to filter the entire dashboard
          </p>
        </div>

        {filters.campaignType !== 'all' && (
          <div className="flex items-center gap-2 bg-brand-teal text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            <span>Filtered: {filters.campaignType}</span>
            <button
              onClick={() => onSelectType('all')}
              className="text-brand-lime hover:underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Campaign Type Share & Volume */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-sea" />
              <span>Campaign Type Volume (Click to filter)</span>
            </h3>
            <span className="text-[10px] text-brand-sea font-bold flex items-center gap-1">
              <MousePointerClick className="w-3 h-3" />
              <span>Interactive</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Campaign allocation across Search, Social, Display, Influencer and Email
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_type} 
                layout="vertical" 
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectType(e.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip hint="👆 Click to filter by this campaign type" />} />
                <Bar dataKey="count" name="count" radius={[0, 6, 6, 0]} cursor="pointer">
                  {by_type.map((entry) => {
                    const isSelected = filters.campaignType === entry.name;
                    const isFiltered = filters.campaignType !== 'all';
                    return (
                      <Cell 
                        key={`cell-type-${entry.name}`} 
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

        {/* Campaign Duration Impact on ROI */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>Duration vs Average ROI Multiplier</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-bold">Lifecycle</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Evaluate whether campaign lifecycle length correlates with higher yield
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_duration} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 6]} tickFormatter={(v) => `${v}x`} tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip hint="Duration ROI average" />} />
                <Bar dataKey="avg_roi" name="avg_roi" fill="#76C893" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Summary Cards of Types with Click-to-Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {by_type.map((t, idx) => {
          const isSelected = filters.campaignType === t.name;
          return (
            <div 
              key={t.name} 
              onClick={() => onSelectType(t.name)}
              className={`p-4 rounded-xl bg-white dark:bg-brand-darkCard border shadow-sm cursor-pointer hover:scale-[1.02] transition-all ${
                isSelected 
                  ? 'border-brand-teal dark:border-brand-lime ring-2 ring-brand-teal/30 bg-brand-lightBg/50 dark:bg-brand-navy/30' 
                  : 'border-brand-pale/40 dark:border-brand-darkBorder'
              }`}
              title="Click to filter by this campaign type"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <span>Type #{idx+1}</span>
                {isSelected && <span className="text-brand-teal dark:text-brand-lime font-black">Filtered</span>}
              </div>
              <div className="text-sm font-extrabold text-brand-navy dark:text-white mb-2">
                {t.name}
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Campaigns:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{t.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Avg ROI:</span>
                  <span className="font-bold text-brand-navy dark:text-brand-lime">{t.avg_roi}x</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Conversion:</span>
                  <span className="font-semibold text-brand-sea dark:text-brand-mint">{t.avg_conversion}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
