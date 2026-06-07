<script lang="ts">
  import "../../app.css";
  import Section from "$lib/components/shared/section.svelte";
  import PillList from "$lib/components/shared/pill_list.svelte";
  import HeroPhoto from "./hero_photo.svelte";
  import Timeline from "./timeline.svelte";
  import RolesList from "./roles_list.svelte";
  import WorksGrid from "./works_grid.svelte";
  import SocialRow from "./social_row.svelte";
  import me from "./imgs/me&kim.jpg";
  import type { PageData } from "./$types";
  import type { TimelineRow } from "./timeline.svelte";

  export let data: PageData;

  const livedTimeline: TimelineRow[] = [
    { place: "London, UK", dates: "2004&ndash;2007 · 2026&ndash;" },
    { place: "Hong Kong", dates: "2007&ndash;2019 · 2020&ndash;2023" },
    { place: "Hangzhou, China", dates: "2019&ndash;2020" },
    { place: "Berkeley, California", dates: "2023&ndash;" },
  ];

  const education = [
    "Chinese International School (IB)",
    "UC Berkeley -- CS & Philosophy",
  ];

  const whatIDo = [
    'CTO &amp; Co-Founder @ <a href="https://www.auracarehealth.com/" target="_blank" rel="noopener noreferrer">Aura Care Health</a>',
    'Writer @ <a href="/blog">This Blog</a>',
  ];

  const link = (label: string, href: string) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-link">${label}</a>`;

  const workTimeline: TimelineRow[] = [
    { place: `CTO &amp; Co-Founder @ ${link("Auracare", "https://auracare.org.uk")}`, dates: "Jun 2024&ndash;" },
    { place: `Member @ ${link("Asia Society", "https://asiasociety.org")}`, dates: "Jun 2024&ndash;" },
    { place: `CTO &amp; Co-Founder @ ${link("Berkeley Tech &amp; Justice Lab", "https://techjusticelab.org")}`, dates: "Feb 2025&ndash;Jan 2026" },
    { place: `Full Stack Developer @ ${link("Launchedtech", "https://launchedtech.io")}`, dates: "Jun 2024&ndash;Feb 2025" },
    { place: "Student Researcher &amp; Teacher @ UC Berkeley", dates: "Jan 2024&ndash;Jan 2026" },
    { place: `Full Stack Developer @ ${link("Link Health", "https://link-health.org")}`, dates: "Sep 2023&ndash;Jan 2024" },
    { place: `Blockchain Developer @ ${link("Voiijer", "https://voiijer.com")}`, dates: "Nov 2021&ndash;Sep 2022" },
    { place: `Web3 Developer @ ${link("Klima DAO", "https://klimadao.finance")}`, dates: "Oct 2021&ndash;Oct 2022" },
    { place: `Web3 Intern @ ${link("Trusted Node", "https://trustednode.io")}`, dates: "Nov 2021" },
    { place: `Software Developer @ ${link("WHub", "https://whub.io")}`, dates: "Jul&ndash;Sep 2021" },
    { place: `Video Editor @ ${link("Mother's Choice", "https://www.motherschoice.org")}`, dates: "Mar&ndash;Sep 2021" },
    { place: `Reporter @ ${link("South China Morning Post", "https://www.scmp.com")}`, dates: "Jul&ndash;Dec 2020" },
  ];

  const languages = [
    { name: "English", note: "native" },
    { name: "中文 Mandarin", note: "fluent" },
    { name: "廣東話 Cantonese", note: "fluent" },
    { name: "Français", note: "semi" },
    { name: "Español", note: "semi" },
    { name: "Deutsch", note: "beginner" },
    { name: "Türkçe", note: "beginner" },
    { name: "Italiano", note: "beginner" },
    { name: "日本語 Japanese", note: "beginner" },
  ];

  const sports = ["Football", "Rugby", "Hiking", "Sailing", "Skiing"];

  const hobbies = [
    "Socialising",
    "Reading",
    "Movies",
    "Music",
    "Philosophy",
    "Politics",
    "History",
    "Open Source",
  ];

  const socialLinks = [
    { name: "YouTube (General)", service: "youtube", url: "https://www.youtube.com/@stephenokita" },
    { name: "YouTube (Music)", service: "youtube", url: "https://www.youtube.com/@StephenOkitasMusicalMusings" },
    { name: "YouTube (Videos)", service: "youtube", url: "https://www.youtube.com/@StephenOkitasVideos" },
    { name: "Spotify", service: "spotify", url: "https://open.spotify.com/user/b3oj8mjbyq5cfs26vp6c41ujr" },
    { name: "Goodreads", service: "goodreads", url: "https://www.goodreads.com/user/show/155512706-stephen-okita" },
    { name: "Letterboxd", service: "letterboxd", url: "https://letterboxd.com/danielOkita/" },
  ];
