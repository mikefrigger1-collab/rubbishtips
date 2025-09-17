// app/components/MapComponent.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  city: string;
  state: string;
  type: string;
  acceptedMaterials?: string[];
  openingHours?: any;
  fees?: any;
  distance?: number;
}

interface MapComponentProps {
  locations: Location[];
  userLocation?: { lat: number; lng: number };
  nearestLocations?: Location[];
  getLocationUrl?: (location: Location) => string;
}

const MapComponent = ({ locations = [], userLocation, nearestLocations = [], getLocationUrl }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Facility type color mapping for markers
  const getFacilityColor = (type?: string) => {
    const colors = {
      'Rubbish Tip': '#16a34a', // green
      'Transfer Station': '#2563eb', // blue
      'Recycling Centre': '#059669', // emerald
      'Resource Recovery': '#0891b2', // cyan
      'Waste Management': '#7c3aed', // purple
      'Council Tip': '#dc2626', // red
      'default': '#6b7280' // gray
    };
    return colors[type || 'default'] || colors['default'];
  };

  // Create custom marker icon for Australian facilities
  const createMarkerIcon = (type?: string, isNearest = false) => {
    const color = getFacilityColor(type);
    const size = isNearest ? 12 : 8;
    const strokeWidth = isNearest ? 3 : 2;
    
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="${size}" fill="${color}" stroke="white" stroke-width="${strokeWidth}"/>
        ${isNearest ? `<circle cx="12" cy="12" r="16" fill="none" stroke="${color}" stroke-width="2" opacity="0.3"/>` : ''}
      </svg>
    `;
  };

  // Create user location icon
  const createUserIcon = () => {
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="8" fill="#16a34a" stroke="white" stroke-width="4"/>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#16a34a" stroke-width="2" opacity="0.3"/>
        <circle cx="16" cy="16" r="2" fill="white"/>
      </svg>
    `;
  };

  // Default URL generator if not provided
  const defaultGetLocationUrl = (location: Location) => {
    if (getLocationUrl) return getLocationUrl(location);
    
    // Generate URL based on city and location name
    const citySlug = location.city?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    const locationSlug = location.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'location';
    return `/${citySlug}/${locationSlug}`;
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Add Leaflet CSS if not already added
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);
      }
      
      // Fix for default markers in Leaflet with webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!leafletMapRef.current && mapRef.current) {
        // Initialize map centered on Australia
        const map = L.map(mapRef.current, {
          center: userLocation ? [userLocation.lat, userLocation.lng] : [-25.2744, 133.7751], // Center of Australia
          zoom: userLocation ? 12 : 5, // Show all of Australia by default
          zoomControl: true,
          scrollWheelZoom: true
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(map);

        leafletMapRef.current = map;
      }

      const map = leafletMapRef.current;
      if (!map) return;

      // Clear existing markers
      markersRef.current.forEach(marker => map.removeLayer(marker));
      markersRef.current = [];

      // Create marker cluster group
      try {
        await import('leaflet.markercluster');
        const markerCluster = new (L as any).MarkerClusterGroup({
          chunkedLoading: true,
          chunkProgress: function(processed: number, total: number) {
            console.log(`Loading markers: ${processed}/${total}`);
          },
          iconCreateFunction: function(cluster: any) {
            const count = cluster.getChildCount();
            let size = 'small';
            if (count > 100) size = 'large';
            else if (count > 10) size = 'medium';
            
            return L.divIcon({
              html: `<div class="cluster-${size}">${count}</div>`,
              className: 'marker-cluster',
              iconSize: L.point(40, 40)
            });
          }
        });

        // Add user location marker
        if (userLocation) {
          const userIcon = L.divIcon({
            html: createUserIcon(),
            className: 'user-location-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });

          const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
            .bindPopup(`
              <div class="text-center">
                <strong>Your Location</strong><br>
                <small class="text-gray-600">Current position</small>
              </div>
            `);
          
          map.addLayer(userMarker);
          markersRef.current.push(userMarker);

          // Adjust map view to include user location
          map.setView([userLocation.lat, userLocation.lng], 12);
        }

        // Add facility markers
        locations.forEach((location) => {
          if (!location.latitude || !location.longitude) return;

          const isNearest = nearestLocations.some(nearest => 
            nearest.latitude === location.latitude && nearest.longitude === location.longitude
          );

          const markerIcon = L.divIcon({
            html: createMarkerIcon(location.type, isNearest),
            className: 'location-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          // Format accepted materials for display
          const materialsDisplay = location.acceptedMaterials?.length 
            ? location.acceptedMaterials.slice(0, 3).join(', ') + (location.acceptedMaterials.length > 3 ? '...' : '')
            : 'Various materials accepted';

          // Format opening hours
          const openingHours = location.openingHours 
            ? (typeof location.openingHours === 'object' 
               ? Object.entries(location.openingHours).slice(0, 2).map(([day, hours]) => 
                   `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`
                 ).join('<br>')
               : location.openingHours)
            : 'Contact for hours';

          const popupContent = `
            <div class="p-3 min-w-[250px]">
              <div class="font-semibold text-gray-900 mb-1">${location.name || 'Waste Facility'}</div>
              ${location.type ? 
                `<div class="text-sm text-green-600 font-medium mb-2">${location.type}</div>` : ''
              }
              <div class="text-sm text-gray-700 mb-2">
                ${location.address || ''}<br>
                ${location.city || ''}, ${location.state || ''}
              </div>
              ${location.phone ? 
                `<div class="text-sm text-gray-600 mb-2">📞 ${location.phone}</div>` : ''
              }
              <div class="text-sm text-gray-600 mb-2">
                <strong>Accepts:</strong> ${materialsDisplay}
              </div>
              <div class="text-sm text-gray-600 mb-3">
                <strong>Hours:</strong><br>${openingHours}
              </div>
              ${location.distance ? 
                `<div class="text-sm font-medium text-green-600 mb-3">${location.distance.toFixed(1)} km away</div>` : ''
              }
              <div class="flex space-x-2">
                <a href="${defaultGetLocationUrl(location)}" 
                   class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors !text-white">
                  View Details
                </a>
                ${location.phone ? 
                  `<a href="tel:${location.phone}" 
                      class="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
                     Call
                   </a>` : ''
                }
              </div>
            </div>
          `;

          const marker = L.marker([location.latitude, location.longitude], { icon: markerIcon })
            .bindPopup(popupContent);

          markerCluster.addLayer(marker);
        });

        map.addLayer(markerCluster);
        markersRef.current.push(markerCluster);

        // Fit bounds to show all locations if no user location and we have locations
        if (!userLocation && locations.length > 0) {
          const validLocations = locations.filter(loc => loc.latitude && loc.longitude);
          if (validLocations.length > 0) {
            const group = new L.featureGroup(markerCluster.getLayers());
            if (group.getBounds && group.getBounds().isValid && group.getBounds().isValid()) {
              map.fitBounds(group.getBounds().pad(0.1));
            }
          }
        }

      } catch (clusterError) {
        console.log('Clustering not available, using simple markers');
        
        // Fallback to simple markers if clustering fails
        locations.forEach((location) => {
          if (!location.latitude || !location.longitude) return;

          const marker = L.marker([location.latitude, location.longitude])
            .bindPopup(`<strong>${location.name}</strong><br>${location.address}`);
          
          marker.addTo(map);
          markersRef.current.push(marker);
        });
      }

      // Add custom CSS for clusters (Australian green theme)
      if (!document.getElementById('map-cluster-styles')) {
        const style = document.createElement('style');
        style.id = 'map-cluster-styles';
        style.textContent = `

         /* Fix z-index issues with the map */
          .leaflet-container {
            z-index: 1 !important;
          }
          .leaflet-control-container {
            z-index: 2 !important;
          }
          .leaflet-popup-pane {
            z-index: 10 !important;
          }
          .leaflet-tooltip-pane {
            z-index: 11 !important;
          }
          
          /* Ensure header stays above map */
          nav {
            z-index: 50 !important;
          }
          .marker-cluster {
            background: transparent;
          }
          .cluster-small, .cluster-medium, .cluster-large {
            background: #16a34a;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-weight: bold;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cluster-small {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }
          .cluster-medium {
            width: 35px;
            height: 35px;
            font-size: 13px;
            background: #15803d;
          }
          .cluster-large {
            width: 40px;
            height: 40px;
            font-size: 14px;
            background: #166534;
          }
          .location-marker, .user-location-marker {
            background: transparent;
            border: none;
          }
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .leaflet-popup-tip {
            background: white;
          }
        `;
        document.head.appendChild(style);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [locations, userLocation, nearestLocations]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg border-2 border-gray-200"
      style={{ minHeight: '500px' }}
    />
  );
};

export default MapComponent;