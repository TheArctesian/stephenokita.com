import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not found in environment variables');
}

const sql = neon(connectionString);
const db = drizzle(sql);

async function moveOmnixyToProfessionalWork() {
  try {
    console.log('Moving Omnixy to Professional Work...');

    // Get professional work category
    const [workCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'professional-work'));

    if (!workCategory) {
      throw new Error('Professional Work category not found');
    }

    // Find Omnixy project
    const [omnixyProject] = await db.select()
      .from(projects)
      .where(eq(projects.title, 'Omnixy'));

    if (!omnixyProject) {
      console.log('Omnixy project not found in database');
      return;
    }

    // Update Omnixy to professional work category
    await db.update(projects)
      .set({
        categoryId: workCategory.id,
        updatedAt: new Date()
      })
      .where(eq(projects.id, omnixyProject.id));

    console.log('✅ Successfully moved Omnixy to Professional Work');

    // Show updated counts
    const [personalCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'personal-projects'));

    if (personalCategory) {
      const personalProjects = await db.select()
        .from(projects)
        .where(eq(projects.categoryId, personalCategory.id));
      console.log(`\nPersonal Projects now has ${personalProjects.length} projects`);
    }

    const professionalProjects = await db.select()
      .from(projects)
      .where(eq(projects.categoryId, workCategory.id));
    console.log(`Professional Work now has ${professionalProjects.length} projects`);

  } catch (error) {
    console.error('Error moving Omnixy:', error);
    process.exit(1);
  }
}

moveOmnixyToProfessionalWork();