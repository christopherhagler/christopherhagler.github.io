import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SITE } from './data/site';

export const routes: Routes = [
  { path: '', component: Home, title: `${SITE.name} — iPhone games & apps` },
  { path: 'apps', redirectTo: '' },
  // Each app: overview, support and privacy (the App Store listing links the last two).
  ...(['overview', 'support', 'privacy'] as const).map((view) => ({
    path: view === 'overview' ? 'apps/:slug' : `apps/:slug/${view}`,
    data: { view },
    loadComponent: () => import('./pages/apps/app-page').then((m) => m.AppPage),
  })),
  { path: '**', redirectTo: '' },
];
