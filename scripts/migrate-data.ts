import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from '../src/lib/db/schema';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Load environment variables
config();

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

interface JsonSkill {
  text: string;
  img?: string;
  description?: string;
  level?: string;
  url?: string;
}

interface JsonProject {
  name: string;
  description?: string;
  tags?: string[];
  github?: string;
  link?: string;
  img?: string;
  status?: string;
  featured?: boolean;
  date?: string;
}

interface JsonQuote {
  quote: string;
  author?: string;
  source?: string;
}

interface JsonMusic {
  song: string;
  artist: string;
  album?: string;
  year?: string;
  spotify?: string;
  youtube?: string;
}

async function migrateSkills() {
  console.log('Migrating skills...');
  
  const skillCategories = [
    { name: 'Web Development', slug: 'web', color: '#ff79c6' },
    { name: 'Programming Languages', slug: 'language', color: '#bd93f9' },
    { name: 'Server & Backend', slug: 'server', color: '#50fa7b' },
    { name: 'Database', slug: 'database', color: '#8be9fd' },
    { name: 'Data Science', slug: 'datasci', color: '#ffb86c' },
    { name: 'Analytics', slug: 'anayltics', color: '#f1fa8c' },
    { name: 'API Development', slug: 'api', color: '#ff5555' },
    { name: 'Creative Tools', slug: 'creative', color: '#6272a4' },
    { name: 'Instruments', slug: 'instrument', color: '#ff79c6' },
    { name: 'Languages', slug: 'languages', color: '#bd93f9' }
  ];

  // Insert categories
  const insertedCategories = await db.insert(schema.skillCategories)
    .values(skillCategories)
    .onConflictDoNothing()
    .returning();

  console.log(`Created ${insertedCategories.length} skill categories`);

  // Read and migrate skill files
  const skillFiles = [
    'web.json', 'language.json', 'server.json', 'database.json', 
    'datasci.json', 'anayltics.json', 'api.json', 'creative.json',
    'instrument.json', 'languages.json'
  ];

  let totalSkills = 0;
  
  for (const file of skillFiles) {
    const filePath = join(process.cwd(), 'src/routes/skills', file);
    try {
      const data: JsonSkill[] = JSON.parse(readFileSync(filePath, 'utf-8'));
      const categorySlug = file.replace('.json', '');
      
      // Find category ID
      const [category] = await db.select()
        .from(schema.skillCategories)
        .where(eq(schema.skillCategories.slug, categorySlug));
      
      if (!category) {
        console.log(`Category not found for ${categorySlug}`);
        continue;
      }

      const skillsToInsert = data.map(skill => ({
        name: skill.text,
        categoryId: category.id,
        level: skill.level || 'intermediate',
        description: skill.description,
        icon: skill.img,
        url: skill.url
      }));

      const inserted = await db.insert(schema.skills)
        .values(skillsToInsert)
        .onConflictDoNothing()
        .returning();

      console.log(`Migrated ${inserted.length} skills from ${file}`);
      totalSkills += inserted.length;
    } catch (error) {
      console.log(`Could not read ${file}:`, error);
    }
  }

  console.log(`Total skills migrated: ${totalSkills}`);
}

async function migrateProjects() {
  console.log('Migrating projects...');
  
  const projectCategories = [
    { name: 'Personal Projects', slug: 'personal', description: 'Personal coding projects and experiments' },
    { name: 'Work Projects', slug: 'work', description: 'Professional work and client projects' },
    { name: 'School Projects', slug: 'school', description: 'Academic and coursework projects' },
    { name: 'Published Projects', slug: 'published', description: 'Published and deployed applications' },
    { name: 'Libraries', slug: 'libs', description: 'Open source libraries and packages' }
  ];

  // Insert categories
  const insertedCategories = await db.insert(schema.projectCategories)
    .values(projectCategories)
    .onConflictDoNothing()
    .returning();

  console.log(`Created ${insertedCategories.length} project categories`);

  const projectFiles = ['personal.json', 'work.json', 'school.json', 'published.json', 'libs.json'];
  let totalProjects = 0;

  for (const file of projectFiles) {
    const filePath = join(process.cwd(), 'src/routes/projects', file);
    try {
      const data: JsonProject[] = JSON.parse(readFileSync(filePath, 'utf-8'));
      const categorySlug = file.replace('.json', '');
      
      // Find category ID
      const [category] = await db.select()
        .from(schema.projectCategories)
        .where(eq(schema.projectCategories.slug, categorySlug));
      
      if (!category) {
        console.log(`Category not found for ${categorySlug}`);
        continue;
      }

      const projectsToInsert = data.map(project => ({
        title: project.name,
        description: project.description,
        categoryId: category.id,
        technologies: project.tags || [],
        githubUrl: project.github,
        liveUrl: project.link,
        imageUrl: project.img,
        status: project.status || 'completed',
        featured: project.featured || false
      }));

      const inserted = await db.insert(schema.projects)
        .values(projectsToInsert)
        .onConflictDoNothing()
        .returning();

      console.log(`Migrated ${inserted.length} projects from ${file}`);
      totalProjects += inserted.length;
    } catch (error) {
      console.log(`Could not read ${file}:`, error);
    }
  }

  console.log(`Total projects migrated: ${totalProjects}`);
}

async function migratePersonalData() {
  console.log('Migrating personal data...');

  // Migrate quotes
  try {
    const quotesPath = join(process.cwd(), 'src/routes/person/quotes.json');
    const quotes: JsonQuote[] = JSON.parse(readFileSync(quotesPath, 'utf-8'));
    
    const quotesToInsert = quotes.map(quote => ({
      text: quote.quote,
      author: quote.author,
      source: quote.source,
      language: 'en',
      favorite: false
    }));

    const insertedQuotes = await db.insert(schema.quotes)
      .values(quotesToInsert)
      .onConflictDoNothing()
      .returning();

    console.log(`Migrated ${insertedQuotes.length} quotes`);
  } catch (error) {
    console.log('Could not migrate quotes:', error);
  }

  // Migrate music
  try {
    const musicPath = join(process.cwd(), 'src/routes/person/music.json');
    const music: JsonMusic[] = JSON.parse(readFileSync(musicPath, 'utf-8'));
    
    const musicToInsert = music.map(item => ({
      title: item.song,
      artist: item.artist,
      album: item.album,
      year: item.year,
      spotifyUrl: item.spotify,
      youtubeUrl: item.youtube,
      favorite: false,
      currentlyListening: false
    }));

    const insertedMusic = await db.insert(schema.music)
      .values(musicToInsert)
      .onConflictDoNothing()
      .returning();

    console.log(`Migrated ${insertedMusic.length} music items`);
  } catch (error) {
    console.log('Could not migrate music:', error);
  }

  // Migrate Latin phrases
  try {
    const latinPath = join(process.cwd(), 'src/routes/person/latin.json');
    const latinData = JSON.parse(readFileSync(latinPath, 'utf-8'));
    
    const phrasesToInsert = latinData.map((item: any) => ({
      phrase: item.latin || item.phrase,
      translation: item.english || item.translation,
      context: item.context,
      favorite: false
    }));

    const insertedPhrases = await db.insert(schema.latinPhrases)
      .values(phrasesToInsert)
      .onConflictDoNothing()
      .returning();

    console.log(`Migrated ${insertedPhrases.length} Latin phrases`);
  } catch (error) {
    console.log('Could not migrate Latin phrases:', error);
  }
}

async function main() {
  try {
    console.log('Starting data migration...');
    
    await migrateSkills();
    await migrateProjects();
    await migratePersonalData();
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}