<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import ThemeToggle from "./ThemeToggle.svelte";

  let mobileMenuOpen = false;

  const routes = [
    { path: "/", label: "~/", color: "text-status-warning" },
    { path: "/skills", label: "/skills", color: "text-status-purple" },
    { path: "/person", label: "/person", color: "text-accent-primary" },
    { path: "/projects", label: "/projects", color: "text-status-info" },
    { path: "/blog", label: "/blog", color: "text-status-error" },
    { path: "/meta", label: "/meta", color: "text-status-success" },
  ];

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function getActiveRoute(pathname: string) {
    if (pathname.startsWith("/meta"))
      return routes.find((r) => r.path === "/meta/you");
    return routes.find((r) => r.path === pathname) || routes[0];
  }

  $: activeRoute = getActiveRoute($page.url.pathname);
</script>

<nav
  class="nord-surface p-md m-md transition-all duration-normal"
  transition:fade
>
  <!-- Desktop Navigation -->
  <div class="nav-desktop flex items-center justify-between">
    <div class="flex items-center justify-center flex-1">
      {#each routes as route, i}
        <a href={route.path} class="{route.color} hover:tracking-wide">
          {route.label}{i < routes.length - 1 ? ", " : ""}
        </a>
      {/each}
    </div>
    <ThemeToggle />
  </div>

  <!-- Mobile Navigation -->
  <div class="nav-mobile flex gap-4 items-center justify-between">
    <div class="flex gap-4 items-center">
      <button
        class="menu-toggle p-sm flex flex-col w-8 h-8 bg-transparent border-none cursor-pointer text-text-primary hover:text-accent-primary transition-all duration-fast"
        on:click={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <div
          class="hamburger-line w-full h-0.5 bg-current transition-slow {mobileMenuOpen
            ? 'rotate-45 translate-y-1.5'
            : ''}"
        ></div>
        <div
          class="hamburger-line w-full h-0.5 bg-current transition-slow my-1 {mobileMenuOpen
            ? 'opacity-0'
            : ''}"
        ></div>
        <div
          class="hamburger-line w-full h-0.5 bg-current transition-slow {mobileMenuOpen
            ? '-rotate-45 -translate-y-1.5'
            : ''}"
        ></div>
      </button>
      <span class="{activeRoute?.color} text-lg font-medium"
        >{activeRoute?.label}</span
      >
    </div>
    <ThemeToggle />
  </div>

  <!-- Mobile Menu Dropdown -->
  {#if mobileMenuOpen}
    <div
      class="mobile-menu absolute top-full left-0 right-0 nord-surface-elevated mt-sm p-md flex flex-col gap-sm shadow-medium z-dropdown"
      transition:fade={{ duration: 200 }}
    >
      {#each routes as route}
        <a
          href={route.path}
          class="{route.color} p-sm rounded-sm transition-all duration-normal hover:bg-bg-tertiary hover:tracking-wide"
          on:click={closeMobileMenu}
        >
          {route.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>

<style>
  .nav-desktop {
    display: flex;
  }

  .nav-mobile {
    display: none;
  }

  nav {
    position: relative;
  }

  a {
    margin: auto;
    text-decoration: none;
    font-size: clamp(1rem, 2vw, 1.5rem);
    transition: var(--transition-normal);
  }

  a:hover {
    letter-spacing: 0.2em;
  }

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
  }

  @media (max-width: 500px) {
    a {
      font-size: clamp(0.8rem, 3.5vw, 1rem);
    }

    a:hover {
      letter-spacing: 0.1em;
    }

    .mobile-menu a {
      font-size: clamp(0.9rem, 4vw, 1.1rem) !important;
    }
  }
</style>

