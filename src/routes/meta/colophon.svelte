<script lang="ts">
  import { t } from "$lib/i18n";

  /**
   * The "how this site is built" key → value list. Static content; its own
   * border-bottom grid styling differs from the watch cards, so it stays a
   * small page-local component rather than the shared key-value grid.
   */
  $: items = [
    {
      key: $t("meta.colophon.label.framework"),
      value: $t("meta.colophon.value.framework"),
    },
    {
      key: $t("meta.colophon.label.data"),
      value: $t("meta.colophon.value.data"),
    },
    {
      key: $t("meta.colophon.label.styling"),
      value: $t("meta.colophon.value.styling"),
    },
    {
      key: $t("meta.colophon.label.hosting"),
      value: $t("meta.colophon.value.hosting"),
    },
    {
      key: $t("meta.colophon.label.analytics"),
      value: $t("meta.colophon.value.analytics"),
    },
    {
      key: $t("meta.colophon.label.build"),
      value: $t("meta.colophon.value.build"),
    },
  ] as { key: string; value: string }[];
</script>

<div class="colophon">
  {#each items as item}
    <div class="col-item">
      <span class="col-key">{item.key}</span>
      <span class="col-val">{item.value}</span>
    </div>
  {/each}
</div>

<style>
  .colophon {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-sm);
  }

  .col-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--border-primary);
  }

  .col-key {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-primary);
  }

  .col-val {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
  }
</style>
