<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { fade, slide } from "svelte/transition";
  import Comments from "$lib/components/ui/Comments.svelte";

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="min-h-screen" out:slide>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <article class="nord-surface rounded-lg shadow-soft overflow-hidden" in:slide={{ delay: 2 * 150, duration: 300 }}>
      <!-- Article Header -->
      <header class="p-8 border-b border-nord-2">
        <div class="flex flex-col space-y-4" in:fade={{ delay: 3 * 150, duration: 300 }}>
          <h1 class="text-3xl lg:text-4xl font-bold text-text-primary leading-tight">
            {data.meta.title}
          </h1>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-text-tertiary">
            <time class="text-sm font-medium" in:fade={{ delay: 4 * 150, duration: 300 }}>
              Published on {formatDate(data.meta.date)}
            </time>
            <a
              href="/blog"
              class="text-accent-primary hover:text-accent-cyan transition-all duration-fast text-sm font-medium mt-2 sm:mt-0"
              in:fade={{ delay: 7 * 200, duration: 500 }}
            >
              ← Back to blog
            </a>
          </div>
        </div>
      </header>

      <!-- Article Content -->
      <div class="p-8">
        <div class="prose prose-lg max-w-none" in:fade={{ delay: 6 * 150, duration: 300 }}>
          <svelte:component this={data.content} />
        </div>
      </div>
    </article>

    <!-- Comments Section -->
    <div class="mt-8" in:fade={{ delay: 8 * 150, duration: 300 }}>
      <Comments postSlug={data.meta.slug} />
    </div>
  </div>
</div>

<style>
  /* Custom prose styling for blog content */
  :global(.prose) {
    color: var(--text-primary);
    line-height: 1.75;
  }

  :global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
    color: var(--text-primary);
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.prose h1) {
    font-size: 2.25rem;
    line-height: 1.1;
  }

  :global(.prose h2) {
    font-size: 1.875rem;
    line-height: 1.2;
  }

  :global(.prose h3) {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  :global(.prose p) {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }

  :global(.prose a) {
    color: var(--accent-primary);
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  :global(.prose a:hover) {
    color: var(--accent-tertiary);
  }

  :global(.prose blockquote) {
    border-left: 4px solid var(--accent-primary);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--text-tertiary);
  }

  :global(.prose code) {
    background-color: var(--bg-tertiary);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: var(--accent-tertiary);
  }

  :global(.prose pre) {
    background-color: var(--bg-tertiary);
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  :global(.prose pre code) {
    background: none;
    padding: 0;
    color: var(--text-primary);
  }

  :global(.prose ul, .prose ol) {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  :global(.prose li) {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
  }

  /* Images - Centered and styled */
  :global(.prose img) {
    display: block;
    margin: 2rem auto;
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-md);
    transition: all 0.2s ease;
  }

  :global(.prose img:hover) {
    transform: scale(1.02);
    box-shadow: var(--shadow-lg);
  }

  /* Figure captions */
  :global(.prose figure) {
    margin: 2rem 0;
    text-align: center;
  }

  :global(.prose figure img) {
    margin-bottom: 0.5rem;
  }

  :global(.prose figcaption) {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
    margin-top: 0.5rem;
  }
</style>
