<script lang="ts">
  import "../../app.css";
  import Project from "./project.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  function convertProjectsToComponentFormat(projects: any[]) {
    return projects.map((project) => ({
      name: project.title,
      role:
        project.longDescription !== project.description
          ? project.longDescription
          : undefined,
      description: project.description || "",
      link: project.liveUrl || project.githubUrl || "",
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      dateStart: project.startDate
        ? project.startDate.toString().split("T")[0]
        : undefined,
      date: project.endDate
        ? project.endDate.toString().split("T")[0]
        : project.createdAt.toString().split("T")[0],
      tags: project.technologies || [],
      featured: project.featured,
      status: project.status,
    }));
  }

  $: professionalWork =
    data.projectsByCategory.find((cat) => cat.slug === "professional-work")
      ?.projects || [];

  $: personalProjects =
    data.projectsByCategory.find(
      (cat) => cat.slug === "personal" || cat.slug === "personal-projects",
    )?.projects || [];

  $: libraries =
    data.projectsByCategory.find(
      (cat) => cat.slug === "libs" || cat.slug === "libraries-tools",
    )?.projects || [];

  $: schoolProjects =
    data.projectsByCategory.find(
      (cat) => cat.slug === "school" || cat.slug === "school-projects",
    )?.projects || [];

  $: workData = convertProjectsToComponentFormat(professionalWork);
  $: personalData = convertProjectsToComponentFormat(personalProjects);
  $: libsData = convertProjectsToComponentFormat(libraries);
  $: schoolData = convertProjectsToComponentFormat(schoolProjects);
</script>

<svelte:head>
  <title>Projects - Stephen Okita</title>
  <meta
    name="description"
    content="A collection of my professional work, personal projects, and open source contributions."
  />
</svelte:head>

<div class="page">
  <div class="out-of-date-banner">
    Out of date — Oct 2025
  </div>

  <header class="hero">
    <h1>Projects</h1>
  </header>

  {#if workData.length > 0}
    <Project data={workData} name="Professional Work" />
  {/if}

  {#if personalData.length > 0}
    <Project data={personalData} name="Personal Projects" />
  {/if}

  {#if libsData.length > 0}
    <Project data={libsData} name="Libraries & Tools" />
  {/if}

  {#if schoolData.length > 0}
    <Project data={schoolData} name="School Projects" />
  {/if}
</div>

<style>
  .page {
    max-width: 960px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-lg) var(--space-2xl);
  }

  .hero {
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--border-primary);
    margin-bottom: var(--space-xl);
  }

  .hero h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    margin: 0;
  }

  .out-of-date-banner {
    background-color: var(--red, #ff5555);
    color: #fff;
    text-align: center;
    padding: var(--space-sm) var(--space-md);
    font-family: var(--font-family-mono);
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: 4px;
    margin-bottom: var(--space-lg);
  }

  @media (max-width: 640px) {
    .page {
      padding: var(--space-lg) var(--space-md);
    }
  }
</style>
