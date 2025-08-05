# CLAUDE.md - scripts/

This file provides guidance for working with utility scripts used for development, deployment, and data management tasks.

## Directory Overview
The `scripts/` directory contains utility scripts that handle various development and maintenance tasks, primarily focused on data migration and setup operations.

## Script Inventory

### migrate-data.ts
**Purpose**: Migrates data from JSON files to the PostgreSQL database

#### Primary Function
Handles the transition from file-based data storage to database-driven content management by:
- Reading JSON data files from various locations
- Transforming data to match database schema
- Inserting data into PostgreSQL via Drizzle ORM
- Handling data relationships and foreign keys
- Providing progress feedback and error handling

#### Key Features
- **Multi-domain Migration**: Handles skills, projects, and personal content
- **Relationship Management**: Properly handles foreign key relationships
- **Data Validation**: Validates data before insertion
- **Progress Reporting**: Provides detailed migration progress
- **Error Handling**: Graceful error handling with detailed logging
- **Environment Support**: Works in both development and production

#### Migration Domains
1. **Skills Migration**: 
   - Migrates skills from JSON files in `src/routes/skills/`
   - Creates skill categories and relationships
   - Handles skill proficiency levels and descriptions

2. **Projects Migration**:
   - Migrates projects from JSON files in `src/routes/projects/`
   - Creates project categories and tags
   - Handles project metadata and external links

3. **Personal Content Migration**:
   - Migrates quotes, music, and other personal content
   - Handles content categorization
   - Manages favorites and preferences

## Script Architecture

### Environment Setup
```typescript
// Development environment
import dotenv from 'dotenv';
dotenv.config();

// Production environment (Vercel)
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}
```

### Database Connection
```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(DATABASE_URL);
const db = drizzle(sql);
```

### Data Processing Pattern
```typescript
async function migrateSkills() {
  console.log('🎯 Migrating skills...');
  
  try {
    // Read JSON data
    const skillsData = await readJSONFiles('skills');
    
    // Transform data
    const transformedData = transformSkillsData(skillsData);
    
    // Insert into database
    const results = await db.insert(skillsTable).values(transformedData);
    
    console.log(`✅ Migrated ${results.length} skills`);
  } catch (error) {
    console.error('❌ Skills migration failed:', error);
    throw error;
  }
}
```

## Usage Guidelines

### Running Migration Scripts

#### Development Environment
```bash
# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run migration
yarn migrate-data
```

#### Production Environment
```bash
# Ensure environment variables are set in deployment
# Run migration
node dist/scripts/migrate-data.js
```

### Script Execution Flow
1. **Environment Validation**: Check required environment variables
2. **Database Connection**: Establish connection to PostgreSQL
3. **Data Reading**: Read JSON files from specified directories
4. **Data Transformation**: Convert data to match database schema
5. **Data Insertion**: Insert transformed data into database
6. **Progress Reporting**: Log migration progress and results
7. **Error Handling**: Handle and report any errors

## Development Guidelines

### Creating New Migration Scripts

#### Script Structure Template
```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Environment setup
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

// Database connection
const sql = neon(DATABASE_URL);
const db = drizzle(sql);

async function migrateNewData() {
  console.log('🚀 Starting new data migration...');
  
  try {
    // Migration logic here
    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateNewData();
}
```

#### Error Handling Patterns
```typescript
async function safeDataMigration(dataArray: any[]) {
  const results = [];
  const errors = [];
  
  for (const item of dataArray) {
    try {
      const result = await db.insert(table).values(item);
      results.push(result);
    } catch (error) {
      errors.push({ item, error: error.message });
    }
  }
  
  if (errors.length > 0) {
    console.warn(`⚠️ ${errors.length} items failed to migrate:`, errors);
  }
  
  return { results, errors };
}
```

### Data Transformation Patterns

