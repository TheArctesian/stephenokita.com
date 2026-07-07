<script lang="ts">
  /**
   * The live capture feed: subscribes to PostHog's own pipeline
   * (`posthog.on('eventCaptured')`) and streams each event it fires — pageviews,
   * autocaptured clicks, rageclicks — with the real property payload, as the
   * visitor generates them. This is PostHog's data, not a re-derivation.
   *
   * `active` reflects whether the *real* SDK is present (false = local-dev stub,
   * which can't emit events — we say so honestly instead).
   */
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { browser } from "$app/environment";
  import { t } from "$lib/i18n";

  export let active: boolean;

  interface FeedLine {
    id: number;
    name: string;
    detail: string;
    time: string;
  }

  const MAX_LINES = 50;
  let lines: FeedLine[] = [];
  let seq = 0;
  let cleanup: (() => void) | null = null;

  function describe(props: Record<string, any> = {}): string {
    const type = props["$event_type"];
    const text = props["$el_text"] ?? props["$elements_chain_texts"]?.[0];
    if (type) {
      return [type, text && `“${String(text).slice(0, 40)}”`]
        .filter(Boolean)
        .join(" ");
    }
    const url: string | undefined = props["$current_url"] ?? props["$pathname"];
    if (url) {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    }
    return "";
  }

  function push(name: string, props: Record<string, any> = {}) {
    const line: FeedLine = {
      id: seq++,
      name: name || get(t)("meta.feed.unnamed"),
      detail: describe(props),
      time: new Date().toLocaleTimeString(),
    };
    // newest first, capped
    lines = [line, ...lines].slice(0, MAX_LINES);
  }

  onMount(() => {
    if (!browser || !active) return;
    const ph: any = (window as any).posthog;
    if (!ph) return;

    // Preferred: subscribe to the real capture stream.
    if (typeof ph.on === "function") {
      try {
        const unsub = ph.on("eventCaptured", (e: any) => {
          push(e?.event, e?.properties);
        });
        cleanup = typeof unsub === "function" ? unsub : null;
        return;
      } catch {
        /* fall through to wrapping */
      }
    }

    // Fallback: wrap capture() so we still see what's being sent.
    if (typeof ph.capture === "function") {
      const original = ph.capture.bind(ph);
      ph.capture = (name: string, props: Record<string, any>, ...rest: any[]) => {
        push(name, props);
        return original(name, props, ...rest);
      };
      cleanup = () => {
        ph.capture = original;
      };
    }
  });

  onDestroy(() => {
    cleanup?.();
    cleanup = null;
  });
</script>

{#if !active}
  <p class="feed-stub">
    {$t("meta.feed.stub")}
  </p>
{:else}
  <div class="feed" role="log" aria-live="polite">
    {#if lines.length === 0}
      <p class="feed-waiting">
        {$t("meta.feed.waiting")}
      </p>
    {:else}
      {#each lines as line (line.id)}
        <div class="feed-line">
          <span class="feed-time">{line.time}</span>
          <span class="feed-name">{line.name}</span>
          {#if line.detail}<span class="feed-detail">{line.detail}</span>{/if}
        </div>
      {/each}
    {/if}
  </div>
{/if}

<style>
  .feed {
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
  }

  .feed-line {
    display: flex;
    gap: var(--space-sm);
    align-items: baseline;
    padding: 2px 0;
    line-height: 1.5;
  }

  @media (prefers-reduced-motion: no-preference) {
    .feed-line:first-child {
      animation: feed-in 0.25s ease-out;
    }
  }

  @keyframes feed-in {
    from { opacity: 0; transform: translateY(-2px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .feed-time {
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .feed-name {
    color: var(--status-success);
    flex-shrink: 0;
  }

  .feed-detail {
    color: var(--text-tertiary);
    word-break: break-all;
  }

  .feed-stub,
  .feed-waiting {
    color: var(--text-tertiary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    line-height: 1.6;
    margin: 0;
  }
</style>
