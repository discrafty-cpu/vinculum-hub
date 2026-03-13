/* ═══════════════════════════════════════════════════════════
   VINCULUM CORE JS — Shared Tool Foundation
   v1.0 — March 2026

   Loaded by every tool. Provides:
   - Theme loading from localStorage
   - URL parameter parsing (?mode, ?diff, ?embed, ?teacher)
   - Accessibility (Read-to-Me via Web Speech API)
   - Feedback system
   - Keyboard shortcuts
   - Teacher annotation panel
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ════════════════════════════════════════
  // 1. URL PARAMETERS
  // ════════════════════════════════════════
  var params = new URLSearchParams(window.location.search);

  window.VinculumParams = {
    mode:    params.get('mode')    || null,   // explore|practice|play
    diff:    params.get('diff')    || null,   // emergent|proficient|advanced
    embed:   params.get('embed')   === '1',   // hide header for LMS
    teacher: params.get('teacher') === '1',   // show teacher panel
    raw: params
  };

  // ════════════════════════════════════════
  // 2. THEME LOADER
  // ════════════════════════════════════════
  try {
    var savedTheme = localStorage.getItem('vinculum-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // ════════════════════════════════════════
  // 3. EMBED MODE
  // ════════════════════════════════════════
  if (VinculumParams.embed) {
    document.documentElement.classList.add('vinculum-embed');
  }

  // ════════════════════════════════════════
  // 4. ACCESSIBILITY — Read-to-Me
  // ════════════════════════════════════════
  window.VinculumA11y = {
    speaking: false,
    synth: window.speechSynthesis || null,

    readAloud: function(text) {
      if (!this.synth) { alert('Your browser does not support text-to-speech.'); return; }
      this.stop();
      var utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.85;
      utter.pitch = 1.1;
      utter.lang = 'en-US';
      var self = this;
      utter.onstart = function(){ self.speaking = true; self._updateBtns(); };
      utter.onend = function(){ self.speaking = false; self._updateBtns(); };
      utter.onerror = function(){ self.speaking = false; self._updateBtns(); };
      this.synth.speak(utter);
    },

    stop: function() {
      if (this.synth) this.synth.cancel();
      this.speaking = false;
      this._updateBtns();
    },

    toggle: function(text) {
      if (this.speaking) { this.stop(); } else { this.readAloud(text); }
    },

    readPage: function() {
      var el = document.querySelector('.workspace') ||
               document.querySelector('.main-area') ||
               document.querySelector('[role="main"]') ||
               document.querySelector('main') ||
               document.body;
      var text = (el.innerText || el.textContent || '').replace(/\s+/g,' ').trim();
      if (text.length > 2000) text = text.substring(0, 2000);
      this.toggle(text);
    },

    readElement: function(selector) {
      var el = document.querySelector(selector);
      if (!el) return;
      this.toggle((el.innerText || el.textContent || '').replace(/\s+/g,' ').trim());
    },

    _updateBtns: function() {
      var btns = document.querySelectorAll('.vinculum-rtm-btn');
      for (var i = 0; i < btns.length; i++) {
        var label = btns[i].querySelector('.rtm-label');
        if (this.speaking) {
          btns[i].classList.add('speaking');
          if (label) label.textContent = 'Stop';
        } else {
          btns[i].classList.remove('speaking');
          if (label) label.textContent = 'Read to Me';
        }
      }
    },

    announce: function(msg) {
      var el = document.getElementById('vinculum-live-region');
      if (!el) {
        el = document.createElement('div');
        el.id = 'vinculum-live-region';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.className = 'sr-only';
        document.body.appendChild(el);
      }
      el.textContent = '';
      setTimeout(function(){ el.textContent = msg; }, 50);
    }
  };


  // ════════════════════════════════════════
  // 5. FEEDBACK SYSTEM
  // ════════════════════════════════════════
  window.VinculumFeedback = {
    _el: null,

    _getEl: function() {
      if (this._el) return this._el;
      // Look for existing feedback element
      this._el = document.querySelector('.vinculum-feedback') ||
                 document.querySelector('.feedback');
      if (!this._el) {
        // Create one
        this._el = document.createElement('div');
        this._el.className = 'vinculum-feedback';
        document.body.appendChild(this._el);
      }
      return this._el;
    },

    show: function(message, type, duration) {
      var el = this._getEl();
      el.textContent = message;
      el.className = 'vinculum-feedback show ' + (type || 'correct');
      VinculumA11y.announce(message);
      var d = duration || 1500;
      setTimeout(function() {
        el.classList.remove('show');
      }, d);
    },

    correct: function(message) { this.show(message || 'Correct!', 'correct'); },
    incorrect: function(message) { this.show(message || 'Try again!', 'incorrect'); }
  };


  // ════════════════════════════════════════
  // 6. TEACHER MODE
  // ════════════════════════════════════════
  if (VinculumParams.teacher) {
    document.addEventListener('DOMContentLoaded', function() {
      // Create teacher panel
      var panel = document.createElement('div');
      panel.id = 'vinculum-teacher-panel';
      panel.style.cssText = 'position:fixed;bottom:0;right:0;width:340px;max-height:50vh;' +
        'background:var(--bg2);border:1px solid var(--border);border-radius:12px 0 0 0;' +
        'padding:16px;overflow-y:auto;z-index:999;font-family:Inter,sans-serif;' +
        'box-shadow:0 -4px 24px rgba(0,0,0,0.3);';
      panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--cyan);">Teacher Notes</span>' +
        '<button onclick="this.parentElement.parentElement.style.display=\'none\'" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;">✕</button>' +
        '</div>' +
        '<div id="vinculum-teacher-content" style="font-size:13px;color:var(--text2);line-height:1.6;">' +
        '<p style="color:var(--muted);font-style:italic;">Teacher notes will appear here based on the current activity.</p>' +
        '</div>';
      document.body.appendChild(panel);
    });
  }

  // Helper for tools to set teacher content
  window.VinculumTeacher = {
    setNotes: function(html) {
      var el = document.getElementById('vinculum-teacher-content');
      if (el) el.innerHTML = html;
    },
    setMisconceptions: function(items) {
      var html = '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--yellow);margin-bottom:8px;">Common Misconceptions</div>';
      html += '<ul style="padding-left:16px;margin:0;">';
      items.forEach(function(item) { html += '<li style="margin-bottom:6px;">' + item + '</li>'; });
      html += '</ul>';
      this.setNotes(html);
    }
  };


  // ════════════════════════════════════════
  // 7. KEYBOARD SHORTCUTS
  // ════════════════════════════════════════
  document.addEventListener('keydown', function(e) {
    // Alt+R = Read to Me
    if (e.altKey && e.key === 'r') {
      e.preventDefault();
      VinculumA11y.readPage();
    }
    // Alt+H = Go to Hub
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      var hubLink = document.querySelector('.vinculum-back-btn') ||
                    document.querySelector('.back-btn') ||
                    document.querySelector('a[href*="Hub"]');
      if (hubLink) window.location.href = hubLink.href;
    }
  });


  // ════════════════════════════════════════
  // 8. AUTO-APPLY URL PARAMS TO STATE
  // ════════════════════════════════════════
  // Tools can opt in by calling VinculumInit.applyParams(stateObject)
  window.VinculumInit = {
    /**
     * Apply URL params to a tool's state object.
     * Call this after defining your state but before first render.
     *
     * @param {Object} state - Tool's state object
     * @param {Object} callbacks - Optional: { setMode, setDiff }
     */
    applyParams: function(state, callbacks) {
      callbacks = callbacks || {};
      if (VinculumParams.mode && state.mode !== undefined) {
        state.mode = VinculumParams.mode;
        if (callbacks.setMode) {
          // Defer so DOM is ready
          setTimeout(function() { callbacks.setMode(VinculumParams.mode); }, 100);
        }
      }
      if (VinculumParams.diff) {
        // Common property names for difficulty
        var diffKeys = ['diff', 'difficulty', 'level', 'tier'];
        for (var i = 0; i < diffKeys.length; i++) {
          if (state[diffKeys[i]] !== undefined) {
            state[diffKeys[i]] = VinculumParams.diff;
            break;
          }
        }
        if (callbacks.setDiff) {
          setTimeout(function() { callbacks.setDiff(VinculumParams.diff); }, 100);
        }
      }
    }
  };

})();
