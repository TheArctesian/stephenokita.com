/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Fira Code", "JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      colors: {
        // UNIX Philosophy: Single source of truth through CSS variables
        // These map directly to our modular CSS variables
        
        // Surface colors
        'bg': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
        },
        
        // Text colors
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
        },
        
        // Accent colors - Following 60-30-10 design rule
        'accent': {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          tertiary: 'var(--accent-tertiary)',
          emphasis: 'var(--accent-emphasis)',
          // Legacy aliases
          cyan: 'var(--accent-tertiary)',
          blue: 'var(--accent-emphasis)',
        },
        
        // Status colors (consistent across themes)
        'status': {
          error: 'var(--status-error)',
          warning: 'var(--status-warning)',
          info: 'var(--status-info)',
          success: 'var(--status-success)',
          purple: 'var(--status-purple)',
        },
        
        
        // Legacy support (gradually remove these)
        d: {
          bg: 'var(--color-bg)',
          fg: 'var(--color-fg)',
          comment: 'var(--color-comment)',
          selection: 'var(--color-selection)',
          cyan: 'var(--color-cyan)',
          green: 'var(--color-green)',
          orange: 'var(--color-orange)',
          pink: 'var(--color-pink)',
          purple: 'var(--color-purple)',
          red: 'var(--color-red)',
          yellow: 'var(--color-yellow)',
        },
      },
      
      // Border colors configuration
      borderColor: {
        DEFAULT: 'var(--border-primary)',
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
      },
      
      // Hyprland-inspired spacing and sizing
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
      },
      
      // Standardized border radius system
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',    // 4px
        'DEFAULT': '0.5rem', // 8px - our standard
        'md': '0.5rem',     // 8px 
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      
      // Animation timings for smooth interactions
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      
      // Box shadows for depth and elevation
      boxShadow: {
        'soft': '0 2px 8px rgba(46, 52, 64, 0.1)',
        'medium': '0 4px 16px rgba(46, 52, 64, 0.15)',
        'strong': '0 8px 32px rgba(46, 52, 64, 0.2)',
        'glow': '0 0 20px rgba(136, 192, 208, 0.3)',
      },
    },
  },
  plugins: [],
};
