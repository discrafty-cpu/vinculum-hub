// ==================== LESSON COMPONENTS DATA ====================
// Prerequisite skills (grades 3-5 foundations), success criteria patterns,
// relevance connections (career + real-life + progression), and focus skill scaffolds
// Used by The Lesson Digester to auto-generate Focus Skill slides,
// Success Criteria, and Relevance slides for grades 6-8 lessons.
// ================================================================

// ── PREREQUISITE SKILLS ──
// Maps grade 6-8 topics to the lower-grade foundations students need.
// Each prerequisite has: skill description, grade level, and a scaffold hint
// for the Focus Skill opening slide.
const PREREQUISITE_SKILLS = {

    // ════════ GRADE 6 TOPICS ════════
    'locate and compare numbers': {
        prerequisites: [
            { skill: 'Place whole numbers on a number line', grade: 3, scaffold: 'Draw a number line from 0 to 10. Place 3 and 7. Which is greater?' },
            { skill: 'Compare fractions with same denominator', grade: 3, scaffold: 'Which is more: 2/4 or 3/4? How do you know?' },
            { skill: 'Compare fractions using benchmarks (0, 1/2, 1)', grade: 4, scaffold: 'Is 3/8 closer to 0 or to 1/2? Is 5/6 closer to 1/2 or to 1?' },
            { skill: 'Compare decimals to hundredths', grade: 5, scaffold: 'Which is greater: 0.45 or 0.5? Use place value to explain.' }
        ],
        focusProblems: [
            'Place 1/2, 0.75, and 3/4 on the number line below. Which two are equivalent?',
            'Order from least to greatest: 0.6, 2/3, 0.625. Explain your reasoning.'
        ]
    },
    'equivalence and representations': {
        prerequisites: [
            { skill: 'Understand fractions as parts of a whole', grade: 3, scaffold: 'Shade 3/4 of this rectangle. How many parts out of how many?' },
            { skill: 'Find equivalent fractions using models', grade: 4, scaffold: '2/4 = ?/8. Use fraction bars to show why.' },
            { skill: 'Read and write decimals to hundredths', grade: 4, scaffold: 'Write 0.25 as a fraction. What does the 25 mean?' },
            { skill: 'Convert simple fractions to decimals', grade: 5, scaffold: '1/4 = 0.___. Divide 1 by 4 to check.' }
        ],
        focusProblems: [
            'Write 3/5 as a decimal and as a percent.',
            'Which is greater: 60% or 3/4? Show two ways to compare them.'
        ]
    },
    'factors primes gcf lcm': {
        prerequisites: [
            { skill: 'Know multiplication facts to 12 × 12', grade: 3, scaffold: 'List all the ways to make 24 using multiplication: 1 × 24, 2 × __, ...' },
            { skill: 'Understand factors as pairs', grade: 4, scaffold: 'Find all factor pairs of 36. How do you know you found them all?' },
            { skill: 'Identify prime vs composite numbers', grade: 5, scaffold: 'Circle the prime numbers: 7, 12, 13, 15, 19, 21. How can you tell?' }
        ],
        focusProblems: [
            'Find the GCF of 24 and 36. Use a list of factors.',
            'Find the LCM of 6 and 8. When would you need the LCM?'
        ]
    },
    'ratios and rates': {
        prerequisites: [
            { skill: 'Understand equal groups / multiplication', grade: 3, scaffold: 'If there are 3 red marbles for every 5 blue marbles, how many red if there are 10 blue?' },
            { skill: 'Identify and extend patterns', grade: 4, scaffold: 'Complete the pattern: 2, 4, 6, __, __, __. What rule are you using?' },
            { skill: 'Multiply and divide whole numbers fluently', grade: 5, scaffold: 'If 4 notebooks cost $12, how much does 1 cost? How much do 7 cost?' }
        ],
        focusProblems: [
            'A recipe uses 2 cups of flour for every 3 cups of sugar. Fill in the table for 4, 6, and 8 cups of flour.',
            'Who is the better deal: Store A sells 5 apples for $3, Store B sells 8 apples for $5?'
        ]
    },
    'multiplication and division of fractions': {
        prerequisites: [
            { skill: 'Understand fractions as parts of a whole', grade: 3, scaffold: 'Draw a rectangle. Shade 1/2. Now shade 1/3 of what you shaded. What fraction is that?' },
            { skill: 'Multiply a whole number by a fraction', grade: 4, scaffold: '3 × 1/4 = ? Think: what is 1/4 three times?' },
            { skill: 'Multiply fractions by fractions using area models', grade: 5, scaffold: 'Use the area model to find 2/3 × 3/4. Shade the overlap.' }
        ],
        focusProblems: [
            'Find 2/3 × 4/5 using an area model. Shade your answer.',
            'A recipe needs 3/4 cup of oil. You want to make 2/3 of the recipe. How much oil?'
        ]
    },
    'percent': {
        prerequisites: [
            { skill: 'Understand fractions as parts of 100', grade: 4, scaffold: '50 out of 100 = 50%. Shade 50% of a 10×10 grid.' },
            { skill: 'Convert fractions to decimals', grade: 5, scaffold: '1/4 = 0.25 = 25%. Use division to convert 3/5 to a percent.' }
        ],
        focusProblems: [
            'What is 25% of 80? Use a percent bar to show your work.',
            'A shirt costs $40 and is 15% off. What is the sale price?'
        ]
    },
    'variables and representations': {
        prerequisites: [
            { skill: 'Find missing numbers in equations', grade: 3, scaffold: '__ + 7 = 15. What number goes in the blank?' },
            { skill: 'Use letters for unknown values', grade: 4, scaffold: 'If n + 5 = 12, what is n? How did you find it?' },
            { skill: 'Write and evaluate simple expressions', grade: 5, scaffold: 'If x = 4, what is 3x + 2? Show each step.' }
        ],
        focusProblems: [
            'Write an expression for: "5 more than a number doubled." Evaluate when the number is 3.',
            'Match each expression to its word phrase: 2n, n + 2, n/2, n − 2.'
        ]
    },
    'represent and solve equations': {
        prerequisites: [
            { skill: 'Understand equality and the equal sign', grade: 3, scaffold: 'Is 4 + 5 = 3 + 6 true or false? How do you know?' },
            { skill: 'Solve one-step equations with whole numbers', grade: 4, scaffold: 'Solve: x + 8 = 15. Check your answer.' },
            { skill: 'Use inverse operations to isolate variables', grade: 5, scaffold: 'To solve 3x = 18, divide both sides by ___.' }
        ],
        focusProblems: [
            'Solve: 2x + 5 = 17. Show each step and check.',
            'Write and solve an equation: "A number tripled, then reduced by 4, equals 20."'
        ]
    },
    'properties and equivalent expressions': {
        prerequisites: [
            { skill: 'Understand commutative and associative properties', grade: 3, scaffold: '3 + 7 = 7 + 3. Does this always work? Try it with multiplication.' },
            { skill: 'Apply distributive property with whole numbers', grade: 4, scaffold: '4 × 23 = 4 × 20 + 4 × 3. Calculate both sides.' },
            { skill: 'Simplify expressions by combining like terms', grade: 5, scaffold: '3a + 2a = ?a. If a = 5, check your answer.' }
        ],
        focusProblems: [
            'Use the distributive property to write 3(x + 4) without parentheses.',
            'Are 2(3x + 1) and 6x + 2 equivalent? Prove it by substituting x = 5.'
        ]
    },
    'measurement of polygons and prisms': {
        prerequisites: [
            { skill: 'Find area of rectangles by counting squares', grade: 3, scaffold: 'Count the square units. What is the area? Can you find it faster?' },
            { skill: 'Find area using length × width', grade: 4, scaffold: 'A rectangle is 6 cm by 4 cm. Area = ___ sq cm.' },
            { skill: 'Find volume by counting cubes / using formula', grade: 5, scaffold: 'A box is 3 × 4 × 2. How many cubes fit inside?' }
        ],
        focusProblems: [
            'Find the area of a triangle with base 8 cm and height 5 cm.',
            'A rectangular prism is 4 in × 3 in × 6 in. Find the volume and surface area.'
        ]
    },

    // ════════ GRADE 7 TOPICS ════════
    'rational numbers': {
        prerequisites: [
            { skill: 'Understand negative numbers on a number line', grade: 5, scaffold: 'Place −3 and 3 on the number line. How far are they from 0?' },
            { skill: 'Add and subtract positive fractions and decimals', grade: 5, scaffold: '3/4 + 1/2 = ? Find a common denominator first.' },
            { skill: 'Compare and order fractions, decimals, percents', grade: 6, scaffold: 'Order: −0.5, 1/3, −3/4, 0.8. Which is least? Greatest?' }
        ],
        focusProblems: [
            'Plot these on a number line: −2.5, 1/3, −3/4, 1.75. Order from least to greatest.',
            'Find: −3/4 + 5/8. Show your work on a number line.'
        ]
    },
    'representing and comparing rational numbers': {
        prerequisites: [
            { skill: 'Compare decimals using place value', grade: 5, scaffold: 'Which is greater: −0.45 or −0.5? Think about the number line.' },
            { skill: 'Locate positive rational numbers on a number line', grade: 6, scaffold: 'Place 3/4 on the number line. Now place −3/4. What do you notice?' }
        ],
        focusProblems: [
            'Order from least to greatest: −2/3, −0.5, 0.25, −3/4.',
            'The temperature was −4°F at 6 AM and 12°F at noon. How much did it rise?'
        ]
    },
    'applying rational numbers': {
        prerequisites: [
            { skill: 'Add and subtract integers using a number line', grade: 6, scaffold: 'Start at 3. Go left 7. Where are you? Write the equation.' },
            { skill: 'Multiply and divide whole numbers', grade: 5, scaffold: 'If −2 × 3 = −6, what is −2 × −3? Use the pattern.' }
        ],
        focusProblems: [
            'Evaluate: −3 × (−4) + 5 ÷ (−1). Show order of operations.',
            'A diver is at −40 feet. They rise 15 feet, then descend 8 feet. What depth?'
        ]
    },
    'proportional relationships': {
        prerequisites: [
            { skill: 'Find equivalent ratios', grade: 6, scaffold: '2:3 = 4:? = 6:? Complete the ratio table.' },
            { skill: 'Understand unit rates', grade: 6, scaffold: 'If 5 bananas cost $2.50, what is the cost per banana?' },
            { skill: 'Plot ordered pairs on a coordinate plane', grade: 5, scaffold: 'Plot (2, 6) and (4, 12). Draw a line through them.' }
        ],
        focusProblems: [
            'Does this table show a proportional relationship? How do you know?\n  x: 2, 4, 6, 8\n  y: 5, 10, 15, 20',
            'Write the equation for the proportional relationship above. What is the constant of proportionality?'
        ]
    },
    'represent proportional relationships': {
        prerequisites: [
            { skill: 'Plot ordered pairs on a coordinate plane', grade: 5, scaffold: 'Plot (1, 3), (2, 6), (3, 9). Do they form a line through the origin?' },
            { skill: 'Write ratios as fractions', grade: 6, scaffold: 'The ratio of boys to girls is 3:5. Write as a fraction.' }
        ],
        focusProblems: [
            'Graph the relationship y = 3x. Does the line pass through the origin?',
            'A car travels 180 miles in 3 hours. Write the equation and graph it.'
        ]
    },
    'circumference and area of circles': {
        prerequisites: [
            { skill: 'Find area of rectangles and triangles', grade: 6, scaffold: 'A rectangle is 5 × 8. Area = ___. A triangle with same base and height has area = ___.' },
            { skill: 'Understand pi as a ratio (C ÷ d)', grade: 6, scaffold: 'Measure the circumference and diameter of a circular object. Divide C ÷ d. What do you get?' },
            { skill: 'Multiply decimals', grade: 5, scaffold: '3.14 × 10 = ___. 3.14 × 5 = ___.' }
        ],
        focusProblems: [
            'A circle has a diameter of 10 cm. Find the circumference. Use π ≈ 3.14.',
            'A circular garden has a radius of 7 feet. How much soil do you need to cover it?'
        ]
    },
    'similarity and scaling': {
        prerequisites: [
            { skill: 'Understand equal ratios', grade: 6, scaffold: 'Are these ratios equal: 3/4 and 6/8? How do you know?' },
            { skill: 'Multiply by fractions and decimals', grade: 5, scaffold: 'Scale a 4 cm × 6 cm rectangle by a factor of 2. What are the new dimensions?' }
        ],
        focusProblems: [
            'Triangle A has sides 3, 4, 5. Triangle B has sides 6, 8, 10. Are they similar? What is the scale factor?',
            'A map scale is 1 cm = 50 km. Two cities are 3.5 cm apart on the map. How far in real life?'
        ]
    },
    'volume and surface area of cylinders': {
        prerequisites: [
            { skill: 'Find volume of rectangular prisms', grade: 6, scaffold: 'Volume = length × width × height. A box is 3 × 4 × 5. Volume = ___.' },
            { skill: 'Find area of a circle (A = πr²)', grade: 7, scaffold: 'A circle has radius 3. Area = π × 3² = ___.' }
        ],
        focusProblems: [
            'A cylinder has radius 4 cm and height 10 cm. Find the volume.',
            'A can has diameter 6 in and height 8 in. How much label paper covers the side?'
        ]
    },
    'mean median and range': {
        prerequisites: [
            { skill: 'Add and divide whole numbers', grade: 4, scaffold: 'Find the mean: 4, 6, 8, 10, 12. Add them, then divide by 5.' },
            { skill: 'Order numbers from least to greatest', grade: 3, scaffold: 'Order: 7, 3, 9, 1, 5. The middle number is the ___.' }
        ],
        focusProblems: [
            'Find the mean, median, and range: 12, 15, 18, 22, 8.',
            'Two sets: {10, 10, 10} and {0, 10, 20}. Same mean, different spread. Explain.'
        ]
    },

    // ════════ GRADE 8 TOPICS ════════
    'rational irrational and real numbers': {
        prerequisites: [
            { skill: 'Convert fractions to decimals', grade: 6, scaffold: 'Convert 1/3 to a decimal. What do you notice? Does it end?' },
            { skill: 'Understand perfect squares', grade: 6, scaffold: 'List perfect squares from 1 to 144. What is √49? √81?' },
            { skill: 'Locate fractions and decimals on a number line', grade: 6, scaffold: 'Place √2 between two whole numbers. How do you know which two?' }
        ],
        focusProblems: [
            'Classify each as rational or irrational: 0.333..., √5, −7, π, 4/9.',
            'Between which two integers is √30? Estimate to one decimal place.'
        ]
    },
    'integer exponents and scientific notation': {
        prerequisites: [
            { skill: 'Understand exponents as repeated multiplication', grade: 6, scaffold: '2³ = 2 × 2 × 2 = ___. What does 10⁴ equal?' },
            { skill: 'Multiply and divide by powers of 10', grade: 5, scaffold: '345 × 100 = ___. 6,700 ÷ 1,000 = ___.' }
        ],
        focusProblems: [
            'Simplify: 3² × 3⁴. Write the rule you used.',
            'Write 0.00045 in scientific notation. Write 3.2 × 10⁵ in standard form.'
        ]
    },
    'linear and nonlinear functions': {
        prerequisites: [
            { skill: 'Plot ordered pairs', grade: 5, scaffold: 'Plot (1,2), (2,4), (3,8). Connect the dots. Is this a straight line?' },
            { skill: 'Identify proportional relationships', grade: 7, scaffold: 'y = 2x is linear. Is y = x² linear? Plot both to compare.' }
        ],
        focusProblems: [
            'Which tables show linear functions? How can you tell without graphing?\n  A: (1,3) (2,5) (3,7) (4,9)\n  B: (1,1) (2,4) (3,9) (4,16)',
            'Sketch a graph that is NOT a function. Explain why using the vertical line test.'
        ]
    },
    'solve equations inequalities and systems': {
        prerequisites: [
            { skill: 'Solve one-step equations', grade: 6, scaffold: 'Solve: x + 7 = 15 and 3x = 21. Check your answers.' },
            { skill: 'Solve two-step equations', grade: 7, scaffold: 'Solve: 2x − 5 = 11. What steps did you take?' },
            { skill: 'Graph inequalities on a number line', grade: 7, scaffold: 'Graph x > 3 and x ≤ −1 on number lines.' }
        ],
        focusProblems: [
            'Solve: 3(x − 2) = 12. Show each step.',
            'Solve the system by graphing: y = 2x + 1 and y = −x + 7.'
        ]
    },
    'pythagorean theorem': {
        prerequisites: [
            { skill: 'Identify right triangles', grade: 6, scaffold: 'Which angle is the right angle? The longest side across from it is called the ___.' },
            { skill: 'Square numbers and find square roots', grade: 6, scaffold: '5² = ___. √25 = ___. √49 = ___.' },
            { skill: 'Understand area of squares', grade: 4, scaffold: 'A square has side 5. Its area = ___. Draw squares on each side of a right triangle.' }
        ],
        focusProblems: [
            'A right triangle has legs 3 and 4. Find the hypotenuse. Show a² + b² = c².',
            'A ladder leans against a wall. The foot is 6 ft from the wall, the ladder is 10 ft long. How high up the wall does it reach?'
        ]
    },
    'slope parallel and perpendicular lines': {
        prerequisites: [
            { skill: 'Find rate of change from a table', grade: 7, scaffold: 'x: 1, 2, 3, 4 and y: 3, 5, 7, 9. What is the change in y for each change in x?' },
            { skill: 'Graph linear equations', grade: 7, scaffold: 'Graph y = 2x − 1 by making a table of 3 points.' }
        ],
        focusProblems: [
            'Find the slope between (1, 3) and (4, 9). What does the slope tell you?',
            'Line A has slope 2/3. Line B has slope −3/2. Are they parallel, perpendicular, or neither?'
        ]
    },
    'scatterplots and lines of best fit': {
        prerequisites: [
            { skill: 'Plot ordered pairs on a coordinate plane', grade: 5, scaffold: 'Plot these points: (1,2), (3,5), (5,7), (6,9). Do they seem to follow a pattern?' },
            { skill: 'Describe trends (increasing, decreasing)', grade: 6, scaffold: 'As study time increases, do test scores increase or decrease? This is a ___ correlation.' }
        ],
        focusProblems: [
            'Plot the data and describe the correlation: Hours studied: 1,2,3,4,5 vs. Score: 55,62,70,78,85.',
            'Draw a line of best fit on your scatterplot. Use it to predict the score for 7 hours of studying.'
        ]
    },
    'representations of linear equations': {
        prerequisites: [
            { skill: 'Understand slope as rate of change', grade: 7, scaffold: 'In y = mx + b, m is the ___. If m = 3, the line goes up ___ for every 1 to the right.' },
            { skill: 'Identify y-intercept', grade: 7, scaffold: 'In y = 2x + 5, the y-intercept is ___. This is where the line crosses the ___.' }
        ],
        focusProblems: [
            'Write the equation of a line with slope 3 and y-intercept −2. Graph it.',
            'Convert 2x + 3y = 12 to slope-intercept form. What are the slope and y-intercept?'
        ]
    }
};

