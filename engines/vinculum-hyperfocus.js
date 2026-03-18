/**
 * ═══════════════════════════════════════════════════════════════
 * VINCULUM — HYPER FOCUS Component v1.0
 * ═══════════════════════════════════════════════════════════════
 * A branded zoom/magnification lens for any Vinculum tool.
 *
 * USAGE:
 *   1. Include this script in your HTML:
 *      <script src="vinculum-hyperfocus.js"><\/script>
 *
 *   2. Add the CSS (or call HyperFocus.injectCSS()):
 *      HyperFocus.injectCSS();
 *
 *   3. Initialize with a target element to magnify:
 *      const hf = new HyperFocus({
 *        target: document.getElementById('nl-container'),  // element to zoom
 *        viewport: document.getElementById('viewport'),    // parent for toggle button
 *        onActivate: () => { ... },    // optional callback
 *        onDeactivate: () => { ... },  // optional callback
 *        initialScale: 2,              // default 2
 *        minScale: 1,                  // default 1
 *        maxScale: 5,                  // default 5
 *        scaleStep: 0.5,              // default 0.5
 *        lensWidth: 500,              // default 500
 *        lensHeight: 300,             // default 300
 *      });
 *
 *   4. Check state:
 *      hf.isActive  // boolean
 *
 *   5. Programmatic control:
 *      hf.toggle()
 *      hf.open()
 *      hf.close()
 *      hf.destroy()  // cleanup
 *
 * The component creates its own DOM elements (toggle button + lens window).
 * Pinch-zoom prevention on the main document is handled automatically —
 * multi-touch is only allowed inside the HYPER FOCUS lens body.
 * ═══════════════════════════════════════════════════════════════
 */

class HyperFocus {
  constructor(opts = {}) {
    this.target = opts.target;
    this.viewport = opts.viewport || document.body;
    this.onActivate = opts.onActivate || null;
    this.onDeactivate = opts.onDeactivate || null;
    this.scale = opts.initialScale || 2;
    this.minScale = opts.minScale || 1;
    this.maxScale = opts.maxScale || 5;
    this.scaleStep = opts.scaleStep || 0.5;
    this.lensWidth = opts.lensWidth || 500;
    this.lensHeight = opts.lensHeight || 300;
    this.isActive = false;

    this._dragging = false;
    this._ox = 0;
    this._oy = 0;

    // Bound handlers for cleanup
    this._onDocMouseMove = this._onDocMouseMove.bind(this);
    this._onDocMouseUp = this._onDocMouseUp.bind(this);
    this._onDocTouchMove = this._onDocTouchMove.bind(this);
    this._onDocTouchEnd = this._onDocTouchEnd.bind(this);
    this._onPinchGuard = this._onPinchGuard.bind(this);

    this._buildDOM();
    this._attachEvents();
  }

