---
title: Mapping CVEs Over Time
description: A stacked view of CVE counts by year and CVSS rating range, with a year-to-date snapshot and a naive annualized projection for 2026.
date: "2026-05-07"
location: Berkeley
categories:
  - Security
  - Computer Science
  - Data
published: true
language:
  - English
---

CVEs (Common Vulnerabilities and Exposures) is a list of publicly known vulnrebailies. The chart below stacks the count for each year by CVSS rating range. Hover for the per-range and per-year totals.

<script>
	import CVEMap from "../../../lib/components/blog/maps/cvemap.svelte"
</script>

<CVEMap />

A few caveats:

- On the 2026 bar, the solid stack covers Jan 1 through May 7, 2026. The hatched block on top scales that by 365 ÷ 127 — a flat-rate extrapolation that assumes disclosures are uniformly distributed across the year. *They aren't* (vendor patch cycles, conference timing and embargoed batch disclosures all skew this), so treat it as a rough upper-bound sketch rather than a forecast.
- CVE counts are not vulnerability counts in any deep sense. They're records in a registry. A drop in a low-severity bucket may mean fewer bugs, or it may mean fewer reporters bothering to file.

The trend at the high end (7-10) is real, large, and accelerating. This is the important part.
