<script lang="ts">
  export let variant: 'default' | 'dark' | 'interactive' | 'gradient' = 'default';
  export let href: string | null = null;
  export let className: string = '';
</script>

{#if href}
  <a {href} class="card-link {className}">
    <div class="card card--{variant}">
      <slot />
    </div>
  </a>
{:else}
  <div class="card card--{variant} {className}">
    <slot />
  </div>
{/if}

<style>
  .card {
    @apply bg-bg-secondary text-text-primary p-md rounded shadow-soft;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }

  .card--dark {
    @apply bg-bg-tertiary;
  }

  .card--interactive {
    @apply cursor-pointer;
  }

  .card--interactive:hover {
    @apply -translate-y-1 shadow-medium;
  }

  .card--gradient {
    background: linear-gradient(135deg, var(--status-purple), var(--accent-cyan));
  }

  .card-link {
    @apply no-underline text-inherit block;
  }

  .card-link .card {
    @apply transition-all duration-normal;
  }

  .card-link:hover .card {
    @apply -translate-y-1 shadow-medium;
  }
</style>