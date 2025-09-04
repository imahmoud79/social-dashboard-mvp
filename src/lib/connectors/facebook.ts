import { Connector, Metric } from './types';

export class FacebookConnector implements Connector {
  id = 'facebook' as const;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  async getProfile(): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Facebook access token required');
    }

    // Stub implementation - in production, call Facebook Graph API
    return {
      id: 'demo-page',
      name: 'AMG-CHA Demo Page',
      followers_count: 12500,
      category: 'Brand',
    };
  }

  async getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]> {
    if (!this.accessToken) {
      throw new Error('Facebook access token required');
    }

    // Stub implementation with fake data for demo
    const metrics: Metric[] = [];
    const daysDiff = Math.ceil((params.until.getTime() - params.since.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(params.since);
      date.setDate(date.getDate() + i);
      
      if (params.metrics.includes('reach')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'reach',
          value: Math.floor(8000 + Math.random() * 2000),
          meta: { platform: 'facebook', type: 'organic' },
        });
      }

      if (params.metrics.includes('engagement')) {
        metrics.push({
          ts: date.toISOString(),
          key: 'engagement',
          value: Math.floor(400 + Math.random() * 200),
          meta: { platform: 'facebook', type: 'likes_comments_shares' },
        });
      }
    }

    return metrics;
  }
} 