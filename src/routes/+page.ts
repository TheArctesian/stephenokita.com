import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  // Above-the-fold data: cheap internal endpoints, awaited so the page
  // shell renders fully on the server.
  const fallbackFileSizes = {
    blog: '4.0K',
    projects: '2.1K',
    skills: '1.5K',
    person: '3.2K',
    meta: '3.2K'
  };

  try {
    const [postsResponse, projectsResponse, fileSizesResponse] = await Promise.all([
      fetch('/api/posts'),
      fetch('/api/projects'),
      fetch('/api/file-sizes'),
    ]);

    const posts: Post[] = await postsResponse.json();
    const latestPost = posts[0] || null;

    const projects = await projectsResponse.json();
    const sortedProjects = Array.isArray(projects) ?
      projects.sort((a, b) => new Date(b.created_at || b.date || 0).getTime() - new Date(a.created_at || a.date || 0).getTime()) :
      [];
    const latestProject = sortedProjects[0] || null;

    const fileSizes = await fileSizesResponse.json();

    return {
      latestPost,
      latestProject,
      fileSizes,
      // Slow external services (location, Google Calendar) are returned as
      // unawaited promises so SvelteKit streams them in after first paint
      // instead of blocking the shell behind the slowest call.
      streamed: {
        location: fetch('/api/location')
          .then((r) => r.json())
          .catch(() => null),
        upcoming: fetch('/api/calendar')
          .then((r) => r.json())
          .then((u) => (Array.isArray(u) ? u : []))
          .catch(() => []),
      },
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {
      latestPost: null,
      latestProject: null,
      fileSizes: fallbackFileSizes,
      streamed: {
        location: Promise.resolve(null),
        upcoming: Promise.resolve([]),
      },
    };
  }
};