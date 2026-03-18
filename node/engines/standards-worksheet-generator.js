/**
 * StandardsWorksheetGenerator — Auto-generate PDF worksheets by standard
 *
 * For a selected grade (5, 6, 7, 8, or 10), iterates every MN07 benchmark,
 * generates ONE problem at the benchmark's cognitive complexity level
 * (A → DOK 1, B → DOK 2, C → DOK 3), and renders a multi-page PDF
 * organized by strand.
 *
 * Dependencies: jsPDF (CDN), StandardsDB, ProblemGenerator / DOK_PROBLEMS
 * IIFE pattern, zero server dependencies
 */

const StandardsWorksheetGenerator = (() => {

    // ════════════════════════════════════════════════
    //  PAGE CONSTANTS
    // ════════════════════════════════════════════════
    const PAGE_W = 612;
    const PAGE_H = 792;
    const MARGIN = 50;
    const CONTENT_W = PAGE_W - MARGIN * 2;
    const LINE_H = 13;

    // ════════════════════════════════════════════════
    //  DESIGN TOKENS
    // ════════════════════════════════════════════════
    const COLORS = {
        navy:   [30, 39, 97],
        amber:  [212, 135, 15],
        teal:   [13, 148, 136],
        blue:   [59, 130, 246],
        pink:   [232, 67, 109],
        purple: [124, 58, 237],
        slate:  [100, 116, 139],
        dark:   [30, 41, 59],
        light:  [148, 163, 184],
        white:  [255, 255, 255],
        bg:     [248, 250, 252],
        line:   [226, 232, 240],
    };

    const COMPLEXITY_COLORS = {
        A: COLORS.teal,
        B: COLORS.blue,
        C: COLORS.pink,
    };

    const COMPLEXITY_LABELS = {
        A: 'Recall',
        B: 'Skill / Concept',
        C: 'Strategic Thinking',
    };

    const STRAND_COLORS = {
        'Number & Operation':          COLORS.teal,
        'Algebra':                     COLORS.blue,
        'Geometry & Measurement':      COLORS.amber,
        'Data Analysis & Probability': COLORS.purple,
    };

    // ════════════════════════════════════════════════
    //  MN07 BENCHMARK DATABASE (Grades 6-8)
    //  Source: digester/standards.py
    // ════════════════════════════════════════════════

    const MN07_BENCHMARKS = {

        // ─── GRADE 5 ───────────────────────────────────────
        5: {
            '5.1.1.1': { desc: 'Divide multi-digit numbers using efficient and generalizable procedures based on place value, including standard algorithms.', strand: 'Number & Operation', complexity: 'A', vocab: ['quotient', 'dividend', 'divisor', 'remainder'] },
            '5.1.1.2': { desc: 'Consider the context in which a problem is situated to select the most useful form of the quotient for the solution, and interpret the remainder.', strand: 'Number & Operation', complexity: 'B', vocab: ['quotient', 'remainder', 'interpret'] },
            '5.1.1.3': { desc: 'Estimate solutions to arithmetic problems to assess reasonableness of results.', strand: 'Number & Operation', complexity: 'B', vocab: ['estimate', 'reasonable'] },
            '5.1.2.1': { desc: 'Add and subtract decimals and fractions using efficient and generalizable procedures, including standard algorithms.', strand: 'Number & Operation', complexity: 'A', vocab: ['common denominator', 'decimal', 'sum', 'difference'] },
            '5.1.2.2': { desc: 'Model addition and subtraction of fractions and decimals using a variety of representations.', strand: 'Number & Operation', complexity: 'B', vocab: ['model', 'representation'] },
            '5.1.2.3': { desc: 'Estimate sums and differences of decimals and fractions to assess reasonableness of results.', strand: 'Number & Operation', complexity: 'B', vocab: ['estimate', 'benchmark fraction'] },
            '5.1.2.4': { desc: 'Solve real-world and mathematical problems requiring addition and subtraction of decimals, fractions and mixed numbers, including those involving measurement.', strand: 'Number & Operation', complexity: 'B', vocab: ['mixed number', 'measurement'] },
            '5.1.3.1': { desc: 'Multiply multi-digit numbers using efficient and generalizable procedures based on place value.', strand: 'Number & Operation', complexity: 'A', vocab: ['product', 'factor', 'algorithm'] },
            '5.1.3.2': { desc: 'Solve real-world and mathematical problems requiring multiplication and division, including multi-step problems.', strand: 'Number & Operation', complexity: 'B', vocab: ['multi-step'] },
            '5.2.1.1': { desc: 'Create and use rules, tables, spreadsheets and graphs to describe patterns of change and solve problems.', strand: 'Algebra', complexity: 'B', vocab: ['pattern', 'rule', 'table', 'graph'] },
            '5.2.1.2': { desc: 'Use a rule or table to represent ordered pairs of positive integers and graph these ordered pairs on a coordinate system.', strand: 'Algebra', complexity: 'B', vocab: ['ordered pair', 'coordinate', 'graph'] },
            '5.2.2.1': { desc: 'Apply the commutative, associative and distributive properties and order of operations to generate equivalent numerical expressions.', strand: 'Algebra', complexity: 'A', vocab: ['commutative', 'associative', 'distributive', 'order of operations'] },
            '5.3.1.1': { desc: 'Describe and classify three-dimensional figures including cubes, prisms and pyramids by the number of edges, faces or vertices.', strand: 'Geometry & Measurement', complexity: 'A', vocab: ['face', 'edge', 'vertex', 'prism', 'pyramid'] },
            '5.3.1.2': { desc: 'Determine the volume of right rectangular prisms with whole number edge lengths using V = l × w × h.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['volume', 'rectangular prism', 'cubic unit'] },
            '5.3.2.1': { desc: 'Develop and use formulas to determine the area of triangles, parallelograms and figures that can be decomposed.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['area', 'base', 'height', 'parallelogram'] },
            '5.3.2.2': { desc: 'Use various tools and strategies to measure the volume and surface area of objects that are shaped like rectangular prisms.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['surface area', 'volume'] },
            '5.4.1.1': { desc: 'Know and use the definitions of the mean, median and range of a set of data.', strand: 'Data Analysis & Probability', complexity: 'A', vocab: ['mean', 'median', 'range'] },
            '5.4.1.2': { desc: 'Create and analyze double-bar graphs and line graphs by applying understanding of whole numbers and fractions.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['double-bar graph', 'line graph'] },
        },

        // ─── GRADE 6 ───────────────────────────────────────
        6: {
            '6.1.1.1': { desc: 'Locate positive rational numbers on a number line and plot pairs of positive rational numbers on a coordinate grid.', strand: 'Number & Operation', complexity: 'B', vocab: ['coordinate grid', 'rational number'] },
            '6.1.1.2': { desc: 'Compare positive rational numbers represented in various forms; use symbols.', strand: 'Number & Operation', complexity: 'A', vocab: ['inequality'] },
            '6.1.1.3': { desc: 'Understand that percent represents parts out of 100; convert among fractions, decimals and percents.', strand: 'Number & Operation', complexity: 'B', vocab: ['percent', 'equivalent'] },
            '6.1.1.4': { desc: 'Determine equivalences among fractions, decimals and percents; select from among these representations to solve problems.', strand: 'Number & Operation', complexity: 'B', vocab: ['equivalent', 'percent'] },
            '6.1.2.1': { desc: 'Identify and use ratios to compare quantities; understand that ratios can be expressed as fractions, with colon notation, or with words.', strand: 'Number & Operation', complexity: 'B', vocab: ['ratio', 'proportion'] },
            '6.1.2.2': { desc: 'Apply concept of unit rate and use it to solve real-world problems, including comparison shopping.', strand: 'Number & Operation', complexity: 'B', vocab: ['unit rate', 'proportion'] },
            '6.1.2.3': { desc: 'Determine the rate for ratios of quantities with different units.', strand: 'Number & Operation', complexity: 'B', vocab: ['rate', 'unit'] },
            '6.1.3.1': { desc: 'Multiply and divide decimals and fractions, using efficient and generalizable procedures, including standard algorithms.', strand: 'Number & Operation', complexity: 'A', vocab: ['algorithm', 'product', 'quotient'] },
            '6.1.3.2': { desc: 'Use the relationship between decimals and fractions, as well as the relationship between finite decimals, to solve problems.', strand: 'Number & Operation', complexity: 'B', vocab: ['terminating decimal', 'finite'] },
            '6.1.3.3': { desc: 'Calculate the percent of a number and determine what percent one number is of another.', strand: 'Number & Operation', complexity: 'B', vocab: ['percent'] },
            '6.2.1.1': { desc: 'Understand that a variable can be used to represent a quantity that can change, often in relationship to another quantity.', strand: 'Algebra', complexity: 'B', vocab: ['variable', 'expression'] },
            '6.2.2.1': { desc: 'Apply associative, commutative and distributive properties and order of operations to generate equivalent expressions.', strand: 'Algebra', complexity: 'A', vocab: ['associative', 'commutative', 'distributive'] },
            '6.2.2.2': { desc: 'Use properties of arithmetic to generate equivalent numerical expressions and evaluate expressions involving positive rational numbers.', strand: 'Algebra', complexity: 'B', vocab: ['evaluate', 'expression'] },
            '6.3.1.1': { desc: 'Calculate area of triangles and quadrilaterals by composing and decomposing into triangles and rectangles.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['area', 'triangle', 'quadrilateral'] },
            '6.3.1.2': { desc: 'Estimate the area of irregular figures on a grid.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['irregular', 'area'] },
            '6.3.2.1': { desc: 'Solve problems using the relationships between angles formed by intersecting lines.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['supplementary', 'vertical', 'angle'] },
            '6.4.1.1': { desc: 'Determine the sample space for a given experiment and determine the probability of events.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['sample space', 'probability'] },
            '6.4.1.2': { desc: 'Determine the number of possible outcomes of a compound event by creating organized lists, tree diagrams, and tables.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['compound event', 'outcome'] },
            '6.4.1.3': { desc: 'Use the relationship between experimental and theoretical probability.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['experimental', 'theoretical'] },
        },

        // ─── GRADE 7 ───────────────────────────────────────
        7: {
            '7.1.1.1': { desc: 'Know that every rational number can be written as the ratio of two integers or as a terminating or repeating decimal. Recognize that π is not rational.', strand: 'Number & Operation', complexity: 'B', vocab: ['terminating', 'repeating', 'rational', 'irrational'] },
            '7.1.1.2': { desc: 'Understand that division of two integers always results in a rational number. Interpret decimal results using a calculator.', strand: 'Number & Operation', complexity: 'B', vocab: ['terminating', 'repeating'] },
            '7.1.1.3': { desc: 'Locate positive and negative rational numbers on a number line, understand opposites, and plot pairs on a coordinate grid.', strand: 'Number & Operation', complexity: 'B', vocab: ['opposite', 'coordinate', 'origin'] },
            '7.1.1.4': { desc: 'Compare positive and negative rational numbers expressed in various forms using <, >, =, ≤, ≥.', strand: 'Number & Operation', complexity: 'A', vocab: [] },
            '7.1.1.5': { desc: 'Recognize and generate equivalent representations of positive and negative rational numbers, including equivalent fractions.', strand: 'Number & Operation', complexity: 'B', vocab: ['equivalent'] },
            '7.1.2.1': { desc: 'Add, subtract, multiply and divide positive and negative rational numbers; raise positive rational numbers to whole-number exponents.', strand: 'Number & Operation', complexity: 'A', vocab: ['exponent'] },
            '7.1.2.2': { desc: 'Use real-world contexts and inverse relationships to explain arithmetic with negative rational numbers.', strand: 'Number & Operation', complexity: 'B', vocab: ['inverse'] },
            '7.1.2.3': { desc: 'Understand that calculators and other computing technologies often truncate or round numbers.', strand: 'Number & Operation', complexity: 'A', vocab: ['truncate', 'round'] },
            '7.1.2.4': { desc: 'Solve problems involving calculations with positive and negative rational numbers, including simple and compound interest.', strand: 'Number & Operation', complexity: 'B', vocab: ['simple interest', 'compound interest'] },
            '7.1.2.5': { desc: 'Use proportional reasoning to solve problems involving ratios in various contexts.', strand: 'Number & Operation', complexity: 'B', vocab: ['proportion', 'ratio'] },
            '7.1.2.6': { desc: 'Demonstrate understanding of the relationship between absolute value and distance on a number line.', strand: 'Number & Operation', complexity: 'B', vocab: ['absolute value'] },
            '7.2.1.1': { desc: 'Understand that a proportional relationship can be expressed as y/x = k or y = kx. Distinguish from other relationships.', strand: 'Algebra', complexity: 'B', vocab: ['proportional', 'constant of proportionality'] },
            '7.2.1.2': { desc: 'Understand that the graph of a proportional relationship is a line through the origin whose slope is the unit rate.', strand: 'Algebra', complexity: 'B', vocab: ['origin', 'slope', 'unit rate'] },
            '7.2.2.1': { desc: 'Represent proportional relationships with tables, descriptions, symbols, equations and graphs; translate between representations.', strand: 'Algebra', complexity: 'B', vocab: ['proportional', 'constant of proportionality'] },
            '7.2.2.2': { desc: 'Solve multi-step problems involving proportional relationships (discounts, tax, percent of change).', strand: 'Algebra', complexity: 'C', vocab: ['discount', 'tax', 'percent of change'] },
            '7.2.2.3': { desc: 'Use knowledge of proportions to assess the reasonableness of solutions.', strand: 'Algebra', complexity: 'B', vocab: ['proportion', 'reasonable'] },
            '7.2.2.4': { desc: 'Represent real-world situations using equations and inequalities involving variables and rational numbers.', strand: 'Algebra', complexity: 'B', vocab: ['equation', 'inequality', 'variable'] },
            '7.2.3.1': { desc: 'Use properties of algebra to generate equivalent expressions (associative, commutative, distributive laws).', strand: 'Algebra', complexity: 'A', vocab: ['associative', 'commutative', 'distributive'] },
            '7.2.3.2': { desc: 'Evaluate algebraic expressions containing rational numbers and whole number exponents at specified values.', strand: 'Algebra', complexity: 'B', vocab: ['evaluate', 'substitute'] },
            '7.2.3.3': { desc: 'Apply understanding of order of operations and grouping symbols when using calculators.', strand: 'Algebra', complexity: 'A', vocab: ['order of operations'] },
            '7.2.4.1': { desc: 'Represent relationships with equations involving variables and rational numbers. Use properties of equality to solve.', strand: 'Algebra', complexity: 'B', vocab: ['equation', 'variable', 'properties of equality'] },
            '7.2.4.2': { desc: 'Solve equations resulting from proportional relationships in various contexts.', strand: 'Algebra', complexity: 'B', vocab: ['proportion'] },
            '7.3.1.1': { desc: 'Demonstrate the proportional relationship between diameter and circumference (π). Calculate circumference and area of circles.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['radius', 'diameter', 'circumference', 'π'] },
            '7.3.1.2': { desc: 'Calculate the volume and surface area of cylinders and justify the formulas used.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['cylinder', 'volume', 'surface area'] },
            '7.3.2.1': { desc: 'Describe properties of similarity, compare geometric figures for similarity and determine scale factors.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['similar', 'scale factor', 'congruent'] },
            '7.3.2.2': { desc: 'Apply scale factors, length ratios and area ratios to determine side lengths and areas of similar geometric figures.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['similar', 'scale factor'] },
            '7.3.2.3': { desc: 'Use proportions and ratios to solve problems involving scale drawings and conversions of measurement units.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['scale drawing', 'conversion'] },
            '7.3.2.4': { desc: 'Graph and describe translations and reflections of figures on a coordinate grid.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['translation', 'reflection', 'transformation'] },
            '7.4.1.1': { desc: 'Design simple experiments and collect data. Determine mean, median and range. Draw conclusions and make predictions.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['mean', 'median', 'range'] },
            '7.4.1.2': { desc: 'Describe the impact of inserting or deleting a data point on the mean and median.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['outlier'] },
            '7.4.2.1': { desc: 'Use reasoning with proportions to display and interpret data in circle graphs and histograms.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['circle graph', 'histogram'] },
            '7.4.3.1': { desc: 'Use random numbers to simulate situations involving randomness and compare results to known probabilities.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['random', 'simulation'] },
            '7.4.3.2': { desc: 'Calculate probability as a fraction of sample space or area. Express probabilities as percents, decimals and fractions.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['probability', 'sample space'] },
            '7.4.3.3': { desc: 'Use proportional reasoning to draw conclusions about and predict relative frequencies based on probabilities.', strand: 'Data Analysis & Probability', complexity: 'C', vocab: ['relative frequency', 'probability'] },
        },

        // ─── GRADE 8 ───────────────────────────────────────
        8: {
            '8.1.1.1': { desc: 'Classify real numbers as rational or irrational. Know that √ of a non-perfect-square is irrational.', strand: 'Number & Operation', complexity: 'B', vocab: ['irrational', 'real', 'square root'] },
            '8.1.1.2': { desc: 'Compare real numbers; locate on a number line. Identify √ of a positive integer as integer or between two consecutive integers.', strand: 'Number & Operation', complexity: 'B', vocab: ['square root', 'consecutive'] },
            '8.1.1.3': { desc: 'Determine rational approximations for solutions involving real numbers.', strand: 'Number & Operation', complexity: 'B', vocab: ['approximation'] },
            '8.1.1.4': { desc: 'Know and apply properties of positive and negative integer exponents to generate equivalent numerical expressions.', strand: 'Number & Operation', complexity: 'B', vocab: ['exponent', 'base', 'power'] },
            '8.1.1.5': { desc: 'Express approximations using scientific notation; multiply and divide numbers in scientific notation.', strand: 'Number & Operation', complexity: 'B', vocab: ['scientific notation', 'significant digits'] },
            '8.2.1.1': { desc: 'Understand that a function is a relationship between independent and dependent variables. Use f(x) notation.', strand: 'Algebra', complexity: 'B', vocab: ['function', 'independent', 'dependent'] },
            '8.2.1.2': { desc: 'Use linear functions to represent relationships where change in input leads to constant-times-that change in output.', strand: 'Algebra', complexity: 'B', vocab: ['linear', 'coefficient'] },
            '8.2.1.3': { desc: 'Understand that a function is linear if f(x) = mx + b or its graph is a straight line.', strand: 'Algebra', complexity: 'B', vocab: ['linear', 'slope-intercept'] },
            '8.2.1.4': { desc: 'Understand that an arithmetic sequence is a linear function f(x) = mx + b.', strand: 'Algebra', complexity: 'B', vocab: ['arithmetic sequence', 'common difference'] },
            '8.2.1.5': { desc: 'Understand that a geometric sequence is a non-linear function f(x) = ab^x.', strand: 'Algebra', complexity: 'B', vocab: ['geometric sequence', 'common ratio', 'exponential'] },
            '8.2.2.1': { desc: 'Represent linear functions with tables, descriptions, symbols, equations and graphs; translate between representations.', strand: 'Algebra', complexity: 'B', vocab: ['linear function'] },
            '8.2.2.2': { desc: 'Identify graphical properties of linear functions including slopes and intercepts.', strand: 'Algebra', complexity: 'B', vocab: ['slope', 'intercept', 'rate of change'] },
            '8.2.2.3': { desc: 'Identify how coefficient changes in f(x) = mx + b affect graphs of linear functions.', strand: 'Algebra', complexity: 'B', vocab: ['coefficient', 'constant'] },
            '8.2.2.4': { desc: 'Represent arithmetic sequences using equations, tables, graphs and verbal descriptions.', strand: 'Algebra', complexity: 'B', vocab: ['arithmetic sequence', 'progression'] },
            '8.2.2.5': { desc: 'Represent geometric sequences using equations, tables, graphs and verbal descriptions.', strand: 'Algebra', complexity: 'B', vocab: ['geometric sequence', 'progression'] },
            '8.2.3.1': { desc: 'Evaluate algebraic expressions including radicals and absolute values at specified values.', strand: 'Algebra', complexity: 'A', vocab: ['evaluate'] },
            '8.2.3.2': { desc: 'Justify steps in generating equivalent expressions by identifying properties.', strand: 'Algebra', complexity: 'B', vocab: ['associative', 'commutative', 'distributive'] },
            '8.2.4.1': { desc: 'Use linear equations to represent situations involving constant rate of change.', strand: 'Algebra', complexity: 'B', vocab: ['rate of change', 'linear'] },
            '8.2.4.2': { desc: 'Solve multi-step equations in one variable. Solve for one variable in a multi-variable equation.', strand: 'Algebra', complexity: 'B', vocab: ['multi-step', 'properties of equality'] },
            '8.2.4.3': { desc: 'Express linear equations in slope-intercept, point-slope and standard forms; convert between them.', strand: 'Algebra', complexity: 'B', vocab: ['slope-intercept', 'point-slope', 'standard form'] },
            '8.2.4.4': { desc: 'Use linear inequalities to represent relationships in various contexts.', strand: 'Algebra', complexity: 'B', vocab: ['inequality'] },
            '8.2.4.5': { desc: 'Solve linear inequalities using properties of inequalities. Graph solutions on a number line.', strand: 'Algebra', complexity: 'B', vocab: ['inequality', 'solution set'] },
            '8.2.4.6': { desc: 'Represent relationships involving absolute value of a linear expression. Solve and graph solutions.', strand: 'Algebra', complexity: 'B', vocab: ['absolute value'] },
            '8.2.4.7': { desc: 'Represent relationships using systems of linear equations. Solve symbolically, graphically and numerically.', strand: 'Algebra', complexity: 'C', vocab: ['system of equations'] },
            '8.2.4.8': { desc: 'Understand that a system of linear equations may have 0, 1, or infinite solutions. Relate to intersecting/parallel/identical lines.', strand: 'Algebra', complexity: 'B', vocab: ['system of equations', 'parallel'] },
            '8.2.4.9': { desc: 'Use the relationship between square roots and squares to solve problems.', strand: 'Algebra', complexity: 'B', vocab: ['square root'] },
            '8.3.1.1': { desc: 'Use the Pythagorean Theorem to solve problems involving right triangles.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['Pythagorean Theorem', 'hypotenuse'] },
            '8.3.1.2': { desc: 'Determine distance between two points using the Pythagorean Theorem in a coordinate system.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['distance'] },
            '8.3.1.3': { desc: 'Informally justify the Pythagorean Theorem using measurements, diagrams and computer software.', strand: 'Geometry & Measurement', complexity: 'C', vocab: ['Pythagorean Theorem'] },
            '8.3.2.1': { desc: 'Understand and apply relationships between slopes of parallel and perpendicular lines.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['parallel', 'perpendicular', 'slope'] },
            '8.3.2.2': { desc: 'Analyze polygons on a coordinate system by determining the slopes of their sides.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['polygon', 'slope'] },
            '8.3.2.3': { desc: 'Given a line and a point not on it, find lines through that point that are parallel and perpendicular.', strand: 'Geometry & Measurement', complexity: 'C', vocab: ['parallel', 'perpendicular'] },
            '8.4.1.1': { desc: 'Collect, display and interpret data using scatterplots. Estimate a line of best fit.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['scatterplot', 'line of best fit'] },
            '8.4.1.2': { desc: 'Use a line of best fit to approximate rate of change and make predictions.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['rate of change', 'prediction'] },
            '8.4.1.3': { desc: 'Assess the reasonableness of predictions using scatterplots by interpreting in the original context.', strand: 'Data Analysis & Probability', complexity: 'C', vocab: ['prediction'] },
        },

        // ─── GRADE 10 (Geometry / Algebra 2) ────────────────
        10: {
            '10.2.1.1': { desc: 'Recognize the characteristics of quadratic functions including vertex, axis of symmetry, direction of opening, and intercepts. Graph parabolas.', strand: 'Algebra', complexity: 'B', vocab: ['parabola', 'vertex', 'axis of symmetry', 'quadratic'] },
            '10.2.1.2': { desc: 'Solve quadratic equations by factoring, completing the square, and using the quadratic formula.', strand: 'Algebra', complexity: 'B', vocab: ['quadratic formula', 'discriminant', 'factoring'] },
            '10.2.1.3': { desc: 'Identify the number and type of solutions (real or complex) using the discriminant.', strand: 'Algebra', complexity: 'B', vocab: ['discriminant', 'complex number', 'real root'] },
            '10.2.1.4': { desc: 'Convert between standard form (ax² + bx + c), vertex form (a(x-h)² + k), and factored form of quadratic functions.', strand: 'Algebra', complexity: 'B', vocab: ['standard form', 'vertex form', 'factored form'] },
            '10.2.2.1': { desc: 'Add, subtract and multiply polynomials. Understand that polynomials are closed under these operations.', strand: 'Algebra', complexity: 'A', vocab: ['polynomial', 'monomial', 'binomial', 'degree'] },
            '10.2.2.2': { desc: 'Factor common monomial factors from polynomials; factor quadratic trinomials; recognize and factor difference of squares.', strand: 'Algebra', complexity: 'B', vocab: ['factor', 'trinomial', 'difference of squares'] },
            '10.2.2.3': { desc: 'Perform polynomial long division and synthetic division.', strand: 'Algebra', complexity: 'B', vocab: ['polynomial division', 'synthetic division', 'remainder'] },
            '10.2.3.1': { desc: 'Represent and solve problems involving exponential growth and decay.', strand: 'Algebra', complexity: 'B', vocab: ['exponential growth', 'exponential decay', 'base'] },
            '10.2.3.2': { desc: 'Know and apply the properties of logarithms (product, quotient, power rules) and use them to solve equations.', strand: 'Algebra', complexity: 'B', vocab: ['logarithm', 'natural log', 'common log'] },
            '10.2.3.3': { desc: 'Solve exponential equations using logarithms. Apply to compound interest and population models.', strand: 'Algebra', complexity: 'C', vocab: ['compound interest', 'half-life', 'exponential equation'] },
            '10.3.1.1': { desc: 'Use congruence criteria (SSS, SAS, ASA, AAS) to prove triangles congruent.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['congruent', 'SSS', 'SAS', 'ASA', 'AAS'] },
            '10.3.1.2': { desc: 'Prove and apply relationships about angles formed when parallel lines are cut by a transversal.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['transversal', 'alternate interior', 'corresponding angles'] },
            '10.3.1.3': { desc: 'Write formal two-column and paragraph proofs involving triangles and quadrilaterals.', strand: 'Geometry & Measurement', complexity: 'C', vocab: ['proof', 'theorem', 'postulate'] },
            '10.3.2.1': { desc: 'Define and use trigonometric ratios (sine, cosine, tangent) to solve problems involving right triangles.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['sine', 'cosine', 'tangent', 'hypotenuse'] },
            '10.3.2.2': { desc: 'Use trigonometric ratios to find unknown side lengths and angle measures in right triangles, including angles of elevation and depression.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['angle of elevation', 'angle of depression'] },
            '10.3.2.3': { desc: 'Apply the Law of Sines and Law of Cosines to solve problems involving non-right triangles.', strand: 'Geometry & Measurement', complexity: 'C', vocab: ['Law of Sines', 'Law of Cosines', 'oblique triangle'] },
            '10.3.3.1': { desc: 'Write the equation of a circle given center and radius: (x-h)² + (y-k)² = r². Identify center and radius from an equation.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['center', 'radius', 'standard form'] },
            '10.3.3.2': { desc: 'Calculate arc length and area of sectors of circles.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['arc length', 'sector', 'central angle'] },
            '10.3.3.3': { desc: 'Describe and perform rigid transformations (translations, reflections, rotations) and identify lines of symmetry.', strand: 'Geometry & Measurement', complexity: 'B', vocab: ['translation', 'reflection', 'rotation', 'symmetry'] },
            '10.4.1.1': { desc: 'Represent data using appropriate displays and describe distributions using shape, center and spread.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['distribution', 'skew', 'standard deviation'] },
            '10.4.1.2': { desc: 'Use standard deviation to compare the variability of data sets and make inferences.', strand: 'Data Analysis & Probability', complexity: 'B', vocab: ['standard deviation', 'variance', 'normal distribution'] },
            '10.4.1.3': { desc: 'Understand and apply the concepts of conditional probability and independence.', strand: 'Data Analysis & Probability', complexity: 'C', vocab: ['conditional probability', 'independence', 'Bayes'] },
        },
    };

    // ════════════════════════════════════════════════
    //  BENCHMARK → DOK_PROBLEMS TOPIC MAPPING
    //  Maps each MN07 benchmark to the closest DOK_PROBLEMS topic key
    // ════════════════════════════════════════════════

    const BENCHMARK_TOPIC_MAP = {
        // Grade 5
        '5.1.1.1': 'multi-digit operations',
        '5.1.1.2': 'multi-digit operations',
        '5.1.1.3': 'multi-digit operations',
        '5.1.2.1': 'fraction operations',
        '5.1.2.2': 'fraction operations',
        '5.1.2.3': 'fraction operations',
        '5.1.2.4': 'fraction operations',
        '5.1.3.1': 'multi-digit operations',
        '5.1.3.2': 'multi-digit operations',
        '5.2.1.1': 'expressions and patterns',
        '5.2.1.2': 'coordinate plane',
        '5.2.2.1': 'expressions and patterns',
        '5.3.1.1': 'volume and measurement',
        '5.3.1.2': 'volume and measurement',
        '5.3.2.1': 'volume and measurement',
        '5.3.2.2': 'volume and measurement',
        '5.4.1.1': 'place value and decimals',
        '5.4.1.2': 'place value and decimals',
        // Grade 6
        '6.1.1.1': 'locate and compare numbers',
        '6.1.1.2': 'locate and compare numbers',
        '6.1.1.3': 'equivalence and representations',
        '6.1.1.4': 'equivalence and representations',
        '6.1.2.1': 'ratios and rates',
        '6.1.2.2': 'ratios and rates',
        '6.1.2.3': 'ratios and rates',
        '6.1.3.1': 'multiplication and division of fractions',
        '6.1.3.2': 'equivalence and representations',
        '6.1.3.3': 'percent',
        '6.2.1.1': 'equivalence and representations',
        '6.2.2.1': 'equivalence and representations',
        '6.2.2.2': 'equivalence and representations',
        '6.3.1.1': 'percent',                // area — fallback to percent for coverage
        '6.3.1.2': 'percent',                // area estimation — fallback
        '6.3.2.1': 'locate and compare numbers', // angles — fallback
        '6.4.1.1': 'percent',                // probability — fallback
        '6.4.1.2': 'factors primes gcf lcm', // counting/compound events — fallback
        '6.4.1.3': 'percent',                // experimental probability — fallback
        // Grade 7
        '7.1.1.1': 'representing and comparing rational numbers',
        '7.1.1.2': 'representing and comparing rational numbers',
        '7.1.1.3': 'representing and comparing rational numbers',
        '7.1.1.4': 'representing and comparing rational numbers',
        '7.1.1.5': 'equivalence and representations',
        '7.1.2.1': 'applying rational numbers',
        '7.1.2.2': 'applying rational numbers',
        '7.1.2.3': 'applying rational numbers',
        '7.1.2.4': 'applying rational numbers',
        '7.1.2.5': 'proportional relationships',
        '7.1.2.6': 'applying rational numbers',
        '7.2.1.1': 'proportional relationships',
        '7.2.1.2': 'proportional relationships',
        '7.2.2.1': 'proportional relationships',
        '7.2.2.2': 'proportional relationships',
        '7.2.2.3': 'proportional relationships',
        '7.2.2.4': 'applying rational numbers',
        '7.2.3.1': 'applying rational numbers',
        '7.2.3.2': 'applying rational numbers',
        '7.2.3.3': 'applying rational numbers',
        '7.2.4.1': 'proportional relationships',
        '7.2.4.2': 'proportional relationships',
        '7.3.1.1': 'circumference and area of circles',
        '7.3.1.2': 'circumference and area of circles',
        '7.3.2.1': 'similarity and scaling',
        '7.3.2.2': 'similarity and scaling',
        '7.3.2.3': 'similarity and scaling',
        '7.3.2.4': 'similarity and scaling',
        '7.4.1.1': 'mean median and range',
        '7.4.1.2': 'mean median and range',
        '7.4.2.1': 'mean median and range',
        '7.4.3.1': 'mean median and range',
        '7.4.3.2': 'mean median and range',
        '7.4.3.3': 'mean median and range',
        // Grade 8
        '8.1.1.1': 'rational irrational and real numbers',
        '8.1.1.2': 'rational irrational and real numbers',
        '8.1.1.3': 'rational irrational and real numbers',
        '8.1.1.4': 'rational irrational and real numbers',
        '8.1.1.5': 'rational irrational and real numbers',
        '8.2.1.1': 'solve equations inequalities and systems',
        '8.2.1.2': 'solve equations inequalities and systems',
        '8.2.1.3': 'solve equations inequalities and systems',
        '8.2.1.4': 'solve equations inequalities and systems',
        '8.2.1.5': 'solve equations inequalities and systems',
        '8.2.2.1': 'solve equations inequalities and systems',
        '8.2.2.2': 'solve equations inequalities and systems',
        '8.2.2.3': 'solve equations inequalities and systems',
        '8.2.2.4': 'solve equations inequalities and systems',
        '8.2.2.5': 'solve equations inequalities and systems',
        '8.2.3.1': 'solve equations inequalities and systems',
        '8.2.3.2': 'solve equations inequalities and systems',
        '8.2.4.1': 'solve equations inequalities and systems',
        '8.2.4.2': 'solve equations inequalities and systems',
        '8.2.4.3': 'solve equations inequalities and systems',
        '8.2.4.4': 'solve equations inequalities and systems',
        '8.2.4.5': 'solve equations inequalities and systems',
        '8.2.4.6': 'solve equations inequalities and systems',
        '8.2.4.7': 'solve equations inequalities and systems',
        '8.2.4.8': 'solve equations inequalities and systems',
        '8.2.4.9': 'pythagorean theorem',
        '8.3.1.1': 'pythagorean theorem',
        '8.3.1.2': 'pythagorean theorem',
        '8.3.1.3': 'pythagorean theorem',
        '8.3.2.1': 'solve equations inequalities and systems',
        '8.3.2.2': 'solve equations inequalities and systems',
        '8.3.2.3': 'solve equations inequalities and systems',
        '8.4.1.1': 'solve equations inequalities and systems',
        '8.4.1.2': 'solve equations inequalities and systems',
        '8.4.1.3': 'solve equations inequalities and systems',
        // Grade 10
        '10.2.1.1': 'quadratic functions',
        '10.2.1.2': 'quadratic functions',
        '10.2.1.3': 'quadratic functions',
        '10.2.1.4': 'quadratic functions',
        '10.2.2.1': 'polynomial operations',
        '10.2.2.2': 'polynomial operations',
        '10.2.2.3': 'polynomial operations',
        '10.2.3.1': 'exponential and logarithmic functions',
        '10.2.3.2': 'exponential and logarithmic functions',
        '10.2.3.3': 'exponential and logarithmic functions',
        '10.3.1.1': 'geometric proofs and reasoning',
        '10.3.1.2': 'geometric proofs and reasoning',
        '10.3.1.3': 'geometric proofs and reasoning',
        '10.3.2.1': 'right triangle trigonometry',
        '10.3.2.2': 'right triangle trigonometry',
        '10.3.2.3': 'right triangle trigonometry',
        '10.3.3.1': 'circles and transformations',
        '10.3.3.2': 'circles and transformations',
        '10.3.3.3': 'circles and transformations',
        '10.4.1.1': 'exponential and logarithmic functions',
        '10.4.1.2': 'exponential and logarithmic functions',
        '10.4.1.3': 'exponential and logarithmic functions',
    };

    // ════════════════════════════════════════════════
    //  PDF HELPERS
    // ════════════════════════════════════════════════

    function setColor(pdf, rgb)     { pdf.setTextColor(rgb[0], rgb[1], rgb[2]); }
    function setFill(pdf, rgb)      { pdf.setFillColor(rgb[0], rgb[1], rgb[2]); }
    function setDraw(pdf, rgb)      { pdf.setDrawColor(rgb[0], rgb[1], rgb[2]); }

    function drawLine(pdf, x1, y1, x2, y2, color, width) {
        setDraw(pdf, color || COLORS.line);
        pdf.setLineWidth(width || 0.5);
        pdf.line(x1, y1, x2, y2);
    }

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

    function drawWrapped(pdf, text, x, y, maxWidth, lineH) {
        const lines = wrapText(pdf, text, maxWidth);
        const lh = lineH || LINE_H;
        for (const line of lines) {
            if (y > PAGE_H - MARGIN - 20) { pdf.addPage(); y = MARGIN + 10; }
            pdf.text(line, x, y);
            y += lh;
        }
        return y;
    }

    function needsNewPage(y, neededH) {
        return y + neededH > PAGE_H - MARGIN - 30;
    }

    // ════════════════════════════════════════════════
    //  GET ONE PROBLEM FOR A BENCHMARK
    // ════════════════════════════════════════════════

    function getProblemForBenchmark(code, benchmark) {
        const complexityToDOK = { A: 1, B: 2, C: 3 };
        const dok = complexityToDOK[benchmark.complexity] || 2;
        const topicKey = BENCHMARK_TOPIC_MAP[code];

        if (topicKey && typeof ProblemGenerator !== 'undefined') {
            const problems = ProblemGenerator.forTopic(topicKey, dok, 1);
            if (problems.length > 0) return { ...problems[0], dok };
        }

        // Fallback: pull directly from DOK_PROBLEMS
        if (topicKey && typeof DOK_PROBLEMS !== 'undefined' && DOK_PROBLEMS[topicKey]) {
            const dokKey = 'dok' + dok;
            const pool = DOK_PROBLEMS[topicKey][dokKey] || DOK_PROBLEMS[topicKey].dok1 || [];
            if (pool.length > 0) {
                const pick = pool[Math.floor(Math.random() * pool.length)];
                return { ...pick, dok };
            }
        }

        // Generate a contextual fallback from the benchmark description
        return {
            stem: generateFallbackProblem(code, benchmark),
            answer: '(See answer key)',
            hint: benchmark.desc,
            dok,
        };
    }

    function generateFallbackProblem(code, benchmark) {
        const desc = benchmark.desc;
        // Create a problem stem from the standard description
        const starters = [
            `Demonstrate your understanding: ${desc.split('.')[0]}.`,
            `Apply this skill: ${desc.split(';')[0]}.`,
            `Show what you know — ${desc.split('.')[0].toLowerCase()}.`,
        ];
        return starters[Math.floor(Math.random() * starters.length)];
    }

    // ════════════════════════════════════════════════
    //  DRAW PAGE HEADER / FOOTER
    // ════════════════════════════════════════════════

    function drawPageHeader(pdf, grade, pageNum, totalPages) {
        // Top color bar
        setFill(pdf, COLORS.navy);
        pdf.rect(0, 0, PAGE_W, 8, 'F');

        // Title
        pdf.setFontSize(15);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, COLORS.navy);
        pdf.text(`Grade ${grade} Standards Worksheet`, MARGIN, 28);

        // Subtitle
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, COLORS.slate);
        pdf.text('MCA-III Benchmarks  |  One Problem Per Standard  |  Complexity-Matched', MARGIN, 40);

        // Name / Date line
        pdf.setFontSize(9);
        setColor(pdf, COLORS.light);
        pdf.text('Name: ________________________________', MARGIN, 54);
        pdf.text('Date: _______________', PAGE_W - MARGIN - 120, 54);

        drawLine(pdf, MARGIN, 60, PAGE_W - MARGIN, 60, COLORS.navy, 1);
        return 70;
    }

    function drawPageFooter(pdf, grade, pageNum) {
        const y = PAGE_H - 25;
        drawLine(pdf, MARGIN, y, PAGE_W - MARGIN, y, COLORS.navy, 0.5);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, COLORS.light);
        pdf.text(`The Lesson Digester  |  Grade ${grade} Standards Worksheet`, MARGIN, y + 10);
        pdf.text(`Page ${pageNum}`, PAGE_W - MARGIN - 30, y + 10);
    }

    // ════════════════════════════════════════════════
    //  DRAW STRAND DIVIDER
    // ════════════════════════════════════════════════

    function drawStrandDivider(pdf, y, strandName, color) {
        if (needsNewPage(y, 30)) { pdf.addPage(); y = MARGIN + 10; }

        setFill(pdf, color);
        pdf.roundedRect(MARGIN, y, CONTENT_W, 22, 3, 3, 'F');
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, COLORS.white);
        pdf.text(strandName.toUpperCase(), MARGIN + 10, y + 15);
        return y + 30;
    }

    // ════════════════════════════════════════════════
    //  DRAW ONE BENCHMARK + PROBLEM
    // ════════════════════════════════════════════════

    function drawBenchmarkProblem(pdf, y, code, benchmark, problem, index) {
        const compColor = COMPLEXITY_COLORS[benchmark.complexity] || COLORS.blue;
        const compLabel = COMPLEXITY_LABELS[benchmark.complexity] || 'Skill';

        // Estimate height needed
        const estimatedH = 120;
        if (needsNewPage(y, estimatedH)) {
            pdf.addPage();
            y = MARGIN + 10;
        }

        // ── Benchmark header row ──
        // Code badge
        setFill(pdf, compColor);
        const codeW = Math.max(50, pdf.getTextWidth(code) * 1.4 + 16);
        pdf.roundedRect(MARGIN, y, codeW, 16, 3, 3, 'F');
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, COLORS.white);
        pdf.text(code, MARGIN + 5, y + 11);

        // Complexity tag
        const tagX = MARGIN + codeW + 6;
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, compColor);
        pdf.text(`DOK ${problem.dok}  |  ${compLabel}`, tagX, y + 11);

        // 3D indicator for geometry strands
        if (benchmark.strand === 'Geometry & Measurement' || benchmark.strand === 'Geometry') {
            const tagEndX = tagX + pdf.getTextWidth(`DOK ${problem.dok}  |  ${compLabel}`) + 8;
            setFill(pdf, {r: 30, g: 39, b: 97});
            pdf.roundedRect(tagEndX, y + 1, 22, 12, 3, 3, 'F');
            pdf.setFontSize(6);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, COLORS.white);
            pdf.text('3D', tagEndX + 5, y + 9);
        }

        y += 22;

        // ── Benchmark description ──
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        setColor(pdf, COLORS.slate);
        y = drawWrapped(pdf, benchmark.desc, MARGIN + 4, y, CONTENT_W - 8, 11);
        y += 2;

        // ── Vocabulary chips (if any) ──
        if (benchmark.vocab && benchmark.vocab.length > 0) {
            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, compColor);
            const vocabText = 'Vocabulary: ' + benchmark.vocab.join(' · ');
            pdf.text(vocabText.substring(0, 100), MARGIN + 4, y);
            y += 10;
        }

        // ── Problem ──
        // Problem number circle
        setFill(pdf, compColor);
        pdf.circle(MARGIN + 10, y + 4, 8, 'F');
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, COLORS.white);
        const numStr = (index + 1).toString();
        pdf.text(numStr, MARGIN + 10 - pdf.getTextWidth(numStr) / 2, y + 7);

        // Problem text
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        setColor(pdf, COLORS.dark);
        const probY = drawWrapped(pdf, problem.stem, MARGIN + 24, y + 7, CONTENT_W - 32, LINE_H);
        y = Math.max(probY, y + 16);

        // ── Work space ──
        y += 3;
        setDraw(pdf, COLORS.line);
        pdf.setLineWidth(0.4);
        pdf.roundedRect(MARGIN + 20, y, CONTENT_W - 26, 55, 3, 3, 'S');

        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'italic');
        setColor(pdf, COLORS.light);
        pdf.text('Show your work:', MARGIN + 24, y + 10);

        y += 62;

        // Separator
        drawLine(pdf, MARGIN + 20, y, PAGE_W - MARGIN - 20, y, COLORS.line, 0.3);
        y += 8;

        return y;
    }

    // ════════════════════════════════════════════════
    //  DRAW ANSWER KEY PAGE(S)
    // ════════════════════════════════════════════════

    function drawAnswerKey(pdf, grade, answers) {
        pdf.addPage();
        let y = drawPageHeader(pdf, grade, 0, 0);

        // Answer Key title
        setFill(pdf, COLORS.pink);
        pdf.roundedRect(MARGIN, y, CONTENT_W, 24, 3, 3, 'F');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        setColor(pdf, COLORS.white);
        pdf.text('ANSWER KEY', MARGIN + 10, y + 16);
        y += 34;

        for (const { code, answer, dok } of answers) {
            if (needsNewPage(y, 30)) {
                pdf.addPage();
                y = MARGIN + 10;
            }

            // Code
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');
            setColor(pdf, COLORS.navy);
            pdf.text(code, MARGIN, y);

            // DOK badge
            const compColor = dok === 1 ? COLORS.teal : dok === 2 ? COLORS.blue : COLORS.pink;
            pdf.setFontSize(6.5);
            setColor(pdf, compColor);
            pdf.text(`DOK ${dok}`, MARGIN + 55, y);

            // Answer
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            setColor(pdf, COLORS.dark);
            const answerText = (answer || '').substring(0, 120);
            y = drawWrapped(pdf, answerText, MARGIN + 80, y, CONTENT_W - 85, 10);
            y += 4;

            drawLine(pdf, MARGIN, y, PAGE_W - MARGIN, y, [240, 242, 245], 0.3);
            y += 6;
        }
    }

    // ════════════════════════════════════════════════
    //  MAIN GENERATE FUNCTION
    // ════════════════════════════════════════════════

    function generate(grade) {
        if (typeof jspdf === 'undefined' && typeof jsPDF === 'undefined') {
            throw new Error('jsPDF not loaded. Add the jsPDF CDN script to the page.');
        }

        const benchmarks = MN07_BENCHMARKS[grade];
        if (!benchmarks) {
            throw new Error(`No benchmarks found for grade ${grade}. Supported: 5, 6, 7, 8, 10.`);
        }

        const PDF = (typeof jspdf !== 'undefined') ? jspdf.jsPDF : jsPDF;
        const pdf = new PDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });

        // Group benchmarks by strand
        const byStrand = {};
        for (const [code, bm] of Object.entries(benchmarks)) {
            if (!byStrand[bm.strand]) byStrand[bm.strand] = [];
            byStrand[bm.strand].push({ code, ...bm });
        }

        // Strand order
        const strandOrder = [
            'Number & Operation',
            'Algebra',
            'Geometry & Measurement',
            'Data Analysis & Probability',
        ];

        let y = drawPageHeader(pdf, grade, 1, 1);
        let pageNum = 1;
        let problemIdx = 0;
        const answers = [];

        for (const strand of strandOrder) {
            const items = byStrand[strand];
            if (!items || items.length === 0) continue;

            const strandColor = STRAND_COLORS[strand] || COLORS.navy;
            y = drawStrandDivider(pdf, y, strand, strandColor);

            for (const bm of items) {
                const problem = getProblemForBenchmark(bm.code, bm);
                y = drawBenchmarkProblem(pdf, y, bm.code, bm, problem, problemIdx);
                answers.push({ code: bm.code, answer: problem.answer, dok: problem.dok });
                problemIdx++;
            }
        }

        // Footer on last problem page
        drawPageFooter(pdf, grade, pageNum);

        // Answer key
        drawAnswerKey(pdf, grade, answers);

        return { pdf, problemCount: problemIdx };
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        MN07_BENCHMARKS,
        BENCHMARK_TOPIC_MAP,

        /**
         * Generate a standards worksheet PDF for a grade
         * @param {number} grade - 5, 6, 7, 8, or 10
         * @returns {{ pdf: jsPDF, problemCount: number }}
         */
        generate,

        /**
         * Generate and trigger browser download
         * @param {number} grade - 5, 6, 7, 8, or 10
         */
        download(grade) {
            const { pdf, problemCount } = generate(grade);
            const filename = `Grade_${grade}_Standards_Worksheet_${problemCount}_problems.pdf`;
            pdf.save(filename);
            return { filename, problemCount };
        },

        /**
         * Generate all 3 grades and download as ZIP
         */
        async downloadAll() {
            if (typeof JSZip === 'undefined') {
                // Fallback: download individually
                for (const g of [5, 6, 7, 8, 10]) {
                    this.download(g);
                }
                return;
            }

            const zip = new JSZip();
            const folder = zip.folder('Standards_Worksheets');

            for (const g of [5, 6, 7, 8, 10]) {
                const { pdf, problemCount } = generate(g);
                const blob = pdf.output('blob');
                folder.file(`Grade_${g}_Standards_Worksheet_${problemCount}_problems.pdf`, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Standards_Worksheets_Grades_5-10.zip';
            a.click();
            URL.revokeObjectURL(url);
        },

        /**
         * Get benchmark count for a grade
         * @param {number} grade
         * @returns {number}
         */
        getBenchmarkCount(grade) {
            const bm = MN07_BENCHMARKS[grade];
            return bm ? Object.keys(bm).length : 0;
        },

        /** List supported grades */
        grades: [5, 6, 7, 8, 10],
    };

})();
