<script lang="ts">
  /**
   * Flex-wrap list of tags / pills / badges. Accepts either a plain
   * string[] or an array of { label, href? } objects; items with an
   * href render as links. Mirrors `.pill-list` / `.pill` on person and
   * skills. Extra per-pill classes can be supplied via `pillClass`.
   */
  type PillItem = string | { label: string; href?: string };

  export let items: PillItem[] = [];
  /** Extra class(es) appended to every pill (e.g. tier modifiers). */
  export let pillClass = "";
  export let ariaLabel: string | undefined = undefined;

  const normalize = (item: PillItem) =>
    typeof item === "string" ? { label: item, href: undefined } : item;
</script>

<div class="pattern-pill-list" aria-label={ariaLabel}>
  {#each items as item}
    {@const pill = normalize(item)}
    {#if pill.href}
      <a class="pattern-pill {pillClass}" href={pill.href}>
        {pill.label}
      </a>
    {:else}
      <span class="pattern-pill {pillClass}">{pill.label}</span>
    {/if}
  {/each}
  <slot />
</div>
