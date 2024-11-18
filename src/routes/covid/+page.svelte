<script>
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
</script>

<div class="wrapper">
  <div class="header flex text-center flex-col">
    <Typewriter interval="100">
      <p1 class="margin-auto text-center">sam grot gay, big farma made money off vacine qed they made covid</p1>
    </Typewriter>
  </div>
</div>

<style>
  a {
    font-style: italic;
    color: var(--comment);
    transition: all ease-in-out 200ms;
  }

  .code {
    font-style: italic;
    color: var(--comment);
    transition: all ease-in-out 200ms;
  }
  .wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }
  .contWrapper {
    display: flex;
  }
  .content {
    display: flex;
    justify-content: center;
    margin: 1rem;
    border-radius: 0.2rem;
    margin: auto;
  }
  img {
    border-radius: 1rem;
  }
  .element {
    margin: 1rem;
  }
  .txt {
    font-size: small;
  }
  #hk {
    color: var(--red);
  }
  #ir {
    color: var(--green);
  }
  .been {
    width: 50%;
    margin: auto;
  }
  #ld {
    color: var(--comment);
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    text-align: center;
    border-radius: 0.2rem;
    font-size: small;
    margin: 1rem;
  }
  .globe {
    width: 7rem;
  }

  .daniel {
    font-weight: bold;
    color: var(--red);
  }
  .img {
    margin: auto;
    border-radius: 0.2rem;
    animation: fadeIn 5s;
    width: 39%;
  }
  .cen {
    text-align: center;
  }
  .header {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    margin: 1rem;
    transition: all ease-in-out 200ms;
  }
  @media (max-width: 750px) {
    .head {
      height: fit-content;
      flex-direction: column;
    }
    .header {
      margin-top: 0.2;
    }
    .img {
      width: fit-content;
      height: fit-content;
    }
    .l {
      display: none;
    }
    .ilike {
      flex-direction: column;
    }
    .contWrapper {
      display: block;
    }
  }
</style>
