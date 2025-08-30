import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserManagementTab from './components/UserManagementTab';
import SystemConfigurationTab from './components/SystemConfigurationTab';
import IntegrationMonitoringTab from './components/IntegrationMonitoringTab';
import AlertTemplateManagement from './components/AlertTemplateManagement';
import PerformanceAnalytics from './components/PerformanceAnalytics';

const SystemAdministration = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [systemStatus, setSystemStatus] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const mockSystemStatus = {
    overallHealth: 'healthy',
    activeAlerts: 3,
    systemLoad: 45,
    lastBackup: new Date(Date.now() - 3600000),
    maintenanceMode: false,
    criticalIssues: 0
  };

  const mockUser = {
    name: 'System Administrator',
    role: 'super_admin',
    email: 'admin@coastalguard.gov',
    avatar: null,
    department: 'IT Operations'
  };

  const mockAlertStatus = {
    level: 'normal',
    count: 3
  };

  const tabs = [
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage user accounts and permissions'
    },
    {
      id: 'config',
      label: 'System Config',
      icon: 'Settings',
      description: 'Configure system settings and thresholds'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Globe',
      description: 'Monitor external service health'
    },
    {
      id: 'templates',
      label: 'Alert Templates',
      icon: 'FileText',
      description: 'Manage alert message templates'
    },
    {
      id: 'analytics',
      label: 'Performance',
      icon: 'BarChart3',
      description: 'View system performance metrics'
    }
  ];

  useEffect(() => {
    setSystemStatus(mockSystemStatus);
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
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

  const formatLastBackup = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Less than 1 hour ago';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const handleEmergencyAction = (action) => {
    console.log(`Emergency action triggered: ${action}`);
  };

  const renderSystemStatusBar = () => (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        {/* System Health */}
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(systemStatus?.overallHealth)}`}>
            <Icon name={getStatusIcon(systemStatus?.overallHealth)} size={16} />
            <span className="text-sm font-medium capitalize">{systemStatus?.overallHealth}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Activity" size={16} />
              <span>Load: {systemStatus?.systemLoad}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="AlertTriangle" size={16} />
              <span>{systemStatus?.activeAlerts} Active Alerts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Database" size={16} />
              <span>Backup: {formatLastBackup(systemStatus?.lastBackup)}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          {systemStatus?.maintenanceMode && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Icon name="Wrench" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Maintenance Mode</span>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Shield"
            onClick={() => handleEmergencyAction('backup')}
          >
            Force Backup
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={() => handleEmergencyAction('restart')}
          >
            Restart Services
          </Button>
          
          {systemStatus?.criticalIssues > 0 && (
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              onClick={() => handleEmergencyAction('emergency')}
            >
              Emergency Protocol
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'config':
        return <SystemConfigurationTab />;
      case 'integrations':
        return <IntegrationMonitoringTab />;
      case 'templates':
        return <AlertTemplateManagement />;
      case 'analytics':
        return <PerformanceAnalytics />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        user={mockUser}
        alertStatus={mockAlertStatus}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
                <p className="text-muted-foreground">
                  Configure system settings, manage users, and monitor platform health
                </p>
              </div>
            </div>
          </div>

          {/* System Status Bar */}
          {renderSystemStatusBar()}

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {tabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-background">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdministration;