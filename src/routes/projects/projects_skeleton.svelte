<script lang="ts">
  /**
   * Placeholder grid shown while the DB-backed projects stream in. Mirrors the
   * project card's shape (min-height, favicon slot, title, description lines,
   * tags, date) and the 3→2→1 responsive grid so real content swaps in without
   * layout shift. Blank blocks gently pulse; disabled under reduced-motion.
   */
  export let sections = 2;
  export let cards = 6;
</script>

<div aria-hidden="true">
  {#each Array(sections) as _, s (s)}
    <section class="mb-2xl">
      <div class="sk sk-heading"></div>
      <div class="grid">
        {#each Array(cards) as _, c (c)}
          <div class="sk-card">
            <div class="sk-row">
              <div class="sk sk-favicon"></div>
              <div class="sk sk-title"></div>
            </div>
            <div class="sk sk-line"></div>
            <div class="sk sk-line"></div>
            <div class="sk sk-line short"></div>
            <div class="sk-foot">
              <div class="sk sk-tag"></div>
              <div class="sk sk-tag"></div>
              <div class="sk sk-date"></div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  /* Mirrors project.svelte's grid breakpoints (768px / 500px). */
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

  .sk-card {
    min-height: 160px;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }

  .sk-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .sk-foot {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-top: auto;
    padding-top: var(--space-sm);
  }

  /* Pulsing blank placeholder primitive. */
  .sk {
    background: var(--bg-tertiary);
    border-radius: var(--radius-sm);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .sk-heading {
    height: 1rem;
    width: 160px;
    margin-bottom: var(--space-md);
  }

  .sk-favicon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .sk-title {
    height: 0.9rem;
    width: 55%;
  }

  .sk-line {
    height: 0.7rem;
    width: 100%;
    margin-bottom: var(--space-xs);
  }

  .sk-line.short {
    width: 70%;
  }

  .sk-tag {
    height: 0.7rem;
    width: 36px;
  }

  .sk-date {
    height: 0.7rem;
    width: 48px;
    margin-left: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .sk {
      animation: none;
    }
  }
</style>
