<script lang="ts">
  /**
   * UNIX Philosophy: one job — put a schema.org graph in the document head.
   *
   * Svelte parses a literal <script> inside <svelte:head> as a component
   * script, so the tag has to be injected as a template string. safeJsonLd()
   * escapes `<`, `>` and `&`, which is what keeps post frontmatter from
   * breaking out of the element.
   */
  import { safeJsonLd } from "$lib/utils/seo";

  export let data: unknown;
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${safeJsonLd(data)}</script>`}
</svelte:head>
