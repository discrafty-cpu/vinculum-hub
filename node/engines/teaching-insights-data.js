// ==================== TEACHING INSIGHTS DATABASE ====================
// Real data sourced from SciMath Minnesota STEM Teacher Center Framework
// https://stemtc.scimathmn.org/frameworks/
// Grades 6-8, all math strands - 43 topics total
// ====================================================================

const TEACHING_INSIGHTS = {

    // ======================== GRADE 6 (16 topics) ========================

    'locate and compare numbers': {
        grade: 6,
        slug: '611a-locate-compare-numbers',
        title: '6.1.1A Locate & Compare Numbers',
        misconceptions: [
            'When partitioning a number line to locate fractions, students count partition marks rather than pieces (getting fifths instead of sixths)',
            'When comparing fractions, students focus only on denominator size (thinking 3/8 > 3/4 because 8 > 4)',
            'Overgeneralizing when comparing same-size fractions with different-sized wholes (1/4 cup vs 1/4 gallon)',
            'When comparing decimals, students lack place value understanding to the right of the decimal point'
        ],
        differentiation: {
            emergent: 'Provide constant use of number lines for comparisons. Create fraction tool-kits with candy bar strips for folding into common denominators. Use geoboards, 100 grids, base-ten blocks for representing rational numbers.',
            ell: 'Include decimal and percent equivalencies for benchmarks on number lines. Provide rich supply of manipulatives. Review fraction equivalency concepts before connecting to decimals or percents.',
            extending: 'Connect fractions, decimals, and percents through multiple representations. Challenge students with non-standard comparison contexts.'
        },
        essential_understandings: [
            'Students should use concrete tools like number lines, fraction bars, and base-ten blocks to compare fractions, percents, and decimals',
            'Teachers should design lessons moving from concrete hands-on experiences toward abstract comparisons',
            'Students should locate and compare positive rational numbers using a number line'
        ]
    },

    'equivalence and representations': {
        grade: 6,
        slug: '611b-equivalence-representations',
        title: '6.1.1B Equivalence & Representations',
        misconceptions: [
            'Difficulty dividing numerator by denominator to find decimal equivalency for percent conversion',
            'Leaving decimal in place when converting to percent (writing 0.12 as .12% instead of 12%)',
            'Not understanding how to write 28.5/100 as 0.285 since 1/2 of 1/100 is 0.005',
            'Not recognizing that percent-to-fraction or fraction-to-percent conversions require understanding of place value'
        ],
        differentiation: {
            emergent: 'Use fraction bars, fraction circles, area models, 10x10 grids, number lines, and Cuisenaire rods. Provide fraction-stick charts showing common equivalent fractions. Use percent circles and 100 grids.',
            ell: 'Have students provide fraction, decimal, and percent forms of the same number. Given partially completed charts for students to complete as reference tools.',
            extending: 'Challenge students to find multiple representations and choose the best one for solving problems in context.'
        },
        essential_understandings: [
            'Students use concrete models and pictures to develop understanding of equivalencies among fractions, decimals, and percents',
            'Students recognize equivalencies and choose the best representation for solutions',
            'Teachers allow time for students to recognize equivalencies among different representations'
        ]
    },

    'factors primes gcf lcm': {
        grade: 6,
        slug: '611c-factors-primes-gcf-lcm',
        title: '6.1.1C Factors & Primes / GCF & LCM',
        misconceptions: [
            'Students believe 1 is a prime number',
            'Students believe even numbers are composite and odd numbers are prime',
            'Students believe factors must be smaller than the given number (not recognizing 36 is a factor of 36)',
            'Students report some numbers have no common factors (not recognizing 1 as common factor of 4 and 5)',
            'Students use decimals as factors (believing 2.5 is a factor of 10 since 4 x 2.5 = 10)',
            'Students believe multiples must be larger than the given number (not recognizing 36 as a multiple of 36)'
        ],
        differentiation: {
            emergent: 'Provide chart of divisibility tests. Use multiplication charts and calculators for multiples. Use Venn diagrams for common factors/multiples. Use laminated hundreds charts for marking multiples.',
            ell: 'Be aware of acronyms (GCF, LCM) and ensure understanding. Words with multiple meanings need attention (base, power, prime). Post examples showing factors, factorization, and multiples.',
            extending: 'Explore prime factorization of larger numbers. Apply GCF and LCM to real-world problem-solving contexts.'
        },
        essential_understandings: [
            'Students use a variety of strategies to factor positive integers and find GCF',
            'Students simplify fractions using common factors of numerators and denominators',
            'Students express positive integers as products of prime factors'
        ]
    },

    'ratios and rates': {
        grade: 6,
        slug: '612-ratios-rates',
        title: '6.1.2 Ratios & Rates',
        misconceptions: [
            'Students believe 8:4 and 2:1 represent different ratios',
            'Students do not understand that order matters in a ratio (thinking 3:1 and 1:3 are the same)',
            'Given ratio 3 boys to 7 girls, students think there are exactly only 3 boys and 7 girls',
            'Students see little difference between fractions and ratios, believing all ratios are part-to-whole',
            'Students misinterpret ratio 1:6 as "one out of every six" when it should be 1:5 (wrong to correct)',
            'Students believe adding or subtracting the same amount maintains a ratio (additive vs multiplicative thinking)'
        ],
        differentiation: {
            emergent: 'Use language "for every..." when describing ratios. Use pictorial representations. Use multiplication tables to show equivalent ratios. Cut apart table rows to reposition for comparison.',
            ell: 'Create visual glossary including ratios in different forms, rates, unit rates, and proportions. Use Venn diagrams to show relationships between concepts.',
            extending: 'Explore complex ratio problems involving multiple steps. Connect ratios to proportional reasoning in real-world contexts.'
        },
        essential_understandings: [
            'Students identify part-to-part, part-to-whole, and whole-to-part ratios in different forms',
            'Teachers transition students from thinking about fractions only as part-to-whole to fractions as representations for many types of ratios',
            'Students find equivalent ratios using multiplication tables and reasoning about multiplication and division'
        ]
    },

    'multiplication and division of fractions': {
        grade: 6,
        slug: '613a-multiplication-division',
        title: '6.1.3A Multiplication & Division',
        misconceptions: [
            'Students believe multiplication always results in a larger number and division always results in a smaller number',
            'Students struggle to make meaning of problems involving fractions (like 1/2 x 1 3/4), making estimation difficult',
            'When comparing rectangular area models, students may not recognize equivalencies in different visual representations',
            'Students confuse the process of multiplying fractions with the process of dividing fractions'
        ],
        differentiation: {
            emergent: 'Use number lines and rectangular area models to explore multiplication and division of fractions. Virtual manipulatives can bridge physical to abstract. Limit manipulative pieces to avoid confusion.',
            ell: 'Connect previous experiences with whole number operations to fraction operations. Model a variety of strategies.',
            extending: 'Derive why procedures work. Solve multi-step word problems requiring both multiplication and division of fractions.'
        },
        essential_understandings: [
            'Students use variety of models (number lines, area models) to explore multiplying and dividing fractions',
            'Students represent multiplication and division of fractions with variety of models',
            'Teachers ask students to estimate products and quotients to assess reasonableness'
        ]
    },

    'percent': {
        grade: 6,
        slug: '613b-percent',
        title: '6.1.3B Percent',
        misconceptions: [
            'Students incorrectly translate among fractions, decimals, and percents (5% becomes 1/5, 5, or 0.5)',
            'Students may not convert percents to fractions/decimals before multiplying (using 2.5 x 12 for 2.5% of 12)',
            'Students struggle with percents greater than 100% or less than 1%',
            'Students believe increasing by 10% then decreasing by 10% returns to the original number'
        ],
        differentiation: {
            emergent: 'Use interactive percent applets. Have students create graphic organizers for translating among fractions, decimals, and percents. Percent bars help estimate answers.',
            ell: 'Connect visual representations of percent problems to abstract representations. Use everyday shopping contexts.',
            extending: 'Explore percents greater than 100% and less than 1%. Solve multi-step percent problems in real-world contexts.'
        },
        essential_understandings: [
            'Percent is a ratio to 100 that can be converted to a fraction or decimal',
            'Visual representations like percent bars help estimate percent problems',
            'Teachers use everyday experiences as a rich source of percent problems'
        ]
    },

    'problem solving and estimation': {
        grade: 6,
        slug: '613c-problem-solving-estimation',
        title: '6.1.3C Problem Solving & Estimation',
        misconceptions: [
            'Students struggle to understand mathematical relationships in real-world problems and represent them with expressions',
            'Students choose incorrect operations when solving problems',
            'Students focus on getting answers and do not assess them for reasonableness'
        ],
        differentiation: {
            emergent: 'Use bar models and visual approaches to problem-solving (Singapore Math). Provide multiplication charts for students struggling with basic facts.',
            ell: 'Use visual problem-solving approaches. Students benefit from bar models that represent relationships and unknowns clearly.',
            extending: 'Solve multi-step problems requiring multiple operations. Develop estimation strategies for complex contexts.'
        },
        essential_understandings: [
            'Students use a process to solve problems: understand, plan, solve, check',
            'Students draw visual representations to discover relationships',
            'Teachers model and make explicit each step of the problem-solving process'
        ]
    },

    'variables and representations': {
        grade: 6,
        slug: '621-variables-representations-relationships',
        title: '6.2.1 Variables & Representations of Relationships',
        misconceptions: [
            'Students think variables represent only one number',
            'Students cannot distinguish between independent and dependent variables',
            'Students misinterpret whether a relationship is additive or multiplicative from a table or graph',
            'Students interpret y = 2x to mean x is twice as large as y',
            'Students misrepresent relationships involving subtraction or division (x - 3 vs 3 - x)',
            'Students believe axes must be scaled in the same units when graphing'
        ],
        differentiation: {
            emergent: 'Use manipulatives and pictorial representations to extend patterns. Provide graphic organizers (input/output charts, tables, coordinate grids with labeled axes).',
            ell: 'The word "table" has multiple meanings requiring explicit instruction. Use analogies (like teacher substitute replacing a teacher, a number substitutes for a variable).',
            extending: 'Explore multiple representations of the same relationship. Translate patterns between tables, graphs, and rules.'
        },
        essential_understandings: [
            'Students identify and use variables to represent relationships between quantities that can change',
            'Students represent relationships with tables, graphs, and rules',
            'Teachers ask students to consider strengths and limitations of each representation'
        ]
    },

    'properties and equivalent expressions': {
        grade: 6,
        slug: '622-properties-equivalent-expressions',
        title: '6.2.2 Properties & Equivalent Expressions',
        misconceptions: [
            'Students incorrectly apply order of operations',
            'Students think 3 x 5 is equivalent to 3 x 3 + 2, not recognizing need for parentheses',
            'Students misinterpret exponents (e.g., 4^2 as 4 x 2)',
            'Since 2 + 1/2 = 2 1/2, students misinterpret 2x as 2 + x',
            'Students do not recognize x + x can be simplified to 2x',
            'Students misinterpret x + x + x as x^3 rather than 3x',
            'Students do not recognize x * 5 and 5x are equivalent'
        ],
        differentiation: {
            emergent: 'Always provide algebra tiles or manipulatives. Provide graphic organizers showing properties and how they simplify expressions. Use interactive order of operations games.',
            ell: 'Help students understand that properties describe predictable number behavior. Use color-coding for like terms. Post property cards with examples.',
            extending: 'Generate equivalent expressions using multiple properties. Evaluate complex expressions with multiple variables.'
        },
        essential_understandings: [
            'Students use commutative, associative, and distributive properties for mental math',
            'Students use concrete and pictorial representations to model algebraic expressions',
            'Teachers connect order of operations and properties to generate equivalent expressions'
        ]
    },

    'represent and solve equations': {
        grade: 6,
        slug: '623-represent-solve-equations',
        title: '6.2.3 Represent & Solve Equations',
        misconceptions: [
            'Students think variables can represent only one number',
            'Students ignore letters when simplifying (3m + 2 = 5, or 3m + 2 = 5m)',
            'Students do not distinguish between letters for variables and letters for units (5m vs 5 meters)',
            'Students think the equal sign means "to calculate" rather than "is the same as"',
            'Students struggle with equations like 5 = x + 2 where variable is on the right',
            'Students may try to solve 5x + 2 = 15 by dividing by 5 before subtracting 2'
        ],
        differentiation: {
            emergent: 'Ensure students understand equal sign means "the same as." Use pan balance tools. Have students generalize relationships in words before symbols. Provide graphic organizers with pan balances.',
            ell: 'Use concrete materials and pictorial representations when solving equations. Write verbal models before using symbols. Pair ELL students with strong English speakers.',
            extending: 'Solve equations with variables on both sides. Explore solution sets and multi-step equations.'
        },
        essential_understandings: [
            'Students understand the equal sign means "is the same as"',
            'Properties apply to algebraic expressions and equations the same way as numerical ones',
            'Teachers assess understanding of equal sign to identify misconceptions'
        ]
    },

    'measurement of polygons and prisms': {
        grade: 6,
        slug: '631-measurement-polygons-prisms',
        title: '6.3.1 Measurement of Polygons & Prisms',
        misconceptions: [
            'Students have difficulty distinguishing perimeter, area, and volume, resulting in wrong units',
            'Students know formulas but cannot link them to covering shapes with square units or filling with cubic units',
            'Students have difficulty visualizing unseen faces of 3D figures for surface area',
            'Students are confused about why square units measure area and cubic units measure volume'
        ],
        differentiation: {
            emergent: 'Give students color tiles to make rectangles and discover that same area can have different perimeters. Go on shape walks. Provide nets to fold. Fill objects with cubes for volume.',
            ell: 'Post and label pictures of shapes and prisms. Discuss that prisms are named by their base shape. Place 3D prisms inside boxes to explore volume.',
            extending: 'Decompose complex shapes. Find area with coordinates. Apply measurement to real-world contexts.'
        },
        essential_understandings: [
            'Students use objects that can be covered with squares and filled with cubes to explore surface area and volume',
            'Teachers provide hands-on investigations for determining surface area and volume',
            'Students solve meaningful real-world area and volume problems'
        ]
    },

    'angles and intersecting lines': {
        grade: 6,
        slug: '632a-angles-intersecting-lines',
        title: '6.3.2A Angles & Intersecting Lines',
        misconceptions: [
            'Students have difficulty distinguishing angle as rotation, as geometric shape, and as measure',
            'Students are unfamiliar with symbolic notation for angles and their measures',
            'Students use the intersection point to name all angles (all angles at point A called "angle A")',
            'Students confuse supplementary and complementary',
            'Students believe complementary and supplementary angles must be adjacent',
            'Students may not recognize congruent angles formed by intersecting lines'
        ],
        differentiation: {
            emergent: 'Check basic vocabulary (vertex, rays, degrees). Review angle notation symbols. Ask students to predict angle measures before using protractors. Use Frayer models for vocabulary.',
            ell: 'Explain that "right angle" does not come from orientation opening to the right. Color-code angle pairs. Provide definitions with diagrams.',
            extending: 'Use angle relationships to find unknown angles in complex figures. Explore cause and effect relationships.'
        },
        essential_understandings: [
            'Students have multiple opportunities to draw and measure angles',
            'Teachers include real-world situations for exploring angle relationships',
            'Students use data from measurement investigations to observe patterns and discover relationships'
        ]
    },

    'angles in geometric figures': {
        grade: 6,
        slug: '632b-angles-geometric-figures',
        title: '6.3.2B Angles in Geometric Figures',
        misconceptions: [
            'Students may misread a protractor',
            'Students have difficulty decomposing polygons into triangles',
            'Students struggle to develop the formula for sums of interior angles of polygons'
        ],
        differentiation: {
            emergent: 'Post pictures of polygons with diagonals drawn showing triangle decomposition. Provide tables for recording sides and angle sums. Use calculators to assist.',
            ell: 'Post and label pictures of polygons (quadrilaterals, pentagons, hexagons). Post pictures with labeled diagonals. Use Frayer model for vocabulary.',
            extending: 'Explore exterior angles of polygons (sum is always 360°). Find measure of one exterior angle of regular polygon (360/n).'
        },
        essential_understandings: [
            'Students measure angles of various triangles to discover the angle sum relationship',
            'Students draw diagonals to decompose polygons into triangles',
            'Students observe relationship between number of sides and sum of interior angles'
        ]
    },

    'converting and estimating measurements': {
        grade: 6,
        slug: '633-converting-estimating-measurements',
        title: '6.3.3 Converting & Estimating Measurements',
        misconceptions: [
            'Students multiply when converting to larger units and divide when converting to smaller units (reversed)',
            'Students may not know metric prefixes or their meanings',
            'Students cannot form mental pictures of measurement units, especially metric, making it hard to choose appropriate units or estimate'
        ],
        differentiation: {
            emergent: 'Provide graphic organizers showing units for length, capacity, weight. Post benchmark relationships and "rules of thumb." Have students compare capacities of different containers.',
            ell: 'Students new to the US will likely be unfamiliar with customary system. Provide hands-on experiences measuring with both systems.',
            extending: 'Develop personal references for estimation. Solve problems requiring multiple unit conversions.'
        },
        essential_understandings: [
            'Students select reasonable units, decide on tools, and measure actual objects including irregular shapes',
            'Students use benchmarks to estimate then test predictions for reasonableness',
            'Measurements are approximate and units are chosen based on accuracy needed'
        ]
    },

    'sample space': {
        grade: 6,
        slug: '641a-sample-space',
        title: '6.4.1A Sample Space',
        misconceptions: [
            'Students incorrectly determine sample space size from tree diagrams (counting 14 outcomes instead of 8 for three coin tosses)',
            'In experiments involving combinations, students have trouble knowing when order matters and when it does not'
        ],
        differentiation: {
            emergent: 'Provide vocabulary support with graphic organizers. Use manipulatives (spinners, dice, coins, tiles). Use templates for data collection. Scaffold development of tree diagrams.',
            ell: 'Vocabulary with multiple meanings is problematic (heads, tails, tree, die, space). Post labeled pictures. Use Frayer model for vocabulary development.',
            extending: 'Explore complex sample spaces. Develop efficient counting strategies for larger experiments.'
        },
        essential_understandings: [
            'Students use manipulatives to determine the set of all possible outcomes',
            'Students represent outcomes using tree diagrams, organized lists, tables, grids, and pictures',
            'Teachers facilitate conversations moving students from concrete to visual to abstract representations'
        ]
    },

    'probability and experiments': {
        grade: 6,
        slug: '641b-probability-experiments',
        title: '6.4.1B Probability & Experiments',
        misconceptions: [
            'Students believe "fair" means everything has equal chance in any sampling experiment',
            'Students predict likelihood based on absolute rather than relative size',
            'Students create part-to-part rather than part-to-whole relationships for probability',
            'Students predict the outcome of the next trial rather than what is likely to occur',
            'Intuition and hunches are used to predict likelihood; students believe all outcomes have equal chance'
        ],
        differentiation: {
            emergent: 'Review ratio as part-to-whole relationship. Emphasize probability is part-to-whole, not part-to-part. Set up experiments concrete to abstract. Provide graphic organizers.',
            ell: 'Use number line from 0 to 1 with quantitative and qualitative descriptions. Create visual glossary. Use graphic organizers to compare theoretical and experimental probability.',
            extending: 'Compare experimental and theoretical probability. Explore compound probability situations.'
        },
        essential_understandings: [
            'Students use key vocabulary relating to probability',
            'Probability is the ratio of event size to sample space size',
            'Students use visual representations (tree diagrams, charts, tables, grids) to record and organize data'
        ]
    },

    // ======================== GRADE 7 (17 topics) ========================

    'rational numbers': {
        grade: 7,
        slug: '711a-rational-numbers',
        title: '7.1.1A Rational Numbers',
        misconceptions: [
            'Students think prime numbers are irrational because each is only divisible by 1 and itself',
            'Students struggle with fractions like 1/7 whose decimal equivalent is a long repeating decimal',
            'Calculator rounding causes students to not recognize repeating patterns (1/7 shows as 0.1428571429)',
            'Students assume pi is exactly 3.14 rather than an approximation',
            'Students assume a square root is always irrational'
        ],
        differentiation: {
            emergent: 'Provide calculators for division. Provide number lines. Start warm-ups writing different numbers in tables, including square roots. Use scientific/graphing calculators.',
            ell: 'Review non-mathematical meaning of "rational." Connect to everyday language. Use visual tables for comparing different number representations.',
            extending: 'Explore the nature of irrational numbers. Investigate which square roots are rational vs irrational.'
        },
        essential_understandings: [
            'Students use calculators to see decimal representations of different fractional values',
            'Teachers use correct vocabulary: rational, terminating, repeating, integer',
            'A rational number is the ratio of two integers'
        ]
    },

    'representing and comparing rational numbers': {
        grade: 7,
        slug: '711b-representing-comparing-rational-numbers',
        title: '7.1.1B Representing & Comparing Rational Numbers',
        misconceptions: [
            'When comparing fractions, students focus only on denominator size (thinking 4/9 > 4/5 because 9 > 5)',
            'Students confuse <, >, ≤, and ≥ symbols',
            'Students think all improper fractions must be written as mixed numbers',
            'Students think a larger digit always means a larger number (not understanding negatives)',
            'Students misnumber the number line with negative values'
        ],
        differentiation: {
            emergent: 'Have students write all steps. Use number line with values increasing to the right. Start by comparing same-representation numbers before mixing representations.',
            ell: 'Use introduction to negative numbers websites. Include decimal and percent equivalency benchmarks on number lines.',
            extending: 'Compare rational numbers in complex real-world contexts. Explore ordering with mixed representations.'
        },
        essential_understandings: [
            'Students use number lines (vertical and horizontal) to locate, order, and compare rational numbers',
            'Teachers engage students with concrete and semi-concrete representations',
            'Teachers use real-world terms (money, temperature, gains/losses) to help with ordering'
        ]
    },

    'applying rational numbers': {
        grade: 7,
        slug: '712a-applying-making-sense-rational-numbers',
        title: '7.1.2A Applying & Making Sense of Rational Numbers',
        misconceptions: [
            'Students think absolute value symbols mean "opposite of"',
            'Students think bars make things positive (|-4 - 5| becomes |-4 + 5|)',
            'When computing with absolute value, students change subtraction to addition within the bars',
            'Students think adding two negatives equals a positive (confusion with multiplication rules)',
            'Students have hard time "seeing" negative numbers without real-world applications',
            'Students may not understand that in -2^2 = 4, the exponent only squares what is immediately to its left'
        ],
        differentiation: {
            emergent: 'Provide number lines and red/black chips for positive/negative numbers. Remind students absolute value bars mean distance from 0. Use fraction division models.',
            ell: 'Absolute value bars are often mistaken for brackets. Use visual manipulatives. Use videos explaining absolute value.',
            extending: 'Solve complex expressions combining absolute value with other operations. Explore patterns in positive/negative operations.'
        },
        essential_understandings: [
            'Students use manipulatives like black/red chips to model positives and negatives',
            'Teachers use activities like walking (left = negative, right = positive) to show change',
            'Students keep number lines on desks for reference throughout the unit'
        ]
    },

    'problem solving with rational numbers': {
        grade: 7,
        slug: '712b-problem-solving-rational-numbers',
        title: '7.1.2B Problem Solving with Rational Numbers',
        misconceptions: [
            'Students may not realize finding percent of a number always involves division',
            'Students enter percent instead of decimal into calculator (getting nonsensical values)',
            'Students get confused with difference between simple and compound interest',
            'Students want to use addition to get equivalent values, not multiplication',
            'Students forget how to multiply with fractional values in scaling contexts'
        ],
        differentiation: {
            emergent: 'Provide multiplication tables. Use place value charts for rounding. Use pictures/tables to show patterns. Always label values being scaled.',
            ell: 'Clarify "ratio" vs "radios" pronunciation. Use graphic organizers for integer operation rules.',
            extending: 'Introduce square roots on number lines. Do multi-step conversion problems showing proportional reasoning.'
        },
        essential_understandings: [
            'Students find percent on calculators and understand different calculator displays',
            'Students convert between percents, decimals, and fractions',
            'Teachers use real-world contexts students are familiar with (recipes, scores, class demographics)'
        ]
    },

    'proportional relationships': {
        grade: 7,
        slug: '721-proportional-relationships',
        title: '7.2.1 Proportional Relationships',
        misconceptions: [
            'Students use additive rather than multiplicative relationships for scaling (adding to side lengths instead of multiplying by scale factor)',
            'When scalar rate is non-integer (like 3.125), students gravitate toward "fractional avoidance" and use additive strategy',
            'Students use x/y ratio for slope instead of y/x',
            'Students think slope is only found on graphs (not tables or equations)',
            'Students mistakenly believe slope of 2/3 is less than slope of 3/4 by comparing like fractions'
        ],
        differentiation: {
            emergent: 'Allow calculators. Partner with more fluent students. Provide step-by-step procedures. Provide graphing calculator instructions. Use math dictionaries and graph paper.',
            ell: 'Use concept maps and graphic organizers. Clarify vocabulary. Translate word problems into visual representations first.',
            extending: 'Explore non-proportional relationships and compare to proportional ones. Analyze complex real-world proportional situations.'
        },
        essential_understandings: [
            'Students draw pictures to represent proportional relationships and show understanding in multiple forms',
            'Teachers require students to represent proportional relationships in all forms (table, graph, equation, words)',
            'Students explain why they believe a problem is proportional or not'
        ]
    },

    'represent proportional relationships': {
        grade: 7,
        slug: '722a-represent-proportional-relationships',
        title: '7.2.2A Represent Proportional Relationships',
        misconceptions: [
            'Slope is not just found on a graph - constant rate of change in tables is also slope',
            'Students determine wrong unit rate by dividing in wrong order',
            'When comparing unit rates, students think the higher rate is always the better deal',
            'Students reverse variables on graph axes and confuse independent/dependent variables in equations'
        ],
        differentiation: {
            emergent: 'Limit assessment choices to 2-3. Provide calculators. Ensure graphs being compared have same scales. Work with partners for support. Use concept maps.',
            ell: 'Clarify definition of "table" in math context. Use concept maps and graphic organizers.',
            extending: 'Explore non-proportional relationships and compare to proportional. Calculate unit rates from all representations.'
        },
        essential_understandings: [
            'This standard focuses on representation (graphical, tabular, verbal) of proportional situations',
            'Students calculate unit rate (slope) from all different representations',
            'Teachers ask how to tell if data is proportional by examining a table, equation, or graph'
        ]
    },

    'problem solving with proportions': {
        grade: 7,
        slug: '722b-problem-solving-proportions',
        title: '7.2.2B Problem Solving with Proportions',
        misconceptions: [
            'Students confuse the difference between 5% and 105% of an item',
            'Students think increasing by 20% is the same as increasing by 20',
            'Students forget to check reasonableness of solutions'
        ],
        differentiation: {
            emergent: 'Provide calculators. Simplify word problems to only include relevant information.',
            ell: 'Rewrite word problems using fewer and easier words. Keep sentences short and remove extra detail.',
            extending: 'Solve complex real-world proportion problems. Explore percent change in financial contexts.'
        },
        essential_understandings: [
            'Students problem-solve with multiplication and scaling',
            'Teachers vary numerical relationships and contexts, using values that do not divide evenly',
            'Students always ask "Does my answer make sense?"'
        ]
    },

    'equations and inequalities': {
        grade: 7,
        slug: '722c-represent-equations-inequalities',
        title: '7.2.2C Represent: Equations & Inequalities',
        misconceptions: [
            'Students get confused with inequality symbols: ≤, ≥, <, and >',
            'The terms "at least" and "at most" cause confusion',
            'Students switch order of terms with division and subtraction (e.g., "less than" or ratio order)'
        ],
        differentiation: {
            emergent: 'Help with symbols: big OPEN end goes to big number, small closed end to smaller. Look for key words indicating operations (increased by = addition, decreased by = subtraction, etc.).',
            ell: 'Provide operation keyword lists. Practice translating word sentences to number sentences.',
            extending: 'Write and solve complex inequalities from real-world contexts involving positive and negative rational numbers.'
        },
        essential_understandings: [
            'Students translate words into mathematical symbols and expressions',
            'Teachers offer tips on remembering inequality symbols',
            'Students practice taking word sentences and transferring them into number sentences'
        ]
    },

    'numerical and algebraic expressions': {
        grade: 7,
        slug: '723-numerical-and-algebraic-expressions',
        title: '7.2.3 Numerical and Algebraic Expressions',
        misconceptions: [
            'Students want to do multiplication before division (or addition before subtraction) regardless of left-to-right order',
            'Distributive property challenges: student rewrites 4(3 - 2x) as 12 - 2x, forgetting to distribute the 4 to 2x',
            'Students confuse order of operations with exponents and parentheses'
        ],
        differentiation: {
            emergent: 'Equip classroom with ample manipulatives. Provide calculators to check work. Model alternative ways to solve problems more than once.',
            ell: 'Encourage manipulative use. Model alternative solutions multiple times. Homework should reinforce understanding of objectives.',
            extending: 'Evaluate complex expressions with multiple variables and operations. Apply properties to simplify advanced expressions.'
        },
        essential_understandings: [
            'Students correctly use properties of algebra',
            'Teachers include expressions with whole number exponents',
            'Students write all steps to see work being done'
        ]
    },

    'represent and solve equations grade 7': {
        grade: 7,
        slug: '724-represent-and-solve-equations',
        title: '7.2.4 Represent and Solve Equations',
        misconceptions: [
            'Students confuse how to write variables (writing 5pc for "$5 per cap" which reads as 5 x p x c)',
            'Students forget to verify answers make sense in original context',
            'Students try to solve proportions mentally without writing them down, leading to mistakes',
            '"Less than" construction is backwards: "3 less than x" is x - 3 but students write 3 - x',
            'Students have set ways of solving and resist learning new methods'
        ],
        differentiation: {
            emergent: 'Use see-saw/teeter-totter analogy for balancing equations. Whatever you do to one side, do to the other. Use pan balance tools and interactive lessons.',
            ell: 'Provide visual balance models. Write verbal models before using symbols. Pair with strong English speakers.',
            extending: 'Solve proportional relationships in real-world contexts. Explore multiple solution methods.'
        },
        essential_understandings: [
            'Students show all steps for solving equations',
            'Students check answers by substituting back into original problem',
            'Teachers give students proportional relationships to solve in real-world contexts'
        ]
    },

    'circumference and area of circles': {
        grade: 7,
        slug: '731a-circumference-area-circles-sectors',
        title: '7.3.1A Circumference & Area of Circles & Sectors',
        misconceptions: [
            'Students believe r^2 is the same as r x 2',
            'Students interchange formulas for circumference and area',
            'Students use diameter in area formula instead of radius (r x 2 instead of r^2)',
            'Students believe pi is exactly 3.14 rather than an approximation',
            'Students square the diameter instead of the radius'
        ],
        differentiation: {
            emergent: 'Have students touch and trace circumference, radius, diameter. Trace circumference onto paper. Mnemonic: "cherry pie delight" for C = πd. "Apple pies are square" for A = πr².',
            ell: 'Use pictures that visually represent vocabulary terms. Provide labeled diagrams with formulas.',
            extending: 'Explore area derivation. Solve multi-step circle and sector problems using protractors and angle rulers.'
        },
        essential_understandings: [
            'Students measure using correct units',
            'Teachers circulate watching for measurement errors (values should be close to 3.14)',
            'Students use correct formulas and distinguish diameter vs radius situations'
        ]
    },

    'volume and surface area of cylinders': {
        grade: 7,
        slug: '731b-volume-surface-area-cylinders',
        title: '7.3.1B Volume & Surface Area of Cylinders',
        misconceptions: [
            'Not understanding that the rectangle (lateral surface) length equals the circumference of the circular base',
            'Confusing "area of base" with "base" in formulas like V = Bh',
            'Confusing "lateral surface area" with "total surface area"',
            'Difficulty translating between general prism formulas and cylinder-specific formulas'
        ],
        differentiation: {
            emergent: 'Provide real cylinders/pictures for every problem. Unroll toilet paper to show rectangle = lateral surface. Have students re-roll and unroll to see circumference = rectangle edge.',
            ell: 'Clarify "net" vocabulary (not a catching net). Make sure students know "base" in this context.',
            extending: 'Explore more complex cylinder problems. Calculate volume and surface area of composite shapes.'
        },
        essential_understandings: [
            'Students make nets of cylinders to understand surface area',
            'Teachers ensure students correctly view cylinder height regardless of orientation',
            'Students label dimensions on cylinders drawn both 3D and as nets'
        ]
    },

    'similarity and scaling': {
        grade: 7,
        slug: '732a-similarity-scaling-2-dimensions',
        title: '7.3.2A Similarity & Scaling in 2 Dimensions',
        misconceptions: [
            'Students confuse congruence with similarity',
            'Students confuse notation (≅ for congruent vs ~ for similar)',
            'Common misconception: when dimensions are doubled, area is doubled too (actually quadrupled)',
            'Students confuse additive vs multiplicative thinking (adding 3 to both sides instead of multiplying by scale factor)'
        ],
        differentiation: {
            emergent: 'Provide calculators and labeled diagrams. Keep diagrams in same orientation. Provide grid paper for measurement.',
            ell: 'Review and demonstrate definition of scale. Use Knowledge Cards for rehearsing procedures and terms.',
            extending: 'Scale up real-world objects (like designing a fantasy home). Explore similarity ratios in depth.'
        },
        essential_understandings: [
            'Students measure side lengths, angles, and trace figures to find relationships',
            'Teachers use many models to demonstrate finding missing side lengths',
            'Students use various problem-solving strategies to determine if figures are similar'
        ]
    },

    'translations and reflections': {
        grade: 7,
        slug: '732b-translations-reflections-coordinate-grid',
        title: '7.3.2B Translations & Reflections on a Coordinate Grid',
        misconceptions: [
            'Students believe reflection over y = x or y = -x is like a rotation',
            'Students confuse math vocabulary (reflection, rotation, translation) with elementary terms (flip, turn, slide)',
            'Students identify incorrect line of symmetry (x-axis vs y-axis) when reflecting',
            'Students apply wrong labels to transformed images (wrong letter or missing prime notation)'
        ],
        differentiation: {
            emergent: 'Review coordinate grid and plotting points first. Fold paper to check reflections. Use large grid paper (1/2 inch). Give multiple choice rather than open-ended.',
            ell: 'Print transformation reference pages. Have students trace and cut out original figures for physical reflection/translation.',
            extending: 'Perform two transformations on same figure. Predict positions after multiple transformations.'
        },
        essential_understandings: [
            'Students identify the line being reflected over',
            'Teachers remind students to fold papers to check reflections',
            'Students write translations using proper notation (A\'B\'C\')'
        ]
    },

    'mean median and range': {
        grade: 7,
        slug: '741-mean-median-range',
        title: '7.4.1 Mean, Median & Range',
        misconceptions: [
            'With even-numbered data sets, students struggle to see median may not be listed and could be the mean of middle two numbers',
            'When using calculators for mean, students forget order of operations (entering 2+3+4+5+6/5 in one line)',
            'Students struggle to understand the effect of removing a value on the mean'
        ],
        differentiation: {
            emergent: 'Put numbers in order for students. Use no more than 6 data pieces. Collect data requiring movement (like pulse after jumping jacks). Fold paper strips to find median.',
            ell: 'Provide essential vocabulary list (mean, median, range) a day or two before lesson. Use simplified English.',
            extending: 'Analyze effects of outliers on measures. Compare data sets and determine best measure of center.'
        },
        essential_understandings: [
            'Students collect meaningful data and calculate mean, median, and range',
            'Teachers ask "what would happen if" questions about data sets',
            'Students use graphing technologies to calculate measures and display data'
        ]
    },

    'circle graphs and histograms': {
        grade: 7,
        slug: '742-circle-graphs-and-histograms',
        title: '7.4.2 Circle Graphs and Histograms',
        misconceptions: [
            'Students use percent of circle and graph for degrees instead of finding degrees (percent x 360)',
            'Students choose wrong graph type for given data',
            'Students confuse histograms with bar graphs',
            'Students do not use equal intervals on horizontal axis of histograms',
            'Students make calculation errors in pie charts so sections do not add to 100%'
        ],
        differentiation: {
            emergent: 'Help organize data tables. Trace circular objects instead of using compass. Help determine best histogram intervals. Encourage frequency tables before histograms.',
            ell: 'Have students make tables comparing bar graphs and histograms. Write step-by-step instructions for creating pie charts.',
            extending: 'Find real-world examples of histograms and circle graphs. Compare and analyze data from multiple graph types.'
        },
        essential_understandings: [
            'Students read various graphs and use proportional reasoning to analyze data',
            'Teachers require both pie charts and histograms',
            'Students use technology to create circle graphs and histograms'
        ]
    },

    'probability and proportionality': {
        grade: 7,
        slug: '743-probability-proportionality',
        title: '7.4.3 Probability & Proportionality',
        misconceptions: [
            'Students think odds of an event is the same as probability',
            'Students believe probability can be a number larger than 1',
            'Students get confused when probability involves a fraction of area',
            'Students think histograms are just condensed bar graphs',
            'Students think all situations have a known expected probability (some must be determined from data)',
            'Students do not connect that histograms of experimental data should be proportional to another'
        ],
        differentiation: {
            emergent: 'Provide visual aids. Use concise processes. Help students learn concepts: certain, probable, unlikely, impossible. Use online probability practice and games.',
            ell: 'Create visual glossaries. Use think/pair/share to increase participation. Partner with strong English speakers.',
            extending: 'Explore compound probability. Use graphing calculators for simulations. Design and analyze probability experiments.'
        },
        essential_understandings: [
            'Students use organized lists to find outcomes and find probability as fractions, decimals, and percents',
            'Teachers model strategies for finding probabilities and pose thought-provoking questions',
            'Students compare relative frequencies and probabilities'
        ]
    },

    // ======================== GRADE 8 (10 topics) ========================

    'rational irrational and real numbers': {
        grade: 8,
        slug: '811a-rational-irrational-real-numbers',
        title: '8.1.1A Rational, Irrational & Real Numbers',
        misconceptions: [
            'Students lose meaning of the value of square roots',
            'Students think any number that "goes on forever" is irrational',
            'Students divide by 2 instead of taking square root (most commonly simplify √2 to 1)',
            'Students think irrational numbers are irrelevant, just another thing to memorize',
            'Students assume a square root is always irrational',
            'Students mistake 22/7 as irrational because they believe 22/7 = π (instead of being an approximation)',
            'Students assume radicals of fractions are irrational because the fraction is not a perfect square of an integer'
        ],
        differentiation: {
            emergent: 'Make a list of perfect squares to reference. On number line, label integers above and equivalent square roots below. Write out steps for estimating square root values.',
            ell: 'Connect to concrete examples. Use labeled number lines with both integer and square root representations.',
            extending: 'Explore relationships between rational and irrational numbers. Investigate patterns in square roots.'
        },
        essential_understandings: [
            'Students order and compare all real numbers on a number line',
            'Teachers help students make meaning of square roots by comparing to perfect squares',
            'Teachers connect irrational numbers to Pythagorean Theorem learning'
        ]
    },

    'integer exponents and scientific notation': {
        grade: 8,
        slug: '811b-integer-exponents-scientific-notation',
        title: '8.1.1B Integer Exponents & Scientific Notation',
        misconceptions: [
            'Students mistake exponent as number of zeros to append instead of number of times to multiply by ten',
            'When multiplying/dividing in scientific notation, students forget to verify answer is in correct notation',
            'On calculators, students overlook the E notation (scientific notation part) and only read the first number',
            'Students sometimes multiply the base numbers AND the powers of ten separately without combining correctly'
        ],
        differentiation: {
            emergent: 'Use resources for multiplying and dividing in scientific notation. Provide graphic organizers.',
            ell: 'Differentiate by size of numbers used and number of problems. Students research when scientific notation is helpful.',
            extending: 'Research real-world situations using scientific notation. Evaluate when scientific notation makes sense vs standard form.'
        },
        essential_understandings: [
            'Students write numbers in expanded form to learn exponent rules',
            'Teachers remind students to repeatedly multiply/divide by ten to convert notation',
            'Students write sentences describing rules of exponents'
        ]
    },

    'linear and nonlinear functions': {
        grade: 8,
        slug: '821-linear-nonlinear-functions',
        title: '8.2.1 Linear & Nonlinear Functions',
        misconceptions: [
            'Students consider x = 10 a linear function (it is a linear equation but not a function)',
            'Students confuse f (the function name) with f(x) (the output)',
            'Students think f is the only letter that can be used for functions',
            'In f(x) = mx + b, students switch m and b (calling m the y-intercept)',
            'Students initially think f(x) means f times x',
            'When x values in a table are not increasing by 1, students cannot identify linear patterns'
        ],
        differentiation: {
            emergent: 'Use function machines to investigate input/output relationships. Develop graphic organizers with examples and non-examples. Practice pattern-finding before function notation.',
            ell: 'Use visual aids and function machine websites. Develop Frayer Models for vocabulary.',
            extending: 'Compare arithmetic and geometric sequences. Write functions for various real-world situations.'
        },
        essential_understandings: [
            'Students connect what they know about linear relationships to function notation',
            'Teachers scaffold by connecting to prior knowledge of linear and non-linear relationships',
            'Students examine what happens to output when input changes a specific amount'
        ]
    },

    'sequences and linear functions': {
        grade: 8,
        slug: '822-sequences-linear-functions',
        title: '8.2.2 Sequences & Linear Functions',
        misconceptions: [
            'When first table entry is not x=0, students give first y-value as y-intercept instead of the y-value at x=0',
            'When calculating slope from graph, students do not pay attention to direction of rise/run (sign errors)',
            'With non-consecutive x-values in tables, students only look at change in y (ignoring change in x)',
            'Students get confused about which value is the y-intercept in sequences',
            'Students jump to conclusions about patterns by looking at only the first two terms'
        ],
        differentiation: {
            emergent: 'Give multiple opportunities for translation between graph, table, equation, and situation. Do matching activities for representations. Use partners to describe process.',
            ell: 'Use videos to remind students of translation steps. Look through magazines for real-world slope examples.',
            extending: 'Look at families of functions. Compare groups of functions with something in common. Explore effects of changing parameters.'
        },
        essential_understandings: [
            'Students use graphing technologies to explore effects of changing the m value',
            'Teachers ask: What happens when m is greater, smaller, negative, or zero?',
            'Students explore and create more than one representation of each linear function'
        ]
    },

    'algebraic expressions': {
        grade: 8,
        slug: '823-algebraic-expressions',
        title: '8.2.3 Algebraic Expressions',
        misconceptions: [
            'Students combine unlike terms (2x + 5 = 7x, or 2x + 3x² = 5x²)',
            'PEMDAS misuse: students think multiplication always before division, addition always before subtraction',
            'Non-scientific calculators perform operations in order entered, not by order of operations',
            'Students remember property rules but confuse the names or forget them'
        ],
        differentiation: {
            emergent: 'Use algebra tiles for distributive property (5(x+2)). Use real-world items: 5(2 apples + 6 oranges) = 10 apples + 30 oranges. Provide step-by-step procedure sheets.',
            ell: 'Use area models for distributive property. Provide visual step-by-step instructions for evaluating expressions.',
            extending: 'Apply properties to simplify complex multi-step expressions. Connect algebraic properties to real-life meanings.'
        },
        essential_understandings: [
            'Students evaluate algebraic expressions for given values',
            'Teachers teach distributive property using area models',
            'Students justify steps when simplifying algebraic expressions'
        ]
    },

    'representations of linear equations': {
        grade: 8,
        slug: '824a-representations-linear-equations',
        title: '8.2.4A Representations of Linear Equations',
        misconceptions: [
            'Students have difficulty interpreting phrases indicating inequalities',
            'Students may not understand difference between proportional and non-proportional linear relationships',
            'Students think standard form (Ax + By = C) is not linear because they are used to y = mx + b',
            'Students give wrong slope from standard form because they are accustomed to slope-intercept form'
        ],
        differentiation: {
            emergent: 'Do matching activities for different representations of linear functions. Use graphic organizers like "How to Find the Equation of a Line."',
            ell: 'Use vocabulary games like Vocabulary Toss. Graphic organizers provide a place to start for problem-solving.',
            extending: 'Work with variety of starting information (slope + y-intercept, slope + point, two points). Convert between forms.'
        },
        essential_understandings: [
            'Students work with variety of starting information to write linear equations',
            'Teachers build on prior knowledge of proportional relationships',
            'Students take one form of linear equation and match to equivalent forms'
        ]
    },

    'solve equations inequalities and systems': {
        grade: 8,
        slug: '824b-solve-represent-equations-inequalities-systems',
        title: '8.2.4B Solve & Represent Equations, Inequalities, & Systems',
        misconceptions: [
            'When solution is greater than 4, students record answer as 5 or greater (ignoring numbers between 4 and 5)',
            'Students think inequality symbols indicate direction of number line shading',
            'Students forget to flip inequality when multiplying/dividing by negative',
            'Students forget to find both solutions when solving with absolute values',
            'Students forget that system solution is the intersection point'
        ],
        differentiation: {
            emergent: 'Introduce with manipulatives (blocks, chips) so students understand maintaining equality. Then connect to solving without manipulatives. Use graphic organizers for step-by-step processes.',
            ell: 'Use graphic organizers for solving systems by substitution and linear combination. Provide finding slope organizers.',
            extending: 'Solve complex systems and explore systems with no or infinite solutions.'
        },
        essential_understandings: [
            'Students solve systems symbolically and graph to make sense of answers',
            'Teachers use number lines to show all possible solutions to inequalities',
            'Students describe inequality solutions in words before writing mathematically'
        ]
    },

    'pythagorean theorem': {
        grade: 8,
        slug: '831pythagorean-theorem',
        title: '8.3.1 Pythagorean Theorem',
        misconceptions: [
            'Students miss that this works ONLY for right triangles',
            'Students just add side lengths (a + b = c) instead of using squares',
            'Students do a² + b² = c and forget to take the square root of c²',
            'Students substitute hypotenuse for a or b instead of c',
            'On dot paper, students count dots instead of measuring length in units'
        ],
        differentiation: {
            emergent: 'Encourage drawing squares off side lengths to reinforce the concrete (good for ALL students). Keep using visual representations.',
            ell: 'Use hands-on activities with math manipulatives (multiple learning modalities). Rewrite word problems with fewer and easier words.',
            extending: 'Derive the theorem. Solve 3D problems using Pythagorean theorem. Explore non-right triangles to confirm it does not work.'
        },
        essential_understandings: [
            'Students draw right triangles, draw squares off each side, find areas of squares',
            'Teachers emphasize that even when using the formula, drawing a sketch reinforces identifying legs and hypotenuse',
            'Students use pictorial representations when stuck on problems'
        ]
    },

    'slope parallel and perpendicular lines': {
        grade: 8,
        slug: '832-slope-parallel-perpendicular-lines',
        title: '8.3.2 Slope of Parallel & Perpendicular Lines',
        misconceptions: [
            'Students assume lines are parallel or perpendicular without checking slopes',
            'Students have difficulty understanding negative reciprocal',
            'Students do not pay attention to sign of slope (positive vs negative)',
            'Students do not recognize equivalent slopes (2/3 and 4/6)',
            'Students believe line segments are either parallel or perpendicular and nothing else',
            'Students do not recognize that different length segments can have the same slope'
        ],
        differentiation: {
            emergent: 'Use step-by-step lesson plans for parallel and perpendicular. Students can count slope "up and over." Draw on transparencies and rotate to help with oblique orientations.',
            ell: 'Use Knowledge Cards for procedures and terms. Review and demonstrate definition of scale.',
            extending: 'Graph three equations with same slope and find another. Graph perpendicular pairs and find the pattern. Apply to quadrilateral identification.'
        },
        essential_understandings: [
            'Students graph equations with same slope and look for similarities',
            'Students graph equations with negative reciprocal slopes and identify perpendicular relationship',
            'Teachers give students opportunities to compare variety of lines on graphs'
        ]
    },

    'scatterplots and lines of best fit': {
        grade: 8,
        slug: '841-scatterplots-lines-best-fit-and-predictions',
        title: '8.4.1 Scatterplots, Lines of Best Fit, and Predictions',
        misconceptions: [
            'Students only choose plotted data points for line of best fit (line may not go through any points)',
            'Students think line of best fit must go through (0,0)',
            'Students lose meaning of rate of change and do not connect to context and variables',
            'Students confuse positive and negative correlation direction'
        ],
        differentiation: {
            emergent: 'Separate skills: creating scatterplot vs drawing line of best fit vs finding equation. Do not require all at once.',
            ell: 'Use visual aids (transparencies, overhead calculators, projectors). Collect data exploring meaningful relationships. Encourage creating survey questions for speaking practice.',
            extending: 'Find equations of trend lines. Use trend lines for predictions. Compare estimated lines to actual regression lines.'
        },
        essential_understandings: [
            'Students use spaghetti to approximate lines of best fit',
            'Teachers ask "How do you know which lines are a better fit?"',
            'Students go back to original context to check if rate of change, y-intercept, and predictions are reasonable'
        ]
    }
};
