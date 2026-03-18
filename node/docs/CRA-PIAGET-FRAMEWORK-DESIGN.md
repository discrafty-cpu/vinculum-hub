# VINCULUM Hub: CRA + Piaget Pedagogical Framework Design

## Overview

This document specifies how to integrate the **CRA (Concrete-Representational-Abstract)** instructional framework and **Piaget's developmental stage theory** into the VINCULUM Math Solutions Hub. The goal: every tool becomes pedagogically self-aware — it knows where the student is developmentally, what representation level is appropriate, and how to scaffold transitions.

---

## 1. Theoretical Foundations

### CRA Framework (Bruner → CRA → CRA-I)

The CRA sequence originates from Bruner's enactive-iconic-symbolic modes:

| CRA Stage | Bruner Equivalent | Student Experience | Digital Mapping |
|-----------|-------------------|-------------------|-----------------|
| **Concrete** | Enactive | Manipulate physical/virtual objects | Draggable objects, counters, blocks, ten-frames |
| **Representational** | Iconic | Work with drawings, diagrams, visual models | Number lines, bar models, area diagrams, dot arrays |
| **Abstract** | Symbolic | Use symbols, equations, notation | Numeric expressions, algebraic notation, formulas |

**CRA-I (Integrated)**: In digital tools, all three levels can be presented simultaneously with linked representations. When a student drags a concrete block, the representational diagram and abstract equation update in real-time. This is the gold standard for VINCULUM tools.

**Concreteness Fading** (Fyfe, McNeil, Son, Goldstone 2014): Start with concrete, gradually fade to abstract. The concrete representation should become progressively more skeletal/schematic rather than disappearing abruptly.

**Stage Transition Criteria**: A student is ready to move from one CRA level to the next when they demonstrate:
- 80% accuracy across 3+ sessions at current level
- Can explain the concept in their own words (verbal indicator)
- Can predict outcomes before seeing the result (anticipation)
- Can transfer to a novel but structurally similar problem

### Piaget's Developmental Stages Mapped to Mathematics

| Stage | Typical Age | Grade Band | Mathematical Capabilities | Limitations |
|-------|-------------|------------|--------------------------|-------------|
| **Sensorimotor** | 0-2 | Pre-K | Object permanence, early quantity sense | No symbolic thought |
| **Preoperational** | 2-7 | K-1 | Counting, subitizing, basic comparison | No conservation, irreversibility, centration |
| **Concrete Operational** | 7-11 | 2-5 | Conservation, reversibility, classification, seriation | Needs concrete referents, struggles with hypothetical |
| **Formal Operational** | 11+ | 6-PreCalc | Abstract reasoning, hypothetical-deductive, proportional | Not all students reach this stage for all domains |

**Key Piaget Constructs for VINCULUM**:
- **Conservation**: Understanding that quantity doesn't change with rearrangement (critical for place value, fractions, measurement)
- **Reversibility**: Mental undoing of operations (critical for inverse operations, equation solving)
- **Classification + Seriation = Number Concept**: Sorting objects by properties + ordering by magnitude
- **Equilibration**: Learning happens when existing schemas are disrupted (disequilibrium) and reconstructed — tools should create productive struggle, not just confirm
- **Reflective Abstraction**: Students construct knowledge by reflecting on their own actions — tools should prompt metacognition

**Neo-Piagetian Updates**:
- **Case's Central Conceptual Structures**: Domain-specific schemas (numerical, spatial, narrative) develop semi-independently
- **Siegler's Overlapping Waves**: Students don't cleanly transition between strategies — they use multiple strategies simultaneously with shifting distributions
- **Fischer's Skill Theory**: Performance varies by domain and context — a student may be formal-operational in arithmetic but concrete-operational in geometry

---

## 2. Mapping to VINCULUM's Existing Architecture

### Current Structure → CRA Alignment

