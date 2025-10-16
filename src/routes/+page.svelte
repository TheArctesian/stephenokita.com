<script>
  import "../app.css";
  import { fade, fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  // Import type for data prop
  export let data;

  let isLoaded = false;
  let prefersReducedMotion = false;
  let nameElement;
  let typedText = "";
  let showCursor = true;

  const fullName = "Stephen Daniel Okita";
  const japanese = "沖田勇";

  onMount(() => {
    // Check for reduced motion preference
    if (browser) {
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    if (!prefersReducedMotion) {
      // Type out name animation
      typeAnimation();
    } else {
      typedText = fullName;
    }

    isLoaded = true;
  });

  async function typeAnimation() {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 500);

    // Type out name
    for (let i = 0; i <= fullName.length; i++) {
      typedText = fullName.slice(0, i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Stop cursor blinking after typing
    setTimeout(() => {
      clearInterval(cursorInterval);
      showCursor = false;
    }, 1000);
  }

  // Simple, elegant animations that respect user preferences
  const getAnimation = (type = "fade", delay = 0) => {
    if (prefersReducedMotion) {
      return { duration: 1 }; // Minimal animation
    }

    switch (type) {
      case "fly":
        return { delay, duration: 600, y: 20 };
      case "fade":
      default:
        return { delay, duration: 600 };
    }
  };
</script>

<svelte:head>
  <title>Stephen Daniel Okita</title>
  <meta name="description" content="Personal website of Stephen Daniel Okita" />
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
        <div class="terminal-title">stephen@okita:~</div>
        <div class="terminal-menu">
          <span class="menu-item">File</span>
          <span class="menu-item">Edit</span>
          <span class="menu-item">View</span>
        </div>
      </div>

      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- Name Section with Animation -->
        <div class="terminal-section" in:fade={getAnimation("fade", 200)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~</span>
            <span class="command">whoami</span>
          </div>
          <div class="output-line">
            <h1 class="name-display" bind:this={nameElement}>
              {typedText}<span class="cursor" class:visible={showCursor}>_</span
              >
            </h1>
          </div>
          <div
            class="output-line japanese"
            in:fade={getAnimation("fade", 1000)}
          >
            {japanese}
          </div>
        </div>

        <!-- Navigation Cards -->
        <div class="terminal-section" in:fade={getAnimation("fade", 1200)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~</span>
            <span class="command">ls -la</span>
          </div>
          <div class="file-list">
            <a href="/skills" class="file-item directory">
              <span class="file-permissions">drwxr-xr-x</span>
              <span class="file-size">{data.fileSizes?.skills || "1.5K"}</span>
              <span class="file-name">skills/</span>
              <span class="file-description">technical expertise</span>
            </a>
            <a href="/person" class="file-item directory">
              <span class="file-permissions">drwxr-xr-x</span>
              <span class="file-size">{data.fileSizes?.person || "3.2K"}</span>
              <span class="file-name">person/</span>
              <span class="file-description">personal information</span>
            </a>

            <a href="/projects" class="file-item directory">
              <span class="file-permissions">drwxr-xr-x</span>
              <span class="file-size">{data.fileSizes?.projects || "2.1K"}</span
              >
              <span class="file-name">projects/</span>
              <span class="file-description">software and research</span>
            </a>
            <a href="/blog" class="file-item directory">
              <span class="file-permissions">drwxr-xr-x</span>
              <span class="file-size">{data.fileSizes?.blog || "4.0K"}</span>
              <span class="file-name">blog/</span>
              <span class="file-description">thoughts and writings</span>
            </a>

            <a href="/meta" class="file-item directory">
              <span class="file-permissions">drwxr-xr-x</span>
              <span class="file-size">{data.fileSizes?.meta || "3.2K"}</span>
              <span class="file-name">meta/</span>
              <span class="file-description">telemetry and stack</span>
            </a>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="terminal-section" in:fade={getAnimation("fade", 1600)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~</span>
            <span class="command">tail -f activity.log</span>
          </div>
          <div class="log-output">
            <div class="log-grid">
              <!-- Latest Blog Post -->
              <div class="log-entry blog-entry">
                <div class="log-header">
                  <span class="log-timestamp">[BLOG]</span>
                  <span class="log-status">LATEST</span>
                </div>
                <div class="log-content">
                  {#if data.latestPost}
                    <h3 class="log-title">{data.latestPost.title}</h3>
                    <p class="log-description">{data.latestPost.description}</p>
                    <div class="log-meta">
                      <span class="log-date"
                        >{new Date(
                          data.latestPost.date,
                        ).toLocaleDateString()}</span
                      >
                      <span class="log-location"
                        >{data.latestPost.location}</span
                      >
                    </div>
                    <a href="/blog/{data.latestPost.slug}" class="log-link"
                      >read post →</a
                    >
                  {:else}
                    <h3 class="log-title">Recent Post</h3>
                    <p class="log-description">Loading latest thoughts...</p>
                    <a href="/blog" class="log-link">cd blog/ →</a>
                  {/if}
                </div>
              </div>

              <!-- Latest Project -->
              <div class="log-entry project-entry">
                <div class="log-header">
                  <span class="log-timestamp">[PROJECT]</span>
                  <span class="log-status">ACTIVE</span>
                </div>
                <div class="log-content">
                  {#if data.latestProject}
                    <h3 class="log-title">{data.latestProject.title}</h3>
                    <p class="log-description">
                      {data.latestProject.description}
                    </p>
                    <div class="log-meta">
                      {#if data.latestProject.status}
                        <span class="project-status"
                          >{data.latestProject.status}</span
                        >
                      {/if}
                      {#if data.latestProject.technologies && data.latestProject.technologies.length > 0}
                        <span class="project-tech"
                          >{data.latestProject.technologies
                            .slice(0, 2)
                            .join(", ")}</span
                        >
                      {/if}
                    </div>
                    {#if data.latestProject.github_url}
                      <a href={data.latestProject.github_url} class="log-link"
                        >view code →</a
                      >
                    {:else}
                      <a href="/projects" class="log-link">view projects →</a>
                    {/if}
                  {:else}
                    <h3 class="log-title">Latest Project</h3>
                    <p class="log-description">Current development work...</p>
                    <a href="/projects" class="log-link">cd projects/ →</a>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="terminal-section" in:fade={getAnimation("fade", 2000)}>
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~</span>
            <span class="command">contact --help</span>
          </div>
          <div class="output-line">
            <div class="contact-info">
              <div class="contact-line">
                <span class="contact-label">email:</span>
                <a href="mailto:me@stephenokita.com" class="contact-value"
                  >me@stephenokita.com</a
                >
              </div>
              <div class="contact-line">
                <span class="contact-label">calendar:</span>
                <a href="https://cal.com/stephenokita" class="contact-value"
                  >cal.com/stephenokita</a
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Cursor prompt -->
        <div
          class="terminal-section current-prompt"
          in:fade={getAnimation("fade", 2400)}
        >
          <div class="prompt-line">
            <span class="prompt">➜</span>
            <span class="path">~</span>
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
    max-width: 1000px;
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

  .output-line {
    margin-left: var(--space-lg);
    margin-bottom: var(--space-sm);
  }

  /* Name Animation */
  .name-display {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: bold;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    line-height: 1.2;
  }

  .cursor {
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  .cursor.visible {
    opacity: 1;
  }

  .japanese {
    color: var(--text-secondary);
    font-size: var(--font-size-lg);
    margin-top: var(--space-sm);
  }

  /* File List */
  .file-list {
    margin-left: var(--space-lg);
  }

  .file-item {
    display: grid;
    grid-template-columns: 120px 60px 1fr 2fr;
    gap: var(--space-md);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    text-decoration: none;
    color: inherit;
    font-size: var(--font-size-sm);
    align-items: center;
  }

  .file-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(var(--space-sm));
  }

  .file-permissions {
    color: var(--text-tertiary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
  }

  .file-size {
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
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

  /* Log Output */
  .log-output {
    margin-left: var(--space-lg);
  }

  .log-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
  }

  .log-entry {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    transition: all var(--transition-normal);
  }

  .log-entry:hover {
    border-color: var(--border-accent);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
  }

  .log-timestamp {
    color: var(--accent-primary);
    font-weight: bold;
  }

  .log-status {
    color: var(--status-success);
    background: var(--bg-tertiary);
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
  }

  .log-content h3 {
    color: var(--text-primary);
    font-size: var(--font-size-base);
    margin-bottom: var(--space-xs);
  }

  .log-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-sm);
    line-height: 1.4;
  }

  .log-link {
    color: var(--accent-primary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-mono);
    transition: color var(--transition-fast);
  }

  .log-link:hover {
    color: var(--accent-cyan);
  }

  .log-meta {
    display: flex;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
  }

  .log-date,
  .log-location,
  .project-status,
  .project-tech {
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    padding: 2px var(--space-xs);
    border-radius: var(--radius-sm);
  }

  .project-status {
    color: var(--status-info);
  }

  .project-tech {
    color: var(--accent-tertiary);
  }

  /* Contact Info */
  .contact-info {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--space-md);
  }

  .contact-line {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
  }

  .contact-line:last-child {
    margin-bottom: 0;
  }

  .contact-label {
    color: var(--text-tertiary);
    min-width: 80px;
    font-size: var(--font-size-sm);
  }

  .contact-value {
    color: var(--accent-primary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }

  .contact-value:hover {
    color: var(--accent-cyan);
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

    .file-item {
      grid-template-columns: 1fr;
      gap: var(--space-xs);
    }

    .file-permissions,
    .file-size {
      display: none;
    }

    .log-grid {
      grid-template-columns: 1fr;
    }

    .name-display {
      font-size: clamp(1.5rem, 8vw, 2.5rem);
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .cursor-blink {
      animation: none;
    }

    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
