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
      'Build system-level software in C/C++ for radar electronic warfare systems.',
      'Implement DSP algorithms accelerated on CUDA, prototyped and validated in MATLAB.',
      'Develop Python web services with React front ends for operator tooling.',
      'Automate deployments across 32-server air-gapped environments with Ansible, and maintain GitLab CI/CD pipelines.',
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

export const PUBLICATION =
  'Farrell, C., Wilson, R., Adams, M., Hagler, C., & Rist, N. (2024). “Development of a Wireless Sensing Module for Propulsion Testing.” AIAA Journal.';

export const PROJECTS: Project[] = [
  {
    name: 'MIT Coffee-Can Radar',
    blurb:
      'A small FMCW radar built from the MIT design — measures range and the speed of moving targets via Doppler processing.',
    tags: ['Radar', 'DSP', 'Analog'],
  },
  {
    name: 'Signal Processing Library',
    blurb:
      'A DSP library built from numerical methods up — filters, transforms, and spectral tools written to deepen radar and DSP fundamentals.',
    tags: ['DSP', 'Numerical Methods', 'MATLAB'],
  },
  {
    name: 'Digital Image Processing Library',
    blurb:
      'An image-processing library covering filtering, transforms, and segmentation, built as a learning aid for digital image processing.',
    tags: ['Image Processing', 'C++'],
  },
  {
    name: 'Intel x86 Bootloader',
    blurb:
      'A bootloader for x86 that brings the machine up from real mode into protected mode — low-level systems programming in assembly.',
    tags: ['x86 Assembly', 'Systems'],
  },
  {
    name: 'This Site',
    blurb:
      'A modern Angular single-page portfolio with an animated canvas background, deployed to GitHub Pages via Actions.',
    tags: ['Angular', 'TypeScript', 'SCSS'],
    link: 'https://github.com/christopherhagler/christopherhagler.github.io',
  },
];
