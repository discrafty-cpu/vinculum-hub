// ==================== STRUCTURED DIALOGUES & ERROR ANALYSIS DATA ====================
// Evidence-based from WWC Practice Guide for Improving Algebra Knowledge (Star et al., 2015)
// Three-phase dialogue structure, dual error analysis, cooperative structures, CRA alignment
// Topic-keyed to match TEACHING_INSIGHTS, DOK_PROBLEMS, and TOPIC_PATTERNS
// =====================================================================================

// ── THREE-PHASE DIALOGUE QUESTIONS ──
// Generic questions that apply to any solved problem, plus topic-specific overrides
const DIALOGUE_PHASES = {
    // Phase 1: Orientation (2-3 min) — students examine silently, teacher orients
    orientation: {
        generic: [
            'What is this problem asking us to do?',
            'What type of problem is this? Have we seen something like this before?',
            'What do you notice about the structure of this equation or expression?',
            'Before looking at the solution, what strategy would you try?'
        ]
    },
    // Phase 2: Analysis (5-8 min) — dig into solution steps
    analysis: {
        generic: [
            'What did the solver do first? Why is that a reasonable first step?',
            'Can you explain this step using precise mathematical language?',
            'Would the steps work in a different order? Why or why not?',
            'Could this problem have been solved with fewer steps?',
            'How can we verify the solution is correct?',
            'What mathematical property or rule justifies this step?'
        ]
    },
    // Phase 3: Connection (3-5 min) — generalize and transfer
    connection: {
        generic: [
            'What other problems could be solved with this same strategy?',
            'How does this connect to what we learned about [previous topic]?',
            'If I changed one element, how would the solution change?',
            'When would this strategy NOT be the best choice?',
            'Can you write a similar problem that uses the same method?'
        ]
    }
};

// ── ERROR TYPES TAXONOMY ──
const ERROR_TYPES = {
    strategic: {
        name: 'Strategic Error',
        description: 'Student chooses an incorrect approach or applies a valid strategy to an inappropriate problem type.',
        teacherTip: 'Focus discussion on WHEN to use each strategy, not just HOW.',
        color: [232, 67, 109] // pink
    },
    procedural: {
        name: 'Procedural Error',
        description: 'Student uses the correct strategy but makes a computational or procedural mistake during execution.',
        teacherTip: 'Ask students to identify the exact step where the error occurs.',
        color: [212, 135, 15] // amber
    },
    conceptual: {
        name: 'Conceptual Error',
        description: 'Student reveals a fundamental misunderstanding of a mathematical concept.',
        teacherTip: 'Use this to surface and address deep misconceptions. Connect to visual models.',
        color: [124, 58, 237] // purple
    },
    notation: {
        name: 'Notation Error',
        description: 'Student writes mathematically ambiguous or incorrect notation.',
        teacherTip: 'Emphasize that mathematical communication must be precise and unambiguous.',
        color: [59, 130, 246] // blue
    }
};

// ── GUIDING QUESTIONS FOR ERROR ANALYSIS ──
const ERROR_ANALYSIS_QUESTIONS = {
    generic: [
        'Which student\'s solution is correct? How do you know?',
        'At which step does the error first appear? What happened?',
        'Is this a strategic error or a procedural error?',
        'How could the student who made the error check their own work to catch it?',
        'What advice would you give to the student who made the error?',
        'Can you fix the error and complete the solution correctly?',
        'Have you ever made a similar error? What helped you understand it?'
    ],
    strategic: [
        'Why did this student choose this approach? What were they thinking?',
        'What strategy SHOULD they have used instead?',
        'How can you tell which strategy fits a problem before you start solving?'
    ],
    procedural: [
        'The strategy was correct — where exactly did the computation go wrong?',
        'What check could catch this type of arithmetic error?',
        'Is this the kind of error that happens when you rush, or a misunderstanding?'
    ],
    conceptual: [
        'What does this student believe that isn\'t true?',
        'Can you draw a picture or model that shows why this belief is wrong?',
        'What would need to be true for the student\'s approach to work?'
    ],
    notation: [
        'What does this notation actually mean mathematically?',
        'How should this be written so it communicates clearly?',
        'Could someone read this notation and get a different answer? Why?'
    ]
};

// ── COOPERATIVE LEARNING STRUCTURES ──
// WWC Example 2.10: structures that pair with dialogues and error analysis
const COOPERATIVE_STRUCTURES = {
    'think-write-pair-share': {
        name: 'Think-Write-Pair-Share',
        withDialogue: 'Students write analysis of solved problem, then compare insights with partner.',
        withError: 'Students individually decide which solution is correct, write reasoning, then compare.',
        bestFor: 'Building independent reasoning habits',
        timing: '8-12 minutes',
        groupSize: '2 (partners)'
    },
    'partner-coaching': {
        name: 'Partner Coaching',
        withDialogue: 'One student explains a step, partner asks clarifying questions. Switch roles per step.',
        withError: 'One student argues for Student A, one argues for Student B. They must resolve the disagreement.',
        bestFor: 'Deepening mathematical communication',
        timing: '10-15 minutes',
        groupSize: '2 (partners)'
    },
    'jigsaw': {
        name: 'Jigsaw',
        withDialogue: 'Each group gets a different solved problem using the same strategy. Groups teach each other.',
        withError: 'Each group gets a different error type on the same topic. Groups present their error to the class.',
        bestFor: 'Exploring multiple strategies or error types',
        timing: '15-20 minutes',
        groupSize: '4-5 (expert groups)'
    },
    'numbered-heads': {
        name: 'Numbered Heads Together',
        withDialogue: 'Teacher calls a number. That student explains the next step in the solved problem.',
        withError: 'Teacher calls a number. That student must identify the error and explain it to the class.',
        bestFor: 'Accountability and participation',
        timing: '8-12 minutes',
        groupSize: '4 (numbered 1-4)'
    },
    'directions-for-a-friend': {
        name: 'Directions for a Friend',
        withDialogue: 'Students write instructions for how to solve a similar problem based on the solved example.',
        withError: 'Students write a letter to the student who made the error explaining what went wrong and how to fix it.',
        bestFor: 'Mathematical writing and explanation',
        timing: '10-15 minutes',
        groupSize: 'Individual then share'
    }
};

// ── PRESENTATION FORMAT OPTIONS ──
// Four delivery formats from the document
const DIALOGUE_FORMATS = {
    'whole-class': {
        name: 'Whole-Class Display',
        howItWorks: 'Solved problem projected on screen. Teacher facilitates discussion with full class.',
        bestFor: 'New concepts, introducing a strategy',
        icon: 'screen',
        timing: '10-15 min'
    },
    'small-group': {
        name: 'Small-Group Cards',
        howItWorks: 'Solved problems on printed cards. Groups of 3-4 analyze and discuss, then report to class.',
        bestFor: 'Review, practice, building discourse skills',
        icon: 'group',
        timing: '12-18 min'
    },
    'think-write-pair-share': {
        name: 'Think-Write-Pair-Share',
        howItWorks: 'Students examine silently, write their analysis, share with partner, then class discusses.',
        bestFor: 'Building independent reasoning habits',
        icon: 'pencil',
        timing: '10-15 min'
    },
    'digital': {
        name: 'Digital / App-Based',
        howItWorks: 'Solved problems presented in the VINCULUM app with interactive annotations and embedded questions.',
        bestFor: 'Homework, independent practice, differentiation',
        icon: 'device',
        timing: 'Self-paced'
    }
};

// ── DIFFERENTIATION MODIFICATIONS ──
// How to modify structured dialogues and error analysis for different student groups
const DIALOGUE_DIFFERENTIATION = {
    struggling: {
        label: 'Struggling Learners',
        dialogueMod: 'Provide more concrete/visual solved problems. Use think-aloud first.',
        errorMod: 'Start with procedural errors only. Provide a hint about which solution is wrong.',
        scaffolds: ['Visual models alongside', 'Reduced number of steps', 'Think-aloud modeling first']
    },
    onLevel: {
        label: 'On-Level',
        dialogueMod: 'Standard three-phase dialogue with mixed abstract and representational problems.',
        errorMod: 'Include both strategic and procedural errors. No hints provided.',
        scaffolds: ['Full three-phase structure', 'Mixed representations']
    },
    advanced: {
        label: 'Advanced',
        dialogueMod: 'Challenge with non-routine problems. Ask students to generate alternative strategies.',
        errorMod: 'Include conceptual errors. Ask students to create their own error analysis problems.',
        scaffolds: ['Open-ended extension', 'Student-created problems', 'Proof and justification']
    },
    ell: {
        label: 'ELL Students',
        dialogueMod: 'Provide vocabulary scaffold. Use visual representations. Allow discussion in home language first.',
        errorMod: 'Label error types explicitly. Provide sentence frames for explaining the error.',
        scaffolds: ['Vocabulary pre-teach', 'Sentence frames', 'Visual representations', 'Home language discussion']
    },
    swd: {
        label: 'Students with Disabilities',
        dialogueMod: 'Follow IEP accommodations. Extended time. Reduce number of steps. Larger print.',
        errorMod: 'Highlight the error region. Provide graphic organizer for the correction process.',
        scaffolds: ['IEP accommodations', 'Extended time', 'Graphic organizer', 'Highlighted error region']
    }
};

