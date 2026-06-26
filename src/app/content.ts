/* ---------------------------------------------------------------------------
   Site content. Edit these arrays to update the site — no template changes
   needed. Placeholder entries are marked; swap in your real details.
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

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Software',
    icon: '⌘',
    items: ['TypeScript', 'Python', 'C / C++', 'Rust', 'Angular', 'Node.js'],
  },
  {
    title: 'Signals & RF',
    icon: '〜',
    items: ['Radar (FMCW / pulse)', 'LiDAR', 'DSP', 'MATLAB', 'GNU Radio'],
  },
  {
    title: 'Electrical Eng.',
    icon: '⚡',
    items: ['PCB design', 'Embedded / MCU', 'FPGA', 'Analog front-ends', 'Sensors'],
  },
  {
    title: 'Tooling',
    icon: '⚙',
    items: ['Git', 'Linux', 'Docker', 'CI/CD', 'Cloud'],
  },
];

// TODO: replace with your real roles.
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software / Electrical Engineer',
    org: 'Your Company',
    period: '2023 — Present',
    points: [
      'Design and build software and signal-processing systems end to end.',
      'Work across radar and LiDAR sensing pipelines from RF front-end to data.',
      'Ship production tooling and infrastructure for high-throughput workloads.',
    ],
  },
  {
    role: 'Engineering Intern',
    org: 'Previous Org',
    period: '2022 — 2023',
    points: [
      'Prototyped embedded firmware and hardware test fixtures.',
      'Automated data collection and analysis for sensor characterization.',
    ],
  },
];

// TODO: replace with your real projects + links.
export const PROJECTS: Project[] = [
  {
    name: 'Radar Signal Toolkit',
    blurb:
      'Processing pipeline for FMCW radar — range/Doppler maps, CFAR detection, and clustering, with a real-time visualizer.',
    tags: ['Python', 'DSP', 'NumPy'],
    link: 'https://github.com/christopherhagler',
  },
  {
    name: 'LiDAR Point-Cloud Viewer',
    blurb:
      'GPU-accelerated viewer for streaming LiDAR scans with segmentation and frame-by-frame inspection.',
    tags: ['C++', 'OpenGL', 'LiDAR'],
    link: 'https://github.com/christopherhagler',
  },
  {
    name: 'This Site',
    blurb:
      'A modern Angular single-page portfolio with an animated canvas background, deployed to GitHub Pages via Actions.',
    tags: ['Angular', 'TypeScript', 'SCSS'],
    link: 'https://github.com/christopherhagler/christopherhagler.github.io',
  },
];
