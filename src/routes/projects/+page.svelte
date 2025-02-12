<script lang="ts">
  import "../../app.css";
  import Collapsible from "../../lib/Collapsible.svelte";
  import Project from "./project.svelte";
  import personal from "./personal.json";
  import apps from "./apps.json";
  import libs from "./libs.json";
  import school from "./school.json";
  import workedOn from "./workedOn.json";
  import { slide } from "svelte/transition";
</script>

<div class="text-center">
  <h1 class="dis">This is out of date from 2022. I will update this soon.</h1>
</div>
<div out:slide>
  <Project data={apps} name="Apps"></Project>
  <Project data={personal} name="Personal"></Project>
  <Project data={workedOn} name="Projects I have worked on"></Project>
  <Project data={libs} name="Libs"></Project>
  <Project data={school} name="School"></Project>
</div>

<style>
  .head {
    color: var(--black);
    border-radius: 1rem;
    padding: 1rem;
    border: 0.2rem solid var(--fg);
  }
  .head:hover {
    border: 0.2rem solid var(--pink);
  }
  img {
    width: 20rem;
  }
  h1 {
    font-weight: bold;
  }
  .rotate {
    transform: rotate(90deg);
    transition: 0.2s ease-in-out;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: small;
    margin: 1rem;
  }
  .dis {
    border-radius: 0.2rem;
    font-size: small;
    padding: 1rem;
    margin: 1rem;
    color: var(--red);
    background-color: var(--fg);
  }
  .code {
    font-style: italic;
  }

  @media (max-width: 1000px) {
    .control {
      flex-direction: column;
    }
  }
</style>
