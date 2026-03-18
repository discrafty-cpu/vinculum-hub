/* ═══════════════════════════════════════════════════════════
   PPTX THEMES — 10 Layout Style Definitions
   Lesson Digester · Drummond Math Solutions
   v1.0 — March 2026

   Each theme provides:
     id          — unique key
     name        — display name
     tag         — short descriptor
     group       — 'original' | 'vinculum'
     desc        — one-line description
     colors      — PptxGenJS-compatible hex colors (no #)
     fonts       — { heading, body, mono }
     dark        — boolean, true = dark background slide master
     preview     — mini SVG data-uri for the selector thumbnail
     helpers     — optional slide-building overrides (future)

   Usage:
     const theme = PptxThemes.get('vinculum-dark');
     const C = theme.colors;
   ═══════════════════════════════════════════════════════════ */

const PptxThemes = (() => {
    const THEMES = {
        // ─── Original 5 ───────────────────────────────────────────

        'classic-academic': {
            id: 'classic-academic',
            name: 'Classic Academic',
            tag: 'Structured · Professional',
            group: 'original',
            desc: 'Navy headers, amber accents, white backgrounds — formal and familiar.',
            dark: false,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: 'FFFFFF', bg2: 'F8FAFC', card: 'FFFFFF', card2: 'F1F5F9',
                border: 'E2E8F0', text: '1E293B', text2: '475569', muted: '94A3B8',
                primary: '1E2761', secondary: 'D4870F', accent: '3B82F6',
                accent2: '0D9488', accent3: 'E8436D', white: 'FFFFFF',
                headerBg: '1E2761', headerText: 'FFFFFF',
                targetBg: 'EFF6FF', targetBorder: '3B82F6',
                questionBg: 'FFFBEB', questionBorder: 'D4870F',
                exitBg: '1E2761', exitText: 'FFFFFF'
            },
            swatch: ['1E2761','D4870F','3B82F6','0D9488','E8436D','FFFFFF'],
            categoryColors: {
                unitDesign:  { primary: '1E2761', tint: 'EFF6FF' },
                community:   { primary: '7C3AED', tint: 'F5F3FF' },
                clarity:     { primary: '0D9488', tint: 'F0FDFA' },
                delivery:    { primary: 'D4870F', tint: 'FFFBEB' },
                assessment:  { primary: 'E8436D', tint: 'FEF2F2' }
            }
        },

        'warm-workshop': {
            id: 'warm-workshop',
            name: 'Warm Workshop',
            tag: 'Collaborative · Card-Based',
            group: 'original',
            desc: 'Cream backgrounds, rounded cards, friendly stations — ideal for K-5.',
            dark: false,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: 'FFFBEB', bg2: 'FFF8E1', card: 'FFFFFF', card2: 'FEF3C7',
                border: 'F5E6C8', text: '44403C', text2: '78716C', muted: 'A8A29E',
                primary: '92400E', secondary: 'D4870F', accent: '0D9488',
                accent2: 'E8436D', accent3: '7C2D12', white: 'FFFFFF',
                headerBg: '7C2D12', headerText: 'FFFFFF',
                targetBg: 'F0FDFA', targetBorder: '0D9488',
                questionBg: 'FEF3C7', questionBorder: 'D4870F',
                exitBg: '92400E', exitText: 'FFFFFF'
            },
            swatch: ['92400E','D4870F','0D9488','E8436D','FEF3C7','FFFFFF'],
            categoryColors: {
                unitDesign:  { primary: '92400E', tint: 'FFFBEB' },
                community:   { primary: '7C2D12', tint: 'FEF3C7' },
                clarity:     { primary: '0D9488', tint: 'F0FDFA' },
                delivery:    { primary: 'D4870F', tint: 'FEF9EF' },
                assessment:  { primary: 'E8436D', tint: 'FEF2F2' }
            }
        },

        'bold-modern': {
            id: 'bold-modern',
            name: 'Bold Modern',
            tag: 'High Contrast · Minimal',
            group: 'original',
            desc: 'Dark backgrounds, large type, one idea per slide — TED Talk inspired.',
            dark: true,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: '000000', bg2: '111111', card: '1E293B', card2: '0F172A',
                border: '334155', text: 'FFFFFF', text2: 'CBD5E1', muted: '64748B',
                primary: '3B82F6', secondary: 'F59E0B', accent: '3B82F6',
                accent2: '10B981', accent3: 'F472B6', white: 'FFFFFF',
                headerBg: '000000', headerText: '3B82F6',
                targetBg: '1E293B', targetBorder: '3B82F6',
                questionBg: '1E293B', questionBorder: 'F59E0B',
                exitBg: '000000', exitText: '10B981'
            },
            swatch: ['000000','3B82F6','F59E0B','10B981','F472B6','FFFFFF'],
            categoryColors: {
                unitDesign:  { primary: '3B82F6', tint: '1E293B' },
                community:   { primary: 'F472B6', tint: '1E293B' },
                clarity:     { primary: '10B981', tint: '1E293B' },
                delivery:    { primary: 'F59E0B', tint: '1E293B' },
                assessment:  { primary: 'F87171', tint: '1E293B' }
            }
        },

        'visual-story': {
            id: 'visual-story',
            name: 'Visual Story',
            tag: 'Image-Led · Narrative',
            group: 'original',
            desc: 'Real-world context, image areas, narrative flow — great for ELL.',
            dark: false,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: 'F0FDFA', bg2: 'FFFFFF', card: 'FFFFFF', card2: 'CCFBF1',
                border: '99F6E4', text: '134E4A', text2: '3B7A75', muted: '64948C',
                primary: '0F766E', secondary: '0D9488', accent: '14B8A6',
                accent2: '115E59', accent3: '99F6E4', white: 'FFFFFF',
                headerBg: '0F766E', headerText: 'FFFFFF',
                targetBg: 'F0FDFA', targetBorder: '0D9488',
                questionBg: 'CCFBF1', questionBorder: '14B8A6',
                exitBg: '115E59', exitText: 'FFFFFF'
            },
            swatch: ['0F766E','0D9488','14B8A6','99F6E4','F0FDFA','FFFFFF'],
            categoryColors: {
                unitDesign:  { primary: '0F766E', tint: 'F0FDFA' },
                community:   { primary: '115E59', tint: 'CCFBF1' },
                clarity:     { primary: '0D9488', tint: 'F0FDFA' },
                delivery:    { primary: '14B8A6', tint: 'CCFBF1' },
                assessment:  { primary: '0F766E', tint: 'F0FDFA' }
            }
        },

        'interactive-notebook': {
            id: 'interactive-notebook',
            name: 'Interactive Notebook',
            tag: 'Sketch · Handwritten',
            group: 'original',
            desc: 'Lined paper, sketch borders, write-here zones — print friendly.',
            dark: false,
            fonts: { heading: 'Comic Sans MS', body: 'Comic Sans MS', mono: 'Courier New' },
            colors: {
                bg: 'FEF9EF', bg2: 'FDF6E3', card: 'FFFFFF', card2: 'F5E6C8',
                border: 'D6C9A6', text: '44403C', text2: '78716C', muted: 'A8A29E',
                primary: 'D4870F', secondary: '92400E', accent: '0D9488',
                accent2: 'E8436D', accent3: 'FCD34D', white: 'FFFFFF',
                headerBg: 'FEF9EF', headerText: '44403C',
                targetBg: 'FEF9EF', targetBorder: 'D4870F',
                questionBg: 'FEF3C7', questionBorder: 'D4870F',
                exitBg: 'FEF9EF', exitText: '44403C'
            },
            swatch: ['D4870F','92400E','0D9488','E8436D','FEF9EF','D6C9A6'],
            categoryColors: {
                unitDesign:  { primary: 'D4870F', tint: 'FEF9EF' },
                community:   { primary: '92400E', tint: 'FEF3C7' },
                clarity:     { primary: '0D9488', tint: 'F0FDFA' },
                delivery:    { primary: 'D4870F', tint: 'FFFBEB' },
                assessment:  { primary: 'E8436D', tint: 'FEF2F2' }
            }
        },

        // ─── Vinculum 5 ──────────────────────────────────────────

        'vinculum-dark': {
            id: 'vinculum-dark',
            name: 'Vinculum Dark Core',
            tag: 'Glassmorphism · Gradient',
            group: 'vinculum',
            desc: 'Flagship Vinculum theme — dark navy, cyan→purple gradients, glass cards.',
            dark: true,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: '0A0E1A', bg2: '111827', card: '1A2236', card2: '1F2A42',
                border: '2A3654', text: 'E8EDF5', text2: '8B9CC0', muted: '5A6B8F',
                primary: '00D4FF', secondary: 'B388FF', accent: '00D4FF',
                accent2: '00E676', accent3: 'FF3B8B', white: 'FFFFFF',
                headerBg: '0A0E1A', headerText: '00D4FF',
                targetBg: '1A2236', targetBorder: '00D4FF',
                questionBg: '1A2236', questionBorder: 'B388FF',
                exitBg: '0A0E1A', exitText: '00E676',
                cyan: '00D4FF', pink: 'FF3B8B', yellow: 'FFC107',
                green: '00E676', purple: 'B388FF', orange: 'FF9100'
            },
            swatch: ['0A0E1A','00D4FF','B388FF','00E676','FF3B8B','FF9100'],
            categoryColors: {
                unitDesign:  { primary: '00D4FF', tint: '1A2236' },
                community:   { primary: 'B388FF', tint: '1A2236' },
                clarity:     { primary: '00E676', tint: '1A2236' },
                delivery:    { primary: '00D4FF', tint: '1A2236' },
                assessment:  { primary: 'FF3B8B', tint: '1A2236' }
            }
        },

        'neon-forge': {
            id: 'neon-forge',
            name: 'Neon Forge',
            tag: 'Magenta · Energy · Laser',
            group: 'vinculum',
            desc: 'Magenta→orange gradient, high energy — maximum student engagement.',
            dark: true,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: '08060E', bg2: '110E1C', card: '1A1528', card2: '221D34',
                border: '35294D', text: 'F5EEFF', text2: 'D4B8F0', muted: '9A7EC4',
                primary: 'E040FB', secondary: 'FF6D00', accent: 'E040FB',
                accent2: '76FF03', accent3: 'EA80FC', white: 'FFFFFF',
                headerBg: '08060E', headerText: 'E040FB',
                targetBg: '1A1528', targetBorder: 'E040FB',
                questionBg: '1A1528', questionBorder: 'FF6D00',
                exitBg: '08060E', exitText: '76FF03',
                cyan: 'E040FB', pink: 'FF4081', yellow: 'FFAB00',
                green: '76FF03', purple: 'EA80FC', orange: 'FF6D00'
            },
            swatch: ['08060E','E040FB','FF6D00','76FF03','EA80FC','FFAB00'],
            categoryColors: {
                unitDesign:  { primary: 'E040FB', tint: '1A1528' },
                community:   { primary: 'EA80FC', tint: '1A1528' },
                clarity:     { primary: '76FF03', tint: '1A1528' },
                delivery:    { primary: 'FF6D00', tint: '1A1528' },
                assessment:  { primary: 'FF4081', tint: '1A1528' }
            }
        },

        'arctic-frost': {
            id: 'arctic-frost',
            name: 'Arctic Frost',
            tag: 'Ice Blue · Projector Ready',
            group: 'vinculum',
            desc: 'Frosted glass on ice-blue — the Vinculum light mode for projectors.',
            dark: false,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: 'DCE8F4', bg2: 'E8F2FC', card: 'FFFFFF', card2: 'E0F0FF',
                border: 'A0C8E6', text: '0C2840', text2: '1E4870', muted: '3A6A90',
                primary: '0077BB', secondary: '5533BB', accent: '4DB8E8',
                accent2: '007755', accent3: '8844AA', white: 'FFFFFF',
                headerBg: 'DCE8F4', headerText: '0077BB',
                targetBg: 'FFFFFF', targetBorder: '4DB8E8',
                questionBg: 'FFFFFF', questionBorder: '0077BB',
                exitBg: 'DCE8F4', exitText: '007755',
                cyan: '0077BB', pink: '8844AA', yellow: 'AA7700',
                green: '007755', purple: '5533BB', orange: 'CC6600'
            },
            swatch: ['DCE8F4','0077BB','4DB8E8','007755','5533BB','FFFFFF'],
            categoryColors: {
                unitDesign:  { primary: '0077BB', tint: 'FFFFFF' },
                community:   { primary: '5533BB', tint: 'FFFFFF' },
                clarity:     { primary: '007755', tint: 'FFFFFF' },
                delivery:    { primary: '0077BB', tint: 'E0F0FF' },
                assessment:  { primary: '8844AA', tint: 'FFFFFF' }
            }
        },

        'cra-flow': {
            id: 'cra-flow',
            name: 'CRA Flow',
            tag: 'Explore · Practice · Play',
            group: 'vinculum',
            desc: 'Organized by CRA modes — seamless bridge to Vinculum digital tools.',
            dark: true,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: '0A0E1A', bg2: '111827', card: '1A2236', card2: '1F2A42',
                border: '2A3654', text: 'E8EDF5', text2: '8B9CC0', muted: '5A6B8F',
                primary: '00D4FF', secondary: '00E676', accent: 'FFC107',
                accent2: 'B388FF', accent3: 'FF3B8B', white: 'FFFFFF',
                headerBg: '0A0E1A', headerText: 'E8EDF5',
                targetBg: '1A2236', targetBorder: '00D4FF',
                questionBg: '1A2236', questionBorder: '00E676',
                exitBg: '0A0E1A', exitText: '00E676',
                cyan: '00D4FF', pink: 'FF3B8B', yellow: 'FFC107',
                green: '00E676', purple: 'B388FF', orange: 'FF9100',
                explore: '00D4FF', practice: '00E676', play: 'FFC107'
            },
            swatch: ['0A0E1A','00D4FF','00E676','FFC107','B388FF','FF3B8B'],
            categoryColors: {
                unitDesign:  { primary: '00D4FF', tint: '1A2236' },
                community:   { primary: 'B388FF', tint: '1A2236' },
                clarity:     { primary: '00E676', tint: '1A2236' },
                delivery:    { primary: 'FFC107', tint: '1A2236' },
                assessment:  { primary: 'FF3B8B', tint: '1A2236' }
            }
        },

        'ocean-deep': {
            id: 'ocean-deep',
            name: 'Ocean Deep',
            tag: 'Calming · Focus · Teal',
            group: 'vinculum',
            desc: 'Deep navy-blue with teal accents — calm focus, anxiety reduction.',
            dark: true,
            fonts: { heading: 'Calibri', body: 'Calibri', mono: 'Consolas' },
            colors: {
                bg: '0B1D33', bg2: '132D4A', card: '1A3A5C', card2: '214A6E',
                border: '2A5A7E', text: 'E0F4FF', text2: '8EC5E0', muted: '5E8BA0',
                primary: '00B4D8', secondary: '06D6A0', accent: '48CAE4',
                accent2: 'FFD166', accent3: 'F4845F', white: 'FFFFFF',
                headerBg: '0B1D33', headerText: '48CAE4',
                targetBg: '1A3A5C', targetBorder: '00B4D8',
                questionBg: '1A3A5C', questionBorder: '06D6A0',
                exitBg: '0B1D33', exitText: '06D6A0',
                cyan: '00B4D8', pink: 'FFD166', yellow: 'FFD166',
                green: '06D6A0', purple: '48CAE4', orange: 'F4845F'
            },
            swatch: ['0B1D33','00B4D8','06D6A0','48CAE4','FFD166','F4845F'],
            categoryColors: {
                unitDesign:  { primary: '48CAE4', tint: '1A3A5C' },
                community:   { primary: 'FFD166', tint: '1A3A5C' },
                clarity:     { primary: '06D6A0', tint: '1A3A5C' },
                delivery:    { primary: '00B4D8', tint: '1A3A5C' },
                assessment:  { primary: 'F4845F', tint: '1A3A5C' }
            }
        }
    };

    // ── Public API ──

    /** Get a theme by id */
    function get(id) {
        return THEMES[id] || THEMES['classic-academic'];
    }

    /** List all theme ids */
    function ids() {
        return Object.keys(THEMES);
    }

    /** All themes as array */
    function all() {
        return Object.values(THEMES);
    }

    /** Get themes by group */
    function byGroup(group) {
        return Object.values(THEMES).filter(t => t.group === group);
    }

    /** Build the HTML for the style selector panel */
    function buildSelectorHTML(selectedId) {
        const sel = selectedId || 'classic-academic';
        let html = '';

        html += '<div class="style-selector" id="styleSelector">';
        html += '<div class="style-selector-label">Choose Presentation Style</div>';
        html += '<div class="style-selector-grid">';

        for (const theme of Object.values(THEMES)) {
            const active = theme.id === sel ? ' active' : '';
            const groupBadge = theme.group === 'vinculum'
                ? '<span class="style-badge vinculum">VINCULUM</span>'
                : '<span class="style-badge original">ORIGINAL</span>';

            // Mini swatch row
            let swatchHTML = '<div class="style-swatch">';
            for (const c of (theme.swatch || []).slice(0, 6)) {
                swatchHTML += `<div class="swatch-dot" style="background:#${c};"></div>`;
            }
            swatchHTML += '</div>';

            html += `<div class="style-card${active}" data-style-id="${theme.id}" onclick="PptxThemes.select('${theme.id}')">`;
            html += `<div class="style-card-top">${groupBadge}</div>`;
            html += swatchHTML;
            html += `<div class="style-card-name">${theme.name}</div>`;
            html += `<div class="style-card-tag">${theme.tag}</div>`;
            html += `</div>`;
        }

        html += '</div>';
        html += '<div class="style-selector-desc" id="styleDesc">' + get(sel).desc + '</div>';
        html += '</div>';

        return html;
    }

    /** Handle selection */
    function select(id) {
        // Update active state
        document.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
        const card = document.querySelector(`.style-card[data-style-id="${id}"]`);
        if (card) card.classList.add('active');

        // Update description
        const descEl = document.getElementById('styleDesc');
        if (descEl) descEl.textContent = get(id).desc;

        // Store selection
        _selectedId = id;
        try { localStorage.setItem('lessonDigester_pptxTheme', id); } catch(e) {}
    }

    /** Get currently selected theme id */
    function getSelectedId() {
        return _selectedId;
    }

    /** Get currently selected theme */
    function getSelected() {
        return get(_selectedId);
    }

    // ── State ──
    let _selectedId = 'classic-academic';
    try {
        const stored = localStorage.getItem('lessonDigester_pptxTheme');
        if (stored && THEMES[stored]) _selectedId = stored;
    } catch(e) {}

    return {
        get,
        ids,
        all,
        byGroup,
        buildSelectorHTML,
        select,
        getSelectedId,
        getSelected,
        THEMES
    };
})();
