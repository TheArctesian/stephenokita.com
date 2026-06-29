<script lang="ts">
  /**
   * Pulsing placeholder block used to fill the space of content that is still
   * streaming in, so the layout is reserved and the user sees a clear loading
   * state in-place (no pop-in, no layout shift). A blank surface gently pulses
   * its opacity rather than sweeping a shimmer.
   */
  export let width = "100%";
  export let height = "1rem";
  export let radius = "var(--radius-sm)";
</script>

<span
  class="skeleton"
  style="width:{width};height:{height};border-radius:{radius};"
  aria-hidden="true"
></span>

<style>
  .skeleton {
    display: block;
    background: var(--bg-tertiary);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
</style>
