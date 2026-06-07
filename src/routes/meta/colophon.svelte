<script lang="ts">
  /**
   * The "how this site is built" key → value list. Static content; its own
   * border-bottom grid styling differs from the watch cards, so it stays a
   * small page-local component rather than the shared key-value grid.
   */
  const items: { key: string; value: string }[] = [
    { key: "Framework", value: "SvelteKit + TypeScript, SSR/SSG via MDSvex" },
    { key: "Data", value: "Neon Postgres + Drizzle ORM" },
    { key: "Styling", value: "Modular CSS tokens + Tailwind, Nord palette" },
    { key: "Hosting", value: "Vercel edge, deployed from git" },
    { key: "Analytics", value: "PostHog, Umami & Vercel — all free tier" },
    { key: "Build", value: "Bun + Vite" },
  ];
</script>

<div class="colophon">
  {#each items as item}
    <div class="col-item">
      <span class="col-key">{item.key}</span>
      <span class="col-val">{item.value}</span>
    </div>
  {/each}
</div>

<style>
  .colophon {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-sm);
  }

  .col-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--border-primary);
  }

  .col-key {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-primary);
  }

  .col-val {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
  }
</style>
