<script>
  import "../app.css";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  export let data;

  let prefersReducedMotion = false;
  let typedText = "";
  let showCursor = true;

  const fullName = "Stephen Daniel Okita";
  const japanese = "沖田勇";

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

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatRelative(timestamp) {
    if (!timestamp) return "";
    const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diffSec < 60) return "just now";
    const mins = Math.floor(diffSec / 60);
    if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
</script>

<svelte:head>
  <title>Stephen Daniel Okita</title>
  <meta
    name="description"
    content="Stephen Daniel Okita — CTO & Co-founder at Auracare Health, Philosophy at UC Berkeley. Notes on software, security, and systems."
  />
</svelte:head>

<div class="page">
  <!-- Hero -->
  <section class="hero">
    <h1>
      {#if browser}{typedText}<span class="cursor" class:visible={showCursor} aria-hidden="true"
          >_</span
        >{:else}{fullName}{/if}
    </h1>
    <p class="subtitle" lang="ja">{japanese}</p>

    {#if data.location && (data.location.district || data.location.city)}
      <p class="location">
        <span class="location-marker" aria-hidden="true"></span>
        <span class="location-text"
          >In {#if data.location.district}<span class="location-district"
              >{data.location.district}</span
            >{/if}{#if data.location.city}, {data.location.city}{/if}{#if data.location.country}, {data.location.country}{/if}{#if data.location.timestamp}
            <span class="location-time">{formatRelative(data.location.timestamp)}</span>
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

  <!-- Recent -->
  <section class="recent">
    <div class="activity-grid">
      {#if data.latestPost}
        <a href="/blog/{data.latestPost.slug}" class="card">
          <div class="card-top">
            <span class="card-tag blog-tag">Latest Post</span>
            <span class="card-date">{formatDate(data.latestPost.date)}</span>
          </div>
          <h3>{data.latestPost.title}</h3>
          <p>{data.latestPost.description}</p>
          {#if data.latestPost.location}
            <span class="card-location">{data.latestPost.location}</span>
          {/if}
        </a>
      {/if}

      {#if data.latestProject}
        <a
          href={data.latestProject.github_url || "/projects"}
          class="card"
          target={data.latestProject.github_url ? "_blank" : undefined}
          rel={data.latestProject.github_url
            ? "noopener noreferrer"
            : undefined}
        >
          <div class="card-top">
            <span class="card-tag project-tag">Latest Project</span>
            {#if data.latestProject.status}
              <span class="card-status">{data.latestProject.status}</span>
            {/if}
          </div>
          <h3>{data.latestProject.title}</h3>
          <p>{data.latestProject.description}</p>
          {#if data.latestProject.technologies && data.latestProject.technologies.length > 0}
            <div class="card-tech">
              {#each data.latestProject.technologies.slice(0, 4) as tech}
                <span class="tech-pill">{tech}</span>
              {/each}
            </div>
          {/if}
        </a>
      {/if}
    </div>
  </section>
</div>

<style>
  .page {
    max-width: 740px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-lg) var(--space-2xl);
  }

  /* ── Hero ── */
  .hero {
    padding-bottom: var(--space-2xl);
    border-bottom: 1px solid var(--border-primary);
    margin-bottom: var(--space-xl);
  }

  .hero h1 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    line-height: 1.15;
    margin: 0 0 var(--space-xs);
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
    margin: 0 0 var(--space-lg);
  }

  /* Roles — inline flow */
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
    margin: 0 0 var(--space-lg);
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

  /* ── Recent Activity ── */
  .activity-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }

  .card {
    display: block;
    text-decoration: none;
    color: inherit;
    padding: var(--space-md) var(--space-lg);
    border-left: 3px solid var(--border-primary);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: transparent;
    transition:
      border-color var(--transition-fast),
      background-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .card:hover {
    border-left-color: var(--accent-primary);
    background: var(--bg-secondary);
    transform: translateX(2px);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
  }

  .card-tag {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blog-tag {
    color: var(--accent-tertiary);
  }

  .project-tag {
    color: var(--accent-primary);
  }

  .card-date {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
  }

  .card-status {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
    text-transform: lowercase;
  }

  .card h3 {
    color: var(--text-primary);
    font-size: var(--font-size-base);
    margin: 0 0 var(--space-xs);
    font-weight: 600;
    line-height: 1.3;
  }

  .card p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
    margin: 0 0 var(--space-sm);
  }

  .card-location {
    display: inline-block;
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .tech-pill {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    background: var(--bg-tertiary);
    padding: 1px var(--space-sm);
    border-radius: var(--radius-sm);
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .page {
      padding: var(--space-lg) var(--space-md);
    }

    .activity-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
