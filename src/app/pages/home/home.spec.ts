import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';
import { APPS } from '../../data/apps';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders a card for every app, linking its overview, support and privacy pages', () => {
    const cards = el.querySelectorAll('.app-card');
    expect(cards.length).toBe(APPS.length);
    for (const [i, app] of APPS.entries()) {
      const hrefs = Array.from(cards[i].querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(hrefs).toContain(`/apps/${app.slug}`);
      expect(hrefs).toContain(`/apps/${app.slug}/support`);
      expect(hrefs).toContain(`/apps/${app.slug}/privacy`);
      expect(cards[i].textContent).toContain(app.name);
    }
  });

  it('features the first app in the hero', () => {
    expect(el.querySelector('.hero__device')?.getAttribute('href')).toBe(`/apps/${APPS[0].slug}`);
  });

  it('has nothing personal or unrelated to the apps', () => {
    const text = el.textContent ?? '';
    for (const word of ['radar', 'Signals Lab', 'resume', 'Experience', 'LinkedIn']) {
      expect(text).withContext(word).not.toContain(word);
    }
  });
});
