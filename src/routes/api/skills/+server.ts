import { json } from '@sveltejs/kit';
import { SkillsService } from '$lib/services/skills';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const category = url.searchParams.get('category');
    
    if (category) {
      const skills = await SkillsService.getSkillsByCategory(category);
      return json(skills);
    }
    
    const skills = await SkillsService.getAllSkills();
    return json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const skill = await SkillsService.createSkill(data);
    return json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return json({ error: 'Failed to create skill' }, { status: 500 });
  }
};