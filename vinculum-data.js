/* ═══════════════════════════════════════════════════════════
   VINCULUM DATA — Session Persistence & Adaptive Engine
   v1.0 — March 2026

   Loaded by every tool alongside vinculum-core.js.
   Provides:
   - Anonymous student session tracking (localStorage)
   - Spaced retrieval scheduling
   - Adaptive difficulty engine
   - Misconception logging
   - Strategy/process capture for teacher insight
   - Graceful fallback if localStorage unavailable
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ════════════════════════════════════════
  // 1. STORAGE LAYER (with fallback)
  // ════════════════════════════════════════
  var _storage = null;
  var _memFallback = {};  // In-memory fallback if localStorage blocked

  function _canUseStorage() {
    if (_storage !== null) return _storage;
    try {
      var test = '__vinculum_test__';
      localStorage.setItem(test, '1');
      localStorage.removeItem(test);
      _storage = true;
    } catch(e) {
      _storage = false;
    }
    return _storage;
  }

  function _get(key) {
    if (_canUseStorage()) {
      try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
    }
    return _memFallback[key] || null;
  }

  function _set(key, val) {
    if (_canUseStorage()) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { _memFallback[key] = val; }
    } else {
      _memFallback[key] = val;
    }
  }


  // ════════════════════════════════════════
  // 2. STUDENT IDENTITY (anonymous)
  // ════════════════════════════════════════
  function _getStudentId() {
    var id = _get('vinculum-student-id');
    if (!id) {
      id = 'stu-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
      _set('vinculum-student-id', id);
    }
    return id;
  }


  // ════════════════════════════════════════
  // 3. SESSION LOGGING
  // ════════════════════════════════════════
  function _getSessions() {
    return _get('vinculum-sessions') || [];
  }

  function _saveSessions(sessions) {
    // Keep last 200 sessions max to avoid storage bloat
    if (sessions.length > 200) sessions = sessions.slice(-200);
    _set('vinculum-sessions', sessions);
  }


  // ════════════════════════════════════════
  // 4. REVIEW QUEUE (Spaced Retrieval)
  // ════════════════════════════════════════
  function _getReviewQueue() {
    return _get('vinculum-review-queue') || [];
  }

  function _saveReviewQueue(queue) {
    _set('vinculum-review-queue', queue);
  }

  // Spacing intervals in days: 1, 3, 7, 14, 30
  var SPACING = [1, 3, 7, 14, 30];

  function _scheduleReview(concept, toolId, accuracy) {
    var queue = _getReviewQueue();
    // Find existing entry for this concept
    var existing = queue.find(function(r) { return r.concept === concept; });
    var now = Date.now();
    var dayMs = 86400000;

    if (existing) {
      // Move to next spacing interval if accuracy > 70%
      if (accuracy >= 0.7) {
        existing.interval = Math.min(existing.interval + 1, SPACING.length - 1);
      } else {
        // Reset to shorter interval
        existing.interval = Math.max(0, existing.interval - 1);
      }
      existing.due = now + (SPACING[existing.interval] * dayMs);
      existing.lastPracticed = now;
      existing.accuracy = accuracy;
    } else {
      queue.push({
        concept: concept,
        sourceTool: toolId,
        due: now + (SPACING[0] * dayMs),
        interval: 0,
        lastPracticed: now,
        accuracy: accuracy,
        created: now
      });
    }
    _saveReviewQueue(queue);
  }

  function _getDueReviews() {
    var queue = _getReviewQueue();
    var now = Date.now();
    return queue.filter(function(r) { return r.due <= now; });
  }


  // ════════════════════════════════════════
  // 5. ADAPTIVE DIFFICULTY ENGINE
  // ════════════════════════════════════════
  /**
   * Tracks performance within a session and recommends difficulty adjustments.
   * Call .record() after each problem. Check .recommend() for adjustments.
   */
  function AdaptiveEngine(initialDiff) {
    this.diff = initialDiff || 'emergent';
    this.window = [];         // Rolling window of last 8 results
    this.windowSize = 8;
    this.totalCorrect = 0;
    this.totalAttempts = 0;
    this.responseTimes = [];
    this.lastActionTime = Date.now();
    this.idleThreshold = 30000;  // 30 seconds = frustration signal
    this.hintLevel = 0;          // 0=none, 1=general, 2=specific, 3=visual
  }

  AdaptiveEngine.prototype.record = function(correct, responseTimeMs) {
    this.totalAttempts++;
    if (correct) this.totalCorrect++;
    this.window.push(correct ? 1 : 0);
    if (this.window.length > this.windowSize) this.window.shift();
    if (responseTimeMs) this.responseTimes.push(responseTimeMs);
    this.lastActionTime = Date.now();
    // Reset hint level on correct answer
    if (correct) this.hintLevel = 0;
  };

  AdaptiveEngine.prototype.getWindowAccuracy = function() {
    if (this.window.length === 0) return 1;
    var sum = 0;
    for (var i = 0; i < this.window.length; i++) sum += this.window[i];
    return sum / this.window.length;
  };

  AdaptiveEngine.prototype.recommend = function() {
    var acc = this.getWindowAccuracy();
    var result = { action: 'stay', message: null };

    // Check for idle/frustration
    var idle = Date.now() - this.lastActionTime;
    if (idle > this.idleThreshold && this.totalAttempts > 0) {
      result.action = 'scaffold';
      result.message = 'Need a hint? Let me help!';
      return result;
    }

    // Need at least 4 problems to make a recommendation
    if (this.window.length < 4) return result;

    if (acc >= 0.85) {
      // Crushing it — bump up
      result.action = 'up';
      result.message = 'Great work! Ready for a bigger challenge?';
      if (this.diff === 'emergent') result.nextDiff = 'proficient';
      else if (this.diff === 'proficient') result.nextDiff = 'advanced';
      else result.nextDiff = 'advanced';
    } else if (acc <= 0.40) {
      // Struggling — scaffold first, then consider stepping down
      if (this.hintLevel < 3) {
        result.action = 'scaffold';
        result.message = this._getScaffoldMessage();
        this.hintLevel++;
      } else {
        result.action = 'down';
        result.message = "Let's build up to this — try an easier set first.";
        if (this.diff === 'advanced') result.nextDiff = 'proficient';
        else if (this.diff === 'proficient') result.nextDiff = 'emergent';
        else result.nextDiff = 'emergent';
      }
    }
    // 0.40-0.85 = productive struggle zone — stay where we are

    return result;
  };

  AdaptiveEngine.prototype._getScaffoldMessage = function() {
    var msgs = [
      "Take your time — think about what you already know.",
      "Try using the picture to help. What do you see?",
      "Let me show you a hint..."
    ];
    return msgs[Math.min(this.hintLevel, msgs.length - 1)];
  };

  AdaptiveEngine.prototype.getStats = function() {
    return {
      difficulty: this.diff,
      totalAttempts: this.totalAttempts,
      totalCorrect: this.totalCorrect,
      accuracy: this.totalAttempts > 0 ? (this.totalCorrect / this.totalAttempts) : 0,
      windowAccuracy: this.getWindowAccuracy(),
      avgResponseTime: this.responseTimes.length > 0 ?
        Math.round(this.responseTimes.reduce(function(a,b){return a+b;},0) / this.responseTimes.length) : 0,
      hintLevel: this.hintLevel
    };
  };


  // ════════════════════════════════════════
  // 6. MISCONCEPTION LOGGER
  // ════════════════════════════════════════
  function _getMisconceptions() {
    return _get('vinculum-misconceptions') || [];
  }

  function _logMisconception(toolId, misconceptionId, description, studentAnswer, correctAnswer) {
    var log = _getMisconceptions();
    log.push({
      tool: toolId,
      id: misconceptionId,
      description: description,
      studentAnswer: studentAnswer,
      correctAnswer: correctAnswer,
      timestamp: Date.now(),
      studentId: _getStudentId()
    });
    // Keep last 500
    if (log.length > 500) log = log.slice(-500);
    _set('vinculum-misconceptions', log);
  }


  // ════════════════════════════════════════
  // 7. PROCESS / STRATEGY CAPTURE
  // ════════════════════════════════════════
  function ProcessLogger(toolId) {
    this.toolId = toolId;
    this.events = [];
    this.startTime = Date.now();
  }

  ProcessLogger.prototype.log = function(action, detail) {
    this.events.push({
      action: action,
      detail: detail || null,
      time: Date.now() - this.startTime,
      timestamp: Date.now()
    });
  };

  ProcessLogger.prototype.getStrategyProfile = function() {
    // Analyze events to determine strategy patterns
    var profile = {
      totalEvents: this.events.length,
      duration: Date.now() - this.startTime,
      actions: {},
      hesitations: 0,      // gaps > 5 seconds between actions
      revisions: 0          // undo/change actions
    };

    for (var i = 0; i < this.events.length; i++) {
      var evt = this.events[i];
      profile.actions[evt.action] = (profile.actions[evt.action] || 0) + 1;
      if (i > 0 && (evt.time - this.events[i-1].time) > 5000) {
        profile.hesitations++;
      }
      if (evt.action === 'undo' || evt.action === 'change' || evt.action === 'retry') {
        profile.revisions++;
      }
    }

    return profile;
  };

  ProcessLogger.prototype.save = function() {
    var sessions = _getSessions();
    var profile = this.getStrategyProfile();
    sessions.push({
      tool: this.toolId,
      studentId: _getStudentId(),
      date: new Date().toISOString().split('T')[0],
      startTime: this.startTime,
      profile: profile,
      events: this.events.slice(-50)  // Keep last 50 events per session
    });
    _saveSessions(sessions);
  };


  // ════════════════════════════════════════
  // 8. DATA EXPORT (Teacher Dashboard)
  // ════════════════════════════════════════
  function _exportAllData() {
    return {
      studentId: _getStudentId(),
      sessions: _getSessions(),
      reviewQueue: _getReviewQueue(),
      misconceptions: _getMisconceptions(),
      exportDate: new Date().toISOString()
    };
  }

  function _exportCSV() {
    var sessions = _getSessions();
    var lines = ['date,tool,duration_sec,total_events,hesitations,revisions'];
    sessions.forEach(function(s) {
      var dur = s.profile ? Math.round(s.profile.duration / 1000) : 0;
      var evts = s.profile ? s.profile.totalEvents : 0;
      var hes = s.profile ? s.profile.hesitations : 0;
      var rev = s.profile ? s.profile.revisions : 0;
      lines.push([s.date, s.tool, dur, evts, hes, rev].join(','));
    });
    return lines.join('\n');
  }

  function _clearAllData() {
    if (_canUseStorage()) {
      localStorage.removeItem('vinculum-sessions');
      localStorage.removeItem('vinculum-review-queue');
      localStorage.removeItem('vinculum-misconceptions');
      // Keep student ID and theme
    }
    _memFallback = {};
  }


  // ════════════════════════════════════════
  // 9. PUBLIC API
  // ════════════════════════════════════════
  window.VinculumData = {
    // Identity
    getStudentId: _getStudentId,

    // Session logging
    logSession: function(toolId, problemCount, correctCount, difficulty, concepts) {
      var sessions = _getSessions();
      sessions.push({
        tool: toolId,
        studentId: _getStudentId(),
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
        problems: problemCount,
        correct: correctCount,
        accuracy: problemCount > 0 ? correctCount / problemCount : 0,
        difficulty: difficulty,
        concepts: concepts || []
      });
      _saveSessions(sessions);

      // Schedule reviews for practiced concepts
      if (concepts && concepts.length > 0) {
        var acc = problemCount > 0 ? correctCount / problemCount : 0;
        concepts.forEach(function(c) {
          _scheduleReview(c, toolId, acc);
        });
      }
    },

    // Review queue
    getDueReviews: _getDueReviews,
    getReviewQueue: _getReviewQueue,

    // Adaptive engine
    createAdaptiveEngine: function(initialDiff) {
      return new AdaptiveEngine(initialDiff);
    },

    // Misconceptions
    logMisconception: _logMisconception,
    getMisconceptions: _getMisconceptions,

    // Process capture
    createProcessLogger: function(toolId) {
      return new ProcessLogger(toolId);
    },

    // Export
    exportAll: _exportAllData,
    exportCSV: _exportCSV,
    clearAll: _clearAllData,

    // Quick stats
    getToolHistory: function(toolId) {
      return _getSessions().filter(function(s) { return s.tool === toolId; });
    },
    getRecentActivity: function(days) {
      var cutoff = Date.now() - ((days || 7) * 86400000);
      return _getSessions().filter(function(s) { return (s.timestamp || 0) > cutoff; });
    },

    // Storage status
    isStorageAvailable: _canUseStorage
  };

})();
