<script>
  import "../app.css";
  import TypedHero from "./typed_hero.svelte";
  import UpcomingEvent from "./upcoming_event.svelte";
  import ActivityCard from "./activity_card.svelte";
  import Skeleton from "$lib/components/ui/skeleton.svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { t } from "$lib/i18n";
  import { locale } from "$lib/stores/locale";
  import {
    localizeProjectTitle,
    localizeProjectDescription,
  } from "$lib/i18n/data/projects";

  export let data;

  const UPCOMING_PAGE_SIZE = 5;
  let upcomingVisible = UPCOMING_PAGE_SIZE;
  let upcomingMounted = false;
  let prefersReducedMotion = false;

  // Past ("previous") events are fetched lazily the first time the user asks
  // for them, then paged the same way as upcoming events.
  let pastShown = false;
  let pastLoaded = false;
  let pastLoading = false;
  /** @type {import('$lib/utils/dates').CalendarEvent[]} */
  let pastEvents = [];
  let pastVisible = UPCOMING_PAGE_SIZE;

  async function togglePrevious() {
    pastShown = !pastShown;
    if (pastShown && !pastLoaded && !pastLoading) {
      pastLoading = true;
      try {
        const res = await fetch("/api/calendar?past=true");
        const data = await res.json();
        pastEvents = Array.isArray(data) ? data : [];
      } catch {
        pastEvents = [];
      } finally {
        pastLoaded = true;
        pastLoading = false;
      }
    }
  }

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
  <meta name="description" content={$t("home.metaDescription")} />
</svelte:head>

<div class="page-shell">
  <TypedHero location={data.streamed.location} />

  {#await data.streamed.upcoming}
    <section class="upcoming" aria-busy="true">
      <div class="upcoming-header">
        <span class="upcoming-label">{$t("home.whereIllBe")}</span>
        <Skeleton width="5rem" height="0.85rem" />
      </div>
      <ul class="upcoming-list">
        {#each Array(UPCOMING_PAGE_SIZE) as _, i (i)}
          <li class="upcoming-item upcoming-item--skeleton">
            <Skeleton width="6.5rem" height="0.8rem" />
            <Skeleton width="min(18rem, 70%)" height="0.95rem" />
            <Skeleton width="3.5rem" height="0.8rem" />
          </li>
        {/each}
      </ul>
    </section>
  {:then upcoming}
    {#if upcoming && upcoming.length > 0}
      <section class="upcoming">
        <div class="upcoming-header">
          <span class="upcoming-label">{$t("home.whereIllBe")}</span>
          <span class="upcoming-count"
            >{$t("home.upcomingCount", { count: upcoming.length })}</span
          >
        </div>

        <div class="upcoming-past-toggle">
          <button
            type="button"
            class="upcoming-more"
            aria-expanded={pastShown}
            on:click={togglePrevious}
          >
            {pastShown ? $t("home.hidePrevious") : $t("home.showPrevious")}
          </button>
        </div>

        {#if pastShown}
          {#if pastLoading}
            <p class="upcoming-past-note">{$t("home.loadingPrevious")}</p>
          {:else if pastEvents.length === 0}
            <p class="upcoming-past-note">{$t("home.noPrevious")}</p>
          {:else}
            {#if pastEvents.length > pastVisible}
              <div class="upcoming-actions upcoming-actions--past">
                <button
                  type="button"
                  class="upcoming-more"
                  on:click={() => (pastVisible += UPCOMING_PAGE_SIZE)}
                >
                  {$t("home.showEarlier")}
                  <span class="upcoming-more-meta"
                    >{$t("home.remaining", {
                      count: pastEvents.length - pastVisible,
                    })}</span
                  >
                </button>
              </div>
            {/if}
            <ul class="upcoming-list upcoming-list--past">
              {#each pastEvents.slice(0, pastVisible).reverse() as event, i (event.uid || event.start + event.summary)}
                <UpcomingEvent
                  {event}
                  past
                  index={i}
                  pageSize={UPCOMING_PAGE_SIZE}
                  mounted={upcomingMounted}
                  {prefersReducedMotion}
                />
              {/each}
            </ul>
          {/if}
        {/if}

        <ul class="upcoming-list">
          {#each upcoming.slice(0, upcomingVisible) as event, i (event.uid || event.start + event.summary)}
            <UpcomingEvent
              {event}
              index={i}
              pageSize={UPCOMING_PAGE_SIZE}
              mounted={upcomingMounted}
              {prefersReducedMotion}
            />
          {/each}
        </ul>

        {#if upcoming.length > upcomingVisible || upcomingVisible > UPCOMING_PAGE_SIZE}
          <div class="upcoming-actions">
            {#if upcoming.length > upcomingVisible}
              <button
                type="button"
                class="upcoming-more"
                on:click={() => (upcomingVisible += UPCOMING_PAGE_SIZE)}
              >
                {$t("home.loadMore")}
                <span class="upcoming-more-meta"
                  >{$t("home.remaining", {
                    count: upcoming.length - upcomingVisible,
                  })}</span
                >
              </button>
            {/if}
            {#if upcomingVisible > UPCOMING_PAGE_SIZE}
              <button
                type="button"
                class="upcoming-more upcoming-less"
                on:click={() => (upcomingVisible = UPCOMING_PAGE_SIZE)}
              >
                {$t("home.showLess")}
              </button>
            {/if}
          </div>
        {/if}
      </section>
    {/if}
  {/await}

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
          title={localizeProjectTitle(
            data.latestProject.id,
            data.latestProject.title,
            $locale,
          )}
          description={localizeProjectDescription(
            data.latestProject.id,
            data.latestProject.description,
            $locale,
          )}
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

  /* Loading rows mirror the real .upcoming-item grid (which is scoped to
     upcoming_event.svelte) so the skeleton occupies the same space. */
  .upcoming-item--skeleton {
    display: grid;
    grid-template-columns: minmax(7.5rem, auto) 1fr auto;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-xs) 0;
    padding-left: var(--space-md);
    border-left: 3px solid var(--border-primary);
  }

  @media (max-width: 640px) {
    .upcoming-item--skeleton {
      grid-template-columns: 1fr;
      gap: 2px;
      padding-left: var(--space-sm);
    }
  }

  .upcoming-past-toggle {
    margin-bottom: var(--space-sm);
    margin-left: var(--space-md);
  }

  .upcoming-list--past {
    margin-bottom: var(--space-sm);
  }

  .upcoming-actions--past {
    justify-content: flex-start;
    margin-top: 0;
    margin-bottom: var(--space-sm);
  }

  .upcoming-past-note {
    margin: 0 0 var(--space-sm) var(--space-md);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
  }

  @media (max-width: 640px) {
    .upcoming-past-toggle,
    .upcoming-past-note {
      margin-left: var(--space-sm);
    }
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
