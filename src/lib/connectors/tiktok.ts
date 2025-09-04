import { Connector, Metric } from './types';

export class TikTokConnector implements Connector {
  id = 'tiktok' as const;

  async getProfile(): Promise<any> {
    // Stub - requires TikTok Business API access
    return {
      id: 'demo-tiktok',
      username: 'amg_cha_demo',
      follower_count: 15200,
      video_count: 89,
    };
  }

  async getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]> {
    // Stub implementation - pending API approval
    const metrics: Metric[] = [];
    const daysDiff = Math.ceil((params.until.getTime() - params.since.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(params.since);
      date.setDate(date.getDate() + i);
      
      if (params.metrics.includes('views')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'views',
          value: Math.floor(25000 + Math.random() * 10000),
          meta: { platform: 'tiktok', type: 'video_views' },
        });
      }
    }

    return metrics;
  }
} 