<script lang="ts">
  import "../../app.css";
  import { getSocialIcon } from "$lib/utils/icons";
  import Icon from "@iconify/svelte";
  import me from "./imgs/me&kim.jpg";
  import type { PageData } from "./$types";

  export let data: PageData;

  let showEasterEgg = false;

  const socialLinks = [
    {
      name: "YouTube (General)",
      service: "youtube",
      url: "https://www.youtube.com/@stephenokita",
    },
    {
      name: "YouTube (Music)",
      service: "youtube",
      url: "https://www.youtube.com/@StephenOkitasMusicalMusings",
    },
    {
      name: "YouTube (Videos)",
      service: "youtube",
      url: "https://www.youtube.com/@StephenOkitasVideos",
    },
    {
      name: "Spotify",
      service: "spotify",
      url: "https://open.spotify.com/user/b3oj8mjbyq5cfs26vp6c41ujr",
    },
    {
      name: "Goodreads",
      service: "goodreads",
      url: "https://www.goodreads.com/user/show/155512706-stephen-okita",
    },
    {
      name: "Letterboxd",
      service: "letterboxd",
      url: "https://letterboxd.com/danielOkita/",
    },
  ];
</script>

<svelte:head>
  <title>Person - Stephen Okita</title>
  <meta
    name="description"
    content="The personal side of Stephen Okita - musician, philosopher, developer."
  />
</svelte:head>