| VINCULUM Element | Current Purpose | CRA Mapping |
|-----------------|-----------------|-------------|
| **Modes: Explore** | Guided discovery | Concrete emphasis (watch, manipulate, discover) |
| **Modes: Practice** | Problem-solving with hints | Representational emphasis (apply visual models) |
| **Modes: Play** | Fluency/speed | Abstract emphasis (automaticity with symbols) |
| **Diff: Emergent** | Lowest complexity | Concrete-dominant scaffolding |
| **Diff: Proficient** | Grade-level | Representational-dominant with concrete fallback |
| **Diff: Advanced** | Extension | Abstract-dominant with representational reference |
| **Guide Panel: Instructions** | How-to-use per mode | CRA stage-specific pedagogy notes |
| **Guide Panel: Key Concept** | Core mathematical idea | CRA-level-appropriate concept statement |
| **Guide Panel: Standards** | CCSS/MN/TEKS alignment | Standards benchmark cross-reference |
| **Misconceptions** | Common errors list | CRA-stage-specific diagnostic with remediation |

### Mode × Difficulty → CRA Matrix

This is the core insight: the intersection of Mode and Difficulty creates a 3×3 matrix that maps cleanly to CRA progression:

```
                    EXPLORE          PRACTICE           PLAY
                    (Discovery)      (Application)      (Fluency)
                 ┌────────────────┬────────────────┬────────────────┐
  EMERGENT       │  CONCRETE      │  CONCRETE →    │  CONCRETE      │
  (Scaffolded)   │  Pure manipul. │  REPRESENTAT.  │  Speed w/      │
                 │  Watch & touch │  Guided visual │  visual support│
                 ├────────────────┼────────────────┼────────────────┤
  PROFICIENT     │  CONCRETE →    │  REPRESENTAT.  │  REPRESENT. →  │
  (Grade-level)  │  REPRESENTAT.  │  Visual models │  ABSTRACT      │
                 │  CRA-I linked  │  with feedback │  Fading visuals│
                 ├────────────────┼────────────────┼────────────────┤
  ADVANCED       │  REPRESENTAT.  │  REPRESENTAT.→ │  ABSTRACT      │
  (Extension)    │  → ABSTRACT    │  ABSTRACT      │  Pure symbolic │
                 │  CRA-I linked  │  Transfer tasks│  Full fluency  │
                 └────────────────┴────────────────┴────────────────┘
```

### Grade Band → Piaget → Time Allocation

| Grade Band | Piaget Stage | Concrete Time | Representational Time | Abstract Time |
|------------|-------------|---------------|----------------------|---------------|
| **K-2** | Preoperational → Concrete Operational | 70-80% | 15-25% | 5-10% |
| **3-5** | Concrete Operational | 40-50% | 30-40% | 15-25% |
| **6-8** | Concrete → Formal Operational | 20-30% | 35-45% | 30-40% |
| **9-PreCalc** | Formal Operational | 10-15% | 25-35% | 50-60% |

---

## 3. Data Model Extensions

### 3A. TOOLS Array Extension (VINCULUM-Hub.html)

Add `cra` and `piaget` fields to each tool entry:

```javascript
{
  id: 'counting-objects',
  name: 'Counting Objects Lab',
  grade: 'K',
  // ... existing fields ...

  // NEW: CRA Progression
  cra: {
    primary: 'concrete',           // 'concrete' | 'representational' | 'abstract'
    supports: ['concrete', 'representational'],  // all CRA levels this tool offers
    integrated: false,             // true if tool shows linked C-R-A simultaneously
    concreteFading: true,          // true if tool implements gradual fading
    visualModels: ['ten-frame', 'object-set', 'dot-array'],
    transitionTo: 'number-recognition'  // next tool in CRA progression
  },

  // NEW: Piaget Alignment
  piaget: {
    primaryStage: 'preoperational',
    constructs: ['counting', 'one-to-one-correspondence'],
    prerequisiteConservation: false,  // does this tool REQUIRE conservation?
    buildsReversibility: false,       // does this tool develop reversibility?
    metacognitionPrompts: true        // does tool prompt student reflection?
  }
}
```

