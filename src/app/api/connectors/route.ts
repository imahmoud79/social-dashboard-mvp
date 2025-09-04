import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectorRegistry } from '@/lib/connectors';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const statuses = connectorRegistry.getConnectorStatuses();
    return NextResponse.json(statuses);
  } catch (error) {
    console.error('Connectors fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connector statuses' },
      { status: 500 }
    );
  }
} 