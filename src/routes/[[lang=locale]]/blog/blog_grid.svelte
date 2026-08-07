<script lang="ts">
  import type { Post } from "$lib/types";
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EmptyState from "$lib/components/shared/empty_state.svelte";
  import BlogCard from "./blog_card.svelte";

  export let posts: Post[] = [];
</script>

<section class="blog-list-container" aria-label="Blog posts">
  {#if posts.length === 0}
    <div in:scale={{ duration: 300, easing: quintOut }}>
      <EmptyState
        title="No posts found"
        description="Try adjusting your search or filters"
      />
    </div>
  {:else}
    <div class="blog-list">
      {#each posts as post, i (post.slug)}
        <article
          class="blog-row"
          in:fade={{ delay: Math.min(i * 40, 200), duration: 300 }}
          out:scale={{ duration: 200 }}
        >
          <BlogCard {post} />
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .blog-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .blog-row {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition:
      border-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .blog-row:hover {
    border-color: var(--accent-primary);
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .blog-row {
      transition: border-color var(--transition-fast);
    }
    .blog-row:hover {
      transform: none;
    }
  }
</style>
