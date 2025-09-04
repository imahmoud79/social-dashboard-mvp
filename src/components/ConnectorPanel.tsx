'use client';

import { useState, useEffect } from 'react';

interface ConnectorStatus {
  id: string;
  name: string;
  status: 'connected' | 'auth_required' | 'coming_soon';
  description: string;
}

export function ConnectorPanel() {
  const [connectors, setConnectors] = useState<ConnectorStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const response = await fetch('/api/connectors');
        if (response.ok) {
          const data = await response.json();
          setConnectors(data);
        }
      } catch (error) {
        console.error('Failed to fetch connectors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnectors();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return '✅';
      case 'auth_required':
        return '🔑';
      case 'coming_soon':
        return '⏳';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'auth_required':
        return 'text-yellow-600';
      case 'coming_soon':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Social Connectors
      </h2>
      
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="space-y-3">
          {connectors.map((connector) => (
            <div
              key={connector.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getStatusIcon(connector.status)}</span>
                <div>
                  <p className="font-medium text-gray-900">{connector.name}</p>
                  <p className={`text-xs ${getStatusColor(connector.status)}`}>
                    {connector.description}
                  </p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                connector.status === 'connected' 
                  ? 'bg-green-100 text-green-800'
                  : connector.status === 'auth_required'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {connector.status.replace('_', ' ')}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Architecture:</strong> All connectors implement the same interface. 
          YouTube is live, others are stubbed with realistic data for demo purposes.
        </p>
      </div>
    </div>
  );
} 