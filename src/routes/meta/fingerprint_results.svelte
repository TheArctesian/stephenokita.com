<script lang="ts">
  /**
   * The deep-fingerprint readout: a grid of device-trait watch cards, the
   * detected-fonts pill list and the audio-stack fingerprint line. Driven by
   * the `fp` object the page collects client-side; renders nothing extra for
   * traits the browser didn't expose.
   */
  import { t } from "$lib/i18n";
  import WatchCard from "./watch_card.svelte";

  export let fp: any;
</script>

<div class="watch-grid">
  <WatchCard
    key={$t("meta.fpr.screen")}
    value={`${fp.screen.width}×${fp.screen.height} @ ${fp.screen.pixelRatio}x`}
    note={$t("meta.fpr.screenNote", { depth: fp.screen.colorDepth })}
  />
  <WatchCard
    key={$t("meta.fpr.viewport")}
    value={`${fp.window.innerWidth}×${fp.window.innerHeight}`}
    note={$t("meta.fpr.viewportNote")}
  />
  <WatchCard key={$t("meta.fpr.cpu")} value={fp.hardwareConcurrency ?? "?"}>
    {fp.deviceMemory
      ? $t("meta.fpr.ram", { gb: fp.deviceMemory })
      : $t("meta.fpr.cores")}
  </WatchCard>
  {#if fp.gpu}
    <WatchCard
      key={$t("meta.fpr.gpu")}
      value={fp.gpu.renderer ?? fp.gpu.vendor}
      wide
    />
  {/if}
  {#if fp.battery}
    <WatchCard
      key={$t("meta.fpr.battery")}
      value={`${fp.battery.level}% ${fp.battery.charging ? $t("meta.fpr.charging") : ""}`}
    />
  {/if}
  {#if fp.connection}
    <WatchCard key={$t("meta.fpr.connection")} value={fp.connection.effectiveType}>
      {$t("meta.fpr.connectionNote", {
        downlink: fp.connection.downlink,
        rtt: fp.connection.rtt,
      })}
    </WatchCard>
  {/if}
  <WatchCard key={$t("meta.fpr.touch")} value={fp.maxTouchPoints} />
  <WatchCard
    key={$t("meta.fpr.dnt")}
    value={fp.doNotTrack ?? $t("meta.fpr.dntUnset")}
  />
</div>

{#if fp.fonts?.length}
  <p class="subsection">
    {$t("meta.fpr.fonts", { count: fp.fonts.length })}
  </p>
  <div class="chip-row">
    {#each fp.fonts as font}
      <span class="chip" style="font-family: '{font}', monospace">{font}</span>
    {/each}
  </div>
{/if}

{#if fp.audioFingerprint}
  <p class="subsection">{$t("meta.fpr.audio")}</p>
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
