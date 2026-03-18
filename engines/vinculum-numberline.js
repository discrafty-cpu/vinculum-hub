/**
 * ═══════════════════════════════════════════════════════════════
 * VINCULUM — Number Line Engine v1.0
 * ═══════════════════════════════════════════════════════════════
 * Shared rendering and interaction engine for all Vinculum
 * number line tools (K–7). Handles:
 *
 *   - Track rendering (ticks, labels, tick styles)
 *   - Dot (marker) with drag, keyboard, and ARIA support
 *   - Jump arches with labels and landing marks
 *   - Click-to-place and click-to-jump interactions
 *   - Partition system (fractions, decimals)
 *   - Remediation modal with decomposition walkthrough
 *   - Keypad (integer and fraction)
 *   - Feedback toasts
 *   - KaTeX integration
 *   - Timer bar
 *   - State machine (explore / practice / play)
 *
 * USAGE:
 *   const nl = new VinculumNumberLine({
 *     container: '#nl-container',  // or DOM element
 *     min: 0, max: 10,
 *     step: 1,                     // tick spacing (default 1)
 *     majorEvery: 5,               // bold tick every N (default 5)
 *     showFractions: false,        // fraction labels on ticks
 *     fractionDenom: 1,            // denominator for fraction display
 *     dotStart: 0,                 // initial dot position
 *     onDotMove: (val) => {},      // callback when dot moves
 *     onJump: (from, to) => {},    // callback on jump created
 *     onClick: (val) => {},        // callback on track click
 *   });
 *
 *   nl.moveDot(5);
 *   nl.addJump(3, 7);
 *   nl.clearJumps();
 *   nl.undoJump();
 *   nl.setRange(0, 20);
 *   nl.render();
 *   nl.destroy();
 *
 * REMEDIATION (separate modal engine):
 *   const remed = new VinculumRemediation({
 *     overlay: '#remed-overlay',
 *     onClose: () => {},
 *   });
 *   remed.open({ a: 7, b: 5, op: '+', ans: 12 });
 *   remed.close();
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Utility ── */
function _R(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function _el(sel) { return typeof sel === 'string' ? document.querySelector(sel) : sel; }
function _id(id) { return document.getElementById(id); }
function _valToPct(v, min, max) { return ((v - min) / (max - min)) * 100; }

/* ═══════════════════════════════════════════════════════════════
   VinculumNumberLine — Track + Dot + Jumps
   ═══════════════════════════════════════════════════════════════ */
class VinculumNumberLine {
  constructor(opts = {}) {
    this.container = _el(opts.container);
    this.min = opts.min ?? 0;
    this.max = opts.max ?? 10;
    this.step = opts.step ?? 1;
    this.majorEvery = opts.majorEvery ?? 5;
    this.showFractions = opts.showFractions ?? false;
    this.fractionDenom = opts.fractionDenom ?? 1;
    this.dotPos = opts.dotStart ?? this.min;
    this.jumps = [];   // [{from, to}]
    this.jumpMode = false;
    this.draggable = opts.draggable !== false;

    // Callbacks
    this.onDotMove = opts.onDotMove || null;
    this.onJump = opts.onJump || null;
    this.onClick = opts.onClick || null;

    // Internal
    this._dot = null;
    this._dragging = false;
    this._boundOnMove = this._onDocMove.bind(this);
    this._boundOnUp = this._onDocUp.bind(this);

    this.render();
    this._attachGlobalListeners();
  }

  /* ── Rendering ── */
  render() {
    // Clear previous elements (keep track base if it exists)
    this.container.querySelectorAll('.nl-tick,.nl-dot,.nl-arch,.nl-landing,.nl-target-zone').forEach(e => e.remove());

    // Ensure track element
    let track = this.container.querySelector('.nl-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'nl-track';
      this.container.appendChild(track);
    }

    // Ticks
    const count = Math.round((this.max - this.min) / this.step);
    for (let i = 0; i <= count; i++) {
      const v = this.min + i * this.step;
      const pct = _valToPct(v, this.min, this.max);
      const tick = document.createElement('div');
      tick.className = 'nl-tick';
      tick.style.left = pct + '%';

      const isMajor = (i % this.majorEvery === 0) || v === this.min || v === this.max;
      let label;
      if (this.showFractions && this.fractionDenom > 1) {
        const num = Math.round(v * this.fractionDenom);
        label = num % this.fractionDenom === 0
          ? String(num / this.fractionDenom)
          : `${num}/${this.fractionDenom}`;
      } else {
        label = Number.isInteger(v) ? String(v) : v.toFixed(2);
      }

      tick.innerHTML = `<div class="nl-tick-line ${isMajor ? 'major' : ''}"></div><div class="nl-tick-label">${label}</div>`;
      this.container.appendChild(tick);
    }

    // Dot
    this._dot = document.createElement('div');
    this._dot.className = 'nl-dot';
    this._dot.style.left = _valToPct(this.dotPos, this.min, this.max) + '%';
    this._dot.setAttribute('role', 'slider');
    this._dot.setAttribute('aria-label', 'Number line position');
    this._dot.setAttribute('aria-valuemin', this.min);
    this._dot.setAttribute('aria-valuemax', this.max);
    this._dot.setAttribute('aria-valuenow', this.dotPos);
    this._dot.tabIndex = 0;
    this.container.appendChild(this._dot);

    if (this.draggable) this._setupDotDrag();
    this._setupDotKeyboard();

    // Re-render stored jumps
    this.jumps.forEach(j => this._renderArch(j.from, j.to));
  }

  /* ── Dot Movement ── */
  moveDot(val, animate = true) {
    val = Math.max(this.min, Math.min(this.max, this._snap(val)));
    this.dotPos = val;
    if (this._dot) {
      if (!animate) this._dot.style.transition = 'none';
      this._dot.style.left = _valToPct(val, this.min, this.max) + '%';
      this._dot.setAttribute('aria-valuenow', val);
      if (!animate) requestAnimationFrame(() => { this._dot.style.transition = ''; });
    }
    if (this.onDotMove) this.onDotMove(val);
  }

  _snap(val) {
    // Snap to nearest step
    return Math.round(val / this.step) * this.step;
  }

  /* ── Jumps ── */
  addJump(from, to) {
    this.jumps.push({ from, to });
    this._renderArch(from, to);
    this.moveDot(to);
    if (this.onJump) this.onJump(from, to);
  }

  clearJumps() {
    this.jumps = [];
    this.render();
  }

  undoJump() {
    if (this.jumps.length === 0) return;
    const last = this.jumps.pop();
    this.moveDot(last.from);
    this.render();
  }

  /* ── Range Update ── */
  setRange(min, max, step) {
    this.min = min;
    this.max = max;
    if (step !== undefined) this.step = step;
    this.dotPos = Math.max(this.min, Math.min(this.max, this.dotPos));
    this.jumps = [];
    this.render();
  }

  /* ── Arch Rendering ── */
  _renderArch(from, to) {
    const p1 = _valToPct(from, this.min, this.max);
    const p2 = _valToPct(to, this.min, this.max);
    const lp = Math.min(p1, p2);
    const wp = Math.abs(p2 - p1);
    const jumpAmt = Math.abs(to - from);
    const isBig = jumpAmt >= 5 * this.step;
    const archH = isBig ? 36 : 20;
    const cls = isBig ? 'tens' : 'ones';

    const arch = document.createElement('div');
    arch.className = `nl-arch ${cls}`;
    arch.style.left = lp + '%';
    arch.style.width = wp + '%';
    arch.style.height = archH + 'px';
    arch.style.top = `calc(50% - ${archH}px)`;

    const lbl = document.createElement('div');
    lbl.className = 'nl-arch-label';
    const sign = to > from ? '+' : '−';
    if (this.showFractions && this.fractionDenom > 1) {
      const num = Math.round(jumpAmt * this.fractionDenom);
      lbl.textContent = sign + (num % this.fractionDenom === 0
        ? String(num / this.fractionDenom)
        : `${num}/${this.fractionDenom}`);
    } else {
      lbl.textContent = sign + (Number.isInteger(jumpAmt) ? jumpAmt : jumpAmt.toFixed(2));
    }
    arch.appendChild(lbl);
    this.container.appendChild(arch);

    // Landing mark
    const landing = document.createElement('div');
    landing.className = 'nl-landing';
    landing.style.left = p2 + '%';
    const llbl = document.createElement('div');
    llbl.className = 'nl-landing-label';
    llbl.textContent = Number.isInteger(to) ? to : to.toFixed(2);
    landing.appendChild(llbl);
    this.container.appendChild(landing);
  }

  /* ── Drag Support ── */
  _setupDotDrag() {
    this._dot.addEventListener('mousedown', e => this._onDotDown(e));
    this._dot.addEventListener('touchstart', e => this._onDotDown(e), { passive: false });
  }

  _onDotDown(e) {
    this._dragging = true;
    this._dot.style.transition = 'none';
    e.preventDefault();
  }

  _ptrToVal(e) {
    const rect = this.container.getBoundingClientRect();
    const ptr = e.touches ? e.touches[0] : e;
    const x = (ptr.clientX - rect.left) / rect.width;
    return this._snap(this.min + x * (this.max - this.min));
  }

  _onDocMove(e) {
    if (!this._dragging) return;
    this.moveDot(this._ptrToVal(e), false);
  }

  _onDocUp() {
    if (!this._dragging) return;
    this._dragging = false;
    if (this._dot) this._dot.style.transition = '';
  }

  _attachGlobalListeners() {
    document.addEventListener('mousemove', this._boundOnMove);
    document.addEventListener('touchmove', this._boundOnMove, { passive: false });
    document.addEventListener('mouseup', this._boundOnUp);
    document.addEventListener('touchend', this._boundOnUp);
  }

  /* ── Keyboard ── */
  _setupDotKeyboard() {
    this._dot.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.moveDot(this.dotPos + this.step);
      else if (e.key === 'ArrowLeft') this.moveDot(this.dotPos - this.step);
    });
  }

  /* ── Cleanup ── */
  destroy() {
    document.removeEventListener('mousemove', this._boundOnMove);
    document.removeEventListener('touchmove', this._boundOnMove);
    document.removeEventListener('mouseup', this._boundOnUp);
    document.removeEventListener('touchend', this._boundOnUp);
    this.container.innerHTML = '';
  }
}


