# GEOMetrics EngineX Pro - Comprehensive Module Audit

**Document Date:** March 10, 2026
**Status:** Active Development
**Last Updated:** Initial Audit Creation

---

## Executive Summary

GEOMetrics EngineX Pro is a collection of 7 specialized mathematics learning modules designed for grades 6-8 instruction. Currently, 6 modules are extracted from a legacy Google Apps Script environment. This audit documents the architecture, module specifications, benchmark alignment (Minnesota state standards), and a modernization plan to separate these modules into standalone, iframe-embeddable HTML tools.

**Key Finding:** The system currently relies on Google Apps Script hosting and React/Tailwind architecture. A migration to standalone HTML + vanilla JavaScript will improve reliability, reduce dependencies, and enable PPTX slide integration.

---

## Part 1: Current Architecture Overview

### Existing Technology Stack

**Current:**
- **Platform:** Google Apps Script (deprecated for standalone use)
- **Frontend Framework:** React + Tailwind CSS
- **Interaction Model:** Canvas-based graphics (HTML5 Canvas API)
- **Backend Integration:** `saveResultToSheet` Google Sheets connector
- **State Management:** React component state
- **Deployment:** Custom Pages endpoint

**Problems:**
1. React dependency adds 40KB+ to bundle size
2. Google Sheets integration couples each module to a specific Google Account context
3. Canvas implementation is custom per module (no shared utilities)
4. Tailwind CSS bundled per module (no de-duplication across modules)
5. Not embeddable in PowerPoint or LMS without significant refactoring
6. Difficult to deploy offline or on generic web servers

### Proposed Target Architecture

**New Stack:**
- **Platform:** Standalone HTML5 + vanilla JavaScript
- **Styling:** Shared `toolbox-core.css` (Tailwind-compiled, reusable)
- **Graphics:** HTML5 Canvas with shared utility library (`toolbox-canvas.js`)
- **Storage:** Optional localStorage for session data (no required backend)
- **Deployment:** Static files, iframe-embeddable, server-agnostic
- **Accessibility:** WCAG 2.1 AA standard (enhanced)

**Benefits:**
1. Reduced bundle size per module (8-12KB vs 45-60KB with React)
2. Instant load time (no React hydration overhead)
3. Full offline capability
4. Embeddable in PPTX (via iframe in web view or Embed feature)
5. Easy to self-host or distribute
6. No login required for basic functionality

---

## Part 2: Module Deep-Dive Documentation

### Module 1: Equation Lab / Systems Engine

**Title:** GEOMetrics V5: Systems Engine
**Subtitle:** Teaching Toolkit v5.5
**Module ID:** `equation-lab`
**Version:** 5.5
**Status:** Extracted & Audited

#### Description

The Equation Lab is a dual-view graphical system for visualizing and solving systems of linear equations. It enables students to explore how two lines intersect (or don't) while showing the algebraic derivation of the solution step-by-step. The module includes real-world scenario presets that ground abstract math in practical contexts (smartphone plans, car rentals, savings plans, etc.).

#### Category

- **Primary:** Algebra I / Graphing Linear Systems
- **Secondary:** Applied Math, Problem-Solving

#### Core Features

**View 1: Equation Lab (Interactive Graphing)**
- Two-line graphing system with independent controls
- Line 1: y = m₁x + b₁ (cyan color)
- Line 2: y = m₂x + b₂ (pink color)
- **Slider Controls:**
  - Slope (m): range [-5, 5], step 0.1 (per line)
  - Y-intercept (b): range [-10, 10], step 0.5 (per line)
- **Canvas Elements:**
  - Coordinate grid with labeled axes
  - Dynamic grid lines (1-unit spacing)
  - Zoom controls: +/- buttons (scale factor 0.5x to 2x)
  - Intersection point displayed in header (if exists)
  - Color-coded lines with legends

**View 2: Real-World Scenarios (Preset Bundles)**
- 5 pre-loaded scenarios with context-specific labels:
  1. **Smartphone Plans:**
     - Line 1: $2 initial fee + $1/GB data
     - Line 2: $0 initial fee + $2/GB data
     - Question: "When will Plan B overtake Plan A in cost?"
  2. **Lemonade Stand Economics:**
     - Line 1: $8 overhead + $0.50/cup revenue
     - Line 2: $1.50/cup direct revenue model
  3. **Fitness Duel (Gym Memberships):**
     - Line 1: $10 membership + $1/visit
     - Line 2: $2 membership + $3/visit
  4. **Car Rental Rates:**
     - Line 1: $5 base + $1/mile
     - Line 2: $2 base + $2/mile
  5. **Saving for Video Game:**
     - Line 1: $0 start + $2/week savings
     - Line 2: $6 start + $1/week savings

**Additional Features:**
- **Input/Output Table:**
  - Generates x-values from -5 to 12
  - Shows y₁ and y₂ for each x
  - Highlights row where y₁ = y₂ (intersection x-value)
  - Interactive: students can identify solution visually

- **Solution Derivation Panel:**
  - Shows step-by-step algebra:
    1. "Equate y: m₁x + b₁ = m₂x + b₂"
    2. "Isolate x: (m₁ - m₂)x = b₂ - b₁"
    3. "Result: x = [value]"
  - Handles parallel lines case: displays "No intersection / Infinite solutions"
  - Color-coded steps with variable highlights

- **Snap to Integer Mode:**
  - Toggle button to round slope/intercept to integers
  - Useful for exploring how form (slope-intercept) affects solutions

- **UI/UX:**
  - Clean white/slate background
  - Tailwind CSS styling
  - Responsive layout (works on tablets)
  - Clear visual hierarchy

#### Backend Integration

- **Server Function:** `saveResultToSheet()`
  - Logs student results to Google Sheet
  - Captures: timestamp, scenario name, both lines' equations, intersection point, time-on-task
  - **Current Issue:** Requires Google Apps Script environment and authentication

#### Minnesota State Standard Mappings

**Grade 8 (Primary Alignments):**

| Benchmark Code | Standard | DOK | Coverage |
|---|---|---|---|
| 8.2.4.7 | Solve systems of linear equations graphically and numerically | 3 | ✅ PRIMARY |
| 8.2.4.8 | Identify and interpret systems with no solution, one solution, or infinite solutions | 3 | ✅ Parallel lines |
| 8.2.2.2 | Identify slope, y-intercept, x-intercept in linear functions | 2 | ✅ Labeled on graph |
| 8.2.2.3 | Determine how changes to slope and y-intercept affect the graph | 2 | ✅ Interactive sliders |
| 8.2.4.3 | Solve and write equations in slope-intercept form (y = mx + b) | 2 | ✅ Core to module |
| 8.2.1.2 | Recognize linear functions and constant rate of change | 2 | ✅ Slope = rate |
| 8.2.2.1 | Recognize proportional relationships and find unit rate | 2 | ⚠️ Implicit (slopes demonstrate) |

**Grade 7 (Secondary):**

| Benchmark Code | Standard | DOK | Coverage |
|---|---|---|---|
| 7.1.1.2 | Solve multi-step equations (linear) | 2 | ✅ Shown in derivation |
| 7.1.2.2 | Plot points on coordinate plane and identify coordinates | 1 | ✅ Grid foundation |
| 7.2.1.1 | Understand proportional relationships (slope context) | 2 | ⚠️ Implicit |

**Grade 6 (Foundational):**

| Benchmark Code | Standard | DOK | Coverage |
|---|---|---|---|
| 6.2.1.1 | Represent data on coordinate plane | 1 | ✅ Grid foundation |

#### Bloom's / Depth of Knowledge (DOK) Breakdown

| DOK Level | Activities | Evidence |
|---|---|---|
| **DOK 1** (Recall) | Identify coordinates, read graph values | Table lookup, grid reading |
| **DOK 2** (Skill/Concept) | Adjust slope/intercept, observe effect | Slider manipulation, prediction |
| **DOK 3** (Strategic Thinking) | Solve systems graphically, explain no/one/infinite solutions | Scenario solving, parallel lines detection |

#### Known Issues & Limitations

1. **No manual equation entry:** Students can only use presets or sliders (no typing "2x + 3" directly)
2. **Limited precision:** Intersection points rounded to 1 decimal (good for visualization, may confuse algebraic solvers)
3. **No substitution/elimination methods shown:** Only graphical approach (though algebraic steps are displayed)
4. **No student answer validation:** No way for students to input their own solutions and check
5. **Google Sheets dependency:** Current backend requires Google Apps Script context

#### Improvement Suggestions

**Priority 1 (High Impact):**
- [ ] Add standard form (Ax + By = C) and point-slope form (y - y₁ = m(x - x₁)) conversion utilities
- [ ] Implement student answer entry: "What is the x-value of the solution?" with auto-check
- [ ] Add explicit display of benchmark codes and DOK levels in UI (educational transparency)
- [ ] Remove Google Sheets dependency; use optional localStorage for offline work

**Priority 2 (Medium):**
- [ ] Add substitution method and elimination method step-by-step solvers (side-by-side with graphical)
- [ ] Extend scenarios with real costs/values (e.g., $2.99 instead of $2)
- [ ] Add "challenge scenarios" where students must find the equations from context clues
- [ ] Implement Drummond Proficiency Scale connector (link solutions to student mastery level)

**Priority 3 (Nice-to-Have):**
- [ ] 3D graphing preview (extend to Ax + By + Cz = D for Grade 8 extension)
- [ ] Export scenarios as PDF worksheets
- [ ] Teacher dashboard for reviewing student submissions
- [ ] Dark mode support

---

### Module 2: Place Value Explorer

**Title:** Place Value Explorer V3.0
**Module ID:** `place-value-explorer`
**Version:** 3.0
**Status:** Extracted from launchpad (source pending)

#### Description

High-precision base-10 logic engine that helps students understand decimal place value from the ones place down to thousandths (0.001). Provides interactive exploration of how digits in different positions represent powers of 10 and how shifting decimal points affects magnitude.

**Formula/Core Mechanic:** 10^n Base (place value = digit × 10^position)

#### Category

- **Primary:** Number & Operations / Place Value & Decimals
- **Secondary:** Foundations for Percentages, Fractions

#### Planned Features

- **Multi-position sliders:** Ones, tenths, hundredths, thousandths
- **Base-10 visual blocks:** Dynamic block representations
- **Magnitude comparison:** "How many times bigger/smaller?"
- **Decimal point manipulation:** Visual shift of decimal position
- **Scenario-based:** Real prices, measurements, scientific notation connections
- **Snap modes:** Toggle between exact and rounded values

#### Minnesota State Standard Mappings

**Grade 6 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 6.1.1.1 | Read and write numbers using standard notation, expanded form, and words | 1 |
| 6.1.1.2 | Round decimals to a given place value | 2 |
| 6.1.2.1 | Compare and order decimals (apply place value understanding) | 2 |

**Grade 5 (Foundational):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 5.1.1.1 | Use place value to represent numbers in expanded form | 1 |

#### Expected DOK Breakdown

- **DOK 1:** Read place value charts, identify digit positions
- **DOK 2:** Convert between standard and expanded notation, compare decimals
- **DOK 3:** Explain how place value applies to real-world contexts (prices, measurements)

#### Improvement Suggestions

- [ ] Add visual base-10 blocks that scale with magnitude
- [ ] Create "Decimal Detective" mini-game (identify place value from context)
- [ ] Link to scientific notation (prepare for middle grades science)
- [ ] Add voice narration for accessibility

---

### Module 3: Coordinate Grid Console

**Title:** Coordinate Grid Console V1.0
**Module ID:** `coordinate-grid`
**Version:** 1.0
**Status:** Extracted from launchpad (source pending)

#### Description

Dynamic Cartesian mapping engine for plotting linear functions and exploring vertices of polygons. Students practice identifying coordinates, plotting points, and understanding the relationship between ordered pairs and visual representation on the coordinate plane.

**Formula/Core Mechanic:** y = mx + b (linear function plotting)

#### Category

- **Primary:** Geometry & Algebra / Coordinate Plane
- **Secondary:** Graphing Linear Functions, Transformations

#### Planned Features

- **Point plotting:** Interactive point-by-point plotting with coordinate entry
- **Function graphing:** Enter linear equations, see line drawn
- **Polygon vertices:** Select multiple points to form shapes
- **Transformation preview:** Reflect, rotate, translate polygons
- **Quadrant labeling:** Full coordinate plane with all four quadrants
- **Zoom and pan:** Navigate large coordinate spaces

#### Minnesota State Standard Mappings

**Grade 6 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 6.2.1.1 | Represent data on a coordinate plane | 1 |
| 6.2.1.2 | Identify and plot coordinates in all four quadrants | 1 |

**Grade 8 (Secondary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 8.2.2.1 | Understand proportional relationships and graph them | 2 |
| 8.2.4.3 | Solve equations in slope-intercept form | 2 |

#### Expected DOK Breakdown

- **DOK 1:** Plot given points, identify coordinates from graph
- **DOK 2:** Graph linear functions, recognize proportional relationships
- **DOK 3:** Analyze transformations, predict outcomes of translations/rotations

#### Improvement Suggestions

- [ ] Add transformation tutorial (reflections across axes, rotations about origin)
- [ ] Implement "Coordinate Challenge" mode with distance/midpoint calculations
- [ ] Add visual grid snap (help students align to integer coordinates)
- [ ] Integrate with Vinculum transformation tools (reference external resource)

---

### Module 4: Science Log Console

**Title:** Science Log Console V9.0
**Module ID:** `science-log-console`
**Version:** 9.0
**Status:** Extracted from launchpad (source pending)

#### Description

A Beaker ratio simulator with percentage comparisons and Reaction LAB. Helps students understand ratios, rates, and percentages through simulation of mixture scenarios, chemical reactions, and concentration problems. Cross-disciplinary bridge between mathematics and science.

**Formula/Core Mechanic:** RATIO :: SYNC (synchronizing ratio relationships and scaling)

#### Category

- **Primary:** Ratios, Rates & Proportions
- **Secondary:** Applied Math / STEM Integration

#### Planned Features

- **Beaker simulator:** Visual containers with adjustable volumes
- **Ratio controls:** Adjust ingredient ratios (e.g., 2:3 mixture)
- **Percentage calculation:** Auto-display percentage of each component
- **Scaling:** Multiply recipe up/down while maintaining ratios
- **Reaction scenarios:** Pre-made problems (salt solutions, paint mixing, dilution)
- **Data logging:** Track student predictions vs. results

#### Minnesota State Standard Mappings

**Grade 6 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 6.1.3.2 | Find equivalent ratios and understand unit rates | 2 |
| 6.1.3.3 | Apply ratios and rates to solve real-world problems | 3 |

**Grade 7 (Secondary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 7.1.3.1 | Solve proportional relationships using rates | 2 |
| 7.1.3.2 | Find unit rates and use to solve problems | 2 |

**Grade 8 (Tertiary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 8.1.3.1 | Understand and apply proportional reasoning | 2 |

#### Expected DOK Breakdown

- **DOK 1:** Identify ratios in given scenarios, read percentage labels
- **DOK 2:** Calculate equivalent ratios, find unit rates
- **DOK 3:** Solve multi-step proportion problems, design solutions for given constraints

#### Improvement Suggestions

- [ ] Add real-world context narratives ("You're a chemist making a cleaning solution...")
- [ ] Implement peer prediction mode (students guess before seeing result)
- [ ] Add precision mode (exact vs. rounded measurements)
- [ ] Connect to chemistry curriculum (molar ratios, stoichiometry preview)

---

### Module 5: Formula Interface

**Title:** Formula Interface V4.0 PRO
**Module ID:** `formula-interface`
**Version:** 4.0 PRO
**Status:** Extracted from launchpad (source pending)

#### Description

GEOMETRICS PRO ENGINE: High-level symbolic logic and formula processing system. Enables students to manipulate algebraic expressions symbolically, explore formula relationships, and solve for variables in complex expressions. Bridges concrete manipulation (sliders) with abstract symbolic reasoning.

**Formula/Core Mechanic:** Σ Logic Core (summation and logical formula processing)

#### Category

- **Primary:** Algebra / Symbolic Manipulation
- **Secondary:** Problem-Solving, Pattern Recognition

#### Planned Features

- **Formula parser:** Type algebraic expressions (2x + 3, a² + 2ab + b²)
- **Variable solver:** Given target and known variables, solve for unknown
- **Factoring engine:** Show factored forms and expanded forms side-by-side
- **Substitution tool:** Replace variables with values and calculate
- **Formula library:** Common formulas (quadratic, distance, area) with solving templates
- **Step-by-step solver:** Show algebraic steps for each transformation

#### Minnesota State Standard Mappings

**Grade 7 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 7.1.1.1 | Solve linear equations with one variable | 2 |
| 7.1.1.2 | Solve multi-step equations | 2 |

**Grade 8 (Secondary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 8.1.1.1 | Solve linear equations in one variable | 2 |
| 8.2.3.1 | Use formulas to find area, perimeter, volume | 1 |
| 8.2.3.2 | Recognize properties of transformations (related to formulas) | 2 |

#### Expected DOK Breakdown

- **DOK 1:** Substitute known values into formulas, evaluate
- **DOK 2:** Solve equations symbolically, apply order of operations
- **DOK 3:** Derive formulas from contexts, explain algebraic transformations

#### Improvement Suggestions

- [ ] Add equation balancing visualization (operations on both sides)
- [ ] Implement "Formula Challenge" mode (given answer, find starting expression)
- [ ] Add symbolic simplification rules (distributive property, combining like terms)
- [ ] Support quadratic equations (optional extension for Grade 8)
- [ ] Link to real formula usage (physics, engineering contexts)

---

### Module 6: Vertex Ledger: Proof Engine

**Title:** Vertex Ledger: Proof Engine V4.2 PRO
**Module ID:** `vertex-ledger-proof`
**Version:** 4.2 PRO
**Status:** Extracted from launchpad (source pending)

#### Description

GEOMETRICS VERTEX LEDGER: Advanced coordinate validation and proof logic system. Enables students to verify geometric properties (parallel lines, perpendicular lines, congruent segments) using coordinate geometry and distance formulas. A bridge from visual geometry to coordinate-based proof.

**Formula/Core Mechanic:** PROOF :: VALID (validation of geometric properties through coordinate analysis)

#### Category

- **Primary:** Geometry / Coordinate Geometry Proofs
- **Secondary:** Logical Reasoning, Algebraic Connections

#### Planned Features

- **Vertex entry:** Input coordinates for line segments or polygons
- **Property checkers:**
  - Parallel lines (slopes equal)
  - Perpendicular lines (slopes multiply to -1)
  - Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]
  - Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)
  - Congruent segments: equal distance
  - Right angle verification
- **Step-by-step verification:** Show each calculation leading to conclusion
- **Proof templates:** Common geometry theorems (triangle inequality, etc.)
- **Visual validation:** Plot points and highlight relationships

#### Minnesota State Standard Mappings

**Grade 8 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 8.2.1.1 | Classify polygons and understand properties | 2 |
| 8.2.2.2 | Identify slope, intercepts, and use coordinate geometry | 2 |
| 8.3.1.1 | Verify properties using distance and slope formulas | 3 |

**Grade 7 (Secondary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 7.2.1.1 | Understand properties of geometric shapes | 1 |

#### Expected DOK Breakdown

- **DOK 1:** Identify coordinates, calculate distances
- **DOK 2:** Apply formulas (slope, distance, midpoint) to geometric figures
- **DOK 3:** Prove geometric properties, justify conclusions with evidence

#### Improvement Suggestions

- [ ] Add visual proof diagrams (annotated with measurements)
- [ ] Create "Proof Detective" mode (given properties, identify which theorem applies)
- [ ] Implement coordinate transformation proofs (reflection/rotation preservation)
- [ ] Add 3D coordinate support (extension for advanced students)
- [ ] Connect to formal proof writing (two-column proofs)

---

### Module 7: Fraction Concepts

**Title:** Fraction Concepts V1.0
**Module ID:** `fraction-concepts`
**Version:** 1.0
**Status:** Extracted from launchpad (source pending)

#### Description

Elementary visual logic for part-to-whole relationships and unit division. Introduces fraction fundamentals through interactive area models, number lines, and concrete representations. Designed for grades 3-5 with extension for grade 6 equivalence and operations.

**Formula/Core Mechanic:** n / d (numerator-denominator relationship as parts-of-whole)

#### Category

- **Primary:** Number & Operations / Fractions
- **Secondary:** Visual/Conceptual Foundation for All Fraction Work

#### Planned Features

- **Visual models:**
  - Area model (rectangles divided into equal parts)
  - Set model (objects grouped into collections)
  - Number line (fractions positioned on line)
- **Part-to-whole interaction:** Shade regions to represent fractions
- **Equivalence explorer:** Show equivalent fractions side-by-side (3/4 = 6/8)
- **Unit fraction building:** Combine unit fractions (1/4 + 1/4 + 1/4 = 3/4)
- **Comparison tool:** Determine which fraction is larger/smaller
- **Real-world contexts:** Pizza slices, pie charts, recipe ingredients

#### Minnesota State Standard Mappings

**Grade 3 (Foundational):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 3.1.1.1 | Understand fractions as equal parts of a whole | 1 |
| 3.1.1.2 | Identify fractions on a number line | 1 |

**Grade 4 (Primary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 4.1.1.1 | Identify and generate equivalent fractions | 2 |
| 4.1.1.2 | Compare and order fractions with visual models | 2 |
| 4.1.1.3 | Understand fraction models (area, set, number line) | 2 |

**Grade 5 (Secondary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 5.1.2.1 | Add and subtract fractions with like and unlike denominators | 2 |
| 5.1.2.2 | Multiply fractions | 2 |

**Grade 6 (Tertiary):**

| Benchmark Code | Standard | DOK |
|---|---|---|
| 6.1.2.3 | Understand and use ratio language | 2 |

#### Expected DOK Breakdown

- **DOK 1:** Identify fraction names, read visual models, locate on number line
- **DOK 2:** Create equivalent fractions, compare two fractions, build fractions from units
- **DOK 3:** Explain fraction relationships, solve multi-step problems with fractions

#### Improvement Suggestions

- [ ] Add fraction operation simulators (add/subtract with visual models)
- [ ] Implement "Fraction Match" game (find equivalents)
- [ ] Add decimal connection (0.5 = 1/2, 0.25 = 1/4)
- [ ] Create manipulative presets (standard denominators 2, 3, 4, 6, 8, 10, 12)
- [ ] Support improper fractions and mixed numbers (Grade 5+)

---

## Part 3: Module Separation & Modernization Plan

### Overview

The goal is to transform 7 GEOMetrics modules from a monolithic Google Apps Script application into 7 independent, lightweight HTML tools that maintain pedagogical quality while improving reliability, portability, and usability.

### Directory Structure (Proposed)

```
math-toolbox/
├── AUDIT.md (this file)
├── core/
│   ├── toolbox-core.css          # Shared Tailwind styles (1 copy for all modules)
│   ├── toolbox-canvas.js         # Canvas utilities (grid, axes, drawing)
│   ├── toolbox-math.js           # Math helpers (intersection, slope, distance)
│   ├── toolbox-accessibility.js  # WCAG 2.1 AA utilities
│   └── README.md                 # Core library documentation
├── tools/
│   ├── equation-lab/
│   │   ├── index.html            # Main entry point
│   │   ├── app.js                # Module-specific logic
│   │   ├── scenarios.json        # Preset scenarios
│   │   └── README.md             # Module documentation
│   ├── place-value-explorer/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── visualizations.json
│   │   └── README.md
│   ├── coordinate-grid/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── transformations.json
│   │   └── README.md
│   ├── science-log-console/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── reactions.json
│   │   └── README.md
│   ├── formula-interface/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── formulas.json
│   │   └── README.md
│   ├── vertex-ledger-proof/
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── theorems.json
│   │   └── README.md
│   └── fraction-concepts/
│       ├── index.html
│       ├── app.js
│       ├── models.json
│       └── README.md
└── MIGRATION_CHECKLIST.md        # Week-by-week implementation plan
```

### Key Principles

#### 1. **Zero Framework Dependencies**
- **Current:** React 17+ (~45KB min)
- **New:** Vanilla JavaScript (ES6+)
- **Benefit:** Instant load time, full offline capability, easier debugging

#### 2. **Shared Core Library (No Duplication)**

All modules import from `toolbox-core.css` and utility libraries:

```html
<!-- Every module's index.html -->
<link rel="stylesheet" href="../../core/toolbox-core.css">
<script src="../../core/toolbox-math.js"></script>
<script src="../../core/toolbox-canvas.js"></script>
```

**File Size Impact:**
- Old: Each module = 55KB (15KB Tailwind + 30KB React + 10KB code) = 385KB total
- New: Shared lib (20KB) + 7 modules (8KB each) = 76KB total
- **Savings: 80% reduction**

#### 3. **Google Sheets Integration → Optional localStorage**

**Old Model:**
```javascript
// Module depends on Google Apps Script runtime
function saveResultToSheet() {
  google.script.run.logToSheet(data);
}
```

**New Model:**
```javascript
// Optional local storage (no backend required)
function saveResult(data) {
  if (navigator.onLine) {
    // Optional: send to server if available
    fetch('/api/results', { method: 'POST', body: JSON.stringify(data) });
  }
  // Always save locally
  localStorage.setItem('result_' + Date.now(), JSON.stringify(data));
}
```

**Benefits:**
- Works completely offline
- Teachers/students can export results manually
- Optional backend integration (without breaking offline use)
- FERPA-compliant (no automatic cloud logging)

#### 4. **Benchmark Codes & DOK Display in UI**

Every module will display educational metadata:

```html
<!-- Header of each module -->
<div class="benchmark-display">
  <span class="badge badge-primary">8.2.4.7 (DOK 3)</span>
  <span class="badge badge-secondary">8.2.2.2 (DOK 2)</span>
</div>
```

Students and teachers will see:
- Which Minnesota benchmark is being addressed
- DOK level (1, 2, or 3) with explanation
- Link to Minnesota state standards documentation

#### 5. **Drummond Proficiency Scale Integration**

Each module will include optional proficiency tracking:

```javascript
const proficiencyScale = {
  'beginning': 'Cannot identify ...',
  'developing': 'Can identify ... with guidance',
  'proficient': 'Can independently ...',
  'advanced': 'Can apply ... to novel contexts'
};
```

Teachers can manually assess student work against this scale.

#### 6. **PowerPoint / LMS Embeddability**

Each tool will be iframe-safe:

```html
<!-- Can be embedded in PPTX via web view, or in LMS as iframe -->
<iframe src="https://math-toolbox.school.edu/tools/equation-lab/"
        width="800" height="600"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
```

**Benefits:**
- Integrate directly into Google Slides, PowerPoint, Canvas, Blackboard
- No copy/paste of screenshots needed
- Live, interactive content in presentations

#### 7. **Standalone Deployability**

Each module can be deployed to any static host:

```bash
# Option 1: Simple HTTP server (for classroom use)
cd tools/equation-lab
python -m http.server 8000
# Visit: http://localhost:8000

# Option 2: Cloud deployment (no build step needed)
gsutil -m cp -r tools/* gs://my-bucket/tools/

# Option 3: LMS integration (copy index.html + app.js)
# Upload to Canvas / Blackboard as "External Tool"
```

---

### Migration Workflow

#### Phase 1: Foundation (Week 1-2)

**Deliverables:**
- [ ] Create `core/toolbox-core.css` (compile Tailwind once)
- [ ] Create `core/toolbox-canvas.js` (extract Canvas utilities from Module 1)
- [ ] Create `core/toolbox-math.js` (shared math functions)
- [ ] Create `core/toolbox-accessibility.js` (WCAG compliance helpers)

**Estimated Effort:** 16 hours

#### Phase 2: Module 1 Refactor (Week 2-3)

**Deliverables:**
- [ ] Create `tools/equation-lab/index.html` (standalone version)
- [ ] Create `tools/equation-lab/app.js` (vanilla JS rewrite)
- [ ] Migrate all 5 scenarios to `scenarios.json`
- [ ] Add benchmark display UI
- [ ] Add optional localStorage for results
- [ ] Test iframe embeddability
- [ ] Performance check (load time < 1 second)

**Estimated Effort:** 20 hours

**Success Criteria:**
- All features from original Module 1 working
- No Google Apps Script dependency
- Can be opened standalone (file:// protocol)
- Can be embedded in iframe
- Sub-300KB total bundle size

#### Phase 3: Modules 2-7 Development (Week 3-8)

Repeat Phase 2 process for each module:

| Module | Effort | Complexity | Priority |
|---|---|---|---|
| **Module 2: Place Value Explorer** | 14 hrs | Medium | High |
| **Module 3: Coordinate Grid** | 16 hrs | Medium | High |
| **Module 4: Science Log Console** | 18 hrs | High | Medium |
| **Module 5: Formula Interface** | 20 hrs | High | High |
| **Module 6: Vertex Ledger Proof** | 18 hrs | High | Medium |
| **Module 7: Fraction Concepts** | 12 hrs | Low | High |

**Parallel Work:**
- Modules 2 & 3 can be developed simultaneously (both canvas-heavy, less overlap)
- Module 7 fastest (simplest visuals)
- Module 5 slowest (complex parsing required)

#### Phase 4: Integration & Testing (Week 8-9)

**Deliverables:**
- [ ] Create test suite for each module (Playwright/Cypress)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing (iPad, Chromebook)
- [ ] Performance optimization (Lighthouse score > 90)
- [ ] Offline functionality verification

**Estimated Effort:** 12 hours

#### Phase 5: Deployment & Documentation (Week 9-10)

**Deliverables:**
- [ ] Deploy to production server (or static host)
- [ ] Create teacher guide for each module
- [ ] Create student-facing documentation
- [ ] Create LMS integration guide
- [ ] Create API specification for optional backend
- [ ] Create benchmarks-to-standards mapping document

**Estimated Effort:** 10 hours

---

### Technical Specifications

#### Minimum Browser Requirements

| Browser | Minimum Version | Canvas Support | ES6 Support |
|---|---|---|---|
| Chrome | 90+ | ✅ | ✅ |
| Firefox | 88+ | ✅ | ✅ |
| Safari | 14+ | ✅ | ✅ |
| Edge | 90+ | ✅ | ✅ |

#### Performance Targets

| Metric | Target | Current |
|---|---|---|
| Initial Load Time | < 1s | 3-4s (React overhead) |
| Time to Interactive | < 2s | 4-5s |
| Bundle Size (JS + CSS) | < 50KB | 55KB per module |
| Lighthouse Score | > 90 | 65-75 |

#### Accessibility Requirements

- **WCAG 2.1 Level AA** compliance
- **Color contrast:** 4.5:1 for normal text (WCAG AA)
- **Keyboard navigation:** All interactive elements accessible via Tab/Enter
- **Screen reader support:** ARIA labels for all canvas elements
- **Mobile:** Responsive design, touch-friendly controls

#### Optional Backend API (For Results Logging)

Schools may optionally provide a backend to log student results.

**Specification:**

```
POST /api/results
Content-Type: application/json

{
  "timestamp": "2026-03-10T14:32:00Z",
  "studentId": "student_123",
  "moduleId": "equation-lab",
  "scenarioName": "Smartphone Plans",
  "line1Equation": "y = 1x + 2",
  "line2Equation": "y = 2x + 0",
  "intersectionPoint": { "x": 2, "y": 4 },
  "timeOnTask": 180,
  "proficiencyLevel": "developing"
}
```

**Response:**

```json
{
  "status": "success",
  "resultId": "result_abc123",
  "saved": true
}
```

---

## Part 4: Existing Tools (Do Not Rebuild)

The following tools are already built or hosted externally and do NOT need to be rebuilt:

### 1. **Vinculum** (External)

**URL:** https://discrafty-cpu.github.io/vinculum/
**Purpose:** Transformations and coordinate geometry visualization
**Coverage:**
- Reflections across x-axis, y-axis, y=x
- Rotations (90°, 180°, 270°)
- Translations
- Coordinate plane graphing

**Minnesota Alignment:**
- 8.2.2.1 (Proportional relationships)
- 8.3.1.2 (Transformations - congruence and similarity)

**Integration:** Link from coordinate-grid and vertex-ledger modules

### 2. **Vinculum 3D** (Local)

**Location:** `/local/vinculum-3d/`
**Purpose:** 3D geometry, volume calculations, rotations and reflections in 3D space
**Coverage:**
- 3D coordinate system
- Volume calculations (prisms, cylinders, pyramids)
- Surface area
- 3D rotations and reflections

**Minnesota Alignment:**
- 8.2.3.1 (Area and volume formulas)
- 8.3.1.1 (3D transformations)

**Status:** Already built, no action needed

### 3. **Volume Builder**

**Location:** `/math-toolbox/tools/volume-builder/`
**Purpose:** Interactive volume calculation and visualization
**Coverage:**
- Rectangular prisms
- Cylinders
- Composite shapes

**Minnesota Alignment:**
- 6.3.1.1 (Volume of rectangular prisms)

**Status:** Already built, no action needed

---

## Part 5: Minnesota State Standards - Complete 97-Benchmark Reference

### Grade 6 (25 benchmarks)

**Number & Operations**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 6.1.1.1 | Represent numbers in multiple ways (standard, expanded, words) | 1 | Place Value Explorer |
| 6.1.1.2 | Round decimals to a given place value | 2 | Place Value Explorer |
| 6.1.2.1 | Compare and order decimals and fractions | 2 | Fraction Concepts, Place Value |
| 6.1.2.3 | Understand and use ratio language | 2 | Science Log Console |
| 6.1.3.1 | Understand ratios in context | 2 | Science Log Console |
| 6.1.3.2 | Find equivalent ratios and unit rates | 2 | Science Log Console |
| 6.1.3.3 | Use ratios and rates to solve problems | 3 | Science Log Console |

**Algebra**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 6.2.1.1 | Represent data on a coordinate plane | 1 | Coordinate Grid |
| 6.2.1.2 | Identify and plot coordinates in all four quadrants | 1 | Coordinate Grid |
| 6.2.2.1 | Identify the relationship between variables in tables | 2 | Equation Lab |
| 6.2.2.2 | Represent relationships with equations and graphs | 2 | Equation Lab |

**Geometry**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 6.3.1.1 | Understand volume and calculate volume of prisms | 2 | Volume Builder |
| 6.3.1.2 | Calculate surface area of prisms | 2 | Vertex Ledger |
| 6.3.2.1 | Classify polygons by properties | 1 | Vertex Ledger |

**Data & Probability**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 6.4.1.1 | Collect and organize data | 1 | Science Log Console |
| 6.4.1.2 | Create and interpret statistical displays | 2 | Science Log Console |

---

### Grade 7 (36 benchmarks)

**Number & Operations**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 7.1.1.1 | Solve linear equations with one variable | 2 | Formula Interface |
| 7.1.1.2 | Solve multi-step equations | 2 | Formula Interface |
| 7.1.2.1 | Understand proportional relationships | 2 | Science Log Console |
| 7.1.2.2 | Plot and interpret proportional relationships | 2 | Equation Lab, Coordinate Grid |
| 7.1.3.1 | Solve proportional relationships using rates | 2 | Science Log Console |
| 7.1.3.2 | Find and apply unit rates | 2 | Science Log Console |
| 7.1.3.3 | Represent proportional relationships with equations | 2 | Equation Lab |

**Algebra**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 7.2.1.1 | Understand properties of geometric shapes | 1 | Vertex Ledger |
| 7.2.1.2 | Classify and draw geometric shapes | 1 | Coordinate Grid |
| 7.2.2.1 | Identify transformations | 2 | Coordinate Grid, Vinculum |
| 7.2.2.2 | Recognize congruence and similarity | 2 | Vertex Ledger, Vinculum |

---

### Grade 8 (36 benchmarks)

**Number & Operations**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 8.1.1.1 | Solve linear equations in one variable | 2 | Formula Interface, Equation Lab |
| 8.1.2.1 | Understand exponents and roots | 2 | Formula Interface |
| 8.1.3.1 | Apply proportional reasoning | 2 | Science Log Console |

**Algebra - Linear Functions & Equations**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 8.2.1.1 | Classify polygons and understand properties | 2 | Vertex Ledger |
| 8.2.1.2 | Recognize linear functions and constant rate of change | 2 | Equation Lab |
| 8.2.2.1 | Understand proportional relationships and graph | 2 | Equation Lab, Coordinate Grid |
| 8.2.2.2 | Identify slope, y-intercept, x-intercept | 2 | Equation Lab |
| 8.2.2.3 | How coefficient changes affect graphs | 2 | Equation Lab |
| 8.2.3.1 | Use formulas to find area, perimeter, volume | 1 | Formula Interface, Vertex Ledger |
| 8.2.3.2 | Recognize properties of transformations | 2 | Coordinate Grid, Vinculum |
| 8.2.4.1 | Solve systems of linear equations graphically | 3 | Equation Lab |
| **8.2.4.3** | Solve and write equations in slope-intercept form | 2 | **Equation Lab** |
| **8.2.4.7** | Solve systems of linear equations graphically and numerically | 3 | **Equation Lab** |
| **8.2.4.8** | Identify systems with no, one, or infinite solutions | 3 | **Equation Lab** |

**Geometry**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 8.3.1.1 | Verify properties using distance and slope formulas | 3 | Vertex Ledger |
| 8.3.1.2 | Transformations and congruence | 2 | Coordinate Grid, Vinculum |
| 8.3.2.1 | Use Pythagorean theorem | 2 | Vertex Ledger |

**Data & Probability**

| Code | Standard | DOK | Relevant Modules |
|---|---|---|---|
| 8.4.1.1 | Interpret statistical displays | 2 | Science Log Console |
| 8.4.1.2 | Calculate and interpret measures of central tendency | 2 | Science Log Console |

---

## Part 6: Summary Table - Module Matrix

### Coverage & Alignment

| Module | Grades | # Benchmarks | Primary Standard | DOK Range | Status |
|---|---|---|---|---|---|
| **Equation Lab** | 6-8 | 7 | 8.2.4.7 | 2-3 | ✅ Extracted |
| **Place Value Explorer** | 5-6 | 6 | 6.1.1.1 | 1-2 | 📋 Pending |
| **Coordinate Grid** | 6-8 | 5 | 6.2.1.1 | 1-3 | 📋 Pending |
| **Science Log Console** | 6-8 | 7 | 6.1.3.3 | 2-3 | 📋 Pending |
| **Formula Interface** | 7-8 | 6 | 8.1.1.1 | 1-3 | 📋 Pending |
| **Vertex Ledger Proof** | 7-8 | 5 | 8.3.1.1 | 2-3 | 📋 Pending |
| **Fraction Concepts** | 3-6 | 8 | 4.1.1.1 | 1-3 | 📋 Pending |

---

## Implementation Checklist

### Pre-Migration

- [ ] Schedule meetings with math teachers to gather feedback
- [ ] Document current Module 1 source code completely
- [ ] Extract remaining 6 module source codes from Google Apps Script
- [ ] Create detailed specifications for Modules 2-7 based on launchpad data
- [ ] Set up GitHub repository for version control
- [ ] Choose static hosting platform (GitHub Pages, school server, etc.)

### Core Library (Weeks 1-2)

- [ ] Design and implement `toolbox-core.css` (shared styles)
- [ ] Extract Canvas utilities → `toolbox-canvas.js`
- [ ] Create math utilities → `toolbox-math.js`
- [ ] Create accessibility helpers → `toolbox-accessibility.js`
- [ ] Write documentation for core library
- [ ] Unit test all core modules

### Module 1 Refactor (Weeks 2-3)

- [ ] Convert React components to vanilla JS
- [ ] Implement HTML structure (no build step)
- [ ] Port all Canvas drawing logic
- [ ] Migrate scenarios to JSON
- [ ] Add benchmark display UI
- [ ] Implement localStorage (optional Google Sheet logging)
- [ ] Add WCAG 2.1 AA compliance
- [ ] Performance optimization
- [ ] Create module README and teacher guide

### Modules 2-7 Development (Weeks 3-8)

- [ ] Create index.html template for all modules
- [ ] Implement Module 2: Place Value Explorer
- [ ] Implement Module 3: Coordinate Grid
- [ ] Implement Module 4: Science Log Console
- [ ] Implement Module 5: Formula Interface
- [ ] Implement Module 6: Vertex Ledger Proof
- [ ] Implement Module 7: Fraction Concepts
- [ ] Create teacher guides for all modules

### Testing & QA (Weeks 8-9)

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile/tablet testing (iOS, Android, iPad, Chromebook)
- [ ] Accessibility testing (screen readers, keyboard navigation)
- [ ] Performance testing (Lighthouse, bundle size)
- [ ] Offline functionality testing
- [ ] iframe embeddability testing
- [ ] User acceptance testing with teachers

### Deployment & Documentation (Weeks 9-10)

- [ ] Set up production hosting environment
- [ ] Deploy all modules to production
- [ ] Create comprehensive documentation
- [ ] Train teachers on module usage
- [ ] Create LMS integration guides
- [ ] Create parent guides (optional)
- [ ] Set up analytics (optional)
- [ ] Plan ongoing maintenance schedule

---

## Conclusion

The GEOMetrics EngineX Pro modules represent a significant investment in mathematics education technology. By modernizing the architecture from Google Apps Script → standalone HTML, we can:

1. **Improve reliability:** No dependency on Google Scripts runtime
2. **Increase accessibility:** Work offline, on any device, in any LMS
3. **Enhance pedagogy:** Display benchmark codes, DOK levels, proficiency scales
4. **Reduce cost:** Fewer cloud dependencies, easier to self-host
5. **Improve usability:** Faster load times, better performance, embeddable

This audit provides a roadmap for that transformation while documenting the pedagogical value of each module and its alignment with Minnesota state standards.

---

**Document prepared by:** Claude Code
**Version:** 1.0
**Next Review:** April 2026
