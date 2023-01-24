<script>
    import "../../app.css";
    import Typewriter from "svelte-typewriter";
</script>

<div class="text">
    <p>
        This is still a work in progress<Typewriter mode="loop" interval="100"
            >...</Typewriter
        >
    </p>
</div>

<style>
    .text {
        background-color: var(--fg);
        padding: 1rem;
        text-align: center;
        border-radius: 1rem;
        font-size: small;
        margin: 1rem;
    }
</style>
