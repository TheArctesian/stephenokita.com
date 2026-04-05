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
</script>

<svelte:head>
  <title>Stephen Daniel Okita</title>
  <meta
    name="description"
    content="Personal website of Stephen Daniel Okita"
  />
</svelte:head>

<div class="page">
  <!-- Hero -->
  <section class="hero">
    <h1>
      {#if browser}{typedText}<span class="cursor" class:visible={showCursor}
          >_</span
        >{:else}{fullName}{/if}
    </h1>
    <p class="subtitle">{japanese}</p>

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
      <span class="role-sep" aria-hidden="true">/</span>
      <a
        href="https://www.ucinvestments.info/"
        target="_blank"
        rel="noopener noreferrer"
        class="role"
      >
        <span class="role-position">Student Researcher</span>
        <span class="role-at">UC Investments</span>
      </a>
      <span class="role-sep" aria-hidden="true">/</span>
      <span class="role">
        <span class="role-position">Philosophy</span>
        <span class="role-at">UC Berkeley</span>
      </span>
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

  .role-sep {
    color: var(--text-muted);
    user-select: none;
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
    transition: border-color var(--transition-fast);
  }

  .card:hover {
    border-left-color: var(--accent-primary);
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
    color: var(--status-success);
  }

  .project-tag {
    color: var(--accent-primary);
  }

  .card-date,
  .card-status {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
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
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
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
