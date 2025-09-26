// Application constants - single source of truth

export const SITE_CONFIG = {
  name: 'Stephen Okita',
  title: 'Stephen Daniel Okita',
  description: 'Personal website and blog of Stephen Daniel Okita',
  url: 'https://stephenokita.com',
  email: 'me@stephenokita.com',
  github: 'https://github.com/TheArctesian',
  linkedin: 'https://www.linkedin.com/in/stephen-okita/',
  instagram: 'https://www.instagram.com/stephen.okita/',
  calendar: 'https://cal.com/stephenokita',
} as const;

export const ROUTES = {
  HOME: '/',
  SKILLS: '/skills',
  PERSON: '/person',
  PROJECTS: '/projects',
  BLOG: '/blog',
  META: '/meta/you',
} as const;

export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  SKILLS: '/api/skills',
  SKILL_CATEGORIES: '/api/skills/categories',
  PROJECTS: '/api/projects',
  QUOTES: '/api/personal/quotes',
} as const;

export const COLORS = {
  PRIMARY: '#bd93f9',
  SECONDARY: '#6272a4',
  SUCCESS: '#50fa7b',
  WARNING: '#ffb86c',
  ERROR: '#ff5555',
  INFO: '#8be9fd',
  BACKGROUND: '#282a36',
  FOREGROUND: '#f8f8f2',
  SELECTION: '#44475a',
} as const;

export const BREAKPOINTS = {
  MOBILE: 500,
  TABLET: 900,
  DESKTOP: 1200,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const Z_INDEX = {
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL: 40,
  TOOLTIP: 50,
} as const;