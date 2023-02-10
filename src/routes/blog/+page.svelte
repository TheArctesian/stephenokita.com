<script lang="ts">
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
  import BlogEntery from "../../lib/components/blogEntery.svelte";

  type article = { 
    title: string;
    date: string;
    abstract: string;
    content: string[];
  }
  import writings from "./political.json";

  // function show(): any{
  //   let element: Element | null= document.querySelector('.content');
  //   element.style.display = "flex"
  // }
</script>

<div class="flex flex-wrap">
  <div class="head flex flex-col">
    <h1 class="font-bold tit">Political</h1>
    <div class="flex card-holder margin-auto" >
      {#each writings as i}
        <div class="card text flex" >
          <div class="">
            <h1 class="text-lg font-bold">{i.title}</h1>
            <br />
            <h1 class="text-base"><b>Date:</b> {i.date}</h1>
            <h1 class="text-base"><b>Abstract: </b>{i.abstract}</h1>
          </div>
          <br />
          <div class="content flex-col float-left">
            {#each i.content as x}
              <p class="text-m float-left">{x}</p>
              <br />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- <BlogEntery /> -->
<style>
  .tit {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: small;
    font-size: large;
    text-align: center;
    margin: 1rem;
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
  .content { 
  }
  .card {
    flex-direction: column;
  }
  .card:hover{
    background-color: var(--red);
  }
  .card-holder {
  }

  @media (max-width: 750px) {
    .card-holder {
      flex-direction: column;
    }
  }
</style>
