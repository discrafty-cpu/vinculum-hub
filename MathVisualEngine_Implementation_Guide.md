# MathVisualEngine: Technical Implementation Guide
## Detailed Patterns, Examples & Production Gotchas

---

## A. SVG Dimensions & Sizing for PowerPoint

### Understanding PptxGenJS Units

PptxGenJS uses **inches** as the default unit. 1 inch = 96 pixels (screen DPI).

```javascript
// PowerPoint slide dimensions
const slide = pres.addSlide();
// Default slide: 10 inches wide × 7.5 inches tall

// Add image with PptxGenJS dimensions
slide.addImage({
  data: dataURI,
  x: 0.5,    // 0.5 inches from left
  y: 1.0,    // 1 inch from top
  w: 3.0,    // 3 inches wide
  h: 2.25    // 2.25 inches tall
});
```

### SVG to PptxGenJS Size Mapping

```javascript
// SVG created at 400×300 pixels (4×3 aspect ratio)
// Displayed in PowerPoint at 4×3 inches (preserves aspect ratio at 96 DPI)

function calculatePptxDimensions(svgWidth, svgHeight, dpi = 96) {
  return {
    pptxWidth: svgWidth / dpi,
    pptxHeight: svgHeight / dpi
  };
}

// Example
const svgDims = calculatePptxDimensions(400, 300);
// Returns { pptxWidth: 4.17, pptxHeight: 3.125 }
```

### Best Practices for SVG Size

```javascript
// For K-8 math visuals, use these standard sizes:
const SVG_SIZES = {
  SMALL: { width: 200, height: 150 },      // Fractions, single objects
  MEDIUM: { width: 400, height: 300 },     // Area models, number lines
  LARGE: { width: 600, height: 450 },      // Complex diagrams
  WIDE: { width: 500, height: 200 }        // Horizontal (tape diagrams, number lines)
};

// Generate at 2x size for clarity, then scale down in PowerPoint
const actualSVG = generateFraction('3', '4', SVG_SIZES.SMALL);
slide.addImage({
  data: svgToDataURI(actualSVG),
  x: 1.0,
  y: 1.0,
  w: 2.08,  // 200px / 96 = 2.08 inches
  h: 1.56   // 150px / 96 = 1.56 inches
});
```

---

## B. Text Rendering in SVG for Math

### Font Selection

```javascript
// Safe fonts for SVG in PowerPoint:
const SAFE_FONTS = {
  SERIF: 'Times New Roman',
  SANS: 'Arial, Helvetica, sans-serif',
  MONOSPACE: 'Courier New, monospace',
  SYSTEM: 'system-ui, -apple-system, sans-serif'
};

// DO NOT use web fonts; PowerPoint won't render them
// WRONG:
// <text font-family="Google Fonts: Roboto">...</text>

// CORRECT:
// <text font-family="Arial">...</text>

// Strategy: Generate SVGs with Arial, then override with user's theme
const fontFamily = userTheme?.fontFamily || 'Arial, sans-serif';
svg += `<text font-family="${fontFamily}" font-size="16" ...>`;
```

### Baseline & Text Alignment

```javascript
// SVG text baseline challenges
// Text in SVG uses text-baseline by default (bottom of letters)
// To center vertically, use dominant-baseline:

class TextHelper {
  static centered(x, y, text, fontSize = 16) {
    // Vertical centered
    return `<text x="${x}" y="${y}" text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="${fontSize}">${text}</text>`;
  }

  static baseline(x, y, text, fontSize = 16) {
    // Top-aligned (useful for labels)
    return `<text x="${x}" y="${y}"
                  font-size="${fontSize}">${text}</text>`;
  }

  static topAligned(x, y, text, fontSize = 16) {
    // Explicitly top-aligned
    return `<text x="${x}" y="${y}"
                  dominant-baseline="hanging"
                  font-size="${fontSize}">${text}</text>`;
  }
}

// Usage
svg += TextHelper.centered(200, 150, '3/4', 24);
```

### Math Symbols in SVG Text

