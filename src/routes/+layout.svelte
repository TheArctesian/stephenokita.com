<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  
  import Navigation from "$lib/components/ui/navigation.svelte";
  import Footer from "$lib/components/ui/footer.svelte";
  import LinkPreview from "$lib/components/ui/link_preview.svelte";
  import NavProgress from "$lib/components/ui/nav_progress.svelte";
  import JsonLd from "$lib/components/seo/json_ld.svelte";
  import { siteGraph } from "$lib/utils/schema";
  import { browser } from "$app/environment";
  import { locale } from "$lib/stores/locale";

  inject({ mode: dev ? "development" : "production" });
  injectSpeedInsights();

  // hooks.server.ts stamps <html lang> on the server, which is what crawlers
  // see. Client-side navigation between locales does not re-run that, so keep
  // the attribute in sync here — styles/tokens.css selects the CJK font stack
  // off :root[lang="zh-*"], and screen readers read it too.
  $: if (browser) document.documentElement.lang = $locale;
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Stephen Daniel Okita's Blog RSS Feed" href="/rss.xml" />
  <link rel="alternate" type="text/plain" title="LLM-readable site index" href="/llms.txt" />
</svelte:head>

<!-- The Person and WebSite nodes are emitted once, site-wide. Every page's own
     graph references them by @id so search engines merge them into one entity. -->
<JsonLd data={siteGraph()} />

<NavProgress />

<div class="min-h-screen bg-bg-primary text-text-primary transition-colors duration-normal flex flex-col">
  <Navigation />

  <main class="flex-1">
    <slot />
  </main>

  <Footer />
</div>

<LinkPreview />
