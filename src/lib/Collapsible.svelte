<!-- Collapsible.svelte -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  export let isOpen:boolean = false;
</script>

{#if isOpen}
  <div
    class="collapsible-content"
    in:slide="{{duration: 200}}"
    out:slide="{{duration: 200}}"
    style="overflow: hidden;"
  >
    <slot />
  </div>
{/if}