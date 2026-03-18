// ═══════════════════════════════════════════════════════════
//  VINCULUM CRA Scaffolding Engine v1.0
//  Concrete → Representational → Abstract framework
//  Prerequisite bias, manipulative suggestions, diagram engine
// ═══════════════════════════════════════════════════════════
(function(window) {
'use strict';

// ── PREREQUISITE CHAINS ──────────────────────────────────
// Maps each topic to its prerequisite topics from earlier grades
const PREREQUISITE_CHAINS = {
  // Grade 6 prereqs
  'ratios and rates':            { prereqGrade: 5, prereqTopics: ['fraction operations','multi-digit operations'] },
  'multiplication and division of fractions': { prereqGrade: 5, prereqTopics: ['fraction operations','multi-digit operations'] },
  'percent':                     { prereqGrade: 5, prereqTopics: ['fraction operations','place value and decimals'] },
  'expressions and patterns':    { prereqGrade: 5, prereqTopics: ['multi-digit operations'] },
  'factors primes gcf lcm':      { prereqGrade: 5, prereqTopics: ['multi-digit operations'] },
  // Grade 7 prereqs
  'representing and comparing rational numbers': { prereqGrade: 6, prereqTopics: ['multiplication and division of fractions','locate and compare numbers'] },
  'applying rational numbers':   { prereqGrade: 6, prereqTopics: ['multiplication and division of fractions','percent'] },
  'proportional relationships':  { prereqGrade: 6, prereqTopics: ['ratios and rates','percent'] },
  'mean median and range':       { prereqGrade: 6, prereqTopics: ['multi-digit operations','place value and decimals'] },
  'circumference and area of circles': { prereqGrade: 5, prereqTopics: ['volume and measurement'] },
  'similarity and scaling':      { prereqGrade: 6, prereqTopics: ['ratios and rates'] },
  // Grade 8 prereqs
  'rational irrational and real numbers': { prereqGrade: 7, prereqTopics: ['representing and comparing rational numbers','applying rational numbers'] },
  'pythagorean theorem':         { prereqGrade: 7, prereqTopics: ['representing and comparing rational numbers'] },
  'solve equations inequalities and systems': { prereqGrade: 7, prereqTopics: ['proportional relationships','applying rational numbers'] },
  // Grade 10+ prereqs
  'quadratic functions':         { prereqGrade: 8, prereqTopics: ['solve equations inequalities and systems'] },
  'polynomial operations':       { prereqGrade: 8, prereqTopics: ['solve equations inequalities and systems'] },
  'exponential and logarithmic functions': { prereqGrade: 8, prereqTopics: ['rational irrational and real numbers'] },
  'right triangle trigonometry': { prereqGrade: 8, prereqTopics: ['pythagorean theorem','rational irrational and real numbers'] },
  'geometric proofs and reasoning': { prereqGrade: 7, prereqTopics: ['similarity and scaling'] },
  'circles and transformations': { prereqGrade: 7, prereqTopics: ['circumference and area of circles'] },
  // Aliases for quiz-builder DB topic names
  'ratios and proportions':      { prereqGrade: 5, prereqTopics: ['fraction operations','multi-digit operations'] },
  'rational number operations':  { prereqGrade: 5, prereqTopics: ['fraction operations','multi-digit operations'] },
  'percent concepts':            { prereqGrade: 5, prereqTopics: ['fraction operations','place value and decimals'] },
  'algebraic expressions':       { prereqGrade: 5, prereqTopics: ['multi-digit operations'] },
  'rational numbers':            { prereqGrade: 6, prereqTopics: ['rational number operations','ratios and proportions'] },
  'operations with rational numbers': { prereqGrade: 6, prereqTopics: ['rational number operations','percent concepts'] },
  'expressions and equations':   { prereqGrade: 6, prereqTopics: ['algebraic expressions'] },
  'real number system':          { prereqGrade: 7, prereqTopics: ['rational numbers','operations with rational numbers'] },
  'linear functions':            { prereqGrade: 7, prereqTopics: ['proportional relationships','expressions and equations'] },
  'solving equations':           { prereqGrade: 7, prereqTopics: ['expressions and equations'] }
};

// ── CRA STAGE DEFAULTS BY DOK ────────────────────────────
// DOK 1 problems are typically C/R, DOK 2 are R, DOK 3 are A
// This can be overridden per-topic
function getCRAStage(dok, topicName) {
  const overrides = CRA_TOPIC_STAGES[topicName];
  if (overrides && overrides[dok]) return overrides[dok];
  if (dok === 1) return Math.random() < 0.6 ? 'C' : 'R';
  if (dok === 2) return Math.random() < 0.3 ? 'R' : 'A';
  return 'A';
}

// Topic-specific CRA bias
const CRA_TOPIC_STAGES = {
  'place value and decimals':    { 1:'C', 2:'R', 3:'A' },
  'fraction operations':         { 1:'C', 2:'R', 3:'A' },
  'multi-digit operations':      { 1:'R', 2:'R', 3:'A' },
  'volume and measurement':      { 1:'C', 2:'R', 3:'A' },
  'coordinate plane':            { 1:'R', 2:'R', 3:'A' },
  'expressions and patterns':    { 1:'R', 2:'A', 3:'A' },
  'locate and compare numbers':  { 1:'C', 2:'R', 3:'A' },
  'equivalence and representations': { 1:'R', 2:'R', 3:'A' },
  'factors primes gcf lcm':      { 1:'C', 2:'R', 3:'A' },
  'ratios and rates':            { 1:'R', 2:'R', 3:'A' },
  'multiplication and division of fractions': { 1:'C', 2:'R', 3:'A' },
  'percent':                     { 1:'R', 2:'R', 3:'A' },
  'proportional relationships':  { 1:'R', 2:'R', 3:'A' },
  'circumference and area of circles': { 1:'C', 2:'R', 3:'A' },
  'similarity and scaling':      { 1:'C', 2:'R', 3:'A' },
  'representing and comparing rational numbers': { 1:'C', 2:'R', 3:'A' },
  'applying rational numbers':   { 1:'R', 2:'R', 3:'A' },
  'mean median and range':       { 1:'C', 2:'R', 3:'A' },
  'rational irrational and real numbers': { 1:'R', 2:'R', 3:'A' },
  'pythagorean theorem':         { 1:'R', 2:'R', 3:'A' },
  'solve equations inequalities and systems': { 1:'R', 2:'A', 3:'A' },
  'quadratic functions':         { 1:'R', 2:'A', 3:'A' },
  'polynomial operations':       { 1:'R', 2:'A', 3:'A' },
  'exponential and logarithmic functions': { 1:'R', 2:'A', 3:'A' },
  'right triangle trigonometry': { 1:'R', 2:'R', 3:'A' },
  'geometric proofs and reasoning': { 1:'R', 2:'A', 3:'A' },
  'circles and transformations': { 1:'R', 2:'R', 3:'A' },
  // Aliases for quiz-builder DB names
  'ratios and proportions':      { 1:'R', 2:'R', 3:'A' },
  'rational number operations':  { 1:'C', 2:'R', 3:'A' },
  'percent concepts':            { 1:'R', 2:'R', 3:'A' },
  'algebraic expressions':       { 1:'R', 2:'A', 3:'A' },
  'rational numbers':            { 1:'C', 2:'R', 3:'A' },
  'operations with rational numbers': { 1:'R', 2:'R', 3:'A' },
  'expressions and equations':   { 1:'R', 2:'A', 3:'A' },
  'real number system':          { 1:'R', 2:'R', 3:'A' },
  'linear functions':            { 1:'R', 2:'R', 3:'A' },
  'solving equations':           { 1:'R', 2:'A', 3:'A' }
};

// ── MANIPULATIVE DATABASE ────────────────────────────────
const MANIPULATIVE_MAP = {
  'place value and decimals': {
    physical: ['Base-10 blocks','Place value mat','Decimal number lines'],
    virtual: 'base10',
    diagram: 'base10',
    interventions: {
      C: 'Have students build numbers with base-10 blocks, trading 10 units for 1 rod',
      R: 'Draw place value chart and circle the digit in question',
      A: 'Practice expanded form notation and power-of-10 reasoning'
    }
  },
  'fraction operations': {
    physical: ['Fraction bars/tiles','Pattern blocks','Cuisenaire rods','Number line strips'],
    virtual: 'fractionBar',
    diagram: 'fractionBar',
    interventions: {
      C: 'Build each fraction with tiles side-by-side before combining',
      R: 'Draw fraction bars or use number line to show operation',
      A: 'Write symbolic equation with common denominator steps shown'
    }
  },
  'multi-digit operations': {
    physical: ['Base-10 blocks','Area model grid paper','Multiplication chart'],
    virtual: 'areaModel',
    diagram: 'areaModel',
    interventions: {
      C: 'Use base-10 blocks to show partial products physically',
      R: 'Draw area model with labeled dimensions',
      A: 'Standard algorithm with place value alignment'
    }
  },
  'volume and measurement': {
    physical: ['Unit cubes','Rulers','Graduated cylinders','Nets templates'],
    virtual: 'rectPrism',
    diagram: 'rectPrism',
    interventions: {
      C: 'Stack unit cubes to fill prism, count layers',
      R: 'Draw labeled 3D prism with l, w, h dimensions',
      A: 'Apply V = l x w x h formula directly'
    }
  },
  'ratios and rates': {
    physical: ['Two-color counters','Ratio tables','Tape diagrams'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Set up physical groups of counters in ratio arrangement',
      R: 'Draw double number line or ratio table',
      A: 'Set up and cross-multiply proportions'
    }
  },
  'multiplication and division of fractions': {
    physical: ['Fraction bars/tiles','Pattern blocks','Area model grid'],
    virtual: 'fractionBar',
    diagram: 'fractionBar',
    interventions: {
      C: 'Build each fraction with tiles, show multiplication as "of"',
      R: 'Draw area model showing fraction × fraction as shaded overlap',
      A: 'Multiply numerators and denominators, simplify'
    }
  },
  'percent': {
    physical: ['10x10 grids','Fraction circles','Percent bars'],
    virtual: 'areaModel',
    diagram: 'areaModel',
    interventions: {
      C: 'Shade 10x10 grid to show percent visually',
      R: 'Draw percent bar model connecting fraction/decimal/percent',
      A: 'Calculate with decimal equivalents: part = rate × whole'
    }
  },
  'expressions and patterns': {
    physical: ['Algebra tiles','Balance scale','Cups and counters'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Model expression with algebra tiles — positive and negative',
      R: 'Draw balance scale with variable and constants',
      A: 'Simplify using distributive property and combine like terms'
    }
  },
  'factors primes gcf lcm': {
    physical: ['Color tiles','Factor trees','Hundred chart'],
    virtual: 'areaModel',
    diagram: 'areaModel',
    interventions: {
      C: 'Build factor rectangles with color tiles',
      R: 'Draw factor trees and Venn diagrams for GCF/LCM',
      A: 'Use prime factorization and listing method'
    }
  },
  'coordinate plane': {
    physical: ['Graph paper','Coordinate grid mats','Sticky dots'],
    virtual: 'coordPlane',
    diagram: 'coordPlane',
    interventions: {
      C: 'Walk on floor grid to locate points physically',
      R: 'Plot points on coordinate plane from table of values',
      A: 'Identify and apply coordinate notation (x, y)'
    }
  },
  'locate and compare numbers': {
    physical: ['Number line','Decimal squares','Fraction bars'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Place physical markers on number line',
      R: 'Draw number line and mark positions',
      A: 'Compare using inequality symbols'
    }
  },
  'equivalence and representations': {
    physical: ['Fraction bars','Decimal squares','Pattern blocks'],
    virtual: 'fractionBar',
    diagram: 'fractionBar',
    interventions: {
      C: 'Match fraction bars that are the same length',
      R: 'Draw equivalent fractions side by side',
      A: 'Multiply/divide numerator and denominator by same factor'
    }
  },
  'representing and comparing rational numbers': {
    physical: ['Integer chips (two-color)','Number line','Zero pairs model'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Use two-color chips for zero pairs — add/remove pairs',
      R: 'Draw hops on number line showing direction and magnitude',
      A: 'Apply sign rules for operations'
    }
  },
  'applying rational numbers': {
    physical: ['Integer chips','Number line','Thermometer model'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Use chips to model addition/subtraction of integers',
      R: 'Draw number line showing hops and direction',
      A: 'Apply rules for adding/subtracting rational numbers'
    }
  },
  'mean median and range': {
    physical: ['Linking cubes','Number cards','Balance point model'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Stack cubes to represent each data point, level to find mean',
      R: 'Order values on number line, identify middle',
      A: 'Calculate mean, median, range using formulas'
    }
  },
  'rational irrational and real numbers': {
    physical: ['Number line','Square tiles','Calculator'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Build square arrays to understand perfect squares',
      R: 'Locate sqrt values on number line between integers',
      A: 'Simplify radicals and classify as rational/irrational'
    }
  },
  'pythagorean theorem': {
    physical: ['Grid paper','Square tiles','Right triangle cut-outs'],
    virtual: 'rightTriangle',
    diagram: 'rightTriangle',
    interventions: {
      C: 'Build squares on each side of right triangle with tiles',
      R: 'Draw labeled right triangle with a² + b² = c²',
      A: 'Solve for missing side using the theorem'
    }
  },
  'solve equations inequalities and systems': {
    physical: ['Algebra tiles','Balance scale','Equation mats'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Model multi-step equations on balance — do same to both sides',
      R: 'Draw step-by-step solving with bar model',
      A: 'Solve algebraically showing inverse operation steps'
    }
  },
  'quadratic functions': {
    physical: ['Algebra tiles','Graph paper','Parabola templates'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Build area models with algebra tiles for factoring',
      R: 'Plot parabola from table of values on coordinate plane',
      A: 'Apply quadratic formula and identify vertex form'
    }
  },
  'polynomial operations': {
    physical: ['Algebra tiles','Area model grid'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Combine algebra tiles by matching like terms',
      R: 'Draw area model for polynomial multiplication',
      A: 'Apply distributive property and combine like terms'
    }
  },
  'exponential and logarithmic functions': {
    physical: ['Calculator','Folding paper','Growth/decay charts'],
    virtual: 'coordPlane',
    diagram: 'coordPlane',
    interventions: {
      C: 'Fold paper to demonstrate exponential doubling',
      R: 'Plot exponential growth/decay on coordinate plane',
      A: 'Convert between exponential and logarithmic forms'
    }
  },
  'proportional relationships': {
    physical: ['Ratio tables','Graph paper','Measuring tools'],
    virtual: 'coordPlane',
    diagram: 'coordPlane',
    interventions: {
      C: 'Measure real objects and record in ratio table',
      R: 'Plot points on coordinate plane — check for straight line through origin',
      A: 'Identify constant of proportionality k in y = kx'
    }
  },
  'expressions and equations': {
    physical: ['Algebra tiles','Balance scale','Equation mats'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Model equation with algebra tiles — keep both sides balanced',
      R: 'Draw tape diagram or bar model for word problems',
      A: 'Solve using inverse operations step-by-step'
    }
  },
  'circumference and area of circles': {
    physical: ['String/rope','Compass','Grid paper','Circular objects'],
    virtual: 'circle',
    diagram: 'circle',
    interventions: {
      C: 'Wrap string around circular objects, compare to diameter',
      R: 'Draw labeled circle with radius, diameter, and pi relationship',
      A: 'Apply C = 2 pi r and A = pi r^2 formulas'
    }
  },
  'similarity and scaling': {
    physical: ['Geoboards','Grid paper','Rulers','Protractors'],
    virtual: 'similarShapes',
    diagram: 'similarShapes',
    interventions: {
      C: 'Build shapes on geoboard, measure corresponding sides',
      R: 'Draw two shapes with labeled scale factor',
      A: 'Set up proportions and apply area/volume scaling rules'
    }
  },
  'real number system': {
    physical: ['Number line','Square tiles','Calculator'],
    virtual: 'numberLine',
    diagram: 'numberLine',
    interventions: {
      C: 'Build square arrays to understand perfect squares',
      R: 'Locate sqrt values on number line between integers',
      A: 'Simplify radicals and classify numbers as rational/irrational'
    }
  },
  'linear functions': {
    physical: ['Graph paper','Slope triangles cut-outs','Rate cards'],
    virtual: 'coordPlane',
    diagram: 'coordPlane',
    interventions: {
      C: 'Build rise/run with physical slope triangles on poster',
      R: 'Plot table of values and draw line on coordinate plane',
      A: 'Write equation in y = mx + b form from any representation'
    }
  },
  'solving equations': {
    physical: ['Algebra tiles','Balance scale','Equation mats'],
    virtual: 'algebraTiles',
    diagram: 'algebraTiles',
    interventions: {
      C: 'Model equation with algebra tiles — do same to both sides',
      R: 'Draw step-by-step solving with bar model',
      A: 'Solve algebraically showing inverse operation steps'
    }
  },
  'right triangle trigonometry': {
    physical: ['Protractor','Clinometer','Right triangle cut-outs'],
    virtual: 'rightTriangle',
    diagram: 'rightTriangle',
    interventions: {
      C: 'Measure actual right triangles — compute ratios with calculator',
      R: 'Draw labeled triangle with opp/adj/hyp relative to angle',
      A: 'Apply SOH-CAH-TOA to solve for missing sides/angles'
    }
  },
  'geometric proofs and reasoning': {
    physical: ['Protractor','Tracing paper','Triangle cut-outs','Parallel line models'],
    virtual: 'rightTriangle',
    diagram: 'rightTriangle',
    interventions: {
      C: 'Trace and overlay triangles to check congruence physically',
      R: 'Mark congruent parts on diagram with tick marks',
      A: 'Write formal proof using given → prove structure'
    }
  },
  'circles and transformations': {
    physical: ['Compass','Tracing paper','Coordinate grid mats','Mirror/MIRA'],
    virtual: 'coordPlane',
    diagram: 'coordPlane',
    interventions: {
      C: 'Use tracing paper to perform reflections/rotations physically',
      R: 'Plot original and image on coordinate plane',
      A: 'Apply transformation rules: (x,y) -> (-y,x) for 90 deg rotation'
    }
  },
  // Aliases for quiz-builder DB topic names
  'ratios and proportions': {
    physical: ['Two-color counters','Ratio tables','Tape diagrams'],
    virtual: 'numberLine', diagram: 'numberLine',
    interventions: { C: 'Set up physical groups of counters in ratio arrangement', R: 'Draw double number line or ratio table', A: 'Set up and cross-multiply proportions' }
  },
  'rational number operations': {
    physical: ['Integer chips (two-color)','Number line','Zero pairs model'],
    virtual: 'numberLine', diagram: 'numberLine',
    interventions: { C: 'Use two-color chips for zero pairs', R: 'Draw hops on number line showing direction and magnitude', A: 'Apply sign rules for operations' }
  },
  'percent concepts': {
    physical: ['10x10 grids','Fraction circles','Percent bars'],
    virtual: 'areaModel', diagram: 'areaModel',
    interventions: { C: 'Shade 10x10 grid to show percent visually', R: 'Draw percent bar model connecting fraction/decimal/percent', A: 'Calculate with decimal equivalents: part = rate × whole' }
  },
  'algebraic expressions': {
    physical: ['Algebra tiles','Balance scale','Cups and counters'],
    virtual: 'numberLine', diagram: 'numberLine',
    interventions: { C: 'Model expression with algebra tiles', R: 'Draw balance scale with variable and constants', A: 'Simplify using distributive property and combine like terms' }
  }
};

// ── TOPIC NAME ALIASES ──────────────────────────────────
// Maps between worksheet-generator and quiz-builder topic naming
const TOPIC_ALIASES = {
  'ratios and rates': 'ratios and proportions',
  'ratios and proportions': 'ratios and rates',
  'percent': 'percent concepts',
  'percent concepts': 'percent',
  'multiplication and division of fractions': 'fraction operations',
  'expressions and patterns': 'algebraic expressions',
  'algebraic expressions': 'expressions and patterns',
  'representing and comparing rational numbers': 'rational numbers',
  'rational numbers': 'representing and comparing rational numbers',
  'applying rational numbers': 'operations with rational numbers',
  'operations with rational numbers': 'applying rational numbers',
  'rational number operations': 'multiplication and division of fractions',
  'rational irrational and real numbers': 'real number system',
  'real number system': 'rational irrational and real numbers',
  'pythagorean theorem': 'real number system',
  'solve equations inequalities and systems': 'solving equations',
  'solving equations': 'solve equations inequalities and systems',
  'expressions and equations': 'expressions and patterns',
  'linear functions': 'proportional relationships',
  'locate and compare numbers': 'place value and decimals'
};

// Resolve a topic name against a problem DB — try exact first, then alias
function resolveTopicInDB(topicName, problemDB) {
  if (problemDB[topicName]) return topicName;
  const alias = TOPIC_ALIASES[topicName];
  if (alias && problemDB[alias]) return alias;
  return null;
}

// ── PROBLEM SELECTION WITH BIAS ──────────────────────────
function selectProblemsWithBias(topic, grade, count, dokFilter, problemDB) {
  // Get current topic problems — resolve alias if needed
  const resolvedTopic = resolveTopicInDB(topic, problemDB);
  if (!resolvedTopic) return [];
  const data = problemDB[resolvedTopic];

  let currentPool = [];
  dokFilter.forEach(dk => {
    const level = typeof dk === 'number' ? dk : (dk === 'dok1' ? 1 : dk === 'dok2' ? 2 : 3);
    const key = 'dok' + level;
    (data[key] || []).forEach(p => currentPool.push({
      ...p, dok: level, source: 'current', sourceTopic: resolvedTopic, sourceGrade: grade,
      craStage: getCRAStage(level, resolvedTopic)
    }));
  });

  // Get prerequisite problems — resolve names against the DB
  const chain = PREREQUISITE_CHAINS[topic] || PREREQUISITE_CHAINS[resolvedTopic];
  let prereqPool = [];
  if (chain) {
    chain.prereqTopics.forEach(prereqTopic => {
      const resolved = resolveTopicInDB(prereqTopic, problemDB);
      if (resolved) {
        const prereqData = problemDB[resolved];
        // Pull DOK 1 from prerequisites — foundational check
        (prereqData.dok1 || []).forEach(p => prereqPool.push({
          ...p, dok: 1, source: 'prereq', sourceTopic: resolved,
          sourceGrade: prereqData.grade || chain.prereqGrade,
          craStage: getCRAStage(1, resolved)
        }));
      }
    });
  }

  // Shuffle pools
  shuffle(prereqPool);
  shuffle(currentPool);

  // Apply 50% prerequisite bias (capped by available prereqs)
  const prereqCount = Math.min(Math.floor(count * 0.5), prereqPool.length);
  const currentCount = count - prereqCount;

  // Within current topic: 50% DOK 1 bias
  const dok1Current = currentPool.filter(p => p.dok === 1);
  const otherCurrent = currentPool.filter(p => p.dok !== 1);
  const dok1Target = Math.floor(currentCount * 0.5);
  const dok1Select = dok1Current.slice(0, Math.min(dok1Target, dok1Current.length));
  const remainCount = currentCount - dok1Select.length;
  const otherSelect = otherCurrent.slice(0, remainCount);

  // If not enough current problems, backfill
  let backfill = [];
  if (dok1Select.length + otherSelect.length < currentCount) {
    const used = new Set([...dok1Select, ...otherSelect].map(p => p.stem));
    backfill = currentPool.filter(p => !used.has(p.stem)).slice(0, currentCount - dok1Select.length - otherSelect.length);
  }

  const prereqSelect = prereqPool.slice(0, prereqCount);
  const combined = shuffle([...dok1Select, ...otherSelect, ...backfill, ...prereqSelect]);

  // Number them
  combined.forEach((p, i) => p.num = i + 1);
  return combined;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── DIAGRAM ENGINE ───────────────────────────────────────
const VINCULUMDiagram = {
  themes: {
    neon: { bg:'#050507', grid:'rgba(0,242,255,0.08)', line:'#00f2ff', fill:'rgba(0,242,255,0.15)', label:'#e8edf5', accent:'#bc13fe', green:'#10b981', dim:'rgba(255,255,255,0.3)' },
    print: { bg:'#ffffff', grid:'#e8e8e8', line:'#1e2761', fill:'rgba(30,39,97,0.1)', label:'#333333', accent:'#6b21a8', green:'#059669', dim:'#999999' }
  },

  render(canvas, type, params, themeName) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const t = this.themes[themeName || 'neon'];
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, w, h);

    if (this[type]) this[type](ctx, w, h, params || {}, t);
  },

  // Number Line
  numberLine(ctx, w, h, p, t) {
    const min = p.min ?? -5, max = p.max ?? 5;
    const points = p.points || [];
    const pad = 40, lineY = h * 0.55;
    const range = max - min;
    const xFor = v => pad + ((v - min) / range) * (w - 2 * pad);

    // Axis
    ctx.strokeStyle = t.line; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pad, lineY); ctx.lineTo(w - pad, lineY); ctx.stroke();
    // Arrow tips
    ctx.beginPath(); ctx.moveTo(w - pad, lineY); ctx.lineTo(w - pad - 8, lineY - 5); ctx.lineTo(w - pad - 8, lineY + 5); ctx.closePath(); ctx.fillStyle = t.line; ctx.fill();
    ctx.beginPath(); ctx.moveTo(pad, lineY); ctx.lineTo(pad + 8, lineY - 5); ctx.lineTo(pad + 8, lineY + 5); ctx.closePath(); ctx.fill();

    // Ticks
    ctx.font = '10px "Fira Code", monospace';
    ctx.fillStyle = t.dim; ctx.textAlign = 'center';
    for (let v = min; v <= max; v++) {
      const x = xFor(v);
      ctx.strokeStyle = t.grid; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, lineY - 6); ctx.lineTo(x, lineY + 6); ctx.stroke();
      ctx.fillText(v, x, lineY + 20);
    }

    // Points
    points.forEach(pt => {
      const x = xFor(pt.value);
      ctx.fillStyle = pt.color || t.accent;
      ctx.beginPath(); ctx.arc(x, lineY, 6, 0, Math.PI * 2); ctx.fill();
      if (pt.label) {
        ctx.fillStyle = t.label; ctx.font = 'bold 11px "Fira Code"';
        ctx.fillText(pt.label, x, lineY - 14);
      }
    });
  },

  // Coordinate Plane
  coordPlane(ctx, w, h, p, t) {
    const xR = p.xRange || [-6, 6], yR = p.yRange || [-6, 6];
    const ox = w * 0.5, oy = h * 0.5;
    const sx = (w - 60) / (xR[1] - xR[0]), sy = (h - 60) / (yR[1] - yR[0]);
    const toX = v => ox + v * sx, toY = v => oy - v * sy;

    // Grid
    ctx.strokeStyle = t.grid; ctx.lineWidth = 0.5;
    for (let x = xR[0]; x <= xR[1]; x++) {
      ctx.beginPath(); ctx.moveTo(toX(x), 20); ctx.lineTo(toX(x), h - 20); ctx.stroke();
    }
    for (let y = yR[0]; y <= yR[1]; y++) {
      ctx.beginPath(); ctx.moveTo(20, toY(y)); ctx.lineTo(w - 20, toY(y)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = t.line; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(20, toY(0)); ctx.lineTo(w - 20, toY(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toX(0), 20); ctx.lineTo(toX(0), h - 20); ctx.stroke();

    // Axis labels
    ctx.font = '9px "Fira Code"'; ctx.fillStyle = t.dim; ctx.textAlign = 'center';
    for (let x = xR[0]; x <= xR[1]; x++) if (x !== 0) ctx.fillText(x, toX(x), toY(0) + 14);
    ctx.textAlign = 'right';
    for (let y = yR[0]; y <= yR[1]; y++) if (y !== 0) ctx.fillText(y, toX(0) - 6, toY(y) + 4);

    // Points
    (p.points || []).forEach(pt => {
      ctx.fillStyle = pt.color || t.accent;
      ctx.beginPath(); ctx.arc(toX(pt.x), toY(pt.y), 5, 0, Math.PI * 2); ctx.fill();
      if (pt.label) {
        ctx.fillStyle = t.label; ctx.font = 'bold 10px "Fira Code"';
        ctx.fillText(pt.label, toX(pt.x) + 8, toY(pt.y) - 8);
      }
    });

    // Lines
    (p.lines || []).forEach(ln => {
      ctx.strokeStyle = ln.color || t.green; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toX(ln.x1), toY(ln.y1)); ctx.lineTo(toX(ln.x2), toY(ln.y2));
      ctx.stroke();
    });
  },

  // Circle with labels
  circle(ctx, w, h, p, t) {
    const cx = w * 0.5, cy = h * 0.5;
    const r = Math.min(w, h) * 0.32;
    const radius = p.radius || 5;

    // Circle
    ctx.strokeStyle = t.line; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = t.fill;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    // Center dot
    ctx.fillStyle = t.accent;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

    // Radius line
    if (p.showRadius !== false) {
      ctx.strokeStyle = t.green; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.fillStyle = t.green; ctx.font = 'bold 12px "Fira Code"';
      ctx.textAlign = 'center';
      ctx.fillText('r = ' + radius, cx + r * 0.5, cy - 10);
    }

    // Diameter
    if (p.showDiameter) {
      ctx.strokeStyle = t.accent; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = t.accent; ctx.font = '11px "Fira Code"';
      ctx.fillText('d = ' + (radius * 2), cx, cy + r * 0.3 + 14);
    }

    // Circumference label
    ctx.fillStyle = t.label; ctx.font = '10px "Fira Code"'; ctx.textAlign = 'center';
    ctx.fillText('C = 2\u03C0r', cx, h - 12);
  },

  // Rectangular Prism (3D)
  rectPrism(ctx, w, h, p, t) {
    const l = p.l || 5, wd = p.w || 3, ht = p.h || 4;
    const scale = Math.min(w, h) * 0.08;
    const ox = w * 0.3, oy = h * 0.7;
    const dx = 15, dy = -12; // isometric offset per unit depth

    const pts = [
      [ox, oy], [ox + l * scale, oy], // front bottom
      [ox + l * scale, oy - ht * scale], [ox, oy - ht * scale], // front top
      [ox + wd * dx, oy + wd * dy], [ox + l * scale + wd * dx, oy + wd * dy], // back bottom
      [ox + l * scale + wd * dx, oy - ht * scale + wd * dy], [ox + wd * dx, oy - ht * scale + wd * dy] // back top
    ];

    // Fill faces
    ctx.fillStyle = t.fill;
    // Front
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[3][0], pts[3][1]); ctx.closePath(); ctx.fill();
    // Top
    ctx.fillStyle = 'rgba(0,242,255,0.08)';
    ctx.beginPath(); ctx.moveTo(pts[3][0], pts[3][1]); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[6][0], pts[6][1]); ctx.lineTo(pts[7][0], pts[7][1]); ctx.closePath(); ctx.fill();
    // Side
    ctx.fillStyle = 'rgba(188,19,254,0.1)';
    ctx.beginPath(); ctx.moveTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[5][0], pts[5][1]); ctx.lineTo(pts[6][0], pts[6][1]); ctx.lineTo(pts[2][0], pts[2][1]); ctx.closePath(); ctx.fill();

    // Edges
    ctx.strokeStyle = t.line; ctx.lineWidth = 2;
    [[0,1],[1,2],[2,3],[3,0],[1,5],[5,6],[6,2],[5,4],[4,7],[7,3],[7,6]].forEach(([a,b]) => {
      ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke();
    });
    // Hidden edge
    ctx.strokeStyle = t.dim; ctx.setLineDash([3,3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[4][0], pts[4][1]); ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = t.green; ctx.font = 'bold 12px "Fira Code"'; ctx.textAlign = 'center';
    ctx.fillText('l=' + l, (pts[0][0] + pts[1][0]) / 2, pts[0][1] + 18);
    ctx.fillStyle = t.accent;
    ctx.fillText('h=' + ht, pts[0][0] - 18, (pts[0][1] + pts[3][1]) / 2);
    ctx.fillStyle = t.line;
    ctx.fillText('w=' + wd, (pts[1][0] + pts[5][0]) / 2 + 10, (pts[1][1] + pts[5][1]) / 2 - 8);
  },

  // Fraction Bars
  fractionBar(ctx, w, h, p, t) {
    const fractions = p.fractions || [{num:1,den:3},{num:1,den:4}];
    const barW = w - 60, barH = 30, startX = 30;
    let y = 30;

    fractions.forEach((frac, fi) => {
      const parts = frac.den;
      const shaded = frac.num;
      const partW = barW / parts;

      for (let i = 0; i < parts; i++) {
        const x = startX + i * partW;
        if (i < shaded) {
          ctx.fillStyle = fi === 0 ? t.fill : 'rgba(188,19,254,0.2)';
          ctx.fillRect(x, y, partW, barH);
        }
        ctx.strokeStyle = t.line; ctx.lineWidth = 1;
        ctx.strokeRect(x, y, partW, barH);
      }

      // Label
      ctx.fillStyle = t.label; ctx.font = 'bold 12px "Fira Code"'; ctx.textAlign = 'left';
      ctx.fillText(shaded + '/' + parts, startX + barW + 8, y + barH * 0.7);
      y += barH + 20;
    });

    // Comparison line
    if (fractions.length === 2) {
      const y1 = 30 + barH, y2 = y - 20;
      ctx.strokeStyle = t.accent; ctx.setLineDash([4,3]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(startX, (y1 + y2) / 2); ctx.lineTo(startX + barW, (y1 + y2) / 2); ctx.stroke();
      ctx.setLineDash([]);
    }
  },

  // Right Triangle with SOH-CAH-TOA labels
  rightTriangle(ctx, w, h, p, t) {
    const a = p.a || 3, b = p.b || 4;
    const c = Math.sqrt(a * a + b * b);
    const scale = Math.min(w * 0.7 / b, h * 0.65 / a);
    const ox = w * 0.25, oy = h * 0.78;

    // Triangle
    ctx.fillStyle = t.fill;
    ctx.beginPath();
    ctx.moveTo(ox, oy); ctx.lineTo(ox + b * scale, oy); ctx.lineTo(ox, oy - a * scale);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = t.line; ctx.lineWidth = 2.5; ctx.stroke();

    // Right angle square
    const sq = 12;
    ctx.strokeStyle = t.dim; ctx.lineWidth = 1.5;
    ctx.strokeRect(ox, oy - sq, sq, sq);

    // Labels
    ctx.font = 'bold 12px "Fira Code"'; ctx.textAlign = 'center';
    ctx.fillStyle = t.green;
    ctx.fillText('a = ' + a, ox - 20, oy - a * scale * 0.5);
    ctx.fillStyle = t.line;
    ctx.fillText('b = ' + b, ox + b * scale * 0.5, oy + 18);
    ctx.fillStyle = t.accent;
    const mx = (ox + ox + b * scale) / 2, my = (oy + oy - a * scale) / 2;
    ctx.fillText('c = ' + (Number.isInteger(c) ? c : c.toFixed(1)), mx + 16, my - 6);

    // Angle label
    ctx.fillStyle = t.label; ctx.font = '11px "Fira Code"';
    ctx.fillText('\u03B8', ox + b * scale - 22, oy - 10);

    // Formula
    ctx.fillStyle = t.dim; ctx.font = '10px "Fira Code"'; ctx.textAlign = 'center';
    ctx.fillText('a\u00B2 + b\u00B2 = c\u00B2', w * 0.5, h - 10);
  },

  // Algebra Tiles — visual equation balance with colored tiles
  algebraTiles(ctx, w, h, p, t) {
    const left = p.left || { xCount: 0, ones: 0 };
    const right = p.right || { xCount: 0, ones: 0 };
    const pad = 20;
    const midX = w / 2;

    // Colors matching vinculum-tiles.js conventions
    const xPosGrad = ['#42a5f5', '#1e88e5'];  // blue for +x
    const xNegGrad = ['#ef5350', '#c62828'];   // red for -x
    const onePos   = ['#ffee58', '#fdd835'];   // yellow for +1
    const oneNeg   = ['#ef5350', '#c62828'];   // red for -1

    // Tile sizes
    const tileW = 28, tileH = 36;   // x tiles are taller
    const unitS = 22;                // unit tiles are square
    const gap = 4;
    const MAX_TILES = 15;

    // Title
    ctx.fillStyle = t.label; ctx.font = 'bold 11px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ALGEBRA TILE MODEL', midX, 16);

    // Equals sign divider
    ctx.strokeStyle = t.dim; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(midX, 28); ctx.lineTo(midX, h - 10); ctx.stroke();
    ctx.fillStyle = t.accent; ctx.font = 'bold 18px "Fira Code"';
    ctx.fillText('=', midX, h / 2 + 6);

    // Helper: draw a single tile
    function drawTile(x, y, w, h, grad, label) {
      const grd = ctx.createLinearGradient(x, y, x + w, y + h);
      grd.addColorStop(0, grad[0]); grd.addColorStop(1, grad[1]);
      ctx.fillStyle = grd;
      // Rounded rect
      const r = 4;
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1; ctx.stroke();
      // Label
      ctx.fillStyle = '#111'; ctx.font = 'bold 11px "Fira Code"'; ctx.textAlign = 'center';
      ctx.fillText(label, x + w / 2, y + h / 2 + 4);
    }

    // Helper: draw one side's tiles
    function drawSide(side, regionX, regionW) {
      let curX = regionX + 8;
      let curY = 30;
      const maxW = regionW - 16;

      // x tiles (positive)
      const posX = Math.max(0, side.xCount);
      const drawPosX = Math.min(posX, MAX_TILES);
      for (let i = 0; i < drawPosX; i++) {
        if (curX + tileW > regionX + regionW - 8) { curX = regionX + 8; curY += tileH + gap; }
        drawTile(curX, curY, tileW, tileH, xPosGrad, 'x');
        curX += tileW + gap;
      }
      if (posX > MAX_TILES) {
        ctx.fillStyle = t.label; ctx.font = '9px "Fira Code"'; ctx.textAlign = 'left';
        ctx.fillText('(' + posX + 'x total)', regionX + 8, curY + tileH + 12);
        curY += 14;
      }

      // x tiles (negative)
      const negX = Math.max(0, -side.xCount);
      const drawNegX = Math.min(negX, MAX_TILES);
      if (drawNegX > 0) { curX = regionX + 8; curY += tileH + gap + 4; }
      for (let i = 0; i < drawNegX; i++) {
        if (curX + tileW > regionX + regionW - 8) { curX = regionX + 8; curY += tileH + gap; }
        drawTile(curX, curY, tileW, tileH, xNegGrad, '\u2212x');
        curX += tileW + gap;
      }

      // Unit tiles (positive)
      const posOnes = Math.max(0, side.ones);
      const drawPosOnes = Math.min(posOnes, MAX_TILES);
      if (drawPosOnes > 0) { curX = regionX + 8; curY += (negX > 0 || posX > 0 ? tileH + gap + 4 : 0); }
      for (let i = 0; i < drawPosOnes; i++) {
        if (curX + unitS > regionX + regionW - 8) { curX = regionX + 8; curY += unitS + gap; }
        drawTile(curX, curY, unitS, unitS, onePos, '1');
        curX += unitS + gap;
      }
      if (posOnes > MAX_TILES) {
        ctx.fillStyle = t.label; ctx.font = '9px "Fira Code"'; ctx.textAlign = 'left';
        ctx.fillText('(' + posOnes + ' units)', regionX + 8, curY + unitS + 12);
      }

      // Unit tiles (negative)
      const negOnes = Math.max(0, -side.ones);
      const drawNegOnes = Math.min(negOnes, MAX_TILES);
      if (drawNegOnes > 0) { curX = regionX + 8; curY += unitS + gap + 4; }
      for (let i = 0; i < drawNegOnes; i++) {
        if (curX + unitS > regionX + regionW - 8) { curX = regionX + 8; curY += unitS + gap; }
        drawTile(curX, curY, unitS, unitS, oneNeg, '\u22121');
        curX += unitS + gap;
      }
    }

    // Draw left side
    drawSide(left, pad, midX - pad - 14);
    // Draw right side
    drawSide(right, midX + 14, w - midX - pad - 14);

    // Legend bar at bottom
    const legY = h - 14;
    ctx.font = '9px "Fira Code"'; ctx.textAlign = 'center'; ctx.fillStyle = t.dim;
    ctx.fillText('\u25A0 x (blue)   \u25A0 +1 (yellow)   \u25A0 negative (red)', midX, legY);
  },

  // Area Model (10x10 grid for percents or multiplication)
  areaModel(ctx, w, h, p, t) {
    const rows = p.rows || 10, cols = p.cols || 10;
    const shaded = p.shaded || 25;
    const pad = 30;
    const cellW = (w - 2 * pad) / cols, cellH = (h - 2 * pad - 20) / rows;

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = pad + c * cellW, y = pad + r * cellH;
        if (count < shaded) {
          ctx.fillStyle = t.fill;
          ctx.fillRect(x, y, cellW, cellH);
        }
        ctx.strokeStyle = t.grid; ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, cellW, cellH);
        count++;
      }
    }

    // Border
    ctx.strokeStyle = t.line; ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, cols * cellW, rows * cellH);

    // Label
    const pct = Math.round(shaded / (rows * cols) * 100);
    ctx.fillStyle = t.label; ctx.font = 'bold 13px "Fira Code"'; ctx.textAlign = 'center';
    ctx.fillText(shaded + '/' + (rows * cols) + ' = ' + pct + '%', w / 2, h - 10);
  }
};

// ── TEACHER PANEL RENDERER ───────────────────────────────
function renderTeacherPanel(containerId, topic, grade, problems) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const manip = MANIPULATIVE_MAP[topic] || {};
  const chain = PREREQUISITE_CHAINS[topic];

  // Count CRA stages
  const craCounts = { C: 0, R: 0, A: 0 };
  const prereqCount = problems.filter(p => p.source === 'prereq').length;
  const dok1Count = problems.filter(p => p.dok === 1).length;
  problems.forEach(p => { if (p.craStage) craCounts[p.craStage]++; });
  const total = problems.length || 1;

  // Get unique prereq topics
  const prereqTopics = [...new Set(problems.filter(p => p.source === 'prereq').map(p => p.sourceTopic))];

  el.innerHTML = `
    <h3 style="font-size:15px;font-weight:900;margin-bottom:16px;background:linear-gradient(135deg,#00f2ff,#bc13fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Teacher Intervention Panel</h3>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px;">
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#bc13fe;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">CRA Distribution</div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
          <div style="flex:${craCounts.C};height:6px;background:#10b981;border-radius:3px;min-width:4px;"></div>
          <div style="flex:${craCounts.R};height:6px;background:#00f2ff;border-radius:3px;min-width:4px;"></div>
          <div style="flex:${craCounts.A};height:6px;background:#bc13fe;border-radius:3px;min-width:4px;"></div>
        </div>
        <div style="display:flex;gap:12px;font-size:11px;color:rgba(255,255,255,0.5);">
          <span><span style="color:#10b981;font-weight:700;">C</span> ${craCounts.C}</span>
          <span><span style="color:#00f2ff;font-weight:700;">R</span> ${craCounts.R}</span>
          <span><span style="color:#bc13fe;font-weight:700;">A</span> ${craCounts.A}</span>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px;">
        <div style="font-family:'Fira Code',monospace;font-size:9px;color:#fde047;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">Bias Analysis</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.8;">
          DOK 1: <span style="color:#10b981;font-weight:700;">${dok1Count}/${total}</span> (${Math.round(dok1Count/total*100)}%)<br>
          Prereq: <span style="color:#fde047;font-weight:700;">${prereqCount}/${total}</span> (${Math.round(prereqCount/total*100)}%)
        </div>
      </div>
    </div>

    ${prereqTopics.length ? `
    <div style="background:rgba(253,224,71,0.05);border:1px solid rgba(253,224,71,0.15);border-radius:8px;padding:12px;margin-bottom:16px;">
      <div style="font-family:'Fira Code',monospace;font-size:9px;color:#fde047;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">Prerequisite Gap Check</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);line-height:1.8;">
        Testing prior knowledge from:<br>
        ${prereqTopics.map(t => `<span style="color:#fde047;font-weight:600;">\u2022 ${t.charAt(0).toUpperCase() + t.slice(1)}</span> (Grade ${chain?.prereqGrade || '?'})`).join('<br>')}
        <div style="margin-top:8px;font-size:11px;color:rgba(255,255,255,0.4);font-style:italic;">
          If students miss these, revisit prerequisite skills before advancing.
        </div>
      </div>
    </div>` : ''}

    <div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:12px;margin-bottom:16px;">
      <div style="font-family:'Fira Code',monospace;font-size:9px;color:#10b981;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">Suggested Manipulatives</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.8;">
        <strong style="color:#10b981;">Physical:</strong> ${(manip.physical || ['None specified']).join(' \u2022 ')}<br>
      </div>
    </div>

    <div style="background:rgba(0,242,255,0.03);border:1px solid rgba(0,242,255,0.1);border-radius:8px;padding:12px;">
      <div style="font-family:'Fira Code',monospace;font-size:9px;color:#00f2ff;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:8px;">CRA Intervention Strategies</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);line-height:1.8;">
        ${manip.interventions ? Object.entries(manip.interventions).map(([stage, text]) => {
          const colors = { C:'#10b981', R:'#00f2ff', A:'#bc13fe' };
          return `<span style="color:${colors[stage]};font-weight:700;">[${stage}]</span> ${text}`;
        }).join('<br>') : 'No interventions specified.'}
      </div>
    </div>
  `;
}

