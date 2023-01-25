import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
/* empty css                   */import { T as Typewriter } from "../../../chunks/Typewriter.js";
import "svelte-carousel";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".code.svelte-haxrh8{font-style:italic;color:var(--comment);transition:all ease-in-out 200ms}.wrap.svelte-haxrh8{display:flex;justify-content:center;flex-direction:column;align-items:center;margin:1rem}.content.svelte-haxrh8{display:flex;justify-content:center;margin:1rem;border-radius:2rem}.element.svelte-haxrh8{margin:1rem}.txt.svelte-haxrh8{font-size:small}#hk.svelte-haxrh8{color:var(--red)}#ir.svelte-haxrh8{color:var(--green)}#ld.svelte-haxrh8{color:var(--comment)}.text.svelte-haxrh8{background-color:var(--fg);padding:1rem;text-align:center;border-radius:1rem;font-size:small;margin:1rem}.globe.svelte-haxrh8{width:7rem}.daniel.svelte-haxrh8{font-weight:bold;color:var(--red)}.img.svelte-haxrh8{margin:auto;border-radius:1rem;animation:fadeIn 5s;width:39%}.header.svelte-haxrh8{background-color:var(--fg);padding:1rem;border-radius:1rem;margin:1rem;transition:all ease-in-out 200ms}@media(max-width: 750px){.header.svelte-haxrh8{margin-top:0.2}.img.svelte-haxrh8{width:fit-content;height:fit-content}.l.svelte-haxrh8{display:none}.ilike.svelte-haxrh8{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"wrapper"}"><div class="${"text flex svelte-haxrh8"}">${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: "100" }, {}, {
    default: () => {
      return `<p1 class="${"text-center"}">hello my name is <span class="${"daniel svelte-haxrh8"}">Stephen Okita-<span id="${"ir"}" class="${"svelte-haxrh8"}">O&#39;Riordan</span></span></p1>`;
    }
  })}</div>
    <div class="${"header flex text-center flex-col svelte-haxrh8"}"><div class="${"flex img flex-row svelte-haxrh8"}"><img alt="${"A photo with me wearing glasses"}" src="${"/images/glasses.jpg"}" class="${"shadow-2xl flex-shrink"}">
            <br></div>
        ${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: "100" }, {}, {
    default: () => {
      return `<p1 class="${"margin-auto text-center"}">A photo of me with cool glasses</p1>`;
    }
  })}</div>
    <div class="${"header flex flex-row svelte-haxrh8"}"><div class="${"float-right grow txt margin-auto svelte-haxrh8"}">i currently live in <span id="${"hk"}" class="${"svelte-haxrh8"}">Hong Kong</span>, <br>
            i was born in <span id="${"ld"}" class="${"svelte-haxrh8"}">London</span>,<br>
            my mother is from <span id="${"ir"}" class="${"svelte-haxrh8"}">Ireland</span>, <br>
            my father is <span id="${"ld"}" class="${"svelte-haxrh8"}">American</span>-<span id="${"hk"}" class="${"svelte-haxrh8"}">Japanese</span>. <br>
            i can communicate in <span id="${"hk"}" class="${"svelte-haxrh8"}">中文</span>, English,
            <span id="${"ld"}" class="${"svelte-haxrh8"}">français</span>
            and <span id="${"hk"}" class="${"svelte-haxrh8"}">廣東話</span>, <br>
            i am also learning <span id="${"hk"}" class="${"svelte-haxrh8"}">spanish</span></div>
        <div class="${"l svelte-haxrh8"}"><img src="${"https://img.icons8.com/ios-filled/512/globe-earth.png"}" alt="${"globe"}" class="${"globe svelte-haxrh8"}"></div></div>

    <div class="${"header txt flex flex-row svelte-haxrh8"}"><p>in addition to learning about programming, which you can read all
            about <a href="${"/aboutme"}" class="${"code svelte-haxrh8"}">here</a>, i enjoy learning in
            general. my learning takes many forms and many directions.
        </p></div>
    <div class="${"header ilike flex flex-row svelte-haxrh8"}"><p class="${"txt svelte-haxrh8"}">it can take the form of learning about the world. both in reading
            the histories of the world and travailing it.
        </p>
        <div class="${""}"><img src="${"/images/been.JPG"}" alt="${"the place I have been in the world"}">
            <p class="${"txt text-center svelte-haxrh8"}">attached here is the export of my <a class="${"code svelte-haxrh8"}" src="${"https://apparata.se/apps/been/"}">been app</a></p></div></div>

    <div class="${"header flex flex-row svelte-haxrh8"}"><div class="${"grow txt  svelte-haxrh8"}">it can take form through Music. I enjoy to learning new instruments
            right now knowing 7, those being instruments: <span id="${"ld"}" class="${"svelte-haxrh8"}">Electric Bass, Contrabass, Guitar, Ukulele, Piano, Harmonica
                and Trumpet</span>. I also like to create music, both spontaneously with friends in
            jam sessions or by myself.
        </div>
        <div class="${"l svelte-haxrh8"}"><img src="${"https://img.icons8.com/ios/512/jazz.png"}" alt="${"instruments image"}"></div></div>
    <div class="${"header txt flex flex-col svelte-haxrh8"}"><div><p>but usually it is through reading or watching things. i love to
                read books on political-economy, philosophy and history. as well
                as classic literature. you can find more about those either in
                the <a href="${"/blog"}" class="${"code svelte-haxrh8"}">\`blog’</a> or at the links below.
            </p></div>
        <div class="${"wrap svelte-haxrh8"}"><div class="${"content svelte-haxrh8"}"><div class="${"element code c svelte-haxrh8"}">Good Reads
                    <a href="${"https://www.goodreads.com/user/show/155512706-stephen-okita"}"><img src="${"https://simpleicons.org/icons/goodreads.svg"}"></a></div>
                <div class="${"element code svelte-haxrh8"}">Letter Box
                    <a href="${"https://letterboxd.com/danielOkita/"}"><img src="${"https://simpleicons.org/icons/letterboxd.svg"}"></a></div></div></div></div>
</div>`;
});
export {
  Page as default
};
