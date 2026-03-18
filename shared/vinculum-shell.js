/* ═══════════════════════════════════════════════════════════
   VINCULUM SHELL JS — Grid Layout Bootstrap
   v1.0 — March 2026

   Auto-detects which panels exist and configures the CSS Grid.
   Load AFTER vinculum-shell.css but BEFORE tool-specific scripts.

   Usage:
     <link rel="stylesheet" href="../../shared/vinculum-shell.css">
     <script src="../../shared/vinculum-shell.js"></script>

   The script:
   1. Adds .vinculum-shell to <body> (activates the grid)
   2. Detects guide panel → sets data-has-guide
   3. Detects right sidebar → sets data-has-sidebar
   4. Respects user's guide open/closed preference (localStorage)
   5. Creates the guide toggle button
   6. Exposes VinculumShell API for dynamic control
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  var GUIDE_PREF_KEY = 'vinculum-guide-open';

  // ════════════════════════════════════════
  // 1. ACTIVATE GRID ON BODY
  // ════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;

    // Don't activate in embed mode
    if (window.VinculumParams && window.VinculumParams.embed) return;

    // Add shell class to activate grid
    body.classList.add('vinculum-shell');

    // ════════════════════════════════════════
    // 2. DETECT PANELS
    // ════════════════════════════════════════
    _detectPanels();

    // Re-detect after a short delay (some panels are injected by other scripts)
    setTimeout(_detectPanels, 500);
    setTimeout(_detectPanels, 1500);
  });


  function _detectPanels() {
    var body = document.body;

    // Detect guide panel (injected by vinculum-guide.js)
    var guide = document.querySelector('.vinculum-guide-panel') ||
                document.querySelector('#vinculum-guide-panel') ||
                document.querySelector('[data-vinculum-guide]');

    if (guide) {
      body.setAttribute('data-has-guide', '');

      // Check user preference for open/closed
      try {
        var pref = localStorage.getItem(GUIDE_PREF_KEY);
        if (pref === 'false') {
          body.setAttribute('data-guide-collapsed', '');
        }
      } catch(e) {}

      // Ensure toggle button exists
      _ensureGuideToggle(guide);
    }

    // Detect right sidebar (e.g., addition-strategies sidebar)
    var sidebar = document.querySelector('.vinculum-shell-sidebar') ||
                  document.querySelector('[data-vinculum-sidebar]');

    if (sidebar) {
      body.setAttribute('data-has-sidebar', '');
    }
  }


  // ════════════════════════════════════════
  // 3. GUIDE TOGGLE BUTTON
  // ════════════════════════════════════════
  function _ensureGuideToggle(guideEl) {
    if (document.querySelector('.vinculum-guide-toggle')) return;

    var btn = document.createElement('button');
    btn.className = 'vinculum-guide-toggle';
    btn.title = 'Toggle Guide Panel';
    btn.setAttribute('aria-label', 'Toggle guide panel');
    btn.innerHTML = _isGuideCollapsed() ? '▶' : '◀';

    btn.addEventListener('click', function() {
      toggleGuide();
      btn.innerHTML = _isGuideCollapsed() ? '▶' : '◀';
    });

    // Attach to guide panel (or body if guide has overflow issues)
    if (guideEl && guideEl.style) {
      guideEl.style.position = 'relative'; // for absolute toggle positioning
    }
    (guideEl || document.body).appendChild(btn);
  }


  // ════════════════════════════════════════
  // 4. PUBLIC API
  // ════════════════════════════════════════
  function _isGuideCollapsed() {
    return document.body.hasAttribute('data-guide-collapsed');
  }

  function toggleGuide() {
    var body = document.body;
    if (_isGuideCollapsed()) {
      body.removeAttribute('data-guide-collapsed');
      _savePref(true);
    } else {
      body.setAttribute('data-guide-collapsed', '');
      _savePref(false);
    }
  }

  function showGuide() {
    document.body.removeAttribute('data-guide-collapsed');
    _savePref(true);
  }

  function hideGuide() {
    document.body.setAttribute('data-guide-collapsed', '');
    _savePref(false);
  }

  function _savePref(isOpen) {
    try { localStorage.setItem(GUIDE_PREF_KEY, String(isOpen)); } catch(e) {}
    // Update toggle button arrow
    var btn = document.querySelector('.vinculum-guide-toggle');
    if (btn) btn.innerHTML = isOpen ? '◀' : '▶';
  }

  /**
   * Dynamically add/remove a sidebar.
   * Useful for tools that conditionally show a sidebar.
   */
  function setSidebar(show) {
    if (show) {
      document.body.setAttribute('data-has-sidebar', '');
    } else {
      document.body.removeAttribute('data-has-sidebar');
    }
  }

  /**
   * Override column widths for specific tools.
   * Example: VinculumShell.setWidths({ guide: '300px', sidebar: '350px' });
   */
  function setWidths(opts) {
    var root = document.documentElement;
    if (opts.guide) root.style.setProperty('--shell-guide-width', opts.guide);
    if (opts.sidebar) root.style.setProperty('--shell-sidebar-width', opts.sidebar);
  }


  // ════════════════════════════════════════
  // 5. EXPORT
  // ════════════════════════════════════════
  window.VinculumShell = {
    toggleGuide: toggleGuide,
    showGuide: showGuide,
    hideGuide: hideGuide,
    isGuideCollapsed: _isGuideCollapsed,
    setSidebar: setSidebar,
    setWidths: setWidths,
    refresh: _detectPanels
  };

})();
