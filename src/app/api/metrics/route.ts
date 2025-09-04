import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const since = new Date();
    since.setDate(since.getDate() - days);

    const whereClause: any = {
      ts: {
        gte: since,
      },
    };

    if (campaignId) {
      whereClause.campaignId = campaignId;
    }

    const metrics = await prisma.metric.findMany({
      where: whereClause,
      orderBy: {
        ts: 'asc',
      },
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Metrics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
} 