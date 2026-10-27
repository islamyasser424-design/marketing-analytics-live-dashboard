import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Lightbulb, TrendingUp, Award, DollarSign, Target, CheckCircle2 } from 'lucide-react';

interface OverviewViewProps {
  data: MarketingDataset;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ data }) => {
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
            className="p-4 rounded-2xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-lime/30 text-brand-navy dark:bg-brand-mint/20 dark:text-brand-lime">
                  {ins.category}
                </span>
                <Lightbulb className="w-3.5 h-3.5 text-brand-sea" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-navy dark:text-white mb-1.5">
                {ins.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ins.description}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-brand-darkBorder/50 flex items-center text-[10px] font-semibold text-brand-teal dark:text-brand-mint">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>Automated Model Insight</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Performance Area Chart */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-brand-navy dark:text-white">
                Monthly Performance & Volume
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Clicks and Impressions trajectory across 2021
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-lightBg dark:bg-brand-navy/60 text-brand-navy dark:text-brand-lime">
              Full Year
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={by_month} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#184E77" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#184E77" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#76C893" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#76C893" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip 
                  formatter={(val: any, name: string) => [Number(val).toLocaleString(), name === 'clicks' ? 'Total Clicks' : 'Total Impressions']} 
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#184E77" strokeWidth={2.5} fillOpacity={1} fill="url(#clickGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel ROI Comparison Bar Chart */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-brand-navy dark:text-white">
                Channel Return on Investment (ROI)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Average ROI multiple by marketing channel
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-lightBg dark:bg-brand-navy/60 text-brand-navy dark:text-brand-lime">
              Ranked
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_channel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 7]} tickFormatter={(v) => `${v}x`} />
                <Tooltip 
                  formatter={(val: any) => [`${val}x`, 'Avg ROI']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg_roi" fill="#52B69A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Highlights Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-lime/30 text-brand-navy dark:bg-brand-navy dark:text-brand-lime flex items-center justify-center font-bold flex-shrink-0">
            <Award className="w-6 h-6 text-brand-sea" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400">Top Performing Channel</div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topChannel?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topChannel?.avg_roi}x ROI • {topChannel?.ctr}% CTR</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-mint/20 text-brand-navy dark:bg-brand-navy dark:text-brand-mint flex items-center justify-center font-bold flex-shrink-0">
            <Target className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400">Leading Campaign Type</div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topType?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topType?.count.toLocaleString()} Campaigns • {topType?.avg_roi}x ROI</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-accent/15 text-brand-navy dark:bg-brand-navy dark:text-brand-accent flex items-center justify-center font-bold flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400">Highest Engagement Segment</div>
            <div className="text-base font-black text-brand-navy dark:text-white">{topAudience?.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{topAudience?.avg_conversion}% Conversion • {topAudience?.avg_engagement}/10 Score</div>
          </div>
        </div>

      </div>

    </div>
  );
};
