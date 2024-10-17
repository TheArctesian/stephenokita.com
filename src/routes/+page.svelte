<script>
  import "../app.css";
  import Typewriter from "svelte-typewriter";
</script>

<div class="head flex flex-col">
  <div class="header text">
    <p2>
      Hello my name is <span class="daniel">Stephen Okita,</span>
      welcome to my website. I am a FOSS programmer looking to understand and change
      the world!
    </p2>
  </div>
  <div class="header text">
    <p2>
      If you would for some reason wish to know more about me this website is
      for you!
      <br />
      <br />
      The structure of this website in a way that might be a little deceiving.
      <br />
      <br />
      <a href="/home" class="code">`home`</a> => The story of my background,
      where I from, what I am according to myself.
      <br />
      <br />
      <a href="/aboutme" class="code">`about me’</a> => The superficial
      approach, the quantifiable achievements and skills that i have that make
      me of value to society or you.
      <br />
      <br />
      <a href="/projects" class="code">`projects’</a> => this is a collection of my
      projects that I have worked on in the past
      <br />
      <br />
      <a href="/art" class="code">`art’</a> => this is a collection of my
      artistic musings
      <br />
      <br />
      <a href="/blog" class="code">`blog’</a> => does not need explanation and
      is simply the place I ramble into the oblivion.
      <br />
      <br />
      So that is to say once you leave this page unless you change the domain to
      <span class="code">`/`</span> you will not get back to this wall of text.
    </p2>
  </div>
</div>

<style>
  .text {
    overflow: hidden;
  }
  img {
    border-radius: 0.2rem;
    animation: fadeIn 5s;
    margin: auto;
    width: 39%;
  }
  .header {
    height: fit-content;
    margin: auto;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 1rem;
  }
  .daniel {
    font-weight: bold;
    color: var(--red);
  }
  .code {
    font-style: italic;
    color: var(--comment);
    transition: all ease-in-out 200ms;
  }
  .code:hover {
    transition: all ease-in-out 200ms;
    font-style: normal;
    letter-spacing: 0.3em;
  }
  @media (max-width: 750px) {
    .head {
      height: fit-content;
      flex-direction: column;
    }
    .header {
      margin-top: 0.2;
    }
    img {
      width: auto;
      height: auto;
    }
  }
</style>
