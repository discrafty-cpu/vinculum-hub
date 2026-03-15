/**
 * VinculumIndigenous — Core Indigenous Math Integration Layer
 * ============================================================
 * Shared module for VINCULUM Hub tools and the Lesson Digester.
 * Manages cultural context, story templates, language terms, and art/land connections.
 * Works with indigenous-context-panel.js for UI and indigenous-data.json for data.
 *
 * @module VinculumIndigenous
 * @global
 *
 * PRINCIPLES:
 * - Integration, not addition: cultural contexts woven into existing flows
 * - Indigenous knowledge IS mathematics
 * - Place-based specificity: name the nation, never generic "Native American"
 * - Present tense for living cultures
 * - All content tagged with nation, source, and review status
 * - No sacred or ceremonial content
 */

(function () {
  "use strict";

  // ── Configuration & Paths ──
  const DATA_PATH = "indigenous-data.json";
  const BASE_URL = new URL(import.meta.url || document.currentScript?.src || "").href
    .split("/")
    .slice(0, -1)
    .join("/");

  // ── State ──
  let DATA = null;
  let dataReady = null;

  // ── Module Export ──
  const VinculumIndigenous = {
    // Metadata
    version: "1.0.0",
    lastUpdated: "2026-03-15",

    // ────────────────────────────────────────────────────────────────
    // 1. INITIALIZATION & DATA LOADING
    // ────────────────────────────────────────────────────────────────

    /**
     * Initialize the module for a specific tool.
     * Loads data and prepares context for the tool's math domain.
     *
     * @param {string} toolName - Name of the tool (e.g., "counting-objects", "array-builder")
     * @returns {Promise<Object>} Initialization result with tool context
     *
     * @example
     * VinculumIndigenous.init('counting-objects').then(context => {
     *   console.log(context.mathDomain); // "counting"
     *   console.log(context.stories);    // array of story templates
     * });
     */
    init: async function (toolName) {
      await this._ensureDataLoaded();
      const toolContext = this._mapToolToMathDomain(toolName);
      return {
        toolName,
        mathDomain: toolContext.domain,
        nation: toolContext.nation,
        stories: this.getContextForTool(toolName),
        isReady: true,
      };
    },

    /**
     * Ensure data is loaded from indigenous-data.json
     * @private
     */
    _ensureDataLoaded: async function () {
      if (DATA) return DATA;
      if (!dataReady) {
        dataReady = fetch(`${BASE_URL}/${DATA_PATH}`)
          .then((r) => {
            if (!r.ok) throw new Error(`Failed to load ${DATA_PATH}: ${r.status}`);
            return r.json();
          })
          .then((d) => {
            DATA = d;
            return d;
          })
          .catch((e) => {
            console.error("VinculumIndigenous: Could not load indigenous-data.json", e);
            return null;
          });
      }
      return dataReady;
    },

    /**
     * Map tool names to math domains
     * @private
     */
    _mapToolToMathDomain: function (toolName) {
      const maps = {
        // Counting tools
        "counting-objects": { domain: "counting", nation: "Anishinaabe" },
        "counting-sequences": { domain: "counting", nation: "Anishinaabe" },
        "number-path": { domain: "counting", nation: "Dakota" },
        "number-recognition": { domain: "counting", nation: "Anishinaabe" },
        "number-compare": { domain: "counting", nation: "Anishinaabe" },

        // Operations tools
        "add-subtract": { domain: "operations", nation: "Anishinaabe" },
        "number-bonds": { domain: "operations", nation: "Dakota" },
        "teen-number-factory": { domain: "operations", nation: "Anishinaabe" },

        // Geometry tools
        "pattern-machine": { domain: "geometry", nation: "Anishinaabe" },
        "shape-sorter": { domain: "geometry", nation: "Multiple nations" },
        "shape-builder": { domain: "geometry", nation: "Multiple nations" },
        "3d-shape-builder": { domain: "geometry", nation: "Dakota" },
        "array-builder": { domain: "geometry", nation: "Multiple nations" },
        "multiplication-arrays": { domain: "geometry", nation: "Shoshone-Bannock" },

        // Measurement tools
        "measurement-compare": { domain: "measurement", nation: "Yup'ik" },
        "length-comparisons": { domain: "measurement", nation: "Dakota" },
        "measurement-lab": { domain: "measurement", nation: "Anishinaabe" },

        // Patterns tools
        "patterns-rules": { domain: "patterns", nation: "Dakota" },

        // Fractions tools
        "fraction-shapes": { domain: "fractions", nation: "Dakota" },
        "fraction-bars": { domain: "fractions", nation: "Anishinaabe" },
        "partition-fractions": { domain: "fractions", nation: "Dakota" },

        // Default fallback
        default: { domain: "operations", nation: "Anishinaabe" },
      };
      return maps[toolName] || maps.default;
    },

    // ────────────────────────────────────────────────────────────────
    // 2. PRIMARY API: CONTEXT FOR TOOLS
    // ────────────────────────────────────────────────────────────────

    /**
     * Get matching indigenous math concepts for a given tool.
     * Maps tool math domains to indigenous knowledge from the data repository.
     *
     * @param {string} toolName - Name of the tool
     * @param {Object} options - Optional filters
     * @param {string} options.gradeBand - Grade band (e.g., "K-2", "3-5")
     * @param {number} options.limit - Maximum results (default: 5)
     * @returns {Array<Object>} Array of context objects with nations and concepts
     *
     * @example
     * VinculumIndigenous.getContextForTool('array-builder', { gradeBand: '3-5', limit: 3 })
     * // Returns: [{ nation: 'Shoshone-Bannock', concept: 'Bead loom', ... }, ...]
     */
    getContextForTool: function (toolName, options = {}) {
      if (!DATA) {
        console.warn("VinculumIndigenous: Data not yet loaded. Call init() first.");
        return [];
      }

      const toolMap = this._mapToolToMathDomain(toolName);
      const domain = toolMap.domain;
      const gradeBand = options.gradeBand || null;
      const limit = options.limit || 5;

      // Map domains to crosswalk entries
      const domainMap = {
        counting: ["Number & Operations"],
        operations: ["Number & Operations"],
        geometry: ["Geometry"],
        patterns: ["Algebra & Functions"],
        measurement: ["Measurement & Data"],
        fractions: ["Number & Operations"],
      };

      const targetDomains = domainMap[domain] || ["Number & Operations"];

      let matches = (DATA.Math_Domain_Crosswalk || []).filter((entry) => {
        const domainMatch = targetDomains.some((d) =>
          (entry.Math_Domain || "").includes(d)
        );
        const gradeMatch =
          !gradeBand ||
          (entry.Grade_Range || "").includes(gradeBand) ||
          (entry.Grade_Range || "").includes(gradeBand.split("-")[0]);
        return domainMatch && gradeMatch;
      });

      return matches.slice(0, limit).map((entry) => ({
        nation: entry["Nation(s)"],
        concept: entry.Indigenous_Concept,
        mathDomain: entry.Math_Domain,
        gradeRange: entry.Grade_Range,
        standardConnection: entry.Standard_Curriculum_Connection,
        craPhase: entry.CRA_Phase_Best_Fit,
        tag: entry.Digester_Tag,
        reviewStatus: "PENDING", // Default status
      }));
    },

    // ────────────────────────────────────────────────────────────────
    // 3. STORY TEMPLATES (24+ covering all domains)
    // ────────────────────────────────────────────────────────────────

    /**
     * Get culturally relevant story contexts for a tool.
     * Returns story templates with indigenous characters, settings, and scenarios.
     *
     * @param {string} toolName - Name of the tool
     * @param {Object} params - Story parameters
     * @param {string} params.gradeBand - Grade band for story level
     * @param {number} params.limit - Max stories to return
     * @returns {Array<Object>} Array of story template objects
     *
     * @example
     * VinculumIndigenous.getStory('add-subtract', { gradeBand: 'K-2' })
     * // Returns: [{ character: 'Nibi', characterMeaning: 'water', nation: 'Anishinaabe', ... }, ...]
     */
    getStory: function (toolName, params = {}) {
      const domain = this._mapToolToMathDomain(toolName).domain;
      const gradeBand = params.gradeBand || "K-2";
      const limit = params.limit || 3;

      const stories = this._getStoryBank()[domain] || [];
      const filtered = stories.filter((s) => s.gradeBand === gradeBand);

      return filtered.slice(0, limit);
    },

    /**
     * Story bank with 24+ templates across all math domains
     * @private
     */
    _getStoryBank: function () {
      return {
        counting: [
          {
            id: "CNT_01",
            gradeBand: "K-2",
            character: "Nibi",
            characterMeaning: "water",
            nation: "Anishinaabe",
            setting: "maple sugar camp",
            template:
              "During iskigamizigan (maple sugar season), Nibi helped collect sap from {a} maple trees on the first day and {b} more trees on the second day. How many maple trees did they tap altogether?",
            culturalNote:
              "Anishinaabe people have practiced maple sugaring (iskigamizigan) for thousands of years. The maple syrup harvest is a springtime tradition.",
            mathDomain: "counting",
            followUp: "How many containers of sap would they need if each tree made 2 containers?",
            reviewStatus: "PENDING",
          },
          {
            id: "CNT_02",
            gradeBand: "K-2",
            character: "Ani",
            characterMeaning: "star",
            nation: "Dakota",
            setting: "wild rice camp",
            template:
              "Ani counted the baskets of manoomin (wild rice) ready for processing: {a} baskets from the northern lake and {b} baskets from the southern lake. How many baskets in total?",
            culturalNote:
              "Wild rice (manoomin) is sacred to the Anishinaabe and central to Dakota sustenance. The fall harvest is a significant cultural event.",
            mathDomain: "counting",
            followUp: "If they sell {c} baskets at the farmers market, how many remain?",
            reviewStatus: "PENDING",
          },
          {
            id: "CNT_03",
            gradeBand: "K-2",
            character: "Omakayas",
            characterMeaning: "cloud",
            nation: "Ojibwe",
            setting: "berry picking",
            template:
              "Omakayas and her family picked {a} cups of blueberries and {b} cups of chokecherries. How many cups of berries did they pick in all?",
            culturalNote:
              "Berry picking is a traditional Ojibwe summer activity. Different berries are harvested at different times for food and medicine.",
            mathDomain: "counting",
            followUp: "If they dry {c} cups, how many cups are left fresh?",
            reviewStatus: "PENDING",
          },
          {
            id: "CNT_04",
            gradeBand: "3-5",
            character: "Winona",
            characterMeaning: "firstborn daughter",
            nation: "Lakota",
            setting: "bison count",
            template:
              "Winona's family observed {a} bison herds in the valley. The first herd had {b} bison and the second herd had {c} bison. How many bison did they count in these two herds?",
            culturalNote:
              "Lakota people developed sophisticated counting and estimation systems for managing bison herds—an essential part of their economy.",
            mathDomain: "counting",
            followUp: "If {d} more bison joined, how many would there be?",
            reviewStatus: "PENDING",
          },
        ],

        geometry: [
          {
            id: "GEO_01",
            gradeBand: "K-2",
            character: "Odaah",
            characterMeaning: "fire",
            nation: "Anishinaabe",
            setting: "birch bark biting",
            template:
              "Odaah folded birch bark and cut out shapes using the traditional mazinibaganjigan (birch bark biting) technique. When unfolded, the shape had {a} lines of symmetry. How many matching halves did she create?",
            culturalNote:
              "Mazinibaganjigan, or birch bark biting, is a living Ojibwe/Anishinaabe art form where designs are cut through folded bark, creating symmetrical patterns.",
            mathDomain: "geometry",
            followUp: "If she makes {b} different designs, how many lines of total symmetry?",
            reviewStatus: "PENDING",
          },
          {
            id: "GEO_02",
            gradeBand: "3-5",
            character: "Star Woman",
            characterMeaning: "guides at night",
            nation: "Dakota",
            setting: "star quilt making",
            template:
              "Star Woman designed a traditional star quilt with {a} diamond-shaped patches arranged in a {b}-pointed star pattern. How many triangles make up each diamond?",
            culturalNote:
              "Star quilts are a living Dakota tradition. The eight-pointed star represents the morning star and is a significant symbol in Dakota culture.",
            mathDomain: "geometry",
            followUp: "If she sews {c} star quilts, how many diamonds in total?",
            reviewStatus: "PENDING",
          },
          {
            id: "GEO_03",
            gradeBand: "3-5",
            character: "Basket Weaver",
            characterMeaning: "keeper of knowledge",
            nation: "Multiple nations",
            setting: "basket weaving",
            template:
              "A basket weaver created a pattern using {a} rows and {b} columns of colored reeds. What shapes appear where the rows and columns intersect?",
            culturalNote:
              "Basket weaving traditions appear across many Indigenous nations. The geometric patterns encode mathematical relationships discovered through generations of practice.",
            mathDomain: "geometry",
            followUp: "If the basket is rectangular with area {c}, what is the perimeter?",
            reviewStatus: "PENDING",
          },
          {
            id: "GEO_04",
            gradeBand: "3-5",
            character: "Takoda",
            characterMeaning: "friend to everyone",
            nation: "Lakota",
            setting: "lodge design",
            template:
              "Takoda helped design a traditional lodge with a circular base and {a} wooden support poles arranged in a circle. The base diameter was {b} feet. What was the circumference?",
            culturalNote:
              "Traditional Lakota lodges use circular designs representing the sacred hoop and the cycle of seasons. The geometric precision ensures structural integrity.",
            mathDomain: "geometry",
            followUp: "If the area inside was {c} square feet, is the diameter correct?",
            reviewStatus: "PENDING",
          },
        ],

        patterns: [
          {
            id: "PAT_01",
            gradeBand: "K-2",
            character: "Nodin",
            characterMeaning: "wind",
            nation: "Anishinaabe",
            setting: "beadwork",
            template:
              "Nodin created a beadwork pattern with colors repeating: red, blue, red, blue, red, blue... If she continues this pattern for {a} beads, how many will be red?",
            culturalNote:
              "Anishinaabe beadwork follows patterns found in nature and encoded in traditional knowledge. Patterns are often shared among family members.",
            mathDomain: "patterns",
            followUp: "How many blue beads in a pattern of {b} total beads?",
            reviewStatus: "PENDING",
          },
          {
            id: "PAT_02",
            gradeBand: "K-2",
            character: "Chimalis",
            characterMeaning: "bluebird",
            nation: "Multiple nations",
            setting: "seasonal gathering",
            template:
              "Chimalis observed the seasonal pattern: berries ripen, deer migrate, frost appears, snow falls, melting happens, new growth returns... This pattern takes {a} months. When does it begin again?",
            culturalNote:
              "Indigenous peoples across North America developed sophisticated calendars tracking seasonal patterns for hunting, gathering, and ceremonies.",
            mathDomain: "patterns",
            followUp: "If this year the cycle starts {b} months early, when does it begin?",
            reviewStatus: "PENDING",
          },
          {
            id: "PAT_03",
            gradeBand: "3-5",
            character: "Tamanend",
            characterMeaning: "friendly man",
            nation: "Dakota",
            setting: "quilt pattern",
            template:
              "Tamanend's grandmother made a quilt with a repeating pattern of shapes: square, triangle, square, triangle... In a row of {a} shapes, how many will be squares?",
            culturalNote:
              "Quilting combines beadwork traditions with fabric crafting. Dakota women created quilts that told stories through pattern and color.",
            mathDomain: "patterns",
            followUp: "How would the pattern change if squares appeared {b} times per cycle?",
            reviewStatus: "PENDING",
          },
          {
            id: "PAT_04",
            gradeBand: "3-5",
            character: "Eagle Feather",
            characterMeaning: "strength",
            nation: "Lakota",
            setting: "hunting cycle",
            template:
              "Eagle Feather tracked hunting patterns: hunt for {a} days, process meat for {b} days, rest for {c} days, then repeat. Over {d} complete cycles, how many hunting days total?",
            culturalNote:
              "Lakota hunting traditions involved complex resource management and pattern recognition. The knowledge was passed through oral traditions and practical experience.",
            mathDomain: "patterns",
            followUp: "How many processing days in {e} cycles?",
            reviewStatus: "PENDING",
          },
        ],

        measurement: [
          {
            id: "MEA_01",
            gradeBand: "K-2",
            character: "Kahkewaquonabe",
            characterMeaning: "brown hawk",
            nation: "Anishinaabe",
            setting: "moccasin making",
            template:
              "Kahkewaquonabe measured his foot using hand spans. His foot measured {a} hand spans long. His mother's foot measured {b} hand spans. Whose foot is longer?",
            culturalNote:
              "Body-proportional measurement was essential to Anishinaabe and Dakota craftsmanship. Different body units were (and are) used for different purposes.",
            mathDomain: "measurement",
            followUp: "How many more hand spans is the longer foot?",
            reviewStatus: "PENDING",
          },
          {
            id: "MEA_02",
            gradeBand: "K-2",
            character: "Pipemaker",
            characterMeaning: "craftsperson",
            nation: "Multiple nations",
            setting: "pipe carving",
            template:
              "A pipe carver measured a piece of stone using arm spans. The stone was {a} arm spans long. When carved, the pipe was {b} arm spans long. How much stone was removed?",
            culturalNote:
              "Ceremonial and decorative pipes were carved from stone with precise measurement. The craftsmanship reflects deep mathematical understanding.",
            mathDomain: "measurement",
            followUp: "If the stone cost ${c} per arm span, what was the original cost?",
            reviewStatus: "PENDING",
          },
          {
            id: "MEA_03",
            gradeBand: "3-5",
            character: "River Runner",
            characterMeaning: "swift",
            nation: "Yup'ik",
            setting: "fish drying rack",
            template:
              "River Runner built a fish rack that was {a} feet long and {b} feet wide. Each fish dried on the rack took up {c} square feet of space. How many fish could fit on the rack?",
            culturalNote:
              "Yup'ik people developed sophisticated methods for preserving fish, including carefully measured drying racks that maximized storage and airflow.",
            mathDomain: "measurement",
            followUp: "What is the perimeter of the fish rack?",
            reviewStatus: "PENDING",
          },
          {
            id: "MEA_04",
            gradeBand: "3-5",
            character: "Miinak",
            characterMeaning: "strawberry",
            nation: "Anishinaabe",
            setting: "wild rice harvest",
            template:
              "Miinak's family harvested {a} pounds of wild rice on the first day and {b} pounds on the second day. They stored the rice in containers that held {c} pounds each. How many containers did they need?",
            culturalNote:
              "The Anishinaabe wild rice harvest requires careful measurement and management. Traditional processing methods maintain nutritional quality.",
            mathDomain: "measurement",
            followUp: "If they sold {d} containers, how many pounds of rice did they sell?",
            reviewStatus: "PENDING",
          },
        ],

        operations: [
          {
            id: "OPS_01",
            gradeBand: "K-2",
            character: "Migwan",
            characterMeaning: "feather",
            nation: "Anishinaabe",
            setting: "community feast",
            template:
              "Migwan helped prepare a feast. They cooked {a} portions of moose meat and {b} portions of fish. How many portions of meat total?",
            culturalNote:
              "Community feasts are central to Anishinaabe culture. The sharing of food connects people and honors relationships.",
            mathDomain: "operations",
            followUp: "If {c} portions were eaten, how many remained?",
            reviewStatus: "PENDING",
          },
          {
            id: "OPS_02",
            gradeBand: "K-2",
            character: "Trading Post Keeper",
            characterMeaning: "commerce",
            nation: "Multiple nations",
            setting: "trade exchange",
            template:
              "A trading post had {a} beaver pelts. They traded {b} pelts for wild rice. How many pelts did they have left?",
            culturalNote:
              "Inter-tribal trade was sophisticated and fundamental to Indigenous economies. Traders needed strong counting and exchange knowledge.",
            mathDomain: "operations",
            followUp: "If they get {c} new pelts, how many do they have now?",
            reviewStatus: "PENDING",
          },
          {
            id: "OPS_03",
            gradeBand: "3-5",
            character: "Wiyaka",
            characterMeaning: "feather",
            nation: "Lakota",
            setting: "buffalo hunt distribution",
            template:
              "Wiyaka's family hunted {a} buffalo. They divided the meat among {b} families equally. How much meat did each family receive?",
            culturalNote:
              "Buffalo hunts were organized events requiring careful planning and fair distribution. Mathematical division ensured equitable sharing.",
            mathDomain: "operations",
            followUp: "If there were {c} families, how would the division change?",
            reviewStatus: "PENDING",
          },
          {
            id: "OPS_04",
            gradeBand: "3-5",
            character: "Granary Keeper",
            characterMeaning: "provider",
            nation: "Anishinaabe",
            setting: "winter storage",
            template:
              "The granary stored {a} bags of corn. They gave away {b} bags to families in need. Then the harvest brought {c} new bags. How many bags now?",
            culturalNote:
              "Indigenous communities maintained sophisticated food storage systems to survive winters. The mathematics of inventory management was crucial.",
            mathDomain: "operations",
            followUp: "If each family received {d} bags, how many families were helped?",
            reviewStatus: "PENDING",
          },
        ],

        fractions: [
          {
            id: "FRA_01",
            gradeBand: "K-2",
            character: "Mahkwa",
            characterMeaning: "bear",
            nation: "Anishinaabe",
            setting: "frybread sharing",
            template:
              "Mahkwa made frybread for the gathering. If they cut a round frybread into {a} equal pieces and {b} families each took {c} pieces, how many pieces remained?",
            culturalNote:
              "Frybread is a contemporary Indigenous food tradition. Sharing food is fundamental to community and family bonds.",
            mathDomain: "fractions",
            followUp: "What fraction of the frybread did each family get?",
            reviewStatus: "PENDING",
          },
          {
            id: "FRA_02",
            gradeBand: "K-2",
            character: "Wabeska",
            characterMeaning: "white",
            nation: "Dakota",
            setting: "recipe scaling",
            template:
              "Wabeska's grandmother's recipe uses 1 cup of wild rice. If Wabeska wants to make 1/2 of the recipe, how much wild rice does she need?",
            culturalNote:
              "Traditional recipes were scaled for different gathering sizes. Understanding fractions was essential for cooking.",
            mathDomain: "fractions",
            followUp: "If she wants to double the recipe, how much rice would she need?",
            reviewStatus: "PENDING",
          },
          {
            id: "FRA_03",
            gradeBand: "3-5",
            character: "Land Divider",
            characterMeaning: "fair distributor",
            nation: "Multiple nations",
            setting: "territory division",
            template:
              "A territory was divided among {a} clans: 1/4 for hunting, 1/2 for gathering, and 1/4 for water access. What fraction is used for hunting and water together?",
            culturalNote:
              "Indigenous territories were carefully managed to provide for all needs. Division of lands reflected sophisticated understanding of resources.",
            mathDomain: "fractions",
            followUp: "If gathering land is 1/2 and is {{b}} acres, how many total acres?",
            reviewStatus: "PENDING",
          },
          {
            id: "FRA_04",
            gradeBand: "3-5",
            character: "Harvest Counter",
            characterMeaning: "abundance tracker",
            nation: "Anishinaabe",
            setting: "crop division",
            template:
              "The family's corn harvest was divided: 1/3 to store for winter, 1/3 to trade, and 1/3 to give to the community. If they harvested {{a}} bushels, how many went to winter storage?",
            culturalNote:
              "Anishinaabe farming traditions involved the Three Sisters (corn, beans, squash) and sophisticated crop management including planned allocation.",
            mathDomain: "fractions",
            followUp: "How many bushels were traded or given to community?",
            reviewStatus: "PENDING",
          },
        ],
      };
    },

    // ────────────────────────────────────────────────────────────────
    // 4. CULTURAL NOTES & EDUCATIONAL CONTEXT
    // ────────────────────────────────────────────────────────────────

    /**
     * Get a brief cultural context note for a concept.
     * Suitable for display in a tool's explore mode.
     *
     * @param {string} concept - Mathematical concept (e.g., "place value", "symmetry")
     * @returns {string} Brief educational cultural context
     *
     * @example
     * VinculumIndigenous.getCulturalNote('place-value')
     * // "Ojibwe number words organize by tens (base-10), showing..."
     */
    getCulturalNote: function (concept) {
      const notes = {
        "place-value":
          "Ojibwe number words are organized by tens, showing a base-10 system as sophisticated as English numerals. Words like 'midaaso' (10) are categorical, not just placeholders.",
        counting:
          "Many Indigenous languages have counting systems that include categorical classifiers—different words for counting different types of objects, showing mathematical sophistication.",
        symmetry:
          "Anishinaabe birch bark biting (mazinibaganjigan) creates symmetrical designs through folding and cutting. This living art tradition demonstrates mathematical precision.",
        fractions:
          "Indigenous food sharing and preparation traditions require understanding fractions—cutting bannock or frybread into equal shares, scaling recipes for different family sizes.",
        area:
          "Indigenous peoples measured land and resources with precision. The Yup'ik MCC 'Patterns and Parkas' module shows area calculation for traditional clothing design.",
        measurement:
          "Body-proportional measurement (hand spans, arm spans, cubits) was fundamental to Indigenous craftsmanship and trade. These units are still valid today.",
        patterns:
          "Beadwork, quilt-making, and weaving patterns reflect Indigenous mathematical knowledge passed through oral traditions and hands-on practice.",
        operations:
          "Indigenous trading systems and resource distribution required sophisticated arithmetic for fair exchange and community support.",
        geometry:
          "Traditional basket weaving, lodge construction, and star quilts embody geometric understanding—not abstract, but purposeful and beautiful.",
        arrays:
          "Bead looms are physical arrays. Shoshone-Bannock and other nations' beadwork structures rows and columns—the same structure as multiplication arrays.",
      };
      return notes[concept] || "Rich Indigenous mathematical traditions are embedded in cultural practices.";
    },

    // ────────────────────────────────────────────────────────────────
    // 5. ART & LAND CONNECTIONS
    // ────────────────────────────────────────────────────────────────

    /**
     * Get connections between indigenous art forms and math concepts.
     *
     * @param {string} mathDomain - Math domain (e.g., "geometry", "patterns")
     * @returns {Array<Object>} Array of art connection objects
     *
     * @example
     * VinculumIndigenous.getArtConnection('geometry')
     * // [{ artForm: 'Star quilts', nation: 'Dakota', concepts: ['symmetry', 'fractions'] }, ...]
     */
    getArtConnection: function (mathDomain) {
      const connections = {
        geometry: [
          {
            artForm: "Star Quilts",
            nation: "Dakota",
            concepts: ["symmetry", "fractions", "angles"],
            description: "Eight-pointed stars require precise angle measurement and symmetry.",
          },
          {
            artForm: "Basket Weaving",
            nation: "Multiple nations",
            concepts: ["geometry", "measurement", "patterns"],
            description: "Woven baskets use rows and columns creating geometric patterns.",
          },
          {
            artForm: "Birch Bark Biting",
            nation: "Ojibwe/Anishinaabe",
            concepts: ["symmetry", "shapes"],
            description: "Mazinibaganjigan creates perfect symmetry through folding and cutting.",
          },
        ],
        patterns: [
          {
            artForm: "Beadwork",
            nation: "Multiple nations",
            concepts: ["patterns", "symmetry", "counting"],
            description: "Bead loom work uses repeating patterns and color sequences.",
          },
          {
            artForm: "Quilt Making",
            nation: "Dakota, Anishinaabe",
            concepts: ["patterns", "tessellation"],
            description: "Quilts combine fabric scraps using repeating geometric patterns.",
          },
          {
            artForm: "Weaving",
            nation: "Multiple nations",
            concepts: ["patterns", "iteration"],
            description: "Warp and weft threads create complex repeating patterns.",
          },
        ],
        measurement: [
          {
            artForm: "Moccasin Making",
            nation: "Dakota, Ojibwe",
            concepts: ["measurement", "proportions"],
            description: "Crafters measure feet and leather using body-proportional units.",
          },
          {
            artForm: "Parka Sewing",
            nation: "Yup'ik",
            concepts: ["measurement", "area"],
            description: "Traditional parkas require precise measurement for fit and decoration.",
          },
        ],
      };
      return connections[mathDomain] || [];
    },

    /**
     * Get land-based math connections for a domain.
     *
     * @param {string} mathDomain - Math domain
     * @returns {Array<Object>} Array of land connection objects
     *
     * @example
     * VinculumIndigenous.getLandConnection('measurement')
     * // [{ activity: 'Gardening', nation: 'Multiple', concepts: ['measurement', 'area'] }, ...]
     */
    getLandConnection: function (mathDomain) {
      const connections = {
        measurement: [
          {
            activity: "Gardening",
            nation: "Multiple nations",
            concepts: ["measurement", "fractions", "area"],
            description: "Three Sisters gardens (corn, beans, squash) require precise spacing.",
          },
          {
            activity: "Land Management",
            nation: "Multiple nations",
            concepts: ["measurement", "scale"],
            description: "Managing territories and harvesting areas requires understanding distance.",
          },
        ],
        patterns: [
          {
            activity: "Seasonal Rounds",
            nation: "Multiple nations",
            concepts: ["patterns", "cycles", "time"],
            description: "Seasonal gathering follows repeating patterns tied to nature's cycles.",
          },
          {
            activity: "Astronomical Observation",
            nation: "Dakota, Lakota, Anishinaabe",
            concepts: ["patterns", "cycles", "prediction"],
            description: "Star positions and seasonal markers follow predictable patterns.",
          },
        ],
        operations: [
          {
            activity: "Navigation",
            nation: "Multiple nations",
            concepts: ["direction", "distance", "proportion"],
            description: "Traveling between communities required distance and direction calculation.",
          },
          {
            activity: "Wild Rice Harvest",
            nation: "Anishinaabe",
            concepts: ["measurement", "counting", "distribution"],
            description: "Harvesting, processing, and sharing wild rice involves sophisticated counting.",
          },
        ],
      };
      return connections[mathDomain] || [];
    },

    // ────────────────────────────────────────────────────────────────
    // 6. LANGUAGE TERMS & PRONUNCIATION
    // ────────────────────────────────────────────────────────────────

    /**
     * Get mathematical vocabulary in indigenous languages.
     * Always includes pronunciation guide and English translation.
     *
     * @param {string} concept - Math concept (e.g., "ten", "share", "pattern")
     * @param {string} nation - Nation (e.g., "Ojibwe", "Dakota", "Lakota")
     * @returns {Object} Term object with word, pronunciation, meaning, and notes
     *
     * @example
     * VinculumIndigenous.getLanguageTerms('ten', 'Ojibwe')
     * // { word: 'midaaso', pronunciation: 'mi-DAH-so', meaning: 'ten', language: 'Anishinaabemowin', ... }
     */
    getLanguageTerms: function (concept, nation) {
      if (!DATA) {
        console.warn("VinculumIndigenous: Data not loaded. Call init() first.");
        return {};
      }

      // Ojibwe numbers are already in the data
      const numbers = {
        one: "bezhig",
        two: "niizh",
        three: "niswi",
        four: "niiwin",
        five: "naanan",
        six: "ningodwaaswi",
        seven: "niizhwaaswi",
        eight: "ishwaaswi",
        nine: "zhaangswi",
        ten: "midaaso",
      };

      // Fetch from Ojibwe_Numbers if available
      if (DATA.Ojibwe_Numbers && concept.toLowerCase() === "numbers") {
        return {
          language: "Anishinaabemowin (Ojibwe)",
          numbers: DATA.Ojibwe_Numbers.map((n) => ({
            englishNumber: n.Number,
            ojibweWord: n.Ojibwe_Word,
            pronunciation: n.Pronunciation_Guide,
            classifierNotes: n.Classificatory_Notes,
          })),
        };
      }

      // Return specific number if requested
      if (numbers[concept.toLowerCase()]) {
        const term = DATA.Ojibwe_Numbers?.find(
          (n) => n.Ojibwe_Word === numbers[concept.toLowerCase()]
        );
        return {
          word: term?.Ojibwe_Word || numbers[concept.toLowerCase()],
          pronunciation: term?.Pronunciation_Guide || "",
          meaning: concept,
          language: "Anishinaabemowin (Ojibwe)",
          nation: "Anishinaabe",
          culturalNote:
            "Ojibwe numbers are organized by tens and include classificatory endings that vary based on what is being counted.",
        };
      }

      // Fallback for other concepts
      const conceptTerms = {
        share: {
          ojibwe: "waabandaw",
          dakota: "mazopiye",
          meaning: "to divide fairly",
        },
        pattern: {
          ojibwe: "dibaakaadim",
          dakota: "wowapi",
          meaning: "design or repeating form",
        },
        gather: {
          ojibwe: "nookigadoon",
          dakota: "mni-ota",
          meaning: "to collect food",
        },
      };

      const term = conceptTerms[concept.toLowerCase()] || {};
      return {
        concept,
        nation,
        terms: term,
        reviewStatus: "PENDING",
        note: "Language terms should be verified with tribal language experts before classroom use.",
      };
    },

    // ────────────────────────────────────────────────────────────────
    // 7. UI PANEL INTEGRATION
    // ────────────────────────────────────────────────────────────────

    /**
     * Trigger the indigenous-context-panel.js to display cultural context.
     * Works with the floating panel UI component.
     *
     * @param {string} toolName - Name of the tool
     * @param {Object} options - Display options
     * @param {string} options.position - Panel position ("bottom-right", "side", etc.)
     * @returns {Promise<boolean>} Success status
     *
     * @example
     * VinculumIndigenous.showContextPanel('counting-objects')
     */
    showContextPanel: async function (toolName, options = {}) {
      await this._ensureDataLoaded();

      // Check if IndigenousContext panel exists (from indigenous-context-panel.js)
      if (typeof window.IndigenousContext !== "undefined") {
        const context = this.getContextForTool(toolName);
        // Trigger panel display if it exists
        if (window.IndigenousContext.query) {
          const domain = this._mapToolToMathDomain(toolName).domain;
          window.IndigenousContext.query({
            grade: "4",
            domain: domain,
            topic: toolName,
          });
          return true;
        }
      }
      return false;
    },

    // ────────────────────────────────────────────────────────────────
    // 8. UTILITY FUNCTIONS
    // ────────────────────────────────────────────────────────────────

    /**
     * Get all available nations in the data repository
     * @returns {Array<string>} Array of nation names
     */
    getNations: function () {
      if (!DATA) return [];
      const nations = new Set();
      [
        ...(DATA.Story_Theme_Repository || []),
        ...(DATA.Math_Domain_Crosswalk || []),
      ].forEach((entry) => {
        const nationStr = entry["Nation(s)"] || "";
        nationStr.split(",").forEach((n) => {
          const trimmed = n.trim();
          if (trimmed) nations.add(trimmed);
        });
      });
      return Array.from(nations).sort();
    },

    /**
     * Get all math domains covered in the data
     * @returns {Array<string>} Array of math domain names
     */
    getMathDomains: function () {
      if (!DATA) return [];
      const domains = new Set();
      (DATA.Math_Domain_Crosswalk || []).forEach((entry) => {
        if (entry.Math_Domain) domains.add(entry.Math_Domain);
      });
      return Array.from(domains).sort();
    },

    /**
     * Search the data repository by keyword
     * @param {string} keyword - Search term
     * @param {Object} filters - Optional filters
     * @returns {Array<Object>} Matching results
     */
    search: function (keyword, filters = {}) {
      if (!DATA) {
        console.warn("VinculumIndigenous: Data not loaded. Call init() first.");
        return [];
      }

      const results = [];
      const kwLower = keyword.toLowerCase();

      // Search stories
      (DATA.Story_Theme_Repository || []).forEach((story) => {
        if (
          story.Theme?.toLowerCase().includes(kwLower) ||
          story.Math_Concepts?.toLowerCase().includes(kwLower) ||
          story["Nation(s)"]?.toLowerCase().includes(kwLower)
        ) {
          results.push({
            type: "story",
            id: story.ID,
            title: story.Theme,
            nation: story["Nation(s)"],
            mathDomain: story.Math_Domain,
          });
        }
      });

      // Search crosswalk
      (DATA.Math_Domain_Crosswalk || []).forEach((entry) => {
        if (
          entry.Indigenous_Concept?.toLowerCase().includes(kwLower) ||
          entry["Nation(s)"]?.toLowerCase().includes(kwLower)
        ) {
          results.push({
            type: "concept",
            concept: entry.Indigenous_Concept,
            nation: entry["Nation(s)"],
            mathDomain: entry.Math_Domain,
          });
        }
      });

      return results;
    },

    /**
     * Get raw data repository (for advanced use)
     * @returns {Object} The loaded indigenous-data.json
     */
    getData: function () {
      return DATA;
    },

    /**
     * Check if module is ready
     * @returns {Promise<boolean>}
     */
    isReady: async function () {
      await this._ensureDataLoaded();
      return DATA !== null;
    },
  };

  // ────────────────────────────────────────────────────────────────
  // GLOBAL EXPORT
  // ────────────────────────────────────────────────────────────────

  window.VinculumIndigenous = VinculumIndigenous;

  // Auto-initialize if requested
  if (
    document.currentScript &&
    document.currentScript.getAttribute("data-auto-init") === "true"
  ) {
    VinculumIndigenous._ensureDataLoaded();
  }
})();
