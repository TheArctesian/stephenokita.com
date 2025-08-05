import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    // Fetch latest blog post
    const postsResponse = await fetch('/api/posts');
    const posts: Post[] = await postsResponse.json();
    const latestPost = posts[0] || null;

    // Fetch latest project (sorted by date)
    const projectsResponse = await fetch('/api/projects');
    const projects = await projectsResponse.json();
    
    // Sort projects by date (assuming they have a date field) and get latest
    const sortedProjects = Array.isArray(projects) ? 
      projects.sort((a, b) => new Date(b.created_at || b.date || 0).getTime() - new Date(a.created_at || a.date || 0).getTime()) :
      [];
    const latestProject = sortedProjects[0] || null;

    // Fetch actual file sizes from API
    const fileSizesResponse = await fetch('/api/file-sizes');
    const fileSizes = await fileSizesResponse.json();

    return {
      latestPost,
      latestProject,
      fileSizes
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {
      latestPost: null,
      latestProject: null,
      fileSizes: {
        blog: '4.0K',
        projects: '2.1K', 
        skills: '1.5K',
        person: '3.2K',
        meta: '3.2K'
      }
    };
  }
};