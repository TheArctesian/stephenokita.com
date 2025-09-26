<script lang="ts">
  import "../../app.css";
  import Project from "./project.svelte";
  import { slide, fade, fly } from "svelte/transition";
  import { modernAnimations, getAnimation } from "$lib/utils/animations";
  import type { PageData } from './$types';

  export let data: PageData;

  // Convert database projects to component format
  function convertProjectsToComponentFormat(projects: any[]) {
    return projects.map(project => ({
      name: project.title,
      role: project.longDescription !== project.description ? project.longDescription : undefined,
      description: project.description || '',
      link: project.liveUrl || project.githubUrl || '',
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      dateStart: project.startDate ? project.startDate.toString().split('T')[0] : undefined,
      date: project.endDate ? project.endDate.toString().split('T')[0] : project.createdAt.toString().split('T')[0],
      tags: project.technologies || [],
      featured: project.featured,
      status: project.status
    }));
  }

  // Group projects by category for display
  $: professionalWork = data.projectsByCategory
    .find(cat => cat.slug === 'professional-work')?.projects || [];

  $: personalProjects = data.projectsByCategory
    .find(cat => cat.slug === 'personal' || cat.slug === 'personal-projects')?.projects || [];
    
    
  $: libraries = data.projectsByCategory
    .find(cat => cat.slug === 'libs' || cat.slug === 'libraries-tools')?.projects || [];
    
  $: schoolProjects = data.projectsByCategory
    .find(cat => cat.slug === 'school' || cat.slug === 'school-projects')?.projects || [];

  // Convert to component format
  $: workData = convertProjectsToComponentFormat(professionalWork);
  $: personalData = convertProjectsToComponentFormat(personalProjects);
  $: libsData = convertProjectsToComponentFormat(libraries);
  $: schoolData = convertProjectsToComponentFormat(schoolProjects);
</script>

<svelte:head>
  <title>Projects - Stephen Okita</title>
  <meta name="description" content="A collection of my professional work, personal projects, and open source contributions." />
</svelte:head>

<div out:slide in:fly={getAnimation(modernAnimations.pageIn)}>
  {#if workData.length > 0}
    <Project
      data={workData}
      wait="0"
      delay="0"
      name="Professional Work"
    />
  {/if}

  {#if personalData.length > 0}
    <Project
      delay="1"
      wait={workData.length}
      data={personalData}
      name="Personal Projects"
    />
  {/if}

  {#if libsData.length > 0}
    <Project
      delay="2"
      wait={personalData.length + workData.length}
      data={libsData}
      name="Libraries & Tools"
    />
  {/if}

  {#if schoolData.length > 0}
    <Project
      delay="3"
      wait={libsData.length + personalData.length + workData.length}
      data={schoolData}
      name="School Projects"
    />
  {/if}
</div>

<style>
  .head {
    @apply text-text-primary rounded-xl p-md border-2 border-text-primary;
    @apply transition-all duration-normal;
  }
  .head:hover {
    border: 0.2rem solid var(--status-purple);
  }
  img {
    width: 20rem;
  }
  h1 {
    font-weight: bold;
  }
  .rotate {
    transform: rotate(90deg);
    transition: 0.2s ease-in-out;
  }
  .text {
    background-color: var(--bg-secondary);
    padding: 1rem;
    border-radius: 0.25rem;
    font-size: small;
    margin: 1rem;
  }
  .dis {
    border-radius: 0.25rem;
    font-size: small;
    padding: 1rem;
    margin: 1rem;
    color: var(--status-error);
    background-color: var(--bg-secondary);
  }
  .code {
    font-style: italic;
  }

  @media (max-width: 1000px) {
    .control {
      flex-direction: column;
    }
  }
</style>