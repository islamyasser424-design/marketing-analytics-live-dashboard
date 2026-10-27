import React, { useState, useEffect, useMemo } from 'react';
import marketingData from './data/marketing_data.json';
import { MarketingDataset, FilterState, TabType } from './types';
import { Header } from './components/Header';
import { DaxTicker } from './components/DaxTicker';
import { Navigation } from './components/Navigation';
import { FiltersBar } from './components/FiltersBar';
import { KpiCards } from './components/KpiCards';
import { OverviewView } from './components/views/OverviewView';
import { ChannelsView } from './components/views/ChannelsView';
import { CampaignsView } from './components/views/CampaignsView';
import { AudiencesView } from './components/views/AudiencesView';
import { GeographyView } from './components/views/GeographyView';
import { TrendsView } from './components/views/TrendsView';
import { ExplorerView } from './components/views/ExplorerView';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const data = marketingData as unknown as MarketingDataset;

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marketpulse-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('marketpulse-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('marketpulse-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Active Tab (dax tab is removed per user request)
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    channel: 'all',
    campaignType: 'all',
    audience: 'all',
    location: 'all',
    search: '',
  });

  // Cross-filtering Handlers (Toggle on click)
  const handleSelectChannel = (channel: string) => {
    setFilters(prev => ({
      ...prev,
      channel: prev.channel === channel ? 'all' : channel
    }));
  };

  const handleSelectType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      campaignType: prev.campaignType === type ? 'all' : type
    }));
  };

  const handleSelectAudience = (audience: string) => {
    setFilters(prev => ({
      ...prev,
      audience: prev.audience === audience ? 'all' : audience
    }));
  };

  const handleSelectLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location === location ? 'all' : location
    }));
  };

  // Extract unique filter options from data
  const channels = useMemo(() => data.by_channel.map(c => c.name), [data]);
  const types = useMemo(() => data.by_type.map(t => t.name), [data]);
  const audiences = useMemo(() => data.by_audience.map(a => a.name), [data]);
  const locations = useMemo(() => data.by_location.map(l => l.name), [data]);

  // Dynamic KPIs adjusted when filters are active
  const activeKpis = useMemo(() => {
    // If only Channel is filtered, use exact channel aggregate
    if (filters.channel !== 'all' && filters.campaignType === 'all' && filters.audience === 'all' && filters.location === 'all') {
      const match = data.by_channel.find(c => c.name === filters.channel);
      if (match) {
        return {
          total_campaigns: match.count,
          total_clicks: match.clicks,
          total_impressions: match.impressions,
          ctr: match.ctr,
          avg_conversion_rate: match.avg_conversion,
          avg_roi: match.avg_roi,
          avg_cac: match.avg_cac || data.kpis.avg_cac,
          avg_engagement: match.avg_engagement || data.kpis.avg_engagement
        };
      }
    }

    // If only Campaign Type is filtered
    if (filters.campaignType !== 'all' && filters.channel === 'all' && filters.audience === 'all' && filters.location === 'all') {
      const match = data.by_type.find(t => t.name === filters.campaignType);
      if (match) {
        return {
          total_campaigns: match.count,
          total_clicks: match.clicks,
          total_impressions: match.impressions,
          ctr: match.ctr,
          avg_conversion_rate: match.avg_conversion,
          avg_roi: match.avg_roi,
          avg_cac: match.avg_cac || data.kpis.avg_cac,
          avg_engagement: data.kpis.avg_engagement
        };
      }
    }

    // If only Audience is filtered
    if (filters.audience !== 'all' && filters.channel === 'all' && filters.campaignType === 'all' && filters.location === 'all') {
      const match = data.by_audience.find(a => a.name === filters.audience);
      if (match) {
        return {
          total_campaigns: match.count,
          total_clicks: match.clicks,
          total_impressions: match.impressions,
          ctr: match.ctr,
          avg_conversion_rate: match.avg_conversion,
          avg_roi: match.avg_roi,
          avg_cac: data.kpis.avg_cac,
          avg_engagement: match.avg_engagement || data.kpis.avg_engagement
        };
      }
    }

    // If only Location is filtered
    if (filters.location !== 'all' && filters.channel === 'all' && filters.campaignType === 'all' && filters.audience === 'all') {
      const match = data.by_location.find(l => l.name === filters.location);
      if (match) {
        return {
          total_campaigns: match.count,
          total_clicks: match.clicks,
          total_impressions: match.impressions,
          ctr: match.ctr,
          avg_conversion_rate: match.avg_conversion,
          avg_roi: match.avg_roi,
          avg_cac: match.avg_cac || data.kpis.avg_cac,
          avg_engagement: data.kpis.avg_engagement
        };
      }
    }

    // If multiple filters are active, compute over sample records
    if (filters.channel !== 'all' || filters.campaignType !== 'all' || filters.audience !== 'all' || filters.location !== 'all') {
      const matches = data.sample_records.filter(r => {
        if (filters.channel !== 'all' && r.channel !== filters.channel) return false;
        if (filters.campaignType !== 'all' && r.type !== filters.campaignType) return false;
        if (filters.audience !== 'all' && r.audience !== filters.audience) return false;
        if (filters.location !== 'all' && r.location !== filters.location) return false;
        return true;
      });

      if (matches.length > 0) {
        const clicks = matches.reduce((sum, r) => sum + r.clicks, 0);
        const imps = matches.reduce((sum, r) => sum + r.impressions, 0);
        const conv = matches.reduce((sum, r) => sum + r.conversion_rate, 0) / matches.length;
        const roi = matches.reduce((sum, r) => sum + r.roi, 0) / matches.length;
        const cac = matches.reduce((sum, r) => sum + r.cac, 0) / matches.length;
        const eng = matches.reduce((sum, r) => sum + r.engagement, 0) / matches.length;

        return {
          total_campaigns: matches.length * 200, // approximate extrapolation
          total_clicks: clicks * 200,
          total_impressions: imps * 200,
          ctr: imps > 0 ? Number(((clicks / imps) * 100).toFixed(2)) : 0,
          avg_conversion_rate: Number(conv.toFixed(2)),
          avg_roi: Number(roi.toFixed(2)),
          avg_cac: Number(cac.toFixed(2)),
          avg_engagement: Number(eng.toFixed(1))
        };
      }
    }

    return data.kpis;
  }, [data, filters]);

  // Export to CSV
  const handleExport = () => {
    const recordsToExport = data.sample_records.filter(r => {
      if (filters.channel !== 'all' && r.channel !== filters.channel) return false;
      if (filters.campaignType !== 'all' && r.type !== filters.campaignType) return false;
      if (filters.audience !== 'all' && r.audience !== filters.audience) return false;
      if (filters.location !== 'all' && r.location !== filters.location) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!r.company.toLowerCase().includes(q) && !r.channel.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    if (recordsToExport.length === 0) {
      alert('No records match your filter criteria.');
      return;
    }

    const headers = ['ID', 'Company', 'Channel', 'Type', 'Audience', 'Duration', 'Location', 'Clicks', 'Impressions', 'CTR_%', 'Conversion_%', 'ROI', 'CAC', 'Date'];
    const rows = recordsToExport.map(r => [
      r.id,
      `"${r.company.replace(/"/g, '""')}"`,
      r.channel,
      r.type,
      r.audience,
      r.duration,
      r.location,
      r.clicks,
      r.impressions,
      r.ctr,
      r.conversion_rate,
      r.roi,
      r.cac,
      r.date
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `marketpulse_campaigns_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-brand-lightBg dark:bg-brand-darkBg text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      
      {/* Header with MarketPulse Logo */}
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        onExport={handleExport}
        lastUpdated={data.meta.generated_at}
      />

      {/* DAX Live Formula Ticker */}
      <DaxTicker />

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex-1 w-full">
        
        {/* Filters Bar with Active Cross-Filter Tags */}
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          channels={channels}
          types={types}
          audiences={audiences}
          locations={locations}
        />

        {/* Executive Scorecards (Dynamically updated on chart clicks) */}
        <KpiCards kpis={activeKpis} />

        {/* Tab View Routing */}
        <div className="mt-4">
          {activeTab === 'overview' && (
            <OverviewView 
              data={data} 
              filters={filters}
              onSelectChannel={handleSelectChannel}
              onSelectType={handleSelectType}
              onSelectAudience={handleSelectAudience}
            />
          )}
          {activeTab === 'channels' && (
            <ChannelsView 
              data={data} 
              filters={filters}
              onSelectChannel={handleSelectChannel}
            />
          )}
          {activeTab === 'campaigns' && (
            <CampaignsView 
              data={data} 
              filters={filters}
              onSelectType={handleSelectType}
            />
          )}
          {activeTab === 'audiences' && (
            <AudiencesView 
              data={data} 
              filters={filters}
              onSelectAudience={handleSelectAudience}
            />
          )}
          {activeTab === 'geography' && (
            <GeographyView 
              data={data} 
              filters={filters}
              onSelectLocation={handleSelectLocation}
            />
          )}
          {activeTab === 'trends' && <TrendsView data={data} />}
          {activeTab === 'explorer' && (
            <ExplorerView 
              records={data.sample_records} 
              filters={filters} 
              onExport={handleExport} 
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
