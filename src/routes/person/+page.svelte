<script lang="ts">
  import "../../app.css";
  import { getSocialIcon } from "$lib/utils/icons";
  import Icon from "@iconify/svelte";
  import me from "./imgs/me&kim.jpg";

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
    <div class="kv-grid">
      <div class="kv"><span class="kv-key">Born</span> London, UK</div>
      <div class="kv"><span class="kv-key">Raised</span> Hong Kong</div>
      <div class="kv"><span class="kv-key">Currently</span> Berkeley, CA & London, UK</div>
      <div class="kv"><span class="kv-key">Other places I have been</span> <a href="https://world.stephenokita.com" target="_blank" rel="noopener noreferrer" class="inline-link">world.stephenokita.com</a></div>
    </div>
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
        Co-founder @
        <a
          href="https://www.auracarehealth.com/"
          target="_blank"
          rel="noopener noreferrer">Aura Care Health</a
        >
      </div>
      <div class="list-row">Student Researcher @ UC Berkeley</div>
      <div class="list-row">
        Writer @ <a href="/blog">This Blog</a>
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
