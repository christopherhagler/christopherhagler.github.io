import { APPS, appBySlug, hasView } from './apps';

describe('APPS', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = APPS.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('every app has what its App Store listing needs', () => {
    for (const app of APPS) {
      expect(app.icon).withContext(app.slug).toMatch(new RegExp(`^/apps/${app.slug}/`));
      expect(app.contactEmail).withContext(app.slug).toContain('@');
      expect(app.privacy.effective).withContext(app.slug).toBeTruthy();
      expect(app.privacy.sections.length).withContext(app.slug).toBeGreaterThan(0);
      expect(app.faqs.length).withContext(app.slug).toBeGreaterThan(0);
      if (app.status === 'available') {
        expect(app.appStoreUrl).withContext(app.slug).toMatch(/^https:\/\/apps\.apple\.com\//);
      }
    }
  });

  it('legal documents are complete and have no unfilled placeholders when available', () => {
    for (const app of APPS) {
      for (const doc of [app.terms, app.healthData].filter((d) => !!d)) {
        expect(doc!.sections.length).withContext(app.slug).toBeGreaterThan(0);
        if (app.status === 'available') {
          const text = JSON.stringify(doc) + JSON.stringify(app.privacy);
          expect(text).withContext(`${app.slug} has [PLACEHOLDER] text`).not.toMatch(/\[[A-Z ,]+\]/);
        }
      }
    }
  });

  it('only offers optional pages for apps that provide them', () => {
    const ballast = appBySlug('ballast')!;
    expect(hasView(ballast, 'terms')).toBeTrue();
    expect(hasView(ballast, 'health-data')).toBeTrue();
    for (const app of APPS.filter((a) => !a.terms)) expect(hasView(app, 'terms')).toBeFalse();
  });
});
