/**
 * Indigenous Math Context — Teacher Reference Layer
 * ==================================================
 * Provides culturally connected math contexts from the Story & Theme Repository
 * as TEACHER-FACING suggestions, not student-facing generated content.
 *
 * Data sourced from the Indigenous_Math_Integration_Research_Profile and the
 * Story_Theme_Repository CSV. Every entry carries provenance: which nation(s),
 * what source type, and whether it aligns to a Minnesota benchmark.
 *
 * Usage:
 *   const matches = IndigenousContext.findMatches(topics, gradeBand);
 *   // Returns an array of context objects the Digester can render
 *   // as a teacher reference slide.
 *
 * IMPORTANT — Design philosophy:
 *   This module SUGGESTS contexts to teachers. It does NOT auto-generate
 *   student-facing content. Teachers decide if, when, and how to use these.
 *   All entries include nation attribution and source provenance.
 */

(function (root) {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // STORY & THEME REPOSITORY
  // Each entry: { id, gradeBand, theme, culturalContext, nations, mathDomain,
  //   mathConcepts, craPhase, sampleProblem, mnBenchmark, sourceType, notes }
  // ═══════════════════════════════════════════════════════════════════════════

  var REPOSITORY = [
    // ── K-2 ──
    {
      id: 'K2-01', gradeBand: 'K-2', theme: 'Berry Picking',
      culturalContext: 'Yup\'ik, Anishinaabe seasonal gathering',
      nations: ['Yup\'ik', 'Anishinaabe'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['counting', 'sorting', 'equal sharing', 'graphing'],
      craPhase: 'Concrete',
      sampleProblem: 'The family picked 12 baskets of berries and shared equally among 4 families. How many baskets did each family receive?',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Picking Berries module'
    },
    {
      id: 'K2-02', gradeBand: 'K-2', theme: 'Moccasin Making',
      culturalContext: 'Dakota, Ojibwe craftwork',
      nations: ['Dakota', 'Ojibwe'],
      mathDomain: 'Measurement & Data',
      mathConcepts: ['non-standard measurement', 'body units', 'shapes', 'comparison'],
      craPhase: 'Concrete',
      sampleProblem: 'Measure your foot using hand spans. How many hand spans long is your moccasin? Compare with a partner.',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Present-tense: Dakota and Ojibwe people make moccasins'
    },
    {
      id: 'K2-03', gradeBand: 'K-2', theme: 'Counting in Ojibwe',
      culturalContext: 'Anishinaabe language system',
      nations: ['Anishinaabe'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['number words', 'place value', 'counting patterns', 'classification'],
      craPhase: 'Concrete',
      sampleProblem: 'Count the objects using both English and Ojibwe: bezhig, niizh, niswi... How are the number words similar?',
      mnBenchmark: true, sourceType: 'Language-Based',
      notes: 'Classificatory endings teach categorical thinking'
    },
    {
      id: 'K2-04', gradeBand: 'K-2', theme: 'Wild Rice Harvest',
      culturalContext: 'Anishinaabe manoomin tradition',
      nations: ['Anishinaabe'],
      mathDomain: 'Measurement & Data',
      mathConcepts: ['sorting', 'classifying', 'weighing', 'comparing'],
      craPhase: 'Concrete',
      sampleProblem: 'Sort the wild rice grains by size. Which group has more? How much more?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Manoomin (wild rice) is sacred to Anishinaabe people'
    },
    {
      id: 'K2-05', gradeBand: 'K-2', theme: 'Birch Bark Biting',
      culturalContext: 'Ojibwe art form',
      nations: ['Ojibwe'],
      mathDomain: 'Geometry',
      mathConcepts: ['symmetry', 'folding', 'shapes', 'congruence'],
      craPhase: 'Concrete',
      sampleProblem: 'Fold paper in half and cut a shape. When you unfold it, what do you notice? How many lines of symmetry?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Living art tradition; contemporary artists still practice'
    },
    {
      id: 'K2-06', gradeBand: 'K-2', theme: 'Animal Tracking',
      culturalContext: 'Dakota/Lakota observation',
      nations: ['Dakota', 'Lakota'],
      mathDomain: 'Measurement & Data',
      mathConcepts: ['patterns', 'measurement', 'comparison', 'data recording'],
      craPhase: 'Concrete',
      sampleProblem: 'Measure and compare animal tracks. Which animal has the largest track? Order them by size.',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Tracking as mathematical observation'
    },
    {
      id: 'K2-07', gradeBand: 'K-2', theme: 'Egg Gathering',
      culturalContext: 'Yup\'ik subsistence',
      nations: ['Yup\'ik'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['grouping', 'place value', 'addition'],
      craPhase: 'Concrete',
      sampleProblem: 'You gathered 23 eggs. Group them in tens and ones. How many groups of ten? How many ones left over?',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Going to Egg Island module'
    },

    // ── 3-5 ──
    {
      id: '35-01', gradeBand: '3-5', theme: 'Beadwork Design',
      culturalContext: 'Multiple nations traditional craft',
      nations: ['Ojibwe', 'Dakota', 'Shoshone-Bannock'],
      mathDomain: 'Geometry',
      mathConcepts: ['coordinates', 'symmetry', 'area', 'perimeter', 'transformations'],
      craPhase: 'Representational',
      sampleProblem: 'Design a beadwork pattern on a coordinate grid using reflection symmetry. Calculate the total number of beads needed.',
      mnBenchmark: true, sourceType: 'CSDT + Cultural',
      notes: 'Virtual Bead Loom tool available (CSDT)',
      toolLink: 'https://csdt.org/culture/bead_loom/'
    },
    {
      id: '35-02', gradeBand: '3-5', theme: 'Fish Rack Building',
      culturalContext: 'Yup\'ik construction',
      nations: ['Yup\'ik'],
      mathDomain: 'Geometry',
      mathConcepts: ['properties of rectangles', 'perimeter', 'area', 'proof'],
      craPhase: 'Representational',
      sampleProblem: 'Design a fish rack that is 8 feet long and 4 feet wide. What is the perimeter? How much netting do you need to cover the area?',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Building a Fish Rack module'
    },
    {
      id: '35-03', gradeBand: '3-5', theme: 'Parka Pattern Design',
      culturalContext: 'Yup\'ik clothing',
      nations: ['Yup\'ik'],
      mathDomain: 'Geometry',
      mathConcepts: ['shapes', 'area', 'tessellation', 'repeating patterns'],
      craPhase: 'Representational',
      sampleProblem: 'Design a repeating border pattern for a parka using triangles and rectangles. Calculate the total area of your pattern.',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Patterns and Parkas module'
    },
    {
      id: '35-04', gradeBand: '3-5', theme: 'Star Knowledge',
      culturalContext: 'Dakota/Lakota astronomy',
      nations: ['Dakota', 'Lakota'],
      mathDomain: 'Geometry',
      mathConcepts: ['angles', 'directions', 'fractions of circles'],
      craPhase: 'Representational',
      sampleProblem: 'The North Star is directly overhead. A constellation is 1/4 turn to the east. How many degrees is that turn?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Dakota star knowledge is a living tradition'
    },
    {
      id: '35-05', gradeBand: '3-5', theme: 'Trading and Exchange',
      culturalContext: 'Historical inter-tribal commerce',
      nations: ['Multiple nations'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['multiplication', 'division', 'equivalence', 'ratio introduction'],
      craPhase: 'Representational',
      sampleProblem: 'If 3 beaver pelts trade for 12 pounds of wild rice, how much rice for 7 pelts?',
      mnBenchmark: true, sourceType: 'Historical + Contemporary',
      notes: 'Connect to contemporary economic contexts too'
    },
    {
      id: '35-06', gradeBand: '3-5', theme: 'Canoe Dimensions',
      culturalContext: 'Ojibwe/Dakota watercraft',
      nations: ['Ojibwe', 'Dakota'],
      mathDomain: 'Measurement & Data',
      mathConcepts: ['measurement', 'proportion', 'fractions', 'scale'],
      craPhase: 'Representational',
      sampleProblem: 'A model canoe is 2 feet long. The real canoe is 6 times longer. How long is the real canoe? What fraction is the model of the real canoe?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Both historical and contemporary canoe building'
    },
    {
      id: '35-07', gradeBand: '3-5', theme: '13-Moon Calendar',
      culturalContext: 'Anishinaabe time-keeping',
      nations: ['Anishinaabe'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['fractions', 'time', 'data over time'],
      craPhase: 'Representational',
      sampleProblem: 'The Anishinaabe calendar has 13 moons. The Western calendar has 12 months. What fraction of a year is 1 moon? 1 month? Which is larger?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Each moon has a name reflecting seasonal observations'
    },
    {
      id: '35-08', gradeBand: '3-5', theme: 'Data Sovereignty',
      culturalContext: 'Dakota and Anishinaabe contexts',
      nations: ['Dakota', 'Anishinaabe'],
      mathDomain: 'Statistics & Data',
      mathConcepts: ['data literacy', 'source analysis', 'perspective'],
      craPhase: 'Abstract',
      sampleProblem: 'Look at this data about wild rice harvest. Who collected it? What is its purpose? Whose perspective might be missing?',
      mnBenchmark: true, sourceType: 'MN Standard',
      notes: 'Directly from MN 2022 Grade 3 benchmark'
    },

    // ── 6-8 ──
    {
      id: '68-01', gradeBand: '6-8', theme: 'Salmon Drying Ratios',
      culturalContext: 'Yup\'ik preservation',
      nations: ['Yup\'ik'],
      mathDomain: 'Ratios & Proportions',
      mathConcepts: ['proportional reasoning', 'rates', 'unit rates'],
      craPhase: 'Representational',
      sampleProblem: 'If 15 salmon yield 8 pounds of dried fish, how many salmon are needed for 20 pounds? What is the unit rate?',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Drying Salmon module'
    },
    {
      id: '68-02', gradeBand: '6-8', theme: 'Smokehouse Geometry',
      culturalContext: 'Yup\'ik/general Native construction',
      nations: ['Yup\'ik'],
      mathDomain: 'Geometry',
      mathConcepts: ['3D geometry', 'surface area', 'volume', 'nets'],
      craPhase: 'Representational',
      sampleProblem: 'Design a smokehouse with specific volume requirements (48 cubic feet). What dimensions work? Calculate material for walls and roof.',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Building a Smokehouse module'
    },
    {
      id: '68-03', gradeBand: '6-8', theme: 'Kayak Design',
      culturalContext: 'Yup\'ik watercraft engineering',
      nations: ['Yup\'ik'],
      mathDomain: 'Statistics & Data',
      mathConcepts: ['statistical analysis', 'measurement', 'data comparison'],
      craPhase: 'Representational',
      sampleProblem: 'Compare two kayak designs using data on length, width, and speed. Calculate mean, median, and range for each. Which design is more consistent?',
      mnBenchmark: true, sourceType: 'MCC Research',
      notes: 'Based on MCC Kayak Design module'
    },
    {
      id: '68-04', gradeBand: '6-8', theme: 'Navajo Rug Weaving',
      culturalContext: 'Din\u00e9 (Navajo) textile art',
      nations: ['Din\u00e9 (Navajo)'],
      mathDomain: 'Algebra & Functions',
      mathConcepts: ['transformations', 'functions', 'iteration', 'algebraic rules'],
      craPhase: 'Representational',
      sampleProblem: 'Model a rug pattern using algebraic rules: f(x) reflects across the center, g(x) shifts the pattern 4 units. Write the composition.',
      mnBenchmark: true, sourceType: 'CSDT + Cultural',
      notes: 'Navajo Rug Weaver tool available (CSDT)',
      toolLink: 'https://csdt.org/culture/navajo_rug/'
    },
    {
      id: '68-05', gradeBand: '6-8', theme: 'Population Data',
      culturalContext: 'Treaty and sovereignty contexts',
      nations: ['Dakota', 'Anishinaabe'],
      mathDomain: 'Statistics & Data',
      mathConcepts: ['statistics', 'sampling', 'percent change', 'data ethics'],
      craPhase: 'Abstract',
      sampleProblem: 'Minnesota\'s Dakota population was approximately X in 1850 and Y today. Calculate the percent change. What factors should we consider when interpreting this data?',
      mnBenchmark: true, sourceType: 'MN Standard',
      notes: 'Connects data literacy and historical context'
    },
    {
      id: '68-06', gradeBand: '6-8', theme: 'Land Area and Treaties',
      culturalContext: 'Dakota/Ojibwe treaty history',
      nations: ['Dakota', 'Ojibwe'],
      mathDomain: 'Geometry',
      mathConcepts: ['area', 'scale', 'ratio', 'proportional reasoning'],
      craPhase: 'Representational',
      sampleProblem: 'Using a scaled map, calculate the area of original Dakota territory. Calculate the area of the reservation today. What is the ratio?',
      mnBenchmark: true, sourceType: 'Historical + Contemporary',
      notes: 'Handle with care; connect to contemporary sovereignty'
    },
    {
      id: '68-07', gradeBand: '6-8', theme: 'Basket Weaving Algorithms',
      culturalContext: 'Pomo, Tla\'amin traditions',
      nations: ['Pomo', 'Tla\'amin'],
      mathDomain: 'Algebra & Functions',
      mathConcepts: ['algorithmic thinking', '3D geometry', 'patterns'],
      craPhase: 'Representational',
      sampleProblem: 'Write step-by-step instructions (algorithm) for creating a basket pattern. How does changing the step count change the pattern?',
      mnBenchmark: true, sourceType: 'Cultural Practice',
      notes: 'Connects to computational thinking standards'
    },
    {
      id: '68-08', gradeBand: '6-8', theme: 'Bison Herd Estimation',
      culturalContext: 'Lakota Plains culture',
      nations: ['Lakota'],
      mathDomain: 'Number & Operations',
      mathConcepts: ['large numbers', 'estimation', 'scientific notation'],
      craPhase: 'Abstract',
      sampleProblem: 'Historical bison populations numbered 30-60 million. Express in scientific notation. If populations declined by 99.99% by 1889, how many remained?',
      mnBenchmark: true, sourceType: 'Historical + Contemporary',
      notes: 'Connect to contemporary restoration efforts'
    },

    // ── 9-12 ──
    {
      id: '912-01', gradeBand: '9-12', theme: 'Star Navigation Systems',
      culturalContext: 'Yup\'ik, Dakota celestial knowledge',
      nations: ['Yup\'ik', 'Dakota'],
      mathDomain: 'Geometry & Trig',
      mathConcepts: ['trigonometry', 'vectors', 'coordinate geometry'],
      craPhase: 'Abstract',
      sampleProblem: 'Calculate your position using two star angles and a known landmark. Use triangulation to find the distance to camp.',
      mnBenchmark: true, sourceType: 'MCC + Cultural',
      notes: 'Integrates environmental features with celestial observation'
    },
    {
      id: '912-02', gradeBand: '9-12', theme: 'Demographic Modeling',
      culturalContext: 'Indigenous population history',
      nations: ['Multiple nations'],
      mathDomain: 'Algebra & Functions',
      mathConcepts: ['exponential functions', 'logistic modeling', 'regression'],
      craPhase: 'Abstract',
      sampleProblem: 'Model the decline of Indigenous populations from 1492-1900 using exponential decay. Model recovery since 1900. What function type fits each period?',
      mnBenchmark: true, sourceType: 'Historical + Contemporary',
      notes: 'Sensitive topic; frame with care and agency'
    },
    {
      id: '912-03', gradeBand: '9-12', theme: 'Resource Management',
      culturalContext: 'Tribal sovereignty, treaty rights',
      nations: ['Ojibwe', 'Dakota'],
      mathDomain: 'Algebra & Functions',
      mathConcepts: ['linear programming', 'optimization', 'systems'],
      craPhase: 'Abstract',
      sampleProblem: 'Optimize wild rice harvest: maximize yield given constraints on sustainability, labor hours, and lake access.',
      mnBenchmark: true, sourceType: 'Contemporary',
      notes: 'Real-world application of tribal resource management'
    },
    {
      id: '912-04', gradeBand: '9-12', theme: 'Beadwork and Coding',
      culturalContext: 'Multiple nations + CSDT tools',
      nations: ['Multiple nations'],
      mathDomain: 'Algebra & Functions',
      mathConcepts: ['functions', 'coordinate geometry', 'computational math'],
      craPhase: 'Abstract',
      sampleProblem: 'Write functions that generate beadwork patterns on a coordinate plane. Explore composition of transformations.',
      mnBenchmark: true, sourceType: 'CSDT + Cultural',
      notes: 'Bridges traditional art and computational math',
      toolLink: 'https://csdt.org/culture/bead_loom/'
    },
    {
      id: '912-05', gradeBand: '9-12', theme: 'Water and Land Rights',
      culturalContext: 'Contemporary sovereignty issues',
      nations: ['Multiple nations'],
      mathDomain: 'Statistics & Data',
      mathConcepts: ['statistics', 'data analysis', 'modeling', 'regression'],
      craPhase: 'Abstract',
      sampleProblem: 'Analyze water quality data from tribal lands over 10 years. Create a regression model. Is water quality improving or declining?',
      mnBenchmark: true, sourceType: 'Contemporary',
      notes: 'Real data sets available from tribal environmental offices'
    },
    {
      id: '912-06', gradeBand: '9-12', theme: 'Language Revitalization',
      culturalContext: 'Ojibwe, Dakota language programs',
      nations: ['Ojibwe', 'Dakota'],
      mathDomain: 'Statistics & Data',
      mathConcepts: ['statistics', 'regression', 'prediction', 'modeling'],
      craPhase: 'Abstract',
      sampleProblem: 'Analyze Ojibwe speaker population data over time. Create a regression model to project future trends.',
      mnBenchmark: true, sourceType: 'Contemporary',
      notes: 'Connects math to language preservation efforts'
    },
    {
      id: '912-07', gradeBand: '9-12', theme: 'Traditional Ecological Knowledge',
      culturalContext: 'Multiple nations',
      nations: ['Multiple nations'],
      mathDomain: 'Calculus Applications',
      mathConcepts: ['modeling', 'rates of change', 'integration', 'differential equations'],
      craPhase: 'Abstract',
      sampleProblem: 'Model fish population dynamics using both traditional observation data and Western ecological data. Compare the models.',
      mnBenchmark: true, sourceType: 'Contemporary + Cultural',
      notes: 'Advanced: bridges two knowledge systems mathematically'
    }
  ];


  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN KEYWORD MAP
  // Maps lesson topic keywords to repository math domains for matching.
  // ═══════════════════════════════════════════════════════════════════════════

  var DOMAIN_KEYWORDS = {
    'Number & Operations': [
      'counting', 'addition', 'subtraction', 'multiplication', 'division',
      'place value', 'fractions', 'decimals', 'percent', 'integers',
      'number', 'factor', 'prime', 'composite', 'operations', 'order of operations',
      'scientific notation', 'estimation', 'rounding'
    ],
    'Measurement & Data': [
      'measurement', 'length', 'weight', 'capacity', 'temperature',
      'data', 'graph', 'chart', 'line plot', 'histogram',
      'mean', 'median', 'mode', 'range', 'scale', 'units', 'convert'
    ],
    'Geometry': [
      'geometry', 'shape', 'triangle', 'rectangle', 'circle', 'polygon',
      'angle', 'line', 'parallel', 'perpendicular', 'symmetry',
      'area', 'perimeter', 'volume', 'surface area', 'coordinate',
      'transformation', 'reflection', 'rotation', 'translation',
      'congruent', 'similar', 'pythagorean', '3d', 'prism', 'cylinder',
      'net', 'tessellation'
    ],
    'Geometry & Trig': [
      'trigonometry', 'sine', 'cosine', 'tangent', 'trig',
      'vector', 'radian', 'unit circle', 'triangulation'
    ],
    'Algebra & Functions': [
      'algebra', 'equation', 'expression', 'variable', 'function',
      'linear', 'quadratic', 'exponential', 'slope', 'intercept',
      'inequality', 'system', 'polynomial', 'pattern', 'sequence',
      'rate of change', 'iteration', 'algorithm', 'optimization'
    ],
    'Ratios & Proportions': [
      'ratio', 'proportion', 'rate', 'unit rate', 'percent',
      'scale', 'similar', 'proportional', 'cross multiply'
    ],
    'Statistics & Data': [
      'statistics', 'probability', 'data', 'sampling', 'regression',
      'correlation', 'survey', 'bias', 'distribution', 'inference',
      'standard deviation', 'normal', 'box plot', 'scatter'
    ],
    'Calculus Applications': [
      'calculus', 'derivative', 'integral', 'limit', 'rate of change',
      'differential', 'optimization', 'related rates', 'area under curve'
    ]
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // GRADE BAND RESOLVER
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Resolve a grade number (or string) to a grade band key.
   * Returns 'K-2', '3-5', '6-8', or '9-12'.
   */
  function resolveGradeBand(grade) {
    var g = parseInt(grade, 10);
    if (isNaN(g) || g <= 2) return 'K-2';
    if (g <= 5) return '3-5';
    if (g <= 8) return '6-8';
    return '9-12';
  }

  /**
   * Get the adjacent grade bands (current + one above/below) for
   * broader matching. A 5th-grade lesson might benefit from seeing
   * 6-8 contexts too.
   */
  function getExpandedBands(grade) {
    var primary = resolveGradeBand(grade);
    var bands = [primary];
    var order = ['K-2', '3-5', '6-8', '9-12'];
    var idx = order.indexOf(primary);
    if (idx > 0) bands.push(order[idx - 1]);
    if (idx < order.length - 1) bands.push(order[idx + 1]);
    return bands;
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // MATCHING ENGINE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Score a single repository entry against a set of topics.
   * Returns a relevance score (0 = no match, higher = better).
   */
  function scoreEntry(entry, topicsLower, gradeBands) {
    var score = 0;

    // Grade band match
    if (gradeBands.indexOf(entry.gradeBand) === 0) {
      score += 10; // primary band
    } else if (gradeBands.indexOf(entry.gradeBand) >= 0) {
      score += 4;  // adjacent band
    } else {
      return 0; // no band match at all
    }

    // Math concept keyword matching against topics
    for (var t = 0; t < topicsLower.length; t++) {
      var topic = topicsLower[t];
      // Check math concepts
      for (var c = 0; c < entry.mathConcepts.length; c++) {
        if (topic.indexOf(entry.mathConcepts[c]) >= 0 ||
            entry.mathConcepts[c].indexOf(topic) >= 0) {
          score += 5;
        }
      }
      // Check domain keywords
      var domainKws = DOMAIN_KEYWORDS[entry.mathDomain] || [];
      for (var k = 0; k < domainKws.length; k++) {
        if (topic.indexOf(domainKws[k]) >= 0) {
          score += 3;
          break; // one domain keyword match per topic is enough
        }
      }
      // Partial theme match
      if (topic.indexOf(entry.theme.toLowerCase()) >= 0 ||
          entry.theme.toLowerCase().indexOf(topic) >= 0) {
        score += 2;
      }
    }

    // Minnesota benchmark bonus
    if (entry.mnBenchmark) score += 2;

    // Minnesota-relevant nations bonus (Dakota, Ojibwe, Anishinaabe)
    var mnNations = ['Dakota', 'Ojibwe', 'Anishinaabe', 'Lakota'];
    for (var n = 0; n < entry.nations.length; n++) {
      if (mnNations.indexOf(entry.nations[n]) >= 0) {
        score += 3;
        break;
      }
    }

    return score;
  }

  /**
   * Find matching Indigenous math contexts for a lesson's topics and grade.
   *
   * @param {string[]} topics - Array of lesson topic strings (e.g. ['proportional reasoning', 'ratios'])
   * @param {number|string} [grade=7] - Grade level (number or string)
   * @param {Object} [options]
   * @param {number} [options.maxResults=4] - Maximum number of results
   * @param {boolean} [options.mnOnly=false] - Only return Minnesota-relevant nations
   * @returns {Object[]} Array of matching context objects, sorted by relevance
   */
  function findMatches(topics, grade, options) {
    options = options || {};
    var maxResults = options.maxResults || 4;
    var mnOnly = options.mnOnly || false;
    grade = grade || 7;

    var topicsLower = (topics || []).map(function (t) { return t.toLowerCase(); });
    var gradeBands = getExpandedBands(grade);

    // Score all entries
    var scored = [];
    for (var i = 0; i < REPOSITORY.length; i++) {
      var entry = REPOSITORY[i];

      // Filter MN-only if requested
      if (mnOnly) {
        var hasMN = false;
        var mnNations = ['Dakota', 'Ojibwe', 'Anishinaabe', 'Lakota'];
        for (var n = 0; n < entry.nations.length; n++) {
          if (mnNations.indexOf(entry.nations[n]) >= 0) { hasMN = true; break; }
        }
        if (!hasMN) continue;
      }

      var s = scoreEntry(entry, topicsLower, gradeBands);
      if (s > 0) {
        scored.push({ entry: entry, score: s });
      }
    }

    // Sort by score descending
    scored.sort(function (a, b) { return b.score - a.score; });

    // Return top matches
    return scored.slice(0, maxResults).map(function (s) { return s.entry; });
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // TEACHER REFERENCE HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Format a context entry into a teacher-readable card.
   * Returns { title, body, provenance, accentColor }
   */
  function formatForTeacher(entry) {
    var nationStr = entry.nations.join(', ');
    var body = entry.sampleProblem;
    if (entry.notes) {
      body += '\n\n' + entry.notes;
    }
    if (entry.toolLink) {
      body += '\n\nDigital tool: ' + entry.toolLink;
    }

    // Color based on source type
    var color = '0D9488'; // default teal
    if (entry.sourceType.indexOf('MCC') >= 0) color = '3B82F6';
    if (entry.sourceType.indexOf('MN Standard') >= 0) color = '7C3AED';
    if (entry.sourceType.indexOf('CSDT') >= 0) color = 'F59E0B';

    return {
      title: entry.theme,
      body: body,
      provenance: nationStr + '  •  ' + entry.sourceType + '  •  ' + entry.craPhase,
      accentColor: color,
      gradeBand: entry.gradeBand,
      mathDomain: entry.mathDomain,
      mnBenchmark: entry.mnBenchmark
    };
  }

  /**
   * Build the content object for a Layout Engine splitPanel or cardGrid
   * teacher reference slide.
   *
   * @param {Object[]} matches - Array from findMatches()
   * @param {string[]} topics - Original lesson topics
   * @returns {Object} Content object ready for LE.layouts.splitPanel() or LE.layouts.cardGrid()
   */
  function buildSlideContent(matches, topics) {
    if (!matches || matches.length === 0) return null;

    var cards = matches.map(function (entry) {
      var formatted = formatForTeacher(entry);
      return {
        title: formatted.title + ' (' + entry.nations.join(', ') + ')',
        body: entry.sampleProblem + (entry.toolLink ? '\nTool: ' + entry.toolLink : ''),
        accentColor: formatted.accentColor
      };
    });

    // Determine if we have Minnesota-specific matches
    var mnCount = matches.filter(function (e) {
      var mnN = ['Dakota', 'Ojibwe', 'Anishinaabe', 'Lakota'];
      return e.nations.some(function (n) { return mnN.indexOf(n) >= 0; });
    }).length;

    var topicStr = topics.slice(0, 2).join(', ');

    return {
      title: 'Cultural Connections — Teacher Reference',
      category: 'community',
      left: {
        icon: '✦',
        heading: 'Indigenous Math Contexts',
        body: 'The following culturally connected alternatives relate to this lesson\'s focus on ' +
              topicStr + '.\n\n' +
              (mnCount > 0 ? mnCount + ' of ' + matches.length + ' contexts connect to Minnesota Dakota and Anishinaabe communities.\n\n' : '') +
              'These are suggestions for your professional judgment. Review with Indigenous educators before classroom use.'
      },
      cards: cards,
      footerText: 'Teacher Reference  •  MN IEFA  •  Indigenous contexts suggested, not auto-applied  •  Review before use'
    };
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════════════════

  var IndigenousContext = {
    version: '1.0.0',

    // Core matching
    findMatches: findMatches,

    // Formatting helpers
    formatForTeacher: formatForTeacher,
    buildSlideContent: buildSlideContent,

    // Data access (for inspection/debugging)
    repository: REPOSITORY,
    domainKeywords: DOMAIN_KEYWORDS,

    // Utilities
    resolveGradeBand: resolveGradeBand
  };

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndigenousContext;
  }
  root.IndigenousContext = IndigenousContext;

})(typeof window !== 'undefined' ? window : this);
