/**
 * Post-build prerender: serves dist, visits each route with Puppeteer,
 * saves the rendered HTML so crawlers get full content (SEO).
 * Run after: vite build
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const distDir = path.resolve(__dirname, 'dist');
const port = 37542;
const waitAfterLoad = 2000;

const accessories = require('./src/data/accessories.json');
const kitchen = require('./src/data/kitchen.json');
const pillows = require('./src/data/pillows.json');
const toys = require('./src/data/toys.json');

const routes = [
  '/',
  '/toys',
  '/accessories',
  '/pillows',
  '/kitchen',
  '/about-pletenyi-kit',
  '/care-conditions',
  '/404',
  ...accessories.map((item) => '/accessories/' + item.link),
  ...kitchen.map((item) => '/kitchen/' + item.link),
  ...pillows.map((item) => '/pillows/' + item.link),
  ...toys.map((item) => '/toys/' + item.link),
];

function serveStatic(req, res) {
  let urlPath = req.url?.split('?')[0] || '/';
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(distDir, urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err || !data) {
      fs.readFile(path.join(distDir, 'index.html'), (e, indexData) => {
        if (e || !indexData) {
          res.writeHead(500);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexData);
      });
      return;
    }
    const ext = path.extname(urlPath);
    const types = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.ico': 'image/x-icon',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
    };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function getSystemChromePath() {
  const candidates = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
    win32: [
      path.join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google\\Chrome\\Application\\chrome.exe'),
    ],
  };
  const list = candidates[process.platform] || [];
  for (const p of list) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function runPrerender() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.warn('[prerender] puppeteer not available, skipping prerender. Install with: npm install -D puppeteer');
    process.exit(0);
    return;
  }
  const server = http.createServer(serveStatic);
  server.listen(port, '127.0.0.1', async () => {
    let browser;
    try {
      const executablePath = getSystemChromePath();
      const launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      };
      if (executablePath) {
        launchOptions.executablePath = executablePath;
      }
      browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
      for (const route of routes) {
        const url = `http://127.0.0.1:${port}${route}`;
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise((r) => setTimeout(r, waitAfterLoad));
        const html = await page.content();
        const outPath =
          route === '/'
            ? path.join(distDir, 'index.html')
            : route === '/404'
              ? path.join(distDir, '404.html')
              : path.join(distDir, route, 'index.html');
        const dir = path.dirname(outPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(outPath, html, 'utf-8');
        console.log('[prerender]', route);
      }
      console.log('[prerender] All routes prerendered.');
    } catch (err) {
      console.warn('[prerender] Skipped (browser could not launch):', err.message);
      console.warn('[prerender] Build continued without prerendered HTML. To enable prerender: install Chrome, or run once: npx puppeteer browsers install chrome');
    } finally {
      if (browser) await browser.close();
      server.close();
    }
  });
}

runPrerender();
