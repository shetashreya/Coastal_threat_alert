import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const HistoricalAlertsLog = ({ onExportData }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');

  const mockHistoricalAlerts = [
    {
      id: 'FLOOD-2024-008',
      type: 'Flood Warning',
      severity: 'high',
      title: 'Coastal Flood Warning - Downtown Area',
      description: 'High tide combined with storm surge causing flooding in low-lying areas',
      issuedAt: new Date('2024-08-29T14:30:00'),
      resolvedAt: new Date('2024-08-29T18:45:00'),
      affectedAreas: ['Downtown Waterfront', 'Marina District'],
      status: 'resolved',
      responseTime: '15 minutes',
      effectiveness: 4.2
    },
    {
      id: 'STORM-2024-007',
      type: 'Storm Alert',
      severity: 'critical',
      title: 'Severe Storm Warning - County Wide',
      description: 'Category 2 storm approaching with dangerous winds and storm surge',
      issuedAt: new Date('2024-08-28T08:15:00'),
      resolvedAt: new Date('2024-08-29T06:30:00'),
      affectedAreas: ['Entire County'],
      status: 'resolved',
      responseTime: '8 minutes',
      effectiveness: 4.8
    },
    {
      id: 'ADVISORY-2024-006',
      type: 'Weather Advisory',
      severity: 'low',
      title: 'High Surf Advisory',
      description: 'Elevated wave heights creating dangerous surf conditions',
      issuedAt: new Date('2024-08-27T16:20:00'),
      resolvedAt: new Date('2024-08-28T10:00:00'),
      affectedAreas: ['Beach Areas', 'Coastal Parks'],
      status: 'resolved',
      responseTime: '22 minutes',
      effectiveness: 3.9
    },
    {
      id: 'FLOOD-2024-005',
      type: 'Flood Watch',
      severity: 'medium',
      title: 'Flood Watch - River Basin',
      description: 'Heavy rainfall may cause river flooding in low-lying areas',
      issuedAt: new Date('2024-08-26T11:45:00'),
      resolvedAt: new Date('2024-08-26T20:15:00'),
      affectedAreas: ['River Basin', 'Industrial District'],
      status: 'resolved',
      responseTime: '12 minutes',
      effectiveness: 4.1
    },
    {
      id: 'HURRICANE-2024-004',
      type: 'Hurricane Watch',
      severity: 'critical',
      title: 'Hurricane Watch - Coastal Regions',
      description: 'Hurricane conditions possible within 48 hours',
      issuedAt: new Date('2024-08-25T06:00:00'),
      resolvedAt: new Date('2024-08-26T18:00:00'),
      affectedAreas: ['All Coastal Areas'],
      status: 'resolved',
      responseTime: '5 minutes',
      effectiveness: 4.9
    }
  ];

  const alertTypeOptions = [
    { value: 'all', label: 'All Alert Types' },
    { value: 'flood', label: 'Flood Alerts' },
    { value: 'storm', label: 'Storm Alerts' },
    { value: 'hurricane', label: 'Hurricane Alerts' },
    { value: 'advisory', label: 'Weather Advisories' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { color: 'text-critical', bg: 'bg-red-50', icon: 'AlertTriangle' },
      high: { color: 'text-high', bg: 'bg-amber-50', icon: 'AlertCircle' },
      medium: { color: 'text-medium', bg: 'bg-blue-50', icon: 'Info' },
      low: { color: 'text-low', bg: 'bg-emerald-50', icon: 'CheckCircle' }
    };
    return configs?.[severity] || configs?.medium;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-success';
      case 'active': return 'text-warning';
      case 'expired': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatDuration = (issuedAt, resolvedAt) => {
    const duration = resolvedAt - issuedAt;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const filteredAlerts = mockHistoricalAlerts?.filter(alert => {
    const matchesType = filterType === 'all' || alert?.type?.toLowerCase()?.includes(filterType);
    const matchesSeverity = filterSeverity === 'all' || alert?.severity === filterSeverity;
    const matchesSearch = searchTerm === '' || 
      alert?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      alert?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    return matchesType && matchesSeverity && matchesSearch;
  });

  const handleExport = (format) => {
    const exportData = {
      format,
      data: filteredAlerts,
      filters: { filterType, filterSeverity, searchTerm, dateRange },
      exportedAt: new Date()
    };
    
    if (onExportData) {
      onExportData(exportData);
    }
    
    console.log(`Exporting ${filteredAlerts?.length} alerts as ${format}:`, exportData);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="History" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Historical Alerts Log
              </h3>
              <p className="text-sm text-muted-foreground">
                Review past emergency alerts and their effectiveness
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => handleExport('pdf')}
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileSpreadsheet"
              iconPosition="left"
              onClick={() => handleExport('csv')}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Alert Type"
            options={alertTypeOptions}
            value={filterType}
            onChange={setFilterType}
          />
          
          <Select
            label="Severity"
            options={severityOptions}
            value={filterSeverity}
            onChange={setFilterSeverity}
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
          
          <Input
            label="Search"
            type="search"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>Showing {filteredAlerts?.length} of {mockHistoricalAlerts?.length} alerts</span>
          <Button variant="ghost" size="sm" iconName="RotateCcw">
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Alerts List */}
      <div className="divide-y divide-border">
        {filteredAlerts?.map((alert) => {
          const severityConfig = getSeverityConfig(alert?.severity);
          
          return (
            <div key={alert?.id} className="p-6 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${severityConfig?.bg} ${severityConfig?.color}`}>
                    <Icon name={severityConfig?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-md font-semibold text-foreground">
                        {alert?.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityConfig?.bg} ${severityConfig?.color}`}>
                        {alert?.severity?.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert?.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Issued: {formatDateTime(alert?.issuedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Duration: {formatDuration(alert?.issuedAt, alert?.resolvedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={12} />
                        <span>Response: {alert?.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} />
                        <span>Rating: {alert?.effectiveness}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(alert?.status)}`}>
                    {alert?.status?.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {alert?.id}
                  </div>
                </div>
              </div>
              {/* Affected Areas */}
              {alert?.affectedAreas && alert?.affectedAreas?.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Affected Areas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {alert?.affectedAreas?.map((area, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare">
                  View Feedback
                </Button>
                <Button variant="ghost" size="sm" iconName="BarChart3">
                  Impact Report
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {filteredAlerts?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">
            No Alerts Found
          </h4>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
      {/* Summary Statistics */}
      {filteredAlerts?.length > 0 && (
        <div className="p-6 border-t border-border bg-muted/30">
          <h4 className="text-md font-medium text-foreground mb-4">
            Summary Statistics
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredAlerts?.length}
              </div>
              <div className="text-xs text-muted-foreground">Total Alerts</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {Math.round(filteredAlerts?.reduce((acc, alert) => acc + alert?.effectiveness, 0) / filteredAlerts?.length * 10) / 10}
              </div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {Math.round(filteredAlerts?.reduce((acc, alert) => {
                  const responseMinutes = parseInt(alert?.responseTime);
                  return acc + responseMinutes;
                }, 0) / filteredAlerts?.length)}m
              </div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-critical">
                {filteredAlerts?.filter(alert => alert?.severity === 'critical')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Critical Alerts</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {Math.round((filteredAlerts?.filter(alert => alert?.status === 'resolved')?.length / filteredAlerts?.length) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalAlertsLog;