/* ═══════════════════════════════════════════════════════════
   VINCULUM ADAPTIVE HOOK — Auto-wires VinculumData into tools
   v1.0 — March 2026

   Non-invasive adapter: uses MutationObserver on the feedback
   element to detect correct/incorrect answers without modifying
   any tool's internal logic.

   Provides:
   - Automatic AdaptiveEngine initialization
   - DOM-based answer detection (watches #feedback element)
   - Difficulty recommendation prompts
   - Session logging on page unload
   - Misconception forwarding to VinculumData
   - Response time tracking

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
  var promptShown = false;
  var promptCooldown = 0; // Prevent rapid re-prompting

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

  // ── Show adaptive recommendation prompt ──
  function showRecommendation(rec) {
    if (promptShown || Date.now() < promptCooldown) return;
    if (rec.action === 'stay') return;

    promptShown = true;
    promptCooldown = Date.now() + 15000; // 15s cooldown between prompts

    var prompt = document.createElement('div');
    prompt.id = 'adaptivePrompt';
    prompt.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);' +
      'background:var(--card2,#1a1f2e);border:2px solid var(--cyan,#00d4ff);border-radius:16px;' +
      'padding:16px 24px;z-index:10000;color:var(--text,#e0e0e0);font-size:15px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:400px;text-align:center;' +
      'animation:slideDown 0.3s ease-out;';

    var message = rec.message || '';
    var html = '<div style="font-weight:700;margin-bottom:8px;color:var(--cyan,#00d4ff);">';

    if (rec.action === 'up') {
      html += '🌟 Level Up!</div>';
      html += '<div>' + message + '</div>';
      html += '<div style="margin-top:12px;">';
      html += '<button onclick="window._vAdaptiveAccept(\'' + (rec.nextDiff || '') + '\')" style="background:var(--cyan,#00d4ff);color:#000;border:none;border-radius:8px;padding:8px 16px;margin:0 4px;cursor:pointer;font-weight:700;">Yes!</button>';
      html += '<button onclick="window._vAdaptiveDismiss()" style="background:transparent;border:1px solid var(--border,#333);color:var(--text,#e0e0e0);border-radius:8px;padding:8px 16px;margin:0 4px;cursor:pointer;">Stay Here</button>';
      html += '</div>';
    } else if (rec.action === 'down') {
      html += '💪 Let\'s Build Up</div>';
      html += '<div>' + message + '</div>';
      html += '<div style="margin-top:12px;">';
      html += '<button onclick="window._vAdaptiveAccept(\'' + (rec.nextDiff || '') + '\')" style="background:var(--pink,#ff6b9d);color:#fff;border:none;border-radius:8px;padding:8px 16px;margin:0 4px;cursor:pointer;font-weight:700;">OK</button>';
      html += '<button onclick="window._vAdaptiveDismiss()" style="background:transparent;border:1px solid var(--border,#333);color:var(--text,#e0e0e0);border-radius:8px;padding:8px 16px;margin:0 4px;cursor:pointer;">Keep Trying</button>';
      html += '</div>';
    } else if (rec.action === 'scaffold') {
      html += '🤔 Thinking Time</div>';
      html += '<div>' + message + '</div>';
      html += '<div style="margin-top:12px;">';
      html += '<button onclick="window._vAdaptiveDismiss()" style="background:var(--yellow,#ffd93d);color:#000;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-weight:700;">Got It!</button>';
      html += '</div>';
    }

    prompt.innerHTML = html;
    document.body.appendChild(prompt);

    // Auto-dismiss after 8 seconds
    setTimeout(function() {
      window._vAdaptiveDismiss();
    }, 8000);
  }

  // ── Accept difficulty change ──
  window._vAdaptiveAccept = function(newDiff) {
    if (!newDiff) { window._vAdaptiveDismiss(); return; }

    // Try to change difficulty through common state patterns
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

    // Click the matching difficulty button if it exists
    var btn = document.querySelector('[data-diff="' + newDiff + '"], .diff-btn[onclick*="' + newDiff + '"]');
    if (btn) btn.click();
    else if (typeof window.render === 'function') window.render();

    // Update engine
    currentDifficulty = newDiff;
    if (engine) engine.diff = newDiff;

    window._vAdaptiveDismiss();
  };

  // ── Dismiss prompt ──
  window._vAdaptiveDismiss = function() {
    var el = document.getElementById('adaptivePrompt');
    if (el) el.remove();
    promptShown = false;
  };

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
            showRecommendation(rec);
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
  style.textContent = '@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}';
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
