/* ═══════════════════════════════════════════════════════════
   VINCULUM LAYOUT ENGINE
   v2.0 — March 2026

   Non-invasive layout enhancements for all VINCULUM tools.
   Uses MutationObserver to detect story banners in the workspace
   and relocate them to the side panel.

   Provides:
   - Story banner relocation: workspace → side panel (top)
   - Collapsible side panel with toggle tab
   - Fullscreen toggle: hides header, mode bar, side panel
   - Visible toggle button (replaces 14px dot)
   - Preserves read-aloud and 3-Reads functionality
   - Chromebook viewport optimization (1366×768)

   Loads AFTER all other vinculum scripts. Non-destructive:
   if no story banner or side panel exists, does nothing.
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── CONFIG ──
  var TOGGLE_SIZE = 36;        // px — visible on Chromebook
  var TOGGLE_COLOR = '#00d4ff'; // cyan — matches VINCULUM theme
  var TOGGLE_COLOR_FS = '#ff6b9d'; // pink when in fullscreen
  var TRANSITION_MS = 250;
  var PANEL_COLLAPSED_KEY = 'vinculum-panel-collapsed';

  var isFullscreen = false;
  var isPanelCollapsed = false;
  var toggleBtn = null;
  var panelTab = null;

  // ═══════════════════════════════════════
  // PART 1: STORY BANNER → SIDE PANEL
  // ═══════════════════════════════════════

  function relocateStoryBanner() {
    var ws = document.getElementById('workspace');
    var sp = document.getElementById('sidePanel');
    if (!ws || !sp) return;

    var banner = ws.querySelector('#storyBanner');
    if (!banner) return;
    if (sp.contains(banner)) return;

    banner.style.cssText = 'background:var(--card,#1a1f2e);border:1px solid var(--border,#2a2f3e);' +
      'border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;' +
      'line-height:1.6;color:var(--text,#e0e0e0);position:relative;';

    if (sp.firstChild) {
      sp.insertBefore(banner, sp.firstChild);
    } else {
      sp.appendChild(banner);
    }
  }

  function watchForInlineStories() {
    var ws = document.getElementById('workspace');
    if (!ws) return;

    var observer = new MutationObserver(function() {
      setTimeout(relocateStoryBanner, 50);
    });

    observer.observe(ws, { childList: true, subtree: true });
  }

  // ═══════════════════════════════════════
  // PART 2: COLLAPSIBLE SIDE PANEL
  // ═══════════════════════════════════════

  function createPanelTab() {
    var sidePanel = document.querySelector('.side-panel, #sidePanel');
    if (!sidePanel) return;

    // Get the parent flex container
    var container = sidePanel.parentElement;
    if (!container) return;

    panelTab = document.createElement('button');
    panelTab.id = 'vinculumPanelTab';
    panelTab.setAttribute('role', 'button');
    panelTab.setAttribute('aria-label', 'Toggle side panel');
    panelTab.setAttribute('tabindex', '0');
    panelTab.title = 'Toggle panel';
    panelTab.textContent = '›';

    panelTab.style.cssText =
      'position:absolute;right:0;top:50%;transform:translateY(-50%);' +
      'width:24px;height:64px;' +
      'background:var(--accent,#00d4ff);color:#fff;' +
      'border:none;border-radius:8px 0 0 8px;' +
      'cursor:pointer;z-index:1001;font-size:16px;font-weight:bold;' +
      'display:flex;align-items:center;justify-content:center;' +
      'transition:all ' + TRANSITION_MS + 'ms ease;' +
      'opacity:0.7;box-shadow:-2px 0 8px rgba(0,0,0,0.2);';

    panelTab.addEventListener('mouseenter', function() {
      panelTab.style.opacity = '1';
      panelTab.style.width = '28px';
    });
    panelTab.addEventListener('mouseleave', function() {
      panelTab.style.opacity = '0.7';
      panelTab.style.width = '24px';
    });

    panelTab.addEventListener('click', togglePanel);

    // Insert the tab — position it relative to the workspace
    var workspace = document.querySelector('.workspace, #workspace');
    if (workspace) {
      workspace.style.position = 'relative';
      workspace.appendChild(panelTab);
    }

    // Restore saved state
    try {
      if (localStorage.getItem(PANEL_COLLAPSED_KEY) === 'true') {
        collapsePanel(sidePanel);
      }
    } catch(e) { /* localStorage not available */ }
  }

  function togglePanel() {
    var sidePanel = document.querySelector('.side-panel, #sidePanel');
    if (!sidePanel) return;

    if (isPanelCollapsed) {
      expandPanel(sidePanel);
    } else {
      collapsePanel(sidePanel);
    }

    try {
      localStorage.setItem(PANEL_COLLAPSED_KEY, isPanelCollapsed ? 'true' : 'false');
    } catch(e) {}
  }

  function collapsePanel(sp) {
    isPanelCollapsed = true;
    sp.dataset.vOrigWidth = sp.style.width || '';
    sp.style.transition = 'width ' + TRANSITION_MS + 'ms ease, padding ' + TRANSITION_MS + 'ms ease, opacity ' + TRANSITION_MS + 'ms ease';
    sp.style.width = '0';
    sp.style.padding = '0';
    sp.style.overflow = 'hidden';
    sp.style.opacity = '0';
    sp.style.minWidth = '0';
    sp.style.borderLeft = 'none';

    if (panelTab) {
      panelTab.textContent = '‹';
      panelTab.title = 'Show panel';
    }
  }

  function expandPanel(sp) {
    isPanelCollapsed = false;
    sp.style.transition = 'width ' + TRANSITION_MS + 'ms ease, padding ' + TRANSITION_MS + 'ms ease, opacity ' + TRANSITION_MS + 'ms ease';
    sp.style.width = sp.dataset.vOrigWidth || '280px';
    sp.style.padding = '20px';
    sp.style.overflow = '';
    sp.style.opacity = '1';
    sp.style.minWidth = '';
    sp.style.borderLeft = '1px solid var(--border, #2a2f3e)';

    if (panelTab) {
      panelTab.textContent = '›';
      panelTab.title = 'Hide panel';
    }
  }

  // ═══════════════════════════════════════
  // PART 3: FULLSCREEN TOGGLE
  // ═══════════════════════════════════════

  function createToggle() {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'vinculumFSToggle';
    toggleBtn.setAttribute('role', 'button');
    toggleBtn.setAttribute('aria-label', 'Toggle fullscreen workspace');
    toggleBtn.setAttribute('tabindex', '0');
    toggleBtn.title = 'Focus mode';

    // Use an expand icon (⛶) — visible to children
    toggleBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4"/></svg>';

    toggleBtn.style.cssText =
      'position:fixed;top:8px;left:8px;' +
      'width:' + TOGGLE_SIZE + 'px;height:' + TOGGLE_SIZE + 'px;' +
      'border-radius:10px;background:' + TOGGLE_COLOR + ';' +
      'border:none;cursor:pointer;z-index:10001;' +
      'opacity:0.6;transition:all ' + TRANSITION_MS + 'ms ease;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.3);' +
      'display:flex;align-items:center;justify-content:center;' +
      'color:#fff;padding:0;';

    toggleBtn.addEventListener('mouseenter', function() {
      toggleBtn.style.opacity = '1';
      toggleBtn.style.transform = 'scale(1.1)';
    });
    toggleBtn.addEventListener('mouseleave', function() {
      toggleBtn.style.opacity = isFullscreen ? '0.8' : '0.6';
      toggleBtn.style.transform = 'scale(1)';
    });

    toggleBtn.addEventListener('click', toggleFullscreen);

    toggleBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFullscreen();
      }
    });

    document.body.appendChild(toggleBtn);
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;

    var header = document.querySelector('.vinculum-header, .header');
    var modeBar = document.querySelector('.vinculum-mode-tabs, .mode-bar');
    var sidePanel = document.querySelector('.side-panel, #sidePanel');

    var toToggle = [header, modeBar, sidePanel].filter(Boolean);

    if (isFullscreen) {
      // ── ENTER fullscreen ──
      toToggle.forEach(function(el) {
        el.dataset.vOriginalDisplay = el.style.display || '';
        el.style.transition = 'opacity ' + TRANSITION_MS + 'ms ease';
        el.style.opacity = '0';
        setTimeout(function() {
          el.style.display = 'none';
        }, TRANSITION_MS);
      });

      // Hide the panel tab too
      if (panelTab) panelTab.style.display = 'none';

      // Switch to shrink icon
      toggleBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2v4H2M12 2v4h4M16 12h-4v4M2 12h4v4"/></svg>';
      toggleBtn.style.background = TOGGLE_COLOR_FS;
      toggleBtn.style.opacity = '0.8';
      toggleBtn.title = 'Exit focus mode';

    } else {
      // ── EXIT fullscreen ──
      toToggle.forEach(function(el) {
        el.style.display = el.dataset.vOriginalDisplay || '';
        el.style.opacity = '0';
        void el.offsetWidth;
        el.style.opacity = '1';
      });

      // Restore panel tab
      if (panelTab) panelTab.style.display = '';

      // Restore panel collapsed state
      if (isPanelCollapsed && sidePanel) {
        collapsePanel(sidePanel);
      }

      // Switch to expand icon
      toggleBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4"/></svg>';
      toggleBtn.style.background = TOGGLE_COLOR;
      toggleBtn.style.opacity = '0.6';
      toggleBtn.title = 'Focus mode';
    }
  }

  // Escape key globally
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isFullscreen) {
      toggleFullscreen();
    }
  });

  // ═══════════════════════════════════════
  // PART 4: INJECT STYLES
  // ═══════════════════════════════════════

  var css = document.createElement('style');
  css.textContent =
    /* Side-panel story card styling */
    '#storyBanner.v-panel-story{' +
      'background:var(--card,#1a1f2e);border:1px solid var(--border,#2a2f3e);' +
      'border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;' +
      'line-height:1.6;color:var(--text,#e0e0e0);position:relative;' +
    '}' +
    /* Make read-aloud button fit panel width */
    '#storyBanner.v-panel-story button[title="Read story aloud"]{' +
      'position:static!important;display:block;margin-top:8px;width:100%;' +
      'text-align:center;padding:6px;border-radius:8px;font-size:12px;' +
    '}' +
    /* Smooth transitions */
    '.header,.vinculum-header,.mode-bar,.vinculum-mode-tabs,.side-panel,#sidePanel{' +
      'transition:opacity ' + TRANSITION_MS + 'ms ease, width ' + TRANSITION_MS + 'ms ease;' +
    '}' +
    /* Side panel responsive — on narrow viewports, use less space */
    '@media (max-width: 1200px){' +
      '.side-panel,#sidePanel{width:220px!important;padding:14px!important;font-size:12px!important;}' +
    '}' +
    '@media (max-width: 1000px){' +
      '.side-panel,#sidePanel{width:180px!important;padding:10px!important;font-size:11px!important;}' +
    '}' +
    /* Fullscreen toggle button focus style */
    '#vinculumFSToggle:focus-visible{outline:2px solid #fff;outline-offset:2px;}' +
    '#vinculumPanelTab:focus-visible{outline:2px solid #fff;outline-offset:2px;}';
  document.head.appendChild(css);

  // ═══════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════

  function init() {
    createToggle();
    createPanelTab();
    relocateStoryBanner();
    watchForInlineStories();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 300);
  }

})();
