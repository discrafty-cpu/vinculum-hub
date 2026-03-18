/* ═══════════════════════════════════════════════════════════
   SOCRATIC FLOWS DATA — Curated Branching Flow Definitions
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   Hand-crafted Socratic flows with branching paths, visuals,
   scaffolding, and story arcs. These override the auto-generated
   flows from DOK_PROBLEMS when a matching topic is found.

   Each flow is a directed graph of nodes:
     - story     → narrative framing
     - question  → prompts with accept criteria + hints
     - visual    → MathVisualEngine rendering
     - reveal    → shows correct answer + explanation
     - branch    → conditional routing based on performance
     - scaffold  → scaffolded support for struggling learners
     - celebrate → milestone reinforcement

   Keyed by topic slug (matches DOK_PROBLEMS keys).
   ═══════════════════════════════════════════════════════════ */

const SOCRATIC_FLOWS = {

    // ═══════════════════════════════════════════════════
    //  GRADE 6: FRACTIONS
    // ═══════════════════════════════════════════════════

    'multiplication and division of fractions': {
        id: 'fractions-multiply-divide',
        topic: 'multiplication and division of fractions',
        grade: 6,
        title: 'Fraction Operations: Multiply & Divide',
        description: 'Guided Socratic exploration of fraction multiplication and division with visual models.',
        standards: {
            ccss: ['6.NS.1'],
            mn: ['6.1.3.1', '6.1.3.2', '6.1.3.3'],
            teks: ['6.3E']
            // Future alignments: ngss, ibo, state_*, act, sat, etc.
        },
        startNode: 'story_intro',
        nodes: [
            // ── Act 1: Orient ──
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Pizza Problem',
                content: 'Your class ordered pizza for a party. You have **2/3** of a pizza left, and you want to share it equally among **4 friends**.\n\nBefore we solve anything — let\'s just *think* about it.',
                next: 'q_estimate'
            },
            {
                id: 'q_estimate',
                type: 'question',
                phase: 'orient',
                prompt: 'Without calculating: will each friend get more or less than half the pizza? How do you know?',
                accept: { keywords: ['less', 'smaller', 'not much', 'little'], keywordThreshold: 0.3 },
                hints: [
                    'You\'re splitting 2/3 among 4 people. Is 2/3 even a whole pizza?',
                    'If you had a WHOLE pizza split 4 ways, each gets 1/4. But you have less than a whole...'
                ],
                sentenceFrames: [
                    'I think each friend gets ___ because ___.',
                    'Since 2/3 is less than 1, each person gets ___.'
                ],
                socraticFollow: 'What made you think that? What did you picture in your mind?',
                next: 'visual_fraction'
            },
            {
                id: 'visual_fraction',
                type: 'visual',
                phase: 'orient',
                title: 'Let\'s See It',
                content: 'Here\'s what 2/3 of a pizza looks like:',
                visual: { type: 'fractionBar', num: 2, denom: 3 },
                next: 'q_operation'
            },
            // ── Act 2: Explore ──
            {
                id: 'q_operation',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Sharing 2/3 equally among 4 friends — is that multiplication or division? Which expression represents this?',
                accept: { keywords: ['division', 'divide', '2/3 divided by 4', '2/3 ÷ 4'], keywordThreshold: 0.3 },
                hints: [
                    '"Sharing equally" is a clue. What operation splits things into equal groups?',
                    'We\'re splitting 2/3 into 4 equal parts. That\'s 2/3 ÷ 4.'
                ],
                socraticFollow: 'How did you decide? What does "sharing equally" tell you about the operation?',
                next: 'reveal_operation'
            },
            {
                id: 'reveal_operation',
                type: 'reveal',
                phase: 'explore',
                content: '**2/3 ÷ 4** — "sharing equally" means division.',
                explanation: 'When you split something into equal groups, you divide.',
                next: 'q_invert'
            },
            {
                id: 'q_invert',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'To divide by a whole number, we can "multiply by the reciprocal." What is the reciprocal of 4?',
                accept: { exact: ['1/4', '1 / 4', 'one fourth', 'one quarter'], numeric: '1/4', tolerance: 0.01 },
                hints: [
                    'The reciprocal flips a number. Write 4 as a fraction first: 4/1.',
                    'Flip 4/1 upside down. What do you get?'
                ],
                socraticFollow: 'Why does flipping work? What does "reciprocal" really mean?',
                next: 'q_solve'
            },
            {
                id: 'q_solve',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Now solve: 2/3 × 1/4 = ?',
                accept: { exact: ['2/12', '1/6'], numeric: '1/6', tolerance: 0.01 },
                hints: [
                    'Multiply numerator × numerator and denominator × denominator.',
                    '2 × 1 = ? and 3 × 4 = ? Then simplify.'
                ],
                socraticFollow: 'Can you simplify 2/12? What\'s the GCF of 2 and 12?',
                next: 'reveal_solve'
            },
            {
                id: 'reveal_solve',
                type: 'reveal',
                phase: 'explore',
                content: '**2/3 × 1/4 = 2/12 = 1/6**\n\nEach friend gets 1/6 of the whole pizza.',
                explanation: '2×1=2, 3×4=12, then simplify by dividing both by 2.',
                next: 'visual_result'
            },
            {
                id: 'visual_result',
                type: 'visual',
                phase: 'explore',
                title: 'Each Friend\'s Share',
                content: 'Here\'s what 1/6 of the pizza looks like — each friend gets this much:',
                visual: { type: 'fractionCircle', num: 1, denom: 6 },
                next: 'branch_check'
            },
            // ── Branch: adapt based on performance ──
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_visual' }
                ],
                next: 'q_challenge' // default
            },
            // ── Scaffold path ──
            {
                id: 'scaffold_visual',
                type: 'scaffold',
                phase: 'explore',
                title: 'Let\'s Step Back and See It',
                content: 'No worries! Let\'s look at fraction division using a picture.\n\nWhen we divide 2/3 by 4, we\'re cutting each third into 4 pieces.\nThat gives us pieces that are each **1/12** of the whole.\nWe started with **2** thirds, so we have **2/12 = 1/6**.',
                next: 'q_practice_easy'
            },
            {
                id: 'q_practice_easy',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Try this one: 1/2 ÷ 3 = ?',
                accept: { exact: ['1/6'], numeric: '1/6', tolerance: 0.01 },
                hints: [
                    'Rewrite as: 1/2 × 1/3',
                    '1 × 1 = 1, and 2 × 3 = 6'
                ],
                socraticFollow: 'Does the answer make sense? Is 1/6 less than 1/2?',
                next: 'q_challenge'
            },
            // ── Act 3: Connect (challenge) ──
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A board is 5/6 foot long. You cut it into pieces that are 1/12 foot each. How many pieces do you get? Write the expression AND solve it.',
                accept: { keywords: ['5/6', '1/12', '10', 'ten'], keywordThreshold: 0.4 },
                hints: [
                    'How many 1/12 pieces fit in 5/6? That\'s division: 5/6 ÷ 1/12.',
                    'To divide fractions, multiply by the reciprocal: 5/6 × 12/1.'
                ],
                socraticFollow: 'Why did the answer get BIGGER when we divided a fraction by a fraction? When does that happen?',
                next: 'reveal_challenge'
            },
            {
                id: 'reveal_challenge',
                type: 'reveal',
                phase: 'connect',
                content: '**5/6 ÷ 1/12 = 5/6 × 12/1 = 60/6 = 10 pieces**',
                explanation: 'Dividing by a fraction less than 1 makes the answer bigger — you\'re asking "how many small pieces fit?"',
                next: 'q_reflect'
            },
            {
                id: 'q_reflect',
                type: 'question',
                phase: 'connect',
                prompt: 'In your own words: when you divide by a fraction smaller than 1, does the answer get bigger or smaller? Why?',
                accept: { keywords: ['bigger', 'larger', 'more', 'increases'], keywordThreshold: 0.3 },
                hints: [
                    'Think about how many tiny pieces fit inside a bigger piece.',
                    'If each piece is very small, you can fit MORE of them.'
                ],
                socraticFollow: 'Can you think of a real-life example where dividing makes something bigger?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Excellent Mathematical Thinking!',
                content: 'You just explored fraction multiplication and division using the **Socratic method** — questioning, estimating, visualizing, and proving.\n\nKey insight: *Dividing by a fraction less than 1 gives a BIGGER answer because you\'re counting how many small pieces fit.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: RATIOS AND RATES
    // ═══════════════════════════════════════════════════

    'ratios and rates': {
        id: 'ratios-rates',
        topic: 'ratios and rates',
        grade: 6,
        title: 'Ratios & Rates: Finding Patterns',
        description: 'Socratic exploration of ratios, unit rates, and proportional reasoning.',
        standards: {
            ccss: ['6.RP.1', '6.RP.2', '6.RP.3'],
            mn: ['6.1.2.1', '6.1.2.2'],
            teks: ['6.4B', '6.4C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Lemonade Stand',
                content: 'You and your friend are making lemonade. The recipe says: **3 cups of water** for every **1 cup of lemon juice**.\n\nYou need to make a LOT — enough for the whole school!',
                next: 'q_ratio_read'
            },
            {
                id: 'q_ratio_read',
                type: 'question',
                phase: 'orient',
                prompt: 'What is the ratio of water to lemon juice? Write it three different ways.',
                accept: { keywords: ['3:1', '3 to 1', '3/1', 'three to one'], keywordThreshold: 0.3 },
                hints: [
                    'A ratio compares two quantities. Here: water to lemon juice.',
                    'You can write ratios as: 3:1, 3 to 1, or 3/1.'
                ],
                sentenceFrames: [
                    'The ratio is ___ because for every ___ cups of water there is ___ cup of juice.',
                    'Three ways to write this ratio: ___, ___, and ___.'
                ],
                socraticFollow: 'Do all three ways mean the same thing? How are they different?',
                next: 'reveal_ratio'
            },
            {
                id: 'reveal_ratio',
                type: 'reveal',
                phase: 'orient',
                content: '**3:1, 3 to 1, or 3/1** — all mean "3 cups water per 1 cup lemon juice."',
                explanation: 'Ratios can be written with a colon, with words, or as a fraction.',
                next: 'visual_ratio_table'
            },
            {
                id: 'visual_ratio_table',
                type: 'visual',
                phase: 'orient',
                title: 'The Ratio Table',
                content: 'See how the ratio stays the same as we scale up:',
                visual: { type: 'ratioTable', labelA: 'Water', labelB: 'Lemon', pairs: [[3,1],[6,2],[9,3]] },
                next: 'q_scale_up'
            },
            {
                id: 'q_scale_up',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'If you use 9 cups of water, how many cups of lemon juice do you need to keep the same ratio?',
                accept: { exact: ['3'], numeric: 3, tolerance: 0.01 },
                hints: [
                    '9 is how many times bigger than 3?',
                    'If water tripled (3→9), lemon juice must also triple.'
                ],
                socraticFollow: 'What operation did you use? Why does multiplying both parts by the same number keep the ratio the same?',
                next: 'reveal_scale'
            },
            {
                id: 'reveal_scale',
                type: 'reveal',
                phase: 'explore',
                content: '**3 cups of lemon juice.** The ratio 9:3 simplifies to 3:1 — same taste!',
                explanation: 'Multiply both parts of the ratio by the same number to scale up.',
                next: 'q_unit_rate'
            },
            {
                id: 'q_unit_rate',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Store A sells 5 lemons for $3. Store B sells 8 lemons for $5. Which store gives you a better deal? How do you know?',
                accept: { keywords: ['store a', 'a', '0.60', '60 cents', 'cheaper'], keywordThreshold: 0.3 },
                hints: [
                    'Find the price per lemon at each store (unit rate).',
                    'Store A: $3 ÷ 5 = ? per lemon. Store B: $5 ÷ 8 = ? per lemon.'
                ],
                socraticFollow: 'Why is "per lemon" more useful than "total price" for comparing?',
                next: 'reveal_unit_rate'
            },
            {
                id: 'reveal_unit_rate',
                type: 'reveal',
                phase: 'explore',
                content: '**Store A: $0.60/lemon. Store B: $0.625/lemon.** Store A is the better deal.',
                explanation: 'Unit rates make comparison easy by converting to "per one."',
                next: 'q_real_world'
            },
            {
                id: 'q_real_world',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A car travels 240 miles in 4 hours. At the same rate, how far will it go in 7 hours?',
                accept: { exact: ['420'], numeric: 420, tolerance: 1 },
                hints: [
                    'First find the unit rate: miles per hour.',
                    '240 ÷ 4 = 60 mph. Now multiply by 7.'
                ],
                socraticFollow: 'If the speed changed halfway through, could you still use one ratio? What would you need instead?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Ratio Master!',
                content: 'You just used **proportional reasoning** — one of the most powerful tools in math and everyday life.\n\nKey insight: *Find the unit rate first, then scale to any amount.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: EQUIVALENCE AND REPRESENTATIONS
    // ═══════════════════════════════════════════════════

    'equivalence and representations': {
        id: 'equivalence-reps',
        topic: 'equivalence and representations',
        grade: 6,
        title: 'Fractions, Decimals & Percents: Same Value, Different Face',
        description: 'Socratic exploration of equivalent representations.',
        standards: {
            ccss: ['6.NS.6', '6.RP.3c'],
            mn: ['6.1.1.4'],
            teks: ['6.4G', '6.5C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Discount Dilemma',
                content: 'Three stores are having a sale on the same sneakers.\n\n- **Store A**: 1/3 off\n- **Store B**: 30% off\n- **Store C**: $0.35 off per dollar\n\nWhich store has the best deal?',
                next: 'q_predict'
            },
            {
                id: 'q_predict',
                type: 'question',
                phase: 'orient',
                prompt: 'Before calculating — which store do you THINK has the biggest discount? Trust your gut.',
                accept: { keywords: ['a', 'b', 'c', 'store', 'think', 'guess'], keywordThreshold: 0 },
                hints: ['There\'s no wrong answer here — just your instinct. Which number feels biggest?'],
                sentenceFrames: [
                    'I think Store ___ has the best deal because ___.',
                    'My gut says ___ because ___ seems like the biggest number.'
                ],
                socraticFollow: 'Interesting! How can we check if our instinct is right?',
                next: 'q_convert_a'
            },
            {
                id: 'q_convert_a',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Convert 1/3 to a decimal. (Hint: divide 1 by 3.)',
                accept: { exact: ['0.333', '0.33', '.333', '.33', '0.3333'], numeric: 0.333, tolerance: 0.005 },
                hints: [
                    '1 ÷ 3 = ?',
                    'It\'s a repeating decimal: 0.333...'
                ],
                socraticFollow: 'Why does 1÷3 repeat forever? Will it ever "end"?',
                next: 'q_compare'
            },
            {
                id: 'q_compare',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Now we can compare:\n- Store A: 0.333...\n- Store B: 0.30\n- Store C: 0.35\n\nWhich is the biggest discount?',
                accept: { keywords: ['c', 'store c', '0.35', '35'], keywordThreshold: 0.3 },
                hints: [
                    'Line up the decimals and compare: 0.30, 0.333, 0.35.',
                    'Which decimal is furthest to the right on a number line?'
                ],
                socraticFollow: 'Were you surprised? Was your prediction right?',
                next: 'reveal_compare'
            },
            {
                id: 'reveal_compare',
                type: 'reveal',
                phase: 'explore',
                content: '**Store C (0.35 = 35% off)** is the best deal.\n\nOrder: 30% < 33.3% < 35%',
                explanation: 'Converting to the same form (all decimals or all percents) makes comparison easy.',
                next: 'visual_compare_line'
            },
            {
                id: 'visual_compare_line',
                type: 'visual',
                phase: 'explore',
                title: 'See Them on a Number Line',
                content: 'All three discounts plotted side by side:',
                visual: { type: 'numberLine', min: 0.2, max: 0.4, points: [0.30, 0.333, 0.35] },
                next: 'q_strategy'
            },
            {
                id: 'q_strategy',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'What strategy would you tell a friend to use when comparing fractions, decimals, and percents?',
                accept: { keywords: ['convert', 'same', 'decimal', 'percent', 'compare', 'change'], keywordThreshold: 0.3 },
                hints: [
                    'What did we do to solve the store problem?',
                    'We changed everything to the same form...'
                ],
                socraticFollow: 'Is there a form you find easiest to compare? Why that one?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Smart Shopper, Smart Mathematician!',
                content: 'You just discovered the **Universal Comparison Strategy**: convert to the same representation, then compare.\n\nThis works everywhere — shopping, cooking, sports stats, and beyond.',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 7: PROPORTIONAL RELATIONSHIPS
    // ═══════════════════════════════════════════════════

    'proportional relationships': {
        id: 'proportional-rels',
        topic: 'proportional relationships',
        grade: 7,
        title: 'Proportional Relationships: The Constant Connection',
        description: 'Discover proportional relationships through tables, graphs, and equations.',
        standards: {
            ccss: ['7.RP.2', '7.RP.2a', '7.RP.2b'],
            mn: ['7.1.2.1'],
            teks: ['7.4A', '7.4C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Road Trip',
                content: 'Your family is driving to a cabin. The car uses gas at a steady rate:\n\n| Miles | Gallons |\n|-------|--------|\n| 30 | 1 |\n| 60 | 2 |\n| 90 | 3 |\n| 150 | ? |',
                next: 'visual_ratio_table'
            },
            {
                id: 'visual_ratio_table',
                type: 'visual',
                phase: 'orient',
                title: 'The Data Table',
                content: 'Here\'s the same data as a ratio table:',
                visual: { type: 'ratioTable', labelA: 'Miles', labelB: 'Gallons', pairs: [[30,1],[60,2],[90,3]] },
                next: 'q_pattern'
            },
            {
                id: 'q_pattern',
                type: 'question',
                phase: 'orient',
                prompt: 'What pattern do you notice in the table? What stays the same?',
                accept: { keywords: ['30', 'times', 'multiply', 'constant', 'same', 'per gallon', 'ratio'], keywordThreshold: 0.3 },
                hints: [
                    'Divide miles by gallons for each row. What do you get?',
                    '30÷1=30, 60÷2=30, 90÷3=30...'
                ],
                sentenceFrames: [
                    'I notice that ___ stays the same in each row.',
                    'The pattern is ___ because ___.'
                ],
                socraticFollow: 'Why does that number stay constant? What does it represent in real life?',
                next: 'q_missing'
            },
            {
                id: 'q_missing',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'How many gallons for 150 miles?',
                accept: { exact: ['5'], numeric: 5, tolerance: 0.01 },
                hints: [
                    'The rate is 30 miles per gallon. 150 ÷ 30 = ?',
                    'Or use the pattern: 150 is 5 times 30.'
                ],
                socraticFollow: 'Could you have solved this a different way? How many methods can you think of?',
                next: 'reveal_missing'
            },
            {
                id: 'reveal_missing',
                type: 'reveal',
                phase: 'explore',
                content: '**5 gallons.** 150 ÷ 30 = 5, or equivalently: 150/5 = 30 mpg (constant rate).',
                next: 'q_equation'
            },
            {
                id: 'q_equation',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Write an equation that relates miles (m) to gallons (g).',
                accept: { keywords: ['m = 30g', 'm=30g', '30g', '30 times g', '30 * g'], keywordThreshold: 0.3 },
                hints: [
                    'Miles = (some number) × gallons. What\'s the number?',
                    'The constant ratio is 30. So m = 30 × g.'
                ],
                socraticFollow: 'In y = kx form, what is k? What does k tell you about the real situation?',
                next: 'q_nonprop'
            },
            {
                id: 'q_nonprop',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A taxi charges $3 base fee plus $2 per mile. Is the total cost proportional to miles driven? Why or why not?',
                accept: { keywords: ['no', 'not proportional', 'base fee', 'fixed', 'starting', 'y-intercept', 'doesn\'t start at zero'], keywordThreshold: 0.3 },
                hints: [
                    'Make a mini table: 0 miles = $3, 1 mile = $5, 2 miles = $7. Divide cost by miles each time.',
                    'If it were proportional, 0 miles would cost $0. Does it?'
                ],
                socraticFollow: 'How can you tell from a graph whether a relationship is proportional?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Proportional Thinker!',
                content: 'You discovered the **constant of proportionality** — the ratio that never changes.\n\nKey test: *Does y/x always equal the same number? Does the graph go through the origin?* If yes → proportional.',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 7: SOLVE EQUATIONS
    // ═══════════════════════════════════════════════════

    'solve equations': {
        id: 'solve-equations',
        topic: 'solve equations',
        grade: 7,
        title: 'Solving Equations: Undoing Operations',
        description: 'Socratic exploration of equation solving as "undoing" — inverse operations.',
        standards: {
            ccss: ['7.EE.4', '7.EE.4a'],
            mn: ['7.2.3.1'],
            teks: ['7.11A']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Mystery Number',
                content: 'I\'m thinking of a number. I **multiply it by 3**, then **add 5**, and I get **20**.\n\nWhat was my original number?',
                next: 'q_guess'
            },
            {
                id: 'q_guess',
                type: 'question',
                phase: 'orient',
                prompt: 'Can you guess the mystery number? Try any strategy you want.',
                accept: { exact: ['5'], numeric: 5, tolerance: 0.01 },
                hints: [
                    'Work backwards: start with 20, then undo each step.',
                    'Undo "add 5" → 20 - 5 = 15. Now undo "multiply by 3" → 15 ÷ 3 = ?'
                ],
                sentenceFrames: [
                    'I think the number is ___ because ___.',
                    'I worked backwards by ___.'
                ],
                socraticFollow: 'How did you figure it out? Did you work forwards or backwards?',
                next: 'reveal_guess'
            },
            {
                id: 'reveal_guess',
                type: 'reveal',
                phase: 'orient',
                content: '**The number is 5.** Check: 5 × 3 = 15, then 15 + 5 = 20.',
                explanation: 'Working backwards (undoing) is exactly what solving an equation does!',
                next: 'visual_solution'
            },
            {
                id: 'visual_solution',
                type: 'visual',
                phase: 'orient',
                title: 'The Solution on a Number Line',
                content: 'Here\'s where our mystery number lands:',
                visual: { type: 'numberLine', min: 0, max: 10, points: [5] },
                next: 'q_write_equation'
            },
            {
                id: 'q_write_equation',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Write this puzzle as an equation using x for the mystery number.',
                accept: { keywords: ['3x', '+ 5', '= 20', '3x + 5'], keywordThreshold: 0.5 },
                hints: [
                    'Start: x. Multiply by 3: 3x. Add 5: 3x + 5. Equals 20.',
                    'The equation is: 3x + 5 = 20'
                ],
                socraticFollow: 'Why is this equation the same as the mystery number puzzle?',
                next: 'q_solve_step1'
            },
            {
                id: 'q_solve_step1',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Solve 3x + 5 = 20. What\'s the first step?',
                accept: { keywords: ['subtract 5', '- 5', 'minus 5', 'undo', 'remove'], keywordThreshold: 0.3 },
                hints: [
                    'To isolate x, undo the operations in reverse order. Last thing done was +5.',
                    'To undo +5, we subtract 5 from both sides.'
                ],
                socraticFollow: 'Why do we undo the LAST operation first? Why not divide by 3 first?',
                next: 'q_solve_step2'
            },
            {
                id: 'q_solve_step2',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'After subtracting 5 from both sides: 3x = 15. What\'s next?',
                accept: { keywords: ['divide', '÷ 3', '/ 3', 'divide by 3'], keywordThreshold: 0.3 },
                hints: [
                    '3x means 3 times x. What\'s the opposite of multiplying by 3?',
                    'Divide both sides by 3.'
                ],
                socraticFollow: 'We "undid" addition with subtraction, and multiplication with division. What pattern do you see?',
                next: 'q_new_equation'
            },
            {
                id: 'q_new_equation',
                type: 'question',
                phase: 'connect',
                dok: 2,
                prompt: 'Your turn: Solve 2x - 7 = 13',
                accept: { exact: ['10', 'x = 10', 'x=10'], numeric: 10, tolerance: 0.01 },
                hints: [
                    'First undo -7: add 7 to both sides. 2x = 20.',
                    'Then undo ×2: divide both sides by 2.'
                ],
                socraticFollow: 'How would you check your answer?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Equation Solver!',
                content: 'You just discovered that solving equations is about **undoing operations in reverse order**.\n\nThe big idea: *Whatever was done last gets undone first — like unwrapping a present, layer by layer.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 8: PYTHAGOREAN THEOREM
    // ═══════════════════════════════════════════════════

    'pythagorean theorem': {
        id: 'pythagorean-theorem',
        topic: 'pythagorean theorem',
        grade: 8,
        title: 'The Pythagorean Theorem: Why It Works',
        description: 'Discover the Pythagorean theorem through area reasoning.',
        standards: {
            ccss: ['8.G.6', '8.G.7'],
            mn: ['8.3.1.1'],
            teks: ['8.7C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Tilted Square',
                content: 'Imagine a right triangle with legs **3** and **4**.\n\nNow imagine building a square on each side — one square on the leg of 3, one on the leg of 4, and one on the hypotenuse.\n\nSomething magical happens with their areas...',
                next: 'q_areas'
            },
            {
                id: 'q_areas',
                type: 'question',
                phase: 'orient',
                prompt: 'What is the area of the square built on the side of length 3? And the square on the side of length 4?',
                accept: { keywords: ['9', '16', 'nine', 'sixteen'], keywordThreshold: 0.5 },
                hints: [
                    'Area of a square = side × side.',
                    '3 × 3 = 9 and 4 × 4 = 16.'
                ],
                socraticFollow: 'What do you think the area of the third square (on the hypotenuse) might be?',
                next: 'visual_squares'
            },
            {
                id: 'visual_squares',
                type: 'visual',
                phase: 'orient',
                title: 'Squares on Each Side',
                content: 'The area model shows the two squares — 3×3 = 9 and 4×4 = 16:',
                visual: { type: 'areaModel', a: 3, b: 4 },
                next: 'q_predict_hyp'
            },
            {
                id: 'q_predict_hyp',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: '9 + 16 = 25. If the areas of the two smaller squares add up to the area of the largest square, what is the hypotenuse?',
                accept: { exact: ['5'], numeric: 5, tolerance: 0.01 },
                hints: [
                    'If the big square has area 25, what is its side length?',
                    'What number times itself equals 25?'
                ],
                socraticFollow: 'Why does adding the AREAS tell us about the SIDES? What\'s the connection?',
                next: 'q_formula'
            },
            {
                id: 'q_formula',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Write a formula that says "the square on leg a plus the square on leg b equals the square on the hypotenuse c."',
                accept: { keywords: ['a²', 'b²', 'c²', 'a^2', 'b^2', 'c^2', 'a2 + b2', 'a squared'], keywordThreshold: 0.3 },
                hints: [
                    'Square on a means a². Square on b means b².',
                    'a² + b² = c²'
                ],
                socraticFollow: 'This is over 2,500 years old. Why do you think it\'s still so important?',
                next: 'q_apply'
            },
            {
                id: 'q_apply',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A ladder is 13 feet long, placed 5 feet from a wall. How high up the wall does it reach?',
                accept: { exact: ['12'], numeric: 12, tolerance: 0.01 },
                hints: [
                    'The ladder is the hypotenuse (13), the ground is one leg (5).',
                    '5² + h² = 13². So 25 + h² = 169. h² = 144. h = ?'
                ],
                socraticFollow: 'Is this a real situation where the Pythagorean theorem matters? Can you think of others?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Pythagorean Pro!',
                content: 'You discovered the **Pythagorean Theorem** through *area reasoning* — the way it was originally understood.\n\n**a² + b² = c²** isn\'t just a formula to memorize. It\'s a beautiful fact about *space itself*.',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: PERCENT
    // ═══════════════════════════════════════════════════

    'percent': {
        id: 'percent-basics',
        topic: 'percent',
        grade: 6,
        title: 'Percent: Out of 100',
        description: 'Socratic exploration of percent as "per hundred" and real-world applications.',
        standards: {
            ccss: ['6.RP.3c'],
            mn: ['6.1.2.4'],
            teks: ['6.5B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'What Does Percent Actually Mean?',
                content: 'The word **percent** comes from Latin: *per centum* — meaning "**out of 100**".\n\nSo 25% literally means "25 out of every 100."\n\nLet\'s see how this simple idea is everywhere.',
                next: 'visual_percent_intro'
            },
            {
                id: 'visual_percent_intro',
                type: 'visual',
                phase: 'orient',
                title: 'Visualizing 25%',
                content: 'Here\'s what 25% looks like — one quarter of the whole:',
                visual: { type: 'percentBar', value: 25 },
                next: 'q_basic'
            },
            {
                id: 'q_basic',
                type: 'question',
                phase: 'orient',
                prompt: 'What is 25% of 80?',
                accept: { exact: ['20'], numeric: 20, tolerance: 0.01 },
                hints: [
                    '25% means 25/100 = 0.25. Multiply: 0.25 × 80.',
                    'Or think: 25% is one quarter. One quarter of 80 = ?'
                ],
                sentenceFrames: [
                    '25% of 80 is ___ because ___.',
                    'I converted 25% to ___ and then ___.'
                ],
                socraticFollow: 'Which method did you use — converting to a decimal, or thinking in quarters? Which feels easier?',
                next: 'q_reverse'
            },
            {
                id: 'q_reverse',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'You scored 18 out of 24 on a quiz. What percent did you get?',
                accept: { exact: ['75', '75%'], numeric: 75, tolerance: 0.5 },
                hints: [
                    'Percent = (part ÷ whole) × 100.',
                    '18 ÷ 24 = 0.75 → 75%'
                ],
                socraticFollow: 'How is "finding the percent" different from "finding the percent OF something"?',
                next: 'q_discount'
            },
            {
                id: 'q_discount',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A jacket costs $80 and is 15% off. But there\'s also 8% sales tax on the sale price. What\'s the final price?',
                accept: { numeric: 73.44, tolerance: 0.05 },
                hints: [
                    'Step 1: Find 15% of $80 = $12. Sale price = $80 - $12 = $68.',
                    'Step 2: Find 8% of $68 = $5.44. Final = $68 + $5.44.'
                ],
                socraticFollow: 'Does it matter what order you apply discount and tax? Would you get the same answer?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Percent Power!',
                content: 'You now understand percent as a **universal comparison tool** — everything becomes "out of 100".\n\nKey insight: *Percent lets you compare any two quantities on the same scale, no matter how different the originals are.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: LOCATE AND COMPARE NUMBERS
    // ═══════════════════════════════════════════════════

    'locate and compare numbers': {
        id: 'locate-compare-numbers',
        topic: 'locate and compare numbers',
        grade: 6,
        title: 'Locate & Compare: Navigating the Number Line',
        description: 'Socratic exploration of placing and comparing fractions, decimals, and percents on a number line.',
        standards: {
            ccss: ['6.NS.5', '6.NS.6', '6.NS.7'],
            mn: ['6.1.1.1', '6.1.1.2'],
            teks: ['6.2A', '6.2B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Hiking Trail',
                content: 'You\'re hiking a mountain trail. The trailhead is at **sea level (0)**. Some points are above sea level (positive) and some are below in a valley (negative).\n\nTrail markers show elevations like **3/4**, **0.6**, and **-2.5**.\n\nLet\'s figure out how to place them all on the same map.',
                next: 'visual_number_line'
            },
            {
                id: 'visual_number_line',
                type: 'visual',
                phase: 'orient',
                title: 'The Elevation Map',
                content: 'Here\'s our number line — sea level is at zero:',
                visual: { type: 'numberLine', min: -3, max: 3, points: [0] },
                next: 'q_place'
            },
            {
                id: 'q_place',
                type: 'question',
                phase: 'orient',
                prompt: 'Where does 3/4 go on a number line from 0 to 1? Is it closer to 0 or closer to 1?',
                accept: { keywords: ['closer to 1', 'between', 'three fourths', '0.75', 'right'], keywordThreshold: 0.3 },
                hints: [
                    'Divide the space between 0 and 1 into 4 equal parts.',
                    '3/4 means 3 out of 4 parts — that\'s most of the way to 1.'
                ],
                sentenceFrames: [
                    '3/4 is closer to ___ because ___.',
                    'I know this because 3 out of 4 parts means ___.'
                ],
                socraticFollow: 'How did you decide? What does the denominator tell you about the spacing?',
                next: 'q_compare'
            },
            {
                id: 'q_compare',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Which is greater: 0.6 or 0.58? How do you know?',
                accept: { keywords: ['0.6', 'greater', 'bigger', 'tenths', '60', '58'], keywordThreshold: 0.3 },
                hints: [
                    'Compare the tenths place first: both have 5 tenths... wait, 0.6 has 6 tenths.',
                    '0.6 = 0.60. Now compare: 0.60 vs 0.58. Which is bigger?'
                ],
                socraticFollow: 'Why does adding a zero to 0.6 (making 0.60) help with comparison?',
                next: 'reveal_compare'
            },
            {
                id: 'reveal_compare',
                type: 'reveal',
                phase: 'explore',
                content: '**0.6 > 0.58** because 0.6 = 0.60, and 60 hundredths > 58 hundredths.',
                explanation: 'Aligning decimal places makes comparison easier.',
                next: 'q_order'
            },
            {
                id: 'q_order',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Order from least to greatest: 1/2, 0.3, 75%',
                accept: { keywords: ['0.3', '1/2', '75', 'least', 'greatest'], keywordThreshold: 0.4 },
                hints: [
                    'Convert everything to decimals: 1/2 = 0.5, 0.3 = 0.3, 75% = 0.75.',
                    'Now order: 0.3, 0.5, 0.75.'
                ],
                socraticFollow: 'What strategy did you use? Converting to the same form — does that remind you of anything?',
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Create three different fractions between 2/5 and 3/5. Explain your strategy.',
                accept: { keywords: ['common denominator', 'equivalent', 'between', 'tenths', 'twentieths'], keywordThreshold: 0.3 },
                hints: [
                    'Convert to a common denominator with more parts: 2/5 = 8/20, 3/5 = 12/20.',
                    'What fractions are between 8/20 and 12/20?'
                ],
                socraticFollow: 'Could you always find fractions between any two fractions? How many?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Number Line Navigator!',
                content: 'You can now **place, compare, and order** any mix of fractions, decimals, and percents.\n\nKey insight: *Convert to the same form, then compare. The number line is your map.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: FACTORS, PRIMES, GCF, LCM
    // ═══════════════════════════════════════════════════

    'factors primes gcf lcm': {
        id: 'factors-gcf-lcm',
        topic: 'factors primes gcf lcm',
        grade: 6,
        title: 'Factors, Primes, GCF & LCM: Building Blocks of Numbers',
        description: 'Discover factors, primes, GCF, and LCM through party planning.',
        standards: {
            ccss: ['6.NS.4'],
            mn: ['6.1.1.5'],
            teks: ['6.1A']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Party Planner',
                content: 'You\'re planning a class party. You have **36 chairs** to arrange in equal rows.\n\nHow many different rectangular arrangements can you make?',
                next: 'q_factors'
            },
            {
                id: 'q_factors',
                type: 'question',
                phase: 'orient',
                prompt: 'List all the factors of 36. (Hint: think of all the ways to make rectangles with 36 chairs.)',
                accept: { keywords: ['1', '2', '3', '4', '6', '9', '12', '18', '36'], keywordThreshold: 0.5 },
                hints: [
                    'Start with 1 × 36, then 2 × 18, then 3 × ?...',
                    'Keep going: 4 × 9, 6 × 6. Those are all the factor pairs.'
                ],
                sentenceFrames: [
                    'The factors of 36 are: ___.',
                    'I found them by checking if 36 divides evenly by ___.'
                ],
                socraticFollow: 'How did you know when to stop checking? Is there a shortcut?',
                next: 'visual_area'
            },
            {
                id: 'visual_area',
                type: 'visual',
                phase: 'orient',
                title: 'Factor Pairs as Rectangles',
                content: 'Each factor pair makes a different rectangle with area 36:',
                visual: { type: 'areaModel', a: 6, b: 6 },
                next: 'q_prime'
            },
            {
                id: 'q_prime',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Is 17 prime or composite? How do you know?',
                accept: { keywords: ['prime', 'only 1 and 17', 'no other factors'], keywordThreshold: 0.3 },
                hints: [
                    'Try dividing 17 by 2, 3, 4... does any divide evenly?',
                    'You only need to check up to the square root of 17 (about 4.1).'
                ],
                socraticFollow: 'Why do we only need to check up to the square root?',
                next: 'q_gcf'
            },
            {
                id: 'q_gcf',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Find the GCF of 24 and 36.',
                accept: { exact: ['12'], numeric: 12, tolerance: 0.01 },
                hints: [
                    'List factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36.',
                    'The greatest number in BOTH lists is...'
                ],
                socraticFollow: 'When would you use GCF in real life? Think about simplifying fractions...',
                next: 'q_lcm'
            },
            {
                id: 'q_lcm',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Two runners lap a track every 6 and 8 minutes. When will they meet at the start together again?',
                accept: { exact: ['24'], numeric: 24, tolerance: 0.01 },
                hints: [
                    'Runner A passes the start at: 6, 12, 18, 24, 30... Runner B: 8, 16, 24, 32...',
                    'The first time they BOTH pass the start is the LCM of 6 and 8.'
                ],
                socraticFollow: 'How is LCM different from GCF? When do you use each one?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Factor Master!',
                content: 'You now understand the **building blocks of numbers** — factors, primes, GCF, and LCM.\n\nKey insight: *GCF simplifies (finds what\'s shared). LCM synchronizes (finds when things align).*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: APPLYING RATIONAL NUMBERS
    // ═══════════════════════════════════════════════════

    'applying rational numbers': {
        id: 'applying-rationals',
        topic: 'applying rational numbers',
        grade: 6,
        title: 'Applying Rational Numbers: Positive & Negative in the Real World',
        description: 'Explore operations with positive and negative numbers through real-world contexts.',
        standards: {
            ccss: ['6.NS.3', '6.NS.5'],
            mn: ['6.1.1.3'],
            teks: ['6.3D']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Bank Account',
                content: 'You start the month with **$50** in your bank account.\n\nMonday: You earn $15 babysitting (+15)\nWednesday: You buy a game for $22 (-22)\nFriday: You find $5 on the ground (+5)\nSaturday: You owe your friend $10 (-10)',
                next: 'visual_number_line'
            },
            {
                id: 'visual_number_line',
                type: 'visual',
                phase: 'orient',
                title: 'Your Balance Over the Week',
                content: 'Watch how your balance moves on the number line:',
                visual: { type: 'numberLine', min: 0, max: 80, points: [50, 65, 43, 48, 38] },
                next: 'q_balance'
            },
            {
                id: 'q_balance',
                type: 'question',
                phase: 'orient',
                prompt: 'What is your balance at the end of the week? Start with $50 and apply each change.',
                accept: { exact: ['38', '$38'], numeric: 38, tolerance: 0.01 },
                hints: [
                    '50 + 15 = 65. Then 65 - 22 = 43.',
                    '43 + 5 = 48. Then 48 - 10 = 38.'
                ],
                sentenceFrames: [
                    'My final balance is ___ because I started with ___ and ___.',
                    'Deposits add (+) and withdrawals subtract (-), so ___.'
                ],
                socraticFollow: 'Did you think of the negatives as "going left" on the number line?',
                next: 'q_negative'
            },
            {
                id: 'q_negative',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The temperature was -3°F in the morning. By noon it rose 12 degrees. What is the temperature at noon?',
                accept: { exact: ['9'], numeric: 9, tolerance: 0.01 },
                hints: [
                    'Start at -3 on the number line. Move 12 to the right.',
                    '-3 + 12 = ?  Think: you need 3 degrees just to get back to zero, then 9 more.'
                ],
                socraticFollow: 'Why did we cross zero? What does crossing zero mean in temperature?',
                next: 'q_both_neg'
            },
            {
                id: 'q_both_neg',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'What is -8 + (-5)?',
                accept: { exact: ['-13'], numeric: -13, tolerance: 0.01 },
                hints: [
                    'Both numbers are negative — you\'re going further left on the number line.',
                    'Adding two negatives: add the absolute values (8+5=13), keep the negative sign.'
                ],
                socraticFollow: 'Why does adding two negatives give a MORE negative result? Picture it on the number line.',
                next: 'q_word_problem'
            },
            {
                id: 'q_word_problem',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A submarine is at -200 feet. It rises 75 feet, then dives 120 feet. What is its final depth? Write the expression.',
                accept: { keywords: ['-200', '75', '120', '-245', 'negative'], keywordThreshold: 0.4 },
                hints: [
                    'Expression: -200 + 75 + (-120) or -200 + 75 - 120.',
                    '-200 + 75 = -125. Then -125 - 120 = -245.'
                ],
                socraticFollow: 'How do you decide when to add vs subtract? What clue words help?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Rational Number Pro!',
                content: 'You can now **add and subtract** positive and negative numbers in real-world contexts.\n\nKey insight: *Positive means "go right" (gain), negative means "go left" (loss). The number line is your compass.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 6: MEAN, MEDIAN AND RANGE
    // ═══════════════════════════════════════════════════

    'mean median and range': {
        id: 'mean-median-range',
        topic: 'mean median and range',
        grade: 6,
        title: 'Mean, Median & Range: Making Sense of Data',
        description: 'Discover measures of center through basketball statistics.',
        standards: {
            ccss: ['6.SP.3', '6.SP.5'],
            mn: ['6.4.1.1'],
            teks: ['6.12C', '6.12D']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Basketball Stats',
                content: 'Your school\'s basketball star scored these points in the last 7 games:\n\n**12, 8, 15, 22, 10, 15, 9**\n\nThe coach wants one number to describe the player\'s "typical" performance. But which one?',
                next: 'q_mean'
            },
            {
                id: 'q_mean',
                type: 'question',
                phase: 'orient',
                prompt: 'What is the mean (average) of these scores: 12, 8, 15, 22, 10, 15, 9?',
                accept: { exact: ['13'], numeric: 13, tolerance: 0.1 },
                hints: [
                    'Mean = sum of all values ÷ number of values.',
                    '12+8+15+22+10+15+9 = 91. Then 91 ÷ 7 = ?'
                ],
                sentenceFrames: [
                    'The mean is ___ because I added all the scores and got ___, then divided by ___.',
                    'The average is ___ points per game.'
                ],
                socraticFollow: 'What does the mean actually represent? If you could "redistribute" all the points equally...',
                next: 'q_median'
            },
            {
                id: 'q_median',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Now find the median. First: what do you need to do with the numbers before finding it?',
                accept: { keywords: ['order', 'sort', 'least to greatest', 'arrange', 'line up', '15'], keywordThreshold: 0.3 },
                hints: [
                    'The median is the MIDDLE value, but the data must be in order first.',
                    'Ordered: 8, 9, 10, 12, 15, 15, 22. The middle (4th) value is...'
                ],
                socraticFollow: 'The median is 12. Is the mean or median a better description of "typical" here? Why?',
                next: 'q_range'
            },
            {
                id: 'q_range',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'What is the range of these scores?',
                accept: { exact: ['14'], numeric: 14, tolerance: 0.01 },
                hints: [
                    'Range = highest value - lowest value.',
                    '22 - 8 = ?'
                ],
                socraticFollow: 'What does a large range tell you about the player\'s consistency?',
                next: 'q_outlier'
            },
            {
                id: 'q_outlier',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'If the player scores 50 points in the next game (a record!), which changes more — the mean or the median? Why?',
                accept: { keywords: ['mean', 'average', 'more', 'outlier', 'pulled', 'affected'], keywordThreshold: 0.3 },
                hints: [
                    'Add 50 to the data set and recalculate both.',
                    'New mean: (91+50)/8 = 17.6. New median: (12+15)/2 = 13.5. Which jumped more?'
                ],
                socraticFollow: 'This is why we sometimes prefer the median — it resists outliers. When might the mean be better?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Data Analyst!',
                content: 'You now understand **three ways to summarize data** and when each is most useful.\n\nKey insight: *Mean balances all values, median finds the middle, range measures spread. Outliers affect the mean more than the median.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 7: CIRCUMFERENCE AND AREA OF CIRCLES
    // ═══════════════════════════════════════════════════

    'circumference and area of circles': {
        id: 'circles-circumference-area',
        topic: 'circumference and area of circles',
        grade: 7,
        title: 'Circles: The Magic of Pi',
        description: 'Discover pi, circumference, and area through garden design.',
        standards: {
            ccss: ['7.G.4'],
            mn: ['7.3.1.1'],
            teks: ['7.9B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Circular Garden',
                content: 'You\'re designing a **circular flower garden** with a **diameter of 10 feet**.\n\nYou need to buy:\n- **Fencing** to go around it (circumference)\n- **Mulch** to cover it (area)\n\nBut first — what makes circles special?',
                next: 'q_pi_discover'
            },
            {
                id: 'q_pi_discover',
                type: 'question',
                phase: 'orient',
                prompt: 'If you measure around ANY circle and divide by its diameter, you always get the same number. What is that number called, and approximately what is it?',
                accept: { keywords: ['pi', '3.14', 'three point one four', '3.14159'], keywordThreshold: 0.3 },
                hints: [
                    'It\'s a Greek letter. It starts with 3.14...',
                    'Pi (π) ≈ 3.14159... It\'s the ratio of circumference to diameter for EVERY circle.'
                ],
                sentenceFrames: [
                    'The number is called ___ and it equals approximately ___.',
                    'This means the distance around is always about ___ times the diameter.'
                ],
                socraticFollow: 'Why is it amazing that this ratio is the same for EVERY circle, no matter the size?',
                next: 'visual_circle'
            },
            {
                id: 'visual_circle',
                type: 'visual',
                phase: 'orient',
                title: 'Your Garden',
                content: 'Here\'s the garden — diameter 10 feet, radius 5 feet:',
                visual: { type: 'fractionCircle', num: 1, denom: 1 },
                next: 'q_circumference'
            },
            {
                id: 'q_circumference',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'How much fencing do you need? Use C = π × d, with d = 10 feet.',
                accept: { numeric: 31.4, tolerance: 0.2 },
                hints: [
                    'C = π × d = 3.14 × 10',
                    '3.14 × 10 = 31.4 feet'
                ],
                socraticFollow: 'Could you also use C = 2πr? How are the two formulas related?',
                next: 'q_area'
            },
            {
                id: 'q_area',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'How much mulch do you need? Use A = π × r², with r = 5 feet.',
                accept: { numeric: 78.5, tolerance: 0.6 },
                hints: [
                    'A = π × r² = 3.14 × 5²',
                    '5² = 25. Then 3.14 × 25 = ?'
                ],
                socraticFollow: 'Why is area measured in square feet but circumference in just feet?',
                next: 'q_double'
            },
            {
                id: 'q_double',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'If you double the radius to 10 feet, does the area double? What happens?',
                accept: { keywords: ['four', 'quadruple', '4 times', 'squared', 'doesn\'t double'], keywordThreshold: 0.3 },
                hints: [
                    'New area = π × 10² = π × 100 = 314. Old area was 78.5.',
                    '314 ÷ 78.5 = 4. The area quadrupled!'
                ],
                socraticFollow: 'Why does doubling the radius give 4× the area? Think about r² — what happens when you square a doubled number?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Circle Expert!',
                content: 'You discovered that **pi** connects every circle\'s measurements.\n\nKey insight: *C = πd for circumference, A = πr² for area. Doubling the radius quadruples the area because of the squared term.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 7: REPRESENTING AND COMPARING RATIONAL NUMBERS
    // ═══════════════════════════════════════════════════

    'representing and comparing rational numbers': {
        id: 'rep-compare-rationals',
        topic: 'representing and comparing rational numbers',
        grade: 7,
        title: 'Rational Numbers: Every Form, One Value',
        description: 'Master converting and comparing rational numbers in all forms.',
        standards: {
            ccss: ['7.NS.1', '7.NS.2'],
            mn: ['7.1.1.1'],
            teks: ['7.2A']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Recipe Challenge',
                content: 'You\'re scaling a recipe that calls for **2/3 cup of flour**.\n\nYour measuring cups show decimals. Your friend\'s recipe card shows fractions. The nutrition label uses percents.\n\nSame amounts, different languages. Let\'s become fluent in all three.',
                next: 'q_convert'
            },
            {
                id: 'q_convert',
                type: 'question',
                phase: 'orient',
                prompt: 'Convert 2/3 to a decimal. What do you notice about the result?',
                accept: { keywords: ['0.666', '0.67', 'repeating', 'repeat', 'never ends', 'infinite'], keywordThreshold: 0.3 },
                hints: [
                    'Divide 2 by 3.',
                    '2 ÷ 3 = 0.6666... — the 6 repeats forever!'
                ],
                sentenceFrames: [
                    '2/3 as a decimal is ___ and I notice ___.',
                    'The decimal ___ because ___.'
                ],
                socraticFollow: 'Not all fractions give repeating decimals. 1/4 = 0.25 (terminates). What makes the difference?',
                next: 'visual_number_line'
            },
            {
                id: 'visual_number_line',
                type: 'visual',
                phase: 'orient',
                title: 'Plotting Rational Numbers',
                content: 'Here are several rational numbers on the same number line:',
                visual: { type: 'numberLine', min: -2, max: 2, points: [-1.5, -0.5, 0.667, 1.25] },
                next: 'q_negative_fraction'
            },
            {
                id: 'q_negative_fraction',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Order these from least to greatest: -3/4, 0.5, -1.2, 7/8',
                accept: { keywords: ['-1.2', '-3/4', '0.5', '7/8', 'least', 'greatest'], keywordThreshold: 0.4 },
                hints: [
                    'Convert all to decimals: -3/4 = -0.75, 0.5 = 0.5, -1.2 = -1.2, 7/8 = 0.875.',
                    'Order: -1.2, -0.75, 0.5, 0.875'
                ],
                socraticFollow: 'Which number was trickiest to place? Why?',
                next: 'q_abs_value'
            },
            {
                id: 'q_abs_value',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Which is farther from zero: -3/4 or 0.5? How do you know?',
                accept: { keywords: ['-3/4', 'three fourths', '0.75', 'farther', 'absolute', 'distance'], keywordThreshold: 0.3 },
                hints: [
                    'Distance from zero = absolute value. |-3/4| = 0.75, |0.5| = 0.5.',
                    '0.75 > 0.5, so -3/4 is farther from zero.'
                ],
                socraticFollow: 'Can a negative number have a larger absolute value than a positive number? Give an example.',
                next: 'q_context'
            },
            {
                id: 'q_context',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A diver is at -15.5 meters. Another is at -12 3/4 meters. Who is deeper? By how much?',
                accept: { keywords: ['-15.5', 'deeper', 'first', '2.75', '2 3/4'], keywordThreshold: 0.3 },
                hints: [
                    'Convert -12 3/4 to decimal: -12.75.',
                    '-15.5 is more negative (farther below sea level). Difference: 15.5 - 12.75 = 2.75 meters.'
                ],
                socraticFollow: 'In this context, which direction is "more" — more negative or less negative?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Rational Number Navigator!',
                content: 'You can now **convert, compare, and contextualize** rational numbers in any form.\n\nKey insight: *Convert to the same form to compare. Absolute value measures distance from zero, regardless of sign.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 8: SOLVE EQUATIONS, INEQUALITIES AND SYSTEMS
    // ═══════════════════════════════════════════════════

    'solve equations inequalities and systems': {
        id: 'equations-inequalities-systems',
        topic: 'solve equations inequalities and systems',
        grade: 8,
        title: 'Equations, Inequalities & Systems: Finding Where Lines Meet',
        description: 'From single equations to systems — discover intersection points.',
        standards: {
            ccss: ['8.EE.8', '8.EE.8a', '8.EE.8b'],
            mn: ['8.2.4.1'],
            teks: ['8.9A']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Phone Plan Decision',
                content: 'You\'re choosing between two cell phone plans:\n\n- **Plan A**: $30/month + $0.10 per text\n- **Plan B**: $20/month + $0.15 per text\n\nWhich plan is cheaper? It depends on how many texts you send!',
                next: 'q_expressions'
            },
            {
                id: 'q_expressions',
                type: 'question',
                phase: 'orient',
                prompt: 'Write an expression for the monthly cost of each plan, using t for the number of texts.',
                accept: { keywords: ['30', '0.10', '0.10t', '20', '0.15', '0.15t'], keywordThreshold: 0.4 },
                hints: [
                    'Plan A: fixed cost + (cost per text × number of texts).',
                    'Plan A: 30 + 0.10t. Plan B: 20 + 0.15t.'
                ],
                sentenceFrames: [
                    'Plan A costs ___ and Plan B costs ___.',
                    'I used t for texts, so the expression is ___.'
                ],
                socraticFollow: 'Which part of each expression is the "fixed cost" and which depends on how many texts you send?',
                next: 'q_equal'
            },
            {
                id: 'q_equal',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'At how many texts do both plans cost the same? Set the expressions equal and solve.',
                accept: { exact: ['200'], numeric: 200, tolerance: 1 },
                hints: [
                    '30 + 0.10t = 20 + 0.15t. Subtract 0.10t from both sides.',
                    '30 = 20 + 0.05t. Subtract 20: 10 = 0.05t. Divide: t = 200.'
                ],
                socraticFollow: 'What does t = 200 mean in real life? At exactly 200 texts, what happens?',
                next: 'q_inequality'
            },
            {
                id: 'q_inequality',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'For what number of texts is Plan A cheaper? Write an inequality and solve.',
                accept: { keywords: ['more than 200', '> 200', 'greater than 200', 'above 200', 't > 200'], keywordThreshold: 0.3 },
                hints: [
                    'Plan A is cheaper when 30 + 0.10t < 20 + 0.15t.',
                    'Solve the same way: 10 < 0.05t, so t > 200. Plan A is cheaper when you send MORE than 200 texts.'
                ],
                socraticFollow: 'Wait — Plan A has a HIGHER base cost but is cheaper for heavy texters. Why?',
                next: 'visual_graph'
            },
            {
                id: 'visual_graph',
                type: 'visual',
                phase: 'explore',
                title: 'Where the Lines Cross',
                content: 'The two plans graphed — they intersect at t = 200:',
                visual: { type: 'coordinate', points: [[0,30],[100,40],[200,50],[300,60],[0,20],[100,35],[200,50],[300,65]] },
                next: 'q_interpret'
            },
            {
                id: 'q_interpret',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Looking at the graph: to the LEFT of the intersection, which plan is lower (cheaper)? To the RIGHT?',
                accept: { keywords: ['left', 'plan b', 'right', 'plan a', 'below', 'cheaper', 'lower'], keywordThreshold: 0.3 },
                hints: [
                    'Left of t=200: fewer texts. Which line is lower?',
                    'Plan B starts lower ($20 vs $30) but rises faster. After 200, Plan A is lower.'
                ],
                socraticFollow: 'Systems of equations aren\'t just algebra — they\'re decision-making tools. What other real situations have two competing options?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Systems Solver!',
                content: 'You just solved a **system of equations** to make a real decision.\n\nKey insight: *The intersection point is where two situations are equal. The inequality tells you which is better on each side.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 8: SIMILARITY AND SCALING
    // ═══════════════════════════════════════════════════

    'similarity and scaling': {
        id: 'similarity-scaling',
        topic: 'similarity and scaling',
        grade: 8,
        title: 'Similarity & Scaling: Same Shape, Different Size',
        description: 'Discover similarity through architecture and scale models.',
        standards: {
            ccss: ['8.G.4'],
            mn: ['8.3.1.2'],
            teks: ['8.8D']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Architect\'s Model',
                content: 'An architect builds a **scale model** of a building.\n\nThe real building is **60 feet tall** and **40 feet wide**.\nThe model is **3 feet tall**.\n\nThe model and the real building are **similar** — same shape, different size.',
                next: 'q_scale_factor'
            },
            {
                id: 'q_scale_factor',
                type: 'question',
                phase: 'orient',
                prompt: 'What is the scale factor from the model to the real building? (Real height ÷ model height)',
                accept: { exact: ['20'], numeric: 20, tolerance: 0.01 },
                hints: [
                    'Scale factor = real ÷ model = 60 ÷ 3.',
                    '60 ÷ 3 = 20. The real building is 20 times bigger.'
                ],
                sentenceFrames: [
                    'The scale factor is ___ because ___.',
                    'Every measurement on the model is ___ times smaller than real life.'
                ],
                socraticFollow: 'Does the same scale factor apply to width too? How do you know?',
                next: 'q_width'
            },
            {
                id: 'q_width',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'How wide is the model? (Use the same scale factor.)',
                accept: { exact: ['2'], numeric: 2, tolerance: 0.01 },
                hints: [
                    'Model width = real width ÷ scale factor.',
                    '40 ÷ 20 = 2 feet.'
                ],
                socraticFollow: 'If the scale factor applies to ALL dimensions equally, what does "similar" really mean?',
                next: 'visual_area'
            },
            {
                id: 'visual_area',
                type: 'visual',
                phase: 'explore',
                title: 'Comparing Areas',
                content: 'The model\'s floor is 3×2 = 6 sq ft. The real floor is 60×40 = 2400 sq ft:',
                visual: { type: 'areaModel', a: 3, b: 2 },
                next: 'q_area_scale'
            },
            {
                id: 'q_area_scale',
                type: 'question',
                phase: 'explore',
                dok: 3,
                prompt: 'The scale factor for lengths is 20. What is the scale factor for AREAS? (Real floor area ÷ model floor area)',
                accept: { exact: ['400'], numeric: 400, tolerance: 1 },
                hints: [
                    'Model floor: 3 × 2 = 6 sq ft. Real floor: 60 × 40 = 2400 sq ft.',
                    '2400 ÷ 6 = 400. Notice: 400 = 20². The area scale factor is the length scale factor SQUARED.'
                ],
                socraticFollow: 'Why is the area scale factor the SQUARE of the length scale factor? Think about what area measures...',
                next: 'q_triangle'
            },
            {
                id: 'q_triangle',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Two triangles are similar. The sides of the smaller triangle are 3, 4, 5. The longest side of the larger triangle is 15. What are its other two sides?',
                accept: { keywords: ['9', '12', '15'], keywordThreshold: 0.5 },
                hints: [
                    'Scale factor = 15 ÷ 5 = 3.',
                    'Multiply each side by 3: 3×3=9, 4×3=12, 5×3=15.'
                ],
                socraticFollow: 'These are both right triangles (3-4-5 and 9-12-15). Does similarity preserve right angles?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Scale Master!',
                content: 'You understand **similarity** — same shape, proportional dimensions.\n\nKey insight: *Length scales by k, area scales by k², and angles stay the same. That\'s what "same shape" means mathematically.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 8: RATIONAL, IRRATIONAL AND REAL NUMBERS
    // ═══════════════════════════════════════════════════

    'rational irrational and real numbers': {
        id: 'rational-irrational-real',
        topic: 'rational irrational and real numbers',
        grade: 8,
        title: 'Real Numbers: Rationals, Irrationals & Everything In Between',
        description: 'Discover irrational numbers through the diagonal of a square.',
        standards: {
            ccss: ['8.NS.1', '8.NS.2'],
            mn: ['8.1.1.1'],
            teks: ['8.2A', '8.2B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Impossible Fraction',
                content: 'Draw a square with sides of length **1**.\n\nNow draw the diagonal. By the Pythagorean theorem, the diagonal is **√2**.\n\nThe ancient Greeks discovered something shocking: **√2 cannot be written as a fraction.** It goes on forever without repeating.\n\nThis was so disturbing, legend says they threw the discoverer overboard!',
                next: 'q_estimate'
            },
            {
                id: 'q_estimate',
                type: 'question',
                phase: 'orient',
                prompt: '√2 is between which two whole numbers? How do you know?',
                accept: { keywords: ['1', '2', 'between', '1 and 2'], keywordThreshold: 0.5 },
                hints: [
                    'What is 1²? What is 2²?',
                    '1² = 1 and 2² = 4. Since 2 is between 1 and 4, √2 is between 1 and 2.'
                ],
                sentenceFrames: [
                    '√2 is between ___ and ___ because ___.',
                    'I know this because ___² = ___ and ___² = ___.'
                ],
                socraticFollow: 'Can you narrow it down more? Is √2 closer to 1 or to 2?',
                next: 'visual_zoom'
            },
            {
                id: 'visual_zoom',
                type: 'visual',
                phase: 'orient',
                title: 'Zooming In on √2',
                content: '√2 ≈ 1.41421356... — it lives between 1.4 and 1.5 on the number line:',
                visual: { type: 'numberLine', min: 1, max: 2, points: [1.414] },
                next: 'q_rational_def'
            },
            {
                id: 'q_rational_def',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'A rational number can be written as a fraction a/b where a and b are integers. Which of these are rational: 0.75, √3, -4, π, 1/7?',
                accept: { keywords: ['0.75', '-4', '1/7', 'rational'], keywordThreshold: 0.4 },
                hints: [
                    '0.75 = 3/4 (rational). -4 = -4/1 (rational). 1/7 is already a fraction (rational).',
                    '√3 ≈ 1.732050... (never repeats, irrational). π ≈ 3.14159... (never repeats, irrational).'
                ],
                socraticFollow: 'What about 0.333...? It repeats — is it rational or irrational?',
                next: 'q_classify'
            },
            {
                id: 'q_classify',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'True or false: All integers are rational numbers.',
                accept: { keywords: ['true', 'yes', 'correct', 'integer', 'over 1'], keywordThreshold: 0.3 },
                hints: [
                    'Can every integer be written as a fraction?',
                    '5 = 5/1, -3 = -3/1, 0 = 0/1. Yes — every integer is rational!'
                ],
                socraticFollow: 'So integers are INSIDE the rational numbers, which are INSIDE the real numbers. What\'s this nesting called?',
                next: 'q_sqrt_perfect'
            },
            {
                id: 'q_sqrt_perfect',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Explain why √16 is rational but √15 is irrational.',
                accept: { keywords: ['perfect square', '4', '16 = 4', 'not a perfect', 'fraction'], keywordThreshold: 0.3 },
                hints: [
                    '16 is a perfect square: 4 × 4 = 16. So √16 = 4 (an integer, which is rational).',
                    '15 is NOT a perfect square. √15 ≈ 3.8729... — the decimal never repeats, so it\'s irrational.'
                ],
                socraticFollow: 'Is there a pattern? Which square roots are rational and which aren\'t?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Real Number Expert!',
                content: 'You now understand the **real number system**: rationals (fractions, decimals that terminate or repeat) and irrationals (decimals that go on forever without repeating).\n\nKey insight: *Rational = can be a fraction. Irrational = never a fraction. Together they fill the entire number line with no gaps.*',
                next: null
            }
        ]
    }
};