  /* ── CSS Injection ── */
  static injectCSS() {
    if (document.getElementById('hf-style-vinculum')) return;
    const style = document.createElement('style');
    style.id = 'hf-style-vinculum';
    style.textContent = `
/* ═══════ VINCULUM HYPER FOCUS ═══════ */
.hf-toggle{
  position:absolute;top:14px;right:14px;z-index:60;
  padding:7px 14px;border-radius:9999px;
  background:rgba(188,19,254,0.08);border:1px solid rgba(188,19,254,0.25);
  color:#c084fc;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;
  cursor:pointer;font-family:'Inter',system-ui,sans-serif;transition:all 0.18s ease;
  display:flex;align-items:center;gap:6px;
}
.hf-toggle:hover{background:rgba(188,19,254,0.18);border-color:rgba(188,19,254,0.5);}
.hf-toggle.active{background:rgba(188,19,254,0.25);border-color:#a855f7;color:#e9d5ff;}
.hf-toggle .hf-icon{font-size:13px;}

.hf-lens{
  position:fixed;display:none;z-index:500;
  border:2px solid rgba(188,19,254,0.5);border-radius:16px;
  background:#020208;box-shadow:0 0 40px rgba(188,19,254,0.3),0 8px 32px rgba(0,0,0,0.8);
  overflow:hidden;touch-action:manipulation;
}
.hf-lens.open{display:block;}
.hf-lens-header{
  padding:6px 12px;background:rgba(188,19,254,0.1);border-bottom:1px solid rgba(188,19,254,0.2);
  display:flex;align-items:center;justify-content:space-between;
  cursor:grab;user-select:none;
}
.hf-lens-header:active{cursor:grabbing;}
.hf-lens-title{font-size:8px;font-weight:900;color:#a855f7;text-transform:uppercase;letter-spacing:0.2em;}
.hf-close{
  background:none;border:none;color:rgba(255,255,255,0.4);font-size:16px;cursor:pointer;
  padding:2px 6px;border-radius:4px;
}
.hf-close:hover{color:#fff;background:rgba(255,255,255,0.1);}
.hf-lens-body{position:relative;overflow:auto;touch-action:pinch-zoom pan-x pan-y;}
.hf-zoom-controls{
  position:absolute;bottom:8px;right:8px;display:flex;gap:4px;z-index:10;
}
.hf-zoom-btn{
  width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,0.7);
  border:1px solid rgba(188,19,254,0.3);color:#c084fc;font-size:14px;font-weight:700;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-family:'Inter',system-ui,sans-serif;
}
.hf-zoom-btn:hover{background:rgba(188,19,254,0.2);}
.hf-zoom-level{
  font-size:8px;font-weight:700;color:rgba(188,19,254,0.6);
  padding:0 6px;display:flex;align-items:center;font-family:'Fira Code',monospace;
}
`;
    document.head.appendChild(style);
  }

  /* ── DOM Construction ── */
  _buildDOM() {
    // Toggle button
    this.toggleBtn = document.createElement('button');
    this.toggleBtn.className = 'hf-toggle';
    this.toggleBtn.title = 'HYPER FOCUS — Magnify a region';
    this.toggleBtn.innerHTML = '<span class="hf-icon">🔬</span> Hyper Focus';
    this.viewport.appendChild(this.toggleBtn);

    // Lens container
    this.lens = document.createElement('div');
    this.lens.className = 'hf-lens';

    // Header (drag handle)
    this.lensHeader = document.createElement('div');
    this.lensHeader.className = 'hf-lens-header';
    this.lensHeader.innerHTML = '<span class="hf-lens-title">Hyper Focus</span>';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'hf-close';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => this.close());
    this.lensHeader.appendChild(closeBtn);
    this.lens.appendChild(this.lensHeader);

    // Body (holds the zoomed clone)
    this.lensBody = document.createElement('div');
    this.lensBody.className = 'hf-lens-body';
    this.lens.appendChild(this.lensBody);

    // Zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'hf-zoom-controls';

    const zoomOut = document.createElement('button');
    zoomOut.className = 'hf-zoom-btn';
    zoomOut.textContent = '−';
    zoomOut.addEventListener('click', () => this.zoom(-1));

    this.zoomLabel = document.createElement('span');
    this.zoomLabel.className = 'hf-zoom-level';
    this.zoomLabel.textContent = this.scale + '×';

    const zoomIn = document.createElement('button');
    zoomIn.className = 'hf-zoom-btn';
    zoomIn.textContent = '+';
    zoomIn.addEventListener('click', () => this.zoom(1));

    zoomControls.appendChild(zoomOut);
    zoomControls.appendChild(this.zoomLabel);
    zoomControls.appendChild(zoomIn);
    this.lens.appendChild(zoomControls);

    document.body.appendChild(this.lens);
  }

  /* ── Event Binding ── */
  _attachEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());

    // Drag: mouse
    this.lensHeader.addEventListener('mousedown', e => this._onHeaderDown(e));
    document.addEventListener('mousemove', this._onDocMouseMove);
    document.addEventListener('mouseup', this._onDocMouseUp);

    // Drag: touch
    this.lensHeader.addEventListener('touchstart', e => this._onHeaderTouchStart(e));
    document.addEventListener('touchmove', this._onDocTouchMove, { passive: true });
    document.addEventListener('touchend', this._onDocTouchEnd);

    // Pinch-zoom guard (prevent on main app, allow in lens)
    document.addEventListener('touchmove', this._onPinchGuard, { passive: false });
  }

  /* ── Drag Handlers ── */
  _onHeaderDown(e) {
    this._dragging = true;
    this._ox = e.clientX - this.lens.offsetLeft;
    this._oy = e.clientY - this.lens.offsetTop;
    e.preventDefault();
  }
  _onHeaderTouchStart(e) {
    this._dragging = true;
    this._ox = e.touches[0].clientX - this.lens.offsetLeft;
    this._oy = e.touches[0].clientY - this.lens.offsetTop;
  }
  _onDocMouseMove(e) {
    if (!this._dragging) return;
    this.lens.style.left = (e.clientX - this._ox) + 'px';
    this.lens.style.top = (e.clientY - this._oy) + 'px';
  }
  _onDocMouseUp() { this._dragging = false; }
  _onDocTouchMove(e) {
    if (!this._dragging) return;
    this.lens.style.left = (e.touches[0].clientX - this._ox) + 'px';
    this.lens.style.top = (e.touches[0].clientY - this._oy) + 'px';
  }
  _onDocTouchEnd() { this._dragging = false; }

  /* ── Pinch Guard ── */
  _onPinchGuard(e) {
    if (e.touches.length > 1 && !this.isActive) e.preventDefault();
  }

  /* ── Public API ── */
  toggle() {
    if (this.isActive) this.close();
    else this.open();
  }

  open() {
    if (!this.target) return;
    this.isActive = true;
    this.toggleBtn.classList.add('active');

    // Clone the target into the lens body
    this.lensBody.innerHTML = '';
    const clone = this.target.cloneNode(true);
    clone.style.transform = `scale(${this.scale})`;
    clone.style.transformOrigin = 'center center';

    // Preserve source dimensions
    const srcRect = this.target.getBoundingClientRect();
    clone.style.width = srcRect.width + 'px';
    clone.style.height = srcRect.height + 'px';
    clone.style.margin = '40px';
    this.lensBody.appendChild(clone);

    this.lensBody.style.width = this.lensWidth + 'px';
    this.lensBody.style.height = this.lensHeight + 'px';

    // Position lens in center of viewport
    this.lens.style.left = 'calc(50% - ' + (this.lensWidth / 2) + 'px)';
    this.lens.style.top = 'calc(50% - ' + ((this.lensHeight + 40) / 2) + 'px)';
    this.lens.classList.add('open');
    this.zoomLabel.textContent = this.scale + '×';

    if (this.onActivate) this.onActivate();
  }

  close() {
    this.isActive = false;
    this.toggleBtn.classList.remove('active');
    this.lens.classList.remove('open');
    if (this.onDeactivate) this.onDeactivate();
  }

  zoom(dir) {
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + dir * this.scaleStep));
    const clone = this.lensBody.firstChild;
    if (clone) clone.style.transform = `scale(${this.scale})`;
    this.zoomLabel.textContent = this.scale + '×';
  }

  /** Refresh the lens content (call after the target changes) */
  refresh() {
    if (!this.isActive || !this.target) return;
    this.lensBody.innerHTML = '';
    const clone = this.target.cloneNode(true);
    clone.style.transform = `scale(${this.scale})`;
    clone.style.transformOrigin = 'center center';
    const srcRect = this.target.getBoundingClientRect();
    clone.style.width = srcRect.width + 'px';
    clone.style.height = srcRect.height + 'px';
    clone.style.margin = '40px';
    this.lensBody.appendChild(clone);
  }

  /** Remove all DOM elements and event listeners */
  destroy() {
    document.removeEventListener('mousemove', this._onDocMouseMove);
    document.removeEventListener('mouseup', this._onDocMouseUp);
    document.removeEventListener('touchmove', this._onDocTouchMove);
    document.removeEventListener('touchend', this._onDocTouchEnd);
    document.removeEventListener('touchmove', this._onPinchGuard);
    this.toggleBtn.remove();
    this.lens.remove();
  }
}

// Export for module systems, also attach to window for script tag usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HyperFocus;
}
if (typeof window !== 'undefined') {
  window.HyperFocus = HyperFocus;
}
