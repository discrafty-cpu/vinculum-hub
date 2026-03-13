# VINCULUM Math Solutions — Grade 3 & Grade 4 App Plan

## Architecture Pattern (Applied to All VINCULUM Apps)

Every tool is a single self-contained HTML file with:
- **VINCULUM dark theme** (dark background, light text, accent colors for modes and tiers)
- **Three modes**: Explore (interactive teaching manipulative), Practice (scaffolded problem sets), Play (gamified experience)
- **Three difficulty tiers**: Emergent (foundational understanding), Proficient (grade-level mastery), Advanced (extension/complexity)
- **UI Design**: Pill-style mode tabs at top, main content area, right-side contextual help panel
- **Accessibility**: High contrast, keyboard navigation, semantic HTML
- **Responsive**: Optimized for tablet and desktop (primary use case)

---

# GRADE 3 COMPREHENSIVE APP PLAN

## Grade 3 Standards Coverage Map

| Domain | Standards | App Name | File Path |
|--------|-----------|----------|-----------|
| 3.OA | 3.OA.A.1-4 | Multiplication Concepts | tools/3/multiplication-concepts.html |
| 3.OA | 3.OA.A.1-4 | Division Concepts | tools/3/division-concepts.html |
| 3.OA | 3.OA.B.5-6 | Multiplication Properties | tools/3/multiplication-properties.html |
| 3.OA | 3.OA.C.7 | Times Table Fluency | tools/3/times-table-fluency.html |
| 3.OA | 3.OA.D.8-9 | Two-Step Word Problems | tools/3/two-step-word-problems.html |
| 3.NBT | 3.NBT.A.1 | Rounding & Estimation | tools/3/rounding-estimation.html |
| 3.NBT | 3.NBT.A.2 | Add/Subtract Within 1000 | tools/3/add-subtract-1000.html |
| 3.NF | 3.NF.A.1-3 | Fraction Explorer | tools/3/fraction-explorer.html |
| 3.MD | 3.MD.A.1 | Time & Elapsed Time | tools/3/time-elapsed-time.html |
| 3.MD | 3.MD.C.5-7, D.8 | Area & Perimeter | tools/3/area-perimeter.html |
| 3.MD | 3.MD.B.3-4 | Data & Line Plots | tools/3/data-line-plots.html |
| 3.G | 3.G.A.1-2 | Shape Categories & Partitioning | tools/3/shape-categories.html |

---

## GRADE 3 APP SPECIFICATIONS

### 1. Multiplication Concepts
**File Path:** `tools/3/multiplication-concepts.html`

**Standards:**
- **CCSS 3.OA.A.1**: Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each
- **CCSS 3.OA.A.2**: Interpret whole-number quotients of whole numbers, e.g., interpret 56 ÷ 8 as the number of objects in each share when 56 objects are partitioned equally into 8 shares
- **CCSS 3.OA.A.3**: Use multiplication and division within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities
- **CCSS 3.OA.A.4**: Determine the unknown in multiplication and division equations relating three whole numbers

**Minnesota Crosswalk:** 3.1.1.1 (Represent multiplication as equal groups and arrays); 3.1.1.2 (Recognize and represent multiplication)

**TEKS Crosswalk:** 3.4.A (Represent one-step multiplication and division problems within 100 using concrete objects); 3.4.B (Solve one-step multiplication and division problems within 100)

**Explore Mode:**
Interactive manipulative featuring:
- **Equal Groups Builder**: Drag tiles to create groups (e.g., 3 groups of 4). Visual count updates dynamically. Students move from concrete (discrete objects) to pictorial representations.
- **Array Constructor**: Drag to create rectangular arrays on a grid. Shows both dimensions and total product. Can flip between row-major and column-major counting.
- **Area Model Introduction**: Show multiplication as rectangular area. Visually demonstrates how 4 × 5 = 20 square units.
- **Comparison Tool**: Side-by-side view of same product shown three ways (groups, array, area model). Reinforces that all three represent the same multiplication fact.
- **Interactive Labeling**: Students label factors (multiplicand/multiplier) and product. Vocabulary reinforcement with clear definitions.

**Practice Mode:**
- **Emergent Tier**: Given visual (groups/array/area model), students identify the multiplication sentence. Multiple choice with 3 options. Focus on counting and recognition (5-8 items per group).
- **Proficient Tier**: Given a word problem with equal groups, students write the multiplication sentence and solve. Includes simple context (toys, cookies, plants). Difficulty range: products within 50. Scaffolding: visual hint available showing grouped representation.
- **Advanced Tier**: Multi-representation challenges—given one representation, identify equivalent representations. Word problems with larger numbers (products within 100) and more complex contexts. Requires writing multiplication sentence and explaining strategy.

Questions include:
- "There are 5 bags with 6 apples in each. How many apples in total? Write a multiplication sentence."
- "Draw an array for 3 × 7. Label the factors and product."
- "Which representation shows the same multiplication as 4 × 8?" (given three visual options)

**Play Mode:**
**"Multiply & Match"** game mechanic:
- 90 seconds per round. Word problem displays (with visual support in Emergent tier).
- Student clicks the correct array/equal groups visual representation (from 3 choices).
- Correct answer = +10 points + brief feedback showing product.
- Incorrect answer = no points, visual correct answer displays momentarily, problem repeats.
- Scoring multiplier: consecutive correct answers (up to 3x at 5+ streak).
- Leaderboard with personal bests by tier (name optional).
- Emergent: problems within 36; Proficient: products within 80; Advanced: products within 100.

**Side Panel Content:**
- **Vocabulary**: Factor, Multiplicand, Multiplier, Product, Array, Equal Groups, Rows, Columns
- **Key Concepts**: "Multiplication means 'groups of.' 3 × 4 means 3 groups of 4."
- **Visual Tip**: "Arrays help us see multiplication. The rows and columns show the factors."
- **Mistake Alert**: "Don't confuse 3 × 4 with 4 × 3—they equal the same product but may represent different situations."
- **Parent/Teacher Tip**: "Model with real objects first (beans, counters) before moving to arrays."

---

### 2. Division Concepts
**File Path:** `tools/3/division-concepts.html`

**Standards:**
- **CCSS 3.OA.A.2**: Interpret whole-number quotients (sharing equally, grouping/measurement division)
- **CCSS 3.OA.A.3**: Use division within 100 to solve word problems
- **CCSS 3.OA.A.4**: Determine the unknown in division equations

**Minnesota Crosswalk:** 3.1.1.3 (Represent division as sharing equally and grouping)

**TEKS Crosswalk:** 3.4.C (Describe a fraction in terms of unit fractions); 3.4.D (Compose and decompose fractions)

**Explore Mode:**
Interactive manipulative featuring:
- **Sharing Division**: "Fair Share" simulator—students place 12 counters into 3 equal piles. Drag-and-drop distribution. Counter shows remainder separately. Introduces the concept "How many in each group?"
- **Grouping Division**: "Make Groups" simulator—students partition 20 objects into groups of 4. Count complete groups, identify remainder. Introduces "How many groups can we make?"
- **Relationship Visualization**: Show same division problem in both sharing and grouping contexts. Visual proof that 12 ÷ 3 = 4 means both interpretations work.
- **Connection to Multiplication**: "Fact Family" display—shows 3 × 4 = 12, 4 × 3 = 12, 12 ÷ 3 = 4, 12 ÷ 4 = 3. Interactive highlighting to show inverse relationship.
- **Remainder Handling**: Clear visual separation of remainder. For example, 14 ÷ 3 shows "4 in each group, 2 left over" with distinct visual styling.

**Practice Mode:**
- **Emergent Tier**: Given visual representation (objects in groups), identify division sentence. Multiple choice with 3 options. Problems within 30, with no remainder.
- **Proficient Tier**: Word problem with equal sharing scenario. Students write division sentence and solve. Includes context (sharing cookies, distributing supplies). Problems within 50, minimal remainders. Scaffolding: visual hint shows objects arranged.
- **Advanced Tier**: Both sharing and grouping word problems. Some include remainders. Students explain whether remainder should be interpreted as a fractional part, discarded, or rounded up (contextual). Problems within 100.

Questions include:
- "There are 20 cookies to share equally among 4 friends. How many does each friend get? Write a division sentence."
- "If we make groups of 6 from 24 counters, how many complete groups? Write a division sentence."
- "15 pencils divided among 4 students. How many each? How many left over?"

**Play Mode:**
**"Divide & Conquer"** game mechanic:
- 60 seconds per round. Division word problem displays.
- Student selects correct quotient from 4 multiple-choice options.
- Correct answer = +15 points + celebration animation.
- Incorrect answer = no points, correct answer displays, problem repeats.
- Bonus multiplier: 3+ consecutive correct = 1.5x point bonus.
- Emergent: problems within 36, no remainder focus; Proficient: within 60, with remainders; Advanced: within 100, contextual remainder interpretation.
- Leaderboard by tier.

**Side Panel Content:**
- **Vocabulary**: Quotient, Divisor, Dividend, Remainder, Sharing, Grouping, Fair Share, Partition
- **Key Concepts**: "Division means splitting into equal groups. 12 ÷ 3 asks 'How many groups of 3 in 12?'"
- **Visual Tip**: "Draw circles to make groups. Count how many in each or how many groups you make."
- **Mistake Alert**: "12 ÷ 3 and 3 ÷ 12 are different! Order matters in division."
- **Connection Tip**: "Multiplication and division are opposites. If 3 × 4 = 12, then 12 ÷ 3 = 4."

---

### 3. Multiplication Properties
**File Path:** `tools/3/multiplication-properties.html`

**Standards:**
- **CCSS 3.OA.B.5**: Apply properties of operations as strategies to multiply and divide
- **CCSS 3.OA.B.6**: Understand division as an unknown-factor problem

**Minnesota Crosswalk:** 3.1.2.1 (Apply commutative and associative properties)

**TEKS Crosswalk:** 3.4.A (Represent and solve one-step and multi-step multiplication and division problems)

**Explore Mode:**
Interactive manipulative featuring:
- **Commutative Property Explorer**: Side-by-side arrays. Rotate first array 90° to show 3 × 4 becomes 4 × 3. Visual proof with counting confirmation. "The factors switch, but the product stays the same!"
- **Associative Property Builder**: Three factors (e.g., 2 × 3 × 4). Highlight different groupings: (2 × 3) × 4 vs. 2 × (3 × 4). Show equal results. Use color coding to show which multiplication happens first.
- **Distributive Property Visualizer**: Rectangle split into parts. Show 3 × 5 as 3 × (2 + 3) = (3 × 2) + (3 × 3). Drag vertical line to "break apart" the larger array. Dynamic calculation.
- **Identity & Zero Properties**: Multiply by 1 (array shows unchanged), multiply by 0 (array disappears/shows emptiness). Brief callouts explaining these special cases.
- **Strategy Comparison**: Given a target product, show multiple property-based paths to solve. Highlight which is most efficient.

**Practice Mode:**
- **Emergent Tier**: Identify which property is shown in a given example (multiple choice: Commutative, Associative, Distributive, Identity, Zero). 8-10 straightforward examples.
- **Proficient Tier**: Given a multiplication problem, apply a specified property to rewrite/simplify. For example, "Use the distributive property: 4 × 8 = 4 × (5 + 3) = ___". Fill-in with visual support available.
- **Advanced Tier**: Multiple steps using properties. Apply properties strategically to make mental math easier. For example, "Which property helps? 6 × 5 × 2 = ?" Student identifies associative property as most efficient path: (6 × 5) × 2 vs. 6 × (5 × 2).

Questions include:
- "3 × 7 = __ × 3. Fill in the blank. Which property?"
- "Use the distributive property: 6 × 7 = 6 × (4 + 3) = (6 × 4) + (6 × 3) = __ + __ = __"
- "Find the most efficient way: 25 × 4 × 3. Use properties to reorganize."

