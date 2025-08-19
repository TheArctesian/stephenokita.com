# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Unix Philosophy Principles
This codebase follows Unix philosophy:
1. **Single Responsibility**: Each module does one thing well
2. **Composability**: Small, focused functions that work together
3. **Modularity**: Clear separation of concerns
4. **Simplicity**: Prefer simple, maintainable solutions

## Technology Stack
- **Framework**: SvelteKit with TypeScript
- **Database**: Neon PostgreSQL with Drizzle ORM  
- **Styling**: Modular CSS design system with TailwindCSS
- **Content**: MDSvex for markdown processing + Database for dynamic content
- **Deployment**: Vercel (configured with @sveltejs/adapter-vercel)
- **Package Manager**: Yarn

## Development Commands
```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Type checking and linting
yarn check
yarn check:watch

# Database operations
yarn db:generate    # Generate migrations
yarn db:push       # Push schema to database
yarn db:studio     # Open Drizzle Studio
yarn migrate-data  # Migrate JSON data to database
```

## Clean Architecture Overview

### Database Layer (Following Unix Philosophy)
- **Config**: `src/lib/db/config.ts` - Single database connection
- **Schema**: `src/lib/db/schema.ts` - Database table definitions
- **Services**: `src/lib/services/` - Business logic layer
  - `skills.ts` - Skills and categories management
  - `projects.ts` - Projects and categories management
  - `personal.ts` - Personal content (quotes, music, etc.)

### API Layer (RESTful Design)
- **Skills**: `/api/skills`, `/api/skills/categories`
- **Projects**: `/api/projects` (supports ?category and ?featured params)
- **Personal**: `/api/personal/quotes` (supports ?favorites param)  
- **Blog**: `/api/posts` (markdown-based, unchanged)

### Design System (Modular CSS)
- **Tokens**: `src/styles/tokens.css` - Design tokens and CSS variables
- **Base**: `src/styles/base.css` - Fundamental HTML elements
- **Components**: `src/styles/components.css` - Reusable UI patterns
- **Prose**: `src/styles/prose.css` - Content typography
- **Import Order**: tokens → base → components → prose → tailwind

### Component Architecture
- **UI Components**: `src/lib/components/ui/`
  - `Navigation.svelte` - Responsive navigation system
  - `Footer.svelte` - Social links and contact info
  - `Card.svelte` - Reusable card component with variants
  - `AnimatedText.svelte` - Standardized text animations
- **Page Components**: Route-specific components in respective route folders

### Utility System (Single Responsibility)
- **Animations**: `src/lib/utils/animations.ts` - Animation presets and helpers
- **HTTP**: `src/lib/utils/http.ts` - API client and HTTP utilities
- **Formatting**: `src/lib/utils/format.ts` - Text and date formatting
- **Constants**: `src/lib/constants/index.ts` - Application-wide constants

### Data Migration
- **Script**: `scripts/migrate-data.ts` - Migrates JSON data to database
- **Environment**: Uses dotenv for local development, Vercel env for production
- **Status**: Successfully migrated 94 skills and 45 projects

### Content Management
- **Blog Posts**: Still markdown-based in `src/routes/blog/posts/`
- **Dynamic Content**: Now database-driven via services layer
- **Legacy JSON**: Being phased out in favor of database storage

### Styling Philosophy
- **Design Tokens**: Single source of truth for colors, spacing, typography
- **Component Classes**: Semantic CSS classes over utility-first approach
- **Responsive**: Mobile-first design with consistent breakpoints
- **Color System**: Dracula-inspired palette with semantic naming

### Environment Setup
- **Database**: Neon PostgreSQL connection via DATABASE_URL
- **Local Development**: Uses .env file with dotenv
- **Production**: Environment variables handled by Vercel
- **Migration**: Run `yarn migrate-data` to populate database

## Development Workflow
1. **Database First**: Define schema, generate migrations, push to DB
2. **Services Layer**: Create business logic services for data access
3. **API Endpoints**: Build RESTful APIs using services
4. **Components**: Create reusable UI components with design system
5. **Pages**: Compose components into page layouts
6. **Migration**: Use migration scripts for data transformation

## Key Files
- `src/lib/db/config.ts`: Database connection and setup
- `src/lib/services/`: Business logic layer
- `src/lib/components/ui/`: Reusable UI components
- `src/lib/utils/`: Utility functions and helpers
- `src/styles/`: Modular CSS design system
- `drizzle.config.ts`: Database configuration
- `scripts/migrate-data.ts`: Data migration script