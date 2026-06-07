<script lang="ts">
  /**
   * The deep-fingerprint readout: a grid of device-trait watch cards, the
   * detected-fonts pill list and the audio-stack fingerprint line. Driven by
   * the `fp` object the page collects client-side; renders nothing extra for
   * traits the browser didn't expose.
   */
  import WatchCard from "./watch_card.svelte";

  export let fp: any;
</script>

<div class="watch-grid">
  <WatchCard
    key="Screen"
    value={`${fp.screen.width}×${fp.screen.height} @ ${fp.screen.pixelRatio}x`}
    note={`${fp.screen.colorDepth}-bit colour`}
  />
  <WatchCard
    key="Viewport"
    value={`${fp.window.innerWidth}×${fp.window.innerHeight}`}
    note="your current window size"
  />
  <WatchCard key="CPU threads" value={fp.hardwareConcurrency ?? "?"}>
    {fp.deviceMemory ? `${fp.deviceMemory} GB RAM class` : "logical cores"}
  </WatchCard>
  {#if fp.gpu}
    <WatchCard key="GPU" value={fp.gpu.renderer ?? fp.gpu.vendor} wide />
  {/if}
  {#if fp.battery}
    <WatchCard
      key="Battery"
      value={`${fp.battery.level}% ${fp.battery.charging ? "(charging)" : ""}`}
    />
  {/if}
  {#if fp.connection}
    <WatchCard key="Connection" value={fp.connection.effectiveType}>
      ~{fp.connection.downlink} Mbps, {fp.connection.rtt}ms RTT
    </WatchCard>
  {/if}
  <WatchCard key="Touch points" value={fp.maxTouchPoints} />
  <WatchCard key="Do Not Track" value={fp.doNotTrack ?? "not set"} />
</div>

{#if fp.fonts?.length}
  <p class="subsection">
    Fonts detected on your system ({fp.fonts.length}):
  </p>
  <div class="chip-row">
    {#each fp.fonts as font}
      <span class="chip" style="font-family: '{font}', monospace">{font}</span>
    {/each}
  </div>
{/if}

{#if fp.audioFingerprint}
  <p class="subsection">Audio-stack fingerprint</p>
  <code class="mono-line">{fp.audioFingerprint}&hellip;</code>
{/if}

<style>
  .watch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: var(--space-sm);
  }

  .subsection {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: var(--space-lg) 0 var(--space-sm);
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .chip {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    background: var(--bg-tertiary);
    padding: 2px var(--space-sm);
    border-radius: var(--radius-sm);
  }

  .mono-line {
    display: block;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    word-break: break-all;
    background: var(--bg-primary);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
  }
</style>
