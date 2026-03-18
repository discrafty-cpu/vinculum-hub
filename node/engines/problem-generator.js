/**
 * ProblemGenerator v3.0 — Client-side parametric math problem generation
 *
 * Layered data sources (checked in order):
 *   1. JSON database at /data/problems/grade-{N}.json (fetched async on first use)
 *   2. window.DOK_PROBLEMS global (from leveled-problems-data.js, backward-compat)
 *   3. Generic arithmetic fallback (last resort)
 *
 * Each returned problem now includes benchmark metadata and CRA mode:
 *   { stem, answer, hint, dok, mode?, context?, benchmarkCodes?, clusterKey?, clusterLabel? }
 *
 * CRA Modes (Concrete → Representational → Abstract):
 *   - "concrete"        : manipulatives, physical objects, emoji, real-world items
 *   - "representational" : diagrams, number lines, bar models, tables, graphs
 *   - "abstract"         : symbolic equations, expressions, formal notation
 *
 * Context Tags:
 *   - "universal" : diverse modern contexts (cooking, sports, nature, community)
 *   - "minnesota" : Minnesota-relevant contexts (lakes, state fair, winter)
 *
 * IIFE pattern with zero external dependencies.
 */

const ProblemGenerator = (() => {
  // ============================================================================
  // INTERNAL STATE
  // ============================================================================

  /** Cache of loaded JSON data: { [grade]: { topics: { [topicName]: { dok1, dok2, dok3, benchmarkCodes, ... } } } } */
  const _jsonCache = {};

  /** Whether we've attempted to fetch a given grade's JSON */
  const _fetchAttempted = {};

  // ============================================================================
  // INTERNAL HELPERS
  // ============================================================================

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const randomChoice = (arr) => {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const varyNumber = (n, range) => {
    const shift = randomInt(-range, range);
    return Math.max(1, n + shift);
  };

  const extractNumbers = (text) => {
    const matches = text.match(/\d+(?:\.\d+)?/g) || [];
    return matches.map(m => parseFloat(m)).filter(n => !isNaN(n));
  };

  // ============================================================================
  // DATA LOADING — layered lookup
  // ============================================================================

  /**
   * Synchronously fetch a JSON file (data: URLs work in browser via XMLHttpRequest).
   * Returns parsed JSON or null on failure.
   */
  const fetchJSONSync = (url) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false); // synchronous
      xhr.send();
      if (xhr.status === 200) return JSON.parse(xhr.responseText);
    } catch (e) {
      // Silently fail — will use fallback layers
    }
    return null;
  };

  /**
   * Get the JSON database entry for a grade.
   * Fetches once, caches, returns cached on subsequent calls.
   */
  const getJSONForGrade = (grade) => {
    if (_jsonCache[grade]) return _jsonCache[grade];
    if (_fetchAttempted[grade]) return null;

    _fetchAttempted[grade] = true;

    // Try to load from data directory (relative to webapp root)
    const data = fetchJSONSync(`data/problems/grade-${grade}.json`);
    if (data && data.topics) {
      _jsonCache[grade] = data;
      return data;
    }
    return null;
  };

  /**
   * Resolve a topic name to its problem data using the layered strategy.
   * Returns: { dok1, dok2, dok3, benchmarkCodes?, clusterKey?, clusterLabel? } or null
   *
   * Layer 1: JSON database (richest — includes benchmark metadata)
   * Layer 2: window.DOK_PROBLEMS (backward-compatible, no benchmark metadata)
   * Layer 3: null (triggers generic fallback in caller)
   */
  const resolveTopicData = (topic, gradeHint) => {
    // ── Layer 1: JSON database ──
    // Try all grades (or use hint) to find the topic
    const gradesToTry = gradeHint ? [gradeHint] : [6, 7, 8, 5, 9, 10, 11, 12, 4, 3, 2, 1, 'K'];
    for (const g of gradesToTry) {
      const gradeData = getJSONForGrade(g);
      if (gradeData && gradeData.topics) {
        // Exact match
        if (gradeData.topics[topic]) {
          return gradeData.topics[topic];
        }
        // Fuzzy match: check if topic is substring of any key or vice versa
        const tLower = topic.toLowerCase();
        for (const [key, data] of Object.entries(gradeData.topics)) {
          if (tLower.includes(key) || key.includes(tLower)) {
            return data;
          }
          // Word overlap (3+ letter words)
          const tWords = tLower.split(/\s+/);
          const kWords = key.split(/\s+/);
          const overlap = tWords.filter(w => w.length > 3 && kWords.includes(w));
          if (overlap.length >= 2) {
            return data;
          }
        }
      }
    }

    // ── Layer 2: window.DOK_PROBLEMS (legacy) ──
    if (window.DOK_PROBLEMS) {
      if (window.DOK_PROBLEMS[topic]) {
        const d = window.DOK_PROBLEMS[topic];
        return { dok1: d.dok1 || [], dok2: d.dok2 || [], dok3: d.dok3 || [] };
      }
      // Fuzzy match on legacy data
      const tLower = topic.toLowerCase();
      for (const [key, data] of Object.entries(window.DOK_PROBLEMS)) {
        if (tLower.includes(key) || key.includes(tLower)) {
          return { dok1: data.dok1 || [], dok2: data.dok2 || [], dok3: data.dok3 || [] };
        }
        const tWords = tLower.split(/\s+/);
        const kWords = key.split(/\s+/);
        const overlap = tWords.filter(w => w.length > 3 && kWords.includes(w));
        if (overlap.length >= 2) {
          return { dok1: data.dok1 || [], dok2: data.dok2 || [], dok3: data.dok3 || [] };
        }
      }
    }

    // ── Layer 3: not found ──
    return null;
  };

  // ============================================================================
  // PROBLEM GENERATION
  // ============================================================================

  /**
   * Generate a generic fallback problem when topic not found.
   * Marked with _generic: true so callers can detect fallback usage.
   */
  const generateGenericProblem = (dok) => {
    const operations = ['+', '-', '×', '÷'];
    const op = randomChoice(operations);
    let a, b, answer, stem;

    if (op === '+') {
      a = randomInt(1, 20);
      b = randomInt(1, 20);
      stem = `What is ${a} + ${b}?`;
      answer = a + b;
    } else if (op === '-') {
      a = randomInt(10, 30);
      b = randomInt(1, a - 1);
      stem = `What is ${a} - ${b}?`;
      answer = a - b;
    } else if (op === '×') {
      a = randomInt(2, 12);
      b = randomInt(2, 12);
      stem = `What is ${a} × ${b}?`;
      answer = a * b;
    } else {
      a = randomInt(2, 12);
      b = randomInt(2, 12);
      const product = a * b;
      stem = `What is ${product} ÷ ${b}?`;
      answer = a;
    }

    return {
      stem,
      answer: String(answer),
      hint: `Try ${op} the numbers`,
      dok,
      _generic: true
    };
  };

  /**
   * Generate a variation of a seed problem with different numbers.
   */
  const generateVariation = (problem, topic) => {
    const { stem, answer, hint } = problem;

    const stemNumbers = extractNumbers(stem);
    if (stemNumbers.length === 0) {
      return { stem, answer, hint, dok: 1 };
    }

    const newStemNumbers = stemNumbers.map(n => {
      if (n >= 2 && n <= 12 && Math.random() < 0.3) return randomInt(2, 12);
      if (n >= 0 && n <= 100 && String(stem).includes('%')) return randomInt(5, 95);
      const range = Math.max(1, Math.floor(n * 0.25));
      return varyNumber(n, range);
    });

    let newStem = stem;
    stemNumbers.forEach((oldNum, idx) => {
      const regex = new RegExp(`\\b${oldNum}\\b`, 'g');
      newStem = newStem.replace(regex, newStemNumbers[idx]);
    });

    let newAnswer = answer;
    const answerNumbers = extractNumbers(answer);
    if (answerNumbers.length > 0) {
      const newAnswerNumbers = answerNumbers.map(n => {
        const range = Math.max(1, Math.floor(n * 0.25));
        return varyNumber(n, range);
      });
      answerNumbers.forEach((oldNum, idx) => {
        const regex = new RegExp(`\\b${oldNum}\\b`, 'g');
        newAnswer = newAnswer.replace(regex, newAnswerNumbers[idx]);
      });
    }

    return { stem: newStem, answer: newAnswer, hint, dok: 1 };
  };

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  return {
    /**
     * Get problems for a specific topic and DOK level.
     * @param {string} topic - Topic name (e.g. 'ratios and rates')
     * @param {number} dok - 1, 2, or 3
     * @param {number} count - How many problems to return
     * @param {number} [gradeHint] - Optional grade to narrow JSON lookup
     * @returns {Array} Array of {stem, answer, hint, dok, benchmarkCodes?, clusterKey?}
     */
    forTopic(topic, dok, count, gradeHint) {
      const problems = [];
      const topicData = resolveTopicData(topic, gradeHint);

      if (!topicData) {
        for (let i = 0; i < count; i++) {
          problems.push(generateGenericProblem(dok));
        }
        return problems;
      }

      const dokKey = `dok${dok}`;
      const seedProblems = topicData[dokKey] || [];

      // Benchmark metadata to attach to each problem
      const meta = {};
      if (topicData.benchmarkCodes) meta.benchmarkCodes = topicData.benchmarkCodes;
      if (topicData.clusterKey) meta.clusterKey = topicData.clusterKey;
      if (topicData.clusterLabel) meta.clusterLabel = topicData.clusterLabel;
      if (topicData.primaryBenchmark) meta.primaryBenchmark = topicData.primaryBenchmark;

      // First, add seed problems (optionally filter by CRA mode)
      for (let i = 0; i < Math.min(seedProblems.length, count); i++) {
        const seed = seedProblems[i];
        problems.push({
          stem: seed.stem,
          answer: seed.answer,
          hint: seed.hint,
          dok,
          mode: seed.mode || null,
          context: seed.context || null,
          ...meta
        });
      }

      // Then generate variations if we need more
      while (problems.length < count) {
        const seedProblem = randomChoice(seedProblems);
        if (seedProblem) {
          const variation = generateVariation(seedProblem, topic);
          problems.push({ ...variation, dok, ...meta });
        } else {
          problems.push(generateGenericProblem(dok));
        }
      }

      return problems.slice(0, count);
    },

    /**
     * Get problems for a worksheet level (1-6).
     * @param {string} topic - Topic name
     * @param {number} level - 1 (Foundational) to 6 (Advanced)
     * @param {number} count - Total problems to return
     * @param {number} [gradeHint] - Optional grade for JSON lookup
     * @returns {Array} Mixed DOK problems appropriate for level
     */
    forLevel(topic, level, count, gradeHint) {
      const problems = [];

      if (level === 1) {
        return this.forTopic(topic, 1, count, gradeHint);
      } else if (level === 2) {
        const split = Math.max(1, count - 1);
        problems.push(...this.forTopic(topic, 1, split, gradeHint));
        if (count > 1) problems.push(...this.forTopic(topic, 2, 1, gradeHint));
      } else if (level === 3) {
        const split = Math.ceil(count * 0.6);
        problems.push(...this.forTopic(topic, 1, split, gradeHint));
        problems.push(...this.forTopic(topic, 2, count - split, gradeHint));
      } else if (level === 4) {
        const split1 = Math.ceil(count * 0.4);
        const split2 = Math.ceil(count * 0.4);
        const split3 = count - split1 - split2;
        problems.push(...this.forTopic(topic, 1, split1, gradeHint));
        problems.push(...this.forTopic(topic, 2, split2, gradeHint));
        problems.push(...this.forTopic(topic, 3, split3, gradeHint));
      } else if (level === 5) {
        const split = Math.ceil(count * 0.5);
        problems.push(...this.forTopic(topic, 2, split, gradeHint));
        problems.push(...this.forTopic(topic, 3, count - split, gradeHint));
      } else if (level === 6) {
        const split = Math.ceil(count * 0.7);
        problems.push(...this.forTopic(topic, 3, split, gradeHint));
        for (let i = 0; i < count - split; i++) {
          const p = this.forTopic(topic, 3, 1, gradeHint)[0];
          if (p) {
            problems.push({
              ...p,
              stem: p.stem + ' Explain your reasoning.'
            });
          }
        }
      }

      return problems.slice(0, count);
    },

    /**
     * Generate a variation of a seed problem with different numbers.
     */
    generateVariation,

    /**
     * Get a master pool (~20 problems, mixed DOK) for a topic.
     */
    getPool(topic, gradeHint) {
      const problems = [];
      problems.push(...this.forTopic(topic, 1, 8, gradeHint));
      problems.push(...this.forTopic(topic, 2, 7, gradeHint));
      problems.push(...this.forTopic(topic, 3, 5, gradeHint));
      return problems;
    },

    /**
     * Get benchmark metadata for a topic (without generating problems).
     * Useful for WorksheetPDFEngine to annotate headers/footers.
     * @returns {{ clusterKey, clusterLabel, primaryBenchmark, benchmarkCodes } | null}
     */
    getBenchmarkInfo(topic, gradeHint) {
      const data = resolveTopicData(topic, gradeHint);
      if (!data) return null;
      return {
        clusterKey: data.clusterKey || null,
        clusterLabel: data.clusterLabel || null,
        primaryBenchmark: data.primaryBenchmark || null,
        benchmarkCodes: data.benchmarkCodes || null
      };
    },

    /**
     * Preload JSON data for a grade (non-blocking hint).
     * Call this early if you know which grade will be needed.
     */
    preloadGrade(grade) {
      getJSONForGrade(grade);
    },

    /**
     * Check if a topic has real problems (not just generic fallback).
     */
    hasProblemsFor(topic, gradeHint) {
      const data = resolveTopicData(topic, gradeHint);
      if (!data) return false;
      return (data.dok1?.length > 0 || data.dok2?.length > 0 || data.dok3?.length > 0);
    },

    /**
     * Get problems filtered by CRA mode (concrete, representational, abstract).
     * Falls back to unfiltered if not enough mode-matched problems exist.
     * @param {string} topic - Topic name
     * @param {string} mode - 'concrete' | 'representational' | 'abstract'
     * @param {number} dok - 1, 2, or 3
     * @param {number} count - How many problems to return
     * @param {number} [gradeHint] - Optional grade
     * @returns {Array}
     */
    forMode(topic, mode, dok, count, gradeHint) {
      const topicData = resolveTopicData(topic, gradeHint);
      if (!topicData) return this.forTopic(topic, dok, count, gradeHint);

      const dokKey = `dok${dok}`;
      const allProblems = topicData[dokKey] || [];
      const modeFiltered = allProblems.filter(p => p.mode === mode);

      // Benchmark metadata
      const meta = {};
      if (topicData.benchmarkCodes) meta.benchmarkCodes = topicData.benchmarkCodes;
      if (topicData.clusterKey) meta.clusterKey = topicData.clusterKey;
      if (topicData.clusterLabel) meta.clusterLabel = topicData.clusterLabel;
      if (topicData.primaryBenchmark) meta.primaryBenchmark = topicData.primaryBenchmark;

      const pool = modeFiltered.length >= count ? modeFiltered : allProblems;
      const problems = [];
      for (let i = 0; i < Math.min(pool.length, count); i++) {
        problems.push({
          stem: pool[i].stem, answer: pool[i].answer, hint: pool[i].hint,
          dok, mode: pool[i].mode || mode, context: pool[i].context || null, ...meta
        });
      }
      while (problems.length < count) {
        const seed = randomChoice(pool);
        if (seed) {
          const variation = generateVariation(seed, topic);
          problems.push({ ...variation, dok, mode, ...meta });
        } else {
          problems.push(generateGenericProblem(dok));
        }
      }
      return problems.slice(0, count);
    },

    /**
     * Get a CRA-sequenced set: concrete first, then representational, then abstract.
     * Ideal for differentiated worksheets that scaffold from hands-on to symbolic.
     * @param {string} topic - Topic name
     * @param {number} dok - 1, 2, or 3
     * @param {{ concrete: number, representational: number, abstract: number }} counts
     * @param {number} [gradeHint] - Optional grade
     * @returns {Array} Problems in C → R → A order
     */
    forCRASequence(topic, dok, counts, gradeHint) {
      const c = counts.concrete || 0;
      const r = counts.representational || 0;
      const a = counts.abstract || 0;
      return [
        ...this.forMode(topic, 'concrete', dok, c, gradeHint),
        ...this.forMode(topic, 'representational', dok, r, gradeHint),
        ...this.forMode(topic, 'abstract', dok, a, gradeHint)
      ];
    }
  };
})();
