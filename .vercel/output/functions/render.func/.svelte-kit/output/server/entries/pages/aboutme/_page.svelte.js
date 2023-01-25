import { c as create_ssr_component } from "../../../chunks/index.js";
/* empty css                   */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".btn.svelte-evh86p{background-color:var(--purple);border:none;padding:1rem;border-radius:1rem;color:white;cursor:pointer}.code.svelte-evh86p{font-style:italic;color:var(--comment);transition:all ease-in-out 200ms}li.svelte-evh86p{margin-left:1rem}.btn.svelte-evh86p:hover{background-color:RoyalBlue}.text.svelte-evh86p{background-color:var(--fg);padding:1rem;border-radius:1rem;font-size:small;margin:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}">

<div class="${"text float svelte-evh86p"}"><p>as stated before i am a FOSS programmer looking to understand and change
        the world. this section will describe me as a programmer
    </p></div>
<div class="${"text flex flex-col text-center svelte-evh86p"}"><div>My resume can be downloaded here
        <br>
        <br></div>
    <div><button type="${"submit"}" onclick="${"window.open('/other/Stephen_Activites_Resume.pdf')"}" class="${"btn svelte-evh86p"}" style="${"width:100%"}"><i class="${"fa fa-download"}"></i> Download</button></div></div>
<div class="${"text svelte-evh86p"}"><p>The languages list is not complete in there. in the ream of computers i
        speak (and the specifics frameworks for that language):
    </p>
    <li class="${"svelte-evh86p"}">bash</li>
    <li class="${"svelte-evh86p"}">C</li>
    <li class="${"svelte-evh86p"}">C++</li>
    <li class="${"svelte-evh86p"}">C# (Unity)</li>
    <li class="${"svelte-evh86p"}">dart (flutter)</li>
    <li class="${"svelte-evh86p"}">elisp (just for emacs)</li>
    <li class="${"svelte-evh86p"}">go (fiber, hugo)</li>
    <li class="${"svelte-evh86p"}">haskell</li>
    <li class="${"svelte-evh86p"}">java (spring boot)</li>
    <li class="${"svelte-evh86p"}">julia</li>
    <li class="${"svelte-evh86p"}">javascript/typescript (svelte, react and vue)</li>
    <li class="${"svelte-evh86p"}">lua (mc, nvim)</li>
    <li class="${"svelte-evh86p"}">nim</li>
    <li class="${"svelte-evh86p"}">perl (idk why i did this)</li>
    <li class="${"svelte-evh86p"}">python (scikit, panads)</li>
    <li class="${"svelte-evh86p"}">r (rocket, bevy)</li>
    <li class="${"svelte-evh86p"}">rust</li>
    <li class="${"svelte-evh86p"}">solidity</li></div>
<div class="${"text svelte-evh86p"}"><p>as a foss man i daily boot some form of linux. i have tried and worked
        on many distros and window managers. for the most part nowadays I stay
        on gnome or xmonad with arch, nix or popOS.
    </p></div>
<div class="${"text svelte-evh86p"}"><p>everything i do is on my <a class="${"code svelte-evh86p"}" href="${"https://github.com/thearctesian"}">github</a>, for now until i migrate to a platform who&#39;s company policy does not
        go against my vision of open source projects
    </p>
</div>`;
});
export {
  Page as default
};