```javascript
// Unicode math symbols
const MATH_SYMBOLS = {
  // Fractions & Division
  FRACTION_BAR: '──',        // U+2500
  DIVISION_SLASH: '∕',       // U+2215 (different from /)
  DIVISION_SIGN: '÷',        // U+00F7

  // Multiplication
  MULTIPLICATION_DOT: '·',   // U+00B7 (centered dot)
  MULTIPLICATION_CROSS: '×', // U+00D7
  TIMES_SIGN: '⋅',          // U+22C5

  // Exponents
  SUPERSCRIPT_2: '²',        // U+00B2
  SUPERSCRIPT_3: '³',        // U+00B3
  SUPERSCRIPT_PLUS: '⁺',     // U+207A

  // Roots
  SQUARE_ROOT: '√',          // U+221A
  CUBE_ROOT: '∛',           // U+221B

  // Comparison
  LESS_EQUAL: '≤',          // U+2264
  GREATER_EQUAL: '≥',       // U+2265
  NOT_EQUAL: '≠',           // U+2260

  // Other
  PI: 'π',                   // U+03C0
  INFINITY: '∞',             // U+221E
  PLUS_MINUS: '±'            // U+00B1
};

// Usage in formulas
function formatFormula(formula) {
  return formula
    .replace(/\*/g, MATH_SYMBOLS.MULTIPLICATION_CROSS)
    .replace(/sqrt/g, MATH_SYMBOLS.SQUARE_ROOT)
    .replace(/\*\*/g, '^');
}

// Example
const formatted = formatFormula('V = l * w * h');
// Result: V = l × w × h
```

### Superscripts & Subscripts (Hard in SVG)

```javascript
// SVG doesn't have native superscript/subscript
// Workaround: Use <tspan> elements

class MathText {
  static powerNotation(base, exponent, x, y, options = {}) {
    const baseFontSize = options.fontSize || 20;
    const expFontSize = baseFontSize * 0.7;
    const expShift = baseFontSize * 0.3;

    return `
      <text x="${x}" y="${y}" font-size="${baseFontSize}">
        ${base}
        <tspan font-size="${expFontSize}"
               baseline-shift="${expShift}">
          ${exponent}
        </tspan>
      </text>
    `;
  }

  // Alternative: use g element with transform
  static powerNotationTransform(base, exponent, x, y, options = {}) {
    const baseFontSize = options.fontSize || 20;
    const expFontSize = baseFontSize * 0.65;
    const baseWidth = base.length * baseFontSize * 0.6;

    return `
      <g>
        <text x="${x}" y="${y}" font-size="${baseFontSize}">${base}</text>
        <text x="${x + baseWidth - 5}" y="${y - baseFontSize * 0.4}"
              font-size="${expFontSize}">${exponent}</text>
      </g>
    `;
  }
}

// Usage
svg += MathText.powerNotation('x', '2', 100, 100, { fontSize: 24 });
// Renders: x²
```

---

## C. Color & Theme Management

### Theme Object Structure

```javascript
const COMPLETE_THEME = {
  // Primary palette
  primary: '#003366',           // Main color
  secondary: '#ff6b6b',         // Highlight/alert
  accent: '#4a90e2',           // Accent elements

  // Semantic colors
  textColor: '#333333',        // Main text
  textSecondary: '#666666',    // Secondary text
  backgroundColor: '#ffffff',  // SVG background
  borderColor: '#cccccc',      // Borders, grids

  // Math-specific
  correctColor: '#2ecc71',     // Correct answer
  incorrectColor: '#e74c3c',   // Wrong answer
  highlightColor: '#f39c12',   // Emphasis

  // CRA colors
  concreteColor: '#3498db',    // Physical manipulatives
  representationalColor: '#9b59b6',  // Pictorial
  abstractColor: '#34495e',    // Symbolic

  // Grid & structure
  gridColor: '#ecf0f1',        // Light background grid
  gridStrokeColor: '#bdc3c7',  // Grid lines
  majorGridColor: '#95a5a6',   // Bold grid lines

  // Typography
  fontFamily: 'Arial, sans-serif',
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    title: 28,
    display: 32
  },
  fontWeight: {
    light: 300,
    normal: 400,
    semibold: 600,
    bold: 700
  },

  // Dimensions
  strokeWidth: {
    thin: 1,
    normal: 2,
    thick: 3,
    bold: 4
  },
  padding: {
    xs: 4,
    sm: 8,
    base: 12,
    lg: 16,
    xl: 24
  },

  // Opacity
  opacity: {
    disabled: 0.5,
    subtle: 0.7,
    normal: 1.0
  }
};

// Export theme
module.exports = { COMPLETE_THEME };
```

### Theme Application Function

```javascript
function applySVGTheme(svgString, theme = COMPLETE_THEME) {
  // Create CSS definitions based on theme
  const styleBlock = `
    <defs>
      <style>
        .primary { fill: ${theme.primary}; }
        .secondary { fill: ${theme.secondary}; }
        .accent { fill: ${theme.accent}; }
        .text { font-family: ${theme.fontFamily}; fill: ${theme.textColor}; }
        .label { font-family: ${theme.fontFamily}; font-size: ${theme.fontSize.sm}px; fill: ${theme.textColor}; }
        .grid { stroke: ${theme.gridColor}; fill: none; }
        .grid-line { stroke: ${theme.gridStrokeColor}; stroke-width: ${theme.strokeWidth.thin}; }
      </style>
    </defs>
  `;

  // Insert styles after opening <svg> tag
  return svgString.replace(
    /<svg[^>]*>/,
    (match) => match + '\n' + styleBlock
  );
}

// Usage
const themedSVG = applySVGTheme(fractionSVG, userTheme);
```

### Dark Mode Support

```javascript
const LIGHT_THEME = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  gridColor: '#f0f0f0',
  gridStrokeColor: '#cccccc'
};

const DARK_THEME = {
  backgroundColor: '#1e1e1e',
  textColor: '#ffffff',
  gridColor: '#2d2d2d',
  gridStrokeColor: '#444444'
};

function getTheme(darkMode = false) {
  return darkMode ? { ...COMPLETE_THEME, ...DARK_THEME } : LIGHT_THEME;
}

// Usage
const theme = getTheme(document.documentElement.getAttribute('data-theme') === 'dark');
```

---

## D. Performance Optimization

### Batch SVG Generation

```javascript
// DON'T: Generate SVG one-by-one (slow)
const fractions = [];
for (let i = 0; i < 100; i++) {
  const frac = new VerticalFraction(i + 1, 8);
  fractions.push(frac.toSVG());
}

// DO: Pre-calculate, batch operations
class BatchSVGGenerator {
  constructor(theme) {
    this.theme = theme;
    this.cache = new Map();
  }

  generateFractions(numerators, denominator) {
    const results = [];
    for (const num of numerators) {
      const key = `frac_${num}_${denominator}`;
      if (!this.cache.has(key)) {
        const frac = new VerticalFraction(num, denominator, { theme: this.theme });
        this.cache.set(key, frac.toSVG());
      }
      results.push(this.cache.get(key));
    }
    return results;
  }

  clear() {
    this.cache.clear();
  }
}

// Usage
const generator = new BatchSVGGenerator(theme);
const fractions = generator.generateFractions([1, 2, 3, 4, 5, 6, 7, 8], 8);
```

### SVG String Optimization

```javascript
// Minify SVG for smaller data URIs
function minifySVG(svgString) {
  return svgString
    .replace(/\n/g, '')           // Remove newlines
    .replace(/>\s+</g, '><')      // Remove whitespace between tags
    .replace(/\s+/g, ' ')         // Collapse multiple spaces
    .trim();
}

// Measure size reduction
const original = fractionSVG;
const minified = minifySVG(fractionSVG);
const saving = ((1 - minified.length / original.length) * 100).toFixed(1);
console.log(`Saved ${saving}% by minification`);

// Data URI size comparison
const originalDataURI = svgToDataURI(original);
const minifiedDataURI = svgToDataURI(minified);
console.log(`Original: ${(originalDataURI.length / 1024).toFixed(2)} KB`);
console.log(`Minified: ${(minifiedDataURI.length / 1024).toFixed(2)} KB`);
```

### Lazy Loading for Large Presentations

```javascript
class LazyMathVisualEngine extends MathVisualEngine {
  constructor(options = {}) {
    super(options);
    this.maxCacheSize = options.maxCacheSize || 500;
    this.svgCache = new Map();
  }

  _getCacheKey(type, ...args) {
    return `${type}_${JSON.stringify(args)}`;
  }

  _addToCache(key, svg) {
    if (this.svgCache.size >= this.maxCacheSize) {
      const firstKey = this.svgCache.keys().next().value;
      this.svgCache.delete(firstKey);
    }
    this.svgCache.set(key, svg);
  }

  verticalFraction(num, denom, options = {}) {
    const key = this._getCacheKey('frac', num, denom, options);
    if (this.svgCache.has(key)) {
      return this.svgCache.get(key);
    }

    const frac = new VerticalFraction(num, denom, { theme: this.theme, ...options });
    const svg = frac.toSVG();
    this._addToCache(key, svg);
    return svg;
  }

  clearCache() {
    this.svgCache.clear();
  }

  getCacheStats() {
    return {
      size: this.svgCache.size,
      maxSize: this.maxCacheSize
    };
  }
}
```

