<script>
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
  import writings from "./political.json";
</script>

<div class="flex flex-wrap">
  <div class="head flex flex-col">
    <h1 class="text">Political</h1>
    <div class="flex flex-col margin-auto">
      {#each writings as i}
        <div class=" text flex flex-col">
          <div class="text-xl ">
            <h1>{i.title}</h1>
            <h1 class="text-l">Date: {i.date}</h1>
            <h1 class="text-l">Abstract: {i.abstract}</h1>
          </div>
          <br />
          {#each i.content as x}
            <p class="text-m float-left">{x}</p>
            <br />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
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
    border-radius: 1rem;
    font-size: small;
    margin: 1rem;
  }
</style>
