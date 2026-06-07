<script lang="ts">
  /**
   * Section wrapper with a small uppercase eyebrow/label, an optional
   * right-aligned meta string and a slotted body. Mirrors the repeated
   * `.section` + `.section-label` (+ `.section-head`) blocks on every
   * top-level page. The eyebrow renders as an h2 by default.
   */
  export let label = "";
  export let meta = "";
  /** Heading level for the eyebrow, for correct document outline. */
  export let headingLevel: 2 | 3 = 2;
  /** Top border + padding, matching the skills page section rhythm. */
  export let bordered = false;
</script>

<section
  class="section-block"
  class:section-block--bordered={bordered}
>
  {#if label || $$slots.label || meta || $$slots.meta}
    <div class="section-head">
      {#if headingLevel === 3}
        <h3 class="section-eyebrow">
          <slot name="label">{label}</slot>
        </h3>
      {:else}
        <h2 class="section-eyebrow">
          <slot name="label">{label}</slot>
        </h2>
      {/if}

      {#if meta || $$slots.meta}
        <span class="section-head__meta">
          <slot name="meta">{meta}</slot>
        </span>
      {/if}
    </div>
  {/if}

  <slot />
</section>

<style>
  .section-block {
    margin-bottom: var(--space-2xl);
  }

  .section-block--bordered {
    border-top: 1px solid var(--border-primary);
    padding-top: var(--space-xl);
  }
</style>
