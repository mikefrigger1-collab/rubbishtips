// app/[city]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Complete city data for all Australian capitals
const CITIES = {
  sydney: {
    name: 'Sydney',
    state: 'NSW',
    slug: 'sydney',
    description: 'Find rubbish tips, transfer stations, and recycling centres in Sydney and surrounding areas.',
    population: '5.3 million',
    councils: ['City of Sydney', 'Parramatta', 'Blacktown', 'Liverpool', 'Canterbury-Bankstown', 'Penrith', 'Fairfield', 'Campbelltown'],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    suburbs: ['CBD', 'Parramatta', 'Blacktown', 'Liverpool', 'Penrith', 'Campbelltown', 'Bankstown', 'Fairfield']
  },
  melbourne: {
    name: 'Melbourne',
    state: 'VIC',
    slug: 'melbourne',
    description: 'Locate waste disposal facilities and recycling centres across Melbourne metropolitan area.',
    population: '5.2 million',
    councils: ['Melbourne', 'Yarra', 'Darebin', 'Moreland', 'Banyule', 'Boroondara', 'Stonnington', 'Port Phillip'],
    coordinates: { lat: -37.8136, lng: 144.9631 },
    suburbs: ['CBD', 'Richmond', 'Preston', 'Brunswick', 'Footscray', 'St Kilda', 'Toorak', 'Frankston']
  },
  brisbane: {
    name: 'Brisbane',
    state: 'QLD',
    slug: 'brisbane',
    description: 'Discover rubbish tips and recycling centres throughout Brisbane and South East Queensland.',
    population: '2.6 million',
    councils: ['Brisbane City', 'Logan', 'Ipswich', 'Redland', 'Moreton Bay', 'Gold Coast', 'Sunshine Coast'],
    coordinates: { lat: -27.4698, lng: 153.0251 },
    suburbs: ['CBD', 'South Bank', 'Fortitude Valley', 'Logan', 'Ipswich', 'Redcliffe', 'Caboolture']
  },
  perth: {
    name: 'Perth',
    state: 'WA',
    slug: 'perth',
    description: 'Find waste disposal locations and recycling facilities across Perth metropolitan region.',
    population: '2.1 million',
    councils: ['Perth', 'Fremantle', 'Joondalup', 'Wanneroo', 'Stirling', 'Swan', 'Rockingham', 'Mandurah'],
    coordinates: { lat: -31.9505, lng: 115.8605 },
    suburbs: ['CBD', 'Fremantle', 'Joondalup', 'Rockingham', 'Mandurah', 'Midland', 'Armadale']
  },
  adelaide: {
    name: 'Adelaide',
    state: 'SA',
    slug: 'adelaide',
    description: 'Locate rubbish tips and waste management facilities throughout Adelaide and surrounds.',
    population: '1.4 million',
    councils: ['Adelaide', 'Port Adelaide Enfield', 'Charles Sturt', 'West Torrens', 'Marion', 'Holdfast Bay'],
    coordinates: { lat: -34.9285, lng: 138.6007 },
    suburbs: ['CBD', 'Port Adelaide', 'Glenelg', 'Mount Gambier', 'Whyalla', 'Murray Bridge']
  },
  hobart: {
    name: 'Hobart',
    state: 'TAS',
    slug: 'hobart',
    description: 'Find waste disposal and recycling services in Hobart and across Tasmania.',
    population: '240,000',
    councils: ['Hobart', 'Clarence', 'Glenorchy', 'Kingborough', 'Brighton', 'Sorell'],
    coordinates: { lat: -42.8821, lng: 147.3272 },
    suburbs: ['CBD', 'Battery Point', 'Sandy Bay', 'Glenorchy', 'Kingston', 'New Town']
  },
  canberra: {
    name: 'Canberra',
    state: 'ACT',
    slug: 'canberra',
    description: 'Discover rubbish tips and recycling centres throughout the Australian Capital Territory.',
    population: '460,000',
    councils: ['ACT Government'],
    coordinates: { lat: -35.2809, lng: 149.1300 },
    suburbs: ['City', 'Belconnen', 'Woden', 'Tuggeranong', 'Gungahlin', 'Queanbeyan']
  },
  darwin: {
    name: 'Darwin',
    state: 'NT',
    slug: 'darwin',
    description: 'Find waste disposal facilities and tips in Darwin and across the Northern Territory.',
    population: '150,000',
    councils: ['Darwin', 'Palmerston', 'Litchfield'],
    coordinates: { lat: -12.4634, lng: 130.8456 },
    suburbs: ['CBD', 'Palmerston', 'Casuarina', 'Katherine', 'Alice Springs', 'Nhulunbuy']
  }
};