---

## E. PowerPoint Integration Details

### PptxGenJS Image Options

```javascript
// Full available options for addImage
slide.addImage({
  // Image data
  data: dataURI,                // data:image/svg+xml;...
  // OR
  path: 'file.svg',             // File path (server/Node.js only)
  // OR
  url: 'https://example.com/img.svg',

  // Position & size (in inches)
  x: 0.5,
  y: 1.0,
  w: 3.0,
  h: 2.25,

  // Alternative: use percentage
  x: { type: 'percent', value: 5 },      // 5% from left
  w: { type: 'percent', value: 30 },     // 30% of slide width

  // Rotation & flipping
  rotate: 45,                   // Degrees
  flipH: false,                 // Horizontal flip
  flipV: false,                 // Vertical flip

  // Transparency & effects
  transparency: 0,              // 0-100 (0=opaque, 100=transparent)
  shadow: {
    type: 'outer',
    blur: 5,
    angle: 45,
    offset: 3,
    opacity: 0.5
  },

  // Borders
  border: {
    pt: 1,                      // Point size
    color: '000000'
  },

  // Hyperlink
  hyperlink: {
    url: 'https://example.com',
    tooltip: 'Click to visit'
  },

  // Accessibility
  alt: 'Fraction three-fourths'
});
```

### Adding Multiple Math Visuals to a Slide

```javascript
const pres = new PptxGenJS();
const slide = pres.addSlide();

// Title
slide.addText('Fractions', {
  x: 0.5, y: 0.5, w: 9, h: 0.5,
  fontSize: 32, bold: true
});

// Create visual grid
const engine = new MathVisualEngine();
const fractions = ['1/2', '2/3', '3/4', '1/4'];
const positions = [
  { x: 0.5, y: 1.2 },
  { x: 3.5, y: 1.2 },
  { x: 6.5, y: 1.2 },
  { x: 0.5, y: 3.5 }
];

fractions.forEach((frac, idx) => {
  const [num, denom] = frac.split('/');
  const svg = engine.verticalFraction(num, denom);
  const dataURI = engine.toDataURI(svg);

  slide.addImage({
    data: dataURI,
    x: positions[idx].x,
    y: positions[idx].y,
    w: 2.5,
    h: 2.0
  });

  // Add label below
  slide.addText(frac, {
    x: positions[idx].x,
    y: positions[idx].y + 2.1,
    w: 2.5,
    h: 0.4,
    align: 'center',
    fontSize: 14
  });
});

pres.writeFile({ fileName: 'fractions.pptx' });
```

### Exporting to Different Formats

```javascript
// PowerPoint
pres.writeFile({ fileName: 'presentation.pptx' });

// Download in browser
pres.write('blob').then((blob) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'presentation.pptx';
  link.click();
});

// Base64 (for transmission)
pres.write('base64').then((base64) => {
  // Send to server
  fetch('/api/save-presentation', {
    method: 'POST',
    body: JSON.stringify({ data: base64 })
  });
});

// Server-side Node.js
const pres = new PptxGenJS();
// ... add content ...
pres.writeFile({ fileName: `/tmp/generated_${Date.now()}.pptx` });
```

---

## F. Common Gotchas & Solutions

### Gotcha 1: SVG Coordinates vs. Visual Space

```javascript
// Problem: SVG uses top-left (0,0)
// Solution: Account for vertical flip

class CoordinateHelper {
  static toSVG(x, y, svgHeight) {
    // Convert from "visual" coordinates (bottom-left = 0,0)
    // to SVG coordinates (top-left = 0,0)
    return { x, y: svgHeight - y };
  }

  static toVisual(x, y, svgHeight) {
    // Reverse conversion
    return { x, y: svgHeight - y };
  }
}

// Usage
const visualCoords = { x: 100, y: 50 };
const svgCoords = CoordinateHelper.toSVG(visualCoords.x, visualCoords.y, 300);
// SVG element should be at (100, 250)
```

### Gotcha 2: Data URI Size Limits