</script>

<svelte:head>
  <title>Person - Stephen Okita</title>
  <meta
    name="description"
    content="The personal side of Stephen Okita - musician, philosopher, developer."
  />
</svelte:head>

<div class="page-shell">
  <HeroPhoto
    src={me}
    title="About Me"
    subtitle="This is meant to be a bit more personal but has turned into more demographic."
  />

  <Section label="Background">
    <Timeline rows={livedTimeline} />
    <p class="prose-text timeline-footer">
      Other places I've been: <a
        href="https://world.stephenokita.com"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-link">world.stephenokita.com</a
      >
    </p>
  </Section>

  <Section label="Education">
    <RolesList items={education} />
  </Section>

  <Section label="What I Do">
    <RolesList items={whatIDo} />
  </Section>

  <Section label="Where I've Worked">
    <Timeline rows={workTimeline} />
  </Section>

  <Section label="Languages">
    <div class="kv-grid">
      {#each languages as lang}
        <div class="kv">{lang.name} <span class="kv-note">{lang.note}</span></div>
      {/each}
    </div>
  </Section>

  <Section label="Music">
    <p class="prose-text">
      I play 7 instruments: Electric Bass, Contrabass, Guitar, Ukulele, Piano,
      Harmonica and Drums. I also like to create music, both spontaneously with
      friends in jam sessions or by myself.
    </p>
  </Section>

  <Section label="Interests">
    <div class="two-col">
      <div>
        <h3 class="subsection">Sports</h3>
        <RolesList items={sports} />
      </div>
      <div>
        <h3 class="subsection">Hobbies</h3>
        <PillList items={hobbies} />
      </div>
    </div>
  </Section>

  <Section label="Things I Love">
    <p class="prose-text section-intro">
      A loose, occasionally-updated collection of media in random categories that
      I like. We are what we consume and that. Recomendations are very welcome
      send me an email at me@stephenokita.com.
    </p>

    {#each data.works as category}
      <WorksGrid {category} />
    {/each}
  </Section>

  <Section label="Elsewhere">
    <SocialRow links={socialLinks} />
  </Section>
</div>

<style>
  .subsection {
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  .inline-link {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .inline-link:hover {
    color: var(--text-primary);
  }

  /* Languages key-value grid (flat, inline note — distinct from the
     shared stacked kv-grid, so kept scoped to preserve the look). */
  .kv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-sm);
  }

  .kv {
    font-size: var(--font-size-sm);
    color: var(--text-primary);
  }

  .kv-note {
    color: var(--text-secondary);
    font-size: var(--font-size-xs);
  }

  .timeline-footer {
    margin-top: var(--space-md);
  }

  .prose-text {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.7;
    margin: 0;
  }

  .section-intro {
    margin-bottom: var(--space-lg);
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  @media (max-width: 640px) {
    .kv-grid {
      grid-template-columns: 1fr;
    }

    .two-col {
      grid-template-columns: 1fr;
    }
  }
</style>
