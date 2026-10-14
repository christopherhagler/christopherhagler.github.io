import { RenderMode, ServerRoute } from '@angular/ssr';
import { APP_VIEWS, APPS, hasView, VIEW_PATHS } from './data/apps';

/**
 * Server/prerender route config. Every route is prerendered to static HTML at
 * build time — there is no running server (GitHub Pages is static hosting).
 * The per-app routes enumerate their slugs so each page gets its own file.
 */
export const serverRoutes: ServerRoute[] = [
  ...APP_VIEWS.map((view) => ({
    path: `apps/:slug${VIEW_PATHS[view]}`,
    renderMode: RenderMode.Prerender as const,
    getPrerenderParams: async () =>
      APPS.filter((app) => hasView(app, view)).map((app) => ({ slug: app.slug })),
  })),
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
