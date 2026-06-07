<script lang="ts">
  import type { Post } from "$lib/types";
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EmptyState from "$lib/components/shared/empty_state.svelte";
  import BlogCard from "./blog_card.svelte";

  export let posts: Post[] = [];
</script>

<section class="blog-grid-container" aria-label="Blog posts">
  {#if posts.length === 0}
    <div in:scale={{ duration: 300, easing: quintOut }}>
      <EmptyState
        title="No posts found"
        description="Try adjusting your search or filters"
      />
    </div>
  {:else}
    <div class="blog-grid">
      {#each posts as post, i (post.slug)}
        <article
          class="blog-card"
          in:fade={{ delay: Math.min(i * 50, 200), duration: 400 }}
          out:scale={{ duration: 200 }}
        >
          <BlogCard {post} />
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .blog-grid-container {
    padding: 0 1rem;
    margin-top: 1rem;
  }

  .blog-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  .blog-card {
    @apply bg-bg-secondary rounded-lg overflow-hidden;
    border: 1px solid var(--border-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.15),
      0 0 0 2px var(--status-error);
  }

  @media (max-width: 1200px) {
    .blog-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .blog-grid-container {
      padding: 0 1rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
