<script lang="ts">
  /**
   * One "Things I Love" category: an icon-headed group of cover cards
   * linking out to each item. Cover aspect-ratio + shape varies by
   * service (square/circular for spotify+youtube, banner for steam),
   * so those rules stay scoped and keyed off `data-service`.
   */
  import Icon from "@iconify/svelte";
  import { getSocialIcon } from "$lib/utils/icons";
  import type { ResolvedCategory } from "./+page.server";

  export let category: ResolvedCategory;
</script>

<div class="works-group mb-xl last:mb-0" data-service={category.service}>
  <div class="works-header flex items-center gap-sm mb-md pb-xs border-b-primary">
    <h3 class="subsection">{category.label}</h3>
    <Icon
      icon={getSocialIcon(category.service)}
      class="works-service-icon"
      aria-hidden="true"
    />
  </div>
  <div class="works-grid">
    {#each category.items as item}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        class="work-card"
        aria-label="{item.title} (opens in new tab)"
      >
        <div class="work-cover-wrap">
          {#if item.cover}
            <img
              src={item.cover}
              alt=""
              class="work-cover"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
          {:else}
            <div class="work-cover work-cover--placeholder" aria-hidden="true">
              <Icon
                icon={getSocialIcon(category.service)}
                class="work-placeholder-icon"
              />
            </div>
          {/if}
        </div>
        <span class="work-title">{item.title}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .subsection {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 0;
  }

  :global(.works-service-icon) {
    width: 14px;
    height: 14px;
    color: var(--text-tertiary);
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-md);
  }

  .work-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    text-decoration: none;
    color: var(--text-secondary);
    transition: color var(--transition-fast), transform var(--transition-fast);
  }

  .work-card:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
  }

  .work-cover-wrap {
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    transition: border-color var(--transition-fast);
  }

  .work-card:hover .work-cover-wrap {
    border-color: var(--accent-primary);
  }

  .work-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .work-cover--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
  }

  :global(.work-placeholder-icon) {
    width: 32px;
    height: 32px;
  }

  .work-title {
    font-size: var(--font-size-xs);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Square covers for services where the artwork is square */
  .works-group[data-service="spotify"] .work-cover-wrap,
  .works-group[data-service="youtube"] .work-cover-wrap {
    aspect-ratio: 1 / 1;
  }

  /* YouTube channel avatars are circular */
  .works-group[data-service="youtube"] .work-cover-wrap {
    border-radius: 50%;
  }

  /* Steam header art is a landscape banner (460x215) */
  .works-group[data-service="steam"] .work-cover-wrap {
    aspect-ratio: 460 / 215;
  }
</style>
