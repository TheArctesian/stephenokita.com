<script lang="ts">
  import "../../app.css";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  // Import skill data
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
  import language from "./language.json";

  let isLoaded = false;
  let currentCategory = "languages";
  let terminalHistory = [];

  onMount(() => {
    isLoaded = true;
    // Add initial terminal output
    terminalHistory = [
      { type: "command", text: "skills --list" },
      { type: "output", text: "Available skill categories:" },
      { type: "output", text: "  languages     Programming languages" },
      { type: "output", text: "  web           Web development frameworks" },
      { type: "output", text: "  gamedev       Game development engines" },
      { type: "output", text: "  api           API technologies" },
      { type: "output", text: "  server        Server & hosting" },
      { type: "output", text: "  database      Database systems" },
      { type: "output", text: "  creative      Creative tools" },
      { type: "output", text: "  analytics     Analytics platforms" },
      { type: "output", text: "  os            Operating systems" },
    ];
  });

  const categories = {
    languages: {
      name: "Programming Languages",
      data: languages,
      color: "cyan",
    },
    web: { name: "Web Development", data: web, color: "green" },
    gamedev: { name: "Game Development", data: gamedev, color: "pink" },
    api: { name: "API Technologies", data: api, color: "yellow" },
    server: { name: "Server & Hosting", data: server, color: "magenta" },
    database: { name: "Database Systems", data: database, color: "blue" },
    creative: { name: "Creative Tools", data: creative, color: "purple" },
    analytics: { name: "Analytics Tools", data: analytics, color: "orange" },
    os: { name: "Operating Systems", data: os, color: "red" },
  };

  function selectCategory(cat) {
    currentCategory = cat;
    terminalHistory = [
      ...terminalHistory,
      { type: "command", text: `skills --show ${cat}` },
      { type: "output", text: `Displaying ${categories[cat].name}...` },
    ];
  }

  // Get simple animation
  const getAnimation = (delay = 0) => {
    return { delay, duration: 600 };
  };
</script>

<svelte:head>
  <title>Skills - Stephen Daniel Okita</title>
  <meta name="description" content="Technical skills and expertise" />
</svelte:head>

