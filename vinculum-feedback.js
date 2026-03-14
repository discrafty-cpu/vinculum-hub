/**
 * VINCULUM Feedback & Debug System
 * A two-tier feedback widget (Tier 1: User Feedback, Tier 2: Developer Debug)
 *
 * Tier 1: Lightweight feedback widget with GitHub export
 * Tier 2: Developer debug mode with state inspection and element debugging
 *
 * Load via: <script src="../../vinculum-feedback.js"></script>
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION & STATE
  // ============================================================================

  const CONFIG = {
    feedbackStorageKey: 'vinculum-feedback',
    debugModeKey: 'vinculum-debug-mode',
    themeKey: 'vinculum-theme',
    maxEntries: 50,
    html2canvasUrl: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    stateUpdateInterval: 500,
    zIndexBase: 10000,
  };

  let debugMode = false;
  let publicMode = false;
  let githubConfig = { owner: 'discrafty-cpu', repo: 'vinculum-hub' };
  let debugStatePanel = null;
  let debugPins = [];
  let debugPinCounter = 0;
  let html2canvasLoaded = false;

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getToolName() {
    const path = window.location.pathname;
    const match = path.match(/\/([^\/]+)\.html?$/);
    return match ? match[1] : 'unknown-tool';
  }

  function getCurrentTheme() {
    try {
      return localStorage.getItem(CONFIG.themeKey) || 'light';
    } catch {
      return 'light';
    }
  }

  function getAppState() {
    const state = window.S || window.state || {};
    return {
      mode: state.mode || null,
      difficulty: state.diff || state.difficulty || null,
      score: state.score || null,
      streak: state.streak || null,
      full: state,
    };
  }

  function loadFeedback() {
    try {
      const data = localStorage.getItem(CONFIG.feedbackStorageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveFeedback(entries) {
    try {
      const trimmed = entries.slice(-CONFIG.maxEntries);
      localStorage.setItem(CONFIG.feedbackStorageKey, JSON.stringify(trimmed));
    } catch {
      console.warn('Failed to save feedback to localStorage');
    }
  }

  function loadDebugMode() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'true') {
      return true;
    }
    try {
      return localStorage.getItem(CONFIG.debugModeKey) === 'true';
    } catch {
      return false;
    }
  }

  function isHubPage() {
    return window.location.pathname.includes('VINCULUM-Hub.html');
  }

  // ============================================================================
  // CSS INJECTION
  // ============================================================================

  function injectStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Feedback Button & Panel */
      .vinculum-feedback-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--cyan, #06b6d4);
        color: var(--text-dark, #0f172a);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: ${CONFIG.zIndexBase};
        transition: all 0.3s ease;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .vinculum-feedback-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      }

      .vinculum-feedback-button:active {
        transform: scale(0.95);
      }

      .vinculum-feedback-panel {
        position: fixed;
        right: -350px;
        top: 0;
        width: 320px;
        height: 100vh;
        background: var(--card, #1e293b);
        border-left: 1px solid var(--border, #334155);
        box-shadow: -4px 0 16px rgba(0, 0, 0, 0.3);
        z-index: ${CONFIG.zIndexBase + 1};
        transition: right 0.3s ease;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, sans-serif;
        color: var(--text, #e2e8f0);
      }

      .vinculum-feedback-panel.open {
        right: 0;
      }

      .vinculum-feedback-panel-header {
        padding: 20px;
        border-bottom: 1px solid var(--border, #334155);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--background, #0f172a);
      }

      .vinculum-feedback-panel-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .vinculum-feedback-close {
        background: none;
        border: none;
        color: var(--text, #e2e8f0);
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .vinculum-feedback-content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }

      .feedback-field {
        margin-bottom: 18px;
      }

      .feedback-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted, #cbd5e1);
      }

      .feedback-type-options {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .feedback-type-chip {
        flex: 1;
        min-width: 70px;
        padding: 8px 12px;
        border: 2px solid var(--border, #334155);
        background: var(--background, #0f172a);
        color: var(--text, #e2e8f0);
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease;
        text-align: center;
      }

      .feedback-type-chip:hover {
        border-color: var(--cyan, #06b6d4);
      }

      .feedback-type-chip.active {
        background: var(--cyan, #06b6d4);
        color: var(--text-dark, #0f172a);
        border-color: var(--cyan, #06b6d4);
      }

      .feedback-textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid var(--border, #334155);
        background: var(--background, #0f172a);
        color: var(--text, #e2e8f0);
        border-radius: 6px;
        font-family: inherit;
        font-size: 13px;
        resize: vertical;
        min-height: 100px;
        box-sizing: border-box;
      }

      .feedback-textarea:focus {
        outline: none;
        border-color: var(--cyan, #06b6d4);
        box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.1);
      }

      .feedback-priority {
        display: flex;
        gap: 8px;
      }

      .feedback-priority-btn {
        flex: 1;
        padding: 8px;
        border: 1px solid var(--border, #334155);
        background: var(--background, #0f172a);
        color: var(--text, #e2e8f0);
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .feedback-priority-btn.active {
        background: var(--cyan, #06b6d4);
        color: var(--text-dark, #0f172a);
        border-color: var(--cyan, #06b6d4);
      }

      .feedback-button-group {
        display: flex;
        gap: 8px;
        margin-top: 20px;
      }

      .feedback-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .feedback-submit {
        background: var(--cyan, #06b6d4);
        color: var(--text-dark, #0f172a);
      }

      .feedback-submit:hover {
        background: var(--cyan, #06b6d4);
        opacity: 0.9;
      }

      .feedback-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .feedback-secondary {
        background: var(--border, #334155);
        color: var(--text, #e2e8f0);
      }

      .feedback-secondary:hover {
        background: var(--border, #475569);
      }

      .screenshot-preview {
        width: 100%;
        max-height: 140px;
        border-radius: 6px;
        margin-top: 8px;
        border: 1px solid var(--border, #334155);
      }

      .screenshot-status {
        font-size: 12px;
        color: var(--text-muted, #cbd5e1);
        margin-top: 4px;
      }

      /* Debug Mode */
      .vinculum-debug-border {
        border: 3px dashed red !important;
      }

      .vinculum-debug-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.95);
        border-bottom: 2px solid #ef4444;
        z-index: ${CONFIG.zIndexBase + 2};
        max-height: 50vh;
        overflow: auto;
        font-family: 'Courier New', monospace;
        font-size: 11px;
        color: #10b981;
        padding: 12px;
        display: none;
        backdrop-filter: blur(4px);
      }

      .vinculum-debug-panel.visible {
        display: block;
      }

      .debug-section {
        margin-bottom: 12px;
        border: 1px solid #334155;
        border-radius: 4px;
        overflow: hidden;
      }

      .debug-section-header {
        background: #1e293b;
        padding: 8px 12px;
        border-bottom: 1px solid #334155;
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        color: #06b6d4;
      }

      .debug-section-header:hover {
        background: #334155;
      }

      .debug-section-content {
        padding: 8px 12px;
        background: #0f172a;
        max-height: 300px;
        overflow: auto;
        display: none;
      }

      .debug-section-content.open {
        display: block;
      }

      .debug-json {
        white-space: pre-wrap;
        word-break: break-all;
        line-height: 1.4;
      }

      .debug-pin {
        position: fixed;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(239, 68, 68, 0.8);
        border: 2px solid #fca5a5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        z-index: ${CONFIG.zIndexBase + 3};
        font-family: system-ui;
      }

      .debug-pin:hover {
        background: #ef4444;
      }

      .debug-pin-note {
        position: fixed;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid #ef4444;
        border-radius: 4px;
        padding: 8px;
        font-family: system-ui;
        font-size: 12px;
        color: #e2e8f0;
        z-index: ${CONFIG.zIndexBase + 4};
        min-width: 150px;
        max-width: 250px;
      }

      .debug-pin-input {
        width: 100%;
        padding: 4px;
        background: #1e293b;
        border: 1px solid #334155;
        color: #e2e8f0;
        border-radius: 2px;
        font-size: 11px;
        font-family: system-ui;
        box-sizing: border-box;
      }

      .debug-toast {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(15, 23, 42, 0.95);
        color: #10b981;
        padding: 12px 16px;
        border-radius: 4px;
        border: 1px solid #10b981;
        font-family: system-ui;
        font-size: 13px;
        z-index: ${CONFIG.zIndexBase + 5};
        animation: slideIn 0.3s ease;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .debug-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        z-index: ${CONFIG.zIndexBase - 1};
        cursor: crosshair;
      }

      .debug-overlay.hidden {
        display: none;
      }

      /* Responsive */
      @media (max-width: 600px) {
        .vinculum-feedback-panel {
          width: 100%;
          right: -100%;
        }

        .feedback-type-options {
          gap: 4px;
        }

        .feedback-type-chip {
          min-width: 60px;
          padding: 6px 8px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // ============================================================================
  // TIER 1: FEEDBACK WIDGET
  // ============================================================================

  function createFeedbackUI() {
    if (isHubPage()) {
      return;
    }

    const container = document.createElement('div');
    container.id = 'vinculum-feedback-root';

    // Floating button
    const button = document.createElement('button');
    button.className = 'vinculum-feedback-button';
    button.innerHTML = '💬';
    button.title = 'Send feedback';
    button.onclick = () => openFeedbackPanel();

    // Panel
    const panel = document.createElement('div');
    panel.className = 'vinculum-feedback-panel';
    panel.id = 'vinculum-feedback-panel';
    panel.innerHTML = `
      <div class="vinculum-feedback-panel-header">
        <h2>Send Feedback</h2>
        <button class="vinculum-feedback-close">&times;</button>
      </div>
      <div class="vinculum-feedback-content">
        <div class="feedback-field">
          <label class="feedback-label">Type</label>
          <div class="feedback-type-options">
            <button class="feedback-type-chip active" data-type="bug">🐛 Bug</button>
            <button class="feedback-type-chip" data-type="idea">💡 Idea</button>
            <button class="feedback-type-chip" data-type="ux">🎯 UX Issue</button>
            <button class="feedback-type-chip" data-type="content">✏️ Content</button>
          </div>
        </div>

        <div class="feedback-field">
          <label class="feedback-label">Description</label>
          <textarea
            id="feedback-description"
            class="feedback-textarea"
            placeholder="Describe what happened or what you'd like to see..."
          ></textarea>
        </div>

        <div class="feedback-field">
          <label class="feedback-label">Priority</label>
          <div class="feedback-priority">
            <button class="feedback-priority-btn" data-priority="low">Low</button>
            <button class="feedback-priority-btn active" data-priority="medium">Medium</button>
            <button class="feedback-priority-btn" data-priority="high">High</button>
          </div>
        </div>

        <div class="feedback-field">
          <button id="feedback-screenshot-btn" class="feedback-btn feedback-secondary">
            📸 Capture Screenshot
          </button>
          <img id="feedback-screenshot-preview" class="screenshot-preview" style="display: none;">
          <div id="feedback-screenshot-status" class="screenshot-status"></div>
        </div>

        <div class="feedback-button-group">
          <button id="feedback-submit-btn" class="feedback-btn feedback-submit">
            ✓ Submit
          </button>
        </div>
      </div>
    `;

    container.appendChild(button);
    container.appendChild(panel);
    document.body.appendChild(container);

    setupFeedbackEventListeners();
  }

  function setupFeedbackEventListeners() {
    const panel = document.getElementById('vinculum-feedback-panel');
    let selectedType = 'bug';
    let selectedPriority = 'medium';
    let screenshotData = null;

    // Close button
    panel.querySelector('.vinculum-feedback-close').onclick = closeFeedbackPanel;

    // Type selection
    panel.querySelectorAll('.feedback-type-chip').forEach(btn => {
      btn.onclick = () => {
        panel.querySelectorAll('.feedback-type-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.type;
      };
    });

    // Priority selection
    panel.querySelectorAll('.feedback-priority-btn').forEach(btn => {
      btn.onclick = () => {
        panel.querySelectorAll('.feedback-priority-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPriority = btn.dataset.priority;
      };
    });

    // Screenshot
    document.getElementById('feedback-screenshot-btn').onclick = () => {
      captureScreenshot()
        .then(data => {
          screenshotData = data;
          const preview = document.getElementById('feedback-screenshot-preview');
          preview.src = data;
          preview.style.display = 'block';
          document.getElementById('feedback-screenshot-status').textContent = '✓ Screenshot captured';
        })
        .catch(err => {
          document.getElementById('feedback-screenshot-status').textContent = 'Screenshots unavailable';
          console.warn('Screenshot failed:', err);
        });
    };

    // Submit
    document.getElementById('feedback-submit-btn').onclick = () => {
      const description = document.getElementById('feedback-description').value.trim();
      if (!description) {
        alert('Please describe what you want to share!');
        return;
      }

      const toolName = getToolName();
      const appState = getAppState();

      const entry = {
        id: generateUUID(),
        type: selectedType,
        description,
        priority: selectedPriority,
        screenshot: screenshotData,
        metadata: {
          toolName,
          currentMode: appState.mode,
          difficulty: appState.difficulty,
          score: appState.score,
          streak: appState.streak,
          theme: getCurrentTheme(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          url: window.location.href,
        },
        status: 'new',
      };

      const entries = loadFeedback();
      entries.push(entry);
      saveFeedback(entries);

      alert('💫 Thanks for your feedback! Help us make VINCULUM better!');
      closeFeedbackPanel();
      resetFeedbackForm();
      screenshotData = null;
    };
  }

  function openFeedbackPanel() {
    const panel = document.getElementById('vinculum-feedback-panel');
    if (panel) {
      panel.classList.add('open');
    }
  }

  function closeFeedbackPanel() {
    const panel = document.getElementById('vinculum-feedback-panel');
    if (panel) {
      panel.classList.remove('open');
    }
  }

  function resetFeedbackForm() {
    document.getElementById('feedback-description').value = '';
    document.getElementById('feedback-screenshot-preview').style.display = 'none';
    document.getElementById('feedback-screenshot-status').textContent = '';
  }

  function captureScreenshot() {
    return new Promise((resolve, reject) => {
      if (!html2canvasLoaded) {
        loadHtml2Canvas()
          .then(() => {
            performCapture().then(resolve).catch(reject);
          })
          .catch(reject);
      } else {
        performCapture().then(resolve).catch(reject);
      }
    });
  }

  function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CONFIG.html2canvasUrl;
      script.onload = () => {
        html2canvasLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function performCapture() {
    return new Promise((resolve, reject) => {
      if (typeof html2canvas === 'undefined') {
        reject(new Error('html2canvas not available'));
        return;
      }

      const toolContainer = document.querySelector('main') || document.querySelector('.tool') || document.body;
      html2canvas(toolContainer, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      })
        .then(canvas => {
          resolve(canvas.toDataURL('image/png'));
        })
        .catch(reject);
    });
  }

  // ============================================================================
  // TIER 2: DEBUG MODE
  // ============================================================================

  function initDebugMode() {
    debugMode = loadDebugMode();

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDebugMode();
      }
    });

    if (debugMode) {
      activateDebugMode();
    }
  }

  function toggleDebugMode() {
    debugMode = !debugMode;
    try {
      localStorage.setItem(CONFIG.debugModeKey, debugMode.toString());
    } catch {}

    if (debugMode) {
      activateDebugMode();
    } else {
      deactivateDebugMode();
    }

    showDebugToast(debugMode ? '🔧 Debug Mode ON' : 'Debug Mode OFF');
  }

  function activateDebugMode() {
    // Red border on tool
    const toolContainer = document.querySelector('main') || document.querySelector('.tool') || document.body;
    if (toolContainer) {
      toolContainer.classList.add('vinculum-debug-border');
    }

    // Create debug panel
    createDebugPanel();

    // Start live state updates
    setInterval(() => updateDebugState(), CONFIG.stateUpdateInterval);

    // Element inspector hover
    setupElementInspector();
  }

  function deactivateDebugMode() {
    const toolContainer = document.querySelector('main') || document.querySelector('.tool') || document.body;
    if (toolContainer) {
      toolContainer.classList.remove('vinculum-debug-border');
    }

    if (debugStatePanel && debugStatePanel.parentNode) {
      debugStatePanel.parentNode.removeChild(debugStatePanel);
      debugStatePanel = null;
    }

    debugPins.forEach(pin => {
      if (pin.element && pin.element.parentNode) {
        pin.element.parentNode.removeChild(pin.element);
      }
      if (pin.noteEl && pin.noteEl.parentNode) {
        pin.noteEl.parentNode.removeChild(pin.noteEl);
      }
    });
    debugPins = [];
    debugPinCounter = 0;
  }

  function createDebugPanel() {
    debugStatePanel = document.createElement('div');
    debugStatePanel.className = 'vinculum-debug-panel visible';
    debugStatePanel.innerHTML = `
      <div class="debug-section">
        <div class="debug-section-header">📊 App State <span>▼</span></div>
        <div class="debug-section-content open">
          <div id="debug-state-json" class="debug-json"></div>
        </div>
      </div>
      <div class="debug-section">
        <div class="debug-section-header">🎯 Misconceptions <span>▼</span></div>
        <div class="debug-section-content open">
          <div id="debug-misconceptions" class="debug-json">None logged</div>
        </div>
      </div>
      <div class="debug-section">
        <div class="debug-section-header">💾 LocalStorage (vinculum-*) <span>▼</span></div>
        <div class="debug-section-content open">
          <div id="debug-storage" class="debug-json"></div>
        </div>
      </div>
      <div class="debug-section">
        <div class="debug-section-header">📝 Debug Actions <span>▼</span></div>
        <div class="debug-section-content open" style="padding: 8px;">
          <button id="debug-pin-toggle" style="padding: 6px 12px; margin-right: 8px; cursor: pointer; background: #334155; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px; font-size: 11px;">
            📌 Drop Pin (Alt+Click)
          </button>
          <button id="debug-export" style="padding: 6px 12px; cursor: pointer; background: #334155; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px; font-size: 11px;">
            📥 Export Report
          </button>
        </div>
      </div>
    `;

    document.body.insertBefore(debugStatePanel, document.body.firstChild);

    // Collapsible sections
    debugStatePanel.querySelectorAll('.debug-section-header').forEach(header => {
      header.onclick = () => {
        const content = header.nextElementSibling;
        content.classList.toggle('open');
        header.querySelector('span').textContent = content.classList.contains('open') ? '▼' : '▶';
      };
    });

    // Export button
    document.getElementById('debug-export').onclick = () => exportDebugReport();

    updateDebugState();
  }

  function updateDebugState() {
    if (!debugStatePanel) return;

    const appState = getAppState();
    document.getElementById('debug-state-json').textContent = JSON.stringify(appState.full, null, 2);

    // Misconceptions (if available)
    const misconceptionsEl = document.getElementById('debug-misconceptions');
    if (window.VinculumData && window.VinculumData.activeMisconceptions) {
      misconceptionsEl.textContent = JSON.stringify(window.VinculumData.activeMisconceptions, null, 2);
    }

    // LocalStorage
    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('vinculum-')) {
        try {
          storage[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          storage[key] = localStorage.getItem(key);
        }
      }
    }
    document.getElementById('debug-storage').textContent = JSON.stringify(storage, null, 2);
  }

  function setupElementInspector() {
    document.addEventListener('mouseover', e => {
      const target = e.target;
      if (!isInteractive(target)) return;

      let title = `<${target.tagName.toLowerCase()}`;
      if (target.id) title += ` id="${target.id}"`;
      if (target.className) title += ` class="${target.className.split(' ')[0]}"`;
      title += `>`;

      let tooltip = title;
      if (target.onclick) tooltip += '\n[onclick]';
      if (target.value) tooltip += `\nvalue: ${target.value}`;
      if (target.innerText) tooltip += `\ntext: ${target.innerText.substring(0, 30)}`;

      target.title = tooltip;
    });

    document.addEventListener('click', e => {
      if (e.altKey && debugMode) {
        e.preventDefault();
        createDebugPin(e.clientX, e.clientY);
      }
    });
  }

  function isInteractive(el) {
    return /^(button|input|a|select|textarea)$/i.test(el.tagName) ||
           el.onclick !== null ||
           el.getAttribute('role') === 'button';
  }

  function createDebugPin(x, y) {
    debugPinCounter++;
    const pinNum = debugPinCounter;

    const pinEl = document.createElement('div');
    pinEl.className = 'debug-pin';
    pinEl.textContent = pinNum;
    pinEl.style.left = (x - 14) + 'px';
    pinEl.style.top = (y - 14) + 'px';

    const noteEl = document.createElement('div');
    noteEl.className = 'debug-pin-note';
    noteEl.style.left = (x + 20) + 'px';
    noteEl.style.top = (y - 20) + 'px';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'debug-pin-input';
    input.placeholder = `Pin ${pinNum} note`;
    input.value = '';

    noteEl.appendChild(input);
    document.body.appendChild(pinEl);
    document.body.appendChild(noteEl);

    const pinObj = { number: pinNum, x, y, element: pinEl, noteEl, input };
    debugPins.push(pinObj);

    pinEl.onclick = (e) => {
      e.stopPropagation();
      noteEl.style.display = noteEl.style.display === 'none' ? 'block' : 'none';
    };

    input.onkeydown = (e) => {
      if (e.key === 'Delete' || (e.ctrlKey && e.key === 'Backspace')) {
        debugPins = debugPins.filter(p => p.number !== pinNum);
        pinEl.parentNode.removeChild(pinEl);
        noteEl.parentNode.removeChild(noteEl);
      }
    };
  }

  function exportDebugReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      state: getAppState().full,
      pins: debugPins.map(p => ({
        number: p.number,
        x: p.x,
        y: p.y,
        note: p.input.value,
      })),
      feedback: loadFeedback(),
      screenshotNote: 'Screenshot not included in JSON export',
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function showDebugToast(message) {
    const toast = document.createElement('div');
    toast.className = 'debug-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 2000);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.VinculumFeedback = {
    // Tier 1 API
    open: openFeedbackPanel,
    close: closeFeedbackPanel,
    submit: function(data) {
      const entry = {
        id: generateUUID(),
        type: data.type || 'bug',
        description: data.description || '',
        priority: data.priority || 'medium',
        screenshot: data.screenshot || null,
        metadata: {
          toolName: getToolName(),
          ...data.metadata,
        },
        status: 'new',
      };
      const entries = loadFeedback();
      entries.push(entry);
      saveFeedback(entries);
    },
    getAll: loadFeedback,
    getByTool: function(toolName) {
      return loadFeedback().filter(e => e.metadata.toolName === toolName);
    },
    exportToGitHub: function(entryId) {
      const entries = loadFeedback();
      const entry = entries.find(e => e.id === entryId);
      if (!entry) return;

      const title = `[${entry.type}] ${entry.metadata.toolName}: ${entry.description.substring(0, 50)}`;
      const body = `
## Feedback Details

**Type:** ${entry.type}
**Tool:** ${entry.metadata.toolName}
**Priority:** ${entry.priority}
**Submitted:** ${entry.metadata.timestamp}

## Description
${entry.description}

## Metadata
- User Agent: ${entry.metadata.userAgent}
- Screen Size: ${entry.metadata.screenSize}
- Theme: ${entry.metadata.theme}
- Mode: ${entry.metadata.currentMode || 'N/A'}
- Difficulty: ${entry.metadata.difficulty || 'N/A'}

${entry.screenshot ? '**Note:** Screenshot attached in original feedback' : ''}
      `.trim();

      const encoded = new URLSearchParams({
        title,
        body,
        labels: entry.type,
      }).toString();

      const url = `https://github.com/${githubConfig.owner}/${githubConfig.repo}/issues/new?${encoded}`;
      window.open(url, '_blank');

      entry.status = 'exported';
      saveFeedback(entries);
    },
    clearAll: function() {
      if (confirm('Clear all stored feedback?')) {
        saveFeedback([]);
      }
    },
    clearExported: function() {
      const entries = loadFeedback().filter(e => e.status !== 'exported');
      saveFeedback(entries);
    },

    // Tier 2 API
    enableDebug: function(enable) {
      if (enable) {
        debugMode = true;
        activateDebugMode();
      } else {
        debugMode = false;
        deactivateDebugMode();
      }
      try {
        localStorage.setItem(CONFIG.debugModeKey, enable.toString());
      } catch {}
    },
    isDebugMode: () => debugMode,
    getStateSnapshot: getAppState,
    exportDebugReport,

    // Config
    enablePublicMode: function(enable) {
      publicMode = enable;
    },
    setRepo: function(owner, repo) {
      githubConfig = { owner, repo };
    },
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    injectStyles();
    createFeedbackUI();
    initDebugMode();
  }

  init();
})();
