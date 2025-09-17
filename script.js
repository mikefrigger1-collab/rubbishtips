// Robust CSV to JSON Converter for RubbishTips.com.au
// Complete rewrite to handle complex CSV with multi-line content
// Save as: convert-csv.js
// Run with: node convert-csv.js

const fs = require('fs');
const path = require('path');

class CSVParser {
  constructor(csvContent) {
    this.content = csvContent;
    this.position = 0;
    this.rows = [];
  }

  parse() {
    while (this.position < this.content.length) {
      const row = this.parseRow();
      if (row.length > 0) {
        this.rows.push(row);
      }
    }
    return this.rows;
  }

  parseRow() {
    const fields = [];
    
    while (this.position < this.content.length) {
      const field = this.parseField();
      fields.push(field);
      
      // Check what's next
      if (this.position >= this.content.length) break;
      
      const nextChar = this.content[this.position];
      if (nextChar === ',') {
        this.position++; // Skip comma
        continue;
      } else if (nextChar === '\n' || nextChar === '\r') {
        this.skipLineBreaks();
        break;
      }
    }
    
    return fields;
  }

  parseField() {
    this.skipWhitespace();
    
    if (this.position >= this.content.length) return '';
    
    const char = this.content[this.position];
    
    if (char === '"') {
      return this.parseQuotedField();
    } else {
      return this.parseUnquotedField();
    }
  }

  parseQuotedField() {
    this.position++; // Skip opening quote
    let field = '';
    
    while (this.position < this.content.length) {
      const char = this.content[this.position];
      
      if (char === '"') {
        this.position++;
        // Check for escaped quote
        if (this.position < this.content.length && this.content[this.position] === '"') {
          field += '"';
          this.position++;
        } else {
          // End of quoted field
          break;
        }
      } else {
        field += char;
        this.position++;
      }
    }
    
    return field;
  }

  parseUnquotedField() {
    let field = '';
    
    while (this.position < this.content.length) {
      const char = this.content[this.position];
      
      if (char === ',' || char === '\n' || char === '\r') {
        break;
      }
      
      field += char;
      this.position++;
    }
    
    return field.trim();
  }

  skipWhitespace() {
    while (this.position < this.content.length) {
      const char = this.content[this.position];
      if (char === ' ' || char === '\t') {
        this.position++;
      } else {
        break;
      }
    }
  }

  skipLineBreaks() {
    while (this.position < this.content.length) {
      const char = this.content[this.position];
      if (char === '\n' || char === '\r') {
        this.position++;
      } else {
        break;
      }
    }
  }
}

// Australian capital cities mapping
const CAPITAL_CITIES = {
  'sydney': {
    name: 'Sydney',
    slug: 'sydney',
    state: 'NSW',
    keywords: ['sydney', 'nsw', 'new south wales', 'parramatta', 'blacktown', 'penrith', 'campbelltown', 'liverpool', 'fairfield', 'bankstown'],
    coordinates: { lat: -33.8688, lng: 151.2093 }
  },
  'melbourne': {
    name: 'Melbourne',
    slug: 'melbourne', 
    state: 'VIC',
    keywords: ['melbourne', 'vic', 'victoria', 'geelong', 'ballarat', 'bendigo', 'shepparton', 'warrnambool'],
    coordinates: { lat: -37.8136, lng: 144.9631 }
  },
  'brisbane': {
    name: 'Brisbane',
    slug: 'brisbane',
    state: 'QLD',
    keywords: ['brisbane', 'qld', 'queensland', 'gold coast', 'sunshine coast', 'ipswich', 'logan', 'redcliffe'],
    coordinates: { lat: -27.4698, lng: 153.0251 }
  },
  'perth': {
    name: 'Perth',
    slug: 'perth',
    state: 'WA',
    keywords: ['perth', 'wa', 'western australia', 'fremantle', 'joondalup', 'rockingham', 'mandurah', 'bunbury'],
    coordinates: { lat: -31.9505, lng: 115.8605 }
  },
  'adelaide': {
    name: 'Adelaide', 
    slug: 'adelaide',
    state: 'SA',
    keywords: ['adelaide', 'sa', 'south australia', 'port adelaide', 'mount gambier', 'whyalla', 'murray bridge'],
    coordinates: { lat: -34.9285, lng: 138.6007 }
  },
  'hobart': {
    name: 'Hobart',
    slug: 'hobart',
    state: 'TAS',
    keywords: ['hobart', 'tas', 'tasmania', 'launceston', 'devonport', 'burnie', 'kingston'],
    coordinates: { lat: -42.8821, lng: 147.3272 }
  },
  'canberra': {
    name: 'Canberra',
    slug: 'canberra', 
    state: 'ACT',
    keywords: ['canberra', 'act', 'australian capital territory', 'tuggeranong', 'woden', 'belconnen'],
    coordinates: { lat: -35.2809, lng: 149.1300 }
  },
  'darwin': {
    name: 'Darwin',
    slug: 'darwin',
    state: 'NT', 
    keywords: ['darwin', 'nt', 'northern territory', 'alice springs', 'katherine', 'nhulunbuy'],
    coordinates: { lat: -12.4634, lng: 130.8456 }
  }
};

