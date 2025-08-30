import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ 
  sensors = [],
  alerts = [],
  onSensorClick,
  onAlertClick,
  className = ''
}) => {
  const [mapView, setMapView] = useState('satellite');
  const [showLayers, setShowLayers] = useState({
    sensors: true,
    alerts: true,
    blueCarbon: true,
    coastalZones: true
  });

  // Mock coastal coordinates for demonstration
  const mockCoordinates = {
    lat: 25.7617,
    lng: -80.1918
  };

  const mapViewOptions = [
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' },
    { value: 'hybrid', label: 'Hybrid', icon: 'Layers' }
  ];

  const layerControls = [
    { key: 'sensors', label: 'Environmental Sensors', icon: 'Radio', color: 'text-blue-600' },
    { key: 'alerts', label: 'Active Alerts', icon: 'AlertTriangle', color: 'text-red-600' },
    { key: 'blueCarbon', label: 'Blue Carbon Zones', icon: 'Trees', color: 'text-green-600' },
    { key: 'coastalZones', label: 'Coastal Protection', icon: 'Waves', color: 'text-cyan-600' }
  ];

  const handleLayerToggle = (layerKey) => {
    setShowLayers(prev => ({
      ...prev,
      [layerKey]: !prev?.[layerKey]
    }));
  };

  return (
    <div className={`relative bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {/* View Toggle */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2">
          <div className="flex space-x-1">
            {mapViewOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={mapView === option?.value ? 'default' : 'ghost'}
                size="xs"
                onClick={() => setMapView(option?.value)}
                iconName={option?.icon}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Layer Controls */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Map Layers</h4>
          <div className="space-y-2">
            {layerControls?.map((layer) => (
              <label key={layer?.key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLayers?.[layer?.key]}
                  onChange={() => handleLayerToggle(layer?.key)}
                  className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
                />
                <Icon name={layer?.icon} size={14} className={layer?.color} />
                <span className="text-xs text-gray-700">{layer?.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col">
          <Button variant="ghost" size="xs" className="rounded-b-none border-b">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="ghost" size="xs" className="rounded-t-none">
            <Icon name="Minus" size={16} />
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 relative">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Coastal Monitoring Area"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockCoordinates?.lat},${mockCoordinates?.lng}&z=12&output=embed`}
          className="absolute inset-0"
        />

        {/* Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mock Sensor Markers */}
          {showLayers?.sensors && (
            <>
              <div className="absolute top-1/4 left-1/3 pointer-events-auto">
                <button
                  onClick={() => onSensorClick?.('sensor-1')}
                  className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                  title="Water Level Sensor"
                >
                  <Icon name="Droplets" size={12} color="white" />
                </button>
              </div>
              <div className="absolute top-2/3 right-1/4 pointer-events-auto">
                <button
                  onClick={() => onSensorClick?.('sensor-2')}
                  className="w-6 h-6 bg-green-600 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                  title="Wind Speed Sensor"
                >
                  <Icon name="Wind" size={12} color="white" />
                </button>
              </div>
            </>
          )}

          {/* Mock Alert Zones */}
          {showLayers?.alerts && alerts?.length > 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={() => onAlertClick?.(alerts?.[0])}
                className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center"
                title="Active Alert Zone"
              >
                <Icon name="AlertTriangle" size={16} color="white" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Environmental Sensors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Alert Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Blue Carbon Areas</span>
            </div>
          </div>
        </div>
      </div>
      {/* Current Location Indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2">
          <div className="text-xs text-gray-600">
            <div className="font-semibold">Miami Beach, FL</div>
            <div>{mockCoordinates?.lat}°N, {Math.abs(mockCoordinates?.lng)}°W</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;