```javascript
// Problem: Data URIs can exceed PowerPoint limits (>32KB)
// Solution: Compress or split

function checkDataURISize(dataURI) {
  const sizeKB = (dataURI.length / 1024).toFixed(2);
  const sizeOK = dataURI.length < 32 * 1024;

  console.log(`Size: ${sizeKB} KB ${sizeOK ? '✓' : '✗ (exceeds limit)'}`);
  return sizeOK;
}

// Compression strategy
function compressSVG(svgString) {
  let compressed = minifySVG(svgString);

  // Remove unnecessary attributes
  compressed = compressed.replace(/\sfill-opacity="1"/g, '');
  compressed = compressed.replace(/\sstroke-opacity="1"/g, '');
  compressed = compressed.replace(/\sfont-weight="400"/g, '');

  // Round numbers to 2 decimals
  compressed = compressed.replace(/(\d+\.\d{3,})/g, (match) => {
    return parseFloat(match).toFixed(2);
  });

  return compressed;
}

const original = engine.verticalFraction('999', '9999');
const originalURI = engine.toDataURI(original);
checkDataURISize(originalURI);  // Alert if too large

const compressed = compressSVG(original);
const compressedURI = engine.toDataURI(compressed);
checkDataURISize(compressedURI); // Should pass
```

### Gotcha 3: Special Characters in URL Encoding

```javascript
// Problem: Some characters don't encode correctly
// Solution: Proper URI encoding

function safeEncodeURI(svgString) {
  // Ensure no double-encoding
  let cleaned = svgString;

  // Encode problematic characters
  cleaned = cleaned.replace(/"/g, '%22');  // quotes
  cleaned = cleaned.replace(/#/g, '%23');  // hash
  cleaned = cleaned.replace(/'/g, '%27');  // apostrophe

  // Full encoding
  const encoded = encodeURIComponent(cleaned);

  // Some browsers need specific format
  return `data:image/svg+xml;utf8,${encoded}`;
}

// Alternative: Base64 encoding (larger but more compatible)
function svgToBase64DataURI(svgString) {
  const b64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${b64}`;
}

// Choose based on size
const utf8URI = safeEncodeURI(svgString);
const base64URI = svgToBase64DataURI(svgString);

if (utf8URI.length < base64URI.length) {
  return utf8URI;
} else {
  return base64URI;
}
```

### Gotcha 4: Fraction Bar Not Rendering in PowerPoint

```javascript
// Problem: Line elements sometimes don't render
// Solution: Use rect elements instead

