<script lang="ts">
  /**
   * Responsive grid of skill cards. Renders either the search-results
   * region (with per-item category labels, no transition) or a category
   * tabpanel (with a fade-in keyed on the active category).
   */
  import { fade } from "svelte/transition";
  import SkillCard from "./skill_card.svelte";

  type Skill = { text: string; img: string; _category?: string };

  export let skills: Skill[];
  /** Render as a search-results region (vs. a category tabpanel). */
  export let results = false;
  export let ariaLabel = "";
</script>

{#if results}
  <div
    class="skills-grid grid gap-sm"
    role="region"
    aria-label={ariaLabel}
    aria-live="polite"
  >
    {#each skills as skill (skill._category + skill.text)}
      <SkillCard
        text={skill.text}
        img={skill.img}
        category={skill._category ?? null}
      />
    {/each}
  </div>
{:else}
  <div class="skills-grid grid gap-sm" role="tabpanel" aria-label={ariaLabel}>
    {#key ariaLabel}
      {#each skills as skill}
        <div in:fade={{ duration: 200 }}>
          <SkillCard text={skill.text} img={skill.img} />
        </div>
      {/each}
    {/key}
  </div>
{/if}

<style>
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }

  @media (max-width: 640px) {
    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    }
  }
</style>
