<script>
  import "../../app.css";

  import personal from "./personal.json";
  import apps from "./apps.json";
  import libs from "./libs.json";
  import school from "./school.json";
  import workedOn from "./workedOn.json";
</script>

<div class="text-center">
  <h1 class="dis flex m-auto ">
    Disclaimer this is not a complete project list just the ones I have the time
    to copy over before I automate this
  </h1>
</div>
<div class="flex control flex-row">
  <div class="text flex">
    <div class="flex">
      <div class=" flex flex-col">
        <h1 class="text-center flex-row">Apps</h1>
        {#each apps as i}
          <div class="head">
            <a href={i.link} class="flex flex-col">
              <h1>Project Name: {i.projectName}</h1>
              <p>{i.description}</p>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex text">
    <div class=" flex flex-col">
      <h1 class="text-center flex-row">School</h1>
      {#each school as i}
        <div class="head">
          <a href={i.link} class="flex flex-col">
            <h1>Project Name: {i.projectName}</h1>
            <p>{i.description}</p>
          </a>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex text">
    <div class=" flex flex-col">
      <h1 class="text-center flex-row">Personal</h1>
      {#each personal as i}
        <div class="head">
          <a href={i.link} class="flex flex-col">
            <h1>Project Name: {i.projectName}</h1>
            <p>{i.description}</p>
          </a>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex text">
    <div class=" flex flex-col">
      <h1 class="text-center flex-row">Projects I've worked on</h1>
      {#each workedOn as i}
        <div class="head">
          <a href={i.link} class="flex flex-col">
            <h1>Project Name: {i.projectName}</h1>
            <p>{i.description}</p>
          </a>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex text">
    <div class=" flex flex-col">
      <h1 class="text-center flex-row">Libraries</h1>
      {#each libs as i}
        <div class="head">
          <a href={i.link} class="flex flex-col">
            <h1>Project Name: {i.projectName}</h1>
            <p>{i.description}</p>
          </a>
        </div>
      {/each}
    </div>
  </div>
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
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 1rem;
    font-size: small;
    margin: 1rem;
  }
  .dis {
    border-radius: 1rem;
    font-size: small;
    padding: 1rem;
    margin: 1rem;
    background-color: var(--fg);
  }
  code {
    font-style: italic;
  }

  @media (max-width: 750px) {
    .control {
      flex-direction: column;
    }
  }
</style>
