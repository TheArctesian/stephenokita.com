<script lang="ts">
  /**
   * Closes the loop: queries PostHog server-side for the visitor's *own*
   * distinct_id and shows what it already has on them — event/session counts,
   * how long it's been watching, and their most recent events. Reads from
   * /api/meta/posthog; degrades to clear loading / empty / unconfigured states.
   *
   * Call `refresh()` from the parent after identifying to re-pull (with a beat
   * for ingestion lag).
   */
  import { formatRelativeTime } from "$lib/utils/format";
  import WatchCard from "./watch_card.svelte";

  export let distinctId: string | null;

  interface Stats {
    totalEvents: number;
    sessionCount: number;
    firstSeen: string | null;
    lastSeen: string | null;
  }
  interface RecentEvent {
    event: string;
    timestamp: string;
    url: string | null;
  }

  let state: "idle" | "loading" | "ready" | "unconfigured" | "error" = "idle";
  let stats: Stats | null = null;
  let recent: RecentEvent[] = [];

  export async function refresh() {
    if (!distinctId) return;
    state = "loading";
    try {
      const res = await fetch(
        `/api/meta/posthog?distinct_id=${encodeURIComponent(distinctId)}`,
      );
      const data = await res.json();
      if (!data.configured) {
        state = "unconfigured";
        return;
      }
      stats = data.stats;
      recent = data.recentEvents ?? [];
      state = "ready";
    } catch (e) {
      console.error("posthog profile fetch failed", e);
      state = "error";
    }
  }

  // Auto-load once we have a distinct id.
  $: if (distinctId && state === "idle") refresh();

  function path(url: string | null): string {
    if (!url) return "";
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  }
</script>

{#if state === "loading"}
  <p class="profile-note">Asking PostHog what it has on you&hellip;</p>
{:else if state === "unconfigured"}
  <p class="profile-note">
    A read-only PostHog key isn&rsquo;t configured, so I can&rsquo;t query your
    history back here &mdash; but everything above is still live.
  </p>
{:else if state === "error"}
  <p class="profile-note">Couldn&rsquo;t reach PostHog just now.</p>
{:else if state === "ready" && stats}
  <div class="watch-grid">
    <WatchCard key="Events on you" value={stats.totalEvents} note="recorded so far" />
    <WatchCard key="Sessions" value={stats.sessionCount} note="visits PostHog has linked" />
    {#if stats.firstSeen}
      <WatchCard key="First seen" value={formatRelativeTime(stats.firstSeen)} />
    {/if}
    {#if stats.lastSeen}
      <WatchCard key="Last seen" value={formatRelativeTime(stats.lastSeen)} />
    {/if}
  </div>

  {#if recent.length}
    <p class="profile-subsection">Your most recent events, straight from PostHog:</p>
    <div class="event-list">
      {#each recent as e}
        <div class="event-row">
          <code class="event-name">{e.event}</code>
          {#if e.url}<span class="event-path">{path(e.url)}</span>{/if}
          <span class="event-time">{formatRelativeTime(e.timestamp)}</span>
        </div>
      {/each}
    </div>
  {/if}
{/if}

<style>
  .watch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-sm);
    margin-top: var(--space-sm);
  }

  .profile-note {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: var(--space-sm) 0 0;
  }

  .profile-subsection {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: var(--space-lg) 0 var(--space-sm);
  }

  .event-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .event-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
    font-size: var(--font-size-xs);
  }

  .event-name {
    font-family: var(--font-family-mono);
    color: var(--status-success);
    flex-shrink: 0;
  }

  .event-path {
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    word-break: break-all;
  }

  .event-time {
    margin-left: auto;
    color: var(--text-muted);
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>
