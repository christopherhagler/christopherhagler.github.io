/* ---------------------------------------------------------------------------
   Apps I publish. Each entry gets its own pages, all prerendered:
     /apps/<slug>          overview
     /apps/<slug>/support  support (the App Store "Support URL")
     /apps/<slug>/privacy  privacy policy (the App Store "Privacy Policy URL")
     /apps/<slug>/terms, /apps/<slug>/health-data  (only when provided)
   To add an app: add an entry here and put its icon (and an optional
   screenshot) in public/apps/<slug>/. Nothing else needs to change.

   Text fields may contain simple inline HTML (<b>, <a>, &rsaquo;). They are
   rendered with Angular's sanitizer, so only trusted static content goes here.
   --------------------------------------------------------------------------- */

import { BALLAST } from './ballast';

export interface AppSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

/** A legal document page: effective date plus sections. */
export interface AppDoc {
  effective: string;
  sections: AppSection[];
}

export interface AppFaq {
  q: string;
  a: string;
}

export interface AppInfo {
  slug: string;
  name: string;
  /** One line, shown on the Apps list and under the name. */
  tagline: string;
  platform: string;
  /** 'available' shows the App Store link; 'coming-soon' shows a status chip. */
  status: 'available' | 'coming-soon';
  appStoreUrl?: string;
  /** Paths under public/. */
  icon: string;
  screenshot?: { src: string; width: number; height: number; alt: string };
  /** Short paragraphs for the overview page. */
  about: string[];
  features: { title: string; text: string }[];
  tags: string[];
  contactEmail: string;
  faqs: AppFaq[];
  privacy: AppDoc;
  /** Optional Terms of Use, shown at /apps/<slug>/terms. */
  terms?: AppDoc;
  /** Optional consumer health data privacy policy (WA/NV/CT), at /apps/<slug>/health-data. */
  healthData?: AppDoc;
}

/** Every page an app can have. Overview, support and privacy always exist; the rest only when provided. */
export const APP_VIEWS = ['overview', 'support', 'privacy', 'terms', 'health-data'] as const;
export type AppView = (typeof APP_VIEWS)[number];

export const VIEW_PATHS: Record<AppView, string> = {
  overview: '',
  support: '/support',
  privacy: '/privacy',
  terms: '/terms',
  'health-data': '/health-data',
};

export const hasView = (app: AppInfo, view: AppView): boolean =>
  view === 'terms' ? !!app.terms : view === 'health-data' ? !!app.healthData : true;

const EMAIL = 'tinyforge.apps@gmail.com';
const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

