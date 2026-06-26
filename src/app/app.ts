import { Component, HostListener, signal } from '@angular/core';
import { BackgroundComponent } from './background.component';
import { RevealDirective } from './reveal.directive';
import {
  EXPERIENCE,
  PROJECTS,
  SKILL_GROUPS,
  type ExperienceItem,
  type Project,
  type SkillGroup,
} from './content';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundComponent, RevealDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly skillGroups: SkillGroup[] = SKILL_GROUPS;
  protected readonly experience: ExperienceItem[] = EXPERIENCE;
  protected readonly projects: Project[] = PROJECTS;
  protected readonly year = new Date().getFullYear();

  protected readonly navLinks: NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
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
