import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveAlertCard = ({ 
  alert = {
    id: '1',
    type: 'Flood Watch',
    severity: 'high',
    title: 'Coastal Flood Watch',
    description: 'Rising tide levels expected to cause minor flooding in low-lying coastal areas',
    affectedAreas: ['Downtown Waterfront', 'Marina District'],
    issuedAt: new Date(Date.now() - 1800000),
    expiresAt: new Date(Date.now() + 7200000),
    actions: ['Move vehicles to higher ground', 'Avoid walking in flooded areas'],
    triggerConditions: 'Tide level: 8.2ft (threshold: 8.0ft), Wind speed: 25mph from southeast'
  },
  onViewDetails,
  onDismiss
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const severityConfig = {
    critical: {
      color: 'border-critical bg-red-50',
      textColor: 'text-critical',
      icon: 'AlertTriangle'
    },
    high: {
      color: 'border-high bg-amber-50',
      textColor: 'text-high',
      icon: 'AlertCircle'
    },
    medium: {
      color: 'border-medium bg-blue-50',
      textColor: 'text-medium',
      icon: 'Info'
    },
    low: {
      color: 'border-low bg-emerald-50',
      textColor: 'text-low',
      icon: 'CheckCircle'
    }
  };

  const config = severityConfig?.[alert?.severity] || severityConfig?.medium;

  const getTimeRemaining = () => {
    const now = new Date();
    const timeLeft = alert?.expiresAt - now;
    
    if (timeLeft <= 0) return 'Expired';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    })?.format(date);
  };

  return (
    <div className={`rounded-lg border-2 ${config?.color} bg-card shadow-lg`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${config?.color} ${config?.textColor}`}>
              <Icon name={config?.icon} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {alert?.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{alert?.type}</span>
                <span>•</span>
                <span className={`font-medium ${config?.textColor}`}>
                  {alert?.severity?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-sm font-medium ${config?.textColor}`}>
              {getTimeRemaining()}
            </div>
            <div className="text-xs text-muted-foreground">
              Issued: {formatTime(alert?.issuedAt)}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground mb-4 leading-relaxed">
          {alert?.description}
        </p>

        {/* Affected Areas */}
        {alert?.affectedAreas && alert?.affectedAreas?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Affected Areas:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {alert?.affectedAreas?.map((area, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {alert?.actions && alert?.actions?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckSquare" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Recommended Actions:</span>
            </div>
            <ul className="space-y-1">
              {alert?.actions?.map((action, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-foreground">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 text-muted-foreground flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Explanation Panel */}
        {showExplanation && (
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Why this alert was triggered:</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {alert?.triggerConditions}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Info"
            iconPosition="left"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? 'Hide' : 'Show'} Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Map"
            iconPosition="left"
            onClick={() => onViewDetails && onViewDetails(alert)}
          >
            View on Map
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
          >
            Share Alert
          </Button>
          
          {alert?.severity !== 'critical' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => onDismiss && onDismiss(alert?.id)}
              className="ml-auto"
            >
              Dismiss
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveAlertCard;