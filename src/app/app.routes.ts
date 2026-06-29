import { Routes } from '@angular/router';
import { Home } from './home';

export const routes: Routes = [
  { path: '', component: Home, title: 'Christopher Hagler — Radar EW Software Engineer' },
  {
    // Lazy-loaded so the markdown/highlight.js/KaTeX bundle only loads on posts.
    path: 'writing/:slug',
    loadComponent: () => import('./post-page').then((m) => m.PostPage),
  },
  { path: '**', redirectTo: '' },
];
