<script lang="ts">
  import "../../app.css";
  import { fade, scale, slide, fly } from "svelte/transition";
  import { modernAnimations, STAGGER, getAnimation } from "$lib/utils/animations";
  import { getSocialIcon } from "$lib/utils/icons";
  import Icon from "@iconify/svelte";
  import me from "./imgs/me&kim.jpg";

  let showEasterEgg = false;

  function toggleEasterEgg() {
    showEasterEgg = !showEasterEgg;
  }

  function handleImageKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEasterEgg();
    }
  }

  // Social links with YouTube channels
  const socialLinks = [
    {
      name: "YouTube (General)",
      service: "youtube",
      url: "https://www.youtube.com/@stephenokita",
      color: "hover:border-red-600"
    },
    {
      name: "YouTube (Music)",
      service: "youtube",
      url: "https://www.youtube.com/@StephenOkitasMusicalMusings",
      color: "hover:border-red-600"
    },
    {
      name: "YouTube (Videos)",
      service: "youtube",
      url: "https://www.youtube.com/@StephenOkitasVideos",
      color: "hover:border-red-600"
    },
    {
      name: "Spotify",
      service: "spotify",
      url: "https://open.spotify.com/user/b3oj8mjbyq5cfs26vp6c41ujr",
      color: "hover:border-green-500"
    },
    {
      name: "Goodreads",
      service: "goodreads",
      url: "https://www.goodreads.com/user/show/155512706-stephen-okita",
      color: "hover:border-yellow-700"
    },
    {
      name: "Letterboxd",
      service: "letterboxd",
      url: "https://letterboxd.com/danielOkita/",
      color: "hover:border-orange-500"
    },
  ];
</script>

<svelte:head>
  <title>Person - Stephen Okita</title>
  <meta name="description" content="The personal side of Stephen Okita - musician, philosopher, developer, and professional overthinker." />
</svelte:head>

