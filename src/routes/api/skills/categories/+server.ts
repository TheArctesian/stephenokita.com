import { json } from '@sveltejs/kit';
import { SkillsService } from '$lib/services/skills';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  () => SkillsService.getSkillCategories(),
  { label: 'Error fetching skill categories:', errorMessage: 'Failed to fetch skill categories' }
);

export const POST: RequestHandler = jsonRoute(
  async ({ request }) =>
    json(await SkillsService.createSkillCategory(await request.json()), { status: 201 }),
  { label: 'Error creating skill category:', errorMessage: 'Failed to create skill category' }
);