// ── SUCCESS CRITERIA GENERATOR ──
// Maps action verbs and topic patterns to student-observable criteria.
// Each criterion starts with "I can..." and describes a specific,
// checkable student action that demonstrates learning.
const SUCCESS_CRITERIA_PATTERNS = {
    // Generic verb-based criteria
    'compare': [
        'I can place values on a number line in the correct position.',
        'I can use <, >, or = to compare two values and explain my reasoning.',
        'I can order a set of values from least to greatest.'
    ],
    'solve': [
        'I can set up an equation that represents the problem.',
        'I can use inverse operations to isolate the variable.',
        'I can check my solution by substituting back into the original equation.'
    ],
    'represent': [
        'I can create a visual model (table, graph, or diagram) that shows the relationship.',
        'I can translate between different representations (words, equations, tables, graphs).',
        'I can explain what each part of my representation means in context.'
    ],
    'identify': [
        'I can name and define the key features or vocabulary.',
        'I can find examples and non-examples.',
        'I can explain why something fits or doesn\'t fit the category.'
    ],
    'calculate': [
        'I can choose the correct operation or formula.',
        'I can perform the computation accurately.',
        'I can label my answer with the correct units and check for reasonableness.'
    ],
    'convert': [
        'I can identify the starting form and the target form.',
        'I can apply the correct conversion method step by step.',
        'I can verify my conversion by working backwards.'
    ],
    'use': [
        'I can set up the correct relationship from the problem context.',
        'I can apply the skill to find the unknown value.',
        'I can explain what my answer means in real-world terms.'
    ],
    'determine': [
        'I can list or identify the relevant values from the problem.',
        'I can apply the correct strategy or algorithm.',
        'I can justify why my answer is correct.'
    ],
    'find': [
        'I can identify the measurements or values I need.',
        'I can apply the correct formula or strategy.',
        'I can label my answer with appropriate units.'
    ],
    'work with': [
        'I can use models or diagrams to show my thinking.',
        'I can perform operations accurately.',
        'I can explain my process step by step.'
    ],
    'explain': [
        'I can state the concept in my own words.',
        'I can give an example that shows how it works.',
        'I can identify and correct a common mistake.'
    ],
    'understand': [
        'I can describe the concept in my own words.',
        'I can show at least two ways to solve or represent it.',
        'I can apply it to a new situation I haven\'t seen before.'
    ]
};

