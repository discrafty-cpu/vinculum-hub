# VINCULUM Algebra Tiles & Notation Audit

**Date:** March 15, 2026
**Purpose:** Identify every app that needs algebra tiles, step-by-step KaTeX notation, or proof-style displays
**Pattern established in:** `tools/ALG1/solving-linear.html` (tiles + two-line KaTeX steps)

---

## How It Works

The system we built in `solving-linear.html` has three components that can be reused:

1. **Algebra Tiles** — Color-coded manipulatives (blue x-tiles, yellow 1-tiles, red negatives) that animate operations: tiles appear, zero-pairs pulse, then cancel and disappear. Loaded via the tile CSS + JS functions already in solving-linear.

2. **Two-Line KaTeX Notation** — Every algebraic step shows two lines: the operation applied to both sides (in pink), then the simplified result. Uses `buildStepLatex()` + `VinculumMath.renderLatex()`.

3. **Proof-Style Display** — Statement/Reason two-column format for geometric proofs, with step numbering and state tracking (active → completed).

---

## TIER 1 — CRITICAL (Equation Solving: Tiles + Notation)

These tools solve equations step-by-step and directly need both algebra tiles and proper notation. Same pattern as solving-linear.html.

| File | Lines | Has KaTeX? | What It Needs |
|------|-------|-----------|---------------|
| `6/equation-solver.html` | 742 | No | **Full retrofit.** One-step equations with balance scale. Add tiles on the scale, KaTeX showing "subtract X from both sides" two-line steps. Currently plain text. |
| `7/two-step-equations.html` | 4 (stub) | No | **Build from scratch with tiles + notation.** Two-step equations are THE algebra tile sweet spot — subtract constant, then divide. Should mirror solving-linear exactly. |
| `ALG1/solving-linear.html` | 1341 | Yes | **Done.** Already has tiles + KaTeX two-line notation. This is the reference implementation. |
| `1/equation-balance.html` | 1423 | No | **Add simple 1-tiles.** This is grade 1 so no x-tiles needed — just yellow unit tiles on a balance showing `3 + ? = 7`. Powerful CRA introduction. |
| `3/balance-puzzles.html` | 651 | No | **Add tiles + simple notation.** Grade 3 balance puzzles use mystery values — tiles show the unknown as a special tile. Bridge to formal algebra. |

**Why these matter most:** These are the tools where students learn to *solve equations* — the fundamental skill. Plain text steps teach bad habits. Proper notation from day one means students don't have to unlearn anything later.

---

## TIER 2 — HIGH (Algebraic Processes: Notation + Optional Tiles)

These tools involve multi-step algebraic processes where KaTeX notation is essential. Tiles help some but aren't always the primary scaffold.

| File | Lines | Has KaTeX? | What It Needs |
|------|-------|-----------|---------------|
| `5/order-of-operations.html` | 805 | No | **KaTeX step-by-step.** Show each PEMDAS step on its own line: original → resolve parentheses → resolve exponents → multiply/divide → add/subtract. Color-highlight the operation being done. |
| `5/fraction-add-subtract.html` | 776 | No | **KaTeX showing common denominator steps.** Line 1: find LCD. Line 2: rewrite fractions. Line 3: add/subtract numerators. Line 4: simplify. Currently text-based. |
| `5/fraction-multiply.html` | 766 | No | **KaTeX showing cross-cancellation.** Show numerator×numerator / denominator×denominator with cancellation marked in color. |
| `5/fraction-division.html` | 871 | No | **KaTeX showing keep-change-flip.** Three lines: original ÷ problem → multiply by reciprocal → simplify. |
| `6/expression-evaluation.html` | 730 | No | **KaTeX substitution steps.** Show: original expression → substitute values (highlighted) → simplify step by step. |
| `6/expression-builder.html` | 746 | No | **Tiles for like terms + KaTeX.** Blue tiles for x-terms, yellow for constants. Show combining like terms visually then in notation. |
| `6/variable-notation.html` | 825 | No | **KaTeX for formal notation.** This tool teaches notation — it absolutely needs proper rendered math, not plain text. |
| `7/expression-simplifier.html` | 242 | No | **Tiles + KaTeX.** Combining like terms is a perfect tile scenario — physically group same-colored tiles, then show KaTeX combining. |
| `7/proportion-solver.html` | 377 | No | **KaTeX cross-multiplication steps.** Show a/b = c/d → ad = bc → solve for unknown. Two-line notation for each step. |
| `8/integer-exponents.html` | 538 | Yes (9 refs) | **Already has vinculum-math.js.** Partially done. May need step-by-step for "Work It Out" panel. |
| `8/slope-intercept.html` | 318 | No | **KaTeX for form conversion.** Show: standard form → subtract → divide → slope-intercept form. Two-line steps. |
| `8/systems-solver.html` | 442 | No | **KaTeX for elimination/substitution steps.** Show aligned equations, operations applied to eliminate a variable. This is a proof-style multi-step process. |
| `ALG1/polynomial-intro.html` | 772 | No | **Tiles essential.** Algebra tiles are THE standard tool for polynomials — x² as big square, x as rectangle, 1 as unit. Show combining like terms. |
| `7/integer-operations.html` | 408 | No | **Tiles for integer addition/subtraction.** Red/yellow chips (or tiles) showing zero pairs for negative number operations. |

---

## TIER 3 — HIGH (Build From Scratch With Notation)

These are stubs (2-4 lines) that need to be built. They should include KaTeX notation and tiles from the start rather than retrofitting later.

| File | Lines | What To Build |
|------|-------|--------------|
| `ALG1/factoring-lab.html` | 2 | **Tiles + KaTeX.** Factor trinomials using tile area model (x²+bx+c as rectangle). Show steps: identify a·c, find factors, split middle term, group, factor. |
| `ALG1/quadratic-formula.html` | 2 | **KaTeX step-by-step.** Show formula → substitute a,b,c → simplify discriminant → solve. Color-code a, b, c values. |
| `ALG1/quadratic-explorer.html` | 2 | **KaTeX + graphing.** Show vertex form conversion steps, completing the square notation. |
| `ALG1/exponent-rules.html` | 2 | **KaTeX notation.** Show product rule, quotient rule, power rule with formal step proofs. |
| `ALG1/systems-graphing.html` | 2 | **KaTeX for algebraic solution.** Show substitution or elimination steps alongside the graph. |
| `ALG1/linear-inequalities.html` | 2 | **KaTeX two-line steps.** Same pattern as solving-linear but with inequality signs and the flip-when-multiply-by-negative rule highlighted. |
| `ALG2/polynomial-operations.html` | 2 | **Tiles + KaTeX.** Distribution, FOIL, long division of polynomials — all need step notation. |
| `ALG2/rational-expressions.html` | 2 | **KaTeX step-by-step.** Factor, cancel, simplify. Show each step clearly. |
| `ALG2/exponential-logarithmic.html` | 2 | **KaTeX for log rules.** Show log properties as formal steps. |
| `ALG2/radical-functions.html` | 2 | **KaTeX for radical simplification.** Show simplification steps with radical notation. |
| `PREC/limits-intro.html` | 2 | **KaTeX essential.** Limit notation, epsilon-delta, algebraic manipulation of limits. |
| `PREC/series-sequences.html` | 2 | **KaTeX for summation.** Sigma notation, partial sums, convergence steps. |
| `PREC/unit-circle.html` | 2 | **KaTeX for trig values.** Exact values in radical form. |

---

## TIER 4 — HIGH (Geometry Proofs: Statement/Reason Display)

These need a **proof-style two-column display** (Statement | Reason) with step numbering. Similar to solving-linear's step cards but formatted as formal proofs.

| File | Lines | What It Needs |
|------|-------|--------------|
| `GEOM/proof-builder.html` | 709 | **Already has proof structure (120 step references).** Needs KaTeX for any algebraic steps within proofs. Add formal notation for angle/segment equations. |
| `GEOM/coordinate-proofs.html` | 2 | **Build with proof display.** Distance formula, midpoint formula, slope formula — each shown as KaTeX steps within a two-column proof. |
| `GEOM/triangle-congruence.html` | 2 | **Build with proof display.** SSS, SAS, ASA, AAS — show the logical chain: Given → Mark congruent parts → Apply postulate → Conclude. |
| `GEOM/logic-proofs.html` | 2 | **Build with proof display.** Conditional statements, contrapositive, proof by contradiction. Formal notation essential. |
| `GEOM/circle-theorems.html` | 2 | **KaTeX for angle/arc relationships.** Inscribed angle theorem, chord relationships — all need formal notation. |
| `GEOM/right-triangle-trig.html` | 2 | **KaTeX for trig ratios.** sin/cos/tan definitions, solving for sides — step-by-step. |
| `GEOM/similarity-lab.html` | 2 | **Proof display for similarity proofs.** AA, SAS, SSS similarity with formal notation. |
| `8/pythagorean-explorer.html` | 162 | **KaTeX for a²+b²=c².** Show substitution, simplification, square root steps. Currently minimal. |
| `8/congruence-similarity.html` | — | **KaTeX + proof display.** Bridge from grade 8 to geometry proofs. |

---

## TIER 5 — MEDIUM (Notation Enhancement Only)

These tools would benefit from KaTeX rendering but don't need tiles or proof displays.

| File | What It Needs |
|------|--------------|
| `4/long-division.html` | KaTeX for algorithm steps (divide → multiply → subtract → bring down) |
| `4/fraction-add-subtract.html` | KaTeX for common denominator steps |
| `4/fraction-multiplication.html` | KaTeX for multiplication notation |
| `5/powers-of-ten.html` | KaTeX for exponent notation |
| `6/gcf-lcm-finder.html` | KaTeX for factor trees and prime factorization |
| `6/percent-bar.html` | KaTeX for proportion equations |
| `6/ratio-table.html` | KaTeX for ratio notation |
| `7/percent-applications.html` | KaTeX for percent equation setup |
| `8/scientific-notation.html` | KaTeX for scientific notation conversion steps |
| `8/slope-grapher.html` | KaTeX for slope formula |
| `ALG1/statistics-one-var.html` | KaTeX for mean/median formulas |
| `ALG2/regression-modeling.html` | KaTeX for regression equations |
| `ALG2/trigonometric-functions.html` | KaTeX for trig identities |

---

## Summary Counts

| Category | Count | Status |
|----------|-------|--------|
| **Tier 1 — Critical (tiles + full notation)** | 5 | 1 done, 4 to do |
| **Tier 2 — High (notation + optional tiles)** | 14 | 1 partial, 13 to do |
| **Tier 3 — High (build from scratch)** | 13 | All stubs |
| **Tier 4 — High (geometry proofs)** | 9 | 1 partial, 8 to do |
| **Tier 5 — Medium (notation only)** | 13 | All to do |
| **TOTAL** | **54 files** | **~52 need work** |

---

## Recommended Build Order

1. **Grade 7 two-step-equations** — stub, mirror solving-linear exactly (tiles + notation)
2. **Grade 6 equation-solver** — 742 lines, retrofit tiles + notation
3. **Grade 1 equation-balance** — retrofit simple 1-tiles
4. **ALG1 factoring-lab** — build with tile area model (classic tile use case)
5. **GEOM proof-builder** — add KaTeX to existing proof structure
6. **Grade 5 order-of-operations** — KaTeX step-by-step
7. **Grade 5 fraction operations** (3 files) — KaTeX for all fraction procedures
8. **Grade 8 systems-solver** — KaTeX elimination/substitution steps
9. **Remaining ALG1 stubs** — build with notation from start
10. **GEOM stubs** — build with proof display from start

---

## Shared Module Strategy

Rather than copy-pasting tile code into 54 files, the tile engine should become a **shared module** like `vinculum-math.js`:

```
shared/vinculum-tiles.js    — Tile parsing, rendering, animation
shared/vinculum-tiles.css   — Tile styling (already in solving-linear, extract it)
shared/vinculum-proofs.js   — Two-column proof display engine
shared/vinculum-proofs.css  — Proof styling
```

Each app would then just do:
```html
<script src="../../shared/vinculum-math.js"></script>
<script src="../../shared/vinculum-tiles.js"></script>
```

This keeps the pattern consistent across all 54 files and means fixing a bug in one place fixes it everywhere.
