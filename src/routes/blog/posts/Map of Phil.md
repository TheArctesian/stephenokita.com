---
title: Historical Map of Philosophies
description: An experiment with Mermaid as well as a pretty interesting retrospection on the history of knowledge.
date: "2025-04-03"
location: Berkeley
categories:
  - Philosophy
  - Ontology
  - History
  - Systems
  - DataSci?
published: true
language:
  - English
---

This was made in conjunction with Sonnet-3.7, then rebuilt as a D3 force graph so the connections can be quantised. Each edge now carries a *type* (was this an influence, a teaching relationship, an outright rejection, a synthesis, a response, or a speculative cross-tradition parallel?) and a *weight* in the 0–1 range (line thickness encodes how load-bearing the relationship is). Each node is sized by its degree centrality: the more philosophers a thinker connects to in the graph, the larger their dot. Drag a node to pull it; scroll to zoom; hover for the philosopher's central idea, dates, and in/out edge counts. The pill toggles above the graph let you isolate a single edge type or peel periods off one at a time.
<br>

<div style="background-color: #282a36; color: white; padding-left: 1rem; padding-top: 0.5rem; padding-right: 1rem;padding-bottom: 0.5rem; border-radius: 0.1rem;">

<h2>Philosophy Timeline Color Key</h2>

<ul>

<li><span style="color:#f9d5e5; font-weight:bold;">■ Ancient Philosophy</span><br>

<em>Greek, Roman, early Chinese, Indian and other traditions (c. 600 BCE - 500 CE)</em></li>

<li><span style="color:#eeac99; font-style:italic;">■ Medieval Philosophy</span><br>

<em>Islamic, Christian, Jewish, Buddhist and other scholastic traditions (c. 500 - 1400 CE)</em></li>

<li><span style="color:#e06377; font-weight:bold;">■ Renaissance Philosophy</span><br>

<em>Humanism, early modern thought, reformation (c. 1400 - 1600 CE)</em></li>

<li><span style="color:#c83349; font-weight:bold;">■ Early Modern Philosophy</span><br>

<em>Rationalism, empiricism, enlightenment (c. 1600 - 1800 CE)</em></li>

<li><span style="color:#5b9aa0; font-style:italic;">■ Modern Philosophy</span><br>

<em>Idealism, utilitarianism, pragmatism, early analytic (c. 1800 - 1900 CE)</em></li>

<li><span style="color:#d6e1c7; font-weight:bold;">■ Contemporary Philosophy</span><br>

<em>Analytic, continental, postmodern traditions (c. 1900 CE - present)</em></li>

<li><span style="color:#ffd1dc; font-weight:bold;">■ Non-Western Traditions</span><br>

<em>Distinctive Asian, African, Indigenous philosophical systems (across all periods)</em></li>

</ul>

<p><em>Note: Philosophers categorised by their primary period of influence, though many worked across traditional boundaries.</em></p>

</div>

<br>

<div style="background-color: #282a36; color: white; padding-left: 1rem; padding-top: 0.5rem; padding-right: 1rem;padding-bottom: 0.5rem; border-radius: 0.1rem;">

<h2>Edge Type Key</h2>

<ul>

<li><span style="color:#888888; font-weight:bold;">— Influenced</span><br>

<em>The default relation: A's ideas shaped B's, without being explicitly synthesised, taught, or refused (c. 0.3–0.7 weight).</em></li>

<li><span style="color:#5b9aa0; font-weight:bold;">— Taught</span><br>

<em>A direct teacher–student relationship, or a documented mentorship (Socrates → Plato, Russell → Wittgenstein, Husserl → Heidegger).</em></li>

<li><span style="color:#8c5e8c; font-weight:bold;">— Synthesised</span><br>

<em>B explicitly rebuilt or fused A's framework into something new (Aquinas synthesising Aristotle via Averroes; Marx inverting Hegel; Frege foundationally rebuilt by Russell).</em></li>

<li><span style="color:#d4a373; font-weight:bold;">– – Responded to</span><br>

<em>B took A as an interlocutor without simply accepting or rejecting them (Hume waking Kant from his dogmatic slumber; Berkeley answering Locke).</em></li>

<li><span style="color:#c83349; font-weight:bold;">- - Rejected</span><br>

<em>An explicit refusal: Al-Ghazali against Avicenna, Schopenhauer against Hegel, Kierkegaard against the Hegelian system, Nozick against Rawls.</em></li>

<li><span style="color:#bbbbbb; font-weight:bold;">· · Cross-tradition parallel</span><br>

<em>A speculative or structural resonance rather than documented influence (Zhuangzi and Heraclitus on flux; Nagarjuna and Sextus on skepticism; Laozi and Spinoza on monism). Weighted low on purpose.</em></li>

</ul>

<p><em>Edge weights are an editorial judgement, not a metric. The intent is for relative thickness within the graph to track how load-bearing each connection is in the historical record. Future iterations could derive these from citation counts.</em></p>

</div>

<script>
	import PhilMap from "../../../lib/components/blog/philmap.svelte"
</script>

<PhilMap />
