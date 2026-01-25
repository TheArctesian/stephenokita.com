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
            <button
                class="toggle-btn"
                on:click={toggle}
                aria-expanded={isOpen}
                aria-label={isOpen ? `Collapse ${data.title}` : `Expand ${data.title}`}
            >
                <span class={`${isOpen ? "rotate" : ""} inline-block`} aria-hidden="true">
                    &gt;
                </span>
            </button>
        </div>
        <div>
            <div class="flex text-size">
                <span class="date-text">{data.date}:&ensp;</span>
                <span class="font-bold title-text">{data.title}</span>
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
        background-color: var(--bg-secondary);
    }

    .toggle-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        color: var(--text-primary);
        transition: all 0.2s ease-in-out;
    }

    .toggle-btn:hover {
        background-color: var(--bg-tertiary);
    }

    .toggle-btn:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
    }

    .rotate {
        transform: rotate(90deg);
        transition: transform 0.2s ease-in-out;
    }

    .date-text {
        color: var(--text-secondary);
    }

    .title-text {
        color: var(--text-primary);
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
