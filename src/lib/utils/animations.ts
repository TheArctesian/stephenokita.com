import { elasticOut, elasticIn, bounceOut, backOut, quintOut, quartOut, expoOut } from 'svelte/easing';

// Modern Animation System - Coherent, performance-focused, accessible
export interface AnimationConfig {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  x?: number;
  y?: number;
  start?: number;
}

// Modern Animation Timing System
export const ANIMATION_TIMINGS = {
  instant: 0,
  snappy: 150,      // Quick interactions
  smooth: 250,      // Standard transitions
  gentle: 400,      // Content entrance
  dramatic: 600,    // Hero/special animations
  slow: 800,        // Complex sequences
} as const;

// Modern Easing Functions
export const EASINGS = {
  // Sharp - For quick interactions and feedback
  sharp: quartOut,
  // Smooth - For content and navigation
  smooth: quintOut,
  // Bouncy - For special moments and celebrations
  bouncy: elasticOut,
  // Dramatic - For hero animations and page transitions
  dramatic: expoOut,
  // Gentle - For content reveals
  gentle: quintOut,
} as const;

// Stagger Timing System
export const STAGGER = {
  tight: 50,    // List items
  normal: 100,  // Cards, sections
  wide: 200,    // Major sections
  dramatic: 300, // Hero sequences
} as const;

// Modern Animation Presets
export const modernAnimations = {
  // === CONTENT ENTRANCE ANIMATIONS ===

  // Gentle fade for text and content
  contentFade: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.gentle,
    easing: EASINGS.gentle
  }),

  // Smooth slide up for cards and sections
  slideUp: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.smooth,
    y: 24,
    easing: EASINGS.smooth
  }),

  // Slide from left for navigation items
  slideLeft: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.smooth,
    x: -32,
    easing: EASINGS.smooth
  }),

  // Slide from right for secondary content
  slideRight: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.smooth,
    x: 32,
    easing: EASINGS.smooth
  }),

  // Gentle scale for interactive elements
  scaleIn: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.smooth,
    start: 0.95,
    easing: EASINGS.smooth
  }),

  // === INTERACTION ANIMATIONS ===

  // Quick feedback for buttons
  buttonPress: {
    duration: ANIMATION_TIMINGS.snappy,
    start: 0.98,
    easing: EASINGS.sharp
  },

  // Hover lift for cards
  cardHover: {
    duration: ANIMATION_TIMINGS.snappy,
    y: -4,
    easing: EASINGS.sharp
  },

  // Gentle scale for hover states
  hoverScale: {
    duration: ANIMATION_TIMINGS.snappy,
    start: 1.02,
    easing: EASINGS.sharp
  },

  // === HERO AND SPECIAL ANIMATIONS ===

  // Dramatic hero entrance
  heroEntrance: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.dramatic,
    y: 48,
    easing: EASINGS.dramatic
  }),

  // Bouncy celebration animation
  celebration: (delay = 0): AnimationConfig => ({
    delay,
    duration: ANIMATION_TIMINGS.gentle,
    start: 0.8,
    easing: EASINGS.bouncy
  }),

  // === PAGE TRANSITIONS ===

  // Smooth page in
  pageIn: {
    duration: ANIMATION_TIMINGS.gentle,
    y: 16,
    easing: EASINGS.gentle
  },

  // Quick page out
  pageOut: {
    duration: ANIMATION_TIMINGS.smooth,
    y: -16,
    easing: EASINGS.sharp
  }
};

// === ANIMATION UTILITIES ===

// Create staggered animations for sequences
export const createStagger = (
  animationFn: (delay: number) => AnimationConfig,
  count: number,
  staggerDelay: number = STAGGER.normal,
  baseDelay: number = 0
): AnimationConfig[] => {
  return Array.from({ length: count }, (_, index) =>
    animationFn(baseDelay + (index * staggerDelay))
  );
};

// Create entrance sequence for sections
export const createEntranceSequence = (elements: string[]) => {
  return elements.map((element, index) => ({
    element,
    animation: modernAnimations.slideUp(index * STAGGER.normal)
  }));
};

// Animation helpers for common patterns
export const animationHelpers = {
  // Stagger cards in a grid
  staggerCards: (count: number, baseDelay = 0) =>
    createStagger(modernAnimations.slideUp, count, STAGGER.normal, baseDelay),

  // Animate list items
  staggerList: (count: number, baseDelay = 0) =>
    createStagger(modernAnimations.slideLeft, count, STAGGER.tight, baseDelay),

  // Hero sequence animation
  heroSequence: () => [
    modernAnimations.heroEntrance(0),
    modernAnimations.contentFade(STAGGER.normal),
    modernAnimations.slideUp(STAGGER.wide)
  ],

  // Page transition sequence
  pageTransition: {
    out: modernAnimations.pageOut,
    in: modernAnimations.pageIn
  }
};

// Accessibility: Respect reduced motion
export const getAnimation = (config: AnimationConfig): AnimationConfig => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      ...config,
      duration: ANIMATION_TIMINGS.instant,
      delay: 0,
      x: 0,
      y: 0,
      start: 1
    };
  }
  return config;
};

// Legacy support (deprecated, use modernAnimations instead)
export const animationPresets = {
  fadeIn: () => modernAnimations.contentFade(),
  slideInUp: () => modernAnimations.slideUp(),
  slideInLeft: () => modernAnimations.slideLeft(),
  slideInRight: () => modernAnimations.slideRight(),
  scaleIn: () => modernAnimations.scaleIn(),
  hoverLift: modernAnimations.cardHover,
  hoverScale: modernAnimations.hoverScale
};