<script lang="ts">
  import { theme, AVAILABLE_THEMES } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  let mounted = false;

  onMount(() => {
    theme.init();
    mounted = true;
  });

  // UNIX Philosophy: Simple function that does one thing
  function cycleTheme() {
    theme.cycle();
  }

  // UNIX Philosophy: Pure functions for UI state
  function getThemeIcon(currentTheme: string) {
    switch (currentTheme) {
      case 'nord-light':
        return 'sun';
      case 'nord-dark':
        return 'moon';
      default:
        return 'computer';
    }
  }

  function getThemeLabel(currentTheme: string) {
    return AVAILABLE_THEMES[currentTheme as keyof typeof AVAILABLE_THEMES] || 'Unknown';
  }
</script>

{#if mounted}
  <button
    class="p-2 rounded-md bg-bg-secondary text-text-primary hover:bg-bg-tertiary transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary"
    style="border: 1px solid var(--border-primary)"
    on:click={cycleTheme}
    title={getThemeLabel($theme)}
    aria-label="Toggle theme"
  >
    {#if getThemeIcon($theme) === 'sun'}
      <!-- Sun icon for light mode -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    {:else if getThemeIcon($theme) === 'moon'}
      <!-- Moon icon for dark mode -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    {:else}
      <!-- Computer/System icon for system mode -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    {/if}
  </button>
{/if}

<style>
  button {
    min-width: 40px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>