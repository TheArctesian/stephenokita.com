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
flowchart TD
    %% Styling
    classDef ancient fill:#f9d5e5,stroke:#333,stroke-width:2px,color:#000,font-weight:bold,rounded:true
    classDef medieval fill:#eeac99,stroke:#333,stroke-width:2px,color:#000,font-style:italic,rounded:true
    classDef renaissance fill:#e06377,stroke:#333,stroke-width:2px,color:#000,font-weight:bold,rounded:true
    classDef earlymodern fill:#c83349,stroke:#333,stroke-width:2px,color:#000,font-weight:bold,rounded:true
    classDef modern fill:#5b9aa0,stroke:#333,stroke-width:2px,color:#000,font-style:italic,rounded:true
    classDef contemporary fill:#d6e1c7,stroke:#333,stroke-width:2px,color:#000,font-weight:bold,rounded:true
    classDef nonwestern fill:#ffd1dc,stroke:#333,stroke-width:2px,color:#000,font-weight:bold,rounded:true
    
    %% Main title
    title[Map of Global Philosophical Traditions and Influences]
    
    %% Subgraph: Ancient Western Philosophy
    subgraph Ancient_Western["Ancient Western Philosophy"]
        A["Thales (c.624-546 BCE)
Water as first principle"] --> B["Anaximander (c.610-546 BCE)
Apeiron, cosmic justice"]
        B --> C["Heraclitus (c.535-475 BCE)
Flux, logos, fire"]
        B --> D["Parmenides (c.515-450 BCE)
Being, immutability"]
        D --> E["Zeno of Elea (c.490-430 BCE)
Paradoxes of motion"]
        C --> F["Democritus (c.460-370 BCE)
Atomism, materialism"]
        D --> G["Protagoras (c.490-420 BCE)
Relativism, man is measure"]
        G --> H["Socrates (469-399 BCE)
Elenchus, virtue is knowledge"]
        F --> H
        H --> W["Plato (427-347 BCE)
Forms, immortal soul, dialectic"]
        W --> X["Aristotle (384-322 BCE)
Hylomorphism, categories, virtue ethics"]
        X --> Y["Epicurus (341-270 BCE)
Atomic materialism, pleasure"]
        X --> Z["Zeno of Citium (334-262 BCE)
Stoicism, logos, apatheia"]
        W --> AA["Pyrrho (c.360-270 BCE)
Radical skepticism, epoche"]
        AA --> AB["Sextus Empiricus (c.160-210 CE)
Methodical skepticism"]
        Z --> AC["Chrysippus (c.279-206 BCE)
Stoic logic, compatibilism"]
        W --> AD["Diogenes (c.412-323 BCE)
Cynicism, asceticism"]
        Z --> AE["Cicero (106-43 BCE)
Eclectic Stoicism, natural law"]
        Z --> AF["Seneca (4 BCE-65 CE)
Stoic ethics, consolation"]
        Z --> AG["Epictetus (c.50-135 CE)
Dichotomy of control"]
        AG --> AH["Marcus Aurelius (121-180 CE)
Stoic self-examination"]
        W --> AI["Plotinus (204-270 CE)
Neoplatonism, the One"]
        AI --> AJ["Proclus (412-485 CE)
Systematic Neoplatonism"]
    end
    
    %% Subgraph: Ancient Eastern Philosophy
    subgraph Ancient_Eastern["Ancient Eastern Philosophy"]
        I["Confucius (551-479 BCE)
Ren, li, junzi"] --> J["Mozi (c.470-391 BCE)
Universal love, utilitarianism"]
        I --> K["Mencius (372-289 BCE)
Innate goodness, righteous rule"]
        I --> L["Xunzi (c.310-235 BCE)
Human nature as evil, ritual"]
        M["Laozi (6th c. BCE)
Wu-wei, naturalness, Dao"] --> N["Zhuangzi (369-286 BCE)
Spontaneity, relativism"]
        K --> O["Dong Zhongshu (179-104 BCE)
Cosmological Confucianism"]
        L --> P["Han Feizi (c.280-233 BCE)
Legalism, power politics"]
        Q["Upanishads (c.800-200 BCE)
Brahman, Atman, karma"] --> R["Buddha (c.563-483 BCE)
Four Noble Truths, Middle Way"]
        Q --> S["Jaimini (c.200 BCE)
Mimamsa, ritual dharma"]
        R --> T["Nagarjuna (c.150-250 CE)
Madhyamaka, emptiness"]
        R --> U["Vasubandhu (4th-5th c. CE)
Yogacara, mind-only"]
        Q --> V["Badarayana (c.200 BCE)
Vedanta, Brahma Sutras"]
    end
    
    %% Subgraph: Medieval Western Philosophy
    subgraph Medieval_Western["Medieval Western Philosophy"]
        AI --> AP["Augustine (354-430)
Original sin, divine illumination"]
        X --> AQ["Boethius (480-524)
Consolation, universals"]
        AQ --> AR["John Scotus Eriugena (815-877)
Christian Neoplatonism"]
        AP --> AS["Anselm (1033-1109)
Ontological argument"]
        AS --> AT["Peter Abelard (1079-1142)
Conceptualism, intention"]
        AT --> AU["Aquinas (1225-1274)
Five Ways, natural law"]
        AU --> AV["Duns Scotus (1266-1308)
Univocity, haecceity"]
        AU --> AW["William of Ockham (1287-1347)
Nominalism, parsimony"]
        X --> AK["Al-Kindi (801-873)
Islamic Aristotelianism"]
        AK --> AL["Al-Farabi (872-950)
Political philosophy, emanation"]
        AL --> AM["Avicenna (980-1037)
Essence-existence"]
        AM --> AN["Averroes (1126-1198)
Intellect, naturalism"]
        AM --> AO["Al-Ghazali (1058-1111)
Critique of philosophy"]
        AN --> AU
        AM --> AU
    end
    
    %% Subgraph: Medieval Eastern Philosophy
    subgraph Medieval_Eastern["Medieval Eastern Philosophy"]
        T --> AX["Dignaga (480-540)
Buddhist epistemology"]
        AX --> AY["Dharmakirti (7th c.)
Perception theory, apoha"]
        V --> AZ["Sankara (788-820)
Advaita Vedanta, non-dualism"]
        V --> BA["Ramanuja (1017-1137)
Qualified non-dualism"]
        AZ --> BB["Madhva (1238-1317)
Dualistic Vedanta"]
        O --> BC["Wang Bi (226-249)
Xuanxue, non-being"]
        BC --> BD["Ge Hong (283-343)
Alchemy, immortality"]
        N --> BE["Sengzhao (384-414)
Chinese Madhyamaka"]
        BE --> BF["Zhiyi (538-597)
Tiantai, threefold truth"]
        BE --> BG["Fazang (643-712)
Huayan, interpenetration"]
        O --> BH["Zhu Xi (1130-1200)
Neo-Confucian metaphysics"]
    end
    
    %% Subgraph: Renaissance & Early Modern Philosophy
    subgraph Renaissance["Renaissance & Early Modern Philosophy"]
        AW --> BI["Pico della Mirandola (1463-1494)
Dignity of man"]
        AU --> BJ["Erasmus (1466-1536)
Christian humanism"]
        BJ --> BK["More (1478-1535)
Utopia, social criticism"]
        BJ --> BL["Luther (1483-1546)
Sola fide, priesthood"]
        BL --> BM["Calvin (1509-1564)
Predestination"]
        AT --> BN["Montaigne (1533-1592)
Skepticism, self-examination"]
        AW --> BO["Machiavelli (1469-1527)
Political realism, virtu"]
        BK --> BP["Hobbes (1588-1679)
Social contract, absolutism"]
        BP --> BQ["Locke (1632-1704)
Limited government"]
        BQ --> BR["Rousseau (1712-1778)
General will, innocence"]
        BQ --> BS["Montesquieu (1689-1755)
Separation of powers"]
        AW --> BT["Copernicus (1473-1543)
Heliocentrism"]
        BT --> BU["Kepler (1571-1630)
Planetary laws"]
        BT --> BV["Galileo (1564-1642)
Empirical method"]
        BV --> BW["Francis Bacon (1561-1626)
Induction, progress"]
        BU --> BX["Newton (1643-1727)
Universal gravitation"]
        BP --> BY["Descartes (1596-1650)
Cogito, dualism"]
        BY --> BZ["Malebranche (1638-1715)
Occasionalism"]
        BY --> CA["Spinoza (1632-1677)
Substance monism"]
        BY --> CB["Leibniz (1646-1716)
Monads, harmony"]
        BQ --> CC["Berkeley (1685-1753)
Subjective idealism"]
        CC --> CD["Hume (1711-1776)
Skepticism, impressions"]
        CD --> CE["Reid (1710-1796)
Common sense realism"]
    end
    
    %% Subgraph: Modern Philosophy
    subgraph Modern["Modern Philosophy"]
        BW --> CF["Voltaire (1694-1778)
Religious tolerance"]
        CD --> CG["Smith (1723-1790)
Free markets, invisible hand"]
        BR --> CH["Kant (1724-1804)
Transcendental idealism"]
        CH --> CI["Fichte (1762-1814)
Self-positing I, striving"]
        CI --> CJ["Schelling (1775-1854)
Identity philosophy"]
        CJ --> CK["Hegel (1770-1831)
Dialectic, Absolute Spirit"]
        CK --> CL["Schopenhauer (1788-1860)
Will, pessimism"]
        CK --> CM["Marx (1818-1883)
Dialectical materialism"]
        CK --> CN["Kierkegaard (1813-1855)
Existential choice"]
        CL --> CO["Nietzsche (1844-1900)
Will to power"]
        CP["Darwin (1809-1882)
Natural selection"] --> CQ["Spencer (1820-1903)
Social Darwinism"]
        CG --> CU["Bentham (1748-1832)
Hedonistic utilitarianism"]
        CU --> CV["Mill (1806-1873)
Qualitative utilitarianism"]
        CV --> CW["Sidgwick (1838-1900)
Methods of ethics"]
        CH --> CX["Peirce (1839-1914)
Pragmatic maxim"]
        CX --> CY["James (1842-1910)
Radical empiricism"]
        CY --> CZ["Dewey (1859-1952)
Instrumentalism"]
        CD --> DA["Frege (1848-1925)
Predicate logic"]
        DA --> DB["Russell (1872-1970)
Logical atomism"]
    end
    
    %% Subgraph: Contemporary Western Philosophy
    subgraph Contemporary_Western["Contemporary Western Philosophy"]
        DB --> DC["Wittgenstein (1889-1951)
Language games"]
        DC --> DD["Logical Positivism (1920s-1930s)
Verification"]
        DD --> DE["Quine (1908-2000)
Holism, naturalized"]
        DC --> DF["Ordinary Language Philosophy (1940s)
Use theory"]
        DF --> DG["Austin (1911-1960)
Speech acts"]
        DF --> DH["Ryle (1900-1976)
Category mistakes"]
        DE --> DI["Davidson (1917-2003)
Radical interpretation"]
        DE --> DJ["Kripke (b. 1940)
Rigid designation"]
        CH --> DK["Husserl (1859-1938)
Phenomenology"]
        DK --> DL["Heidegger (1889-1976)
Dasein, being-in-world"]
        DL --> DM["Sartre (1905-1980)
Being and nothingness"]
        DM --> DN["Merleau-Ponty (1908-1961)
Embodied perception"]
        DM --> DO["Beauvoir (1908-1986)
Ethics of ambiguity"]
        DL --> DP["Gadamer (1900-2002)
Hermeneutics"]
        DL --> DQ["Levinas (1906-1995)
Ethics of Other"]
        CM --> DR["Adorno (1903-1969)
Negative dialectic"]
        DR --> DS["Habermas (b. 1929)
Communicative rationality"]
        DL --> DT["Foucault (1926-1984)
Power/knowledge"]
        DL --> DU["Derrida (1930-2004)
Deconstruction"]
        DT --> DV["Butler (b. 1956)
Gender performativity"]
        DT --> DW["Agamben (b. 1942)
Bare life"]
    end
    
    %% Subgraph: Critical Theory & Postmodernism
    subgraph Critical_Theory["Critical Theory & Postmodernism"]
        CM --> GC["Horkheimer (1895-1973)
Critical theory"]
        GC --> DR
        CM --> GD["Benjamin (1892-1940)
Aura, mechanical reproduction"]
        GD --> DR
        CM --> GE["Gramsci (1891-1937)
Cultural hegemony"]
        CM --> GF["Lukács (1885-1971)
Reification"]
        GF --> DR
        GE --> DS
        DR --> GG["Fromm (1900-1980)
Social character"]
        DR --> GH["Marcuse (1898-1979)
One-dimensional man"]
        DS --> GI["Honneth (b. 1949)
Recognition theory"]
        DT --> EE["Deleuze (1925-1995)
Difference, rhizome"]
        DS --> EF["Fraser (b. 1947)
Justice, recognition"]
        DU --> EG["Spivak (b. 1942)
Subaltern voices"]
        EE --> GJ["Guattari (1930-1992)
Schizoanalysis"]
        CM --> GK["Althusser (1918-1990)
Structural Marxism"]
        GK --> DT
        DT --> GL["Said (1935-2003)
Orientalism"]
        GL --> EG
        DT --> GM["Baudrillard (1929-2007)
Simulation"]
        DU --> GN["Kristeva (b. 1941)
Abjection"]
        GE --> GO["Stuart Hall (1932-2014)
Cultural studies"]
        DV --> GP["Preciado (b. 1970)
Technosexuality"]
    end
    
    %% Subgraph: Contemporary Political Philosophy
    subgraph Contemporary_Political["Contemporary Political & Ethics"]
        CV --> EM["Rawls (1921-2002)
Justice as fairness"]
        EM --> EN["Nozick (1938-2002)
Minimal state"]
        EM --> EO["Sen (b. 1933)
Capabilities approach"]
        EO --> EP["Nussbaum (b. 1947)
Human flourishing"]
        EM --> EQ["Sandel (b. 1953)
Communitarian critique"]
        CW --> EV["Moore (1873-1958)
Non-naturalism"]
        EV --> EW["Ross (1877-1971)
Prima facie duties"]
        EW --> EX["Stevenson (1908-1979)
Emotivism"]
        EX --> EY["Hare (1919-2002)
Prescriptivism"]
        EW --> EZ["Foot (1920-2010)
Natural goodness"]
        EZ --> FA["Williams (1929-2003)
Moral luck"]
        EZ --> FB["MacIntyre (b. 1929)
Virtue tradition"]
        EQ --> FC["Singer (b. 1946)
Animal liberation"]
        EN --> FD["Parfit (1942-2017)
Personal identity"]
        EE --> GB["Negri (b. 1933)
Multitude, empire"]
        GB --> GQ["Hardt (b. 1960)
Commonwealth"]
        DW --> GR["Mbembe (b. 1957)
Necropolitics"]
        GL --> GR
        DT --> GS["Rancière (b. 1940)
Disagreement"]
        GS --> GT["Mouffe (b. 1943)
Agonistic pluralism"]
        GT --> GU["Laclau (1935-2014)
Populist reason"]
        CN --> GA["Buber (1878-1965)
I-Thou relation"]
        DL --> GA
    end
    
    %% Subgraph: Contemporary Eastern & Global Philosophy
    subgraph Contemporary_Eastern["Contemporary Eastern & Global Philosophy"]
        AZ --> CS["Vivekananda (1863-1902)
Neo-Vedanta"]
        CS --> DX["Aurobindo (1872-1950)
Integral yoga"]
        DX --> DY["Radhakrishnan (1888-1975)
Comparative religion"]
        BH --> DZ["Mao Zedong (1893-1976)
Sinification of Marxism"]
        BH --> CR["Wang Yangming (1472-1529)
Unity of knowledge"]
        BA --> CT["Ramanuja (1017-1137)
Qualified non-dualism"]
        EA["Japanese Philosophy (20th c.)
Kyoto School"] --> EB["Nishida (1870-1945)
Logic of place"]
        EB --> EC["Tanabe (1885-1962)
Metanoetics"]
        EB --> ED["Nishitani (1900-1990)
Emptiness"]
        ER["Senghor (1906-2001)
Negritude"] --> ES["Wiredu (1931-2022)
Conceptual decolonization"]
        ES --> ET["Gyekye (1939-2019)
Communitarianism"]
        ET --> EU["Appiah (b. 1954)
Cosmopolitanism"]
        DH --> EI["Chalmers (b. 1966)
Hard problem"]
        DJ --> EJ["Putnam (1926-2016)
Multiple realizability"]
        EJ --> EK["Dennett (b. 1942)
Consciousness explained"]
        DI --> EL["Searle (1932-2022)
Chinese room"]
    end
    
    %% Cross-subgraph connections
    %% Ancient cross-connections
    N --> C
    I --> H
    T --> AB
    Q --> AI
    
    %% Medieval cross-connections
    T --> BE
    AM --> AP
    AZ --> AR
    
    %% Renaissance cross-connections
    BH --> BY
    
    %% Modern cross-connections
    CN --> CO
    CN --> DL
    CN --> DM
    CN --> DO
    CN --> DQ
    CN --> DK
    
    %% Spinoza connections
    CA --> CK
    CA --> CO
    CA --> CM
    CA --> EE
    CA --> DR
    CA --> GB
    
    %% Contemporary cross-connections
    EB --> DL
    ED --> DL
    DY --> DS
    T --> EE
    ER --> GO
    ER --> GL
    ES --> EO
    EU --> EF
    
    %% Additional cross-subgraph connections
    M --> CA
    R --> CN
    CL --> DL
    CO --> DR
    DM --> DT
    DK --> DC
    BX --> CH
    DN --> DV
    DP --> GO
    FC --> GP
    GE --> GU
    GH --> GQ
    Y --> CP
    CV --> GI
    
    %% Recent cross-cultural philosophy connections
    ED --> DU
    EU --> EP
    DY --> EL
    GR --> DW
    T --> DV
    
    class A,B,C,D,E,F,G,H,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ ancient
    class AK,AL,AM,AN,AO,AP,AQ,AR,AS,AT,AU,AV,AW medieval
    class AX,AY,AZ,BA,BB,BC,BD,BE,BF,BG,BH medieval
    class BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BY,BZ,CA,CB,CC,CD renaissance
    class CE,CF,CG,CH,CI,CJ,CK,CL,CM,CN,CO,CP,CQ,CR,CS,CT,CU,CV,CW,CX,CY,CZ,DA,DB modern
    class DC,DD,DE,DF,DG,DH,DI,DJ,DK,DL,DM,DN,DO,DP,DQ,DR,DS,DT,DU,DV,DW contemporary
    class DX,DY,DZ,EA,EB,EC,ED,ER,ES,ET,EU contemporary
    class EE,EF,EG,EI,EJ,EK,EL,EM,EN,EO,EP,EQ,EV,EW,EX,EY,EZ,FA,FB,FC,FD,GA,GB,GC,GD,GE,GF,GG,GH,GI,GJ,GK,GL,GM,GN,GO,GP,GQ,GR,GS,GT,GU contemporary
    class I,J,K,L,M,N,O,P,Q,R,S,T,U,V nonwestern

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
    border: 1px solid #ddd;
    border-radius: 4px;
    user-select: none;
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
    background: white;
    border: 1px solid #ddd;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .zoom-controls button:hover {
    background: #f5f5f5;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  .zoom-controls button:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
