/**
 * ═══════════════════════════════════════════════════════════════
 * VINCULUM — Remediation Framework v1.0
 * ═══════════════════════════════════════════════════════════════
 * Multi-step, multi-representation walkthrough system for when a
 * student answers incorrectly. Extracted from Proportional Propulsion.
 *
 * PHILOSOPHY:
 *   When a kid misses a problem, showing them the right answer is
 *   useless. They need to SEE the relationship, BUILD it point by
 *   point, and CONFIRM their understanding before trying again.
 *   This module provides that scaffold for any math domain.
 *
 * ARCHITECTURE:
 *   A remediation is a sequence of STEPS. Each step has:
 *     - A step indicator ("STEP 2 OF 4")
 *     - A heading
 *     - An insight box (plain-language explanation)
 *     - A layout area (graph panel + visual panel side by side)
 *     - An action area (input, button, or auto-advance)
 *
 *   The module handles the overlay, step navigation, input validation,
 *   progressive hints, and close/repeat flow. You provide step configs.
 *
 * USAGE:
 *   var remed = VinculumRemediation.create({
 *     overlayId: 'remOverlay',     // ID of overlay div
 *     cardId:    'remCard',        // ID of card div inside overlay
 *     onClose:   function(prob) {  // called when remediation ends
 *       // Re-render the same problem for retry
 *       renderProblem(prob);
 *     },
 *     steps: function(prob) {
 *       // Return array of step config objects for this problem
 *       return [
 *         { type: 'show', heading: 'SEE THE PATTERN', ... },
 *         { type: 'input', heading: 'CALCULATE', ... },
 *         ...
 *       ];
 *     }
 *   });
 *
 *   // When student gets wrong answer:
 *   remed.open(problemObject);
 *
 * STEP TYPES:
 *   'show'  — Display-only step with "GOT IT" / "NEXT" button
 *   'input' — Step with numeric input that must match expected value
 *   'summary' — Final step with "TRY AGAIN" button
 *
 * REQUIRES:
 *   - An overlay div and card div in the HTML
 *   - vinculum-graph.js for graph rendering (optional)
 *   - vinculum-bar-model.js for bar models (optional)
 *   - KaTeX loaded globally for math rendering (optional)
 * ═══════════════════════════════════════════════════════════════
 */

