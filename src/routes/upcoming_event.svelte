<script lang="ts">
  /**
   * A single "Where I'll be" row: when / where (+ tentative badge,
   * location) / countdown. Carries its own enter/leave transition so
   * the parent list can stagger items by index.
   */
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import {
    formatEventRange,
    eventCountdown,
    isCurrent,
    type CalendarEvent,
  } from "$lib/utils/dates";

  export let event: CalendarEvent;
  export let index = 0;
  export let pageSize = 5;
  export let mounted = false;
  export let prefersReducedMotion = false;

  $: current = isCurrent(event);
</script>

<li
  class="upcoming-item"
  class:tentative={event.tentative && !current}
  class:current
  in:fly|local={{
    duration: mounted && !prefersReducedMotion ? 320 : 0,
    delay: mounted && !prefersReducedMotion ? (index % pageSize) * 40 : 0,
    y: 8,
    easing: cubicOut,
  }}
  out:fade|local={{ duration: prefersReducedMotion ? 0 : 160 }}
>
  <span class="upcoming-when">{formatEventRange(event)}</span>
  <span class="upcoming-where">
    <span class="upcoming-summary">{event.summary}</span>
    {#if event.tentative}<span
        class="upcoming-tentative"
        title="Tentative — may not be there">tentative</span
      >{/if}
    {#if event.location}<span class="upcoming-location">· {event.location}</span
      >{/if}
  </span>
  <span class="upcoming-countdown">{eventCountdown(event.start)}</span>
</li>

<style>
  .upcoming-item {
    display: grid;
    grid-template-columns: minmax(7.5rem, auto) 1fr auto;
    align-items: baseline;
    gap: var(--space-md);
    padding: var(--space-xs) 0;
    border-left: 3px solid var(--border-primary);
    padding-left: var(--space-md);
    transition: border-color var(--transition-fast);
  }

  .upcoming-item:hover {
    border-left-color: var(--accent-tertiary);
  }

  .upcoming-item.current {
    border-left-color: var(--status-success);
  }

  .upcoming-item.current .upcoming-summary {
    color: var(--status-success);
  }

  .upcoming-item.current .upcoming-countdown {
    color: var(--status-success);
  }

  .upcoming-item.tentative {
    border-left-color: var(--status-info);
    border-left-style: dashed;
  }

  .upcoming-item.tentative .upcoming-summary {
    color: var(--status-info);
  }

  .upcoming-item.tentative .upcoming-countdown {
    color: var(--status-info);
  }

  .upcoming-tentative {
    display: inline-block;
    margin-left: var(--space-xs);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--status-info);
    border: 1px solid var(--status-info);
    border-radius: var(--radius-sm);
    padding: 0 var(--space-xs);
    letter-spacing: 0.02em;
    text-transform: lowercase;
    opacity: 0.85;
  }

  .upcoming-when {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .upcoming-where {
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    line-height: 1.4;
    min-width: 0;
  }

  .upcoming-summary {
    font-weight: 600;
  }

  .upcoming-location {
    color: var(--text-secondary);
    margin-left: var(--space-xs);
  }

  .upcoming-countdown {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-secondary);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .upcoming-item {
      grid-template-columns: 1fr;
      gap: 2px;
      padding-left: var(--space-sm);
    }
    .upcoming-countdown {
      justify-self: start;
    }
  }
</style>
