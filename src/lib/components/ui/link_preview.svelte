<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  /**
   * Wikipedia-style link hover previews.
   *
   * Single responsibility: watch every qualifying <a> on the page and, on hover,
   * show a floating card with the target's title, description and image (fetched
   * from /api/link-preview). Mounted once globally in the root layout.
   */

  interface Preview {
    url: string;
    title: string;
    description: string;
    image: string | null;
    siteName: string | null;
    favicon: string | null;
    error?: string;
  }

  // Tunables.
  const SHOW_DELAY = 350; // ms to hover before fetching/showing
  const HIDE_DELAY = 180; // ms grace period to move cursor onto the card
  const CARD_WIDTH = 320;
  const GAP = 10; // distance between link and card

  let mounted = false;
  let visible = false;
  let loading = false;
  let preview: Preview | null = null;
  let domain = '';

  let top = 0;
  let left = 0;
  let placement: 'top' | 'bottom' = 'bottom';

  let showTimer: ReturnType<typeof setTimeout> | null = null;
  let hideTimer: ReturnType<typeof setTimeout> | null = null;
  let activeAnchor: HTMLAnchorElement | null = null;
  let requestToken = 0;

  // Client-side cache so re-hovering a link is instant.
  const cache = new Map<string, Preview>();

  /** Decide whether a link should get a preview at all. */
  function shouldPreview(anchor: HTMLAnchorElement): boolean {
    const href = anchor.getAttribute('href');
    if (!href) return false;
    if (anchor.dataset.noPreview !== undefined) return false;
    // Skip in-page anchors and non-navigational schemes.
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return false;
    }
    // Must resolve to an http(s) URL.
    try {
      const resolved = new URL(anchor.href);
      if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') {
        return false;
      }
      // Skip pure same-page hash jumps on the current page.
      if (
        resolved.pathname === window.location.pathname &&
        resolved.origin === window.location.origin &&
        resolved.hash
      ) {
        return false;
      }
    } catch {
      return false;
    }
    return true;
  }

  function clearTimers() {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  /** Position the card above/below the link, clamped to the viewport. */
  function position(anchor: HTMLAnchorElement) {
    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Horizontal: align to the link's left edge, clamp into view.
    let l = rect.left;
    if (l + CARD_WIDTH > vw - GAP) l = vw - CARD_WIDTH - GAP;
    if (l < GAP) l = GAP;

    // Vertical: prefer below; flip above if not enough room.
    const spaceBelow = vh - rect.bottom;
    if (spaceBelow < 220 && rect.top > spaceBelow) {
      placement = 'top';
      top = rect.top - GAP;
    } else {
      placement = 'bottom';
      top = rect.bottom + GAP;
    }
    left = l;
  }

  async function loadPreview(anchor: HTMLAnchorElement) {
    const targetUrl = anchor.href;
    domain = new URL(targetUrl).hostname.replace(/^www\./, '');

    position(anchor);
    visible = true;

    // Serve from cache when possible.
    const cached = cache.get(targetUrl);
    if (cached) {
      preview = cached;
      loading = false;
      return;
    }

    loading = true;
    preview = null;
    const token = ++requestToken;

    try {
      const res = await fetch(
        `/api/link-preview?url=${encodeURIComponent(targetUrl)}`
      );
      const data: Preview = await res.json();
      if (token !== requestToken) return; // a newer hover superseded this one
      cache.set(targetUrl, data);
      preview = data;
    } catch {
      if (token !== requestToken) return;
      preview = {
        url: targetUrl,
        title: domain,
        description: '',
        image: null,
        siteName: domain,
        favicon: null
      };
    } finally {
      if (token === requestToken) loading = false;
    }
  }

  function handlePointerOver(event: PointerEvent) {
    const anchor = (event.target as Element | null)?.closest?.(
      'a[href]'
    ) as HTMLAnchorElement | null;

    if (!anchor || !shouldPreview(anchor)) return;
    if (anchor === activeAnchor) {
      clearTimers();
      return;
    }

    clearTimers();
    activeAnchor = anchor;
    showTimer = setTimeout(() => loadPreview(anchor), SHOW_DELAY);
  }

  function handlePointerOut(event: PointerEvent) {
    const related = event.relatedTarget as Node | null;
    // Ignore moves that stay within the same anchor.
    if (
      activeAnchor &&
      related &&
      activeAnchor.contains(related)
    ) {
      return;
    }
    scheduleHide();
  }

  function scheduleHide() {
    clearTimers();
    hideTimer = setTimeout(() => {
      visible = false;
      activeAnchor = null;
      requestToken++; // invalidate any in-flight request
    }, HIDE_DELAY);
  }

  // Keep the card open while the cursor is on it.
  function handleCardEnter() {
    clearTimers();
  }
  function handleCardLeave() {
    scheduleHide();
  }

  function handleScroll() {
    if (visible) {
      visible = false;
      activeAnchor = null;
    }
  }

  onMount(() => {
    mounted = true;
    // Touch devices don't hover — skip entirely.
    if (window.matchMedia('(hover: none)').matches) return;

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('scroll', handleScroll);
      clearTimers();
    };
  });