const WASTE_TYPES = [
  {
    title: 'General Waste',
    description: 'Household rubbish and non-recyclable materials',
    icon: '🗑️',
    searchParam: 'general'
  },
  {
    title: 'Recycling',
    description: 'Paper, plastic, glass, and metal recycling',
    icon: '♻️',
    searchParam: 'recycling'
  },
  {
    title: 'Green Waste',
    description: 'Garden clippings, branches, and organic materials',
    icon: '🌿',
    searchParam: 'green'
  },
  {
    title: 'E-Waste',
    description: 'Electronic devices and computer equipment',
    icon: '📱',
    searchParam: 'ewaste'
  },
  {
    title: 'Hazardous Waste',
    description: 'Paint, chemicals, and dangerous materials',
    icon: '⚠️',
    searchParam: 'hazardous'
  },
  {
    title: 'Bulky Items',
    description: 'Furniture, appliances, and large items',
    icon: '🛋️',
    searchParam: 'bulky'
  }
];

interface Props {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = CITIES[params.city as keyof typeof CITIES];
  
  if (!city) {
    return { title: 'City Not Found' };
  }

  return {
    title: `Rubbish Tips & Recycling Centres in ${city.name}, ${city.state}`,
    description: `Find rubbish tips, transfer stations, and recycling centres in ${city.name}. Opening hours, fees, accepted materials, and locations across ${city.name} metropolitan area.`,
    keywords: [`${city.name} rubbish tips`, `${city.name} recycling centres`, `${city.name} waste disposal`, `${city.state} tips`, `${city.name} transfer stations`],
  };
}

