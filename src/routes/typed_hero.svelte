<script lang="ts">
  /**
   * Home-page hero: typed-name h1 (with blinking cursor), Japanese
   * subtitle, an optional "live location" marker line and the
   * role / affiliation links. Page-local — the typing animation and
   * pulse marker make it too specific for the shared hero.
   */
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { formatRelative } from "$lib/utils/dates";

  export let location:
    | {
        district?: string;
        city?: string;
        country?: string;
        timestamp?: number;
      }
    | null
    | undefined = null;

  const fullName = "Stephen Daniel Okita";
  const japanese = "沖田勇";

  let prefersReducedMotion = false;
  let typedText = "";
  let showCursor = true;

  onMount(() => {
    if (browser) {
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    if (!prefersReducedMotion) {
      typeAnimation();
    } else {
      typedText = fullName;
    }
  });

  async function typeAnimation() {
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 500);

    for (let i = 0; i <= fullName.length; i++) {
      typedText = fullName.slice(0, i);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    setTimeout(() => {
      clearInterval(cursorInterval);
      showCursor = false;
    }, 800);
  }
</script>

<section class="mb-xl">
  <h1 class="hero-title mb-xs">
    {#if browser}{typedText}<span
        class="cursor"
        class:visible={showCursor}
        aria-hidden="true">_</span
      >{:else}{fullName}{/if}
  </h1>
  <p class="subtitle mb-lg" lang="ja">{japanese}</p>

  {#if location && (location.district || location.city)}
    <p class="location mb-lg">
      <span class="location-marker" aria-hidden="true"></span>
      <span class="location-text"
        >In {#if location.district}<span class="location-district"
            >{location.district}</span
          >{/if}{#if location.city}, {location.city}{/if}{#if location.country}, {location.country}{/if}{#if location.timestamp}
          <span class="location-time">{formatRelative(location.timestamp)}</span>
        {/if}</span
      >
    </p>
  {/if}

  <div class="roles">
    <a
      href="https://www.auracarehealth.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="role"
    >
      <span class="role-position">CTO & Co-founder</span>
      <span class="role-at">Auracare Health</span>
    </a>
    <a href="/person" class="role">
      <span class="role-position">Philosophy</span>
      <span class="role-at">UC Berkeley</span>
    </a>
  </div>
</section>

<style>
  .hero-title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    line-height: 1.15;
  }

  .cursor {
    opacity: 0;
    transition: opacity 0.1s ease;
  }
  .cursor.visible {
    opacity: 1;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
  }

  .roles {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-xs) var(--space-sm);
    line-height: 1.6;
  }

  .role {
    text-decoration: none;
    color: inherit;
  }

  a.role:hover .role-position {
    color: var(--accent-primary);
  }

  .role-position {
    color: var(--text-primary);
    font-weight: 600;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }

  .role-at {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }

  .role-at::before {
    content: "@ ";
    color: var(--text-muted);
  }

  .role + .role::before {
    content: "/";
    color: var(--text-muted);
    margin-right: var(--space-sm);
    user-select: none;
  }

  .location {
    display: flex;
    align-items: baseline;
    gap: 8px;
    line-height: 1.6;
    font-size: var(--font-size-sm);
  }

  .location-marker {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--status-success);
    transform: translateY(-1px);
    flex-shrink: 0;
    box-shadow: 0 0 0 0 rgba(163, 190, 140, 0.6);
  }

  @media (prefers-reduced-motion: no-preference) {
    .location-marker {
      animation: location-pulse 2.4s ease-in-out infinite;
    }
  }

  @keyframes location-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(163, 190, 140, 0.55);
    }
    70% {
      box-shadow: 0 0 0 7px rgba(163, 190, 140, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(163, 190, 140, 0);
    }
  }

  .location-text {
    color: var(--text-secondary);
  }

  .location-district {
    color: var(--text-primary);
  }

  .location-time {
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    margin-left: var(--space-sm);
  }
</style>
