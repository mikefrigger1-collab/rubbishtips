// app/[city]/[location]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AutoAds from '../../components/AutoAds';

// This would normally come from your locations JSON file
interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  city: string;
  state: string;
  type: string;
  acceptedMaterials: string[];
  openingHours: Record<string, string>;
  fees?: Record<string, string>;
  description?: string;
  content?: string;
  facilities?: string[];
  restrictions?: string[];
  paymentMethods?: string[];
}

interface Props {
  params: { 
    city: string;
    location: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await getLocationBySlug(params.city, params.location);
  
  if (!location) {
    return { title: 'Location Not Found' };
  }

  const cityName = location.city;
  const stateName = location.state;

  return {
    title: `${location.name} - ${cityName} ${stateName} | Opening Hours, Fees & Contact Details`,
    description: `Complete guide to ${location.name} in ${cityName}. Find opening hours, fees, accepted materials, contact details and directions for this ${location.type.toLowerCase()} facility.`,
    keywords: [
      `${location.name}`,
      `${cityName} rubbish tip`,
      `${cityName} ${location.type.toLowerCase()}`,
      `${location.name} opening hours`,
      `${location.name} fees`,
      `${stateName} waste disposal`
    ],
  };
}

export default async function LocationPage({ params }: Props) {
  const location = await getLocationBySlug(params.city, params.location);
  
  if (!location) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: location.city, href: `/${params.city}` },
    { name: location.name, href: null }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AutoAds />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-green-600 hover:text-green-700">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-gray-700 font-medium">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {location.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-green-100">
                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {location.type}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location.city}, {location.state}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href={`/map?location=${location.id}`}
                  className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  View on Map
                </Link>
                {location.phone && (
                  <a 
                    href={`tel:${location.phone}`}
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors text-center"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Key Information */}
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Address
                  </h3>
                  <p className="text-gray-700 mb-2">{location.address}</p>
                  <a 
                    href={`https://maps.google.com?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Get Directions →
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Details
                  </h3>
                  {location.phone && (
                    <p className="text-gray-700 mb-1">
                      Phone: <a href={`tel:${location.phone}`} className="text-green-600 hover:text-green-700">{location.phone}</a>
                    </p>
                  )}
                  {location.email && (
                    <p className="text-gray-700 mb-1">
                      Email: <a href={`mailto:${location.email}`} className="text-green-600 hover:text-green-700">{location.email}</a>
                    </p>
                  )}
                  {location.website && (
                    <p className="text-gray-700">
                      Website: <a href={location.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">Visit Site</a>
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Opening Hours */}
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(location.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{day}</span>
                    <span className={`font-medium ${hours.toLowerCase().includes('closed') ? 'text-red-600' : 'text-green-600'}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Opening hours may vary during public holidays. Please call ahead to confirm before visiting.
                </p>
              </div>
            </section>

            {/* Accepted Materials */}
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Accepted Materials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    We Accept
                  </h3>
                  <div className="space-y-2">
                    {location.acceptedMaterials.map((material, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {location.restrictions && location.restrictions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Not Accepted
                    </h3>
                    <div className="space-y-2">
                      {location.restrictions.map((restriction, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Fees */}
            {location.fees && Object.keys(location.fees).length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Disposal Fees</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(location.fees).map(([item, fee]) => (
                        <tr key={item}>
                          <td className="px-4 py-3 text-gray-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{fee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>* Fees are subject to change. Please contact the facility for current pricing.</p>
                </div>
              </section>
            )}

            {/* Description */}
            {location.description && (
              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Facility</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
  {location.content || location.description || 'No description available.'}
</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    href={`/map?location=${location.id}`}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center block font-medium"
                  >
                    View on Interactive Map
                  </Link>
                  
                  {location.phone && (
                    <a 
                      href={`tel:${location.phone}`}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
                    >
                      Call {location.phone}
                    </a>
                  )}
                  
                  <a 
                    href={`https://maps.google.com?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center block font-medium"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Facilities */}
              {location.facilities && location.facilities.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Available Facilities</h3>
                  <ul className="space-y-2">
                    {location.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Payment Methods */}
              {location.paymentMethods && location.paymentMethods.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h3>
                  <div className="space-y-2">
                    {location.paymentMethods.map((method, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Locations */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Other {location.city} Locations</h3>
                <Link 
                  href={`/${params.city}`}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  View All {location.city} Facilities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Step 4: Replace the getLocationBySlug function in your [city]/[location]/page.tsx file
// Find the existing getLocationBySlug function and replace it with this:

// This function loads location data from your JSON file
async function getLocationBySlug(citySlug: string, locationSlug: string): Promise<Location | null> {
  try {
    // Load the locations data
    const fs = require('fs');
    const path = require('path');
    
    const jsonPath = path.join(process.cwd(), 'public/data/locations.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);
    
    // Find the matching location
    for (const city of data.cities) {
      if (city.slug === citySlug) {
        for (const location of city.locations) {
          if (location.slug === locationSlug) {
            // Transform the data to match our Location interface
            return {
              id: location.id.toString(),
              name: location.name,
              slug: location.slug,
              address: location.address,
              latitude: location.latitude,
              longitude: location.longitude,
              phone: location.phone || undefined,
              email: undefined, // Add if available in your data
              website: undefined, // Add if available in your data
              city: location.city,
              state: location.state,
              type: location.type,
              acceptedMaterials: location.acceptedMaterials || [],
              openingHours: typeof location.openingHours === 'string' 
                ? parseOpeningHours(location.openingHours)
                : (location.openingHours || {}),
              fees: location.fees || undefined,
              description: location.description || undefined,
              facilities: undefined, // Add if available in your data
              restrictions: undefined, // Add if available in your data  
              paymentMethods: undefined // Add if available in your data
            };
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error loading location:', error);
    return null;
  }
}

// Helper function to parse opening hours string into object
function parseOpeningHours(hoursString: string): Record<string, string> {
  // If it's already an object, return as is
  if (typeof hoursString === 'object') return hoursString;
  
  // Simple parsing - you can make this more sophisticated
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours: Record<string, string> = {};
  
  // Default all days to the hours string for now
  // You can implement more sophisticated parsing based on your data format
  days.forEach(day => {
    hours[day] = hoursString;
  });
  
  return hours;
}

// Also update the generateStaticParams function to load from real data:
export async function generateStaticParams() {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const jsonPath = path.join(process.cwd(), 'public/data/locations.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);
    
    // Return the staticParams that were generated by your CSV converter
    return data.staticParams || [];
  } catch (error) {
    console.error('Error loading static params:', error);
    return [];
  }
}