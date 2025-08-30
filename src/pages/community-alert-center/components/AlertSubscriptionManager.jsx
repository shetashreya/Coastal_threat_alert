import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertSubscriptionManager = ({ onSave }) => {
  const [preferences, setPreferences] = useState({
    deliveryMethods: {
      sms: true,
      email: true,
      push: true,
      whatsapp: false
    },
    alertTypes: {
      flood: true,
      storm: true,
      tsunami: false,
      hurricane: true,
      advisory: false
    },
    geographicBoundary: 'neighborhood',
    notificationTiming: 'immediate',
    language: 'en',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '06:00'
    }
  });

  const [contactInfo, setContactInfo] = useState({
    phone: '+1 (555) 123-4567',
    email: 'resident@example.com',
    whatsapp: ''
  });

  const deliveryMethodOptions = [
    { value: 'sms', label: 'SMS Text Messages', description: 'Instant delivery to mobile phone' },
    { value: 'email', label: 'Email Notifications', description: 'Detailed alerts with attachments' },
    { value: 'push', label: 'Push Notifications', description: 'Mobile app notifications' },
    { value: 'whatsapp', label: 'WhatsApp Messages', description: 'Rich media alerts via WhatsApp' }
  ];

  const alertTypeOptions = [
    { value: 'flood', label: 'Flood Warnings', description: 'Coastal and inland flooding alerts' },
    { value: 'storm', label: 'Storm Alerts', description: 'Severe weather and storm surge warnings' },
    { value: 'tsunami', label: 'Tsunami Warnings', description: 'Tsunami and seismic activity alerts' },
    { value: 'hurricane', label: 'Hurricane Alerts', description: 'Hurricane tracking and evacuation notices' },
    { value: 'advisory', label: 'General Advisories', description: 'Non-emergency weather advisories' }
  ];

  const geographicOptions = [
    { value: 'immediate', label: 'Immediate Area', description: '0.5 mile radius' },
    { value: 'neighborhood', label: 'Neighborhood', description: '2 mile radius' },
    { value: 'city', label: 'City-wide', description: 'Entire city boundaries' },
    { value: 'county', label: 'County-wide', description: 'Full county coverage' }
  ];

  const timingOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Send alerts as soon as issued' },
    { value: 'batched', label: 'Batched (15 min)', description: 'Group alerts every 15 minutes' },
    { value: 'hourly', label: 'Hourly Summary', description: 'Hourly digest of all alerts' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español (Spanish)' }
  ];

  const handleDeliveryMethodChange = (method, checked) => {
    setPreferences(prev => ({
      ...prev,
      deliveryMethods: {
        ...prev?.deliveryMethods,
        [method]: checked
      }
    }));
  };

  const handleAlertTypeChange = (type, checked) => {
    setPreferences(prev => ({
      ...prev,
      alertTypes: {
        ...prev?.alertTypes,
        [type]: checked
      }
    }));
  };

  const handleQuietHoursChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev?.quietHours,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    const subscriptionData = {
      preferences,
      contactInfo,
      updatedAt: new Date()
    };
    
    if (onSave) {
      onSave(subscriptionData);
    }
    
    console.log('Subscription preferences saved:', subscriptionData);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Settings" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Alert Subscription Preferences
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize how and when you receive emergency alerts
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Phone" size={18} />
            <span>Contact Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              value={contactInfo?.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e?.target?.value }))}
              placeholder="+1 (555) 123-4567"
              description="Primary number for SMS alerts"
            />
            
            <Input
              label="Email Address"
              type="email"
              value={contactInfo?.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e?.target?.value }))}
              placeholder="your.email@example.com"
              description="Email for detailed alerts"
            />
          </div>
        </div>

        {/* Delivery Methods */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Send" size={18} />
            <span>Delivery Methods</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliveryMethodOptions?.map((method) => (
              <div key={method?.value} className="p-4 border border-border rounded-lg">
                <Checkbox
                  label={method?.label}
                  description={method?.description}
                  checked={preferences?.deliveryMethods?.[method?.value]}
                  onChange={(e) => handleDeliveryMethodChange(method?.value, e?.target?.checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Alert Types */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} />
            <span>Alert Types</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertTypeOptions?.map((type) => (
              <div key={type?.value} className="p-4 border border-border rounded-lg">
                <Checkbox
                  label={type?.label}
                  description={type?.description}
                  checked={preferences?.alertTypes?.[type?.value]}
                  onChange={(e) => handleAlertTypeChange(type?.value, e?.target?.checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Boundary */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={18} />
            <span>Geographic Coverage</span>
          </h4>
          
          <Select
            label="Alert Coverage Area"
            description="Choose the geographic area for which you want to receive alerts"
            options={geographicOptions}
            value={preferences?.geographicBoundary}
            onChange={(value) => setPreferences(prev => ({ ...prev, geographicBoundary: value }))}
          />
        </div>

        {/* Notification Timing */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Clock" size={18} />
            <span>Notification Timing</span>
          </h4>
          
          <Select
            label="Alert Delivery Timing"
            description="Control how frequently you receive alert notifications"
            options={timingOptions}
            value={preferences?.notificationTiming}
            onChange={(value) => setPreferences(prev => ({ ...prev, notificationTiming: value }))}
          />
        </div>

        {/* Language Preference */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Globe" size={18} />
            <span>Language Preference</span>
          </h4>
          
          <Select
            label="Alert Language"
            description="Choose your preferred language for alert messages"
            options={languageOptions}
            value={preferences?.language}
            onChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
          />
        </div>

        {/* Quiet Hours */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Moon" size={18} />
            <span>Quiet Hours</span>
          </h4>
          
          <div className="p-4 border border-border rounded-lg space-y-4">
            <Checkbox
              label="Enable Quiet Hours"
              description="Reduce non-critical alerts during specified hours (critical alerts will still be delivered)"
              checked={preferences?.quietHours?.enabled}
              onChange={(e) => handleQuietHoursChange('enabled', e?.target?.checked)}
            />
            
            {preferences?.quietHours?.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  type="time"
                  value={preferences?.quietHours?.start}
                  onChange={(e) => handleQuietHoursChange('start', e?.target?.value)}
                />
                <Input
                  label="End Time"
                  type="time"
                  value={preferences?.quietHours?.end}
                  onChange={(e) => handleQuietHoursChange('end', e?.target?.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            className="flex-1"
          >
            Save Preferences
          </Button>
          
          <Button
            variant="outline"
            iconName="TestTube"
            iconPosition="left"
            className="flex-1"
          >
            Send Test Alert
          </Button>
          
          <Button
            variant="ghost"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertSubscriptionManager;