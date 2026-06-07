# CLAUDE.md - src/lib/components/ui/

This file provides guidance for working with the core UI / app-chrome components that form the foundation of the design system.

## Directory Overview
The `ui/` directory contains the app-chrome / interface components (navigation, footer, theme toggle, comments, etc.) that implement the design system patterns and provide consistent experiences across the application.

## Naming convention
All component **filenames are `snake_case`** (e.g. `navigation.svelte`, `theme_toggle.svelte`). The imported identifier stays PascalCase per Svelte (`import Navigation from "./navigation.svelte"`).

## Reusable building blocks live in `shared/`
Cross-page building blocks now live in `src/lib/components/shared/`, **not** here. Reach for those before writing new markup:
- `hero.svelte` - Page hero (title + lede + bottom border)
- `section.svelte` - Section wrapper with eyebrow label + optional meta
- `card.svelte` - Base card (`.nord-card` / border-left variants), optional `href`
- `key_value_grid.svelte` - Responsive label→value(→note) grid
- `pill_list.svelte` - Flex-wrap tag/pill list
- `search_input.svelte` - Search field with icon + clear button
- `empty_state.svelte` - Icon + title + description placeholder

For content grouping, use `shared/card.svelte` rather than adding a card to `ui/`.

## Component Inventory

### navigation.svelte
**Purpose**: Main site navigation with responsive behavior
- Horizontal desktop layout
- Mobile hamburger menu
- Active state indicators
- Accessible keyboard navigation
- Theme-aware styling

**Props**: None (navigation items are hardcoded)
**Dependencies**: Theme store, animation utilities

### footer.svelte
**Purpose**: Site footer with social links and information
- Social media icon links
- Contact information display
- Copyright and legal text
- Responsive column layout
- Consistent with brand identity

**Props**: None (content is static)
**Dependencies**: Social media icons, design tokens

### theme_toggle.svelte
**Purpose**: Theme switching interface component
- Cycle through available themes (nord-light, nord-dark, system)
- System preference detection
- Local storage persistence
- Smooth theme transitions
- Accessible button with proper labeling

**Props**: None (uses theme store)
**Dependencies**: Theme store, browser APIs

### comments.svelte / comment_item.svelte / auth_form.svelte
**Purpose**: Comment system (thread display, individual comment rendering, and the auth form for posting)
- Threaded comment rendering
- Theme-aware styling
- Accessible form controls

### link_preview.svelte
**Purpose**: Hover link previews

### scroll_to_top.svelte
**Purpose**: Scroll-to-top affordance

## Design System Integration

### Color System Usage
All components use CSS variables from the design tokens:
```css
.component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-primary);
}
```

### Spacing System
Components use standardized spacing tokens:
```css
.component {
  padding: var(--space-md);
  margin: var(--space-lg);
  gap: var(--space-sm);
}
```

### Typography Integration
Text components follow typography scale:
```css
.component {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  font-family: var(--font-family-mono);
}
```

## Component Development Standards

### TypeScript Integration
All components use TypeScript:
```svelte
<script lang="ts">
  // Define props interface
  export interface Props {
    variant?: 'default' | 'primary';
    disabled?: boolean;
  }

  // Destructure props with defaults
  let { variant = 'default', disabled = false }: Props = $props();
</script>
```

### Accessibility Requirements
Each component must include:
- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader announcements
- High contrast support

#### Example Accessibility Implementation
```svelte
<button
  class="theme-toggle"
  on:click={cycleTheme}
  aria-label="Switch theme (currently {currentTheme})"
  title="Switch between light and dark themes"
>
  <!-- Icon content -->
</button>
```

### Responsive Design Patterns
Components use mobile-first responsive design:
```css
.navigation {
  /* Mobile styles */
  @apply flex-col;

  /* Tablet and desktop */
  @media (min-width: 768px) {
    @apply flex-row;
  }
}
```

### Animation and Transitions
All animations follow consistent patterns:
```css
.interactive-element {
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-none);
  }
}
```

## Component Usage Guidelines

### Navigation
```svelte
<!-- Place in layout -->
<Navigation />
```

Best practices:
- Use only once per page
- Place in consistent location
- Ensure proper semantic structure

### ThemeToggle
```svelte
<!-- Minimal usage -->
<ThemeToggle />
```

Best practices:
- Place in consistent location (header/nav)
- Ensure theme persistence works
- Test theme switching thoroughly

### Cards and other reusable patterns
For content grouping and other cross-page patterns, import from `shared/`:
```svelte
<script lang="ts">
  import Card from '$lib/components/shared/card.svelte';
</script>

<Card href="/blog/some-post">
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</Card>
```

Best practices:
- Use for content grouping
- Consider accessibility for clickable cards

## Styling Guidelines

### CSS Class Structure
Follow BEM-like naming for component-specific classes:
```css
.component-name {
  /* Base styles */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}
```

### Design Token Usage
Always use design tokens instead of hardcoded values:
```css
/* Good */
.component {
  color: var(--text-primary);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
}

/* Bad */
.component {
  color: #eceff4;
  padding: 16px;
  border-radius: 8px;
}
```

### Theme Support
Ensure all components work in both light and dark themes:
```css
.component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);

  /* Use theme-aware colors */
  border: 1px solid var(--border-primary);
}
```

## Performance Considerations

### Bundle Size Optimization
- Import only necessary dependencies
- Use dynamic imports for heavy components
- Avoid unused CSS
- Optimize asset loading

### Runtime Performance
- Minimize DOM manipulations
- Use efficient event handling
- Implement proper component boundaries
- Cache expensive computations

### Animation Performance
- Use CSS transforms over layout properties
- Prefer `transform` and `opacity` for animations
- Use `will-change` sparingly
- Test on low-end devices

## Testing Guidelines

### Component Testing
Each component should have:
- Unit tests for logic
- Accessibility tests
- Visual regression tests
- Cross-browser compatibility tests

## Maintenance Guidelines

### Version Updates
When updating components:
1. Maintain backward compatibility when possible
2. Document breaking changes
3. Update all usage examples
4. Test across different themes
5. Verify accessibility compliance

### Code Quality
- Run TypeScript checks
- Lint with consistent rules
- Format with Prettier
- Validate HTML semantics
- Check WCAG compliance
