import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageToggle = ({ 
  currentLanguage = 'en', 
  onLanguageChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸'
    }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  const handleLanguageSelect = (languageCode) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event) => {
    if (event?.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-popover-foreground">
          Language
        </span>
        <Icon name="Globe" size={16} className="text-muted-foreground" />
      </div>
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between p-2 rounded-md border border-border hover:bg-muted focus-emergency transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{currentLang?.flag}</span>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">
              {currentLang?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLang?.nativeName}
            </p>
          </div>
        </div>
        
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground transition-transform duration-200"
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-emergency-md z-70 animate-fade-in">
          {languages?.map((language) => (
            <button
              key={language?.code}
              onClick={() => handleLanguageSelect(language?.code)}
              className={`w-full flex items-center space-x-2 p-2 text-left hover:bg-muted focus-emergency transition-colors duration-200 first:rounded-t-md last:rounded-b-md ${
                language?.code === currentLanguage 
                  ? 'bg-primary/10 text-primary' :'text-popover-foreground'
              }`}
            >
              <span className="text-lg">{language?.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {language?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language?.nativeName}
                </p>
              </div>
              {language?.code === currentLanguage && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;