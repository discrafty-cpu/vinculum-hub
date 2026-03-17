/**
 * Indigenous Context Engine — JavaScript Edition
 * ================================================
 * Drop-in module for VINCULUM Hub and Lesson Digester.
 * Loads indigenous-data.json and provides matching + a UI panel.
 *
 * USAGE (pick one):
 *
 * 1. As a floating panel (add to any page):
 *    <script src="indigenous-context-panel.js"></script>
 *
 * 2. Programmatic API only (no UI):
 *    <script src="indigenous-context-panel.js" data-no-ui="true"></script>
 *    <script>
 *      IndigenousContext.query({ grade: "4", domain: "geometry", topic: "symmetry" })
 *        .then(results => console.log(results));
 *    </script>
 *
 * The JSON data file (indigenous-data.json) must be accessible
 * relative to this script or at the path set in data-json-path.
 */

(function () {
  "use strict";

  // ── Configuration ──

  const scriptTag = document.currentScript;
  const noUI = scriptTag && scriptTag.getAttribute("data-no-ui") === "true";
  const jsonPath = (scriptTag && scriptTag.getAttribute("data-json-path")) ||
    scriptTag.src.replace(/indigenous-context-panel\.js.*$/, "indigenous-data.json");

  // ── Data ──

  let DATA = null;
  let dataReady = fetch(jsonPath)
    .then(r => r.json())
    .then(d => { DATA = d; return d; })
    .catch(e => console.error("Indigenous Context Engine: Could not load data.", e));

  // ── Matching Logic (mirrors Python engine) ──

  const GRADE_BAND_MAP = {
    "K": "K-2", "0": "K-2", "1": "K-2", "2": "K-2",
    "3": "3-5", "4": "3-5", "5": "3-5",
    "6": "6-8", "7": "6-8", "8": "6-8",
    "9": "9-12", "10": "9-12", "11": "9-12", "12": "9-12"
  };

  const DOMAIN_ALIASES = {
    "number": "Number & Operations", "operations": "Number & Operations",
    "counting": "Number & Operations", "place value": "Number & Operations",
    "addition": "Number & Operations", "subtraction": "Number & Operations",
    "multiplication": "Number & Operations", "division": "Number & Operations",
    "fractions": "Number & Operations",
    "measurement": "Measurement & Data", "data": "Measurement & Data",
    "statistics": "Statistics & Data", "probability": "Statistics & Probability",
    "geometry": "Geometry", "shapes": "Geometry", "symmetry": "Geometry",
    "area": "Geometry", "volume": "Geometry", "perimeter": "Geometry",
    "algebra": "Algebra & Functions", "functions": "Algebra & Functions",
    "equations": "Algebra & Functions", "patterns": "Algebra & Functions",
    "ratios": "Ratios & Proportions", "proportions": "Ratios & Proportions",
    "proportional": "Ratios & Proportions"
  };

  function normalizeDomain(d) {
    d = d.trim().toLowerCase();
    if (DOMAIN_ALIASES[d]) return DOMAIN_ALIASES[d];
    for (const [alias, canonical] of Object.entries(DOMAIN_ALIASES)) {
      if (alias.includes(d) || d.includes(alias)) return canonical;
    }
    return d;
  }

  function getGradeBand(g) {
    g = String(g).trim().toUpperCase().replace(/GRADE\s*/i, "").replace(/GR\s*/i, "");
    return GRADE_BAND_MAP[g] || g;
  }

  function scoreMatch(entry, gradeBand, domain, keywords) {
    let score = 0;
    const entryBand = entry.Grade_Band || entry.Grade_Range || "";
    if (entryBand.includes(gradeBand) || gradeBand.includes(entryBand)) score += 10;
    else if (gradeBand.split("-").some(g => entryBand.includes(g))) score += 5;

    const entryDomain = entry.Math_Domain || "";
    const entryConcepts = entry.Math_Concepts || entry.Standard_Curriculum_Connection || "";
    const normalized = normalizeDomain(domain);
    if (entryDomain.toLowerCase().includes(normalized.toLowerCase())) score += 10;
    else if (entryDomain.toLowerCase().includes(domain.toLowerCase()) ||
             entryConcepts.toLowerCase().includes(domain.toLowerCase())) score += 7;

    const searchable = [
      entry.Theme, entry.Math_Concepts, entry.Indigenous_Concept,
      entry.Standard_Curriculum_Connection, entry.Sample_Problem,
      entry.Cultural_Context, entry.Notes
    ].filter(Boolean).join(" ").toLowerCase();

    keywords.forEach(kw => {
      if (searchable.includes(kw.toLowerCase())) score += 5;
    });

    return score;
  }

  function matchContexts(grade, domain, topic) {
    if (!DATA) return { error: "Data not loaded yet" };

    const gradeBand = getGradeBand(grade);
    const normalized = normalizeDomain(domain);
    const keywords = topic.replace(/,/g, " ").split(/\s+/).filter(w => w.length > 2);

    // Score stories
    const stories = (DATA.Story_Theme_Repository || [])
      .map(e => ({ score: scoreMatch(e, gradeBand, domain, keywords), entry: e }))
      .filter(m => m.score > 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(m => ({
        score: m.score,
        id: m.entry.ID,
        theme: m.entry.Theme,
        cultural_context: m.entry.Cultural_Context,
        nations: m.entry["Nation(s)"],
        math_concepts: m.entry.Math_Concepts,
        cra_phase: m.entry.CRA_Phase,
        sample_problem: m.entry.Sample_Problem,
        mn_aligned: m.entry.MN_Benchmark_Aligned,
        notes: m.entry.Notes
      }));

    // Score crosswalk
    const tags = (DATA.Math_Domain_Crosswalk || [])
      .map(e => ({ score: scoreMatch(e, gradeBand, domain, keywords), entry: e }))
      .filter(m => m.score > 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(m => ({
        score: m.score,
        tag: m.entry.Digester_Tag,
        concept: m.entry.Indigenous_Concept,
        nations: m.entry["Nation(s)"],
        connection: m.entry.Standard_Curriculum_Connection,
        cra_phase: m.entry.CRA_Phase_Best_Fit
      }));

    // Resources
    const resources = (DATA.Resource_Registry || [])
      .filter(e => {
        const gr = String(e.Grade_Range || "");
        const md = String(e.Math_Domains || "").toLowerCase();
        return gradeBand.split("-").some(g => gr.includes(g)) ||
               md.includes(normalized.toLowerCase()) ||
               md.includes("all");
      })
      .slice(0, 5)
      .map(e => ({
        name: e.Resource_Name,
        type: e.Type,
        evidence: e.Evidence_Level,
        notes: e.Digester_Integration_Notes
      }));

    return {
      query: { grade: String(grade), gradeBand, domain, normalized, topic },
      stories,
      tags,
      resources,
      hasMatches: stories.length > 0,
      primary: stories[0] || null
    };
  }

  // ── Public API ──

  window.IndigenousContext = {
    ready: dataReady,
    query: function (opts) {
      return dataReady.then(() => matchContexts(opts.grade, opts.domain, opts.topic));
    },
    querySync: function (opts) {
      return matchContexts(opts.grade, opts.domain, opts.topic);
    },
    getData: function () { return DATA; }
  };

  // ── UI Panel ──

  if (noUI) return;

  dataReady.then(() => {
    const panel = document.createElement("div");
    panel.id = "indigenous-context-panel";
    panel.innerHTML = `
      <style>
        #indigenous-context-panel {
          position: fixed; bottom: 16px; right: 16px; z-index: 9999;
          font-family: Arial, sans-serif; font-size: 14px;
        }
        #icp-toggle {
          background: #2D6A4F; color: white; border: none; border-radius: 50%;
          width: 48px; height: 48px; cursor: pointer; font-size: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25); display: flex;
          align-items: center; justify-content: center; margin-left: auto;
        }
        #icp-toggle:hover { background: #1B4332; }
        #icp-body {
          display: none; background: white; border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2); width: 380px;
          max-height: 520px; overflow-y: auto; margin-bottom: 8px;
          border: 2px solid #2D6A4F;
        }
        #icp-body.open { display: block; }
        #icp-header {
          background: #2D6A4F; color: white; padding: 12px 16px;
          border-radius: 10px 10px 0 0; font-weight: bold; font-size: 15px;
        }
        #icp-header small { font-weight: normal; opacity: 0.8; display: block; margin-top: 2px; font-size: 11px; }
        #icp-form { padding: 12px 16px; border-bottom: 1px solid #E8E8E8; }
        #icp-form label { display: block; font-size: 12px; color: #666; margin-top: 8px; }
        #icp-form select, #icp-form input {
          width: 100%; padding: 6px 8px; border: 1px solid #CCC;
          border-radius: 6px; font-size: 13px; margin-top: 2px; box-sizing: border-box;
        }
        #icp-search {
          background: #2D6A4F; color: white; border: none; border-radius: 6px;
          padding: 8px 16px; cursor: pointer; width: 100%; margin-top: 12px;
          font-size: 13px; font-weight: bold;
        }
        #icp-search:hover { background: #1B4332; }
        #icp-results { padding: 12px 16px; }
        .icp-match {
          background: #F0FFF4; border: 1px solid #B7E4C7; border-radius: 8px;
          padding: 10px 12px; margin-bottom: 8px;
        }
        .icp-match-title { font-weight: bold; color: #1B4332; font-size: 14px; }
        .icp-match-nations { font-size: 12px; color: #52796F; margin: 2px 0; }
        .icp-match-problem { font-size: 12px; color: #333; margin-top: 6px; line-height: 1.4; }
        .icp-match-meta { font-size: 11px; color: #888; margin-top: 4px; }
        .icp-tag {
          display: inline-block; background: #D8F3DC; color: #1B4332;
          padding: 2px 8px; border-radius: 10px; font-size: 11px; margin: 2px 2px;
        }
        .icp-warning {
          background: #FFF3CD; border: 1px solid #FFECB5; border-radius: 6px;
          padding: 8px 10px; font-size: 11px; color: #664D03; margin-top: 8px;
        }
        .icp-empty { color: #999; font-style: italic; padding: 20px 0; text-align: center; }
      </style>

      <div id="icp-body">
        <div id="icp-header">
          Indigenous Context Engine
          <small>Curated stories and themes for K-12 math — no AI generation</small>
        </div>
        <div id="icp-form">
          <label>Grade</label>
          <select id="icp-grade">
            <option value="K">Kindergarten</option>
            <option value="1">Grade 1</option><option value="2">Grade 2</option>
            <option value="3">Grade 3</option><option value="4" selected>Grade 4</option>
            <option value="5">Grade 5</option><option value="6">Grade 6</option>
            <option value="7">Grade 7</option><option value="8">Grade 8</option>
            <option value="9">Grade 9</option><option value="10">Grade 10</option>
            <option value="11">Grade 11</option><option value="12">Grade 12</option>
          </select>
          <label>Math Domain</label>
          <select id="icp-domain">
            <option value="geometry">Geometry</option>
            <option value="number">Number &amp; Operations</option>
            <option value="measurement">Measurement &amp; Data</option>
            <option value="algebra">Algebra &amp; Functions</option>
            <option value="ratios">Ratios &amp; Proportions</option>
            <option value="statistics">Statistics &amp; Data</option>
          </select>
          <label>Topic Keywords</label>
          <input id="icp-topic" type="text" placeholder="e.g. symmetry reflection shapes" value="symmetry reflection">
          <button id="icp-search">Find Indigenous Contexts</button>
        </div>
        <div id="icp-results">
          <div class="icp-empty">Enter a lesson topic and click search</div>
        </div>
      </div>
      <button id="icp-toggle" title="Indigenous Context Engine">&#10022;</button>
    `;
    document.body.appendChild(panel);

    // Toggle
    document.getElementById("icp-toggle").addEventListener("click", () => {
      document.getElementById("icp-body").classList.toggle("open");
    });

    // Search
    document.getElementById("icp-search").addEventListener("click", () => {
      const grade = document.getElementById("icp-grade").value;
      const domain = document.getElementById("icp-domain").value;
      const topic = document.getElementById("icp-topic").value;
      const results = matchContexts(grade, domain, topic);
      renderResults(results);
    });

    function renderResults(r) {
      const el = document.getElementById("icp-results");
      if (!r.hasMatches) {
        el.innerHTML = '<div class="icp-empty">No matches found. Try different keywords.</div>';
        return;
      }

      let html = "";
      r.stories.slice(0, 3).forEach((s, i) => {
        html += `
          <div class="icp-match">
            <div class="icp-match-title">${i + 1}. ${s.theme}</div>
            <div class="icp-match-nations">${s.nations} &middot; CRA: ${s.cra_phase} &middot; MN: ${s.mn_aligned}</div>
            <div class="icp-match-problem">${s.sample_problem}</div>
            <div class="icp-match-meta">${s.cultural_context} &middot; ${s.notes || ""}</div>
          </div>`;
      });

      if (r.tags.length) {
        html += '<div style="margin-top:8px">';
        r.tags.slice(0, 4).forEach(t => {
          html += `<span class="icp-tag">${t.tag}</span>`;
        });
        html += '</div>';
      }

      html += `
        <div class="icp-warning">
          All content is pre-written and research-sourced — not AI-generated.
          Flag for Indigenous educator review before classroom use.
        </div>`;

      el.innerHTML = html;
    }
  });
})();