**Play Mode:**
**"Property Master"** game mechanic:
- 90 seconds. Property-based multiplication challenges.
- Problem displays: "Use property to solve: 3 × (2 × 5) = ?"
- Student selects correct answer OR selects which property to apply (Proficient/Advanced).
- Correct answer = +12 points + property label highlights.
- Incorrect = no points, hint shows path using the property, problem repeats.
- Streak bonus: 4+ consecutive correct = 2x multiplier.
- Difficulty tiers adjust property complexity.

**Side Panel Content:**
- **Vocabulary**: Commutative, Associative, Distributive, Identity, Zero Property, Factor
- **Key Concepts**: "Commutative: changing order doesn't change product. 3 × 4 = 4 × 3."
- **Visual Tip**: "Draw arrays and rotate them to see commutative property."
- **Strategy Tip**: "Use distributive property to break hard facts into easier ones: 8 × 6 = 8 × (5 + 1) = 40 + 8 = 48."
- **Why It Matters**: "Properties help us solve problems faster and understand relationships."

---

### 4. Times Table Fluency
**File Path:** `tools/3/times-table-fluency.html`

**Standards:**
- **CCSS 3.OA.C.7**: Fluently multiply and divide within 100, using strategies (properties, fact families, etc.)

**Minnesota Crosswalk:** 3.1.3.1 (Use efficient mental math strategies to multiply and divide)

**TEKS Crosswalk:** 3.4.B (Solve one-step and multi-step multiplication and division problems)

**Explore Mode:**
Interactive manipulative featuring:
- **Strategy Library**: Organized by strategy—"Skip Counting," "Arrays," "Properties," "Related Facts," "Doubling/Halving." Each strategy has 2-3 interactive examples with step-by-step guidance.
- **Skip Counting Tool**: Number line with jumps. Input multiplier and count to see multiples. For 3 × 7, visualize 7 jumps of 3. Interactive highlighting.
- **Anchor Facts Highlight**: Facts students typically master first (5s, 10s, 2s) are emphasized. Color-coded. Interactive exploration of why these are easiest.
- **Pattern Finder**: Multiplication table with interactive highlighting. Students discover patterns: all 5s end in 5 or 0, 9s digits sum to 9, etc. Color patterns visible.
- **Strategy Selector**: Given a specific multiplication fact, app suggests optimal strategy based on the numbers involved.

**Practice Mode:**
- **Emergent Tier**: 30-second rounds. 5 × 6, 2 × 7, 10 × 4 (facts within times tables of 2, 5, 10). Visual strategy support (arrays, skip counting lines). Answer via number input or selection from 4 choices.
- **Proficient Tier**: 60-second rounds. Extended times tables (2 through 9, products within 100). Strategy hints available but not shown by default. Feedback shows which strategy would be efficient.
- **Advanced Tier**: 90-second rounds. Mixed fluency—all tables within 100 in rapid succession. No visual hints. Focus on automaticity. Difficulty increases mid-round if student reaches high accuracy.

Questions include:
- "7 × 8 = ?" (input answer, 3-second timer)
- "Mental math: What's 6 × 9? Use a strategy." (multiple choice with strategy explanations shown after)
- "Rapid-fire: Answer as many as you can in 60 seconds" (sequence of 6-15 problems depending on accuracy)

**Play Mode:**
**"Fluency Race"** game mechanic:
- Race-track themed. 10 multiplication facts presented in sequence.
- Each correct answer advances player one step on track.
- Correct answer within 3 seconds = +1 step, no bonus.
- Correct answer within 1.5 seconds = +2 steps (speed bonus).
- Incorrect or timeout = -1 step, correct answer displays, continue.
- First to reach 20 steps wins round.
- Three rounds per session. Personal best track by tier.
- Emergent: facts within 2, 5, 10s; Proficient: tables 2-9; Advanced: mixed 1-9 rapid fire.
- Optional multiplayer (local): two players race simultaneously.

**Side Panel Content:**
- **Vocabulary**: Fluency, Automaticity, Multiplicand, Multiplier, Product, Times Table, Strategy
- **Key Concepts**: "Fluency means answering in 2-3 seconds without counting. Strategies help you get there!"
- **Strategy Tips**: "Start with 2s, 5s, 10s—they're easiest. Then 3s and 4s. Use skip counting or arrays."
- **Doubling Strategy**: "8 × 6 is hard? Think 4 × 6 = 24, so double it: 8 × 6 = 48."
- **Related Facts**: "Know 3 × 4 = 12? Then 4 × 3 = 12 (commutative) and 12 ÷ 3 = 4 (fact family)."

---

### 5. Two-Step Word Problems
**File Path:** `tools/3/two-step-word-problems.html`

**Standards:**
- **CCSS 3.OA.D.8**: Solve two-step word problems using addition, subtraction, multiplication, and division
- **CCSS 3.OA.D.9**: Identify arithmetic patterns (both additive and multiplicative) and explain them using properties

**Minnesota Crosswalk:** 3.1.1.4 (Represent and solve two-step word problems)

**TEKS Crosswalk:** 3.4.E (Represent division using arrays and area models); 3.5.D (Determine the total number of objects when equally-sized groups of objects are combined)

**Explore Mode:**
Interactive manipulative featuring:
- **Problem Decomposer**: Multi-step problem displays with clickable phrases. Highlight the first operation, then the second. Visual breakdown of information given vs. unknown. Color-code first step and second step.
- **Visualization Builder**: Given a word problem, students arrange visual representations (arrays, groups, number lines) to show each step. Manipulative drawing area.
- **Number Sentence Constructor**: Drag-and-drop number sentence builder for two-step problems. Build: "First: 5 × 3 = 15. Then: 15 + 4 = 19."
- **Unknown Identifier**: Highlight what we know, circle what we're trying to find. Interactive "What do I need to find first?" prompts.
- **Real-World Context Explorer**: Same mathematical structure, different contexts (school, home, sports). Shows versatility of two-step thinking.

**Practice Mode:**
- **Emergent Tier**: Simple two-step problems with clear context. First step is multiplication or division; second is addition or subtraction with small numbers. Scaffolding: problem broken into visual parts, guided questions ("What do we do first? What do we do next?"). 4-6 questions per session.
- **Proficient Tier**: Grade-level two-step problems. Mix of operation orders. Include some multi-operation contexts. Requires students to identify which operation to do first. Minimal scaffolding; optional visual support. 6-8 questions per session.
- **Advanced Tier**: Complex two-step and pattern problems. Multiplicative comparison ("times as many"), perimeter/area combinations, or additive patterns. Requires explanation of strategy. 5-7 questions per session.

Question examples include:
- "Maya buys 3 packs of markers with 8 markers each. She already had 5 markers. How many markers does she have now?"
- "There are 24 students divided into 4 equal teams. Each team gets 2 soccer balls. How many soccer balls are needed?"
- "Pattern: 2, 4, 6, 8, __. What's the pattern rule? If the pattern continues, what's the 10th number?"

**Play Mode:**
**"Story Quest"** game mechanic:
- Adventure narrative. Each correct answer unlocks next part of story.
- Three "chapters," each with 4-6 word problems of increasing complexity.
- Problem displays with optional visual diagram (Emergent) or text only (Advanced).
- Student enters final answer in text input.
- Correct answer = narrative progresses + 20 points + unlocks next challenge.
- Incorrect = student sees hint (identify first operation, then second) and retries same problem.
- Completion of all three chapters = final summary with efficiency rating (time per problem).
- Emergent: simple contexts, small numbers; Proficient: varied operations; Advanced: patterns and complex contexts.

**Side Panel Content:**
- **Vocabulary**: Two-Step, Operation, Unknown, Sequence, Pattern Rule, First Step, Second Step, Algorithm
- **Key Concepts**: "Two-step problems need two operations. Always identify what you find first, then what you find next."
- **Visual Tip**: "Break problems into parts. Draw or act out the first step, then the second step."
- **Strategy Tip**: "Underline the question. Circle the numbers you know. Highlight the operation words (times, shared, altogether)."
- **Check Your Work**: "Reread the problem. Does your answer make sense? Is it reasonable?"

---

### 6. Rounding & Estimation
**File Path:** `tools/3/rounding-estimation.html`

**Standards:**
- **CCSS 3.NBT.A.1**: Use place value understanding to round whole numbers to nearest 10 or 100

**Minnesota Crosswalk:** 3.2.1.1 (Understand place value and rounding); 3.2.1.2 (Use rounding for estimation)

**TEKS Crosswalk:** 3.2.A (Compose and decompose numbers up to 100,000 as a sum of so many ten thousands, thousands, hundreds, tens, and ones)

**Explore Mode:**
Interactive manipulative featuring:
- **Number Line Rounder**: Number line with number positioned. Slider shows midpoint. Drag number toward nearest 10 (or 100 depending on tier). Visual feedback: "Closer to 40 than 50, so round to 40."
- **Place Value Highlighter**: Three-digit number displayed with place values colored. Show tens and ones place separately. Highlight digit in rounding place, then decide based on next digit.
- **Rounding Rule Visual**: "Look at the digit to the right. If 5 or more, round up. If 4 or less, round down." Interactive examples where students apply rule.
- **Open/Closed Number Line**: Display unmarked number line with endpoints. Ask students where a number falls and which endpoint is nearest. Reinforces relative distance concept.
- **Estimation Context**: Show items (apples in baskets, students in groups) and ask "About how many?" Rounding emerges naturally for practical contexts.

**Practice Mode:**
- **Emergent Tier**: Round two-digit numbers to nearest 10. Visual number line provided. 8-10 problems. Multiple choice (two options near rounding place).
- **Proficient Tier**: Round two and three-digit numbers to nearest 10 and nearest 100. Number line available as reference. Scaffolding: rounding rule displayed. 10-12 problems with fill-in or multiple choice.
- **Advanced Tier**: Three and four-digit numbers, rounding to 10, 100, or 1000. Estimation word problems ("About how many chairs needed?"). Requires written explanation of rounding choice. 8-10 problems.

Question examples include:
- "Round 34 to the nearest 10. Use the number line."
- "Round 267 to the nearest 100. Is it closer to 200 or 300?"
- "There are 48 cookies. About how many packs of 10 can you make?"

**Play Mode:**
**"Rounding Rally"** game mechanic:
- 60-second countdown. Rounding problems presented rapid-fire.
- Problem: "Round 47 to nearest 10" with 4 multiple-choice options.
- Correct = +8 points + brief celebrate animation.
- Incorrect = no points, correct answer highlighted, next problem appears.
- Bonus: answer within 2 seconds = +12 points instead.
- Streak multiplier: 5+ correct = 1.5x point boost.
- Leaderboard with time-to-answer metric.
- Emergent: nearest 10 only, two-digit numbers; Proficient: nearest 10 and 100, up to 3-digit; Advanced: nearest 10/100/1000, 4-digit numbers.

**Side Panel Content:**
- **Vocabulary**: Rounding, Nearest, Place Value, Digit, Estimate, Approximate, Midpoint
- **Key Concepts**: "Rounding means finding the nearest 10 (or 100). Use the midpoint to decide."
- **Rounding Rule**: "Look at the digit to the RIGHT of the place you're rounding. 5 or more = round up. 4 or less = stay the same."
- **Visual Tip**: "Number lines help! See which 10 (or 100) your number is closest to."
- **Real-World Use**: "Use rounding to estimate costs, measure quantities, or make quick mental math easier."

---

### 7. Add/Subtract Within 1000
**File Path:** `tools/3/add-subtract-1000.html`

**Standards:**
- **CCSS 3.NBT.A.2**: Fluently add and subtract within 1000 using strategies and algorithms based on place value, properties, and the relationship between addition and subtraction

**Minnesota Crosswalk:** 3.2.2.1 (Apply place value to solve addition and subtraction problems within 1000)

**TEKS Crosswalk:** 3.2.B (Describe the value of the digit in numbers up to 100,000 and read, write, and compare whole numbers); 3.3.A (Represent addition and subtraction of numbers up to 1000 with objects, pictures, words, and numbers)

