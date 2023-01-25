import { c as create_ssr_component } from "../../chunks/index.js";
/* empty css                */const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.sub.svelte-17ukt7z{margin:1rem;background-color:var(--fg);padding:1rem;border-radius:1rem}a.svelte-17ukt7z{margin:auto;text-decoration:none;font-size:5vw;transition:all ease-in-out 400ms}.s.svelte-17ukt7z{font-size:larger;font-style:italic;color:var(--comment)}a.svelte-17ukt7z:hover{letter-spacing:0.1em}.home.svelte-17ukt7z{color:var(--red)}.about.svelte-17ukt7z{color:var(--pink)}.blog.svelte-17ukt7z{color:var(--purple)}body{background-color:var(--bg);font-family:"Fira Code", monospace;letter-spacing:0.1em}.wrapper.svelte-17ukt7z{font-size:small;display:flex;justify-content:center;flex-direction:column;align-items:center;margin:1rem}.content.svelte-17ukt7z{display:flex;justify-content:center;margin:1rem;border-radius:2rem}.element.svelte-17ukt7z{margin:1rem}.text.svelte-17ukt7z{background-color:var(--fg);padding:1rem;border-radius:1rem}img.svelte-17ukt7z{transition:all ease-in-out 200ms;width:10vw}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"sub flex alight-center text-center  svelte-17ukt7z"}"><a href="${"/home"}" class="${"home svelte-17ukt7z"}">home, </a>
    <a href="${"/aboutme"}" class="${"about svelte-17ukt7z"}">  about, </a>
    <a href="${"/blog"}" class="${"blog svelte-17ukt7z"}">  blog,</a></div>

${slots.default ? slots.default({}) : ``}

<div class="${"wrapper svelte-17ukt7z"}"><div class="${"text svelte-17ukt7z"}"><h1 class="${"text-center "}">Email me at <span class="${"underline"}">me@danielokita.com</span></h1>
        <h1 class="${"text-center "}">Or find me on these places <h1><div class="${"content svelte-17ukt7z"}"><div class="${"element svelte-17ukt7z"}"><a href="${"https://www.linkedin.com/in/stephen-okita-a9427b1b2/"}" class="${"svelte-17ukt7z"}"><img src="${"https://simpleicons.org/icons/linkedin.svg"}" class="${"svelte-17ukt7z"}"></a></div>
    	<div class="${"element svelte-17ukt7z"}"><a href="${"https://mastodon.world/@thearctesian"}" class="${"svelte-17ukt7z"}"><img src="${"https://simpleicons.org/icons/mastodon.svg"}" class="${"svelte-17ukt7z"}"></a></div>
    	<div class="${"element svelte-17ukt7z"}"><a href="${"https://github.com/TheArctesian"}" class="${"svelte-17ukt7z"}"><img src="${"https://simpleicons.org/icons/github.svg"}" class="${"svelte-17ukt7z"}"></a></div>
        <div class="${"element svelte-17ukt7z"}"><a href="${"https://discord.com/users/682753580943278083"}" class="${"svelte-17ukt7z"}"><img src="${"https://simpleicons.org/icons/discord.svg"}" class="${"svelte-17ukt7z"}"></a></div></div>
    as well as the source code for this website <a class="${"s svelte-17ukt7z"}" href="${"https://github.com/TheArctesian/danielokita.com"}">here</a></h1></h1></div>
</div>`;
});
export {
  Layout as default
};
