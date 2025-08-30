import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertCreationWizard = ({ onCreateAlert, isCreating = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    severity: 'advisory',
    template: '',
    zones: [],
    channels: [],
    scheduledTime: '',
    expiryTime: ''
  });

  const alertTemplates = [
    { value: 'flood-watch', label: 'Flood Watch Template', description: 'Standard flood monitoring alert' },
    { value: 'storm-surge', label: 'Storm Surge Warning', description: 'Coastal storm surge alert' },
    { value: 'high-tide', label: 'High Tide Advisory', description: 'Elevated tide level notification' },
    { value: 'weather-severe', label: 'Severe Weather Alert', description: 'General severe weather warning' },
    { value: 'evacuation', label: 'Evacuation Notice', description: 'Emergency evacuation alert' },
    { value: 'custom', label: 'Custom Alert', description: 'Create custom alert message' }
  ];

  const severityLevels = [
    { value: 'advisory', label: 'Advisory', description: 'General information and awareness' },
    { value: 'watch', label: 'Watch', description: 'Conditions are favorable for development' },
    { value: 'warning', label: 'Warning', description: 'Immediate action required' }
  ];

  const affectedZones = [
    { value: 'zone-a', label: 'Coastal Zone A', description: 'Downtown waterfront area' },
    { value: 'zone-b', label: 'Coastal Zone B', description: 'Residential coastal district' },
    { value: 'zone-c', label: 'Coastal Zone C', description: 'Industrial port area' },
    { value: 'zone-d', label: 'Coastal Zone D', description: 'Marina and recreational areas' },
    { value: 'zone-e', label: 'Coastal Zone E', description: 'Northern beach communities' }
  ];

  const deliveryChannels = [
    { id: 'sms', label: 'SMS Text Messages', icon: 'MessageSquare', enabled: true },
    { id: 'push', label: 'Push Notifications', icon: 'Bell', enabled: true },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', enabled: true },
    { id: 'telegram', label: 'Telegram', icon: 'Send', enabled: false },
    { id: 'email', label: 'Email Alerts', icon: 'Mail', enabled: true },
    { id: 'social', label: 'Social Media', icon: 'Share2', enabled: false }
  ];

  const steps = [
    { id: 1, title: 'Template & Content', icon: 'FileText' },
    { id: 2, title: 'Severity & Zones', icon: 'AlertTriangle' },
    { id: 3, title: 'Delivery Channels', icon: 'Send' },
    { id: 4, title: 'Schedule & Review', icon: 'Clock' }
  ];

  const handleInputChange = (field, value) => {
    setAlertData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChannelToggle = (channelId) => {
    setAlertData(prev => ({
      ...prev,
      channels: prev?.channels?.includes(channelId)
        ? prev?.channels?.filter(id => id !== channelId)
        : [...prev?.channels, channelId]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAlert = () => {
    if (onCreateAlert) {
      onCreateAlert(alertData);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning': return 'text-red-600 bg-red-50 border-red-200';
      case 'watch': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'advisory': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return alertData?.template && alertData?.title && alertData?.message;
      case 2:
        return alertData?.severity && alertData?.zones?.length > 0;
      case 3:
        return alertData?.channels?.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (alertData?.template && alertData?.template !== 'custom') {
      const template = alertTemplates?.find(t => t?.value === alertData?.template);
      if (template) {
        setAlertData(prev => ({
          ...prev,
          title: template?.label,
          message: `This is a ${template?.label?.toLowerCase()} for the selected coastal areas. Please follow emergency protocols and stay informed through official channels.`
        }));
      }
    }
  }, [alertData?.template]);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Wizard Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Create New Alert</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Step {currentStep} of 4</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= step?.id
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-border text-muted-foreground'
              }`}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.title}
              </span>
              {index < steps?.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  currentStep > step?.id ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step Content */}
      <div className="p-6">
        {/* Step 1: Template & Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Select
              label="Alert Template"
              description="Choose a pre-configured template or create custom content"
              options={alertTemplates}
              value={alertData?.template}
              onChange={(value) => handleInputChange('template', value)}
              required
            />

            <Input
              label="Alert Title"
              type="text"
              placeholder="Enter alert title"
              value={alertData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Alert Message
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={4}
                placeholder="Enter detailed alert message..."
                value={alertData?.message}
                onChange={(e) => handleInputChange('message', e?.target?.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {alertData?.message?.length}/500 characters
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Severity & Zones */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Alert Severity Level
              </label>
              <div className="grid grid-cols-1 gap-3">
                {severityLevels?.map((level) => (
                  <label
                    key={level?.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      alertData?.severity === level?.value
                        ? getSeverityColor(level?.value)
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={level?.value}
                      checked={alertData?.severity === level?.value}
                      onChange={(e) => handleInputChange('severity', e?.target?.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{level?.label}</div>
                      <div className="text-sm text-muted-foreground">{level?.description}</div>
                    </div>
                    {alertData?.severity === level?.value && (
                      <Icon name="Check" size={20} />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <Select
              label="Affected Zones"
              description="Select coastal zones that will receive this alert"
              options={affectedZones}
              value={alertData?.zones}
              onChange={(value) => handleInputChange('zones', value)}
              multiple
              searchable
              required
            />
          </div>
        )}

        {/* Step 3: Delivery Channels */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Delivery Channels
              </label>
              <p className="text-sm text-muted-foreground mb-4">
                Select how you want to deliver this alert to recipients
              </p>
              <div className="grid grid-cols-1 gap-3">
                {deliveryChannels?.map((channel) => (
                  <div
                    key={channel?.id}
                    className={`flex items-center p-4 border rounded-lg ${
                      !channel?.enabled
                        ? 'opacity-50 bg-muted'
                        : alertData?.channels?.includes(channel?.id)
                        ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <Checkbox
                      checked={alertData?.channels?.includes(channel?.id)}
                      onChange={() => handleChannelToggle(channel?.id)}
                      disabled={!channel?.enabled}
                    />
                    <Icon name={channel?.icon} size={20} className="mx-3" />
                    <div className="flex-1">
                      <div className="font-medium">{channel?.label}</div>
                      {!channel?.enabled && (
                        <div className="text-xs text-muted-foreground">Coming soon</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Schedule & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Schedule Time (Optional)"
                type="datetime-local"
                value={alertData?.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e?.target?.value)}
                description="Leave empty to send immediately"
              />

              <Input
                label="Expiry Time (Optional)"
                type="datetime-local"
                value={alertData?.expiryTime}
                onChange={(e) => handleInputChange('expiryTime', e?.target?.value)}
                description="When this alert should expire"
              />
            </div>

            {/* Review Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Alert Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{alertData?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Severity:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alertData?.severity)}`}>
                    {alertData?.severity?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zones:</span>
                  <span className="font-medium">{alertData?.zones?.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Channels:</span>
                  <span className="font-medium">{alertData?.channels?.length} selected</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Wizard Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-3">
            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                disabled={!isStepValid(currentStep)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleCreateAlert}
                loading={isCreating}
                disabled={!isStepValid(currentStep)}
                iconName="Send"
                iconPosition="left"
              >
                Create Alert
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCreationWizard;