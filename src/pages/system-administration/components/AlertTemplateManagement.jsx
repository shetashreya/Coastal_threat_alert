import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertTemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const alertTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'flood', label: 'Flood Warning' },
    { value: 'storm_surge', label: 'Storm Surge' },
    { value: 'high_wind', label: 'High Wind' },
    { value: 'heavy_rain', label: 'Heavy Rainfall' },
    { value: 'temperature', label: 'Temperature Alert' }
  ];

  const severityOptions = [
    { value: 'advisory', label: 'Advisory', color: 'bg-blue-100 text-blue-800' },
    { value: 'watch', label: 'Watch', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'warning', label: 'Warning', color: 'bg-red-100 text-red-800' }
  ];

  const channelOptions = [
    { value: 'sms', label: 'SMS' },
    { value: 'email', label: 'Email' },
    { value: 'push', label: 'Push Notification' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const mockTemplates = [
    {
      id: 1,
      name: "Flood Warning - Critical",
      type: "flood",
      severity: "warning",
      channels: ["sms", "email", "push"],
      isActive: true,
      lastModified: new Date(Date.now() - 86400000),
      usageCount: 145,
      effectivenessScore: 92,
      content: {
        en: {
          title: "FLOOD WARNING - Immediate Action Required",
          message: `URGENT: Flood warning issued for your area. Water levels rising rapidly.\n\nExpected flood height: {flood_height} feet\nEstimated arrival: {arrival_time}\n\nACTION REQUIRED:\n• Move to higher ground immediately\n• Avoid driving through flooded roads\n• Stay tuned for updates\n\nEmergency contacts: 911\nInfo: coastalguard.gov/alerts`,
          actionButton: "View Emergency Map"
        },
        es: {
          title: "ALERTA DE INUNDACIÓN - Acción Inmediata Requerida",
          message: `URGENTE: Alerta de inundación emitida para su área. Los niveles de agua están subiendo rápidamente.\n\nAltura de inundación esperada: {flood_height} pies\nLlegada estimada: {arrival_time}\n\nACCIÓN REQUERIDA:\n• Muévase a terreno más alto inmediatamente\n• Evite conducir por carreteras inundadas\n• Manténgase atento a las actualizaciones\n\nContactos de emergencia: 911\nInfo: coastalguard.gov/alerts`,
          actionButton: "Ver Mapa de Emergencia"
        }
      }
    },
    {
      id: 2,
      name: "Storm Surge Advisory",
      type: "storm_surge",
      severity: "advisory",
      channels: ["email", "push"],
      isActive: true,
      lastModified: new Date(Date.now() - 172800000),
      usageCount: 89,
      effectivenessScore: 87,
      content: {
        en: {
          title: "Storm Surge Advisory",
          message: `Storm surge advisory in effect for coastal areas.\n\nExpected surge height: {surge_height} feet\nTiming: {timing}\n\nRECOMMENDATIONS:\n• Monitor conditions closely\n• Secure outdoor items\n• Review evacuation routes\n• Stay informed through official channels\n\nFor updates: coastalguard.gov/alerts`,
          actionButton: "View Conditions"
        },
        es: {
          title: "Aviso de Marejada Ciclónica",
          message: `Aviso de marejada ciclónica en efecto para áreas costeras.\n\nAltura de marejada esperada: {surge_height} pies\nTiempo: {timing}\n\nRECOMENDACIONES:\n• Monitoree las condiciones de cerca\n• Asegure artículos al aire libre\n• Revise las rutas de evacuación\n• Manténgase informado a través de canales oficiales\n\nPara actualizaciones: coastalguard.gov/alerts`,
          actionButton: "Ver Condiciones"
        }
      }
    },
    {
      id: 3,
      name: "High Wind Watch",
      type: "high_wind",
      severity: "watch",
      channels: ["sms", "push"],
      isActive: true,
      lastModified: new Date(Date.now() - 259200000),
      usageCount: 67,
      effectivenessScore: 84,
      content: {
        en: {
          title: "High Wind Watch",
          message: `High wind watch issued for your area.\n\nExpected wind speeds: {wind_speed} mph\nDuration: {duration}\n\nPRECAUTIONS:\n• Secure loose objects outdoors\n• Avoid unnecessary travel\n• Stay away from windows\n• Check on neighbors\n\nStay safe and informed: coastalguard.gov/alerts`,
          actionButton: "Safety Tips"
        },
        es: {
          title: "Vigilancia de Vientos Fuertes",
          message: `Vigilancia de vientos fuertes emitida para su área.\n\nVelocidades de viento esperadas: {wind_speed} mph\nDuración: {duration}\n\nPRECAUCIONES:\n• Asegure objetos sueltos al aire libre\n• Evite viajes innecesarios\n• Manténgase alejado de las ventanas\n• Verifique a los vecinos\n\nManténgase seguro e informado: coastalguard.gov/alerts`,
          actionButton: "Consejos de Seguridad"
        }
      }
    }
  ];

  useEffect(() => {
    setTemplates(mockTemplates);
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = filterType === 'all' || template?.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handleCreateTemplate = () => {
    setSelectedTemplate({
      id: null,
      name: '',
      type: 'flood',
      severity: 'advisory',
      channels: ['sms'],
      isActive: true,
      content: {
        en: { title: '', message: '', actionButton: '' },
        es: { title: '', message: '', actionButton: '' }
      }
    });
    setShowEditor(true);
  };

  const handleSaveTemplate = () => {
    if (selectedTemplate?.id) {
      setTemplates(templates?.map(t => t?.id === selectedTemplate?.id ? selectedTemplate : t));
    } else {
      const newTemplate = {
        ...selectedTemplate,
        id: templates?.length + 1,
        lastModified: new Date(),
        usageCount: 0,
        effectivenessScore: 0
      };
      setTemplates([...templates, newTemplate]);
    }
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates?.filter(t => t?.id !== templateId));
  };

  const handleToggleActive = (templateId) => {
    setTemplates(templates?.map(t => 
      t?.id === templateId ? { ...t, isActive: !t?.isActive } : t
    ));
  };

  const handleDuplicateTemplate = (template) => {
    const duplicated = {
      ...template,
      id: templates?.length + 1,
      name: `${template?.name} (Copy)`,
      lastModified: new Date(),
      usageCount: 0
    };
    setTemplates([...templates, duplicated]);
  };

  const renderTemplateEditor = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-card border border-border rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h4 className="text-lg font-semibold text-foreground">
              {selectedTemplate?.id ? 'Edit Template' : 'Create Template'}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setShowEditor(false)}
            />
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Template Name"
                value={selectedTemplate?.name}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  name: e?.target?.value
                })}
                required
              />
              
              <Select
                label="Alert Type"
                options={alertTypeOptions?.filter(o => o?.value !== 'all')}
                value={selectedTemplate?.type}
                onChange={(value) => setSelectedTemplate({
                  ...selectedTemplate,
                  type: value
                })}
                required
              />
              
              <Select
                label="Severity Level"
                options={severityOptions}
                value={selectedTemplate?.severity}
                onChange={(value) => setSelectedTemplate({
                  ...selectedTemplate,
                  severity: value
                })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Delivery Channels
                </label>
                <div className="space-y-2">
                  {channelOptions?.map(channel => (
                    <div key={channel?.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedTemplate?.channels?.includes(channel?.value)}
                        onChange={(e) => {
                          const channels = e?.target?.checked
                            ? [...selectedTemplate?.channels, channel?.value]
                            : selectedTemplate?.channels?.filter(c => c !== channel?.value);
                          setSelectedTemplate({
                            ...selectedTemplate,
                            channels
                          });
                        }}
                      />
                      <span className="text-sm text-foreground">{channel?.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">Language:</span>
              <div className="flex space-x-2">
                <Button
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentLanguage('en')}
                >
                  English
                </Button>
                <Button
                  variant={currentLanguage === 'es' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentLanguage('es')}
                >
                  Español
                </Button>
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <Input
                label="Alert Title"
                value={selectedTemplate?.content?.[currentLanguage]?.title || ''}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  content: {
                    ...selectedTemplate?.content,
                    [currentLanguage]: {
                      ...selectedTemplate?.content?.[currentLanguage],
                      title: e?.target?.value
                    }
                  }
                })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Alert Message
                </label>
                <textarea
                  className="w-full h-48 p-3 border border-border rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedTemplate?.content?.[currentLanguage]?.message || ''}
                  onChange={(e) => setSelectedTemplate({
                    ...selectedTemplate,
                    content: {
                      ...selectedTemplate?.content,
                      [currentLanguage]: {
                        ...selectedTemplate?.content?.[currentLanguage],
                        message: e?.target?.value
                      }
                    }
                  })}
                  placeholder="Enter alert message content..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use variables like {'{flood_height}'}, {'{arrival_time}'}, {'{wind_speed}'} for dynamic content
                </p>
              </div>
              
              <Input
                label="Action Button Text"
                value={selectedTemplate?.content?.[currentLanguage]?.actionButton || ''}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  content: {
                    ...selectedTemplate?.content,
                    [currentLanguage]: {
                      ...selectedTemplate?.content?.[currentLanguage],
                      actionButton: e?.target?.value
                    }
                  }
                })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowEditor(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSaveTemplate}
              disabled={!selectedTemplate?.name || !selectedTemplate?.content?.[currentLanguage]?.title}
            >
              Save Template
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alert Template Management</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage alert message templates with multi-language support
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={handleCreateTemplate}
        >
          Create Template
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={alertTypeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by type"
          />
        </div>
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates?.map(template => (
          <div key={template?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-foreground">{template?.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    severityOptions?.find(s => s?.value === template?.severity)?.color
                  }`}>
                    {severityOptions?.find(s => s?.value === template?.severity)?.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {alertTypeOptions?.find(t => t?.value === template?.type)?.label}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${template?.isActive ? 'bg-success' : 'bg-muted-foreground'}`} />
                <span className="text-xs text-muted-foreground">
                  {template?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Template Preview */}
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-foreground mb-1">
                {template?.content?.en?.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-3">
                {template?.content?.en?.message?.substring(0, 120)}...
              </p>
            </div>

            {/* Channels */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template?.channels?.map(channel => (
                <span key={channel} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {channelOptions?.find(c => c?.value === channel)?.label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="text-lg font-semibold text-foreground">{template?.usageCount}</p>
                <p className="text-xs text-muted-foreground">Uses</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{template?.effectivenessScore}%</p>
                <p className="text-xs text-muted-foreground">Effectiveness</p>
              </div>
              <div>
                <p className="text-xs text-foreground">
                  {new Date(template.lastModified)?.toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">Modified</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => handleEditTemplate(template)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                onClick={() => handleDuplicateTemplate(template)}
              >
                Duplicate
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName={template?.isActive ? "Pause" : "Play"}
                onClick={() => handleToggleActive(template?.id)}
              >
                {template?.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={() => handleDeleteTemplate(template?.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Template Editor Modal */}
      {showEditor && renderTemplateEditor()}
    </div>
  );
};

export default AlertTemplateManagement;