<script lang="ts">
    import "../../app.css";
    type jsonList = {
        projectName: string;
        description: string;
        link: string;
    };
    import Collapsible from "../../lib/Collapsible.svelte";
    let isOpen: boolean = false;
    export let data: jsonList[];
    export let name: string;
    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="text flex">
    <div class="flex">
        <div class="w-auto flex flex-col">
            <div class="flex">
                <div class="w-auto">
                    <button class="focus:outline-none" on:click={toggle}>
                        <span class={`${isOpen ? "rotate" : ""} inline-block`}>
                            &gt;
                        </span>
                    </button>
                </div>
                <div>
                    <h1 class="w-auto ">&nbsp {name}</h1>
                </div>
            </div>
            <Collapsible bind:isOpen>
                {#each data as i}
                    <div class="head">
                        <a href={i.link} class="flex flex-col">
                            <h1>Project Name: {i.projectName}</h1>
                            <p>{i.description}</p>
                        </a>
                    </div>
                {/each}
            </Collapsible>
        </div>
    </div>
</div>

<style>

    .head {
        color: var(--black);
        border-radius: 1rem;
        padding: 1rem;
        border: 0.2rem solid var(--fg);
    }
    .head:hover {
        border: 0.2rem solid var(--pink);
    }
    img {
        width: 20rem;
    }
    h1 {
        font-weight: bold;
    }
    .rotate {
        transform: rotate(90deg);
        transition: transform 0.2s ease-in-out;
    }
    .text {
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 0.2rem;
        font-size: small;
        margin: 1rem;
    }
    .dis {
        border-radius: 0.2rem;
        font-size: small;
        padding: 1rem;
        margin: 1rem;
        background-color: var(--fg);
    }
    .code {
        font-style: italic;
    }

    @media (max-width: 1000px) {
        .control {
            flex-direction: column;
        }
    }
</style>
