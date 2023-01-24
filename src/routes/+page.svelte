<script>
    import "../app.css";
    import Typewriter from "svelte-typewriter";
</script>

<div class="head flex">
    <div class="header flex alight-center text-center flex-col">
        <img
            alt="A photo with me wearing glasses"
            src="/images/glasses.jpg"
            class="shadow-2xl"
        />
        <br />
        <Typewriter interval=100>
        <p1 class="margin-auto text-center">A photo of me with cool glasses</p1>
        </Typewriter>
    </div>
    <div class="header text">
            <p2>
                hello my name is <span class="daniel">Daniel Okita,</span>
            </p2>
            <br />
            <p2>
                welcome to my website. if you would for some reason wish to know
                more about me this website i structured in a way that might be a
                little deceiving.
                <br />
                <br />
                <a href="/home" class="code">`home`</a> => the story of my
                background, where i from, what i am according to myself
                <br />
                <br />
                <a href="/aboutme" class="code">`about me’</a> => the
                superficial approach, the quantifiable achievements and skills
                that i have that make me of value to society or you.
                <br />
                <br />
                <a href="/blog" class="code">`blog’</a> => does not need
                explanation and is simply the place i ramble into the oblivion
                <br />
            </p2>
    </div>
</div>

<style>
    .text {
        overflow: hidden;
    }
    img {
        border-radius: 1rem;
        animation: fadeIn 5s;
        margin: auto;
        width: 39%;
    }
    .header {
        height: fit-content;
        margin: auto;
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 1rem;
        margin: 1rem;
    }
    .daniel {
        font-weight: bold;
        color: var(--red);
    }
    .code {
        font-style: italic;
        color: var(--comment);
        transition: all ease-in-out 200ms;
    }
    .code:hover {
        transition: all ease-in-out 200ms;
        font-style: normal;
        letter-spacing: 0.3em;
    }
    @media (max-width: 750px) {
        .head {
            height: fit-content;
            flex-direction: column;
        }
        .header {
            margin-top: 0.2;
        }
        img{
            width: auto;
            height: fit-content;
        }
    }
</style>
