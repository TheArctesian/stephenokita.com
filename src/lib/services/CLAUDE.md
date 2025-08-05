# CLAUDE.md - src/lib/services/

This file provides guidance for working with the services layer that handles business logic and data operations.

## Directory Overview
The `services/` directory implements the service layer pattern, providing clean abstractions over database operations and business logic. Each service handles one domain of the application.

## Service Architecture

### Service Layer Pattern Benefits
- **Separation of Concerns**: Business logic separated from UI and data access
- **Single Responsibility**: Each service handles one domain
- **Testability**: Business logic can be tested independently
- **Reusability**: Services can be used across multiple components
- **Consistency**: Standardized data access patterns

### Clean Architecture Implementation
```
UI Components → Services → Database
```

Services act as the boundary between presentation and data layers.

## Service Inventory

### skills.ts
**Purpose**: Manages skills and skill categories
- Fetches all skills with category information
- Retrieves skills filtered by category
- Provides available skill categories
- Handles skill data transformations

**Key Functions**:
```typescript
export async function getAllSkills(): Promise<SkillWithCategory[]>
export async function getSkillsByCategory(category?: string): Promise<SkillWithCategory[]>
export async function getSkillCategories(): Promise<SkillCategory[]>
```

### projects.ts
**Purpose**: Manages projects and project categories
- Retrieves all projects with metadata
- Filters projects by category and featured status
- Provides project categorization
- Handles project data enrichment

**Key Functions**:
```typescript
export async function getAllProjects(): Promise<ProjectWithCategory[]>
export async function getProjectsByCategory(category?: string): Promise<ProjectWithCategory[]>
export async function getFeaturedProjects(): Promise<ProjectWithCategory[]>
export async function getProjectCategories(): Promise<ProjectCategory[]>
```

### personal.ts
**Purpose**: Manages personal content (quotes, music, poems, etc.)
- Retrieves personal quotes with filtering
- Manages favorite quotes
- Handles music and media content
- Provides personal content categorization

**Key Functions**:
```typescript
export async function getQuotes(favorites?: boolean): Promise<Quote[]>
export async function getFavoriteQuotes(): Promise<Quote[]>
export async function getPersonalContent(type: ContentType): Promise<PersonalContent[]>
```

## Service Implementation Patterns

### Database Connection Usage
All services use the centralized database connection:

```typescript
import { db } from '$lib/db/config';
import { skillsTable, categoriesTable } from '$lib/db/schema';

export async function getAllSkills() {
  return await db
    .select({
      id: skillsTable.id,
      name: skillsTable.name,
      category: categoriesTable.name,
      // ... other fields
    })
    .from(skillsTable)
    .leftJoin(categoriesTable, eq(skillsTable.categoryId, categoriesTable.id));
}
```

### Error Handling Pattern
Services implement consistent error handling:

```typescript
export async function getSkillsByCategory(category?: string) {
  try {
    // Database operation
    const result = await db.select().from(skillsTable);
    return result;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw new Error('Failed to fetch skills');
  }
}
```

### Type Safety Implementation
All services use proper TypeScript types:

```typescript
export interface SkillWithCategory {
  id: number;
  name: string;
  category: string;
  level: number;
  description?: string;
}

export async function getAllSkills(): Promise<SkillWithCategory[]> {
  // Implementation
}
```

## Data Transformation Patterns

### Join Operations
Services handle complex data relationships:

```typescript
export async function getProjectsWithCategories() {
  return await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      categoryName: categoriesTable.name,
      categoryColor: categoriesTable.color,
    })
    .from(projectsTable)
    .leftJoin(categoriesTable, eq(projectsTable.categoryId, categoriesTable.id));
}
```

### Data Enrichment
Services enrich data with computed properties:

```typescript
export async function getProjectsWithMetadata() {
  const projects = await db.select().from(projectsTable);
  
  return projects.map(project => ({
    ...project,
    isRecent: isWithinDays(project.createdAt, 30),
    displayDate: formatDate(project.createdAt),
    tagCount: project.tags?.length || 0,
  }));
}
```

### Filtering and Sorting
Services provide business logic for data filtering:

