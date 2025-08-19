import { json } from '@sveltejs/kit';
import { ProjectsService } from '$lib/services/projects';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const categories = await ProjectsService.getProjectCategories();
    return json(categories);
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
};