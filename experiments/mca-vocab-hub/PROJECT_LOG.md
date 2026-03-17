# MCA-III Math Vocabulary Hub — Project Log

## What This Is
An interactive, searchable vocabulary slide deck covering **365 math terms** across **7 grades** (3-8 and 11) aligned to Minnesota's MCA-III Math Test Specifications. Built for RPS math educators.

## Live Site
**https://discrafty-cpu.github.io/mca-vocab-hub/**

## Build History (3 sessions)

### Session 1: Data Extraction & PPTX Generation
- Extracted all vocabulary terms from MCA-III Test Specifications
- Created `vocab_data.py` with 346 terms across 4 strands per grade:
  - Number & Operation, Algebra, Geometry & Measurement, Data Analysis
- Built `generate_deck_v2.py` with python-pptx for PPTX slide generation
- Created `visual_specs.py` with per-term visual parameters
- Generated 7 PPTX decks (one per grade)
- Fixed geometry examples with step-by-step computed work
- Upgraded angle drawing engine for complementary/supplementary pairs

### Session 2: Theme Overhaul & HTML Pivot
- User feedback: scale drawings inaccurate, text not legible, visuals don't match math
- Added Lexend font, vibrant color palette, dynamic title sizing
- Built `generate_deck_v3.py` — complete PPTX rewrite with fun theme
- **Major pivot**: User identified fundamental PPTX limitations (no LaTeX, visual/data mismatch)
- Chose interactive HTML slide decks with KaTeX math rendering
- Built first HTML generator with SVG visuals per term
- QA found KaTeX not rendering (parseMath was a no-op)

### Session 3: Content Overhaul, Hub, & Launch (this session)

**KaTeX Fix:**
- Rewrote `parseMath` to pass through `$...$` delimiters from vocab data
- Equation visuals now use KaTeX display mode (`$$...$$`) instead of SVG text
- Students see rendered fractions, exponents, symbols — not raw LaTeX

**Slide Layout Fix:**
- Slides were showing all at once (side by side) — flexbox issue
- Fixed: slides now `position: absolute` with `opacity/visibility` toggling
- Only active slide visible, smooth transitions

**Complete Content Rewrite (365 terms):**
- Every term now has:
  - Clear definition + why it matters in real life
  - At least 2 classic textbook examples with proper LaTeX notation
  - All numbers kept in -25 to 25 range for easy visualization
  - Practice "Try It" prompt with friendly numbers
- Grade-appropriate language (3rd grade vs 11th grade)
- Wrote separate data files per grade, merged into master `vocab_data.py`

**Visual Generator Overhaul (9 types):**
- `equation`: KaTeX display mode in styled containers
- `number_line`: Per-slide scaling with highlighted key numbers
- `shape`: Labeled dimensions, gradient fills, 3D isometric for volume
- `grid`: Coordinate planes with plotted points from examples
- `fraction_bar`: Correctly shaded parts matching the fraction
- `chart`: Bar charts with extracted values
- `diagram`: Function machines, clock faces, tree diagrams, ratio tables
- `angle`: Proper arcs with degree labels, complementary/supplementary pairs
- `measurement`: Rulers, thermometers, balance scales, measuring cups

**Master Hub Page:**
- Searchable index of all 365 terms
- Filter by grade (3-11) and strand (4 strands)
- Live search as you type
- Click any term → jumps directly to that slide in the correct grade deck
- Deep linking via `?term=slope` URL parameters

**AI Image Prompts (future-ready):**
- Every slide has a subtle 📷 button (teacher-only)
- Click → modal shows tailored DALL-E/Gemini prompt for that term
- Copy to clipboard → paste into any AI image generator
- Grade-appropriate styles: cartoon (3-5), diagram (6-8), realistic (11)
- `image_prompts.py` and `generate_images.py` ready for API keys

**GitHub Pages Deployment:**
- Created project structure (index.html, grades/, images/, .nojekyll, 404.html)
- Pushed to GitHub via `gh` CLI
- Enabled GitHub Pages — live at discrafty-cpu.github.io/mca-vocab-hub/

## File Structure
```
mca-vocab-hub/
├── index.html                              # Hub page (search + filter + links)
├── 404.html                                # Redirect to hub
├── .nojekyll                               # Tell GitHub Pages to skip Jekyll
├── grades/
│   ├── MCA-III_Vocabulary_Grade_3.html     # 87 terms
│   ├── MCA-III_Vocabulary_Grade_4.html     # 65 terms
│   ├── MCA-III_Vocabulary_Grade_5.html     # 52 terms
│   ├── MCA-III_Vocabulary_Grade_6.html     # 34 terms
│   ├── MCA-III_Vocabulary_Grade_7.html     # 36 terms
│   ├── MCA-III_Vocabulary_Grade_8.html     # 39 terms
│   └── MCA-III_Vocabulary_Grade_11.html    # 52 terms
└── images/                                 # Ready for AI-generated images
```

## Tech Stack
- **HTML/CSS/JS**: Self-contained files, no build step
- **KaTeX 0.16.9**: CDN-based LaTeX math rendering
- **Lexend**: Google Font for readability
- **SVG**: All visuals generated as inline SVG
- **Python**: `generate_html.py` reads `vocab_data.py` and produces all HTML
- **GitHub Pages**: Free hosting, auto-deploys on push

## How to Update
```bash
cd ~/Web\ Apps/mca-vocab-hub
# Make changes to files...
git add -A && git commit -m "describe your change"
git push
```
Site updates within ~60 seconds.

## Strands & Colors
| Strand | Color | Hex |
|--------|-------|-----|
| Number & Operation | Teal | #2D7D9A |
| Algebra | Green | #4CA14D |
| Geometry & Measurement | Orange | #E86B40 |
| Data Analysis | Purple | #7E57C2 |

---
*Built with Claude (Anthropic) — March 2026*
