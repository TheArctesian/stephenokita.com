<script lang="ts">
  /**
   * A "recent activity" tile — latest blog post or latest project.
   * Wraps the shared border-left Card; the top row (tag + date/status)
   * and footer (location chip or tech pills) vary by `kind`.
   */
  import Card from "$lib/components/shared/card.svelte";
  import { formatDate } from "$lib/utils/dates";
  import { t } from "$lib/i18n";
  import { locale } from "$lib/stores/locale";

  export let kind: "post" | "project";
  export let href: string;
  export let title: string;
  export let description: string;
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;

  // Post-only
  export let date: string | undefined = undefined;
  export let location: string | undefined = undefined;

  // Project-only
  export let status: string | undefined = undefined;
  export let technologies: string[] = [];
</script>

<Card {href} {target} {rel} variant="border-left">
  <div class="card-top">
    {#if kind === "post"}
      <span class="card-tag blog-tag">{$t("home.latestPost")}</span>
      <span class="card-date">{formatDate(date, $locale)}</span>
    {:else}
      <span class="card-tag project-tag">{$t("home.latestProject")}</span>
      {#if status}<span class="card-status">{status}</span>{/if}
    {/if}
  </div>

  <h3>{title}</h3>
  <p>{description}</p>

  {#if kind === "post"}
    {#if location}<span class="card-location">{location}</span>{/if}
  {:else if technologies && technologies.length > 0}
    <div class="card-tech">
      {#each technologies.slice(0, 4) as tech}
        <span class="tech-pill">{tech}</span>
      {/each}
    </div>
  {/if}
</Card>

<style>
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
  }

  .card-tag {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blog-tag {
    color: var(--accent-tertiary);
  }

  .project-tag {
    color: var(--accent-primary);
  }

  .card-date {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
  }

  .card-status {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
    text-transform: lowercase;
  }

  h3 {
    color: var(--text-primary);
    font-size: var(--font-size-base);
    margin: 0 0 var(--space-xs);
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    margin: 0 0 var(--space-sm);
  }

  .card-location {
    display: inline-block;
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .tech-pill {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
  }
</style>
