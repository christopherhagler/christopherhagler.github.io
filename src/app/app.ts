import { Component, HostListener, signal } from '@angular/core';
import { marked } from 'marked';
import { BackgroundComponent } from './background.component';
import { RevealDirective } from './reveal.directive';
import {
  EDUCATION,
  EXPERIENCE,
  GITHUB_URL,
  POSTS,
  PROJECTS,
  PUBLICATION,
  SKILL_GROUPS,
  STATS,
  type EducationItem,
  type ExperienceItem,
  type Post,
  type Project,
  type SkillGroup,
  type Stat,
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
  protected readonly stats: Stat[] = STATS;
  protected readonly skillGroups: SkillGroup[] = SKILL_GROUPS;
  protected readonly experience: ExperienceItem[] = EXPERIENCE;
  protected readonly education: EducationItem[] = EDUCATION;
  protected readonly publication = PUBLICATION;
  protected readonly projects: Project[] = PROJECTS;
  protected readonly posts: Post[] = POSTS;
  protected readonly githubUrl = GITHUB_URL;
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

  // Reader modal state for the Writing section.
  protected readonly activePost = signal<Post | null>(null);
  protected readonly postHtml = signal<string>('');
  protected readonly postLoading = signal(false);

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

  async openPost(post: Post): Promise<void> {
    this.activePost.set(post);
    this.postHtml.set('');
    this.postLoading.set(true);
    document.body.style.overflow = 'hidden';
    try {
      const res = await fetch(`posts/${post.slug}.md`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      this.postHtml.set(await marked.parse(md));
    } catch {
      this.postHtml.set('<p>Sorry — this post failed to load.</p>');
    } finally {
      this.postLoading.set(false);
    }
  }

  closePost(): void {
    this.activePost.set(null);
    this.postHtml.set('');
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activePost()) this.closePost();
  }
}