**Explore Mode:**
Interactive manipulative featuring:
- **Base-10 Block Tool**: Drag-and-drop base-10 blocks (units, rods, flats) to model addition/subtraction problems. For 234 + 156, show 2 flats + 3 rods + 4 units, then add 1 flat + 5 rods + 6 units. Visual regrouping.
- **Regrouping Visualizer**: When adding 237 + 145, show 12 units regrouping into 1 rod + 2 units. Color-code regrouping activity. Step-by-step breakdown.
- **Decomposition Strategy Tool**: Show alternative methods: "237 + 145 = 237 + 100 + 45 = 337 + 45 = 382" (jump method on number line). Or "237 + 145 = (200 + 100) + (30 + 40) + (7 + 5) = 300 + 70 + 12 = 382" (place-value strategy).
- **Subtraction Strategies**: Show standard algorithm alongside "counting up" (e.g., 350 - 167: start at 167, count up to 350). Visual comparison of methods.
- **Verification Tool**: After computing, show reverse operation (addition → subtraction, subtraction → addition) to check correctness.

**Practice Mode:**
- **Emergent Tier**: Addition and subtraction within 500. Numbers chosen to minimize regrouping initially. Visual base-10 blocks provided as scaffold. 6-8 problems. Supports both traditional algorithm and strategy-based approaches.
- **Proficient Tier**: All operations within 1000. Mix of regrouping and non-regrouping scenarios. Visual support available but not shown by default. Choice of algorithm or strategy. 8-10 problems per session.
- **Advanced Tier**: Within 1000 with emphasis on efficiency. Mixed operations in sequence (e.g., 345 + 127 - 98). Requires solving and explaining chosen strategy. 6-8 problems.

Question examples include:
- "234 + 156 = ___" (with base-10 blocks visible, Emergent)
- "450 - 278 = ___" (choose algorithm or strategy; show work, Proficient)
- "567 + 234 - 189 = ___" (solve and explain efficiency, Advanced)

**Play Mode:**
**"Addition & Subtraction Sprint"** game mechanic:
- 90-second round. Problems presented in sequence.
- Problem with four multiple-choice answers.
- Correct answer = +10 points + progress bar advancement.
- Incorrect = no points, correct answer highlights, continue.
- Speed bonus: correct within 3 seconds = +5 bonus points.
- Lives system: 3 wrong answers = game over (Emergent only; Advanced has time-based scoring instead).
- Leaderboard by tier showing fastest solve times.
- Emergent: within 500, mostly no regrouping; Proficient: within 1000, varied regrouping; Advanced: mixed operations, largest numbers.

**Side Panel Content:**
- **Vocabulary**: Regroup, Regrouping, Algorithm, Place Value, Ones, Tens, Hundreds, Decompose, Strategy
- **Key Concepts**: "Add and subtract by place value. Work from right to left (ones, tens, hundreds)."
- **Standard Algorithm**: "Line up place values. Add (or subtract) ones, then tens, then hundreds. Regroup if needed."
- **Strategy Tip**: "Not everyone uses the standard algorithm. Try jumping by tens and ones, or decomposing into parts."
- **Check Your Work**: "Use the reverse operation. If 234 + 156 = 390, then 390 - 156 should equal 234."

---

### 8. Fraction Explorer
**File Path:** `tools/3/fraction-explorer.html`

**Standards:**
- **CCSS 3.NF.A.1**: Understand a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts
- **CCSS 3.NF.A.2**: Understand a fraction as a number on the number line; represent fractions on a number line diagram
- **CCSS 3.NF.A.3**: Explain equivalence of fractions (e.g., 1/2 = 2/4); compare fractions with same numerator or denominator

**Minnesota Crosswalk:** 3.3.1.1 (Understand fractions as equal parts); 3.3.1.2 (Recognize and represent fractions)

**TEKS Crosswalk:** 3.3.A (Represent fractions as parts of a whole and parts of a set); 3.3.B (Identify unit fractions); 3.3.C (Compare fractions)

**Explore Mode:**
Interactive manipulative featuring:
- **Fraction Partitioner**: Drag slider to partition a rectangle/circle into equal parts (halves through eighths). Interactive labeling: 1 part out of 4 = 1/4 = unit fraction. Shade regions to visualize non-unit fractions.
- **Equivalent Fraction Visualizer**: Two side-by-side shapes showing 1/2 and 2/4. Overlay shows visual equivalence. Adjust denominators to explore equivalence (1/2 = 2/4 = 3/6 = 4/8).
- **Fraction Number Line**: Interactive number line 0 to 1 with tick marks. Mark unit fractions (halves, thirds, fourths, fifths, sixths, eighths). Drag fractions to proper positions. Show that fractions are points on a line, not just parts of shapes.
- **Comparison Tool**: Two fractions side-by-side with visual representations. Use shape area or number line to compare. "3/4 is larger than 2/4 because it covers more area."
- **Mixed Parts Visualizer**: Introduce wholes and parts. Two whole shapes plus a half = 2.5 (bridge to mixed numbers).

**Practice Mode:**
- **Emergent Tier**: Identify unit fractions from visual representations. Partition shapes correctly. Identify if two shapes show equivalent fractions (yes/no). 6-8 problems with multiple-choice.
- **Proficient Tier**: Name fractions from shapes and number lines. Identify equivalent fractions from visual models. Compare fractions with same denominator or same numerator. Drag-and-drop or multiple choice. 8-10 problems.
- **Advanced Tier**: Explain equivalence using area models. Compare fractions with different denominators using visual reasoning. Order three fractions. Write missing numerator or denominator in equivalent pair. 7-9 problems.

Question examples include:
- "What fraction is shaded?" (shape provided, identify numerator/denominator, Emergent)
- "Which fraction is equivalent to 1/2?" (three visual options: 2/4, 1/3, 2/6, Proficient)
- "Compare: 2/3 ___ 3/4. Explain using a visual model." (Advanced)

**Play Mode:**
**"Fraction Match"** game mechanic:
- 70-second round. Matching game with fraction pairs.
- Six cards face-down showing either visual representations or fraction notation.
- Flip two cards; if they represent the same fraction (e.g., 2/4 and visual of half shaded), match!
- Matched pair = +15 points + cards stay flipped.
- Incorrect match = cards flip back, lose 5 seconds from timer.
- Optional: identify comparison instead ("Which is larger?" for harder tiers).
- Emergent: unit fractions and simple equivalents; Proficient: mixed unit/non-unit and equivalents; Advanced: includes comparison challenges.
- Speed multiplier: complete under 40 seconds = 1.5x point bonus.

**Side Panel Content:**
- **Vocabulary**: Fraction, Numerator, Denominator, Unit Fraction, Equivalent, Whole, Equal Parts, Partition, Compare
- **Key Concepts**: "A fraction shows a part of a whole. 1/4 means 1 part out of 4 equal parts."
- **Equivalence**: "Different fractions can represent the same amount. 1/2, 2/4, and 4/8 all show the same part of a whole."
- **Number Line Tip**: "Fractions are numbers! 1/2 is a point between 0 and 1 on the number line."
- **Comparison Tip**: "To compare 2/3 and 3/4, use visual models or find a common denominator."

---

### 9. Time & Elapsed Time
**File Path:** `tools/3/time-elapsed-time.html`

**Standards:**
- **CCSS 3.MD.A.1**: Tell and write time to the nearest minute and measure time intervals in minutes; solve word problems involving addition and subtraction of time intervals

**Minnesota Crosswalk:** 3.4.1.1 (Tell and write time); 3.4.1.2 (Solve time-interval word problems)

**TEKS Crosswalk:** 3.7.A (Collect data and organizer into lists, tables, or other representations); 3.7.B (Use data to solve one- and two-step problems)

**Explore Mode:**
Interactive manipulative featuring:
- **Analog Clock Constructor**: Large interactive clock face. Drag hour and minute hands to set specific times. Input time in digital format; hands move to match. Color-code hour hand (shorter) and minute hand (longer).
- **Digital-Analog Bridge**: Side-by-side analog clock and digital time display. Change one, the other updates. Practice reading both formats simultaneously.
- **Minute Counting Tool**: Clock face with minute intervals highlighted. Animated counting around face (by 1s, 5s, or 15s). Show how minute hand tracks: "Each tick is 1 minute, each number is 5 minutes."
- **Elapsed Time Visualizer**: Two clocks (start and end time). Highlight elapsed time on number line. "From 2:15 to 3:30 is 1 hour and 15 minutes." Interactive incremental counting or jump method.
- **Real-World Scenarios**: Show activities with start/end times (e.g., school day 8:30 AM to 3:00 PM). Compute elapsed time in context.

**Practice Mode:**
- **Emergent Tier**: Tell time to the hour and half-hour from analog clocks. Match analog time to digital format. 6-8 problems with multiple choice or text input.
- **Proficient Tier**: Tell time to nearest minute. Identify elapsed time (start and end time given; compute difference). One-step word problems about time. 8-10 problems. Scaffolding: clock image provided.
- **Advanced Tier**: Elapsed time with various time formats (AM/PM). Two-step word problems (e.g., "School ends at 3:15. After-school lasts 45 minutes. When does it end?"). 7-9 problems.

Question examples include:
- "What time does the clock show?" (analog clock displayed, Emergent)
- "Start time: 10:30. End time: 11:45. How much time elapsed?" (Proficient)
- "Movie starts at 2:20 PM and runs for 95 minutes. What time does it end?" (Advanced)

**Play Mode:**
**"Time Master"** game mechanic:
- Three rounds of increasing difficulty. Each round: 60 seconds.
- Round 1 (Emergent): Show time to the hour/half-hour; identify from four options.
- Round 2 (Proficient): Given start and end times; calculate elapsed time (multiple choice).
- Round 3 (Advanced): Multi-step time word problem; solve and enter answer.
- Correct answer = +12 points.
- Incorrect = no points, hint shows on second try, move on.
- Bonus: complete round with 100% accuracy in under 40 seconds = 1.5x multiplier on round.
- Final score = sum of all rounds.

**Side Panel Content:**
- **Vocabulary**: Hour, Minute, Elapsed Time, Interval, AM/PM, Half-hour, Quarter-hour, Digital, Analog
- **Key Concepts**: "The hour hand is short; the minute hand is long. Each number on the clock is 5 minutes apart."
- **Minute Counting**: "Count by 5s around the clock: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60."
- **Elapsed Time Strategy**: "Count on from start time to end time. Or use a number line to jump by hours and minutes."
- **Real-World Connection**: "Check clocks in your daily routine. How long is math class? How long until lunch?"

---

### 10. Area & Perimeter
**File Path:** `tools/3/area-perimeter.html`

**Standards:**
- **CCSS 3.MD.C.5**: Recognize area as an attribute of plane figures and understand concepts of area measurement
- **CCSS 3.MD.C.6**: Measure areas by counting unit squares
- **CCSS 3.MD.C.7**: Relate area to multiplication and addition
- **CCSS 3.MD.D.8**: Solve real-world and mathematical problems involving perimeters of polygons

**Minnesota Crosswalk:** 3.4.2.1 (Understand area); 3.4.2.2 (Solve area and perimeter problems)

**TEKS Crosswalk:** 3.6.A (Classify and sort polygons); 3.6.B (Use attributes to identify shapes); 3.6.C (Determine the area of rectangles); 3.6.D (Determine the perimeter)

**Explore Mode:**
Interactive manipulative featuring:
- **Unit Square Tiler**: Drag-and-drop unit squares to cover a rectangle. Count total squares = area. Show how area relates to length × width. Visual grid overlay.
- **Rectangle Dimension Tool**: Adjust width and height sliders. Observe how area changes. Formula shown dynamically: A = l × w. Connect to multiplication.
- **Perimeter Tracer**: Interactive outline tracing of shapes. Count unit lengths along perimeter. Show perimeter as sum of all side lengths. Formula for rectangles: P = 2l + 2w.
- **Composite Shape Decomposer**: L-shaped and T-shaped figures. Divide into rectangles. Compute area of each rectangle, then sum. Visual separation lines guide decomposition.
- **Real-World Contexts**: Floor plans, gardens, picture frames. Compute area for tiling, perimeter for fencing. Interactive scenario setup.

**Practice Mode:**
- **Emergent Tier**: Count unit squares to find area of given rectangles on grid. Count unit lengths to find perimeter. 6-8 problems with visuals.
- **Proficient Tier**: Compute area using length × width. Compute perimeter by adding all sides. One-step word problems. Visual grid provided or optional. 8-10 problems.
- **Advanced Tier**: Composite shape area (decompose into rectangles). Two-step problems (e.g., "Garden is 10 m × 8 m. Fence costs $5 per meter. Total cost?"). Find missing dimension given area or perimeter. 7-9 problems.

Question examples include:
- "Count the unit squares. What is the area?" (grid with shape shown, Emergent)
- "Rectangle is 5 cm long and 3 cm wide. Area = ___. Perimeter = ___." (Proficient)
- "L-shaped garden: 6 m × 4 m with a 2 m × 2 m cutout. Find total area." (Advanced)

**Play Mode:**
**"Shape Architect"** game mechanic:
- Build shapes to match area/perimeter targets.
- Challenge: "Build a rectangle with area 12 square units."
- Player drags width and height sliders to adjust rectangle dimensions.
- Area/perimeter updates live. When target is met, +20 points + celebration.
- Time bonus: reach target within 15 seconds = +10 bonus points.
- Progressive difficulty: 5 challenges per round. Early challenges single condition (area OR perimeter); later challenges dual condition (area AND perimeter).
- Emergent: single-digit targets, simple shapes; Proficient: up to 20 sq. units; Advanced: composite shapes, dual constraints.

**Side Panel Content:**
- **Vocabulary**: Area, Perimeter, Square Unit, Rectangle, Length, Width, Composite, Dimension, Attribute
- **Key Concepts**: "Area is how much space a shape covers (square units). Perimeter is the distance around a shape (linear units)."
- **Area Formula**: "Area of rectangle = length × width. A = l × w."
- **Perimeter Formula**: "Perimeter of rectangle = 2 × length + 2 × width, or add all four sides."
- **Composite Shapes**: "Break complex shapes into rectangles. Find area of each, then add them together."

---

### 11. Data & Line Plots
**File Path:** `tools/3/data-line-plots.html`

**Standards:**
- **CCSS 3.MD.B.3**: Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories
- **CCSS 3.MD.B.4**: Generate measurement data by measuring lengths and heights of objects to the nearest whole unit, and show the data by making a line plot

**Minnesota Crosswalk:** 3.4.3.1 (Collect and represent data); 3.4.3.2 (Interpret data displays)

**TEKS Crosswalk:** 3.8.A (Summarize a data set); 3.8.B (Organize data); 3.8.C (Display data)

**Explore Mode:**
Interactive manipulative featuring:
- **Picture Graph Builder**: Create a picture graph from given data. Drag-and-drop picture symbols. Set scale (e.g., each symbol = 2 items). Title and axis labels.
- **Bar Graph Maker**: Input data values; bars automatically draw. Color code categories. Adjust scale. Show how different scales change visual appearance (same data, different impression).
- **Line Plot Creator**: Mark X's above number line to show measurement data. Each X = one data point. Interactive ruler for measuring objects and recording. Show data range and frequency.
- **Data Interpreter**: Pre-made graphs (picture, bar, line plot). Ask questions: "How many in category A?" "Which has most?" "What's the total?" Interactive highlighting of relevant graph sections.
- **Scaling Exploration**: Same data set displayed with different scales. Discuss how scale affects visual interpretation.

**Practice Mode:**
- **Emergent Tier**: Complete partially-made picture or bar graph. Answer simple questions: "Which has most?" Scaffolding: graph structure provided, only fill in values. 5-7 problems.
- **Proficient Tier**: Given data set, create appropriate graph (choose type: picture or bar). Answer 2-3 questions about the graph. Requires understanding of scale and labels. 6-8 problems.
- **Advanced Tier**: Analyze line plots with fractional measurements. Create line plots from measurement data. Compare multiple data sets. Discuss data distribution and patterns. 5-7 problems.

Question examples include:
- "Complete the bar graph. Then answer: How many students chose cats?" (Emergent)
- "20 students were asked favorite color. 8 blue, 6 red, 4 green, 2 yellow. Make a picture graph with scale 2." (Proficient)
- "Line plot shows pencil lengths in inches: three 5-inch, four 5.5-inch, two 6-inch. What's the most common length?" (Advanced)

**Play Mode:**
**"Data Detective"** game mechanic:
- Multi-round game. Each round presents a mystery scenario (e.g., "Which lunch item is most popular?").
- Data is displayed via graph (picture, bar, or line plot). Three questions must be answered correctly to solve the mystery.
- Questions progress: basic ("Which has most?"), intermediate ("How many more X than Y?"), complex ("What's the total?").
- Correct answer = +10 points + narrative progression.
- Incorrect = hint provided, retry allowed, no point penalty.
- Completion of all mysteries = final "Data Detective" badge.
- Emergent: picture graphs, simple counts; Proficient: bar graphs with larger numbers; Advanced: line plots with fractions.

**Side Panel Content:**
- **Vocabulary**: Data, Graph, Scale, Category, Picture Graph, Bar Graph, Line Plot, Frequency, Range, Measurement
- **Key Concepts**: "Graphs help us show and understand data. Different graphs work for different types of data."
- **Picture Graphs**: "Choose a symbol. Decide the scale (how many each symbol represents). Draw symbols to show data."
- **Bar Graphs**: "Draw bars for each category. Make all bars same width. Label axes and title clearly."
- **Line Plots**: "Use an X above each measurement on a number line. X's show frequency (how many at each value)."

---

### 12. Shape Categories & Partitioning
**File Path:** `tools/3/shape-categories.html`

**Standards:**
- **CCSS 3.G.A.1**: Understand that shapes in different categories may share attributes; understand the relationship between different categories (hierarchies)
- **CCSS 3.G.A.2**: Partition shapes into parts with equal areas; express the area of each part as a unit fraction of the whole

**Minnesota Crosswalk:** 3.5.1.1 (Classify shapes); 3.5.1.2 (Partition and express as fractions)

**TEKS Crosswalk:** 3.6.A (Classify and sort polygons and other two-dimensional figures); 3.6.D (Determine perimeters)

**Explore Mode:**
Interactive manipulative featuring:
- **Shape Classifier**: Library of 2D shapes (rectangles, squares, rhombuses, triangles, trapezoids, etc.). Drag shapes into sorting circles (categories: 4 sides, all sides equal, all right angles, etc.). Discover overlapping attributes (square is a special rectangle).
- **Hierarchy Visualizer**: Diagram showing relationships: "All squares are rectangles, but not all rectangles are squares." Interactive nesting/highlighting.
- **Attribute Filter**: Checkboxes for attributes (equal sides, right angles, parallel sides). Toggle on/off; shapes matching all selected attributes highlight.
- **Partitioning Explorer**: Rectangle/circle divided into equal parts (halves, thirds, fourths, sixths, eighths). Drag dividing lines to create equal areas. Label each part as fraction (1/2, 1/3, etc.). Color-code parts.
- **Shape Property Measurer**: Measure side lengths and angles on interactive shapes. Discover properties (e.g., opposite sides of rectangle are equal).

**Practice Mode:**
- **Emergent Tier**: Identify shapes by name. Sort into basic categories (triangles vs. quadrilaterals). Partition simple shapes into equal parts (halves, fourths) and identify fraction. 6-8 problems with visuals.
- **Proficient Tier**: Classify shapes by multiple attributes (e.g., "quadrilateral AND all sides equal"). Understand hierarchy (squares are special rectangles). Partition shapes and express areas as fractions. 8-10 problems.
- **Advanced Tier**: Explain why shape belongs to certain categories using attribute language. Partition into more parts (fifths, sixths, eighths). Compare fractions of areas from partitioned shapes. 7-9 problems.

Question examples include:
- "Is a square also a rectangle? Why or why not?" (Emergent)
- "Classify these shapes into 'has right angles' and 'all sides equal.' Where does each shape go?" (Proficient)
- "Circle is divided into 6 equal parts. If 2 parts are shaded, what fraction is shaded?" (Advanced)

**Play Mode:**
**"Shape Sort Challenge"** game mechanic:
- Timed game. 60 seconds. Shapes appear one at a time.
- Player must sort shape into correct category (e.g., "All equal sides," "Has right angle," "Quadrilateral").
- Drag shape to correct bin/circle. Multiple correct categories may exist (e.g., square belongs to "all equal sides" AND "has right angles" AND "quadrilateral").
- Correct sort = +8 points for each category identified. (Sorting square into all three categories = 24 points.)
- Incorrect sort = no points, shape returns, next shape appears after 2-second delay.
- Streak bonus: 4+ consecutive correct = 1.5x multiplier.
- Emergent: basic categories (triangles, quadrilaterals, special rectangles); Proficient: attribute-based sorting; Advanced: hierarchy-aware sorting.

**Side Panel Content:**
- **Vocabulary**: Quadrilateral, Rectangle, Square, Rhombus, Trapezoid, Parallel, Perpendicular, Equal, Attribute, Hierarchy, Partition, Fraction
- **Key Concepts**: "Shapes can be sorted by attributes (properties). Some shapes have multiple attributes and fit into more than one category."
- **Hierarchy Tip**: "All squares are rectangles, but not all rectangles are squares. Squares are a special type of rectangle."
- **Partitioning Tip**: "To partition fairly, all parts must be equal in area. Use equal lengths or angles as guides."
- **Attribute Language**: "Use words like 'all sides equal,' 'has right angles,' 'has parallel sides' to describe and classify shapes."

---

## Grade 3 Build Priority Order

Based on skill prerequisites and content sequencing:

1. **Multiplication Concepts** (foundational operation)
2. **Division Concepts** (complements multiplication)
3. **Times Table Fluency** (builds on concepts)
4. **Multiplication Properties** (deepens understanding)
5. **Add/Subtract Within 1000** (place value review)
6. **Rounding & Estimation** (supports mental math)
7. **Two-Step Word Problems** (application of operations)
8. **Fraction Explorer** (introduces new domain)
9. **Time & Elapsed Time** (measurement domain)
10. **Area & Perimeter** (measurement + geometry)
11. **Data & Line Plots** (data/probability domain)
12. **Shape Categories & Partitioning** (geometry deepening)

---

---

# GRADE 4 COMPREHENSIVE APP PLAN

## Grade 4 Standards Coverage Map

| Domain | Standards | App Name | File Path |
|--------|-----------|----------|-----------|
| 4.OA | 4.OA.A.1-3 | Multiplicative Comparison | tools/4/multiplicative-comparison.html |
| 4.OA | 4.OA.B.4 | Factors & Multiples | tools/4/factors-multiples.html |
| 4.OA | 4.OA.C.5 | Number Patterns | tools/4/number-patterns.html |
| 4.NBT | 4.NBT.A.1-3 | Place Value Millions | tools/4/place-value-millions.html |
| 4.NBT | 4.NBT.B.4-6 | Multi-Digit Arithmetic | tools/4/multi-digit-arithmetic.html |
| 4.NF | 4.NF.A.1-2 | Equivalent Fractions | tools/4/equivalent-fractions.html |
| 4.NF | 4.NF.B.3-4 | Fraction Operations | tools/4/fraction-operations.html |
| 4.NF | 4.NF.C.5-7 | Decimals | tools/4/decimals.html |
| 4.MD | 4.MD.A.1-3 | Measurement Conversion | tools/4/measurement-conversion.html |
| 4.MD | 4.MD.C.5-7 | Angle Explorer | tools/4/angle-explorer.html |
| 4.G | 4.G.A.1-2 | Lines & Angles | tools/4/lines-angles.html |
| 4.G | 4.G.A.3 | Symmetry | tools/4/symmetry.html |

---

## GRADE 4 APP SPECIFICATIONS

### 1. Multiplicative Comparison
**File Path:** `tools/4/multiplicative-comparison.html`

