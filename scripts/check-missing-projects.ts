import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq } from 'drizzle-orm';
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

interface JsonProject {
  name: string;
  description?: string;
  role?: string;
  link?: string;
  date?: string;
  dateStart?: string;
  tags?: string[];
}

async function checkAndImportMissingProjects() {
  try {
    console.log('Checking for missing projects from JSON files...\n');

    // Get existing projects from database
    const existingProjects = await db.select().from(projects);
    const existingTitles = new Set(existingProjects.map(p => p.title.toLowerCase()));

    // Get categories
    const categories = await db.select().from(projectCategories);
    const categoryMap = new Map(categories.map(c => [c.slug, c]));

    // Check each JSON file
    const jsonFiles = [
      { file: 'personal.json', category: 'personal-projects' },
      { file: 'libs.json', category: 'libraries-tools' },
      { file: 'school.json', category: 'school' },
      { file: 'work.json', category: 'professional-work' },
      { file: 'projects.json', category: 'professional-work' }
    ];

    let totalMissing = 0;
    const missingProjects: Array<{ project: JsonProject; category: string; file: string }> = [];

    for (const { file, category } of jsonFiles) {
      const filePath = join(process.cwd(), 'src/routes/projects', file);
      let jsonData: JsonProject[] = [];

      try {
        jsonData = JSON.parse(readFileSync(filePath, 'utf-8'));
      } catch (error) {
        console.log(`⚠️  Could not read ${file}, skipping...`);
        continue;
      }

      console.log(`\nChecking ${file} (${jsonData.length} projects):`);

      const missing = jsonData.filter(project =>
        !existingTitles.has(project.name.toLowerCase())
      );

      if (missing.length > 0) {
        console.log(`  ❌ Missing ${missing.length} projects:`);
        missing.forEach(p => {
          console.log(`     - ${p.name}`);
          missingProjects.push({ project: p, category, file });
        });
        totalMissing += missing.length;
      } else {
        console.log(`  ✅ All projects exist in database`);
      }
    }

    if (totalMissing === 0) {
      console.log('\n✅ No missing projects found! Database is up to date.');
      return;
    }

    console.log(`\n\n📊 Summary: Found ${totalMissing} missing projects`);
    console.log('\nWould you like to import them? Creating import script...\n');

    // Import missing projects
    for (const { project, category: categorySlug } of missingProjects) {
      // Get or create category
      let categoryId: number;

      if (!categoryMap.has(categorySlug)) {
        // Handle special cases for category names
        const alternativeSlugs: Record<string, string> = {
          'personal-projects': 'personal',
          'libraries-tools': 'libs'
        };

        const altSlug = alternativeSlugs[categorySlug];
        if (altSlug && categoryMap.has(altSlug)) {
          categoryId = categoryMap.get(altSlug)!.id;
        } else {
          console.log(`⚠️  Category ${categorySlug} not found, skipping ${project.name}`);
          continue;
        }
      } else {
        categoryId = categoryMap.get(categorySlug)!.id;
      }

      // Convert dates
      const startDate = project.dateStart ? new Date(project.dateStart) : null;
      const endDate = project.date ? new Date(project.date) : null;

      try {
        await db.insert(projects).values({
          title: project.name,
          description: project.description || '',
          longDescription: project.role ? `${project.role}: ${project.description}` : project.description,
          categoryId: categoryId,
          technologies: project.tags || [],
          liveUrl: project.link,
          githubUrl: project.link?.includes('github.com') ? project.link : null,
          imageUrl: null,
          status: 'completed',
          featured: false,
          startDate: startDate,
          endDate: endDate,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ Imported: ${project.name}`);
      } catch (error) {
        console.log(`❌ Failed to import ${project.name}: ${error}`);
      }
    }

    console.log('\n\n✅ Import complete!');

    // Show final counts
    const finalCategories = await db.select().from(projectCategories);
    console.log('\nFinal project counts by category:');
    for (const cat of finalCategories) {
      const count = await db.select()
        .from(projects)
        .where(eq(projects.categoryId, cat.id));
      console.log(`  - ${cat.name} (${cat.slug}): ${count.length} projects`);
    }

  } catch (error) {
    console.error('Error checking projects:', error);
    process.exit(1);
  }
}

checkAndImportMissingProjects();