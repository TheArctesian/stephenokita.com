<script lang="ts">
    import "../../app.css";
    type jsonList = {
        title: string;
        date: string;
        abstract: string;
        content: string[];
    };
    import Collapsible from "../../lib/Collapsible.svelte";
    let isOpen: boolean = false;
    export let data: jsonList;
    function toggle() {
        isOpen = !isOpen;
    }
</script>

        <div class="">
            <div class="flex">
                    <button class="focus:outline-none" on:click={toggle}>
                        <span class={`${isOpen ? "rotate" : ""} inline-block`}>
                            &gt; &nbsp 
                        </span>
                    </button>
                <div>
                    <div class=" flex ">
                        <h1 class="text-lg">{data.date}: &ensp;</h1>
                        <h1 class="text-lg font-bold">{data.title}</h1>
                        <br />
                    </div>
                </div>
            </div>
            <Collapsible bind:isOpen>
                <div class="float-left ">
                    <p><b>Abstract: </b>{data.abstract}</p>
                    <br>
                    {#each data.content as parg}
                        {parg}<br /><br>
                    {/each}
                </div>
            </Collapsible>
        </div>

<style>
    b{
        font-weight: bold;
    }
    .tit {
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 0.2rem;
        font-size: small;
        font-size: large;
        text-align: center;
        margin: 1rem;
    }
    .head {
        margin: auto;
        width: 100%;
    }
    a {
        font-size: larger;
        font-weight: bold;
    }
    img {
        width: 20rem;
    }
    .text {
        background-color: var(--fg);
    }
    .rotate {
        transform: rotate(90deg);
        transition: transform 0.2s ease-in-out;
    }

    @media (max-width: 750px) {
        .card-holder {
            flex-direction: column;
        }
    }
</style>
