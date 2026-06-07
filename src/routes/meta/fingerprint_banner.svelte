<script lang="ts">
  /**
   * The fingerprint reveal banner: the SHA-256 hash of the collected traits
   * plus the rendered canvas-fingerprint image. Purely presentational — the
   * hash and data-URL are computed by the page and passed in.
   */
  export let hash: string;
  export let canvasImage = "";
</script>

<div class="fp-banner">
  <div class="fp-banner-text">
    <span class="fp-banner-label">Your fingerprint</span>
    <code class="fp-hash">{hash}</code>
    <span class="fp-banner-note">
      A hash of the traits below. No cookies, no login &mdash; this
      combination alone is usually enough to recognise you across the
      web.
    </span>
  </div>
  {#if canvasImage}
    <img class="fp-canvas" src={canvasImage} alt="Canvas fingerprint render" />
  {/if}
</div>

<style>
  .fp-banner {
    display: flex;
    gap: var(--space-lg);
    align-items: center;
    flex-wrap: wrap;
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
    background: var(--bg-secondary);
    border: 1px solid var(--border-accent);
    border-radius: var(--radius-md);
  }

  .fp-banner-text {
    flex: 1;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .fp-banner-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-secondary);
  }

  .fp-hash {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--status-success);
    word-break: break-all;
    line-height: 1.5;
  }

  .fp-banner-note {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
    line-height: 1.5;
  }

  .fp-canvas {
    width: 240px;
    height: 60px;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-sm);
    image-rendering: pixelated;
  }
</style>
