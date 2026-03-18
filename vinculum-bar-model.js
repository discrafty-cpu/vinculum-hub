/**
 * ═══════════════════════════════════════════════════════════════
 * VINCULUM — Bar Model Visualization Engine v1.0
 * ═══════════════════════════════════════════════════════════════
 * CRA-based bar model and ratio visualization for proportional
 * reasoning. Extracted from the Proportional Propulsion remediation.
 *
 * The bar model is the REPRESENTATIONAL bridge in CRA:
 *   Concrete (manipulatives) → Representational (bar model) → Abstract (equation)
 *
 * A child SEES that "×4" means the green bar is 4x longer than the blue bar.
 * This is how a 7th grader remembers what k=4 means without memorizing a rule.
 *
 * PROVIDES:
 *
 * 1. VinculumBarModel.single(opts) — Single ratio bar (x → y)
 *    Returns HTML string showing one input mapped to one output via multiplier.
 *
 * 2. VinculumBarModel.multi(opts) — Stacked growth bars (x=1,2,3...)
 *    Returns HTML string showing how the relationship scales.
 *
 * 3. VinculumBarModel.fraction(opts) — Partitioned bar for fractions
 *    Returns HTML string showing a bar divided into equal parts.
 *
 * 4. VinculumBarModel.injectCSS() — Inject bar model styles into page
 *    Called automatically on first use; safe to call multiple times.
 *
 * USAGE:
 *   // Inject styles once (auto-called, but explicit is fine)
 *   VinculumBarModel.injectCSS();
 *
 *   // Single ratio: 2 astronauts → 8 meal packs (k=4)
 *   container.innerHTML = VinculumBarModel.single({
 *     k: 4, x: 2,
 *     xUnit: 'astronauts', yUnit: 'meal packs',
 *     title: 'RATIO VISUALIZATION'
 *   });
 *
 *   // Stacked growth: show x=1,2,3 all scaling by k
 *   container.innerHTML = VinculumBarModel.multi({
 *     k: 4, maxX: 3,
 *     xUnit: 'astronauts', yUnit: 'meal packs'
 *   });
 *
 *   // Fraction: show 3/4 as a partitioned bar
 *   container.innerHTML = VinculumBarModel.fraction({
 *     numerator: 3, denominator: 4,
 *     label: '3/4 of the pizza'
 *   });
 *
 * CSS NOTE:
 *   Styles are auto-injected and use `.vbm-` prefix to avoid conflicts.
 *   Colors follow the Vinculum dark palette by default.
 * ═══════════════════════════════════════════════════════════════
 */

