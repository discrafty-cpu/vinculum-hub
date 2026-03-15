/**
 * VINCULUM Feedback Module
 * Centralized feedback popup system for all VINCULUM tools
 * Replaces copy-pasted showFB() functions across 90+ files
 *
 * Usage:
 *   VinculumFB.show('Great job!', 'correct', 2000)
 *   VinculumFB.celebrate('Perfect score!')
 *   showFB('Old API still works', 'correct')
 */

var VinculumFB = (function() {
  'use strict';

  var config = {
    version: '1.0.0',
    feedbackId: 'feedback',
    ariaLiveId: 'ariaLive',
    defaultDuration: 1400,
    celebrateDuration: 3000,
    defaultClassName: 'correct'
  };

  var cssInjected = false;

  /**
   * Inject feedback CSS into page if not already present
   */
  function injectCSS() {
    if (cssInjected) return;
    if (document.getElementById('vinculum-feedback-styles')) return;

    var style = document.createElement('style');
    style.id = 'vinculum-feedback-styles';
    style.textContent = `
      .feedback {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) scale(0.8);
        padding: 24px 48px;
        border-radius: 20px;
        font-size: 28px;
        font-weight: 800;
        pointer-events: none;
        opacity: 0;
        z-index: 9999 !important;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
        text-align: center;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .feedback.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      .feedback.correct {
        background: rgba(0, 230, 118, 0.35) !important;
        color: var(--green, #00e676) !important;
        border: 2px solid var(--green, #00e676) !important;
      }

      .feedback.incorrect {
        background: rgba(255, 59, 139, 0.35) !important;
        color: var(--pink, #ff3b8b) !important;
        border: 2px solid var(--pink, #ff3b8b) !important;
      }

      .feedback.try-again {
        background: rgba(255, 193, 7, 0.35) !important;
        color: var(--yellow, #ffc107) !important;
        border: 2px solid var(--yellow, #ffc107) !important;
      }

      .feedback.celebrate {
        font-size: 36px;
        animation: celebrate-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      @keyframes celebrate-pop {
        0% {
          transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
        }
        100% {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
        }
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;

    document.head.appendChild(style);
    cssInjected = true;
  }

  /**
   * Get or create the feedback element
   */
  function getFeedbackElement() {
    var el = document.getElementById(config.feedbackId);
    if (!el) {
      el = document.createElement('div');
      el.id = config.feedbackId;
      el.className = 'feedback';
      el.setAttribute('role', 'alert');
      document.body.appendChild(el);
    }
    return el;
  }

  /**
   * Get or create the screen reader announcement element
   */
  function getAriaLiveElement() {
    var el = document.getElementById(config.ariaLiveId);
    if (!el) {
      el = document.createElement('div');
      el.id = config.ariaLiveId;
      el.className = 'sr-only';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      document.body.appendChild(el);
    }
    return el;
  }

  /**
   * Normalize className to handle different naming conventions
   * Maps all variants to standard names: 'correct', 'incorrect', 'try-again'
   */
  function normalizeClassName(className) {
    if (!className) return config.defaultClassName;

    var normalized = String(className).toLowerCase().trim();

    // Handle boolean (isError variant)
    if (normalized === 'true') return 'incorrect';
    if (normalized === 'false') return 'correct';

    // Handle common variants
    if (normalized === 'error' || normalized === 'fail' || normalized === 'wrong') {
      return 'incorrect';
    }
    if (normalized === 'success' || normalized === 'valid' || normalized === 'ok') {
      return 'correct';
    }
    if (normalized === 'warning' || normalized === 'info') {
      return 'try-again';
    }

    // Return as-is if it's one of the standard names
    if (normalized === 'correct' || normalized === 'incorrect' || normalized === 'try-again') {
      return normalized;
    }

    // Default fallback
    return config.defaultClassName;
  }

  /**
   * Main show method
   * @param {string} text - Message to display
   * @param {string} className - CSS class: 'correct', 'incorrect', 'try-again' (default: 'correct')
   * @param {number} duration - How long to show in ms (default: 1400)
   */
  function show(text, className, duration) {
    // Ensure CSS is injected
    injectCSS();

    // Get or create elements
    var feedbackEl = getFeedbackElement();
    var ariaEl = getAriaLiveElement();

    // Handle defaults
    text = String(text || '');
    className = normalizeClassName(className);
    duration = duration || config.defaultDuration;

    // Set text content
    feedbackEl.textContent = text;
    ariaEl.textContent = text;

    // Clear any existing classes and apply new ones
    feedbackEl.className = 'feedback show ' + className;

    // Clear any pending timeouts
    if (feedbackEl.hideTimeout) {
      clearTimeout(feedbackEl.hideTimeout);
    }

    // Schedule hide
    feedbackEl.hideTimeout = setTimeout(function() {
      feedbackEl.classList.remove('show');
    }, duration);
  }

  /**
   * Celebrate method for big wins
   * Longer duration, larger text, special animation
   * @param {string} text - Message to display
   * @param {number} duration - How long to show (default: 3000)
   */
  function celebrate(text, duration) {
    // Ensure CSS is injected
    injectCSS();

    // Get or create elements
    var feedbackEl = getFeedbackElement();
    var ariaEl = getAriaLiveElement();

    // Handle defaults
    text = String(text || '');
    duration = duration || config.celebrateDuration;

    // Set text content
    feedbackEl.textContent = text;
    ariaEl.textContent = text;

    // Clear any existing classes and apply celebration style
    feedbackEl.className = 'feedback show correct celebrate';

    // Clear any pending timeouts
    if (feedbackEl.hideTimeout) {
      clearTimeout(feedbackEl.hideTimeout);
    }

    // Schedule hide
    feedbackEl.hideTimeout = setTimeout(function() {
      feedbackEl.classList.remove('show');
    }, duration);
  }

  /**
   * Public API
   */
  var publicAPI = {
    show: show,
    celebrate: celebrate,
    version: config.version
  };

  return publicAPI;
})();

/**
 * Backward-compatible global function
 * Supports all historical variants of showFB()
 *
 * Examples:
 *   showFB('Done!', 'correct')                    // standard
 *   showFB(text, className)                       // named params
 *   showFB('Try again', 'try-again')              // variant names
 *   showFB(message, isError)                      // boolean variant
 *   showFB(msg)                                   // just text, default class
 */
function showFB(text, classNameOrDuration) {
  var className = 'correct';
  var duration;

  // Handle various parameter types
  if (typeof classNameOrDuration === 'number') {
    // Duration passed as second param (less common)
    duration = classNameOrDuration;
  } else if (typeof classNameOrDuration === 'boolean') {
    // Boolean variant: showFB(text, isError)
    className = classNameOrDuration ? 'incorrect' : 'correct';
  } else if (typeof classNameOrDuration === 'string') {
    // Standard variant: showFB(text, className)
    className = classNameOrDuration;
  }

  // Call the centralized module
  if (duration) {
    VinculumFB.show(text, className, duration);
  } else {
    VinculumFB.show(text, className);
  }
}

/**
 * Fallback showFeedback alias (some files use different name)
 */
function showFeedback(text, type) {
  showFB(text, type);
}
