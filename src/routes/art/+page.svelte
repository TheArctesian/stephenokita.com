<script lang="ts">
  import "../../app.css";
  import casper from "./imgs/Caspar_David_Friedrich’s_Wanderer_above_the_Sea_of_Fog_with_a_sea_of_buildings.png";
</script>

<div class="text wrapper">
  <h1>This is a collection of my music musings</h1>
</div>

<div class="text wrapper">
  <h1>This is a collection of my cool AI img's I generated</h1>
  <div class="img">
    <h1>
      Caspar David Friedrich’s Wanderer above the Sea of Fog but replace the fog
      with the lights of a metropolis
    </h1>
    <img src={casper} />
  </div>
</div>

<div class="text wrapper">
  <h1>This is a collection of my animations</h1>
</div>

<div class="text wrapper">
  <h1>These are some cool photos I have seen in the wild</h1>
</div>

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
