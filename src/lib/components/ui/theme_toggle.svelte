<script lang="ts">
  import { theme, AVAILABLE_THEMES } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let mounted = false;
  let isOpen = false;
  let dropdownButton: HTMLButtonElement;
  let dropdownMenu: HTMLDivElement;

  onMount(() => {
    theme.init();
    mounted = true;
  });

  // UNIX Philosophy: Simple function that does one thing
  function selectTheme(themeName: string) {
    theme.setTheme(themeName as any);
    isOpen = false;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownButton &&
      dropdownMenu &&
      !dropdownButton.contains(event.target as Node) &&
      !dropdownMenu.contains(event.target as Node)
    ) {
      isOpen = false;
    }
  }

  // Handle keyboard navigation
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      isOpen = false;
      dropdownButton?.focus();
    }
  }

  // UNIX Philosophy: Pure functions for UI state
  function getThemeIcon(themeName: string) {
    switch (themeName) {
      case 'nord-light':
        return 'sun';
      case 'nord-dark':
        return 'moon';
      case 'sketched':
        return 'pencil';
      default:
        return 'computer';
    }
  }

  function getThemeLabel(themeName: string) {
    return AVAILABLE_THEMES[themeName as keyof typeof AVAILABLE_THEMES] || 'Unknown';
  }

  // Render icon SVG
  function renderIcon(iconName: string) {
    switch (iconName) {
      case 'sun':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>`;
      case 'moon':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>`;
      case 'pencil':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>`;
      default:
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>`;
    }
  }

  $: if (mounted && typeof window !== 'undefined') {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeydown);
    }
  }
</script>

{#if mounted}
  <div class="theme-toggle-container">
    <button
      bind:this={dropdownButton}
      class="theme-toggle-button"
      on:click={toggleDropdown}
      aria-label="Theme selector"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {@html renderIcon(getThemeIcon($theme))}
      <svg class="w-3 h-3 chevron" class:open={isOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if isOpen}
      <div
        bind:this={dropdownMenu}
        class="theme-dropdown"
        role="menu"
        transition:slide={{ duration: 200 }}
      >
        {#each Object.keys(AVAILABLE_THEMES) as themeName}
          <button
            class="theme-option"
            class:active={$theme === themeName}
            role="menuitem"
            on:click={() => selectTheme(themeName)}
          >
            <span class="theme-icon">
              {@html renderIcon(getThemeIcon(themeName))}
            </span>
            <span class="theme-label">{getThemeLabel(themeName)}</span>
            {#if $theme === themeName}
              <span class="checkmark">✓</span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .theme-toggle-container {
    position: relative;
    display: inline-block;
  }

  .theme-toggle-button {
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    padding: var(--space-sm);
    border-radius: var(--radius-md);
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    transition: all var(--transition-fast);
    cursor: pointer;
  }

  .theme-toggle-button:hover {
    background-color: var(--bg-tertiary);
  }

  .theme-toggle-button:focus {
    outline: none;
    ring: 2px;
    ring-color: var(--accent-primary);
    ring-offset: 2px;
    ring-offset-color: var(--bg-primary);
  }

  .chevron {
    transition: transform var(--transition-fast);
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .theme-dropdown {
    position: absolute;
    top: calc(100% + var(--space-xs));
    right: 0;
    min-width: 180px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: var(--z-dropdown);
    overflow: hidden;
  }

  .theme-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background-color: transparent;
    color: var(--text-primary);
    border: none;
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .theme-option:hover {
    background-color: var(--bg-tertiary);
  }

  .theme-option.active {
    background-color: var(--bg-tertiary);
    color: var(--accent-primary);
  }

  .theme-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  .theme-label {
    flex: 1;
    font-size: var(--font-size-sm);
  }

  .checkmark {
    color: var(--accent-primary);
    font-weight: bold;
    font-size: var(--font-size-base);
  }

  /* Responsive adjustments */
  @media (max-width: 500px) {
    .theme-dropdown {
      right: auto;
      left: 0;
    }
  }
</style>
