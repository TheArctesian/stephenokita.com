import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { projects, projectCategories } from '../src/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not found in environment variables');
}

const sql = neon(connectionString);
const db = drizzle(sql);

async function updateProjects() {
  try {
    console.log('Starting project updates...');

    // 1. Get or create personal projects category
    let [personalCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'personal-projects'));

    // Also check for just 'personal' slug
    if (!personalCategory) {
      [personalCategory] = await db.select()
        .from(projectCategories)
        .where(eq(projectCategories.slug, 'personal'));
    }

    let personalCategoryId: number;
    if (!personalCategory) {
      try {
        const [newCategory] = await db.insert(projectCategories).values({
          name: 'Personal Projects',
          slug: 'personal-projects',
          description: 'Personal projects and experiments'
        }).returning();
        personalCategoryId = newCategory.id;
        console.log('Created Personal Projects category');
      } catch (error: any) {
        // If it fails due to duplicate, try to get it by name
        if (error?.cause?.code === '23505') {
          [personalCategory] = await db.select()
            .from(projectCategories)
            .where(eq(projectCategories.name, 'Personal Projects'));
          personalCategoryId = personalCategory.id;
          console.log('Found existing Personal Projects category by name');
        } else {
          throw error;
        }
      }
    } else {
      personalCategoryId = personalCategory.id;
      console.log('Found existing Personal Projects category');
    }

    // 2. Find the Chinese Radicals project and move it to personal projects
    const [radicalProject] = await db.select()
      .from(projects)
      .where(eq(projects.title, 'Chinese Radicals Table'));

    if (radicalProject) {
      await db.update(projects)
        .set({
          categoryId: personalCategoryId,
          updatedAt: new Date()
        })
        .where(eq(projects.id, radicalProject.id));
      console.log('Moved Chinese Radicals Table to Personal Projects');
    }

    // 3. Add Omnixy NixOS distro
    const existingOmnixy = await db.select()
      .from(projects)
      .where(eq(projects.title, 'Omnixy'));

    if (existingOmnixy.length === 0) {
      await db.insert(projects).values({
        title: 'Omnixy',
        description: 'An opinionated NixOS distribution focused on developer productivity and system reproducibility',
        longDescription: 'Omnixy is an opinionated NixOS distribution that provides a complete, reproducible development environment with sensible defaults and modern tooling. Built to simplify NixOS adoption while maintaining the power of declarative system configuration.',
        categoryId: personalCategoryId,
        technologies: ['nix', 'nixos', 'linux', 'bash', 'configuration-management'],
        githubUrl: 'https://github.com/TheArctesian/omnixy',
        featured: false,
        status: 'active',
        startDate: new Date('2024-09-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Added Omnixy NixOS distro');
    }

    // 4. Get professional work category
    const [workCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'professional-work'));

    let workCategoryId: number;
    if (!workCategory) {
      const [newCategory] = await db.insert(projectCategories).values({
        name: 'Professional Work',
        slug: 'professional-work',
        description: 'Professional projects and client work'
      }).returning();
      workCategoryId = newCategory.id;
      console.log('Created Professional Work category');
    } else {
      workCategoryId = workCategory.id;
      console.log('Found existing Professional Work category');
    }

    // 5. Update UC Investments project to ensure it's properly displayed
    const [ucInvestmentsProject] = await db.select()
      .from(projects)
      .where(eq(projects.title, 'UC Investments'));

    if (ucInvestmentsProject) {
      await db.update(projects)
        .set({
          categoryId: workCategoryId,
          featured: true,
          updatedAt: new Date()
        })
        .where(eq(projects.id, ucInvestmentsProject.id));
      console.log('Updated UC Investments project to professional work');
    }

    // 6. Add UC Investments Wages tool
    const existingWages = await db.select()
      .from(projects)
      .where(eq(projects.title, 'UC Investments - Wages Tool'));

    if (existingWages.length === 0) {
      await db.insert(projects).values({
        title: 'UC Investments - Wages Tool',
        description: 'Interactive tool for analyzing UC employee wages and compensation data across the UC system',
        longDescription: 'A specialized tool built for analyzing and visualizing University of California employee wages data. Provides insights into compensation trends, department comparisons, and equity analysis across all UC campuses.',
        categoryId: workCategoryId,
        technologies: ['svelte', 'typescript', 'postgresql', 'd3', 'vercel'],
        liveUrl: 'https://wages.ucinvestments.info/',
        featured: false,
        status: 'active',
        startDate: new Date('2024-08-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Added UC Investments Wages tool');
    }

    // 7. Add UC Investments BDS tool
    const existingBDS = await db.select()
      .from(projects)
      .where(eq(projects.title, 'UC Investments - BDS Tool'));

    if (existingBDS.length === 0) {
      await db.insert(projects).values({
        title: 'UC Investments - BDS Tool',
        description: 'Tool for tracking and analyzing UC investments in relation to BDS (Boycott, Divestment, Sanctions) criteria',
        longDescription: 'A comprehensive analysis tool that examines University of California investment portfolios in relation to BDS criteria. Provides transparency in institutional investment practices and helps track divestment commitments.',
        categoryId: workCategoryId,
        technologies: ['svelte', 'typescript', 'postgresql', 'python', 'data-analysis'],
        liveUrl: 'https://bds.ucinvestments.info/',
        featured: false,
        status: 'active',
        startDate: new Date('2024-09-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Added UC Investments BDS tool');
    }

    // 8. Update other professional work projects to ensure they're visible
    const techJusticeProjects = [
      'RJA Tool - Tech & Justice Lab',
      'CPDA - Tech & Justice Lab'
    ];

    for (const projectTitle of techJusticeProjects) {
      const [project] = await db.select()
        .from(projects)
        .where(eq(projects.title, projectTitle));

      if (project && project.categoryId !== workCategoryId) {
        await db.update(projects)
          .set({
            categoryId: workCategoryId,
            updatedAt: new Date()
          })
          .where(eq(projects.id, project.id));
        console.log(`Updated ${projectTitle} to professional work category`);
      }
    }

    // 9. Remove translation category if it exists
    const [translationCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'translation'));

    if (translationCategory) {
      // First move any translation projects to personal
      await db.update(projects)
        .set({ categoryId: personalCategoryId })
        .where(eq(projects.categoryId, translationCategory.id));

      // Then delete the category
      await db.delete(projectCategories)
        .where(eq(projectCategories.id, translationCategory.id));
      console.log('Removed translation category');
    }

    console.log('\nProject updates completed successfully!');

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
    console.error('Error updating projects:', error);
    process.exit(1);
  }
}

updateProjects();