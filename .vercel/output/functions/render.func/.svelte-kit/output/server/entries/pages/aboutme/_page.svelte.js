import { c as create_ssr_component } from "../../../chunks/index.js";
/* empty css                   */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".btn.svelte-1esa9q5{background-color:var(--purple);border:none;padding:1rem;border-radius:1rem;color:white;cursor:pointer}.code.svelte-1esa9q5{font-style:italic;color:var(--comment);transition:all ease-in-out 200ms}li.svelte-1esa9q5{margin-left:1rem}.btn.svelte-1esa9q5:hover{background-color:RoyalBlue}.text.svelte-1esa9q5{background-color:var(--fg);padding:1rem;border-radius:1rem;font-size:small;margin:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}">

<div class="${"text float svelte-1esa9q5"}"><p>as stated before i am a FOSS programmer looking to understand and change
        the world. this section will describe me as a programmer
    </p></div>
<div class="${"text flex flex-col text-center svelte-1esa9q5"}"><div>My resume can be downloaded here
        <br>
        <br></div>
    <div><button type="${"submit"}" onclick="${"window.open('/other/Stephen_Activites_Resume.pdf')"}" class="${"btn svelte-1esa9q5"}" style="${"width:100%"}"><i class="${"fa fa-download"}"></i> Download</button></div></div>
<div class="${"text svelte-1esa9q5"}"><p>The languages list is not complete in there. in the ream of computers i
        speak (and the specifics frameworks for that language):
    </p>
    <li class="${"svelte-1esa9q5"}">bash</li>
    <li class="${"svelte-1esa9q5"}">C</li>
    <li class="${"svelte-1esa9q5"}">C++</li>
    <li class="${"svelte-1esa9q5"}">C# (Unity)</li>
    <li class="${"svelte-1esa9q5"}">dart (flutter)</li>
    <li class="${"svelte-1esa9q5"}">elisp (just for emacs)</li>
    <li class="${"svelte-1esa9q5"}">go (fiber, hugo)</li>
    <li class="${"svelte-1esa9q5"}">haskell</li>
    <li class="${"svelte-1esa9q5"}">java (spring boot)</li>
    <li class="${"svelte-1esa9q5"}">julia</li>
    <li class="${"svelte-1esa9q5"}">javascript/typescript (svelte, react and vue)</li>
    <li class="${"svelte-1esa9q5"}">lua (mc, nvim)</li>
    <li class="${"svelte-1esa9q5"}">nim</li>
    <li class="${"svelte-1esa9q5"}">perl (idk why i did this)</li>
    <li class="${"svelte-1esa9q5"}">python (scikit, panads)</li>
    <li class="${"svelte-1esa9q5"}">r (rocket, bevy)</li>
    <li class="${"svelte-1esa9q5"}">rust</li>
    <li class="${"svelte-1esa9q5"}">solidity</li></div>
<div class="${"text svelte-1esa9q5"}"><p>as a foss man i daily boot some form of linux. i have tried and worked
        on many distros and window managers. for the most part nowadays I stay
        on gnome or xmonad with arch, nix or popOS.
    </p></div>
<div class="${"text svelte-1esa9q5"}"><p>everything i do is on my <a class="${"code svelte-1esa9q5"}" href="${"https://github.com/thearctesian"}">github</a>, for now until i migrate to a platform who&#39;s company policy does not
        go against my vision of open source projects
    </p>
</div>`;
});
export {
  Page as default
};
