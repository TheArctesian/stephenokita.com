<script lang="ts">
  import { slide, fade, scale, fly } from "svelte/transition";
  import { modernAnimations, STAGGER, getAnimation } from "$lib/utils/animations";
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
  export let delay;
  export let wait;
  // Sort projects by date (newest first)
  $: sortedProjects = [...data].sort(
    (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
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

      // GitHub repository handling
      if (urlObj.hostname === "github.com") {
        // Option 1: Use htmlpreview.github.io for HTML files
        if (url.endsWith(".html")) {
          return `https://htmlpreview.github.io/?${url}`;
        }

        // Option 2: Use githubbox.com (CodeSandbox integration)
        return url.replace("github.com", "githubbox.com");

        // Option 3: Alternative - use StackBlitz
        // const parts = urlObj.pathname.split('/').filter(p => p);
        // if (parts.length >= 2) {
        //   const user = parts[0];
        //   const repo = parts[1];
        //   return `https://stackblitz.com/github/${user}/${repo}`;
        // }
      }

      // Return original URL for non-GitHub links
      return url;
    } catch (e) {
      // If URL parsing fails, return the original URL
      return url;
    }
  }

  // Function to extract domain from URL for favicon service
  function getFaviconUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      // Using DuckDuckGo's favicon service (more reliable than Google's)
      return `https://external-content.duckduckgo.com/ip3/${domain}.ico`;
    } catch (e) {
      // Fallback to a generic icon if URL parsing fails
      return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23ddd"/><text x="50" y="50" font-family="Arial" font-size="50" text-anchor="middle" dominant-baseline="middle" fill="%23555">?</text></svg>';
    }
  }


  // Modal state
  let showModal = false;
  let selectedProject: ProjectData | null = null;
  let modalElement: HTMLElement | null = null;
  let previouslyFocusedElement: HTMLElement | null = null;

  function openModal(project: ProjectData) {
    previouslyFocusedElement = document.activeElement as HTMLElement;
    selectedProject = project;
    showModal = true;
    document.body.style.overflow = "hidden";
    // Focus the modal after it renders
    setTimeout(() => {
      modalElement?.focus();
    }, 0);
  }

  function closeModal() {
    showModal = false;
    document.body.style.overflow = "auto";
    // Return focus to the element that opened the modal
    previouslyFocusedElement?.focus();
  }

  // Handle keyboard events for project cards
  function handleCardKeydown(event: KeyboardEvent, project: ProjectData) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(project);
    }
  }

  // Handle keyboard events for modal overlay
  function handleOverlayKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closeModal();
    }
  }

  // Close modal when Escape key is pressed
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && showModal) {
      closeModal();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div
  class="m-4 text-xl text-text-primary font-bold p-4 border text-center rounded-sm"
  out:slide
  in:fly={getAnimation(modernAnimations.slideUp(parseInt(wait) * STAGGER.normal))}
>
  <h1 class="section-title">{name}</h1>
</div>

<div
  class="section-container"
  out:slide
  in:fly={getAnimation(modernAnimations.slideUp(parseInt(delay) * STAGGER.normal))}
>
  <div class="projects-grid" role="list" aria-label="{name} projects">
    {#each sortedProjects as project, i}
      <div
        class="project-card"
        role="listitem"
        in:fly={getAnimation(modernAnimations.slideUp((parseInt(delay) + i) * STAGGER.tight))}
      >
        <button
          class="card-button"
          on:click={() => openModal(project)}
          on:keydown={(e) => handleCardKeydown(e, project)}
          aria-label="View details for {project.name}"
        >
          <div class="card-header">
            <img
              src={getFaviconUrl(project.link)}
              alt=""
              class="favicon"
              aria-hidden="true"
            />
            <h2 class="project-title">{project.name}</h2>
          </div>
          <p class="project-description-preview">
            {project.description.substring(0, 100)}...
          </p>
          <div class="card-footer">
            <div class="tags-preview" aria-label="Technologies used">
              {#each project.tags.slice(0, 4) as tag}
                <span class="tag" title={tag}>
                  <Icon icon={getTechIcon(tag)} class="icon-img" aria-hidden="true" />
                  <span class="sr-only">{tag}</span>
                </span>
              {/each}
              {#if project.tags.length > 4}
                <span class="more-tags" aria-label="{project.tags.length - 4} more technologies">+{project.tags.length - 4}</span>
              {/if}
            </div>
            <div class="date">
              <span class="sr-only">Date: </span>
              {formatDate(project.date)}
            </div>
          </div>
        </button>
      </div>
    {/each}
  </div>
</div>

<!-- Modal -->
{#if showModal && selectedProject}
  <div
    class="modal-overlay"
    on:click={closeModal}
    on:keydown={handleOverlayKeydown}
    role="presentation"
  >
    <div
      class="modal-content"
      on:click|stopPropagation
      on:keydown|stopPropagation
      in:scale
      out:scale
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      bind:this={modalElement}
      tabindex="-1"
    >
      <button
        class="close-button"
        on:click={closeModal}
        aria-label="Close project details"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div class="modal-grid">
        <div class="modal-iframe custom-scrollbar">
          <iframe
            src={getEmbedUrl(selectedProject.link)}
            title="Preview of {selectedProject.name}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          ></iframe>
        </div>

        <div class="modal-details custom-scrollbar">
          <div class="modal-header">
            <img
              src={getFaviconUrl(selectedProject.link)}
              alt=""
              class="modal-favicon"
              aria-hidden="true"
            />
            <h2 id="modal-title" class="modal-title">{selectedProject.name}</h2>
          </div>
          <p class="modal-description">{selectedProject.description}</p>

          <div class="modal-metadata">
            <div class="modal-date">
              <span class="metadata-label">Date:</span>
              <span>{formatDate(selectedProject.date)}</span>
            </div>

            <div class="modal-tags-container">
              <span class="metadata-label" id="tech-label">Technologies:</span>
              <div class="modal-tags" role="list" aria-labelledby="tech-label">
                {#each selectedProject.tags as tag}
                  <span class="mtag" role="listitem">
                    <Icon icon={getTechIcon(tag)} class="icon-img-modal" aria-hidden="true" />
                    <span class="tag-name">{tag}</span>
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <a
            href={selectedProject.link}
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View {selectedProject.name} project (opens in new tab)"
          >
            View Project
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Screen reader only - visually hidden but accessible */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Card button - wraps card content for accessibility */
  .card-button {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    color: inherit;
    font: inherit;
  }

  .card-button:focus {
    outline: none;
  }

  /* Favicon styling */
  .favicon {
    width: 1.5rem;
    margin-right: 8px;
    border-radius: 3px;
    object-fit: contain;
  }

  .modal-favicon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 4px;
    object-fit: contain;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .modal-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  /* Icon styling */
  .icon-img {
    width: 16px;
    height: 16px;
    filter: invert(1);
    display: block;
    flex-shrink: 0;
  }

  /* Fix icon visibility in sketched theme */
  :global([data-theme="sketched"]) .icon-img {
    filter: none;
    opacity: 0.8;
  }

  .icon-img-modal {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  /* Fix modal icon visibility in sketched theme */
  :global([data-theme="sketched"]) .icon-img-modal {
    filter: none;
    opacity: 0.8;
  }

  .tag-name {
    margin-left: 0;
  }

  .tag-text {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Custom scrollbar styling */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--text-primary) var(--bg-primary);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--bg-primary);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--text-primary);
    border-radius: 4px;
    border: 2px solid var(--bg-primary);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--status-purple);
  }

  /* Rest of your styling */
  .text {
    @apply bg-bg-secondary p-md rounded text-xl font-bold text-text-primary;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
    margin: 1rem 1rem 0rem 1rem;
  }

  .section-container {
    margin: 1rem 1rem;
  }

  .projects-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .project-card {
    @apply bg-bg-secondary text-text-primary rounded p-lg;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
    display: flex;
    flex-direction: column;
    height: 200px; /* Fixed height for uniform size */
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    overflow: hidden;
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
  }

  .project-card:has(.card-button:focus) {
    outline: 2px solid var(--status-purple);
    outline-offset: 2px;
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
  }

  /* Fallback for browsers that don't support :has() */
  .card-button:focus-visible {
    outline: 2px solid var(--status-purple);
    outline-offset: 2px;
  }

  .project-title {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .project-description-preview {
    flex-grow: 1;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.5;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .tags-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    max-width: 70%;
  }

  .tag {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    padding: 0.3rem;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mtag {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    padding: 0.4rem 0.6rem;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  .more-tags {
    font-size: 0.7rem;
    opacity: 0.7;
    margin: auto;
  }

  .date {
    font-style: italic;
    opacity: 0.8;
    font-size: 0.85rem;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-primary);
    opacity: 0.95;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background-color: var(--bg-primary);
    border-radius: 0.5rem;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-lg);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    z-index: 10;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--bg-tertiary);
    opacity: 0.8;
  }

  .close-button:hover {
    background-color: var(--bg-tertiary);
    opacity: 0.9;
  }

  .close-button:focus {
    outline: 2px solid var(--status-purple);
    outline-offset: 2px;
    opacity: 1;
  }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    max-height: 90vh;
  }

  .modal-iframe {
    position: relative;
    height: 90vh;
    background-color: var(--bg-secondary);
    overflow: auto;
  }

  .modal-iframe iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .modal-details {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80vh;
  }

  .modal-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-primary);
  }

  .modal-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--text-primary);
    flex-grow: 1;
  }

  .modal-metadata {
    margin-bottom: 2rem;
    color: var(--text-primary);
  }

  .metadata-label {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .modal-date {
    margin-bottom: 1rem;
  }

  .modal-tags-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: auto;
  }

  .modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-link {
    display: inline-block;
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    text-decoration: none;
    text-align: center;
    font-weight: 500;
    align-self: flex-start;
    transition: background-color 0.2s ease;
  }

  .project-link:hover {
    background-color: var(--status-purple);
    color: var(--text-primary);
  }

  .project-link:focus {
    outline: 2px solid var(--status-purple);
    outline-offset: 2px;
    background-color: var(--status-purple);
  }

  @media (max-width: 900px) {
    .modal-grid {
      grid-template-columns: 1fr;
    }

    .modal-iframe {
      height: 40vh;
    }

    .modal-details {
      max-height: 50vh;
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media (max-width: 500px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .project-card {
      height: 180px;
    }
  }
</style>
