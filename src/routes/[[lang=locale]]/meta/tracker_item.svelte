<script lang="ts">
  /**
   * One analytics tracker row in the "who else is watching" list. Renders a
   * live/idle dot, the tracker name, a state label and a slotted description.
   * Optional `ids` (key → value pairs) render an extra id block beneath —
   * used by the PostHog inspector for distinct_id / session_id / replay.
   */
  export let name: string;
  export let active: boolean;
  export let state: string;
  /** Extra identifier rows shown only when present. */
  export let ids: { key: string; value: string }[] = [];
</script>

<div class="tracker" class:on={active}>
  <div class="tracker-head">
    <span class="tracker-dot" class:live={active}></span>
    <span class="tracker-name">{name}</span>
    <span class="tracker-state">{state}</span>
  </div>
  <p class="tracker-desc"><slot /></p>
  {#if ids.length > 0}
    <div class="tracker-ids">
      {#each ids as row}
        <div class="id-row">
          <span class="id-key">{row.key}</span>
          <code class="id-val">{row.value}</code>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .tracker {
    padding: var(--space-md) var(--space-lg);
    border-left: 3px solid var(--border-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: var(--bg-secondary);
  }

  .tracker.on {
    border-left-color: var(--status-error);
  }

  .tracker-head {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
  }

  .tracker-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    flex-shrink: 0;
  }

  .tracker-dot.live {
    background: var(--status-error);
  }

  @media (prefers-reduced-motion: no-preference) {
    .tracker-dot.live {
      animation: pulse 2s ease-in-out infinite;
    }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(191, 97, 106, 0.6); }
    70% { box-shadow: 0 0 0 6px rgba(191, 97, 106, 0); }
    100% { box-shadow: 0 0 0 0 rgba(191, 97, 106, 0); }
  }

  .tracker-name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: var(--font-size-sm);
  }

  .tracker-state {
    margin-left: auto;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
  }

  .tracker-desc {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
  }

  .tracker-desc :global(strong) {
    color: var(--status-error);
  }

  .tracker-ids {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-top: var(--space-sm);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--border-primary);
  }

  .id-row {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: var(--space-sm);
    align-items: baseline;
  }

  .id-key {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-tertiary);
  }

  .id-val {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-primary);
    word-break: break-all;
  }

  @media (max-width: 640px) {
    .id-row {
      grid-template-columns: 1fr;
    }
  }
</style>