// ── RELEVANCE CONNECTIONS ──
// Maps topics to career connections, real-life scenarios, and math progression.
// Used to generate the "Why This Matters" / Relevance slide.
const RELEVANCE_CONNECTIONS = {

    // ── Grade 6 ──
    'locate and compare numbers': {
        careers: ['Nurse reading thermometers and dosages', 'Stock trader comparing share prices', 'Weather forecaster comparing temperatures'],
        realLife: ['Comparing prices at the grocery store', 'Checking if you have enough money for something', 'Reading a ruler to the nearest fraction of an inch'],
        progression: 'Comparing rational numbers → Ordering rational numbers in grade 7 → Working with real numbers in grade 8 → Foundations of algebra in high school'
    },
    'equivalence and representations': {
        careers: ['Chef adjusting recipes (1/2 cup = 0.5 cup)', 'Sales associate calculating discounts (25% = 1/4 off)', 'Pharmacist converting between measurement forms'],
        realLife: ['Understanding "50% off" vs "half off" are the same deal', 'Converting recipe measurements when cooking', 'Splitting bills equally among friends'],
        progression: 'Equivalent fractions/decimals/percents → Proportional reasoning in grade 7 → Functions and linear relationships in grade 8'
    },
    'factors primes gcf lcm': {
        careers: ['Event planner scheduling repeating events', 'Package designer fitting items into boxes', 'Cryptographer using prime numbers for encryption'],
        realLife: ['Finding when two activities sync up again (bus schedules, chores)', 'Sharing snacks equally with no leftovers', 'Breaking large problems into smaller pieces'],
        progression: 'Factoring numbers → Simplifying fractions → Factoring algebraic expressions in high school → Polynomial factoring'
    },
    'ratios and rates': {
        careers: ['Chef scaling recipes for different group sizes', 'Architect making scale models of buildings', 'Nurse calculating medicine dosages by body weight'],
        realLife: ['Figuring out the best deal at the store (price per ounce)', 'Calculating how long a road trip will take', 'Mixing paint colors in the right proportions'],
        progression: 'Ratios → Proportional relationships in grade 7 → Slope and linear functions in grade 8 → Trigonometric ratios in high school'
    },
    'multiplication and division of fractions': {
        careers: ['Carpenter cutting boards to fractional lengths', 'Baker halving or doubling recipes', 'Fashion designer scaling patterns up or down'],
        realLife: ['Finding half of 3/4 cup when halving a recipe', 'Splitting a pizza that\'s already been partially eaten', 'Figuring out how many 1/3-cup servings are in 2 cups'],
        progression: 'Fraction operations → Rational number operations in grade 7 → Algebraic fractions → Rational expressions in high school'
    },
    'percent': {
        careers: ['Retail manager calculating markups and discounts', 'Financial advisor explaining interest rates', 'Data analyst presenting survey results'],
        realLife: ['Calculating tips at restaurants', 'Understanding sale prices and discounts', 'Figuring out your grade when the teacher says "you got 85%"'],
        progression: 'Percent basics → Percent increase/decrease in grade 7 → Exponential growth (compound interest) in grade 8 → Statistics in high school'
    },
    'variables and representations': {
        careers: ['Software developer writing code with variables', 'Scientist writing formulas to describe relationships', 'Business analyst modeling costs and revenue'],
        realLife: ['Figuring out how many hours you need to work to buy something', 'Understanding phone plan pricing (base cost + per-minute charge)', 'Planning how to split costs fairly'],
        progression: 'Expressions with variables → Equations and inequalities → Functions in grade 8 → All of algebra and beyond'
    },
    'represent and solve equations': {
        careers: ['Engineer calculating dimensions and forces', 'Accountant balancing budgets', 'Pharmacist determining correct dosages'],
        realLife: ['Figuring out the mystery number in a puzzle', 'Calculating how much more you need to save for a goal', 'Finding the missing measurement when building something'],
        progression: 'One-step equations → Multi-step equations in grade 7 → Systems of equations in grade 8 → Quadratic equations in high school'
    },

    // ── Grade 7 ──
    'rational numbers': {
        careers: ['Meteorologist working with temperatures above and below zero', 'Banker tracking deposits and withdrawals', 'Geologist measuring elevation above and below sea level'],
        realLife: ['Understanding temperature drops below zero', 'Tracking money going in and out of your account', 'Measuring above and below sea level or ground level'],
        progression: 'Rational number operations → Real numbers in grade 8 → Algebraic operations with signed values throughout high school'
    },
    'proportional relationships': {
        careers: ['Architect drawing blueprints to scale', 'Nutritionist calculating calories per serving', 'Photographer enlarging or reducing images'],
        realLife: ['Deciding which size drink is the best value', 'Scaling a recipe up for a party', 'Converting between currencies when traveling'],
        progression: 'Proportional relationships → Slope and linear equations in grade 8 → Direct variation → Linear modeling in high school'
    },
    'circumference and area of circles': {
        careers: ['Landscape designer planning circular gardens', 'Engineer designing wheels, gears, and pipes', 'Pizza shop owner calculating dough for different sizes'],
        realLife: ['Figuring out how much fencing goes around a circular pool', 'Calculating how much bigger a 16-inch pizza is than a 12-inch', 'Wrapping ribbon around a circular gift box'],
        progression: 'Circle measurements → Cylinder volume in grade 7 → Cone/sphere formulas → Trigonometry and radians in high school'
    },
    'similarity and scaling': {
        careers: ['Architect creating scale models', 'Cartographer making maps', 'Video game designer scaling character models'],
        realLife: ['Using a map to figure out real distances', 'Enlarging a photo without distorting it', 'Building a model car or dollhouse to scale'],
        progression: 'Similar figures → Dilations and transformations → Geometric proofs about similarity in high school → Trigonometry'
    },
    'mean median and range': {
        careers: ['Sports analyst calculating batting averages', 'Market researcher analyzing survey data', 'Quality control inspector monitoring product dimensions'],
        realLife: ['Figuring out your average grade', 'Comparing which basketball player is more consistent', 'Understanding what "average household income" means in the news'],
        progression: 'Measures of center → Standard deviation in high school → Statistical inference → Data science'
    },

    // ── Grade 8 ──
    'rational irrational and real numbers': {
        careers: ['Computer scientist working with precision in calculations', 'Architect using √2 in diagonal measurements', 'Physicist using π and other irrational constants'],
        realLife: ['Understanding why your calculator shows 0.333... for 1/3', 'Finding the exact diagonal of a square room', 'Knowing π never ends but we can still use it'],
        progression: 'Real number system → Complex numbers in Algebra 2 → Number theory → Higher mathematics foundations'
    },
    'pythagorean theorem': {
        careers: ['Construction worker ensuring walls are square (3-4-5 rule)', 'Pilot calculating flight distances', 'Video game developer calculating distances between objects'],
        realLife: ['Checking if a doorway is truly square', 'Finding the shortest path diagonally across a field', 'Setting up a ladder at the right distance from a wall'],
        progression: 'Pythagorean theorem → Distance formula in Algebra 1 → Trigonometry → Vectors and 3D geometry'
    },
    'solve equations inequalities and systems': {
        careers: ['Business owner optimizing profit (break-even analysis)', 'Urban planner allocating resources', 'Nutritionist balancing meal plans'],
        realLife: ['Figuring out when two phone plans cost the same', 'Planning a budget where spending ≤ income', 'Choosing between two job offers with different pay structures'],
        progression: 'Linear systems → Quadratic equations in Algebra 1 → Systems of nonlinear equations → Linear programming'
    },
    'slope parallel and perpendicular lines': {
        careers: ['Civil engineer designing road grades', 'Wheelchair ramp designer meeting ADA requirements', 'Ski resort planner categorizing trail difficulty'],
        realLife: ['Understanding "steep" vs "gradual" slopes on hills', 'Calculating how fast your savings are growing', 'Understanding why perpendicular streets form a grid'],
        progression: 'Slope → Rate of change → Derivatives in calculus → Rates of change in physics and economics'
    },
    'scatterplots and lines of best fit': {
        careers: ['Data scientist predicting trends', 'Market analyst forecasting sales', 'Climate scientist studying temperature trends'],
        realLife: ['Predicting your next test score based on study hours', 'Seeing if there\'s a connection between two things (exercise and mood)', 'Understanding graphs in the news about trends over time'],
        progression: 'Scatterplots → Regression analysis in high school → Correlation and causation → Predictive modeling in data science'
    }
};

