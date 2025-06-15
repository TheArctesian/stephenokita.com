<script lang="ts">
  import { slide, fade, scale } from "svelte/transition";
  import "../../app.css";
  import { onMount } from "svelte";

  type PublishedData = {
    name: string;
    description: string;
    link: string;
    date: string;
  };

  export let data: PublishedData[];
  export let delay;
  export let wait;
  // Sort projects by date (newest first)
  $: sortedProjects = [...data].sort(
    (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  // Function to extract domain from URL for favicon service
  function getFaviconUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      // Using DuckDuckGo's favicon service (more reliable than Google's)
      return `https://external-content.duckduckgo.com/ip3/${domain}.ico`;
    } catch (e) {
      // Fallback to a generic icon if URL parsing fails
      return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23ddd"/><text x="50" y="50" font-family="Arial" font-size="50" text-anchor="middle" dominant-baseline="middle" fill="%23555">?</text></svg>';
    }
  }

  // Function to handle SimpleIcons properly
  function getIconUrl(tag: string): string {
    // Convert tag to lowercase and handle special cases
    const normalizedTag = tag
      .toLowerCase()
      .replace(/\s+/g, "") // Remove spaces
      .replace(/\./g, "dot") // Replace dots with 'dot'
      .replace(/\+/g, "plus"); // Replace + with 'plus'

    return `https://simpleicons.org/icons/${normalizedTag}.svg`;
  }

  // Function to check if an icon exists
  function handleIconError(event: Event) {
    const target = event.target as HTMLImageElement;
    // Replace with text fallback if icon fails to load
    const tag = target.getAttribute("data-tag") || "";
    target.outerHTML = `<span class="tag-text">${tag}</span>`;
  }
</script>

<div
  class="m-4 text-xl text-[var(--fg)] font-bold p-4 border text-center rounded-[0.2rem]"
  in:fade={{ delay: wait * 150, duration: 300 }}
>
  <h1 class="section-title">Published Work</h1>
</div>

<div
  class="m-4 gap-4 flex"
  out:slide
  in:fade={{ delay: delay * 150, duration: 300 }}
>
  {#each sortedProjects as project, i}
    <div
      class="hov p-4 rounded-[0.2rem] bg-[var(--bg)] text-[var(--fg)] border flex flex-col gap-2"
    >
      <div class="flex">
        <img src={getFaviconUrl(project.link)} alt="favicon" class="favicon" />
        <h2 class=" project-title">{project.name}</h2>
      </div>
      <p class=" project-description-preview">
        {project.description}
      </p>
      <div class="card-footer">
        <div class="date">{formatDate(project.date)}</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .hov {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  /* Favicon styling */
  .hov:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .favicon {
    width: 1.5rem;
    margin-right: 8px;
    border-radius: 3px;
    object-fit: contain;
  }

  .project-title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .project-description-preview {
    flex-grow: 1;
    font-size: small;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.5;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .date {
    font-style: italic;
    opacity: 0.8;
    font-size: 0.85rem;
  }
</style>
