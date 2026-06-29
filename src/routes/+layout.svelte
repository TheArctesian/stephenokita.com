<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  
  import Navigation from "$lib/components/ui/navigation.svelte";
  import Footer from "$lib/components/ui/footer.svelte";
  import LinkPreview from "$lib/components/ui/link_preview.svelte";
  import NavProgress from "$lib/components/ui/nav_progress.svelte";

  inject({ mode: dev ? "development" : "production" });
  injectSpeedInsights();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Stephen Daniel Okita's Blog RSS Feed" href="/rss.xml" />
</svelte:head>

<NavProgress />

<div class="min-h-screen bg-bg-primary text-text-primary transition-colors duration-normal flex flex-col">
  <Navigation />

  <main class="flex-1">
    <slot />
  </main>

  <Footer />
</div>

<LinkPreview />