### 3B. GUIDE_DATA Extension (vinculum-guide.js)

Extend the per-tool guide data with CRA-aware content:

```javascript
GUIDE_DATA = {
  'counting-objects': {
    instructions: {
      explore: '...existing...',
      practice: '...existing...',
      play: '...existing...'
    },
    standards: [ /* existing */ ],
    keyConcept: '...existing...',

    // NEW: CRA-specific instructional notes
    craGuidance: {
      concrete: {
        teacherNote: 'Students drag real-looking objects onto the counting mat. Emphasize touching each object exactly once (1-to-1 correspondence). Watch for students who skip objects or double-count.',
        lookFor: 'Can the student touch-count without skipping or repeating?',
        transition: 'When student consistently counts to 10 with objects, introduce the ten-frame view (representational).'
      },
      representational: {
        teacherNote: 'Ten-frame dots replace physical objects. Students should connect dot positions to quantity. Ask: "How many dots? How do you know without counting each one?"',
        lookFor: 'Can the student subitize small groups (1-5) within the ten-frame?',
        transition: 'When student recognizes quantities in the ten-frame without counting, introduce numeral labels (abstract).'
      },
      abstract: {
        teacherNote: 'Numerals appear alongside or instead of visual representations. Students match numeral to quantity.',
        lookFor: 'Can the student read a numeral and state the quantity without visual support?',
        transition: 'Ready for number-recognition tool (pure numeral work).'
      }
    },

    // NEW: Piaget developmental context
    developmentalContext: {
      stage: 'Preoperational',
      keyInsight: 'At this stage, students learn through direct physical manipulation. They cannot yet conserve number — rearranging 5 objects may make them think the quantity changed. The counting mat preserves spatial arrangement to avoid this confusion.',
      commonDevelopmentalErrors: [
        'Believes spreading objects apart makes "more"',
        'Cannot reverse counting (count back from a number)',
        'Focuses on one attribute at a time (centration)'
      ],
      scaffoldingStrategy: 'Keep objects in consistent spatial arrangements. Use slow, deliberate animations. Always pair verbal counting with visual pointing.'
    },

    // NEW: Standards cross-reference with CRA levels
    standardsByCRA: {
      concrete: [
        { code: 'K.CC.4a', text: 'When counting objects, say the number names in the standard order, pairing each object with one and only one number name' }
      ],
      representational: [
        { code: 'K.CC.4b', text: 'Understand that the last number name said tells the number of objects counted (cardinality)' }
      ],
      abstract: [
        { code: 'K.CC.5', text: 'Count to answer "how many?" questions about as many as 20 things' }
      ]
    }
  }
}
```

---

## 4. Guide Panel UI Design

### Current Layout (to be enhanced)

