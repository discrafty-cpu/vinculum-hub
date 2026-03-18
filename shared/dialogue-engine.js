/**
 * DialogueEngine - Generates structured dialogue and dual error analysis content
 * from STRUCTURED_DIALOGUE_TOPICS, DIALOGUE_PHASES, and related data.
 *
 * Provides topic-aware content for four slide types:
 *   1. Structured Dialogue (3-phase facilitation guide)
 *   2. Dual Error Analysis (Student A vs B comparison)
 *   3. Cooperative Structure Menu (teacher cookbook)
 *   4. Strategy Pivot (grouping recommendations)
 *
 * Falls back to generic templates when topic-specific data isn't available.
 * IIFE pattern, zero server dependencies.
 */

const DialogueEngine = (() => {

    // ════════════════════════════════════════════════
    //  TOPIC MATCHING
    // ════════════════════════════════════════════════

    /**
     * Find the best matching topic data from STRUCTURED_DIALOGUE_TOPICS
     * Uses fuzzy matching: exact > partial > first-word overlap
     */
    function findTopicData(topic) {
        if (!topic || typeof STRUCTURED_DIALOGUE_TOPICS === 'undefined') return null;
        const lower = topic.toLowerCase().trim();

        // Exact match
        if (STRUCTURED_DIALOGUE_TOPICS[lower]) return { key: lower, data: STRUCTURED_DIALOGUE_TOPICS[lower] };

        // Partial match (topic string contained in key or key contained in topic)
        const keys = Object.keys(STRUCTURED_DIALOGUE_TOPICS);
        for (const k of keys) {
            if (k.includes(lower) || lower.includes(k)) return { key: k, data: STRUCTURED_DIALOGUE_TOPICS[k] };
        }

        // First-word overlap
        const words = lower.split(' ').filter(w => w.length > 3);
        for (const k of keys) {
            const kWords = k.split(' ');
            if (words.some(w => kWords.includes(w))) return { key: k, data: STRUCTURED_DIALOGUE_TOPICS[k] };
        }

        return null;
    }

    /**
     * Get CRA level for a topic based on grade
     */
    function getCRALevel(topic, grade) {
        const match = findTopicData(topic);
        if (match && match.data.craLevel) return match.data.craLevel;
        // Default by grade
        if (grade <= 6) return 'concrete';
        if (grade <= 8) return 'representational';
        return 'abstract';
    }

    // ════════════════════════════════════════════════
    //  STRUCTURED DIALOGUE CONTENT
    // ════════════════════════════════════════════════

    /**
     * Get three-phase dialogue questions for a topic
     * Returns { orientation: [], analysis: [], connection: [] }
     * Merges topic-specific questions with generic ones
     */
    function getDialogueQuestions(topic) {
        const match = findTopicData(topic);
        const generic = typeof DIALOGUE_PHASES !== 'undefined' ? DIALOGUE_PHASES : null;

        const result = {
            orientation: [],
            analysis: [],
            connection: []
        };

        // Topic-specific questions first
        if (match && match.data.phaseQuestions) {
            const pq = match.data.phaseQuestions;
            if (pq.orientation) result.orientation.push(...pq.orientation);
            if (pq.analysis) result.analysis.push(...pq.analysis);
            if (pq.connection) result.connection.push(...pq.connection);
        }

        // Fill with generic questions
        if (generic) {
            for (const phase of ['orientation', 'analysis', 'connection']) {
                const needed = phase === 'analysis' ? 5 : 3;
                const remaining = needed - result[phase].length;
                if (remaining > 0 && generic[phase] && generic[phase].generic) {
                    result[phase].push(...generic[phase].generic.slice(0, remaining));
                }
            }
        }

        return result;
    }

    /**
     * Get the solved problem for a topic (for the structured dialogue slide)
     * Returns the correct solution only
     */
    function getSolvedProblem(topic) {
        const match = findTopicData(topic);
        if (!match || !match.data.solvedProblems || match.data.solvedProblems.length === 0) {
            return null;
        }
        const sp = match.data.solvedProblems[0];
        return {
            problem: sp.problem,
            student: sp.correctSolution.student,
            steps: sp.correctSolution.steps
        };
    }

    // ════════════════════════════════════════════════
    //  DUAL ERROR ANALYSIS CONTENT
    // ════════════════════════════════════════════════

    /**
     * Get dual error analysis pair for a topic
     * Returns { problem, studentA: {name, steps}, studentB: {name, steps},
     *           errorType, errorStep, errorExplanation, isStrategyComparison }
     */
    function getErrorPair(topic) {
        const match = findTopicData(topic);
        if (!match || !match.data.solvedProblems || match.data.solvedProblems.length === 0) {
            return null;
        }

        const sp = match.data.solvedProblems[0];

        // Randomly assign correct/incorrect to A/B (keeps students guessing)
        const correctFirst = Math.random() > 0.5;

        return {
            problem: sp.problem,
            studentA: {
                name: correctFirst ? sp.correctSolution.student : sp.incorrectSolution.student,
                steps: correctFirst ? sp.correctSolution.steps : sp.incorrectSolution.steps,
                isCorrect: correctFirst
            },
            studentB: {
                name: correctFirst ? sp.incorrectSolution.student : sp.correctSolution.student,
                steps: correctFirst ? sp.incorrectSolution.steps : sp.correctSolution.steps,
                isCorrect: !correctFirst
            },
            errorType: sp.incorrectSolution.errorType,
            errorStep: sp.incorrectSolution.errorStep,
            errorExplanation: sp.incorrectSolution.errorExplanation,
            isStrategyComparison: sp.isStrategyComparison || false
        };
    }

    /**
     * Get guiding questions for error analysis
     * Merges error-type-specific questions with generic ones
     */
    function getErrorQuestions(errorType) {
        if (typeof ERROR_ANALYSIS_QUESTIONS === 'undefined') return [];

        const questions = [...(ERROR_ANALYSIS_QUESTIONS.generic || [])];

        if (errorType && ERROR_ANALYSIS_QUESTIONS[errorType]) {
            questions.push(...ERROR_ANALYSIS_QUESTIONS[errorType]);
        }

        return questions;
    }

    /**
     * Get error type metadata
     */
    function getErrorTypeInfo(errorType) {
        if (typeof ERROR_TYPES === 'undefined' || !errorType) return null;
        return ERROR_TYPES[errorType] || null;
    }

    // ════════════════════════════════════════════════
    //  COOPERATIVE STRUCTURES
    // ════════════════════════════════════════════════

    /**
     * Get all cooperative structures with both dialogue and error applications
     */
    function getCooperativeStructures() {
        if (typeof COOPERATIVE_STRUCTURES === 'undefined') return [];
        return Object.values(COOPERATIVE_STRUCTURES);
    }

    /**
     * Recommend structures based on class context
     * @param {string} context - 'new-concept' | 'review' | 'independent' | 'mixed'
     * @returns top 2-3 recommended structures
     */
    function recommendStructures(context) {
        const all = getCooperativeStructures();
        if (all.length === 0) return [];

        const recommendations = {
            'new-concept': ['think-write-pair-share', 'numbered-heads'],
            'review': ['jigsaw', 'partner-coaching'],
            'independent': ['think-write-pair-share', 'directions-for-a-friend'],
            'mixed': ['partner-coaching', 'numbered-heads', 'jigsaw']
        };

        const keys = recommendations[context] || recommendations['mixed'];
        return keys.map(k => COOPERATIVE_STRUCTURES[k]).filter(Boolean);
    }

    // ════════════════════════════════════════════════
    //  DIFFERENTIATION
    // ════════════════════════════════════════════════

    /**
     * Get differentiation modifications for all student groups
     */
    function getDifferentiationMods() {
        if (typeof DIALOGUE_DIFFERENTIATION === 'undefined') return [];
        return Object.values(DIALOGUE_DIFFERENTIATION);
    }

    // ════════════════════════════════════════════════
    //  SLIDE GROUPING RECOMMENDATIONS
    // ════════════════════════════════════════════════

    /**
     * Recommend slide pack groupings based on analysis
     * Returns pack definitions: Core, Dialogue, Error Analysis, Full
     */
    function getSlideGroups(analysis) {
        const topics = (analysis && analysis.topics) || [];
        const hasDialogueData = topics.some(t => findTopicData(t) !== null);

        return {
            core: {
                name: 'Core Lesson',
                description: 'Learning target, warm-up, instruction, practice, exit ticket',
                slides: 'Standard rebuilt lesson',
                recommended: true
            },
            dialogue: {
                name: 'Dialogue Pack',
                description: 'Structured dialogue slides with 3-phase facilitation guides',
                slides: hasDialogueData
                    ? topics.filter(t => findTopicData(t)).map(t => `Dialogue: ${t}`).join(', ')
                    : 'Generic dialogue template',
                available: true
            },
            errorAnalysis: {
                name: 'Error Analysis Pack',
                description: 'Dual student work comparison with guided questions',
                slides: hasDialogueData
                    ? topics.filter(t => findTopicData(t)).map(t => `Error Analysis: ${t}`).join(', ')
                    : 'Generic error analysis template',
                available: true
            },
            combined: {
                name: 'Full Teaching Toolkit',
                description: 'Core lesson + dialogues + error analysis + cooperative structures',
                slides: 'All slides interleaved in recommended teaching sequence',
                available: true
            }
        };
    }

    /**
     * Get the recommended sequencing for a combined deck
     * Based on Section 4 of the document (unit sequences)
     */
    function getRecommendedSequence(topics) {
        const sequence = [];

        for (const topic of topics) {
            const match = findTopicData(topic);
            if (match) {
                sequence.push(
                    { type: 'structured-dialogue', topic, phase: 'Introduce with solved problem analysis' },
                    { type: 'dual-error-analysis', topic, phase: 'Deepen with error identification' },
                    { type: 'cooperative-structure', topic, phase: 'Practice with partner/group structure' }
                );
            } else {
                sequence.push(
                    { type: 'structured-dialogue', topic, phase: 'Generic dialogue template' }
                );
            }
        }

        return sequence;
    }

    // ════════════════════════════════════════════════
    //  FORMAT OPTIONS
    // ════════════════════════════════════════════════

    function getFormatOptions() {
        if (typeof DIALOGUE_FORMATS === 'undefined') return [];
        return Object.values(DIALOGUE_FORMATS);
    }

    // ════════════════════════════════════════════════
    //  CRA ALIGNMENT
    // ════════════════════════════════════════════════

    function getCRAAlignment() {
        if (typeof CRA_DIALOGUE_ALIGNMENT === 'undefined') return {};
        return CRA_DIALOGUE_ALIGNMENT;
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        // Topic matching
        findTopicData,
        getCRALevel,

        // Structured Dialogue
        getDialogueQuestions,
        getSolvedProblem,

        // Error Analysis
        getErrorPair,
        getErrorQuestions,
        getErrorTypeInfo,

        // Cooperative Structures
        getCooperativeStructures,
        recommendStructures,

        // Differentiation
        getDifferentiationMods,

        // Slide Grouping
        getSlideGroups,
        getRecommendedSequence,

        // Formats
        getFormatOptions,
        getCRAAlignment
    };

})();