```typescript
export async function getFilteredProjects(options: {
  category?: string;
  featured?: boolean;
  recent?: boolean;
}) {
  let query = db.select().from(projectsTable);
  
  if (options.category) {
    query = query.where(eq(projectsTable.category, options.category));
  }
  
  if (options.featured) {
    query = query.where(eq(projectsTable.featured, true));
  }
  
  return await query.orderBy(desc(projectsTable.createdAt));
}
```

## Service Development Guidelines

### Creating New Services

1. **Define Domain Boundaries**:
   - One service per business domain
   - Clear separation of concerns
   - Minimal dependencies between services

2. **Implement Consistent API**:
   ```typescript
   // Standard service structure
   export const serviceNameService = {
     getAll: () => Promise<Entity[]>,
     getById: (id: number) => Promise<Entity | null>,
     getByCategory: (category: string) => Promise<Entity[]>,
     create: (data: CreateEntity) => Promise<Entity>,
     update: (id: number, data: UpdateEntity) => Promise<Entity>,
     delete: (id: number) => Promise<void>,
   };
   ```

3. **Use Proper TypeScript Types**:
   ```typescript
   // Define interfaces
   export interface Entity {
     id: number;
     name: string;
     createdAt: Date;
   }
   
   export interface CreateEntity {
     name: string;
   }
   
   export interface UpdateEntity {
     name?: string;
   }
   ```

### Error Handling Best Practices

#### Database Error Handling
```typescript
export async function getEntity(id: number) {
  try {
    const result = await db.select().from(table).where(eq(table.id, id));
    
    if (result.length === 0) {
      throw new Error(`Entity with id ${id} not found`);
    }
    
    return result[0];
  } catch (error) {
    if (error instanceof Error) {
      // Log the actual error for debugging
      console.error('Database error:', error.message);
      
      // Return user-friendly error
      throw new Error('Failed to retrieve entity');
    }
    throw error;
  }
}
```

#### Validation Error Handling
```typescript
export async function createEntity(data: CreateEntity) {
  // Validate input
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('Name is required');
  }
  
  try {
    return await db.insert(table).values(data).returning();
  } catch (error) {
    // Handle constraint violations, etc.
    console.error('Create entity error:', error);
    throw new Error('Failed to create entity');
  }
}
```

### Performance Optimization

#### Efficient Queries
```typescript
// Good: Select only needed fields
export async function getProjectSummaries() {
  return await db
    .select({
      id: projectsTable.id,
      name: projectsTable.name,
      category: projectsTable.category,
    })
    .from(projectsTable);
}

// Avoid: Selecting all fields when not needed
export async function getProjectSummariesBad() {
  return await db.select().from(projectsTable); // Returns all fields
}
```

#### Query Optimization
```typescript
// Use indexes effectively
export async function getRecentProjects() {
  return await db
    .select()
    .from(projectsTable)
    .where(gte(projectsTable.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
    .orderBy(desc(projectsTable.createdAt))
    .limit(10);
}
```

#### Caching Strategies
```typescript
// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCachedSkills() {
  const cacheKey = 'all-skills';
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await getAllSkills();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

## Testing Guidelines

### Unit Testing Services
```typescript
import { describe, test, expect, beforeAll } from 'vitest';
import { getAllSkills } from './skills';

describe('Skills Service', () => {
  test('getAllSkills returns array of skills', async () => {
    const skills = await getAllSkills();
    
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    
    const firstSkill = skills[0];
    expect(firstSkill).toHaveProperty('id');
    expect(firstSkill).toHaveProperty('name');
    expect(firstSkill).toHaveProperty('category');
  });
});
```

### Integration Testing
```typescript
describe('Projects Service Integration', () => {
  test('getProjectsByCategory filters correctly', async () => {
    const webProjects = await getProjectsByCategory('web');
    const allProjects = await getAllProjects();
    
    expect(webProjects.length).toBeLessThanOrEqual(allProjects.length);
    
    webProjects.forEach(project => {
      expect(project.category).toBe('web');
    });
  });
});
```

## Migration and Maintenance

### Schema Changes
When database schema changes:
1. Update service functions
2. Update TypeScript interfaces
3. Handle backward compatibility
4. Test data migration
5. Update API documentation

### Service Evolution
- Keep breaking changes minimal
- Provide migration guides
- Maintain backward compatibility
- Use proper versioning
- Document changes thoroughly

### Performance Monitoring
- Monitor query performance
- Track error rates
- Measure response times
- Optimize slow queries
- Cache frequently accessed data