/* ═══════════════════════════════════════════════════════════
   VINCULUM IDENTITY — User Profile & Personalization
   v1.0 — March 2026

   Provides local, browser-based student profiles layered on top
   of the anonymous student ID system (vinculum-data.js).
   NOT an authentication system — a personalization layer.

   Features:
   - Display name, avatar, grade level
   - Theme, accessibility, font preferences
   - Achievement tracking
   - Favorite tools bookmarking
   - Auto-applies preferences to DOM on init()
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ════════════════════════════════════════
  // 1. STORAGE HELPERS
  // ════════════════════════════════════════
  var _canUseStorage = true;
  var _memFallback = {};

  function _checkStorage() {
    if (_canUseStorage !== null) return _canUseStorage;
    try {
      var test = '__vinculum_test__';
      localStorage.setItem(test, '1');
      localStorage.removeItem(test);
      _canUseStorage = true;
    } catch(e) {
      _canUseStorage = false;
    }
    return _canUseStorage;
  }

  function _get(key) {
    if (_checkStorage()) {
      try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
    }
    return _memFallback[key] || null;
  }

  function _set(key, val) {
    if (_checkStorage()) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { _memFallback[key] = val; }
    } else {
      _memFallback[key] = val;
    }
  }


  // ════════════════════════════════════════
  // 2. BUILT-IN AVATAR SET (12 diverse avatars)
  // ════════════════════════════════════════
  var AVATARS = {
    'avatar-1': { name: 'Luna', emoji: '🌙', symbol: 'L' },
    'avatar-2': { name: 'Phoenix', emoji: '🔥', symbol: 'P' },
    'avatar-3': { name: 'Coral', emoji: '🪸', symbol: 'C' },
    'avatar-4': { name: 'Sage', emoji: '🌿', symbol: 'S' },
    'avatar-5': { name: 'Storm', emoji: '⚡', symbol: 'T' },
    'avatar-6': { name: 'Mirror', emoji: '✨', symbol: 'M' },
    'avatar-7': { name: 'Terra', emoji: '🌍', symbol: 'E' },
    'avatar-8': { name: 'Azure', emoji: '💙', symbol: 'A' },
    'avatar-9': { name: 'Nova', emoji: '⭐', symbol: 'N' },
    'avatar-10': { name: 'River', emoji: '🌊', symbol: 'R' },
    'avatar-11': { name: 'Beacon', emoji: '🏮', symbol: 'B' },
    'avatar-12': { name: 'Echo', emoji: '🎵', symbol: 'H' }
  };

  var DEFAULT_AVATAR = 'avatar-1';


  // ════════════════════════════════════════
  // 3. ACHIEVEMENT DEFINITIONS
  // ════════════════════════════════════════
  var ACHIEVEMENTS = {
    'first-tool': {
      id: 'first-tool',
      title: 'First Step',
      description: 'Completed your first tool session',
      icon: '🌱'
    },
    'streak-3': {
      id: 'streak-3',
      title: '3-Day Streak',
      description: 'Practiced 3 days in a row',
      icon: '🔥'
    },
    'streak-7': {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Practiced 7 days in a row',
      icon: '💪'
    },
    'streak-30': {
      id: 'streak-30',
      title: 'Month Master',
      description: 'Practiced 30 days in a row',
      icon: '👑'
    },
    'explorer-k': {
      id: 'explorer-k',
      title: 'K Explorer',
      description: 'Tried all tools in Kindergarten',
      icon: '🔭'
    },
    'explorer-1': {
      id: 'explorer-1',
      title: '1st Grade Explorer',
      description: 'Tried all tools in 1st Grade',
      icon: '🔭'
    },
    'explorer-2': {
      id: 'explorer-2',
      title: '2nd Grade Explorer',
      description: 'Tried all tools in 2nd Grade',
      icon: '🔭'
    },
    'explorer-3': {
      id: 'explorer-3',
      title: '3rd Grade Explorer',
      description: 'Tried all tools in 3rd Grade',
      icon: '🔭'
    },
    'explorer-4': {
      id: 'explorer-4',
      title: '4th Grade Explorer',
      description: 'Tried all tools in 4th Grade',
      icon: '🔭'
    },
    'explorer-5': {
      id: 'explorer-5',
      title: '5th Grade Explorer',
      description: 'Tried all tools in 5th Grade',
      icon: '🔭'
    },
    'master-strand': {
      id: 'master-strand',
      title: 'Strand Master',
      description: 'Achieved 85%+ accuracy in a learning strand',
      icon: '🎓'
    },
    'ten-sessions': {
      id: 'ten-sessions',
      title: 'Practitioner',
      description: 'Completed 10 learning sessions',
      icon: '📈'
    },
    'fifty-sessions': {
      id: 'fifty-sessions',
      title: 'Dedicated Scholar',
      description: 'Completed 50 learning sessions',
      icon: '📚'
    },
    'century': {
      id: 'century',
      title: 'Century Milestone',
      description: 'Completed 100 learning sessions',
      icon: '🏆'
    }
  };


  // ════════════════════════════════════════
  // 4. DEFAULT PROFILE FACTORY
  // ════════════════════════════════════════
  function _createDefaultProfile(studentId) {
    return {
      id: studentId,
      name: 'Explorer',
      avatar: DEFAULT_AVATAR,
      grade: 'K',
      createdAt: Date.now(),
      lastActive: Date.now(),
      preferences: {
        theme: 'default',
        fontSize: 'medium',
        reducedMotion: false,
        highContrast: false,
        dyslexiaFont: false,
        textToSpeech: true,
        language: 'en'
      },
      achievements: [],
      favoriteTools: []
    };
  }


  // ════════════════════════════════════════
  // 5. INTERNAL STATE & ACCESSOR
  // ════════════════════════════════════════
  var _profile = null;
  var _studentId = null;

  function _getStudentId() {
    if (_studentId) return _studentId;
    // Try to get from VinculumData if available
    if (window.VinculumData && window.VinculumData.getStudentId) {
      _studentId = window.VinculumData.getStudentId();
    } else {
      // Fallback: check localStorage directly
      _studentId = _get('vinculum-student-id');
      if (!_studentId) {
        _studentId = 'stu-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 6);
        _set('vinculum-student-id', _studentId);
      }
    }
    return _studentId;
  }

  function _loadProfile() {
    if (_profile) return _profile;
    var stored = _get('vinculum-identity');
    if (stored && typeof stored === 'object') {
      _profile = stored;
    } else {
      _profile = _createDefaultProfile(_getStudentId());
    }
    _profile.lastActive = Date.now();
    return _profile;
  }

  function _saveProfile() {
    if (!_profile) return;
    _profile.lastActive = Date.now();
    _set('vinculum-identity', _profile);
  }


  // ════════════════════════════════════════
  // 6. PREFERENCE APPLICATION TO DOM
  // ════════════════════════════════════════
  function _applyPreferences(prefs) {
    if (!prefs) prefs = _profile.preferences;

    // Set theme via data-theme attribute
    if (prefs.theme) {
      document.documentElement.setAttribute('data-theme', prefs.theme);
    }

    // Set font size class on body
    var fontSizeClass = 'vinculum-font-' + (prefs.fontSize || 'medium');
    document.body.classList.remove('vinculum-font-small', 'vinculum-font-medium', 'vinculum-font-large');
    document.body.classList.add(fontSizeClass);

    // Apply reduced motion
    if (prefs.reducedMotion) {
      document.documentElement.style.setProperty('--motion', 'none');
      document.body.classList.add('reduced-motion');
    } else {
      document.documentElement.style.setProperty('--motion', 'all');
      document.body.classList.remove('reduced-motion');
    }

    // Apply high contrast
    if (prefs.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Load dyslexia-friendly font if enabled
    if (prefs.dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
      // Inject OpenDyslexic font if not already present
      if (!document.getElementById('vinculum-dyslexic-font')) {
        var style = document.createElement('style');
        style.id = 'vinculum-dyslexic-font';
        style.textContent = '@import url("https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap");' +
          '.dyslexia-font, .dyslexia-font * { font-family: "OpenDyslexic", sans-serif !important; }';
        document.head.appendChild(style);
      }
    } else {
      document.body.classList.remove('dyslexia-font');
    }

    // Language preference (future i18n support)
    if (prefs.language && prefs.language !== 'en') {
      document.documentElement.setAttribute('lang', prefs.language);
    }
  }


  // ════════════════════════════════════════
  // 7. ACHIEVEMENT TRACKING
  // ════════════════════════════════════════
  function _addAchievement(achievementId) {
    if (!_profile) _loadProfile();
    var def = ACHIEVEMENTS[achievementId];
    if (!def) return false;

    // Check if already earned
    var already = _profile.achievements.find(function(a) { return a.id === achievementId; });
    if (already) return false;

    _profile.achievements.push({
      id: achievementId,
      title: def.title,
      icon: def.icon,
      earnedAt: Date.now()
    });
    _saveProfile();
    return true;
  }

  function _hasAchievement(achievementId) {
    if (!_profile) _loadProfile();
    return _profile.achievements.some(function(a) { return a.id === achievementId; });
  }


  // ════════════════════════════════════════
  // 8. STREAK CALCULATION
  // ════════════════════════════════════════
  function _calculateCurrentStreak() {
    if (!window.VinculumData || !window.VinculumData.getRecentActivity) {
      return 0;
    }

    var sessions = window.VinculumData.getRecentActivity(90);
    if (sessions.length === 0) return 0;

    // Group by date (ISO date string)
    var dateMap = {};
    sessions.forEach(function(s) {
      var date = s.date || (new Date(s.timestamp || 0)).toISOString().split('T')[0];
      if (date) dateMap[date] = true;
    });

    var dates = Object.keys(dateMap).sort().reverse();
    if (dates.length === 0) return 0;

    // Check consecutive days from today backwards
    var today = new Date();
    var streak = 0;
    var checkDate = new Date(today);

    while (true) {
      var dateStr = checkDate.toISOString().split('T')[0];
      if (dateMap[dateStr]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }


  // ════════════════════════════════════════
  // 9. AUTO-ACHIEVEMENT TRIGGERS
  // ════════════════════════════════════════
  function _checkAndAwardStreakAchievements() {
    var streak = _calculateCurrentStreak();
    if (streak >= 30 && !_hasAchievement('streak-30')) {
      _addAchievement('streak-30');
    }
    if (streak >= 7 && !_hasAchievement('streak-7')) {
      _addAchievement('streak-7');
    }
    if (streak >= 3 && !_hasAchievement('streak-3')) {
      _addAchievement('streak-3');
    }
  }

  function _checkAndAwardSessionAchievements() {
    if (!window.VinculumData || !window.VinculumData.getRecentActivity) {
      return;
    }

    var sessions = window.VinculumData.getRecentActivity(365);
    var count = sessions.length;

    if (count >= 100 && !_hasAchievement('century')) {
      _addAchievement('century');
    }
    if (count >= 50 && !_hasAchievement('fifty-sessions')) {
      _addAchievement('fifty-sessions');
    }
    if (count >= 10 && !_hasAchievement('ten-sessions')) {
      _addAchievement('ten-sessions');
    }
    if (count >= 1 && !_hasAchievement('first-tool')) {
      _addAchievement('first-tool');
    }
  }


  // ════════════════════════════════════════
  // 10. PUBLIC API
  // ════════════════════════════════════════
  window.VinculumIdentity = {
    /**
     * Initialize profile from localStorage and apply preferences to DOM.
     * Safe to call multiple times.
     */
    init: function() {
      _loadProfile();
      _checkAndAwardSessionAchievements();
      _checkAndAwardStreakAchievements();
      _applyPreferences();
      return _profile;
    },

    /**
     * Get full profile object.
     * Calls init() first if needed.
     */
    getProfile: function() {
      if (!_profile) this.init();
      return _profile;
    },

    /**
     * Set student's display name.
     */
    setName: function(name) {
      if (!_profile) this.init();
      if (typeof name === 'string') {
        _profile.name = name.trim() || 'Explorer';
        _saveProfile();
      }
      return _profile.name;
    },

    /**
     * Set avatar from built-in set.
     * avatarId should be 'avatar-1' through 'avatar-12'.
     */
    setAvatar: function(avatarId) {
      if (!_profile) this.init();
      if (AVATARS[avatarId]) {
        _profile.avatar = avatarId;
        _saveProfile();
      }
      return _profile.avatar;
    },

    /**
     * Get avatar metadata (name, emoji, symbol).
     */
    getAvatar: function(avatarId) {
      avatarId = avatarId || (_profile ? _profile.avatar : DEFAULT_AVATAR);
      return AVATARS[avatarId] || AVATARS[DEFAULT_AVATAR];
    },

    /**
     * Get all available avatars.
     */
    getAvailableAvatars: function() {
      return AVATARS;
    },

    /**
     * Set student's current grade level.
     */
    setGrade: function(grade) {
      if (!_profile) this.init();
      if (typeof grade === 'string') {
        _profile.grade = grade.trim() || 'K';
        _saveProfile();
      }
      return _profile.grade;
    },

    /**
     * Set full preferences object.
     * Merges with existing preferences, applies to DOM.
     */
    setPreferences: function(prefs) {
      if (!_profile) this.init();
      if (typeof prefs === 'object' && prefs !== null) {
        Object.keys(prefs).forEach(function(key) {
          _profile.preferences[key] = prefs[key];
        });
        _applyPreferences();
        _saveProfile();
      }
      return _profile.preferences;
    },

    /**
     * Get current preferences object.
     */
    getPreferences: function() {
      if (!_profile) this.init();
      return _profile.preferences;
    },

    /**
     * Get accessibility settings specifically.
     */
    getAccessibility: function() {
      if (!_profile) this.init();
      return {
        reducedMotion: _profile.preferences.reducedMotion,
        highContrast: _profile.preferences.highContrast,
        dyslexiaFont: _profile.preferences.dyslexiaFont,
        textToSpeech: _profile.preferences.textToSpeech,
        fontSize: _profile.preferences.fontSize
      };
    },

    /**
     * Set a single preference and apply to DOM.
     */
    setPreference: function(key, value) {
      if (!_profile) this.init();
      _profile.preferences[key] = value;
      _applyPreferences();
      _saveProfile();
      return value;
    },

    /**
     * Add a favorite tool.
     */
    addFavoriteTool: function(toolId) {
      if (!_profile) this.init();
      if (toolId && _profile.favoriteTools.indexOf(toolId) === -1) {
        _profile.favoriteTools.push(toolId);
        _saveProfile();
        return true;
      }
      return false;
    },

    /**
     * Remove a favorite tool.
     */
    removeFavoriteTool: function(toolId) {
      if (!_profile) this.init();
      var idx = _profile.favoriteTools.indexOf(toolId);
      if (idx > -1) {
        _profile.favoriteTools.splice(idx, 1);
        _saveProfile();
        return true;
      }
      return false;
    },

    /**
     * Get list of favorite tools.
     */
    getFavoriteTools: function() {
      if (!_profile) this.init();
      return _profile.favoriteTools.slice();
    },

    /**
     * Add an achievement.
     * Returns true if newly earned, false if already had it.
     */
    addAchievement: function(achievementId) {
      if (!_profile) this.init();
      return _addAchievement(achievementId);
    },

    /**
     * Check if student has an achievement.
     */
    hasAchievement: function(achievementId) {
      if (!_profile) this.init();
      return _hasAchievement(achievementId);
    },

    /**
     * Get all earned achievements.
     */
    getAchievements: function() {
      if (!_profile) this.init();
      return _profile.achievements.slice();
    },

    /**
     * Get achievement definition by ID.
     */
    getAchievementDef: function(achievementId) {
      return ACHIEVEMENTS[achievementId] || null;
    },

    /**
     * Get all achievement definitions.
     */
    getAchievementDefinitions: function() {
      return ACHIEVEMENTS;
    },

    /**
     * Calculate current practice streak in days.
     */
    getCurrentStreak: function() {
      return _calculateCurrentStreak();
    },

    /**
     * Get session count from VinculumData.
     */
    getSessionCount: function() {
      if (!window.VinculumData || !window.VinculumData.getRecentActivity) {
        return 0;
      }
      return window.VinculumData.getRecentActivity(365).length;
    },

    /**
     * Clear identity data (dev/testing only).
     */
    clear: function() {
      _profile = null;
      _studentId = null;
      if (_checkStorage()) {
        localStorage.removeItem('vinculum-identity');
      }
    }
  };

})();
