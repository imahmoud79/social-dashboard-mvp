export interface Metric {
  ts: string;
  key: string;
  value: number;
  meta?: Record<string, any>;
}

export interface Connector {
  id: 'youtube' | 'facebook' | 'instagram' | 'tiktok' | 'x';
  getProfile(): Promise<any>;
  getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]>;
}

export interface ConnectorStatus {
  id: string;
  name: string;
  status: 'connected' | 'auth_required' | 'coming_soon';
  description: string;
} 