<div class="terminal-container">
  {#if browser && isLoaded}
    <main class="terminal-main">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-controls">
          <div class="control-button close"></div>
          <div class="control-button minimize"></div>
          <div class="control-button maximize"></div>
        </div>
        <div class="terminal-title">stephen@okita:~/skills</div>
        <div class="terminal-menu">
          <span class="menu-item">File</span>
          <span class="menu-item">Edit</span>
          <span class="menu-item">View</span>
        </div>
      </div>

      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Info -->
        <div class="terminal-section" in:fade={getAnimation(200)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">neofetch</span>
          </div>
          <div class="neofetch-output">
            <div class="ascii-art">
              <pre>{`   _____ __   _ ____
  / ___// /__(_) / /____
  \\__ \\/ //_/ / / / ___/
 ___/ / ,< / / / (__  )
/____/_/|_/_/_/_/____/`}</pre>
            </div>
            <div class="system-info">
              <div class="info-line">
                <span class="info-label">Name</span>
                <span class="info-value">Stephen Daniel Okita</span>
              </div>
              <div class="info-line">
                <span class="info-label">Niche</span>
                <span class="info-value"
                  >Full Stack + AI/ML + Blockchain/Distrubuted Systems</span
                >
              </div>
              <div class="info-line">
                <span class="info-label">Experience</span>
                <span class="info-value">7+ Yrs</span>
              </div>
              <div class="info-line">
                <span class="info-label">Focus</span>
                <span class="info-value">Web, Linux, Data, AI, Crypto...</span>
              </div>
              <div class="info-line">
                <span class="info-label">OS</span>
                <span class="info-value">Nix OS (Hyprland)</span>
              </div>
              <div class="info-line">
                <span class="info-label">Editor</span>
                <span class="info-value">Neovim + Zellij</span>
              </div>
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div class="terminal-section" in:fade={getAnimation(400)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">cat README.md</span>
          </div>
          <div class="output-content">
            <h2 class="section-title">## Technical Overview</h2>
            <p class="readme-text">
              Mainly a full stack developer. Also a DevOps person with an
              emphasis in self hosting, a game developer, an AI/DS person and a
              sys admin. I have done projects across most of the computing
              sector and am a fast learner for anything I haven't done bofore.
            </p>
          </div>
        </div>

        <!-- Skills Navigation -->
        <div class="terminal-section" in:fade={getAnimation(600)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">ls -la categories/</span>
          </div>
          <div class="file-list">
            {#each Object.entries(categories) as [key, category]}
              <button
                class="file-item directory"
                class:active={currentCategory === key}
                on:click={() => selectCategory(key)}
              >
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-size">{category.data.length}</span>
                <span
                  class="file-name"
                  style="color: var(--accent-{category.color})">{key}/</span
                >
                <span class="file-description">{category.name}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Current Category Display -->
        <div class="terminal-section" in:fade={getAnimation(800)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills/categories</span>
            <span class="command">tree {currentCategory}/</span>
          </div>
          <div class="skills-grid">
            {#each categories[currentCategory].data as skill}
              <div class="skill-item" in:fade={getAnimation()}>
                <div class="skill-icon">
                  <img src={skill.img} alt={skill.text} />
                </div>
                <div class="skill-name">{skill.text}</div>
                {#if skill.level}
                  <div class="skill-level">
                    <div class="level-bar">
                      <div
                        class="level-fill"
                        style="width: {skill.level}%"
                      ></div>
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Development Stack -->
        <div class="terminal-section" in:fade={getAnimation(1000)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">cat stack.conf</span>
          </div>
          <div class="config-content">
            <div class="config-section">
              <h3 class="config-header">[Development Environment]</h3>
              <div class="config-grid">
                <div class="config-item">
                  <span class="config-key">os</span>
                  <span class="config-value"
                    >Nix OS + Hyprland + Rofi + Waybar</span
                  >
                </div>
                <div class="config-item">
                  <span class="config-key">editor</span>
                  <span class="config-value">Neovim + Claude-Code + Yazi</span>
                </div>
                <div class="config-item">
                  <span class="config-key">terminal</span>
                  <span class="config-value">Ghostty + Zellij + Fish</span>
                </div>
              </div>
            </div>

            <div class="config-section">
              <h3 class="config-header">[Preferred Stack]</h3>
              <div class="config-grid">
                <div class="config-item">
                  <span class="config-key">frontend</span>
                  <span class="config-value">SvelteKit + TailwindCSS</span>
                </div>
                <div class="config-item">
                  <span class="config-key">backend</span>
                  <span class="config-value"
                    >Go Fiber / SvelteKit SSR / Python</span
                  >
                </div>
                <div class="config-item">
                  <span class="config-key">database</span>
                  <span class="config-value">Neon or Qdrant</span>
                </div>
                <div class="config-item">
                  <span class="config-key">deployment</span>
                  <span class="config-value">Dokploy / Vercel</span>
                </div>
                <div class="config-item">
                  <span class="config-key">ai_stack</span>
                  <span class="config-value">Ollama + LangChain / n8n</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Extra Skills -->
        <div class="terminal-section" in:fade={getAnimation(1200)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">./show-extras.sh</span>
          </div>
          <div class="extras-grid">
            <div class="extras-section">
              <h3 class="extras-title">🎵 Instruments</h3>
              <div class="extras-list">
                {#each instruments as instrument}
                  <div class="extra-item">
                    <img src={instrument.img} alt={instrument.text} />
                    <span>{instrument.text}</span>
                  </div>
                {/each}
              </div>
            </div>
            <div class="extras-section">
              <h3 class="extras-title">🌍 Languages</h3>
              <div class="extras-list">
                {#each language as lang}
                  <div class="extra-item">
                    <img src={lang.img} alt={lang.text} />
                    <span>{lang.text}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>

        <!-- Resume Link -->
        <div class="terminal-section" in:fade={getAnimation(1400)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="command">ls -la resume/</span>
          </div>
          <div class="file-list">
            <a
              href="/other/Stephen Okita Resume 2024.pdf"
              target="_blank"
              class="file-item file"
            >
              <span class="file-permissions">-rw-r--r--</span>
              <span class="file-size">245K</span>
              <span class="file-name">resume-2024.pdf</span>
              <span class="file-description"
                >Full resume with detailed experience</span
              >
            </a>
          </div>
        </div>

        <!-- Cursor prompt -->
        <div
          class="terminal-section current-prompt"
          in:fade={getAnimation(1600)}
        >
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~/skills</span>
            <span class="cursor-blink">_</span>
          </div>
        </div>
      </div>
    </main>
  {/if}
</div>

<style>
  .terminal-container {
    min-height: 100vh;
    background: var(--bg-primary);
    font-family: var(--font-family-mono);
    padding: var(--space-lg);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .terminal-main {
    max-width: 1200px;
    width: 100%;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    margin-top: var(--space-xl);
  }

  /* Terminal Header */
  .terminal-header {
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-primary);
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-sm);
  }

  .terminal-controls {
    display: flex;
    gap: var(--space-xs);
  }

  .control-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid var(--border-secondary);
  }

  .control-button.close {
    background: var(--status-error);
  }
  .control-button.minimize {
    background: var(--status-warning);
  }
  .control-button.maximize {
    background: var(--status-success);
  }

  .terminal-title {
    color: var(--text-primary);
    font-weight: 500;
  }

  .terminal-menu {
    display: flex;
    gap: var(--space-md);
  }

  .menu-item {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .menu-item:hover {
    color: var(--text-primary);
  }

  /* Terminal Body */
  .terminal-body {
    padding: var(--space-lg);
    background: var(--bg-primary);
    min-height: 80vh;
  }

  .terminal-section {
    margin-bottom: var(--space-xl);
  }

  .prompt-line {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-base);
  }

  .prompt {
    color: var(--accent-primary);
    font-weight: bold;
  }

  .path {
    color: var(--accent-secondary);
  }

  .command {
    color: var(--text-primary);
  }

  /* Neofetch Style */
  .neofetch-output {
    display: flex;
    gap: var(--space-xl);
    margin-left: var(--space-lg);
    padding: var(--space-md);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
  }

  .ascii-art {
    color: var(--accent-primary);
    font-size: var(--font-size-xs);
    line-height: 1.2;
  }

  .ascii-art pre {
    margin: 0;
    font-family: var(--font-family-mono);
  }

  .system-info {
    flex: 1;
  }

  .info-line {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-sm);
  }

  .info-label {
    color: var(--accent-primary);
    font-weight: bold;
    min-width: 100px;
  }

  .info-value {
    color: var(--text-primary);
  }

  /* Output Content */
  .output-content {
    margin-left: var(--space-lg);
    color: var(--text-primary);
  }

  .section-title {
    color: var(--accent-tertiary);
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-sm);
    font-family: var(--font-family-mono);
  }

  .readme-text {
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 800px;
  }

  /* File List */
  .file-list {
    margin-left: var(--space-lg);
  }

  .file-item {
    display: grid;
    grid-template-columns: 120px 60px 200px 1fr;
    gap: var(--space-md);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    text-decoration: none;
    color: inherit;
    font-size: var(--font-size-sm);
    align-items: center;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: var(--font-family-mono);
  }

  .file-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(var(--space-sm));
  }

  .file-item.active {
    background: var(--bg-tertiary);
    border-left: 3px solid var(--accent-primary);
  }

  .file-permissions {
    color: var(--text-tertiary);
    font-size: var(--font-size-xs);
  }

  .file-size {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }

  .file-name {
    color: var(--accent-primary);
    font-weight: 500;
  }

  .file-description {
    color: var(--text-secondary);
    font-style: italic;
  }

  /* Skills Grid */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--space-md);
    margin-left: var(--space-lg);
  }

  .skill-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    text-align: center;
    transition: all var(--transition-normal);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .skill-item:hover {
    transform: translateY(-4px);
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-medium);
  }

  .skill-icon img {
    width: 48px;
    height: 48px;
    margin: 0 auto;
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%)
      hue-rotate(343deg) brightness(94%) contrast(90%);
    opacity: 0.8;
    transition: all var(--transition-fast);
  }

  .skill-item:hover .skill-icon img {
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%)
      hue-rotate(343deg) brightness(110%) contrast(90%);
    opacity: 1;
    transform: scale(1.1);
  }

  .skill-name {
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  .skill-level {
    width: 100%;
    height: 4px;
    background: var(--bg-tertiary);
    border-radius: 2px;
    overflow: hidden;
  }

  .level-bar {
    width: 100%;
    height: 100%;
    background: var(--bg-tertiary);
  }

  .level-fill {
    height: 100%;
    background: var(--accent-primary);
    transition: width var(--transition-normal);
  }

  /* Config Content */
  .config-content {
    margin-left: var(--space-lg);
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
  }

  .config-section {
    margin-bottom: var(--space-lg);
  }

  .config-section:last-child {
    margin-bottom: 0;
  }

  .config-header {
    color: var(--accent-tertiary);
    font-size: var(--font-size-base);
    margin-bottom: var(--space-md);
    font-family: var(--font-family-mono);
  }

  .config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-sm);
  }

  .config-item {
    display: flex;
    gap: var(--space-md);
    font-size: var(--font-size-sm);
  }

  .config-key {
    color: var(--accent-secondary);
    min-width: 100px;
  }

  .config-key::after {
    content: "=";
    margin-left: var(--space-xs);
  }

  .config-value {
    color: var(--text-primary);
  }

  /* Extras */
  .extras-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
    margin-left: var(--space-lg);
  }

  .extras-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }

  .extras-title {
    color: var(--text-primary);
    font-size: var(--font-size-base);
    margin-bottom: var(--space-md);
  }

  .extras-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .extra-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    text-align: center;
  }

  .extra-item img {
    width: 32px;
    height: 32px;
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%)
      hue-rotate(343deg) brightness(94%) contrast(90%);
    opacity: 0.8;
    transition: all var(--transition-fast);
  }

  .extra-item:hover img {
    opacity: 1;
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%)
      hue-rotate(343deg) brightness(110%) contrast(90%);
  }

  .extra-item span {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }

  /* Current Prompt */
  .current-prompt .cursor-blink {
    animation: blink 1s infinite;
    color: var(--text-primary);
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .terminal-container {
      padding: var(--space-sm);
    }

    .terminal-header {
      flex-direction: column;
      gap: var(--space-sm);
      text-align: center;
    }

    .terminal-menu {
      display: none;
    }

    .neofetch-output {
      flex-direction: column;
    }

    .file-item {
      grid-template-columns: 1fr;
      gap: var(--space-xs);
    }

    .file-permissions,
    .file-size {
      display: none;
    }

    .config-grid {
      grid-template-columns: 1fr;
    }

    .extras-grid {
      grid-template-columns: 1fr;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
</style>
