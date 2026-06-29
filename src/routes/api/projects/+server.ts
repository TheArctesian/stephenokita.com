import { json } from '@sveltejs/kit';
import { ProjectsService } from '$lib/services/projects';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  ({ url }) => {
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');
    if (featured === 'true') return ProjectsService.getFeaturedProjects();
    if (category) return ProjectsService.getProjectsByCategory(category);
    return ProjectsService.getAllProjects();
  },
  { label: 'Error fetching projects:', errorMessage: 'Failed to fetch projects' }
);

export const POST: RequestHandler = jsonRoute(
  async ({ request }) =>
    json(await ProjectsService.createProject(await request.json()), { status: 201 }),
  { label: 'Error creating project:', errorMessage: 'Failed to create project' }
);
