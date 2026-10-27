import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  type?: 'number' | 'currency' | 'percent' | 'multiple' | 'mixed';
  hint?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  label,
  hint = 'Click to filter dashboard'
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formatValue = (name: string, value: any) => {
    const n = Number(value);
    if (isNaN(n)) return value;

    const lowerName = (name || '').toLowerCase();
    if (lowerName.includes('ctr') || lowerName.includes('conversion') || lowerName.includes('conv') || lowerName.includes('%') || lowerName.includes('rate')) {
      return `${n.toFixed(2)}%`;
    }
    if (lowerName.includes('roi')) {
      return `${n.toFixed(2)}x`;
    }
    if (lowerName.includes('cac') || lowerName.includes('cost') || lowerName.includes('spend')) {
      return `$${Math.round(n).toLocaleString()}`;
    }
    if (lowerName.includes('click') || lowerName.includes('impression') || lowerName.includes('count') || lowerName.includes('campaign')) {
      if (n >= 1_000_000) {
        return `${(n / 1_000_000).toFixed(2)}M (${n.toLocaleString()})`;
      }
      return n.toLocaleString();
    }
    if (lowerName.includes('engagement') || lowerName.includes('score')) {
      return `${n.toFixed(1)} / 10`;
    }
    return n.toLocaleString();
  };

  const formatLabel = (rawName: string) => {
    const map: Record<string, string> = {
      clicks: 'Total Clicks',
      impressions: 'Total Impressions',
      ctr: 'CTR %',
      avg_conversion: 'Conversion Rate',
      avg_roi: 'Avg ROI',
      avg_cac: 'Avg CAC',
      avg_engagement: 'Engagement Score',
      count: 'Campaigns'
    };
    return map[rawName] || rawName;
  };

  return (
    <div className="bg-slate-900/95 dark:bg-brand-darkBg/95 backdrop-blur-md text-white border border-slate-700/80 dark:border-brand-teal/40 rounded-xl p-3.5 shadow-2xl min-w-[200px] text-xs transition-all pointer-events-none z-50">
      {label && (
        <div className="font-black text-sm text-brand-lime border-b border-slate-700/60 dark:border-brand-darkBorder/80 pb-2 mb-2 flex items-center justify-between">
          <span>{label}</span>
        </div>
      )}

      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span 
                className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                style={{ backgroundColor: entry.color || entry.fill || '#76C893' }}
              />
              <span className="font-medium text-slate-300">
                {formatLabel(entry.name)}:
              </span>
            </div>
            <span className="font-bold text-white font-mono">
              {formatValue(entry.name, entry.value)}
            </span>
          </div>
        ))}
      </div>

      {hint && (
        <div className="mt-2.5 pt-2 border-t border-slate-800 dark:border-brand-darkBorder/60 text-[10px] text-brand-mint/90 flex items-center gap-1 font-semibold">
          <span>👆</span>
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
};
