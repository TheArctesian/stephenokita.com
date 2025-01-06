<script lang="ts">
  import PostCard from "$lib/components/post-card.svelte";
  import { concurrent } from "svelte-typewriter";
  import { formatDate } from "$lib/utils.js";
  export let data;
  import { blur, fade, slide} from "svelte/transition";
</script>

<div out:blur>
    <div class="flex text1 text-center flex-col">
      <h1
        class="text-center"
        use:concurrent={{
          mode: "loop",
          delay: 10,
          wordInterval: 100,
          interval: 100,
        }}
      >
        Forever a work in progress...
      </h1>
    </div>

      <section class="">
        <div class="posts">
          {#each data.posts as post}
            <a href={post.slug}>
              <div class="post">
                <h1 href={post.slug} class="title ">{post.title}</h1>
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
    <br />
</div>

<!--  
{#each posts as post}
    <PostCard {...post}/>
{/each}
 -->

<style>
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
  li {
    padding: auto;
    transition: 0.2s ease-in-out;
  }
  li:hover {
    transition: 0.2s ease-in-out;
    padding: 0.2rem;
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
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: var(--fg);
    height: 100%;
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
    border: 0.2rem solid var(--purple);
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