**Standards:**
- **CCSS 4.OA.A.1**: Interpret a multiplication equation as a comparison (e.g., 35 = 5 × 7 means 35 is 5 times as many as 7)
- **CCSS 4.OA.A.2**: Multiply or divide to solve word problems involving multiplicative comparison
- **CCSS 4.OA.A.3**: Solve multistep word problems posed with whole numbers and having whole-number answers using the four operations

**Minnesota Crosswalk:** 4.1.1.1 (Solve multiplicative comparison problems); 4.1.1.2 (Apply properties of operations)

**TEKS Crosswalk:** 4.4.H (Represent the product of two numbers up to four digits by two digits using arrays, area models, or equations); 4.4.I (Solve one-step and two-step multiplication and division problems)

**Explore Mode:**
Interactive manipulative featuring:
- **Bar Model Visualizer**: Two bars representing quantities. One bar labeled "given amount," other labeled "times as many." Adjust multiplier slider. "5 times as many" shows bar that is 5× longer. Dynamic calculation below.
- **Comparison Sentence Generator**: "8 is __ times as many as 2." Fill in or drag to complete. Emphasize comparison language vs. addition language ("times as many" vs. "more").
- **Real-World Scenario Explorer**: Age comparison ("Maria is 3 times as old as her brother who is 5"), collections ("Sam has 4 times as many marbles as Jim"), etc. Interactive setup with visual bar models.
- **Inverse Problem Visualizer**: Given "36 is 9 times as many as ___," show how to divide to find the unknown. Work backward from product to factors.
- **Array-Based Comparison**: Arrays side-by-side showing 3 × 4 and 2 × 4. Highlighting shows "second array is twice as long (twice as many)."

**Practice Mode:**
- **Emergent Tier**: Identify multiplicative comparison from visual (two bar models). Multiple choice. "How many times as many?" Scaffolding: bars clearly different sizes. 6-8 problems.
- **Proficient Tier**: Word problems with multiplicative comparison. Students solve using bar model or equation. Some involve finding the multiplicand ("Tom has 3 times as many as Sarah. Sarah has 7. How many does Tom have?"). 8-10 problems.
- **Advanced Tier**: Multistep comparison problems (e.g., "Maria has 4 times as many as Juan. Juan has 2 times as many as Alex. Alex has 5. How many does Maria have?"). Requires setting up equations and solving in sequence. 7-9 problems.

Question examples include:
- "The bar shows 12 is __ times as many as 3." (visual, Emergent)
- "Ali has 28 trading cards. Maya has 4 times as many. How many does Maya have?" (Proficient)
- "School A has 5 times as many students as School B. School B has 3 times as many as School C. School C has 120 students. How many at School A?" (Advanced)

**Play Mode:**
**"Comparison Quest"** game mechanic:
- Adventure narrative. Each correctly solved comparison problem advances the story.
- Problem presents: word scenario with multiplicative relationship.
- Student enters answer or selects from multiple choices (Emergent).
- Correct = +20 points, story advances one panel, unlock next challenge.
- Incorrect = hint reveals bar model relationship, student retries.
- Three story arcs (branches) possible based on tier and performance.
- Emergent: simple scenarios, single comparison; Proficient: realistic multi-step narratives; Advanced: complex nested comparisons.

**Side Panel Content:**
- **Vocabulary**: Times as Many, Multiplicative Comparison, Comparison, Multiplicand, Multiplier, Relationship, Scale
- **Key Concepts**: "Times as many means multiplication. If X is 3 times as many as Y, then X = 3 × Y."
- **Bar Model Tip**: "Draw two bars: one for the smaller amount, one 3 times as long for '3 times as many.'"
- **Language Difference**: "Times as many (multiplication) is different from 'more' (addition). 10 is 5 MORE than 5, but 10 is 2 TIMES AS MANY as 5."
- **Finding the Unknown**: "If 36 is 6 times as many as X, divide: X = 36 ÷ 6 = 6."

---

### 2. Factors & Multiples
**File Path:** `tools/4/factors-multiples.html`

**Standards:**
- **CCSS 4.OA.B.4**: Find all factor pairs for a whole number in the range 1–100; recognize that a whole number is a multiple of each of its factors; determine whether a given whole number in the range 1–100 is prime or composite

**Minnesota Crosswalk:** 4.1.2.1 (Understand factors and multiples); 4.1.2.2 (Classify numbers as prime or composite)

**TEKS Crosswalk:** 4.4.A (Represent the value of digit in whole numbers); 4.4.H (Represent product of two numbers)

**Explore Mode:**
Interactive manipulative featuring:
- **Factor Pair Finder**: Input a number; app displays all factor pairs as arrays. For 24: 1×24, 2×12, 3×8, 4×6. Each pair shown as interactive array. Highlight and count rows/columns.
- **Divisibility Tool**: Number line 1–100. Select a target number. Drag slider to find "step size" that lands exactly on target. Multiples of that number highlight. "Multiples of 5: 5, 10, 15, 20..."
- **Prime vs. Composite Visualizer**: Number displayed. "Can I make only 1 row of that many?" = prime (cannot be arranged into rectangle except 1 × n). Multiple rectangular arrangements = composite. Interactive area model.
- **Factor Tree Generator**: Composite number decomposes visually (e.g., 24 → 2 × 12 → 2 × 2 × 6 → 2 × 2 × 2 × 3). Interactive branching. Show prime factorization.
- **Relationship Explorer**: Given number, highlight all its factors and all its multiples (within range). Color-code to show relationships.

**Practice Mode:**
- **Emergent Tier**: Given visual (arrays), identify factor pairs. Classify numbers as prime (2 factors) or composite (more than 2 factors) using visual inspection. 6-8 problems with arrays shown.
- **Proficient Tier**: Find all factor pairs for given numbers. Identify if number is prime or composite. Determine multiples ("List multiples of 3 up to 30"). 8-10 problems.
- **Advanced Tier**: Explain prime/composite using factor language. Given a number, identify missing factor in pair ("24 = 3 × __"). Prime factorization (express as product of primes). 7-9 problems.

Question examples include:
- "Count the arrays. How many factor pairs does 12 have?" (Emergent)
- "Is 17 prime or composite? How do you know?" (Proficient)
- "24 = 2 × __ × 3. Fill in the blank. Write 24 as a product of prime numbers." (Advanced)

**Play Mode:**
**"Factor Rush"** game mechanic:
- 70-second speed challenge. Numbers appear in sequence.
- For each number, player must:
  - List all factor pairs, OR
  - Classify as prime/composite, OR
  - Complete a factor pair (Emergent)
- Correct answer = +10 points.
- Incorrect = no points, correct shown, continue.
- Bonus: answer within 3 seconds = +5 speed bonus.
- Emergent: numbers 1-30, factor pairs with visual support; Proficient: 1-100, prime/composite focus; Advanced: prime factorization, larger numbers.

**Side Panel Content:**
- **Vocabulary**: Factor, Factor Pair, Multiple, Divisible, Prime, Composite, Divisor, Prime Factorization
- **Key Concepts**: "Factors of 12 are numbers that divide evenly into 12: 1, 2, 3, 4, 6, 12. Multiples of 3 are 3, 6, 9, 12, 15, ..."
- **Prime Definition**: "A prime number has exactly 2 factors: 1 and itself. 2, 3, 5, 7, 11, 13 are prime."
- **Composite Definition**: "A composite number has more than 2 factors. All even numbers except 2 are composite."
- **Factor Pair Tip**: "Think of arrays. 12 = 3 × 4 is a factor pair. Draw a 3 × 4 array."

---

### 3. Number Patterns
**File Path:** `tools/4/number-patterns.html`

**Standards:**
- **CCSS 4.OA.C.5**: Generate a number or shape pattern that follows a given rule; identify apparent features of the pattern that were not explicit in the rule itself

**Minnesota Crosswalk:** 4.1.3.1 (Generate and analyze patterns); 4.1.3.2 (Extend and explain patterns)

**TEKS Crosswalk:** 4.5.A (Identify factors of a number); 4.5.B (Generate a number pattern when given a rule)

**Explore Mode:**
Interactive manipulative featuring:
- **Additive Pattern Generator**: Start number + operation. "Start at 2, add 3 each time: 2, 5, 8, 11, ..." Interactive slider for starting number and increment. Extend pattern with checkboxes.
- **Multiplicative Pattern Builder**: Start number × multiplier. "Start at 1, multiply by 2: 1, 2, 4, 8, 16, ..." Show both recursive rule (each term is __ times previous) and explicit rule (nth term is __ × __^(n-1)).
- **Mixed Pattern Explorer**: Combine operations. "Start at 5, add 2, then add 4, alternating: 5, 7, 11, 13, 17..." Challenge to identify rule.
- **Shape Pattern Visualizer**: Sequence of growing shapes (e.g., square, then 2 squares, then 3 squares). Count elements/perimeter/area in each. Extend pattern visually. Identify rule.
- **Two-Variable Pattern Table**: Input X values; compute Y values using rule (e.g., Y = 2X + 1). Table displays. Plot points on coordinate grid to show linear relationship.

**Practice Mode:**
- **Emergent Tier**: Identify simple additive pattern (add same number each time). Complete sequence by writing next 2–3 terms. Scaffolding: pattern shown numerically with visual groupings. 6-8 problems.
- **Proficient Tier**: Generate pattern given rule. Identify rule from given sequence. Distinguish additive from multiplicative. Extend shape patterns and count attributes. 8-10 problems.
- **Advanced Tier**: Explain two rules (recursive and explicit). Compare patterns with different rules. Find relationship between position in pattern and value (e.g., nth term). 7-9 problems.

Question examples include:
- "Pattern: 3, 6, 9, 12, __. Next term is ___." (Emergent)
- "Rule: Start at 1, multiply by 3 each time. Generate first 5 terms." (Proficient)
- "Shape pattern: term 1 has 1 square, term 2 has 3 squares, term 3 has 5 squares. How many squares in term 10?" (Advanced)

**Play Mode:**
**"Pattern Detective"** game mechanic:
- Mystery-themed. Each round presents a hidden pattern.
- First 3 terms shown (e.g., "2, 4, 6, __").
- Player guesses the rule and next term.
- Correct rule identification = +15 points.
- Correct next term = +10 points (5 points if rule was wrong but next term happens to be right).
- Incorrect = hint reveals rule, player retries next term only.
- Streak bonus: 3+ correct = 1.5x multiplier.
- Emergent: simple addition patterns; Proficient: addition and multiplication; Advanced: complex rules, position-value relationship.

**Side Panel Content:**
- **Vocabulary**: Pattern, Rule, Term, Sequence, Additive, Multiplicative, Recursive Rule, Explicit Rule, Extend
- **Key Concepts**: "A pattern follows a rule. The rule tells you how to get from one term to the next."
- **Finding the Rule**: "Look at how much increases from term to term. Is it the same increase (additive) or same multiplier (multiplicative)?"
- **Recursive Rule**: "Each term = previous term + constant." Example: Each term is 5 more than the previous one.
- **Explicit Rule**: "The nth term = formula." Example: The nth term = 5n. For n=3, term = 15."

---

### 4. Place Value Millions
**File Path:** `tools/4/place-value-millions.html`

**Standards:**
- **CCSS 4.NBT.A.1**: Recognize that in a multi-digit whole number, a digit in one place represents ten times what it represents in the place to its right
- **CCSS 4.NBT.A.2**: Read and write multi-digit whole numbers using base-ten numerals, number names, and expanded form
- **CCSS 4.NBT.A.3**: Compare two multi-digit numbers based on meanings of the digits in each place

**Minnesota Crosswalk:** 4.2.1.1 (Understand place value to millions); 4.2.1.2 (Read, write, compare whole numbers)

**TEKS Crosswalk:** 4.2.A (Interpret the value of each digit); 4.2.B (Represent whole numbers); 4.2.D (Compare and order whole numbers)

