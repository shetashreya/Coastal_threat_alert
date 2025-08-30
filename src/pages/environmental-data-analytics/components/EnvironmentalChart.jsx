import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentalChart = ({ 
  title, 
  dataType, 
  data = [], 
  color = '#3B82F6',
  unit = '',
  showPrediction = false,
  onDragStart,
  onDragEnd,
  isDraggable = true
}) => {
  const [chartType, setChartType] = useState('line');
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mock data generation for demonstration
  const generateMockData = () => {
    const now = new Date();
    const mockData = [];
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      let value, prediction, confidence;
      
      switch (dataType) {
        case 'tides':
          value = 2.5 + Math.sin((i / 24) * 2 * Math.PI) * 1.5 + Math.random() * 0.3;
          prediction = value + Math.random() * 0.5 - 0.25;
          confidence = Math.random() * 0.3 + 0.1;
          break;
        case 'wind':
          value = 15 + Math.random() * 20;
          prediction = value + Math.random() * 5 - 2.5;
          confidence = Math.random() * 3 + 1;
          break;
        case 'rainfall':
          value = Math.random() * 10;
          prediction = value + Math.random() * 2 - 1;
          confidence = Math.random() * 1 + 0.5;
          break;
        case 'temperature':
          value = 22 + Math.sin((i / 24) * 2 * Math.PI) * 5 + Math.random() * 2;
          prediction = value + Math.random() * 2 - 1;
          confidence = Math.random() * 1 + 0.5;
          break;
        default:
          value = Math.random() * 100;
          prediction = value + Math.random() * 10 - 5;
          confidence = Math.random() * 5 + 2;
      }
      
      mockData?.push({
        timestamp: timestamp?.toISOString(),
        time: timestamp?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(value?.toFixed(2)),
        prediction: showPrediction ? parseFloat(prediction?.toFixed(2)) : null,
        confidenceUpper: showPrediction ? parseFloat((prediction + confidence)?.toFixed(2)) : null,
        confidenceLower: showPrediction ? parseFloat((prediction - confidence)?.toFixed(2)) : null
      });
    }
    
    return mockData;
  };

  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateMockData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [dataType, showPrediction]);

  const getChartIcon = () => {
    switch (dataType) {
      case 'tides': return 'Waves';
      case 'wind': return 'Wind';
      case 'rainfall': return 'CloudRain';
      case 'temperature': return 'Thermometer';
      default: return 'BarChart3';
    }
  };

  const getStatusColor = () => {
    const latestValue = chartData?.[chartData?.length - 1]?.value || 0;
    
    switch (dataType) {
      case 'tides':
        return latestValue > 3.5 ? 'text-critical' : latestValue > 2.5 ? 'text-warning' : 'text-success';
      case 'wind':
        return latestValue > 40 ? 'text-critical' : latestValue > 25 ? 'text-warning' : 'text-success';
      case 'rainfall':
        return latestValue > 8 ? 'text-critical' : latestValue > 5 ? 'text-warning' : 'text-success';
      case 'temperature':
        return latestValue > 35 || latestValue < 5 ? 'text-critical' : 'text-success';
      default:
        return 'text-success';
    }
  };

  const handleDragStart = (e) => {
    if (!isDraggable) return;
    setIsDragging(true);
    if (onDragStart) onDragStart(e);
  };

  const handleDragEnd = (e) => {
    if (!isDraggable) return;
    setIsDragging(false);
    if (onDragEnd) onDragEnd(e);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${unit}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 shadow-sm transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
      } ${isDraggable ? 'cursor-move' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-muted ${getStatusColor()}`}>
            <Icon name={getChartIcon()} size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              Current: {chartData?.[chartData?.length - 1]?.value || 0}{unit}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'ghost'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => setChartType('line')}
          />
          <Button
            variant={chartType === 'area' ? 'default' : 'ghost'}
            size="sm"
            iconName="AreaChart"
            onClick={() => setChartType('area')}
          />
          {showPrediction && (
            <Button
              variant={showConfidenceInterval ? 'default' : 'ghost'}
              size="sm"
              iconName="Target"
              onClick={() => setShowConfidenceInterval(!showConfidenceInterval)}
            />
          )}
        </div>
      </div>
      {/* Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {showConfidenceInterval && showPrediction && (
                <Area
                  type="monotone"
                  dataKey="confidenceUpper"
                  stackId="confidence"
                  stroke="none"
                  fill={`${color}20`}
                  name="Confidence Interval"
                />
              )}
              
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`${color}40`}
                strokeWidth={2}
                name="Actual"
              />
              
              {showPrediction && (
                <Area
                  type="monotone"
                  dataKey="prediction"
                  stroke={`${color}80`}
                  fill={`${color}20`}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Prediction"
                />
              )}
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                name="Actual"
              />
              
              {showPrediction && (
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke={`${color}80`}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: `${color}80`, strokeWidth: 2, r: 3 }}
                  name="Prediction"
                />
              )}
              
              {showConfidenceInterval && showPrediction && (
                <>
                  <Line
                    type="monotone"
                    dataKey="confidenceUpper"
                    stroke={`${color}40`}
                    strokeWidth={1}
                    dot={false}
                    name="Upper Confidence"
                  />
                  <Line
                    type="monotone"
                    dataKey="confidenceLower"
                    stroke={`${color}40`}
                    strokeWidth={1}
                    dot={false}
                    name="Lower Confidence"
                  />
                </>
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Chart Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Live Data</span>
          </div>
          {showPrediction && (
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={14} />
              <span>AI Prediction</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalChart;