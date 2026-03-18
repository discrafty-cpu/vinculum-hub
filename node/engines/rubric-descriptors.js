// ==================== STANDARDS-BASED RUBRIC DESCRIPTORS ====================
// Benchmark-specific proficiency descriptors for Minnesota Math Standards (Grades 6-8)
// Source: Official MDE Benchmark Achievement Level Descriptors (ALDs)
// DOK levels cross-referenced from MCA-III test specifications
// Proficiency scale: Exemplary(10) > Proficient(8.5) > Developing(7.5) > Beginning(6.5) > No Evidence(5)
// MDE ALD Mapping: Exceeds->Exemplary, Meets->Proficient, Partially Meets->Developing, Does Not Meet->Beginning
// Total benchmarks: 97 (Grade 6: 32, Grade 7: 34, Grade 8: 31)
// ============================================================================

const PROFICIENCY_SCALE = {
    exemplary:   { label: 'Exemplary',   score: 10,  color: '0D9488' },  // teal
    proficient:  { label: 'Proficient',  score: 8.5, color: '3B82F6' },  // blue
    developing:  { label: 'Developing',  score: 7.5, color: 'D4870F' },  // amber
    beginning:   { label: 'Beginning',   score: 6.5, color: 'E8436D' },  // pink
    noEvidence:  { label: 'No Evidence', score: 5,   color: '6B7280' }   // gray
};

