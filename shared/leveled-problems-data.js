// ==================== DOK LEVELED PROBLEMS DATABASE ====================
// Depth of Knowledge leveled practice problems for MCA-III topics
// DOK 1 = Recall, DOK 2 = Skill/Concept, DOK 3 = Strategic Thinking
// Keyed by topic name matching TEACHING_INSIGHTS and TOPIC_PATTERNS
// ======================================================================

const DOK_PROBLEMS = {

    // ======================== GRADE 5 ========================

    'place value and decimals': {
        grade: 5,
        dok1: [
            { stem: 'What is the value of the 7 in 4.073?', answer: '7 hundredths (0.07)', hint: 'The second digit after the decimal point is the hundredths place.' },
            { stem: 'Write 0.400 in word form.', answer: 'Four hundred thousandths', hint: 'Count the decimal places to name the place value.' },
            { stem: 'Round 3.782 to the nearest tenth.', answer: '3.8', hint: 'Look at the hundredths digit (8) to decide whether to round up or down.' },
            { stem: 'Compare using < , >, or =: 0.36 ___ 0.360', answer: '0.36 = 0.360', hint: 'Adding a zero to the end of a decimal does not change its value.' },
            { stem: 'What is 10 x 0.045?', answer: '0.45', hint: 'Multiplying by 10 moves the decimal point one place to the right.' },
            { stem: 'Write 5.009 in expanded form.', answer: '5 + 0.009 or 5 ones + 9 thousandths', hint: 'Break the number into ones and thousandths.' },
            { stem: 'Order from least to greatest: 0.52, 0.502, 0.520', answer: '0.502, 0.52, 0.520 (Note: 0.52 = 0.520)', hint: 'Line up the decimal points and compare place by place.' },
            { stem: 'What is 0.6 / 10?', answer: '0.06', hint: 'Dividing by 10 moves the decimal point one place to the left.' }
        ],
        dok2: [
            { stem: 'A gymnast scores 9.375 and 9.380. Which score is higher? Explain how you know.', answer: '9.380 is higher. Both have 9 ones and 3 tenths, but 9.380 has 8 hundredths vs. 7 hundredths.', hint: 'Compare digit by digit starting from the left.' },
            { stem: 'A vet weighs a puppy at 4.725 kg. Round this weight to the nearest tenth and to the nearest hundredth. Which rounding is more precise?', answer: 'Nearest tenth: 4.7 kg. Nearest hundredth: 4.73 kg. The hundredth is more precise.', hint: 'Round one place at a time. More decimal places means more precision.' },
            { stem: 'Marcus has $12.50. He multiplies his money by 10 and then by 10 again. How much does he have now? Write using a power of 10.', answer: '$1,250.00. This is $12.50 x 10² (or x 100).', hint: 'Each multiplication by 10 moves the decimal one place right.' },
            { stem: 'A scientist measures a bug at 0.048 meters. Express this measurement in a place-value chart showing ones, tenths, hundredths, and thousandths.', answer: '0 ones, 0 tenths, 4 hundredths, 8 thousandths', hint: 'Write each digit in its correct column.' },
            { stem: 'A baker weighs flour: 2.350 kg, 2.035 kg, and 2.305 kg. Order these from heaviest to lightest.', answer: '2.350 kg, 2.305 kg, 2.035 kg', hint: 'Compare the tenths place first since the ones are all 2.' },
            { stem: 'How is multiplying 3.7 by 10³ different from multiplying 3.7 by 10¹? Show both results.', answer: '3.7 x 10¹ = 37 (decimal moves 1 place). 3.7 x 10³ = 3,700 (decimal moves 3 places). The exponent tells how many places.', hint: 'The exponent tells you how many places to move the decimal.' },
            { stem: 'A track-and-field athlete runs the 100m in 12.083 seconds. Her teammate runs it in 12.038 seconds. Who is faster and by how much?', answer: 'The teammate is faster. 12.083 - 12.038 = 0.045 seconds faster.', hint: 'Faster means a smaller time. Subtract to find the difference.' }
        ],
        dok3: [
            { stem: 'Create three different decimals that all round to 4.5 when rounded to the nearest tenth. One must have a digit in the thousandths place. Explain your strategy.', answer: 'E.g., 4.52, 4.46, 4.531. Strategy: any decimal from 4.450 to 4.549 rounds to 4.5.', hint: 'Think about which hundredths digits round down and which round up to give 4.5.' },
            { stem: 'A store prices items to the nearest cent (hundredth of a dollar). An item costs exactly $2.4950. Should the store round up or down? Explain why this matters and what rule you use.', answer: 'The store rounds to $2.50 (round up because the thousandths digit is 5). This matters because rounding up means the customer pays half a cent more. The standard rule is to round 5 up.', hint: 'Look at the thousandths digit. What is the rounding rule when the digit is exactly 5?' },
            { stem: 'A number has a 6 in the hundredths place. When you multiply it by 10, the 6 is in the tenths place. When you divide the original number by 10, where is the 6? Explain the pattern using place value.', answer: 'Dividing by 10 moves each digit one place to the right, so the 6 moves to the thousandths place. Pattern: multiplying by 10 moves digits left, dividing by 10 moves digits right.', hint: 'Think about what happens to each digit when you multiply or divide by 10.' },
            { stem: 'You have a scale that only shows tenths of a kilogram. You need to measure 0.375 kg of rice for a recipe. Describe a strategy to measure as close to 0.375 kg as possible and explain the possible error.', answer: 'Measure 0.4 kg (nearest tenth). The error could be up to 0.025 kg too much. Alternatively, measure 0.4 kg then remove a small pinch. The maximum rounding error when reading tenths is 0.05 kg.', hint: 'What is 0.375 rounded to the nearest tenth? How far off could you be?' }
        ]
    },

    'fraction operations': {
        grade: 5,
        dok1: [
            { stem: 'Add: 1/4 + 2/4', answer: '3/4', hint: 'When denominators are the same, just add the numerators.' },
            { stem: 'Subtract: 5/6 - 1/6', answer: '4/6 = 2/3', hint: 'Same denominator, so subtract numerators. Then simplify.' },
            { stem: 'Add: 1/3 + 1/6', answer: '2/6 + 1/6 = 3/6 = 1/2', hint: 'Find a common denominator first. 1/3 = 2/6.' },
            { stem: 'Multiply: 3 x 2/5', answer: '6/5 = 1 1/5', hint: 'Multiply the whole number by the numerator: 3 x 2 = 6.' },
            { stem: 'Multiply: 1/2 x 1/4', answer: '1/8', hint: 'Multiply numerators and multiply denominators.' },
            { stem: 'Divide: 1/3 / 4', answer: '1/12', hint: 'Dividing by 4 is the same as multiplying by 1/4.' },
            { stem: 'Divide: 6 / 1/2', answer: '12', hint: 'How many halves fit in 6? Or multiply 6 by 2.' },
            { stem: 'Subtract: 3/4 - 1/3', answer: '9/12 - 4/12 = 5/12', hint: 'Find the LCD of 4 and 3, which is 12.' },
            { stem: 'Add: 2 1/2 + 1 1/4', answer: '3 3/4', hint: 'Add the whole numbers, then add the fractions: 1/2 + 1/4 = 3/4.' }
        ],
        dok2: [
            { stem: 'A recipe calls for 2/3 cup of milk and 1/4 cup of cream. How much liquid is that in total?', answer: '8/12 + 3/12 = 11/12 cup', hint: 'Find the LCD of 3 and 4, which is 12.' },
            { stem: 'Sofia ran 3/4 of a mile on Monday and 2/3 of a mile on Tuesday. How much farther did she run on Monday?', answer: '9/12 - 8/12 = 1/12 mile farther on Monday', hint: 'Subtract the distances. Find a common denominator first.' },
            { stem: 'A garden is 1/2 acre. Tomatoes take up 2/3 of the garden. What fraction of an acre is tomatoes?', answer: '1/2 x 2/3 = 2/6 = 1/3 acre', hint: 'Finding a fraction of a fraction means multiply.' },
            { stem: 'A dog walker has 3 cups of treats. Each dog gets 1/4 cup. How many dogs can she feed?', answer: '3 / 1/4 = 12 dogs', hint: 'How many 1/4 cups are in 3 cups?' },
            { stem: 'James ate 1/3 of a pizza. Kim ate 3/8 of the same pizza. How much of the pizza did they eat together? How much is left?', answer: 'Ate: 8/24 + 9/24 = 17/24. Left: 24/24 - 17/24 = 7/24 of the pizza.', hint: 'Find the LCD of 3 and 8 (it is 24). Then subtract from 1 whole.' },
            { stem: 'A ribbon is 5/6 yard long. Maria cuts it into 5 equal pieces. How long is each piece?', answer: '5/6 / 5 = 5/6 x 1/5 = 5/30 = 1/6 yard', hint: 'Divide the length by 5. Dividing a fraction by a whole number means multiply by its reciprocal.' },
            { stem: 'Marcus practiced piano for 3/4 hour on Saturday and 5/6 hour on Sunday. How much longer did he practice on Sunday?', answer: '5/6 - 3/4 = 10/12 - 9/12 = 1/12 hour (5 minutes)', hint: 'Find LCD of 6 and 4, which is 12. Then subtract.' }
        ],
        dok3: [
            { stem: 'A bakery uses 2/3 cup of sugar per batch of cookies. They have 8 cups of sugar. They want to make as many full batches as possible and use the leftover sugar for frosting. How many batches can they make, and how much sugar is left for frosting?', answer: '8 / 2/3 = 8 x 3/2 = 24/2 = 12 batches. 12 x 2/3 = 8 cups exactly, so 0 cups left for frosting.', hint: 'Divide total sugar by sugar per batch. Check if there is a remainder.' },
            { stem: 'Tanya says 1/3 + 1/4 = 2/7 because she added the numerators and added the denominators. Show why she is wrong using a picture or explanation, and find the correct answer.', answer: 'She is wrong because 1/3 and 1/4 have different-sized pieces. You need a common denominator: 4/12 + 3/12 = 7/12. Also, 2/7 < 1/3, but adding a positive number should make the sum larger.', hint: 'If you add something to 1/3, can the result be less than 1/3?' },
            { stem: 'A construction crew paves 2/5 of a road on Day 1 and 1/3 of the remaining road on Day 2. What fraction of the total road is left to pave? Create an equation to represent your work.', answer: 'After Day 1: 1 - 2/5 = 3/5 remains. Day 2 paves: 1/3 x 3/5 = 3/15 = 1/5. Remaining: 3/5 - 1/5 = 2/5 of the road. Equation: 1 - 2/5 - 1/3(1 - 2/5) = 2/5.', hint: 'Day 2 paves 1/3 of what is LEFT, not 1/3 of the whole road.' },
            { stem: 'Design a trail mix recipe using 3 ingredients where each amount is a fraction with a different denominator. Find the total cups needed. Then figure out how much of each ingredient you need to make 1/2 of the recipe.', answer: 'Example: 3/4 cup nuts, 1/3 cup raisins, 1/2 cup chocolate. Total: 9/12 + 4/12 + 6/12 = 19/12 = 1 7/12 cups. Half recipe: 3/8 cup nuts, 1/6 cup raisins, 1/4 cup chocolate.', hint: 'Pick any fractions you like. Use LCD to add. To halve, multiply each by 1/2.' }
        ]
    },

    'multi-digit operations': {
        grade: 5,
        dok1: [
            { stem: 'Multiply: 34 x 27', answer: '918', hint: 'Use the standard algorithm: 34 x 7 = 238, 34 x 20 = 680, then add.' },
            { stem: 'Divide: 575 / 25', answer: '23', hint: 'Think: 25 x ? = 575. Try 25 x 20 = 500 first.' },
            { stem: 'Multiply: 408 x 36', answer: '14,688', hint: 'Multiply 408 x 6 = 2,448 and 408 x 30 = 12,240. Then add.' },
            { stem: 'Divide: 936 / 12', answer: '78', hint: '12 x 7 = 84, so 12 x 70 = 840. Then 936 - 840 = 96. 12 x 8 = 96.' },
            { stem: 'Multiply: 250 x 40', answer: '10,000', hint: 'Multiply 25 x 4 = 100, then add the two zeros back.' },
            { stem: 'Divide: 1,260 / 15', answer: '84', hint: 'Try 15 x 80 = 1,200 first. Then 1,260 - 1,200 = 60. 15 x 4 = 60.' },
            { stem: 'Multiply: 153 x 14', answer: '2,142', hint: '153 x 4 = 612. 153 x 10 = 1,530. Add them.' }
        ],
        dok2: [
            { stem: 'A school orders 28 boxes of pencils with 144 pencils per box. How many pencils did they order?', answer: '28 x 144 = 4,032 pencils', hint: 'Multiply 144 x 28. Break it down: 144 x 20 + 144 x 8.' },
            { stem: 'A farmer packs 2,340 apples equally into 36 crates. How many apples go in each crate?', answer: '2,340 / 36 = 65 apples per crate', hint: 'Divide using long division or estimate: 36 x 60 = 2,160.' },
            { stem: 'A movie theater has 32 rows with 26 seats each. If 658 people show up, how many empty seats are there?', answer: '32 x 26 = 832 seats. 832 - 658 = 174 empty seats.', hint: 'First find total seats, then subtract the number of people.' },
            { stem: 'A baker makes 15 wedding cakes. Each cake needs 1,250 grams of flour. She has a 20 kg bag. Does she have enough? How much is left over or needed?', answer: '15 x 1,250 = 18,750 grams = 18.75 kg. Yes, enough. 20 - 18.75 = 1.25 kg left.', hint: 'Multiply to find total flour needed. Remember 1 kg = 1,000 g.' },
            { stem: 'Students sell 1,728 raffle tickets equally among 48 classrooms. How many tickets does each classroom sell?', answer: '1,728 / 48 = 36 tickets per classroom', hint: '48 x 30 = 1,440. 1,728 - 1,440 = 288. 48 x 6 = 288.' },
            { stem: 'Estimate first, then calculate exactly: 387 x 42. Was your estimate close?', answer: 'Estimate: 400 x 40 = 16,000. Exact: 387 x 42 = 16,254. The estimate was close (within 254).', hint: 'Round each factor to the nearest hundred or ten for estimating.' },
            { stem: 'A warehouse has 3,150 books to ship. Each box holds 24 books. How many boxes are needed?', answer: '3,150 / 24 = 131 R6. They need 132 boxes (round up since the remaining 6 books need a box).', hint: 'Divide, and think about what the remainder means.' }
        ],
        dok3: [
            { stem: 'A school is buying chairs for 18 classrooms. Each classroom needs 32 chairs. Chairs come in packs of 12 for $85 per pack, or they can buy individual chairs for $9 each. Find the cheapest way to buy all the chairs.', answer: '18 x 32 = 576 chairs needed. 576 / 12 = 48 packs exactly. Pack cost: 48 x $85 = $4,080. Individual cost: 576 x $9 = $5,184. Buying packs saves $1,104.', hint: 'First find total chairs needed. Then compare bulk vs individual pricing.' },
            { stem: 'Two factories make toy cars. Factory A makes 156 cars per hour for 14 hours a day. Factory B makes 234 cars per hour for 8 hours a day. Which factory makes more cars daily, and by how many?', answer: 'Factory A: 156 x 14 = 2,184 cars. Factory B: 234 x 8 = 1,872 cars. Factory A makes 312 more cars daily.', hint: 'Calculate daily production for each factory, then compare.' },
            { stem: 'A school has $5,000 to buy supplies. Laptops cost $375 each and tablets cost $225 each. They need at least 15 devices total. Find a combination that gets the most devices while staying within budget.', answer: 'All tablets: 5,000 / 225 = 22 tablets (22 x 225 = 4,950). This gives the most devices. Other options: 5 laptops + 14 tablets = $1,875 + $3,150 = $5,025 (over budget). 4 laptops + 15 tablets = $1,500 + $3,375 = $4,875 (19 devices). All tablets at 22 devices is the most.', hint: 'Cheaper devices give you more total. Try all tablets first, then mix in laptops to see what works.' }
        ]
    },

    'volume and measurement': {
        grade: 5,
        dok1: [
            { stem: 'Find the volume of a rectangular prism with length 5 cm, width 3 cm, and height 4 cm.', answer: 'V = 5 x 3 x 4 = 60 cubic cm', hint: 'V = l x w x h' },
            { stem: 'How many cups are in 3 quarts?', answer: '12 cups (1 quart = 4 cups)', hint: '1 quart = 4 cups. Multiply 3 x 4.' },
            { stem: 'A box has a base area of 24 square inches and a height of 6 inches. What is its volume?', answer: 'V = B x h = 24 x 6 = 144 cubic inches', hint: 'V = B x h where B is the base area.' },
            { stem: 'Convert 5 feet to inches.', answer: '60 inches (5 x 12 = 60)', hint: '1 foot = 12 inches.' },
            { stem: 'A cube has sides of 3 cm. What is its volume?', answer: 'V = 3 x 3 x 3 = 27 cubic cm', hint: 'For a cube, V = s x s x s.' },
            { stem: 'Convert 7,000 grams to kilograms.', answer: '7 kilograms (7,000 / 1,000 = 7)', hint: '1 kilogram = 1,000 grams.' },
            { stem: 'How many milliliters are in 3.5 liters?', answer: '3,500 mL (3.5 x 1,000)', hint: '1 liter = 1,000 milliliters.' }
        ],
        dok2: [
            { stem: 'A fish tank is 20 inches long, 10 inches wide, and 12 inches tall. How many cubic inches of water can it hold?', answer: 'V = 20 x 10 x 12 = 2,400 cubic inches', hint: 'Use V = l x w x h for the rectangular tank.' },
            { stem: 'A shipping box is 2 feet long, 1.5 feet wide, and 1 foot tall. What is its volume in cubic feet? In cubic inches?', answer: 'V = 2 x 1.5 x 1 = 3 cubic feet. In inches: 24 x 18 x 12 = 5,184 cubic inches.', hint: 'Find volume in feet first. Convert each dimension to inches (x 12) for cubic inches.' },
            { stem: 'An L-shaped pool can be split into two rectangular prisms: one is 10 m x 5 m x 2 m and the other is 6 m x 5 m x 2 m. What is the total volume?', answer: 'V1 = 10 x 5 x 2 = 100 m³. V2 = 6 x 5 x 2 = 60 m³. Total = 160 m³.', hint: 'Find the volume of each part separately, then add.' },
            { stem: 'A recipe needs 2 liters of broth, but you only have a measuring cup that shows milliliters. How many milliliters do you need?', answer: '2,000 mL', hint: '1 liter = 1,000 mL.' },
            { stem: 'A sandbox is 8 feet long, 6 feet wide, and 1.5 feet deep. Sand costs $3 per cubic foot. How much will it cost to fill the sandbox?', answer: 'V = 8 x 6 x 1.5 = 72 cubic feet. Cost = 72 x $3 = $216.', hint: 'Find the volume first, then multiply by the cost per cubic foot.' },
            { stem: 'Marcus is 5 feet 4 inches tall. His little sister is 48 inches tall. How much taller is Marcus in inches?', answer: 'Marcus = 5 x 12 + 4 = 64 inches. 64 - 48 = 16 inches taller.', hint: 'Convert Marcus\' height to inches first.' },
            { stem: 'A rectangular prism has a volume of 120 cubic cm. Its length is 10 cm and width is 4 cm. What is its height?', answer: 'V = l x w x h → 120 = 10 x 4 x h → 120 = 40h → h = 3 cm', hint: 'Plug into V = lwh and solve for the missing dimension.' }
        ],
        dok3: [
            { stem: 'You are building a rectangular raised garden bed. You have 60 cubic feet of soil. Design a garden bed (give l, w, h in whole feet) that uses all or nearly all the soil, with a height of at least 1 foot. Find at least two designs and explain which is more practical for planting.', answer: 'Design 1: 10 x 6 x 1 = 60 ft³. Design 2: 5 x 4 x 3 = 60 ft³. Design 1 gives more surface area for planting (60 sq ft vs 20 sq ft), but Design 2 allows deeper root growth.', hint: 'Find factor triples that multiply to 60. Think about what makes a good garden shape.' },
            { stem: 'A toy company ships blocks in boxes that are 12 in x 8 in x 6 in. Each block is a 2-inch cube. How many blocks fit in one box? If they need to ship 1,000 blocks, how many boxes do they need?', answer: 'Box volume = 576 in³. Block volume = 8 in³. But use packing: 12/2 = 6 across, 8/2 = 4 deep, 6/2 = 3 high. 6 x 4 x 3 = 72 blocks per box. 1,000 / 72 = 13 R64, so 14 boxes needed.', hint: 'Don\'t just divide volumes — figure out how many blocks fit along each edge.' },
            { stem: 'A pool is 25 meters long, 10 meters wide, and 2 meters deep. Water fills it at a rate of 500 liters per minute. How many hours will it take to fill the pool? (1 cubic meter = 1,000 liters)', answer: 'V = 25 x 10 x 2 = 500 m³ = 500,000 liters. Time = 500,000 / 500 = 1,000 minutes = 16 hours 40 minutes.', hint: 'Find volume in cubic meters, convert to liters, then divide by the fill rate.' }
        ]
    },

    'coordinate plane': {
        grade: 5,
        dok1: [
            { stem: 'What is the ordered pair for a point that is 3 units right and 5 units up from the origin?', answer: '(3, 5)', hint: 'The first number is the x-coordinate (right), the second is the y-coordinate (up).' },
            { stem: 'Plot the point (4, 2) on a coordinate grid. Describe its location.', answer: '4 units right of the origin and 2 units up.', hint: 'Start at (0,0). Move right for x, up for y.' },
            { stem: 'What are the coordinates of the origin?', answer: '(0, 0)', hint: 'The origin is where the x-axis and y-axis cross.' },
            { stem: 'Name the point at 6 on the x-axis and 0 on the y-axis.', answer: '(6, 0)', hint: 'If the point is on the x-axis, its y-coordinate is 0.' },
            { stem: 'Which coordinate tells you how far right to go: the x or the y?', answer: 'The x-coordinate (first number)', hint: 'X comes first and goes along the horizontal axis.' },
            { stem: 'Point A is at (2, 7). Point B is at (2, 3). Are they in the same column or same row on the grid?', answer: 'Same column (both have x = 2)', hint: 'Points with the same x-coordinate are in the same vertical line.' },
            { stem: 'What ordered pair is 5 units right and 5 units up from the origin?', answer: '(5, 5)', hint: 'Move right 5 (x = 5) and up 5 (y = 5).' }
        ],
        dok2: [
            { stem: 'A treasure map shows a path: start at (1, 1), go to (1, 4), then to (5, 4), then to (5, 1). What shape did you trace?', answer: 'A rectangle (4 units tall, 4 units wide)', hint: 'Plot the points and connect them in order.' },
            { stem: 'Liam tracks lemonade sales: Monday (1, 5), Tuesday (2, 8), Wednesday (3, 11), Thursday (4, 14). What pattern do you see? Predict Friday.', answer: 'Sales increase by 3 each day. Friday: (5, 17).', hint: 'Look at how the y-coordinate changes each day.' },
            { stem: 'Two hikers start at (0, 0). Hiker A walks to (3, 6). Hiker B walks to (6, 3). Who is farther from the trail (x-axis)?', answer: 'Hiker A is 6 units from the x-axis (y = 6). Hiker B is 3 units from the x-axis (y = 3). Hiker A is farther.', hint: 'Distance from the x-axis is the y-coordinate.' },
            { stem: 'Plot these points and describe the pattern: (1, 2), (2, 4), (3, 6), (4, 8). Write a rule.', answer: 'The y-coordinate is always 2 times the x-coordinate. Rule: y = 2x.', hint: 'How does y relate to x for each point?' },
            { stem: 'A classroom grid shows desks. Raya sits at (3, 5) and Kai sits at (7, 5). How many desk spaces apart are they?', answer: '7 - 3 = 4 desk spaces apart (horizontal distance)', hint: 'Since they have the same y-coordinate, subtract the x-coordinates.' },
            { stem: 'A robot moves from (2, 1) to (2, 6), then to (8, 6). Describe each move in words and find the total distance traveled.', answer: 'Move 1: up 5 units (stayed at x = 2). Move 2: right 6 units (stayed at y = 6). Total: 5 + 6 = 11 units.', hint: 'For each move, see which coordinate changed and by how much.' }
        ],
        dok3: [
            { stem: 'Design a simple house shape on a coordinate grid using at least 6 points. List all your coordinates, explain your design, and find the perimeter of the base (the rectangular part).', answer: 'Example: Base rectangle (1,0), (7,0), (7,4), (1,4). Roof triangle adds (4,7). Perimeter of base: 6 + 4 + 6 + 4 = 20 units. Coordinates define the shape precisely.', hint: 'Start with a rectangle for the house body, then add a triangle on top for the roof.' },
            { stem: 'Two patterns start at x = 0. Pattern A: y starts at 0 and adds 3 each time. Pattern B: y starts at 10 and adds 1 each time. Graph both on the same coordinate plane for x = 0 to 5. At what x value does Pattern A pass Pattern B?', answer: 'A: (0,0),(1,3),(2,6),(3,9),(4,12),(5,15). B: (0,10),(1,11),(2,12),(3,13),(4,14),(5,15). A passes B at x = 5 where both equal 15. Before x=5, B is higher; at x=5 they tie.', hint: 'Make a table for both patterns, then compare the y-values.' },
            { stem: 'A park ranger tracks an animal\'s location every hour: (1,2), (3,4), (5,6), (7,8). Predict where the animal will be at hour 5 and hour 10. Is the animal moving in a straight line? How do you know?', answer: 'Pattern: x and y each increase by 2 per hour. Hour 5: (9,10). Hour 10: (19,20). Yes, it moves in a straight line because the x and y change at a constant rate (slope = 1).', hint: 'Find the pattern in both the x-coordinates and the y-coordinates separately.' }
        ]
    },

    'expressions and patterns': {
        grade: 5,
        dok1: [
            { stem: 'Evaluate: 3 + 4 x 2', answer: '11 (multiply first: 4 x 2 = 8, then 3 + 8 = 11)', hint: 'Order of operations: multiply before adding.' },
            { stem: 'Evaluate: (6 + 2) x 5', answer: '40 (parentheses first: 8 x 5 = 40)', hint: 'Do what is inside the parentheses first.' },
            { stem: 'Write an expression for: "add 7 and 3, then multiply by 4."', answer: '(7 + 3) x 4', hint: 'Use parentheses to show what happens first.' },
            { stem: 'Evaluate: 20 - 3 x 4', answer: '8 (multiply first: 3 x 4 = 12, then 20 - 12 = 8)', hint: 'Multiplication comes before subtraction.' },
            { stem: 'What is the next number in the pattern: 5, 10, 20, 40, __?', answer: '80 (each number doubles)', hint: 'What is happening to get from one number to the next?' },
            { stem: 'Evaluate: 2 x (8 - 3) + 1', answer: '11 (parentheses: 5, multiply: 10, add: 11)', hint: 'Parentheses first, then multiply, then add.' },
            { stem: 'Write an expression for: "12 divided by the sum of 2 and 4."', answer: '12 / (2 + 4)', hint: 'The sum of 2 and 4 needs parentheses since it happens before dividing.' },
            { stem: 'Find the next two numbers: 2, 6, 18, 54, __, __', answer: '162, 486 (multiply by 3 each time)', hint: 'What do you multiply each number by to get the next one?' }
        ],
        dok2: [
            { stem: 'Insert parentheses to make this true: 3 + 5 x 2 - 1 = 15', answer: '(3 + 5) x 2 - 1 = 16 - 1 = 15', hint: 'Try grouping the addition first.' },
            { stem: 'A movie ticket costs $8 and popcorn costs $5. Write and evaluate an expression for the cost of 4 tickets and 2 popcorns.', answer: '(4 x 8) + (2 x 5) = 32 + 10 = $42', hint: 'Multiply each item by the number purchased, then add.' },
            { stem: 'Compare these two expressions WITHOUT evaluating: 5 x (30 + 12) and 5 x 30 + 5 x 12. What do you notice?', answer: 'They are equal. This shows the distributive property: 5 x 42 = 150 + 60 = 210.', hint: 'The distributive property lets you multiply a sum by multiplying each part.' },
            { stem: 'The pattern rule is "start at 1, multiply by 2, then add 1." Find the first 5 numbers.', answer: '1, 3, 7, 15, 31 (1→1x2+1=3→3x2+1=7→7x2+1=15→15x2+1=31)', hint: 'Apply the rule to each number to get the next.' },
            { stem: 'Kim says 8 + 12 / 4 = 5. David says 8 + 12 / 4 = 11. Who is correct and why?', answer: 'David is correct. Division first: 12/4 = 3. Then 8 + 3 = 11. Kim incorrectly added before dividing.', hint: 'Apply order of operations: division comes before addition.' },
            { stem: 'Two patterns: Pattern A starts at 0 and adds 3. Pattern B starts at 0 and adds 6. Write the first 5 terms of each. How are the patterns related?', answer: 'A: 0, 3, 6, 9, 12. B: 0, 6, 12, 18, 24. Each term in B is exactly 2 times the corresponding term in A.', hint: 'List both patterns side by side and compare.' },
            { stem: 'A zoo charges $12 per adult and $7 per child. Write an expression for a family with a adults and c children. Then evaluate for 2 adults and 3 children.', answer: 'Expression: 12 x a + 7 x c. For a=2, c=3: 12(2) + 7(3) = 24 + 21 = $45.', hint: 'Multiply each ticket price by the number of people.' }
        ],
        dok3: [
            { stem: 'Using only the numbers 2, 3, 4, 5 and the operations +, -, x, / plus parentheses, create three different expressions that all equal 10. Use each number at most once per expression.', answer: 'Examples: (2 + 3) x (4 - 2) uses 2 twice so try: 5 x 3 - 4 - 2 = 9 (doesn\'t work). Valid: 2 x 5 = 10, (3 + 2) x (4 - 2) needs 2 twice. Options: 2 x 5 = 10, 5 + 4 + 3 - 2 = 10, (4 - 2) x 5 = 10.', hint: 'Start with 10 and think backwards about what operations could produce it.' },
            { stem: 'Maria earns $5 for each dog she walks plus a $3 tip from each owner. She walks dogs on Saturday and Sunday. Write an expression for her total weekend earnings if she walks d dogs on Saturday and (d + 2) dogs on Sunday. Simplify and evaluate for d = 4.', answer: 'Saturday: (5 + 3) x d = 8d. Sunday: (5 + 3) x (d + 2) = 8(d + 2). Total: 8d + 8(d + 2) = 8d + 8d + 16 = 16d + 16. For d = 4: 16(4) + 16 = 64 + 16 = $80.', hint: 'Each dog earns $5 + $3 = $8. Write expressions for each day, then combine.' },
            { stem: 'Two number patterns are created using these rules. Rule A: start at 1, add 5. Rule B: start at 2, add 10. Generate 6 terms of each. Make a conjecture about the relationship between the two patterns. Will term B always be exactly double term A? Prove or disprove.', answer: 'A: 1, 6, 11, 16, 21, 26. B: 2, 12, 22, 32, 42, 52. B is always 2 times A: 2=2x1, 12=2x6, 22=2x11, etc. Proof: A(n) = 1 + 5n, B(n) = 2 + 10n = 2(1 + 5n) = 2 x A(n). Yes, B is always double A.', hint: 'Write out both patterns, then check if multiplying A by 2 always gives B. Try to explain why.' },
            { stem: 'A store has a "mystery discount" machine. You enter a price, it doubles it, subtracts 10, then divides by 2. Is the final price always less than the original? Write an expression, test with 3 different prices, and explain.', answer: 'Expression: ((p x 2) - 10) / 2 = (2p - 10)/2 = p - 5. The machine always subtracts $5 from the original price. Test: $20 → $15, $8 → $3, $30 → $25. Yes, always $5 less. But for prices under $5, the result would be negative (not realistic).', hint: 'Write each step as part of an expression. Simplify and see what pattern emerges.' }
        ]
    },


    // ======================== GRADE 6 ========================

    'locate and compare numbers': {
        grade: 6,
        dok1: [
            { stem: 'Place 3/4 on a number line from 0 to 1.', answer: 'Between 1/2 and 1, closer to 1', hint: 'Divide the line into 4 equal parts.' },
            { stem: 'Which is greater: 0.6 or 0.58?', answer: '0.6 > 0.58', hint: 'Compare the tenths place first.' },
            { stem: 'Order from least to greatest: 1/2, 0.3, 75%', answer: '0.3, 1/2, 75%', hint: 'Convert all to decimals first.' },
            { stem: 'Place 2/5 on a number line from 0 to 1.', answer: 'Between 0 and 1/2, at 0.4', hint: 'Divide the line into 5 equal parts.' },
            { stem: 'Which is greater: 5/8 or 3/4?', answer: '3/4 > 5/8', hint: 'Find a common denominator or convert to decimals.' },
            { stem: 'Compare using < , >, or =: 0.25 ___ 1/4', answer: '0.25 = 1/4', hint: 'Convert the fraction to a decimal.' },
            { stem: 'Place -1.5 on a number line from -3 to 3.', answer: 'Halfway between -2 and -1', hint: 'Find -1 and -2, then find the midpoint.' },
            { stem: 'Order from least to greatest: 7/10, 0.65, 68%', answer: '0.65, 68%, 7/10', hint: 'Convert all to decimals: 0.7, 0.65, 0.68.' },
            { stem: 'Which is less: -2/3 or -3/4?', answer: '-3/4 < -2/3', hint: 'On a number line, -3/4 is farther left. Convert to decimals: -0.75 vs -0.667.' }
        ],
        dok2: [
            { stem: 'Marcus says 3/8 > 3/4 because 8 > 4. Explain why Marcus is incorrect.', answer: 'With equal numerators, larger denominator means smaller pieces. 3/4 > 3/8.', hint: 'Think about what the denominator tells you about the size of each piece.' },
            { stem: 'Place -2.5, 1/3, and 0.75 on the same number line. Which is closest to zero?', answer: '1/3 is closest to zero (about 0.33)', hint: 'Convert all to decimals, then place them.' },
            { stem: 'Kai ran 3/4 mile. Zara ran 0.7 mile. Ana ran 72% of a mile. Who ran the farthest? Show your reasoning.', answer: 'Kai: 0.75 mi, Zara: 0.7 mi, Ana: 0.72 mi. Kai ran the farthest.', hint: 'Convert all distances to decimals to compare.' },
            { stem: 'A recipe calls for more than 1/3 cup but less than 1/2 cup of oil. Which could work: 2/5, 3/8, 5/12, or 1/4?', answer: '2/5 (0.4), 3/8 (0.375), and 5/12 (0.417) all work. 1/4 (0.25) is too small.', hint: '1/3 ≈ 0.333 and 1/2 = 0.5. Convert each option to a decimal.' },
            { stem: 'Explain why 0.5, 50%, and 1/2 all represent the same point on a number line.', answer: 'They are all equivalent: 1/2 = 1÷2 = 0.5, and 0.5 × 100 = 50%.', hint: 'Show each conversion step.' },
            { stem: 'Plot 5/6 and 7/8 on a number line. Which is closer to 1? Explain how you know.', answer: '7/8 is closer to 1 (it is 1/8 away, while 5/6 is 1/6 away, and 1/8 < 1/6).', hint: 'Find how far each fraction is from 1.' },
            { stem: 'Isabella says -0.3 is less than -0.8 because 0.3 is less than 0.8. Is she correct? Explain.', answer: 'No. With negatives, the order reverses. -0.3 > -0.8 because -0.3 is closer to zero.', hint: 'Place both on a number line. Which is farther left?' },
            { stem: 'A weather report lists temperatures of -3°F, 2.5°F, -1/2°F, and 0.75°F. Order them from coldest to warmest.', answer: '-3, -1/2, 0.75, 2.5', hint: 'Convert to decimals: -3, -0.5, 0.75, 2.5.' }
        ],
        dok3: [
            { stem: 'Create three different fractions between 2/5 and 3/5. Explain your strategy.', answer: 'E.g., 9/20, 1/2, 11/20. Strategy: find equivalent fractions with common denominator.', hint: 'Convert to twentieths: 8/20 and 12/20. What goes between?' },
            { stem: 'A student claims there are no fractions between 3/7 and 4/7. Prove the student wrong by finding at least two fractions between them. Describe your method.', answer: 'Convert to fourteenths: 6/14 and 8/14. So 7/14 = 1/2 is between them. Or use 21sts: 9/21, 10/21, 11/21 are all between.', hint: 'Multiply numerator and denominator by the same number to create room.' },
            { stem: 'Design a number line challenge with exactly 5 values — using at least one fraction, one decimal, one percent, and one negative number — where none of the values are equivalent. Explain how you verified the placement of each.', answer: 'E.g., -0.75, 1/5, 0.45, 62%, 7/8. Verify by converting all to decimals: -0.75, 0.2, 0.45, 0.62, 0.875 and checking order.', hint: 'Pick values in different ranges and convert to the same form to check order.' },
            { stem: 'Two students are debating: Is 2/3 or 5/8 closer to 3/4? Determine who is right and justify your answer using at least two different methods.', answer: '3/4 = 0.75. 2/3 ≈ 0.667 (distance 0.083). 5/8 = 0.625 (distance 0.125). So 2/3 is closer. Method 2: common denominator 24: 18/24 vs 16/24 vs 15/24. 16/24 is closer to 18/24.', hint: 'Find the distance from each fraction to 3/4.' }
        ]
    },

    'equivalence and representations': {
        grade: 6,
        dok1: [
            { stem: 'Convert 3/4 to a decimal.', answer: '0.75', hint: 'Divide 3 by 4.' },
            { stem: 'Write 45% as a fraction in simplest form.', answer: '9/20', hint: '45/100 simplifies by dividing by 5.' },
            { stem: 'Convert 0.125 to a fraction.', answer: '1/8', hint: '125/1000 simplifies.' },
            { stem: 'Write 7/8 as a decimal.', answer: '0.875', hint: 'Divide 7 by 8.' },
            { stem: 'Convert 0.4 to a fraction in simplest form.', answer: '2/5', hint: '0.4 = 4/10 = 2/5.' },
            { stem: 'Write 80% as a fraction in simplest form.', answer: '4/5', hint: '80/100, divide both by 20.' },
            { stem: 'Convert 5/6 to a decimal. Is it terminating or repeating?', answer: '0.8333... (repeating)', hint: 'Divide 5 by 6.' },
            { stem: 'Write 0.36 as a percent.', answer: '36%', hint: 'Multiply the decimal by 100.' },
            { stem: 'Convert 2/3 to a percent. Round to one decimal place.', answer: '66.7%', hint: '2 ÷ 3 = 0.6666... = 66.7%.' }
        ],
        dok2: [
            { stem: 'Which is the best deal: 1/3 off, 30% off, or 0.35 off the price?', answer: '0.35 off (35%) is the best deal.', hint: 'Convert all to the same form to compare.' },
            { stem: 'A recipe calls for 0.6 cups of sugar. Express this as a fraction and a percent.', answer: '3/5 cup = 60%', hint: '0.6 = 6/10 = 3/5' },
            { stem: 'Three students measured a plant\'s growth: Ali said 3/8 inch, Bri said 0.375 inch, and Cal said 37.5%. Are they all describing the same amount? Explain.', answer: 'Yes. 3/8 = 0.375 = 37.5%. All three are equivalent representations.', hint: 'Convert each to the same form.' },
            { stem: 'A test has 40 questions. You got 32 right. Express your score as a fraction (simplest form), a decimal, and a percent.', answer: '32/40 = 4/5 = 0.80 = 80%', hint: 'Simplify 32/40 first.' },
            { stem: 'Order from least to greatest: 5/8, 60%, 0.59, 13/20. Show your conversions.', answer: '0.59, 60% (0.60), 5/8 (0.625), 13/20 (0.65)', hint: 'Convert all to decimals.' },
            { stem: 'A survey says 0.125 of students walk to school, 3/8 take the bus, and 35% get a ride. What fraction of students are accounted for? Is anyone missing?', answer: '0.125 + 0.375 + 0.35 = 0.85 = 85%. Yes, 15% are unaccounted for.', hint: 'Convert all to decimals or percents and add.' },
            { stem: 'Explain why 1/3 cannot be written as a terminating decimal but 1/4 can.', answer: '1/4 = 0.25 (denominator has only factors of 2). 1/3 = 0.333... because 3 is not a factor of any power of 10.', hint: 'Look at the prime factors of each denominator.' },
            { stem: 'A tank is 3/5 full. After adding water, it is 0.85 full. What percent of the tank was added?', answer: '3/5 = 0.60 = 60%. Added: 85% - 60% = 25% of the tank.', hint: 'Convert 3/5 to a percent first.' }
        ],
        dok3: [
            { stem: 'A store advertises "Buy 2, get 1 free." What percent discount is this per item? Explain.', answer: 'You pay for 2 out of 3 items, so 1/3 off = about 33.3% discount per item.', hint: 'Think about total cost vs. total items.' },
            { stem: 'Write a fraction that, when converted to a decimal, gives a repeating decimal with exactly a 2-digit repeating block. Then prove it repeats by showing the long division.', answer: 'E.g., 1/11 = 0.090909... The repeating block is 09. Long division: 1÷11 gives remainder pattern 1, 10, 1, 10...', hint: 'Try fractions with 11 or 99 in the denominator.' },
            { stem: 'A food label says a serving has 4.5g fat out of 15g total. Another brand has 28% fat. A third has 3/10 fat. Rank them from least to most fat and justify using at least two different representation forms.', answer: 'Brand 1: 4.5/15 = 0.30 = 30%. Brand 2: 28%. Brand 3: 3/10 = 30%. Ranking: Brand 2 (28%) < Brand 1 = Brand 3 (30%).', hint: 'Convert each to the same form for comparison.' },
            { stem: 'Create a set of four values — one fraction, one decimal, one percent, and one ratio — that are all equivalent to each other. Then explain how you could verify all four are equal using a different method for each pair.', answer: 'E.g., 3/4, 0.75, 75%, 3:4. Verify: 3÷4 = 0.75 (fraction→decimal), 0.75 × 100 = 75% (decimal→percent), 3/4 means 3 out of 4 = 3:4 (fraction→ratio).', hint: 'Start with a simple fraction and convert step by step.' }
        ]
    },

    'factors primes gcf lcm': {
        grade: 6,
        dok1: [
            { stem: 'List all factors of 36.', answer: '1, 2, 3, 4, 6, 9, 12, 18, 36', hint: 'Check each number 1 through 36.' },
            { stem: 'Is 17 prime or composite?', answer: 'Prime (only factors are 1 and 17)', hint: 'Try dividing by 2, 3, 4...' },
            { stem: 'Find the GCF of 24 and 36.', answer: '12', hint: 'List factors of each, find the largest shared one.' },
            { stem: 'Write the prime factorization of 60.', answer: '2² × 3 × 5', hint: 'Start by dividing by the smallest prime.' },
            { stem: 'Find the LCM of 4 and 6.', answer: '12', hint: 'List multiples of each until you find one in common.' },
            { stem: 'Is 51 prime or composite?', answer: 'Composite (51 = 3 × 17)', hint: 'Check if 3 divides into 51 evenly.' },
            { stem: 'List the first five multiples of 9.', answer: '9, 18, 27, 36, 45', hint: 'Multiply 9 by 1, 2, 3, 4, 5.' },
            { stem: 'Find the GCF of 18 and 27.', answer: '9', hint: 'Factors of 18: 1,2,3,6,9,18. Factors of 27: 1,3,9,27.' },
            { stem: 'Write the prime factorization of 84.', answer: '2² × 3 × 7', hint: '84 ÷ 2 = 42, 42 ÷ 2 = 21, 21 ÷ 3 = 7.' }
        ],
        dok2: [
            { stem: 'Use prime factorization to find the LCM of 12 and 18.', answer: 'LCM = 36 (2² × 3²)', hint: '12 = 2² × 3, 18 = 2 × 3²' },
            { stem: 'Two runners lap a track every 6 and 8 minutes. When will they meet at the start together?', answer: 'After 24 minutes (LCM of 6 and 8)', hint: 'Find the LCM.' },
            { stem: 'You have 48 red marbles and 64 blue marbles. You want to put them in bags with the same number of reds and the same number of blues in each bag, with none left over. What is the greatest number of bags you can make?', answer: '16 bags (GCF of 48 and 64). Each bag: 3 red, 4 blue.', hint: 'The number of bags must be a factor of both 48 and 64.' },
            { stem: 'Explain why every even number greater than 2 is composite.', answer: 'Every even number has 2 as a factor in addition to 1 and itself, so it has at least 3 factors.', hint: 'What does "even" tell you about factors?' },
            { stem: 'Use prime factorization to find the GCF of 54 and 90.', answer: '54 = 2 × 3³, 90 = 2 × 3² × 5. GCF = 2 × 3² = 18.', hint: 'Take the smallest power of each shared prime factor.' },
            { stem: 'Hot dogs come in packs of 8 and buns in packs of 6. What is the smallest number of each you must buy to have an equal number with none left over?', answer: 'LCM of 8 and 6 = 24. Buy 3 packs of dogs and 4 packs of buns.', hint: 'Find the LCM of 8 and 6.' },
            { stem: 'Find two numbers whose GCF is 8 and LCM is 96. Explain your strategy.', answer: 'E.g., 32 and 24. Strategy: GCF = 8, so both are multiples of 8. Check that LCM(32,24) = 96.', hint: 'Both numbers must be multiples of the GCF.' },
            { stem: 'Three alarms go off at intervals of 10, 15, and 20 minutes. If they all go off at noon, when will they next all go off at the same time?', answer: 'LCM of 10, 15, 20 = 60. They all go off at 1:00 PM.', hint: 'Find the LCM of all three intervals.' }
        ],
        dok3: [
            { stem: 'The GCF of two numbers is 6 and their LCM is 72. If one number is 24, what is the other?', answer: '18 (because GCF × LCM = product of the two numbers: 6 × 72 = 432, 432/24 = 18)', hint: 'Use: GCF × LCM = a × b' },
            { stem: 'A florist has 84 roses, 60 tulips, and 36 daisies. She wants to make identical bouquets with no flowers left over. What is the greatest number of bouquets she can make, and how many of each flower per bouquet? Justify your answer.', answer: 'GCF of 84, 60, 36 = 12 bouquets. Each bouquet: 7 roses, 5 tulips, 3 daisies. Verify: 12×7=84, 12×5=60, 12×3=36.', hint: 'Find the GCF of all three numbers.' },
            { stem: 'Prove that the product of any two consecutive integers is always even. Use the concept of prime factorization in your argument.', answer: 'Of two consecutive integers, one must be even (divisible by 2). So the product always has 2 as a prime factor, making it even.', hint: 'Think about what consecutive means — can both be odd?' },
            { stem: 'Elena says the LCM of two numbers is always greater than either number. Find a counterexample and explain when her statement fails.', answer: 'Counterexample: LCM of 4 and 8 is 8, which equals one of the numbers. This happens when one number is a multiple of the other.', hint: 'Try two numbers where one divides the other evenly.' }
        ]
    },

    'ratios and rates': {
        grade: 6,
        dok1: [
            { stem: 'Write the ratio of 3 cats to 5 dogs in three ways.', answer: '3:5, 3/5, 3 to 5', hint: 'Ratios can be written with a colon, fraction, or words.' },
            { stem: 'Find the unit rate: 240 miles in 4 hours.', answer: '60 miles per hour', hint: 'Divide 240 by 4.' },
            { stem: 'Simplify the ratio 12:8.', answer: '3:2', hint: 'Divide both parts by the GCF, which is 4.' },
            { stem: 'A class has 14 boys and 16 girls. Write the ratio of boys to total students.', answer: '14:30 or 7:15', hint: 'Total students = 14 + 16 = 30.' },
            { stem: 'Find the unit rate: $7.50 for 3 pounds.', answer: '$2.50 per pound', hint: 'Divide $7.50 by 3.' },
            { stem: 'Write an equivalent ratio to 5:3 with a first term of 20.', answer: '20:12', hint: 'Multiply both parts by 4.' },
            { stem: 'A car uses 2 gallons for every 50 miles. What is the rate in miles per gallon?', answer: '25 miles per gallon', hint: 'Divide 50 by 2.' },
            { stem: 'In a bag of candy, 6 are red and 9 are blue. What is the ratio of red to blue in simplest form?', answer: '2:3', hint: 'Divide both by 3.' }
        ],
        dok2: [
            { stem: 'A recipe uses 2 cups flour for 3 dozen cookies. How much flour for 9 dozen?', answer: '6 cups flour', hint: 'Set up a proportion: 2/3 = x/9' },
            { stem: 'Store A: 5 apples for $3. Store B: 8 apples for $5. Which is the better buy?', answer: 'Store A ($0.60/apple) vs Store B ($0.625/apple). Store A is better.', hint: 'Calculate the unit price at each store.' },
            { stem: 'A truck travels 350 miles on 14 gallons. A car travels 280 miles on 10 gallons. Which vehicle is more fuel efficient?', answer: 'Truck: 25 mpg. Car: 28 mpg. The car is more fuel efficient.', hint: 'Find the unit rate (mpg) for each.' },
            { stem: 'Purple paint is mixed 3 parts red to 2 parts blue. How much red paint do you need if you have 8 cups of blue?', answer: '12 cups red (3/2 = x/8, x = 12)', hint: 'Set up the proportion using the ratio.' },
            { stem: 'On a map, 2 cm represents 15 km. Two cities are 9 cm apart on the map. What is the actual distance?', answer: '67.5 km (2/15 = 9/x or 15/2 × 9 = 67.5)', hint: 'Set up and solve a proportion.' },
            { stem: 'A pitcher made 18 strikes out of 30 pitches. At this rate, how many strikes would she throw in 100 pitches?', answer: '60 strikes (18/30 = x/100, x = 60)', hint: 'Find the ratio and scale up.' },
            { stem: 'Leo reads 45 pages in 1.5 hours. Maya reads 32 pages in 50 minutes. Who reads faster? By how much?', answer: 'Leo: 30 pages/hr. Maya: 32/50 × 60 = 38.4 pages/hr. Maya is faster by 8.4 pages/hr.', hint: 'Convert both to pages per hour.' },
            { stem: 'A trail mix recipe uses almonds, cashews, and raisins in a ratio of 4:3:2. If you want 36 cups total, how many cups of each?', answer: '4+3+2 = 9 parts. 36÷9 = 4. Almonds: 16, Cashews: 12, Raisins: 8.', hint: 'Find total parts, then divide.' }
        ],
        dok3: [
            { stem: 'A map scale is 1 inch = 25 miles. Two cities are 3.5 inches apart on the map. Your car gets 30 mpg and gas costs $3.50/gallon. How much will the trip cost in gas?', answer: '87.5 miles ÷ 30 mpg = 2.917 gal × $3.50 = $10.21', hint: 'First find actual distance, then gallons needed, then cost.' },
            { stem: 'A school wants to buy pencils. Brand X: 12 for $2.40. Brand Y: 20 for $3.80. Brand Z: buy-3-get-1-free at $0.25 each. The school needs exactly 60 pencils. Which brand gives the best total price? Show all work.', answer: 'X: 5 packs = $12.00. Y: 3 packs = $11.40. Z: pay for 45 (get 15 free) = $11.25. Brand Z is cheapest.', hint: 'Find cost for exactly 60 pencils from each brand.' },
            { stem: 'A painter mixes custom green paint using 3 parts yellow to 2 parts blue. She has 5 cups of green paint left over but needs more. She only has blue paint available. Can she add just blue paint to shift the ratio to 3:4 (yellow:blue)? How much blue should she add?', answer: 'Original 5 cups: 3 yellow, 2 blue. New ratio 3:4 means she needs 4 cups blue for 3 cups yellow. She needs 4 - 2 = 2 more cups of blue. Final mix: 3 yellow + 4 blue = 7 cups.', hint: 'Figure out how much yellow and blue are in the current mix, then determine how much blue to add.' }
        ]
    },

    'multiplication and division of fractions': {
        grade: 6,
        dok1: [
            { stem: 'Multiply: 2/3 × 4/5', answer: '8/15', hint: 'Multiply numerators, multiply denominators.' },
            { stem: 'Divide: 3/4 ÷ 1/2', answer: '3/2 or 1 1/2', hint: 'Invert the second fraction and multiply.' },
            { stem: 'What is 1/3 of 24?', answer: '8', hint: 'Multiply 24 by 1/3.' },
            { stem: 'Multiply: 5/6 × 3/10', answer: '15/60 = 1/4', hint: 'Multiply straight across, then simplify.' },
            { stem: 'Divide: 2/5 ÷ 4/5', answer: '2/5 × 5/4 = 10/20 = 1/2', hint: 'Flip the second fraction and multiply.' },
            { stem: 'What is 3/4 × 16?', answer: '12', hint: 'Multiply 16 by 3, then divide by 4.' },
            { stem: 'Divide: 6 ÷ 2/3', answer: '6 × 3/2 = 9', hint: 'Dividing by a fraction means multiplying by its reciprocal.' },
            { stem: 'Multiply: 1/2 × 2/7', answer: '2/14 = 1/7', hint: 'Multiply numerators and denominators, then simplify.' },
            { stem: 'Find 2/5 of 35.', answer: '14', hint: 'Multiply: 2/5 × 35 = 70/5 = 14.' }
        ],
        dok2: [
            { stem: 'A board is 5/6 foot long. You cut it into pieces that are 1/12 foot each. How many pieces?', answer: '10 pieces (5/6 ÷ 1/12 = 10)', hint: 'Divide the total length by the piece length.' },
            { stem: 'Draw an area model showing 2/3 × 3/4. What fraction of the whole is shaded?', answer: '6/12 = 1/2 of the whole is shaded.', hint: 'Draw a rectangle, divide into thirds one way and fourths the other.' },
            { stem: 'A garden plot is 3/4 acre. You plant vegetables on 2/3 of it. How many acres of vegetables?', answer: '3/4 × 2/3 = 6/12 = 1/2 acre', hint: 'Multiply the two fractions.' },
            { stem: 'You have 4/5 pound of trail mix to share equally among 6 friends. How much does each person get?', answer: '4/5 ÷ 6 = 4/30 = 2/15 pound each', hint: 'Divide the total by 6 (multiply by 1/6).' },
            { stem: 'A ribbon is 7/8 yard long. How many 1/4-yard pieces can you cut? Will there be any ribbon left over?', answer: '7/8 ÷ 1/4 = 7/8 × 4 = 7/2 = 3.5. So 3 pieces with 1/8 yard left over.', hint: 'Divide, then interpret the remainder.' },
            { stem: 'Explain why dividing by 1/2 is the same as multiplying by 2. Use an example.', answer: 'Dividing by 1/2 asks "how many halves fit in?" E.g., 3 ÷ 1/2 = 6 because there are 6 halves in 3 wholes.', hint: 'Think about what division means.' },
            { stem: 'A painter used 2/3 of a gallon to paint 4/5 of a wall. At this rate, how much paint is needed for the whole wall?', answer: '(2/3) ÷ (4/5) = 2/3 × 5/4 = 10/12 = 5/6 gallon for the whole wall.', hint: 'Divide paint used by fraction of wall completed.' },
            { stem: 'A pool fills at 3/4 gallon per minute. The pool holds 90 gallons. How many minutes to fill it?', answer: '90 ÷ 3/4 = 90 × 4/3 = 120 minutes', hint: 'Divide total capacity by the rate.' }
        ],
        dok3: [
            { stem: 'A recipe calls for 3/4 cup sugar. You want to make 2/3 of the recipe. Your only measuring cup is 1/8 cup. How many scoops?', answer: '3/4 × 2/3 = 1/2 cup. Then 1/2 ÷ 1/8 = 4 scoops.', hint: 'First find how much sugar, then figure out scoops.' },
            { stem: 'A piece of fabric is 5/3 yards long. A craft project needs 2/9 yard per item. You want to make as many items as possible and donate leftover fabric. How many items can you make, and how much fabric is donated?', answer: '5/3 ÷ 2/9 = 5/3 × 9/2 = 45/6 = 7.5. Make 7 items. Used: 7 × 2/9 = 14/9 yards. Left: 5/3 - 14/9 = 15/9 - 14/9 = 1/9 yard donated.', hint: 'Divide to find how many full items, then calculate the remainder.' },
            { stem: 'Sam ran 3/5 of a trail in 1/2 hour. At the same pace, how long would the entire trail take? If the trail is 2 1/4 miles long, what is Sam\'s speed in miles per hour?', answer: 'Full trail time: (1/2) ÷ (3/5) = 1/2 × 5/3 = 5/6 hour. Speed: 2.25 ÷ (5/6) = 2.25 × 6/5 = 13.5/5 = 2.7 mph.', hint: 'First find total time, then use distance ÷ time = speed.' },
            { stem: 'Create a word problem where the answer requires multiplying a fraction by a fraction AND then dividing the result by another fraction. Solve your own problem.', answer: 'Example: A farm is 3/4 acre. You plant corn on 2/3 of it. Each row of corn needs 1/6 acre. How many rows fit? Solution: 3/4 × 2/3 = 1/2 acre of corn. 1/2 ÷ 1/6 = 3 rows.', hint: 'Think of a context where you find a part of a part, then divide into equal portions.' }
        ]
    },

    'percent': {
        grade: 6,
        dok1: [
            { stem: 'What is 25% of 80?', answer: '20', hint: '0.25 × 80' },
            { stem: 'Convert 3/5 to a percent.', answer: '60%', hint: '3 ÷ 5 = 0.6 = 60%' },
            { stem: 'What is 10% of 250?', answer: '25', hint: 'Move the decimal one place left.' },
            { stem: 'Find 50% of 64.', answer: '32', hint: '50% means half.' },
            { stem: 'What percent is 15 out of 60?', answer: '25%', hint: '15/60 = 1/4 = 0.25.' },
            { stem: 'What is 1% of 400?', answer: '4', hint: 'Divide 400 by 100.' },
            { stem: 'Convert 0.08 to a percent.', answer: '8%', hint: 'Multiply by 100.' },
            { stem: 'Find 75% of 120.', answer: '90', hint: '0.75 × 120 = 90.' },
            { stem: 'What is 20% of 55?', answer: '11', hint: '0.20 × 55 = 11.' }
        ],
        dok2: [
            { stem: 'A shirt costs $40 and is 15% off. What is the sale price?', answer: '$34 (discount = $6)', hint: '15% of 40 = 6' },
            { stem: 'You scored 18 out of 24. What percent did you get?', answer: '75%', hint: '18/24 = 3/4 = 0.75' },
            { stem: 'A bike originally costs $200. It is on sale for $170. What percent discount is that?', answer: '15% off ($30 discount, 30/200 = 0.15)', hint: 'Find the discount amount first, then divide by original price.' },
            { stem: 'A town had a population of 4,000. It grew by 12%. What is the new population?', answer: '4,480 (4,000 × 0.12 = 480; 4,000 + 480 = 4,480)', hint: 'Find 12% of 4,000 and add it.' },
            { stem: 'A meal costs $32. You want to leave a 20% tip. The tax is 7%. What is the total bill (tip and tax calculated on the meal price)?', answer: 'Tip: $6.40, Tax: $2.24. Total: $32 + $6.40 + $2.24 = $40.64', hint: 'Calculate tip and tax separately, then add all three.' },
            { stem: 'A tablet was $300 last year and now costs $255. What was the percent decrease?', answer: '15% decrease (300 - 255 = 45, 45/300 = 0.15)', hint: 'Percent change = (change ÷ original) × 100.' },
            { stem: 'You deposited $500 in a savings account that earns 3% interest per year. How much interest do you earn in one year? What is your new balance?', answer: 'Interest: $500 × 0.03 = $15. New balance: $515.', hint: 'Multiply the deposit by the interest rate.' },
            { stem: 'In a class of 28 students, 7 were absent. What percent of the class was present?', answer: '21/28 = 75% present', hint: 'First find how many were present.' }
        ],
        dok3: [
            { stem: 'A store marks up items 40%, then puts them on sale for 25% off. Is the final price more or less than the original cost? By how much percent?', answer: 'Final = 1.40 × 0.75 = 1.05 = 5% more than original cost.', hint: 'Apply markup first, then discount.' },
            { stem: 'Two stores sell the same jacket. Store A: original $80, 30% off, then additional 10% off the sale price. Store B: original $85, 35% off. Which store has the lower final price? By how much?', answer: 'Store A: $80 × 0.70 = $56, then $56 × 0.90 = $50.40. Store B: $85 × 0.65 = $55.25. Store A is cheaper by $4.85.', hint: 'Apply each discount step by step.' },
            { stem: 'A population decreased by 20% one year and increased by 25% the next year. Is the final population the same as the original? Prove your answer with any starting number.', answer: 'Start with 100. After 20% decrease: 80. After 25% increase: 80 × 1.25 = 100. Yes, it returns to the original. This works because 0.80 × 1.25 = 1.00.', hint: 'Try starting with 100 and apply each change.' },
            { stem: 'A family budgets their $3,600 monthly income: 30% rent, 20% food, 15% transportation, 10% savings, and the rest for other expenses. After a 5% raise, they keep all dollar amounts the same except savings, which gets all the extra income. What is their new savings percent?', answer: 'New income: $3,780. Old other categories: $2,700. New savings: $3,780 - $2,700 = $1,080. Old savings: $360. New savings percent: 1,080/3,780 = 28.6%.', hint: 'Calculate dollar amounts for each category first, then recalculate savings with the new income.' }
        ]
    },

    // ======================== GRADE 7 ========================

    'proportional relationships': {
        grade: 7,
        dok1: [
            { stem: 'In the equation y = 7x, what is the constant of proportionality?', answer: '7', hint: 'The constant of proportionality is the number multiplied by x.' },
            { stem: 'Does the equation y = 3x + 1 represent a proportional relationship?', answer: 'No, because it does not pass through the origin (0,0).', hint: 'Proportional relationships have the form y = kx with no added constant.' },
            { stem: 'A recipe uses 2 cups of flour for every 5 cookies. Write an equation relating flour (f) to cookies (c).', answer: 'f = (2/5)c', hint: 'Find the ratio of flour to cookies and use it as k in y = kx.' },
            { stem: 'What is the constant of proportionality in the table: x = 1, y = 4; x = 2, y = 8; x = 3, y = 12?', answer: '4', hint: 'Divide any y-value by its corresponding x-value.' },
            { stem: 'If y = 12x, what is y when x = 5?', answer: '60', hint: 'Substitute x = 5 into the equation and multiply.' },
            { stem: 'A proportional relationship passes through (0, 0) and (3, 15). What is k?', answer: '5', hint: 'Divide y by x: 15 ÷ 3.' },
            { stem: 'True or false: The graph of every proportional relationship is a straight line through the origin.', answer: 'True', hint: 'Proportional relationships have the form y = kx, which always passes through (0, 0).' },
            { stem: 'In y = (3/4)x, what is y when x = 8?', answer: '6', hint: 'Multiply: (3/4) × 8.' },
            { stem: 'Identify the constant of proportionality: A car travels 60 miles every 1 hour.', answer: '60 miles per hour', hint: 'The constant of proportionality is the rate: miles ÷ hours.' }
        ],
        dok2: [
            { stem: 'A store sells 3 notebooks for $4.50. At this rate, how much would 10 notebooks cost?', answer: '$15.00', hint: 'Find the unit price first: $4.50 ÷ 3 = $1.50 per notebook.' },
            { stem: 'Marcus earns $9.50 per hour. He wants to buy a $142.50 skateboard. How many hours must he work?', answer: '15 hours', hint: 'Divide the total cost by the hourly rate: $142.50 ÷ $9.50.' },
            { stem: 'Two runners are training. Runner A goes 6 miles in 48 minutes. Runner B goes 8 miles in 56 minutes. Who runs at a faster rate?', answer: 'Runner B (about 8.57 min/mile vs. 8 min/mile for Runner A). Actually Runner A: 48÷6 = 8 min/mile, Runner B: 56÷8 = 7 min/mile. Runner B is faster.', hint: 'Find each runner\'s minutes per mile and compare.' },
            { stem: 'The table shows x: 2, 5, 8 and y: 7, 17.5, 28. Is this a proportional relationship? If so, what is k?', answer: 'Yes; k = 3.5', hint: 'Check if y ÷ x gives the same value for all pairs.' },
            { stem: 'A machine fills 240 bottles in 4 minutes. Write an equation and predict how many bottles it fills in 15 minutes.', answer: 'b = 60t; 900 bottles', hint: 'Find the rate: 240 ÷ 4 = 60 bottles per minute.' },
            { stem: 'On a graph, Line A passes through (0, 0) and (4, 10). Line B passes through (0, 2) and (4, 12). Which represents a proportional relationship and why?', answer: 'Line A, because it passes through the origin.', hint: 'A proportional relationship must pass through (0, 0).' },
            { stem: 'A recipe calls for 2.5 cups of sugar for every 4 cups of flour. If you use 14 cups of flour, how many cups of sugar do you need?', answer: '8.75 cups', hint: 'Set up the proportion: 2.5/4 = x/14 and solve.' },
            { stem: 'Jasmine drove 195 miles using 6.5 gallons of gas. At this rate, how far can she drive on a full 14-gallon tank?', answer: '420 miles', hint: 'Find miles per gallon: 195 ÷ 6.5 = 30 mpg, then multiply by 14.' },
            { stem: 'The equation y = 4.5x represents the cost y in dollars of x pounds of deli meat. How much more does 6 pounds cost than 4 pounds?', answer: '$9.00', hint: 'Calculate y for both values and subtract: 4.5(6) − 4.5(4).' }
        ],
        dok3: [
            { stem: 'A phone plan charges $0.05 per text message with no base fee. A second plan charges $10/month plus $0.02 per text. Are both proportional relationships? At what number of texts do they cost the same? Which is cheaper for someone who sends 500 texts/month?', answer: 'Only Plan 1 is proportional (y = 0.05x). They cost the same at about 333 texts. For 500 texts, Plan 1 costs $25 and Plan 2 costs $20, so Plan 2 is cheaper.', hint: 'Set 0.05x = 10 + 0.02x and solve for x. Then evaluate both at 500.' },
            { stem: 'A painter mixes blue and yellow paint in a 3:5 ratio to make green. She needs 12 gallons of green paint total. She already has 2 gallons of blue and 4 gallons of yellow. How much more of each color must she buy? Justify that the final mixture maintains the ratio.', answer: 'She needs 4.5 gal blue and 7.5 gal yellow total. Buy 2.5 gal more blue and 3.5 gal more yellow. 4.5/7.5 = 3/5 confirms the ratio.', hint: 'Total = 12 gal. Blue = (3/8)×12 = 4.5 gal, Yellow = (5/8)×12 = 7.5 gal. Subtract what she has.' },
            { stem: 'Three friends each claim to have the best deal on gasoline. Alex paid $36 for 10 gallons, Briana paid $52.50 for 15 gallons, and Carlos paid $24.15 for 7 gallons. Rank them from best to worst deal and determine whether each represents the same proportional relationship.', answer: 'Alex: $3.60/gal, Briana: $3.50/gal, Carlos: $3.45/gal. Best to worst: Carlos, Briana, Alex. They are not the same proportional relationship because k differs.', hint: 'Find the unit rate (price per gallon) for each person and compare.' },
            { stem: 'A factory produces widgets at a constant rate. On Monday it produced 450 widgets in 6 hours, but 2 hours were lost to a breakdown. On Tuesday it ran all 8 hours with no breakdowns. How many widgets were produced each day? Is the relationship between hours worked and widgets produced proportional? Explain.', answer: 'Rate = 450 ÷ 4 = 112.5 widgets/hr (only 4 working hours Monday). Monday: 450 widgets. Tuesday: 112.5 × 8 = 900 widgets. Yes, the relationship between working hours and widgets is proportional (y = 112.5x), but total hours on-site vs. production is not proportional on Monday.', hint: 'Monday had only 6 − 2 = 4 actual working hours. Find the rate from those hours.' }
        ]
    },
    'circumference and area of circles': {
        grade: 7,
        dok1: [
            { stem: 'What is the circumference of a circle with radius 5 cm? Use π ≈ 3.14.', answer: '31.4 cm', hint: 'Use C = 2πr: 2 × 3.14 × 5.' },
            { stem: 'What is the area of a circle with radius 3 in? Use π ≈ 3.14.', answer: '28.26 in²', hint: 'Use A = πr²: 3.14 × 3 × 3.' },
            { stem: 'A circle has a diameter of 12 m. What is its circumference? Use π ≈ 3.14.', answer: '37.68 m', hint: 'Use C = πd: 3.14 × 12.' },
            { stem: 'What is the radius of a circle with diameter 20 ft?', answer: '10 ft', hint: 'The radius is half the diameter.' },
            { stem: 'Find the area of a circle with radius 10 cm. Use π ≈ 3.14.', answer: '314 cm²', hint: 'Use A = πr²: 3.14 × 10².' },
            { stem: 'What is the circumference of a circle with radius 1 m? Leave your answer in terms of π.', answer: '2π m', hint: 'Use C = 2πr: 2 × π × 1.' },
            { stem: 'A circle has a diameter of 7 inches. What is its radius?', answer: '3.5 inches', hint: 'Divide the diameter by 2.' },
            { stem: 'Find the area of a circle with diameter 8 cm. Use π ≈ 3.14.', answer: '50.24 cm²', hint: 'First find the radius (4 cm), then use A = πr².' },
            { stem: 'What formula is used to find the circumference of a circle given the radius?', answer: 'C = 2πr', hint: 'It involves multiplying 2, π, and the radius.' }
        ],
        dok2: [
            { stem: 'A circular garden has a radius of 8 feet. How much fencing is needed to go around it? Use π ≈ 3.14.', answer: '50.24 feet', hint: 'Fencing goes around the outside, so find the circumference: C = 2πr.' },
            { stem: 'A pizza has a diameter of 14 inches. What is the area of the pizza? Use π ≈ 3.14.', answer: '153.86 in²', hint: 'Radius = 7 in. Use A = πr².' },
            { stem: 'A circular fountain has a circumference of 25.12 meters. What is its radius? Use π ≈ 3.14.', answer: '4 m', hint: 'Use C = 2πr and solve for r: r = C ÷ (2π).' },
            { stem: 'Find the area of a semicircle with diameter 10 cm. Use π ≈ 3.14.', answer: '39.25 cm²', hint: 'Find the area of the full circle (r = 5) and divide by 2.' },
            { stem: 'A cylindrical can has radius 3 cm and height 10 cm. What is its volume? Use π ≈ 3.14.', answer: '282.6 cm³', hint: 'Volume of a cylinder: V = πr²h.' },
            { stem: 'A sprinkler waters a circular area with a 15-foot radius. What area of lawn does it cover? Use π ≈ 3.14.', answer: '706.5 ft²', hint: 'Use A = πr²: 3.14 × 15².' },
            { stem: 'A bike wheel has a diameter of 26 inches. How far does the bike travel in one full rotation of the wheel? Use π ≈ 3.14.', answer: '81.64 inches', hint: 'One rotation covers a distance equal to the circumference: C = πd.' },
            { stem: 'A cylindrical water tank has a diameter of 4 m and height of 6 m. Find its volume. Use π ≈ 3.14.', answer: '75.36 m³', hint: 'Radius = 2 m. Use V = πr²h: 3.14 × 4 × 6.' },
            { stem: 'A circular track has an outer radius of 50 m and an inner radius of 45 m. What is the area of the track itself? Use π ≈ 3.14.', answer: '1,492.5 m²', hint: 'Subtract the inner circle area from the outer: π(50²) − π(45²).' }
        ],
        dok3: [
            { stem: 'A farmer wants to fence a circular pen and also divide it in half with a straight fence through the center. The pen has a radius of 20 m. How much total fencing does the farmer need? Use π ≈ 3.14.', answer: '165.6 m (circumference = 125.6 m + diameter = 40 m)', hint: 'Total fencing = circumference + one diameter (the dividing fence).' },
            { stem: 'A company manufactures cylindrical cans. Can A has radius 4 cm and height 10 cm. Can B has radius 5 cm and height 6 cm. Which can holds more and by how much? Which can uses less material for its lateral surface? Use π ≈ 3.14.', answer: 'Can A: V = 502.4 cm³, Can B: V = 471 cm³. Can A holds 31.4 cm³ more. Lateral SA: Can A = 251.2 cm², Can B = 188.4 cm². Can B uses less material.', hint: 'Volume = πr²h. Lateral surface area = 2πrh. Calculate both for each can.' },
            { stem: 'A circular park has a radius of 30 meters. A walking path 2 meters wide is built around the outside of the park. What is the area of just the walking path? If it costs $12 per square meter to pave, what is the total cost? Use π ≈ 3.14.', answer: 'Path area = π(32²) − π(30²) = π(1024 − 900) = 3.14 × 124 = 389.36 m². Cost = 389.36 × $12 = $4,672.32.', hint: 'The path forms a ring (annulus). Outer radius = 30 + 2 = 32 m. Subtract inner circle area from outer.' },
            { stem: 'You have 100 feet of fencing. You can build either a circular pen or a square pen. Which shape gives more enclosed area? By how much? Use π ≈ 3.14.', answer: 'Circle: r = 100/(2π) ≈ 15.92 ft, A = π(15.92²) ≈ 795.5 ft². Square: side = 25 ft, A = 625 ft². The circle gives about 170.5 ft² more area.', hint: 'For the circle, set C = 100 and solve for r, then find A = πr². For the square, side = 100 ÷ 4.' }
        ]
    },
    'similarity and scaling': {
        grade: 7,
        dok1: [
            { stem: 'A map has a scale of 1 cm = 50 km. Two cities are 3 cm apart on the map. What is the actual distance?', answer: '150 km', hint: 'Multiply the map distance by the scale factor: 3 × 50.' },
            { stem: 'A scale drawing uses a scale of 1 inch = 4 feet. What is the scale factor?', answer: '1:48 (since 4 feet = 48 inches)', hint: 'Convert to the same units: 4 feet = 48 inches, so 1:48.' },
            { stem: 'Two similar triangles have a scale factor of 2:5. If the smaller triangle has a side of 6 cm, what is the corresponding side of the larger triangle?', answer: '15 cm', hint: 'Set up the proportion: 2/5 = 6/x and solve for x.' },
            { stem: 'A rectangle is 4 cm by 6 cm. A similar rectangle has its shorter side equal to 8 cm. What is its longer side?', answer: '12 cm', hint: 'The scale factor is 8 ÷ 4 = 2. Multiply the longer side by 2.' },
            { stem: 'If a scale drawing has a scale of 1:100, how long is a wall that measures 5 cm on the drawing?', answer: '500 cm (or 5 m)', hint: 'Multiply the drawing measurement by 100.' },
            { stem: 'What does it mean for two figures to be similar?', answer: 'They have the same shape with proportional corresponding sides and equal corresponding angles.', hint: 'Think about shape vs. size.' },
            { stem: 'A model car is built at a 1:24 scale. The real car is 192 inches long. How long is the model?', answer: '8 inches', hint: 'Divide the real length by the scale factor: 192 ÷ 24.' },
            { stem: 'Triangle ABC ~ Triangle DEF with a scale factor of 3:1. If angle A = 45°, what is angle D?', answer: '45°', hint: 'Similar figures have equal corresponding angles.' }
        ],
        dok2: [
            { stem: 'A blueprint uses a scale of 1/4 inch = 1 foot. A room measures 3.5 inches by 4 inches on the blueprint. What are the actual dimensions?', answer: '14 feet by 16 feet', hint: 'Each 1/4 inch = 1 foot, so multiply each dimension by 4.' },
            { stem: 'A photograph is 4 inches by 6 inches. It is enlarged with a scale factor of 2.5. What are the new dimensions and how does the area change?', answer: 'New dimensions: 10 in by 15 in. New area = 150 in², original = 24 in². Area is 6.25 times larger (2.5² = 6.25).', hint: 'Multiply each dimension by 2.5. Area scales by the square of the scale factor.' },
            { stem: 'Two similar rectangles have areas of 18 cm² and 72 cm². What is the scale factor of their corresponding sides?', answer: '1:2', hint: 'Area ratio = 72/18 = 4. Scale factor = √4 = 2, so 1:2.' },
            { stem: 'On a map with scale 1:25,000, a lake measures 3.2 cm by 1.8 cm. What are the actual dimensions in meters?', answer: '800 m by 450 m', hint: 'Multiply each by 25,000 to get cm, then convert to meters (÷ 100).' },
            { stem: 'A triangular park has sides 200 m, 300 m, and 400 m. A scale drawing is made where the longest side is 10 cm. What are the other two sides on the drawing?', answer: '5 cm and 7.5 cm', hint: 'Scale factor: 10/400 = 1/40. Multiply each side by 1/40.' },
            { stem: 'A tree casts a shadow 24 feet long. At the same time, a 5-foot person casts a shadow 8 feet long. How tall is the tree?', answer: '15 feet', hint: 'Set up similar triangles: 5/8 = x/24.' },
            { stem: 'An architect makes a model of a building at 1:200 scale. The model is 15 cm tall. What is the actual building height in meters?', answer: '30 m', hint: '15 × 200 = 3,000 cm = 30 m.' },
            { stem: 'Two similar triangles have a scale factor of 3:4. The perimeter of the smaller triangle is 27 cm. What is the perimeter of the larger triangle?', answer: '36 cm', hint: 'Perimeters scale by the same ratio as sides: 27 × (4/3) = 36.' }
        ],
        dok3: [
            { stem: 'A city park is shaped like a rectangle 120 m by 80 m. A designer creates a scale drawing on paper that is at most 20 cm by 15 cm. What is the largest scale factor they can use while fitting the entire park on the paper? What will the drawing dimensions be?', answer: 'Scale: 120 m → 20 cm gives 1:600. Check: 80 m → 13.33 cm (fits). But 80 m → 15 cm gives 1:533.3. Use 1:600 to fit both. Drawing: 20 cm by 13.33 cm.', hint: 'Find the scale factor for each dimension separately and use the smaller (more reducing) one so both fit.' },
            { stem: 'A flag designer scales up a logo from a 5 cm by 8 cm sketch to a banner that is 2 m wide (along the 8 cm dimension). What is the scale factor? What is the height of the banner? If paint costs $3 per 1,000 cm², how much does it cost to paint the banner?', answer: 'Scale factor: 200/8 = 25. Height = 5 × 25 = 125 cm. Banner area = 200 × 125 = 25,000 cm². Cost = 25,000/1,000 × $3 = $75.', hint: 'Find the scale factor from the width. Apply it to the height. Then calculate area and cost.' },
            { stem: 'Two similar swimming pools have a length ratio of 2:3. The smaller pool holds 48,000 liters. How many liters does the larger pool hold? Explain why volume does not scale the same way as length.', answer: 'Volume ratio = 2³:3³ = 8:27. Larger pool = 48,000 × (27/8) = 162,000 liters. Volume scales by the cube of the scale factor because it involves three dimensions.', hint: 'Volume is three-dimensional, so the scale factor is cubed: (3/2)³ = 27/8.' },
            { stem: 'A student claims that if you double all the sides of a triangle, you double its area. Is this correct? Prove your answer using a specific right triangle with legs 3 and 4, then generalize.', answer: 'Incorrect. Original area = (1/2)(3)(4) = 6. Doubled sides: area = (1/2)(6)(8) = 24. Area quadrupled, not doubled. In general, area scales by k² where k is the scale factor. For k = 2, area scales by 4.', hint: 'Calculate the area before and after doubling. Area scales by the square of the scale factor.' }
        ]
    },
    'representing and comparing rational numbers': {
        grade: 7,
        dok1: [
            { stem: 'Place −3 on a number line. Is it to the left or right of −5?', answer: 'To the right of −5', hint: 'On a number line, numbers increase to the right. −3 > −5.' },
            { stem: 'What is the opposite of −8?', answer: '8', hint: 'The opposite of a number has the same distance from zero but on the other side.' },
            { stem: 'Order from least to greatest: 0.5, −1.2, 0, −0.8, 1.1', answer: '−1.2, −0.8, 0, 0.5, 1.1', hint: 'Negatives are less than positives. More negative means smaller.' },
            { stem: 'Which is greater: −3/4 or −2/3?', answer: '−2/3', hint: 'Convert to common denominator: −9/12 vs. −8/12. −8/12 is greater.' },
            { stem: 'Write 0.75 as a fraction in simplest form.', answer: '3/4', hint: '0.75 = 75/100. Simplify by dividing both by 25.' },
            { stem: 'What is the absolute value of −15?', answer: '15', hint: 'Absolute value is the distance from zero, always positive.' },
            { stem: 'Compare using < , >, or =: −7 ___ −4', answer: '−7 < −4', hint: '−7 is farther left on the number line, so it is less than −4.' },
            { stem: 'Convert −5/8 to a decimal.', answer: '−0.625', hint: 'Divide 5 by 8 to get 0.625, then apply the negative sign.' },
            { stem: 'What integer is represented by a point that is 6 units to the left of zero on a number line?', answer: '−6', hint: 'Left of zero represents negative numbers.' }
        ],
        dok2: [
            { stem: 'A submarine is at −200 feet. It rises 75 feet and then sinks 40 feet. What is its final position?', answer: '−165 feet', hint: 'Start at −200, add 75 (rising), subtract 40 (sinking): −200 + 75 − 40.' },
            { stem: 'The temperature at 6 AM was −8°F. By noon it was 15°F. By midnight it dropped to −3°F. What was the total change from 6 AM to noon? From noon to midnight?', answer: '6 AM to noon: +23°F. Noon to midnight: −18°F.', hint: 'Subtract starting temperature from ending temperature for each interval.' },
            { stem: 'Order from least to greatest: 2/3, −3/4, 5/6, −1/2, 0.7', answer: '−3/4, −1/2, 2/3, 0.7, 5/6', hint: 'Convert all to decimals: 0.667, −0.75, 0.833, −0.5, 0.7 and then order.' },
            { stem: 'A bank account has a balance of −$45.50. A deposit of $120 is made, then a withdrawal of $89.75. What is the new balance?', answer: '−$15.25', hint: '−45.50 + 120 − 89.75 = −15.25.' },
            { stem: 'Plot these points on a number line and find the distance between them: −3.5 and 2.5', answer: '6 units', hint: 'Distance = |−3.5 − 2.5| = |−6| = 6.' },
            { stem: 'Which is closer to zero: −7/8 or 5/6? Explain.', answer: '5/6 is closer to zero (≈ 0.833 vs. 0.875 from zero).', hint: 'Compare the absolute values: |−7/8| = 0.875 and |5/6| ≈ 0.833.' },
            { stem: 'Ella says −4/5 > −3/5 because 4 > 3. Is she correct? Explain.', answer: 'No. With negative numbers, the one with the larger absolute value is actually less. −4/5 < −3/5.', hint: 'Think about the number line: −4/5 is farther left (more negative) than −3/5.' },
            { stem: 'A town\'s elevation is −12 feet (below sea level). A nearby hill is 85 feet above sea level. What is the difference in elevation?', answer: '97 feet', hint: 'Difference = 85 − (−12) = 85 + 12 = 97.' }
        ],
        dok3: [
            { stem: 'Create three rational numbers between −1/3 and −1/4, and place all five numbers (including −1/3 and −1/4) on a number line. Explain your strategy for finding numbers between them.', answer: 'Convert to common denominator: −1/3 = −4/12, −1/4 = −3/12. Three numbers between: −3.25/12, −3.5/12, −3.75/12 (or equivalently −13/48, −7/24, −15/48). Strategy: use a larger denominator to find values between.', hint: 'Convert both fractions to a common denominator, then find fractions with values between them.' },
            { stem: 'A diver starts at the surface (0 m). She dives down 18.5 m, rises 6.3 m, dives down 9.8 m, and rises 4.2 m. Express each move as a rational number, find her final depth, and determine what fraction of her deepest point she is at now.', answer: 'Moves: −18.5, +6.3, −9.8, +4.2. Positions: −18.5, −12.2, −22, −17.8. Deepest = −22 m. Final = −17.8 m. Fraction of deepest: 17.8/22 = 89/110 ≈ 0.809 (about 81% of her deepest depth).', hint: 'Track the running total. The deepest point is the most negative value.' },
            { stem: 'Two students are comparing the fractions −5/7 and −7/10. Student A converts to decimals. Student B uses common denominators. Show both methods and determine which fraction is greater. Then find a rational number exactly halfway between them.', answer: 'Decimals: −5/7 ≈ −0.714, −7/10 = −0.7. Common denominators: −50/70 vs. −49/70. −7/10 > −5/7 (since −0.7 > −0.714). Halfway: (−0.714 + −0.7)/2 = −0.707, or −99/140.', hint: 'Convert both ways. To find the midpoint, average the two values.' },
            { stem: 'Is the statement "the number with the greater absolute value is always the greater number" true or false? Provide examples with positive numbers, negative numbers, and a mix of both to fully justify your answer.', answer: 'False. For positives: |5| > |3| and 5 > 3 (works). For negatives: |−5| > |−3| but −5 < −3 (fails). Mixed: |−5| > |3| but −5 < 3 (fails). The statement only holds for non-negative numbers.', hint: 'Test the claim with different cases: both positive, both negative, and one of each.' }
        ]
    },
    'applying rational numbers': {
        grade: 7,
        dok1: [
            { stem: 'Calculate: −8 + 5', answer: '−3', hint: 'Start at −8 and move 5 to the right.' },
            { stem: 'Calculate: −6 × (−3)', answer: '18', hint: 'A negative times a negative equals a positive.' },
            { stem: 'Calculate: −24 ÷ 6', answer: '−4', hint: 'A negative divided by a positive is negative.' },
            { stem: 'What is |−13|?', answer: '13', hint: 'Absolute value gives the distance from zero.' },
            { stem: 'Calculate: −4 − (−9)', answer: '5', hint: 'Subtracting a negative is the same as adding: −4 + 9 = 5.' },
            { stem: 'Evaluate: (−2)³', answer: '−8', hint: '(−2) × (−2) × (−2) = 4 × (−2) = −8.' },
            { stem: 'Calculate: 3/4 + (−1/2)', answer: '1/4', hint: 'Convert to common denominator: 3/4 + (−2/4) = 1/4.' },
            { stem: 'Calculate: −5 × 7', answer: '−35', hint: 'A negative times a positive is negative.' },
            { stem: 'Evaluate: (−1)⁴', answer: '1', hint: 'An even exponent makes the result positive.' }
        ],
        dok2: [
            { stem: 'A football team gained 8 yards, lost 3 yards, lost 5 yards, and gained 12 yards. What was their net yardage?', answer: '12 yards', hint: 'Add: 8 + (−3) + (−5) + 12 = 12.' },
            { stem: 'The temperature dropped 3.5°F per hour for 6 hours. What was the total temperature change?', answer: '−21°F', hint: 'Multiply: −3.5 × 6 = −21.' },
            { stem: 'Evaluate: −2 × (−3) + 4 × (−5)', answer: '−14', hint: 'Multiply first: 6 + (−20) = −14.' },
            { stem: 'A stock dropped $2.75 each day for 4 days, then rose $1.50 each day for 3 days. What was the overall change?', answer: '−$6.50', hint: '(−2.75 × 4) + (1.50 × 3) = −11 + 4.50 = −6.50.' },
            { stem: 'Calculate: (−1/3) × (−3/5) ÷ (1/2)', answer: '2/5', hint: 'First multiply: 3/15 = 1/5. Then divide by 1/2: (1/5) × (2/1) = 2/5.' },
            { stem: 'A scuba diver descends at 2.5 feet per second. How deep is she after 12 seconds? If she then ascends at 1.5 feet per second for 8 seconds, what is her depth?', answer: 'After descent: −30 feet. After ascent: −30 + 12 = −18 feet.', hint: 'Descent: −2.5 × 12. Ascent: +1.5 × 8. Add the results.' },
            { stem: 'Evaluate: |−4 + 7| − |3 − 10|', answer: '−4', hint: '|3| − |−7| = 3 − 7 = −4.' },
            { stem: 'A checking account has $230.50. Checks are written for $85.75, $112.00, and $50.25. What is the final balance?', answer: '−$17.50', hint: '230.50 − 85.75 − 112.00 − 50.25 = −17.50.' },
            { stem: 'Simplify: (−3)² + (−2)³ − (−1)⁵', answer: '2', hint: '9 + (−8) − (−1) = 9 − 8 + 1 = 2.' }
        ],
        dok3: [
            { stem: 'A delivery drone starts at an elevation of 50 meters. It descends 3.5 meters per second for 8 seconds, hovers for 5 seconds, ascends 2 meters per second for 6 seconds, then descends 1.5 meters per second for 4 seconds. Write an expression for the final elevation and evaluate it. At what times was the drone lowest?', answer: 'Final elevation: 50 + (−3.5)(8) + (2)(6) + (−1.5)(4) = 50 − 28 + 12 − 6 = 28 m. Lowest after first descent: 50 − 28 = 22 m.', hint: 'Track the elevation after each phase. The drone is lowest when the running total is smallest.' },
            { stem: 'Maria has a game where she earns points for correct answers and loses points for wrong ones. Easy questions: +3 or −1. Hard questions: +7 or −4. She answers 5 easy correctly, 3 easy incorrectly, 4 hard correctly, and 2 hard incorrectly. Her friend James answers 8 easy correctly, 1 easy incorrectly, 2 hard correctly, and 3 hard incorrectly. Who wins and by how much?', answer: 'Maria: 5(3) + 3(−1) + 4(7) + 2(−4) = 15 − 3 + 28 − 8 = 32. James: 8(3) + 1(−1) + 2(7) + 3(−4) = 24 − 1 + 14 − 12 = 25. Maria wins by 7 points.', hint: 'Multiply each type by its point value and add. Compare the totals.' },
            { stem: 'Prove that the product of any two negative rational numbers is always positive. Then prove that the product of three negative rational numbers is always negative. Use specific examples and then explain the general rule.', answer: 'Let a < 0 and b < 0. Example: (−2/3)(−4/5) = 8/15 > 0. The rule: negative × negative = positive (two sign flips return to positive). For three negatives: (−2)(−3)(−4) = (6)(−4) = −24. The product of the first two is positive, then positive × negative = negative. General rule: an even count of negative factors gives a positive product; an odd count gives a negative product.', hint: 'Start with examples, then explain why the sign rule works based on even vs. odd count of negatives.' },
            { stem: 'A small business tracks daily profit/loss over a week: Mon −$45, Tue $120, Wed −$30, Thu $85, Fri $200, Sat $310, Sun −$15. Find the mean daily result. If the business needs an average daily profit of at least $100 to stay open, by how much do they exceed or fall short? What would Monday\'s result need to be to exactly hit the $100 average?', answer: 'Total: −45 + 120 + (−30) + 85 + 200 + 310 + (−15) = $625. Mean: 625/7 ≈ $89.29/day. They fall short by about $10.71/day. To average $100: need total = $700. Monday would need to be $700 − (120 + (−30) + 85 + 200 + 310 + (−15)) = $700 − $670 = $30.', hint: 'Find the total, then divide by 7. For the target, work backward from the desired total of $700.' }
        ]
    },
    'mean median and range': {
        grade: 7,
        dok1: [
            { stem: 'Find the mean of: 12, 15, 18, 21, 24', answer: '18', hint: 'Add all values and divide by the count: (12 + 15 + 18 + 21 + 24) ÷ 5.' },
            { stem: 'Find the median of: 7, 3, 9, 1, 5', answer: '5', hint: 'Order the numbers first: 1, 3, 5, 7, 9. The middle value is 5.' },
            { stem: 'What is the range of: 45, 23, 67, 12, 89?', answer: '77', hint: 'Range = maximum − minimum: 89 − 12.' },
            { stem: 'Find the median of: 4, 8, 10, 14', answer: '9', hint: 'With an even count, average the two middle values: (8 + 10) ÷ 2.' },
            { stem: 'Find the mean of: 85, 92, 78, 95, 90', answer: '88', hint: 'Sum = 440. Divide by 5.' },
            { stem: 'What is the range of the data set: 3.5, 7.2, 1.8, 9.4, 5.1?', answer: '7.6', hint: '9.4 − 1.8 = 7.6.' },
            { stem: 'A student scored 80, 90, 85, 75, and 70 on five tests. What is the mean?', answer: '80', hint: 'Sum = 400. Divide by 5.' },
            { stem: 'Find the median of: 22, 18, 35, 27, 30, 15, 40', answer: '27', hint: 'Ordered: 15, 18, 22, 27, 30, 35, 40. The middle (4th) value is 27.' },
            { stem: 'What measure of center is most affected by extremely high or low values?', answer: 'The mean', hint: 'Think about which statistic uses every value in its calculation.' }
        ],
        dok2: [
            { stem: 'A student has test scores of 82, 91, 76, 88, and 93. What score does she need on the 6th test to have a mean of 88?', answer: '98', hint: 'Desired total = 88 × 6 = 528. Current total = 430. She needs 528 − 430 = 98.' },
            { stem: 'The data set 12, 15, 14, 13, 15, 14, 50 has an outlier. Calculate the mean and median with and without the outlier. Which measure is more affected?', answer: 'With outlier: mean ≈ 19, median = 14. Without: mean ≈ 13.83, median = 14. The mean is much more affected.', hint: 'Calculate both statistics twice: once with 50 included and once without.' },
            { stem: 'Two classes took the same quiz. Class A scores: 70, 75, 80, 85, 90. Class B scores: 60, 75, 80, 85, 100. Compare their means, medians, and ranges.', answer: 'Class A: mean = 80, median = 80, range = 20. Class B: mean = 80, median = 80, range = 40. Same mean and median, but Class B has more spread.', hint: 'Calculate each statistic for both classes and compare.' },
            { stem: 'The heights (in inches) of 7 basketball players are: 68, 71, 73, 74, 76, 78, 82. A new player who is 62 inches tall joins. How does this change the mean and median?', answer: 'Original: mean = 74.57, median = 74. New: mean = 73, median = 73.5. Both decreased.', hint: 'Recalculate mean and median with the 8th value included.' },
            { stem: 'A restaurant tracks daily customers: Mon 45, Tue 52, Wed 48, Thu 55, Fri 87, Sat 93, Sun 78. Which day(s) might be considered outliers? Calculate the mean with and without weekends.', answer: 'Weekdays look different from weekends. Weekday mean: 50. Full week mean: 65.43. Weekend mean: 86. Fri-Sun have notably higher values.', hint: 'Calculate the mean for all 7 days, then just weekdays (Mon-Thu), and compare.' },
            { stem: 'A data set has a mean of 25, a median of 23, and a range of 30. If every value is increased by 5, what are the new mean, median, and range?', answer: 'Mean = 30, median = 28, range = 30 (unchanged).', hint: 'Adding a constant to every value shifts the mean and median by that amount but does not change the range.' },
            { stem: 'The ages of 5 people are 10, 12, 14, 16, 18. If a 60-year-old joins the group, by how much does the mean increase?', answer: 'Original mean = 14. New mean = 130/6 ≈ 21.67. Increase of about 7.67.', hint: 'Calculate the mean before and after adding 60 to the data set.' },
            { stem: 'Create a data set of 5 numbers where the mean is 20, the median is 18, and the range is 15.', answer: 'One possibility: 12, 15, 18, 25, 30. Mean = 100/5 = 20, median = 18, range = 30 − 12 = 18. Better: 13, 16, 18, 25, 28. Mean = 100/5 = 20, median = 18, range = 15.', hint: 'Start with the median as the middle value. The range tells you max − min = 15. Adjust values so the sum = 100.' }
        ],
        dok3: [
            { stem: 'A teacher has two options for calculating final grades: (A) use the mean of all 10 quiz scores, or (B) drop the lowest score and use the mean of the remaining 9. A student scored: 92, 88, 75, 90, 85, 82, 45, 91, 88, 84. Which method benefits this student more and by how much? Argue which method is fairer and why.', answer: 'Method A: mean = 820/10 = 82. Method B: drop 45, mean = 775/9 ≈ 86.11. Method B benefits the student by about 4.11 points. Method B is arguably fairer because a single bad day (outlier) has an outsized effect on the mean, and removing it better represents consistent performance.', hint: 'Calculate both means. Consider what the outlier score (45) does to the mean.' },
            { stem: 'A company has 10 employees. Nine earn $40,000/year and the CEO earns $400,000/year. A job posting says "average salary: $76,000." Is this misleading? Calculate the mean, median, and explain which better represents a typical employee\'s salary. What if two more employees at $40,000 are hired?', answer: 'Mean = (9 × 40,000 + 400,000)/10 = $76,000. Median = $40,000. The mean is misleading because the CEO\'s salary is an outlier. Median better represents a typical salary. With 2 more at $40,000: mean = (11 × 40,000 + 400,000)/12 ≈ $70,000. Median still $40,000.', hint: 'Calculate mean and median. Consider how the one extreme value skews the mean.' },
            { stem: 'You are given three data sets. Set A: 50, 50, 50, 50, 50. Set B: 30, 40, 50, 60, 70. Set C: 10, 25, 50, 75, 90. All three have the same mean and median (50). Explain how they differ and invent a real-world scenario where you would prefer data that looks like Set A over Set C, and one where Set C\'s spread is desirable.', answer: 'All have mean = 50, median = 50. Ranges: A = 0, B = 40, C = 80. Set A has no variability. Set A is preferred for manufacturing (consistency in part sizes). Set C\'s spread is desirable for an investment portfolio seeking high-reward opportunities despite risk, or a talent show needing variety in scores.', hint: 'Focus on the range and spread. Think about when consistency matters vs. when variety matters.' },
            { stem: 'A meteorologist records daily high temperatures (°F) for two weeks: Week 1: 72, 75, 68, 80, 77, 74, 71. Week 2: 65, 82, 59, 88, 70, 85, 61. Calculate mean, median, and range for each week. Which week had more predictable weather? A tourist wants to plan outdoor activities with minimal weather surprise — which week should they pick? Justify using the statistics.', answer: 'Week 1: mean = 73.86, median = 74, range = 12. Week 2: mean = 72.86, median = 70, range = 29. Week 1 is more predictable (smaller range, values clustered near the mean). The tourist should choose Week 1 because the range is much smaller (12 vs. 29), meaning temperatures are more consistent and easier to plan around.', hint: 'Calculate all three statistics for both weeks. The range tells you about variability/predictability.' }
        ]
    },

    // ======================== GRADE 8 ========================

    'rational irrational and real numbers': {
        grade: 8,
        dok1: [
            { stem: 'Is the number 0.75 rational or irrational?', answer: 'Rational', hint: '0.75 can be written as the fraction 3/4, so it is rational.' },
            { stem: 'Classify √49. Is it rational or irrational?', answer: 'Rational (√49 = 7)', hint: '√49 simplifies to a whole number. Whole numbers are rational.' },
            { stem: 'Is √10 rational or irrational?', answer: 'Irrational', hint: '10 is not a perfect square, so √10 cannot be written as a fraction.' },
            { stem: 'Write 0.000052 in scientific notation.', answer: '5.2 × 10⁻⁵', hint: 'Move the decimal right until you have a number between 1 and 10, then count the moves as a negative exponent.' },
            { stem: 'Simplify: 3⁴ × 3²', answer: '3⁶ = 729', hint: 'When multiplying powers with the same base, add the exponents: 4 + 2 = 6.' },
            { stem: 'Is the number 1/3 rational or irrational?', answer: 'Rational', hint: 'Any number that can be written as a fraction of two integers is rational.' },
            { stem: 'What is the value of 2⁻³?', answer: '1/8', hint: 'A negative exponent means take the reciprocal: 2⁻³ = 1/2³ = 1/8.' },
            { stem: 'Write 4,700,000 in scientific notation.', answer: '4.7 × 10⁶', hint: 'Move the decimal left until you have a number between 1 and 10, then count the moves as the exponent.' },
            { stem: 'Classify the number π. Is it rational or irrational?', answer: 'Irrational', hint: 'π = 3.14159... is a non-terminating, non-repeating decimal, so it is irrational.' }
        ],
        dok2: [
            { stem: 'Place the following numbers in order from least to greatest: √5, 2.5, 11/4, √4.', answer: '√4 (2), √5 (≈2.236), 2.5, 11/4 (2.75)', hint: 'Convert each number to a decimal approximation, then compare.' },
            { stem: 'A square has an area of 50 cm². Is the side length rational or irrational? Explain.', answer: 'Irrational. The side length is √50 = 5√2, which is irrational because √2 is irrational.', hint: 'Find the side length by taking √50 and simplify. Is 50 a perfect square?' },
            { stem: 'Simplify: (2³ × 2⁵) / 2⁴', answer: '2⁴ = 16', hint: 'Add exponents in the numerator (3+5=8), then subtract the denominator exponent (8−4=4).' },
            { stem: 'The mass of a bacterium is about 9.5 × 10⁻¹³ grams. The mass of a grain of sand is about 6.7 × 10⁻² grams. How many times heavier is the grain of sand? Write your answer in scientific notation.', answer: '≈ 7.05 × 10¹⁰ times heavier', hint: 'Divide the larger mass by the smaller mass: (6.7 × 10⁻²) ÷ (9.5 × 10⁻¹³). Divide coefficients and subtract exponents.' },
            { stem: 'Is the product of √2 and √8 rational or irrational? Show your work.', answer: 'Rational. √2 × √8 = √16 = 4, which is rational.', hint: 'Multiply the values under the radicals first: √(2 × 8) = √16.' },
            { stem: 'Explain why 0.121212... (repeating) is a rational number.', answer: 'It is rational because the repeating decimal 0.121212... can be written as the fraction 4/33.', hint: 'Let x = 0.121212..., then 100x = 12.1212..., so 99x = 12, giving x = 12/99 = 4/33.' },
            { stem: 'Simplify the expression: (5² × 5⁻⁴)³', answer: '5⁻⁶ = 1/15,625', hint: 'First combine inside the parentheses: 5^(2 + (−4)) = 5⁻². Then apply the outer exponent: (5⁻²)³ = 5⁻⁶.' },
            { stem: 'The diameter of a human red blood cell is about 7 × 10⁻⁶ meters. Write this in standard notation and explain whether this number is rational or irrational.', answer: '0.000007 meters. It is rational because it can be written as 7/1,000,000.', hint: 'Move the decimal 6 places to the left. Any terminating decimal is rational.' },
            { stem: 'Between which two consecutive whole numbers does √75 fall? Justify your answer.', answer: 'Between 8 and 9, because 8² = 64 and 9² = 81, and 64 < 75 < 81.', hint: 'Find perfect squares close to 75 and compare.' }
        ],
        dok3: [
            { stem: 'Marcus says that the sum of any two irrational numbers is always irrational. Provide a counterexample to prove him wrong, and explain your reasoning.', answer: 'Counterexample: √2 + (−√2) = 0, which is rational. The sum of two irrational numbers is not always irrational.', hint: 'Think about adding an irrational number to its opposite. What do you get?' },
            { stem: 'A scientist measures two samples. Sample A has a mass of 3.2 × 10⁴ mg and Sample B has a mass of 8.5 × 10² mg. She combines them and then divides the total into 250 equal portions. Express the mass of each portion in scientific notation, and classify the result as rational or irrational.', answer: 'Total = 3.2 × 10⁴ + 8.5 × 10² = 32,000 + 850 = 32,850 mg. Each portion = 32,850 ÷ 250 = 131.4 mg = 1.314 × 10² mg. This is rational (it is a terminating decimal).', hint: 'Convert to standard form to add, then divide by 250, and convert back to scientific notation.' },
            { stem: 'Prove that √2 + 3 is irrational. Use an indirect proof (proof by contradiction).', answer: 'Assume √2 + 3 is rational, so √2 + 3 = a/b for integers a, b. Then √2 = a/b − 3 = (a − 3b)/b, which would make √2 rational. But √2 is known to be irrational — contradiction. Therefore √2 + 3 is irrational.', hint: 'Assume the opposite is true. If √2 + 3 were rational, what would that imply about √2 itself?' },
            { stem: 'A square garden has an area of 200 ft². A rectangular garden has dimensions 10 ft by (√2 × 10) ft. Determine whether the two gardens have the same area. Then classify the side length of each garden as rational or irrational and explain the relationship.', answer: 'Square garden: side = √200 = 10√2, area = 200 ft². Rectangular garden: area = 10 × 10√2 = 100√2 ≈ 141.4 ft². They do not have the same area. The square\'s side (10√2) is irrational; the rectangle\'s length 10 is rational and width 10√2 is irrational.', hint: 'Calculate each area separately. Simplify √200 to compare with the rectangle dimensions.' }
        ]
    },
    'pythagorean theorem': {
        grade: 8,
        dok1: [
            { stem: 'Find the hypotenuse of a right triangle with legs 3 and 4.', answer: '5', hint: 'Use a² + b² = c². So 9 + 16 = 25, and √25 = 5.' },
            { stem: 'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?', answer: '13', hint: 'Use a² + b² = c². 25 + 144 = 169, and √169 = 13.' },
            { stem: 'A right triangle has a hypotenuse of 10 and one leg of 6. Find the other leg.', answer: '8', hint: 'Use a² + b² = c². So a² + 36 = 100, a² = 64, a = 8.' },
            { stem: 'What is the length of the hypotenuse of a right triangle with legs 8 and 15?', answer: '17', hint: '8² + 15² = 64 + 225 = 289. √289 = 17.' },
            { stem: 'Find the missing leg of a right triangle with hypotenuse 13 and one leg 5.', answer: '12', hint: 'c² − a² = b². 169 − 25 = 144, √144 = 12.' },
            { stem: 'State the Pythagorean Theorem formula.', answer: 'a² + b² = c², where c is the hypotenuse and a and b are the legs of a right triangle.', hint: 'The sum of the squares of the two shorter sides equals the square of the longest side.' },
            { stem: 'A right triangle has legs of 9 and 12. What is the hypotenuse?', answer: '15', hint: '9² + 12² = 81 + 144 = 225. √225 = 15.' },
            { stem: 'Is a triangle with sides 7, 24, and 25 a right triangle?', answer: 'Yes. 7² + 24² = 49 + 576 = 625 = 25².', hint: 'Check if the sum of the squares of the two smaller sides equals the square of the largest side.' },
            { stem: 'Find the hypotenuse of a right triangle with two legs each measuring 1.', answer: '√2 ≈ 1.41', hint: '1² + 1² = 2. The hypotenuse is √2.' }
        ],
        dok2: [
            { stem: 'A 13-foot ladder leans against a wall. The base of the ladder is 5 feet from the wall. How high up the wall does the ladder reach?', answer: '12 feet', hint: 'The ladder is the hypotenuse. Use 5² + h² = 13². Solve for h.' },
            { stem: 'Find the distance between the points (1, 2) and (4, 6) on the coordinate plane.', answer: '5', hint: 'Use the distance formula: d = √[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5.' },
            { stem: 'A rectangular TV screen measures 36 inches wide and 48 inches tall. What is the diagonal length of the screen?', answer: '60 inches', hint: 'The diagonal forms the hypotenuse. 36² + 48² = 1296 + 2304 = 3600. √3600 = 60.' },
            { stem: 'A ship sails 8 km due north and then 15 km due east. How far is the ship from its starting point?', answer: '17 km', hint: 'The path forms a right triangle. Use 8² + 15² = 64 + 225 = 289. √289 = 17.' },
            { stem: 'Find the distance between points (−3, 1) and (5, −5).', answer: '10', hint: 'd = √[(5−(−3))² + (−5−1)²] = √[64 + 36] = √100 = 10.' },
            { stem: 'A rectangular park is 120 meters long and 50 meters wide. A jogger runs diagonally from one corner to the opposite corner. How far does the jogger run?', answer: '130 meters', hint: '120² + 50² = 14400 + 2500 = 16900. √16900 = 130.' },
            { stem: 'Triangle PQR has sides of length 6, 8, and 11. Is it a right triangle? Explain.', answer: 'No. 6² + 8² = 36 + 64 = 100 ≠ 121 = 11². Since a² + b² ≠ c², it is not a right triangle.', hint: 'Apply the converse of the Pythagorean Theorem: check if the sum of the squares of the two shorter sides equals the square of the longest side.' },
            { stem: 'A kite string is 100 feet long. The kite is directly above a point 60 feet from where the string is held. How high is the kite?', answer: '80 feet', hint: 'The string is the hypotenuse. 60² + h² = 100². h² = 10000 − 3600 = 6400. h = 80.' },
            { stem: 'Find the length of the diagonal of a square with side length 7 cm.', answer: '7√2 ≈ 9.90 cm', hint: 'A square\'s diagonal forms a right triangle with two sides of length 7. Use 7² + 7² = 98, so d = √98 = 7√2.' }
        ],
        dok3: [
            { stem: 'A drone flies from point A(2, 3) to point B(10, 9), then to point C(10, 3), and back to A. Show that triangle ABC is a right triangle and find its perimeter.', answer: 'AB = √[(10−2)² + (9−3)²] = √(64+36) = 10. BC = √[(10−10)² + (3−9)²] = 6. CA = √[(2−10)² + (3−3)²] = 8. Check: 6² + 8² = 36 + 64 = 100 = 10². It is a right triangle. Perimeter = 10 + 6 + 8 = 24 units.', hint: 'Find all three side lengths using the distance formula, then verify a² + b² = c² for the converse.' },
            { stem: 'A cell tower is located at position (0, 0) and has a signal range of 15 miles. A hiker is at position (9, 12). Is the hiker within the tower\'s range? If the hiker walks due east, how many more miles can they travel before losing signal?', answer: 'Distance to hiker: √(81 + 144) = √225 = 15 miles. The hiker is exactly at the edge of the range. If they walk due east (increasing x), their new position is (9 + d, 12). Distance = √((9+d)² + 144) ≤ 15. (9+d)² + 144 ≤ 225, (9+d)² ≤ 81, 9+d ≤ 9, d ≤ 0. They cannot walk any farther east without losing signal.', hint: 'Find the distance from origin to (9,12). Then set up an inequality for walking east from that point.' },
            { stem: 'An architect designs a wheelchair ramp that must rise 2.5 feet over a horizontal distance of 30 feet. Find the length of the ramp surface. Then determine if this ramp meets ADA guidelines requiring a slope no steeper than 1:12 (1 foot of rise per 12 feet of run). Justify your answer.', answer: 'Ramp length = √(30² + 2.5²) = √(900 + 6.25) = √906.25 ≈ 30.1 feet. Slope ratio: rise/run = 2.5/30 = 1/12. This exactly meets the ADA 1:12 guideline.', hint: 'Use the Pythagorean Theorem for the ramp length. For ADA compliance, compare the rise-to-run ratio with 1:12.' },
            { stem: 'Three friends live at coordinates A(0, 0), B(6, 0), and C(3, 4). They want to meet at the point that minimizes the maximum distance any one person has to travel. Determine whether the centroid (3, 4/3) or the circumcenter is a better meeting point. Use the Pythagorean Theorem / distance formula to justify.', answer: 'Centroid (3, 4/3): dA = √(9 + 16/9) = √(97/9) ≈ 3.28, dB = √(9 + 16/9) ≈ 3.28, dC = √(0 + 64/9) ≈ 2.67. Max = 3.28. Circumcenter: AB midpoint perpendicular bisector is x = 3. AC midpoint (1.5, 2), slope AC = 4/3, perp slope = −3/4, line: y − 2 = −3/4(x − 1.5) → at x=3: y = 2 + (−3/4)(1.5) = 0.875. Circumcenter ≈ (3, 0.875). dA = √(9 + 0.766) ≈ 3.12, dB = √(9 + 0.766) ≈ 3.12, dC = √(0 + 9.766) ≈ 3.12. Max = 3.12. The circumcenter is better because it equalizes all distances at ≈3.12, which is less than the centroid\'s max of 3.28.', hint: 'Calculate each person\'s distance to both candidate points and compare the maximum distance for each option.' }
        ]
    },
    'solve equations inequalities and systems': {
        grade: 8,
        dok1: [
            { stem: 'Solve for x: 3x + 7 = 22', answer: 'x = 5', hint: 'Subtract 7 from both sides, then divide by 3.' },
            { stem: 'Solve for x: 2x − 9 = 15', answer: 'x = 12', hint: 'Add 9 to both sides to get 2x = 24, then divide by 2.' },
            { stem: 'Solve the inequality: x + 4 > 10', answer: 'x > 6', hint: 'Subtract 4 from both sides.' },
            { stem: 'What is the slope and y-intercept of the equation y = 3x − 5?', answer: 'Slope = 3, y-intercept = −5', hint: 'In y = mx + b, m is the slope and b is the y-intercept.' },
            { stem: 'Solve for x: x/4 = 9', answer: 'x = 36', hint: 'Multiply both sides by 4.' },
            { stem: 'Solve for x: −2x = 14', answer: 'x = −7', hint: 'Divide both sides by −2.' },
            { stem: 'Is the relation {(1, 3), (2, 5), (3, 7), (1, 9)} a function? Explain.', answer: 'No. The input 1 maps to two different outputs (3 and 9), so it is not a function.', hint: 'A function assigns exactly one output to each input. Check for repeated x-values with different y-values.' },
            { stem: 'Solve the inequality: 5x ≤ 35', answer: 'x ≤ 7', hint: 'Divide both sides by 5. The inequality sign stays the same because you are dividing by a positive number.' },
            { stem: 'Rewrite the equation 2x + y = 8 in slope-intercept form.', answer: 'y = −2x + 8', hint: 'Isolate y by subtracting 2x from both sides.' }
        ],
        dok2: [
            { stem: 'Solve: 4(x − 3) + 2 = 3x + 5', answer: 'x = 15', hint: 'Distribute: 4x − 12 + 2 = 3x + 5. Combine: 4x − 10 = 3x + 5. Subtract 3x: x − 10 = 5. Add 10: x = 15.' },
            { stem: 'Solve the system by substitution: y = 2x + 1 and 3x + y = 16', answer: 'x = 3, y = 7', hint: 'Substitute (2x + 1) for y in the second equation: 3x + 2x + 1 = 16. Solve for x, then find y.' },
            { stem: 'A gym charges a $25 membership fee plus $10 per visit. Another gym charges no membership fee but $15 per visit. After how many visits do the two gyms cost the same?', answer: '5 visits', hint: 'Set up: 25 + 10v = 15v. Solve for v.' },
            { stem: 'Solve the inequality and graph on a number line: 3x − 7 > 2x + 5', answer: 'x > 12', hint: 'Subtract 2x from both sides: x − 7 > 5. Add 7: x > 12. Open circle at 12, shade right.' },
            { stem: 'Solve the system by elimination: 2x + 3y = 12 and 4x − 3y = 6', answer: 'x = 3, y = 2', hint: 'Add the two equations to eliminate y: 6x = 18, so x = 3. Substitute back to find y.' },
            { stem: 'A phone plan costs $40/month plus $0.05 per text. Another plan costs $30/month plus $0.15 per text. Write and solve a system to find when the plans cost the same.', answer: 'At 100 texts. 40 + 0.05t = 30 + 0.15t → 10 = 0.10t → t = 100.', hint: 'Set the two cost expressions equal and solve for t (number of texts).' },
            { stem: 'Solve: −3(2x + 4) ≥ 6', answer: 'x ≤ −3', hint: 'Distribute: −6x − 12 ≥ 6. Add 12: −6x ≥ 18. Divide by −6 and flip the inequality: x ≤ −3.' },
            { stem: 'Find the equation of a line that passes through the points (2, 5) and (6, 13) in slope-intercept form.', answer: 'y = 2x + 1', hint: 'Slope = (13 − 5)/(6 − 2) = 8/4 = 2. Use point-slope: y − 5 = 2(x − 2) → y = 2x + 1.' },
            { stem: 'Solve for x: (2x + 3)/5 = (x − 1)/2', answer: 'x = −11', hint: 'Cross multiply: 2(2x + 3) = 5(x − 1). 4x + 6 = 5x − 5. Subtract 4x: 6 = x − 5. Add 5: x = −11. Wait, let me check: 4x + 6 = 5x − 5, subtract 4x: 6 = x − 5, x = 11. Correction: x = 11.' }
        ],
        dok3: [
            { stem: 'A school fundraiser sells adult tickets for $8 and student tickets for $5. They sold 200 tickets total and collected $1,180. Set up and solve a system of equations to find how many of each ticket were sold. Explain your method.', answer: 'Let a = adult, s = student. a + s = 200 and 8a + 5s = 1180. From eq 1: s = 200 − a. Substitute: 8a + 5(200 − a) = 1180 → 8a + 1000 − 5a = 1180 → 3a = 180 → a = 60, s = 140. They sold 60 adult and 140 student tickets.', hint: 'Write one equation for total tickets and one for total money. Use substitution to solve.' },
            { stem: 'Maria has $500 in savings and adds $75 per week. James has $800 in savings but spends $50 per week. Write equations for each person\'s savings, determine when they have the same amount, and explain what happens after that point. Who should be more concerned about their financial trend?', answer: 'Maria: S = 500 + 75w. James: S = 800 − 50w. Setting equal: 500 + 75w = 800 − 50w → 125w = 300 → w = 2.4 weeks. After 2.4 weeks, Maria has more savings. James should be more concerned because his savings are decreasing — he will run out of money after 800/50 = 16 weeks.', hint: 'Write a linear equation for each person. Set them equal to find the intersection. Then analyze the slopes to discuss long-term trends.' },
            { stem: 'A concert venue has floor seats and balcony seats. Floor seats cost $45 and balcony seats cost $25. The venue holds a maximum of 350 people, and the organizers need to earn at least $10,000 in ticket revenue. Write a system of inequalities, find two possible seating configurations that meet both constraints, and determine whether filling the venue entirely with balcony seats would meet the revenue requirement.', answer: 'Let f = floor, b = balcony. f + b ≤ 350 and 45f + 25b ≥ 10000, with f ≥ 0 and b ≥ 0. Example 1: f = 200, b = 150 → 200 + 150 = 350 ≤ 350 ✓ and 9000 + 3750 = 12750 ≥ 10000 ✓. Example 2: f = 100, b = 250 → 350 ≤ 350 ✓ and 4500 + 6250 = 10750 ≥ 10000 ✓. All balcony: f = 0, b = 350 → 25(350) = 8750 < 10000. No, all balcony seats would not meet the revenue requirement.', hint: 'Write one inequality for capacity and one for revenue. Test specific values and check the all-balcony scenario.' },
            { stem: 'A drone delivery company charges a flat fee plus a per-mile rate. A 10-mile delivery costs $35, and a 25-mile delivery costs $65. Find the equation for the delivery cost as a function of distance. Then determine the maximum delivery distance if a customer has a $100 budget, and whether doubling the distance always doubles the cost. Justify your reasoning.', answer: 'Let C = md + b. Using (10, 35) and (25, 65): slope m = (65−35)/(25−10) = 30/15 = 2. So C = 2d + b. Using (10, 35): 35 = 20 + b → b = 15. Equation: C = 2d + 15. For $100 budget: 100 = 2d + 15 → d = 42.5 miles. Doubling the distance does NOT double the cost because of the flat fee. For example, 10 miles costs $35 but 20 miles costs $55, which is less than $70 (double of $35). The flat fee makes the relationship non-proportional.', hint: 'Use the two data points to find slope (per-mile rate) and y-intercept (flat fee). Then analyze whether the function is proportional.' }
        ]
    },

    // ======================== GRADE 10 ========================

    'quadratic functions': {
        grade: 10,
        dok1: [
            { stem: 'Identify the vertex of the parabola y = (x - 3)² + 5.', answer: 'Vertex is (3, 5)', hint: 'In vertex form y = (x - h)² + k, the vertex is (h, k).' },
            { stem: 'What is the axis of symmetry for y = x² - 8x + 12?', answer: 'x = 4 (using x = -b/2a = 8/2 = 4)', hint: 'The axis of symmetry is x = -b/(2a).' },
            { stem: 'Does the parabola y = -2x² + 3 open upward or downward?', answer: 'Downward, because a = -2 is negative.', hint: 'When a < 0 the parabola opens downward.' },
            { stem: 'Factor: x² - 9', answer: '(x - 3)(x + 3)', hint: 'This is a difference of two squares: a² - b² = (a - b)(a + b).' },
            { stem: 'Find the zeros of y = x² - 5x + 6 by factoring.', answer: 'x = 2 and x = 3 (factors to (x - 2)(x - 3) = 0)', hint: 'Find two numbers that multiply to 6 and add to -5.' },
            { stem: 'Use the quadratic formula to solve x² + 4x + 1 = 0.', answer: 'x = (-4 ± √12) / 2 = -2 ± √3', hint: 'Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a.' },
            { stem: 'Convert y = x² + 6x + 2 to vertex form by completing the square.', answer: 'y = (x + 3)² - 7', hint: 'Take half of 6 (which is 3), square it (9), add and subtract 9.' },
            { stem: 'What is the y-intercept of y = 3x² - 7x + 4?', answer: 'y-intercept is (0, 4)', hint: 'Set x = 0 and evaluate.' }
        ],
        dok2: [
            { stem: 'A ball is launched upward with height h(t) = -16t² + 64t + 5 (feet). What is the maximum height, and when does it occur?', answer: 'Max height at t = 2 seconds: h(2) = -16(4) + 64(2) + 5 = 69 feet.', hint: 'Find the vertex: t = -b/(2a) = -64/(2·-16) = 2.' },
            { stem: 'A rectangular garden has a perimeter of 40 feet. Express the area as a function of the width w and find the maximum area.', answer: 'Length = 20 - w, so A(w) = w(20 - w) = -w² + 20w. Max at w = 10, A = 100 sq ft.', hint: 'Write area in terms of w, then find the vertex.' },
            { stem: 'The profit for selling x items is P(x) = -2x² + 120x - 400. How many items should be sold to maximize profit?', answer: '30 items (x = -120/(2·-2) = 30). Max profit: P(30) = -2(900) + 3600 - 400 = $1400.', hint: 'The vertex x-coordinate gives the number that maximizes profit.' },
            { stem: 'Graph y = (x - 1)² - 4. Identify the vertex, axis of symmetry, direction of opening, and x-intercepts.', answer: 'Vertex (1, -4), axis x = 1, opens up. x-intercepts: (x-1)² = 4 → x = 3 and x = -1.', hint: 'Set y = 0 to find x-intercepts.' },
            { stem: 'A firework is launched from a 3-foot platform with h(t) = -16t² + 80t + 3. When does it hit the ground?', answer: 'Set h = 0: t = (-80 ± √(6400 + 192))/-32 = (-80 ± √6592)/-32 ≈ 5.04 seconds (positive root).', hint: 'Use the quadratic formula with a = -16, b = 80, c = 3.' },
            { stem: 'Explain how the discriminant b² - 4ac determines the number of real solutions. Find the discriminant of 2x² - 3x + 5 = 0 and state the number of real solutions.', answer: 'Discriminant = 9 - 40 = -31. Since it is negative, there are no real solutions (two complex solutions).', hint: 'If discriminant > 0: two real; = 0: one real; < 0: no real solutions.' },
            { stem: 'An architect designs a parabolic arch that is 20 feet wide at the base and 15 feet tall. Write the equation of the arch with vertex at the top.', answer: 'Placing the vertex at (0, 15) and base at (-10, 0) and (10, 0): y = -15/100 · x² + 15 = -0.15x² + 15.', hint: 'Use vertex form y = a(x - h)² + k with vertex (0, 15) and plug in a base point to find a.' }
        ],
        dok3: [
            { stem: 'A company finds revenue R(x) = -5x² + 200x and cost C(x) = 50x + 500. Find the break-even points and the quantity that maximizes profit. Justify each step.', answer: 'Profit P(x) = -5x² + 150x - 500. Break-even: -5x² + 150x - 500 = 0 → x² - 30x + 100 = 0 → x = (30 ± √500)/2 ≈ 3.8 or 26.2 items. Max profit at x = 15 items: P(15) = $625.', hint: 'Profit = Revenue - Cost. Set P(x) = 0 for break-even; find the vertex for max profit.' },
            { stem: 'Design a parabolic bridge that spans 60 meters and has a maximum height of 20 meters. Write the equation, then determine if a 12-meter-tall truck can pass under the bridge at a point 10 meters from the center. Justify your answer.', answer: 'Equation: y = -20/900 · x² + 20 = -x²/45 + 20. At x = 10: y = -100/45 + 20 ≈ 17.78 m. Yes, the truck (12 m) can pass since 17.78 > 12.', hint: 'Place the vertex at (0, 20). The bridge meets ground at x = ±30.' },
            { stem: 'A farmer has 200 feet of fencing and wants to enclose a rectangular area along a river (no fence needed on the river side). Find the dimensions that maximize area. Then determine if the maximum area changes if the farmer uses the same fencing for a semicircular enclosure instead. Which shape gives more area?', answer: 'Rectangle: width w, length 200-2w. A = w(200-2w), max at w = 50, A = 5000 sq ft. Semicircle: πr + 2r = 200 → r = 200/(π+2) ≈ 38.9 ft. A = πr²/2 ≈ 2378 sq ft. Rectangle gives more area.', hint: 'For the rectangle, use calculus or vertex of the quadratic. For the semicircle, express r in terms of fencing.' },
            { stem: 'Prove that the quadratic function f(x) = ax² + bx + c (a ≠ 0) always has its vertex at x = -b/(2a). Show each step of the completing-the-square process.', answer: 'f(x) = a(x² + (b/a)x) + c = a(x² + (b/a)x + b²/4a² - b²/4a²) + c = a(x + b/2a)² - b²/4a + c. Vertex form shows vertex at x = -b/(2a), y = c - b²/(4a).', hint: 'Factor out a from the first two terms, then complete the square inside the parentheses.' }
        ]
    },

    'polynomial operations': {
        grade: 10,
        dok1: [
            { stem: 'Add: (3x² + 2x - 5) + (x² - 4x + 7)', answer: '4x² - 2x + 2', hint: 'Combine like terms: group x² terms, x terms, and constants.' },
            { stem: 'Subtract: (5x³ - 2x + 1) - (3x³ + x² - 4)', answer: '2x³ - x² - 2x + 5', hint: 'Distribute the negative sign, then combine like terms.' },
            { stem: 'Multiply: (2x + 3)(x - 4)', answer: '2x² - 5x - 12', hint: 'Use FOIL: First, Outer, Inner, Last.' },
            { stem: 'Factor: x² + 7x + 12', answer: '(x + 3)(x + 4)', hint: 'Find two numbers that multiply to 12 and add to 7.' },
            { stem: 'Factor: 2x² - 8x', answer: '2x(x - 4)', hint: 'First pull out the greatest common factor.' },
            { stem: 'Multiply: (x + 5)²', answer: 'x² + 10x + 25', hint: 'Use (a + b)² = a² + 2ab + b².' },
            { stem: 'What is the degree of 4x⁵ - 3x² + 7x - 1?', answer: 'Degree 5', hint: 'The degree is the highest exponent.' },
            { stem: 'Factor: 4x² - 25', answer: '(2x - 5)(2x + 5)', hint: 'This is a difference of squares: (2x)² - 5².' }
        ],
        dok2: [
            { stem: 'Multiply: (x + 2)(x² - 3x + 5). Show your work.', answer: 'x³ - 3x² + 5x + 2x² - 6x + 10 = x³ - x² - x + 10', hint: 'Distribute each term of (x + 2) across the trinomial.' },
            { stem: 'Factor completely: 3x³ - 12x² - 15x', answer: '3x(x² - 4x - 5) = 3x(x - 5)(x + 1)', hint: 'Factor out GCF first, then factor the remaining trinomial.' },
            { stem: 'Divide (2x³ + 5x² - x - 6) by (x + 2) using polynomial long division.', answer: '2x² + x - 3 (quotient), remainder 0', hint: 'Divide the leading term 2x³ by x to get 2x², then multiply back and subtract.' },
            { stem: 'A rectangular box has dimensions x, (x + 2), and (x - 1). Write a polynomial for the volume and expand it fully.', answer: 'V = x(x + 2)(x - 1) = x(x² + x - 2) = x³ + x² - 2x', hint: 'Multiply two factors first, then multiply by the third.' },
            { stem: 'Factor: x⁴ - 16', answer: '(x² - 4)(x² + 4) = (x - 2)(x + 2)(x² + 4)', hint: 'This is a difference of squares: (x²)² - 4². Factor again if possible.' },
            { stem: 'An engineer models the cross-sectional area of a beam as A(x) = -2x² + 12x. What value of x maximizes the area, and what is the maximum area?', answer: 'A(x) = -2x(x - 6). Max at x = 3 (axis of symmetry). A(3) = -2(9) + 36 = 18 square units.', hint: 'Factor or use x = -b/(2a) to find the maximum.' },
            { stem: 'If P(x) = x³ - 4x² + x + 6, verify that (x - 2) is a factor using the Factor Theorem.', answer: 'P(2) = 8 - 16 + 2 + 6 = 0. Since P(2) = 0, (x - 2) is a factor.', hint: 'The Factor Theorem says (x - c) is a factor if P(c) = 0.' }
        ],
        dok3: [
            { stem: 'A manufacturer models revenue as R(x) = -x³ + 12x² - 36x + 200 (in thousands) where x is units in hundreds. Factor the expression, find all roots, and explain what the roots mean in context.', answer: 'R(x) = -(x³ - 12x² + 36x - 200). Testing roots: R(10) = -1000 + 1200 - 360 + 200 = 40 ≠ 0. The polynomial does not factor neatly over integers, so use numerical methods or graphing. Roots represent production levels where revenue equals zero.', hint: 'Try the Rational Root Theorem to test possible roots, then interpret the zeros as break-even points.' },
            { stem: 'Prove that (a + b)³ = a³ + 3a²b + 3ab² + b³ by multiplying (a + b)(a + b)(a + b) step by step. Then use the result to expand (x + 2)³.', answer: '(a+b)² = a² + 2ab + b². Then (a²+2ab+b²)(a+b) = a³ + 2a²b + ab² + a²b + 2ab² + b³ = a³ + 3a²b + 3ab² + b³. So (x+2)³ = x³ + 3(4)x + 3(2)x² + 8 = x³ + 6x² + 12x + 8.', hint: 'First multiply two factors, then multiply the result by the third.' },
            { stem: 'A swimming pool is being designed with length (2x + 4) feet, width (x + 1) feet, and depth (x - 1) feet. Write the volume polynomial. If the pool must hold at least 1000 cubic feet and the depth must be at least 4 feet, find a valid value of x and verify all dimensions are reasonable.', answer: 'V = (2x+4)(x+1)(x-1) = 2(x+2)(x+1)(x-1) = 2(x+2)(x²-1) = 2x³ + 4x² - 2x - 4. Depth ≥ 4 → x ≥ 5. At x = 5: V = 2(125) + 4(25) - 10 - 4 = 336 (too small). At x = 7: V = 2(343) + 4(49) - 14 - 4 = 864 (still small). At x = 8: V = 2(512) + 4(64) - 16 - 4 = 1260 cu ft. Dimensions: 20 × 9 × 7 ft. Valid.', hint: 'Expand the volume, apply the depth constraint to restrict x, then test values.' }
        ]
    },

    'exponential and logarithmic functions': {
        grade: 10,
        dok1: [
            { stem: 'Evaluate: 2⁵', answer: '32', hint: '2 × 2 × 2 × 2 × 2' },
            { stem: 'Write in logarithmic form: 10³ = 1000', answer: 'log₁₀(1000) = 3', hint: 'If bˣ = y, then log_b(y) = x.' },
            { stem: 'Evaluate: log₂(16)', answer: '4 (since 2⁴ = 16)', hint: 'Ask: 2 raised to what power equals 16?' },
            { stem: 'Identify the growth/decay factor: y = 500(1.08)ᵗ', answer: 'Growth factor is 1.08 (8% growth per period).', hint: 'If the base > 1, it is growth. The rate is base - 1.' },
            { stem: 'Does y = 200(0.75)ᵗ represent growth or decay? What is the rate?', answer: 'Decay, because 0.75 < 1. Decay rate is 25%.', hint: 'Decay rate = 1 - 0.75 = 0.25 = 25%.' },
            { stem: 'Simplify: log₃(27)', answer: '3 (since 3³ = 27)', hint: '3 raised to what power gives 27?' },
            { stem: 'Evaluate: log(1) where log means log base 10.', answer: '0 (since 10⁰ = 1)', hint: 'Any base raised to the 0 power equals 1.' },
            { stem: 'Write in exponential form: log₅(125) = 3', answer: '5³ = 125', hint: 'If log_b(y) = x, then bˣ = y.' }
        ],
        dok2: [
            { stem: 'A bank account earns 5% interest compounded annually. If $2000 is deposited, write the formula and find the balance after 6 years.', answer: 'A = 2000(1.05)⁶ = 2000(1.3401) ≈ $2680.19', hint: 'Use A = P(1 + r)ᵗ.' },
            { stem: 'A car depreciates 12% per year. It was purchased for $28,000. What is it worth after 5 years?', answer: 'V = 28000(0.88)⁵ = 28000(0.5277) ≈ $14,776.58', hint: 'Decay factor = 1 - 0.12 = 0.88.' },
            { stem: 'Solve for x: 3ˣ = 81', answer: 'x = 4 (since 3⁴ = 81)', hint: 'Rewrite 81 as a power of 3.' },
            { stem: 'A population of bacteria doubles every 3 hours. Starting with 500 bacteria, write a function and find the population after 12 hours.', answer: 'P(t) = 500 · 2^(t/3). At t = 12: P(12) = 500 · 2⁴ = 500 · 16 = 8000 bacteria.', hint: 'The doubling time goes in the exponent as t/3.' },
            { stem: 'Solve for t: 5000 = 2000(1.06)ᵗ', answer: '2.5 = 1.06ᵗ → t = log(2.5)/log(1.06) ≈ 15.73 years', hint: 'Divide both sides by 2000, then take the logarithm of both sides.' },
            { stem: 'Use the properties of logarithms to expand: log₂(8x³)', answer: 'log₂(8) + log₂(x³) = 3 + 3log₂(x)', hint: 'Use log(ab) = log a + log b, and log(aⁿ) = n·log a.' },
            { stem: '$10,000 is invested at 4.5% compounded monthly. Find the balance after 3 years.', answer: 'A = 10000(1 + 0.045/12)^(12·3) = 10000(1.00375)^36 ≈ $11,440.33', hint: 'Use A = P(1 + r/n)^(nt) with n = 12.' }
        ],
        dok3: [
            { stem: 'Two towns have populations modeled by Town A: P = 15000(1.03)ᵗ and Town B: P = 20000(1.01)ᵗ. In how many years will Town A surpass Town B? Justify with algebra and explain what assumptions make this model unrealistic.', answer: '15000(1.03)ᵗ > 20000(1.01)ᵗ → (1.03/1.01)ᵗ > 4/3 → t·log(1.0198) > log(1.333) → t > log(1.333)/log(1.0198) ≈ 14.7 years. Model assumes constant growth rates, unlimited resources, no migration — unrealistic long-term.', hint: 'Divide both sides by 20000 and by 1.01ᵗ to isolate the exponential, then take logs.' },
            { stem: 'You want to save $50,000 for a house down payment. You can invest at 6% compounded monthly. Compare three strategies: (a) lump sum now, (b) lump sum in 2 years at a higher rate of 7%, or (c) figure out how long the 6% investment takes. Which requires the least initial investment? Justify.', answer: '(a) P = 50000/(1.005)^(n) — need a time frame. For 10 years: P = 50000/1.005^120 ≈ $27,440. (b) 8 years at 7% monthly: P = 50000/1.00583^96 ≈ $28,598. (c) Time: 50000 = P(1.005)^t. Strategy (a) at 10 years requires least initial investment ($27,440) due to longer compounding.', hint: 'Use A = P(1 + r/n)^(nt) and solve for P in each case. Compare.' },
            { stem: 'Carbon-14 has a half-life of 5730 years. An archaeologist finds a tool with 35% of its original C-14 remaining. Estimate the age of the tool. Explain each step and discuss sources of error in carbon dating.', answer: 'Model: N = N₀(1/2)^(t/5730). Set N/N₀ = 0.35: 0.35 = (0.5)^(t/5730). Take ln: ln(0.35) = (t/5730)·ln(0.5) → t = 5730·ln(0.35)/ln(0.5) ≈ 5730 · 1.5146 ≈ 8679 years. Sources of error: contamination, atmospheric C-14 variation, measurement precision.', hint: 'Use the half-life formula and logarithms. After solving, think about what could affect accuracy.' }
        ]
    },

    'geometric proofs and reasoning': {
        grade: 10,
        dok1: [
            { stem: 'Name the triangle congruence postulate: two triangles share two sides and the included angle in common.', answer: 'SAS (Side-Angle-Side)', hint: 'The angle must be between the two known sides.' },
            { stem: 'If two parallel lines are cut by a transversal, and one angle measures 65°, what is the measure of its alternate interior angle?', answer: '65° (alternate interior angles are congruent)', hint: 'Alternate interior angles formed by parallel lines and a transversal are equal.' },
            { stem: 'What is the sum of interior angles in a triangle?', answer: '180°', hint: 'This is the Triangle Angle Sum Theorem.' },
            { stem: 'If angle A = 40° and angle B = 75° in triangle ABC, find angle C.', answer: 'Angle C = 180° - 40° - 75° = 65°', hint: 'All angles in a triangle sum to 180°.' },
            { stem: 'Two angles are supplementary. One measures 112°. What is the other?', answer: '68° (180° - 112° = 68°)', hint: 'Supplementary angles sum to 180°.' },
            { stem: 'List the four triangle congruence criteria (postulates/theorems).', answer: 'SSS, SAS, ASA, AAS', hint: 'These involve combinations of sides (S) and angles (A).' },
            { stem: 'Lines m and n are parallel. A transversal creates a co-interior (same-side interior) angle of 125°. What is the other co-interior angle?', answer: '55° (co-interior angles are supplementary: 180° - 125° = 55°)', hint: 'Co-interior angles (same-side interior) sum to 180° when lines are parallel.' }
        ],
        dok2: [
            { stem: 'In triangles PQR and STU, PQ = ST, QR = TU, and angle Q = angle T = 90°. Which congruence criterion applies? Explain.', answer: 'SAS: PQ = ST (side), angle Q = angle T (included angle), QR = TU (side). The right angle is the included angle between the two known sides.', hint: 'Identify which sides and angles correspond, and check if the angle is included.' },
            { stem: 'Prove that the base angles of isosceles triangle ABC (where AB = AC) are congruent using a two-column proof.', answer: 'Draw median AD to midpoint D of BC. In triangles ABD and ACD: AB = AC (given), BD = DC (D is midpoint), AD = AD (reflexive). By SSS, triangles ABD ≅ ACD. Therefore angle B = angle C (CPCTC).', hint: 'Draw an auxiliary line (median or altitude) to create two congruent triangles.' },
            { stem: 'Two parallel lines are cut by a transversal. One angle is (3x + 10)° and its corresponding angle is (5x - 20)°. Find x and both angle measures.', answer: 'Corresponding angles are equal: 3x + 10 = 5x - 20 → 30 = 2x → x = 15. Both angles = 55°.', hint: 'Corresponding angles formed by parallel lines are congruent. Set the expressions equal.' },
            { stem: 'In the figure, line AB ∥ line CD. Angle ABE = 50° and angle DCE = 70°. Find angle BEC.', answer: 'In triangle BEC: angle B = 50° (alternate interior with ABE), angle C = 70° (alternate interior with DCE). Angle BEC = 180° - 50° - 70° = 60°.', hint: 'Use alternate interior angles to find the angles inside the triangle, then apply angle sum.' },
            { stem: 'A bridge truss has a triangular support. If two sides measure 8m and 8m, and the base is 6m, prove this triangle is isosceles and find the height.', answer: 'Isosceles because two sides are equal (8m = 8m). Height bisects the base: h² + 3² = 8² → h² = 64 - 9 = 55 → h = √55 ≈ 7.42 m.', hint: 'Use the definition of isosceles (two equal sides) and the Pythagorean theorem for height.' },
            { stem: 'Given: angle 1 and angle 2 are vertical angles, and angle 2 and angle 3 are supplementary. If angle 3 = 130°, find angle 1. Justify each step.', answer: 'Angle 2 = 180° - 130° = 50° (supplementary with angle 3). Angle 1 = 50° (vertical angles with angle 2 are congruent).', hint: 'Work backward: supplementary angles sum to 180°, vertical angles are equal.' }
        ],
        dok3: [
            { stem: 'Write a complete two-column proof: Given that ABCD is a parallelogram, prove that opposite sides are congruent (AB = CD and BC = DA).', answer: 'Draw diagonal AC. (1) AB ∥ CD (def. of parallelogram). (2) Angle BAC = angle DCA (alt. int. angles). (3) BC ∥ AD (def. of parallelogram). (4) Angle BCA = angle DAC (alt. int. angles). (5) AC = AC (reflexive). (6) Triangle ABC ≅ Triangle CDA (ASA). (7) AB = CD and BC = DA (CPCTC).', hint: 'Draw a diagonal to create two triangles. Use properties of parallel lines to find congruent angles.' },
            { stem: 'An engineer needs to verify that two triangular steel plates are identical. She can only measure distances (not angles). What measurements should she take, which congruence theorem applies, and why is this sufficient?', answer: 'Measure all three sides of each triangle. If all three pairs are equal, SSS guarantees congruence. This is sufficient because SSS states that if three sides of one triangle equal three sides of another, the triangles are congruent — the shape is completely determined by three side lengths.', hint: 'Think about which congruence criterion uses only sides, and explain why three sides uniquely determine a triangle.' },
            { stem: 'Prove that the angle bisector of the vertex angle of an isosceles triangle is also the perpendicular bisector of the base. Use a formal proof with clear reasoning.', answer: 'Given: Isosceles triangle ABC with AB = AC, and AD bisects angle A. (1) AB = AC (given). (2) Angle BAD = angle CAD (AD bisects angle A). (3) AD = AD (reflexive). (4) Triangle ABD ≅ Triangle ACD (SAS). (5) BD = CD (CPCTC) — so D is the midpoint of BC. (6) Angle ADB = angle ADC (CPCTC). (7) Angle ADB + angle ADC = 180° (linear pair). (8) 2·angle ADB = 180°, so angle ADB = 90°. Therefore AD is perpendicular to BC at its midpoint, making AD the perpendicular bisector of BC.', hint: 'Use SAS to prove the two triangles formed by the bisector are congruent, then use CPCTC.' }
        ]
    },

    'right triangle trigonometry': {
        grade: 10,
        dok1: [
            { stem: 'In a right triangle, the side opposite angle A is 5 and the hypotenuse is 13. Find sin(A).', answer: 'sin(A) = 5/13', hint: 'SOH: sin = opposite / hypotenuse.' },
            { stem: 'Find cos(60°).', answer: 'cos(60°) = 1/2 = 0.5', hint: 'This is a special angle from the 30-60-90 triangle.' },
            { stem: 'In a right triangle with legs 3 and 4, find tan(θ) where θ is the angle opposite the side of length 3.', answer: 'tan(θ) = 3/4 = 0.75', hint: 'TOA: tan = opposite / adjacent.' },
            { stem: 'Find the missing side: right triangle with hypotenuse 10 and one leg 6.', answer: 'Other leg = √(10² - 6²) = √(100 - 36) = √64 = 8', hint: 'Use the Pythagorean theorem: a² + b² = c².' },
            { stem: 'What are the side ratios in a 45-45-90 triangle?', answer: '1 : 1 : √2 (legs are equal, hypotenuse is leg × √2)', hint: 'This is an isosceles right triangle.' },
            { stem: 'What are the side ratios in a 30-60-90 triangle?', answer: '1 : √3 : 2 (short leg : long leg : hypotenuse)', hint: 'The shortest side is opposite the 30° angle.' },
            { stem: 'If tan(θ) = 1, what is θ?', answer: 'θ = 45°', hint: 'When opposite = adjacent, the angle is 45°.' },
            { stem: 'Find sin(30°) and cos(30°).', answer: 'sin(30°) = 1/2, cos(30°) = √3/2', hint: 'Use the 30-60-90 triangle ratios with hypotenuse 2.' }
        ],
        dok2: [
            { stem: 'A 20-foot ladder leans against a building making a 65° angle with the ground. How high up the building does it reach?', answer: 'sin(65°) = h/20 → h = 20·sin(65°) ≈ 20(0.9063) ≈ 18.13 feet', hint: 'The height is the side opposite the 65° angle. Use sine.' },
            { stem: 'From the top of a 150-foot lighthouse, the angle of depression to a ship is 12°. How far is the ship from the base of the lighthouse?', answer: 'tan(12°) = 150/d → d = 150/tan(12°) ≈ 150/0.2126 ≈ 705.7 feet', hint: 'The angle of depression equals the angle of elevation from the ship. Use tangent with opposite = 150.' },
            { stem: 'A ramp must rise 3 feet over a horizontal distance of 18 feet. Find the angle of inclination.', answer: 'tan(θ) = 3/18 = 1/6 → θ = arctan(1/6) ≈ 9.46°', hint: 'Use inverse tangent: θ = tan⁻¹(opposite/adjacent).' },
            { stem: 'A surveyor stands 80 meters from the base of a cell tower. The angle of elevation to the top is 52°. Find the height of the tower.', answer: 'tan(52°) = h/80 → h = 80·tan(52°) ≈ 80(1.2799) ≈ 102.4 meters', hint: 'The tower is opposite the angle, and the distance is adjacent. Use tangent.' },
            { stem: 'In a right triangle, angle A = 35° and the side adjacent to A is 12 cm. Find the hypotenuse and the opposite side.', answer: 'cos(35°) = 12/c → c = 12/cos(35°) ≈ 14.65 cm. sin(35°) = opp/14.65 → opp ≈ 8.40 cm.', hint: 'Use cosine to find the hypotenuse, then sine (or Pythagorean theorem) for the opposite side.' },
            { stem: 'A pilot flying at 5000 feet altitude sees two landmarks on the ground. The angles of depression are 25° and 40°. How far apart are the landmarks (assuming they are in line with the plane)?', answer: 'Distance to first: d₁ = 5000/tan(25°) ≈ 10,723 ft. Distance to second: d₂ = 5000/tan(40°) ≈ 5959 ft. Distance apart = 10,723 - 5959 ≈ 4764 feet.', hint: 'Find the horizontal distance to each landmark using tan, then subtract.' },
            { stem: 'A roof has a 7/12 pitch (rises 7 inches for every 12 inches of run). Find the angle of the roof and the length of the rafter for a 24-foot wide building.', answer: 'Angle: θ = arctan(7/12) ≈ 30.26°. Half-width = 12 feet. Rise = 7 feet. Rafter = √(12² + 7²) = √193 ≈ 13.89 feet.', hint: 'The pitch gives you opposite/adjacent for half the roof. Use inverse tangent for the angle and Pythagorean theorem for the rafter.' }
        ],
        dok3: [
            { stem: 'A search-and-rescue team spots a stranded hiker from two different points along a straight road, 500 meters apart. From point A, the angle to the hiker is 72° from the road. From point B, it is 58° from the road. How far is the hiker from the road? Show all work and justify your approach.', answer: 'Let d = perpendicular distance from hiker to road. From A: d = x·tan(72°) where x is the distance along the road from A to the foot of the perpendicular. From B: d = (500-x)·tan(58°). Set equal: x·tan(72°) = (500-x)·tan(58°) → x(3.0777) = (500-x)(1.6003) → 3.0777x = 800.15 - 1.6003x → 4.678x = 800.15 → x ≈ 171.1 m. So d = 171.1·tan(72°) ≈ 526.5 meters.', hint: 'Set up two right triangles sharing the same height (distance from the road). Use the two angles to write two equations and solve.' },
            { stem: 'An architect is designing a wheelchair ramp that must comply with ADA standards (maximum slope of 1:12, meaning 1 inch of rise per 12 inches of run). The entrance is 30 inches above ground. Design the ramp: find the minimum length, the angle, and determine if a landing is needed (required every 30 feet of ramp length). Justify your design.', answer: 'Min horizontal run: 30 × 12 = 360 inches = 30 feet. Ramp length: √(360² + 30²) = √(129600 + 900) = √130500 ≈ 361.2 inches ≈ 30.1 feet. Angle: θ = arctan(1/12) ≈ 4.76°. Since ramp > 30 feet, one intermediate landing is required. Design: two 15-foot sections with a 5-foot landing between them.', hint: 'Use the 1:12 ratio to find run, then Pythagorean theorem for ramp length. Check ADA landing requirements.' },
            { stem: 'A civil engineer needs to find the height of a cliff on the opposite side of a river. She measures the angle of elevation to the top as 35° from point A, walks 200 meters directly toward the cliff to point B, and measures the angle as 52°. Find the height of the cliff and the width of the river. Prove that your system of equations has a unique solution.', answer: 'Let h = height, d = distance from B to cliff base. From B: h = d·tan(52°). From A: h = (d+200)·tan(35°). Set equal: d·tan(52°) = (d+200)·tan(35°) → d(1.2799) = d(0.7002) + 140.04 → 0.5797d = 140.04 → d ≈ 241.6 m. Height h = 241.6·tan(52°) ≈ 309.2 m. River width = d = 241.6 m. The system has a unique solution because the two linear equations in d have different slopes (coefficients of d differ since tan(52°) ≠ tan(35°)), guaranteeing exactly one intersection.', hint: 'Create two right triangles with the same height. Write h in terms of d from each, set equal, and solve for d.' }
        ]
    },

    'circles and transformations': {
        grade: 10,
        dok1: [
            { stem: 'Write the equation of a circle with center (3, -2) and radius 5.', answer: '(x - 3)² + (y + 2)² = 25', hint: 'Standard form: (x - h)² + (y - k)² = r².' },
            { stem: 'Identify the center and radius: (x + 1)² + (y - 4)² = 36', answer: 'Center (-1, 4), radius 6', hint: '(x + 1) means h = -1. r² = 36, so r = 6.' },
            { stem: 'Find the arc length of a 90° arc in a circle with radius 8.', answer: 'Arc length = (90/360) × 2π(8) = 4π ≈ 12.57 units', hint: 'Arc length = (θ/360) × 2πr.' },
            { stem: 'Find the area of a sector with central angle 60° and radius 12.', answer: 'Area = (60/360) × π(12²) = (1/6)(144π) = 24π ≈ 75.40 sq units', hint: 'Sector area = (θ/360) × πr².' },
            { stem: 'Reflect the point (4, -3) over the x-axis.', answer: '(4, 3)', hint: 'Reflecting over the x-axis changes the sign of the y-coordinate.' },
            { stem: 'Translate the point (2, 5) by the vector ⟨-3, 4⟩.', answer: '(-1, 9)', hint: 'Add the vector components: (2 + (-3), 5 + 4).' },
            { stem: 'Rotate the point (1, 0) by 90° counterclockwise about the origin.', answer: '(0, 1)', hint: 'The 90° CCW rotation rule: (x, y) → (-y, x).' },
            { stem: 'What type of symmetry does a regular hexagon have?', answer: 'Rotational symmetry of order 6 (60° intervals) and 6 lines of reflective symmetry.', hint: 'Count how many times the hexagon maps onto itself in one full rotation.' }
        ],
        dok2: [
            { stem: 'A sprinkler waters a circular area with the equation (x - 5)² + (y + 3)² = 100. Does the sprinkler reach the point (13, 3)?', answer: 'Check: (13-5)² + (3+3)² = 64 + 36 = 100. Yes, (13, 3) is exactly on the circle, so the sprinkler just reaches it.', hint: 'Substitute the point into the equation. If ≤ r², the point is reached.' },
            { stem: 'A pizza has a 14-inch diameter. You eat a slice with a central angle of 45°. What area of pizza did you eat?', answer: 'r = 7 inches. Area = (45/360) × π(7²) = (1/8)(49π) ≈ 19.24 sq inches.', hint: 'Use the sector area formula. Remember: diameter = 14, so radius = 7.' },
            { stem: 'Triangle ABC has vertices A(1, 2), B(4, 2), C(4, 6). Reflect it over the y-axis and give the new coordinates.', answer: 'A\'(-1, 2), B\'(-4, 2), C\'(-4, 6)', hint: 'Reflecting over the y-axis changes the sign of each x-coordinate.' },
            { stem: 'A Ferris wheel has a radius of 30 feet and makes one revolution every 2 minutes. How far does a rider travel in 45 seconds?', answer: 'Full circumference = 2π(30) = 60π ft. In 45 sec (= 45/120 = 3/8 of a revolution): distance = (3/8)(60π) = 22.5π ≈ 70.69 feet.', hint: 'Find what fraction of a full revolution 45 seconds represents, then multiply by the circumference.' },
            { stem: 'Rewrite x² + y² - 6x + 4y - 12 = 0 in standard form to identify the center and radius of the circle.', answer: '(x² - 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4 → (x - 3)² + (y + 2)² = 25. Center (3, -2), radius 5.', hint: 'Complete the square for both x and y terms.' },
            { stem: 'A circular garden has center (0, 0) and radius 10 meters. A straight path follows the line y = 6. Find the length of the path that crosses through the garden.', answer: 'Substitute y = 6: x² + 36 = 100 → x² = 64 → x = ±8. Path length = 8 - (-8) = 16 meters.', hint: 'Find where the line intersects the circle by substituting y = 6 into the circle equation.' },
            { stem: 'Rotate triangle with vertices A(2, 1), B(5, 1), C(5, 4) by 180° about the origin. What are the new vertices? Is the image congruent to the original?', answer: 'A\'(-2, -1), B\'(-5, -1), C\'(-5, -4). Yes, the image is congruent — rotation is a rigid transformation that preserves distances and angles.', hint: '180° rotation rule: (x, y) → (-x, -y). Rigid transformations preserve congruence.' }
        ],
        dok3: [
            { stem: 'A cell phone tower at position (2, 3) has a broadcast range of 8 miles. A second tower at (10, 9) has a range of 6 miles. Write the equations for both coverage areas. Determine algebraically whether the two coverage areas overlap, and if so, describe the overlap region.', answer: 'Tower 1: (x-2)² + (y-3)² = 64. Tower 2: (x-10)² + (y-9)² = 36. Distance between centers: √((10-2)² + (9-3)²) = √(64+36) = √100 = 10. Sum of radii = 14 > 10, and |8-6| = 2 < 10, so circles overlap. The overlap region is a lens-shaped area between the two intersection points.', hint: 'Find the distance between centers and compare to the sum and difference of radii.' },
            { stem: 'A landscape architect designs a circular fountain of radius 5 meters at the center of a square courtyard. She adds four identical sector-shaped garden beds, each with a 90° central angle and radius 5m, at the four corners. Find: (a) the area of the fountain, (b) the total area of the garden beds, (c) the remaining courtyard area if the square has side length 20m. Explain why the garden beds do not overlap with the fountain.', answer: '(a) Fountain area = π(5²) = 25π ≈ 78.54 m². (b) Each sector = (90/360)π(5²) = 25π/4. Four sectors = 25π ≈ 78.54 m². (c) Square area = 400 m². Remaining = 400 - 25π - 25π = 400 - 50π ≈ 242.92 m². The garden beds are at the corners (centered at corner points) while the fountain is at the center. Since the courtyard is 20m wide and the fountain radius is 5m, the fountain edge is 5m from center. Corner sectors are at distance 10√2 ≈ 14.14m from center, so no overlap.', hint: 'Calculate each area using sector and circle formulas. Check overlap by comparing distances.' },
            { stem: 'A graphic designer creates a logo by starting with a unit square with vertices (0,0), (1,0), (1,1), (0,1). She applies three transformations in sequence: (1) reflect over the line y = x, (2) rotate 90° counterclockwise about the origin, (3) translate by ⟨2, 3⟩. Find the final coordinates of all four vertices. Then determine a single transformation that achieves the same result as all three combined.', answer: 'Start: (0,0), (1,0), (1,1), (0,1). After reflection over y=x: (0,0), (0,1), (1,1), (1,0). After 90° CCW rotation (x,y)→(-y,x): (0,0), (-1,0), (-1,1), (0,1). After translate ⟨2,3⟩: (2,3), (1,3), (1,4), (2,4). The combined effect maps (x,y) → (-y+2, x+3). This is equivalent to a 90° counterclockwise rotation about the point (2.5, 0.5) followed by appropriate adjustment — or more precisely, the mapping (x,y) → (2-y, 3+x) is a 90° CCW rotation about the fixed point where 2-y=x and 3+x=y, giving x=-0.5, y=2.5: center (-0.5, 2.5).', hint: 'Apply each transformation to all four points in order. To find the single equivalent transformation, look for a fixed point.' }
        ]
    }
};

