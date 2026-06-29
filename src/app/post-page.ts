import { Component, inject, signal } from '@angular/core';
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
    this.title.setTitle(`${post.title} — Christopher Hagler`);
    this.meta.updateTag({ name: 'description', content: post.summary });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: post.summary });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: post.title });
    this.meta.updateTag({ name: 'twitter:description', content: post.summary });
  }
}