class LocationProcessor {
  static assignCity(location) {
    const searchText = `${location.name} ${location.address} ${location.city} ${location.state} ${location.region}`.toLowerCase();
    
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [citySlug, cityData] of Object.entries(CAPITAL_CITIES)) {
      let score = 0;
      
      for (const keyword of cityData.keywords) {
        if (searchText.includes(keyword)) {
          // Weight by keyword importance
          if (keyword === cityData.name.toLowerCase()) score += 10;
          else if (keyword === cityData.state.toLowerCase()) score += 5;
          else score += 2;
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = citySlug;
      }
    }
    
    // Fallback: assign by state if no good match
    if (!bestMatch) {
      const stateMap = {
        'nsw': 'sydney', 'vic': 'melbourne', 'qld': 'brisbane', 'wa': 'perth',
        'sa': 'adelaide', 'tas': 'hobart', 'act': 'canberra', 'nt': 'darwin'
      };
      bestMatch = stateMap[location.state.toLowerCase()] || 'sydney';
    }
    
    return bestMatch;
  }

  static generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

static generateDescription(name, content, cityName) {
  const cityNames = {
    'sydney': 'Sydney',
    'melbourne': 'Melbourne', 
    'brisbane': 'Brisbane',
    'perth': 'Perth',
    'adelaide': 'Adelaide',
    'hobart': 'Hobart',
    'canberra': 'Canberra',
    'darwin': 'Darwin'
  };
  
  const city = cityNames[cityName] || 'Australia';
  
  // Generate a description based on facility name and content
  if (content && content.length > 100) {
    return content.substring(0, 5000) + '...';
  }
  
  return `${name} is a waste disposal facility serving the ${city} area. Contact the facility for specific details about accepted materials, opening hours, and disposal fees.`;
}

  static extractFacilityType(categories, content) {
    const text = `${categories} ${content}`.toLowerCase();
    
    if (text.includes('transfer station')) return 'Transfer Station';
    if (text.includes('resource recovery')) return 'Resource Recovery';
    if (text.includes('recycling centre') || text.includes('recycling center')) return 'Recycling Centre';
    if (text.includes('council tip')) return 'Council Tip';
    if (text.includes('waste management')) return 'Waste Management';
    if (text.includes('tip')) return 'Rubbish Tip';
    if (text.includes('landfill')) return 'Landfill';
    
    return 'Waste Facility';
  }

  static extractPhone(content) {
    if (!content) return '';
    
    // Australian phone patterns
    const patterns = [
      /\(\d{2}\)\s*\d{4}\s*\d{4}/g, // (02) 1234 5678
      /\d{2}\s*\d{4}\s*\d{4}/g,     // 02 1234 5678
      /\d{10}/g,                    // 0212345678
      /\+61\s*\d{1}\s*\d{4}\s*\d{4}/g // +61 2 1234 5678
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }
    
    return '';
  }

  static extractHours(content) {
    if (!content) return 'Contact for hours';
    
    const cleanContent = content.replace(/\s+/g, ' ');
    
    // Look for hour patterns
    const hourPatterns = [
      /(?:open|hours?|operating)[\s:]*([^.!?]{20,100}(?:am|pm|hours?))/gi,
      /(?:monday|mon).*?(?:sunday|sun)[^.!?]*(?:am|pm)/gi,
      /\d{1,2}(?::\d{2})?\s*(?:am|pm).*?\d{1,2}(?::\d{2})?\s*(?:am|pm)/gi
    ];
    
    for (const pattern of hourPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].length > 10 && match[0].length < 200) {
        return match[0].trim();
      }
    }
    
    return 'Contact for hours';
  }

