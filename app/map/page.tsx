// app/map/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  )
});

interface Location {
  id: number;
  name: string;
  slug?: string;        // Add this line
  citySlug?: string;    // Add this line
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  city: string;
  state: string;
  type: string;
  acceptedMaterials: string[];
  openingHours: any;
  fees?: any;
  distance?: number;
}

export default function MapPage() {
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearestLocations, setNearestLocations] = useState<Location[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [searchRadius, setSearchRadius] = useState(25);
  const [addressSearch, setAddressSearch] = useState('');
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);

  const australianStates = [
    { name: 'All Australia', value: '' },
    { name: 'Sydney (NSW)', value: 'NSW' },
    { name: 'Melbourne (VIC)', value: 'VIC' },
    { name: 'Brisbane (QLD)', value: 'QLD' },
    { name: 'Perth (WA)', value: 'WA' },
    { name: 'Adelaide (SA)', value: 'SA' },
    { name: 'Hobart (TAS)', value: 'TAS' },
    { name: 'Canberra (ACT)', value: 'ACT' },
    { name: 'Darwin (NT)', value: 'NT' }
  ];

  // Load locations data on component mount
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setIsLoadingData(true);
        
        // Try to load from your locations JSON file
        // You can update this path when you have your data file ready
        const response = await fetch('/data/locations.json');
        
        if (!response.ok) {
          throw new Error('Failed to load locations data');
        }
        
        const data = await response.json();
        
        // Extract locations from the nested city structure
        let locations: Location[] = [];
        
        if (data.cities && Array.isArray(data.cities)) {
          data.cities.forEach((city: any) => {
            if (city.locations && Array.isArray(city.locations)) {
              city.locations.forEach((location: any, index: number) => {
                locations.push({
                  id: location.id || `${city.slug}-${index}`,
                  name: location.name || 'Waste Facility',
                  address: location.address || '',
                  latitude: parseFloat(location.latitude) || 0,
                  longitude: parseFloat(location.longitude) || 0,
                  phone: location.phone || '',
                  city: location.city || city.name || '',
                  state: location.state || city.state || '',
                  type: location.type || 'Waste Facility',
                  acceptedMaterials: location.acceptedMaterials || ['General Waste'],
                  openingHours: location.openingHours || {},
                  fees: location.fees || {}
                });
              });
            }
          });
        }
        
        // Fallback: try old states structure for backward compatibility
        else if (data.states && Array.isArray(data.states)) {
          data.states.forEach((state: any) => {
            if (state.locations && Array.isArray(state.locations)) {
              state.locations.forEach((location: any, index: number) => {
                locations.push({
                  id: location.id || `${state.slug}-${index}`,
                  name: location.name || location.company || 'Waste Facility',
                  address: location.address || '',
                  latitude: parseFloat(location.latitude) || 0,
                  longitude: parseFloat(location.longitude) || 0,
                  phone: location.phone || '',
                  city: location.city || state.name || '',
                  state: location.state || state.abbreviation || state.slug?.toUpperCase() || '',
                  type: location.type || 'Waste Facility',
                  acceptedMaterials: location.acceptedMaterials || location.materials || ['General Waste'],
                  openingHours: location.openingHours || location.hours || {},
                  fees: location.fees || {}
                });
              });
            }
          });
        }
        
        console.log(`Loaded ${locations.length} locations from JSON`);
        console.log('Sample location:', locations[0]);
        setAllLocations(locations);
        setDataError(null);
        
      } catch (error) {
        console.error('Error loading locations:', error);
        setDataError('Unable to load locations data. Using sample data for demonstration.');
        
        // Fallback to sample data for development/demo
        const sampleLocations: Location[] = [
          {
            id: 1,
            name: "Eastern Creek Resource Recovery Park",
            address: "Rooty Hill Road South, Eastern Creek NSW 2766",
            latitude: -33.7847,
            longitude: 150.8516,
            phone: "(02) 9833 8300",
            city: "Sydney",
            state: "NSW",
            type: "Resource Recovery",
            acceptedMaterials: ["General Waste", "Green Waste", "Construction Waste", "Metal", "E-Waste"],
            openingHours: {
              "Monday": "6:00 AM - 5:00 PM",
              "Tuesday": "6:00 AM - 5:00 PM",
              "Wednesday": "6:00 AM - 5:00 PM",
              "Thursday": "6:00 AM - 5:00 PM",
              "Friday": "6:00 AM - 5:00 PM",
              "Saturday": "6:00 AM - 5:00 PM",
              "Sunday": "6:00 AM - 5:00 PM"
            },
            fees: { carLoad: "$15", trailerLoad: "$25" }
          },
          {
            id: 2,
            name: "Melbourne Regional Waste Centre",
            address: "123 Waste Drive, Tullamarine VIC 3043",
            latitude: -37.7136,
            longitude: 144.8362,
            phone: "(03) 9338 4444",
            city: "Melbourne",
            state: "VIC",
            type: "Transfer Station",
            acceptedMaterials: ["General Waste", "Recycling", "Green Waste", "Bulky Items"],
            openingHours: {
              "Monday": "7:00 AM - 4:00 PM",
              "Tuesday": "7:00 AM - 4:00 PM",
              "Wednesday": "7:00 AM - 4:00 PM",
              "Thursday": "7:00 AM - 4:00 PM",
              "Friday": "7:00 AM - 4:00 PM",
              "Saturday": "8:00 AM - 4:00 PM",
              "Sunday": "Closed"
            }
          },
          {
            id: 3,
            name: "Brisbane Waste & Recycling Centre",
            address: "456 Recycling Road, Acacia Ridge QLD 4110",
            latitude: -27.5598,
            longitude: 153.0389,
            phone: "(07) 3403 8888",
            city: "Brisbane",
            state: "QLD",
            type: "Recycling Centre",
            acceptedMaterials: ["Recycling", "E-Waste", "Batteries", "Oil", "Paint"],
            openingHours: {
              "Monday": "8:00 AM - 5:00 PM",
              "Tuesday": "8:00 AM - 5:00 PM",
              "Wednesday": "8:00 AM - 5:00 PM",
              "Thursday": "8:00 AM - 5:00 PM",
              "Friday": "8:00 AM - 5:00 PM",
              "Saturday": "8:00 AM - 3:00 PM",
              "Sunday": "Closed"
            }
          },
          {
            id: 4,
            name: "Perth Waste Management Facility",
            address: "789 Disposal St, Balcatta WA 6021",
            latitude: -31.8768,
            longitude: 115.8313,
            phone: "(08) 6558 2000",
            city: "Perth",
            state: "WA",
            type: "Waste Management",
            acceptedMaterials: ["General Waste", "Green Waste", "Construction Waste"],
            openingHours: {
              "Monday": "8:00 AM - 4:00 PM",
              "Tuesday": "8:00 AM - 4:00 PM",
              "Wednesday": "8:00 AM - 4:00 PM",
              "Thursday": "8:00 AM - 4:00 PM",
              "Friday": "8:00 AM - 4:00 PM",
              "Saturday": "9:00 AM - 3:00 PM",
              "Sunday": "Closed"
            }
          },
          {
            id: 5,
            name: "Adelaide Council Tip",
            address: "321 Rubbish Road, Port Adelaide SA 5015",
            latitude: -34.8444,
            longitude: 138.5058,
            phone: "(08) 8203 7203",
            city: "Adelaide",
            state: "SA",
            type: "Council Tip",
            acceptedMaterials: ["General Waste", "Recycling", "Green Waste", "Bulky Items"],
            openingHours: {
              "Monday": "9:00 AM - 4:00 PM",
              "Tuesday": "9:00 AM - 4:00 PM",
              "Wednesday": "9:00 AM - 4:00 PM",
              "Thursday": "9:00 AM - 4:00 PM",
              "Friday": "9:00 AM - 4:00 PM",
              "Saturday": "9:00 AM - 2:00 PM",
              "Sunday": "Closed"
            }
          }
        ];
        
        setAllLocations(sampleLocations);
        
      } finally {
        setIsLoadingData(false);
      }
    };

    loadLocations();
  }, []);

  // Geocode address using Nominatim (free)
  const geocodeAddress = async (address: string) => {
    setIsGeocodingAddress(true);
    setLocationError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=au&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        
        setUserLocation({ lat: latitude, lng: longitude });
        findNearestLocations(latitude, longitude);
      } else {
        setLocationError('Address not found. Please try a different address.');
      }
    } catch (error) {
      setLocationError('Error searching for address. Please try again.');
    } finally {
      setIsGeocodingAddress(false);
    }
  };

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressSearch.trim()) {
      geocodeAddress(addressSearch.trim());
    }
  };

  // Request user's location
  const requestLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        findNearestLocations(latitude, longitude);
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find nearest locations to user
  const findNearestLocations = (userLat: number, userLng: number) => {
    const locationsWithDistance = allLocations
      .filter(location => location.latitude && location.longitude)
      .map(location => ({
        ...location,
        distance: calculateDistance(userLat, userLng, location.latitude, location.longitude)
      }))
      .filter(location => location.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

    setNearestLocations(locationsWithDistance);
  };

const getLocationUrl = (location: Location) => {
  // If location has slug data, use it
  if (location.slug && location.citySlug) {
    return `/${location.citySlug}/${location.slug}`;
  }
  
  // Fallback to generating slugs (for compatibility with old data)
  const citySlug = location.city.toLowerCase().replace(/\s+/g, '-');
  const locationSlug = location.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  return `/${citySlug}/${locationSlug}`;
};


  // Filter locations by state
  const getFilteredLocations = () => {
    let filtered = allLocations;
    
    if (selectedState) {
      filtered = filtered.filter(location => location.state === selectedState);
    }
    
    return userLocation && nearestLocations.length > 0 ? nearestLocations : filtered;
  };

  const filteredLocations = getFilteredLocations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Interactive Map - Find Rubbish Tips Near You | RubbishTips.com.au</title>
        <meta name="description" content="Use our interactive map to find rubbish tips, transfer stations, and recycling centres near your location across Australia." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Rubbish Tips & Recycling Centres Near You
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Use the interactive map below to locate waste disposal facilities across Australia. 
            Search by your location or browse by state to find opening hours, contact details, and accepted materials.
          </p>
          
          {/* Data Loading Status */}
          {isLoadingData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-blue-700">Loading waste facility data...</p>
              </div>
            </div>
          )}

          {/* Data Error Message */}
          {dataError && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700">⚠️ {dataError}</p>
            </div>
          )}
          
          {/* Search Controls */}
          {!isLoadingData && (
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
              <div className="space-y-4">
                
                {/* Mobile: Stack all controls vertically */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {/* Address Search - Mobile */}
                  <form onSubmit={handleAddressSearch} className="flex">
                    <input
                      type="text"
                      placeholder="Enter postcode or address"
                      value={addressSearch}
                      onChange={(e) => setAddressSearch(e.target.value)}
                      className="flex-1 px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      disabled={isGeocodingAddress}
                      className="px-4 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                    >
                      {isGeocodingAddress ? '...' : 'Go'}
                    </button>
                  </form>

                  {/* Use Current Location - Mobile */}
                  <button
                    onClick={requestLocation}
                    disabled={isLoadingLocation}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center text-sm"
                  >
                    {isLoadingLocation ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    )}
                    Use My Location
                  </button>
                </div>

                {/* Desktop: Horizontal layout */}
                <div className="hidden md:grid md:grid-cols-3 gap-4">
                  {/* Address Search - Desktop */}
                  <form onSubmit={handleAddressSearch} className="flex">
                    <input
                      type="text"
                      placeholder="Enter your address or postcode"
                      value={addressSearch}
                      onChange={(e) => setAddressSearch(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={isGeocodingAddress}
                      className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {isGeocodingAddress ? '...' : 'Search'}
                    </button>
                  </form>

                  {/* Use Current Location - Desktop */}
                  <button
                    onClick={requestLocation}
                    disabled={isLoadingLocation}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoadingLocation ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    )}
                    Use My Location
                  </button>

                  {/* State Filter - Desktop */}
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {australianStates.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Radius Control */}
              {userLocation && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
                  <label htmlFor="searchRadius" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Search radius:
                  </label>
                  <select
                    id="searchRadius"
                    value={searchRadius}
                    onChange={(e) => {
                      const newRadius = parseInt(e.target.value);
                      setSearchRadius(newRadius);
                      if (userLocation) {
                        findNearestLocations(userLocation.lat, userLocation.lng);
                      }
                    }}
                    className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm min-w-0"
                  >
                    <option value={10}>10 km</option>
                    <option value={25}>25 km</option>
                    <option value={50}>50 km</option>
                    <option value={100}>100 km</option>
                  </select>
                </div>
              )}

              {/* Error Message */}
              {locationError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{locationError}</p>
                </div>
              )}

              {/* User Location Info */}
              {userLocation && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">
                    📍 Location found! Showing facilities within {searchRadius}km of your location.
                    Found {nearestLocations.length} nearby facilities.
                  </p>
                </div>
              )}

              {/* Data Info */}
              {!isLoadingData && allLocations.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    📊 Showing {filteredLocations.length} of {allLocations.length} waste disposal facilities across Australia.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Map Container */}
        {!isLoadingData && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[600px]">
              <MapComponent
                locations={filteredLocations}
                userLocation={userLocation}
                nearestLocations={nearestLocations}
                getLocationUrl={getLocationUrl}
              />
            </div>
          </div>
        )}

        {/* Location List */}
        {!isLoadingData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {userLocation ? 'Nearby Facilities' : selectedState ? `Facilities in ${australianStates.find(s => s.value === selectedState)?.name}` : 'All Facilities'}
            </h2>
            
            {filteredLocations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No facilities found. Try adjusting your search criteria.</p>
                {allLocations.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Make sure your locations data file is available at <code className="bg-gray-100 px-2 py-1 rounded">/public/data/locations.json</code>
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredLocations.map((location) => (
                  <div key={location.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">{location.name}</h3>
                    <p className="text-sm text-green-600 font-medium mb-2">{location.type}</p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{location.address}</p>
                    {location.phone && (
                      <p className="text-sm text-gray-600 mb-2">📞 {location.phone}</p>
                    )}
                    
{/* Accepted Materials - Mobile Optimized */}
{location.acceptedMaterials && location.acceptedMaterials.length > 0 && (
  <div className="mb-3">
    <p className="text-xs text-gray-500 mb-1">Accepts:</p>
    
    {(() => {
      // Handle both array and pipe-separated string formats
      let materials = Array.isArray(location.acceptedMaterials) 
        ? location.acceptedMaterials 
        : location.acceptedMaterials[0]?.split('|') || [];
      
      // Clean up HTML entities and trim whitespace
      materials = materials.map(material => 
        material.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
      ).filter(material => material.length > 0);

      return (
        <>
          {/* Mobile: Show as compact list */}
          <div className="sm:hidden">
            <div className="text-xs text-gray-700 leading-relaxed">
              {materials.slice(0, 2).join(', ')}
              {materials.length > 2 && (
                <span className="text-gray-500">
                  {' '}+{materials.length - 2} more
                </span>
              )}
            </div>
          </div>
          
          {/* Desktop: Show as badges */}
          <div className="hidden sm:block">
            <div className="flex flex-wrap gap-1">
              {materials.slice(0, 4).map((material, idx) => (
                <span 
                  key={idx} 
                  className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap"
                >
                  {material}
                </span>
              ))}
              {materials.length > 4 && (
                <span className="text-xs text-gray-500 self-center pl-1">
                  +{materials.length - 4} more
                </span>
              )}
            </div>
          </div>
        </>
      );
    })()}
  </div>
)}

                    {location.distance && (
                      <p className="text-sm text-green-600 font-medium mb-3">
                        {location.distance.toFixed(1)} km away
                      </p>
                    )}
                    
                    {/* Mobile-friendly button layout */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={getLocationUrl(location)}
                        className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors text-center flex-1"
                      >
                        View Details
                      </a>
                      {location.phone && (
                        <a
                          href={`tel:${location.phone}`}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors text-center sm:flex-shrink-0"
                        >
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}