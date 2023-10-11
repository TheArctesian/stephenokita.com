<script lang="ts">
  import PostCard from "$lib/components/post-card.svelte";
  import { concurrent } from "svelte-typewriter";
  import { formatDate } from "$lib/utils.js";
  export let data;
</script>

<div class="text flex-wrap">
  <div class="head flex text-center flex-col">
    <h1
      class="text-center"
      use:concurrent={{
        mode: "loop",
        delay: 500,
        wordInterval: 100,
        interval: 100,
      }}
    >
      Forever a Work in progress...
    </h1>
  </div>
</div>

<div class="text flex-wrap">
  <div class="head flex flex-col">
    <section>
      <ul class="posts">
        {#each data.posts as post}
          <a href={post.slug}>
            <li class="post">
              <hr />
              <br />
              <h1 href={post.slug} class="title">{post.title}</h1>
              <p class="date">Published at {formatDate(post.date)}</p>
              <p class="date">Location: {post.location}</p>
              <p class="description">{post.description}</p>
              <br />
              <hr />
            </li>
          </a>
        {/each}
      </ul>
    </section>
  </div>
</div>

<!--  
{#each posts as post}
    <PostCard {...post}/>
{/each}
 -->

<style>
  b {
    font-weight: bold;
  }

  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 1rem;
  }
  li{
    padding: auto;
    transition:0.2s ease-in-out;
  }
  li:hover{
    transition: 0.2s ease-in-out;
    padding: 0.2rem;
  }
  .rotate {
    transform: rotate(90deg);
    transition:0.2s ease-in-out;
  }

  @media (max-width: 750px) {
    .card-holder {
      flex-direction: column;
    }
    .text-size {
      display: block;
    }
  }
  .posts {
    display: grid;
    gap: 2rem;
  }

  .post {
  }

  .post:not(:last-child) {
    border-bottom: 1px solid var(--border);
    padding-bottom: var(--size-7);
  }

  .title {
    font-size: larger;
    font-weight: bold;
    color: var(--bg);
  }

  .date {
    color: var(--bg);
  }

  .description {
    margin-top: 1rem;
    margin-left: 1rem;
    color: var(--bg);
  }
</style>
