<script>
  import "../../../app.css";
  import Typewriter from "svelte-typewriter";
  import writings from "./writings.json";
</script>

<div class="flex flex-col">
  {#each writings as i}
    <div class=" text flex flex-col">
      <div class="text-xl text-center">
        <h1>{i.title}</h1>
        <h1 class="text-l">Date: {i.date}</h1>
      </div>
      <br>
      <p class="text-m float-left">{i.content}</p>
    </div>
  {/each}
</div>

<style>
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 1rem;
    font-size: small;
    margin: 1rem;
  }

  h1 {
    font-weight: bold;
  }
</style>