</script>

{#if mounted && visible}
  <div
    class="link-preview"
    class:above={placement === 'top'}
    style="top: {top}px; left: {left}px; width: {CARD_WIDTH}px;"
    role="tooltip"
    on:pointerenter={handleCardEnter}
    on:pointerleave={handleCardLeave}
    transition:fade={{ duration: 120 }}
  >
    {#if loading}
      <div class="lp-skeleton">
        <div class="lp-skel-line lp-skel-title"></div>
        <div class="lp-skel-line"></div>
        <div class="lp-skel-line lp-skel-short"></div>
      </div>
    {:else if preview}
      <a class="lp-link" href={preview.url} target="_blank" rel="noopener noreferrer" data-no-preview>
        {#if preview.image}
          <div class="lp-image">
            <img src={preview.image} alt="" loading="lazy" />
          </div>
        {/if}
        <div class="lp-body">
          <h4 class="lp-title">{preview.title}</h4>
          {#if preview.description}
            <p class="lp-description">{preview.description}</p>
          {/if}
          <div class="lp-source">
            {#if preview.favicon}
              <img class="lp-favicon" src={preview.favicon} alt="" loading="lazy" />
            {/if}
            <span class="lp-domain">{preview.siteName || domain}</span>
          </div>
        </div>
      </a>
    {/if}
  </div>
{/if}

<style>
  .link-preview {
    position: fixed;
    z-index: var(--z-tooltip);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    font-family: var(--font-family-mono);
  }

  /* When placed above the link, anchor the card by its bottom edge. */
  .link-preview.above {
    transform: translateY(-100%);
  }

  .lp-link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .lp-image {
    width: 100%;
    height: 150px;
    overflow: hidden;
    background-color: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-primary);
  }

  .lp-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lp-body {
    padding: var(--space-md);
  }

  .lp-title {
    margin: 0 0 var(--space-xs) 0;
    font-size: var(--font-size-sm);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .lp-description {
    margin: 0 0 var(--space-sm) 0;
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .lp-source {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding-top: var(--space-xs);
    border-top: 1px solid var(--border-primary);
  }

  .lp-favicon {
    width: 16px;
    height: 16px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .lp-domain {
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Loading skeleton */
  .lp-skeleton {
    padding: var(--space-md);
  }

  .lp-skel-line {
    height: 0.7rem;
    border-radius: var(--radius-sm);
    background: var(--bg-tertiary);
    animation: skeleton-pulse 1.5s ease-in-out infinite;
    margin-bottom: var(--space-sm);
  }

  .lp-skel-title {
    height: 0.9rem;
    width: 70%;
  }

  .lp-skel-short {
    width: 45%;
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .lp-skel-line {
      animation: none;
    }
  }

  @media (max-width: 500px) {
    .link-preview {
      display: none; /* hover previews are a desktop affordance */
    }
  }
</style>
