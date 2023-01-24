<script>
    import "../../app.css";
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="text float">
    <p>
        as stated before i am a FOSS programmer looking to understand and change
        the world. this section will describe me as a programmer
    </p>
</div>
<div class="text flex flex-col text-center">
    <div>
        My resume can be downloaded here
        <br />
        <br />
    </div>
    <div>
        <button
            type="submit"
            onclick="window.open('/other/Stephen_Activites_Resume.pdf')"
            class="btn"
            style="width:100%"><i class="fa fa-download" /> Download</button
        >
    </div>
</div>
<div class="text">
    <p>
        The languages list is not complete in there. in the ream of computers i
        speak (and the specifics frameworks for that language):
    </p>
    <li>bash</li>
    <li>C</li>
    <li>C++</li>
    <li>C# (Unity)</li>
    <li>dart (flutter)</li>
    <li>elisp (just for emacs)</li>
    <li>go (fiber, hugo)</li>
    <li>haskell</li>
    <li>java (spring boot)</li>
    <li>julia</li>
    <li>javascript/typescript (svelte, react and vue)</li>
    <li>lua (mc, nvim)</li>
    <li>nim</li>
    <li>perl (idk why i did this)</li>
    <li>python (scikit, panads)</li>
    <li>r (rocket, bevy)</li>
    <li>rust</li>
    <li>solidity</li>
</div>
<div class="text">
    <p>
        as a foss man i daily boot some form of linux. i have tried and worked
        on many distros and window managers. for the most part nowadays I stay
        on gnome or xmonad with arch, nix or popOS.
    </p>
</div>
<div class="text">
    <p>
        everything i do is on my <a
            class="code"
            href="https://github.com/thearctesian">github</a
        >, for now until i migrate to a platform who's company policy does not go 
        against my vision of open source projects
    </p>
</div>

<style>
    .btn {
        background-color: var(--purple);
        border: none;
        padding: 1rem;
        border-radius: 1rem;
        color: white;
        cursor: pointer;
    }
    .code {
        font-style: italic;
        color: var(--comment);
        transition: all ease-in-out 200ms;
    }
    li {
        margin-left: 1rem;
    }
    /* Darker background on mouse-over */
    .btn:hover {
        background-color: RoyalBlue;
    }
    .text {
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 1rem;
        font-size: small;
        margin: 1rem;
    }
</style>
