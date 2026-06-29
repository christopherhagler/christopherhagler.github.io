/* ---------------------------------------------------------------------------
   Post-build generator for static discovery files: sitemap.xml, robots.txt,
   and the RSS feed. Runs after `ng build` (see the "build" npm script) and
   writes into the browser output folder so they ship with the site.
   --------------------------------------------------------------------------- */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { POSTS } from '../src/app/content';

const SITE = 'https://christopherhagler.github.io';
const OUT = 'dist/portfolio/browser';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const buildDate = new Date();

// --- sitemap.xml ---------------------------------------------------------
const pages = [
  { loc: `${SITE}/`, lastmod: buildDate.toISOString() },
  { loc: `${SITE}/playground`, lastmod: buildDate.toISOString() },
  ...POSTS.map((p) => ({
    loc: `${SITE}/writing/${p.slug}`,
    lastmod: new Date(p.published).toISOString(),
  })),
];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`)
    .join('\n') +
  `\n</urlset>\n`;

// --- robots.txt ----------------------------------------------------------
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;

// --- feed.xml (RSS 2.0) --------------------------------------------------
const items = POSTS.map(
  (p) =>
    `    <item>\n` +
    `      <title>${esc(p.title)}</title>\n` +
    `      <link>${SITE}/writing/${p.slug}</link>\n` +
    `      <guid isPermaLink="true">${SITE}/writing/${p.slug}</guid>\n` +
    `      <pubDate>${new Date(p.published).toUTCString()}</pubDate>\n` +
    `      <description>${esc(p.summary)}</description>\n` +
    p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n') +
    `\n    </item>`,
).join('\n');

const rss =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>Christopher Hagler — Writing</title>\n` +
  `    <link>${SITE}/</link>\n` +
  `    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
  `    <description>Notes on radar, signals, and the systems around them.</description>\n` +
  `    <language>en-us</language>\n` +
  `    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>\n` +
  `${items}\n` +
  `  </channel>\n</rss>\n`;

writeFileSync(join(OUT, 'sitemap.xml'), sitemap);
writeFileSync(join(OUT, 'robots.txt'), robots);
writeFileSync(join(OUT, 'feed.xml'), rss);

console.log(`Generated sitemap.xml (${pages.length} urls), robots.txt, feed.xml (${POSTS.length} posts)`);
