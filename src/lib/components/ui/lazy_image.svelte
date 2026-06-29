<script lang="ts">
  /**
   * Lazy-loaded image that reserves its space and shows a shimmering loading
   * bar until the bytes arrive, then fades the image in. Keeps layout stable
   * (no pop-in / no shift) and avoids fetching off-screen images on mobile.
   *
   * The host element controls sizing — this fills its parent. Pass an explicit
   * `width`/`height` for the intrinsic image dimensions (helps the browser
   * reserve space and decode efficiently).
   */
  export let src: string;
  export let alt = "";
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let imgClass = "";
  /** Skip lazy-loading for above-the-fold images (still shows the shimmer). */
  export let eager = false;
  export let referrerpolicy: ReferrerPolicy | undefined = undefined;

  let loaded = false;
  let errored = false;
</script>

<span class="lazy-img" class:is-loaded={loaded}>
  {#if !loaded && !errored}
    <span class="lazy-img__shimmer" aria-hidden="true"></span>
  {/if}
  <img
    {src}
    {alt}
    {width}
    {height}
    {referrerpolicy}
    class="lazy-img__img {imgClass}"
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    on:load={() => (loaded = true)}
    on:error={() => (errored = true)}
    on:load
    on:error
  />
</span>

<style>
  .lazy-img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .lazy-img__shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--bg-tertiary) 25%,
      var(--bg-quaternary) 37%,
      var(--bg-tertiary) 63%
    );
    background-size: 400% 100%;
    animation: lazy-img-shimmer 1.4s ease infinite;
  }

  .lazy-img__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .lazy-img.is-loaded .lazy-img__img {
    opacity: 1;
  }

  @keyframes lazy-img-shimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lazy-img__shimmer {
      animation: none;
    }
    .lazy-img__img {
      transition: none;
    }
  }
</style>
