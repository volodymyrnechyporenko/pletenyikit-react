/**
 * Builds the list of valid routes (same as sitemap). Writes src/data/valid-routes.json
 * so the app can treat any other path as 404. Run before vite build and before dev.
 */
const fs = require('fs');
const path = require('path');

const accessories = require('./src/data/accessories.json');
const kitchen = require('./src/data/kitchen.json');
const pillows = require('./src/data/pillows.json');
const toys = require('./src/data/toys.json');

const validPaths = [
  '/',
  '/toys',
  '/accessories',
  '/pillows',
  '/kitchen',
  '/about-pletenyi-kit',
  '/care-conditions',
  ...accessories.map((item) => '/accessories/' + item.link),
  ...kitchen.map((item) => '/kitchen/' + item.link),
  ...pillows.map((item) => '/pillows/' + item.link),
  ...toys.map((item) => '/toys/' + item.link),
];

const outPath = path.resolve(__dirname, 'src/data/valid-routes.json');
fs.writeFileSync(outPath, JSON.stringify(validPaths, null, 0), 'utf-8');
console.log('[valid-routes]', validPaths.length, 'routes written to src/data/valid-routes.json');
