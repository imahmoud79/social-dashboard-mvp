import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CampaignDetailsClient } from '@/components/CampaignDetailsClient';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CampaignDetailsPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <CampaignDetailsClient campaignId={id} />;
} 