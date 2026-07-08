// Generate lightweight thumbnails of the heavy dashboard HTML files.
// Usage: node prototypes/generate-thumbnails.mjs
// Requires Playwright + Chromium (global install is fine).
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { statSync } from 'node:fs';

// Playwright may be installed globally (not as a local dep); resolve it from
// the global node_modules root so this script needs no `npm install`.
const globalRoot = execSync('npm root -g').toString().trim();
const require = createRequire(join(globalRoot, 'noop.js'));
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const outDir = join(here, 'assets');

const targets = [
  { src: 'Monitor_Dashboards.html', out: 'dash-1.png' },
  { src: 'Monitor_Dashboards_Abertura.html', out: 'dash-2.png' },
  { src: 'Monitor_Dashboards_PT.html', out: 'dash-3.png' },
];

// Capture at a wide viewport then let CSS downscale in the carousel.
const VIEWPORT = { width: 1440, height: 900 };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await ctx.newPage();

let failures = 0;
for (const t of targets) {
  const url = pathToFileURL(join(repoRoot, t.src)).href;
  const outPath = join(outDir, t.out);
  try {
    console.log(`-> ${t.src}`);
    // Heavy files (20-32 MB): generous timeout, don't wait for networkidle forever.
    await page.goto(url, { waitUntil: 'load', timeout: 120000 });
    await page.waitForTimeout(6000); // let flexdashboard widgets paint
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      type: 'png',
    });
    const kb = (statSync(outPath).size / 1024).toFixed(0);
    console.log(`   ok -> assets/${t.out} (${kb} KB)`);
  } catch (err) {
    failures++;
    console.error(`   FAILED ${t.src}: ${err.message}`);
    console.error(`   -> capture assets/${t.out} manually as a fallback.`);
  }
}

await browser.close();
console.log(failures ? `\nDone with ${failures} failure(s).` : '\nAll thumbnails generated.');
process.exit(failures ? 1 : 0);
