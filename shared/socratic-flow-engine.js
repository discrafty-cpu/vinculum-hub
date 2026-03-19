/* ═══════════════════════════════════════════════════════════
   SOCRATIC FLOW ENGINE — Adaptive Questioning State Machine
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   A branching, answer-reactive Socratic dialogue engine that
   guides students through math concepts via questioning.

   Core idea: Each "flow" is a directed graph of nodes.
   Nodes can be: question, visual, story, checkpoint, branch.
   Student answers drive transitions between nodes — correct
   answers advance, incorrect answers scaffold down, partial
   answers trigger hints.

   100% offline — all logic and content is in data files.
   Integrates with: PptxThemes, MathVisualEngine, ProblemGenerator,
   DOK_PROBLEMS, STRUCTURED_DIALOGUE_TOPICS.

   Dependencies: none (pure JS)
   Optional: MathVisualEngine (for inline visuals),
             PptxThemes (for theme-aware rendering)

   Usage:
     const flow = SocraticFlowEngine.start('fractions-intro', {
       grade: 6, comfort: 2, theme: PptxThemes.getSelected()
     });
     // flow is a FlowSession — call flow.getCurrentNode(),
     // flow.submitAnswer(), flow.getHint(), etc.

   Embedding in any app:
     SocraticFlowEngine.attachButton(containerEl, {
       topic: 'ratios-and-rates', grade: 7
     });
   ═══════════════════════════════════════════════════════════ */

