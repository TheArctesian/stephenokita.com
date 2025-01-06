<script>
  import "../../app.css";
  import { browser } from "$app/environment";
  import Youtube from "svelte-youtube-embed";
  import music from "./music.json";
  import quotes from "./quotes.json";
  import animations from "./animations.json";
  import { onMount } from 'svelte';
  import { blur, fade, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let currentQuoteIndex = 0;
  let currentMusicIndex = 0;
  let currentAnimationIndex = 0;
  let quoteKey = 0;
  let musicKey = 0;
  let animationKey = 0;

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteKey++;
  }

  function prevQuote() {
    currentQuoteIndex = currentQuoteIndex === 0 
      ? quotes.length - 1 
      : currentQuoteIndex - 1;
    quoteKey++;
  }

  function nextMusic() {
    currentMusicIndex = (currentMusicIndex + 1) % music.length;
    musicKey++;
  }

  function prevMusic() {
    currentMusicIndex = currentMusicIndex === 0 
      ? music.length - 1 
      : currentMusicIndex - 1;
    musicKey++;
  }

  function nextAnimation() {
    currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
    animationKey++;
  }

  function prevAnimation() {
    currentAnimationIndex = currentAnimationIndex === 0 
      ? animations.length - 1 
      : currentAnimationIndex - 1;
    animationKey++;
  }

  onMount(() => {
    const quoteInterval = setInterval(nextQuote, 10000);
    return () => clearInterval(quoteInterval);
  });
</script>

{#if browser}
  <div class="text wrapper" out:blur>
    <h1 class="text-center">Quotes I have come across that I really like</h1>
    <div class="carousel">
      <button class="nav-arrow left" on:click={prevQuote}>{"<"}</button>
      <div class="quote-container">
        {#key quoteKey}
          <div 
            class="text-center p-5 m-auto" in:fade={{duration: 200, easing: elasticOut}}
          >
            <h1>"{quotes[currentQuoteIndex].text}"</h1>
            <br />
            <h1 class="text-right font-bold">{quotes[currentQuoteIndex].name}</h1>
          </div>
        {/key}
      </div>
      <button class="nav-arrow right" on:click={nextQuote}>{">"}</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2" out:blur>
    <div class="text wrapper1">
      <h1 class="text-center">
        This is a collection of my music musings, these are not structured songs
        but just cool sounds I make while fooling around
      </h1>
      <br>
      <hr>
      <br>
      <div class="carousel">
        <button class="nav-arrow left" on:click={prevMusic}>{"<"}</button>
        <div class="youtube-container">
          {#key musicKey}
            <div>
              <h1 class="text-center text-xl font-bold">{music[currentMusicIndex].title}</h1>
              <br>
              <Youtube id={music[currentMusicIndex].id} />
            </div>
          {/key}
        </div>
        <button class="nav-arrow right" on:click={nextMusic}>{">"}</button>
      </div>
    </div>

    <div class="text wrapper2">
      <h1>This is a collection of my animations</h1>
      <br>
      <hr>
      <br>
      <div class="carousel">
        <button class="nav-arrow left" on:click={prevAnimation}>{"<"}</button>
        <div class="youtube-container">
          {#key animationKey}
            <div >
              <h1 class="text-center text-xl font-bold">{animations[currentAnimationIndex].title}</h1>
              <br />
              <Youtube id={animations[currentAnimationIndex].id} />
            </div>
          {/key}
        </div>
        <button class="nav-arrow right" on:click={nextAnimation}>{">"}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .img {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }
  .wrapper {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    transition: all ease-in-out 200ms;
  }
  .wrapper1 {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
  .wrapper2 {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 750px) {
    .wrapper1 {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .wrapper2 {
      margin-top: 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
 
  .element {
    margin: 1rem;
    border-radius: 0.2rem;
    padding: 1rem;
    border: 0.2rem solid var(--fg);
  }
  .element:hover {
    border: 0.2rem solid var(--purple);
  }

  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .quote-container {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 3rem;
  }

  .youtube-container {
    width: 100%;
    padding: 0 3rem;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .youtube-container :global(iframe) {
    max-width: 100%;
  }

  .nav-arrow {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0 1rem;
    color: inherit;
    transition: transform 0.2s;
    z-index: 1;
    position: absolute;
  }

  .nav-arrow:hover {
    color: var(--selection);
    transform: scale(1.2);
  }

  .nav-arrow.left {
    left: 0;
  }

  .nav-arrow.right {
    right: 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--selection);
    width: 100%;
    opacity: 0.5;
  }
</style>