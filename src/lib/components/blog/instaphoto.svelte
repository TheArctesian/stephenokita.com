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

<!-- Terminal-styled Instagram post container -->
<div class="terminal-instagram">
  <!-- Terminal header -->
  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="control-button close"></div>
      <div class="control-button minimize"></div>
      <div class="control-button maximize"></div>
    </div>
    <div class="terminal-title">instagram:{postId}</div>
  </div>

  <!-- Terminal body -->
  <div class="terminal-body">
    <!-- Command prompt -->
    <div class="prompt-line">
      <span class="prompt">➜</span>
      <span class="path">~/social</span>
      <span class="command">curl -s instagram.com/p/{postId}</span>
    </div>

    <!-- Content area -->
    <div class="content-area">
      {#if isLoading}
        <!-- Loading state -->
        <div class="loading-state">
          <div class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
          <span class="loading-text">fetching content...</span>
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
        <!-- Styled iframe container -->
        <div class="iframe-wrapper">
          {#if !iframeLoaded}
            <div class="loading-state">
              <div class="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
              <span class="loading-text">loading embed...</span>
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
    </div>

    <!-- Footer with link -->
    <div class="prompt-line footer-line">
      <span class="prompt">➜</span>
      <span class="path">~/social</span>
      <span class="command">
        <a href={postUrl} target="_blank" rel="noopener noreferrer" class="instagram-link">
          open {postId} --external
        </a>
      </span>
    </div>
  </div>
</div>

<style>
  /* Terminal Container */
  .terminal-instagram {
    width: 100%;
    margin: var(--space-md) 0;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-primary);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    font-family: var(--font-family-mono);
    box-sizing: border-box;
  }

  /* Terminal Header */
  .terminal-header {
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-primary);
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-sm);
  }

  .terminal-controls {
    display: flex;
    gap: var(--space-xs);
  }

  .control-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid var(--border-secondary);
  }

  .control-button.close {
    background: var(--status-error);
  }
  .control-button.minimize {
    background: var(--status-warning);
  }
  .control-button.maximize {
    background: var(--status-success);
  }

  .terminal-title {
    color: var(--text-primary);
    font-weight: 500;
    font-size: var(--font-size-sm);
  }

  /* Terminal Body */
  .terminal-body {
    padding: var(--space-lg);
    background: var(--bg-primary);
    min-height: 400px;
  }

  .prompt-line {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-mono);
  }

  .prompt {
    color: var(--accent-primary);
    font-weight: bold;
  }

  .path {
    color: var(--accent-secondary);
  }

  .command {
    color: var(--text-primary);
  }

  /* Content Area */
  .content-area {
    margin-left: var(--space-lg);
    margin-bottom: var(--space-lg);
    margin-right: var(--space-lg);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    min-height: 300px;
    position: relative;
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
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
  }

  .loading-dots {
    display: flex;
    gap: 4px;
  }

  .loading-dots span {
    animation: dots 1.4s infinite ease-in-out;
    color: var(--accent-primary);
    font-size: var(--font-size-lg);
  }

  .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
  .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

  @keyframes dots {
    0%, 80%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }

  .loading-text {
    color: var(--text-tertiary);
  }

  /* Image Container */
  .image-container {
    width: 100%;
    height: 100%;
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
    border-radius: var(--radius-sm);
  }

  /* Iframe Wrapper */
  .iframe-wrapper {
    width: 100%;
    height: clamp(400px, 60vh, 700px);
    position: relative;
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .instagram-iframe {
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
    transition: opacity var(--transition-normal);
    background: transparent;
    max-width: 100%;
    object-fit: contain;
  }

  .instagram-iframe.loaded {
    opacity: 1;
  }

  /* Footer Line */
  .footer-line {
    margin-top: var(--space-md);
    padding-top: var(--space-sm);
    border-top: 1px solid var(--border-secondary);
  }

  .instagram-link {
    color: var(--accent-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    font-family: var(--font-family-mono);
  }

  .instagram-link:hover {
    color: var(--accent-cyan);
    text-decoration: underline;
  }

  /* Desktop Grid Layout */
  @media (min-width: 1024px) {
    .terminal-instagram {
      margin: var(--space-lg) 0;
    }

    .content-area {
      min-height: clamp(350px, 40vh, 500px);
    }

    .iframe-wrapper {
      height: clamp(450px, 50vh, 600px);
    }

    .image-container {
      min-height: clamp(350px, 40vh, 500px);
    }

    .instagram-image {
      max-height: clamp(400px, 50vh, 600px);
    }
  }

  /* Large Desktop Displays */
  @media (min-width: 1440px) {
    .content-area {
      min-height: clamp(400px, 35vh, 550px);
    }

    .iframe-wrapper {
      height: clamp(500px, 45vh, 650px);
    }

    .image-container {
      min-height: clamp(400px, 35vh, 550px);
    }

    .instagram-image {
      max-height: clamp(450px, 45vh, 650px);
    }
  }

  /* Medium screens (tablet/small desktop) - prevent overflow */
  @media (min-width: 769px) and (max-width: 1023px) {
    .terminal-instagram {
      margin: var(--space-sm) 0;
      max-width: 100%;
      overflow: hidden;
    }

    .content-area {
      margin-left: var(--space-md);
      margin-right: var(--space-md);
      min-height: clamp(280px, 35vh, 400px);
    }

    .iframe-wrapper {
      height: clamp(350px, 40vh, 450px);
      max-width: 100%;
    }

    .image-container {
      min-height: clamp(280px, 35vh, 400px);
      max-width: 100%;
    }

    .instagram-image {
      max-height: clamp(300px, 40vh, 450px);
      max-width: 100%;
      object-fit: contain;
    }

    .instagram-iframe {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }

    .terminal-body {
      padding: var(--space-md);
    }

    .prompt-line {
      font-size: var(--font-size-sm);
      flex-wrap: wrap;
    }

    .command {
      word-break: break-word;
      overflow-wrap: break-word;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .terminal-instagram {
      margin: var(--space-sm);
      max-width: calc(100vw - 2rem);
      width: calc(100vw - 2rem);
    }

    .terminal-header {
      padding: var(--space-xs) var(--space-sm);
      flex-direction: row;
      justify-content: space-between;
    }

    .terminal-title {
      font-size: var(--font-size-xs);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }

    .control-button {
      width: 10px;
      height: 10px;
    }

    .terminal-body {
      padding: var(--space-sm);
      min-height: 300px;
    }

    .prompt-line {
      font-size: var(--font-size-xs);
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-bottom: var(--space-xs);
    }

    .command {
      word-break: break-all;
      font-size: var(--font-size-xs);
    }

    .content-area {
      margin-left: var(--space-sm);
      margin-right: var(--space-sm);
      margin-bottom: var(--space-sm);
      min-height: 280px;
    }

    .iframe-wrapper {
      height: 400px;
    }

    .loading-state {
      height: 280px;
    }

    .image-container {
      min-height: 280px;
    }

    .instagram-image {
      max-height: 350px;
    }
  }

  @media (max-width: 480px) {
    .terminal-instagram {
      margin: var(--space-xs);
      max-width: calc(100vw - 1rem);
      width: calc(100vw - 1rem);
    }

    .terminal-header {
      padding: var(--space-xs);
    }

    .terminal-title {
      font-size: var(--font-size-xs);
      max-width: 120px;
    }

    .terminal-body {
      padding: var(--space-xs) var(--space-sm);
    }

    .prompt-line {
      font-size: 11px;
    }

    .content-area {
      margin-left: var(--space-xs);
      margin-right: var(--space-xs);
      margin-bottom: var(--space-xs);
      min-height: 250px;
    }

    .iframe-wrapper {
      height: 350px;
    }

    .loading-state {
      height: 250px;
    }

    .image-container {
      min-height: 250px;
    }

    .instagram-image {
      max-height: 300px;
    }

    .footer-line {
      margin-top: var(--space-sm);
    }
  }

  @media (max-width: 360px) {
    .terminal-instagram {
      margin: 4px;
      max-width: calc(100vw - 8px);
      width: calc(100vw - 8px);
    }

    .terminal-header {
      padding: 8px;
    }

    .terminal-title {
      font-size: 10px;
      max-width: 100px;
    }

    .control-button {
      width: 8px;
      height: 8px;
    }

    .terminal-body {
      padding: 8px 12px;
    }

    .prompt-line {
      font-size: 10px;
      gap: 4px;
    }

    .content-area {
      margin-left: 8px;
      margin-right: 8px;
      margin-bottom: 8px;
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

    .image-container {
      min-height: 220px;
    }

    .instagram-image {
      max-height: 250px;
    }
  }
</style>
