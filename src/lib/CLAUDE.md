# CLAUDE.md - src/lib/

This file provides guidance for working with the shared library directory containing reusable components, utilities, and business logic.

## Directory Overview
The `lib/` directory houses all shared code including UI components, data services, utilities, and type definitions that are used across the application.

## Directory Structure

### Components (`components/`)
- **UI Components** (`ui/`): Core reusable UI elements
- **Blog Components** (`blog/`): Content-specific components
- **Legacy Components**: Direct component files (being phased out)

### Services (`services/`)
Business logic layer for data operations:
- `skills.ts` - Skills and categories management
- `projects.ts` - Projects and categories management  
- `personal.ts` - Personal content (quotes, music, etc.)

### Database (`db/`)
Database configuration and schema:
- `config.ts` - Database connection setup
- `schema.ts` - Drizzle ORM table definitions

### Utilities (`utils/`)
Helper functions organized by purpose:
- `animations.ts` - Animation presets and helpers
- `format.ts` - Text and date formatting utilities
- `http.ts` - API client and HTTP utilities
- `index.ts` - Main utility exports

### Stores (`stores/`)
Client-side state management:
- `theme.ts` - Theme switching and persistence

### Constants (`constants/`)
Application-wide constant values:
- `index.ts` - Centralized constants

## Architecture Patterns

### Service Layer Pattern
Services provide a clean abstraction over database operations:
```typescript
// Example service method
export async function getSkillsByCategory(category?: string) {
  // Business logic + database interaction
}
```

### Component Composition
Components are designed for reusability and composition:
- Atomic design principles
- Props-based customization
- Consistent API patterns

### Utility Organization
Utilities follow single-responsibility principle:
- Pure functions where possible
- Clear input/output contracts
- Proper error handling

## Component Guidelines

### UI Components (`ui/`)
- **Navigation.svelte**: Responsive navigation system
- **Footer.svelte**: Social links and contact info
- **Card.svelte**: Reusable card component with variants
- **AnimatedText.svelte**: Standardized text animations
- **ThemeToggle.svelte**: Theme switching interface

#### Component Standards
- Use TypeScript for props
- Export prop interfaces
- Include proper accessibility attributes
- Follow design system patterns

### Blog Components (`blog/`)
Specialized components for content display:
- Interactive diagrams and maps
- Content-specific visualizations
- Reusable content patterns

## Service Layer Guidelines

### Database Services
Each service handles one domain:
```typescript
// Skills service example
export const skillsService = {
  getAll: () => Promise<Skill[]>,
  getByCategory: (category: string) => Promise<Skill[]>,
  getCategories: () => Promise<Category[]>
};
```

### Service Patterns
- Use proper TypeScript types
- Handle errors gracefully
- Return consistent data structures
- Include proper validation

## Utility Guidelines

### Animation Utilities
Standardized animation presets:
- Consistent timing functions
- Reusable animation configurations
- Performance-optimized implementations

### Format Utilities
Text and data formatting:
- Date formatting with internationalization
- Text truncation and processing
- URL and slug generation

### HTTP Utilities
API communication helpers:
- Centralized error handling
- Request/response transformation
- Type-safe API calls

## Store Guidelines

### Theme Store
Manages application theming:
- System preference detection
- Theme persistence
- CSS variable application
- Type-safe theme definitions

### Store Patterns
- Use Svelte's readable/writable stores
- Implement proper TypeScript types
- Handle browser storage
- Provide clean APIs

## Import Patterns

### Internal Imports
```typescript
// From components
import Card from '$lib/components/ui/Card.svelte';

// From services  
import { skillsService } from '$lib/services/skills';

// From utilities
import { formatDate } from '$lib/utils/format';

// From stores
import { theme } from '$lib/stores/theme';
```

### Export Patterns
```typescript
// utils/index.ts - Clean re-exports
export { formatDate, truncateText } from './format';
export { fadeIn, slideIn } from './animations';
```

## Development Guidelines

### Adding New Components
1. Create in appropriate subdirectory (`ui/` or `blog/`)
2. Use TypeScript for props and interfaces
3. Follow existing naming conventions
4. Include proper documentation
5. Add to relevant index files

### Adding New Services
1. Create service file in `services/`
2. Define clear TypeScript interfaces
3. Implement error handling
4. Write comprehensive functions
5. Export clean API

### Adding New Utilities
1. Group by functionality in `utils/`
2. Write pure functions when possible
3. Include proper TypeScript types
4. Add to main utils index
5. Write unit tests when appropriate

## Error Handling

### Service Layer
- Catch and transform database errors
- Return meaningful error messages
- Use proper HTTP status codes
- Log errors appropriately

### Component Layer
- Handle loading states
- Display user-friendly error messages
- Graceful degradation
- Proper error boundaries

## Performance Considerations

### Component Performance
- Use component-level imports
- Avoid unnecessary re-renders
- Implement proper key strategies
- Lazy load heavy components

### Service Performance  
- Efficient database queries
- Proper indexing usage
- Caching strategies
- Connection pooling

### Utility Performance
- Optimize heavy computations
- Use efficient algorithms
- Minimize DOM manipulations
- Cache expensive operations