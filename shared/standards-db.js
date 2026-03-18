/**
 * standards-db.js — K-12 Math Standards Cross-Reference Database
 * Lesson Digester | Drummond Math Solutions
 * v2.0 — March 2026
 *
 * Frameworks covered:
 *   CCSS   — Common Core State Standards for Mathematics
 *   MN07   — Minnesota 2007 Math Standards (MCA-aligned)
 *   MN22   — Minnesota 2022 Math Standards (effective 2027-28)
 *   TEKS   — Texas Essential Knowledge and Skills (Math)
 *
 * Coverage: Full depth K–8, abbreviated HS
 * Updated 2026-03: K–5 now has EQUAL depth to grades 6–8 (~15 standards per grade per framework)
 *
 * Public API:
 *   StandardsDB.detectFramework(code)          → 'CCSS'|'MN07'|'MN22'|'TEKS'|null
 *   StandardsDB.getByCode(code)                → standard object or null
 *   StandardsDB.crossRef(code)                 → cluster object (all 4 frameworks)
 *   StandardsDB.getAllForTopics(topics, grade)  → { CCSS, MN07, MN22, TEKS } arrays
 *   StandardsDB.buildCrossRefHTML(stdMap)       → HTML string for results panel
 *   StandardsDB.TEKS                            → full TEKS data object
 *   StandardsDB.MN22                            → full MN-22 data object
 */

const StandardsDB = (() => {

    // ════════════════════════════════════════════════════════════════════════
    //  TEKS — Texas Essential Knowledge and Skills (Mathematics)
    //  Format: [Grade].[Domain][Item]  e.g. 7.4A, K.2B, 8.10D
    //  Grades K–8 full coverage; Algebra I / Geometry abbreviated
    // ════════════════════════════════════════════════════════════════════════
    const TEKS = {
        // ── Kindergarten ───────────────────────────────────────────────────
        'K.2A': { grade:'K', domain:'Number', desc:'Count a set of objects up to at least 20 and demonstrate that the last number said tells the number of objects', topic:'counting' },
        'K.2B': { grade:'K', domain:'Number', desc:'Read, write, and represent whole numbers from 0 to at least 20', topic:'counting' },
        'K.2C': { grade:'K', domain:'Number', desc:'Count a set of objects up to at least 20 using concrete and pictorial models', topic:'counting' },
        'K.2D': { grade:'K', domain:'Number', desc:'Recognize instantly the quantity of a small group of objects in organized and random arrangements', topic:'counting' },
        'K.2E': { grade:'K', domain:'Number', desc:'Generate a set using concrete and pictorial models that represents a number that is more than, less than, and equal to a given number', topic:'comparison' },
        'K.2F': { grade:'K', domain:'Number', desc:'Generate a number that is one more than or one less than another number', topic:'counting' },
        'K.2G': { grade:'K', domain:'Number', desc:'Compare sets of objects up to at least 20 using comparative language', topic:'comparison' },
        'K.2H': { grade:'K', domain:'Number', desc:'Use comparative language to describe two numbers up to 20 presented as written numerals', topic:'comparison' },
        'K.2I': { grade:'K', domain:'Number', desc:'Compose and decompose numbers up to 10 using objects, pictures, and numbers', topic:'decompose' },
        'K.3A': { grade:'K', domain:'Operations', desc:'Model the action of joining to represent addition and the action of separating to represent subtraction', topic:'addition' },
        'K.3B': { grade:'K', domain:'Operations', desc:'Solve word problems using objects and drawings to find sums up to 10 and differences within 10', topic:'addition' },
        'K.3C': { grade:'K', domain:'Operations', desc:'Explain the strategies used to solve problems involving addition and subtraction', topic:'addition' },
        'K.6A': { grade:'K', domain:'Geometry', desc:'Identify two-dimensional shapes, including circles, triangles, rectangles, and squares', topic:'geometry' },
        'K.6B': { grade:'K', domain:'Geometry', desc:'Identify three-dimensional solids, including cylinders, cones, spheres, and cubes', topic:'geometry' },
        'K.7A': { grade:'K', domain:'Measurement', desc:'Compare two objects with a common measurable attribute', topic:'measurement' },
        'K.7B': { grade:'K', domain:'Measurement', desc:'Describe a length by using a number and a unit', topic:'measurement' },
        'K.8A': { grade:'K', domain:'Data', desc:'Collect, sort, and organize data into two or three categories', topic:'data' },
        'K.8B': { grade:'K', domain:'Data', desc:'Use data to create real-object graphs, picture graphs, and bar-type graphs', topic:'data' },

        // ── Grade 1 ────────────────────────────────────────────────────────
        '1.2A': { grade:1, domain:'Number', desc:'Recognize instantly the quantity of structured arrangements', topic:'counting' },
        '1.2B': { grade:1, domain:'Number', desc:'Use concrete and pictorial models to compose and decompose numbers up to 120', topic:'place value' },
        '1.2C': { grade:1, domain:'Number', desc:'Use objects, pictures, and expanded and standard forms to represent numbers up to 120', topic:'place value' },
        '1.2D': { grade:1, domain:'Number', desc:'Generate a number that is 10 more or 10 less than a given number', topic:'place value' },
        '1.2E': { grade:1, domain:'Number', desc:'Create two-digit numbers using tens and ones with concrete models and pictures', topic:'place value' },
        '1.2F': { grade:1, domain:'Number', desc:'Read and write two-digit numbers using numerals, number words, and expanded form', topic:'place value' },
        '1.2G': { grade:1, domain:'Number', desc:'Compare and order whole numbers up to 120 using comparative language and symbols', topic:'comparison' },
        '1.3A': { grade:1, domain:'Operations', desc:'Use concrete and pictorial models to determine the sum of a multiple of 10 and a one-digit number', topic:'addition' },
        '1.3B': { grade:1, domain:'Operations', desc:'Use objects and pictorial models to solve word problems involving joining, separating, and comparing', topic:'addition' },
        '1.3C': { grade:1, domain:'Operations', desc:'Use the commutative property of addition to find sums', topic:'addition' },
        '1.3D': { grade:1, domain:'Operations', desc:'Apply basic fact strategies to add and subtract within 20', topic:'addition' },
        '1.3E': { grade:1, domain:'Operations', desc:'Identify and write number sentences that match story problems', topic:'equation' },
        '1.5A': { grade:1, domain:'Algebra', desc:'Recite numbers forward and backward from any given number between 1 and 120', topic:'counting' },
        '1.6A': { grade:1, domain:'Measurement', desc:'Compare lengths of objects by using comparative language', topic:'measurement' },
        '1.6B': { grade:1, domain:'Measurement', desc:'Express the length of an object as a whole number of length units', topic:'measurement' },
        '1.7A': { grade:1, domain:'Geometry', desc:'Describe the attributes of two-dimensional shapes using informal and formal language', topic:'geometry' },
        '1.7B': { grade:1, domain:'Geometry', desc:'Distinguish between attributes that define a two-dimensional or three-dimensional shape', topic:'geometry' },
        '1.8A': { grade:1, domain:'Data', desc:'Collect, organize, and record data in more than one way', topic:'data' },
        '1.8B': { grade:1, domain:'Data', desc:'Use data to create real-object graphs, picture graphs, and bar-type graphs', topic:'data' },
        '1.8C': { grade:1, domain:'Data', desc:'Read and interpret data in real-object graphs, picture graphs, and bar-type graphs', topic:'data' },

        // ── Grade 2 ────────────────────────────────────────────────────────
        '2.2A': { grade:2, domain:'Number', desc:'Use concrete and pictorial models to compose and decompose numbers up to 1,200', topic:'place value' },
        '2.2B': { grade:2, domain:'Number', desc:'Use objects, pictures, and numbers to represent place value in the hundreds, tens, and ones', topic:'place value' },
        '2.2C': { grade:2, domain:'Number', desc:'Read and write numbers up to 1,200 using numerals, number words, and expanded form', topic:'place value' },
        '2.2D': { grade:2, domain:'Number', desc:'Generate a number that is 10 or 100 more or less than a given number', topic:'place value' },
        '2.2E': { grade:2, domain:'Number', desc:'Use the number line to compare and order numbers up to 1,200', topic:'comparison' },
        '2.2F': { grade:2, domain:'Number', desc:'Use concrete models to represent equivalent sets involving fractions with denominators of 2, 3, or 4', topic:'fraction' },
        '2.4A': { grade:2, domain:'Operations', desc:'Recall basic facts to add and subtract within 20 with automaticity', topic:'addition' },
        '2.4B': { grade:2, domain:'Operations', desc:'Add up to four two-digit numbers and subtract two-digit numbers', topic:'addition' },
        '2.4C': { grade:2, domain:'Operations', desc:'Solve one-step and multi-step word problems involving addition and subtraction', topic:'addition' },
        '2.4D': { grade:2, domain:'Operations', desc:'Use the commutative and associative properties to find sums and differences', topic:'addition' },
        '2.5A': { grade:2, domain:'Algebra', desc:'Use repeated addition to find the total number of objects in a set of equal groups', topic:'multiplication' },
        '2.5B': { grade:2, domain:'Algebra', desc:'Use arrays, area models, and repeated addition to represent multiplication', topic:'multiplication' },
        '2.6A': { grade:2, domain:'Geometry', desc:'Classify and sort two-dimensional shapes using informal language', topic:'geometry' },
        '2.6B': { grade:2, domain:'Geometry', desc:'Classify and sort three-dimensional solids, including spheres, cones, cylinders, rectangular prisms, and cubes', topic:'geometry' },
        '2.7A': { grade:2, domain:'Measurement', desc:'Measure the length of objects using appropriate non-standard and standard units', topic:'measurement' },
        '2.7B': { grade:2, domain:'Measurement', desc:'Tell and write time to the hour and half hour using analog and digital clocks', topic:'measurement' },
        '2.7C': { grade:2, domain:'Measurement', desc:'Identify coins and their values and describe relationships among them', topic:'money' },
        '2.8A': { grade:2, domain:'Data', desc:'Collect, organize, record, and interpret data', topic:'data' },
        '2.8B': { grade:2, domain:'Data', desc:'Construct picture graphs and bar graphs with single-unit scales', topic:'data' },

        // ── Grade 3 ────────────────────────────────────────────────────────
        '3.2A': { grade:3, domain:'Number', desc:'Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, thousands, hundreds, tens, and ones', topic:'place value' },
        '3.2B': { grade:3, domain:'Number', desc:'Describe the value of the digits in numbers up to 100,000 using place value', topic:'place value' },
        '3.2C': { grade:3, domain:'Number', desc:'Read and write numbers up to 100,000 using numerals, number words, and expanded form', topic:'place value' },
        '3.2D': { grade:3, domain:'Number', desc:'Compare and order whole numbers up to 100,000 and represent comparisons using symbols', topic:'comparison' },
        '3.3A': { grade:3, domain:'Fractions', desc:'Represent fractions greater than zero and less than or equal to one with denominators of 2, 3, 4, 6, and 8', topic:'fraction' },
        '3.3B': { grade:3, domain:'Fractions', desc:'Determine the corresponding fraction greater than zero and less than or equal to one on a number line', topic:'fraction' },
        '3.3C': { grade:3, domain:'Fractions', desc:'Explain that the unit fraction 1/b represents the quantity formed by one part of a whole that has been partitioned into b equal parts', topic:'fraction' },
        '3.3D': { grade:3, domain:'Fractions', desc:'Compose and decompose a fraction a/b with a numerator greater than zero and less than or equal to b as a sum of parts 1/b', topic:'fraction' },
        '3.3E': { grade:3, domain:'Fractions', desc:'Identify concrete models that represent equivalent fractions', topic:'fraction' },
        '3.3H': { grade:3, domain:'Fractions', desc:'Compare two fractions with the same denominator or the same numerator using symbols and justification', topic:'fraction' },
        '3.4A': { grade:3, domain:'Operations', desc:'Solve with fluency one-step and two-step problems involving addition and subtraction within 1,000', topic:'addition' },
        '3.4B': { grade:3, domain:'Operations', desc:'Round to the nearest 10 or 100 using place value understanding', topic:'estimation' },
        '3.4D': { grade:3, domain:'Operations', desc:'Determine the total number of objects when equally-sized groups of objects are combined or arranged in arrays', topic:'multiplication' },
        '3.4E': { grade:3, domain:'Operations', desc:'Represent multiplication facts by using a variety of approaches such as repeated addition, equal-sized groups, arrays', topic:'multiplication' },
        '3.4F': { grade:3, domain:'Operations', desc:'Use strategies and algorithms, including the standard algorithm, to multiply a two-digit number by a one-digit number', topic:'multiplication' },
        '3.4G': { grade:3, domain:'Operations', desc:'Use the commutative and associative properties of multiplication', topic:'multiplication' },
        '3.4H': { grade:3, domain:'Operations', desc:'Determine the number of objects in each group when a set of objects is partitioned into equal shares', topic:'division' },
        '3.4I': { grade:3, domain:'Operations', desc:'Model division as equal sharing or repeated subtraction', topic:'division' },
        '3.4J': { grade:3, domain:'Operations', desc:'Determine a quotient using the relationship between multiplication and division', topic:'division' },
        '3.5A': { grade:3, domain:'Algebra', desc:'Represent one- and two-step problems using symbolic representations', topic:'equation' },
        '3.5B': { grade:3, domain:'Algebra', desc:'Describe a multiplication expression using related division facts', topic:'expression' },
        '3.5C': { grade:3, domain:'Algebra', desc:'Describe a division expression using related multiplication facts', topic:'expression' },
        '3.5D': { grade:3, domain:'Algebra', desc:'Determine the unknown whole number in a multiplication or division equation relating three whole numbers', topic:'equation' },
        '3.6A': { grade:3, domain:'Geometry', desc:'Classify and sort two-dimensional figures, including circles, triangles, rectangles, squares, and rhombuses', topic:'geometry' },
        '3.6B': { grade:3, domain:'Geometry', desc:'Use attributes to describe how 2-D figures are alike and different', topic:'geometry' },
        '3.6C': { grade:3, domain:'Geometry', desc:'Compose two-dimensional shapes and three-dimensional solids with given properties or attributes', topic:'geometry' },
        '3.7A': { grade:3, domain:'Measurement', desc:'Measure lengths using standard units such as centimeters and inches', topic:'measurement' },
        '3.7B': { grade:3, domain:'Measurement', desc:'Determine the perimeter of a polygon or a missing length when given perimeter', topic:'perimeter' },
        '3.8A': { grade:3, domain:'Data', desc:'Summarize a variety of data and represent the data on a frequency table, dot plot, pictograph, or bar graph', topic:'data' },
        '3.8B': { grade:3, domain:'Data', desc:'Determine the mode and range of a data set', topic:'statistics' },

        // ── Grade 4 ────────────────────────────────────────────────────────
        '4.2A': { grade:4, domain:'Number', desc:'Interpret the value of each place-value position as 10 times the position to the right', topic:'place value' },
        '4.2B': { grade:4, domain:'Number', desc:'Describe the relationship between two numbers when they differ by a multiple of 10', topic:'place value' },
        '4.2C': { grade:4, domain:'Number', desc:'Read and write whole numbers up to 1,000,000 using numerals, number words, and expanded form', topic:'place value' },
        '4.2D': { grade:4, domain:'Number', desc:'Compare and order whole numbers up to 1,000,000 and represent comparisons using symbols', topic:'comparison' },
        '4.2E': { grade:4, domain:'Number', desc:'Represent the value of the digit in decimals through the hundredths using expanded notation and area models', topic:'decimal' },
        '4.2F': { grade:4, domain:'Number', desc:'Compare and order decimal numbers to the hundredths', topic:'decimal' },
        '4.2G': { grade:4, domain:'Number', desc:'Round whole numbers to a given place value through the hundred thousands place', topic:'estimation' },
        '4.2H': { grade:4, domain:'Number', desc:'Round decimal numbers to the nearest tenth or hundredth', topic:'estimation' },
        '4.3A': { grade:4, domain:'Fractions', desc:'Represent a fraction a/b as a sum of fractions 1/b, where a and b are whole numbers', topic:'fraction' },
        '4.3B': { grade:4, domain:'Fractions', desc:'Decompose a fraction in more than one way into a sum of fractions with the same denominator', topic:'fraction' },
        '4.3C': { grade:4, domain:'Fractions', desc:'Determine if two given fractions are equivalent using a variety of methods', topic:'fraction' },
        '4.3D': { grade:4, domain:'Fractions', desc:'Compare two fractions with different numerators and different denominators', topic:'fraction' },
        '4.3E': { grade:4, domain:'Fractions', desc:'Represent and solve addition and subtraction of fractions with equal denominators', topic:'fraction' },
        '4.3F': { grade:4, domain:'Fractions', desc:'Represent fractions and decimals to the hundredths as distances from zero on a number line', topic:'fraction' },
        '4.3G': { grade:4, domain:'Fractions', desc:'Identify concrete models that represent equivalent fractions with denominators of 2, 3, 4, 6, and 8', topic:'fraction' },
        '4.4A': { grade:4, domain:'Operations', desc:'Add and subtract whole numbers and decimals to the hundredths place using standard algorithms', topic:'decimal' },
        '4.4B': { grade:4, domain:'Operations', desc:'Determine products of a number and 10 or 100 using properties of operations', topic:'multiplication' },
        '4.4C': { grade:4, domain:'Operations', desc:'Solve word problems involving multiplication and division', topic:'multiplication' },
        '4.4D': { grade:4, domain:'Operations', desc:'Use strategies and algorithms, including the standard algorithm, to multiply up to a four-digit number by a one-digit number', topic:'multiplication' },
        '4.4E': { grade:4, domain:'Operations', desc:'Express a fraction with denominator 10 as an equivalent fraction with denominator 100', topic:'fraction' },
        '4.4F': { grade:4, domain:'Operations', desc:'Multiply and divide to solve word problems involving whole numbers', topic:'multiplication' },
        '4.4G': { grade:4, domain:'Operations', desc:'Round to the nearest ten, hundred, or thousand', topic:'estimation' },
        '4.4H': { grade:4, domain:'Operations', desc:'Solve with fluency one- and two-step problems involving multiplication using strategies', topic:'multiplication' },
        '4.5A': { grade:4, domain:'Algebra', desc:'Represent multi-step problems involving the four operations using strip diagrams and equations', topic:'equation' },
        '4.5B': { grade:4, domain:'Algebra', desc:'Represent problems using an input-output table and numerical expressions', topic:'expression' },
        '4.5C': { grade:4, domain:'Algebra', desc:'Describe the meaning of parentheses and brackets in numeric expressions', topic:'expression' },
        '4.5D': { grade:4, domain:'Algebra', desc:'Simplify numerical expressions that do not involve exponents using order of operations', topic:'order of operations' },
        '4.6A': { grade:4, domain:'Geometry', desc:'Draw points, lines, line segments, rays, angles (right, acute, obtuse), and perpendicular and parallel lines', topic:'geometry' },
        '4.6B': { grade:4, domain:'Geometry', desc:'Classify and sort two- and three-dimensional figures based on attributes', topic:'geometry' },
        '4.6C': { grade:4, domain:'Geometry', desc:'Support generalizations about geometric properties and relationships using concrete models and drawings', topic:'geometry' },
        '4.6D': { grade:4, domain:'Geometry', desc:'Identify lines of symmetry in two-dimensional shapes', topic:'geometry' },
        '4.7A': { grade:4, domain:'Measurement', desc:'Measure angles in two-dimensional figures using a protractor', topic:'measurement' },
        '4.7B': { grade:4, domain:'Measurement', desc:'Illustrate that the area of a rectangle with whole-number side lengths is measured in square units', topic:'area' },
        '4.8A': { grade:4, domain:'Measurement', desc:'Identify relative sizes of measurement units within the customary and metric systems', topic:'measurement' },
        '4.8B': { grade:4, domain:'Measurement', desc:'Convert measurements within the same measurement system', topic:'measurement' },
        '4.8C': { grade:4, domain:'Measurement', desc:'Solve problems that deal with measurements of length, intervals of time, liquid volumes, mass, and money', topic:'measurement' },
        '4.9A': { grade:4, domain:'Data', desc:'Summarize a variety of data and represent the data on a frequency table, dot plot, pictograph, or bar graph', topic:'data' },
        '4.9B': { grade:4, domain:'Data', desc:'Solve one- and two-step problems using data from a frequency table, dot plot, pictograph, or bar graph', topic:'data' },

        // ── Grade 5 ────────────────────────────────────────────────────────
        '5.2A': { grade:5, domain:'Number', desc:'Represent the value of the digit in decimals through the thousandths using expanded notation and area models', topic:'decimal' },
        '5.2B': { grade:5, domain:'Number', desc:'Compare and order two decimals to thousandths and represent comparisons using symbols', topic:'decimal' },
        '5.2C': { grade:5, domain:'Number', desc:'Round decimals to the nearest tenth or hundredth', topic:'estimation' },
        '5.3A': { grade:5, domain:'Fractions', desc:'Estimate to determine solutions to mathematical and real-world problems involving addition, subtraction, multiplication, or division', topic:'fraction' },
        '5.3B': { grade:5, domain:'Fractions', desc:'Multiply with fluency a three-digit number by a two-digit number using standard algorithms', topic:'multiplication' },
        '5.3C': { grade:5, domain:'Fractions', desc:'Solve with fluency one- and two-step problems involving multiplication and division', topic:'multiplication' },
        '5.3D': { grade:5, domain:'Fractions', desc:'Identify and represent on a number line decimals, fractions, and mixed numbers', topic:'fraction' },
        '5.3E': { grade:5, domain:'Fractions', desc:'Solve for products of decimals to the hundredths', topic:'decimal' },
        '5.3F': { grade:5, domain:'Fractions', desc:'Represent quotients of decimals to the hundredths', topic:'decimal' },
        '5.3G': { grade:5, domain:'Fractions', desc:'Solve one-step and multi-step problems involving multiplication and division, including interpreting remainders', topic:'division' },
        '5.3H': { grade:5, domain:'Fractions', desc:'Represent and solve addition and subtraction of fractions with unequal denominators', topic:'fraction' },
        '5.3I': { grade:5, domain:'Fractions', desc:'Represent multiplication of two fractions or whole number and a fraction with area and length models', topic:'fraction' },
        '5.3J': { grade:5, domain:'Fractions', desc:'Find the product of a whole number and a fraction and represent using area models', topic:'fraction' },
        '5.3K': { grade:5, domain:'Fractions', desc:'Add and subtract positive rational numbers fluently', topic:'fraction' },
        '5.3L': { grade:5, domain:'Fractions', desc:'Divide whole numbers by unit fractions and unit fractions by whole numbers', topic:'fraction' },
        '5.4A': { grade:5, domain:'Algebra', desc:'Identify prime and composite numbers', topic:'number theory' },
        '5.4B': { grade:5, domain:'Algebra', desc:'Represent and solve multi-step problems involving the four operations with whole numbers', topic:'expression' },
        '5.4C': { grade:5, domain:'Algebra', desc:'Use the order of operations to evaluate numerical expressions', topic:'order of operations' },
        '5.4D': { grade:5, domain:'Algebra', desc:'Describe the meaning of parentheses and brackets in a numeric expression', topic:'expression' },
        '5.4E': { grade:5, domain:'Algebra', desc:'Simplify numerical expressions that do not involve exponents using order of operations', topic:'order of operations' },
        '5.4F': { grade:5, domain:'Algebra', desc:'Simplify numerical expressions that do not involve exponents using order of operations', topic:'order of operations' },
        '5.5A': { grade:5, domain:'Geometry', desc:'Identify the attributes of triangles and classify them by their attributes or properties', topic:'geometry' },
        '5.6A': { grade:5, domain:'Geometry', desc:'Identify points, lines, line segments, rays, angles, and perpendicular and parallel lines', topic:'geometry' },
        '5.6B': { grade:5, domain:'Geometry', desc:'Identify and classify polygons based on their attributes', topic:'geometry' },
        '5.7A': { grade:5, domain:'Measurement', desc:'Describe the formula for the area of a rectangle as length times width', topic:'area' },
        '5.8A': { grade:5, domain:'Geometry', desc:'Describe the key attributes of the coordinate plane and the process of graphing ordered pairs', topic:'coordinate' },
        '5.8B': { grade:5, domain:'Geometry', desc:'Describe the process for graphing ordered pairs of numbers in the first quadrant of the coordinate plane', topic:'coordinate' },
        '5.8C': { grade:5, domain:'Geometry', desc:'Graph in the first quadrant of the coordinate plane ordered pairs of numbers arising from mathematical and real-world problems', topic:'coordinate' },
        '5.9A': { grade:5, domain:'Data', desc:'Represent categorical data with bar graphs or frequency tables and numerical data with dot plots or stem-and-leaf plots', topic:'data' },
        '5.9B': { grade:5, domain:'Data', desc:'Represent data using tables and graphs such as line plots, line graphs, and stem-and-leaf plots', topic:'data' },
        '5.9C': { grade:5, domain:'Data', desc:'Solve one- and two-step problems using data from a frequency table, dot plot, bar graph, stem-and-leaf plot, or scatterplot', topic:'data' },

        // ── Grade 6 ────────────────────────────────────────────────────────
        '6.2A': { grade:6, domain:'Number', desc:'Classify whole numbers, integers, and rational numbers using a visual representation', topic:'integer' },
        '6.2B': { grade:6, domain:'Number', desc:'Identify a number, its opposite, and its absolute value', topic:'integer' },
        '6.2C': { grade:6, domain:'Number', desc:'Locate, compare, and order integers and rational numbers on a number line', topic:'integer' },
        '6.2D': { grade:6, domain:'Number', desc:'Order a set of rational numbers arising from mathematical and real-world contexts', topic:'integer' },
        '6.2E': { grade:6, domain:'Number', desc:'Extend representations for division to include fraction notation', topic:'fraction' },
        '6.3A': { grade:6, domain:'Number', desc:'Recognize that dividing by a rational number and multiplying by its reciprocal result in equivalent values', topic:'fraction' },
        '6.3B': { grade:6, domain:'Number', desc:'Determine, with and without computation, whether a quantity is increased or decreased by a fraction, decimal, or percent', topic:'percent' },
        '6.3C': { grade:6, domain:'Number', desc:'Represent integer operations with concrete models and connect the actions to algorithms', topic:'integer' },
        '6.3D': { grade:6, domain:'Number', desc:'Add, subtract, multiply, and divide integers fluently', topic:'integer' },
        '6.3E': { grade:6, domain:'Number', desc:'Multiply and divide positive rational numbers fluently', topic:'fraction' },
        '6.4A': { grade:6, domain:'Proportionality', desc:'Compare two rules verbally, numerically, symbolically, and graphically in the form of y=kx', topic:'ratio' },
        '6.4B': { grade:6, domain:'Proportionality', desc:'Apply qualitative and quantitative reasoning to solve prediction and comparison problems', topic:'ratio' },
        '6.4C': { grade:6, domain:'Proportionality', desc:'Give examples of ratios as multiplicative comparisons of two quantities', topic:'ratio' },
        '6.4D': { grade:6, domain:'Proportionality', desc:'Give examples of rates as the comparison by division of two quantities having different attributes', topic:'ratio' },
        '6.4E': { grade:6, domain:'Proportionality', desc:'Represent ratios and percents with concrete models, fractions, and decimals', topic:'percent' },
        '6.4F': { grade:6, domain:'Proportionality', desc:'Represent benchmark fractions and percents such as 1%, 10%, 25%, 33-1/3%, and multiples of these values', topic:'percent' },
        '6.4G': { grade:6, domain:'Proportionality', desc:'Generate equivalent forms of fractions, decimals, and percents using real-world problems', topic:'percent' },
        '6.4H': { grade:6, domain:'Proportionality', desc:'Convert units within a measurement system using proportions and unit rates', topic:'ratio' },
        '6.5A': { grade:6, domain:'Proportionality', desc:'Represent mathematical and real-world problems involving ratios and rates using scale factors, tables, graphs, and proportions', topic:'ratio' },
        '6.5B': { grade:6, domain:'Proportionality', desc:'Solve real-world problems to find the whole given a part and the percent', topic:'percent' },
        '6.5C': { grade:6, domain:'Proportionality', desc:'Use equivalent fractions, decimals, and percents to show equal parts of the same whole', topic:'percent' },
        '6.6A': { grade:6, domain:'Algebra', desc:'Identify independent and dependent quantities from tables and graphs', topic:'equation' },
        '6.6B': { grade:6, domain:'Algebra', desc:'Write an equation that represents the relationship between independent and dependent quantities', topic:'equation' },
        '6.6C': { grade:6, domain:'Algebra', desc:'Represent a given situation using verbal descriptions, tables, graphs, and equations', topic:'equation' },
        '6.7A': { grade:6, domain:'Algebra', desc:'Generate equivalent numerical expressions using order of operations', topic:'expression' },
        '6.7B': { grade:6, domain:'Algebra', desc:'Distinguish between expressions and equations verbally, numerically, and algebraically', topic:'expression' },
        '6.7C': { grade:6, domain:'Algebra', desc:'Determine if two expressions are equivalent using concrete models, pictorial models, and algebraic representations', topic:'expression' },
        '6.7D': { grade:6, domain:'Algebra', desc:'Generate equivalent expressions using the properties of operations: inverse, identity, commutative, associative, and distributive', topic:'expression' },
        '6.8A': { grade:6, domain:'Geometry', desc:'Extend previous knowledge of triangles and their properties to include the sum of angles', topic:'angle' },
        '6.8B': { grade:6, domain:'Geometry', desc:'Model area formulas for parallelograms, trapezoids, and triangles', topic:'area' },
        '6.8C': { grade:6, domain:'Geometry', desc:'Write equations that represent problems related to the area of rectangles, parallelograms, trapezoids, and triangles', topic:'area' },
        '6.8D': { grade:6, domain:'Geometry', desc:'Determine solutions for problems involving the area of rectangles, parallelograms, trapezoids, and triangles', topic:'area' },
        '6.9A': { grade:6, domain:'Algebra', desc:'Write one-variable, one-step equations and inequalities to represent constraints or conditions within problems', topic:'equation' },
        '6.9B': { grade:6, domain:'Algebra', desc:'Represent solutions for one-variable, one-step equations and inequalities on number lines', topic:'equation' },
        '6.10A': { grade:6, domain:'Algebra', desc:'Model and solve one-variable, one-step equations and inequalities that represent problems', topic:'equation' },
        '6.10B': { grade:6, domain:'Algebra', desc:'Determine if the given value(s) make(s) one-variable, one-step equations or inequalities true', topic:'equation' },
        '6.11A': { grade:6, domain:'Geometry', desc:'Graph points in all four quadrants using ordered pairs of rational numbers', topic:'coordinate' },
        '6.12A': { grade:6, domain:'Data', desc:'Represent numeric data graphically, including dot plots, stem-and-leaf plots, histograms, and box plots', topic:'data' },
        '6.12B': { grade:6, domain:'Data', desc:'Use the graphical representation of numeric data to describe the center, spread, and shape of the data distribution', topic:'statistics' },
        '6.12C': { grade:6, domain:'Data', desc:'Summarize numeric data with numerical summaries: the mean and median; the range and interquartile range', topic:'statistics' },
        '6.12D': { grade:6, domain:'Data', desc:'Summarize categorical data with numerical and graphical summaries using the mode, the percent of data in each category', topic:'statistics' },
        '6.13A': { grade:6, domain:'Data', desc:'Interpret numeric data summarized in dot plots, stem-and-leaf plots, histograms, and box plots', topic:'statistics' },

        // ── Grade 7 ────────────────────────────────────────────────────────
        '7.2A': { grade:7, domain:'Number', desc:'Extend previous knowledge of sets and subsets using a visual representation to describe relationships between sets', topic:'number' },
        '7.3A': { grade:7, domain:'Number', desc:'Add, subtract, multiply, and divide rational numbers fluently', topic:'rational number' },
        '7.3B': { grade:7, domain:'Number', desc:'Apply and extend previous understandings of operations to solve problems using addition, subtraction, multiplication, and division of rational numbers', topic:'rational number' },
        '7.4A': { grade:7, domain:'Proportionality', desc:'Represent constant rates of change in mathematical and real-world problems given pictorial, tabular, verbal, numeric, graphical, and algebraic representations', topic:'proportion' },
        '7.4B': { grade:7, domain:'Proportionality', desc:'Calculate unit rates from rates in mathematical and real-world problems', topic:'proportion' },
        '7.4C': { grade:7, domain:'Proportionality', desc:'Determine the constant of proportionality (k = y/x) within mathematical and real-world problems', topic:'proportion' },
        '7.4D': { grade:7, domain:'Proportionality', desc:'Solve problems involving ratios, rates, and percents, including multi-step problems involving percent increase and percent decrease', topic:'percent' },
        '7.4E': { grade:7, domain:'Proportionality', desc:'Convert between measurement systems, including the use of proportions and the use of unit rates', topic:'proportion' },
        '7.5A': { grade:7, domain:'Geometry', desc:'Generalize the critical attributes of similarity, including ratios within and between similar shapes', topic:'proportion' },
        '7.5B': { grade:7, domain:'Geometry', desc:'Describe π as the ratio of the circumference of a circle to its diameter', topic:'circle' },
        '7.5C': { grade:7, domain:'Geometry', desc:'Solve mathematical and real-world problems involving similar shape and scale drawings', topic:'scale' },
        '7.6A': { grade:7, domain:'Probability', desc:'Represent sample spaces for simple and compound events using lists and tree diagrams', topic:'probability' },
        '7.6B': { grade:7, domain:'Probability', desc:'Select and use different simulations to represent simple and compound events with and without technology', topic:'probability' },
        '7.6C': { grade:7, domain:'Probability', desc:'Make predictions and determine solutions using experimental data for simple and compound events', topic:'probability' },
        '7.6D': { grade:7, domain:'Probability', desc:'Make predictions and determine solutions using theoretical probability for simple and compound events', topic:'probability' },
        '7.6E': { grade:7, domain:'Probability', desc:'Find the probabilities of a simple event and its complement and describe the relationship', topic:'probability' },
        '7.6F': { grade:7, domain:'Probability', desc:'Use data from a random sample to make inferences about a population', topic:'statistics' },
        '7.6G': { grade:7, domain:'Statistics', desc:'Solve problems using data represented in bar graphs, dot plots, and circle graphs', topic:'data' },
        '7.6H': { grade:7, domain:'Statistics', desc:'Solve problems using qualitative and quantitative predictions and comparisons from simple experiments', topic:'statistics' },
        '7.6I': { grade:7, domain:'Probability', desc:'Determine experimental and theoretical probabilities related to simple and compound events using data and sample spaces', topic:'probability' },
        '7.7A': { grade:7, domain:'Algebra', desc:'Represent linear relationships using verbal, tabular, algebraic, and graphical forms', topic:'linear' },
        '7.7B': { grade:7, domain:'Algebra', desc:'Represent solutions to an inequality using a number line and determine whether a statement is true', topic:'inequality' },
        '7.7C': { grade:7, domain:'Algebra', desc:'Determine the constant of variation given a proportional relationship in y = kx form', topic:'linear' },
        '7.8A': { grade:7, domain:'Geometry', desc:'Model the relationship between the volume of a rectangular prism and a rectangular pyramid having both equal bases and heights', topic:'volume' },
        '7.8B': { grade:7, domain:'Geometry', desc:'Explain verbally and symbolically the relationship between the volume of a triangular prism and a triangular pyramid', topic:'volume' },
        '7.8C': { grade:7, domain:'Geometry', desc:'Use models to determine the approximate formulas for the circumference and area of a circle', topic:'circle' },
        '7.9A': { grade:7, domain:'Geometry', desc:'Solve problems involving the volume of rectangular prisms, triangular prisms, rectangular pyramids, and triangular pyramids', topic:'volume' },
        '7.9B': { grade:7, domain:'Geometry', desc:'Determine the circumference and area of circles', topic:'circle' },
        '7.9C': { grade:7, domain:'Geometry', desc:'Determine the area of composite figures containing combinations of rectangles, squares, parallelograms, trapezoids, triangles, semicircles, and quarter circles', topic:'area' },
        '7.9D': { grade:7, domain:'Geometry', desc:'Solve problems involving the lateral and total surface area of a rectangular prism, rectangular pyramid, triangular prism, and triangular pyramid', topic:'area' },
        '7.10A': { grade:7, domain:'Algebra', desc:'Write one-variable, two-step equations and inequalities to represent constraints or conditions within problems', topic:'equation' },
        '7.10B': { grade:7, domain:'Algebra', desc:'Represent solutions for one-variable, two-step equations and inequalities on number lines', topic:'equation' },
        '7.11A': { grade:7, domain:'Algebra', desc:'Model and solve one-variable, two-step equations and inequalities', topic:'equation' },
        '7.11B': { grade:7, domain:'Algebra', desc:'Determine if the given value(s) make(s) one-variable, two-step equations or inequalities true', topic:'equation' },
        '7.11C': { grade:7, domain:'Algebra', desc:'Write and solve equations using geometry concepts, including the sum of angles in a triangle, and angle relationships', topic:'angle' },
        '7.12A': { grade:7, domain:'Statistics', desc:'Compare two groups of numeric data using comparative dot plots or box plots by comparing the shapes and centers', topic:'statistics' },
        '7.12B': { grade:7, domain:'Statistics', desc:'Use data from a random sample to make inferences about a population', topic:'statistics' },
        '7.12C': { grade:7, domain:'Statistics', desc:'Compare two populations based on data in random samples from these populations, including informal comparative inferences', topic:'statistics' },

        // ── Grade 8 ────────────────────────────────────────────────────────
        '8.2A': { grade:8, domain:'Number', desc:'Extend previous knowledge of sets and subsets using a visual representation to describe relationships between sets of real numbers', topic:'irrational' },
        '8.2B': { grade:8, domain:'Number', desc:'Approximate the value of an irrational number, including π and square roots of non-perfect squares', topic:'irrational' },
        '8.2C': { grade:8, domain:'Number', desc:'Convert between standard decimal notation and scientific notation', topic:'scientific notation' },
        '8.2D': { grade:8, domain:'Number', desc:'Order a set of real numbers arising from mathematical and real-world contexts', topic:'irrational' },
        '8.3A': { grade:8, domain:'Proportionality', desc:'Generalize that the ratio of corresponding sides of similar shapes are proportional, including a shape and its dilation', topic:'proportion' },
        '8.3B': { grade:8, domain:'Proportionality', desc:'Compare and contrast the attributes of a shape and its dilation(s) on a coordinate plane', topic:'transformation' },
        '8.3C': { grade:8, domain:'Proportionality', desc:'Use an algebraic representation to explain the effect of a given positive rational scale factor applied to two-dimensional figures', topic:'scale' },
        '8.4A': { grade:8, domain:'Proportionality', desc:'Use similar right triangles to develop an understanding that slope, m, given as the rate comparing the change in y-values to the change in x-values', topic:'slope' },
        '8.4B': { grade:8, domain:'Proportionality', desc:'Graph proportional relationships, interpreting the unit rate as the slope of the line', topic:'slope' },
        '8.4C': { grade:8, domain:'Proportionality', desc:'Use data from a table or graph to determine the rate of change or slope and y-intercept in mathematical and real-world problems', topic:'slope' },
        '8.5A': { grade:8, domain:'Algebra', desc:'Represent linear proportional situations with tables, graphs, and equations in the form y=kx', topic:'linear' },
        '8.5B': { grade:8, domain:'Algebra', desc:'Represent linear non-proportional situations with tables, graphs, and equations in the form y=mx+b, where b≠0', topic:'linear' },
        '8.5C': { grade:8, domain:'Statistics', desc:'Contrast bivariate sets of data that suggest linear relationships with bivariate sets of data that do not suggest linear relationships', topic:'scatter' },
        '8.5D': { grade:8, domain:'Statistics', desc:'Use a trend line that approximates the linear relationship between bivariate sets of data to make predictions', topic:'scatter' },
        '8.5E': { grade:8, domain:'Algebra', desc:'Solve problems involving direct variation', topic:'proportion' },
        '8.5F': { grade:8, domain:'Algebra', desc:'Distinguish between proportional and non-proportional linear situations using tables, graphs, and equations', topic:'linear' },
        '8.5G': { grade:8, domain:'Algebra', desc:'Identify functions using sets of ordered pairs, tables, mappings, and graphs', topic:'function' },
        '8.5H': { grade:8, domain:'Algebra', desc:'Identify examples of proportional and non-proportional functions that arise from mathematical and real-world problems', topic:'function' },
        '8.5I': { grade:8, domain:'Algebra', desc:'Write an equation in the form y=mx+b to model a linear relationship between two quantities using verbal, numerical, tabular, and graphical representations', topic:'linear' },
        '8.6A': { grade:8, domain:'Geometry', desc:'Describe the volume formula V=Bh of a cylinder in terms of its base area and its height', topic:'volume' },
        '8.6B': { grade:8, domain:'Geometry', desc:'Model the relationship between the volume of a cylinder and a cone having both equal bases and heights', topic:'volume' },
        '8.6C': { grade:8, domain:'Geometry', desc:'Use models and diagrams to explain the Pythagorean theorem', topic:'pythagorean' },
        '8.7A': { grade:8, domain:'Geometry', desc:'Apply the Pythagorean theorem to determine the distance between two points in a coordinate plane', topic:'pythagorean' },
        '8.7B': { grade:8, domain:'Geometry', desc:'Use previous knowledge of surface area to make connections to the formulas for lateral and total surface area', topic:'area' },
        '8.7C': { grade:8, domain:'Geometry', desc:'Use the Pythagorean theorem and its converse to solve problems', topic:'pythagorean' },
        '8.8A': { grade:8, domain:'Algebra', desc:'Write one-variable equations or inequalities with variables on both sides that represent problems', topic:'equation' },
        '8.8B': { grade:8, domain:'Algebra', desc:'Write a corresponding real-world problem when given a one-variable equation or inequality', topic:'equation' },
        '8.8C': { grade:8, domain:'Algebra', desc:'Model and solve one-variable equations with variables on both sides of the equal sign', topic:'equation' },
        '8.9A': { grade:8, domain:'Algebra', desc:'Identify and verify the values of x and y that simultaneously satisfy two linear equations in two variables', topic:'systems' },
        '8.10A': { grade:8, domain:'Geometry', desc:'Generalize the properties of orientation and congruence of reflections, rotations, translations, and dilations', topic:'transformation' },
        '8.10B': { grade:8, domain:'Geometry', desc:'Differentiate between transformations that preserve congruence and those that do not', topic:'transformation' },
        '8.10C': { grade:8, domain:'Geometry', desc:'Explain the effect of translations, reflections over the x- or y-axis, and rotations limited to 90°, 180°, 270°, and 360°', topic:'transformation' },
        '8.10D': { grade:8, domain:'Geometry', desc:'Model the effect of dilations on linear and area measurements of two-dimensional figures', topic:'transformation' },
        '8.11A': { grade:8, domain:'Measurement', desc:'Solve problems using the Pythagorean theorem in two and three dimensions', topic:'pythagorean' },

        // ── High School — Algebra I ─────────────────────────────────────────
        'A.2A': { grade:'HS', domain:'Algebra I', desc:'Determine the domain and range of a linear function in mathematical problems; determine reasonable domain and range values', topic:'function' },
        'A.6A': { grade:'HS', domain:'Algebra I', desc:'Determine the domain and range of quadratic functions; determine reasonable domain and range values', topic:'function' },
        'A.6B': { grade:'HS', domain:'Algebra I', desc:'Write equations of quadratic functions given the vertex and another point', topic:'quadratic' },
        'A.6C': { grade:'HS', domain:'Algebra I', desc:'Write quadratic equations when given real solutions and graphs of the related functions', topic:'quadratic' },
        'A.7A': { grade:'HS', domain:'Algebra I', desc:'Graph quadratic functions on the coordinate plane using various methods', topic:'quadratic' },
        'A.7C': { grade:'HS', domain:'Algebra I', desc:'Determine the effects of parameter changes on quadratic functions', topic:'quadratic' },
        'A.12A': { grade:'HS', domain:'Algebra I', desc:'Decide whether relations represented verbally, tabularly, graphically, and symbolically define a function', topic:'function' },
        'A.12B': { grade:'HS', domain:'Algebra I', desc:'Evaluate functions, expressed in function notation, given one or more elements in their domains', topic:'function' },

        // ── High School — Geometry ─────────────────────────────────────────
        'G.2A': { grade:'HS', domain:'Geometry', desc:'Determine the lengths of sides and measures of angles in a right triangle by applying the Pythagorean theorem', topic:'pythagorean' },
        'G.2B': { grade:'HS', domain:'Geometry', desc:'Determine the distance between two points on a coordinate plane using the distance formula', topic:'distance' },
        'G.5A': { grade:'HS', domain:'Geometry', desc:'Investigate patterns to make conjectures about geometric relationships', topic:'geometry' },
        'G.5B': { grade:'HS', domain:'Geometry', desc:'Construct congruent segments, congruent angles, a segment bisector, an angle bisector, perpendicular lines, a perpendicular bisector, and a line parallel to a given line', topic:'geometry' },
        'G.10A': { grade:'HS', domain:'Geometry', desc:'Apply the definition of similarity in terms of a dilation to identify similar figures', topic:'proportion' },
        'G.11A': { grade:'HS', domain:'Geometry', desc:'Apply the Triangle Inequality theorem to determine if three lengths are the sides of a triangle', topic:'triangle' },
    };

    // ════════════════════════════════════════════════════════════════════════
    //  MN-22 — Minnesota 2022 Mathematics Standards
    //  Format: [Grade].[Strand].[Standard].[Benchmark]
    //  Strands: N (Number), A (Algebra), GM (Geometry & Measurement), DP (Data & Probability)
    //  Full coverage grades K–8; abbreviated HS
    // ════════════════════════════════════════════════════════════════════════
    const MN22 = {
        // ── Kindergarten ───────────────────────────────────────────────────
        'K.N.1.1': { grade:'K', strand:'N', desc:'Count aloud, forward and backward, to at least 20', topic:'counting' },
        'K.N.1.2': { grade:'K', strand:'N', desc:'Recognize without counting (subitize) the quantity of a small group of objects in organized and random arrangements', topic:'counting' },
        'K.N.1.3': { grade:'K', strand:'N', desc:'Connect number words and numerals to the quantities they represent', topic:'counting' },
        'K.N.2.1': { grade:'K', strand:'N', desc:'Use objects and draw pictures to find the sums and differences of numbers between 0 and 10', topic:'addition' },
        'K.N.2.2': { grade:'K', strand:'N', desc:'Demonstrate fluency with addition and subtraction within 5', topic:'addition' },
        'K.GM.1.1': { grade:'K', strand:'GM', desc:'Recognize and sort basic two-dimensional shapes by attribute', topic:'geometry' },
        'K.GM.1.2': { grade:'K', strand:'GM', desc:'Identify basic three-dimensional shapes in everyday objects', topic:'geometry' },
        'K.GM.2.1': { grade:'K', strand:'GM', desc:'Compare objects by measurable attributes such as length and weight', topic:'measurement' },
        'K.DP.1.1': { grade:'K', strand:'DP', desc:'Collect and organize objects or data into categories and sort the categories by quantity', topic:'data' },
        'K.DP.1.2': { grade:'K', strand:'DP', desc:'Create and read simple bar graphs and picture graphs', topic:'data' },

        // ── Grade 1 ────────────────────────────────────────────────────────
        '1.N.1.1': { grade:1, strand:'N', desc:'Recognize place value of ones and tens in a two-digit number', topic:'place value' },
        '1.N.1.2': { grade:1, strand:'N', desc:'Use objects and representations to develop understanding of place value', topic:'place value' },
        '1.N.1.3': { grade:1, strand:'N', desc:'Count on from a given number to find the number of objects in a group', topic:'counting' },
        '1.N.2.1': { grade:1, strand:'N', desc:'Use concrete models and drawings to represent addition', topic:'addition' },
        '1.N.2.2': { grade:1, strand:'N', desc:'Demonstrate fluency with addition and subtraction within 10', topic:'addition' },
        '1.N.2.3': { grade:1, strand:'N', desc:'Demonstrate fluency with addition and subtraction within 20', topic:'addition' },
        '1.A.1.1': { grade:1, strand:'A', desc:'Use objects and drawings to represent addition and subtraction situations', topic:'equation' },
        '1.GM.1.1': { grade:1, strand:'GM', desc:'Identify and describe two-dimensional shapes and three-dimensional solids', topic:'geometry' },
        '1.GM.1.2': { grade:1, strand:'GM', desc:'Compose and decompose two-dimensional shapes', topic:'geometry' },
        '1.GM.2.1': { grade:1, strand:'GM', desc:'Tell time to the hour using analog and digital clocks', topic:'measurement' },
        '1.DP.1.1': { grade:1, strand:'DP', desc:'Collect, organize, and represent data in bar graphs and picture graphs', topic:'data' },

        // ── Grade 2 ────────────────────────────────────────────────────────
        '2.N.1.1': { grade:2, strand:'N', desc:'Read, write, and represent whole numbers up to 1000', topic:'place value' },
        '2.N.1.2': { grade:2, strand:'N', desc:'Understand place value: ones, tens, and hundreds', topic:'place value' },
        '2.N.1.3': { grade:2, strand:'N', desc:'Use place value understanding to compare numbers', topic:'comparison' },
        '2.N.2.1': { grade:2, strand:'N', desc:'Demonstrate fluency with addition and subtraction within 20', topic:'addition' },
        '2.N.2.2': { grade:2, strand:'N', desc:'Use strategies to add and subtract within 100', topic:'addition' },
        '2.A.1.1': { grade:2, strand:'A', desc:'Represent addition and subtraction word problems using equations', topic:'equation' },
        '2.GM.1.1': { grade:2, strand:'GM', desc:'Identify and describe two-dimensional shapes', topic:'geometry' },
        '2.GM.1.2': { grade:2, strand:'GM', desc:'Identify and describe three-dimensional solids', topic:'geometry' },
        '2.GM.2.1': { grade:2, strand:'GM', desc:'Measure length using standard units', topic:'measurement' },
        '2.GM.2.2': { grade:2, strand:'GM', desc:'Tell time to the nearest 5 minutes', topic:'measurement' },
        '2.DP.1.1': { grade:2, strand:'DP', desc:'Represent data using bar graphs and line graphs', topic:'data' },

        // ── Grade 3 ────────────────────────────────────────────────────────
        '3.N.1.1': { grade:3, strand:'N', desc:'Read, write, and represent fractions with denominators of 2, 3, 4, 6, and 8', topic:'fraction' },
        '3.N.1.2': { grade:3, strand:'N', desc:'Represent equivalent fractions using area and length models', topic:'fraction' },
        '3.N.2.1': { grade:3, strand:'N', desc:'Represent multiplication and division in various ways', topic:'multiplication' },
        '3.N.2.2': { grade:3, strand:'N', desc:'Demonstrate fluency with multiplication and division facts within 100', topic:'multiplication' },
        '3.N.3.1': { grade:3, strand:'N', desc:'Use arrays to model multiplication and division', topic:'multiplication' },
        '3.A.1.1': { grade:3, strand:'A', desc:'Represent unknown numbers in multiplication and division equations', topic:'equation' },
        '3.GM.1.1': { grade:3, strand:'GM', desc:'Develop understanding of area', topic:'area' },
        '3.GM.1.2': { grade:3, strand:'GM', desc:'Recognize and describe perimeter', topic:'perimeter' },
        '3.GM.1.3': { grade:3, strand:'GM', desc:'Identify and describe properties of two-dimensional shapes', topic:'geometry' },
        '3.GM.2.1': { grade:3, strand:'GM', desc:'Tell time to the nearest minute', topic:'measurement' },
        '3.DP.1.1': { grade:3, strand:'DP', desc:'Represent data using bar graphs, pictographs, and line plots', topic:'data' },

        // ── Grade 4 ────────────────────────────────────────────────────────
        '4.N.1.1': { grade:4, strand:'N', desc:'Demonstrate mastery of multiplication and division basic facts; multiply multi-digit numbers', topic:'multiplication' },
        '4.N.1.2': { grade:4, strand:'N', desc:'Multiply whole numbers up to four digits by one-digit numbers', topic:'multiplication' },
        '4.N.2.1': { grade:4, strand:'N', desc:'Represent equivalent fractions using fraction models', topic:'fraction' },
        '4.N.2.2': { grade:4, strand:'N', desc:'Compare and order fractions', topic:'fraction' },
        '4.N.2.3': { grade:4, strand:'N', desc:'Add and subtract fractions with like denominators', topic:'fraction' },
        '4.N.3.1': { grade:4, strand:'N', desc:'Represent and interpret decimals', topic:'decimal' },
        '4.A.1.1': { grade:4, strand:'A', desc:'Identify and describe factor pairs', topic:'number theory' },
        '4.A.1.2': { grade:4, strand:'A', desc:'Recognize and describe patterns in addition and multiplication', topic:'expression' },
        '4.GM.1.1': { grade:4, strand:'GM', desc:'Solve problems involving area', topic:'area' },
        '4.GM.1.2': { grade:4, strand:'GM', desc:'Measure angles using a protractor', topic:'measurement' },
        '4.GM.1.3': { grade:4, strand:'GM', desc:'Classify two-dimensional figures', topic:'geometry' },
        '4.GM.2.1': { grade:4, strand:'GM', desc:'Measure length and weight using standard units', topic:'measurement' },
        '4.DP.1.1': { grade:4, strand:'DP', desc:'Represent data using line plots, bar graphs, and tables', topic:'data' },

        // ── Grade 5 ────────────────────────────────────────────────────────
        '5.N.1.1': { grade:5, strand:'N', desc:'Divide multi-digit numbers; solve real-world and mathematical problems using arithmetic', topic:'division' },
        '5.N.1.2': { grade:5, strand:'N', desc:'Add and subtract fractions with unlike denominators', topic:'fraction' },
        '5.N.2.1': { grade:5, strand:'N', desc:'Multiply fractions and whole numbers', topic:'fraction' },
        '5.N.2.2': { grade:5, strand:'N', desc:'Divide fractions by whole numbers and whole numbers by fractions', topic:'fraction' },
        '5.N.3.1': { grade:5, strand:'N', desc:'Multiply and divide decimals', topic:'decimal' },
        '5.N.3.2': { grade:5, strand:'N', desc:'Add and subtract decimals to hundredths', topic:'decimal' },
        '5.A.1.1': { grade:5, strand:'A', desc:'Write and interpret expressions using parentheses, brackets, and braces', topic:'expression' },
        '5.A.1.2': { grade:5, strand:'A', desc:'Analyze patterns and relationships in sequences', topic:'expression' },
        '5.GM.1.1': { grade:5, strand:'GM', desc:'Find volume of rectangular prisms', topic:'volume' },
        '5.GM.1.2': { grade:5, strand:'GM', desc:'Understand relationships between area and volume', topic:'area' },
        '5.GM.2.1': { grade:5, strand:'GM', desc:'Graph ordered pairs on the coordinate plane', topic:'coordinate' },
        '5.DP.1.1': { grade:5, strand:'DP', desc:'Represent data using line plots and stem-and-leaf plots', topic:'data' },
        '5.DP.1.2': { grade:5, strand:'DP', desc:'Analyze data using measures of center and spread', topic:'statistics' },

        // ── Grade 6 — Full Coverage ────────────────────────────────────────
        '6.N.1.1': { grade:6, strand:'N', desc:'Represent and compare positive and negative integers using a number line and other models', topic:'integer' },
        '6.N.1.2': { grade:6, strand:'N', desc:'Compare and order positive and negative rational numbers on a number line', topic:'integer' },
        '6.N.2.1': { grade:6, strand:'N', desc:'Determine the greatest common factor and least common multiple of whole numbers', topic:'factor' },
        '6.N.2.2': { grade:6, strand:'N', desc:'Apply the relationship between ratios, equivalent fractions, decimals, and percents', topic:'ratio' },
        '6.N.2.3': { grade:6, strand:'N', desc:'Use ratios to represent relationships between quantities in mathematical and real-world contexts', topic:'ratio' },
        '6.N.3.1': { grade:6, strand:'N', desc:'Add, subtract, multiply, and divide integers', topic:'integer' },
        '6.N.3.2': { grade:6, strand:'N', desc:'Solve real-world and mathematical problems involving fractions, mixed numbers, and rational numbers', topic:'fraction' },
        '6.N.3.3': { grade:6, strand:'N', desc:'Calculate percent of a number and solve problems using percent', topic:'percent' },
        '6.A.1.1': { grade:6, strand:'A', desc:'Recognize and describe the connection between operations and their properties', topic:'expression' },
        '6.A.1.2': { grade:6, strand:'A', desc:'Write, read, and evaluate expressions in which letters or symbols stand for numbers', topic:'expression' },
        '6.A.2.1': { grade:6, strand:'A', desc:'Use substitution to determine whether a given number in a specified set makes an equation or inequality true', topic:'equation' },
        '6.A.2.2': { grade:6, strand:'A', desc:'Use variables to represent two quantities in a real-world problem', topic:'equation' },
        '6.A.3.1': { grade:6, strand:'A', desc:'Write and solve equations of the form x+p=q and px=q for cases in which p, q, and x are all nonneg. rational numbers', topic:'equation' },
        '6.A.3.2': { grade:6, strand:'A', desc:'Write an inequality of the form x>c or x<c to represent a constraint or condition', topic:'equation' },
        '6.GM.1.1': { grade:6, strand:'GM', desc:'Find the area of polygons by decomposing into triangles and rectangles', topic:'area' },
        '6.GM.1.2': { grade:6, strand:'GM', desc:'Develop and use formulas for the area of triangles, parallelograms, and trapezoids', topic:'area' },
        '6.GM.2.1': { grade:6, strand:'GM', desc:'Find the volume of right rectangular prisms by packing with unit cubes', topic:'volume' },
        '6.GM.2.2': { grade:6, strand:'GM', desc:'Represent three-dimensional figures using nets made up of rectangles and triangles', topic:'volume' },
        '6.GM.3.1': { grade:6, strand:'GM', desc:'Draw polygons in the coordinate plane given coordinates for the vertices', topic:'coordinate' },
        '6.GM.3.2': { grade:6, strand:'GM', desc:'Find the length of a side joining points with the same first or second coordinate', topic:'coordinate' },
        '6.DP.1.1': { grade:6, strand:'DP', desc:'Display and describe numerical data in plots on a number line, including dot plots, histograms, and box plots', topic:'statistics' },
        '6.DP.1.2': { grade:6, strand:'DP', desc:'Calculate measures of center (mean, median) and measures of variability (range, IQR, MAD)', topic:'statistics' },
        '6.DP.1.3': { grade:6, strand:'DP', desc:'Summarize numerical data sets in relation to their context', topic:'statistics' },

        // ── Grade 7 — Full Coverage ────────────────────────────────────────
        '7.N.1.1': { grade:7, strand:'N', desc:'Know that every rational number can be written as a ratio of two integers or as a terminating or repeating decimal', topic:'rational number' },
        '7.N.1.2': { grade:7, strand:'N', desc:'Add, subtract, multiply, and divide rational numbers with fluency', topic:'rational number' },
        '7.N.1.3': { grade:7, strand:'N', desc:'Solve real-world and mathematical problems involving the four operations with rational numbers', topic:'rational number' },
        '7.A.1.1': { grade:7, strand:'A', desc:'Decide whether two quantities are in a proportional relationship and identify the constant of proportionality', topic:'proportion' },
        '7.A.1.2': { grade:7, strand:'A', desc:'Represent proportional relationships by equations and explain the meaning of the constant of proportionality', topic:'proportion' },
        '7.A.1.3': { grade:7, strand:'A', desc:'Explain what a point on a graph of a proportional relationship means in terms of the situation', topic:'proportion' },
        '7.A.2.1': { grade:7, strand:'A', desc:'Apply properties of operations as strategies to add, subtract, factor, and expand linear expressions', topic:'expression' },
        '7.A.2.2': { grade:7, strand:'A', desc:'Understand that rewriting an expression in different forms can shed light on the problem', topic:'expression' },
        '7.A.3.1': { grade:7, strand:'A', desc:'Solve multi-step real-world and mathematical problems posed with positive and negative rational numbers', topic:'equation' },
        '7.A.3.2': { grade:7, strand:'A', desc:'Use variables to represent quantities in a real-world or mathematical problem and construct equations to solve', topic:'equation' },
        '7.A.4.1': { grade:7, strand:'A', desc:'Solve word problems leading to inequalities of the form px+q>r or px+q<r', topic:'inequality' },
        '7.GM.1.1': { grade:7, strand:'GM', desc:'Solve problems involving scale drawings of geometric figures', topic:'scale' },
        '7.GM.1.2': { grade:7, strand:'GM', desc:'Know the formulas for the area and circumference of a circle; use them to solve problems', topic:'circle' },
        '7.GM.2.1': { grade:7, strand:'GM', desc:'Solve real-world and mathematical problems involving area, volume, and surface area of objects', topic:'area' },
        '7.GM.2.2': { grade:7, strand:'GM', desc:'Describe the two-dimensional figures that result from slicing three-dimensional figures', topic:'area' },
        '7.DP.1.1': { grade:7, strand:'DP', desc:'Understand that statistics can be used to gain information about a population by examining a sample', topic:'statistics' },
        '7.DP.1.2': { grade:7, strand:'DP', desc:'Use data from a random sample to draw inferences about a population with an unknown characteristic', topic:'statistics' },
        '7.DP.2.1': { grade:7, strand:'DP', desc:'Understand that the probability of a chance event is a number between 0 and 1', topic:'probability' },
        '7.DP.2.2': { grade:7, strand:'DP', desc:'Develop a probability model and use it to find probabilities of events', topic:'probability' },
        '7.DP.2.3': { grade:7, strand:'DP', desc:'Find probabilities of compound events using organized lists, tables, tree diagrams, and simulation', topic:'probability' },

        // ── Grade 8 — Full Coverage ────────────────────────────────────────
        '8.N.1.1': { grade:8, strand:'N', desc:'Know that numbers that are not rational are called irrational; know that every number has a decimal expansion', topic:'irrational' },
        '8.N.1.2': { grade:8, strand:'N', desc:'Use rational approximations of irrational numbers to compare the size of irrational numbers', topic:'irrational' },
        '8.N.1.3': { grade:8, strand:'N', desc:'Express very large and very small quantities in scientific notation and interpret in context', topic:'scientific notation' },
        '8.A.1.1': { grade:8, strand:'A', desc:'Graph proportional relationships, interpreting the unit rate as the slope of the graph; compare two different proportional relationships', topic:'slope' },
        '8.A.1.2': { grade:8, strand:'A', desc:'Use similar triangles to explain why the slope m is the same between any two points on a non-vertical line', topic:'slope' },
        '8.A.1.3': { grade:8, strand:'A', desc:'Derive the equation y=mx+b for a line; interpret the meaning of slope and y-intercept', topic:'linear' },
        '8.A.2.1': { grade:8, strand:'A', desc:'Solve linear equations in one variable with rational coefficients', topic:'equation' },
        '8.A.2.2': { grade:8, strand:'A', desc:'Solve pairs of simultaneous linear equations using substitution and elimination', topic:'systems' },
        '8.A.3.1': { grade:8, strand:'A', desc:'Understand that a function is a rule that assigns exactly one output to each input', topic:'function' },
        '8.A.3.2': { grade:8, strand:'A', desc:'Compare properties of two functions each represented in a different way', topic:'function' },
        '8.A.3.3': { grade:8, strand:'A', desc:'Interpret the equation y=mx+b as defining a linear function; give examples of non-linear functions', topic:'function' },
        '8.GM.1.1': { grade:8, strand:'GM', desc:'Verify experimentally the properties of rotations, reflections, and translations', topic:'transformation' },
        '8.GM.1.2': { grade:8, strand:'GM', desc:'Understand that a two-dimensional figure is congruent to another if it can be obtained by a sequence of rotations, reflections, and translations', topic:'transformation' },
        '8.GM.1.3': { grade:8, strand:'GM', desc:'Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures', topic:'transformation' },
        '8.GM.1.4': { grade:8, strand:'GM', desc:'Understand that a two-dimensional figure is similar to another if it can be obtained by dilations, translations, rotations, and reflections', topic:'transformation' },
        '8.GM.2.1': { grade:8, strand:'GM', desc:'Explain a proof of the Pythagorean theorem and its converse', topic:'pythagorean' },
        '8.GM.2.2': { grade:8, strand:'GM', desc:'Apply the Pythagorean theorem to determine unknown side lengths in right triangles', topic:'pythagorean' },
        '8.GM.2.3': { grade:8, strand:'GM', desc:'Apply the Pythagorean theorem to find the distance between two points in a coordinate system', topic:'pythagorean' },
        '8.GM.3.1': { grade:8, strand:'GM', desc:'Know and apply the formulas for the volumes of cones, cylinders, and spheres', topic:'volume' },
        '8.DP.1.1': { grade:8, strand:'DP', desc:'Construct and interpret scatter plots for bivariate measurement data to investigate patterns of association', topic:'scatter' },
        '8.DP.1.2': { grade:8, strand:'DP', desc:'Know that straight lines are widely used to model relationships between two quantitative variables; assess the model', topic:'scatter' },
        '8.DP.1.3': { grade:8, strand:'DP', desc:'Use the equation of a linear model to solve problems in the context of bivariate measurement data', topic:'scatter' },
    };

    // ════════════════════════════════════════════════════════════════════════
    //  TOPIC → STANDARDS MAP
    //  Maps lesson topics to relevant standards across all 4 frameworks.
    //  Key format: "[topic]_[grade]"  (grade is a number or 'K')
    // ════════════════════════════════════════════════════════════════════════
    const TOPIC_STANDARDS = {
        // ── Kindergarten ───────────────────────────────────────────────────
        'counting_K': {
            label: 'Counting & Cardinality',
            CCSS:  ['K.CC.A.1','K.CC.A.2','K.CC.A.3','K.CC.B.4','K.CC.B.5'],
            MN07:  ['K.1.1.1','K.1.1.2','K.1.1.3'],
            MN22:  ['K.N.1.1','K.N.1.2','K.N.1.3'],
            TEKS:  ['K.2A','K.2B','K.2C','K.2D','K.2F']
        },
        'operations_K': {
            label: 'Addition & Subtraction',
            CCSS:  ['K.OA.A.1','K.OA.A.2','K.OA.A.3','K.OA.A.4','K.OA.A.5'],
            MN07:  ['K.1.2.1','K.1.2.2'],
            MN22:  ['K.N.2.1','K.N.2.2'],
            TEKS:  ['K.3A','K.3B','K.3C']
        },
        'geometry_K': {
            label: 'Shapes & Geometry',
            CCSS:  ['K.G.A.1','K.G.A.2','K.G.A.3'],
            MN07:  ['K.3.1.1','K.3.1.2'],
            MN22:  ['K.GM.1.1','K.GM.1.2'],
            TEKS:  ['K.6A','K.6B']
        },
        'measurement_K': {
            label: 'Measurement & Comparison',
            CCSS:  ['K.MD.A.1','K.MD.A.2'],
            MN07:  ['K.4.1.1'],
            MN22:  ['K.GM.2.1'],
            TEKS:  ['K.7A','K.7B']
        },
        'data_K': {
            label: 'Data & Sorting',
            CCSS:  ['K.MD.B.3'],
            MN07:  ['K.4.2.1'],
            MN22:  ['K.DP.1.1','K.DP.1.2'],
            TEKS:  ['K.8A','K.8B']
        },

        // ── Grade 1 ────────────────────────────────────────────────────────
        'place_value_1': {
            label: 'Place Value & Number Sense',
            CCSS:  ['1.NBT.A.1','1.NBT.B.2','1.NBT.B.3','1.NBT.C.4','1.NBT.C.5'],
            MN07:  ['1.1.1.1','1.1.1.2','1.1.1.3'],
            MN22:  ['1.N.1.1','1.N.1.2','1.N.1.3'],
            TEKS:  ['1.2B','1.2C','1.2D','1.2E','1.2F','1.2G']
        },
        'addition_subtraction_1': {
            label: 'Addition & Subtraction',
            CCSS:  ['1.OA.A.1','1.OA.A.2','1.OA.B.3','1.OA.C.5','1.OA.C.6'],
            MN07:  ['1.1.2.1','1.1.2.2','1.1.2.3'],
            MN22:  ['1.N.2.1','1.N.2.2','1.N.2.3'],
            TEKS:  ['1.3A','1.3B','1.3C','1.3D','1.3E']
        },
        'geometry_1': {
            label: 'Shapes & Geometry',
            CCSS:  ['1.G.A.1','1.G.A.2','1.G.A.3'],
            MN07:  ['1.3.1.1','1.3.1.2'],
            MN22:  ['1.GM.1.1','1.GM.1.2'],
            TEKS:  ['1.7A','1.7B']
        },
        'measurement_1': {
            label: 'Measurement & Time',
            CCSS:  ['1.MD.A.1','1.MD.B.3'],
            MN07:  ['1.4.1.1','1.4.1.2'],
            MN22:  ['1.GM.2.1'],
            TEKS:  ['1.6A','1.6B']
        },
        'data_1': {
            label: 'Data & Graphs',
            CCSS:  ['1.MD.C.4'],
            MN07:  ['1.4.2.1'],
            MN22:  ['1.DP.1.1'],
            TEKS:  ['1.8A','1.8B','1.8C']
        },

        // ── Grade 2 ────────────────────────────────────────────────────────
        'place_value_2': {
            label: 'Place Value to 1000',
            CCSS:  ['2.NBT.A.1','2.NBT.A.2','2.NBT.A.3','2.NBT.A.4'],
            MN07:  ['2.1.1.1','2.1.1.2','2.1.1.3'],
            MN22:  ['2.N.1.1','2.N.1.2','2.N.1.3'],
            TEKS:  ['2.2A','2.2B','2.2C','2.2D','2.2E']
        },
        'operations_2': {
            label: 'Addition & Subtraction',
            CCSS:  ['2.OA.A.1','2.OA.B.2','2.NBT.B.5','2.NBT.B.6','2.NBT.B.7'],
            MN07:  ['2.1.2.1','2.1.2.2','2.1.2.3'],
            MN22:  ['2.N.2.1','2.N.2.2'],
            TEKS:  ['2.4A','2.4B','2.4C','2.4D']
        },
        'geometry_2': {
            label: 'Shapes & Geometry',
            CCSS:  ['2.G.A.1','2.G.A.2','2.G.A.3'],
            MN07:  ['2.3.1.1','2.3.1.2'],
            MN22:  ['2.GM.1.1','2.GM.1.2'],
            TEKS:  ['2.6A','2.6B']
        },
        'measurement_2': {
            label: 'Measurement & Time',
            CCSS:  ['2.MD.A.1','2.MD.A.2','2.MD.B.5','2.MD.B.6'],
            MN07:  ['2.4.1.1','2.4.1.2'],
            MN22:  ['2.GM.2.1','2.GM.2.2'],
            TEKS:  ['2.7A','2.7B','2.7C']
        },
        'data_2': {
            label: 'Data & Graphs',
            CCSS:  ['2.MD.D.9','2.MD.D.10'],
            MN07:  ['2.4.2.1'],
            MN22:  ['2.DP.1.1'],
            TEKS:  ['2.8A','2.8B']
        },

        // ── Grade 3 ────────────────────────────────────────────────────────
        'fraction_3': {
            label: 'Fractions & Equivalence',
            CCSS:  ['3.NF.A.1','3.NF.A.2','3.NF.A.3'],
            MN07:  ['3.1.2.1','3.1.2.2','3.1.2.3'],
            MN22:  ['3.N.1.1','3.N.1.2'],
            TEKS:  ['3.3A','3.3B','3.3C','3.3D','3.3E','3.3H']
        },
        'multiplication_3': {
            label: 'Multiplication & Division',
            CCSS:  ['3.OA.A.1','3.OA.A.2','3.OA.A.3','3.OA.B.5','3.OA.B.6','3.OA.C.7'],
            MN07:  ['3.1.3.1','3.1.3.2','3.1.3.3'],
            MN22:  ['3.N.2.1','3.N.2.2','3.N.3.1'],
            TEKS:  ['3.4D','3.4E','3.4F','3.4G','3.4H','3.4I','3.4J']
        },
        'area_perimeter_3': {
            label: 'Area & Perimeter',
            CCSS:  ['3.MD.C.5','3.MD.C.6','3.MD.D.8'],
            MN07:  ['3.3.1.1','3.3.1.2'],
            MN22:  ['3.GM.1.1','3.GM.1.2'],
            TEKS:  ['3.7A','3.7B']
        },
        'geometry_3': {
            label: 'Shapes & Classification',
            CCSS:  ['3.G.A.1','3.G.A.2'],
            MN07:  ['3.3.2.1'],
            MN22:  ['3.GM.1.3'],
            TEKS:  ['3.6A','3.6B','3.6C']
        },
        'data_3': {
            label: 'Data & Graphs',
            CCSS:  ['3.MD.B.3','3.MD.B.4'],
            MN07:  ['3.4.1.1','3.4.1.2'],
            MN22:  ['3.DP.1.1'],
            TEKS:  ['3.8A','3.8B']
        },

        // ── Grade 4 ────────────────────────────────────────────────────────
        'fraction_4': {
            label: 'Fractions & Operations',
            CCSS:  ['4.NF.A.1','4.NF.A.2','4.NF.B.3','4.NF.B.4'],
            MN07:  ['4.1.2.1','4.1.2.2','4.1.2.3'],
            MN22:  ['4.N.2.1','4.N.2.2','4.N.2.3'],
            TEKS:  ['4.3A','4.3B','4.3C','4.3D','4.3E','4.3F','4.3G']
        },
        'multiplication_division_4': {
            label: 'Multiplication & Division',
            CCSS:  ['4.OA.A.1','4.OA.A.2','4.OA.A.3','4.NBT.B.4','4.NBT.B.5','4.NBT.B.6'],
            MN07:  ['4.1.3.1','4.1.3.2','4.1.3.3'],
            MN22:  ['4.N.1.1','4.N.1.2'],
            TEKS:  ['4.4A','4.4B','4.4C','4.4D','4.4F','4.4H']
        },
        'decimal_4': {
            label: 'Decimals & Place Value',
            CCSS:  ['4.NF.C.5','4.NF.C.6','4.NF.C.7'],
            MN07:  ['4.1.1.1','4.1.1.2'],
            MN22:  ['4.N.3.1'],
            TEKS:  ['4.2E','4.2F','4.2G','4.2H','4.4E']
        },
        'measurement_4': {
            label: 'Measurement & Area',
            CCSS:  ['4.MD.A.1','4.MD.A.2','4.MD.A.3','4.MD.C.5','4.MD.C.7'],
            MN07:  ['4.4.1.1','4.4.1.2'],
            MN22:  ['4.GM.2.1'],
            TEKS:  ['4.7A','4.7B','4.8A','4.8B','4.8C']
        },
        'geometry_4': {
            label: 'Lines, Angles & Shapes',
            CCSS:  ['4.G.A.1','4.G.A.2','4.G.A.3'],
            MN07:  ['4.3.1.1','4.3.1.2'],
            MN22:  ['4.GM.1.1','4.GM.1.2','4.GM.1.3'],
            TEKS:  ['4.6A','4.6B','4.6C','4.6D']
        },

        // ── Grade 5 ────────────────────────────────────────────────────────
        'fraction_5': {
            label: 'Fractions & Operations',
            CCSS:  ['5.NF.A.1','5.NF.A.2','5.NF.B.3','5.NF.B.4','5.NF.B.5','5.NF.B.6','5.NF.B.7'],
            MN07:  ['5.1.2.1','5.1.2.2','5.1.2.3'],
            MN22:  ['5.N.1.1','5.N.1.2','5.N.2.1','5.N.2.2'],
            TEKS:  ['5.3A','5.3D','5.3H','5.3I','5.3J','5.3K','5.3L']
        },
        'decimal_5': {
            label: 'Decimals & Operations',
            CCSS:  ['5.NBT.A.1','5.NBT.A.2','5.NBT.A.3','5.NBT.A.4','5.NBT.B.7'],
            MN07:  ['5.1.1.1','5.1.1.2'],
            MN22:  ['5.N.3.1','5.N.3.2'],
            TEKS:  ['5.2A','5.2B','5.2C','5.3E','5.3F']
        },
        'volume_5': {
            label: 'Volume & Area',
            CCSS:  ['5.MD.C.3','5.MD.C.4','5.MD.C.5'],
            MN07:  ['5.3.1.1','5.3.1.2'],
            MN22:  ['5.GM.1.1','5.GM.1.2'],
            TEKS:  ['5.7A']
        },
        'coordinate_5': {
            label: 'Coordinate Plane',
            CCSS:  ['5.G.A.1','5.G.A.2'],
            MN07:  ['5.3.2.1'],
            MN22:  ['5.GM.2.1'],
            TEKS:  ['5.8A','5.8B','5.8C']
        },
        'algebraic_thinking_5': {
            label: 'Expressions & Order of Operations',
            CCSS:  ['5.OA.A.1','5.OA.A.2','5.OA.B.3'],
            MN07:  ['5.2.1.1','5.2.1.2'],
            MN22:  ['5.A.1.1','5.A.1.2'],
            TEKS:  ['5.4A','5.4B','5.4C','5.4D','5.4E','5.4F']
        },

        // ── Grade 6 ────────────────────────────────────────────────────────
        'integer_6': {
            label: 'Integers & Rational Numbers',
            CCSS:  ['6.NS.C.5','6.NS.C.6','6.NS.C.7'],
            MN07:  ['6.1.3.1','6.1.3.2','6.1.3.3'],
            MN22:  ['6.N.1.1','6.N.1.2','6.N.3.1'],
            TEKS:  ['6.2A','6.2B','6.2C','6.2D','6.3C','6.3D']
        },
        'fraction_6': {
            label: 'Fractions, Decimals & Percents',
            CCSS:  ['6.NS.A.1','6.NS.B.2','6.NS.B.3'],
            MN07:  ['6.1.1.1','6.1.1.2','6.1.1.3'],
            MN22:  ['6.N.2.2','6.N.3.2'],
            TEKS:  ['6.2E','6.3A','6.3E','6.7A']
        },
        'ratio_6': {
            label: 'Ratios & Rates',
            CCSS:  ['6.RP.A.1','6.RP.A.2','6.RP.A.3'],
            MN07:  ['6.1.2.1','6.1.2.2','6.1.2.3'],
            MN22:  ['6.N.2.2','6.N.2.3'],
            TEKS:  ['6.4A','6.4B','6.4C','6.4D','6.4H','6.5A']
        },
        'percent_6': {
            label: 'Percents',
            CCSS:  ['6.RP.A.3c'],
            MN07:  ['6.1.1.4','6.1.2.3'],
            MN22:  ['6.N.3.3'],
            TEKS:  ['6.4E','6.4F','6.4G','6.5B','6.5C']
        },
        'equation_6': {
            label: 'Expressions & Equations',
            CCSS:  ['6.EE.A.1','6.EE.A.2','6.EE.B.5','6.EE.B.6','6.EE.B.7'],
            MN07:  ['6.2.1.1','6.2.2.1','6.2.2.2'],
            MN22:  ['6.A.1.2','6.A.2.1','6.A.3.1'],
            TEKS:  ['6.6A','6.6B','6.6C','6.7A','6.7B','6.9A','6.10A']
        },
        'area_6': {
            label: 'Area & Geometry',
            CCSS:  ['6.G.A.1','6.G.A.2','6.G.A.4'],
            MN07:  ['6.3.1.1','6.3.1.2'],
            MN22:  ['6.GM.1.1','6.GM.1.2','6.GM.2.1'],
            TEKS:  ['6.8A','6.8B','6.8C','6.8D']
        },
        'statistics_6': {
            label: 'Statistics & Data',
            CCSS:  ['6.SP.A.1','6.SP.A.2','6.SP.B.4','6.SP.B.5'],
            MN07:  ['6.4.1.1','6.4.1.2'],
            MN22:  ['6.DP.1.1','6.DP.1.2','6.DP.1.3'],
            TEKS:  ['6.12A','6.12B','6.12C','6.13A']
        },
        'coordinate_6': {
            label: 'Coordinate Plane',
            CCSS:  ['6.NS.C.6','6.NS.C.8'],
            MN07:  ['6.3.2.1'],
            MN22:  ['6.GM.3.1','6.GM.3.2'],
            TEKS:  ['6.11A']
        },

        // ── Grade 7 ────────────────────────────────────────────────────────
        'proportion_7': {
            label: 'Proportional Relationships',
            CCSS:  ['7.RP.A.1','7.RP.A.2','7.RP.A.3'],
            MN07:  ['7.2.1.1','7.2.1.2','7.2.2.1'],
            MN22:  ['7.A.1.1','7.A.1.2','7.A.1.3'],
            TEKS:  ['7.4A','7.4B','7.4C','7.4D','7.4E']
        },
        'percent_7': {
            label: 'Percent Problems',
            CCSS:  ['7.RP.A.3'],
            MN07:  ['7.2.2.1','7.2.2.2'],
            MN22:  ['7.N.1.3'],
            TEKS:  ['7.4D']
        },
        'rational number_7': {
            label: 'Operations with Rational Numbers',
            CCSS:  ['7.NS.A.1','7.NS.A.2','7.NS.A.3'],
            MN07:  ['7.1.2.1','7.1.2.2','7.1.2.3'],
            MN22:  ['7.N.1.1','7.N.1.2','7.N.1.3'],
            TEKS:  ['7.3A','7.3B']
        },
        'equation_7': {
            label: 'Equations & Inequalities',
            CCSS:  ['7.EE.A.1','7.EE.B.3','7.EE.B.4'],
            MN07:  ['7.2.3.1','7.2.3.2'],
            MN22:  ['7.A.2.1','7.A.3.1','7.A.3.2','7.A.4.1'],
            TEKS:  ['7.10A','7.10B','7.11A','7.11B','7.11C']
        },
        'scale_7': {
            label: 'Scale Drawings & Similar Figures',
            CCSS:  ['7.G.A.1','7.RP.A.2'],
            MN07:  ['7.3.1.1','7.3.1.2'],
            MN22:  ['7.GM.1.1'],
            TEKS:  ['7.5A','7.5B','7.5C','7.9A']
        },
        'circle_7': {
            label: 'Circles & Circumference',
            CCSS:  ['7.G.B.4'],
            MN07:  ['7.3.2.1','7.3.2.2'],
            MN22:  ['7.GM.1.2'],
            TEKS:  ['7.5B','7.8C','7.9B']
        },
        'area_7': {
            label: 'Area, Surface Area & Volume',
            CCSS:  ['7.G.A.3','7.G.B.4','7.G.B.6'],
            MN07:  ['7.3.2.2','7.3.2.3'],
            MN22:  ['7.GM.2.1','7.GM.2.2'],
            TEKS:  ['7.8A','7.8B','7.9A','7.9C','7.9D']
        },
        'probability_7': {
            label: 'Probability',
            CCSS:  ['7.SP.C.5','7.SP.C.6','7.SP.C.7','7.SP.C.8'],
            MN07:  ['7.4.3.1','7.4.3.2'],
            MN22:  ['7.DP.2.1','7.DP.2.2','7.DP.2.3'],
            TEKS:  ['7.6A','7.6B','7.6C','7.6D','7.6E','7.6I']
        },
        'statistics_7': {
            label: 'Statistics & Sampling',
            CCSS:  ['7.SP.A.1','7.SP.A.2','7.SP.B.3','7.SP.B.4'],
            MN07:  ['7.4.1.1','7.4.2.1'],
            MN22:  ['7.DP.1.1','7.DP.1.2'],
            TEKS:  ['7.6F','7.6G','7.12A','7.12B','7.12C']
        },

        // ── Grade 8 ────────────────────────────────────────────────────────
        'linear_8': {
            label: 'Linear Equations & Slope',
            CCSS:  ['8.EE.B.5','8.EE.B.6','8.EE.C.7','8.F.A.3','8.F.B.4'],
            MN07:  ['8.2.1.1','8.2.1.2','8.2.3.1'],
            MN22:  ['8.A.1.1','8.A.1.2','8.A.1.3','8.A.2.1'],
            TEKS:  ['8.4A','8.4B','8.4C','8.5A','8.5B','8.5F','8.8A','8.8C']
        },
        'slope_8': {
            label: 'Slope & Rate of Change',
            CCSS:  ['8.EE.B.5','8.EE.B.6'],
            MN07:  ['8.2.1.1','8.2.2.1'],
            MN22:  ['8.A.1.1','8.A.1.2'],
            TEKS:  ['8.4A','8.4B','8.4C']
        },
        'function_8': {
            label: 'Functions',
            CCSS:  ['8.F.A.1','8.F.A.2','8.F.A.3','8.F.B.4','8.F.B.5'],
            MN07:  ['8.2.2.1','8.2.2.2'],
            MN22:  ['8.A.3.1','8.A.3.2','8.A.3.3'],
            TEKS:  ['8.5G','8.5H','8.5I']
        },
        'systems_8': {
            label: 'Systems of Equations',
            CCSS:  ['8.EE.C.8'],
            MN07:  ['8.2.3.2'],
            MN22:  ['8.A.2.2'],
            TEKS:  ['8.9A']
        },
        'pythagorean_8': {
            label: 'Pythagorean Theorem',
            CCSS:  ['8.G.B.7','8.G.B.8'],
            MN07:  ['8.3.1.1','8.3.1.2'],
            MN22:  ['8.GM.2.1','8.GM.2.2','8.GM.2.3'],
            TEKS:  ['8.6C','8.7A','8.7C','8.11A']
        },
        'transformation_8': {
            label: 'Transformations & Congruence',
            CCSS:  ['8.G.A.1','8.G.A.2','8.G.A.3','8.G.A.4'],
            MN07:  ['8.3.2.1','8.3.2.2'],
            MN22:  ['8.GM.1.1','8.GM.1.2','8.GM.1.3','8.GM.1.4'],
            TEKS:  ['8.10A','8.10B','8.10C','8.10D']
        },
        'irrational_8': {
            label: 'Real Numbers & Irrational Numbers',
            CCSS:  ['8.NS.A.1','8.NS.A.2'],
            MN07:  ['8.1.1.1','8.1.1.2'],
            MN22:  ['8.N.1.1','8.N.1.2'],
            TEKS:  ['8.2A','8.2B']
        },
        'scientific notation_8': {
            label: 'Scientific Notation',
            CCSS:  ['8.EE.A.3','8.EE.A.4'],
            MN07:  ['8.1.2.1'],
            MN22:  ['8.N.1.3'],
            TEKS:  ['8.2C']
        },
        'volume_8': {
            label: 'Volume — Cylinders, Cones & Spheres',
            CCSS:  ['8.G.C.9'],
            MN07:  ['8.3.3.1'],
            MN22:  ['8.GM.3.1'],
            TEKS:  ['8.6A','8.6B']
        },
        'scatter_8': {
            label: 'Scatter Plots & Bivariate Data',
            CCSS:  ['8.SP.A.1','8.SP.A.2','8.SP.A.3'],
            MN07:  ['8.4.1.1','8.4.1.2'],
            MN22:  ['8.DP.1.1','8.DP.1.2','8.DP.1.3'],
            TEKS:  ['8.5C','8.5D']
        },
    };

    // ════════════════════════════════════════════════════════════════════════
    //  FRAMEWORK DETECTION
    //  Identifies which standards framework a code belongs to.
    // ════════════════════════════════════════════════════════════════════════
    function detectFramework(code) {
        if (!code || typeof code !== 'string') return null;
        const c = code.trim();
        // MN-22: e.g. 6.N.1.1, 7.GM.2.3, K.DP.1.1
        if (/^([K\d]+)\.[A-Z]{1,2}\.\d+\.\d+$/.test(c)) return 'MN22';
        // MN-07: e.g. 6.1.2.1, 7.4.3.2  (all numeric segments)
        if (/^[K\d]+\.\d+\.\d+\.\d+$/.test(c)) return 'MN07';
        // CCSS: e.g. 7.RP.A.1, 6.NS.C.5, 8.G.B.7, K.CC.A.1
        if (/^[K\d]+\.[A-Z]{1,3}\.[A-Z]\.\d+[a-z]?$/.test(c)) return 'CCSS';
        // TEKS: e.g. 7.4A, 6.2B, 8.10D, K.2A, A.6A, G.5B
        if (/^([K\dA-Z][0-9]?)\.\d+[A-Z]$/.test(c) || /^[KA-Z]\.[0-9]+[A-Z]$/.test(c)) return 'TEKS';
        return null;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  LOOKUP BY CODE
    // ════════════════════════════════════════════════════════════════════════
    function getByCode(code) {
        if (!code) return null;
        return TEKS[code] || MN22[code] || null;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  CROSS-REFERENCE LOOKUP
    //  Given a standard code, returns the full cluster with all frameworks.
    // ════════════════════════════════════════════════════════════════════════
    function crossRef(code) {
        if (!code) return null;
        const fw = detectFramework(code);
        if (!fw) return null;
        for (const [key, cluster] of Object.entries(TOPIC_STANDARDS)) {
            if (cluster[fw] && cluster[fw].includes(code)) {
                return { key, ...cluster };
            }
        }
        return null;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  GET ALL STANDARDS FOR TOPICS + GRADE
    //  Returns { CCSS, MN07, MN22, TEKS } arrays for a detected topic list.
    // ════════════════════════════════════════════════════════════════════════
    function getAllForTopics(topics, grade) {
        const g = parseInt(grade) || 7;
        const result = { CCSS: [], MN07: [], MN22: [], TEKS: [], labels: [] };
        const seen = new Set();

        for (const topic of (topics || [])) {
            const low = topic.toLowerCase();
            // Try exact key match first
            const key = low + '_' + g;
            if (TOPIC_STANDARDS[key]) {
                const cluster = TOPIC_STANDARDS[key];
                if (!seen.has(key)) {
                    seen.add(key);
                    result.labels.push(cluster.label);
                    for (const fw of ['CCSS','MN07','MN22','TEKS']) {
                        for (const code of (cluster[fw] || [])) {
                            if (!result[fw].includes(code)) result[fw].push(code);
                        }
                    }
                }
                continue;
            }
            // Fuzzy: find keys that contain this topic word at this grade
            for (const [key2, cluster] of Object.entries(TOPIC_STANDARDS)) {
                if (!seen.has(key2) && key2.endsWith('_' + g) && key2.includes(low.split(' ')[0])) {
                    seen.add(key2);
                    result.labels.push(cluster.label);
                    for (const fw of ['CCSS','MN07','MN22','TEKS']) {
                        for (const code of (cluster[fw] || [])) {
                            if (!result[fw].includes(code)) result[fw].push(code);
                        }
                    }
                }
            }
        }
        return result;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  BUILD CROSS-REFERENCE HTML PANEL
    //  Renders a standards alignment card for the results UI.
    // ════════════════════════════════════════════════════════════════════════
    function buildCrossRefHTML(stdMap, grade) {
        if (!stdMap) return '';
        const { CCSS, MN07, MN22, TEKS, labels } = stdMap;
        if (!CCSS.length && !MN07.length && !MN22.length && !TEKS.length) return '';

        const gradeLabel = grade ? 'Grade ' + grade + ' — ' : '';
        const topicLabel = (labels && labels.length > 0)
            ? labels.slice(0, 2).join(' · ')
            : 'Standards Alignment';

        const rows = [
            { fw: 'CCSS-M',   color: '#3B82F6', codes: CCSS  },
            { fw: 'MN 2007',  color: '#0D9488', codes: MN07  },
            { fw: 'MN 2022',  color: '#D4870F', codes: MN22  },
            { fw: 'TEKS (TX)',color: '#E8436D', codes: TEKS  },
        ].filter(r => r.codes && r.codes.length > 0);

        if (!rows.length) return '';

        const rowsHTML = rows.map(r => {
            const chips = r.codes.slice(0, 8).map(code => {
                const std = getByCode(code);
                const tip = std ? std.desc.slice(0, 80) + (std.desc.length > 80 ? '…' : '') : '';
                return `<span class="std-chip" title="${tip}" style="background:${r.color}18;border:1px solid ${r.color}40;color:${r.color === '#3B82F6' ? '#1E40AF' : r.color === '#0D9488' ? '#065F46' : r.color === '#D4870F' ? '#92400E' : '#9F1239'};font-size:0.7rem;font-weight:700;padding:2px 7px;border-radius:10px;cursor:default;">${code}</span>`;
            }).join(' ');
            return `<tr><td style="padding:4px 10px 4px 0;font-size:0.72rem;font-weight:700;color:${r.color};white-space:nowrap;vertical-align:top;">${r.fw}</td><td style="padding:4px 0;line-height:1.8;">${chips}</td></tr>`;
        }).join('');

        return `
        <div class="standards-crossref-panel" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px 16px;margin-top:12px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <span style="font-size:1rem;">📐</span>
                <span style="font-size:0.8rem;font-weight:700;color:#1E2761;text-transform:uppercase;letter-spacing:0.5px;">${gradeLabel}Standards Alignment</span>
                <span style="font-size:0.72rem;color:#64748B;font-style:italic;">${topicLabel}</span>
            </div>
            <table style="border-collapse:collapse;width:100%;">${rowsHTML}</table>
        </div>`;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════════════════════════════
    return {
        TEKS,
        MN22,
        TOPIC_STANDARDS,
        detectFramework,
        getByCode,
        crossRef,
        getAllForTopics,
        buildCrossRefHTML,

        /** Shortcut: get just TEKS codes for topics+grade */
        getTEKS(topics, grade) { return getAllForTopics(topics, grade).TEKS; },
        /** Shortcut: get just MN22 codes for topics+grade */
        getMN22(topics, grade) { return getAllForTopics(topics, grade).MN22; },
        /** List all topic keys for a grade */
        topicsForGrade(grade) {
            const g = parseInt(grade) || 7;
            return Object.keys(TOPIC_STANDARDS).filter(k => k.endsWith('_' + g));
        }
    };

})();
