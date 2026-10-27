import React from 'react';
import { Code2 } from 'lucide-react';

const DAX_MEASURES = [
  { name: 'Total Campaigns', code: 'DISTINCTCOUNT(Campaigns[Campaign_ID])' },
  { name: 'Total Clicks', code: 'SUM(Campaigns[Clicks])' },
  { name: 'Total Impressions', code: 'SUM(Campaigns[Impressions])' },
  { name: 'CTR %', code: 'DIVIDE([Total Clicks], [Total Impressions], 0) * 100' },
  { name: 'Avg Conversion Rate', code: 'AVERAGE(Campaigns[Conversion_Rate])' },
  { name: 'Avg ROI', code: 'AVERAGE(Campaigns[ROI])' },
  { name: 'Avg Acquisition Cost', code: 'AVERAGE(Campaigns[Acquisition_Cost])' },
  { name: 'Avg Engagement', code: 'AVERAGE(Campaigns[Engagement_Score])' },
  { name: 'Avg ROI by Channel', code: 'CALCULATE([Avg ROI], ALLEXCEPT(Campaigns, Campaigns[Channel_Used]))' },
  { name: 'Channel Rank', code: 'RANKX(ALL(Campaigns[Channel_Used]), [Avg ROI], , DESC, Dense)' },
  { name: 'Clicks LY', code: "CALCULATE([Total Clicks], SAMEPERIODLASTYEAR('Date'[Date]))" }
];

export const DaxTicker: React.FC = () => {
  return (
    <div className="bg-brand-navy text-white text-xs overflow-hidden flex items-stretch border-b border-brand-teal/30 select-none">
      <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-brand-lime text-brand-navy font-black tracking-wider text-[11px] uppercase flex-shrink-0 z-10 shadow-md">
        <Code2 className="w-3.5 h-3.5" />
        <span>DAX MODEL</span>
      </div>
      <div className="overflow-hidden flex-1 relative flex items-center">
        <div className="animate-ticker py-2">
          {[...DAX_MEASURES, ...DAX_MEASURES].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 font-mono whitespace-nowrap px-4 text-[11px]">
              <span className="text-brand-lime font-bold">{item.name}</span>
              <span className="text-brand-pale">=</span>
              <span className="text-white/90">{item.code}</span>
              <span className="text-brand-mint pl-3">●</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
