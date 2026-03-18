/* ═══════════════════════════════════════════════════════════════
   VINCULUM 3-Reads Progressive Scaffolding System
   ═══════════════════════════════════════════════════════════════
   WWC Alignment:
   - Rec 5: Word Problems (Strong, 18 studies) — story→problem progression
   - Self-Monitoring/Metacognition (Strong) — guided comprehension
   - Rec 2: Mathematical Language (Strong) — vocabulary in context

   Piaget/CRA Connection:
   - Preoperational (K): Narrative-driven, one step at a time
   - Concrete Operational (G1-2): Building toward independent reading

   HOW IT WORKS:
   The 3-Reads Protocol breaks story problems into three guided steps:
     Read 1: "What is this story about?" — Understand the situation (no numbers)
     Read 2: "What numbers matter?" — Identify quantities and relationships
     Read 3: "What are we figuring out?" — Identify the question/goal

   This module hooks into the existing VinculumStories story banner.
   Instead of showing the full story + question at once, it reveals
   the story progressively, with prompts at each stage.

   USAGE:
   After VinculumStories loads, call:
     Vinculum3Reads.enhance(storyData, containerElement, onComplete)

   Or use the auto-enhance mode which patches into existing banners:
     Vinculum3Reads.autoEnhance()  // call after DOM is ready
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const Vinculum3Reads = {

    // ─── Configuration ───
    config: {
      enableAnimation: true,
      readAloudEachStep: true,
      showStepNumbers: true,
      autoAdvanceDelay: 0,  // 0 = manual advance, >0 = auto-advance ms
      colors: {
        read1: 'var(--cyan, #00d4ff)',
        read2: 'var(--green, #00e676)',
        read3: 'var(--yellow, #ffd740)',
        background: 'var(--card2, #1a1f2e)',
        border: 'var(--border, #2a2f3e)',
        text: 'var(--text, #e0e0e0)',
        muted: 'var(--muted, #6b7280)'
      }
    },

    // ─── Current state ───
    _state: {
      currentRead: 0,  // 0 = not started, 1-3 = which read
      storyData: null,
      container: null,
      onComplete: null,
      isEnhanced: false
    },

    // ─── Build the 3-Reads banner HTML ───
    _buildBannerHTML(storyData, currentRead) {
      const c = this.config.colors;
      const story = storyData.story || '';
      const question = storyData.question || '';

      // Strip numbers from story for Read 1 (situation understanding)
      const storyNoNumbers = story.replace(/\d+/g, '___');

      // Extract just the numbers for Read 2 highlighting
      const numbers = story.match(/\d+/g) || [];
      const storyHighlightedNumbers = story.replace(/(\d+)/g,
        '<span style="background:rgba(0,230,118,0.2);padding:2px 6px;border-radius:4px;font-weight:700;color:' + c.read2 + ';">$1</span>');

      let html = '';
      html += '<div id="storyBanner3Reads" style="background:' + c.background + ';border:1px solid ' + c.border + ';border-radius:12px;padding:0;margin-bottom:16px;overflow:hidden;color:' + c.text + ';position:relative;">';

      // ─── Progress bar ───
      html += '<div style="display:flex;height:4px;background:rgba(255,255,255,0.05);">';
      html += '<div style="flex:1;background:' + (currentRead >= 1 ? c.read1 : 'transparent') + ';transition:background 0.5s;"></div>';
      html += '<div style="flex:1;background:' + (currentRead >= 2 ? c.read2 : 'transparent') + ';transition:background 0.5s;"></div>';
      html += '<div style="flex:1;background:' + (currentRead >= 3 ? c.read3 : 'transparent') + ';transition:background 0.5s;"></div>';
      html += '</div>';

      // ─── Content area ───
      html += '<div style="padding:16px 20px;">';

      // Step indicator
      if (this.config.showStepNumbers && currentRead > 0) {
        const readLabels = ['', 'Read 1: The Situation', 'Read 2: The Numbers', 'Read 3: The Question'];
        const readColors = ['', c.read1, c.read2, c.read3];
        const readIcons = ['', '\uD83D\uDCD6', '\uD83D\uDD22', '\u2753']; // 📖 🔢 ❓
        html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
        html += '<span style="font-size:16px;">' + readIcons[currentRead] + '</span>';
        html += '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:' + readColors[currentRead] + ';">' + readLabels[currentRead] + '</span>';
        html += '</div>';
      }

      // ─── Read 1: Show story WITHOUT numbers ───
      if (currentRead === 1) {
        html += '<div style="font-size:15px;line-height:1.7;margin-bottom:12px;">' + storyNoNumbers + '</div>';
        html += '<div style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:8px;padding:10px 14px;margin-bottom:12px;">';
        html += '<span style="font-weight:600;color:' + c.read1 + ';">Think: </span>';
        html += '<span style="color:' + c.text + ';">What is this story about? What is happening?</span>';
        html += '</div>';
        html += this._nextButton(2, 'I understand the story \u2192');
      }

      // ─── Read 2: Show story WITH highlighted numbers ───
      else if (currentRead === 2) {
        html += '<div style="font-size:15px;line-height:1.7;margin-bottom:12px;">' + storyHighlightedNumbers + '</div>';
        html += '<div style="background:rgba(0,230,118,0.08);border:1px solid rgba(0,230,118,0.2);border-radius:8px;padding:10px 14px;margin-bottom:12px;">';
        html += '<span style="font-weight:600;color:' + c.read2 + ';">Think: </span>';
        html += '<span style="color:' + c.text + ';">What numbers do you see? What do they mean in the story?</span>';
        html += '</div>';
        if (numbers.length > 0) {
          html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">';
          numbers.forEach(n => {
            html += '<div style="background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.3);border-radius:8px;padding:6px 14px;font-size:18px;font-weight:700;color:' + c.read2 + ';">' + n + '</div>';
          });
          html += '</div>';
        }
        html += this._nextButton(3, 'I see the numbers \u2192');
      }

      // ─── Read 3: Show full story + question ───
      else if (currentRead === 3) {
        html += '<div style="font-size:15px;line-height:1.7;margin-bottom:8px;">' + story + '</div>';
        html += '<div style="background:rgba(255,215,64,0.08);border:1px solid rgba(255,215,64,0.2);border-radius:8px;padding:10px 14px;margin-bottom:12px;">';
        html += '<span style="font-weight:600;color:' + c.read3 + ';">Question: </span>';
        html += '<em style="color:' + c.read3 + ';font-weight:600;">' + question + '</em>';
        html += '</div>';
        html += '<div style="background:rgba(255,215,64,0.05);border-radius:8px;padding:8px 14px;margin-bottom:10px;">';
        html += '<span style="font-weight:600;color:' + c.read3 + ';">Think: </span>';
        html += '<span style="color:' + c.text + ';">What are we trying to figure out? What can we do to solve it?</span>';
        html += '</div>';
        html += this._completeButton('Let\u2019s solve it! \u2705');
      }

      // ─── Not started yet — show intro ───
      else {
        html += '<div style="text-align:center;padding:8px 0;">';
        html += '<div style="font-size:20px;margin-bottom:8px;">\uD83D\uDCD6</div>'; // 📖
        html += '<div style="font-size:14px;color:' + c.muted + ';margin-bottom:10px;">Let\u2019s read this story together step by step!</div>';
        html += this._nextButton(1, 'Start Reading \uD83D\uDCD6');
        html += '</div>';
      }

      // Read-aloud button (always visible)
      html += '<button onclick="Vinculum3Reads.readCurrentAloud()" style="position:absolute;top:20px;right:16px;background:none;border:1px solid ' + c.border + ';border-radius:8px;padding:4px 10px;color:' + c.read1 + ';cursor:pointer;font-size:14px;" title="Read aloud">\uD83D\uDD0A</button>';

      html += '</div></div>';
      return html;
    },

    _nextButton(nextRead, label) {
      return '<button onclick="Vinculum3Reads.advanceTo(' + nextRead + ')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border-radius:8px;border:1px solid var(--cyan,#00d4ff);background:rgba(0,212,255,0.1);color:var(--cyan,#00d4ff);font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background=\'rgba(0,212,255,0.2)\'" onmouseout="this.style.background=\'rgba(0,212,255,0.1)\'">' + label + '</button>';
    },

    _completeButton(label) {
      return '<button onclick="Vinculum3Reads.complete()" style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border-radius:8px;border:1px solid var(--green,#00e676);background:rgba(0,230,118,0.1);color:var(--green,#00e676);font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background=\'rgba(0,230,118,0.2)\'" onmouseout="this.style.background=\'rgba(0,230,118,0.1)\'">' + label + '</button>';
    },

    // ─── Public API ───

    /**
     * Enhance a story banner with 3-Reads scaffolding
     * @param {Object} storyData - {story: "...", question: "..."}
     * @param {HTMLElement} container - Element to render into
     * @param {Function} onComplete - Called when student completes all 3 reads
     */
    enhance(storyData, container, onComplete) {
      this._state.storyData = storyData;
      this._state.container = container;
      this._state.onComplete = onComplete || function(){};
      this._state.currentRead = 0;
      this._state.isEnhanced = true;

      // Render initial state
      container.innerHTML = this._buildBannerHTML(storyData, 0);
    },

    /**
     * Advance to a specific read step (1, 2, or 3)
     */
    advanceTo(readNum) {
      if (!this._state.storyData || !this._state.container) return;
      this._state.currentRead = readNum;

      const banner = this._state.container;
      if (this.config.enableAnimation) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-4px)';
        setTimeout(() => {
          banner.innerHTML = this._buildBannerHTML(this._state.storyData, readNum);
          banner.style.transition = 'opacity 0.3s, transform 0.3s';
          banner.style.opacity = '1';
          banner.style.transform = 'translateY(0)';
        }, 150);
      } else {
        banner.innerHTML = this._buildBannerHTML(this._state.storyData, readNum);
      }

      // Auto read-aloud if enabled
      if (this.config.readAloudEachStep) {
        setTimeout(() => this.readCurrentAloud(), 400);
      }
    },

    /**
     * Mark 3-Reads as complete — student is ready to solve
     */
    complete() {
      this._state.currentRead = 3;
      this._state.isEnhanced = false;

      // Replace with standard completed banner showing full story
      if (this._state.container && this._state.storyData) {
        const sd = this._state.storyData;
        const c = this.config.colors;
        let html = '<div id="storyBanner" style="background:' + c.background + ';border:1px solid ' + c.border + ';border-radius:12px;padding:16px 20px;margin-bottom:16px;font-size:15px;line-height:1.6;color:' + c.text + ';position:relative;">';
        html += '<span style="font-size:12px;color:' + c.read1 + ';font-weight:700;text-transform:uppercase;letter-spacing:1px;">\uD83D\uDCD6 Story \u2714\uFE0F</span><br>';
        html += sd.story + '<br>';
        html += '<em style="color:' + c.read3 + ';font-weight:600;">' + sd.question + '</em>';
        html += '<button onclick="Vinculum3Reads.readCurrentAloud()" style="position:absolute;top:12px;right:12px;background:none;border:1px solid ' + c.border + ';border-radius:8px;padding:4px 10px;color:' + c.read1 + ';cursor:pointer;font-size:14px;" title="Read story aloud">\uD83D\uDD0A</button>';
        html += '</div>';
        this._state.container.innerHTML = html;
      }

      if (this._state.onComplete) {
        this._state.onComplete();
      }
    },

    /**
     * Read the current step's content aloud using speechSynthesis
     */
    readCurrentAloud() {
      if (!window.speechSynthesis || !this._state.storyData) return;

      window.speechSynthesis.cancel();

      const sd = this._state.storyData;
      let text = '';

      switch (this._state.currentRead) {
        case 0:
          text = "Let's read this story together, step by step!";
          break;
        case 1:
          text = sd.story.replace(/\d+/g, 'some') + ". What is this story about?";
          break;
        case 2:
          text = sd.story + ". What numbers do you see? What do they mean?";
          break;
        case 3:
          text = sd.story + ". " + sd.question + ". What are we trying to figure out?";
          break;
        default:
          text = sd.story + ". " + sd.question;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      // Try to use a child-friendly voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        v.name.includes('Samantha') || v.name.includes('Karen') ||
        v.name.includes('Google US English') || v.lang.startsWith('en')
      );
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
    },

    /**
     * Auto-enhance: find existing storyBanner elements and upgrade them
     * Call this after the DOM is ready and stories have loaded
     */
    autoEnhance() {
      const existingBanner = document.getElementById('storyBanner');
      if (!existingBanner || !window.VinculumStories) return;

      // Extract story data from the existing banner
      const toolName = window.location.pathname.split('/').pop().replace('.html', '');

      // Try to get fresh story data
      if (typeof VinculumStories !== 'undefined' && VinculumStories.getStory) {
        const storyData = VinculumStories.getStory(toolName, {});
        if (storyData && storyData.story) {
          // Wrap the banner in a container div for our system
          const wrapper = document.createElement('div');
          wrapper.id = 'threeReadsWrapper';
          existingBanner.parentNode.insertBefore(wrapper, existingBanner);
          existingBanner.remove();
          this.enhance(storyData, wrapper);
        }
      }
    },

    /**
     * Generate a 3-Reads banner HTML string for inline insertion
     * Use this when building the Explore mode HTML dynamically
     * @param {Object} storyData - {story: "...", question: "..."}
     * @returns {string} HTML string with the 3-Reads scaffolded banner
     */
    getBannerHTML(storyData) {
      if (!storyData || !storyData.story) return '';
      this._state.storyData = storyData;
      this._state.currentRead = 0;
      this._state.isEnhanced = true;
      return '<div id="threeReadsWrapper">' + this._buildBannerHTML(storyData, 0) + '</div>';
    },

    /**
     * Check if 3-Reads is currently active
     */
    isActive() {
      return this._state.isEnhanced && this._state.currentRead > 0;
    },

    /**
     * Get current read step (0-3)
     */
    getCurrentRead() {
      return this._state.currentRead;
    },

    /**
     * Reset to beginning
     */
    reset() {
      this._state.currentRead = 0;
      this._state.isEnhanced = false;
      window.speechSynthesis && window.speechSynthesis.cancel();
    }
  };

  // Expose globally — disabled by default until ready for classroom testing
  // To enable: set window.VINCULUM_3READS_ENABLED = true BEFORE this script loads
  // Or call: Vinculum3Reads.enable() from the console
  Vinculum3Reads.enable = function() { window.Vinculum3Reads = Vinculum3Reads; };
  if (window.VINCULUM_3READS_ENABLED) {
    window.Vinculum3Reads = Vinculum3Reads;
  }

})();
