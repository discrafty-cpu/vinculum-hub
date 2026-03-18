/* ═══════════════════════════════════════════════════════════
   SOCRATIC FLOW UI — Theme-Aware Interactive Panel
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   Renders a Socratic Flow session into any DOM container.
   Attaches to any app via a single button click.

   Features:
     - Theme-adaptive (reads PptxThemes or accepts theme object)
     - Slide-panel overlay or inline embed
     - Animated transitions between nodes
     - Progress bar, score tracker, hint system
     - Sentence frames for comfort levels 1-2
     - Visual rendering via MathVisualEngine
     - Reactive re-rendering on answer submission

   Dependencies: socratic-flow-engine.js
   Optional: pptx-themes.js, math-visual-engine.js, socratic-flow.css

   Usage — Button attachment (one line in any app):
     SocraticFlowUI.attachButton(document.getElementById('app'), {
       topic: 'ratios-and-rates', grade: 7
     });

   Usage — Inline embed:
     SocraticFlowUI.embed(containerEl, {
       topic: 'fractions', grade: 6, comfort: 2
     });
   ═══════════════════════════════════════════════════════════ */

const SocraticFlowUI = (() => {
    'use strict';

    // ════════════════════════════════════════════════
    //  THEME RESOLUTION
    // ════════════════════════════════════════════════

    function resolveTheme(options) {
        if (options && options.theme) return options.theme;
        if (typeof PptxThemes !== 'undefined') {
            try {
                const t = PptxThemes.getSelected();
                if (t && t.colors) return t;
            } catch (e) { /* fall through */ }
        }
        // Sensible defaults (Classic Academic)
        return {
            dark: false,
            colors: {
                bg: 'FFFFFF', bg2: 'F8FAFC', card: 'FFFFFF', card2: 'F1F5F9',
                border: 'E2E8F0', text: '1E293B', text2: '475569', muted: '94A3B8',
                primary: '1E2761', secondary: 'D4870F', accent: '3B82F6',
                accent2: '0D9488', accent3: 'E8436D', white: 'FFFFFF',
                headerBg: '1E2761', headerText: 'FFFFFF'
            },
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' }
        };
    }

    function h(hex) { return '#' + (hex || '000000').replace('#', ''); }

    function rgba(hex, alpha) {
        hex = (hex || '000000').replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // ════════════════════════════════════════════════
    //  CSS INJECTION (inline, no external file needed)
    // ════════════════════════════════════════════════

    let cssInjected = false;

    function injectCSS() {
        if (cssInjected) return;
        cssInjected = true;

        const style = document.createElement('style');
        style.id = 'socratic-flow-ui-styles';
        style.textContent = `
/* Socratic Flow UI — Inline Styles */
.sf-overlay {
    position: fixed; inset: 0; z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
    opacity: 0; transition: opacity 0.3s ease;
}
.sf-overlay.sf-visible { opacity: 1; }
.sf-overlay.sf-hidden { pointer-events: none; opacity: 0; }

.sf-panel {
    width: min(95vw, 640px); max-height: 90vh;
    border-radius: 16px; overflow: hidden;
    display: flex; flex-direction: column;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    transform: translateY(20px) scale(0.96);
    transition: transform 0.3s ease;
}
.sf-visible .sf-panel { transform: translateY(0) scale(1); }

.sf-header {
    padding: 16px 20px; display: flex; align-items: center; gap: 12px;
}
.sf-header-title { flex: 1; font-size: 18px; font-weight: 700; }
.sf-header-phase {
    font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
    padding: 3px 10px; border-radius: 99px; font-weight: 600;
}
.sf-close {
    width: 32px; height: 32px; border-radius: 8px; border: none;
    cursor: pointer; font-size: 18px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.2s;
}
.sf-close:hover { opacity: 0.7; }

.sf-progress-bar {
    height: 4px; width: 100%; position: relative;
}
.sf-progress-fill {
    height: 100%; transition: width 0.4s ease; border-radius: 0 2px 2px 0;
}

.sf-body {
    flex: 1; overflow-y: auto; padding: 24px 20px;
    display: flex; flex-direction: column; gap: 16px;
}

.sf-node { animation: sfSlideUp 0.35s ease both; }
@keyframes sfSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}

.sf-node-title {
    font-size: 20px; font-weight: 700; margin-bottom: 4px;
}
.sf-node-content {
    font-size: 15px; line-height: 1.6;
}
.sf-node-content strong { font-weight: 700; }

.sf-prompt {
    font-size: 16px; font-weight: 600; line-height: 1.5;
    padding: 16px; border-radius: 12px; border-left: 4px solid;
}

.sf-visual-container {
    text-align: center; padding: 12px 0;
}
.sf-visual-container img, .sf-visual-container svg {
    max-width: 100%; height: auto; border-radius: 8px;
}

.sf-answer-area {
    display: flex; flex-direction: column; gap: 8px;
}
.sf-answer-input {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    border: 2px solid; font-size: 15px; outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
}
.sf-answer-input:focus { border-color: currentColor; }

.sf-choice-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.sf-choice-btn {
    padding: 12px; border-radius: 10px; border: 2px solid;
    cursor: pointer; font-size: 14px; font-weight: 500;
    text-align: left; transition: all 0.2s;
}
.sf-choice-btn:hover { transform: translateY(-1px); }
.sf-choice-btn.sf-selected { font-weight: 700; }

.sf-actions {
    display: flex; gap: 8px; flex-wrap: wrap;
}
.sf-btn {
    padding: 10px 20px; border-radius: 10px; border: none;
    cursor: pointer; font-size: 14px; font-weight: 600;
    transition: all 0.2s;
}
.sf-btn:hover { transform: translateY(-1px); }
.sf-btn-primary { }
.sf-btn-secondary { }
.sf-btn-ghost {
    background: transparent; text-decoration: underline;
    padding: 10px 12px;
}

.sf-feedback {
    padding: 12px 16px; border-radius: 10px;
    font-size: 14px; font-weight: 500;
    animation: sfSlideUp 0.25s ease both;
}
.sf-feedback-correct { }
.sf-feedback-incorrect { }
.sf-feedback-partial { }

.sf-socratic-follow {
    font-size: 14px; font-style: italic; padding: 8px 0;
}

.sf-hint {
    padding: 10px 14px; border-radius: 8px;
    font-size: 13px; border-left: 3px solid;
    animation: sfSlideUp 0.25s ease both;
}

.sf-sentence-frames {
    display: flex; flex-direction: column; gap: 4px;
    padding: 10px 14px; border-radius: 8px;
    font-size: 13px;
}
.sf-sentence-frames-label {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;
    font-weight: 600; margin-bottom: 2px;
}
.sf-sentence-frame {
    cursor: pointer; padding: 4px 0; transition: opacity 0.2s;
}
.sf-sentence-frame:hover { opacity: 0.7; }

.sf-scaffold {
    padding: 14px 16px; border-radius: 10px; border-left: 4px solid;
    font-size: 14px;
}

.sf-celebrate {
    text-align: center; padding: 24px 16px;
}
.sf-celebrate-icon { font-size: 48px; margin-bottom: 12px; }

.sf-footer {
    padding: 12px 20px; display: flex; align-items: center; gap: 12px;
    font-size: 12px; border-top: 1px solid;
}
.sf-score {
    display: flex; gap: 12px; flex: 1;
}
.sf-score-item { display: flex; align-items: center; gap: 4px; }

.sf-reveal-answer {
    padding: 14px 16px; border-radius: 10px;
    font-size: 15px; line-height: 1.5;
}
.sf-reveal-label {
    font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
    font-weight: 700; margin-bottom: 6px;
}

/* Trigger button */
.sf-trigger-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px; border: 2px solid;
    cursor: pointer; font-size: 14px; font-weight: 600;
    transition: all 0.2s; background: transparent;
}
.sf-trigger-btn:hover { transform: translateY(-1px); }
.sf-trigger-btn svg { width: 18px; height: 18px; }

/* Inline embed mode */
.sf-inline {
    border-radius: 16px; overflow: hidden;
    display: flex; flex-direction: column;
    border: 2px solid;
}
.sf-inline .sf-body { max-height: 500px; }

/* Summary screen */
.sf-summary { text-align: center; padding: 20px; }
.sf-summary-score { font-size: 36px; font-weight: 800; margin: 12px 0; }
.sf-summary-label { font-size: 14px; }
.sf-summary-mastery {
    display: inline-block; padding: 6px 16px; border-radius: 99px;
    font-size: 13px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1px; margin-top: 12px;
}
.sf-summary-details { margin-top: 16px; font-size: 13px; }
`;
        document.head.appendChild(style);
    }

    // ════════════════════════════════════════════════
    //  PANEL RENDERER
    // ════════════════════════════════════════════════

    class FlowPanel {
        constructor(session, options) {
            this.session = session;
            this.options = options || {};
            this.theme = resolveTheme(options);
            this.mode = options.mode || 'overlay'; // 'overlay' | 'inline'
            this.el = null;
            this.bodyEl = null;
            this.currentAnswer = '';
            this._destroyed = false;

            injectCSS();
            this._build();
            this._renderCurrentNode();

            // Wire session events
            this.session.onNodeChange(() => this._renderCurrentNode());
            this.session.onComplete((summary) => this._renderSummary(summary));
            this.session.onScoreChange(() => this._updateScore());
        }

        // ── Build DOM structure ──
        _build() {
            const C = this.theme.colors;
            const dark = this.theme.dark;

            if (this.mode === 'overlay') {
                this.el = document.createElement('div');
                this.el.className = 'sf-overlay sf-hidden';
                this.el.innerHTML = `
                    <div class="sf-panel" style="background:${h(C.bg)};color:${h(C.text)}">
                        ${this._headerHTML()}
                        <div class="sf-progress-bar" style="background:${h(C.border)}">
                            <div class="sf-progress-fill" style="width:0%;background:${h(C.accent)}"></div>
                        </div>
                        <div class="sf-body"></div>
                        ${this._footerHTML()}
                    </div>
                `;
                document.body.appendChild(this.el);
                this.bodyEl = this.el.querySelector('.sf-body');

                // Animate in
                requestAnimationFrame(() => {
                    this.el.classList.remove('sf-hidden');
                    this.el.classList.add('sf-visible');
                });

                // Close on overlay click
                this.el.addEventListener('click', (e) => {
                    if (e.target === this.el) this.close();
                });

                // Close button
                this.el.querySelector('.sf-close').addEventListener('click', () => this.close());
            } else {
                // Inline mode
                const container = this.options.container;
                this.el = document.createElement('div');
                this.el.className = 'sf-inline';
                this.el.style.borderColor = h(C.border);
                this.el.style.background = h(C.bg);
                this.el.style.color = h(C.text);
                this.el.innerHTML = `
                    ${this._headerHTML()}
                    <div class="sf-progress-bar" style="background:${h(C.border)}">
                        <div class="sf-progress-fill" style="width:0%;background:${h(C.accent)}"></div>
                    </div>
                    <div class="sf-body"></div>
                    ${this._footerHTML()}
                `;
                container.appendChild(this.el);
                this.bodyEl = this.el.querySelector('.sf-body');

                this.el.querySelector('.sf-close').addEventListener('click', () => this.close());
            }
        }

        _headerHTML() {
            const C = this.theme.colors;
            const flow = this.session.flow;
            const grade = flow.grade || this.session.grade || '';
            const topic = flow.topic || '';
            const standards = flow.standards || {};

            // Build standards badges — auto-renders ANY alignment framework present
            const FRAMEWORK_LABELS = {
                ccss: 'CCSS', mn: 'MN', teks: 'TEKS', ngss: 'NGSS',
                ibo: 'IB', act: 'ACT', sat: 'SAT', ap: 'AP'
            };
            let standardsHTML = '';
            for (const [key, codes] of Object.entries(standards)) {
                if (!Array.isArray(codes) || codes.length === 0) continue;
                const label = FRAMEWORK_LABELS[key] || key.toUpperCase();
                standardsHTML += `<span class="sf-std-badge" style="background:${rgba(C.white || 'FFFFFF', 0.15)};color:${h(C.headerText || C.white)};font-size:10px;padding:2px 6px;border-radius:4px;margin-left:4px" title="${label}: ${codes.join(', ')}">${label} ${codes[0]}${codes.length > 1 ? '+' + (codes.length - 1) : ''}</span>`;
            }

            return `
                <div class="sf-header" style="background:${h(C.headerBg || C.primary)};color:${h(C.headerText || C.white)}">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div class="sf-header-title">${this._escHTML(flow.title || 'Socratic Flow')}</div>
                    <div class="sf-header-phase" style="background:${rgba(C.white || 'FFFFFF', 0.2)};color:${h(C.headerText || C.white)}">
                        ${this.session.getPhase().toUpperCase()}
                    </div>
                    <button class="sf-close" style="background:${rgba(C.white || 'FFFFFF', 0.15)};color:${h(C.headerText || C.white)}">&times;</button>
                </div>
                <div class="sf-meta" style="background:${rgba(C.headerBg || C.primary, 0.85)};color:${h(C.headerText || C.white)};padding:4px 16px;font-size:11px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                    ${grade ? `<span style="font-weight:600">Grade ${grade}</span><span style="opacity:0.4">|</span>` : ''}
                    <span style="opacity:0.85;text-transform:capitalize">${this._escHTML(topic)}</span>
                    ${standardsHTML ? `<span style="opacity:0.4">|</span>${standardsHTML}` : ''}
                </div>
            `;
        }

        _footerHTML() {
            const C = this.theme.colors;
            return `
                <div class="sf-footer" style="border-color:${h(C.border)};color:${h(C.text2 || C.muted)}">
                    <div class="sf-score">
                        <span class="sf-score-item"><span style="color:${h(C.accent2 || '0D9488')}">&#10003;</span> <span class="sf-score-correct">0</span></span>
                        <span class="sf-score-item"><span style="color:${h(C.accent3 || 'E8436D')}">&#10007;</span> <span class="sf-score-incorrect">0</span></span>
                    </div>
                    <span>Socratic Flow</span>
                </div>
            `;
        }

        // ── Render the current node ──
        _renderCurrentNode() {
            if (this._destroyed) return;
            const node = this.session.getCurrentNode();
            if (!node) return;

            this._updateProgressBar();
            this._updatePhase();
            this.currentAnswer = '';

            const C = this.theme.colors;
            let html = '<div class="sf-node">';

            switch (node.type) {
                case 'story':
                    html += this._storyHTML(node);
                    break;
                case 'question':
                    html += this._questionHTML(node);
                    break;
                case 'visual':
                    html += this._visualHTML(node);
                    break;
                case 'reveal':
                    html += this._revealHTML(node);
                    break;
                case 'scaffold':
                    html += this._scaffoldHTML(node);
                    break;
                case 'celebrate':
                    html += this._celebrateHTML(node);
                    break;
                case 'checkpoint':
                    html += this._checkpointHTML(node);
                    break;
                default:
                    html += this._storyHTML(node);
            }

            html += '</div>';

            this.bodyEl.innerHTML = html;
            this._bindNodeEvents(node);
            this.bodyEl.scrollTop = 0;
        }

        _storyHTML(node) {
            const C = this.theme.colors;
            return `
                ${node.title ? `<div class="sf-node-title">${this._escHTML(node.title)}</div>` : ''}
                <div class="sf-node-content">${this._renderMarkdown(node.content || '')}</div>
                <div class="sf-actions" style="margin-top:16px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        Continue
                    </button>
                </div>
            `;
        }

        _questionHTML(node) {
            const C = this.theme.colors;
            let html = '';

            // Prompt
            html += `<div class="sf-prompt" style="background:${h(C.questionBg || C.card2 || 'FFFBEB')};border-color:${h(C.secondary || 'D4870F')};color:${h(C.text)}">
                ${this._renderMarkdown(node.prompt)}
            </div>`;

            // Visual (if any)
            const visual = this.session.getVisual();
            if (visual) {
                html += `<div class="sf-visual-container"><img src="${visual}" alt="Math visual"/></div>`;
            }

            // Sentence frames (comfort levels 1-2)
            const frames = this.session.getSentenceFrames();
            if (frames.length > 0) {
                html += `<div class="sf-sentence-frames" style="background:${h(C.card2 || C.bg2 || 'F1F5F9')};color:${h(C.text2 || C.text)}">
                    <div class="sf-sentence-frames-label" style="color:${h(C.muted)}">Sentence starters</div>
                    ${frames.map(f => `<div class="sf-sentence-frame" data-frame="${this._escAttr(f)}">${this._escHTML(f)}</div>`).join('')}
                </div>`;
            }

            // Answer input
            if (node.accept && node.accept.choice) {
                // Multiple choice
                const choices = node.choices || [];
                html += `<div class="sf-choice-grid">
                    ${choices.map((c, i) => {
                        const letter = String.fromCharCode(97 + i);
                        return `<button class="sf-choice-btn" data-choice="${letter}" style="border-color:${h(C.border)};background:${h(C.card)};color:${h(C.text)}">
                            <strong>${letter.toUpperCase()}.</strong> ${this._escHTML(c)}
                        </button>`;
                    }).join('')}
                </div>`;
            } else {
                // Free response
                html += `<div class="sf-answer-area">
                    <input type="text" class="sf-answer-input" placeholder="Type your answer..."
                        style="border-color:${h(C.border)};background:${h(C.card)};color:${h(C.text)}" />
                </div>`;
            }

            // Action buttons
            html += `<div class="sf-actions" style="margin-top:8px">
                <button class="sf-btn sf-btn-primary sf-submit" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                    Check Answer
                </button>
                <button class="sf-btn sf-btn-secondary sf-hint-btn" style="background:${h(C.card2 || C.bg2 || 'F1F5F9')};color:${h(C.text)}">
                    Hint
                </button>
                <button class="sf-btn sf-btn-ghost sf-skip" style="color:${h(C.muted)}">
                    Skip
                </button>
            </div>`;

            // Feedback area (empty, filled on submit)
            html += '<div class="sf-feedback-area"></div>';

            return html;
        }

        _revealHTML(node) {
            const C = this.theme.colors;
            return `
                <div class="sf-reveal-answer" style="background:${h(C.targetBg || C.card2 || 'EFF6FF')};color:${h(C.text)}">
                    <div class="sf-reveal-label" style="color:${h(C.accent)}">Answer</div>
                    <div>${this._renderMarkdown(node.content || '')}</div>
                    ${node.explanation ? `<div style="margin-top:8px;font-size:13px;color:${h(C.text2 || C.muted)}">${this._escHTML(node.explanation)}</div>` : ''}
                </div>
                <div class="sf-actions" style="margin-top:16px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        Next Question
                    </button>
                </div>
            `;
        }

        _scaffoldHTML(node) {
            const C = this.theme.colors;
            return `
                <div class="sf-scaffold" style="background:${h(C.questionBg || 'FFFBEB')};border-color:${h(C.secondary || 'D4870F')};color:${h(C.text)}">
                    ${node.title ? `<strong>${this._escHTML(node.title)}</strong><br/>` : ''}
                    ${this._renderMarkdown(node.content || '')}
                </div>
                <div class="sf-actions" style="margin-top:16px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        I'm Ready
                    </button>
                </div>
            `;
        }

        _celebrateHTML(node) {
            const C = this.theme.colors;
            return `
                <div class="sf-celebrate">
                    <div class="sf-celebrate-icon" aria-hidden="true">&#9733;</div>
                    <div class="sf-node-title" style="font-size:24px">${this._escHTML(node.title || 'Well Done!')}</div>
                    <div class="sf-node-content" style="margin-top:8px">${this._renderMarkdown(node.content || '')}</div>
                </div>
                <div class="sf-actions" style="justify-content:center;margin-top:16px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        ${node.next ? 'Continue' : 'Finish'}
                    </button>
                </div>
            `;
        }

        _visualHTML(node) {
            const C = this.theme.colors;
            const visual = this.session.getVisual();
            return `
                ${node.title ? `<div class="sf-node-title">${this._escHTML(node.title)}</div>` : ''}
                ${node.content ? `<div class="sf-node-content">${this._renderMarkdown(node.content)}</div>` : ''}
                ${visual ? `<div class="sf-visual-container"><img src="${visual}" alt="Math visual"/></div>` : ''}
                <div class="sf-actions" style="margin-top:16px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        Continue
                    </button>
                </div>
            `;
        }

        _checkpointHTML(node) {
            return this._storyHTML(node);
        }

        // ── Event binding ──
        _bindNodeEvents(node) {
            const body = this.bodyEl;

            // Advance buttons
            body.querySelectorAll('.sf-advance').forEach(btn => {
                btn.addEventListener('click', () => {
                    // Check for reactive performance adaptation
                    this.session.reactToPerformance();
                    this.session.advance();
                });
            });

            // Answer input (Enter key)
            const input = body.querySelector('.sf-answer-input');
            if (input) {
                input.focus();
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this._handleSubmit();
                });
                input.addEventListener('input', (e) => {
                    this.currentAnswer = e.target.value;
                });
            }

            // Submit button
            const submitBtn = body.querySelector('.sf-submit');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => this._handleSubmit());
            }

            // Hint button
            const hintBtn = body.querySelector('.sf-hint-btn');
            if (hintBtn) {
                hintBtn.addEventListener('click', () => this._handleHint());
            }

            // Skip button
            const skipBtn = body.querySelector('.sf-skip');
            if (skipBtn) {
                skipBtn.addEventListener('click', () => this.session.skip());
            }

            // Choice buttons
            body.querySelectorAll('.sf-choice-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    body.querySelectorAll('.sf-choice-btn').forEach(b => b.classList.remove('sf-selected'));
                    btn.classList.add('sf-selected');
                    const C = this.theme.colors;
                    btn.style.borderColor = h(C.accent);
                    btn.style.background = h(C.targetBg || C.card2 || 'EFF6FF');
                    this.currentAnswer = btn.dataset.choice;
                });
            });

            // Sentence frame click → fill input
            body.querySelectorAll('.sf-sentence-frame').forEach(frame => {
                frame.addEventListener('click', () => {
                    if (input) {
                        input.value = frame.dataset.frame;
                        this.currentAnswer = frame.dataset.frame;
                        input.focus();
                    }
                });
            });
        }

        _handleSubmit() {
            if (!this.currentAnswer.trim()) return;

            const result = this.session.submitAnswer(this.currentAnswer);
            const C = this.theme.colors;
            const feedbackArea = this.bodyEl.querySelector('.sf-feedback-area');
            if (!feedbackArea) return;

            let html = '';

            // Feedback message
            const feedbackClass = result.result === 'correct' ? 'sf-feedback-correct'
                : result.result === 'partial' ? 'sf-feedback-partial'
                : 'sf-feedback-incorrect';

            const feedbackBg = result.result === 'correct' ? (C.accent2 || '0D9488')
                : result.result === 'partial' ? (C.secondary || 'D4870F')
                : (C.accent3 || 'E8436D');

            html += `<div class="sf-feedback ${feedbackClass}" style="background:${rgba(feedbackBg, 0.12)};color:${h(feedbackBg)}">
                ${this._escHTML(result.feedback || '')}
            </div>`;

            // Scaffold on incorrect
            if (result.scaffold && result.result === 'incorrect') {
                html += `<div class="sf-hint" style="background:${h(C.questionBg || 'FFFBEB')};border-color:${h(C.secondary || 'D4870F')};color:${h(C.text)}">
                    ${this._escHTML(result.scaffold)}
                </div>`;
            }

            // Socratic follow-up
            if (result.socraticFollow && result.result !== 'incorrect') {
                html += `<div class="sf-socratic-follow" style="color:${h(C.text2 || C.muted)}">
                    ${this._escHTML(result.socraticFollow)}
                </div>`;
            }

            // Next button on correct/partial
            if (result.result === 'correct' || result.result === 'partial') {
                html += `<div class="sf-actions" style="margin-top:8px">
                    <button class="sf-btn sf-btn-primary sf-advance" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                        Continue
                    </button>
                </div>`;
            }

            feedbackArea.innerHTML = html;

            // Rebind advance buttons in feedback area
            feedbackArea.querySelectorAll('.sf-advance').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.session.reactToPerformance();
                    this.session.advance();
                });
            });

            // Update score display
            this._updateScore();

            // Disable input on correct
            if (result.result === 'correct') {
                const input = this.bodyEl.querySelector('.sf-answer-input');
                if (input) input.disabled = true;
                const submitBtn = this.bodyEl.querySelector('.sf-submit');
                if (submitBtn) submitBtn.disabled = true;
            }
        }

        _handleHint() {
            const hint = this.session.getHint();
            if (!hint) return;

            const C = this.theme.colors;
            const feedbackArea = this.bodyEl.querySelector('.sf-feedback-area');
            if (!feedbackArea) return;

            // Append hint (don't replace existing feedback)
            const hintEl = document.createElement('div');
            hintEl.className = 'sf-hint';
            hintEl.style.background = h(C.card2 || C.bg2 || 'F1F5F9');
            hintEl.style.borderColor = h(C.accent || '3B82F6');
            hintEl.style.color = h(C.text);
            hintEl.textContent = hint;
            feedbackArea.appendChild(hintEl);
        }

        // ── Update helpers ──

        _updateProgressBar() {
            const progress = this.session.getProgress();
            const fill = this.el.querySelector('.sf-progress-fill');
            if (fill) fill.style.width = progress.percent + '%';
        }

        _updatePhase() {
            const phaseEl = this.el.querySelector('.sf-header-phase');
            if (phaseEl) phaseEl.textContent = this.session.getPhase().toUpperCase();
        }

        _updateScore() {
            const score = this.session.getScore();
            const correctEl = this.el.querySelector('.sf-score-correct');
            const incorrectEl = this.el.querySelector('.sf-score-incorrect');
            if (correctEl) correctEl.textContent = score.correct;
            if (incorrectEl) incorrectEl.textContent = score.incorrect;
        }

        // ── Summary screen ──
        _renderSummary(summary) {
            if (this._destroyed) return;

            const C = this.theme.colors;
            const total = summary.score.correct + summary.score.incorrect + summary.score.partial;
            const pct = total > 0 ? Math.round((summary.score.correct / total) * 100) : 0;
            const elapsed = Math.round(summary.elapsed / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            const masteryColors = {
                mastered: C.accent2 || '0D9488',
                developing: C.secondary || 'D4870F',
                emerging: C.accent3 || 'E8436D',
                'not-assessed': C.muted || '94A3B8'
            };

            this.bodyEl.innerHTML = `
                <div class="sf-node sf-summary">
                    <div class="sf-celebrate-icon" aria-hidden="true">&#9733;</div>
                    <div class="sf-node-title" style="font-size:22px">${this._escHTML(summary.title || 'Session Complete')}</div>
                    <div class="sf-summary-score" style="color:${h(C.accent)}">${pct}%</div>
                    <div class="sf-summary-label" style="color:${h(C.text2 || C.muted)}">
                        ${summary.score.correct} correct &middot; ${summary.score.incorrect} incorrect &middot; ${summary.score.partial} partial
                    </div>
                    <div class="sf-summary-mastery" style="background:${rgba(masteryColors[summary.mastery] || C.muted, 0.15)};color:${h(masteryColors[summary.mastery] || C.muted)}">
                        ${summary.mastery}
                    </div>
                    <div class="sf-summary-details" style="color:${h(C.text2 || C.muted)}">
                        Time: ${minutes}m ${seconds}s &middot; Grade ${summary.grade} &middot; Comfort Level ${summary.comfort}
                    </div>
                    <div class="sf-actions" style="justify-content:center;margin-top:20px">
                        <button class="sf-btn sf-btn-primary sf-restart" style="background:${h(C.accent)};color:${h(C.white || 'FFFFFF')}">
                            Try Again
                        </button>
                        <button class="sf-btn sf-btn-secondary sf-close-final" style="background:${h(C.card2 || C.bg2 || 'F1F5F9')};color:${h(C.text)}">
                            Done
                        </button>
                    </div>
                </div>
            `;

            // Progress bar to 100%
            const fill = this.el.querySelector('.sf-progress-fill');
            if (fill) fill.style.width = '100%';

            // Bind buttons
            const restartBtn = this.bodyEl.querySelector('.sf-restart');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    this._restart();
                });
            }

            const closeBtn = this.bodyEl.querySelector('.sf-close-final');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.close());
            }
        }

        _restart() {
            // Create a new session with the same options
            const newSession = SocraticFlowEngine.start(
                this.session.flow.topic || this.session.flow.id,
                this.options
            );
            this.session = newSession;
            this.session.onNodeChange(() => this._renderCurrentNode());
            this.session.onComplete((summary) => this._renderSummary(summary));
            this.session.onScoreChange(() => this._updateScore());

            // Reset UI
            this._updateScore();
            this._renderCurrentNode();
        }

        // ── Close / destroy ──
        close() {
            this._destroyed = true;
            if (this.mode === 'overlay') {
                this.el.classList.remove('sf-visible');
                this.el.classList.add('sf-hidden');
                setTimeout(() => {
                    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
                }, 300);
            } else {
                if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
            }
            if (this.options.onClose) this.options.onClose();
        }

        // ── Utilities ──
        _escHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        _escAttr(str) {
            return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }

        _renderMarkdown(text) {
            // Minimal markdown: **bold**, *italic*, `code`, line breaks
            return text
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/`(.+?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br/>');
        }
    }

    // ════════════════════════════════════════════════
    //  TRIGGER BUTTON — Drop into any app
    // ════════════════════════════════════════════════

    function createTriggerButton(options) {
        const theme = resolveTheme(options);
        const C = theme.colors;

        const btn = document.createElement('button');
        btn.className = 'sf-trigger-btn';
        btn.style.borderColor = h(C.accent);
        btn.style.color = h(C.accent);
        btn.title = 'Start Socratic Flow';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Socratic Mode
        `;

        injectCSS();

        btn.addEventListener('click', () => {
            const session = SocraticFlowEngine.start(options.topic || 'math', {
                grade: options.grade,
                comfort: options.comfort || 2,
                theme: theme
            });
            new FlowPanel(session, { mode: 'overlay', theme: theme, ...options });
        });

        return btn;
    }

    // ════════════════════════════════════════════════
    //  TOPIC PICKER — When no topic specified
    // ════════════════════════════════════════════════

    function showTopicPicker(options) {
        const theme = resolveTheme(options);
        const C = theme.colors;
        const topics = SocraticFlowEngine.listTopics();

        injectCSS();

        const overlay = document.createElement('div');
        overlay.className = 'sf-overlay sf-hidden';
        overlay.innerHTML = `
            <div class="sf-panel" style="background:${h(C.bg)};color:${h(C.text)}">
                <div class="sf-header" style="background:${h(C.headerBg || C.primary)};color:${h(C.headerText || C.white)}">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <div class="sf-header-title">Choose a Topic</div>
                    <button class="sf-close" style="background:${rgba(C.white || 'FFFFFF', 0.15)};color:${h(C.headerText || C.white)}">&times;</button>
                </div>
                <div class="sf-body" style="max-height:70vh">
                    ${topics.map(t => `
                        <button class="sf-choice-btn sf-topic-pick" data-topic="${t}" style="border-color:${h(C.border)};background:${h(C.card)};color:${h(C.text)}">
                            ${t.replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                    `).join('')}
                    ${topics.length === 0 ? '<p style="text-align:center;opacity:0.5">No topics available. Load DOK_PROBLEMS or SOCRATIC_FLOWS data.</p>' : ''}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
            overlay.classList.remove('sf-hidden');
            overlay.classList.add('sf-visible');
        });

        overlay.querySelector('.sf-close').addEventListener('click', () => {
            overlay.classList.remove('sf-visible');
            overlay.classList.add('sf-hidden');
            setTimeout(() => overlay.remove(), 300);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('sf-visible');
                overlay.classList.add('sf-hidden');
                setTimeout(() => overlay.remove(), 300);
            }
        });

        overlay.querySelectorAll('.sf-topic-pick').forEach(btn => {
            btn.addEventListener('click', () => {
                overlay.remove();
                const session = SocraticFlowEngine.start(btn.dataset.topic, {
                    grade: options.grade,
                    comfort: options.comfort || 2,
                    theme: theme
                });
                new FlowPanel(session, { mode: 'overlay', theme: theme, ...options });
            });
        });
    }

    // ════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════

    return {
        /**
         * Attach a "Socratic Mode" button to any container element.
         * One line to add Socratic flow to any app.
         *
         * @param {HTMLElement} container - Element to append button to
         * @param {Object} options - { topic, grade, comfort, theme, onClose }
         */
        attachButton(container, options) {
            const opts = options || {};
            const btn = createTriggerButton(opts);
            container.appendChild(btn);
            return btn;
        },

        /**
         * Embed a Socratic flow inline (no overlay).
         *
         * @param {HTMLElement} container - Element to render into
         * @param {Object} options - { topic, grade, comfort, theme }
         * @returns {FlowPanel}
         */
        embed(container, options) {
            const opts = { ...options, mode: 'inline', container };
            const session = SocraticFlowEngine.start(opts.topic || 'math', {
                grade: opts.grade,
                comfort: opts.comfort || 2,
                theme: resolveTheme(opts)
            });
            return new FlowPanel(session, opts);
        },

        /**
         * Open the Socratic flow in an overlay (programmatic).
         */
        open(options) {
            const opts = options || {};
            if (!opts.topic) {
                showTopicPicker(opts);
                return;
            }
            const theme = resolveTheme(opts);
            const session = SocraticFlowEngine.start(opts.topic, {
                grade: opts.grade,
                comfort: opts.comfort || 2,
                theme: theme
            });
            return new FlowPanel(session, { mode: 'overlay', theme: theme, ...opts });
        },

        /**
         * Show topic picker overlay, then start the selected flow.
         */
        showTopicPicker,

        /**
         * Create a trigger button without attaching (for manual placement).
         */
        createButton: createTriggerButton,

        /**
         * Update theme on all active instances.
         */
        setTheme(theme) {
            // For future use — currently panels capture theme at creation
        }
    };
})();
