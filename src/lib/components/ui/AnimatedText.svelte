<script lang="ts">
  import { fly, scale, blur, fade } from "svelte/transition";
  import { elasticOut, elasticIn, bounceOut, backOut } from "svelte/easing";
  import { onMount } from "svelte";

  export let text: string;
  export let variant: 'fade' | 'fly' | 'scale' | 'blur' = 'fade';
  export let direction: 'x' | 'y' | 'both' = 'both';
  export let delay: number = 0;
  export let duration: number = 300;
  export let easing: any = elasticOut;
  export let className: string = '';
  export let hoverColor: string = '';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });

  function getTransition() {
    const baseDelay = delay + Math.random() * 300;
    const baseDuration = duration + Math.random() * 400;

    switch (variant) {
      case 'fly':
        return {
          transition: fly,
          props: {
            delay: baseDelay,
            duration: baseDuration,
            x: direction === 'x' || direction === 'both' ? (Math.random() - 0.5) * 200 : 0,
            y: direction === 'y' || direction === 'both' ? (Math.random() - 0.5) * 200 : 0,
            easing,
          }
        };
      case 'scale':
        return {
          transition: scale,
          props: {
            delay: baseDelay,
            duration: baseDuration,
            start: Math.random() * 2,
            easing,
          }
        };
      case 'blur':
        return {
          transition: blur,
          props: {
            delay: baseDelay,
            duration: baseDuration,
          }
        };
      default:
        return {
          transition: fade,
          props: {
            delay: baseDelay,
            duration: baseDuration,
          }
        };
    }
  }

  $: transitionConfig = getTransition();
</script>

{#if isVisible}
  <span 
    class="animated-text {className} {hoverColor ? `hover:${hoverColor}` : ''}"
    in:transitionConfig.transition={transitionConfig.props}
  >
    {text}
  </span>
{/if}

<style>
  .animated-text {
    display: inline-block;
    transition: var(--transition-normal);
  }
</style>