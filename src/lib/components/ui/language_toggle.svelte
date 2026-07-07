<script lang="ts">
  import { locale, AVAILABLE_LOCALES, type LocaleCode } from '$lib/stores/locale';
  import { t } from '$lib/i18n';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let mounted = false;
  let isOpen = false;
  let dropdownButton: HTMLButtonElement;
  let dropdownMenu: HTMLDivElement;

  onMount(() => {
    locale.init();
    mounted = true;
  });

  // UNIX Philosophy: Simple function that does one thing
  function selectLocale(code: string) {
    locale.setLocale(code as LocaleCode);
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
  <div class="language-toggle-container">
    <button
      bind:this={dropdownButton}
      class="language-toggle-button"
      on:click={toggleDropdown}
      aria-label={$t('a11y.languageSelector')}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <!-- Globe icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8 M3.6 15h16.8 M12 3a15 15 0 010 18 M12 3a15 15 0 000 18"
        />
      </svg>
      <svg
        class="w-3 h-3 chevron"
        class:open={isOpen}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if isOpen}
      <div
        bind:this={dropdownMenu}
        class="language-dropdown"
        role="menu"
        transition:slide={{ duration: 200 }}
      >
        {#each Object.entries(AVAILABLE_LOCALES) as [code, label]}
          <button
            class="language-option"
            class:active={$locale === code}
            role="menuitem"
            lang={code}
            on:click={() => selectLocale(code)}
          >
            <span class="language-label">{label}</span>
            {#if $locale === code}
              <span class="checkmark">✓</span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .language-toggle-container {
    position: relative;
    display: inline-block;
  }

  .language-toggle-button {
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

  .language-toggle-button:hover {
    background-color: var(--bg-tertiary);
  }

  .language-toggle-button:focus {
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

  .language-dropdown {
    position: absolute;
    top: calc(100% + var(--space-xs));
    right: 0;
    min-width: 200px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: var(--z-dropdown);
    overflow: hidden;
  }

  .language-option {
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

  .language-option:hover {
    background-color: var(--bg-tertiary);
  }

  .language-option.active {
    background-color: var(--bg-tertiary);
    color: var(--accent-primary);
  }

  .language-label {
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
    .language-dropdown {
      right: auto;
      left: 0;
    }
  }
</style>
