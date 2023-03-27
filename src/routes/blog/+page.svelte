<script lang="ts">
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
  import BlogEntery from "../../lib/components/blogEntery.svelte";

  type article = {
    title: string;
    date: string;
    abstract: string;
    content: string[];
  };
  import writings from "./political.json";

  // function show(): any{
  //   let element: Element | null= document.querySelector('.content');
  //   element.style.display = "flex"
  // }
</script>

<div class="flex flex-wrap">
  <div class="head flex flex-col">
    <h1 class="font-bold tit">All posts (WORK IN PROGRESS)</h1>
    <div class="flex card-holder margin-auto">
      {#each writings as i}
        <div class="case-holder flex text-center">
          <h1 class="text-lg">{i.date}: &ensp;   </h1>
          <h1 class="text-lg font-bold">{i.title}</h1>
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
