<script lang="ts">
  /**
   * Responsive grid of key → value (→ note) pairs. Generalises the
   * meta `.watch-grid`, person `.kv-grid` and skills `.env-grid`.
   * Pass `items` as { label, value, note? }. `minWidth` controls the
   * auto-fill track size; omit it (or set 0) for a fixed `columns`
   * grid instead.
   */
  type KVItem = { label: string; value: string; note?: string };

  export let items: KVItem[] = [];
  /** Min track width for the auto-fill grid, in px. */
  export let minWidth = 210;
  /** Fixed column count; used only when `minWidth` is 0. */
  export let columns = 0;

  $: gridStyle =
    minWidth > 0
      ? `--kv-grid-min: ${minWidth}px;`
      : `grid-template-columns: repeat(${columns || 1}, 1fr);`;
</script>

<div class="kv-grid" style={gridStyle}>
  {#each items as item}
    <div class="kv-cell">
      <span class="kv-cell__label">{item.label}</span>
      <span class="kv-cell__value">{item.value}</span>
      {#if item.note}
        <span class="kv-cell__note">{item.note}</span>
      {/if}
    </div>
  {/each}
  <slot />
</div>
