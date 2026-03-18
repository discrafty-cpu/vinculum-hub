/**
 * math-models.js — SVG Math Model Generator Library
 * Lesson Digester | Drummond Math Solutions
 *
 * 30 fully client-side SVG diagram generators for grades 6–8.
 * Each model accepts an options object and returns a raw SVG string.
 * The public API converts SVG → PNG data URL (via canvas) for PptxGenJS.
 *
 * Usage:
 *   const dataURL = await MathModels.getModel(analysis);
 *   slide.addImage({ data: dataURL, x: 1, y: 1, w: 4, h: 2.5 });
 *
 *   // Force a specific model:
 *   const dataURL = await MathModels.getModel(analysis, { forceModel: 'algebraTiles' });
 *
 *   // Just get an SVG string (for preview/debug):
 *   const svg = MathModels.getSVG('fractionBar', { numerator: 3, denominator: 4 });
 *
 * Drummond palette:
 *   Navy #1E2761 | Amber #D4870F | Teal #0D9488 | Blue #3B82F6 | Pink #E8436D
 */

const MathModels = (() => {

    // ── Palette ─────────────────────────────────────────────────────────────
    const C = {
        navy:        '#1E2761',
        amber:       '#D4870F',
        teal:        '#0D9488',
        blue:        '#3B82F6',
        pink:        '#E8436D',
        purple:      '#7C3AED',
        green:       '#16A34A',
        red:         '#DC2626',
        white:       '#FFFFFF',
        light:       '#F1F5F9',
        gray:        '#94A3B8',
        dark:        '#1E293B',
        mid:         '#475569',
        amberLight:  '#FEF3C7',
        tealLight:   '#CCFBF1',
        blueLight:   '#DBEAFE',
        navyLight:   '#E0E4F4',
        pinkLight:   '#FFE4EC',
        greenLight:  '#DCFCE7',
        purpleLight: '#EDE9FE',
    };

    // ── Standard Code → Primary Model ───────────────────────────────────────
    const STD_MAP = {
        '6.RP': 'ratioTable',
        '7.RP': 'percentBar',
        '6.NS': 'numberLine',
        '7.NS': 'integerChips',
        '8.NS': 'placeValueChart',
        '6.EE': 'algebraTiles',
        '7.EE': 'balanceScale',
        '8.EE': 'slopeTriangle',
        '8.F':  'coordinatePlane',
        '6.G':  'areaModel',
        '7.G':  'circleModel',
        '8.G':  'pythagorean',
        '6.SP': 'dotPlot',
        '7.SP': 'boxPlot',
        '8.SP': 'scatterPlot',
    };

    // ── Topic Keyword → Model (longest match wins) ───────────────────────────
    const TOPIC_MAP = [
        { keys: ['double number line'],                                          model: 'doubleNumberLine' },
        { keys: ['fraction circle', 'pie model', 'sector'],                      model: 'fractionCircle'   },
        { keys: ['area model', 'multiplier', 'partial product', 'distributive'], model: 'areaModel'        },
        { keys: ['fraction', 'numerator', 'denominator', 'mixed number'],        model: 'fractionBar'      },
        { keys: ['ratio', 'proportion', 'unit rate', 'equivalent ratio',
                  'scaling', 'scale factor', 'similar figure'],                  model: 'ratioTable'       },
        { keys: ['percent', 'percentage', 'discount', 'markup', 'tax', 'tip'],   model: 'percentBar'       },
        { keys: ['integer', 'negative number', 'opposite', 'absolute value'],    model: 'integerChips'     },
        { keys: ['number line', 'ordering', 'comparing rational'],               model: 'numberLine'       },
        { keys: ['tape diagram', 'bar model', 'strip diagram'],                  model: 'tapeDiagram'      },
        { keys: ['algebra tile', 'like term', 'combine', 'distribute', 'factor',
                  'expression', 'term', 'coefficient'],                          model: 'algebraTiles'     },
        { keys: ['balance', 'equation', 'solve', 'isolate', 'inverse operation']
                                                                                , model: 'balanceScale'    },
        { keys: ['slope', 'rate of change', 'rise over run'],                    model: 'slopeTriangle'    },
        { keys: ['linear', 'y = mx', 'function', 'input output',
                  'systems', 'intersection', 'coordinate'],                      model: 'coordinatePlane'  },
        { keys: ['pythagorean', 'hypotenuse', 'right triangle', 'distance between points'],
                                                                                  model: 'pythagorean'     },
        { keys: ['circle', 'circumference', 'diameter', 'radius', 'arc', 'pi'], model: 'circleModel'      },
        { keys: ['probability', 'outcome', 'sample space', 'compound event'],     model: 'probabilityArea'  },
        { keys: ['scatter', 'correlation', 'association', 'bivariate'],          model: 'scatterPlot'      },
        { keys: ['box plot', 'whisker', 'quartile', 'five-number', 'five number'],model: 'boxPlot'         },
        { keys: ['dot plot', 'data distribution'],                               model: 'dotPlot'          },
        { keys: ['transformation', 'translation', 'reflection', 'rotation',
                  'dilation', 'congruent', 'similar transformation'],            model: 'transformationGrid'},
        { keys: ['volume', 'prism', 'pyramid', 'cubic unit', 'surface area'],    model: 'volumeModel'      },
        { keys: ['angle', 'degree', 'supplementary', 'complementary',
                  'vertical angle', 'adjacent'],                                 model: 'angleModel'       },
        { keys: ['scientific notation', 'power of 10', 'exponent'],              model: 'scientificNotation'},
        { keys: ['place value', 'decimal', 'rounding', 'tenths', 'hundredths'],  model: 'placeValueChart'  },
        { keys: ['distance', 'rate', 'time', 'd = rt', 'speed'],                 model: 'tapeDiagram'      },
        { keys: ['ten frame', 'counting', 'subitize'],                           model: 'tenFrame'         },
        { keys: ['proportional relationship', 'constant of proportionality',
                  'y = kx', 'proportional graph'],                               model: 'proportionalGraph'},
        { keys: ['function machine', 'function rule', 'input output table',
                  'function notation'],                                           model: 'functionMachine'  },
        { keys: ['histogram', 'grouped data', 'frequency distribution',
                  'frequency table'],                                             model: 'histogram'        },
        { keys: ['tree diagram', 'two-stage experiment', 'listing outcomes',
                  'organized list', 'sample space diagram'],                     model: 'treeDiagram'      },
    ];

    // ── SVG building helpers (Vinculum-grade aesthetics) ───────────────────
    const DEFS_FILTERS = `
      <filter id="ds" x="-4%" y="-4%" width="112%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1E2761" flood-opacity="0.12"/>
      </filter>
      <filter id="ds-sm" x="-2%" y="-2%" width="106%" height="112%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#1E2761" flood-opacity="0.10"/>
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#EFF6FF"/>
      </linearGradient>
      <linearGradient id="axis-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${C.navy}" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="${C.navy}"/>
        <stop offset="100%" stop-color="${C.navy}" stop-opacity="0.6"/>
      </linearGradient>
      <radialGradient id="dot-glow-pink" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#FF8FAB"/>
        <stop offset="100%" stop-color="${C.pink}"/>
      </radialGradient>
      <radialGradient id="dot-glow-teal" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#5EEAD4"/>
        <stop offset="100%" stop-color="${C.teal}"/>
      </radialGradient>
      <radialGradient id="dot-glow-blue" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#93C5FD"/>
        <stop offset="100%" stop-color="${C.blue}"/>
      </radialGradient>
      <radialGradient id="dot-glow-amber" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#FCD34D"/>
        <stop offset="100%" stop-color="${C.amber}"/>
      </radialGradient>
      <radialGradient id="dot-glow-navy" cx="40%" cy="35%">
        <stop offset="0%" stop-color="#4B5EAA"/>
        <stop offset="100%" stop-color="${C.navy}"/>
      </radialGradient>`;

    // Map color to radial gradient id for dots
    const DOT_GRAD = {};
    DOT_GRAD[C.pink]  = 'url(#dot-glow-pink)';
    DOT_GRAD[C.teal]  = 'url(#dot-glow-teal)';
    DOT_GRAD[C.blue]  = 'url(#dot-glow-blue)';
    DOT_GRAD[C.amber] = 'url(#dot-glow-amber)';
    DOT_GRAD[C.navy]  = 'url(#dot-glow-navy)';

    function wrap(w, h, bg, body) {
        const bgFill = bg === C.white ? 'url(#bg-grad)' : (bg || C.white);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="font-family:'Inter',system-ui,-apple-system,Arial,Helvetica,sans-serif;"><defs>${DEFS_FILTERS}</defs><rect width="${w}" height="${h}" fill="${bgFill}" rx="10"/><rect x="1" y="1" width="${w-2}" height="${h-2}" fill="none" stroke="${C.navy}" stroke-opacity="0.06" stroke-width="1" rx="10"/>${body}</svg>`;
    }
    function t(x, y, str, o={}) {
        const sz  = o.sz    || 13;
        const col = o.col   || C.dark;
        const wt  = o.bold  ? '600' : '400';
        const anc = o.anc   || 'middle';
        const dy  = o.dy    || 0;
        const it  = o.italic? 'italic' : 'normal';
        const ls  = sz >= 16 ? ' letter-spacing="-0.02em"' : '';
        str = String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        return `<text x="${x}" y="${y}" dy="${dy}" text-anchor="${anc}" font-size="${sz}" font-weight="${wt}" font-style="${it}" fill="${col}"${ls}>${str}</text>`;
    }
    function r(x, y, w, h, o={}) {
        const fill   = o.fill   || 'none';
        const stroke = o.stroke || C.navy;
        const sw     = o.sw     !== undefined ? o.sw : 1.5;
        const rx     = o.rx     !== undefined ? o.rx : 4;
        const op     = o.op     !== undefined ? o.op : 1;
        const filt   = o.shadow ? ' filter="url(#ds-sm)"' : '';
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}" rx="${rx}"${filt}/>`;
    }
    function ln(x1,y1,x2,y2,o={}) {
        const col  = o.col || C.navy;
        const sw   = o.sw  !== undefined ? o.sw : 1.5;
        const dash = o.dash? `stroke-dasharray="${o.dash}"` : '';
        const cap  = o.cap ? `stroke-linecap="${o.cap}"` : 'stroke-linecap="round"';
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${sw}" ${dash} ${cap}/>`;
    }
    function circ(cx,cy,rad,o={}) {
        const fill   = o.fill   || 'none';
        const stroke = o.stroke || C.navy;
        const sw     = o.sw     !== undefined ? o.sw : 1.5;
        const op     = o.op     !== undefined ? o.op : 1;
        const glow   = o.glow   ? ' filter="url(#glow)"' : '';
        const gradFill = o.grad ? (DOT_GRAD[fill] || fill) : fill;
        return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${gradFill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"${glow}/>`;
    }
    function arrow(x1,y1,x2,y2,col,sw=2) {
        const id = 'a'+Math.floor(Math.random()*99999);
        return `<defs><marker id="${id}" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0.5,8 3,0 5.5" fill="${col}" opacity="0.8"/></marker></defs><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" marker-end="url(#${id})"/>`;
    }
    function poly(pts, fill, stroke, op=1, sw=2) {
        return `<polygon points="${pts.map(p=>p[0]+','+p[1]).join(' ')}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    }
    // Premium dot with gradient fill and optional glow
    function dot(cx, cy, rad, color, o={}) {
        const gradFill = DOT_GRAD[color] || color;
        const glow = o.glow ? ' filter="url(#glow)"' : '';
        return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${gradFill}" stroke="${C.white}" stroke-width="2"${glow}/>`;
    }
    // Soft panel behind content sections
    function panel(x, y, w, h, o={}) {
        const fill = o.fill || C.light;
        const op   = o.op   || 0.5;
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${op}" rx="8" filter="url(#ds)"/>`;
    }

    // ── SVG → PNG data URL ───────────────────────────────────────────────────
    function svgToPng(svgStr, w, h) {
        return new Promise((res, rej) => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width  = w * 2;
                canvas.height = h * 2;
                const ctx = canvas.getContext('2d');
                ctx.scale(2, 2);
                ctx.fillStyle = C.white;
                ctx.fillRect(0, 0, w, h);
                const img = new Image();
                img.onload  = () => { ctx.drawImage(img, 0, 0, w, h); res(canvas.toDataURL('image/png')); };
                img.onerror = () => rej(new Error('SVG render failed'));
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
            } catch(e) { rej(e); }
        });
    }

    // ── Topic detection ──────────────────────────────────────────────────────
    function detect(analysis) {
        const topicStr = ((analysis.topics||[]).join(' ')).toLowerCase();
        const stds     = (analysis.standards||[]).map(s=>s.code||'');
        // Standards first
        for (const s of stds) {
            const pre = s.replace(/\.\d.*$/,'');
            if (STD_MAP[pre]) return STD_MAP[pre];
        }
        // Topic keywords — longest match
        let best=null, bestLen=0;
        for (const e of TOPIC_MAP) {
            for (const k of e.keys) {
                if (topicStr.includes(k) && k.length > bestLen) { best=e.model; bestLen=k.length; }
            }
        }
        return best || 'workSpace';
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 1 — NUMBER LINE
    //  Use: integers, rational numbers, ordering, locating values
    // ════════════════════════════════════════════════════════════════════════
    function numberLine(o={}) {
        const min = o.min ?? 0, max = o.max ?? 10, step = o.step ?? 1;
        const hlS = o.hlStart ?? null, hlE = o.hlEnd ?? null;
        const pts = o.points || [];
        const W=600, H=180, lx=60, rx=540, y=92;
        const px = v => lx + ((v-min)/(max-min))*(rx-lx);
        const parts = [];
        // Subtle axis track
        parts.push(`<rect x="${lx-6}" y="${y-3}" width="${rx-lx+12}" height="6" fill="${C.navy}" fill-opacity="0.06" rx="3"/>`);
        // Highlight region with gradient
        if (hlS!==null && hlE!==null) {
            const hlId = 'hl'+Math.floor(Math.random()*99999);
            parts.push(`<defs><linearGradient id="${hlId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${C.amber}" stop-opacity="0.35"/><stop offset="100%" stop-color="${C.amber}" stop-opacity="0.12"/></linearGradient></defs>`);
            parts.push(`<rect x="${px(hlS)}" y="${y-20}" width="${px(hlE)-px(hlS)}" height="40" fill="url(#${hlId})" rx="6"/>`);
        }
        // Main axis line
        parts.push(arrow(lx-12,y,rx+14,y,C.navy,2));
        // Tick marks
        for (let v=min; v<=max; v+=step) {
            const x=px(v), maj=Number.isInteger(v);
            parts.push(ln(x,y-(maj?14:7),x,y+(maj?14:7),{col:maj?C.navy:C.gray,sw:maj?1.5:0.8}));
            if (maj) parts.push(t(x,y+32,v,{sz:13,col:C.dark}));
        }
        // Points with gradient dots and glow
        for (const p of pts) {
            const x=px(p.val), c=p.color||C.pink;
            parts.push(dot(x,y,8,c,{glow:true}));
            if (p.label) {
                // Label with pill background
                const lw = String(p.label).length * 7 + 12;
                parts.push(`<rect x="${x-lw/2}" y="${y-38}" width="${lw}" height="20" fill="${c}" fill-opacity="0.12" rx="10"/>`);
                parts.push(t(x,y-23,p.label,{sz:12,col:c,bold:true}));
            }
        }
        if (o.label) parts.push(t(W/2,H-8,o.label,{sz:12,col:C.navy,bold:true}));
        return wrap(W,H,C.white,parts.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 2 — DOUBLE NUMBER LINE
    //  Use: ratios, unit rates, percent, scale drawings
    // ════════════════════════════════════════════════════════════════════════
    function doubleNumberLine(o={}) {
        const topV  = o.topVals  || [0,1,2,3,4];
        const botV  = o.botVals  || [0,5,10,15,20];
        const topL  = o.topLabel || 'Quantity A';
        const botL  = o.botLabel || 'Quantity B';
        const W=620, H=240, lx=90, rx=560, ty=80, by=165;
        const n=topV.length-1, px=i=>lx+(i/n)*(rx-lx);
        const p=[];
        p.push(t(42,ty+5,topL,{sz:12,col:C.navy,bold:true,anc:'end'}));
        p.push(t(42,by+5,botL,{sz:12,col:C.teal,bold:true,anc:'end'}));
        p.push(arrow(lx-12,ty,rx+12,ty,C.navy,2.5));
        p.push(arrow(lx-12,by,rx+12,by,C.teal,2.5));
        for (let i=0;i<=n;i++) {
            const x=px(i);
            p.push(ln(x,ty-9,x,by+9,{col:C.gray,sw:1,dash:'4 3'}));
            p.push(ln(x,ty-10,x,ty+10,{col:C.navy,sw:2}));
            p.push(t(x,ty-18,topV[i],{sz:13,col:C.navy,bold:true}));
            p.push(ln(x,by-10,x,by+10,{col:C.teal,sw:2}));
            p.push(t(x,by+28,botV[i],{sz:13,col:C.teal,bold:true}));
        }
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 3 — FRACTION BAR
    //  Use: fractions, equivalent fractions, adding/subtracting fractions
    // ════════════════════════════════════════════════════════════════════════
    function fractionBar(o={}) {
        const n=o.numerator??3, d=o.denominator??4;
        const col=o.color||C.amber;
        const W=580, H=200, bx=50, by=68, bw=480, bh=72;
        const pw=bw/d;
        const p=[];
        // Title with decorative underline
        p.push(t(W/2,38,`${n}/${d}`,{sz:26,bold:true,col:C.navy}));
        p.push(`<rect x="${W/2-20}" y="44" width="40" height="3" fill="${col}" fill-opacity="0.5" rx="1.5"/>`);
        // Filled segments with gradient
        const gid = 'fb'+Math.floor(Math.random()*99999);
        p.push(`<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${col}" stop-opacity="0.85"/><stop offset="100%" stop-color="${col}" stop-opacity="0.55"/></linearGradient></defs>`);
        for (let i=0;i<n;i++)
            p.push(r(bx+i*pw,by,pw,bh,{fill:`url(#${gid})`,op:1,stroke:C.white,sw:2,rx:3}));
        // Outer frame with shadow
        p.push(r(bx,by,bw,bh,{fill:'none',stroke:C.navy,sw:2,rx:3,shadow:true}));
        // Dividers
        for (let i=1;i<d;i++)
            p.push(ln(bx+i*pw,by,bx+i*pw,by+bh,{col:C.navy,sw:1.2}));
        // Labels below with subtle styling
        for (let i=0;i<d;i++)
            p.push(t(bx+i*pw+pw/2,by+bh+22,`1/${d}`,{sz:11,col:i<n?C.dark:C.gray}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 4 — FRACTION CIRCLE
    //  Use: fractions as parts of a whole, comparing fractions, pi intro
    // ════════════════════════════════════════════════════════════════════════
    function fractionCircle(o={}) {
        const n=o.numerator??3, d=o.denominator??4;
        const col=o.color||C.amber;
        const W=340, H=340, cx=170, cy=178, R=140;
        const slice=(2*Math.PI)/d, start=-Math.PI/2;
        const p=[];
        // Shadow circle behind
        p.push(`<circle cx="${cx}" cy="${cy+2}" r="${R+2}" fill="${C.navy}" fill-opacity="0.06"/>`);
        // Gradient for filled slices
        const fcgid = 'fc'+Math.floor(Math.random()*99999);
        p.push(`<defs><radialGradient id="${fcgid}" cx="35%" cy="30%"><stop offset="0%" stop-color="${col}" stop-opacity="0.9"/><stop offset="100%" stop-color="${col}" stop-opacity="0.6"/></radialGradient></defs>`);
        for (let i=0;i<d;i++) {
            const a1=start+i*slice, a2=start+(i+1)*slice;
            const la=slice>Math.PI?1:0;
            const x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
            const x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
            const fill=i<n?`url(#${fcgid})`:C.light, op=i<n?1:1;
            p.push(`<path d="M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${la},1 ${x2},${y2} Z" fill="${fill}" fill-opacity="${op}" stroke="${C.white}" stroke-width="2"/>`);
        }
        // Outer ring
        p.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.navy}" stroke-width="2" stroke-opacity="0.3"/>`);
        // Center label with backdrop
        p.push(`<circle cx="${cx}" cy="${cy}" r="28" fill="${C.white}" fill-opacity="0.85" stroke="${C.navy}" stroke-width="1.5" stroke-opacity="0.2"/>`);
        p.push(t(cx,cy+9,`${n}/${d}`,{sz:26,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 5 — AREA MODEL
    //  Use: fraction × fraction, distributive property, polynomial expansion
    // ════════════════════════════════════════════════════════════════════════
    function areaModel(o={}) {
        const mode=o.mode||'fraction';
        const W=540, H=370;
        const p=[];
        if (mode==='fraction') {
            const rows=o.rows??3, cols=o.cols??4;
            const sR=o.shadeR??2, sC=o.shadeC??3;
            const bx=100,by=62,bw=360,bh=275, cw=bw/cols, rh=bh/rows;
            for (let row=0;row<rows;row++) for (let col=0;col<cols;col++) {
                const shade=row<sR&&col<sC;
                const s1=row<sR, s2=col<sC;
                let fill=C.light, op=1;
                if (shade){fill=C.amber;op=.7;}
                else if(s1){fill=C.blue;op=.18;}
                else if(s2){fill=C.teal;op=.18;}
                p.push(r(bx+col*cw,by+row*rh,cw,rh,{fill,op,stroke:C.navy,sw:1.5}));
            }
            for (let row=0;row<rows;row++) p.push(t(bx-16,by+row*rh+rh/2+5,`1/${rows}`,{sz:12,col:row<sR?C.blue:C.gray,bold:row<sR,anc:'end'}));
            for (let col=0;col<cols;col++) p.push(t(bx+col*cw+cw/2,by-14,`1/${cols}`,{sz:12,col:col<sC?C.teal:C.gray,bold:col<sC}));
            p.push(t(52,by+bh/2+5,`${sR}/${rows}`,{sz:20,bold:true,col:C.blue}));
            p.push(t(bx+bw/2,by-36,`${sC}/${cols}`,{sz:20,bold:true,col:C.teal}));
            p.push(t(W/2,H-8,`Product: ${sR*sC}/${rows*cols}`,{sz:16,bold:true,col:C.navy}));
        } else {
            const a=o.a??4, b=o.b??3, c=o.c??5;
            const bx=80,by=82,bh=185, tw=360;
            const bw=tw*b/(b+c), cw2=tw*c/(b+c);
            p.push(r(bx,by,bw,bh,{fill:C.amber,op:.5,stroke:C.navy,sw:2.5}));
            p.push(r(bx+bw,by,cw2,bh,{fill:C.teal,op:.4,stroke:C.navy,sw:2.5}));
            p.push(t(bx+bw/2,by+bh/2+6,`${a}×${b}=${a*b}`,{sz:16,bold:true,col:C.dark}));
            p.push(t(bx+bw+cw2/2,by+bh/2+6,`${a}×${c}=${a*c}`,{sz:16,bold:true,col:C.dark}));
            p.push(t(bx-20,by+bh/2+5,String(a),{sz:20,bold:true,col:C.navy,anc:'end'}));
            p.push(t(bx+bw/2,by-16,String(b),{sz:17,bold:true,col:C.amber}));
            p.push(t(bx+bw+cw2/2,by-16,String(c),{sz:17,bold:true,col:C.teal}));
            p.push(t(W/2,H-8,`${a}(${b}+${c}) = ${a*b}+${a*c} = ${a*(b+c)}`,{sz:16,bold:true,col:C.navy}));
        }
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 6 — RATIO TABLE
    //  Use: ratios, unit rate, proportional relationships, scaling
    // ════════════════════════════════════════════════════════════════════════
    function ratioTable(o={}) {
        const cA=o.colA||'x', cB=o.colB||'y';
        const rA=o.ratioA??3, rB=o.ratioB??4, rows=o.rows??5;
        const W=420, H=320, tx=70, ty=50, tw=280, rh=42, cw=tw/2;
        const p=[];
        // Table shadow panel
        p.push(panel(tx-4,ty-4,tw+8,rh*(rows+1)+8,{fill:C.white,op:1}));
        // Header with rounded top
        p.push(`<rect x="${tx}" y="${ty}" width="${tw}" height="${rh}" fill="${C.navy}" rx="6"/>`);
        p.push(`<rect x="${tx}" y="${ty+16}" width="${tw}" height="${rh-16}" fill="${C.navy}"/>`);
        p.push(t(tx+cw/2,ty+27,cA,{sz:16,bold:true,col:C.white}));
        p.push(t(tx+cw+cw/2,ty+27,cB,{sz:16,bold:true,col:C.white}));
        // Data rows
        for (let i=1;i<=rows;i++) {
            const ry=ty+i*rh, bg=i%2===0?'#F1F5F9':'#FFFFFF';
            const isLast = i===rows;
            if (isLast) {
                p.push(`<rect x="${tx}" y="${ry}" width="${tw}" height="${rh}" fill="${bg}" rx="0"/>`);
                p.push(`<rect x="${tx}" y="${ry}" width="${tw}" height="${rh-6}" fill="${bg}"/>`);
            } else {
                p.push(r(tx,ry,tw,rh,{fill:bg,stroke:'#E2E8F0',sw:0.5,rx:0}));
            }
            // Column divider
            p.push(ln(tx+cw,ry,tx+cw,ry+rh,{col:'#E2E8F0',sw:0.8}));
            p.push(t(tx+cw/2,ry+27,rA*i,{sz:16,bold:true,col:C.navy}));
            p.push(t(tx+cw+cw/2,ry+27,rB*i,{sz:16,bold:true,col:C.teal}));
        }
        // Table border
        p.push(r(tx,ty,tw,rh*(rows+1),{fill:'none',stroke:C.navy,sw:1.5,rx:6}));
        // Footer
        const ur = rB%rA===0 ? rB/rA : (rB/rA).toFixed(2);
        p.push(`<rect x="${W/2-100}" y="${H-28}" width="200" height="22" fill="${C.teal}" fill-opacity="0.08" rx="11"/>`);
        p.push(t(W/2,H-12,`Ratio ${rA}:${rB}  \u2192  Unit Rate: ${ur}`,{sz:12,col:C.teal,bold:true}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 7 — TAPE DIAGRAM (Bar Model)
    //  Use: part-part-whole, distance/rate/time, ratio comparisons
    // ════════════════════════════════════════════════════════════════════════
    function tapeDiagram(o={}) {
        const segs = o.parts || [
            {label:'Part A', value:3, color:C.amber},
            {label:'Part B', value:2, color:C.teal}
        ];
        const title=o.title||'Bar Model';
        const W=580, H=230, bx=60, by=72, bh=68, maxW=460;
        const total=segs.reduce((s,p)=>s+p.value,0);
        const p=[];
        p.push(t(W/2,38,title,{sz:16,bold:true,col:C.navy}));
        let curX=bx;
        for (const seg of segs) {
            const w=(seg.value/total)*maxW;
            p.push(r(curX,by,w,bh,{fill:seg.color||C.amber,op:.72,stroke:C.navy,sw:2}));
            p.push(t(curX+w/2,by+42,seg.label,{sz:12,bold:true,col:C.dark}));
            p.push(t(curX+w/2,by+bh+22,String(seg.value),{sz:13,col:C.navy}));
            curX+=w;
        }
        if (o.showTotal!==false) {
            p.push(ln(bx,by+bh+40,bx+maxW,by+bh+40,{col:C.navy,sw:2}));
            p.push(ln(bx,by+bh+34,bx,by+bh+46,{col:C.navy,sw:2}));
            p.push(ln(bx+maxW,by+bh+34,bx+maxW,by+bh+46,{col:C.navy,sw:2}));
            p.push(t(bx+maxW/2,by+bh+58,`Total: ${total}`,{sz:14,bold:true,col:C.navy}));
        }
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 8 — COORDINATE PLANE
    //  Use: graphing, functions, systems, transformations, linear relationships
    // ════════════════════════════════════════════════════════════════════════
    function coordinatePlane(o={}) {
        const min=o.min??-6, max=o.max??6, step=36;
        const pts=o.points||[], lineEq=o.lineEq||null;
        const W=480, H=480, cx=240, cy=240;
        const gx=v=>cx+v*step, gy=v=>cy-v*step;
        const p=[];
        // Subtle grid background
        p.push(`<rect x="${gx(min)}" y="${gy(max)}" width="${(max-min)*step}" height="${(max-min)*step}" fill="${C.navy}" fill-opacity="0.015" rx="4"/>`);
        // Grid — fine lines with alternating weight
        for (let v=min;v<=max;v++) {
            const isOrig = v===0;
            const sw = isOrig ? 0 : (v%2===0 ? 0.8 : 0.4);
            const col = isOrig ? 'none' : '#CBD5E1';
            p.push(ln(gx(v),gy(max),gx(v),gy(min),{col,sw}));
            p.push(ln(gx(min),gy(v),gx(max),gy(v),{col,sw}));
        }
        // Axes — clean with subtle ends
        p.push(arrow(gx(min)-8,cy,gx(max)+20,cy,C.navy,2));
        p.push(arrow(cx,gy(min)+8,cx,gy(max)-20,C.navy,2));
        // Axis labels with pill backgrounds
        p.push(`<rect x="${gx(max)+14}" y="${cy-12}" width="24" height="22" fill="${C.navy}" fill-opacity="0.08" rx="6"/>`);
        p.push(t(gx(max)+26,cy+5,'x',{sz:15,bold:true,col:C.navy}));
        p.push(`<rect x="${cx-6}" y="${gy(max)-38}" width="22" height="22" fill="${C.navy}" fill-opacity="0.08" rx="6"/>`);
        p.push(t(cx+5,gy(max)-22,'y',{sz:15,bold:true,col:C.navy}));
        // Ticks — refined
        for (let v=min;v<=max;v++) {
            if (!v) continue;
            p.push(ln(gx(v),cy-4,gx(v),cy+4,{col:C.navy,sw:1.2}));
            p.push(ln(cx-4,gy(v),cx+4,gy(v),{col:C.navy,sw:1.2}));
            if (v%2===0) {
                p.push(t(gx(v),cy+18,v,{sz:10,col:C.mid}));
                p.push(t(cx-12,gy(v)+4,v,{sz:10,col:C.mid,anc:'end'}));
            }
        }
        // Origin label
        p.push(t(cx-10,cy+18,'0',{sz:10,col:C.mid,anc:'end'}));
        // Optional line with glow
        if (lineEq) {
            const {slope:m,intercept:b,color:lc=C.pink}=lineEq;
            const x1=min+.5, x2=max-.5;
            // Glow behind line
            p.push(`<line x1="${gx(x1)}" y1="${gy(m*x1+b)}" x2="${gx(x2)}" y2="${gy(m*x2+b)}" stroke="${lc}" stroke-width="6" stroke-opacity="0.15" stroke-linecap="round"/>`);
            p.push(ln(gx(x1),gy(m*x1+b),gx(x2),gy(m*x2+b),{col:lc,sw:2.5}));
        }
        // Points with gradient dots
        for (const pt of pts) {
            const c = pt.color||C.pink;
            p.push(dot(gx(pt.x),gy(pt.y),7,c,{glow:true}));
            if (pt.label) {
                const lw = String(pt.label).length * 7 + 14;
                p.push(`<rect x="${gx(pt.x)+10}" y="${gy(pt.y)-20}" width="${lw}" height="18" fill="${C.white}" fill-opacity="0.9" stroke="${c}" stroke-width="1" rx="9" filter="url(#ds-sm)"/>`);
                p.push(t(gx(pt.x)+10+lw/2,gy(pt.y)-7,pt.label,{sz:11,bold:true,col:c}));
            }
        }
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 9 — ALGEBRA TILES
    //  Use: expressions, combining like terms, factoring, distributive property
    // ════════════════════════════════════════════════════════════════════════
    function algebraTiles(o={}) {
        const expr = o.expression || [{type:'x',sign:1,count:2},{type:'unit',sign:1,count:3}];
        const W=580, H=285;
        const SIZES = {x2:[80,80], x:[22,80], unit:[22,22]};
        const COLORS = {
            x2:  {pos:C.blue,   neg:'#93C5FD'},
            x:   {pos:C.teal,   neg:'#99F6E4'},
            unit:{pos:C.amber,  neg:'#FDE68A'},
        };
        const p=[];
        p.push(t(W/2,28,'Algebra Tiles',{sz:15,bold:true,col:C.navy}));
        let curX=28, curY=52;
        let exprStr='';
        for (const g of expr) {
            const [tw,th]=SIZES[g.type];
            const fill = COLORS[g.type][g.sign>0?'pos':'neg'];
            const dash = g.sign<0?{dash:'5 2'}:{};
            for (let i=0;i<g.count;i++) {
                if (curX+tw+10>W-26) { curX=28; curY+=th+18; }
                p.push(r(curX,curY,tw,th,{fill,stroke:g.sign>0?C.navy:C.gray,sw:2,rx:3,...dash}));
                const lbl=g.type==='x2'?'x²':g.type==='x'?'x':'1';
                p.push(t(curX+tw/2,curY+th/2+5,g.sign<0?`−${lbl}`:lbl,{sz:g.type==='x2'?18:12,bold:true,col:C.dark}));
                curX+=tw+5;
            }
            curX+=16;
            const sign=exprStr?g.sign>0?'+':'−':'';
            const term=g.type==='x2'?`${g.count}x²`:g.type==='x'?`${g.count}x`:String(g.count);
            exprStr+=sign?' '+sign+' '+term:term;
        }
        p.push(t(W/2,H-10,exprStr,{sz:20,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 10 — PERCENT BAR
    //  Use: percent of a number, percent change, percent equation
    // ════════════════════════════════════════════════════════════════════════
    function percentBar(o={}) {
        const pct=o.percent??40, whole=o.whole??80;
        const part=(pct/100)*whole;
        const W=580, H=225, bx=60, bw=460, ty=68, by=132, bh=52;
        const fw=(pct/100)*bw;
        const p=[];
        // Top: % bar
        p.push(r(bx,ty,bw,bh,{fill:C.light,stroke:C.navy,sw:2}));
        p.push(r(bx,ty,fw,bh,{fill:C.amber,op:.75,stroke:'none',sw:0}));
        p.push(ln(bx+fw,ty,bx+fw,ty+bh,{col:C.navy,sw:2.5}));
        p.push(t(bx,ty-12,'0%',{sz:11,col:C.gray}));
        p.push(t(bx+fw,ty-12,`${pct}%`,{sz:14,bold:true,col:C.amber}));
        p.push(t(bx+bw,ty-12,'100%',{sz:11,col:C.gray}));
        // Bottom: value bar
        p.push(r(bx,by,bw,bh,{fill:C.light,stroke:C.navy,sw:2}));
        p.push(r(bx,by,fw,bh,{fill:C.teal,op:.6,stroke:'none',sw:0}));
        p.push(ln(bx+fw,by,bx+fw,by+bh,{col:C.navy,sw:2.5}));
        p.push(t(bx,by-12,'0',{sz:11,col:C.gray}));
        p.push(t(bx+fw,by-12,String(part),{sz:14,bold:true,col:C.teal}));
        p.push(t(bx+bw,by-12,String(whole),{sz:11,col:C.gray}));
        // Connector
        p.push(ln(bx+fw,ty+bh,bx+fw,by,{col:C.navy,sw:1.5,dash:'5 3'}));
        p.push(t(W/2,H-8,o.label||`${pct}% of ${whole} = ${part}`,{sz:14,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 11 — INTEGER CHIPS
    //  Use: integer addition/subtraction, zero pairs, absolute value
    // ════════════════════════════════════════════════════════════════════════
    function integerChips(o={}) {
        const pos=o.positive??5, neg=o.negative??3;
        const W=560, H=265, R=24;
        const n=Math.max(pos,neg), startX=W/2-(n*(R*2+10))/2+R;
        const p=[];
        p.push(t(W/2,28,'Integer Chips',{sz:15,bold:true,col:C.navy}));
        for (let i=0;i<pos;i++) {
            const cx=startX+i*(R*2+10);
            p.push(circ(cx,85,R,{fill:C.amber,stroke:C.dark,sw:2}));
            p.push(t(cx,91,'+',{sz:20,bold:true,col:C.white}));
        }
        p.push(t(startX-R-18,91,'+',{sz:18,bold:true,col:C.amber,anc:'end'}));
        for (let i=0;i<neg;i++) {
            const cx=startX+i*(R*2+10);
            p.push(circ(cx,155,R,{fill:C.pink,stroke:C.dark,sw:2}));
            p.push(t(cx,161,'−',{sz:20,bold:true,col:C.white}));
        }
        p.push(t(startX-R-18,161,'−',{sz:18,bold:true,col:C.pink,anc:'end'}));
        const pairs=Math.min(pos,neg), net=pos-neg;
        if (pairs>0) {
            const bw=pairs*(R*2+10)-10;
            p.push(t(W/2,200,`${pairs} zero pair${pairs>1?'s':''} cancel`,{sz:12,col:C.gray}));
            p.push(ln(startX-R,213,startX-R+bw,213,{col:C.gray,sw:1.5}));
            p.push(ln(startX-R,208,startX-R,218,{col:C.gray,sw:1.5}));
            p.push(ln(startX-R+bw,208,startX-R+bw,218,{col:C.gray,sw:1.5}));
        }
        const netStr=net===0?'0':net>0?`+${net}`:String(net);
        p.push(t(W/2,H-8,`Result: ${netStr}`,{sz:16,bold:true,col:net>=0?C.amber:C.pink}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 12 — BALANCE SCALE
    //  Use: equations, solving for variables, equality concept
    // ════════════════════════════════════════════════════════════════════════
    function balanceScale(o={}) {
        const lE=o.leftExpr||'2x + 3', rE=o.rightExpr||'11';
        const W=540, H=345, beamY=160, bx1=100, bx2=440, fx=270, pW=130, pH=55;
        const p=[];
        p.push(ln(bx1,beamY,bx2,beamY,{col:C.navy,sw:4}));
        p.push(`<polygon points="${fx},${beamY} ${fx-30},${beamY+60} ${fx+30},${beamY+60}" fill="${C.navy}"/>`);
        p.push(r(fx-50,beamY+60,100,15,{fill:C.navy,stroke:'none',sw:0}));
        // Left pan
        p.push(ln(bx1+20,beamY,bx1+20,beamY+50,{col:C.gray,sw:1.5}));
        p.push(ln(bx1+20+pW,beamY,bx1+20+pW,beamY+50,{col:C.gray,sw:1.5}));
        p.push(`<path d="M${bx1+5},${beamY+50} Q${bx1+20+pW/2},${beamY+85} ${bx1+35+pW},${beamY+50}" fill="none" stroke="${C.navy}" stroke-width="2.5"/>`);
        p.push(r(bx1+12,beamY+55,pW+16,pH,{fill:C.amberLight,stroke:C.amber,sw:2,rx:6}));
        p.push(t(bx1+20+pW/2,beamY+87,lE,{sz:17,bold:true,col:C.navy}));
        // Right pan
        p.push(ln(bx2-20,beamY,bx2-20,beamY+50,{col:C.gray,sw:1.5}));
        p.push(ln(bx2-20-pW,beamY,bx2-20-pW,beamY+50,{col:C.gray,sw:1.5}));
        p.push(`<path d="M${bx2-35-pW},${beamY+50} Q${bx2-20-pW/2},${beamY+85} ${bx2-5},${beamY+50}" fill="none" stroke="${C.navy}" stroke-width="2.5"/>`);
        p.push(r(bx2-36-pW,beamY+55,pW+16,pH,{fill:C.tealLight,stroke:C.teal,sw:2,rx:6}));
        p.push(t(bx2-20-pW/2,beamY+87,rE,{sz:17,bold:true,col:C.teal}));
        p.push(t(fx,beamY-20,'=',{sz:22,bold:true,col:C.navy}));
        if (o.stepLabel) p.push(t(W/2,H-12,o.stepLabel,{sz:12,col:C.gray,bold:true}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 13 — SLOPE TRIANGLE
    //  Use: slope, rate of change, linear relationships, y = mx + b
    // ════════════════════════════════════════════════════════════════════════
    function slopeTriangle(o={}) {
        const rise=o.rise??2, run=o.run??3;
        const m=rise/run;
        const W=540, H=440, min=-5, max=5, step=40;
        const cx=W/2, cy=H/2, gx=v=>cx+v*step, gy=v=>cy-v*step;
        const p=[];
        for (let v=min;v<=max;v++) {
            p.push(ln(gx(v),gy(max),gx(v),gy(min),{col:'#E2E8F0',sw:1}));
            p.push(ln(gx(min),gy(v),gx(max),gy(v),{col:'#E2E8F0',sw:1}));
        }
        p.push(arrow(gx(min)-8,cy,gx(max)+18,cy,C.navy,2));
        p.push(arrow(cx,gy(min)+8,cx,gy(max)-18,C.navy,2));
        p.push(t(gx(max)+22,cy+5,'x',{sz:15,bold:true,col:C.navy}));
        p.push(t(cx+5,gy(max)-22,'y',{sz:15,bold:true,col:C.navy}));
        // The line
        const x1=min+.5, x2=max-.5;
        p.push(ln(gx(x1),gy(m*x1),gx(x2),gy(m*x2),{col:C.pink,sw:3}));
        // Triangle
        const tx0=0, ty0=0, tx1=tx0+run, tx2=tx0+run, ty2=ty0+rise;
        p.push(ln(gx(tx0),gy(ty0),gx(tx1),gy(ty0),{col:C.teal,sw:3}));   // run
        p.push(ln(gx(tx1),gy(ty0),gx(tx2),gy(ty2),{col:C.amber,sw:3}));  // rise
        // Labels
        p.push(t(gx((tx0+tx1)/2),gy(ty0)+18,`run = ${run}`,{sz:14,bold:true,col:C.teal}));
        p.push(t(gx(tx2)+32,gy((ty0+ty2)/2),`rise = ${rise}`,{sz:14,bold:true,col:C.amber}));
        p.push(circ(gx(tx0),gy(ty0),5,{fill:C.pink,stroke:C.white,sw:2}));
        p.push(circ(gx(tx2),gy(ty2),5,{fill:C.pink,stroke:C.white,sw:2}));
        const slopeStr=`${rise}/${run}`;
        p.push(t(W/2,H-12,`slope = rise/run = ${slopeStr}`,{sz:16,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 14 — PYTHAGOREAN THEOREM
    //  Use: right triangles, distance formula, hypotenuse
    // ════════════════════════════════════════════════════════════════════════
    function pythagorean(o={}) {
        const a=o.a??3, b=o.b??4;
        const c=Math.round(Math.sqrt(a*a+b*b)*100)/100;
        const W=500, H=445, sc=38;
        const tx=155, ty=285;
        const p1=[tx,ty], p2=[tx+b*sc,ty], p3=[tx,ty-a*sc];
        const p=[];
        // Gradient defs for area squares
        const pyg1 = 'pyg1'+Math.floor(Math.random()*9999);
        const pyg2 = 'pyg2'+Math.floor(Math.random()*9999);
        const pyg3 = 'pyg3'+Math.floor(Math.random()*9999);
        p.push(`<defs>
          <linearGradient id="${pyg1}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${C.blue}" stop-opacity="0.35"/><stop offset="100%" stop-color="${C.blue}" stop-opacity="0.15"/></linearGradient>
          <linearGradient id="${pyg2}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${C.teal}" stop-opacity="0.35"/><stop offset="100%" stop-color="${C.teal}" stop-opacity="0.15"/></linearGradient>
          <linearGradient id="${pyg3}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${C.amber}" stop-opacity="0.35"/><stop offset="100%" stop-color="${C.amber}" stop-opacity="0.15"/></linearGradient>
        </defs>`);
        // a² square (left) with gradient
        p.push(r(tx-a*sc,ty-a*sc,a*sc,a*sc,{fill:`url(#${pyg1})`,op:1,stroke:C.blue,sw:1.5,rx:3,shadow:true}));
        p.push(t(tx-a*sc/2,ty-a*sc/2+6,`a\u00B2=${a*a}`,{sz:14,bold:true,col:C.blue}));
        // b² square (bottom) with gradient
        p.push(r(tx,ty,b*sc,b*sc,{fill:`url(#${pyg2})`,op:1,stroke:C.teal,sw:1.5,rx:3,shadow:true}));
        p.push(t(tx+b*sc/2,ty+b*sc/2+6,`b\u00B2=${b*b}`,{sz:14,bold:true,col:C.teal}));
        // c² (rotated) with gradient
        const cLen=c*sc, ang=Math.atan2(a,b)*180/Math.PI;
        p.push(`<rect x="${p2[0]}" y="${p2[1]-cLen}" width="${cLen}" height="${cLen}" fill="url(#${pyg3})" stroke="${C.amber}" stroke-width="1.5" rx="3" transform="rotate(${-ang} ${p2[0]} ${p2[1]})" filter="url(#ds-sm)"/>`);
        const midCx=(p2[0]+p3[0])/2+26, midCy=(p2[1]+p3[1])/2;
        p.push(t(midCx,midCy,`c\u00B2=${Math.round(c*c)}`,{sz:14,bold:true,col:C.amber}));
        // Triangle with subtle fill
        p.push(poly([p1,p2,p3],'#1E2761','#1E2761',.08,2.5));
        // Vertex dots
        p.push(dot(p1[0],p1[1],5,C.navy));
        p.push(dot(p2[0],p2[1],5,C.navy));
        p.push(dot(p3[0],p3[1],5,C.navy));
        // Right angle marker — refined
        const rs=14;
        p.push(`<path d="M${p1[0]+rs},${p1[1]} L${p1[0]+rs},${p1[1]-rs} L${p1[0]},${p1[1]-rs}" fill="${C.navy}" fill-opacity="0.06" stroke="${C.navy}" stroke-width="1.5" stroke-linejoin="round"/>`);
        // Side labels with pill backgrounds
        const sideLabels = [
            {x:p1[0]-22, y:(p1[1]+p3[1])/2, text:`a=${a}`, col:C.blue, anc:'end'},
            {x:(p1[0]+p2[0])/2, y:p1[1]+24, text:`b=${b}`, col:C.teal, anc:'middle'},
            {x:midCx-60, y:midCy+30, text:`c=${c}`, col:C.amber, anc:'middle'}
        ];
        for (const sl of sideLabels) {
            const lw = sl.text.length * 8 + 12;
            const lx2 = sl.anc==='end' ? sl.x-lw : sl.x-lw/2;
            p.push(`<rect x="${lx2}" y="${sl.y-14}" width="${lw}" height="20" fill="${sl.col}" fill-opacity="0.10" rx="10"/>`);
            p.push(t(sl.anc==='end'?sl.x-lw/2:sl.x,sl.y,sl.text,{sz:14,bold:true,col:sl.col}));
        }
        // Formula bar at bottom
        p.push(`<rect x="${W/2-150}" y="${H-32}" width="300" height="26" fill="${C.navy}" fill-opacity="0.06" rx="13"/>`);
        p.push(t(W/2,H-14,`a\u00B2 + b\u00B2 = c\u00B2   \u2192   ${a*a} + ${b*b} = ${Math.round(c*c)}`,{sz:14,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 15 — CIRCLE MODEL
    //  Use: circumference, area of circles, pi, arc length
    // ════════════════════════════════════════════════════════════════════════
    function circleModel(o={}) {
        const rad=o.radius??5;
        const W=420, H=420, cx=210, cy=210, R=150;
        const p=[];
        p.push(circ(cx,cy,R,{fill:C.tealLight,stroke:C.teal,sw:3}));
        // Diameter
        p.push(ln(cx-R,cy,cx+R,cy,{col:C.blue,sw:2.5}));
        p.push(t(cx,cy-12,`d = ${2*rad}`,{sz:15,bold:true,col:C.blue}));
        // Radius
        const ra1=cx+R*Math.cos(-Math.PI/4), ra2=cy+R*Math.sin(-Math.PI/4);
        p.push(ln(cx,cy,ra1,ra2,{col:C.amber,sw:2.5}));
        p.push(t(cx+R*.38,cy+R*.32,`r = ${rad}`,{sz:14,bold:true,col:C.amber}));
        p.push(circ(cx,cy,5,{fill:C.navy,stroke:C.white,sw:2}));
        // Circumference arc
        p.push(`<path d="M${cx+R},${cy} A${R},${R} 0 0,1 ${cx},${cy-R}" fill="none" stroke="${C.pink}" stroke-width="5" stroke-dasharray="14 5"/>`);
        p.push(t(cx+R+16,cy-R/2,'C',{sz:14,bold:true,col:C.pink}));
        if (o.showFormulas!==false) {
            const C2=(2*Math.PI*rad).toFixed(2), A=(Math.PI*rad*rad).toFixed(2);
            p.push(t(cx,H-40,`C = 2πr = ${C2}`,{sz:14,bold:true,col:C.teal}));
            p.push(t(cx,H-14,`A = πr² = ${A}`,{sz:14,bold:true,col:C.amber}));
        }
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 16 — PROBABILITY AREA MODEL
    //  Use: compound probability, independent events, sample space
    // ════════════════════════════════════════════════════════════════════════
    function probabilityArea(o={}) {
        const evA=o.eventA||[{label:'H',p:.5},{label:'T',p:.5}];
        const evB=o.eventB||[{label:'H',p:.5},{label:'T',p:.5}];
        const tA=o.titleA||'Event A', tB=o.titleB||'Event B';
        const W=480, H=440, bx=110, by=82, bw=320, bh=320;
        const colors=[C.amber,C.teal,C.blue,C.pink,C.purple,C.green];
        const p=[];
        p.push(t(W/2,36,`P(${tA} and ${tB})`,{sz:16,bold:true,col:C.navy}));
        let ci=0, rowY=by;
        for (const eb of evB) {
            const rh=eb.p*bh; let colX=bx;
            for (const ea of evA) {
                const cw2=ea.p*bw, clr=colors[ci%colors.length];
                p.push(r(colX,rowY,cw2,rh,{fill:clr,op:.45,stroke:C.white,sw:2}));
                p.push(t(colX+cw2/2,rowY+rh/2+4,`${ea.label},${eb.label}`,{sz:13,bold:true,col:C.dark}));
                const prob=ea.p*eb.p;
                p.push(t(colX+cw2/2,rowY+rh/2+20,prob%1===0?String(prob):prob.toFixed(2),{sz:11,col:C.dark}));
                colX+=cw2; ci++;
            }
            p.push(t(bx-14,rowY+rh/2+5,eb.label,{sz:14,bold:true,col:C.navy,anc:'end'}));
            rowY+=rh;
        }
        let colX=bx;
        for (const ea of evA) {
            const cw2=ea.p*bw;
            p.push(t(colX+cw2/2,by-16,ea.label,{sz:14,bold:true,col:C.navy}));
            colX+=cw2;
        }
        p.push(t(bx+bw/2,by+bh+28,tA,{sz:13,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 17 — BOX PLOT
    //  Use: 5-number summary, IQR, comparing distributions
    // ════════════════════════════════════════════════════════════════════════
    function boxPlot(o={}) {
        const [minV,q1,med,q3,maxV]=o.data||[10,20,35,45,60];
        const W=580, H=220, lx=60, rx=520, y=82, bh=56;
        const px=v=>lx+((v-minV)/(maxV-minV||1))*(rx-lx);
        const p=[];
        p.push(t(W/2,26,'Box Plot',{sz:15,bold:true,col:C.navy}));
        // Subtle axis track
        p.push(`<rect x="${lx-6}" y="${y+bh/2-2}" width="${rx-lx+12}" height="4" fill="${C.teal}" fill-opacity="0.08" rx="2"/>`);
        // Box with gradient fill
        const bpgid = 'bp'+Math.floor(Math.random()*99999);
        p.push(`<defs><linearGradient id="${bpgid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${C.teal}" stop-opacity="0.25"/><stop offset="100%" stop-color="${C.teal}" stop-opacity="0.10"/></linearGradient></defs>`);
        p.push(r(px(q1),y,px(q3)-px(q1),bh,{fill:`url(#${bpgid})`,op:1,stroke:C.teal,sw:2,rx:4,shadow:true}));
        // Median line — bold with glow
        p.push(`<line x1="${px(med)}" y1="${y}" x2="${px(med)}" y2="${y+bh}" stroke="${C.navy}" stroke-width="6" stroke-opacity="0.12" stroke-linecap="round"/>`);
        p.push(ln(px(med),y,px(med),y+bh,{col:C.navy,sw:3}));
        // Whiskers — refined
        p.push(ln(px(minV),y+bh/2,px(q1),y+bh/2,{col:C.teal,sw:1.5}));
        p.push(ln(px(q3),y+bh/2,px(maxV),y+bh/2,{col:C.teal,sw:1.5}));
        p.push(ln(px(minV),y+12,px(minV),y+bh-12,{col:C.teal,sw:1.5}));
        p.push(ln(px(maxV),y+12,px(maxV),y+bh-12,{col:C.teal,sw:1.5}));
        // Endpoint dots
        p.push(dot(px(minV),y+bh/2,4,C.teal));
        p.push(dot(px(maxV),y+bh/2,4,C.teal));
        // Labels with pill backgrounds
        for (const [v,lbl] of [[minV,'Min'],[q1,'Q1'],[med,'Med'],[q3,'Q3'],[maxV,'Max']]) {
            const isMed = v===med;
            const lw = lbl.length * 8 + 8;
            p.push(`<rect x="${px(v)-lw/2}" y="${y+bh+8}" width="${lw}" height="16" fill="${isMed?C.navy:C.teal}" fill-opacity="0.08" rx="8"/>`);
            p.push(t(px(v),y+bh+20,lbl,{sz:10,col:isMed?C.navy:C.teal,bold:true}));
            p.push(t(px(v),y+bh+36,String(v),{sz:12,bold:true,col:C.navy}));
        }
        // Stats footer
        p.push(`<rect x="${W/2-90}" y="${H-26}" width="180" height="20" fill="${C.teal}" fill-opacity="0.06" rx="10"/>`);
        p.push(t(W/2,H-11,`IQR = ${q3-q1}   Range = ${maxV-minV}`,{sz:12,col:C.teal,bold:true}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 18 — DOT PLOT
    //  Use: data distribution, mean/median/mode, shape of data
    // ════════════════════════════════════════════════════════════════════════
    function dotPlot(o={}) {
        const data=o.data||[2,3,3,4,4,4,5,5,6,7];
        const title=o.title||'Dot Plot';
        const W=560, H=265, lx=60, rx=500, baseY=192;
        const mn=Math.min(...data), mx=Math.max(...data);
        const px=v=>lx+((v-mn)/(mx-mn||1))*(rx-lx);
        const counts={};
        for (const v of data) counts[v]=(counts[v]||0)+1;
        const R=11;
        const p=[];
        p.push(t(W/2,28,title,{sz:15,bold:true,col:C.navy}));
        p.push(ln(lx-10,baseY,rx+10,baseY,{col:C.navy,sw:2}));
        for (let v=mn;v<=mx;v++) {
            const x=px(v);
            p.push(ln(x,baseY-6,x,baseY+6,{col:C.navy,sw:2}));
            p.push(t(x,baseY+22,v,{sz:13,col:C.dark}));
        }
        for (const [val,cnt] of Object.entries(counts)) {
            const x=px(Number(val));
            for (let i=0;i<cnt;i++) {
                const cy2=baseY-R-i*(R*2+3)-6;
                p.push(circ(x,cy2,R,{fill:C.blue,stroke:C.navy,sw:1.5}));
            }
        }
        const n=data.length;
        const mean=(data.reduce((s,v)=>s+v,0)/n).toFixed(1);
        const srt=[...data].sort((a,b)=>a-b);
        const med=n%2===0?((srt[n/2-1]+srt[n/2])/2).toFixed(1):srt[Math.floor(n/2)];
        p.push(t(W/2,H-8,`n=${n}  |  Mean=${mean}  |  Median=${med}`,{sz:12,col:C.gray}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 19 — SCATTER PLOT
    //  Use: bivariate data, correlation, line of best fit, prediction
    // ════════════════════════════════════════════════════════════════════════
    function scatterPlot(o={}) {
        const pts=o.points||[{x:1,y:2},{x:2,y:3},{x:3,y:4},{x:4,y:5},{x:5,y:5},{x:6,y:7},{x:7,y:8},{x:8,y:9}];
        const xL=o.xLabel||'x', yL=o.yLabel||'y';
        const W=480, H=440, bx=60, by=30, bw=380, bh=360;
        const allX=pts.map(p=>p.x), allY=pts.map(p=>p.y);
        const mnX=Math.min(...allX),mxX=Math.max(...allX);
        const mnY=Math.min(...allY),mxY=Math.max(...allY);
        const gx=x=>bx+((x-mnX)/(mxX-mnX||1))*bw;
        const gy=y=>by+bh-((y-mnY)/(mxY-mnY||1))*bh;
        const p=[];
        for (let i=0;i<=5;i++) {
            const x=bx+(i/5)*bw, y=by+(i/5)*bh;
            const xv=mnX+(i/5)*(mxX-mnX), yv=mxY-(i/5)*(mxY-mnY);
            p.push(ln(x,by,x,by+bh,{col:'#E2E8F0',sw:1}));
            p.push(ln(bx,y,bx+bw,y,{col:'#E2E8F0',sw:1}));
            p.push(t(x,by+bh+20,xv.toFixed(0),{sz:11,col:C.gray}));
            p.push(t(bx-10,y+4,yv.toFixed(0),{sz:11,col:C.gray,anc:'end'}));
        }
        p.push(r(bx,by,bw,bh,{fill:'none',stroke:C.navy,sw:2}));
        if (o.showTrend!==false && pts.length>1) {
            const n=pts.length;
            const sx=allX.reduce((s,v)=>s+v,0), sy=allY.reduce((s,v)=>s+v,0);
            const sxy=pts.reduce((s,pt)=>s+pt.x*pt.y,0);
            const sx2=allX.reduce((s,v)=>s+v*v,0);
            const m=(n*sxy-sx*sy)/(n*sx2-sx*sx||1);
            const b=(sy-m*sx)/n;
            p.push(ln(gx(mnX),gy(m*mnX+b),gx(mxX),gy(m*mxX+b),{col:C.pink,sw:2.5,dash:'8 4'}));
        }
        for (const pt of pts) p.push(circ(gx(pt.x),gy(pt.y),6,{fill:C.blue,stroke:C.navy,sw:1.5}));
        p.push(t(bx+bw/2,by+bh+40,xL,{sz:13,bold:true,col:C.navy}));
        p.push(`<text x="16" y="${by+bh/2}" text-anchor="middle" font-size="13" font-weight="bold" fill="${C.navy}" transform="rotate(-90 16 ${by+bh/2})">${yL}</text>`);
        const assoc=o.association||'Positive association';
        p.push(t(bx+bw/2,H-8,assoc,{sz:13,col:C.gray,bold:true}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 20 — TRANSFORMATION GRID
    //  Use: translations, reflections, rotations, dilations
    // ════════════════════════════════════════════════════════════════════════
    function transformationGrid(o={}) {
        const type=o.type||'translation';
        const pre=o.preImage||[[1,1],[3,1],[2,3]];
        const post=o.postImage||[[3,1],[5,1],[4,3]];
        const W=500, H=480, min=-6, max=6, step=38;
        const cx=250, cy=240, gx=v=>cx+v*step, gy=v=>cy-v*step;
        const p=[];
        for (let v=min;v<=max;v++) {
            p.push(ln(gx(v),gy(max),gx(v),gy(min),{col:'#E2E8F0',sw:1}));
            p.push(ln(gx(min),gy(v),gx(max),gy(v),{col:'#E2E8F0',sw:1}));
        }
        p.push(arrow(gx(min)-6,cy,gx(max)+16,cy,C.navy,2));
        p.push(arrow(cx,gy(min)+6,cx,gy(max)-16,C.navy,2));
        // Pre-image
        const preStr=pre.map(([x,y])=>`${gx(x)},${gy(y)}`).join(' ');
        p.push(`<polygon points="${preStr}" fill="${C.navy}" fill-opacity=".15" stroke="${C.navy}" stroke-width="2.5" stroke-dasharray="6 3"/>`);
        for (const [x,y] of pre) p.push(circ(gx(x),gy(y),5,{fill:C.navy,stroke:C.white,sw:1.5}));
        // Image
        const postStr=post.map(([x,y])=>`${gx(x)},${gy(y)}`).join(' ');
        p.push(`<polygon points="${postStr}" fill="${C.amber}" fill-opacity=".35" stroke="${C.amber}" stroke-width="2.5"/>`);
        for (const [x,y] of post) p.push(circ(gx(x),gy(y),5,{fill:C.amber,stroke:C.white,sw:1.5}));
        // Labels
        p.push(t(gx(pre[0][0])-14,gy(pre[0][1])-12,'A',{sz:13,bold:true,col:C.navy}));
        p.push(t(gx(post[0][0])+10,gy(post[0][1])-12,"A'",{sz:13,bold:true,col:C.amber}));
        // Legend
        p.push(r(18,18,130,26,{fill:C.white,stroke:C.gray,sw:1,rx:4}));
        p.push(ln(26,31,48,31,{col:C.navy,sw:2,dash:'5 3'})); p.push(t(54,35,'Pre-image',{sz:11,col:C.navy,anc:'start'}));
        p.push(r(152,18,130,26,{fill:C.white,stroke:C.gray,sw:1,rx:4}));
        p.push(ln(160,31,182,31,{col:C.amber,sw:2.5})); p.push(t(188,35,"Image (A')",{sz:11,col:C.amber,anc:'start'}));
        const typeLabel=type==='translation'?'Translation':type==='reflection'?'Reflection':type==='rotation'?'Rotation':'Dilation';
        p.push(t(W/2,H-10,typeLabel,{sz:14,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 21 — VOLUME MODEL (Isometric 3D Prism)
    //  Use: volume, surface area, rectangular prisms
    // ════════════════════════════════════════════════════════════════════════
    function volumeModel(o={}) {
        const l=o.length??4, w=o.width??3, h=o.height??2;
        const W=480, H=360;
        const ox=155, oy=252, sx=55, sy=22, hx=0, hy=-55, dx=-28, dy=-18;
        const pt=(li,wi,hi)=>([ox+li*sx+wi*dx+hi*hx, oy+li*sy+wi*dy+hi*hy]);
        const p=[];
        // Bottom
        p.push(poly([pt(0,0,0),pt(l,0,0),pt(l,w,0),pt(0,w,0)],C.blue,C.navy,.18));
        // Front
        p.push(poly([pt(0,0,0),pt(l,0,0),pt(l,0,h),pt(0,0,h)],C.tealLight,C.teal,.9));
        // Right
        p.push(poly([pt(l,0,0),pt(l,w,0),pt(l,w,h),pt(l,0,h)],C.navyLight,C.navy,.9));
        // Top
        p.push(poly([pt(0,0,h),pt(l,0,h),pt(l,w,h),pt(0,w,h)],C.amberLight,C.amber,.9));
        // Labels
        const mF=pt(l/2,0,0);  p.push(t(mF[0]+2,mF[1]+20,`${l} units`,{sz:13,bold:true,col:C.teal}));
        const mR=pt(l,w/2,0);  p.push(t(mR[0]+16,mR[1]+5,`${w} units`,{sz:13,bold:true,col:C.navy}));
        const mH=pt(0,0,h/2);  p.push(t(mH[0]-14,mH[1],`${h} units`,{sz:13,bold:true,col:C.amber,anc:'end'}));
        const vol=l*w*h, sa=2*(l*w+l*h+w*h);
        p.push(t(W/2,H-28,`V = ${l}×${w}×${h} = ${vol} units³`,{sz:14,bold:true,col:C.navy}));
        p.push(t(W/2,H-8,`SA = 2(lw+lh+wh) = ${sa} units²`,{sz:12,col:C.teal}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 22 — ANGLE MODEL
    //  Use: angle types, supplementary, complementary, vertical angles
    // ════════════════════════════════════════════════════════════════════════
    function angleModel(o={}) {
        const deg=o.degrees??60, type=o.type||'';
        const W=400, H=340, vx=200, vy=252, rayLen=162;
        const rad2=deg*Math.PI/180;
        const x2=vx+rayLen, x3=vx+rayLen*Math.cos(rad2), y3=vy-rayLen*Math.sin(rad2);
        const arcR=58;
        const ax2=vx+arcR, ax3=vx+arcR*Math.cos(rad2), ay3=vy-arcR*Math.sin(rad2);
        const la=deg>180?1:0;
        const p=[];
        p.push(`<path d="M${ax2},${vy} A${arcR},${arcR} 0 ${la},1 ${ax3},${ay3}" fill="${C.amberLight}" stroke="${C.amber}" stroke-width="2.5" fill-opacity=".85"/>`);
        p.push(arrow(vx,vy,x2+10,vy,C.navy,2.5));
        p.push(arrow(vx,vy,x3+(x3-vx)*.08,y3+(y3-vy)*.08,C.navy,2.5));
        p.push(circ(vx,vy,5,{fill:C.navy,stroke:C.white,sw:2}));
        const midA=rad2/2;
        p.push(t(vx+78*Math.cos(midA),vy-78*Math.sin(midA),`${deg}°`,{sz:22,bold:true,col:C.amber}));
        if (type==='supplementary') p.push(t(W/2,H-36,`Supplementary: ${deg}°+${180-deg}°=180°`,{sz:14,bold:true,col:C.teal}));
        else if (type==='complementary') p.push(t(W/2,H-36,`Complementary: ${deg}°+${90-deg}°=90°`,{sz:14,bold:true,col:C.teal}));
        p.push(t(W/2,H-10,`∠ = ${deg}°`,{sz:16,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 23 — SCIENTIFIC NOTATION
    //  Use: very large/small numbers, powers of 10, standard form
    // ════════════════════════════════════════════════════════════════════════
    function scientificNotation(o={}) {
        const coeff=o.coefficient??3.2, exp=o.exponent??4;
        const W=580, H=240;
        const val=coeff*Math.pow(10,exp);
        const places=['10⁶','10⁵','10⁴','10³','10²','10¹','10⁰','.','10⁻¹','10⁻²'];
        const labels=['M','HTh','TTh','Th','H','T','O','.','th','hth'];
        const cw=54, tx=20, ty=58;
        const p=[];
        const hl=9-exp;
        for (let i=0;i<places.length;i++) {
            const x=tx+i*cw, isHL=(i>=hl&&i<=hl+1), isDot=places[i]==='.';
            const bg=isDot?C.light:isHL?C.amberLight:C.light;
            const brd=isDot?C.gray:isHL?C.amber:C.gray;
            const bsw=isHL?2:1;
            p.push(r(x,ty,cw-3,42,{fill:bg,stroke:brd,sw:bsw,rx:3}));
            p.push(t(x+(cw-3)/2,ty+17,places[i],{sz:9,bold:isHL,col:isHL?C.amber:C.gray}));
            p.push(t(x+(cw-3)/2,ty+35,labels[i],{sz:9,col:C.dark}));
        }
        p.push(t(W/2,140,`${coeff} × 10`,{sz:28,bold:true,col:C.navy}));
        p.push(t(W/2+76,126,String(exp),{sz:18,bold:true,col:C.amber}));
        const formatted=val>=1000?val.toLocaleString():val.toString();
        p.push(t(W/2,H-14,`Standard Form: ${formatted}`,{sz:15,bold:true,col:C.teal}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 24 — PLACE VALUE CHART
    //  Use: decimals, rounding, comparing decimals, scientific notation intro
    // ════════════════════════════════════════════════════════════════════════
    function placeValueChart(o={}) {
        const num=o.number??3.45;
        const W=560, H=225;
        const places=[
            {label:'Thousands',pow:3},{label:'Hundreds',pow:2},{label:'Tens',pow:1},
            {label:'Ones',pow:0},{label:'.',pow:null},{label:'Tenths',pow:-1},{label:'Hundredths',pow:-2}
        ];
        const cw=560/places.length, p=[];
        p.push(t(W/2,26,`Place Value: ${num}`,{sz:15,bold:true,col:C.navy}));
        for (let i=0;i<places.length;i++) {
            const pl=places[i], x=i*cw, isDot=pl.pow===null;
            // Header
            p.push(r(x+2,40,cw-4,36,{fill:isDot?C.light:C.navy,stroke:isDot?C.gray:C.navy,sw:isDot?1:0,rx:3}));
            p.push(t(x+cw/2,63,isDot?'·':pl.label,{sz:isDot?22:10,bold:true,col:isDot?C.navy:C.white}));
            // Digit row
            let digit='';
            if (!isDot) {
                digit=String(Math.floor(Math.abs(num)/Math.pow(10,pl.pow))%10);
            }
            const hasDig=!isDot&&digit!=='0';
            p.push(r(x+2,76,cw-4,52,{fill:hasDig?C.amberLight:C.light,stroke:C.navy,sw:1}));
            p.push(t(x+cw/2,76+34,isDot?'.':digit,{sz:isDot?22:26,bold:true,col:isDot?C.navy:hasDig?C.amber:C.mid}));
        }
        p.push(t(W/2,H-8,`Value = ${num}`,{sz:15,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 25 — TEN FRAME
    //  Use: counting, early number sense, subitizing, addition to 10/20
    // ════════════════════════════════════════════════════════════════════════
    function tenFrame(o={}) {
        const count=Math.min(o.count??7, 20);
        const double=count>10;
        const W=480, H=double?260:180, R=24;
        const p=[];
        p.push(t(W/2,28,'Ten Frame',{sz:15,bold:true,col:C.navy}));
        const drawFrame=(startCount,maxCount,frameY)=>{
            const frameX=40;
            p.push(r(frameX,frameY,400,88,{fill:'none',stroke:C.navy,sw:3,rx:4}));
            for (let col=0;col<5;col++) {
                p.push(ln(frameX+col*80,frameY,frameX+col*80,frameY+88,{col:C.navy,sw:1.5}));
            }
            p.push(ln(frameX,frameY+44,frameX+400,frameY+44,{col:C.navy,sw:1.5}));
            let drawn=0;
            for (let row=0;row<2;row++) for (let col=0;col<5;col++) {
                const cx2=frameX+col*80+40, cy2=frameY+row*44+22;
                const idx=startCount+drawn;
                if (idx<count) {
                    p.push(circ(cx2,cy2,R,{fill:C.amber,stroke:C.dark,sw:2}));
                    p.push(t(cx2,cy2+5,String(idx+1),{sz:12,bold:true,col:C.white}));
                } else {
                    p.push(circ(cx2,cy2,R,{fill:C.light,stroke:C.gray,sw:1}));
                }
                drawn++;
            }
        };
        if (double) {
            drawFrame(0,10,40);
            drawFrame(10,20,145);
        } else {
            drawFrame(0,10,50);
        }
        p.push(t(W/2,H-8,`Count: ${count}`,{sz:14,bold:true,col:C.navy}));
        return wrap(W,H,C.white,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 26 — WORK SPACE (Fallback)
    //  Clean dotted grid for open-ended work
    // ════════════════════════════════════════════════════════════════════════
    function workSpace(o={}) {
        const label=o.label||'Show Your Work';
        const W=580, H=300, p=[];
        for (let x=30;x<=W-30;x+=24) for (let y=52;y<=H-26;y+=24)
            p.push(circ(x,y,1.5,{fill:'#CBD5E1',stroke:'none',sw:0}));
        p.push(t(W/2,30,label,{sz:16,bold:true,col:C.navy}));
        return wrap(W,H,C.light,p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 27 — HISTOGRAM
    //  Use: frequency distributions, grouped continuous data, data analysis
    // ════════════════════════════════════════════════════════════════════════
    function histogram(o={}) {
        const title = o.title || 'Frequency Distribution';
        const bars  = o.bars  || [
            { label: '0–10',  freq: 3 },
            { label: '10–20', freq: 7 },
            { label: '20–30', freq: 9 },
            { label: '30–40', freq: 5 },
            { label: '40–50', freq: 2 },
        ];
        const W=580, H=320;
        const ml=62, mr=20, mt=46, mb=58;
        const cW=W-ml-mr, cH=H-mt-mb;
        const maxF = Math.max(...bars.map(b=>b.freq));
        const yMax = Math.ceil((maxF+1)/2)*2;
        const bw   = cW / bars.length;
        const p    = [];
        // title
        p.push(t(W/2, 27, title, {sz:15, bold:true, col:C.navy}));
        // gridlines + y-labels
        for (let v=0; v<=yMax; v+=2) {
            const gy = mt + cH - (v/yMax)*cH;
            p.push(ln(ml, gy, ml+cW, gy, {col:'#E2E8F0', sw:1}));
            p.push(t(ml-8, gy+5, v, {sz:11, col:'#94A3B8', anc:'end'}));
        }
        // bars
        bars.forEach((bar, i) => {
            const bx = ml + i*bw;
            const bh = (bar.freq/yMax)*cH;
            const by = mt + cH - bh;
            p.push(r(bx+1, by, bw-2, bh, {fill:C.amber, stroke:C.white, sw:2, rx:3}));
            if (bh > 18) p.push(t(bx+bw/2, by-7, bar.freq, {sz:12, bold:true, col:C.navy}));
            p.push(t(bx+bw/2, mt+cH+18, bar.label, {sz:10, col:C.dark}));
        });
        // axes
        p.push(ln(ml, mt, ml, mt+cH, {col:C.navy, sw:2}));
        p.push(ln(ml, mt+cH, ml+cW, mt+cH, {col:C.navy, sw:2}));
        // axis labels
        p.push(`<text x="${ml-42}" y="${mt+cH/2}" fill="${C.navy}" font-size="12" font-family="Arial,Helvetica,sans-serif" text-anchor="middle" transform="rotate(-90,${ml-42},${mt+cH/2})">Frequency</text>`);
        p.push(t(ml+cW/2, H-6, 'Data Intervals', {sz:12, col:C.navy}));
        return wrap(W, H, C.white, p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 28 — TREE DIAGRAM
    //  Use: probability of compound events, 2-stage experiments, outcomes
    // ════════════════════════════════════════════════════════════════════════
    function treeDiagram(o={}) {
        const title  = o.title  || 'Tree Diagram';
        const first  = o.first  || ['Heads', 'Tails'];
        const second = o.second || ['Heads', 'Tails'];
        const fLabel = o.fLabel || 'Flip 1';
        const sLabel = o.sLabel || 'Flip 2';
        const W=580, H=370, p=[];
        // title
        p.push(t(W/2, 26, title, {sz:15, bold:true, col:C.navy}));
        // column header labels
        p.push(t(68, 48, 'Start', {sz:11, col:'#94A3B8'}));
        p.push(t(218, 48, fLabel, {sz:11, col:C.teal, bold:true}));
        p.push(t(382, 48, sLabel, {sz:11, col:C.amber, bold:true}));
        p.push(t(518, 48, 'Outcome', {sz:11, col:C.navy, bold:true}));
        // root node
        const rx0=68, ry0=H/2+10;
        p.push(circ(rx0, ry0, 10, {fill:C.navy, stroke:'none'}));
        // first level
        const n1 = first.length;
        first.forEach((fv, fi) => {
            const fy = 60 + (H-80) * (fi+0.5) / n1;
            p.push(ln(rx0+10, ry0, 200, fy, {col:C.teal, sw:2}));
            p.push(circ(213, fy, 18, {fill:'#E0F2FE', stroke:C.teal, sw:2}));
            p.push(t(213, fy+5, fv.length>5 ? fv.slice(0,4) : fv, {sz:11, bold:true, col:C.teal}));
            const mx1=(rx0+10+200)/2, my1=(ry0+fy)/2-8;
            p.push(t(mx1, my1, '½', {sz:10, col:'#94A3B8'}));
            // second level
            const n2 = second.length;
            second.forEach((sv, si) => {
                const sy = 60 + (H-80) * ((fi*n2+si)+0.5) / (n1*n2);
                p.push(ln(231, fy, 362, sy, {col:C.amber, sw:1.5}));
                p.push(circ(375, sy, 18, {fill:'#FFF7ED', stroke:C.amber, sw:2}));
                p.push(t(375, sy+5, sv.length>5 ? sv.slice(0,4) : sv, {sz:11, bold:true, col:C.amber}));
                const outTxt = `${fv.slice(0,1)},${sv.slice(0,1)}`;
                p.push(t(513, sy+5, outTxt, {sz:12, col:C.navy, bold:true}));
                p.push(t((231+362)/2, (fy+sy)/2-6, '½', {sz:10, col:'#94A3B8'}));
            });
        });
        return wrap(W, H, C.white, p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 29 — FUNCTION MACHINE
    //  Use: function rules, input-output tables, evaluating functions
    // ════════════════════════════════════════════════════════════════════════
    function functionMachine(o={}) {
        const title = o.title || 'Function Machine';
        const rule  = o.rule  || 'x × 3 + 1';
        const pairs = o.pairs || [{x:0,y:1},{x:1,y:4},{x:2,y:7},{x:3,y:10}];
        const W=540, H=290, p=[];
        // title
        p.push(t(W/2, 26, title, {sz:15, bold:true, col:C.navy}));
        // Machine body
        const mx=110, my=58, mw=165, mh=148;
        p.push(r(mx, my, mw, mh, {fill:'#EFF6FF', stroke:C.navy, sw:3, rx:12}));
        // machine header bar
        p.push(r(mx+8, my+8, mw-16, 34, {fill:C.navy, stroke:'none', rx:6}));
        p.push(t(mx+mw/2, my+30, 'FUNCTION', {sz:11, bold:true, col:C.white}));
        // rule display
        p.push(r(mx+10, my+52, mw-20, 38, {fill:'#DBEAFE', stroke:C.blue, sw:1.5, rx:6}));
        p.push(t(mx+mw/2, my+77, rule, {sz:13, bold:true, col:C.teal}));
        p.push(t(mx+mw/2, my+108, 'MACHINE', {sz:11, col:'#94A3B8'}));
        p.push(r(mx+14, my+118, mw-28, 22, {fill:'#F0FDF4', stroke:'#86EFAC', sw:1, rx:4}));
        p.push(t(mx+mw/2, my+133, 'f(x) = ' + rule, {sz:9, col:C.dark}));
        // input arrow + labels
        p.push(arrow(24, my+mh/2, mx-5, my+mh/2, C.teal, 3));
        p.push(t(26, my+mh/2-18, 'INPUT', {sz:11, bold:true, col:C.teal, anc:'start'}));
        p.push(t(38, my+mh/2+20, 'x', {sz:22, bold:true, col:C.teal, anc:'start'}));
        // output arrow + labels
        p.push(arrow(mx+mw+5, my+mh/2, mx+mw+72, my+mh/2, C.amber, 3));
        p.push(t(mx+mw+78, my+mh/2-18, 'OUTPUT', {sz:11, bold:true, col:C.amber, anc:'start'}));
        p.push(t(mx+mw+88, my+mh/2+20, 'y', {sz:22, bold:true, col:C.amber, anc:'start'}));
        // table
        const tx=360, ty=52, tw=168, rowH=34;
        p.push(r(tx, ty, tw, rowH, {fill:C.navy, stroke:'none', rx:6}));
        p.push(t(tx+tw*0.33, ty+23, 'x', {sz:13, bold:true, col:C.white}));
        p.push(t(tx+tw*0.72, ty+23, 'f(x)', {sz:13, bold:true, col:C.white}));
        p.push(ln(tx+tw*0.54, ty, tx+tw*0.54, ty+rowH+(pairs.length)*rowH, {col:'#94A3B8', sw:1.5}));
        pairs.forEach((pr, i) => {
            const ry2 = ty + rowH + i*rowH;
            p.push(r(tx, ry2, tw, rowH, {fill: i%2===0?'#F8FAFC':'#EFF6FF', stroke:'#CBD5E1', sw:1}));
            p.push(t(tx+tw*0.33, ry2+23, pr.x, {sz:14, col:C.teal}));
            p.push(t(tx+tw*0.72, ry2+23, pr.y, {sz:14, bold:true, col:C.amber}));
        });
        return wrap(W, H, C.white, p.join(''));
    }

    // ════════════════════════════════════════════════════════════════════════
    //  MODEL 30 — PROPORTIONAL RELATIONSHIP GRAPH
    //  Use: y = kx, constant of proportionality, proportional reasoning
    // ════════════════════════════════════════════════════════════════════════
    function proportionalGraph(o={}) {
        const title = o.title || 'Proportional Relationship';
        const k     = o.k     ?? 2;
        const xMax  = o.xMax  ?? 5;
        const unit  = o.unit  || '';
        const W=480, H=460, p=[];
        const ml=65, mr=30, mt=50, mb=62;
        const cW=W-ml-mr, cH=H-mt-mb;
        const px = x => ml + (x/xMax)*cW;
        const py = y => mt + cH - (y/(k*xMax))*cH;
        // title
        p.push(t(W/2, 28, title, {sz:14, bold:true, col:C.navy}));
        // gridlines
        for (let x=0; x<=xMax; x++) {
            const gx=px(x);
            p.push(ln(gx, mt, gx, mt+cH, {col:'#E2E8F0', sw:1}));
            p.push(t(gx, mt+cH+18, x, {sz:11, col:C.dark}));
        }
        for (let y=0; y<=k*xMax; y++) {
            const gy=py(y);
            p.push(ln(ml, gy, ml+cW, gy, {col:'#E2E8F0', sw:1}));
            p.push(t(ml-10, gy+5, y, {sz:11, col:C.dark, anc:'end'}));
        }
        // y=kx line
        p.push(`<line x1="${px(0)}" y1="${py(0)}" x2="${px(xMax)}" y2="${py(k*xMax)}" stroke="${C.teal}" stroke-width="3"/>`);
        // highlighted points
        for (let x=1; x<=Math.min(xMax,4); x++) {
            const y=k*x;
            p.push(circ(px(x), py(y), 7, {fill:C.amber, stroke:C.white, sw:2}));
            p.push(t(px(x)+13, py(y)-8, `(${x},${y})`, {sz:10, col:C.navy, anc:'start'}));
        }
        // origin dot
        p.push(circ(px(0), py(0), 5, {fill:C.navy, stroke:C.white, sw:2}));
        // axes
        p.push(arrow(ml-5, mt+cH+2, ml-5, mt-10, C.navy, 2));
        p.push(arrow(ml-5, mt+cH+2, ml+cW+12, mt+cH+2, C.navy, 2));
        // axis labels
        p.push(t(ml+cW/2, H-6, 'x', {sz:14, col:C.navy, bold:true}));
        p.push(`<text x="${ml-46}" y="${mt+cH/2}" fill="${C.navy}" font-size="14" font-weight="bold" font-family="Arial,Helvetica,sans-serif" text-anchor="middle" transform="rotate(-90,${ml-46},${mt+cH/2})">y</text>`);
        // equation box (top-right)
        p.push(r(ml+cW-96, mt+8, 94, 34, {fill:'#ECFDF5', stroke:C.teal, sw:2, rx:6}));
        p.push(t(ml+cW-49, mt+30, `y = ${k}x`, {sz:15, bold:true, col:C.teal}));
        // k callout (top-left)
        p.push(r(ml+6, mt+8, 130, 30, {fill:'#FFF7ED', stroke:C.amber, sw:1.5, rx:6}));
        p.push(t(ml+71, mt+28, `k = ${k}${unit ? '  ('+unit+')' : ''}`, {sz:12, bold:true, col:C.amber}));
        return wrap(W, H, C.white, p.join(''));
    }

    // ── Generator registry ───────────────────────────────────────────────────
    const GEN = {
        numberLine, doubleNumberLine, fractionBar, fractionCircle,
        areaModel, ratioTable, tapeDiagram, coordinatePlane,
        algebraTiles, percentBar, integerChips, balanceScale,
        slopeTriangle, pythagorean, circleModel, probabilityArea,
        boxPlot, dotPlot, scatterPlot, transformationGrid,
        volumeModel, angleModel, scientificNotation, placeValueChart,
        tenFrame, workSpace,
        histogram, treeDiagram, functionMachine, proportionalGraph
    };

    // ════════════════════════════════════════════════════════════════════════
    //  PUBLIC API
    // ════════════════════════════════════════════════════════════════════════
    return {
        modelTypes: Object.keys(GEN),

        /** Detect best model type from an analysis object */
        detectModelType: detect,

        /** Get raw SVG string (synchronous — useful for debug/preview) */
        getSVG(modelType, opts={}) {
            return (GEN[modelType] || GEN.workSpace)(opts);
        },

        /** Main entry point → PNG data URL ready for PptxGenJS addImage() */
        async getModel(analysis, opts={}) {
            const type = opts.forceModel || detect(analysis);
            const svg  = (GEN[type] || GEN.workSpace)(opts);
            const w = opts.width  || 620;
            const h = opts.height || 380;
            return svgToPng(svg, w, h);
        },

        /** Shortcut: get model for a plain topic string */
        async getModelForTopic(topicString, opts={}) {
            return this.getModel(
                { topics:[topicString.toLowerCase()], standards:[] },
                opts
            );
        },

        /** Render all models as data URLs — useful for gallery/debug page */
        async getAllPreviews() {
            const out = {};
            for (const name of Object.keys(GEN)) {
                try { out[name] = await svgToPng(GEN[name](), 620, 380); }
                catch(e) { out[name] = null; }
            }
            return out;
        }
    };

})();
