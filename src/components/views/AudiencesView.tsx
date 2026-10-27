import React from 'react';
import { MarketingDataset, FilterState } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell 
} from 'recharts';
import { Users, HeartHandshake, Sparkles, MousePointerClick } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface AudiencesViewProps {
  data: MarketingDataset;
  filters: FilterState;
  onSelectAudience: (aud: string) => void;
}

export const AudiencesView: React.FC<AudiencesViewProps> = ({ 
  data, 
  filters, 
  onSelectAudience 
}) => {
  const { by_audience, by_segment } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-sea" />
            <span>Audience Demographics & Segment Resonance</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any demographic bar or segment card to filter the entire dashboard
          </p>
        </div>

        {filters.audience !== 'all' && (
          <div className="flex items-center gap-2 bg-brand-sea text-white px-3 py-1.5 rounded-xl text-xs font-bold">
            <span>Filtered: {filters.audience}</span>
            <button
              onClick={() => onSelectAudience('all')}
              className="text-brand-lime hover:underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Segment Conversion & ROI */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-teal" />
              <span>Behavioral Segments (Conversion vs ROI)</span>
            </h3>
            <span className="text-[10px] text-brand-sea font-bold">Affinity</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Performance yield across consumer affinity groups
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_segment} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip hint="Behavioral segment metrics" />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="avg_conversion" fill="#34A0A4" name="avg_conversion" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avg_roi" fill="#76C893" name="avg_roi" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Target Audience Age Demographics - INTERACTIVE */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-brand-accent" />
              <span>Demographic Cohorts (Click to filter)</span>
            </h3>
            <span className="text-[10px] text-brand-sea font-bold flex items-center gap-1">
              <MousePointerClick className="w-3 h-3" />
              <span>Interactive</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Audience engagement level rated out of 10
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_audience} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectAudience(e.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}/10`} />
                <Tooltip content={<CustomTooltip hint="👆 Click to filter by this audience" />} />
                <Bar dataKey="avg_engagement" name="avg_engagement" radius={[6, 6, 0, 0]} cursor="pointer">
                  {by_audience.map((entry) => {
                    const isSelected = filters.audience === entry.name;
                    const isFiltered = filters.audience !== 'all';
                    return (
                      <Cell 
                        key={`cell-aud-${entry.name}`} 
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

      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {by_segment.map((s) => (
          <div key={s.name} className="p-4 rounded-xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
            <div className="text-xs font-bold text-brand-navy dark:text-brand-lime truncate mb-1">
              {s.name}
            </div>
            <div className="text-lg font-black text-slate-800 dark:text-white mb-2">
              {s.count.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">camps</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
              <span>Avg ROI:</span>
              <span className="font-bold text-brand-sea dark:text-brand-mint">{s.avg_roi}x</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between mt-0.5">
              <span>CAC:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">${Math.round(s.avg_cac || 0).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
