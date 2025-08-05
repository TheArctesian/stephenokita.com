# CLAUDE.md - src/styles/

This file provides guidance for working with the modular CSS design system that implements the UNIX philosophy for styling.

## Directory Overview
The `styles/` directory contains the modular CSS design system that provides a consistent, maintainable, and scalable approach to styling across the application.

## Design System Philosophy

### UNIX Philosophy Implementation
- **Modularity**: Each CSS file has a single, well-defined purpose
- **Composability**: Styles can be combined and layered effectively
- **Single Source of Truth**: Design tokens centralize all design decisions
- **Predictability**: Consistent patterns and naming conventions

### Modular Architecture
```
styles/
├── tokens.css     # Design tokens and CSS variables
├── base.css       # HTML element defaults
└── prose.css      # Typography and content styles
```

### Import Order (Critical)
Always import in this specific order:
1. `tokens.css` - Design tokens first
2. `base.css` - Base HTML styles
3. `prose.css` - Content typography
4. TailwindCSS imports

## File-by-File Breakdown

### tokens.css
**Purpose**: Single source of truth for all design values

#### Design Token Categories
- **Colors**: Semantic color system with light/dark theme support
- **Typography**: Font families, sizes, and scale
- **Spacing**: Consistent spacing scale
- **Borders**: Border radius and width values
- **Shadows**: Depth and elevation system
- **Transitions**: Animation timing and easing
- **Breakpoints**: Responsive design breakpoints
- **Z-index**: Layering system

#### Theme System Structure
```css
:root {
  /* Default (dark) theme variables */
  --bg-primary: #2e3440;
  --text-primary: #eceff4;
}

[data-theme="nord-light"] {
  /* Light theme overrides */
  --bg-primary: #fefefe;
  --text-primary: #2e3440;
}

[data-theme="nord-dark"] {
  /* Dark theme (explicit) */
  --bg-primary: #2e3440;
  --text-primary: #eceff4;
}
```

#### Color System (60-30-10 Rule)
- **60%**: Background colors (`--bg-*`)
- **30%**: Secondary colors (`--text-secondary`, `--border-*`)
- **10%**: Accent colors (`--accent-*`, `--status-*`)

#### Color Hierarchy
```css
/* Surface elevation hierarchy */
--bg-primary: #2e3440;      /* Base canvas */
--bg-secondary: #3b4252;    /* Cards, panels */
--bg-tertiary: #434c5e;     /* Interactive surfaces */
--bg-quaternary: #4c566a;   /* Highest priority */

/* Text contrast hierarchy */
--text-primary: #eceff4;    /* High contrast */
--text-secondary: #d8dee9;  /* Medium contrast */
--text-tertiary: #88c0d0;   /* Accent colored */
--text-muted: #4c566a;      /* Low contrast */
```

### base.css
**Purpose**: Fundamental HTML element styling

#### HTML Element Defaults
- Typography baseline
- Form element styling
- Interactive element states
- Accessibility enhancements
- Cross-browser normalization

#### Key Patterns
```css
/* Typography hierarchy */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.2;
}

/* Interactive elements */
button, [role="button"] {
  cursor: pointer;
  border: none;
  background: transparent;
  font: inherit;
}

/* Form elements */
input, textarea, select {
  font: inherit;
  color: var(--text-primary);
  background: var(--bg-secondary);
}
```

### prose.css
**Purpose**: Typography and content styling

#### Content Typography
- Reading-optimized line heights
- Proper content spacing
- Code block styling
- List and table formatting
- Link and emphasis styling

#### Key Features
```css
/* Optimal reading experience */
.prose {
  line-height: 1.75;
  color: var(--text-primary);
}

/* Content spacing */
.prose > * + * {
  margin-top: 1.5rem;
}

/* Code styling */
.prose code {
  background: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}
```

## Design Token System

### Color Token Structure
```css
/* Semantic naming convention */
--{category}-{variant}: {value};

/* Examples */
--bg-primary: #2e3440;        /* Background, primary variant */
--text-secondary: #d8dee9;    /* Text, secondary variant */
--accent-primary: #88c0d0;    /* Accent, primary variant */
--status-error: #bf616a;      /* Status, error variant */
```

