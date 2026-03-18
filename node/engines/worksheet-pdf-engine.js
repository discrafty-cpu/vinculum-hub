/**
 * WorksheetPDFEngine - Client-side differentiated PDF worksheet generator
 *
 * Generates 6 levels of math worksheets from analyzed lesson data:
 *   L1: Foundational (SPED-Modified) — concrete CRA, large font, visual models, sentence starters
 *   L2: Supported (SPED-Accommodated) — C→R bridge, worked examples, step prompts
 *   L3: Scaffolded (ELL + Approaching) — full CRA + language scaffolds, bilingual vocab
 *   L4: Grade-Level (On Track) — standard difficulty, DOK 1-2-3 mix, self-check
 *   L5: Enriched (Exceeding) — DOK 2-3, explain reasoning, real-world extension
 *   L6: Advanced (Extending) — DOK 3 + open-ended, proof/justification, create-your-own
 *
 * Dependencies: jsPDF (CDN), ProblemGenerator, MathVisualEngine (optional)
 * IIFE pattern, zero server dependencies
 */

const WorksheetPDFEngine = (() => {
    // ════════════════════════════════════════════════
    //  CONSTANTS
    // ════════════════════════════════════════════════
    const PAGE_W = 612;   // US Letter in points (8.5")
    const PAGE_H = 792;   // US Letter in points (11")
    const MARGIN = 50;
    const CONTENT_W = PAGE_W - MARGIN * 2;
    const LINE_H = 14;    // default line height in points

    // Level metadata
    const LEVELS = {
        1: { name: 'Foundational', tag: 'SPED-Modified', color: [13, 148, 136], dotColor: [13, 148, 136],
             problemCount: 4, fontSize: 13, workSpaceH: 90, showVisuals: true, showSentenceFrames: true,
             showWorkedExample: true, workedExampleCRA: 'concrete', dokMix: [1], scaffoldBar: true },
        2: { name: 'Supported', tag: 'SPED-Accommodated', color: [59, 130, 246], dotColor: [59, 130, 246],
             problemCount: 5, fontSize: 12, workSpaceH: 75, showVisuals: true, showSentenceFrames: true,
             showWorkedExample: true, workedExampleCRA: 'representational', dokMix: [1, 1, 1, 2], scaffoldBar: true },
        3: { name: 'Scaffolded', tag: 'ELL + Approaching', color: [212, 135, 15], dotColor: [212, 135, 15],
             problemCount: 5, fontSize: 11.5, workSpaceH: 65, showVisuals: 'partial', showSentenceFrames: true,
             showWorkedExample: true, workedExampleCRA: 'abstract', dokMix: [1, 1, 2, 2], scaffoldBar: true },
        4: { name: 'Grade-Level', tag: 'On Track', color: [30, 39, 97], dotColor: [30, 39, 97],
             problemCount: 6, fontSize: 11, workSpaceH: 55, showVisuals: false, showSentenceFrames: false,
             showWorkedExample: true, workedExampleCRA: 'brief', dokMix: [1, 1, 2, 2, 3], scaffoldBar: false },
        5: { name: 'Enriched', tag: 'Exceeding', color: [124, 58, 237], dotColor: [124, 58, 237],
             problemCount: 6, fontSize: 11, workSpaceH: 50, showVisuals: false, showSentenceFrames: false,
             showWorkedExample: false, workedExampleCRA: null, dokMix: [2, 2, 3, 3], scaffoldBar: false },
        6: { name: 'Advanced', tag: 'Extending', color: [232, 67, 109], dotColor: [232, 67, 109],
             problemCount: 7, fontSize: 11, workSpaceH: 45, showVisuals: false, showSentenceFrames: false,
             showWorkedExample: false, workedExampleCRA: null, dokMix: [3, 3, 3], scaffoldBar: false }
    };

    // ════════════════════════════════════════════════
    //  PDF DRAWING HELPERS
    // ════════════════════════════════════════════════

    function setColor(pdf, rgb) {
        pdf.setTextColor(rgb[0], rgb[1], rgb[2]);
    }
    function setFillColor(pdf, rgb) {
        pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
    }
    function setDrawColor(pdf, rgb) {
        pdf.setDrawColor(rgb[0], rgb[1], rgb[2]);
    }

    function drawLine(pdf, x1, y1, x2, y2, color, width) {
        setDrawColor(pdf, color || [200, 200, 200]);
        pdf.setLineWidth(width || 0.5);
        pdf.line(x1, y1, x2, y2);
    }

    function drawRect(pdf, x, y, w, h, opts = {}) {
        if (opts.fill) { setFillColor(pdf, opts.fill); }
        if (opts.stroke) { setDrawColor(pdf, opts.stroke); pdf.setLineWidth(opts.lineWidth || 0.5); }
        const style = opts.fill && opts.stroke ? 'FD' : opts.fill ? 'F' : 'S';
        if (opts.radius) {
            pdf.roundedRect(x, y, w, h, opts.radius, opts.radius, style);
        } else {
            pdf.rect(x, y, w, h, style);
        }
    }

    // Wrap text to fit width, return array of lines
    function wrapText(pdf, text, maxWidth) {
        if (!text) return [''];
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const word of words) {
            const test = line ? line + ' ' + word : word;
            if (pdf.getTextWidth(test) > maxWidth && line) {
                lines.push(line);
                line = word;
            } else {
                line = test;
            }
        }
        if (line) lines.push(line);
        return lines.length ? lines : [''];
    }

    // Draw wrapped text, return new Y position
    function drawWrappedText(pdf, text, x, y, maxWidth, lineH) {
        const lines = wrapText(pdf, text, maxWidth);
        const lh = lineH || LINE_H;
        for (const line of lines) {
            if (y > PAGE_H - MARGIN - 10) { pdf.addPage(); y = MARGIN + 10; }
            pdf.text(line, x, y);
            y += lh;
        }
        return y;
    }

    // ════════════════════════════════════════════════
    //  HEADER & FOOTER
    // ════════════════════════════════════════════════

    function drawHeader(pdf, title, topic, level, levelMeta, benchmarkInfo) {
        const col = levelMeta.color;

        // Color bar at top
        setFillColor(pdf, col);
        pdf.rect(0, 0, PAGE_W, 8, 'F');

        // Level dot (discreet, top-right)
        setFillColor(pdf, col);
        pdf.circle(PAGE_W - MARGIN - 5, 22, 5, 'F');
        pdf.setFontSize(7);
        setColor(pdf, [255, 255, 255]);
        pdf.setFont('helvetica', 'bold');
        pdf.text('L' + level, PAGE_W - MARGIN - 8.2, 24.5);

        // Title
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        pdf.text(title || 'Math Practice', MARGIN, 28);

        // Topic subtitle — enriched with benchmark cluster label when available
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [100, 116, 139]);
        const topicText = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '';
        const clusterLabel = benchmarkInfo && benchmarkInfo.clusterLabel ? ` — ${benchmarkInfo.clusterLabel}` : '';
        pdf.text(topicText + clusterLabel, MARGIN, 40);

        // Benchmark code (small, right-aligned under the level dot)
        if (benchmarkInfo && benchmarkInfo.primaryBenchmark) {
            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, [148, 163, 184]);
            const bmText = benchmarkInfo.primaryBenchmark;
            pdf.text(bmText, PAGE_W - MARGIN - pdf.getTextWidth(bmText), 40);
        }

        // Name / Date line
        pdf.setFontSize(9);
        setColor(pdf, [148, 163, 184]);
        pdf.text('Name: ________________________________', MARGIN, 54);
        pdf.text('Date: _______________', PAGE_W - MARGIN - 120, 54);

        // Thin accent line
        drawLine(pdf, MARGIN, 60, PAGE_W - MARGIN, 60, col, 1);

        return 68; // return Y position after header
    }

    function drawFooter(pdf, pageNum, levelMeta, standards, benchmarkInfo) {
        const y = PAGE_H - 25;
        drawLine(pdf, MARGIN, y, PAGE_W - MARGIN, y, levelMeta.color, 0.5);

        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [148, 163, 184]);
        pdf.text('The Lesson Digester  |  Level ' + levelMeta.name, MARGIN, y + 10);

        // v2.0: Show multi-framework benchmark codes when available
        let stdText = '';
        if (benchmarkInfo && benchmarkInfo.benchmarkCodes) {
            const codes = benchmarkInfo.benchmarkCodes;
            const parts = [];
            if (codes.MN07 && codes.MN07[0]) parts.push('MN: ' + codes.MN07[0]);
            if (codes.CCSS && codes.CCSS[0]) parts.push('CC: ' + codes.CCSS[0]);
            if (codes.TEKS && codes.TEKS[0]) parts.push('TX: ' + codes.TEKS[0]);
            stdText = parts.join('  \u2022  ');
        } else if (standards && standards.length > 0) {
            stdText = standards.slice(0, 3).map(s => s.code).join('  \u2022  ');
        }

        if (stdText) {
            pdf.text(stdText, PAGE_W - MARGIN - pdf.getTextWidth(stdText), y + 10);
        }
    }

    // ════════════════════════════════════════════════
    //  VOCABULARY BOX (L1-L4)
    // ════════════════════════════════════════════════

    function drawVocabularyBox(pdf, y, topic, level, analysis) {
        if (level > 4) return y; // L5-L6 skip vocab

        // Get vocabulary from teaching insights
        let vocabTerms = [];
        if (analysis && analysis.insights) {
            const insight = analysis.insights[topic];
            if (insight && insight.essential_understandings) {
                // Extract key terms (first 2-3 words from each understanding)
                vocabTerms = insight.essential_understandings.slice(0, 3).map(u => {
                    const words = u.split(' ').slice(0, 4).join(' ');
                    return { term: words, definition: u };
                });
            }
        }

        // Also pull from prerequisite skills
        if (typeof PREREQUISITE_SKILLS !== 'undefined') {
            for (const [key, data] of Object.entries(PREREQUISITE_SKILLS)) {
                if (topic.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(topic.toLowerCase().split(' ')[0])) {
                    if (data.vocabulary) {
                        vocabTerms = data.vocabulary.slice(0, level <= 2 ? 4 : 3).map(v =>
                            typeof v === 'string' ? { term: v, definition: '' } : v
                        );
                    }
                    break;
                }
            }
        }

        if (vocabTerms.length === 0) return y;

        const boxH = level <= 2 ? 55 : 42;
        const col = LEVELS[level].color;

        // Box background
        drawRect(pdf, MARGIN, y, CONTENT_W, boxH, {
            fill: [240, 253, 250], stroke: col, lineWidth: 0.8, radius: 4
        });

        // Header
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        const vocabLabel = level === 3 ? 'KEY VOCABULARY  |  VOCABULARIO' : 'KEY VOCABULARY';
        pdf.text(vocabLabel, MARGIN + 8, y + 12);

        // Terms
        pdf.setFontSize(level <= 2 ? 9.5 : 8.5);
        let termY = y + 22;
        const termX = MARGIN + 10;

        for (const v of vocabTerms) {
            if (termY > y + boxH - 8) break;
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [30, 41, 59]);
            const termText = v.term + (v.definition ? ':  ' : '');
            pdf.text(termText, termX, termY);

            if (v.definition) {
                const termW = pdf.getTextWidth(termText);
                pdf.setFont('helvetica', 'normal');
                setColor(pdf, [71, 85, 105]);
                const defText = v.definition.length > 80 ? v.definition.substring(0, 77) + '...' : v.definition;
                pdf.text(defText, termX + termW, termY);
            }
            termY += level <= 2 ? 13 : 11;
        }

        // L3: Home language column
        if (level === 3) {
            const langX = PAGE_W - MARGIN - 100;
            drawLine(pdf, langX - 5, y + 16, langX - 5, y + boxH - 5, [200, 220, 210], 0.3);
            pdf.setFontSize(7);
            setColor(pdf, [148, 163, 184]);
            pdf.setFont('helvetica', 'italic');
            pdf.text('Mi idioma:', langX, y + 22);
            // Blank lines for home language
            for (let i = 0; i < 3; i++) {
                drawLine(pdf, langX, y + 30 + i * 10, PAGE_W - MARGIN - 8, y + 30 + i * 10, [200, 210, 220], 0.3);
            }
        }

        return y + boxH + 8;
    }

    // ════════════════════════════════════════════════
    //  WORKED EXAMPLE (L1-L4)
    // ════════════════════════════════════════════════

    function drawWorkedExample(pdf, y, topic, level, problems) {
        if (!LEVELS[level].showWorkedExample || !problems || problems.length === 0) return y;

        const col = LEVELS[level].color;
        const seed = problems[0]; // Use first problem as worked example basis

        // Estimate box height
        const isCompact = level === 4;
        const boxH = isCompact ? 60 : 85;

        if (y + boxH > PAGE_H - MARGIN - 30) { pdf.addPage(); y = MARGIN + 10; }

        // Box
        drawRect(pdf, MARGIN, y, CONTENT_W, boxH, {
            fill: [255, 251, 235], stroke: col, lineWidth: 0.8, radius: 4
        });

        // Label
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        pdf.text('WORKED EXAMPLE', MARGIN + 8, y + 12);

        // Problem text
        pdf.setFontSize(LEVELS[level].fontSize - 1);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [30, 41, 59]);
        let exY = y + 24;
        exY = drawWrappedText(pdf, seed.stem, MARGIN + 10, exY, CONTENT_W - 20, LINE_H - 1);

        // Steps
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        setColor(pdf, col);

        if (level <= 2) {
            // Detailed steps for L1-L2
            const steps = [
                'Step 1: Read the problem carefully. Underline what you know.',
                'Step 2: Draw a picture or model to show the math.',
                'Step 3: Write the equation and solve.',
                'Answer: ' + (seed.answer || '___')
            ];
            for (const step of steps) {
                if (exY > y + boxH - 6) break;
                pdf.text(step, MARGIN + 12, exY);
                exY += 12;
            }
        } else if (level === 3) {
            pdf.text('Solution: ' + (seed.answer || '___'), MARGIN + 12, exY);
            exY += 12;
            if (seed.hint) {
                pdf.setFont('helvetica', 'normal');
                setColor(pdf, [100, 116, 139]);
                pdf.text('Strategy: ' + seed.hint, MARGIN + 12, exY);
            }
        } else {
            // L4: brief
            pdf.text('Solution: ' + (seed.answer || '___'), MARGIN + 12, exY);
        }

        return y + boxH + 8;
    }

    // ════════════════════════════════════════════════
    //  PROBLEM SET
    // ════════════════════════════════════════════════

    function drawProblemSet(pdf, y, problems, level) {
        const meta = LEVELS[level];
        const col = meta.color;
        const fs = meta.fontSize;

        // Section header
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        const headerText = level <= 3 ? 'PRACTICE PROBLEMS' : level <= 4 ? 'PROBLEMS' : 'CHALLENGE PROBLEMS';
        pdf.text(headerText, MARGIN, y);
        drawLine(pdf, MARGIN, y + 3, MARGIN + 80, y + 3, col, 0.8);
        y += 14;

        // Draw each problem
        for (let i = 0; i < problems.length; i++) {
            const prob = problems[i];
            const neededH = meta.workSpaceH + 30;

            // Page break check
            if (y + neededH > PAGE_H - MARGIN - 30) {
                drawFooter(pdf, 0, meta, null);
                pdf.addPage();
                y = MARGIN + 10;
            }

            // Problem number badge
            setFillColor(pdf, col);
            pdf.circle(MARGIN + 8, y + 4, 8, 'F');
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [255, 255, 255]);
            const numStr = (i + 1).toString();
            pdf.text(numStr, MARGIN + 8 - pdf.getTextWidth(numStr) / 2, y + 7.5);

            // Problem text
            pdf.setFontSize(fs);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, [30, 41, 59]);
            const probY = drawWrappedText(pdf, prob.stem, MARGIN + 22, y + 7, CONTENT_W - 30, LINE_H);

            // DOK indicator (small, right-aligned)
            if (level >= 4) {
                pdf.setFontSize(6.5);
                setColor(pdf, [180, 190, 200]);
                pdf.text('DOK ' + (prob.dok || ''), PAGE_W - MARGIN - 20, y + 5);
            }

            let afterTextY = Math.max(probY, y + 16);

            // Sentence frame (L1-L3)
            if (meta.showSentenceFrames && level <= 3) {
                afterTextY += 3;
                pdf.setFontSize(8.5);
                pdf.setFont('helvetica', 'italic');
                setColor(pdf, col);
                const frames = level === 1
                    ? 'The answer is _________ because _________________________________.'
                    : level === 2
                    ? 'I solved this by ________________________________________________.'
                    : 'My strategy was ________________________________________________.';
                pdf.text(frames, MARGIN + 22, afterTextY);
                afterTextY += 12;
            }

            // Work space
            const wsY = afterTextY + 3;
            drawRect(pdf, MARGIN + 18, wsY, CONTENT_W - 24, meta.workSpaceH, {
                stroke: [203, 213, 225], lineWidth: 0.4, radius: 3
            });
            // "Show your work" label
            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'italic');
            setColor(pdf, [180, 190, 200]);
            pdf.text(level <= 2 ? 'Draw or write your work here:' : 'Show your work:', MARGIN + 22, wsY + 10);

            // Dotted guide lines inside work space (L1-L2 only)
            if (level <= 2) {
                for (let li = 1; li <= 3; li++) {
                    const lineY = wsY + 20 + li * 18;
                    if (lineY < wsY + meta.workSpaceH - 5) {
                        pdf.setLineDashPattern([2, 2], 0);
                        drawLine(pdf, MARGIN + 24, lineY, MARGIN + CONTENT_W - 10, lineY, [220, 225, 235], 0.3);
                        pdf.setLineDashPattern([], 0);
                    }
                }
            }

            // Hint box (L1-L2)
            if (level <= 2 && prob.hint) {
                const hintY = wsY + meta.workSpaceH + 4;
                pdf.setFontSize(7.5);
                pdf.setFont('helvetica', 'italic');
                setColor(pdf, [148, 163, 184]);
                pdf.text('* Hint: ' + prob.hint, MARGIN + 22, hintY);
                y = hintY + 12;
            } else {
                y = wsY + meta.workSpaceH + 10;
            }
        }

        return y;
    }

    // ════════════════════════════════════════════════
    //  SCAFFOLD BAR (L1-L3, bottom of page)
    // ════════════════════════════════════════════════

    function drawScaffoldBar(pdf, topic, level) {
        if (!LEVELS[level].scaffoldBar) return;

        const col = LEVELS[level].color;
        const barY = PAGE_H - MARGIN - 55;
        const barH = 42;

        drawRect(pdf, MARGIN, barY, CONTENT_W, barH, {
            fill: [248, 250, 252], stroke: [226, 232, 240], lineWidth: 0.5, radius: 3
        });

        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        pdf.text('REFERENCE TOOLS', MARGIN + 6, barY + 10);

        // Draw a simple number line
        const nlY = barY + 22;
        const nlX = MARGIN + 10;
        const nlW = CONTENT_W - 20;
        drawLine(pdf, nlX, nlY, nlX + nlW, nlY, [100, 116, 139], 0.8);

        // Tick marks 0-10
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [71, 85, 105]);
        for (let t = 0; t <= 10; t++) {
            const tx = nlX + (t / 10) * nlW;
            drawLine(pdf, tx, nlY - 4, tx, nlY + 4, [100, 116, 139], 0.5);
            pdf.text(t.toString(), tx - 2, nlY + 12);
        }

        // Label
        pdf.setFontSize(6.5);
        setColor(pdf, [148, 163, 184]);
        pdf.text('Number Line (use as reference)', nlX, barY + barH - 3);
    }

    // ════════════════════════════════════════════════
    //  REFLECTION / EXTENSION (L4-L6)
    // ════════════════════════════════════════════════

    function drawReflection(pdf, y, level, topic) {
        if (level <= 3) return y;

        const col = LEVELS[level].color;

        if (y + 55 > PAGE_H - MARGIN - 30) { pdf.addPage(); y = MARGIN + 10; }

        // Section header
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, col);
        const label = level === 4 ? 'SELF-CHECK' : level === 5 ? 'EXPLAIN YOUR THINKING' : 'CREATE & JUSTIFY';
        pdf.text(label, MARGIN, y);
        drawLine(pdf, MARGIN, y + 3, MARGIN + 80, y + 3, col, 0.8);
        y += 14;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [30, 41, 59]);

        if (level === 4) {
            pdf.text('[  ]  Does my answer make sense in context?', MARGIN + 5, y); y += 14;
            pdf.text('[  ]  Did I check my work using a different method?', MARGIN + 5, y); y += 14;
            pdf.text('[  ]  Can I explain my strategy to a partner?', MARGIN + 5, y); y += 14;
        } else if (level === 5) {
            y = drawWrappedText(pdf,
                'Choose one problem above. Explain your reasoning step-by-step. Why does your method work? Could you solve it a different way?',
                MARGIN + 5, y, CONTENT_W - 10, LINE_H);
            y += 5;
            // Lined writing space
            for (let i = 0; i < 5; i++) {
                drawLine(pdf, MARGIN + 5, y, PAGE_W - MARGIN - 5, y, [210, 215, 225], 0.4);
                y += 16;
            }
        } else {
            // L6: Create your own
            y = drawWrappedText(pdf,
                'Create your own problem that uses the same mathematical concept. Then solve it and explain why your solution is correct.',
                MARGIN + 5, y, CONTENT_W - 10, LINE_H);
            y += 5;
            drawRect(pdf, MARGIN + 5, y, CONTENT_W - 10, 80, {
                stroke: col, lineWidth: 0.6, radius: 3
            });
            pdf.setFontSize(7.5);
            pdf.setFont('helvetica', 'italic');
            setColor(pdf, [180, 190, 200]);
            pdf.text('Your problem:', MARGIN + 10, y + 12);
            pdf.text('Your solution & justification:', MARGIN + 10, y + 45);
            y += 88;
        }

        return y;
    }

    // ════════════════════════════════════════════════
    //  VISUAL MODEL (L1-L3 only)
    // ════════════════════════════════════════════════

    function drawVisualHint(pdf, y, topic, level) {
        // Only L1-L2 get full visuals; L3 gets partial
        if (level > 3) return y;
        if (level === 3 && LEVELS[level].showVisuals !== 'partial') return y;

        // Try to get SVG from MathVisualEngine first
        let svgDataUri = null;
        if (typeof MathVisualEngine !== 'undefined') {
            try {
                const visuals = MathVisualEngine.getVisualsForTopic(topic, {});
                if (visuals && visuals.length > 0) {
                    svgDataUri = visuals[0].img;
                }
            } catch (e) { /* silent */ }
        }

        // Fallback: use upgraded MathModels library for broader coverage
        if (!svgDataUri && typeof MathModels !== 'undefined') {
            try {
                const modelType = MathModels.detectModelType({
                    topics: [topic.toLowerCase()],
                    standards: []
                });
                if (modelType && modelType !== 'workSpace') {
                    const svg = MathModels.getSVG(modelType);
                    svgDataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
                }
            } catch (e) { /* silent */ }
        }

        if (!svgDataUri) return y; // No visual available

        // Embed as image in PDF
        try {
            const imgH = level <= 2 ? 65 : 45;
            if (y + imgH + 10 > PAGE_H - MARGIN - 60) { pdf.addPage(); y = MARGIN + 10; }

            pdf.addImage(svgDataUri, 'SVG', MARGIN + 20, y, CONTENT_W - 40, imgH);
            y += imgH + 8;
        } catch (e) {
            // SVG embedding may not work in all jsPDF versions — silently skip
        }

        return y;
    }

    // ════════════════════════════════════════════════
    //  MAIN GENERATE FUNCTION
    // ════════════════════════════════════════════════

    /**
     * Generate a single PDF worksheet for a given level
     * @param {Object} analysis - currentAnalysis object from the Digester
     * @param {number} level - 1-6 worksheet level
     * @param {Object} opts - { title, problemCount }
     * @returns {jsPDF} the PDF document object
     */
    function generate(analysis, level, opts = {}) {
        if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
            throw new Error('jsPDF not loaded. Add the jsPDF CDN script to the page.');
        }

        const PDF = (typeof jspdf !== 'undefined') ? jspdf.jsPDF : jsPDF;
        const pdf = new PDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

        const meta = LEVELS[level] || LEVELS[4];
        const topic = (analysis.topics && analysis.topics[0]) || 'Math Practice';
        const title = opts.title || analysis.filename?.replace(/\.pptx$/i, '').replace(/_/g, ' ') || 'Math Practice';

        // ── Resolve benchmark metadata (v2.0 — from JSON database) ──
        let benchmarkInfo = null;
        if (typeof ProblemGenerator !== 'undefined' && ProblemGenerator.getBenchmarkInfo) {
            benchmarkInfo = ProblemGenerator.getBenchmarkInfo(topic, analysis.grade);
        }

        // Get problems (v2.0: pass gradeHint for JSON database lookup)
        const count = opts.problemCount || meta.problemCount;
        let problems = [];
        if (typeof ProblemGenerator !== 'undefined') {
            problems = ProblemGenerator.forLevel(topic, level, count + 1, analysis.grade); // +1 for worked example
        } else if (typeof DOK_PROBLEMS !== 'undefined') {
            // Fallback: pull directly from DOK_PROBLEMS
            const data = DOK_PROBLEMS[topic];
            if (data) {
                problems = [...(data.dok1 || []), ...(data.dok2 || []), ...(data.dok3 || [])].slice(0, count + 1);
                problems = problems.map((p, i) => ({ ...p, dok: i < (data.dok1?.length || 0) ? 1 : i < (data.dok1?.length || 0) + (data.dok2?.length || 0) ? 2 : 3 }));
            }
        }

        // Split: first problem for worked example, rest for practice
        const workedProblem = problems.length > 0 ? problems[0] : null;
        const practiceProblems = problems.slice(meta.showWorkedExample ? 1 : 0, count + 1);

        // ── BUILD THE PAGE ──

        // Header (v2.0: pass benchmark info for richer subtitle)
        let y = drawHeader(pdf, title, topic, level, meta, benchmarkInfo);

        // Visual model (L1-L3)
        y = drawVisualHint(pdf, y, topic, level);

        // Vocabulary box (L1-L4)
        y = drawVocabularyBox(pdf, y, topic, level, analysis);

        // Worked example (L1-L4)
        if (meta.showWorkedExample && workedProblem) {
            y = drawWorkedExample(pdf, y, topic, level, [workedProblem]);
        }

        // Problem set
        y = drawProblemSet(pdf, y, practiceProblems, level);

        // Reflection / Self-check (L4-L6)
        y = drawReflection(pdf, y, level, topic);

        // Scaffold bar (L1-L3, at page bottom)
        drawScaffoldBar(pdf, topic, level);

        // Footer (v2.0: pass benchmark info for standards alignment display)
        drawFooter(pdf, 1, meta, analysis.standards, benchmarkInfo);

        return pdf;
    }

    /**
     * Generate all 6 levels and return as downloadable blobs
     * @param {Object} analysis - currentAnalysis object
     * @param {Object} opts - options
     * @returns {Object} { pdfs: [{level, blob, filename}], zipBlob }
     */
    async function generateAll(analysis, opts = {}) {
        const results = [];
        const topic = (analysis.topics && analysis.topics[0]) || 'practice';
        const baseName = analysis.filename?.replace(/\.pptx$/i, '') || 'worksheet';

        for (let level = 1; level <= 6; level++) {
            const pdf = generate(analysis, level, opts);
            const blob = pdf.output('blob');
            const filename = `${baseName}_L${level}_${LEVELS[level].name.toLowerCase()}.pdf`;
            results.push({ level, blob, filename, meta: LEVELS[level] });
        }

        // Create ZIP if JSZip is available
        let zipBlob = null;
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            const folder = zip.folder(baseName + '_worksheets');
            for (const r of results) {
                folder.file(r.filename, r.blob);
            }
            zipBlob = await zip.generateAsync({ type: 'blob' });
        }

        return { pdfs: results, zipBlob };
    }

    /**
     * Generate a single level and trigger browser download
     */
    function downloadLevel(analysis, level, opts = {}) {
        const pdf = generate(analysis, level, opts);
        const baseName = analysis.filename?.replace(/\.pptx$/i, '') || 'worksheet';
        const filename = `${baseName}_L${level}_${LEVELS[level].name.toLowerCase()}.pdf`;
        pdf.save(filename);
    }

    /**
     * Generate all 6 and download as ZIP
     */
    async function downloadAll(analysis, opts = {}) {
        const { zipBlob, pdfs } = await generateAll(analysis, opts);

        if (zipBlob) {
            const baseName = analysis.filename?.replace(/\.pptx$/i, '') || 'worksheet';
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = baseName + '_worksheets_L1-L6.zip';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            // Fallback: download each PDF individually
            for (const r of pdfs) {
                const url = URL.createObjectURL(r.blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = r.filename;
                a.click();
                URL.revokeObjectURL(url);
            }
        }
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        generate,
        generateAll,
        downloadLevel,
        downloadAll,
        LEVELS
    };

})();
