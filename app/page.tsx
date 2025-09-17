// app/page.tsx
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Find Rubbish Tips & Recycling Centres Near You",
  description: "Locate rubbish tips, transfer stations, and recycling centres across Australia. Find opening hours, accepted materials, and contact details for waste disposal near you.",
  openGraph: {
    title: "Find Rubbish Tips & Recycling Centres Near You | RubbishTips.com.au",
    description: "Locate rubbish tips, transfer stations, and recycling centres across Australia.",
  },
};

export default async function HomePage() {
  const stats = [
    { number: '2,500+', label: 'Tips & Centres', description: 'Waste disposal locations across Australia' },
    { number: '8', label: 'States & Territories', description: 'Complete Australia-wide coverage' },
    { number: '300+', label: 'Council Areas', description: 'Local government waste services' },
    { number: '24/7', label: 'Online Access', description: 'Find tips anytime, anywhere' }
  ];

  const wasteTypes = [
    {
      title: 'General Waste',
      description: 'Household rubbish and non-recyclable materials',
      icon: '🗑️'
    },
    {
      title: 'Green Waste',
      description: 'Garden clippings, branches, and organic materials',
      icon: '🌿'
    },
    {
      title: 'Recycling',
      description: 'Paper, plastic, glass, and metal recycling',
      icon: '♻️'
    },
    {
      title: 'E-Waste',
      description: 'Electronic devices and computer equipment',
      icon: '📱'
    },
    {
      title: 'Hazardous Waste',
      description: 'Paint, chemicals, and dangerous materials',
      icon: '⚠️'
    },
    {
      title: 'Bulky Items',
      description: 'Furniture, appliances, and large items',
      icon: '🛋️'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Rubbish Tips & Recycling Centres Across Australia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Your complete guide to waste disposal and recycling locations
            </p>
            <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto mb-8">
              Discover over 2,500 rubbish tips, transfer stations, and recycling centres 
              across all Australian states and territories. Get opening hours, contact 
              details, and accepted materials for responsible waste disposal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/map" 
                className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                Find Tips Near Me
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Can You Dispose Of?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different tips and recycling centres accept different types of waste. 
              Find the right location for your specific disposal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Dispose of Your Waste Responsibly?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Use our interactive map to find the nearest rubbish tip or recycling centre, 
            complete with opening hours and accepted materials.
          </p>
          <Link 
            href="/map" 
            className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            Search Tips & Centres
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}