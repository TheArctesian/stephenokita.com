<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import "../../../app.css";

  let sessionInfo: any = null;
  let isLoading = true;
  let activeTab = "basics";
  let fingerprintHash = "";

  // For the canvas hash visualization
  let canvasImage = "";

  onMount(async () => {
    try {
      // Collect comprehensive browser information
      const fp = await collectFingerprint();
      sessionInfo = fp.details;
      fingerprintHash = fp.hash;
      canvasImage = sessionInfo.canvasFingerprint;
      isLoading = false;
    } catch (error) {
      console.error("Error collecting fingerprint:", error);
      sessionInfo = { error: "Failed to collect fingerprint information" };
      isLoading = false;
    }
  });

  async function collectFingerprint() {
    // Basic browser information
    const fp: any = {
      userAgent: navigator.userAgent,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      platform: navigator.platform,
      vendor: navigator.vendor,
      product: navigator.product,
      language: navigator.language,
      languages: Array.isArray(navigator.languages)
        ? navigator.languages
        : [navigator.language],
      doNotTrack:
        navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack,
      cookieEnabled: navigator.cookieEnabled,

      // Screen properties
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        orientation: window.screen.orientation
          ? {
              type: window.screen.orientation.type,
              angle: window.screen.orientation.angle,
            }
          : "Not available",
      },

      // Window properties
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        devicePixelRatio: window.devicePixelRatio,
        screenLeft: window.screenLeft || window.screenX,
        screenTop: window.screenTop || window.screenY,
      },

      // Network & hardware information
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData,
          }
        : "Not available",
      deviceMemory: navigator.deviceMemory || "Not available",
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,

      // Time and timezone
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),

      // Date formats
      dateFormats: {
        shortDate: new Date().toLocaleDateString(),
        longDate: new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date().toLocaleTimeString(),
      },

      // Plugins & mimeTypes
      plugins: Array.from(navigator.plugins).map((p) => ({
        name: p.name,
        description: p.description,
        filename: p.filename,
      })),

      mimeTypes: Array.from(navigator.mimeTypes).map((m) => ({
        type: m.type,
        description: m.description,
        suffixes: m.suffixes,
      })),

      // Feature detection
      features: {
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        indexedDB: !!window.indexedDB,
        webSockets: !!window.WebSocket,
        webWorkers: !!window.Worker,
        serviceWorker: "serviceWorker" in navigator,
        webGL: (function () {
          try {
            return (
              !!window.WebGLRenderingContext &&
              !!document.createElement("canvas").getContext("webgl")
            );
          } catch (e) {
            return false;
          }
        })(),
        webGL2: (function () {
          try {
            return (
              !!window.WebGL2RenderingContext &&
              !!document.createElement("canvas").getContext("webgl2")
            );
          } catch (e) {
            return false;
          }
        })(),
        webRTC: !!(
          navigator.mediaDevices && navigator.mediaDevices.getUserMedia
        ),
        touchScreen: "ontouchstart" in window,
        pointerEvents: !!window.PointerEvent,
        battery: !!navigator.getBattery,
        bluetooth: !!navigator.bluetooth,
        geolocation: !!navigator.geolocation,
        clipboard: !!navigator.clipboard,
        notifications: !!window.Notification,
        vibration: !!navigator.vibrate,
        payments: !!window.PaymentRequest,
        pdfViewer: !!(
          navigator.pdfViewerEnabled || "pdfViewerEnabled" in navigator
        ),
        speechSynthesis: "speechSynthesis" in window,
        speechRecognition:
          "SpeechRecognition" in window || "webkitSpeechRecognition" in window,
        credentials: !!navigator.credentials,
        permissions: !!navigator.permissions,
      },

      // Browser capabilities
      videoFormats: {
        ogg: !!document
          .createElement("video")
          .canPlayType('video/ogg; codecs="theora"'),
        h264: !!document
          .createElement("video")
          .canPlayType('video/mp4; codecs="avc1.42E01E"'),
        webm: !!document
          .createElement("video")
          .canPlayType('video/webm; codecs="vp8, vorbis"'),
        vp9: !!document
          .createElement("video")
          .canPlayType('video/webm; codecs="vp9"'),
        hls: !!document
          .createElement("video")
          .canPlayType("application/vnd.apple.mpegURL"),
      },

      audioFormats: {
        mp3: !!document.createElement("audio").canPlayType("audio/mpeg;"),
        ogg: !!document
          .createElement("audio")
          .canPlayType('audio/ogg; codecs="vorbis"'),
        aac: !!document.createElement("audio").canPlayType("audio/aac;"),
        flac: !!document.createElement("audio").canPlayType("audio/flac;"),
        wav: !!document
          .createElement("audio")
          .canPlayType('audio/wav; codecs="1"'),
      },

      // Font detection
      fontFamilies: await detectFonts(),

      // Session details
      session: {
        referrer: document.referrer,
        currentURL: window.location.href,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        history: {
          length: window.history.length,
          state: window.history.state,
        },
        performance: window.performance
          ? {
              navigationStart: window.performance.timing?.navigationStart,
              loadEventEnd: window.performance.timing?.loadEventEnd,
              pageLoadTime: window.performance.timing
                ? window.performance.timing.loadEventEnd -
                  window.performance.timing.navigationStart
                : "Not available",
            }
          : "Not available",
        lastActivity: Date.now(),
      },
    };

    // Generate canvas fingerprint
    fp.canvasFingerprint = await generateCanvasFingerprint();

    // WebGL fingerprint
    fp.webGL = await collectWebGLInfo();

    // Audio fingerprint
    fp.audioFingerprint = await generateAudioFingerprint();

    // Generate hash
    const hash = await generateFingerprintHash(fp);

    return {
      hash,
      details: fp,
    };
  }

  async function generateCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return "";

    canvas.width = 220;
    canvas.height = 60;

    // Text with different styles
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#F60";
    ctx.fillRect(10, 10, 100, 30);
    ctx.fillStyle = "#069";
    ctx.fillText("Browser Fingerprint", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Browser Fingerprint", 4, 17);

    // Add a gradient
    const gradient = ctx.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1.0, "blue");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 30, 220, 30);

    // Add some shapes
    ctx.beginPath();
    ctx.arc(50, 50, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(100, 40, 60, 10);

    ctx.fillStyle = "#069";
    ctx.font = "10px Arial";
    ctx.fillText(new Date().toISOString(), 110, 42);

    return canvas.toDataURL();
  }

  async function collectWebGLInfo() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) return "WebGL not supported";

      const info = {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        extensions: gl.getSupportedExtensions(),
      };

      // Try to get unmasked info
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        info.unmaskedVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        info.unmaskedRenderer = gl.getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        );
      }

      return info;
    } catch (e) {
      return { error: "Error accessing WebGL" };
    }
  }

  async function generateAudioFingerprint() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const oscillator = audioContext.createOscillator();
      const dynamicsCompressor = audioContext.createDynamicsCompressor();

      // Set some properties
      analyser.fftSize = 1024;
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);

      // Configure dynamics compressor
      dynamicsCompressor.threshold.setValueAtTime(
        -50,
        audioContext.currentTime
      );
      dynamicsCompressor.knee.setValueAtTime(40, audioContext.currentTime);
      dynamicsCompressor.ratio.setValueAtTime(12, audioContext.currentTime);
      dynamicsCompressor.attack.setValueAtTime(0, audioContext.currentTime);
      dynamicsCompressor.release.setValueAtTime(0.25, audioContext.currentTime);

      // Connect the nodes
      oscillator.connect(dynamicsCompressor);
      dynamicsCompressor.connect(analyser);
      analyser.connect(audioContext.destination);

      // Start the oscillator for a very short time
      oscillator.start(0);
      oscillator.stop(audioContext.currentTime + 0.1);

      // Capture the frequency data
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      return new Promise((resolve) => {
        setTimeout(() => {
          analyser.getByteFrequencyData(dataArray);
          const fingerprint = Array.from(dataArray).slice(0, 30).join(",");

          // Close audio context
          audioContext.close();
          resolve(fingerprint);
        }, 100);
      });
    } catch (e) {
      return "Audio fingerprinting not supported";
    }
  }

  async function detectFonts() {
    const baseFonts = ["monospace", "sans-serif", "serif"];
    const fontList = [
      "Arial",
      "Arial Black",
      "Arial Narrow",
      "Calibri",
      "Cambria",
      "Cambria Math",
      "Comic Sans MS",
      "Consolas",
      "Courier",
      "Courier New",
      "Georgia",
      "Helvetica",
      "Impact",
      "Lucida Console",
      "Lucida Sans Unicode",
      "Microsoft Sans Serif",
      "Palatino Linotype",
      "Segoe UI",
      "Tahoma",
      "Times",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
    ];

    const testString = "mmmmmmmmmmlli";
    const testSize = "72px";
    const h = document.createElement("span");
    h.style.fontSize = testSize;
    h.innerHTML = testString;
    document.body.appendChild(h);

    const defaultWidth = {};
    const defaultHeight = {};

    baseFonts.forEach((baseFont) => {
      h.style.fontFamily = baseFont;
      defaultWidth[baseFont] = h.offsetWidth;
      defaultHeight[baseFont] = h.offsetHeight;
    });

    const detectedFonts = [];
    for (const font of fontList) {
      let detected = false;
      for (const baseFont of baseFonts) {
        h.style.fontFamily = `${font}, ${baseFont}`;
        if (
          h.offsetWidth !== defaultWidth[baseFont] ||
          h.offsetHeight !== defaultHeight[baseFont]
        ) {
          detected = true;
          break;
        }
      }
      if (detected) detectedFonts.push(font);
    }

    document.body.removeChild(h);
    return detectedFonts;
  }

  async function generateFingerprintHash(fingerprint: any) {
    // Convert fingerprint to JSON string
    const fpString = JSON.stringify(fingerprint);

    // Use SubtleCrypto for hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(fpString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function setActiveTab(tab: string) {
    activeTab = tab;
  }

  // Helper function to format objects for display
  function formatObject(obj: any): string {
    if (obj === null || obj === undefined) return "Not available";
    if (typeof obj !== "object") return String(obj);

    return JSON.stringify(obj, null, 2);
  }
