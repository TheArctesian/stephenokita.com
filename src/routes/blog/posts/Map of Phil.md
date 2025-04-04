---
title: Historical Map of Philosophies
description: An experiment with Mermaid as well as a pretty interesting retrospection on the history of knowledge.
date: "2025-04-03"
location: Berkeley
categories:
  - Philosophy
  - Ontology
published: true
---

This was made in conjunction with Sonnet-3.7. You will have to zoom in to read the graph (mouse pinch not ctrl +). I might make a separate site just for graphing and mapping. Would really like to make an engine for it with 3js as I would love to weight these ideas based off of references.
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

<p><em>Note: Philosophers categorized by their primary period of influence, though many worked across traditional boundaries.</em></p>

</div
>

<script type="module">
  import mermaid from "mermaid";
</script>
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
    title[<b>Map of Global Philosophical Traditions and Influences</b>]
    
    %% Subgraph: Ancient Western Philosophy
    subgraph Ancient_Western["Ancient Western Philosophy"]
        A["Thales (c.624-546 BCE)<br>Water as first principle"] --> B["Anaximander (c.610-546 BCE)<br>Apeiron, cosmic justice"]
        B --> C["Heraclitus (c.535-475 BCE)<br>Flux, logos, fire"]
        B --> D["Parmenides (c.515-450 BCE)<br>Being, immutability"]
        D --> E["Zeno of Elea (c.490-430 BCE)<br>Paradoxes of motion"]
        C --> F["Democritus (c.460-370 BCE)<br>Atomism, materialism"]
        D --> G["Protagoras (c.490-420 BCE)<br>Relativism, man is measure"]
        G --> H["Socrates (469-399 BCE)<br>Elenchus, virtue is knowledge"]
        F --> H
        H --> W["Plato (427-347 BCE)<br>Forms, immortal soul, dialectic"]
        W --> X["Aristotle (384-322 BCE)<br>Hylomorphism, categories, virtue ethics"]
        X --> Y["Epicurus (341-270 BCE)<br>Atomic materialism, pleasure"]
        X --> Z["Zeno of Citium (334-262 BCE)<br>Stoicism, logos, apatheia"]
        W --> AA["Pyrrho (c.360-270 BCE)<br>Radical skepticism, epoche"]
        AA --> AB["Sextus Empiricus (c.160-210 CE)<br>Methodical skepticism"]
        Z --> AC["Chrysippus (c.279-206 BCE)<br>Stoic logic, compatibilism"]
        W --> AD["Diogenes (c.412-323 BCE)<br>Cynicism, asceticism"]
        Z --> AE["Cicero (106-43 BCE)<br>Eclectic Stoicism, natural law"]
        Z --> AF["Seneca (4 BCE-65 CE)<br>Stoic ethics, consolation"]
        Z --> AG["Epictetus (c.50-135 CE)<br>Dichotomy of control"]
        AG --> AH["Marcus Aurelius (121-180 CE)<br>Stoic self-examination"]
        W --> AI["Plotinus (204-270 CE)<br>Neoplatonism, the One"]
        AI --> AJ["Proclus (412-485 CE)<br>Systematic Neoplatonism"]
    end
    
    %% Subgraph: Ancient Eastern Philosophy
    subgraph Ancient_Eastern["Ancient Eastern Philosophy"]
        I["Confucius (551-479 BCE)<br>Ren, li, junzi"] --> J["Mozi (c.470-391 BCE)<br>Universal love, utilitarianism"]
        I --> K["Mencius (372-289 BCE)<br>Innate goodness, righteous rule"]
        I --> L["Xunzi (c.310-235 BCE)<br>Human nature as evil, ritual"]
        M["Laozi (6th c. BCE)<br>Wu-wei, naturalness, Dao"] --> N["Zhuangzi (369-286 BCE)<br>Spontaneity, relativism"]
        K --> O["Dong Zhongshu (179-104 BCE)<br>Cosmological Confucianism"]
        L --> P["Han Feizi (c.280-233 BCE)<br>Legalism, power politics"]
        Q["Upanishads (c.800-200 BCE)<br>Brahman, Atman, karma"] --> R["Buddha (c.563-483 BCE)<br>Four Noble Truths, Middle Way"]
        Q --> S["Jaimini (c.200 BCE)<br>Mimamsa, ritual dharma"]
        R --> T["Nagarjuna (c.150-250 CE)<br>Madhyamaka, emptiness"]
        R --> U["Vasubandhu (4th-5th c. CE)<br>Yogacara, mind-only"]
        Q --> V["Badarayana (c.200 BCE)<br>Vedanta, Brahma Sutras"]
    end
    
    %% Subgraph: Medieval Western Philosophy
    subgraph Medieval_Western["Medieval Western Philosophy"]
        AI --> AP["Augustine (354-430)<br>Original sin, divine illumination"]
        X --> AQ["Boethius (480-524)<br>Consolation, universals"]
        AQ --> AR["John Scotus Eriugena (815-877)<br>Christian Neoplatonism"]
        AP --> AS["Anselm (1033-1109)<br>Ontological argument"]
        AS --> AT["Peter Abelard (1079-1142)<br>Conceptualism, intention"]
        AT --> AU["Aquinas (1225-1274)<br>Five Ways, natural law"]
        AU --> AV["Duns Scotus (1266-1308)<br>Univocity, haecceity"]
        AU --> AW["William of Ockham (1287-1347)<br>Nominalism, parsimony"]
        X --> AK["Al-Kindi (801-873)<br>Islamic Aristotelianism"]
        AK --> AL["Al-Farabi (872-950)<br>Political philosophy, emanation"]
        AL --> AM["Avicenna (980-1037)<br>Essence-existence"]
        AM --> AN["Averroes (1126-1198)<br>Intellect, naturalism"]
        AM --> AO["Al-Ghazali (1058-1111)<br>Critique of philosophy"]
        AN --> AU
        AM --> AU
    end
    
    %% Subgraph: Medieval Eastern Philosophy
    subgraph Medieval_Eastern["Medieval Eastern Philosophy"]
        T --> AX["Dignaga (480-540)<br>Buddhist epistemology"]
        AX --> AY["Dharmakirti (7th c.)<br>Perception theory, apoha"]
        V --> AZ["Sankara (788-820)<br>Advaita Vedanta, non-dualism"]
        V --> BA["Ramanuja (1017-1137)<br>Qualified non-dualism"]
        AZ --> BB["Madhva (1238-1317)<br>Dualistic Vedanta"]
        O --> BC["Wang Bi (226-249)<br>Xuanxue, non-being"]
        BC --> BD["Ge Hong (283-343)<br>Alchemy, immortality"]
        N --> BE["Sengzhao (384-414)<br>Chinese Madhyamaka"]
        BE --> BF["Zhiyi (538-597)<br>Tiantai, threefold truth"]
        BE --> BG["Fazang (643-712)<br>Huayan, interpenetration"]
        O --> BH["Zhu Xi (1130-1200)<br>Neo-Confucian metaphysics"]
    end
    
    %% Subgraph: Renaissance & Early Modern Philosophy
    subgraph Renaissance["Renaissance & Early Modern Philosophy"]
        AW --> BI["Pico della Mirandola (1463-1494)<br>Dignity of man"]
        AU --> BJ["Erasmus (1466-1536)<br>Christian humanism"]
        BJ --> BK["More (1478-1535)<br>Utopia, social criticism"]
        BJ --> BL["Luther (1483-1546)<br>Sola fide, priesthood"]
        BL --> BM["Calvin (1509-1564)<br>Predestination"]
        AT --> BN["Montaigne (1533-1592)<br>Skepticism, self-examination"]
        AW --> BO["Machiavelli (1469-1527)<br>Political realism, virtu"]
        BK --> BP["Hobbes (1588-1679)<br>Social contract, absolutism"]
        BP --> BQ["Locke (1632-1704)<br>Limited government"]
        BQ --> BR["Rousseau (1712-1778)<br>General will, innocence"]
        BQ --> BS["Montesquieu (1689-1755)<br>Separation of powers"]
        AW --> BT["Copernicus (1473-1543)<br>Heliocentrism"]
        BT --> BU["Kepler (1571-1630)<br>Planetary laws"]
        BT --> BV["Galileo (1564-1642)<br>Empirical method"]
        BV --> BW["Francis Bacon (1561-1626)<br>Induction, progress"]
        BU --> BX["Newton (1643-1727)<br>Universal gravitation"]
        BP --> BY["Descartes (1596-1650)<br>Cogito, dualism"]
        BY --> BZ["Malebranche (1638-1715)<br>Occasionalism"]
        BY --> CA["Spinoza (1632-1677)<br>Substance monism"]
        BY --> CB["Leibniz (1646-1716)<br>Monads, harmony"]
        BQ --> CC["Berkeley (1685-1753)<br>Subjective idealism"]
        CC --> CD["Hume (1711-1776)<br>Skepticism, impressions"]
        CD --> CE["Reid (1710-1796)<br>Common sense realism"]
    end
    
    %% Subgraph: Modern Philosophy
    subgraph Modern["Modern Philosophy"]
        BW --> CF["Voltaire (1694-1778)<br>Religious tolerance"]
        CD --> CG["Smith (1723-1790)<br>Free markets, invisible hand"]
        BR --> CH["Kant (1724-1804)<br>Transcendental idealism"]
        CH --> CI["Fichte (1762-1814)<br>Self-positing I, striving"]
        CI --> CJ["Schelling (1775-1854)<br>Identity philosophy"]
        CJ --> CK["Hegel (1770-1831)<br>Dialectic, Absolute Spirit"]
        CK --> CL["Schopenhauer (1788-1860)<br>Will, pessimism"]
        CK --> CM["Marx (1818-1883)<br>Dialectical materialism"]
        CK --> CN["Kierkegaard (1813-1855)<br>Existential choice"]
        CL --> CO["Nietzsche (1844-1900)<br>Will to power"]
        CP["Darwin (1809-1882)<br>Natural selection"] --> CQ["Spencer (1820-1903)<br>Social Darwinism"]
        CG --> CU["Bentham (1748-1832)<br>Hedonistic utilitarianism"]
        CU --> CV["Mill (1806-1873)<br>Qualitative utilitarianism"]
        CV --> CW["Sidgwick (1838-1900)<br>Methods of ethics"]
        CH --> CX["Peirce (1839-1914)<br>Pragmatic maxim"]
        CX --> CY["James (1842-1910)<br>Radical empiricism"]
        CY --> CZ["Dewey (1859-1952)<br>Instrumentalism"]
        CD --> DA["Frege (1848-1925)<br>Predicate logic"]
        DA --> DB["Russell (1872-1970)<br>Logical atomism"]
    end
    
    %% Subgraph: Contemporary Western Philosophy
    subgraph Contemporary_Western["Contemporary Western Philosophy"]
        DB --> DC["Wittgenstein (1889-1951)<br>Language games"]
        DC --> DD["Logical Positivism (1920s-1930s)<br>Verification"]
        DD --> DE["Quine (1908-2000)<br>Holism, naturalized"]
        DC --> DF["Ordinary Language Philosophy (1940s)<br>Use theory"]
        DF --> DG["Austin (1911-1960)<br>Speech acts"]
        DF --> DH["Ryle (1900-1976)<br>Category mistakes"]
        DE --> DI["Davidson (1917-2003)<br>Radical interpretation"]
        DE --> DJ["Kripke (b. 1940)<br>Rigid designation"]
        CH --> DK["Husserl (1859-1938)<br>Phenomenology"]
        DK --> DL["Heidegger (1889-1976)<br>Dasein, being-in-world"]
        DL --> DM["Sartre (1905-1980)<br>Being and nothingness"]
        DM --> DN["Merleau-Ponty (1908-1961)<br>Embodied perception"]
        DM --> DO["Beauvoir (1908-1986)<br>Ethics of ambiguity"]
        DL --> DP["Gadamer (1900-2002)<br>Hermeneutics"]
        DL --> DQ["Levinas (1906-1995)<br>Ethics of Other"]
        CM --> DR["Adorno (1903-1969)<br>Negative dialectic"]
        DR --> DS["Habermas (b. 1929)<br>Communicative rationality"]
        DL --> DT["Foucault (1926-1984)<br>Power/knowledge"]
        DL --> DU["Derrida (1930-2004)<br>Deconstruction"]
        DT --> DV["Butler (b. 1956)<br>Gender performativity"]
        DT --> DW["Agamben (b. 1942)<br>Bare life"]
    end
    
    %% Subgraph: Critical Theory & Postmodernism
    subgraph Critical_Theory["Critical Theory & Postmodernism"]
        CM --> GC["Horkheimer (1895-1973)<br>Critical theory"]
        GC --> DR
        CM --> GD["Benjamin (1892-1940)<br>Aura, mechanical reproduction"]
        GD --> DR
        CM --> GE["Gramsci (1891-1937)<br>Cultural hegemony"]
        CM --> GF["Lukács (1885-1971)<br>Reification"]
        GF --> DR
        GE --> DS
        DR --> GG["Fromm (1900-1980)<br>Social character"]
        DR --> GH["Marcuse (1898-1979)<br>One-dimensional man"]
        DS --> GI["Honneth (b. 1949)<br>Recognition theory"]
        DT --> EE["Deleuze (1925-1995)<br>Difference, rhizome"]
        DS --> EF["Fraser (b. 1947)<br>Justice, recognition"]
        DU --> EG["Spivak (b. 1942)<br>Subaltern voices"]
        EE --> GJ["Guattari (1930-1992)<br>Schizoanalysis"]
        CM --> GK["Althusser (1918-1990)<br>Structural Marxism"]
        GK --> DT
        DT --> GL["Said (1935-2003)<br>Orientalism"]
        GL --> EG
        DT --> GM["Baudrillard (1929-2007)<br>Simulation"]
        DU --> GN["Kristeva (b. 1941)<br>Abjection"]
        GE --> GO["Stuart Hall (1932-2014)<br>Cultural studies"]
        DV --> GP["Preciado (b. 1970)<br>Technosexuality"]
    end
    
    %% Subgraph: Contemporary Political Philosophy
    subgraph Contemporary_Political["Contemporary Political & Ethics"]
        CV --> EM["Rawls (1921-2002)<br>Justice as fairness"]
        EM --> EN["Nozick (1938-2002)<br>Minimal state"]
        EM --> EO["Sen (b. 1933)<br>Capabilities approach"]
        EO --> EP["Nussbaum (b. 1947)<br>Human flourishing"]
        EM --> EQ["Sandel (b. 1953)<br>Communitarian critique"]
        CW --> EV["Moore (1873-1958)<br>Non-naturalism"]
        EV --> EW["Ross (1877-1971)<br>Prima facie duties"]
        EW --> EX["Stevenson (1908-1979)<br>Emotivism"]
        EX --> EY["Hare (1919-2002)<br>Prescriptivism"]
        EW --> EZ["Foot (1920-2010)<br>Natural goodness"]
        EZ --> FA["Williams (1929-2003)<br>Moral luck"]
        EZ --> FB["MacIntyre (b. 1929)<br>Virtue tradition"]
        EQ --> FC["Singer (b. 1946)<br>Animal liberation"]
        EN --> FD["Parfit (1942-2017)<br>Personal identity"]
        EE --> GB["Negri (b. 1933)<br>Multitude, empire"]
        GB --> GQ["Hardt (b. 1960)<br>Commonwealth"]
        DW --> GR["Mbembe (b. 1957)<br>Necropolitics"]
        GL --> GR
        DT --> GS["Rancière (b. 1940)<br>Disagreement"]
        GS --> GT["Mouffe (b. 1943)<br>Agonistic pluralism"]
        GT --> GU["Laclau (1935-2014)<br>Populist reason"]
        CN --> GA["Buber (1878-1965)<br>I-Thou relation"]
        DL --> GA
    end
    
    %% Subgraph: Contemporary Eastern & Global Philosophy
    subgraph Contemporary_Eastern["Contemporary Eastern & Global Philosophy"]
        AZ --> CS["Vivekananda (1863-1902)<br>Neo-Vedanta"]
        CS --> DX["Aurobindo (1872-1950)<br>Integral yoga"]
        DX --> DY["Radhakrishnan (1888-1975)<br>Comparative religion"]
        BH --> DZ["Mao Zedong (1893-1976)<br>Sinification of Marxism"]
        BH --> CR["Wang Yangming (1472-1529)<br>Unity of knowledge"]
        BA --> CT["Ramanuja (1017-1137)<br>Qualified non-dualism"]
        EA["Japanese Philosophy (20th c.)<br>Kyoto School"] --> EB["Nishida (1870-1945)<br>Logic of place"]
        EB --> EC["Tanabe (1885-1962)<br>Metanoetics"]
        EB --> ED["Nishitani (1900-1990)<br>Emptiness"]
        ER["Senghor (1906-2001)<br>Negritude"] --> ES["Wiredu (1931-2022)<br>Conceptual decolonization"]
        ES --> ET["Gyekye (1939-2019)<br>Communitarianism"]
        ET --> EU["Appiah (b. 1954)<br>Cosmopolitanism"]
        DH --> EI["Chalmers (b. 1966)<br>Hard problem"]
        DJ --> EJ["Putnam (1926-2016)<br>Multiple realizability"]
        EJ --> EK["Dennett (b. 1942)<br>Consciousness explained"]
        DI --> EL["Searle (1932-2022)<br>Chinese room"]
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
