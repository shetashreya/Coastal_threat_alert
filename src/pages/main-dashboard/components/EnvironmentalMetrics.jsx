import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const EnvironmentalMetrics = ({ className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('tides');
  const [realTimeData, setRealTimeData] = useState([]);

  const metrics = [
    {
      key: 'tides',
      label: 'Tides',
      icon: 'Waves',
      unit: 'ft',
      color: '#3B82F6',
      current: 2.3,
      trend: 'rising'
    },
    {
      key: 'wind',
      label: 'Wind Speed',
      icon: 'Wind',
      unit: 'mph',
      color: '#10B981',
      current: 12.5,
      trend: 'stable'
    },
    {
      key: 'rainfall',
      label: 'Rainfall',
      icon: 'CloudRain',
      unit: 'in/hr',
      color: '#6366F1',
      current: 0.2,
      trend: 'decreasing'
    },
    {
      key: 'temperature',
      label: 'Temperature',
      icon: 'Thermometer',
      unit: '°F',
      color: '#F59E0B',
      current: 78.4,
      trend: 'stable'
    }
  ];

  const generateMockData = (metricKey) => {
    const now = new Date();
    const data = [];
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      let value;
      
      switch (metricKey) {
        case 'tides':
          value = 2 + Math.sin((i / 6) * Math.PI) * 1.5 + Math.random() * 0.3;
          break;
        case 'wind':
          value = 10 + Math.random() * 8 + Math.sin(i / 4) * 3;
          break;
        case 'rainfall':
          value = Math.max(0, Math.random() * 0.8 - 0.3);
          break;
        case 'temperature':
          value = 75 + Math.sin((i - 12) / 6 * Math.PI) * 5 + Math.random() * 2;
          break;
        default:
          value = Math.random() * 100;
      }
      
      data?.push({
        time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(value?.toFixed(1)),
        timestamp: time
      });
    }
    
    return data;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising':
        return { icon: 'TrendingUp', color: 'text-red-500' };
      case 'decreasing':
        return { icon: 'TrendingDown', color: 'text-green-500' };
      case 'stable':
        return { icon: 'Minus', color: 'text-gray-500' };
      default:
        return { icon: 'Minus', color: 'text-gray-500' };
    }
  };

  const getStatusColor = (metricKey, value) => {
    switch (metricKey) {
      case 'tides':
        if (value > 3.5) return 'text-red-600';
        if (value > 2.8) return 'text-amber-600';
        return 'text-green-600';
      case 'wind':
        if (value > 25) return 'text-red-600';
        if (value > 15) return 'text-amber-600';
        return 'text-green-600';
      case 'rainfall':
        if (value > 0.5) return 'text-red-600';
        if (value > 0.2) return 'text-amber-600';
        return 'text-green-600';
      case 'temperature':
        if (value > 85 || value < 65) return 'text-amber-600';
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  useEffect(() => {
    const updateData = () => {
      setRealTimeData(generateMockData(selectedMetric));
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [selectedMetric]);

  const currentMetric = metrics?.find(m => m?.key === selectedMetric);
  const trendInfo = getTrendIcon(currentMetric?.trend);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Environmental Metrics</h3>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Icon name="Clock" size={14} />
          <span>Live Data</span>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {metrics?.map((metric) => (
          <button
            key={metric?.key}
            onClick={() => setSelectedMetric(metric?.key)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              selectedMetric === metric?.key
                ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon 
                name={metric?.icon} 
                size={16} 
                className={selectedMetric === metric?.key ? 'text-blue-600' : 'text-gray-600'}
              />
              <span className={`text-sm font-medium ${
                selectedMetric === metric?.key ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {metric?.label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${getStatusColor(metric?.key, metric?.current)}`}>
                {metric?.current}
              </span>
              <span className="text-xs text-gray-500">{metric?.unit}</span>
            </div>
          </button>
        ))}
      </div>
      {/* Current Value Display */}
      {currentMetric && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white">
                <Icon name={currentMetric?.icon} size={20} style={{ color: currentMetric?.color }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{currentMetric?.label}</h4>
                <p className="text-sm text-gray-600">Current Reading</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getStatusColor(currentMetric?.key, currentMetric?.current)}`}>
                  {currentMetric?.current}
                </span>
                <span className="text-sm text-gray-500">{currentMetric?.unit}</span>
                <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
              </div>
              <p className="text-xs text-gray-500 capitalize">{currentMetric?.trend}</p>
            </div>
          </div>
        </div>
      )}
      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={realTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              stroke="#666"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value} ${currentMetric?.unit}`, currentMetric?.label]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={currentMetric?.color}
              strokeWidth={2}
              dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: currentMetric?.color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Status Indicators */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Normal</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-gray-600">Caution</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Alert</span>
          </div>
        </div>
        <div className="text-gray-500">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalMetrics;