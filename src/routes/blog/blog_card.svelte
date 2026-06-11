<script lang="ts">
  import type { Post } from "$lib/types";
  import { formatDate } from "$lib/utils.js";
  import CardImage from "./card_image.svelte";

  export let post: Post;
</script>

<a href="/blog/{encodeURIComponent(post.slug)}" class="row-link">
  {#if post.img}
    <div class="row-thumb">
      <CardImage src={post.img} alt={post.title} />
    </div>
  {/if}

  <div class="row-body">
    <h2 class="row-title">{post.title}</h2>

    <div class="card-meta">
      <div class="meta-item">
        <svg
          class="meta-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{formatDate(post.date)}</span>
      </div>

      {#if post.location}
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{post.location}</span>
        </div>
      {/if}

      {#if post.readingTime}
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{post.readingTime} min</span>
        </div>
      {/if}

      {#if post.viewCount !== undefined && post.viewCount > 0}
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{post.viewCount.toLocaleString()}</span>
        </div>
      {/if}

      {#if post.commentCount !== undefined && post.commentCount > 0}
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{post.commentCount}</span>
        </div>
      {/if}
    </div>

    <p class="row-description">{post.description}</p>

    {#if post.categories && post.categories.length > 0}
      <div class="card-tags">
        {#each post.categories.slice(0, 4) as category}
          <span class="tag">{category}</span>
        {/each}
      </div>
    {/if}
  </div>
</a>

<style>
  .row-link {
    display: flex;
    gap: var(--space-lg);
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    text-decoration: none;
    color: inherit;
  }

  /* Fixed-width thumbnail column (16:9 via CardImage). */
  .row-thumb {
    width: 200px;
    flex-shrink: 0;
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .row-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  /* Full-width title — wraps instead of clipping. */
  .row-title {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-base);
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
    margin: 0;
    transition: color var(--transition-fast);
  }

  :global(.blog-row:hover) .row-title {
    color: var(--accent-primary);
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--text-tertiary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
  }

  .meta-icon {
    width: 14px;
    height: 14px;
    opacity: 0.7;
  }

  .row-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  .tag {
    padding: 1px var(--space-sm);
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    border-radius: var(--radius-sm);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    transition: color var(--transition-fast);
  }

  :global(.blog-row:hover) .tag {
    color: var(--accent-primary);
  }

  @media (max-width: 640px) {
    .row-link {
      flex-direction: column;
      gap: var(--space-md);
    }

    .row-thumb {
      width: 100%;
    }
  }
</style>
