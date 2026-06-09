<script lang="ts" context="module">
  export type ProjectData = {
    name: string;
    description: string;
    link: string;
    tags: string[];
    date: string;
  };

  export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  export function getFaviconUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return `https://external-content.duckduckgo.com/ip3/${domain}.ico`;
    } catch {
      return "";
    }
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let project: ProjectData;

  const dispatch = createEventDispatcher<{ open: ProjectData }>();

  function open() {
    dispatch("open", project);
  }

  // Hide a favicon that fails to load, keeping its reserved slot so the
  // title doesn't reflow.
  function hideBrokenFavicon(e: Event) {
    const img = e.currentTarget as HTMLImageElement;
    img.style.visibility = "hidden";
  }
</script>

<button
  class="card flex min-h-[160px] flex-col rounded-md border border-primary bg-bg-secondary p-md text-left"
  on:click={open}
  on:keydown={(e) =>
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
  role="listitem"
  aria-label="View details for {project.name}"
>
  <div class="mb-sm flex items-center gap-sm">
    <span class="favicon-slot" aria-hidden="true">
      {#if getFaviconUrl(project.link)}
        <img
          src={getFaviconUrl(project.link)}
          alt=""
          width="18"
          height="18"
          decoding="async"
          class="favicon"
          on:error={hideBrokenFavicon}
        />
      {/if}
    </span>
    <h3 class="card-title m-0 font-semibold leading-[1.3] text-text-primary">
      {project.name}
    </h3>
  </div>
  <p class="card-desc m-0 mb-auto flex-1 leading-[1.5] text-text-secondary">
    {project.description.length > 120
      ? project.description.substring(0, 120) + "..."
      : project.description}
  </p>
  <div class="mt-sm flex items-end justify-between gap-sm">
    <div class="flex flex-wrap gap-xs">
      {#each project.tags.slice(0, 3) as tag}
        <span class="tag">{tag}</span>
      {/each}
      {#if project.tags.length > 3}
        <span class="tag tag-more">+{project.tags.length - 3}</span>
      {/if}
    </div>
    <span
      class="card-date shrink-0 whitespace-nowrap text-text-secondary"
    >
      {formatDate(project.date)}
    </span>
  </div>
</button>

<style>
  /* Button reset + interaction states kept scoped: Tailwind utilities
   * can't easily reset inherited `font`/`color` on a <button>, and the
   * focus/hover colors map to design tokens. */
  .card {
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: border-color var(--transition-fast);
  }

  .card:hover {
    border-color: var(--accent-primary);
  }

  .card:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  /* Fixed slot reserves the favicon's box up front so the title never
     shifts sideways when the (late-loading) favicon arrives. */
  .favicon-slot {
    display: inline-flex;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .favicon {
    width: 18px;
    height: 18px;
    border-radius: 2px;
    object-fit: contain;
    flex-shrink: 0;
  }

  /* Tag pills: smaller than the shared .pattern-pill (0.65rem mono on
   * bg-tertiary), so kept page-local to preserve the exact card look. */
  .tag {
    font-size: 0.65rem;
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-xs);
    border-radius: var(--radius-sm);
  }

  .tag-more {
    color: var(--text-secondary);
  }

  .card-title {
    font-size: var(--font-size-sm);
  }

  .card-desc {
    font-size: var(--font-size-xs);
  }

  .card-date {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
  }
</style>
