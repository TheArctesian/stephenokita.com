<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  inject({ mode: dev ? "development" : "production" });
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  injectSpeedInsights();
</script>

<div class="sub flex alight-center text-center">
  <a href="/" class="text-d-orange">~/, </a>
  <a href="/skills" class="text-d-pink">&nbsp /skills, </a>
  <a href="/person" class="text-d-purple">&nbsp /person, </a>
  <a href="/projects" class="projects">&nbsp /projects, </a>
  <a href="/blog" class="text-d-red">&nbsp /blog</a>
</div>

<slot />

<div class="wrapper">
  <div class="text">
    <h1 class="text-center">
      Email me at <span class="underline">me@danielokita.com</span>
    </h1>
    <h1 class="text-center">
      <h1>
        <div class="content">
          <div class="element">
            <a href="https://www.linkedin.com/in/stephen-okita/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png"
              />
            </a>
          </div>
          <div class="element">
            <a href="https://github.com/TheArctesian">
              <img src="https://simpleicons.org/icons/github.svg" />
            </a>
          </div>
          <div class="element">
            <a href="https://www.instagram.com/stephen.okita/">
              <img src="https://simpleicons.org/icons/instagram.svg" />
            </a>
          </div>
        </div>
        as well as the source code for this website&nbsp<a
          class="s"
          href="https://github.com/TheArctesian/danielokita.com"
        >
          here</a
        >
      </h1>
    </h1>
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--bg);
    font-family: "Fira Code", monospace;
  }

  .sub {
    margin: 1rem;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-weight: 500;
  }

  a {
    margin: auto;
    text-decoration: none;
    font-size: 2vw;
    transition: all ease-in-out 400ms;
  }

  a:hover {
    letter-spacing: 0.2em;
  }

  .s {
    font-size: larger;
    font-style: italic;
    color: var(--comment);
  }

  .wrapper {
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    width: 100%;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 2rem 0;
  }

  .element {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .element a {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  img {
    width: 100%;
    max-width: 10vw;
    transition: all ease-in-out 200ms;
  }

  .element:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    a {
      font-size: 3.5vw;
    }

    img {
      max-width: 15vw;
    }

    .content {
      gap: 1rem;
    }
  }

  @media (max-width: 500px) {
    a {
      font-size: 3vw;
    }
    a:hover {
      letter-spacing: 0.1em;
    }
  }
</style>
