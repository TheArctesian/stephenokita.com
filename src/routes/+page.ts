import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const [postsResponse, projectsResponse, fileSizesResponse, locationResponse] = await Promise.all([
      fetch('/api/posts'),
      fetch('/api/projects'),
      fetch('/api/file-sizes'),
      fetch('/api/location'),
    ]);

    const posts: Post[] = await postsResponse.json();
    const latestPost = posts[0] || null;

    const projects = await projectsResponse.json();
    const sortedProjects = Array.isArray(projects) ?
      projects.sort((a, b) => new Date(b.created_at || b.date || 0).getTime() - new Date(a.created_at || a.date || 0).getTime()) :
      [];
    const latestProject = sortedProjects[0] || null;

    const fileSizes = await fileSizesResponse.json();
    const location = await locationResponse.json();

    return {
      latestPost,
      latestProject,
      fileSizes,
      location
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
      },
      location: null
    };
  }
};