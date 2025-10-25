import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// UNIX Philosophy: Simple, modular theme system
// Each theme is just a data-theme attribute value
type ThemeName = 'nord-light' | 'nord-dark' | 'sketched' | 'whiteboard' | 'cthulhu' | 'system';

// Available themes - easily extensible for new rice configurations
export const AVAILABLE_THEMES = {
  'nord-light': 'Light',
  'nord-dark': 'Dark',
  'sketched': 'Sketched',
  'whiteboard': 'Whiteboard',
  'cthulhu': 'Cthulhu',
  'system': 'System'
} as const;

// Create the theme store following UNIX philosophy: do one thing well
function createThemeStore() {
  const { subscribe, set } = writable<ThemeName>('nord-dark');

  return {
    subscribe,
    
    // Single responsibility: set theme
    setTheme: (themeName: ThemeName) => {
      if (browser) {
        localStorage.setItem('theme', themeName);
        applyTheme(themeName);
        set(themeName);
      }
    },
    
    // Single responsibility: initialize theme
    init: () => {
      if (browser) {
        const stored = localStorage.getItem('theme') as ThemeName | null;
        const theme = stored || 'nord-dark';
        applyTheme(theme);
        set(theme);
      }
    },
    
    // Single responsibility: cycle through themes
    cycle: () => {
      if (browser) {
        const current = localStorage.getItem('theme') as ThemeName || 'nord-dark';
        const themes = Object.keys(AVAILABLE_THEMES) as ThemeName[];
        const currentIndex = themes.indexOf(current);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
        set(nextTheme);
      }
    }
  };
}

// Single responsibility: apply theme to DOM
function applyTheme(themeName: ThemeName) {
  if (!browser) return;
  
  const root = document.documentElement;
  
  // Remove all theme classes
  Object.keys(AVAILABLE_THEMES).forEach(theme => {
    root.removeAttribute('data-theme');
  });
  
  // Apply new theme
  root.setAttribute('data-theme', themeName);
}

// Single responsibility: listen for system changes
if (browser) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const currentTheme = localStorage.getItem('theme') as ThemeName | null;
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
}

export const theme = createThemeStore();