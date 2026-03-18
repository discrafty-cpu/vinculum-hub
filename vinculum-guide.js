/**
 * VINCULUM Hub Guide Module
 * Auto-injects instructional panel into any VINCULUM tool
 *
 * Usage: Add a single script tag to any tool
 *   <script src="vinculum-guide.js"></script>
 *
 * The module auto-detects the tool, loads instruction data, and creates
 * a floating TEACHER GUIDE panel with CRA level, teaching notes, misconceptions, and developmental stage.
 */

(function() {
  'use strict';

  // ============================================================================
  // GUIDE DATA STORE
  // ============================================================================

  const GUIDE_DATA = {
    'pattern-machine': {
      instructions: {
        explore: '1. Watch the full pattern displayed with <strong>colorful shapes</strong><br><br>2. The <strong>repeating unit</strong> is highlighted with a bracket below<br><br>3. Click "Next Pattern" to see different pattern types<br><br>4. Notice how the unit <strong>repeats</strong> to make the full pattern',
        practice: '1. Look at the pattern — some shapes are <strong>missing</strong> (shown as ?)<br><br>2. Identify the <strong>repeating unit</strong> shown by the bracket<br><br>3. Tap the correct shape from the choices below<br><br>4. Wrong answers show <strong>hints</strong> about the repeating pattern',
        play: '1. The last shape is always <strong>hidden</strong><br><br>2. Figure out <strong>what comes next</strong> as fast as you can<br><br>3. Build <strong>streaks</strong> for bonus point multipliers!'
      },
      standards: [
        { code: 'K.OA.3', text: 'Decompose numbers and recognize patterns' },
        { code: 'K.G.6', text: 'Compose simple shapes to form larger shapes' },
        { code: '4.OA.5', text: 'Generate and analyze patterns' }
      ],
      keyConcept: 'A <strong>pattern</strong> is something that repeats in a predictable way. The <strong>repeating unit</strong> (or core) is the smallest group that repeats. Once you find it, you can predict what comes next!'
    },

    'counting-objects': {
      instructions: {
        explore: '1. Click on objects to <strong>count</strong> them<br><br>2. Watch the number increment<br><br>3. Reset and try different sets',
        practice: '1. See a <strong>group of objects</strong><br><br>2. Count carefully and enter the number<br><br>3. Check your answer',
        play: '1. Count objects <strong>quickly</strong><br><br>2. Beat the timer<br><br>3. Advance through difficulty levels!'
      },
      standards: [
        { code: 'K.CC.1', text: 'Count forward from a given number' },
        { code: 'K.CC.3', text: 'Write numbers from 0 to 20' },
        { code: 'K.CC.5', text: 'Count to answer "how many"' }
      ],
      keyConcept: '<strong>Counting</strong> means touching each object once and saying one number for each object. The last number you say tells <strong>how many</strong> there are.'
    },

    'number-bonds': {
      instructions: {
        explore: '1. Drag numbers to the top circle (the <strong>whole</strong>)<br><br>2. Drag parts to the bottom circles<br><br>3. Watch how they show parts that <strong>make the whole</strong>',
        practice: '1. See a number bond with <strong>one missing part</strong><br><br>2. Figure out what makes the whole<br><br>3. Type the missing number',
        play: '1. Complete number bonds <strong>against the timer</strong><br><br>2. Build accuracy streaks<br><br>3. Try all difficulty levels!'
      },
      standards: [
        { code: 'K.OA.1', text: 'Represent addition and subtraction with objects' },
        { code: '1.OA.3', text: 'Apply properties of operations' },
        { code: '1.OA.4', text: 'Understand subtraction as an unknown-addend problem' }
      ],
      keyConcept: 'A <strong>number bond</strong> shows that a whole number can be broken into parts. The top number equals the sum of the bottom numbers.'
    },

    'add-subtract': {
      instructions: {
        explore: '1. Use the number line or manipulatives<br><br>2. Move forward to <strong>add</strong>, backward to <strong>subtract</strong><br><br>3. Watch the total change',
        practice: '1. Solve addition and subtraction problems<br><br>2. Use <strong>number bonds</strong> or the <strong>number line</strong><br><br>3. Check your work',
        play: '1. Race against the clock<br><br>2. Solve within 20 fluently<br><br>3. Build your high score!'
      },
      standards: [
        { code: '1.OA.1', text: 'Add and subtract within 20' },
        { code: '1.OA.6', text: 'Fluently add and subtract within 10' },
        { code: '2.OA.2', text: 'Fluently add and subtract within 20' }
      ],
      keyConcept: 'Addition is combining groups; subtraction is taking apart. Both can be shown on a <strong>number line</strong> — hop forward to add, backward to subtract.'
    },

    'place-value-chart': {
      instructions: {
        explore: '1. Drag base-ten blocks to the chart<br><br>2. <strong>Ones</strong> go in the ones place, <strong>tens</strong> in the tens place<br><br>3. Watch how 10 ones regroup into 1 ten',
        practice: '1. Build numbers using blocks<br><br>2. Read the number from the chart<br><br>3. Regroup when needed',
        play: '1. Build numbers <strong>quickly</strong><br><br>2. Use efficient regrouping<br><br>3. Complete all challenge levels!'
      },
      standards: [
        { code: '2.NBT.1', text: 'Understand place value (tens and ones)' },
        { code: '2.NBT.3', text: 'Read and write numbers to 1000' },
        { code: '3.NBT.1', text: 'Use place value to round' }
      ],
      keyConcept: 'Each place is worth 10 times the place to its right. A <strong>tens rod</strong> is the same as 10 <strong>ones cubes</strong>; a <strong>hundreds flat</strong> is 10 <strong>tens rods</strong>.'
    },

    'multiply-models': {
      instructions: {
        explore: '1. Set the number of <strong>rows</strong> and <strong>columns</strong><br><br>2. Watch an array form<br><br>3. Count the total: rows × columns',
        practice: '1. See a <strong>multiplication fact</strong><br><br>2. Use the array to figure out the product<br><br>3. Enter your answer',
        play: '1. Solve multiplication facts <strong>quickly</strong><br><br>2. Master the times tables<br><br>3. Unlock bonus levels!'
      },
      standards: [
        { code: '2.OA.4', text: 'Use arrays to represent multiplication' },
        { code: '3.OA.3', text: 'Use multiplication within 100' },
        { code: '3.OA.5', text: 'Relate multiplication to addition' }
      ],
      keyConcept: 'An <strong>array</strong> organizes objects in equal rows and columns. Rows × columns = total. This shows why multiplication is <strong>repeated addition</strong>.'
    },

    'fraction-visual': {
      instructions: {
        explore: '1. Adjust the <strong>denominator</strong> (number of parts)<br><br>2. Shade parts to show the <strong>numerator</strong><br><br>3. See equivalent fractions<br><br>4. Compare fractions visually',
        practice: '1. See a <strong>fraction picture</strong><br><br>2. Write the fraction or shade correctly<br><br>3. Check against the visual',
        play: '1. Identify and compare fractions <strong>quickly</strong><br><br>2. Recognize equivalent forms<br><br>3. Beat your score!'
      },
      standards: [
        { code: '3.NF.1', text: 'Understand fractions as equal parts' },
        { code: '3.NF.2', text: 'Represent fractions on a number line' },
        { code: '4.NF.1', text: 'Explain fraction equivalence' }
      ],
      keyConcept: 'A <strong>fraction</strong> names a part of a whole. The bottom number (denominator) tells how many equal parts; the top (numerator) tells how many parts we use.'
    },

    'decimal-place-value': {
      instructions: {
        explore: '1. Tap <strong>▲ ▼ arrows</strong> or scroll to change any digit<br><br>2. Watch ALL visuals update live — blocks, number line, readout, decomposition<br><br>3. <strong>Trailing zeros</strong> grey out when they don\'t change the value<br><br>4. Check the <strong>Extension</strong> section for powers of 10 notation',
        practice: '1. Read the question about <strong>place value</strong><br><br>2. Type your answer in the field<br><br>3. Use expanded form, word form, or standard form as needed',
        play: '1. Compare two decimals — which is <strong>larger</strong>?<br><br>2. Use place value understanding to decide<br><br>3. Score 5 in a row to win!'
      },
      standards: [
        { code: '5.NBT.3', text: 'Read, write, and compare decimals to thousandths' },
        { code: '5.NBT.4', text: 'Use place value to round decimals' },
        { code: '5.NBT.1', text: 'Recognize that a digit is 10x what it represents in the place to its right' }
      ],
      keyConcept: 'Each place value is <strong>10 times</strong> the place to its right and <strong>1/10</strong> of the place to its left. The decimal point separates <strong>whole numbers</strong> from <strong>parts less than one</strong>. Trailing zeros (like 5.70 vs 5.7) don\'t change the value.'
    },

    'decimal-operations': {
      instructions: {
        explore: '1. Use a <strong>decimal grid</strong> (100 squares)<br><br>2. Shade to show decimals<br><br>3. Connect decimals to fractions',
        practice: '1. Add or subtract decimals<br><br>2. Align the <strong>decimal points</strong><br><br>3. Use the grid to verify',
        play: '1. Solve decimal problems <strong>against the timer</strong><br><br>2. Mix addition and subtraction<br><br>3. Advance through levels!'
      },
      standards: [
        { code: '4.NF.6', text: 'Use decimal notation for fractions' },
        { code: '5.NBT.7', text: 'Add, subtract, multiply, and divide decimals' },
        { code: '5.NBT.2', text: 'Explain decimal patterns' }
      ],
      keyConcept: 'A <strong>decimal</strong> is another way to write a fraction using <strong>place value</strong>. One-tenth is 0.1, one-hundredth is 0.01.'
    },

    'ratio-table': {
      instructions: {
        explore: '1. Enter two numbers to set a <strong>base ratio</strong><br><br>2. The table generates <strong>equivalent ratios</strong> by multiplying<br><br>3. Look for the <strong>pattern</strong> — what stays the same?',
        practice: '1. Read the <strong>given ratio</strong> in the table<br><br>2. Find the <strong>missing value</strong> that keeps the ratio equivalent<br><br>3. Type your answer and click <strong>Submit</strong>',
        play: '1. Solve ratio problems <strong>quickly</strong><br><br>2. Complete all problems before time runs out<br><br>3. Try all difficulty levels!'
      },
      standards: [
        { code: '6.RP.1', text: 'Understand the concept of a ratio' },
        { code: '6.RP.2', text: 'Understand unit rates' },
        { code: '6.RP.3', text: 'Use ratio reasoning to solve problems' }
      ],
      keyConcept: 'A <strong>ratio table</strong> organizes equivalent ratios. Each row multiplies both values by the same factor, keeping the relationship <strong>proportional</strong>.'
    },

    'coordinate-plane': {
      instructions: {
        explore: '1. Locate points using <strong>(x, y) coordinates</strong><br><br>2. x tells you <strong>right/left</strong>, y tells you <strong>up/down</strong><br><br>3. Plot ordered pairs and trace patterns',
        practice: '1. Read coordinates and plot the point<br><br>2. Or read a point and write its coordinates<br><br>3. Check your work on the grid',
        play: '1. Plot points <strong>against the clock</strong><br><br>2. Create pictures by plotting sequences<br><br>3. Beat difficulty levels!'
      },
      standards: [
        { code: '5.G.1', text: 'Graph points on a coordinate plane' },
        { code: '6.G.3', text: 'Draw polygons on the coordinate plane' },
        { code: '7.G.1', text: 'Solve problems involving scale drawings' }
      ],
      keyConcept: 'The <strong>coordinate plane</strong> uses two perpendicular number lines (axes). Every point has an address: (x, y). Start at the origin, go right or left, then up or down.'
    },

    'expressions-equations': {
      instructions: {
        explore: '1. Use variables to represent <strong>unknown numbers</strong><br><br>2. Build expressions with <strong>operations</strong><br><br>3. See how changes to variables affect the result',
        practice: '1. Evaluate expressions for given values<br><br>2. Build expressions from <strong>word problems</strong><br><br>3. Check your work',
        play: '1. Solve expression problems <strong>quickly</strong><br><br>2. Build expressions from scenarios<br><br>3. Unlock all levels!'
      },
      standards: [
        { code: '6.EE.1', text: 'Write and evaluate expressions' },
        { code: '6.EE.2', text: 'Write expressions from word problems' },
        { code: '6.EE.3', text: 'Apply properties to generate equivalent expressions' }
      ],
      keyConcept: 'An <strong>expression</strong> combines numbers, variables, and operations. An <strong>equation</strong> says two expressions are equal. Use variables like <strong>x</strong> to represent unknowns.'
    },

    'proportional-relationships': {
      instructions: {
        explore: '1. Plot points on a graph showing a <strong>proportional relationship</strong><br><br>2. Notice the straight line through the origin<br><br>3. Find the <strong>constant ratio (slope)</strong>',
        practice: '1. Identify if a relationship is <strong>proportional</strong><br><br>2. Find the <strong>rate of change</strong><br><br>3. Use it to solve problems',
        play: '1. Determine proportional relationships <strong>quickly</strong><br><br>2. Solve real-world scenarios<br><br>3. Complete all challenges!'
      },
      standards: [
        { code: '7.RP.1', text: 'Compute unit rates' },
        { code: '7.RP.2', text: 'Recognize proportional relationships' },
        { code: '7.RP.3', text: 'Use proportions to solve problems' }
      ],
      keyConcept: 'A <strong>proportional relationship</strong> means the ratio between two quantities stays constant. When graphed, it\'s a straight line through the origin with slope = rate.'
    },

    'pythagorean-theorem': {
      instructions: {
        explore: '1. Adjust a <strong>right triangle\'s</strong> sides<br><br>2. Watch how a² + b² = c²<br><br>3. See the areas of squares on each side',
        practice: '1. Given two sides, find the third using the <strong>Pythagorean theorem</strong><br><br>2. Check if a triangle is a <strong>right triangle</strong><br><br>3. Solve problems step by step',
        play: '1. Find missing sides <strong>against the timer</strong><br><br>2. Identify right triangles<br><br>3. Solve real-world scenarios!'
      },
      standards: [
        { code: '8.G.6', text: 'Explain the Pythagorean theorem' },
        { code: '8.G.7', text: 'Apply the Pythagorean theorem to solve problems' },
        { code: 'G-SRT.4', text: 'Prove and use the Pythagorean theorem' }
      ],
      keyConcept: 'In a <strong>right triangle</strong>, the square of the hypotenuse equals the sum of squares of the other two sides: <strong>a² + b² = c²</strong>.'
    },

    'linear-functions': {
      instructions: {
        explore: '1. Adjust <strong>slope</strong> and <strong>y-intercept</strong><br><br>2. See the line change in real time<br><br>3. Understand how each parameter affects the graph',
        practice: '1. Write the equation from a graph<br><br>2. Graph a line from an equation<br><br>3. Find intercepts and slope',
        play: '1. Match equations to lines <strong>quickly</strong><br><br>2. Build lines from descriptions<br><br>3. Solve real-world function problems!'
      },
      standards: [
        { code: '8.F.3', text: 'Understand linear functions' },
        { code: '8.EE.5', text: 'Understand slope' },
        { code: 'F-LE.1', text: 'Recognize linear functions' }
      ],
      keyConcept: 'A <strong>linear function</strong> has the form y = mx + b. The slope <strong>m</strong> is the rate of change; the y-intercept <strong>b</strong> is where it crosses the y-axis.'
    },

    'addition-quest': {
      instructions: {
        explore: '1. Use sliders to set <strong>two addends</strong><br><br>2. Watch the character <strong>hop along</strong> the number line<br><br>3. The landing spot shows the <strong>sum</strong>',
        practice: '1. Read the addition problem<br><br>2. Figure out where the character <strong>lands</strong><br><br>3. If wrong, watch the <strong>hop-by-hop scaffolding</strong>',
        play: '1. Solve addition problems in <strong>60 seconds</strong><br><br>2. Build streaks for <strong>bonus multipliers</strong><br><br>3. Beat your high score!'
      },
      standards: [
        { code: '1.OA.1', text: 'Add and subtract within 20' },
        { code: '1.OA.6', text: 'Add and subtract within 20 fluently' },
        { code: '2.OA.2', text: 'Fluently add and subtract within 20' }
      ],
      keyConcept: 'Addition means <strong>moving forward</strong> on a number line. Starting at the first addend, each hop of 1 brings you closer to the <strong>sum</strong>.'
    },

    'division-dash': {
      instructions: {
        explore: '1. Use sliders to set <strong>total objects</strong> and <strong>group size</strong><br><br>2. Watch objects partition into <strong>equal groups</strong><br><br>3. Remainder objects get a <strong>dashed border</strong>',
        practice: '1. Read the division problem<br><br>2. Count the groups in the array<br><br>3. If wrong, watch <strong>groups form one at a time</strong>',
        play: '1. Solve division problems in <strong>60 seconds</strong><br><br>2. Build streaks for <strong>multipliers</strong><br><br>3. Try all difficulty levels!'
      },
      standards: [
        { code: '3.OA.2', text: 'Interpret quotients of whole numbers' },
        { code: '3.OA.3', text: 'Use multiplication and division within 100' },
        { code: '3.OA.7', text: 'Fluently multiply and divide within 100' }
      ],
      keyConcept: 'Division means making <strong>equal groups</strong>. The dividend is the total, the divisor is the group size, and the quotient tells <strong>how many groups</strong> fit.'
    },

    'pi-explorer': {
      instructions: {
        explore: '1. Adjust the <strong>polygon sides</strong> slider<br><br>2. Watch inscribed and circumscribed polygons <strong>converge on π</strong><br><br>3. Switch visualization modes to see <strong>different proofs</strong><br><br>4. Capture snapshots for your evidence log',
        practice: '1. Work through <strong>step cards</strong> about π<br><br>2. Choose your difficulty level<br><br>3. Use the visualizations to <strong>check your thinking</strong>',
        play: '1. Answer π questions in <strong>60 seconds</strong><br><br>2. Use what you learned in Explore<br><br>3. Beat your high score!'
      },
      standards: [
        { code: '7.G.4', text: 'Know formulas for area and circumference of a circle' },
        { code: '7.G.6', text: 'Solve problems involving area and circumference' }
      ],
      keyConcept: 'π is the ratio of a circle\'s <strong>circumference to its diameter</strong>. Archimedes proved this by trapping π between inscribed and circumscribed polygon perimeters.'
    },

    'solving-linear': {
      instructions: {
        explore: '1. Watch the <strong>balance beam</strong> model the equation<br><br>2. Each step keeps both sides <strong>equal</strong><br><br>3. The goal is to get <strong>x alone</strong> on one side',
        practice: '1. Solve the equation <strong>step by step</strong><br><br>2. Use inverse operations to isolate x<br><br>3. Check your answer by <strong>substituting back</strong>',
        play: '1. Solve equations <strong>against the clock</strong><br><br>2. Build accuracy streaks<br><br>3. Advance through difficulty levels!'
      },
      standards: [
        { code: 'A-REI.1', text: 'Explain each step in solving an equation' },
        { code: 'A-REI.3', text: 'Solve linear equations in one variable' }
      ],
      keyConcept: 'Solving an equation means finding the value that makes both sides <strong>equal</strong>. Each step must do the <strong>same thing</strong> to both sides.'
    },

    'graphing-linear': {
      instructions: {
        explore: '1. Set <strong>slope</strong> and <strong>y-intercept</strong> values<br><br>2. Watch the line update on the grid<br><br>3. Trace the line to understand patterns',
        practice: '1. Graph equations in <strong>slope-intercept form</strong><br><br>2. Find the slope and intercepts from graphs<br><br>3. Write equations from points',
        play: '1. Match lines to equations <strong>quickly</strong><br><br>2. Build lines from descriptions<br><br>3. Unlock all challenge levels!'
      },
      standards: [
        { code: 'A-SSE.1', text: 'Interpret expressions using structure' },
        { code: 'F-IF.7a', text: 'Graph linear functions' },
        { code: 'A-CED.2', text: 'Create equations in two variables' }
      ],
      keyConcept: 'Linear equations in the form y = mx + b can be graphed using the y-intercept (b) as the starting point, then moving by the slope (m).'
    },

    'quadratic-functions': {
      instructions: {
        explore: '1. Adjust coefficients to change the <strong>parabola</strong><br><br>2. See how a, b, and c affect the shape<br><br>3. Find the vertex and axis of symmetry',
        practice: '1. Graph quadratic equations<br><br>2. Identify key features (vertex, intercepts)<br><br>3. Match graphs to equations',
        play: '1. Solve quadratic problems <strong>against the timer</strong><br><br>2. Identify function features quickly<br><br>3. Solve real-world scenarios!'
      },
      standards: [
        { code: 'F-IF.8a', text: 'Understand properties of quadratic functions' },
        { code: 'A-SSE.3', text: 'Choose and produce an equivalent form of expressions' },
        { code: 'F-IF.9', text: 'Compare function families' }
      ],
      keyConcept: 'A <strong>quadratic function</strong> has the form y = ax² + bx + c. Its graph is a <strong>parabola</strong> with a <strong>vertex</strong> (turning point) and axis of symmetry.'
    }
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Auto-detect tool ID from multiple sources
   */
  function detectToolId() {
    // Try body data-tool-id first
    const bodyToolId = document.body.getAttribute('data-tool-id');
    if (bodyToolId) return bodyToolId;

    // Try to parse from page title
    const title = document.title.toLowerCase();
    const titleMatch = title.match(/(\w+[-\w]*)/);
    if (titleMatch) {
      const toolId = titleMatch[1]
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      if (GUIDE_DATA[toolId]) return toolId;
    }

    // Try URL path
    const path = window.location.pathname.toLowerCase();
    const pathMatch = path.match(/\/([a-z0-9-]+)\.html?/);
    if (pathMatch) {
      const toolId = pathMatch[1];
      if (GUIDE_DATA[toolId]) return toolId;
    }

    return null;
  }

  /**
   * Generate fallback instruction for unknown tools
   */
  function generateFallbackInstructions(toolId) {
    const titleCase = toolId
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      instructions: {
        explore: `1. <strong>Experiment</strong> with this tool's features<br><br>2. Try different inputs and settings<br><br>3. Observe patterns and relationships`,
        practice: '1. Work through <strong>guided problems</strong><br><br>2. Check your answers carefully<br><br>3. Review solutions when stuck',
        play: '1. Solve problems <strong>against the clock</strong><br><br>2. Build your accuracy and speed<br><br>3. Compete and have fun!'
      },
      standards: [
        { code: 'MATH', text: 'Build mathematical thinking and problem-solving skills' }
      ],
      keyConcept: `<strong>${titleCase}</strong> helps you explore and master important math concepts through interactive visualization and practice.`
    };
  }

  /**
   * Get guide data for a tool (with fallback)
   */
  function getGuideData(toolId) {
    if (!toolId) return null;
    return GUIDE_DATA[toolId] || generateFallbackInstructions(toolId);
  }

  /**
   * Detect current mode from UI elements
   */
  function detectCurrentMode() {
    // Look for active mode tab
    const activeModeTab = document.querySelector(
      '.mode-tab.active, .vinculum-mode-tab.active, [data-mode-active="true"]'
    );

    if (activeModeTab) {
      const modeText = activeModeTab.textContent.toLowerCase().trim();
      if (modeText.includes('explore')) return 'explore';
      if (modeText.includes('practice')) return 'practice';
      if (modeText.includes('play')) return 'play';
    }

    // Default to explore
    return 'explore';
  }

  /**
   * Build standards HTML
   */
  function buildStandardsHTML(standards) {
    if (!standards || standards.length === 0) {
      return '<p style="font-size: 0.9em; color: var(--muted);">No standards available</p>';
    }

    return standards
      .map(s => `<div style="margin-bottom: 12px; font-size: 0.85em;">
        <span class="std-badge">${escapeHTML(s.code)}</span>
        <p style="margin: 4px 0 0 0; color: var(--text2);">${escapeHTML(s.text)}</p>
      </div>`)
      .join('');
  }

  /**
   * Escape HTML to prevent injection
   */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================================================
  // CRA & PIAGET HELPERS
  // ============================================================================

  function detectGradeFromURL() {
    const path = window.location.pathname;
    const match = path.match(/\/tools\/([^/]+)\//);
    if (match) return match[1];
    // Try body attribute
    const gradeAttr = document.body.getAttribute('data-grade');
    if (gradeAttr) return gradeAttr;
    return null;
  }

  function getCRAInfo(grade) {
    const map = {
      'K':    { primary: 'concrete', description: 'Concrete-dominant. Students learn through direct manipulation of objects. Use physical/virtual manipulatives before any symbols.' },
      '1':    { primary: 'concrete', description: 'Concrete primary. Bridge to representational with paired visuals. Keep manipulatives available at all times.' },
      '2':    { primary: 'concrete', description: 'Concrete to representational transition. Students ready for visual models (drawings, diagrams) alongside objects.' },
      '3':    { primary: 'representational', description: 'Representational emerging. Visual models (bar diagrams, arrays, number lines) become primary. Concrete fallback for struggling learners.' },
      '4':    { primary: 'representational', description: 'Representational primary. Students work with diagrams and visual models. Introduce symbolic notation alongside.' },
      '5':    { primary: 'representational', description: 'Representational to abstract. Visual models support symbolic work. Begin concreteness fading.' },
      '6':    { primary: 'representational', description: 'Representational with abstract. Visual models for insight, symbolic for practice. CRA-I (integrated) recommended.' },
      '7':    { primary: 'representational', description: 'Representational-abstract balance. Students reason with both visual and symbolic. Proportional reasoning emerging.' },
      '8':    { primary: 'representational', description: 'Abstract emerging. Visual models for new concepts, symbolic for familiar ones. Formal reasoning developing.' },
      'ALG1': { primary: 'abstract', description: 'Abstract primary. Symbolic manipulation is default. Use representational models (graphs, tables) for building intuition.' },
      'GEOM': { primary: 'representational', description: 'Representational primary. Spatial reasoning through constructions, coordinate geometry, and visual proofs.' },
      'ALG2': { primary: 'abstract', description: 'Abstract primary. Complex symbolic work with graphical support for understanding.' },
      'PREC': { primary: 'abstract', description: 'Abstract primary. Advanced symbolic reasoning with graphical/geometric visualization for insight.' },
      'games':{ primary: 'concrete', description: 'Game-based learning. CRA level varies by game difficulty tier.' }
    };
    return map[grade] || { primary: 'representational', description: 'Adapt CRA level to student needs.' };
  }

  function getPiagetInfo(grade) {
    const map = {
      'K':    { label: 'Preoperational', description: 'Students learn by doing. They need to physically touch/move objects to count. No conservation yet — rearranging objects may seem to change quantity.' },
      '1':    { label: 'Pre → Concrete', description: 'Transitioning to concrete operational. 1-to-1 correspondence developing. Still needs physical manipulation but beginning to work with images.' },
      '2':    { label: 'Concrete Operational', description: 'Conservation emerging. Students understand that quantity doesn’t change with rearrangement. Reversibility developing (7+3=10, so 10-3=7).' },
      '3':    { label: 'Concrete Operational', description: 'Conservation secure. Classification and seriation strong. Can mentally reverse operations. Ready for systematic visual models.' },
      '4':    { label: 'Concrete Operational', description: 'Logical thinking with concrete referents. Can classify, seriate, and conserve. Multiplicative reasoning emerging.' },
      '5':    { label: 'Concrete Operational', description: 'Strong concrete reasoning. Beginning to handle multiple variables. Proportional reasoning developing but needs concrete support.' },
      '6':    { label: 'Transitional Formal', description: 'Transitioning to formal operational. Can handle some abstract reasoning but needs representational grounding. Proportional reasoning strengthening.' },
      '7':    { label: 'Transitional Formal', description: 'Proportional and probabilistic reasoning developing. Can work with hypotheticals when grounded in familiar contexts.' },
      '8':    { label: 'Early Formal', description: 'Hypothetical-deductive reasoning emerging. Can manipulate variables abstractly in familiar domains. Transfer to new domains still needs support.' },
      'ALG1': { label: 'Formal Operational', description: 'Abstract symbolic reasoning. Can work with hypotheticals and formal logic. Not all students reach this for all domains.' },
      'GEOM': { label: 'Formal Operational', description: 'Spatial formal reasoning. Deductive proof and abstract geometric relationships.' },
      'ALG2': { label: 'Formal Operational', description: 'Advanced abstract reasoning across mathematical domains.' },
      'PREC': { label: 'Formal Operational', description: 'Mature mathematical reasoning. Can coordinate multiple representations fluently.' },
      'games':{ label: 'Varies', description: 'Adapt to the student’s developmental level based on grade band of the game.' }
    };
    return map[grade] || { label: 'Developing', description: 'Assess student’s reasoning level and adapt accordingly.' };
  }

  function detectMisconceptions() {
    // Try to read misconceptions from the page's tool data
    // Method 1: Look for a global misconceptions variable
    if (window.MISCONCEPTIONS && Array.isArray(window.MISCONCEPTIONS)) {
      return window.MISCONCEPTIONS;
    }
    // Method 2: Look for data attribute on body
    const miscAttr = document.body.getAttribute('data-misconceptions');
    if (miscAttr) {
      try { return JSON.parse(miscAttr); } catch(e) {}
    }
    // Method 3: Search for misconceptions in any visible element
    const miscEl = document.querySelector('[data-misconceptions]');
    if (miscEl) {
      try { return JSON.parse(miscEl.getAttribute('data-misconceptions')); } catch(e) {}
    }
    return [];
  }

  // ============================================================================
  // PANEL CREATION & INJECTION
  // ============================================================================

  /**
   * Create the guide panel HTML
   */
  function createGuidePanel(data, mode = 'explore') {
    const grade = detectGradeFromURL();
    const craInfo = getCRAInfo(grade);
    const piagetInfo = getPiagetInfo(grade);
    const misconceptions = detectMisconceptions();

    const panelHTML = `
      <div class="vinculum-guide-panel" id="vinculumGuidePanel">
        <button class="guide-toggle" id="guideToggle" title="Toggle teacher guide" aria-label="Toggle teacher guide">&#9776;</button>
        <div class="guide-header">
          <span class="guide-header-title">Teacher Guide</span>
        </div>
        <div class="guide-content">
          <div class="panel-section">
            <div class="panel-title">CRA Level</div>
            <div class="panel-text" id="guideCRA">
              <div class="cra-bar">
                <span class="cra-dot ${craInfo.primary === 'concrete' ? 'active' : ''}">C</span>
                <span class="cra-connector"></span>
                <span class="cra-dot ${craInfo.primary === 'representational' ? 'active' : ''}">R</span>
                <span class="cra-connector"></span>
                <span class="cra-dot ${craInfo.primary === 'abstract' ? 'active' : ''}">A</span>
              </div>
              <p style="margin:6px 0 0;font-size:12px;color:var(--text2)">${craInfo.description}</p>
            </div>
          </div>
          <div class="panel-section">
            <div class="panel-title">Teaching Notes</div>
            <div class="panel-text guide-instructions" id="guideInstructions">
              ${data.teachingNotes ? (data.teachingNotes[mode] || data.teachingNotes.explore) : (data.instructions[mode] || data.instructions.explore)}
            </div>
          </div>
          ${misconceptions.length > 0 ? `
          <div class="panel-section">
            <div class="panel-title">Watch For</div>
            <div class="panel-text guide-misconceptions" id="guideMisconceptions">
              ${misconceptions.map(m => `<div class="misconception-item">${escapeHTML(m)}</div>`).join('')}
            </div>
          </div>` : ''}
          <div class="panel-section">
            <div class="panel-title">Developmental Stage</div>
            <div class="panel-text" id="guidePiaget">
              <div class="piaget-badge">${piagetInfo.label}</div>
              <p style="margin:6px 0 0;font-size:12px;color:var(--text2)">${piagetInfo.description}</p>
            </div>
          </div>
          <div class="panel-section">
            <div class="panel-title">Standards Addressed</div>
            <div class="panel-text guide-standards" id="guideStandards">
              ${buildStandardsHTML(data.standards)}
            </div>
          </div>
        </div>
      </div>
    `;
    return panelHTML;
  }

  /**
   * Inject CSS for the guide panel
   */
  function injectStyles() {
    if (document.getElementById('vinculum-guide-styles')) return;

    const style = document.createElement('style');
    style.id = 'vinculum-guide-styles';
    style.textContent = `
      .vinculum-guide-panel {
        position: fixed;
        left: 0;
        top: 0;
        width: 260px;
        height: 100vh;
        background: var(--bg2);
        border-right: 2px solid var(--border);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        z-index: 9998;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        transition: transform 0.3s ease;
        overflow: hidden;
      }

      .vinculum-guide-panel.collapsed {
        transform: translateX(-260px);
      }

      /* Push main content right when panel is open */
      body.guide-panel-open {
        padding-left: 260px !important;
        transition: padding-left 0.3s ease;
        box-sizing: border-box;
      }

      body.guide-panel-closed {
        padding-left: 0 !important;
        transition: padding-left 0.3s ease;
      }

      .guide-toggle {
        position: absolute;
        right: -44px;
        top: 12px;
        width: 36px;
        height: 36px;
        border-radius: 0 8px 8px 0;
        border: 2px solid var(--border);
        border-left: none;
        background: var(--bg2);
        color: var(--text);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease, color 0.2s ease;
        z-index: 10000;
      }

      .guide-toggle:hover {
        background: var(--cyan);
        color: #000;
        border-color: var(--cyan);
      }

      .guide-toggle:active {
        transform: scale(0.95);
      }

      .guide-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px 10px;
        border-bottom: 1px solid var(--border);
      }

      .guide-header-title {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--cyan);
      }

      .guide-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        scroll-behavior: smooth;
      }

      .guide-content::-webkit-scrollbar {
        width: 6px;
      }

      .guide-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .guide-content::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 3px;
      }

      .guide-content::-webkit-scrollbar-thumb:hover {
        background: var(--text2);
      }

      .panel-section {
        margin-bottom: 20px;
      }

      .panel-section:last-child {
        margin-bottom: 0;
      }

      .panel-title {
        font-size: 12px;
        font-weight: 700;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 6px;
      }

      .panel-text {
        font-size: 13px;
        line-height: 1.6;
        color: var(--text2);
      }

      .panel-text strong {
        color: var(--text);
        font-weight: 600;
      }

      .panel-text p {
        margin: 0;
      }

      .guide-instructions ol,
      .guide-instructions ul {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }

      .guide-instructions li {
        margin-bottom: 8px;
        line-height: 1.5;
      }

      .guide-standards {
        font-size: 12px;
      }

      /* Standards badge: outlined pill, not filled background */
      .guide-standards .std-badge {
        display: inline-block;
        border: 1.5px solid var(--cyan);
        color: var(--cyan);
        background: transparent;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 700;
        font-family: 'Consolas', 'Courier New', monospace;
        margin-bottom: 4px;
      }

      /* Mobile: Bottom sheet instead of side panel */
      @media (max-width: 899px) {
        .vinculum-guide-panel {
          position: fixed;
          left: 0;
          bottom: 0;
          top: auto;
          width: 100%;
          height: auto;
          max-height: 70vh;
          border-right: none;
          border-top: 2px solid var(--border);
          border-radius: 16px 16px 0 0;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.12);
        }

        .vinculum-guide-panel.collapsed {
          transform: translateY(100%);
        }

        body.guide-panel-open {
          padding-left: 0 !important;
        }

        .guide-toggle {
          position: absolute;
          right: 20px;
          left: auto;
          bottom: 100%;
          top: auto;
          margin-bottom: 8px;
          border-radius: 8px 8px 0 0;
          border: 2px solid var(--border);
          border-bottom: none;
        }

        .guide-content {
          max-height: calc(70vh - 40px);
        }
      }

      /* CRA Level Bar */
      .cra-bar {
        display: flex;
        align-items: center;
        gap: 0;
        margin: 4px 0;
      }
      .cra-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 800;
        border: 2px solid var(--border);
        color: var(--muted);
        background: transparent;
        transition: all 0.2s;
      }
      .cra-dot.active {
        border-color: var(--cyan);
        color: var(--cyan);
        background: rgba(0,212,255,0.1);
        box-shadow: 0 0 8px rgba(0,212,255,0.3);
      }
      .cra-connector {
        width: 16px;
        height: 2px;
        background: var(--border);
      }

      /* Piaget Stage Badge */
      .piaget-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.3px;
        border: 1.5px solid var(--green, #00e676);
        color: var(--green, #00e676);
        background: transparent;
      }

      /* Misconception Items */
      .misconception-item {
        padding: 6px 0;
        border-bottom: 1px solid var(--border);
        font-size: 12px;
        line-height: 1.5;
        color: var(--text2);
      }
      .misconception-item:last-child {
        border-bottom: none;
      }
      .misconception-item::before {
        content: '⚠ ';
        color: var(--yellow, #ffc107);
      }

      /* Prevent layout shift when scrollbar appears */
      body {
        overflow-y: scroll;
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Initialize the guide panel
   */
  function initGuidePanel() {
    // Check if guide already exists (avoid double-injection)
    if (document.getElementById('vinculumGuidePanel')) return;

    // Detect tool ID
    const toolId = detectToolId();
    if (!toolId) {
      console.warn('[VinculumGuide] Could not detect tool ID');
      return;
    }

    // Get guide data
    const guideData = getGuideData(toolId);
    if (!guideData) {
      console.warn('[VinculumGuide] No guide data for tool:', toolId);
      return;
    }

    // Inject styles
    injectStyles();

    // Detect initial mode
    const initialMode = detectCurrentMode();

    // Create and inject panel
    const panelHTML = createGuidePanel(guideData, initialMode);
    document.body.insertAdjacentHTML('beforeend', panelHTML);

    // Set up event listeners
    const panel = document.getElementById('vinculumGuidePanel');
    const toggle = document.getElementById('guideToggle');

    function updateBodyMargin() {
      const isCollapsed = panel.classList.contains('collapsed');
      document.body.classList.toggle('guide-panel-open', !isCollapsed);
      document.body.classList.toggle('guide-panel-closed', isCollapsed);
    }

    toggle.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
      updateBodyMargin();
      // Save state to localStorage
      const isCollapsed = panel.classList.contains('collapsed');
      localStorage.setItem('vinculum-guide-collapsed', isCollapsed);
    });

    // Default: START OPEN. Only collapse if user previously closed it.
    const shouldCollapse = localStorage.getItem('vinculum-guide-collapsed') === 'true';
    if (shouldCollapse) {
      panel.classList.add('collapsed');
    }
    updateBodyMargin();

    // Listen for mode changes
    setupModeListener(guideData);

    // Expose API
    window.VinculumGuide = {
      updateMode: function(mode) {
        updateInstructions(guideData, mode);
      },
      show: function() {
        panel.classList.remove('collapsed');
      },
      hide: function() {
        panel.classList.add('collapsed');
      },
      toggle: function() {
        panel.classList.toggle('collapsed');
      }
    };

    console.log('[VinculumGuide] Panel initialized for tool:', toolId);
  }

  /**
   * Listen for mode changes and update instructions
   */
  function setupModeListener(guideData) {
    // Observer for mode tab changes
    const observeModeTabs = () => {
      const modeTabs = document.querySelectorAll('.mode-tab, .vinculum-mode-tab');
      modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          setTimeout(() => {
            const mode = detectCurrentMode();
            updateInstructions(guideData, mode);
          }, 100);
        });
      });
    };

    // Initial setup
    observeModeTabs();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      observeModeTabs();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  /**
   * Update instructions based on mode
   */
  function updateInstructions(guideData, mode) {
    const instructionsEl = document.getElementById('guideInstructions');
    if (instructionsEl) {
      const notes = guideData.teachingNotes || guideData.instructions;
      if (notes[mode]) {
        instructionsEl.innerHTML = notes[mode];
      }
    }
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Wait for DOM to be ready, then initialize
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuidePanel);
  } else {
    initGuidePanel();
  }

})();
