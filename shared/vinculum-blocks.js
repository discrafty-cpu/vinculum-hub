/* ═══════════════════════════════════════════════════════════
   VINCULUM BLOCKS — Shared Base-10 Block Engine
   v1.0 — March 2026

   Usage:
     <link rel="stylesheet" href="../../shared/vinculum-blocks.css">
     <script src="../../shared/vinculum-blocks.js"></script>

   Provides visual base-10 block manipulatives for place value tools.
   Supports whole numbers (1000s-1s) and decimals (1s-0.001s).
   Blocks stack with 3D depth, animate in/out, and rescale across views.

   Color coding:
     Whole: red=1000 (cube), orange=100 (flat), yellow=10 (rod), green=1 (unit)
     Decimal: green=1.0 (flat), blue=0.1 (rod), indigo=0.01 (unit), purple=0.001 (tiny)

   The "rescaling secret": the unit from whole numbers becomes the flat
   in decimals — the same 3 shapes (flat, rod, unit) repeat at every scale.
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Auto-inject CSS ──
  const scriptEl = document.currentScript;
  if (scriptEl) {
    const base = scriptEl.src.replace(/[^/]+$/, '');
    if (!document.querySelector('link[href*="vinculum-blocks.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'vinculum-blocks.css';
      document.head.appendChild(link);
    }
  }

  // ── Column Definitions ──
  const COLUMNS = {
    whole: [
      { label:'Thousands', key:'th', color:'#b91c1c', name:'Cube (10×10×10)', power:3, w:100, h:100, cls:'vblk-1000' },
      { label:'Hundreds',  key:'h',  color:'#ea580c', name:'Flat (10×10)',    power:2, w:84,  h:84,  cls:'vblk-100' },
      { label:'Tens',      key:'t',  color:'#ca8a04', name:'Rod (10×1)',      power:1, w:14,  h:84,  cls:'vblk-10' },
      { label:'Ones',      key:'o',  color:'#16a34a', name:'Unit (1×1)',      power:0, w:14,  h:14,  cls:'vblk-1' }
    ],
    decimal: [
      { label:'Ones',       key:'od', color:'#16a34a', name:'Flat (1.0)',      power:0,  w:84, h:84, cls:'vblk-one-flat' },
      { label:'Tenths',     key:'d1', color:'#2563eb', name:'Rod (0.1)',       power:-1, w:10, h:84, cls:'vblk-tenth' },
      { label:'Hundredths', key:'d2', color:'#4f46e5', name:'Unit (0.01)',     power:-2, w:10, h:10, cls:'vblk-hundredth' },
      { label:'Thousandths',key:'d3', color:'#7c3aed', name:'Tiny (0.001)',    power:-3, w:4,  h:4,  cls:'vblk-thousandth' }
    ],
    // Subsets for lower grades
    hundreds: [
      { label:'Hundreds', key:'h', color:'#ea580c', name:'Flat (10×10)', power:2, w:84,  h:84,  cls:'vblk-100' },
      { label:'Tens',     key:'t', color:'#ca8a04', name:'Rod (10×1)',   power:1, w:14,  h:84,  cls:'vblk-10' },
      { label:'Ones',     key:'o', color:'#16a34a', name:'Unit (1×1)',   power:0, w:14,  h:14,  cls:'vblk-1' }
    ],
    tensOnes: [
      { label:'Tens', key:'t', color:'#ca8a04', name:'Rod (10×1)', power:1, w:14, h:84, cls:'vblk-10' },
      { label:'Ones', key:'o', color:'#16a34a', name:'Unit (1×1)', power:0, w:14, h:14, cls:'vblk-1' }
    ]
  };

  // ── Stacking Offsets ──
  function getStackOffsets(col, view) {
    const p = col.power;
    if (view === 'whole' || view === 'hundreds' || view === 'tensOnes') {
      return {
        vStep: p === 3 ? 18 : p === 2 ? 14 : p === 1 ? 12 : 8,
        hStep: p >= 2 ? 3 : 1
      };
    } else {
      return {
        vStep: p === 0 ? 16 : p === -1 ? 14 : p === -2 ? 8 : 5,
        hStep: p >= -1 ? 3 : 0
      };
    }
  }

  // ── Render stacked blocks into a container ──
  function renderBlocks(container, col, count, view) {
    if (typeof container === 'string') container = document.getElementById(container);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < Math.min(count, 9); i++) {
      const el = document.createElement('div');
      el.className = 'vblk-layer ' + col.cls;
      el.style.width = col.w + 'px';
      el.style.height = col.h + 'px';

      const { vStep, hStep } = getStackOffsets(col, view);
      el.style.bottom = (i * vStep) + 'px';
      el.style.left = `calc(50% - ${col.w / 2}px + ${i * hStep}px)`;
      el.style.zIndex = i;
      container.appendChild(el);
    }
  }

  // ── Decompose a number into place-value digits ──
  function decompose(num, view) {
    if (view === 'whole') {
      return {
        th: Math.floor(num / 1000) % 10,
        h:  Math.floor(num / 100) % 10,
        t:  Math.floor(num / 10) % 10,
        o:  num % 10
      };
    } else if (view === 'hundreds') {
      return {
        h: Math.floor(num / 100) % 10,
        t: Math.floor(num / 10) % 10,
        o: num % 10
      };
    } else if (view === 'tensOnes') {
      return {
        t: Math.floor(num / 10) % 10,
        o: num % 10
      };
    } else {
      const str = num.toFixed(3);
      const parts = str.split('.');
      const whole = parseInt(parts[0]) || 0;
      const dec = parts[1] || '000';
      return {
        od: whole % 10,
        d1: parseInt(dec[0]) || 0,
        d2: parseInt(dec[1]) || 0,
        d3: parseInt(dec[2]) || 0
      };
    }
  }

  // ── Compose a number from place-value digits ──
  function compose(vals, view) {
    const cols = COLUMNS[view] || COLUMNS.whole;
    let total = 0;
    cols.forEach(c => {
      total += (vals[c.key] || 0) * Math.pow(10, c.power);
    });
    return parseFloat(total.toFixed(4));
  }

  // ── Expanded form string ──
  function expandedForm(num, view) {
    const d = decompose(num, view);
    const cols = COLUMNS[view] || COLUMNS.whole;
    const parts = [];
    cols.forEach(c => {
      const v = d[c.key] || 0;
      if (v > 0) {
        const placeVal = Math.pow(10, c.power);
        if (c.power === 0) parts.push(String(v));
        else if (c.power > 0) parts.push(v + ' × ' + placeVal);
        else parts.push(v + ' × ' + placeVal.toFixed(Math.abs(c.power)));
      }
    });
    return parts.join(' + ') || '0';
  }

  // ── Number to words ──
  function numberToWords(n) {
    const u = ['','one','two','three','four','five','six','seven','eight','nine'];
    const teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    if (n === 0) return 'zero';

    let whole = Math.floor(n);
    let decPart = Math.round((n - whole) * 1000);
    let parts = [];

    if (whole >= 1000) { parts.push(u[Math.floor(whole/1000)] + ' thousand'); whole %= 1000; }
    if (whole >= 100) { parts.push(u[Math.floor(whole/100)] + ' hundred'); whole %= 100; }
    if (whole >= 20) {
      let w = tens[Math.floor(whole/10)];
      if (whole % 10 > 0) w += '-' + u[whole%10];
      parts.push(w);
    } else if (whole >= 10) {
      parts.push(teens[whole-10]);
    } else if (whole > 0) {
      parts.push(u[whole]);
    }

    if (decPart > 0) {
      if (parts.length > 0) parts.push('and');
      let dw = [];
      let dp = decPart;
      if (dp >= 100) { dw.push(u[Math.floor(dp/100)] + ' hundred'); dp %= 100; }
      if (dp >= 20) {
        let w = tens[Math.floor(dp/10)];
        if (dp % 10 > 0) w += '-' + u[dp%10];
        dw.push(w);
      } else if (dp >= 10) {
        dw.push(teens[dp-10]);
      } else if (dp > 0) {
        dw.push(u[dp]);
      }
      let unitName = 'thousandths';
      if (decPart % 100 === 0) unitName = 'tenths';
      else if (decPart % 10 === 0) unitName = 'hundredths';
      parts.push(dw.join(' ') + ' ' + unitName);
    }
    return parts.join(' ') || 'zero';
  }

  // ── GCD for fraction simplification ──
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }

  function simplifyFraction(num, den) {
    if (num === 0) return { num: 0, den: 1 };
    const g = gcd(Math.abs(num), Math.abs(den));
    return { num: num / g, den: den / g };
  }

  // ── Speech challenge (speak a number) ──
  function speakNumber(val) {
    try {
      const u = new SpeechSynthesisUtterance(String(val));
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch(e) { /* Speech API not available */ }
  }

  // ── Public API ──
  window.VinculumBlocks = {
    COLUMNS: COLUMNS,
    renderBlocks: renderBlocks,
    decompose: decompose,
    compose: compose,
    expandedForm: expandedForm,
    numberToWords: numberToWords,
    gcd: gcd,
    simplifyFraction: simplifyFraction,
    speakNumber: speakNumber,
    getStackOffsets: getStackOffsets
  };

})();