<div out:slide>
  <!-- Simple intro -->
  <div class="intro-section" in:fly={getAnimation(modernAnimations.slideUp(0))}>
    <h1 class="intro-title">About Me</h1>
    <p class="intro-text">
      This is the more personal side of the website - the human behind the code.
    </p>
  </div>

  <!-- Main Bio Section -->
  <div class="bio-container" in:fly={getAnimation(modernAnimations.slideUp(STAGGER.normal))}>
    <div class="bio-image-wrapper">
      <button
        class="bio-image-button"
        on:click={toggleEasterEgg}
        on:keydown={handleImageKeydown}
        aria-label="Photo of Stephen with Kim. Click to reveal a surprise!"
        aria-pressed={showEasterEgg}
      >
        <img
          src={me}
          alt=""
          class="bio-image"
          aria-hidden="true"
        />
      </button>
      {#if showEasterEgg}
        <p class="easter-egg" role="status" aria-live="polite" in:scale={getAnimation(modernAnimations.celebration(0))}>
          You found the easter egg! 🥚
        </p>
      {/if}
    </div>

    <div class="bio-intro">
      <p class="intro-description">
        This side of the website is an insight to who I am as a person, not a laborer.
        I'm interested in lots of things and try to learn as much as I can.
      </p>
    </div>

    <!-- Simplified single-column layout for better balance -->
    <div class="bio-info">
      <!-- Basic Info -->
      <div class="info-section">
        <h3 class="section-header">Background</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Born:</span> London, UK
          </div>
          <div class="info-item">
            <span class="label">Raised:</span> Hong Kong
          </div>
          <div class="info-item">
            <span class="label">Currently:</span> Berkeley, CA
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="info-section">
        <h3 class="section-header">Education</h3>
        <div class="info-grid">
          <div class="info-item">Chinese International School (IB)</div>
          <div class="info-item">UC Berkeley - CS & Philosophy</div>
        </div>
      </div>

      <!-- Current Work -->
      <div class="info-section">
        <h3 class="section-header">What I Do</h3>
        <div class="work-list">
          <div class="work-item">Co-founder @ <a href="https://www.auracarehealth.com/" class="link">Aura Care Health</a></div>
          <div class="work-item">Co-founder @ <a href="https://www.techjusticelab.org/" class="link">Tech & Justice Lab</a></div>
          <div class="work-item">Student Researcher @ UC Berkeley</div>
          <div class="work-item">Writer @ <a href="/blog" class="link">This Blog</a></div>
        </div>
      </div>

      <!-- Languages -->
      <div class="info-section">
        <h3 class="section-header">Languages</h3>
        <div class="info-grid">
          <div class="info-item">English (Native)</div>
          <div class="info-item">中文 Mandarin (Fluent)</div>
          <div class="info-item">廣東話 Cantonese (Fluent)</div>
          <div class="info-item">Français (Semi-conversational)</div>
          <div class="info-item">Español (Semi-conversational)</div>
        </div>
      </div>

      <!-- Personality Traits -->
      <div class="info-section">
        <h3 class="section-header">Personality Traits</h3>
        <div class="info-grid">
          <div class="info-item">Curious</div>
          <div class="info-item">Passionate</div>
          <div class="info-item">Organised</div>
          <div class="info-item">Engaging</div>
          <div class="info-item">Resourceful</div>
        </div>
      </div>

      <!-- Sports & Outdoors -->
      <div class="info-section">
        <h3 class="section-header">Interests (Sports)</h3>
        <div class="info-grid">
          <div class="info-item">Football (Soccer), Arsenal</div>
          <div class="info-item">Rugby (Ireland & Munster)</div>
          <div class="info-item">Whatever sport Berkeley is contending in</div>
          <div class="info-item">Hiking</div>
        </div>
      </div>

      <!-- Hobbies/Interests -->
      <div class="info-section">
        <h3 class="section-header">Hobbies/Interests</h3>
        <div class="interest-tags">
          <span class="tag">Socialising</span>
          <span class="tag">Reading</span>
          <span class="tag">Movies</span>
          <span class="tag">Music</span>
          <span class="tag">Philosophy</span>
          <span class="tag">Politics</span>
          <span class="tag">Economics</span>
          <span class="tag">History</span>
          <span class="tag">Open Source</span>
          <span class="tag">Really anything</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Simple interests section -->
  <div class="simple-section" in:fly={getAnimation(modernAnimations.slideUp(STAGGER.wide))}>
    <div class="simple-content">
      <p>
        I think of music like Plato as practicing the harmony of the soul. I play
        7 instruments: Electric Bass, Contrabass, Guitar, Ukulele, Piano, Harmonica and Drums.
        I also like to create music, both spontaneously with friends in jam sessions or by myself.
      </p>
      <p>
        I enjoy reading books and watching videos. I have a
        <a href="https://letterboxd.com/danielOkita/" class="link">Letterboxd</a> account where I keep track
        of movies and a Goodreads account for books.
      </p>
    </div>
  </div>

  <!-- Social Links Section with YouTube -->
  <section class="social-section" aria-labelledby="social-links-heading" in:fly={getAnimation(modernAnimations.slideUp(STAGGER.dramatic))}>
    <h2 id="social-links-heading" class="section-title">Social Links</h2>
    <div class="social-grid">
      {#each socialLinks as link}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-card"
          aria-label="{link.name} (opens in new tab)"
        >
          <Icon icon={getSocialIcon(link.service)} class="social-icon" aria-hidden="true" />
          <span class="social-name">{link.name}</span>
        </a>
      {/each}
    </div>
  </section>




</div>

<style>
  /* Simple intro section */
  .intro-section {
    @apply text-center py-8 px-4;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-primary);
  }

  .intro-title {
    @apply text-3xl font-bold mb-4;
    color: var(--text-primary);
  }

  .intro-text {
    @apply text-lg;
    color: var(--text-secondary);
  }

  /* Bio Section */
  .bio-container {
    @apply max-w-4xl mx-auto p-6 space-y-8;
  }

  .bio-image-wrapper {
    @apply flex justify-center mb-8;
    position: relative;
  }

  .bio-image-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .bio-image-button:hover .bio-image {
    border-color: var(--accent-primary);
    transform: scale(1.02);
  }

  .bio-image-button:focus {
    outline: 3px solid var(--accent-primary);
    outline-offset: 4px;
    border-radius: 0.5rem;
  }

  .bio-image-button:focus .bio-image {
    border-color: var(--accent-primary);
  }

  .bio-image {
    @apply w-64 h-64 object-cover rounded-lg shadow-lg;
    border: 2px solid var(--border-primary);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }

  .easter-egg {
    @apply absolute bottom-4 left-1/2 transform -translate-x-1/2;
    @apply bg-bg-tertiary text-text-primary px-4 py-2 rounded-full text-sm;
    border: 1px solid var(--accent-primary);
  }

  .bio-intro {
    @apply mb-8 text-center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    @apply p-md rounded-lg;
  }

  .intro-description {
    @apply text-base leading-relaxed;
    color: var(--text-secondary);
  }

  /* Simple section */
  .simple-section {
    @apply py-8 px-6 max-w-4xl mx-auto;
  }

  .simple-content {
    @apply space-y-4;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    @apply p-md rounded-lg;
  }

  .simple-content p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* New balanced bio layout */
  .bio-info {
    @apply space-y-8;
  }

  .info-section {
    @apply p-md rounded-lg;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
  }

  .section-header {
    @apply text-lg font-semibold mb-4 pb-3;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-secondary);
  }

  .info-grid {
    @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3;
  }

  .info-item {
    @apply py-2;
    color: var(--text-secondary);
  }

  .work-list {
    @apply space-y-3;
  }

  .work-item {
    @apply py-2;
    color: var(--text-secondary);
  }

  .label {
    @apply font-semibold;
    color: var(--text-primary);
  }

  .link {
    color: var(--accent-primary);
    text-decoration: underline;
    transition: color 0.2s;
  }

  .link:hover {
    color: var(--accent-cyan);
  }

  .interest-tags {
    @apply flex flex-wrap gap-2;
  }

  .tag {
    @apply px-3 py-1 rounded-full text-sm;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-secondary);
    transition: all 0.2s;
  }

  .tag:hover {
    border-color: var(--accent-primary);
    transform: scale(1.05) rotate(-1deg);
    background: var(--accent-primary);
    color: var(--bg-primary);
    transition: all 150ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  /* Instruments Section */
  .instruments-section {
    @apply py-12 px-4 max-w-6xl mx-auto;
  }

  .section-title {
    @apply text-3xl font-bold text-center mb-8;
    color: var(--text-primary);
  }

  .instruments-grid {
    @apply grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4;
  }

  .instrument-card {
    @apply p-4 text-center rounded-lg;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    transition: all 0.3s;
    cursor: default;
  }

  .instrument-card:hover {
    transform: rotate(-2deg) scale(1.05);
    border-color: var(--accent-primary);
    background: var(--bg-tertiary);
  }

  /* Social Section */
  .social-section {
    @apply py-8 px-6 max-w-4xl mx-auto;
  }

  .social-grid {
    @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6;
  }

  .social-card {
    @apply flex flex-col items-center justify-center p-md rounded-lg;
    background: var(--bg-secondary);
    border: 2px solid var(--border-primary);
    transition: all 0.3s;
    text-decoration: none;
  }

  .social-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    transition: all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .social-card:focus {
    outline: 3px solid var(--accent-primary);
    outline-offset: 2px;
    transform: translateY(-4px) scale(1.02);
  }

  .social-icon {
    @apply w-12 h-12 mb-3;
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%)
            hue-rotate(343deg) brightness(94%) contrast(90%);
    transition: all 0.3s;
  }

  .social-card:hover .social-icon {
    transform: scale(1.2) rotate(5deg);
    transition: all 150ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .social-name {
    @apply text-sm font-medium text-center;
    color: var(--text-secondary);
  }



  /* Responsive adjustments */
  @media (max-width: 768px) {
    .bio-container {
      @apply p-4;
    }

    .bio-image {
      @apply w-48 h-48;
    }

    .bio-image-button {
      border-radius: 0.5rem;
    }

    .info-grid {
      @apply grid-cols-1;
    }

    .section-header {
      @apply text-base;
    }

    .info-section {
      @apply p-md;
    }

    .intro-section {
      @apply py-6 px-4;
    }

    .intro-title {
      @apply text-2xl;
    }

    .social-grid {
      @apply grid-cols-2;
    }
  }

  @media (max-width: 480px) {
    .bio-image {
      @apply w-40 h-40;
    }

    .bio-image-button {
      border-radius: 0.5rem;
    }

    .intro-section {
      @apply py-4 px-3;
    }

    .bio-container {
      @apply p-3;
    }
  }
</style>