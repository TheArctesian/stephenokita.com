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
      case 'whiteboard':
        return 'presentation';
      case 'cthulhu':
        return 'tentacle';
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
      case 'presentation':
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21h10M3 7h18M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>`;
      case 'tentacle':
        return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C10.5 2 9 2.5 8 3.5C7 4.5 6.5 6 6.5 7.5C6.5 8 6.6 8.5 6.7 9C5.8 9.3 5 9.9 4.5 10.7C4 11.5 3.7 12.5 3.7 13.5C3.7 14 3.8 14.5 3.9 15C3.1 15.3 2.4 15.9 2 16.7C1.6 17.5 1.5 18.4 1.5 19.3C1.5 20.5 2 21.6 2.8 22.4C3.6 23.2 4.7 23.7 5.9 23.7C6.5 23.7 7.1 23.6 7.6 23.4C8.5 23 9.2 22.3 9.6 21.4C10 20.5 10 19.5 9.8 18.5C10.5 18.8 11.2 19 12 19C12.8 19 13.5 18.8 14.2 18.5C14 19.5 14 20.5 14.4 21.4C14.8 22.3 15.5 23 16.4 23.4C16.9 23.6 17.5 23.7 18.1 23.7C19.3 23.7 20.4 23.2 21.2 22.4C22 21.6 22.5 20.5 22.5 19.3C22.5 18.4 22.4 17.5 22 16.7C21.6 15.9 20.9 15.3 20.1 15C20.2 14.5 20.3 14 20.3 13.5C20.3 12.5 20 11.5 19.5 10.7C19 9.9 18.2 9.3 17.3 9C17.4 8.5 17.5 8 17.5 7.5C17.5 6 17 4.5 16 3.5C15 2.5 13.5 2 12 2M12 4C12.8 4 13.5 4.3 14 4.8C14.5 5.3 14.8 6 14.8 6.8C14.8 7.2 14.7 7.6 14.5 8C14.3 8.4 14 8.7 13.6 8.9C13.2 9.1 12.8 9.2 12.4 9.2C12 9.2 11.6 9.1 11.2 8.9C10.8 8.7 10.5 8.4 10.3 8C10.1 7.6 10 7.2 10 6.8C10 6 10.3 5.3 10.8 4.8C11.3 4.3 12 4 12 4Z"/>
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