class FractionBetter {
  constructor(numerator, denominator, options = {}) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.theme = options.theme || {};
    this.barThickness = options.barThickness || 2;
  }

  toSVG() {
    const width = 60;
    const height = 60;
    const barY = height / 2 - 1; // Slightly above center

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <!-- Numerator -->
        <text x="${width / 2}" y="20" text-anchor="middle" font-size="24">
          ${this.numerator}
        </text>

        <!-- Vinculum: Use rect instead of line (more reliable) -->
        <rect x="5" y="${barY}" width="${width - 10}" height="${this.barThickness}"
              fill="${this.theme.barColor || '#000'}" />

        <!-- Denominator -->
        <text x="${width / 2}" y="55" text-anchor="middle" font-size="24">
          ${this.denominator}
        </text>
      </svg>
    `;
  }
}
```

### Gotcha 5: Transforms & Rotations Don't Work Well

```javascript
// Problem: SVG transforms may not work in PowerPoint
// Solution: Pre-calculate positions instead of using transform

// AVOID:
// <g transform="translate(100, 50) rotate(45)">...</g>

// INSTEAD: Calculate positions directly
function drawRotatedGroup(elements, centerX, centerY, angle) {
  const svg = [];

  elements.forEach((el) => {
    // Calculate new position based on rotation
    const rad = (angle * Math.PI) / 180;
    const newX = centerX + el.x * Math.cos(rad) - el.y * Math.sin(rad);
    const newY = centerY + el.x * Math.sin(rad) + el.y * Math.cos(rad);

    // Draw element at new position
    svg.push(`<g transform="translate(${newX}, ${newY})">${el.content}</g>`);
  });

  return svg.join('');
}
```

---

## G. Testing & Validation

### Unit Test Template

```javascript
// test/VerticalFraction.test.js
import { VerticalFraction } from '../src/visuals/fractions.js';

describe('VerticalFraction', () => {
  test('generates valid SVG', () => {
    const frac = new VerticalFraction('3', '4');
    const svg = frac.toSVG();

    expect(svg).toContain('<svg');
    expect(svg).toContain('xmlns');
    expect(svg).toContain('3');
    expect(svg).toContain('4');
    expect(svg).toContain('<line'); // Vinculum
  });

  test('applies theme colors', () => {
    const theme = { textColor: '#ff0000', barColor: '#0000ff' };
    const frac = new VerticalFraction('1', '2', { theme });
    const svg = frac.toSVG();

    expect(svg).toContain('fill="#ff0000"');
    expect(svg).toContain('stroke="#0000ff"');
  });

  test('SVG is small enough for data URI', () => {
    const frac = new VerticalFraction('3', '4');
    const svg = frac.toSVG();
    const dataURI = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

    expect(dataURI.length).toBeLessThan(10000); // Reasonable limit
  });

  test('renders in PowerPoint', () => {
    // Integration test: Create PPTX and verify file size
    const pres = new PptxGenJS();
    const slide = pres.addSlide();

    const frac = new VerticalFraction('3', '4');
    const svg = frac.toSVG();
    const dataURI = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

    slide.addImage({ data: dataURI, x: 1, y: 1, w: 2, h: 1.5 });

    return pres.write('blob').then((blob) => {
      expect(blob.size).toBeGreaterThan(0);
      expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.presentationml.presentation');
    });
  });
});
```

### SVG Validation Checklist

```javascript
function validateSVG(svgString, filename = 'unknown') {
  const issues = [];

  // Check 1: xmlns present
  if (!svgString.includes('xmlns')) {
    issues.push('Missing xmlns attribute (required for PowerPoint data URIs)');
  }

  // Check 2: Width and height present
  if (!/<svg[^>]*width/.test(svgString)) {
    issues.push('Missing width attribute');
  }
  if (!/<svg[^>]*height/.test(svgString)) {
    issues.push('Missing height attribute');
  }

  // Check 3: No web fonts
  if (/url\(.*fonts\.googleapis\.com|url\(.*fonts\.adobe\.com/.test(svgString)) {
    issues.push('Contains web font references (won\'t work in PowerPoint)');
  }

  // Check 4: No CSS classes (only inline styles)
  if (/<style>|<link[^>]*stylesheet/.test(svgString)) {
    issues.push('Contains CSS styles (PowerPoint won\'t apply them)');
  }

  // Check 5: Data URI size
  const dataURI = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
  if (dataURI.length > 32000) {
    issues.push(`Large data URI (${(dataURI.length / 1024).toFixed(1)}KB - may cause issues)`);
  }

  // Report
  if (issues.length === 0) {
    console.log(`✓ ${filename} - All checks passed`);
    return true;
  } else {
    console.error(`✗ ${filename}:`);
    issues.forEach((issue) => console.error(`  - ${issue}`));
    return false;
  }
}

// Usage
const svg = engine.verticalFraction('3', '4');
validateSVG(svg, 'fraction-3-4');
```

---

## H. Production Checklist

```javascript
// pre-deployment.js - Run before generating final PPTX

const productionChecklist = {
  // 1. SVG Validation
  validateAllSVGs: () => {
    const visuals = generateAllVisuals();
    return visuals.every(({ svg, name }) => validateSVG(svg, name));
  },

  // 2. Theme Validation
  validateThemes: () => {
    const themes = [LIGHT_THEME, DARK_THEME];
    return themes.every((theme) => {
      const required = ['primary', 'backgroundColor', 'textColor'];
      return required.every((key) => key in theme);
    });
  },

  // 3. Performance Testing
  measureGenerationTime: () => {
    const start = performance.now();
    generateAllVisuals();
    const elapsed = performance.now() - start;

    console.log(`Generated all visuals in ${elapsed.toFixed(0)}ms`);
    return elapsed < 5000; // Should complete in under 5 seconds
  },

  // 4. PowerPoint Compatibility
  testPowerPointExport: () => {
    const pres = new PptxGenJS();
    const slide = pres.addSlide();

    // Add sample visuals
    const samples = [
      engine.verticalFraction('3', '4'),
      engine.numberLine(0, 10, [3, 7]),
      engine.areaModel(3, 4)
    ];

    samples.forEach((svg, idx) => {
      slide.addImage({
        data: engine.toDataURI(svg),
        x: 1 + idx * 3,
        y: 1,
        w: 2.5,
        h: 2
      });
    });

    return pres.write('blob').then((blob) => {
      console.log(`Generated test PPTX: ${(blob.size / 1024).toFixed(0)}KB`);
      return blob.size > 0;
    });
  },

  // 5. Browser Compatibility
  checkBrowserSupport: () => {
    const supported = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const userAgent = navigator.userAgent;
    return supported.some((browser) => userAgent.includes(browser));
  },

  runAll: function () {
    console.log('Running production checklist...\n');

    const checks = [
      ['SVG Validation', this.validateAllSVGs],
      ['Theme Validation', this.validateThemes],
      ['Performance Testing', this.measureGenerationTime],
      ['PowerPoint Export', this.testPowerPointExport],
      ['Browser Support', this.checkBrowserSupport]
    ];

    const results = checks.map(([name, fn]) => {
      try {
        const passed = fn();
        console.log(`${passed ? '✓' : '✗'} ${name}`);
        return passed;
      } catch (err) {
        console.error(`✗ ${name}: ${err.message}`);
        return false;
      }
    });

    const allPassed = results.every((r) => r);
    console.log(`\n${allPassed ? 'All checks passed!' : 'Some checks failed.'}`);
    return allPassed;
  }
};

// Run before deployment
if (productionChecklist.runAll()) {
  console.log('Safe to deploy!');
} else {
  console.error('Fix issues before deploying.');
  process.exit(1);
}
```

---

## I. Quick Reference: Common Patterns

### Generate fraction bar (circle)

```javascript
function fractionCircle(total, shaded, radius = 30) {
  const svg = [];
  const anglePerPart = (2 * Math.PI) / total;

  svg.push(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`);

  for (let i = 0; i < total; i++) {
    const startAngle = i * anglePerPart;
    const endAngle = (i + 1) * anglePerPart;

    const x1 = 40 + radius * Math.cos(startAngle - Math.PI / 2);
    const y1 = 40 + radius * Math.sin(startAngle - Math.PI / 2);
    const x2 = 40 + radius * Math.cos(endAngle - Math.PI / 2);
    const y2 = 40 + radius * Math.sin(endAngle - Math.PI / 2);

    const color = i < shaded ? '#ff6b6b' : '#e0e0e0';
    const pathData = `M 40 40 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    svg.push(`<path d="${pathData}" fill="${color}" stroke="#000" stroke-width="1" />`);
  }

  svg.push('</svg>');
  return svg.join('');
}
```

### Generate simple coordinate plane

```javascript
function coordinatePlane(xMin, xMax, yMin, yMax, gridSpacing = 1) {
  const padding = 40;
  const pixelsPerUnit = 30;
  const width = (xMax - xMin) * pixelsPerUnit + 2 * padding;
  const height = (yMax - yMin) * pixelsPerUnit + 2 * padding;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

  // Grid
  for (let x = xMin; x <= xMax; x += gridSpacing) {
    const px = padding + (x - xMin) * pixelsPerUnit;
    svg += `<line x1="${px}" y1="${padding}" x2="${px}" y2="${height - padding}"
                   stroke="#ddd" stroke-width="1" />`;
  }

  for (let y = yMin; y <= yMax; y += gridSpacing) {
    const py = padding + (yMax - y) * pixelsPerUnit;
    svg += `<line x1="${padding}" y1="${py}" x2="${width - padding}" y2="${py}"
                   stroke="#ddd" stroke-width="1" />`;
  }

  // Axes
  const originX = padding + (0 - xMin) * pixelsPerUnit;
  const originY = padding + (yMax - 0) * pixelsPerUnit;

  svg += `<line x1="${originX}" y1="${padding}" x2="${originX}" y2="${height - padding}"
                 stroke="#000" stroke-width="2" />`; // Y-axis
  svg += `<line x1="${padding}" y1="${originY}" x2="${width - padding}" y2="${originY}"
                 stroke="#000" stroke-width="2" />`; // X-axis

  svg += '</svg>';
  return svg;
}
```

---

## Conclusion

This implementation guide provides:
1. Specific patterns for all major visual types
2. Solutions to common PowerPoint rendering issues
3. Performance optimization techniques
4. Production-ready validation & testing
5. Ready-to-use code snippets

Use alongside the main research report for complete MathVisualEngine implementation.
