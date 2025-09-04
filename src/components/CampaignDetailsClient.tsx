'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';

interface Metric {
  id: string;
  ts: string;
  key: string;
  value: number;
  meta?: any;
}

interface Campaign {
  id: string;
  name: string;
  platform: string;
  cost?: number;
  revenue?: number;
  createdAt: string;
}

interface Props {
  campaignId: string;
}

export function CampaignDetailsClient({ campaignId }: Props) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignRes, metricsRes] = await Promise.all([
          fetch(`/api/campaigns/${campaignId}`),
          fetch(`/api/metrics?campaignId=${campaignId}&days=${dateRange}`),
        ]);
        
        if (campaignRes.ok) {
          const campaignData = await campaignRes.json();
          setCampaign(campaignData);
        }
        
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          setMetrics(metricsData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [campaignId, dateRange]);

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Metric', 'Value'],
      ...metrics.map(m => [
        new Date(m.ts).toLocaleDateString(),
        m.key,
        m.value.toString(),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign?.name || 'campaign'}-metrics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading campaign details...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
        text: `${campaign.name} - Performance Over Time`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculate KPIs
  const totalViews = metrics.filter(m => m.key === 'views').reduce((sum, m) => sum + m.value, 0);
  const avgViews = totalViews / Math.max(viewsData.length, 1);
  const roi = campaign.cost && campaign.revenue 
    ? ((campaign.revenue - campaign.cost) / campaign.cost * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500 text-sm mb-2 block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
              <p className="text-gray-600 capitalize">{campaign.platform} Campaign</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
              </select>
              <button
                onClick={handleExportCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Daily Views</h3>
            <p className="text-3xl font-bold text-green-600">{Math.floor(avgViews).toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost</h3>
            <p className="text-3xl font-bold text-red-600">
              ${campaign.cost?.toLocaleString() || 'N/A'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI</h3>
            <p className={`text-3xl font-bold ${roi && parseFloat(roi) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roi ? `${roi}%` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
          {viewsData.length > 0 ? (
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-80">
              <div className="text-gray-500">No metrics available for selected date range</div>
            </div>
          )}
        </div>

        {/* Metrics Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Metrics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.slice(0, 20).map((metric) => (
                  <tr key={metric.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(metric.ts).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {metric.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {metric.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 