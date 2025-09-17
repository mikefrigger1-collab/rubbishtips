// app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">RT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">RubbishTips</span>
              <span className="text-sm text-gray-600 hidden sm:block">.com.au</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/map" className="text-gray-700 hover:text-green-600 font-medium">
              Find Tips
            </Link>
            
            {/* Capital Cities Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-green-600 font-medium flex items-center">
                Capital Cities
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    Find Tips & Centres
                  </div>
                  {capitalCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      <span>{city.name}</span>
                      <span className="text-xs text-gray-500">{city.state}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/guidelines" className="text-gray-700 hover:text-green-600 font-medium">
              Guidelines
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/map" 
                className="text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Tips
              </Link>
              
              <div className="border-l-2 border-green-600 pl-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Capital Cities</p>
                <div className="grid grid-cols-2 gap-3">
                  {capitalCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="flex flex-col text-sm text-gray-600 hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-medium">{city.name}</span>
                      <span className="text-xs text-gray-500">{city.state}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/guidelines" 
                className="text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Guidelines
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}