// ── CRA ALIGNMENT MATRIX ──
// How dialogues and error analysis map to Concrete/Representational/Abstract
const CRA_DIALOGUE_ALIGNMENT = {
    concrete: {
        phase: 'Concrete',
        grades: '6-7',
        piagetStage: 'Concrete-Operational',
        dialogueApplication: 'Use physical manipulatives alongside the solved problem. Students verify steps with algebra tiles or balance models.',
        errorApplication: 'Provide concrete models of both solutions so students can physically check which one works.',
        visualTypes: ['base-10 blocks', 'fraction bars', 'algebra tiles', 'balance model']
    },
    representational: {
        phase: 'Representational',
        grades: '7-9',
        piagetStage: 'Transitional',
        dialogueApplication: 'Include diagrams, graphs, and visual models in solved problems. Use WWC recommendation for multiple representations.',
        errorApplication: 'Show errors that arise from misreading visual representations (e.g., wrong intercept from a graph).',
        visualTypes: ['number lines', 'area models', 'coordinate planes', 'tape diagrams']
    },
    abstract: {
        phase: 'Abstract',
        grades: '9-12',
        piagetStage: 'Formal-Operational',
        dialogueApplication: 'Full symbolic algebra analysis. Students work entirely with equations and expressions to discuss solution steps.',
        errorApplication: 'Purely symbolic error analysis: sign errors, distribution mistakes, algebraic manipulation errors.',
        visualTypes: ['equations only', 'step-by-step symbolic']
    }
};

