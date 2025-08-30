import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import ThreatLevelBanner from './components/ThreatLevelBanner';
import ActiveAlertCard from './components/ActiveAlertCard';
import InteractiveMap from './components/InteractiveMap';
import AlertSubscriptionManager from './components/AlertSubscriptionManager';
import CommunityFeedbackSystem from './components/CommunityFeedbackSystem';
import HistoricalAlertsLog from './components/HistoricalAlertsLog';
import EmergencyProtocolGuide from './components/EmergencyProtocolGuide';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityAlertCenter = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [threatLevel, setThreatLevel] = useState('high');
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('alerts');

  // Mock user data
  const user = {
    name: 'Maria Rodriguez',
    role: 'viewer',
    email: 'maria.rodriguez@email.com',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    department: 'Community Member'
  };

  // Mock alert status
  const alertStatus = {
    level: threatLevel,
    count: activeAlerts?.length
  };

  // Mock active alerts data
  const mockActiveAlerts = [
    {
      id: 'FLOOD-2024-009',
      type: 'Flood Warning',
      severity: 'high',
      title: 'Coastal Flood Warning - Immediate Action Required',
      description: `High tide combined with storm surge is causing significant flooding in low-lying coastal areas.\nResidents in affected zones should move to higher ground immediately.\nAvoid driving through flooded roads and stay away from storm drains.`,
      affectedAreas: ['Downtown Waterfront', 'Marina District', 'Bayfront Park Area'],
      issuedAt: new Date(Date.now() - 1800000),
      expiresAt: new Date(Date.now() + 7200000),
      actions: [
        'Move vehicles to higher ground immediately',
        'Avoid walking or driving through flooded areas',
        'Stay away from storm drains and culverts',
        'Monitor local emergency broadcasts'
      ],
      triggerConditions: `Tide level: 8.4ft (threshold: 8.0ft)\nWind speed: 28mph from southeast\nRainfall: 2.3 inches in last hour\nStorm surge: 3.2ft above normal`
    },
    {
      id: 'STORM-2024-008',
      type: 'Storm Watch',
      severity: 'medium',
      title: 'Severe Weather Watch - Monitor Conditions',
      description: `Developing storm system may produce dangerous conditions over the next 6 hours.\nHeavy rainfall and strong winds expected.\nStay indoors and avoid unnecessary travel.`,
      affectedAreas: ['Coastal Highway', 'Beach Communities', 'Island Areas'],
      issuedAt: new Date(Date.now() - 900000),
      expiresAt: new Date(Date.now() + 21600000),
      actions: [
        'Secure outdoor furniture and decorations',
        'Charge electronic devices',
        'Stock up on emergency supplies',
        'Avoid beach and waterfront areas'
      ],
      triggerConditions: `Wind speed forecast: 35-45mph\nRainfall prediction: 3-5 inches\nWave height: 8-12 feet\nBarometric pressure: 29.85 inHg and falling`
    }
  ];

  // Mock emergency shelters
  const mockShelters = [
    {
      id: 1,
      name: 'Miami Beach Community Center',
      address: '2100 Washington Ave, Miami Beach, FL',
      capacity: 500,
      currentOccupancy: 78,
      amenities: ['Pet Friendly', 'Medical Support', 'Food Service', 'WiFi'],
      status: 'open',
      distance: '2.3 miles'
    },
    {
      id: 2,
      name: 'Coral Gables High School',
      address: '450 Bird Rd, Coral Gables, FL',
      capacity: 800,
      currentOccupancy: 156,
      amenities: ['Wheelchair Accessible', 'Food Service', 'Parking'],
      status: 'open',
      distance: '4.7 miles'
    }
  ];

  // Mock evacuation routes
  const mockEvacuationRoutes = [
    {
      id: 1,
      name: 'Route A - North Evacuation',
      description: 'Primary evacuation route for northern coastal areas via I-95 North',
      status: 'clear',
      estimatedTime: '25 minutes',
      congestionLevel: 'low'
    },
    {
      id: 2,
      name: 'Route B - West Evacuation',
      description: 'Alternative route via inland highways (US-1 to I-75)',
      status: 'congested',
      estimatedTime: '45 minutes',
      congestionLevel: 'moderate'
    }
  ];

  const tabOptions = [
    { id: 'alerts', label: 'Active Alerts', icon: 'AlertTriangle', count: mockActiveAlerts?.length },
    { id: 'map', label: 'Interactive Map', icon: 'Map', count: null },
    { id: 'protocols', label: 'Emergency Protocols', icon: 'BookOpen', count: null },
    { id: 'preferences', label: 'Alert Preferences', icon: 'Settings', count: null },
    { id: 'feedback', label: 'Community Feedback', icon: 'MessageSquare', count: null },
    { id: 'history', label: 'Alert History', icon: 'History', count: null }
  ];

  // Initialize component
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Set active alerts
    setActiveAlerts(mockActiveAlerts);

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    // Check online status
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const handleAlertDismiss = (alertId) => {
    setActiveAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleAlertDetails = (alert) => {
    console.log('Viewing alert details:', alert);
    setActiveTab('map');
  };

  const handleSubscriptionSave = (subscriptionData) => {
    console.log('Subscription preferences saved:', subscriptionData);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
  };

  const handleHistoryExport = (exportData) => {
    console.log('Exporting alert history:', exportData);
  };

  const handleProtocolComplete = (protocolType, completedSteps) => {
    console.log('Protocol completed:', protocolType, completedSteps);
  };

  const handleEmergencyContact = () => {
    console.log('Emergency contact initiated');
    window.open('tel:911', '_self');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        user={user}
        alertStatus={alertStatus}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Offline Mode Indicator */}
          {isOfflineMode && (
            <div className="mb-6 p-4 bg-warning text-warning-foreground rounded-lg border border-warning">
              <div className="flex items-center space-x-2">
                <Icon name="WifiOff" size={20} />
                <span className="font-medium">Offline Mode Active</span>
                <span className="text-sm opacity-80">- Showing cached data</span>
              </div>
            </div>
          )}

          {/* Emergency Contact Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              variant="destructive"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              onClick={handleEmergencyContact}
              className="shadow-emergency-lg animate-pulse-slow"
            >
              Emergency: 911
            </Button>
          </div>

          {/* Threat Level Banner */}
          <div className="mb-8">
            <ThreatLevelBanner
              threatLevel={threatLevel}
              lastUpdated={lastUpdate}
              affectedAreas={['Downtown Waterfront', 'Marina District', 'Coastal Highway']}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabOptions?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                    {tab?.count !== null && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    Active Emergency Alerts
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {lastUpdate?.toLocaleTimeString()}</span>
                  </div>
                </div>

                {activeAlerts?.length > 0 ? (
                  <div className="space-y-6">
                    {activeAlerts?.map((alert) => (
                      <ActiveAlertCard
                        key={alert?.id}
                        alert={alert}
                        onViewDetails={handleAlertDetails}
                        onDismiss={handleAlertDismiss}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No Active Alerts
                    </h3>
                    <p className="text-muted-foreground">
                      All systems are operating normally. Stay prepared and monitor conditions.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Interactive Emergency Map
                </h2>
                <InteractiveMap
                  alerts={activeAlerts}
                  shelters={mockShelters}
                  evacuationRoutes={mockEvacuationRoutes}
                  onLocationSelect={(location) => console.log('Location selected:', location)}
                />
              </div>
            )}

            {activeTab === 'protocols' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Emergency Response Protocols
                </h2>
                <EmergencyProtocolGuide
                  currentAlert={activeAlerts?.[0]}
                  onProtocolComplete={handleProtocolComplete}
                />
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Alert Subscription Preferences
                </h2>
                <AlertSubscriptionManager
                  onSave={handleSubscriptionSave}
                />
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Community Feedback System
                </h2>
                <CommunityFeedbackSystem
                  onSubmitFeedback={handleFeedbackSubmit}
                />
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Historical Alerts Log
                </h2>
                <HistoricalAlertsLog
                  onExportData={handleHistoryExport}
                />
              </div>
            )}
          </div>

          {/* Community Preparedness Resources */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Community Preparedness Resources
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <Icon name="BookOpen" size={20} color="white" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground">
                    Emergency Preparedness Guide
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guide for preparing your family and home for coastal emergencies.
                </p>
                <Button variant="outline" size="sm" iconName="ExternalLink">
                  View Guide
                </Button>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
                    <Icon name="Users" size={20} color="white" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground">
                    Community Training Programs
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Join local emergency response training and community preparedness workshops.
                </p>
                <Button variant="outline" size="sm" iconName="Calendar">
                  View Schedule
                </Button>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-warning rounded-lg">
                    <Icon name="Package" size={20} color="white" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground">
                    Emergency Supply Checklist
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Essential supplies and equipment needed for emergency preparedness.
                </p>
                <Button variant="outline" size="sm" iconName="Download">
                  Download List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAlertCenter;