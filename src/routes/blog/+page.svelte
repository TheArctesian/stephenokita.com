<script lang="ts">
  import { formatDate } from "$lib/utils.js";
  export let data;
  import { fade, slide } from "svelte/transition";
  import projects from "./unfinishedprojects.json";
  import writings from "./unfinishedwriting.json";
  import Instaphoto from "$lib/components/blog/instaphoto.svelte";
  import Writing from "./being.jpg";

  // Search functionality
  let searchTerm = "";
  let selectedCategory = "All";
  let selectedLanguage = "All";
  let sortBy = "newest";

  // Safety check for data
  $: posts = data?.posts || [];

  // Get all unique categories from posts
  $: allCategories = [
    "All",
    ...new Set(posts.flatMap((post) => post.categories || [])),
  ];

  $: allLanguages = [
    "All",
    ...new Set(posts.flatMap((post) => post.language || [])),
  ];

  // Filter and sort posts
  $: filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All" ||
        (post.language && post.language.includes(selectedLanguage));

      const matchesCategory =
        selectedCategory === "All" ||
        (post.categories && post.categories.includes(selectedCategory));
      return matchesSearch && matchesCategory && matchesLanguage;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === "newest") {
        return dateB - dateA;
      } else if (sortBy === "oldest") {
        return dateA - dateB;
      }
      return 0;
    });

  // Animation delay for search results
  let searchAnimationDelay = 0;
</script>

