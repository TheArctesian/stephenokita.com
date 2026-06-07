<script lang="ts">
  /**
   * Page hero: large mono h1 with an optional lede/description and a
   * bottom border. Used by meta, person, skills and home. Pass `title`
   * (or use the default slot for richer markup) and `subtitle` (or the
   * `subtitle` slot). `bordered` toggles the separating bottom border.
   */
  export let title = "";
  export let subtitle = "";
  export let bordered = true;
</script>

<section
  class="pattern-hero"
  class:pattern-hero--bordered={bordered}
>
  <h1 class="pattern-hero__title">
    <slot>{title}</slot>
  </h1>

  {#if $$slots.subtitle || subtitle}
    <p class="pattern-hero__lede">
      <slot name="subtitle">{subtitle}</slot>
    </p>
  {/if}

  <slot name="extra" />
</section>
