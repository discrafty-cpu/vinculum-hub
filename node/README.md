# Vinculum Math Solutions NODE

**The shared math brain powering the VINCULUM ecosystem.**

This repository is the **single source of truth** for all shared engines, data files, standards alignments, themes, and documentation used by both the [VINCULUM Hub](https://github.com/discrafty-cpu/vinculum-hub) and the [Lesson Digester](https://github.com/discrafty-cpu/lesson-digester).

---

## Architecture

```
┌─────────────────────────────────────┐
│     VINCULUM Hub (public)           │  All 291+ teaching apps
│     github.com/discrafty-cpu/       │  K through PreCalc
│           vinculum-hub              │  The storefront
└────────────────┬────────────────────┘
                 │ syncs shared/
┌────────────────▼────────────────────┐
│     Vinculum Math Solutions NODE    │  Engines, data, standards,
│     github.com/discrafty-cpu/       │  themes, documentation
│           vinculum-node             │  The math brain
└────────────────▲────────────────────┘
                 │ syncs shared/
┌────────────────┴────────────────────┐
│     Lesson Digester (public)        │  PPTX analysis, generation,
│     github.com/discrafty-cpu/       │  dashboards, dialogues
│           lesson-digester           │  The workshop
└─────────────────────────────────────┘
```

**Flow:** Push to NODE → GitHub Actions auto-creates PRs in both Hub and Digester → Each reviews and merges independently.

---

## Repository Structure

```
vinculum-node/
├── engines/                    # 25 JavaScript engines (~19,500+ LOC)
│   ├── socratic-flow-engine.js     # Adaptive branching dialogue state machine
│   ├── socratic-flow-ui.js         # Theme-aware overlay/inline panel renderer
│   ├── socratic-flows-data.js      # 16 curated Socratic flow definitions
│   ├── math-visual-engine.js       # 14 SVG visual types for K-8
│   ├── math-models.js              # SVG math model generator library
│   ├── pptx-themes.js              # 10 themes (colors, fonts, dark/light)
│   ├── standards-db.js             # K-12 cross-reference (CCSS ↔ MN ↔ TEKS)
│   ├── leveled-problems-data.js    # DOK-leveled problems for MCA-III topics
│   ├── problem-generator.js        # Parametric math problem generation
│   ├── dialogue-engine.js          # Structured dialogue + error analysis
│   ├── dialogue-cards-pdf.js       # Printable dialogue cards (flexible groups)
│   ├── worksheet-pdf-engine.js     # Differentiated PDF worksheets (L1-L6)
│   ├── vinculum-connector.js       # Tool catalog connector (234 tools)
│   ├── vinculum-bridge.js          # 3D Geometry Viewer integration
│   ├── vinculum-core.js            # Core Hub runtime
│   ├── fraction-renderer.js        # Inline → vertical fraction notation
│   ├── indigenous-context.js       # Indigenous math teacher reference layer
│   ├── benchmark-descriptors.js    # K-8 performance level descriptors
│   ├── rubric-descriptors.js       # MN benchmark proficiency descriptors
│   ├── teaching-insights-data.js   # SciMath MN STEM teaching insights
│   ├── lesson-components-data.js   # Prerequisites + success criteria
│   ├── structured-dialogues-data.js# WWC-aligned dialogue protocols
│   ├── layout-engine.js            # Lesson layout system
│   ├── standards-worksheet-generator.js # Auto-generate worksheets by standard
│   └── digester-core.js            # Core digester utilities
│
├── data/                       # 42 curriculum data files
│   ├── problems/                   # K-12 grade-level problem banks (13 files)
│   ├── proficiency/                # K-12 benchmark descriptors (13 files)
│   ├── standards/                  # CCSS, MN 2007, MN 2022, TEKS (4 files)
│   ├── frameworks/mn07/            # MN 2007 framework grades 6-8 (3 files)
│   ├── teaching/                   # Differentiation, scaffolds, misconceptions (4 files)
│   ├── cross-ref/                  # Benchmark ↔ topic mappings (2 files)
│   ├── index.json
│   ├── vinculum-problem-matrix.json
│   └── vinculum-problem-matrix.tsv
│
├── css/                        # Shared stylesheets
│   ├── vinculum-core.css           # Hub theme bridge (all tools inherit)
│   └── digester-theme.css          # Digester-specific theme
│
├── vinculum-tools-api.json     # Tool catalog: 234 tools with full metadata
│                                  (CCSS, MN, TEKS, CRA, Piaget, misconceptions)
│
├── docs/                       # 16 design & reference documents
│   ├── DEVELOPER-BRIEF.md         # Full ecosystem handoff document
│   ├── CRA-PIAGET-FRAMEWORK-DESIGN.md
│   ├── VINCULUM-Master-Tool-Plan.md
│   ├── VINCULUM-Think-Like-A-Math-Teacher.md
│   ├── MathVisualEngine_Implementation_Guide.md
│   ├── MathVisualEngine_Research_Report.md
│   ├── STANDARDS-REFERENCE.md
│   ├── INDIGENOUS_INTEGRATION_GUIDE.md
│   ├── AUDIT_COMPREHENSIVE_2025.md
│   ├── AUDIT_INDEX.md
│   ├── VINCULUM-Feasibility-Report.md
│   ├── VINCULUM-Grade1-Grade2-Plan.md
│   ├── VINCULUM-Grade3-Grade4-Plan.md
│   ├── VINCULUM-Improvement-Modularity-Report.md
│   ├── VINCULUM-Tile-Notation-Audit.md
│   └── WORKFLOW-CHEAT-SHEET.md
│
└── .github/workflows/
    └── sync.yml                # Auto-PR sync to Hub and Digester
```

---

## Standards Alignment

Every tool and Socratic flow supports triple alignment:

| Framework | Format | Example | Coverage |
|-----------|--------|---------|----------|
| **CCSS** | domain.standard | `6.RP.3c` | K-PreCalc |
| **MN Math Benchmarks** | grade.strand.standard.benchmark | `6.1.2.4` | K-8 (MCA-III) |
| **TEKS** | grade.strand | `6.5B` | K-PreCalc |

**Extensible:** Add any framework by adding a key to the `standards` object:
```javascript
standards: { ccss: [...], mn: [...], teks: [...], your_state: [...] }
```

---

## Theme System

10 themes with 22 color keys, font families, and dark/light modes:

| Theme | Style | Dark? |
|-------|-------|-------|
| Classic Academic | Navy + gold | No |
| Warm Workshop | Terracotta + cream | No |
| Bold Modern | Bright + clean | No |
| Visual Story | Storybook pastels | No |
| Interactive Notebook | Notebook paper | No |
| Vinculum Dark | Teal + dark slate | Yes |
| Neon Forge | Neon on black | Yes |
| Arctic Frost | Ice blue + white | No |
| CRA Flow | Green progression | No |
| Ocean Deep | Deep blue + coral | Yes |

---

## How to Use

### In any HTML app:
```html
<!-- Load engines from NODE (or synced shared/ directory) -->
<script src="engines/pptx-themes.js"></script>
<script src="engines/math-visual-engine.js"></script>
<script src="engines/leveled-problems-data.js"></script>
<script src="engines/socratic-flows-data.js"></script>
<script src="engines/socratic-flow-engine.js"></script>
<script src="engines/socratic-flow-ui.js"></script>

<!-- Launch Socratic Flow with one line -->
<script>
  SocraticFlowUI.open({ topic: 'percent', grade: 6, comfort: 2 });
</script>
```

### Sync to your project:
The GitHub Actions workflow automatically creates PRs when this repo is updated. To manually sync:
```bash
# Add NODE as a remote
git remote add node https://github.com/discrafty-cpu/vinculum-node.git
git fetch node main

# Pull shared assets into your project
git subtree pull --prefix=shared node main --squash
```

---

## Pedagogical Framework

- **CRA** — Concrete → Representational → Abstract progression
- **Piaget** — Conservation, reversibility, classification constructs
- **WWC** — What Works Clearinghouse Practice Guide for math dialogues
- **DOK** — Depth of Knowledge levels 1-3 for problem complexity
- **3-Phase Socratic** — Orient → Explore → Connect questioning structure
- **Comfort Levels** — 4 tiers controlling scaffolding depth

---

## Author

**Jon Drummond** — Drummond Math Solutions / Vinculum Math Solutions
Master Math Teacher | Roseville, MN

---

*This is the math brain. The Hub is the storefront. The Digester is the workshop.*
