<script lang="ts">
  /**
   * Grid of outbound profile links, each a bordered pill with a service
   * icon. Scoped because the icon recolouring on hover is theme-aware.
   */
  import Icon from "@iconify/svelte";
  import { getSocialIcon } from "$lib/utils/icons";

  export let links: { name: string; service: string; url: string }[] = [];
</script>

<div class="social-row">
  {#each links as link}
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      aria-label="{link.name} (opens in new tab)"
    >
      <Icon
        icon={getSocialIcon(link.service)}
        class="social-icon"
        aria-hidden="true"
      />
      <span>{link.name}</span>
    </a>
  {/each}
</div>

<style>
  .social-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast), color var(--transition-fast);
  }

  .social-link:hover {
    border-color: var(--accent-primary);
    color: var(--text-primary);
  }

  :global(.social-icon) {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--text-secondary);
  }

  .social-link:hover :global(.social-icon) {
    color: var(--accent-primary);
  }

  @media (max-width: 640px) {
    .social-row {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
