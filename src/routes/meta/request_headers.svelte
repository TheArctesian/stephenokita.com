<script lang="ts">
  import { slide } from "svelte/transition";

  /**
   * The request-header inspector: the spotlight headers the browser sent and
   * a toggle that slides open the full raw header dump. Data comes from the
   * server load; this component only owns presentation and the toggle state.
   */
  export let spotlight: { name: string; value: string | null }[];
  export let allHeaders: Record<string, string>;
  export let headerCount: number;

  let showRawHeaders = false;
</script>

<p class="subsection">Headers your browser sent:</p>
<div class="header-list">
  {#each spotlight as entry}
    <div class="header-row">
      <span class="header-name">{entry.name}</span>
      <span class="header-value">{entry.value}</span>
    </div>
  {/each}
</div>

<button class="link-toggle" on:click={() => (showRawHeaders = !showRawHeaders)}>
  {showRawHeaders ? "Hide" : "Show"} all {headerCount} raw headers
  <span class="chevron" class:open={showRawHeaders}>&darr;</span>
</button>
{#if showRawHeaders}
  <pre class="raw-dump" transition:slide={{ duration: 250 }}>{Object.entries(
      allHeaders,
    )
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}</pre>
{/if}

<style>
  .subsection {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: var(--space-lg) 0 var(--space-sm);
  }

  .header-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .header-row {
    display: grid;
    grid-template-columns: minmax(8rem, 12rem) 1fr;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--border-primary);
  }

  .header-row:last-child {
    border-bottom: none;
  }

  .header-name {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-tertiary);
    word-break: break-all;
  }

  .header-value {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    word-break: break-word;
  }

  .raw-dump {
    margin: var(--space-md) 0 0;
    padding: var(--space-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: auto;
    line-height: 1.6;
  }

  .link-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    margin-top: var(--space-md);
    padding: 0;
    background: none;
    border: none;
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .link-toggle:hover {
    color: var(--accent-primary);
  }

  .chevron {
    transition: transform var(--transition-fast);
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  @media (max-width: 640px) {
    .header-row {
      grid-template-columns: 1fr;
      gap: 2px;
    }
  }
</style>
