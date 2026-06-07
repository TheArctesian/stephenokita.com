<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Destination for the back button (defaults to the blog index).
  export let backHref = "/blog";
  export let backLabel = "Back to blog";
  // Scroll distance (px) after which the "scroll to top" button appears.
  export let threshold = 300;

  let showScrollTop = false;

  function updateVisibility() {
    showScrollTop = window.scrollY > threshold;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  });
</script>

<div class="floating-actions" aria-label="Page navigation actions">
  <a class="action-button" href={backHref} aria-label={backLabel} title={backLabel}>
    <span aria-hidden="true">←</span>
  </a>

  {#if showScrollTop}
    <button
      class="action-button"
      on:click={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      transition:fade={{ duration: 200 }}
    >
      <span aria-hidden="true">↑</span>
    </button>
  {/if}
</div>

<style>
  .floating-actions {
    position: fixed;
    left: var(--space-lg);
    /* Offset below the (non-sticky) navigation bar so it never overlaps. */
    top: 6.5rem;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    z-index: var(--z-fixed);
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--bg-secondary);
    color: var(--accent-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-medium);
    font-size: 1.25rem;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-normal);
  }

  .action-button:hover {
    background-color: var(--bg-tertiary);
    color: var(--accent-tertiary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .action-button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-soft);
  }

  .action-button:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  @media (max-width: 500px) {
    .floating-actions {
      left: var(--space-md);
      top: 6.5rem;
    }

    .action-button {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 1.1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .action-button {
      transition: none;
    }
    .action-button:hover {
      transform: none;
    }
  }
</style>
