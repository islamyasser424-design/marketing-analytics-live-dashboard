import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Globe, MapPin, Languages } from 'lucide-react';

interface GeographyViewProps {
  data: MarketingDataset;
}

export const GeographyView: React.FC<GeographyViewProps> = ({ data }) => {
  const { by_location, by_language } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-sea" />
          <span>Geographic Markets & Language Dynamics</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cross-regional campaign execution, localized conversion rates and metropolitan cost profiles
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Location Performance */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-teal" />
            <span>Top Metropolitan Markets (Campaigns & CTR)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Regional campaign concentration and click efficiency
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_location} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(val: any, name: string) => [`${val}%`, name === 'ctr' ? 'CTR' : 'Conversion Rate']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="ctr" fill="#184E77" radius={[6, 6, 0, 0]} name="CTR %" />
                <Bar dataKey="avg_conversion" fill="#52B69A" radius={[6, 6, 0, 0]} name="Conversion Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Performance */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <Languages className="w-4 h-4 text-brand-accent" />
            <span>Language Localization ROI</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Campaign returns by localized ad copy language
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_language} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 6]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}x`} />
                <Tooltip 
                  formatter={(val: any) => [`${val}x`, 'Avg ROI']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg_roi" fill="#76C893" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Locations Table */}
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-brand-darkBorder flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white">
            Market Location Breakdown
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {by_location.length} Active Metropolitan Regions
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-brand-darkBorder/40">
              {by_location.map((loc) => (
                <tr key={loc.name} className="hover:bg-brand-lightBg/50 dark:hover:bg-brand-navy/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-sea" />
                    <span>{loc.name}</span>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
