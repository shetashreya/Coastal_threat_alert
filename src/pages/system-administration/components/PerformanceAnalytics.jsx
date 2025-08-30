import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('alerts');
  const [analyticsData, setAnalyticsData] = useState({});

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'alerts', label: 'Alert Performance' },
    { value: 'system', label: 'System Usage' },
    { value: 'engagement', label: 'Community Engagement' },
    { value: 'delivery', label: 'Delivery Success' }
  ];

  const mockAnalyticsData = {
    summary: {
      totalAlerts: 1247,
      successfulDeliveries: 1189,
      averageResponseTime: 2.3,
      systemUptime: 99.8,
      activeUsers: 3456,
      communityEngagement: 87.5
    },
    alertPerformance: [
      { date: '2025-08-24', sent: 45, delivered: 43, acknowledged: 38, effectiveness: 84 },
      { date: '2025-08-25', sent: 67, delivered: 65, acknowledged: 58, effectiveness: 89 },
      { date: '2025-08-26', sent: 23, delivered: 22, acknowledged: 19, effectiveness: 86 },
      { date: '2025-08-27', sent: 89, delivered: 87, acknowledged: 79, effectiveness: 91 },
      { date: '2025-08-28', sent: 156, delivered: 152, acknowledged: 138, effectiveness: 91 },
      { date: '2025-08-29', sent: 78, delivered: 76, acknowledged: 68, effectiveness: 89 },
      { date: '2025-08-30', sent: 134, delivered: 131, acknowledged: 118, effectiveness: 90 }
    ],
    systemUsage: [
      { hour: '00:00', cpu: 25, memory: 45, network: 12, requests: 234 },
      { hour: '04:00', cpu: 18, memory: 42, network: 8, requests: 156 },
      { hour: '08:00', cpu: 65, memory: 68, network: 45, requests: 892 },
      { hour: '12:00', cpu: 78, memory: 72, network: 56, requests: 1245 },
      { hour: '16:00', cpu: 82, memory: 75, network: 62, requests: 1456 },
      { hour: '20:00', cpu: 45, memory: 58, network: 34, requests: 678 }
    ],
    deliveryChannels: [
      { name: 'SMS', value: 45, color: '#3B82F6' },
      { name: 'Email', value: 30, color: '#10B981' },
      { name: 'Push', value: 20, color: '#F59E0B' },
      { name: 'WhatsApp', value: 5, color: '#8B5CF6' }
    ],
    communityEngagement: [
      { date: '2025-08-24', views: 1234, interactions: 456, feedback: 89, satisfaction: 4.2 },
      { date: '2025-08-25', views: 1567, interactions: 623, feedback: 134, satisfaction: 4.4 },
      { date: '2025-08-26', views: 987, interactions: 345, feedback: 67, satisfaction: 4.1 },
      { date: '2025-08-27', views: 2134, interactions: 789, feedback: 156, satisfaction: 4.5 },
      { date: '2025-08-28', views: 2456, interactions: 892, feedback: 178, satisfaction: 4.3 },
      { date: '2025-08-29', views: 1789, interactions: 567, feedback: 123, satisfaction: 4.2 },
      { date: '2025-08-30', views: 2234, interactions: 734, feedback: 145, satisfaction: 4.4 }
    ]
  };

  useEffect(() => {
    setAnalyticsData(mockAnalyticsData);
  }, []);

  const renderSummaryCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Alerts</p>
            <p className="text-2xl font-bold text-foreground">{analyticsData?.summary?.totalAlerts?.toLocaleString()}</p>
          </div>
          <Icon name="AlertTriangle" size={24} className="text-blue-500" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Delivery Rate</p>
            <p className="text-2xl font-bold text-success">
              {((analyticsData?.summary?.successfulDeliveries / analyticsData?.summary?.totalAlerts) * 100)?.toFixed(1)}%
            </p>
          </div>
          <Icon name="CheckCircle" size={24} className="text-success" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold text-foreground">{analyticsData?.summary?.averageResponseTime}s</p>
          </div>
          <Icon name="Clock" size={24} className="text-orange-500" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">System Uptime</p>
            <p className="text-2xl font-bold text-success">{analyticsData?.summary?.systemUptime}%</p>
          </div>
          <Icon name="Activity" size={24} className="text-success" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-foreground">{analyticsData?.summary?.activeUsers?.toLocaleString()}</p>
          </div>
          <Icon name="Users" size={24} className="text-purple-500" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Engagement</p>
            <p className="text-2xl font-bold text-foreground">{analyticsData?.summary?.communityEngagement}%</p>
          </div>
          <Icon name="TrendingUp" size={24} className="text-green-500" />
        </div>
      </div>
    </div>
  );

  const renderAlertPerformanceChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-md font-semibold text-foreground mb-4">Alert Performance Trends</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData?.alertPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
            />
            <Bar dataKey="sent" fill="#3B82F6" name="Sent" />
            <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
            <Bar dataKey="acknowledged" fill="#F59E0B" name="Acknowledged" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSystemUsageChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-md font-semibold text-foreground mb-4">System Resource Usage</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData?.systemUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line type="monotone" dataKey="cpu" stroke="#EF4444" strokeWidth={2} name="CPU %" />
            <Line type="monotone" dataKey="memory" stroke="#3B82F6" strokeWidth={2} name="Memory %" />
            <Line type="monotone" dataKey="network" stroke="#10B981" strokeWidth={2} name="Network %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDeliveryChannelsChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-md font-semibold text-foreground mb-4">Delivery Channel Distribution</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={analyticsData?.deliveryChannels}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
            >
              {analyticsData?.deliveryChannels?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCommunityEngagementChart = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-md font-semibold text-foreground mb-4">Community Engagement Metrics</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData?.communityEngagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
            />
            <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Views" />
            <Line type="monotone" dataKey="interactions" stroke="#10B981" strokeWidth={2} name="Interactions" />
            <Line type="monotone" dataKey="feedback" stroke="#F59E0B" strokeWidth={2} name="Feedback" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSelectedChart = () => {
    switch (selectedMetric) {
      case 'alerts':
        return renderAlertPerformanceChart();
      case 'system':
        return renderSystemUsageChart();
      case 'engagement':
        return renderCommunityEngagementChart();
      case 'delivery':
        return renderDeliveryChannelsChart();
      default:
        return renderAlertPerformanceChart();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Monitor system performance and community engagement metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-48"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Summary Cards */}
      {renderSummaryCards()}
      {/* Main Chart */}
      {renderSelectedChart()}
      {/* Additional Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Effectiveness */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Alert Effectiveness by Type</h4>
          <div className="space-y-4">
            {[
              { type: 'Flood Warning', effectiveness: 92, count: 45 },
              { type: 'Storm Surge', effectiveness: 89, count: 23 },
              { type: 'High Wind', effectiveness: 87, count: 34 },
              { type: 'Heavy Rain', effectiveness: 85, count: 56 }
            ]?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{item?.type}</span>
                    <span className="text-sm text-muted-foreground">{item?.count} alerts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.effectiveness}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-foreground">{item?.effectiveness}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Times */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Average Response Times</h4>
          <div className="space-y-4">
            {[
              { service: 'SMS Delivery', time: 1.2, status: 'excellent' },
              { service: 'Email Delivery', time: 2.8, status: 'good' },
              { service: 'Push Notification', time: 0.8, status: 'excellent' },
              { service: 'Database Query', time: 0.3, status: 'excellent' },
              { service: 'API Response', time: 4.2, status: 'warning' }
            ]?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item?.service}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{item?.time}s</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item?.status === 'excellent' ? 'bg-success' :
                    item?.status === 'good'? 'bg-blue-500' : 'bg-warning'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;