import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const passwordHash = await bcrypt.hash('demo123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@amg-cha.com' },
    update: {},
    create: {
      email: 'demo@amg-cha.com',
      passwordHash,
    },
  });

  // Create demo campaigns
  const youtubeCampaign = await prisma.campaign.upsert({
    where: { id: 'demo-youtube-campaign' },
    update: {},
    create: {
      id: 'demo-youtube-campaign',
      name: 'YouTube AMG Demo',
      platform: 'youtube',
      cost: 5000.0,
      revenue: 12000.0,
    },
  });

  const facebookCampaign = await prisma.campaign.upsert({
    where: { id: 'demo-facebook-campaign' },
    update: {},
    create: {
      id: 'demo-facebook-campaign',
      name: 'Facebook AMG Demo',
      platform: 'facebook',
      cost: 3000.0,
      revenue: 8500.0,
    },
  });

  // Create some demo metrics for the last 7 days
  const now = new Date();
  const metrics = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(12, 0, 0, 0); // Noon for consistency

    // YouTube metrics
    metrics.push(
      {
        campaignId: youtubeCampaign.id,
        ts: date,
        key: 'views',
        value: Math.floor(15000 + Math.random() * 5000),
        meta: { platform: 'youtube' },
      },
      {
        campaignId: youtubeCampaign.id,
        ts: date,
        key: 'subscribers',
        value: 125000 + Math.floor(Math.random() * 1000),
        meta: { platform: 'youtube' },
      },
      {
        campaignId: youtubeCampaign.id,
        ts: date,
        key: 'videos',
        value: 450 + Math.floor(Math.random() * 5),
        meta: { platform: 'youtube' },
      }
    );

    // Facebook metrics
    metrics.push(
      {
        campaignId: facebookCampaign.id,
        ts: date,
        key: 'reach',
        value: Math.floor(8000 + Math.random() * 2000),
        meta: { platform: 'facebook' },
      },
      {
        campaignId: facebookCampaign.id,
        ts: date,
        key: 'engagement',
        value: Math.floor(400 + Math.random() * 200),
        meta: { platform: 'facebook' },
      }
    );
  }

  // Insert metrics
  for (const metric of metrics) {
    await prisma.metric.upsert({
      where: {
        campaignId_ts_key: {
          campaignId: metric.campaignId,
          ts: metric.ts,
          key: metric.key,
        },
      },
      update: {
        value: metric.value,
        meta: metric.meta,
      },
      create: metric,
    });
  }

  console.log('Seed completed!');
  console.log(`Created user: ${user.email}`);
  console.log(`Created campaigns: ${youtubeCampaign.name}, ${facebookCampaign.name}`);
  console.log(`Created ${metrics.length} metrics`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 