// Expose on window so modules using window.DOK_PROBLEMS (e.g. ProblemGenerator) can find it
if (typeof window !== 'undefined') window.DOK_PROBLEMS = DOK_PROBLEMS;

// ==================== SENTENCE FRAMES DATABASE ====================
// ELL scaffolding sentence frames organized by math activity type
// Used for discussion slides and team collaboration prompts
// ===================================================================

const SENTENCE_FRAMES = {
    problem_solving: [
        "I think the answer is _____ because _____.",
        "First, I will _____, then I will _____.",
        "The problem is asking me to find _____.",
        "I know that _____, so I can _____.",
        "My strategy is to _____ because _____."
    ],
    comparing: [
        "_____ is greater/less than _____ because _____.",
        "These are similar because they both _____.",
        "The difference between _____ and _____ is _____.",
        "I notice that _____ while _____ is different because _____."
    ],
    explaining: [
        "I agree/disagree with _____ because _____.",
        "Another way to think about this is _____.",
        "This makes sense because _____.",
        "The pattern I see is _____.",
        "I can prove this by _____."
    ],
    vocabulary: [
        "_____ means _____. An example is _____.",
        "_____ and _____ are related because _____.",
        "In my own words, _____ means _____.",
        "I used _____ (vocab word) when I _____."
    ],
    reflection: [
        "Today I learned that _____.",
        "I used to think _____, but now I know _____.",
        "Something I still wonder about is _____.",
        "The most important idea from today is _____.",
        "I feel confident about _____ but need more practice with _____."
    ]
};

