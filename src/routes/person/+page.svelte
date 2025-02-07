<script>
  import "../../app.css";
  import { browser } from "$app/environment";
  import Youtube from "svelte-youtube-embed";
  import music from "./music.json";
  import latin from "./latin.json";
  import quotes from "./quotes.json";
  import animations from "./animations.json";
  import { onMount } from "svelte";
  import { blur, fade, fly, scale, slide } from "svelte/transition";
  import me from "./imgs/sillyhat.jpg";

  let currentQuoteIndex = 0;
  let currentMusicIndex = 0;
  let currentAnimationIndex = 0;
  let currentLatinIndex = 0;
  let quoteKey = 0;
  let musicKey = 0;
  let animationKey = 0;
  let latinKey = 0;

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteKey++;
  }

  function prevQuote() {
    currentQuoteIndex =
      currentQuoteIndex === 0 ? quotes.length - 1 : currentQuoteIndex - 1;
    quoteKey++;
  }

  function nextMusic() {
    currentMusicIndex = (currentMusicIndex + 1) % music.length;
    musicKey++;
  }

  function prevMusic() {
    currentMusicIndex =
      currentMusicIndex === 0 ? music.length - 1 : currentMusicIndex - 1;
    musicKey++;
  }

  function nextAnimation() {
    currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
    animationKey++;
  }

  function prevAnimation() {
    currentAnimationIndex =
      currentAnimationIndex === 0
        ? animations.length - 1
        : currentAnimationIndex - 1;
    animationKey++;
  }

  function nextLatin() {
    currentLatinIndex = (currentLatinIndex + 1) % latin.length;
    latinKey++;
  }

  function prevLatin() {
    currentLatinIndex =
      currentLatinIndex === 0 ? latin.length - 1 : currentLatinIndex - 1;
    latinKey++;
  }

  onMount(() => {
    const quoteInterval = setInterval(nextQuote, 10000);
    return () => clearInterval(quoteInterval);
  });
</script>

<div out:slide>
  <div class="flex flex-col sm:flex-row ml-4 mr-4 gap-4 mb-4">
    <div
      class="flex flex-col sm:flex-row text z w h-fit"
      in:fade={{ delay: 1 * 150, duration: 300 }}
    >
      <div class="justify-center align-middle m-auto sm:w-1/3">
        <img
          src={me}
          alt="something wrong with the picture"
          class="m-auto rounded w-1/2"
        />
      </div>
      <div class="flex w-full flex-col text-wrap w">
        <div>
          <p class="mb-2">
            This side of the website is an insight to who I am as a person not a
            labourer.
          </p>
          <hr />
        </div>
        <div
          class="flex flex-col grow md:flex-row align-middle justify-center ml-4"
        >
          <div class="grow">
            <li><b>Born: </b>London, UK</li>
            <li><b>Raised: </b>Hong Kong</li>
            <li>
              <b>Eduction:</b>
              <dd class="ml-4">
                <li>Chinese International School (IB)</li>
                <li>UC Berkeley (CS and Philosophy Major)</li>
              </dd>
            </li>
            <li>
              <b>Profession: </b>
              <dd class="ml-4">
                <li>
                  Full Stack SWE (<a href="https://launchedtech.io/">Launched</a
                  >)
                </li>
                <li>Student Researcher (UC Berkeley)</li>
                <li>
                  Project Vice President (<a
                    href="https://pcs.studentorg.berkeley.edu/">PCS Berkeley</a
                  >)
                </li>
                <li>
                  Writer (<a href="/blog">Here </a> and I am trying to write a book)
                </li>
              </dd>
            </li>
            <li>
              <b>Places:</b>
              <a href="https://world.danielokita.com">Map Blog</a>
            </li>
          </div>
          <div class="grow">
            <li>
              <b>Languages:</b>
              <dd class="ml-4">
                <li>English</li>
                <li>Mandarin (中文)</li>
                <li>Cantonese (廣東話)</li>
                <li>French (barley conversational)</li>
                <li>Spanish (barley conversational)</li>
              </dd>
            </li>
            <li>
              <b>Ethnicity (23&me):</b>
              <dd class="ml-4">
                <li>Irish (70%)</li>
                <li>Japanese (25%)</li>
                <li>Northwestern European (5%)</li>
              </dd>
            </li>
          </div>
          <div class="grow">
            <li>
              <b>Personality Traits:</b>
              <dd class="ml-4">
                <li>Curious</li>
                <li>Passionate</li>
                <li>Organised</li>
                <li>Engaging</li>
                <li>Resourceful</li>
              </dd>
            </li>
            <li>
              <b>Interests (Sports):</b>
              <dd class="ml-4">
                <li>Football (Soccer), Arsenal</li>
                <li>Rugby (Ireland & Munster)</li>
                <li>Whatever sport Berkeley is contenting in</li>
                <li>Hiking</li>
              </dd>
            </li>
          </div>
          <div class="grow">
            <li>
              <b>Hobbies/Interests</b>
              <dd class="ml-4">
                <li>Socialising</li>
                <li>Reading</li>
                <li>Movies</li>
                <li>Music</li>
                <li>Philosophy</li>
                <li>Politics</li>
                <li>Economics</li>
                <li>History</li>
                <li>Open Source</li>
                <li>Really anything</li>
              </dd>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row ml-4 mr-4 gap-4 mb-4">
    <div class=" z text w" in:fade={{ delay: 2 * 150, duration: 300 }}>
      I think of music like Plato as practising the harmony of the soul. I enjoy
      to learning new instruments now knowing 7, those being instruments: <span
        id="ld"
        >Electric Bass, Contrabass, Guitar, Ukulele, Piano, Harmonica and Drums</span
      >. I also like to create music, both spontaneously with friends in jam
      sessions or by myself. You can find my music tastes on my
      <a href="https://open.spotify.com/user/b3oj8mjbyq5cfs26vp6c41ujr"
        >Spotify</a
      >
    </div>
    <div class=" z text w" in:fade={{ delay: 2 * 150, duration: 300 }}>
      I enjoy reading books and watching videos, whether it be youtube, films,
      tv shows or reels. I have a <a href="https://letterboxd.com/danielOkita/"
        >Letterboxd</a
      > account where I keep track of the movies I have watched and the ones I want
      to watch. I also have a Goodreads account where I keep track of the books I
      have read and the ones I want to read.
    </div>
  </div>

  <div class="text wrapper" in:fade={{ delay: 3 * 150, duration: 300 }}>
    <h1 class="z mb-4">Quotes I have come across the resonated with me</h1>
    <hr />
    <div class="carousel">
      <button class="nav-arrow left" on:click={prevQuote}>{"<"}</button>
      <div class="quote-container">
        {#key quoteKey}
          <div class="text-left p-5 m-auto">
            <h1 in:scale={{ delay: 200, duration: 200 }}>
              "{quotes[currentQuoteIndex].text}"
            </h1>
            <br />
            <h1
              in:scale={{ delay: 500, duration: 200 }}
              class="text-right font-bold"
            >
              {quotes[currentQuoteIndex].name}
            </h1>
          </div>
        {/key}
      </div>
      <button class="nav-arrow right" on:click={nextQuote}>{">"}</button>
    </div>
  </div>

  <div class="flex" in:fade={{ delay: 4 * 150, duration: 300 }}>
    <div class="text justify-center flex-col align-center ml-4 mb-4 w w-1/2">
      <div class="">
        <h1 class="z mb-4">Latin phrases that I like</h1>
        <hr />
        <div class="carousel">
          <button class="nav-arrow left" on:click={prevLatin}>{"<"}</button>
          <div class="quote-container">
            {#key latinKey}
              <div class="text-left p-5 m-auto">
                <h1 in:scale={{ delay: 200, duration: 200 }}>
                  {latin[currentLatinIndex].translation}
                </h1>
                <p
                  in:scale={{ delay: 350, duration: 200 }}
                  class="text-lg italic mt-2"
                >
                  "{latin[currentLatinIndex].text}"
                </p>
                <br />
                <h1
                  in:scale={{ delay: 500, duration: 200 }}
                  class="text-right font-bold"
                >
                  {latin[currentLatinIndex].author}
                </h1>
              </div>
            {/key}
          </div>
          <button class="nav-arrow right" on:click={nextLatin}>{">"}</button>
        </div>
      </div>
    </div>

    <div
      class="justify-center content-center mb-4 ml-4 mr-4 flex text w flex-col sm:flex-row w-1/2"
      in:fade={{ delay: 5 * 150, duration: 300 }}
    >
      <div class="flex flex-col sm:flex-row m-auto">
        <div class="m-auto t hover:scale-125 mb-4 sm:mb-0">
          <a href="https://open.spotify.com/user/b3oj8mjbyq5cfs26vp6c41ujr">
            <img
              class="w-[10rem] h-[4rem]"
              src="https://simpleicons.org/icons/spotify.svg"
            />
          </a>
        </div>
        <div class="m-auto t hover:scale-125">
          <a href="https://www.goodreads.com/user/show/155512706-stephen-okita">
            <img
              class="w-[10rem] h-[4rem]"
              src="https://simpleicons.org/icons/goodreads.svg"
            />
          </a>
        </div>
        <div class="m-auto t hover:scale-125">
          <a href="https://letterboxd.com/danielOkita/">
            <img
              class="w-[10rem] h-[4rem]"
              src="https://simpleicons.org/icons/letterboxd.svg"
            />
          </a>
        </div>
        <div class="m-auto t hover:scale-125">
          <a href="https://www.instagram.com/stephen.okita/">
            <img
              class="w-[10rem] h-[4rem]"
              src="https://simpleicons.org/icons/instagram.svg"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  {#if browser}
    <div class="grid grid-cols-1 md:grid-cols-2 mb-4">
      <div class="text wrapper1" in:fade={{ delay: 6 * 150, duration: 300 }}>
        <h1 class="z mb-4">This is a collection of my music musings:</h1>
        <hr />
        <br />
        <div class="carousel">
          <button class="nav-arrow left" on:click={prevMusic}>{"<"}</button>
          <div class="youtube-container">
            {#key musicKey}
              <div>
                <h1 class="text-center text-xl font-bold">
                  {music[currentMusicIndex].title}
                </h1>
                <br />
                <Youtube id={music[currentMusicIndex].id} />
              </div>
            {/key}
          </div>
          <button class="nav-arrow right" on:click={nextMusic}>{">"}</button>
        </div>
      </div>

      <div class="text wrapper2" in:fade={{ delay: 7 * 150, duration: 300 }}>
        <h1 class="z mb-4">This is a collection of my animations:</h1>
        <hr />
        <br />
        <div class="carousel">
          <button class="nav-arrow left" on:click={prevAnimation}>{"<"}</button>
          <div class="youtube-container">
            {#key animationKey}
              <div>
                <h1 class="text-center text-xl font-bold">
                  {animations[currentAnimationIndex].title}
                </h1>
                <br />
                <Youtube id={animations[currentAnimationIndex].id} />
              </div>
            {/key}
          </div>
          <button class="nav-arrow right" on:click={nextAnimation}>{">"}</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

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

  .w {
    justify-content: center;
    gap: 1rem;
    transition: all ease-in-out 200ms;
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
    .text {
      font-size: 0.75rem;
    }
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

  .z {
    transition: all ease-in-out 200ms;
  }
  .z:hover {
    border-left: 0.5rem solid var(--purple);
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
    border-top: 5px solid var(--bg);
    border-radius: 0.3rem;
  }
</style>
