/* ═══════════════════════════════════════════════════════════
   VINCULUM MATH JS — Shared KaTeX Math Rendering Module
   v1.0 — March 2026

   Loaded by any tool that needs proper math rendering.
   Provides:
   - Auto-loads KaTeX CSS + JS from CDN (once)
   - Caret notation → LaTeX converter
   - Inline & display math rendering
   - Dual display (rendered math + calculator notation)
   - "Work It Out" step-by-step solution builder
   - Auto-renders any element with [data-math] attribute

   Usage in any tool HTML:
     <script src="../../shared/vinculum-math.js"></script>

     // Render caret notation as KaTeX
     VinculumMath.render('2^3 × 2^2 = 2^5');
     // → returns HTML string with rendered math

     // Dual display: rendered + caret notation
     VinculumMath.dual('2^3 × 2^2 = 2^5');
     // → rendered math on top, "⌨ 2^3 × 2^2 = 2^5" below

     // Step-by-step "Work It Out" panel
     VinculumMath.steps('productResult', [
       { math: '6^4 × 6^4',           note: 'Start with the expression' },
       { math: '6^(4+4)',              note: 'Product rule: add exponents' },
       { math: '6^8',                  note: 'Simplify the exponent' },
       { math: '6^8 = 1{,}679{,}616', note: 'Calculate the result' }
     ]);

     // Auto-render: just put data-math on any element
     <span data-math="x^{2} + y^{2} = r^{2}"></span>
     <span data-math-caret="x^2 + y^2 = r^2"></span>  // auto-converts caret
   ═══════════════════════════════════════════════════════════ */

