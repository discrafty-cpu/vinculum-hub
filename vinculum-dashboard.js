/* ═══════════════════════════════════════════════════════════
   VINCULUM DASHBOARD — Fluency Analytics & Progress Tracking
   v1.0 — March 2026

   Read-only aggregation module that computes dashboard metrics
   from localStorage data set by vinculum-data.js.

   Public API:
   - VinculumDashboard.getStudentSummary()
   - VinculumDashboard.getToolProgress(toolId)
   - VinculumDashboard.getGradeProgress(grade)
   - VinculumDashboard.getStrandProgress(grade, strand)
   - VinculumDashboard.getRecommendations()
   - VinculumDashboard.getMisconceptionLog()
   - VinculumDashboard.getStreakData()
   - VinculumDashboard.exportData()
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ════════════════════════════════════════
  // CURRICULUM MAP (Grade → Strands → Tools)
  // ════════════════════════════════════════

  var CURRICULUM = {
    'K': {
      'Counting & Cardinality': [
        'counting-120', 'compare-numbers', 'subitize-patterns'
      ],
      'Operations & Algebraic Thinking': [
        'addition-number-line', 'counter-builder', 'fact-family-houses'
      ],
      'Geometry': [
        'shape-attributes', 'composite-shapes', 'pattern-blocks'
      ],
      'Measurement': [
        'length-comparisons', 'compare-sizes', 'weight-exploration'
      ]
    },
    '1': {
      'Number & Operations (Base Ten)': [
        'place-value-tens-ones', 'two-digit-operations', 'bundling-sticks'
      ],
      'Operations & Algebraic Thinking': [
        'add-sub-fluency', 'equation-balance', 'fact-family-houses'
      ],
      'Geometry': [
        'shape-attributes', 'composite-shapes', 'equal-parts'
      ],
      'Measurement & Data': [
        'length-comparisons', 'clock-reader', 'data-graphs'
      ]
    },
    '2': {
      'Number & Operations (Base Ten)': [
        'two-digit-operations', 'bundling-sticks', 'place-value-charts'
      ],
      'Operations & Algebraic Thinking': [
        'add-sub-fluency', 'word-problem-models', 'arrays-groups'
      ],
      'Geometry': [
        'shape-attributes', 'equal-parts', 'shape-fractions'
      ],
      'Measurement & Data': [
        'length-comparisons', 'clock-reader', 'data-graphs'
      ]
    },
    '3': {
      'Number & Operations (Base Ten)': [
        'three-digit-operations', 'place-value-charts', 'rounding-numbers'
      ],
      'Operations & Algebraic Thinking': [
        'multiplication-arrays', 'division-groups', 'fact-fluency-3'
      ],
      'Fractions': [
        'fraction-shapes', 'equal-parts', 'fraction-number-line'
      ],
      'Measurement & Data': [
        'measurement-conversions', 'clock-reader', 'data-graphs'
      ]
    },
    '4': {
      'Number & Operations (Base Ten)': [
        'multi-digit-operations', 'place-value-strategies', 'rounding-numbers'
      ],
      'Operations & Algebraic Thinking': [
        'multiplication-strategies', 'division-strategies', 'fact-fluency-4'
      ],
      'Fractions': [
        'fraction-equivalence', 'fraction-comparisons', 'fraction-operations'
      ],
      'Measurement & Data': [
        'measurement-conversions', 'angle-measurement', 'data-analysis'
      ]
    },
    '5': {
      'Number & Operations (Base Ten)': [
        'multi-digit-fluency', 'decimal-place-value', 'decimal-operations'
      ],
      'Operations & Algebraic Thinking': [
        'multiplication-fluency', 'division-fluency', 'expression-evaluation'
      ],
      'Fractions': [
        'fraction-multiplication', 'fraction-division', 'mixed-number-operations'
      ],
      'Measurement & Data': [
        'measurement-conversions', 'volume-measurement', 'data-analysis'
      ]
    }
  };

  // ════════════════════════════════════════
  // STORAGE HELPERS
  // ════════════════════════════════════════

  function _getSessions() {
    try { return JSON.parse(localStorage.getItem('vinculum-sessions')) || []; }
    catch(e) { return []; }
  }

  function _getMisconceptions() {
    try { return JSON.parse(localStorage.getItem('vinculum-misconceptions')) || []; }
    catch(e) { return []; }
  }

  function _getReviewQueue() {
    try { return JSON.parse(localStorage.getItem('vinculum-review-queue')) || []; }
    catch(e) { return []; }
  }

  function _getStudentId() {
    try { return localStorage.getItem('vinculum-student-id') || null; }
    catch(e) { return null; }
  }

  // ════════════════════════════════════════
  // 1. STUDENT SUMMARY
  // ════════════════════════════════════════

  function _getStudentSummary() {
    var sessions = _getSessions();
    var now = Date.now();
    var dayMs = 86400000;

    // Total sessions
    var totalSessions = sessions.length;

    // Tools used
    var toolsUsed = {};
    sessions.forEach(function(s) {
      toolsUsed[s.tool] = true;
    });
    var toolCount = Object.keys(toolsUsed).length;

    // Overall accuracy
    var totalCorrect = 0, totalProblems = 0;
    sessions.forEach(function(s) {
      if (s.correct !== undefined && s.problems !== undefined) {
        totalCorrect += s.correct;
        totalProblems += s.problems;
      }
    });
    var avgAccuracy = totalProblems > 0 ? (totalCorrect / totalProblems) : 0;

    // Daily practice streak
    var streak = _calculateStreak();

    // Recent activity (last 7 days)
    var weekAgo = now - (7 * dayMs);
    var recentSessions = sessions.filter(function(s) {
      return (s.timestamp || 0) > weekAgo;
    });

    // Mastery percentage (sessions with 80%+ accuracy)
    var masterySessions = sessions.filter(function(s) {
      if (s.correct !== undefined && s.problems !== undefined) {
        return (s.correct / s.problems) >= 0.8;
      }
      return false;
    });
    var masteryPct = totalSessions > 0 ? (masterySessions.length / totalSessions) * 100 : 0;

    return {
      studentId: _getStudentId(),
      totalSessions: totalSessions,
      toolsUsed: toolCount,
      averageAccuracy: Math.round(avgAccuracy * 100) / 100,
      masteryPercentage: Math.round(masteryPct),
      recentActivityDays: recentSessions.length,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      lastActivityDate: sessions.length > 0 ?
        new Date(sessions[sessions.length - 1].timestamp || sessions[sessions.length - 1].date).toISOString().split('T')[0]
        : null
    };
  }

  // ════════════════════════════════════════
  // 2. TOOL PROGRESS
  // ════════════════════════════════════════

  function _getToolProgress(toolId) {
    var sessions = _getSessions();
    var toolSessions = sessions.filter(function(s) { return s.tool === toolId; });

    if (toolSessions.length === 0) {
      return {
        toolId: toolId,
        sessionCount: 0,
        accuracy: 0,
        masteryLevel: 'not-started',
        lastPlayed: null,
        difficultyLevels: [],
        misconceptionCount: 0
      };
    }

    // Calculate accuracy
    var totalCorrect = 0, totalProblems = 0;
    toolSessions.forEach(function(s) {
      if (s.correct !== undefined && s.problems !== undefined) {
        totalCorrect += s.correct;
        totalProblems += s.problems;
      }
    });
    var accuracy = totalProblems > 0 ? (totalCorrect / totalProblems) : 0;

    // Determine mastery level
    var masteryLevel = 'not-started';
    if (accuracy >= 0.85) masteryLevel = 'mastered';
    else if (accuracy >= 0.70) masteryLevel = 'proficient';
    else if (accuracy >= 0.50) masteryLevel = 'developing';
    else if (toolSessions.length > 0) masteryLevel = 'emerging';

    // Last played date
    var lastSession = toolSessions[toolSessions.length - 1];
    var lastPlayed = new Date(lastSession.timestamp || lastSession.date).toISOString().split('T')[0];

    // Difficulty levels attempted
    var difficulties = {};
    toolSessions.forEach(function(s) {
      if (s.difficulty) difficulties[s.difficulty] = true;
    });

    // Count misconceptions
    var misconceptions = _getMisconceptions().filter(function(m) {
      return m.tool === toolId;
    });

    // Average response time if available
    var avgResponseTime = 0;
    var responseTimeCount = 0;
    toolSessions.forEach(function(s) {
      if (s.profile && s.profile.avgResponseTime) {
        avgResponseTime += s.profile.avgResponseTime;
        responseTimeCount++;
      }
    });
    if (responseTimeCount > 0) {
      avgResponseTime = Math.round(avgResponseTime / responseTimeCount);
    }

    return {
      toolId: toolId,
      sessionCount: toolSessions.length,
      accuracy: Math.round(accuracy * 100) / 100,
      masteryLevel: masteryLevel,
      lastPlayed: lastPlayed,
      difficultyLevels: Object.keys(difficulties),
      misconceptionCount: misconceptions.length,
      avgResponseTimeMs: avgResponseTime
    };
  }

  // ════════════════════════════════════════
  // 3. GRADE PROGRESS
  // ════════════════════════════════════════

  function _getGradeProgress(grade) {
    var gradeStr = String(grade);
    var strands = CURRICULUM[gradeStr] || {};
    var sessions = _getSessions();
    var strandProgress = {};

    Object.keys(strands).forEach(function(strandName) {
      var tools = strands[strandName];
      var toolData = {};

      tools.forEach(function(toolId) {
        var toolProgress = _getToolProgress(toolId);
        toolData[toolId] = {
          sessionCount: toolProgress.sessionCount,
          accuracy: toolProgress.accuracy,
          masteryLevel: toolProgress.masteryLevel
        };
      });

      // Calculate strand coverage
      var completedTools = tools.filter(function(t) {
        var p = _getToolProgress(t);
        return p.masteryLevel === 'mastered' || p.masteryLevel === 'proficient';
      }).length;

      var proficientTools = tools.filter(function(t) {
        var p = _getToolProgress(t);
        return p.masteryLevel === 'mastered';
      }).length;

      strandProgress[strandName] = {
        toolsCompleted: completedTools,
        totalTools: tools.length,
        coverage: Math.round((completedTools / tools.length) * 100),
        masteryTools: proficientTools,
        tools: toolData
      };
    });

    // Overall grade coverage
    var allTools = [];
    Object.keys(strands).forEach(function(s) {
      allTools = allTools.concat(strands[s]);
    });
    var completedInGrade = allTools.filter(function(t) {
      var p = _getToolProgress(t);
      return p.masteryLevel === 'mastered' || p.masteryLevel === 'proficient';
    }).length;

    return {
      grade: gradeStr,
      strands: strandProgress,
      overallCoverage: Math.round((completedInGrade / allTools.length) * 100),
      totalTools: allTools.length,
      completedTools: completedInGrade
    };
  }

  // ════════════════════════════════════════
  // 4. STRAND PROGRESS
  // ════════════════════════════════════════

  function _getStrandProgress(grade, strandName) {
    var gradeStr = String(grade);
    var gradeData = CURRICULUM[gradeStr] || {};
    var tools = gradeData[strandName] || [];

    var toolProgress = {};
    tools.forEach(function(toolId) {
      var progress = _getToolProgress(toolId);
      toolProgress[toolId] = progress;
    });

    var completed = tools.filter(function(t) {
      var p = toolProgress[t];
      return p.masteryLevel === 'mastered' || p.masteryLevel === 'proficient';
    }).length;

    return {
      grade: gradeStr,
      strand: strandName,
      tools: toolProgress,
      coverage: Math.round((completed / tools.length) * 100),
      completedTools: completed,
      totalTools: tools.length
    };
  }

  // ════════════════════════════════════════
  // 5. RECOMMENDATIONS
  // ════════════════════════════════════════

  function _getRecommendations() {
    var recs = [];
    var review = _getReviewQueue();
    var now = Date.now();

    // 1. Items due for spaced retrieval
    var dueItems = review.filter(function(r) { return r.due <= now; });
    dueItems.slice(0, 3).forEach(function(item) {
      recs.push({
        type: 'spaced-retrieval',
        concept: item.concept,
        sourceTool: item.sourceTool,
        reason: 'Time to review this concept',
        priority: 'high'
      });
    });

    // 2. Tools with low accuracy (< 60%) that have multiple sessions
    var sessions = _getSessions();
    var toolMetrics = {};
    sessions.forEach(function(s) {
      if (!toolMetrics[s.tool]) {
        toolMetrics[s.tool] = { correct: 0, total: 0, sessionCount: 0 };
      }
      toolMetrics[s.tool].sessionCount++;
      if (s.correct !== undefined && s.problems !== undefined) {
        toolMetrics[s.tool].correct += s.correct;
        toolMetrics[s.tool].total += s.problems;
      }
    });

    Object.keys(toolMetrics).forEach(function(toolId) {
      var metrics = toolMetrics[toolId];
      if (metrics.sessionCount > 1 && metrics.total > 0) {
        var acc = metrics.correct / metrics.total;
        if (acc < 0.60) {
          recs.push({
            type: 'remediation',
            tool: toolId,
            currentAccuracy: acc,
            reason: 'Low accuracy - needs more practice',
            priority: 'high'
          });
        }
      }
    });

    // 3. Next tools to explore based on mastery gaps
    var grades = ['K', '1', '2', '3', '4', '5'];
    var allRecs = [];

    grades.forEach(function(g) {
      var gradeProgress = _getGradeProgress(g);
      Object.keys(gradeProgress.strands).forEach(function(strandName) {
        var strand = gradeProgress.strands[strandName];
        if (strand.coverage < 100) {
          // Find first incomplete tool
          var tools = CURRICULUM[g][strandName] || [];
          tools.forEach(function(toolId) {
            var p = _getToolProgress(toolId);
            if (p.masteryLevel === 'not-started' || p.masteryLevel === 'emerging') {
              allRecs.push({
                type: 'next-tool',
                tool: toolId,
                grade: g,
                strand: strandName,
                masteryLevel: p.masteryLevel,
                priority: 'medium'
              });
            }
          });
        }
      });
    });

    // Add up to 2 next-tool recommendations
    allRecs.slice(0, 2).forEach(function(rec) {
      recs.push(rec);
    });

    return recs;
  }

  // ════════════════════════════════════════
  // 6. MISCONCEPTION LOG
  // ════════════════════════════════════════

  function _getMisconceptionLog() {
    var misconceptions = _getMisconceptions();
    var grouped = {};

    misconceptions.forEach(function(m) {
      if (!grouped[m.tool]) {
        grouped[m.tool] = [];
      }
      grouped[m.tool].push({
        id: m.id,
        description: m.description,
        studentAnswer: m.studentAnswer,
        correctAnswer: m.correctAnswer,
        timestamp: m.timestamp,
        date: new Date(m.timestamp).toISOString().split('T')[0]
      });
    });

    // Sort by frequency
    var summary = [];
    Object.keys(grouped).forEach(function(toolId) {
      var entries = grouped[toolId];
      var byId = {};
      entries.forEach(function(e) {
        if (!byId[e.id]) byId[e.id] = { count: 0, description: e.description, entries: [] };
        byId[e.id].count++;
        byId[e.id].entries.push(e);
      });

      Object.keys(byId).forEach(function(id) {
        summary.push({
          tool: toolId,
          misconceptionId: id,
          description: byId[id].description,
          frequency: byId[id].count,
          recentExamples: byId[id].entries.slice(-3)
        });
      });
    });

    return summary.sort(function(a, b) { return b.frequency - a.frequency; });
  }

  // ════════════════════════════════════════
  // 7. STREAK DATA
  // ════════════════════════════════════════

  function _calculateStreak() {
    var sessions = _getSessions();
    var now = Date.now();
    var dayMs = 86400000;

    // Group by date
    var byDate = {};
    sessions.forEach(function(s) {
      var dateStr = s.date || new Date(s.timestamp).toISOString().split('T')[0];
      byDate[dateStr] = true;
    });

    var dates = Object.keys(byDate).sort();
    if (dates.length === 0) {
      return { current: 0, longest: 0, lastDate: null };
    }

    // Calculate current streak
    var current = 0;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayStr = today.toISOString().split('T')[0];

    var checkDate = new Date(today);
    for (var i = 0; i < 365; i++) {
      var dateStr = checkDate.toISOString().split('T')[0];
      if (byDate[dateStr]) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === todayStr) {
        // Haven't practiced today yet, but keep checking yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Calculate longest streak
    var longest = 0;
    var streakStart = new Date(dates[0]);
    var streakEnd = new Date(dates[0]);
    var currentStreakLen = 1;

    for (var i = 1; i < dates.length; i++) {
      var prevDate = new Date(dates[i - 1]);
      var currDate = new Date(dates[i]);
      var diffDays = Math.floor((currDate - prevDate) / dayMs);

      if (diffDays === 1) {
        currentStreakLen++;
      } else {
        if (currentStreakLen > longest) {
          longest = currentStreakLen;
          streakStart = new Date(dates[i - currentStreakLen]);
          streakEnd = currDate;
        }
        currentStreakLen = 1;
      }
    }
    if (currentStreakLen > longest) longest = currentStreakLen;

    return {
      current: current,
      longest: longest,
      lastDate: dates.length > 0 ? dates[dates.length - 1] : null
    };
  }

  function _getStreakData() {
    var sessions = _getSessions();
    var now = Date.now();
    var dayMs = 86400000;

    // Build activity heatmap for last 365 days
    var heatmap = {};
    var startDate = new Date(now - (365 * dayMs));

    // Initialize all dates as 0
    for (var i = 0; i < 365; i++) {
      var d = new Date(startDate);
      d.setDate(d.getDate() + i);
      var dateStr = d.toISOString().split('T')[0];
      heatmap[dateStr] = 0;
    }

    // Count sessions per date
    sessions.forEach(function(s) {
      var dateStr = s.date || new Date(s.timestamp).toISOString().split('T')[0];
      if (heatmap[dateStr] !== undefined) {
        heatmap[dateStr]++;
      }
    });

    var streak = _calculateStreak();

    return {
      currentStreak: streak.current,
      longestStreak: streak.longest,
      lastActivityDate: streak.lastDate,
      heatmap: heatmap
    };
  }

  // ════════════════════════════════════════
  // 8. DATA EXPORT
  // ════════════════════════════════════════

  function _exportData() {
    var summary = _getStudentSummary();
    var misconceptions = _getMisconceptionLog();
    var streak = _getStreakData();

    // Build tool list with progress
    var allTools = {};
    var grades = ['K', '1', '2', '3', '4', '5'];
    grades.forEach(function(g) {
      var strands = CURRICULUM[g] || {};
      Object.keys(strands).forEach(function(strand) {
        var tools = strands[strand] || [];
        tools.forEach(function(toolId) {
          if (!allTools[toolId]) {
            allTools[toolId] = _getToolProgress(toolId);
          }
        });
      });
    });

    return {
      exportDate: new Date().toISOString(),
      studentSummary: summary,
      toolProgress: allTools,
      misconceptions: misconceptions,
      streakData: streak,
      sessionCount: _getSessions().length
    };
  }

  // ════════════════════════════════════════
  // PUBLIC API
  // ════════════════════════════════════════

  window.VinculumDashboard = {
    getStudentSummary: _getStudentSummary,
    getToolProgress: _getToolProgress,
    getGradeProgress: _getGradeProgress,
    getStrandProgress: _getStrandProgress,
    getRecommendations: _getRecommendations,
    getMisconceptionLog: _getMisconceptionLog,
    getStreakData: _getStreakData,
    exportData: _exportData
  };

})();
