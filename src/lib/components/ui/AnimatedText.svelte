<script lang="ts">
  import { fly, scale, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { modernAnimations, getAnimation, ANIMATION_TIMINGS, EASINGS } from "$lib/utils/animations";

  // Modern, accessible animation system
  export let text: string;
  export let animation: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'hero' = 'fade';
  export let delay: number = 0;
  export let className: string = '';
  export let element: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' = 'span';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });

  // Pre-compute animation configs as reactive statements
  $: fadeConfig = (() => {
    const config = modernAnimations.contentFade(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      easing: config.easing
    });
  })();

  $: slideUpConfig = (() => {
    const config = modernAnimations.slideUp(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      y: config.y,
      easing: config.easing
    });
  })();

  $: slideLeftConfig = (() => {
    const config = modernAnimations.slideLeft(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      x: config.x,
      easing: config.easing
    });
  })();

  $: slideRightConfig = (() => {
    const config = modernAnimations.slideRight(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      x: config.x,
      easing: config.easing
    });
  })();

  $: scaleConfig = (() => {
    const config = modernAnimations.scaleIn(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      start: config.start,
      easing: config.easing
    });
  })();

  $: heroConfig = (() => {
    const config = modernAnimations.heroEntrance(delay);
    return getAnimation({
      delay: config.delay,
      duration: config.duration,
      y: config.y,
      easing: config.easing
    });
  })();
</script>

{#if isVisible}
  {#if animation === 'slideUp'}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:fly={slideUpConfig}
    >
      {text}
    </svelte:element>
  {:else if animation === 'slideLeft'}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:fly={slideLeftConfig}
    >
      {text}
    </svelte:element>
  {:else if animation === 'slideRight'}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:fly={slideRightConfig}
    >
      {text}
    </svelte:element>
  {:else if animation === 'scaleIn'}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:scale={scaleConfig}
    >
      {text}
    </svelte:element>
  {:else if animation === 'hero'}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:fly={heroConfig}
    >
      {text}
    </svelte:element>
  {:else}
    <svelte:element
      this={element}
      class="animated-text {className}"
      in:fade={fadeConfig}
    >
      {text}
    </svelte:element>
  {/if}
{/if}

<style>
  .animated-text {
    display: inline-block;
    transition: var(--transition-normal);
  }
</style>