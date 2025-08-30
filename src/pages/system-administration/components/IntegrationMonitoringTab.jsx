import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationMonitoringTab = () => {
  const [integrations, setIntegrations] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const mockIntegrations = [
    {
      id: 1,
      name: "Twilio SMS",
      type: "notification",
      status: "healthy",
      lastCheck: new Date(Date.now() - 300000),
      responseTime: 245,
      uptime: 99.8,
      endpoint: "https://api.twilio.com/2010-04-01/",
      version: "v1.0",
      errorCount: 2,
      successRate: 99.2
    },
    {
      id: 2,
      name: "Firebase Push",
      type: "notification",
      status: "healthy",
      lastCheck: new Date(Date.now() - 180000),
      responseTime: 156,
      uptime: 99.9,
      endpoint: "https://fcm.googleapis.com/fcm/send",
      version: "v1.0",
      errorCount: 0,
      successRate: 100
    },
    {
      id: 3,
      name: "Weather API",
      type: "data",
      status: "warning",
      lastCheck: new Date(Date.now() - 120000),
      responseTime: 1250,
      uptime: 98.5,
      endpoint: "https://api.weather.gov/",
      version: "v2.1",
      errorCount: 15,
      successRate: 96.8
    },
    {
      id: 4,
      name: "Sensor Network",
      type: "data",
      status: "critical",
      lastCheck: new Date(Date.now() - 600000),
      responseTime: 0,
      uptime: 85.2,
      endpoint: "https://sensors.coastalguard.gov/api/",
      version: "v3.0",
      errorCount: 45,
      successRate: 78.3
    },
    {
      id: 5,
      name: "Email Service",
      type: "notification",
      status: "healthy",
      lastCheck: new Date(Date.now() - 90000),
      responseTime: 320,
      uptime: 99.7,
      endpoint: "https://api.sendgrid.com/v3/",
      version: "v3.0",
      errorCount: 3,
      successRate: 98.9
    },
    {
      id: 6,
      name: "Backup Storage",
      type: "storage",
      status: "healthy",
      lastCheck: new Date(Date.now() - 240000),
      responseTime: 89,
      uptime: 99.95,
      endpoint: "https://backup.coastalguard.gov/",
      version: "v2.0",
      errorCount: 1,
      successRate: 99.8
    }
  ];

  const mockSystemHealth = {
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 12,
    activeConnections: 1247,
    queuedAlerts: 23,
    processedToday: 8945,
    errorRate: 0.8
  };

  useEffect(() => {
    setIntegrations(mockIntegrations);
    setSystemHealth(mockSystemHealth);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-green-50 border-green-200';
      case 'warning':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-error bg-red-50 border-red-200';
      default:
        return 'text-muted-foreground bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'notification':
        return 'Bell';
      case 'data':
        return 'Database';
      case 'storage':
        return 'HardDrive';
      default:
        return 'Globe';
    }
  };

  const formatLastCheck = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      console.log('Refreshed integration status');
    }, 2000);
  };

  const handleTestIntegration = (integrationId) => {
    console.log('Testing integration:', integrationId);
  };

  const handleViewLogs = (integrationId) => {
    console.log('Viewing logs for integration:', integrationId);
  };

  const renderSystemHealthMetrics = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">CPU Usage</p>
            <p className="text-2xl font-bold text-foreground">{systemHealth?.cpu}%</p>
          </div>
          <Icon name="Cpu" size={24} className="text-blue-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth?.cpu}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Memory</p>
            <p className="text-2xl font-bold text-foreground">{systemHealth?.memory}%</p>
          </div>
          <Icon name="MemoryStick" size={24} className="text-green-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth?.memory}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Disk Usage</p>
            <p className="text-2xl font-bold text-foreground">{systemHealth?.disk}%</p>
          </div>
          <Icon name="HardDrive" size={24} className="text-purple-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth?.disk}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Network I/O</p>
            <p className="text-2xl font-bold text-foreground">{systemHealth?.network}%</p>
          </div>
          <Icon name="Wifi" size={24} className="text-orange-500" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth?.network}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderQuickStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-foreground">{systemHealth?.activeConnections}</p>
        <p className="text-sm text-muted-foreground">Active Connections</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-warning">{systemHealth?.queuedAlerts}</p>
        <p className="text-sm text-muted-foreground">Queued Alerts</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-success">{systemHealth?.processedToday?.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Processed Today</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-foreground">{systemHealth?.errorRate}%</p>
        <p className="text-sm text-muted-foreground">Error Rate</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Integration Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Monitor external service health and system performance
          </p>
        </div>
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          loading={refreshing}
          onClick={handleRefresh}
        >
          Refresh Status
        </Button>
      </div>
      {/* System Health Metrics */}
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">System Health</h4>
        {renderSystemHealthMetrics()}
      </div>
      {/* Quick Stats */}
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">System Statistics</h4>
        {renderQuickStats()}
      </div>
      {/* Integration Status */}
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">External Integrations</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {integrations?.map(integration => (
            <div key={integration?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                    <Icon name={getTypeIcon(integration?.type)} size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{integration?.name}</h5>
                    <p className="text-sm text-muted-foreground capitalize">{integration?.type} Service</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(integration?.status)}`}>
                  <Icon name={getStatusIcon(integration?.status)} size={14} />
                  <span className="text-xs font-medium capitalize">{integration?.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="text-sm font-medium text-foreground">
                    {integration?.responseTime > 0 ? `${integration?.responseTime}ms` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="text-sm font-medium text-foreground">{integration?.uptime}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-sm font-medium text-foreground">{integration?.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Errors (24h)</p>
                  <p className="text-sm font-medium text-foreground">{integration?.errorCount}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Endpoint:</span>
                  <span className="text-foreground font-mono truncate ml-2">{integration?.endpoint}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="text-foreground">{integration?.version}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Last Check:</span>
                  <span className="text-foreground">{formatLastCheck(integration?.lastCheck)}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Play"
                  onClick={() => handleTestIntegration(integration?.id)}
                >
                  Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  onClick={() => handleViewLogs(integration?.id)}
                >
                  Logs
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Status Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">System Status Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {integrations?.filter(i => i?.status === 'healthy')?.length} Healthy
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="AlertTriangle" size={32} className="text-warning" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {integrations?.filter(i => i?.status === 'warning')?.length} Warning
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="XCircle" size={32} className="text-error" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {integrations?.filter(i => i?.status === 'critical')?.length} Critical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationMonitoringTab;