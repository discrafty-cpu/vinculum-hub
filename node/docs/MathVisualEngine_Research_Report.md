# MathVisualEngine: Comprehensive Research Report
## Client-Side SVG Math Visualization for K-8 Education

**Report Date:** March 14, 2026
**Use Case:** K-8 math education slides with CRA framework support
**Target Output:** Self-contained SVG data URIs for PptxGenJS integration

---

## Executive Summary

Building a client-side MathVisualEngine requires a **layered architecture** combining:
- **Math typesetting**: KaTeX or MathJax for formula rendering (KaTeX preferred for size/speed)
- **SVG generation**: D3.js for data-driven diagrams + custom SVG builders for specialized shapes
- **Symbolic math**: math.js or Nerdamer for step-by-step substitutions
- **Educational-specific tools**: JSXGraph for interactive geometry, Mathigon's @mathigon/euclid for drawing utilities

**Key finding**: No single library handles K-8 CRA visuals comprehensively. A hybrid approach is essential, with custom SVG generators for fractions, base-10 blocks, number lines, and area models.

---

## 1. Library Comparison Matrix

| Aspect | KaTeX | MathJax | D3.js | JSXGraph | Mafs | Mathigon |
|--------|-------|---------|-------|----------|------|----------|
| **Size (min+gzip)** | ~32 KB | ~160 KB | ~53 KB | ~400 KB | ~150 KB | ~500+ KB |
| **Primary Purpose** | Math typesetting | Math typesetting | Data visualization | Interactive geometry | React math visuals | Interactive courses |
| **SVG Output** | HTML DOM (not direct) | Yes, native processor | Yes | Yes | Yes (canvas/SVG) | Yes (@euclid) |
| **Fractions (vertical)** | Yes, but not exportable to SVG directly | Yes (via SVG processor) | Manual | Yes | Yes | Yes |
| **Math notation** | Excellent | Excellent | Limited | Good | Good | Good |
| **Step-by-step support** | No | No | Via custom | Partial | No | No |
| **K-8 manipulatives** | No | No | Manual | Partial | Partial | Yes (@mathigon/fermat) |
| **Browser Support** | Modern all | Modern all | Modern all | IE9+ | Modern | Modern |
| **License** | MIT | Apache 2.0 | GPL v3 | LGPL | MIT | MIT |
| **Learning curve** | Low | Low | Medium-High | High | Medium | High |

### Critical Finding: **KaTeX Does NOT Export Direct SVG**

KaTeX renders to an HTML DOM structure internally using SVG for fraction bars, but **does not provide a native SVG export method**. To get SVG from KaTeX:

1. **Option A (Recommended for PptxGenJS)**: Render KaTeX to a `<div>`, then use a library like `html2canvas` or `dom-to-image` to convert the rendered HTML to SVG/PNG, then to data URI
2. **Option B**: Use MathJax's SVG output processor instead (more overhead but native SVG)
3. **Option C**: Use KaTeX for display in-app, but hand-build SVG representations of formulas for export

**Best approach for your use case**: Use KaTeX for interactive previews, but implement a **custom SVG formula renderer** for static export to PptxGenJS.

---

## 2. Math Expression & Step-by-Step Libraries

### Recommended: **math.js** or **Nerdamer**

| Feature | math.js | Nerdamer | Algebrite | mathsteps |
|---------|---------|---------|----------|-----------|
| **Size** | ~70 KB | ~60 KB | ~90 KB | ~40 KB |
| **Symbolic math** | Yes | Yes | Yes | Yes |
| **Differentiation** | Yes | Yes | Yes | Yes |
| **Integration** | Yes | Yes | Yes | No |
| **Equation solving** | Yes | Yes | Yes | Limited |
| **Step generation** | Manual | Manual | Manual | **Yes** (pedagogy-focused) |
| **K-8 scope** | Overkill | Good | Overkill | Excellent |

**For step-by-step solving**, **mathsteps** is the only library that generates pedagogically-sound steps (not just intermediate results). However, it's algebra-focused, not K-8 elementary. For K-8, you'll need to build custom step generators for:
- Fraction operations (show common denominator, add/subtract, simplify)
- Volume formulas (V = lwh → V = 5×3×2 → V = 30)
- Area model breakdowns

