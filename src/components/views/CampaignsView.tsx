import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Target, Clock, Layers } from 'lucide-react';

interface CampaignsViewProps {
  data: MarketingDataset;
}

const COLORS = ['#184E77', '#1E6091', '#34A0A4', '#52B69A', '#76C893', '#99D98C', '#D9ED92'];

export const CampaignsView: React.FC<CampaignsViewProps> = ({ data }) => {
  const { by_type, by_duration } = data;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-teal" />
          <span>Campaign Architecture & Duration Analysis</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Deconstruct campaign volume, ROI efficiency and duration performance across all formats
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Campaign Type Share & ROI */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-sea" />
            <span>Campaign Type Distribution & Volume</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Campaign allocation across Search, Social, Display, Influencer and Email
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_type} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: any) => [`${Number(val).toLocaleString()} campaigns`, 'Count']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#184E77" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Duration Impact on ROI */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-accent" />
            <span>Duration vs Average ROI Multiplier</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Evaluate whether campaign lifecycle length correlates with higher yield
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_duration} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 6]} tickFormatter={(v) => `${v}x`} tick={{ fontSize: 11 }} />
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

      {/* Summary Cards of Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {by_type.map((t, idx) => (
          <div key={t.name} className="p-4 rounded-xl bg-white dark:bg-brand-darkCard border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Type #{idx+1}
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
        ))}
      </div>

    </div>
  );
};
