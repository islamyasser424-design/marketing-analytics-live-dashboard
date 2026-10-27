import React from 'react';
import { MarketingDataset, FilterState } from '../../types';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { Lightbulb, TrendingUp, Award, Target, CheckCircle2, MousePointerClick } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface OverviewViewProps {
  data: MarketingDataset;
  filters: FilterState;
  onSelectChannel: (channel: string) => void;
  onSelectType: (type: string) => void;
  onSelectAudience: (aud: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ 
  data, 
  filters, 
  onSelectChannel, 
  onSelectType, 
  onSelectAudience 
}) => {
  const { by_month, by_channel, insights, by_type, by_audience } = data;

  const topChannel = by_channel[0];
  const topType = by_type[0];
  const topAudience = by_audience[0];

  return (
    <div className="space-y-6">
      
      {/* Strategic Insights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((ins) => (
          <div 
            key={ins.id}
            className="p-4 rounded-2xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex flex-col justify-between hover:border-brand-sea/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-lime/30 text-brand-navy dark:bg-brand-mint/20 dark:text-brand-lime">
                  {ins.category}
                </span>
                <Lightbulb className="w-3.5 h-3.5 text-brand-sea group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white mb-1.5">
                {ins.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ins.description}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-brand-darkBorder/50 flex items-center justify-between text-[10px] font-semibold text-brand-teal dark:text-brand-mint">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Automated Model Insight</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Performance Area Chart */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-brand-navy dark:text-white">
                Monthly Performance & Volume Trajectory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track aggregate clicks and exposure trends across 2021
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-lightBg dark:bg-brand-navy/60 text-brand-navy dark:text-brand-lime">
              Full Year
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={by_month} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#184E77" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#184E77" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip hint="Monthly aggregate volume" />} />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  name="clicks" 
                  stroke="#184E77" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#clickGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel ROI Comparison Bar Chart with INTERACTIVE CLICK-TO-FILTER */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-brand-navy dark:text-white flex items-center gap-2">
                <span>Channel ROI (Click any bar to filter)</span>
                <MousePointerClick className="w-4 h-4 text-brand-sea animate-bounce" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select a marketing channel to cross-filter the entire dashboard
              </p>
            </div>
            {filters.channel !== 'all' && (
              <button
                onClick={() => onSelectChannel('all')}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
              >
                Reset
              </button>
            )}
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={by_channel} 
                margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const ch = e.activePayload[0].payload.name;
                    onSelectChannel(ch);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 7]} tickFormatter={(v) => `${v}x`} />
                <Tooltip content={<CustomTooltip hint="👆 Click bar to filter dashboard by this channel" />} />
                <Bar dataKey="avg_roi" name="avg_roi" radius={[8, 8, 0, 0]} cursor="pointer">
                  {by_channel.map((entry) => {
                    const isSelected = filters.channel === entry.name;
                    const isFiltered = filters.channel !== 'all';
                    return (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={isSelected ? '#184E77' : '#52B69A'}
                        opacity={isFiltered && !isSelected ? 0.35 : 1}
                        stroke={isSelected ? '#D9ED92' : 'none'}
                        strokeWidth={isSelected ? 3 : 0}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Highlights Summary Row with Interactive Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Top Channel Card - Clickable */}
        <div 
          onClick={() => topChannel && onSelectChannel(topChannel.name)}
          className={`p-4 rounded-2xl bg-white dark:bg-brand-darkCard border shadow-sm flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-all ${
            filters.channel === topChannel?.name 
              ? 'border-brand-navy dark:border-brand-lime ring-2 ring-brand-sea/30' 
              : 'border-brand-pale/40 dark:border-brand-darkBorder'
          }`}
          title="Click to filter by top channel"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-lime/30 text-brand-navy dark:bg-brand-navy dark:text-brand-lime flex items-center justify-center font-bold flex-shrink-0">
            <Award className="w-6 h-6 text-brand-sea" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-slate-400">Top Performing Channel</span>
              <span className="text-[10px] text-brand-sea font-bold">Filter 👆</span>
            </div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topChannel?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topChannel?.avg_roi}x ROI • {topChannel?.ctr}% CTR</div>
          </div>
        </div>

        {/* Top Campaign Type Card - Clickable */}
        <div 
          onClick={() => topType && onSelectType(topType.name)}
          className={`p-4 rounded-2xl bg-white dark:bg-brand-darkCard border shadow-sm flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-all ${
            filters.campaignType === topType?.name 
              ? 'border-brand-navy dark:border-brand-lime ring-2 ring-brand-teal/30' 
              : 'border-brand-pale/40 dark:border-brand-darkBorder'
          }`}
          title="Click to filter by top campaign type"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-mint/20 text-brand-navy dark:bg-brand-navy dark:text-brand-mint flex items-center justify-center font-bold flex-shrink-0">
            <Target className="w-6 h-6 text-brand-teal" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-slate-400">Leading Campaign Type</span>
              <span className="text-[10px] text-brand-teal font-bold">Filter 👆</span>
            </div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topType?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topType?.count.toLocaleString()} Campaigns • {topType?.avg_roi}x ROI</div>
          </div>
        </div>

        {/* Highest Engagement Cohort Card - Clickable */}
        <div 
          onClick={() => topAudience && onSelectAudience(topAudience.name)}
          className={`p-4 rounded-2xl bg-white dark:bg-brand-darkCard border shadow-sm flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-all ${
            filters.audience === topAudience?.name 
              ? 'border-brand-navy dark:border-brand-lime ring-2 ring-brand-accent/30' 
              : 'border-brand-pale/40 dark:border-brand-darkBorder'
          }`}
          title="Click to filter by top audience"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-accent/15 text-brand-navy dark:bg-brand-navy dark:text-brand-accent flex items-center justify-center font-bold flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-brand-accent" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase text-slate-400">High Engagement Cohort</span>
              <span className="text-[10px] text-brand-accent font-bold">Filter 👆</span>
            </div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topAudience?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topAudience?.avg_conversion}% Conv • {topAudience?.avg_engagement}/10 Score</div>
          </div>
        </div>

      </div>

    </div>
  );
};
