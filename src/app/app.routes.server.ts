import { RenderMode, ServerRoute } from '@angular/ssr';
import { POSTS } from './content';

/**
 * Server/prerender route config. Every route is prerendered to static HTML at
 * build time — there is no running server (GitHub Pages is static hosting).
 * The parameterized post route enumerates its slugs so each gets its own file.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'writing/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => POSTS.map((post) => ({ slug: post.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