var VinculumBarModel = (function() {
  'use strict';

  var version = '1.0.0';
  var cssInjected = false;

  /* ── KaTeX fraction display helper (matches Proportional Propulsion) ── */
  var FRAC_MAP = {
    0.25: '¼', 0.33: '⅓', 0.5: '½',
    0.67: '⅔', 0.75: '¾', 1.5: '1½', 2.5: '2½', 3.5: '3½'
  };
  function kDisplay(k) {
    if (FRAC_MAP[k]) return FRAC_MAP[k];
    if (Number.isInteger(k)) return String(k);
    return String(k);
  }

  /* ══════════════════════════════════════
     CSS INJECTION
     ══════════════════════════════════════ */
  function injectCSS() {
    if (cssInjected) return;
    if (document.getElementById('vinculum-bar-model-styles')) { cssInjected = true; return; }

    var style = document.createElement('style');
    style.id = 'vinculum-bar-model-styles';
    style.textContent = [
      '.vbm-wrap{display:flex;flex-direction:column;gap:6px;align-items:center;',
      '  padding:14px;background:rgba(8,8,24,.6);border:1px solid rgba(0,230,118,.15);border-radius:8px;}',
      '.vbm-title{font-size:10px;letter-spacing:2px;color:rgba(0,230,118,.5);font-weight:700;margin-bottom:4px;}',
      '.vbm-row{display:flex;align-items:center;gap:10px;width:100%;}',
      '.vbm-label{font-size:12px;color:rgba(255,255,255,.6);min-width:20px;text-align:right;font-weight:600;}',
      '.vbm-track{flex:1;height:22px;background:rgba(255,255,255,.04);border-radius:4px;overflow:hidden;position:relative;}',
      '.vbm-fill{height:100%;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center;}',
      '.vbm-fill-x{background:linear-gradient(90deg,rgba(64,196,255,.35),rgba(64,196,255,.5));}',
      '.vbm-fill-y{background:linear-gradient(90deg,rgba(0,230,118,.35),rgba(0,230,118,.5));}',
      '.vbm-val{font-size:11px;font-weight:800;color:#fff;padding:0 6px;white-space:nowrap;}',
      '.vbm-arrow{font-size:16px;color:#ff9100;font-weight:900;text-align:center;margin:2px 0;letter-spacing:2px;}',
      '.vbm-note{font-size:10px;color:rgba(255,109,0,.6);margin-top:6px;letter-spacing:1px;}',
      '.vbm-note b{color:#ff9100;}',
      /* Fraction bar variant */
      '.vbm-frac-track{display:flex;height:28px;border-radius:4px;overflow:hidden;border:1px solid rgba(0,230,118,.2);}',
      '.vbm-frac-part{flex:1;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;',
      '  border-right:1px solid rgba(255,255,255,.1);}',
      '.vbm-frac-part:last-child{border-right:none;}',
      '.vbm-frac-filled{background:rgba(0,230,118,.3);color:#00e676;}',
      '.vbm-frac-empty{background:rgba(255,255,255,.03);color:rgba(255,255,255,.2);}',
    ].join('\n');

    document.head.appendChild(style);
    cssInjected = true;
  }

  /* ══════════════════════════════════════
     SINGLE RATIO BAR
     Shows: x units → ×k → y units
     ══════════════════════════════════════ */
  function single(opts) {
    injectCSS();
    opts = opts || {};
    var k     = opts.k || 1;
    var x     = opts.x || 1;
    var xUnit = opts.xUnit || 'units';
    var yUnit = opts.yUnit || 'items';
    var title = opts.title || 'RATIO VISUALIZATION';
    var y     = Math.round(k * x);
    var maxBar = Math.max(k * x, x) * 1.1;
    var xPct  = Math.round((x / maxBar) * 100);
    var yPct  = Math.round((y / maxBar) * 100);

    return [
      '<div class="vbm-wrap">',
      '  <div class="vbm-title">' + title + '</div>',
      '  <div class="vbm-row">',
      '    <div class="vbm-label" style="color:#40c4ff;">' + x + '</div>',
      '    <div class="vbm-track">',
      '      <div class="vbm-fill vbm-fill-x" style="width:' + xPct + '%;">',
      '        <span class="vbm-val">' + x + ' ' + xUnit + '</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="vbm-arrow">\u00d7 ' + kDisplay(k) + ' \u2193</div>',
      '  <div class="vbm-row">',
      '    <div class="vbm-label" style="color:#00e676;">' + y + '</div>',
      '    <div class="vbm-track">',
      '      <div class="vbm-fill vbm-fill-y" style="width:' + yPct + '%;">',
      '        <span class="vbm-val">' + y + ' ' + yUnit + '</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ══════════════════════════════════════
     MULTI (STACKED GROWTH) BARS
     Shows bars growing for x=1,2,...,maxX
     ══════════════════════════════════════ */
  function multi(opts) {
    injectCSS();
    opts = opts || {};
    var k     = opts.k || 1;
    var maxX  = opts.maxX || 3;
    var xUnit = opts.xUnit || 'units';
    var yUnit = opts.yUnit || 'items';
    var title = opts.title || 'SEE THE PATTERN GROW';
    var maxVal = k * maxX * 1.1;

    var rows = '';
    for (var xi = 1; xi <= maxX; xi++) {
      var y    = Math.round(k * xi);
      var yPct = Math.round((y / maxVal) * 100);
      rows += [
        '<div class="vbm-row">',
        '  <div class="vbm-label" style="color:#40c4ff;font-size:11px;">' + xi + '</div>',
        '  <div class="vbm-track" style="height:18px;">',
        '    <div class="vbm-fill vbm-fill-y" style="width:' + yPct + '%;">',
        '      <span class="vbm-val" style="font-size:10px;">' + y + '</span>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');
    }

    return [
      '<div class="vbm-wrap">',
      '  <div class="vbm-title">' + title + '</div>',
      rows,
      '  <div class="vbm-note">Each bar is <b>\u00d7' + kDisplay(k) + '</b> the ' + xUnit + ' count</div>',
      '</div>'
    ].join('\n');
  }

  /* ══════════════════════════════════════
     FRACTION BAR
     Shows a bar partitioned into equal parts,
     some filled (numerator) and rest empty.
     ══════════════════════════════════════ */
  function fraction(opts) {
    injectCSS();
    opts = opts || {};
    var num   = opts.numerator   || 1;
    var den   = opts.denominator || 4;
    var label = opts.label || (num + '/' + den);
    var title = opts.title || 'FRACTION MODEL';

    var parts = '';
    for (var i = 0; i < den; i++) {
      var filled = i < num;
      var cls = filled ? 'vbm-frac-filled' : 'vbm-frac-empty';
      parts += '<div class="vbm-frac-part ' + cls + '">' + (filled ? (i + 1) : '') + '</div>';
    }

    return [
      '<div class="vbm-wrap">',
      '  <div class="vbm-title">' + title + '</div>',
      '  <div style="width:100%;max-width:300px;">',
      '    <div class="vbm-frac-track">' + parts + '</div>',
      '  </div>',
      '  <div class="vbm-note" style="color:rgba(64,196,255,.6);">' + label + '</div>',
      '</div>'
    ].join('\n');
  }

  /* ── Public API ── */
  return {
    version:   version,
    single:    single,
    multi:     multi,
    fraction:  fraction,
    injectCSS: injectCSS,
    kDisplay:  kDisplay
  };

})();

/* ── Backward-compatible globals for Proportional Propulsion ── */
if (typeof buildBarModelHTML === 'undefined') {
  function buildBarModelHTML(k, x, prov, highlightX) {
    return VinculumBarModel.single({
      k: k, x: x,
      xUnit: prov.unit, yUnit: prov.item
    });
  }
}
if (typeof buildMultiBarHTML === 'undefined') {
  function buildMultiBarHTML(k, maxX, prov) {
    return VinculumBarModel.multi({
      k: k, maxX: maxX,
      xUnit: prov.unit, yUnit: prov.item
    });
  }
}