const RUBRIC_DESCRIPTORS = {

    // ======================== GRADE 6 (32 benchmarks) ========================
    // Source: Grade 6 Math Benchmark Achievement Level Descriptors (MDE)
    // Strands: Number & Operation, Algebra, Geometry & Measurement, Data Analysis & Probability

    '6.1.1.1': {
        benchmark: 'Locate, order and compare positive rational numbers on a number line',
        dok: 2,
        descriptors: {
            exemplary: 'Locates, orders, and compares positive rational numbers (fractions, decimals, percents) on a number line fluently. Places numbers in multiple forms and explains relative position using mathematical reasoning.',
            proficient: 'Locates and compares positive rational numbers on a number line. Correctly positions fractions, decimals, and percents and determines which is greater or less.',
            developing: 'Locates simple fractions and decimals on a number line but may struggle with less common values or comparing mixed forms.',
            beginning: 'Locates only whole numbers and simple fractions (like 1/2) on a number line. Cannot compare fractions and decimals on the same line.',
            noEvidence: 'Shows no engagement with number lines or comparing positive rational numbers. Does not attempt to locate or order values.'
        }
    },
    '6.1.1.2': {
        benchmark: 'Identify and use equivalent forms of fractions, decimals and percents',
        dok: 2,
        descriptors: {
            exemplary: 'Translates efficiently between fraction, decimal, and percent forms of positive rational numbers to solve problems. Selects the most appropriate form for computation in context.',
            proficient: 'Determines equivalences among fractions, decimals, and percents but may revert to one representation to solve problems.',
            developing: 'Recognizes equivalences among common fractions, decimals, and percents.',
            beginning: 'Uses decimals to separate numbers rather than as decimal notation. Cannot recognize basic equivalences between fractions, decimals, and percents.',
            noEvidence: 'Shows no engagement with equivalent forms. Does not attempt to convert between fractions, decimals, or percents.'
        }
    },
    '6.1.1.3': {
        benchmark: 'Determine factors, common factors; determine if a number is prime or composite',
        dok: 1,
        descriptors: {
            exemplary: 'Recognizes when it is appropriate to apply the concept of factoring in problem-solving situations and applies it flexibly.',
            proficient: 'Understands the concept of factors and factoring by composing and decomposing numbers.',
            developing: 'Names pairs of factors of numbers.',
            beginning: 'Can only name common pairs of factors of a given number.',
            noEvidence: 'Shows no engagement with factors and factorization. Does not attempt to identify factors of a number.'
        }
    },
    '6.1.1.4': {
        benchmark: 'Determine common multiples and least common multiple',
        dok: 1,
        descriptors: {
            exemplary: 'Applies LCM to solve problems involving fractions with unlike denominators.',
            proficient: 'Determines common multiples and LCM for two or more numbers.',
            developing: 'Lists multiples and identifies common multiples for small numbers.',
            beginning: 'Lists some multiples but cannot find the least common multiple.',
            noEvidence: 'Shows no engagement with multiples. Does not attempt to list multiples or find common multiples.'
        }
    },
    '6.1.1.5': {
        benchmark: 'Factor whole numbers; express a number as a product of prime factors with exponents',
        dok: 1,
        descriptors: {
            exemplary: 'Uses prime factorization to find GCF and LCM efficiently.',
            proficient: 'Expresses numbers as a product of prime factors using exponents.',
            developing: 'Factors numbers into prime factors without using exponents.',
            beginning: 'Identifies only some factors of a number.',
            noEvidence: 'Shows no engagement with prime factorization. Does not attempt to identify or factor numbers.'
        }
    },
    '6.1.1.6': {
        benchmark: 'Determine the GCF of two or more whole numbers; use distributive property',
        dok: 2,
        descriptors: {
            exemplary: 'Applies GCF and distributive property flexibly in problem-solving contexts to simplify and factor expressions.',
            proficient: 'Determines the GCF and applies the distributive property to factor expressions.',
            developing: 'Finds the GCF for small numbers and recognizes the distributive property.',
            beginning: 'Identifies only some common factors.',
            noEvidence: 'Shows no engagement with GCF or the distributive property. Does not attempt to find common factors.'
        }
    },
    '6.1.1.7': {
        benchmark: 'Convert between equivalent representations of positive rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Selects and uses the most efficient form for computation in context, converting fluently and accurately.',
            proficient: 'Converts fluently between fractions, decimals, and percents including non-benchmark values.',
            developing: 'Converts between common fractions, decimals, and percents.',
            beginning: 'Converts between simple benchmark fractions and decimals only.',
            noEvidence: 'Shows no engagement with converting between representations. Does not attempt to change between fraction, decimal, or percent forms.'
        }
    },
    '6.1.2.1': {
        benchmark: 'Identify and use ratios to compare quantities in real-world and mathematical problems',
        dok: 2,
        descriptors: {
            exemplary: 'Compares ratios and understands their relationship to fractions. Recognizes ratios in various contexts and applies them to solve problems.',
            proficient: 'Creates ratios to represent situations when given key words in context. Understands the concept of ratio and uses it appropriately.',
            developing: 'Recognizes ratios only in numeric form. Solves unit rate problems in straightforward contexts using division.',
            beginning: 'Sees decimals and numbers only in money context. Solves ratio or rate problems using basic multiplication and division without understanding ratio structure.',
            noEvidence: 'Shows no engagement with ratios and rate comparison. Does not attempt to identify or use ratios.'
        }
    },
    '6.1.2.2': {
        benchmark: 'Apply the concept of unit rate to solve problems',
        dok: 2,
        descriptors: {
            exemplary: 'Compares ratios and understands their relationship to fractions. Applies unit rate reasoning across multiple problem types and contexts.',
            proficient: 'Creates ratios to represent situations when given key words in context and uses unit rates appropriately.',
            developing: 'Solves unit rate problems in straightforward contexts using division.',
            beginning: 'Solves ratio or rate problems using basic multiplication and division without understanding unit rate concept.',
            noEvidence: 'Shows no engagement with unit rates. Does not attempt to solve rate problems.'
        }
    },
    '6.1.2.3': {
        benchmark: 'Determine the rate for ratios of quantities with different units',
        dok: 2,
        descriptors: {
            exemplary: 'Compares rates with different units and converts between rate forms to solve complex problems.',
            proficient: 'Determines rates for ratios with different units in context.',
            developing: 'Calculates rates when units are clearly labeled.',
            beginning: 'Confuses units in rate problems and cannot determine correct rates.',
            noEvidence: 'Shows no engagement with rates involving different units. Does not attempt to determine rates.'
        }
    },
    '6.1.2.4': {
        benchmark: 'Use reasoning about multiplication and division to solve ratio and rate problems',
        dok: 3,
        descriptors: {
            exemplary: 'Applies proportional reasoning flexibly across multiple representations (tables, graphs, equations) to solve complex ratio and rate problems.',
            proficient: 'Uses multiplicative reasoning to solve ratio and rate problems accurately.',
            developing: 'Solves simple ratio problems using tables or multiplication with some procedural support.',
            beginning: 'Uses only additive reasoning for ratio problems.',
            noEvidence: 'Shows no engagement with multiplicative reasoning. Does not attempt to use multiplication or division to solve ratio problems.'
        }
    },
    '6.1.3.1': {
        benchmark: 'Multiply and divide decimals and fractions using efficient and generalizable procedures',
        dok: 2,
        descriptors: {
            exemplary: 'Selects efficient methods and explains reasoning for fraction and decimal operations. Uses understanding to tackle complex multi-digit problems.',
            proficient: 'Multiplies and divides decimals and fractions efficiently with understanding of the underlying concepts.',
            developing: 'Multiplies and divides fractions and decimals with procedural steps, showing basic understanding.',
            beginning: 'Multiplies and divides only with whole numbers or simple decimals.',
            noEvidence: 'Shows no engagement with decimal and fraction multiplication or division. Does not attempt operations with decimals or fractions.'
        }
    },
    '6.1.3.2': {
        benchmark: 'Use order of operations including grouping symbols, to evaluate numerical expressions',
        dok: 1,
        descriptors: {
            exemplary: 'Creates and evaluates complex expressions and identifies errors in others\' work. Explains reasoning for order of operations.',
            proficient: 'Correctly evaluates expressions using order of operations including grouping symbols.',
            developing: 'Applies order of operations with simple expressions.',
            beginning: 'Performs operations left to right without regard to order of operations.',
            noEvidence: 'Shows no engagement with order of operations. Does not attempt to evaluate numerical expressions.'
        }
    },
    '6.1.3.3': {
        benchmark: 'Calculate a percent of a number and determine what percent one number is of another',
        dok: 2,
        descriptors: {
            exemplary: 'Solves multi-step percent problems including percent increase and decrease with accuracy.',
            proficient: 'Calculates percent of a number and determines percent relationships accurately.',
            developing: 'Calculates percent of a number in straightforward contexts.',
            beginning: 'Recognizes percent symbol but cannot compute percent of a number.',
            noEvidence: 'Shows no engagement with percent calculation. Does not attempt to find percents or relationships.'
        }
    },
    '6.1.3.4': {
        benchmark: 'Solve real-world and mathematical problems using arithmetic with positive rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Solves complex multi-step problems and explains solution strategies with clarity.',
            proficient: 'Solves multi-step real-world problems using arithmetic with positive rational numbers.',
            developing: 'Solves one-step and simple two-step problems with positive rational numbers.',
            beginning: 'Solves only one-step problems with whole numbers.',
            noEvidence: 'Shows no engagement with problem-solving using rational numbers. Does not attempt to solve arithmetic problems.'
        }
    },
    '6.1.3.5': {
        benchmark: 'Solve real-world and mathematical problems requiring arithmetic with decimals, fractions and mixed numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Efficiently solves complex problems by choosing the most appropriate form for computation and explaining strategies.',
            proficient: 'Solves real-world problems requiring multiple operations with decimals, fractions, and mixed numbers.',
            developing: 'Solves straightforward problems with decimals, fractions, and mixed numbers.',
            beginning: 'Computes with decimals or fractions only in simple contexts.',
            noEvidence: 'Shows no engagement with operations involving decimals, fractions, or mixed numbers. Does not attempt multi-operation problems.'
        }
    },
    '6.2.1.1': {
        benchmark: 'Understand that a variable can represent an unknown quantity or any number in a specified set',
        dok: 2,
        descriptors: {
            exemplary: 'Interprets equations and inequalities with multiple unknowns. Understands that solving for a variable is not always the answer to the question.',
            proficient: 'Represents relationships between varying quantities using equations and inequalities involving variables, graphs, and verbal descriptions. Uses properties of arithmetic and order of operations to generate equivalent expressions.',
            developing: 'Solves one-step problems in straightforward situations. Uses computational facts and recognizes patterns. Recognizes relationships between varying quantities in tables, graphs, or verbal descriptions.',
            beginning: 'Understands concept of variable as a placeholder for an answer. Recognizes only additive patterns. Solves one-step problems in very familiar situations.',
            noEvidence: 'Shows no engagement with variables and algebraic expressions. Does not attempt to represent relationships or solve equations.'
        }
    },
    '6.2.1.2': {
        benchmark: 'Apply the properties of arithmetic to generate equivalent expressions',
        dok: 2,
        descriptors: {
            exemplary: 'Flexibly applies all properties of arithmetic to simplify complex expressions and explains reasoning.',
            proficient: 'Uses properties of arithmetic to generate equivalent expressions.',
            developing: 'Applies commutative and associative properties in simple cases.',
            beginning: 'Recognizes basic properties but cannot apply them.',
            noEvidence: 'Shows no engagement with properties of arithmetic. Does not attempt to generate equivalent expressions.'
        }
    },
    '6.2.3.1': {
        benchmark: 'Represent real-world or mathematical situations using equations and inequalities involving variables and positive rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Creates equations and inequalities for complex, multi-step situations. Models real-world problems with precision.',
            proficient: 'Represents real-world situations using equations and inequalities with variables.',
            developing: 'Represents straightforward situations with one-step equations.',
            beginning: 'Writes simple expressions but not equations from word problems.',
            noEvidence: 'Shows no engagement with equations and inequalities. Does not attempt to represent situations algebraically.'
        }
    },
    '6.2.3.2': {
        benchmark: 'Solve equations involving positive rational numbers using number sense, properties of arithmetic and the idea of maintaining equality on both sides',
        dok: 2,
        descriptors: {
            exemplary: 'Solves multi-step equations and explains the properties used at each step with clarity.',
            proficient: 'Solves equations using properties of equality while maintaining balance on both sides.',
            developing: 'Solves one-step equations using inverse operations.',
            beginning: 'Solves equations by guess-and-check only.',
            noEvidence: 'Shows no engagement with equation-solving strategies. Does not attempt to solve equations.'
        }
    },
    '6.3.1.1': {
        benchmark: 'Calculate the surface area and volume of prisms and use appropriate units',
        dok: 2,
        descriptors: {
            exemplary: 'Solves for unknown dimensions, volume, or surface area in prisms when given surface area or volume. Justifies methods for finding surface area of a prism.',
            proficient: 'Uses formulas to compute volumes and surface areas of cubes, triangular prisms, and rectangular prisms. Understands how to find unknown dimensions of a rectangular prism when given the volume.',
            developing: 'Computes volume of a rectangular prism when given all three dimensions.',
            beginning: 'Computes volume of a rectangular prism given base area, height, and an image.',
            noEvidence: 'Shows no engagement with volume and surface area calculations. Does not attempt to use formulas for prisms.'
        }
    },
    '6.3.1.2': {
        benchmark: 'Calculate the area of quadrilaterals (squares, rectangles, rhombuses, parallelograms, trapezoids and kites)',
        dok: 2,
        descriptors: {
            exemplary: 'Uses the perimeter or diagonals of a quadrilateral and its properties to find the area. Decomposes figures into quadrilaterals to find the area of complex figures.',
            proficient: 'Uses formulas to compute area of parallelograms, trapezoids, and kites. Uses perimeter of a rectangle or square to find a missing side length or the area.',
            developing: 'Finds missing side length or possible dimensions of a rectangle when given area. Finds the area of a square given a side length.',
            beginning: 'Finds areas of simple figures on a grid by counting whole squares. Computes area of a rectangle when both length and width are provided.',
            noEvidence: 'Shows no engagement with area calculations for quadrilaterals. Does not attempt to use formulas or count units.'
        }
    },
    '6.3.1.3': {
        benchmark: 'Estimate the perimeter and area of irregular figures on a grid',
        dok: 2,
        descriptors: {
            exemplary: 'Combines units and partial units or square units to estimate areas and perimeters of irregular and curved figures with precision.',
            proficient: 'Estimates area or perimeter of irregular objects using scales other than 1. Uses strategies to estimate parts of areas of irregular figures and then sums the parts.',
            developing: 'Understands that square units correspond to area and units correspond to lengths. Estimates perimeter or area of simple irregular figures using a scale of 1 unit or 1 square unit.',
            beginning: 'Estimates areas of simple irregular figures by counting whole square units. Identifies square units as measurement of area.',
            noEvidence: 'Shows no engagement with estimating perimeter and area. Does not attempt to use grid strategies or estimation.'
        }
    },
    '6.3.2.1': {
        benchmark: 'Solve problems using the relationships between the angles formed by intersecting lines',
        dok: 2,
        descriptors: {
            exemplary: 'Describes relationships between angles using appropriate vocabulary such as congruent, supplement, complement, vertical, or adjacent.',
            proficient: 'Solves problems involving angle measures by applying understanding of angle relationships, properties, and appropriate terms. Solves multi-step problems to find missing angle measures in complex diagrams.',
            developing: 'Calculates the measure of a supplementary angle to a given angle. Identifies complementary angles given the other angle.',
            beginning: 'Identifies the measure of the supplementary angle given the other angle that forms a straight angle.',
            noEvidence: 'Shows no engagement with angle relationships and intersecting lines. Does not attempt to find or calculate angle measures.'
        }
    },
    '6.3.2.2': {
        benchmark: 'Determine missing angle measures in a triangle using the fact that the sum of the interior angles is 180°',
        dok: 2,
        descriptors: {
            exemplary: 'Solves multi-step missing angle problems involving angles both inside and outside a triangle using triangle properties and angle relationships for intersecting lines.',
            proficient: 'Determines more than one possible combination of missing angle measures in a triangle using properties of angles.',
            developing: 'Understands that isosceles triangles have two equal base angles. Determines missing angle measures in isosceles triangles.',
            beginning: 'Identifies the measure of the third angle of a triangle using the 180-degree sum rule with support.',
            noEvidence: 'Shows no engagement with angle relationships in triangles. Does not attempt to find missing angle measures.'
        }
    },
    '6.3.2.3': {
        benchmark: 'Develop and use formulas for the sums of the interior angles of polygons by decomposing them into triangles',
        dok: 3,
        descriptors: {
            exemplary: 'Knows or can calculate the sum of the measures of interior angles of any polygon. Explains how to calculate the sum by decomposing any polygon into triangles.',
            proficient: 'Determines the measure of a missing angle in a polygon with up to 7 sides. Decomposes a polygon with up to 7 sides into triangles to determine the sum of interior angles.',
            developing: 'Finds the missing angle in a quadrilateral given the other three angles. Determines the measure of two missing angles in a quadrilateral when given they are congruent.',
            beginning: 'Knows that angle measures in a triangle sum to 180 degrees. Knows that opposite angles are congruent in parallelograms.',
            noEvidence: 'Shows no engagement with polygon angle relationships. Does not attempt to find or calculate angle sums.'
        }
    },
    '6.3.3.1': {
        benchmark: 'Solve problems in various contexts involving conversion of weights, capacities, geometric measurements and times within measurement systems using appropriate units',
        dok: 2,
        descriptors: {
            exemplary: 'Solves real-world, multi-step problems involving conversions and calculating with decimals and fractions. Consistently applies conversion factors for all metric conversions.',
            proficient: 'Solves one- and two-step conversions by calculating with whole numbers and converting between more common units within customary, time, and metric systems.',
            developing: 'Converts measurements from smaller units to larger units with remainders using either known time conversions or given conversions. Multiplies or divides to solve one-step conversion problems.',
            beginning: 'Uses multiplication (not addition or subtraction) to convert units when given conversion information.',
            noEvidence: 'Shows no engagement with measurement conversions. Does not attempt to convert between units.'
        }
    },
    '6.3.3.2': {
        benchmark: 'Estimate weights, capacities and geometric measurements using benchmarks in measurement systems with appropriate units',
        dok: 2,
        descriptors: {
            exemplary: 'Distinguishes between appropriate estimates for volume and area that may require calculations. Recognizes appropriate estimates including when measures are fractional.',
            proficient: 'Recognizes appropriate estimates for area and other characteristics, including when the best unit is less common.',
            developing: 'Identifies appropriate metric or customary unit for capacity or weight when given a value and an object or situation.',
            beginning: 'Identifies which common unit is most appropriate to use when estimating length or weight of an object or distance traveled.',
            noEvidence: 'Shows no engagement with measurement estimation. Does not attempt to select appropriate units or estimates.'
        }
    },
    '6.4.1.1': {
        benchmark: 'Determine the sample space (set of possible outcomes) for a given experiment and determine which members of the sample space are related to certain events',
        dok: 2,
        descriptors: {
            exemplary: 'Determines possible outcomes and number of occurrences of each outcome in a probability experiment. Identifies scenarios to match given experiments.',
            proficient: 'Determines one possible outcome from the total sample space when given in table, tree diagram, or written description.',
            developing: 'Determines number of possible outcomes in sample spaces for more than two events using multiplication. Consistently interprets tree diagrams.',
            beginning: 'Identifies which sample space describes or does not describe an experiment. Determines number of possible outcomes for two events using multiplication facts.',
            noEvidence: 'Shows no engagement with sample spaces and outcomes. Does not attempt to determine or identify possible outcomes.'
        }
    },
    '6.4.1.2': {
        benchmark: 'Determine the probability of an event using the ratio between the size of the event and the size of the sample space',
        dok: 2,
        descriptors: {
            exemplary: 'Creates sample spaces for stated probabilities. Determines probabilities of complements of events.',
            proficient: 'Determines probabilities of compound events written as a fraction, percent, or decimal in real-world situations. Understands the concept of random selection.',
            developing: 'Determines probabilities of events as the ratio of event size to sample space written as a fraction or percent in real-world situations. Understands probability meanings (certain, impossible, likely, unlikely).',
            beginning: 'Identifies how probability is written as a fraction ratio and as a percent. Identifies probabilities in ranges as "likely" or "unlikely".',
            noEvidence: 'Shows no engagement with probability calculation. Does not attempt to determine probabilities or identify sample spaces.'
        }
    },
    '6.4.1.3': {
        benchmark: 'Perform experiments for situations in which the probabilities are known, and compare the resulting relative frequencies with the known probabilities',
        dok: 3,
        descriptors: {
            exemplary: 'Explains why there could be a difference between expected and experimental results. Compares and explains differences in relative frequency data with theoretical probabilities.',
            proficient: 'Determines if relative frequencies match theoretical probabilities. Determines if expected results match experimental results.',
            developing: 'Understands the meaning of relative frequency and applies it to simple experiments. Compares experimental probabilities with expected probabilities for two or three events.',
            beginning: 'Determines which relative frequencies are more or less than expected results in simple situations.',
            noEvidence: 'Shows no engagement with experimental probability. Does not attempt to perform experiments or compare frequencies.'
        }
    },
    '6.4.1.4': {
        benchmark: 'Calculate experimental probabilities from experiments; represent them as percents, fractions and decimals between 0 and 1 inclusive',
        dok: 2,
        descriptors: {
            exemplary: 'Uses experimental probabilities stated for events to predict future events in real-world situations. Uses experimental data to make predictions when theoretical probabilities are not known with various group sizes.',
            proficient: 'Identifies important information to use with experimental data and makes predictions based on context. Determines the probability of event A or event B occurring. Determines event probability when data is presented verbally without tables.',
            developing: 'Finds an experimental probability as a fraction or percent from a group of up to 5 items from real-world experiments.',
            beginning: 'Calculates experimental probabilities from 2 or 3 items listed in a table.',
            noEvidence: 'Shows no engagement with experimental probability calculation. Does not attempt to find probabilities or make predictions.'
        }
    },

    // ======================== GRADE 7 (34 benchmarks) ========================
    // Source: Grade 7 Math Benchmark Achievement Level Descriptors (MDE)
    // Strands: Number & Operation, Algebra, Geometry & Measurement, Data Analysis & Probability

    '7.1.1.1': {
        benchmark: 'Know that every rational number can be written as the ratio of two integers or as a terminating or repeating decimal',
        dok: 2,
        descriptors: {
            exemplary: 'Demonstrates conceptual understanding of rational numbers including justification of why a number is rational. Solves non-routine (complex) problems/situations using rational numbers.',
            proficient: 'Recognizes rational numbers in various forms and converts between forms. Compares positive and negative rational numbers. Solves multi-step problems involving rational numbers in routine problems/situations including proportions. Understands that absolute value is the distance from zero.',
            developing: 'Changes numbers in fractional form to decimal form and uses to compare. Recognizes common repeating decimals and perfect squares under 100 as rational. Solves multi-step problems involving familiar rational numbers when all relevant information is present and the question is clearly defined.',
            beginning: 'Changes numbers in fractional form to decimal form by dividing. Recognizes that short terminating decimals, fractions, and whole numbers are rational. Recognizes familiar rational numbers as rational. Recognizes that a negative numbers is less than a positive number. Uses a set of defined steps to find a missing number in a given proportion.',
            noEvidence: 'Shows no engagement with rational numbers. Does not attempt to convert or compare rational numbers in any form.'
        }
    },
    '7.1.1.2': {
        benchmark: 'Understand that division of two integers will always result in a rational number',
        dok: 1,
        descriptors: {
            exemplary: 'Applies understanding of integer division to prove whether results are rational in complex expressions.',
            proficient: 'Understands and explains that dividing any two integers (divisor ≠ 0) always produces a rational number.',
            developing: 'Divides integers and recognizes the result as a rational number in simple cases.',
            beginning: 'Performs integer division only with positive divisors.',
            noEvidence: 'Shows no understanding of integer division or rational number results.'
        }
    },
    '7.1.1.3': {
        benchmark: 'Locate positive and negative rational numbers on a number line, understand concept of opposites, and plot pairs of positive and negative rational numbers on a coordinate grid',
        dok: 2,
        descriptors: {
            exemplary: 'Uses number line reasoning to compare and order rational numbers. Explains relationships between coordinates and reflections across axes.',
            proficient: 'Locates positive and negative rational numbers on a number line accurately. Understands opposites. Plots ordered pairs with rational coordinates in all quadrants.',
            developing: 'Locates common fractions and decimals on a number line. Plots points in all four quadrants with integer coordinates.',
            beginning: 'Locates integers on a number line. Identifies coordinates of points in Quadrant I.',
            noEvidence: 'Shows no ability to locate numbers on a number line or plot points on a coordinate grid.'
        }
    },
    '7.1.1.4': {
        benchmark: 'Compare positive and negative rational numbers expressed in various forms using symbols',
        dok: 2,
        descriptors: {
            exemplary: 'Orders complex sets of rational numbers in multiple forms and justifies comparisons.',
            proficient: 'Compares positive and negative rational numbers in various forms (fractions, decimals, percents) using < > =.',
            developing: 'Compares rational numbers when expressed in the same form.',
            beginning: 'Compares positive integers and simple decimals using < and >.',
            noEvidence: 'Shows no engagement with comparing rational numbers.'
        }
    },
    '7.1.1.5': {
        benchmark: 'Recognize and generate equivalent representations of positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Strategically selects equivalent forms to simplify computation in complex problems.',
            proficient: 'Fluently generates equivalent representations of positive and negative rational numbers across forms.',
            developing: 'Generates equivalent forms for common rational numbers including negatives.',
            beginning: 'Converts between simple benchmark fractions and decimals.',
            noEvidence: 'Shows no ability to generate or recognize equivalent rational number forms.'
        }
    },
    '7.1.2.1': {
        benchmark: 'Add, subtract, multiply and divide positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Solves non-routine (complex) problems/situations using rational numbers.',
            proficient: 'Solves multi-step problems involving rational numbers in routine problems/situations.',
            developing: 'Solves multi-step problems involving familiar rational numbers when all relevant information is present and question is clearly defined.',
            beginning: 'Solves one-step problems with integers when question is clearly defined.',
            noEvidence: 'Shows no engagement with operations on rational numbers.'
        }
    },
    '7.1.2.2': {
        benchmark: 'Use real-world contexts and the inverse relationship between addition/subtraction and multiplication/division to make sense of operations',
        dok: 2,
        descriptors: {
            exemplary: 'Flexibly uses inverse relationships to construct and deconstruct complex multi-step problems.',
            proficient: 'Applies inverse relationships between operations to solve and verify real-world problems.',
            developing: 'Uses inverse relationships to check solutions in familiar contexts.',
            beginning: 'Identifies inverse operations in simple one-step equations.',
            noEvidence: 'Shows no understanding of inverse relationships between operations.'
        }
    },
    '7.1.2.3': {
        benchmark: 'Use order of operations to evaluate expressions and solve problems',
        dok: 1,
        descriptors: {
            exemplary: 'Creates and evaluates expressions involving multiple grouping levels and explains the order of evaluation.',
            proficient: 'Correctly evaluates complex expressions with rational numbers using order of operations including grouping symbols.',
            developing: 'Applies order of operations to expressions with whole numbers and basic operations.',
            beginning: 'Evaluates expressions with only addition and multiplication.',
            noEvidence: 'Shows no understanding of order of operations.'
        }
    },
    '7.1.2.4': {
        benchmark: 'Solve problems requiring arithmetic with integers, fractions, decimals and percents',
        dok: 2,
        descriptors: {
            exemplary: 'Solves complex real-world problems choosing efficient computational strategies.',
            proficient: 'Solves multi-step problems requiring arithmetic with integers, fractions, decimals, and percents in context.',
            developing: 'Solves two-step problems involving combinations of integers, fractions, decimals.',
            beginning: 'Solves single-operation problems with integers.',
            noEvidence: 'Shows no engagement with arithmetic operations across number types.'
        }
    },
    '7.1.2.5': {
        benchmark: 'Use proportional reasoning to solve problems involving ratios in various contexts',
        dok: 2,
        descriptors: {
            exemplary: 'Applies proportional reasoning flexibly to non-routine problems.',
            proficient: 'Solves multi-step problems involving proportional reasoning in various contexts.',
            developing: 'Solves proportion problems using cross-multiplication in straightforward cases.',
            beginning: 'Uses a set of defined steps to find a missing number in a given proportion.',
            noEvidence: 'Shows no engagement with proportional reasoning or ratio problems.'
        }
    },
    '7.1.2.6': {
        benchmark: 'Demonstrate an understanding of the relationship between the absolute value of a rational number and distance on a number line',
        dok: 2,
        descriptors: {
            exemplary: 'Applies absolute value concepts to solve comparison and distance problems in complex contexts.',
            proficient: 'Understands that absolute value is the distance from zero. Uses absolute value in problem solving.',
            developing: 'Finds absolute value of integers and simple rational numbers.',
            beginning: 'Recognizes that a negative number is less than a positive number.',
            noEvidence: 'Shows no understanding of absolute value or distance on a number line.'
        }
    },
    '7.2.1.1': {
        benchmark: 'Understand that a relationship between two variables, x and y, is proportional if it can be expressed in the form y/x = k or y = kx',
        dok: 2,
        descriptors: {
            exemplary: 'Distinguishes proportional relationships from other relationships. Understands the concept of proportionality and applies it to non-routine problem solving situations. Uses the properties as well as order of operations to generate equivalent algebraic expressions and solve non-routine problems. Represents and solves equations involving non-routine representations.',
            proficient: 'Understands the concept of proportionality and applies to routine problem solving situations. Uses properties of algebra as well as order of operations to generate equivalent algebraic expressions and solve problems. Represents and solves equations involving one variable, symbolically.',
            developing: 'Matches a proportion to a given problem situation. Writes algebraic expressions using the commutative and associative properties. Solves equations numerically (by substitution).',
            beginning: 'Represents simple context as a graph. Relies on key words to determine operations to represent relationships. Solves one-step equations in explicit situations following rote procedure, instead of the concept of equality.',
            noEvidence: 'Shows no engagement with proportional relationships or algebraic representations.'
        }
    },
    '7.2.1.2': {
        benchmark: 'Understand that the graph of a proportional relationship is a line through the origin whose slope is the unit rate (constant of proportionality)',
        dok: 2,
        descriptors: {
            exemplary: 'Compares proportional relationships across multiple representations (tables, graphs, equations).',
            proficient: 'Understands that the slope of a proportional relationship graph equals the unit rate and interprets it.',
            developing: 'Identifies the constant of proportionality from a simple graph.',
            beginning: 'Identifies a graph as showing a proportional relationship by recognizing it passes through origin.',
            noEvidence: 'Shows no understanding of proportional relationships or their graphical representation.'
        }
    },
    '7.2.2.1': {
        benchmark: 'Represent proportional relationships with tables, verbal descriptions, symbols, equations and graphs',
        dok: 2,
        descriptors: {
            exemplary: 'Translates fluently between all representations and identifies which is most useful for a given context.',
            proficient: 'Represents proportional relationships across tables, graphs, equations, and verbal descriptions.',
            developing: 'Matches a proportion to a given problem situation.',
            beginning: 'Represents simple context as a graph.',
            noEvidence: 'Shows no engagement with representing proportional relationships.'
        }
    },
    '7.2.2.2': {
        benchmark: 'Determine the unit rate (constant of proportionality) in tables, graphs, equations and verbal descriptions',
        dok: 2,
        descriptors: {
            exemplary: 'Determines and compares unit rates across different representations and contexts.',
            proficient: 'Determines unit rate from tables, graphs, equations, and verbal descriptions.',
            developing: 'Finds unit rate from tables with whole number values.',
            beginning: 'Identifies a unit rate only when explicitly labeled.',
            noEvidence: 'Shows no ability to identify or determine unit rates.'
        }
    },
    '7.2.2.3': {
        benchmark: 'Use knowledge of proportions to assess the reasonableness of solutions',
        dok: 3,
        descriptors: {
            exemplary: 'Explains why a solution is or is not reasonable using proportional reasoning.',
            proficient: 'Assesses reasonableness of solutions to proportion problems using estimation and context.',
            developing: 'Checks reasonableness of proportion solutions in straightforward contexts.',
            beginning: 'Cannot estimate whether a proportion solution is reasonable.',
            noEvidence: 'Shows no engagement with assessing reasonableness of proportional solutions.'
        }
    },
    '7.2.2.4': {
        benchmark: 'Represent real-world or mathematical situations using equations and inequalities involving variables and positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Creates multi-step equations and inequalities from complex real-world situations.',
            proficient: 'Represents real-world situations using equations and inequalities with positive and negative rational numbers.',
            developing: 'Represents straightforward situations using one-step equations with rational numbers.',
            beginning: 'Writes simple one-variable expressions from word problems.',
            noEvidence: 'Shows no engagement with representing situations as equations or inequalities.'
        }
    },
    '7.2.3.1': {
        benchmark: 'Use properties of algebra to generate equivalent expressions involving positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Flexibly generates equivalent expressions in complex contexts and justifies each transformation.',
            proficient: 'Uses multiple algebraic properties to generate equivalent expressions with positive and negative rational numbers.',
            developing: 'Applies distributive property to generate equivalent expressions with rational numbers.',
            beginning: 'Identifies equivalent expressions only by evaluation.',
            noEvidence: 'Shows no understanding of algebraic properties or equivalent expressions.'
        }
    },
    '7.2.3.2': {
        benchmark: 'Evaluate algebraic expressions involving positive and negative rational numbers',
        dok: 1,
        descriptors: {
            exemplary: 'Evaluates complex multi-variable expressions and determines input values that produce specified outputs.',
            proficient: 'Accurately evaluates algebraic expressions with positive and negative rational number substitutions.',
            developing: 'Evaluates expressions by substituting positive and negative rational numbers with procedural support.',
            beginning: 'Substitutes only positive whole numbers into simple expressions.',
            noEvidence: 'Shows no ability to evaluate algebraic expressions.'
        }
    },
    '7.2.3.3': {
        benchmark: 'Apply understanding of order of operations and grouping symbols when using calculators and other technologies',
        dok: 1,
        descriptors: {
            exemplary: 'Identifies and corrects common calculator entry errors related to order of operations.',
            proficient: 'Correctly applies order of operations and grouping symbols when using technology.',
            developing: 'Uses parentheses on calculator for simple groupings.',
            beginning: 'Enters expressions into calculator without attention to order of operations.',
            noEvidence: 'Shows no understanding of order of operations with technology.'
        }
    },
    '7.2.4.1': {
        benchmark: 'Represent relationships in various contexts with equations involving variables and positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Creates equation systems from complex contextual relationships.',
            proficient: 'Represents relationships in various contexts with equations involving positive and negative rational numbers.',
            developing: 'Represents familiar relationships with equations involving rational numbers.',
            beginning: 'Writes simple equations from directly stated relationships.',
            noEvidence: 'Shows no engagement with representing relationships as equations.'
        }
    },
    '7.2.4.2': {
        benchmark: 'Use properties of equality to solve equations involving positive and negative rational numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Solves complex equations and justifies each step using properties of equality.',
            proficient: 'Solves multi-step equations using properties of equality with positive and negative rational numbers.',
            developing: 'Solves one- and two-step equations using inverse operations with rational numbers.',
            beginning: 'Solves one-step equations by guess-and-check.',
            noEvidence: 'Shows no engagement with solving equations.'
        }
    },
    '7.3.1.1': {
        benchmark: 'Demonstrate understanding of proportional relationship between diameter and circumference; calculate circumference and area of circles',
        dok: 2,
        descriptors: {
            exemplary: 'Solves multi-step problems involving use of properties of a circle as well as formulas for area/circumference. Finds areas of part or whole circles given circumferences.',
            proficient: 'Finds areas of sectors of circles given diameter or radius. Solves real-world and mathematical problems involving the area or circumference of circles.',
            developing: 'Computes areas or circumferences of circles given radius or diameter in mathematical problems. Finds diameters of circles when given circumference.',
            beginning: 'Calculates the circumference of a circle when given the diameter. Recognizes a translation or a reflection on a coordinate grid.',
            noEvidence: 'Shows no understanding of circle measurements or formulas.'
        }
    },
    '7.3.1.2': {
        benchmark: 'Calculate the volume and surface area of cylinders and justify the formulas used',
        dok: 2,
        descriptors: {
            exemplary: 'Computes surface and lateral area of cylinders in both real-world and mathematical situations using radius or diameter. Creates and justifies expressions that can be used to calculate surface area and volume. Computes volumes and partial volumes of cylinders with rational dimension values.',
            proficient: 'Applies a formula for the volume of cylinders to real-world situations given whole number diameters and heights. Finds missing whole number dimensions of cylinders given volume.',
            developing: 'Computes volumes of cylinders given radius and height when all dimensions are whole numbers.',
            beginning: 'Computes volumes of cylinders given area of base and height.',
            noEvidence: 'Shows no understanding of cylinder volume or surface area calculations.'
        }
    },
    '7.3.2.1': {
        benchmark: 'Describe the properties of similarity, compare geometric figures for similarity, and determine scale factors',
        dok: 2,
        descriptors: {
            exemplary: 'Calculates scale factors that are proper or improper fractions based on the directionality of transformation.',
            proficient: 'Calculates scale factors given some side lengths to compare similar figures represented in different orientations or from written descriptions. Identifies corresponding sides and angles of polygons in different orientations. Consistently uses ~ (similar), ≅ (congruent), segment and length notation.',
            developing: 'Calculates whole number scale factors between two labeled figures and identifies a scale factor of 1/2. Identifies corresponding sides and angles of polygons in the same orientation or reflections.',
            beginning: 'Identifies corresponding sides and angles of similar triangles in the same orientation. Recognizes one-letter labels as referring to vertices and two-letter labels as referring to sides.',
            noEvidence: 'Shows no understanding of similarity or scale factors.'
        }
    },
    '7.3.2.2': {
        benchmark: 'Apply scale factors, length ratios and area ratios to determine side lengths and areas of similar geometric figures',
        dok: 2,
        descriptors: {
            exemplary: 'Calculates areas of similar figures based on the ratio of side lengths and vice versa. Solves multi-step problems involving a scale factor.',
            proficient: 'Applies scale factors (including decimals), given side lengths and ratios to compute unknown side lengths in similar figures that are either shown in the same orientation or described in words. Finds scale factor of area by calculating area and comparing.',
            developing: 'Calculates differences in lengths of corresponding sides.',
            beginning: 'Uses a 1-digit scale factor to scale up a 1-digit dimension. Identifies corresponding sides of similar figures in the same orientation.',
            noEvidence: 'Shows no understanding of applying scale factors to similar figures.'
        }
    },
    '7.3.2.3': {
        benchmark: 'Use proportions and ratios to solve problems involving scale drawings and conversions of measurement units',
        dok: 2,
        descriptors: {
            exemplary: 'Solves and explains multi-step problems that involve both scale drawings and conversion of measurement units.',
            proficient: 'Consistently applies scales involving rational numbers. Solves multi-step problems that are represented visually and involve both scale drawings and conversion of measurement units, including measures of time.',
            developing: 'Solves one-step problems by multiplying or dividing a given dimension by a common or given scale/ratio by calculating with fractions or mixed numbers with denominators less than 5 or decimals to the tenths place.',
            beginning: 'Solves one-step problems by multiplying or dividing whole-number dimensions by a given scale (1 to X, where X is a 1-digit number), whose result is a whole number.',
            noEvidence: 'Shows no engagement with scale drawings or measurement unit conversions.'
        }
    },
    '7.3.2.4': {
        benchmark: 'Graph and describe translations and reflections of figures on a coordinate grid and determine the coordinates of the vertices after the transformation',
        dok: 2,
        descriptors: {
            exemplary: 'Performs reflections over horizontal lines, vertical lines, and the line y = x. Performs multiple transformations involving both translations and reflections.',
            proficient: 'Uses translation notation (x, y) → (x + a, y + b) to perform translations of polygons on a coordinate grid. Identifies image of figure reflected over either axis.',
            developing: 'Identifies vertex coordinates of a figure after two translations when given original figure and written translation rule.',
            beginning: 'Determines coordinates of the image of a point reflected across an axis.',
            noEvidence: 'Shows no understanding of transformations on a coordinate grid.'
        }
    },
    '7.4.1.1': {
        benchmark: 'Design simple experiments and collect data. Determine mean, median and range for quantitative data',
        dok: 2,
        descriptors: {
            exemplary: 'Compares means, medians, and ranges of different data sets displayed in tables, frequency tables, and plots. Finds multiple missing data values given some data and mean, median, or range. Creates data sets satisfying given conditions on means, medians, and ranges.',
            proficient: 'Compares means, medians, or ranges of different data sets displayed in tables and plots. Finds a single missing data value given some data and mean, median, or range. Determines means, medians, and ranges from provided data values in data displays (e.g., bar graphs, stem-and-leaf plots).',
            developing: 'Calculates means, medians, and ranges from data sets in lists, tables, and line plots with whole numbers or decimals to the hundredths place. Reads and calculates range from a stem-and-leaf plot.',
            beginning: 'Calculates means and medians from small data sets with whole-number values less than 100 or money (with a quarter value) in lists and tables.',
            noEvidence: 'Shows no engagement with calculating or analyzing statistical measures.'
        }
    },
    '7.4.1.2': {
        benchmark: 'Describe the impact that inserting or deleting a data point has on the mean and the median of a data set',
        dok: 3,
        descriptors: {
            exemplary: 'Explains how the addition or removal of a data point to a data set described in context will cause the mean and median to increase or decrease, and by how much. Solves multi-step problems using given mean, median, add or remove values. Finds possible data values to add to or remove from a data set described in context that causes a specified change in the mean and median.',
            proficient: 'Determines whether the addition or removal of a data point to a data set in a list or table will cause the mean or median to increase or decrease, and by how much. Finds data point value to add or remove from a data set in a list or table that causes a specified change in the mean or median.',
            developing: 'Identifies the original and new mean or median in a small data set when adding or removing a value. Identifies whether the mean and median increase, decrease, or remain the same in a straightforward situation with a small data set.',
            beginning: 'Knows the general process of how to find the mean of a set of numbers.',
            noEvidence: 'Shows no understanding of how data point changes affect mean or median.'
        }
    },
    '7.4.2.1': {
        benchmark: 'Use reasoning with proportions to display and interpret data in circle graphs and histograms',
        dok: 2,
        descriptors: {
            exemplary: 'Uses fractional proportions to solve problems. Designs and creates histograms based on data that includes decimals, fractions, and mixed numbers.',
            proficient: 'Uses proportional reasoning to determine or estimate values in circle graphs. Solves multi-step problems using histograms and circle graphs in context. Plots data on histograms originally displayed in lists, tables, circle graphs, or from proportional information.',
            developing: 'Reads values from histograms and circle graphs. Solves one-step problems using data from a circle graph. Graphs bars on histograms from small data lists.',
            beginning: 'Identifies a circle graph by viewing relative proportions or based on a stated data set. Makes basic comparisons of categories in a circle graph when provided the percents as well.',
            noEvidence: 'Shows no engagement with circle graphs or histograms.'
        }
    },
    '7.4.3.2': {
        benchmark: 'Calculate probability as a fraction of sample space or as a fraction of area',
        dok: 2,
        descriptors: {
            exemplary: 'Calculates probabilities of complements of events and compound events (using sample space). Calculates probabilities of random selection from geometric areas (e.g., concentric circles or rectangles) written as a fraction, percent, or decimal.',
            proficient: 'Calculates probabilities of mutually exclusive events (e.g., sums from rolling two dice) written as a fraction, percent, or decimal in real-world situations. Calculates probabilities of random selection from simple area models and writes them as a fraction, percent, or decimal.',
            developing: 'Calculates probabilities of up to 3 related mutually exclusive events (e.g., rolls a 2 or a 5) written as a fraction or decimal in real-world situations. Determines the size of a sample space, up to 100 objects in the space.',
            beginning: 'Knows that probabilities can be written as percents between 0% and 100% or as fractions between 0 and 1.',
            noEvidence: 'Shows no understanding of probability calculations.'
        }
    },
    '7.4.3.3': {
        benchmark: 'Use proportional reasoning to draw conclusions about and predict relative frequencies of outcomes based on probabilities',
        dok: 2,
        descriptors: {
            exemplary: 'Uses experimental frequencies of a situation to make predictions using proportional reasoning.',
            proficient: 'Uses probabilities to determine most likely outcomes. Uses proportional reasoning to find theoretical expected values and to predict future outcomes. Compares experimental frequencies to expected frequencies.',
            developing: 'Uses proportional reasoning to predict future outcomes using simple values (e.g., multiples of 10).',
            beginning: 'Uses proportional reasoning to predict future outcomes using multiples of 100.',
            noEvidence: 'Shows no engagement with probability predictions or proportional reasoning.'
        }
    },
    '7.4.3.1': {
        benchmark: 'Use random numbers generated by a calculator or a spreadsheet to simulate situations involving randomness (Not assessed on MCA-III)',
        dok: 2,
        descriptors: {
            exemplary: 'Designs and runs simulations using random number generators to model complex probability situations and explains the relationship between simulation results and theoretical probabilities.',
            proficient: 'Uses random numbers from a calculator or spreadsheet to simulate situations involving randomness and interprets the results.',
            developing: 'Follows provided steps to generate random numbers and run a basic simulation.',
            beginning: 'Recognizes that calculators and spreadsheets can generate random numbers.',
            noEvidence: 'Shows no engagement with random number simulation. Does not attempt to use technology for probability simulations.'
        }
    },

    // ======================== GRADE 8 (31 benchmarks) ========================
    // Source: Grade 8 Math Benchmark Achievement Level Descriptors (MDE)
    // Strands: Number & Operation, Algebra, Geometry & Measurement, Data Analysis & Probability

    '8.1.1.1': {
        benchmark: 'Classify real numbers as rational or irrational. Know that when a square root of a positive integer is not an integer, then it is irrational. Know that pi is irrational',
        dok: 1,
        descriptors: {
            exemplary: 'Demonstrates conceptual understanding of real numbers and distinguishes between rational and irrational numbers with sophisticated reasoning.',
            proficient: 'Compares real numbers and generates equivalent expressions involving rational numbers in routine problems and situations, including scientific notation.',
            developing: 'Recognizes familiar rational and irrational numbers and attempts to classify them.',
            beginning: 'Recognizes fractions and terminating decimals as rational numbers.',
            noEvidence: 'Shows no engagement with real number classification. Does not attempt to identify rational or irrational numbers.'
        }
    },
    '8.1.1.2': {
        benchmark: 'Compare real numbers; locate real numbers on a number line. Identify the square root of a positive integer as an integer, or if it is not an integer, locate it as between two consecutive integers',
        dok: 2,
        descriptors: {
            exemplary: 'Orders complex sets of real numbers including expressions with radicals and pi with accuracy and confidence.',
            proficient: 'Compares real numbers including irrational numbers and locates rational and irrational numbers on a number line accurately.',
            developing: 'Identifies square roots of perfect squares and locates them on a number line. Estimates non-perfect square roots between two consecutive integers.',
            beginning: 'Estimates square roots of perfect squares under 100.',
            noEvidence: 'Shows no engagement with comparing or locating real numbers. Does not attempt to identify square roots on a number line.'
        }
    },
    '8.1.1.3': {
        benchmark: 'Determine rational approximations for solutions to problems involving real numbers',
        dok: 2,
        descriptors: {
            exemplary: 'Uses rational approximations strategically in multi-step problems involving real numbers and justifies choices.',
            proficient: 'Determines rational approximations for irrational numbers in problem-solving contexts.',
            developing: 'Approximates square roots to the nearest tenth.',
            beginning: 'Approximates simple square roots to the nearest integer.',
            noEvidence: 'Shows no engagement with approximating real numbers. Does not attempt to find rational approximations.'
        }
    },
    '8.1.1.4': {
        benchmark: 'Know and apply the properties of positive and negative integer exponents to generate equivalent numerical expressions',
        dok: 2,
        descriptors: {
            exemplary: 'Flexibly applies all exponent properties including zero and negative exponents in complex expressions with understanding.',
            proficient: 'Applies properties of positive and negative integer exponents to generate equivalent expressions.',
            developing: 'Applies basic exponent rules (product rule, power rule) with positive integers.',
            beginning: 'Evaluates expressions with small positive exponents.',
            noEvidence: 'Shows no engagement with exponent properties. Does not attempt to apply exponent rules.'
        }
    },
    '8.1.1.5': {
        benchmark: 'Express approximations of very large and very small numbers using scientific notation; understand how calculators display numbers in scientific notation',
        dok: 2,
        descriptors: {
            exemplary: 'Computes with numbers in scientific notation and compares magnitudes of numbers expressed in different forms.',
            proficient: 'Expresses very large and very small numbers in scientific notation and interprets calculator displays.',
            developing: 'Converts between standard form and scientific notation for straightforward values.',
            beginning: 'Reads scientific notation but cannot convert between forms.',
            noEvidence: 'Shows no engagement with scientific notation. Does not attempt to express or interpret numbers in scientific notation.'
        }
    },
    '8.2.1.1': {
        benchmark: 'Understand that a function is a relationship between an independent and a dependent variable in which the value of the independent variable determines the value of the dependent variable',
        dok: 2,
        descriptors: {
            exemplary: 'Demonstrates conceptual understanding of dependent and independent variables. Represents non-routine linear situations with tables, verbal descriptions, symbols, equations, and graphs. Solves equations and inequalities and interprets solutions. Converts between forms of a linear equation. Represents systems of linear equations from verbal description and solves algebraically and graphically, expressing solutions as ordered pairs.',
            proficient: 'Recognizes linear functions in symbolic and graphic presentations. Represents familiar and routine linear situations with tables, verbal descriptions, symbols, equations, and graphs and translates from one representation to another. Identifies graphical properties of linear functions. Generates and evaluates equivalent algebraic expressions. Identifies systems of linear equations from verbal description and identifies the solution as the intersection of two lines when given a graph. Solves equations and inequalities using algebraic properties.',
            developing: 'Recognizes familiar linear functions in symbolic and graphic presentations. Translates linear representations from an equation in slope-intercept form to a graph. Identifies y-intercept and slope from graphical representation or an equation in slope-intercept form. Evaluates routine algebraic expressions. Solves equations with variables using substitution.',
            beginning: 'Recognizes linear functions in graphic presentations. Translates linear representations from a table to a graph. Identifies slope by counting whole number units on a graph. Identifies patterns in a table of a linear function. Substitutes simple numbers and evaluates simple expressions.',
            noEvidence: 'Shows no engagement with functions or linear relationships. Does not attempt to identify independent and dependent variables.'
        }
    },
    '8.2.1.2': {
        benchmark: 'Use linear functions to represent relationships in which changing the input variable by some amount leads to a change in the output variable that is always the same',
        dok: 2,
        descriptors: {
            exemplary: 'Compares rates of change across multiple linear functions in different representations with sophisticated analysis.',
            proficient: 'Uses linear functions to represent constant-rate relationships and connects rate of change to slope.',
            developing: 'Determines rate of change from tables and simple graphs.',
            beginning: 'Identifies that linear functions have constant rate of change from tables.',
            noEvidence: 'Shows no engagement with rate of change or linear functions. Does not attempt to identify constant rates.'
        }
    },
    '8.2.1.3': {
        benchmark: 'Understand that a function is linear if it can be expressed in the form f(x) = mx + b or if its graph is a straight line',
        dok: 1,
        descriptors: {
            exemplary: 'Determines linearity from tables, equations, and verbal descriptions and explains reasoning clearly.',
            proficient: 'Understands that f(x) = mx + b defines a linear function and connects this to graphical representation.',
            developing: 'Identifies whether a function is linear from equation or graph.',
            beginning: 'Recognizes linear equations in y = mx + b form.',
            noEvidence: 'Shows no engagement with linear functions. Does not attempt to recognize or identify linear equations.'
        }
    },
    '8.2.1.4': {
        benchmark: 'Understand that an arithmetic sequence is a linear function that can be expressed in the form f(x) = mx + b',
        dok: 2,
        descriptors: {
            exemplary: 'Writes explicit and recursive formulas for arithmetic sequences and explains the connection to linear functions with clarity.',
            proficient: 'Connects arithmetic sequences to linear functions f(x) = mx + b where m is the common difference.',
            developing: 'Finds common difference and next terms in arithmetic sequences.',
            beginning: 'Identifies patterns in arithmetic sequences.',
            noEvidence: 'Shows no engagement with arithmetic sequences or linear functions. Does not attempt to identify patterns.'
        }
    },
    '8.2.1.5': {
        benchmark: 'Understand that a geometric sequence is a non-linear function that can be expressed in the form f(x) = ab^x',
        dok: 2,
        descriptors: {
            exemplary: 'Writes explicit formulas for geometric sequences and explains why growth is exponential.',
            proficient: 'Understands geometric sequences as non-linear functions and distinguishes them from arithmetic sequences.',
            developing: 'Finds common ratio and next terms in geometric sequences.',
            beginning: 'Identifies patterns in geometric sequences with obvious common ratios.',
            noEvidence: 'Shows no engagement with geometric sequences. Does not attempt to identify patterns or ratios.'
        }
    },
    '8.2.2.1': {
        benchmark: 'Represent linear functions with tables, verbal descriptions, symbols, equations and graphs; translate from one representation to another',
        dok: 2,
        descriptors: {
            exemplary: 'Represents non-routine linear situations across all representations fluently and translates between them with ease.',
            proficient: 'Represents linear functions across all representations and translates between them.',
            developing: 'Translates linear representations from an equation in slope-intercept form to a graph.',
            beginning: 'Translates linear representations from a table to a graph. Identifies patterns in a table.',
            noEvidence: 'Shows no engagement with representing linear functions. Does not attempt to translate between representations.'
        }
    },
    '8.2.2.2': {
        benchmark: 'Identify graphical properties of linear functions including slope and intercepts',
        dok: 2,
        descriptors: {
            exemplary: 'Analyzes how changes in m and b affect the graph and connects these changes to real-world meaning.',
            proficient: 'Identifies graphical properties of linear functions including slope, y-intercept, and x-intercept from multiple representations.',
            developing: 'Identifies y-intercept and slope from graphical representation or an equation in slope-intercept form.',
            beginning: 'Identifies slope by counting whole number units on a graph.',
            noEvidence: 'Shows no engagement with graphical properties of lines. Does not attempt to identify slope or intercepts.'
        }
    },
    '8.2.2.3': {
        benchmark: 'Identify how coefficient changes in the equation f(x) = mx + b affect the graphs of linear functions',
        dok: 2,
        descriptors: {
            exemplary: 'Predicts and justifies graphical effects of coefficient changes in complex scenarios with sophisticated reasoning.',
            proficient: 'Explains how changes in both m and b affect the position, steepness, and direction of the graph.',
            developing: 'Identifies that increasing m makes the line steeper and changing b shifts the line.',
            beginning: 'Recognizes that changing b moves the line up or down.',
            noEvidence: 'Shows no engagement with coefficient changes. Does not attempt to predict graphical effects.'
        }
    },
    '8.2.2.4': {
        benchmark: 'Represent arithmetic sequences using equations, tables, graphs and verbal descriptions',
        dok: 2,
        descriptors: {
            exemplary: 'Translates fluently between all representations and creates sequences for given constraints.',
            proficient: 'Represents arithmetic sequences across equations, tables, graphs, and verbal descriptions.',
            developing: 'Creates a table for an arithmetic sequence and plots points.',
            beginning: 'Lists terms of a sequence from a given rule.',
            noEvidence: 'Shows no engagement with arithmetic sequences. Does not attempt to represent or list sequence terms.'
        }
    },
    '8.2.2.5': {
        benchmark: 'Represent geometric sequences using equations, tables, graphs and verbal descriptions',
        dok: 2,
        descriptors: {
            exemplary: 'Compares geometric and arithmetic sequence representations and applies them to real-world growth problems.',
            proficient: 'Represents geometric sequences across equations, tables, graphs, and verbal descriptions.',
            developing: 'Creates a table for a geometric sequence and recognizes the curved graph shape.',
            beginning: 'Lists terms of a geometric sequence from a given rule.',
            noEvidence: 'Shows no engagement with geometric sequences. Does not attempt to represent or list sequence terms.'
        }
    },
    '8.2.3.1': {
        benchmark: 'Evaluate algebraic expressions, including expressions containing radicals and absolute values',
        dok: 2,
        descriptors: {
            exemplary: 'Evaluates complex expressions and uses algebraic properties for justification of steps.',
            proficient: 'Generates and evaluates equivalent algebraic expressions including radicals and absolute values.',
            developing: 'Evaluates routine algebraic expressions including some with radicals.',
            beginning: 'Substitutes simple numbers and evaluates simple expressions.',
            noEvidence: 'Shows no engagement with algebraic expressions. Does not attempt to substitute or evaluate.'
        }
    },
    '8.2.3.2': {
        benchmark: 'Justify steps in generating equivalent expressions by identifying the properties used',
        dok: 2,
        descriptors: {
            exemplary: 'Constructs proofs of expression equivalence using formal property names.',
            proficient: 'Justifies each step in generating equivalent expressions by identifying properties used.',
            developing: 'Names some properties used when simplifying expressions.',
            beginning: 'Identifies the commutative property in simple examples.',
            noEvidence: 'Shows no engagement with algebraic properties. Does not attempt to justify steps or identify properties.'
        }
    },
    '8.2.4.1': {
        benchmark: 'Use linear equations to represent situations involving a constant rate of change',
        dok: 2,
        descriptors: {
            exemplary: 'Creates and interprets linear models for complex real-world constant-rate situations.',
            proficient: 'Uses linear equations to model real-world situations involving constant rate of change.',
            developing: 'Represents familiar constant-rate situations with linear equations.',
            beginning: 'Writes simple equations for directly proportional relationships.',
            noEvidence: 'Shows no engagement with linear equations. Does not attempt to model constant-rate situations.'
        }
    },
    '8.2.4.2': {
        benchmark: 'Solve multi-step equations in one variable. Solve for one variable in a multi-variable equation',
        dok: 2,
        descriptors: {
            exemplary: 'Solves for one variable in terms of other variables in equations with two, three or four variables containing grouping symbols and multiple terms.',
            proficient: 'Consistently solves multi-step equations with one variable containing multiple terms and grouping symbols, including when presented in novel forms.',
            developing: 'Understands how to solve for an unknown quantity in familiar real-world situations. Solves straightforward one-variable equations with several steps involving whole numbers and addition.',
            beginning: 'Combines like terms.',
            noEvidence: 'Shows no engagement with multi-step equations. Does not attempt to solve for variables.'
        }
    },
    '8.2.4.3': {
        benchmark: 'Express linear equations in slope-intercept, point-slope and standard forms, and convert between these forms',
        dok: 2,
        descriptors: {
            exemplary: 'Fluently converts between slope-intercept, standard, and point-slope forms of a linear equation. Writes equations of lines given two points or a point and the slope.',
            proficient: 'Converts a linear equation from standard and point-slope forms to slope-intercept form. Computes the slope of a line given two ordered pairs and creates an equation of the line in slope-intercept form.',
            developing: 'Identifies the equation of a line in slope-intercept form when given rational values for the slope and y-intercept.',
            beginning: 'Identifies the equation of a line in the form y = mx when given the slope.',
            noEvidence: 'Shows no engagement with linear equation forms. Does not attempt to identify or convert equations.'
        }
    },
    '8.2.4.4': {
        benchmark: 'Use linear inequalities to represent relationships in various contexts',
        dok: 2,
        descriptors: {
            exemplary: 'Fluently solves linear inequalities in novel mathematical and real-world situations and interprets solutions in the context of the problem.',
            proficient: 'Consistently uses or creates linear inequalities to represent relationships in real-world contexts and interprets "at least" and "at most" correctly.',
            developing: 'Represents familiar real-world contexts using linear inequalities with proportional and non-proportional relationships.',
            beginning: 'Distinguishes a quantity that varies from a fixed quantity when creating linear inequalities in real-world situations.',
            noEvidence: 'Shows no engagement with linear inequalities. Does not attempt to represent relationships with inequalities.'
        }
    },
    '8.2.4.5': {
        benchmark: 'Solve linear inequalities using properties of inequalities. Graph solutions on a number line',
        dok: 2,
        descriptors: {
            exemplary: 'Fluently solves complex linear inequalities including compound inequalities with both positive and negative coefficients and variables on both sides. Understands that multiplying or dividing by a negative number reverses the direction of the inequality and graphs solutions accurately.',
            proficient: 'Solves linear inequalities with both positive and negative coefficients on variable terms and provides solution in symbolic form. Understands open and closed circles on number lines and applies them correctly.',
            developing: 'Solves one- and two-step linear inequalities using sums or differences with positive coefficients on the variable term with whole-number solutions.',
            beginning: 'Solves simple linear inequalities involving positive rational numbers and addition.',
            noEvidence: 'Shows no engagement with linear inequalities. Does not attempt to solve or graph inequalities.'
        }
    },
    '8.2.4.6': {
        benchmark: 'Represent relationships in various contexts with equations and inequalities involving the absolute value of a linear expression',
        dok: 2,
        descriptors: {
            exemplary: 'Solves equations and inequalities involving the absolute value of a linear expression and graphs the solutions on a number line. Recognizes the equation or inequality involving absolute value that best represents a described relationship.',
            proficient: 'Solves equations involving the absolute value of a linear expression and graphs inequalities on number lines using appropriate circle notation.',
            developing: 'Finds the two values that satisfy an absolute value equation involving the absolute value of a linear expression and identifies both solutions.',
            beginning: 'Identifies the positive solution to an absolute value equation of the form |mx| = k.',
            noEvidence: 'Shows no engagement with absolute value equations. Does not attempt to find or graph solutions.'
        }
    },
    '8.2.4.7': {
        benchmark: 'Represent relationships in various contexts using systems of linear equations. Solve systems of linear equations in two variables symbolically, graphically and numerically',
        dok: 3,
        descriptors: {
            exemplary: 'Solves real-world problems involving two linear relationships by creating a system of linear equations and providing solutions in context. Identifies systems in different forms and understands the differences between no solution, one solution, and infinitely many solutions.',
            proficient: 'Identifies the system of equations that represents a described relationship, including situations with fractions or decimals. Understands that the intersection point is the solution. Solves systems of equations involving two variables and interprets the meaning of solutions in context.',
            developing: 'Identifies the system of equations that represents a described relationship when whole numbers or monetary values are involved and both equations are in ax + by = c form.',
            beginning: 'Identifies an x-value and/or y-value that satisfies one equation in a system of linear equations.',
            noEvidence: 'Shows no engagement with systems of equations. Does not attempt to identify or solve systems.'
        }
    },
    '8.2.4.8': {
        benchmark: 'Understand that a system of linear equations may have no solution, one solution, or infinitely many solutions. Relate the number of solutions to pairs of lines that are intersecting, parallel or identical (Assessed within 8.2.4.7)',
        dok: 3,
        descriptors: {
            exemplary: 'Interprets and explains the relationships between types of solutions and the geometric representations of intersecting, parallel, and identical lines.',
            proficient: 'Understands the differences between systems with no solution, one solution, and infinitely many solutions and relates to graphical representations.',
            developing: 'Recognizes that different line arrangements produce different solution types.',
            beginning: 'Identifies whether lines intersect or are parallel.',
            noEvidence: 'Shows no engagement with solutions of systems. Does not attempt to relate algebraic and graphical representations.'
        }
    },
    '8.2.4.9': {
        benchmark: 'Use the relationship between square roots and squares of a number to solve problems',
        dok: 2,
        descriptors: {
            exemplary: 'Recognizes the inverse effect of squaring and taking square roots. Solves multi-step problems involving squares and square roots in mathematical and real-world contexts.',
            proficient: 'Distinguishes between solution strategies depending on whether the variable is under the radical or is the base. Solves equations involving squares and square roots including when values are not perfect squares and equations involve multiple steps.',
            developing: 'Distinguishes between taking the square root of a perfect square and taking half of that number. Finds whole number solutions to one-step and simple two-step problems.',
            beginning: 'Solves one-step, real-world problems by taking the square root of a perfect square less than 150.',
            noEvidence: 'Shows no engagement with square roots and squares. Does not attempt to solve related problems.'
        }
    },
    '8.3.1.1': {
        benchmark: 'Use the Pythagorean Theorem to solve problems involving right triangles',
        dok: 2,
        descriptors: {
            exemplary: 'Uses the Pythagorean Theorem to solve problems related to three-dimensional figures. Solves multi-step, real-world and mathematical problems involving right triangles to compute missing lengths.',
            proficient: 'Understands that the Pythagorean Theorem describes the relationship between the lengths of the legs and the hypotenuse in right triangles. Uses the theorem and strategies like Pythagorean triples flexibly to compute multiple missing sides and lengths in real-world contexts.',
            developing: 'Uses the Pythagorean Theorem to find an unknown side length in a right triangle given the other two lengths.',
            beginning: 'Understands that the hypotenuse is the longest side in a right triangle.',
            noEvidence: 'Shows no engagement with the Pythagorean Theorem. Does not attempt to find side lengths in right triangles.'
        }
    },
    '8.3.1.2': {
        benchmark: 'Determine the distance between two points on a horizontal or vertical line in a coordinate system. Use the Pythagorean Theorem to find the distance between any two points',
        dok: 2,
        descriptors: {
            exemplary: 'Finds distance between two points on a coordinate grid with non-unit scales. Determines possible locations of a second point given a point and the distance between them.',
            proficient: 'Understands shortest distance as the straight line between two points. Uses the distance formula flexibly to find lengths of segments on a coordinate grid or the distance between points in real-world situations.',
            developing: 'Finds distance between two points on vertical or horizontal lines when differences involve any combination of negative and positive rational numbers. Understands distance as non-negative.',
            beginning: 'Finds distance between two points on a vertical or horizontal line if coordinates are both positive integers.',
            noEvidence: 'Shows no engagement with distance between points. Does not attempt to find or calculate distances.'
        }
    },
    '8.3.1.3': {
        benchmark: 'Informally justify the Pythagorean Theorem by using measurements, diagrams and computer software (Not assessed on MCA-III)',
        dok: 3,
        descriptors: {
            exemplary: 'Creates and explains multiple informal justifications for the Pythagorean Theorem using different methods and tools.',
            proficient: 'Provides informal justification for the Pythagorean Theorem using measurements, diagrams, or technology.',
            developing: 'Attempts to justify the Pythagorean Theorem using at least one method.',
            beginning: 'Recognizes that the Pythagorean Theorem involves measurements in right triangles.',
            noEvidence: 'Shows no engagement with justifying the Pythagorean Theorem. Does not attempt to explain or demonstrate the relationship.'
        }
    },
    '8.3.2.1': {
        benchmark: 'Understand and apply the relationships between the slopes of parallel lines and between the slopes of perpendicular lines',
        dok: 2,
        descriptors: {
            exemplary: 'Understands y = b as a special case representing horizontal lines. Compares slopes of quadrilaterals to determine slopes of missing sides. Identifies, graphs, or creates equations of lines in any form that are parallel or perpendicular to given linear functions.',
            proficient: 'Understands that slopes of perpendicular lines are negative reciprocals. Graphs a line parallel to a given line using its equation and a point. Identifies equations of lines parallel or perpendicular to a given equation in slope-intercept form.',
            developing: 'Understands that slopes of perpendicular lines have opposite signs. Determines the slope of a line parallel to a graphed line with two labeled points.',
            beginning: 'Understands that parallel lines have the same slope.',
            noEvidence: 'Shows no engagement with slopes of parallel or perpendicular lines. Does not attempt to identify or apply slope relationships.'
        }
    },
    '8.4.1.1': {
        benchmark: 'Collect, display and interpret data using scatterplots. Use the shape of the scatterplot to informally estimate a line of best fit and determine an equation for the line. Use appropriate titles, labels and units. Know how to use graphing technology to display scatterplots and corresponding lines of best fit',
        dok: 3,
        descriptors: {
            exemplary: 'Given a data set, determines the line of best fit and interprets the data. Assesses the reasonableness of predictions in non-routine situations.',
            proficient: 'Given a data set, identifies the line of best fit and interprets the data. Makes predictions about the data set.',
            developing: 'Given a data set, identifies the line of best fit and makes statements about the general trend of the data.',
            beginning: 'Generalizes the properties of the line of best fit from a graphed data set. Displays data using scatterplots.',
            noEvidence: 'Shows no engagement with scatterplots or data interpretation. Does not attempt to display, analyze, or make predictions from data.'
        }
    }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get rubric descriptors for a specific benchmark code
 * @param {string} code - Benchmark code (e.g., '6.1.1.1')
 * @returns {object|null} Rubric object with benchmark, dok, and descriptors
 */
function getRubricForBenchmark(code) {
    return RUBRIC_DESCRIPTORS[code] || null;
}

/**
 * Get all rubric descriptors for a given grade level
 * @param {number|string} grade - Grade number (6, 7, or 8)
 * @returns {object} Object containing all benchmarks for that grade
 */
function getRubricsForGrade(grade) {
    const prefix = String(grade) + '.';
    const result = {};
    for (const [code, data] of Object.entries(RUBRIC_DESCRIPTORS)) {
        if (code.startsWith(prefix)) {
            result[code] = data;
        }
    }
    return result;
}

/**
 * Get rubric descriptors for an array of standard codes
 * @param {string[]} standardCodes - Array of benchmark codes
 * @returns {object} Object containing matching rubric descriptors
 */
function getRubricsForStandards(standardCodes) {
    const result = {};
    for (const code of standardCodes) {
        const rubric = RUBRIC_DESCRIPTORS[code];
        if (rubric) {
            result[code] = rubric;
        }
    }
    return result;
}

/**
 * Get all benchmark codes for a given strand within a grade
 * @param {number|string} grade - Grade number (6, 7, or 8)
 * @param {number|string} strand - Strand number (1=Number&Op, 2=Algebra, 3=Geometry, 4=Data)
 * @returns {string[]} Array of benchmark codes
 */
function getBenchmarksByStrand(grade, strand) {
    const prefix = grade + '.' + strand + '.';
    return Object.keys(RUBRIC_DESCRIPTORS).filter(code => code.startsWith(prefix));
}

/**
 * Get a summary count of all benchmarks by grade
 * @returns {object} { grade6: N, grade7: N, grade8: N, total: N }
 */
function getBenchmarkCounts() {
    const codes = Object.keys(RUBRIC_DESCRIPTORS);
    const g6 = codes.filter(c => c.startsWith('6.')).length;
    const g7 = codes.filter(c => c.startsWith('7.')).length;
    const g8 = codes.filter(c => c.startsWith('8.')).length;
    return { grade6: g6, grade7: g7, grade8: g8, total: g6 + g7 + g8 };
}

/**
 * Get the proficiency level info for a given score
 * @param {number} score - Numeric score
 * @returns {object} Matching proficiency level from PROFICIENCY_SCALE
 */
function getProficiencyLevel(score) {
    if (score >= 9.25) return PROFICIENCY_SCALE.exemplary;
    if (score >= 8.0) return PROFICIENCY_SCALE.proficient;
    if (score >= 7.0) return PROFICIENCY_SCALE.developing;
    if (score >= 5.75) return PROFICIENCY_SCALE.beginning;
    return PROFICIENCY_SCALE.noEvidence;
}
