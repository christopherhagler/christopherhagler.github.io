import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { POSTS, type Post } from './content';
import { getPostMarkdown } from './post-content';
import { renderMarkdown } from './markdown';

const SITE = 'https://christopherhagler.github.io';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-page.html',
})
export class PostPage {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly isServer = isPlatformServer(inject(PLATFORM_ID));

  protected readonly post = signal<Post | null>(null);
  protected readonly body = signal<SafeHtml>('');
  protected readonly notFound = signal(false);

  constructor() {
    // paramMap emits synchronously on subscribe, so the content is in place
    // before the app stabilizes — important for prerendering.
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.load(params.get('slug') ?? '');
    });
  }

  private load(slug: string): void {
    const meta = POSTS.find((p) => p.slug === slug) ?? null;
    const md = getPostMarkdown(slug);

    if (!meta || md == null) {
      this.notFound.set(true);
      this.post.set(null);
      this.body.set('');
      this.title.setTitle('Not found — Christopher Hagler');
      return;
    }

    this.notFound.set(false);
    this.post.set(meta);
    this.body.set(this.sanitizer.bypassSecurityTrustHtml(renderMarkdown(md)));
    this.applyMeta(meta);
  }

  private applyMeta(post: Post): void {
    const url = `${SITE}/writing/${post.slug}`;
    const image = `${SITE}/posts/og/${post.slug}.png`;
    const published = new Date(post.published).toISOString();

    this.title.setTitle(`${post.title} — Christopher Hagler`);
    this.meta.updateTag({ name: 'description', content: post.summary });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: post.summary });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'article:published_time', content: published });
    this.meta.updateTag({ name: 'twitter:title', content: post.title });
    this.meta.updateTag({ name: 'twitter:description', content: post.summary });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Structured data + canonical are only needed in the prerendered HTML that
    // crawlers read; the client navigates within an already-hydrated document.
    if (this.isServer) {
      this.setCanonical(url);
      this.injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        image,
        datePublished: published,
        url,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: 'Christopher Hagler', url: SITE },
        publisher: { '@type': 'Person', name: 'Christopher Hagler', url: SITE },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      });
    }
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

  private injectJsonLd(data: Record<string, unknown>): void {
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
