/* ═══════════════════════════════════════════════════════════
   MCA VOCABULARY ENGINE — Term Definitions & Flow Integration
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   Provides:
   - 365+ math vocabulary terms with definitions
   - Topic-to-vocabulary mapping via BenchmarkDescriptors
   - Socratic flow vocab node generation
   - Vocab quiz question generation

   Public API:
     MCAVocabEngine.lookup(term)             → { term, definition, grade, topics }
     MCAVocabEngine.forTopic(flowTopic)      → [{ term, definition }, ...]
     MCAVocabEngine.forGrade(grade)           → [{ term, definition }, ...]
     MCAVocabEngine.generateVocabNode(topic)  → Socratic flow node object
     MCAVocabEngine.generateQuizNode(topic)   → Socratic flow question node
     MCAVocabEngine.search(query)             → [{ term, definition }, ...]
     MCAVocabEngine.allTerms()                → array of all term strings
     MCAVocabEngine.GLOSSARY                  → full glossary map
   ═══════════════════════════════════════════════════════════ */

const MCAVocabEngine = (() => {
    'use strict';

    // ════════════════════════════════════════════════
    //  GLOSSARY — term → definition
    //  Organized by conceptual domain for readability
    // ════════════════════════════════════════════════

    const GLOSSARY = {

        // ── Number & Counting (K-2) ──
        'count': 'To tell how many objects are in a group by assigning one number to each object.',
        'number': 'A symbol or word that represents a quantity or amount.',
        'more': 'A greater amount when comparing two groups or numbers.',
        'fewer': 'A smaller amount when comparing two groups of objects.',
        'equal': 'Having the same value or amount.',
        'how many': 'A question asking for the total count of objects in a group.',
        'compare': 'To decide if a number is greater than, less than, or equal to another number.',
        'add': 'To combine two or more amounts to find the total.',
        'subtract': 'To take away one amount from another to find the difference.',
        'join': 'To put groups together; another way to think about addition.',
        'take away': 'To remove objects from a group; a model for subtraction.',
        'put together': 'To combine two parts to make a whole; a model for addition.',
        'sum': 'The result of adding two or more numbers.',
        'difference': 'The result of subtracting one number from another.',
        'sort': 'To arrange objects into groups based on a shared property.',
        'group': 'A collection of objects that share a common attribute.',
        'category': 'A label for a group of objects that share a property.',
        'same': 'Having an identical attribute or value.',
        'different': 'Not having the same attribute or value.',

        // ── Place Value (K-5) ──
        'tens': 'Groups of 10; the second place to the left of the decimal point.',
        'ones': 'Single units; the first place to the left of the decimal point.',
        'hundreds': 'Groups of 100; the third place to the left of the decimal point.',
        'place value': 'The value of a digit based on its position in a number.',
        'digit': 'Any of the symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 used to write numbers.',
        'compose': 'To put together smaller numbers or shapes to make a larger one.',
        'decompose': 'To break a number or shape into smaller parts.',
        'expanded form': 'A way to write a number showing the value of each digit (e.g., 345 = 300 + 40 + 5).',
        'standard form': 'The usual way to write a number using digits (e.g., 345).',
        'word form': 'Writing a number using words (e.g., three hundred forty-five).',
        'skip count': 'Counting forward by a number other than 1 (e.g., 2, 4, 6, 8).',
        'regroup': 'To exchange 10 ones for 1 ten (or vice versa) when adding or subtracting.',
        'borrow': 'An informal term for regrouping in subtraction.',
        'carry': 'An informal term for regrouping in addition.',
        'algorithm': 'A step-by-step procedure for solving a math problem.',
        'mental math': 'Doing calculations in your head without writing them down.',
        'estimate': 'An approximate answer found by rounding or using benchmarks.',

        // ── Operations (K-5) ──
        'fact family': 'A set of related addition/subtraction (or multiplication/division) facts using the same numbers.',
        'doubles': 'Adding a number to itself (e.g., 4 + 4 = 8).',
        'make ten': 'A strategy that combines numbers to form 10 as a step in adding.',
        'equation': 'A math sentence that uses an equal sign to show two expressions have the same value.',
        'equal sign': 'The symbol (=) meaning "has the same value as."',
        'multiply': 'To combine equal groups to find the total; repeated addition.',
        'divide': 'To split a total into equal groups or find how many groups.',
        'factor': 'A number that is multiplied by another number to get a product.',
        'product': 'The result of multiplying two or more numbers.',
        'quotient': 'The result of dividing one number by another.',
        'array': 'Objects arranged in equal rows and columns to model multiplication.',
        'equal groups': 'Sets with the same number of objects in each; a model for multiplication.',
        'commutative': 'A property where changing the order does not change the result (a + b = b + a).',
        'distributive': 'A property where a(b + c) = ab + ac; used to break apart multiplication.',
        'fluency': 'The ability to calculate accurately, efficiently, and flexibly.',
        'remainder': 'The amount left over after dividing a number into equal groups.',
        'partial products': 'A method of multiplying by breaking numbers into parts and multiplying each part.',
        'area model': 'A rectangle divided into sections to visualize multiplication or factoring.',
        'multiple': 'The product of a number and any whole number (e.g., multiples of 3: 3, 6, 9, 12).',
        'reasonable': 'Making sense; an answer that is close to what you would expect.',

        // ── Fractions (3-6) ──
        'fraction': 'A number that represents part of a whole, written as a/b.',
        'numerator': 'The top number in a fraction; tells how many parts you have.',
        'denominator': 'The bottom number in a fraction; tells how many equal parts make the whole.',
        'unit fraction': 'A fraction with a numerator of 1 (e.g., 1/4, 1/3).',
        'equivalent': 'Having the same value, even if written differently (e.g., 1/2 = 2/4).',
        'whole': 'The entire amount; all of something; the number 1 in fractions.',
        'number line': 'A straight line with numbers placed at equal intervals along its length.',
        'equal parts': 'Parts of a whole that are all the same size.',
        'equivalent fraction': 'Fractions that name the same amount (e.g., 2/4 = 1/2).',
        'simplify': 'To reduce a fraction to its lowest terms by dividing numerator and denominator by their GCF.',
        'benchmark fraction': 'A common fraction used for estimating, like 1/4, 1/3, 1/2, 2/3, 3/4.',
        'mixed number': 'A number with a whole number part and a fraction part (e.g., 2 3/4).',
        'improper fraction': 'A fraction where the numerator is greater than or equal to the denominator (e.g., 7/4).',
        'common denominator': 'A shared multiple of the denominators of two or more fractions.',
        'reciprocal': 'A number that when multiplied by the original gives 1; flip the fraction (e.g., reciprocal of 3/4 is 4/3).',

        // ── Decimals (4-6) ──
        'decimal': 'A number written with a decimal point to show tenths, hundredths, etc.',
        'tenths': 'The first place to the right of the decimal point; one part out of 10.',
        'hundredths': 'The second place to the right of the decimal point; one part out of 100.',
        'thousandths': 'The third place to the right of the decimal point; one part out of 1000.',
        'decimal point': 'The dot that separates the whole number part from the fractional part.',
        'notation': 'A system of symbols used to represent numbers or operations.',
        'powers of ten': 'Numbers like 10, 100, 1000 (10¹, 10², 10³) used in place value.',

        // ── Geometry (K-8) ──
        'circle': 'A closed curve where every point is the same distance from the center.',
        'triangle': 'A polygon with exactly 3 sides and 3 angles.',
        'rectangle': 'A quadrilateral with 4 right angles.',
        'square': 'A rectangle with all 4 sides equal in length.',
        'cube': 'A 3-D shape with 6 equal square faces.',
        'cone': 'A 3-D shape with a circular base and one vertex.',
        'sphere': 'A perfectly round 3-D shape, like a ball.',
        'cylinder': 'A 3-D shape with two parallel circular bases.',
        'side': 'A line segment forming part of the boundary of a polygon.',
        'corner': 'The point where two sides of a shape meet; also called a vertex.',
        'attribute': 'A characteristic of a shape, like the number of sides or angles.',
        'vertices': 'Plural of vertex; the points where edges or sides meet.',
        'face': 'A flat surface of a 3-D shape.',
        'edge': 'The line segment where two faces of a 3-D shape meet.',
        'vertex': 'The point where two rays, sides, or edges meet.',
        'angle': 'The measure of the opening between two rays that share a common endpoint.',
        'degree': 'A unit for measuring angles; a full turn is 360°.',
        'right angle': 'An angle that measures exactly 90°.',
        'acute': 'An angle that measures less than 90°.',
        'obtuse': 'An angle that measures more than 90° but less than 180°.',
        'straight': 'An angle that measures exactly 180°.',
        'protractor': 'A tool used to measure and draw angles.',
        'perpendicular': 'Two lines or segments that meet at a 90° angle.',
        'parallel': 'Lines in the same plane that never intersect.',
        'line of symmetry': 'A line that divides a shape into two identical mirror-image halves.',
        'ray': 'A part of a line that has one endpoint and extends infinitely in one direction.',
        'point': 'An exact location in space, represented by a dot.',
        'line': 'A straight path extending infinitely in both directions.',
        'line segment': 'A part of a line with two endpoints.',
        'quadrilateral': 'A polygon with exactly 4 sides.',
        'rhombus': 'A quadrilateral with all 4 sides equal in length.',
        'polygon': 'A closed 2-D shape made of straight line segments.',
        'partition': 'To divide a shape or number into equal parts.',

        // ── Measurement (K-5) ──
        'long': 'Having a greater length.',
        'short': 'Having a lesser length.',
        'heavy': 'Having a greater weight or mass.',
        'light': 'Having a lesser weight or mass.',
        'tall': 'Having a greater height.',
        'big': 'Having a greater size overall.',
        'small': 'Having a lesser size overall.',
        'measure': 'To find the size, length, weight, or capacity of something using a unit.',
        'length': 'The distance from one end of an object to the other.',
        'unit': 'A standard amount used for measuring (e.g., inch, centimeter, pound).',
        'inch': 'A unit of length in the customary system; 12 inches = 1 foot.',
        'foot': 'A unit of length equal to 12 inches.',
        'centimeter': 'A metric unit of length; 100 centimeters = 1 meter.',
        'meter': 'A metric unit of length equal to 100 centimeters.',
        'convert': 'To change from one unit of measurement to another.',
        'customary': 'The measurement system used in the U.S. (inches, feet, pounds, gallons).',
        'metric': 'The measurement system based on powers of 10 (meters, grams, liters).',
        'yard': 'A unit of length equal to 3 feet or 36 inches.',
        'mile': 'A unit of length equal to 5,280 feet.',
        'gram': 'A metric unit of mass; 1000 grams = 1 kilogram.',
        'kilogram': 'A metric unit of mass equal to 1000 grams.',
        'liter': 'A metric unit of capacity equal to 1000 milliliters.',
        'milliliter': 'A metric unit of capacity; 1000 milliliters = 1 liter.',
        'elapsed time': 'The amount of time that passes between a start and end time.',
        'interval': 'The amount of time or space between two points.',
        'hour': 'A unit of time equal to 60 minutes.',
        'half hour': 'A unit of time equal to 30 minutes.',

        // ── Area, Perimeter, Volume (3-8) ──
        'area': 'The amount of space inside a 2-D shape, measured in square units.',
        'perimeter': 'The total distance around the outside of a 2-D shape.',
        'square unit': 'A unit for measuring area (e.g., square inch, square centimeter).',
        'tile': 'A unit square used to cover a surface and measure area.',
        'formula': 'A mathematical rule written with symbols (e.g., A = l × w).',
        'width': 'The measurement of how wide something is; the shorter dimension.',
        'base': 'The bottom side of a shape, or the face a 3-D object stands on.',
        'height': 'The perpendicular distance from the base to the top of a shape.',
        'volume': 'The amount of space inside a 3-D shape, measured in cubic units.',
        'cubic unit': 'A unit for measuring volume (e.g., cubic inch, cubic centimeter).',
        'rectangular prism': 'A 3-D shape with 6 rectangular faces (a box shape).',
        'surface area': 'The total area of all faces of a 3-D shape.',
        'lateral area': 'The area of the sides (not the bases) of a 3-D shape.',
        'prism': 'A 3-D shape with two parallel, congruent polygon bases and rectangular sides.',
        'pyramid': 'A 3-D shape with a polygon base and triangular faces meeting at a point.',
        'composite figure': 'A shape made of two or more simpler shapes combined.',
        'net': 'A flat pattern that folds into a 3-D shape.',
        'cross-section': 'The shape you see when you cut through a 3-D figure.',

        // ── Data & Statistics (K-8) ──
        'data': 'Information collected by observing, measuring, or counting.',
        'graph': 'A visual display of data using bars, lines, pictures, or points.',
        'tally': 'A mark used to keep count; groups of 5 (IIII with a cross).',
        'chart': 'An organized display of data in rows and columns.',
        'table': 'Data arranged in rows and columns.',
        'picture graph': 'A graph using pictures or symbols to represent data.',
        'bar graph': 'A graph using bars of different lengths to compare data.',
        'line plot': 'A graph showing data points above a number line.',
        'scale': 'The set of numbers along the axis of a graph that determines spacing.',
        'survey': 'A method of collecting data by asking questions.',
        'most': 'The greatest number or amount in a data set.',
        'least': 'The smallest number or amount in a data set.',
        'mean': 'The average; found by adding all values and dividing by the number of values.',
        'median': 'The middle value when data is arranged in order.',
        'mode': 'The value that appears most often in a data set.',
        'range': 'The difference between the greatest and least values in a data set.',
        'interquartile range': 'The range of the middle 50% of data (Q3 − Q1); measures spread.',
        'IQR': 'Abbreviation for interquartile range; Q3 − Q1.',
        'dot plot': 'A graph where each data point is shown as a dot above a number line.',
        'histogram': 'A bar graph that shows the frequency of data within equal intervals.',
        'box plot': 'A graph showing the five-number summary (min, Q1, median, Q3, max) of a data set.',
        'distribution': 'The way data values are spread out or clustered.',
        'center': 'A measure of the typical value in a data set (mean or median).',
        'spread': 'How much data values vary from the center (range, IQR, MAD).',
        'variability': 'How much the values in a data set differ from each other.',
        'MAD': 'Mean Absolute Deviation; the average distance of data points from the mean.',
        'population': 'The entire group you want to learn about.',
        'sample': 'A smaller group chosen from the population to represent it.',
        'random sample': 'A sample where every member of the population has an equal chance of being chosen.',
        'inference': 'A conclusion drawn about a population based on sample data.',
        'representative': 'A sample that accurately reflects the characteristics of the population.',
        'bias': 'A tendency that causes a sample to not represent the population fairly.',
        'comparative': 'Comparing data sets to draw conclusions about differences.',
        'scatter plot': 'A graph plotting paired data as points to show relationships between two variables.',
        'bivariate data': 'Data involving two different variables measured on the same subjects.',
        'trend line': 'A line drawn through a scatter plot that shows the general direction of the data.',
        'line of best fit': 'The straight line that best represents the data on a scatter plot.',
        'positive association': 'When one variable increases, the other also tends to increase.',
        'negative association': 'When one variable increases, the other tends to decrease.',
        'no association': 'No clear relationship between two variables in a scatter plot.',
        'cluster': 'A group of data points bunched together in a graph.',
        'outlier': 'A data point that is far away from the other values.',
        'prediction': 'Using a trend line or pattern to estimate a future value.',

        // ── Probability (7) ──
        'probability': 'A number from 0 to 1 that describes how likely an event is to occur.',
        'event': 'A specific outcome or set of outcomes from an experiment.',
        'outcome': 'A possible result of an experiment or event.',
        'sample space': 'The set of all possible outcomes of an experiment.',
        'theoretical': 'Probability calculated by reasoning about equally likely outcomes.',
        'experimental': 'Probability calculated from the results of actual experiments or trials.',
        'compound event': 'An event made up of two or more simple events.',
        'tree diagram': 'A diagram showing all possible outcomes of a series of events.',
        'simulation': 'An experiment that models a real-world situation to estimate probability.',
        'complement': 'All outcomes that are NOT part of a given event; P(not A) = 1 − P(A).',
        'certain': 'An event with a probability of 1; it will definitely happen.',
        'impossible': 'An event with a probability of 0; it cannot happen.',
        'likely': 'An event with a probability greater than 0.5.',
        'unlikely': 'An event with a probability less than 0.5.',

        // ── Ratios, Rates, Proportions (6-8) ──
        'ratio': 'A comparison of two quantities, often written as a:b, a to b, or a/b.',
        'rate': 'A ratio that compares two quantities with different units (e.g., miles per hour).',
        'unit rate': 'A rate with a denominator of 1 (e.g., $3 per pound).',
        'equivalent ratio': 'Ratios that express the same relationship (e.g., 2:3 and 4:6).',
        'proportion': 'An equation stating that two ratios are equal.',
        'per': 'For each; used to describe rates (e.g., 60 miles per hour).',
        'tape diagram': 'A rectangular model divided into parts to represent a ratio or fraction.',
        'double number line': 'Two parallel number lines used to show a proportional relationship.',
        'constant of proportionality': 'The constant ratio (k) in a proportional relationship y = kx.',
        'y = kx': 'The equation form of a proportional relationship, where k is the constant ratio.',
        'scale factor': 'The ratio used to enlarge or reduce a figure proportionally.',
        'cross multiply': 'A method for solving proportions: if a/b = c/d, then ad = bc.',

        // ── Percent (6-7) ──
        'percent': 'A ratio that compares a number to 100; the symbol is %.',
        'rate per 100': 'Another way to describe a percent.',
        'part': 'A portion of a whole in a percent problem.',
        'percent increase': 'The percent that a quantity grows from its original amount.',
        'percent decrease': 'The percent that a quantity shrinks from its original amount.',
        'percent change': 'The ratio of the change in value to the original value, expressed as a percent.',
        'markup': 'The amount added to the cost price to determine the selling price.',
        'markdown': 'The amount subtracted from the original price; a discount.',
        'tax': 'An additional percentage charged by the government on purchases.',
        'tip': 'An extra amount paid for a service, usually calculated as a percent.',
        'discount': 'A reduction in the original price.',
        'commission': 'A percentage of a sale paid to a salesperson.',
        'simple interest': 'Interest calculated as a percent of the original principal only: I = Prt.',
        'principal': 'The original amount of money borrowed or invested.',

        // ── Integers & Rational Numbers (6-8) ──
        'integer': 'Any whole number or its opposite (..., −3, −2, −1, 0, 1, 2, 3, ...).',
        'positive': 'Greater than zero.',
        'negative': 'Less than zero.',
        'absolute value': 'The distance of a number from zero on the number line; always non-negative.',
        'opposite': 'Two numbers that are the same distance from zero but on different sides (e.g., 3 and −3).',
        'rational number': 'A number that can be written as a fraction a/b where a and b are integers and b ≠ 0.',
        'inequality': 'A math sentence comparing two expressions using <, >, ≤, ≥, or ≠.',
        'additive inverse': 'A number that when added to the original gives zero; the opposite.',
        'terminating decimal': 'A decimal that ends after a finite number of digits (e.g., 0.75).',
        'repeating decimal': 'A decimal with a digit or group of digits that repeats forever (e.g., 0.333...).',
        'distance': 'The positive length between two points.',

        // ── Expressions & Equations (5-8) ──
        'expression': 'A math phrase combining numbers, variables, and operations (no equal sign).',
        'variable': 'A letter or symbol that represents an unknown or changing value.',
        'parentheses': 'Symbols ( ) used to group operations that should be done first.',
        'brackets': 'Symbols [ ] used for grouping, especially inside parentheses.',
        'braces': 'Symbols { } used for grouping in complex expressions.',
        'order of operations': 'The agreed-upon rules (PEMDAS) for the sequence of calculations.',
        'pattern': 'A predictable sequence of numbers, shapes, or operations.',
        'rule': 'A description of how numbers in a pattern relate to each other.',
        'sequence': 'An ordered list of numbers following a pattern.',
        'evaluate': 'To find the value of an expression by substituting values for variables.',
        'coefficient': 'The number multiplied by a variable in an algebraic expression (e.g., 3 in 3x).',
        'constant': 'A fixed value that does not change (e.g., the 5 in 2x + 5).',
        'substitute': 'To replace a variable with a specific value.',
        'solve': 'To find the value of the variable that makes an equation true.',
        'inverse operation': 'Operations that undo each other (e.g., addition and subtraction).',
        'like terms': 'Terms with the same variable raised to the same power (e.g., 3x and 5x).',
        'distributive property': 'a(b + c) = ab + ac; multiplying a sum by distributing to each addend.',
        'two-step': 'An equation that requires two operations to solve.',
        'solution': 'The value(s) that make an equation or inequality true.',
        'constraint': 'A condition that limits the possible values in a problem.',

        // ── Linear Functions (8) ──
        'slope': 'The steepness of a line; rise over run; rate of change.',
        'y-intercept': 'The point where a line crosses the y-axis; the value of y when x = 0.',
        'linear equation': 'An equation whose graph is a straight line.',
        'y = mx + b': 'Slope-intercept form of a linear equation; m is slope, b is y-intercept.',
        'rate of change': 'How much one quantity changes relative to another; the slope.',
        'rise': 'The vertical change between two points on a line.',
        'run': 'The horizontal change between two points on a line.',
        'steepness': 'How steep a line is; related to the absolute value of the slope.',
        'positive slope': 'A line that rises from left to right.',
        'negative slope': 'A line that falls from left to right.',
        'zero slope': 'A horizontal line; no rise.',
        'undefined slope': 'A vertical line; infinite steepness.',
        'similar triangles': 'Triangles with the same angles but possibly different sizes; proportional sides.',
        'function': 'A relationship where each input has exactly one output.',
        'input': 'A value fed into a function; the x-value.',
        'output': 'The result of a function; the y-value.',
        'domain': 'The set of all possible input values for a function.',
        'mapping': 'A diagram showing how each input connects to its output.',
        'function rule': 'The equation or description that defines a function.',
        'linear function': 'A function whose graph is a straight line.',
        'non-linear': 'A function or graph that is not a straight line.',
        'initial value': 'The starting value; often the y-intercept in a function.',

        // ── Systems of Equations (8) ──
        'system of equations': 'Two or more equations with the same variables, solved together.',
        'simultaneous': 'Happening at the same time; equations that must be true together.',
        'intersection': 'The point where two lines cross; the solution of a system.',
        'substitution': 'A method of solving a system by replacing one variable with an expression.',
        'elimination': 'A method of solving a system by adding/subtracting equations to remove a variable.',
        'no solution': 'A system where the lines are parallel and never intersect.',
        'infinitely many solutions': 'A system where the equations represent the same line.',
        'same line': 'When two equations graph as identical lines; infinitely many solutions.',
        'equivalent equations': 'Equations that have the same solution set.',

        // ── Pythagorean Theorem (8) ──
        'Pythagorean theorem': 'In a right triangle, a² + b² = c² where c is the hypotenuse.',
        'hypotenuse': 'The longest side of a right triangle, opposite the right angle.',
        'leg': 'One of the two shorter sides of a right triangle.',
        'right triangle': 'A triangle with one 90° angle.',
        'a² + b² = c²': 'The Pythagorean theorem formula relating the sides of a right triangle.',
        'converse': 'A statement formed by reversing the hypothesis and conclusion.',
        'square root': 'A number that when multiplied by itself gives the original (√9 = 3).',
        'diagonal': 'A line segment connecting two non-adjacent vertices of a polygon.',

        // ── Transformations (8) ──
        'translation': 'A transformation that slides a figure without rotating or flipping it.',
        'rotation': 'A transformation that turns a figure around a fixed point.',
        'reflection': 'A transformation that flips a figure over a line to create a mirror image.',
        'dilation': 'A transformation that enlarges or reduces a figure by a scale factor.',
        'congruent': 'Figures that have the same shape AND the same size.',
        'similar': 'Figures that have the same shape but may have different sizes.',
        'rigid motion': 'A transformation that preserves size and shape (translation, rotation, reflection).',
        'pre-image': 'The original figure before a transformation.',
        'image': 'The new figure after a transformation.',
        'coordinate rule': 'A rule describing a transformation using coordinate notation (e.g., (x, y) → (x+3, y−2)).',
        'orientation': 'The arrangement or direction of a figure.',

        // ── Real Numbers (8) ──
        'rational': 'A number expressible as a fraction of two integers.',
        'irrational': 'A number that cannot be written as a fraction; its decimal never terminates or repeats.',
        'real number': 'Any number on the number line; includes both rational and irrational numbers.',
        'cube root': 'A number that when cubed gives the original (∛8 = 2).',
        'pi': 'The ratio of a circle\'s circumference to its diameter; approximately 3.14159...',
        'π': 'The symbol for pi; approximately 3.14159...',
        'non-repeating': 'A decimal that does not have a repeating pattern of digits.',
        'non-terminating': 'A decimal that continues forever without ending.',
        'approximate': 'Close to the exact value but not exact.',
        'scientific notation': 'A way to write very large or small numbers as a × 10ⁿ where 1 ≤ a < 10.',
        'exponent': 'The number of times a base is multiplied by itself (e.g., in 2³, 3 is the exponent).',
        'power of 10': 'A number like 10, 100, 1000 (10¹, 10², 10³).',
        'magnitude': 'The size or scale of a number.',
        'very large': 'Numbers much greater than typical values; often written in scientific notation.',
        'very small': 'Numbers much less than 1; often written in scientific notation.',

        // ── Circles (7, 10) ──
        'circumference': 'The distance around a circle.',
        'diameter': 'A line segment passing through the center of a circle connecting two points on the circle.',
        'radius': 'The distance from the center of a circle to any point on the circle.',
        'C = πd': 'The formula for circumference using diameter.',
        'C = 2πr': 'The formula for circumference using radius.',
        'A = πr²': 'The formula for the area of a circle.',

        // ── Volume formulas (8) ──
        'V = πr²h': 'Volume formula for a cylinder.',
        'V = ⅓πr²h': 'Volume formula for a cone.',
        'V = ⁴⁄₃πr³': 'Volume formula for a sphere.',
        'base area': 'The area of the base of a 3-D shape, used in volume formulas.',
        'V = l × w × h': 'Volume formula for a rectangular prism.',
        'V = B × h': 'Volume formula using base area (B) times height.',

        // ── Coordinate Plane (5-8) ──
        'coordinate plane': 'A grid formed by a horizontal x-axis and vertical y-axis intersecting at the origin.',
        'x-axis': 'The horizontal number line on a coordinate plane.',
        'y-axis': 'The vertical number line on a coordinate plane.',
        'origin': 'The point (0, 0) where the x-axis and y-axis intersect.',
        'ordered pair': 'A pair of numbers (x, y) that gives a location on the coordinate plane.',
        'quadrant': 'One of the four sections of the coordinate plane, divided by the axes.',
        'plot': 'To mark a point on a graph at its coordinates.',

        // ── High School / Algebra+ ──
        'congruence': 'The property of having the same size and shape.',
        'SSS': 'Side-Side-Side; a triangle congruence shortcut.',
        'SAS': 'Side-Angle-Side; a triangle congruence shortcut.',
        'ASA': 'Angle-Side-Angle; a triangle congruence shortcut.',
        'AAS': 'Angle-Angle-Side; a triangle congruence shortcut.',
        'HL': 'Hypotenuse-Leg; a right triangle congruence shortcut.',
        'CPCTC': 'Corresponding Parts of Congruent Triangles are Congruent.',
        'sine': 'In a right triangle, the ratio of the opposite side to the hypotenuse.',
        'cosine': 'In a right triangle, the ratio of the adjacent side to the hypotenuse.',
        'tangent': 'In a right triangle, the ratio of the opposite side to the adjacent side.',
        'SOH-CAH-TOA': 'Mnemonic for trig ratios: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj.',
        'adjacent': 'The side of a right triangle next to a given acute angle (not the hypotenuse).',
        'parabola': 'The U-shaped curve that is the graph of a quadratic function.',
        'quadratic': 'A polynomial of degree 2; its graph is a parabola.',
        'discriminant': 'The expression b² − 4ac that determines the number of solutions of a quadratic.',
        'vertex': 'The highest or lowest point on a parabola; the turning point.',
        'quadratic formula': 'x = (−b ± √(b²−4ac))/(2a); finds the solutions of ax² + bx + c = 0.',
        'polynomial': 'An expression with one or more terms, each having a variable raised to a whole number power.',
        'end behavior': 'What happens to y as x approaches positive or negative infinity.',
        'multiplicity': 'The number of times a factor appears in a polynomial; affects graph behavior at that zero.',
        'zeros': 'The x-values where a function equals zero; also called roots or x-intercepts.',
        'logarithm': 'The inverse of exponentiation; log_b(x) asks "b to what power gives x?"',
        'exponential growth': 'Growth where a quantity increases by a constant percentage over equal intervals.',
        'exponential decay': 'Decay where a quantity decreases by a constant percentage over equal intervals.',
        'growth factor': 'The multiplier in exponential growth (b > 1 in y = abˣ).',
        'decay factor': 'The multiplier in exponential decay (0 < b < 1 in y = abˣ).',
        'central angle': 'An angle whose vertex is at the center of a circle.',
        'arc': 'A portion of the circumference of a circle.',
        'arc length': 'The distance along an arc of a circle.',
        'sector': 'A region bounded by two radii and an arc; a "pie slice" of a circle.',
        'sector area': 'The area of a sector; (θ/360) × πr².',
        'inscribed angle': 'An angle formed by two chords with its vertex on the circle.',
        'tangent line': 'A line that touches a circle at exactly one point.',
        'secant': 'A line that intersects a circle at two points.'
    };

    // ════════════════════════════════════════════════
    //  TOPIC MAPPING — Socratic flow topic → cluster keys
    // ════════════════════════════════════════════════

    const TOPIC_TO_CLUSTERS = {
        // Grade 5
        'decimals and operations':              ['decimal_4', 'decimal_5'],
        'fractions and operations':             ['fraction_5'],
        'multiplying fractions':                ['fraction_5'],
        'volume and area':                      ['volume_5'],
        'coordinate plane':                     ['coordinate_5'],
        'order of operations and expressions':  ['expression_5'],
        // Grade 6
        'multiplication and division of fractions': ['fraction_6'],
        'ratios and rates':                     ['ratio_6'],
        'equivalence and representations':      ['percent_6', 'decimal_4'],
        'percent':                              ['percent_6'],
        'locate and compare numbers':           ['integer_6'],
        'factors primes gcf lcm':               ['fraction_6'],
        'applying rational numbers':            ['integer_6'],
        // Grade 7
        'proportional relationships':           ['proportion_7'],
        'circumference and area of circles':    ['circle_7'],
        'representing and comparing rational numbers': ['rational_7'],
        'mean median and range':                ['statistics_6'],
        'solve equations':                      ['expression_6'],
        // Grade 8
        'pythagorean theorem':                  ['pythagorean_8'],
        'solve equations inequalities and systems': ['linear_8', 'systems_8'],
        'similarity and scaling':               ['transformation_8'],
        'rational irrational and real numbers':  ['realnumber_8'],
        // Grade 10+
        'congruence and triangles':             ['transformation_8'],
        'similarity and right triangles':       ['pythagorean_8', 'slope_8'],
        'circles and arc measures':             ['circle_7'],
        'quadratic functions and complex numbers': ['expression_6'],
        'polynomial functions':                 ['expression_6'],
        'exponential and logarithmic functions': ['scientific_8']
    };

    // ════════════════════════════════════════════════
    //  CORE API
    // ════════════════════════════════════════════════

    /**
     * Look up a single term.
     */
    function lookup(term) {
        const key = term.toLowerCase().trim();
        const def = GLOSSARY[key];
        if (!def) return null;
        return { term: key, definition: def };
    }

    /**
     * Get vocabulary terms relevant to a Socratic flow topic.
     * Pulls from BenchmarkDescriptors cluster vocabulary arrays.
     */
    function forTopic(flowTopic) {
        const terms = _getTermsForTopic(flowTopic);
        return terms
            .map(t => ({ term: t, definition: GLOSSARY[t.toLowerCase()] || null }))
            .filter(t => t.definition !== null);
    }

    /**
     * Get all vocabulary terms for a grade level.
     */
    function forGrade(grade) {
        if (typeof BenchmarkDescriptors === 'undefined') return [];
        const descriptors = BenchmarkDescriptors.forGrade(String(grade));
        if (!descriptors || !Array.isArray(descriptors)) return [];

        const seen = new Set();
        const results = [];
        for (const desc of descriptors) {
            if (!desc.vocabulary) continue;
            for (const term of desc.vocabulary) {
                const key = term.toLowerCase();
                if (seen.has(key)) continue;
                seen.add(key);
                const def = GLOSSARY[key];
                if (def) results.push({ term: key, definition: def });
            }
        }
        return results;
    }

    /**
     * Search the glossary for terms matching a query.
     */
    function search(query) {
        const q = query.toLowerCase().trim();
        const results = [];
        for (const [term, definition] of Object.entries(GLOSSARY)) {
            if (term.includes(q) || definition.toLowerCase().includes(q)) {
                results.push({ term, definition });
            }
        }
        return results;
    }

    /**
     * Generate a Socratic flow "vocab" story node for a topic.
     * Returns a node that can be injected at the start of a flow.
     */
    function generateVocabNode(flowTopic, nodeId) {
        const terms = forTopic(flowTopic).slice(0, 8); // max 8 terms
        if (terms.length === 0) return null;

        const termList = terms.map(t =>
            `**${t.term}** — ${t.definition}`
        ).join('\n\n');

        return {
            id: nodeId || 'vocab_intro',
            type: 'story',
            phase: 'orient',
            title: 'Key Vocabulary',
            content: `Before we begin, here are the key math words for this topic:\n\n${termList}\n\nYou\'ll use these words as we explore together.`,
            next: null // caller must wire this
        };
    }

    /**
     * Generate a vocab quiz question node for a topic.
     * Tests one random term from the topic's vocabulary.
     */
    function generateQuizNode(flowTopic, nodeId) {
        const terms = forTopic(flowTopic);
        if (terms.length < 2) return null;

        const idx = Math.floor(Math.random() * terms.length);
        const target = terms[idx];

        return {
            id: nodeId || 'vocab_quiz',
            type: 'question',
            phase: 'orient',
            dok: 1,
            prompt: `In your own words, what does **${target.term}** mean?`,
            accept: {
                keywords: target.definition.split(/\s+/).filter(w => w.length > 4).slice(0, 5),
                keywordThreshold: 0.2
            },
            hints: [
                `Think about how "${target.term}" is used in math class.`,
                target.definition
            ],
            socraticFollow: `Can you use "${target.term}" in a sentence about a real situation?`,
            next: null
        };
    }

    /**
     * Get all term strings.
     */
    function allTerms() {
        return Object.keys(GLOSSARY).sort();
    }

    // ── Internal helpers ──

    function _getTermsForTopic(flowTopic) {
        // 1. Try the cluster mapping
        const clusterKeys = TOPIC_TO_CLUSTERS[flowTopic];
        if (clusterKeys && typeof BenchmarkDescriptors !== 'undefined') {
            const terms = [];
            for (const key of clusterKeys) {
                const desc = BenchmarkDescriptors.get(key);
                if (desc && desc.vocabulary) {
                    terms.push(...desc.vocabulary);
                }
            }
            if (terms.length > 0) return [...new Set(terms)];
        }

        // 2. Fallback: search glossary for terms related to topic words
        const topicWords = flowTopic.toLowerCase().split(/\s+/);
        const matches = [];
        for (const [term] of Object.entries(GLOSSARY)) {
            if (topicWords.some(w => term.includes(w) || w.includes(term))) {
                matches.push(term);
            }
        }
        return matches;
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        lookup,
        forTopic,
        forGrade,
        search,
        generateVocabNode,
        generateQuizNode,
        allTerms,
        GLOSSARY
    };
})();
