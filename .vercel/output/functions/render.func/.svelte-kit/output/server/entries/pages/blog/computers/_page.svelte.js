import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index.js";
/* empty css                      */import { T as Typewriter } from "../../../../chunks/Typewriter.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".text.svelte-1l9u682{background-color:var(--fg);padding:1rem;text-align:center;border-radius:1rem;font-size:small;margin:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"text svelte-1l9u682"}"><p>This is still a work in progress${validate_component(Typewriter, "Typewriter").$$render($$result, { mode: "loop", interval: "100" }, {}, {
    default: () => {
      return `...`;
    }
  })}</p>
</div>`;
});
export {
  Page as default
};
