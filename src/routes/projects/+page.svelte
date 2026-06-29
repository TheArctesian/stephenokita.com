<script lang="ts">
  import "../../app.css";
  import Project from "./project.svelte";
  import ProjectsSkeleton from "./projects_skeleton.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  // The server load streams real Date objects (via devalue), so normalise to a
  // YYYY-MM-DD string regardless of whether the value is a Date or ISO string.
  function toISODate(value: unknown): string | undefined {
    if (!value) return undefined;
    const d = new Date(value as string | Date);
    return isNaN(d.getTime()) ? undefined : d.toISOString().split("T")[0];
  }

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
      dateStart: toISODate(project.startDate),
      date: toISODate(project.endDate) ?? toISODate(project.createdAt) ?? "",
      tags: project.technologies || [],
      featured: project.featured,
      status: project.status,
    }));
  }

  // Group the streamed projects into the four display buckets. Tolerates an
  // undefined list (e.g. an SSR prefetch that renders before data resolves).
  function buildSections(projectsByCategory: any[] = []) {
    const inCategory = (...slugs: string[]) =>
      projectsByCategory.find((cat) => slugs.includes(cat.slug))?.projects || [];

    return {
      workData: convertProjectsToComponentFormat(
        inCategory("professional-work"),
      ),
      personalData: convertProjectsToComponentFormat(
        inCategory("personal", "personal-projects"),
      ),
      libsData: convertProjectsToComponentFormat(
        inCategory("libs", "libraries-tools"),
      ),
      schoolData: convertProjectsToComponentFormat(
        inCategory("school", "school-projects"),
      ),
    };
  }
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

  {#await data.deferred.projects}
    <ProjectsSkeleton />
  {:then resolved}
    {@const s = buildSections(resolved?.projectsByCategory)}
    {#if s.workData.length > 0}
      <Project data={s.workData} name="Professional Work" />
    {/if}

    {#if s.personalData.length > 0}
      <Project data={s.personalData} name="Personal Projects" />
    {/if}

    {#if s.libsData.length > 0}
      <Project data={s.libsData} name="Libraries & Tools" />
    {/if}

    {#if s.schoolData.length > 0}
      <Project data={s.schoolData} name="School Projects" />
    {/if}
  {/await}
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
