<script lang="ts">
  import "../../app.css";

  import Hero from "$lib/components/shared/hero.svelte";
  import Section from "$lib/components/shared/section.svelte";
  import PillList from "$lib/components/shared/pill_list.svelte";
  import KeyValueGrid from "$lib/components/shared/key_value_grid.svelte";
  import SearchInput from "$lib/components/shared/search_input.svelte";

  import TabNav from "./tab_nav.svelte";
  import SkillsGrid from "./skills_grid.svelte";

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

  const environment = [
    { label: "os", value: "NixOS + Hyprland" },
    { label: "editor", value: "Neovim + Claude Code" },
    { label: "terminal", value: "Ghostty + Zellij + Fish" },
    { label: "frontend", value: "SvelteKit + TailwindCSS" },
    { label: "backend", value: "Go Fiber / SvelteKit SSR / Python" },
    { label: "database", value: "Neon / Qdrant" },
    { label: "deploy", value: "Dokploy / Vercel" },
    { label: "ai", value: "Ollama + LangChain / n8n" },
  ];

  $: trimmedQuery = searchQuery.trim().toLowerCase();
  $: searchResults = trimmedQuery
    ? Object.entries(categories).flatMap(([, cat]) =>
        cat.data
          .filter((s) => s.text.toLowerCase().includes(trimmedQuery))
          .map((s) => ({ ...s, _category: cat.name })),
      )
    : null;
</script>

<svelte:head>
  <title>Skills - Stephen Daniel Okita</title>
  <meta name="description" content="Technical skills and expertise" />
</svelte:head>

<div class="page-shell">
  <Hero
    title="Skills"
    bordered={false}
    subtitle="Full stack developer with 7+ years of experience. DevOps, self-hosting, game development, AI/ML, and systems administration. Fast learner across the computing spectrum."
  />

  <Section label="Environment" bordered>
    <KeyValueGrid items={environment} minWidth={250} />
  </Section>

  <Section label="Technical Skills" bordered>
    <div class="mb-md">
      <SearchInput
        id="skill-search"
        label="Search skills"
        placeholder="Search across all skills…"
        bind:value={searchQuery}
      />
    </div>

    <TabNav
      {categories}
      bind:current={currentCategory}
      dimmed={!!searchResults}
      on:select={() => (searchQuery = "")}
    />

    {#if searchResults}
      {#if searchResults.length > 0}
        <SkillsGrid skills={searchResults} results ariaLabel="Search results" />
      {:else}
        <p class="search-empty" aria-live="polite">
          No skills match <span class="search-empty-q">"{searchQuery}"</span>
        </p>
      {/if}
    {:else}
      <SkillsGrid
        skills={categories[currentCategory].data}
        ariaLabel="{categories[currentCategory].name} skills"
      />
    {/if}
  </Section>

  <Section bordered>
    <div class="other-grid grid gap-xl">
      <div>
        <h2 class="section-eyebrow">Instruments</h2>
        <PillList items={instruments.map((i) => i.text)} />
      </div>
      <div>
        <h2 class="section-eyebrow">Languages</h2>
        <PillList ariaLabel="Spoken languages">
          {#each spokenLanguages as lang}
            <span class="pattern-pill pill-tier-{lang.tier}">{lang.text}</span>
          {/each}
        </PillList>
      </div>
    </div>
  </Section>

  <Section bordered>
    <a
      href="/other/Stephen Okita Resume 2026-1.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="resume-link"
    >
      Resume (PDF) →
    </a>
  </Section>
</div>

<style>
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

  .other-grid {
    grid-template-columns: 1fr 1fr;
  }

  /* Language proficiency tier modifiers layered onto shared pills. */
  .pill-tier-native {
    border-left: 3px solid var(--accent-primary);
    padding-left: calc(var(--space-sm) - 2px);
  }

  .pill-tier-conversational {
    opacity: 0.7;
  }

  .pill-tier-basic {
    opacity: 0.45;
    font-style: italic;
  }

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

  @media (max-width: 640px) {
    .other-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
