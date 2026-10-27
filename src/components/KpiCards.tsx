import React from 'react';
import { KPI } from '../types';
import { 
  Megaphone, 
  MousePointerClick, 
  Eye, 
  Percent, 
  TrendingUp, 
  Coins, 
  Receipt, 
  Sparkles 
} from 'lucide-react';

interface KpiCardsProps {
  kpis: KPI;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
  const cards = [
    {
      title: 'Total Campaigns',
      value: kpis.total_campaigns.toLocaleString(),
      sub: 'Distinct Campaign IDs',
      icon: Megaphone,
      accent: 'border-l-brand-navy dark:border-l-brand-mint',
      iconBg: 'bg-brand-navy/10 text-brand-navy dark:bg-brand-mint/20 dark:text-brand-lime',
      trend: '+100% Verified',
    },
    {
      title: 'Total Clicks',
      value: (kpis.total_clicks / 1_000_000).toFixed(2) + 'M',
      sub: `${kpis.total_clicks.toLocaleString()} aggregate clicks`,
      icon: MousePointerClick,
      accent: 'border-l-brand-sea',
      iconBg: 'bg-brand-sea/10 text-brand-sea dark:bg-brand-sea/20 dark:text-brand-mint',
      trend: 'Traffic Volume',
    },
    {
      title: 'Total Impressions',
      value: (kpis.total_impressions / 1_000_000_000).toFixed(2) + 'B',
      sub: `${(kpis.total_impressions / 1_000_000).toFixed(1)}M impressions`,
      icon: Eye,
      accent: 'border-l-brand-teal',
      iconBg: 'bg-brand-teal/10 text-brand-teal dark:bg-brand-teal/20 dark:text-brand-mint',
      trend: 'Brand Reach',
    },
    {
      title: 'Overall CTR',
      value: `${kpis.ctr}%`,
      sub: 'Clicks / Impressions * 100',
      icon: Percent,
      accent: 'border-l-brand-mint',
      iconBg: 'bg-brand-mint/15 text-brand-navy dark:bg-brand-lime/20 dark:text-brand-lime',
      trend: 'High Engagement',
    },
    {
      title: 'Avg Conversion Rate',
      value: `${kpis.avg_conversion_rate}%`,
      sub: 'Average across campaigns',
      icon: TrendingUp,
      accent: 'border-l-brand-accent',
      iconBg: 'bg-brand-accent/10 text-brand-accent dark:bg-brand-accent/20 dark:text-brand-pale',
      trend: 'Conversion Yield',
    },
    {
      title: 'Avg ROI',
      value: `${kpis.avg_roi.toFixed(2)}x`,
      sub: 'Calculated return multiple',
      icon: Coins,
      accent: 'border-l-brand-lime',
      iconBg: 'bg-brand-lime/20 text-brand-navy dark:bg-brand-navy dark:text-brand-lime',
      trend: 'Portfolio Multiple',
    },
    {
      title: 'Avg Acquisition Cost',
      value: `$${Math.round(kpis.avg_cac).toLocaleString()}`,
      sub: 'Per-customer average cost',
      icon: Receipt,
      accent: 'border-l-brand-blue',
      iconBg: 'bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-brand-pale',
      trend: 'Cost Efficiency',
    },
    {
      title: 'Avg Engagement',
      value: `${kpis.avg_engagement.toFixed(1)} / 10`,
      sub: 'Audience response score',
      icon: Sparkles,
      accent: 'border-l-brand-pale',
      iconBg: 'bg-brand-pale/20 text-brand-navy dark:bg-brand-sea/20 dark:text-brand-lime',
      trend: 'Content Resonance',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className={`bg-white dark:bg-brand-darkCard rounded-2xl p-4 sm:p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm hover:shadow-md transition-all border-l-4 ${c.accent} relative overflow-hidden group`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {c.title}
              </span>
              <div className={`p-2 rounded-xl ${c.iconBg} group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight mb-1">
              {c.value}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <span className="truncate">{c.sub}</span>
              <span className="text-[10px] font-bold text-brand-sea dark:text-brand-mint shrink-0 ml-1">
                {c.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
