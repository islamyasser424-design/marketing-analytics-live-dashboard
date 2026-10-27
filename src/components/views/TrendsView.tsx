import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';

interface TrendsViewProps {
  data: MarketingDataset;
}

export const TrendsView: React.FC<TrendsViewProps> = ({ data }) => {
  const { by_month } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-sea" />
          <span>Timeline Analytics & Monthly Progression</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Monthly seasonality, audience engagement momentum, and CAC evolution across 2021
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CTR & Conversion Rate Multi-Line */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-teal" />
            <span>Yield Rates over Time (CTR vs Conversion %)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Track responsiveness shifts across the calendar year
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={by_month} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[6, 12]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip hint="Monthly rate tracking" />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="ctr" stroke="#184E77" strokeWidth={2.5} dot={{ r: 3 }} name="ctr" />
                <Line type="monotone" dataKey="avg_conversion" stroke="#52B69A" strokeWidth={2.5} dot={{ r: 3 }} name="avg_conversion" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acquisition Cost Evolution */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-brand-accent" />
            <span>Customer Acquisition Cost (CAC) Trend</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Average monthly spend required per acquired customer
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={by_month} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cacGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A759F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1A759F" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
                <Tooltip content={<CustomTooltip hint="Average customer acquisition cost" />} />
                <Area type="monotone" dataKey="avg_cac" name="avg_cac" stroke="#1A759F" strokeWidth={2.5} fill="url(#cacGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Monthly Data Table */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-brand-darkBorder flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white">
            Monthly Performance Table
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            12 Months (2021)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-brand-darkBg/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-brand-darkBorder">
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-4 text-right">Active Campaigns</th>
                <th className="py-3 px-4 text-right">Total Clicks</th>
                <th className="py-3 px-4 text-right">Total Impressions</th>
                <th className="py-3 px-4 text-right">CTR</th>
                <th className="py-3 px-4 text-right">Conversion Rate</th>
                <th className="py-3 px-4 text-right">Avg ROI</th>
                <th className="py-3 px-4 text-right">Avg CAC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {by_month.map((m) => (
                <tr key={m.month} className="hover:bg-brand-lightBg/50 dark:hover:bg-brand-navy/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-brand-lime">
                    {m.month}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                    {m.count.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700 dark:text-slate-200">
                    {(m.clicks / 1_000_000).toFixed(2)}M
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700 dark:text-slate-200">
                    {(m.impressions / 1_000_000).toFixed(1)}M
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-brand-sea dark:text-brand-mint">
                    {m.ctr}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-700 dark:text-slate-200">
                    {m.avg_conversion}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-brand-navy dark:text-brand-lime">
                    {m.avg_roi}x
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                    ${Math.round(m.avg_cac).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
