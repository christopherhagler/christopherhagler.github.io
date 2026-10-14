import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { appBySlug, type AppInfo } from '../../data/apps';
import { SITE as SITE_INFO } from '../../data/site';

const SITE = SITE_INFO.url;

export type AppView = 'overview' | 'support' | 'privacy';

/**
 * One app's pages: overview, support and privacy policy (the last two are the
 * URLs the App Store listing points at). The route's `view` data picks which
 * one; the `:slug` param picks the app from data/apps.ts.
 */
@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-page.html',
  styleUrl: './app-page.scss',
})
export class AppPage {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

  protected readonly app = signal<AppInfo | null>(null);
  protected readonly view = signal<AppView>('overview');
  protected readonly notFound = signal(false);

  constructor() {
    // paramMap emits synchronously on subscribe, so content is in place before
    // the app stabilizes — needed for prerendering.
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.load(params.get('slug') ?? '', (this.route.snapshot.data['view'] as AppView) ?? 'overview');
    });
  }

  private load(slug: string, view: AppView): void {
    const app = appBySlug(slug) ?? null;
    this.app.set(app);
    this.view.set(view);
    this.notFound.set(!app);
    if (!app) {
      this.title.setTitle(`Not found — ${SITE_INFO.name}`);
      return;
    }

    const base = `/apps/${app.slug}`;
    const page = {
      overview: { path: base, title: `${app.name} — ${app.platform} app`, description: app.tagline },
      support: {
        path: `${base}/support`,
        title: `${app.name} Support`,
        description: `Help and contact for ${app.name}.`,
      },
      privacy: {
        path: `${base}/privacy`,
        title: `${app.name} Privacy Policy`,
        description: `How ${app.name} handles your information.`,
      },
    }[view];
    const url = SITE + page.path;
    const image = SITE + (app.screenshot?.src ?? app.icon);

    this.title.setTitle(`${page.title} — ${SITE_INFO.name}`);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    if (this.isServer) this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
