<script lang="ts">
  import { onMount } from "svelte";

  // Export the post URL
  export let postUrl: string = "https://www.instagram.com/p/DJSl57Ky_r3/";

  // Extract post ID from the URL
  const postId = postUrl.match(/\/p\/([^\/\?]+)/)?.[1] || "";

  let imageUrl: string | null = null;
  let isLoading = true;
  let hasError = false;
  let imageLoaded = false;
  let useIframe = false;
  let iframeLoaded = false;

  // Function to attempt fetching image via API
  async function fetchInstagramImage() {
    try {
      isLoading = true;
      hasError = false;

      const response = await fetch(
        `/api/instagram-image?url=${encodeURIComponent(postUrl)}`
      );

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      if (data.imageUrl && !data.isFallback) {
        imageUrl = data.imageUrl;
        isLoading = false;
        return;
      }

      // If we get here, direct image extraction failed - use iframe
      throw new Error("No direct image found");
    } catch (error) {
      console.log("Direct image fetch failed, using embedded iframe");
      useIframe = true;
      isLoading = false;
    }
  }

  function handleImageLoad() {
    imageLoaded = true;
  }

  function handleImageError() {
    console.log("Image failed to load, switching to iframe");
    hasError = true;
    useIframe = true;
  }

  function handleIframeLoad() {
    iframeLoaded = true;
    isLoading = false;
  }

  function getInstagramEmbedUrl(postId: string) {
    return `https://www.instagram.com/p/${postId}/embed/`;
  }

  onMount(() => {
    fetchInstagramImage();
  });
</script>

<!-- Clean Instagram photo container -->
<div class="instagram-container">
  {#if isLoading}
    <!-- Loading state -->
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <span class="loading-text">Loading...</span>
    </div>
  {:else if imageUrl && !hasError && !useIframe}
    <!-- Direct image display -->
    <div class="image-container">
      <img
        src={imageUrl}
        alt="Instagram post"
        class="instagram-image"
        on:load={handleImageLoad}
        on:error={handleImageError}
      />
    </div>
  {:else if useIframe}
    <!-- Iframe container -->
    <div class="iframe-wrapper">
      {#if !iframeLoaded}
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <span class="loading-text">Loading...</span>
        </div>
      {/if}
      
      <iframe
        src={getInstagramEmbedUrl(postId)}
        title="Instagram post"
        class="instagram-iframe"
        class:loaded={iframeLoaded}
        frameborder="0"
        scrolling="no"
        allowtransparency="true"
        on:load={handleIframeLoad}
      ></iframe>
    </div>
  {/if}

  <!-- Simple footer with link -->
  <div class="instagram-footer">
    <a href={postUrl} target="_blank" rel="noopener noreferrer" class="instagram-link">
      View on Instagram
    </a>
  </div>
</div>

<style>
  /* Clean Instagram Container */
  .instagram-container {
    width: 100%;
    margin: var(--space-md) 0;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-medium);
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    gap: var(--space-md);
    color: var(--text-secondary);
    background: var(--bg-primary);
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border-secondary);
    border-top: 2px solid var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text {
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
  }

  /* Image Container */
  .image-container {
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    overflow: hidden;
  }

  .instagram-image {
    max-width: 100%;
    max-height: 500px;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* Iframe Wrapper */
  .iframe-wrapper {
    width: 100%;
    height: clamp(400px, 60vh, 700px);
    position: relative;
    background: var(--bg-primary);
    overflow: hidden;
  }

  .instagram-iframe {
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
    transition: opacity var(--transition-normal);
    background: transparent;
  }

  .instagram-iframe.loaded {
    opacity: 1;
  }

  /* Footer */
  .instagram-footer {
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-tertiary);
    border-top: 1px solid var(--border-primary);
    text-align: center;
  }

  .instagram-link {
    color: var(--accent-primary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
  }

  .instagram-link:hover {
    color: var(--accent-cyan);
    text-decoration: underline;
  }

  /* Desktop Grid Layout */
  @media (min-width: 1024px) {
    .instagram-container {
      margin: var(--space-lg) 0;
    }

    .image-container {
      min-height: clamp(350px, 40vh, 500px);
    }

    .iframe-wrapper {
      height: clamp(450px, 50vh, 600px);
    }

    .instagram-image {
      max-height: clamp(400px, 50vh, 600px);
    }
  }

  /* Large Desktop Displays */
  @media (min-width: 1440px) {
    .image-container {
      min-height: clamp(400px, 35vh, 550px);
    }

    .iframe-wrapper {
      height: clamp(500px, 45vh, 650px);
    }

    .instagram-image {
      max-height: clamp(450px, 45vh, 650px);
    }
  }

  /* Medium screens (tablet/small desktop) - prevent overflow */
  @media (min-width: 769px) and (max-width: 1023px) {
    .instagram-container {
      margin: var(--space-sm) 0;
      max-width: 100%;
    }

    .image-container {
      min-height: clamp(280px, 35vh, 400px);
    }

    .iframe-wrapper {
      height: clamp(350px, 40vh, 450px);
    }

    .instagram-image {
      max-height: clamp(300px, 40vh, 450px);
    }
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .instagram-container {
      margin: var(--space-sm);
      max-width: calc(100vw - 2rem);
      width: calc(100vw - 2rem);
    }

    .image-container {
      min-height: 280px;
    }

    .iframe-wrapper {
      height: 400px;
    }

    .loading-state {
      height: 280px;
    }

    .instagram-image {
      max-height: 350px;
    }

    .instagram-footer {
      padding: var(--space-xs) var(--space-sm);
    }
  }

  @media (max-width: 480px) {
    .instagram-container {
      margin: var(--space-xs);
      max-width: calc(100vw - 1rem);
      width: calc(100vw - 1rem);
    }

    .image-container {
      min-height: 250px;
    }

    .iframe-wrapper {
      height: 350px;
    }

    .loading-state {
      height: 250px;
    }

    .instagram-image {
      max-height: 300px;
    }
  }

  @media (max-width: 360px) {
    .instagram-container {
      margin: 4px;
      max-width: calc(100vw - 8px);
      width: calc(100vw - 8px);
    }

    .image-container {
      min-height: 220px;
    }

    .iframe-wrapper {
      height: 300px;
    }

    .loading-state {
      height: 220px;
      gap: 8px;
    }

    .loading-text {
      font-size: 10px;
    }

    .instagram-image {
      max-height: 250px;
    }
  }
</style>
