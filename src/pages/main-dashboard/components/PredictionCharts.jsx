import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictionCharts = ({ className = '' }) => {
  const [selectedPrediction, setSelectedPrediction] = useState('tidal');
  const [predictionData, setPredictionData] = useState([]);
  const [confidenceLevel, setConfidenceLevel] = useState('high');

  const predictionTypes = [
    {
      key: 'tidal',
      label: 'Tidal Forecast',
      icon: 'Waves',
      color: '#3B82F6',
      unit: 'ft',
      description: '2-hour tidal prediction with surge analysis'
    },
    {
      key: 'storm',
      label: 'Storm Surge',
      icon: 'CloudLightning',
      color: '#EF4444',
      unit: 'ft',
      description: 'Storm surge height prediction'
    },
    {
      key: 'rainfall',
      label: 'Rainfall Intensity',
      icon: 'CloudRain',
      color: '#6366F1',
      unit: 'in/hr',
      description: 'Precipitation forecast with accumulation'
    },
    {
      key: 'wind',
      label: 'Wind Pattern',
      icon: 'Wind',
      color: '#10B981',
      unit: 'mph',
      description: 'Wind speed and direction forecast'
    }
  ];

  const generatePredictionData = (type) => {
    const now = new Date();
    const data = [];
    
    // Historical data (last 2 hours)
    for (let i = 8; i >= 1; i--) {
      const time = new Date(now.getTime() - i * 15 * 60 * 1000);
      let value, upperBound, lowerBound;
      
      switch (type) {
        case 'tidal':
          value = 2.2 + Math.sin((i / 4) * Math.PI) * 1.2;
          upperBound = value + 0.3;
          lowerBound = value - 0.3;
          break;
        case 'storm':
          value = Math.max(0, 0.5 + Math.sin(i / 3) * 0.8 + (i > 4 ? (i - 4) * 0.2 : 0));
          upperBound = value + 0.5;
          lowerBound = Math.max(0, value - 0.3);
          break;
        case 'rainfall':
          value = Math.max(0, 0.1 + Math.random() * 0.4);
          upperBound = value + 0.2;
          lowerBound = Math.max(0, value - 0.1);
          break;
        case 'wind':
          value = 12 + Math.sin(i / 2) * 4 + Math.random() * 3;
          upperBound = value + 3;
          lowerBound = Math.max(0, value - 3);
          break;
        default:
          value = Math.random() * 10;
          upperBound = value + 2;
          lowerBound = Math.max(0, value - 2);
      }
      
      data?.push({
        time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(value?.toFixed(1)),
        upperBound: parseFloat(upperBound?.toFixed(1)),
        lowerBound: parseFloat(lowerBound?.toFixed(1)),
        timestamp: time,
        isPrediction: false
      });
    }
    
    // Current time marker
    data?.push({
      time: 'NOW',
      value: data?.[data?.length - 1]?.value || 0,
      upperBound: data?.[data?.length - 1]?.upperBound || 0,
      lowerBound: data?.[data?.length - 1]?.lowerBound || 0,
      timestamp: now,
      isPrediction: false,
      isCurrentTime: true
    });
    
    // Prediction data (next 2 hours)
    for (let i = 1; i <= 8; i++) {
      const time = new Date(now.getTime() + i * 15 * 60 * 1000);
      let value, upperBound, lowerBound;
      
      switch (type) {
        case 'tidal':
          value = 2.2 + Math.sin(((8 + i) / 4) * Math.PI) * 1.2;
          upperBound = value + (0.3 + i * 0.05);
          lowerBound = value - (0.3 + i * 0.05);
          break;
        case 'storm':
          value = Math.max(0, 0.5 + Math.sin((8 + i) / 3) * 0.8 + (i > 2 ? (i - 2) * 0.3 : 0));
          upperBound = value + (0.5 + i * 0.1);
          lowerBound = Math.max(0, value - (0.3 + i * 0.05));
          break;
        case 'rainfall':
          value = Math.max(0, 0.1 + Math.sin(i / 2) * 0.3);
          upperBound = value + (0.2 + i * 0.03);
          lowerBound = Math.max(0, value - 0.1);
          break;
        case 'wind':
          value = 12 + Math.sin((8 + i) / 2) * 4 + (i > 4 ? 2 : 0);
          upperBound = value + (3 + i * 0.5);
          lowerBound = Math.max(0, value - 3);
          break;
        default:
          value = Math.random() * 10;
          upperBound = value + 2;
          lowerBound = Math.max(0, value - 2);
      }
      
      data?.push({
        time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(value?.toFixed(1)),
        upperBound: parseFloat(upperBound?.toFixed(1)),
        lowerBound: parseFloat(lowerBound?.toFixed(1)),
        timestamp: time,
        isPrediction: true
      });
    }
    
    return data;
  };

  const getConfidenceColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConfidencePercentage = (level) => {
    switch (level) {
      case 'high':
        return '85-95%';
      case 'medium':
        return '70-84%';
      case 'low':
        return '50-69%';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const updatePredictions = () => {
      setPredictionData(generatePredictionData(selectedPrediction));
      
      // Simulate confidence level changes
      const confidenceLevels = ['high', 'medium', 'low'];
      const randomConfidence = confidenceLevels?.[Math.floor(Math.random() * confidenceLevels?.length)];
      setConfidenceLevel(randomConfidence);
    };

    updatePredictions();
    const interval = setInterval(updatePredictions, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [selectedPrediction]);

  const currentPrediction = predictionTypes?.find(p => p?.key === selectedPrediction);
  const currentValue = predictionData?.find(d => d?.isCurrentTime)?.value || 0;
  const nextHourMax = Math.max(...predictionData?.filter(d => d?.isPrediction)?.slice(0, 4)?.map(d => d?.value));

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">AI-Powered Predictions</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-purple-600" />
          <span className="text-xs text-gray-500">Prophet ML Model</span>
        </div>
      </div>
      {/* Prediction Type Selector */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {predictionTypes?.map((prediction) => (
          <button
            key={prediction?.key}
            onClick={() => setSelectedPrediction(prediction?.key)}
            className={`p-2 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedPrediction === prediction?.key
                ? 'border-purple-500 bg-purple-50' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon 
                name={prediction?.icon} 
                size={14} 
                className={selectedPrediction === prediction?.key ? 'text-purple-600' : 'text-gray-600'}
              />
              <span className={`text-sm font-medium ${
                selectedPrediction === prediction?.key ? 'text-purple-900' : 'text-gray-700'
              }`}>
                {prediction?.label}
              </span>
            </div>
            <p className="text-xs text-gray-500">{prediction?.description}</p>
          </button>
        ))}
      </div>
      {/* Confidence and Current Status */}
      {currentPrediction && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">Prediction Confidence</span>
            </div>
            <div className={`text-sm font-bold ${getConfidenceColor(confidenceLevel)}`}>
              {getConfidencePercentage(confidenceLevel)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Current Value</p>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-gray-900">
                  {currentValue}
                </span>
                <span className="text-sm text-gray-500">{currentPrediction?.unit}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Next Hour Peak</p>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-purple-600">
                  {nextHourMax?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">{currentPrediction?.unit}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Prediction Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={predictionData}>
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
              formatter={(value, name) => {
                if (name === 'upperBound') return [`${value} ${currentPrediction?.unit}`, 'Upper Bound'];
                if (name === 'lowerBound') return [`${value} ${currentPrediction?.unit}`, 'Lower Bound'];
                return [`${value} ${currentPrediction?.unit}`, currentPrediction?.label];
              }}
            />
            
            {/* Confidence Interval */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stackId="1"
              stroke="none"
              fill={`${currentPrediction?.color}20`}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stackId="1"
              stroke="none"
              fill="white"
            />
            
            {/* Main Prediction Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke={currentPrediction?.color}
              strokeWidth={2}
              strokeDasharray={(d) => d?.isPrediction ? "5 5" : "0"}
              dot={(props) => {
                if (props?.payload?.isCurrentTime) {
                  return <circle cx={props?.cx} cy={props?.cy} r={6} fill="#FF6B6B" stroke="white" strokeWidth={2} />;
                }
                return props?.payload?.isPrediction ? 
                  <circle cx={props?.cx} cy={props?.cy} r={2} fill={currentPrediction?.color} /> :
                  <circle cx={props?.cx} cy={props?.cy} r={3} fill={currentPrediction?.color} />;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 bg-current" style={{ color: currentPrediction?.color }}></div>
            <span className="text-gray-600">Historical</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-0.5 border-dashed border-current" style={{ borderColor: currentPrediction?.color }}></div>
            <span className="text-gray-600">Predicted</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-2 bg-gray-200 rounded"></div>
            <span className="text-gray-600">Confidence Interval</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Current Time</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="xs"
          iconName="Download"
          className="text-xs"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default PredictionCharts;