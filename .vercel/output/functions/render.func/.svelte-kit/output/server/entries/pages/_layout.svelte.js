import { c as create_ssr_component } from "../../chunks/index.js";
/* empty css                */const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.sub.svelte-bpbjwr{margin:1rem;background-color:var(--fg);padding:1rem;border-radius:1rem}a.svelte-bpbjwr{margin:auto;text-decoration:none;font-size:5vw;transition:all ease-in-out 400ms}.s.svelte-bpbjwr{font-size:larger;font-style:italic;color:var(--comment)}a.svelte-bpbjwr:hover{letter-spacing:0.1em}.home.svelte-bpbjwr{color:var(--red)}.about.svelte-bpbjwr{color:var(--pink)}.blog.svelte-bpbjwr{color:var(--purple)}body{background-color:var(--bg);font-family:"Fira Code", monospace;letter-spacing:0.1em}.wrapper.svelte-bpbjwr{font-size:small;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:1rem}.content.svelte-bpbjwr{display:flex;justify-content:center;margin:1rem;border-radius:2rem}.element.svelte-bpbjwr{margin:1rem}.text.svelte-bpbjwr{background-color:var(--fg);padding:1rem;border-radius:1rem}img.svelte-bpbjwr{transition:all ease-in-out 200ms;width:10vw}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"sub flex alight-center text-center  svelte-bpbjwr"}"><a href="${"/home"}" class="${"home svelte-bpbjwr"}">home, </a>
    <a href="${"/aboutme"}" class="${"about svelte-bpbjwr"}">  about, </a>
    <a href="${"/blog"}" class="${"blog svelte-bpbjwr"}">  blog,</a></div>

${slots.default ? slots.default({}) : ``}

<div class="${"wrapper svelte-bpbjwr"}"><div class="${"text svelte-bpbjwr"}"><h1 class="${"text-center "}">Email me at <span class="${"underline"}">me@danielokita.com</span></h1>
        <h1 class="${"text-center "}">Or find me on these places <h1><div class="${"content svelte-bpbjwr"}"><div class="${"element svelte-bpbjwr"}"><a href="${"https://www.linkedin.com/in/stephen-okita-a9427b1b2/"}" class="${"svelte-bpbjwr"}"><img src="${"https://simpleicons.org/icons/linkedin.svg"}" class="${"svelte-bpbjwr"}"></a></div>
    	<div class="${"element svelte-bpbjwr"}"><a href="${"https://mastodon.world/@thearctesian"}" class="${"svelte-bpbjwr"}"><img src="${"https://simpleicons.org/icons/mastodon.svg"}" class="${"svelte-bpbjwr"}"></a></div>
    	<div class="${"element svelte-bpbjwr"}"><a href="${"https://github.com/TheArctesian"}" class="${"svelte-bpbjwr"}"><img src="${"https://simpleicons.org/icons/github.svg"}" class="${"svelte-bpbjwr"}"></a></div>
        <div class="${"element svelte-bpbjwr"}"><a href="${"https://discord.com/users/682753580943278083"}" class="${"svelte-bpbjwr"}"><img src="${"https://simpleicons.org/icons/discord.svg"}" class="${"svelte-bpbjwr"}"></a></div></div>
    as well as the source code for this website <a class="${"s svelte-bpbjwr"}" href="${"https://github.com/TheArctesian/danielokita.com"}">here</a></h1></h1></div>
</div>`;
});
export {
  Layout as default
};
