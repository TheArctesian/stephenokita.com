<script lang="ts">
  /**
   * "Who are you most like?" — takes the visitor's PostHog distinct_id, asks
   * /api/meta/similarity to compare their coarse traits against the population
   * of past visitors, and shows: how rare they are, their nearest neighbours,
   * and which signals give them away. Degrades to loading / empty / unconfigured.
   */
  import type { Neighbour, Rarity } from "$lib/utils/similarity";
  import { t } from "$lib/i18n";

  export let distinctId: string | null;

  let state: "idle" | "loading" | "ready" | "unconfigured" | "empty" =
    "idle";
  let neighbours: Neighbour[] = [];
  let rarity: Rarity | null = null;

  export async function refresh() {
    if (!distinctId) return;
    state = "loading";
    try {
      const res = await fetch(
        `/api/meta/similarity?distinct_id=${encodeURIComponent(distinctId)}`,
      );
      const data = await res.json();
      if (!data.configured) {
        state = "unconfigured";
        return;
      }
      if (!data.found) {
        state = "empty";
        return;
      }
      neighbours = data.neighbours ?? [];
      rarity = data.rarity ?? null;
      state = "ready";
    } catch (e) {
      console.error("similarity fetch failed", e);
      state = "empty";
    }
  }

  $: if (distinctId && state === "idle") refresh();

  const pct = (s: number) => Math.round(s * 100);
  const fmtOneInN = (n: number) =>
    n >= 10 ? Math.round(n).toLocaleString() : n.toFixed(1);

  function descriptor(n: Neighbour): string {
    return [n.device, n.browser && `${n.browser} on ${n.os ?? "?"}`]
      .filter(Boolean)
      .join(" · ");
  }
  function place(n: Neighbour): string {
    return [n.city, n.country].filter(Boolean).join(", ");
  }
</script>

{#if state === "loading"}
  <p class="twin-note">{$t("meta.twin.loading")}</p>
{:else if state === "unconfigured"}
  <p class="twin-note">
    {$t("meta.twin.unconfigured")}
  </p>
{:else if state === "empty"}
  <p class="twin-note">
    {$t("meta.twin.empty")}
  </p>
{:else if state === "ready" && rarity}
  <div class="twin-headline">
    <span class="twin-rarity">{$t("meta.twin.rarity", { n: fmtOneInN(rarity.oneInN) })}</span>
    <span class="twin-rarity-sub">
      {$t("meta.twin.raritySub", {
        population: rarity.populationSize,
        bits: rarity.bits.toFixed(1),
      })}
    </span>
  </div>

  {#if neighbours.length}
    <p class="twin-subsection">{$t("meta.twin.mostLike")}</p>
    <div class="twin-list">
      {#each neighbours as n}
        <div class="twin-row">
          <span class="twin-score" class:exact={n.score === 1}>{pct(n.score)}%</span>
          <div class="twin-body">
            <span class="twin-desc">{descriptor(n)}</span>
            {#if place(n)}<span class="twin-place">{place(n)}</span>{/if}
          </div>
          <span class="twin-matched">
            {$t("meta.twin.signals", {
              matched: n.matched.length,
              total: rarity.breakdown.length,
            })}
          </span>
        </div>
      {/each}
    </div>
  {/if}

  {#if rarity.breakdown.length}
    <p class="twin-subsection">{$t("meta.twin.givesAway")}</p>
    <div class="twin-signals">
      {#each rarity.breakdown.slice(0, 4) as sig}
        <div class="sig-row">
          <span class="sig-count">{sig.sharedBy}/{rarity.populationSize}</span>
          <span class="sig-text">
            {$t("meta.twin.share", { label: sig.label })}
            <code>{sig.value}</code>
          </span>
        </div>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .twin-note {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: var(--space-sm) 0 0;
  }

  .twin-headline {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-md) var(--space-lg);
    margin-top: var(--space-sm);
    background: var(--bg-secondary);
    border: 1px solid var(--border-accent);
    border-radius: var(--radius-md);
  }

  .twin-rarity {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--accent-secondary);
  }

  .twin-rarity-sub {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
    line-height: 1.5;
  }

  .twin-subsection {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: var(--space-lg) 0 var(--space-sm);
  }

  .twin-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .twin-row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-secondary);
    border-left: 3px solid var(--border-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .twin-score {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    font-weight: 700;
    color: var(--text-secondary);
    flex-shrink: 0;
    width: 3rem;
  }

  .twin-score.exact {
    color: var(--status-error);
  }

  .twin-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    min-width: 0;
  }

  .twin-desc {
    color: var(--text-primary);
    font-size: var(--font-size-sm);
  }

  .twin-place {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
  }

  .twin-matched {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .twin-signals {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .sig-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
    font-size: var(--font-size-xs);
  }

  .sig-count {
    font-family: var(--font-family-mono);
    color: var(--accent-tertiary);
    flex-shrink: 0;
    width: 4rem;
  }

  .sig-text {
    color: var(--text-secondary);
  }

  .sig-text code {
    font-family: var(--font-family-mono);
    color: var(--text-primary);
  }
</style>
