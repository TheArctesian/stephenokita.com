<script>
  import Youtube from "svelte-youtube-embed";
  export let id;
</script>

<div class="yt"><Youtube {id} /></div>

<style>
  .yt {
    width: 100%;
  }
</style>