// ── HELPER FUNCTIONS ──

/**
 * Get prerequisite skills for a list of topics.
 * Returns the best match for each topic, or a generic fallback.
 */
function getPrerequisites(topics) {
    const results = [];
    for (const topic of topics) {
        const tl = topic.toLowerCase();
        // Direct match first
        if (PREREQUISITE_SKILLS[tl]) {
            results.push({ topic: topic, data: PREREQUISITE_SKILLS[tl] });
            continue;
        }
        // Fuzzy match by keyword overlap
        let bestMatch = null;
        let bestScore = 0;
        for (const [key, val] of Object.entries(PREREQUISITE_SKILLS)) {
            const keyWords = key.split(/\s+/).filter(w => w.length > 3);
            const topicWords = tl.split(/\s+/).filter(w => w.length > 3);
            let score = 0;
            for (const kw of keyWords) {
                if (tl.includes(kw)) score += 2;
            }
            for (const tw of topicWords) {
                if (key.includes(tw)) score += 1;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { topic: topic, data: val };
            }
        }
        if (bestMatch && bestScore >= 2) {
            results.push(bestMatch);
        }
    }
    return results;
}

/**
 * Generate success criteria for a learning target.
 * @param {string} verb - The action verb from the learning target
 * @param {string} topic - The topic name
 * @returns {string[]} Array of 2-4 success criteria strings
 */
