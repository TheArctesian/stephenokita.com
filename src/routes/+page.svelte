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

<div out:slide class="fullscreen-container">
  {#if browser && isLoaded}
    <div class="hello">
      <div class="name-container" in:fade={{ delay: 0 * 150, duration: 300 }}>
        <div class="flex flex-wrap gap-2 justify-center name-collage">
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
  {/if}
</div>

<style>
  .fullscreen-container {
    margin: 1rem;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  .hello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: clamp(1rem, 4vw, 2rem);
    width: 100%;
    height: 100%;
    background-color: var(--fg);
    border-radius: 0.2rem;
  }

  .name-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }

  .name-collage {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  /* Text sizes */
  .responsive-text {
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }
  .name-large {
    font-size: clamp(2rem, 10vw, 8rem);
  }
  .name-medium {
    font-size: clamp(1.5rem, 7vw, 5rem);
  }
  .name-small {
    font-size: clamp(1rem, 4vw, 2rem);
  }
  .kanji {
    font-size: clamp(1.5rem, 7vw, 5rem);
  }

  /* Chinese text styles */
  .chinese-container {
    flex-direction: column;
    font-size: clamp(0.8rem, 2vw, 1.2rem);
  }

  .chinese-text h1 {
    font-size: inherit;
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
</style>
