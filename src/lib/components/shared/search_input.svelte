<script lang="ts">
  /**
   * Text input with a leading search icon and a trailing clear button
   * that appears once there's a value. Used by the blog and skills
   * pages. Bind the query with `bind:value`. Local layout/visuals are
   * scoped here since the two existing treatments differ slightly and
   * this is genuinely a single, self-contained widget.
   */
  export let value = "";
  export let placeholder = "Search…";
  export let id = "search-input";
  export let label = "Search";
  export let type: "text" | "search" = "search";

  function clear() {
    value = "";
  }
</script>

<label class="search" for={id}>
  <span class="sr-only">{label}</span>
  <svg
    class="search__icon"
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
    />
  </svg>

  {#if type === "search"}
    <input
      {id}
      type="search"
      bind:value
      {placeholder}
      autocomplete="off"
      spellcheck="false"
      class="search__field"
    />
  {:else}
    <input
      {id}
      type="text"
      bind:value
      {placeholder}
      autocomplete="off"
      spellcheck="false"
      class="search__field"
    />
  {/if}

  {#if value}
    <button
      type="button"
      class="search__clear"
      on:click={clear}
      aria-label="Clear search"
    >×</button>
  {/if}
</label>

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

  .search {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    background: var(--bg-secondary);
    transition: border-color var(--transition-fast);
  }

  .search:focus-within {
    border-color: var(--accent-primary);
  }

  .search__icon {
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    flex-shrink: 0;
  }

  .search__field {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: 0;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    padding: var(--space-xs) 0;
  }

  .search__field::placeholder {
    color: var(--text-muted);
  }

  .search__field::-webkit-search-cancel-button {
    display: none;
  }

  .search__clear {
    background: none;
    border: 0;
    color: var(--text-tertiary);
    cursor: pointer;
    font-size: var(--font-size-base);
    line-height: 1;
    padding: 0 var(--space-xs);
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);
  }

  .search__clear:hover {
    color: var(--text-primary);
  }
</style>
