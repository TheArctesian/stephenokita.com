import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not found in environment variables');
}

const sql = neon(connectionString);
const db = drizzle(sql);

async function cleanupPublishedWork() {
  try {
    console.log('Starting cleanup of published work categories...');

    // Find published work categories
    const publishedCategories = await db.select()
      .from(projectCategories)
      .where(inArray(projectCategories.slug, ['published', 'published-work', 'translation']));

    if (publishedCategories.length > 0) {
      const categoryIds = publishedCategories.map(cat => cat.id);

      // Find projects in these categories
      const publishedProjects = await db.select()
        .from(projects)
        .where(inArray(projects.categoryId, categoryIds));

      console.log(`Found ${publishedProjects.length} projects in published/translation categories`);

      // Get personal category for reassignment
      const [personalCategory] = await db.select()
        .from(projectCategories)
        .where(eq(projectCategories.slug, 'personal-projects'));

      if (publishedProjects.length > 0) {
        if (personalCategory) {
          // Move any remaining projects to personal category
          for (const project of publishedProjects) {
            await db.update(projects)
              .set({
                categoryId: personalCategory.id,
                updatedAt: new Date()
              })
              .where(eq(projects.id, project.id));
            console.log(`Moved project "${project.title}" to Personal Projects`);
          }
        } else {
          // If no personal category, just delete the projects
          for (const project of publishedProjects) {
            await db.delete(projects)
              .where(eq(projects.id, project.id));
            console.log(`Deleted project: ${project.title}`);
          }
        }
      }

      // Now safe to delete the categories (no more foreign key references)
      for (const category of publishedCategories) {
        await db.delete(projectCategories)
          .where(eq(projectCategories.id, category.id));
        console.log(`Deleted category: ${category.name} (${category.slug})`);
      }
    } else {
      console.log('No published/translation categories found to clean up');
    }

    // Also delete the legacy JSON files
    console.log('\nNote: You may want to manually delete these legacy files:');
    console.log('- src/routes/projects/published.json');
    console.log('- src/routes/projects/published.svelte');

    console.log('\nCleanup completed successfully!');

    // Show final category summary
    const categories = await db.select().from(projectCategories);
    console.log('\nFinal project categories:');
    for (const cat of categories) {
      const projectCount = await db.select()
        .from(projects)
        .where(eq(projects.categoryId, cat.id));
      console.log(`- ${cat.name} (${cat.slug}): ${projectCount.length} projects`);
    }

  } catch (error) {
    console.error('Error cleaning up published work:', error);
    process.exit(1);
  }
}

cleanupPublishedWork();