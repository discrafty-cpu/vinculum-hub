# Indigenous Mathematics Integration Engine

A data-driven toolkit for integrating Indigenous peoples' stories, cultural practices, and mathematical knowledge systems into K-12 mathematics curriculum. Built as a context layer for the VINCULUM Lesson Digester.

## What This Does

Given a math lesson's **grade level**, **domain**, and **topic**, the engine returns culturally relevant Indigenous contexts — stories, themes, sample problems, and Digester tags — drawn from a research-backed repository of 84 entries across 5 data sheets.

## Quick Start

```bash
pip install -r requirements.txt
python3 indigenous_context_engine.py --demo
```

## Usage

```bash
# Run the test suite (12 test cases)
python3 indigenous_context_engine.py --test

# Interactive demo with 4 sample queries
python3 indigenous_context_engine.py --demo

# Query a specific lesson
python3 indigenous_context_engine.py --grade 4 --domain geometry --topic "symmetry reflection"

# JSON output for programmatic use (Digester integration)
python3 indigenous_context_engine.py --grade 6 --domain ratios --topic "proportional reasoning" --json
```

## Project Files

| File | Purpose |
|------|---------|
| `indigenous_context_engine.py` | The matching engine — query by grade, domain, topic |
| `Indigenous_Math_Data_Repository.xlsx` | Structured data: 5 sheets, 84 entries, filterable |
| `Indigenous_Math_Integration_Research_Profile.md` | Full research profile (LLM-ingestible) |
| `Indigenous_Math_Integration_Research_Profile.docx` | Polished Word doc for human review and sharing |
| `requirements.txt` | Python dependencies |

## Data Sheets (in the .xlsx)

1. **Story_Theme_Repository** — 30 story/theme entries tagged by grade band (K-2, 3-5, 6-8, 9-12), math domain, CRA phase, nation, and Minnesota benchmark alignment
2. **Math_Domain_Crosswalk** — 20 entries mapping Indigenous math concepts to standard K-12 domains with Digester tags (e.g., `GEO_BEADWORK`, `STAT_DATA_SOVEREIGNTY`)
3. **State_Mandates** — 10 states with Indigenous education mandates, compared by scope, math-specificity, and implementation lessons
4. **Resource_Registry** — 11 curricula, tools, and frameworks with evidence levels and integration notes
5. **Ojibwe_Numbers** — Anishinaabe number words with classificatory endings reference

## Research Basis

This project synthesizes research from:

- **Math in a Cultural Context (MCC)** — Jerry Lipka, University of Alaska Fairbanks (RCT evidence)
- **Minnesota 2022 K-12 Math Standards** — Dakota and Anishinaabe benchmark integration
- **Montana Indian Education for All** — 20+ years of implementation data
- **Culturally Situated Design Tools** — Ron Eglash, RPI
- **Dakota/Lakota Math Connections** — Sitting Bull College
- **IK-HABME Framework** — Indigenous Knowledge Has Always Been Mathematics Education

## Important Notes

- All Indigenous content should be reviewed by Indigenous educators before classroom deployment
- Content specifies which nation(s) each practice comes from — avoid pan-Indigenous generalizations
- Use present tense for living cultures and practices
- Some knowledge is sacred or restricted and not appropriate for classroom use

## License

Research compilation for educational use. Respect the intellectual property and cultural knowledge of Indigenous communities.
