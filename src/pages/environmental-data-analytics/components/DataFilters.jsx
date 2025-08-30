import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataFilters = ({ 
  onFiltersChange, 
  initialFilters = {},
  onReset,
  onApply 
}) => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    sensorTypes: [],
    geographicBounds: '',
    dataQuality: 'all',
    alertLevels: [],
    customThresholds: {},
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const sensorTypeOptions = [
    { id: 'tidal', label: 'Tidal Sensors', icon: 'Waves' },
    { id: 'weather', label: 'Weather Stations', icon: 'Cloud' },
    { id: 'wind', label: 'Wind Monitors', icon: 'Wind' },
    { id: 'rainfall', label: 'Rain Gauges', icon: 'CloudRain' },
    { id: 'temperature', label: 'Temperature Sensors', icon: 'Thermometer' },
    { id: 'pressure', label: 'Pressure Sensors', icon: 'Gauge' }
  ];

  const dataQualityOptions = [
    { value: 'all', label: 'All Data' },
    { value: 'high', label: 'High Quality Only' },
    { value: 'validated', label: 'Validated Data' },
    { value: 'raw', label: 'Raw Data Only' }
  ];

  const alertLevelOptions = [
    { id: 'normal', label: 'Normal', color: 'text-success' },
    { id: 'advisory', label: 'Advisory', color: 'text-blue-600' },
    { id: 'watch', label: 'Watch', color: 'text-warning' },
    { id: 'warning', label: 'Warning', color: 'text-error' }
  ];

  const geographicBoundOptions = [
    { value: '', label: 'All Areas' },
    { value: 'zone-1', label: 'Coastal Zone 1' },
    { value: 'zone-2', label: 'Coastal Zone 2' },
    { value: 'zone-3', label: 'Coastal Zone 3' },
    { value: 'bay-area', label: 'Bay Area' },
    { value: 'offshore', label: 'Offshore Waters' }
  ];

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleSensorTypeToggle = (sensorId) => {
    setFilters(prev => ({
      ...prev,
      sensorTypes: prev?.sensorTypes?.includes(sensorId)
        ? prev?.sensorTypes?.filter(id => id !== sensorId)
        : [...prev?.sensorTypes, sensorId]
    }));
  };

  const handleAlertLevelToggle = (levelId) => {
    setFilters(prev => ({
      ...prev,
      alertLevels: prev?.alertLevels?.includes(levelId)
        ? prev?.alertLevels?.filter(id => id !== levelId)
        : [...prev?.alertLevels, levelId]
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
  };

  const handleThresholdChange = (parameter, value) => {
    setFilters(prev => ({
      ...prev,
      customThresholds: {
        ...prev?.customThresholds,
        [parameter]: value
      }
    }));
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: { start: '', end: '' },
      sensorTypes: [],
      geographicBounds: '',
      dataQuality: 'all',
      alertLevels: [],
      customThresholds: {}
    };
    setFilters(resetFilters);
    if (onReset) onReset();
  };

  const handleApply = () => {
    if (onApply) onApply(filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    if (filters?.sensorTypes?.length > 0) count++;
    if (filters?.geographicBounds) count++;
    if (filters?.dataQuality !== 'all') count++;
    if (filters?.alertLevels?.length > 0) count++;
    if (Object.keys(filters?.customThresholds)?.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Filter" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Data Filters</h3>
              <p className="text-sm text-muted-foreground">
                {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground mr-2">Quick Filters:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, dateRange: { start: new Date(Date.now() - 24*60*60*1000)?.toISOString()?.split('T')?.[0], end: new Date()?.toISOString()?.split('T')?.[0] } }))}
          >
            Last 24 Hours
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, sensorTypes: ['tidal', 'weather'] }))}
          >
            Critical Sensors
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, alertLevels: ['watch', 'warning'] }))}
          >
            Active Alerts
          </Button>
        </div>
      </div>
      {/* Detailed Filters */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Date Range</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={filters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
              />
            </div>
          </div>

          {/* Sensor Types */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Sensor Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sensorTypeOptions?.map((sensor) => (
                <div key={sensor?.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.sensorTypes?.includes(sensor?.id)}
                    onChange={() => handleSensorTypeToggle(sensor?.id)}
                  />
                  <Icon name={sensor?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{sensor?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Bounds */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Geographic Area</h4>
            <Select
              options={geographicBoundOptions}
              value={filters?.geographicBounds}
              onChange={(value) => setFilters(prev => ({ ...prev, geographicBounds: value }))}
              placeholder="Select geographic area"
            />
          </div>

          {/* Data Quality */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Data Quality</h4>
            <Select
              options={dataQualityOptions}
              value={filters?.dataQuality}
              onChange={(value) => setFilters(prev => ({ ...prev, dataQuality: value }))}
            />
          </div>

          {/* Alert Levels */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Alert Levels</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {alertLevelOptions?.map((level) => (
                <div key={level?.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.alertLevels?.includes(level?.id)}
                    onChange={() => handleAlertLevelToggle(level?.id)}
                  />
                  <span className={`text-sm font-medium ${level?.color}`}>{level?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Thresholds */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Custom Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Wind Speed Threshold (km/h)"
                type="number"
                placeholder="e.g., 40"
                value={filters?.customThresholds?.windSpeed || ''}
                onChange={(e) => handleThresholdChange('windSpeed', e?.target?.value)}
              />
              <Input
                label="Tidal Height Threshold (m)"
                type="number"
                placeholder="e.g., 3.5"
                value={filters?.customThresholds?.tidalHeight || ''}
                onChange={(e) => handleThresholdChange('tidalHeight', e?.target?.value)}
              />
              <Input
                label="Rainfall Threshold (mm/h)"
                type="number"
                placeholder="e.g., 10"
                value={filters?.customThresholds?.rainfall || ''}
                onChange={(e) => handleThresholdChange('rainfall', e?.target?.value)}
              />
              <Input
                label="Temperature Range (°C)"
                type="text"
                placeholder="e.g., 5-35"
                value={filters?.customThresholds?.temperature || ''}
                onChange={(e) => handleThresholdChange('temperature', e?.target?.value)}
              />
            </div>
          </div>
        </div>
      )}
      {/* Filter Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing data with {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={getActiveFilterCount() === 0}
            >
              Reset All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilters;