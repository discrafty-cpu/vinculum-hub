# VINCULUM Ecosystem — Developer Brief
**Author:** Jon Drummond (Drummond Math Solutions)
**Date:** March 18, 2026
**Purpose:** Handoff document for recreating, blending, or extending this ecosystem

---

## 1. ECOSYSTEM OVERVIEW

The VINCULUM ecosystem is a **100% offline, browser-based K-PreCalc mathematics curriculum platform** built by a master math teacher. It spans 12 GitHub repositories, 291+ interactive tools, and multiple specialized engines — all running client-side with zero server dependencies once deployed.

### Architecture Philosophy
- **No frameworks** — Pure vanilla JS, IIFE pattern, global namespaces
- **No build step** — Every file runs directly in the browser
- **No AI/web calls at runtime** — Everything is self-contained
- **Theme-aware** — 10 PptxThemes (hex colors without `#`, dark/light modes)
- **Standards-first** — CCSS, MN Math Benchmarks (MCA-III), TEKS baked into every tool
- **CRA progression** — Concrete → Representational → Abstract across all tools
- **Piaget-informed** — Conservation, reversibility, classification constructs tracked

---

## 2. REPOSITORY MAP

### Tier 1: Core Platforms

| Repo | URL | Purpose | Tools | Status |
|------|-----|---------|-------|--------|
| **lesson-digester** | [github](https://github.com/discrafty-cpu/lesson-digester) | Main hub: PPTX analysis + 291 interactive tools + all engines | 234 registered (vinculum-tools-api.json) | Active, GitHub Pages |
| **vinculum-hub** | [github](https://github.com/discrafty-cpu/vinculum-hub) | K-2 curriculum foundation + 286 tools in `/tools/` | 286 tool files | Active, GitHub Pages |

**Relationship:** lesson-digester imported 170+ tools from vinculum-hub and added its own webapp layer (dashboard, dialogue, Socratic flows, standards reports). The tool directories (`/tools/K/` through `/tools/PREC/`) are nearly identical. lesson-digester has 5 additional tools (GEOM, PREC).

### Tier 2: Specialized Engines

| Repo | URL | Purpose |
|------|-----|---------|
| **vinculum** | [github](https://github.com/discrafty-cpu/vinculum) | Original Vinculum Logic Engine — K-2 core JS engines |
| **vinculum-3d-graphing-solution** | [github](https://github.com/discrafty-cpu/vinculum-3d-graphing-solution) | 3D graphing/visualization teaching tool |
| **indigenous-math-integration** | [github](https://github.com/discrafty-cpu/indigenous-math-integration) | 84 Indigenous cultural math contexts (Python engine + JSON data) |
| **mca-vocab-hub** | [github](https://github.com/discrafty-cpu/mca-vocab-hub) | 365+ MCA-III math vocabulary terms, Grades 3-8 + 11 |

### Tier 3: Applications & Games

| Repo | URL | Purpose |
|------|-----|---------|
| **slide** | [github](https://github.com/discrafty-cpu/slide) | Kiosk slideshow builder (drag/drop, embed web apps, auto-play) |
| **math-toolbox** | [github](https://github.com/discrafty-cpu/math-toolbox) | Consolidated math tool suite |
| **array-runner** | [github](https://github.com/discrafty-cpu/array-runner) | Array visualization app |
| **jacks-dino-count** | [github](https://github.com/discrafty-cpu/jacks-dino-count) | Dinosaur counting game (early elementary) |
| **Jack-s-Dino-Math** | [github](https://github.com/discrafty-cpu/Jack-s-Dino-Math) | Dinosaur math game (expanded) |
| **slide-demo-app** | [github](https://github.com/discrafty-cpu/slide-demo-app) | Slide builder demo |

---

## 3. LESSON-DIGESTER: THE MAIN PLATFORM

### 3a. File Structure

```
lesson-digester/
├── digester/                    # Python backend (PPTX analysis)
│   ├── engine.py               # 23 slide builders, Drummond Design System
│   ├── standards.py            # MCA-III alignment, vocab, quiz generation
│   ├── rebuild.py              # Analysis pipeline: classify → align → plan
│   └── data_complete.py
├── webapp/                      # Browser-based frontend (THE MAIN APP)
│   ├── index.html              # Dashboard — PPTX upload + analysis + tools grid
│   ├── dialogue.html           # Interactive student dialogue generator
│   ├── place-value-explorer.html   # 3D place value operations (12 algorithms)
│   ├── prime-explorer.html     # 3D prime factorization explorer
│   ├── socratic-flow-demo.html # Socratic Flow demo + integration guide
│   ├── full-layout-system.html # Lesson layout viewer
│   ├── demo/index.html         # Showcase page
│   ├── slide-viewer/index.html # Before/after slide comparison
│   ├── standards-report/index.html # MCA-III alignment report
│   ├── css/digester-theme.css
│   ├── js/                     # 24 engines (~19,460 LOC)
│   ├── data/                   # 42 data files (standards, problems, teaching)
│   ├── tests/                  # 2 test suites (place-value, socratic-flow)
│   └── vinculum-tools-api.json # Tool catalog: 234 tools with full metadata
├── tools/                       # 291 interactive HTML tools (K through PreCalc)
│   ├── K/ (33), 1/ (30), 2/ (39), 3/ (24), 4/ (24), 5/ (25)
│   ├── 6/ (25), 7/ (16), 8/ (15)
│   ├── ALG1/ (11), ALG2/ (8), GEOM/ (12), PREC/ (8)
│   └── shared/                 # vinculum-core.js, vinculum-core.css, etc.
├── scripts/                    # Automation (GitHub setup, app scaffolding)
├── skill/                      # SKILL.md documentation
├── CRA-PIAGET-FRAMEWORK-DESIGN.md
├── VINCULUM-Improvement-Modularity-Report.md
└── WORKFLOW-CHEAT-SHEET.md
```

### 3b. JavaScript Engines (24 files, ~19,460 LOC)

**Core Pipeline:**
| Engine | LOC | Purpose |
|--------|-----|---------|
| `digester-core.js` | 208 | Core utilities for lesson digestion |
| `layout-engine.js` | 1,512 | Lesson layout system |
| `vinculum-connector.js` | 491 | Pseudo-database connecting to VINCULUM Hub's 234 tools |
| `vinculum-bridge.js` | 258 | 3D Geometry Viewer integration |

**Standards & Curriculum:**
| Engine | LOC | Purpose |
|--------|-----|---------|
| `standards-db.js` | 1,075 | K-12 Math Standards cross-reference (CCSS ↔ MN ↔ TEKS) |
| `benchmark-descriptors.js` | 707 | K-8 performance level descriptors |
| `rubric-descriptors.js` | 1,180 | Benchmark-specific MN proficiency descriptors |
| `teaching-insights-data.js` | 986 | Teaching insights from SciMath MN STEM Teacher Center |
| `lesson-components-data.js` | 567 | Prerequisites, success criteria per topic |
| `indigenous-context.js` | 673 | Indigenous math teacher reference layer |

**Content Generators:**
| Engine | LOC | Purpose |
|--------|-----|---------|
| `leveled-problems-data.js` | 997 | DOK-leveled practice problems for MCA-III topics |
| `problem-generator.js` | 466 | Parametric math problem generation |
| `structured-dialogues-data.js` | 997 | WWC-aligned structured dialogues & error analysis |
| `dialogue-engine.js` | 346 | Generates dialogue + dual error analysis content |
| `dialogue-cards-pdf.js` | 599 | Printable dialogue cards for flexible groups |
| `worksheet-pdf-engine.js` | 766 | Differentiated PDF worksheets (6 levels, L1-L6) |
| `standards-worksheet-generator.js` | 784 | Auto-generate PDF worksheets by standard |

**Visual & Theme:**
| Engine | LOC | Purpose |
|--------|-----|---------|
| `math-visual-engine.js` | 742 | 14 SVG visual types (fractionBar, numberLine, areaModel, etc.) |
| `math-models.js` | 1,415 | SVG math model generator library |
| `fraction-renderer.js` | 441 | Inline text → proper vertical fraction notation |
| `pptx-themes.js` | 424 | 10 themes: Classic Academic, Warm Workshop, Bold Modern, Visual Story, Interactive Notebook, Vinculum Dark, Neon Forge, Arctic Frost, CRA Flow, Ocean Deep |

**Socratic Flow System (NEW — this session):**
| Engine | LOC | Purpose |
|--------|-----|---------|
| `socratic-flow-engine.js` | 934 | Adaptive branching state machine with answer evaluation |
| `socratic-flow-ui.js` | 1,068 | Theme-aware overlay/inline panel renderer |
| `socratic-flows-data.js` | 1,824 | 16 curated flows with stories, visuals, branching |

### 3c. Data Architecture (42 files)

```
data/
├── problems/           # K-12 grade-level problem banks (13 files)
├── proficiency/        # K-12 benchmark proficiency descriptors (13 files)
├── standards/          # CCSS, MN 2007, MN 2022, TEKS indexes (4 files)
├── frameworks/mn07/    # MN 2007 framework by grade (3 files: gr 6-8)
├── teaching/           # Differentiation, scaffolds, misconceptions (4 files)
├── cross-ref/          # Benchmark ↔ topic mappings (2 files)
└── vinculum-problem-matrix.json + .tsv  # Full problem matrix
```

### 3d. Tool Catalog (`vinculum-tools-api.json`)

**234 tools** with rich metadata per tool:
```json
{
  "id": "socratic-ratios-rates",
  "name": "Socratic: Ratios & Rates",
  "grade": "6",
  "strand": "RP",
  "ccss": ["6.RP.1", "6.RP.2", "6.RP.3"],
  "mn": ["6.1.2.1", "6.1.2.2"],
  "teks": ["6.4B", "6.4C"],
  "toolType": "socratic-flow",
  "misconceptions": [...],
  "diff": { "emergent": "...", "proficient": "...", "advanced": "..." },
  "cra": { "primary": "representational", "supports": [...], "visualModels": [...] },
  "piaget": { "stage": "concrete-operational", "constructs": [...] }
}
```

---

## 4. SOCRATIC FLOW ENGINE (Built This Session)

### What It Is
An **adaptive, branching, answer-reactive dialogue system** for mathematics. Runs 100% offline. State machine drives a directed graph of nodes. Student answers determine the path.

### Architecture
```
SocraticFlowEngine.start(topic, { grade, comfort, theme })
       ↓
   FlowSession (state machine)
       ↓
   Node types: story → question → visual → reveal → branch → scaffold → celebrate
       ↓
   Answer evaluation: exact, numeric (±tolerance), keyword, choice, custom
       ↓
   Reactive injection: injectNode(), reactToPerformance()
       ↓
SocraticFlowUI.open() → overlay panel with theme, standards, progress
```

### Key APIs
```javascript
// Start a flow
const session = SocraticFlowEngine.start('percent', { grade: 6, comfort: 2 });

// Session methods
session.getCurrentNode()      // Current node in the graph
session.submitAnswer('20')    // Returns { result, feedback, socraticFollow }
session.advance()             // Move to next node (non-question)
session.getHint()             // Progressive hints
session.getSentenceFrames()   // Comfort-level sentence starters
session.getVisual()           // SVG from MathVisualEngine
session.getProgress()         // { answered, total, percent }
session.getScore()            // { correct, incorrect, partial, skipped }
session.injectNode(nodeDef)   // Dynamic mid-flow injection
session.reactToPerformance()  // Auto-scaffold/extend based on score

// UI (one-line integration into any app)
SocraticFlowUI.open({ topic: 'ratios and rates', grade: 6 });
SocraticFlowUI.attachButton(container, { topic, grade, comfort });
SocraticFlowUI.embed(container, { topic, grade });
```

### 16 Curated Flows

| # | Topic | Grade | CCSS | MN Benchmark | Story |
|---|-------|-------|------|-------------|-------|
| 1 | Multiply/Divide Fractions | 6 | 6.NS.1 | 6.1.3.1-3 | Pizza sharing |
| 2 | Ratios & Rates | 6 | 6.RP.1-3 | 6.1.2.1-2 | Lemonade stand |
| 3 | Equivalence & Representations | 6 | 6.NS.6, 6.RP.3c | 6.1.1.4 | Shopping discounts |
| 4 | Percent | 6 | 6.RP.3c | 6.1.2.4 | Per centum discovery |
| 5 | Locate & Compare Numbers | 6 | 6.NS.5-7 | 6.1.1.1-2 | Hiking trail |
| 6 | Factors, Primes, GCF, LCM | 6 | 6.NS.4 | 6.1.1.5 | Party planner |
| 7 | Applying Rational Numbers | 6 | 6.NS.3, 6.NS.5 | 6.1.1.3 | Bank account |
| 8 | Mean, Median & Range | 6 | 6.SP.3, 6.SP.5 | 6.4.1.1 | Basketball stats |
| 9 | Proportional Relationships | 7 | 7.RP.2 | 7.1.2.1 | Road trip |
| 10 | Solve Equations | 7 | 7.EE.4 | 7.2.3.1 | Mystery numbers |
| 11 | Circumference & Area | 7 | 7.G.4 | 7.3.1.1 | Circular garden |
| 12 | Representing Rationals | 7 | 7.NS.1-2 | 7.1.1.1 | Recipe scaling |
| 13 | Pythagorean Theorem | 8 | 8.G.6-7 | 8.3.1.1 | Tilted squares |
| 14 | Equations & Systems | 8 | 8.EE.8 | 8.2.4.1 | Phone plans |
| 15 | Similarity & Scaling | 8 | 8.G.4 | 8.3.1.2 | Architect's model |
| 16 | Rational/Irrational Numbers | 8 | 8.NS.1-2 | 8.1.1.1 | Impossible fraction |

### Standards Alignment Structure (Extensible)
```javascript
standards: {
    ccss: ['6.RP.1', '6.RP.2', '6.RP.3'],   // Common Core
    mn: ['6.1.2.1', '6.1.2.2'],              // MN Math Benchmarks
    teks: ['6.4B', '6.4C'],                   // Texas
    // Future — just add a key, UI auto-renders:
    // ngss: [...], ibo: [...], act: [...], sat: [...], ap: [...]
}
```

### Comfort Levels (1-4)
| Level | Label | Behavior |
|-------|-------|----------|
| 1 | "I need the words" | Full sentence frames, scaffold-first, max hints |
| 2 | "I know a little" | Some frames, hints on request |
| 3 | "I can talk about it" | Minimal scaffolding |
| 4 | "I can teach it" | No frames, challenge extensions |

### Visual Types (MathVisualEngine, 14 types)
fractionBar, fractionCircle, numberLine, areaModel, percentBar, ratioTable, tapeDiagram, base10Blocks, coordinatePlane, setModel, arrayDots, placeValueChart, balanceScale, barModel

---

## 5. THEME SYSTEM

10 themes, each providing: `colors` (22 hex values without `#`), `fonts` (heading, body, mono), `dark` (boolean), `swatch` array.

```javascript
PptxThemes.ids()        // ['classic-academic', 'warm-workshop', ...]
PptxThemes.get(id)      // Full theme object
PptxThemes.select(id)   // Set active Hub theme
PptxThemes.getSelected() // Read active theme
PptxThemes.all()        // Array of all themes
```

**Color keys:** bg, bg2, card, card2, border, text, text2, muted, primary, secondary, accent, accent2, accent3, white, headerBg, headerText, targetBg, targetBorder, questionBg, questionBorder, exitBg, exitText

All apps **must** adapt to the Hub's active theme (stored feedback requirement).

---

## 6. PR HISTORY (lesson-digester)

| PR | Title | Date |
|----|-------|------|
| #1 | Expanded problem DB, Vinculum 3D, SVG upgrade | Mar 18 |
| #2 | VINCULUM Hub connector as curriculum pseudo-database | Mar 18 |
| #3 | CRA + Piaget framework design and tooling | Mar 18 |
| #4 | Astromander Proportions game + visual upgrades | Mar 18 |
| #5 | Place Value Operations Explorer (3D blocks + 12 algorithms) | Mar 18 |
| #6 | Hub theme integration, CRA scaffolding, CCSS alignment | Mar 18 |
| #7 | Animated regrouping with green/red glow, step-back controls | Mar 18 |
| #8 | vinculum-core.css theme bridge — all 106 tools inherit Hub theme | Mar 18 |
| #9 | Prime or Composite Explorer (3D Socratic discovery) | Mar 18 |
| #10 | Socratic Flow Engine: adaptive dialogue system | Mar 18 |
| #11 | Fix animation reliability + camera auto-framing | Mar 18 |
| #12 | **Integrate Socratic Flow: 16 flows, standards, theme wiring** | Mar 18 |
| #13 | 3D Prime Explorer & Divisibility Rules Explorer | Mar 18 |

---

## 7. ASSESSMENT — CURRENT STATE

### Strengths
- **Massive content library** — 291 tools, 42 data files, 234 cataloged entries
- **Deep standards alignment** — Triple-aligned (CCSS + MN + TEKS) with extensible structure
- **Pedagogically sound** — CRA progression, Piaget constructs, WWC practices, DOK levels
- **Theme consistency** — 10 themes cascade through all apps
- **Offline-first** — Zero runtime dependencies
- **Socratic engine** — Adaptive branching with answer evaluation, reactive injection, comfort levels

### Gaps / Risks
- **No persistent student data** — Scores reset on page reload (localStorage not yet implemented)
- **2 test suites only** — place-value + socratic-flow; other engines untested
- **Duplicate code across repos** — vinculum-hub and lesson-digester share 286+ tool files
- **No auto-deployment** — GitHub Pages is manual
- **No Socratic flows for K-5 or Algebra+** — Only grades 6-8 curated so far
- **Indigenous context engine** is in a separate repo (Python), not integrated into webapp JS
- **mca-vocab-hub** is standalone — 365+ terms not connected to the Socratic or dialogue engines
- **Auto-update protocol missing** — New apps don't automatically get Socratic Flow wiring

---

## 8. QUESTIONS FOR STRATEGIC PLANNING

1. **Repo consolidation** — vinculum-hub and lesson-digester share 286 tool files. Should they merge into one monorepo, or should lesson-digester be the canonical source with vinculum-hub as K-2 only?

2. **K-5 and Algebra+ Socratic flows** — The 16 curated flows cover grades 6-8. Do you want curated flows for K-5 (early elementary) and ALG1/ALG2/GEOM/PREC?

3. **Student persistence** — Should scores, flow progress, and comfort levels save to localStorage? Or are you planning a future backend (even optional)?

4. **MCA Vocab integration** — The 365+ vocabulary terms in mca-vocab-hub could power a vocabulary node type in Socratic flows. Is that a priority?

5. **Indigenous context layer** — Currently Python-based in its own repo. Should it become a JS engine in lesson-digester so Socratic flows can weave in cultural contexts?

6. **Deployment pipeline** — Are you targeting GitHub Pages for all repos? Would a shared deployment script or GitHub Actions workflow help?

7. **Testing coverage** — Only 2 test suites exist. Which engines need tests most urgently?

8. **Design protocol** — You asked for auto-update of Socratic Flows when new apps are added. Should this be a CLAUDE.md rule, a build script, or a convention document?

---

## 9. SUGGESTED FUTURE BUILDS

### High Priority (Foundation)

| Build | Why | Connects To |
|-------|-----|-------------|
| **Socratic Flow Auto-Wire Protocol** | Every new app gets Socratic Mode automatically | CLAUDE.md + scaffold script |
| **Student Progress Persistence** | localStorage save/restore for flow sessions, scores, comfort | socratic-flow-engine.js |
| **Test Suite Expansion** | Unit tests for math-visual-engine, dialogue-engine, problem-generator | webapp/tests/ |
| **Repo Consolidation Plan** | Decide vinculum-hub ↔ lesson-digester relationship | Both repos |

### Medium Priority (Content Expansion)

| Build | Why | Connects To |
|-------|-----|-------------|
| **K-5 Socratic Flows** | 16 flows only cover 6-8; K-5 has 152 tools with no Socratic coverage | socratic-flows-data.js |
| **Algebra/Geometry/PreCalc Flows** | Upper math has 39 tools, zero Socratic flows | socratic-flows-data.js |
| **MCA Vocab → Socratic Integration** | 365 vocab terms become vocab checkpoint nodes in flows | mca-vocab-hub → socratic engine |
| **Indigenous Context Nodes** | Weave 84 cultural math contexts into Socratic flow stories | indigenous-math-integration → flows-data |
| **Beautiful Math Rendering** | LaTeX-style notation, animated step-by-step solutions | math-visual-engine.js |

### Aspirational (Platform)

| Build | Why | Connects To |
|-------|-----|-------------|
| **Teacher Dashboard** | View class-wide Socratic flow progress, misconception heatmaps | New app + localStorage data |
| **Print/Export Socratic Sessions** | PDF summary of completed flow (questions, answers, score, visuals) | dialogue-cards-pdf.js pattern |
| **Slide Builder Integration** | Embed Socratic flows as slides in the kiosk builder | slide repo |
| **Multi-language Support** | Spanish sentence frames, bilingual vocab nodes | All engines |
| **3D Visual Nodes** | vinculum-3d-graphing-solution renders inside Socratic flow panels | vinculum-bridge.js |

---

## 10. HOW TO RECREATE / BLEND

### To recreate the Socratic Flow system in another project:

1. **Copy these 3 files** into your project:
   - `js/socratic-flow-engine.js` — The state machine (no dependencies)
   - `js/socratic-flow-ui.js` — The UI renderer (optional: reads PptxThemes)
   - `js/socratic-flows-data.js` — The 16 curated flow definitions

2. **Add script tags** (after your data files):
   ```html
   <script src="js/socratic-flows-data.js"></script>
   <script src="js/socratic-flow-engine.js"></script>
   <script src="js/socratic-flow-ui.js"></script>
   ```

3. **Launch with one line:**
   ```javascript
   SocraticFlowUI.open({ topic: 'percent', grade: 6, comfort: 2 });
   ```

4. **Optional dependencies** (enhance but not required):
   - `js/pptx-themes.js` — Theme system (UI falls back to Classic Academic)
   - `js/math-visual-engine.js` — SVG visuals in visual nodes
   - `js/leveled-problems-data.js` — DOK problems for auto-generation

### To blend with vinculum-hub:
- The `tools/shared/vinculum-core.css` provides the theme bridge
- `vinculum-connector.js` maps tool IDs → HTML paths
- Any tool in `/tools/` can be launched from Socratic flow via VinculumConnector

### To add a new alignment framework:
```javascript
// In any flow's standards object, just add the key:
standards: {
    ccss: ['6.RP.1'],
    mn: ['6.1.2.1'],
    teks: ['6.4B'],
    your_state: ['YOUR.STANDARD.CODE']  // Auto-renders in UI
}
```

### To author a new Socratic flow:
```javascript
SOCRATIC_FLOWS['your topic'] = {
    id: 'unique-id',
    topic: 'your topic',
    grade: 7,
    title: 'Display Title',
    description: 'One-line description',
    standards: { ccss: [...], mn: [...], teks: [...] },
    startNode: 'first_node_id',
    nodes: [
        { id: 'first_node_id', type: 'story', phase: 'orient', title: '...', content: '...', next: 'q1' },
        { id: 'q1', type: 'question', phase: 'explore', prompt: '...', accept: { numeric: 42, tolerance: 0.5 }, hints: [...], next: 'celebrate' },
        { id: 'celebrate', type: 'celebrate', phase: 'connect', title: 'Done!', content: '...' }
    ]
};
```

---

*This document should be sufficient for any developer or future Claude session to understand, recreate, extend, or blend any part of this ecosystem.*
