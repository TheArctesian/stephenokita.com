<script>
  import "../../app.css";
  import { browser } from "$app/environment";
  import Carousel from "svelte-carousel";
  import Youtube from "svelte-youtube-embed";
  import music from "./music.json";
  import quotes from "./quotes.json";
  import animations from "./animations.json";
  import casper from "./imgs/Caspar_David_Friedrich’s_Wanderer_above_the_Sea_of_Fog_with_a_sea_of_buildings.png";
  let carousel; // for calling methods of the carousel instance
  const handleNextClick = () => {
    carousel.goToNext();
  };
</script>

{#if browser}
  <div class="text wrapper">
    <h1>Quotes that I really like</h1>
    <Carousel bind:this={carousel} let:loaded autoplay autoplayDuration={10000}>
      {#each quotes as q}
        <div class="text-center p-5 m-auto">
          <h1>"{q.text}"</h1>
          <br />
          <h1 class="text-right">- {q.name}</h1>
        </div>
      {/each}
    </Carousel>
  </div>

  <div class="text wrapper">
    <h1 class="text-center">
      This is a collection of my music musings, these are not structured songs
      but just cool sounds I make while fooling around
    </h1>
    <div>
      <Carousel bind:this={carousel} let:loaded>
        {#each music as song}
          <div class="">
            <h1 class="text-center text-xl font-bold">{song.title}</h1>
            <Youtube id={song.id} />
          </div>
        {/each}
      </Carousel>
    </div>
  </div>

  <div class="text wrapper">
    <h1>This is a collection of my cool AI img's I generated</h1>
    <div class="img">
      <h1>
        Caspar David Friedrich’s Wanderer above the Sea of Fog but replace the
        fog with the lights of a metropolis
      </h1>
      <img src={casper} />
    </div>
  </div>

  <div class="text wrapper">
    <h1>This is a collection of my animations</h1>
    <div>
      <Carousel bind:this={carousel} let:loaded>
        {#each animations as anim}
          <div class="">
            <h1 class="text-center text-xl font-bold">{anim.title}</h1>
            <br />
            <Youtube id={anim.id} />
          </div>
        {/each}
      </Carousel>
    </div>
  </div>
{/if}

<!-- <div class="text wrapper">
  <h1>These are some cool photos I have seen in the wild</h1>
</div> -->
<style>
  .img {
    margin: 1rem;
    display: flex; /* Establishes this div as a flex container */
    flex-direction: column;
    justify-content: center; /* Centers the content horizontally */
    align-items: center;
    font-weight: bold;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }
  .wrapper {
    font-size: small;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }
  .content {
    display: flex;
    justify-content: center;
    margin: 1rem;
    border-radius: 0.2rem;
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
</style>
