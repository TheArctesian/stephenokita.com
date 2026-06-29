<script lang="ts">
  /**
   * Lazy-loaded image that reserves its space and shows a pulsing blank
   * placeholder until the bytes arrive, then fades the image in. Keeps layout
   * stable (no pop-in / no shift) and avoids fetching off-screen images on
   * mobile.
   *
   * The host element controls sizing — this fills its parent. Pass an explicit
   * `width`/`height` for the intrinsic image dimensions (helps the browser
   * reserve space and decode efficiently).
   */
  import { onMount } from "svelte";

  export let src: string;
  export let alt = "";
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let imgClass = "";
  /** Skip lazy-loading for above-the-fold images (still shows the placeholder). */
  export let eager = false;
  export let referrerpolicy: ReferrerPolicy | undefined = undefined;
  /** `cover` for photos/covers, `contain` for logos/favicons that must not crop. */
  export let objectFit: "cover" | "contain" = "cover";

  let loaded = false;
  let errored = false;
  let imgEl: HTMLImageElement;

  // A cached image can finish loading before this handler attaches (common on
  // client-side nav), so its `load` event never fires — check `complete` on mount.
  onMount(() => {
    if (imgEl?.complete && imgEl.naturalWidth > 0) loaded = true;
  });
</script>

<span class="lazy-img" class:is-loaded={loaded}>
  {#if !loaded && !errored}
    <span class="lazy-img__placeholder" aria-hidden="true"></span>
  {/if}
  <img
    bind:this={imgEl}
    {src}
    {alt}
    {width}
    {height}
    {referrerpolicy}
    class="lazy-img__img {imgClass}"
    style="object-fit: {objectFit};"
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

  .lazy-img__placeholder {
    position: absolute;
    inset: 0;
    background: var(--bg-tertiary);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  .lazy-img__img {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .lazy-img.is-loaded .lazy-img__img {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .lazy-img__placeholder {
      animation: none;
    }
    .lazy-img__img {
      transition: none;
    }
  }
</style>
