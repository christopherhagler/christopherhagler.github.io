import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SITE } from './data/site';
import { APP_VIEWS, VIEW_PATHS } from './data/apps';

export const routes: Routes = [
  { path: '', component: Home, title: `${SITE.name} — iPhone games & apps` },
  { path: 'apps', redirectTo: '' },
  // Each app: overview, support, privacy (the App Store listing links those) and optional legal docs.
  ...APP_VIEWS.map((view) => ({
    path: `apps/:slug${VIEW_PATHS[view]}`,
    data: { view },
    loadComponent: () => import('./pages/apps/app-page').then((m) => m.AppPage),
  })),
  { path: '**', redirectTo: '' },
];
