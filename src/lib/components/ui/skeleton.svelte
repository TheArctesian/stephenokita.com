<script lang="ts">
  /**
   * Shimmering placeholder block used to fill the space of content that is
   * still streaming in, so the layout is reserved and the user sees a clear
   * loading state in-place (no pop-in, no layout shift).
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
    background: linear-gradient(
      90deg,
      var(--bg-tertiary) 25%,
      var(--bg-quaternary) 37%,
      var(--bg-tertiary) 63%
    );
    background-size: 400% 100%;
    animation: skeleton-shimmer 1.4s ease infinite;
  }

  @keyframes skeleton-shimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
</style>
