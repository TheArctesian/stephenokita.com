<script lang="ts">
  /**
   * Blog search + filter controls. Bound search term, category /
   * language / sort selects, plus a mobile-only collapse toggle.
   * The boxed search treatment and select chevrons are theme-aware
   * and stay scoped here to preserve the existing visuals exactly.
   */
  export let searchTerm = "";
  export let selectedCategory = "All";
  export let selectedLanguage = "All";
  export let sortBy = "newest";
  export let allCategories: string[] = [];
  export let allLanguages: string[] = [];

  let showFilters = false;
</script>

<div class="search-container">
  <div class="search-wrapper">
    <!-- Mobile-first search bar -->
    <div class="search-input-container">
      <label for="blog-search" class="sr-only">Search blog posts</label>
      <svg
        class="search-icon"
        aria-hidden="true"
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
        id="blog-search"
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
            aria-hidden="true"
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
            aria-hidden="true"
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

<style>
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

  @media (min-width: 1024px) {
    .filters-grid {
      grid-template-columns: repeat(3, minmax(140px, 1fr));
    }

    .filter-select {
      min-width: 140px;
    }
  }

  @media (max-width: 1000px) {
    input {
      width: 100%;
    }
  }
</style>