```
┌──────────────────────────────────────────────────────────────┐
│ GUIDE PANEL (260px left sidebar)                             │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ HOW TO USE                                               │ │
│ │ (Mode-specific instructions)                             │ │
│ │ 1. Step one...                                           │ │
│ │ 2. Step two...                                           │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ STANDARDS                                                │ │
│ │ [K.CC.4] [K.CC.5] [MN K.1.1.1]                         │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ KEY CONCEPT                                              │ │
│ │ A pattern is something that repeats...                   │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Enhanced Layout with CRA + Piaget

```
┌──────────────────────────────────────────────────────────────┐
│ GUIDE PANEL (280px left sidebar)                             │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ CRA LEVEL  [C]●──○──○[R]──○──○[A]                      │ │
│ │            Concrete ←→ Abstract                          │ │
│ │ Current: Concrete (Explore + Emergent)                   │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ HOW TO USE                                               │ │
│ │ (Mode + CRA-aware instructions)                          │ │
│ │ 1. Drag objects onto the counting mat...                 │ │
│ │ 2. Touch each object as you count aloud...              │ │
│ │                                                          │ │
│ │ 🔍 TEACHER NOTE                                         │ │
│ │ Watch for 1-to-1 correspondence. If student              │ │
│ │ skip-counts, slow the animation speed.                   │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ KEY CONCEPT                                              │ │
│ │ Counting means matching each object to exactly           │ │
│ │ one number. The last number you say is how many.         │ │
│ │                                                          │ │
│ │ DEVELOPMENTAL STAGE: Preoperational                      │ │
│ │ Students at this stage learn by doing. They need         │ │
│ │ to physically touch/move each object to count.           │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ STANDARDS ALIGNMENT                                      │ │
│ │                                                          │ │
│ │ At Concrete level:                                       │ │
│ │ [K.CC.4a] Say number names in order, pairing             │ │
│ │           each object with one number name               │ │
│ │                                                          │ │
│ │ Moving toward:                                           │ │
│ │ [K.CC.4b] Understand cardinality (last number            │ │
│ │           = total count)                                 │ │
│ │                                                          │ │
│ │ [MN K.1.1.1] [TEKS K.2A]                               │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ TRANSITION READINESS                                     │ │
│ │ ○○○○○○○●○○ (70% — not yet ready)                       │ │
│ │ Need: 80% accuracy across 3 sessions                    │ │
│ │ Next: Ten-frame view (Representational)                  │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Key UI Elements

**CRA Progress Bar**: A 5-dot visual indicator showing where the student currently sits on the C→R→A continuum. Updates dynamically based on Mode × Difficulty selection.

**Teacher Note**: Collapsible section with CRA-stage-specific teaching guidance. Only visible in teacher view (toggle).

**Developmental Stage Badge**: Small indicator showing the Piaget stage this tool targets. Helps teachers understand WHY the tool works the way it does.

**Standards by CRA Level**: Instead of showing all standards at once, group them by which CRA level they primarily assess. Shows "current" and "moving toward" standards.

**Transition Readiness**: Optional progress indicator for student tracking (if student data is available). Shows percentage toward CRA level transition criteria.

---

## 5. Implementation Priority

### Phase 1: Data Model (Immediate)
1. Add `cra` and `piaget` fields to all 218 TOOLS entries in VINCULUM-Hub.html
2. Extend GUIDE_DATA with `craGuidance` and `developmentalContext` for top 25 tools
3. Add CRA progress indicator to guide panel header

### Phase 2: Guide Panel Enhancement (Short-term)
4. Implement CRA-aware instructions (swap content based on Mode × Difficulty)
5. Add Teacher Note section with toggle
6. Implement standards-by-CRA-level display
7. Add developmental stage badge

### Phase 3: Tool Behavior (Medium-term)
8. Implement concreteness fading in K-2 tools (start concrete, gradually fade visuals)
9. Add CRA-I linked representations for 3-5 tools (C, R, A shown simultaneously)
10. Add Piaget-informed scaffolding (conservation checks, reversibility prompts)
11. Implement transition readiness tracking

### Phase 4: Hub Dashboard (Longer-term)
12. Add CRA filter to tool picker (show only concrete tools, representational tools, etc.)
13. Add developmental stage view (group tools by Piaget stage)
14. Add CRA progression pathway visualization
15. Teacher planning dashboard with CRA × Standards cross-reference matrix

---

## 6. Grade-Specific Design Guidelines

### K-2 Tools (Preoperational → Concrete Operational)
- **Default to Concrete**: Every interaction starts with manipulable objects
- **Slow animations**: Give students time to process each step
- **Consistent spatial arrangement**: Don't rearrange objects (conservation not yet secure)
- **Verbal pairing**: Read-to-Me should narrate counting/actions aloud
- **No abstract notation without concrete referent**: Never show "5" without showing 5 objects
- **CRA-I**: Show objects + ten-frame simultaneously, updating in sync
- **Explore mode**: 80% of instructional time at this level

