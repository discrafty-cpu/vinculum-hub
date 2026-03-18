/* ═══════════════════════════════════════════════════════════
   VINCULUM INPUT — Smart Context Input System
   v1.0 — March 2026

   Shared module that provides age-appropriate, context-aware
   input methods across ALL VINCULUM tools.

   SMART CONTEXT LOGIC:
   ┌──────────────────────────┬──────────────────────┐
   │ Answer Type              │ Input Method         │
   ├──────────────────────────┼──────────────────────┤
   │ Small integer (≤ 10)     │ Tap Bubbles          │
   │ Large integer (> 10)     │ Number Keypad        │
   │ Decimal / Fraction       │ Number Keypad + keys │
   │ Estimation / Range       │ Drag Slider          │
   │ Multiple choice          │ Choice Buttons       │
   │ True / False             │ Two-Button Toggle    │
   └──────────────────────────┴──────────────────────┘

   USAGE:
     const input = VinculumInput.create(container, {
       type: 'auto',         // 'auto' | 'keypad' | 'bubbles' | 'slider' | 'choices'
       answer: 24000,        // correct answer (used for auto-detection)
       choices: [3,5,7,8],   // for bubbles/choices mode
       min: 0, max: 100,     // for slider mode
       step: 1,              // for slider mode
       allowDecimals: false,  // show decimal key on keypad
       allowFractions: false, // show fraction key on keypad
       onSubmit: fn(value),  // callback when student submits
       labels: {}            // optional custom labels
     });

     input.getValue()        // get current value
     input.clear()           // reset input
     input.disable()         // lock input after submission
     input.destroy()         // clean up
   ═══════════════════════════════════════════════════════════ */

