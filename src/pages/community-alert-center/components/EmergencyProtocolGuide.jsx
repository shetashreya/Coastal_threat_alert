import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyProtocolGuide = ({ currentAlert, onProtocolComplete }) => {
  const [activeProtocol, setActiveProtocol] = useState('flood');
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState(null);

  const emergencyProtocols = {
    flood: {
      title: 'Flood Emergency Protocol',
      icon: 'Waves',
      color: 'text-blue-600',
      urgency: 'high',
      estimatedTime: '15-30 minutes',
      steps: [
        {
          id: 'flood-1',
          title: 'Immediate Safety Assessment',
          description: 'Check your immediate surroundings for safety hazards',
          actions: [
            'Stay away from windows and glass doors',
            'Turn off electricity if water is present',
            'Do not walk through moving water',
            'Avoid flooded roads and bridges'
          ],
          timeRequired: '2-3 minutes',
          critical: true
        },
        {
          id: 'flood-2',
          title: 'Gather Emergency Supplies',
          description: 'Collect essential items for evacuation or sheltering',
          actions: [
            'Emergency water (1 gallon per person per day)',
            'Non-perishable food for 3 days',
            'First aid kit and medications',
            'Flashlight and extra batteries',
            'Important documents in waterproof container'
          ],
          timeRequired: '5-10 minutes',
          critical: true
        },
        {
          id: 'flood-3',
          title: 'Communication Check',
          description: 'Establish communication with family and authorities',
          actions: [
            'Contact family members to confirm safety',
            'Monitor emergency broadcasts',
            'Charge all electronic devices',
            'Keep emergency radio accessible'
          ],
          timeRequired: '3-5 minutes',
          critical: false
        },
        {
          id: 'flood-4',
          title: 'Evacuation Preparation',
          description: 'Prepare for potential evacuation if ordered',
          actions: [
            'Identify evacuation routes',
            'Prepare vehicle with full gas tank',
            'Secure important items above flood level',
            'Turn off utilities if instructed'
          ],
          timeRequired: '10-15 minutes',
          critical: true
        }
      ]
    },
    storm: {
      title: 'Storm Emergency Protocol',
      icon: 'CloudLightning',
      color: 'text-purple-600',
      urgency: 'critical',
      estimatedTime: '20-45 minutes',
      steps: [
        {
          id: 'storm-1',
          title: 'Secure Indoor Location',
          description: 'Find the safest location in your building',
          actions: [
            'Move to interior room on lowest floor',
            'Stay away from windows and doors',
            'Avoid rooms with large roof spans',
            'Get under sturdy furniture if possible'
          ],
          timeRequired: '2-3 minutes',
          critical: true
        },
        {
          id: 'storm-2',
          title: 'Secure Property',
          description: 'Protect your property from storm damage',
          actions: [
            'Bring in outdoor furniture and decorations',
            'Close and secure all windows and doors',
            'Turn off utilities if flooding is expected',
            'Clear gutters and drains if safe to do so'
          ],
          timeRequired: '15-20 minutes',
          critical: false
        },
        {
          id: 'storm-3',
          title: 'Emergency Communications',
          description: 'Maintain contact with emergency services',
          actions: [
            'Keep battery-powered radio available',
            'Charge all devices to full capacity',
            'Have backup power sources ready',
            'Know how to contact emergency services'
          ],
          timeRequired: '5-10 minutes',
          critical: true
        }
      ]
    },
    hurricane: {
      title: 'Hurricane Emergency Protocol',
      icon: 'Tornado',
      color: 'text-red-600',
      urgency: 'critical',
      estimatedTime: '1-3 hours',
      steps: [
        {
          id: 'hurricane-1',
          title: 'Evacuation Decision',
          description: 'Determine if evacuation is necessary',
          actions: [
            'Check official evacuation orders',
            'Assess your evacuation zone',
            'Consider special needs family members',
            'Plan evacuation route and destination'
          ],
          timeRequired: '10-15 minutes',
          critical: true
        },
        {
          id: 'hurricane-2',
          title: 'Property Protection',
          description: 'Secure your home against hurricane damage',
          actions: [
            'Install storm shutters or board windows',
            'Secure outdoor items or bring indoors',
            'Turn off utilities at main switches',
            'Document property with photos/video'
          ],
          timeRequired: '30-60 minutes',
          critical: false
        },
        {
          id: 'hurricane-3',
          title: 'Emergency Kit Preparation',
          description: 'Prepare comprehensive emergency supplies',
          actions: [
            'Water: 1 gallon per person per day for 7 days',
            'Food: 7-day supply of non-perishable food',
            'Medications and first aid supplies',
            'Important documents in waterproof container',
            'Cash in small bills'
          ],
          timeRequired: '20-30 minutes',
          critical: true
        }
      ]
    }
  };

  const protocolTypes = [
    { id: 'flood', label: 'Flood Protocol', icon: 'Waves' },
    { id: 'storm', label: 'Storm Protocol', icon: 'CloudLightning' },
    { id: 'hurricane', label: 'Hurricane Protocol', icon: 'Tornado' },
    { id: 'general', label: 'General Emergency', icon: 'Shield' }
  ];

  const currentProtocol = emergencyProtocols?.[activeProtocol];

  const handleStepComplete = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (completedSteps?.has(stepId)) {
      newCompleted?.delete(stepId);
    } else {
      newCompleted?.add(stepId);
    }
    setCompletedSteps(newCompleted);

    if (onProtocolComplete && newCompleted?.size === currentProtocol?.steps?.length) {
      onProtocolComplete(activeProtocol, Array.from(newCompleted));
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-critical bg-red-50 border-critical';
      case 'high': return 'text-high bg-amber-50 border-high';
      case 'medium': return 'text-medium bg-blue-50 border-medium';
      default: return 'text-low bg-emerald-50 border-low';
    }
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps?.size / currentProtocol?.steps?.length) * 100);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Emergency Protocol Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step emergency response procedures
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Download PDF
            </Button>
            <Button variant="outline" size="sm" iconName="Share">
              Share Guide
            </Button>
          </div>
        </div>
      </div>
      {/* Protocol Selection */}
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {protocolTypes?.map((protocol) => (
            <button
              key={protocol?.id}
              onClick={() => {
                setActiveProtocol(protocol?.id);
                setCompletedSteps(new Set());
                setExpandedSection(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeProtocol === protocol?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              <Icon name={protocol?.icon} size={16} />
              <span>{protocol?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {currentProtocol && (
        <>
          {/* Protocol Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-muted ${currentProtocol?.color}`}>
                  <Icon name={currentProtocol?.icon} size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">
                    {currentProtocol?.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>Est. Time: {currentProtocol?.estimatedTime}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(currentProtocol?.urgency)}`}>
                      {currentProtocol?.urgency?.toUpperCase()} PRIORITY
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {getProgressPercentage()}%
                </div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Protocol Steps */}
          <div className="divide-y divide-border">
            {currentProtocol?.steps?.map((step, index) => {
              const isCompleted = completedSteps?.has(step?.id);
              const isExpanded = expandedSection === step?.id;
              
              return (
                <div key={step?.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleStepComplete(step?.id)}
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                          isCompleted
                            ? 'bg-success border-success text-white' :'border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary'
                        }`}
                      >
                        {isCompleted ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className={`text-md font-semibold ${isCompleted ? 'text-success' : 'text-foreground'}`}>
                            {step?.title}
                            {step?.critical && (
                              <span className="ml-2 px-2 py-1 text-xs font-medium bg-critical text-critical-foreground rounded-full">
                                CRITICAL
                              </span>
                            )}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {step?.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {step?.timeRequired}
                          </span>
                          <button
                            onClick={() => setExpandedSection(isExpanded ? null : step?.id)}
                            className="p-1 rounded hover:bg-muted"
                          >
                            <Icon 
                              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                              size={16} 
                              className="text-muted-foreground"
                            />
                          </button>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                          <h6 className="text-sm font-medium text-foreground mb-2">
                            Action Items:
                          </h6>
                          <ul className="space-y-2">
                            {step?.actions?.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Contacts */}
          <div className="p-6 border-t border-border bg-muted/30">
            <h4 className="text-md font-medium text-foreground mb-4">
              Emergency Contacts
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-center w-10 h-10 bg-critical rounded-lg">
                  <Icon name="Phone" size={18} color="white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Emergency Services</div>
                  <div className="text-lg font-bold text-critical">911</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Shield" size={18} color="white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Emergency Management</div>
                  <div className="text-lg font-bold text-primary">(555) 123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-center w-10 h-10 bg-success rounded-lg">
                  <Icon name="Heart" size={18} color="white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Red Cross</div>
                  <div className="text-lg font-bold text-success">(555) 987-6543</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyProtocolGuide;