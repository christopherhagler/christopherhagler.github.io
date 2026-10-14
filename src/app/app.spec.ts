import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { APPS } from './data/apps';
import { SITE } from './data/site';

describe('App (shell)', () => {
  let fixture: ComponentFixture<App>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  function toggle(): HTMLButtonElement {
    return el.querySelector<HTMLButtonElement>('.nav__toggle')!;
  }

  function menu(): HTMLElement {
    return el.querySelector<HTMLElement>('.nav__links')!;
  }

  it('renders the studio brand and a nav link per app', () => {
    expect(el.querySelector('.nav__brandtext')?.textContent).toBe(SITE.name);
    const labels = Array.from(menu().querySelectorAll('a')).map((a) => a.textContent?.trim());
    expect(labels).toEqual([...APPS.map((a) => a.name), 'All apps']);
  });

  it('links each app support and privacy page from the footer', () => {
    const hrefs = Array.from(el.querySelectorAll<HTMLAnchorElement>('.footer a')).map((a) => a.getAttribute('href'));
    for (const app of APPS) {
      expect(hrefs).toContain(`/apps/${app.slug}/support`);
      expect(hrefs).toContain(`/apps/${app.slug}/privacy`);
    }
  });

  it('starts with the menu closed and not marked as scrolled', () => {
    expect(menu().classList).not.toContain('is-open');
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(el.querySelector('.nav')?.classList).not.toContain('nav--scrolled');
  });

  it('opens and closes the menu from the toggle button', () => {
    toggle().click();
    fixture.detectChanges();
    expect(menu().classList).toContain('is-open');
    expect(toggle().classList).toContain('is-open');
    expect(toggle().getAttribute('aria-expanded')).toBe('true');

    toggle().click();
    fixture.detectChanges();
    expect(menu().classList).not.toContain('is-open');
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu on Escape', () => {
    toggle().click();
    fixture.detectChanges();
    expect(menu().classList).toContain('is-open');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(menu().classList).not.toContain('is-open');
  });

  it('closes the menu when a nav link is clicked', () => {
    toggle().click();
    fixture.detectChanges();

    menu().querySelector('a')!.click();
    fixture.detectChanges();
    expect(menu().classList).not.toContain('is-open');
  });

  it('marks the header as scrolled once the window scrolls past the threshold', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(200);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(el.querySelector('.nav')?.classList).toContain('nav--scrolled');
  });

  it('shows the current year in the footer', () => {
    expect(el.querySelector('.footer')?.textContent).toContain(`${new Date().getFullYear()}`);
  });
});
