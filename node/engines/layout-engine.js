/**
 * Layout Engine for the Lesson Digester
 * ======================================
 * 10 reusable layout patterns mapped to the Practice Profile's 5 instructional domains.
 * Drop this into webapp/js/ and integrate with buildPresentation() in index.html.
 *
 * Each layout function signature:
 *   layoutFn(slide, pres, content, C, theme)
 *
 *   - slide:   PptxGenJS slide object (already created via pres.addSlide())
 *   - pres:    PptxGenJS presentation instance (for shapes enum)
 *   - content: Object with layout-specific data (see each layout's JSDoc)
 *   - C:       Color palette object from theme resolution
 *   - theme:   Full theme object (or null for default)
 *
 * Integration:
 *   1. Source this file in index.html: <script src="js/layout-engine.js"></script>
 *   2. Access via window.LayoutEngine
 *   3. Call: LayoutEngine.dispatch(slideType, slide, pres, content, C, theme)
 *      Or directly: LayoutEngine.layouts.heroStatement(slide, pres, content, C, theme)
 */

(function (root) {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED DESIGN CONSTANTS
  // ═══════════════════════════════════════════════════════════════════════════

  const K = {
    // Slide dimensions (16:9)
    SLIDE_W: 10,
    SLIDE_H: 5.625,

    // Margins
    MARGIN: 0.5,           // Edge margin all sides
    CONTENT_X: 0.5,        // Content start X
    CONTENT_W: 9.0,        // Content width (10 - 2*0.5)
    CONTENT_Y_TOP: 0.5,    // Content start Y (no header)
    CONTENT_Y: 1.05,       // Content start Y (after standard header)
    CONTENT_H: 4.0,        // Usable height below header, above footer

    // Header / Footer
    HEADER_BAR_H: 0.06,    // Top accent bar height
    HEADER_STRIPE_W: 0.08, // Left accent stripe width
    HEADER_STRIPE_H: 0.85, // Left accent stripe height
    HEADER_Y: 0.15,        // Title text Y
    HEADER_TITLE_H: 0.75,  // Title text box height
    FOOTER_H: 0.275,       // Footer bar height
    FOOTER_Y: 5.35,        // Footer Y position

    // Spacing
    CARD_GAP: 0.15,        // Gap between cards
    SECTION_GAP: 0.3,      // Gap between sections
    CARD_RADIUS: 0.08,     // Rounded rectangle radius
    CARD_PAD: 0.12,        // Internal card padding

    // Typography
    FONT_HERO: 30,         // Hero statement
    FONT_TITLE: 22,        // Slide titles
    FONT_CARD_HEAD: 14,    // Card headers
    FONT_BODY: 13,         // Body text
    FONT_CAPTION: 10,      // Captions, labels
    FONT_BADGE: 8,         // Badges, tags
    FONT_MIN: 12,          // Minimum projected readable

    // Practice Profile category IDs
    CATEGORIES: {
      UNIT_DESIGN: 'unitDesign',
      COMMUNITY: 'community',
      CLARITY: 'clarity',
      DELIVERY: 'delivery',
      ASSESSMENT: 'assessment'
    }
  };

  // Default category accent colors (used when theme doesn't define category colors)
  const DEFAULT_CATEGORY_COLORS = {
    unitDesign:  { primary: '3B82F6', tint: 'EFF6FF' },
    community:   { primary: '8B5CF6', tint: 'F5F3FF' },
    clarity:     { primary: '0D9488', tint: 'F0FDFA' },
    delivery:    { primary: 'F59E0B', tint: 'FFFBEB' },
    assessment:  { primary: 'EF4444', tint: 'FEF2F2' }
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // FRACTION RENDERER BRIDGE
  // Automatically converts inline fractions (3/4, 1/2, etc.) to proper
  // vertical notation using FractionRenderer when available.
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Check if FractionRenderer is available (loaded before this file).
   */
  function hasFR() {
    return typeof root.FractionRenderer !== 'undefined';
  }

  /**
   * Convert text to PptxGenJS text runs with fraction rendering.
   * If FractionRenderer is not loaded, returns the text as a plain run.
   *
   * @param {string} text - Text that may contain fractions like "3/4 of the pizza"
   * @param {object} opts - { fontSize, fontFace, color } for PptxGenJS
   * @returns {Array} PptxGenJS text run array
   */
  function fracRuns(text, opts) {
    opts = opts || {};
    if (!text || typeof text !== 'string') {
      return [{ text: text || '', options: opts }];
    }
    if (hasFR() && root.FractionRenderer.findFractions(text).length > 0) {
      return root.FractionRenderer.convertTextToPptxRuns(text, opts);
    }
    return [{ text: text, options: opts }];
  }

  /**
   * Add text to a slide with automatic fraction rendering.
   * Drop-in replacement for slide.addText(text, opts) that processes fractions.
   *
   * @param {Object} slide - PptxGenJS slide object
   * @param {string} text - Text content (may contain fractions)
   * @param {Object} textOpts - PptxGenJS text options (x, y, w, h, fontSize, etc.)
   */
  function addTextWithFractions(slide, text, textOpts) {
    if (!text || typeof text !== 'string') {
      slide.addText(text || '', textOpts);
      return;
    }
    if (hasFR() && root.FractionRenderer.findFractions(text).length > 0) {
      var runs = root.FractionRenderer.convertTextToPptxRuns(text, {
        fontSize: textOpts.fontSize || K.FONT_BODY,
        fontFace: textOpts.fontFace || 'Calibri',
        color: textOpts.color || '1E293B'
      });
      slide.addText(runs, textOpts);
    } else {
      slide.addText(text, textOpts);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Resolve isDark from theme
   */
  function isDarkTheme(theme) {
    return theme ? theme.dark === true : false;
  }

  /**
   * Get heading font from theme
   */
  function headingFont(theme) {
    return (theme && theme.fonts && theme.fonts.heading) ? theme.fonts.heading : 'Trebuchet MS';
  }

  /**
   * Get body font from theme
   */
  function bodyFont(theme) {
    return (theme && theme.fonts && theme.fonts.body) ? theme.fonts.body : 'Calibri';
  }

  /**
   * Get category accent color based on slide type's Practice Profile domain.
   * Falls back to theme primary if category not mapped.
   */
  function getCategoryColor(category, C, theme) {
    // Check if theme defines category colors
    if (theme && theme.categoryColors && theme.categoryColors[category]) {
      return theme.categoryColors[category];
    }
    // Fall back to defaults
    if (DEFAULT_CATEGORY_COLORS[category]) {
      return DEFAULT_CATEGORY_COLORS[category];
    }
    return { primary: C.primary || '0D9488', tint: isDarkTheme(theme) ? (C.card || '1E293B') : 'F0FDFA' };
  }

  /**
   * Factory for fresh shadow objects (PptxGenJS mutates in place)
   */
  function makeCardShadow() {
    return { type: 'outer', color: '000000', blur: 4, offset: 2, angle: 135, opacity: 0.08 };
  }

  /**
   * Set slide background based on theme
   */
  function setBackground(slide, C, theme) {
    slide.background = { color: isDarkTheme(theme) ? C.bg : (C.white || 'FFFFFF') };
  }

  /**
   * Standard header: top accent bar + left stripe + title text + optional underline
   */
  function addHeader(slide, pres, title, accentColor, C, theme) {
    const dark = isDarkTheme(theme);

    // Top accent bar (full width)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: K.SLIDE_W, h: K.HEADER_BAR_H,
      fill: { color: accentColor }
    });

    // Left accent stripe
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: K.HEADER_BAR_H, w: K.HEADER_STRIPE_W, h: K.HEADER_STRIPE_H,
      fill: { color: accentColor }
    });

    // Title text
    slide.addText(title, {
      x: K.MARGIN, y: K.HEADER_Y, w: K.CONTENT_W, h: K.HEADER_TITLE_H,
      fontSize: K.FONT_TITLE, fontFace: headingFont(theme),
      bold: true, color: dark ? C.text : (C.textDark || '1E293B'),
      valign: 'middle', margin: 0
    });

    // Amber underline below title
    slide.addShape(pres.shapes.RECTANGLE, {
      x: K.MARGIN, y: 0.9, w: 1.5, h: 0.03,
      fill: { color: C.secondary || 'D4870F' }
    });
  }

  /**
   * Standard footer bar
   */
  function addFooter(slide, pres, text, accentColor, C, theme) {
    const dark = isDarkTheme(theme);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: K.FOOTER_Y, w: K.SLIDE_W, h: K.FOOTER_H,
      fill: { color: accentColor }
    });
    slide.addText(text, {
      x: K.MARGIN, y: K.FOOTER_Y, w: K.CONTENT_W, h: K.FOOTER_H,
      fontSize: 7, fontFace: bodyFont(theme),
      color: 'FFFFFF', valign: 'middle', margin: 0
    });
  }

  /**
   * Draw a card (rectangle with optional left accent border)
   */
  function drawCard(slide, pres, x, y, w, h, fillColor, opts) {
    opts = opts || {};
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: fillColor },
      shadow: opts.shadow !== false ? makeCardShadow() : undefined,
      line: opts.borderColor ? { color: opts.borderColor, width: 0.5 } : undefined
    });
    // Left accent stripe on card
    if (opts.accentColor) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: y, w: 0.06, h: h,
        fill: { color: opts.accentColor }
      });
    }
  }

  /**
   * Add a badge/tag (small rounded pill)
   */
  function addBadge(slide, pres, text, x, y, bgColor, textColor) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: text.length * 0.065 + 0.3, h: 0.25,
      fill: { color: bgColor }, rectRadius: 0.12
    });
    slide.addText(text, {
      x: x, y: y, w: text.length * 0.065 + 0.3, h: 0.25,
      fontSize: K.FONT_BADGE, fontFace: bodyFont(null),
      color: textColor, align: 'center', valign: 'middle', margin: 0
    });
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 1: HERO STATEMENT
  // Full-bleed dark/dramatic, single centered statement.
  // Used for: Learning Targets, Day Dividers, Check-in, Commitment, Teacher Ref Divider
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.statement    - The big text (learning target, day title, etc.)
   * @param {string} [content.category]   - Practice Profile category ID
   * @param {string} [content.categoryLabel] - Display label (e.g. "INSTRUCTIONAL CLARITY")
   * @param {string} [content.subtitle]   - Small text below statement (standard code, DOK, etc.)
   * @param {string} [content.footerText] - Footer content
   */
  function layoutHeroStatement(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'clarity', C, theme);

    // Always use dark background for hero statements (dramatic)
    slide.background = { color: dark ? C.bg : '0F172A' };

    // Top accent gradient bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: K.SLIDE_W, h: 0.05,
      fill: { color: catColor.primary }
    });

    // Category label
    if (content.categoryLabel) {
      slide.addText(content.categoryLabel, {
        x: 0, y: 1.4, w: K.SLIDE_W, h: 0.3,
        fontSize: 9, fontFace: bodyFont(theme),
        color: catColor.primary, align: 'center', valign: 'middle',
        charSpacing: 3, margin: 0
      });
    }

    // Main statement — the big idea
    slide.addText(content.statement, {
      x: 1.0, y: 1.8, w: 8.0, h: 2.0,
      fontSize: K.FONT_HERO, fontFace: headingFont(theme),
      bold: true, color: dark ? (C.text || 'E2E8F0') : 'F1F5F9',
      align: 'center', valign: 'middle',
      lineSpacing: 38, margin: 0
    });

    // Subtitle line
    if (content.subtitle) {
      slide.addText(content.subtitle, {
        x: 1.0, y: 3.9, w: 8.0, h: 0.3,
        fontSize: K.FONT_CAPTION, fontFace: bodyFont(theme),
        color: dark ? (C.muted || 'A0AEC0') : 'CBD5E1', align: 'center', valign: 'middle', margin: 0
      });
    }

    // Footer
    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 2: SPLIT PANEL
  // Left panel (45%) for context/visual. Right panel (55%) for content cards.
  // Used for: Relevance, Vocabulary, Essential Understandings, Focus Skill, etc.
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title        - Slide title
   * @param {string} [content.category]   - Practice Profile category ID
   * @param {Object} content.left         - Left panel content
   * @param {string} [content.left.icon]  - Emoji or letter for icon circle
   * @param {string} [content.left.heading] - Left panel heading
   * @param {string} [content.left.body]  - Left panel body text
   * @param {string} [content.left.imageSrc] - Base64 image data (if visual instead of text)
   * @param {Array}  content.cards        - Right panel cards [{title, body, accentColor?}]
   * @param {string} [content.footerText] - Footer content
   * @param {string} [content.accentColor] - Override accent color
   */
  function layoutSplitPanel(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'clarity', C, theme);
    const accent = content.accentColor || catColor.primary;

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, accent, C, theme);

    // === LEFT PANEL (45%) ===
    const leftX = K.MARGIN;
    const leftY = K.CONTENT_Y;
    const leftW = 4.0;
    const leftH = K.FOOTER_Y - K.CONTENT_Y - K.SECTION_GAP;
    const leftFill = dark ? C.card : catColor.tint;

    drawCard(slide, pres, leftX, leftY, leftW, leftH, leftFill, { shadow: true });

    if (content.left.imageSrc) {
      // Image mode
      slide.addImage({
        data: content.left.imageSrc,
        x: leftX + 0.2, y: leftY + 0.2,
        w: leftW - 0.4, h: leftH - 0.4,
        sizing: { type: 'contain', w: leftW - 0.4, h: leftH - 0.4 }
      });
    } else {
      // Text mode with icon
      if (content.left.icon) {
        // Icon circle
        slide.addShape(pres.shapes.OVAL, {
          x: leftX + 0.3, y: leftY + 0.3, w: 0.5, h: 0.5,
          fill: { color: accent }
        });
        slide.addText(content.left.icon, {
          x: leftX + 0.3, y: leftY + 0.3, w: 0.5, h: 0.5,
          fontSize: 16, color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0
        });
      }

      const textStartY = content.left.icon ? leftY + 1.0 : leftY + 0.3;

      if (content.left.heading) {
        slide.addText(content.left.heading, {
          x: leftX + 0.25, y: textStartY, w: leftW - 0.5, h: 0.4,
          fontSize: K.FONT_CARD_HEAD, fontFace: headingFont(theme),
          bold: true, color: dark ? C.text : (C.textDark || '1E293B'),
          valign: 'top', margin: 0
        });
      }

      if (content.left.body) {
        addTextWithFractions(slide, content.left.body, {
          x: leftX + 0.25, y: textStartY + 0.45, w: leftW - 0.5, h: leftH - (textStartY - leftY) - 0.75,
          fontSize: K.FONT_BODY, fontFace: bodyFont(theme),
          color: dark ? C.text2 : (C.textMid || '64748B'),
          valign: 'top', lineSpacing: 18, margin: 0
        });
      }
    }

    // === RIGHT PANEL (55%) — Content cards ===
    const rightX = leftX + leftW + K.CARD_GAP;
    const rightW = K.CONTENT_W - leftW - K.CARD_GAP;
    const cards = content.cards || [];
    const cardCount = Math.max(cards.length, 1);
    const totalGaps = (cardCount - 1) * K.CARD_GAP;
    const cardH = (leftH - totalGaps) / cardCount;

    cards.forEach(function (card, i) {
      const cardY = leftY + i * (cardH + K.CARD_GAP);
      const cardAccent = card.accentColor || accent;
      const cardFill = dark ? C.card : (C.white || 'FFFFFF');

      drawCard(slide, pres, rightX, cardY, rightW, cardH, cardFill, {
        accentColor: cardAccent, shadow: true
      });

      // Card title
      if (card.title) {
        slide.addText(card.title, {
          x: rightX + 0.2, y: cardY + 0.1, w: rightW - 0.4, h: 0.3,
          fontSize: K.FONT_CARD_HEAD - 2, fontFace: headingFont(theme),
          bold: true, color: cardAccent, valign: 'middle', margin: 0
        });
      }

      // Card body — with automatic fraction rendering
      if (card.body) {
        addTextWithFractions(slide, card.body, {
          x: rightX + 0.2, y: cardY + 0.4, w: rightW - 0.4, h: cardH - 0.5,
          fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
          color: dark ? C.text : (C.textDark || '1E293B'),
          valign: 'top', lineSpacing: 16, margin: 0
        });
      }
    });

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, accent, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 3: CARD GRID
  // 2x3 or 3-column grid of equal cards with number callouts.
  // Used for: Warm-ups, Agenda, Team Roles, Activity Launch, Homework, Cover
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title        - Slide title
   * @param {string} [content.category]   - Practice Profile category ID
   * @param {number} [content.columns]    - Number of columns (2 or 3, default 3)
   * @param {Array}  content.cards        - Cards [{number, title, body, accentColor?}]
   * @param {string} [content.footerText] - Footer content
   * @param {string} [content.accentColor] - Override accent
   */
  function layoutCardGrid(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'delivery', C, theme);
    const accent = content.accentColor || catColor.primary;

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, accent, C, theme);

    const cols = content.columns || 3;
    const cards = content.cards || [];
    const rows = Math.ceil(cards.length / cols);
    const gridX = K.MARGIN;
    const gridY = K.CONTENT_Y;
    const gridW = K.CONTENT_W;
    const gridH = K.FOOTER_Y - gridY - K.SECTION_GAP;
    const colW = (gridW - (cols - 1) * K.CARD_GAP) / cols;
    const rowH = (gridH - (rows - 1) * K.CARD_GAP) / rows;

    cards.forEach(function (card, i) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = gridX + col * (colW + K.CARD_GAP);
      const cy = gridY + row * (rowH + K.CARD_GAP);
      const cardFill = dark ? C.card : (C.white || 'FFFFFF');

      drawCard(slide, pres, cx, cy, colW, rowH, cardFill, { shadow: true });

      // Number callout (large, accent colored)
      if (card.number !== undefined) {
        slide.addText(String(card.number), {
          x: cx + 0.12, y: cy + 0.08, w: 0.5, h: 0.45,
          fontSize: 22, fontFace: headingFont(theme),
          bold: true, color: accent, valign: 'top', margin: 0
        });
      }

      // Card title
      var titleY = (card.number !== undefined) ? cy + 0.5 : cy + 0.12;
      if (card.title) {
        slide.addText(card.title, {
          x: cx + 0.12, y: titleY, w: colW - 0.24, h: 0.35,
          fontSize: K.FONT_CARD_HEAD - 3, fontFace: headingFont(theme),
          bold: true, color: dark ? C.text : (C.textDark || '1E293B'),
          valign: 'top', margin: 0
        });
      }

      // Card body — with automatic fraction rendering
      if (card.body) {
        addTextWithFractions(slide, card.body, {
          x: cx + 0.12, y: titleY + 0.35, w: colW - 0.24, h: rowH - (titleY - cy) - 0.5,
          fontSize: K.FONT_BODY - 2, fontFace: bodyFont(theme),
          color: dark ? C.text2 : (C.textMid || '64748B'),
          valign: 'top', lineSpacing: 14, margin: 0
        });
      }
    });

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, accent, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 4: CHECKLIST TRACKER
  // Success criteria as a visual checklist with progress bar.
  // Used for: Success Criteria (open/close), Self-Assessment, Learning Progression
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title        - Slide title (e.g. "Success Criteria")
   * @param {string} [content.category]   - Practice Profile category ID
   * @param {string} [content.standardBadge] - Standard code badge (e.g. "6.NS.A.1")
   * @param {Array}  content.items        - Checklist items [{text, checked: bool}]
   * @param {number} [content.progress]   - Progress 0-1 (auto-calculated from items if omitted)
   * @param {string} [content.footerText]
   * @param {string} [content.accentColor]
   */
  function layoutChecklistTracker(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'clarity', C, theme);
    const accent = content.accentColor || catColor.primary;

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, accent, C, theme);

    // Standard badge (top-right)
    if (content.standardBadge) {
      addBadge(slide, pres, content.standardBadge,
        K.SLIDE_W - K.MARGIN - 1.2, K.HEADER_Y + 0.2,
        accent, 'FFFFFF'
      );
    }

    var items = content.items || [];
    var checkedCount = items.filter(function (it) { return it.checked; }).length;
    var progress = content.progress !== undefined ? content.progress : (items.length ? checkedCount / items.length : 0);

    var listY = K.CONTENT_Y + 0.1;
    var listX = K.MARGIN;
    var listW = K.CONTENT_W;
    var itemH = 0.48;
    var maxItems = Math.min(items.length, 8); // cap at 8 visible

    items.slice(0, maxItems).forEach(function (item, i) {
      var iy = listY + i * (itemH + 0.06);
      var rowFill = (i % 2 === 0) ? (dark ? C.card : (C.bg2 || 'F8FAFC')) : (dark ? C.bg : (C.white || 'FFFFFF'));

      // Row background
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: listX, y: iy, w: listW, h: itemH,
        fill: { color: rowFill }, rectRadius: 0.06
      });

      // Checkbox
      var cbX = listX + 0.15;
      var cbY = iy + (itemH - 0.28) / 2;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cbX, y: cbY, w: 0.28, h: 0.28,
        fill: { color: item.checked ? accent : 'transparent' },
        line: { color: item.checked ? accent : (C.border || (dark ? '475569' : 'CBD5E1')), width: 1.5 },
        rectRadius: 0.04
      });

      // Checkmark
      if (item.checked) {
        slide.addText('✓', {
          x: cbX, y: cbY, w: 0.28, h: 0.28,
          fontSize: 14, color: 'FFFFFF', align: 'center', valign: 'middle',
          fontFace: bodyFont(theme), margin: 0
        });
      }

      // Item text — with automatic fraction rendering
      addTextWithFractions(slide, item.text, {
        x: cbX + 0.4, y: iy, w: listW - 0.7, h: itemH,
        fontSize: K.FONT_BODY, fontFace: bodyFont(theme),
        color: dark ? C.text : (C.textDark || '1E293B'),
        valign: 'middle', margin: 0
      });
    });

    // Progress bar
    var barY = listY + maxItems * (itemH + 0.06) + 0.15;
    var barH = 0.12;
    // Track
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: listX, y: barY, w: listW, h: barH,
      fill: { color: C.border || (dark ? '334155' : 'E2E8F0') }, rectRadius: barH / 2
    });
    // Fill
    if (progress > 0) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: listX, y: barY, w: Math.max(listW * progress, 0.2), h: barH,
        fill: { color: accent }, rectRadius: barH / 2
      });
    }
    // Progress label
    slide.addText(Math.round(progress * 100) + '% Complete', {
      x: listX, y: barY + barH + 0.04, w: listW, h: 0.2,
      fontSize: K.FONT_BADGE + 1, fontFace: bodyFont(theme),
      color: dark ? C.text2 : (C.textMid || '94A3B8'),
      align: 'right', margin: 0
    });

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, accent, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 5: TWO-COLUMN COMPARE
  // Side-by-side color-coded comparison.
  // Used for: Dual Error Analysis, Closure, Notice & Wonder, Would You Rather
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title        - Slide title
   * @param {string} [content.category]
   * @param {Object} content.colA         - Left column
   * @param {string} content.colA.heading - Column A heading (e.g. "Student A")
   * @param {string} [content.colA.color] - Column A accent (default blue)
   * @param {Array}  content.colA.items   - [{text, isError?: bool, isCorrect?: bool}]
   * @param {Object} content.colB         - Right column (same structure)
   * @param {string} [content.bottomText] - Bottom question/prompt
   * @param {string} [content.footerText]
   */
  function layoutTwoColumnCompare(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'delivery', C, theme);

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, catColor.primary, C, theme);

    var colAColor = content.colA.color || C.accent || '3B82F6';
    var colBColor = content.colB.color || C.accent3 || 'EF4444';

    var colY = K.CONTENT_Y;
    var colGap = K.CARD_GAP;
    var colW = (K.CONTENT_W - colGap) / 2;
    var hasBottom = !!content.bottomText;
    var bottomH = hasBottom ? 0.55 : 0;
    var colH = K.FOOTER_Y - colY - K.SECTION_GAP - bottomH - (hasBottom ? 0.1 : 0);

    // Render one column
    function renderCol(col, x, accent) {
      var tintBg = dark ? C.card : (C.targetBg || (accent === colAColor ? 'EFF6FF' : 'FEF2F2'));

      // Column container
      slide.addShape(pres.shapes.RECTANGLE, {
        x: x, y: colY, w: colW, h: colH,
        fill: { color: tintBg },
        line: { color: accent, width: 0.5, transparency: 25 }
      });

      // Column heading
      slide.addText(col.heading, {
        x: x, y: colY + 0.08, w: colW, h: 0.35,
        fontSize: K.FONT_CARD_HEAD, fontFace: headingFont(theme),
        bold: true, color: accent, align: 'center', valign: 'middle', margin: 0
      });

      // Items
      var items = col.items || [];
      var itemStartY = colY + 0.5;
      var itemH = Math.min(0.35, (colH - 0.6) / Math.max(items.length, 1));

      items.forEach(function (item, i) {
        var iy = itemStartY + i * itemH;
        var itemColor = item.isError ? 'EF4444' :
                        item.isCorrect ? '10B981' :
                        (dark ? C.text : (C.textDark || '1E293B'));
        var itemWeight = (item.isError || item.isCorrect) ? true : false;

        addTextWithFractions(slide, item.text, {
          x: x + 0.15, y: iy, w: colW - 0.3, h: itemH,
          fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
          color: itemColor, bold: itemWeight,
          valign: 'middle', margin: 0
        });

        // Separator line
        if (i < items.length - 1) {
          slide.addShape(pres.shapes.LINE, {
            x: x + 0.15, y: iy + itemH - 0.01, w: colW - 0.3, h: 0,
            line: { color: C.border || (dark ? '334155' : 'E2E8F0'), width: 0.5 }
          });
        }
      });
    }

    renderCol(content.colA, K.MARGIN, colAColor);
    renderCol(content.colB, K.MARGIN + colW + colGap, colBColor);

    // Bottom question/prompt
    if (content.bottomText) {
      var bY = colY + colH + 0.1;
      drawCard(slide, pres, K.MARGIN, bY, K.CONTENT_W, bottomH,
        dark ? C.card : 'F8FAFC', { shadow: true });
      addTextWithFractions(slide, content.bottomText, {
        x: K.MARGIN + 0.2, y: bY, w: K.CONTENT_W - 0.4, h: bottomH,
        fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
        color: dark ? C.text2 : (C.textMid || '64748B'),
        align: 'center', valign: 'middle', margin: 0
      });
    }

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 6: PHASE TIMELINE
  // 3-phase horizontal progression with watermark numbers and connectors.
  // Used for: Structured Dialogue, CRA Progression, Cooperative Structures
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title
   * @param {string} [content.category]
   * @param {Array}  content.phases      - [{number, heading, body, color?}] (2-4 phases)
   * @param {string} [content.footerText]
   */
  function layoutPhaseTimeline(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'delivery', C, theme);

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, catColor.primary, C, theme);

    var phases = content.phases || [];
    var phaseCount = phases.length;
    var connectorW = 0.25;
    var totalConnectors = phaseCount - 1;
    var phaseAreaW = K.CONTENT_W - totalConnectors * connectorW;
    var phaseW = phaseAreaW / phaseCount;
    var phaseY = K.CONTENT_Y;
    var phaseH = K.FOOTER_Y - phaseY - K.SECTION_GAP;

    var defaultColors = [C.accent || '3B82F6', C.secondary || 'F59E0B', C.accent2 || '0D9488', C.accent3 || '8B5CF6'];

    phases.forEach(function (phase, i) {
      var px = K.MARGIN + i * (phaseW + connectorW);
      var phaseColor = phase.color || defaultColors[i % defaultColors.length];
      var phaseFill = dark ? C.card : (C.white || 'FFFFFF');

      // Phase card
      drawCard(slide, pres, px, phaseY, phaseW, phaseH, phaseFill, { shadow: true });

      // Watermark number
      slide.addText(String(phase.number || (i + 1)), {
        x: px + phaseW - 0.7, y: phaseY + 0.05, w: 0.6, h: 0.6,
        fontSize: 36, fontFace: headingFont(theme),
        bold: true, color: phaseColor, align: 'right', valign: 'top',
        transparency: 45, margin: 0
      });

      // Phase heading
      slide.addText(phase.heading, {
        x: px + 0.15, y: phaseY + 0.15, w: phaseW - 0.3, h: 0.35,
        fontSize: K.FONT_CARD_HEAD - 1, fontFace: headingFont(theme),
        bold: true, color: phaseColor, valign: 'top', margin: 0
      });

      // Phase body — with automatic fraction rendering
      if (phase.body) {
        addTextWithFractions(slide, phase.body, {
          x: px + 0.15, y: phaseY + 0.55, w: phaseW - 0.3, h: phaseH - 0.7,
          fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
          color: dark ? C.text : (C.textDark || '1E293B'),
          valign: 'top', lineSpacing: 16, margin: 0
        });
      }

      // Connector arrow between phases
      if (i < phaseCount - 1) {
        var arrowX = px + phaseW;
        var arrowY = phaseY + phaseH / 2 - 0.15;
        slide.addText('→', {
          x: arrowX, y: arrowY, w: connectorW, h: 0.3,
          fontSize: 18, color: dark ? '475569' : 'CBD5E1',
          align: 'center', valign: 'middle', margin: 0
        });
      }
    });

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 7: DIALOGUE BUBBLES
  // Chat-style alternating speech bubbles with vocabulary strip.
  // Used for: RISA Social, RISA Academic, Sentence Frames, Group Discussion
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title
   * @param {string} [content.category]
   * @param {Array}  content.messages     - [{speaker, text, side: 'left'|'right'}]
   *                                        Text can contain ____ for fill-in blanks
   * @param {Array}  [content.vocabulary] - Vocabulary words for bottom strip
   * @param {string} [content.footerText]
   */
  function layoutDialogueBubbles(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'delivery', C, theme);

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, catColor.primary, C, theme);

    var messages = content.messages || [];
    var hasVocab = content.vocabulary && content.vocabulary.length > 0;
    var vocabH = hasVocab ? 0.45 : 0;
    var msgAreaH = K.FOOTER_Y - K.CONTENT_Y - K.SECTION_GAP - vocabH - (hasVocab ? 0.1 : 0);
    var msgH = Math.min(0.65, (msgAreaH - (messages.length - 1) * 0.08) / Math.max(messages.length, 1));
    var bubbleW = K.CONTENT_W * 0.7;

    var speakerColors = {
      left: dark ? C.card : 'F1F5F9',
      right: catColor.primary
    };
    var speakerTextColors = {
      left: dark ? C.text : (C.textDark || '1E293B'),
      right: 'FFFFFF'
    };
    var speakerLabelColors = {
      left: C.accent || '3B82F6',
      right: 'FFFFFF'
    };

    messages.forEach(function (msg, i) {
      var my = K.CONTENT_Y + i * (msgH + 0.08);
      var side = msg.side || (i % 2 === 0 ? 'left' : 'right');
      var mx = side === 'left' ? K.MARGIN : K.MARGIN + K.CONTENT_W - bubbleW;
      var fill = speakerColors[side];

      // Bubble shape
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: mx, y: my, w: bubbleW, h: msgH,
        fill: { color: fill }, rectRadius: 0.1,
        shadow: makeCardShadow()
      });

      // Speaker label
      slide.addText(msg.speaker, {
        x: mx + 0.12, y: my + 0.06, w: bubbleW - 0.24, h: 0.18,
        fontSize: K.FONT_BADGE + 1, fontFace: headingFont(theme),
        bold: true, color: speakerLabelColors[side], margin: 0
      });

      // Process text: replace ____ with underline visual
      var processedText = (msg.text || '').replace(/_{3,}/g, '________');

      addTextWithFractions(slide, processedText, {
        x: mx + 0.12, y: my + 0.24, w: bubbleW - 0.24, h: msgH - 0.32,
        fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
        color: speakerTextColors[side],
        valign: 'top', lineSpacing: 15, margin: 0
      });
    });

    // Vocabulary strip
    if (hasVocab) {
      var vocabY = K.CONTENT_Y + msgAreaH + 0.1;
      drawCard(slide, pres, K.MARGIN, vocabY, K.CONTENT_W, vocabH,
        dark ? C.card : 'FFFBEB', { shadow: true });

      var vocabText = content.vocabulary.map(function (word) {
        return { text: '  ' + word + '  ', options: {
          fontSize: K.FONT_CAPTION, fontFace: bodyFont(theme),
          color: C.secondary || 'D97706', bold: true
        }};
      });

      // Interleave with separators
      var vocabRuns = [];
      vocabText.forEach(function (v, i) {
        vocabRuns.push(v);
        if (i < vocabText.length - 1) {
          vocabRuns.push({ text: ' · ', options: { fontSize: K.FONT_CAPTION, color: C.muted || (dark ? '475569' : 'CBD5E1') }});
        }
      });

      slide.addText(vocabRuns, {
        x: K.MARGIN + 0.12, y: vocabY, w: K.CONTENT_W - 0.24, h: vocabH,
        valign: 'middle', margin: 0
      });
    }

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 8: PROBLEM WORKSPACE
  // Problem bar + dot-grid work area + sentence frame cards.
  // Used for: Problem Slides, Exit Ticket, Hinge Questions, Guided Practice
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.problemText  - The problem statement
   * @param {number} [content.problemNum] - Problem number for badge
   * @param {string} [content.dokLevel]   - DOK level string (e.g. "DOK 2")
   * @param {string} [content.category]
   * @param {Array}  [content.frames]     - Sentence frames [{label, text}]
   * @param {string} [content.workLabel]  - Label for work area (default "Show your work")
   * @param {boolean} [content.isExitTicket] - Darker, more dramatic styling
   * @param {string} [content.footerText]
   */
  function layoutProblemWorkspace(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || (content.isExitTicket ? 'assessment' : 'delivery'), C, theme);
    const accent = catColor.primary;

    // Exit tickets get forced dark background
    if (content.isExitTicket) {
      slide.background = { color: dark ? C.bg : '0F172A' };
    } else {
      setBackground(slide, C, theme);
    }
    var forceDark = content.isExitTicket || dark;

    // Problem bar
    var barY = 0.3;
    var barH = 0.7;
    var barFill = forceDark ? (C.card || '1E293B') : 'F1F5F9';

    drawCard(slide, pres, K.MARGIN, barY, K.CONTENT_W, barH, barFill, { shadow: true });

    // Problem number badge
    if (content.problemNum !== undefined) {
      slide.addShape(pres.shapes.OVAL, {
        x: K.MARGIN + 0.15, y: barY + (barH - 0.45) / 2, w: 0.45, h: 0.45,
        fill: { color: accent }
      });
      slide.addText(String(content.problemNum), {
        x: K.MARGIN + 0.15, y: barY + (barH - 0.45) / 2, w: 0.45, h: 0.45,
        fontSize: 16, fontFace: headingFont(theme),
        bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0
      });
    }

    // Problem text — with automatic fraction rendering (Vinculum)
    var ptX = content.problemNum !== undefined ? K.MARGIN + 0.75 : K.MARGIN + 0.15;
    addTextWithFractions(slide, content.problemText, {
      x: ptX, y: barY + 0.05, w: K.CONTENT_W - (ptX - K.MARGIN) - 1.2, h: barH - 0.1,
      fontSize: K.FONT_CARD_HEAD, fontFace: bodyFont(theme),
      bold: true, color: forceDark ? 'F1F5F9' : (C.textDark || '1E293B'),
      valign: 'middle', lineSpacing: 18, margin: 0
    });

    // DOK badge
    if (content.dokLevel) {
      addBadge(slide, pres, content.dokLevel,
        K.MARGIN + K.CONTENT_W - 0.9, barY + (barH - 0.25) / 2,
        forceDark ? '332800' : 'FFFBEB', 'D97706'
      );
    }

    // Work area
    var frames = content.frames || [];
    var hasFrames = frames.length > 0;
    var frameH = hasFrames ? 0.65 : 0;
    var workY = barY + barH + 0.15;
    var workH = K.FOOTER_Y - workY - K.SECTION_GAP - frameH - (hasFrames ? 0.1 : 0);

    // Dashed border work area
    slide.addShape(pres.shapes.RECTANGLE, {
      x: K.MARGIN, y: workY, w: K.CONTENT_W, h: workH,
      line: { color: C.border || (forceDark ? '334155' : 'CBD5E1'), width: 1, dashType: 'dash' }
    });

    // Work area label
    slide.addText(content.workLabel || 'SHOW YOUR WORK', {
      x: K.MARGIN + 0.12, y: workY + 0.06, w: 2.0, h: 0.2,
      fontSize: 7, fontFace: bodyFont(theme),
      color: C.muted || (forceDark ? '64748B' : '94A3B8'),
      charSpacing: 1, margin: 0
    });

    // Dot grid inside work area
    var dotStartX = K.MARGIN + 0.3;
    var dotStartY = workY + 0.35;
    var dotCols = 20;
    var dotRows = Math.floor((workH - 0.5) / 0.2);
    var dotSpacingX = (K.CONTENT_W - 0.6) / dotCols;
    var dotSpacingY = 0.2;

    for (var r = 0; r < dotRows; r++) {
      for (var c = 0; c < dotCols; c++) {
        slide.addShape(pres.shapes.OVAL, {
          x: dotStartX + c * dotSpacingX, y: dotStartY + r * dotSpacingY,
          w: 0.03, h: 0.03,
          fill: { color: C.border || (forceDark ? '334155' : 'E2E8F0') }
        });
      }
    }

    // Sentence frame cards
    if (hasFrames) {
      var frameY = workY + workH + 0.1;
      var fColW = (K.CONTENT_W - (frames.length - 1) * K.CARD_GAP) / frames.length;

      frames.forEach(function (frame, i) {
        var fx = K.MARGIN + i * (fColW + K.CARD_GAP);
        var frameFill = forceDark ? (C.card || '1E293B') : 'F0FDFA';

        drawCard(slide, pres, fx, frameY, fColW, frameH, frameFill, {
          accentColor: accent, shadow: true
        });

        // Frame label
        slide.addText(frame.label, {
          x: fx + 0.15, y: frameY + 0.05, w: fColW - 0.3, h: 0.2,
          fontSize: K.FONT_BADGE + 1, fontFace: headingFont(theme),
          bold: true, color: accent, charSpacing: 0.5, margin: 0
        });

        // Frame text
        slide.addText(frame.text, {
          x: fx + 0.15, y: frameY + 0.28, w: fColW - 0.3, h: frameH - 0.35,
          fontSize: K.FONT_CAPTION, fontFace: bodyFont(theme),
          color: forceDark ? (C.text || 'D1D5DB') : (C.textMid || '64748B'),
          valign: 'top', lineSpacing: 13, margin: 0
        });
      });
    }

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, accent, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 9: RUBRIC BANDS
  // Horizontal color-banded rows for proficiency levels.
  // Used for: RMS Proficiency Rubric, DOK Levels, MCA Benchmarks, Learning Log
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title
   * @param {string} [content.category]
   * @param {Array}  content.bands       - [{level, label, description, color}]
   *                                       Ordered top-to-bottom (highest first)
   * @param {string} [content.footerText]
   */
  function layoutRubricBands(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'assessment', C, theme);

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, catColor.primary, C, theme);

    var bands = content.bands || [];
    var bandCount = bands.length;
    var bandY = K.CONTENT_Y + 0.05;
    var bandTotalH = K.FOOTER_Y - bandY - K.SECTION_GAP;
    var bandGap = 0.08;
    var bandH = (bandTotalH - (bandCount - 1) * bandGap) / bandCount;
    var levelW = 0.9;
    var defaultBandColors = [C.accent || '2563EB', C.accent2 || '0D9488', C.secondary || 'F59E0B', C.accent3 || 'EF4444'];

    bands.forEach(function (band, i) {
      var by = bandY + i * (bandH + bandGap);
      var bandColor = band.color || defaultBandColors[i % defaultBandColors.length];

      // Level badge column
      slide.addShape(pres.shapes.RECTANGLE, {
        x: K.MARGIN, y: by, w: levelW, h: bandH,
        fill: { color: bandColor }
      });
      slide.addText(band.level + (band.label ? '\n' + band.label : ''), {
        x: K.MARGIN, y: by, w: levelW, h: bandH,
        fontSize: band.label ? 9 : 11, fontFace: headingFont(theme),
        bold: true, color: 'FFFFFF',
        align: 'center', valign: 'middle', lineSpacing: 13, margin: 0
      });

      // Description area
      var descFill = dark ? C.card : bandColor;
      slide.addShape(pres.shapes.RECTANGLE, {
        x: K.MARGIN + levelW, y: by, w: K.CONTENT_W - levelW, h: bandH,
        fill: { color: dark ? C.card : bandColor, transparency: dark ? 0 : 80 }
      });
      addTextWithFractions(slide, band.description, {
        x: K.MARGIN + levelW + 0.2, y: by, w: K.CONTENT_W - levelW - 0.4, h: bandH,
        fontSize: K.FONT_BODY - 1, fontFace: bodyFont(theme),
        color: dark ? C.text : (C.textDark || '1E293B'),
        valign: 'middle', lineSpacing: 16, margin: 0
      });
    });

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT 10: DASHBOARD DATA VIEW
  // Stat callouts + data table. Dense teacher-reference layout.
  // Used for: Slide Map, Answer Key, Misconceptions, Cooperative Menu
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @param {Object} content
   * @param {string} content.title
   * @param {string} [content.category]
   * @param {Array}  [content.stats]     - [{value, label, color?}] (top row, max 4)
   * @param {Array}  content.tableHeaders - ['Col1', 'Col2', ...]
   * @param {Array}  content.tableRows    - [['val1', 'val2', ...], ...]
   * @param {Array}  [content.colWidths]  - Column width proportions [2, 3, 5]
   * @param {string} [content.footerText]
   */
  function layoutDashboardData(slide, pres, content, C, theme) {
    const dark = isDarkTheme(theme);
    const catColor = getCategoryColor(content.category || 'assessment', C, theme);

    setBackground(slide, C, theme);
    addHeader(slide, pres, content.title, catColor.primary, C, theme);

    var hasStats = content.stats && content.stats.length > 0;
    var statH = hasStats ? 0.7 : 0;
    var statGap = hasStats ? 0.12 : 0;
    var tableY = K.CONTENT_Y + statH + statGap;
    var tableH = K.FOOTER_Y - tableY - K.SECTION_GAP;

    // === STAT CALLOUTS ===
    if (hasStats) {
      var statCount = content.stats.length;
      var statW = (K.CONTENT_W - (statCount - 1) * K.CARD_GAP) / statCount;
      var defaultStatColors = [C.accent2 || '0D9488', C.accent || '3B82F6', C.secondary || 'F59E0B', C.accent3 || 'EF4444'];

      content.stats.forEach(function (stat, i) {
        var sx = K.MARGIN + i * (statW + K.CARD_GAP);
        var statFill = dark ? C.card : (C.white || 'FFFFFF');
        drawCard(slide, pres, sx, K.CONTENT_Y, statW, statH, statFill, { shadow: true });

        // Big number
        slide.addText(String(stat.value), {
          x: sx, y: K.CONTENT_Y + 0.05, w: statW, h: 0.4,
          fontSize: 24, fontFace: headingFont(theme),
          bold: true, color: stat.color || defaultStatColors[i % defaultStatColors.length],
          align: 'center', valign: 'middle', margin: 0
        });

        // Label
        slide.addText(stat.label, {
          x: sx, y: K.CONTENT_Y + 0.45, w: statW, h: 0.2,
          fontSize: K.FONT_BADGE + 1, fontFace: bodyFont(theme),
          color: dark ? C.text2 : (C.textMid || '94A3B8'),
          align: 'center', valign: 'middle', margin: 0
        });
      });
    }

    // === DATA TABLE ===
    var headers = content.tableHeaders || [];
    var rows = content.tableRows || [];
    var allRows = [];

    // Header row
    var headerCells = headers.map(function (h) {
      return {
        text: h,
        options: {
          bold: true,
          fontSize: K.FONT_CAPTION,
          fontFace: headingFont(theme),
          color: 'FFFFFF',
          fill: { color: dark ? '334155' : catColor.primary },
          valign: 'middle',
          margin: [2, 4, 2, 4]
        }
      };
    });
    allRows.push(headerCells);

    // Data rows
    rows.forEach(function (row, ri) {
      var rowCells = row.map(function (cell) {
        var cellText = typeof cell === 'object' ? cell.text : String(cell);
        var cellColor = typeof cell === 'object' && cell.color ? cell.color : (dark ? C.text : (C.textDark || '1E293B'));
        return {
          text: cellText,
          options: {
            fontSize: K.FONT_CAPTION,
            fontFace: bodyFont(theme),
            color: cellColor,
            fill: { color: ri % 2 === 0 ? (dark ? C.card : 'F8FAFC') : (dark ? C.bg : (C.white || 'FFFFFF')) },
            valign: 'middle',
            margin: [2, 4, 2, 4]
          }
        };
      });
      allRows.push(rowCells);
    });

    var rowCount = allRows.length;
    var rowH = Math.min(0.32, tableH / rowCount);

    var tableOpts = {
      x: K.MARGIN, y: tableY, w: K.CONTENT_W,
      border: { pt: 0.5, color: dark ? '334155' : 'E2E8F0' },
      rowH: rowH,
      autoPage: false
    };

    // Column widths
    if (content.colWidths) {
      var totalParts = content.colWidths.reduce(function (a, b) { return a + b; }, 0);
      tableOpts.colW = content.colWidths.map(function (p) { return (K.CONTENT_W * p) / totalParts; });
    }

    slide.addTable(allRows, tableOpts);

    if (content.footerText) {
      addFooter(slide, pres, content.footerText, catColor.primary, C, theme);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE TYPE → LAYOUT REGISTRY
  // Maps every Digester slide type to its optimal layout function.
  // ═══════════════════════════════════════════════════════════════════════════

  var SLIDE_TYPE_MAP = {
    // Layout 1: Hero Statement
    'learning-target':      { layout: 'heroStatement',       category: 'clarity' },
    'day-divider':          { layout: 'heroStatement',       category: 'unitDesign' },
    'check-in':             { layout: 'heroStatement',       category: 'community' },
    'breathing':            { layout: 'heroStatement',       category: 'community' },
    'commitment':           { layout: 'heroStatement',       category: 'community' },
    'teacher-ref-divider':  { layout: 'heroStatement',       category: 'assessment' },

    // Layout 2: Split Panel
    'relevance':            { layout: 'splitPanel',          category: 'clarity' },
    'vocabulary':           { layout: 'splitPanel',          category: 'clarity' },
    'essential-understanding': { layout: 'splitPanel',       category: 'clarity' },
    'focus-skill-detail':   { layout: 'splitPanel',          category: 'delivery' },
    'story':                { layout: 'splitPanel',          category: 'community' },
    'narrative':            { layout: 'splitPanel',          category: 'community' },
    'mission':              { layout: 'splitPanel',          category: 'community' },
    'math-toolbox':         { layout: 'splitPanel',          category: 'delivery' },
    'differentiation':      { layout: 'splitPanel',          category: 'delivery' },

    // Layout 3: Card Grid
    'warm-up':              { layout: 'cardGrid',            category: 'delivery' },
    'focus-skill':          { layout: 'cardGrid',            category: 'delivery' },
    'agenda':               { layout: 'cardGrid',            category: 'unitDesign' },
    'intro':                { layout: 'cardGrid',            category: 'unitDesign' },
    'team-roles':           { layout: 'cardGrid',            category: 'community' },
    'activity-launch':      { layout: 'cardGrid',            category: 'delivery' },
    'homework':             { layout: 'cardGrid',            category: 'assessment' },
    'cover':                { layout: 'cardGrid',            category: 'unitDesign' },
    'title':                { layout: 'cardGrid',            category: 'unitDesign' },

    // Layout 4: Checklist Tracker
    'success-criteria':     { layout: 'checklistTracker',    category: 'clarity' },
    'success-criteria-open': { layout: 'checklistTracker',   category: 'clarity' },
    'success-criteria-close': { layout: 'checklistTracker',  category: 'assessment' },
    'self-assessment':      { layout: 'checklistTracker',    category: 'assessment' },
    'learning-progression': { layout: 'checklistTracker',    category: 'clarity' },

    // Layout 5: Two-Column Compare
    'dual-error-analysis':  { layout: 'twoColumnCompare',    category: 'delivery' },
    'closure':              { layout: 'twoColumnCompare',    category: 'assessment' },
    'notice-wonder':        { layout: 'twoColumnCompare',    category: 'delivery' },
    'would-you-rather':     { layout: 'twoColumnCompare',    category: 'delivery' },

    // Layout 6: Phase Timeline
    'structured-dialogue':  { layout: 'phaseTimeline',       category: 'delivery' },
    'cra-progression':      { layout: 'phaseTimeline',       category: 'delivery' },
    'cooperative-structure': { layout: 'phaseTimeline',      category: 'delivery' },

    // Layout 7: Dialogue Bubbles
    'risa-social':          { layout: 'dialogueBubbles',     category: 'community' },
    'risa-academic':        { layout: 'dialogueBubbles',     category: 'delivery' },
    'sentence-frames':      { layout: 'dialogueBubbles',     category: 'delivery' },
    'group-discussion':     { layout: 'dialogueBubbles',     category: 'community' },

    // Layout 8: Problem Workspace
    'problem':              { layout: 'problemWorkspace',    category: 'delivery' },
    'exit-ticket':          { layout: 'problemWorkspace',    category: 'assessment' },
    'hinge-question':       { layout: 'problemWorkspace',    category: 'assessment' },
    'guided-practice':      { layout: 'problemWorkspace',    category: 'delivery' },
    'warm-up-review':       { layout: 'problemWorkspace',    category: 'delivery' },

    // Layout 9: Rubric Bands
    'rubric':               { layout: 'rubricBands',         category: 'assessment' },
    'dok-levels':           { layout: 'rubricBands',         category: 'assessment' },
    'benchmark-descriptors': { layout: 'rubricBands',        category: 'assessment' },
    'learning-log':         { layout: 'rubricBands',         category: 'assessment' },

    // Layout 10: Dashboard Data
    'slide-map':            { layout: 'dashboardData',       category: 'unitDesign' },
    'answer-key':           { layout: 'dashboardData',       category: 'assessment' },
    'misconceptions':       { layout: 'dashboardData',       category: 'assessment' },
    'cooperative-menu':     { layout: 'dashboardData',       category: 'delivery' }
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT FUNCTIONS MAP
  // ═══════════════════════════════════════════════════════════════════════════

  var LAYOUT_FUNCTIONS = {
    heroStatement:       layoutHeroStatement,
    splitPanel:          layoutSplitPanel,
    cardGrid:            layoutCardGrid,
    checklistTracker:    layoutChecklistTracker,
    twoColumnCompare:    layoutTwoColumnCompare,
    phaseTimeline:       layoutPhaseTimeline,
    dialogueBubbles:     layoutDialogueBubbles,
    problemWorkspace:    layoutProblemWorkspace,
    rubricBands:         layoutRubricBands,
    dashboardData:       layoutDashboardData
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // DISPATCH — Main entry point
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Dispatch a slide type to its optimal layout.
   *
   * @param {string} slideType  - e.g. 'exit-ticket', 'learning-target', 'rubric'
   * @param {Object} slide      - PptxGenJS slide
   * @param {Object} pres       - PptxGenJS presentation
   * @param {Object} content    - Layout-specific content object
   * @param {Object} C          - Color palette
   * @param {Object} theme      - Theme object (or null)
   * @returns {boolean} true if dispatched, false if no mapping found
   */
  function dispatch(slideType, slide, pres, content, C, theme) {
    var mapping = SLIDE_TYPE_MAP[slideType];
    if (!mapping) {
      console.warn('[LayoutEngine] No mapping for slide type: ' + slideType);
      return false;
    }

    var layoutFn = LAYOUT_FUNCTIONS[mapping.layout];
    if (!layoutFn) {
      console.warn('[LayoutEngine] No layout function: ' + mapping.layout);
      return false;
    }

    // Inject category if not already set
    if (!content.category) {
      content.category = mapping.category;
    }

    layoutFn(slide, pres, content, C, theme);
    return true;
  }

  /**
   * Get the layout name and category for a slide type.
   */
  function getMapping(slideType) {
    return SLIDE_TYPE_MAP[slideType] || null;
  }

  /**
   * Get all slide types assigned to a specific layout.
   */
  function getSlideTypesForLayout(layoutName) {
    var types = [];
    for (var key in SLIDE_TYPE_MAP) {
      if (SLIDE_TYPE_MAP[key].layout === layoutName) {
        types.push(key);
      }
    }
    return types;
  }

  /**
   * Get all slide types in a Practice Profile category.
   */
  function getSlideTypesForCategory(category) {
    var types = [];
    for (var key in SLIDE_TYPE_MAP) {
      if (SLIDE_TYPE_MAP[key].category === category) {
        types.push(key);
      }
    }
    return types;
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════════════════

  var LayoutEngine = {
    // Version
    version: '1.0.0',

    // Constants
    K: K,
    CATEGORIES: K.CATEGORIES,
    DEFAULT_CATEGORY_COLORS: DEFAULT_CATEGORY_COLORS,

    // Dispatch
    dispatch: dispatch,
    getMapping: getMapping,
    getSlideTypesForLayout: getSlideTypesForLayout,
    getSlideTypesForCategory: getSlideTypesForCategory,

    // Direct layout access
    layouts: {
      heroStatement:      layoutHeroStatement,
      splitPanel:         layoutSplitPanel,
      cardGrid:           layoutCardGrid,
      checklistTracker:   layoutChecklistTracker,
      twoColumnCompare:   layoutTwoColumnCompare,
      phaseTimeline:      layoutPhaseTimeline,
      dialogueBubbles:    layoutDialogueBubbles,
      problemWorkspace:   layoutProblemWorkspace,
      rubricBands:        layoutRubricBands,
      dashboardData:      layoutDashboardData
    },

    // Helpers (exposed for custom slide builders)
    helpers: {
      isDarkTheme: isDarkTheme,
      headingFont: headingFont,
      bodyFont: bodyFont,
      getCategoryColor: getCategoryColor,
      setBackground: setBackground,
      addHeader: addHeader,
      addFooter: addFooter,
      drawCard: drawCard,
      addBadge: addBadge,
      makeCardShadow: makeCardShadow,
      addTextWithFractions: addTextWithFractions,
      fracRuns: fracRuns,
      hasFractionRenderer: hasFR
    },

    // Registry (for inspection/debugging)
    registry: SLIDE_TYPE_MAP
  };

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayoutEngine;
  }
  root.LayoutEngine = LayoutEngine;

})(typeof window !== 'undefined' ? window : this);
