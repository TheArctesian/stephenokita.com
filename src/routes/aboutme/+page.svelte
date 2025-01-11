<script lang="ts">
  import "../../app.css";

  import { elasticIn } from "svelte/easing";
  import { blur, fade, fly, slide } from "svelte/transition";
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div out:slide>
  <div class="text float text-center">
    TLDR or just want a resume: <a
      class="code"
      href="/other/Stephen Okita Resume 2024.pdf">Here it is</a
    >
  </div>
  <div class="text float">
    <p>
      As stated before i am a FOSS programmer looking to understand and change
      the world. This section will describe me in terms of what labour I can
      provide. As a TLDR for this page, I am a web and mobile full stack dev,
      dev ops dev, systems dev, game dev, musician, video/photo editor and 3D
      artists.
    </p>
  </div>
  <div class="text">
    <p>
      Everything i do is on my <a
        class="code"
        href="https://github.com/thearctesian">github</a
      >, for now until i migrate to a platform who's company policy does not go
      against my vision of open source projects. However more cleaner look of my
      projects can be found on my
      <a class="code" href="/projects">projects page</a>
    </p>
  </div>

  <div class="text">
    <p>Beginning generally I can program in the following languages:</p>
    <div class="m-4 flex justify-between items-center flex-wrap">
      <div class="m-2 flex flex-col justify-center text-center">
        <img src="https://simpleicons.org/icons/gnubash.svg" />
        Bash
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/c.svg" />
        C
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/dart.svg" />
        Dart
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/gnuemacs.svg" />
        Lisp
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/go.svg" />
        Go
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/haskell.svg" />
        Haskell
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/spring.svg" />
        Java
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/julia.svg" />
        Julia
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/javascript.svg" />
        Javascript
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/lua.svg" />
        Lua
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/nim.svg" />
        Nim
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/perl.svg" />
        Perl
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/python.svg" />
        Python
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/r.svg" />
        R
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/rust.svg" />
        Rust
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/solidity.svg" />
        Solidity
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/typescript.svg" />
        Typescript
      </div>
    </div>
    As a front-end developer I use the following technologies:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/html5.svg" />
        HTML
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/css3.svg" />
        CSS
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/tailwindcss.svg" />
        Tailwind
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/svelte.svg" />
        Svelte
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/hugo.svg" />
        Hugo
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/react.svg" />
        React
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/flutter.svg" />
        Flutter
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/androidstudio.svg" />
        Android Studio
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/prisma.svg" />
        Prisma
      </div>

      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/yarn.svg" />
        Yarn
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/vercel.svg" />
        Vercel
      </div>
    </div>
    As a backend developer things get a little more complicated. For server I use
    Linux mostly debian stable but I will have a different section on Linux. For
    hosting I generally stick to Linode or self hosting combined with cloudflare
    but have used the following technologies:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/amazonaws.svg" />
        AWS
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/googlecloud.svg" />
        GCP
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://img.icons8.com/ios-filled/344/linode.png" />
        Linode
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://img.icons8.com/windows/344/domain-name.png" />
        Epik
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/cloudflare.svg" />
        Cloudflare
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/docker.svg" />
        Docker
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/kubernetes.svg" />
        Kubernetes
      </div>
    </div>
    For databases use the following technologies:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/sqlite.svg" />
        SQLite
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/postgresql.svg" />
        Postgres
      </div>

      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/mongodb.svg" />
        Mongo
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/firebase.svg" />
        Firebase
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/supabase.svg" />
        Supabase
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/graphql.svg" />
        Graphql
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/neo4j.svg" />
        Neo4j
      </div>
    </div>

    For building REST APIs I have used the following technologies, I chose based
    on the techstack or how I'm feeling:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/flask.svg" />
        Flask
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/springboot.svg" />
        Springboot
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/apacherocketmq.svg" />
        Rocket
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/go.svg" />
        Go Fiber
      </div>
    </div>
    For game development I have used the following technologies:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/unity.svg" />
        Unity
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/unrealengine.svg" />
        Unreal Engine
      </div>
      <div class="m-2 flex flex-col text-center">
        <img
          src="https://raw.githubusercontent.com/github/explore/9a35078cf8720476dcaada39a7144659849b081e/topics/bevy/bevy.png"
        />
        Bevy
      </div>
    </div>
    For the extra creative work I have use:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/blender.svg" />
        Blender
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/krita.svg" />
        Krita
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/inkscape.svg" />
        Inkscape
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/ardour.svg" />
        Ardour
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/audacity.svg" />
        Audacity
      </div>
      <div class="m-2 flex flex-col text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/DaVinci_Resolve_17_logo.svg/1200px-DaVinci_Resolve_17_logo.svg.png"
        />
        Davinci Resolve
      </div>
      <div class="m-2 flex flex-col text-center">
        <img
          src="https://kdenlive.org/wp-content/uploads/2022/01/kdenlive-logo-blank-500px.png"
        />
        Kdenlive
      </div>
    </div>
    There are also several technologies which I no longer use because they don't
    support linux but have extensively used it:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/adobeaftereffects.svg" />
        Adobe After Effects
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/adobeaudition.svg" />
        Adobe Audition
      </div>

      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/adobeillustrator.svg" />
        Adobe Illustrator
      </div>

      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/adobephotoshop.svg" />
        Adobe Photoshop
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/adobepremierepro.svg" />
        Adobe Premier Pro
      </div>
      <div class="m-2 flex flex-col text-center">
        <img
          src="https://w7.pngwing.com/pngs/720/363/png-transparent-logic-pro-x-alt-macos-bigsur-icon-thumbnail.png"
        />
        Logic
      </div>
    </div>
  </div>
  <div class="text">
    <p>
      On Linux we have another slew of technologies that I use, while I have
      tried every distro the ones I stick to now for desktop use are
    </p>
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/popos.svg" />
        PopOS
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/archlinux.svg" />
        Arch
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/android.svg" />
        Arch
      </div>
    </div>
    In terms of desktop environments and window managers I again have tried almost
    every one but the ones I continue to use are:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/gnome.svg" />
        Gnome
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/haskell.svg" />
        Xmonad
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/python.svg" />
        Qtile
      </div>
    </div>
    For text editors and IDE I switch between 3 for different purposes. Systems development
    and backend development I use doom emacs (evil mode), general use and quick edits
    I use Neovim and for front end development I use vscodium with vim. For the sake
    of concurrency here is their images:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/gnuemacs.svg" />
        Emacs
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/neovim.svg" />
        Neovim
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/vscodium.svg" />
        Vscodium
      </div>
    </div>
    On my home server I run:
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/portainer.svg" />
        Portainer
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/nginxproxymanager.svg" />
        Nginx Proxy Manager
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/nextcloud.svg" />
        Nextcloud
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/jellyfin.svg" />
        jellyfin
      </div>
      <div class="m-2 flex flex-col text-center">
        <img src="https://avatars.githubusercontent.com/u/32436079?s=200&v=4" />
        Photoprism
      </div>
    </div>
    And to sum up everything for my notes I am religious about Obsidian
    <div class="m-4 flex justify-center items-center flex-wrap">
      <div class="m-2 flex flex-col text-center">
        <img src="https://simpleicons.org/icons/obsidian.svg" />
        Obsidian
      </div>
    </div>
  </div>

  <div class="text flex flex-col">
    For other things, I am knowledgeable about literature, political-economy,
    history, philosophy and culture. I also love learning and thinking in
    different languages.
  </div>
</div>

<style>
  img {
    width: 3rem;
    margin: auto;
  }
  .btn {
    width: fit-content;
    background-color: var(--purple);
    border: none;
    padding: 1rem;
    border-radius: 0.2rem;
    color: white;
    cursor: pointer;
  }
  .code {
    font-style: italic;
    color: var(--comment);
    transition: all ease-in-out 200ms;
  }
  /* Darker background on mouse-over */
  .btn:hover {
    background-color: RoyalBlue;
  }
  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: small;
    margin: 1rem;
  }
</style>