// ── EQUATION PARSER (mirrors VinculumTiles.parse) ────────
function parseEquationSide(sideStr) {
  const s = sideStr.trim().replace(/[\u2212\u2013\u2014]/g, '-');
  let xCount = 0, ones = 0;
  // Handle distributive: "3(x + 2)"
  const distMatch = s.match(/^(-?\d+)\(x\s*([+\-])\s*(\d+)\)$/);
  if (distMatch) {
    const coeff = parseInt(distMatch[1]);
    const sign = distMatch[2] === '+' ? 1 : -1;
    return { xCount: coeff, ones: coeff * sign * parseInt(distMatch[3]) };
  }
  const tokens = s.replace(/\s/g, '').match(/[+\-]?[^+\-]+/g) || [];
  for (const t of tokens) {
    if (!t) continue;
    if (t.indexOf('x') !== -1) {
      const xStr = t.replace('x', '');
      if (xStr === '' || xStr === '+') xCount += 1;
      else if (xStr === '-') xCount -= 1;
      else xCount += parseInt(xStr);
    } else {
      ones += parseInt(t);
    }
  }
  return { xCount, ones };
}

function parseEquation(eqStr) {
  const parts = eqStr.split('=');
  if (parts.length !== 2) return null;
  return { left: parseEquationSide(parts[0]), right: parseEquationSide(parts[1]) };
}

// Detect if a problem stem contains an equation suitable for tile rendering
function detectEquationInStem(stem) {
  // Normalize Unicode minus (U+2212), en-dash, em-dash to ASCII hyphen
  const s = stem.replace(/[\u2212\u2013\u2014]/g, '-');
  // Match patterns like "3x + 5 = 20", "2x - 7 = 13", "x + 4 = 10", "-3x + 2 = -7"
  const eqMatch = s.match(/(-?\d*x\s*[+\-]\s*\d+\s*=\s*-?\d+)/i) ||
                  s.match(/(-?\d+\s*=\s*-?\d*x\s*[+\-]\s*\d+)/i) ||
                  s.match(/(-?\d*x\s*=\s*-?\d+)/i) ||
                  s.match(/(-?\d*x\s*[+\-]\s*\d*x?\s*=\s*-?\d*x?\s*[+\-]?\s*\d*)/i);
  if (eqMatch) return eqMatch[1].trim();
  // Fallback: any string with x and = sign
  if (/\dx/.test(s) && s.includes('=')) {
    const eqPart = s.match(/([^.;:,]*\bx\b[^.;:,]*=[^.;:,]*)/);
    if (eqPart) return eqPart[1].trim();
  }
  return null;
}

// ── AUTO-DETECT DIAGRAM PARAMS FROM PROBLEM STEM ─────────
function detectDiagramParams(problem, topic) {
  const stem = problem.stem || '';
  const manip = MANIPULATIVE_MAP[topic];
  if (!manip || !manip.diagram) return null;

  let type = manip.diagram;
  const params = {};

  // For equation-related topics, check if stem has an equation → use algebraTiles
  if (type === 'algebraTiles' || type === 'balanceScale') {
    const eqStr = detectEquationInStem(stem);
    if (eqStr) {
      const parsed = parseEquation(eqStr);
      if (parsed) {
        return { type: 'algebraTiles', params: { left: parsed.left, right: parsed.right } };
      }
    }
    // If no equation detected but topic is equation-based, try numberLine fallback
    if (type === 'balanceScale') type = 'numberLine';
  }

  // For any topic, also check if stem contains an equation and CRA stage is Concrete
  if (problem.craStage === 'C' && type !== 'algebraTiles') {
    const eqStr = detectEquationInStem(stem);
    if (eqStr) {
      const parsed = parseEquation(eqStr);
      if (parsed) return { type: 'algebraTiles', params: { left: parsed.left, right: parsed.right } };
    }
  }

  // Extract numbers from stem
  const nums = stem.match(/\d+\.?\d*/g)?.map(Number) || [];

  switch (type) {
    case 'numberLine':
      params.min = Math.min(-5, ...nums.map(n => Math.floor(n) - 2));
      params.max = Math.max(5, ...nums.map(n => Math.ceil(n) + 2));
      params.points = nums.slice(0, 3).map((n, i) => ({ value: n, label: String(n), color: i === 0 ? '#00f2ff' : '#bc13fe' }));
      break;
    case 'coordPlane':
      params.xRange = [-6, 6]; params.yRange = [-6, 6];
      // Try to parse coordinate pairs
      const coordMatch = stem.match(/\((-?\d+),\s*(-?\d+)\)/g);
      if (coordMatch) {
        params.points = coordMatch.map((c, i) => {
          const [, x, y] = c.match(/\((-?\d+),\s*(-?\d+)\)/);
          return { x: +x, y: +y, label: String.fromCharCode(65 + i), color: i === 0 ? '#00f2ff' : '#bc13fe' };
        });
      }
      break;
    case 'circle':
      params.radius = nums[0] || 5;
      params.showRadius = true;
      params.showDiameter = stem.includes('diameter');
      break;
    case 'rectPrism':
      params.l = nums[0] || 5; params.w = nums[1] || 3; params.h = nums[2] || 4;
      break;
    case 'fractionBar':
      const fracMatch = stem.match(/(\d+)\/(\d+)/g);
      if (fracMatch) {
        params.fractions = fracMatch.slice(0, 2).map(f => {
          const [n, d] = f.split('/').map(Number);
          return { num: n, den: d };
        });
      } else {
        params.fractions = [{ num: 1, den: 3 }, { num: 1, den: 4 }];
      }
      break;
    case 'rightTriangle':
      params.a = nums[0] || 3; params.b = nums[1] || 4;
      break;
    case 'areaModel':
      params.rows = 10; params.cols = 10;
      params.shaded = nums[0] || 25;
      if (params.shaded > 100) params.shaded = 25;
      break;
    case 'algebraTiles':
      // Already handled above, but fallback
      params.left = { xCount: 1, ones: 0 };
      params.right = { xCount: 0, ones: 5 };
      break;
    default:
      return null;
  }

  return { type, params };
}

// ── EXPOSE API ───────────────────────────────────────────
window.VINCULUMcra = {
  PREREQUISITE_CHAINS,
  MANIPULATIVE_MAP,
  CRA_TOPIC_STAGES,
  TOPIC_ALIASES,
  getCRAStage,
  selectProblemsWithBias,
  resolveTopicInDB,
  renderTeacherPanel,
  detectDiagramParams,
  parseEquation,
  detectEquationInStem,
  Diagram: VINCULUMDiagram
};

})(window);
