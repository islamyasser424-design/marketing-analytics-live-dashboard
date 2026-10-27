import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Share2, ArrowUpRight, TrendingUp } from 'lucide-react';

interface ChannelsViewProps {
  data: MarketingDataset;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({ data }) => {
  const { by_channel } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-sea" />
            <span>Channel Performance & Ranking</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare acquisition efficiency, click volume, and ROI rank across marketing channels
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversion Rate vs CTR */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1">
            Conversion Rate vs CTR (%)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Yield comparison by distribution platform
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_channel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(val: any, name: string) => [`${val}%`, name === 'ctr' ? 'CTR' : 'Conversion Rate']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ctr" fill="#184E77" name="CTR %" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avg_conversion" fill="#76C893" name="Conversion Rate %" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acquisition Cost (CAC) by Channel */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1">
            Customer Acquisition Cost (Avg CAC)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Unweighted average spend required per conversion
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_channel} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Avg CAC']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg_cac" fill="#1A759F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Comprehensive Channel Performance Table */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-brand-darkBorder flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white">
            Channel Metric Matrix (DAX Evaluated)
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {by_channel.map((ch) => (
                <tr key={ch.name} className="hover:bg-brand-lightBg/50 dark:hover:bg-brand-navy/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-brand-lime">
                    #{ch.rank || 1}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-white">
                    {ch.name}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
