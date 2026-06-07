<script lang="ts">
  /**
   * Clickable photo hero for the person page: a square portrait that
   * toggles an easter-egg caption, beside the page title + lede. The
   * text reuses the shared `.pattern-hero__*` typography; the photo
   * button + easter-egg interaction stay scoped here.
   */
  export let src: string;
  export let title: string;
  export let subtitle: string;

  let showEasterEgg = false;

  const toggle = () => (showEasterEgg = !showEasterEgg);
</script>

<header class="hero mb-xl">
  <button
    class="photo-btn"
    on:click={toggle}
    on:keydown={(e) =>
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
    aria-label="Photo of Stephen. Click for a surprise!"
    aria-pressed={showEasterEgg}
  >
    <img {src} alt="" class="photo" aria-hidden="true" />
    {#if showEasterEgg}
      <span class="easter-egg">You found the easter egg!</span>
    {/if}
  </button>

  <div class="flex-1">
    <h1 class="pattern-hero__title">{title}</h1>
    <p class="pattern-hero__lede">{subtitle}</p>
  </div>
</header>

<style>
  .hero {
    display: flex;
    align-items: flex-start;
    gap: var(--space-xl);
  }

  .photo-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-md);
  }

  .photo-btn:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 4px;
  }

  .photo {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
    display: block;
    transition: border-color var(--transition-fast);
  }

  .photo-btn:hover .photo {
    border-color: var(--accent-primary);
  }

  .easter-egg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--font-size-xs);
    color: var(--accent-primary);
    white-space: nowrap;
    bottom: -24px;
  }

  @media (max-width: 640px) {
    .hero {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .photo {
      width: 120px;
      height: 120px;
    }
  }
</style>
