import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = ({ currentLanguage, onCredentialSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoAccounts = [
    {
      role: 'admin',
      email: 'admin@coastalguard.gov',
      password: 'Admin123!',
      name: 'Emergency Coordinator',
      department: 'Emergency Management',
      icon: 'Shield',
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      role: 'analyst',
      email: 'scientist@coastal.research',
      password: 'Science456!',
      name: 'Dr. Sarah Chen',
      department: 'Environmental Sciences',
      icon: 'BarChart3',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      role: 'coordinator',
      email: 'authority@municipal.gov',
      password: 'Authority012!',
      name: 'Captain James Wilson',
      department: 'Local Authority',
      icon: 'Users',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      role: 'viewer',
      email: 'resident@community.local',
      password: 'Community789!',
      name: 'Michael Rodriguez',
      department: 'Community Member',
      icon: 'Home',
      color: 'text-green-600 bg-green-50 border-green-200'
    }
  ];

  const text = {
    en: {
      demoTitle: 'Demo Credentials',
      demoDescription: 'Use these credentials to explore different user roles',
      useCredentials: 'Use These Credentials',
      showDemo: 'Show Demo Accounts',
      hideDemo: 'Hide Demo Accounts',
      copyCredentials: 'Copy to form'
    },
    es: {
      demoTitle: 'Credenciales de Demo',
      demoDescription: 'Usa estas credenciales para explorar diferentes roles de usuario',
      useCredentials: 'Usar Estas Credenciales',
      showDemo: 'Mostrar Cuentas Demo',
      hideDemo: 'Ocultar Cuentas Demo',
      copyCredentials: 'Copiar al formulario'
    }
  };

  const t = text?.[currentLanguage] || text?.en;

  const handleCredentialSelect = (account) => {
    onCredentialSelect(account?.email, account?.password);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <button
          onClick={toggleExpanded}
          className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-2 hover:bg-muted/50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Key" size={20} className="text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t?.demoTitle}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t?.demoDescription}
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground transition-transform duration-200"
          />
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {demoAccounts?.map((account) => (
              <div
                key={account?.role}
                className={`p-3 border rounded-lg ${account?.color} hover:shadow-sm transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={account?.icon} size={18} />
                    <div>
                      <p className="text-sm font-medium">
                        {account?.name}
                      </p>
                      <p className="text-xs opacity-80">
                        {account?.department}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCredentialSelect(account)}
                    iconName="Copy"
                    iconPosition="left"
                    className="text-xs"
                  >
                    {t?.copyCredentials}
                  </Button>
                </div>
                
                <div className="mt-2 pt-2 border-t border-current/20">
                  <div className="grid grid-cols-1 gap-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="opacity-80">Email:</span>
                      <span className="font-semibold">{account?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Password:</span>
                      <span className="font-semibold">{account?.password}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoCredentials;