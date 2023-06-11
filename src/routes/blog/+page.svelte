<script lang="ts">
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
  import Content from "./content.svelte";
  import writings from "./content.json";

  // function show(): any{
  //   let element: Element | null= document.querySelector('.content');
  //   element.style.display = "flex"
  // }
</script>

<div class="flex flex-wrap">
  <div class="head flex flex-col">
    <div class="flex card-holder margin-auto">
      {#each writings as i}
        <div class="case-holder flex ">
          <Content data={i}></Content>
          <br />
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- <BlogEntery /> -->
<style>
  .tit {
    margin: auto;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: small;
    font-size: large;
    text-align: center;
    margin: 1rem;
  }
  .head {
    margin: auto;
    width: 100%;
  }
  a {
    font-size: larger;
    font-weight: bold;
  }
  img {
    width: 20rem;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    width: fit-content;
    font-size: small;
    margin: 1rem;
  }

  .card {
    flex-direction: column;
  }
  .card-holder {
    margin: 1rem;
    padding: 1rem;
    background-color: var(--fg);
    flex-direction: column;
  }
  @media (max-width: 750px) {
    .card-holder {
      flex-direction: column;
    }
  }
</style>