export default async function CityPage({ params }: Props) {
  const city = CITIES[params.city as keyof typeof CITIES];
  
  if (!city) {
    notFound();
  }

  // Simulate loading locations data - in production this would fetch from your JSON
  const locations = await getLocationsByCity(city.slug);
  
  const stats = {
    totalTips: locations.length,
    councils: city.councils.length,
    recyclingCentres: locations.filter(l => l.type?.includes('Recycling')).length,
    transferStations: locations.filter(l => l.type?.includes('Transfer')).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rubbish Tips & Recycling Centres in {city.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              {city.description}
            </p>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/map" 
                className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors inline-block"
              >
                View Interactive Map
              </Link>
              <a 
                href="#locations" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-800 transition-colors inline-block"
              >
                Browse All Locations
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalTips}</div>
                <div className="text-sm text-green-100">Total Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.councils}</div>
                <div className="text-sm text-green-100">Council Areas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.recyclingCentres}</div>
                <div className="text-sm text-green-100">Recycling Centres</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.transferStations}</div>
                <div className="text-sm text-green-100">Transfer Stations</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        
        {/* Location-Specific SEO Content */}
        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {getCitySpecificContent(city).title}
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              {getCitySpecificContent(city).content.map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Major {city.name} Waste Facilities
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {getCitySpecificContent(city).majorFacilities.map((facility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {city.name} Recycling Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {getCitySpecificContent(city).recyclingServices.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href={`/map?city=${city.slug}`}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block font-semibold"
              >
                View All {city.name} Facilities on Map
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section id="locations" className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Locations in {city.name}
            </h2>
            <Link 
              href={`/map?city=${city.slug}`}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              View All on Map
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 12).map((location, index) => (
              <div key={location.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{location.name}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                    {location.type}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{location.address}</p>
                
                {location.phone && (
                  <p className="text-gray-600 text-sm mb-3">📞 {location.phone}</p>
                )}

                {/* Accepted Materials */}
                {location.acceptedMaterials && location.acceptedMaterials.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Accepts:</p>
                    <div className="flex flex-wrap gap-1">
                      {location.acceptedMaterials.slice(0, 3).map((material, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {material}
                        </span>
                      ))}
                      {location.acceptedMaterials.length > 3 && (
                        <span className="text-xs text-gray-500">+{location.acceptedMaterials.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/map?location=${location.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors flex-1 text-center"
                  >
                    View on Map
                  </Link>
                  {location.phone && (
                    <a
                      href={`tel:${location.phone}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {locations.length > 12 && (
            <div className="text-center mt-8">
              <Link 
                href={`/map?city=${city.slug}`}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-block"
              >
                View All {locations.length} Locations on Map
              </Link>
            </div>
          )}
        </section>
        
        {/* Local Information */}
        <section className="mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Waste Disposal in {city.name} - What You Need to Know
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Operating Hours</h3>
                <p className="text-gray-700 mb-4">
                  Most {city.name} rubbish tips operate Monday to Saturday, with limited Sunday hours. 
                  Always check specific facility hours before visiting.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Typical Fees</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Car load: $12-25</li>
                  <li>• Trailer load: $25-50</li>
                  <li>• Green waste: Often free or low cost</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Bring</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Proof of residency (rates notice)</li>
                  <li>• Cash for fees</li>
                  <li>• Safety equipment (gloves, closed shoes)</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4">Before You Go</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Sort materials by type</li>
                  <li>• Check facility accepts your waste</li>
                  <li>• Secure your load properly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-green-700 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Nearest Tip?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Use our interactive map to locate the closest rubbish tip or recycling centre 
            in {city.name}, complete with directions and facility details.
          </p>
          <Link 
            href={`/map?city=${city.slug}`}
            className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors inline-block"
          >
            Open Interactive Map
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all cities
export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({
    city: city,
  }));
}

// City-specific SEO content
function getCitySpecificContent(city: any) {
  const contentMap = {
    sydney: {
      title: "Sydney Waste Management & Recycling Services",
      content: [
        "Sydney, Australia's largest city with over 5.3 million residents, generates approximately 6.8 million tonnes of waste annually. The city's comprehensive waste management system includes over 50 transfer stations, resource recovery parks, and recycling centres across the Greater Sydney region.",
        "From the Eastern Creek Resource Recovery Park to smaller suburban transfer stations, Sydney offers extensive waste disposal options for residents and businesses. Major facilities like Kemps Creek and Lucas Heights serve hundreds of thousands of residents across western and southern Sydney respectively.",
        "The NSW Government's Waste Less, Recycle More initiative has significantly improved recycling rates across Sydney, with the city now diverting over 70% of waste from landfills through advanced sorting and processing facilities."
      ],
      majorFacilities: [
        "Eastern Creek Resource Recovery Park - Western Sydney's largest facility",
        "Kemps Creek Resource Recovery Park - Serves southwestern suburbs", 
        "Lucas Heights Resource Recovery Park - Southern Sydney coverage",
        "Belrose Resource Recovery Centre - Northern beaches area",
        "Thornleigh Resource Recovery Park - Upper north shore"
      ],
      recyclingServices: [
        "Container Deposit Scheme locations throughout metropolitan area",
        "Household chemical collection days in all council areas",
        "E-waste drop-off points at major shopping centres",
        "Community recycling centres for batteries and mobile phones",
        "Textile recycling programs in partnership with local councils"
      ]
    },
    melbourne: {
      title: "Melbourne Metropolitan Waste Disposal Network",
      content: [
        "Melbourne's 5.2 million residents are served by an extensive network of transfer stations and recycling facilities across the metropolitan area. The city processes over 5 million tonnes of waste annually through state-of-the-art facilities.",
        "Victoria's waste management infrastructure includes major facilities in Tullamarine, Werribee, and Dandenong, providing comprehensive coverage for all metropolitan councils from Mornington Peninsula to Whittlesea.",
        "Melbourne leads Australia in waste innovation, with several facilities incorporating advanced sorting technologies and resource recovery systems that achieve some of the highest diversion rates in the country."
      ],
      majorFacilities: [
        "Melbourne Regional Waste Centre Tullamarine - Northern suburbs",
        "Werribee Resource Recovery Centre - Western Melbourne",
        "Dandenong Transfer Station - South-eastern coverage",
        "Bayswater Transfer Station - Eastern suburbs",
        "Clayton Transfer Station - Inner southeastern suburbs"
      ],
      recyclingServices: [
        "REDcycle plastic bag recycling at Coles and Woolworths",
        "Mobile Muster phone recycling at Australia Post outlets",
        "Paint recycling through Paintback program locations",
        "Battery recycling bins at Bunnings and council offices",
        "Mattress recycling services at selected transfer stations"
      ]
    },
    brisbane: {
      title: "Brisbane and South East Queensland Waste Services",
      content: [
        "Brisbane City Council operates one of Australia's most comprehensive waste management systems, serving 2.6 million residents across the greater Brisbane area. The city's resource recovery approach has transformed waste handling across Southeast Queensland.",
        "Major facilities include the Rochedale and Willawong Resource Recovery Centres, which together process hundreds of thousands of tonnes of waste annually. These facilities incorporate advanced sorting and processing technology.",
        "Queensland's container refund scheme has significantly boosted recycling rates, with Brisbane leading the state in participation. The city's green waste processing facilities produce high-quality compost used throughout the region."
      ],
      majorFacilities: [
        "Rochedale Resource Recovery Centre - Southern Brisbane",
        "Willawong Resource Recovery Centre - Southwestern suburbs",
        "Nudgee Transfer Station - Northern Brisbane",
        "Chandler Transfer Station - Eastern suburbs", 
        "Ferny Grove Transfer Station - Northwestern areas"
      ],
      recyclingServices: [
        "Containers for Change refund points across the city",
        "Household hazardous waste collection events",
        "Free mulch from green waste processing facilities",
        "E-waste collection at council customer service centres",
        "Bulky waste collection service for residents"
      ]
    },
    perth: {
      title: "Perth Metropolitan Waste Management Facilities",
      content: [
        "Perth's 2.1 million residents have access to modern waste disposal and recycling facilities across the metropolitan area. Western Australia's waste management infrastructure has undergone significant modernization in recent years.",
        "The Perth region benefits from strategically located facilities including Balcatta, Jandakot, and Mundijong, ensuring all areas from Joondalup to Mandurah have convenient access to waste disposal services.",
        "WA's waste avoidance and resource recovery strategy has driven innovation in Perth's facilities, with several incorporating energy recovery and advanced recycling technologies."
      ],
      majorFacilities: [
        "Balcatta Recycling Centre - Northern suburbs coverage",
        "Jandakot Resource Recovery Facility - Southern Perth",
        "Mundijong Waste Facility - Outer southeastern areas",
        "Wanneroo Transfer Station - Northern metropolitan area",
        "Henderson Waste Recovery Park - Coastal southern suburbs"
      ],
      recyclingServices: [
        "Containers for Change collection points throughout Perth",
        "Household battery collection at participating retailers",
        "Motor oil recycling at automotive service centres",
        "Paint recycling through Paintback authorized sites",
        "Mattress and furniture recycling programs"
      ]
    },
    adelaide: {
      title: "Adelaide Metropolitan Waste and Recycling Centers",
      content: [
        "Adelaide's 1.4 million residents are served by an efficient network of waste management facilities across the metropolitan area. South Australia leads the nation in many waste diversion initiatives, with Adelaide facilities at the forefront of innovation.",
        "The city's transfer stations and recycling centres, including major facilities in Wingfield, Edinburgh, and McLaren Vale, provide comprehensive coverage from the Adelaide Hills to the coastal suburbs.",
        "Adelaide's waste management system benefits from South Australia's progressive container deposit scheme and ban on single-use plastics, creating higher quality recycling streams."
      ],
      majorFacilities: [
        "Wingfield Waste Management Centre - Northern Adelaide",
        "Edinburgh Transfer Station - Outer northern suburbs",
        "McLaren Vale Waste Depot - Southern regions",
        "Port Adelaide Resource Recovery - Coastal areas",
        "Mitcham Hills Recycling Centre - Eastern suburbs"
      ],
      recyclingServices: [
        "SA container deposit scheme collection points",
        "Household chemical collection services",
        "Electronic waste drop-off at council depots",
        "Green waste processing into premium compost",
        "Textile recycling bins at shopping centres"
      ]
    },
    hobart: {
      title: "Hobart and Tasmania Waste Disposal Services",
      content: [
        "Hobart and greater Tasmania's 240,000 residents have access to well-managed waste facilities that serve the island's unique needs. Tasmania's compact size allows for efficient waste transport and processing systems.",
        "The Hobart region's facilities include the major McRobies Gully landfill and several transfer stations that serve both urban and rural communities across the southern region of the state.",
        "Tasmania's focus on environmental protection has led to innovative waste management practices, with Hobart facilities incorporating advanced environmental monitoring and resource recovery systems."
      ],
      majorFacilities: [
        "McRobies Gully Waste Management Centre - Main Hobart facility",
        "Clarence Transfer Station - Eastern shore coverage",
        "Glenorchy Waste Transfer Station - Northern suburbs",
        "Kingston Recycling Centre - Southern region",
        "Brighton Transfer Station - Coal River Valley area"
      ],
      recyclingServices: [
        "Island-wide container refund scheme participation",
        "Household hazardous waste collection programs",
        "E-waste recycling through local retailers",
        "Green waste processing for community compost",
        "Regional collection services for rural areas"
      ]
    },
    canberra: {
      title: "Canberra ACT Waste and Resource Recovery",
      content: [
        "The Australian Capital Territory's 460,000 residents benefit from some of Australia's most advanced waste management facilities. Canberra's compact urban design allows for efficient waste collection and processing systems.",
        "ACT's waste management is centered around the Hume Resource Recovery Estate and Mugga Lane Resource Recovery Centre, both incorporating cutting-edge technology for waste processing and resource recovery.",
        "As the national capital, Canberra leads by example in waste innovation, achieving some of Australia's highest waste diversion rates and pioneering new recycling technologies."
      ],
      majorFacilities: [
        "Hume Resource Recovery Estate - Major processing facility",
        "Mugga Lane Resource Recovery Centre - Southern Canberra",
        "Belconnen Transfer Station - Northwestern suburbs",
        "Woden Transfer Station - Southern districts",
        "Tuggeranong Recycling Centre - Far southern suburbs"
      ],
      recyclingServices: [
        "ACT container deposit scheme locations",
        "Household chemical collection at transfer stations",
        "E-waste recycling through government programs",
        "Organic waste processing for soil improvement",
        "Regional services for surrounding NSW communities"
      ]
    },
    darwin: {
      title: "Darwin and Northern Territory Waste Management",
      content: [
        "Darwin's 150,000 residents and the broader Northern Territory community are served by specialized waste facilities designed for the tropical climate and remote location challenges unique to the region.",
        "The Territory's waste management system includes the Shoal Bay Waste Management Facility and several transfer stations that serve both urban Darwin and remote communities across the vast territory.",
        "Northern Territory's waste management faces unique challenges including extreme weather, remote locations, and Indigenous community needs, leading to innovative and resilient facility designs."
      ],
      majorFacilities: [
        "Shoal Bay Waste Management Facility - Main Darwin facility",
        "Palmerston Transfer Station - Satellite city coverage",
        "Casuarina Recycling Centre - Northern suburbs",
        "Katherine Waste Management Centre - Regional facility",
        "Alice Springs Waste Transfer Station - Central Australia"
      ],
      recyclingServices: [
        "Territory-wide container deposit scheme",
        "Remote area waste collection services",
        "Hazardous waste management for mining communities",
        "Indigenous community waste programs",
        "Specialised tropical waste processing systems"
      ]
    }
  };

  return contentMap[city.slug as keyof typeof contentMap] || contentMap.sydney;
}

// Simulated data fetching function
async function getLocationsByCity(citySlug: string) {
  // In production, this would filter your JSON data by city
  const mockLocations = [
    {
      id: 1,
      name: "Eastern Creek Resource Recovery Park",
      address: "Rooty Hill Road South, Eastern Creek NSW 2766",
      phone: "(02) 9833 8300",
      type: "Resource Recovery",
      acceptedMaterials: ["General Waste", "Green Waste", "Construction Waste", "Metal", "E-Waste"]
    },
    {
      id: 2,
      name: "Kemps Creek Resource Recovery Park",
      address: "1854 Elizabeth Drive, Kemps Creek NSW 2178",
      phone: "(02) 9714 7111",
      type: "Transfer Station",
      acceptedMaterials: ["General Waste", "Green Waste", "Recycling"]
    },
    {
      id: 3,
      name: "Lucas Heights Resource Recovery Park",
      address: "New Illawarra Road, Lucas Heights NSW 2234",
      phone: "(02) 9710 0300",
      type: "Resource Recovery",
      acceptedMaterials: ["General Waste", "Recycling", "E-Waste", "Hazardous Waste"]
    },
    {
      id: 4,
      name: "Belrose Resource Recovery Centre",
      address: "Jackson Road, Belrose NSW 2085",
      phone: "(02) 9450 8100",
      type: "Recycling Centre",
      acceptedMaterials: ["Recycling", "Green Waste", "Bulky Items"]
    },
    {
      id: 5,
      name: "Thornleigh Resource Recovery Park", 
      address: "Pennant Hills Road, Thornleigh NSW 2120",
      phone: "(02) 9847 6666",
      type: "Transfer Station",
      acceptedMaterials: ["General Waste", "Green Waste", "Construction Waste"]
    },
    {
      id: 6,
      name: "Chullora Resource Recovery Park",
      address: "Rookwood Road, Chullora NSW 2190", 
      phone: "(02) 9644 7000",
      type: "Resource Recovery",
      acceptedMaterials: ["General Waste", "Recycling", "Metal", "Timber"]
    }
  ];
  
  return mockLocations;
}