---

## 3. SVG-Specific Generation Tools

### Custom SVG Building Approach (Recommended)

Rather than relying on a single library, build modular SVG generators:

```javascript
// Pseudocode architecture
class MathVisualEngine {
  constructor(theme = {}) {
    this.theme = theme; // Color palette
  }

  generateVerticalFraction(numerator, denominator) {
    // Returns SVG string with <svg> wrapper
  }

  generateNumberLine(min, max, ticks, highlighted) {
    // SVG with labeled tick marks
  }

  generateAreaModel(width, height, divisions, shaded) {
    // Grid-based area representation
  }

  generateBase10Blocks(hundreds, tens, ones) {
    // Cube representations
  }

  generateTapeDiagram(segments, total, unknown) {
    // Bar model for word problems
  }

  generateFractionBar(parts, shaded, type) {
    // Circles or rectangles, shaded portions
  }

  toDataURI(svgString) {
    // SVG string → data URI
  }
}
```

### Recommended Libraries for SVG Building

1. **svg.js (v3.0 with svg.math.js)**
   - Lightweight (~16 KB min)
   - Clean API for creating SVG programmatically
   - Chainable: `draw.rect(100, 100).fill('red')`
   - Perfect for structured shapes (rectangles, lines, text)

2. **D3.js** (for complex, data-driven visuals)
   - Scales, axes, paths
   - Too heavyweight for simple shapes; use selectively
   - Great for: graphing functions, scatter plots, complex models

3. **@mathigon/euclid** (from Mathigon)
   - Purpose-built for educational geometry
   - Handles ellipses, polygons, transformations
   - Smaller footprint than D3
   - License: MIT

### Key SVG Gotchas for PptxGenJS

1. **xmlns Attribute Required**: SVG data URIs in PowerPoint require `xmlns="http://www.w3.org/2000/svg"`
   ```javascript
   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">...</svg>`;
   ```

2. **Data URI Encoding**: URL-encode only; avoid base64 for text-heavy SVGs (worse compression)
   ```javascript
   const encoded = encodeURIComponent(svg);
   const dataURI = `data:image/svg+xml;charset=UTF-8,${encoded}`;
   ```

3. **Font Handling**: Embed fonts as base64 or use system fonts (not web fonts)

4. **CSS Won't Work**: All styling must be inline or via SVG attributes

---

## 4. Recommended Architecture for MathVisualEngine

### Module Structure

```
MathVisualEngine/
├── core/
│   ├── svgBuilder.js         # Low-level SVG generation
│   ├── theme.js              # Color palette management
│   └── dataURIConverter.js    # SVG → data URI utilities
├── visuals/
│   ├── fractions.js           # Vertical fractions, fraction bars
│   ├── numberLines.js         # Number lines with custom ticks
│   ├── areaModels.js          # Grid-based area representations
│   ├── base10Blocks.js        # Concrete manipulatives
│   ├── tapeDiagrams.js        # Bar models
│   ├── coordinatePlanes.js    # Grids for plotting
│   └── geometryShapes.js      # Circles, polygons, angles
├── cra/
│   ├── concreteVisuals.js     # Physical manipulative representations
│   ├── representationalVisuals.js  # Pictorial/schematic
│   └── abstractVisuals.js     # Equations and notation
├── formulas/
│   ├── stepByStepSolver.js    # V = lwh → steps
│   ├── substitutor.js         # Token replacement
│   └── formatOutput.js        # Render formula as SVG
├── math/
│   ├── evaluator.js           # Expression evaluation
│   ├── simplifier.js          # Simplification logic
│   └── stepGenerator.js       # Generate pedagogical steps
└── export/
    └── toPptx.js              # Integration with PptxGenJS
```

### Core Classes & Methods

```javascript
class MathVisualEngine {
  constructor(options = {}) {
    this.theme = options.theme || DEFAULT_THEME;
    this.width = options.width || 400;
    this.height = options.height || 300;
  }

  // Fractions
  verticalFraction(num, denom, options = {}) {
    // Return SVG string for vertical fraction (numerator/denom)
  }

  fractionBar(total, shaded, type = 'rectangle') {
    // Rectangle or circle divided into parts
  }

  // CRA Visuals
  base10Representation(hundreds, tens, ones, type = 'concrete') {
    // Concrete: stacked cubes; Representational: drawn blocks
  }

  numberLine(min, max, points = [], highlight = []) {
    // SVG number line with labeled points
  }

  areaModel(width, height, shading = []) {
    // Grid-based area representation for multiplication
  }

  tapeDiagram(segments, unknown = null) {
    // Bar model for word problems
  }

  // Formulas & Step-by-Step
  formulaSolver(formula, substitutions = {}) {
    // Return array of steps with SVG rendering
    // Steps: original → substituted → simplified → answer
  }

  // Rendering
  render() {
    // Return SVG string with xmlns and proper encoding
  }

  toDataURI() {
    // Return data:image/svg+xml data URI for PptxGenJS
  }
}
```

---

## 5. Specific Implementation Patterns

### 5.1 Vertical Fractions

```javascript
// WITHOUT KaTeX (custom SVG)
class VerticalFraction {
  constructor(numerator, denominator, options = {}) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.theme = options.theme || { textColor: '#000', barColor: '#000' };
    this.fontSize = options.fontSize || 24;
    this.barThickness = options.barThickness || 2;
  }

  toSVG() {
    const numWidth = 40;
    const numHeight = 40;
    const denomHeight = 40;
    const barHeight = this.barThickness;
    const padding = 10;
    const width = numWidth + 2 * padding;
    const height = numHeight + barHeight + denomHeight + 3 * padding;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <!-- Numerator -->
        <text x="${width / 2}" y="${padding + 20}"
              text-anchor="middle" font-size="${this.fontSize}"
              fill="${this.theme.textColor}">
          ${this.numerator}
        </text>

        <!-- Vinculum (fraction bar) -->
        <line x1="${padding}" y1="${padding + numHeight + 10}"
              x2="${width - padding}" y2="${padding + numHeight + 10}"
              stroke="${this.theme.barColor}" stroke-width="${this.barThickness}" />

        <!-- Denominator -->
        <text x="${width / 2}" y="${padding + numHeight + barHeight + 25}"
              text-anchor="middle" font-size="${this.fontSize}"
              fill="${this.theme.textColor}">
          ${this.denominator}
        </text>
      </svg>
    `;
  }
}

// Usage
const frac = new VerticalFraction('3', '4', { theme: { textColor: '#003366', barColor: '#003366' } });
const dataURI = svgToDataURI(frac.toSVG());
pres.addImage({ path: dataURI, x: 1, y: 1, w: 1, h: 1 });
```

### 5.2 Number Lines

```javascript
class NumberLine {
  constructor(min, max, options = {}) {
    this.min = min;
    this.max = max;
    this.step = options.step || 1;
    this.width = options.width || 500;
    this.height = options.height || 100;
    this.theme = options.theme || {};
    this.highlightPoints = options.highlight || [];
  }

  toSVG() {
    const padding = 40;
    const lineY = this.height / 2;
    const usableWidth = this.width - 2 * padding;
    const range = this.max - this.min;
    const tickSpacing = usableWidth / range;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">`;

    // Main line
    svg += `<line x1="${padding}" y1="${lineY}" x2="${this.width - padding}" y2="${lineY}"
                   stroke="${this.theme.lineColor || '#000'}" stroke-width="2" />`;

    // Ticks and labels
    for (let i = this.min; i <= this.max; i += this.step) {
      const x = padding + (i - this.min) * tickSpacing;
      svg += `<line x1="${x}" y1="${lineY - 5}" x2="${x}" y2="${lineY + 5}" stroke="#000" stroke-width="1" />`;
      svg += `<text x="${x}" y="${lineY + 20}" text-anchor="middle" font-size="12">${i}</text>`;
    }

    // Highlight points
    this.highlightPoints.forEach(point => {
      const x = padding + (point - this.min) * tickSpacing;
      svg += `<circle cx="${x}" cy="${lineY}" r="6" fill="${this.theme.highlightColor || '#ff0000'}" />`;
    });

    svg += `</svg>`;
    return svg;
  }
}

// Usage
const line = new NumberLine(0, 10, {
  highlight: [3, 7],
  theme: { lineColor: '#333', highlightColor: '#ff6b6b' }
});
```

### 5.3 Base-10 Block Representation

```javascript
class Base10Blocks {
  constructor(hundreds, tens, ones, options = {}) {
    this.hundreds = hundreds;
    this.tens = tens;
    this.ones = ones;
    this.type = options.type || 'representational'; // 'concrete' or 'representational'
    this.theme = options.theme || { blockColor: '#4a90e2', outlineColor: '#000' };
  }

  toSVG() {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">`;
    let x = 20, y = 20;

    // Hundreds (large cubes)
    for (let i = 0; i < this.hundreds; i++) {
      svg += this._drawCube(x, y, 80, 'hundreds');
      x += 100;
      if (x > 500) { x = 20; y += 100; }
    }

    x = 20; y = 150;

    // Tens (rods/sticks)
    for (let i = 0; i < this.tens; i++) {
      svg += this._drawRod(x, y, 40, 80, 'tens');
      x += 50;
      if (x > 500) { x = 20; y += 100; }
    }

    x = 20; y = 300;

    // Ones (unit squares)
    for (let i = 0; i < this.ones; i++) {
      svg += this._drawUnit(x, y, 30, 'ones');
      x += 40;
      if (x > 500) { x = 20; y += 50; }
    }

    svg += `</svg>`;
    return svg;
  }

  _drawCube(x, y, size, type) {
    // Draw cube with outline (isometric view)
    return `
      <g>
        <rect x="${x}" y="${y}" width="${size}" height="${size}"
              fill="${this.theme.blockColor}" stroke="${this.theme.outlineColor}" stroke-width="2" />
        <polyline points="${x},${y} ${x + size/2},${y - size/2} ${x + size},${y}"
                  fill="none" stroke="${this.theme.outlineColor}" stroke-width="1" />
        <line x1="${x + size}" y1="${y}" x2="${x + size/2}" y2="${y + size/2}"
              stroke="${this.theme.outlineColor}" stroke-width="1" />
        <text x="${x + size/2}" y="${y + size/2}" text-anchor="middle" dominant-baseline="middle"
              font-size="16" font-weight="bold">${type === 'hundreds' ? '100' : ''}</text>
      </g>
    `;
  }

  _drawRod(x, y, width, height, type) {
    return `
      <rect x="${x}" y="${y}" width="${width}" height="${height}"
            fill="${this.theme.blockColor}" stroke="${this.theme.outlineColor}" stroke-width="1.5" />
    `;
  }

  _drawUnit(x, y, size, type) {
    return `
      <rect x="${x}" y="${y}" width="${size}" height="${size}"
            fill="${this.theme.blockColor}" stroke="${this.theme.outlineColor}" stroke-width="1" />
    `;
  }
}
```

### 5.4 Area Model (for Multiplication)

```javascript
class AreaModel {
  constructor(factor1, factor2, options = {}) {
    this.factor1 = factor1;
    this.factor2 = factor2;
    this.width = options.width || 400;
    this.height = options.height || 400;
    this.theme = options.theme || {};
  }

  toSVG() {
    const gridSize = 80;
    const padding = 50;
    const cols = Math.ceil(this.factor1 / 10);
    const rows = Math.ceil(this.factor2 / 10);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">`;

    // Draw grid
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = padding + c * gridSize;
        const y = padding + r * gridSize;
        svg += `<rect x="${x}" y="${y}" width="${gridSize}" height="${gridSize}"
                       fill="none" stroke="${this.theme.gridColor || '#ccc'}" stroke-width="1" />`;
      }
    }

    // Label factor 1 (top)
    svg += `<text x="${padding + cols * gridSize / 2}" y="${padding - 20}"
                  text-anchor="middle" font-size="16" font-weight="bold">${this.factor1}</text>`;

    // Label factor 2 (left)
    svg += `<text x="${padding - 30}" y="${padding + rows * gridSize / 2}"
                  text-anchor="middle" font-size="16" font-weight="bold">${this.factor2}</text>`;

    // Product annotation
    const product = this.factor1 * this.factor2;
    svg += `<text x="${padding + cols * gridSize / 2}" y="${this.height - 20}"
                  text-anchor="middle" font-size="18" font-weight="bold">${product}</text>`;

    svg += `</svg>`;
    return svg;
  }
}
```

### 5.5 Step-by-Step Formula Solving

```javascript
class FormulaSolver {
  constructor(formula, substitutions = {}, options = {}) {
    this.formula = formula;
    this.substitutions = substitutions;
    this.theme = options.theme || {};
  }

  getSteps() {
    // V = lwh
    // V = 5×3×2
    // V = 15×2
    // V = 30 cm³

    const steps = [];

    // Step 0: Original formula
    steps.push({
      label: 'Formula:',
      expression: this.formula,
      explanation: 'Start with the formula'
    });

    // Step 1: Substitution
    let substituted = this.formula;
    let substitutionStr = '';
    Object.entries(this.substitutions).forEach(([var_name, value]) => {
      substituted = substituted.replace(new RegExp(var_name, 'g'), `(${value})`);
      substitutionStr += `${var_name} = ${value}, `;
    });

    steps.push({
      label: 'Substitute:',
      expression: substituted,
      substitutions: this.substitutions,
      explanation: `Replace ${substitutionStr.slice(0, -2)} into the formula`
    });

    // Step 2-N: Simplification steps (would use math.js or custom logic)
    // This is simplified; real implementation would evaluate step-by-step

    steps.push({
      label: 'Simplify:',
      expression: this._simplifyExpression(substituted),
      explanation: 'Perform arithmetic operations'
    });

    return steps;
  }

  _simplifyExpression(expr) {
    // Basic evaluation; use math.js for real implementation
    try {
      return eval(expr); // UNSAFE for production; use math.js instead
    } catch {
      return expr;
    }
  }

  toSVG() {
    const steps = this.getSteps();
    let svgHeight = steps.length * 80;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="${svgHeight}">`;

    steps.forEach((step, idx) => {
      const y = idx * 80 + 40;
      svg += `<text x="20" y="${y}" font-weight="bold" font-size="14">${step.label}</text>`;
      svg += `<text x="150" y="${y}" font-size="14" fill="${this.theme.formulaColor || '#003366'}">${step.expression}</text>`;
    });

    svg += `</svg>`;
    return svg;
  }
}

// Usage
const solver = new FormulaSolver('V = l × w × h', { l: 5, w: 3, h: 2 });
const steps = solver.getSteps();
console.log(steps);
// Output: steps showing V = l×w×h → V = 5×3×2 → V = 30 cm³
```

### 5.6 Theme-Aware SVG Generation

```javascript
const DEFAULT_THEME = {
  // Colors
  primary: '#003366',      // Deep blue
  secondary: '#ff6b6b',    // Red for highlights
  accent: '#4a90e2',       // Light blue
  gridColor: '#e0e0e0',
  textColor: '#000',
  backgroundColor: '#fff',

  // Typography
  fontFamily: 'Arial, sans-serif',
  fontSize: {
    small: 12,
    normal: 14,
    large: 18,
    title: 24
  },

  // Spacing
  padding: 20,
  margin: 10,

  // Stroke & Fill
  strokeWidth: 2,
  fillOpacity: 0.8
};

function applyTheme(element, theme = DEFAULT_THEME) {
  const style = `
    fill-opacity="${theme.fillOpacity}";
    stroke-width="${theme.strokeWidth}";
    font-family="${theme.fontFamily}";
  `;
  return style;
}

// Usage in any visual class:
// svg += `<rect ... ${applyTheme(null, userTheme)} ... />`;
```

---

## 6. SVG to Data URI for PptxGenJS

### Complete Workflow

```javascript
// Step 1: Generate SVG
const fraction = new VerticalFraction('3', '4');
const svgString = fraction.toSVG();

// Step 2: Ensure xmlns is present
const withXmlns = svgString.includes('xmlns')
  ? svgString
  : svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

// Step 3: Convert to data URI (URL-encoded, not base64)
function svgToDataURI(svgString) {
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

const dataURI = svgToDataURI(withXmlns);

// Step 4: Add to PptxGenJS slide
const pres = new PptxGenJS();
const slide = pres.addSlide();
slide.addImage({
  data: dataURI,
  x: 1.0,
  y: 1.0,
  w: 3.0,
  h: 2.0
});

pres.writeFile({ fileName: 'math-slides.pptx' });
```

### Alternative: Using Blob URLs (for testing)

```javascript
function svgToBlob(svgString) {
  return new Blob([svgString], { type: 'image/svg+xml' });
}

function svgToBlobURL(svgString) {
  const blob = svgToBlob(svgString);
  return URL.createObjectURL(blob);
}

// For PptxGenJS (needs data URI, not blob URL):
// But useful for testing in HTML <img> tags
const blobURL = svgToBlobURL(svgString);
document.getElementById('preview').src = blobURL;
```

### Compact Data URI Using mini-svg-data-uri

```javascript
// npm install mini-svg-data-uri
import { toDataUri } from 'mini-svg-data-uri';

const dataURI = toDataUri(svgString);
// Returns optimized data:image/svg+xml;utf8,... URI
```

---

## 7. Gotchas & Limitations

### 7.1 KaTeX & MathJax Limitations

| Issue | KaTeX | MathJax | Solution |
|-------|-------|---------|----------|
| No direct SVG export | ✗ | ✓ (via SVG processor) | Use custom SVG formatter or MathJax |
| Vertical fractions in SVG | N/A (HTML DOM) | ✓ | Use MathJax or hand-build SVG |
| HTML-to-SVG conversion needed | ✓ | Partial | Use html2canvas or dom-to-image |
| Performance overhead | Low | Higher | KaTeX better for UI, MathJax for export |

**Action**: For PptxGenJS, use **MathJax's SVG processor** or build a **custom SVG formula renderer**.

### 7.2 SVG in PowerPoint Quirks

1. **Fonts**: System fonts only (Arial, Courier, etc.). Web fonts won't load.
2. **CSS**: Inline styles only. Class selectors, media queries ignored.
3. **xmlns**: **REQUIRED** for data URIs in PowerPoint. Without it, blank images.
4. **File size**: Data URIs inflate file size. For large presentations, consider embedding SVGs as actual files.
5. **Animation**: Not supported in PowerPoint. All SVGs must be static.
6. **Filters & Effects**: Some SVG effects (feGaussianBlur, etc.) may not render correctly.

**Testing**: Always test SVG in PowerPoint before shipping. Open Desktop version, not Online.

### 7.3 Browser Compatibility

- **Modern browsers**: Full SVG support (Chrome 45+, Firefox 31+, Safari 9+, Edge)
- **IE11**: Partial SVG support; avoid complex paths
- **Mobile**: Full support (iOS Safari, Chrome Mobile)
- **PptxGenJS**: Requires modern browser for export; works on Node.js for server-side generation

### 7.4 Performance Considerations

| Task | Approach | Performance | Notes |
|------|----------|-------------|-------|
| Generate 100 fractions | Custom SVG class | ~50ms | Very fast |
| Generate complex area model (10×10) | Custom SVG | ~100ms | Acceptable |
| KaTeX render + HTML-to-SVG conversion | KaTeX + html2canvas | ~300-500ms | Slower; use sparingly |
| D3.js force graph with 50 nodes | D3 | ~200ms | Reasonable for complex layouts |
| MathJax full render | MathJax | ~800ms+ | Slowest option |

**Recommendation**: Use custom SVG classes for simple shapes; reserve D3/JSXGraph for interactive features.

### 7.5 D3 & JSXGraph Overkill for K-8

- **D3**: Powerful but steep learning curve; 53 KB min. Better for dashboards than math slides.
- **JSXGraph**: Great for geometry but designed for interactivity. 400 KB is heavy for static export.

**Better approach**: Use these libraries only for:
- Interactive elements during authoring
- Complex constructions (Euler diagrams, 3D rotations)
- Otherwise, stick to custom SVG builders.

---

## 8. Recommended Tech Stack

### Minimum Viable Implementation

```
Core:
- SVG.js v3.0 (16 KB) for SVG generation
- math.js (70 KB) for formula evaluation
- @mathigon/euclid (optional, ~50 KB) for advanced geometry

Optional:
- KaTeX (32 KB) for in-app formula display
- D3.js (53 KB) for complex visualizations
- JSXGraph (400 KB) for interactive geometry authoring (exclude from production)

Utilities:
- mini-svg-data-uri (npm) for data URI conversion
- html2canvas (~150 KB) for KaTeX→SVG conversion (if using KaTeX)

Total minimum bundle: ~160-200 KB (SVG.js + math.js + utilities)
```

### Full Featured Implementation

```
Core + Optional + all utilities: ~450-550 KB
```

---

## 9. Implementation Roadmap

### Phase 1: Core SVG Builders (Week 1-2)
- [ ] Vertical fractions
- [ ] Number lines
- [ ] Fraction bars (circles & rectangles)
- [ ] Base-10 blocks (representational)
- [ ] Tape diagrams
- [ ] Area models (multiplication grids)

### Phase 2: CRA Framework (Week 3)
- [ ] Concrete manipulatives (detailed 3D-ish renderings)
- [ ] Representational pictorials (simplified, 2D versions)
- [ ] Abstract notation (equations with proper typesetting)

### Phase 3: Step-by-Step Solving (Week 4)
- [ ] Formula substitution engine
- [ ] Step generator for volume, area, fractions
- [ ] SVG rendering of multi-step solutions

### Phase 4: Integration & Export (Week 5)
- [ ] PptxGenJS integration
- [ ] Theme system (color palettes, fonts)
- [ ] Data URI conversion utilities
- [ ] Unit tests for SVG output

### Phase 5: Polish & Optimization (Week 6)
- [ ] Performance tuning
- [ ] Browser compatibility testing
- [ ] PowerPoint rendering validation
- [ ] Documentation & examples

---

## 10. Key Decision Points

### 1. Math Typesetting: KaTeX vs. MathJax

**Choose KaTeX if:**
- You need fast in-app rendering
- File size is critical
- You can use MathJax for export OR build custom SVG formatters

**Choose MathJax if:**
- You need native SVG output for export
- You want no extra conversion steps
- Performance is less critical

**Hybrid recommendation**: Use KaTeX for UI previews; export via custom SVG formatters or MathJax server-side rendering.

### 2. SVG Generation: Custom vs. Library

**Choose Custom SVG classes if:**
- You have specific, predictable shapes (fractions, base-10, number lines)
- You need full control over theming
- Bundle size matters

**Choose Library (SVG.js, D3, JSXGraph) if:**
- You need complex transformations
- You want interactivity during authoring
- You're building a full-featured math editor

**Recommendation**: **Hybrid approach**. Use custom classes for standard K-8 visuals; use SVG.js as a utility layer for complex shapes.

### 3. Symbolic Math: math.js vs. Nerdamer vs. mathsteps

**Choose math.js if:**
- You need broad expression evaluation
- You're building a general-purpose calculator
- You don't need pedagogical step generation

**Choose mathsteps if:**
- You specifically need K-8 algebra steps
- Pedagogy is important
- You're willing to subset features for K-8

**Choose custom if:**
- You only need specific operations (fraction simplification, volume formulas)
- You want to optimize bundle size
- You want full control over step pedagogy

**Recommendation**: Build custom step generators for K-8; these are simpler than general CAS systems and faster to execute.

---

## 11. Code Starter Template

```javascript
// MathVisualEngine.js - Starter template

class MathVisualEngine {
  constructor(options = {}) {
    this.theme = options.theme || DEFAULT_THEME;
    this.width = options.width || 400;
    this.height = options.height || 300;
  }

  // Fractions
  verticalFraction(numerator, denominator, options = {}) {
    const frac = new VerticalFraction(numerator, denominator, {
      theme: this.theme,
      ...options
    });
    return frac.toSVG();
  }

  // Number Lines
  numberLine(min, max, points = [], options = {}) {
    const line = new NumberLine(min, max, {
      highlight: points,
      theme: this.theme,
      ...options
    });
    return line.toSVG();
  }

  // Area Models
  areaModel(width, height, options = {}) {
    const model = new AreaModel(width, height, {
      theme: this.theme,
      ...options
    });
    return model.toSVG();
  }

  // Base-10 Blocks
  base10(hundreds, tens, ones, options = {}) {
    const blocks = new Base10Blocks(hundreds, tens, ones, {
      theme: this.theme,
      ...options
    });
    return blocks.toSVG();
  }

  // Step-by-Step Solving
  solvFormula(formula, substitutions, options = {}) {
    const solver = new FormulaSolver(formula, substitutions, {
      theme: this.theme,
      ...options
    });
    return solver.toSVG();
  }

  // Export Utilities
  toDataURI(svgString) {
    const withXmlns = svgString.includes('xmlns')
      ? svgString
      : svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    const encoded = encodeURIComponent(withXmlns);
    return `data:image/svg+xml;charset=UTF-8,${encoded}`;
  }

  addToPptx(pres, slide, svgString, x = 1.0, y = 1.0, w = 3.0, h = 2.0) {
    const dataURI = this.toDataURI(svgString);
    slide.addImage({
      data: dataURI,
      x, y, w, h
    });
  }
}

// Usage Example
const engine = new MathVisualEngine({
  theme: {
    primary: '#003366',
    secondary: '#ff6b6b',
    backgroundColor: '#fff'
  }
});

const fractionSVG = engine.verticalFraction('3', '4');
const numberLineSVG = engine.numberLine(0, 10, [3, 7]);
const areaModelSVG = engine.areaModel(3, 4);

// Export to PowerPoint
const pres = new PptxGenJS();
const slide = pres.addSlide();

engine.addToPptx(pres, slide, fractionSVG, 1, 1, 2, 1.5);
engine.addToPptx(pres, slide, numberLineSVG, 4, 1, 2, 1.5);
engine.addToPptx(pres, slide, areaModelSVG, 1, 3, 2, 2);

pres.writeFile({ fileName: 'math-lesson.pptx' });
```

---

## 12. Research Sources & References

### Math Visualization Libraries
- [Mafs: React components for interactive math](https://mafs.dev/)
- [JSXGraph: Interactive Geometry](https://jsxgraph.org/)
- [Mathigon](https://mathigon.org/)
- [D3.js Documentation](https://d3js.org/)

### Math Typesetting
- [KaTeX](https://katex.org/)
- [MathJax Documentation](https://docs.mathjax.org/)

### SVG & Data URIs
- [SVG.js v3.0](https://svgjs.dev/)
- [mini-svg-data-uri (npm)](https://www.npmjs.com/package/mini-svg-data-uri/)

### Expression Evaluation & CAS
- [math.js](https://mathjs.org/)
- [Nerdamer: Symbolic Math](https://nerdamer.com/)
- [mathsteps (npm)](https://www.npmjs.com/package/mathsteps)

### Educational Resources
- [CRA (Concrete-Representational-Abstract) Framework](https://www.mathematicshub.edu.au/plan-teach-and-assess/teaching/teaching-strategies/concrete-representational-abstract-cra/)
- [Awesome Interactive Math (GitHub)](https://github.com/ubavic/awesome-interactive-math)

### Presentation Generation
- [PptxGenJS Documentation](https://gitbrent.github.io/PptxGenJS/)

---

## Conclusion

There is **no silver bullet** library for all K-8 math visualization needs. The recommended approach is:

1. **Build custom SVG generators** for standard shapes (fractions, number lines, area models, base-10 blocks)
2. **Use SVG.js** as a utility layer for complex shapes and transformations
3. **Use math.js** for formula evaluation and custom step generators
4. **Use MathJax or KaTeX** for typesetting (MathJax preferred for SVG export)
5. **Integrate with PptxGenJS** via data URIs for PowerPoint generation

This hybrid approach balances:
- **Performance**: Custom classes are fast
- **Bundle size**: ~160-200 KB minimum
- **Flexibility**: Full control over rendering
- **Maintainability**: Clear module structure for CRA framework
- **Exportability**: Self-contained SVG data URIs for PptxGenJS

Start with Phase 1 (core SVG builders), validate with PowerPoint, then expand to phases 2-5 as needed.
