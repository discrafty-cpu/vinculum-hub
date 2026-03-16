/**
 * VINCULUM TILES — Shared Algebra Tile Engine
 * v1.0 — March 2026
 *
 * Provides algebra tile visualization for equation solving tools.
 * Auto-injects CSS if not already loaded.
 *
 * Usage:
 *   <script src="../../shared/vinculum-tiles.js"></script>
 *
 * Then in your app:
 *   // Create tile mat HTML (or use VinculumTiles.createMat('my-container'))
 *   VinculumTiles.render('tile-left', 'tile-right', '3x + 5 = 20');
 *   VinculumTiles.animateStep(step);  // step has opType, opValue, before, after
 *
 * API:
 *   VinculumTiles.parse(eqStr)              → { left: { xCount, ones }, right: { xCount, ones } }
 *   VinculumTiles.render(leftId, rightId, eqStr)  → renders tiles into containers
 *   VinculumTiles.animateStep(step)         → animated tile transition for an operation
 *   VinculumTiles.createMat(parentId)       → injects tile mat HTML + legend into parent
 *   VinculumTiles.setLabel(text)            → updates the tile label text
 *   VinculumTiles.show()                    → show the tile container
 *   VinculumTiles.hide()                    → hide the tile container
 *
 * Step object format:
 *   { before: '3x + 5 = 20', after: '3x = 15', opType: 'subtract', opValue: 5 }
 *   opTypes: 'subtract', 'add', 'divide', 'multiply', 'subtractVar', 'distribute'
 */

var VinculumTiles = (function() {
  'use strict';

  var cssInjected = false;
  var containerId = 'vtile-container';
  var leftId = 'tile-left';
  var rightId = 'tile-right';
  var labelId = 'tile-label';

  // ════════════════════════════════════════════════════
  // CSS AUTO-INJECTION
  // ════════════════════════════════════════════════════
  function injectCSS() {
    if (cssInjected) return;
    if (document.getElementById('vinculum-tiles-styles')) { cssInjected = true; return; }

    // Try to find the CSS file relative to this script
    var scripts = document.querySelectorAll('script[src]');
    var basePath = '';
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (src && src.indexOf('vinculum-tiles.js') !== -1) {
        basePath = src.replace('vinculum-tiles.js', '');
        break;
      }
    }

    // Load external CSS file
    var link = document.createElement('link');
    link.id = 'vinculum-tiles-styles';
    link.rel = 'stylesheet';
    link.href = basePath + 'vinculum-tiles.css';
    document.head.appendChild(link);
    cssInjected = true;
  }

  // ════════════════════════════════════════════════════
  // EQUATION PARSER
  // ════════════════════════════════════════════════════
  /**
   * Parse an equation string into tile data.
   * "3x + 5 = 20" → { left: { xCount: 3, ones: 5 }, right: { xCount: 0, ones: 20 } }
   */
  function parse(eqStr) {
    var parts = eqStr.split('=');
    return {
      left: parseSide(parts[0] || ''),
      right: parseSide(parts[1] || '')
    };
  }

  function parseSide(sideStr) {
    var s = sideStr.trim();
    var xCount = 0;
    var ones = 0;

    // Handle parentheses: "3(x + 2)" → distribute for tile display
    var distMatch = s.match(/^(\d+)\(x\s*([+\-])\s*(\d+)\)$/);
    if (distMatch) {
      var coeff = parseInt(distMatch[1]);
      var sign = distMatch[2] === '+' ? 1 : -1;
      var inner = parseInt(distMatch[3]);
      return { xCount: coeff, ones: coeff * sign * inner };
    }

    // Tokenize on + or - (keeping the sign with each token)
    var tokens = s.replace(/\s/g, '').match(/[+\-]?[^+\-]+/g) || [];

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i].trim();
      if (!t) continue;

      if (t.indexOf('x') !== -1) {
        var xStr = t.replace('x', '');
        if (xStr === '' || xStr === '+') xCount += 1;
        else if (xStr === '-') xCount -= 1;
        else xCount += parseInt(xStr);
      } else {
        ones += parseInt(t);
      }
    }

    return { xCount: xCount, ones: ones };
  }

  // ════════════════════════════════════════════════════
  // TILE RENDERING
  // ════════════════════════════════════════════════════
  function buildHTML(side) {
    var html = '';
    var i;
    var MAX_TILES = 20;

    // Positive x tiles
    for (i = 0; i < Math.max(0, side.xCount); i++) {
      html += '<div class="tile tile-x" data-type="x">x</div>';
    }
    // Negative x tiles
    for (i = 0; i < Math.max(0, -side.xCount); i++) {
      html += '<div class="tile tile-neg-x" data-type="-x">\u2212x</div>';
    }
    // Positive 1 tiles (cap at MAX_TILES, show badge if over)
    var posOnes = Math.max(0, side.ones);
    if (posOnes > 0 && posOnes <= MAX_TILES) {
      for (i = 0; i < posOnes; i++) {
        html += '<div class="tile tile-1" data-type="1">1</div>';
      }
    } else if (posOnes > MAX_TILES) {
      html += '<div class="tile tile-1" data-type="1" style="width:auto;padding:0 8px;">' + posOnes + '</div>';
    }
    // Negative 1 tiles
    var negOnes = Math.max(0, -side.ones);
    if (negOnes > 0 && negOnes <= MAX_TILES) {
      for (i = 0; i < negOnes; i++) {
        html += '<div class="tile tile-neg-1" data-type="-1">\u22121</div>';
      }
    } else if (negOnes > MAX_TILES) {
      html += '<div class="tile tile-neg-1" data-type="-1" style="width:auto;padding:0 8px;">\u2212' + negOnes + '</div>';
    }

    return html;
  }

  /**
   * Render tiles from an equation string.
   */
  function render(lId, rId, eqStr) {
    var data = (typeof eqStr === 'string') ? parse(eqStr) : eqStr;
    var leftEl = document.getElementById(lId || leftId);
    var rightEl = document.getElementById(rId || rightId);
    if (!leftEl || !rightEl) return;

    leftEl.innerHTML = buildHTML(data.left);
    rightEl.innerHTML = buildHTML(data.right);
  }

  /**
   * Render tile data directly (not from string).
   */
  function renderData(data) {
    var leftEl = document.getElementById(leftId);
    var rightEl = document.getElementById(rightId);
    if (!leftEl || !rightEl) return;

    leftEl.innerHTML = buildHTML(data.left);
    rightEl.innerHTML = buildHTML(data.right);
  }

  // ════════════════════════════════════════════════════
  // TILE ANIMATION
  // ════════════════════════════════════════════════════
  /**
   * Add operation tiles (appear highlighted before cancellation).
   */
  function addOpTiles(container, onesCount, xCountAdd) {
    var i;
    if (onesCount < 0) {
      for (i = 0; i < Math.min(-onesCount, 15); i++) {
        var tile = document.createElement('div');
        tile.className = 'tile tile-neg-1 zero-pair';
        tile.dataset.type = '-1';
        tile.dataset.operation = 'true';
        tile.textContent = '\u22121';
        container.appendChild(tile);
      }
    }
    if (onesCount > 0) {
      for (i = 0; i < Math.min(onesCount, 15); i++) {
        var tile = document.createElement('div');
        tile.className = 'tile tile-1 zero-pair';
        tile.dataset.type = '1';
        tile.dataset.operation = 'true';
        tile.textContent = '1';
        container.appendChild(tile);
      }
    }
    if (xCountAdd && xCountAdd < 0) {
      for (i = 0; i < Math.min(-xCountAdd, 10); i++) {
        var tile = document.createElement('div');
        tile.className = 'tile tile-neg-x zero-pair';
        tile.dataset.type = '-x';
        tile.dataset.operation = 'true';
        tile.textContent = '\u2212x';
        container.appendChild(tile);
      }
    }
    if (xCountAdd && xCountAdd > 0) {
      for (i = 0; i < Math.min(xCountAdd, 10); i++) {
        var tile = document.createElement('div');
        tile.className = 'tile tile-x zero-pair';
        tile.dataset.type = 'x';
        tile.dataset.operation = 'true';
        tile.textContent = 'x';
        container.appendChild(tile);
      }
    }
  }

  /**
   * Find and highlight zero pairs, then cancel them.
   */
  function highlightZeroPairs(container) {
    var tiles = container.querySelectorAll('.tile');
    var pos1 = [], neg1 = [], posX = [], negX = [];

    tiles.forEach(function(t) {
      var type = t.dataset.type;
      if (type === '1') pos1.push(t);
      else if (type === '-1') neg1.push(t);
      else if (type === 'x') posX.push(t);
      else if (type === '-x') negX.push(t);
    });

    var pairsOnes = Math.min(pos1.length, neg1.length);
    for (var i = 0; i < pairsOnes; i++) {
      pos1[i].classList.add('cancelling');
      neg1[i].classList.add('cancelling');
    }

    var pairsX = Math.min(posX.length, negX.length);
    for (var j = 0; j < pairsX; j++) {
      posX[j].classList.add('cancelling');
      negX[j].classList.add('cancelling');
    }

    setTimeout(function() {
      container.querySelectorAll('.cancelling').forEach(function(t) {
        t.classList.remove('cancelling');
        t.classList.add('cancelled');
      });
    }, 600);
  }

  /**
   * Animate a step: render before state, add operation tiles,
   * show zero-pair cancellation, then resolve to after state.
   *
   * step = { before, after, opType, opValue, instruction }
   */
  function animateStep(step) {
    var prevTiles = parse(step.before);
    var newTiles = parse(step.after);

    var leftEl = document.getElementById(leftId);
    var rightEl = document.getElementById(rightId);
    if (!leftEl || !rightEl) return;

    // Render the "before" state
    leftEl.innerHTML = buildHTML(prevTiles.left);
    rightEl.innerHTML = buildHTML(prevTiles.right);

    var lblEl = document.getElementById(labelId);

    if (step.opType === 'subtract') {
      var val = step.opValue;
      addOpTiles(leftEl, -val);
      addOpTiles(rightEl, -val);
      setTimeout(function() { highlightZeroPairs(leftEl); highlightZeroPairs(rightEl); }, 400);
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Removed ' + val + ' unit tile' + (val > 1 ? 's' : '') + ' from both sides';
      }, 1200);

    } else if (step.opType === 'add') {
      var val = step.opValue;
      addOpTiles(leftEl, val);
      addOpTiles(rightEl, val);
      setTimeout(function() { highlightZeroPairs(leftEl); highlightZeroPairs(rightEl); }, 400);
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Added ' + val + ' unit tile' + (val > 1 ? 's' : '') + ' to both sides';
      }, 1200);

    } else if (step.opType === 'divide') {
      var val = step.opValue;
      if (lblEl) lblEl.textContent = 'Split both sides into ' + val + ' equal groups \u2014 take one group';
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Divided by ' + val + ' \u2014 each group has the same value';
      }, 1000);

    } else if (step.opType === 'multiply') {
      var val = step.opValue;
      if (lblEl) lblEl.textContent = 'Multiply both sides by ' + val;
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Multiplied by ' + val + ' \u2014 both sides grew equally';
      }, 1000);

    } else if (step.opType === 'subtractVar') {
      var val = step.opValue;
      addOpTiles(leftEl, 0, -val);
      addOpTiles(rightEl, 0, -val);
      setTimeout(function() { highlightZeroPairs(leftEl); highlightZeroPairs(rightEl); }, 400);
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Removed ' + val + 'x tile' + (val > 1 ? 's' : '') + ' from both sides';
      }, 1200);

    } else if (step.opType === 'distribute') {
      if (lblEl) lblEl.textContent = 'Distribute \u2014 multiply each term inside the parentheses';
      setTimeout(function() {
        renderData(newTiles);
        if (lblEl) lblEl.textContent = 'Distributed \u2014 now see each term individually';
      }, 1000);

    } else {
      renderData(newTiles);
    }
  }

  // ════════════════════════════════════════════════════
  // TILE MAT CREATION — inject full HTML into a parent
  // ════════════════════════════════════════════════════
  /**
   * Create the tile mat HTML inside a parent element.
   * parentId: ID of parent element, or a parent DOM element
   * opts: { leftId, rightId, labelId, containerId, showLegend }
   */
  function createMat(parentId, opts) {
    opts = opts || {};
    var lId = opts.leftId || leftId;
    var rId = opts.rightId || rightId;
    var lbl = opts.labelId || labelId;
    var cId = opts.containerId || containerId;
    var showLegend = opts.showLegend !== false;

    // Update module IDs if custom ones provided
    leftId = lId;
    rightId = rId;
    labelId = lbl;
    containerId = cId;

    var parent = (typeof parentId === 'string')
      ? document.getElementById(parentId)
      : parentId;
    if (!parent) return;

    var html = '<div id="' + cId + '" style="background:var(--card,#1a2236);border:1px solid var(--border,#2a3654);border-radius:1rem;padding:1.5rem;text-align:center;">';
    html += '<div class="tile-mat">';
    html += '  <div class="tile-side" id="' + lId + '"></div>';
    html += '  <div class="tile-equals">=</div>';
    html += '  <div class="tile-side" id="' + rId + '"></div>';
    html += '</div>';

    if (showLegend) {
      html += '<div class="tile-legend">';
      html += '  <span class="tile-legend-item"><span class="tile-legend-swatch" style="background:linear-gradient(135deg,#42a5f5,#1e88e5)"></span> x</span>';
      html += '  <span class="tile-legend-item"><span class="tile-legend-swatch" style="background:linear-gradient(135deg,#ffee58,#fdd835)"></span> +1</span>';
      html += '  <span class="tile-legend-item"><span class="tile-legend-swatch" style="background:linear-gradient(135deg,#ef5350,#c62828)"></span> negative</span>';
      html += '</div>';
    }

    html += '<div class="tile-label" id="' + lbl + '">Each tile represents a term \u2014 keep both sides equal</div>';
    html += '</div>';

    parent.innerHTML = html;
  }

  // ════════════════════════════════════════════════════
  // UTILITY
  // ════════════════════════════════════════════════════
  function setLabel(text) {
    var el = document.getElementById(labelId);
    if (el) el.textContent = text;
  }

  function show() {
    var el = document.getElementById(containerId);
    if (el) el.style.display = '';
  }

  function hide() {
    var el = document.getElementById(containerId);
    if (el) el.style.display = 'none';
  }

  // Auto-inject CSS on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCSS);
  } else {
    injectCSS();
  }

  // ════════════════════════════════════════════════════
  // PUBLIC API
  // ════════════════════════════════════════════════════
  return {
    parse: parse,
    render: render,
    renderData: renderData,
    buildHTML: buildHTML,
    animateStep: animateStep,
    createMat: createMat,
    setLabel: setLabel,
    show: show,
    hide: hide,
    highlightZeroPairs: highlightZeroPairs
  };

})();