function generateSuccessCriteria(verb, topic) {
    const vl = verb.toLowerCase();
    // Find matching verb pattern
    for (const [pattern, criteria] of Object.entries(SUCCESS_CRITERIA_PATTERNS)) {
        if (vl.includes(pattern)) {
            // Customize generic criteria with topic context
            return criteria.map(c => c.replace(/the concept|the relationship|the key features/gi, topic));
        }
    }
    // Fallback: generic criteria
    return [
        'I can describe ' + topic + ' in my own words.',
        'I can show my work step by step.',
        'I can check my answer and explain why it makes sense.'
    ];
}

/**
 * Get relevance connections for a list of topics.
 * Returns career, real-life, and progression for the best-matching topic.
 */
function getRelevance(topics) {
    for (const topic of topics) {
        const tl = topic.toLowerCase();
        if (RELEVANCE_CONNECTIONS[tl]) {
            return RELEVANCE_CONNECTIONS[tl];
        }
        // Fuzzy match
        for (const [key, val] of Object.entries(RELEVANCE_CONNECTIONS)) {
            const keyWords = key.split(/\s+/).filter(w => w.length > 3);
            let hits = 0;
            for (const kw of keyWords) {
                if (tl.includes(kw)) hits++;
            }
            if (hits >= 2) return val;
        }
    }
    // Generic fallback
    return {
        careers: ['Engineers use math to design and build', 'Scientists use math to discover patterns', 'Business owners use math to make decisions'],
        realLife: ['Math helps you make smart choices with money', 'Math helps you solve everyday problems', 'Math helps you understand the world around you'],
        progression: 'This skill builds toward more advanced math concepts you\'ll use in high school and beyond.'
    };
}
