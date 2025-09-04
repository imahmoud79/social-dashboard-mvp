import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { connectorRegistry } from '@/lib/connectors';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    const youtubeConnector = connectorRegistry.getConnector('youtube');
    
    if (!youtubeConnector) {
      return NextResponse.json(
        { error: 'YouTube connector not configured' },
        { status: 400 }
      );
    }

    // Find or create demo campaign
    let campaign = await prisma.campaign.findFirst({
      where: {
        name: 'YouTube AMG Demo',
        platform: 'youtube',
      },
    });

    if (!campaign) {
      campaign = await prisma.campaign.create({
        data: {
          name: 'YouTube AMG Demo',
          platform: 'youtube',
          cost: 5000.0,
          revenue: 12000.0,
        },
      });
    }

    // Calculate date range
    const until = new Date();
    const since = new Date();
    since.setDate(since.getDate() - days);

    // Fetch metrics
    const metrics = await youtubeConnector.getMetrics({
      since,
      until,
      metrics: ['views', 'subscribers', 'videos'],
    });

    // Store metrics in database
    const storedMetrics = await Promise.all(
      metrics.map((metric) =>
        prisma.metric.upsert({
          where: {
            campaignId_ts_key: {
              campaignId: campaign.id,
              ts: new Date(metric.ts),
              key: metric.key,
            },
          },
          update: {
            value: metric.value,
            meta: metric.meta,
          },
          create: {
            campaignId: campaign.id,
            ts: new Date(metric.ts),
            key: metric.key,
            value: metric.value,
            meta: metric.meta,
          },
        })
      )
    );

    return NextResponse.json({
      message: 'Metrics ingested successfully',
      campaignId: campaign.id,
      metricsCount: storedMetrics.length,
      dateRange: { since, until },
    });
  } catch (error) {
    console.error('YouTube ingestion error:', error);
    return NextResponse.json(
      { error: 'Failed to ingest YouTube metrics' },
      { status: 500 }
    );
  }
} 