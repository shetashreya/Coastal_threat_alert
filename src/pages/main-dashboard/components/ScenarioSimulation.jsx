import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScenarioSimulation = ({ onScenarioTrigger, className = '' }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [simulationStatus, setSimulationStatus] = useState('idle');

  const scenarios = [
    {
      id: 'flood-watch',
      title: 'Flood Watch Scenario',
      description: 'Simulates rising water levels with moderate flood risk',
      icon: 'Droplets',
      severity: 'medium',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      iconColor: 'text-amber-600',
      duration: '15 minutes',
      triggers: [
        'Water level rises to 3.2 ft',
        'Rainfall intensity increases to 0.8 in/hr',
        'Tidal surge prediction activated',
        'Community advisory alerts sent'
      ]
    },
    {
      id: 'storm-surge-warning',
      title: 'Storm Surge Warning',
      description: 'Simulates severe storm surge with immediate evacuation needs',
      icon: 'CloudLightning',
      severity: 'critical',
      color: 'bg-red-50 border-red-200 text-red-900',
      iconColor: 'text-red-600',
      duration: '20 minutes',
      triggers: [
        'Storm surge height exceeds 5.0 ft',
        'Wind speeds reach 45+ mph',
        'Emergency evacuation protocols activated',
        'Multi-channel alert system engaged'
      ]
    },
    {
      id: 'normal-conditions',
      title: 'Normal Conditions',
      description: 'Resets all systems to baseline operational status',
      icon: 'Shield',
      severity: 'normal',
      color: 'bg-green-50 border-green-200 text-green-900',
      iconColor: 'text-green-600',
      duration: '5 minutes',
      triggers: [
        'All environmental readings normalized',
        'Alert systems return to standby',
        'Community status: All Clear',
        'Routine monitoring resumed'
      ]
    }
  ];

  const handleScenarioStart = async (scenario) => {
    setActiveScenario(scenario?.id);
    setSimulationStatus('running');
    
    if (onScenarioTrigger) {
      onScenarioTrigger(scenario);
    }

    // Simulate scenario duration
    setTimeout(() => {
      setSimulationStatus('completed');
      setTimeout(() => {
        setActiveScenario(null);
        setSimulationStatus('idle');
      }, 3000);
    }, 5000); // 5 seconds for demo purposes
  };

  const handleScenarioStop = () => {
    setActiveScenario(null);
    setSimulationStatus('idle');
  };

  const getStatusIcon = () => {
    switch (simulationStatus) {
      case 'running':
        return { icon: 'Play', color: 'text-blue-600' };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-green-600' };
      default:
        return { icon: 'Square', color: 'text-gray-400' };
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Emergency Scenarios</h3>
        <div className="flex items-center space-x-2">
          <Icon name={statusIcon?.icon} size={16} className={statusIcon?.color} />
          <span className="text-xs text-gray-500 capitalize">
            {simulationStatus === 'idle' ? 'Ready' : simulationStatus}
          </span>
        </div>
      </div>
      {/* Active Scenario Status */}
      {activeScenario && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Play" size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">
                Simulation Active
              </span>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={handleScenarioStop}
              iconName="Square"
              className="text-xs"
            >
              Stop
            </Button>
          </div>
          <p className="text-sm text-blue-700">
            Running: {scenarios?.find(s => s?.id === activeScenario)?.title}
          </p>
          <div className="mt-2">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ 
                  width: simulationStatus === 'running' ? '100%' : '0%',
                  transition: 'width 5s linear'
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {/* Scenario Cards */}
      <div className="space-y-3">
        {scenarios?.map((scenario) => (
          <div
            key={scenario?.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              activeScenario === scenario?.id 
                ? 'border-blue-500 bg-blue-50' 
                : scenario?.color
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-white ${scenario?.iconColor}`}>
                  <Icon name={scenario?.icon} size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{scenario?.title}</h4>
                  <p className="text-xs opacity-80 mt-1">{scenario?.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name="Clock" size={12} className="opacity-60" />
                    <span className="text-xs opacity-60">Duration: {scenario?.duration}</span>
                  </div>
                </div>
              </div>
              <Button
                variant={activeScenario === scenario?.id ? "outline" : "default"}
                size="xs"
                onClick={() => handleScenarioStart(scenario)}
                disabled={simulationStatus === 'running' && activeScenario !== scenario?.id}
                iconName={activeScenario === scenario?.id ? "Square" : "Play"}
                className="text-xs"
              >
                {activeScenario === scenario?.id ? 'Running' : 'Start'}
              </Button>
            </div>

            {/* Scenario Triggers */}
            <div className="space-y-1">
              <p className="text-xs font-medium opacity-80">Simulation Triggers:</p>
              <div className="grid grid-cols-1 gap-1">
                {scenario?.triggers?.map((trigger, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="ArrowRight" size={10} className="opacity-60" />
                    <span className="text-xs opacity-70">{trigger}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Simulation Controls */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <Icon name="Info" size={12} className="inline mr-1" />
            Demo scenarios for training and system testing
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="RotateCcw"
              className="text-xs"
              disabled={simulationStatus === 'running'}
            >
              Reset All
            </Button>
            <Button
              variant="outline"
              size="xs"
              iconName="Settings"
              className="text-xs"
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulation;