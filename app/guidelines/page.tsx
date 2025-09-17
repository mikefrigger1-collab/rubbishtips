// app/guidelines/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Australian Waste Disposal Guidelines",
  description: "Complete guide to waste disposal in Australia. Learn what can be disposed of at rubbish tips, recycling centres, and transfer stations across all states.",
};

export default function GuidelinesPage() {
  const wasteTypes = [
    {
      title: 'General Waste',
      icon: '🗑️',
      description: 'Household rubbish that cannot be recycled',
      accepted: ['Food scraps', 'Dirty packaging', 'Broken ceramics', 'Cigarette butts', 'Pet waste'],
      rejected: ['Recyclables', 'Hazardous materials', 'E-waste', 'Large items'],
      tips: 'Most tips accept general waste in standard garbage bags. Fees typically range from $10-30 per car load.'
    },
    {
      title: 'Green Waste',
      icon: '🌿',
      description: 'Organic garden materials and yard clippings',
      accepted: ['Grass clippings', 'Leaves', 'Small branches', 'Plant trimmings', 'Tree prunings (under 15cm diameter)'],
      rejected: ['Treated timber', 'Plastic pots', 'Soil', 'Rocks', 'Weeds with seeds'],
      tips: 'Green waste is often processed into mulch. Many councils offer free or discounted disposal for residents.'
    },
    {
      title: 'Recycling',
      icon: '♻️',
      description: 'Materials that can be processed into new products',
      accepted: ['Paper & cardboard', 'Glass bottles & jars', 'Aluminium cans', 'Plastic bottles (1-7)', 'Steel cans'],
      rejected: ['Contaminated items', 'Polystyrene', 'Plastic bags', 'Light globes', 'Mirrors'],
      tips: 'Clean items only. Remove lids and caps. Check your local council guidelines for specific requirements.'
    },
    {
      title: 'Electronic Waste (E-Waste)',
      icon: '📱',
      description: 'Electronic devices and computer equipment',
      accepted: ['Computers & laptops', 'Mobile phones', 'TVs & monitors', 'Printers', 'Small appliances'],
      rejected: ['Batteries (separate collection)', 'Fluorescent tubes', 'Large whitegoods', 'Items with fluids'],
      tips: 'Many electronics contain valuable materials. Look for dedicated e-waste collection events in your area.'
    },
    {
      title: 'Hazardous Waste',
      icon: '⚠️',
      description: 'Dangerous materials requiring special handling',
      accepted: ['Paint & solvents', 'Chemicals & pesticides', 'Motor oil', 'Car batteries', 'Gas bottles'],
      rejected: ['Asbestos', 'Medical waste', 'Radioactive materials', 'Explosive items'],
      tips: 'Only take to designated hazardous waste facilities. Never mix different chemicals. Bring in original containers.'
    },
    {
      title: 'Construction & Demolition',
      icon: '🏗️',
      description: 'Building materials and renovation waste',
      accepted: ['Clean concrete', 'Bricks & tiles', 'Clean timber', 'Metal materials', 'Plasterboard'],
      rejected: ['Asbestos materials', 'Contaminated soil', 'Treated timber', 'Insulation with backing'],
      tips: 'Higher fees apply for construction waste. Some materials may be recycled. Check for asbestos before disposal.'
    }
  ];

  const stateFees = [
    { state: 'NSW', carLoad: '$15-25', trailer: '$30-50', greenWaste: '$8-15/m³' },
    { state: 'VIC', carLoad: '$12-20', trailer: '$25-45', greenWaste: '$6-12/m³' },
    { state: 'QLD', carLoad: '$10-18', trailer: '$20-40', greenWaste: '$5-10/m³' },
    { state: 'WA', carLoad: '$14-22', trailer: '$28-48', greenWaste: '$7-14/m³' },
    { state: 'SA', carLoad: '$13-21', trailer: '$26-46', greenWaste: '$6-13/m³' },
    { state: 'TAS', carLoad: '$12-19', trailer: '$24-42', greenWaste: '$5-11/m³' },
    { state: 'ACT', carLoad: '$16-26', trailer: '$32-52', greenWaste: '$8-16/m³' },
    { state: 'NT', carLoad: '$15-23', trailer: '$30-48', greenWaste: '$7-15/m³' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Australian Waste Disposal Guidelines
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Everything you need to know about responsible waste disposal
            </p>
            <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
              Learn what materials are accepted at Australian rubbish tips, transfer stations, 
              and recycling centres. Understand fees, regulations, and best practices for 
              responsible waste disposal across all states and territories.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Waste Types Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Waste Accepted
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different facilities accept different types of waste. Here's what you can 
              dispose of at Australian rubbish tips and recycling centres.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {wasteTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{type.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Accepted Items
                    </h4>
                    <ul className="space-y-1">
                      {type.accepted.map((item, i) => (
                        <li key={i} className="text-gray-700 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Not Accepted
                    </h4>
                    <ul className="space-y-1">
                      {type.rejected.map((item, i) => (
                        <li key={i} className="text-gray-700 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-blue-800 text-sm">{type.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fees Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Typical Disposal Fees by State
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fees vary by location and facility type. These are typical ranges 
              for public rubbish tips and transfer stations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">State/Territory</th>
                    <th className="px-6 py-4 text-left font-semibold">Car Load</th>
                    <th className="px-6 py-4 text-left font-semibold">Trailer Load</th>
                    <th className="px-6 py-4 text-left font-semibold">Green Waste</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stateFees.map((state, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{state.state}</td>
                      <td className="px-6 py-4 text-gray-700">{state.carLoad}</td>
                      <td className="px-6 py-4 text-gray-700">{state.trailer}</td>
                      <td className="px-6 py-4 text-gray-700">{state.greenWaste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <p className="text-sm text-gray-600">
                * Fees are indicative only and vary by council and facility. 
                Contact your local tip for current pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Important Guidelines */}
        <section className="mb-16">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-r-xl">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">
              ⚠️ Important Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-yellow-900 mb-3">Before You Go</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Check opening hours and fees</li>
                  <li>• Separate different waste types</li>
                  <li>• Bring proof of residence if required</li>
                  <li>• Have cash ready (many don't accept cards)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-3">Safety First</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Wear closed shoes and long pants</li>
                  <li>• Secure loads properly for transport</li>
                  <li>• Follow site directions and speed limits</li>
                  <li>• Keep children supervised at all times</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}