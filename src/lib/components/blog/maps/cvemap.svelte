<script lang="ts">
  import { scaleBand, scaleLinear } from "d3-scale";
  import { stack as d3Stack } from "d3-shape";
  import { format } from "d3-format";

  const ratingRanges = [
    "0-1", "1-2", "2-3", "3-4", "4-5",
    "5-6", "6-7", "7-8", "8-9", "9-10"
  ];

  const cveData: Record<string, Record<string, number>> = {
    "2022": { "0-1": 0,    "1-2": 0,  "2-3": 71,  "3-4": 223, "4-5": 1786, "5-6": 3855, "6-7": 4039, "7-8": 6985,  "8-9": 3115, "9-10": 5010 },
    "2023": { "0-1": 181,  "1-2": 1,  "2-3": 64,  "3-4": 245, "4-5": 1893, "5-6": 5135, "6-7": 4680, "7-8": 7439,  "8-9": 4271, "9-10": 5157 },
    "2024": { "0-1": 266,  "1-2": 13, "2-3": 194, "3-4": 458, "4-5": 2911, "5-6": 8363, "6-7": 7471, "7-8": 9277,  "8-9": 5638, "9-10": 5722 },
    "2025": { "0-1": 1209, "1-2": 38, "2-3": 309, "3-4": 667, "4-5": 3913, "5-6": 9963, "6-7": 8341, "7-8": 10597, "8-9": 6176, "9-10": 7235 },
    "2026": { "0-1": 420,  "1-2": 20, "2-3": 192, "3-4": 359, "4-5": 1488, "5-6": 3497, "6-7": 3902, "7-8": 4935,  "8-9": 4208, "9-10": 3557 }
  };

  // May 7, 2026 is day 127 of the year — annualize YTD by 365/127.
  const PROJECTION_FACTOR = 365 / 127;
  const years = Object.keys(cveData);

  const totals: Record<string, number> = Object.fromEntries(
    years.map(y => [y, ratingRanges.reduce((s, r) => s + cveData[y][r], 0)])
  );
  const ytdTotal = totals["2026"];
  const projectedTotal = Math.round(ytdTotal * PROJECTION_FACTOR);
  const remainderTotal = projectedTotal - ytdTotal;

  // Nord palette: frost tones at low severity, aurora at high severity.
  const colors: Record<string, string> = {
    "0-1":  "#D8DEE9",
    "1-2":  "#C6D2E4",
    "2-3":  "#AFC6E9",
    "3-4":  "#81A1C1",
    "4-5":  "#8FBCBB",
    "5-6":  "#A3BE8C",
    "6-7":  "#EBCB8B",
    "7-8":  "#D08770",
    "8-9":  "#BF616A",
    "9-10": "#8F3A42",
    "Projected": "#4C566A"
  };

  const stackKeys = [...ratingRanges, "Projected"];
  const stackData = years.map(y => ({
    year: y,
    ...cveData[y],
    Projected: y === "2026" ? remainderTotal : 0
  }));

  // Layout (SVG viewBox — scales responsively via CSS).
  const width = 1200;
  const height = 720;
  const margin = { top: 60, right: 220, bottom: 70, left: 90 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const yMax = Math.ceil(projectedTotal / 5000) * 5000;
  const xScale = scaleBand<string>().domain(years).range([0, innerW]).padding(0.22);
  const yScale = scaleLinear().domain([0, yMax]).range([innerH, 0]);

  const series = d3Stack<typeof stackData[number]>().keys(stackKeys)(stackData);

  const yTicks = yScale.ticks(8);
  const fmt = format(",");

  // Tooltip state.
  let tooltip = {
    show: false,
    x: 0,
    y: 0,
    title: "",
    label: "",
    value: 0,
    extra: ""
  };

  function showTip(e: MouseEvent, year: string, key: string, value: number) {
    if (value <= 0) return;
    const target = e.currentTarget as SVGRectElement;
    const svg = target.ownerSVGElement!;
    const wrap = svg.parentElement!;
    const rect = target.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    const isProjected = key === "Projected";
    tooltip = {
      show: true,
      x: rect.left - wrapRect.left + rect.width / 2,
      y: rect.top - wrapRect.top,
      title: isProjected ? "2026 Projected (rest of year)" : year,
      label: isProjected ? "Annualized remainder" : `CVSS ${key}`,
      value,
      extra: isProjected
        ? `Full-year projected: ${fmt(projectedTotal)}`
        : year === "2026"
          ? `YTD total: ${fmt(ytdTotal)}`
          : `Year total: ${fmt(totals[year])}`
    };
  }

  function hideTip() {
    tooltip = { ...tooltip, show: false };
  }
</script>

<div class="cve-card">
  <div class="cve-chart-wrap">
    <svg viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet" class="cve-chart">
      <defs>
        <pattern id="cve-hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#4C566A" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#D8DEE9" stroke-width="3" />
        </pattern>
      </defs>

      <text x={width / 2} y="26" text-anchor="middle" font-size="20" font-weight="600" fill="#2E3440">
        CVE Counts by Year, Stacked by CVSS Rating Range
      </text>
      <text x={width / 2} y="46" text-anchor="middle" font-size="12" fill="#4C566A">
        2026 bar: solid = YTD through May 7; hatched = annualized projection for the rest of the year
      </text>

      <g transform="translate({margin.left}, {margin.top})">
        {#each yTicks as tick}
          <line
            x1="0" x2={innerW}
            y1={yScale(tick)} y2={yScale(tick)}
            stroke="rgba(76,86,106,0.18)"
          />
          <text
            x="-12" y={yScale(tick)}
            dy="0.32em" text-anchor="end"
            font-size="12" fill="#3B4252"
          >
            {fmt(tick)}
          </text>
        {/each}

        <text
          transform="translate(-65, {innerH / 2}) rotate(-90)"
          text-anchor="middle"
          font-size="14" fill="#2E3440"
        >
          Number of CVEs
        </text>

        {#each series as layer}
          {#each layer as segment, i}
            {@const year = years[i]}
            {@const value = segment[1] - segment[0]}
            {#if value > 0}
              <rect
                x={xScale(year)}
                y={yScale(segment[1])}
                width={xScale.bandwidth()}
                height={yScale(segment[0]) - yScale(segment[1])}
                fill={layer.key === "Projected" ? "url(#cve-hatch)" : colors[layer.key]}
                stroke="rgba(46,52,64,0.35)"
                stroke-width="0.5"
                on:mouseenter={(e) => showTip(e, year, layer.key, value)}
                on:mousemove={(e) => showTip(e, year, layer.key, value)}
                on:mouseleave={hideTip}
              />
            {/if}
          {/each}
        {/each}

        <line x1="0" x2={innerW} y1={innerH} y2={innerH} stroke="rgba(46,52,64,0.55)" />
        {#each years as year}
          <text
            x={(xScale(year) ?? 0) + xScale.bandwidth() / 2}
            y={innerH + 22}
            text-anchor="middle"
            font-size="13" fill="#3B4252"
          >
            {year}
          </text>
        {/each}
        <text
          x={innerW / 2} y={innerH + 52}
          text-anchor="middle"
          font-size="14" fill="#2E3440"
        >
          Year
        </text>

        <g transform="translate({innerW + 24}, 0)">
          <text font-size="12" font-weight="600" fill="#2E3440" y="0">CVSS Range</text>
          {#each [...stackKeys].reverse() as key, i}
            <g transform="translate(0, {16 + i * 22})">
              <rect
                width="16" height="16"
                fill={key === "Projected" ? "url(#cve-hatch)" : colors[key]}
                stroke="rgba(46,52,64,0.4)"
                stroke-width="0.5"
              />
              <text x="24" y="13" font-size="12" fill="#3B4252">
                {key === "Projected" ? "Projected (rest of 2026)" : key}
              </text>
            </g>
          {/each}
        </g>
      </g>
    </svg>

    {#if tooltip.show}
      <div class="cve-tooltip" style="left: {tooltip.x}px; top: {tooltip.y}px;">
        <div class="cve-tooltip-title">{tooltip.title}</div>
        <div>{tooltip.label}: <strong>{fmt(tooltip.value)}</strong></div>
        <div class="cve-tooltip-extra">{tooltip.extra}</div>
      </div>
    {/if}
  </div>

  <div class="cve-footer">
    <span>
      Data:
      <a href="https://www.cvedetails.com/cvss-score-charts.php" target="_blank" rel="noopener noreferrer">
        cvedetails.com
      </a>
    </span>
    <span>Created by Stephen Okita</span>
  </div>
</div>

<style>
  .cve-card {
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 16px;
    background: #ECEFF4;
    box-shadow:
      0 18px 60px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .cve-chart-wrap {
    position: relative;
    width: 100%;
  }

  .cve-chart {
    width: 100%;
    height: auto;
    display: block;
    font-family: Inter, system-ui, sans-serif;
  }

  .cve-chart rect {
    transition: opacity 0.15s ease;
  }

  .cve-chart rect:hover {
    opacity: 0.85;
  }

  .cve-tooltip {
    position: absolute;
    transform: translate(-50%, calc(-100% - 8px));
    background: #2E3440;
    color: #ECEFF4;
    padding: 8px 11px;
    border-radius: 6px;
    font-size: 12px;
    line-height: 1.45;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28);
    z-index: 5;
  }

  .cve-tooltip-title {
    font-weight: 600;
    color: #ECEFF4;
    margin-bottom: 2px;
  }

  .cve-tooltip-extra {
    color: #D8DEE9;
    font-size: 11px;
    margin-top: 3px;
    border-top: 1px solid rgba(216, 222, 233, 0.2);
    padding-top: 3px;
  }

  .cve-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.75rem;
    color: #4C566A;
    font-size: 0.8rem;
  }

  .cve-footer a {
    color: #5E81AC;
    border-bottom: 1px solid rgba(94, 129, 172, 0.4);
    text-decoration: none;
  }

  .cve-footer a:hover {
    color: #81A1C1;
  }
</style>
