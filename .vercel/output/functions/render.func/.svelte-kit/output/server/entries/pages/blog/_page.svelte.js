import { c as create_ssr_component } from "../../../chunks/index.js";
/* empty css                   *//* empty css                                                        */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".head.svelte-1br6zbl{color:var(--black);transition:all ease-in-out 200ms;border:none}.head.svelte-1br6zbl:hover{border-radius:1rem;border:0.2rem solid var(--pink);padding:1rem;letter-spacing:0.2em}a.svelte-1br6zbl{font-size:larger;font-weight:bold}img.svelte-1br6zbl{width:20rem}.text.svelte-1br6zbl{background-color:var(--fg);padding:1rem;text-align:center;border-radius:1rem;font-size:small;margin:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"text flex flex-wrap svelte-1br6zbl"}"><div class="${"head flex flex-col m-auto svelte-1br6zbl"}"><a href="${"/blog/writings"}" class="${"svelte-1br6zbl"}">general writings</a>
    <a href="${"/blog/writings"}" class="${"svelte-1br6zbl"}"><img src="${"https://img.icons8.com/ios/512/hand-with-pen.png"}" alt="${"book glif"}" class="${"svelte-1br6zbl"}"></a></div>
  <div class="${"head flex flex-col m-auto svelte-1br6zbl"}"><a href="${"/blog/computers"}" class="${"svelte-1br6zbl"}">on computers</a>
    <a href="${"/blog/computers"}" class="${"svelte-1br6zbl"}"><img src="${"https://img.icons8.com/wired/512/processor.png"}" alt="${"book glif"}" class="${"svelte-1br6zbl"}"></a></div>
  <div class="${"head flex flex-col m-auto svelte-1br6zbl"}"><a href="${"/blog/lit"}" class="${"svelte-1br6zbl"}">on literature</a>
    <a href="${"/blog/lit"}" class="${"svelte-1br6zbl"}"><img src="${"https://img.icons8.com/ios-glyphs/512/open-book.png"}" alt="${"book glif"}" class="${"svelte-1br6zbl"}"></a></div>
  <div class="${"head flex flex-col m-auto svelte-1br6zbl"}"><a href="${"/blog/media"}" class="${"svelte-1br6zbl"}">on media</a>
    <a href="${"/blog/media"}" class="${"svelte-1br6zbl"}"><img src="${"https://img.icons8.com/ios-filled/512/frame-rate.png"}" alt="${"book glif"}" class="${"svelte-1br6zbl"}"></a></div>
</div>`;
});
export {
  Page as default
};