/* ═══════════════════════════════════════════════════════════════
   VinculumRemediation — Jump Decomposition Walkthrough
   ═══════════════════════════════════════════════════════════════ */
class VinculumRemediation {
  constructor(opts = {}) {
    this.overlay = _el(opts.overlay);
    this.onClose = opts.onClose || null;
    this.state = null;
  }

  /**
   * Decompose a number into pedagogically friendly jumps.
   * Strategy: ≤5 → unit jumps; 6-9 → friendly five + remainder;
   * ≥10 → tens + ones (from Vortex Runner pattern)
   */
  static buildJumps(b) {
    b = Math.abs(b);
    if (b <= 5) return Array(b).fill(1);
    if (b <= 9) return [5, b - 5];
    const tens = Math.floor(b / 10);
    const ones = b % 10;
    const j = Array(tens).fill(10);
    if (ones > 0) j.push(ones);
    return j;
  }

  /**
   * Open the remediation modal for a given problem.
   * @param {Object} prob - {a, b, op, ans} where op is '+' or '-'
   */
  open(prob) {
    const jumps = VinculumRemediation.buildJumps(prob.b);
    const pad = Math.max(3, Math.ceil(prob.b * 0.15));
    const trackMin = Math.max(0, Math.min(prob.a, prob.ans) - pad);
    const trackMax = Math.max(prob.a, prob.ans) + pad;

    this.state = {
      prob, a: prob.a, b: prob.b, op: prob.op, ans: prob.ans,
      jumps, curJump: 0, curVal: prob.a,
      trackMin, trackMax, range: trackMax - trackMin,
      phase: 'click', done: false, kpInput: ''
    };

    this._buildModal();
    this.overlay.classList.add('open');
  }

  close() {
    this.overlay.classList.remove('open');
    this.state = null;
    if (this.onClose) this.onClose();
  }

  _buildModal() {
    const rs = this.state;
    const card = this.overlay.querySelector('.remed-card') || this._createCard();

    // Title / problem
    card.querySelector('.remed-problem').textContent =
      `${rs.a} ${rs.op === '+' ? '+' : '−'} ${rs.b} = ${rs.ans}`;
    const plan = rs.jumps.map(j => (rs.op === '+' ? '+' : '−') + j).join(', then ');
    card.querySelector('.remed-instr').textContent = `Jump from ${rs.a}: ${plan}`;
    card.querySelector('.remed-running').textContent = rs.a;
    card.querySelector('.remed-step').textContent = `Step 0 of ${rs.jumps.length}`;
    card.querySelector('.remed-continue').style.display = 'none';

    // Build track
    this._buildTrack(card);
    this._renderControls(card);
  }

  _createCard() {
    // Only called if overlay doesn't already have the card structure
    const card = document.createElement('div');
    card.className = 'remed-card';
    card.innerHTML = `
      <div class="remed-title">Number Line Walkthrough</div>
      <div class="remed-problem"></div>
      <div class="remed-instr"></div>
      <div class="remed-track-wrap"><div class="remed-track"></div><div class="remed-dot"></div></div>
      <div class="remed-running"></div>
      <div class="remed-step"></div>
      <div class="remed-ctrl"></div>
      <button class="remed-continue">Continue →</button>
    `;
    card.querySelector('.remed-continue').addEventListener('click', () => this.close());
    this.overlay.innerHTML = '';
    this.overlay.appendChild(card);
    return card;
  }

  _buildTrack(card) {
    const rs = this.state;
    const wrap = card.querySelector('.remed-track-wrap');
    wrap.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'remed-track';
    wrap.appendChild(track);

    // Ticks
    const step = rs.range <= 15 ? 1 : rs.range <= 30 ? 2 : 5;
    for (let v = Math.ceil(rs.trackMin / step) * step; v <= rs.trackMax; v += step) {
      const pct = ((v - rs.trackMin) / rs.range) * 100;
      if (pct < -2 || pct > 102) continue;
      const tick = document.createElement('div');
      tick.className = 'remed-tick';
      tick.style.left = pct + '%';
      tick.style.position = 'absolute';
      tick.innerHTML = `<div class="remed-tick-line"></div><div class="remed-tick-label">${v}</div>`;
      track.appendChild(tick);
    }

    // Dot
    const dot = document.createElement('div');
    dot.className = 'remed-dot';
    dot.style.left = ((rs.a - rs.trackMin) / rs.range * 100) + '%';
    track.appendChild(dot);

    this._track = track;
    this._dot = dot;
  }

  _renderControls(card) {
    const ctrl = card.querySelector('.remed-ctrl') || card.querySelector('#remed-controls');
    if (!ctrl) return;
    ctrl.innerHTML = '';
    const rs = this.state;
    if (rs.done) return;

    if (rs.phase === 'click') {
      const jump = rs.jumps[rs.curJump];
      const btn = document.createElement('button');
      btn.className = 'remed-jump-btn';
      btn.textContent = `Jump ${rs.op === '+' ? '+' : '−'}${jump}`;
      btn.addEventListener('click', () => this._advance(card));
      ctrl.appendChild(btn);
    } else {
      // Type-to-confirm phase
      const disp = document.createElement('div');
      disp.className = 'remed-kp-display';
      disp.textContent = '_';
      ctrl.appendChild(disp);
      this._remedDisp = disp;

      const kp = document.createElement('div');
      kp.className = 'remed-keypad';
      for (let i = 1; i <= 9; i++) {
        const b = document.createElement('button');
        b.className = 'remed-kp-btn';
        b.textContent = i;
        b.addEventListener('click', () => { rs.kpInput += i; disp.textContent = rs.kpInput; });
        kp.appendChild(b);
      }
      const clr = document.createElement('button');
      clr.className = 'remed-kp-btn remed-kp-clear';
      clr.textContent = 'CLR';
      clr.addEventListener('click', () => { rs.kpInput = ''; disp.textContent = '_'; disp.className = 'remed-kp-display'; });
      kp.appendChild(clr);
      const z = document.createElement('button');
      z.className = 'remed-kp-btn';
      z.textContent = '0';
      z.addEventListener('click', () => { rs.kpInput += '0'; disp.textContent = rs.kpInput; });
      kp.appendChild(z);
      const ent = document.createElement('button');
      ent.className = 'remed-kp-btn remed-kp-enter';
      ent.textContent = '✓';
      ent.addEventListener('click', () => this._checkType(card));
      kp.appendChild(ent);
      ctrl.appendChild(kp);

      card.querySelector('.remed-step').textContent = 'Type the answer: where did you land?';
    }
  }

  _advance(card) {
    const rs = this.state;
    const jump = rs.jumps[rs.curJump];
    const prev = rs.curVal;
    rs.curVal = rs.op === '+' ? prev + jump : prev - jump;
    rs.curJump++;

    // Animate dot
    const pct = ((rs.curVal - rs.trackMin) / rs.range) * 100;
    this._dot.style.left = pct + '%';

    // Draw arch
    const p1 = ((prev - rs.trackMin) / rs.range) * 100;
    const p2 = pct;
    const lp = Math.min(p1, p2);
    const wp = Math.abs(p2 - p1);
    const isBig = jump >= 5;
    const archH = isBig ? 30 : 18;

    const arch = document.createElement('div');
    arch.className = 'remed-arch';
    arch.style.left = lp + '%';
    arch.style.width = wp + '%';
    arch.style.height = archH + 'px';
    arch.style.top = (-archH + 2) + 'px';
    arch.style.borderColor = isBig ? 'rgba(79,195,247,0.8)' : 'rgba(255,213,79,0.8)';
    arch.style.filter = isBig
      ? 'drop-shadow(0 0 5px rgba(79,195,247,0.5))'
      : 'drop-shadow(0 0 4px rgba(255,213,79,0.5))';

    const lbl = document.createElement('div');
    lbl.className = 'remed-arch-label';
    lbl.style.left = '50%';
    lbl.style.top = (-archH - 4) + 'px';
    lbl.style.color = isBig ? 'var(--accent)' : 'var(--gold)';
    lbl.textContent = (rs.op === '+' ? '+' : '−') + jump;
    arch.appendChild(lbl);
    this._track.appendChild(arch);

    // Landing mark (if not final)
    if (rs.curVal !== rs.ans) {
      const mark = document.createElement('div');
      mark.style.cssText = `position:absolute;left:${pct}%;top:-7px;width:14px;height:14px;border-radius:50%;transform:translateX(-50%);z-index:4;border:2px solid var(--accent);background:rgba(79,195,247,0.15);box-shadow:0 0 8px var(--accent-glow);`;
      const ml = document.createElement('div');
      ml.style.cssText = `position:absolute;top:16px;left:50%;transform:translateX(-50%);font-size:0.6em;font-weight:800;color:var(--accent);white-space:nowrap;font-family:var(--mono);`;
      ml.textContent = rs.curVal;
      mark.appendChild(ml);
      this._track.appendChild(mark);
    }

    card.querySelector('.remed-running').textContent = rs.curVal;
    card.querySelector('.remed-step').textContent = `Step ${rs.curJump} of ${rs.jumps.length}`;

    if (rs.curJump >= rs.jumps.length) {
      rs.phase = 'type';
      rs.kpInput = '';
    }
    this._renderControls(card);
  }

  _checkType(card) {
    const rs = this.state;
    const val = parseInt(rs.kpInput);
    if (isNaN(val)) return;
    if (val === rs.ans) {
      this._remedDisp.className = 'remed-kp-display right';
      card.querySelector('.remed-running').style.color = 'var(--correct)';
      rs.done = true;
      const ctrl = card.querySelector('.remed-ctrl') || card.querySelector('#remed-controls');
      if (ctrl) ctrl.innerHTML = '';
      card.querySelector('.remed-continue').style.display = 'inline-block';
      card.querySelector('.remed-step').textContent = 'Correct! You traced the jumps perfectly.';
    } else {
      this._remedDisp.className = 'remed-kp-display wrong';
      rs.kpInput = '';
      setTimeout(() => {
        this._remedDisp.className = 'remed-kp-display';
        this._remedDisp.textContent = '_';
      }, 600);
    }
  }
}


/* ═══════════════════════════════════════════════════════════════
   VinculumFeedback — Toast Messages
   ═══════════════════════════════════════════════════════════════ */
class VinculumFeedback {
  static show(text, type = 'correct') {
    const cls = type === 'correct' ? 'fb-g' : type === 'incorrect' ? 'fb-r' : 'fb-y';
    const el = document.createElement('div');
    el.className = 'fb ' + cls;
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}


/* ═══════════════════════════════════════════════════════════════
   VinculumKeypad — Reusable Number Input
   ═══════════════════════════════════════════════════════════════ */
class VinculumKeypad {
  /**
   * @param {Object} opts
   * @param {HTMLElement|string} opts.container - where to render the keypad
   * @param {HTMLElement|string} opts.display - where to show typed value
   * @param {Function} opts.onSubmit - called with numeric value
   * @param {boolean} opts.allowNegative - show ± button (default false)
   * @param {boolean} opts.allowDecimal - show . button (default false)
   */
  constructor(opts = {}) {
    this.container = _el(opts.container);
    this.display = _el(opts.display);
    this.onSubmit = opts.onSubmit || null;
    this.allowNegative = opts.allowNegative || false;
    this.allowDecimal = opts.allowDecimal || false;
    this.value = '';
    this.build();
  }

