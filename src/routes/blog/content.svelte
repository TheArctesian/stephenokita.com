<script lang="ts">
    import "../../app.css";
    import { fly } from "svelte/transition";

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

<div class="w-auto">
    <div class="flex w-auto">
        <div class="w-fit h-fit text-justify">
            <button class="focus:outline-none" on:click={toggle}>
                <span class={`${isOpen ? "rotate" : ""} inline-block`}>
                    &gt;
                </span>
            </button>
        </div>
        <div>
            <div class="flex text-size">
                <h1 class="">&nbsp{data.date}: &ensp;</h1>
                <h1 class="font-bold">{data.title}</h1>
                <br />
            </div>
        </div>
    </div>
    <Collapsible bind:isOpen>
        <div class="float-left"  transition:fly|global>
            <p><b>Abstract: </b>{data.abstract}</p>
            <br />
            {#each data.content as parg}
                {parg}<br /><br />
            {/each}
        </div>
    </Collapsible>
</div>

<style>
    b {
        font-weight: bold;
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
        .text-size{
            display: block;
        }
    }
</style>
