import type { PageServerLoad } from './$types';
import { ProjectsService } from '$lib/services/projects';

async function buildProjects() {
  const [projects, categories] = await Promise.all([
    ProjectsService.getAllProjects(),
    ProjectsService.getProjectCategories()
  ]);

  // Group projects by category
  const projectsByCategory = categories.map((category) => ({
    ...category,
    projects: projects.filter((project) => project.categoryId === category.id)
  }));

  return {
    projectsByCategory,
    featuredProjects: projects.filter((project) => project.featured)
  };
}

export const load: PageServerLoad = () => {
  // SvelteKit 1 awaits top-level promises but STREAMS nested ones. Nesting the
  // promise under `deferred` lets the page shell render immediately while the
  // project grid resolves behind a skeleton via {#await} in +page.svelte.
  return {
    deferred: {
      projects: buildProjects().catch((error) => {
        console.error('Error loading projects:', error);
        return { projectsByCategory: [], featuredProjects: [] };
      })
    }
  };
};
