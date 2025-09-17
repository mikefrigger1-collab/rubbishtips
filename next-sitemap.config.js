/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.rubbishtips.com.au',
  generateRobotsTxt: true,
  sitemapSize: 5000, // Split into multiple sitemaps if over 5000 URLs
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  
  // Custom transformation for different page types
  transform: async (config, path) => {
    // City pages get higher priority
    if (path.match(/^\/[a-z-]+\/?$/)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Location pages get medium priority
    if (path.match(/^\/[a-z-]+\/[a-z0-9-]+\/?$/)) {
      return {
        loc: path,
        changefreq: 'monthly', 
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // Map page gets high priority
    if (path === '/map/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Default for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about/'),
    await config.transform(config, '/guidelines/'),
    await config.transform(config, '/contact/'),
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://www.rubbishtips.com.au/sitemap.xml',
    ],
  },
}