**Explore Mode:**
Interactive manipulative featuring:
- **Place Value Chart**: Interactive grid with columns: millions, hundred-thousands, ten-thousands, thousands, hundreds, tens, ones. Input number; digits populate chart with color-coding. Show value of each digit (e.g., "5 in the hundreds place = 500").
- **Base-10 Block Visualization** (scaled to millions): Large blocks for millions, hundred-thousands, etc. Drag-and-drop to build numbers visually. For 1,234,567, show proportional size differences.
- **Expanded Form Builder**: Number displayed (e.g., 3,452). Decompose interactively: 3,000 + 400 + 50 + 2. Slider can adjust magnitude to show powers of 10 relationship.
- **Comparison Tool**: Two numbers side-by-side with digit-by-digit highlighting. "3,456 vs. 3,465. Compare digits. Thousands place tied (3 = 3), but hundreds place is different (4 < 4... wait, they're equal). Tens place: 5 < 6, so 3,456 < 3,465."
- **Number Name Reader**: Animate reading number aloud while highlighting place values. "Three million, four hundred fifty-two thousand, six hundred seven."

**Practice Mode:**
- **Emergent Tier**: Read numbers to hundred-thousands. Identify place value of digit ("What digit is in the ten-thousands place?"). Multiple choice. 6-8 problems with chart visible.
- **Proficient Tier**: Read and write numbers to millions in standard, expanded, and word form. Compare numbers using place value language. Problems within 10,000,000. 8-10 problems.
- **Advanced Tier**: Explain place value relationships ("How many ten-thousands in 100,000?"). Order multiple numbers. Identify number given expanded form or constraints. 7-9 problems.

Question examples include:
- "In 45,678, what digit is in the thousands place?" (Emergent)
- "Write 2,345,670 in expanded form: 2,000,000 + __ + 40,000 + __ + 70" (Proficient)
- "Compare 899,999 and 900,000. Which is larger? By how much?" (Advanced)

**Play Mode:**
**"Place Value Builder"** game mechanic:
- Build a target number using digit cards and place-value positions.
- Target displayed: "Build 3,456,789."
- Drag digit cards to positions. Each digit placed correctly = +8 points.
- System verifies as you go. Full number correct = +20 bonus points.
- Time bonus: complete under 20 seconds = +10 extra points.
- Difficulty escalates: early rounds within thousands, later rounds millions.
- Emergent: up to hundred-thousands; Proficient: to millions; Advanced: large numbers with missing digits to identify.

**Side Panel Content:**
- **Vocabulary**: Place Value, Digit, Standard Form, Expanded Form, Word Form, Million, Hundred-Thousand, Ten-Thousand, Thousand
- **Key Concepts**: "Each place is worth 10 times the place to its right. 1 hundred = 10 tens = 100 ones."
- **Reading Numbers**: "Read in groups of three from right to left. 3,456,789 is 'three million, four hundred fifty-six thousand, seven hundred eighty-nine.'"
- **Expanded Form**: "Break the number into parts by place value. 456 = 400 + 50 + 6."
- **Comparing Tip**: "Line up place values. Compare digit-by-digit from left to right until you find a difference."

---

### 5. Multi-Digit Arithmetic
**File Path:** `tools/4/multi-digit-arithmetic.html`

**Standards:**
- **CCSS 4.NBT.B.4**: Fluently add and subtract multi-digit whole numbers using standard algorithm
- **CCSS 4.NBT.B.5**: Multiply a whole number of up to four digits by a one-digit whole number, and multiply two two-digit numbers, using strategies based on place value and properties
- **CCSS 4.NBT.B.6**: Divide a whole number in the range of up to four digits by a one-digit whole number, expressing remainder appropriately

**Minnesota Crosswalk:** 4.2.2.1 (Add and subtract multi-digit numbers); 4.2.3.1 (Multiply and divide multi-digit numbers)

**TEKS Crosswalk:** 4.4.F (Solve one-step and multi-step multiplication and division problems); 4.4.G (Round to nearest ten, hundred, or thousand)

**Explore Mode:**
Interactive manipulative featuring:
- **Addition Algorithm Visualizer**: Multi-digit addition (e.g., 2,345 + 1,678) with step-by-step breakdown. Show regrouping visually: 5 + 8 = 13 (write 3, carry 1). Color-code carries.
- **Subtraction Algorithm Visualizer**: Show traditional algorithm with regrouping (borrowing). When 23 - 15 requires regrouping tens into ones, animate the process.
- **Multiplication Strategy Explorer**: Multiple approaches for 4 × 23:
  - Standard algorithm (multiply by ones, then tens, align and add)
  - Distributive property (4 × 20 + 4 × 3)
  - Area model (rectangle partitioned into 20 and 3)
  - Interactively switch between strategies.
- **Two-Digit Multiplication Breakdown**: 23 × 15 = (20 + 3) × (10 + 5) = (20×10) + (20×5) + (3×10) + (3×5). Visual grid showing all four partial products.
- **Division Algorithm**: Long division step-by-step. 456 ÷ 12: Estimate, multiply, subtract, bring down. Highlight quotient, remainder, and remainder interpretation.

**Practice Mode:**
- **Emergent Tier**: Two and three-digit addition (no regrouping). Two and three-digit subtraction (minimal regrouping). Scaffolding: place-value chart and regrouping notation visible. 6-8 problems.
- **Proficient Tier**: Multi-digit addition/subtraction with regrouping. One-digit × three-digit multiplication (using standard algorithm or strategies). Single-digit division with remainders. 8-10 problems with strategy choice available.
- **Advanced Tier**: Two-digit × two-digit multiplication. Three to four-digit division by one-digit. Remainders interpreted contextually. Efficiency focus (choosing optimal strategy). 7-9 problems.

Question examples include:
- "2,345 + 1,678 = ___" (with place-value support, Emergent)
- "4 × 237 = ___. Show your work using a strategy." (Proficient)
- "24 × 18 = ___. Use area model or standard algorithm." (Advanced)
- "567 ÷ 8 = ___ R ___. Interpret remainder in context." (Advanced)

**Play Mode:**
**"Arithmetic Master"** game mechanic:
- Three rounds: Addition/Subtraction, Multiplication, Division.
- Each round: 60 seconds, problems presented in sequence.
- Problem displays with 4 multiple-choice options (or input answer for Advanced).
- Correct = +12 points.
- Incorrect = no points, correct answer shown, continue.
- Streak bonus: 4+ consecutive correct = 1.5x multiplier.
- Emergent: two and three-digit numbers, basic operations; Proficient: multi-digit, mixed operations; Advanced: two-digit multiplication, three-digit division.

**Side Panel Content:**
- **Vocabulary**: Algorithm, Regroup, Carry, Borrow, Quotient, Remainder, Partial Product, Dividend, Divisor, Place Value
- **Key Concepts**: "Add and subtract by place value, working right to left. Regroup when necessary (10 ones = 1 ten)."
- **Addition Algorithm**: "Line up place values. Add ones, then tens, then hundreds, etc. Regroup and carry as needed."
- **Subtraction Algorithm**: "Line up place values. Subtract ones, then tens, etc. When you can't subtract, borrow from the next place."
- **Multiplication Strategies**: "Use distributive property (break into tens and ones), area model, or standard algorithm."
- **Division**: "Estimate, multiply, subtract, bring down. Remainder is what's left over."

---

### 6. Equivalent Fractions
**File Path:** `tools/4/equivalent-fractions.html`

**Standards:**
- **CCSS 4.NF.A.1**: Explain why a fraction a/b is equivalent to a fraction (n × a)/(n × b) by using visual fraction models
- **CCSS 4.NF.A.2**: Compare two fractions with different numerators and denominators by creating common denominators or numerators, or by comparing to a benchmark fraction such as 1/2

**Minnesota Crosswalk:** 4.3.1.1 (Understand fraction equivalence); 4.3.1.2 (Compare and order fractions)

**TEKS Crosswalk:** 4.3.A (Explain that the denominators in fractions represent equal parts); 4.3.C (Compare two fractions with different numerators and denominators); 4.3.D (Decompose fractions)

**Explore Mode:**
Interactive manipulative featuring:
- **Fraction Wall**: Vertical bars for denominators 1 through 12. All same height. Partitions show unit fractions. Drag to highlight 1/2, 2/4, 3/6, 4/8 — all align at same height. "These are equivalent."
- **Area Model Equivalence**: Two side-by-side rectangles. Left shows 1/2 (one part shaded out of 2). Right shows 2/4 (two parts shaded out of 4). Overlay shows both areas are equal.
- **Multiplication by 1 (disguised)**: Start with 1/3. Multiply by 2/2 (which equals 1). Show 1/3 × 2/2 = 2/6. Visual demonstration that multiplying numerator and denominator by same number doesn't change value.
- **Common Denominator Finder**: Two fractions (e.g., 2/3 and 3/4). Interactive highlighting shows equivalent fractions: 2/3 = 8/12, 3/4 = 9/12. Now comparison is obvious (8/12 < 9/12).
- **Benchmark Comparison**: Fractions compared to benchmark (1/2, 1/4, 3/4). Visual positioning on number line. "2/5 is close to 1/2. 3/8 is less than 1/2."

**Practice Mode:**
- **Emergent Tier**: Identify equivalent fractions from visual models (two shapes shown). Select equivalent from multiple choice. Scaffolding: shapes provided. 6-8 problems.
- **Proficient Tier**: Identify equivalent fractions using multiplication rule. Complete equivalent pairs ("1/3 = __/6"). Compare fractions with different denominators using visual models. 8-10 problems.
- **Advanced Tier**: Explain equivalence using area models and multiplication by 1. Find common denominators to compare. Order multiple fractions with different denominators. 7-9 problems.

Question examples include:
- "Which shape shows a fraction equivalent to 1/2?" (visual options, Emergent)
- "1/4 = __/8. Fill in the blank. How do you know?" (Proficient)
- "Compare 3/4 and 5/6 using a common denominator. Which is larger?" (Advanced)

**Play Mode:**
**"Fraction Match"** game mechanic:
- 60 seconds. Matching game with fraction cards.
- Cards show fractions in form (text or visual). Two types: equivalent pairs and comparison.
- Matching equivalent fractions = +15 points.
- Correct comparison (e.g., 2/3 > 1/2) = +10 points.
- Incorrect match = no points, cards flip back, 3-second penalty.
- Bonus: complete under 45 seconds = 1.5x multiplier.
- Emergent: simple visual equivalents; Proficient: text-based fractions, straightforward equivalents; Advanced: complex denominators, comparison mixed in.

**Side Panel Content:**
- **Vocabulary**: Equivalent, Fraction, Numerator, Denominator, Common Denominator, Benchmark, Unit Fraction, Equal Parts
- **Key Concepts**: "Equivalent fractions represent the same amount. 1/2 = 2/4 = 3/6. You can multiply top and bottom by the same number."
- **Visual Models**: "Use rectangles or circles partitioned into equal parts. Shading shows the fraction. If two models show same shaded area, they're equivalent."
- **Common Denominator Strategy**: "To compare 2/3 and 3/4, find a common denominator (12). 2/3 = 8/12 and 3/4 = 9/12. Now compare: 8/12 < 9/12."
- **Benchmark Comparison**: "Use 1/2 as a benchmark. 3/7 is close to 1/2. 1/8 is much less than 1/2. This helps order fractions quickly."

---

### 7. Fraction Operations
**File Path:** `tools/4/fraction-operations.html`

**Standards:**
- **CCSS 4.NF.B.3**: Understand a fraction a/b with a > 1 as a sum of fractions 1/b; add and subtract fractions with same denominator
- **CCSS 4.NF.B.4**: Apply and extend previous understandings of multiplication to multiply a fraction by a whole number

**Minnesota Crosswalk:** 4.3.2.1 (Add and subtract fractions); 4.3.2.2 (Multiply fractions by whole numbers)

**TEKS Crosswalk:** 4.3.D (Decompose fractions); 4.3.E (Solve problems with fractions); 4.3.F (Understand and represent fractions as additive)

