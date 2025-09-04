'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ConnectorPanel } from './ConnectorPanel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Metric {
  id: string;
  ts: string;
  key: string;
  value: number;
}

interface Campaign {
  id: string;
  name: string;
  platform: string;
  cost?: number;
  revenue?: number;
}

export function DashboardClient() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);

  const fetchData = async () => {
    try {
      const [metricsRes, campaignsRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/campaigns'),
      ]);
      
      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }
      
      if (campaignsRes.ok) {
        const campaignsData = await campaignsRes.json();
        setCampaigns(campaignsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIngestYouTube = async () => {
    setIngesting(true);
    try {
      const response = await fetch('/api/ingest/youtube?days=7', {
        method: 'POST',
      });
      
      if (response.ok) {
        await fetchData(); // Refresh data
        alert('YouTube metrics ingested successfully!');
      } else {
        const error = await response.json();
        alert(`Ingestion failed: ${error.error}`);
      }
    } catch (error) {
      alert('Ingestion failed');
    } finally {
      setIngesting(false);
    }
  };

  // Prepare chart data
  const viewsData = metrics
    .filter(m => m.key === 'views')
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());

  const chartData = {
    labels: viewsData.map(m => new Date(m.ts).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Views',
        data: viewsData.map(m => m.value),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'YouTube Views Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculate KPIs
  const totalViews = metrics
    .filter(m => m.key === 'views')
    .reduce((sum, m) => sum + m.value, 0);
    
  const latestSubs = metrics
    .filter(m => m.key === 'subscribers')
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())[0]?.value || 0;
    
  const latestVideos = metrics
    .filter(m => m.key === 'videos')
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())[0]?.value || 0;

  const mainCampaign = campaigns.find(c => c.platform === 'youtube');
  const roi = mainCampaign && mainCampaign.cost && mainCampaign.revenue 
    ? ((mainCampaign.revenue - mainCampaign.cost) / mainCampaign.cost * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              AMG-CHA Social Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session?.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <button
                onClick={handleIngestYouTube}
                disabled={ingesting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {ingesting ? 'Ingesting...' : 'Ingest YouTube (7 days)'}
              </button>
            </div>
            
            <ConnectorPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">V</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Views</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {totalViews.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Subscribers</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {latestSubs.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">V</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Videos</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {latestVideos.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${roi && parseFloat(roi) > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ROI</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {roi ? `${roi}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaigns List */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Campaigns
              </h2>
              {campaigns.length > 0 ? (
                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{campaign.platform}</p>
                      </div>
                      <a
                        href={`/campaigns/${campaign.id}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        View Details
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No campaigns found. Ingest some data to get started.
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Analytics
              </h2>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading metrics...</div>
                </div>
              ) : viewsData.length > 0 ? (
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">No metrics available</p>
                    <button
                      onClick={handleIngestYouTube}
                      disabled={ingesting}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                      {ingesting ? 'Ingesting...' : 'Ingest YouTube Data'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 