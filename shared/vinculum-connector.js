/**
 * VINCULUM Connector — The Digester's Pseudo-Database
 *
 * Loads the VINCULUM Hub tool catalog and exposes query methods
 * for pulling problems, standards, visual models, misconceptions,
 * CRA scaffolding, and concept progressions into any Digester output
 * (worksheets, presentations, dialogue cards, lesson plans).
 *
 * Usage:
 *   const V = await VinculumConnector.load();
 *   V.toolsForGrade('7')                     // all Grade 7 tools
 *   V.toolsForStandard('7.RP.2')             // tools aligned to this CCSS
 *   V.misconceptionsFor('7', 'RP')           // misconceptions for G7 ratios
 *   V.craProgression('fractions')            // C→R→A tool chain for fractions thread
 *   V.visualModelsFor('7', 'EE')            // what visual models exist for G7 expressions
 *   V.leveledScaffolding('proportion-solver') // emergent/proficient/advanced + CRA + Piaget
 *   V.threadProgression('equations')          // full K→HS tool chain
 */

const VinculumConnector = (() => {

  // ── State ──────────────────────────────────────────────
  let _data = null;
  let _toolIndex = {};       // id → tool
  let _gradeIndex = {};      // grade → [tools]
  let _strandIndex = {};     // grade:strand → [tools]
  let _standardIndex = {};   // standard code → [tools]
  let _threadIndex = {};     // thread → [tools]
  let _craIndex = {};        // cra.primary → [tools]

  // ── Load ───────────────────────────────────────────────

  /**
   * Load the VINCULUM tools API.
   * Tries local file first, then GitHub Pages, then embedded fallback.
   */
  async function load(options = {}) {
    if (_data) return api;

    const sources = [
      './vinculum-tools-api.json',
      '../vinculum-tools-api.json',
      'https://discrafty-cpu.github.io/vinculum-hub/api/tools.json'
    ];

    if (options.url) sources.unshift(options.url);

    for (const url of sources) {
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          _data = await resp.json();
          _buildIndices();
          console.log(`[VINCULUM] Loaded ${_data.toolCount} tools from ${url}`);
          return api;
        }
      } catch (e) {
        // try next source
      }
    }

    throw new Error('[VINCULUM] Could not load tools API from any source');
  }

  function _buildIndices() {
    _toolIndex = {};
    _gradeIndex = {};
    _strandIndex = {};
    _standardIndex = {};
    _threadIndex = {};
    _craIndex = {};

    for (const tool of _data.tools) {
      // By ID
      _toolIndex[tool.id] = tool;

      // By grade
      if (!_gradeIndex[tool.grade]) _gradeIndex[tool.grade] = [];
      _gradeIndex[tool.grade].push(tool);

      // By grade:strand
      const gs = tool.grade + ':' + tool.strand;
      if (!_strandIndex[gs]) _strandIndex[gs] = [];
      _strandIndex[gs].push(tool);

      // By standard code (CCSS, MN, TEKS)
      for (const code of (tool.ccss || [])) {
        if (!_standardIndex[code]) _standardIndex[code] = [];
        _standardIndex[code].push(tool);
      }
      for (const code of (tool.mn || [])) {
        if (!_standardIndex[code]) _standardIndex[code] = [];
        _standardIndex[code].push(tool);
      }
      for (const code of (tool.teks || [])) {
        if (!_standardIndex[code]) _standardIndex[code] = [];
        _standardIndex[code].push(tool);
      }

      // By thread
      if (tool.thread) {
        if (!_threadIndex[tool.thread]) _threadIndex[tool.thread] = [];
        _threadIndex[tool.thread].push(tool);
      }

      // By CRA primary
      if (tool.cra) {
        const p = tool.cra.primary;
        if (!_craIndex[p]) _craIndex[p] = [];
        _craIndex[p].push(tool);
      }
    }
  }

  // ── Core Queries ───────────────────────────────────────

  /** Get a single tool by ID */
  function tool(id) {
    return _toolIndex[id] || null;
  }

  /** All tools for a grade */
  function toolsForGrade(grade) {
    return _gradeIndex[grade] || [];
  }

  /** All tools for a grade + strand */
  function toolsForStrand(grade, strand) {
    return _strandIndex[grade + ':' + strand] || [];
  }

  /** All tools aligned to a specific standard code (CCSS, MN, or TEKS) */
  function toolsForStandard(code) {
    return _standardIndex[code] || [];
  }

  /** All tools in a concept thread */
  function toolsForThread(threadId) {
    return _threadIndex[threadId] || [];
  }

  /** All tools at a specific CRA level */
  function toolsAtCRALevel(level) {
    return _craIndex[level] || [];
  }

  // ── Curriculum Queries (The Secret Sauce) ──────────────

  /**
   * Get all misconceptions for a grade + strand combination.
   * Returns flat array of unique misconception strings.
   * Perfect for: worksheet error analysis, dialogue cards, teacher notes.
   */
  function misconceptionsFor(grade, strand) {
    const tools = _strandIndex[grade + ':' + strand] || [];
    const seen = new Set();
    const result = [];
    for (const t of tools) {
      for (const m of (t.misconceptions || [])) {
        if (!seen.has(m)) {
          seen.add(m);
          result.push({ misconception: m, toolId: t.id, toolName: t.name });
        }
      }
    }
    return result;
  }

  /**
   * Get all misconceptions for a specific standard code.
   * Returns misconceptions from all tools aligned to that standard.
   */
  function misconceptionsForStandard(code) {
    const tools = _standardIndex[code] || [];
    const seen = new Set();
    const result = [];
    for (const t of tools) {
      for (const m of (t.misconceptions || [])) {
        if (!seen.has(m)) {
          seen.add(m);
          result.push({ misconception: m, toolId: t.id, toolName: t.name });
        }
      }
    }
    return result;
  }

  /**
   * Get visual models available for a grade + strand.
   * Returns unique set of model types from all matching tools' CRA data.
   * Perfect for: worksheet visuals, presentation diagrams.
   */
  function visualModelsFor(grade, strand) {
    const tools = _strandIndex[grade + ':' + strand] || [];
    const models = new Set();
    for (const t of tools) {
      if (t.cra && t.cra.visualModels) {
        for (const m of t.cra.visualModels) models.add(m);
      }
    }
    return Array.from(models);
  }

  /**
   * Get CRA progression for a concept thread.
   * Returns tools ordered by grade, grouped by CRA level.
   * Perfect for: lesson sequencing, unit planning.
   */
  function craProgression(threadId) {
    const tools = (_threadIndex[threadId] || []).slice();
    const gradeOrder = ['K','1','2','3','4','5','6','7','8','ALG1','GEOM','ALG2','PREC'];
    tools.sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));

    return {
      thread: threadId,
      concrete: tools.filter(t => t.cra && t.cra.primary === 'concrete'),
      representational: tools.filter(t => t.cra && t.cra.primary === 'representational'),
      abstract: tools.filter(t => t.cra && t.cra.primary === 'abstract'),
      all: tools
    };
  }

  /**
   * Full prereq→next chain for a concept thread, ordered.
   * Follows the prereq/next links to build the actual progression.
   * Perfect for: scope & sequence, curriculum maps.
   */
  function threadProgression(threadId) {
    const tools = _threadIndex[threadId] || [];
    if (tools.length === 0) return [];

    // Find roots (tools with no prereq or prereq outside this thread)
    const threadIds = new Set(tools.map(t => t.id));
    const roots = tools.filter(t => !t.prereq || !threadIds.has(t.prereq));

    // Build chains from each root
    const chains = [];
    for (const root of roots) {
      const chain = [root];
      let current = root;
      while (current.next && _toolIndex[current.next]) {
        current = _toolIndex[current.next];
        if (chain.includes(current)) break; // prevent cycles
        chain.push(current);
      }
      chains.push(chain);
    }

    // Return the longest chain (main progression) plus branches
    chains.sort((a, b) => b.length - a.length);
    return {
      thread: threadId,
      mainProgression: chains[0] || [],
      branches: chains.slice(1),
      totalTools: tools.length
    };
  }

  /**
   * Get leveled scaffolding data for a specific tool.
   * Combines diff levels + CRA + Piaget into a single scaffolding object.
   * Perfect for: differentiated worksheets (L1-L6 mapping).
   */
  function leveledScaffolding(toolId) {
    const t = _toolIndex[toolId];
    if (!t) return null;

    return {
      id: t.id,
      name: t.name,
      grade: t.grade,
      strand: t.strand,
      standards: { ccss: t.ccss, mn: t.mn, teks: t.teks },
      levels: {
        emergent: {
          description: t.diff ? t.diff.emergent : null,
          craLevel: 'concrete',
          scaffolding: 'Maximum visual support, manipulatives, guided steps',
          piagetNote: t.piaget ? `Stage: ${t.piaget.stage}` : null
        },
        developing: {
          description: t.diff ? (t.diff.developing || t.diff.proficient) : null,
          craLevel: 'representational',
          scaffolding: 'Visual models with partial support, worked examples',
          piagetNote: t.piaget ? `Constructs: ${(t.piaget.constructs || []).join(', ')}` : null
        },
        proficient: {
          description: t.diff ? (t.diff.proficient || t.diff.advanced) : null,
          craLevel: 'representational-abstract',
          scaffolding: 'Visual models available on demand, self-check',
          piagetNote: null
        },
        advanced: {
          description: t.diff ? t.diff.advanced : null,
          craLevel: 'abstract',
          scaffolding: 'Symbolic only, transfer and justify',
          piagetNote: t.piaget && t.piaget.buildsReversibility ? 'Reversibility: inverse operations' : null
        }
      },
      misconceptions: t.misconceptions || [],
      visualModels: t.cra ? t.cra.visualModels : [],
      cra: t.cra || {},
      piaget: t.piaget || {}
    };
  }

  /**
   * Search tools by keyword (searches name, description, misconceptions).
   * Perfect for: topic detection → tool matching when a presentation is dropped.
   */
  function search(query) {
    if (!_data) return [];
    const q = query.toLowerCase();
    return _data.tools.filter(t => {
      if (t.name.toLowerCase().includes(q)) return true;
      if (t.description.toLowerCase().includes(q)) return true;
      if (t.id.toLowerCase().includes(q)) return true;
      if ((t.misconceptions || []).some(m => m.toLowerCase().includes(q))) return true;
      if ((t.ccss || []).some(c => c.toLowerCase().includes(q))) return true;
      if ((t.mn || []).some(c => c.toLowerCase().includes(q))) return true;
      return false;
    });
  }

  /**
   * Match detected lesson topics to VINCULUM tools.
   * Takes an array of topic strings (from rebuild.py analysis)
   * and returns best-matching tools with relevance scores.
   * Perfect for: auto-linking dropped presentations to Hub resources.
   */
  function matchTopics(topics) {
    if (!_data) return [];
    const results = new Map(); // toolId → { tool, score, matchedTopics }

    for (const topic of topics) {
      const words = topic.toLowerCase().split(/[\s,]+/).filter(w => w.length > 2);
      for (const t of _data.tools) {
        const searchText = [
          t.name, t.description, t.strand, t.thread,
          ...(t.misconceptions || []),
          ...(t.ccss || []),
          t.diff ? Object.values(t.diff).join(' ') : ''
        ].join(' ').toLowerCase();

        let score = 0;
        for (const w of words) {
          if (searchText.includes(w)) score++;
        }
        // Bonus for exact topic match in name or description
        if (t.name.toLowerCase().includes(topic.toLowerCase())) score += 3;
        if (t.description.toLowerCase().includes(topic.toLowerCase())) score += 2;

        if (score > 0) {
          const existing = results.get(t.id);
          if (existing) {
            existing.score += score;
            existing.matchedTopics.push(topic);
          } else {
            results.set(t.id, { tool: t, score, matchedTopics: [topic] });
          }
        }
      }
    }

    return Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // top 20 matches
  }

  /**
   * Get all standards codes for a grade, organized by strand.
   * Perfect for: standards alignment reports, gap analysis.
   */
  function standardsForGrade(grade) {
    const tools = _gradeIndex[grade] || [];
    const byStrand = {};
    for (const t of tools) {
      if (!byStrand[t.strand]) byStrand[t.strand] = { ccss: new Set(), mn: new Set(), teks: new Set() };
      for (const c of (t.ccss || [])) byStrand[t.strand].ccss.add(c);
      for (const c of (t.mn || [])) byStrand[t.strand].mn.add(c);
      for (const c of (t.teks || [])) byStrand[t.strand].teks.add(c);
    }
    // Convert sets to arrays
    for (const strand of Object.keys(byStrand)) {
      byStrand[strand].ccss = Array.from(byStrand[strand].ccss).sort();
      byStrand[strand].mn = Array.from(byStrand[strand].mn).sort();
      byStrand[strand].teks = Array.from(byStrand[strand].teks).sort();
    }
    return byStrand;
  }

  /**
   * Get Piaget-appropriate tools for a student's developmental level.
   * Input: a Piaget stage string.
   * Perfect for: adaptive tool selection, student-appropriate scaffolding.
   */
  function toolsForPiagetStage(stage) {
    if (!_data) return [];
    return _data.tools.filter(t => t.piaget && t.piaget.stage === stage);
  }

  /**
   * Get the full CRA scaffold chain for a single topic/tool.
   * Returns the concrete→representational→abstract tool sequence
   * within the same concept thread, across grades.
   * Perfect for: intervention planning, RTI tiering.
   */
  function craChainFor(toolId) {
    const t = _toolIndex[toolId];
    if (!t) return null;

    const thread = t.thread;
    const progression = craProgression(thread);

    // Find where this tool sits
    const gradeOrder = ['K','1','2','3','4','5','6','7','8','ALG1','GEOM','ALG2','PREC'];
    const gradeIdx = gradeOrder.indexOf(t.grade);

    return {
      currentTool: t,
      currentCRA: t.cra ? t.cra.primary : 'unknown',
      // Tools earlier in the thread (likely more concrete)
      scaffoldDown: progression.all.filter(pt =>
        gradeOrder.indexOf(pt.grade) < gradeIdx
      ),
      // Tools later in the thread (likely more abstract)
      scaffoldUp: progression.all.filter(pt =>
        gradeOrder.indexOf(pt.grade) > gradeIdx
      ),
      // Same-grade alternatives in different strands
      sameGradeAlternatives: (_gradeIndex[t.grade] || []).filter(pt =>
        pt.id !== t.id && pt.cra && pt.cra.primary === t.cra.primary
      )
    };
  }

  /**
   * Summary stats for the loaded dataset.
   */
  function stats() {
    if (!_data) return null;
    const craCounts = { concrete: 0, representational: 0, abstract: 0 };
    const piagetCounts = {};
    for (const t of _data.tools) {
      if (t.cra) craCounts[t.cra.primary] = (craCounts[t.cra.primary] || 0) + 1;
      if (t.piaget) piagetCounts[t.piaget.stage] = (piagetCounts[t.piaget.stage] || 0) + 1;
    }
    return {
      version: _data.version,
      toolCount: _data.toolCount,
      grades: _data.grades.length,
      threads: _data.conceptThreads.length,
      craCounts,
      piagetCounts,
      standardsCoverage: Object.keys(_standardIndex).length
    };
  }

  // ── Public API ─────────────────────────────────────────

  const api = {
    load,
    tool,
    toolsForGrade,
    toolsForStrand,
    toolsForStandard,
    toolsForThread,
    toolsAtCRALevel,
    misconceptionsFor,
    misconceptionsForStandard,
    visualModelsFor,
    craProgression,
    threadProgression,
    leveledScaffolding,
    search,
    matchTopics,
    standardsForGrade,
    toolsForPiagetStage,
    craChainFor,
    stats,
    get data() { return _data; }
  };

  return api;

})();

// Auto-export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VinculumConnector;
}
