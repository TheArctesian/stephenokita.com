<script>
  import "../../app.css";
  import Typewriter from "svelte-typewriter";
</script>

<div class="wrapper">
  <div class="text flex">
    <Typewriter interval="100">
      <p1 class="cen"
        >hello my name is <span class="daniel"
          >Stephen Daniel Okita-O'Riordan</span
        ></p1
      >
    </Typewriter>
  </div>
  <div class="header flex text-center flex-col">
    <div class="flex img flex-row">
      <img
        alt="A photo with me wearing glasses"
        src="/images/glasses.jpg"
        class="shadow-2xl flex-shrink"
      />
      <br />
    </div>
    <Typewriter interval="100">
      <p1 class="margin-auto text-center">A photo of me with cool glasses</p1>
    </Typewriter>
  </div>
  <div class="contWrapper">
    <div class="header flex grow-1">
      <div class="float-right grow txt ">
        I currently live in <span id="hk"> Hong Kong</span>,
        I grew up in <span id="hk"> Hong Kong</span>,
        I was born in <span id="ld">London</span>,
        my mother is from <span id="ir">Ireland</span>, 
        my father is <span id="ld">American</span>-<span id="hk">Japanese</span
        >.
        I can communicate in <span id="hk">中文</span>, English,
        <span id="hk">廣東話(广东话)</span>, and
        <span id="ld">français</span>
        and <span id="hk">廣東話</span>,
        I am also learning <span id="hk">spanish.</span>
      </div>
     
    </div>

    <div class="header txt flex">
      <p>
        in addition to learning about programming, which you can read all about <a
          href="/aboutme"
          class="code">here</a
        >, i enjoy learning in general. my learning takes many forms and many
        directions.
      </p>
    </div>
    <div class="header ilike flex flex-col">
      <p class="txt">
        it can take the form of learning about the world. Both in reading the
        histories of the world and travailing it. You can find a list of these
        places on this <a href="https://world.danielokita.com">experimental website.</a>
      </p>
    </div>

    <div class="header flex flex-col">
      <div class=" grow txt">
        it can take form through Music. I enjoy to learning new instruments
        right now knowing 7, those being instruments: <span id="ld"
          >Electric Bass, Contrabass, Guitar, Ukulele, Piano, Harmonica and
          Drums</span
        >. I also like to create music, both spontaneously with friends in jam
        sessions or by myself.
      </div>
    </div>
    <div class="header txt flex flex-col">
      <div>
        <p>
          but usually it is through reading or watching things. i love to read
          books on political-economy, philosophy and history. as well as classic
          literature. you can find more about those either in the <a
            href="/blog"
            class="code">`blog’</a
          > or at the links below.
        </p>
      </div>
      <div class="wrap">
        <div class="content">
          <div class="element code c">
            Good Reads
            <a
              href="https://www.goodreads.com/user/show/155512706-stephen-okita"
            >
              <img src="https://simpleicons.org/icons/goodreads.svg" />
            </a>
          </div>
          <div class="element code">
            Letter Box
            <a href="https://letterboxd.com/danielOkita/">
              <img src="https://simpleicons.org/icons/letterboxd.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
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
