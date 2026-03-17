/**
 * ═══════════════════════════════════════════════════════════════
 * VINCULUM — Graph Rendering Engine v1.0
 * ═══════════════════════════════════════════════════════════════
 * Professional HiDPI canvas-based coordinate graph renderer.
 * Extracted from Proportional Propulsion premium tool.
 *
 * Renders proportional relationship graphs (y = kx) with:
 *   - HiDPI / Retina support (devicePixelRatio scaling)
 *   - Minor + major gridlines with adaptive spacing
 *   - Axis arrows, tick marks, and labeled axes
 *   - Proportional line through origin with glow effect
 *   - Dashed guide lines from points to axes
 *   - Glowing data points with coordinate labels
 *   - Background gradient for depth
 *
 * USAGE — Quick (drop-in replacement for old drawMiniGraph):
 *   VinculumGraph.draw(canvas, {
 *     k: 4,
 *     points: [{x:1,y:4},{x:2,y:8}],
 *     max: 10,
 *     xLabel: 'astronauts',
 *     yLabel: 'meal packs',
 *     showGuides: true
 *   });
 *
 * USAGE — Full options:
 *   VinculumGraph.draw(canvas, {
 *     k: 2.5,                  // slope of proportional line (optional)
 *     points: [...],           // array of {x, y} to plot
 *     max: 10,                 // axis max value (default 10)
 *     xLabel: 'x-axis label',  // optional axis title
 *     yLabel: 'y-axis label',  // optional axis title
 *     showGuides: false,       // dashed lines from points to axes
 *     showLine: true,          // draw y=kx line (default true if k given)
 *     lineColor: '#40c4ff',    // override line color
 *     pointColor: '#00e676',   // override point color
 *     gridColor: '#00e676',    // override grid color
 *     pad: {top,right,bottom,left}, // override padding
 *   });
 *
 * ALSO PROVIDES:
 *   VinculumGraph.version  — '1.0.0'
 *   VinculumGraph.drawAxis(ctx, opts) — draw just axes (for custom graphs)
 *   VinculumGraph.plotPoint(ctx, gx, gy, x, y, opts) — plot single point
 *
 * DESIGN PHILOSOPHY:
 *   Every graph in Vinculum should look like it belongs in a professional
 *   math textbook, but feel alive. Glowing points, subtle gradients, and
 *   clean typography create visual hierarchy that helps students read
 *   the mathematics, not just see shapes.
 * ═══════════════════════════════════════════════════════════════
 */

var VinculumGraph = (function() {
  'use strict';

  var version = '1.0.0';

  /* ── Default colors (Vinculum palette) ── */
  var DEFAULTS = {
    gridColor:    '#00e676',
    lineColor:    '#40c4ff',
    pointColor:   '#00e676',
    guideColor:   '#ff6d00',
    labelColor:   '#00e676',
    axisLabelColor: '#40c4ff',
    bgTop:        'rgba(6,6,20,.95)',
    bgBottom:     'rgba(4,4,14,.98)',
    font:         '"Segoe UI", sans-serif',
    max:          10,
    pad:          { top: 24, right: 24, bottom: 38, left: 46 }
  };

  /**
   * Main draw function — renders a full coordinate graph on a canvas.
   *
   * @param {HTMLCanvasElement} canvas — target canvas element
   * @param {Object} opts — rendering options (see header docs)
   */
  function draw(canvas, opts) {
    opts = opts || {};
    var maxV  = opts.max || DEFAULTS.max;
    var pad   = opts.pad || DEFAULTS.pad;
    var font  = opts.font || DEFAULTS.font;

    /* ── HiDPI setup ── */
    var dpr  = Math.min(window.devicePixelRatio || 1, 2);
    var cssW = canvas.width;
    var cssH = canvas.height;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width  = cssW + 'px';
    canvas.style.height = cssH + 'px';

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    /* ── Coordinate system ── */
    var cw = cssW, ch = cssH;
    var pw = cw - pad.left - pad.right;
    var ph = ch - pad.top  - pad.bottom;
    var sx = pw / maxV;
    var sy = ph / maxV;
    var gx = function(v) { return pad.left + v * sx; };
    var gy = function(v) { return ch - pad.bottom - v * sy; };

    /* ── Background gradient ── */
    var bgGrad = ctx.createLinearGradient(0, 0, 0, ch);
    bgGrad.addColorStop(0, opts.bgTop    || DEFAULTS.bgTop);
    bgGrad.addColorStop(1, opts.bgBottom || DEFAULTS.bgBottom);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cw, ch);

    /* ── Minor grid ── */
    var gc = opts.gridColor || DEFAULTS.gridColor;
    ctx.strokeStyle = hexToRgba(gc, 0.05);
    ctx.lineWidth = 0.5;
    for (var i = 0; i <= maxV; i++) {
      ctx.beginPath(); ctx.moveTo(gx(i), gy(0)); ctx.lineTo(gx(i), gy(maxV)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx(0), gy(i)); ctx.lineTo(gx(maxV), gy(i)); ctx.stroke();
    }

    /* ── Major grid ── */
    var majStep = maxV >= 8 ? 5 : 2;
    ctx.strokeStyle = hexToRgba(gc, 0.12);
    ctx.lineWidth = 1;
    for (var j = majStep; j <= maxV; j += majStep) {
      ctx.beginPath(); ctx.moveTo(gx(j), gy(0)); ctx.lineTo(gx(j), gy(maxV)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx(0), gy(j)); ctx.lineTo(gx(maxV), gy(j)); ctx.stroke();
    }

    /* ── Axes ── */
    ctx.strokeStyle = hexToRgba(gc, 0.5);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gx(0), gy(0)); ctx.lineTo(gx(maxV), gy(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx(0), gy(0)); ctx.lineTo(gx(0), gy(maxV)); ctx.stroke();

    /* ── Axis arrows ── */
    ctx.fillStyle = hexToRgba(gc, 0.5);
    ctx.beginPath();
    ctx.moveTo(gx(maxV) + 6, gy(0));
    ctx.lineTo(gx(maxV) - 2, gy(0) - 4);
    ctx.lineTo(gx(maxV) - 2, gy(0) + 4);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(gx(0), gy(maxV) - 6);
    ctx.lineTo(gx(0) - 4, gy(maxV) + 2);
    ctx.lineTo(gx(0) + 4, gy(maxV) + 2);
    ctx.fill();

    /* ── Tick marks & labels ── */
    ctx.fillStyle = hexToRgba(gc, 0.45);
    ctx.font = 'bold 11px ' + font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.strokeStyle = hexToRgba(gc, 0.3);
    ctx.lineWidth = 1;

    for (var t = 1; t <= maxV; t++) {
      // X ticks
      ctx.beginPath(); ctx.moveTo(gx(t), gy(0)); ctx.lineTo(gx(t), gy(0) + 4); ctx.stroke();
      ctx.fillText(t, gx(t), gy(0) + 6);
      // Y ticks
      ctx.beginPath(); ctx.moveTo(gx(0), gy(t)); ctx.lineTo(gx(0) - 4, gy(t)); ctx.stroke();
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(t, gx(0) - 7, gy(t));
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    }

    // Origin label
    ctx.textAlign = 'right'; ctx.textBaseline = 'top';
    ctx.fillStyle = hexToRgba(gc, 0.3);
    ctx.fillText('0', gx(0) - 5, gy(0) + 4);

    /* ── Axis titles ── */
    var alc = opts.axisLabelColor || DEFAULTS.axisLabelColor;
    if (opts.xLabel) {
      ctx.fillStyle = hexToRgba(alc, 0.5);
      ctx.font = 'bold 12px ' + font;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(opts.xLabel, gx(maxV / 2), ch - 6);
    }
    if (opts.yLabel) {
      ctx.fillStyle = hexToRgba(alc, 0.5);
      ctx.font = 'bold 12px ' + font;
      ctx.save();
      ctx.translate(12, gy(maxV / 2));
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(opts.yLabel, 0, 0);
      ctx.restore();
    }

    /* ── Proportional line y=kx (with glow) ── */
    var k = opts.k;
    var showLine = opts.showLine !== undefined ? opts.showLine : (k !== undefined && k > 0);
    var lc = opts.lineColor || DEFAULTS.lineColor;

    if (showLine && k > 0) {
      var ex = maxV, ey = k * ex;
      if (ey > maxV) { ey = maxV; ex = maxV / k; }
      // Glow layer
      ctx.strokeStyle = hexToRgba(lc, 0.15);
      ctx.lineWidth = 6;
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(gx(0), gy(0)); ctx.lineTo(gx(ex), gy(ey)); ctx.stroke();
      // Main line
      ctx.strokeStyle = hexToRgba(lc, 0.6);
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(gx(0), gy(0)); ctx.lineTo(gx(ex), gy(ey)); ctx.stroke();
    }

    /* ── Dashed guide lines from points to axes ── */
    var gc2 = opts.guideColor || DEFAULTS.guideColor;
    if (opts.points && opts.showGuides) {
      opts.points.forEach(function(p) {
        ctx.strokeStyle = hexToRgba(gc2, 0.2);
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(gx(p.x), gy(p.y)); ctx.lineTo(gx(p.x), gy(0)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(gx(p.x), gy(p.y)); ctx.lineTo(gx(0), gy(p.y)); ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    /* ── Data points with glow ── */
    var pc = opts.pointColor || DEFAULTS.pointColor;
    if (opts.points) {
      opts.points.forEach(function(p) {
        plotPoint(ctx, gx, gy, p.x, p.y, { color: pc, font: font });
      });
    }

    /* ── Origin dot ── */
    ctx.fillStyle = hexToRgba(pc, 0.5);
    ctx.beginPath(); ctx.arc(gx(0), gy(0), 4, 0, Math.PI * 2); ctx.fill();
  }

  /**
   * Plot a single glowing data point with coordinate label.
   */
  function plotPoint(ctx, gx, gy, x, y, opts) {
    opts = opts || {};
    var color = opts.color || DEFAULTS.pointColor;
    var font  = opts.font  || DEFAULTS.font;

    // Outer glow
    ctx.shadowColor = hexToRgba(color, 0.6);
    ctx.shadowBlur = 12;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(gx(x), gy(y), 7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Inner white dot
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(gx(x), gy(y), 2.5, 0, Math.PI * 2); ctx.fill();

    // Label with background
    var label = '(' + x + ', ' + y + ')';
    ctx.font = 'bold 12px ' + font;
    var tw = ctx.measureText(label).width;
    var lx = gx(x) + 10;
    var ly = gy(y) - 8;

    ctx.fillStyle = 'rgba(4,4,16,.85)';
    ctx.fillRect(lx - 3, ly - 11, tw + 6, 16);
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(label, lx, ly);
  }

  /* ── Color utility ── */
  function hexToRgba(hex, alpha) {
    // Handle already-rgba strings
    if (hex.indexOf('rgba') === 0 || hex.indexOf('rgb') === 0) {
      return hex.replace(/[\d.]+\)$/, alpha + ')');
    }
    // Parse hex
    var r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ── Public API ── */
  return {
    version:   version,
    draw:      draw,
    plotPoint: plotPoint,
    hexToRgba: hexToRgba,
    DEFAULTS:  DEFAULTS
  };

})();

/* ── Backward-compatible global for existing tools ── */
if (typeof drawMiniGraph === 'undefined') {
  function drawMiniGraph(canvas, k, points, maxV, opts) {
    VinculumGraph.draw(canvas, {
      k:          k,
      points:     points,
      max:        maxV,
      xLabel:     opts && opts.xLabel,
      yLabel:     opts && opts.yLabel,
      showGuides: opts && opts.showGuides
    });
  }
}
