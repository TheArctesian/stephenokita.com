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

  function getTransition() {
    let config;

    switch (animation) {
      case 'slideUp':
        config = modernAnimations.slideUp(delay);
        return {
          transition: fly,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            y: config.y,
            easing: config.easing
          })
        };
      case 'slideLeft':
        config = modernAnimations.slideLeft(delay);
        return {
          transition: fly,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            x: config.x,
            easing: config.easing
          })
        };
      case 'slideRight':
        config = modernAnimations.slideRight(delay);
        return {
          transition: fly,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            x: config.x,
            easing: config.easing
          })
        };
      case 'scaleIn':
        config = modernAnimations.scaleIn(delay);
        return {
          transition: scale,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            start: config.start,
            easing: config.easing
          })
        };
      case 'hero':
        config = modernAnimations.heroEntrance(delay);
        return {
          transition: fly,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            y: config.y,
            easing: config.easing
          })
        };
      default:
        config = modernAnimations.contentFade(delay);
        return {
          transition: fade,
          props: getAnimation({
            delay: config.delay,
            duration: config.duration,
            easing: config.easing
          })
        };
    }
  }

  $: transitionConfig = getTransition();
</script>

{#if isVisible}
  <svelte:element
    this={element}
    class="animated-text {className}"
    in:transitionConfig.transition={transitionConfig.props}
  >
    {text}
  </svelte:element>
{/if}

<style>
  .animated-text {
    display: inline-block;
    transition: var(--transition-normal);
  }
</style>