### Spacing Scale
```css
/* T-shirt sizing scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
```

### Typography Scale
```css
/* Responsive typography using clamp() */
--font-size-xs: clamp(0.7rem, 1.5vw, 0.8rem);
--font-size-sm: clamp(0.8rem, 2vw, 1rem);
--font-size-base: clamp(1rem, 2.5vw, 1.2rem);
--font-size-lg: clamp(1.5rem, 4vw, 2rem);
--font-size-xl: clamp(2rem, 6vw, 4rem);
```

## Theme System Implementation

### Theme Switching Mechanism
Themes are applied via `data-theme` attribute on the root element:

```javascript
// Theme application
document.documentElement.setAttribute('data-theme', 'nord-light');
```

### Theme Definitions
Each theme overrides specific CSS variables:

```css
/* Nord Light Theme */
[data-theme="nord-light"] {
  --bg-primary: #fefefe;
  --bg-secondary: #f8f9fb;
  --text-primary: #2e3440;
  --text-secondary: #3b4252;
}

/* Nord Dark Theme */
[data-theme="nord-dark"] {
  --bg-primary: #2e3440;
  --bg-secondary: #3b4252;
  --text-primary: #eceff4;
  --text-secondary: #d8dee9;
}
```

### System Preference Support
```css
@media (prefers-color-scheme: light) {
  [data-theme="system"] {
    /* Light mode variables */
  }
}

@media (prefers-color-scheme: dark) {
  [data-theme="system"] {
    /* Dark mode variables */
  }
}
```

## Usage Guidelines

### CSS Variable Usage
Always use CSS variables instead of hardcoded values:

```css
/* Good */
.component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

/* Bad */
.component {
  background-color: #3b4252;
  color: #eceff4;
  padding: 16px;
  border-radius: 8px;
  transition: all 200ms ease;
}
```

### Component Styling Pattern
```css
.component-name {
  /* Layout properties */
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  
  /* Visual properties */
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  
  /* Interactive properties */
  transition: all var(--transition-normal);
  cursor: pointer;
}

.component-name:hover {
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-medium);
}
```

### Responsive Design Patterns
```css
.responsive-component {
  /* Mobile first */
  padding: var(--space-sm);
  font-size: var(--font-size-sm);
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: var(--space-md);
    font-size: var(--font-size-base);
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: var(--space-lg);
    font-size: var(--font-size-lg);
  }
}
```

## Integration with TailwindCSS

### Tailwind Configuration
The design tokens are mapped to Tailwind utilities in `tailwind.config.cjs`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        }
      }
    }
  }
};
```

### Tailwind Usage Patterns
```svelte
<!-- Using Tailwind with design system -->
<div class="bg-bg-secondary text-text-primary p-md rounded-lg">
  Content with design system integration
</div>

<!-- Fallback to CSS variables when Tailwind classes don't exist -->
<div class="p-4" style="background-color: var(--bg-secondary);">
  Content with direct CSS variable usage
</div>
```

## Maintenance Guidelines

### Adding New Design Tokens
1. Add to `tokens.css` in appropriate category
2. Update all theme variants
3. Map to Tailwind if needed
4. Document usage patterns
5. Test across all themes

### Theme Creation Process
1. Define color palette
2. Create theme variables in `tokens.css`
3. Test contrast ratios (WCAG compliance)
4. Update theme switching logic
5. Test all components

### Design System Evolution
- Maintain backward compatibility
- Document breaking changes
- Provide migration guides
- Test across all components
- Update usage documentation

## Performance Considerations

### CSS Custom Properties Performance
- Variables are inherited and cascading
- Minimal runtime performance impact
- Better than JavaScript theme switching
- Efficient browser support

### File Organization Benefits
- Modular loading
- Better caching strategies
- Easier maintenance
- Clear dependency chain

## Accessibility Standards

### Color Contrast Requirements
All color combinations meet WCAG standards:
- **AAA**: Primary text on primary backgrounds
- **AA**: Secondary text and interactive elements
- **High Contrast**: Focus states and error messages

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```