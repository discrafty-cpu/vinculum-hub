/**
 * DialogueCardsPDF — Generates printable dialogue cards for flexible group sizes
 *
 * 6-page PDF per topic:
 *   Page 1: Group of 2 (Partner Dialogue — A, B)
 *   Page 2: Group of 3 (A, B, Questioner)
 *   Page 3: Group of 4 (A, B, Questioner, Summarizer)
 *   Page 4: Group of 5 (A, B, Questioner, Summarizer, Connector)
 *   Page 5: Word Bank & Sentence Frames (scaffolding reference)
 *   Page 6: Teacher Facilitation Guide
 *
 * Dependencies: jsPDF (CDN), RISA_DIALOGUES, STRUCTURED_DIALOGUE_TOPICS, DialogueEngine
 * IIFE pattern, zero server dependencies
 */

const DialogueCardsPDF = (() => {

    const PAGE_W = 612;
    const PAGE_H = 792;
    const MARGIN = 40;
    const CONTENT_W = PAGE_W - MARGIN * 2;

    // Role definitions for expanded groups
    const ROLES = {
        A: { label: 'Speaker A', color: [13, 148, 136], job: 'Introduce the idea and start the conversation.' },
        B: { label: 'Speaker B', color: [59, 130, 246], job: 'Respond, explain, and build on Speaker A\'s ideas.' },
        C: { label: 'Questioner', color: [124, 58, 237], job: 'Ask clarifying questions. Push the group to explain WHY.' },
        D: { label: 'Summarizer', color: [212, 135, 15], job: 'Restate the key idea in your own words at the end.' },
        E: { label: 'Connector', color: [232, 67, 109], job: 'Link this conversation to something the class learned before.' }
    };

    // Comfort-level sentence frames
    const COMFORT_FRAMES = {
        wordBank: {
            label: 'I need the words',
            icon: '1',
            frames: [
                'A _____ is when you _____.',
                'The answer is _____ because _____.',
                'I agree / disagree because _____.',
                'Can you explain what _____ means?'
            ]
        },
        guided: {
            label: 'I know a little',
            icon: '2',
            frames: [
                'I think the first step is...',
                'This is similar to... because...',
                'I\'m not sure about... but I think...',
                'What if we tried...?'
            ]
        },
        independent: {
            label: 'I can talk about it',
            icon: '3',
            frames: [
                'My strategy was... and it works because...',
                'I notice that... which tells me...',
                'Another way to think about this is...',
                'I respectfully disagree because...'
            ]
        },
        expert: {
            label: 'I can explain and teach',
            icon: '4',
            frames: [
                'The mathematical reasoning here is...',
                'This connects to [concept] because...',
                'A common mistake would be... and here\'s why it\'s wrong...',
                'Can you create a similar problem? How would you solve it?'
            ]
        }
    };

    // ════════════════════════════════════════════════
    //  DRAWING HELPERS
    // ════════════════════════════════════════════════

    function setColor(pdf, rgb) { pdf.setTextColor(rgb[0], rgb[1], rgb[2]); }
    function setFill(pdf, rgb) { pdf.setFillColor(rgb[0], rgb[1], rgb[2]); }
    function setDraw(pdf, rgb) { pdf.setDrawColor(rgb[0], rgb[1], rgb[2]); }

    function drawLine(pdf, x1, y1, x2, y2, color, w) {
        setDraw(pdf, color || [200, 200, 200]);
        pdf.setLineWidth(w || 0.5);
        pdf.line(x1, y1, x2, y2);
    }

    function drawRect(pdf, x, y, w, h, opts = {}) {
        if (opts.fill) setFill(pdf, opts.fill);
        if (opts.stroke) { setDraw(pdf, opts.stroke); pdf.setLineWidth(opts.lw || 0.5); }
        const style = opts.fill && opts.stroke ? 'FD' : opts.fill ? 'F' : 'S';
        if (opts.r) pdf.roundedRect(x, y, w, h, opts.r, opts.r, style);
        else pdf.rect(x, y, w, h, style);
    }

    function wrapText(pdf, text, maxW) {
        if (!text) return [''];
        const words = text.split(' ');
        const lines = []; let line = '';
        for (const w of words) {
            const test = line ? line + ' ' + w : w;
            if (pdf.getTextWidth(test) > maxW && line) { lines.push(line); line = w; }
            else line = test;
        }
        if (line) lines.push(line);
        return lines.length ? lines : [''];
    }

    function drawWrapped(pdf, text, x, y, maxW, lh) {
        const lines = wrapText(pdf, text, maxW);
        for (const l of lines) {
            if (y > PAGE_H - MARGIN - 10) { pdf.addPage(); y = MARGIN + 20; }
            pdf.text(l, x, y); y += (lh || 13);
        }
        return y;
    }

    // ════════════════════════════════════════════════
    //  PAGE HEADER
    // ════════════════════════════════════════════════

    function drawPageHeader(pdf, title, subtitle, color) {
        setFill(pdf, color);
        pdf.rect(0, 0, PAGE_W, 7, 'F');

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, color);
        pdf.text(title, MARGIN, 28);

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [100, 116, 139]);
        pdf.text(subtitle, MARGIN, 42);

        drawLine(pdf, MARGIN, 48, PAGE_W - MARGIN, 48, color, 1);
        return 58;
    }

    function drawPageFooter(pdf, text, color) {
        drawLine(pdf, MARGIN, PAGE_H - 28, PAGE_W - MARGIN, PAGE_H - 28, color, 0.5);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [148, 163, 184]);
        pdf.text(text, MARGIN, PAGE_H - 18);
    }

    // ════════════════════════════════════════════════
    //  GET DIALOGUE DATA FOR A TOPIC
    // ════════════════════════════════════════════════

    function getDialogueForTopic(topic) {
        // Try RISA first (broader coverage), then structured dialogues
        let script = null, vocab = [], title = topic;

        if (typeof RISA_DIALOGUES !== 'undefined') {
            // Exact match
            if (RISA_DIALOGUES[topic] && RISA_DIALOGUES[topic].academic) {
                const d = RISA_DIALOGUES[topic].academic;
                script = d.script;
                vocab = d.vocabulary || [];
                title = d.title || topic;
            } else {
                // Fuzzy match
                const keys = Object.keys(RISA_DIALOGUES);
                for (const k of keys) {
                    if (k.includes(topic) || topic.includes(k) ||
                        k.split(' ')[0] === topic.split(' ')[0]) {
                        const d = RISA_DIALOGUES[k].academic;
                        script = d.script;
                        vocab = d.vocabulary || [];
                        title = d.title || k;
                        break;
                    }
                }
            }
        }

        // Also get structured dialogue data if available
        let solvedProblem = null, phaseQuestions = null;
        if (typeof DialogueEngine !== 'undefined') {
            solvedProblem = DialogueEngine.getSolvedProblem(topic);
            phaseQuestions = DialogueEngine.getDialogueQuestions(topic);
        }

        // If no RISA script, build a dialogue script from the solved problem
        // getSolvedProblem returns { problem, student, steps } (flattened correct solution)
        // getErrorPair returns { problem, studentA, studentB, errorType, ... }
        if (!script && solvedProblem) {
            script = [];
            const problem = solvedProblem.problem || '';
            const steps = solvedProblem.steps || [];

            // Also try to get the error pair for Speaker B's lines
            let errorPair = null;
            if (typeof DialogueEngine !== 'undefined') {
                errorPair = DialogueEngine.getErrorPair(topic);
            }

            // Speaker A reads the problem and walks through correct steps
            if (problem) {
                script.push({ speaker: 'A', line: 'The problem says: "' + problem + '"' });
            }
            if (steps.length > 0) {
                script.push({ speaker: 'A', line: 'My first step was: ' + steps[0] });
            }
            if (steps.length > 2) {
                script.push({ speaker: 'A', line: 'Next I did: ' + steps[Math.floor(steps.length / 2)] });
            }
            if (steps.length > 1) {
                script.push({ speaker: 'A', line: 'So my answer is: ' + steps[steps.length - 1] });
            }

            // Speaker B describes the incorrect approach
            if (errorPair) {
                const wrongStudent = errorPair.studentA.isCorrect ? errorPair.studentB : errorPair.studentA;
                const wrongSteps = wrongStudent.steps || [];
                if (wrongSteps.length > 0) {
                    script.push({ speaker: 'B', line: 'I did it differently. I started with: ' + wrongSteps[0] });
                }
                if (wrongSteps.length > 1) {
                    script.push({ speaker: 'B', line: 'Then I got: ' + wrongSteps[wrongSteps.length - 1] });
                }
                script.push({ speaker: 'B', line: 'Hmm, our answers are different. Can we figure out which step went wrong?' });
                script.push({ speaker: 'A', line: 'Let me compare step by step... I think the issue is in step _____.' });
            } else {
                script.push({ speaker: 'B', line: 'Can you explain why you chose that strategy?' });
                script.push({ speaker: 'B', line: 'I think the key step was _____ because _____.' });
                script.push({ speaker: 'A', line: 'Does our answer make sense? Let me check by _____.' });
            }

            // Build vocab from the problem
            if (!vocab.length && problem) {
                const mathTerms = problem.match(/\b(ratio|rate|proportion|equation|variable|expression|fraction|percent|slope|intercept|coefficient|term|function|exponent|inequality)\w*/gi);
                if (mathTerms) vocab = [...new Set(mathTerms.map(t => t.toLowerCase()))];
            }
        }

        return { script, vocab, title, solvedProblem, phaseQuestions };
    }

    // ════════════════════════════════════════════════
    //  EXPAND DIALOGUE FOR GROUP SIZES
    // ════════════════════════════════════════════════

    function expandDialogue(script, groupSize) {
        if (!script || script.length === 0) return [];

        const expanded = [];

        // Always include A and B lines from the original script
        for (const line of script) {
            expanded.push({ role: line.speaker, text: line.line });
        }

        // Add C (Questioner) for groups of 3+
        if (groupSize >= 3) {
            expanded.push({ role: 'C', text: 'What do you mean by _____? Can you explain that step?' });
            expanded.push({ role: 'C', text: 'Why did you choose that method instead of _____?' });
            expanded.push({ role: 'C', text: 'How do you know your answer is correct?' });
        }

        // Add D (Summarizer) for groups of 4+
        if (groupSize >= 4) {
            expanded.push({ role: 'D', text: 'So what I\'m hearing is that the key idea is _____.' });
            expanded.push({ role: 'D', text: 'To summarize: the strategy was _____ and the answer is _____.' });
        }

        // Add E (Connector) for groups of 5
        if (groupSize >= 5) {
            expanded.push({ role: 'E', text: 'This reminds me of when we learned about _____.' });
            expanded.push({ role: 'E', text: 'In real life, this connects to _____ because _____.' });
        }

        return expanded;
    }

    // ════════════════════════════════════════════════
    //  PAGE BUILDERS
    // ════════════════════════════════════════════════

    function drawGroupPage(pdf, topic, dialogueData, groupSize) {
        const color = ROLES[String.fromCharCode(64 + groupSize)].color; // last role's color
        const roleKeys = ['A', 'B', 'C', 'D', 'E'].slice(0, groupSize);

        let y = drawPageHeader(pdf,
            'Group of ' + groupSize + ' — Dialogue Cards',
            (dialogueData.title || topic) + '  |  Cut along dotted lines to distribute',
            color
        );

        const expanded = expandDialogue(dialogueData.script, groupSize);

        // Draw one card per role
        const cardH = Math.min(130, (PAGE_H - y - MARGIN - 30) / groupSize - 8);

        for (let i = 0; i < roleKeys.length; i++) {
            const role = ROLES[roleKeys[i]];
            const cardY = y + i * (cardH + 6);

            // Cut line (dotted)
            if (i > 0) {
                pdf.setLineDashPattern([3, 3], 0);
                drawLine(pdf, MARGIN - 10, cardY - 3, PAGE_W - MARGIN + 10, cardY - 3, [180, 190, 200], 0.4);
                pdf.setLineDashPattern([], 0);
            }

            // Role badge
            setFill(pdf, role.color);
            pdf.roundedRect(MARGIN, cardY, CONTENT_W, cardH, 4, 4, 'FD');
            setFill(pdf, [255, 255, 255]);
            pdf.setGlobalAlpha && pdf.setGlobalAlpha(0.92);
            pdf.roundedRect(MARGIN + 1, cardY + 1, CONTENT_W - 2, cardH - 2, 3, 3, 'F');

            // Role header
            setFill(pdf, role.color);
            pdf.roundedRect(MARGIN + 6, cardY + 6, 120, 18, 3, 3, 'F');
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [255, 255, 255]);
            pdf.text(role.label, MARGIN + 14, cardY + 18);

            // Role job description
            pdf.setFontSize(7.5);
            pdf.setFont('helvetica', 'italic');
            setColor(pdf, role.color);
            pdf.text(role.job, MARGIN + 132, cardY + 18);

            // Dialogue lines for this role
            const roleLines = expanded.filter(l => l.role === roleKeys[i]);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, [30, 41, 59]);

            let lineY = cardY + 34;
            for (const line of roleLines.slice(0, 4)) {
                if (lineY > cardY + cardH - 10) break;
                lineY = drawWrapped(pdf, line.text, MARGIN + 14, lineY, CONTENT_W - 28, 13);
                lineY += 2;
            }

            // If no specific lines for C/D/E, show the prompt
            if (roleLines.length === 0) {
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'italic');
                setColor(pdf, [100, 116, 139]);
                pdf.text('Listen carefully, then use your role prompt above.', MARGIN + 14, cardY + 34);
            }
        }

        drawPageFooter(pdf, 'Dialogue Cards  |  Group of ' + groupSize + '  |  The Lesson Digester', color);
    }

    function drawWordBankPage(pdf, topic, dialogueData) {
        const color = [13, 148, 136];
        let y = drawPageHeader(pdf,
            'Word Bank & Sentence Frames',
            (dialogueData.title || topic) + '  |  Choose your comfort level',
            color
        );

        // Vocabulary section
        if (dialogueData.vocab && dialogueData.vocab.length > 0) {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, color);
            pdf.text('KEY VOCABULARY', MARGIN, y);
            y += 14;

            drawRect(pdf, MARGIN, y, CONTENT_W, 35, { fill: [240, 253, 250], stroke: color, lw: 0.6, r: 4 });
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [30, 41, 59]);
            pdf.text(dialogueData.vocab.join('     |     '), MARGIN + 12, y + 22);
            y += 50;
        }

        // Four comfort levels
        const levels = Object.values(COMFORT_FRAMES);
        const boxH = 140;

        for (let i = 0; i < levels.length; i++) {
            const lev = levels[i];
            const col = i < 2 ? 0 : 1;
            const row = i % 2;
            const bx = MARGIN + col * (CONTENT_W / 2 + 4);
            const by = y + row * (boxH + 8);
            const bw = CONTENT_W / 2 - 4;

            // Box
            const levelColors = [[13, 148, 136], [59, 130, 246], [124, 58, 237], [212, 135, 15]];
            const lc = levelColors[i];

            drawRect(pdf, bx, by, bw, boxH, { fill: [250, 251, 252], stroke: lc, lw: 0.8, r: 4 });

            // Level badge
            setFill(pdf, lc);
            pdf.roundedRect(bx + 6, by + 6, bw - 12, 20, 3, 3, 'F');
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [255, 255, 255]);
            pdf.text('Level ' + lev.icon + ': ' + lev.label, bx + 14, by + 19);

            // Sentence frames
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, [30, 41, 59]);
            let fy = by + 36;
            for (const frame of lev.frames) {
                const lines = wrapText(pdf, '* ' + frame, bw - 24);
                for (const l of lines) {
                    pdf.text(l, bx + 12, fy);
                    fy += 12;
                }
                fy += 3;
            }
        }

        y += boxH * 2 + 20;

        // How to choose section
        if (y < PAGE_H - 80) {
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [100, 116, 139]);
            pdf.text('HOW TO CHOOSE: Read each level. Pick the one that honestly describes where you are TODAY. It\'s okay to move between levels!', MARGIN, y);
        }

        drawPageFooter(pdf, 'Word Bank & Sentence Frames  |  Self-Select Your Level  |  The Lesson Digester', color);
    }

    function drawTeacherGuidePage(pdf, topic, dialogueData) {
        const color = [30, 39, 97];
        let y = drawPageHeader(pdf,
            'Teacher Facilitation Guide',
            (dialogueData.title || topic) + '  |  Quick reference for launching dialogues',
            color
        );

        // Quick-start protocol
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, color);
        pdf.text('LAUNCH PROTOCOL (2 minutes)', MARGIN, y);
        y += 14;

        const steps = [
            '1. Display the problem or solved example on the projector.',
            '2. Students form groups and take their dialogue cards.',
            '3. Students self-select comfort level from the Word Bank page.',
            '4. Set timer: 8-12 minutes for dialogue, 3 minutes for whole-class share.',
            '5. Circulate and listen. Note misconceptions for follow-up.'
        ];
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, [30, 41, 59]);
        for (const step of steps) {
            y = drawWrapped(pdf, step, MARGIN + 8, y, CONTENT_W - 16, 14);
            y += 3;
        }
        y += 10;

        // Group size guide
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, color);
        pdf.text('GROUP SIZE GUIDE', MARGIN, y);
        y += 14;

        const groups = [
            { size: '2 (Partners)', when: 'Quick discussions, think-pair-share, early in a unit' },
            { size: '3 (Trio)', when: 'Adding accountability — the Questioner pushes deeper thinking' },
            { size: '4 (Team)', when: 'Full discourse cycle: introduce, respond, question, summarize' },
            { size: '5 (Extended)', when: 'Complex topics needing connection to prior learning' }
        ];
        for (const g of groups) {
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, [30, 41, 59]);
            pdf.text('Group of ' + g.size, MARGIN + 8, y);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, [71, 85, 105]);
            pdf.text(g.when, MARGIN + 120, y);
            y += 16;
        }
        y += 10;

        // Phase questions (if available)
        if (dialogueData.phaseQuestions) {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, color);
            pdf.text('THREE-PHASE QUESTIONS (if facilitating whole-class)', MARGIN, y);
            y += 14;

            const phases = [
                { label: 'Orientation (2-3 min)', q: dialogueData.phaseQuestions.orientation },
                { label: 'Analysis (5-8 min)', q: dialogueData.phaseQuestions.analysis },
                { label: 'Connection (3-5 min)', q: dialogueData.phaseQuestions.connection }
            ];
            for (const p of phases) {
                pdf.setFont('helvetica', 'bold');
                setColor(pdf, [59, 130, 246]);
                pdf.text(p.label, MARGIN + 8, y);
                y += 12;
                pdf.setFont('helvetica', 'normal');
                setColor(pdf, [30, 41, 59]);
                for (const q of (p.q || []).slice(0, 2)) {
                    y = drawWrapped(pdf, '* ' + q, MARGIN + 16, y, CONTENT_W - 32, 12);
                    y += 2;
                }
                y += 4;
            }
        }

        // Roles reference
        if (y < PAGE_H - 100) {
            y += 5;
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, color);
            pdf.text('ROLE RESPONSIBILITIES', MARGIN, y);
            y += 14;

            for (const [key, role] of Object.entries(ROLES)) {
                setFill(pdf, role.color);
                pdf.circle(MARGIN + 12, y - 3, 5, 'F');
                pdf.setFontSize(7);
                pdf.setFont('helvetica', 'bold');
                setColor(pdf, [255, 255, 255]);
                pdf.text(key, MARGIN + 10, y - 1);

                pdf.setFontSize(8.5);
                pdf.setFont('helvetica', 'bold');
                setColor(pdf, role.color);
                pdf.text(role.label + ':', MARGIN + 22, y);
                pdf.setFont('helvetica', 'normal');
                setColor(pdf, [71, 85, 105]);
                pdf.text(role.job, MARGIN + 22 + pdf.getTextWidth(role.label + ':  '), y);
                y += 14;
            }
        }

        drawPageFooter(pdf, 'Teacher Facilitation Guide  |  The Lesson Digester', color);
    }

    // ════════════════════════════════════════════════
    //  MAIN GENERATE FUNCTION
    // ════════════════════════════════════════════════

    function generate(analysis) {
        if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
            throw new Error('jsPDF not loaded.');
        }
        const PDF = (typeof jspdf !== 'undefined') ? jspdf.jsPDF : jsPDF;
        const pdf = new PDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

        const topic = (analysis.topics && analysis.topics[0]) || 'Math Practice';
        const dialogueData = getDialogueForTopic(topic);

        // Page 1: Group of 2
        drawGroupPage(pdf, topic, dialogueData, 2);

        // Page 2: Group of 3
        pdf.addPage();
        drawGroupPage(pdf, topic, dialogueData, 3);

        // Page 3: Group of 4
        pdf.addPage();
        drawGroupPage(pdf, topic, dialogueData, 4);

        // Page 4: Group of 5
        pdf.addPage();
        drawGroupPage(pdf, topic, dialogueData, 5);

        // Page 5: Word Bank & Sentence Frames
        pdf.addPage();
        drawWordBankPage(pdf, topic, dialogueData);

        // Page 6: Teacher Facilitation Guide
        pdf.addPage();
        drawTeacherGuidePage(pdf, topic, dialogueData);

        return pdf;
    }

    function download(analysis) {
        const pdf = generate(analysis);
        const baseName = analysis.filename?.replace(/\.pptx$/i, '') || 'dialogue';
        pdf.save(baseName + '_dialogue_cards.pdf');
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return { generate, download, ROLES, COMFORT_FRAMES, getDialogueForTopic, expandDialogue };

})();
