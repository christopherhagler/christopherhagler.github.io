/* ---------------------------------------------------------------------------
   Site content. Edit these arrays to update the site — no template changes
   needed.
   --------------------------------------------------------------------------- */

export interface SkillGroup {
  title: string;
  icon: string; // emoji or short glyph
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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages',
    icon: '⌘',
    items: ['C / C++', 'Python', 'Java', 'CUDA', 'x86 Assembly', 'SQL'],
  },
  {
    title: 'Signals & RF',
    icon: '〜',
    items: ['Radar', 'Electronic Warfare', 'DSP', 'MATLAB', 'Numerical methods'],
  },
  {
    title: 'Web & Frameworks',
    icon: '◇',
    items: ['React', 'Angular', 'FastAPI', 'Spring / Spring Boot', 'REST APIs'],
  },
  {
    title: 'Platforms & DevOps',
    icon: '⚙',
    items: ['GitLab CI/CD', 'Ansible', 'Linux / Unix', 'Air-gapped systems', 'PostgreSQL'],
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
