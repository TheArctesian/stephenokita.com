<script lang="ts">
  /**
   * Single skill cell: icon (with letter fallback on load error), name,
   * and an optional category label (shown in search results).
   */
  import { onMount } from "svelte";

  export let text: string;
  export let img: string;
  export let category: string | null = null;

  let loaded = false;
  let errored = false;
  let imgEl: HTMLImageElement;

  function showFallback(el: HTMLImageElement | null, label: string) {
    errored = true; // hides the pulse so it doesn't sit behind the fallback
    if (!el) return;
    const fallback = document.createElement("span");
    fallback.className = "skill-icon-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = (label?.[0] ?? "?").toUpperCase();
    el.replaceWith(fallback);
  }

  // A cached icon may finish (or fail) before the handlers attach, so neither
  // load nor error fires — resolve its final state on mount.
  onMount(() => {
    if (!imgEl?.complete) return;
    if (imgEl.naturalWidth > 0) loaded = true;
    else showFallback(imgEl, text);
  });
</script>

<div class="skill flex flex-col items-center gap-xs p-md text-center rounded-md">
  <span class="skill-icon">
    {#if !loaded && !errored}
      <span class="skill-icon-pulse" aria-hidden="true"></span>
    {/if}
    <img
      bind:this={imgEl}
      src={img}
      alt=""
      width="36"
      height="36"
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      class:is-loaded={loaded}
      on:load={() => (loaded = true)}
      on:error|once={() => showFallback(imgEl, text)}
    />
  </span>
  <span class="skill-name text-text-primary font-medium">{text}</span>
  {#if category}
    <span class="skill-category">{category}</span>
  {/if}
</div>

<style>
  .skill {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    transition: background var(--transition-fast);
  }

  .skill:hover {
    background: var(--bg-secondary);
  }

  .skill-icon {
    position: relative;
    width: 36px;
    height: 36px;
  }

  .skill-icon-pulse {
    position: absolute;
    inset: 0;
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .skill img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.4s ease, transform var(--transition-fast);
  }

  .skill img.is-loaded {
    opacity: 1;
  }

  .skill:hover img {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .skill-icon-pulse {
      animation: none;
    }
    .skill img {
      transition: none;
    }
  }

  /* Applied imperatively to the fallback element replacing a broken img. */
  :global(.skill-icon-fallback) {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .skill-name {
    font-size: var(--font-size-xs);
  }

  .skill-category {
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }
</style>
