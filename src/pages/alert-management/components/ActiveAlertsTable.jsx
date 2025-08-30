import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActiveAlertsTable = ({ alerts = [], onAlertAction, onExportAlerts }) => {
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const mockAlerts = [
    {
      id: 'ALT-2024-001',
      title: 'Coastal Flood Watch',
      severity: 'watch',
      timestamp: new Date('2024-08-30T20:15:00'),
      zones: ['Zone A', 'Zone B'],
      affectedPopulation: 12500,
      deliveryStatus: {
        sms: { sent: 8420, delivered: 8156, failed: 264 },
        push: { sent: 9850, delivered: 9654, failed: 196 },
        whatsapp: { sent: 6200, delivered: 5987, failed: 213 },
        email: { sent: 11200, delivered: 10876, failed: 324 }
      },
      status: 'active',
      escalationLevel: 1,
      confirmationRate: 78.5,
      expiryTime: new Date('2024-08-31T06:00:00')
    },
    {
      id: 'ALT-2024-002',
      title: 'Storm Surge Warning',
      severity: 'warning',
      timestamp: new Date('2024-08-30T19:45:00'),
      zones: ['Zone C', 'Zone D', 'Zone E'],
      affectedPopulation: 18750,
      deliveryStatus: {
        sms: { sent: 15600, delivered: 15234, failed: 366 },
        push: { sent: 17200, delivered: 16854, failed: 346 },
        whatsapp: { sent: 12400, delivered: 11987, failed: 413 },
        email: { sent: 16800, delivered: 16234, failed: 566 }
      },
      status: 'active',
      escalationLevel: 2,
      confirmationRate: 85.2,
      expiryTime: new Date('2024-08-31T08:00:00')
    },
    {
      id: 'ALT-2024-003',
      title: 'High Tide Advisory',
      severity: 'advisory',
      timestamp: new Date('2024-08-30T18:30:00'),
      zones: ['Zone A'],
      affectedPopulation: 5200,
      deliveryStatus: {
        sms: { sent: 4100, delivered: 3987, failed: 113 },
        push: { sent: 4850, delivered: 4756, failed: 94 },
        whatsapp: { sent: 2800, delivered: 2734, failed: 66 },
        email: { sent: 4600, delivered: 4456, failed: 144 }
      },
      status: 'expired',
      escalationLevel: 0,
      confirmationRate: 92.1,
      expiryTime: new Date('2024-08-30T22:00:00')
    }
  ];

  const displayAlerts = alerts?.length > 0 ? alerts : mockAlerts;

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'warning', label: 'Warning' },
    { value: 'watch', label: 'Watch' },
    { value: 'advisory', label: 'Advisory' }
  ];

  const sortOptions = [
    { value: 'timestamp', label: 'Timestamp' },
    { value: 'severity', label: 'Severity' },
    { value: 'population', label: 'Affected Population' },
    { value: 'confirmation', label: 'Confirmation Rate' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning': return 'bg-red-100 text-red-800 border-red-200';
      case 'watch': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'advisory': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateOverallDeliveryRate = (deliveryStatus) => {
    const totalSent = Object.values(deliveryStatus)?.reduce((sum, channel) => sum + channel?.sent, 0);
    const totalDelivered = Object.values(deliveryStatus)?.reduce((sum, channel) => sum + channel?.delivered, 0);
    return totalSent > 0 ? ((totalDelivered / totalSent) * 100)?.toFixed(1) : 0;
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev =>
      prev?.includes(alertId)
        ? prev?.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAlerts?.length === displayAlerts?.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(displayAlerts?.map(alert => alert?.id));
    }
  };

  const handleBulkAction = (action) => {
    if (onAlertAction) {
      onAlertAction(action, selectedAlerts);
    }
    setSelectedAlerts([]);
  };

  const filteredAlerts = displayAlerts?.filter(alert =>
    filterSeverity === 'all' || alert?.severity === filterSeverity
  );

  const sortedAlerts = [...filteredAlerts]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'timestamp':
        aValue = new Date(a.timestamp);
        bValue = new Date(b.timestamp);
        break;
      case 'severity':
        const severityOrder = { warning: 3, watch: 2, advisory: 1 };
        aValue = severityOrder?.[a?.severity] || 0;
        bValue = severityOrder?.[b?.severity] || 0;
        break;
      case 'population':
        aValue = a?.affectedPopulation;
        bValue = b?.affectedPopulation;
        break;
      case 'confirmation':
        aValue = a?.confirmationRate;
        bValue = b?.confirmationRate;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => onExportAlerts && onExportAlerts('csv')}
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => onExportAlerts && onExportAlerts('pdf')}
              iconName="FileText"
              iconPosition="left"
              size="sm"
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              options={severityOptions}
              value={filterSeverity}
              onChange={setFilterSeverity}
              className="w-40"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-40"
            />
            <Button
              variant="ghost"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
              size="sm"
            >
              {sortOrder?.toUpperCase()}
            </Button>
          </div>

          {selectedAlerts?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedAlerts?.length} selected
              </span>
              <Button
                variant="outline"
                onClick={() => handleBulkAction('cancel')}
                iconName="X"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => handleBulkAction('extend')}
                iconName="Clock"
                size="sm"
              >
                Extend
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedAlerts?.length === displayAlerts?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Alert Details</th>
              <th className="text-left p-4 font-medium text-foreground">Severity</th>
              <th className="text-left p-4 font-medium text-foreground">Affected Areas</th>
              <th className="text-left p-4 font-medium text-foreground">Delivery Status</th>
              <th className="text-left p-4 font-medium text-foreground">Confirmation</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAlerts?.map((alert) => (
              <tr key={alert?.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedAlerts?.includes(alert?.id)}
                    onChange={() => handleSelectAlert(alert?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{alert?.title}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {alert?.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTimestamp(alert?.timestamp)}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity?.toUpperCase()}
                  </span>
                  <div className={`text-xs mt-1 ${getStatusColor(alert?.status)}`}>
                    {alert?.status?.toUpperCase()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">
                      {alert?.zones?.join(', ')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {alert?.affectedPopulation?.toLocaleString()} people
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">
                      {calculateOverallDeliveryRate(alert?.deliveryStatus)}% delivered
                    </div>
                    <div className="flex space-x-1">
                      {Object.entries(alert?.deliveryStatus)?.map(([channel, status]) => (
                        <div
                          key={channel}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: status?.delivered / status?.sent > 0.9 ? '#10B981' : 
                                           status?.delivered / status?.sent > 0.7 ? '#F59E0B' : '#EF4444'
                          }}
                          title={`${channel}: ${((status?.delivered / status?.sent) * 100)?.toFixed(1)}%`}
                        />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">
                      {alert?.confirmationRate}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${alert?.confirmationRate}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction && onAlertAction('view', alert?.id)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction && onAlertAction('edit', alert?.id)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAlertAction && onAlertAction('cancel', alert?.id)}
                      iconName="X"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedAlerts?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="AlertTriangle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No alerts found</h4>
          <p className="text-muted-foreground">
            No alerts match your current filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActiveAlertsTable;