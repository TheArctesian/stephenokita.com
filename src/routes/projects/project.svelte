<script lang="ts">
  import "../../app.css";
  import { t } from "$lib/i18n";
  import ProjectCard, { type ProjectData } from "./project_card.svelte";
  import ProjectModal from "./project_modal.svelte";

  export let data: ProjectData[];
  export let name: string;

  $: sortedProjects = [...data].sort(
    (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let selectedProject: ProjectData | null = null;
  let previouslyFocusedElement: HTMLElement | null = null;

  function openModal(project: ProjectData) {
    previouslyFocusedElement = document.activeElement as HTMLElement;
    selectedProject = project;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    selectedProject = null;
    document.body.style.overflow = "auto";
    previouslyFocusedElement?.focus();
  }
</script>

<section class="mb-2xl">
  <h2 class="section-eyebrow">{name}</h2>
  <div class="grid" role="list" aria-label={$t('projects.ariaSection', { name })}>
    {#each sortedProjects as project}
      <ProjectCard {project} on:open={(e) => openModal(e.detail)} />
    {/each}
  </div>
</section>

{#if selectedProject}
  <ProjectModal project={selectedProject} on:close={closeModal} />
{/if}

<style>
  /* Responsive project grid: 3 → 2 → 1 columns. Kept scoped because the
   * breakpoint thresholds (768px / 500px) differ from Tailwind defaults. */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
