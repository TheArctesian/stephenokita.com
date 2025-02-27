<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { fade, slide } from "svelte/transition";

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div out:slide>
  <article in:slide={{ delay: 2 * 150, duration: 300 }}>
    <!-- Title -->
    <hgroup>
      <div class="flex flex-col">
        <h1 in:fade={{ delay: 3 * 150, duration: 300 }}>{data.meta.title}</h1>
        <p in:fade={{ delay: 4 * 150, duration: 300 }}>
          Published at {formatDate(data.meta.date)} |
          <a
            href="/blog"
            class="ml-auto"
            in:fade={{ delay: 7 * 200, duration: 500 }}>Back to blog page</a
          >
        </p>
      </div>
    </hgroup>

    <br />
    <hr in:fade={{ delay: 6 * 150, duration: 300 }} />
    <br />
    <!-- Post -->
    <div class="prose" in:fade={{ delay: 6 * 150, duration: 300 }}>
      <svelte:component this={data.content} />
    </div>
  </article>
</div>

<style>
  article {
    background-color: var(--fg);
    padding: 1rem;
    color: var(--bg);
    border-radius: 0.2rem;

    overflow: wrap;
    margin: 1rem;
  }

  h1 {
    text-transform: capitalize;
    font-weight: bolder;
    margin-bottom: 1rem;
    font-size: larger;
  }

  h1 + p {
    color: var(--selection);
  }

  .tags {
    display: flex;
    gap: 1rem;
    margin: 1rem;
    color: var(--purple);
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 1rem !important;
  }
  .blog {
    color: var(--red);
  }
</style>
