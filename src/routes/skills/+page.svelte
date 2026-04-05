<script lang="ts">
  import "../../app.css";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

  import web from "./web.json";
  import gamedev from "./gamedev.json";
  import api from "./api.json";
  import languages from "./languages.json";
  import server from "./server.json";
  import database from "./database.json";
  import creative from "./creative.json";
  import analytics from "./anayltics.json";
  import os from "./os.json";
  import instruments from "./instrument.json";
  import spokenLanguages from "./language.json";

  let currentCategory = "languages";

  const categories: Record<
    string,
    { name: string; data: { text: string; img: string; level?: number }[] }
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

    <!-- Category tabs -->
    <div class="tabs" role="tablist" aria-label="Skill categories">
      {#each Object.entries(categories) as [key, cat]}
        <button
          class="tab"
          class:active={currentCategory === key}
          on:click={() => (currentCategory = key)}
          role="tab"
          aria-selected={currentCategory === key}
        >
          {cat.name}
          <span class="tab-count">{cat.data.length}</span>
        </button>
      {/each}
    </div>

    <!-- Skills display -->
    <div
      class="skills-grid"
      role="tabpanel"
      aria-label="{categories[currentCategory].name} skills"
    >
      {#key currentCategory}
        {#each categories[currentCategory].data as skill}
          <div class="skill" in:fade={{ duration: 200 }}>
            <img src={skill.img} alt="" aria-hidden="true" />
            <span class="skill-name">{skill.text}</span>
            {#if skill.level}
              <div
                class="skill-bar"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="{skill.text} proficiency: {skill.level}%"
              >
                <div class="skill-fill" style="width: {skill.level}%"></div>
              </div>
            {/if}
          </div>
        {/each}
      {/key}
    </div>
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
            <span class="pill">{lang.text}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Resume -->
  <section class="section">
    <a
      href="/other/Stephen Okita Resume 2024.pdf"
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
    border-bottom: 1px solid var(--border-primary);
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
    color: var(--text-primary);
  }

  .tab-count {
    color: var(--text-muted);
    font-size: 0.7rem;
  }

  .tab.active .tab-count {
    color: var(--text-secondary);
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
    opacity: 0.7;
    filter: grayscale(0.3);
    transition: all var(--transition-fast);
  }

  .skill:hover img {
    opacity: 1;
    filter: grayscale(0);
  }

  .skill-name {
    color: var(--text-primary);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  .skill-bar {
    width: 100%;
    height: 3px;
    background: var(--bg-tertiary);
    border-radius: 2px;
    overflow: hidden;
  }

  .skill-fill {
    height: 100%;
    background: var(--accent-primary);
    border-radius: 2px;
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
