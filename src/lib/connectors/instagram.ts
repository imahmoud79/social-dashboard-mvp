import { Connector, Metric } from './types';

export class InstagramConnector implements Connector {
  id = 'instagram' as const;

  async getProfile(): Promise<any> {
    // Stub - requires Instagram Business Account + Facebook App
    return {
      id: 'demo-ig',
      username: 'amg_cha_demo',
      followers_count: 8750,
      media_count: 245,
    };
  }

  async getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]> {
    // Stub implementation - coming soon
    const metrics: Metric[] = [];
    const daysDiff = Math.ceil((params.until.getTime() - params.since.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(params.since);
      date.setDate(date.getDate() + i);
      
      if (params.metrics.includes('impressions')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'impressions',
          value: Math.floor(5000 + Math.random() * 1500),
          meta: { platform: 'instagram', type: 'story_post' },
        });
      }
    }

    return metrics;
  }
} 