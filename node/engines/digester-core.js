/**
 * Lesson Digester - Core Utilities
 * Shared JavaScript utilities for the Drummond Design System web interface
 */

const Digester = {
  version: '1.0.0',

  /**
   * Slide Types with Icons and Labels
   */
  slideTypes: {
    INTRO_AGENDA: {
      icon: '📋',
      label: 'Intro & Agenda'
    },
    CHECKIN_FEELINGS: {
      icon: '💭',
      label: 'Check-in & Feelings'
    },
    BREATHING: {
      icon: '🫁',
      label: 'Breathing Exercise'
    },
    LEARNING_TARGET: {
      icon: '🎯',
      label: 'Learning Target'
    },
    TEAM_ROLES: {
      icon: '👥',
      label: 'Team Roles'
    },
    STORY_NARRATIVE: {
      icon: '📖',
      label: 'Story (Narrative)'
    },
    STORY_DRAMATIC: {
      icon: '🎭',
      label: 'Story (Dramatic)'
    },
    STORY_MISSION: {
      icon: '🚀',
      label: 'Story (Mission)'
    },
    GROUP_DISCUSSION: {
      icon: '💬',
      label: 'Group Discussion'
    },
    ACTIVITY_LAUNCH: {
      icon: '🎪',
      label: 'Activity Launch'
    },
    PROBLEM_SLIDE: {
      icon: '🧩',
      label: 'Problem'
    },
    VOCABULARY_CARDS: {
      icon: '📚',
      label: 'Vocabulary Cards'
    },
    STANDARDS_TAG: {
      icon: '🏷️',
      label: 'Standards Tag'
    },
    EXIT_TICKET: {
      icon: '🎫',
      label: 'Exit Ticket'
    },
    WARMUP_REVIEW: {
      icon: '🔥',
      label: 'Warm-up & Review'
    },
    WOULD_YOU_RATHER: {
      icon: '⚖️',
      label: 'Would You Rather'
    },
    NOTICE_WONDER: {
      icon: '✨',
      label: 'Notice & Wonder'
    },
    LEARNING_LOG: {
      icon: '📝',
      label: 'Learning Log'
    },
    TIMER: {
      icon: '⏱️',
      label: 'Timer'
    },
    DAY_DIVIDER: {
      icon: '━━━',
      label: 'Day Divider'
    },
    CLOSURE: {
      icon: '🏁',
      label: 'Closure'
    },
    HOMEWORK: {
      icon: '📖',
      label: 'Homework'
    },
    QUIZ_GENERATOR: {
      icon: '📊',
      label: 'Quiz Generator'
    },
    LEVELED_PROBLEMS: {
      icon: '📶',
      label: 'Leveled Problems'
    },
    LEVELED_ANSWER_KEY: {
      icon: '🔑',
      label: 'Leveled Answer Key'
    },
    MISCONCEPTIONS: {
      icon: '⚠️',
      label: 'Misconceptions'
    },
    DIFFERENTIATION: {
      icon: '🎚️',
      label: 'Differentiation'
    },
    RISA_SOCIAL: {
      icon: '💬',
      label: 'RISA Social Dialogue'
    },
    RISA_ACADEMIC: {
      icon: '🎓',
      label: 'RISA Academic Dialogue'
    }
  },

  /**
   * Team Roles with Color Codes
   */
  roles: {
    facilitator: {
      name: 'Facilitator',
      color: '#0D9488'
    },
    resourceMgr: {
      name: 'Resource Manager',
      color: '#D4870F'
    },
    taskMgr: {
      name: 'Task Manager',
      color: '#E8436D'
    },
    recorder: {
      name: 'Recorder',
      color: '#3B82F6'
    }
  },

  /**
   * Create a card element with content and options
   * @param {string} content - HTML content for the card
   * @param {object} options - Configuration options
   * @returns {HTMLElement} - The card element
   */
  createCard: function(content, options = {}) {
    const card = document.createElement('div');
    card.className = 'card';

    if (options.accent) {
      card.classList.add('card-accent');
    }

    if (options.className) {
      card.classList.add(options.className);
    }

    card.innerHTML = content;

    if (options.onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', options.onClick);
    }

    return card;
  },

  /**
   * Create a tag element with text and color
   * @param {string} text - Tag text
   * @param {string} color - Color scheme (teal, amber, blue, pink)
   * @returns {HTMLElement} - The tag element
   */
  createTag: function(text, color = 'teal') {
    const tag = document.createElement('span');
    tag.className = `tag tag-${color}`;
    tag.textContent = text;
    return tag;
  },

  /**
   * Format a benchmark with ID and description
   * @param {string} id - Benchmark identifier
   * @param {string} description - Benchmark description
   * @returns {string} - Formatted benchmark string
   */
  formatBenchmark: function(id, description) {
    return `${id}: ${description}`;
  }
};

// Export for module systems (CommonJS, ES6)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Digester;
}
