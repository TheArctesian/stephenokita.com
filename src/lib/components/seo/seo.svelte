<script lang="ts">
  /**
   * UNIX Philosophy: one job — emit a complete, consistent document head.
   *
   * Every page uses this so the title format, canonical URL, Open Graph set
   * and Twitter card can never drift apart again.
   */
  import { page } from "$app/stores";
  import { SITE_CONFIG } from "$lib/constants";
  import { locale } from "$lib/stores/locale";
  import {
    DEFAULT_LOCALE,
    LOCALE_CODES,
    type LocaleCode,
  } from "$lib/i18n/config";
  import {
    absoluteUrl,
    localizedPath,
    ogImageUrl,
    splitLocaleFromPath,
    truncate,
  } from "$lib/utils/seo";

  export let title: string;
  export let description: string;
  /** Site-relative canonical path. Defaults to the current path, locale-stripped. */
  export let canonicalPath: string | undefined = undefined;
  export let image: string | undefined = undefined;
  export let type: "website" | "article" | "profile" = "website";
  export let publishedTime: string | undefined = undefined;
  export let modifiedTime: string | undefined = undefined;
  export let tags: string[] = [];
  export let noindex = false;
  /** Append the site name to <title>. The home page owns its own title. */
  export let suffix = true;
  /**
   * Emit reciprocal hreflang alternates. True for translated chrome pages;
   * false for blog posts, whose bodies are the same English text in every
   * locale and so must not compete as four separate URLs.
   */
  export let alternates = true;

  // og:locale wants language_TERRITORY; the script subtags have no direct
  // equivalent, so map them to the territories they are actually read in.
  const OG_LOCALES: Record<LocaleCode, string> = {
    "en-GB": "en_GB",
    "en-US": "en_US",
    "zh-Hant": "zh_TW",
    "zh-Hans": "zh_CN",
  };

  $: bareTitle = title.trim();
  $: fullTitle = suffix ? `${bareTitle} | ${SITE_CONFIG.title}` : bareTitle;
  $: metaDescription = truncate(description);

  // Derive the canonical from the URL by default so no page can hand-write a
  // path that drifts from where it actually lives.
  $: currentBarePath = splitLocaleFromPath($page.url.pathname).path;
  $: bareCanonical = canonicalPath ?? currentBarePath;
  $: canonical = absoluteUrl(
    alternates ? localizedPath(bareCanonical, $locale) : bareCanonical,
  );

  $: socialImage =
    image ??
    ogImageUrl({
      title: bareTitle,
      kind: type === "article" ? "post" : "page",
      date: publishedTime,
    });
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={canonical} />

  {#if noindex}
    <meta name="robots" content="noindex, follow" />
  {:else}
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
  {/if}

  {#if alternates}
    {#each LOCALE_CODES as code}
      <link
        rel="alternate"
        hreflang={code}
        href={absoluteUrl(localizedPath(bareCanonical, code))}
      />
    {/each}
    <link
      rel="alternate"
      hreflang="x-default"
      href={absoluteUrl(localizedPath(bareCanonical, DEFAULT_LOCALE))}
    />
  {/if}

  <!-- Open Graph -->
  <meta property="og:type" content={type} />
  <meta property="og:title" content={bareTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={canonical} />
  <meta property="og:site_name" content={SITE_CONFIG.title} />
  <meta property="og:locale" content={OG_LOCALES[$locale] ?? "en_GB"} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:image:alt" content={bareTitle} />
  {#if !image}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
  {/if}

  {#if type === "article"}
    {#if publishedTime}
      <meta property="article:published_time" content={publishedTime} />
    {/if}
    {#if modifiedTime}
      <meta property="article:modified_time" content={modifiedTime} />
    {/if}
    <meta property="article:author" content={SITE_CONFIG.title} />
    {#each tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={bareTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={socialImage} />
  <meta name="twitter:image:alt" content={bareTitle} />
</svelte:head>
