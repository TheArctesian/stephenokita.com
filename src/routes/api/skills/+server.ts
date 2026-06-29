import { json } from '@sveltejs/kit';
import { SkillsService } from '$lib/services/skills';
import { jsonRoute } from '$lib/utils/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = jsonRoute(
  ({ url }) => {
    const category = url.searchParams.get('category');
    return category
      ? SkillsService.getSkillsByCategory(category)
      : SkillsService.getAllSkills();
  },
  { label: 'Error fetching skills:', errorMessage: 'Failed to fetch skills' }
);

export const POST: RequestHandler = jsonRoute(
  async ({ request }) => json(await SkillsService.createSkill(await request.json()), { status: 201 }),
  { label: 'Error creating skill:', errorMessage: 'Failed to create skill' }
);
