# CLAUDE.md - src/

This file provides guidance to Claude Code when working with the source code directory of the danielokita.com website.

## Directory Overview
The `src/` directory contains all source code for the SvelteKit application including components, routes, styles, and business logic.

## Technology Stack
- **Framework**: SvelteKit with TypeScript
- **Database**: Neon PostgreSQL with Drizzle ORM  
- **Styling**: Modular CSS design system with TailwindCSS
- **Content**: MDSvex for markdown processing + Database for dynamic content

## Directory Structure

### Core Files
- `app.html` - Main HTML template
- `app.css` - Global styles and design system imports
- `app.d.ts` - TypeScript app declarations

### Key Directories
- `lib/` - Shared components, utilities, and business logic
- `routes/` - SvelteKit pages and API endpoints
- `styles/` - Modular CSS design system

## Architecture Philosophy

### Clean Architecture Principles
1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data
2. **Single Responsibility**: Each module has one clear purpose
3. **Dependency Inversion**: High-level modules don't depend on low-level modules

### UNIX Philosophy Implementation
- **Modularity**: Each component/service does one thing well
- **Composability**: Components can be combined in different ways
- **Single Source of Truth**: Centralized configuration and state management

## Development Guidelines

### Code Organization
- Keep components small and focused
- Use TypeScript for type safety
- Follow existing naming conventions
- Maintain consistent file structure

### Styling Approach
- Use the modular CSS design system in `styles/`
- Apply Tailwind classes consistently
- Use CSS variables for theming
- Follow the established color hierarchy

### Data Flow
- API routes handle data fetching/mutations
- Services layer provides business logic
- Components focus on presentation
- Stores manage client state

## Key Conventions

### File Naming
- Components: PascalCase (e.g., `ThemeToggle.svelte`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Routes: kebab-case matching URL structure

### Import Order
1. Third-party imports
2. Internal lib imports
3. Component imports
4. Type imports

### CSS Class Structure
- Use semantic class names over utility-first
- Follow BEM-like conventions for component-specific styles
- Leverage design tokens through CSS variables

## Error Handling
- Use proper TypeScript error types
- Handle loading and error states in components
- Validate data at API boundaries
- Provide meaningful user feedback

## Performance Considerations
- Code splitting through SvelteKit's automatic optimizations
- Lazy loading for large components
- Efficient database queries through services layer
- Optimized asset loading

## Testing Strategy
- Component testing for UI elements
- Integration testing for API routes
- End-to-end testing for critical user flows
- Type checking as first line of defense