<script lang="ts">
  /**
   * Makes the session-recording fact visceral: a pulsing REC pill and a
   * "watch your own recording" link when PostHog's session replay is rolling.
   * Driven by the `recording` / `replayUrl` the page reads off the live SDK.
   */
  export let recording: boolean;
  export let replayUrl: string | null = null;
</script>

{#if recording}
  <div class="rec">
    <span class="rec-pill">
      <span class="rec-dot"></span>REC
    </span>
    <span class="rec-text">
      Session replay is recording your screen right now &mdash; every mouse
      move, scroll and click.
    </span>
    {#if replayUrl}
      <a class="rec-link" href={replayUrl} target="_blank" rel="noopener noreferrer">
        watch your own recording &rarr;
      </a>
    {/if}
  </div>
{:else}
  <p class="rec-idle">Session replay isn&rsquo;t recording this visit.</p>
{/if}

<style>
  .rec {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-sm) var(--space-md);
    padding: var(--space-md) var(--space-lg);
    margin-bottom: var(--space-sm);
    background: var(--bg-secondary);
    border: 1px solid var(--status-error);
    border-radius: var(--radius-md);
  }

  .rec-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--status-error);
  }

  .rec-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--status-error);
  }

  @media (prefers-reduced-motion: no-preference) {
    .rec-dot {
      animation: rec-pulse 1.4s ease-in-out infinite;
    }
  }

  @keyframes rec-pulse {
    0% { opacity: 1; box-shadow: 0 0 0 0 rgba(191, 97, 106, 0.6); }
    70% { opacity: 0.4; box-shadow: 0 0 0 6px rgba(191, 97, 106, 0); }
    100% { opacity: 1; box-shadow: 0 0 0 0 rgba(191, 97, 106, 0); }
  }

  .rec-text {
    flex: 1;
    min-width: 200px;
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
  }

  .rec-link {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--status-error);
    white-space: nowrap;
  }

  .rec-idle {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--space-sm);
  }
</style>
