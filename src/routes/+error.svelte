<script lang="ts">
  /**
   * Error page for every route, including paths that match no locale prefix.
   *
   * Leans on the terminal motif the nav already uses (`~/`, `/blog`) rather
   * than a generic 404 illustration. Always noindex: SvelteKit returns the
   * real status code, and an indexed error page is a soft-404 to crawlers.
   */
  import { page } from "$app/stores";
  import { t } from "$lib/i18n";
  import { locale } from "$lib/stores/locale";
  import { localizedPath } from "$lib/utils/seo";
  import Seo from "$lib/components/seo/seo.svelte";

  $: status = $page.status;
  $: isNotFound = status === 404;

  $: title = isNotFound ? $t("error.404.title") : $t("error.generic.title");
  $: message = isNotFound
    ? $t("error.404.message")
    : ($page.error?.message ?? $t("error.generic.message"));

  // The path the visitor actually asked for, decoded so a CJK or spaced slug
  // reads as itself rather than as percent-escapes.
  $: attemptedPath = (() => {
    try {
      return decodeURIComponent($page.url.pathname);
    } catch {
      return $page.url.pathname;
    }
  })();
</script>

<Seo
  title={$t("error.metaTitle", { status, title })}
  description={message}
  noindex
  alternates={false}
/>

<div class="error-page">
  <div class="error-terminal" role="alert">
    <p class="error-terminal__line">
      <span class="error-terminal__prompt" aria-hidden="true">$</span>
      <span class="error-terminal__command">cd {attemptedPath}</span>
    </p>
    <p class="error-terminal__line error-terminal__line--output">
      cd: {attemptedPath}: {title}
    </p>
    <p class="error-terminal__line error-terminal__line--status">
      exit <span class="error-terminal__code">{status}</span>
    </p>
  </div>

  <p class="error-page__message">{message}</p>

  <nav class="error-page__actions" aria-label="Error recovery">
    <a class="error-page__link" href={localizedPath("/", $locale)}>
      ~/ <span>{$t("error.backHome")}</span>
    </a>
    <a class="error-page__link" href={localizedPath("/blog", $locale)}>
      /blog <span>{$t("error.browseBlog")}</span>
    </a>
  </nav>
</div>

<style>
  .error-page {
    max-width: 46rem;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .error-terminal {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-left: 4px solid var(--status-error, var(--accent-primary));
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    /* Long slugs (this site has plenty) scroll rather than break the layout. */
    overflow-x: auto;
  }

  .error-terminal__line {
    margin: 0;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .error-terminal__prompt {
    color: var(--accent-primary);
    margin-right: var(--space-xs);
    user-select: none;
  }

  .error-terminal__command {
    color: var(--text-primary);
  }

  .error-terminal__line--output {
    color: var(--text-secondary);
  }

  .error-terminal__line--status {
    color: var(--text-tertiary);
    margin-top: var(--space-sm);
  }

  .error-terminal__code {
    color: var(--status-error, var(--accent-primary));
    font-weight: 700;
  }

  .error-page__message {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .error-page__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .error-page__link {
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    background-color: var(--bg-secondary);
    color: var(--accent-primary);
    font-family: var(--font-family-mono);
    text-decoration: none;
    transition: all var(--transition-fast);
  }

  .error-page__link span {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
  }

  .error-page__link:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--accent-primary);
  }

  @media (max-width: 500px) {
    .error-page {
      padding: var(--space-xl) var(--space-md);
    }
  }
</style>
