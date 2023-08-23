<script>
  import PostCard from "$lib/components/post-card.svelte";
  import { concurrent } from "svelte-typewriter";
  let posts = [
    { title: "Post 1", description: "Short description 1", url: "/blog/post1" },
    { title: "Post 2", description: "Short description 2", url: "/post2" },
  ];
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
      Work in progress...
    </h1>
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

  .rotate {
    transform: rotate(90deg);
    transition: transform 0.2s ease-in-out;
  }

  @media (max-width: 750px) {
    .card-holder {
      flex-direction: column;
    }
    .text-size {
      display: block;
    }
  }
</style>
