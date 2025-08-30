import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatLevelBanner = ({ 
  threatLevel = 'normal',
  lastUpdated = new Date(),
  affectedAreas = []
}) => {
  const threatConfig = {
    critical: {
      label: 'Critical Threat',
      color: 'bg-critical text-critical-foreground',
      icon: 'AlertTriangle',
      message: 'Immediate evacuation required for coastal areas',
      pulse: true
    },
    high: {
      label: 'High Alert',
      color: 'bg-high text-high-foreground',
      icon: 'AlertCircle',
      message: 'Prepare for immediate action - monitor conditions closely',
      pulse: true
    },
    medium: {
      label: 'Watch Status',
      color: 'bg-medium text-medium-foreground',
      icon: 'Info',
      message: 'Conditions developing - stay informed and prepared',
      pulse: false
    },
    low: {
      label: 'Advisory',
      color: 'bg-low text-low-foreground',
      icon: 'CheckCircle',
      message: 'Minor conditions present - normal precautions advised',
      pulse: false
    },
    normal: {
      label: 'Normal Conditions',
      color: 'bg-normal text-normal-foreground',
      icon: 'Shield',
      message: 'All coastal monitoring systems operational',
      pulse: false
    }
  };

  const currentThreat = threatConfig?.[threatLevel] || threatConfig?.normal;

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    })?.format(date);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border-2 ${currentThreat?.color} ${currentThreat?.pulse ? 'animate-pulse-slow' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentThreat?.color} shadow-lg`}>
              <Icon 
                name={currentThreat?.icon} 
                size={24} 
                className="drop-shadow-sm"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">
                {currentThreat?.label}
              </h2>
              <p className="text-lg opacity-90 mb-2">
                {currentThreat?.message}
              </p>
              <div className="flex items-center space-x-4 text-sm opacity-80">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>Updated: {formatTime(lastUpdated)}</span>
                </div>
                {affectedAreas?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>{affectedAreas?.length} areas affected</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm opacity-80 mb-1">Threat Level</div>
            <div className="text-3xl font-bold">
              {threatLevel?.toUpperCase()}
            </div>
          </div>
        </div>

        {affectedAreas?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-current border-opacity-20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} />
              <span className="font-medium">Affected Areas:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {affectedAreas?.map((area, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {currentThreat?.pulse && (
        <div className="absolute inset-0 bg-current opacity-10 animate-ping rounded-lg" />
      )}
    </div>
  );
};

export default ThreatLevelBanner;