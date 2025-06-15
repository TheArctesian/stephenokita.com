<script lang="ts">
  import "../../app.css";
  import Project from "./project.svelte";
  import projects from "./projects.json";
  import work from "./work.json";
  import personal from "./personal.json";
  import published from "./published.json";
  import libs from "./libs.json";
  import school from "./school.json";
  import { slide, fade } from "svelte/transition";
  import Published from "./published.svelte";
</script>

<div out:slide in:fade={{ delay: 0 * 150, duration: 300 }}>
  <Project
    data={work}
    wait="0"
    delay="0"
    name="Professional Work"
  ></Project>
  <Published data={published} wait="1" delay={work.length}></Published>
  <Project delay="2" wait={work.length} data={projects} name="Projects"
  ></Project>
  <Project
    delay="3"
    wait={projects.length + work.length}
    data={personal}
    name="Personal Projects"
  ></Project>
  <Project
    delay="4"
    wait={personal.length + projects.length + work.length}
    data={libs}
    name="Libraries"
  ></Project>
  <Project
    delay="5"
    wait={libs.length + personal.length + projects.length + work.length}
    data={school}
    name="School Projects"
  ></Project>
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
