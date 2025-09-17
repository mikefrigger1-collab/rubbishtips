// app/about/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "About RubbishTips.com.au - Australia's Waste Disposal Directory",
  description: "Learn about our mission to help Australians find rubbish tips, transfer stations, and recycling centres. Discover how we're making waste disposal easier across Australia.",
};

export default function AboutPage() {
  const stats = [
    { number: '2,500+', label: 'Verified Locations', description: 'Tips and centres across Australia' },
    { number: '8', label: 'States & Territories', description: 'Complete Australian coverage' },
    { number: '300+', label: 'Council Areas', description: 'Local government partnerships' },
    { number: '2021', label: 'Established', description: 'Years of trusted service' }
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'Making waste disposal information simple and accessible for all Australians, regardless of location or technical expertise.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      )
    },
    {
      title: 'Accuracy',
      description: 'Providing verified, up-to-date information about legitimate waste disposal facilities and their current operating conditions.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    },
    {
      title: 'Environmental Impact',
      description: 'Supporting responsible waste disposal practices that protect Australian environments and promote recycling initiatives.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Community Support',
      description: 'Building stronger communities by making it easier for residents to maintain clean, healthy local environments.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      )
    }
  ];

  const milestones = [
    {
      year: '2021',
      title: 'RubbishTips.com.au Launched',
      description: 'Started with a simple mission: make waste disposal easier for Australians by providing comprehensive facility information.'
    },
    {
      year: '2022',
      title: 'Expanded Coverage',
      description: 'Added comprehensive listings for all capital cities and major regional centres across Australia.'
    },
    {
      year: '2023',
      title: 'Interactive Features',
      description: 'Launched interactive map functionality and mobile-optimised design for better user experience.'
    },
    {
      year: '2024',
      title: 'Community Partnerships',
      description: 'Established partnerships with local councils and waste management authorities for verified information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About RubbishTips.com.au
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Australia's most comprehensive waste disposal directory
            </p>
            <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
              Since 2021, we've been dedicated to helping Australians dispose of waste responsibly 
              by connecting them with verified rubbish tips, transfer stations, and recycling centres 
              across all states and territories.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <section className="py-16 bg-white rounded-xl shadow-lg mb-16">
          <div className="container mx-auto px-8">
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

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To make waste disposal simple, accessible, and environmentally responsible for all Australians 
                by providing comprehensive, accurate information about rubbish tips, transfer stations, and 
                recycling centres across the country.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Exist</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Australia generates millions of tonnes of waste annually, yet finding the right disposal 
                facility can be frustrating and time-consuming. Many Australians struggle to locate their 
                nearest tip, understand what materials are accepted, or know the associated costs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We bridge this gap by providing a centralised, easy-to-use platform that connects residents 
                with their local waste disposal options, promoting responsible environmental practices and 
                supporting cleaner communities across Australia.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at RubbishTips.com.au
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-green-600">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in building Australia's most comprehensive waste disposal directory
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8 bg-white rounded-xl p-8 shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-green-700 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Have questions about waste disposal or want to suggest improvements to our service? 
            We'd love to hear from you.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors inline-block"
          >
            Contact Us
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}