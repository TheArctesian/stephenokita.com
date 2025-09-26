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

async function addAuraCareHealth() {
  try {
    console.log('Adding Aura Care Health to professional work...');

    // Get professional work category
    const [workCategory] = await db.select()
      .from(projectCategories)
      .where(eq(projectCategories.slug, 'professional-work'));

    if (!workCategory) {
      throw new Error('Professional Work category not found');
    }

    // Check if it already exists
    const existing = await db.select()
      .from(projects)
      .where(eq(projects.title, 'Aura Care Health'));

    if (existing.length > 0) {
      console.log('Aura Care Health already exists in the database');
      return;
    }

    // Add Aura Care Health
    await db.insert(projects).values({
      title: 'Aura Care Health',
      description: 'Healthcare technology platform providing innovative care solutions and patient management systems',
      longDescription: 'Full Stack Developer: Working on healthcare technology solutions to improve patient care delivery and healthcare provider workflows. Building modern web applications with focus on accessibility, security, and HIPAA compliance.',
      categoryId: workCategory.id,
      technologies: ['react', 'typescript', 'nodejs', 'postgresql', 'aws', 'docker', 'kubernetes'],
      liveUrl: 'https://www.auracarehealth.com/',
      githubUrl: null,
      imageUrl: null,
      status: 'active',
      featured: false,
      startDate: new Date('2024-09-01'),
      endDate: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('✅ Successfully added Aura Care Health to Professional Work');

    // Show updated count
    const professionalProjects = await db.select()
      .from(projects)
      .where(eq(projects.categoryId, workCategory.id));

    console.log(`\nProfessional Work now has ${professionalProjects.length} projects`);

  } catch (error) {
    console.error('Error adding Aura Care Health:', error);
    process.exit(1);
  }
}

addAuraCareHealth();