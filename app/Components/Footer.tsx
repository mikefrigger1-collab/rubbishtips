// app/components/Footer.tsx
'use client';

import Link from 'next/link';

interface FooterProps {
  allLocations?: any[];
  states?: any[];
}

export default function Footer({ allLocations = [], states = [] }: FooterProps) {
  const australianStates = [
    { name: 'New South Wales', slug: 'nsw' },
    { name: 'Victoria', slug: 'vic' },
    { name: 'Queensland', slug: 'qld' },
    { name: 'Western Australia', slug: 'wa' },
    { name: 'South Australia', slug: 'sa' },
    { name: 'Tasmania', slug: 'tas' },
    { name: 'Australian Capital Territory', slug: 'act' },
    { name: 'Northern Territory', slug: 'nt' }
  ];

  const capitalCities = [
    { name: 'Sydney', slug: 'sydney', state: 'NSW' },
    { name: 'Melbourne', slug: 'melbourne', state: 'VIC' },
    { name: 'Brisbane', slug: 'brisbane', state: 'QLD' },
    { name: 'Perth', slug: 'perth', state: 'WA' },
    { name: 'Adelaide', slug: 'adelaide', state: 'SA' },
    { name: 'Hobart', slug: 'hobart', state: 'TAS' },
    { name: 'Canberra', slug: 'canberra', state: 'ACT' },
    { name: 'Darwin', slug: 'darwin', state: 'NT' }
  ];

  const quickLinks = [
    { name: 'Find Tips Near Me', href: '/map' },
    { name: 'Waste Disposal Guidelines', href: '/guidelines' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
<div className="mb-6">
  <img 
    src="/rubbish-tips-icon.png" 
    alt="RubbishTips.com.au Logo"
    className="h-30 w-auto"
  />
</div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Australia's most comprehensive directory of rubbish tips, transfer stations, 
              and recycling centres. Find waste disposal locations near you across all 
              states and territories.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Capital Cities */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Capital Cities</h3>
            <ul className="space-y-3">
              {capitalCities.map((city, index) => (
                <li key={index}>
                  <Link 
                    href={`/${city.slug}`}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {city.name}
                    <span className="text-gray-500 ml-1">({city.state})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6">Find Rubbish Tips by City</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {capitalCities.map((city) => (
              <div key={city.slug} className="text-center">
                <Link 
                  href={`/${city.slug}`}
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="text-lg font-semibold text-green-400 mb-1">{city.name}</div>
                  <div className="text-xs text-gray-400">{city.state}</div>
                  <div className="text-xs text-gray-500 mt-1">Tips & Centres</div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Site Stats */}
        {(allLocations.length > 0 || states.length > 0) && (
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {allLocations.length > 0 ? allLocations.length.toLocaleString() : '2,500+'}
                </div>
                <div className="text-sm text-gray-400">Tips & Centres</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {states.length > 0 ? states.length : '8'}
                </div>
                <div className="text-sm text-gray-400">States & Territories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">300+</div>
                <div className="text-sm text-gray-400">Council Areas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Online Access</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} RubbishTips.com.au. All rights reserved. 
              <span className="hidden md:inline"> | Helping Australians dispose of waste responsibly.</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                Contact
              </Link>
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-green-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Environmental Message */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              🌱 Together, we're helping reduce Australia's environmental impact through responsible waste disposal. 
              Every tip visit counts towards a cleaner, greener future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}