/* ---------------------------------------------------------------------------
   Site content. Edit these arrays to update the site — no template changes
   needed.
   --------------------------------------------------------------------------- */

export interface Post {
  slug: string; // matches src/posts/<slug>.md
  title: string;
  date: string; // display date, e.g. "Jun 2026"
  published: string; // machine date, ISO "YYYY-MM-DD" (sitemap, RSS, JSON-LD)
  minutes: number;
  summary: string;
  tags: string[];
}

export interface SkillGroup {
  title: string;
  icon: string; // emoji or short glyph
  blurb: string; // one line on how these fit together
  items: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  points: string[];
  link?: { label: string; url: string };
}

export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  link?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

// Writing-list metadata. Each entry needs a matching src/posts/<slug>.md and a
// line in post-content.ts (see the comment there). Newest first.
export const POSTS: Post[] = [
  {
    slug: 'coffee-can-radar',
    title: 'Building a Coffee-Can Radar',
    date: 'Jun 2026',
    published: '2026-06-25',
    minutes: 6,
    summary:
      'How a couple of soup cans, a handful of RF parts, and an audio cable turn into a radar that can measure range and speed.',
    tags: ['Radar', 'RF', 'DSP'],
  },
  {
    slug: 'cfar-detection',
    title: 'CFAR Detection, Intuitively',
    date: 'Jun 2026',
    published: '2026-06-18',
    minutes: 7,
    summary:
      'Why a fixed threshold fails on real radar returns, and how constant-false-alarm-rate detection adapts to the noise around each cell.',
    tags: ['Radar', 'DSP', 'Detection'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Systems & Performance',
    icon: '⌘',
    blurb: 'Low-level C/C++ and GPU code where every microsecond counts.',
    items: ['C / C++', 'CUDA', 'Python', 'Bash', 'Multithreading'],
  },
  {
    title: 'Radar & Signals',
    icon: '〜',
    blurb: 'Turning noisy RF returns into detections and decisions.',
    items: ['Radar', 'Electronic Warfare', 'DSP', 'MATLAB', 'Numerical methods'],
  },
  {
    title: 'Full-Stack & Services',
    icon: '◇',
    blurb: 'The web tooling and APIs that put the systems to work.',
    items: ['React', 'Java', 'Python / FastAPI', 'REST APIs', 'PostgreSQL'],
  },
  {
    title: 'Delivery & Infrastructure',
    icon: '⚙',
    blurb: 'Shipping reliably into secure, air-gapped environments.',
    items: ['Linux / Unix', 'Ansible', 'GitLab CI/CD', 'Air-gapped builds'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Radar Electronic Warfare Software Engineer',
    org: 'Dynetics',
    period: '2025 — Present',
    points: [
      'Develop high-performance, system-level software in C/C++ for radar electronic warfare applications.',
      'Design and optimize GPU-accelerated digital signal processing, with rapid prototyping and validation in MATLAB.',
      'Build full-stack web tooling — Python services with React interfaces — to support engineering workflows.',
      'Architect and automate reliable build and deployment pipelines for secure, isolated computing environments.',
    ],
  },
  {
    role: 'Lead Software Engineer',
    org: 'Interos Inc',
    period: 'Sept 2022 — Feb 2025',
    points: [
      'Migrated the commercial platform to gov-cloud infrastructure for FedRAMP compliance, and moved data stores from Snowflake to PostgreSQL.',
      'Built a geocoding service over 700M+ open-source address records using NLP — the engine behind Interos’ Catastrophic Risk Model.',
      'Developed the AI chat assistant for the Interos platform.',
      'Designed distributed, event-driven web services for supply-chain risk decisioning.',
    ],
    link: {
      label: 'Watch the Catastrophic Risk Model',
      url: 'https://www.youtube.com/watch?v=RXsu0im7vno',
    },
  },
  {
    role: 'Lead Software Engineer',
    org: 'Total System Services (TSYS)',
    period: 'Aug 2018 — Sept 2022',
    points: [
      'Led a team of 7 modernizing legacy mainframe COBOL into cloud-native Java/Spring applications.',
      'Led a team of 4 migrating ColdFusion applications to cloud-ready web apps.',
      'Gathered requirements, reported to stakeholders, and hosted/judged hackathons at companies and universities.',
    ],
  },
  {
    role: 'Software Engineer III',
    org: 'Equifax',
    period: 'Mar 2015 — Aug 2018',
    points: [
      'Maintained and enhanced the credit-risk decisioning pipeline and its domain-specific language and compiler.',
      'Implemented Equifax’s NeuroDecision technology.',
      'Collaborated daily with nine scrum teams across seven countries.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Graduate Studies — Advanced Signal Processing',
    school: 'Johns Hopkins University',
    year: 'Present',
  },
  {
    degree: 'M.S. Electrical Engineering',
    school: 'Auburn University',
    year: '2025',
  },
  {
    degree: 'B.S. Computer Science',
    school: 'Columbus State University',
    year: '2014',
  },
];

export const PUBLICATION = {
  text: 'Farrell, C., Wilson, R., Adams, M., Hagler, C., & Rist, N. (2024). “Development of a Wireless Sensing Module for Propulsion Testing.” AIAA.',
  url: 'https://arc.aiaa.org/doi/10.2514/6.2025-0538',
};

export const GITHUB_URL = 'https://github.com/christopherhagler';

export const PROJECTS: Project[] = [
  {
    name: 'packmule',
    blurb:
      'A multi-registry package bundler written in C that mirrors and packages PyPI, npm, and RPM dependencies for delivery into air-gapped environments.',
    tags: ['C', 'Systems', 'DevOps'],
    link: 'https://github.com/christopherhagler/packmule',
  },
  {
    name: 'radar-simulation',
    blurb:
      'A MATLAB radar simulation modeling returns and signal processing — a sandbox for exploring detection and range/Doppler behavior.',
    tags: ['MATLAB', 'Radar', 'DSP'],
    link: 'https://github.com/christopherhagler/radar-simulation',
  },
  {
    name: 'nvim',
    blurb:
      'My personal Neovim setup — a fast, Lua-configured editing environment tuned for C/C++, Python, and systems work.',
    tags: ['Lua', 'Neovim', 'Tooling'],
    link: 'https://github.com/christopherhagler/nvim',
  },
  {
    name: 'This Site',
    blurb:
      'A modern Angular single-page portfolio with an animated canvas background, deployed to GitHub Pages via Actions.',
    tags: ['Angular', 'TypeScript', 'SCSS'],
    link: 'https://github.com/christopherhagler/christopherhagler.github.io',
  },
];
