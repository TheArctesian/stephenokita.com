<script>
  import { onMount } from "svelte";
  import mermaid from "mermaid";

  let scale = 3;
  let container;
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  function zoomIn() {
    if (scale < 10) {
      scale += 0.5;
      updateScale();
    }
  }

  function zoomOut() {
    if (scale > 0.5) {
      scale -= 0.5;
      updateScale();
    }
  }

  function resetZoom() {
    scale = 3;
    updateScale();
    if (container) {
      container.scrollLeft = 0;
      container.scrollTop = 0;
    }
  }

  function updateScale() {
    if (container) {
      const diagramElement = container.querySelector(".mermaid svg");
      if (diagramElement) {
        diagramElement.style.transform = `scale(${scale})`;
        diagramElement.style.transformOrigin = "top middle";
      }
    }
  }

  // Dragging functionality
  function mouseDownHandler(e) {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    startY = e.pageY - container.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
    container.style.cursor = "grabbing";
  }

  function mouseMoveHandler(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
  }

  function mouseUpHandler() {
    isDragging = false;
    container.style.cursor = "grab";
  }

  function touchStartHandler(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      startY = e.touches[0].pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    }
  }

  function touchMoveHandler(e) {
    if (!isDragging || e.touches.length !== 1) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const y = e.touches[0].pageY - container.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
  }

  function touchEndHandler() {
    isDragging = false;
  }

  onMount(() => {
    try {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        flowchart: {
          htmlLabels: true,
          curve: "basis",
        },
        deterministicIds: true,
        fontSize: 14,
      });

      // Force render if not auto-rendering
      setTimeout(() => {
        mermaid.init(undefined, document.querySelectorAll(".mermaid"));

        // Apply initial zoom and setup drag
        if (container) {
          const diagramElement = container.querySelector(".mermaid svg");
          if (diagramElement) {
            diagramElement.style.transformOrigin = "top left";
            container.style.cursor = "grab";
          }
        }
      }, 500);
    } catch (error) {
      console.error("Mermaid initialization error:", error);
    }

    return () => {
      // Cleanup event listeners on component destroy
      if (container) {
        container.removeEventListener("mousedown", mouseDownHandler);
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
        container.removeEventListener("touchstart", touchStartHandler);
        window.removeEventListener("touchmove", touchMoveHandler);
        window.removeEventListener("touchend", touchEndHandler);
      }
    };
  });
</script>

<div class="zoom-controls">
  <button on:click={zoomIn} aria-label="Zoom in">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  </button>
  <button on:click={zoomOut} aria-label="Zoom out">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  </button>
  <button on:click={resetZoom} aria-label="Reset zoom">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path>
      <path d="M14 12H6"></path>
    </svg>
  </button>
</div>

<div
  class="diagram-container"
  bind:this={container}
  on:mousedown={mouseDownHandler}
  on:touchstart={touchStartHandler}
  on:wheel={(e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }
  }}
>
  <pre class="mermaid">
gantt
    title My Distro Hopping Journey 
    dateFormat YYYY-MM-DD
    axisFormat %Y
    
    section Arch Based
    Arch                  :arch1, 2020-06-30, 2025-06-04
    Garuda                :2019-10-30, 2020-04-30
    Manjaro               :2019-11-20, 2020-03-30
    Endeavour             :2020-03-20, 2020-05-20
    Artix                 :2020-08-30, 2020-12-03
    
    section Independent
    Void Linux            :2020-12-15, 2021-02-12
    Gentoo                :2021-02-12, 2021-12-03
    Slackware             :2021-06-15, 2021-07-15
	
    section Debian Based
    Ubuntu                :ubuntu1, 2018-09-30, 2018-11-30
    Ubuntu (KDE)          :ubuntu2, 2020-03-30, 2020-07-30
    Ubuntu (Server)       :ubuntu3, 2022-01-01, 2025-06-04
    Debian                :2024-03-01, 2024-04-01
    Duvean                :2020-11-30, 2021-04-10
    PopOS                 :popos1, 2022-08-20, 2025-06-04
    Zorin OS              :zorin1, 2021-09-30, 2022-03-20
    Zorin OS Pro          :zorin2, 2023-12-30, 2025-06-04
    Mint                  :2022-03-10, 2022-08-20
    Deepin                :2018-06-01, 2018-07-01
    Kali Linux            :2019-06-01, 2022-01-01
    
    section RHEL Based
    Fedora                :2022-03-30, 2022-10-30
    AlmaLinux             :2023-12-01, 2024-06-01
    
    section SUSE Based
    openSUSE Tumbleweed   :2018-06-01, 2018-07-01
    
    section BSD
    FreeBSD               :2021-11-01, 2022-02-03
	
    section Nix
    NixOS                 :2022-11-01, 2022-12-03
    
    section Security Focused
    Qubes OS              :2022-01-01, 2025-06-04
	
    section Windows
    Windows               :2015-10-04, 2019-10-01
    WSL                   :2018-10-04, 2019-10-01
	
    section Mac
    macOS                 :2014-08-03, 2022-08-01
  </pre>
</div>

<svelte:window
  on:mousemove={mouseMoveHandler}
  on:mouseup={mouseUpHandler}
  on:touchmove={touchMoveHandler}
  on:touchend={touchEndHandler}
/>

<style>
  .diagram-container {
    width: 100%;
    height: 80vh;
    overflow: auto;
    margin: 1rem 0;
    position: relative;
    border: 1px solid var(--border-primary);
    border-radius: 0.5rem;
    user-select: none;
    background-color: var(--bg-secondary);
  }

  .zoom-controls {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    position: sticky;
    top: 10px;
    z-index: 10;
  }

  .zoom-controls button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    cursor: pointer;
    box-shadow: var(--shadow-soft);
    transition: all 0.2s ease;
  }

  .zoom-controls button:hover {
    background: var(--bg-tertiary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
  }

  .zoom-controls button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  :global(.mermaid) {
    font-family: "Arial", sans-serif;
    padding: 20px;
    min-width: 100%;
    min-height: 100%;
    display: inline-block;
  }

  :global(.mermaid svg) {
    transition: transform 0.2s ease;
  }

  @media (max-width: 768px) {
    :global(.mermaid) {
      font-size: 12px;
    }

    .diagram-container {
      height: 60vh;
    }
  }
</style>
