<script lang="ts">
  import "../../app.css";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { tick } from "svelte";

  import web from "./web.json";
  import gamedev from "./gamedev.json";
  import api from "./api.json";
  import languages from "./languages.json";
  import server from "./server.json";
  import database from "./database.json";
  import creative from "./creative.json";
  import analytics from "./analytics.json";
  import os from "./os.json";
  import instruments from "./instrument.json";
  import spokenLanguages from "./language.json";

  let currentCategory = "languages";
  let searchQuery = "";

  const categories: Record<
    string,
    { name: string; data: { text: string; img: string }[] }
  > = {
    languages: { name: "Programming Languages", data: languages },
    web: { name: "Web Development", data: web },
    gamedev: { name: "Game Development", data: gamedev },
    api: { name: "API Technologies", data: api },
    server: { name: "Server & Hosting", data: server },
    database: { name: "Database Systems", data: database },
    creative: { name: "Creative Tools", data: creative },
    analytics: { name: "Analytics Tools", data: analytics },
    os: { name: "Operating Systems", data: os },
  };

  $: trimmedQuery = searchQuery.trim().toLowerCase();
  $: searchResults = trimmedQuery
    ? Object.entries(categories).flatMap(([, cat]) =>
        cat.data
          .filter((s) => s.text.toLowerCase().includes(trimmedQuery))
          .map((s) => ({ ...s, _category: cat.name })),
      )
    : null;

  function replaceWithFallback(e: Event, text: string) {
    const img = e.currentTarget as HTMLImageElement | null;
    if (!img) return;
    const fallback = document.createElement("span");
    fallback.className = "skill-icon-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent = (text?.[0] ?? "?").toUpperCase();
    img.replaceWith(fallback);
  }

  async function handleTabKeydown(e: KeyboardEvent) {
    const keys = Object.keys(categories);
    const idx = keys.indexOf(currentCategory);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % keys.length;
    else if (e.key === "ArrowLeft")
      next = (idx - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    else return;
    e.preventDefault();
    currentCategory = keys[next];
    await tick();
    const tabEl = document.querySelector<HTMLButtonElement>(
      `[data-tab-key="${keys[next]}"]`,
    );
    tabEl?.focus();
  }
</script>

<svelte:head>
  <title>Skills - Stephen Daniel Okita</title>
  <meta name="description" content="Technical skills and expertise" />
</svelte:head>

<div class="page">
  <!-- Header -->
  <header class="hero">
    <h1>Skills</h1>
    <p class="summary">
      Full stack developer with 7+ years of experience. DevOps, self-hosting,
      game development, AI/ML, and systems administration. Fast learner across
      the computing spectrum.
    </p>
  </header>

  <!-- Environment -->
  <section class="section">
    <h2 class="section-label">Environment</h2>
    <div class="env-grid">
      <div class="env-item">
        <span class="env-key">os</span>
        <span class="env-val">NixOS + Hyprland</span>
      </div>
      <div class="env-item">
        <span class="env-key">editor</span>
        <span class="env-val">Neovim + Claude Code</span>
      </div>
      <div class="env-item">
        <span class="env-key">terminal</span>
        <span class="env-val">Ghostty + Zellij + Fish</span>
      </div>
      <div class="env-item">
        <span class="env-key">frontend</span>
        <span class="env-val">SvelteKit + TailwindCSS</span>
      </div>
      <div class="env-item">
        <span class="env-key">backend</span>
        <span class="env-val">Go Fiber / SvelteKit SSR / Python</span>
      </div>
      <div class="env-item">
        <span class="env-key">database</span>
        <span class="env-val">Neon / Qdrant</span>
      </div>
      <div class="env-item">
        <span class="env-key">deploy</span>
        <span class="env-val">Dokploy / Vercel</span>
      </div>
      <div class="env-item">
        <span class="env-key">ai</span>
        <span class="env-val">Ollama + LangChain / n8n</span>
      </div>
    </div>
  </section>

  <!-- Technical Skills -->
  <section class="section">
    <h2 class="section-label">Technical Skills</h2>

    <!-- Search -->
    <div class="search-wrap">
      <label class="search" for="skill-search">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input
          id="skill-search"
          type="search"
          bind:value={searchQuery}
          placeholder="Search across all skills…"
          autocomplete="off"
          spellcheck="false"
        />
        {#if searchQuery}
          <button
            type="button"
            class="search-clear"
            on:click={() => (searchQuery = "")}
            aria-label="Clear search"
          >×</button>
        {/if}
      </label>
    </div>

    <!-- Category tabs -->
    <div
      class="tabs"
      role="tablist"
      aria-label="Skill categories"
      class:dimmed={!!searchResults}
      on:keydown={handleTabKeydown}
    >
      {#each Object.entries(categories) as [key, cat]}
        <button
          class="tab"
          class:active={currentCategory === key && !searchResults}
          on:click={() => {
            searchQuery = "";
            currentCategory = key;
          }}
          role="tab"
          aria-selected={currentCategory === key && !searchResults}
          tabindex={currentCategory === key ? 0 : -1}
          data-tab-key={key}
        >
          {cat.name}
          <span class="tab-count">{cat.data.length}</span>
        </button>
      {/each}
    </div>

    <!-- Skills display -->
    {#if searchResults}
      {#if searchResults.length > 0}
        <div
          class="skills-grid"
          role="region"
          aria-label="Search results"
          aria-live="polite"
        >
          {#each searchResults as skill (skill._category + skill.text)}
            <div class="skill">
              <img
                src={skill.img}
                alt=""
                aria-hidden="true"
                on:error|once={(e) => replaceWithFallback(e, skill.text)}
              />
              <span class="skill-name">{skill.text}</span>
              <span class="skill-category">{skill._category}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="search-empty" aria-live="polite">
          No skills match <span class="search-empty-q">"{searchQuery}"</span>
        </p>
      {/if}
    {:else}
      <div
        class="skills-grid"
        role="tabpanel"
        aria-label="{categories[currentCategory].name} skills"
      >
        {#key currentCategory}
          {#each categories[currentCategory].data as skill}
            <div class="skill" in:fade={{ duration: 200 }}>
              <img
                src={skill.img}
                alt=""
                aria-hidden="true"
                on:error|once={(e) => replaceWithFallback(e, skill.text)}
              />
              <span class="skill-name">{skill.text}</span>
            </div>
          {/each}
        {/key}
      </div>
    {/if}
  </section>

  <!-- Other Skills -->
  <section class="section">
    <div class="other-grid">
      <div>
        <h2 class="section-label">Instruments</h2>
        <div class="pill-list">
          {#each instruments as item}
            <span class="pill">{item.text}</span>
          {/each}
        </div>
      </div>
      <div>
        <h2 class="section-label">Languages</h2>
        <div class="pill-list">
          {#each spokenLanguages as lang}
            <span class="pill pill-tier-{lang.tier}">{lang.text}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Resume -->
  <section class="section">
    <a
      href="/other/Stephen Okita Resume 2026-1.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="resume-link"
    >
      Resume (PDF) →
    </a>
  </section>
</div>

<style>
  .page {
    max-width: 740px;
    margin: 0 auto;
    padding: var(--space-xl) var(--space-lg) var(--space-2xl);
  }

  /* Hero */
  .hero {
    padding-bottom: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .hero h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    margin: 0 0 var(--space-sm);
  }

  .summary {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
    max-width: 600px;
  }

  /* Sections */
  .section {
    margin-bottom: var(--space-2xl);
    border-top: 1px solid var(--border-primary);
    padding-top: var(--space-xl);
  }

  .section-label {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-md);
    font-weight: 600;
  }

  /* Environment */
  .env-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xs) var(--space-xl);
  }

  .env-item {
    display: flex;
    gap: var(--space-sm);
    font-size: var(--font-size-sm);
    padding: var(--space-xs) 0;
  }

  .env-key {
    color: var(--accent-primary);
    font-family: var(--font-family-mono);
    font-weight: 600;
    min-width: 80px;
    flex-shrink: 0;
  }

  .env-val {
    color: var(--text-secondary);
  }

  /* Search */
  .search-wrap {
    margin-bottom: var(--space-md);
  }

  .search {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    background: var(--bg-secondary);
    transition: border-color var(--transition-fast);
  }

  .search:focus-within {
    border-color: var(--accent-primary);
  }

  .search-icon {
    color: var(--text-tertiary);
    font-size: var(--font-size-base);
    line-height: 1;
    flex-shrink: 0;
  }

  .search input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    padding: var(--space-xs) 0;
  }

  .search input::placeholder {
    color: var(--text-muted);
  }

  .search input::-webkit-search-cancel-button {
    display: none;
  }

  .search-clear {
    background: none;
    border: 0;
    color: var(--text-tertiary);
    cursor: pointer;
    font-size: var(--font-size-base);
    line-height: 1;
    padding: 0 var(--space-xs);
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);
  }

  .search-clear:hover {
    color: var(--text-primary);
  }

  .search-empty {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    padding: var(--space-lg) 0;
    margin: 0;
  }

  .search-empty-q {
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
  }

  /* Tabs */
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-lg);
  }

  .tab {
    background: none;
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-xs) var(--space-md);
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  .tab:hover {
    border-color: var(--border-accent);
    color: var(--text-primary);
  }

  .tab.active {
    background: var(--bg-tertiary);
    border-color: var(--accent-primary);
    border-left-width: 3px;
    padding-left: calc(var(--space-md) - 2px);
    color: var(--text-primary);
  }

  .tabs.dimmed .tab {
    opacity: 0.5;
  }

  .tab-count {
    color: var(--accent-secondary);
    font-size: 0.7rem;
  }

  .tab.active .tab-count {
    color: var(--text-primary);
  }

  /* Skills grid */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: var(--space-sm);
  }

  .skill {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-md) var(--space-sm);
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
    text-align: center;
  }

  .skill:hover {
    background: var(--bg-secondary);
  }

  .skill img {
    width: 36px;
    height: 36px;
    opacity: 1;
    transition: transform var(--transition-fast);
  }

  .skill:hover img {
    transform: translateY(-2px);
  }

  .skill-icon-fallback {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .skill-category {
    color: var(--accent-secondary);
    font-family: var(--font-family-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }

  .skill-name {
    color: var(--text-primary);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  /* Other skills */
  .other-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .pill-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .pill {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-secondary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
  }

  .pill-tier-native {
    opacity: 1;
    border-left: 3px solid var(--accent-primary);
    padding-left: calc(var(--space-sm) - 2px);
  }

  .pill-tier-fluent {
    opacity: 1;
  }

  .pill-tier-conversational {
    opacity: 0.7;
  }

  .pill-tier-basic {
    opacity: 0.45;
    font-style: italic;
  }

  /* Resume */
  .resume-link {
    display: inline-block;
    color: var(--accent-primary);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-mono);
    font-weight: 500;
    text-decoration: none;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .resume-link:hover {
    border-color: var(--accent-primary);
    background: var(--bg-secondary);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .page {
      padding: var(--space-lg) var(--space-md);
    }

    .env-grid {
      grid-template-columns: 1fr;
    }

    .other-grid {
      grid-template-columns: 1fr;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
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