export const APPS: AppInfo[] = [
  {
    slug: 'turbo-tantrum',
    name: 'Turbo Tantrum',
    tagline: 'Build a toy car, build a track, then race it — or smash it.',
    platform: 'iPhone',
    status: 'coming-soon',
    icon: '/apps/turbo-tantrum/icon.png',
    screenshot: {
      src: '/apps/turbo-tantrum/race.jpg',
      width: 1600,
      height: 738,
      alt: 'A toy car racing on a violet track through a loop on a bedroom floor, with rival cars ahead.',
    },
    about: [
      'A toy-car racing and battle game set on a bedroom floor. Snap parts onto a chassis, pick a motor and gearing, and every part changes speed, grip and weight. Then take it out on loops, wall rides, mega jumps and hairpins.',
      'Plays fully offline. No ads, no in-app purchases, no accounts and no data collected.',
    ],
    features: [
      { title: 'Race', text: 'Hand-built tracks against rival cars, with nitro and slides.' },
      { title: 'Battle Arena', text: 'Machine guns, rockets and grenades; cars burst into parts. Weapons can be turned off.' },
      { title: 'Garage', text: 'Build and paint your own car, part by part.' },
      { title: 'Track Builder', text: 'Lay track, add ramps and a little city, test-drive and share it as a code.' },
      { title: 'Every day', text: 'A new Daily Challenge, Cups to win and Time Trials against your ghost.' },
      { title: 'Game Center', text: 'Best laps, daily times and arena wins on the leaderboards.' },
    ],
    tags: ['iOS', 'Game', 'Three.js', 'Capacitor'],
    contactEmail: EMAIL,
    faqs: [
      {
        q: 'How do I steer?',
        a: 'Use the on-screen arrow buttons, or switch to tilt steering in Settings &rsaquo; Steering. Tap CENTER if the car pulls to one side while tilting.',
      },
      {
        q: 'How do I share a track?',
        a: 'In the Track Builder, open the track sheet and tap Share. Your friend pastes the code (it starts with TT1) into their Track Builder and taps Load.',
      },
      { q: 'Can I turn off the weapons?', a: 'Yes: Settings &rsaquo; Weapons.' },
      {
        q: 'Where are the leaderboards?',
        a: 'Sign in to Game Center in iOS Settings. A Leaderboards button then appears on the main menu.',
      },
      {
        q: 'There’s no sound.',
        a: 'Check that your iPhone isn’t on silent and that Sound is on in the game’s Settings.',
      },
      {
        q: 'Will I lose my cars and tracks?',
        a: 'They’re saved on your iPhone. Deleting the app deletes them.',
      },
    ],
    privacy: {
      effective: 'October 13, 2026',
      sections: [
        {
          heading: 'The short version',
          paragraphs: [
            'Turbo Tantrum does not collect, sell or share your personal information. There are no Turbo Tantrum accounts, no ads, no analytics, no tracking and no in-app purchases, and the game includes no third-party code that collects data. The only thing that ever leaves your device is optional Game Center leaderboard scores, which go to Apple (see below).',
          ],
        },
        {
          heading: 'What stays on your device',
          bullets: [
            'Your car designs, tracks, best lap times, ghost-car laps, cup progress and settings are saved only on your device, in the app’s own storage (and in your own device backups, if you use them). Turbo Tantrum has no server and never receives them.',
            'Deleting the app deletes all of this.',
          ],
        },
        {
          heading: 'Game Center leaderboards',
          paragraphs: [
            'If you are signed in to Apple Game Center on your device, Turbo Tantrum sends these scores to Apple’s Game Center leaderboards: your best lap time on the four classic tracks (Sunday Loop, Canyon Leap, Stunt Park and Hairpin Havoc), your daily-challenge time and your total Battle Arena wins. Apple shows them to other players next to your Game Center nickname. Apple’s own privacy policy covers Game Center. Turbo Tantrum does not receive, see or store your Apple ID or any other Game Center account details.',
            'You can turn Game Center off at any time under iOS Settings &rsaquo; Game Center. The game works fully without it. If you want your scores taken off a leaderboard, email us at the address below and we will do what Game Center allows (for example resetting that leaderboard or asking Apple), or turn Game Center off for the game.',
          ],
        },
        {
          heading: 'Sharing tracks',
          paragraphs: [
            'When you share a track, the game opens the standard iOS share sheet with a track code. The code contains only the track’s layout (track pieces, ramps and city pieces); it contains no names or text, and you choose where it goes. Turbo Tantrum does not see or keep anything you share.',
          ],
        },
        {
          heading: 'Motion sensor and vibration',
          paragraphs: [
            'If you choose tilt steering, the game reads your device’s motion sensor while you play, only to steer your car. Vibration (haptic feedback) uses no data and can be turned off in Settings. Neither is stored or shared.',
          ],
        },
        {
          heading: 'Network use',
          paragraphs: [
            'The game plays fully offline. Its only network use is the optional Game Center leaderboards described above.',
          ],
        },
        {
          heading: 'Children',
          paragraphs: [
            'Turbo Tantrum collects no personal information from anyone, including children under 13 (or under 16 where that age applies). Game Center accounts for children are managed by their parents through Apple.',
          ],
        },
        {
          heading: 'Changes and contact',
          paragraphs: [
            `If this policy changes, the new version will be posted here with a new effective date. Questions, or leaderboard score requests: ${mail}`,
          ],
        },
      ],
    },
  },
  BALLAST,
];

export const appBySlug = (slug: string): AppInfo | undefined => APPS.find((a) => a.slug === slug);
