import { json } from '@sveltejs/kit';
import { SkillsService } from '$lib/services/skills';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const categories = await SkillsService.getSkillCategories();
    return json(categories);
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return json({ error: 'Failed to fetch skill categories' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const category = await SkillsService.createSkillCategory(data);
    return json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating skill category:', error);
    return json({ error: 'Failed to create skill category' }, { status: 500 });
  }
};