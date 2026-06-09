<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import projects from "./unfinishedprojects.json";
  import writings from "./unfinishedwriting.json";
  import Writing from "./being.jpg";
  import FilterGroup from "./filter_group.svelte";
  import BlogGrid from "./blog_grid.svelte";

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

<div class="min-h-screen" out:slide>
  <!-- Blog Header Section -->
  <div class="text1 l flex flex-col">
    <div class="m-auto hero mb-4 flex gap-4 items-center">
      <div class="w-full">
        <h1 class="font-bold text-xl mb-4">Welcome to my blog!</h1>
        <p class="mb-4">
          Enjoy, as I put an inordinate amount of my life into this.
        </p>
        <p class="mb-4">
          I try not to remove writings once their up as I want a complete record
          of both the growth of my ideas and my abilities as a communicator.
        </p>
        <p>
          <i>Comment system is now up! Critique is <b>always always</b>
          invited especially critiques of me, my character, knowledge, actions everything.</i>
        </p>
        <p class="mt-4">
          I am still and will always be a stupid fool confidently guessing at
          the nature and order of our world. Thus is the struggle of those who
          venture to <i
            >"passionately experience the weight and burden of existence"</i
          > (BT)
        </p>
        <p class="font-bold mt-4">View Counts are taken from Aug 15th 2025</p>

        <!-- RSS Feed Link -->
        <a href="/rss.xml" class="rss-link" aria-label="Subscribe to RSS feed">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 11a9 9 0 0 1 9 9"></path>
            <path d="M4 4a16 16 0 0 1 16 16"></path>
            <circle cx="5" cy="19" r="1"></circle>
          </svg>
          <span>RSS Feed</span>
        </a>
      </div>
      <img
        src={Writing}
        alt="writing"
        width="1146"
        height="628"
        decoding="async"
        class="max-h-48 rounded shadow"
      />
    </div>
  </div>

  <FilterGroup
    bind:searchTerm
    bind:selectedCategory
    bind:selectedLanguage
    bind:sortBy
    {allCategories}
    {allLanguages}
  />

  <BlogGrid posts={filteredPosts} />
</div>

<section class="mt-4" aria-labelledby="unfinished-ideas-heading">
  <div class="wrapper">
    <h2 id="unfinished-ideas-heading" class="font-bold">Unfinished/expired ideas</h2>
    <p>
      Ideas for projects and essays that are no longer mine to write and that I
      wrote down to do. Look at the article of the same name for more info.
    </p>
  </div>
  <div class="text-center font-bold wrapper">
    <h3>Essays that should be written</h3>
  </div>
  <div class="posts flex-wrap overflow-hidden">
    {#each writings as w}
      <article class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <p class="idea-text">{w.idea}</p>
        <p class="mt-auto ml-auto mb-4 font-bold">{w.date}</p>
      </article>
    {/each}
  </div>
  <div class="text-center font-bold wrapper">
    <h3>Projects that should be done</h3>
  </div>
  <div class="posts mb-4 flex-wrap overflow-hidden">
    {#each projects as w}
      <article class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <p class="idea-text">{w.idea}</p>
        <p class="mt-auto ml-auto mb-4 font-bold">{w.date}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  .wrapper {
    @apply bg-bg-secondary p-md rounded m-md;
    @apply transition-all duration-normal;
    border: 1px solid var(--border-primary);
  }

  b {
    font-weight: bold;
  }

  .text1 {
    @apply p-md rounded bg-bg-secondary mx-md;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }

  .l {
    margin-bottom: 1rem;
  }

  /* RSS Feed Link */
  .rss-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--btn-primary-bg);
    color: var(--btn-primary-fg);
    border-radius: 0.375rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid var(--border-primary);
  }

  .rss-link:hover {
    background-color: var(--btn-primary-hover-bg);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(189, 147, 249, 0.3);
  }

  .rss-link svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (max-width: 1000px) {
    .hero {
      flex-direction: column;
    }
    .l {
      margin-bottom: 1rem;
    }
  }

  /* Unfinished ideas section */
  .posts {
    display: grid;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
  }

  .post {
    @apply mb-md bg-bg-secondary h-full text-text-primary p-md rounded;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-fast;
    text-wrap: wrap;
  }

  .post:hover {
    @apply border-l-8 border-l-status-error;
  }

  @media (max-width: 1000px) {
    .posts {
      margin-top: 1rem;
      grid-template-columns: repeat(auto-fill, 100%);
    }

    .post {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
</style>
