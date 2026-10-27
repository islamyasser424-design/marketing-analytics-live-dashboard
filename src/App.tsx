import React, { useState, useEffect, useMemo } from 'react';
import marketingData from './data/marketing_data.json';
import { MarketingDataset, FilterState, TabType, CampaignRecord } from './types';
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
import { DaxView } from './components/views/DaxView';
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

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    channel: 'all',
    campaignType: 'all',
    audience: 'all',
    location: 'all',
    search: '',
  });

  // Extract unique filter options from data
  const channels = useMemo(() => data.by_channel.map(c => c.name), [data]);
  const types = useMemo(() => data.by_type.map(t => t.name), [data]);
  const audiences = useMemo(() => data.by_audience.map(a => a.name), [data]);
  const locations = useMemo(() => data.by_location.map(l => l.name), [data]);

  // Dynamic KPIs adjusted if a channel or type filter is selected
  const activeKpis = useMemo(() => {
    if (filters.channel === 'all' && filters.campaignType === 'all' && filters.audience === 'all' && filters.location === 'all') {
      return data.kpis;
    }

    // Filter sample records or find matching category
    if (filters.channel !== 'all') {
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
        
        {/* Filters Bar */}
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          channels={channels}
          types={types}
          audiences={audiences}
          locations={locations}
        />

        {/* Executive Scorecards */}
        <KpiCards kpis={activeKpis} />

        {/* Tab View Routing */}
        <div className="mt-4">
          {activeTab === 'overview' && <OverviewView data={data} />}
          {activeTab === 'channels' && <ChannelsView data={data} />}
          {activeTab === 'campaigns' && <CampaignsView data={data} />}
          {activeTab === 'audiences' && <AudiencesView data={data} />}
          {activeTab === 'geography' && <GeographyView data={data} />}
          {activeTab === 'trends' && <TrendsView data={data} />}
          {activeTab === 'explorer' && (
            <ExplorerView 
              records={data.sample_records} 
              filters={filters} 
              onExport={handleExport} 
            />
          )}
          {activeTab === 'dax' && <DaxView />}
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
