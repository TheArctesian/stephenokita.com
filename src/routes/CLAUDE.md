# CLAUDE.md - src/routes/

This file provides guidance for working with the routes directory containing all SvelteKit pages and API endpoints.

## Directory Overview
The `routes/` directory contains all application routes including pages, API endpoints, and layout components following SvelteKit's file-based routing conventions.

## Routing Architecture

### SvelteKit File-Based Routing
- `+page.svelte` - Page components
- `+page.ts` - Page load functions
- `+layout.svelte` - Layout components
- `+server.ts` - API endpoints
- `[slug]/` - Dynamic routes
- `(group)/` - Route groups (optional)

### Route Structure
```
routes/
├── +layout.svelte          # Root layout
├── +page.svelte           # Home page
├── [slug]/                # Dynamic blog posts
├── api/                   # API endpoints
├── blog/                  # Blog section
├── projects/              # Projects section
├── skills/                # Skills section
├── person/                # About section
├── meta/                  # Metadata pages
└── rss.xml/              # RSS feed
```

## Page Routes

### Root Level Pages

#### +layout.svelte
**Purpose**: Root application layout
- Global navigation
- Theme system integration
- Font loading
- Common page structure
- SEO meta tags

**Key Features**:
- Responsive navigation
- Theme toggle integration
- Footer component
- Page transition animations

#### +page.svelte
**Purpose**: Homepage/landing page
- Personal introduction
- Featured content highlights
- Navigation to main sections
- Animated text elements
- Interactive design elements

### Dynamic Routes

#### [slug]/+page.svelte & +page.ts
**Purpose**: Dynamic blog post pages
- Markdown content rendering
- SEO optimization
- Social sharing integration
- Reading time calculation
- Navigation between posts

**Load Function Pattern**:
```typescript
// +page.ts
export async function load({ params }) {
  const post = await import(`../blog/posts/${params.slug}.md`);
  return {
    post: post.default,
    metadata: post.metadata
  };
}
```

### Section Pages

#### blog/+page.svelte
**Purpose**: Blog listing and management
- Post grid layout
- Search functionality
- Category filtering
- Pagination support
- Featured post highlighting

#### projects/+page.svelte
**Purpose**: Project showcase
- Project grid display
- Category filtering
- Interactive project cards
- Modal dialogs for details
- Technology tag system

#### skills/+page.svelte  
**Purpose**: Skills and expertise display
- Skills categorization
- Proficiency indicators
- Interactive skill cards
- Category-based filtering
- Visual skill representation

#### person/+page.svelte
**Purpose**: Personal information and about
- Biography content
- Personal interests
- Contact information
- Social media links
- Personal media gallery

### Specialized Pages

#### meta/+page.svelte & meta/you/+page.svelte
**Purpose**: Metadata and analytics pages
- Browser information detection
- System capabilities analysis
- Privacy-focused analytics
- Technical specifications
- Debugging information

## API Routes

### API Architecture
RESTful API endpoints providing data for the application:

```
api/
├── posts/              # Blog posts
├── projects/           # Project data
├── skills/             # Skills and categories
├── personal/           # Personal content
└── instagram-image/    # External integrations
```

### API Endpoint Patterns

#### Standard CRUD Operations
```typescript
// GET /api/resource
export async function GET() {
  const data = await service.getAll();
  return json(data);
}

// POST /api/resource
export async function POST({ request }) {
  const data = await request.json();
  const result = await service.create(data);
  return json(result, { status: 201 });
}
```

#### Error Handling Pattern
```typescript
export async function GET({ url }) {
  try {
    const data = await service.getData();
    return json(data);
  } catch (error) {
    console.error('API Error:', error);
    return json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
```

### Specific API Endpoints

#### api/skills/+server.ts
**Purpose**: Skills data API
- Returns all skills with categories
- Supports category filtering via query params
- Provides skill proficiency levels
- Handles skill categorization

