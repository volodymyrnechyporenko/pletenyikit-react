const fs = require('fs');
const { XMLBuilder } = require('fast-xml-parser');
const path = require('path');

const baseUrl = 'https://pletenyikit.com';
const outputFilePath = path.resolve(__dirname, 'dist/sitemap.xml');

const accessories = require('./src/data/accessories.json');
const kitchen = require('./src/data/kitchen.json');
const pillows = require('./src/data/pillows.json');
const toys = require('./src/data/toys.json');

function generateSitemap() {
  const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/accessories', changefreq: 'daily', priority: 1.0 },
    { url: '/kitchen', changefreq: 'daily', priority: 1.0 },
    { url: '/pillows', changefreq: 'daily', priority: 1.0 },
    { url: '/toys', changefreq: 'daily', priority: 1.0 },
    { url: '/about-pletenyi-kit', changefreq: 'daily', priority: 1.0 },
    { url: '/care-conditions', changefreq: 'weekly', priority: 0.8 },
    ...accessories.map(item => ({
      url: '/accessories/' + item.link,
      changefreq: 'weekly',
      priority: 0.8,
    })),
    ...kitchen.map(item => ({
      url: '/kitchen/' + item.link,
      changefreq: 'weekly',
      priority: 0.8,
    })),
    ...pillows.map(item => ({
      url: '/pillows/' + item.link,
      changefreq: 'weekly',
      priority: 0.8,
    })),
    ...toys.map(item => ({
      url: '/toys/' + item.link,
      changefreq: 'weekly',
      priority: 0.8,
    })),
  ];

  const sitemap = {
    urlset: {
      _attr: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
      url: routes.map(route => ({
        url: `${baseUrl}${route.url}`,
        changefreq: route.changefreq,
        priority: route.priority,
      })),
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });

  const xmlString = builder.build(sitemap);

  fs.writeFileSync(outputFilePath, xmlString);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
