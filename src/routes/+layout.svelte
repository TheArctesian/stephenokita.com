<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  
  import Navigation from "$lib/components/ui/Navigation.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";

  inject({ mode: dev ? "development" : "production" });
  injectSpeedInsights();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Stephen Daniel Okita's Blog RSS Feed" href="/rss.xml" />
</svelte:head>

<div class="min-h-screen bg-bg-primary text-text-primary transition-colors duration-normal">
  <Navigation />

  <main>
    <slot />
  </main>

  <Footer />
</div>
