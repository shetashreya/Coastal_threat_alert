import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertStatisticsToolbar = ({ onRefresh, onCreateAlert }) => {
  const [stats, setStats] = useState({
    activeAlerts: 0,
    totalSent: 0,
    deliveryRate: 0,
    confirmationRate: 0,
    systemStatus: 'operational'
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  const mockStats = {
    activeAlerts: 3,
    totalSent: 47250,
    deliveryRate: 94.2,
    confirmationRate: 81.7,
    systemStatus: 'operational'
  };

  const systemStatusConfig = {
    operational: {
      color: 'text-green-600 bg-green-50 border-green-200',
      icon: 'CheckCircle',
      label: 'Operational'
    },
    degraded: {
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      icon: 'AlertTriangle',
      label: 'Degraded'
    },
    maintenance: {
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      icon: 'Settings',
      label: 'Maintenance'
    },
    offline: {
      color: 'text-red-600 bg-red-50 border-red-200',
      icon: 'XCircle',
      label: 'Offline'
    }
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    if (onRefresh) {
      onRefresh();
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  useEffect(() => {
    setStats(mockStats);
    
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalSent: prev?.totalSent + Math.floor(Math.random() * 10),
        deliveryRate: Math.max(90, Math.min(99, prev?.deliveryRate + (Math.random() - 0.5) * 2)),
        confirmationRate: Math.max(70, Math.min(95, prev?.confirmationRate + (Math.random() - 0.5) * 3))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const currentStatus = systemStatusConfig?.[stats?.systemStatus] || systemStatusConfig?.operational;

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">Alert Management Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${currentStatus?.color}`}>
              <Icon name={currentStatus?.icon} size={16} className="mr-2" />
              {currentStatus?.label}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatLastUpdate()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
          <Button
            onClick={onCreateAlert}
            iconName="Plus"
            iconPosition="left"
          >
            Create Alert
          </Button>
        </div>
      </div>
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Alerts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Active Alerts</span>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {stats?.activeAlerts}
          </div>
          <div className="text-xs text-blue-700">
            Currently broadcasting
          </div>
        </div>

        {/* Total Messages Sent */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Send" size={20} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Messages Sent</span>
            </div>
            <Icon name="TrendingUp" size={16} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-900 mb-1">
            {stats?.totalSent?.toLocaleString()}
          </div>
          <div className="text-xs text-green-700">
            Across all channels
          </div>
        </div>

        {/* Delivery Rate */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={20} className="text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Delivery Rate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <div className="w-2 h-2 bg-amber-300 rounded-full" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-900 mb-1">
            {stats?.deliveryRate?.toFixed(1)}%
          </div>
          <div className="text-xs text-amber-700">
            Successfully delivered
          </div>
        </div>

        {/* Confirmation Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Confirmation Rate</span>
            </div>
            <Icon name="Users" size={16} className="text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900 mb-1">
            {stats?.confirmationRate?.toFixed(1)}%
          </div>
          <div className="text-xs text-purple-700">
            User acknowledgments
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Simulate flood watch')}
                iconName="Waves"
                iconPosition="left"
              >
                Simulate Flood Watch
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Simulate storm surge')}
                iconName="Wind"
                iconPosition="left"
              >
                Simulate Storm Surge
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('View analytics')}
              iconName="BarChart3"
              iconPosition="left"
            >
              View Analytics
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('Export reports')}
              iconName="Download"
              iconPosition="left"
            >
              Export Reports
            </Button>
          </div>
        </div>
      </div>
      {/* System Health Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">SMS Gateway</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">Push Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-muted-foreground">WhatsApp API</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-muted-foreground">Telegram Bot</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            System uptime: 99.8%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertStatisticsToolbar;