import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './background.component';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundComponent, RouterOutlet, RouterLink],
  templateUrl: './app.html',
})
export class App {
  protected readonly year = new Date().getFullYear();

  protected readonly navLinks: NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'writing', label: 'Writing' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
