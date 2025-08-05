import { json } from '@sveltejs/kit';
import { ProjectsService } from '$lib/services/projects';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');
    
    if (featured === 'true') {
      const projects = await ProjectsService.getFeaturedProjects();
      return json(projects);
    }
    
    if (category) {
      const projects = await ProjectsService.getProjectsByCategory(category);
      return json(projects);
    }
    
    const projects = await ProjectsService.getAllProjects();
    return json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const project = await ProjectsService.createProject(data);
    return json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return json({ error: 'Failed to create project' }, { status: 500 });
  }
};