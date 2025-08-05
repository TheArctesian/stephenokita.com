import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import path from 'path';

async function getDirectorySize(dirPath: string): Promise<number> {
  let totalSize = 0;
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively get size of subdirectories
        totalSize += await getDirectorySize(fullPath);
      } else if (entry.isFile()) {
        const stats = await fs.stat(fullPath);
        totalSize += stats.size;
      }
    }
  } catch (error) {
    // Directory doesn't exist or no permission, return 0
    return 0;
  }
  
  return totalSize;
}

async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0B';
  
  const k = 1024;
  const sizes = ['B', 'K', 'M', 'G'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  if (i === 0) return `${bytes}B`;
  
  const size = bytes / Math.pow(k, i);
  return `${size.toFixed(1)}${sizes[i]}`;
}

// Calculate sizes for specific website sections
async function getWebsiteSectionSizes() {
  const basePath = process.cwd();
  
  const [
    blogSize,
    projectsSize,
    skillsSize,
    personSize,
    metaSize
  ] = await Promise.all([
    // Blog: Include all blog posts + blog pages
    Promise.all([
      getDirectorySize(path.join(basePath, 'src/routes/blog')),
    ]).then(sizes => sizes.reduce((a, b) => a + b, 0)),
    
    // Projects: Include projects pages and API
    Promise.all([
      getDirectorySize(path.join(basePath, 'src/routes/projects')),
      getFileSize(path.join(basePath, 'src/routes/api/projects/+server.ts')),
      getFileSize(path.join(basePath, 'src/lib/services/projects.ts')),
    ]).then(sizes => sizes.reduce((a, b) => a + b, 0)),
    
    // Skills: Include skills pages and API
    Promise.all([
      getDirectorySize(path.join(basePath, 'src/routes/skills')),
      getFileSize(path.join(basePath, 'src/routes/api/skills/+server.ts')),
      getFileSize(path.join(basePath, 'src/lib/services/skills.ts')),
    ]).then(sizes => sizes.reduce((a, b) => a + b, 0)),
    
    // Person/About: Include person pages
    getDirectorySize(path.join(basePath, 'src/routes/person')),
    
    // Meta: Include meta pages
    getDirectorySize(path.join(basePath, 'src/routes/meta')),
  ]);

  return {
    blog: formatBytes(blogSize),
    projects: formatBytes(projectsSize),
    skills: formatBytes(skillsSize),
    person: formatBytes(personSize),
    meta: formatBytes(metaSize)
  };
}

export async function GET() {
  try {
    const fileSizes = await getWebsiteSectionSizes();
    return json(fileSizes);
  } catch (error) {
    console.error('Error calculating file sizes:', error);
    // Return estimated sizes as fallback
    return json({
      blog: '4.0K',
      projects: '2.1K', 
      skills: '1.5K',
      person: '3.2K',
      meta: '3.2K'
    });
  }
}