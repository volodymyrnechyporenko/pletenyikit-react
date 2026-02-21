const fs = require('fs');
const { XMLBuilder } = require('fast-xml-parser');
const path = require('path');

const baseUrl = 'https://pletenyikit.com';
const outputFilePath = path.resolve(__dirname, 'dist/sitemap.xml');

/** Uses the same valid-routes list as the app (single source of truth). */
const validPaths = require('./src/data/valid-routes.json');

function getPriorityAndChangefreq(url) {
  if (url === '/') return { changefreq: 'daily', priority: 1.0 };
  if (['/toys', '/accessories', '/pillows', '/kitchen', '/about-pletenyi-kit'].includes(url)) {
    return { changefreq: 'daily', priority: 1.0 };
  }
  if (url === '/care-conditions') return { changefreq: 'weekly', priority: 0.8 };
  return { changefreq: 'weekly', priority: 0.8 };
}

function generateSitemap() {
  const routes = validPaths.map((url) => ({
    url: `${baseUrl}${url}`,
    ...getPriorityAndChangefreq(url),
  }));

  const sitemap = {
    urlset: {
      _attr: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
      url: routes.map((route) => ({
        url: route.url,
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