**Explore Mode:**
Interactive manipulative featuring:
- **Fraction Addition Visualizer**: Two fractions with same denominator (e.g., 2/5 + 1/5). Visual models (rectangles) show both fractions shaded separately, then combined. 3/5 emerges. "Numerators add; denominator stays the same."
- **Fraction Subtraction Visualizer**: 3/4 - 1/4 shown visually. Start with 3/4 shaded, remove 1/4, result is 2/4. Interactive shading and removal.
- **Mixed Number Visualizer**: Decompose 5/4 as 1 + 1/4 (one whole plus one-fourth). Interactive partitioning shows conversion between improper and mixed form.
- **Multiplication by Whole Visualizer**: 3 × 1/4. Show three groups of 1/4 (three unit fractions), sum to 3/4. Extend to 3 × 2/5 = (3 × 2)/5 = 6/5 = 1 1/5.
- **Real-World Context**: Sharing pizza (fractions of slices), recipes (3/4 cup doubled), distance (1/3 mile repeated). Interactive scenario setups.

**Practice Mode:**
- **Emergent Tier**: Add fractions with same denominator using visual models (shapes provided). Simple numerators and denominators (halves through fourths, sums within 1). 6-8 problems.
- **Proficient Tier**: Add and subtract fractions with same denominator. Multiply fractions by whole numbers. Convert between improper fractions and mixed numbers. Some problems require simplifying. 8-10 problems with visual support optional.
- **Advanced Tier**: Solve word problems involving fraction addition/subtraction and multiplication. Simplify results. Multi-step problems (e.g., "Start with 1 1/2 cups. Add 3/4 cup. How much total?"). 7-9 problems.

Question examples include:
- "2/5 + 1/5 = ___" (with visual shapes, Emergent)
- "3 × 2/6 = ___. Simplify your answer." (Proficient)
- "A recipe calls for 2/3 cup of flour. You're tripling the recipe. How much flour?" (Advanced)

**Play Mode:**
**"Fraction Action"** game mechanic:
- Three sub-games: Adding, Subtracting, Multiplying (player chooses or random).
- 60 seconds per sub-game.
- Problem displays with two or three fractions (or whole number and fraction).
- Multiple-choice answer options (including common mistakes as distractors).
- Correct = +12 points.
- Incorrect = no points, correct answer highlights, continue.
- Streak bonus: 3+ consecutive correct = 1.5x multiplier.
- Emergent: small fractions, visual support; Proficient: mixed numbers, denominators up to 12; Advanced: larger operations, multi-step word problems.

**Side Panel Content:**
- **Vocabulary**: Add, Subtract, Multiply, Numerator, Denominator, Same Denominator, Mixed Number, Improper Fraction, Simplify, Equivalent
- **Key Concepts**: "Add and subtract fractions with same denominator by adding/subtracting numerators. Denominator stays the same."
- **Multiplication Rule**: "n × (a/b) = (n × a)/b. Multiply the numerator by the whole number."
- **Mixed Numbers**: "A mixed number combines a whole and a fraction. 1 1/2 = 3/2 (one whole plus one-half)."
- **Simplifying**: "Reduce fractions by finding greatest common factor. 6/8 = 3/4 (both divisible by 2)."

---

### 8. Decimals
**File Path:** `tools/4/decimals.html`

**Standards:**
- **CCSS 4.NF.C.5**: Express a fraction with denominator 10 as an equivalent fraction with denominator 100 and use this technique to add two fractions with respective denominators 10 and 100
- **CCSS 4.NF.C.6**: Use decimal notation for fractions with denominators 10 or 100
- **CCSS 4.NF.C.7**: Compare two decimals to hundredths by reasoning about their size

**Minnesota Crosswalk:** 4.3.3.1 (Understand decimal notation); 4.3.3.2 (Compare and order decimals)

**TEKS Crosswalk:** 4.2.C (Read, write, and order decimal numbers); 4.3.G (Decompose fractions into unit fractions)

**Explore Mode:**
Interactive manipulative featuring:
- **Decimal Grid Visualizer**: 10×10 grid (100 squares). Shade individual squares to show hundredths. Show how 5/100 = 0.05 and 50/100 = 0.50 (same as 5/10). Interactive highlighting.
- **Place Value Grid**: Whole number part | decimal point | tenths place | hundredths place. Input decimal; show value of each digit. 0.43 = 4 tenths + 3 hundredths.
- **Fraction-Decimal Bridge**: Show 3/10 = 0.3 (three-tenths). Show 25/100 = 0.25 (twenty-five hundredths). Interactive conversion.
- **Number Line Decimal Positioning**: 0 to 1 marked with tenths (0.1, 0.2, ..., 0.9) and hundredths (0.01, 0.02, ..., 0.99). Drag decimals to correct positions.
- **Comparison Visualizer**: Two decimals with visual representations (grids or number lines). "0.5 vs. 0.52. Which is larger? 0.5 = 0.50, so 0.50 < 0.52."

**Practice Mode:**
- **Emergent Tier**: Read decimals to tenths (0.1 through 0.9). Match fraction form to decimal form (1/10 = 0.1). Identify tenths on number line. 6-8 problems with grid/number line visible.
- **Proficient Tier**: Read and write decimals to hundredths. Convert between fraction and decimal form. Compare decimals using place value reasoning. 8-10 problems.
- **Advanced Tier**: Explain equivalence (5/10 = 50/100 = 0.5). Order multiple decimals. Add decimals with different place values (0.3 + 0.07). 7-9 problems.

Question examples include:
- "What decimal is shown? __ (grid with 7 shaded out of 10, Emergent)
- "3/10 = 0.__" (Proficient)
- "0.4 or 0.40? Are they the same? Why?" (Advanced)
- "Order from smallest to largest: 0.5, 0.45, 0.54" (Advanced)

**Play Mode:**
**"Decimal Dash"** game mechanic:
- 70-second speed challenge.
- Problems presented: read decimal, convert fraction-to-decimal, compare decimals, order decimals.
- Multiple-choice (4 options) or fill-in.
- Correct = +10 points.
- Incorrect = no points, correct answer shown, continue.
- Bonus: answer within 2 seconds = +5 speed bonus.
- Streak: 5+ consecutive correct = 1.5x multiplier.
- Emergent: tenths only, simple comparisons; Proficient: tenths and hundredths; Advanced: equivalence, complex comparisons, ordering.

**Side Panel Content:**
- **Vocabulary**: Decimal, Decimal Point, Tenth, Hundredth, Place Value, Equivalent, Compare, Digit Position
- **Key Concepts**: "Decimals are fractions with denominators 10 and 100. 0.5 = 5/10. 0.25 = 25/100."
- **Place Value**: "The first digit after the decimal point is tenths. The second is hundredths. 0.37 = 3 tenths + 7 hundredths."
- **Equivalence**: "0.5 = 0.50 = 5/10 = 50/100. Adding a 0 at the end doesn't change the value."
- **Comparing Tip**: "Compare digit by digit from left to right. 0.5 vs. 0.51: tenths place is tied (5 = 5), but 0.51 has more (1 hundredth), so 0.51 > 0.5."

---

### 9. Measurement Conversion
**File Path:** `tools/4/measurement-conversion.html`

**Standards:**
- **CCSS 4.MD.A.1**: Know relative sizes of measurement units within one system of units; express measurements in a larger unit in terms of a smaller unit
- **CCSS 4.MD.A.2**: Use the four operations to solve word problems involving distances, intervals of time, and liquid volumes, using diagrams as models for the problems
- **CCSS 4.MD.A.3**: Apply the area and perimeter formulas for rectangles in real-world and mathematical problems

**Minnesota Crosswalk:** 4.4.1.1 (Understand measurement conversions); 4.4.1.2 (Solve measurement word problems)

**TEKS Crosswalk:** 4.8.A (Estimate and measure); 4.8.B (Solve problems involving length); 4.8.C (Solve problems using weight and liquid volume)

**Explore Mode:**
Interactive manipulative featuring:
- **Unit Conversion Tool**: Interactive equivalence display. "1 foot = 12 inches. 1 yard = 3 feet = 36 inches." Sliders convert between units. Input value in feet; shows equivalent in inches.
- **Measurement Comparison**: Visual representations of units. Show actual 1-inch, 1-foot, 1-yard objects (scaled). Compare sizes interactively.
- **Weight Conversion**: Metric and customary scales. 1 kilogram ≈ 1000 grams. 1 pound ≈ 16 ounces. Interactive conversion.
- **Liquid Volume Conversion**: 1 liter ≈ 4 cups. 1 cup = 8 fluid ounces. Visual container representations showing relative sizes.
- **Real-World Scenario**: Distance conversion (miles/feet), recipe conversions (cups/tablespoons), weight of objects. Interactive problem setup.

**Practice Mode:**
- **Emergent Tier**: Convert within a single system using visual reference tables. Simple conversions (e.g., 3 feet = __ inches). Multiple choice. 6-8 problems with conversion chart visible.
- **Proficient Tier**: Convert between units within and across systems (metric/customary). One-step word problems involving measurement. Scaffolding: conversion factors provided or reference chart available. 8-10 problems.
- **Advanced Tier**: Multi-step measurement word problems. Combine operations with conversions (e.g., "3 yards of ribbon costs $2 per foot. Total cost?"). 7-9 problems.

Question examples include:
- "2 feet = __ inches" (Emergent)
- "A recipe needs 3 cups of water. How many tablespoons?" (Proficient)
- "A garden is 12 yards long. Fencing costs $8 per foot. Total cost to fence one side?" (Advanced)

**Play Mode:**
**"Conversion Quest"** game mechanic:
- Adventure-themed. Each conversion problem solved unlocks next step.
- Problem: "Convert __ to __" or solve measurement word problem.
- Student enters answer or selects from multiple choice.
- Correct = +20 points, story advances, next challenge unlocks.
- Incorrect = hint shows conversion factor, student retries.
- Bonus: solve three in a row without hints = special achievement.
- Emergent: length conversions (feet/inches), simple; Proficient: mixed systems, word problems; Advanced: multi-step, complex scenarios.

**Side Panel Content:**
- **Vocabulary**: Conversion, Unit, Customary, Metric, Equivalent, Estimate, Actual Measurement, Foot, Inch, Yard, Pound, Ounce, Cup, Liter, Kilogram, Gram
- **Key Concepts**: "Conversion means expressing the same measurement in a different unit. 12 inches = 1 foot."
- **Customary Units**: "Length: inch, foot, yard, mile. Weight: ounce, pound. Volume: teaspoon, tablespoon, cup, pint, quart, gallon."
- **Metric Units**: "Length: millimeter, centimeter, meter, kilometer. Weight: gram, kilogram. Volume: milliliter, liter."
- **Conversion Strategy**: "Multiply when converting to smaller units. Divide when converting to larger units."

---

### 10. Angle Explorer
**File Path:** `tools/4/angle-explorer.html`

**Standards:**
- **CCSS 4.MD.C.5**: Recognize angles as geometric shapes that are formed wherever two rays share a common endpoint; understand concepts of angle measurement
- **CCSS 4.MD.C.6**: Measure angles in whole-number degrees using a protractor; sketch angles of specified measure
- **CCSS 4.MD.C.7**: Recognize angle measure as additive; when an angle is decomposed into non-overlapping parts, the angle measure of the whole equals the sum of the angle measures of the parts

**Minnesota Crosswalk:** 4.5.1.1 (Understand angles); 4.5.1.2 (Measure and construct angles)

**TEKS Crosswalk:** 4.7.A (Identify and classify angles); 4.7.B (Measure and create angles); 4.7.D (Decompose angles)

**Explore Mode:**
Interactive manipulative featuring:
- **Angle Visualizer**: Two rays emanating from common endpoint. Drag one ray to adjust angle opening. Protractor overlay shows degree measure (0° to 180°). Labels: acute (< 90°), right (= 90°), obtuse (> 90°).
- **Protractor Tool**: Interactive protractor with transparent overlay. Place on angle; read measurement at ray alignment. Practice aligning protractor correctly (center on vertex, baseline on one ray).
- **Angle Classification**: Various angles displayed. Drag into categories: acute, right, obtuse, straight (180°). Visual feedback on classification.
- **Angle Decomposition**: Larger angle (e.g., 120°) partitioned by internal ray into two parts (70° and 50°). Show that 70° + 50° = 120°. Interactive sliders adjust component angles while maintaining sum.
- **Real-World Angles**: Clock hands form angles. Door opening. Compass directions. Interactive scenarios showing angle applications.

