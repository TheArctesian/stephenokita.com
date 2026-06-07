<script>
  import "../app.css";
  import TypedHero from "./typed_hero.svelte";
  import UpcomingEvent from "./upcoming_event.svelte";
  import ActivityCard from "./activity_card.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  export let data;

  const UPCOMING_PAGE_SIZE = 5;
  let upcomingVisible = UPCOMING_PAGE_SIZE;
  let upcomingMounted = false;
  let prefersReducedMotion = false;

  $: upcomingShown = data.upcoming?.slice(0, upcomingVisible) ?? [];
  $: upcomingHasMore = (data.upcoming?.length ?? 0) > upcomingVisible;

  onMount(() => {
    if (browser) {
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
    upcomingMounted = true;
  });
</script>

<svelte:head>
  <title>Stephen Daniel Okita</title>
  <meta
    name="description"
    content="Stephen Daniel Okita — CTO & Co-founder at Auracare Health, Philosophy at UC Berkeley. Notes on software, security, and systems."
  />
</svelte:head>

<div class="page-shell">
  <TypedHero location={data.location} />

  {#if data.upcoming && data.upcoming.length > 0}
    <section class="upcoming">
      <div class="upcoming-header">
        <span class="upcoming-label">Where I'll be</span>
        <span class="upcoming-count">{data.upcoming.length} upcoming</span>
      </div>
      <ul class="upcoming-list">
        {#each upcomingShown as event, i (event.uid || event.start + event.summary)}
          <UpcomingEvent
            {event}
            index={i}
            pageSize={UPCOMING_PAGE_SIZE}
            mounted={upcomingMounted}
            {prefersReducedMotion}
          />
        {/each}
      </ul>

      {#if upcomingHasMore || upcomingVisible > UPCOMING_PAGE_SIZE}
        <div class="upcoming-actions">
          {#if upcomingHasMore}
            <button
              type="button"
              class="upcoming-more"
              on:click={() => (upcomingVisible += UPCOMING_PAGE_SIZE)}
            >
              Load more
              <span class="upcoming-more-meta"
                >({data.upcoming.length - upcomingVisible} remaining)</span
              >
            </button>
          {/if}
          {#if upcomingVisible > UPCOMING_PAGE_SIZE}
            <button
              type="button"
              class="upcoming-more upcoming-less"
              on:click={() => (upcomingVisible = UPCOMING_PAGE_SIZE)}
            >
              Show less
            </button>
          {/if}
        </div>
      {/if}
    </section>
  {/if}

  <section class="recent">
    <div class="activity-grid">
      {#if data.latestPost}
        <ActivityCard
          kind="post"
          href="/blog/{data.latestPost.slug}"
          title={data.latestPost.title}
          description={data.latestPost.description}
          date={data.latestPost.date}
          location={data.latestPost.location}
        />
      {/if}

      {#if data.latestProject}
        <ActivityCard
          kind="project"
          href={data.latestProject.github_url || "/projects"}
          target={data.latestProject.github_url ? "_blank" : undefined}
          rel={data.latestProject.github_url ? "noopener noreferrer" : undefined}
          title={data.latestProject.title}
          description={data.latestProject.description}
          status={data.latestProject.status}
          technologies={data.latestProject.technologies}
        />
      {/if}
    </div>
  </section>
</div>

<style>
  .upcoming {
    margin-bottom: var(--space-xl);
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--border-primary);
  }

  .upcoming-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-md);
  }

  .upcoming-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-tertiary);
  }

  .upcoming-count {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
  }

  .upcoming-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .upcoming-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-md);
    margin-top: var(--space-md);
    margin-left: var(--space-md);
    margin-right: var(--space-md);
  }

  .upcoming-actions .upcoming-less:only-child {
    margin-left: auto;
  }

  .upcoming-more {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-xs);
    padding: 0;
    background: none;
    border: none;
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color var(--transition-fast);
  }

  .upcoming-more:hover {
    color: var(--accent-primary);
  }

  .upcoming-less {
    color: var(--text-tertiary);
  }

  .upcoming-less:hover {
    color: var(--text-secondary);
  }

  .upcoming-more-meta {
    color: var(--text-tertiary);
    text-transform: none;
    letter-spacing: 0;
  }

  .activity-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  @media (max-width: 640px) {
    .upcoming-actions {
      margin-left: var(--space-sm);
    }
    .activity-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
