<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { getTechIcon } from "$lib/utils/icons";
  import Icon from "@iconify/svelte";
  import "../../app.css";
  import { onMount } from "svelte";

  type ProjectData = {
    name: string;
    description: string;
    link: string;
    tags: string[];
    date: string;
  };

  export let data: ProjectData[];
  export let name: string;

  $: sortedProjects = [...data].sort(
    (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  function getEmbedUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "github.com") {
        if (url.endsWith(".html")) {
          return `https://htmlpreview.github.io/?${url}`;
        }
        return url.replace("github.com", "githubbox.com");
      }
      return url;
    } catch {
      return url;
    }
  }

  function getFaviconUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return `https://external-content.duckduckgo.com/ip3/${domain}.ico`;
    } catch {
      return "";
    }
  }

  let showModal = false;
  let selectedProject: ProjectData | null = null;
  let modalElement: HTMLElement | null = null;
  let previouslyFocusedElement: HTMLElement | null = null;

  function openModal(project: ProjectData) {
    previouslyFocusedElement = document.activeElement as HTMLElement;
    selectedProject = project;
    showModal = true;
    document.body.style.overflow = "hidden";
    setTimeout(() => modalElement?.focus(), 0);
  }

  function closeModal() {
    showModal = false;
    document.body.style.overflow = "auto";
    previouslyFocusedElement?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && showModal) closeModal();
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });
</script>

<section class="category">
  <h2 class="category-label">{name}</h2>
  <div class="grid" role="list" aria-label="{name} projects">
    {#each sortedProjects as project}
      <button
        class="card"
        on:click={() => openModal(project)}
        on:keydown={(e) =>
          (e.key === "Enter" || e.key === " ") &&
          (e.preventDefault(), openModal(project))}
        role="listitem"
        aria-label="View details for {project.name}"
      >
        <div class="card-top">
          {#if getFaviconUrl(project.link)}
            <img
              src={getFaviconUrl(project.link)}
              alt=""
              class="favicon"
              aria-hidden="true"
            />
          {/if}
          <h3>{project.name}</h3>
        </div>
        <p class="card-desc">
          {project.description.length > 120
            ? project.description.substring(0, 120) + "..."
            : project.description}
        </p>
        <div class="card-bottom">
          <div class="card-tags">
            {#each project.tags.slice(0, 3) as tag}
              <span class="tag">{tag}</span>
            {/each}
            {#if project.tags.length > 3}
              <span class="tag tag-more">+{project.tags.length - 3}</span>
            {/if}
          </div>
          <span class="card-date">{formatDate(project.date)}</span>
        </div>
      </button>
    {/each}
  </div>
</section>

<!-- Modal -->
{#if showModal && selectedProject}
  <div
    class="modal-overlay"
    on:click={closeModal}
    on:keydown={(e) =>
      (e.key === "Enter" || e.key === " ") &&
      (e.preventDefault(), closeModal())}
    role="presentation"
    transition:fade={{ duration: 150 }}
  >
    <div
      class="modal"
      on:click|stopPropagation
      on:keydown|stopPropagation
      in:scale={{ duration: 200, start: 0.95 }}
      out:scale={{ duration: 150, start: 0.95 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      bind:this={modalElement}
      tabindex="-1"
    >
      <button
        class="modal-close"
        on:click={closeModal}
        aria-label="Close project details"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div class="modal-grid">
        <div class="modal-iframe">
          <iframe
            src={getEmbedUrl(selectedProject.link)}
            title="Preview of {selectedProject.name}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          ></iframe>
        </div>

        <div class="modal-details">
          <div class="modal-header">
            {#if getFaviconUrl(selectedProject.link)}
              <img
                src={getFaviconUrl(selectedProject.link)}
                alt=""
                class="modal-favicon"
                aria-hidden="true"
              />
            {/if}
            <h2 id="modal-title">{selectedProject.name}</h2>
          </div>

          <p class="modal-desc">{selectedProject.description}</p>

          <div class="modal-meta">
            <span class="modal-date">{formatDate(selectedProject.date)}</span>
          </div>

          <div class="modal-tags">
            {#each selectedProject.tags as tag}
              <span class="modal-tag">
                <Icon
                  icon={getTechIcon(tag)}
                  class="modal-tag-icon"
                  aria-hidden="true"
                />
                {tag}
              </span>
            {/each}
          </div>

          <a
            href={selectedProject.link}
            class="modal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project →
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Category section */
  .category {
    margin-bottom: var(--space-2xl);
  }

  .category-label {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-md);
    font-weight: 600;
  }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  /* Card */
  .card {
    display: flex;
    flex-direction: column;
    text-align: left;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: border-color var(--transition-fast);
    min-height: 160px;
  }

  .card:hover {
    border-color: var(--accent-primary);
  }

  .card:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  .card-top {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .favicon {
    width: 18px;
    height: 18px;
    border-radius: 2px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .card-top h3 {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.3;
  }

  .card-desc {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0 0 auto;
    flex: 1;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: var(--space-sm);
    gap: var(--space-sm);
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

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

  .card-date {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Modal overlay */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--space-lg);
  }

  .modal {
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 1100px;
    max-height: 85vh;
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-lg);
  }

  .modal-close {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    font-size: 1.25rem;
    background: var(--bg-tertiary);
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    z-index: 10;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background var(--transition-fast);
  }

  .modal-close:hover {
    background: var(--bg-quaternary);
  }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 85vh;
  }

  .modal-iframe {
    position: relative;
    height: 100%;
    background: var(--bg-secondary);
    overflow: hidden;
  }

  .modal-iframe iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .modal-details {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .modal-favicon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    object-fit: contain;
  }

  .modal-header h2 {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .modal-desc {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0 0 var(--space-lg);
    flex: 1;
  }

  .modal-meta {
    margin-bottom: var(--space-md);
  }

  .modal-date {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-secondary);
  }

  .modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-lg);
  }

  .modal-tag {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
  }

  :global(.modal-tag-icon) {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .modal-link {
    display: inline-block;
    color: var(--accent-primary);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-mono);
    font-weight: 500;
    text-decoration: none;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    align-self: flex-start;
  }

  .modal-link:hover {
    border-color: var(--accent-primary);
    background: var(--bg-secondary);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .modal-grid {
      grid-template-columns: 1fr;
    }

    .modal-iframe {
      height: 40vh;
    }
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

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
