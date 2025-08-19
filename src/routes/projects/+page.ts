import type { PageLoad } from './$types';
import type { ProjectWithCategory } from '$lib/services/projects';

export const load: PageLoad = async ({ fetch }) => {
  try {
    // Fetch all projects and categories in parallel
    const [projectsResponse, categoriesResponse] = await Promise.all([
      fetch('/api/projects'),
      fetch('/api/projects/categories')
    ]);

    if (!projectsResponse.ok || !categoriesResponse.ok) {
      throw new Error('Failed to fetch projects data');
    }

    const projects: ProjectWithCategory[] = await projectsResponse.json();
    const categories = await categoriesResponse.json();

    // Group projects by category
    const projectsByCategory = categories.map((category: any) => ({
      ...category,
      projects: projects.filter(project => project.categoryId === category.id)
    }));

    return {
      projectsByCategory,
      featuredProjects: projects.filter(project => project.featured)
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projectsByCategory: [],
      featuredProjects: []
    };
  }
};