var VinculumInput = (function() {
  'use strict';

  /* ── CSS Injection (once) ── */
  var cssInjected = false;
  function injectCSS() {
    if (cssInjected) return;
    cssInjected = true;
    var style = document.createElement('style');
    style.id = 'vinculum-input-css';
    style.textContent = [
      '/* ══ VINCULUM INPUT — Smart Context Styles ══ */',

      /* Shared wrapper */
      '.vi-wrap{display:flex;flex-direction:column;align-items:center;gap:0.5rem;margin:0.5rem 0 0.75rem;width:100%;}',

      /* ── KEYPAD ── */
      '.vi-keypad-display{',
        'background:var(--bg);border:2px solid var(--border);border-radius:10px;',
        'padding:0.6rem 1rem;min-width:200px;min-height:48px;width:100%;max-width:280px;',
        'font-family:"JetBrains Mono",monospace;font-size:1.6rem;font-weight:700;',
        'text-align:center;color:var(--cyan);letter-spacing:2px;',
        'display:flex;align-items:center;justify-content:center;',
        'transition:border-color 0.2s;',
      '}',
      '.vi-keypad-display:empty::before{',
        'content:"Tap a number";font-size:0.9rem;font-weight:400;color:var(--text2);letter-spacing:0;',
      '}',
      '.vi-keypad-display.vi-focus{border-color:var(--cyan);}',
      '.vi-keypad-grid{',
        'display:grid;grid-template-columns:repeat(3,1fr);gap:5px;',
        'max-width:280px;width:100%;',
      '}',
      '.vi-key{',
        'padding:0.65rem;border:1px solid var(--border);border-radius:10px;',
        'background:var(--bg2);color:var(--text);',
        'font-family:"JetBrains Mono",monospace;font-size:1.15rem;font-weight:600;',
        'cursor:pointer;transition:all 0.12s ease;min-height:44px;',
        'display:flex;align-items:center;justify-content:center;',
        'user-select:none;-webkit-user-select:none;',
      '}',
      '.vi-key:hover{background:var(--cyan);color:white;border-color:var(--cyan);transform:scale(1.04);}',
      '.vi-key:active{transform:scale(0.94);}',
      '.vi-key-clear{',
        'background:color-mix(in srgb,var(--pink) 12%,transparent);',
        'color:var(--pink);border-color:color-mix(in srgb,var(--pink) 25%,transparent);font-size:0.8rem;',
      '}',
      '.vi-key-clear:hover{background:var(--pink);color:white;}',
      '.vi-key-back{font-size:0.95rem;}',
      '.vi-key-special{',
        'font-size:0.85rem;color:var(--text2);',
      '}',
      '.vi-key-special:hover{color:white;}',

      /* ── TAP BUBBLES ── */
      '.vi-bubbles{',
        'display:flex;flex-wrap:wrap;justify-content:center;gap:10px;',
        'max-width:360px;width:100%;',
      '}',
      '.vi-bubble{',
        'width:56px;height:56px;border-radius:50%;',
        'border:2px solid var(--border);background:var(--bg2);',
        'color:var(--text);font-family:"JetBrains Mono",monospace;',
        'font-size:1.3rem;font-weight:700;cursor:pointer;',
        'display:flex;align-items:center;justify-content:center;',
        'transition:all 0.15s ease;user-select:none;-webkit-user-select:none;',
      '}',
      '.vi-bubble:hover{border-color:var(--cyan);color:var(--cyan);transform:scale(1.08);}',
      '.vi-bubble:active{transform:scale(0.92);}',
      '.vi-bubble.vi-selected{',
        'border-color:var(--cyan);background:color-mix(in srgb,var(--cyan) 15%,transparent);',
        'color:var(--cyan);box-shadow:0 0 12px color-mix(in srgb,var(--cyan) 25%,transparent);',
        'transform:scale(1.08);',
      '}',

      /* ── DRAG SLIDER ── */
      '.vi-slider-wrap{max-width:320px;width:100%;text-align:center;}',
      '.vi-slider-value{',
        'font-family:"JetBrains Mono",monospace;font-size:1.8rem;font-weight:700;',
        'color:var(--cyan);margin-bottom:0.25rem;',
      '}',
      '.vi-slider-label{font-size:0.75rem;color:var(--text2);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.5rem;}',
      '.vi-slider{',
        'width:100%;height:8px;border-radius:4px;',
        'background:var(--border);outline:none;cursor:pointer;',
        '-webkit-appearance:none;appearance:none;',
      '}',
      '.vi-slider::-webkit-slider-thumb{',
        '-webkit-appearance:none;width:28px;height:28px;border-radius:50%;',
        'background:var(--cyan);border:3px solid white;cursor:pointer;',
        'box-shadow:0 2px 8px rgba(0,0,0,0.3);',
      '}',
      '.vi-slider::-moz-range-thumb{',
        'width:28px;height:28px;border-radius:50%;',
        'background:var(--cyan);border:3px solid white;cursor:pointer;',
      '}',
      '.vi-slider-ticks{',
        'display:flex;justify-content:space-between;',
        'padding:4px 0;font-size:0.7rem;color:var(--text2);',
        'font-family:"JetBrains Mono",monospace;',
      '}',

      /* ── CHOICE BUTTONS ── */
      '.vi-choices{',
        'display:flex;flex-wrap:wrap;justify-content:center;gap:8px;',
        'max-width:400px;width:100%;',
      '}',
      '.vi-choice{',
        'padding:0.6rem 1.2rem;border-radius:10px;',
        'border:2px solid var(--border);background:var(--bg2);',
        'color:var(--text);font-family:"JetBrains Mono",monospace;',
        'font-size:1rem;font-weight:600;cursor:pointer;',
        'transition:all 0.15s ease;min-width:60px;text-align:center;',
        'user-select:none;-webkit-user-select:none;',
      '}',
      '.vi-choice:hover{border-color:var(--cyan);color:var(--cyan);}',
      '.vi-choice:active{transform:scale(0.95);}',
      '.vi-choice.vi-selected{',
        'border-color:var(--cyan);background:color-mix(in srgb,var(--cyan) 15%,transparent);color:var(--cyan);',
      '}',

      /* ── SUBMIT BUTTON ── */
      '.vi-submit{',
        'margin-top:0.4rem;padding:0.65rem 2rem;',
        'background:var(--cyan);color:white;border:none;border-radius:10px;',
        'font-size:1rem;font-weight:700;font-family:"Inter",sans-serif;',
        'cursor:pointer;transition:all 0.15s ease;',
        'width:100%;max-width:280px;',
      '}',
      '.vi-submit:hover{filter:brightness(1.1);transform:scale(1.02);}',
      '.vi-submit:active{transform:scale(0.98);}',
      '.vi-submit:disabled{opacity:0.4;cursor:not-allowed;transform:none;}',

      /* ── DISABLED STATE ── */
      '.vi-wrap.vi-disabled .vi-key,.vi-wrap.vi-disabled .vi-bubble,',
      '.vi-wrap.vi-disabled .vi-choice,.vi-wrap.vi-disabled .vi-slider{',
        'pointer-events:none;opacity:0.5;',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ── Auto-detect input type from answer ── */
  function detectType(opts) {
    if (opts.type && opts.type !== 'auto') return opts.type;

    var answer = opts.answer;
    var choices = opts.choices;

    /* If choices are explicitly provided and small set, use bubbles */
    if (choices && choices.length > 0 && choices.length <= 8) {
      return 'bubbles';
    }

    /* If answer is a range or estimation flagged */
    if (opts.isEstimation || opts.isRange) return 'slider';

    /* If answer is boolean-ish */
    if (answer === true || answer === false) return 'choices';

    /* Numeric detection */
    if (typeof answer === 'number') {
      /* Small integers → bubbles if choices can be generated */
      if (Number.isInteger(answer) && answer >= 0 && answer <= 10 && !opts.allowDecimals) {
        return 'bubbles';
      }
      /* Everything else → keypad */
      return 'keypad';
    }

    /* Fallback */
    return 'keypad';
  }

  /* ── Generate bubble choices for small numbers ── */
  function generateBubbleChoices(answer, count) {
    count = count || 6;
    var choices = [answer];
    var attempts = 0;
    while (choices.length < count && attempts < 50) {
      var offset = Math.floor(Math.random() * 5) + 1;
      var candidate = answer + (Math.random() > 0.5 ? offset : -offset);
      if (candidate >= 0 && candidate <= 20 && choices.indexOf(candidate) === -1) {
        choices.push(candidate);
      }
      attempts++;
    }
    /* Shuffle */
    for (var i = choices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = choices[i];
      choices[i] = choices[j];
      choices[j] = tmp;
    }
    return choices;
  }

  /* ── Generate slider tick labels ── */
  function generateSliderTicks(min, max, count) {
    count = count || 5;
    var step = (max - min) / (count - 1);
    var ticks = [];
    for (var i = 0; i < count; i++) {
      ticks.push(Math.round(min + i * step));
    }
    return ticks;
  }

  /* ═══════════════════════════════════════════════
     MAIN FACTORY
     ═══════════════════════════════════════════════ */
  function create(container, opts) {
    injectCSS();
    opts = opts || {};
    var type = detectType(opts);
    var value = null;
    var disabled = false;
    var onSubmit = opts.onSubmit || function() {};

    /* Create wrapper */
    var wrap = document.createElement('div');
    wrap.className = 'vi-wrap';
    wrap.setAttribute('data-vi-type', type);

    /* ══ BUILD BY TYPE ══ */

    if (type === 'bubbles') {
      value = null;
      var choices = opts.choices || generateBubbleChoices(opts.answer);
      var bubblesDiv = document.createElement('div');
      bubblesDiv.className = 'vi-bubbles';

      choices.forEach(function(c) {
        var btn = document.createElement('button');
        btn.className = 'vi-bubble';
        btn.textContent = c;
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', function() {
          if (disabled) return;
          bubblesDiv.querySelectorAll('.vi-bubble').forEach(function(b) { b.classList.remove('vi-selected'); });
          btn.classList.add('vi-selected');
          value = c;
        });
        bubblesDiv.appendChild(btn);
      });

      wrap.appendChild(bubblesDiv);

      var submitBtn = document.createElement('button');
      submitBtn.className = 'vi-submit';
      submitBtn.textContent = opts.labels && opts.labels.submit ? opts.labels.submit : 'Check Answer';
      submitBtn.setAttribute('type', 'button');
      submitBtn.addEventListener('click', function() {
        if (disabled) return;
        if (value === null) return;
        onSubmit(value);
      });
      wrap.appendChild(submitBtn);
    }

    else if (type === 'keypad') {
      value = '';
      var display = document.createElement('div');
      display.className = 'vi-keypad-display';
      display.setAttribute('aria-label', 'Your answer');

      var grid = document.createElement('div');
      grid.className = 'vi-keypad-grid';

      var keys = ['7','8','9','4','5','6','1','2','3'];

      /* Bottom row varies based on options */
      var bottomRow = ['clear', '0', 'back'];
      if (opts.allowDecimals) {
        bottomRow = ['clear', '0', '.'];
        keys.push('clear', '0', '.', 'back');
      } else if (opts.allowFractions) {
        bottomRow = ['clear', '0', '/'];
        keys.push('clear', '0', '/', 'back');
      } else {
        keys.push('clear', '0', 'back');
      }

      /* Add negative key if needed */
      if (opts.allowNegative) {
        keys.splice(9, 0, '±');
      }

      function updateDisplay() {
        if (value === '' || value === '-') {
          display.textContent = '';
        } else if (value.indexOf('/') !== -1 || value.indexOf('.') !== -1 || value.indexOf('-') !== -1) {
          display.textContent = value;
        } else {
          var num = parseInt(value);
          display.textContent = isNaN(num) ? value : num.toLocaleString();
        }
      }

      keys.forEach(function(k) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        if (k === 'clear') {
          btn.className = 'vi-key vi-key-clear';
          btn.textContent = 'Clear';
          btn.addEventListener('click', function() {
            if (disabled) return;
            value = '';
            updateDisplay();
          });
        } else if (k === 'back') {
          btn.className = 'vi-key vi-key-back';
          btn.textContent = '⌫';
          btn.addEventListener('click', function() {
            if (disabled) return;
            value = value.slice(0, -1);
            updateDisplay();
          });
        } else if (k === '.' || k === '/' || k === '±') {
          btn.className = 'vi-key vi-key-special';
          btn.textContent = k === '±' ? '−/+' : k;
          btn.addEventListener('click', function() {
            if (disabled) return;
            if (k === '±') {
              if (value.charAt(0) === '-') value = value.slice(1);
              else value = '-' + value;
            } else {
              if (value.indexOf(k) === -1) value += k;
            }
            updateDisplay();
          });
        } else {
          btn.className = 'vi-key';
          btn.textContent = k;
          btn.addEventListener('click', function() {
            if (disabled) return;
            if (value.replace(/[^0-9]/g, '').length >= 10) return;
            value += k;
            updateDisplay();
          });
        }
        grid.appendChild(btn);
      });

      /* Add backspace if decimals/fractions mode pushed it out */
      if (opts.allowDecimals || opts.allowFractions) {
        /* Backspace as 4th column spanning */
        var backBtn = document.createElement('button');
        backBtn.className = 'vi-key vi-key-back';
        backBtn.textContent = '⌫';
        backBtn.setAttribute('type', 'button');
        backBtn.style.gridColumn = '1 / -1';
        backBtn.style.minHeight = '36px';
        backBtn.addEventListener('click', function() {
          if (disabled) return;
          value = value.slice(0, -1);
          updateDisplay();
        });
        grid.appendChild(backBtn);
      }

      wrap.appendChild(display);
      wrap.appendChild(grid);

      var submitBtn = document.createElement('button');
      submitBtn.className = 'vi-submit';
      submitBtn.textContent = opts.labels && opts.labels.submit ? opts.labels.submit : 'Check Answer';
      submitBtn.setAttribute('type', 'button');
      submitBtn.addEventListener('click', function() {
        if (disabled) return;
        if (!value || value === '' || value === '-') return;
        var parsed;
        if (value.indexOf('/') !== -1) {
          parsed = value; /* fraction string */
        } else if (value.indexOf('.') !== -1) {
          parsed = parseFloat(value);
        } else {
          parsed = parseInt(value);
        }
        if (typeof parsed === 'number' && isNaN(parsed)) return;
        onSubmit(parsed);
      });
      wrap.appendChild(submitBtn);
    }

    else if (type === 'slider') {
      var min = opts.min !== undefined ? opts.min : 0;
      var max = opts.max !== undefined ? opts.max : 100;
      var step = opts.step || 1;
      var initial = opts.initial !== undefined ? opts.initial : Math.round((min + max) / 2);
      value = initial;

      var valDisplay = document.createElement('div');
      valDisplay.className = 'vi-slider-value';
      valDisplay.textContent = initial;

      var label = document.createElement('div');
      label.className = 'vi-slider-label';
      label.textContent = 'YOUR ANSWER';

      var sliderWrap = document.createElement('div');
      sliderWrap.className = 'vi-slider-wrap';

      var slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'vi-slider';
      slider.min = min;
      slider.max = max;
      slider.step = step;
      slider.value = initial;
      slider.addEventListener('input', function() {
        if (disabled) return;
        value = Number(slider.value);
        valDisplay.textContent = value.toLocaleString();
      });

      /* Tick marks */
      var ticksDiv = document.createElement('div');
      ticksDiv.className = 'vi-slider-ticks';
      var ticks = generateSliderTicks(min, max, Math.min(11, (max - min) / step + 1));
      ticks.forEach(function(t) {
        var span = document.createElement('span');
        span.textContent = t;
        ticksDiv.appendChild(span);
      });

      sliderWrap.appendChild(valDisplay);
      sliderWrap.appendChild(label);
      sliderWrap.appendChild(slider);
      sliderWrap.appendChild(ticksDiv);
      wrap.appendChild(sliderWrap);

      var submitBtn = document.createElement('button');
      submitBtn.className = 'vi-submit';
      submitBtn.textContent = opts.labels && opts.labels.submit ? opts.labels.submit : 'Lock In!';
      submitBtn.setAttribute('type', 'button');
      submitBtn.addEventListener('click', function() {
        if (disabled) return;
        onSubmit(value);
      });
      wrap.appendChild(submitBtn);
    }

    else if (type === 'choices') {
      value = null;
      var choices2 = opts.choices || ['True', 'False'];
      var choicesDiv = document.createElement('div');
      choicesDiv.className = 'vi-choices';

      choices2.forEach(function(c) {
        var btn = document.createElement('button');
        btn.className = 'vi-choice';
        btn.textContent = c;
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', function() {
          if (disabled) return;
          choicesDiv.querySelectorAll('.vi-choice').forEach(function(b) { b.classList.remove('vi-selected'); });
          btn.classList.add('vi-selected');
          value = c;
        });
        choicesDiv.appendChild(btn);
      });

      wrap.appendChild(choicesDiv);

      var submitBtn = document.createElement('button');
      submitBtn.className = 'vi-submit';
      submitBtn.textContent = opts.labels && opts.labels.submit ? opts.labels.submit : 'Check Answer';
      submitBtn.setAttribute('type', 'button');
      submitBtn.addEventListener('click', function() {
        if (disabled) return;
        if (value === null) return;
        onSubmit(value);
      });
      wrap.appendChild(submitBtn);
    }

    container.appendChild(wrap);

    /* ═══ Public API ═══ */
    return {
      type: type,
      el: wrap,

      getValue: function() {
        if (type === 'keypad') {
          if (!value || value === '' || value === '-') return NaN;
          if (value.indexOf('/') !== -1) return value;
          if (value.indexOf('.') !== -1) return parseFloat(value);
          return parseInt(value);
        }
        return value;
      },

      clear: function() {
        if (type === 'keypad') {
          value = '';
          var d = wrap.querySelector('.vi-keypad-display');
          if (d) d.textContent = '';
        } else if (type === 'bubbles') {
          value = null;
          wrap.querySelectorAll('.vi-bubble').forEach(function(b) { b.classList.remove('vi-selected'); });
        } else if (type === 'choices') {
          value = null;
          wrap.querySelectorAll('.vi-choice').forEach(function(b) { b.classList.remove('vi-selected'); });
        } else if (type === 'slider') {
          var s = wrap.querySelector('.vi-slider');
          var v = wrap.querySelector('.vi-slider-value');
          var mid = Math.round((Number(s.min) + Number(s.max)) / 2);
          s.value = mid;
          value = mid;
          if (v) v.textContent = mid;
        }
      },

      disable: function() {
        disabled = true;
        wrap.classList.add('vi-disabled');
        var btn = wrap.querySelector('.vi-submit');
        if (btn) btn.disabled = true;
      },

      enable: function() {
        disabled = false;
        wrap.classList.remove('vi-disabled');
        var btn = wrap.querySelector('.vi-submit');
        if (btn) btn.disabled = false;
      },

      destroy: function() {
        if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      }
    };
  }

  /* ═══ Public Module ═══ */
  return {
    create: create,
    detectType: detectType,
    version: '1.0.0'
  };

})();
