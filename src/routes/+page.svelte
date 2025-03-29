<script>
  import "../app.css";
  import { blur, fade, slide, fly, scale } from "svelte/transition";
  import { elasticIn, elasticOut, bounceOut, backOut } from "svelte/easing";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  const iAmRepeats = Array(16).fill("I am");
  const chineseRepeats = Array(6).fill("我是");
  const okitaRepeats = Array(3).fill("Okita");
  const kanjiCharacters = ["沖", "田", "勇"];

  let isLoaded = false;

  onMount(() => {
    // Small delay to ensure DOM is ready
    isLoaded = true;
  });

  // Helper function for random delays
  const getRandomDelay = () => Math.random() * 1500;
  const getRandomDuration = () => 300 + Math.random() * 700;
</script>

<div out:slide>
  {#if browser && isLoaded}
    <div class="hello">
      <div class="name-container" in:fade={{ delay: 0 * 150, duration: 300 }}>
        <div class="flex flex-wrap gap-2 justify-center">
          <!-- Left Section -->
          <div
            class="chinese-container of flex justify-center"
            in:fly={{
              delay: getRandomDelay(),
              duration: getRandomDuration(),
              x: -100,
              y: 0,
              easing: elasticOut,
            }}
          >
            <div class="flex flex-col chinese-text leading-[0.9rem]">
              {#each chineseRepeats as text}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 0.5,
                    easing: bounceOut,
                  }}
                >
                  {text}
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.6rem]">
              {#each Array(7) as _}
                <h1
                  class="hover:text-d-red"
                  in:blur={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.4rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:fly={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    y: 50,
                    easing: elasticIn,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.2rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 2,
                    easing: backOut,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
          </div>

          <div class="flex flex-col r of justify-center leading-3">
            {#each iAmRepeats as text}
              <h1
                class="responsive-text t text-d-red hover:text-d-bg"
                in:fly={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  x: -50,
                  y: -50,
                  easing: elasticOut,
                }}
              >
                {text}
              </h1>
            {/each}
          </div>

          <div class="flex flex-col">
            <div
              class="text-bold name-large t hover:text-d-red"
              in:scale={{
                delay: getRandomDelay(),
                duration: getRandomDuration(),
                start: 0,
                easing: elasticOut,
              }}
            >
              Stephen
            </div>
            <div
              class="name-medium text-d-red t hover:text-d-black hover:name-large text-right w-full"
              in:blur={{
                delay: getRandomDelay(),
                duration: getRandomDuration(),
              }}
            >
              Daniel
            </div>
          </div>

          <div class="text-center flex flex-col">
            {#each okitaRepeats as text, i}
              <h1
                class="text-d-red t hover:text-d-bg hover:name-{i === 1
                  ? 'small'
                  : 'medium'} name-medium"
                in:fly={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  x: 100,
                  y: 0,
                  easing: elasticIn,
                }}
              >
                {text}
              </h1>
            {/each}
          </div>

          <div class="kanji-container">
            {#each kanjiCharacters as kanji}
              <div
                class="t hover:text-d-red kanji"
                in:scale={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  start: 1.5,
                  easing: bounceOut,
                }}
              >
                {kanji}
              </div>
            {/each}
          </div>

          <!-- Middle Section -->
          <div
            class="chinese-container m r flex justify-center"
            in:fly={{
              delay: getRandomDelay(),
              duration: getRandomDuration(),
              y: -100,
              easing: elasticOut,
            }}
          >
            <div class="flex flex-col chinese-text leading-[0.9rem]">
              {#each chineseRepeats as text}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 0.3,
                    easing: backOut,
                  }}
                >
                  {text}
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.6rem]">
              {#each Array(7) as _}
                <h1
                  class="hover:text-d-red"
                  in:blur={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.4rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:fly={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    x: -50,
                    easing: elasticIn,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.2rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 0.1,
                    easing: elasticOut,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
          </div>

          <div class="kanji-container o3 r">
            {#each kanjiCharacters as kanji}
              <div
                class="text-d-red t hover:text-d-bg kanji"
                in:fly={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  y: 100,
                  easing: bounceOut,
                }}
              >
                {kanji}
              </div>
            {/each}
          </div>

          <!-- Right Section -->
          <div class="text-center r flex flex-col">
            {#each okitaRepeats as text, i}
              <h1
                class="text-d-bg t hover:text-d-red hover:name-{i === 1
                  ? 'small'
                  : 'medium'} name-medium"
                in:scale={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  start: 2,
                  easing: elasticIn,
                }}
              >
                {text}
              </h1>
            {/each}
          </div>

          <div class="flex r sd flex-col">
            <div
              class="text-bold name-large t hover:text-d-red"
              in:fly={{
                delay: getRandomDelay(),
                duration: getRandomDuration(),
                x: 100,
                y: -100,
                easing: backOut,
              }}
            >
              Stephen
            </div>
            <div
              class="name-medium text-d-red t hover:text-d-black hover:name-large text-left w-full"
              in:blur={{
                delay: getRandomDelay(),
                duration: getRandomDuration(),
              }}
            >
              Daniel
            </div>
          </div>

          <div class="flex flex-col r of justify-center leading-3">
            {#each iAmRepeats as text}
              <h1
                class="responsive-text text-d-red t hover:text-d-black"
                in:scale={{
                  delay: getRandomDelay(),
                  duration: getRandomDuration(),
                  start: 0.7,
                  easing: elasticOut,
                }}
              >
                {text}
              </h1>
            {/each}
          </div>

          <div
            class="chinese-container r of flex justify-center"
            in:fly={{
              delay: getRandomDelay(),
              duration: getRandomDuration(),
              x: 100,
              easing: bounceOut,
            }}
          >
            <div class="flex flex-col chinese-text leading-[0.9rem]">
              {#each chineseRepeats as text}
                <h1
                  class="hover:text-d-red"
                  in:blur={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                  }}
                >
                  {text}
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.6rem]">
              {#each Array(7) as _}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 1.2,
                    easing: elasticIn,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.4rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:fly={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    y: -50,
                    easing: backOut,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
            <div class="flex flex-col chinese-text leading-[0.2rem]">
              {#each Array(3) as _}
                <h1
                  class="hover:text-d-red"
                  in:scale={{
                    delay: getRandomDelay(),
                    duration: getRandomDuration(),
                    start: 0.8,
                    easing: bounceOut,
                  }}
                >
                  我是
                </h1>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="wrapper" in:slide={{ delay: 1 * 150, duration: 300 }}>
      <div class="text">
        <div class="content">
          <div class="element" in:fade={{ delay: 3 * 150, duration: 300 }}>
            <div class="b flex flex-col">
              <span
                class="text-d-orange m-auto sm:text-2xl mb-2 font-bold text-xl"
                >Resume</span
              >
              <a href="/other/Stephen Okita Resume 2024.pdf" target="_blank">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135785.png"
                  alt="Resume"
                />
              </a>
            </div>
          </div>

          <div class="element" in:fade={{ delay: 4 * 150, duration: 300 }}>
            <div class="b flex flex-col">
              <span
                class="text-d-pink m-auto sm:text-2xl mb-2 font-bold text-xl"
                >Me?</span
              >
              <a href="/person">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Who am I"
                />
              </a>
            </div>
          </div>

          <div class="element" in:fade={{ delay: 5 * 150, duration: 300 }}>
            <div class="b flex flex-col">
              <span
                class="text-d-purple m-auto sm:text-2xl mb-2 font-bold text-xl"
                >Skills</span
              >
              <a href="/about">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2502/2502399.png"
                  alt="Skills"
                />
              </a>
            </div>
          </div>

          <div class="element" in:fade={{ delay: 6 * 150, duration: 300 }}>
            <div class="b flex flex-col">
              <span
                class="text-d-comment m-auto sm:text-2xl mb-2 font-bold text-xl"
                >Projects</span
              >
              <a href="/projects">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/11450/11450628.png"
                  alt="Projects"
                />
              </a>
            </div>
          </div>

          <div class="element" in:fade={{ delay: 7 * 150, duration: 300 }}>
            <div class="b flex flex-col">
              <span class="text-d-red m-auto sm:text-2xl mb-2 font-bold text-xl"
                >Blog</span
              >
              <a href="/blog">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4922/4922073.png"
                  alt="Blog"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    -->
  {/if}
</div>

<style>
  .hello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: clamp(1rem, 4vw, 2rem);
    margin: 1rem;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }

  .name-container {
    width: 100%;
    padding: 0.25rem;
  }

  /* Text sizes */
  .responsive-text {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }
  .name-large {
    font-size: clamp(2rem, 8vw, 6rem);
  }
  .name-medium {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }
  .name-small {
    font-size: clamp(1rem, 4vw, 2rem);
  }
  .kanji {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }

  /* Chinese text styles */
  .chinese-container {
    flex-direction: column;
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }

  .chinese-text h1 {
    font-size: inherit;
  }

  /* Transitions */

  /* Footer section */
  .wrapper {
    padding: 0 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    width: 100%;
  }

  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    width: 100%;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 2rem 0;
  }

  .element {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .element a {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .element span {
    transition: all ease-in-out 200ms;
  }

  img {
    width: 100%;
    padding: 1rem;
    max-width: 8vw;
    transition: all ease-in-out 200ms;
  }

  .element:hover img {
    transform: scale(1.1);
    border-bottom: 0.3rem solid var(--selection);
  }
  .b:hover span {
    transform: scale(1.1);
  }

  /* Media Queries */
  @media (max-width: 1550px) {
    .of {
      display: none;
    }
  }
  @media (max-width: 1340px) {
    .m {
      display: none;
    }
  }
  @media (max-width: 1300px) {
    .o3 {
      display: none;
    }
  }
  @media (max-width: 1240px) {
    .sd {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .r {
      display: none;
    }
  }

  @media (max-width: 1000px) {
    a {
      font-size: 3.7vw;
    }
    img {
      max-width: 10vw;
    }
    .content {
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .element {
      min-width: unset;
      margin-top: 1rem;
    }

    img {
      max-width: 30vw;
    }
  }
</style>
