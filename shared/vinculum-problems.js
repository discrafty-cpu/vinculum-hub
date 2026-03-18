/**
 * vinculum-problems.js — Problem Matrix Loader for VINCULUM Hub
 *
 * Loads the problem database and provides a clean API for apps to fetch
 * problems by grade, topic, DOK level, or scaffolding level.
 *
 * Usage in any tool HTML:
 *   <script src="../../shared/vinculum-problems.js"></script>
 *
 *   // Wait for data to load
 *   VinculumProblems.ready().then(() => {
 *     // Get problems for a specific level
 *     const problems = VinculumProblems.getByLevel('grade_3', 'multiplication and division', 'proficient');
 *
 *     // Get a random problem at the student's level
 *     const problem = VinculumProblems.getRandom('grade_3', 'multiplication and division', 'partial');
 *
 *     // Get DOK problems (backward compatible)
 *     const dok2 = VinculumProblems.getByDOK('grade_3', 'multiplication and division', 2);
 *
 *     // Get benchmark descriptors
 *     const desc = VinculumProblems.getDescriptors('grade_3', 'multiplication and division');
 *     // → { beginning: "Identifies basic...", partial: "Applies...", proficient: "Solves...", mastery: "Analyzes..." }
 *
 *     // Get misconceptions for a topic
 *     const misc = VinculumProblems.getMisconceptions('grade_3', 'multiplication and division');
 *     // → ["adds instead of multiplies", "ignores zero in multi-digit", ...]
 *
 *     // Get linked tools
 *     const tools = VinculumProblems.getTools('grade_3', 'multiplication and division');
 *     // → ["multiplication-arrays", "fact-fluency", ...]
 *
 *     // List all topics for a grade
 *     const topics = VinculumProblems.listTopics('grade_3');
 *     // → ["fractions and equivalence", "multiplication and division", ...]
 *
 *     // Find topics that link to this tool
 *     const matched = VinculumProblems.findByTool('multiplication-arrays');
 *     // → [{ grade: "grade_2", topic: "..." }, { grade: "grade_3", topic: "..." }]
 *   });
 */

(function(global) {
  'use strict';

  let _data = null;
  let _readyPromise = null;
  const LEVELS = ['beginning', 'partial', 'proficient', 'mastery'];
  const DATA_PATH = '../../data/vinculum-problem-matrix.json';

  // ─── Internal helpers ───

  function _load() {
    if (_readyPromise) return _readyPromise;
    _readyPromise = fetch(DATA_PATH)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load problem matrix: ${r.status}`);
        return r.json();
      })
      .then(json => {
        _data = json;
        console.log(`[VinculumProblems] Loaded v${json._meta.version}: ${json._meta.problemCount} problems, ${json._meta.topicCount} topics`);
        return json;
      })
      .catch(err => {
        console.warn('[VinculumProblems] Could not load problem matrix:', err.message);
        _data = null;
        return null;
      });
    return _readyPromise;
  }

  function _getTopic(gradeKey, topicName) {
    if (!_data) return null;
    const grade = _data.grades[gradeKey];
    if (!grade) return null;
    return grade.topics[topicName] || null;
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ─── Public API ───

  const VinculumProblems = {

    /** Wait for data to be loaded. Returns a promise. */
    ready() {
      return _load();
    },

    /** Check if data is loaded */
    isLoaded() {
      return _data !== null;
    },

    /** Get metadata about the problem database */
    getMeta() {
      return _data ? _data._meta : null;
    },

    // ─── Grade/Topic navigation ───

    /** List all grade keys: ["grade_K", "grade_1", ...] */
    listGrades() {
      return _data ? Object.keys(_data.grades) : [];
    },

    /** List all topic names for a grade */
    listTopics(gradeKey) {
      if (!_data || !_data.grades[gradeKey]) return [];
      return Object.keys(_data.grades[gradeKey].topics);
    },

    /** Get full topic object (all fields) */
    getTopic(gradeKey, topicName) {
      return _getTopic(gradeKey, topicName);
    },

    // ─── Problem retrieval ───

    /** Get all problems for a scaffolding level: 'beginning' | 'partial' | 'proficient' | 'mastery' */
    getByLevel(gradeKey, topicName, level) {
      const topic = _getTopic(gradeKey, topicName);
      if (!topic || !topic.scaffolding || !topic.scaffolding[level]) return [];
      return topic.scaffolding[level].problems;
    },

    /** Get DOK problems (backward compatible): dok = 1, 2, or 3 */
    getByDOK(gradeKey, topicName, dok) {
      const topic = _getTopic(gradeKey, topicName);
      if (!topic) return [];
      return topic[`dok${dok}`] || [];
    },

    /** Get a random problem at a given scaffolding level */
    getRandom(gradeKey, topicName, level) {
      const problems = this.getByLevel(gradeKey, topicName, level);
      if (problems.length === 0) return null;
      return problems[Math.floor(Math.random() * problems.length)];
    },

    /** Get N random problems at a level (no repeats if possible) */
    getRandomSet(gradeKey, topicName, level, count) {
      const problems = this.getByLevel(gradeKey, topicName, level);
      const shuffled = _shuffle(problems);
      return shuffled.slice(0, Math.min(count, shuffled.length));
    },

    /** Get problems across multiple levels (e.g., for a quick quiz)
     *  Returns { beginning: [...], partial: [...], proficient: [...], mastery: [...] }
     */
    getQuizSet(gradeKey, topicName, countsPerLevel) {
      const defaults = countsPerLevel || { beginning: 3, partial: 3, proficient: 3, mastery: 1 };
      const result = {};
      for (const level of LEVELS) {
        const count = defaults[level] || 0;
        result[level] = this.getRandomSet(gradeKey, topicName, level, count);
      }
      return result;
    },

    // ─── Descriptors and metadata ───

    /** Get the 4-level benchmark descriptors for a topic */
    getDescriptors(gradeKey, topicName) {
      const topic = _getTopic(gradeKey, topicName);
      if (!topic || !topic.scaffolding) return null;
      const result = {};
      for (const level of LEVELS) {
        result[level] = topic.scaffolding[level]?.descriptor || '';
      }
      return result;
    },

    /** Get common misconceptions for a topic */
    getMisconceptions(gradeKey, topicName) {
      const topic = _getTopic(gradeKey, topicName);
      return topic ? (topic.commonMisconceptions || []) : [];
    },

    /** Get VINCULUM tool names linked to a topic */
    getTools(gradeKey, topicName) {
      const topic = _getTopic(gradeKey, topicName);
      return topic ? (topic.vinculumTools || []) : [];
    },

    /** Get all benchmark codes for a topic (all frameworks) */
    getBenchmarks(gradeKey, topicName) {
      const topic = _getTopic(gradeKey, topicName);
      return topic ? (topic.benchmarkCodes || {}) : {};
    },

    // ─── Cross-referencing ───

    /** Find all grade/topic pairs that link to a given VINCULUM tool */
    findByTool(toolName) {
      if (!_data) return [];
      const results = [];
      for (const [gk, gv] of Object.entries(_data.grades)) {
        for (const [tk, tv] of Object.entries(gv.topics)) {
          if (tv.vinculumTools && tv.vinculumTools.includes(toolName)) {
            results.push({
              grade: gk,
              gradeLabel: gv.courseName,
              topic: tk,
              topicLabel: tv.clusterLabel,
              benchmarks: tv.benchmarkCodes
            });
          }
        }
      }
      return results;
    },

    /** Find all grade/topic pairs matching a benchmark code (e.g., "3.OA.5") */
    findByBenchmark(code) {
      if (!_data) return [];
      const results = [];
      for (const [gk, gv] of Object.entries(_data.grades)) {
        for (const [tk, tv] of Object.entries(gv.topics)) {
          for (const [fw, codes] of Object.entries(tv.benchmarkCodes || {})) {
            if (codes.includes(code)) {
              results.push({ grade: gk, topic: tk, framework: fw, topicLabel: tv.clusterLabel });
            }
          }
        }
      }
      return results;
    },

    // ─── Constants ───
    LEVELS,
    LEVEL_LABELS: {
      beginning: 'Beginning',
      partial: 'Partial Understanding',
      proficient: 'Proficient',
      mastery: 'Mastery'
    }
  };

  // Auto-load when script is included
  _load();

  // Export
  global.VinculumProblems = VinculumProblems;

})(typeof window !== 'undefined' ? window : globalThis);
