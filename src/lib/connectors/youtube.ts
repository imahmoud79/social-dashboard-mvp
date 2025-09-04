import axios from 'axios';
import { Connector, Metric } from './types';

export class YouTubeConnector implements Connector {
  id = 'youtube' as const;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getProfile(): Promise<any> {
    // For demo, we'll use a known channel ID. In production, this would be configurable.
    const channelId = 'UCBJycsmduvYEL83R_U4JriQ'; // Example: Marques Brownlee
    
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet,statistics',
          id: channelId,
          key: this.apiKey,
        },
      });

      return response.data.items[0];
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error('Failed to fetch YouTube profile');
    }
  }

  async getMetrics(params: {
    since: Date;
    until: Date;
    metrics: string[];
  }): Promise<Metric[]> {
    const channelId = 'UCBJycsmduvYEL83R_U4JriQ';
    
    try {
      // Get channel statistics
      const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'statistics',
          id: channelId,
          key: this.apiKey,
        },
      });

      const stats = channelResponse.data.items[0]?.statistics;
      
      if (!stats) {
        throw new Error('No statistics found for channel');
      }

      // For MVP, we'll create daily metrics for the date range
      const metrics: Metric[] = [];
      const daysDiff = Math.ceil((params.until.getTime() - params.since.getTime()) / (1000 * 60 * 60 * 24));
      
      for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(params.since);
        date.setDate(date.getDate() + i);
        
        // Simulate daily variation for demo (in production, use YouTube Analytics API)
        const baseViews = parseInt(stats.viewCount);
        const dailyViews = Math.floor(baseViews / 365 + Math.random() * 1000);
        
        if (params.metrics.includes('views')) {
          metrics.push({
            ts: date.toISOString(),
            key: 'views',
            value: dailyViews,
            meta: { channelId },
          });
        }

        if (params.metrics.includes('subscribers')) {
          metrics.push({
            ts: date.toISOString(),
            key: 'subscribers',
            value: parseInt(stats.subscriberCount),
            meta: { channelId },
          });
        }

        if (params.metrics.includes('videos')) {
          metrics.push({
            ts: date.toISOString(),
            key: 'videos',
            value: parseInt(stats.videoCount),
            meta: { channelId },
          });
        }
      }

      return metrics;
    } catch (error) {
      console.error('YouTube metrics error:', error);
      throw new Error('Failed to fetch YouTube metrics');
    }
  }
} 