// ==================== TEAM ROLE PROMPTS ====================
// Context-specific prompts for each team role during math activities
// ===============================================================

const TEAM_ROLE_PROMPTS = {
    problem_launch: {
        facilitator: [
            "Who wants to read the problem aloud?",
            "What do we need to do to get started?",
            "Let's make sure everyone understands before we begin."
        ],
        resource_manager: [
            "What materials do we need?",
            "What are we supposed to figure out?",
            "Do we need to ask the teacher anything?"
        ],
        task_manager: [
            "What should we try first?",
            "Do we all agree on our approach?",
            "We have _____ minutes — let's stay on track."
        ],
        recorder_reporter: [
            "I'll write down our work and thinking.",
            "What are we going to say to the class?",
            "Let me record what _____ said."
        ]
    },
    discussion: {
        facilitator: [
            "Who has an idea to share?",
            "_____, what do you think?",
            "Does everyone agree, or does someone see it differently?"
        ],
        resource_manager: [
            "What information do we have?",
            "What do we still need to know?",
            "Can someone explain that in another way?"
        ],
        task_manager: [
            "Are we answering the right question?",
            "Let's check our work before moving on.",
            "Are we ready for the next part?"
        ],
        recorder_reporter: [
            "So our answer is _____ because _____.",
            "I'll present: we found that _____.",
            "Let me summarize what we discussed."
        ]
    }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get DOK problems for detected topics
 * @param {string[]} topics - Array of detected topic names
 * @returns {object} { topic: string, problems: { dok1: [], dok2: [], dok3: [] } }[]
 */
function getLeveledProblems(topics) {
    const results = [];
    for (const topic of topics) {
        // Exact match
        if (DOK_PROBLEMS[topic]) {
            results.push({ topic, problems: DOK_PROBLEMS[topic] });
            continue;
        }
        // Fuzzy match: check if any DOK key is contained in topic or vice versa
        const tLower = topic.toLowerCase();
        for (const [key, data] of Object.entries(DOK_PROBLEMS)) {
            if (tLower.includes(key) || key.includes(tLower)) {
                results.push({ topic, problems: data });
                break;
            }
            // Word overlap
            const tWords = tLower.split(/\s+/);
            const kWords = key.split(/\s+/);
            const overlap = tWords.filter(w => w.length > 3 && kWords.includes(w));
            if (overlap.length >= 2) {
                results.push({ topic, problems: data });
                break;
            }
        }
    }
    return results;
}

/**
 * Get sentence frames relevant to detected activity types
 * @param {object[]} slides - Array of classified slides
 * @returns {object} Categorized sentence frames relevant to the lesson
 */
function getRelevantSentenceFrames(slides) {
    const types = slides.map(s => s.type);
    const frames = {};

    // Always include problem solving and explaining
    frames.problem_solving = SENTENCE_FRAMES.problem_solving;
    frames.explaining = SENTENCE_FRAMES.explaining;

    // Add comparing if there are comparison-related slides
    if (types.some(t => ['PROBLEM_SLIDE', 'NOTICE_WONDER', 'WOULD_YOU_RATHER'].includes(t))) {
        frames.comparing = SENTENCE_FRAMES.comparing;
    }

    // Add vocabulary if vocabulary cards detected or teaching insights have terms
    frames.vocabulary = SENTENCE_FRAMES.vocabulary;

    // Always include reflection for closure
    frames.reflection = SENTENCE_FRAMES.reflection;

    return frames;
}

/**
 * Get role prompts based on slide types present
 * @param {object[]} slides - Array of classified slides
 * @returns {object} Role prompts for problem launch and discussion
 */
function getRelevantRolePrompts(slides) {
    const prompts = {};
    const types = slides.map(s => s.type);

    if (types.some(t => ['PROBLEM_SLIDE', 'ACTIVITY_LAUNCH', 'FOCUS_SKILL_DETAIL'].includes(t))) {
        prompts.problem_launch = TEAM_ROLE_PROMPTS.problem_launch;
    }
    if (types.some(t => ['GROUP_DISCUSSION', 'STORY_MISSION', 'CLOSURE', 'NOTICE_WONDER'].includes(t))) {
        prompts.discussion = TEAM_ROLE_PROMPTS.discussion;
    }

    // Default: include both
    if (Object.keys(prompts).length === 0) {
        prompts.problem_launch = TEAM_ROLE_PROMPTS.problem_launch;
        prompts.discussion = TEAM_ROLE_PROMPTS.discussion;
    }

    return prompts;
}
