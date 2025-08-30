import React from 'react';
import Icon from '../../../components/AppIcon';
import LanguageToggle from './LanguageToggle';

const SystemHeader = ({ currentLanguage, onLanguageChange }) => {
  const text = {
    en: {
      systemName: 'CoastalGuard Pro',
      tagline: 'Emergency Management System',
      version: 'v2.1.0'
    },
    es: {
      systemName: 'CoastalGuard Pro',
      tagline: 'Sistema de Gestión de Emergencias',
      version: 'v2.1.0'
    }
  };

  const t = text?.[currentLanguage] || text?.en;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-sm">
              <Icon 
                name="Shield" 
                size={24} 
                color="white" 
                className="drop-shadow-sm"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                {t?.systemName}
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                {t?.tagline}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-800">
                Online
              </span>
            </div>

            {/* Version */}
            <div className="hidden md:block text-xs text-muted-foreground font-mono">
              {t?.version}
            </div>

            {/* Language Toggle */}
            <LanguageToggle 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SystemHeader;