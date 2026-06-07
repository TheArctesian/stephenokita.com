<script lang="ts">
  /**
   * The RSS feed URL with a copy-to-clipboard button. The button label
   * reflects copy status ("Copy" → "Copied" / "Failed"), driven by the page.
   */
  export let copyStatus = "";
  export let onCopy: () => void;
</script>

<div class="rss-row">
  <code class="rss-url">https://stephenokita.com/rss.xml</code>
  <button class="rss-copy" on:click={onCopy}>{copyStatus || "Copy"}</button>
</div>

<style>
  .rss-row {
    display: flex;
    gap: var(--space-sm);
    align-items: stretch;
    flex-wrap: wrap;
  }

  .rss-url {
    flex: 1;
    min-width: 220px;
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--accent-tertiary);
    display: flex;
    align-items: center;
    word-break: break-all;
  }

  .rss-copy {
    padding: var(--space-sm) var(--space-lg);
    background: transparent;
    border: 1px solid var(--accent-primary);
    border-radius: var(--radius-md);
    color: var(--accent-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--transition-fast);
  }

  .rss-copy:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
  }
</style>
