<script lang="ts">
  /**
   * Single skill cell: icon (with letter fallback on load error), name,
   * and an optional category label (shown in search results).
   */
  export let text: string;
  export let img: string;
  export let category: string | null = null;

  function replaceWithFallback(e: Event, label: string) {
    const el = e.currentTarget as HTMLImageElement | null;
    if (!el) return;
    const fallback = document.createElement("span");
    fallback.className = "skill-icon-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = (label?.[0] ?? "?").toUpperCase();
    el.replaceWith(fallback);
  }
</script>

<div class="skill flex flex-col items-center gap-xs p-md text-center rounded-md">
  <img
    src={img}
    alt=""
    width="36"
    height="36"
    loading="lazy"
    decoding="async"
    aria-hidden="true"
    on:error|once={(e) => replaceWithFallback(e, text)}
  />
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

  .skill img {
    width: 36px;
    height: 36px;
    opacity: 1;
    transition: transform var(--transition-fast);
  }

  .skill:hover img {
    transform: translateY(-2px);
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