static extractAcceptedMaterials(materialsString, content) {
  let materials = [];
  
  // From the materials field - handle pipe-separated format
  if (materialsString && materialsString.trim()) {
    // Split on pipes and clean up each material
    materials = materialsString
      .split('|')
      .map(m => m.trim())
      .filter(m => m && m !== 'undefined' && m !== 'null')
      .map(m => {
        // Clean up HTML entities
        return m
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
      });
  }
  
  // Extract from content if no materials field or if we only got empty results
  if (materials.length === 0 && content) {
    const materialKeywords = [
      'general waste', 'green waste', 'garden waste', 'construction waste',
      'household waste', 'commercial waste', 'recyclables', 'recycling',
      'metal', 'metals', 'concrete', 'rubble', 'timber', 'wood',
      'electronics', 'e-waste', 'hazardous waste', 'batteries', 
      'paint', 'chemicals', 'asbestos', 'tyres', 'tires',
      'paper', 'cardboard', 'plastics', 'glass', 'organic waste',
      'bulky items', 'furniture', 'appliances', 'mattresses',
      'cars', 'vehicles', 'automotive', 'oil', 'whitegoods'
    ];
    
    const contentLower = content.toLowerCase();
    const foundMaterials = new Set();
    
    for (const keyword of materialKeywords) {
      if (contentLower.includes(keyword)) {
        // Capitalize properly
        const capitalizedKeyword = keyword
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        foundMaterials.add(capitalizedKeyword);
      }
    }
    
    materials = Array.from(foundMaterials);
  }
  
  // Remove duplicates and ensure we have at least one material
  materials = [...new Set(materials)];
  
  // Fallback to General Waste if nothing found
  if (materials.length === 0) {
    materials = ['General Waste'];
  }
  
  return materials;
}

  static buildAddress(row) {
    const parts = [];
    
    if (row.street) parts.push(row.street);
    if (row.street2 && row.street2 !== 'undefined') parts.push(row.street2);
    if (row.city) parts.push(row.city);
    if (row.province) parts.push(row.province);
    if (row.zip && row.zip !== 'undefined') parts.push(row.zip);
    
    return parts.join(', ') || row.address || 'Address not available';
  }
}

