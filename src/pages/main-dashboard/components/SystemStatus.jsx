import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = ({ className = '' }) => {
  const [systemHealth, setSystemHealth] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const systemComponents = [
    {
      id: 'sensors',
      name: 'Environmental Sensors',
      icon: 'Radio',
      status: 'operational',
      count: 12,
      description: 'Water level, wind, rainfall sensors'
    },
    {
      id: 'alerts',
      name: 'Alert System',
      icon: 'Bell',
      status: 'operational',
      count: 3,
      description: 'SMS, Push, WhatsApp notifications'
    },
    {
      id: 'prediction',
      name: 'AI Prediction Engine',
      icon: 'Brain',
      status: 'operational',
      count: 1,
      description: 'Prophet ML forecasting model'
    },
    {
      id: 'communication',
      name: 'Communication Channels',
      icon: 'MessageSquare',
      status: 'operational',
      count: 4,
      description: 'Multi-channel delivery system'
    },
    {
      id: 'database',
      name: 'Data Storage',
      icon: 'Database',
      status: 'operational',
      count: 1,
      description: 'Historical and real-time data'
    },
    {
      id: 'api',
      name: 'External APIs',
      icon: 'Zap',
      status: 'operational',
      count: 5,
      description: 'Weather, mapping, notification services'
    }
  ];

  const statusConfig = {
    operational: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      label: 'Operational',
      icon: 'CheckCircle'
    },
    warning: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      label: 'Warning',
      icon: 'AlertTriangle'
    },
    error: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      label: 'Error',
      icon: 'XCircle'
    },
    maintenance: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      label: 'Maintenance',
      icon: 'Settings'
    }
  };

  const getOverallStatus = () => {
    const statuses = Object.values(systemHealth);
    if (statuses?.includes('error')) return 'error';
    if (statuses?.includes('warning')) return 'warning';
    if (statuses?.includes('maintenance')) return 'maintenance';
    return 'operational';
  };

  const getStatusCounts = () => {
    const counts = {
      operational: 0,
      warning: 0,
      error: 0,
      maintenance: 0
    };
    
    Object.values(systemHealth)?.forEach(status => {
      counts[status] = (counts?.[status] || 0) + 1;
    });
    
    return counts;
  };

  useEffect(() => {
    // Initialize system health
    const initialHealth = {};
    systemComponents?.forEach(component => {
      // Simulate random status for demo
      const statuses = ['operational', 'operational', 'operational', 'warning'];
      initialHealth[component.id] = statuses?.[Math.floor(Math.random() * statuses?.length)];
    });
    setSystemHealth(initialHealth);

    // Update system status periodically
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Occasionally change status for demo
      if (Math.random() < 0.1) {
        const componentIds = Object.keys(initialHealth);
        const randomComponent = componentIds?.[Math.floor(Math.random() * componentIds?.length)];
        const statuses = ['operational', 'operational', 'warning', 'operational'];
        
        setSystemHealth(prev => ({
          ...prev,
          [randomComponent]: statuses?.[Math.floor(Math.random() * statuses?.length)]
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const overallStatus = getOverallStatus();
  const statusCounts = getStatusCounts();
  const overallConfig = statusConfig?.[overallStatus];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${overallConfig?.bgColor?.replace('bg-', 'bg-')}`}></div>
          <span className={`text-sm font-medium ${overallConfig?.color}`}>
            {overallConfig?.label}
          </span>
        </div>
      </div>
      {/* Overall Status Summary */}
      <div className={`p-3 rounded-lg ${overallConfig?.bgColor} mb-4`}>
        <div className="flex items-center space-x-3">
          <Icon name={overallConfig?.icon} size={20} className={overallConfig?.color} />
          <div>
            <h4 className={`font-semibold ${overallConfig?.color}`}>
              System {overallConfig?.label}
            </h4>
            <p className="text-sm opacity-80">
              All critical systems are functioning normally
            </p>
          </div>
        </div>
      </div>
      {/* Status Counts */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(statusCounts)?.map(([status, count]) => {
          const config = statusConfig?.[status];
          return (
            <div key={status} className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50">
              <Icon name={config?.icon} size={14} className={config?.color} />
              <span className="text-sm text-gray-700">{config?.label}</span>
              <span className="text-sm font-bold text-gray-900 ml-auto">{count}</span>
            </div>
          );
        })}
      </div>
      {/* Component Status List */}
      <div className="space-y-2">
        {systemComponents?.map((component) => {
          const status = systemHealth?.[component?.id] || 'operational';
          const config = statusConfig?.[status];
          
          return (
            <div key={component?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Icon name={component?.icon} size={16} className="text-gray-600" />
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    {component?.name}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {component?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {component?.count} active
                </span>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${config?.bgColor}`}>
                  <Icon name={config?.icon} size={12} className={config?.color} />
                  <span className={`text-xs font-medium ${config?.color}`}>
                    {config?.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Last Update */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Icon name="RefreshCw" size={12} />
          <span>
            Last updated: {lastUpdate?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default SystemStatus;