var VinculumRemediation = (function() {
  'use strict';

  var version = '1.0.0';

  /**
   * Create a remediation instance bound to specific overlay elements.
   */
  function create(config) {
    config = config || {};

    var overlayId = config.overlayId || 'remOverlay';
    var cardId    = config.cardId    || 'remCard';
    var onClose   = config.onClose   || function() {};
    var stepsFn   = config.steps     || function() { return []; };

    var state = {
      active:   false,
      prob:     null,
      steps:    [],
      stepIdx:  0,
      attempts: 0    // hint escalation counter per input step
    };

    /* ── DOM helpers ── */
    function getOverlay() { return document.getElementById(overlayId); }
    function getCard()    { return document.getElementById(cardId); }

    /* ── KaTeX helper (safe if KaTeX not loaded) ── */
    function renderMath(el, latex, displayMode) {
      if (!el) return;
      if (typeof katex !== 'undefined') {
        try { katex.render(latex, el, { throwOnError: false, displayMode: !!displayMode }); }
        catch(e) { el.textContent = latex; }
      } else {
        el.textContent = latex;
      }
    }

    /* ── Feedback flash (uses VinculumFB if available, else simple) ── */
    function flash(text, type) {
      if (typeof VinculumFB !== 'undefined') {
        VinculumFB.show(text, type);
      } else if (typeof showFB === 'function') {
        showFB(text, type === 'correct' ? 'fb-c' : 'fb-w');
      }
    }

    /* ══════════════════════════════════════
       OPEN / CLOSE
       ══════════════════════════════════════ */
    function open(prob) {
      state.prob    = prob;
      state.steps   = stepsFn(prob);
      state.stepIdx = 0;
      state.attempts = 0;
      state.active  = true;

      var overlay = getOverlay();
      if (overlay) overlay.classList.add('active');

      renderStep();
    }

    function close() {
      state.active = false;
      var overlay = getOverlay();
      if (overlay) overlay.classList.remove('active');
      state.attempts = 0;

      onClose(state.prob);
    }

    /* ══════════════════════════════════════
       STEP RENDERING
       ══════════════════════════════════════ */
    function renderStep() {
      var card = getCard();
      if (!card) return;

      var step = state.steps[state.stepIdx];
      if (!step) { close(); return; }

      var totalSteps = state.steps.length;
      var stepNum    = state.stepIdx + 1;
      state.attempts = 0;

      /* ── Step indicator ── */
      var indText = step.type === 'summary'
        ? 'COMPLETE \u2014 GREAT WORK!'
        : 'STEP ' + stepNum + ' OF ' + totalSteps + ' \u2014 ' + (step.indicator || '');

      /* ── Build HTML ── */
      var html = '<div class="rem-step-ind">' + indText + '</div>';
      html += '<h3>' + (step.heading || '') + '</h3>';

      // Insight box
      if (step.insight) {
        html += '<div class="rem-insight">' + step.insight + '</div>';
      }

      // Equation (KaTeX)
      if (step.equation) {
        html += '<div class="rem-eq" id="remEqAuto"></div>';
      }

      // Layout: graph panel + visual panel
      if (step.graphHTML || step.visualHTML) {
        html += '<div class="rem-layout">';
        if (step.graphHTML) {
          html += '<div class="rem-graph-panel">' + step.graphHTML + '</div>';
        }
        if (step.visualHTML) {
          html += '<div class="rem-visual-panel">' + step.visualHTML + '</div>';
        }
        html += '</div>';
      }

      // Custom HTML block
      if (step.contentHTML) {
        html += step.contentHTML;
      }

      // Action area
      if (step.type === 'show') {
        html += '<button class="btn btn-sm" style="margin-top:12px;" id="remNextBtn">'
              + (step.buttonText || 'I SEE IT \u2014 NEXT') + '</button>';
      } else if (step.type === 'input') {
        html += '<div style="display:flex;gap:12px;align-items:center;justify-content:center;margin-top:16px;flex-wrap:wrap;">';
        html += '<div style="font-size:16px;color:#40c4ff;font-weight:700;">' + (step.inputPrefix || 'y =') + '</div>';
        html += '<input class="rem-input" id="remInput" type="number" step="any" autocomplete="off"'
              + ' placeholder="' + (step.placeholder || '') + '">';
        html += '<button class="btn btn-sm" id="remCheckBtn">CHECK</button>';
        html += '</div>';
        html += '<div id="remHintArea" style="margin-top:8px;min-height:20px;"></div>';
      } else if (step.type === 'summary') {
        html += '<button class="btn" style="margin-top:16px;" id="remCloseBtn">'
              + (step.buttonText || 'TRY THE PROBLEM AGAIN') + '</button>';
      }

      card.innerHTML = html;

      /* ── Post-render: KaTeX, canvas, event listeners ── */
      setTimeout(function() {
        // KaTeX equation
        if (step.equation) {
          var eqEl = document.getElementById('remEqAuto');
          if (eqEl) renderMath(eqEl, step.equation);
        }

        // Canvas rendering callback
        if (step.onRender) {
          step.onRender(card, state.prob);
        }

        // Button listeners
        var nextBtn = document.getElementById('remNextBtn');
        if (nextBtn) nextBtn.addEventListener('click', advance);

        var closeBtn = document.getElementById('remCloseBtn');
        if (closeBtn) closeBtn.addEventListener('click', close);

        var checkBtn = document.getElementById('remCheckBtn');
        var input    = document.getElementById('remInput');
        if (checkBtn && step.type === 'input') {
          var expected = step.expected;
          checkBtn.addEventListener('click', function() { checkInput(expected, step); });
          if (input) {
            input.focus();
            input.addEventListener('keydown', function(e) {
              if (e.key === 'Enter') checkInput(expected, step);
            });
          }
        }
      }, 50);
    }

    /* ── Advance to next step ── */
    function advance() {
      state.stepIdx++;
      if (state.stepIdx >= state.steps.length) {
        close();
      } else {
        renderStep();
      }
    }

    /* ── Check numeric input with progressive hints ── */
    function checkInput(expected, step) {
      var input = document.getElementById('remInput');
      if (!input) return;
      var val = parseFloat(input.value);

      if (Math.abs(val - expected) < 0.01) {
        flash('CORRECT', 'correct');
        state.attempts = 0;
        setTimeout(advance, 800);
      } else {
        state.attempts++;
        flash('TRY AGAIN', 'incorrect');
        input.value = '';
        input.focus();

        var hintArea = document.getElementById('remHintArea');
        if (hintArea) {
          if (state.attempts === 1 && step.hint1) {
            hintArea.innerHTML = '<div style="font-size:13px;color:rgba(255,109,0,.7);">' + step.hint1 + '</div>';
          } else if (state.attempts >= 2) {
            hintArea.innerHTML = '<div style="font-size:14px;color:#ff9100;font-weight:700;">'
              + (step.hint2 || 'The answer is <b>' + expected + '</b>') + '</div>';
            input.value = expected;
          }
        }
      }
    }

    /* ── Public instance API ── */
    return {
      open:      open,
      close:     close,
      advance:   advance,
      getState:  function() { return state; },
      renderMath: renderMath
    };
  }

  /* ── Module API ── */
  return {
    version: version,
    create:  create
  };

})();
