<script lang="ts">
  /**
   * Stacked list of rows with a hairline divider between them. Used for
   * Education, "What I Do" and the Sports column. Each item may carry
   * trusted inline markup (anchors), so rows render with `{@html}`.
   */
  export let items: string[] = [];
</script>

<div class="flex flex-col gap-xs">
  {#each items as item}
    <div class="list-row">{@html item}</div>
  {/each}
</div>

<style>
  .list-row {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
  }

  .list-row:last-child {
    border-bottom: none;
  }

  .list-row :global(a) {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .list-row :global(a:hover) {
    color: var(--text-primary);
  }
</style>
