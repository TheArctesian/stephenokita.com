<script lang="ts">
  import "../../app.css";

  import { elasticIn } from "svelte/easing";
  import { blur, fade, fly, slide } from "svelte/transition";
  import web from "./web.json";
  import api from "./api.json";
  import languages from "./languages.json";
  import server from "./server.json";
  import database from "./database.json";
  import creative from "./creative.json";
  import analytics from "./anayltics.json";
  import instruments from "./instrument.json";
  import language from "./language.json";
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div out:slide>
  <div
    class="flex md:flex-row flex-col"
    in:fade={{ delay: 0 * 150, duration: 300 }}
  >
    <div
      class="bg-[var(--fg)] mb-4 md:mb-0 p-4 mr-4 ml-4 flex flex-col justify-center items-center"
    >
      <span class="text-d-orange sm:text-2xl mb-2 font-bold text-xl"
        >Resume</span
      >
      <div class="">
        <a href="/other/Stephen Okita Resume 2024.pdf" target="_blank">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135785.png"
            alt="Resume"
          />
        </a>
      </div>
    </div>
    <div class="bg-[var(--fg)] p-4 mr-4 ml-4 md:ml-0">
      <p>
        Here describes the technical skills I have, mainly as a developer.
        Broadly I am truly full stack Web, Mobile, App, Game Dev along with the
        interfacing (APIs). I have worked with most database architectures and
        as ontological exercise have attempted to build my own. I run Linux and
        am familiar with most cloud service as well as love self hosting.
        Knowing all this requires also the ability to build your own
        servers/computers and contemplate hardware. This all culminates in a
        certain understanding of Cyber Security. I have quite a lot of
        experience and love for decentralised/distributed system whether that be
        Crypto or broader IPFS/Web 3 stuff. I am somewhat of an artists being
        quite experienced in Music and 3D art. I have worked with AI desinging
        my own classification library and currently do a lot of work with RAG
        and other vector DB interfacing with LLMs.
      </p>
    </div>
  </div>

  <div class="text" in:fade={{ delay: 1 * 150, duration: 300 }}>
    <p class="text-xl font-bold">Programming Languages:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      {#each languages as language}
        <div class="m-2 flex flex-col text-center">
          <img
            src={language.img}
            class="hover:scale-110 hover:invert-[20%] transition-all"
          />
          {language.text}
        </div>
      {/each}
    </div>
  </div>

  <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
    <p class="text-xl font-bold">App Development:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      {#each web as w}
        <div class="m-2 flex flex-col text-center">
          <img
            src={w.img}
            class="hover:scale-110 hover:invert-[20%] transition-all"
          />
          {w.text}
        </div>
      {/each}
    </div>
  </div>
  <div class="flex md:flex-row flex-col">
    <div
      class="bg-[var(--fg)] p-4 ml-4 rounded-[0.2rem] mr-4 md:w-1/2 md:mb-0 mb-4"
      in:fade={{ delay: 3 * 150, duration: 300 }}
    >
      <p class="text-xl font-bold">API:</p>
      <div class="m-4 flex justify-between items-center flex-wrap">
        {#each api as w}
          <div class="m-2 flex flex-col text-center">
            <img
              src={w.img}
              class="hover:scale-110 hover:invert-[20%] transition-all"
            />
            {w.text}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="bg-[var(--fg)] p-4 rounded-[0.2rem] mr-4 md:w-1/2 ml-4 md:ml-0"
      in:fade={{ delay: 4 * 150, duration: 300 }}
    >
      <p class="text-xl font-bold">Analytics Tools:</p>
      <div class="m-4 flex justify-between items-center flex-wrap">
        {#each analytics as w}
          <div class="m-2 flex flex-col text-center">
            <img
              src={w.img}
              class="hover:scale-110 hover:invert-[20%] transition-all"
            />
            {w.text}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="text" in:fade={{ delay: 5 * 150, duration: 300 }}>
    <p class="text-xl font-bold">Server & Hosting:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      {#each server as w}
        <div class="m-2 flex flex-col text-center">
          <img
            src={w.img}
            class="hover:scale-110 hover:invert-[20%] transition-all"
          />
          {w.text}
        </div>
      {/each}
    </div>
  </div>

  <div class="text" in:fade={{ delay: 6 * 150, duration: 300 }}>
    <p class="text-xl font-bold">Databases:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      {#each database as w}
        <div class="m-2 flex flex-col text-center">
          <img
            src={w.img}
            class="hover:scale-110 hover:invert-[20%] transition-all"
          />
          {w.text}
        </div>
      {/each}
    </div>
  </div>

  <div class="text" in:fade={{ delay: 7 * 150, duration: 300 }}>
    <p class="text-xl font-bold">Creative Tools:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      {#each creative as w}
        <div class="m-2 flex flex-col text-center">
          <img
            src={w.img}
            class="hover:scale-110 hover:invert-[20%] transition-all"
          />
          {w.text}
        </div>
      {/each}
    </div>
  </div>

  <div class="text" in:fade={{ delay: 8 * 150, duration: 300 }}>
    <p class="text-xl font-bold">My preferred development stacks</p>
    <p>
      <b>OS:</b> Linux: Arch or Zorin OS depending on which computer I am using.
      I use Gnome for the most part with qtile and xmonad for intense work.
    </p>
    <p>
      <b>IDE:</b> Cursor for easy projects, VSCodium for very large project and Neovim
      for quick edits or low level code. All of course with the Vim plugin enabled.
    </p>
    <p>
      <b>Backend:</b> I always prefer to selfhost but for websites that need to be
      up all the time (like this one) I host on Vercel. Otherwise it's a mix of Portainer,
      Nginx Proxy Manager, Cloudflare on whatever computer I can find.
    </p>
    <p>
      <b>Database:</b> Vector DB: qDrant, Relational: Supabase, Document: Mongo.
    </p>
    <p>
      <b>API:</b> I like using GoFiber but for smaller projects will just write a
      flask API then transfer to Go in production. For work tho I usually just use
      whatever API framework is setup for that front end framework, whether it be
      Axios, Prisma or raw Next.
    </p>
    <p>
      <b>Frontend:</b> Svelte for personal, React for team work. CSS fully managed
      by Tailwind. Flutter for mobile.
    </p>
    <p>
      <b>AI:</b> Claude for LLM, whatever the top Ollama llm is for AI apps, qdrant
      for vector database and langchain to link everything. Then the usual python
      libs for manual AI.
    </p>
    <p>
      <b>Analytics:</b> Posthog is by far the best.
    </p>
  </div>
</div>
<div class="text" in:fade={{ delay: 9 * 150, duration: 300 }}>
  <p class="text-xl font-bold">Instruments:</p>
  <div class="m-4 flex justify-between items-center flex-wrap">
    {#each instruments as w}
      <div class="m-2 flex flex-col text-center">
        <img
          src={w.img}
          class="hover:scale-110 hover:invert-[20%] transition-all"
        />
        {w.text}
      </div>
    {/each}
  </div>
</div>
<div class="text" in:fade={{ delay: 10 * 150, duration: 300 }}>
  <p class="text-xl font-bold">Creative Tools:</p>
  <div class="m-4 flex justify-between items-center flex-wrap">
    {#each language as w}
      <div class="m-2 flex flex-col text-center">
        <img
          src={w.img}
          class="hover:scale-110 hover:invert-[20%] transition-all"
        />
        {w.text}
      </div>
    {/each}
  </div>
</div>

<style>
  img {
    width: 3rem;
    margin: auto;
  }
  .btn {
    width: fit-content;
    background-color: var(--purple);
    border: none;
    padding: 1rem;
    border-radius: 0.2rem;
    color: white;
    cursor: pointer;
  }
  .code {
    font-style: italic;
    color: var(--comment);
    transition: all ease-in-out 200ms;
  }
  /* Darker background on mouse-over */
  .btn:hover {
    background-color: RoyalBlue;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: small;
    margin: 1rem;
  }
</style>
