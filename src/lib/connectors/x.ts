import { Connector, Metric } from './types';

export class XConnector implements Connector {
  id = 'x' as const;

  async getProfile(): Promise<any> {
    // Stub - requires X API v2 (paid tier)
    return {
      id: 'demo-x',
      username: 'amg_cha_demo',
      followers_count: 6800,
      tweet_count: 1240,
    };
  }

  async getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]> {
    // Stub implementation - requires paid X API tier
    const metrics: Metric[] = [];
    const daysDiff = Math.ceil((params.until.getTime() - params.since.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(params.since);
      date.setDate(date.getDate() + i);
      
      if (params.metrics.includes('impressions')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'impressions',
          value: Math.floor(12000 + Math.random() * 5000),
          meta: { platform: 'x', type: 'tweet_impressions' },
        });
      }

      if (params.metrics.includes('engagements')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'engagements',
          value: Math.floor(800 + Math.random() * 400),
          meta: { platform: 'x', type: 'likes_retweets_replies' },
        });
      }
    }

    return metrics;
  }
} 