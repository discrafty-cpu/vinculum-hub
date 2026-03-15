/**
 * VINCULUM Adaptive Difficulty Module
 * Shared engine for 80+ VINCULUM tools
 * Manages rolling-window difficulty adjustment with productive struggle zone
 */

var VinculumAdaptive = (function() {
  'use strict';

  var version = '1.0.0';

  /**
   * Factory function to create an adaptive difficulty engine instance
   * @param {Object} options - Configuration options
   * @returns {Object} Engine instance with API methods
   */
  function create(options) {
    options = options || {};

    var levels = options.levels || ['emergent', 'developing', 'proficient'];
    var windowSize = options.windowSize || 8;
    var upThreshold = options.upThreshold || 85;
    var downThreshold = options.downThreshold || 40;
    var onLevelChange = options.onLevelChange || function() {};
    var onAnswer = options.onAnswer || function() {};
    var startLevel = options.startLevel || 'emergent';

    // Validate startLevel
    if (levels.indexOf(startLevel) === -1) {
      startLevel = levels[0];
    }

    // State object
    var state = {
      diff: startLevel,
      score: 0,
      total: 0,
      streak: 0,
      answers: []
    };

    /**
     * Calculate percentage of correct answers in rolling window
     * @returns {number} Percentage correct (0-100), or null if window empty
     */
    function getRecentPercentage() {
      if (state.answers.length === 0) {
        return null;
      }
      var recent = state.answers.slice(-windowSize);
      var correct = recent.filter(function(ans) { return ans === true; }).length;
      return Math.round((correct / recent.length) * 100);
    }

    /**
     * Calculate current streak (consecutive correct or incorrect)
     */
    function updateStreak(isCorrect) {
      if (isCorrect) {
        state.streak = state.streak >= 0 ? state.streak + 1 : 1;
      } else {
        state.streak = state.streak <= 0 ? state.streak - 1 : -1;
      }
    }

    /**
     * Check if level change is needed based on rolling window
     * @returns {Object} { leveled: bool, direction: 'up'|'down'|null }
     */
    function checkLevelAdjustment() {
      if (state.answers.length < windowSize) {
        return { leveled: false, direction: null };
      }

      var recentPct = getRecentPercentage();
      var currentLevelIndex = levels.indexOf(state.diff);
      var oldLevel = state.diff;
      var direction = null;
      var leveled = false;

      // Check for level up
      if (recentPct >= upThreshold && currentLevelIndex < levels.length - 1) {
        state.diff = levels[currentLevelIndex + 1];
        direction = 'up';
        leveled = true;
        onLevelChange(state.diff, oldLevel, 'up');
      }
      // Check for level down
      else if (recentPct <= downThreshold && currentLevelIndex > 0) {
        state.diff = levels[currentLevelIndex - 1];
        direction = 'down';
        leveled = true;
        onLevelChange(state.diff, oldLevel, 'down');
      }

      return { leveled: leveled, direction: direction };
    }

    /**
     * Record an answer and auto-adjust difficulty
     * @param {boolean} isCorrect - Whether the answer was correct
     * @returns {Object} { leveled: bool, direction: 'up'|'down'|null }
     */
    function record(isCorrect) {
      state.total += 1;
      if (isCorrect) {
        state.score += 1;
      }
      updateStreak(isCorrect);
      state.answers.push(isCorrect);

      // Trim to keep only rolling window
      if (state.answers.length > windowSize) {
        state.answers.shift();
      }

      // Check for level adjustment
      var adjustment = checkLevelAdjustment();

      // Fire callback
      var stats = {
        score: state.score,
        total: state.total,
        streak: state.streak,
        level: state.diff,
        answers: state.answers.slice(),
        recentPct: getRecentPercentage()
      };
      onAnswer(isCorrect, stats);

      return adjustment;
    }

    /**
     * Get current difficulty level
     * @returns {string} Current level name
     */
    function getLevel() {
      return state.diff;
    }

    /**
     * Manually set difficulty level
     * @param {string} level - New level name
     */
    function setLevel(level) {
      if (levels.indexOf(level) === -1) {
        console.warn('VinculumAdaptive: Invalid level "' + level + '"');
        return;
      }
      var oldLevel = state.diff;
      state.diff = level;
      var direction = levels.indexOf(level) > levels.indexOf(oldLevel) ? 'up' : 'down';
      onLevelChange(level, oldLevel, direction);
    }

    /**
     * Get current statistics
     * @returns {Object} Stats object
     */
    function getStats() {
      return {
        score: state.score,
        total: state.total,
        streak: state.streak,
        level: state.diff,
        answers: state.answers.slice(),
        recentPct: getRecentPercentage()
      };
    }

    /**
     * Reset all stats
     */
    function reset() {
      state.score = 0;
      state.total = 0;
      state.streak = 0;
      state.answers = [];
      state.diff = startLevel;
    }

    // Public API
    return {
      record: record,
      getLevel: getLevel,
      setLevel: setLevel,
      getStats: getStats,
      reset: reset,

      // Direct property access
      get score() {
        return state.score;
      },
      get total() {
        return state.total;
      },
      get streak() {
        return state.streak;
      }
    };
  }

  /**
   * Utility: Sync difficulty button UI to current level
   * Finds all .vinculum-diff-btn elements and marks the matching one as active
   * @param {string} level - The current difficulty level
   */
  function syncDiffButtons(level) {
    var buttons = document.querySelectorAll('.vinculum-diff-btn');
    buttons.forEach(function(btn) {
      var btnLevel = btn.getAttribute('data-level');
      if (btnLevel === level) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Utility: Bind click handlers to difficulty buttons
   * @param {Object} engine - An engine instance from create()
   * @param {Function} onChangeCallback - Called when level changes via button click
   */
  function bindDiffButtons(engine, onChangeCallback) {
    onChangeCallback = onChangeCallback || function() {};

    var buttons = document.querySelectorAll('.vinculum-diff-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var level = btn.getAttribute('data-level');
        if (level) {
          engine.setLevel(level);
          syncDiffButtons(level);
          onChangeCallback(level);
        }
      });
    });
  }

  // Public API
  return {
    version: version,
    create: create,
    syncDiffButtons: syncDiffButtons,
    bindDiffButtons: bindDiffButtons
  };
})();

// Export for Node.js/CommonJS environments if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VinculumAdaptive;
}
