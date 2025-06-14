<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  inject({ mode: dev ? "development" : "production" });
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  injectSpeedInsights();

  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  // Function to get the active page display name
  function getActivePageName(pathname) {
    switch (pathname) {
      case "/":
        return "~/";
      case "/skills":
        return "~/skills";
      case "/person":
        return "~/person";
      case "/projects":
        return "~/projects";
      case "/blog":
        return "~/blog";
      case "/meta/you":
      case "/meta":
        return "~/meta";
      default:
        // Handle dynamic routes or unknown paths
        if (pathname.startsWith("/meta")) {
          return "~/meta";
        }
        return "~/";
    }
  }

  // Get the color class for the active page
  function getActivePageColor(pathname) {
    switch (pathname) {
      case "/":
        return "text-d-orange";
      case "/skills":
        return "text-d-pink";
      case "/person":
        return "text-d-purple";
      case "/projects":
        return "projects";
      case "/blog":
        return "text-d-red";
      case "/meta/you":
      case "/meta":
        return "text-d-green";
      default:
        if (pathname.startsWith("/meta")) {
          return "text-d-green";
        }
        return "text-d-orange";
    }
  }

  $: activePage = getActivePageName($page.url.pathname);
  $: activePageColor = getActivePageColor($page.url.pathname);
</script>

<div in:fade class="sub">
  <!-- Desktop Navigation -->
  <div class="nav-desktop flex items-center justify-center">
    <a href="/" class="text-d-orange">~/, </a>
    <a href="/skills" class="text-d-pink">&nbsp;/skills, </a>
    <a href="/person" class="text-d-purple">&nbsp;/person, </a>
    <a href="/projects" class="projects">&nbsp;/projects, </a>
    <a href="/blog" class="text-d-red">&nbsp;/blog, </a>
    <a href="/meta/you" class="text-d-green">&nbsp;/meta</a>
  </div>

  <!-- Mobile Navigation -->
  <div class="nav-mobile hidden gap-4 items-center">
    <button
      class="menu-toggle p-2 flex flex-col w-8 h-8 bg-transparent border-none cursor-pointer"
      on:click={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <!-- Hamburger Icon -->
      <div
        class={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
      ></div>
      <div
        class={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 my-1 ${mobileMenuOpen ? "opacity-0" : ""}`}
      ></div>
      <div
        class={`hamburger-line w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
      ></div>
    </button>
    <span class="{activePageColor} home-link">{activePage}</span>
  </div>

  <!-- Mobile Menu Dropdown -->
  {#if mobileMenuOpen}
    <div
      class="mobile-menu absolute top-full left-0 right-0 bg-[var(--fg)] rounded-sm mt-2 p-4 flex flex-col gap-3 shadow-lg z-10"
      transition:fade={{ duration: 200 }}
    >
      <a
        href="/"
        class="text-d-orange p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>~/</a
      >
      <a
        href="/skills"
        class="text-d-pink p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>/skills</a
      >
      <a
        href="/person"
        class="text-d-purple p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>/person</a
      >
      <a
        href="/projects"
        class="projects p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>/projects</a
      >
      <a
        href="/blog"
        class="text-d-red p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>/blog</a
      >
      <a
        href="/meta/you"
        class="text-d-green p-2 rounded-sm transition-colors duration-200 hover:bg-[var(--bg)] hover:tracking-wide"
        on:click={closeMobileMenu}>/meta</a
      >
    </div>
  {/if}
</div>

<slot />

<div class="wrapper w-full px-4 box-border" in:fade={{ delay: 500 }}>
  <div class="text bg-[var(--fg)] p-4 rounded-sm w-full">
    <h1 class="text-center">
      Email me at <span class="underline">sdokita@berkeley.edu</span>
    </h1>
    <h1 class="text-center">
      <h1>
        <div
          class="content flex justify-between items-center w-full gap-8 py-8"
        >
          <div class="element flex-1 flex justify-center items-center">
            <a
              href="https://www.linkedin.com/in/stephen-okita/"
              class="w-full flex justify-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png"
                alt="LinkedIn"
                class="w-full max-w-[5vw] transition-transform duration-200 hover:scale-110"
              />
            </a>
          </div>
          <div class="element flex-1 flex justify-center items-center">
            <a
              href="https://github.com/TheArctesian"
              class="w-full flex justify-center"
            >
              <img
                src="https://simpleicons.org/icons/github.svg"
                alt="GitHub"
                class="w-full max-w-[5vw] transition-transform duration-200 hover:scale-110"
              />
            </a>
          </div>
          <div class="element flex-1 flex justify-center items-center">
            <a
              href="https://www.instagram.com/stephen.okita/"
              class="w-full flex justify-center"
            >
              <img
                src="https://simpleicons.org/icons/instagram.svg"
                alt="Instagram"
                class="w-full max-w-[5vw] transition-transform duration-200 hover:scale-110"
              />
            </a>
          </div>
        </div>
        as well as the source code for this website&nbsp<a
          class="s text-lg italic text-[var(--comment)]"
          href="https://github.com/TheArctesian/danielokita.com"
        >
          here</a
        >
      </h1>
    </h1>
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--bg);
    font-family: "Fira Code", monospace;
  }

  .sub {
    margin: 1rem;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-weight: 500;
    position: relative;
  }

  /* Desktop Navigation */
  .nav-desktop {
    display: flex;
  }

  a {
    margin: auto;
    text-decoration: none;
    font-size: clamp(1rem, 2vw, 1.5rem);
    transition: all ease-in-out 400ms;
  }

  a:hover {
    letter-spacing: 0.2em;
  }

  .home-link {
    font-size: clamp(1.1rem, 2.5vw, 1.6rem) !important;
    font-weight: 500;
  }

  /* Tablet and smaller desktop breakpoint */
  @media (max-width: 900px) {
    .nav-desktop {
      display: none;
    }

    .nav-mobile {
      display: flex !important;
    }

    a {
      font-size: clamp(0.9rem, 3vw, 1.2rem);
    }

    .content {
      gap: 1.5rem !important;
      padding: 1.5rem 0 !important;
    }

    img {
      max-width: 12vw !important;
    }
  }

  /* Mobile breakpoint */
  @media (max-width: 500px) {
    .sub {
      margin: 0.5rem;
      padding: 0.75rem;
    }

    a {
      font-size: clamp(0.8rem, 3.5vw, 1rem);
    }

    a:hover {
      letter-spacing: 0.1em;
    }

    .content {
      gap: 1rem !important;
      padding: 1rem 0 !important;
    }

    .mobile-menu {
      margin-top: 0.25rem !important;
      padding: 0.75rem !important;
    }

    .mobile-menu a {
      padding: 0.4rem !important;
      font-size: clamp(0.9rem, 4vw, 1.1rem) !important;
    }

    img {
      max-width: 15vw !important;
    }
  }

  /* Very small screens */
  @media (max-width: 350px) {
    .content {
      flex-direction: column !important;
      gap: 1rem !important;
    }

    .element {
      width: 100% !important;
    }

    img {
      max-width: 20vw !important;
    }
  }
</style>