#### api/projects/+server.ts
**Purpose**: Projects data API  
- Returns project information
- Supports category and featured filtering
- Provides project metadata
- Handles project categorization

#### api/personal/quotes/+server.ts
**Purpose**: Personal quotes API
- Returns personal quotes
- Supports favorites filtering
- Provides quote categorization
- Handles quote metadata

#### api/posts/+server.ts
**Purpose**: Blog posts metadata API
- Returns post listings
- Provides post metadata
- Supports search functionality
- Handles post categorization

### RSS Feed Generation

#### rss.xml/+server.ts
**Purpose**: RSS feed generation
- Creates valid RSS 2.0 XML
- Includes recent blog posts
- Provides proper metadata
- Handles content formatting

```typescript
export async function GET() {
  const posts = await getAllPosts();
  const rssXml = generateRSSFeed(posts);
  
  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}
```

## Development Guidelines

### Page Component Structure
```svelte
<script lang="ts">
  // Imports
  import type { PageData } from './$types';
  
  // Props
  export let data: PageData;
  
  // Component logic
  $: processedData = processData(data);
</script>

<!-- SEO -->
<svelte:head>
  <title>Page Title</title>
  <meta name="description" content="Page description" />
</svelte:head>

<!-- Content -->
<main>
  <!-- Page content -->
</main>

<!-- Styles -->
<style>
  /* Component-specific styles */
</style>
```

### Load Function Patterns
```typescript
// Page data loading
export async function load({ params, url, fetch }) {
  const response = await fetch(`/api/data?param=${params.id}`);
  const data = await response.json();
  
  return {
    data,
    meta: {
      title: 'Page Title',
      description: 'Page description'
    }
  };
}
```

### Error Handling in Routes
```typescript
// Error page handling
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const data = await fetchData(params.id);
    return { data };
  } catch (err) {
    throw error(404, 'Not found');
  }
}
```

## SEO and Performance

### Meta Tags Implementation
```svelte
<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content={pageImage} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
```

### Performance Optimization
- Lazy loading for heavy components
- Image optimization
- Code splitting
- Efficient data loading
- Caching strategies

### Accessibility Standards
- Semantic HTML structure
- Proper heading hierarchy
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility

## Data Loading Patterns

### Server-Side Data Loading
```typescript
// +page.server.ts
export async function load() {
  const data = await database.query();
  return {
    serverData: data
  };
}
```

### Client-Side Data Loading
```typescript
// +page.ts
export async function load({ fetch }) {
  const response = await fetch('/api/data');
  const data = await response.json();
  return {
    clientData: data
  };
}
```

### Streaming Data
```typescript
export async function load() {
  return {
    streamed: {
      slowData: getSlowData(), // This will be streamed
    },
    fastData: await getFastData()
  };
}
```

## Route-Specific Guidelines

### Blog Routes
- Use MDSvex for markdown processing
- Implement proper syntax highlighting
- Handle blog post metadata
- Support social sharing
- Optimize for reading experience

### Project Routes
- Interactive project showcases
- Technology filtering
- Modal dialogs for details
- External link handling
- Project status indicators

### API Routes
- Consistent response formats
- Proper HTTP status codes
- Error handling
- Rate limiting considerations
- Documentation

## Testing Routes

### Page Testing
```typescript
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

test('renders page correctly', () => {
  render(Page, {
    props: { data: mockData }
  });
  
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```

### API Testing
```typescript
import { GET } from './+server.ts';

test('API returns correct data', async () => {
  const response = await GET();
  const data = await response.json();
  
  expect(data).toBeDefined();
  expect(response.status).toBe(200);
});
```

## Maintenance Guidelines

### Route Updates
- Maintain backward compatibility
- Update related API endpoints
- Test across devices and browsers
- Verify SEO compliance
- Check accessibility standards

### Performance Monitoring
- Monitor page load times
- Track Core Web Vitals
- Optimize bundle sizes
- Monitor API response times
- Check error rates