(function(global) {
  'use strict';

  // ════════════════════════════════════════
  // 1. CDN AUTO-LOADER
  // ════════════════════════════════════════
  var KATEX_VERSION = '0.16.11';
  var CDN_BASE = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist/';
  var _ready = false;
  var _readyCallbacks = [];

  function _loadKaTeX() {
    // Don't double-load
    if (document.querySelector('link[href*="katex"]')) {
      // CSS already present, just check JS
      if (typeof katex !== 'undefined') {
        _onReady();
        return;
      }
    }

    // Load CSS
    if (!document.querySelector('link[href*="katex"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CDN_BASE + 'katex.min.css';
      document.head.appendChild(link);
    }

    // Load JS
    if (typeof katex === 'undefined' && !document.querySelector('script[src*="katex.min.js"]')) {
      var script = document.createElement('script');
      script.src = CDN_BASE + 'katex.min.js';
      script.onload = function() { _onReady(); };
      script.onerror = function() {
        console.warn('[VinculumMath] Failed to load KaTeX from CDN. Math will render as plain text.');
        _onReady(); // still fire ready so apps don't hang
      };
      document.head.appendChild(script);
    } else if (typeof katex !== 'undefined') {
      _onReady();
    } else {
      // Script tag exists but hasn't loaded yet — poll
      var poll = setInterval(function() {
        if (typeof katex !== 'undefined') {
          clearInterval(poll);
          _onReady();
        }
      }, 100);
      setTimeout(function() { clearInterval(poll); _onReady(); }, 5000);
    }
  }

  function _onReady() {
    _ready = true;
    _autoRender();
    for (var i = 0; i < _readyCallbacks.length; i++) {
      try { _readyCallbacks[i](); } catch(e) {}
    }
    _readyCallbacks = [];
  }


  // ════════════════════════════════════════
  // 2. CARET → LATEX CONVERTER
  // ════════════════════════════════════════
  // Converts calculator-style notation to LaTeX.
  //   "2^3 × 2^2"       → "2^{3} \\times 2^{2}"
  //   "(2^3)^2"          → "(2^{3})^{2}"
  //   "x^(n+1)"          → "x^{(n+1)}"
  //   "3/4"              → "\\frac{3}{4}"    (optional, if fraction mode on)

  function caretToLatex(str, opts) {
    opts = opts || {};
    var latex = str;

    // Handle grouped exponents: ^(3+2) → ^{3+2}  (keep parens visible)
    latex = latex.replace(/\^(\([^)]+\))/g, function(m, inner) {
      return '^{' + inner + '}';
    });

    // Handle multi-char exponents: ^12 → ^{12}
    latex = latex.replace(/\^(\d{2,})/g, '^{$1}');

    // Handle single-char exponents: ^3 → ^{3}, ^n → ^{n}
    latex = latex.replace(/\^([0-9a-zA-Z])/g, '^{$1}');

    // Operators
    latex = latex.replace(/×/g, '\\times ');
    latex = latex.replace(/÷/g, '\\div ');
    latex = latex.replace(/\*/g, '\\cdot ');
    latex = latex.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');

    // Optional: simple fractions  a/b → \frac{a}{b}
    if (opts.fractions) {
      latex = latex.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
    }

    // Thousands separator with thin space
    latex = latex.replace(/(\d),(\d{3})/g, '$1{,}$2');

    return latex;
  }


  // ════════════════════════════════════════
  // 3. RENDERING API
  // ════════════════════════════════════════

  /** Render a LaTeX string → HTML. Falls back to plain text. */
  function renderLatex(latex, displayMode) {
    if (typeof katex === 'undefined') {
      // Fallback: at least show the text
      return '<span style="font-style:italic;">' + _escapeHtml(latex) + '</span>';
    }
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: !!displayMode
      });
    } catch(e) {
      return '<span style="font-style:italic;">' + _escapeHtml(latex) + '</span>';
    }
  }

  /** Render caret notation → KaTeX HTML */
  function renderCaret(caretStr, displayMode, opts) {
    return renderLatex(caretToLatex(caretStr, opts), displayMode);
  }

  /** Dual display: KaTeX rendered math + caret notation below */
  function dual(caretStr, opts) {
    opts = opts || {};
    var display = opts.display || false;
    return '<div class="vmath-dual">' +
      '<div class="vmath-rendered">' + renderCaret(caretStr, display, opts) + '</div>' +
      '<div class="vmath-caret">⌨ ' + _escapeHtml(caretStr) + '</div>' +
      '</div>';
  }

  /** Render directly into an element by ID */
  function renderInto(elementId, caretStr, opts) {
    var el = document.getElementById(elementId);
    if (!el) return;
    opts = opts || {};
    if (opts.dual) {
      el.innerHTML = dual(caretStr, opts);
    } else {
      el.innerHTML = '<div class="vmath-rendered">' + renderCaret(caretStr, opts.display, opts) + '</div>';
    }
  }


  // ════════════════════════════════════════
  // 4. "WORK IT OUT" — Step-by-Step Solver Display
  // ════════════════════════════════════════
  // Shows solution steps one at a time with animation.
  // Each step has: math expression + optional text note.

  /**
   * Build a step-by-step solution panel.
   *
   * @param {string} targetId — ID of container element
   * @param {Array} steps — Array of { math: 'caret notation', note: 'explanation', latex: 'raw latex (optional)' }
   * @param {Object} opts — { animate: true, delay: 600, showAll: false, onComplete: fn }
   */
  function workItOut(targetId, steps, opts) {
    opts = opts || {};
    var animate = opts.animate !== false;
    var delay = opts.delay || 600;
    var container = document.getElementById(targetId);
    if (!container) return;

    // Build the panel HTML
    var html = '<div class="vmath-steps">';
    html += '<div class="vmath-steps-header">';
    html += '<span class="vmath-steps-title">Work It Out</span>';
    html += '<button class="vmath-steps-toggle" onclick="VinculumMath._toggleSteps(this)" title="Show/Hide steps">▼</button>';
    html += '</div>';
    html += '<div class="vmath-steps-body">';

    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      var latex = step.latex || caretToLatex(step.math || '');
      var isLast = (i === steps.length - 1);

      html += '<div class="vmath-step' + (isLast ? ' vmath-step-final' : '') + '"' +
        ' data-step="' + i + '"' +
        (animate && !opts.showAll ? ' style="opacity:0;transform:translateY(10px);"' : '') + '>';

      // Step number
      html += '<div class="vmath-step-num">' + (i + 1) + '</div>';

      // Math + note
      html += '<div class="vmath-step-content">';
      html += '<div class="vmath-step-math">' + renderLatex(latex) + '</div>';
      if (step.note) {
        html += '<div class="vmath-step-note">' + _escapeHtml(step.note) + '</div>';
      }
      // Show caret notation
      if (step.math) {
        html += '<div class="vmath-caret">⌨ ' + _escapeHtml(step.math) + '</div>';
      }
      html += '</div>'; // step-content
      html += '</div>'; // step
    }

    html += '</div>'; // steps-body
    html += '</div>'; // steps

    container.innerHTML = html;

    // Animate steps in one at a time
    if (animate && !opts.showAll) {
      var stepEls = container.querySelectorAll('.vmath-step');
      for (var j = 0; j < stepEls.length; j++) {
        (function(el, idx) {
          setTimeout(function() {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay * idx);
        })(stepEls[j], j);
      }
      // Callback when all steps shown
      if (opts.onComplete) {
        setTimeout(opts.onComplete, delay * steps.length + 400);
      }
    }
  }

  /** Toggle steps visibility (called from the ▼ button) */
  function _toggleSteps(btn) {
    var body = btn.closest('.vmath-steps').querySelector('.vmath-steps-body');
    if (body.style.display === 'none') {
      body.style.display = '';
      btn.textContent = '▼';
    } else {
      body.style.display = 'none';
      btn.textContent = '▶';
    }
  }


  // ════════════════════════════════════════
  // 4b. COLOR-CODED MATCHING SYSTEM
  // ════════════════════════════════════════
  // Links sliders/inputs to parts of a math expression with matching colors.
  // When a student changes "Base = 6", the "6" in the equation glows the same color.
  //
  // Usage:
  //   VinculumMath.colorLink({
  //     target: 'productResult',           // element ID where math is rendered
  //     template: '{base}^{exp1} × {base}^{exp2} = {base}^{sum} = {result}',
  //     templateLatex: '{base}^{{exp1}} \\times {base}^{{exp2}} = {base}^{{sum}} = {result}',
  //     vars: {
  //       base: { value: 6, color: '#00d9ff', label: 'Base' },
  //       exp1: { value: 4, color: '#ff6b6b', label: 'Exponent 1' },
  //       exp2: { value: 4, color: '#ffa500', label: 'Exponent 2' },
  //       sum:  { value: 8, color: '#a78bfa', computed: true },
  //       result: { value: 1679616, color: '#00ff88', computed: true }
  //     }
  //   });
  //
  // Each variable's value is wrapped in a <span> with that color, so the
  // student sees the direct visual link between the control and the math.

  var COLOR_PALETTE = [
    '#00d9ff', // cyan
    '#ff6b6b', // coral
    '#ffa500', // orange
    '#a78bfa', // purple
    '#00ff88', // green
    '#ff006e', // pink
    '#ffd700', // gold
    '#4dd0e1', // teal
  ];

  /**
   * Render a color-coded math expression.
   *
   * @param {Object} config
   * @param {string} config.target — ID of container element
   * @param {string} config.template — Caret notation with {var} placeholders
   * @param {string} [config.templateLatex] — LaTeX with {var} placeholders (optional, auto-converts if missing)
   * @param {Object} config.vars — Map of var name → { value, color?, label?, computed? }
   * @param {boolean} [config.showLegend] — Show color legend below the expression (default true)
   */
  function colorLink(config) {
    var el = document.getElementById(config.target);
    if (!el) return;

    var vars = config.vars;
    var varNames = Object.keys(vars);

    // Assign colors if not specified
    var colorIdx = 0;
    varNames.forEach(function(name) {
      if (!vars[name].color) {
        vars[name].color = COLOR_PALETTE[colorIdx % COLOR_PALETTE.length];
        colorIdx++;
      }
    });

    // Build the KaTeX expression with colored parts
    // We use KaTeX's \textcolor{color}{content} command
    var latexTemplate = config.templateLatex || caretToLatex(config.template);

    var coloredLatex = latexTemplate;
    varNames.forEach(function(name) {
      var v = vars[name];
      var val = String(v.value);
      // Handle thousands with thin spaces
      if (typeof v.value === 'number' && v.value >= 1000) {
        val = v.value.toLocaleString('en-US').replace(/,/g, '{,}');
      }
      // Replace {varName} with \textcolor{color}{value}
      var placeholder = new RegExp('\\{' + name + '\\}', 'g');
      coloredLatex = coloredLatex.replace(placeholder, '\\textcolor{' + v.color + '}{' + val + '}');
    });

    // Build caret notation with colored spans (HTML)
    var caretStr = config.template;
    varNames.forEach(function(name) {
      var v = vars[name];
      var val = String(v.value);
      if (typeof v.value === 'number' && v.value >= 1000) {
        val = v.value.toLocaleString('en-US');
      }
      var placeholder = new RegExp('\\{' + name + '\\}', 'g');
      caretStr = caretStr.replace(placeholder, '<span style="color:' + v.color + ';font-weight:700;">' + val + '</span>');
    });

    // Render
    var html = '<div class="vmath-color-linked">';
    html += '<div class="vmath-rendered" style="font-size:1.4em;">' + renderLatex(coloredLatex) + '</div>';
    html += '<div class="vmath-caret" style="opacity:0.8;">⌨ ' + caretStr + '</div>';

    // Optional legend
    if (config.showLegend !== false) {
      html += '<div class="vmath-legend">';
      varNames.forEach(function(name) {
        var v = vars[name];
        if (v.computed) return; // Don't show computed vars in legend
        html += '<span class="vmath-legend-item">';
        html += '<span class="vmath-legend-dot" style="background:' + v.color + ';"></span>';
        html += '<span class="vmath-legend-label">' + (v.label || name) + ' = ' + v.value + '</span>';
        html += '</span>';
      });
      html += '</div>';
    }

    html += '</div>';
    el.innerHTML = html;

    return {
      /** Update a single variable and re-render */
      update: function(varName, newValue) {
        if (vars[varName]) {
          vars[varName].value = newValue;
          colorLink(config);
        }
      },
      /** Update multiple variables at once */
      updateAll: function(newVars) {
        for (var k in newVars) {
          if (vars[k]) vars[k].value = newVars[k];
        }
        colorLink(config);
      }
    };
  }

  /**
   * Auto-link a slider/input to a colorLink config.
   * Connects an <input> element to a variable in the expression.
   *
   * @param {string} inputId — ID of the slider/input element
   * @param {string} varName — Variable name in the colorLink config
   * @param {Object} linkInstance — Return value from colorLink()
   * @param {Function} [transform] — Optional transform function for computed vars
   */
  function linkInput(inputId, varName, linkInstance, transform) {
    var input = document.getElementById(inputId);
    if (!input || !linkInstance) return;

    function handler() {
      var val = parseFloat(input.value);
      if (isNaN(val)) val = input.value;
      var updates = {};
      updates[varName] = val;
      if (transform) {
        var computed = transform(val);
        for (var k in computed) updates[k] = computed[k];
      }
      linkInstance.updateAll(updates);
    }

    input.addEventListener('input', handler);
    input.addEventListener('change', handler);
  }


  // ════════════════════════════════════════
  // 5. AUTO-RENDER [data-math] ELEMENTS
  // ════════════════════════════════════════
  function _autoRender() {
    // [data-math="latex string"] — renders raw LaTeX
    document.querySelectorAll('[data-math]').forEach(function(el) {
      if (el.getAttribute('data-math-done')) return;
      var latex = el.getAttribute('data-math');
      var display = el.hasAttribute('data-math-display');
      if (typeof katex !== 'undefined') {
        try {
          katex.render(latex, el, { throwOnError: false, displayMode: display });
        } catch(e) {
          el.textContent = latex;
        }
      }
      el.setAttribute('data-math-done', '1');
    });

    // [data-math-caret="caret notation"] — converts then renders
    document.querySelectorAll('[data-math-caret]').forEach(function(el) {
      if (el.getAttribute('data-math-done')) return;
      var caret = el.getAttribute('data-math-caret');
      var display = el.hasAttribute('data-math-display');
      var latex = caretToLatex(caret);
      if (typeof katex !== 'undefined') {
        try {
          katex.render(latex, el, { throwOnError: false, displayMode: display });
        } catch(e) {
          el.textContent = caret;
        }
      }
      el.setAttribute('data-math-done', '1');
    });

    // Also render legacy .katex-render[data-latex] from integer-exponents
    document.querySelectorAll('.katex-render[data-latex]').forEach(function(el) {
      if (el.getAttribute('data-math-done')) return;
      var latex = el.getAttribute('data-latex');
      if (typeof katex !== 'undefined') {
        try {
          katex.render(latex, el, { throwOnError: false });
        } catch(e) {
          el.textContent = latex;
        }
      }
      el.setAttribute('data-math-done', '1');
    });
  }


  // ════════════════════════════════════════
  // 6. INJECT SHARED STYLES
  // ════════════════════════════════════════
  function _injectStyles() {
    if (document.getElementById('vinculum-math-styles')) return;
    var style = document.createElement('style');
    style.id = 'vinculum-math-styles';
    style.textContent = [
      '/* VinculumMath shared styles */',

      /* Dual display */
      '.vmath-dual { margin: 8px 0; }',
      '.vmath-rendered { font-size: 1.3em; line-height: 1.8; }',
      '.vmath-caret { font-size: 11px; color: var(--muted, #888); font-family: "Courier New", Consolas, monospace; margin-top: 2px; opacity: 0.65; }',

      /* Steps panel */
      '.vmath-steps { background: var(--bg2, #1a1a2e); border: 1px solid var(--border, #333); border-radius: 10px; overflow: hidden; margin: 16px 0; }',
      '.vmath-steps-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: rgba(0,212,255,0.08); border-bottom: 1px solid var(--border, #333); }',
      '.vmath-steps-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--cyan, #00d9ff); }',
      '.vmath-steps-toggle { background: none; border: none; color: var(--muted, #888); cursor: pointer; font-size: 14px; padding: 4px 8px; }',
      '.vmath-steps-toggle:hover { color: var(--cyan, #00d9ff); }',
      '.vmath-steps-body { padding: 12px 16px; }',

      /* Individual step */
      '.vmath-step { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }',
      '.vmath-step:last-child { border-bottom: none; }',
      '.vmath-step-final .vmath-step-math { color: var(--green, #00ff88); font-size: 1.1em; }',
      '.vmath-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--card, #16213e); border: 1.5px solid var(--cyan, #00d9ff); color: var(--cyan, #00d9ff); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }',
      '.vmath-step-final .vmath-step-num { background: var(--green, #00ff88); color: var(--bg, #0f0f1e); border-color: var(--green, #00ff88); }',
      '.vmath-step-content { flex: 1; min-width: 0; }',
      '.vmath-step-math { font-size: 1.15em; margin-bottom: 4px; }',
      '.vmath-step-note { font-size: 12px; color: var(--text2, #aaa); font-style: italic; margin-bottom: 2px; }',
      '.vmath-step .vmath-caret { font-size: 10px; }',

      /* Color-linked expressions */
      '.vmath-color-linked { margin: 10px 0; }',
      '.vmath-legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px; }',
      '.vmath-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2, #aaa); }',
      '.vmath-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }',
      '.vmath-legend-label { white-space: nowrap; }',
    ].join('\n');
    document.head.appendChild(style);
  }


  // ════════════════════════════════════════
  // 7. UTILITY
  // ════════════════════════════════════════
  function _escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }


  // ════════════════════════════════════════
  // 8. PUBLIC API
  // ════════════════════════════════════════
  var VinculumMath = {
    /** Wait for KaTeX to load. Returns nothing, takes a callback. */
    ready: function(cb) {
      if (_ready) { cb(); return; }
      _readyCallbacks.push(cb);
    },

    /** Check if KaTeX is loaded */
    isReady: function() { return _ready && typeof katex !== 'undefined'; },

    /** Convert caret notation to LaTeX */
    toLatex: caretToLatex,

    /** Render LaTeX string → HTML */
    renderLatex: renderLatex,

    /** Render caret notation → KaTeX HTML */
    render: renderCaret,

    /** Dual display: rendered math + caret notation */
    dual: dual,

    /** Render into a DOM element by ID */
    renderInto: renderInto,

    /** Step-by-step "Work It Out" panel */
    steps: workItOut,

    /** Color-coded expression linked to inputs */
    colorLink: colorLink,

    /** Connect a slider/input to a colorLink variable */
    linkInput: linkInput,

    /** Color palette for manual use */
    COLORS: COLOR_PALETTE,

    /** Re-run auto-render (call after dynamic content changes) */
    refresh: _autoRender,

    /** Internal: toggle handler for step panels */
    _toggleSteps: _toggleSteps
  };

  // ════════════════════════════════════════
  // 9. BOOTSTRAP
  // ════════════════════════════════════════
  _injectStyles();
  _loadKaTeX();

  // Also re-render after DOMContentLoaded in case elements were added
  document.addEventListener('DOMContentLoaded', function() {
    if (_ready) _autoRender();
  });

  // Export
  global.VinculumMath = VinculumMath;

})(typeof window !== 'undefined' ? window : globalThis);
