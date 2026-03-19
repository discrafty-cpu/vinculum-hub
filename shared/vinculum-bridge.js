/**
 * vinculum-bridge.js — Vinculum 3D Geometry Viewer Integration
 * Lesson Digester | Drummond Math Solutions
 *
 * Bridges to the Vinculum Logic Engine 3D for interactive geometry
 * visualization on volume, Pythagorean, transformation, and circle topics.
 *
 * Usage:
 *   VinculumBridge.open('cylinder', { radius: 3, height: 10 });
 *   VinculumBridge.openForTopic('pythagorean theorem');
 *   VinculumBridge.createButton('volume and measurement');  // returns DOM button
 *
 * IIFE pattern with zero external dependencies
 */

const VinculumBridge = (() => {

    const VINCULUM_URL = 'https://discrafty-cpu.github.io/vinculum-3d-graphing-solution/';

    // ── Topic → 3D shape configuration mapping ─────────────────────────────
    const TOPIC_SHAPES = {
        'pythagorean theorem': {
            shape: 'triangular-prism',
            label: '3D Right Triangle',
            description: 'Explore the Pythagorean relationship with interactive 3D geometry'
        },
        'volume and measurement': {
            shape: 'rectangular-prism',
            label: '3D Volume Explorer',
            description: 'Manipulate prisms, cylinders, and pyramids in 3D'
        },
        'circumference and area of circles': {
            shape: 'cylinder',
            label: '3D Circle & Cylinder',
            description: 'See circles extend into cylinders with real-time measurements'
        },
        'similarity and scaling': {
            shape: 'cube',
            label: '3D Scale Explorer',
            description: 'Visualize how scaling affects volume and surface area'
        },
        'geometric proofs and reasoning': {
            shape: 'tetrahedron',
            label: '3D Proof Visualizer',
            description: 'Examine polyhedra faces, edges, and vertices interactively'
        },
        'right triangle trigonometry': {
            shape: 'triangular-prism',
            label: '3D Trig Explorer',
            description: 'Visualize trigonometric ratios on a 3D right triangle'
        },
        'circles and transformations': {
            shape: 'cylinder',
            label: '3D Transformations',
            description: 'Apply rotations, reflections, and translations in 3D space'
        },
        'quadratic functions': {
            shape: 'rectangular-prism',
            label: '3D Function Visualizer',
            description: 'Explore parabolic shapes in three dimensions'
        }
    };

    // ── Geometry strand detection ──────────────────────────────────────────
    const GEOMETRY_KEYWORDS = [
        'pythagorean', 'volume', 'surface area', 'prism', 'cylinder', 'pyramid',
        'cube', 'sphere', 'cone', 'circumference', 'circle', 'radius', 'diameter',
        'transformation', 'rotation', 'reflection', 'translation', 'dilation',
        'similar', 'congruent', 'scale', 'trigonometry', 'geometric proof',
        'angle', 'polygon', 'polyhedron', 'tetrahedron', 'octahedron'
    ];

    function isGeometryTopic(topic) {
        const lower = (topic || '').toLowerCase();
        return GEOMETRY_KEYWORDS.some(kw => lower.includes(kw));
    }

    function getShapeConfig(topic) {
        const lower = (topic || '').toLowerCase();
        for (const [key, config] of Object.entries(TOPIC_SHAPES)) {
            if (lower.includes(key) || key.includes(lower)) return config;
        }
        // Partial keyword match
        if (lower.includes('volume') || lower.includes('prism')) return TOPIC_SHAPES['volume and measurement'];
        if (lower.includes('circle') || lower.includes('cylinder')) return TOPIC_SHAPES['circumference and area of circles'];
        if (lower.includes('pythag') || lower.includes('right triangle')) return TOPIC_SHAPES['pythagorean theorem'];
        if (lower.includes('transform') || lower.includes('rotat')) return TOPIC_SHAPES['circles and transformations'];
        if (lower.includes('scale') || lower.includes('similar')) return TOPIC_SHAPES['similarity and scaling'];
        return null;
    }

    // ── Modal viewer ───────────────────────────────────────────────────────
    function createModal() {
        if (document.getElementById('vinculum-modal')) return document.getElementById('vinculum-modal');

        const modal = document.createElement('div');
        modal.id = 'vinculum-modal';
        modal.innerHTML = `
            <div style="position:fixed;inset:0;background:rgba(30,39,97,0.6);backdrop-filter:blur(4px);z-index:9998;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;" id="vinculum-overlay">
                <div style="background:#fff;border-radius:16px;width:90vw;max-width:1100px;height:80vh;max-height:750px;box-shadow:0 25px 60px rgba(30,39,97,0.3);display:flex;flex-direction:column;overflow:hidden;transform:scale(0.95);transition:transform 0.3s ease;" id="vinculum-container">
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:linear-gradient(135deg,#1E2761,#2D3A8C);color:#fff;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="width:36px;height:36px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;">&#9651;</div>
                            <div>
                                <div style="font-weight:600;font-size:16px;font-family:'Inter',system-ui,sans-serif;" id="vinculum-title">Vinculum 3D</div>
                                <div style="font-size:12px;opacity:0.7;font-family:'Inter',system-ui,sans-serif;" id="vinculum-subtitle">Interactive Geometry Explorer</div>
                            </div>
                        </div>
                        <button onclick="VinculumBridge.close()" style="background:rgba(255,255,255,0.15);border:none;color:#fff;width:36px;height:36px;border-radius:10px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:background 0.2s;" onmouseenter="this.style.background='rgba(255,255,255,0.25)'" onmouseleave="this.style.background='rgba(255,255,255,0.15)'">&times;</button>
                    </div>
                    <div style="flex:1;position:relative;">
                        <iframe id="vinculum-iframe" src="" style="width:100%;height:100%;border:none;" allow="fullscreen"></iframe>
                        <div id="vinculum-loading" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#F8FAFC;">
                            <div style="text-align:center;">
                                <div style="width:48px;height:48px;border:3px solid #E2E8F0;border-top-color:#1E2761;border-radius:50%;animation:vinculum-spin 0.8s linear infinite;margin:0 auto 16px;"></div>
                                <div style="color:#475569;font-family:'Inter',system-ui,sans-serif;font-size:14px;">Loading 3D Engine...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                @keyframes vinculum-spin { to { transform: rotate(360deg); } }
            </style>
        `;
        document.body.appendChild(modal);

        // Close on overlay click
        document.getElementById('vinculum-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'vinculum-overlay') VinculumBridge.close();
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') VinculumBridge.close();
        });

        return modal;
    }

    // ── Public API ─────────────────────────────────────────────────────────
    return {
        /** Check if a topic has 3D visualization available */
        hasVisualization(topic) {
            return getShapeConfig(topic) !== null || isGeometryTopic(topic);
        },

        /** Open Vinculum viewer for a specific topic */
        openForTopic(topic) {
            const config = getShapeConfig(topic);
            const modal = createModal();
            const overlay = document.getElementById('vinculum-overlay');
            const container = document.getElementById('vinculum-container');
            const iframe = document.getElementById('vinculum-iframe');
            const loading = document.getElementById('vinculum-loading');
            const title = document.getElementById('vinculum-title');
            const subtitle = document.getElementById('vinculum-subtitle');

            if (config) {
                title.textContent = config.label;
                subtitle.textContent = config.description;
            } else {
                title.textContent = 'Vinculum 3D';
                subtitle.textContent = 'Interactive Geometry Explorer';
            }

            modal.style.display = 'block';
            loading.style.display = 'flex';
            iframe.src = VINCULUM_URL;

            iframe.onload = () => {
                loading.style.display = 'none';
            };

            // Animate in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                container.style.transform = 'scale(1)';
            });
        },

        /** Open in new tab (alternative to modal) */
        openInTab(topic) {
            window.open(VINCULUM_URL, '_blank', 'noopener');
        },

        /** Close the modal viewer */
        close() {
            const overlay = document.getElementById('vinculum-overlay');
            const container = document.getElementById('vinculum-container');
            const iframe = document.getElementById('vinculum-iframe');
            if (!overlay) return;

            overlay.style.opacity = '0';
            container.style.transform = 'scale(0.95)';

            setTimeout(() => {
                const modal = document.getElementById('vinculum-modal');
                if (modal) modal.style.display = 'none';
                if (iframe) iframe.src = '';
            }, 300);
        },

        /** Create a styled "3D Explore" button for a given topic */
        createButton(topic, options = {}) {
            if (!this.hasVisualization(topic)) return null;

            const config = getShapeConfig(topic) || { label: '3D Explore' };
            const btn = document.createElement('button');
            btn.className = 'vinculum-3d-btn';
            btn.innerHTML = `<span style="font-size:14px;">&#9651;</span> ${options.label || config.label}`;
            btn.title = config.description || 'Open interactive 3D geometry viewer';

            Object.assign(btn.style, {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #1E2761, #2D3A8C)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: "'Inter', system-ui, sans-serif",
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(30,39,97,0.2)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-1px)';
                btn.style.boxShadow = '0 4px 14px rgba(30,39,97,0.3)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 2px 8px rgba(30,39,97,0.2)';
            });

            const useModal = options.mode !== 'tab';
            btn.addEventListener('click', () => {
                if (useModal) this.openForTopic(topic);
                else this.openInTab(topic);
            });

            return btn;
        },

        /** Get list of all topics with 3D visualizations */
        getAvailableTopics() {
            return Object.keys(TOPIC_SHAPES);
        },

        /** Check if a topic is geometry-related */
        isGeometry: isGeometryTopic
    };

})();
