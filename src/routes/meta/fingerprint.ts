/**
 * Client-only browser fingerprinting for the meta page. Collects device and
 * browser traits (no permission prompts), renders a canvas/audio fingerprint
 * and hashes the lot into a stable SHA-256 identifier. Pure browser APIs —
 * import and call `collectFingerprint()` from a component's reveal handler.
 */

export interface FingerprintResult {
  hash: string;
  details: any;
}

export async function collectFingerprint(): Promise<FingerprintResult> {
  const info: any = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: Array.isArray(navigator.languages)
      ? navigator.languages
      : [navigator.language],
    doNotTrack: navigator.doNotTrack || (window as any).doNotTrack || null,
    cookieEnabled: navigator.cookieEnabled,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
    },
    window: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    },
    deviceMemory: (navigator as any).deviceMemory ?? null,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
    connection: (navigator as any).connection
      ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt,
        }
      : null,
    gpu: await collectWebGLInfo(),
    fonts: await detectFonts(),
    battery: await collectBattery(),
  };

  info.canvasFingerprint = generateCanvasFingerprint();
  info.audioFingerprint = await generateAudioFingerprint();

  const hash = await hashObject(info);
  return { hash, details: info };
}

function generateCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  canvas.width = 240;
  canvas.height = 60;
  ctx.textBaseline = "top";
  ctx.font = "14px 'Fira Code', monospace";
  ctx.fillStyle = "#88c0d0";
  ctx.fillRect(8, 8, 110, 30);
  ctx.fillStyle = "#2e3440";
  ctx.fillText("you are here →", 4, 14);
  ctx.fillStyle = "rgba(163, 190, 140, 0.8)";
  ctx.fillText("you are here →", 6, 16);
  const gradient = ctx.createLinearGradient(0, 0, 240, 0);
  gradient.addColorStop(0, "#bf616a");
  gradient.addColorStop(0.5, "#a3be8c");
  gradient.addColorStop(1, "#5e81ac");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 38, 240, 22);
  ctx.beginPath();
  ctx.arc(50, 49, 9, 0, Math.PI * 2);
  ctx.fillStyle = "#eceff4";
  ctx.fill();
  return canvas.toDataURL();
}

async function collectWebGLInfo() {
  try {
    const canvas = document.createElement("canvas");
    const gl: any =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return null;
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return {
      vendor: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : gl.getParameter(gl.VENDOR),
      renderer: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER),
    };
  } catch {
    return null;
  }
}

async function collectBattery() {
  try {
    const nav: any = navigator;
    if (!nav.getBattery) return null;
    const b = await nav.getBattery();
    return {
      level: Math.round(b.level * 100),
      charging: b.charging,
    };
  } catch {
    return null;
  }
}

async function generateAudioFingerprint() {
  try {
    const AudioCtx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const analyser = ctx.createAnalyser();
    const oscillator = ctx.createOscillator();
    const compressor = ctx.createDynamicsCompressor();
    analyser.fftSize = 1024;
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(10000, ctx.currentTime);
    compressor.threshold.setValueAtTime(-50, ctx.currentTime);
    compressor.knee.setValueAtTime(40, ctx.currentTime);
    compressor.ratio.setValueAtTime(12, ctx.currentTime);
    oscillator.connect(compressor);
    compressor.connect(analyser);
    analyser.connect(ctx.destination);
    oscillator.start(0);
    oscillator.stop(ctx.currentTime + 0.1);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        analyser.getByteFrequencyData(dataArray);
        ctx.close();
        resolve(Array.from(dataArray).slice(0, 24).join(""));
      }, 120);
    });
  } catch {
    return null;
  }
}

async function detectFonts() {
  const baseFonts = ["monospace", "sans-serif", "serif"];
  const fontList = [
    "Arial", "Arial Black", "Calibri", "Cambria", "Comic Sans MS",
    "Consolas", "Courier New", "Georgia", "Helvetica", "Impact",
    "Lucida Console", "Palatino Linotype", "Segoe UI", "Tahoma",
    "Times New Roman", "Trebuchet MS", "Verdana", "Fira Code",
  ];
  const testString = "mmmmmmmmmmlli";
  const span = document.createElement("span");
  span.style.fontSize = "72px";
  span.style.position = "absolute";
  span.style.left = "-9999px";
  span.innerHTML = testString;
  document.body.appendChild(span);
  const baseW: Record<string, number> = {};
  const baseH: Record<string, number> = {};
  baseFonts.forEach((bf) => {
    span.style.fontFamily = bf;
    baseW[bf] = span.offsetWidth;
    baseH[bf] = span.offsetHeight;
  });
  const detected: string[] = [];
  for (const font of fontList) {
    let found = false;
    for (const bf of baseFonts) {
      span.style.fontFamily = `'${font}', ${bf}`;
      if (span.offsetWidth !== baseW[bf] || span.offsetHeight !== baseH[bf]) {
        found = true;
        break;
      }
    }
    if (found) detected.push(font);
  }
  document.body.removeChild(span);
  return detected;
}

async function hashObject(obj: any) {
  const data = new TextEncoder().encode(JSON.stringify(obj));
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
