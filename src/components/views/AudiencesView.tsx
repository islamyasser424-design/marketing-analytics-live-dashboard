import React from 'react';
import { MarketingDataset } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Users, HeartHandshake, Sparkles } from 'lucide-react';

interface AudiencesViewProps {
  data: MarketingDataset;
}

export const AudiencesView: React.FC<AudiencesViewProps> = ({ data }) => {
  const { by_audience, by_segment } = data;

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-sea" />
          <span>Audience Demographics & Segment Resonance</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Analyze conversion, engagement and acquisition costs across age groups and behavioral segments
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Segment ROI & Volume */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-teal" />
            <span>Behavioral Segments (Conversion & Volume)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Performance yield across consumer affinity groups
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_segment} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(val: any, name: string) => [name === 'avg_conversion' ? `${val}%` : `${val}x`, name === 'avg_conversion' ? 'Conversion Rate' : 'Avg ROI']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="avg_conversion" fill="#34A0A4" name="Conversion Rate %" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avg_roi" fill="#76C893" name="Avg ROI (Multiple)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Target Audience Age Demographics */}
        <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-1 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-brand-accent" />
            <span>Demographic Cohorts (Engagement Score)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Audience engagement level rated out of 10
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={by_audience} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}/10`} />
                <Tooltip 
                  formatter={(val: any) => [`${val} / 10`, 'Engagement Score']}
                  contentStyle={{ backgroundColor: '#184E77', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="avg_engagement" fill="#184E77" radius={[6, 6, 0, 0]} />
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