**Practice Mode:**
- **Emergent Tier**: Classify angles as acute, right, or obtuse using visual inspection (no protractor needed). Identify right angles in shapes. 6-8 problems with visual examples.
- **Proficient Tier**: Measure angles using protractor to nearest degree (whole numbers). Sketch angles of specified measure. Classify angles. 8-10 problems.
- **Advanced Tier**: Explain angle additivity (parts sum to whole). Find unknown angle when decomposed. Identify vertical angles and angle relationships in figures. 7-9 problems.

Question examples include:
- "Is this angle acute, right, or obtuse?" (visual angle shown, Emergent)
- "Use a protractor to measure the angle: __ degrees" (Proficient)
- "An angle is 120°. A ray divides it into 70° and __ °. Find the missing angle." (Advanced)

**Play Mode:**
**"Angle Master"** game mechanic:
- Three rounds: Classification, Measurement, Decomposition.
- Round 1 (Emergent): Classify angles (multiple choice: acute/right/obtuse).
- Round 2 (Proficient): Measure angles with protractor (visual protractor provided; student aligns and reads).
- Round 3 (Advanced): Find missing angle in decomposed angle (enter answer).
- Each correct answer = +15 points.
- Incorrect = no points, correct answer shown, continue.
- Bonus: complete round with 100% accuracy = 1.5x multiplier on that round.

**Side Panel Content:**
- **Vocabulary**: Angle, Vertex, Ray, Acute, Right, Obtuse, Straight, Degree, Measure, Protractor, Decompose, Additive
- **Key Concepts**: "An angle is formed by two rays with a common endpoint. The vertex is the point where rays meet. Angles are measured in degrees."
- **Angle Classification**: "Acute: less than 90°. Right: exactly 90°. Obtuse: more than 90° but less than 180°. Straight: exactly 180°."
- **Measuring with Protractor**: "Place center of protractor on vertex. Align one ray with baseline (0°). Read where other ray aligns with degree scale."
- **Angle Additivity**: "When an angle is split by a ray, the two parts add up to the whole angle. 30° + 60° = 90°."

---

### 11. Lines & Angles
**File Path:** `tools/4/lines-angles.html`

**Standards:**
- **CCSS 4.G.A.1**: Draw points, lines, line segments, rays, and angles (right, acute, obtuse); identify these in two-dimensional figures
- **CCSS 4.G.A.2**: Classify two-dimensional figures based on the presence or absence of parallel lines or perpendicular lines, or the presence or absence of angles of a specified size

**Minnesota Crosswalk:** 4.5.2.1 (Identify and describe lines); 4.5.2.2 (Classify figures by line properties)

**TEKS Crosswalk:** 4.6.A (Identify points, lines, line segments, rays); 4.6.B (Identify parallel and perpendicular lines); 4.6.C (Identify and classify angles)

**Explore Mode:**
Interactive manipulative featuring:
- **Line Terminology Guide**: Visual examples of point, line (infinite in both directions), line segment (two endpoints), ray (one endpoint, extends infinitely). Interactive labels and highlighting.
- **Parallel & Perpendicular Visualizer**: Two parallel lines remain equidistant (move along shared direction). Two perpendicular lines meet at right angle (90°). Interactive diagrams with color-coding.
- **2D Figure Classifier**: Collection of polygons. Highlight properties: number of sides, presence of right angles, presence of parallel sides, presence of perpendicular sides. Drag into sorting categories.
- **Angle Type Identifier**: Polygons displayed. Identify all angles as acute, right, or obtuse. Mark on diagram.
- **Symmetry and Line Relationships**: Identify lines of symmetry, parallel sides, and perpendicular sides in various figures (rectangles, trapezoids, right triangles, etc.).

**Practice Mode:**
- **Emergent Tier**: Identify geometric terms (point, line, segment, ray) from visual. Recognize right angles in shapes. 6-8 problems with visual labels.
- **Proficient Tier**: Classify 2D figures by presence of parallel or perpendicular lines. Identify angle types within figures. Describe properties of shapes. 8-10 problems.
- **Advanced Tier**: Explain how shapes are related through line properties. Compare classification schemes. Identify hidden properties or make predictions about figures. 7-9 problems.

Question examples include:
- "Which shows a line segment?" (three visual options, Emergent)
- "Does this figure have parallel sides? Perpendicular sides?" (figure shown, Proficient)
- "A quadrilateral has two pairs of parallel sides and all right angles. What shape is it?" (Advanced)

**Play Mode:**
**"Figure Inspector"** game mechanic:
- Mystery figure game. Clues about properties given one at a time.
- "Has 4 sides. All sides equal. Has right angles."
- Player identifies shape from multiple-choice options.
- Each correct answer = +15 points.
- Incorrect = next clue revealed automatically (penalty: -5 points per hint needed).
- Leaderboard by fewest hints needed.
- Emergent: basic shapes (triangle, square, rectangle); Proficient: varied quadrilaterals and polygons; Advanced: complex classification, hidden properties.

**Side Panel Content:**
- **Vocabulary**: Point, Line, Line Segment, Ray, Endpoint, Parallel, Perpendicular, Vertex, Angle, Acute, Right, Obtuse, Classify, Property
- **Key Concepts**: "Lines and line segments have different properties. A line extends forever. A segment has two endpoints."
- **Parallel Lines**: "Parallel lines never meet. They stay the same distance apart. Indicated by arrow symbols."
- **Perpendicular Lines**: "Perpendicular lines meet at right angles (90°). Indicated by a small square at the corner."
- **Classification**: "Classify 2D figures by counting sides, identifying angle types, and checking for parallel or perpendicular sides."

---

### 12. Symmetry
**File Path:** `tools/4/symmetry.html`

**Standards:**
- **CCSS 4.G.A.3**: Recognize a line of symmetry for a two-dimensional figure as a line across the figure such that the figure can be folded along the line into matching parts; identify line-symmetric figures and draw lines of symmetry

**Minnesota Crosswalk:** 4.5.3.1 (Identify and draw lines of symmetry)

**TEKS Crosswalk:** 4.6.D (Identify and verify the attributes of shapes); 4.6.E (Analyze two-dimensional figures)

**Explore Mode:**
Interactive manipulative featuring:
- **Fold Simulator**: 2D figure displayed. Drag a line across it. Figure "folds" along that line. If the two halves match perfectly, line of symmetry is identified. Color-code matching parts.
- **Reflection Tool**: Original shape on one side of a potential line of symmetry. Reflected image on other side. Interactive toggle to verify match.
- **Line of Symmetry Drawer**: Start with symmetric figure. Student draws line of symmetry (anywhere). App provides feedback: correct (exact symmetry) or incorrect (not symmetric).
- **Multiple Symmetry Finder**: Figures with more than one line of symmetry (square has 4, rectangle has 2, equilateral triangle has 3). Interactive exploration and counting.
- **Asymmetric Introduction**: Show figures with no line of symmetry. Contrast with symmetric figures.

**Practice Mode:**
- **Emergent Tier**: Identify if figure is symmetric or not (yes/no). For symmetric figures, count lines of symmetry (multiple choice: 1, 2, or more). Scaffolding: symmetric figures clearly shown. 6-8 problems.
- **Proficient Tier**: Identify line(s) of symmetry on given figures. Count total lines. Complete symmetric figures given half (reflection required). 8-10 problems with visual support optional.
- **Advanced Tier**: Explain why a figure is or isn't symmetric. Design symmetric figures with specified number of lines of symmetry. Verify symmetry using reflection. 7-9 problems.

Question examples include:
- "Is this figure symmetric?" (visual, Emergent)
- "How many lines of symmetry does this figure have?" (visual of square or rectangle, Proficient)
- "Draw the line of symmetry for this figure." (interactive drawing, Proficient)
- "Design a figure with exactly 3 lines of symmetry." (Advanced)

**Play Mode:**
**"Symmetry Search"** game mechanic:
- 60-second game. Figures displayed with lines already drawn.
- Player marks whether each line IS or IS NOT a line of symmetry.
- Correct identification = +10 points.
- Incorrect = no points, correct answer shown.
- Bonus: 5+ consecutive correct = 1.5x multiplier.
- Speed bonus: answer within 2 seconds = +5 extra points.
- Emergent: obvious symmetry/non-symmetry; Proficient: varied figures, multiple lines; Advanced: complex figures, edge cases.

**Side Panel Content:**
- **Vocabulary**: Symmetry, Line of Symmetry, Symmetric, Reflection, Mirror Image, Fold, Match, Axis of Symmetry
- **Key Concepts**: "A line of symmetry divides a figure into two matching halves. You can fold along this line and the halves match perfectly."
- **Finding Lines**: "Try folding the figure mentally. Does one half match the other? If yes, that's a line of symmetry."
- **Multiple Symmetries**: "Some figures have more than one line of symmetry. A square has 4 (2 through opposite corners, 2 through opposite sides)."
- **Asymmetric Figures**: "Not all figures are symmetric. Many 2D figures have no lines of symmetry."

---

## Grade 4 Build Priority Order

Based on skill prerequisites and content sequencing:

1. **Place Value Millions** (foundational review, extends Grade 3)
2. **Multi-Digit Arithmetic** (builds on place value)
3. **Multiplicative Comparison** (extends Grade 3 multiplication)
4. **Factors & Multiples** (supports division and number sense)
5. **Number Patterns** (application of operations)
6. **Equivalent Fractions** (introduces key Grade 4 fraction concept)
7. **Fraction Operations** (building on equivalence)
8. **Decimals** (extends fractions to decimal notation)
9. **Measurement Conversion** (practical application of relationships)
10. **Angle Explorer** (introduces angle measurement)
11. **Lines & Angles** (geometry + angle relationships)
12. **Symmetry** (geometry deepening)

---

## Cross-Grade Scaffolding & Transition Notes

### Grade 3 → Grade 4 Bridges
- **Multiplication/Division → Multiplicative Comparison**: Grade 3 builds fluency; Grade 4 applies to comparison problems.
- **Addition/Subtraction within 1000 → Multi-Digit Arithmetic**: Extends to thousands and millions, incorporates all four operations.
- **Fractions (visual concepts) → Equivalent Fractions & Decimals**: Builds concrete understanding to more abstract notation.
- **Time & Measurement → Measurement Conversion**: Extends measurement domain with unit relationships.
- **Basic Shapes → Shape Properties & Symmetry**: Moves from classification to deep analysis of properties.

### Design Consistency Across Both Grades
- All apps maintain identical UI/UX patterns (mode tabs, difficulty tiers, side panel).
- Difficulty tier progression is consistent: Emergent (foundational) → Proficient (grade-level) → Advanced (extension).
- Visual manipulatives are emphasized in early tiers; fade as students progress.
- Scaffolding (hints, reference materials) is available but optional; decreases with tier advancement.
- Play Mode games vary thematically but maintain similar mechanics and scoring.

---

## Implementation Notes

**File Organization:**
- Grade 3 apps: `/tools/3/[app-name].html`
- Grade 4 apps: `/tools/4/[app-name].html`
- Each file is fully self-contained (no external dependencies except shared CSS/JS utility library).

**Accessibility & Performance:**
- WCAG 2.1 AA compliance (color contrast, keyboard nav, screen reader support).
- Responsive design (tablet/desktop primary, mobile secondary).
- Fast load time (< 2 seconds target) via minified assets.

**Assessment & Data:**
- Optional user progress tracking (student name, tier selection, completion rates).
- Teacher dashboard for class-level analytics (forthcoming in Phase 2).

---

**Document completed:** Comprehensive specifications for 24 VINCULUM Math apps (12 Grade 3, 12 Grade 4) with full Explore/Practice/Play mode details, difficulty tiers, standards alignment, and build priority sequencing.
