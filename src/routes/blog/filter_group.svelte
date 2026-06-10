<script lang="ts">
  /**
   * Blog search + filter controls. A single wrapping row of equal-height
   * fields (search + category / language / sort selects), each built on
   * the same `.field` structure: a relative box with a leading icon and
   * a flush-filling input/select. Token-based and theme-aware.
   */
  export let searchTerm = "";
  export let selectedCategory = "All";
  export let selectedLanguage = "All";
  export let sortBy = "newest";
  export let allCategories: string[] = [];
  export let allLanguages: string[] = [];
</script>

<div class="filters">
  <!-- Search -->
  <div class="field field--search">
    <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <label for="blog-search" class="sr-only">Search blog posts</label>
    <input
      id="blog-search"
      type="text"
      placeholder="Search posts..."
      bind:value={searchTerm}
    />
  </div>

  <!-- Category -->
  <div class="field">
    <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 014 7V5a2 2 0 012-2z"
      />
    </svg>
    <select bind:value={selectedCategory} aria-label="Filter by category">
      {#each allCategories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </div>

  <!-- Language -->
  <div class="field">
    <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3a15 15 0 010 18 M12 3a15 15 0 000 18"
      />
    </svg>
    <select bind:value={selectedLanguage} aria-label="Filter by language">
      {#each allLanguages as language}
        <option value={language}>{language}</option>
      {/each}
    </select>
  </div>

  <!-- Sort -->
  <div class="field">
    <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 7h12M3 12h8M3 17h4M17 7v10m0 0l-3-3m3 3l3-3"
      />
    </svg>
    <select bind:value={sortBy} aria-label="Sort posts">
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
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

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }

  /* Every control shares this box: relative, with a leading icon. */
  .field {
    position: relative;
    display: flex;
    align-items: center;
    flex: 0 1 auto;
  }

  .field--search {
    flex: 1 1 240px;
    min-width: 0;
  }

  .field-icon {
    position: absolute;
    left: var(--space-sm);
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    pointer-events: none;
  }

  .field input,
  .field select {
    width: 100%;
    height: 40px;
    padding: 0 var(--space-md) 0 calc(var(--space-sm) * 2 + 16px);
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    transition: border-color var(--transition-fast);
  }

  .field input::placeholder {
    color: var(--text-tertiary);
  }

  /* Selects: hide native chevron, draw our own on the right. */
  .field select {
    appearance: none;
    cursor: pointer;
    padding-right: calc(var(--space-md) + 14px);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2388c0d0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right var(--space-sm) center;
    background-repeat: no-repeat;
    background-size: 14px;
  }

  .field input:focus,
  .field select:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  .field select:hover {
    border-color: var(--accent-primary);
  }

  @media (max-width: 640px) {
    .field--search {
      flex-basis: 100%;
    }

    .field {
      flex: 1 1 auto;
    }
  }
</style>
