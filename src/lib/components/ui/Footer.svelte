<script lang="ts">
  import { fade } from "svelte/transition";

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/stephen-okita/",
      icon: "https://cdn-icons-png.flaticon.com/512/3536/3536569.png",
      alt: "LinkedIn",
    },
    {
      href: "https://github.com/TheArctesian",
      icon: "https://simpleicons.org/icons/github.svg",
      alt: "GitHub",
    },
    {
      href: "https://www.instagram.com/stephen.okita/",
      icon: "https://simpleicons.org/icons/instagram.svg",
      alt: "Instagram",
    },
    {
      href: "https://www.cal.com/stephenokita/",
      icon: "https://simpleicons.org/icons/caldotcom.svg",
      alt: "Cal.com",
    },
  ];
</script>

<footer class="w-full px-4 box-border text-text-primary" transition:fade={{ delay: 500 }}>
  <div class="nord-surface p-md w-full">
    <div class="text-center space-y-md">
      <h2 class="text-base">
        Email me at <span class="text-accent-primary hover:text-accent-cyan transition-all duration-fast cursor-pointer">sdokita@berkeley.edu</span>
      </h2>
      
      <h2 class="text-base">
        Schedule a meeting with me 
        <a href="https://cal.com/stephenokita" class="text-accent-primary hover:text-accent-cyan transition-all duration-fast underline">cal.com/stephenokita</a>
      </h2>

      <div class="social-links flex justify-between items-center gap-xl p-xl">
        {#each socialLinks as link}
          <div class="social-link flex-1 flex justify-center">
            <a href={link.href} class="w-full flex justify-center">
              <img
                src={link.icon}
                alt={link.alt}
                class="social-icon w-full hover:scale-110"
              />
            </a>
          </div>
        {/each}
      </div>

      <p class="text-base">
        source code for this website 
        <a 
          class="text-accent-primary hover:text-accent-cyan transition-all duration-fast italic underline" 
          href="https://github.com/TheArctesian/danielokita.com"
        >
          here
        </a>
      </p>
    </div>
  </div>
</footer>

<style>
  .social-icon {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%) hue-rotate(343deg) brightness(94%) contrast(90%);
    opacity: 0.8;
    transition: filter var(--transition-fast), opacity var(--transition-fast), transform var(--transition-fast);
  }
  
  .social-icon:hover {
    filter: brightness(0) saturate(100%) invert(84%) sepia(21%) saturate(933%) hue-rotate(343deg) brightness(110%) contrast(90%);
    opacity: 1;
  }

  @media (max-width: 900px) {
    .social-links {
      gap: var(--space-lg) !important;
      padding: var(--space-lg) 0 !important;
    }

    .social-icon {
      width: 3rem;
      height: 3rem;
    }
  }

  @media (max-width: 500px) {
    .social-icon {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  @media (max-width: 350px) {
    .social-links {
      flex-direction: column !important;
      gap: var(--space-md) !important;
    }

    .social-link {
      width: 100% !important;
    }

    .social-icon {
      width: 4rem;
      height: 4rem;
    }
  }
</style>