export interface KPI {
  total_campaigns: number;
  total_clicks: number;
  total_impressions: number;
  ctr: number;
  avg_conversion_rate: number;
  avg_roi: number;
  avg_cac: number;
  avg_engagement: number;
}

export interface CategoryMetric {
  name: string;
  count: number;
  clicks: number;
  impressions: number;
  ctr: number;
  avg_roi: number;
  avg_conversion: number;
  avg_cac?: number;
  avg_engagement?: number;
  rank?: number;
}

export interface MonthlyMetric {
  month: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avg_roi: number;
  avg_conversion: number;
  avg_cac: number;
  count: number;
}

export interface CampaignRecord {
  id: string;
  company: string;
  type: string;
  audience: string;
  duration: string;
  channel: string;
  conversion_rate: number;
  cac: number;
  roi: number;
  location: string;
  language: string;
  clicks: number;
  impressions: number;
  ctr: number;
  engagement: number;
  segment: string;
  date: string;
}

export interface MarketingInsight {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'positive' | 'neutral' | 'insight';
}

export interface MarketingDataset {
  meta: {
    generated_at: string;
    dataset_name: string;
    date_range: string;
  };
  kpis: KPI;
  by_channel: CategoryMetric[];
  by_type: CategoryMetric[];
  by_audience: CategoryMetric[];
  by_segment: CategoryMetric[];
  by_location: CategoryMetric[];
  by_language: CategoryMetric[];
  by_duration: CategoryMetric[];
  by_month: MonthlyMetric[];
  insights: MarketingInsight[];
  sample_records: CampaignRecord[];
}

export interface FilterState {
  channel: string;
  campaignType: string;
  audience: string;
  location: string;
  search: string;
}

export type TabType = 
  | 'overview' 
  | 'channels' 
  | 'campaigns' 
  | 'audiences' 
  | 'geography' 
  | 'trends' 
  | 'explorer' 
  | 'dax';
