import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertExplainabilityPanel = ({ selectedAlert, onClose }) => {
  const [activeTab, setActiveTab] = useState('triggers');

  const mockExplainabilityData = {
    'ALT-2024-001': {
      triggers: [
        {
          id: 1,
          type: 'environmental',
          condition: 'Tide Level Threshold',
          value: '2.8m',
          threshold: '2.5m',
          status: 'exceeded',
          confidence: 95,
          timestamp: new Date('2024-08-30T20:10:00')
        },
        {
          id: 2,
          type: 'weather',
          condition: 'Wind Speed',
          value: '45 km/h',
          threshold: '40 km/h',
          status: 'exceeded',
          confidence: 88,
          timestamp: new Date('2024-08-30T20:12:00')
        },
        {
          id: 3,
          type: 'prediction',
          condition: 'AI Flood Risk Model',
          value: '78%',
          threshold: '70%',
          status: 'exceeded',
          confidence: 92,
          timestamp: new Date('2024-08-30T20:15:00')
        }
      ],
      reasoning: {
        primary: `The alert was triggered due to multiple converging factors indicating elevated flood risk. The primary driver was tide levels exceeding the 2.5m threshold by 0.3m, combined with sustained wind speeds above 40 km/h creating additional wave action.`,
        secondary: `Our AI prediction model analyzed historical patterns and current conditions, determining a 78% probability of flooding in the next 2 hours. This exceeded our 70% threshold for issuing a Watch-level alert.`,
        confidence: 92,
        factors: [
          { name: 'Tidal Conditions', weight: 40, impact: 'high' },
          { name: 'Weather Patterns', weight: 30, impact: 'medium' },
          { name: 'Historical Data', weight: 20, impact: 'medium' },
          { name: 'Seasonal Factors', weight: 10, impact: 'low' }
        ]
      },
      impact: {
        population: {
          total: 12500,
          vulnerable: 3200,
          evacuated: 0,
          sheltered: 0
        },
        infrastructure: {
          roads: 8,
          buildings: 245,
          utilities: 3,
          critical: 2
        },
        economic: {
          estimated_damage: 2400000,
          business_impact: 'moderate',
          recovery_time: '2-3 days'
        },
        environmental: {
          ecosystems: ['coastal wetlands', 'seagrass beds'],
          pollution_risk: 'low',
          wildlife_impact: 'minimal'
        }
      }
    },
    'ALT-2024-002': {
      triggers: [
        {
          id: 1,
          type: 'weather',
          condition: 'Storm Surge Height',
          value: '3.2m',
          threshold: '2.8m',
          status: 'exceeded',
          confidence: 98,
          timestamp: new Date('2024-08-30T19:40:00')
        },
        {
          id: 2,
          type: 'environmental',
          condition: 'Wave Height',
          value: '4.5m',
          threshold: '3.5m',
          status: 'exceeded',
          confidence: 94,
          timestamp: new Date('2024-08-30T19:42:00')
        }
      ],
      reasoning: {
        primary: `Critical storm surge warning issued due to extreme weather conditions. Storm surge heights of 3.2m combined with wave heights of 4.5m pose immediate danger to coastal areas.`,
        secondary: `Meteorological models show the storm intensifying with potential for surge heights to reach 3.5m within the next hour. Immediate evacuation recommended for low-lying areas.`,
        confidence: 96,
        factors: [
          { name: 'Storm Intensity', weight: 50, impact: 'critical' },
          { name: 'Surge Modeling', weight: 30, impact: 'high' },
          { name: 'Coastal Topography', weight: 15, impact: 'medium' },
          { name: 'Tide Timing', weight: 5, impact: 'low' }
        ]
      },
      impact: {
        population: {
          total: 18750,
          vulnerable: 8200,
          evacuated: 1200,
          sheltered: 800
        },
        infrastructure: {
          roads: 15,
          buildings: 420,
          utilities: 8,
          critical: 5
        },
        economic: {
          estimated_damage: 8500000,
          business_impact: 'severe',
          recovery_time: '1-2 weeks'
        },
        environmental: {
          ecosystems: ['mangrove forests', 'coral reefs', 'coastal dunes'],
          pollution_risk: 'high',
          wildlife_impact: 'significant'
        }
      }
    }
  };

  const currentData = selectedAlert ? mockExplainabilityData?.[selectedAlert] : null;

  const tabs = [
    { id: 'triggers', label: 'Trigger Conditions', icon: 'Zap' },
    { id: 'reasoning', label: 'AI Reasoning', icon: 'Brain' },
    { id: 'impact', label: 'Impact Assessment', icon: 'Target' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeded': return 'text-red-600 bg-red-50';
      case 'approaching': return 'text-amber-600 bg-amber-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!selectedAlert || !currentData) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm p-8 text-center">
        <Icon name="Info" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h4 className="text-lg font-medium text-foreground mb-2">No Alert Selected</h4>
        <p className="text-muted-foreground">
          Select an alert from the table to view detailed explainability information.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Alert Explainability</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Alert ID: {selectedAlert}
        </p>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {/* Trigger Conditions Tab */}
        {activeTab === 'triggers' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground mb-4">Conditions that triggered this alert</h4>
            {currentData?.triggers?.map((trigger) => (
              <div key={trigger?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={trigger?.type === 'environmental' ? 'Waves' : trigger?.type === 'weather' ? 'Cloud' : 'Brain'} 
                      size={20} 
                      className="text-primary" 
                    />
                    <div>
                      <h5 className="font-medium text-foreground">{trigger?.condition}</h5>
                      <p className="text-sm text-muted-foreground capitalize">{trigger?.type} condition</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(trigger?.status)}`}>
                    {trigger?.status?.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Current Value</span>
                    <div className="font-medium text-foreground">{trigger?.value}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Threshold</span>
                    <div className="font-medium text-foreground">{trigger?.threshold}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence</span>
                    <div className={`font-medium px-2 py-1 rounded ${getConfidenceColor(trigger?.confidence)}`}>
                      {trigger?.confidence}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground">
                  Detected at {trigger?.timestamp?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Reasoning Tab */}
        {activeTab === 'reasoning' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Primary Analysis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentData?.reasoning?.primary}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Secondary Factors</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentData?.reasoning?.secondary}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Decision Factors</h4>
              <div className="space-y-3">
                {currentData?.reasoning?.factors?.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-foreground">{factor?.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(factor?.impact)}`}>
                        {factor?.impact?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-muted-foreground">{factor?.weight}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${factor?.weight}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Brain" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Overall Confidence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${currentData?.reasoning?.confidence}%` }}
                  />
                </div>
                <span className="font-bold text-primary">{currentData?.reasoning?.confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Impact Assessment Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-6">
            {/* Population Impact */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Population Impact</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {currentData?.impact?.population?.total?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Affected</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {currentData?.impact?.population?.vulnerable?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Vulnerable</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentData?.impact?.population?.evacuated?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Evacuated</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {currentData?.impact?.population?.sheltered?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Sheltered</div>
                </div>
              </div>
            </div>

            {/* Infrastructure Impact */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Infrastructure at Risk</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Icon name="Road" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{currentData?.impact?.infrastructure?.roads}</div>
                    <div className="text-sm text-muted-foreground">Roads</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Icon name="Building" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{currentData?.impact?.infrastructure?.buildings}</div>
                    <div className="text-sm text-muted-foreground">Buildings</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Icon name="Zap" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{currentData?.impact?.infrastructure?.utilities}</div>
                    <div className="text-sm text-muted-foreground">Utilities</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Icon name="AlertTriangle" size={20} className="text-red-500" />
                  <div>
                    <div className="font-medium text-foreground">{currentData?.impact?.infrastructure?.critical}</div>
                    <div className="text-sm text-muted-foreground">Critical</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Economic Impact */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Economic Assessment</h4>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Estimated Damage</span>
                    <div className="text-lg font-bold text-foreground">
                      ${(currentData?.impact?.economic?.estimated_damage / 1000000)?.toFixed(1)}M
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Business Impact</span>
                    <div className="text-lg font-bold text-foreground capitalize">
                      {currentData?.impact?.economic?.business_impact}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Recovery Time</span>
                    <div className="text-lg font-bold text-foreground">
                      {currentData?.impact?.economic?.recovery_time}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Environmental Impact</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Affected Ecosystems</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {currentData?.impact?.environmental?.ecosystems?.map((ecosystem, index) => (
                      <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                        {ecosystem}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Pollution Risk</span>
                    <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      currentData?.impact?.environmental?.pollution_risk === 'high' ? 'bg-red-50 text-red-700' :
                      currentData?.impact?.environmental?.pollution_risk === 'medium'? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {currentData?.impact?.environmental?.pollution_risk?.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Wildlife Impact</span>
                    <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      currentData?.impact?.environmental?.wildlife_impact === 'significant' ? 'bg-red-50 text-red-700' :
                      currentData?.impact?.environmental?.wildlife_impact === 'moderate'? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {currentData?.impact?.environmental?.wildlife_impact?.toUpperCase()}
                    </div>
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

export default AlertExplainabilityPanel;