<div class="page">
  <!-- Hero with photo -->
  <header class="hero">
    <button
      class="photo-btn"
      on:click={() => (showEasterEgg = !showEasterEgg)}
      on:keydown={(e) =>
        (e.key === "Enter" || e.key === " ") &&
        (e.preventDefault(), (showEasterEgg = !showEasterEgg))}
      aria-label="Photo of Stephen. Click for a surprise!"
      aria-pressed={showEasterEgg}
    >
      <img src={me} alt="" class="photo" aria-hidden="true" />
      {#if showEasterEgg}
        <span class="easter-egg">You found the easter egg!</span>
      {/if}
    </button>
    <div class="hero-text">
      <h1>About Me</h1>
      <p>
        This is meant to be a bit more personal but has turned into more demographic.
      </p>
    </div>
  </header>

  <!-- Background -->
  <section class="section">
    <h2 class="section-label">Background</h2>
    <div class="timeline">
      <div class="timeline-row">
        <span class="timeline-place">London, UK</span>
        <span class="timeline-dates">2004&ndash;2007 · 2026&ndash;</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">Hong Kong</span>
        <span class="timeline-dates">2007&ndash;2019 · 2020&ndash;2023</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">Hangzhou, China</span>
        <span class="timeline-dates">2019&ndash;2020</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">Berkeley, California</span>
        <span class="timeline-dates">2023&ndash;</span>
      </div>
    </div>
    <p class="prose-text timeline-footer">
      Other places I've been: <a href="https://world.stephenokita.com" target="_blank" rel="noopener noreferrer" class="inline-link">world.stephenokita.com</a>
    </p>
  </section>

  <!-- Education -->
  <section class="section">
    <h2 class="section-label">Education</h2>
    <div class="list">
      <div class="list-row">Chinese International School (IB)</div>
      <div class="list-row">UC Berkeley -- CS & Philosophy</div>
    </div>
  </section>

  <!-- Work -->
  <section class="section">
    <h2 class="section-label">What I Do</h2>
    <div class="list">
      <div class="list-row">
        CTO &amp; Co-Founder @
        <a
          href="https://www.auracarehealth.com/"
          target="_blank"
          rel="noopener noreferrer">Aura Care Health</a
        >
      </div>
      <div class="list-row">
        Writer @ <a href="/blog">This Blog</a>
      </div>
    </div>
  </section>

  <!-- Where I've Worked -->
  <section class="section">
    <h2 class="section-label">Where I've Worked</h2>
    <div class="timeline">
      <div class="timeline-row">
        <span class="timeline-place">
          CTO &amp; Co-Founder @
          <a href="https://auracare.org.uk" target="_blank" rel="noopener noreferrer" class="inline-link">Auracare</a>
        </span>
        <span class="timeline-dates">Jun 2024&ndash;</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Member @
          <a href="https://asiasociety.org" target="_blank" rel="noopener noreferrer" class="inline-link">Asia Society</a>
        </span>
        <span class="timeline-dates">Jun 2024&ndash;</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          CTO &amp; Co-Founder @
          <a href="https://techjusticelab.org" target="_blank" rel="noopener noreferrer" class="inline-link">Berkeley Tech &amp; Justice Lab</a>
        </span>
        <span class="timeline-dates">Feb 2025&ndash;Jan 2026</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Full Stack Developer @
          <a href="https://launchedtech.io" target="_blank" rel="noopener noreferrer" class="inline-link">Launchedtech</a>
        </span>
        <span class="timeline-dates">Jun 2024&ndash;Feb 2025</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">Student Researcher &amp; Teacher @ UC Berkeley</span>
        <span class="timeline-dates">Jan 2024&ndash;Jan 2026</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Full Stack Developer @
          <a href="https://link-health.org" target="_blank" rel="noopener noreferrer" class="inline-link">Link Health</a>
        </span>
        <span class="timeline-dates">Sep 2023&ndash;Jan 2024</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Blockchain Developer @
          <a href="https://voiijer.com" target="_blank" rel="noopener noreferrer" class="inline-link">Voiijer</a>
        </span>
        <span class="timeline-dates">Nov 2021&ndash;Sep 2022</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Web3 Developer @
          <a href="https://klimadao.finance" target="_blank" rel="noopener noreferrer" class="inline-link">Klima DAO</a>
        </span>
        <span class="timeline-dates">Oct 2021&ndash;Oct 2022</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Web3 Intern @
          <a href="https://trustednode.io" target="_blank" rel="noopener noreferrer" class="inline-link">Trusted Node</a>
        </span>
        <span class="timeline-dates">Nov 2021</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Software Developer @
          <a href="https://whub.io" target="_blank" rel="noopener noreferrer" class="inline-link">WHub</a>
        </span>
        <span class="timeline-dates">Jul&ndash;Sep 2021</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Video Editor @
          <a href="https://www.motherschoice.org" target="_blank" rel="noopener noreferrer" class="inline-link">Mother's Choice</a>
        </span>
        <span class="timeline-dates">Mar&ndash;Sep 2021</span>
      </div>
      <div class="timeline-row">
        <span class="timeline-place">
          Reporter @
          <a href="https://www.scmp.com" target="_blank" rel="noopener noreferrer" class="inline-link">South China Morning Post</a>
        </span>
        <span class="timeline-dates">Jul&ndash;Dec 2020</span>
      </div>
    </div>
  </section>

  <!-- Languages -->
  <section class="section">
    <h2 class="section-label">Languages</h2>
    <div class="kv-grid">
      <div class="kv">English <span class="kv-note">native</span></div>
      <div class="kv">中文 Mandarin <span class="kv-note">fluent</span></div>
      <div class="kv">廣東話 Cantonese <span class="kv-note">fluent</span></div>
      <div class="kv">Français <span class="kv-note">semi</span></div>
      <div class="kv">Español <span class="kv-note">semi</span></div>
      <div class="kv">Deutsch <span class="kv-note">beginner</span></div>
      <div class="kv">Türkçe <span class="kv-note">beginner</span></div>
      <div class="kv">Italiano <span class="kv-note">beginner</span></div>
      <div class="kv">日本語 Japanese <span class="kv-note">beginner</span></div>
    </div>
  </section>

  <!-- Music -->
  <section class="section">
    <h2 class="section-label">Music</h2>
    <p class="prose-text">
      I play
      7 instruments: Electric Bass, Contrabass, Guitar, Ukulele, Piano,
      Harmonica and Drums. I also like to create music, both spontaneously with
      friends in jam sessions or by myself.
    </p>
  </section>

  <!-- Interests -->
  <section class="section">
    <h2 class="section-label">Interests</h2>
    <div class="two-col">
      <div>
        <h3 class="subsection">Sports</h3>
        <div class="list">
          <div class="list-row">Football</div>
          <div class="list-row">Rugby</div>
          <div class="list-row">Hiking</div>
          <div class="list-row">Sailing</div>
          <div class="list-row">Skiing</div>
        </div>
      </div>
      <div>
        <h3 class="subsection">Hobbies</h3>
        <div class="pill-list">
          <span class="pill">Socialising</span>
          <span class="pill">Reading</span>
          <span class="pill">Movies</span>
          <span class="pill">Music</span>
          <span class="pill">Philosophy</span>
          <span class="pill">Politics</span>
          <span class="pill">History</span>
          <span class="pill">Open Source</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Works: things I love -->
  <section class="section">
    <h2 class="section-label">Things I Love</h2>
    <p class="prose-text section-intro">
      A loose, occasionally-updated collection of media in random categories that I like. We are what we consume and that.
    </p>

    {#each data.works as category}
      <div class="works-group" data-service={category.service}>
        <div class="works-header">
          <h3 class="subsection">{category.label}</h3>
          <Icon
            icon={getSocialIcon(category.service)}
            class="works-service-icon"
            aria-hidden="true"
          />
        </div>
        <div class="works-grid">
          {#each category.items as item}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              class="work-card"
              aria-label="{item.title} (opens in new tab)"
            >
              <div class="work-cover-wrap">
                {#if item.cover}
                  <img
                    src={item.cover}
                    alt=""
                    class="work-cover"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                {:else}
                  <div class="work-cover work-cover--placeholder" aria-hidden="true">
                    <Icon
                      icon={getSocialIcon(category.service)}
                      class="work-placeholder-icon"
                    />
                  </div>
                {/if}
              </div>
              <span class="work-title">{item.title}</span>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </section>

  <!-- Social -->
  <section class="section">
    <h2 class="section-label">Elsewhere</h2>
    <div class="social-row">
      {#each socialLinks as link}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          aria-label="{link.name} (opens in new tab)"
        >
          <Icon
            icon={getSocialIcon(link.service)}
            class="social-icon"
            aria-hidden="true"
          />
          <span>{link.name}</span>
        </a>
      {/each}
    </div>
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
    display: flex;
    align-items: flex-start;
    gap: var(--space-xl);
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--border-primary);
    margin-bottom: var(--space-xl);
  }

  .photo-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-md);
  }

  .photo-btn:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 4px;
  }

  .photo {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-primary);
    display: block;
    transition: border-color var(--transition-fast);
  }

  .photo-btn:hover .photo {
    border-color: var(--accent-primary);
  }

  .easter-egg {
    position: absolute;
    bottom: -var(--space-md);
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--font-size-xs);
    color: var(--accent-primary);
    white-space: nowrap;
    bottom: -24px;
  }

  .hero-text {
    flex: 1;
  }

  .hero-text h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text-primary);
    font-family: var(--font-family-mono);
    margin: 0 0 var(--space-sm);
  }

  .hero-text p {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
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

  .subsection {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  /* Key-value grid */
  .kv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  .kv {
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }

  .kv-key {
    color: var(--accent-primary);
    font-weight: 600;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    display: block;
    margin-bottom: 2px;
  }

  .kv-note {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }

  .inline-link {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .inline-link:hover {
    color: var(--text-primary);
  }

  /* Timeline (where I've lived) */
  .timeline {
    display: flex;
    flex-direction: column;
  }

  .timeline-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-md);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
    font-size: var(--font-size-sm);
  }

  .timeline-row:last-child {
    border-bottom: none;
  }

  .timeline-place {
    color: var(--text-primary);
    font-weight: 500;
  }

  .timeline-dates {
    color: var(--text-secondary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    white-space: nowrap;
  }

  .timeline-footer {
    margin-top: var(--space-md);
  }

  /* Lists */
  .list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .list-row {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    padding: var(--space-xs) 0;
    border-bottom: 1px solid var(--border-primary);
  }

  .list-row:last-child {
    border-bottom: none;
  }

  .list-row a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .list-row a:hover {
    color: var(--text-primary);
  }

  /* Prose */
  .prose-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.7;
    margin: 0;
  }

  /* Two column */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  /* Pills */
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

  /* Works */
  .section-intro {
    margin-bottom: var(--space-lg);
  }

  .works-group {
    margin-bottom: var(--space-xl);
  }

  .works-group:last-child {
    margin-bottom: 0;
  }

  .works-header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-xs);
    border-bottom: 1px solid var(--border-primary);
  }

  .works-header .subsection {
    margin-bottom: 0;
  }

  :global(.works-service-icon) {
    width: 14px;
    height: 14px;
    color: var(--text-tertiary);
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-md);
  }

  .work-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    text-decoration: none;
    color: var(--text-secondary);
    transition: color var(--transition-fast), transform var(--transition-fast);
  }

  .work-card:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
  }

  .work-cover-wrap {
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    transition: border-color var(--transition-fast);
  }

  .work-card:hover .work-cover-wrap {
    border-color: var(--accent-primary);
  }

  .work-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .work-cover--placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
  }

  :global(.work-placeholder-icon) {
    width: 32px;
    height: 32px;
  }

  .work-title {
    font-size: var(--font-size-xs);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Square covers for services where the artwork is square */
  .works-group[data-service="spotify"] .work-cover-wrap,
  .works-group[data-service="youtube"] .work-cover-wrap {
    aspect-ratio: 1 / 1;
  }

  /* YouTube channel avatars are circular */
  .works-group[data-service="youtube"] .work-cover-wrap {
    border-radius: 50%;
  }

  /* Steam header art is a landscape banner (460x215) */
  .works-group[data-service="steam"] .work-cover-wrap {
    aspect-ratio: 460 / 215;
  }

  /* Social */
  .social-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    text-decoration: none;
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast), color var(--transition-fast);
  }

  .social-link:hover {
    border-color: var(--accent-primary);
    color: var(--text-primary);
  }

  :global(.social-icon) {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--text-secondary);
  }

  .social-link:hover :global(.social-icon) {
    color: var(--accent-primary);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .page {
      padding: var(--space-lg) var(--space-md);
    }

    .hero {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .photo {
      width: 120px;
      height: 120px;
    }

    .kv-grid {
      grid-template-columns: 1fr;
    }

    .two-col {
      grid-template-columns: 1fr;
    }

    .social-row {
      grid-template-columns: 1fr 1fr;
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
