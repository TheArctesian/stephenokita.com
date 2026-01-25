<script lang="ts">
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import { fade, slide, fly } from "svelte/transition";
  import { modernAnimations, STAGGER, getAnimation, animationHelpers } from "$lib/utils/animations";

  let showRssInstructions = false;
  let copyStatus = '';
  let copyTimeout: ReturnType<typeof setTimeout>;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText('https://stephenokita.com/rss.xml');
      copyStatus = 'Copied!';
      // Clear any existing timeout
      if (copyTimeout) clearTimeout(copyTimeout);
      // Reset status after 2 seconds
      copyTimeout = setTimeout(() => {
        copyStatus = '';
      }, 2000);
    } catch (err) {
      copyStatus = 'Failed to copy';
    }
  }

  // Create staggered animations for the 6 tech stack cards
  const cardAnimations = animationHelpers.staggerCards(6, STAGGER.wide);
</script>

<svelte:head>
  <title>Meta | Stephen Daniel Okita</title>
  <meta name="description" content="Technical details about this website, including the technology stack and RSS feed information" />
</svelte:head>

<main class="min-h-screen px-4 py-8" out:slide>
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <AnimatedText element="h1" text="Meta" animation="hero" className="text-4xl font-bold text-accent-primary" />
      <a 
        href="/meta/you" 
        class="nord-button text-sm px-4 py-2"
      >
        Browser Detective →
      </a>
    </div>
    
    <section class="mb-xl" in:fly={getAnimation(modernAnimations.slideUp(STAGGER.normal))}>
      <h2 class="text-2xl font-semibold text-text-primary mb-6 pb-2 border-b border-border-primary">
        Technology Stack
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[0])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Frontend Framework</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">SvelteKit</span> - Full-stack web framework with SSR/SSG
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">TypeScript</span> - Type-safe JavaScript
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">MDSvex</span> - Markdown processing with Svelte components
            </li>
          </ul>
        </div>

        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[1])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Database & ORM</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Neon PostgreSQL</span> - Serverless Postgres
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Drizzle ORM</span> - TypeScript-first ORM
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Dynamic Content</span> - Database-driven management
            </li>
          </ul>
        </div>

        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[2])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Styling & Design</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Modular CSS</span> - Component-based architecture
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">TailwindCSS</span> - Utility-first framework
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Nord Theme</span> - Arctic-inspired palette
            </li>
          </ul>
        </div>

        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[3])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Deployment</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Vercel</span> - Edge deployment with CI/CD
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Analytics</span> - PostHog & Umami tracking
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Environment</span> - Secure configuration
            </li>
          </ul>
        </div>

        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[4])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Development Tools</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Yarn</span> - Package management
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Vite</span> - Lightning-fast build tool
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">ESLint & Prettier</span> - Code quality
            </li>
          </ul>
        </div>

        <div class="nord-card p-md" in:fly={getAnimation(cardAnimations[5])}>
          <h3 class="text-lg font-semibold text-accent-primary mb-3">Architecture</h3>
          <ul class="space-y-2">
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">Clean Architecture</span> - Separation of concerns
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">UNIX Philosophy</span> - Do one thing well
            </li>
            <li class="text-text-secondary">
              <span class="text-text-primary font-medium">RESTful APIs</span> - Consistent patterns
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mb-xl" in:fly={getAnimation(modernAnimations.slideUp(STAGGER.dramatic))}>
      <h2 class="text-2xl font-semibold text-text-primary mb-6 pb-2 border-b border-border-primary">
        RSS Feed
      </h2>
      
      <div class="space-y-6">
        <p class="text-text-secondary text-lg leading-relaxed">
          Stay updated with my latest blog posts by subscribing to the RSS feed. RSS (Really Simple Syndication) 
          allows you to follow websites without constantly checking for new content.
        </p>

        <div class="nord-surface p-6 rounded-lg border-2 border-accent-primary">
          <h3 class="text-lg font-semibold text-text-primary mb-3">Feed URL</h3>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <code class="flex-1 p-3 bg-bg-tertiary rounded font-mono text-accent-tertiary text-sm sm:text-base overflow-x-auto" id="rss-url">
              https://stephenokita.com/rss.xml
            </code>
            <button
              class="nord-button whitespace-nowrap flex-shrink-0"
              on:click={copyToClipboard}
              aria-label="Copy RSS feed URL to clipboard"
            >
              {copyStatus || 'Copy'}
            </button>
            <span class="sr-only" role="status" aria-live="polite">
              {copyStatus}
            </span>
          </div>
        </div>

        <div class="space-y-6">
          <button
            class="w-full text-left flex items-center justify-between p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors duration-200 focus:outline-2 focus:outline-accent-primary focus:outline-offset-2"
            on:click={() => showRssInstructions = !showRssInstructions}
            aria-expanded={showRssInstructions}
            aria-controls="rss-instructions"
          >
            <span class="text-xl font-semibold text-text-primary">How to Subscribe</span>
            <span class="text-2xl text-accent-primary transform transition-transform duration-200 {showRssInstructions ? 'rotate-180' : ''}" aria-hidden="true">
              ↓
            </span>
          </button>
          
          {#if showRssInstructions}
          <div id="rss-instructions" class="space-y-6" in:slide={{ duration: 300 }} out:slide={{ duration: 200 }}>
          
          <div class="nord-surface p-md rounded-lg">
            <h4 class="text-lg font-medium text-accent-secondary mb-3">iOS (iPhone/iPad)</h4>
            <ol class="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Download <strong class="text-text-primary">Feeder</strong> from the App Store (free and privacy-focused)</li>
              <li>Open Feeder and tap the "+" button</li>
              <li>Paste the RSS feed URL: <code class="text-accent-tertiary">https://stephenokita.com/rss.xml</code></li>
              <li>Tap "Add Feed" to subscribe</li>
            </ol>
            <p class="mt-3 text-sm text-text-tertiary italic">
              Alternative apps: NetNewsWire (free, open-source), Reeder 5 (premium)
            </p>
          </div>

          <div class="nord-surface p-md rounded-lg">
            <h4 class="text-lg font-medium text-accent-secondary mb-3">Android</h4>
            <ol class="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Download <strong class="text-text-primary">Feedly</strong> or <strong class="text-text-primary">Inoreader</strong> from Google Play</li>
              <li>Create a free account if required</li>
              <li>Tap "Add Content" or the "+" button</li>
              <li>Search for "stephenokita.com" or paste the RSS URL</li>
              <li>Select the feed and tap "Follow"</li>
            </ol>
            <p class="mt-3 text-sm text-text-tertiary italic">
              Alternative apps: Palabre, FeedMe, RSS Reader
            </p>
          </div>

          <div class="nord-surface p-md rounded-lg">
            <h4 class="text-lg font-medium text-accent-secondary mb-3">Desktop (Windows/Mac/Linux)</h4>
            <ol class="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Use a web-based reader like <strong class="text-text-primary">Feedly</strong> (feedly.com) or <strong class="text-text-primary">The Old Reader</strong></li>
              <li>Or install a desktop app like <strong class="text-text-primary">Thunderbird</strong> (free, cross-platform)</li>
              <li>Add a new feed subscription</li>
              <li>Enter the RSS URL: <code class="text-accent-tertiary">https://stephenokita.com/rss.xml</code></li>
            </ol>
            <p class="mt-3 text-sm text-text-tertiary italic">
              Alternative apps: Vienna (macOS), QuiteRSS (cross-platform), Fluent Reader
            </p>
          </div>

          <div class="nord-surface p-md rounded-lg">
            <h4 class="text-lg font-medium text-accent-secondary mb-3">Browser Extensions</h4>
            <ul class="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong class="text-text-primary">Firefox:</strong> Built-in Live Bookmarks or Feedbro extension</li>
              <li><strong class="text-text-primary">Chrome:</strong> RSS Feed Reader, Feeder, or RSS Subscription Extension</li>
              <li><strong class="text-text-primary">Safari:</strong> RSS Button for Safari or NetNewsWire integration</li>
            </ul>
          </div>
        </div>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="nord-surface p-md rounded-lg">
            <h3 class="text-lg font-semibold text-accent-primary mb-3">What's in the Feed?</h3>
            <ul class="list-disc list-inside space-y-1 text-text-secondary">
              <li>Full blog post titles and descriptions</li>
              <li>Publication dates for chronological sorting</li>
              <li>Direct links to each blog post</li>
              <li>Category tags for content organization</li>
              <li>Automatic updates when new posts are published</li>
            </ul>
          </div>

          <div class="nord-surface p-md rounded-lg">
            <h3 class="text-lg font-semibold text-accent-primary mb-3">Why Use RSS?</h3>
            <ul class="list-disc list-inside space-y-1 text-text-secondary">
              <li><strong class="text-text-primary">Privacy:</strong> No tracking, no algorithms</li>
              <li><strong class="text-text-primary">Control:</strong> You decide what to read</li>
              <li><strong class="text-text-primary">Efficiency:</strong> All sites in one place</li>
              <li><strong class="text-text-primary">No Distractions:</strong> Just the content</li>
              <li><strong class="text-text-primary">Offline:</strong> Cache for later reading</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  code {
    font-family: var(--font-family-mono);
  }

  /* Screen reader only - visually hidden but accessible */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>