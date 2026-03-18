# VINCULUM Math Solutions — Grade 1 & Grade 2 App Plan

## Architecture Pattern (All Apps Follow This)

Every VINCULUM tool is a single self-contained HTML file with the VINCULUM dark theme, three modes (Explore / Practice / Play), and three difficulty tiers (Emergent / Proficient / Advanced). The mode tab bar uses a pill-style container with equal-width buttons: Explore (cyan tint), Practice (green tint), Play (pink gradient). A right-side panel provides contextual help, vocabulary, and tips per mode.

---

# GRADE 1 — Full App Specifications

## Standards Coverage Map

| Domain | Standards | App Name | File |
|--------|-----------|----------|------|
| 1.OA (Operations & Algebraic Thinking) | 1.OA.A.1, 1.OA.A.2 | **Addition Number Line** ✅ EXISTS | `tools/1/addition-number-line.html` |
| 1.OA | 1.OA.B.3, 1.OA.B.4 | **Fact Family Houses** | `tools/1/fact-family-houses.html` |
| 1.OA | 1.OA.C.5, 1.OA.C.6 | **Addition & Subtraction Fluency** | `tools/1/add-sub-fluency.html` |
| 1.OA | 1.OA.D.7, 1.OA.D.8 | **Equation Balance** | `tools/1/equation-balance.html` |
| 1.NBT (Number & Operations Base Ten) | 1.NBT.A.1 | **Counting to 120** | `tools/1/counting-120.html` |
| 1.NBT | 1.NBT.B.2a, 1.NBT.B.2b, 1.NBT.B.2c, 1.NBT.B.3 | **Place Value Tens & Ones** ✅ EXISTS (Hub) | `tools/1/place-value-tens-ones.html` |
| 1.NBT | 1.NBT.C.4, 1.NBT.C.5, 1.NBT.C.6 | **Two-Digit Add & Subtract** | `tools/1/two-digit-operations.html` |
| 1.MD (Measurement & Data) | 1.MD.A.1, 1.MD.A.2 | **Length Comparisons** | `tools/1/length-comparisons.html` |
| 1.MD | 1.MD.B.3 | **Clock Reader** | `tools/1/clock-reader.html` |
| 1.MD | 1.MD.C.4 | **Data & Graphs** | `tools/1/data-graphs.html` |
| 1.G (Geometry) | 1.G.A.1 | **Shape Attributes** | `tools/1/shape-attributes.html` |
| 1.G | 1.G.A.2, 1.G.A.3 | **Fraction Shapes** | `tools/1/fraction-shapes.html` |

**Total Grade 1 Apps: 12 (1 exists, 1 in Hub, 10 to build)**

---

## App 1: Addition Number Line ✅ EXISTS
**File:** `tools/1/addition-number-line.html`
**Standards:** 1.OA.A.1, 1.OA.A.2
**Status:** Built and reviewed in prior session.

---

## App 2: Fact Family Houses
**File:** `tools/1/fact-family-houses.html`
**Standards:** 1.OA.B.3 (commutative/associative properties), 1.OA.B.4 (subtraction as unknown-addend)
**MN:** 1.1.2.2 | **TEKS:** 1.3D, 1.5E

### Explore Mode
- Visual "house" SVG: peaked roof with three numbers — the whole at the top, two parts at the bottom corners
- Tap a number selector (2–18) to set the whole
- The house automatically shows ALL four related facts animated one at a time:
  - 3 + 5 = 8 → the parts hop up to the roof with a trail
  - 5 + 3 = 8 → same animation, reversed order
  - 8 − 3 = 5 → the whole slides down, one part disappears
  - 8 − 5 = 3 → same, other part disappears
- Counter dots inside each number circle scaffold the quantity
- Side panel: vocabulary (Fact Family, Related Facts, Commutative Property in kid terms: "You can add in any order!")

### Practice Mode
- Shows a house with one of the four facts missing (the ? pulses)
- Student taps the correct number from 3 answer buttons
- Visual feedback: correct = green glow + fact animates into place; wrong = shake + try again
- Difficulty tiers:
  - **Emergent:** Sums to 10, missing result only (3 + 5 = ?)
  - **Proficient:** Sums to 15, missing any position (? + 5 = 8, or 8 − ? = 3)
  - **Advanced:** Sums to 18, missing any position, timer pressure

### Play Mode
- Rapid-fire fact family completions, 3 answer choices
- 10-point streak scoring, combo multiplier
- Shapes fly in as confetti on streaks of 5+

---

## App 3: Addition & Subtraction Fluency
**File:** `tools/1/add-sub-fluency.html`
**Standards:** 1.OA.C.5 (relate counting to add/sub), 1.OA.C.6 (fluency within 10, strategies within 20)
**MN:** 1.1.2.4 | **TEKS:** 1.3A, 1.3B, 1.5A

### Explore Mode
- Interactive strategy selector — student picks a strategy and watches it animate:
  - **Count On:** Number line hops forward from the first addend
  - **Count Back:** Number line hops backward for subtraction
  - **Make a 10:** Two ten-frames side by side, dots slide from one to fill the other to 10, then count remaining
  - **Doubles:** Mirror animation showing 6 + 6 with identical dot groups that merge
  - **Near Doubles:** Shows 6 + 7 as "6 + 6 + 1" with the extra dot highlighted
- Each strategy shows the equation building step by step with animated components
- Side panel: strategy name, when to use it, "Try it!" prompt

### Practice Mode
- Given a problem (e.g., 8 + 7), student first picks which strategy to use (buttons), then solves
- After answering, the chosen strategy animates to confirm or teach
- Difficulty tiers:
  - **Emergent:** Add/sub within 10, strategies provided
  - **Proficient:** Within 20, student chooses strategy
  - **Advanced:** Within 20, speed focus, no strategy hints

### Play Mode
- Speed rounds: problems appear, 4 answer buttons, 5-second timer per problem
- Streak-based scoring with level progression
- Celebration animations at milestones (10, 25, 50 correct)

---

## App 4: Equation Balance
**File:** `tools/1/equation-balance.html`
**Standards:** 1.OA.D.7 (meaning of equals sign), 1.OA.D.8 (unknown in equation)
**MN:** 1.1.2.1 | **TEKS:** 1.5D, 1.5E

### Explore Mode
- Visual balance/seesaw SVG: left pan and right pan
- Student drags number blocks (cubes) onto each pan
- The balance tilts left, right, or levels based on the totals
- Below the balance: the equation builds live (e.g., "3 + 4 = 7")
- The = sign GLOWS when balanced — teaches that = means "the same as"
- Drag-and-drop interaction with snap-to-pan physics
- Toggle: show/hide the counter dots on blocks

### Practice Mode
- An equation with a ? box: "6 + ? = 9" or "? = 4 + 3" or "5 + 2 = ? + 4"
- The balance shows cubes on one side, student adds cubes to the other until balanced
- Then taps the number answer
- Difficulty tiers:
  - **Emergent:** Result unknown (a + b = ?), sums to 10
  - **Proficient:** Any position unknown, sums to 15, includes subtraction
  - **Advanced:** Both sides have operations (3 + 5 = ? + 2), sums to 20

### Play Mode
- Balance problems fly in, 4 answer buttons
- Timer per problem, streak scoring
- Visual: the balance animates each answer — correct = satisfying level + green glow, wrong = tilt + wobble

---

## App 5: Counting to 120
**File:** `tools/1/counting-120.html`
**Standards:** 1.NBT.A.1 (count to 120 from any number, read/write numerals)
**MN:** 1.1.1.1, 1.1.1.2 | **TEKS:** 1.2A, 1.2B, 1.5A

### Explore Mode
- 120 chart (10 × 12 grid) with numbers 1–120
- Tap any number to hear it / see it highlighted
- Pattern highlighter: buttons to shade by 2s, 5s, 10s — the pattern emerges with animation (columns/diagonals light up)
- "Start From" selector — pick a number, then tap "Count!" and the numbers light up sequentially from that point with audio count cadence
- Row/column color coding: ones digits same color vertically, tens digits same color horizontally
- Side panel: vocabulary (ones, tens, digit, numeral), pattern observations

### Practice Mode
- "Fill the gap" — a section of the 120 chart has blanks, student taps to type the missing numbers
- "What comes next?" — shows 3 numbers in sequence, student picks the next one
- "Count from ___" — student types the next 5 numbers in sequence
- Difficulty tiers:
  - **Emergent:** Gaps in 1–50, sequential (just one missing)
  - **Proficient:** Gaps in 1–100, skip counting by 2s/5s/10s
  - **Advanced:** Gaps in 1–120, random positions, count backward

### Play Mode
- "Race to 120" — fill in missing numbers on a partially-revealed chart, timed
- Correct = cell fills in green, wrong = shake
- Score based on speed + accuracy

---

## App 6: Place Value Tens & Ones
**File:** `tools/1/place-value-tens-ones.html`
**Standards:** 1.NBT.B.2 (understand two-digit = tens + ones), 1.NBT.B.3 (compare two-digit numbers using <, >, =)
**MN:** 1.1.1.3, 1.1.1.4 | **TEKS:** 1.2B, 1.2C

### Explore Mode
- Base-ten blocks: tens rods (10-unit vertical bar) and ones cubes
- Drag tens rods and ones cubes into a workspace
- As blocks are placed, the number updates live: "4 tens + 3 ones = 43"
- A place value chart (T | O columns) fills in alongside
- Button to "bundle" — drag 10 ones cubes together and they animate into a tens rod
- Comparison mode: two numbers side by side with their blocks, a <, >, = selector between them

