#!/usr/bin/env tsx

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';
import 'dotenv/config';

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Import JSON data
import workData from '../src/routes/projects/work.json';
import projectsData from '../src/routes/projects/projects.json';
import personalData from '../src/routes/projects/personal.json';
import publishedData from '../src/routes/projects/published.json';
import libsData from '../src/routes/projects/libs.json';
import schoolData from '../src/routes/projects/school.json';

interface JsonProject {
  name: string;
  role?: string;
  description: string;
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  dateStart?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  status?: string;
}

async function createCategory(name: string, slug: string, description?: string) {
  try {
    // Check by both name and slug to handle duplicates
    const [existingBySlug] = await db.select().from(projectCategories).where(eq(projectCategories.slug, slug));
    if (existingBySlug) {
      console.log(`Category "${name}" already exists (by slug)`);
      return existingBySlug;
    }

    const [existingByName] = await db.select().from(projectCategories).where(eq(projectCategories.name, name));
    if (existingByName) {
      console.log(`Category "${name}" already exists (by name)`);
      return existingByName;
    }

    const [category] = await db.insert(projectCategories).values({
      name,
      slug,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    console.log(`Created category: ${name}`);
    return category;
  } catch (error) {
    console.error(`Error creating category ${name}:`, error);
    // Try to get existing category in case of race condition
    const [existing] = await db.select().from(projectCategories).where(eq(projectCategories.name, name));
    if (existing) {
      console.log(`Found existing category after error: ${name}`);
      return existing;
    }
    throw error;
  }
}

async function migrateProjects(data: JsonProject[], categoryId: number, defaultFeatured = false) {
  for (const item of data) {
    try {
      // Check if project already exists by title
      const [existing] = await db.select().from(projects).where(eq(projects.title, item.name));
      if (existing) {
        console.log(`Project "${item.name}" already exists, skipping`);
        continue;
      }

      const startDate = item.dateStart ? new Date(item.dateStart) : undefined;
      const endDate = item.date ? new Date(item.date) : undefined;
      
      // Determine URLs
      let liveUrl = item.link || item.liveUrl;
      let githubUrl = item.githubUrl;

      // If link contains github, move to githubUrl
      if (liveUrl && liveUrl.includes('github.com')) {
        githubUrl = liveUrl;
        liveUrl = undefined;
      }

      const projectData = {
        title: item.name,
        description: item.description,
        longDescription: item.role ? `${item.role}: ${item.description}` : item.description,
        categoryId,
        technologies: item.tags || [],
        githubUrl,
        liveUrl,
        imageUrl: item.imageUrl,
        status: item.status || 'completed',
        featured: item.featured || defaultFeatured,
        startDate,
        endDate,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.insert(projects).values(projectData);
      console.log(`Migrated project: ${item.name}`);
    } catch (error) {
      console.error(`Error migrating project ${item.name}:`, error);
    }
  }
}

async function main() {
  try {
    console.log('Starting projects migration...');

    // Create categories
    const workCategory = await createCategory(
      'Professional Work', 
      'professional-work',
      'Professional positions and consulting work'
    );

    const projectsCategory = await createCategory(
      'Featured Projects',
      'featured-projects', 
      'Main personal and collaborative projects'
    );

    const personalCategory = await createCategory(
      'Personal Projects',
      'personal-projects',
      'Individual learning and experimentation projects'
    );

    const publishedCategory = await createCategory(
      'Published Work',
      'published-work',
      'Published research, papers, and formal work'
    );

    const libsCategory = await createCategory(
      'Libraries & Tools',
      'libraries-tools',
      'Open source libraries and development tools'
    );

    const schoolCategory = await createCategory(
      'School Projects',
      'school-projects',
      'Academic coursework and educational projects'
    );

    // Migrate data by category
    console.log('\nMigrating professional work...');
    await migrateProjects(workData, workCategory.id);

    console.log('\nMigrating featured projects...');
    await migrateProjects(projectsData, projectsCategory.id, true); // Mark as featured

    console.log('\nMigrating personal projects...');
    await migrateProjects(personalData, personalCategory.id);

    console.log('\nMigrating published work...');
    await migrateProjects(publishedData, publishedCategory.id);

    console.log('\nMigrating libraries...');
    await migrateProjects(libsData, libsCategory.id);

    console.log('\nMigrating school projects...');
    await migrateProjects(schoolData, schoolCategory.id);

    console.log('\n✅ Projects migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

main();