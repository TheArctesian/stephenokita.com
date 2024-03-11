<script lang="ts">
  import { formatDate } from "$lib/utils";

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {formatDate(data.meta.date)}</p>
  </hgroup>

  <br />
  <hr />
  <br />
  <!-- Post -->
  <div class="prose">
    <svelte:component this={data.content} />
  </div>
</article>

<div>
  <br />
  <a href="/blog" class="blog text">Back to blog</a>
</div>

  <span class="m-1"></span>
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
