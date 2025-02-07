<script lang="ts">
  import { formatDate } from "$lib/utils.js";
  export let data;
  import { fade, slide } from "svelte/transition";
  import projects from "./unfinishedprojects.json";
  import writings from "./unfinishedwriting.json";
  import { each } from "svelte/internal";
</script>

<div out:slide>
  <section class="">
    <div class="posts">
      {#each data.posts as post, i}
        <a href={post.slug} in:fade={{ delay: i * 150, duration: 300 }}>
          <div class="post">
            <h1 href={post.slug} class="title">{post.title}</h1>
            <hr />
            <div class="mt-3">
              <p class="date flex items-center">
                <img
                  src="   https://cdn-icons-png.flaticon.com/512/61/61469.png "
                  alt="date icon"
                  class="inline-block mr-4"
                  width="20"
                  height="20"
                />
                <span> <b>Released:</b> {formatDate(post.date)}</span>
              </p>
              <p class="date flex items-center">
                <img
                  src="   https://cdn-icons-png.flaticon.com/512/3177/3177361.png "
                  alt="date icon"
                  class="inline-block mr-4"
                  width="20"
                  height="20"
                />
                <span><b>Location: </b>{post.location}</span>
              </p>
              <p class="mt-2 mr-4">{post.description}</p>
            </div>
            <br />
          </div>
        </a>
      {/each}
    </div>
  </section>
</div>
<div class="mt-4">
  <div class="wrapper">
    <h1 class="font-bold">Unfinished/expired ideas</h1>
    <p>
      Ideas for projects and essays that are no longer mine to write and that I
      wrote down to do. Look at the article of the same name for more info.
    </p>
  </div>
  <div class="text-center font-bold wrapper">
    <h1>Essays that should be written</h1>
  </div>
  <div class="posts mb-4">
    {#each writings as w}
      <div class="ideas" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="float-right font-bold">{w.date}</h1>
      </div>
    {/each}
  </div>
  <div class="text-center font-bold wrapper">
    <h1>Project that should be done</h1>
  </div>
  <div class="posts mb-4">
    {#each projects as w}
      <div class="ideas" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="float-right font-bold">{w.date}</h1>
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    background-color: var(--fg);
    margin: 1rem;
    margin-top: 0;
  }
  .ideas {
    background-color: var(--fg);
    padding: 1rem;
  }
  right {
    float: right;
  }
  b {
    font-weight: bold;
  }
  .text1 {
    padding: 1rem;
    border-radius: 0.2rem;
    background-color: var(--fg);
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .text {
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 1rem;
  }
  .rotate {
    transform: rotate(90deg);
    transition: 0.2s ease-in-out;
  }
  .posts {
    display: grid;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
  }
  .post {
    margin-bottom: 1rem;
    background-color: var(--fg);
    height: 100%;
    color: var(--bg);
    text-wrap: wrap;
    padding: 1rem;
    border-radius: 0.2rem;
    transition: all ease-in-out 100ms;
  }
  @media (max-width: 1000px) {
    .posts {
      margin-top: 1rem;
      grid-template-columns: repeat(auto-fill, 100%);
    }
    .post {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  .post:hover {
    border-left: 0.5rem solid var(--red);
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
</style>
