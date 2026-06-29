import { ProjectsService } from '$lib/services/projects';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  () => ProjectsService.getProjectCategories(),
  { label: 'Error fetching project categories:', errorMessage: 'Failed to fetch categories' }
);
