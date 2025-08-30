import React from 'react';
import Icon from '../../../components/AppIcon';


const TrustSignals = ({ currentLanguage }) => {
  const trustBadges = [
    {
      id: 1,
      name: 'FEMA Certified',
      icon: 'Shield',
      description: 'Federal Emergency Management Agency Certified System',
      color: 'text-blue-600'
    },
    {
      id: 2,
      name: 'NOAA Approved',
      icon: 'Waves',
      description: 'National Oceanic and Atmospheric Administration Approved',
      color: 'text-emerald-600'
    },
    {
      id: 3,
      name: 'ISO 27001',
      icon: 'Lock',
      description: 'Information Security Management System Certified',
      color: 'text-purple-600'
    },
    {
      id: 4,
      name: 'SOC 2 Type II',
      icon: 'CheckCircle',
      description: 'Service Organization Control 2 Compliant',
      color: 'text-green-600'
    }
  ];

  const securityFeatures = [
    {
      icon: 'Fingerprint',
      text: 'Multi-Factor Authentication'
    },
    {
      icon: 'Database',
      text: 'End-to-End Encryption'
    },
    {
      icon: 'Clock',
      text: '99.9% Uptime Guarantee'
    },
    {
      icon: 'Users',
      text: 'Role-Based Access Control'
    }
  ];

  const text = {
    en: {
      trustedBy: 'Trusted by Emergency Management Agencies',
      securityTitle: 'Enterprise-Grade Security',
      certifications: 'Certifications & Compliance',
      poweredBy: 'Powered by Advanced Technology'
    },
    es: {
      trustedBy: 'Confiado por Agencias de Gestión de Emergencias',
      securityTitle: 'Seguridad de Nivel Empresarial',
      certifications: 'Certificaciones y Cumplimiento',
      poweredBy: 'Impulsado por Tecnología Avanzada'
    }
  };

  const t = text?.[currentLanguage] || text?.en;

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          {t?.certifications}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {trustBadges?.map((badge) => (
            <div
              key={badge?.id}
              className="flex flex-col items-center p-3 bg-card border border-border rounded-lg hover:shadow-md transition-shadow duration-200"
              title={badge?.description}
            >
              <div className={`p-2 rounded-full bg-muted ${badge?.color} mb-2`}>
                <Icon name={badge?.icon} size={20} />
              </div>
              <span className="text-xs font-medium text-foreground text-center">
                {badge?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          {t?.securityTitle}
        </h3>
        <div className="space-y-3">
          {securityFeatures?.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <Icon 
                  name={feature?.icon} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {feature?.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Trusted Organizations */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          {t?.trustedBy}
        </h3>
        <div className="flex items-center justify-center space-x-6 opacity-60">
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">FEMA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Waves" size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">NOAA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">DHS</span>
          </div>
        </div>
      </div>
      {/* System Status */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-green-800">
          All Systems Operational
        </span>
        <Icon name="CheckCircle" size={14} className="text-green-600" />
      </div>
    </div>
  );
};

export default TrustSignals;