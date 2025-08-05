import { elasticOut, elasticIn, bounceOut, backOut } from 'svelte/easing';

// Animation presets following Unix philosophy: simple, composable functions
export interface AnimationConfig {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  x?: number;
  y?: number;
  start?: number;
}

// Random utility functions
export const getRandomDelay = (min = 0, max = 1500): number => 
  min + Math.random() * (max - min);

export const getRandomDuration = (min = 300, max = 1000): number => 
  min + Math.random() * (max - min);

export const getRandomDirection = (): { x: number; y: number } => ({
  x: (Math.random() - 0.5) * 200,
  y: (Math.random() - 0.5) * 200
});

// Predefined animation configurations
export const animationPresets = {
  // Entrance animations
  fadeIn: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration()
  }),

  slideInLeft: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    x: -100,
    easing: elasticOut
  }),

  slideInRight: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    x: 100,
    easing: elasticOut
  }),

  slideInUp: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    y: 100,
    easing: elasticOut
  }),

  slideInDown: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    y: -100,
    easing: elasticOut
  }),

  scaleIn: (startScale = 0): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    start: startScale,
    easing: bounceOut
  }),

  scaleInRandom: (): AnimationConfig => ({
    delay: getRandomDelay(),
    duration: getRandomDuration(),
    start: Math.random() * 2,
    easing: elasticOut
  }),

  flyInRandom: (): AnimationConfig => {
    const direction = getRandomDirection();
    return {
      delay: getRandomDelay(),
      duration: getRandomDuration(),
      x: direction.x,
      y: direction.y,
      easing: elasticOut
    };
  },

  // Specialized animations for text
  textFlyIn: (): AnimationConfig => ({
    delay: getRandomDelay(0, 300),
    duration: getRandomDuration(200, 600),
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
    easing: elasticOut
  }),

  textScale: (): AnimationConfig => ({
    delay: getRandomDelay(0, 500),
    duration: getRandomDuration(300, 800),
    start: 0.5 + Math.random() * 1.5,
    easing: bounceOut
  }),

  // Interactive hover states
  hoverLift: {
    duration: 200,
    y: -2,
    easing: elasticOut
  },

  hoverScale: {
    duration: 200,
    start: 1.05,
    easing: elasticOut
  }
};

// Animation timing functions
export const timingFunctions = {
  fast: 150,
  normal: 300,
  slow: 500,
  elastic: elasticOut,
  bounce: bounceOut,
  back: backOut,
  easeIn: elasticIn
};

// Stagger animation helper
export const createStaggeredAnimation = (
  baseConfig: AnimationConfig,
  index: number,
  staggerDelay = 100
): AnimationConfig => ({
  ...baseConfig,
  delay: (baseConfig.delay || 0) + (index * staggerDelay)
});

// Animation sequences for complex layouts
export const createNameCollageAnimation = (totalElements: number) => {
  const animations = [];
  
  for (let i = 0; i < totalElements; i++) {
    const animationType = Math.floor(Math.random() * 4);
    
    switch (animationType) {
      case 0:
        animations.push(animationPresets.textFlyIn());
        break;
      case 1:
        animations.push(animationPresets.textScale());
        break;
      case 2:
        animations.push(animationPresets.slideInLeft());
        break;
      default:
        animations.push(animationPresets.fadeIn());
    }
  }
  
  return animations;
};