/* ═══════════════════════════════════════════════════════════
   VINCULUM AUDIO ENGINE
   v1.0 — March 2026

   Provides audio feedback for all VINCULUM tools:
   - Text-to-speech (Web Speech API) for instructions & feedback
   - Sound effects for correct, incorrect, celebration, click
   - Auto-reads instructions, feedback messages, and side panel hints
   - Respects user mute preference (persisted in localStorage)
   - Uses AudioContext for generated sounds (no external files)

   Non-invasive: if Web Speech API is unavailable, degrades silently.
   Loads BEFORE vinculum-layout.js in the script stack.
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── CONFIG ──
  var MUTE_KEY = 'vinculum-audio-muted';
  var VOICE_RATE = 0.85;    // Slower for young learners
  var VOICE_PITCH = 1.1;    // Slightly higher — friendlier
  var VOICE_VOLUME = 0.9;
  var SFX_VOLUME = 0.4;

  var isMuted = false;
  var audioCtx = null;
  var speechSynth = window.speechSynthesis || null;
  var currentUtterance = null;
  var muteBtn = null;
  var voiceReady = false;
  var preferredVoice = null;

  // ═══════════════════════════════════════
  // PART 1: AUDIO CONTEXT + SOUND EFFECTS
  // ═══════════════════════════════════════

  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) {
        return null;
      }
    }
    // Resume if suspended (autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Generate a simple tone
  function playTone(freq, duration, type, vol) {
    if (isMuted) return;
    var ctx = getAudioCtx();
    if (!ctx) return;

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.value = (vol || SFX_VOLUME) * 0.5;

    // Quick fade out to avoid click
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  // ── Sound effect library (synthesized, no files needed) ──

  var SFX = {
    // Correct answer — cheerful ascending two-note
    correct: function() {
      playTone(523, 0.12, 'sine');  // C5
      setTimeout(function() { playTone(659, 0.2, 'sine'); }, 120);  // E5
    },

    // Incorrect answer — gentle low tone (not punishing)
    incorrect: function() {
      playTone(220, 0.3, 'triangle', SFX_VOLUME * 0.6);  // A3, softer
    },

    // Click / tap feedback
    click: function() {
      playTone(880, 0.05, 'sine', SFX_VOLUME * 0.3);
    },

    // Celebration — ascending arpeggio (level complete, streak)
    celebrate: function() {
      playTone(523, 0.1, 'sine');   // C5
      setTimeout(function() { playTone(659, 0.1, 'sine'); }, 100);  // E5
      setTimeout(function() { playTone(784, 0.1, 'sine'); }, 200);  // G5
      setTimeout(function() { playTone(1047, 0.25, 'sine'); }, 300); // C6
    },

    // Hint / nudge — soft double tap
    hint: function() {
      playTone(660, 0.08, 'triangle', SFX_VOLUME * 0.4);
      setTimeout(function() { playTone(660, 0.08, 'triangle', SFX_VOLUME * 0.4); }, 150);
    },

    // Star earned
    star: function() {
      playTone(784, 0.08, 'sine');  // G5
      setTimeout(function() { playTone(988, 0.08, 'sine'); }, 80);  // B5
      setTimeout(function() { playTone(1175, 0.15, 'sine'); }, 160); // D6
    },

    // Mode switch
    modeSwitch: function() {
      playTone(440, 0.06, 'square', SFX_VOLUME * 0.2);
      setTimeout(function() { playTone(554, 0.06, 'square', SFX_VOLUME * 0.2); }, 60);
    },

    // Drag start
    dragStart: function() {
      playTone(600, 0.04, 'sine', SFX_VOLUME * 0.2);
    },

    // Drop / place
    drop: function() {
      playTone(400, 0.06, 'sine', SFX_VOLUME * 0.3);
      setTimeout(function() { playTone(500, 0.08, 'sine', SFX_VOLUME * 0.3); }, 50);
    }
  };

  // ═══════════════════════════════════════
  // PART 2: TEXT-TO-SPEECH
  // ═══════════════════════════════════════

  function findVoice() {
    if (!speechSynth) return;
    var voices = speechSynth.getVoices();
    if (!voices.length) return;

    // Prefer: Samantha (macOS), Google US English, any en-US female
    var prefs = ['samantha', 'google us english', 'microsoft zira'];
    for (var p = 0; p < prefs.length; p++) {
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name.toLowerCase().indexOf(prefs[p]) !== -1) {
          preferredVoice = voices[i];
          voiceReady = true;
          return;
        }
      }
    }

    // Fallback: any English voice
    for (var j = 0; j < voices.length; j++) {
      if (voices[j].lang && voices[j].lang.indexOf('en') === 0) {
        preferredVoice = voices[j];
        voiceReady = true;
        return;
      }
    }

    // Last resort: first voice
    if (voices.length > 0) {
      preferredVoice = voices[0];
      voiceReady = true;
    }
  }

  // Voices load asynchronously on some browsers
  if (speechSynth) {
    findVoice();
    if (speechSynth.onvoiceschanged !== undefined) {
      speechSynth.onvoiceschanged = findVoice;
    }
  }

  function speak(text, options) {
    if (isMuted || !speechSynth || !text) return;

    // Strip HTML tags
    var clean = text.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
    if (!clean) return;

    // Cancel any current speech
    speechSynth.cancel();

    var utter = new SpeechSynthesisUtterance(clean);
    utter.rate = (options && options.rate) || VOICE_RATE;
    utter.pitch = (options && options.pitch) || VOICE_PITCH;
    utter.volume = (options && options.volume) || VOICE_VOLUME;

    if (preferredVoice) {
      utter.voice = preferredVoice;
    }

    if (options && options.onEnd) {
      utter.onend = options.onEnd;
    }

    currentUtterance = utter;
    speechSynth.speak(utter);
  }

  function stopSpeaking() {
    if (speechSynth) {
      speechSynth.cancel();
    }
  }

  // ═══════════════════════════════════════
  // PART 3: AUTO-READ OBSERVER
  // ═══════════════════════════════════════

  // Watch for feedback messages and auto-read them
  function watchForFeedback() {
    var ws = document.getElementById('workspace');
    if (!ws) return;

    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType !== 1) continue;

          // Auto-read feedback messages
          if (node.classList && (
            node.classList.contains('feedback') ||
            node.classList.contains('feedback-msg') ||
            node.classList.contains('hint-text') ||
            node.classList.contains('instruction') ||
            node.classList.contains('v-feedback')
          )) {
            var txt = node.textContent || node.innerText;
            if (txt && txt.length > 3 && txt.length < 300) {
              // Small delay so visual appears before audio
              setTimeout(function(t) { speak(t); }, 200, txt);
            }
          }

          // Also check children for feedback elements
          if (node.querySelector) {
            var fb = node.querySelector('.feedback, .feedback-msg, .hint-text, .instruction, .v-feedback');
            if (fb) {
              var fbText = fb.textContent || fb.innerText;
              if (fbText && fbText.length > 3 && fbText.length < 300) {
                setTimeout(function(t) { speak(t); }, 200, fbText);
              }
            }
          }
        }
      }
    });

    observer.observe(ws, { childList: true, subtree: true });
  }

  // ═══════════════════════════════════════
  // PART 4: MUTE BUTTON
  // ═══════════════════════════════════════

  function createMuteButton() {
    muteBtn = document.createElement('button');
    muteBtn.id = 'vinculumMuteBtn';
    muteBtn.setAttribute('role', 'button');
    muteBtn.setAttribute('aria-label', 'Toggle sound');
    muteBtn.setAttribute('tabindex', '0');

    updateMuteButton();

    muteBtn.style.cssText =
      'position:fixed;top:8px;left:52px;' +
      'width:36px;height:36px;' +
      'border-radius:10px;background:var(--card,#1a1f2e);' +
      'border:1px solid var(--border,#2a2f3e);' +
      'cursor:pointer;z-index:10001;' +
      'opacity:0.7;transition:all 200ms ease;' +
      'display:flex;align-items:center;justify-content:center;' +
      'color:var(--text,#e0e0e0);padding:0;font-size:18px;';

    muteBtn.addEventListener('mouseenter', function() {
      muteBtn.style.opacity = '1';
    });
    muteBtn.addEventListener('mouseleave', function() {
      muteBtn.style.opacity = '0.7';
    });

    muteBtn.addEventListener('click', function() {
      isMuted = !isMuted;
      if (isMuted) stopSpeaking();
      updateMuteButton();
      try {
        localStorage.setItem(MUTE_KEY, isMuted ? 'true' : 'false');
      } catch(e) {}
    });

    document.body.appendChild(muteBtn);
  }

  function updateMuteButton() {
    if (!muteBtn) return;
    if (isMuted) {
      muteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
      muteBtn.title = 'Sound off — click to unmute';
      muteBtn.style.color = '#ff6b9d';
    } else {
      muteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      muteBtn.title = 'Sound on — click to mute';
      muteBtn.style.color = 'var(--text,#e0e0e0)';
    }
  }

  // ═══════════════════════════════════════
  // PART 5: INJECT STYLES
  // ═══════════════════════════════════════

  var css = document.createElement('style');
  css.textContent =
    '#vinculumMuteBtn:focus-visible{outline:2px solid var(--accent,#00d4ff);outline-offset:2px;}' +
    /* Speaking indicator — pulse on active speech */
    '#vinculumMuteBtn.speaking{animation:v-pulse 1s ease-in-out infinite;}' +
    '@keyframes v-pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,212,255,0.3);}50%{box-shadow:0 0 0 6px rgba(0,212,255,0);}}';
  document.head.appendChild(css);

  // ═══════════════════════════════════════
  // PART 6: PUBLIC API
  // ═══════════════════════════════════════

  // Expose globally so individual tools can trigger audio
  window.VinculumAudio = {
    speak: speak,
    stop: stopSpeaking,
    sfx: SFX,
    mute: function() { isMuted = true; updateMuteButton(); },
    unmute: function() { isMuted = false; updateMuteButton(); },
    isMuted: function() { return isMuted; },

    // Convenience: read the current instruction/prompt
    readInstruction: function() {
      var el = document.querySelector('.instruction, .prompt-text, .question-text, [data-read]');
      if (el) speak(el.textContent || el.innerText);
    },

    // Play correct/incorrect with speech
    correct: function(msg) {
      SFX.correct();
      if (msg) setTimeout(function() { speak(msg); }, 300);
    },
    incorrect: function(msg) {
      SFX.incorrect();
      if (msg) setTimeout(function() { speak(msg); }, 400);
    },
    celebrate: function(msg) {
      SFX.celebrate();
      if (msg) setTimeout(function() { speak(msg); }, 500);
    }
  };

  // ═══════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════

  function init() {
    // Restore mute state
    try {
      isMuted = localStorage.getItem(MUTE_KEY) === 'true';
    } catch(e) {}

    createMuteButton();
    watchForFeedback();

    // Resume AudioContext on first user interaction (autoplay policy)
    var resumeAudio = function() {
      getAudioCtx();
      document.removeEventListener('click', resumeAudio);
      document.removeEventListener('keydown', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);
    document.addEventListener('keydown', resumeAudio);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }

})();
