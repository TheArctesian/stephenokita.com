<script lang="ts">
  /**
   * Category tab bar with per-category counts and full keyboard
   * support (roving tabindex + Arrow/Home/End navigation). Binds
   * `current` to the active category key; `dimmed` fades the bar while
   * a search is active. Selecting a tab fires `select`.
   */
  import { tick, createEventDispatcher } from "svelte";

  type Category = { name: string; data: { text: string; img: string }[] };

  export let categories: Record<string, Category>;
  export let current: string;
  export let dimmed = false;

  const dispatch = createEventDispatcher<{ select: string }>();

  async function handleTabKeydown(e: KeyboardEvent) {
    const keys = Object.keys(categories);
    const idx = keys.indexOf(current);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % keys.length;
    else if (e.key === "ArrowLeft")
      next = (idx - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    else return;
    e.preventDefault();
    current = keys[next];
    await tick();
    const tabEl = document.querySelector<HTMLButtonElement>(
      `[data-tab-key="${keys[next]}"]`,
    );
    tabEl?.focus();
  }
</script>

<div
  class="tabs flex flex-wrap gap-xs"
  role="tablist"
  aria-label="Skill categories"
  class:dimmed
  on:keydown={handleTabKeydown}
>
  {#each Object.entries(categories) as [key, cat]}
    <button
      class="tab flex items-center gap-xs"
      class:active={current === key && !dimmed}
      on:click={() => {
        current = key;
        dispatch("select", key);
      }}
      role="tab"
      aria-selected={current === key && !dimmed}
      tabindex={current === key ? 0 : -1}
      data-tab-key={key}
    >
      {cat.name}
      <span class="tab-count">{cat.data.length}</span>
    </button>
  {/each}
</div>

<style>
  .tabs {
    margin-bottom: var(--space-lg);
  }

  .tab {
    background: none;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .tab:hover {
    border-color: var(--border-accent);
    color: var(--text-primary);
  }

  .tab.active {
    background: var(--bg-tertiary);
    border-color: var(--accent-primary);
    border-left-width: 3px;
    padding-left: calc(var(--space-md) - 2px);
    color: var(--text-primary);
  }

  .tabs.dimmed .tab {
    opacity: 0.5;
  }

  .tab-count {
    color: var(--accent-secondary);
    font-size: 0.7rem;
  }

  .tab.active .tab-count {
    color: var(--text-primary);
  }
</style>
