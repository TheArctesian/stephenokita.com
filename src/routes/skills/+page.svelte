<script lang="ts">
  import "../../app.css";

  import Hero from "$lib/components/shared/hero.svelte";
  import Section from "$lib/components/shared/section.svelte";
  import PillList from "$lib/components/shared/pill_list.svelte";
  import KeyValueGrid from "$lib/components/shared/key_value_grid.svelte";
  import SearchInput from "$lib/components/shared/search_input.svelte";

  import TabNav from "./tab_nav.svelte";
  import SkillsGrid from "./skills_grid.svelte";

  import { t } from "$lib/i18n";

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

  $: categories = {
    languages: { name: $t('skills.cat.languages'), data: languages },
    web: { name: $t('skills.cat.web'), data: web },
    gamedev: { name: $t('skills.cat.gamedev'), data: gamedev },
    api: { name: $t('skills.cat.api'), data: api },
    server: { name: $t('skills.cat.server'), data: server },
    database: { name: $t('skills.cat.database'), data: database },
    creative: { name: $t('skills.cat.creative'), data: creative },
    analytics: { name: $t('skills.cat.analytics'), data: analytics },
    os: { name: $t('skills.cat.os'), data: os },
  } as Record<
    string,
    { name: string; data: { text: string; img: string }[] }
  >;

  $: environment = [
    { label: $t('skills.env.os'), value: "NixOS + Hyprland" },
    { label: $t('skills.env.editor'), value: "Neovim + Claude Code" },
    { label: $t('skills.env.terminal'), value: "Ghostty + Zellij + Fish" },
    { label: $t('skills.env.frontend'), value: "SvelteKit + TailwindCSS" },
    { label: $t('skills.env.backend'), value: "Go Fiber / SvelteKit SSR / Python" },
    { label: $t('skills.env.database'), value: "Neon / Qdrant" },
    { label: $t('skills.env.deploy'), value: "Dokploy / Vercel" },
    { label: $t('skills.env.ai'), value: "Ollama + LangChain / n8n" },
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
  <title>{$t('skills.pageTitle')} - Stephen Daniel Okita</title>
  <meta name="description" content={$t('skills.metaDescription')} />
</svelte:head>

<div class="page-shell">
  <Hero
    title={$t('skills.heading')}
    bordered={false}
    subtitle={$t('skills.subtitle')}
  />

  <Section label={$t('skills.environment')} bordered>
    <KeyValueGrid items={environment} minWidth={250} />
  </Section>

  <Section label={$t('skills.technicalSkills')} bordered>
    <div class="mb-md">
      <SearchInput
        id="skill-search"
        label={$t('skills.searchLabel')}
        placeholder={$t('skills.searchPlaceholder')}
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
          {$t('skills.noMatch', { query: `"${searchQuery}"` })}
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
        <h2 class="section-eyebrow">{$t('skills.instruments')}</h2>
        <PillList items={instruments.map((i) => i.text)} />
      </div>
      <div>
        <h2 class="section-eyebrow">{$t('skills.languages')}</h2>
        <PillList ariaLabel={$t('skills.spokenLanguagesAria')}>
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
      {$t('skills.resume')}
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
