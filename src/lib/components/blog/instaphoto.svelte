<script lang="ts">
  import { onMount } from "svelte";

  // Export the post URL
  export let postUrl: string = "https://www.instagram.com/p/DJSl57Ky_r3/";

  // Extract post ID from the URL
  const postId = postUrl.match(/\/p\/([^\/\?]+)/)?.[1] || "";

  let imageUrl: string | null = null;
  let isLoading = true;
  let hasError = false;
  let imageRatio: number | null = null;
  let imageLoaded = false;
  let isFallbackImage = false;

  // Function to fetch Instagram HTML and extract image URL
  async function fetchInstagramImage() {
    try {
      isLoading = true;

      // We'll fetch the Instagram page from the server side
      const response = await fetch(
        `/api/instagram-image?url=${encodeURIComponent(postUrl)}`
      );

      if (!response.ok) {
        throw new Error("Failed to load image");
      }

      const data = await response.json();

      if (data.imageUrl) {
        imageUrl = data.imageUrl;
        isFallbackImage = !!data.isFallback;

        // If we have image dimensions, use them
        if (data.width && data.height) {
          imageRatio = data.height / data.width;
        }

        isLoading = false;
      } else {
        throw new Error("No image found");
      }
    } catch (error) {
      console.error("Error fetching Instagram image:", error);
      hasError = true;
      isLoading = false;
      imageUrl = null;
    }
  }

  // Fallback to iframe approach if server-side fetching fails
  let iframeLoaded = false;
  let showFallback = false;

  function getInstagramEmbedUrl(postId: string) {
    // Using the most minimal version of embed
    return `https://www.instagram.com/p/${postId}/embed/?hidecaption=1&cr=1`;
  }

  function handleImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;

    // Calculate aspect ratio from loaded image
    if (img.naturalWidth > 0) {
      imageRatio = img.naturalHeight / img.naturalWidth;
    }

    imageLoaded = true;
  }

  function handleImageError() {
    console.error("Image failed to load:", imageUrl);
    hasError = true;

    // If this was already a fallback image and it still failed, we need to use iframe
    if (isFallbackImage) {
      showFallback = true;
    }
  }

  onMount(() => {
    fetchInstagramImage();

    // Fallback timeout for iframe method
    const timeout = setTimeout(() => {
      if (!imageUrl && !iframeLoaded) {
        showFallback = true;
      }
    }, 5000);

    return () => clearTimeout(timeout);
  });

  function handleIframeLoad() {
    iframeLoaded = true;
  }

  // Determine container height based on ratio or use default
  $: containerHeight = imageRatio
    ? `${Math.min(Math.max(imageRatio * 100, 56), 125)}vw` // Limit to reasonable range between 56-125% of width
    : "220px";

  $: objectFit = imageRatio && imageRatio > 1.2 ? "contain" : "cover";
</script>

<div
  class="instagram-post-container bg-[var(--bg)] text-[var(--fg)] rounded-md overflow-hidden shadow-lg border border-[var(--selection)] w-full"
>
  <!-- Image container with dynamic height based on ratio -->
  <div
    class="relative w-full overflow-hidden"
    style="height: {imageLoaded ? containerHeight : '220px'};"
  >
    {#if isLoading && !imageUrl}
      <!-- Loading indicator -->
      <div
        class="w-full h-full flex items-center justify-center bg-[var(--selection)]"
      >
        <div
          class="animate-pulse w-8 h-8 rounded-full bg-[var(--comment)]"
        ></div>
      </div>
    {:else if imageUrl && !hasError}
      <!-- Direct image display when we have the URL -->
      <img
        src={imageUrl}
        alt="Instagram post"
        class="w-full h-full"
        style="object-fit: {objectFit};"
        on:load={handleImageLoad}
        on:error={handleImageError}
      />
    {:else if hasError || showFallback}
      <!-- Fallback to iframe method -->
      <div class="w-full h-full relative overflow-hidden">
        {#if !iframeLoaded}
          <div
            class="w-full h-full flex items-center justify-center bg-[var(--selection)]"
          >
            <div
              class="animate-pulse w-8 h-8 rounded-full bg-[var(--comment)]"
            ></div>
          </div>
        {/if}

        <!-- Fixed iframe positioning to show just the image part -->
        <div class="absolute inset-0 overflow-hidden" style="height: 100%;">
          <iframe
            src={getInstagramEmbedUrl(postId)}
            class="absolute top-0 left-0 w-[100%] h-[500px] transform scale-[1.2] translate-y-[-30%]"
            frameborder="0"
            scrolling="no"
            title="Instagram post"
            on:load={handleIframeLoad}
            style="max-width: none; pointer-events: none;"
          ></iframe>
        </div>
      </div>
    {/if}
  </div>

  <!-- Post info -->
  <div class="flex justify-end items-center px-3 py-1">
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="text-xs text-[var(--purple)] hover:text-[var(--pink)] transition-colors"
    >
      Original post
    </a>
  </div>
</div>
