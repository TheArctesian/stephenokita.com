import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
/* empty css                */import { T as Typewriter } from "../../chunks/Typewriter.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".text.svelte-j37m3m{overflow:hidden}img.svelte-j37m3m{border-radius:1rem;animation:fadeIn 5s;margin:auto;width:39%}.header.svelte-j37m3m{height:fit-content;margin:auto;background-color:var(--fg);padding:1rem;border-radius:1rem;margin:1rem}.daniel.svelte-j37m3m{font-weight:bold;color:var(--red)}.code.svelte-j37m3m{font-style:italic;color:var(--comment);transition:all ease-in-out 200ms}.code.svelte-j37m3m:hover{transition:all ease-in-out 200ms;font-style:normal;letter-spacing:0.3em}@media(max-width: 750px){.head.svelte-j37m3m{height:fit-content;flex-direction:column}.header.svelte-j37m3m{margin-top:0.2}img.svelte-j37m3m{width:auto;height:fit-content}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"head flex flex-col svelte-j37m3m"}"><div class="${"header flex alight-center text-center flex-col svelte-j37m3m"}"><img alt="${"A photo with me wearing glasses"}" src="${"/images/meGuitar.jpeg"}" class="${"shadow-2xl svelte-j37m3m"}">
        <br>
        ${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: "100" }, {}, {
    default: () => {
      return `<p1 class="${"margin-auto text-center"}">A photo of me</p1>`;
    }
  })}</div>
    <div class="${"header text svelte-j37m3m"}"><p2>hello my name is <span class="${"daniel svelte-j37m3m"}">Daniel Okita,</span>
            welcome to my website. i am a FOSS programmer looking to understand and
            change the world </p2></div>
    <div class="${"header text svelte-j37m3m"}"><p2>if you would for some reason wish to know more about me this website
            is for you!
            <br>
            <br>
            the structure of this website in a way that might be a little deceiving.
            <br>
            <br>
            <a href="${"/home"}" class="${"code svelte-j37m3m"}">\`home\`</a> =&gt; the story of my
            background, where i from, what i am according to myself.
            <br>
            <br>
            <a href="${"/aboutme"}" class="${"code svelte-j37m3m"}">\`about me’</a> =&gt; the superficial
            approach, the quantifiable achievements and skills that i have that
            make me of value to society or you.
            <br>
            <br>
            <a href="${"/blog"}" class="${"code svelte-j37m3m"}">\`blog’</a> =&gt; does not need explanation
            and is simply the place i ramble into the oblivion.
            <br>
            <br>
            So that is to say once you leave this page unless you change the domain
            to <span class="${"code svelte-j37m3m"}">\`/\`</span> you will not get back to this wall of
            text.
        </p2></div>
</div>`;
});
export {
  Page as default
};
