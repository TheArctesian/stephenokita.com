<script>
    import "../app.css";
</script>

<div class="sub flex alight-center text-center ">
    <a href="/home" class="home">home, </a>
    <a href="/aboutme" class="about">&nbsp about, </a>
    <a href="/blog" class="blog">&nbsp blog,</a>
</div>

<slot />

<div class="wrapper">
    <div class="text">
        <h1 class="text-center ">Email me at <span class="underline">me@danielokita.com</span></h1>
        <h1 class="text-center ">Or find me on these places <h1>
    <div class="content">
    	<div class="element">
    		<a href="https://www.linkedin.com/in/stephen-okita-a9427b1b2/">
                <img src="https://simpleicons.org/icons/linkedin.svg" />
    		</a>
    	</div>
    	<div class="element">
    		<a href="https://mastodon.world/@thearctesian">
    			<img src="https://simpleicons.org/icons/mastodon.svg" />
    		</a>
    	</div>
    	<div class="element">
    		<a href="https://github.com/TheArctesian">
    			<img src="https://simpleicons.org/icons/github.svg"/>
    		</a>
        </div>
        <div class="element">
    		<a href="https://discord.com/users/682753580943278083">
    			<img src="https://simpleicons.org/icons/discord.svg"/>
    		</a>
        </div>
    </div>
    as well as the source code for this website <a class="s" href="https://github.com/TheArctesian/danielokita.com">here</a>
    </div>
</div>

<style>
    .sub {
        margin: 1rem;
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 1rem;
    }
    a {
        margin: auto;
        text-decoration: none;
        font-size: 5vw;
        transition: all ease-in-out 400ms;
    }
    .s{
        font-size: larger;
        font-style: italic;
        color: var(--comment);
    }
    a:hover {
        letter-spacing: 0.1em;
    }
    .home {
        color: var(--red);
    }
    .about {
        color: var(--pink);
    }
    .blog {
        color: var(--purple);
    }
    :global(body) {
        background-color: var(--bg);
        font-family: "Fira Code", monospace;
        letter-spacing: 0.1em; /* Adjust as needed */
    }
      .wrapper{
        font-size: small;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
    }
     .content{
        display: flex;
        justify-content: center;
        margin: 1rem;
        border-radius: 2rem;
    }
    .element{
        margin: 1rem;
    }
    .text{
        background-color: var(--fg);
        padding: 1rem;
        border-radius: 1rem;
    }
    img{
        transition: all ease-in-out 200ms;
        width: 10vw;
    }
</style>
