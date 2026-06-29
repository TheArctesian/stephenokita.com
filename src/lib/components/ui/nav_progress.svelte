<script lang="ts">
  /**
   * Top-of-page loading bar shown while SvelteKit navigates between routes.
   * Driven by the `navigating` store: the bar eases toward 90% during the
   * load, then snaps to 100% and fades once the destination is ready. Honours
   * prefers-reduced-motion by skipping the trickle animation.
   */
  import { navigating } from "$app/stores";
  import { onDestroy } from "svelte";

  let progress = 0;
  let visible = false;
  let trickle: ReturnType<typeof setInterval> | null = null;
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  function start() {
    if (hideTimer) clearTimeout(hideTimer);
    visible = true;
    progress = 8;
    if (trickle) clearInterval(trickle);
    trickle = setInterval(() => {
      // Asymptotically approach 90% so the bar always feels alive but never
      // completes before the navigation actually resolves.
      progress = Math.min(90, progress + (90 - progress) * 0.15);
    }, 200);
  }

  function done() {
    if (trickle) {
      clearInterval(trickle);
      trickle = null;
    }
    progress = 100;
    hideTimer = setTimeout(() => {
      visible = false;
      progress = 0;
    }, 300);
  }

  $: if ($navigating) start();
  else if (visible) done();

  onDestroy(() => {
    if (trickle) clearInterval(trickle);
    if (hideTimer) clearTimeout(hideTimer);
  });
</script>

{#if visible}
  <div class="nav-progress" role="progressbar" aria-label="Loading page" aria-hidden="true">
    <div class="nav-progress__bar" style="width: {progress}%; opacity: {progress === 100 ? 0 : 1};"></div>
  </div>
{/if}

<style>
  .nav-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: var(--z-tooltip);
    pointer-events: none;
  }

  .nav-progress__bar {
    height: 100%;
    background: var(--accent-primary);
    box-shadow: 0 0 8px var(--accent-primary);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    transition: width var(--transition-normal) ease-out, opacity var(--transition-fast) ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-progress__bar {
      transition: opacity var(--transition-fast) ease-out;
    }
  }
</style>