### Practice Mode
- "Build the number" — given 56, student drags the right number of tens and ones
- "What number?" — shown blocks, pick the number from choices
- "Compare" — two numbers shown with blocks, pick <, >, =
- Difficulty tiers:
  - **Emergent:** Numbers 10–50, build only
  - **Proficient:** Numbers 10–99, build + identify + compare
  - **Advanced:** Numbers to 99, expanded form (40 + 3 = 43), bundling challenges

### Play Mode
- Quick-fire number identification from block images
- Comparison challenges with scoring
- Streak multiplier

---

## App 7: Two-Digit Add & Subtract
**File:** `tools/1/two-digit-operations.html`
**Standards:** 1.NBT.C.4 (add within 100), 1.NBT.C.5 (find 10 more/less mentally), 1.NBT.C.6 (subtract multiples of 10)
**MN:** 1.1.2.3 | **TEKS:** 1.3C, 1.3E

### Explore Mode
- Split-screen: base-ten blocks on left, vertical algorithm on right
- Student picks two numbers (or uses presets)
- Animated step-by-step addition:
  1. Show ones cubes combining — if total ≥ 10, animate bundling into a tens rod with carry arrow
  2. Show tens rods combining with any carried rod joining in
  3. Final answer builds from the blocks
- Subtraction: reverse process, "unbundling" a tens rod into 10 ones when needed
- "10 More / 10 Less" toggle: pick a number, see a tens rod appear/disappear, number updates

### Practice Mode
- Given a problem, student works through it with block support
- Progressive scaffolding removes blocks as confidence builds
- Difficulty tiers:
  - **Emergent:** Add/sub multiples of 10 (30 + 40, 70 − 20), 10 more/less
  - **Proficient:** Two-digit + one-digit without regrouping, then with regrouping
  - **Advanced:** Two-digit + two-digit with regrouping, mental 10 more/less

### Play Mode
- Problems with 4 answer choices, timed
- Block animation confirms correct answer
- Streak scoring

---

## App 8: Length Comparisons
**File:** `tools/1/length-comparisons.html`
**Standards:** 1.MD.A.1 (order three objects by length), 1.MD.A.2 (express length as whole number of same-size units)
**MN:** 1.3.2.1 | **TEKS:** 1.7A, 1.7B

### Explore Mode
- Objects of varying length (pencil, crayon, snake, worm, car, etc.) displayed as SVG illustrations
- Drag objects to align them at a baseline ruler
- Measurement tools: cubes, paper clips, or inches that snap along the object's length
- Counter shows "This pencil is 7 cubes long"
- Toggle between measuring units (cubes, clips, inches)
- Direct comparison: drag two objects side by side, difference highlights

### Practice Mode
- "Measure it" — given an object, student lays units along it and reports the count
- "Which is longer?" — two objects shown, pick the longer one
- "Order by length" — drag 3 objects from shortest to longest
- Difficulty tiers:
  - **Emergent:** Compare two objects, bigger/smaller only
  - **Proficient:** Measure with unit iteration (count cubes), compare two
  - **Advanced:** Order three objects, measure and compare numerically

### Play Mode
- Quick measurement challenges, timed
- Ordering races (drag to sort, scored by speed + accuracy)

---

## App 9: Clock Reader
**File:** `tools/1/clock-reader.html`
**Standards:** 1.MD.B.3 (tell and write time to the hour and half-hour)
**MN:** 1.3.2.2 | **TEKS:** 1.7E

