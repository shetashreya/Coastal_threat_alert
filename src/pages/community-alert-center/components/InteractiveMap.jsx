import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ 
  alerts = [],
  shelters = [],
  evacuationRoutes = [],
  onLocationSelect
}) => {
  const [selectedLayer, setSelectedLayer] = useState('alerts');
  const [mapCenter] = useState({ lat: 25.7617, lng: -80.1918 }); // Miami coordinates

  const mapLayers = [
    { id: 'alerts', label: 'Active Alerts', icon: 'AlertTriangle', count: alerts?.length },
    { id: 'shelters', label: 'Emergency Shelters', icon: 'Home', count: shelters?.length },
    { id: 'routes', label: 'Evacuation Routes', icon: 'Route', count: evacuationRoutes?.length },
    { id: 'zones', label: 'Risk Zones', icon: 'Map', count: 5 }
  ];

  const mockShelters = [
    {
      id: 1,
      name: 'Miami Beach Community Center',
      address: '2100 Washington Ave, Miami Beach, FL',
      capacity: 500,
      currentOccupancy: 45,
      amenities: ['Pet Friendly', 'Medical Support', 'Food Service'],
      status: 'open'
    },
    {
      id: 2,
      name: 'Coral Gables High School',
      address: '450 Bird Rd, Coral Gables, FL',
      capacity: 800,
      currentOccupancy: 120,
      amenities: ['Wheelchair Accessible', 'Food Service'],
      status: 'open'
    }
  ];

  const mockRoutes = [
    {
      id: 1,
      name: 'Route A - North Evacuation',
      description: 'Primary evacuation route for northern coastal areas',
      status: 'clear',
      estimatedTime: '25 minutes'
    },
    {
      id: 2,
      name: 'Route B - West Evacuation',
      description: 'Alternative route via inland highways',
      status: 'congested',
      estimatedTime: '45 minutes'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-success';
      case 'full': return 'text-error';
      case 'limited': return 'text-warning';
      case 'clear': return 'text-success';
      case 'congested': return 'text-warning';
      case 'blocked': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Interactive Coastal Map
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Maximize2">
              Full Screen
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>

        {/* Layer Toggle */}
        <div className="flex flex-wrap gap-2">
          {mapLayers?.map((layer) => (
            <button
              key={layer?.id}
              onClick={() => setSelectedLayer(layer?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLayer === layer?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={layer?.icon} size={16} />
              <span>{layer?.label}</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {layer?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative">
        <div className="h-96 bg-muted flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Coastal Emergency Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
            className="border-0"
          />
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="outline" size="sm" iconName="Plus" className="bg-card" />
          <Button variant="outline" size="sm" iconName="Minus" className="bg-card" />
          <Button variant="outline" size="sm" iconName="RotateCcw" className="bg-card" />
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg max-w-xs">
          <h4 className="text-sm font-medium text-foreground mb-2">Map Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-critical rounded-full"></div>
              <span className="text-muted-foreground">Critical Alert Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-high rounded-full"></div>
              <span className="text-muted-foreground">High Risk Area</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Emergency Shelter</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Evacuation Route</span>
            </div>
          </div>
        </div>
      </div>
      {/* Information Panel */}
      <div className="p-4 border-t border-border bg-muted/30">
        {selectedLayer === 'shelters' && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Emergency Shelters</h4>
            {mockShelters?.map((shelter) => (
              <div key={shelter?.id} className="flex items-start justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{shelter?.name}</h5>
                  <p className="text-sm text-muted-foreground mb-1">{shelter?.address}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Capacity: {shelter?.currentOccupancy}/{shelter?.capacity}</span>
                    <span className={`font-medium ${getStatusColor(shelter?.status)}`}>
                      {shelter?.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {shelter?.amenities?.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Navigation">
                  Directions
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedLayer === 'routes' && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Evacuation Routes</h4>
            {mockRoutes?.map((route) => (
              <div key={route?.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{route?.name}</h5>
                  <p className="text-sm text-muted-foreground">{route?.description}</p>
                  <div className="flex items-center space-x-4 text-xs mt-1">
                    <span className={`font-medium ${getStatusColor(route?.status)}`}>
                      {route?.status?.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">ETA: {route?.estimatedTime}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" iconName="Route">
                  Select Route
                </Button>
              </div>
            ))}
          </div>
        )}

        {selectedLayer === 'alerts' && (
          <div className="text-center py-4">
            <Icon name="MapPin" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click on alert markers to view detailed information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;