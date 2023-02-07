<script lang="ts">
  import "../../app.css";
  export let title: String;
  export let date: String;
  export let content: String;
</script>

<div class=" flex flex-col">
  <div class="head flex flex-col">
    <h1 class="text-2xl">Title: {title}</h1>
    <h1 class="text-xl">Date: {title}</h1>
    <p class="text-xl">{content}</p>
  </div>
</div>

<style>
  .head:hover {
    border: 0.2rem solid var(--red);
  }
  .head {
    color: var(--black);
    border-radius: 1rem;
    padding: 1rem;
    border: 0.2rem solid var(--fg);
  }
  h1 {
    font-weight: bold;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    font-size: small;
    margin: 1rem;
  }
</style>