<div class="min-h-screen" out:slide>
  <!-- Blog Header Section -->
  <div class="text1 l flex flex-col">
    <div class="m-auto hero mb-4 flex gap-4 items-center">
      <div class="w-full">
        <h1 class="font-bold text-xl mb-4">Welcome to my blog!</h1>
        <h1 class="mb-4">
          Enjoy, as I put an inordinate amount of my life into this.
        </h1>
        <h1 class="mb-4">
          I try not to remove writings once their up as I want a complete record
          of both the growth of my ideas and my abilities as a communicator.
        </h1>
        <i
          >I am still working on a comment system, for now if you want to
          comment on an article do it on the instagram photo linked or email me
          your critiques at sdokita@berkeley.edu. Critique is <b
            >always always</b
          >
          invited especially critiques of me, of my character, knowledge, actions
          everything.
        </i>
        <h1 class="mt-4">
          I am still and will always be a stupid fool confidently guessing at
          the nature and order of our world. Thus is the struggle of those who venture to
          "passionately experience the weight and burden of existence" (BT)
        </h1>
      </div>
      <img src={Writing} alt="writing" class="max-h-48 rounded shadow" />
    </div>
  </div>
  
  <!-- Search and Filters Section -->
  <div class="text1 se l">
    <div class="w-full flex hero m-auto gap-4">
      <div class="relative w-full">
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search posts..."
          bind:value={searchTerm}
          class="nord-input pl-10 w-full"
        />
        </div>

        <div class="flex cas gap-4">
        <select
          id="category"
          bind:value={selectedCategory}
          class="nord-input cat"
        >
          {#each allCategories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>

        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          <select
            id="language"
            bind:value={selectedLanguage}
            class="nord-input pl-10 appearance-none"
          >
            {#each allLanguages as language}
              <option value={language}>{language}</option>
            {/each}
          </select>
        </div>

        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <select
            bind:value={sortBy}
            class="nord-input pl-10 appearance-none"
          >
            <option value="newest">New</option>
            <option value="oldest">Old</option>
          </select>
        </div>
        </div>
    </div>
  </div>

  <section class="">
    <div class="posts">
      {#each filteredPosts as post, i}
        <a href="/blog/{post.slug}" in:fade={{ delay: i * 150, duration: 300 }}>
          <div class="post">
            {#if post.img}
              <div class="flex flex-row post-content">
                <div class="content-text">
                  <a href="/blog/{post.slug}" class="title">{post.title}</a>
                  <hr />
                  <div class="mt-3">
                    <p class="date flex items-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/61/61469.png"
                        alt="date icon"
                        class="inline-block mr-4"
                        width="20"
                        height="20"
                      />
                      <span> <b>Released:</b> {formatDate(post.date)}</span>
                    </p>
                    <p class="date flex items-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3177/3177361.png"
                        alt="date icon"
                        class="inline-block mr-4"
                        width="20"
                        height="20"
                      />
                      <span><b>Location: </b>{post.location}</span>
                    </p>
                    <p class="mt-2">{post.description}</p>
                  </div>
                </div>
                <div class="content-image">
                  <Instaphoto postUrl={post.img} />
                </div>
              </div>
            {:else}
              <a href="/blog/{post.slug}" class="title">{post.title}</a>
              <hr />
              <div class="mt-3">
                <p class="date flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/61/61469.png"
                    alt="date icon"
                    class="inline-block mr-4"
                    width="20"
                    height="20"
                  />
                  <span> <b>Released:</b> {formatDate(post.date)}</span>
                </p>
                <p class="date flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3177/3177361.png"
                    alt="date icon"
                    class="inline-block mr-4"
                    width="20"
                    height="20"
                  />
                  <span><b>Location: </b>{post.location}</span>
                </p>
                <p class="mt-2 mr-4">{post.description}</p>
              </div>
            {/if}
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
  <div class="posts flex-wrap overflow-hidden">
    {#each writings as w}
      <div class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="mt-auto ml-auto mb-4 font-bold">{w.date}</h1>
      </div>
    {/each}
    <div></div>
  </div>
  <div class="text-center font-bold wrapper">
    <h1 class="">Project that should be done</h1>
  </div>
  <div class="posts mb-4 flex-wrap overflow-hidden">
    {#each projects as w}
      <div class="post flex flex-col" in:fade={{ delay: 1000, duration: 300 }}>
        <h1>{w.idea}</h1>
        <h1 class="mt-auto ml-auto mb-4 font-bold">{w.date}</h1>
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    @apply bg-bg-secondary p-md rounded m-md;
    @apply transition-all duration-normal;
    border: 1px solid var(--border-primary);
  }
  .ideas {
    @apply bg-bg-secondary p-md rounded;
  }
  right {
    float: right;
  }
  b {
    font-weight: bold;
  }
  .text1 {
    @apply p-md rounded bg-bg-secondary mx-md;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
  }
  .text {
    @apply p-md rounded m-md bg-bg-secondary;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-normal;
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
    @apply mb-md bg-bg-secondary h-full text-text-primary p-md rounded;
    border: 1px solid var(--border-primary);
    @apply transition-all duration-fast;
    text-wrap: wrap;
  }

  .post-content {
    width: 100%;
  }

  .content-text {
    flex: 3;
    margin-right: 1rem;
  }

  .content-image {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l {
    margin-bottom: 1rem;
  }

  @media (max-width: 1000px) {
    input {
      width: 100%;
    }
    .hero {
      flex-direction: column;
    }
    .cat {
      width: 100%;
    }

    .se {
      margin-top: 1rem;
    }
    .l {
      margin-bottom: 0rem;
    }
    .posts {
      margin-top: 1rem;
      grid-template-columns: repeat(auto-fill, 100%);
    }

    .post-content {
      flex-direction: column;
    }

    .content-text {
      margin-right: 0;
      margin-bottom: 1rem;
      width: 100%;
    }

    .content-image {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .post {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  .post:hover {
    @apply border-l-8 border-l-status-error;
  }

  .post:not(:last-child) {
    @apply border-b border-b-bg-tertiary pb-lg;
  }

  .title {
    @apply text-lg font-bold text-text-primary;
  }
  
  .date {
    @apply text-text-primary;
  }
  
  .description {
    @apply text-text-primary;
  }
</style>
