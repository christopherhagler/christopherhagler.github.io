import { RenderMode, ServerRoute } from '@angular/ssr';
import { APPS } from './data/apps';

/**
 * Server/prerender route config. Every route is prerendered to static HTML at
 * build time — there is no running server (GitHub Pages is static hosting).
 * The per-app routes enumerate their slugs so each page gets its own file.
 */
export const serverRoutes: ServerRoute[] = [
  ...['apps/:slug', 'apps/:slug/support', 'apps/:slug/privacy'].map((path) => ({
    path,
    renderMode: RenderMode.Prerender as const,
    getPrerenderParams: async () => APPS.map((app) => ({ slug: app.slug })),
  })),
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
