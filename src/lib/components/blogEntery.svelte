<script lang="ts">
  import "../../app.css";
  export let title: String = "Some text here";
  export let date: String = "29 asd asd";
  export let content: String[] = ["Quisque lorem tortor. Aliquam eratac May 1, 2014. Curabitur et ligula April 29, 2014. 71. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi aliquam ..."];
</script>

  <div class="head text ov flex flex-col">
    <h1 class="text-2xl float-left">Title: {title}</h1>
    <h1 class="text-xl">Date: {title}</h1>
    <br>
    {#each content as x}
      <p class="text-m float-left">{x}</p>
      <br />
    {/each}
</div>

<style>
  .ov{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
 }
  .head:hover {
  }
  .head {
    color: var(--black);
    border-radius: 1rem;
  }
  h1 {
    font-weight: bold;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 2rem;
  }
</style>
