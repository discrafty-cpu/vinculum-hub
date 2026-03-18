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
  // 3b. THEME CHOOSER (injected into every app)
  // ════════════════════════════════════════
  var VINCULUM_THEMES = [
    { id: 'dark',         label: 'Dark',           icon: '🌙' },
    { id: 'bright',       label: 'Bright',         icon: '☀️' },
    { id: 'redlaser',     label: 'Red Laser',      icon: '🔴' },
    { id: 'storm',        label: 'Storm',          icon: '⛈️' },
    { id: 'frost',        label: 'Frost',          icon: '❄️' },
    { id: 'emerald',      label: 'Emerald',        icon: '💎' },
    { id: 'sunset',       label: 'Sunset',         icon: '🌅' },
    { id: 'spartan',      label: 'Spartan',        icon: '🛡️' },
    { id: 'neonforge',    label: 'Neon Forge',     icon: '🔮' },
    { id: 'sunrise',      label: 'Sunrise',        icon: '🌄' },
    { id: 'ocean',        label: 'Ocean',          icon: '🌊' },
    { id: 'mathlab',      label: 'Math Lab',       icon: '🔬' },
    { id: 'nature',       label: 'Nature',         icon: '🌿' },
    { id: 'highcontrast', label: 'High Contrast',  icon: '◐' },
    { id: 'laserpro',     label: 'Laser Pro',      icon: '⚡' }
  ];

  function _setTheme(id) {
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem('vinculum-theme', id); } catch(e) {}
    // Update button label
    var btn = document.getElementById('vinculum-theme-toggle');
    if (btn) {
      var theme = VINCULUM_THEMES.find(function(t){ return t.id === id; });
      btn.querySelector('.vtc-label').textContent = theme ? theme.icon : '🎨';
    }
    // Update active state in dropdown
    var items = document.querySelectorAll('.vtc-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('vtc-active', items[i].getAttribute('data-theme') === id);
    }
  }
  window.VinculumSetTheme = _setTheme;

  if (!VinculumParams.embed) {
    document.addEventListener('DOMContentLoaded', function() {
      // Inject CSS for the theme chooser
      var style = document.createElement('style');
      style.textContent = [
        '.vtc-wrap{position:fixed;top:12px;right:12px;z-index:9999;font-family:Inter,-apple-system,sans-serif;}',
        '.vtc-btn{width:40px;height:40px;border-radius:50%;border:2px solid var(--border);background:var(--card);',
        '  cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;',
        '  box-shadow:0 2px 10px rgba(0,0,0,0.3);transition:all 0.2s ease;}',
        '.vtc-btn:hover{transform:scale(1.1);border-color:var(--cyan);}',
        '.vtc-dropdown{display:none;position:absolute;top:48px;right:0;background:var(--card);',
        '  border:1px solid var(--border);border-radius:12px;padding:8px;min-width:180px;',
        '  box-shadow:0 8px 32px rgba(0,0,0,0.4);max-height:70vh;overflow-y:auto;}',
        '.vtc-dropdown.open{display:block;}',
        '.vtc-item{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;',
        '  cursor:pointer;font-size:13px;color:var(--text);transition:background 0.15s;border:none;',
        '  background:transparent;width:100%;text-align:left;}',
        '.vtc-item:hover{background:var(--glow);}',
        '.vtc-active{background:rgba(0,212,255,0.15);font-weight:600;}',
        '.vtc-icon{font-size:16px;width:24px;text-align:center;}',
      ].join('\n');
      document.head.appendChild(style);

      // Build the widget
      var currentId = document.documentElement.getAttribute('data-theme') || 'dark';
      var currentTheme = VINCULUM_THEMES.find(function(t){ return t.id === currentId; }) || VINCULUM_THEMES[0];

      var wrap = document.createElement('div');
      wrap.className = 'vtc-wrap';

      var btn = document.createElement('button');
      btn.id = 'vinculum-theme-toggle';
      btn.className = 'vtc-btn';
      btn.title = 'Change Theme';
      btn.innerHTML = '<span class="vtc-label">' + currentTheme.icon + '</span>';

      var dropdown = document.createElement('div');
      dropdown.className = 'vtc-dropdown';

      VINCULUM_THEMES.forEach(function(t) {
        var item = document.createElement('button');
        item.className = 'vtc-item' + (t.id === currentId ? ' vtc-active' : '');
        item.setAttribute('data-theme', t.id);
        item.innerHTML = '<span class="vtc-icon">' + t.icon + '</span><span>' + t.label + '</span>';
        item.addEventListener('click', function() {
          _setTheme(t.id);
          dropdown.classList.remove('open');
        });
        dropdown.appendChild(item);
      });

      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });

      document.addEventListener('click', function() {
        dropdown.classList.remove('open');
      });
      dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

      wrap.appendChild(btn);
      wrap.appendChild(dropdown);
      document.body.appendChild(wrap);
    });
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
