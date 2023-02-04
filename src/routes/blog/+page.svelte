<script>
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
</script>

<div class="text flex flex-wrap">
  <div class="head flex flex-col m-auto">
    <a href="/blog/writings">general writings</a>
    <a href="/blog/writings"
      ><img
        src="https://img.icons8.com/ios/512/hand-with-pen.png"
        alt="book glif"
      />
    </a>
  </div>
  <div class="head flex flex-col  m-auto">
    <a href="/blog/computers">on computers</a>
    <a href="/blog/computers"
      ><img
        src="https://img.icons8.com/wired/512/processor.png"
        alt="book glif"
      /></a
    >
  </div>
  <div class="head flex flex-col  m-auto">
    <a href="/blog/lit">on literature</a>
    <a href="/blog/lit">
      <img
        src="https://img.icons8.com/ios-glyphs/512/open-book.png"
        alt="book glif"
      />
    </a>
  </div>
  <div class="head flex flex-col  m-auto">
    <a href="/blog/media">on media</a>
    <a href="/blog/media">
      <img
        src="https://img.icons8.com/ios-filled/512/frame-rate.png"
        alt="book glif"
      />
    </a>
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
    border: 0.2rem solid var(--orange);
  }
  a {
    font-size: larger;
    font-weight: bold;
  }
  img {
    width: 20rem;
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
