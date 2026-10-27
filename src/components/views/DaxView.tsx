import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode2, BookOpen } from 'lucide-react';

interface DaxItem {
  name: string;
  formula: string;
  description: string;
  category: string;
}

const DAX_DEFINITIONS: DaxItem[] = [
  {
    name: 'Total Campaigns',
    formula: 'Total Campaigns = DISTINCTCOUNT(Campaigns[Campaign_ID])',
    description: 'Counts unique campaign records across all marketing channels and dates.',
    category: 'Core Aggregation'
  },
  {
    name: 'Total Clicks',
    formula: 'Total Clicks = SUM(Campaigns[Clicks])',
    description: 'Sum of user clicks generated across all active campaigns.',
    category: 'Volume Metric'
  },
  {
    name: 'Total Impressions',
    formula: 'Total Impressions = SUM(Campaigns[Impressions])',
    description: 'Sum of total ad impressions displayed to users across platforms.',
    category: 'Volume Metric'
  },
  {
    name: 'CTR %',
    formula: 'CTR % = DIVIDE([Total Clicks], [Total Impressions], 0) * 100',
    description: 'Safe division calculating Click-Through Rate as an explicit percentage.',
    category: 'Yield & Efficiency'
  },
  {
    name: 'Avg Conversion Rate',
    formula: 'Avg Conversion Rate = AVERAGE(Campaigns[Conversion_Rate])',
    description: 'Unweighted mean of campaign conversion rates recorded.',
    category: 'Yield & Efficiency'
  },
  {
    name: 'Avg ROI (as provided)',
    formula: 'Avg ROI (as provided) = AVERAGE(Campaigns[ROI])',
    description: 'Averaged return on investment multiple (unit as provided in dataset).',
    category: 'Financial Yield'
  },
  {
    name: 'Avg Acquisition Cost',
    formula: 'Avg Acquisition Cost = AVERAGE(Campaigns[Acquisition_Cost])',
    description: 'Per-customer average acquisition cost (never presented as sum).',
    category: 'Financial Yield'
  },
  {
    name: 'Avg Engagement',
    formula: 'Avg Engagement = AVERAGE(Campaigns[Engagement_Score])',
    description: 'Normalized audience engagement score on a 1-10 scale.',
    category: 'Audience Metrics'
  },
  {
    name: 'Avg ROI by Channel',
    formula: 'Avg ROI by Channel = CALCULATE([Avg ROI (as provided)], ALLEXCEPT(Campaigns, Campaigns[Channel_Used]))',
    description: 'Calculates channel-specific benchmark ROI while ignoring local filters.',
    category: 'Advanced Context'
  },
  {
    name: 'Channel Rank',
    formula: 'Channel Rank = RANKX(ALL(Campaigns[Channel_Used]), [Avg ROI (as provided)], , DESC, Dense)',
    description: 'Ranks channels descending by average ROI with dense tie breaking.',
    category: 'Advanced Context'
  },
  {
    name: 'Clicks LY',
    formula: "Clicks LY = CALCULATE([Total Clicks], SAMEPERIODLASTYEAR('Date'[Date]))",
    description: 'Time intelligence measure comparing total clicks against previous period.',
    category: 'Time Intelligence'
  }
];

export const DaxView: React.FC = () => {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleCopy = (formula: string, name: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-sea" />
          <span>DAX Formula & Dimensional Modeling Engine</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The exact DAX expressions powering MarketPulse Analytics in Power BI with full formula syntax
        </p>
      </div>

      {/* Grid of DAX Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DAX_DEFINITIONS.map((dax) => {
          const isCopied = copiedName === dax.name;
          return (
            <div
              key={dax.name}
              className="bg-white dark:bg-brand-darkCard rounded-2xl p-4 sm:p-5 border border-brand-pale/40 dark:border-brand-darkBorder shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-lightBg dark:bg-brand-navy/60 text-brand-navy dark:text-brand-lime">
                    {dax.category}
                  </span>
                  <button
                    onClick={() => handleCopy(dax.formula, dax.name)}
                    className="flex items-center gap-1 text-[11px] font-bold text-brand-navy dark:text-brand-lime hover:underline"
                    title="Copy DAX measure formula"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy DAX</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2">
                  {dax.name}
                </h3>

                {/* Code block */}
                <div className="p-3 rounded-xl bg-slate-900 text-brand-lime font-mono text-xs overflow-x-auto border border-slate-800 mb-3 select-all">
                  <code>{dax.formula}</code>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {dax.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-brand-darkBorder/40 flex items-center justify-between text-[10px] text-slate-400">
                <span>Power BI / Analysis Services</span>
                <span>DAX Standard 2.0</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Best Practices Note */}
      <div className="p-4 rounded-2xl bg-brand-lightBg dark:bg-brand-navy/30 border border-brand-pale/50 dark:border-brand-teal/30 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-brand-sea shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <p className="font-bold text-brand-navy dark:text-brand-lime">
            Star Schema & Date Table Note:
          </p>
          <p>
            Campaigns and 'Date' are model tables. Time-intelligence measures (such as <code>Clicks LY</code>) require a dedicated contiguous date table marked as the Date table in Power BI with active 1:* relationships.
          </p>
        </div>
      </div>

    </div>
  );
};
