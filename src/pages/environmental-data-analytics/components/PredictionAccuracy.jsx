import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictionAccuracy = ({ 
  modelType = 'prophet',
  timeRange = '7d' 
}) => {
  const [activeTab, setActiveTab] = useState('accuracy');
  const [selectedModel, setSelectedModel] = useState('prophet');

  // Mock accuracy data
  const accuracyData = [
    { parameter: 'Tidal Height', accuracy: 94.2, confidence: 0.92, predictions: 1247 },
    { parameter: 'Wind Speed', accuracy: 87.5, confidence: 0.85, predictions: 1156 },
    { parameter: 'Rainfall', accuracy: 78.3, confidence: 0.76, predictions: 892 },
    { parameter: 'Temperature', accuracy: 91.8, confidence: 0.89, predictions: 1334 },
    { parameter: 'Pressure', accuracy: 89.1, confidence: 0.87, predictions: 1098 }
  ];

  // Mock model performance data
  const modelPerformance = [
    { model: 'Prophet', accuracy: 89.2, speed: 'Fast', complexity: 'Medium' },
    { model: 'LSTM', accuracy: 91.5, speed: 'Slow', complexity: 'High' },
    { model: 'ARIMA', accuracy: 85.7, speed: 'Medium', complexity: 'Low' },
    { model: 'Random Forest', accuracy: 87.3, speed: 'Fast', complexity: 'Medium' }
  ];

  // Mock anomaly detection data
  const anomalyData = [
    { type: 'True Positive', count: 45, percentage: 78.9 },
    { type: 'False Positive', count: 8, percentage: 14.0 },
    { type: 'False Negative', count: 4, percentage: 7.0 }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  const tabs = [
    { id: 'accuracy', label: 'Prediction Accuracy', icon: 'Target' },
    { id: 'models', label: 'Model Performance', icon: 'Brain' },
    { id: 'anomalies', label: 'Anomaly Detection', icon: 'AlertCircle' }
  ];

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 80) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyBgColor = (accuracy) => {
    if (accuracy >= 90) return 'bg-success';
    if (accuracy >= 80) return 'bg-warning';
    return 'bg-error';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${entry?.name === 'Accuracy' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Prediction Analytics</h3>
              <p className="text-sm text-muted-foreground">Model performance and accuracy metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'accuracy' && (
          <div className="space-y-6">
            {/* Accuracy Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">Overall Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-success">89.2%</p>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Confidence Score</span>
                </div>
                <p className="text-2xl font-bold text-primary">0.87</p>
                <p className="text-xs text-muted-foreground">Average confidence</p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Activity" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Total Predictions</span>
                </div>
                <p className="text-2xl font-bold text-warning">5,727</p>
                <p className="text-xs text-muted-foreground">This period</p>
              </div>
            </div>

            {/* Accuracy Chart */}
            <div className="h-80">
              <h4 className="text-md font-semibold text-foreground mb-4">Accuracy by Parameter</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="parameter" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="accuracy" 
                    fill="var(--color-primary)" 
                    name="Accuracy (%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Accuracy Table */}
            <div>
              <h4 className="text-md font-semibold text-foreground mb-4">Detailed Metrics</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Parameter</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Accuracy</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Confidence</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Predictions</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accuracyData?.map((item, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 font-medium text-foreground">{item?.parameter}</td>
                        <td className="py-3">
                          <span className={`font-semibold ${getAccuracyColor(item?.accuracy)}`}>
                            {item?.accuracy}%
                          </span>
                        </td>
                        <td className="py-3 text-foreground">{item?.confidence}</td>
                        <td className="py-3 text-foreground">{item?.predictions?.toLocaleString()}</td>
                        <td className="py-3">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item?.accuracy >= 90 ? 'bg-success/10 text-success' :
                            item?.accuracy >= 80 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                          }`}>
                            {item?.accuracy >= 90 ? 'Excellent' : item?.accuracy >= 80 ? 'Good' : 'Needs Improvement'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-6">
            {/* Model Comparison */}
            <div>
              <h4 className="text-md font-semibold text-foreground mb-4">Model Performance Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modelPerformance?.map((model, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      selectedModel === model?.model?.toLowerCase()
                        ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedModel(model?.model?.toLowerCase())}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-foreground">{model?.model}</h5>
                      <Icon name="Brain" size={16} className="text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Accuracy:</span>
                        <span className={`text-xs font-medium ${getAccuracyColor(model?.accuracy)}`}>
                          {model?.accuracy}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Speed:</span>
                        <span className="text-xs font-medium text-foreground">{model?.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Complexity:</span>
                        <span className="text-xs font-medium text-foreground">{model?.complexity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Configuration */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="text-md font-semibold text-foreground mb-4">Current Model Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Active Model</p>
                  <p className="text-lg font-semibold text-foreground">Prophet (Facebook)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Training Data</p>
                  <p className="text-lg font-semibold text-foreground">90 days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Prediction Horizon</p>
                  <p className="text-lg font-semibold text-foreground">2 hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Update Frequency</p>
                  <p className="text-lg font-semibold text-foreground">15 minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anomalies' && (
          <div className="space-y-6">
            {/* Anomaly Detection Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-foreground mb-4">Detection Accuracy</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={anomalyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {anomalyData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-foreground mb-4">Detection Rules</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="TrendingUp" size={14} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">Rapid Change Detection</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Triggers when parameter changes &gt; 20% in 15 minutes</p>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="AlertTriangle" size={14} className="text-error" />
                      <span className="text-sm font-medium text-foreground">Threshold Breach</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Activates when values exceed predefined safety limits</p>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Activity" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Pattern Deviation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Detects unusual patterns compared to historical data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Anomalies */}
            <div>
              <h4 className="text-md font-semibold text-foreground mb-4">Recent Anomalies</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="AlertTriangle" size={16} className="text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-900">Wind Speed Anomaly</p>
                      <p className="text-xs text-red-700">Detected 15 minutes ago at Sensor Beta</p>
                    </div>
                  </div>
                  <div className="text-xs text-red-700 font-data">
                    45 km/h (Expected: 25 km/h)
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="TrendingUp" size={16} className="text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Tidal Pattern Deviation</p>
                      <p className="text-xs text-amber-700">Detected 1 hour ago at Coastal Station Alpha</p>
                    </div>
                  </div>
                  <div className="text-xs text-amber-700 font-data">
                    3.2m (Expected: 2.1m)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionAccuracy;