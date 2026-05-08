<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as d3 from "d3";
  import philData from "$lib/data/philmap.json";

  type PhilNode = {
    id: string;
    name: string;
    dates: string;
    idea: string;
    period: string;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
  };

  type PhilEdge = {
    source: string | PhilNode;
    target: string | PhilNode;
    type: string;
    weight: number;
  };

  type PeriodMeta = { label: string; color: string; range: string };
  type EdgeTypeMeta = { label: string; color: string; dash: string | null };

  const periods = philData.periods as Record<string, PeriodMeta>;
  const edgeTypes = philData.edgeTypes as Record<string, EdgeTypeMeta>;
  const rawNodes = philData.nodes as PhilNode[];
  const rawEdges = philData.edges as PhilEdge[];

  let container: HTMLDivElement;
  let svgEl: SVGSVGElement;
  let tooltipEl: HTMLDivElement;
  let simulation: d3.Simulation<PhilNode, PhilEdge> | null = null;
  let zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;

  const degree: Record<string, number> = {};
  for (const n of rawNodes) degree[n.id] = 0;
  for (const e of rawEdges) {
    const s = typeof e.source === "string" ? e.source : e.source.id;
    const t = typeof e.target === "string" ? e.target : e.target.id;
    degree[s] = (degree[s] || 0) + 1;
    degree[t] = (degree[t] || 0) + 1;
  }
  const maxDegree = Math.max(1, ...Object.values(degree));

  const nodeMap: Record<string, PhilNode> = {};
  for (const n of rawNodes) nodeMap[n.id] = n;

  let activeTypes = new Set(Object.keys(edgeTypes));
  let activePeriods = new Set(Object.keys(periods));

  function nodeRadius(d: PhilNode): number {
    const t = (degree[d.id] || 0) / maxDegree;
    return 3.5 + Math.sqrt(t) * 11;
  }

  function edgeWidth(e: PhilEdge): number {
    return 0.4 + e.weight * 2.6;
  }

  function edgePeriods(e: PhilEdge): [string, string] {
    const s = typeof e.source === "string" ? nodeMap[e.source].period : e.source.period;
    const t = typeof e.target === "string" ? nodeMap[e.target].period : e.target.period;
    return [s, t];
  }

  function visibleEdge(e: PhilEdge): boolean {
    const [sp, tp] = edgePeriods(e);
    return activeTypes.has(e.type) && activePeriods.has(sp) && activePeriods.has(tp);
  }

  function applyFilters() {
    if (!svgEl) return;
    const svg = d3.select(svgEl);
    svg
      .selectAll<SVGLineElement, PhilEdge>("g.links line")
      .attr("display", (d) => (visibleEdge(d) ? null : "none"));
    svg
      .selectAll<SVGCircleElement, PhilNode>("g.nodes circle")
      .attr("opacity", (d) => (activePeriods.has(d.period) ? 1 : 0.15));
    svg
      .selectAll<SVGTextElement, PhilNode>("g.labels text")
      .attr("opacity", (d) => (activePeriods.has(d.period) ? 1 : 0.15));
  }

  function toggleType(t: string) {
    if (activeTypes.has(t)) activeTypes.delete(t);
    else activeTypes.add(t);
    activeTypes = new Set(activeTypes);
    applyFilters();
  }

  function togglePeriod(p: string) {
    if (activePeriods.has(p)) activePeriods.delete(p);
    else activePeriods.add(p);
    activePeriods = new Set(activePeriods);
    applyFilters();
  }

  function resetZoom() {
    if (!svgEl || !zoomBehavior) return;
    d3.select(svgEl).transition().duration(400).call(zoomBehavior.transform as any, d3.zoomIdentity);
  }

  function init() {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const nodes: PhilNode[] = rawNodes.map((n) => ({ ...n }));
    const links: PhilEdge[] = rawEdges.map((e) => ({ ...e }));

    const svg = d3
      .select(svgEl)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    for (const [key, t] of Object.entries(edgeTypes)) {
      defs
        .append("marker")
        .attr("id", `philmap-arrow-${key}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 14)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", t.color);
    }

    const g = svg.append("g");

    const link = g
      .append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .selectAll<SVGLineElement, PhilEdge>("line")
      .data(links)
      .join("line")
      .attr("stroke", (d) => edgeTypes[d.type].color)
      .attr("stroke-opacity", 0.7)
      .attr("stroke-width", edgeWidth)
      .attr("stroke-dasharray", (d) => edgeTypes[d.type].dash || null)
      .attr("marker-end", (d) => `url(#philmap-arrow-${d.type})`);

    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll<SVGCircleElement, PhilNode>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => periods[d.period].color)
      .attr("stroke", "#222")
      .attr("stroke-width", 0.8)
      .style("cursor", "grab");

    const label = g
      .append("g")
      .attr("class", "labels")
      .selectAll<SVGTextElement, PhilNode>("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", (d) => 8 + Math.sqrt((degree[d.id] || 0) / maxDegree) * 5)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => -nodeRadius(d) - 3)
      .attr("pointer-events", "none")
      .attr("paint-order", "stroke")
      .attr("stroke", "var(--bg-primary, #fff)")
      .attr("stroke-width", 3)
      .attr("fill", "var(--text-primary, #111)");

    node
      .on("mouseenter", (_event: MouseEvent, d: PhilNode) => {
        const inEdges = links.filter((e) => {
          const tid = typeof e.target === "string" ? e.target : e.target.id;
          return tid === d.id;
        });
        const outEdges = links.filter((e) => {
          const sid = typeof e.source === "string" ? e.source : e.source.id;
          return sid === d.id;
        });
        tooltipEl.style.display = "block";
        tooltipEl.innerHTML = `
          <div class="t-name">${d.name}</div>
          <div class="t-dates">${d.dates}</div>
          <div class="t-idea">${d.idea}</div>
          <div class="t-period" style="background:${periods[d.period].color}">${periods[d.period].label}</div>
          <div class="t-stats">${inEdges.length} in · ${outEdges.length} out · centrality ${(((degree[d.id] || 0) / maxDegree) * 100).toFixed(0)}%</div>
        `;
      })
      .on("mousemove", (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const tw = tooltipEl.offsetWidth;
        const th = tooltipEl.offsetHeight;
        tooltipEl.style.left = Math.min(rect.width - tw - 8, x + 14) + "px";
        tooltipEl.style.top = Math.min(rect.height - th - 8, y + 14) + "px";
      })
      .on("mouseleave", () => {
        tooltipEl.style.display = "none";
      });

    const dragBehavior = d3
      .drag<SVGCircleElement, PhilNode>()
      .on("start", (event, d) => {
        if (!event.active && simulation) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active && simulation) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    node.call(dragBehavior);

    zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 6])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoomBehavior);

    simulation = d3
      .forceSimulation<PhilNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<PhilNode, PhilEdge>(links)
          .id((d) => d.id)
          .distance((d) => 90 - d.weight * 40)
          .strength((d) => 0.05 + d.weight * 0.55),
      )
      .force("charge", d3.forceManyBody<PhilNode>().strength(-110))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide<PhilNode>().radius((d) => nodeRadius(d) + 4),
      )
      .on("tick", () => {
        link
          .attr("x1", (d) => (d.source as PhilNode).x ?? 0)
          .attr("y1", (d) => (d.source as PhilNode).y ?? 0)
          .attr("x2", (d) => (d.target as PhilNode).x ?? 0)
          .attr("y2", (d) => (d.target as PhilNode).y ?? 0);
        node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
        label.attr("x", (d) => d.x ?? 0).attr("y", (d) => d.y ?? 0);
      });

    applyFilters();
  }

  let resizeObserver: ResizeObserver | null = null;

  onMount(() => {
    init();
    resizeObserver = new ResizeObserver(() => {
      if (!container || !svgEl) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      d3.select(svgEl).attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`);
      if (simulation) {
        simulation.force("center", d3.forceCenter(w / 2, h / 2));
        simulation.alpha(0.2).restart();
      }
    });
    resizeObserver.observe(container);
  });

  onDestroy(() => {
    if (simulation) simulation.stop();
    if (resizeObserver) resizeObserver.disconnect();
  });
</script>

<div class="philmap-toolbar">
  <div class="philmap-filter-group" aria-label="Filter by edge type">
    <span class="philmap-filter-label">Edges</span>
    {#each Object.entries(philData.edgeTypes) as [key, t]}
      <button
        class="philmap-pill"
        class:active={activeTypes.has(key)}
        on:click={() => toggleType(key)}
        aria-pressed={activeTypes.has(key)}
        title={t.label}
      >
        <span
          class="philmap-pill-swatch"
          style="background:{t.color};{t.dash ? `background-image:linear-gradient(90deg, ${t.color} 60%, transparent 60%);background-size:6px 100%;` : ''}"
        ></span>
        {t.label}
      </button>
    {/each}
  </div>
  <div class="philmap-filter-group" aria-label="Filter by period">
    <span class="philmap-filter-label">Periods</span>
    {#each Object.entries(philData.periods) as [key, p]}
      <button
        class="philmap-pill"
        class:active={activePeriods.has(key)}
        on:click={() => togglePeriod(key)}
        aria-pressed={activePeriods.has(key)}
        title={p.range}
      >
        <span class="philmap-pill-swatch" style="background:{p.color}"></span>
        {p.label}
      </button>
    {/each}
  </div>
  <button class="philmap-reset" on:click={resetZoom}>Reset view</button>
</div>

<div class="philmap-container" bind:this={container}>
  <svg bind:this={svgEl} role="img" aria-label="Force-directed graph of philosophical influences"></svg>
  <div class="philmap-tooltip" bind:this={tooltipEl}></div>
</div>

<style>
  .philmap-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    padding: 0.5rem 0.25rem;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }

  .philmap-filter-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
  }

  .philmap-filter-label {
    font-weight: 600;
    margin-right: 0.25rem;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .philmap-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    border: 1px solid var(--border-primary, #ccc);
    background: var(--bg-primary, #fff);
    color: var(--text-primary, #111);
    cursor: pointer;
    font-size: 0.72rem;
    transition:
      background 0.15s ease,
      opacity 0.15s ease,
      transform 0.15s ease;
    opacity: 0.45;
  }

  .philmap-pill.active {
    opacity: 1;
    background: var(--bg-secondary, #f5f5f5);
  }

  .philmap-pill:hover {
    transform: translateY(-1px);
  }

  .philmap-pill-swatch {
    display: inline-block;
    width: 14px;
    height: 8px;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .philmap-reset {
    margin-left: auto;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1px solid var(--border-primary, #ccc);
    background: var(--bg-primary, #fff);
    color: var(--text-primary, #111);
    cursor: pointer;
    font-size: 0.72rem;
  }

  .philmap-reset:hover {
    background: var(--bg-secondary, #f5f5f5);
  }

  .philmap-container {
    position: relative;
    width: 100%;
    height: 80vh;
    border: 1px solid var(--border-primary, #ccc);
    border-radius: 6px;
    overflow: hidden;
    background: var(--bg-primary, #fff);
    user-select: none;
    touch-action: none;
  }

  .philmap-container :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
  }

  .philmap-container :global(svg:active) {
    cursor: grabbing;
  }

  .philmap-tooltip {
    position: absolute;
    display: none;
    pointer-events: none;
    background: var(--bg-primary, #fff);
    color: var(--text-primary, #111);
    border: 1px solid var(--border-primary, #888);
    border-radius: 6px;
    padding: 0.5rem 0.65rem;
    font-size: 0.78rem;
    line-height: 1.35;
    max-width: 240px;
    box-shadow: var(--shadow-medium, 0 4px 12px rgba(0, 0, 0, 0.12));
    z-index: 10;
  }

  .philmap-tooltip :global(.t-name) {
    font-weight: 700;
    font-size: 0.92rem;
    margin-bottom: 0.1rem;
  }

  .philmap-tooltip :global(.t-dates) {
    font-style: italic;
    opacity: 0.7;
    font-size: 0.72rem;
    margin-bottom: 0.3rem;
  }

  .philmap-tooltip :global(.t-idea) {
    margin-bottom: 0.4rem;
  }

  .philmap-tooltip :global(.t-period) {
    display: inline-block;
    color: #111;
    padding: 0.05rem 0.4rem;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 600;
    margin-right: 0.4rem;
  }

  .philmap-tooltip :global(.t-stats) {
    margin-top: 0.3rem;
    font-size: 0.68rem;
    opacity: 0.65;
  }

  @media (max-width: 768px) {
    .philmap-container {
      height: 65vh;
    }

    .philmap-toolbar {
      font-size: 0.7rem;
    }
  }
</style>
