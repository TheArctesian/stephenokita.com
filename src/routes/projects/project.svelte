<script lang="ts">
  import { slide, fade, scale } from "svelte/transition";
  import "../../app.css";
  import { onMount } from "svelte";

  type ProjectData = {
    name: string;
    description: string;
    link: string;
    tags: string[];
    date: string;
  };

  export let data: ProjectData[];
  export let name: string;
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

  function getEmbedUrl(url: string): string {
    try {
      const urlObj = new URL(url);

      // GitHub repository handling
      if (urlObj.hostname === "github.com") {
        // Option 1: Use htmlpreview.github.io for HTML files
        if (url.endsWith(".html")) {
          return `https://htmlpreview.github.io/?${url}`;
        }

        // Option 2: Use githubbox.com (CodeSandbox integration)
        return url.replace("github.com", "githubbox.com");

        // Option 3: Alternative - use StackBlitz
        // const parts = urlObj.pathname.split('/').filter(p => p);
        // if (parts.length >= 2) {
        //   const user = parts[0];
        //   const repo = parts[1];
        //   return `https://stackblitz.com/github/${user}/${repo}`;
        // }
      }

      // Return original URL for non-GitHub links
      return url;
    } catch (e) {
      // If URL parsing fails, return the original URL
      return url;
    }
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

  // Modal state
  let showModal = false;
  let selectedProject: ProjectData | null = null;

  function openModal(project: ProjectData) {
    selectedProject = project;
    showModal = true;
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  }

  function closeModal() {
    showModal = false;
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }

  // Close modal when Escape key is pressed
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && showModal) {
      closeModal();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div
  class="m-4 text-xl text-[var(--fg)] font-bold p-4 border text-center rounded-[0.2rem]"
  out:slide
  in:fade={{ delay: wait * 150, duration: 300 }}
>
  <h1 class="section-title">{name}</h1>
</div>

<div
  class="section-container"
  out:slide
  in:fade={{ delay: delay * 150, duration: 300 }}
>
  <div class="projects-grid">
    {#each sortedProjects as project, i}
      <div
        class="project-card"
        in:fade={{ delay: (delay + i) * 150, duration: 300 }}
        on:click={() => openModal(project)}
        on:keydown={(e) => e.key === "Enter" && openModal(project)}
        tabindex="0"
        role="button"
        aria-label="Open details for {project.name}"
      >
        <div class="card-header">
          <img
            src={getFaviconUrl(project.link)}
            alt="favicon"
            class="favicon"
          />
          <h2 class="project-title">{project.name}</h2>
        </div>
        <p class="project-description-preview">
          {project.description.substring(0, 100)}...
        </p>
        <div class="card-footer">
          <div class="tags-preview">
            {#each project.tags.slice(0, 4) as tag}
              <span class="tag">
                <img
                  src={getIconUrl(tag)}
                  class="icon-img"
                  alt={tag}
                  data-tag={tag}
                  on:error={handleIconError}
                />
              </span>
            {/each}
            {#if project.tags.length > 4}
              <span class="more-tags">+{project.tags.length - 4}</span>
            {/if}
          </div>
          <div class="date">{formatDate(project.date)}</div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Modal -->
{#if showModal && selectedProject}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation in:scale out:scale>
      <button
        class="close-button"
        on:click={closeModal}
        aria-label="Close details">×</button
      >

      <div class="modal-grid">
        <div class="modal-iframe custom-scrollbar">
          <iframe
            src={getEmbedUrl(selectedProject.link)}
            title={selectedProject.name}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          ></iframe>
        </div>

        <div class="modal-details custom-scrollbar">
          <div class="modal-header">
            <img
              src={getFaviconUrl(selectedProject.link)}
              alt="favicon"
              class="modal-favicon"
            />
            <h2 class="modal-title">{selectedProject.name}</h2>
          </div>
          <p class="modal-description">{selectedProject.description}</p>

          <div class="modal-metadata">
            <div class="modal-date">
              <span class="metadata-label">Date:</span>
              <span>{formatDate(selectedProject.date)}</span>
            </div>

            <div class="modal-tags-container">
              <span class="metadata-label">Technologies:</span>
              <div class="modal-tags">
                {#each selectedProject.tags as tag}
                  <span class="mtag">
                    <img
                      src={getIconUrl(tag)}
                      class="icon-img-modal"
                      alt={tag}
                      data-tag={tag}
                      on:error={handleIconError}
                    />
                    <span class="tag-name">{tag}</span>
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <a
            href={selectedProject.link}
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Favicon styling */
  .favicon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 3px;
    object-fit: contain;
  }

  .modal-favicon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 4px;
    object-fit: contain;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .modal-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  /* Icon styling */
  .icon-img {
    width: 16px;
    height: 16px;
    filter: invert(1);
    display: block;
  }

  .icon-img-modal {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .tag-name {
    margin-left: 4px;
  }

  .tag-text {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Custom scrollbar styling */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--fg) var(--bg);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--bg);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--fg);
    border-radius: 4px;
    border: 2px solid var(--bg);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--pink);
  }

  /* Rest of your styling */
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: x-large;
    font-weight: bold;
    margin: 1rem 1rem 0rem 1rem;
    color: black;
  }

  .section-container {
    margin: 1rem 1rem;
  }

  .projects-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .project-card {
    background-color: var(--fg);
    color: var(--bg);
    border-radius: 0.3rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    height: 200px; /* Fixed height for uniform size */
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    cursor: pointer;
    overflow: hidden;
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .project-card:focus {
    outline: 2px solid var(--pink);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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

  .tags-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    max-width: 70%;
  }

  .tag {
    background-color: var(--bg);
    color: var(--fg);
    padding: 0.3rem;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mtag {
    background-color: var(--fg);
    color: var(--bg);
    padding: 0.4rem 0.6rem;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  .more-tags {
    font-size: 0.7rem;
    opacity: 0.7;
    margin: auto;
  }

  .date {
    font-style: italic;
    opacity: 0.8;
    font-size: 0.85rem;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background-color: var(--bg);
    border-radius: 0.5rem;
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    color: var(--fg);
    cursor: pointer;
    z-index: 10;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .close-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    max-height: 90vh;
  }

  .modal-iframe {
    position: relative;
    height: 80vh;
    background-color: var(--fg);
    overflow: auto;
  }

  .modal-iframe iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .modal-details {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80vh;
  }

  .modal-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--fg);
  }

  .modal-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: var(--fg);
    flex-grow: 1;
  }

  .modal-metadata {
    margin-bottom: 2rem;
    color: var(--fg);
  }

  .metadata-label {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .modal-date {
    margin-bottom: 1rem;
  }

  .modal-tags-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: auto;
  }

  .modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-link {
    display: inline-block;
    background-color: var(--fg);
    color: var(--bg);
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    text-decoration: none;
    text-align: center;
    font-weight: 500;
    align-self: flex-start;
    transition: background-color 0.2s ease;
  }

  .project-link:hover {
    background-color: var(--pink);
    color: var(--bg);
  }

  @media (max-width: 900px) {
    .modal-grid {
      grid-template-columns: 1fr;
    }

    .modal-iframe {
      height: 40vh;
    }

    .modal-details {
      max-height: 50vh;
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media (max-width: 500px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .project-card {
      height: 180px;
    }
  }
</style>
