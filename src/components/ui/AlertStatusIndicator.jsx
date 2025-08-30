import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AlertStatusIndicator = ({ 
  level = 'normal', 
  count = 0, 
  showLabel = false,
  className = '',
  onStatusClick
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const statusConfig = {
    critical: {
      label: 'Critical Alert',
      color: 'bg-red-500 text-white',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: 'AlertTriangle',
      pulse: true,
      description: 'Immediate action required'
    },
    high: {
      label: 'High Priority',
      color: 'bg-orange-500 text-white',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      icon: 'AlertCircle',
      pulse: true,
      description: 'Urgent attention needed'
    },
    medium: {
      label: 'Medium Priority',
      color: 'bg-blue-500 text-white',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: 'Info',
      pulse: false,
      description: 'Monitor situation'
    },
    low: {
      label: 'Low Priority',
      color: 'bg-green-500 text-white',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: 'CheckCircle',
      pulse: false,
      description: 'Advisory information'
    },
    normal: {
      label: 'Normal Operations',
      color: 'bg-gray-500 text-white',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      icon: 'Shield',
      pulse: false,
      description: 'All systems operational'
    }
  };

  const currentStatus = statusConfig?.[level] || statusConfig?.normal;

  const handleStatusClick = () => {
    if (onStatusClick) {
      onStatusClick(level, count);
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
    if (currentStatus?.pulse && (level === 'critical' || level === 'high')) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [level, currentStatus?.pulse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (showLabel) {
    return (
      <div className={`flex items-center justify-between p-4 rounded-xl border ${currentStatus.borderColor} ${currentStatus.bgColor} ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStatus.color} shadow-sm ${
                isAnimating ? 'animate-pulse' : ''
              }`}
            >
              <Icon 
                name={currentStatus?.icon} 
                size={18} 
                className="drop-shadow-sm"
              />
            </div>
            {currentStatus?.pulse && (level === 'critical' || level === 'high') && (
              <div className={`absolute inset-0 rounded-full ${currentStatus.color} opacity-75 animate-ping`} />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {currentStatus?.label}
            </span>
            <span className="text-xs text-gray-600">
              {currentStatus?.description}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {count > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-gray-900">
                {count}
              </span>
              <span className="text-xs text-gray-600">
                {count === 1 ? 'alert' : 'alerts'}
              </span>
            </div>
          )}
          <div className="text-xs text-gray-500 font-mono">
            {formatLastUpdate()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleStatusClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${className}`}
      title={`${currentStatus?.label}: ${currentStatus?.description}${count > 0 ? ` (${count} active)` : ''}`}
      aria-label={`Alert status: ${currentStatus?.label}${count > 0 ? `, ${count} active alerts` : ''}`}
    >
      <div className="relative">
        <div 
          className={`flex items-center justify-center w-7 h-7 rounded-full ${currentStatus.color} shadow-sm ${
            isAnimating ? 'animate-pulse' : ''
          }`}
        >
          <Icon 
            name={currentStatus?.icon} 
            size={14} 
            className="drop-shadow-sm"
          />
        </div>
        
        {count > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {count > 99 ? '99+' : count}
          </div>
        )}
        
        {currentStatus?.pulse && (level === 'critical' || level === 'high') && (
          <div className={`absolute inset-0 rounded-full ${currentStatus.color} opacity-75 animate-ping`} />
        )}
      </div>
      <div className="hidden lg:flex flex-col items-start">
        <span className="text-xs font-medium text-gray-900">
          {currentStatus?.label}
        </span>
        <span className="text-xs text-gray-500 font-mono">
          {formatLastUpdate()}
        </span>
      </div>
    </button>
  );
};

export default AlertStatusIndicator;