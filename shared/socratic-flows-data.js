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

    // ═══════════════════════════════════════════════════
    //  GRADE 5: DECIMALS AND OPERATIONS
    // ═══════════════════════════════════════════════════

    'decimals and operations': {
        id: 'decimals-operations-5',
        topic: 'decimals and operations',
        grade: 5,
        title: 'Decimals: Place Value & Operations',
        description: 'Socratic exploration of decimal place value, comparison, and operations using base-10 blocks and number lines.',
        standards: {
            ccss: ['5.NBT.A.1', '5.NBT.A.3', '5.NBT.A.4', '5.NBT.B.7'],
            mn: ['5.1.1.1', '5.1.1.2'],
            teks: ['5.2A', '5.2B', '5.2C']
        },
        startNode: 'story_intro',
        nodes: [
            // ── Act 1: Orient ──
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Bake Sale',
                content: 'Your class is running a bake sale! A cookie costs **$0.75** and a brownie costs **$1.25**.\n\nBefore we calculate anything, let\'s make sure we really understand what those numbers mean.',
                next: 'q_place_value'
            },
            {
                id: 'q_place_value',
                type: 'question',
                phase: 'orient',
                prompt: 'In the number 0.75, what does the 7 represent? What does the 5 represent?',
                accept: { keywords: ['tenths', 'hundredths', '7 tenths', '5 hundredths', 'seven tenths'], keywordThreshold: 0.3 },
                hints: [
                    'The first digit after the decimal point is the tenths place.',
                    '7 is in the tenths place (7/10). 5 is in the hundredths place (5/100).'
                ],
                sentenceFrames: [
                    'The 7 is in the ___ place, meaning ___.',
                    'The 5 is in the ___ place, meaning ___.'
                ],
                socraticFollow: 'How many hundredths make one tenth? How does that connect to what you see?',
                next: 'visual_base10'
            },
            {
                id: 'visual_base10',
                type: 'visual',
                phase: 'orient',
                title: 'See the Decimals',
                content: 'Here\'s what 0.75 looks like using base-10 blocks:',
                visual: { type: 'base10', number: 0.75 },
                next: 'q_compare'
            },
            // ── Act 2: Explore ──
            {
                id: 'q_compare',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Which is greater: 0.75 or 0.7? How do you know?',
                accept: { keywords: ['0.75', 'greater', 'bigger', 'larger', 'more', 'hundredths'], keywordThreshold: 0.3 },
                hints: [
                    'Write 0.7 as 0.70. Now compare 0.75 and 0.70.',
                    '75 hundredths vs. 70 hundredths — which has more?'
                ],
                socraticFollow: 'Why can you add a zero to 0.7 and make it 0.70 without changing the value?',
                next: 'visual_compare'
            },
            {
                id: 'visual_compare',
                type: 'visual',
                phase: 'explore',
                title: 'Comparing on a Number Line',
                content: 'See where 0.7 and 0.75 sit:',
                visual: { type: 'numberLine', min: 0.5, max: 1, points: [0.7, 0.75] },
                next: 'q_add'
            },
            {
                id: 'q_add',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'You buy one cookie ($0.75) and one brownie ($1.25). What\'s the total? Show your thinking.',
                accept: { exact: ['2.00', '2', '$2.00', '$2', '2.0'], numeric: 2.00, tolerance: 0.01 },
                hints: [
                    'Line up the decimal points: 0.75 + 1.25.',
                    '5 + 5 = 10 hundredths (carry 1). 7 + 2 + 1 = 10 tenths (carry 1). 0 + 1 + 1 = 2.'
                ],
                socraticFollow: 'Why is it important to line up the decimal points when adding?',
                next: 'reveal_add'
            },
            {
                id: 'reveal_add',
                type: 'reveal',
                phase: 'explore',
                content: '**$0.75 + $1.25 = $2.00**',
                explanation: 'Line up decimal points, add column by column from right to left, carrying when you reach 10.',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_regroup' }
                ],
                next: 'q_challenge'
            },
            // ── Scaffold path ──
            {
                id: 'scaffold_regroup',
                type: 'scaffold',
                phase: 'explore',
                title: 'Let\'s Break It Down',
                content: 'Adding decimals is just like adding whole numbers — but you must line up the decimal points!\n\n```\n  0.75\n+ 1.25\n------\n  2.00\n```\n\nStart from the right: 5+5=10 (write 0, carry 1). Then 7+2+1=10 (write 0, carry 1). Then 0+1+1=2.',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Try this: 0.36 + 0.44 = ?',
                accept: { exact: ['0.80', '0.8'], numeric: 0.8, tolerance: 0.01 },
                hints: [
                    '6 + 4 = 10 hundredths. Carry 1.',
                    '3 + 4 + 1 = 8 tenths. Answer: 0.80'
                ],
                socraticFollow: 'Is 0.80 the same as 0.8? Why?',
                next: 'q_challenge'
            },
            // ── Act 3: Connect ──
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'You have $5.00. Cookies cost $0.75 each. What is the MOST cookies you can buy? How much change do you get?',
                accept: { keywords: ['6', 'six', '$0.50', '50 cents', '0.50', 'change'], keywordThreshold: 0.3 },
                hints: [
                    'How many times does 0.75 fit into 5.00? Try: 0.75 × 6 = ?',
                    '0.75 × 6 = 4.50. That leaves $5.00 − $4.50 = $0.50 change.'
                ],
                socraticFollow: 'Why can\'t you buy 7? What would 0.75 × 7 be?',
                next: 'q_reflect'
            },
            {
                id: 'q_reflect',
                type: 'question',
                phase: 'connect',
                prompt: 'In your own words: why is it important to understand place value when working with decimals?',
                accept: { keywords: ['place', 'value', 'line up', 'position', 'tenths', 'hundredths', 'matter'], keywordThreshold: 0.3 },
                hints: [
                    'Think about what happens if you don\'t line up the decimal points.',
                    'Each place has a different value — tenths are 10× bigger than hundredths.'
                ],
                socraticFollow: 'Can you think of a real situation where a decimal mistake would be a big deal?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Decimal Master!',
                content: 'You explored **decimal place value** and **operations** using real-world thinking.\n\nKey insight: *Decimals are just fractions in disguise — 0.75 = 75/100 = 3/4. Place value tells you exactly how big each digit is.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 5: FRACTIONS AND OPERATIONS
    // ═══════════════════════════════════════════════════

    'fractions and operations': {
        id: 'fractions-operations-5',
        topic: 'fractions and operations',
        grade: 5,
        title: 'Fractions: Add & Subtract with Unlike Denominators',
        description: 'Guided exploration of adding and subtracting fractions by finding common denominators, with fraction bar visuals.',
        standards: {
            ccss: ['5.NF.A.1', '5.NF.A.2'],
            mn: ['5.1.2.1'],
            teks: ['5.3H', '5.3K']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Trail Mix Problem',
                content: 'You\'re making trail mix for a hike. You have **1/3** cup of almonds and **1/4** cup of raisins.\n\nHow much trail mix do you have total? That means adding 1/3 + 1/4.\n\nBut wait — thirds and fourths are different-sized pieces. Can you just add them?',
                next: 'q_why_not'
            },
            {
                id: 'q_why_not',
                type: 'question',
                phase: 'orient',
                prompt: 'Why can\'t you just add 1 + 1 = 2 for the numerators and 3 + 4 = 7 for the denominators to get 2/7?',
                accept: { keywords: ['different', 'size', 'pieces', 'denominator', 'not the same', 'thirds', 'fourths'], keywordThreshold: 0.3 },
                hints: [
                    'Think about it: is 1/3 + 1/4 really equal to 2/7? Check with a picture.',
                    'Thirds and fourths are different-sized pieces. You can\'t combine different-sized pieces without making them the same size first.'
                ],
                sentenceFrames: [
                    'You can\'t just add them because ___.',
                    'The denominators are different, which means ___.'
                ],
                socraticFollow: 'What if you had 1/4 + 1/4? Could you add those directly? What\'s different?',
                next: 'visual_unlike'
            },
            {
                id: 'visual_unlike',
                type: 'visual',
                phase: 'orient',
                title: 'Different-Sized Pieces',
                content: 'Look at 1/3 and 1/4 side by side — they\'re different sizes:',
                visual: { type: 'fractionBar', num: 1, denom: 3 },
                next: 'visual_fourths'
            },
            {
                id: 'visual_fourths',
                type: 'visual',
                phase: 'orient',
                title: 'Now Compare',
                content: 'And here\'s 1/4:',
                visual: { type: 'fractionBar', num: 1, denom: 4 },
                next: 'q_common'
            },
            {
                id: 'q_common',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'To add 1/3 + 1/4, we need a common denominator. What\'s the smallest number that both 3 and 4 divide into evenly?',
                accept: { exact: ['12'], numeric: 12, tolerance: 0.01 },
                hints: [
                    'List multiples of 3: 3, 6, 9, 12, 15... List multiples of 4: 4, 8, 12, 16...',
                    'The first number they share is 12. That\'s the LCD (Least Common Denominator).'
                ],
                socraticFollow: 'How did you find it? Is there a method you used?',
                next: 'q_rewrite'
            },
            {
                id: 'q_rewrite',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Rewrite 1/3 and 1/4 as twelfths. What do you get?',
                accept: { keywords: ['4/12', '3/12'], keywordThreshold: 0.5 },
                hints: [
                    '1/3 = ?/12 → multiply top and bottom by 4: 1×4=4, 3×4=12 → 4/12.',
                    '1/4 = ?/12 → multiply top and bottom by 3: 1×3=3, 4×3=12 → 3/12.'
                ],
                socraticFollow: 'Did you multiply top AND bottom by the same number? Why is that important?',
                next: 'q_add'
            },
            {
                id: 'q_add',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Now add: 4/12 + 3/12 = ?',
                accept: { exact: ['7/12'], numeric: 7/12, tolerance: 0.01 },
                hints: [
                    'Same denominator now! Just add the numerators.',
                    '4 + 3 = 7, keep the denominator: 7/12.'
                ],
                socraticFollow: 'NOW the pieces are the same size, so adding numerators works. Why didn\'t it work before?',
                next: 'reveal_answer'
            },
            {
                id: 'reveal_answer',
                type: 'reveal',
                phase: 'explore',
                content: '**1/3 + 1/4 = 4/12 + 3/12 = 7/12**\n\nYou have 7/12 cup of trail mix!',
                explanation: 'Find LCD → rewrite both fractions → add numerators → keep denominator.',
                next: 'visual_result'
            },
            {
                id: 'visual_result',
                type: 'visual',
                phase: 'explore',
                title: 'The Combined Amount',
                content: 'Here\'s 7/12 — your total trail mix:',
                visual: { type: 'fractionBar', num: 7, denom: 12 },
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_steps' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_steps',
                type: 'scaffold',
                phase: 'explore',
                title: 'The 3-Step Method',
                content: 'Adding fractions with unlike denominators:\n\n**Step 1:** Find the LCD (Least Common Denominator)\n**Step 2:** Rewrite each fraction with the LCD\n**Step 3:** Add numerators, keep the denominator\n\nLet\'s practice: 1/2 + 1/6.',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'What is 1/2 + 1/6?',
                accept: { exact: ['4/6', '2/3'], numeric: 2/3, tolerance: 0.01 },
                hints: [
                    'LCD of 2 and 6 is 6. Rewrite 1/2 as 3/6.',
                    '3/6 + 1/6 = 4/6 = 2/3.'
                ],
                socraticFollow: 'Can you simplify 4/6? What\'s the GCF of 4 and 6?',
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'You ate 2/5 of a pizza and your friend ate 1/3. Who ate more? How much pizza is left?',
                accept: { keywords: ['2/5', 'more', '4/15', 'left', '6/15', '5/15'], keywordThreshold: 0.3 },
                hints: [
                    'Compare: 2/5 = 6/15 and 1/3 = 5/15. Who has more fifteenths?',
                    'Together: 6/15 + 5/15 = 11/15 eaten. Left: 15/15 − 11/15 = 4/15.'
                ],
                socraticFollow: 'Is 4/15 more or less than 1/4 of the pizza? How can you tell?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Fraction Operations Champion!',
                content: 'You mastered **adding and subtracting fractions with unlike denominators**.\n\nKey insight: *You can\'t add different-sized pieces until you make them the same size. That\'s what finding a common denominator does — it creates equal-sized pieces you can combine.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 5: MULTIPLYING FRACTIONS
    // ═══════════════════════════════════════════════════

    'multiplying fractions': {
        id: 'multiplying-fractions-5',
        topic: 'multiplying fractions',
        grade: 5,
        title: 'Multiplying Fractions: What Does It Mean?',
        description: 'Discover fraction multiplication through area models and real-world contexts.',
        standards: {
            ccss: ['5.NF.B.4', '5.NF.B.5', '5.NF.B.6'],
            mn: ['5.1.2.2'],
            teks: ['5.3I', '5.3J']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Garden Plot',
                content: 'You\'re planting a garden. Your plot is **3/4** of a meter long and **2/3** of a meter wide.\n\nHow much area do you have for planting?\n\nThat means we need to find **3/4 × 2/3** — but what does multiplying fractions actually mean?',
                next: 'q_estimate'
            },
            {
                id: 'q_estimate',
                type: 'question',
                phase: 'orient',
                prompt: 'Without calculating: will 3/4 × 2/3 be MORE or LESS than 3/4? Why?',
                accept: { keywords: ['less', 'smaller', 'fraction', 'part of'], keywordThreshold: 0.3 },
                hints: [
                    'You\'re taking 2/3 OF 3/4. Taking a fraction of something makes it...',
                    'Multiplying by a number less than 1 always makes the answer smaller.'
                ],
                sentenceFrames: [
                    'The product will be ___ because ___.',
                    'When you multiply by a fraction less than 1, the answer ___.'
                ],
                socraticFollow: 'Why does multiplying by a fraction make things smaller, while multiplying by a whole number makes things bigger?',
                next: 'visual_area'
            },
            {
                id: 'visual_area',
                type: 'visual',
                phase: 'orient',
                title: 'The Area Model',
                content: '3/4 × 2/3 as an area model — the shaded region is the product:',
                visual: { type: 'areaModel', a: 3, b: 2, opts: { labelA: '3/4', labelB: '2/3' } },
                next: 'q_multiply'
            },
            {
                id: 'q_multiply',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'To multiply fractions, multiply the numerators together and the denominators together. What is 3/4 × 2/3?',
                accept: { exact: ['6/12', '1/2'], numeric: 0.5, tolerance: 0.01 },
                hints: [
                    'Numerators: 3 × 2 = ? Denominators: 4 × 3 = ?',
                    '3 × 2 = 6, 4 × 3 = 12. So 6/12. Can you simplify?'
                ],
                socraticFollow: '6/12 simplifies to... what? What\'s the GCF of 6 and 12?',
                next: 'reveal_multiply'
            },
            {
                id: 'reveal_multiply',
                type: 'reveal',
                phase: 'explore',
                content: '**3/4 × 2/3 = 6/12 = 1/2**\n\nYour garden plot is 1/2 square meter.',
                explanation: 'Multiply across: 3×2=6, 4×3=12. Simplify: 6÷6=1, 12÷6=2.',
                next: 'q_sense'
            },
            {
                id: 'q_sense',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Does 1/2 make sense? We said the answer should be LESS than 3/4. Is 1/2 less than 3/4?',
                accept: { keywords: ['yes', 'less', 'smaller', 'makes sense', 'correct'], keywordThreshold: 0.3 },
                hints: [
                    '1/2 = 0.5 and 3/4 = 0.75. Is 0.5 less than 0.75?',
                    'Yes! 1/2 < 3/4, so our answer checks out.'
                ],
                socraticFollow: 'Why is checking if your answer makes sense so important in math?',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_whole_number' },
                    { minScore: 0.0, target: 'scaffold_method' }
                ],
                next: 'q_whole_number'
            },
            {
                id: 'scaffold_method',
                type: 'scaffold',
                phase: 'explore',
                title: 'The Fraction Multiplication Rule',
                content: 'To multiply fractions:\n\n**Step 1:** Multiply numerators: top × top\n**Step 2:** Multiply denominators: bottom × bottom\n**Step 3:** Simplify if possible\n\nExample: 2/5 × 3/7 = (2×3)/(5×7) = 6/35',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Try it: 1/2 × 3/5 = ?',
                accept: { exact: ['3/10'], numeric: 0.3, tolerance: 0.01 },
                hints: [
                    '1 × 3 = 3, 2 × 5 = 10.',
                    'Answer: 3/10. Already simplified!'
                ],
                socraticFollow: 'Is 3/10 less than both 1/2 and 3/5? Does that make sense?',
                next: 'q_whole_number'
            },
            {
                id: 'q_whole_number',
                type: 'question',
                phase: 'connect',
                dok: 2,
                prompt: 'A recipe needs 2/3 cup of sugar. You want to make 4 batches. How much sugar total? Write the expression and solve.',
                accept: { keywords: ['2/3', '4', '8/3', '2 2/3'], keywordThreshold: 0.3 },
                hints: [
                    'Write 4 as 4/1. Then multiply: 2/3 × 4/1.',
                    '2 × 4 = 8, 3 × 1 = 3. So 8/3 = 2 2/3 cups.'
                ],
                socraticFollow: 'Wait — this time multiplying made the answer BIGGER! Why? What\'s different about multiplying by 4 vs. multiplying by 2/3?',
                next: 'q_reflect'
            },
            {
                id: 'q_reflect',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Complete this rule: When you multiply a number by a fraction less than 1, the product is ___. When you multiply by a number greater than 1, the product is ___.',
                accept: { keywords: ['smaller', 'less', 'bigger', 'greater', 'larger', 'more'], keywordThreshold: 0.3 },
                hints: [
                    'Think of 3/4 × 2/3 (= 1/2, smaller) vs. 2/3 × 4 (= 8/3, bigger).',
                    'Fraction < 1 → product shrinks. Number > 1 → product grows.'
                ],
                socraticFollow: 'What about multiplying by exactly 1? What happens to the product?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Fraction Multiplication Master!',
                content: 'You discovered that **multiplying fractions** is about finding a "fraction of a fraction."\n\nKey insight: *Multiplying by a fraction less than 1 shrinks the number. The area model shows WHY — you\'re taking a part of a part.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 5: VOLUME AND AREA
    // ═══════════════════════════════════════════════════

    'volume and area': {
        id: 'volume-area-5',
        topic: 'volume and area',
        grade: 5,
        title: 'Volume: Packing a Box with Unit Cubes',
        description: 'Discover volume by building rectangular prisms with unit cubes, then connecting to the formula.',
        standards: {
            ccss: ['5.MD.C.3', '5.MD.C.4', '5.MD.C.5'],
            mn: ['5.3.1.1', '5.3.1.2'],
            teks: ['5.4H']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Moving Box',
                content: 'You\'re helping a friend pack for a move. They have a box that is **5 units long**, **3 units wide**, and **2 units tall**.\n\nThey want to fill it with unit cubes (little 1×1×1 blocks). How many cubes will fit?\n\nLet\'s build it layer by layer.',
                next: 'q_layer'
            },
            {
                id: 'q_layer',
                type: 'question',
                phase: 'orient',
                prompt: 'Start with just the bottom layer (1 unit tall). If the box is 5 long and 3 wide, how many cubes fit in one layer?',
                accept: { exact: ['15'], numeric: 15, tolerance: 0.01 },
                hints: [
                    'The bottom is a rectangle: 5 cubes across, 3 cubes deep.',
                    '5 × 3 = 15 cubes in one layer.'
                ],
                sentenceFrames: [
                    'One layer has ___ cubes because ___.',
                    'I found the number of cubes by ___.'
                ],
                socraticFollow: 'What operation did you use? Why does multiplication work here?',
                next: 'visual_layer'
            },
            {
                id: 'visual_layer',
                type: 'visual',
                phase: 'orient',
                title: 'One Layer',
                content: 'Here\'s the bottom layer — 5 × 3 = 15 cubes:',
                visual: { type: 'areaModel', a: 5, b: 3 },
                next: 'q_stack'
            },
            {
                id: 'q_stack',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The box is 2 units tall. If each layer has 15 cubes, how many cubes total?',
                accept: { exact: ['30'], numeric: 30, tolerance: 0.01 },
                hints: [
                    '2 layers, each with 15 cubes.',
                    '15 × 2 = 30 cubes total.'
                ],
                socraticFollow: 'What if the box were 4 units tall instead? How would that change your answer?',
                next: 'reveal_volume'
            },
            {
                id: 'reveal_volume',
                type: 'reveal',
                phase: 'explore',
                content: '**5 × 3 × 2 = 30 unit cubes**\n\nThat\'s the volume! Volume = length × width × height.',
                explanation: 'Volume counts how many unit cubes fill a 3D space. Layer method: (cubes per layer) × (number of layers).',
                next: 'q_formula'
            },
            {
                id: 'q_formula',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'You found: 5 × 3 × 2 = 30. Notice: 5 × 3 gives you the area of the BASE. Then you multiply by the HEIGHT. Write the volume formula using the words: Base area, height.',
                accept: { keywords: ['base', 'area', 'height', 'V = B × h', 'V = Bh', 'base area times height'], keywordThreshold: 0.3 },
                hints: [
                    'Base area = length × width. Volume = Base area × height.',
                    'V = B × h, where B is the area of the base.'
                ],
                socraticFollow: 'Why is Volume = Base × height? What does "stacking layers" have to do with it?',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_build' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_build',
                type: 'scaffold',
                phase: 'explore',
                title: 'Building Volume Step by Step',
                content: 'Volume = how many unit cubes fill a space.\n\n**Method:**\n1. Find the BASE area: length × width\n2. Stack it up: Base area × height\n\nV = l × w × h\n\nExample: 4 × 2 × 3 = 8 × 3 = 24 cubic units.',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Find the volume: length = 6, width = 4, height = 3.',
                accept: { exact: ['72'], numeric: 72, tolerance: 0.01 },
                hints: [
                    'V = l × w × h = 6 × 4 × 3.',
                    '6 × 4 = 24, then 24 × 3 = 72.'
                ],
                socraticFollow: 'What are the units? If each edge is measured in cm, volume is in...?',
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A fish tank holds 120 cubic inches of water. The tank is 10 inches long and 6 inches wide. How tall is the water?',
                accept: { exact: ['2'], numeric: 2, tolerance: 0.01 },
                hints: [
                    'V = l × w × h. You know V=120, l=10, w=6. Solve for h.',
                    '120 = 10 × 6 × h → 120 = 60 × h → h = 120 ÷ 60 = 2.'
                ],
                socraticFollow: 'You just used the volume formula "backwards" to find a missing dimension. When else might you need to do that?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Volume Master!',
                content: 'You built volume from the ground up — literally, layer by layer!\n\nKey insight: *Volume = length × width × height = Base area × height. It counts how many unit cubes fill a 3D space. The formula comes from stacking identical layers.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 5: COORDINATE PLANE
    // ═══════════════════════════════════════════════════

    'coordinate plane': {
        id: 'coordinate-plane-5',
        topic: 'coordinate plane',
        grade: 5,
        title: 'The Coordinate Plane: Treasure Map Math',
        description: 'Navigate the first quadrant using ordered pairs, plot points, and discover patterns on the coordinate plane.',
        standards: {
            ccss: ['5.G.A.1', '5.G.A.2'],
            mn: ['5.3.2.1'],
            teks: ['5.8A', '5.8B', '5.8C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Treasure Map',
                content: 'You found a **treasure map** with a grid on it! The map says:\n\n*"Start at the origin. Walk 4 steps East, then 3 steps North. X marks the spot!"*\n\nMathematicians use a coordinate plane that works just like this map. Let\'s learn the language of coordinates.',
                next: 'q_origin'
            },
            {
                id: 'q_origin',
                type: 'question',
                phase: 'orient',
                prompt: 'The "origin" is where you start — the point (0, 0). Why do you think it\'s called the origin?',
                accept: { keywords: ['start', 'beginning', 'zero', 'where you begin', 'starting point'], keywordThreshold: 0.3 },
                hints: [
                    '"Origin" means beginning or starting point.',
                    'It\'s (0, 0) because you haven\'t moved anywhere yet — zero east, zero north.'
                ],
                sentenceFrames: [
                    'The origin is called that because ___.',
                    'It is at (0, 0) because ___.'
                ],
                socraticFollow: 'If you\'re at the origin, you haven\'t moved in ANY direction. What does that look like on the grid?',
                next: 'q_ordered_pair'
            },
            {
                id: 'q_ordered_pair',
                type: 'question',
                phase: 'orient',
                dok: 1,
                prompt: 'The map says "4 East, 3 North." In math, we write this as an ordered pair: (4, 3). Which number comes first — the horizontal or the vertical?',
                accept: { keywords: ['horizontal', 'first', 'x', 'east', 'across', 'left right'], keywordThreshold: 0.3 },
                hints: [
                    'Think: you walk ACROSS the room before you climb UP the stairs.',
                    'First number = horizontal (x). Second number = vertical (y).'
                ],
                socraticFollow: 'Why does the order matter? Is (4, 3) the same spot as (3, 4)?',
                next: 'visual_point'
            },
            {
                id: 'visual_point',
                type: 'visual',
                phase: 'orient',
                title: 'Plotting the Treasure',
                content: 'Here\'s the treasure at (4, 3) — 4 right and 3 up from the origin:',
                visual: { type: 'coordinate', points: [[4, 3]], opts: { labels: ['Treasure (4,3)'] } },
                next: 'q_different_point'
            },
            {
                id: 'q_different_point',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Your friend says the treasure is at (3, 4) instead of (4, 3). Plot both in your mind. Are they the same point or different?',
                accept: { keywords: ['different', 'not the same', 'switched', 'swapped', 'order matters'], keywordThreshold: 0.3 },
                hints: [
                    '(4, 3) means 4 right, 3 up. (3, 4) means 3 right, 4 up.',
                    'They are DIFFERENT points! The order of numbers matters.'
                ],
                socraticFollow: 'Can you think of a pair where switching wouldn\'t matter? What about (5, 5)?',
                next: 'visual_both'
            },
            {
                id: 'visual_both',
                type: 'visual',
                phase: 'explore',
                title: 'Order Matters!',
                content: 'See? (4, 3) and (3, 4) are different locations:',
                visual: { type: 'coordinate', points: [[4, 3], [3, 4]], opts: { labels: ['(4,3)', '(3,4)'] } },
                next: 'q_pattern'
            },
            {
                id: 'q_pattern',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Plot these points: (1, 2), (2, 4), (3, 6). What pattern do you notice? What would the next point be?',
                accept: { keywords: ['4, 8', '(4, 8)', 'doubles', 'y is twice', 'times 2', 'multiply by 2'], keywordThreshold: 0.3 },
                hints: [
                    'Look at the x and y values: (1,2), (2,4), (3,6). What\'s the relationship between x and y?',
                    'y is always TWICE x! So when x = 4, y = 8.'
                ],
                socraticFollow: 'Could you write a rule? Something like "y = ___"?',
                next: 'visual_pattern'
            },
            {
                id: 'visual_pattern',
                type: 'visual',
                phase: 'explore',
                title: 'The Pattern on the Grid',
                content: 'The points form a line! y = 2x:',
                visual: { type: 'coordinate', points: [[1, 2], [2, 4], [3, 6], [4, 8]] },
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_rules' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_rules',
                type: 'scaffold',
                phase: 'explore',
                title: 'Coordinate Plane Rules',
                content: 'Remember:\n\n• **(x, y)** — x first (horizontal), y second (vertical)\n• **Origin** = (0, 0)\n• Move **RIGHT** for x, then **UP** for y\n• Order matters: (3, 5) ≠ (5, 3)',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'What ordered pair is 6 units right and 1 unit up from the origin?',
                accept: { exact: ['(6, 1)', '(6,1)', '6, 1', '6,1'], keywords: ['6', '1'] , keywordThreshold: 0.5 },
                hints: [
                    'x = how far right = 6. y = how far up = 1.',
                    'The ordered pair is (6, 1).'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A rectangle has corners at (1, 1), (1, 5), (4, 5), and (4, 1). What is the length, width, and area of this rectangle?',
                accept: { keywords: ['3', '4', '12', 'length', 'width', 'area'], keywordThreshold: 0.3 },
                hints: [
                    'Width: from x=1 to x=4 = 3 units. Height: from y=1 to y=5 = 4 units.',
                    'Area = length × width = 3 × 4 = 12 square units.'
                ],
                socraticFollow: 'How did coordinates help you find the side lengths without measuring?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Coordinate Plane Navigator!',
                content: 'You navigated the **coordinate plane** like a pro!\n\nKey insight: *Ordered pairs (x, y) are an address system for math. They let you describe exact locations, find patterns, and connect geometry to algebra.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 5: ORDER OF OPERATIONS AND EXPRESSIONS
    // ═══════════════════════════════════════════════════

    'order of operations and expressions': {
        id: 'order-of-operations-5',
        topic: 'order of operations and expressions',
        grade: 5,
        title: 'Order of Operations: Why Rules Matter',
        description: 'Discover why mathematicians need agreed-upon rules for the order of operations.',
        standards: {
            ccss: ['5.OA.A.1', '5.OA.A.2', '5.OA.B.3'],
            mn: ['5.2.1.1', '5.2.1.2'],
            teks: ['5.4C', '5.4D', '5.4E', '5.4F']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Calculator Argument',
                content: 'Two friends are arguing about **3 + 4 × 2**.\n\n**Alex** says: "3 + 4 = 7, then 7 × 2 = **14**!"\n**Sam** says: "4 × 2 = 8, then 3 + 8 = **11**!"\n\nThey can\'t both be right... can they? Who is correct, and why?',
                next: 'q_who_right'
            },
            {
                id: 'q_who_right',
                type: 'question',
                phase: 'orient',
                prompt: 'Who do you think is correct — Alex (14) or Sam (11)? Why?',
                accept: { keywords: ['Sam', '11', 'multiply first', 'multiplication first', 'times before plus'], keywordThreshold: 0.3 },
                hints: [
                    'Is there a rule for which operation to do first?',
                    'Mathematicians agreed: multiplication comes before addition. Sam is right!'
                ],
                sentenceFrames: [
                    'I think ___ is correct because ___.',
                    'The rule says to do ___ before ___.'
                ],
                socraticFollow: 'Why do we need a rule? What would happen if everyone just went left to right?',
                next: 'reveal_order'
            },
            {
                id: 'reveal_order',
                type: 'reveal',
                phase: 'orient',
                content: '**Sam is correct: 3 + 4 × 2 = 3 + 8 = 11**\n\nThe rule: do multiplication and division BEFORE addition and subtraction.',
                explanation: 'Without agreed-upon rules, the same expression could mean different things to different people!',
                next: 'q_pemdas'
            },
            {
                id: 'q_pemdas',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'The order of operations is: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right). Solve: (2 + 3) × 4',
                accept: { exact: ['20'], numeric: 20, tolerance: 0.01 },
                hints: [
                    'Parentheses first: (2 + 3) = 5.',
                    'Then multiply: 5 × 4 = 20.'
                ],
                socraticFollow: 'What would the answer be WITHOUT the parentheses? 2 + 3 × 4 = ?',
                next: 'q_no_parens'
            },
            {
                id: 'q_no_parens',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Now solve WITHOUT parentheses: 2 + 3 × 4 = ?',
                accept: { exact: ['14'], numeric: 14, tolerance: 0.01 },
                hints: [
                    'No parentheses, so multiplication first: 3 × 4 = 12.',
                    'Then addition: 2 + 12 = 14.'
                ],
                socraticFollow: '20 vs. 14 — same numbers, different answer! What changed? Just the parentheses! They\'re powerful.',
                next: 'q_complex'
            },
            {
                id: 'q_complex',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Solve step by step: 12 ÷ (2 + 4) × 3 = ?',
                accept: { exact: ['6'], numeric: 6, tolerance: 0.01 },
                hints: [
                    'Step 1 — Parentheses: (2 + 4) = 6. Now you have: 12 ÷ 6 × 3.',
                    'Step 2 — Left to right (÷ and × are equal): 12 ÷ 6 = 2. Then 2 × 3 = 6.'
                ],
                socraticFollow: 'When multiplication and division appear together, which do you do first?',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_write_expression' },
                    { minScore: 0.0, target: 'scaffold_steps' }
                ],
                next: 'q_write_expression'
            },
            {
                id: 'scaffold_steps',
                type: 'scaffold',
                phase: 'explore',
                title: 'The Order of Operations',
                content: 'Remember this order:\n\n1. **P**arentheses — do these first\n2. **E**xponents — powers next\n3. **M**ultiplication & **D**ivision — left to right\n4. **A**ddition & **S**ubtraction — left to right\n\n*Multiplication and division are EQUAL (left to right). Same for addition and subtraction.*',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Solve: 8 + 2 × 5 = ?',
                accept: { exact: ['18'], numeric: 18, tolerance: 0.01 },
                hints: [
                    'Multiply first: 2 × 5 = 10.',
                    'Then add: 8 + 10 = 18.'
                ],
                next: 'q_write_expression'
            },
            {
                id: 'q_write_expression',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Write a numerical expression for this situation: "You buy 3 bags of apples at $4 each and a $2 drink." Use one expression (no separate steps) and solve it.',
                accept: { keywords: ['3 × 4', '3(4)', '+ 2', '14', '$14'], keywordThreshold: 0.3 },
                hints: [
                    'The apples cost: 3 × 4. The drink costs: 2. Total expression: 3 × 4 + 2.',
                    '3 × 4 + 2 = 12 + 2 = 14.'
                ],
                socraticFollow: 'What if you bought the drink first, then the apples: 2 + 3 × 4? Do you get the same answer? Why?',
                next: 'q_reflect'
            },
            {
                id: 'q_reflect',
                type: 'question',
                phase: 'connect',
                prompt: 'Why do mathematicians need an agreed-upon order of operations? What would happen without one?',
                accept: { keywords: ['agree', 'same', 'answer', 'confusion', 'different', 'rules', 'consistent', 'everyone'], keywordThreshold: 0.3 },
                hints: [
                    'Think about Alex and Sam\'s argument at the beginning.',
                    'Without rules, the same expression could mean different things to different people!'
                ],
                socraticFollow: 'It\'s like a language — everyone has to agree on the grammar so they understand each other!',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Order of Operations Expert!',
                content: 'You settled the great calculator debate!\n\nKey insight: *The order of operations isn\'t arbitrary — it\'s a shared agreement so that every mathematician, calculator, and computer gets the SAME answer from the SAME expression. Parentheses let you override the default order when you need to.*',
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
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 10: CONGRUENCE AND TRIANGLES (Geometric Proofs)
    // ═══════════════════════════════════════════════════

    'congruence and triangles': {
        id: 'congruence-triangles-10',
        topic: 'congruence and triangles',
        grade: 10,
        title: 'Congruent Triangles: Proving Shapes Are Identical',
        description: 'Explore triangle congruence through construction, visual comparison, and logical proof.',
        standards: {
            ccss: ['G-CO.B.7', 'G-CO.B.8'],
            mn: ['9.3.3.1', '9.3.3.2'],
            teks: ['G.6B', 'G.6C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Bridge Builder',
                content: 'A bridge engineer needs to make two **identical** triangular supports. She measures: **side 5m, side 7m, and the angle between them is 60°.**\n\nShe sends these three measurements to two different factories. Both factories build a triangle from just those three numbers.\n\nWill they be the SAME triangle? Or could they be different?',
                next: 'q_predict'
            },
            {
                id: 'q_predict',
                type: 'question',
                phase: 'orient',
                prompt: 'If both factories use the same 2 sides (5m and 7m) and the same included angle (60°), will the triangles be identical? What\'s your intuition?',
                accept: { keywords: ['same', 'identical', 'yes', 'congruent', 'match', 'must be'], keywordThreshold: 0.3 },
                hints: [
                    'Try to imagine building a triangle with 2 sticks and a fixed angle between them. Could you get different shapes?',
                    'Once you fix two sides and the angle between them, there\'s only ONE triangle you can make.'
                ],
                sentenceFrames: [
                    'I think the triangles will be ___ because ___.',
                    'Two sides and the included angle ___ to determine a triangle.'
                ],
                socraticFollow: 'What if the angle was NOT between the two given sides? Would there still be only one possible triangle?',
                next: 'visual_sas'
            },
            {
                id: 'visual_sas',
                type: 'visual',
                phase: 'orient',
                title: 'SAS — Side-Angle-Side',
                content: 'Both factories produce the same triangle — because SAS (Side-Angle-Side) guarantees congruence:',
                visual: { type: 'areaModel', a: 5, b: 7, opts: { label: 'SAS: 5, 60°, 7' } },
                next: 'q_sas_name'
            },
            {
                id: 'q_sas_name',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'This rule is called "SAS" — Side-Angle-Side. What does each letter stand for, and why does the order matter?',
                accept: { keywords: ['side', 'angle', 'between', 'included', 'order'], keywordThreshold: 0.3 },
                hints: [
                    'S = Side, A = Angle, S = Side. The angle must be BETWEEN the two sides.',
                    'The "included angle" is the angle formed by the two sides you\'re measuring.'
                ],
                socraticFollow: 'What about SSA (Side-Side-Angle where the angle is NOT between the sides)? Would that work? Why is SSA tricky?',
                next: 'q_sss'
            },
            {
                id: 'q_sss',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'What if you know ALL THREE sides of a triangle: 3, 4, and 5? Is there only one triangle with those side lengths, or could there be multiple?',
                accept: { keywords: ['one', 'only one', 'unique', 'same', 'SSS', 'congruent'], keywordThreshold: 0.3 },
                hints: [
                    'Try to make a triangle with sides 3, 4, 5 in different ways. Can you get a different shape?',
                    'If all three sides match, there\'s only ONE possible triangle. This is the SSS (Side-Side-Side) rule.'
                ],
                socraticFollow: 'Why does SSS work? Think about it physically — if you have 3 rigid sticks, can they hinge?',
                next: 'q_asa'
            },
            {
                id: 'q_asa',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'List the triangle congruence shortcuts. We have SAS and SSS. What about ASA (Angle-Side-Angle)? If you know two angles and the side between them, is the triangle determined?',
                accept: { keywords: ['yes', 'determined', 'congruent', 'one triangle', 'ASA'], keywordThreshold: 0.3 },
                hints: [
                    'If you know two angles, you actually know all three (they add to 180°). With the side between them fixed...',
                    'Yes! ASA works. Two angles + the included side = exactly one triangle.'
                ],
                socraticFollow: 'We now have SAS, SSS, and ASA. Is AAA (three angles) enough? Why or why not?',
                next: 'reveal_shortcuts'
            },
            {
                id: 'reveal_shortcuts',
                type: 'reveal',
                phase: 'explore',
                content: '**Triangle Congruence Shortcuts:**\n• **SSS** — all three sides match\n• **SAS** — two sides + included angle\n• **ASA** — two angles + included side\n• **AAS** — two angles + a non-included side\n• **HL** — hypotenuse + leg (right triangles only)\n\n**NOT valid:** SSA (ambiguous case), AAA (same shape but different size = similar, not congruent)',
                explanation: 'Each shortcut proves two triangles are identical without checking all 6 parts (3 sides + 3 angles).',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_proof' },
                    { minScore: 0.0, target: 'scaffold_identify' }
                ],
                next: 'q_proof'
            },
            {
                id: 'scaffold_identify',
                type: 'scaffold',
                phase: 'explore',
                title: 'How to Pick the Right Shortcut',
                content: 'To prove two triangles are congruent:\n\n1. **Mark what you know** — which sides and angles are given or shared?\n2. **Count:** How many sides (S) and angles (A) do you have?\n3. **Match a pattern:** SSS, SAS, ASA, AAS, or HL?\n4. **Write the statement:** △ABC ≅ △DEF by ___.',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Triangle ABC has AB = DE, angle B = angle E, and BC = EF. Which congruence rule applies: SSS, SAS, ASA, or AAS?',
                accept: { keywords: ['SAS', 'side angle side'], keywordThreshold: 0.5 },
                hints: [
                    'You have: Side (AB=DE), Angle (B=E), Side (BC=EF). The angle is between the two sides.',
                    'Side-Angle-Side = SAS.'
                ],
                next: 'q_proof'
            },
            {
                id: 'q_proof',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Two triangles share a common side. You also know two pairs of sides are equal (one pair on each side of the shared side). What congruence rule proves they\'re congruent? Explain your reasoning.',
                accept: { keywords: ['SSS', 'three sides', 'shared', 'common', 'reflexive'], keywordThreshold: 0.3 },
                hints: [
                    'The shared side is equal to itself (reflexive property). That gives you one pair of equal sides for free.',
                    'Two given pairs + the shared side = three pairs of equal sides = SSS.'
                ],
                socraticFollow: 'The "reflexive property" (a side equals itself) appears in almost every proof with shared sides. Why is it so useful?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Proof Master!',
                content: 'You explored **triangle congruence** — how to prove two triangles are identical.\n\nKey insight: *You don\'t need all 6 measurements. Just 3 well-chosen ones (SSS, SAS, ASA, AAS, or HL) are enough to guarantee congruence. This is the foundation of geometric proof.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 10: SIMILARITY AND RIGHT TRIANGLES (Trig)
    // ═══════════════════════════════════════════════════

    'similarity and right triangles': {
        id: 'similarity-right-triangles-10',
        topic: 'similarity and right triangles',
        grade: 10,
        title: 'Right Triangle Trigonometry: The Power of Ratios',
        description: 'Discover sine, cosine, and tangent through similar right triangles and real-world measurement.',
        standards: {
            ccss: ['G-SRT.C.6', 'G-SRT.C.7', 'G-SRT.C.8'],
            mn: ['9.3.3.5', '9.3.3.6'],
            teks: ['G.9A', 'G.9B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'How Tall Is That Tree?',
                content: 'You want to know how tall a tree is, but you can\'t climb it. You stand **40 feet** from the base and look up at the top. The angle from the ground to the treetop is **32°**.\n\nYou know a distance and an angle. Can you find the height WITHOUT measuring it directly?\n\nThis is what **trigonometry** was invented for.',
                next: 'q_setup'
            },
            {
                id: 'q_setup',
                type: 'question',
                phase: 'orient',
                prompt: 'Draw a picture in your mind: you, the tree, and the ground form a right triangle. Which part is the right angle? Which side is the one you want to find?',
                accept: { keywords: ['ground', 'base', 'tree', 'height', 'vertical', 'opposite', '90'], keywordThreshold: 0.3 },
                hints: [
                    'The tree meets the ground at 90°. That\'s the right angle.',
                    'You know: the ground (40 ft) and the angle (32°). You want: the height (opposite side).'
                ],
                sentenceFrames: [
                    'The right angle is where ___.',
                    'I need to find the ___ side, which is ___ the angle.'
                ],
                socraticFollow: 'The side you can see (40 ft) is ADJACENT to the 32° angle. The height is OPPOSITE. Why do those names matter?',
                next: 'q_ratio_idea'
            },
            {
                id: 'q_ratio_idea',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Here\'s the key insight: In ALL right triangles with a 32° angle, the ratio of opposite/adjacent is the SAME number. Why? (Hint: think about similar triangles.)',
                accept: { keywords: ['similar', 'same shape', 'proportional', 'scale', 'same angle', 'same ratio'], keywordThreshold: 0.3 },
                hints: [
                    'If two right triangles both have a 32° angle, they have the same three angles (32°, 58°, 90°).',
                    'Same angles → similar triangles → proportional sides → same ratios!'
                ],
                socraticFollow: 'This is why trig works! The ratio depends ONLY on the angle, not on the size of the triangle.',
                next: 'reveal_tan'
            },
            {
                id: 'reveal_tan',
                type: 'reveal',
                phase: 'explore',
                content: '**Tangent = Opposite ÷ Adjacent**\n\ntan(32°) = height ÷ 40\n\ntan(32°) ≈ 0.6249\n\nSo: height = 40 × 0.6249 ≈ **25 feet**',
                explanation: 'Tangent relates the opposite and adjacent sides. Every 32° right triangle has the same tangent ratio.',
                next: 'q_soh_cah_toa'
            },
            {
                id: 'q_soh_cah_toa',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'There are three trig ratios:\n• sin = Opposite/Hypotenuse\n• cos = Adjacent/Hypotenuse\n• tan = Opposite/Adjacent\n\nThe mnemonic is SOH-CAH-TOA. In a right triangle with angle θ, hypotenuse 10, opposite side 6, and adjacent side 8: what is sin(θ)?',
                accept: { exact: ['6/10', '3/5', '0.6'], numeric: 0.6, tolerance: 0.01 },
                hints: [
                    'sin = Opposite / Hypotenuse = 6 / 10.',
                    '6/10 = 3/5 = 0.6.'
                ],
                socraticFollow: 'What are cos(θ) and tan(θ) for this same triangle?',
                next: 'q_cos_tan'
            },
            {
                id: 'q_cos_tan',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Same triangle: hypotenuse 10, opposite 6, adjacent 8. Find cos(θ) and tan(θ).',
                accept: { keywords: ['8/10', '4/5', '0.8', '6/8', '3/4', '0.75', 'cos', 'tan'], keywordThreshold: 0.3 },
                hints: [
                    'cos = Adjacent/Hypotenuse = 8/10 = 4/5 = 0.8.',
                    'tan = Opposite/Adjacent = 6/8 = 3/4 = 0.75.'
                ],
                socraticFollow: 'Notice: tan(θ) = sin(θ)/cos(θ). Check: 0.6/0.8 = 0.75. Why does that work?',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_identify' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_identify',
                type: 'scaffold',
                phase: 'explore',
                title: 'Choosing the Right Ratio',
                content: 'Ask: Which two sides am I working with?\n\n• **Opposite & Hypotenuse** → use **sin**\n• **Adjacent & Hypotenuse** → use **cos**\n• **Opposite & Adjacent** → use **tan**\n\nRemember: **SOH-CAH-TOA**\n• **S**in = **O**pposite / **H**ypotenuse\n• **C**os = **A**djacent / **H**ypotenuse\n• **T**an = **O**pposite / **A**djacent',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'A ladder leans against a wall at a 65° angle with the ground. The ladder is 12 feet long (hypotenuse). Which trig ratio finds the height up the wall? Set up the equation (don\'t solve).',
                accept: { keywords: ['sin', 'opposite', 'hypotenuse', 'sin(65)', '12'], keywordThreshold: 0.3 },
                hints: [
                    'The height is opposite the 65° angle. The ladder is the hypotenuse.',
                    'Opposite & Hypotenuse → sin. So: sin(65°) = height / 12.'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A ramp rises 3 feet over a horizontal distance of 12 feet. What angle does the ramp make with the ground? Which trig ratio and what is the angle (to the nearest degree)?',
                accept: { keywords: ['tan', 'arctan', 'inverse', '14', '3/12', '1/4', '0.25'], keywordThreshold: 0.3 },
                hints: [
                    'You know opposite (3) and adjacent (12). That\'s tangent: tan(θ) = 3/12 = 0.25.',
                    'θ = arctan(0.25) ≈ 14°. (Use inverse tangent to go from ratio → angle.)'
                ],
                socraticFollow: 'We used trig "backwards" — from a ratio to find an angle. When would you need to do this in real life?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Trigonometry Pioneer!',
                content: 'You discovered that **trigonometric ratios** let you find missing sides and angles in right triangles.\n\nKey insight: *Because similar right triangles have the same ratios, knowing just ONE angle and ONE side is enough to find everything else. That\'s the power of sin, cos, and tan.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 10: CIRCLES AND ARC MEASURES
    // ═══════════════════════════════════════════════════

    'circles and arc measures': {
        id: 'circles-arcs-10',
        topic: 'circles and arc measures',
        grade: 10,
        title: 'Circles: Central Angles, Arcs & Sectors',
        description: 'Explore the relationship between central angles, arc length, and sector area.',
        standards: {
            ccss: ['G-C.A.1', 'G-C.A.2', 'G-C.B.5'],
            mn: ['9.3.4.1', '9.3.4.2'],
            teks: ['G.12A', 'G.12B', 'G.12C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Pizza Fraction Returns',
                content: 'A pizza has a **14-inch diameter**. You cut it into 8 equal slices.\n\nHow big is each slice? Not just "1/8 of the pizza" — let\'s find the exact **arc length** (the crust edge) and **area** of each slice.\n\nThis is where circles meet fractions meet geometry.',
                next: 'q_central_angle'
            },
            {
                id: 'q_central_angle',
                type: 'question',
                phase: 'orient',
                prompt: 'A full circle is 360°. If you cut the pizza into 8 equal slices, what is the central angle of each slice?',
                accept: { exact: ['45', '45°', '45 degrees'], numeric: 45, tolerance: 0.01 },
                hints: [
                    '360° ÷ 8 = ?',
                    '360 ÷ 8 = 45° per slice.'
                ],
                sentenceFrames: [
                    'Each slice has a central angle of ___ because ___.',
                    '360° divided by ___ slices = ___ per slice.'
                ],
                socraticFollow: 'What fraction of the circle is 45°? How does that connect to 1/8?',
                next: 'visual_pizza'
            },
            {
                id: 'visual_pizza',
                type: 'visual',
                phase: 'orient',
                title: 'One Slice = 1/8 of the Circle',
                content: 'Each slice is 45° out of 360° = 1/8 of the full circle:',
                visual: { type: 'fractionCircle', num: 1, denom: 8 },
                next: 'q_circumference'
            },
            {
                id: 'q_circumference',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The pizza has a 14-inch diameter, so the radius is 7 inches. What is the full circumference? (C = 2πr)',
                accept: { keywords: ['14π', '14pi', '43.96', '43.98', '44', '2π(7)'], keywordThreshold: 0.3 },
                hints: [
                    'C = 2πr = 2 × π × 7.',
                    'C = 14π ≈ 43.98 inches.'
                ],
                socraticFollow: 'Why do we leave it as 14π instead of calculating? When is the exact form more useful?',
                next: 'q_arc_length'
            },
            {
                id: 'q_arc_length',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Each slice is 1/8 of the circle. What is the arc length (crust edge) of one slice?',
                accept: { keywords: ['14π/8', '7π/4', '1.75π', '5.5', '5.49', '5.50'], keywordThreshold: 0.3 },
                hints: [
                    'Arc length = (angle/360) × circumference = (45/360) × 14π.',
                    '= (1/8) × 14π = 14π/8 = 7π/4 ≈ 5.50 inches.'
                ],
                socraticFollow: 'Arc length formula: (θ/360) × 2πr. What does the fraction θ/360 represent?',
                next: 'q_sector_area'
            },
            {
                id: 'q_sector_area',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The full pizza area is πr² = π(7²) = 49π ≈ 153.94 sq inches. What is the area of one slice?',
                accept: { keywords: ['49π/8', '6.125π', '19.24', '19.2'], keywordThreshold: 0.3 },
                hints: [
                    'Sector area = (angle/360) × πr² = (1/8) × 49π.',
                    '= 49π/8 ≈ 19.24 square inches.'
                ],
                socraticFollow: 'Notice: both arc length AND sector area use the same fraction (θ/360). Why?',
                next: 'reveal_formulas'
            },
            {
                id: 'reveal_formulas',
                type: 'reveal',
                phase: 'explore',
                content: '**Circle Sector Formulas:**\n\n• **Arc length** = (θ/360) × 2πr\n• **Sector area** = (θ/360) × πr²\n\nBoth use **(θ/360)** — the fraction of the full circle that the angle represents.',
                explanation: 'The central angle determines what fraction of the circle you\'re looking at. Apply that fraction to circumference (for arc length) or area (for sector area).',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_method' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_method',
                type: 'scaffold',
                phase: 'explore',
                title: 'The Fraction Method',
                content: 'Every arc/sector problem follows the same logic:\n\n1. **Find the fraction**: θ/360 = what fraction of the circle?\n2. **Apply the fraction**:\n   - To circumference for **arc length**\n   - To total area for **sector area**\n\nIt\'s always: **(fraction of circle) × (whole circle measurement)**',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'A circle has radius 10 cm. Find the arc length for a 90° central angle.',
                accept: { keywords: ['5π', '15.7', '1/4', '20π/4'], keywordThreshold: 0.3 },
                hints: [
                    '90/360 = 1/4 of the circle.',
                    'Arc length = (1/4) × 2π(10) = (1/4) × 20π = 5π ≈ 15.71 cm.'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A sprinkler waters a sector with radius 20 feet and central angle 120°. How many square feet does it water? Express in terms of π and as a decimal.',
                accept: { keywords: ['400π/3', '133.3π', '418', '419', '200π/3'], keywordThreshold: 0.3 },
                hints: [
                    'Sector area = (120/360) × π(20²) = (1/3) × 400π.',
                    '= 400π/3 ≈ 418.88 square feet.'
                ],
                socraticFollow: 'If the angle doubled to 240°, would the area also double? Why?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Circle Geometry Master!',
                content: 'You mastered **arcs and sectors** by connecting fractions to circle geometry.\n\nKey insight: *A central angle tells you what FRACTION of the circle you have. Apply that fraction to the circumference for arc length, or to the area for sector area. Fractions are the bridge between angles and measurements.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 11: QUADRATIC FUNCTIONS AND COMPLEX NUMBERS
    // ═══════════════════════════════════════════════════

    'quadratic functions and complex numbers': {
        id: 'quadratics-11',
        topic: 'quadratic functions and complex numbers',
        grade: 11,
        title: 'Quadratic Functions: From Throw to Parabola',
        description: 'Discover quadratic functions through projectile motion, vertex form, and the discriminant.',
        standards: {
            ccss: ['A-SSE.B.3', 'A-REI.B.4', 'F-IF.C.7a'],
            mn: ['9.2.4.1', '9.2.4.3'],
            teks: ['A.7A', 'A.7B', 'A.7C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Basketball Arc',
                content: 'You throw a basketball toward the hoop. It follows a curved path — up, then down.\n\nThe height (in feet) at time *t* seconds is: **h(t) = −16t² + 24t + 6**\n\n−16t² is gravity pulling it down. +24t is the upward throw. +6 is your release height.\n\nThis is a **quadratic function** — and the curve it makes is called a **parabola**.',
                next: 'q_shape'
            },
            {
                id: 'q_shape',
                type: 'question',
                phase: 'orient',
                prompt: 'The coefficient of t² is −16 (negative). Does the parabola open upward or downward? Why does that make sense for a basketball?',
                accept: { keywords: ['down', 'downward', 'opens down', 'negative', 'gravity', 'falls'], keywordThreshold: 0.3 },
                hints: [
                    'When the leading coefficient is negative, the parabola opens downward — like an upside-down U.',
                    'This makes sense: the ball goes UP, reaches a peak, then comes back DOWN.'
                ],
                sentenceFrames: [
                    'The parabola opens ___ because the coefficient of t² is ___.',
                    'This makes sense because the basketball ___.'
                ],
                socraticFollow: 'When would a parabola open upward? What real-world situation would that model?',
                next: 'q_initial'
            },
            {
                id: 'q_initial',
                type: 'question',
                phase: 'orient',
                dok: 1,
                prompt: 'What is h(0) — the height at time 0? What does this represent physically?',
                accept: { exact: ['6'], numeric: 6, tolerance: 0.01 },
                hints: [
                    'Plug in t = 0: h(0) = −16(0)² + 24(0) + 6.',
                    'h(0) = 6. That\'s the release height — where the ball leaves your hands.'
                ],
                socraticFollow: 'The constant term (6) is the y-intercept. Why does plugging in t = 0 always give you the constant?',
                next: 'q_vertex'
            },
            {
                id: 'q_vertex',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The vertex (peak) of a parabola ax² + bx + c occurs at t = −b/(2a). For h(t) = −16t² + 24t + 6, when does the ball reach its maximum height?',
                accept: { exact: ['0.75', '3/4'], numeric: 0.75, tolerance: 0.01 },
                hints: [
                    'a = −16, b = 24. t = −24/(2 × −16).',
                    't = −24/(−32) = 24/32 = 3/4 = 0.75 seconds.'
                ],
                socraticFollow: 'Now that you know WHEN — what\'s the maximum HEIGHT? Plug t = 0.75 back in.',
                next: 'q_max_height'
            },
            {
                id: 'q_max_height',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Find h(0.75) — the maximum height. Show your work.',
                accept: { exact: ['15'], numeric: 15, tolerance: 0.1 },
                hints: [
                    'h(0.75) = −16(0.75)² + 24(0.75) + 6.',
                    '= −16(0.5625) + 18 + 6 = −9 + 18 + 6 = 15 feet.'
                ],
                socraticFollow: 'The vertex is (0.75, 15). In context: the ball peaks at 15 feet after 0.75 seconds. Does that seem reasonable for a basketball shot?',
                next: 'q_zeros'
            },
            {
                id: 'q_zeros',
                type: 'question',
                phase: 'explore',
                dok: 3,
                prompt: 'When does the ball hit the ground? That means h(t) = 0. Set −16t² + 24t + 6 = 0 and use the quadratic formula. What is the discriminant (b² − 4ac)?',
                accept: { keywords: ['960', 'discriminant', 'b² − 4ac', 'positive'], keywordThreshold: 0.3 },
                hints: [
                    'a = −16, b = 24, c = 6. Discriminant = 24² − 4(−16)(6).',
                    '= 576 − (−384) = 576 + 384 = 960.'
                ],
                socraticFollow: 'The discriminant is positive (960). What does that tell you about how many solutions there are?',
                next: 'reveal_discriminant'
            },
            {
                id: 'reveal_discriminant',
                type: 'reveal',
                phase: 'explore',
                content: '**The Discriminant (b² − 4ac) = 960 > 0**\n\nPositive discriminant → **two real solutions**\n(Ball crosses ground level going up and coming down)\n\nt = (−24 ± √960)/(2 × −16) → t ≈ −0.22 or t ≈ 1.72\n\nOnly t ≈ 1.72 seconds makes sense (positive time).',
                explanation: 'Discriminant > 0: two solutions. Discriminant = 0: one solution. Discriminant < 0: no real solutions (complex numbers!).',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_summary' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_summary',
                type: 'scaffold',
                phase: 'explore',
                title: 'Quadratic Function Key Facts',
                content: 'For **f(x) = ax² + bx + c**:\n\n• **Opens up** if a > 0, **down** if a < 0\n• **Vertex** at x = −b/(2a) → plug back in for y\n• **y-intercept** = c (set x = 0)\n• **Zeros/roots** from quadratic formula: x = (−b ± √(b²−4ac))/(2a)\n• **Discriminant** (b²−4ac): positive → 2 roots, zero → 1 root, negative → no real roots',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Without graphing: does y = x² − 4x + 5 have two x-intercepts, one, or none? (Check the discriminant.)',
                accept: { keywords: ['none', 'no real', 'negative', 'complex', '-4', 'less than zero'], keywordThreshold: 0.3 },
                hints: [
                    'Discriminant = (−4)² − 4(1)(5) = 16 − 20 = −4.',
                    'Negative discriminant → no real x-intercepts!'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A firework launches from the ground with h(t) = −16t² + 128t. At what time does it reach maximum height? What IS the maximum height? When does it hit the ground again?',
                accept: { keywords: ['4', 't = 4', '256', '8 seconds', 't = 8'], keywordThreshold: 0.3 },
                hints: [
                    'Vertex: t = −128/(2×−16) = −128/(−32) = 4 seconds.',
                    'h(4) = −16(16) + 128(4) = −256 + 512 = 256 feet. Ground: −16t² + 128t = 0 → t(−16t + 128) = 0 → t = 0 or t = 8.'
                ],
                socraticFollow: 'Notice the symmetry: peak at t = 4, ground at t = 8. The peak is always halfway between the two zeros. Why?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Quadratic Function Master!',
                content: 'You analyzed **quadratic functions** from story to formula to graph.\n\nKey insight: *The vertex tells you the max/min, the discriminant tells you how many solutions exist, and the parabola\'s symmetry connects them all. Quadratics model everything from basketball shots to business profits.*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 11: POLYNOMIAL FUNCTIONS
    // ═══════════════════════════════════════════════════

    'polynomial functions': {
        id: 'polynomials-11',
        topic: 'polynomial functions',
        grade: 11,
        title: 'Polynomial Functions: Beyond Quadratics',
        description: 'Explore polynomial behavior through end behavior, zeros, multiplicity, and factoring.',
        standards: {
            ccss: ['A-APR.B.2', 'A-APR.B.3', 'F-IF.C.7c'],
            mn: ['9.2.4.5', '9.2.4.6'],
            teks: ['A2.6A', 'A2.6B']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Roller Coaster',
                content: 'A roller coaster track follows the curve:\n\n**y = x³ − 6x² + 9x**\n\nThis is a **polynomial** of degree 3 (a cubic). Unlike a parabola, it can go up AND down AND up again — making it perfect for a roller coaster!\n\nLet\'s figure out the shape of this ride.',
                next: 'q_zeros'
            },
            {
                id: 'q_zeros',
                type: 'question',
                phase: 'orient',
                prompt: 'First, let\'s find where the coaster crosses ground level. Factor: x³ − 6x² + 9x = 0. (Hint: factor out x first.)',
                accept: { keywords: ['x', '(x-3)', 'x(x-3)²', '0', '3', 'x = 0', 'x = 3'], keywordThreshold: 0.3 },
                hints: [
                    'Factor out x: x(x² − 6x + 9) = 0.',
                    'x² − 6x + 9 is a perfect square trinomial: (x − 3)². So: x(x − 3)² = 0. Zeros: x = 0 and x = 3.'
                ],
                sentenceFrames: [
                    'Factoring gives me ___.',
                    'The zeros are x = ___ and x = ___ because ___.'
                ],
                socraticFollow: 'We got x = 0 and x = 3. But (x − 3) appears TWICE — it\'s squared. What might that mean for the graph?',
                next: 'q_multiplicity'
            },
            {
                id: 'q_multiplicity',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'At x = 0, the factor x has multiplicity 1 (odd). At x = 3, the factor (x−3) has multiplicity 2 (even). The graph CROSSES the x-axis at odd multiplicity and TOUCHES (bounces) at even multiplicity. What does the coaster do at x = 0 and x = 3?',
                accept: { keywords: ['crosses', 'cross', 'bounces', 'touches', 'touch'], keywordThreshold: 0.3 },
                hints: [
                    'At x = 0 (odd multiplicity): the graph crosses through the axis.',
                    'At x = 3 (even multiplicity): the graph touches the axis and bounces back.'
                ],
                socraticFollow: 'Why does even multiplicity cause a "bounce"? Think about what (x−3)² looks like near x = 3.',
                next: 'q_end_behavior'
            },
            {
                id: 'q_end_behavior',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'End behavior: as x → +∞, what happens to y = x³ − 6x² + 9x? Does y go to +∞ or −∞? What about as x → −∞?',
                accept: { keywords: ['positive infinity', '+∞', 'up', 'rises', '−∞', 'negative infinity', 'down', 'falls'], keywordThreshold: 0.3 },
                hints: [
                    'For very large x, the x³ term dominates everything else.',
                    'x³ is positive when x is positive, negative when x is negative. So: x → +∞ gives y → +∞, and x → −∞ gives y → −∞.'
                ],
                socraticFollow: 'Odd degree with positive leading coefficient → goes down-left and up-right. What if the leading coefficient were negative?',
                next: 'reveal_end_behavior'
            },
            {
                id: 'reveal_end_behavior',
                type: 'reveal',
                phase: 'explore',
                content: '**End Behavior Rules:**\n\n| Degree | Leading Coeff | Left | Right |\n|--------|--------------|------|-------|\n| Even   | Positive     | ↑    | ↑     |\n| Even   | Negative     | ↓    | ↓     |\n| Odd    | Positive     | ↓    | ↑     |\n| Odd    | Negative     | ↑    | ↓     |',
                explanation: 'End behavior depends only on the degree (even/odd) and the sign of the leading coefficient.',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_sketch' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_sketch',
                type: 'scaffold',
                phase: 'explore',
                title: 'Sketching a Polynomial',
                content: 'To sketch a polynomial:\n\n1. **Find zeros** by factoring\n2. **Determine multiplicity** (cross or bounce?)\n3. **Check end behavior** (degree + leading coefficient)\n4. **Plot** zeros, connect with correct behavior\n\nFor x(x−3)²:\n• Zero at 0 (crosses), zero at 3 (bounces)\n• Degree 3, positive leading coeff → ↓ left, ↑ right',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The polynomial (x + 1)(x − 2)(x − 4) has degree 3. What are its zeros, and does the graph cross or bounce at each?',
                accept: { keywords: ['-1', '2', '4', 'cross', 'crosses'], keywordThreshold: 0.3 },
                hints: [
                    'Zeros: x = −1, x = 2, x = 4 (each factor = 0).',
                    'Each has multiplicity 1 (odd), so the graph CROSSES at all three.'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'Describe the graph of f(x) = −2(x + 1)²(x − 3). Include: degree, zeros with multiplicity, end behavior, and whether it crosses or bounces at each zero.',
                accept: { keywords: ['degree 3', '-1', '3', 'bounces', 'crosses', 'up', 'down', 'negative'], keywordThreshold: 0.3 },
                hints: [
                    'Degree: 2 + 1 = 3. Zeros: x = −1 (mult 2, bounces), x = 3 (mult 1, crosses).',
                    'Leading term: −2x³. Odd degree, negative coeff → ↑ left, ↓ right.'
                ],
                socraticFollow: 'This polynomial has 3 as its degree but only 2 distinct zeros. How is that possible?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Polynomial Function Expert!',
                content: 'You can now read a polynomial like a story: zeros, multiplicity, and end behavior paint the full picture.\n\nKey insight: *Factored form reveals everything — each factor gives a zero, the exponent on each factor tells you cross vs. bounce, and the degree + leading coefficient determine the big picture (end behavior).*',
                next: null
            }
        ]
    },

    // ═══════════════════════════════════════════════════
    //  GRADE 11: EXPONENTIAL AND LOGARITHMIC FUNCTIONS
    // ═══════════════════════════════════════════════════

    'exponential and logarithmic functions': {
        id: 'exponential-log-11',
        topic: 'exponential and logarithmic functions',
        grade: 11,
        title: 'Exponentials & Logarithms: Growth, Decay & Undoing',
        description: 'Discover exponential growth/decay and logarithms as inverse operations through real-world contexts.',
        standards: {
            ccss: ['F-LE.A.1', 'F-BF.B.5', 'F-LE.A.4'],
            mn: ['9.2.5.1', '9.2.5.2'],
            teks: ['A2.5A', 'A2.5B', 'A2.5C']
        },
        startNode: 'story_intro',
        nodes: [
            {
                id: 'story_intro',
                type: 'story',
                phase: 'orient',
                title: 'The Doubling Penny',
                content: 'Would you rather have **$1,000,000** today, or a **penny that doubles every day** for 30 days?\n\nDay 1: $0.01\nDay 2: $0.02\nDay 3: $0.04\nDay 4: $0.08\n...\n\nThis seems like a terrible deal. Or is it?',
                next: 'q_predict'
            },
            {
                id: 'q_predict',
                type: 'question',
                phase: 'orient',
                prompt: 'Quick estimate: after 10 days of doubling, about how much will the penny be worth? After 20 days?',
                accept: { keywords: ['$10', '$5.12', '$1000', '$10,485', '5.12', '10485', '1024', '1048576'], keywordThreshold: 0.3 },
                hints: [
                    'Day 10: 0.01 × 2¹⁰ = 0.01 × 1024 = $10.24.',
                    'Day 20: 0.01 × 2²⁰ = 0.01 × 1,048,576 = $10,485.76. Still well under a million!'
                ],
                sentenceFrames: [
                    'After 10 days, I estimate about $___.',
                    'The amount ___ each day, so after 20 days it would be ___.'
                ],
                socraticFollow: 'It\'s only $10 after 10 days! Why do people say exponential growth is so powerful?',
                next: 'q_day30'
            },
            {
                id: 'q_day30',
                type: 'question',
                phase: 'orient',
                dok: 2,
                prompt: 'The formula is A = 0.01 × 2^d (where d = day number). What is the value on Day 30?',
                accept: { keywords: ['$10,737,418', '10737418', '$10 million', 'over 10 million', '2^30'], keywordThreshold: 0.3 },
                hints: [
                    '2³⁰ = 1,073,741,824.',
                    '0.01 × 1,073,741,824 = $10,737,418.24. Over TEN MILLION dollars!'
                ],
                socraticFollow: 'The penny wins by a landslide! Why does the growth feel so slow at first but then explode?',
                next: 'reveal_exponential'
            },
            {
                id: 'reveal_exponential',
                type: 'reveal',
                phase: 'explore',
                content: '**Day 30: $10,737,418.24 — Take the penny!**\n\nThis is **exponential growth**: A = A₀ × b^t\n• A₀ = starting amount (0.01)\n• b = growth factor (2 for doubling)\n• t = time (days)',
                explanation: 'Exponential growth starts slow then accelerates dramatically. The bigger the amount, the bigger the next jump.',
                next: 'q_decay'
            },
            {
                id: 'q_decay',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'A car loses 15% of its value each year. If it starts at $20,000, what\'s the formula? (Hint: losing 15% means keeping 85% = 0.85)',
                accept: { keywords: ['20000', '0.85', 'V = 20000(0.85)^t', '0.85^t'], keywordThreshold: 0.3 },
                hints: [
                    'Each year, the car is worth 85% of the previous year.',
                    'V = 20000 × (0.85)^t. This is exponential DECAY because 0 < 0.85 < 1.'
                ],
                socraticFollow: 'Growth has b > 1, decay has 0 < b < 1. Why does a base between 0 and 1 shrink the value?',
                next: 'q_log_intro'
            },
            {
                id: 'q_log_intro',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'The penny doubles daily. You want to know: how many days until you have $1000? That means: 0.01 × 2^d = 1000, so 2^d = 100,000. We need to "undo" the exponent. What operation undoes exponentiation?',
                accept: { keywords: ['logarithm', 'log', 'inverse'], keywordThreshold: 0.3 },
                hints: [
                    'Addition undoes subtraction. Multiplication undoes division. What undoes raising to a power?',
                    'A LOGARITHM undoes exponentiation. log₂(100,000) asks: "2 to what power gives 100,000?"'
                ],
                socraticFollow: 'So log is the INVERSE of exponentiation. log_b(x) asks: "b to what power gives x?"',
                next: 'q_solve_log'
            },
            {
                id: 'q_solve_log',
                type: 'question',
                phase: 'explore',
                dok: 2,
                prompt: 'Solve: 2^d = 100,000. Using the change of base formula: d = log(100,000)/log(2). What is d approximately?',
                accept: { keywords: ['16.6', '16.61', '17', 'about 17'], keywordThreshold: 0.3 },
                hints: [
                    'log(100,000) = 5, log(2) ≈ 0.3010.',
                    'd = 5/0.3010 ≈ 16.61. So about 17 days to reach $1000.'
                ],
                socraticFollow: 'The logarithm turned an impossible exponent problem into simple division. That\'s its power!',
                next: 'branch_check'
            },
            {
                id: 'branch_check',
                type: 'branch',
                phase: 'explore',
                conditions: [
                    { minScore: 0.7, target: 'q_challenge' },
                    { minScore: 0.0, target: 'scaffold_log' }
                ],
                next: 'q_challenge'
            },
            {
                id: 'scaffold_log',
                type: 'scaffold',
                phase: 'explore',
                title: 'Logs & Exponents Are Inverses',
                content: 'Exponential: **b^x = y** → "b raised to x gives y"\nLogarithm: **log_b(y) = x** → "what power of b gives y?"\n\nThey say the SAME thing, just rearranged:\n\n• 2³ = 8 ↔ log₂(8) = 3\n• 10² = 100 ↔ log₁₀(100) = 2\n• 5^? = 125 ↔ log₅(125) = 3\n\n**Change of base:** log_b(x) = log(x)/log(b)',
                next: 'q_practice'
            },
            {
                id: 'q_practice',
                type: 'question',
                phase: 'explore',
                dok: 1,
                prompt: 'Rewrite in logarithmic form: 3⁴ = 81.',
                accept: { keywords: ['log₃(81)', 'log_3(81)', 'log base 3 of 81', '= 4'], keywordThreshold: 0.3 },
                hints: [
                    '3 raised to WHAT power gives 81?',
                    'log₃(81) = 4. "The log base 3 of 81 is 4."'
                ],
                next: 'q_challenge'
            },
            {
                id: 'q_challenge',
                type: 'question',
                phase: 'connect',
                dok: 3,
                prompt: 'A bacteria population doubles every 3 hours, starting at 500. Write the formula AND find when the population reaches 32,000.',
                accept: { keywords: ['500', '2^(t/3)', '18 hours', '18', 'log', 't = 18'], keywordThreshold: 0.3 },
                hints: [
                    'Formula: P = 500 × 2^(t/3). We need 500 × 2^(t/3) = 32,000.',
                    '2^(t/3) = 64. Since 2⁶ = 64, t/3 = 6, so t = 18 hours.'
                ],
                socraticFollow: 'You used the fact that 64 = 2⁶ to avoid logarithms. When would you NEED logarithms?',
                next: 'celebrate_end'
            },
            {
                id: 'celebrate_end',
                type: 'celebrate',
                phase: 'connect',
                title: 'Exponential & Logarithm Expert!',
                content: 'You conquered **exponential functions** and their inverse, **logarithms**.\n\nKey insight: *Exponentials model anything that grows or decays by a constant percentage. Logarithms undo them — letting you solve for time, find rates, and decode exponential patterns. They\'re two sides of the same coin.*',
                next: null
            }
        ]
    }
};
