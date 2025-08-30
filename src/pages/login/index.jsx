import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SystemHeader from './components/SystemHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const handleCredentialSelect = (email, password) => {
    setFormData({ email, password });
    // Trigger form update by dispatching events
    const emailEvent = new Event('input', { bubbles: true });
    const passwordEvent = new Event('input', { bubbles: true });
    
    setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      
      if (emailInput && passwordInput) {
        emailInput.value = email;
        passwordInput.value = password;
        emailInput.dispatchEvent(emailEvent);
        passwordInput.dispatchEvent(passwordEvent);
      }
    }, 100);
  };

  const text = {
    en: {
      pageTitle: 'Sign In - CoastalGuard Pro',
      welcomeTitle: 'Welcome Back',
      welcomeSubtitle: 'Sign in to access your emergency management dashboard',
      secureConnection: 'Secure Connection',
      lastUpdated: 'System last updated: August 30, 2025'
    },
    es: {
      pageTitle: 'Iniciar Sesión - CoastalGuard Pro',
      welcomeTitle: 'Bienvenido de Nuevo',
      welcomeSubtitle: 'Inicia sesión para acceder a tu panel de gestión de emergencias',
      secureConnection: 'Conexión Segura',
      lastUpdated: 'Sistema actualizado por última vez: 30 de agosto, 2025'
    }
  };

  const t = text[currentLanguage] || text.en;

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content="Secure login for CoastalGuard Pro emergency management system. Access real-time coastal threat monitoring and alert management." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* System Header */}
        <SystemHeader 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e0f2fe%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        {/* Main Content */}
        <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-4rem)] gap-12">
              
              {/* Left Side - Welcome Content */}
              <div className="flex-1 max-w-lg text-center lg:text-left">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                      {t.welcomeTitle}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t.welcomeSubtitle}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="hidden lg:block space-y-4">
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Real-time coastal threat monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">AI-powered predictive analytics</span>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Multi-channel alert management</span>
                    </div>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Community impact assessment</span>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="hidden lg:flex items-center space-x-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{t.secureConnection}</span>
                    <span>•</span>
                    <span>{t.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="flex-1 max-w-md w-full">
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-8">
                  {/* Login Form */}
                  <LoginForm 
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                  />

                  {/* Demo Credentials */}
                  <DemoCredentials 
                    currentLanguage={currentLanguage}
                    onCredentialSelect={handleCredentialSelect}
                  />

                  {/* Trust Signals */}
                  <TrustSignals currentLanguage={currentLanguage} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative bg-card border-t border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} CoastalGuard Pro. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground">
                  Emergency Management System v2.1.0
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </button>
                <button className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </button>
                <button className="hover:text-foreground transition-colors duration-200">
                  Support
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;