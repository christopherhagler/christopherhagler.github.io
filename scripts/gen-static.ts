/* ---------------------------------------------------------------------------
   Post-build generator for sitemap.xml and robots.txt. Runs after `ng build`
   (see the "build" npm script) and writes into the browser output folder.
   --------------------------------------------------------------------------- */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { APPS } from '../src/app/data/apps';
import { SITE } from '../src/app/data/site';

const OUT = 'dist/portfolio/browser';
const now = new Date().toISOString();

const pages = [
  `${SITE.url}/`,
  ...APPS.flatMap((a) => ['', '/support', '/privacy'].map((sub) => `${SITE.url}/apps/${a.slug}${sub}`)),
];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`).join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(OUT, 'sitemap.xml'), sitemap);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Generated sitemap.xml (${pages.length} urls), robots.txt`);
