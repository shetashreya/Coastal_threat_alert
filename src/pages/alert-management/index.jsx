import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertStatisticsToolbar from './components/AlertStatisticsToolbar';
import AlertCreationWizard from './components/AlertCreationWizard';
import ActiveAlertsTable from './components/ActiveAlertsTable';
import AlertExplainabilityPanel from './components/AlertExplainabilityPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AlertManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const user = {
    name: 'Emergency Coordinator',
    role: 'admin',
    email: 'coordinator@coastalguard.gov',
    avatar: null,
    department: 'Emergency Management'
  };

  const alertStatus = {
    level: 'watch',
    count: 3
  };

  const translations = {
    en: {
      pageTitle: 'Alert Management - CoastalGuard Pro',
      metaDescription: 'Comprehensive alert management system for coastal emergency coordination and multi-channel notification delivery.',
      mainHeading: 'Alert Management System',
      createAlert: 'Create New Alert',
      activeAlerts: 'Active Alerts',
      explainability: 'Alert Explainability',
      noAlertSelected: 'No Alert Selected',
      selectAlertMessage: 'Select an alert from the table to view detailed explainability information.',
      refreshData: 'Refresh Data',
      exportAlerts: 'Export Alerts',
      bulkActions: 'Bulk Actions'
    },
    es: {
      pageTitle: 'Gestión de Alertas - CoastalGuard Pro',
      metaDescription: 'Sistema integral de gestión de alertas para coordinación de emergencias costeras y entrega de notificaciones multicanal.',
      mainHeading: 'Sistema de Gestión de Alertas',
      createAlert: 'Crear Nueva Alerta',
      activeAlerts: 'Alertas Activas',
      explainability: 'Explicabilidad de Alertas',
      noAlertSelected: 'Ninguna Alerta Seleccionada',
      selectAlertMessage: 'Seleccione una alerta de la tabla para ver información detallada de explicabilidad.',
      refreshData: 'Actualizar Datos',
      exportAlerts: 'Exportar Alertas',
      bulkActions: 'Acciones en Lote'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const handleCreateAlert = async (alertData) => {
    setIsCreatingAlert(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAlert = {
        id: `ALT-2024-${String(Date.now())?.slice(-3)}`,
        title: alertData?.title,
        severity: alertData?.severity,
        timestamp: new Date(),
        zones: alertData?.zones,
        affectedPopulation: Math.floor(Math.random() * 20000) + 5000,
        deliveryStatus: {
          sms: { sent: 0, delivered: 0, failed: 0 },
          push: { sent: 0, delivered: 0, failed: 0 },
          whatsapp: { sent: 0, delivered: 0, failed: 0 },
          email: { sent: 0, delivered: 0, failed: 0 }
        },
        status: 'active',
        escalationLevel: alertData?.severity === 'warning' ? 2 : alertData?.severity === 'watch' ? 1 : 0,
        confirmationRate: 0,
        expiryTime: alertData?.expiryTime ? new Date(alertData.expiryTime) : new Date(Date.now() + 24 * 60 * 60 * 1000)
      };

      setAlerts(prev => [newAlert, ...prev]);
      setShowCreateWizard(false);
      
      console.log('Alert created successfully:', newAlert);
    } catch (error) {
      console.error('Failed to create alert:', error);
    } finally {
      setIsCreatingAlert(false);
    }
  };

  const handleAlertAction = (action, alertId) => {
    switch (action) {
      case 'view':
        setSelectedAlert(alertId);
        break;
      case 'edit': console.log('Edit alert:', alertId);
        break;
      case 'cancel':
        if (Array.isArray(alertId)) {
          console.log('Cancel multiple alerts:', alertId);
        } else {
          console.log('Cancel alert:', alertId);
        }
        break;
      case 'extend':
        if (Array.isArray(alertId)) {
          console.log('Extend multiple alerts:', alertId);
        } else {
          console.log('Extend alert:', alertId);
        }
        break;
      default:
        console.log('Unknown action:', action, alertId);
    }
  };

  const handleExportAlerts = (format) => {
    console.log(`Exporting alerts in ${format} format`);
    // Simulate export functionality
    const exportData = {
      format,
      timestamp: new Date()?.toISOString(),
      alertCount: alerts?.length
    };
    console.log('Export data:', exportData);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    console.log('Refreshing alert data...');
  };

  const handleCloseExplainability = () => {
    setSelectedAlert(null);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations?.[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlerts(prev => prev?.map(alert => ({
        ...alert,
        confirmationRate: Math.min(100, alert?.confirmationRate + Math.random() * 2),
        deliveryStatus: {
          ...alert?.deliveryStatus,
          sms: {
            ...alert?.deliveryStatus?.sms,
            delivered: Math.min(alert?.deliveryStatus?.sms?.sent, alert?.deliveryStatus?.sms?.delivered + Math.floor(Math.random() * 10))
          }
        }
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t?.pageTitle}</title>
        <meta name="description" content={t?.metaDescription} />
        <meta name="keywords" content="alert management, emergency coordination, coastal monitoring, notification system" />
        <meta property="og:title" content={t?.pageTitle} />
        <meta property="og:description" content={t?.metaDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar 
          user={user}
          alertStatus={alertStatus}
        />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {t?.mainHeading}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Manage and coordinate emergency alerts across coastal communities
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    {t?.refreshData}
                  </Button>
                  <Button
                    onClick={() => setShowCreateWizard(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    {t?.createAlert}
                  </Button>
                </div>
              </div>
            </div>

            {/* Statistics Toolbar */}
            <AlertStatisticsToolbar
              onRefresh={handleRefresh}
              onCreateAlert={() => setShowCreateWizard(true)}
            />

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Left Sidebar - Alert Creation Wizard */}
              <div className="lg:col-span-3">
                {showCreateWizard ? (
                  <AlertCreationWizard
                    onCreateAlert={handleCreateAlert}
                    isCreating={isCreatingAlert}
                  />
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Plus" size={32} className="text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {t?.createAlert}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Start the alert creation wizard to broadcast emergency notifications to coastal communities.
                    </p>
                    <Button
                      onClick={() => setShowCreateWizard(true)}
                      iconName="Plus"
                      iconPosition="left"
                      fullWidth
                    >
                      {t?.createAlert}
                    </Button>
                  </div>
                )}
              </div>

              {/* Center Area - Active Alerts Table */}
              <div className="lg:col-span-7">
                <ActiveAlertsTable
                  alerts={alerts}
                  onAlertAction={handleAlertAction}
                  onExportAlerts={handleExportAlerts}
                />
              </div>

              {/* Right Panel - Alert Explainability */}
              <div className="lg:col-span-2">
                <AlertExplainabilityPanel
                  selectedAlert={selectedAlert}
                  onClose={handleCloseExplainability}
                />
              </div>
            </div>

            {/* Mobile-Optimized Quick Actions */}
            <div className="lg:hidden mt-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateWizard(true)}
                    iconName="Plus"
                    iconPosition="left"
                    fullWidth
                  >
                    Create Alert
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    iconName="RefreshCw"
                    iconPosition="left"
                    fullWidth
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AlertManagement;