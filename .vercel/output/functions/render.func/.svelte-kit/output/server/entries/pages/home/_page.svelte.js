import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
/* empty css                   */import { T as Typewriter } from "../../../chunks/Typewriter.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".code.svelte-1c2vu9e{font-style:italic;color:var(--comment);transition:all ease-in-out 200ms}.wrap.svelte-1c2vu9e{display:flex;justify-content:center;flex-direction:column;align-items:center;margin:1rem}.content.svelte-1c2vu9e{display:flex;justify-content:center;margin:1rem;border-radius:2rem;margin:auto}img.svelte-1c2vu9e{border-radius:1rem}.element.svelte-1c2vu9e{margin:1rem}.txt.svelte-1c2vu9e{font-size:small}#hk.svelte-1c2vu9e{color:var(--red)}#ir.svelte-1c2vu9e{color:var(--green)}#ld.svelte-1c2vu9e{color:var(--comment)}.text.svelte-1c2vu9e{background-color:var(--fg);padding:1rem;text-align:center;border-radius:1rem;font-size:small;margin:1rem}.globe.svelte-1c2vu9e{width:7rem}.daniel.svelte-1c2vu9e{font-weight:bold;color:var(--red)}.img.svelte-1c2vu9e{margin:auto;border-radius:1rem;animation:fadeIn 5s;width:39%}.header.svelte-1c2vu9e{background-color:var(--fg);padding:1rem;border-radius:1rem;margin:1rem;transition:all ease-in-out 200ms}@media(max-width: 750px){.header.svelte-1c2vu9e{margin-top:0.2}.img.svelte-1c2vu9e{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content}.l.svelte-1c2vu9e{display:none}.ilike.svelte-1c2vu9e{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"wrapper"}"><div class="${"text flex svelte-1c2vu9e"}">${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: "100" }, {}, {
    default: () => {
      return `<p1 class="${"text-center"}">hello my name is <span class="${"daniel svelte-1c2vu9e"}">Stephen Okita-<span id="${"ir"}" class="${"svelte-1c2vu9e"}">O&#39;Riordan</span></span></p1>`;
    }
  })}</div>
    <div class="${"header flex text-center flex-col svelte-1c2vu9e"}"><div class="${"flex img flex-row svelte-1c2vu9e"}"><img alt="${"A photo with me wearing glasses"}" src="${"/images/glasses.jpg"}" class="${"shadow-2xl flex-shrink svelte-1c2vu9e"}">
            <br></div>
        ${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: "100" }, {}, {
    default: () => {
      return `<p1 class="${"margin-auto text-center"}">A photo of me with cool glasses</p1>`;
    }
  })}</div>
    <div class="${"header flex flex-row svelte-1c2vu9e"}"><div class="${"float-right grow txt margin-auto svelte-1c2vu9e"}">i currently live in <span id="${"hk"}" class="${"svelte-1c2vu9e"}">Hong Kong</span>, <br>
            i was born in <span id="${"ld"}" class="${"svelte-1c2vu9e"}">London</span>,<br>
            my mother is from <span id="${"ir"}" class="${"svelte-1c2vu9e"}">Ireland</span>, <br>
            my father is <span id="${"ld"}" class="${"svelte-1c2vu9e"}">American</span>-<span id="${"hk"}" class="${"svelte-1c2vu9e"}">Japanese</span>. <br>
            i can communicate in <span id="${"hk"}" class="${"svelte-1c2vu9e"}">中文</span>, English,
            <span id="${"ld"}" class="${"svelte-1c2vu9e"}">français</span>
            and <span id="${"hk"}" class="${"svelte-1c2vu9e"}">廣東話</span>, <br>
            i am also learning <span id="${"hk"}" class="${"svelte-1c2vu9e"}">spanish</span></div>
        <div class="${"l svelte-1c2vu9e"}"><img src="${"https://img.icons8.com/ios-filled/512/globe-earth.png"}" alt="${"globe"}" class="${"globe svelte-1c2vu9e"}"></div></div>

    <div class="${"header txt flex flex-row svelte-1c2vu9e"}"><p>in addition to learning about programming, which you can read all
            about <a href="${"/aboutme"}" class="${"code svelte-1c2vu9e"}">here</a>, i enjoy learning in
            general. my learning takes many forms and many directions.
        </p></div>
    <div class="${"header ilike flex flex-col svelte-1c2vu9e"}"><p class="${"txt svelte-1c2vu9e"}">it can take the form of learning about the world. both in reading
            the histories of the world and travailing it.
        </p>
        <div class="${""}"><img src="${"/images/been.JPG"}" alt="${"the place I have been in the world"}" class="${"been svelte-1c2vu9e"}">
            <p class="${"txt text-center svelte-1c2vu9e"}">attached here is the export of my <a class="${"code svelte-1c2vu9e"}" src="${"https://apparata.se/apps/been/"}">been app</a></p></div></div>

    <div class="${"header flex flex-row svelte-1c2vu9e"}"><div class="${"grow txt  svelte-1c2vu9e"}">it can take form through Music. I enjoy to learning new instruments
            right now knowing 7, those being instruments: <span id="${"ld"}" class="${"svelte-1c2vu9e"}">Electric Bass, Contrabass, Guitar, Ukulele, Piano, Harmonica
                and Trumpet</span>. I also like to create music, both spontaneously with friends in
            jam sessions or by myself.
        </div>
        <div class="${"l svelte-1c2vu9e"}"><img src="${"https://img.icons8.com/ios/512/jazz.png"}" alt="${"instruments image"}" class="${"svelte-1c2vu9e"}"></div></div>
    <div class="${"header txt flex flex-col svelte-1c2vu9e"}"><div><p>but usually it is through reading or watching things. i love to
                read books on political-economy, philosophy and history. as well
                as classic literature. you can find more about those either in
                the <a href="${"/blog"}" class="${"code svelte-1c2vu9e"}">\`blog’</a> or at the links below.
            </p></div>
        <div class="${"wrap svelte-1c2vu9e"}"><div class="${"content svelte-1c2vu9e"}"><div class="${"element code c svelte-1c2vu9e"}">Good Reads
                    <a href="${"https://www.goodreads.com/user/show/155512706-stephen-okita"}"><img src="${"https://simpleicons.org/icons/goodreads.svg"}" class="${"svelte-1c2vu9e"}"></a></div>
                <div class="${"element code svelte-1c2vu9e"}">Letter Box
                    <a href="${"https://letterboxd.com/danielOkita/"}"><img src="${"https://simpleicons.org/icons/letterboxd.svg"}" class="${"svelte-1c2vu9e"}"></a></div></div></div></div>
</div>`;
});
export {
  Page as default
};
