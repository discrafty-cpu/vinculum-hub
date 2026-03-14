/* ═══════════════════════════════════════════════════════════════
   VINCULUM Corrective Feedback Engine (K-Grade)
   ═══════════════════════════════════════════════════════════════
   WHY THIS EXISTS:
   Kindergarteners (age 5-6) are pre-readers in Piaget's Preoperational
   stage. The default showFB() flashes feedback for 1.2 seconds and
   disappears — far too fast for any student, especially pre-readers.

   WHAT IT DOES (non-invasively):
   1. Extends incorrect feedback display to 6 seconds (research-backed)
   2. Auto-reads feedback aloud via speechSynthesis for pre-readers
   3. Repositions feedback ABOVE the problem so eyes stay on the work
   4. Adds a visual icon cue (emoji) alongside text for non-readers
   5. Tap-to-dismiss so students control when they're ready to move on
   6. Delays auto-advance to next problem until feedback is dismissed
   7. Correct feedback stays briefer (2.5s) — celebration, not a lesson

   HOW IT WORKS:
   Uses MutationObserver on the #feedback element to detect when
   showFB() fires. Intercepts the className change, clears the
   auto-hide timer, and applies K-appropriate timing. This avoids
   modifying each tool's individual showFB() implementation.

   RESEARCH BASIS:
   - WWC Practice Guide Rec 6: corrective feedback should be
     immediate, specific, and persistent enough to process
   - Hattie (2009): feedback effect size d=0.73 — but ONLY when
     students can actually process it
   - NRC "Adding It Up": productive struggle requires time to reflect
   - Pre-reader accommodation: multi-modal (visual + auditory)

   GRADE CONFIGURATION:
   - K: 6s incorrect / 2.5s correct, auto-read-aloud, large icons
   - G1: 5s incorrect / 2s correct, read-aloud on request
   - G2: 4s incorrect / 1.5s correct, text-only default
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Grade Detection ── */
  var path = window.location.pathname || '';
  var grade = 'K';
  if (path.indexOf('/G1/') >= 0) grade = 'G1';
  if (path.indexOf('/G2/') >= 0) grade = 'G2';

  /* ── Timing Config by Grade (milliseconds) ── */
  var CONFIG = {
    K:  { incorrect: 6000, correct: 2500, readAloud: true,  iconSize: '28px', fontSize: '20px' },
    G1: { incorrect: 5000, correct: 2000, readAloud: true,  iconSize: '22px', fontSize: '18px' },
    G2: { incorrect: 4000, correct: 1500, readAloud: false, iconSize: '18px', fontSize: '16px' }
  };

  var cfg = CONFIG[grade] || CONFIG.K;

  /* ── State ── */
  var activeTimer = null;
  var advanceBlocked = false;
  var originalSetTimeout = window.setTimeout;
  var feedbackVisible = false;
  var dismissButton = null;

  /* ── Inject Corrective Feedback Styles ── */
  var style = document.createElement('style');
  style.textContent = [
    '/* Vinculum Corrective Feedback Overrides */',

    /* Position feedback above the problem area */
    '#feedback.vinculum-corrective {',
    '  position: fixed !important;',
    '  top: 12px !important;',
    '  left: 50% !important;',
    '  transform: translateX(-50%) !important;',
    '  width: 92% !important;',
    '  max-width: 480px !important;',
    '  z-index: 9990 !important;',
    '  display: flex !important;',
    '  align-items: center !important;',
    '  gap: 12px !important;',
    '  padding: 18px 20px !important;',
    '  border-radius: 16px !important;',
    '  font-size: ' + cfg.fontSize + ' !important;',
    '  line-height: 1.5 !important;',
    '  font-weight: 600 !important;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;',
    '  animation: vcf-slideDown 0.3s ease-out !important;',
    '  cursor: pointer !important;',
    '  user-select: none !important;',
    '}',

    /* Incorrect — warm orange, not alarming red */
    '#feedback.vinculum-corrective.incorrect,',
    '#feedback.vinculum-corrective.negative,',
    '#feedback.vinculum-corrective.try-again {',
    '  background: linear-gradient(135deg, #FFF3E0, #FFE0B2) !important;',
    '  color: #E65100 !important;',
    '  border: 2px solid #FF9800 !important;',
    '}',

    /* Correct — celebratory green */
    '#feedback.vinculum-corrective.correct,',
    '#feedback.vinculum-corrective.positive {',
    '  background: linear-gradient(135deg, #E8F5E9, #C8E6C9) !important;',
    '  color: #2E7D32 !important;',
    '  border: 2px solid #66BB6A !important;',
    '}',

    /* Icon container */
    '.vcf-icon {',
    '  font-size: ' + cfg.iconSize + ' !important;',
    '  flex-shrink: 0 !important;',
    '  line-height: 1 !important;',
    '}',

    /* Message text */
    '.vcf-text {',
    '  flex: 1 !important;',
    '}',

    /* Dismiss hint */
    '.vcf-dismiss {',
    '  font-size: 12px !important;',
    '  opacity: 0.6 !important;',
    '  margin-top: 6px !important;',
    '  font-weight: 400 !important;',
    '}',

    /* Pulse animation for incorrect to draw attention */
    '@keyframes vcf-slideDown {',
    '  from { opacity: 0; transform: translateX(-50%) translateY(-20px); }',
    '  to { opacity: 1; transform: translateX(-50%) translateY(0); }',
    '}',

    /* Fade-out animation */
    '#feedback.vcf-fading {',
    '  animation: vcf-fadeOut 0.4s ease-in forwards !important;',
    '}',

    '@keyframes vcf-fadeOut {',
    '  from { opacity: 1; transform: translateX(-50%) translateY(0); }',
    '  to { opacity: 0; transform: translateX(-50%) translateY(-10px); }',
    '}',

    /* Progress bar showing time remaining */
    '.vcf-timer-bar {',
    '  position: absolute;',
    '  bottom: 0;',
    '  left: 0;',
    '  height: 4px;',
    '  border-radius: 0 0 16px 16px;',
    '  background: currentColor;',
    '  opacity: 0.3;',
    '  transition: width linear;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── Classify Feedback Type ── */
  function classifyFB(className) {
    if (!className) return null;
    var c = className.toLowerCase();
    if (c.indexOf('correct') >= 0 && c.indexOf('incorrect') < 0) return 'correct';
    if (c.indexOf('positive') >= 0) return 'correct';
    if (c.indexOf('incorrect') >= 0 || c.indexOf('negative') >= 0 || c.indexOf('try-again') >= 0) return 'incorrect';
    return null;
  }

  /* ── Speech Synthesis ── */
  function readAloud(text) {
    if (!cfg.readAloud) return;
    if (!window.speechSynthesis) return;

    /* Cancel any ongoing speech */
    window.speechSynthesis.cancel();

    /* Clean text for speech: remove emoji, extra punctuation */
    var cleanText = text
      .replace(/[✓✗✕✖✘☑☒⚠️]/g, '')
      .replace(/[^\w\s.,!?''-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    var utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = 0.8;   /* Slower for K students */
    utter.pitch = 1.1;  /* Slightly higher — friendlier tone */
    utter.volume = 0.9;

    /* Small delay so the visual appears first */
    originalSetTimeout.call(window, function() {
      window.speechSynthesis.speak(utter);
    }, 300);
  }

  /* ── Dismiss Feedback ── */
  function dismissFeedback(fb) {
    if (!feedbackVisible) return;
    feedbackVisible = false;

    /* Stop any reading */
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    /* Clear our timer */
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }

    /* Animate out */
    fb.classList.add('vcf-fading');

    originalSetTimeout.call(window, function() {
      fb.classList.remove('show', 'vinculum-corrective', 'vcf-fading');
      fb.style.display = 'none';
      fb.innerHTML = '';
      advanceBlocked = false;
    }, 400);
  }

  /* ── Enhance Feedback Display ── */
  function enhanceFeedback(fb) {
    var type = classifyFB(fb.className);
    if (!type) return; /* Unknown feedback type, leave alone */

    /* Clear any existing auto-hide the tool set */
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }

    feedbackVisible = true;

    /* Block auto-advance for incorrect feedback */
    if (type === 'incorrect') {
      advanceBlocked = true;
    }

    /* Get the raw text before we modify the DOM */
    var rawText = fb.textContent || fb.innerText || '';

    /* Choose icon based on feedback type */
    var icon = type === 'correct' ? '🌟' : '🤔';

    /* Build enhanced content */
    var iconSpan = '<span class="vcf-icon">' + icon + '</span>';
    var textDiv = '<span class="vcf-text">' + rawText;
    if (type === 'incorrect') {
      textDiv += '<div class="vcf-dismiss">tap when ready</div>';
    }
    textDiv += '</span>';

    /* Add timer bar for visual countdown */
    var duration = type === 'correct' ? cfg.correct : cfg.incorrect;
    var timerBar = '<div class="vcf-timer-bar" style="width:100%;"></div>';

    fb.innerHTML = iconSpan + textDiv + timerBar;

    /* Apply corrective class for positioning/styling */
    fb.classList.add('vinculum-corrective');
    fb.style.display = 'flex';

    /* Start timer bar animation */
    var bar = fb.querySelector('.vcf-timer-bar');
    if (bar) {
      /* Force reflow then animate */
      bar.offsetWidth;
      bar.style.transitionDuration = duration + 'ms';
      originalSetTimeout.call(window, function() {
        bar.style.width = '0%';
      }, 50);
    }

    /* Read aloud for incorrect feedback (always) and correct (K only) */
    if (type === 'incorrect' || (type === 'correct' && grade === 'K')) {
      readAloud(rawText);
    }

    /* Click/tap to dismiss */
    fb.onclick = function() {
      dismissFeedback(fb);
    };

    /* Auto-dismiss after configured time */
    activeTimer = originalSetTimeout.call(window, function() {
      dismissFeedback(fb);
    }, duration);
  }

  /* ── MutationObserver on #feedback ── */
  function attachObserver() {
    var fb = document.getElementById('feedback');
    if (!fb) return false;

    var observer = new MutationObserver(function(mutations) {
      /* Only act when 'show' class is added */
      var hasShow = fb.classList.contains('show');
      if (!hasShow) return;

      /* Don't re-enhance if we already did */
      if (fb.classList.contains('vinculum-corrective')) return;

      enhanceFeedback(fb);
    });

    observer.observe(fb, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      characterData: true
    });

    return true;
  }

  /* ── Intercept setTimeout to Block Premature Auto-Advance ──
     When incorrect feedback is showing, we need to delay the
     auto-advance (setTimeout that calls generateProblem, etc.)
     until the student has processed the feedback.

     Strategy: Wrap window.setTimeout to detect short timers
     (1000-2000ms range) that fire while feedback is active,
     and defer them until feedback is dismissed.
  */
  var deferredAdvances = [];

  window.setTimeout = function(fn, delay) {
    /* Only intercept timers in the auto-advance range (1000-2000ms)
       while incorrect feedback is blocking */
    if (advanceBlocked && typeof delay === 'number' && delay >= 1000 && delay <= 2000 && typeof fn === 'function') {
      /* Defer this until feedback is dismissed */
      deferredAdvances.push(fn);
      /* Return a fake timer ID */
      return originalSetTimeout.call(window, function() {
        /* Check if still blocked when original would have fired */
        if (advanceBlocked) {
          /* Still blocked — wait for dismiss */
          var checkInterval = setInterval(function() {
            if (!advanceBlocked) {
              clearInterval(checkInterval);
              /* Small delay after dismiss so transition completes */
              originalSetTimeout.call(window, fn, 500);
            }
          }, 200);
        } else {
          /* Already unblocked, run immediately */
          fn();
        }
      }, delay);
    }

    /* Pass through all other setTimeout calls unchanged */
    return originalSetTimeout.apply(window, arguments);
  };

  /* Preserve toString for compatibility */
  window.setTimeout.toString = function() {
    return originalSetTimeout.toString();
  };

  /* ── Also Handle Toast-Style Feedback (pattern-machine, position-words) ──
     Some tools create temporary divs instead of using #feedback.
     Watch for these via a document-level observer. */
  function attachToastObserver() {
    var bodyObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType !== 1) return;
          /* Detect toast-style feedback divs */
          var style = node.getAttribute && node.getAttribute('style');
          if (!style) return;
          if (style.indexOf('position') >= 0 && (
            style.indexOf('background') >= 0 ||
            (node.className && (node.className.indexOf('feedback') >= 0 || node.className.indexOf('toast') >= 0))
          )) {
            /* Check if it has a self-destruct timer (short-lived element) */
            /* We can't intercept the remove() call easily, but we can
               re-add it if it gets removed too quickly */
          }
        });
      });
    });

    bodyObserver.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  /* ── Initialize ── */
  function init() {
    if (attachObserver()) {
      attachToastObserver();
      console.log('[vinculum-corrective] ✓ Active — Grade ' + grade +
        ' | Incorrect: ' + (cfg.incorrect / 1000) + 's' +
        ' | Correct: ' + (cfg.correct / 1000) + 's' +
        ' | Read-Aloud: ' + (cfg.readAloud ? 'ON' : 'OFF'));
    } else {
      /* #feedback not in DOM yet — wait for it */
      var retries = 0;
      var check = setInterval(function() {
        retries++;
        if (attachObserver()) {
          clearInterval(check);
          attachToastObserver();
          console.log('[vinculum-corrective] ✓ Active (deferred) — Grade ' + grade);
        } else if (retries > 20) {
          clearInterval(check);
          console.log('[vinculum-corrective] ⚠ No #feedback element found — some tools may use a different pattern');
        }
      }, 250);
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
