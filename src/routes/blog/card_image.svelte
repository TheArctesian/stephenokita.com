<script lang="ts">
  /**
   * 16:9 cover image for a blog card with a gradient overlay that
   * fades in a "Read Article →" affordance on hover. Theme-aware
   * gradient + aspect-ratio handling stay scoped here.
   */
  export let src: string;
  export let alt: string;
</script>

<div class="card-image-container">
  <img
    {src}
    {alt}
    class="card-image"
    width="320"
    height="180"
    loading="lazy"
    decoding="async"
  />
  <div class="image-overlay">
    <span class="read-more">Read Article →</span>
  </div>
</div>

<style>
  .card-image-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    background: var(--bg-tertiary);
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.blog-row:hover) .card-image {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :global(.blog-row:hover) .image-overlay {
    opacity: 1;
  }

  .read-more {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    transform: translateX(-10px);
    transition: transform 0.3s ease;
  }

  :global(.blog-row:hover) .read-more {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    .card-image-container {
      padding-top: 50%; /* Slightly shorter on mobile */
    }
  }
</style>
