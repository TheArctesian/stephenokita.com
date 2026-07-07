<script lang="ts">
  import "../../app.css";
  import { slide, fade } from "svelte/transition";
  import Section from "$lib/components/shared/section.svelte";
  import projects from "./unfinishedprojects.json";
  import writings from "./unfinishedwriting.json";
  import Writing from "./being.jpg";
  import FilterGroup from "./filter_group.svelte";
  import BlogGrid from "./blog_grid.svelte";
  import { t } from "$lib/i18n";

  export let data;

  // Search / filter / sort state
  let searchTerm = "";
  let selectedCategory = "All";
  let selectedLanguage = "All";
  let sortBy = "newest";

  // Safety check for data
  $: posts = data?.posts || [];

  // Unique categories / languages from posts
  $: allCategories = [
    "All",
    ...new Set(posts.flatMap((post) => post.categories || [])),
  ];

  $: allLanguages = [
    "All",
    ...new Set(posts.flatMap((post) => post.language || [])),
  ];

  // Filter and sort posts
  $: filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All" ||
        (post.language && post.language.includes(selectedLanguage));

      const matchesCategory =
        selectedCategory === "All" ||
        (post.categories && post.categories.includes(selectedCategory));
      return matchesSearch && matchesCategory && matchesLanguage;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === "newest") {
        return dateB - dateA;
      } else if (sortBy === "oldest") {
        return dateA - dateB;
      }
      return 0;
    });
</script>

<div class="blog-page" out:slide>
  <!-- Hero -->
  <header class="blog-hero">
    <div class="blog-hero__text">
      <h1 class="pattern-hero__title">{$t('blog.heroTitle')}</h1>
      <p class="pattern-hero__lede">
        {$t('blog.heroLede')}
      </p>
    </div>
    <img
      src={Writing}
      alt="writing"
      width="1146"
      height="628"
      decoding="async"
      class="blog-hero__img"
    />
  </header>

  <div class="blog-intro">
    <p class="prose-text">
      {$t('blog.intro1')}
    </p>
    <p class="prose-text">
      {@html $t('blog.intro2')}
    </p>
    <p class="prose-text">
      I am still and will always be a stupid fool confidently guessing at the
      nature and order of our world. Thus is the struggle of those who venture to
      <i>"passionately experience the weight and burden of existence"</i> (BT)
    </p>
    <p class="intro-note">{$t('blog.viewCountsNote')}</p>

    <!-- RSS Feed Link -->
    <a href="/rss.xml" class="rss-link" aria-label={$t('blog.rssAria')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 11a9 9 0 0 1 9 9"></path>
        <path d="M4 4a16 16 0 0 1 16 16"></path>
        <circle cx="5" cy="19" r="1"></circle>
      </svg>
      <span>{$t('blog.rssFeed')}</span>
    </a>
  </div>

  <Section label={$t('blog.sectionWritings')}>
    <FilterGroup
      bind:searchTerm
      bind:selectedCategory
      bind:selectedLanguage
      bind:sortBy
      {allCategories}
      {allLanguages}
    />

    <BlogGrid posts={filteredPosts} />
  </Section>

  <Section label={$t('blog.sectionUnfinished')}>
    <p class="prose-text section-intro">
      {$t('blog.unfinishedIntro')}
    </p>

    <h3 class="subsection">{$t('blog.subEssays')}</h3>
    <div class="ideas-grid">
      {#each writings as w}
        <article class="idea-card" in:fade={{ delay: 1000, duration: 300 }}>
          <p class="idea-text">{w.idea}</p>
          <p class="idea-date">{w.date}</p>
        </article>
      {/each}
    </div>

    <h3 class="subsection">{$t('blog.subProjects')}</h3>
    <div class="ideas-grid">
      {#each projects as w}
        <article class="idea-card" in:fade={{ delay: 1000, duration: 300 }}>
          <p class="idea-text">{w.idea}</p>
          <p class="idea-date">{w.date}</p>
        </article>
      {/each}
    </div>
  </Section>
</div>

<style>
  /* ── Page container ────────────────────────────────────────────── */
  /* Wider than the 740px .page-shell (text pages) to give the filter
   * row and card grid room — mirrors the projects listing page. */
  .blog-page {
    max-width: 960px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-lg) var(--space-2xl);
  }

  /* ── Hero ──────────────────────────────────────────────────────── */
  .blog-hero {
    display: flex;
    align-items: flex-start;
    gap: var(--space-xl);
    margin-bottom: var(--space-lg);
  }

  .blog-hero__text {
    flex: 1;
    min-width: 0;
    max-width: 62ch;
  }

  .blog-hero__img {
    width: 240px;
    max-width: 40%;
    height: auto;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
    flex-shrink: 0;
  }

  /* ── Intro prose ───────────────────────────────────────────────── */
  .blog-intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-width: 68ch;
    margin-bottom: var(--space-2xl);
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--border-primary);
  }

  .prose-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.7;
    margin: 0;
  }

  b {
    font-weight: 600;
    color: var(--text-primary);
  }

  .intro-note {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    margin: 0;
  }

  /* ── RSS Feed Link ─────────────────────────────────────────────── */
  .rss-link {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-md);
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    text-decoration: none;
    transition:
      border-color var(--transition-fast),
      color var(--transition-fast);
  }

  .rss-link:hover {
    border-color: var(--accent-primary);
    color: var(--text-primary);
  }

  .rss-link svg {
    width: 1rem;
    height: 1rem;
  }

  /* ── Section intro + subsection labels ─────────────────────────── */
  .section-intro {
    margin-bottom: var(--space-lg);
  }

  .subsection {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-weight: 600;
    margin: var(--space-lg) 0 var(--space-sm);
  }

  .subsection:first-of-type {
    margin-top: 0;
  }

  /* ── Unfinished ideas grid ─────────────────────────────────────── */
  .ideas-grid {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .idea-card {
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    border-left: 3px solid transparent;
    border-radius: var(--radius-md);
    padding: var(--space-md);
    transition:
      border-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .idea-card:hover {
    border-left-color: var(--status-error);
    transform: translateY(-2px);
  }

  .idea-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
  }

  .idea-date {
    margin: var(--space-md) 0 0 auto;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
  }

  @media (max-width: 640px) {
    .blog-hero {
      flex-direction: column-reverse;
      align-items: stretch;
      gap: var(--space-md);
    }

    .blog-hero__img {
      width: 100%;
      max-width: none;
    }

    .ideas-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
