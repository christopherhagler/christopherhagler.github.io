/* ---------------------------------------------------------------------------
   Post body registry.

   Markdown is imported (not fetched) so it is bundled and available both in the
   browser and during prerendering — synchronously, which keeps the prerender
   output complete. Images live in public/posts/images/ and are referenced from
   markdown with a site-absolute path, e.g.  ![A coffee-can radar](/posts/images/can.png)

   To publish a new post:
     1. Drop the markdown in  src/posts/<slug>.md
     2. Add an entry to POSTS in content.ts (metadata shown in the Writing list)
     3. Add the slug → import line below
   --------------------------------------------------------------------------- */

import coffeeCanRadar from '../posts/coffee-can-radar.md';
import cfarDetection from '../posts/cfar-detection.md';

const POST_CONTENT: Record<string, string> = {
  'coffee-can-radar': coffeeCanRadar,
  'cfar-detection': cfarDetection,
};

/** Raw markdown for a slug, or null if no such post exists. */
export function getPostMarkdown(slug: string): string | null {
  return POST_CONTENT[slug] ?? null;
}