### 3-5 Tools (Concrete Operational)
- **Start Representational, Concrete fallback**: Begin with visual models, provide concrete option if stuck
- **Conservation is secure**: Can rearrange representations safely
- **Reversibility emerging**: Show inverse operations (addition ↔ subtraction, multiplication ↔ division)
- **Classification tasks**: Sorting, categorizing, pattern recognition
- **CRA-I**: Show visual model + equation simultaneously
- **Practice mode**: Primary mode, with Explore for new concepts

### 6-8 Tools (Concrete → Formal Operational)
- **Representational primary**: Visual models (number lines, coordinate planes, area models) as primary
- **Abstract introduction**: Introduce symbolic manipulation with representational support
- **Proportional reasoning emerging**: Ratios, rates, percentages with visual models
- **Hypothetical thinking**: "What if" explorations, variable manipulation
- **CRA-I strongly recommended**: All three levels visible and linked
- **Practice + Play**: Split between application and fluency

### 9-PreCalc Tools (Formal Operational)
- **Abstract primary**: Symbolic manipulation as default
- **Representational for insight**: Graphs, diagrams for building intuition
- **Concrete for grounding**: Physical metaphors for abstract concepts (e.g., unit circle as rotating arm)
- **Metacognition prompts**: "Why does this work?" questions
- **Multiple representations**: Show algebraic, graphical, numerical, and verbal simultaneously
- **Play mode**: Fluency with abstract manipulation

---

## 7. Misconception Diagnosis Enhancement

Current misconceptions are listed per tool. Enhanced version links them to CRA stages and Piaget constructs:

```javascript
misconceptions: [
  {
    id: 'skip-counting-error',
    description: 'Student skips objects while counting',
    craLevel: 'concrete',
    piagetConstruct: 'one-to-one-correspondence',
    developmentalStage: 'preoperational',
    diagnosis: 'Student has not yet internalized 1-to-1 mapping between count words and objects',
    remediation: {
      concrete: 'Slow animation speed. Physically highlight each object as counted. Use "touch and count" mode.',
      representational: 'Return to concrete. Student is not ready for representational counting.',
      abstract: 'Return to concrete. Student needs foundational work.'
    },
    transitionIndicator: 'Student correctly counts 10+ objects 3 times in a row without skipping'
  }
]
```

---

## 8. Indigenous Math Context Integration

VINCULUM Hub already includes Indigenous math context. CRA + Piaget framework should honor this:

- **Concrete stage**: Use culturally relevant manipulatives (beadwork patterns, star quilts, wild rice counting)
- **Representational stage**: Visual models drawn from Indigenous mathematical traditions (geometric patterns, symmetry in nature)
- **Abstract stage**: Connect to universal mathematical principles while maintaining cultural context
- **Piaget caveat**: Developmental stages are culturally influenced. Some Indigenous mathematical traditions emphasize spatial reasoning and pattern recognition that may develop differently than Eurocentric number-focused sequences.

---

## 9. Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `VINCULUM-Hub.html` | Add `cra` and `piaget` fields to TOOLS array | Phase 1 |
| `vinculum-guide.js` | Add `craGuidance`, `developmentalContext`, `standardsByCRA` to GUIDE_DATA; add CRA progress bar UI; add teacher note section | Phase 1-2 |
| `tools/{grade}/{tool}.html` (223 files) | Add CRA-aware rendering logic, concreteness fading, Piaget scaffolding | Phase 3 |
| New: `vinculum-cra.js` | CRA progression helpers, transition tracking, fading algorithms | Phase 2-3 |
| New: `vinculum-piaget.js` | Developmental stage helpers, misconception diagnosis, scaffolding logic | Phase 3 |

---

*This framework transforms VINCULUM from a tool collection into a developmentally-informed, research-backed pedagogical platform. Every tool knows where the student is, where they're going, and how to get them there.*