### Explore Mode
- Large analog clock SVG with draggable hour and minute hands
- As hands move, digital time updates live below
- "Set to" buttons: 1:00, 2:00, ... 12:00, 1:30, 2:30, ... 12:30
- Hour hand vs minute hand coloring (hour = short/cyan, minute = long/pink)
- Animation: watch the hands sweep to show how time passes
- "What does the short hand show?" / "What does the long hand show?" callouts
- Side panel: vocabulary (hour hand, minute hand, o'clock, half past, clockwise)

### Practice Mode
- "What time is it?" — clock shows a time, student picks from digital options
- "Set the clock" — given a digital time, student drags hands to match
- "Half past or o'clock?" — quick identification
- Difficulty tiers:
  - **Emergent:** Hours only (o'clock), match analog to digital
  - **Proficient:** Hours and half-hours, both directions (read and set)
  - **Advanced:** Mix of hours/half-hours, sequence questions ("What time is 1 hour after 3:30?")

### Play Mode
- Rapid clock reading, 4 digital time choices
- "Set the clock" speed challenges
- Streak scoring with time bonus

---

## App 10: Data & Graphs
**File:** `tools/1/data-graphs.html`
**Standards:** 1.MD.C.4 (organize, represent, interpret data with up to 3 categories)
**MN:** 1.4.1.1 | **TEKS:** 1.8A, 1.8B, 1.8C

### Explore Mode
- Choose a data set (favorite fruits, pet types, weather types, colors)
- Students click to "vote" for each category — picture icons stack up
- Three display modes toggle between: picture graph, bar graph, tally chart
- All three update live as votes are added
- Comparison questions auto-generate: "Which has more?" "How many more ___ than ___?"
- Side panel: vocabulary (data, graph, tally, category, more, fewer, most, least)

### Practice Mode
- Given a pre-made graph, answer questions: "How many chose cats?" "Which has the most?"
- "Build it" — given data in words ("3 apples, 5 bananas, 2 oranges"), student builds the graph
- Difficulty tiers:
  - **Emergent:** 2 categories, simple "how many" and "which has more"
  - **Proficient:** 3 categories, comparison questions ("how many more")
  - **Advanced:** 3 categories, multi-step questions ("How many total?" "How many fewer ___ than ___?")

### Play Mode
- Graph reading quiz, multiple choice, timed
- Quick data interpretation challenges

---

## App 11: Shape Attributes
**File:** `tools/1/shape-attributes.html`
**Standards:** 1.G.A.1 (distinguish defining attributes vs non-defining; build/draw shapes)
**MN:** 1.3.1.1 | **TEKS:** 1.6A, 1.6B

### Explore Mode
- "Attribute Laboratory" — shows a shape (triangle, rectangle, etc.)
- Toggle switches for attributes: change color, size, orientation, thickness — shape updates live
- Key insight animated: "These are all triangles!" shows 5 different triangles (big, small, rotated, different colors) that all share 3 sides + 3 corners
- "What MUST a triangle have?" → 3 straight sides, 3 corners (defining)
- "What CAN change?" → color, size, rotation (non-defining)
- Composite shapes: combine two triangles to make a rectangle, etc.

### Practice Mode
- "Is this a rectangle? Why?" — show various shapes, student answers yes/no and selects the reason
- "Sort by attribute" — drag shapes into groups (has 4 sides / doesn't have 4 sides)
- "Build the shape" — given attributes ("4 sides, all same length"), student picks the correct shape
- Difficulty tiers:
  - **Emergent:** Identify shapes, yes/no with visual hints
  - **Proficient:** Sort by attributes, explain defining vs non-defining
  - **Advanced:** Composite shapes, "what shape can you make from these two?"

### Play Mode
- Shape identification quiz with attribute reasoning
- Sorting speed challenges
- Streak scoring

---

## App 12: Fraction Shapes
**File:** `tools/1/fraction-shapes.html`
**Standards:** 1.G.A.2 (compose 2D/3D shapes), 1.G.A.3 (partition circles/rectangles into halves/fourths)
**MN:** 1.3.1.2 | **TEKS:** 1.6D, 1.6E, 1.6F, 1.6G

### Explore Mode
- Large circle or rectangle SVG in the center
- "Partition" buttons: "Halves" and "Fourths"
- Animated cutting: a line sweeps across the shape to divide it
- Tap each piece to shade it — shows "1 half is shaded" or "2 fourths are shaded"
- Key insight: animate "2 halves = 1 whole" and "4 fourths = 1 whole"
- Show that 2 fourths = 1 half with an overlay animation
- Toggle between circle and rectangle
- Side panel: vocabulary (half, fourth, quarter, whole, equal parts, partition)

### Practice Mode
- "How many equal parts?" — shown a partitioned shape, count the parts
- "Shade one half" — student taps the correct number of pieces
- "Are these halves?" — shown a shape divided unequally, student identifies yes/no
- Difficulty tiers:
  - **Emergent:** Halves only, circles only, identify and shade
  - **Proficient:** Halves and fourths, circles and rectangles
  - **Advanced:** Compare (which shows halves?), equivalence (2/4 = 1/2), non-equal partitions as distractors

### Play Mode
- Quick identification: "What fraction is shaded?"
- Partition matching challenges
- Streak scoring

---
---

# GRADE 2 — Full App Specifications

## Standards Coverage Map

| Domain | Standards | App Name | File |
|--------|-----------|----------|------|
| 2.OA | 2.OA.A.1 | **Word Problem Workshop** | `tools/2/word-problems.html` |
| 2.OA | 2.OA.B.2 | **Fluency to 20** | `tools/2/fluency-20.html` |
| 2.OA | 2.OA.C.3 | **Odd & Even Explorer** | `tools/2/odd-even.html` |
| 2.OA | 2.OA.C.4 | **Array Builder** | `tools/2/array-builder.html` |
| 2.NBT | 2.NBT.A.1, 2.NBT.A.2, 2.NBT.A.3, 2.NBT.A.4 | **Place Value Hundreds** ✅ EXISTS (Hub) | `tools/2/place-value-hundreds.html` |
| 2.NBT | 2.NBT.B.5, 2.NBT.B.6 | **Two-Digit Fluency** | `tools/2/two-digit-fluency.html` |
| 2.NBT | 2.NBT.B.7, 2.NBT.B.8, 2.NBT.B.9 | **Three-Digit Add & Subtract** | `tools/2/three-digit-operations.html` |
| 2.MD | 2.MD.A.1, 2.MD.A.2, 2.MD.A.3, 2.MD.A.4 | **Measurement Lab** | `tools/2/measurement-lab.html` |
| 2.MD | 2.MD.B.5, 2.MD.B.6 | **Number Line Operations** | `tools/2/number-line-operations.html` |
| 2.MD | 2.MD.C.7, 2.MD.C.8 | **Time & Money** | `tools/2/time-money.html` |
| 2.MD | 2.MD.D.9, 2.MD.D.10 | **Line Plots & Graphs** | `tools/2/line-plots.html` |
| 2.G | 2.G.A.1 | **Shape Identifier** | `tools/2/shape-identifier.html` |
| 2.G | 2.G.A.2, 2.G.A.3 | **Partition & Fractions** | `tools/2/partition-fractions.html` |

**Total Grade 2 Apps: 13 (1 in Hub, 12 to build)**

---

## App 1: Word Problem Workshop
**File:** `tools/2/word-problems.html`
**Standards:** 2.OA.A.1 (add/subtract within 100, one- and two-step word problems)
**MN:** 2.1.2.1, 2.1.2.2 | **TEKS:** 2.4A, 2.4C, 2.4D

### Explore Mode
- Animated word problem scene — SVGs depicting the scenario (e.g., kids at a park, apples on a tree)
- The problem text appears phrase by phrase, and each key number gets highlighted and linked to its visual element
- A "model bar" builds below: bar diagram showing parts and whole
- Strategy buttons: "Draw It" (bar model), "Number Line" (hop visualization), "Equation" (symbolic)
- Toggle between problem types: add-to, take-from, put-together, take-apart, compare
- Side panel: key words (in all, how many more, how many left, altogether), problem type identification

### Practice Mode
- Word problem appears with scene illustration
- Step 1: "What are we looking for?" — student picks the unknown
- Step 2: "What operation?" — student picks + or −
- Step 3: "Write the equation" — student builds it from number tiles
- Step 4: "Solve!" — student enters answer
- Scaffolding fades as difficulty increases
- Difficulty tiers:
  - **Emergent:** One-step, within 20, result unknown, bar model provided
  - **Proficient:** One-step, within 100, any unknown position, student draws model
  - **Advanced:** Two-step, within 100, mixed operations

### Play Mode
- Word problem sprint — solve for answer only, 4 choices, timed
- Streak scoring with difficulty ramping

---

## App 2: Fluency to 20
**File:** `tools/2/fluency-20.html`
**Standards:** 2.OA.B.2 (fluently add/subtract within 20 using mental strategies)
**MN:** 2.1.2.4 | **TEKS:** 2.4B

### Explore Mode
- Strategy selector with animated demonstrations:
  - **Make a 10:** Two ten-frames, dots transfer to fill one frame
  - **Decompose:** 14 − 6 shown as 14 − 4 − 2 with step animation
  - **Use Doubles:** 7 + 8 = 7 + 7 + 1 animated with mirror blocks
  - **Count On/Back:** Number line with hop animation
- Each strategy shows multiple examples auto-cycling
- "Which strategy works best?" comparison panel

### Practice Mode
- Flash card style: problem appears, student types or taps answer
- After answering, the optimal strategy animates as reinforcement
- Progress tracker shows mastered vs practicing facts
- Difficulty tiers:
  - **Emergent:** Within 10, addition only, strategy hints shown
  - **Proficient:** Within 20, add and subtract, strategies available on request
  - **Advanced:** Within 20, speed focus, no strategy hints, mixed operations

### Play Mode
- "Beat the Clock" — how many correct in 60 seconds
- Adaptive difficulty: gets harder as student succeeds
- Personal best tracking, streak multiplier

---

## App 3: Odd & Even Explorer
**File:** `tools/2/odd-even.html`
**Standards:** 2.OA.C.3 (determine odd/even, write equations for even numbers as sum of two equals)
**MN:** 2.1.1.2 | **TEKS:** 2.7A

### Explore Mode
- "Pair Parade" — pick a number (1–20), see that many dots appear
- Dots animate into pairs (two columns), last dot alone = ODD, all paired = EVEN
- For even numbers: the equation builds (e.g., "8 = 4 + 4")
- Pattern view: numbers 1–20 on a number line, odds/evens color-coded
- Interactive: tap any number to see its pair visualization
- Side panel: vocabulary (odd, even, pair, equal groups), pattern rule

### Practice Mode
- "Odd or Even?" — shown a number + its dot arrangement, pick odd/even
- "Write the equation" — for even numbers, build the doubles equation
- "What's the pattern?" — fill in missing numbers in odd/even sequences
- Difficulty tiers:
  - **Emergent:** Numbers 1–10, dots always shown
  - **Proficient:** Numbers 1–20, dots on request, equation writing for evens
  - **Advanced:** Numbers to 20, no visual support, pattern extension

### Play Mode
- Rapid odd/even classification, timed
- Equation completion speed rounds
- Streak scoring

---

## App 4: Array Builder
**File:** `tools/2/array-builder.html`
**Standards:** 2.OA.C.4 (rectangular arrays, write equations for total as sum of equal addends)
**MN:** 2.1.2.5 | **TEKS:** 2.6A, 2.6B

### Explore Mode
- Grid workspace where student builds arrays by setting rows and columns (sliders or +/− buttons)
- Dots appear in the array, row by row with animation
- Below: equation builds live: "3 rows of 4 = 4 + 4 + 4 = 12"
- Rotate button: flips the array (3×4 becomes 4×3), showing commutative property
- Real-world overlays: egg carton (2×6), muffin tin (3×4), window panes (2×3)
- Counter dots glow as rows are counted
- Side panel: vocabulary (row, column, array, equal groups, repeated addition)

### Practice Mode
- "Build the array" — given "3 rows of 5," student sets up the array
- "Write the equation" — given an array, write the repeated addition equation
- "How many total?" — array shown, pick the total
- Difficulty tiers:
  - **Emergent:** Arrays up to 5×5, total given, match equation
  - **Proficient:** Arrays up to 5×5, write equation, find total
  - **Advanced:** Arrays up to 5×5, rotate/compare, word problems with arrays

### Play Mode
- Array identification speed rounds
- Equation matching (array → equation)
- Scoring with streak multiplier

---

## App 5: Place Value Hundreds ✅ EXISTS (Hub reference)
**File:** `tools/2/place-value-hundreds.html`
**Standards:** 2.NBT.A.1–A.4

---

## App 6: Two-Digit Fluency
**File:** `tools/2/two-digit-fluency.html`
**Standards:** 2.NBT.B.5 (fluently add/subtract within 100), 2.NBT.B.6 (add up to four two-digit numbers)
**MN:** 2.1.2.3 | **TEKS:** 2.4B, 2.4C

### Explore Mode
- Split workspace: base-ten blocks left, vertical algorithm right
- Animated step-through of strategies:
  - **Standard algorithm** with regrouping visualization (blocks → carry animation)
  - **Number line jumps** (decompose: 46 + 37 = 46 + 30 + 7)
  - **Compensation** (49 + 26 → 50 + 25)
- For adding 4 numbers: visual stacking of addends with running total
- Side panel: strategy comparison, when to use each

### Practice Mode
- Solve problems with optional strategy scaffolding
- Difficulty tiers:
  - **Emergent:** No regrouping, two addends, within 50
  - **Proficient:** With regrouping, two addends, within 100
  - **Advanced:** Three or four addends, within 100, mixed strategies

### Play Mode
- Speed computation rounds, 4 answer choices
- Streak scoring

---

## App 7: Three-Digit Add & Subtract
**File:** `tools/2/three-digit-operations.html`
**Standards:** 2.NBT.B.7 (add/subtract within 1000), 2.NBT.B.8 (mentally add/subtract 10 or 100), 2.NBT.B.9 (explain why strategies work)
**MN:** 2.1.2.2 | **TEKS:** 2.4B, 2.4C

### Explore Mode
- Full base-ten block set: hundreds flats, tens rods, ones cubes
- Animated regrouping across all three place values
- "Mental Math" mode: adding/subtracting 10 or 100 — only the relevant place changes, highlighted with glow
- Strategy explanations with step-by-step text annotations
- Place value chart (H | T | O) updates alongside blocks

### Practice Mode
- Standard algorithm problems with block support fading over time
- Mental math: "+10" and "+100" quick challenges
- "Explain it" — student picks which step is shown from multiple choice
- Difficulty tiers:
  - **Emergent:** Add/sub 10 or 100 mentally, no regrouping in algorithm
  - **Proficient:** With regrouping in one place value
  - **Advanced:** Regrouping across multiple place values, explain strategy

### Play Mode
- Computation speed rounds
- Mental math rapid-fire (+10, −10, +100, −100)

---

## App 8: Measurement Lab
**File:** `tools/2/measurement-lab.html`
**Standards:** 2.MD.A.1–A.4 (measure with appropriate tools, estimate, compare, measure twice with different units)
**MN:** 2.3.2.1, 2.3.2.2 | **TEKS:** 2.9A, 2.9B, 2.9C, 2.9D

### Explore Mode
- Objects to measure (desk, book, shoe, pencil, hand span — SVG illustrations)
- Ruler tool: snap a ruler along the object, read the measurement
- Unit selector: inches, centimeters, feet — watch the number change for the same object
- "Measure twice" challenge: measure the same object with two different units, compare
- Estimation game: guess first, then measure to check
- Side panel: vocabulary (inch, centimeter, foot, estimate, length, measure)

### Practice Mode
- "Measure it" — align ruler, read measurement, enter answer
- "Estimate first" — guess, then measure, see how close
- "Which unit?" — pick appropriate unit for given object
- Difficulty tiers:
  - **Emergent:** Whole number measurements, inches, aligned ruler
  - **Proficient:** Multiple units, estimation before measurement
  - **Advanced:** Compare measurements in different units, difference calculations

### Play Mode
- Estimation challenge: how close can you get?
- Measurement speed rounds
- Scoring based on accuracy

---

## App 9: Number Line Operations
**File:** `tools/2/number-line-operations.html`
**Standards:** 2.MD.B.5 (word problems with lengths), 2.MD.B.6 (whole-number sums/differences on number line)
**MN:** 2.1.2.1 | **TEKS:** 2.9E

### Explore Mode
- Interactive number line (0–100, zoomable)
- Drag to create "hops" — each hop labeled with its value
- Addition: start at a number, hop right, see the sum
- Subtraction: start at a number, hop left, see the difference
- Multi-hop: break a big hop into smaller ones (47 + 25 = +20 then +5)
- Word problem connection: "Maria had 35 stickers. She got 18 more."

### Practice Mode
- Given an equation, student builds the hops on the number line
- Given hops, student writes the equation
- Word problems with number line modeling
- Difficulty tiers:
  - **Emergent:** Within 20, single hop
  - **Proficient:** Within 100, multi-hop decomposition
  - **Advanced:** Within 100, subtraction, word problems

### Play Mode
- Hop-building speed rounds
- Equation-to-number-line matching

---

## App 10: Time & Money
**File:** `tools/2/time-money.html`
**Standards:** 2.MD.C.7 (tell time to nearest 5 min, AM/PM), 2.MD.C.8 (solve money problems with $, ¢, coins)
**MN:** 2.3.2.3, 2.3.2.4 | **TEKS:** 2.9G, 2.9H

### Explore Mode
- **Time tab:** Analog clock with minute marks labeled by 5s, draggable hands, AM/PM toggle, digital readout. "Skip count by 5" animation around the clock face.
- **Money tab:** Coin/bill images (penny, nickel, dime, quarter, dollar bill). Drag coins to a workspace to build amounts. Running total with ¢ and $ notation. Equivalence demonstrations (5 pennies = 1 nickel, etc.)
- Side panel: vocabulary (quarter past, half past, quarter to, AM/PM, cent, dollar, coin values)

### Practice Mode
- Time: read clock, set clock, "What time will it be in 30 minutes?"
- Money: count coins, make change, "Show me 47¢ with fewest coins"
- Difficulty tiers:
  - **Emergent:** Time to hour/half-hour, count pennies + nickels + dimes
  - **Proficient:** Time to 5 min, all coins, simple totals
  - **Advanced:** Time word problems with AM/PM, money word problems with dollars

### Play Mode
- Speed reading clocks, coin counting races
- Streak scoring

---

## App 11: Line Plots & Graphs
**File:** `tools/2/line-plots.html`
**Standards:** 2.MD.D.9 (generate measurement data, show on line plot), 2.MD.D.10 (bar/picture graphs, solve problems)
**MN:** 2.4.1.1 | **TEKS:** 2.10A, 2.10B, 2.10C, 2.10D

### Explore Mode
- **Line Plot tab:** Number line with objects above (measured items). Drag X marks above the number line at each measurement. See data distribution build.
- **Bar Graph tab:** Category selector, click to add data, bars grow with animation. Toggle horizontal/vertical.
- **Picture Graph tab:** Icons stack up per category, key shows "each icon = 1" or "each icon = 2"
- Comparison questions auto-generate as data is entered
- Side panel: vocabulary (data, line plot, bar graph, picture graph, scale, key)

### Practice Mode
- Read line plots: "How many objects measured 6 inches?" "What is the most common length?"
- Read bar/picture graphs: comparison and sum questions
- Build graphs from given data
- Difficulty tiers:
  - **Emergent:** Read simple bar graphs, 2 categories
  - **Proficient:** Line plots, bar and picture graphs, 3+ categories
  - **Advanced:** Solve two-step problems from graphs, build from word descriptions

### Play Mode
- Graph reading quiz, timed
- Data interpretation speed rounds

---

## App 12: Shape Identifier
**File:** `tools/2/shape-identifier.html`
**Standards:** 2.G.A.1 (recognize/draw shapes with specified attributes; triangles, quadrilaterals, pentagons, hexagons, cubes, faces, angles)
**MN:** 2.3.1.1 | **TEKS:** 2.8A, 2.8B, 2.8C

### Explore Mode
- Shape gallery: triangles, quadrilaterals (square, rectangle, rhombus, trapezoid), pentagons, hexagons, cubes
- Each shape shows: colored sides, numbered corners (like K Shape Sorter), PLUS angle indicators (right angle square symbol)
- "Faces" view for cubes: unfold the cube net, show 6 faces, refold with animation
- Attribute panel: sides count, angles count, right angles highlighted, parallel sides marked
- Compare two shapes side by side

### Practice Mode
- "Draw the shape" — given attributes ("4 sides, 4 right angles"), student picks or assembles
- "Name the attributes" — given a shape, list its properties from options
- "How many faces?" — 3D shape questions
- Difficulty tiers:
  - **Emergent:** Identify shapes by name, count sides
  - **Proficient:** Identify by attributes, angles, faces
  - **Advanced:** Compare shapes, "which has more right angles?", cube faces

### Play Mode
- Shape identification speed rounds
- Attribute matching quiz

---

## App 13: Partition & Fractions
**File:** `tools/2/partition-fractions.html`
**Standards:** 2.G.A.2 (partition rectangle into rows/columns of same-size squares), 2.G.A.3 (partition circles/rectangles into halves, thirds, fourths; describe as fractions)
**MN:** 2.3.1.2 | **TEKS:** 2.8D, 2.8E

### Explore Mode
- Shape selector: circle or rectangle
- Partition controls: halves, thirds, fourths — animated cutting lines
- Tap to shade pieces — fraction notation updates: "2 out of 3 thirds = 2/3"
- Rectangle grid mode: set rows and columns, see same-size squares appear
- Key insight animations:
  - "The whole = all the parts" (shade all pieces → "3/3 = 1 whole")
  - "Equal parts must be the same size" (show equal vs unequal partitions)
  - "2/4 = 1/2" overlay comparison
- Side panel: vocabulary (half, third, fourth/quarter, equal parts, whole, fraction)

### Practice Mode
- "How many equal parts?" — count the partitions
- "Shade the fraction" — shade 1/3, 2/4, etc.
- "Name the fraction" — see shaded shape, pick the fraction
- "Equal or not?" — identify if partition is equal
- Difficulty tiers:
  - **Emergent:** Halves only, circles, shade and identify
  - **Proficient:** Halves, thirds, fourths; circles and rectangles
  - **Advanced:** Fraction comparisons, equivalences, rectangle grid partitioning

### Play Mode
- Fraction identification speed rounds
- Partition matching quiz
- Streak scoring

---

## Build Priority Order

### Grade 1 (10 apps to build):
1. Fact Family Houses (1.OA.B.3-4) — foundational relationship understanding
2. Equation Balance (1.OA.D.7-8) — equals sign understanding
3. Add/Sub Fluency (1.OA.C.5-6) — strategy development
4. Counting to 120 (1.NBT.A.1) — number sense foundation
5. Two-Digit Operations (1.NBT.C.4-6) — computation
6. Clock Reader (1.MD.B.3) — daily life skill
7. Length Comparisons (1.MD.A.1-2) — measurement foundation
8. Data & Graphs (1.MD.C.4) — data literacy
9. Shape Attributes (1.G.A.1) — extends K geometry
10. Fraction Shapes (1.G.A.3) — early fraction concepts

### Grade 2 (12 apps to build):
1. Fluency to 20 (2.OA.B.2) — extends G1 fluency
2. Odd & Even Explorer (2.OA.C.3) — number properties
3. Array Builder (2.OA.C.4) — multiplication foundation
4. Word Problem Workshop (2.OA.A.1) — comprehension
5. Two-Digit Fluency (2.NBT.B.5-6) — computation mastery
6. Three-Digit Operations (2.NBT.B.7-9) — extends place value
7. Time & Money (2.MD.C.7-8) — life skills
8. Measurement Lab (2.MD.A.1-4) — hands-on measuring
9. Number Line Operations (2.MD.B.5-6) — mental model
10. Line Plots & Graphs (2.MD.D.9-10) — data extension
11. Shape Identifier (2.G.A.1) — geometry extension
12. Partition & Fractions (2.G.A.2-3) — fraction deepening
