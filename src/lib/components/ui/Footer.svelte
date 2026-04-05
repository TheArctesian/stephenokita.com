<script lang="ts">
  import Icon from "@iconify/svelte";

  const links = [
    {
      href: "mailto:me@stephenokita.com",
      icon: "mdi:email-outline",
      label: "Email",
    },
    {
      href: "https://cal.com/stephenokita",
      icon: "mdi:calendar-outline",
      label: "Calendar",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/stephen-okita/",
      icon: "mdi:linkedin",
      label: "LinkedIn",
      external: true,
    },
    {
      href: "https://github.com/TheArctesian",
      icon: "mdi:github",
      label: "GitHub",
      external: true,
    },
    {
      href: "https://pixelfed.social/thearctesian",
      icon: "mdi:camera-outline",
      label: "Pixelfed",
      external: true,
    },
    {
      href: "https://x.com/StephenOkita",
      icon: "simple-icons:x",
      label: "X",
      external: true,
    },
  ];
</script>

<footer>
  <div class="footer-inner">
    <nav class="footer-links" aria-label="Contact and social links">
      {#each links as link}
        <a
          href={link.href}
          aria-label={link.label}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          <Icon icon={link.icon} />
        </a>
      {/each}
    </nav>
    <a
      href="https://github.com/TheArctesian/danielokita.com"
      class="source-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      source
    </a>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border-primary);
    padding: var(--space-lg) var(--space-lg);
  }

  .footer-inner {
    max-width: 740px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }

  .footer-links a {
    color: var(--text-secondary);
    transition: color var(--transition-fast);
    display: flex;
    align-items: center;
  }

  .footer-links a:hover {
    color: var(--accent-primary);
  }

  .footer-links a :global(svg) {
    width: 20px;
    height: 20px;
  }

  .source-link {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .source-link:hover {
    color: var(--accent-primary);
  }

  @media (max-width: 640px) {
    .footer-links {
      gap: var(--space-md);
    }

    .footer-links a :global(svg) {
      width: 22px;
      height: 22px;
    }
  }
</style>
