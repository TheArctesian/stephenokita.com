# CLAUDE.md - src/lib/components/blog/

This file provides guidance for working with blog-specific components that handle content visualization and specialized layouts.

## Directory Overview
The `blog/` directory contains components specifically designed for blog content, including interactive diagrams, content visualizations, and specialized layouts that enhance the reading experience.

## Component Inventory

### Content Display Components

#### hyper.svelte
**Purpose**: Hypertext content display with enhanced interactivity
- Rich text rendering
- Link preview functionality
- Contextual information display
- Performance optimized loading

#### instaphoto.svelte
**Purpose**: Instagram-style photo component for blog posts
- Square aspect ratio preservation
- Lazy loading implementation
- Error state handling
- Accessibility features for images
- Caption support

#### erg.svelte
**Purpose**: Ergonomic content layout for better readability
- Optimal line length and spacing
- Reading flow optimization
- Typography enhancements
- Responsive text scaling

### Data Visualization Components

#### maslos.svelte & maslos2.svelte
**Purpose**: Maslow's hierarchy of needs visualization
- Interactive pyramid structure
- Educational content overlays
- Progressive disclosure of information
- Touch and keyboard navigation
- Two different visual approaches

**Key Features**:
- Responsive design for mobile and desktop
- Color-coded hierarchy levels
- Hover states and interactions
- Accessibility compliance

#### philmap.svelte
**Purpose**: Philosophy concept mapping and visualization
- Interactive concept relationships
- Mermaid.js integration for diagrams
- Zoom and pan functionality
- Educational tooltips and information

**Dependencies**: Mermaid.js, custom styling

### Interactive Diagram Components

#### maps/distromap.svelte
**Purpose**: Linux distribution timeline visualization
- Gantt chart representation
- Interactive timeline controls
- Zoom and pan functionality
- Touch support for mobile
- Educational annotations

**Features**:
- Custom zoom controls
- Drag-to-pan functionality
- Responsive scaling
- Performance optimization for large datasets
- Accessibility features

## Technical Implementation

### Mermaid.js Integration
Several components use Mermaid.js for diagram rendering:

```svelte
<script>
  import mermaid from 'mermaid';
  import { onMount } from 'svelte';
  
  onMount(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });
  });
</script>
```

### Interactive Controls Pattern
Common pattern for zoom/pan controls:

```svelte
<div class="controls">
  <button on:click={zoomIn} aria-label="Zoom in">+</button>
  <button on:click={zoomOut} aria-label="Zoom out">-</button>
  <button on:click={resetZoom} aria-label="Reset zoom">Reset</button>
</div>
```

### Responsive Design Approach
All components use mobile-first responsive design:

```css
.diagram-container {
  /* Mobile styles */
  height: 60vh;
  
  /* Desktop styles */
  @media (min-width: 768px) {
    height: 80vh;
  }
}
```

## Component Development Guidelines

### Creating Visualization Components

1. **Performance First**:
   - Lazy load heavy dependencies
   - Use intersection observers
   - Implement efficient rendering
   - Cache expensive calculations

2. **Accessibility Requirements**:
   - Keyboard navigation
   - Screen reader descriptions
   - High contrast support
   - Alternative text for visuals

3. **Mobile Optimization**:
   - Touch-friendly controls
   - Responsive scaling
   - Optimized interactions
   - Performance on low-end devices

### Interactive Features Implementation

#### Zoom and Pan Functionality
```svelte
<script>
  let scale = 1;
  let isDragging = false;
  
  function handleWheel(event) {
    if (event.ctrlKey) {
      event.preventDefault();
      scale += event.deltaY > 0 ? -0.1 : 0.1;
      scale = Math.max(0.5, Math.min(scale, 3));
    }
  }
  
  function handleMouseDown(event) {
    isDragging = true;
    // Handle drag start
  }
</script>
```

#### Touch Support
```svelte
<script>
  function handleTouchStart(event) {
    if (event.touches.length === 1) {
      // Single finger pan
    } else if (event.touches.length === 2) {
      // Pinch zoom
    }
  }
</script>
```

## Styling Guidelines

### Diagram Container Patterns
```css
.diagram-container {
  width: 100%;
  height: 80vh;
  overflow: auto;
  position: relative;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
}
```

### Control Button Styling
```css
.controls button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.controls button:hover {
  background: var(--bg-tertiary);
  transform: translateY(-1px);
}
```

### Interactive Element States
```css
.interactive-element {
  cursor: pointer;
  transition: all var(--transition-normal);
}

.interactive-element:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-medium);
}

.interactive-element:active {
  transform: scale(0.95);
}
```

## Performance Optimization

### Heavy Component Loading
```svelte
<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  let componentLoaded = false;
  
  onMount(async () => {
    if (browser) {
      // Load heavy dependencies only in browser
      const mermaid = await import('mermaid');
      componentLoaded = true;
    }
  });
</script>
```

### Intersection Observer Usage
```svelte
<script>
  import { onMount } from 'svelte';
  
  let element;
  let isVisible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>
```

## Accessibility Standards

### ARIA Labels and Descriptions
```svelte
<div
  role="img"
  aria-label="Interactive diagram showing Linux distribution timeline"
  aria-describedby="diagram-description"
>
  <!-- Diagram content -->
</div>

<div id="diagram-description" class="sr-only">
  Detailed description of the diagram for screen readers
</div>
```

### Keyboard Navigation
```svelte
<div
  tabindex="0"
  on:keydown={(e) => {
    switch(e.key) {
      case 'ArrowLeft':
        panLeft();
        break;
      case 'ArrowRight':
        panRight();
        break;
      case '+':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
    }
  }}
>
  <!-- Interactive content -->
</div>
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Testing Guidelines

### Component Testing
- Test interactive features
- Verify accessibility compliance
- Check responsive behavior
- Validate performance metrics

### Cross-Browser Testing
- Modern browsers support
- Touch device functionality
- Keyboard navigation
- Screen reader compatibility

## Maintenance Guidelines

### Dependency Updates
- Keep Mermaid.js updated
- Monitor performance impact
- Test diagram rendering
- Verify accessibility features

### Component Evolution
- Gather user feedback
- Analyze usage patterns
- Optimize performance bottlenecks
- Enhance accessibility features