#### JSON to Database Schema Mapping
```typescript
function transformSkillData(jsonSkill: any): SkillInsert {
  return {
    name: jsonSkill.name,
    category: jsonSkill.category || 'uncategorized',
    level: parseFloat(jsonSkill.level) || 1,
    description: jsonSkill.description || null,
    isActive: jsonSkill.active !== false,
    createdAt: new Date(jsonSkill.dateAdded || Date.now()),
    updatedAt: new Date()
  };
}
```

#### Relationship Handling
```typescript
async function migrateWithRelationships() {
  // First, migrate categories
  const categories = await db.insert(categoriesTable)
    .values(categoryData)
    .returning();
  
  // Create category map for lookups
  const categoryMap = new Map(
    categories.map(cat => [cat.name, cat.id])
  );
  
  // Then migrate items with category references
  const itemsWithCategories = itemData.map(item => ({
    ...item,
    categoryId: categoryMap.get(item.category)
  }));
  
  await db.insert(itemsTable).values(itemsWithCategories);
}
```

### Validation and Safety

#### Pre-Migration Validation
```typescript
function validateData(data: any[]): ValidationResult {
  const errors = [];
  const warnings = [];
  
  data.forEach((item, index) => {
    // Required field validation
    if (!item.name) {
      errors.push(`Item ${index}: name is required`);
    }
    
    // Data type validation
    if (item.level && typeof item.level !== 'number') {
      warnings.push(`Item ${index}: level should be a number`);
    }
    
    // Business logic validation
    if (item.level && (item.level < 1 || item.level > 10)) {
      warnings.push(`Item ${index}: level should be between 1 and 10`);
    }
  });
  
  return { errors, warnings, isValid: errors.length === 0 };
}
```

#### Backup Strategy
```typescript
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-${timestamp}.json`;
  
  // Export current data
  const currentData = await db.select().from(allTables);
  
  // Save to file
  await fs.writeFile(backupFile, JSON.stringify(currentData, null, 2));
  
  console.log(`📦 Backup created: ${backupFile}`);
  return backupFile;
}
```

## Deployment Integration

### CI/CD Pipeline Integration
```yaml
# Example GitHub Actions workflow
- name: Run Data Migration
  run: |
    echo "DATABASE_URL=${{ secrets.DATABASE_URL }}" >> .env
    yarn migrate-data
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Vercel Integration
```javascript
// vercel.json
{
  "functions": {
    "scripts/migrate-data.ts": {
      "maxDuration": 300
    }
  }
}
```

### Environment Variable Management
```bash
# Development
DATABASE_URL=postgresql://username:password@localhost:5432/database

# Production (Vercel)
# Set via Vercel dashboard or CLI
vercel env add DATABASE_URL
```

## Monitoring and Logging

### Progress Tracking
```typescript
async function migrateWithProgress(items: any[]) {
  const total = items.length;
  let completed = 0;
  
  console.log(`📊 Starting migration of ${total} items...`);
  
  for (const item of items) {
    await migrateItem(item);
    completed++;
    
    if (completed % 10 === 0) {
      const percentage = Math.round((completed / total) * 100);
      console.log(`⏳ Progress: ${completed}/${total} (${percentage}%)`);
    }
  }
  
  console.log(`✅ Completed migration of ${completed} items`);
}
```

### Error Logging
```typescript
function logError(context: string, error: any) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    data: error.data || null
  };
  
  console.error('❌ Migration Error:', errorInfo);
  
  // In production, also send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // sendToMonitoringService(errorInfo);
  }
}
```

## Best Practices

### Script Development
- Use TypeScript for type safety
- Implement comprehensive error handling
- Provide clear progress feedback
- Include data validation
- Create backup strategies
- Test with sample data first

### Data Safety
- Always backup before migration
- Validate data before insertion
- Use database transactions where appropriate
- Implement rollback procedures
- Monitor migration progress
- Test in staging environment first

### Performance Optimization
- Batch large operations
- Use database transactions efficiently
- Optimize query patterns
- Monitor memory usage
- Handle large datasets appropriately

### Maintenance
- Keep scripts up to date with schema changes
- Document script dependencies
- Version control all scripts
- Regular testing of migration processes
- Update environment configurations as needed