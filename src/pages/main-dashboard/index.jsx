import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertSummaryCard from './components/AlertSummaryCard';
import InteractiveMap from './components/InteractiveMap';
import EnvironmentalMetrics from './components/EnvironmentalMetrics';
import PredictionCharts from './components/PredictionCharts';
import ScenarioSimulation from './components/ScenarioSimulation';
import SystemStatus from './components/SystemStatus';

const MainDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [alertData, setAlertData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Mock user data
  const mockUser = {
    name: 'Dr. Sarah Martinez',
    role: 'admin',
    email: 'sarah.martinez@coastalguard.gov',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    department: 'Emergency Management'
  };

  // Mock alert status
  const mockAlertStatus = {
    level: 'medium',
    count: 2
  };

  // Mock alert data
  const mockAlerts = [
    {
      id: 'alert-001',
      severity: 'medium',
      title: 'Tidal Surge Advisory',
      description: 'Elevated water levels expected in coastal areas',
      count: 1,
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      location: 'Miami Beach Sector 3'
    },
    {
      id: 'alert-002',
      severity: 'low',
      title: 'Wind Speed Monitor',
      description: 'Sustained winds 15-20 mph from southeast',
      count: 1,
      lastUpdate: new Date(Date.now() - 8 * 60 * 1000),
      location: 'Coastal Zone A'
    },
    {
      id: 'alert-003',
      severity: 'normal',
      title: 'Normal Operations',
      description: 'All environmental parameters within normal range',
      count: 0,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      location: 'System Wide'
    }
  ];

  // Mock sensor data
  const mockSensors = [
    {
      id: 'sensor-001',
      name: 'Water Level Sensor #1',
      type: 'water_level',
      location: { lat: 25.7617, lng: -80.1918 },
      status: 'active',
      lastReading: 2.3,
      unit: 'ft'
    },
    {
      id: 'sensor-002',
      name: 'Wind Speed Monitor #2',
      type: 'wind_speed',
      location: { lat: 25.7717, lng: -80.1818 },
      status: 'active',
      lastReading: 12.5,
      unit: 'mph'
    }
  ];

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action: ${action}`);
    // Handle alert actions like view details, acknowledge, etc.
  };

  const handleSensorClick = (sensorId) => {
    console.log(`Sensor clicked: ${sensorId}`);
    // Handle sensor interaction
  };

  const handleAlertClick = (alert) => {
    console.log(`Alert zone clicked:`, alert);
    // Handle alert zone interaction
  };

  const handleScenarioTrigger = (scenario) => {
    console.log(`Scenario triggered:`, scenario);
    
    // Simulate scenario effects on alerts
    if (scenario?.id === 'flood-watch') {
      setAlertData(prev => [
        ...prev?.filter(alert => alert?.severity !== 'medium'),
        {
          id: 'scenario-flood',
          severity: 'high',
          title: 'Flood Watch Active',
          description: 'Simulated flood conditions - water levels rising',
          count: 3,
          lastUpdate: new Date(),
          location: 'Simulation Zone'
        }
      ]);
    } else if (scenario?.id === 'storm-surge-warning') {
      setAlertData(prev => [
        ...prev?.filter(alert => alert?.severity !== 'critical'),
        {
          id: 'scenario-storm',
          severity: 'critical',
          title: 'Storm Surge Warning',
          description: 'Simulated severe storm surge - immediate action required',
          count: 5,
          lastUpdate: new Date(),
          location: 'Emergency Zone'
        }
      ]);
    } else if (scenario?.id === 'normal-conditions') {
      setAlertData(mockAlerts);
    }
  };

  useEffect(() => {
    // Initialize data
    setAlertData(mockAlerts);
    setSensorData(mockSensors);

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (realTimeUpdates) {
        // Update last update times
        setAlertData(prev => prev?.map(alert => ({
          ...alert,
          lastUpdate: new Date(alert.lastUpdate.getTime() + 60000)
        })));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavigationBar 
        user={mockUser}
        alertStatus={mockAlertStatus}
      />
      
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Emergency Management Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Real-time coastal threat monitoring and alert coordination
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${realTimeUpdates ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {realTimeUpdates ? 'Live Updates' : 'Paused'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {new Date()?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Alert Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Active Alerts
                  </h2>
                  <span className="text-sm text-gray-500">
                    {alertData?.length} total
                  </span>
                </div>
                <div className="space-y-4">
                  {alertData?.map((alert) => (
                    <AlertSummaryCard
                      key={alert?.id}
                      severity={alert?.severity}
                      count={alert?.count}
                      title={alert?.title}
                      description={alert?.description}
                      lastUpdate={alert?.lastUpdate}
                      onViewDetails={() => handleAlertAction(alert?.id, 'view')}
                      onQuickAction={() => handleAlertAction(alert?.id, 'action')}
                    />
                  ))}
                </div>
              </div>

              {/* System Status */}
              <SystemStatus />
            </div>

            {/* Center Panel - Interactive Map */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Coastal Monitoring Map
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Live sensors</span>
                  </div>
                </div>
                <InteractiveMap
                  sensors={sensorData}
                  alerts={alertData?.filter(alert => alert?.severity !== 'normal')}
                  onSensorClick={handleSensorClick}
                  onAlertClick={handleAlertClick}
                />
              </div>

              {/* AI Prediction Charts */}
              <PredictionCharts />
            </div>

            {/* Right Panel - Environmental Metrics */}
            <div className="lg:col-span-2 space-y-6">
              <EnvironmentalMetrics />
              
              {/* Scenario Simulation */}
              <ScenarioSimulation 
                onScenarioTrigger={handleScenarioTrigger}
              />
            </div>
          </div>

          {/* Bottom Section - Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Today's Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Alerts</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {alertData?.reduce((sum, alert) => sum + alert?.count, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sensors</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {sensorData?.filter(sensor => sensor?.status === 'active')?.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Uptime</span>
                  <span className="text-2xl font-bold text-green-600">99.8%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Tidal sensor calibrated</p>
                    <p className="text-xs text-gray-500">2:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Wind speed alert cleared</p>
                    <p className="text-xs text-gray-500">2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">System backup completed</p>
                    <p className="text-xs text-gray-500">2:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Prediction model updated</p>
                    <p className="text-xs text-gray-500">2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Emergency Ops</span>
                  <span className="text-sm font-semibold text-gray-900">911</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coast Guard</span>
                  <span className="text-sm font-semibold text-gray-900">(305) 535-4300</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Weather Service</span>
                  <span className="text-sm font-semibold text-gray-900">(305) 229-4404</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tech Support</span>
                  <span className="text-sm font-semibold text-gray-900">(800) 555-0199</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;