<script lang="ts">
  import { formatDate } from "$lib/utils.js";
  export let data;
  import { fade, slide, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import projects from "./unfinishedprojects.json";
  import writings from "./unfinishedwriting.json";
  import Writing from "./being.jpg";

  // Search functionality
  let searchTerm = "";
  let selectedCategory = "All";
  let selectedLanguage = "All";
  let sortBy = "newest";
  let showFilters = false;

  // Safety check for data
  $: posts = data?.posts || [];

  // Get all unique categories from posts
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

  // Animation helpers
  function staggeredFade(node: HTMLElement, { delay = 0, duration = 400 }) {
    return fade(node, { delay, duration });
  }
</script>

<div class="min-h-screen" out:slide>
  <!-- Blog Header Section -->
  <div class="text1 l flex flex-col">
    <div class="m-auto hero mb-4 flex gap-4 items-center">
      <div class="w-full">
        <h1 class="font-bold text-xl mb-4">Welcome to my blog!</h1>
        <h1 class="mb-4">
          Enjoy, as I put an inordinate amount of my life into this.
        </h1>
        <h1 class="mb-4">
          I try not to remove writings once their up as I want a complete record
          of both the growth of my ideas and my abilities as a communicator.
        </h1>
        <i
          >Comment system is now up! Critique is <b>always always</b>
          invited especially critiques of me, my character, knowledge, actions everything.
        </i>
        <h1 class="mt-4">
          I am still and will always be a stupid fool confidently guessing at
          the nature and order of our world. Thus is the struggle of those who
          venture to <i
            >"passionately experience the weight and burden of existence"</i
          > (BT)
        </h1>
        <h1 class="font-bold mt-4">View Counts are taken from Aug 15th 2025</h1>
        
        <!-- RSS Feed Link -->
        <a href="/rss.xml" class="rss-link" aria-label="Subscribe to RSS feed">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9"></path>
            <path d="M4 4a16 16 0 0 1 16 16"></path>
            <circle cx="5" cy="19" r="1"></circle>
          </svg>
          <span>RSS Feed</span>
        </a>
      </div>
      <img src={Writing} alt="writing" class="max-h-48 rounded shadow" />
    </div>
  </div>

  <!-- Search and Filters Section -->
  <div class="search-container">
    <div class="search-wrapper">
      <!-- Mobile-first search bar -->
      <div class="search-input-container">
        <svg
          class="search-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search posts..."
          bind:value={searchTerm}
          class="search-input"
        />
      </div>

      <!-- Collapsible filters on mobile, inline on desktop -->
      <div class="filters-container">
        <button
          class="filters-toggle md:hidden"
          on:click={() => (showFilters = !showFilters)}
          aria-label="Toggle filters"
        >
          <svg
            class="filter-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
            />
          </svg>
          Filters
        </button>

        <div class="filters-grid" class:expanded={showFilters}>
          <select
            id="category"
            bind:value={selectedCategory}
            class="filter-select"
            aria-label="Filter by category"
          >
            {#each allCategories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>

          <div class="filter-select-wrapper">
            <svg
              class="filter-select-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <select
              id="language"
              bind:value={selectedLanguage}
              class="filter-select with-icon"
              aria-label="Filter by language"
            >
              {#each allLanguages as language}
                <option value={language}>{language}</option>
              {/each}
            </select>
          </div>

          <div class="filter-select-wrapper">
            <svg
              class="filter-select-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <select
              bind:value={sortBy}
              class="filter-select with-icon"
              aria-label="Sort posts"
            >
              <option value="newest">New</option>
              <option value="oldest">Old</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="blog-grid-container">
    {#if filteredPosts.length === 0}
      <!-- Empty State -->
      <div class="empty-state" in:scale={{ duration: 300, easing: quintOut }}>
        <svg
          class="empty-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="empty-title">No posts found</h3>
        <p class="empty-description">Try adjusting your search or filters</p>
      </div>
    {:else}
      <div class="blog-grid">
        {#each filteredPosts as post, i (post.slug)}
          <article
            class="blog-card"
            in:fade={{ delay: Math.min(i * 50, 200), duration: 400 }}
            out:scale={{ duration: 200 }}
          >
            <a href="/blog/{encodeURIComponent(post.slug)}" class="card-link">
              {#if post.img}
                <div class="card-image-container">
                  <img
                    src={post.img}
                    alt={post.title}
                    class="card-image"
                    loading="lazy"
                  />
                  <div class="image-overlay">
                    <span class="read-more">Read Article →</span>
                  </div>
                </div>
              {/if}

              <div class="card-content" class:no-image={!post.img}>
                <header class="card-header">
                  <h2 class="card-title">{post.title}</h2>
                </header>

                <div class="card-meta">
                  <div class="meta-item">
                    <svg
                      class="meta-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{formatDate(post.date)}</span>
                  </div>

                  {#if post.location}
                    <div class="meta-item">
                      <svg
                        class="meta-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{post.location}</span>
                    </div>
                  {/if}

                  {#if post.readingTime}
                    <div class="meta-item">
                      <svg
                        class="meta-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{post.readingTime} min</span>
                    </div>
                  {/if}

                  {#if post.viewCount !== undefined && post.viewCount > 0}
                    <div class="meta-item">
                      <svg
                        class="meta-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{post.viewCount.toLocaleString()}</span>
                    </div>
                  {/if}

                  {#if post.commentCount !== undefined && post.commentCount > 0}
                    <div class="meta-item">
                      <svg
                        class="meta-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{post.commentCount}</span>
                    </div>
                  {/if}
                </div>

                <p class="card-description">{post.description}</p>

                {#if post.categories && post.categories.length > 0}
                  <div class="card-tags">
                    {#each post.categories.slice(0, 3) as category}
                      <span class="tag">{category}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            </a>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</div>

<div class="mt-4">
  <div class="wrapper">
    <h1 class="font-bold">Unfinished/expired ideas</h1>
    <p>
      Ideas for projects and essays that are no longer mine to write and that I
      wrote down to do. Look at the article of the same name for more info.
    </p>
  </div>
  <div class="text-center font-bold wrapper">
    <h1>Essays that should be written</h1>
  </div>
  <div class="posts flex-wrap overflow-hidden">
    {#each writings as w}
      <div class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="mt-auto ml-auto mb-4 font-bold">{w.date}</h1>
      </div>
    {/each}
    <div></div>
  </div>
  <div class="text-center font-bold wrapper">
    <h1 class="">Project that should be done</h1>
  </div>
  <div class="posts mb-4 flex-wrap overflow-hidden">
    {#each projects as w}
      <div class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="mt-auto ml-auto mb-4 font-bold">{w.date}</h1>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Base Styles */
  .wrapper {
    @apply bg-bg-secondary p-md rounded m-md;
    @apply transition-all duration-normal;
    border: 1px solid var(--border-primary);
  }

  .ideas {
    @apply bg-bg-secondary p-md rounded;
  }

  right {
    float: right;
  }

  b {
    font-weight: bold;
  }

  .text1 {
    @apply p-md rounded bg-bg-secondary mx-md;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }

  .text {
    @apply p-md rounded m-md bg-bg-secondary;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }

  .rotate {
    transform: rotate(90deg);
    transition: 0.2s ease-in-out;
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

  /* Modern Mobile-First Search Section */
  .search-container {
    @apply bg-bg-secondary p-md rounded mx-md mb-md;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }

  .search-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Search Input */
  .search-input-container {
    position: relative;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    transition: all var(--transition-normal);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(136, 192, 208, 0.1);
  }

  .search-input::placeholder {
    color: var(--text-tertiary);
  }

  /* Filters Container */
  .filters-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .filters-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 10px 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all var(--transition-normal);
  }

  .filters-toggle:hover {
    background: var(--bg-quaternary);
    border-color: var(--accent-primary);
  }

  .filter-icon {
    width: 16px;
    height: 16px;
  }

  .filters-grid {
    display: none;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .filters-grid.expanded {
    display: grid;
  }

  .filter-select-wrapper {
    position: relative;
  }

  .filter-select-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    pointer-events: none;
    z-index: 1;
  }

  .filter-select {
    width: 100%;
    padding: 10px 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all var(--transition-normal);
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 40px;
  }

  .filter-select.with-icon {
    padding-left: 40px;
  }

  .filter-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(136, 192, 208, 0.1);
  }

  .filter-select:hover {
    background: var(--bg-quaternary);
    border-color: var(--accent-primary);
  }

  /* Desktop Layout */
  @media (min-width: 768px) {
    .search-wrapper {
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
    }

    .search-input-container {
      flex: 1;
      min-width: 0;
    }

    .filters-container {
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .filters-toggle {
      display: none;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 0;
    }

    .filter-select {
      min-width: 120px;
    }
  }

  /* Large Desktop */
  @media (min-width: 1024px) {
    .filters-grid {
      grid-template-columns: repeat(3, minmax(140px, 1fr));
    }

    .filter-select {
      min-width: 140px;
    }
  }

  /* Modern Blog Grid Layout */
  .blog-grid-container {
    padding: 0 1rem;
    margin-top: 2rem;
  }

  .blog-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  /* Blog Card Design */
  .blog-card {
    @apply bg-bg-secondary rounded-lg overflow-hidden;
    border: 1px solid var(--border-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.15),
      0 0 0 2px var(--status-error);
  }

  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  /* Image Container with Aspect Ratio */
  .card-image-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    background: var(--bg-tertiary);
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .blog-card:hover .card-image {
    transform: scale(1.05);
  }

  /* Image Overlay */
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .blog-card:hover .image-overlay {
    opacity: 1;
  }

  .read-more {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    transform: translateX(-10px);
    transition: transform 0.3s ease;
  }

  .blog-card:hover .read-more {
    transform: translateX(0);
  }

  /* Card Content */
  .card-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-content.no-image {
    padding-top: 1.5rem;
  }

  .card-header {
    margin-bottom: 0.75rem;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text-primary);
    transition: color 0.2s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-card:hover .card-title {
    color: var(--status-error);
  }

  /* Meta Information */
  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-secondary);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .meta-icon {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }

  /* Description */
  .card-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Tags */
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    background: var(--bg-tertiary);
    color: var(--accent-primary);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .blog-card:hover .tag {
    border-color: var(--accent-primary);
    background: var(--accent-primary);
    color: var(--bg-primary);
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .blog-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .blog-grid-container {
      padding: 0 0.5rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .card-image-container {
      padding-top: 50%; /* Slightly shorter on mobile */
    }

    .card-title {
      font-size: 1.125rem;
    }

    .card-meta {
      gap: 0.75rem;
    }

    .meta-item {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 1000px) {
    input {
      width: 100%;
    }
    .hero {
      flex-direction: column;
    }
    .cat {
      width: 100%;
    }
    .se {
      margin-top: 1rem;
    }
    .l {
      margin-bottom: 0rem;
    }
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .empty-icon {
    width: 64px;
    height: 64px;
    color: var(--text-tertiary);
    margin-bottom: 1rem;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .empty-description {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  /* Legacy styles for unfinished ideas section */
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