// ── TOPIC-SPECIFIC DIALOGUE & ERROR DATA ──
// Solved problems + deliberate errors + phase-specific questions, keyed by topic
const STRUCTURED_DIALOGUE_TOPICS = {

    // ======================== GRADE 6 ========================

    'ratios and rates': {
        grade: 6, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'A recipe uses 3 cups of flour for every 2 cups of sugar. How much flour is needed for 8 cups of sugar?',
                correctSolution: {
                    student: 'Adriana',
                    steps: [
                        'Write the ratio: flour/sugar = 3/2',
                        'Set up proportion: 3/2 = x/8',
                        'Cross multiply: 2x = 24',
                        'Divide both sides by 2: x = 12',
                        '12 cups of flour'
                    ]
                },
                incorrectSolution: {
                    student: 'Marcus',
                    steps: [
                        'Write the ratio: flour/sugar = 3/2',
                        'Sugar goes from 2 to 8, that\'s +6',
                        'Add 6 to flour: 3 + 6 = 9',
                        '9 cups of flour'
                    ],
                    errorType: 'strategic',
                    errorStep: 2,
                    errorExplanation: 'Marcus added instead of multiplied. Ratios scale by multiplication, not addition. Sugar was multiplied by 4 (2 x 4 = 8), so flour should also be multiplied by 4 (3 x 4 = 12).'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What quantities are being compared?', 'Is this a multiplicative or additive relationship?'],
            analysis: ['Why did Adriana set up a proportion?', 'What does cross-multiplying actually mean here?'],
            connection: ['What if the recipe called for 5 cups of sugar instead?', 'Where do you see ratios outside of math class?']
        }
    },

    'multiplication and division of fractions': {
        grade: 6, craLevel: 'concrete',
        solvedProblems: [
            {
                problem: 'Calculate: 2/3 x 4/5',
                correctSolution: {
                    student: 'Sofia',
                    steps: [
                        'Multiply numerators: 2 x 4 = 8',
                        'Multiply denominators: 3 x 5 = 15',
                        'Result: 8/15',
                        'Check: 8/15 is less than both 2/3 and 4/5 (multiplying proper fractions gives a smaller result)'
                    ]
                },
                incorrectSolution: {
                    student: 'David',
                    steps: [
                        'Find common denominator: 15',
                        'Convert: 10/15 x 12/15',
                        'Multiply numerators: 10 x 12 = 120',
                        'Keep denominator: 120/15 = 8',
                        'Answer: 8'
                    ],
                    errorType: 'strategic',
                    errorStep: 1,
                    errorExplanation: 'David confused multiplication with addition. You need common denominators for addition, NOT multiplication. For multiplication, you simply multiply across: numerator x numerator, denominator x denominator.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['Do we need common denominators here? Why or why not?'],
            analysis: ['Why does multiplying two proper fractions give a smaller number?', 'How could you use an area model to verify 2/3 x 4/5 = 8/15?'],
            connection: ['How is fraction multiplication different from fraction addition?', 'When would you multiply fractions in real life?']
        }
    },

    'percent': {
        grade: 6, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'A jacket costs $80. It is on sale for 25% off. What is the sale price?',
                correctSolution: {
                    student: 'Kenji',
                    steps: [
                        'Find 25% of $80: 0.25 x 80 = $20',
                        'Subtract discount from original: $80 - $20 = $60',
                        'Sale price: $60'
                    ]
                },
                incorrectSolution: {
                    student: 'Priya',
                    steps: [
                        'Move decimal for 25%: 0.025',
                        '0.025 x 80 = $2',
                        '$80 - $2 = $78',
                        'Sale price: $78'
                    ],
                    errorType: 'procedural',
                    errorStep: 1,
                    errorExplanation: 'Priya moved the decimal point three places instead of two when converting 25% to a decimal. 25% = 25/100 = 0.25, not 0.025.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does "25% off" mean in everyday language?'],
            analysis: ['How do you convert a percent to a decimal? What\'s the rule?', 'Is there a way to find the sale price in one step instead of two?'],
            connection: ['What if the discount were 30%?', 'How would you calculate the price if there were also 8% sales tax?']
        }
    },

    'variables and representations': {
        grade: 6, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Write an expression for: "5 more than 3 times a number n"',
                correctSolution: {
                    student: 'Aiden',
                    steps: [
                        '"3 times a number n" means 3n',
                        '"5 more than" means + 5',
                        'Expression: 3n + 5'
                    ]
                },
                incorrectSolution: {
                    student: 'Luna',
                    steps: [
                        '"5 more than" means 5 first',
                        '"3 times a number" means x 3n',
                        'Expression: 5 x 3n = 15n'
                    ],
                    errorType: 'conceptual',
                    errorStep: 1,
                    errorExplanation: 'Luna interpreted "more than" as multiplication instead of addition. "More than" in math means addition. Also, she applied the operations in the wrong order — "5 more than [something]" means [something] + 5.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What are the key math words in this phrase?'],
            analysis: ['How do you decide the order of operations from words?', 'What does "more than" always mean in math?'],
            connection: ['What expression would "3 more than 5 times n" give?', 'How would you check your expression by substituting a number?']
        }
    },

    'represent and solve equations': {
        grade: 6, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Solve: x + 7 = 15',
                correctSolution: {
                    student: 'Mia',
                    steps: [
                        'Goal: isolate x',
                        'Subtract 7 from both sides: x + 7 - 7 = 15 - 7',
                        'x = 8',
                        'Check: 8 + 7 = 15 ✓'
                    ]
                },
                incorrectSolution: {
                    student: 'Jaylen',
                    steps: [
                        'x + 7 = 15',
                        'Add 7 to both sides: x + 14 = 22',
                        'x = 22 - 14 = 8'
                    ],
                    errorType: 'strategic',
                    errorStep: 2,
                    errorExplanation: 'Jaylen added 7 instead of subtracting. To undo addition, you use the inverse operation: subtraction. He got the right answer by accident through extra steps, but the method is inefficient and won\'t always work.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What operation connects x and 7?', 'What\'s the inverse of addition?'],
            analysis: ['Why do we do the same thing to both sides?', 'How does checking your answer prove it\'s correct?'],
            connection: ['How would you solve x - 7 = 15?', 'What about 2x = 14?']
        }
    },

    'properties and equivalent expressions': {
        grade: 6, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Simplify: 3(x + 4) + 2x',
                correctSolution: {
                    student: 'Zara',
                    steps: [
                        'Distribute: 3(x) + 3(4) + 2x',
                        '= 3x + 12 + 2x',
                        'Combine like terms: (3x + 2x) + 12',
                        '= 5x + 12'
                    ]
                },
                incorrectSolution: {
                    student: 'Tyler',
                    steps: [
                        'Distribute: 3(x + 4) = 3x + 4',
                        '3x + 4 + 2x',
                        'Combine: 5x + 4'
                    ],
                    errorType: 'procedural',
                    errorStep: 1,
                    errorExplanation: 'Tyler only distributed the 3 to x but forgot to distribute to the 4. The distributive property means 3(x + 4) = 3·x + 3·4 = 3x + 12, not 3x + 4.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What property do we need to use first?'],
            analysis: ['What does "distribute" actually mean?', 'How can you check if two expressions are equivalent?'],
            connection: ['What if it were 3(x - 4)?', 'Can you think of a real-world situation modeled by 3(x + 4)?']
        }
    },

    // ======================== GRADE 7 ========================

    'rational numbers': {
        grade: 7, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Calculate: -3 + (-5)',
                correctSolution: {
                    student: 'Elena',
                    steps: [
                        'Both numbers are negative',
                        'Add the absolute values: 3 + 5 = 8',
                        'Keep the negative sign: -8',
                        'On a number line: start at -3, move 5 units left to -8'
                    ]
                },
                incorrectSolution: {
                    student: 'Ryan',
                    steps: [
                        '-3 + (-5)',
                        'Two negatives make a positive',
                        '-3 + 5 = 2',
                        'Answer: 2'
                    ],
                    errorType: 'conceptual',
                    errorStep: 2,
                    errorExplanation: '"Two negatives make a positive" only applies to multiplication, not addition. When adding two negatives, you go further negative. Think of it as owing $3 and then owing $5 more — you owe $8 total.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['Are we adding or multiplying? Why does that matter for the sign rule?'],
            analysis: ['When DO two negatives make a positive?', 'How does the number line show what happens?'],
            connection: ['What about -3 - (-5)?', 'Can you think of a money situation that shows -3 + (-5)?']
        }
    },

    'proportional relationships': {
        grade: 7, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Is this relationship proportional? (2, 6), (3, 9), (5, 16)',
                correctSolution: {
                    student: 'Omar',
                    steps: [
                        'Check each ratio y/x:',
                        '6/2 = 3',
                        '9/3 = 3',
                        '16/5 = 3.2',
                        'The ratios are NOT all equal, so NOT proportional'
                    ]
                },
                incorrectSolution: {
                    student: 'Jade',
                    steps: [
                        'Check if y increases as x increases:',
                        '2→6 (increases), 3→9 (increases), 5→16 (increases)',
                        'y always increases when x increases',
                        'Therefore it IS proportional'
                    ],
                    errorType: 'conceptual',
                    errorStep: 1,
                    errorExplanation: 'Jade confused "increasing together" with "proportional." Proportional means the RATIO y/x is constant, not just that both values increase. Many non-proportional relationships also increase together.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does "proportional" actually mean?', 'What test can we apply?'],
            analysis: ['Why isn\'t "both increase" enough to prove proportionality?', 'What would the third point need to be for this to be proportional?'],
            connection: ['Can you give an example of a relationship that increases together but ISN\'T proportional?']
        }
    },

    'equations and inequalities': {
        grade: 7, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Solve: 2x - 3 > 7',
                correctSolution: {
                    student: 'Noah',
                    steps: [
                        'Add 3 to both sides: 2x > 10',
                        'Divide both sides by 2: x > 5',
                        'Solution: all numbers greater than 5'
                    ]
                },
                incorrectSolution: {
                    student: 'Ava',
                    steps: [
                        'Add 3 to both sides: 2x > 10',
                        'Divide both sides by 2: x > 5',
                        'But dividing flips the inequality: x < 5'
                    ],
                    errorType: 'conceptual',
                    errorStep: 3,
                    errorExplanation: 'Ava remembered that dividing flips the inequality sign, but that rule ONLY applies when dividing by a NEGATIVE number. She divided by positive 2, so the sign stays the same. x > 5 is correct.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['How is solving an inequality different from solving an equation?'],
            analysis: ['WHEN exactly does the inequality sign flip?', 'How would you graph x > 5 on a number line?'],
            connection: ['What if the problem were -2x - 3 > 7? When would the sign flip?']
        }
    },

    'numerical and algebraic expressions': {
        grade: 7, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Simplify: 4(2x - 3) - (x + 5)',
                correctSolution: {
                    student: 'Liam',
                    steps: [
                        'Distribute 4: 8x - 12',
                        'Distribute the negative: -x - 5',
                        'Combine: 8x - 12 - x - 5',
                        'Combine like terms: 7x - 17'
                    ]
                },
                incorrectSolution: {
                    student: 'Chloe',
                    steps: [
                        'Distribute 4: 8x - 12',
                        'Distribute negative: -x + 5',
                        'Combine: 8x - 12 - x + 5',
                        '= 7x - 7'
                    ],
                    errorType: 'procedural',
                    errorStep: 2,
                    errorExplanation: 'Chloe distributed the negative sign to x correctly (-x) but not to 5. -(x + 5) means -1·x + (-1)·5 = -x - 5, not -x + 5. The negative applies to EVERY term inside the parentheses.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['How many distributions do we need to perform?'],
            analysis: ['What does the subtraction sign in front of (x+5) really mean?', 'How can you check your simplified expression is equivalent to the original?'],
            connection: ['What if it were + (x+5) instead of - (x+5)?']
        }
    },

    // ======================== GRADE 8 ========================

    'linear and nonlinear functions': {
        grade: 8, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Is y = x² + 1 a linear function? Explain.',
                correctSolution: {
                    student: 'Kai',
                    steps: [
                        'Make a table: x=0→y=1, x=1→y=2, x=2→y=5, x=3→y=10',
                        'Check rate of change: 1→2 (+1), 2→5 (+3), 5→10 (+5)',
                        'Rate of change is NOT constant',
                        'Therefore NOT linear (it\'s quadratic because of x²)'
                    ]
                },
                incorrectSolution: {
                    student: 'Maya',
                    steps: [
                        'y = x² + 1 has a + 1, which is a y-intercept',
                        'Having a y-intercept means it\'s in y = mx + b form',
                        'Therefore it IS linear with b = 1'
                    ],
                    errorType: 'conceptual',
                    errorStep: 2,
                    errorExplanation: 'Maya focused on the +1 looking like a y-intercept, but ignored the x² term. For a function to be linear, the variable must have an exponent of 1 (just x, not x²). The x² makes this quadratic — its graph is a parabola, not a straight line.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What makes a function "linear"?', 'What do you notice about the exponent on x?'],
            analysis: ['Why is constant rate of change the key test?', 'What does the graph of y = x² + 1 look like?'],
            connection: ['How would you change this to make it linear?', 'Can a function have a y-intercept and NOT be linear?']
        }
    },

    'representations of linear equations': {
        grade: 8, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Write the equation of the line through (2, 5) with slope 3.',
                correctSolution: {
                    student: 'Destiny',
                    steps: [
                        'Use point-slope form: y - y₁ = m(x - x₁)',
                        'Substitute: y - 5 = 3(x - 2)',
                        'Distribute: y - 5 = 3x - 6',
                        'Add 5: y = 3x - 1'
                    ]
                },
                incorrectSolution: {
                    student: 'Marcus',
                    steps: [
                        'Use y = mx + b',
                        'Plug in slope: y = 3x + b',
                        'Plug in point: 5 = 3(2) + b → 5 = 6 + b → b = -1',
                        'y = 3x + (-1) → y = 3x - 1'
                    ],
                    errorType: null,
                    errorStep: null,
                    errorExplanation: 'Actually, both solutions are correct! This is a STRATEGY COMPARISON — two different valid approaches to the same problem. Discuss: When is each method more efficient?'
                },
                isStrategyComparison: true
            }
        ],
        phaseQuestions: {
            orientation: ['What information do we have? What are we looking for?'],
            analysis: ['Both methods work — which is more efficient here?', 'When would point-slope form be faster? When would slope-intercept be faster?'],
            connection: ['What if you had two points instead of a point and slope?']
        }
    },

    'solve equations inequalities and systems': {
        grade: 8, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Solve the system: y = 2x + 1 and y = -x + 7',
                correctSolution: {
                    student: 'Asha',
                    steps: [
                        'Since both equal y, set them equal: 2x + 1 = -x + 7',
                        'Add x to both sides: 3x + 1 = 7',
                        'Subtract 1: 3x = 6',
                        'Divide by 3: x = 2',
                        'Substitute back: y = 2(2) + 1 = 5',
                        'Solution: (2, 5)'
                    ]
                },
                incorrectSolution: {
                    student: 'Carlos',
                    steps: [
                        'Set equal: 2x + 1 = -x + 7',
                        'Subtract x: x + 1 = 7',
                        'Subtract 1: x = 6',
                        'Substitute: y = 2(6) + 1 = 13',
                        'Solution: (6, 13)'
                    ],
                    errorType: 'procedural',
                    errorStep: 2,
                    errorExplanation: 'Carlos subtracted x from 2x (getting x) instead of adding x to both sides. When you add x to both sides of 2x + 1 = -x + 7, you get 3x + 1 = 7, not x + 1 = 7. He could catch this by checking: does (6, 13) satisfy BOTH equations?'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does "solving a system" mean?', 'Why can we set these equal to each other?'],
            analysis: ['What operation undoes the -x?', 'How do you verify the solution works in BOTH equations?'],
            connection: ['What if the equations were y = 2x + 1 and 3x + y = 11? How would you approach it?']
        }
    },

    'pythagorean theorem': {
        grade: 8, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'A right triangle has legs of length 5 and 12. Find the hypotenuse.',
                correctSolution: {
                    student: 'Wei',
                    steps: [
                        'Use Pythagorean theorem: a² + b² = c²',
                        '5² + 12² = c²',
                        '25 + 144 = c²',
                        '169 = c²',
                        'c = √169 = 13'
                    ]
                },
                incorrectSolution: {
                    student: 'Jordan',
                    steps: [
                        'Use Pythagorean theorem: a² + b² = c²',
                        '5² + 12² = c²',
                        '25 + 144 = c²',
                        '169 = c²',
                        'c = 169/2 = 84.5'
                    ],
                    errorType: 'conceptual',
                    errorStep: 5,
                    errorExplanation: 'Jordan divided by 2 instead of taking the square root. c² = 169 means c = √169, not 169 ÷ 2. The inverse of squaring is square rooting, not halving.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['Which side is the hypotenuse? How do you know?'],
            analysis: ['What is the inverse operation of squaring?', 'Why can\'t the hypotenuse be 84.5 — does that even make sense given the triangle?'],
            connection: ['What if 13 were the hypotenuse and 5 were a leg? How would you find the other leg?']
        }
    },

    'slope parallel and perpendicular lines': {
        grade: 8, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Line A has slope 2/3. What is the slope of a line perpendicular to Line A?',
                correctSolution: {
                    student: 'Amara',
                    steps: [
                        'Perpendicular slopes are negative reciprocals',
                        'Flip the fraction: 2/3 → 3/2',
                        'Change the sign: 3/2 → -3/2',
                        'Perpendicular slope: -3/2'
                    ]
                },
                incorrectSolution: {
                    student: 'Blake',
                    steps: [
                        'Perpendicular means opposite slope',
                        'Opposite of 2/3 is -2/3',
                        'Perpendicular slope: -2/3'
                    ],
                    errorType: 'conceptual',
                    errorStep: 1,
                    errorExplanation: 'Blake only negated the slope (making it -2/3) but forgot to also take the reciprocal. Perpendicular slopes must be NEGATIVE RECIPROCALS — you need both: flip AND negate. -2/3 would be the slope of a line parallel to the opposite direction, not perpendicular.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does perpendicular mean visually?'],
            analysis: ['What\'s the difference between "opposite" and "negative reciprocal"?', 'If you multiply perpendicular slopes, what do you always get?'],
            connection: ['What slope would be parallel to Line A?', 'What about perpendicular to a vertical line?']
        }
    },

    'integer exponents and scientific notation': {
        grade: 8, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Simplify: (2³)²',
                correctSolution: {
                    student: 'Nadia',
                    steps: [
                        'Power of a power: multiply exponents',
                        '(2³)² = 2^(3×2) = 2⁶',
                        '2⁶ = 64'
                    ]
                },
                incorrectSolution: {
                    student: 'Ethan',
                    steps: [
                        'Power of a power: add exponents',
                        '(2³)² = 2^(3+2) = 2⁵',
                        '2⁵ = 32'
                    ],
                    errorType: 'procedural',
                    errorStep: 1,
                    errorExplanation: 'Ethan added the exponents instead of multiplying them. When you have a power raised to a power, you MULTIPLY exponents. You ADD exponents when multiplying same bases: 2³ · 2² = 2⁵. The operations look similar but follow different rules.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does (2³)² mean if you expand it out?'],
            analysis: ['When do you ADD exponents vs MULTIPLY exponents?', 'Can you verify by expanding: (2³)² = (2³)(2³) = ?'],
            connection: ['What about (2³)⁰?', 'How does this rule connect to scientific notation?']
        }
    },

    'scatterplots and lines of best fit': {
        grade: 8, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'A scatterplot shows study hours vs test scores. The line of best fit is y = 8x + 45. Predict the score for 6 hours of studying.',
                correctSolution: {
                    student: 'Iris',
                    steps: [
                        'Substitute x = 6 into y = 8x + 45',
                        'y = 8(6) + 45',
                        'y = 48 + 45',
                        'y = 93',
                        'Predicted score: 93'
                    ]
                },
                incorrectSolution: {
                    student: 'Leo',
                    steps: [
                        'The slope is 8, meaning 8 points per hour',
                        '6 hours × 8 points = 48',
                        'Predicted score: 48'
                    ],
                    errorType: 'strategic',
                    errorStep: 2,
                    errorExplanation: 'Leo correctly identified the slope but forgot the y-intercept (45). The equation y = 8x + 45 means you start at 45 points (baseline) and add 8 per hour. Without the y-intercept, the prediction ignores the baseline score students get even without studying.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does each part of y = 8x + 45 represent in context?'],
            analysis: ['What does the 45 mean in real life?', 'Is this prediction reliable? How far outside our data are we going?'],
            connection: ['What if someone studied 0 hours?', 'Can this model predict 100+ on a test? Is that a problem?']
        }
    },

    // ── Additional common topics with generic dialogue support ──

    'locate and compare numbers': {
        grade: 6, craLevel: 'concrete',
        solvedProblems: [
            {
                problem: 'Order from least to greatest: 3/4, 0.6, 70%',
                correctSolution: {
                    student: 'Anna',
                    steps: [
                        'Convert all to decimals:',
                        '3/4 = 0.75',
                        '0.6 = 0.6',
                        '70% = 0.70',
                        'Order: 0.6, 0.70, 0.75',
                        'Answer: 0.6, 70%, 3/4'
                    ]
                },
                incorrectSolution: {
                    student: 'Ben',
                    steps: [
                        'Compare the numbers as they are:',
                        '3/4 — the fraction is less than 1',
                        '0.6 — decimal less than 1',
                        '70% — seventy is the biggest number I see',
                        'Order: 0.6, 3/4, 70%'
                    ],
                    errorType: 'strategic',
                    errorStep: 1,
                    errorExplanation: 'Ben compared the numbers without converting to the same form. You can\'t compare a fraction, decimal, and percent directly — convert them all to the same representation first. 70% = 0.70, which is actually between 0.6 and 0.75.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['These numbers look different. How can we compare them fairly?'],
            analysis: ['Why is converting to the same form essential?', 'Could you convert to fractions instead of decimals?'],
            connection: ['Where do you encounter mixed representations in real life (prices, grades, statistics)?']
        }
    },

    'problem solving with rational numbers': {
        grade: 7, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'A diver is at -15 feet. She descends 8 more feet then ascends 20 feet. What is her position?',
                correctSolution: {
                    student: 'Rosa',
                    steps: [
                        'Start: -15',
                        'Descend 8 more: -15 + (-8) = -23',
                        'Ascend 20: -23 + 20 = -3',
                        'Position: -3 feet (3 feet below surface)'
                    ]
                },
                incorrectSolution: {
                    student: 'Kai',
                    steps: [
                        'Start: -15',
                        'Descend 8: -15 - 8 = -23',
                        'Ascend 20: -23 - 20 = -43',
                        'Position: -43 feet'
                    ],
                    errorType: 'conceptual',
                    errorStep: 3,
                    errorExplanation: 'Kai subtracted for ascending. "Ascending" means going UP, which is adding a positive number. -23 + 20 = -3, not -23 - 20 = -43. Context clue: ascending 20 from -23 should bring you closer to the surface, not deeper.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What does negative mean in this context?', 'What direction is "ascending"?'],
            analysis: ['How does context help you choose the right operation?', 'Does -43 make sense for the diver who went up 20 feet?'],
            connection: ['Can you draw a vertical number line showing the diver\'s journey?']
        }
    },

    'algebraic expressions': {
        grade: 8, craLevel: 'abstract',
        solvedProblems: [
            {
                problem: 'Simplify: (3x²)(2x³)',
                correctSolution: {
                    student: 'Sam',
                    steps: [
                        'Multiply coefficients: 3 × 2 = 6',
                        'Add exponents (same base): x² · x³ = x^(2+3) = x⁵',
                        'Result: 6x⁵'
                    ]
                },
                incorrectSolution: {
                    student: 'Tia',
                    steps: [
                        'Multiply coefficients: 3 × 2 = 6',
                        'Multiply exponents: x^(2×3) = x⁶',
                        'Result: 6x⁶'
                    ],
                    errorType: 'procedural',
                    errorStep: 2,
                    errorExplanation: 'Tia multiplied the exponents instead of adding them. When multiplying same bases, you ADD exponents: x² · x³ = x^(2+3) = x⁵. You MULTIPLY exponents only for power of a power: (x²)³ = x⁶.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['Are we multiplying or raising to a power? Which exponent rule applies?'],
            analysis: ['Can you verify by expanding? x²·x³ = (x·x)(x·x·x) = ?'],
            connection: ['How is this different from (3x²)³?']
        }
    },

    'sequences and linear functions': {
        grade: 8, craLevel: 'representational',
        solvedProblems: [
            {
                problem: 'Find the 50th term of the sequence: 3, 7, 11, 15, ...',
                correctSolution: {
                    student: 'Mika',
                    steps: [
                        'Common difference: 7 - 3 = 4',
                        'Formula: aₙ = a₁ + d(n-1)',
                        'a₅₀ = 3 + 4(50-1)',
                        'a₅₀ = 3 + 4(49) = 3 + 196 = 199'
                    ]
                },
                incorrectSolution: {
                    student: 'Dani',
                    steps: [
                        'Common difference: 4',
                        'Multiply: 4 × 50 = 200',
                        'Add start: 200 + 3 = 203'
                    ],
                    errorType: 'procedural',
                    errorStep: 2,
                    errorExplanation: 'Dani multiplied by 50 instead of 49. The first term already "uses up" position 1, so you only add the common difference 49 times to reach the 50th term. Think of it this way: the 2nd term needs 1 jump, the 3rd needs 2 jumps, so the 50th needs 49 jumps.'
                }
            }
        ],
        phaseQuestions: {
            orientation: ['What stays the same between consecutive terms?'],
            analysis: ['Why is it (n-1) and not just n in the formula?', 'How could you check without calculating all 50 terms?'],
            connection: ['How does this connect to slope in y = mx + b?']
        }
    }
};

// ── ASSESSMENT FORMATS (from Section 6.4) ──
const DIALOGUE_ASSESSMENT_FORMATS = [
    { name: 'Error Identification', description: 'Present an incorrect solution and ask students to identify, explain, and correct the error.' },
    { name: 'Strategy Comparison', description: 'Present two correct solutions using different strategies. Students explain advantages of each.' },
    { name: 'Student-Created Error Analysis', description: 'Students design their own dual error analysis problems — requires deep understanding of both the procedure and common misconceptions.' },
    { name: 'Dialogue Journal', description: 'Students write their responses to structured dialogue questions, creating a record of mathematical reasoning over time.' }
];