</script>

<div out:slide>
  {#if isLoading}
    <div class="text" in:fade={{ delay: 1 * 150, duration: 300 }}>
      <p class="text-center">Loading your browser fingerprint data...</p>
    </div>
  {:else if sessionInfo}
    <div class="tabs" in:fade={{ delay: 1 * 150, duration: 300 }}>
      <button
        class={activeTab === "basics" ? "active" : ""}
        on:click={() => setActiveTab("basics")}
      >
        Basic Info
      </button>
      <button
        class={activeTab === "screen" ? "active" : ""}
        on:click={() => setActiveTab("screen")}
      >
        Screen & Window
      </button>
      <button
        class={activeTab === "hardware" ? "active" : ""}
        on:click={() => setActiveTab("hardware")}
      >
        Hardware & Network
      </button>
      <button
        class={activeTab === "features" ? "active" : ""}
        on:click={() => setActiveTab("features")}
      >
        Features
      </button>
      <button
        class={activeTab === "media" ? "active" : ""}
        on:click={() => setActiveTab("media")}
      >
        Media Support
      </button>
      <button
        class={activeTab === "fonts" ? "active" : ""}
        on:click={() => setActiveTab("fonts")}
      >
        Fonts
      </button>
      <button
        class={activeTab === "plugins" ? "active" : ""}
        on:click={() => setActiveTab("plugins")}
      >
        Plugins
      </button>
      <button
        class={activeTab === "session" ? "active" : ""}
        on:click={() => setActiveTab("session")}
      >
        Session
      </button>
    </div>

    <!-- Basic Information -->
    {#if activeTab === "basics"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Basic Browser Information
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div class="info-item">
            <strong>User Agent</strong>
            <p>{sessionInfo.userAgent}</p>
          </div>
          <div class="info-item">
            <strong>Browser</strong>
            <p>{sessionInfo.appName || "Not available"}</p>
          </div>
          <div class="info-item">
            <strong>Version</strong>
            <p>{sessionInfo.appVersion || "Not available"}</p>
          </div>
          <div class="info-item">
            <strong>Platform</strong>
            <p>{sessionInfo.platform}</p>
          </div>
          <div class="info-item">
            <strong>Vendor</strong>
            <p>{sessionInfo.vendor || "Not available"}</p>
          </div>
          <div class="info-item">
            <strong>Language</strong>
            <p>{sessionInfo.language}</p>
          </div>
          <div class="info-item">
            <strong>All Languages</strong>
            <p>
              {Array.isArray(sessionInfo.languages)
                ? sessionInfo.languages.join(", ")
                : sessionInfo.language}
            </p>
          </div>
          <div class="info-item">
            <strong>Do Not Track</strong>
            <p>{sessionInfo.doNotTrack || "Not set"}</p>
          </div>
          <div class="info-item">
            <strong>Cookies Enabled</strong>
            <p>{sessionInfo.cookieEnabled ? "Yes" : "No"}</p>
          </div>
          <div class="info-item">
            <strong>Timezone</strong>
            <p>{sessionInfo.timezone}</p>
          </div>
          <div class="info-item">
            <strong>Timezone Offset</strong>
            <p>{sessionInfo.timezoneOffset} minutes</p>
          </div>
          <div class="info-item">
            <strong>Date Format</strong>
            <p>{sessionInfo.dateFormats?.shortDate}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Screen & Window Information -->
    {#if activeTab === "screen"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Screen & Window Properties
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div class="info-item">
            <strong>Screen Resolution</strong>
            <p>{sessionInfo.screen.width} × {sessionInfo.screen.height}</p>
          </div>
          <div class="info-item">
            <strong>Available Screen</strong>
            <p>
              {sessionInfo.screen.availWidth} × {sessionInfo.screen.availHeight}
            </p>
          </div>
          <div class="info-item">
            <strong>Color Depth</strong>
            <p>{sessionInfo.screen.colorDepth} bits</p>
          </div>
          <div class="info-item">
            <strong>Pixel Depth</strong>
            <p>{sessionInfo.screen.pixelDepth} bits</p>
          </div>
          <div class="info-item">
            <strong>Device Pixel Ratio</strong>
            <p>{sessionInfo.window.devicePixelRatio}</p>
          </div>
          <div class="info-item">
            <strong>Screen Orientation</strong>
            <p>
              {typeof sessionInfo.screen.orientation === "object"
                ? sessionInfo.screen.orientation.type
                : "Not available"}
            </p>
          </div>
          <div class="info-item">
            <strong>Inner Window Size</strong>
            <p>
              {sessionInfo.window.innerWidth} × {sessionInfo.window.innerHeight}
            </p>
          </div>
          <div class="info-item">
            <strong>Outer Window Size</strong>
            <p>
              {sessionInfo.window.outerWidth} × {sessionInfo.window.outerHeight}
            </p>
          </div>
          <div class="info-item">
            <strong>Window Position</strong>
            <p>
              X: {sessionInfo.window.screenLeft}, Y: {sessionInfo.window
                .screenTop}
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Hardware & Network -->
    {#if activeTab === "hardware"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Hardware & Network Information
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
          <div class="info-item">
            <strong>CPU Cores</strong>
            <p>{sessionInfo.hardwareConcurrency || "Not available"}</p>
          </div>
          <div class="info-item">
            <strong>Device Memory</strong>
            <p>{sessionInfo.deviceMemory || "Not available"} GB</p>
          </div>
          <div class="info-item">
            <strong>Max Touch Points</strong>
            <p>{sessionInfo.maxTouchPoints || "Not available"}</p>
          </div>
          <div class="info-item">
            <strong>Network Type</strong>
            <p>
              {sessionInfo.connection && sessionInfo.connection.effectiveType
                ? sessionInfo.connection.effectiveType
                : "Not available"}
            </p>
          </div>
          <div class="info-item">
            <strong>Downlink Speed</strong>
            <p>
              {sessionInfo.connection && sessionInfo.connection.downlink
                ? `${sessionInfo.connection.downlink} Mbps`
                : "Not available"}
            </p>
          </div>
          <div class="info-item">
            <strong>Round Trip Time</strong>
            <p>
              {sessionInfo.connection && sessionInfo.connection.rtt
                ? `${sessionInfo.connection.rtt} ms`
                : "Not available"}
            </p>
          </div>
          <div class="info-item">
            <strong>Data Saver</strong>
            <p>
              {sessionInfo.connection &&
              typeof sessionInfo.connection.saveData !== "undefined"
                ? sessionInfo.connection.saveData
                  ? "On"
                  : "Off"
                : "Not available"}
            </p>
          </div>
          {#if sessionInfo.webGL && typeof sessionInfo.webGL === "object"}
            <div class="info-item">
              <strong>GPU Vendor</strong>
              <p>
                {sessionInfo.webGL.unmaskedVendor ||
                  sessionInfo.webGL.vendor ||
                  "Not available"}
              </p>
            </div>
            <div class="info-item">
              <strong>GPU Renderer</strong>
              <p>
                {sessionInfo.webGL.unmaskedRenderer ||
                  sessionInfo.webGL.renderer ||
                  "Not available"}
              </p>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Features -->
    {#if activeTab === "features"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Browser Features & Capabilities
        </p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {#each Object.entries(sessionInfo.features) as [feature, supported]}
            <div class="feature-item">
              <strong
                >{feature
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}</strong
              >
              <span class={supported ? "supported" : "not-supported"}>
                {supported ? "✓" : "✗"}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Media Support -->
    {#if activeTab === "media"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Media Format Support
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 class="text-m font-bold mb-2">Video Formats</h3>
            <div class="grid grid-cols-2 gap-2">
              {#each Object.entries(sessionInfo.videoFormats) as [format, supported]}
                <div class="feature-item">
                  <strong>{format.toUpperCase()}</strong>
                  <span class={supported ? "supported" : "not-supported"}>
                    {supported ? "✓" : "✗"}
                  </span>
                </div>
              {/each}
            </div>
          </div>

          <div>
            <h3 class="text-m font-bold mb-2">Audio Formats</h3>
            <div class="grid grid-cols-2 gap-2">
              {#each Object.entries(sessionInfo.audioFormats) as [format, supported]}
                <div class="feature-item">
                  <strong>{format.toUpperCase()}</strong>
                  <span class={supported ? "supported" : "not-supported"}>
                    {supported ? "✓" : "✗"}
                  </span>
                </div>
              {/each}
            </div>
          </div>

          {#if sessionInfo.audioFingerprint}
            <div class="col-span-1 sm:col-span-2">
              <h3 class="text-m font-bold mb-2">
                Audio Processing Fingerprint
              </h3>
              <div class=" overflow-scroll text-wrap italic">
                {sessionInfo.audioFingerprint}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Fonts -->
    {#if activeTab === "fonts"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Detected Fonts
        </p>
        <div class="font-grid">
          {#each sessionInfo.fontFamilies as font}
            <div class="font-item" style="font-family: {font}">
              <span class="font-name">{font}</span>
              <span class="sample" style="font-family: {font}">AaBbCc123</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Plugins -->
    {#if activeTab === "plugins"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Browser Plugins & MIME Types
        </p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 class="text-m font-bold mb-2">
              Plugins ({sessionInfo.plugins.length})
            </h3>
            {#if sessionInfo.plugins.length > 0}
              <div class="plugins-list">
                {#each sessionInfo.plugins as plugin}
                  <div class="plugin-item">
                    <strong>{plugin.name}</strong>
                    {#if plugin.description}
                      <p class="description">{plugin.description}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            {:else}
              <p>No plugins detected</p>
            {/if}
          </div>

          <div>
            <h3 class="text-m font-bold mb-2">
              MIME Types ({sessionInfo.mimeTypes.length})
            </h3>
            {#if sessionInfo.mimeTypes.length > 0}
              <div class="mime-list">
                {#each sessionInfo.mimeTypes as mime}
                  <div class="mime-item">
                    <strong>{mime.type}</strong>
                    {#if mime.description}
                      <p class="description">{mime.description}</p>
                    {/if}
                    {#if mime.suffixes}
                      <p class="suffixes">Extensions: {mime.suffixes}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            {:else}
              <p>No MIME types detected</p>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!-- Session -->
    {#if activeTab === "session"}
      <div class="text" in:fade={{ delay: 2 * 150, duration: 300 }}>
        <p
          class="text-l font-bold m-auto text-[var(--fg)] bg-[var(--bg)] p-2 w-fit rounded-[0.2rem] mb-4"
        >
          Current Session Details
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="info-item">
            <strong>Current URL</strong>
            <p>{sessionInfo.session.currentURL}</p>
          </div>
          <div class="info-item">
            <strong>Referrer</strong>
            <p>{sessionInfo.session.referrer || "None"}</p>
          </div>
          <div class="info-item">
            <strong>Protocol</strong>
            <p>{sessionInfo.session.protocol}</p>
          </div>
          <div class="info-item">
            <strong>Hostname</strong>
            <p>{sessionInfo.session.hostname}</p>
          </div>
          <div class="info-item">
            <strong>Port</strong>
            <p>{sessionInfo.session.port || "Default"}</p>
          </div>
          <div class="info-item">
            <strong>Path</strong>
            <p>{sessionInfo.session.pathname}</p>
          </div>
          <div class="info-item">
            <strong>Query Parameters</strong>
            <p>{sessionInfo.session.search || "None"}</p>
          </div>
          <div class="info-item">
            <strong>History Length</strong>
            <p>{sessionInfo.session.history?.length || "Not available"}</p>
          </div>
          {#if sessionInfo.session.performance && typeof sessionInfo.session.performance === "object"}
            <div class="info-item">
              <strong>Page Load Time</strong>
              <p>
                {typeof sessionInfo.session.performance.pageLoadTime ===
                "number"
                  ? `${sessionInfo.session.performance.pageLoadTime}ms`
                  : "Not available"}
              </p>
            </div>
          {/if}
          <div class="info-item">
            <strong>Current Date/Time</strong>
            <p>
              {sessionInfo.dateFormats?.longDate}
              {sessionInfo.dateFormats?.time}
            </p>
          </div>
        </div>
      </div>
    {/if}
    <div
      class="flex md:flex-row mt-4 mb-4 flex-col"
      in:fade={{ delay: 3 * 150, duration: 300 }}
    >
      <div
        class="bg-[var(--fg)] rounded-[0.2rem] mb-4 md:mb-0 p-4 mr-4 ml-4 flex flex-col justify-center items-center"
      >
        <span class="sm:text-2xl mb-2 font-bold text-xl"
          >Browser Fingerprint</span
        >
        <div class="">
          {#if canvasImage}
            <img
              src={canvasImage}
              alt="Canvas Fingerprint"
              class="canvas-fingerprint"
            />
          {:else}
            <div class="canvas-placeholder"></div>
          {/if}
        </div>
      </div>
      <div class="bg-[var(--fg)] p-4 mr-4 ml-4 md:ml-0 rounded-[0.2rem]">
        <p>
          Below is all the information your browser reveals about you without
          asking for any explicit permission. This data can be used to create a
          unique fingerprint that identifies your browser across websites, even
          without cookies or local storage.
        </p>
        {#if fingerprintHash}
          <p class="mt-4">
            <strong>Your Browser Fingerprint:</strong>
            <span class="fingerprint-hash">{fingerprintHash}</span>
          </p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  img {
    width: 3rem;
    margin: auto;
  }

  .canvas-fingerprint {
    width: 220px;
    height: 60px;
    border: 1px solid #ddd;
  }

  .canvas-placeholder {
    width: 220px;
    height: 60px;
    background-color: #eee;
    border: 1px solid #ddd;
  }

  .fingerprint-hash {
    font-family: monospace;
    background-color: var(--bg);
    padding: 0.25rem 0.5rem;
    border-radius: 0.2rem;
    word-break: break-all;
    color: white;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    background-color: var(--fg);
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem;
    border-radius: 0.2rem;
  }

  .tabs button {
    background-color: var(--fg);
    color: var(--text);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tabs button.active {
    background-color: var(--orange);
    color: white;
  }

  .tabs button:hover:not(.active) {
    background-color: var(--purple);
  }

  .text {
    background-color: var(--fg);
    padding: 1rem;
    border-radius: 0.2rem;
    font-size: medium;
    margin: 1rem;
  }

  .info-item {
    padding: 0.75rem;
    border-radius: 0.2rem;
    border: 0.2rem solid rgba(0, 0, 0, 0.8);
  }

  .info-item strong {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--orange);
  }

  .info-item p {
    word-break: break-word;
    font-family: monospace;
    font-size: 0.85rem;
  }

  .feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border: 0.2rem solid rgba(0, 0, 0, 0.8);
    border-radius: 0.2rem;
  }

  .supported {
    color: #4caf50;
    font-weight: bold;
  }

  .not-supported {
    color: #f44336;
  }

  .code-block {
    background-color: var(--bg);
    padding: 0.75rem;
    border-radius: 0.2rem;
    font-family: monospace;
    font-size: 0.85rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .font-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
  }

  .font-item {
    padding: 1rem;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid rgba(0, 0, 0, 0.8);
  }

  .font-name {
    font-size: large;
    text-align: center;
    color: var(--orange);
    margin-bottom: 0.5rem;
  }

  .sample {
    font-size: medium;
  }

  .plugins-list,
  .mime-list {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
    border-radius: 0.2rem;
  }

  .plugin-item,
  .mime-item {
    padding: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .plugin-item:last-child,
  .mime-item:last-child {
    border-bottom: none;
  }

  .description,
  .suffixes {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    color: var(--comment);
  }

  .implications-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .implications-list li {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 640px) {
    .tabs {
      flex-direction: column;
    }

    .tabs button {
      width: 100%;
    }
  }
</style>
