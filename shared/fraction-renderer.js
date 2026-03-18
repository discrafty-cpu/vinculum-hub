/**
 * FractionRenderer — Converts inline text fractions to proper vertical notation
 *
 * Vinculum Design Principle: ALL fractions display as stacked n/d with a visible
 * vinculum (horizontal bar). Cross-multiplication and butterfly methods are excluded.
 * The identity property (n/n = 1, the "Giant One") is the universal engine.
 *
 * Three render targets:
 *   1. HTML  — Uses <span> elements with CSS for stacked display
 *   2. PPTX  — Uses PptxGenJS text runs with fontSize adjustments
 *   3. PDF   — Uses jsPDF drawing commands for stacked numerator/denominator
 *
 * Also provides:
 *   - invisibleOne(n)    → renders  n/1  (makes the invisible denominator visible)
 *   - giantOne(n)        → renders  n/n = 1  (the identity property)
 *   - complexFraction()  → renders  (a/b) / (c/d)
 *
 * IIFE pattern, zero server dependencies.
 */

const FractionRenderer = (() => {

    // ════════════════════════════════════════════════
    //  FRACTION DETECTION
    // ════════════════════════════════════════════════

    // Matches fractions like 3/4, -2/3, 11/20, x/8, 3x/4y
    // Does NOT match dates (3/15/2026), URLs, or file paths
    const FRACTION_REGEX = /(?<!\d\/\d*|[:\w.\/])(-?\d*[a-z]?\d*)\/(\d+[a-z]?)(?!\/|\d|[.\w])/gi;

    // More conservative: only numeric fractions like 3/4, 12/5
    const NUMERIC_FRACTION_REGEX = /(?<![:\w.\/])(-?\d+)\/(\d+)(?!\/|\d|[.\w])/g;

    /**
     * Find all fractions in a text string
     * @param {string} text
     * @param {boolean} algebraic - if true, also match x/8 style
     * @returns {Array<{match, numerator, denominator, index}>}
     */
    function findFractions(text) {
        if (!text || typeof text !== 'string') return [];
        const results = [];
        const regex = new RegExp(NUMERIC_FRACTION_REGEX.source, 'g');
        let m;
        while ((m = regex.exec(text)) !== null) {
            // Skip if it looks like a date (digits/digits/digits)
            const before = text.substring(Math.max(0, m.index - 5), m.index);
            const after = text.substring(m.index + m[0].length, m.index + m[0].length + 5);
            if (/\d\/$/.test(before) || /^\/\d/.test(after)) continue;

            results.push({
                match: m[0],
                numerator: m[1],
                denominator: m[2],
                index: m.index
            });
        }
        return results;
    }


    // ════════════════════════════════════════════════
    //  HTML RENDERING
    // ════════════════════════════════════════════════

    /**
     * CSS class definitions for fraction display.
     * Inject once into document <head> or <style> block.
     */
    const CSS = `
.vfrac {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    vertical-align: middle;
    margin: 0 3px;
    line-height: 1;
    font-family: 'Georgia', 'Times New Roman', serif;
}
.vfrac .vfrac-num,
.vfrac .vfrac-den {
    display: block;
    text-align: center;
    padding: 1px 4px;
    font-size: 0.82em;
    line-height: 1.2;
}
.vfrac .vfrac-bar {
    display: block;
    width: 100%;
    height: 1.5px;
    background: currentColor;
    margin: 1px 0;
    min-width: 1.2em;
}
.vfrac-giant-label {
    font-size: 0.65em;
    color: #0d9488;
    margin-left: 2px;
    vertical-align: middle;
}
.vfrac-complex {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    vertical-align: middle;
    margin: 0 4px;
}
.vfrac-complex .vfrac-bar {
    height: 2.5px;
    min-width: 3em;
}`;

    /**
     * Render a single fraction as an HTML span
     * @param {string|number} num - numerator
     * @param {string|number} den - denominator
     * @param {object} opts - { highlight, label }
     */
    function toHTML(num, den, opts = {}) {
        const label = opts.label ? `<span class="vfrac-giant-label">${opts.label}</span>` : '';
        const cls = opts.highlight ? ' style="color:#0d9488;font-weight:700;"' : '';
        return `<span class="vfrac"${cls}><span class="vfrac-num">${num}</span><span class="vfrac-bar"></span><span class="vfrac-den">${den}</span></span>${label}`;
    }

    /**
     * Render the "invisible one": n → n/1
     */
    function invisibleOneHTML(n) {
        return toHTML(n, 1, { highlight: true, label: '' });
    }

    /**
     * Render the "giant one": n/n = 1
     */
    function giantOneHTML(n) {
        return toHTML(n, n, { highlight: true, label: '= 1' });
    }

    /**
     * Render a complex fraction: (a/b) / (c/d)
     */
    function complexFractionHTML(a, b, c, d) {
        const top = toHTML(a, b);
        const bot = toHTML(c, d);
        return `<span class="vfrac-complex"><span class="vfrac-num">${top}</span><span class="vfrac-bar"></span><span class="vfrac-den">${bot}</span></span>`;
    }

    /**
     * Replace all inline fractions in a text string with HTML vertical fractions
     * @param {string} text - input text containing "3/4" style fractions
     * @returns {string} - HTML with vertical fraction spans
     */
    function convertTextToHTML(text) {
        if (!text) return text;
        return text.replace(NUMERIC_FRACTION_REGEX, (match, num, den) => {
            return toHTML(num, den);
        });
    }

    /**
     * Inject the fraction CSS into the document if not already present
     */
    function injectCSS() {
        if (typeof document === 'undefined') return;
        if (document.getElementById('vinculum-fraction-css')) return;
        const style = document.createElement('style');
        style.id = 'vinculum-fraction-css';
        style.textContent = CSS;
        document.head.appendChild(style);
    }


    // ════════════════════════════════════════════════
    //  PPTX RENDERING (PptxGenJS text runs)
    // ════════════════════════════════════════════════

    /**
     * Convert a fraction to PptxGenJS text runs for vertical stacking.
     * PptxGenJS doesn't support true MathML, so we use a visual approximation:
     * smaller font numerator, bar character, smaller font denominator.
     *
     * @param {string|number} num
     * @param {string|number} den
     * @param {object} opts - { fontSize, fontFace, color }
     * @returns {Array} - Array of PptxGenJS text run objects
     */
    function toPptxRuns(num, den, opts = {}) {
        const baseFontSize = opts.fontSize || 14;
        const fracSize = Math.round(baseFontSize * 0.72);
        const fontFace = opts.fontFace || 'Calibri';
        const color = opts.color || '1E293B';

        return [
            // Superscript numerator
            { text: String(num), options: { fontSize: fracSize, fontFace, color, superscript: true } },
            // Vinculum (fraction slash rendered as unicode fraction bar)
            { text: '\u2044', options: { fontSize: baseFontSize, fontFace, color } },
            // Subscript denominator
            { text: String(den), options: { fontSize: fracSize, fontFace, color, subscript: true } },
        ];
    }

    /**
     * Convert text containing inline fractions to PptxGenJS text run arrays.
     * Non-fraction text becomes regular runs; fractions become sup/sub runs.
     *
     * @param {string} text
     * @param {object} opts - { fontSize, fontFace, color }
     * @returns {Array} - Array of PptxGenJS text run objects
     */
    function convertTextToPptxRuns(text, opts = {}) {
        if (!text) return [{ text: '', options: {} }];
        const baseFontSize = opts.fontSize || 14;
        const fontFace = opts.fontFace || 'Calibri';
        const color = opts.color || '1E293B';

        const runs = [];
        let lastIndex = 0;
        const regex = new RegExp(NUMERIC_FRACTION_REGEX.source, 'g');
        let m;

        while ((m = regex.exec(text)) !== null) {
            // Text before the fraction
            if (m.index > lastIndex) {
                runs.push({
                    text: text.substring(lastIndex, m.index),
                    options: { fontSize: baseFontSize, fontFace, color }
                });
            }
            // The fraction itself
            runs.push(...toPptxRuns(m[1], m[2], opts));
            lastIndex = m.index + m[0].length;
        }

        // Remaining text after last fraction
        if (lastIndex < text.length) {
            runs.push({
                text: text.substring(lastIndex),
                options: { fontSize: baseFontSize, fontFace, color }
            });
        }

        return runs.length > 0 ? runs : [{ text, options: { fontSize: baseFontSize, fontFace, color } }];
    }


    // ════════════════════════════════════════════════
    //  PDF RENDERING (jsPDF drawing)
    // ════════════════════════════════════════════════

    /**
     * Draw a vertical fraction in a jsPDF document at (x, y).
     * Returns the width consumed so the caller can advance the x cursor.
     *
     * @param {jsPDF} pdf
     * @param {string|number} num
     * @param {string|number} den
     * @param {number} x - left edge
     * @param {number} y - baseline of surrounding text
     * @param {object} opts - { fontSize, color }
     * @returns {number} width consumed in pts
     */
    function drawPDFFraction(pdf, num, den, x, y, opts = {}) {
        const baseFontSize = opts.fontSize || 11;
        const fracFontSize = baseFontSize * 0.78;
        const color = opts.color || [30, 41, 59];

        // Measure text widths
        pdf.setFontSize(fracFontSize);
        const numWidth = pdf.getStringUnitWidth(String(num)) * fracFontSize / pdf.internal.scaleFactor;
        const denWidth = pdf.getStringUnitWidth(String(den)) * fracFontSize / pdf.internal.scaleFactor;
        const maxWidth = Math.max(numWidth, denWidth);
        const totalWidth = maxWidth + 6; // padding

        const centerX = x + totalWidth / 2;

        // Numerator (above baseline)
        pdf.setFontSize(fracFontSize);
        if (Array.isArray(color)) pdf.setTextColor(color[0], color[1], color[2]);
        else pdf.setTextColor(color);
        pdf.text(String(num), centerX - numWidth / 2, y - baseFontSize * 0.35);

        // Vinculum bar
        const barY = y - baseFontSize * 0.18;
        if (Array.isArray(color)) pdf.setDrawColor(color[0], color[1], color[2]);
        else pdf.setDrawColor(color);
        pdf.setLineWidth(0.6);
        pdf.line(x + 1, barY, x + totalWidth - 1, barY);

        // Denominator (below baseline)
        pdf.text(String(den), centerX - denWidth / 2, y + baseFontSize * 0.22);

        return totalWidth;
    }

    /**
     * Draw text with inline fractions converted to vertical stacked notation.
     * Plain text renders normally; detected fractions render with drawPDFFraction.
     *
     * @param {jsPDF} pdf
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {object} opts - { fontSize, color, font, maxWidth }
     * @returns {number} - total width consumed
     */
    function drawPDFTextWithFractions(pdf, text, x, y, opts = {}) {
        if (!text) return 0;
        const baseFontSize = opts.fontSize || 11;
        const color = opts.color || [30, 41, 59];
        const font = opts.font || 'helvetica';

        let cursorX = x;
        let lastIndex = 0;
        const regex = new RegExp(NUMERIC_FRACTION_REGEX.source, 'g');
        let m;

        while ((m = regex.exec(text)) !== null) {
            // Draw text before the fraction
            if (m.index > lastIndex) {
                const segment = text.substring(lastIndex, m.index);
                pdf.setFontSize(baseFontSize);
                pdf.setFont(font, 'normal');
                if (Array.isArray(color)) pdf.setTextColor(color[0], color[1], color[2]);
                else pdf.setTextColor(color);
                pdf.text(segment, cursorX, y);
                cursorX += pdf.getStringUnitWidth(segment) * baseFontSize / pdf.internal.scaleFactor;
            }

            // Draw the fraction
            const fracWidth = drawPDFFraction(pdf, m[1], m[2], cursorX, y, { fontSize: baseFontSize, color });
            cursorX += fracWidth;
            lastIndex = m.index + m[0].length;
        }

        // Remaining text
        if (lastIndex < text.length) {
            const segment = text.substring(lastIndex);
            pdf.setFontSize(baseFontSize);
            pdf.setFont(font, 'normal');
            if (Array.isArray(color)) pdf.setTextColor(color[0], color[1], color[2]);
            else pdf.setTextColor(color);
            pdf.text(segment, cursorX, y);
            cursorX += pdf.getStringUnitWidth(segment) * baseFontSize / pdf.internal.scaleFactor;
        }

        return cursorX - x;
    }


    // ════════════════════════════════════════════════
    //  VINCULUM THINKING HELPERS
    // ════════════════════════════════════════════════

    /**
     * Generate the "invisible one" step: n → n/1
     * @returns {object} { before, after, explanation }
     */
    function invisibleOne(n) {
        return {
            before: String(n),
            after: { num: n, den: 1 },
            explanation: `Every whole number has a denominator of 1. ${n} = ${n}/1`
        };
    }

    /**
     * Generate the "giant one" multiplication step
     * @param {number} num - numerator of original fraction
     * @param {number} den - denominator of original fraction
     * @param {number} factor - the n in n/n
     * @returns {object} { original, giantOne, result, explanation }
     */
    function giantOne(num, den, factor) {
        return {
            original: { num, den },
            giantOne: { num: factor, den: factor },
            result: { num: num * factor, den: den * factor },
            explanation: `${num}/${den} × ${factor}/${factor} = ${num * factor}/${den * factor}. ` +
                        `We multiplied by ${factor}/${factor} which equals 1, so the value didn't change.`
        };
    }

    /**
     * Generate a complex fraction simplification
     * @returns {object} steps showing (a/b)/(c/d) = a/b × d/c
     */
    function complexFraction(a, b, c, d) {
        const resultNum = a * d;
        const resultDen = b * c;
        const gcd = _gcd(Math.abs(resultNum), Math.abs(resultDen));
        return {
            complex: { topNum: a, topDen: b, botNum: c, botDen: d },
            step1: `(${a}/${b}) ÷ (${c}/${d})`,
            step2: `${a}/${b} × ${d}/${c}`,
            step3: { num: resultNum, den: resultDen },
            simplified: gcd > 1 ? { num: resultNum / gcd, den: resultDen / gcd } : null,
            explanation: `A fraction divided by a fraction: multiply by the reciprocal. ` +
                        `This is the Giant One in action — we multiply top and bottom by ${d}/${c}.`
        };
    }

    function _gcd(a, b) { return b === 0 ? a : _gcd(b, a % b); }


    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        // Detection
        findFractions,

        // HTML
        CSS,
        injectCSS,
        toHTML,
        convertTextToHTML,
        invisibleOneHTML,
        giantOneHTML,
        complexFractionHTML,

        // PPTX
        toPptxRuns,
        convertTextToPptxRuns,

        // PDF
        drawPDFFraction,
        drawPDFTextWithFractions,

        // Vinculum thinking
        invisibleOne,
        giantOne,
        complexFraction
    };

})();

// Expose on window so IIFE-pattern modules (e.g. LayoutEngine) can find it via root.FractionRenderer
if (typeof window !== 'undefined') window.FractionRenderer = FractionRenderer;
