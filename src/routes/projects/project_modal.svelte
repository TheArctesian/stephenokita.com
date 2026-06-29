<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { getTechIcon } from "$lib/utils/icons";
  import Icon from "@iconify/svelte";
  import LazyImage from "$lib/components/ui/lazy_image.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import {
    type ProjectData,
    formatDate,
    getFaviconUrl,
  } from "./project_card.svelte";

  export let project: ProjectData;

  const dispatch = createEventDispatcher<{ close: void }>();

  let modalElement: HTMLElement | null = null;

  function close() {
    dispatch("close");
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

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    // Move focus into the dialog once mounted.
    setTimeout(() => modalElement?.focus(), 0);
    return () => document.removeEventListener("keydown", handleKeydown);
  });
</script>

<div
  class="modal-overlay"
  on:click={close}
  on:keydown={(e) =>
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), close())}
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
      on:click={close}
      aria-label="Close project details"
    >
      <span aria-hidden="true">×</span>
    </button>

    <div class="modal-grid">
      <div class="modal-iframe">
        <iframe
          src={getEmbedUrl(project.link)}
          title="Preview of {project.name}"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
        ></iframe>
      </div>

      <div class="modal-details">
        <div class="modal-header">
          {#if getFaviconUrl(project.link)}
            <span class="modal-favicon">
              <LazyImage
                src={getFaviconUrl(project.link)}
                alt=""
                objectFit="contain"
                width={24}
                height={24}
              />
            </span>
          {/if}
          <h2 id="modal-title">{project.name}</h2>
        </div>

        <p class="modal-desc">{project.description}</p>

        <div class="modal-meta">
          <span class="modal-date">{formatDate(project.date)}</span>
        </div>

        <div class="modal-tags">
          {#each project.tags as tag}
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
          href={project.link}
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

<style>
  /* Modal/dialog kept fully scoped: fixed positioning, overlay,
   * grid sizing, scroll containment and responsive collapse are
   * complex enough that Tailwind would obscure rather than clarify. */
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
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
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

  @media (max-width: 900px) {
    .modal-grid {
      grid-template-columns: 1fr;
    }

    .modal-iframe {
      height: 40vh;
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
