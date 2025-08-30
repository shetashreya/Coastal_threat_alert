import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsToolbar = ({ 
  onTimeRangeChange, 
  onDataSourceToggle, 
  onExport,
  activeDataSources = [],
  timeRange = '24h'
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const dataSourceOptions = [
    { id: 'tides', label: 'Tidal Data', icon: 'Waves', color: 'text-blue-600' },
    { id: 'wind', label: 'Wind Speed', icon: 'Wind', color: 'text-green-600' },
    { id: 'rainfall', label: 'Rainfall', icon: 'CloudRain', color: 'text-indigo-600' },
    { id: 'temperature', label: 'Temperature', icon: 'Thermometer', color: 'text-orange-600' },
    { id: 'pressure', label: 'Barometric Pressure', icon: 'Gauge', color: 'text-purple-600' },
    { id: 'humidity', label: 'Humidity', icon: 'Droplets', color: 'text-cyan-600' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF', icon: 'FileText' },
    { value: 'csv', label: 'Export as CSV', icon: 'Download' },
    { value: 'json', label: 'Export as JSON', icon: 'Code' }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDataSourceToggle = (sourceId) => {
    onDataSourceToggle(sourceId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Time Range Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Time Range:</span>
          </div>
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={onTimeRangeChange}
            className="w-40"
          />
        </div>

        {/* Data Source Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground mr-2">Data Sources:</span>
          {dataSourceOptions?.map((source) => (
            <button
              key={source?.id}
              onClick={() => handleDataSourceToggle(source?.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeDataSources?.includes(source?.id)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={source?.icon} size={14} className={activeDataSources?.includes(source?.id) ? '' : source?.color} />
              <span>{source?.label}</span>
            </button>
          ))}
        </div>

        {/* Export Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Export:</span>
          {exportOptions?.map((option) => (
            <Button
              key={option?.value}
              variant="outline"
              size="sm"
              iconName={option?.icon}
              iconPosition="left"
              onClick={() => handleExport(option?.value)}
              disabled={isExporting}
              loading={isExporting}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Refresh Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            Configure Alerts
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Activity" size={16} className="text-success" />
          <span>Real-time updates active</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsToolbar;