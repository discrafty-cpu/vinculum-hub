# VINCULUM Hub — Improvement, Modularity & Benchmark Report

**Date:** March 18, 2026
**Platform:** VINCULUM Math Solutions Hub v2
**Scope:** 273 interactive tools | K through Pre-Calculus | 18 shared modules

---

## 1. Current Architecture Overview

### 1.1 Module System (18 modules)

| Layer | Module | Purpose |
|-------|--------|---------|
| **Core** | `vinculum-core.js` | Theme, URL params, Read-to-Me, keyboard shortcuts, teacher panel |
| | `vinculum-core.css` | Single-source theming (4 themes: Dark, Bright, Red Laser, Custom) |
| **Data** | `vinculum-data.js` | Session persistence, adaptive engine, spaced retrieval, misconception log |
| | `vinculum-identity.js` | User profile, avatar, grade, theme prefs, achievements, favorites |
| | `vinculum-dashboard.js` | Read-only aggregation (student summary, strand progress, export) |
| **Pedagogy** | `vinculum-adaptive.js` | Shared difficulty adjustment (85% up / 40% down productive struggle) |
| | `vinculum-adaptive-hook.js` | Auto-wire adaptive engine via MutationObserver on `#feedback` |
| | `vinculum-corrective.js` | K-grade multi-modal corrective feedback (6s display, read-aloud) |
| | `vinculum-feedback.js` | Centralized `VinculumFB.show()` / `celebrate()` API |
| | `vinculum-3reads.js` | 3-Read protocol for word problems (WWC Rec 5) |
| | `vinculum-remediation.js` | Multi-step walkthrough for incorrect answers |
| **Content** | `vinculum-stories.js` | Story engine (15 K-tools x 12+ stories, speech callbacks) |
| | `vinculum-guide.js` | Auto-inject instructional side panel (How to Use, Standards, Key Concept) |
| | `vinculum-graph.js` | HiDPI canvas graph renderer (gridlines, axes, data points, glow) |
| | `vinculum-bar-model.js` | CRA-based bar model visualization for proportional reasoning |
| **Input** | `vinculum-input.js` | Context-aware input (bubbles, keypad, slider, MC, toggle) |
| | `vinculum-layout.js` | Non-invasive layout enhancements (story relocation, fullscreen) |
| **Cultural** | `vinculum-indigenous.js` | Indigenous Math integration (nation-specific, present-tense) |
| | `indigenous-context-panel.js` | Drop-in UI panel for Indigenous contexts |

### 1.2 Tool Distribution (273 tools)

| Band | Grades | Tools | % |
|------|--------|-------|---|
| K-2 | K (33), 1 (30), 2 (39) | 102 | 37% |
| 3-5 | 3 (24), 4 (24), 5 (25) | 73 | 27% |
| 6-8 | 7 (16), 8 (15) | 31 | 11% |
| HS | ALG1 (11), ALG2 (8), GEOM (11), PREC (8) | 38 | 14% |
| Games | 2 | 2 | 1% |
| **Gap** | Grade 6 | 0 | — |

### 1.3 Module Loading Patterns

**K-2 tools** load all 11 core modules (input, core, data, adaptive-hook, 3reads, stories, feedback, guide, identity, indigenous, dashboard).

**Upper-grade tools** (8+, HS) load selectively — typically 5 modules (feedback, guide, indigenous, indigenous-context-panel, input), omitting K-specific pedagogy (corrective, 3reads, stories).

**Premium apps** (Dissection Engine, Integral Codex, Pi Codex) load 4 modules (core, data, identity, dashboard).

---

## 2. Modularity Improvements

### 2.1 Lazy Module Loading

**Problem:** All K-2 tools load 11 modules synchronously, adding ~200KB of JavaScript regardless of whether the student uses stories, 3-reads, or adaptive difficulty in that session.

**Solution:** Module loader with dependency declaration.

```javascript
// Each tool declares what it needs
VinculumLoader.require(['core', 'input', 'feedback', 'adaptive'], function() {
  // Tool initializes after dependencies resolve
  initTool();
});
```

**Impact:** Reduce initial payload by 40-60% for tools that don't use stories/3reads/indigenous.

### 2.2 Grade-Band Module Profiles

Define standard module bundles per grade band:

| Profile | Modules Included | Target |
|---------|-----------------|--------|
| `k2-full` | All 11 + corrective | K-2 tools (full scaffold) |
| `k2-lite` | core, input, feedback, data, identity | K-2 practice-only tools |
| `35-standard` | core, input, feedback, data, adaptive, guide, identity | 3-5 tools |
| `68-standard` | core, input, feedback, data, guide, identity, indigenous | 6-8 tools |
| `hs-minimal` | core, data, identity, dashboard | HS premium apps |
| `game` | core, identity | Game-only (minimal tracking) |

### 2.3 Event Bus Decoupling

**Problem:** `vinculum-adaptive-hook.js` depends on a specific `#feedback` DOM element. If a tool uses a different feedback pattern, the hook silently fails.

**Solution:** Replace DOM coupling with an event bus:

```javascript
// Tool emits events
VinculumBus.emit('answer:correct', { tool: 'add-subtract', difficulty: 'emergent' });
VinculumBus.emit('answer:incorrect', { misconception: 'off-by-one', got: 5, expected: 6 });

// Modules subscribe independently
// vinculum-adaptive-hook.js
VinculumBus.on('answer:correct', adjustDifficulty);
// vinculum-data.js
VinculumBus.on('answer:incorrect', logMisconception);
// vinculum-feedback.js
VinculumBus.on('answer:correct', showCelebration);
```

**Impact:** Any module can react to tool events without DOM coupling. New modules (analytics, teacher dashboard live view) can subscribe without modifying tools.

### 2.4 CSS Module Splitting

**Problem:** `vinculum-core.css` contains all 4 themes (~15KB). Most deployments use 1 theme.

**Solution:** Split into `vinculum-base.css` (layout, typography) + `vinculum-theme-dark.css`, `vinculum-theme-bright.css`, etc. Load theme CSS dynamically based on user preference.

---

## 3. Feature Improvements

### 3.1 Grade 6 — Critical Gap

Grade 6 has **zero tools** despite being a critical transition year (ratios, proportional reasoning, expressions/equations, statistics). Priority builds:

| Tool | Strand | Standards |
|------|--------|-----------|
| `ratio-explorer` | RP | 6.RP.1, 6.RP.2, 6.RP.3 |
| `tape-diagrams` | RP | 6.RP.3 |
| `unit-rate-lab` | RP | 6.RP.2, 6.RP.3b |
| `percent-models` | RP | 6.RP.3c |
| `expression-builder` | EE | 6.EE.1, 6.EE.2 |
| `equation-solver` | EE | 6.EE.5, 6.EE.7 |
| `inequality-graph` | EE | 6.EE.8 |
| `coordinate-plane` | NS | 6.NS.6, 6.NS.8 |
| `integer-number-line` | NS | 6.NS.5, 6.NS.6a |
| `fraction-division` | NS | 6.NS.1 |
| `statistical-questions` | SP | 6.SP.1, 6.SP.2, 6.SP.5 |
| `box-plot-builder` | SP | 6.SP.4 |

**Estimate:** 12 tools to reach parity with adjacent grades.

### 3.2 Teacher Dashboard (Live)

**Current:** `vinculum-dashboard.js` is read-only aggregation from localStorage.

**Improvement:** Add a teacher-facing live dashboard that aggregates data across students in a class:

- Real-time class heatmap (green/yellow/red per student per tool)
- Misconception frequency report (top 5 misconceptions per tool)
- Difficulty distribution (how many students at each level)
- Session timeline (who worked on what, when)
- Export to CSV/Google Sheets

**Architecture:** WebSocket or polling from a lightweight backend (Google Apps Script, Supabase, or Firebase). Each tool's `vinculum-data.js` posts session data on `beforeunload`.

### 3.3 Assessment Mode

Add a locked-down assessment mode for formative checks:

- No hints, no scaffolding, no Read-to-Me
- Fixed problem set (teacher-configured via URL params)
- Timer optional
- Results auto-logged to teacher dashboard
- URL pattern: `?mode=assess&set=addition-20&time=300`

### 3.4 Offline / PWA Support

**Current:** Tools require CDN access (Tailwind, React, Babel, MathJax).

**Improvement:** Service worker + manifest for offline use on Chromebooks:

- Cache vinculum-*.js modules, CSS, and CDN dependencies
- IndexedDB for session data (sync when online)
- Add `manifest.json` for "Add to Home Screen"
- Critical for schools with unreliable WiFi

### 3.5 Accessibility Audit Needs

| Area | Current | Improvement |
|------|---------|-------------|
| Screen reader | Read-to-Me (Web Speech) | Add ARIA labels to all interactive SVGs |
| Keyboard nav | Basic (some tools) | Full tab-order + focus indicators on all tools |
| Color contrast | 4 themes available | Verify WCAG 2.1 AA on all themes |
| Motor access | Tap/click only | Add switch-access scanning mode |
| Reduced motion | Not implemented | Respect `prefers-reduced-motion` media query |

---

## 4. Potential Uses Beyond Classroom

### 4.1 Intervention & RTI (Response to Intervention)

VINCULUM's adaptive engine + misconception tracking makes it a natural fit for Tier 2/3 intervention:

- **Tier 2 small group:** Teacher assigns specific tools at specific difficulty levels
- **Tier 3 individual:** Adaptive engine auto-adjusts; misconception log identifies specific gaps
- **Progress monitoring:** Dashboard tracks growth over time per strand
- **IEP documentation:** Export session data as evidence of intervention

### 4.2 Homeschool Curriculum Supplement

- Self-paced progression through grade-level tools
- Parent dashboard (simplified teacher view)
- Standards alignment visible per tool (CCSS, MN 2022, TEKS)
- Story mode / Indigenous context for cross-curricular connections

### 4.3 Pre-Service Teacher Training

- Use Explore mode to demonstrate mathematical concepts
- Misconception databases as teaching resources ("here are the 6 most common mistakes students make on fractions")
- Dissection Engine / Integral Codex / Pi Codex as demonstration tools
- CRA progression visible across tool design

### 4.4 District-Wide Deployment

- Hub serves as unified math manipulative library (replaces 10+ separate apps)
- Single sign-on integration via `vinculum-identity.js`
- Standards filtering by state framework (CCSS, MN, TEKS already built)
- Centralized data collection for curriculum decisions

### 4.5 Math Competition Training

- Play mode with streak/score mechanics
- Timed challenges via assessment mode
- Fluency tools (fluency-20, add-sub-fluency) for speed drills
- Pi Codex Race mode for engagement

---

## 5. Benchmark Descriptors

### 5.1 Tool Quality Benchmarks

| Level | Descriptor | Criteria |
|-------|-----------|----------|
| **Bronze** | Functional | 3 modes (Explore/Practice/Play), correct math, VinculumInput, basic feedback |
| **Silver** | Smart | Bronze + MISCONCEPTIONS database (4-6 types with diagnostic messages), adaptive difficulty hook |
| **Gold** | Premium | Silver + story integration, 3-Reads support, Indigenous context, remediation walkthrough |
| **Platinum** | Showcase | Gold + custom SVG visualizations, animation engine, teacher guide panel, convergence/proof mechanics |

### 5.2 Current Tool Quality Distribution

| Level | K | 1 | 2 | 3 | 4 | 5 | 7 | 8 | HS | Total |
|-------|---|---|---|---|---|---|---|---|-----|-------|
| Platinum | 2 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 3 | 6 |
| Gold | 10 | 8 | 5 | 4 | 3 | 2 | 1 | 0 | 0 | 33 |
| Silver | 18 | 20 | 30 | 17 | 19 | 21 | 13 | 13 | 25 | 176 |
| Bronze | 3 | 2 | 4 | 2 | 2 | 2 | 2 | 2 | 10 | 29 |

**Platinum tools:** counting-objects (K), number-bonds (K), multiplication-arrays (3), dissection-engine (GEOM), integral-codex (PREC), pi-codex (PREC)

### 5.3 Module Coverage Benchmarks

| Benchmark | Target | Current |
|-----------|--------|---------|
| CCSS-M K-5 coverage | 100% | 96-100% |
| CCSS-M 6-8 coverage | 100% | 96% (Grade 6 gap) |
| MN 2022 alignment | 90%+ | Mapped but not audited |
| TEKS alignment | 90%+ | Mapped but not audited |
| Tools with MISCONCEPTIONS | 100% | ~75% (v2 files have them) |
| Tools with adaptive hook | 100% | ~65% (K-5 mostly) |
| Tools with Indigenous context | 50%+ | ~25% (K-2 heavy) |
| Accessibility (WCAG AA) | 100% | Not formally audited |

### 5.4 Performance Benchmarks

| Metric | Target | Notes |
|--------|--------|-------|
| First paint | < 1.5s | Most tools achieve this; CDN-dependent tools (React/Babel) are slower |
| Interactive | < 3s | Babel transpilation adds 1-2s on React-based tools |
| Module load (11 modules) | < 500ms | Currently ~400ms on broadband |
| localStorage read/write | < 50ms | Well within target |
| Animation frame rate | 60fps | Canvas tools achieve this; SVG tools may dip with 1000+ elements |

---

## 6. Recommended Roadmap

### Phase 1 — Quick Wins (1-2 weeks)
- [ ] Build Grade 6 core tools (ratio-explorer, expression-builder, equation-solver)
- [ ] Add MISCONCEPTIONS to remaining Bronze/Silver tools missing them
- [ ] CSS theme splitting (base + theme files)
- [ ] `prefers-reduced-motion` support across all tools

### Phase 2 — Modularity Refactor (2-4 weeks)
- [ ] Implement VinculumLoader (lazy module loading)
- [ ] Define grade-band module profiles
- [ ] Event bus for tool-module communication
- [ ] PWA manifest + service worker for offline support

### Phase 3 — Teacher Features (4-6 weeks)
- [ ] Live teacher dashboard (class heatmap, misconception report)
- [ ] Assessment mode (locked-down, timed, auto-logged)
- [ ] Session data export to Google Sheets
- [ ] IEP/RTI progress monitoring reports

### Phase 4 — Scale & Polish (ongoing)
- [ ] WCAG 2.1 AA accessibility audit and remediation
- [ ] Grade 6 full build (12 tools)
- [ ] Remaining Grade 5 tools to Gold/Platinum
- [ ] Parent/homeschool dashboard variant
- [ ] District deployment guide

---

## 7. Premium App Inventory

| App | Location | Tech Stack | Features |
|-----|----------|-----------|----------|
| **VertexLedger Dissection Engine** | `tools/GEOM/dissection-engine.html` | Vanilla JS + Canvas 2D + MathJax | 4 shapes x 8 dissection proofs, step scrubber, vertex labels, area/perimeter |
| **Integral Codex** | `tools/PREC/integral-codex.html` | React 18 + Babel + Tailwind | 5 integration methods, 8 functions, exact comparison, error analysis, convergence chart |
| **Pi Codex Engine** | `tools/PREC/pi-codex.html` | React 18 + Babel + Tailwind | 4 Pi discovery methods, historical context, race mode, 2x2 compare, 50-digit meter |

These premium apps demonstrate the platform's capability for advanced mathematical visualization and could serve as templates for future HS-level tools (e.g., Taylor Series Visualizer, Matrix Transformer, Conic Section Explorer).

---

*Generated for VINCULUM Math Solutions — March 2026*