  build() {
    this.container.innerHTML = '';
    this.container.className = 'keypad';

    for (let i = 1; i <= 9; i++) {
      this.container.appendChild(this._btn(String(i), () => this._append(i)));
    }
    this.container.appendChild(this._btn('CLR', () => this.clear(), 'kp-clear'));
    this.container.appendChild(this._btn('0', () => this._append(0)));
    this.container.appendChild(this._btn('GO', () => this.submit(), 'kp-enter'));

    if (this.allowNegative) {
      this.container.appendChild(this._btn('±', () => this._toggleSign()));
    }
    if (this.allowDecimal) {
      this.container.appendChild(this._btn('.', () => this._appendDot()));
    }
  }

  _btn(label, handler, extraCls = '') {
    const b = document.createElement('button');
    b.className = 'kp-btn ' + extraCls;
    b.textContent = label;
    b.addEventListener('click', handler);
    return b;
  }

  _append(digit) {
    this.value += digit;
    this._updateDisplay();
  }

  _appendDot() {
    if (this.value.includes('.')) return;
    this.value += '.';
    this._updateDisplay();
  }

  _toggleSign() {
    if (this.value.startsWith('-')) this.value = this.value.slice(1);
    else this.value = '-' + this.value;
    this._updateDisplay();
  }

  clear() {
    this.value = '';
    this._updateDisplay();
    if (this.display) {
      this.display.className = 'answer-display';
    }
  }

  submit() {
    const num = parseFloat(this.value);
    if (isNaN(num)) return;
    if (this.onSubmit) this.onSubmit(num);
  }

  _updateDisplay() {
    if (this.display) {
      this.display.textContent = this.value || '_';
    }
  }

  /** Listen for keyboard number input globally */
  attachKeyboard() {
    this._kbHandler = e => {
      if (e.key >= '0' && e.key <= '9') this._append(e.key);
      else if (e.key === 'Enter') this.submit();
      else if (e.key === 'Backspace') {
        this.value = this.value.slice(0, -1);
        this._updateDisplay();
      } else if (e.key === '-' && this.allowNegative) this._toggleSign();
      else if (e.key === '.' && this.allowDecimal) this._appendDot();
    };
    document.addEventListener('keydown', this._kbHandler);
  }

  detachKeyboard() {
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);
  }
}


/* ═══════════════════════════════════════════════════════════════
   CSS Injection (call once for the shared number line styles)
   ═══════════════════════════════════════════════════════════════ */
VinculumNumberLine.injectCSS = function () {
  if (document.getElementById('vnl-style')) return;
  const style = document.createElement('style');
  style.id = 'vnl-style';
  style.textContent = `
/* ═══════ VINCULUM NUMBER LINE ENGINE STYLES ═══════ */
.nl-track{position:absolute;top:50%;left:0;right:0;height:4px;background:rgba(255,255,255,0.12);border-radius:2px;transform:translateY(-50%);}
.nl-tick{position:absolute;top:50%;display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-50%);}
.nl-tick-line{width:2px;height:14px;background:rgba(255,255,255,0.2);}
.nl-tick-line.major{height:20px;background:rgba(255,255,255,0.35);}
.nl-tick-label{color:#777;font-size:0.7em;font-weight:600;font-family:var(--mono,'Fira Code',monospace);margin-top:6px;user-select:none;}
.nl-dot{
  position:absolute;top:50%;width:20px;height:20px;border-radius:50%;
  background:var(--accent,#4fc3f7);transform:translate(-50%,-50%);
  box-shadow:0 0 12px var(--accent-glow,rgba(79,195,247,0.35)),0 0 24px rgba(79,195,247,0.2);
  transition:left 0.4s cubic-bezier(0.25,0.46,0.45,0.94);z-index:10;cursor:grab;
}
.nl-dot:active{cursor:grabbing;transform:translate(-50%,-50%) scale(1.15);}
.nl-dot.correct{background:var(--correct,#4caf50);box-shadow:0 0 12px var(--correct-glow,rgba(76,175,80,0.4));}
.nl-dot.wrong{background:var(--incorrect,#f44336);box-shadow:0 0 12px var(--incorrect-glow,rgba(244,67,54,0.4));animation:shake 0.4s;}
.nl-arch{position:absolute;top:50%;border-top:3px dashed;border-radius:50% 50% 0 0;pointer-events:none;transform:translateY(-100%);opacity:0;animation:archIn 0.5s ease-out forwards;}
.nl-arch.tens{border-color:var(--accent,#4fc3f7);filter:drop-shadow(0 0 5px var(--accent-glow,rgba(79,195,247,0.35)));}
.nl-arch.ones{border-color:var(--gold,#ffd54f);filter:drop-shadow(0 0 4px var(--gold-glow,rgba(255,213,79,0.4)));}
.nl-arch-label{position:absolute;top:-6px;left:50%;transform:translateX(-50%);font-size:0.72em;font-weight:800;white-space:nowrap;pointer-events:none;font-family:var(--mono,'Fira Code',monospace);}
.nl-arch.tens .nl-arch-label{color:var(--accent,#4fc3f7);}
.nl-arch.ones .nl-arch-label{color:var(--gold,#ffd54f);}
.nl-landing{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;transform:translate(-50%,-50%);z-index:5;border:2px solid var(--accent,#4fc3f7);background:rgba(79,195,247,0.15);box-shadow:0 0 10px var(--accent-glow,rgba(79,195,247,0.35));opacity:0;animation:landIn 0.3s ease-out forwards;}
.nl-landing-label{position:absolute;top:18px;left:50%;transform:translateX(-50%);font-size:0.65em;font-weight:800;color:var(--accent,#4fc3f7);white-space:nowrap;font-family:var(--mono,'Fira Code',monospace);}
@keyframes archIn{from{opacity:0;transform:translateY(-80%) scaleY(0.3);}to{opacity:1;transform:translateY(-100%) scaleY(1);}}
@keyframes landIn{from{opacity:0;transform:translate(-50%,-50%) scale(0);}to{opacity:1;transform:translate(-50%,-50%) scale(1);}}
@keyframes shake{0%,100%{transform:translate(-50%,-50%) translateX(0);}25%{transform:translate(-50%,-50%) translateX(-8px);}75%{transform:translate(-50%,-50%) translateX(8px);}}
.fb{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2.5em;font-weight:900;z-index:350;pointer-events:none;animation:fbA 0.9s ease-out forwards;}
.fb-g{color:var(--correct,#4caf50);text-shadow:0 0 30px var(--correct-glow,rgba(76,175,80,0.4));}
.fb-r{color:var(--secondary,#e64a19);text-shadow:0 0 30px var(--secondary-glow,rgba(230,74,25,0.4));}
.fb-y{color:var(--gold,#ffd54f);text-shadow:0 0 30px var(--gold-glow,rgba(255,213,79,0.4));}
@keyframes fbA{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0;}25%{transform:translate(-50%,-50%) scale(1.15);opacity:1;}100%{transform:translate(-50%,-50%) scale(1) translateY(-35px);opacity:0;}}
.keypad{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:200px;margin:0 auto;}
.kp-btn{background:rgba(79,195,247,0.06);border:1.5px solid rgba(79,195,247,0.18);border-radius:8px;padding:12px;color:#fff;font-size:1.1em;font-weight:600;cursor:pointer;transition:all 0.12s;font-family:var(--font,'Inter',system-ui,sans-serif);}
.kp-btn:hover{background:rgba(79,195,247,0.15);border-color:var(--accent,#4fc3f7);}
.kp-btn:active{transform:scale(0.92);}
.kp-enter{background:rgba(76,175,80,0.1);border-color:rgba(76,175,80,0.25);color:var(--correct,#4caf50);}
.kp-clear{background:rgba(244,67,54,0.08);border-color:rgba(244,67,54,0.2);color:var(--incorrect,#f44336);font-size:0.85em;}
.remed-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.92);display:none;align-items:center;justify-content:center;z-index:300;backdrop-filter:blur(8px);}
.remed-overlay.open{display:flex;}
.remed-card{background:linear-gradient(135deg,#0a1428,#0a0a30);border:2px solid rgba(79,195,247,0.3);border-radius:22px;padding:28px 34px;text-align:center;max-width:560px;width:94%;box-shadow:0 0 50px var(--accent-glow,rgba(79,195,247,0.35));}
.remed-title{color:var(--accent,#4fc3f7);font-size:0.72em;font-weight:800;text-transform:uppercase;letter-spacing:3px;margin-bottom:6px;}
.remed-problem{color:#fff;font-size:1.6em;font-weight:700;margin-bottom:6px;}
.remed-instr{color:#aaa;font-size:0.82em;margin-bottom:14px;min-height:1.2em;}
.remed-track-wrap{position:relative;height:100px;margin:10px 10px 30px;overflow:visible;}
.remed-track{position:absolute;top:55px;left:0;right:0;height:4px;background:rgba(255,255,255,0.12);border-radius:2px;overflow:visible;}
.remed-tick{position:absolute;top:-18px;display:flex;flex-direction:column;align-items:center;gap:3px;}
.remed-tick-line{width:2px;height:10px;background:rgba(255,255,255,0.2);}
.remed-tick-label{color:#666;font-size:0.6em;font-family:var(--mono,'Fira Code',monospace);}
.remed-dot{position:absolute;top:-8px;width:18px;height:18px;border-radius:50%;background:var(--accent,#4fc3f7);transform:translateX(-50%);box-shadow:0 0 10px var(--accent-glow,rgba(79,195,247,0.35));transition:left 0.5s cubic-bezier(0.25,0.46,0.45,0.94);z-index:5;}
.remed-arch{position:absolute;top:0;border-top:3px dashed;border-radius:50% 50% 0 0;pointer-events:none;overflow:visible;}
.remed-arch-label{position:absolute;font-size:0.68em;font-weight:800;transform:translateX(-50%);pointer-events:none;font-family:var(--mono,'Fira Code',monospace);}
.remed-running{color:#fff;font-size:1.5em;font-weight:700;margin:8px 0;font-family:var(--mono,'Fira Code',monospace);}
.remed-step{color:#888;font-size:0.78em;min-height:1em;margin-bottom:6px;}
.remed-jump-btn{background:linear-gradient(135deg,rgba(79,195,247,0.15),rgba(79,195,247,0.08));border:2px solid rgba(79,195,247,0.3);border-radius:12px;padding:14px 30px;color:var(--accent,#4fc3f7);font-size:1em;font-weight:700;cursor:pointer;font-family:var(--font,'Inter',system-ui,sans-serif);transition:all 0.18s;margin:8px auto;display:block;}
.remed-jump-btn:hover{background:rgba(79,195,247,0.25);border-color:var(--accent,#4fc3f7);transform:scale(1.03);}
.remed-kp-display{background:rgba(0,0,0,0.4);border:2px solid rgba(79,195,247,0.2);border-radius:8px;padding:8px 16px;color:var(--accent,#4fc3f7);font-size:1.5em;font-weight:700;min-height:44px;display:flex;align-items:center;justify-content:center;margin:8px auto;max-width:180px;font-family:var(--mono,'Fira Code',monospace);}
.remed-kp-display.wrong{border-color:var(--incorrect,#f44336);color:var(--incorrect,#f44336);animation:shake 0.4s;}
.remed-kp-display.right{border-color:var(--correct,#4caf50);color:var(--correct,#4caf50);}
.remed-keypad{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;max-width:180px;margin:6px auto 0;}
.remed-kp-btn{background:rgba(79,195,247,0.06);border:1.5px solid rgba(79,195,247,0.18);border-radius:8px;padding:9px;color:#fff;font-size:1em;font-weight:600;cursor:pointer;transition:all 0.12s;font-family:var(--font,'Inter',system-ui,sans-serif);}
.remed-kp-btn:hover{background:rgba(79,195,247,0.15);}
.remed-kp-btn:active{transform:scale(0.92);}
.remed-kp-enter{background:rgba(76,175,80,0.1);border-color:rgba(76,175,80,0.25);color:var(--correct,#4caf50);}
.remed-kp-clear{background:rgba(244,67,54,0.08);border-color:rgba(244,67,54,0.2);color:var(--incorrect,#f44336);font-size:0.82em;}
.remed-continue{background:linear-gradient(135deg,var(--accent,#4fc3f7),#1976d2);border:none;border-radius:12px;padding:12px 28px;color:#fff;font-size:0.95em;font-weight:700;cursor:pointer;margin-top:10px;display:none;font-family:var(--font,'Inter',system-ui,sans-serif);}
.remed-continue:hover{opacity:0.9;}
`;
  document.head.appendChild(style);
};


/* ── Exports ── */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VinculumNumberLine, VinculumRemediation, VinculumFeedback, VinculumKeypad };
}
if (typeof window !== 'undefined') {
  window.VinculumNumberLine = VinculumNumberLine;
  window.VinculumRemediation = VinculumRemediation;
  window.VinculumFeedback = VinculumFeedback;
  window.VinculumKeypad = VinculumKeypad;
}
