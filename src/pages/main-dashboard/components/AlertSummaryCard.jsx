import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertSummaryCard = ({
  severity = 'normal',
  count = 0,
  title = 'Alert Title',
  description = 'Alert description',
  lastUpdate = new Date(),
  onViewDetails,
  onQuickAction
}) => {
  const severityConfig = {
    critical: {
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: 'AlertTriangle',
      label: 'Critical'
    },
    high: {
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      icon: 'AlertCircle',
      label: 'High'
    },
    medium: {
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: 'Info',
      label: 'Medium'
    },
    low: {
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: 'CheckCircle',
      label: 'Low'
    },
    normal: {
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      icon: 'Shield',
      label: 'Normal'
    }
  };

  const config = severityConfig[severity] || severityConfig.normal;

  const formatTimeAgo = (date) => {
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

  return (
    <div className={`bg-white border ${config.borderColor} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between mb-3">
        {/* Severity Indicator */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}>
            <Icon
              name={config.icon}
              size={20}
              className={config.textColor}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-semibold ${config.textColor}`}>
                {config.label}
              </span>
              {count > 0 && (
                <span className={`px-2 py-1 text-xs font-bold ${config.color} text-white rounded-full`}>
                  {count}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {formatTimeAgo(lastUpdate)}
            </p>
          </div>
        </div>

        {/* Quick Action Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onQuickAction}
          className="text-gray-400 hover:text-gray-600"
        >
          <Icon name="MoreVertical" size={16} />
        </Button>
      </div>

      {/* Alert Content */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onViewDetails}
        iconName="Eye"
        iconPosition="left"
        fullWidth
        className="text-xs"
      >
        View Details
      </Button>
    </div>
  );
};

export default AlertSummaryCard;