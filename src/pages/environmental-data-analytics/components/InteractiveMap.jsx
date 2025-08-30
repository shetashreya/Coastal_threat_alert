import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InteractiveMap = ({ 
  onSensorClick, 
  selectedSensor = null,
  showEcosystemZones = true,
  showSensorClusters = true 
}) => {
  const [mapView, setMapView] = useState('satellite');
  const [activeOverlays, setActiveOverlays] = useState(['sensors', 'ecosystems']);
  const [sensorData, setSensorData] = useState([]);

  // Mock sensor data
  const mockSensors = [
    {
      id: 'sensor-001',
      name: 'Coastal Station Alpha',
      lat: 25.7617,
      lng: -80.1918,
      type: 'tidal',
      status: 'active',
      lastReading: '2 min ago',
      value: '2.3m',
      health: 98
    },
    {
      id: 'sensor-002',
      name: 'Weather Station Beta',
      lat: 25.7717,
      lng: -80.1818,
      type: 'weather',
      status: 'active',
      lastReading: '1 min ago',
      value: '24°C',
      health: 95
    },
    {
      id: 'sensor-003',
      name: 'Wind Monitor Gamma',
      lat: 25.7517,
      lng: -80.2018,
      type: 'wind',
      status: 'warning',
      lastReading: '5 min ago',
      value: '35 km/h',
      health: 87
    },
    {
      id: 'sensor-004',
      name: 'Rain Gauge Delta',
      lat: 25.7417,
      lng: -80.1718,
      type: 'rainfall',
      status: 'offline',
      lastReading: '2 hours ago',
      value: 'N/A',
      health: 0
    }
  ];

  // Mock ecosystem zones
  const ecosystemZones = [
    {
      id: 'mangrove-001',
      name: 'Biscayne Bay Mangroves',
      type: 'mangrove',
      area: '1,250 hectares',
      carbonStorage: '45,000 tons CO2',
      health: 'Good'
    },
    {
      id: 'seagrass-001',
      name: 'Florida Bay Seagrass',
      type: 'seagrass',
      area: '890 hectares',
      carbonStorage: '23,000 tons CO2',
      health: 'Moderate'
    }
  ];

  const mapViewOptions = [
    { value: 'satellite', label: 'Satellite View' },
    { value: 'terrain', label: 'Terrain View' },
    { value: 'hybrid', label: 'Hybrid View' }
  ];

  const overlayOptions = [
    { id: 'sensors', label: 'Environmental Sensors', icon: 'Radio', color: 'text-blue-600' },
    { id: 'ecosystems', label: 'Blue Carbon Zones', icon: 'Trees', color: 'text-green-600' },
    { id: 'alerts', label: 'Alert Boundaries', icon: 'AlertTriangle', color: 'text-red-600' },
    { id: 'infrastructure', label: 'Critical Infrastructure', icon: 'Building', color: 'text-purple-600' }
  ];

  useEffect(() => {
    setSensorData(mockSensors);
  }, []);

  const handleOverlayToggle = (overlayId) => {
    setActiveOverlays(prev => 
      prev?.includes(overlayId) 
        ? prev?.filter(id => id !== overlayId)
        : [...prev, overlayId]
    );
  };

  const getSensorStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'offline': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getSensorIcon = (type) => {
    switch (type) {
      case 'tidal': return 'Waves';
      case 'weather': return 'Cloud';
      case 'wind': return 'Wind';
      case 'rainfall': return 'CloudRain';
      default: return 'Radio';
    }
  };

  const handleSensorClick = (sensor) => {
    if (onSensorClick) {
      onSensorClick(sensor);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* View Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Map" size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Map View:</span>
            </div>
            <Select
              options={mapViewOptions}
              value={mapView}
              onChange={setMapView}
              className="w-40"
            />
          </div>

          {/* Overlay Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground mr-2">Overlays:</span>
            {overlayOptions?.map((overlay) => (
              <button
                key={overlay?.id}
                onClick={() => handleOverlayToggle(overlay?.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeOverlays?.includes(overlay?.id)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={overlay?.icon} size={14} className={activeOverlays?.includes(overlay?.id) ? '' : overlay?.color} />
                <span>{overlay?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Environmental Monitoring Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=25.7617,-80.1918&z=12&output=embed"
          className="absolute inset-0"
        />

        {/* Sensor Overlay */}
        {activeOverlays?.includes('sensors') && (
          <div className="absolute inset-0 pointer-events-none">
            {sensorData?.map((sensor, index) => (
              <div
                key={sensor?.id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`
                }}
                onClick={() => handleSensorClick(sensor)}
              >
                <div className={`relative p-2 rounded-full ${getSensorStatusColor(sensor?.status)} shadow-lg hover:scale-110 transition-transform duration-200`}>
                  <Icon name={getSensorIcon(sensor?.type)} size={16} className="text-white" />
                  {sensor?.status === 'active' && (
                    <div className="absolute inset-0 rounded-full bg-current opacity-75 animate-ping" />
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-popover border border-border rounded px-2 py-1 text-xs font-medium text-popover-foreground shadow-lg whitespace-nowrap">
                  {sensor?.name}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ecosystem Zones Overlay */}
        {activeOverlays?.includes('ecosystems') && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-1/2 w-20 h-16 bg-green-500/30 border-2 border-green-500 rounded-lg pointer-events-auto cursor-pointer hover:bg-green-500/40 transition-colors duration-200">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs font-medium text-popover-foreground shadow-lg whitespace-nowrap">
                Mangrove Zone
              </div>
            </div>
            <div className="absolute right-1/3 bottom-1/3 w-24 h-12 bg-blue-500/30 border-2 border-blue-500 rounded-lg pointer-events-auto cursor-pointer hover:bg-blue-500/40 transition-colors duration-200">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs font-medium text-popover-foreground shadow-lg whitespace-nowrap">
                Seagrass Beds
              </div>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-popover border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-semibold text-popover-foreground mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-popover-foreground">Active Sensor</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-popover-foreground">Warning Status</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-xs text-popover-foreground">Offline Sensor</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded border border-green-600" />
              <span className="text-xs text-popover-foreground">Blue Carbon Zone</span>
            </div>
          </div>
        </div>
      </div>
      {/* Sensor Details Panel */}
      {selectedSensor && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-foreground">{selectedSensor?.name}</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => onSensorClick(null)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getSensorStatusColor(selectedSensor?.status)}`} />
                <span className="text-sm font-medium text-foreground capitalize">{selectedSensor?.status}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Reading</p>
              <p className="text-sm font-medium text-foreground">{selectedSensor?.value}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Update</p>
              <p className="text-sm font-medium text-foreground">{selectedSensor?.lastReading}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Health Score</p>
              <p className="text-sm font-medium text-foreground">{selectedSensor?.health}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;