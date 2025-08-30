import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigurationTab = () => {
  const [alertThresholds, setAlertThresholds] = useState({});
  const [geographicBoundaries, setGeographicBoundaries] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({});
  const [systemSettings, setSystemSettings] = useState({});
  const [activeSection, setActiveSection] = useState('thresholds');

  const alertTypes = [
    { value: 'flood', label: 'Flood Warning' },
    { value: 'storm_surge', label: 'Storm Surge' },
    { value: 'high_wind', label: 'High Wind' },
    { value: 'heavy_rain', label: 'Heavy Rainfall' },
    { value: 'temperature', label: 'Temperature Alert' }
  ];

  const severityLevels = [
    { value: 'advisory', label: 'Advisory', color: 'bg-blue-100 text-blue-800' },
    { value: 'watch', label: 'Watch', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'warning', label: 'Warning', color: 'bg-red-100 text-red-800' }
  ];

  const mockThresholds = {
    flood: {
      advisory: { value: 2.5, unit: 'feet', duration: 30 },
      watch: { value: 4.0, unit: 'feet', duration: 60 },
      warning: { value: 6.0, unit: 'feet', duration: 120 }
    },
    storm_surge: {
      advisory: { value: 3.0, unit: 'feet', duration: 45 },
      watch: { value: 5.0, unit: 'feet', duration: 90 },
      warning: { value: 8.0, unit: 'feet', duration: 180 }
    },
    high_wind: {
      advisory: { value: 25, unit: 'mph', duration: 15 },
      watch: { value: 40, unit: 'mph', duration: 30 },
      warning: { value: 60, unit: 'mph', duration: 60 }
    }
  };

  const mockBoundaries = [
    {
      id: 1,
      name: "Coastal Zone A",
      type: "primary",
      coordinates: "40.7128,-74.0060",
      radius: 5,
      population: 15000,
      status: "active"
    },
    {
      id: 2,
      name: "Inland Buffer Zone",
      type: "secondary",
      coordinates: "40.7589,-73.9851",
      radius: 10,
      population: 35000,
      status: "active"
    },
    {
      id: 3,
      name: "Emergency Evacuation Zone",
      type: "critical",
      coordinates: "40.6892,-74.0445",
      radius: 3,
      population: 8500,
      status: "active"
    }
  ];

  const mockNotificationSettings = {
    sms: {
      enabled: true,
      provider: "twilio",
      rateLimitPerHour: 100,
      retryAttempts: 3
    },
    email: {
      enabled: true,
      provider: "sendgrid",
      rateLimitPerHour: 500,
      retryAttempts: 2
    },
    push: {
      enabled: true,
      provider: "firebase",
      rateLimitPerHour: 1000,
      retryAttempts: 3
    },
    whatsapp: {
      enabled: false,
      provider: "twilio",
      rateLimitPerHour: 50,
      retryAttempts: 2
    }
  };

  const mockSystemSettings = {
    dataRetention: 365,
    alertFrequencyLimit: 5,
    autoEscalationTime: 30,
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: 1000,
    sessionTimeout: 60
  };

  useEffect(() => {
    setAlertThresholds(mockThresholds);
    setGeographicBoundaries(mockBoundaries);
    setNotificationSettings(mockNotificationSettings);
    setSystemSettings(mockSystemSettings);
  }, []);

  const handleThresholdUpdate = (alertType, severity, field, value) => {
    setAlertThresholds(prev => ({
      ...prev,
      [alertType]: {
        ...prev?.[alertType],
        [severity]: {
          ...prev?.[alertType]?.[severity],
          [field]: value
        }
      }
    }));
  };

  const handleNotificationToggle = (channel, enabled) => {
    setNotificationSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev?.[channel],
        enabled
      }
    }));
  };

  const handleSystemSettingUpdate = (setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveConfiguration = () => {
    console.log('Saving configuration:', {
      alertThresholds,
      geographicBoundaries,
      notificationSettings,
      systemSettings
    });
  };

  const renderThresholdSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground mb-2">Alert Thresholds</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Configure trigger values for different alert types and severity levels
        </p>
      </div>

      {Object.entries(alertThresholds)?.map(([alertType, thresholds]) => (
        <div key={alertType} className="bg-card border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-4 capitalize">
            {alertTypes?.find(t => t?.value === alertType)?.label}
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {severityLevels?.map(severity => (
              <div key={severity?.value} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${severity?.color}`}>
                    {severity?.label}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Input
                    label="Threshold Value"
                    type="number"
                    value={thresholds?.[severity?.value]?.value || ''}
                    onChange={(e) => handleThresholdUpdate(alertType, severity?.value, 'value', parseFloat(e?.target?.value))}
                    placeholder="0.0"
                  />
                  
                  <Input
                    label="Duration (minutes)"
                    type="number"
                    value={thresholds?.[severity?.value]?.duration || ''}
                    onChange={(e) => handleThresholdUpdate(alertType, severity?.value, 'duration', parseInt(e?.target?.value))}
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGeographicBoundaries = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-md font-semibold text-foreground">Geographic Boundaries</h4>
          <p className="text-sm text-muted-foreground">
            Manage alert zones and coverage areas
          </p>
        </div>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Add Zone
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {geographicBoundaries?.map(boundary => (
          <div key={boundary?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className="font-medium text-foreground">{boundary?.name}</h5>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  boundary?.type === 'critical' ? 'bg-red-100 text-red-800' :
                  boundary?.type === 'primary'? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {boundary?.type}
                </span>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" iconName="Edit" />
                <Button variant="ghost" size="sm" iconName="Trash2" />
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordinates:</span>
                <span className="text-foreground font-mono">{boundary?.coordinates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Radius:</span>
                <span className="text-foreground">{boundary?.radius} miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Population:</span>
                <span className="text-foreground">{boundary?.population?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${boundary?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <span className="text-foreground capitalize">{boundary?.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground">Notification Delivery</h4>
        <p className="text-sm text-muted-foreground">
          Configure notification channels and delivery optimization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(notificationSettings)?.map(([channel, settings]) => (
          <div key={channel} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={
                    channel === 'sms' ? 'MessageSquare' :
                    channel === 'email' ? 'Mail' :
                    channel === 'push'? 'Bell' : 'MessageCircle'
                  } 
                  size={20} 
                />
                <h5 className="font-medium text-foreground capitalize">{channel}</h5>
              </div>
              <Checkbox
                checked={settings?.enabled}
                onChange={(e) => handleNotificationToggle(channel, e?.target?.checked)}
              />
            </div>
            
            {settings?.enabled && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Provider:</span>
                  <span className="text-sm text-foreground font-medium capitalize">
                    {settings?.provider}
                  </span>
                </div>
                
                <Input
                  label="Rate Limit (per hour)"
                  type="number"
                  value={settings?.rateLimitPerHour}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    [channel]: {
                      ...prev?.[channel],
                      rateLimitPerHour: parseInt(e?.target?.value)
                    }
                  }))}
                />
                
                <Input
                  label="Retry Attempts"
                  type="number"
                  value={settings?.retryAttempts}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    [channel]: {
                      ...prev?.[channel],
                      retryAttempts: parseInt(e?.target?.value)
                    }
                  }))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground">System Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure general system behavior and performance parameters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Data Retention (days)"
            type="number"
            value={systemSettings?.dataRetention}
            onChange={(e) => handleSystemSettingUpdate('dataRetention', parseInt(e?.target?.value))}
            description="How long to keep historical data"
          />
          
          <Input
            label="Alert Frequency Limit (per hour)"
            type="number"
            value={systemSettings?.alertFrequencyLimit}
            onChange={(e) => handleSystemSettingUpdate('alertFrequencyLimit', parseInt(e?.target?.value))}
            description="Maximum alerts per user per hour"
          />
          
          <Input
            label="Auto Escalation Time (minutes)"
            type="number"
            value={systemSettings?.autoEscalationTime}
            onChange={(e) => handleSystemSettingUpdate('autoEscalationTime', parseInt(e?.target?.value))}
            description="Time before auto-escalating unacknowledged alerts"
          />
        </div>
        
        <div className="space-y-4">
          <Input
            label="API Rate Limit (requests/hour)"
            type="number"
            value={systemSettings?.apiRateLimit}
            onChange={(e) => handleSystemSettingUpdate('apiRateLimit', parseInt(e?.target?.value))}
            description="Maximum API requests per hour"
          />
          
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={systemSettings?.sessionTimeout}
            onChange={(e) => handleSystemSettingUpdate('sessionTimeout', parseInt(e?.target?.value))}
            description="User session timeout duration"
          />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Maintenance Mode</span>
                <p className="text-xs text-muted-foreground">Enable system maintenance mode</p>
              </div>
              <Checkbox
                checked={systemSettings?.maintenanceMode}
                onChange={(e) => handleSystemSettingUpdate('maintenanceMode', e?.target?.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Debug Mode</span>
                <p className="text-xs text-muted-foreground">Enable detailed logging</p>
              </div>
              <Checkbox
                checked={systemSettings?.debugMode}
                onChange={(e) => handleSystemSettingUpdate('debugMode', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'thresholds', label: 'Alert Thresholds', icon: 'AlertTriangle' },
    { id: 'boundaries', label: 'Geographic Boundaries', icon: 'Map' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'system', label: 'System Settings', icon: 'Settings' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections?.map(section => (
          <Button
            key={section?.id}
            variant={activeSection === section?.id ? 'default' : 'outline'}
            size="sm"
            iconName={section?.icon}
            iconPosition="left"
            onClick={() => setActiveSection(section?.id)}
          >
            {section?.label}
          </Button>
        ))}
      </div>
      {/* Content */}
      <div className="bg-background border border-border rounded-lg p-6">
        {activeSection === 'thresholds' && renderThresholdSettings()}
        {activeSection === 'boundaries' && renderGeographicBoundaries()}
        {activeSection === 'notifications' && renderNotificationSettings()}
        {activeSection === 'system' && renderSystemSettings()}
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSaveConfiguration}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default SystemConfigurationTab;