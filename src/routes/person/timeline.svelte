<script lang="ts" context="module">
  export interface TimelineRow {
    /** Place / role label. May contain trusted inline HTML (links). */
    place: string;
    /** Right-aligned date range. */
    dates: string;
  }
</script>

<script lang="ts">
  /**
   * Place + date-range rows with a hairline divider between them.
   * Serves both the "Background" (where I've lived) list and the work
   * history. `place` may carry trusted inline markup (anchors), so it
   * is rendered with `{@html}`.
   */
  export let rows: TimelineRow[] = [];
</script>

<div class="flex flex-col">
  {#each rows as row}
    <div class="timeline-row">
      <span class="timeline-place">{@html row.place}</span>
      <span class="timeline-dates">{@html row.dates}</span>
    </div>
  {/each}
</div>

<style>
  .timeline-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-md);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
    font-size: var(--font-size-sm);
  }

  .timeline-row:last-child {
    border-bottom: none;
  }

  .timeline-place {
    color: var(--text-primary);
    font-weight: 500;
  }

  .timeline-place :global(a) {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .timeline-place :global(a:hover) {
    color: var(--text-primary);
  }

  .timeline-dates {
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    white-space: nowrap;
  }
</style>
