# VINCULUM — How to Think Like a Math Teacher

## Purpose
This document captures the pedagogical thinking, design patterns, and quality checklist that every VINCULUM app must follow. Use this as your reference when building or reviewing any tool, so you don't have to rediscover these lessons through trial and error.

---

## 1. Technical Terms Mean Something Specific

Math education has precise vocabulary. When a feature says "Missing Addend," it must actually show `a + ? = total` — not `a + b = ?`. Before building any feature, confirm you understand the math term.

**Key terms that trip people up:**

| Term | What it actually means | Common mistake |
|------|----------------------|----------------|
| Missing Addend | `4 + ? = 7` — the unknown is in the middle | Showing `4 + 3 = ?` (that's just addition) |
| Fact Family | The 4 related equations: `3+4=7, 4+3=7, 7-3=4, 7-4=3` | Only showing addition |
| Decompose | Breaking a number into parts: `7 = 5 + 2` | Just showing subtraction |
| Compose | Building a number from parts: `5 + 2 = 7` | Just showing addition |
| Subitize | Recognizing quantity without counting (like dots on dice) | Making kids count every time |
| Number Bond | A trio: whole and two parts, shown as a diagram | Just showing an equation |
| Place Value | The value of a digit based on position (tens, ones) | Just saying "the number 34" |
| Regrouping | Exchanging 10 ones for 1 ten (or vice versa) | Calling it "carrying" with no visual |
| Unknown Position | Where the ? goes: start, change, or result | Always putting ? at the end |

**Rule:** If the difficulty tier says "Missing Addend," every single display — equation, number line, hints, arrows — must reflect that format. The equation shows `a + ? = total`. The arrow labels show `+?` not `+4`. The hints don't reveal the answer.

---

## 2. The Three Modes Must Be Genuinely Different

Every VINCULUM app has Explore, Practice, and Play. These aren't just labels — they serve different pedagogical purposes:

### Explore Mode (Cyan)
- **Purpose:** Discovery and sense-making. The student manipulates, the math reveals itself.
- **No right/wrong answers.** The student experiments freely.
- **Interactivity:** Drag, click, type inputs, toggle options. The student controls everything.
- **Visuals:** Show the math happening (arrows drawing, counters moving, shapes splitting).
- **Side panel:** Vocabulary definitions, strategy explanations, step-by-step guides.
- **Think of it as:** A sandbox with guardrails.

### Practice Mode (Green)
- **Purpose:** Scaffolded problem-solving with feedback.
- **Difficulty tiers matter here.** Emergent = small numbers with scaffolds. Proficient = larger range. Advanced = harder concepts (missing addend, multi-step).
- **Progressive reveal:** Don't show the answer area until the student has interacted with the manipulative first. (Example: on number line, they must click the ticks before the answer input appears.)
- **Hints don't reveal answers.** "Count 5 forward from 3" is a hint. "The answer is 8" is not.
- **Side panel:** Step-by-step scaffold that highlights the current step.

### Play Mode (Pink)
- **Purpose:** Fluency-building under light time pressure.
- **Fast rounds.** Multiple-choice or quick input. No manipulative interaction required.
- **Score + streak system.** Points increase with streak bonus.
- **No teaching.** This is assessment and speed. The learning happened in Explore and Practice.
- **Side panel:** Score, streak, best streak.

---

## 3. Difficulty Tiers Are Pedagogical, Not Just Numerical

The three difficulty levels aren't just "easy, medium, hard" number ranges. They represent different mathematical thinking:

| Tier | Name | What changes |
|------|------|-------------|
| Tier 1 | Emergent | Small numbers, heavy scaffolding, visual supports, concrete representations |
| Tier 2 | Proficient | Larger range, less scaffolding, student does more mental work |
| Tier 3 | Advanced | Conceptual shift — missing addend, multi-step, decomposition, abstract thinking |

**The Advanced tier often changes the TYPE of problem, not just the size.** For example:
- Addition Number Line: Emergent/Proficient = `a + b = ?`. Advanced = `a + ? = total` (missing addend).
- Word Problems: Emergent = result unknown. Advanced = start unknown or change unknown.
- Counter Builder: Emergent = count all. Advanced = missing addend with counters.

---

## 4. Visuals Must Match the Math

Every visual element must be mathematically accurate:

### Number Lines
- Arrows show jumps. The FIRST arrow goes from 0 to the first number. The SECOND arrow shows the operation.
- Arrow labels must match the problem type. In missing addend mode, the second arrow label shows `+?` not `+5`.
- Clicking hints must not reveal the answer. "Click on 8" when 8 is the answer = bad. "Count forward from 3" = good.
- K-2 number lines should NEVER produce negative results. Clamp inputs and validate.

### Counters/Manipulatives
- Counters must look polished — gradient fills with glow/shadow, not flat circles.
- Group A = cyan, Group B = pink. Always.
- Subtraction = crossing out (visual X through counter), not removal.
- Ten-frames must actually render and show the organization visually.
- Counting animations should number each counter sequentially with a flash effect.

### Equations
- The unknown position (`?`) gets a dashed border.
- Known values get solid styling.
- When the answer is revealed, the `?` transforms to the number with a celebration effect.
- Color coding: first number = cyan, operation number = pink, result = green.

---

## 5. The VINCULUM Design System

Every app must look like it belongs to the same family:

### Colors (CSS Variables)
```
--bg: #0a0e1a        (darkest background)
--bg2: #111827       (slightly lighter)
--card: #1a2236      (card background)
--card2: #1f2a42     (card hover/active)
--border: #2a3654    (borders)
--text: #e8edf5      (primary text)
--text2: #8b9cc0     (secondary text)
--muted: #5a6b8f     (muted/disabled)
--cyan: #00d4ff      (primary accent, Explore, first number)
--pink: #ff3b8b      (secondary accent, Play, operation)
--yellow: #ffc107    (highlights, streaks)
--green: #00e676     (success, Practice, results)
--purple: #b388ff    (special, bonus)
--orange: #ff9100    (warnings, MN standards)
--grad: linear-gradient(135deg, #00d4ff, #b388ff)  (title gradient)
```

### Fonts
- **Inter** — all UI text
- **JetBrains Mono** — numbers, equations, code-like elements, standard badges

### Visual Patterns
- Cards have `background: var(--card)`, `border: 1px solid var(--border)`, `border-radius: 8-12px`
- Active/selected states use the mode color at 10% opacity with colored border
- Mode tabs: Explore = cyan, Practice = green, Play = pink
- Title uses `background: var(--grad)` with `-webkit-background-clip: text`
- Standard badges: small pills with `JetBrains Mono`, colored by standard type
- Counters/dots: radial gradients with box-shadow glow, never flat fills
- SVG elements: use `fill` attributes (not CSS `background` — CSS background doesn't work on SVG)

### Layout
- Full viewport height, no scrolling on main view
- Header with back button + title + standard badges
- Mode tabs bar below header
- Main area: workspace (flex:1) + side panel (280px, right side)
- Side panel has vocabulary, strategies, and tips sections

---

## 6. The Side Panel Is a Teaching Tool

The right-side panel isn't decoration. It serves three purposes:

### Vocabulary Section
- List key math terms with short definitions
- Terms in cyan, definitions in text2
- This teaches academic math language

### Strategies Section
- Show the specific strategies for this concept
- Example: "Count All: Count every counter from 1. Count On: Say the first number, then count the second group."
- Bold the strategy name, explain in plain language

### Tips Section
- Practical advice for the student
- "Use the ten-frame to organize counters"
- "Look for patterns like doubles: 3+3, 4+4"
- Keep it age-appropriate

### In Practice Mode
- The side panel becomes a step-by-step scaffold
- Highlight the current step, dim completed/future steps
- This guides the student through the problem-solving process

---

## 7. The Hub Connection

Every app connects to the VINCULUM Hub:

1. **Back button** — Fixed position top-left, styled: `background:#1a2236`, `border:1px solid #2a3654`, `color:#00d4ff`, links to `../../VINCULUM-Hub.html`
2. **Hub TOOLS array** — Every new app gets added with: id, name, desc, grade, domain, standards array, status ('built')
3. **File path convention** — `tools/{grade}/{tool-id}.html` (e.g., `tools/1/counter-builder.html`)
4. **Same-window launch** — Hub navigates directly, no new tabs

---

## 8. Quality Checklist Before Shipping

Run through this for every app:

### Functionality
- [ ] All three modes (Explore/Practice/Play) work
- [ ] All three difficulty tiers work AND change behavior appropriately
- [ ] Advanced tier changes problem TYPE, not just number range
- [ ] Missing addend (if applicable) shows `a + ? = total` format everywhere
- [ ] No negative results possible in K-2 apps
- [ ] Hints don't reveal answers
- [ ] Arrow labels match the problem type (missing mode shows `+?`)
- [ ] Ten-frame renders and fills correctly (if applicable)
- [ ] Counting animations work (if applicable)
- [ ] Answer checking gives correct/incorrect feedback
- [ ] Score/streak system works in Play mode

### Visual Design
- [ ] Uses VINCULUM color variables consistently
- [ ] Inter font for UI, JetBrains Mono for numbers
- [ ] Gradient title
- [ ] Standard badges present
- [ ] Counters/dots use radial gradients with glow (not flat fills)
- [ ] SVG elements use `fill` not CSS `background`
- [ ] Cards have proper border, radius, and background
- [ ] Mode tabs show correct active state (cyan/green/pink)
- [ ] Side panel has Vocabulary, Strategies, and Tips

### Pedagogy
- [ ] Explore mode is genuinely exploratory (no right/wrong)
- [ ] Practice mode scaffolds appropriately
- [ ] Play mode is fast and fluency-focused
- [ ] Vocabulary is grade-appropriate and mathematically accurate
- [ ] Strategies reflect actual teaching methods (Count All, Count On, Make a 10, etc.)
- [ ] Unknown positions vary (not always result-unknown)

### Integration
- [ ] Back button present and links to Hub
- [ ] Added to Hub TOOLS array with status: 'built'
- [ ] File is in correct `tools/{grade}/` folder
- [ ] Self-contained single HTML file (no external dependencies except Google Fonts)

---

## 9. Common Gotchas We've Already Hit

These are real bugs we've found and fixed — don't repeat them:

1. **SVG circles can't use CSS `background`** — Use SVG `fill` attribute or switch to HTML `<div>` elements
2. **Missing addend showing regular addition** — The Explore mode must check `S.diff === 'advanced'` and render completely differently
3. **Hints revealing answers** — "Count 5 forward" tells the student the answer is start+5. Say "Count forward from [start]" instead
4. **Arrow labels showing the answer** — In missing addend mode, labels must show `+?` not `+5`
5. **All word problems being result-unknown** — Proficient and Advanced tiers need start-unknown and change-unknown problems
6. **Subtraction producing negatives** — Clamp input B to never exceed A, validate before rendering
7. **Ten-frames not rendering** — Make sure the container exists in HTML AND the render function creates the grid
8. **Side panel empty** — Must assign to `sp.innerHTML`, not just build a string variable
9. **State variables missing** — If you reference `S.eTotal` in render, it must exist in the initial state object
10. **Functions referenced but never defined** — If `onclick="checkExploreAddend()"` exists, that function must be written

---

## 10. Building New Apps — The Process

When creating a new VINCULUM app:

1. **Identify the standard** — What CCSS/MN/TEKS standards does this cover?
2. **Define the three modes** — What does Explore look like? What does Practice scaffold? What does Play test?
3. **Define the three tiers** — Emergent = concrete. Proficient = semi-abstract. Advanced = conceptual shift.
4. **Build the state machine** — `const S = { mode, diff, ... }` with a central `render()` function
5. **Build Explore first** — This is the core manipulative. If Explore works, Practice and Play are variations.
6. **Add the side panel** — Vocabulary, strategies, tips. This is where learning happens.
7. **Wire up the Hub** — Back button + TOOLS array entry
8. **Run the checklist** — Section 8 above, every time.
9. **Test as a student** — Click through each mode and tier. Does the math make sense? Do the visuals teach?

---

---

## 11. Jon's Request Log — What the Teacher Actually Asks For

This is a running record of every design request, bug report, and feature ask. It shows what a math teacher focuses on when reviewing apps — use this to anticipate needs for future builds.

### Session 1 Requests (Chronological)

| # | Request | Category | What It Taught Us |
|---|---------|----------|-------------------|
| 1 | "the missing addend doesn't work in any of these apps" | **Bug: Math accuracy** | The term "missing addend" is precise — `a + ? = total`. Every display must reflect this. |
| 2 | "a missing addend is a technical term for 4 + what = 7" | **Clarification: Vocabulary** | Teachers use exact math vocabulary. Don't guess — ask or look it up. |
| 3 | [Screenshot] "that is not a missing addend" (showing 3+4=?) | **Bug: Mode doesn't match label** | If difficulty says "Missing Addend," Explore mode must change its entire format, not just the number range. |
| 4 | "the dots are not vinculum style" | **Bug: Visual consistency** | SVG circles need `fill` attributes, not CSS `background`. All counters must have gradient + glow. |
| 5 | "the counter builder lost some vinculum design" | **Bug: Design drift** | New apps must match the established design system exactly. Check the color vars, fonts, card styles. |
| 6 | "I like the vocabulary and the tips" | **Positive: Side panel works** | The vocabulary/strategies/tips pattern in the side panel is valued. Keep doing it. |
| 7 | "ten-frames are invisible or broke" | **Bug: Missing feature** | Features referenced in buttons must actually work. The ten-frame container existed but never rendered. |
| 8 | "buttons and functions are not complete" | **Bug: Incomplete implementation** | Every button in the UI must do something. Wire up all handlers before shipping. |
| 9 | "I want you to internalize how I describe app changes" | **Process: Learn from feedback** | Track the teacher's language and priorities — they reveal what students need. |
| 10 | "all apps are connected to the master hub" | **Architecture: Hub is central** | Every app must link back to Hub, and Hub must know about every app. |
| 11 | "as you learn the features I focus on and the interactivity with the student this will get better" | **Philosophy: Student-centered** | The teacher is designing for student interaction — not just displaying info. Every click should teach. |
| 12 | "log my requests so you and I can see them" | **Process: Living documentation** | Keep this log updated. It shows patterns in what matters. |

### Patterns Emerging

**What Jon focuses on most (in order):**
1. **Mathematical accuracy** — The math must be correct and precisely labeled
2. **Visual polish** — Every element must look professional and match VINCULUM design
3. **Complete functionality** — No dead buttons, no invisible features, no partial implementations
4. **Student interactivity** — Apps should make students DO things, not just watch
5. **Vocabulary and teaching support** — Side panels with terms, strategies, and tips
6. **Hub integration** — Everything connects through the central Hub

**What this tells us about building future apps:**
- Start by confirming the math vocabulary is correct
- Build the visuals to VINCULUM spec from day one (don't "get it working first" with ugly defaults)
- Test every button and every mode before showing
- Make the student click, drag, and discover — passive display isn't enough
- Always include vocabulary, always include strategies
- Add to Hub immediately

---

*This document is a living reference. Update it as new patterns emerge.*
