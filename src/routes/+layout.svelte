<script lang="ts">
  import "../app.css";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  inject({ mode: dev ? "development" : "production" });
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  injectSpeedInsights();
</script>

<div class="sub flex alight-center text-center">
  <a href="/" class="home">~/, </a>
  <a href="/aboutme" class="about">&nbsp /about, </a>
  <!-- <a href="/projects" class="projects">&nbsp projects, </a> -->
  <a href="/art" style="color: var(--cyan)">&nbsp /arts, </a>
  <a href="/blog" class="blog">&nbsp /blog</a>
</div>
<slot />

<div class="wrapper">
  <div class="text">
    <h1 class="text-center">
      Email me at <span class="underline">me@danielokita.com</span>
    </h1>
    <h1 class="text-center">
      Or find me on these places <h1>
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
        as well as the source code for this website <a
          class="s"
          href="https://github.com/TheArctesian/danielokita.com"> here</a
        >
      </h1>
    </h1>
  </div>
</div>

<style>
  .sub {
    margin: 1rem;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }
  a {
    margin: auto;
    text-decoration: none;
    font-size: 2vw;
    transition: all ease-in-out 400ms;
  }
  @media (max-width: 750px) {
    a {
      font-size: 3.7vw;
    }
  }
  .s {
    font-size: larger;
    font-style: italic;
    color: var(--comment);
  }
  a:hover {
    letter-spacing: 0.1em;
  }
  .home {
    color: var(--orange);
  }
  .about {
    color: var(--pink);
  }
  .projects {
    color: var(--purple);
  }
  .blog {
    color: var(--red);
  }
  :global(body) {
    background-color: var(--bg);
    font-family: "Fira Code", monospace;
  }
  .wrapper {
    font-size: small;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }
  .content {
    display: flex;
    justify-content: center;
    margin: 1rem;
    border-radius: 0.2rem;
  }
  .element {
    margin: 1rem;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 0.2rem solid var(--fg);
  }
  .element:hover {
    border: 0.2rem solid var(--purple);
  }

  @media (max-width: 750px) {
    .element {
      margin: 0.6rem;
      border-radius: 0rem;
      padding: 0rem;

      border: 0.2rem solid var(--fg);
    }
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }
  img {
    transition: all ease-in-out 200ms;
    width: 10vw;
  }
</style>
