/* ═══════════════════════════════════════════════════════════
   VINCULUM ADAPTIVE HOOK — Auto-wires VinculumData into tools
   v1.1 — March 2026

   Non-invasive adapter: uses MutationObserver on the feedback
   element to detect correct/incorrect answers without modifying
   any tool's internal logic.

   Provides:
   - Automatic AdaptiveEngine initialization
   - DOM-based answer detection (watches #feedback element)
   - Silent auto-adjust: difficulty changes invisibly (no popup)
   - Non-blocking scaffold hints for struggling students
   - Session logging on page unload
   - Misconception forwarding to VinculumData
   - Response time tracking

   v1.1 change: Replaced popup "Level Up!" prompt with silent
   auto-adjust. Students stay in flow — the platform quietly
   adjusts difficulty when they hit 85% or drop below 40%.
   Scaffold hints appear briefly at bottom of screen and fade
   automatically (no buttons, no decisions required).

   Loads AFTER vinculum-data.js. Falls back gracefully if
   VinculumData is not available.
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Bail if VinculumData not loaded
  if (!window.VinculumData) return;

  var toolName = window.location.pathname.split('/').pop().replace('.html', '');
  var engine = null;
  var sessionCorrect = 0;
  var sessionTotal = 0;
  var lastAnswerTime = Date.now();
  var sessionStartTime = Date.now();
  var currentDifficulty = 'emergent';
  var promptCooldown = 0; // Prevent rapid re-adjusting

  // ── Detect initial difficulty from common state patterns ──
  function detectDifficulty() {
    // Tools use: state.difficulty, S.difficulty, S.diff, currentDifficulty
    if (window.state && window.state.difficulty) return window.state.difficulty;
    if (window.S && window.S.difficulty) return window.S.difficulty;
    if (window.S && window.S.diff) return window.S.diff;
    if (window.currentDifficulty) return window.currentDifficulty;
    // Check active difficulty button
    var activeBtn = document.querySelector('.diff-btn.active, [data-diff].active');
    if (activeBtn) return activeBtn.dataset.diff || activeBtn.textContent.trim().toLowerCase();
    return 'emergent';
  }

  // ── Initialize engine after a short delay (let tool init first) ──
  setTimeout(function() {
    currentDifficulty = detectDifficulty();
    engine = VinculumData.createAdaptiveEngine(currentDifficulty);
  }, 500);

  // ── Classify feedback class as correct/incorrect ──
  function classifyFeedback(className) {
    if (!className) return null;
    var cls = className.toLowerCase();
    if (cls.indexOf('correct') >= 0 && cls.indexOf('incorrect') < 0) return 'correct';
    if (cls.indexOf('incorrect') >= 0 || cls.indexOf('negative') >= 0 || cls.indexOf('try-again') >= 0) return 'incorrect';
    if (cls.indexOf('positive') >= 0) return 'correct';
    return null;
  }

  // ── Silent auto-adjust: apply difficulty changes without interrupting the student ──
  // Research: K students should stay in flow. The adaptive engine detects when
  // problems are too easy (>85%) or too hard (<40%) and adjusts silently.
  // No popups, no decisions — just the right challenge level, automatically.
  function applyRecommendation(rec) {
    if (Date.now() < promptCooldown) return;
    if (rec.action === 'stay') return;

    // For up/down: silently change the difficulty
    if ((rec.action === 'up' || rec.action === 'down') && rec.nextDiff) {
      promptCooldown = Date.now() + 20000; // 20s cooldown between adjustments

      var newDiff = rec.nextDiff;

      // Update state through common tool patterns
      if (window.state && 'difficulty' in window.state) {
        window.state.difficulty = newDiff;
      } else if (window.S && 'difficulty' in window.S) {
        window.S.difficulty = newDiff;
      } else if (window.S && 'diff' in window.S) {
        window.S.diff = newDiff;
      }
      if (typeof window.currentDifficulty !== 'undefined') {
        window.currentDifficulty = newDiff;
      }

      // Click the matching difficulty button if it exists (triggers tool's own render)
      var btn = document.querySelector('[data-diff="' + newDiff + '"], .diff-btn[onclick*="' + newDiff + '"]');
      if (btn) btn.click();
      else if (typeof window.render === 'function') window.render();

      // Update engine tracking
      currentDifficulty = newDiff;
      if (engine) engine.diff = newDiff;

      // Log the silent adjustment for teacher visibility
      if (window.VinculumData && window.VinculumData.logEvent) {
        VinculumData.logEvent(toolName, 'adaptive-adjust', {
          action: rec.action,
          from: currentDifficulty,
          to: newDiff,
          accuracy: engine ? engine.getWindowAccuracy() : null
        });
      }
    }

    // For scaffold: show a brief, non-blocking hint (no buttons, fades on its own)
    if (rec.action === 'scaffold') {
      promptCooldown = Date.now() + 30000; // 30s cooldown for scaffold hints
      showScaffoldHint(rec.message || 'Take your time!');
    }
  }

  // ── Non-blocking scaffold hint (no buttons, auto-fades) ──
  function showScaffoldHint(message) {
    var existing = document.getElementById('adaptiveHint');
    if (existing) existing.remove();

    var hint = document.createElement('div');
    hint.id = 'adaptiveHint';
    hint.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
      'background:rgba(255,217,61,0.95);border-radius:12px;' +
      'padding:10px 20px;z-index:9999;color:#333;font-size:14px;font-weight:600;' +
      'box-shadow:0 4px 16px rgba(0,0,0,0.15);text-align:center;pointer-events:none;' +
      'animation:hintFade 4s ease-out forwards;';
    hint.textContent = '\uD83D\uDCA1 ' + message;
    document.body.appendChild(hint);

    // Remove after animation
    setTimeout(function() {
      if (hint.parentNode) hint.remove();
    }, 4000);
  }

  // ── Watch #feedback element for class changes ──
  function setupObserver() {
    var fb = document.getElementById('feedback');
    if (!fb) {
      // Retry — some tools create feedback element dynamically
      setTimeout(setupObserver, 1000);
      return;
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.type !== 'attributes' || m.attributeName !== 'class') return;

        var result = classifyFeedback(fb.className);
        if (!result) return;

        var now = Date.now();
        var responseTime = now - lastAnswerTime;
        lastAnswerTime = now;

        var isCorrect = result === 'correct';
        sessionTotal++;
        if (isCorrect) sessionCorrect++;

        // Record in adaptive engine
        if (engine) {
          engine.record(isCorrect, responseTime);

          // Check for recommendation (only in Practice/Play modes)
          var mode = detectMode();
          if (mode !== 'explore') {
            var rec = engine.recommend();
            applyRecommendation(rec);
          }
        }
      });
    });

    observer.observe(fb, { attributes: true, attributeFilter: ['class'] });
  }

  // ── Detect current mode ──
  function detectMode() {
    if (window.state && window.state.mode) return window.state.mode;
    if (window.S && window.S.mode) return window.S.mode;
    var activeTab = document.querySelector('.mode-btn.active, [data-mode].active');
    if (activeTab) return (activeTab.dataset.mode || activeTab.textContent.trim().toLowerCase());
    return 'practice';
  }

  // ── Log session on page unload ──
  function logSession() {
    if (sessionTotal === 0) return;
    currentDifficulty = detectDifficulty();
    VinculumData.logSession(toolName, sessionTotal, sessionCorrect, currentDifficulty, [toolName]);
  }

  window.addEventListener('beforeunload', logSession);
  // Also log periodically (every 2 minutes) in case student doesn't close tab
  setInterval(function() {
    if (sessionTotal > 0) {
      logSession();
      // Reset counters after logging (prevent double-counting)
      sessionCorrect = 0;
      sessionTotal = 0;
    }
  }, 120000);

  // ── Add slideDown animation ──
  var style = document.createElement('style');
  style.textContent = '@keyframes hintFade{0%{opacity:0;transform:translateX(-50%) translateY(10px);}10%{opacity:1;transform:translateX(-50%) translateY(0);}80%{opacity:1;}100%{opacity:0;transform:translateX(-50%) translateY(-10px);}}';
  document.head.appendChild(style);

  // ── Start observer when DOM is ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }

  // ── Public API for tools that want explicit control ──
  window.VinculumAdaptive = {
    record: function(isCorrect, responseTimeMs) {
      if (engine) engine.record(isCorrect, responseTimeMs);
      sessionTotal++;
      if (isCorrect) sessionCorrect++;
    },
    getEngine: function() { return engine; },
    getStats: function() { return engine ? engine.getStats() : null; },
    logSession: logSession
  };

})();