async function convertCSVToJSON() {
  console.log('🚀 RubbishTips.com.au CSV Converter v2.0');
  console.log('=====================================\n');
  
  try {
    // Read CSV file
    const csvPath = 'locations.csv';
    console.log(`📖 Reading: ${csvPath}`);
    
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found: ${csvPath}`);
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    console.log(`📊 File size: ${Math.round(csvContent.length / 1024)}KB`);
    
    // Parse CSV
    console.log('🔄 Parsing CSV...');
    const parser = new CSVParser(csvContent);
    const rows = parser.parse();
    
    console.log(`✅ Parsed ${rows.length} rows`);
    
    if (rows.length < 2) {
      throw new Error('Not enough data rows found');
    }
    
    const headers = rows[0].map(h => h.trim());
    console.log(`📋 Headers: ${headers.length} columns`);
    console.log(`   ${headers.slice(0, 5).join(', ')}...`);
    
    // Process locations
    console.log('\n🏭 Processing locations...');
    const locations = [];
    const issues = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      // Skip empty rows
      if (row.length < 5 || !row.some(cell => cell && cell.trim())) {
        continue;
      }
      
      // Create row object
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index] || '';
      });
      
      // Extract coordinates
      const lat = parseFloat(rowData.lat || rowData.latitude) || 0;
      const lng = parseFloat(rowData.lng || rowData.longitude) || 0;
      
      // Skip locations without coordinates
      if (lat === 0 || lng === 0) {
        issues.push({
          row: i + 1,
          name: rowData.Title || 'Unknown',
          issue: 'Missing coordinates'
        });
        continue;
      }
      
      // Skip locations without names
      if (!rowData.Title || !rowData.Title.trim()) {
        issues.push({
          row: i + 1,
          issue: 'Missing title'
        });
        continue;
      }
      
// Build location object - REPLACE YOUR EXISTING SECTION WITH THIS
const citySlug = LocationProcessor.assignCity({
  name: rowData.Title || '',
  address: LocationProcessor.buildAddress(rowData),
  city: rowData.city || '',
  state: rowData.province || '',
  region: rowData['Rubbish Tip Locations - Region'] || ''
});

const locationSlug = LocationProcessor.generateSlug(rowData.Title.trim());

const location = {
  id: i,
  name: rowData.Title.trim(),
  slug: locationSlug,
  citySlug: citySlug,
  address: LocationProcessor.buildAddress(rowData),
  latitude: lat,
  longitude: lng,
  phone: LocationProcessor.extractPhone(rowData.Content || ''),
  city: rowData.city || '',
  state: rowData.province || '',
  type: LocationProcessor.extractFacilityType(
    rowData['Rubbish Tip Locations - Categories'] || '',
    rowData.Content || ''
  ),
  acceptedMaterials: LocationProcessor.extractAcceptedMaterials(
    rowData['Rubbish Tip Locations - Accepted Materials'],
    rowData.Content
  ),
  openingHours: LocationProcessor.extractHours(rowData.Content || ''),
  region: rowData['Rubbish Tip Locations - Region'] || '',
  permalink: rowData.Permalink || '',
  content: (rowData.Content || '').substring(0, 5000), // Truncate long content
  description: LocationProcessor.generateDescription(
    rowData.Title.trim(), 
    rowData.Content || '', 
    citySlug
  )
};
      
      locations.push(location);
    }
    
    console.log(`✅ Processed ${locations.length} valid locations`);
    console.log(`⚠️  Skipped ${issues.length} problematic rows`);
    
    // Show sample issues
    if (issues.length > 0) {
      console.log('\n📋 Sample issues:');
      issues.slice(0, 3).forEach(issue => {
        console.log(`   Row ${issue.row}: ${issue.name || 'N/A'} - ${issue.issue}`);
      });
      if (issues.length > 3) {
        console.log(`   ... and ${issues.length - 3} more`);
      }
    }
    
    // Group by cities
    console.log('\n🏙️  Grouping by capital cities...');
    const cityGroups = {};
    
    // Initialize cities
    Object.values(CAPITAL_CITIES).forEach(city => {
      cityGroups[city.slug] = {
        ...city,
        locations: []
      };
    });
    
    // Assign locations to cities
    locations.forEach(location => {
      const citySlug = LocationProcessor.assignCity(location);
      cityGroups[citySlug].locations.push(location);
    });
    
    // Show distribution
    console.log('\n📊 City distribution:');
    Object.values(cityGroups).forEach(city => {
      if (city.locations.length > 0) {
        console.log(`   ${city.name}: ${city.locations.length} locations`);
      }
    });

    // Step 3: Replace the "Create final JSON" section in your convertCSVToJSON function
// Find this section (around line 420) and replace it with this updated version:

// Create final JSON with static generation data - REPLACE YOUR EXISTING SECTION
const jsonOutput = {
  cities: Object.values(cityGroups).filter(city => city.locations.length > 0),
  staticParams: [], // For Next.js generateStaticParams
  metadata: {
    totalLocations: locations.length,
    totalCities: Object.values(cityGroups).filter(city => city.locations.length > 0).length,
    lastUpdated: new Date().toISOString(),
    source: path.basename(csvPath)
  }
};

// Generate static params for all location pages
Object.values(cityGroups).forEach(city => {
  if (city.locations.length > 0) {
    city.locations.forEach(location => {
      jsonOutput.staticParams.push({
        city: city.slug,
        location: location.slug
      });
    });
  }
});

console.log(`\n📄 Generated ${jsonOutput.staticParams.length} static page routes`);
    
    // Save files
    console.log('\n💾 Saving files...');
    
    // Create directories
    const outputDir = 'public/data';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save main JSON
    const outputPath = path.join(outputDir, 'locations.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
    console.log(`✅ Main file: ${outputPath}`);
    
    // Save backup
    const backupPath = `locations-backup-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(backupPath, JSON.stringify(jsonOutput, null, 2));
    console.log(`✅ Backup: ${backupPath}`);
    
    // Save issues report if any
    if (issues.length > 0) {
      fs.writeFileSync('processing-issues.json', JSON.stringify(issues, null, 2));
      console.log(`📝 Issues report: processing-issues.json`);
    }
    
    console.log('\n🎉 Conversion complete!');
    console.log(`📍 ${locations.length} locations ready for your map`);
    console.log(`🏙️  ${jsonOutput.cities.length} cities with locations`);
    
    return jsonOutput;
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertCSVToJSON();