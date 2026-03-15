/* ═══════════════════════════════════════════════════════════
   VINCULUM LAYOUT ENGINE
   v1.0 — March 2026

   Non-invasive layout enhancements for all VINCULUM tools.
   Uses MutationObserver to detect story banners in the workspace
   and relocate them to the side panel. Also adds a fullscreen
   toggle (small dot, top-left of workspace).

   Provides:
   - Story banner relocation: workspace → side panel (top)
   - Fullscreen toggle: hides header, mode bar, side panel
   - Small dot exit button (12px, top-left corner)
   - Preserves read-aloud and 3-Reads functionality

   Loads AFTER all other vinculum scripts. Non-destructive:
   if no story banner or side panel exists, does nothing.
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── CONFIG ──
  var DOT_SIZE = 14;         // px — small enough to avoid accidental taps
  var DOT_COLOR = '#00d4ff'; // cyan — matches VINCULUM theme
  var DOT_COLOR_FS = '#ff6b9d'; // pink when in fullscreen (visual cue to exit)
  var TRANSITION_MS = 250;

  var isFullscreen = false;
  var dot = null;

  // ═══════════════════════════════════════
  // PART 1: STORY BANNER → SIDE PANEL
  // ═══════════════════════════════════════

  // Moves any #storyBanner found in #workspace to the top of #sidePanel.
  // Uses MutationObserver so it catches banners injected by render() calls.
  function relocateStoryBanner() {
    var ws = document.getElementById('workspace');
    var sp = document.getElementById('sidePanel');
    if (!ws || !sp) return;

    var banner = ws.querySelector('#storyBanner');
    if (!banner) return;

    // Don't relocate if already in side panel
    if (sp.contains(banner)) return;

    // Restyle the banner for side-panel context
    banner.style.cssText = 'background:var(--card,#1a1f2e);border:1px solid var(--border,#2a2f3e);' +
      'border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;' +
      'line-height:1.6;color:var(--text,#e0e0e0);position:relative;';

    // Insert at the TOP of the side panel
    if (sp.firstChild) {
      sp.insertBefore(banner, sp.firstChild);
    } else {
      sp.appendChild(banner);
    }
  }

  // Also intercept when tools generate story HTML inline (not as a separate element)
  // by watching workspace innerHTML changes
  function watchForInlineStories() {
    var ws = document.getElementById('workspace');
    if (!ws) return;

    var observer = new MutationObserver(function() {
      // Short delay to let the tool finish rendering
      setTimeout(relocateStoryBanner, 50);
    });

    observer.observe(ws, { childList: true, subtree: true });
  }

  // ═══════════════════════════════════════
  // PART 2: FULLSCREEN TOGGLE (DOT)
  // ═══════════════════════════════════════

  function createDot() {
    dot = document.createElement('div');
    dot.id = 'vinculumFSDot';
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', 'Toggle fullscreen workspace');
    dot.setAttribute('tabindex', '0');
    dot.title = 'Focus mode';

    dot.style.cssText =
      'position:fixed;top:12px;left:12px;' +
      'width:' + DOT_SIZE + 'px;height:' + DOT_SIZE + 'px;' +
      'border-radius:50%;background:' + DOT_COLOR + ';' +
      'cursor:pointer;z-index:10001;' +
      'opacity:0.5;transition:all ' + TRANSITION_MS + 'ms ease;' +
      'box-shadow:0 1px 4px rgba(0,0,0,0.3);';

    // Hover: become more visible
    dot.addEventListener('mouseenter', function() {
      dot.style.opacity = '1';
      dot.style.transform = 'scale(1.3)';
    });
    dot.addEventListener('mouseleave', function() {
      dot.style.opacity = isFullscreen ? '0.7' : '0.5';
      dot.style.transform = 'scale(1)';
    });

    // Click: toggle fullscreen
    dot.addEventListener('click', toggleFullscreen);

    // Keyboard: Enter/Space
    dot.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFullscreen();
      }
      // Escape exits fullscreen
      if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        toggleFullscreen();
      }
    });

    document.body.appendChild(dot);
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;

    var header = document.querySelector('.header');
    var modeBar = document.querySelector('.mode-bar');
    var sidePanel = document.querySelector('.side-panel, #sidePanel');
    var workspace = document.querySelector('.workspace, #workspace');

    // Elements to hide/show
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

      // Dot changes to exit color
      dot.style.background = DOT_COLOR_FS;
      dot.style.opacity = '0.7';
      dot.title = 'Exit focus mode';

    } else {
      // ── EXIT fullscreen ──
      toToggle.forEach(function(el) {
        el.style.display = el.dataset.vOriginalDisplay || '';
        el.style.opacity = '0';
        // Force reflow so transition works
        void el.offsetWidth;
        el.style.opacity = '1';
      });

      // Dot back to normal
      dot.style.background = DOT_COLOR;
      dot.style.opacity = '0.5';
      dot.title = 'Focus mode';
    }
  }

  // Also handle Escape key globally
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isFullscreen) {
      toggleFullscreen();
    }
  });

  // ═══════════════════════════════════════
  // PART 3: INJECT STYLES
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
    /* Smooth transitions for fullscreen toggle */
    '.header,.mode-bar,.side-panel{' +
      'transition:opacity ' + TRANSITION_MS + 'ms ease;' +
    '}';
  document.head.appendChild(css);

  // ═══════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════

  function init() {
    createDot();
    relocateStoryBanner();
    watchForInlineStories();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay to let tool's own init run first
    setTimeout(init, 300);
  }

})();
