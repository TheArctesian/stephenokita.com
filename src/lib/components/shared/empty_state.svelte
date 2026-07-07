<script lang="ts">
  /**
   * Centred empty-state: icon + title + description. Used by the blog
   * listing when no posts match a filter; trivially reusable anywhere a
   * "nothing here" message is needed. Provide an `icon` slot for a
   * custom SVG, otherwise a neutral default is shown.
   */
  import { t } from "$lib/i18n";

  export let title: string | undefined = undefined;
  export let description = "";

  // Fall back to the localized default only when no title prop is supplied.
  // Reactive so it tracks locale changes.
  $: resolvedTitle = title ?? $t("shared.emptyTitle");
</script>

<div class="empty-state" role="status">
  <span class="empty-state__icon" aria-hidden="true">
    <slot name="icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </slot>
  </span>
  <h2 class="empty-state__title">{resolvedTitle}</h2>
  {#if description || $$slots.default}
    <p class="empty-state__description">
      <slot>{description}</slot>
    </p>
  {/if}
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xl) var(--space-xl);
    text-align: center;
  }

  .empty-state__icon {
    display: inline-flex;
    color: var(--text-tertiary);
    margin-bottom: var(--space-md);
  }

  .empty-state__icon :global(svg) {
    width: 64px;
    height: 64px;
  }

  .empty-state__title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--space-sm);
  }

  .empty-state__description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
  }
</style>
