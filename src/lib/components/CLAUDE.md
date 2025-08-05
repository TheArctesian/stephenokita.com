# CLAUDE.md - src/lib/components/

This file provides guidance for working with the components directory containing all reusable UI components.

## Directory Overview
The `components/` directory contains reusable Svelte components organized by purpose and complexity level.

## Directory Structure

### UI Components (`ui/`)
Core reusable interface elements:
- `Navigation.svelte` - Responsive navigation system
- `Footer.svelte` - Social links and contact information
- `Card.svelte` - Flexible card component with variants
- `AnimatedText.svelte` - Text animation utilities
- `ThemeToggle.svelte` - Theme switching interface

### Blog Components (`blog/`)
Content-specific components:
- `hyper.svelte` - Hypertext content display
- `instaphoto.svelte` - Instagram-style photo component
- `maslos.svelte` / `maslos2.svelte` - Maslow's hierarchy visualizations
- `philmap.svelte` - Philosophy concept mapping
- `erg.svelte` - Ergonomic content layout
- `maps/distromap.svelte` - Linux distribution timeline diagram

### Legacy Components (Root Level)
Direct component files (being phased out):
- `blogEntery.svelte` - Blog entry display
- `pagetransition.svelte` - Page transition effects
- `post-card.svelte` - Post card layout
- `Collapsible.svelte` - Collapsible content container

## Component Architecture

### Design System Principles
- **Consistency**: All components follow the same design patterns
- **Modularity**: Components can be combined and reused
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Responsiveness**: Mobile-first responsive design
- **Theming**: Support for light/dark mode via CSS variables

### Component Composition Patterns
```svelte
<!-- Example composition -->
<Card variant="elevated">
  <AnimatedText animation="fadeIn" delay={200}>
    {content}
  </AnimatedText>
</Card>
```

## UI Components Guidelines

### Navigation.svelte
Responsive navigation component with:
- Mobile hamburger menu
- Desktop horizontal layout
- Active state indicators
- Accessibility support
- Theme integration

**Usage**:
```svelte
<Navigation />
```

### Footer.svelte
Site footer with:
- Social media links
- Contact information
- Copyright notice
- Responsive layout

**Usage**:
```svelte
<Footer />
```

### Card.svelte
Flexible card component supporting:
- Multiple variants (default, elevated, outlined)
- Custom content slots
- Hover effects
- Consistent spacing

**Props**:
- `variant?: 'default' | 'elevated' | 'outlined'`
- `padding?: 'sm' | 'md' | 'lg'`

**Usage**:
```svelte
<Card variant="elevated" padding="lg">
  <h2>Card Title</h2>
  <p>Card content...</p>
</Card>
```

### AnimatedText.svelte
Text animation wrapper with:
- Multiple animation types
- Configurable delays
- Performance optimization
- Intersection observer integration

**Props**:
- `animation: 'fadeIn' | 'slideIn' | 'typewriter'`
- `delay?: number`
- `duration?: number`

### ThemeToggle.svelte
Theme switching component with:
- Multiple theme support (nord-light, nord-dark, system)
- System preference detection
- Local storage persistence
- Smooth transitions

## Blog Components Guidelines

### Content Visualization Components
Specialized components for content display:

#### philmap.svelte
Interactive philosophy concept map with:
- Mermaid.js integration
- Zoom and pan controls
- Responsive layout
- Touch support

#### distromap.svelte
Linux distribution timeline with:
- Gantt chart visualization
- Interactive controls
- Mobile optimization
- Accessibility features

#### instaphoto.svelte
Instagram-style photo display with:
- Aspect ratio preservation
- Loading states
- Error handling
- Lazy loading

### Content Layout Components

#### maslos.svelte / maslos2.svelte
Maslow's hierarchy visualizations:
- Pyramid structure
- Interactive elements
- Educational content
- Responsive design

## Component Development Guidelines

### Creating New Components

1. **Location Decision**:
   - `ui/` for reusable interface elements
   - `blog/` for content-specific components
   - Root level only for legacy support

2. **File Structure**:
   ```svelte
   <script lang="ts">
     // Props interface
     export interface Props {
       // Define props with types
     }
     
     // Component logic
   </script>
   
   <!-- Template -->
   
   <style>
     /* Component-specific styles */
   </style>
   ```

3. **TypeScript Usage**:
   - Define prop interfaces
   - Use proper type annotations
   - Export types for consumers

4. **Styling Approach**:
   - Use CSS variables for theming
   - Apply design system classes
   - Avoid hardcoded colors/spacing
   - Support dark/light modes

### Component Standards

#### Accessibility Requirements
- Proper semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility

#### Performance Considerations
- Lazy loading for heavy components
- Efficient re-rendering strategies
- Proper component boundaries
- Optimized animations

#### Error Handling
- Graceful fallbacks
- Loading states
- Error boundaries
- User-friendly error messages

### Styling Guidelines

#### CSS Variables Usage
```css
.component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}
```

#### Responsive Design
```css
.component {
  /* Mobile first */
  @apply p-md;
  
  /* Tablet and up */
  @media (min-width: 768px) {
    @apply p-lg;
  }
}
```

#### Animation Best Practices
```css
.animated-element {
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
}
```

## Component Testing

### Testing Strategies
- Unit tests for component logic
- Visual regression tests
- Accessibility testing
- Cross-browser testing

### Testing Tools
- Svelte Testing Library
- Jest for unit tests
- Playwright for E2E tests
- axe-core for accessibility

## Migration Guidelines

### Legacy Component Updates
When updating legacy components:
1. Move to appropriate subdirectory (`ui/` or `blog/`)
2. Update import paths throughout codebase
3. Standardize prop interfaces
4. Apply current styling patterns
5. Add proper TypeScript types

### Breaking Changes
When making breaking changes:
1. Update component version
2. Provide migration guide
3. Update all usage examples
4. Test thoroughly across app