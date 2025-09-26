import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not found in environment variables');
}

const sql = neon(connectionString);
const db = drizzle(sql);

async function importWorkProjects() {
  try {
    console.log('Starting work projects import...');

    // Read work.json file
    const workJsonPath = join(process.cwd(), 'src/routes/projects/work.json');
    const workData = JSON.parse(readFileSync(workJsonPath, 'utf-8'));
    console.log(`Found ${workData.length} work projects to import`);

    // Get professional work category
    const [workCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'professional-work'));

    if (!workCategory) {
      throw new Error('Professional Work category not found');
    }

    // Check for existing projects to avoid duplicates
    const existingProjects = await db.select()
      .from(projects)
      .where(eq(projects.categoryId, workCategory.id));

    const existingTitles = new Set(existingProjects.map(p => p.title));

    // Import each work project
    for (const project of workData) {
      const projectTitle = project.name;

      // Skip if already exists
      if (existingTitles.has(projectTitle)) {
        console.log(`Skipping "${projectTitle}" - already exists`);
        continue;
      }

      // Convert date strings to Date objects
      const startDate = project.dateStart ? new Date(project.dateStart) : null;
      const endDate = project.date ? new Date(project.date) : null;

      await db.insert(projects).values({
        title: projectTitle,
        description: project.description,
        longDescription: project.role ? `${project.role}: ${project.description}` : project.description,
        categoryId: workCategory.id,
        technologies: project.tags || [],
        liveUrl: project.link,
        githubUrl: null,
        imageUrl: null,
        status: 'completed',
        featured: false,
        startDate: startDate,
        endDate: endDate,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log(`Added: ${projectTitle}`);
    }

    console.log('\n2. Removing featured projects category...');

    // Find featured projects category
    const featuredCategories = await db.select()
      .from(projectCategories)
      .where(inArray(projectCategories.slug, ['featured-projects', 'featured']));

    if (featuredCategories.length > 0) {
      for (const category of featuredCategories) {
        // Move any featured projects to professional work
        const featuredProjects = await db.select()
          .from(projects)
          .where(eq(projects.categoryId, category.id));

        if (featuredProjects.length > 0) {
          for (const project of featuredProjects) {
            await db.update(projects)
              .set({
                categoryId: workCategory.id,
                featured: true, // Keep them marked as featured
                updatedAt: new Date()
              })
              .where(eq(projects.id, project.id));
            console.log(`Moved "${project.title}" to Professional Work (featured)`);
          }
        }

        // Delete the category
        await db.delete(projectCategories)
          .where(eq(projectCategories.id, category.id));
        console.log(`Deleted category: ${category.name}`);
      }
    }

    console.log('\nImport and cleanup completed successfully!');

    // Show final summary
    const categories = await db.select().from(projectCategories);
    console.log('\nFinal project categories:');
    for (const cat of categories) {
      const projectCount = await db.select()
        .from(projects)
        .where(eq(projects.categoryId, cat.id));
      console.log(`- ${cat.name} (${cat.slug}): ${projectCount.length} projects`);
    }

    // Show professional work projects
    const professionalProjects = await db.select()
      .from(projects)
      .where(eq(projects.categoryId, workCategory.id));

    console.log('\nProfessional Work projects:');
    for (const project of professionalProjects) {
      console.log(`- ${project.title}${project.featured ? ' [FEATURED]' : ''}`);
    }

  } catch (error) {
    console.error('Error importing work projects:', error);
    process.exit(1);
  }
}

importWorkProjects();