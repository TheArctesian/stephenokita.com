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
    <div class="flex card-holder">
      {#each writings as i}
        <div class="case-holder flex" >
          <Content data={i} />
          <br />
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- <BlogEntery /> -->
<style>
  .head {
    width: 100%;
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
