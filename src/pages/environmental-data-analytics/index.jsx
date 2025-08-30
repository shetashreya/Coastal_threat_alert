import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import AnalyticsToolbar from './components/AnalyticsToolbar';
import EnvironmentalChart from './components/EnvironmentalChart';
import InteractiveMap from './components/InteractiveMap';
import PredictionAccuracy from './components/PredictionAccuracy';
import DataFilters from './components/DataFilters';
import DataUpload from './components/DataUpload';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EnvironmentalDataAnalytics = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [timeRange, setTimeRange] = useState('24h');
  const [activeDataSources, setActiveDataSources] = useState(['tides', 'wind', 'rainfall', 'temperature']);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [filters, setFilters] = useState({});
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);

  // Mock user data
  const user = {
    name: 'Dr. Sarah Chen',
    role: 'admin',
    email: 'sarah.chen@coastalguard.gov',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    department: 'Environmental Analytics'
  };

  // Mock alert status
  const alertStatus = {
    level: 'medium',
    count: 3
  };

  // Chart configurations
  const chartConfigs = [
    {
      id: 'tides',
      title: 'Tidal Heights',
      dataType: 'tides',
      color: '#3B82F6',
      unit: 'm',
      showPrediction: true
    },
    {
      id: 'wind',
      title: 'Wind Speed',
      dataType: 'wind',
      color: '#10B981',
      unit: ' km/h',
      showPrediction: true
    },
    {
      id: 'rainfall',
      title: 'Rainfall Rate',
      dataType: 'rainfall',
      color: '#6366F1',
      unit: ' mm/h',
      showPrediction: false
    },
    {
      id: 'temperature',
      title: 'Temperature',
      dataType: 'temperature',
      color: '#F59E0B',
      unit: '°C',
      showPrediction: true
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isRealTimeActive) {
        // Trigger chart updates (handled by individual chart components)
        console.log('Real-time update triggered');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
    console.log('Time range changed to:', newTimeRange);
  };

  const handleDataSourceToggle = (sourceId) => {
    setActiveDataSources(prev => 
      prev?.includes(sourceId)
        ? prev?.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleExport = async (format) => {
    console.log(`Exporting data as ${format}...`);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Export completed: ${format}`);
  };

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleUploadComplete = (uploadData) => {
    console.log('Upload completed:', uploadData);
    setShowUploadPanel(false);
    // Refresh charts with new data
  };

  const handleValidationError = (validationResults) => {
    console.log('Validation error:', validationResults);
  };

  const toggleRealTime = () => {
    setIsRealTimeActive(!isRealTimeActive);
  };

  const resetDashboard = () => {
    setTimeRange('24h');
    setActiveDataSources(['tides', 'wind', 'rainfall', 'temperature']);
    setSelectedSensor(null);
    setFilters({});
    setDashboardLayout('default');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        user={user}
        alertStatus={alertStatus}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Environmental Data Analytics</h1>
                  <p className="text-muted-foreground">
                    Real-time monitoring, AI predictions, and historical trend analysis
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${isRealTimeActive ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                  <span className="text-muted-foreground">
                    {isRealTimeActive ? 'Live Updates' : 'Updates Paused'}
                  </span>
                </div>
                
                <Button
                  variant={isRealTimeActive ? "default" : "outline"}
                  size="sm"
                  iconName={isRealTimeActive ? "Pause" : "Play"}
                  iconPosition="left"
                  onClick={toggleRealTime}
                >
                  {isRealTimeActive ? 'Pause' : 'Resume'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => setShowUploadPanel(!showUploadPanel)}
                >
                  Import Data
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={resetDashboard}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Analytics Toolbar */}
          <AnalyticsToolbar
            onTimeRangeChange={handleTimeRangeChange}
            onDataSourceToggle={handleDataSourceToggle}
            onExport={handleExport}
            activeDataSources={activeDataSources}
            timeRange={timeRange}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Sidebar - Data Filters */}
            <div className="xl:col-span-1">
              <div className="space-y-6">
                <DataFilters
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                  onReset={() => setFilters({})}
                  onApply={(appliedFilters) => console.log('Applied filters:', appliedFilters)}
                />
                
                {/* Data Upload Panel */}
                {showUploadPanel && (
                  <DataUpload
                    onUploadComplete={handleUploadComplete}
                    onValidationError={handleValidationError}
                  />
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3">
              <div className="space-y-6">
                {/* Environmental Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {chartConfigs?.filter(config => activeDataSources?.includes(config?.id))?.map((config) => (
                      <EnvironmentalChart
                        key={config?.id}
                        title={config?.title}
                        dataType={config?.dataType}
                        color={config?.color}
                        unit={config?.unit}
                        showPrediction={config?.showPrediction}
                        isDraggable={true}
                        onDragStart={() => console.log(`Dragging ${config?.title}`)}
                        onDragEnd={() => console.log(`Dropped ${config?.title}`)}
                      />
                    ))}
                </div>

                {/* Interactive Map */}
                <InteractiveMap
                  onSensorClick={handleSensorClick}
                  selectedSensor={selectedSensor}
                  showEcosystemZones={true}
                  showSensorClusters={true}
                />

                {/* AI Prediction Analytics */}
                <PredictionAccuracy
                  modelType="prophet"
                  timeRange={timeRange}
                />

                {/* System Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-success/10">
                        <Icon name="Database" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data Ingestion</p>
                        <p className="text-lg font-semibold text-foreground">98.7% Uptime</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon name="Cpu" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">AI Processing</p>
                        <p className="text-lg font-semibold text-foreground">2.3s Avg Latency</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <Icon name="Radio" size={20} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sensor Network</p>
                        <p className="text-lg font-semibold text-foreground">47/52 Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Last updated: {new Date()?.toLocaleString()}</span>
                <span>•</span>
                <span>Data sources: {activeDataSources?.length} active</span>
                <span>•</span>
                <span>Prediction accuracy: 89.2%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>CoastalGuard Pro © {new Date()?.getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalDataAnalytics;