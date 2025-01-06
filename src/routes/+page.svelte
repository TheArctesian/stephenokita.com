<script>
  import "../app.css";
  import Typewriter from "svelte-typewriter";
  import { blur, fade } from "svelte/transition";
</script>

<div out:blur>
  <div class="hello flex flex-col">
    <Typewriter
      text="Hello"
      options={{
        mode: "loop",
        delay: 10,
        wordInterval: 100,
        interval: 100,
      }}
    ></Typewriter>
    <div>
      <!-- <h1>
        my name is <span class="d-purple">Stephen Okita,</span> welcome to my website.
      </h1> -->
      <div class="flex gap-1 m-auto">
        <div class="flex flex-col leading-none">
          <h1>I am</h1>
          <h1>I am</h1>
          <h1>I am</h1>
          <h1>I am</h1>
          <h1>I am</h1>
        </div>
        <div class="flex flex-col">
          <div class="text-bold text-8xl t hover:text-d-red">Stephen</div>
          <div
            class="  text-5xl text-right w-full t hover:text-d-bg hover:text-8xl"
          >
            Daniel
          </div>
        </div>
        <div class="text-center flex flex-col leading-[0.1rem]">
          <h1 class="text-d-red t hover:text-d-bg hover:text-6xl text-5xl">
            Okita
          </h1>
          <h1 class="text-d-red t hover:text-d-bg hover:text-4xl text-5xl">
            Okita
          </h1>
          <h1 class="text-d-red t hover:text-d-bg hover:text-6xl text-5xl">
            Okita
          </h1>
        </div>
        <div>
          <div class="t hover:text-d-red text-5xl">沖</div>
          <div class="t hover:text-d-red text-5xl">田</div>
          <div class="t hover:text-d-red text-5xl">勇</div>
        </div>
        <div class="flex flex-col leading-1">
          <div class="flex flex-col leading-[0.9rem]">
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
          </div>
          <div class="flex flex-col leading-[0.6rem]">
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
          </div>
           <div class="flex flex-col leading-[0.4rem]">
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
          </div>
           <div class="flex flex-col leading-[0.2rem]">
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
            <h1>我是</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hello {
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    margin: 1rem;
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
  }

  .t {
    transition: all ease-in-out 200ms;
  }
</style>
