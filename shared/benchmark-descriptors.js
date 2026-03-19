/**
 * benchmark-descriptors.js — K-8 Performance Level Descriptors
 * Lesson Digester | Drummond Math Solutions
 * v1.0 — March 2026
 *
 * Provides 4-level benchmark descriptors for every TOPIC_STANDARDS cluster
 * in standards-db.js, keyed identically (e.g. "counting_K", "proportion_7").
 *
 * Levels follow the Drummond proficiency scale:
 *   4  Advanced   — Applies concepts in novel contexts, justifies reasoning
 *   3  Proficient  — Solves grade-level problems, explains strategies
 *   2  Developing  — Solves familiar problem types with some support
 *   1  Beginning   — Identifies basic ideas; needs significant scaffolding
 *
 * Public API:
 *   BenchmarkDescriptors.get(clusterKey)   → descriptor object or null
 *   BenchmarkDescriptors.forGrade(grade)   → array of descriptor objects
 *   BenchmarkDescriptors.buildHTML(key)     → styled HTML card
 *   BenchmarkDescriptors.ALL               → full data map
 */

const BenchmarkDescriptors = (() => {

    const LEVELS = ['advanced','proficient','developing','beginning'];
    const LEVEL_META = {
        advanced:   { label:'Advanced',   color:'#7C3AED', bg:'#F5F3FF', score:'4' },
        proficient: { label:'Proficient', color:'#0D9488', bg:'#F0FDFA', score:'3' },
        developing: { label:'Developing', color:'#D4870F', bg:'#FFFBEB', score:'2' },
        beginning:  { label:'Beginning',  color:'#E8436D', bg:'#FFF1F2', score:'1' }
    };

    // ════════════════════════════════════════════════════════════════════════
    //  KINDERGARTEN
    // ════════════════════════════════════════════════════════════════════════
    const ALL = {

    'counting_K': {
        grade:'K', label:'Counting & Cardinality',
        dok: 1,
        vocabulary: ['count','number','more','fewer','equal','how many','compare'],
        misconceptions: ['Reciting numbers is not the same as understanding quantity','Skipping objects or double-counting during one-to-one correspondence'],
        advanced:   'Counts to 100 by 1s and 10s with accuracy. Compares and orders sets using precise language ("more than," "fewer than," "equal to"). Counts on from any given number and uses counting to solve simple joining/separating situations without prompting.',
        proficient: 'Counts to at least 20 objects with reliable one-to-one correspondence. Reads and writes numerals 0–20. Understands that the last number counted tells "how many" (cardinality). Compares two groups of up to 10 objects.',
        developing: 'Counts to 10 with occasional errors. Recognizes some numerals and can match small quantities to numbers with support. Inconsistently applies one-to-one correspondence; may skip or double-count.',
        beginning:  'Rote counts to 5 with errors. Does not yet reliably connect counting words to objects. Needs physical manipulation and adult support to count small groups (1–5).'
    },
    'operations_K': {
        grade:'K', label:'Early Addition & Subtraction',
        dok: 1,
        vocabulary: ['add','subtract','join','take away','put together','sum','difference'],
        misconceptions: ['Addition always makes bigger (not true with 0)','Subtraction means "take away" only (missing comparison model)'],
        advanced:   'Fluently adds and subtracts within 10 using mental strategies. Represents and solves simple word problems (result unknown, change unknown) using drawings, equations, or objects. Decomposes numbers to 10 in multiple ways.',
        proficient: 'Solves addition and subtraction problems within 10 using objects, fingers, or drawings. Models joining and separating situations. Composes and decomposes numbers to 10 using concrete materials.',
        developing: 'Adds and subtracts within 5 with concrete support. Understands "put together" and "take away" concepts but needs manipulatives. May not yet connect actions to number sentences.',
        beginning:  'Recognizes that groups can be combined or separated but cannot reliably find sums or differences, even within 5, without significant adult guidance.'
    },
    'geometry_K': {
        grade:'K', label:'Shapes & Spatial Sense',
        dok: 1,
        vocabulary: ['circle','triangle','rectangle','square','cube','cone','sphere','cylinder','side','corner'],
        misconceptions: ['A rotated triangle is "not a triangle"','Squares are not rectangles'],
        advanced:   'Names and describes 2-D and 3-D shapes regardless of orientation or size. Composes new shapes from existing shapes. Describes relative positions using spatial language (above, below, beside, in front of).',
        proficient: 'Identifies and names circles, triangles, rectangles, squares, and common 3-D shapes (cube, sphere, cone, cylinder). Sorts shapes by number of sides or corners. Describes basic attributes.',
        developing: 'Identifies circles and squares reliably; inconsistent with triangles and rectangles. Recognizes some 3-D shapes but confuses names. Sorts with guidance.',
        beginning:  'Recognizes circles and squares in standard orientation only. Cannot consistently name other shapes. Needs physical models and significant support.'
    },
    'measurement_K': {
        grade:'K', label:'Measurement & Comparison',
        dok: 1,
        vocabulary: ['long','short','heavy','light','tall','big','small','compare','measure'],
        misconceptions: ['Confusing length with area','Assuming the taller container holds more'],
        advanced:   'Compares and orders three or more objects by a measurable attribute (length, weight, capacity). Uses non-standard units to measure and describes results with numbers. Classifies objects by multiple attributes simultaneously.',
        proficient: 'Directly compares two objects using measurable attributes (longer/shorter, heavier/lighter). Describes differences using comparative language. Sorts objects into given categories and counts the number in each.',
        developing: 'Compares two objects by length or size when placed side by side with support. Uses some comparative language but may confuse terms. Beginning to sort objects into categories.',
        beginning:  'Notices obvious size differences ("big" vs. "small") but cannot reliably compare objects by a specific attribute. Needs direct prompting and modeling to sort.'
    },
    'data_K': {
        grade:'K', label:'Sorting, Classifying & Data',
        dok: 1,
        vocabulary: ['sort','group','category','same','different','count','graph'],
        misconceptions: ['Data is only numbers (not realizing sorting objects is data)','Changing sort rule mid-task'],
        advanced:   'Collects, organizes, and represents data in simple graphs (pictographs, object graphs). Answers "how many" and "how many more/fewer" questions about the data. Proposes own categories for sorting.',
        proficient: 'Sorts and classifies objects into 2–3 given categories. Counts objects in each category. Answers simple questions about organized data ("Which group has more?").',
        developing: 'Sorts objects into two categories with support. Can count objects in one category but struggles to compare categories. Needs prompts to describe the data.',
        beginning:  'Recognizes that objects can be grouped but cannot independently sort by a given attribute. Needs direct modeling to participate in data collection activities.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 1
    // ════════════════════════════════════════════════════════════════════════
    'place_value_1': {
        grade:1, label:'Place Value (Tens & Ones)',
        dok: 2,
        vocabulary: ['tens','ones','place value','digit','compose','decompose','expanded form','compare'],
        misconceptions: ['Treating each digit independently (42 = 4 and 2, not 40 and 2)','Not understanding that 10 ones = 1 ten'],
        advanced:   'Counts, reads, and writes numbers to 120. Understands that the two digits of a two-digit number represent amounts of tens and ones. Uses place value understanding to compare and order numbers using >, <, =. Adds and subtracts multiples of 10 mentally.',
        proficient: 'Represents numbers to 120 using objects, drawings, and expanded/standard form. Identifies the tens and ones in a two-digit number. Compares two two-digit numbers using place value.',
        developing: 'Counts to 100 with some errors beyond 50. Identifies tens and ones with concrete models (base-ten blocks) but struggles with symbolic representation. Compares numbers with support.',
        beginning:  'Counts to 40–50 with errors. Does not yet reliably distinguish tens from ones. Needs base-ten blocks and significant scaffolding to represent two-digit numbers.'
    },
    'addition_subtraction_1': {
        grade:1, label:'Addition & Subtraction within 20',
        dok: 2,
        vocabulary: ['add','subtract','sum','difference','fact family','doubles','make ten','equation','equal sign'],
        misconceptions: ['Equal sign means "the answer comes next"','Subtraction is only "take away" (not comparison or missing addend)'],
        advanced:   'Adds and subtracts within 20 using mental strategies (doubles, near doubles, make 10, count on). Solves all problem types (result unknown, change unknown, start unknown). Writes and explains equations using the equal sign correctly.',
        proficient: 'Adds and subtracts within 20 using objects, drawings, or strategies (counting on, making 10). Solves one-step word problems for result-unknown and change-unknown types. Understands the meaning of the equal sign.',
        developing: 'Adds and subtracts within 10 reliably; struggles with teen numbers. Uses counting-all strategy (not yet counting on). Solves result-unknown word problems with manipulatives.',
        beginning:  'Adds within 5 using fingers or objects with some accuracy. Cannot yet subtract reliably. Needs direct modeling to connect word problems to operations.'
    },
    'geometry_1': {
        grade:1, label:'Geometry & Spatial Reasoning',
        dok: 2,
        vocabulary: ['attribute','sides','vertices','corners','2-D','3-D','compose','partition','halves','fourths','quarters'],
        misconceptions: ['Shapes must be in standard orientation to be identified','Halves must look identical (ignoring equivalent area with different shapes)'],
        advanced:   'Distinguishes defining vs. non-defining attributes of shapes. Composes and decomposes 2-D and 3-D shapes to create new shapes. Partitions circles and rectangles into halves and fourths, names the parts, and understands the whole is two or four of the parts.',
        proficient: 'Identifies and describes 2-D shapes by their attributes (number of sides, corners). Builds and draws shapes with specified attributes. Partitions circles and rectangles into two or four equal shares and describes them as halves/fourths.',
        developing: 'Names common 2-D shapes. Identifies the number of sides or corners with support. Partitions shapes into halves when shown a model but struggles with fourths.',
        beginning:  'Recognizes basic shapes (circle, square) but cannot describe their attributes. Cannot yet partition shapes into equal parts without direct modeling.'
    },
    'measurement_1': {
        grade:1, label:'Measurement, Time & Data',
        dok: 2,
        vocabulary: ['length','unit','measure','longer','shorter','hour','half hour','tally','bar graph','data'],
        misconceptions: ['Gaps or overlaps when iterating units invalidate measurement','Clock hands are interchangeable (hour vs. minute)'],
        advanced:   'Measures lengths using same-size units without gaps or overlaps and expresses the measurement as a number. Orders three or more objects by length. Tells time to the hour and half hour on analog and digital clocks. Organizes, represents, and interprets data with up to three categories.',
        proficient: 'Measures length by laying multiple copies of a shorter object end to end. Compares the lengths of two objects using a third object. Tells time to the hour and half-hour. Collects and organizes data into categories and reads simple graphs.',
        developing: 'Compares two objects directly (longer/shorter). Uses non-standard units with some gaps/overlaps. Tells time to the hour on a digital clock. Participates in data collection but needs help reading graphs.',
        beginning:  'Uses vague language for length comparison. Cannot yet iterate measurement units. Does not reliably read an analog clock. Needs significant support with data activities.'
    },
    'data_1': {
        grade:1, label:'Data & Graphs',
        dok: 1,
        vocabulary: ['tally','chart','table','picture graph','bar graph','more','fewer','how many'],
        misconceptions: ['The height of a bar tells "which is better" rather than "how many"','Tallies must be in groups of 5 only'],
        advanced:   'Collects data, creates tally charts and picture/bar-type graphs independently. Answers comparison questions (how many more, how many fewer) using the data. Generates original questions from a data display.',
        proficient: 'Collects, sorts, and organizes data into up to three categories. Reads tally charts and picture/bar-type graphs to answer simple questions. Draws conclusions from data displays.',
        developing: 'Sorts data into given categories and counts with support. Reads individual values from a picture graph but struggles with comparison questions.',
        beginning:  'Participates in data sorting with direct guidance. Cannot yet independently read or interpret simple graphs.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 2
    // ════════════════════════════════════════════════════════════════════════
    'place_value_2': {
        grade:2, label:'Place Value to 1,000',
        dok: 2,
        vocabulary: ['hundreds','tens','ones','expanded form','standard form','word form','compare','skip count'],
        misconceptions: ['Writing 200504 instead of 254 (expanded form confusion)','Skip counting always starts at 0'],
        advanced:   'Reads, writes, and represents numbers to 1,200 using expanded, standard, and word forms. Flexibly skip counts by 2s, 5s, 10s, and 100s from any starting number. Compares and orders three-digit numbers using place value reasoning and symbols (>, <, =).',
        proficient: 'Reads and writes numbers to 1,000 in multiple forms. Understands that the three digits of a three-digit number represent amounts of hundreds, tens, and ones. Compares two three-digit numbers using >, <, =.',
        developing: 'Reads and writes numbers to 400–500. Identifies hundreds, tens, and ones with base-ten blocks. Compares numbers when hundreds digit differs but struggles when hundreds are the same.',
        beginning:  'Reads and writes numbers to 100. Identifies tens and ones but not hundreds. Needs concrete models to compare or represent numbers beyond 100.'
    },
    'operations_2': {
        grade:2, label:'Addition & Subtraction within 1,000',
        dok: 2,
        vocabulary: ['regroup','borrow','carry','algorithm','mental math','estimate','equation','sum','difference'],
        misconceptions: ['Always subtract smaller from larger digit regardless of position','Regrouping means the problem is wrong'],
        advanced:   'Adds and subtracts within 1,000 using strategies based on place value, properties of operations, and the relationship between addition and subtraction. Solves multi-step word problems. Fluently adds and subtracts within 100 mentally.',
        proficient: 'Fluently adds and subtracts within 20 using mental strategies. Adds and subtracts within 100 using place-value strategies. Adds up to four two-digit numbers. Solves one- and two-step word problems using addition and subtraction.',
        developing: 'Adds and subtracts within 100 using concrete models or drawings. Solves one-step word problems with some support. Still developing fluency within 20.',
        beginning:  'Adds and subtracts within 20 using counting strategies (not yet fluent). Needs manipulatives for problems beyond 20. Struggles to interpret word problems independently.'
    },
    'geometry_2': {
        grade:2, label:'Geometry & Fractions Introduction',
        dok: 2,
        vocabulary: ['face','edge','vertex','angle','partition','halves','thirds','fourths','equal shares'],
        misconceptions: ['A shape cut into 3 pieces is always thirds (even if unequal)','Rectangles and rectangular prisms are the same thing'],
        advanced:   'Identifies and draws shapes with specified attributes (number of faces, edges, angles). Partitions rectangles into rows and columns of same-size squares and counts to find the total. Describes shares using the language of halves, thirds, and fourths, recognizing that equal shares of identical wholes need not have the same shape.',
        proficient: 'Recognizes and classifies 2-D and 3-D shapes by their attributes. Partitions circles and rectangles into two, three, or four equal shares. Uses fraction language (halves, thirds, fourths) to describe the shares.',
        developing: 'Identifies basic 2-D and 3-D shapes. Partitions shapes into halves but struggles with thirds. Uses fraction language with support.',
        beginning:  'Names common shapes but cannot describe their attributes. Cannot yet partition shapes into equal parts independently.'
    },
    'measurement_2': {
        grade:2, label:'Measurement & Data',
        dok: 2,
        vocabulary: ['inch','foot','centimeter','meter','length','estimate','line plot','picture graph','bar graph'],
        misconceptions: ['Not starting at 0 on a ruler','Longer units mean larger numbers (confusing unit size with count)'],
        advanced:   'Measures objects using standard units (inches, feet, centimeters, meters) and selects appropriate tools. Estimates lengths before measuring. Represents data on line plots, picture graphs, and bar graphs, then solves comparison problems using the data.',
        proficient: 'Measures the length of objects using rulers and standard units. Compares lengths of two objects and expresses the difference. Generates and reads data from line plots and bar graphs.',
        developing: 'Measures length with a ruler with some alignment errors. Reads values from simple graphs but struggles with comparison questions. Needs prompts to estimate before measuring.',
        beginning:  'Attempts to measure with a ruler but makes significant alignment errors. Can read individual values from a picture graph with support but cannot compare or draw conclusions.'
    },
    'data_2': {
        grade:2, label:'Data Analysis & Graphs',
        dok: 2,
        vocabulary: ['data','line plot','bar graph','picture graph','scale','category','survey','most','least'],
        misconceptions: ['Each picture in a pictograph always represents exactly 1','The tallest bar is always "the best"'],
        advanced:   'Designs simple surveys, collects data, and creates appropriate displays (line plots, bar graphs). Interprets data to answer "how many more" and "how many less" questions. Draws conclusions and makes predictions.',
        proficient: 'Creates and reads line plots, picture graphs, and bar graphs. Answers questions requiring addition and subtraction of data values. Organizes data into categories and represents it accurately.',
        developing: 'Reads values from graphs with support. Creates simple picture graphs with guidance. Answers "how many" but struggles with comparison questions.',
        beginning:  'Identifies what a graph shows (topic) but cannot reliably extract specific values. Needs direct support to create any data display.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 3
    // ════════════════════════════════════════════════════════════════════════
    'fraction_3': {
        grade:3, label:'Fractions',
        dok: 2,
        vocabulary: ['fraction','numerator','denominator','unit fraction','equivalent','whole','number line','compare','equal parts'],
        misconceptions: ['Larger denominators mean larger fractions','Fractions are always less than 1','The numerator and denominator are separate whole numbers'],
        advanced:   'Represents fractions on number lines and with area models. Generates simple equivalent fractions (e.g., 1/2 = 2/4) and explains why they are equivalent. Compares fractions with the same numerator or same denominator using reasoning about size. Expresses whole numbers as fractions and fractions equal to whole numbers.',
        proficient: 'Understands a fraction 1/b as one part when a whole is partitioned into b equal parts. Represents fractions with denominators 2, 3, 4, 6, and 8 using models and number lines. Compares two fractions with the same denominator or same numerator.',
        developing: 'Identifies fractions of a whole using shaded region models (halves, fourths). Places fractions on a number line with support. Compares fractions with same denominator when using visual models.',
        beginning:  'Recognizes that a fraction represents part of a whole but cannot yet identify specific fractions reliably. Confuses numerator and denominator. Needs physical models to visualize any fraction.'
    },
    'multiplication_3': {
        grade:3, label:'Multiplication & Division',
        dok: 2,
        vocabulary: ['multiply','divide','factor','product','quotient','array','equal groups','commutative','distributive','fluency'],
        misconceptions: ['Multiplication always makes bigger','Division always makes smaller','Multiplication is just repeated addition (fails with fractions later)'],
        advanced:   'Fluently multiplies and divides within 100. Solves two-step word problems using all four operations. Applies properties of multiplication (commutative, associative, distributive) to solve problems and justify strategies. Identifies arithmetic patterns and explains them using properties of operations.',
        proficient: 'Uses strategies to multiply and divide within 100 (arrays, equal groups, skip counting, known facts). Solves one-step word problems involving multiplication and division. Understands the relationship between multiplication and division.',
        developing: 'Multiplies within 50 using arrays or repeated addition. Solves multiplication word problems with concrete support. Recalls some basic facts (×2, ×5, ×10) but not yet fluent.',
        beginning:  'Understands multiplication as equal groups when modeled. Counts by 2s and 5s. Cannot yet solve multiplication problems without concrete materials or direct guidance.'
    },
    'area_perimeter_3': {
        grade:3, label:'Area & Perimeter',
        dok: 2,
        vocabulary: ['area','perimeter','square unit','tile','formula','length','width','side'],
        misconceptions: ['Larger perimeter means larger area','Area and perimeter change together (if one increases, so does the other)'],
        advanced:   'Finds area by multiplying side lengths and by tiling, connecting both methods. Solves real-world problems involving area and perimeter. Recognizes that rectangles with the same area can have different perimeters, and vice versa. Decomposes rectilinear figures to find area.',
        proficient: 'Measures area by counting unit squares. Finds the area of a rectangle by multiplying side lengths. Finds the perimeter of a polygon by adding side lengths. Solves problems involving perimeter when one side is missing.',
        developing: 'Counts unit squares to find area with some errors (miscounting corners). Finds perimeter by adding all labeled sides. Confuses area and perimeter when both are asked in the same problem.',
        beginning:  'Understands area as "covering" and perimeter as "around" but cannot independently calculate either. Needs grid overlays and labeled diagrams to attempt measurement.'
    },
    'geometry_3': {
        grade:3, label:'Geometry & Shape Attributes',
        dok: 2,
        vocabulary: ['quadrilateral','rhombus','polygon','attribute','category','partition','equal areas','fraction of shape'],
        misconceptions: ['A shape can only belong to one category','All four-sided shapes are rectangles'],
        advanced:   'Classifies shapes by multiple attributes simultaneously and recognizes that shared attributes can define larger categories (e.g., quadrilaterals include rectangles, rhombuses, squares). Draws shapes that satisfy given conditions. Partitions shapes into parts with equal areas and expresses area of each part as a unit fraction.',
        proficient: 'Recognizes that shapes in different categories may share attributes. Classifies quadrilaterals by properties (sides, angles). Partitions shapes into parts with equal areas.',
        developing: 'Sorts shapes by one attribute at a time. Identifies quadrilaterals but struggles to subcategorize them. Partitions shapes into equal parts with visual support.',
        beginning:  'Names common shapes but cannot describe defining attributes. Sorting is inconsistent. Needs models to understand equal partitioning.'
    },
    'data_3': {
        grade:3, label:'Data, Graphs & Measurement',
        dok: 2,
        vocabulary: ['scaled bar graph','scaled picture graph','line plot','fraction','measure','nearest half','quarter inch'],
        misconceptions: ['Each symbol on a pictograph always represents 1','Line plot dots must be evenly spaced'],
        advanced:   'Creates scaled bar graphs and pictographs where each symbol represents multiple items. Generates measurement data by measuring to the nearest 1/4 inch and displays results on line plots. Solves multi-step "how many more" and "how many fewer" problems using graph data.',
        proficient: 'Draws and reads scaled picture graphs and bar graphs. Solves one- and two-step comparison problems using bar graph data. Measures objects to the nearest half inch and records data on a line plot.',
        developing: 'Reads scaled graphs with guidance on the scale. Measures to the nearest inch. Creates bar graphs with 1:1 scale. Answers simple questions from data displays.',
        beginning:  'Reads unscaled bar graphs for individual values. Cannot yet create graphs independently. Measures with a ruler but has difficulty with precision beyond whole inches.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 4
    // ════════════════════════════════════════════════════════════════════════
    'fraction_4': {
        grade:4, label:'Fractions & Equivalence',
        dok: 2,
        vocabulary: ['equivalent fraction','simplify','benchmark fraction','mixed number','improper fraction','common denominator','numerator','denominator'],
        misconceptions: ['Multiplying numerator and denominator changes the value','1/3 + 1/3 = 2/6','You can compare fractions by comparing numerators alone'],
        advanced:   'Generates equivalent fractions using multiplication and division and explains why. Compares fractions with unlike denominators using benchmark fractions (0, 1/2, 1) and common denominators. Adds and subtracts fractions and mixed numbers with like denominators, including in word problems. Decomposes a fraction into a sum of fractions in more than one way.',
        proficient: 'Recognizes and generates equivalent fractions using visual models and multiplication. Compares two fractions with different numerators and different denominators using visual models or common denominators. Adds and subtracts fractions with the same denominator.',
        developing: 'Identifies equivalent fractions when shown visual models. Compares fractions with the same denominator. Adds fractions with like denominators using models but struggles with symbolic computation.',
        beginning:  'Recognizes simple equivalent fractions (1/2 = 2/4) with visual support. Cannot yet compare fractions with unlike denominators. Needs fraction strips or circles to perform any operations.'
    },
    'multiplication_division_4': {
        grade:4, label:'Multi-Digit Multiplication & Division',
        dok: 2,
        vocabulary: ['product','quotient','remainder','algorithm','partial products','area model','factor','multiple','estimate','reasonable'],
        misconceptions: ['Forgetting to add partial products','Remainders larger than the divisor are acceptable','Multiplying by 10 just "adds a zero"'],
        advanced:   'Multiplies up to 4-digit × 1-digit and 2-digit × 2-digit using the standard algorithm and area models. Divides with up to 4-digit dividends and 1-digit divisors, interpreting remainders in context. Solves multi-step word problems and assesses reasonableness using estimation.',
        proficient: 'Multiplies a 4-digit number by a 1-digit number using strategies including the standard algorithm. Finds whole-number quotients and remainders with up to 4-digit dividends. Solves word problems involving multiplication and division, including interpreting remainders.',
        developing: 'Multiplies 2-digit × 1-digit with accuracy; 3- and 4-digit multiplication contains errors. Divides with 2-digit dividends and 1-digit divisors. Solves one-step word problems with support.',
        beginning:  'Multiplies 1-digit × 1-digit fluently but struggles with multi-digit multiplication. Uses repeated subtraction for division with small numbers. Needs direct instruction on algorithms.'
    },
    'decimal_4': {
        grade:4, label:'Decimals & Place Value',
        dok: 2,
        vocabulary: ['decimal','tenths','hundredths','decimal point','fraction','equivalent','notation','compare'],
        misconceptions: ['Longer decimals are larger (0.25 > 0.3)','Decimals and fractions are unrelated systems','The decimal point separates two whole numbers'],
        advanced:   'Converts fluently between fractions with denominators of 10 or 100 and their decimal equivalents. Compares and orders decimals to hundredths using number lines, place value, and benchmark fractions. Adds fractions with denominators of 10 and 100 using decimal understanding.',
        proficient: 'Expresses fractions with denominator 10 as equivalent fractions with denominator 100 and writes as decimals. Uses decimal notation for fractions with denominators 10 or 100. Compares two decimals to hundredths using visual models or place value.',
        developing: 'Reads and writes decimals to tenths. Identifies the decimal equivalent of 1/10 and 1/100 with models. Compares decimals to tenths but struggles with hundredths.',
        beginning:  'Recognizes that a decimal point separates wholes from parts but cannot reliably read or write decimals. Needs fraction models to see the connection between fractions and decimals.'
    },
    'measurement_4': {
        grade:4, label:'Measurement & Unit Conversion',
        dok: 2,
        vocabulary: ['convert','unit','customary','metric','inch','foot','yard','mile','gram','kilogram','liter','milliliter','elapsed time','interval'],
        misconceptions: ['Multiplying when should divide for unit conversion','Metric and customary use the same conversion factors','Larger units = more of them'],
        advanced:   'Converts between units within the same measurement system using multi-step reasoning (e.g., 3 ft 7 in = 43 in). Solves word problems involving distance, time, liquid volume, mass, and money including simple fractions or decimals. Makes a line plot of measurements to fractions of a unit (1/2, 1/4, 1/8).',
        proficient: 'Knows relative sizes of measurement units within one system (e.g., 1 ft = 12 in, 1 kg = 1,000 g). Uses the four operations to solve measurement word problems involving simple fractions or decimals. Converts larger units to smaller units within the same system.',
        developing: 'Identifies common unit equivalences with a reference chart. Solves one-step measurement problems. Converts units when given the conversion factor but struggles to recall relationships independently.',
        beginning:  'Recognizes measurement units but does not reliably know equivalences. Needs a conversion chart and step-by-step guidance to solve measurement problems.'
    },
    'geometry_4': {
        grade:4, label:'Geometry, Angles & Symmetry',
        dok: 2,
        vocabulary: ['angle','degree','right angle','acute','obtuse','straight','protractor','perpendicular','parallel','line of symmetry','ray','point','line','line segment'],
        misconceptions: ['Angle size depends on the length of the rays','Perpendicular lines must be vertical and horizontal','A shape has symmetry if you can "fold it"'],
        advanced:   'Measures and draws angles using a protractor with accuracy. Solves addition and subtraction problems to find unknown angles on a diagram. Identifies and draws lines of symmetry for a variety of figures. Classifies 2-D figures based on parallel or perpendicular sides, and angle types.',
        proficient: 'Recognizes angles as geometric shapes and measures them in whole-number degrees. Understands angle measurement as additive. Identifies and draws lines of symmetry. Classifies triangles by angle type and quadrilaterals by presence of parallel/perpendicular sides.',
        developing: 'Uses a protractor with some errors. Identifies right, acute, and obtuse angles. Recognizes lines of symmetry in simple shapes. Classifies some figures by properties with support.',
        beginning:  'Recognizes right angles but confuses acute and obtuse. Cannot yet use a protractor independently. Identifies symmetry in simple cases (butterfly, heart) but not in geometric figures.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 5
    // ════════════════════════════════════════════════════════════════════════
    'fraction_5': {
        grade:5, label:'Fractions — All Operations',
        dok: 2,
        vocabulary: ['common denominator','equivalent fraction','mixed number','improper fraction','reciprocal','product','quotient','estimate','benchmark'],
        misconceptions: ['Multiplying fractions always gives a bigger number','You need a common denominator to multiply fractions','Dividing by a fraction makes smaller'],
        advanced:   'Adds, subtracts, multiplies, and divides fractions and mixed numbers fluently. Solves multi-step word problems involving fractions. Uses benchmark fractions and estimation to check reasonableness. Explains why multiplication by a fraction less than 1 results in a product less than the other factor.',
        proficient: 'Adds and subtracts fractions with unlike denominators by finding common denominators. Multiplies fractions and mixed numbers. Divides unit fractions by whole numbers and whole numbers by unit fractions. Solves word problems involving fraction operations.',
        developing: 'Adds and subtracts fractions with like denominators fluently; struggles with unlike denominators. Multiplies a fraction by a whole number. Divides with fractions using visual models with support.',
        beginning:  'Adds fractions with like denominators. Identifies common denominators with a reference tool. Cannot yet multiply or divide fractions independently.'
    },
    'decimal_5': {
        grade:5, label:'Decimals — Operations & Place Value',
        dok: 2,
        vocabulary: ['thousandths','hundredths','tenths','place value','expanded notation','powers of ten','multiply','divide','decimal','estimate'],
        misconceptions: ['Multiplying decimals by 10 just moves the decimal one place (without understanding why)','Adding decimals without aligning decimal points','0.5 × 0.5 = 2.5'],
        advanced:   'Multiplies and divides decimals to hundredths fluently. Uses patterns in powers of 10 to explain the placement of the decimal point. Reads, writes, and compares decimals to thousandths in multiple forms. Solves real-world decimal problems and estimates to check reasonableness.',
        proficient: 'Reads and writes decimals to thousandths using expanded notation. Compares and orders decimals to thousandths using place value. Performs all four operations with decimals to hundredths using concrete models or strategies.',
        developing: 'Reads and compares decimals to hundredths. Adds and subtracts decimals by lining up place values. Multiplies a decimal by a whole number with support. Division of decimals is emerging.',
        beginning:  'Reads and writes decimals to tenths. Adds decimals with tenths only. Struggles with hundredths and thousandths. Needs base-ten models or grids to perform any decimal operations.'
    },
    'volume_5': {
        grade:5, label:'Volume',
        dok: 2,
        vocabulary: ['volume','cubic unit','rectangular prism','length','width','height','formula','V = l × w × h','V = B × h','decompose'],
        misconceptions: ['Volume and area are the same concept (just 3-D)','Counting visible faces instead of cubic units','Forgetting to use cubic units'],
        advanced:   'Finds the volume of rectangular prisms by packing with unit cubes and by applying V = l×w×h and V = B×h. Finds volumes of composite solid figures by decomposing into non-overlapping rectangular prisms. Connects volume to multiplication and addition in multi-step problems.',
        proficient: 'Recognizes volume as an attribute of solid figures measured in cubic units. Measures volume by counting unit cubes. Finds the volume of a right rectangular prism using the formulas V = l×w×h and V = B×h.',
        developing: 'Counts unit cubes to find volume of simple rectangular prisms. Uses V = l×w×h with whole-number dimensions when prompted. Struggles with composite figures.',
        beginning:  'Understands volume means "how much space inside" but cannot reliably count unit cubes or apply formulas. Confuses area and volume.'
    },
    'coordinate_5': {
        grade:5, label:'Coordinate Plane',
        dok: 2,
        vocabulary: ['coordinate plane','x-axis','y-axis','origin','ordered pair','quadrant','plot','graph'],
        misconceptions: ['Reversing x and y in an ordered pair','The origin is at the corner, not (0,0)','Points on the axis are not in the plane'],
        advanced:   'Graphs and interprets ordered pairs in the first quadrant to solve real-world and mathematical problems. Identifies patterns in coordinate data and explains relationships between corresponding terms of two numerical patterns. Generates ordered pairs from two rules and graphs them.',
        proficient: 'Identifies the x-axis, y-axis, and origin. Graphs ordered pairs in the first quadrant. Interprets coordinate values in the context of a problem. Represents real-world situations by graphing in the first quadrant.',
        developing: 'Plots points in the first quadrant when given ordered pairs. Reads coordinates from a graph with support. Sometimes reverses x and y coordinates.',
        beginning:  'Identifies axes and origin when labeled. Cannot yet independently plot or read ordered pairs from a coordinate plane.'
    },
    'algebraic_thinking_5': {
        grade:5, label:'Algebraic Thinking & Patterns',
        dok: 2,
        vocabulary: ['expression','evaluate','variable','parentheses','brackets','braces','order of operations','pattern','rule','sequence'],
        misconceptions: ['Parentheses are decorative','Multiply before divide always (instead of left to right)','A variable is always x'],
        advanced:   'Writes, interprets, and evaluates numerical expressions with parentheses, brackets, and braces following order of operations. Generates two numerical patterns using two given rules, forms ordered pairs, and graphs them on a coordinate plane. Explains the relationship between corresponding terms.',
        proficient: 'Writes and interprets simple expressions without evaluating them (e.g., "add 8 and 7, then multiply by 2" as 2 × (8 + 7)). Evaluates expressions with parentheses. Generates and analyzes numerical patterns.',
        developing: 'Evaluates expressions with one set of parentheses. Identifies and extends simple numerical patterns. Writes expressions for basic situations with support.',
        beginning:  'Follows order of operations for expressions without grouping symbols. Identifies repeating patterns. Needs direct instruction to write or evaluate expressions with parentheses.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 6  (existing clusters from standards-db.js)
    // ════════════════════════════════════════════════════════════════════════
    'integer_6': {
        grade:6, label:'Integers & Rational Numbers',
        dok: 2,
        vocabulary: ['integer','positive','negative','absolute value','opposite','rational number','number line','inequality'],
        misconceptions: ['Negative numbers work like positive numbers in operations','Absolute value makes a number positive (not distance from 0)','−3 is smaller than −5 because 3 < 5'],
        advanced:   'Orders and compares rational numbers in all forms (fractions, decimals, negatives) on a number line. Solves real-world problems requiring understanding of absolute value and opposites. Explains the relationship between a number and its opposite and between a number and its absolute value.',
        proficient: 'Locates positive and negative integers and rational numbers on a number line. Understands ordering of rational numbers, including negative numbers. Finds the absolute value of a rational number and interprets it as distance from 0.',
        developing: 'Locates positive integers and some negative integers on a number line. Compares integers using the number line. Finds absolute value of integers but struggles with rational numbers.',
        beginning:  'Recognizes positive and negative numbers. Can place whole numbers on a number line but struggles with negatives and fractions. Needs visual support for absolute value concept.'
    },
    'fraction_6': {
        grade:6, label:'Fractions, Decimals & Percents',
        dok: 2,
        vocabulary: ['reciprocal','quotient','dividend','divisor','algorithm','decimal','percent','convert','fluency'],
        misconceptions: ['Dividing by a fraction makes smaller','Invert and multiply works but student doesn\'t understand why','Fractions, decimals, and percents are unrelated'],
        advanced:   'Divides fractions by fractions fluently and interprets quotients in context. Converts between fractions, decimals, and percents flexibly to solve problems. Divides multi-digit numbers and performs all operations on multi-digit decimals fluently.',
        proficient: 'Interprets and computes quotients of fractions. Fluently divides multi-digit numbers using the standard algorithm. Fluently adds, subtracts, multiplies, and divides multi-digit decimals.',
        developing: 'Divides a fraction by a whole number using models. Performs operations on multi-digit decimals with some errors. Converts between fractions and decimals for common equivalents (1/2, 1/4).',
        beginning:  'Multiplies fractions but struggles with division of fractions. Adds/subtracts decimals with alignment support. Limited ability to convert between forms.'
    },
    'ratio_6': {
        grade:6, label:'Ratios & Rates',
        dok: 2,
        vocabulary: ['ratio','rate','unit rate','equivalent ratio','proportion','per','table','tape diagram','double number line'],
        misconceptions: ['Ratios are the same as fractions','Additive reasoning instead of multiplicative (adding instead of multiplying to find equivalents)','Unit rate is always the smaller number'],
        advanced:   'Uses ratio and rate reasoning to solve complex real-world problems using tables, tape diagrams, double number lines, and equations. Makes conversions between measurement systems. Compares ratios in different ways and determines which is the better deal.',
        proficient: 'Understands the concept of a ratio and uses ratio language. Finds unit rates. Uses ratio tables, double number lines, and tape diagrams to solve ratio and rate problems.',
        developing: 'Identifies ratios in simple contexts. Finds equivalent ratios using multiplication tables. Calculates unit rate with support. Represents ratios as fractions.',
        beginning:  'Recognizes that a ratio compares two quantities. Can create equivalent ratios for simple cases (e.g., 1:2, 2:4) but cannot yet solve ratio problems independently.'
    },
    'percent_6': {
        grade:6, label:'Percents',
        dok: 2,
        vocabulary: ['percent','rate per 100','whole','part','equivalent','fraction','decimal','proportion'],
        misconceptions: ['Percent cannot exceed 100','25% of a number is always 25','Percent change and percent of a number are the same'],
        advanced:   'Solves multi-step percent problems including finding the whole given a part and the percent. Converts fluently among fractions, decimals, and percents to choose the most efficient form for a given problem.',
        proficient: 'Finds a percent of a quantity as a rate per 100. Solves problems involving finding the whole, given a part and the percent. Represents and converts benchmark percents (10%, 25%, 50%, 75%) as fractions and decimals.',
        developing: 'Finds simple percents of numbers (10%, 50%) using models. Converts between common percents and fractions. Struggles with problems requiring percent to find the whole.',
        beginning:  'Understands percent means "out of 100" but cannot calculate percentages independently. Needs hundred grids to visualize percent.'
    },
    'equation_6': {
        grade:6, label:'Expressions & Equations',
        dok: 2,
        vocabulary: ['variable','expression','equation','inequality','coefficient','constant','substitute','evaluate','solve','inverse operation'],
        misconceptions: ['A variable is always "x"','The equal sign means "the answer"','Solving means guessing and checking'],
        advanced:   'Writes and evaluates expressions involving exponents and the order of operations. Writes and solves equations and inequalities in real-world contexts. Identifies and generates equivalent expressions using properties of operations (commutative, associative, distributive).',
        proficient: 'Writes, reads, and evaluates algebraic expressions. Solves one-step equations (x + p = q, px = q) using inverse operations. Writes one-variable inequalities and represents solutions on number lines.',
        developing: 'Evaluates expressions by substituting given values. Solves one-step equations using guess-and-check or concrete models. Identifies variables in an expression.',
        beginning:  'Understands that a letter represents an unknown number. Evaluates simple expressions with one operation. Cannot yet write or solve equations independently.'
    },
    'area_6': {
        grade:6, label:'Area & Geometry',
        dok: 2,
        vocabulary: ['area','triangle','parallelogram','trapezoid','polygon','net','surface area','volume','decompose','base','height'],
        misconceptions: ['Using slant height instead of perpendicular height for area','Surface area and volume are the same','Any two sides can be base and height'],
        advanced:   'Finds the area of triangles, quadrilaterals, and polygons by decomposing into triangles and rectangles. Finds the volume of right rectangular prisms with fractional edge lengths. Uses nets to find surface area. Solves real-world area and volume problems.',
        proficient: 'Applies area formulas for triangles, parallelograms, and trapezoids. Finds the volume of a right rectangular prism. Represents 3-D figures using nets and finds surface area.',
        developing: 'Finds the area of rectangles and triangles using formulas. Finds the volume of rectangular prisms with whole-number dimensions. Uses nets with guidance to find surface area.',
        beginning:  'Finds the area of rectangles. Counts unit cubes for volume. Cannot independently apply area formulas for triangles or parallelograms.'
    },
    'statistics_6': {
        grade:6, label:'Statistics & Data',
        dok: 2,
        vocabulary: ['mean','median','mode','range','interquartile range','IQR','dot plot','histogram','box plot','distribution','center','spread','variability','MAD'],
        misconceptions: ['Mean is always the best measure of center','Outliers don\'t affect the mean much','Box plots show individual data points'],
        advanced:   'Summarizes and interprets data distributions using measures of center (mean, median) and variability (IQR, MAD). Compares distributions using appropriate displays and statistics. Recognizes the effect of outliers on mean vs. median.',
        proficient: 'Displays data in dot plots, histograms, and box plots. Calculates mean, median, and range. Describes the center, spread, and shape of data distributions. Summarizes data sets in relation to context.',
        developing: 'Creates dot plots and calculates mean and median. Identifies the range. Reads box plots and histograms with support. Describes distributions as symmetric or skewed.',
        beginning:  'Calculates the mean of a small data set. Reads values from dot plots. Cannot yet create histograms or box plots independently.'
    },
    'coordinate_6': {
        grade:6, label:'Coordinate Plane',
        dok: 2,
        vocabulary: ['coordinate plane','quadrant','x-axis','y-axis','origin','ordered pair','reflection','distance','absolute value'],
        misconceptions: ['Quadrants are numbered clockwise','Negative coordinates mean "go backwards from the end"','Distance is always positive (correct, but students forget with coordinates)'],
        advanced:   'Graphs points in all four quadrants and solves real-world problems involving coordinate geometry. Finds distances between points on a coordinate plane using absolute value. Draws polygons given coordinates and determines side lengths.',
        proficient: 'Identifies and graphs ordered pairs in all four quadrants. Understands signs of coordinates indicate direction. Finds horizontal and vertical distances between points with the same x- or y-coordinate.',
        developing: 'Graphs points in the first quadrant fluently. Graphs in other quadrants with some sign errors. Finds distances with support.',
        beginning:  'Graphs points in the first quadrant. Struggles with negative coordinates. Cannot yet determine distances between points.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 7
    // ════════════════════════════════════════════════════════════════════════
    'proportion_7': {
        grade:7, label:'Proportional Relationships',
        dok: 2,
        vocabulary: ['proportion','constant of proportionality','unit rate','y = kx','scale factor','equivalent ratio','cross multiply'],
        misconceptions: ['All linear relationships are proportional','Constant of proportionality can be negative in G7 contexts','Additive thinking instead of multiplicative'],
        advanced:   'Represents proportional relationships algebraically (y = kx), graphically, and with tables. Determines and interprets the constant of proportionality in real-world contexts. Explains what points (x, y) on the graph mean, including (0, 0) and (1, r) where r is the unit rate.',
        proficient: 'Decides whether two quantities are in a proportional relationship using tables, graphs, or equations. Computes unit rates including those with complex fractions. Identifies the constant of proportionality (k = y/x).',
        developing: 'Identifies proportional relationships in tables when the ratio is simple. Finds unit rates with whole numbers. Recognizes that proportional graphs pass through the origin.',
        beginning:  'Recognizes that proportional means "constant ratio" but cannot consistently identify or compute k. Finds unit rates for simple whole-number ratios only.'
    },
    'percent_7': {
        grade:7, label:'Percent Problems',
        dok: 2,
        vocabulary: ['percent increase','percent decrease','percent change','markup','markdown','tax','tip','discount','commission','simple interest','principal'],
        misconceptions: ['A 50% increase followed by a 50% decrease returns to the original','Percent increase and percent of are the same computation','Sales tax is always added after discount'],
        advanced:   'Solves multi-step percent problems including successive percent changes, simple interest, and tax/tip/commission scenarios. Uses proportional reasoning to find the original amount given the result of a percent change.',
        proficient: 'Solves problems involving percent increase, percent decrease, markups, markdowns, tax, tip, and simple interest. Uses proportional relationships (part/whole = percent/100) to find any unknown.',
        developing: 'Calculates simple percent of a number. Solves percent increase or decrease with support. Can set up a proportion but may make errors solving.',
        beginning:  'Finds 10% and 50% of a number. Understands percent means "per hundred" but cannot solve percent change problems without step-by-step guidance.'
    },
    'rational number_7': {
        grade:7, label:'Operations with Rational Numbers',
        dok: 2,
        vocabulary: ['rational number','integer','additive inverse','absolute value','terminating decimal','repeating decimal','opposite','distance'],
        misconceptions: ['Negative × negative = negative','−(−a) = −a','A negative divided by a negative is negative'],
        advanced:   'Adds, subtracts, multiplies, and divides rational numbers fluently (including complex fractions). Solves real-world problems requiring all four operations with positive and negative rational numbers. Interprets sums, products, quotients, and differences of rational numbers in context.',
        proficient: 'Performs all four operations with integers and rational numbers (fractions, decimals). Understands p + q as the number located |q| units from p in the positive or negative direction. Converts between fraction and decimal forms of rational numbers.',
        developing: 'Adds and subtracts integers using a number line or rules. Multiplies integers. Struggles with division of negative fractions. Converts simple fractions to decimals.',
        beginning:  'Adds positive and negative integers with a number line. Multiplies positive integers fluently but is uncertain with negatives. Cannot yet operate with negative fractions/decimals.'
    },
    'equation_7': {
        grade:7, label:'Equations & Inequalities',
        dok: 2,
        vocabulary: ['equation','inequality','variable','coefficient','constant','like terms','distributive property','two-step','solution','constraint'],
        misconceptions: ['Inequality flips for all operations (not just multiplying/dividing by negative)','Terms must have the same variable AND exponent to combine','Distributing only to the first term inside parentheses'],
        advanced:   'Solves multi-step real-world and mathematical problems with positive and negative rational numbers. Writes and solves two-step equations and inequalities in the form px + q = r and px + q > r. Uses properties of operations to generate equivalent expressions and justify solution steps.',
        proficient: 'Writes and solves two-step equations and inequalities. Represents solutions for inequalities on number lines. Applies properties of operations to add, subtract, factor, and expand linear expressions.',
        developing: 'Solves two-step equations with whole numbers. Writes equations from word problems with support. Graphs inequality solutions on a number line with direction prompts.',
        beginning:  'Solves one-step equations. Recognizes that an inequality allows many solutions. Needs guided steps to set up or solve two-step problems.'
    },
    'scale_7': {
        grade:7, label:'Scale Drawings & Similar Figures',
        dok: 2,
        vocabulary: ['scale','scale drawing','scale factor','similar','proportion','enlarge','reduce','corresponding sides','corresponding angles'],
        misconceptions: ['Scale factor applies to area the same way as length','Similar figures are always the same orientation','A scale of 1:100 means the drawing is 100× bigger'],
        advanced:   'Reproduces a scale drawing at a different scale. Computes actual lengths and areas from scale drawings. Generalizes the critical attributes of similarity including ratios within and between similar shapes and applies to real-world design problems.',
        proficient: 'Solves problems involving scale drawings of geometric figures, including computing actual lengths from the scale. Identifies corresponding sides and angles in similar figures. Uses ratios to determine if two shapes are similar.',
        developing: 'Uses a given scale factor to find one missing length. Identifies similar figures when told they are similar. Struggles to set up proportions independently.',
        beginning:  'Understands that a scale drawing is a proportional representation but cannot independently find actual measurements or determine similarity.'
    },
    'circle_7': {
        grade:7, label:'Circles & Circumference',
        dok: 2,
        vocabulary: ['circle','circumference','diameter','radius','pi','π','area','C = πd','C = 2πr','A = πr²'],
        misconceptions: ['Diameter = 2 × circumference','Using diameter in the area formula instead of radius','π = 3.14 exactly (not an approximation)'],
        advanced:   'Solves real-world and mathematical problems involving area and circumference of circles and composite figures including semicircles and quarter circles. Explains the relationship between circumference and diameter (π) and derives the area formula using reasoning.',
        proficient: 'Knows the formulas for circumference (C = πd or C = 2πr) and area (A = πr²) and uses them to solve problems. Describes π as the ratio of circumference to diameter. Uses 3.14 or 22/7 as approximations.',
        developing: 'Finds circumference and area of circles when given the radius and reminded of the formulas. Confuses radius and diameter in some problems.',
        beginning:  'Identifies radius, diameter, and circumference on a circle diagram. Cannot yet apply formulas independently to find circumference or area.'
    },
    'area_7': {
        grade:7, label:'Area, Surface Area & Volume',
        dok: 2,
        vocabulary: ['area','surface area','lateral area','volume','prism','pyramid','composite figure','net','cross-section','base','height'],
        misconceptions: ['Surface area = volume','Using the wrong height (slant vs. perpendicular)','All faces of a pyramid are triangles (base may be a rectangle)'],
        advanced:   'Solves real-world problems involving area, surface area, and volume of 3-D figures including composite shapes. Describes cross-sections of 3-D figures. Computes lateral and total surface area of prisms and pyramids. Finds area of composite figures with semicircles.',
        proficient: 'Solves problems involving area of composite figures (rectangles, triangles, circles). Finds the volume and surface area of rectangular and triangular prisms and pyramids. Uses nets to compute surface area.',
        developing: 'Finds the area of basic figures and volume of rectangular prisms. Calculates surface area of rectangular prisms using nets with support. Struggles with pyramids and composite figures.',
        beginning:  'Finds the area of rectangles and triangles. Finds volume of rectangular prisms by counting cubes. Cannot yet compute surface area independently.'
    },
    'probability_7': {
        grade:7, label:'Probability',
        dok: 2,
        vocabulary: ['probability','event','outcome','sample space','theoretical','experimental','compound event','tree diagram','simulation','complement','certain','impossible','likely','unlikely'],
        misconceptions: ['Past outcomes affect future independent events (gambler\'s fallacy)','Probability must be expressed as a fraction only','All outcomes are equally likely'],
        advanced:   'Designs and uses simulations to generate frequencies for compound events. Compares experimental and theoretical probabilities, explaining sources of discrepancy. Finds probabilities of compound events using organized lists, tables, tree diagrams, and the counting principle.',
        proficient: 'Finds theoretical and experimental probabilities of simple events. Represents sample spaces for compound events using tree diagrams and organized lists. Understands that probability is between 0 and 1 and identifies complementary events.',
        developing: 'Finds theoretical probability of simple events. Creates sample spaces for simple compound events with guidance. Understands that probability of 0 is impossible and 1 is certain.',
        beginning:  'Identifies outcomes as likely/unlikely. Finds probability of simple events (coin flip, die roll) with support. Cannot yet organize compound sample spaces.'
    },
    'statistics_7': {
        grade:7, label:'Statistics & Sampling',
        dok: 2,
        vocabulary: ['population','sample','random sample','inference','representative','bias','variability','mean','median','MAD','comparative','dot plot','box plot'],
        misconceptions: ['Any sample represents the population','Larger samples are always biased-free','Mean is always the best measure of center'],
        advanced:   'Uses data from a random sample to make valid inferences about a population. Assesses the validity of inferences by comparing samples. Informally assesses the degree of visual overlap of two numerical data distributions with similar variabilities and draws conclusions about population differences.',
        proficient: 'Understands that statistics can be used to gain information about a population by examining a representative sample. Uses random samples to draw inferences. Compares two populations using measures of center and variability from random samples.',
        developing: 'Describes the difference between a sample and a population. Recognizes that random samples tend to be representative. Compares two data sets by looking at dot plots or box plots side by side.',
        beginning:  'Recognizes that data comes from a group but does not distinguish sample from population. Reads comparative displays with support but cannot draw independent conclusions about populations.'
    },

    // ════════════════════════════════════════════════════════════════════════
    //  GRADE 8
    // ════════════════════════════════════════════════════════════════════════
    'linear_8': {
        grade:8, label:'Linear Equations & Slope',
        dok: 2,
        vocabulary: ['slope','y-intercept','linear equation','y = mx + b','rate of change','coefficient','solution','substitution','elimination','equivalent equations'],
        misconceptions: ['Slope is always positive','y-intercept is where the line crosses the x-axis','All linear equations are proportional'],
        advanced:   'Writes equations in y = mx + b form from tables, graphs, and descriptions. Solves linear equations with variables on both sides, including cases with no solution or infinitely many solutions. Explains why the slope is the same between any two distinct points on a line using similar triangles.',
        proficient: 'Graphs proportional and non-proportional linear relationships. Determines slope and y-intercept from tables, graphs, and equations. Solves multi-step linear equations with rational coefficients. Distinguishes between proportional (y = kx) and non-proportional (y = mx + b, b ≠ 0) linear situations.',
        developing: 'Calculates slope from two points or a graph. Identifies slope and y-intercept from y = mx + b form. Solves two-step linear equations. Graphs lines from equations with support.',
        beginning:  'Identifies slope as "steepness" on a graph. Recognizes y = mx + b as a line. Solves one-step equations. Needs step-by-step guidance to graph lines or calculate slope.'
    },
    'slope_8': {
        grade:8, label:'Slope & Rate of Change',
        dok: 2,
        vocabulary: ['slope','rise','run','rate of change','steepness','positive slope','negative slope','zero slope','undefined slope','similar triangles'],
        misconceptions: ['Slope is run/rise','Negative slope means the line goes down and to the left','Slope changes at different points on a line'],
        advanced:   'Uses similar right triangles to explain why slope is constant between any two points on a non-vertical line. Compares slopes from different representations (table, graph, equation, description). Interprets slope as rate of change in real-world contexts and explains what the sign and magnitude mean.',
        proficient: 'Calculates slope from a graph, table, or two points using rise/run. Interprets the unit rate as the slope of the graph for proportional relationships. Identifies positive, negative, zero, and undefined slopes.',
        developing: 'Calculates slope from a graph by counting rise and run. Identifies positive vs. negative slope. Struggles to calculate slope from a table or two points without graphing first.',
        beginning:  'Recognizes steeper vs. less steep lines visually. Understands slope relates to "how fast" something changes. Cannot yet compute slope from coordinates independently.'
    },
    'function_8': {
        grade:8, label:'Functions',
        dok: 2,
        vocabulary: ['function','input','output','domain','range','mapping','function rule','linear function','non-linear','rate of change','initial value'],
        misconceptions: ['Every equation defines a function','Functions must be represented by equations','A curved graph cannot be a function'],
        advanced:   'Compares properties of two functions represented in different ways (algebraically, graphically, numerically in tables, or by verbal descriptions). Constructs a function to model a linear relationship and determines rate of change and initial value. Describes qualitatively the functional relationship between two quantities by analyzing a graph (increasing/decreasing, linear/non-linear).',
        proficient: 'Understands that a function assigns exactly one output to each input. Identifies functions from ordered pairs, tables, mappings, and graphs (vertical line test). Writes equations for linear functions in y = mx + b form. Gives examples of non-linear functions.',
        developing: 'Identifies whether a table or set of ordered pairs represents a function. Recognizes linear vs. non-linear functions on a graph. Writes the equation of a linear function with support.',
        beginning:  'Understands the concept of input → output. Identifies functions in mapping diagrams. Cannot yet write function equations or distinguish linear from non-linear independently.'
    },
    'systems_8': {
        grade:8, label:'Systems of Equations',
        dok: 3,
        vocabulary: ['system of equations','simultaneous','solution','intersection','substitution','elimination','no solution','infinitely many solutions','parallel','same line'],
        misconceptions: ['Systems always have one solution','Parallel lines have the same y-intercept','The solution is two separate answers (not an ordered pair)'],
        advanced:   'Solves systems algebraically (substitution and elimination) and graphically. Identifies systems with one solution, no solution, or infinitely many solutions and explains the geometric meaning. Creates and solves systems from real-world contexts.',
        proficient: 'Solves pairs of simultaneous linear equations by graphing and algebraically. Identifies the solution as the point of intersection. Verifies solutions by substituting back into both equations.',
        developing: 'Solves a system by graphing when both equations are in slope-intercept form. Identifies the intersection point as the solution. Uses substitution with support for simple systems.',
        beginning:  'Understands that two lines can intersect. Graphs individual lines but cannot reliably identify or verify the intersection point as a solution to the system.'
    },
    'pythagorean_8': {
        grade:8, label:'Pythagorean Theorem',
        dok: 2,
        vocabulary: ['Pythagorean theorem','hypotenuse','leg','right triangle','a² + b² = c²','converse','distance','square root','diagonal'],
        misconceptions: ['The theorem works on all triangles','c is always the longest side regardless of position','√(a² + b²) = a + b'],
        advanced:   'Applies the Pythagorean theorem and its converse to solve problems in two and three dimensions. Determines the distance between two points on a coordinate plane. Explains a proof of the Pythagorean theorem using area models or algebraic reasoning.',
        proficient: 'Applies a² + b² = c² to find unknown side lengths in right triangles. Uses the converse to determine if a triangle is a right triangle. Applies the theorem to find the distance between two points on a coordinate plane.',
        developing: 'Uses a² + b² = c² to find the hypotenuse when given both legs. Struggles to solve for a leg. Finds distance on a coordinate plane with step-by-step guidance.',
        beginning:  'Identifies the hypotenuse as the longest side. Recognizes the formula a² + b² = c² but cannot yet apply it to solve for unknowns independently.'
    },
    'transformation_8': {
        grade:8, label:'Transformations & Congruence',
        dok: 2,
        vocabulary: ['translation','rotation','reflection','dilation','congruent','similar','rigid motion','scale factor','pre-image','image','coordinate rule','orientation'],
        misconceptions: ['Dilations are rigid motions','Reflections always go across the x-axis','Rotations change the size of the figure'],
        advanced:   'Describes sequences of transformations that carry one figure onto another. Explains the effects of transformations on coordinates algebraically (e.g., (x,y) → (−x,y) for reflection over y-axis). Understands that congruence results from rigid motions and similarity results from rigid motions followed by dilations.',
        proficient: 'Performs translations, rotations (90°, 180°, 270°), reflections, and dilations on coordinate planes. Identifies whether transformations preserve congruence. Determines if two figures are congruent or similar based on transformation sequences.',
        developing: 'Performs translations and reflections over the axes. Identifies congruent figures. Performs dilations with a given scale factor and center at origin. Struggles with rotations.',
        beginning:  'Recognizes translations, reflections, and rotations visually. Identifies congruent vs. non-congruent figures. Cannot yet perform transformations on a coordinate plane independently.'
    },
    'irrational_8': {
        grade:8, label:'Real Numbers & Irrational Numbers',
        dok: 2,
        vocabulary: ['rational','irrational','real number','square root','cube root','pi','non-repeating','non-terminating','approximate','number line'],
        misconceptions: ['π = 3.14 (not an approximation)','√2 = 1.4 exactly','All square roots are irrational'],
        advanced:   'Classifies numbers as rational or irrational with justification. Approximates irrational numbers (including π and square roots of non-perfect squares) to any desired degree of accuracy. Locates irrational numbers precisely on a number line using successive approximation.',
        proficient: 'Knows that numbers that are not rational are irrational. Understands that every number has a decimal expansion; rational numbers terminate or repeat, irrational numbers do neither. Approximates irrational numbers using rational approximations and locates them approximately on a number line.',
        developing: 'Identifies perfect squares and their roots. Estimates square roots of non-perfect squares between two whole numbers. Recognizes π as irrational. Struggles to place irrational numbers precisely on a number line.',
        beginning:  'Knows some perfect squares (1, 4, 9, 16, 25). Recognizes that √2 is not a whole number. Cannot yet distinguish rational from irrational or approximate irrational numbers.'
    },
    'scientific notation_8': {
        grade:8, label:'Scientific Notation',
        dok: 2,
        vocabulary: ['scientific notation','standard form','exponent','power of 10','coefficient','magnitude','very large','very small'],
        misconceptions: ['The exponent tells how many zeros to add','A negative exponent means a negative number','Coefficient can be any number (not just 1–10)'],
        advanced:   'Performs operations (add, subtract, multiply, divide) with numbers in scientific notation and chooses appropriate units of measurement for very large or very small quantities. Interprets scientific notation in real-world contexts (astronomy, biology, chemistry). Compares numbers in scientific notation by reasoning about orders of magnitude.',
        proficient: 'Converts between standard decimal notation and scientific notation. Interprets numbers expressed in scientific notation in context. Compares two numbers in scientific notation.',
        developing: 'Writes numbers in scientific notation when the coefficient is a single digit. Converts from scientific notation to standard form. Compares numbers in scientific notation when the exponents are the same.',
        beginning:  'Recognizes scientific notation format (a × 10ⁿ). Converts small numbers in scientific notation to standard form with support. Cannot yet compare or compute with numbers in scientific notation.'
    },
    'volume_8': {
        grade:8, label:'Volume — Cylinders, Cones & Spheres',
        dok: 2,
        vocabulary: ['volume','cylinder','cone','sphere','radius','height','π','V = πr²h','V = ⅓πr²h','V = ⁴⁄₃πr³','base area'],
        misconceptions: ['Volume of a cone = half the volume of a cylinder','The formula for a sphere uses diameter, not radius','Height of a cylinder = diameter'],
        advanced:   'Solves real-world problems involving volumes of cones, cylinders, and spheres, including composite solids. Explains the relationship between the volumes of a cylinder, cone, and sphere with equal dimensions. Derives volume formulas through reasoning about cross-sections.',
        proficient: 'Knows and applies the volume formulas for cones (V = ⅓πr²h), cylinders (V = πr²h), and spheres (V = ⁴⁄₃πr³). Solves word problems requiring volume calculations.',
        developing: 'Applies the cylinder volume formula correctly. Uses the cone and sphere formulas with support. Confuses which formula to apply in context.',
        beginning:  'Identifies cylinders, cones, and spheres. Recognizes that volume formulas use π and radius. Cannot yet independently select or apply the correct formula.'
    },
    'scatter_8': {
        grade:8, label:'Scatter Plots & Bivariate Data',
        dok: 2,
        vocabulary: ['scatter plot','bivariate data','trend line','line of best fit','positive association','negative association','no association','linear','non-linear','cluster','outlier','prediction'],
        misconceptions: ['The line of best fit must pass through at least one point','Correlation implies causation','All scatter plots show linear relationships'],
        advanced:   'Constructs scatter plots, identifies clusters and outliers, and fits a line to data that suggests a linear association. Uses the equation of the linear model to make predictions and assess model fit. Distinguishes between linear and non-linear associations and between correlation and causation.',
        proficient: 'Constructs and interprets scatter plots for bivariate data. Describes patterns (positive, negative, no association; linear, non-linear). Draws an informal trend line and uses it to make predictions. Interprets slope and y-intercept of a linear model in context.',
        developing: 'Plots bivariate data on a scatter plot. Identifies the overall trend as positive, negative, or no association. Draws a trend line with guidance but struggles to write its equation.',
        beginning:  'Plots individual points on a scatter plot. Recognizes that scatter plots show two-variable relationships. Cannot yet identify trends or draw a trend line independently.'
    },

    }; // end ALL

    // ════════════════════════════════════════════════════════════════════════
    //  LOOKUP FUNCTIONS
    // ════════════════════════════════════════════════════════════════════════

    function get(key) {
        return ALL[key] || null;
    }

    function forGrade(grade) {
        const g = (grade === 'K' || grade === 0) ? 'K' : parseInt(grade);
        return Object.entries(ALL)
            .filter(([, d]) => d.grade === g || String(d.grade) === String(g))
            .map(([key, d]) => ({ key, ...d }));
    }

    function buildHTML(key) {
        const d = ALL[key];
        if (!d) return '';
        const gradeLabel = d.grade === 'K' ? 'Kindergarten' : 'Grade ' + d.grade;

        const rows = LEVELS.map(lvl => {
            const m = LEVEL_META[lvl];
            return `
            <div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #f1f5f9;">
                <div style="min-width:90px;text-align:center;">
                    <span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:0.7rem;font-weight:700;color:${m.color};background:${m.bg};border:1px solid ${m.color}20;">${m.label} <span style="font-size:0.6rem;opacity:0.7;">(${m.score})</span></span>
                </div>
                <div style="font-size:0.78rem;color:#1E293B;line-height:1.45;">${d[lvl]}</div>
            </div>`;
        }).join('');

        const vocabChips = (d.vocabulary || []).map(w =>
            `<span style="display:inline-block;padding:1px 7px;margin:2px;border-radius:8px;font-size:0.65rem;font-weight:600;background:#EEF2FF;color:#4338CA;border:1px solid #C7D2FE;">${w}</span>`
        ).join('');

        const miscHTML = (d.misconceptions || []).map(m =>
            `<li style="font-size:0.72rem;color:#92400E;margin-bottom:3px;">⚠ ${m}</li>`
        ).join('');

        return `
        <div class="benchmark-card" style="background:#FAFBFD;border:1px solid #E2E8F0;border-radius:10px;padding:14px 16px;margin-top:10px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <span style="font-size:1rem;">📊</span>
                <span style="font-size:0.8rem;font-weight:700;color:#1E2761;text-transform:uppercase;letter-spacing:0.5px;">${gradeLabel} — Benchmark Descriptors</span>
                <span style="font-size:0.72rem;color:#64748B;font-style:italic;">${d.label}</span>
                ${d.dok ? `<span style="font-size:0.6rem;padding:2px 6px;border-radius:6px;background:#F0F9FF;color:#0369A1;border:1px solid #BAE6FD;font-weight:700;">DOK ${d.dok}</span>` : ''}
            </div>
            ${rows}
            ${vocabChips ? `<div style="margin-top:8px;"><span style="font-size:0.65rem;font-weight:700;color:#64748B;text-transform:uppercase;">Key Vocabulary:</span> ${vocabChips}</div>` : ''}
            ${miscHTML ? `<div style="margin-top:6px;"><span style="font-size:0.65rem;font-weight:700;color:#92400E;text-transform:uppercase;">Common Misconceptions:</span><ul style="margin:4px 0 0 12px;padding:0;list-style:none;">${miscHTML}</ul></div>` : ''}
        </div>`;
    }

    // ════════════════════════════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════════════════════════════
    return {
        ALL,
        LEVELS,
        LEVEL_META,
        get,
        forGrade,
        buildHTML
    };

})();