const SocraticFlowEngine = (() => {
    'use strict';

    // ════════════════════════════════════════════════
    //  CONSTANTS
    // ════════════════════════════════════════════════

    const NODE_TYPES = {
        QUESTION:   'question',    // Asks student something, expects answer
        VISUAL:     'visual',      // Shows a math visual (via MathVisualEngine)
        STORY:      'story',       // Narrative/context framing
        CHECKPOINT: 'checkpoint',  // Summary + mastery check
        BRANCH:     'branch',      // Auto-routes based on session state
        REVEAL:     'reveal',      // Shows the answer with explanation
        SCAFFOLD:   'scaffold',    // Provides scaffolded support
        CELEBRATE:  'celebrate'    // Positive reinforcement at milestones
    };

    const ANSWER_RESULTS = {
        CORRECT:   'correct',
        INCORRECT: 'incorrect',
        PARTIAL:   'partial',
        SKIP:      'skip'
    };

    const COMFORT_LEVELS = {
        1: { label: 'I need the words', hintDepth: 3, scaffoldFirst: true,  sentenceFrames: true },
        2: { label: 'I know a little',  hintDepth: 2, scaffoldFirst: false, sentenceFrames: true },
        3: { label: 'I can talk about it', hintDepth: 1, scaffoldFirst: false, sentenceFrames: false },
        4: { label: 'I can teach it',   hintDepth: 0, scaffoldFirst: false, sentenceFrames: false }
    };

    // Socratic question stems by purpose
    const SOCRATIC_STEMS = {
        clarify: [
            'What do you mean by that?',
            'Can you say that another way?',
            'What part are you sure about?'
        ],
        probe: [
            'Why do you think that works?',
            'What evidence supports that?',
            'How do you know?'
        ],
        perspective: [
            'Is there another way to look at this?',
            'What would happen if we changed one thing?',
            'Could someone disagree? Why?'
        ],
        consequence: [
            'If that\'s true, what else must be true?',
            'What would that look like with different numbers?',
            'Where else does this pattern show up?'
        ],
        origin: [
            'Where did that idea come from?',
            'What do we already know that connects to this?',
            'What assumption are we making?'
        ]
    };

    // ════════════════════════════════════════════════
    //  ANSWER EVALUATOR
    // ════════════════════════════════════════════════

    /**
     * Evaluate a student's answer against expected answer(s).
     * Supports: exact match, numeric tolerance, keyword matching,
     * multiple correct answers, and custom evaluator functions.
     */
    function evaluateAnswer(studentAnswer, node) {
        if (!studentAnswer || !node.accept) return ANSWER_RESULTS.SKIP;

        const raw = String(studentAnswer).trim().toLowerCase();
        const accept = node.accept;

        // Custom evaluator function
        if (typeof accept.evaluate === 'function') {
            return accept.evaluate(raw);
        }

        // Exact match (string or array of strings)
        if (accept.exact) {
            const targets = Array.isArray(accept.exact) ? accept.exact : [accept.exact];
            for (const t of targets) {
                if (raw === String(t).toLowerCase().trim()) return ANSWER_RESULTS.CORRECT;
            }
        }

        // Numeric match with tolerance
        if (accept.numeric !== undefined) {
            const studentNum = parseFloat(raw.replace(/[^0-9.\-\/]/g, ''));
            if (!isNaN(studentNum)) {
                const tolerance = accept.tolerance || 0.01;
                const target = typeof accept.numeric === 'string'
                    ? evalFraction(accept.numeric)
                    : accept.numeric;
                if (Math.abs(studentNum - target) <= tolerance) return ANSWER_RESULTS.CORRECT;
            }
        }

        // Keyword matching (partial credit)
        if (accept.keywords) {
            const matched = accept.keywords.filter(kw => raw.includes(kw.toLowerCase()));
            const ratio = matched.length / accept.keywords.length;
            if (ratio >= (accept.keywordThreshold || 0.7)) return ANSWER_RESULTS.CORRECT;
            if (ratio >= 0.3) return ANSWER_RESULTS.PARTIAL;
        }

        // Multiple choice (a, b, c, d)
        if (accept.choice) {
            const letter = raw.replace(/[^a-d]/g, '');
            if (letter === accept.choice.toLowerCase()) return ANSWER_RESULTS.CORRECT;
        }

        return ANSWER_RESULTS.INCORRECT;
    }

    /** Evaluate simple fractions like "3/4" */
    function evalFraction(str) {
        const parts = String(str).split('/');
        if (parts.length === 2) {
            const n = parseFloat(parts[0]);
            const d = parseFloat(parts[1]);
            if (d !== 0) return n / d;
        }
        return parseFloat(str);
    }

    // ════════════════════════════════════════════════
    //  FLOW RESOLUTION — Build flows from data
    // ════════════════════════════════════════════════

    /**
     * Resolve a flow definition.
     * Checks SOCRATIC_FLOWS global first, then falls back to
     * auto-generated flows from DOK_PROBLEMS + DialogueEngine.
     */
    function resolveFlow(topicOrId, options) {
        const opts = options || {};

        // 1. Check registered flows (from socratic-flows-data.js)
        if (typeof SOCRATIC_FLOWS !== 'undefined' && SOCRATIC_FLOWS[topicOrId]) {
            return deepClone(SOCRATIC_FLOWS[topicOrId]);
        }

        // 2. Auto-generate from DOK_PROBLEMS
        if (typeof DOK_PROBLEMS !== 'undefined') {
            const topic = findTopic(topicOrId);
            if (topic) return autoGenerateFlow(topic, topicOrId, opts);
        }

        // 3. Completely generic fallback
        return genericFallbackFlow(topicOrId, opts);
    }

    function findTopic(topicOrId) {
        if (typeof DOK_PROBLEMS === 'undefined') return null;
        const lower = topicOrId.toLowerCase().trim();
        if (DOK_PROBLEMS[lower]) return DOK_PROBLEMS[lower];
        for (const key of Object.keys(DOK_PROBLEMS)) {
            if (key.includes(lower) || lower.includes(key)) return DOK_PROBLEMS[key];
        }
        const words = lower.split(' ').filter(w => w.length > 3);
        for (const key of Object.keys(DOK_PROBLEMS)) {
            if (words.some(w => key.includes(w))) return DOK_PROBLEMS[key];
        }
        return null;
    }

    /**
     * Auto-generate a Socratic flow from DOK problems.
     * Creates a 3-phase flow: Orient → Explore → Connect
     * matching the WWC three-phase dialogue structure.
     */
    function autoGenerateFlow(topicData, topicName, opts) {
        const grade = opts.grade || topicData.grade || 6;
        const nodes = [];
        let nodeId = 0;
        const nid = () => 'auto_' + (nodeId++);

        // Phase 1: Story — Orient
        const orientId = nid();
        nodes.push({
            id: orientId,
            type: NODE_TYPES.STORY,
            phase: 'orient',
            title: 'Let\'s Explore',
            content: `Today we're investigating **${topicName}**. I'm going to ask you some questions — there's no wrong answer, just thinking out loud.`,
            next: null // will be set
        });

        // Phase 2: DOK 1 questions — warm up
        const dok1 = (topicData.dok1 || []).slice(0, 2);
        const dok2 = (topicData.dok2 || []).slice(0, 2);
        const dok3 = (topicData.dok3 || []).slice(0, 1);

        let prevId = orientId;

        // DOK 1 — recall/fluency
        for (const prob of dok1) {
            const qId = nid();
            const revealId = nid();

            nodes.push({
                id: qId,
                type: NODE_TYPES.QUESTION,
                phase: 'explore',
                dok: 1,
                prompt: prob.stem,
                accept: buildAcceptFromProblem(prob),
                hints: [prob.hint].filter(Boolean),
                scaffoldPrompt: prob.hint || 'Think about what the question is really asking.',
                socraticFollow: pickSocratic('probe'),
                next: revealId,
                onIncorrect: null // will scaffold in place
            });

            nodes.push({
                id: revealId,
                type: NODE_TYPES.REVEAL,
                phase: 'explore',
                content: prob.answer,
                explanation: prob.hint || '',
                next: null
            });

            // Link chain
            setNext(nodes, prevId, qId);
            prevId = revealId;
        }

        // DOK 2 — skill/concept
        if (dok2.length > 0) {
            const transId = nid();
            nodes.push({
                id: transId,
                type: NODE_TYPES.STORY,
                phase: 'explore',
                title: 'Going Deeper',
                content: 'Good thinking! Now let\'s apply what we know to a trickier situation.',
                next: null
            });
            setNext(nodes, prevId, transId);
            prevId = transId;

            for (const prob of dok2) {
                const qId = nid();
                const revealId = nid();

                nodes.push({
                    id: qId,
                    type: NODE_TYPES.QUESTION,
                    phase: 'explore',
                    dok: 2,
                    prompt: prob.stem,
                    accept: buildAcceptFromProblem(prob),
                    hints: [prob.hint].filter(Boolean),
                    socraticFollow: pickSocratic('consequence'),
                    next: revealId
                });

                nodes.push({
                    id: revealId,
                    type: NODE_TYPES.REVEAL,
                    phase: 'explore',
                    content: prob.answer,
                    explanation: prob.hint || '',
                    next: null
                });

                setNext(nodes, prevId, qId);
                prevId = revealId;
            }
        }

        // DOK 3 — strategic thinking
        if (dok3.length > 0) {
            const challengeId = nid();
            nodes.push({
                id: challengeId,
                type: NODE_TYPES.STORY,
                phase: 'connect',
                title: 'Challenge Round',
                content: 'You\'re doing great. Here\'s one that requires some real problem solving.',
                next: null
            });
            setNext(nodes, prevId, challengeId);
            prevId = challengeId;

            for (const prob of dok3) {
                const qId = nid();
                const revealId = nid();

                nodes.push({
                    id: qId,
                    type: NODE_TYPES.QUESTION,
                    phase: 'connect',
                    dok: 3,
                    prompt: prob.stem,
                    accept: buildAcceptFromProblem(prob),
                    hints: [prob.hint].filter(Boolean),
                    socraticFollow: pickSocratic('perspective'),
                    next: revealId
                });

                nodes.push({
                    id: revealId,
                    type: NODE_TYPES.REVEAL,
                    phase: 'connect',
                    content: prob.answer,
                    explanation: prob.hint || '',
                    next: null
                });

                setNext(nodes, prevId, qId);
                prevId = revealId;
            }
        }

        // Celebrate
        const celebrateId = nid();
        nodes.push({
            id: celebrateId,
            type: NODE_TYPES.CELEBRATE,
            phase: 'connect',
            title: 'Well Done!',
            content: `You just worked through **${topicName}** using the Socratic method — questioning, reasoning, and proving your thinking. That's real mathematics.`,
            next: null
        });
        setNext(nodes, prevId, celebrateId);

        return {
            id: 'auto_' + topicName.replace(/\s+/g, '_'),
            topic: topicName,
            grade: grade,
            title: titleCase(topicName),
            description: 'Auto-generated Socratic flow from DOK problems',
            nodes: nodes,
            startNode: orientId
        };
    }

    function buildAcceptFromProblem(prob) {
        const answer = prob.answer || '';
        // Try to extract a number
        const numMatch = answer.match(/^[\-]?\d+\.?\d*$/);
        if (numMatch) {
            return { numeric: parseFloat(numMatch[0]), tolerance: 0.01 };
        }
        // Fraction pattern
        const fracMatch = answer.match(/^(\d+)\/(\d+)$/);
        if (fracMatch) {
            return { numeric: fracMatch[0], tolerance: 0.01 };
        }
        // Otherwise keyword match
        const words = answer.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        if (words.length > 0) {
            return { keywords: words.slice(0, 5), keywordThreshold: 0.4 };
        }
        return { keywords: [answer.toLowerCase().trim()], keywordThreshold: 0.5 };
    }

    function genericFallbackFlow(topicName, opts) {
        return {
            id: 'generic_flow',
            topic: topicName,
            grade: opts.grade || 6,
            title: titleCase(topicName || 'Math Exploration'),
            description: 'Generic Socratic exploration',
            nodes: [
                {
                    id: 'start',
                    type: NODE_TYPES.STORY,
                    phase: 'orient',
                    title: 'Let\'s Think Together',
                    content: `Let's explore **${topicName || 'this topic'}** step by step. I'll ask questions to guide your thinking.`,
                    next: 'q1'
                },
                {
                    id: 'q1',
                    type: NODE_TYPES.QUESTION,
                    phase: 'explore',
                    prompt: `What do you already know about ${topicName || 'this topic'}? Tell me one thing you remember.`,
                    accept: { keywords: ['know', 'remember', 'learned'], keywordThreshold: 0 },
                    hints: ['Think about a time you used this in class or in real life.'],
                    socraticFollow: pickSocratic('origin'),
                    next: 'end'
                },
                {
                    id: 'end',
                    type: NODE_TYPES.CELEBRATE,
                    phase: 'connect',
                    title: 'Great Start!',
                    content: 'Activating what you already know is the first step to deeper learning.',
                    next: null
                }
            ],
            startNode: 'start'
        };
    }

    // ════════════════════════════════════════════════
    //  FLOW SESSION — Runtime state machine
    // ════════════════════════════════════════════════

    class FlowSession {
        constructor(flowDef, options) {
            this.flow = flowDef;
            this.options = options || {};
            this.theme = this.options.theme || null;
            this.grade = this.options.grade || flowDef.grade || 6;
            this.comfort = this.options.comfort || 2;
            this.comfortConfig = COMFORT_LEVELS[this.comfort] || COMFORT_LEVELS[2];

            // Node index for fast lookup
            this.nodeIndex = {};
            for (const node of flowDef.nodes) {
                this.nodeIndex[node.id] = node;
            }

            // Session state
            this.currentNodeId = flowDef.startNode;
            this.history = [];          // { nodeId, answer, result, timestamp }
            this.hintsUsed = {};        // nodeId → count
            this.score = { correct: 0, incorrect: 0, partial: 0, skipped: 0 };
            this.startTime = Date.now();
            this.phase = 'orient';      // current phase: orient | explore | connect

            // Callbacks
            this._onNodeChange = null;
            this._onComplete = null;
            this._onScoreChange = null;
        }

        // ── Event hooks ──
        onNodeChange(fn) { this._onNodeChange = fn; return this; }
        onComplete(fn) { this._onComplete = fn; return this; }
        onScoreChange(fn) { this._onScoreChange = fn; return this; }

        // ── Getters ──
        getCurrentNode() {
            return this.nodeIndex[this.currentNodeId] || null;
        }

        getProgress() {
            const total = this.flow.nodes.filter(n =>
                n.type === NODE_TYPES.QUESTION || n.type === NODE_TYPES.CHECKPOINT
            ).length;
            const answered = this.history.filter(h =>
                h.result && h.result !== ANSWER_RESULTS.SKIP
            ).length;
            return { answered, total, percent: total > 0 ? Math.round((answered / total) * 100) : 0 };
        }

        getScore() { return { ...this.score }; }

        getHistory() { return [...this.history]; }

        getPhase() {
            const node = this.getCurrentNode();
            return node ? (node.phase || this.phase) : this.phase;
        }

        isComplete() {
            return this.currentNodeId === null || this.getCurrentNode() === null;
        }

        getElapsedTime() {
            return Date.now() - this.startTime;
        }

        getComfortConfig() {
            return { ...this.comfortConfig };
        }

        // ── Actions ──

        /**
         * Submit an answer to the current question node.
         * Returns { result, feedback, socraticFollow, nextNode }
         */
        submitAnswer(answer) {
            const node = this.getCurrentNode();
            if (!node || node.type !== NODE_TYPES.QUESTION) {
                return { result: null, feedback: 'Not on a question node.' };
            }

            const result = evaluateAnswer(answer, node);
            const entry = {
                nodeId: node.id,
                answer: answer,
                result: result,
                timestamp: Date.now(),
                hintsUsed: this.hintsUsed[node.id] || 0
            };
            this.history.push(entry);

            // Update score
            if (result === ANSWER_RESULTS.CORRECT) this.score.correct++;
            else if (result === ANSWER_RESULTS.INCORRECT) this.score.incorrect++;
            else if (result === ANSWER_RESULTS.PARTIAL) this.score.partial++;
            else this.score.skipped++;

            if (this._onScoreChange) this._onScoreChange(this.score);

            // Build response
            const response = {
                result: result,
                feedback: this._buildFeedback(result, node),
                socraticFollow: null,
                canRetry: result !== ANSWER_RESULTS.CORRECT,
                nextNode: null
            };

            // Socratic follow-up on correct/partial
            if (result === ANSWER_RESULTS.CORRECT || result === ANSWER_RESULTS.PARTIAL) {
                if (node.socraticFollow) {
                    response.socraticFollow = node.socraticFollow;
                }
            }

            // On incorrect with scaffold
            if (result === ANSWER_RESULTS.INCORRECT && node.scaffoldPrompt) {
                response.scaffold = node.scaffoldPrompt;
            }

            return response;
        }

        /**
         * Advance to the next node (after viewing a reveal, story, etc.)
         */
        advance() {
            const node = this.getCurrentNode();
            if (!node) {
                if (this._onComplete) this._onComplete(this._buildSummary());
                return null;
            }

            const nextId = this._resolveNext(node);
            this.currentNodeId = nextId;

            if (nextId) {
                const nextNode = this.getCurrentNode();
                if (nextNode) this.phase = nextNode.phase || this.phase;
                if (this._onNodeChange) this._onNodeChange(nextNode);
                return nextNode;
            } else {
                if (this._onComplete) this._onComplete(this._buildSummary());
                return null;
            }
        }

        /**
         * Get a hint for the current question.
         * Returns progressively deeper hints based on comfort level.
         */
        getHint() {
            const node = this.getCurrentNode();
            if (!node || !node.hints || node.hints.length === 0) return null;

            const used = this.hintsUsed[node.id] || 0;
            if (used >= node.hints.length) return node.hints[node.hints.length - 1];

            this.hintsUsed[node.id] = used + 1;
            return node.hints[used];
        }

        /**
         * Get sentence frames for the current node (comfort levels 1-2).
         */
        getSentenceFrames() {
            const node = this.getCurrentNode();
            if (!node) return [];

            if (node.sentenceFrames) return node.sentenceFrames;

            // Auto-generate based on node type
            if (node.type === NODE_TYPES.QUESTION) {
                if (this.comfort <= 1) {
                    return [
                        'I think the answer is ___ because ___.',
                        'I notice that ___.',
                        'This reminds me of ___.'
                    ];
                }
                if (this.comfort <= 2) {
                    return [
                        'My answer is ___ because ___.',
                        'I used the strategy of ___.'
                    ];
                }
            }
            return [];
        }

        /**
         * Get a visual for the current node (if applicable).
         * Returns an SVG data URI or null.
         */
        getVisual() {
            const node = this.getCurrentNode();
            if (!node || !node.visual) return null;

            if (typeof MathVisualEngine === 'undefined') return null;

            const engine = new MathVisualEngine({ theme: this.theme });
            const v = node.visual;

            // Dispatch to appropriate visual type
            try {
                switch (v.type) {
                    case 'fractionBar':    return engine.fractionBar(v.num, v.denom, v.opts);
                    case 'fractionCircle': return engine.fractionCircle(v.num, v.denom, v.opts);
                    case 'numberLine':     return engine.numberLine(v.min, v.max, v.points, v.opts);
                    case 'areaModel':      return engine.areaModel(v.a, v.b, v.opts);
                    case 'base10':         return engine.base10Blocks(v.number, v.opts);
                    case 'tapeDiagram':    return engine.tapeDiagram(v.parts, v.opts);
                    case 'coordinate':     return engine.coordinatePlane(v.points, v.opts);
                    case 'percentBar':     return engine.percentBar(v.value, v.opts);
                    case 'ratioTable':     return engine.ratioTable(v.labelA, v.labelB, v.pairs, v.opts);
                    default:               return null;
                }
            } catch (e) {
                return null;
            }
        }

        /**
         * Skip the current question and move to the next node.
         */
        skip() {
            const node = this.getCurrentNode();
            if (node && node.type === NODE_TYPES.QUESTION) {
                this.history.push({
                    nodeId: node.id,
                    answer: null,
                    result: ANSWER_RESULTS.SKIP,
                    timestamp: Date.now()
                });
                this.score.skipped++;
                if (this._onScoreChange) this._onScoreChange(this.score);
            }
            return this.advance();
        }

        /**
         * Inject a dynamic node into the flow at the current position.
         * Used for reactive re-rendering — engine or UI can add nodes
         * based on student responses.
         */
        injectNode(node, insertAfterId) {
            const afterId = insertAfterId || this.currentNodeId;
            const afterNode = this.nodeIndex[afterId];
            if (!afterNode) return false;

            // Wire: afterNode → new node → afterNode's old next
            const oldNext = afterNode.next;
            node.next = oldNext;
            afterNode.next = node.id;
            this.nodeIndex[node.id] = node;
            this.flow.nodes.push(node);
            return true;
        }

        /**
         * Dynamically branch: insert a scaffold sub-flow when student
         * struggles, or an extension when they excel.
         */
        reactToPerformance() {
            const recentQuestions = this.history
                .filter(h => h.result && h.result !== ANSWER_RESULTS.SKIP)
                .slice(-3);

            if (recentQuestions.length < 2) return null;

            const correctCount = recentQuestions.filter(h => h.result === ANSWER_RESULTS.CORRECT).length;
            const ratio = correctCount / recentQuestions.length;

            if (ratio <= 0.33) {
                // Struggling — inject a scaffold node
                const scaffoldNode = {
                    id: 'scaffold_' + Date.now(),
                    type: NODE_TYPES.SCAFFOLD,
                    phase: this.phase,
                    title: 'Let\'s Step Back',
                    content: 'No worries — let\'s look at this from a different angle.',
                    scaffoldType: 'simplify',
                    next: null
                };
                this.injectNode(scaffoldNode);
                return { action: 'scaffold', node: scaffoldNode };
            }

            if (ratio >= 1.0 && recentQuestions.length >= 3) {
                // Excelling — inject challenge
                const challengeNode = {
                    id: 'extend_' + Date.now(),
                    type: NODE_TYPES.STORY,
                    phase: 'connect',
                    title: 'Ready for More?',
                    content: 'You\'re nailing this! Here\'s something to stretch your thinking.',
                    next: null
                };
                this.injectNode(challengeNode);
                return { action: 'extend', node: challengeNode };
            }

            return null;
        }

        // ── Internal ──

        _resolveNext(node) {
            if (!node.next) return null;

            // Branch nodes use conditional logic
            if (node.type === NODE_TYPES.BRANCH && node.conditions) {
                for (const cond of node.conditions) {
                    if (this._evalCondition(cond)) return cond.target;
                }
                return node.next; // default
            }

            return node.next;
        }

        _evalCondition(cond) {
            if (cond.minScore !== undefined) {
                const pct = this.score.correct / Math.max(1, this.score.correct + this.score.incorrect);
                return pct >= cond.minScore;
            }
            if (cond.lastResult) {
                const last = this.history[this.history.length - 1];
                return last && last.result === cond.lastResult;
            }
            return false;
        }

        _buildFeedback(result, node) {
            if (result === ANSWER_RESULTS.CORRECT) {
                const affirmations = [
                    'Exactly right!', 'That\'s it!', 'Spot on!',
                    'You got it!', 'Nice work!', 'Correct!'
                ];
                return randomChoice(affirmations);
            }
            if (result === ANSWER_RESULTS.PARTIAL) {
                return 'You\'re on the right track! Can you be more specific?';
            }
            if (result === ANSWER_RESULTS.INCORRECT) {
                const nudges = [
                    'Not quite — let\'s think about this differently.',
                    'Hmm, that\'s not what I expected. Try again?',
                    'Close! Think about what the question is really asking.',
                    'Not yet — would a hint help?'
                ];
                return randomChoice(nudges);
            }
            return '';
        }

        _buildSummary() {
            const progress = this.getProgress();
            const elapsed = this.getElapsedTime();
            return {
                topic: this.flow.topic,
                title: this.flow.title,
                score: { ...this.score },
                progress: progress,
                elapsed: elapsed,
                history: [...this.history],
                grade: this.grade,
                comfort: this.comfort,
                mastery: this._estimateMastery()
            };
        }

        _estimateMastery() {
            const total = this.score.correct + this.score.incorrect + this.score.partial;
            if (total === 0) return 'not-assessed';
            const weighted = (this.score.correct + this.score.partial * 0.5) / total;
            if (weighted >= 0.85) return 'mastered';
            if (weighted >= 0.6) return 'developing';
            return 'emerging';
        }

        // ── Persistence ──

        /**
         * Serialize session state to a plain JSON-safe object.
         * Excludes callbacks and computed fields.
         */
        serialize() {
            return {
                _v: 1,
                flowTopic: this.flow.topic,
                flowId: this.flow.id,
                grade: this.grade,
                comfort: this.comfort,
                currentNodeId: this.currentNodeId,
                history: this.history.map(h => ({ ...h })),
                hintsUsed: { ...this.hintsUsed },
                score: { ...this.score },
                startTime: this.startTime,
                phase: this.phase,
                timestamp: Date.now()
            };
        }

        /**
         * Restore session state from a serialized object.
         * Returns true if restore succeeded, false if state was invalid.
         */
        restore(saved) {
            if (!saved || saved._v !== 1) return false;
            if (saved.flowTopic !== this.flow.topic) return false;

            this.currentNodeId = saved.currentNodeId;
            this.history = (saved.history || []).map(h => ({ ...h }));
            this.hintsUsed = { ...saved.hintsUsed };
            this.score = { ...saved.score };
            this.startTime = saved.startTime || Date.now();
            this.phase = saved.phase || 'orient';

            // Verify the current node still exists in this flow
            if (this.currentNodeId && !this.nodeIndex[this.currentNodeId]) {
                this.currentNodeId = this.flow.startNode;
                return false;
            }

            return true;
        }
    }

    // ════════════════════════════════════════════════
    //  HELPERS
    // ════════════════════════════════════════════════

    function setNext(nodes, fromId, toId) {
        const node = nodes.find(n => n.id === fromId);
        if (node && node.next === null) node.next = toId;
    }

    function pickSocratic(type) {
        const stems = SOCRATIC_STEMS[type] || SOCRATIC_STEMS.probe;
        return randomChoice(stems);
    }

    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function titleCase(str) {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // ════════════════════════════════════════════════
    //  FLOW REGISTRY — register custom flows at runtime
    // ════════════════════════════════════════════════

    const _customFlows = {};

    function registerFlow(id, flowDef) {
        _customFlows[id] = flowDef;
    }

    function resolveFlowWithCustom(topicOrId, options) {
        if (_customFlows[topicOrId]) return deepClone(_customFlows[topicOrId]);
        return resolveFlow(topicOrId, options);
    }

    // ════════════════════════════════════════════════
    //  PERSISTENCE — localStorage save/load/list
    // ════════════════════════════════════════════════

    const STORAGE_PREFIX = 'vinculum_sf_';
    const COMPLETED_PREFIX = 'vinculum_sf_done_';

    const persistence = {
        /**
         * Save a session's state to localStorage.
         * @param {FlowSession} session
         */
        save(session) {
            if (typeof localStorage === 'undefined') return false;
            try {
                const key = STORAGE_PREFIX + session.flow.topic;
                const data = session.serialize();
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) { return false; }
        },

        /**
         * Load saved state for a topic. Returns parsed object or null.
         */
        load(topic) {
            if (typeof localStorage === 'undefined') return null;
            try {
                const raw = localStorage.getItem(STORAGE_PREFIX + topic);
                if (!raw) return null;
                return JSON.parse(raw);
            } catch (e) { return null; }
        },

        /**
         * Check if a saved session exists for a topic.
         */
        has(topic) {
            if (typeof localStorage === 'undefined') return false;
            return localStorage.getItem(STORAGE_PREFIX + topic) !== null;
        },

        /**
         * Remove saved session for a topic.
         */
        clear(topic) {
            if (typeof localStorage === 'undefined') return;
            localStorage.removeItem(STORAGE_PREFIX + topic);
        },

        /**
         * Remove all saved sessions.
         */
        clearAll() {
            if (typeof localStorage === 'undefined') return;
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key);
            }
            keys.forEach(k => localStorage.removeItem(k));
        },

        /**
         * List all saved in-progress sessions.
         * Returns array of { topic, grade, score, progress, timestamp, mastery }.
         */
        listSaved() {
            if (typeof localStorage === 'undefined') return [];
            const results = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || !key.startsWith(STORAGE_PREFIX) || key.startsWith(COMPLETED_PREFIX)) continue;
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (!data || !data.flowTopic) continue;
                    const total = (data.score.correct || 0) + (data.score.incorrect || 0) +
                                  (data.score.partial || 0) + (data.score.skipped || 0);
                    results.push({
                        topic: data.flowTopic,
                        grade: data.grade,
                        score: data.score,
                        progress: { answered: data.history ? data.history.length : 0 },
                        timestamp: data.timestamp,
                        mastery: total === 0 ? 'not-assessed' :
                            ((data.score.correct + data.score.partial * 0.5) / total >= 0.85 ? 'mastered' :
                             (data.score.correct + data.score.partial * 0.5) / total >= 0.6 ? 'developing' : 'emerging')
                    });
                } catch (e) { /* skip corrupt entries */ }
            }
            return results.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        },

        /**
         * Record a completed session summary.
         */
        recordCompletion(session) {
            if (typeof localStorage === 'undefined') return false;
            try {
                const key = COMPLETED_PREFIX + session.flow.topic;
                const summary = session._buildSummary();
                const existing = this._getCompletions(session.flow.topic);
                existing.push({
                    timestamp: Date.now(),
                    score: summary.score,
                    mastery: summary.mastery,
                    elapsed: summary.elapsed,
                    grade: summary.grade,
                    comfort: summary.comfort
                });
                // Keep last 10 completions per topic
                if (existing.length > 10) existing.splice(0, existing.length - 10);
                localStorage.setItem(key, JSON.stringify(existing));
                // Remove in-progress save
                this.clear(session.flow.topic);
                return true;
            } catch (e) { return false; }
        },

        /**
         * Get completion history for a topic.
         */
        getCompletions(topic) {
            return this._getCompletions(topic);
        },

        /**
         * Get all completion records across all topics.
         */
        getAllCompletions() {
            if (typeof localStorage === 'undefined') return {};
            const results = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || !key.startsWith(COMPLETED_PREFIX)) continue;
                try {
                    const topic = key.slice(COMPLETED_PREFIX.length);
                    results[topic] = JSON.parse(localStorage.getItem(key));
                } catch (e) { /* skip */ }
            }
            return results;
        },

        _getCompletions(topic) {
            if (typeof localStorage === 'undefined') return [];
            try {
                const raw = localStorage.getItem(COMPLETED_PREFIX + topic);
                return raw ? JSON.parse(raw) : [];
            } catch (e) { return []; }
        }
    };

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        // Core
        NODE_TYPES,
        ANSWER_RESULTS,
        COMFORT_LEVELS,
        SOCRATIC_STEMS,

        /**
         * Start a Socratic flow session.
         * @param {string} topicOrId - Topic name or flow ID
         * @param {Object} options - { grade, comfort, theme }
         * @returns {FlowSession}
         */
        start(topicOrId, options) {
            const opts = options || {};
            const flowDef = resolveFlowWithCustom(topicOrId, opts);
            const session = new FlowSession(flowDef, opts);

            // Auto-inject vocab node at flow start if MCAVocabEngine is available
            if (opts.vocab === true && typeof MCAVocabEngine !== 'undefined') {
                const vocabNode = MCAVocabEngine.generateVocabNode(flowDef.topic, '_vocab_intro');
                if (vocabNode) {
                    vocabNode.next = flowDef.startNode;
                    session.nodeIndex[vocabNode.id] = vocabNode;
                    session.flow.nodes.push(vocabNode);
                    session.flow.startNode = vocabNode.id;
                    session.currentNodeId = vocabNode.id;
                }
            }

            return session;
        },

        /**
         * Resume a saved session for a topic.
         * Returns a FlowSession with restored state, or null if no save exists.
         * @param {string} topic - Topic slug
         * @param {Object} options - { grade, comfort, theme }
         * @returns {FlowSession|null}
         */
        resume(topic, options) {
            const saved = persistence.load(topic);
            if (!saved) return null;

            const flowDef = resolveFlowWithCustom(topic, options);
            const session = new FlowSession(flowDef, options);
            const ok = session.restore(saved);
            if (!ok) {
                persistence.clear(topic);
                return null;
            }
            return session;
        },

        /**
         * Register a custom flow definition.
         */
        registerFlow,

        /**
         * Get a flow definition without starting a session.
         */
        getFlow(topicOrId, options) {
            return resolveFlowWithCustom(topicOrId, options);
        },

        /**
         * List all available flow topics.
         */
        listTopics() {
            const topics = new Set();

            // Custom registered flows
            for (const id of Object.keys(_customFlows)) topics.add(id);

            // SOCRATIC_FLOWS global
            if (typeof SOCRATIC_FLOWS !== 'undefined') {
                for (const id of Object.keys(SOCRATIC_FLOWS)) topics.add(id);
            }

            // DOK_PROBLEMS (auto-generatable)
            if (typeof DOK_PROBLEMS !== 'undefined') {
                for (const key of Object.keys(DOK_PROBLEMS)) topics.add(key);
            }

            return Array.from(topics).sort();
        },

        /**
         * Evaluate an answer against acceptance criteria (utility).
         */
        evaluateAnswer,

        /**
         * Get Socratic question stems by type.
         */
        getSocraticStems(type) {
            return [...(SOCRATIC_STEMS[type] || SOCRATIC_STEMS.probe)];
        },

        /**
         * Persistence API — save/load/list student progress.
         */
        persistence
    };
})();
