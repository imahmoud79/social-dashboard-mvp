import { YouTubeConnector } from './youtube';
import { FacebookConnector } from './facebook';
import { InstagramConnector } from './instagram';
import { TikTokConnector } from './tiktok';
import { XConnector } from './x';
import { ConnectorStatus } from './types';

export class ConnectorRegistry {
  private connectors = new Map();

  constructor() {
    // Initialize connectors based on available environment variables
    if (process.env.YOUTUBE_API_KEY) {
      this.connectors.set('youtube', new YouTubeConnector(process.env.YOUTUBE_API_KEY));
    }
    
    if (process.env.FACEBOOK_ACCESS_TOKEN) {
      this.connectors.set('facebook', new FacebookConnector(process.env.FACEBOOK_ACCESS_TOKEN));
    }

    // Stubs for other platforms
    this.connectors.set('instagram', new InstagramConnector());
    this.connectors.set('tiktok', new TikTokConnector());
    this.connectors.set('x', new XConnector());
  }

  getConnector(platform: string) {
    return this.connectors.get(platform);
  }

  getConnectorStatuses(): ConnectorStatus[] {
    return [
      {
        id: 'youtube',
        name: 'YouTube',
        status: process.env.YOUTUBE_API_KEY ? 'connected' : 'auth_required',
        description: process.env.YOUTUBE_API_KEY ? 'API key configured' : 'Requires YouTube Data API v3 key',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        status: process.env.FACEBOOK_ACCESS_TOKEN ? 'connected' : 'auth_required',
        description: process.env.FACEBOOK_ACCESS_TOKEN ? 'Page access token configured' : 'Requires Facebook Page access token',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        status: 'coming_soon',
        description: 'Instagram Business API - pending Facebook App setup',
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        status: 'coming_soon',
        description: 'TikTok Business API - pending approval',
      },
      {
        id: 'x',
        name: 'X (Twitter)',
        status: 'coming_soon',
        description: 'X API v2 - requires paid tier',
      },
    ];
  }
}

export const connectorRegistry = new ConnectorRegistry(); 