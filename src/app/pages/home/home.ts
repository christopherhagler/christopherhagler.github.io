import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { APPS, type AppInfo } from '../../data/apps';
import { SITE } from '../../data/site';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly apps: AppInfo[] = APPS;
  /** Shown in the hero: the first app in data/apps.ts. */
  protected readonly featured: AppInfo | undefined = APPS[0];

  protected readonly principles = [
    {
      icon: '◎',
      title: 'Privacy first',
      text: 'No accounts and as little data as possible — usually none. What you make stays on your device.',
    },
    {
      icon: '▣',
      title: 'Made for iPhone',
      text: 'Built for touch, haptics and Game Center, and tuned to feel good in your hands.',
    },
    {
      icon: '✦',
      title: 'Small and polished',
      text: 'A few things done well, with updates when there’s something worth adding.',
    },
  ];
}
