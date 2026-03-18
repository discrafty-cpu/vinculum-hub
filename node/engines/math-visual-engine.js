/* ═══════════════════════════════════════════════════════════
   MATH VISUAL ENGINE — Theme-Aware SVG Generation for K-8
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   Generates crisp, self-contained SVG data URIs for PptxGenJS.
   Every visual is theme-aware and supports CRA modes
   (Concrete, Representational, Abstract).

   Dependencies: none (pure JS + inline SVG)
   Optional: math.js from CDN for formula evaluation

   Usage:
     const engine = new MathVisualEngine({ theme: PptxThemes.getSelected() });
     const img = engine.verticalFraction(3, 4);
     slide.addImage({ data: img, x: 1, y: 1, w: 2, h: 2 });
   ═══════════════════════════════════════════════════════════ */

const MathVisualEngine = (() => {
    'use strict';

    // ─── Default palette (Classic Academic light) ────────────
    const DEFAULT_COLORS = {
        bg: 'FFFFFF', text: '1E293B', textMuted: '475569',
        primary: '1E2761', secondary: 'D4870F', accent: '3B82F6',
        teal: '0D9488', pink: 'E8436D', green: '16A34A',
        card: 'F8FAFC', border: 'E2E8F0',
        gridLine: 'CBD5E1', highlight: 'D4870F',
        fillA: '0D9488', fillB: '3B82F6', fillC: 'D4870F', fillD: 'E8436D'
    };

    // ─── Helpers ─────────────────────────────────────────────

    function h(hex) { return '#' + hex; }               // hex to CSS color
    function hRgba(hex, a) {                             // hex + alpha
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    // Luminance check — returns true if color is "dark"
    function isDark(hex) {
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
    }
    // Pick text color for readability on a given bg
    function textOn(bgHex, colors) {
        return isDark(bgHex) ? (colors.text || 'E8EDF5') : (colors.text || '1E293B');
    }

    function svgToDataURI(svg) {
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    function svgOpen(w, h) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h +
               '" viewBox="0 0 ' + w + ' ' + h + '" style="font-family:Arial,Helvetica,sans-serif">';
    }

    function svgClose() { return '</svg>'; }

    // Merge user colors with defaults
    function mergeColors(theme) {
        if (!theme) return Object.assign({}, DEFAULT_COLORS);
        const tc = theme.colors || {};
        return {
            bg:        tc.bg        || DEFAULT_COLORS.bg,
            text:      tc.text      || DEFAULT_COLORS.text,
            textMuted: tc.text2     || tc.muted || DEFAULT_COLORS.textMuted,
            primary:   tc.primary   || DEFAULT_COLORS.primary,
            secondary: tc.secondary || DEFAULT_COLORS.secondary,
            accent:    tc.accent    || DEFAULT_COLORS.accent,
            teal:      tc.accent2   || tc.green || DEFAULT_COLORS.teal,
            pink:      tc.accent3   || DEFAULT_COLORS.pink,
            green:     tc.green     || tc.accent2 || DEFAULT_COLORS.green,
            card:      tc.card      || DEFAULT_COLORS.card,
            border:    tc.border    || DEFAULT_COLORS.border,
            gridLine:  tc.border    || DEFAULT_COLORS.gridLine,
            highlight: tc.secondary || DEFAULT_COLORS.highlight,
            fillA:     tc.accent2   || tc.green || DEFAULT_COLORS.fillA,
            fillB:     tc.accent    || DEFAULT_COLORS.fillB,
            fillC:     tc.secondary || DEFAULT_COLORS.fillC,
            fillD:     tc.accent3   || DEFAULT_COLORS.fillD
        };
    }


    // ═════════════════════════════════════════════════════════
    //  1. VERTICAL FRACTION (stacked numerator / denominator)
    // ═════════════════════════════════════════════════════════

    function verticalFraction(num, denom, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const fontSize = opts.fontSize || 28;
        const barColor = opts.barColor || C.primary;
        const textColor = opts.textColor || C.text;
        const w = opts.width || 80, hTotal = opts.height || 90;
        const midY = hTotal / 2;
        const gap = 4;

        let svg = svgOpen(w, hTotal);
        // Background (transparent by default)
        if (opts.showBg) svg += '<rect width="' + w + '" height="' + hTotal + '" fill="' + h(C.bg) + '"/>';
        // Numerator
        svg += '<text x="' + (w/2) + '" y="' + (midY - gap - 4) + '" text-anchor="middle" font-size="' + fontSize + '" font-weight="bold" fill="' + h(textColor) + '">' + num + '</text>';
        // Vinculum bar
        svg += '<line x1="' + (w*0.15) + '" y1="' + midY + '" x2="' + (w*0.85) + '" y2="' + midY + '" stroke="' + h(barColor) + '" stroke-width="2.5" stroke-linecap="round"/>';
        // Denominator
        svg += '<text x="' + (w/2) + '" y="' + (midY + gap + fontSize*0.8) + '" text-anchor="middle" font-size="' + fontSize + '" font-weight="bold" fill="' + h(textColor) + '">' + denom + '</text>';
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  2. FRACTION BAR (rectangle or circle model)
    // ═════════════════════════════════════════════════════════

    function fractionBar(numerator, denominator, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 480, ht = opts.height || 110;
        const pad = 24, barH = 40, barY = 44;
        const barW = w - 2 * pad;
        const label = opts.label || (numerator + '/' + denominator);

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        // Label
        svg += '<text x="' + (w/2) + '" y="28" text-anchor="middle" font-size="16" font-weight="bold" fill="' + h(C.primary) + '">' + label + '</text>';
        // Whole bar outline
        svg += '<rect x="' + pad + '" y="' + barY + '" width="' + barW + '" height="' + barH + '" fill="' + h(C.card) + '" stroke="' + h(C.border) + '" stroke-width="1.5" rx="4"/>';
        // Filled portion
        const fillW = (numerator / denominator) * barW;
        svg += '<rect x="' + pad + '" y="' + barY + '" width="' + fillW + '" height="' + barH + '" fill="' + h(C.fillA) + '" rx="4" opacity="0.75"/>';
        // Division lines
        for (let i = 1; i < denominator; i++) {
            const x = pad + (i / denominator) * barW;
            svg += '<line x1="' + x + '" y1="' + barY + '" x2="' + x + '" y2="' + (barY + barH) + '" stroke="' + h(C.text) + '" stroke-width="0.8" opacity="0.4"/>';
        }
        // Bottom label
        svg += '<text x="' + (w/2) + '" y="' + (barY + barH + 18) + '" text-anchor="middle" font-size="13" fill="' + h(C.textMuted) + '">' + numerator + ' out of ' + denominator + ' parts</text>';
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  3. FRACTION CIRCLE
    // ═════════════════════════════════════════════════════════

    function fractionCircle(numerator, denominator, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const size = opts.size || 160;
        const cx = size / 2, cy = size / 2, r = size * 0.38;

        let svg = svgOpen(size, size);
        svg += '<rect width="' + size + '" height="' + size + '" fill="' + h(C.bg) + '"/>';
        // Full circle outline
        svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + h(C.card) + '" stroke="' + h(C.border) + '" stroke-width="1.5"/>';
        // Draw shaded sectors
        for (let i = 0; i < denominator; i++) {
            const startAngle = (i / denominator) * 2 * Math.PI - Math.PI / 2;
            const endAngle = ((i + 1) / denominator) * 2 * Math.PI - Math.PI / 2;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArc = (1 / denominator) > 0.5 ? 1 : 0;
            if (i < numerator) {
                svg += '<path d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' Z" fill="' + h(C.fillA) + '" opacity="0.75"/>';
            }
            // Division line
            svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x1 + '" y2="' + y1 + '" stroke="' + h(C.text) + '" stroke-width="0.8" opacity="0.4"/>';
        }
        // Center label
        svg += '<text x="' + cx + '" y="' + (size - 8) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + numerator + '/' + denominator + '</text>';
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  4. NUMBER LINE
    // ═════════════════════════════════════════════════════════

    function numberLine(min, max, marks, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 600, ht = opts.height || 100;
        const pad = 44, lineY = ht * 0.5;
        const lineW = w - 2 * pad;
        const range = max - min;
        const label = opts.label || '';
        const highlights = opts.highlights || [];

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        // Label
        if (label) svg += '<text x="' + (w/2) + '" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.teal) + '">' + label + '</text>';
        // Main line
        svg += '<line x1="' + pad + '" y1="' + lineY + '" x2="' + (w - pad) + '" y2="' + lineY + '" stroke="' + h(C.primary) + '" stroke-width="2"/>';
        // Arrows
        svg += '<polygon points="' + (w-pad) + ',' + lineY + ' ' + (w-pad-8) + ',' + (lineY-5) + ' ' + (w-pad-8) + ',' + (lineY+5) + '" fill="' + h(C.primary) + '"/>';
        svg += '<polygon points="' + pad + ',' + lineY + ' ' + (pad+8) + ',' + (lineY-5) + ' ' + (pad+8) + ',' + (lineY+5) + '" fill="' + h(C.primary) + '"/>';
        // Ticks
        for (const m of marks) {
            const x = pad + ((m - min) / range) * lineW;
            const isHighlight = highlights.indexOf(m) >= 0;
            if (isHighlight) {
                svg += '<circle cx="' + x + '" cy="' + lineY + '" r="7" fill="' + h(C.highlight) + '"/>';
                svg += '<text x="' + x + '" y="' + (lineY + 26) + '" text-anchor="middle" font-size="13" font-weight="bold" fill="' + h(C.highlight) + '">' + m + '</text>';
            } else {
                svg += '<line x1="' + x + '" y1="' + (lineY-8) + '" x2="' + x + '" y2="' + (lineY+8) + '" stroke="' + h(C.primary) + '" stroke-width="1.5"/>';
                svg += '<text x="' + x + '" y="' + (lineY+24) + '" text-anchor="middle" font-size="12" fill="' + h(C.text) + '">' + m + '</text>';
            }
        }
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  5. AREA MODEL (decomposed multiplication)
    // ═════════════════════════════════════════════════════════

    function areaModel(a, b, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 420, ht = opts.height || 320;
        const pad = 50, topPad = 36;
        const gridW = w - 2 * pad, gridH = ht - topPad - pad;
        const label = opts.label || (a + ' × ' + b);
        const fills = [C.fillA, C.fillB, C.fillC, C.fillD];

        // Decompose into tens + ones
        const aTens = Math.floor(a / 10) * 10, aOnes = a % 10;
        const bTens = Math.floor(b / 10) * 10, bOnes = b % 10;
        const parts = [];
        if (aTens > 0 && bTens > 0) parts.push({ r: aTens, c: bTens });
        if (aTens > 0 && bOnes > 0) parts.push({ r: aTens, c: bOnes });
        if (aOnes > 0 && bTens > 0) parts.push({ r: aOnes, c: bTens });
        if (aOnes > 0 && bOnes > 0) parts.push({ r: aOnes, c: bOnes });
        const cols = (bOnes > 0 && bTens > 0) ? 2 : 1;
        const rows = (aOnes > 0 && aTens > 0) ? 2 : 1;
        const cellW = gridW / cols, cellH = gridH / rows;

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        svg += '<text x="' + (w/2) + '" y="24" text-anchor="middle" font-size="15" font-weight="bold" fill="' + h(C.primary) + '">' + label + '</text>';
        // Cells
        let idx = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (idx >= parts.length) break;
                const p = parts[idx];
                const cx = pad + c * cellW, cy = topPad + r * cellH;
                svg += '<rect x="' + cx + '" y="' + cy + '" width="' + cellW + '" height="' + cellH + '" fill="' + hRgba(fills[idx % 4], 0.2) + '" stroke="' + h(C.primary) + '" stroke-width="1.5"/>';
                svg += '<text x="' + (cx + cellW/2) + '" y="' + (cy + cellH/2 + 6) + '" text-anchor="middle" font-size="18" font-weight="bold" fill="' + h(fills[idx % 4]) + '">' + (p.r * p.c) + '</text>';
                svg += '<text x="' + (cx + cellW/2) + '" y="' + (cy + cellH/2 + 24) + '" text-anchor="middle" font-size="11" fill="' + h(C.textMuted) + '">' + p.r + ' × ' + p.c + '</text>';
                idx++;
            }
        }
        // Row/col labels
        const rowLabels = (aTens > 0 && aOnes > 0) ? [aTens, aOnes] : [a];
        const colLabels = (bTens > 0 && bOnes > 0) ? [bTens, bOnes] : [b];
        for (let r = 0; r < rowLabels.length; r++) {
            svg += '<text x="' + (pad - 8) + '" y="' + (topPad + r*cellH + cellH/2 + 5) + '" text-anchor="end" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + rowLabels[r] + '</text>';
        }
        for (let c = 0; c < colLabels.length; c++) {
            svg += '<text x="' + (pad + c*cellW + cellW/2) + '" y="' + (topPad - 6) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + colLabels[c] + '</text>';
        }
        // Total
        svg += '<text x="' + (w/2) + '" y="' + (ht - 10) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.teal) + '">= ' + (a * b) + '</text>';
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  6. PERCENT BAR
    // ═════════════════════════════════════════════════════════

    function percentBar(percent, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 500, ht = opts.height || 80;
        const pad = 24, barH = 30, barY = 30;
        const barW = w - 2 * pad;
        const label = opts.label || (percent + '%');

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        svg += '<text x="' + pad + '" y="20" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + label + '</text>';
        svg += '<rect x="' + pad + '" y="' + barY + '" width="' + barW + '" height="' + barH + '" fill="' + h(C.card) + '" stroke="' + h(C.border) + '" stroke-width="1" rx="4"/>';
        svg += '<rect x="' + pad + '" y="' + barY + '" width="' + ((percent/100)*barW) + '" height="' + barH + '" fill="' + h(C.highlight) + '" rx="4" opacity="0.75"/>';
        for (let p = 0; p <= 100; p += 25) {
            const x = pad + (p/100) * barW;
            svg += '<text x="' + x + '" y="' + (barY + barH + 15) + '" text-anchor="middle" font-size="10" fill="' + h(C.textMuted) + '">' + p + '%</text>';
        }
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  7. RATIO TABLE
    // ═════════════════════════════════════════════════════════

    function ratioTable(labelA, labelB, pairs, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const cellW = 64, cellH = 32, headW = 76;
        const w = headW + Math.min(pairs.length, 5) * cellW + 40;
        const ht = opts.title ? 100 : 84;
        const pad = 20, startY = opts.title ? 28 : 12;

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        if (opts.title) svg += '<text x="' + (w/2) + '" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="' + h(C.primary) + '">' + opts.title + '</text>';
        // Header col
        svg += '<rect x="' + pad + '" y="' + startY + '" width="' + headW + '" height="' + cellH + '" fill="' + h(C.primary) + '" rx="3"/>';
        svg += '<text x="' + (pad + headW/2) + '" y="' + (startY + 21) + '" text-anchor="middle" font-size="12" fill="white" font-weight="bold">' + labelA + '</text>';
        svg += '<rect x="' + pad + '" y="' + (startY + cellH) + '" width="' + headW + '" height="' + cellH + '" fill="' + h(C.primary) + '" rx="3"/>';
        svg += '<text x="' + (pad + headW/2) + '" y="' + (startY + cellH + 21) + '" text-anchor="middle" font-size="12" fill="white" font-weight="bold">' + labelB + '</text>';
        // Data cells
        for (let i = 0; i < Math.min(pairs.length, 5); i++) {
            const cx = pad + headW + i * cellW;
            svg += '<rect x="' + cx + '" y="' + startY + '" width="' + cellW + '" height="' + cellH + '" fill="' + hRgba(C.fillA, 0.12) + '" stroke="' + h(C.fillA) + '" stroke-width="1"/>';
            svg += '<text x="' + (cx + cellW/2) + '" y="' + (startY + 21) + '" text-anchor="middle" font-size="13" fill="' + h(C.text) + '">' + pairs[i][0] + '</text>';
            svg += '<rect x="' + cx + '" y="' + (startY + cellH) + '" width="' + cellW + '" height="' + cellH + '" fill="' + hRgba(C.fillC, 0.12) + '" stroke="' + h(C.fillC) + '" stroke-width="1"/>';
            svg += '<text x="' + (cx + cellW/2) + '" y="' + (startY + cellH + 21) + '" text-anchor="middle" font-size="13" fill="' + h(C.text) + '">' + pairs[i][1] + '</text>';
        }
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  8. TAPE DIAGRAM (bar model for word problems)
    // ═════════════════════════════════════════════════════════

    function tapeDiagram(segments, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 560, ht = opts.height || 130;
        const pad = 30, barH = 44, barY = 50;
        const barW = w - 2 * pad;
        const total = segments.reduce((s, seg) => s + (seg.value || 0), 0);
        const label = opts.label || '';
        const unknown = opts.unknown; // index of the unknown segment

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        if (label) svg += '<text x="' + (w/2) + '" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + label + '</text>';
        // Outer bar
        svg += '<rect x="' + pad + '" y="' + barY + '" width="' + barW + '" height="' + barH + '" fill="none" stroke="' + h(C.primary) + '" stroke-width="2" rx="4"/>';
        // Segments
        let xOff = pad;
        const fills = [C.fillA, C.fillB, C.fillC, C.fillD];
        segments.forEach((seg, i) => {
            const segW = (seg.value / total) * barW;
            const isUnknown = (i === unknown);
            svg += '<rect x="' + xOff + '" y="' + barY + '" width="' + segW + '" height="' + barH +
                   '" fill="' + hRgba(fills[i % 4], isUnknown ? 0.1 : 0.35) + '" stroke="' + h(C.border) + '" stroke-width="0.5"/>';
            const displayText = isUnknown ? '?' : (seg.label || seg.value);
            svg += '<text x="' + (xOff + segW/2) + '" y="' + (barY + barH/2 + 5) + '" text-anchor="middle" font-size="' + (isUnknown ? 18 : 14) + '" font-weight="bold" fill="' + h(isUnknown ? C.highlight : C.text) + '">' + displayText + '</text>';
            xOff += segW;
        });
        // Total brace below
        svg += '<text x="' + (w/2) + '" y="' + (barY + barH + 20) + '" text-anchor="middle" font-size="13" fill="' + h(C.textMuted) + '">Total: ' + total + '</text>';
        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  9. BASE-10 BLOCKS (Concrete CRA representation)
    // ═════════════════════════════════════════════════════════

    function base10Blocks(hundreds, tens, ones, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 520, ht = opts.height || 200;
        const value = hundreds * 100 + tens * 10 + ones;

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        // Title
        svg += '<text x="' + (w/2) + '" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + value + ' = ' + hundreds + ' hundreds + ' + tens + ' tens + ' + ones + ' ones</text>';

        let xOff = 20, yOff = 32;

        // Hundreds — 10×10 grid blocks
        for (let i = 0; i < Math.min(hundreds, 4); i++) {
            const bx = xOff + i * 70, by = yOff;
            // 10x10 mini grid
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 10; c++) {
                    svg += '<rect x="' + (bx + c*6) + '" y="' + (by + r*6) + '" width="5.5" height="5.5" fill="' + h(C.fillA) + '" stroke="' + h(C.bg) + '" stroke-width="0.3"/>';
                }
            }
            svg += '<text x="' + (bx + 30) + '" y="' + (by + 72) + '" text-anchor="middle" font-size="10" fill="' + h(C.textMuted) + '">100</text>';
        }

        // Tens — vertical rods
        const tensX = 20 + Math.min(hundreds, 4) * 70 + 10;
        for (let i = 0; i < Math.min(tens, 9); i++) {
            const tx = tensX + i * 14;
            for (let r = 0; r < 10; r++) {
                svg += '<rect x="' + tx + '" y="' + (yOff + r*6) + '" width="11" height="5.5" fill="' + h(C.fillB) + '" stroke="' + h(C.bg) + '" stroke-width="0.3"/>';
            }
        }
        if (tens > 0) svg += '<text x="' + (tensX + Math.min(tens,9)*7) + '" y="' + (yOff + 72) + '" text-anchor="middle" font-size="10" fill="' + h(C.textMuted) + '">' + (tens*10) + '</text>';

        // Ones — single units
        const onesX = tensX + Math.min(tens, 9) * 14 + 16;
        for (let i = 0; i < Math.min(ones, 9); i++) {
            svg += '<rect x="' + (onesX + i*10) + '" y="' + yOff + '" width="8" height="8" fill="' + h(C.fillC) + '" stroke="' + h(C.bg) + '" stroke-width="0.3" rx="1"/>';
        }
        if (ones > 0) svg += '<text x="' + (onesX + Math.min(ones,9)*5) + '" y="' + (yOff + 22) + '" text-anchor="middle" font-size="10" fill="' + h(C.textMuted) + '">' + ones + '</text>';

        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  10. STEP-BY-STEP FORMULA SOLVER
    //  Shows: Formula → Substitute → Simplify → Answer
    // ═════════════════════════════════════════════════════════

    function stepByStep(steps, opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 520;
        const rowH = 42;
        const ht = opts.height || (steps.length * rowH + 30);
        const pad = 20;

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';
        if (opts.title) {
            svg += '<text x="' + pad + '" y="20" font-size="14" font-weight="bold" fill="' + h(C.primary) + '">' + opts.title + '</text>';
        }

        const startY = opts.title ? 36 : 12;
        steps.forEach((step, i) => {
            const y = startY + i * rowH;
            const isLast = (i === steps.length - 1);
            // Step number circle
            svg += '<circle cx="' + (pad + 12) + '" cy="' + (y + 14) + '" r="10" fill="' + h(isLast ? C.teal : C.primary) + '"/>';
            svg += '<text x="' + (pad + 12) + '" y="' + (y + 18) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="white">' + (i + 1) + '</text>';
            // Label
            svg += '<text x="' + (pad + 30) + '" y="' + (y + 12) + '" font-size="11" fill="' + h(C.textMuted) + '">' + (step.label || '') + '</text>';
            // Expression
            svg += '<text x="' + (pad + 30) + '" y="' + (y + 30) + '" font-size="' + (isLast ? 18 : 16) + '" font-weight="' + (isLast ? 'bold' : 'normal') + '" fill="' + h(isLast ? C.teal : C.text) + '">' + step.expression + '</text>';
            // Arrow to next step
            if (!isLast) {
                svg += '<line x1="' + (pad + 12) + '" y1="' + (y + 26) + '" x2="' + (pad + 12) + '" y2="' + (y + rowH + 4) + '" stroke="' + h(C.border) + '" stroke-width="1" stroke-dasharray="3,2"/>';
            }
        });
        svg += svgClose();
        return svgToDataURI(svg);
    }

    // Convenience: build steps from formula + substitutions
    function formulaSolver(formula, subs, opts) {
        opts = opts || {};
        const steps = [];
        // Step 1: Formula
        steps.push({ label: 'Write the formula', expression: formula });
        // Step 2: Substitute
        let substituted = formula;
        const subParts = [];
        for (const key in subs) {
            substituted = substituted.replace(new RegExp(key, 'g'), String(subs[key]));
            subParts.push(key + ' = ' + subs[key]);
        }
        steps.push({ label: 'Substitute ' + subParts.join(', '), expression: substituted });
        // Step 3+: Try to evaluate if math.js available or do simple eval
        if (opts.intermediateSteps && Array.isArray(opts.intermediateSteps)) {
            opts.intermediateSteps.forEach(s => steps.push(s));
        }
        // Final step: result
        if (opts.result) {
            steps.push({ label: 'Answer', expression: opts.result });
        } else {
            // Try simple evaluation
            try {
                const rhs = substituted.split('=')[1] || substituted;
                const cleaned = rhs.replace(/×/g, '*').replace(/÷/g, '/').trim();
                const result = Function('"use strict"; return (' + cleaned + ')')();
                const lhs = formula.split('=')[0].trim();
                steps.push({ label: 'Calculate', expression: lhs + ' = ' + result + (opts.unit ? ' ' + opts.unit : '') });
            } catch(e) {
                // Can't evaluate — skip
            }
        }
        return stepByStep(steps, opts);
    }


    // ═════════════════════════════════════════════════════════
    //  11. WORKED EXAMPLE (Exemplar)
    //  Full problem → diagram → step-by-step → answer
    // ═════════════════════════════════════════════════════════

    function workedExample(opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const w = opts.width || 560, ht = opts.height || 340;
        const pad = 20;

        let svg = svgOpen(w, ht);
        svg += '<rect width="' + w + '" height="' + ht + '" fill="' + h(C.bg) + '"/>';

        // Title bar
        svg += '<rect x="0" y="0" width="' + w + '" height="32" fill="' + h(C.primary) + '" rx="0"/>';
        svg += '<text x="' + (w/2) + '" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="white">WORKED EXAMPLE</text>';

        // Problem statement
        let y = 48;
        svg += '<rect x="' + pad + '" y="' + y + '" width="' + (w - 2*pad) + '" height="40" fill="' + hRgba(C.highlight, 0.1) + '" stroke="' + h(C.highlight) + '" stroke-width="1.2" rx="6"/>';
        svg += '<text x="' + (pad + 12) + '" y="' + (y + 26) + '" font-size="14" fill="' + h(C.text) + '">' + (opts.problem || 'Find the area of a rectangle with l = 8 cm and w = 5 cm.') + '</text>';
        y += 54;

        // Steps
        const steps = opts.steps || [
            { label: 'Formula', text: 'A = l × w' },
            { label: 'Substitute', text: 'A = 8 × 5' },
            { label: 'Calculate', text: 'A = 40 cm²' }
        ];
        steps.forEach((step, i) => {
            const isLast = (i === steps.length - 1);
            // Step badge
            svg += '<circle cx="' + (pad + 14) + '" cy="' + (y + 12) + '" r="11" fill="' + h(isLast ? C.teal : C.accent) + '"/>';
            svg += '<text x="' + (pad + 14) + '" y="' + (y + 16) + '" text-anchor="middle" font-size="11" font-weight="bold" fill="white">' + (i+1) + '</text>';
            // Label + expression
            svg += '<text x="' + (pad + 32) + '" y="' + (y + 10) + '" font-size="11" fill="' + h(C.textMuted) + '">' + step.label + '</text>';
            svg += '<text x="' + (pad + 32) + '" y="' + (y + 28) + '" font-size="' + (isLast ? 17 : 15) + '" font-weight="' + (isLast ? 'bold' : 'normal') + '" fill="' + h(isLast ? C.teal : C.text) + '">' + step.text + '</text>';
            y += 38;
            // Connector
            if (!isLast) {
                svg += '<line x1="' + (pad+14) + '" y1="' + (y - 14) + '" x2="' + (pad+14) + '" y2="' + (y + 1) + '" stroke="' + h(C.border) + '" stroke-width="1" stroke-dasharray="3,2"/>';
            }
        });

        // Answer box
        y += 8;
        if (y + 36 < ht) {
            const answerText = opts.answer || steps[steps.length - 1].text;
            svg += '<rect x="' + pad + '" y="' + y + '" width="' + (w - 2*pad) + '" height="32" fill="' + hRgba(C.teal, 0.15) + '" stroke="' + h(C.teal) + '" stroke-width="1.5" rx="6"/>';
            svg += '<text x="' + (w/2) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="15" font-weight="bold" fill="' + h(C.teal) + '">✓ ' + answerText + '</text>';
        }

        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  12. COORDINATE PLANE
    // ═════════════════════════════════════════════════════════

    function coordinatePlane(opts) {
        opts = opts || {};
        const C = opts._colors || mergeColors(opts.theme);
        const size = opts.size || 360;
        const pad = 40;
        const gridSize = size - 2 * pad;
        const minVal = opts.min || -5, maxVal = opts.max || 5;
        const range = maxVal - minVal;
        const points = opts.points || [];

        let svg = svgOpen(size, size);
        svg += '<rect width="' + size + '" height="' + size + '" fill="' + h(C.bg) + '"/>';

        // Grid lines
        for (let i = minVal; i <= maxVal; i++) {
            const x = pad + ((i - minVal) / range) * gridSize;
            const y = pad + ((maxVal - i) / range) * gridSize;
            svg += '<line x1="' + x + '" y1="' + pad + '" x2="' + x + '" y2="' + (size - pad) + '" stroke="' + h(C.gridLine) + '" stroke-width="0.5"/>';
            svg += '<line x1="' + pad + '" y1="' + y + '" x2="' + (size - pad) + '" y2="' + y + '" stroke="' + h(C.gridLine) + '" stroke-width="0.5"/>';
            // Tick labels
            if (i !== 0) {
                svg += '<text x="' + x + '" y="' + (size - pad + 14) + '" text-anchor="middle" font-size="9" fill="' + h(C.textMuted) + '">' + i + '</text>';
                svg += '<text x="' + (pad - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="9" fill="' + h(C.textMuted) + '">' + i + '</text>';
            }
        }
        // Axes
        const originX = pad + ((0 - minVal) / range) * gridSize;
        const originY = pad + ((maxVal - 0) / range) * gridSize;
        svg += '<line x1="' + pad + '" y1="' + originY + '" x2="' + (size - pad) + '" y2="' + originY + '" stroke="' + h(C.primary) + '" stroke-width="2"/>';
        svg += '<line x1="' + originX + '" y1="' + pad + '" x2="' + originX + '" y2="' + (size - pad) + '" stroke="' + h(C.primary) + '" stroke-width="2"/>';

        // Plot points
        points.forEach(p => {
            const px = pad + ((p[0] - minVal) / range) * gridSize;
            const py = pad + ((maxVal - p[1]) / range) * gridSize;
            svg += '<circle cx="' + px + '" cy="' + py + '" r="5" fill="' + h(C.highlight) + '"/>';
            svg += '<text x="' + (px + 8) + '" y="' + (py - 6) + '" font-size="10" fill="' + h(C.highlight) + '">(' + p[0] + ',' + p[1] + ')</text>';
        });

        svg += svgClose();
        return svgToDataURI(svg);
    }


    // ═════════════════════════════════════════════════════════
    //  13. CRA DISPATCHER — picks Concrete / Representational / Abstract
    // ═════════════════════════════════════════════════════════

    function craVisual(topic, data, mode, opts) {
        opts = opts || {};
        // mode: 'concrete', 'representational', 'abstract'
        const t = topic.toLowerCase();
        if (t.includes('fraction')) {
            if (mode === 'concrete') return fractionCircle(data.num || 3, data.denom || 4, opts);
            if (mode === 'abstract') return verticalFraction(data.num || 3, data.denom || 4, opts);
            return fractionBar(data.num || 3, data.denom || 4, opts); // representational default
        }
        if (t.includes('place value') || t.includes('base') || t.includes('decimal')) {
            if (mode === 'concrete') return base10Blocks(data.hundreds || 2, data.tens || 3, data.ones || 5, opts);
            return numberLine(0, (data.hundreds||2)*100 + (data.tens||3)*10 + (data.ones||5), [0, 100, 200, 235], opts);
        }
        if (t.includes('multipli') || t.includes('area')) {
            if (mode === 'concrete') return base10Blocks(0, data.a || 3, data.b || 4, opts);
            if (mode === 'abstract') return formulaSolver('A = l × w', { l: data.a || 23, w: data.b || 15 }, opts);
            return areaModel(data.a || 23, data.b || 15, opts);
        }
        if (t.includes('ratio') || t.includes('proportion') || t.includes('rate')) {
            return ratioTable(data.labelA || 'x', data.labelB || 'y', data.pairs || [[1,3],[2,6],[3,9],[4,12]], opts);
        }
        if (t.includes('percent')) {
            return percentBar(data.percent || 75, opts);
        }
        // Default: number line
        return numberLine(data.min || 0, data.max || 10, data.marks || [0,2,4,6,8,10], opts);
    }


    // ═════════════════════════════════════════════════════════
    //  14. TOPIC VISUAL DISPATCHER (replaces old MathVisuals.getVisualsForTopic)
    // ═════════════════════════════════════════════════════════

    function getVisualsForTopic(topic, opts) {
        opts = opts || {};
        const C = mergeColors(opts.theme);
        opts._colors = C;
        const t = topic.toLowerCase();
        const visuals = [];

        if (t.includes('fraction') || t.includes('equivalen')) {
            visuals.push({ img: fractionBar(3, 4, opts), caption: 'Fraction Model' });
            visuals.push({ img: fractionCircle(3, 4, opts), caption: 'Fraction Circle' });
            visuals.push({ img: verticalFraction(3, 4, opts), caption: 'Vertical Fraction' });
        }
        if (t.includes('number line') || t.includes('locate') || t.includes('compar') || t.includes('rational') || t.includes('irrational')) {
            visuals.push({ img: numberLine(-5, 5, [-5,-4,-3,-2,-1,0,1,2,3,4,5], Object.assign({}, opts, { label: 'Number Line' })), caption: 'Number Line' });
        }
        if (t.includes('percent')) {
            visuals.push({ img: percentBar(75, Object.assign({}, opts, { label: '75% = ³⁄₄' })), caption: 'Percent Model' });
        }
        if (t.includes('ratio') || t.includes('rate') || t.includes('proportion') || t.includes('scal')) {
            visuals.push({ img: ratioTable('x', 'y', [[1,3],[2,6],[3,9],[4,12],['?','?']], Object.assign({}, opts, { title: 'Ratio Table' })), caption: 'Ratio Table' });
        }
        if (t.includes('area') || t.includes('multipli') || t.includes('circumference') || t.includes('circle')) {
            visuals.push({ img: areaModel(23, 15, opts), caption: 'Area Model' });
        }
        if (t.includes('volume')) {
            visuals.push({ img: formulaSolver('V = l × w × h', { l: 5, w: 3, h: 2 }, Object.assign({}, opts, { title: 'Volume Formula', unit: 'cm³' })), caption: 'Volume Step-by-Step' });
        }
        if (t.includes('pythagor')) {
            visuals.push({ img: formulaSolver('c² = a² + b²', { a: 3, b: 4 }, Object.assign({}, opts, {
                title: 'Pythagorean Theorem',
                intermediateSteps: [{ label: 'Square each', expression: 'c² = 9 + 16' }],
                result: 'c² = 25, so c = 5'
            })), caption: 'Pythagorean Theorem' });
        }
        if (t.includes('equation') || t.includes('solve') || t.includes('system') || t.includes('inequalit')) {
            visuals.push({ img: numberLine(-10, 10, [-10,-5,0,5,10], Object.assign({}, opts, { label: 'Solution Set', highlights: [3] })), caption: 'Solution Number Line' });
        }
        if (t.includes('coordinate') || t.includes('graph') || t.includes('plot')) {
            visuals.push({ img: coordinatePlane(Object.assign({}, opts, { points: [[2,3],[-1,4],[3,-2]] })), caption: 'Coordinate Plane' });
        }
        if (t.includes('tape') || t.includes('bar model') || t.includes('word problem')) {
            visuals.push({ img: tapeDiagram([{value:30,label:'Part A'},{value:20,label:'?'}], Object.assign({}, opts, { label: 'Tape Diagram', unknown: 1 })), caption: 'Tape Diagram' });
        }
        if (t.includes('factor') || t.includes('prime') || t.includes('gcf') || t.includes('lcm')) {
            visuals.push({ img: areaModel(12, 8, Object.assign({}, opts, { label: 'Factor Pairs: 12 × 8' })), caption: 'Factor Model' });
        }
        if (t.includes('mean') || t.includes('median') || t.includes('range') || t.includes('random') || t.includes('sample') || t.includes('inference') || t.includes('statistic')) {
            visuals.push({ img: numberLine(0, 20, [2,5,8,10,12,15,18], Object.assign({}, opts, { label: 'Data Points', highlights: [8,12] })), caption: 'Data Distribution' });
        }
        if (t.includes('place value') || t.includes('decimal') || t.includes('base')) {
            visuals.push({ img: base10Blocks(2, 3, 5, opts), caption: 'Base-10 Blocks' });
        }
        // Default
        if (visuals.length === 0) {
            visuals.push({ img: numberLine(0, 10, [0,2,4,6,8,10], Object.assign({}, opts, { label: topic })), caption: 'Number Line' });
        }
        return visuals;
    }


    // ═══════════════════════════════════════════════════════
    //  PUBLIC API
    // ═══════════════════════════════════════════════════════

    return {
        // Individual generators
        verticalFraction,
        fractionBar,
        fractionCircle,
        numberLine,
        areaModel,
        percentBar,
        ratioTable,
        tapeDiagram,
        base10Blocks,
        stepByStep,
        formulaSolver,
        workedExample,
        coordinatePlane,

        // CRA dispatcher
        craVisual,

        // Topic dispatcher (drop-in replacement for MathVisuals)
        getVisualsForTopic,

        // Utilities
        svgToDataURI,
        mergeColors,
        isDark
    };
})();
