<script lang="ts">
  import "../../app.css";
  import { t } from "$lib/i18n";
  import Section from "$lib/components/shared/section.svelte";
  import PillList from "$lib/components/shared/pill_list.svelte";
  import HeroPhoto from "./hero_photo.svelte";
  import Timeline from "./timeline.svelte";
  import RolesList from "./roles_list.svelte";
  import WorksGrid from "./works_grid.svelte";
  import SocialRow from "./social_row.svelte";
  // Optimized hero source (29 KB webp vs the original 468 KB jpg).
  import me from "./imgs/me&kim-360.webp";
  import type { PageData } from "./$types";
  import type { TimelineRow } from "./timeline.svelte";

  export let data: PageData;

  const livedTimeline: TimelineRow[] = [
    { place: "London, UK", dates: "2004&ndash;2007 · 2026&ndash;" },
    { place: "Hong Kong", dates: "2007&ndash;2019 · 2020&ndash;2023" },
    { place: "Hangzhou, China", dates: "2019&ndash;2020" },
    { place: "Berkeley, California", dates: "2023&ndash;" },
  ];

  const link = (label: string, href: string) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="inline-link">${label}</a>`;

  $: education = [
    `Chinese International School ${$t("person.edu.ibFlag")}`,
    `UC Berkeley -- ${$t("person.edu.ucbSubject")}`,
  ];

  $: whatIDo = [
    `${$t("person.role.ctoCoFounder")} @ <a href="https://www.auracarehealth.com/" target="_blank" rel="noopener noreferrer">Aura Care Health</a>`,
    `${$t("person.role.writer")} @ <a href="/blog">${$t("person.thisBlog")}</a>`,
  ];

  $: workTimeline = [
    { place: `${$t("person.role.ctoCoFounder")} @ ${link("Auracare", "https://auracare.org.uk")}`, dates: "Jun 2024&ndash;" },
    { place: `${$t("person.role.member")} @ ${link("Asia Society", "https://asiasociety.org")}`, dates: "Jun 2024&ndash;" },
    { place: `${$t("person.role.ctoCoFounder")} @ ${link("Berkeley Tech &amp; Justice Lab", "https://techjusticelab.org")}`, dates: "Feb 2025&ndash;Jan 2026" },
    { place: `${$t("person.role.fullStackDeveloper")} @ ${link("Launchedtech", "https://launchedtech.io")}`, dates: "Jun 2024&ndash;Feb 2025" },
    { place: `${$t("person.role.studentResearcherTeacher")} @ UC Berkeley`, dates: "Jan 2024&ndash;Jan 2026" },
    { place: `${$t("person.role.fullStackDeveloper")} @ ${link("Link Health", "https://link-health.org")}`, dates: "Sep 2023&ndash;Jan 2024" },
    { place: `${$t("person.role.blockchainDeveloper")} @ ${link("Voiijer", "https://voiijer.com")}`, dates: "Nov 2021&ndash;Sep 2022" },
    { place: `${$t("person.role.web3Developer")} @ ${link("Klima DAO", "https://klimadao.finance")}`, dates: "Oct 2021&ndash;Oct 2022" },
    { place: `${$t("person.role.web3Intern")} @ ${link("Trusted Node", "https://trustednode.io")}`, dates: "Nov 2021" },
    { place: `${$t("person.role.softwareDeveloper")} @ ${link("WHub", "https://whub.io")}`, dates: "Jul&ndash;Sep 2021" },
    { place: `${$t("person.role.videoEditor")} @ ${link("Mother's Choice", "https://www.motherschoice.org")}`, dates: "Mar&ndash;Sep 2021" },
    { place: `${$t("person.role.reporter")} @ ${link("South China Morning Post", "https://www.scmp.com")}`, dates: "Jul&ndash;Dec 2020" },
  ];

  $: languages = [
    { name: "English", note: $t("person.prof.native") },
    { name: "中文 Mandarin", note: $t("person.prof.fluent") },
    { name: "廣東話 Cantonese", note: $t("person.prof.fluent") },
    { name: "Français", note: $t("person.prof.semi") },
    { name: "Español", note: $t("person.prof.semi") },
    { name: "Deutsch", note: $t("person.prof.beginner") },
    { name: "Türkçe", note: $t("person.prof.beginner") },
    { name: "Italiano", note: $t("person.prof.beginner") },
    { name: "日本語 Japanese", note: $t("person.prof.beginner") },
  ];

  $: sports = [
    $t("person.sport.football"),
    $t("person.sport.rugby"),
    $t("person.sport.hiking"),
    $t("person.sport.sailing"),
    $t("person.sport.skiing"),
  ];

  $: hobbies = [
    $t("person.hobby.socialising"),
    $t("person.hobby.reading"),
    $t("person.hobby.movies"),
    $t("person.hobby.music"),
    $t("person.hobby.philosophy"),
    $t("person.hobby.politics"),
    $t("person.hobby.history"),
    $t("person.hobby.openSource"),
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
    title={$t("person.aboutTitle")}
    subtitle={$t("person.aboutSubtitle")}
  />

  <Section label={$t("person.section.background")}>
    <Timeline rows={livedTimeline} />
    <p class="prose-text timeline-footer">
      {$t("person.otherPlaces")} <a
        href="https://world.stephenokita.com"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-link">world.stephenokita.com</a
      >
    </p>
  </Section>

  <Section label={$t("person.section.education")}>
    <RolesList items={education} />
  </Section>

  <Section label={$t("person.section.whatIDo")}>
    <RolesList items={whatIDo} />
  </Section>

  <Section label={$t("person.section.whereIveWorked")}>
    <Timeline rows={workTimeline} />
  </Section>

  <Section label={$t("person.section.languages")}>
    <div class="kv-grid">
      {#each languages as lang}
        <div class="kv">{lang.name} <span class="kv-note">{lang.note}</span></div>
      {/each}
    </div>
  </Section>

  <Section label={$t("person.section.music")}>
    <p class="prose-text">
      {$t("person.musicIntro")}
    </p>
  </Section>

  <Section label={$t("person.section.interests")}>
    <div class="two-col">
      <div>
        <h3 class="subsection">{$t("person.section.sports")}</h3>
        <RolesList items={sports} />
      </div>
      <div>
        <h3 class="subsection">{$t("person.section.hobbies")}</h3>
        <PillList items={hobbies} />
      </div>
    </div>
  </Section>

  <Section label={$t("person.section.thingsILove")}>
    <p class="prose-text section-intro">
      {$t("person.thingsILoveIntro")}
    </p>

    {#each data.works as category}
      <WorksGrid {category} />
    {/each}
  </Section>

  <Section label={$t("person.section.elsewhere")}>
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
