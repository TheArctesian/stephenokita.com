<script lang="ts">
  /**
   * One "I see you" card in the watch grid: a mono key, a value and an
   * optional note. `wide` makes the card span the full grid row (used for
   * the GPU readout). Value/note can come from props or the matching slots
   * for richer markup.
   */
  export let key: string;
  export let value: string | number | null | undefined = undefined;
  export let note: string | undefined = undefined;
  export let wide = false;
</script>

<div class="watch-card" class:watch-card--wide={wide}>
  <span class="watch-key">{key}</span>
  <span class="watch-val"><slot name="value">{value}</slot></span>
  {#if note || $$slots.default}
    <span class="watch-note"><slot>{note}</slot></span>
  {/if}
</div>

<style>
  .watch-card {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-md);
    border-left: 3px solid var(--border-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: var(--bg-secondary);
    transition: border-color var(--transition-fast);
  }

  .watch-card:hover {
    border-left-color: var(--accent-primary);
  }

  .watch-card--wide {
    grid-column: 1 / -1;
  }

  .watch-key {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-secondary);
  }

  .watch-val {
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    font-weight: 600;
    word-break: break-word;
    font-family: var(--font-family-mono);
  }

  .watch-note {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
    line-height: 1.4;
  }
</style>
