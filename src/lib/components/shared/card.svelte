<script lang="ts">
  /**
   * Base card built on the global `.nord-card`. Renders as an <a> when
   * `href` is set, otherwise a <div>. Used across blog / projects /
   * home for content tiles. The default slot is the body; `variant`
   * selects between the standard bordered card and a flat left-accent
   * bar (`border-left`) treatment used on the home page activity feed.
   */
  export let href: string | undefined = undefined;
  export let variant: "card" | "border-left" = "card";
  /** Forwarded to the anchor when `href` is external. */
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  let className = "";
  export { className as class };

  $: base = variant === "card" ? "nord-card" : "card-accent";
</script>

{#if href}
  <a
    {href}
    {target}
    {rel}
    class="shared-card {base} {className}"
    on:click
  >
    <slot />
  </a>
{:else}
  <div class="shared-card {base} {className}">
    <slot />
  </div>
{/if}

<style>
  .shared-card {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  /* Standard card: pad the global .nord-card surface. */
  .shared-card.nord-card {
    padding: var(--space-md) var(--space-lg);
  }

  /* Left-accent variant — flat, transparent, slides on hover.
   * Mirrors the home page `.card` activity tiles. */
  .card-accent {
    padding: var(--space-md) var(--space-lg);
    border-left: 3px solid var(--border-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: transparent;
    transition:
      border-color var(--transition-fast),
      background-color var(--transition-fast),
      transform var(--transition-fast);
  }

  a.card-accent:hover {
    border-left-color: var(--accent-primary);
    background: var(--bg-secondary);
    transform: translateX(2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .shared-card,
    .card-accent {
      transition: none;
    }
    a.card-accent:hover {
      transform: none;
    }
  }
</style>
