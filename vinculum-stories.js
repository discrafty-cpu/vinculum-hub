/**
 * VINCULUM Story Engine
 * =====================
 * A standalone story template system for K math tools on the VINCULUM platform.
 *
 * Provides:
 * - Story templates for 15 math tools (12+ stories each)
 * - Story selection and variable interpolation
 * - Web Speech API read-aloud with sentence-level callbacks
 * - HTML banner generation for story display
 *
 * Usage:
 *   <script src="../../vinculum-stories.js"></script>
 *   window.VinculumStories.getStory('number-bonds', { total: 5 })
 *   window.VinculumStories.readAloud('Maya has 5 apples...')
 */

(function() {
  'use strict';

  // ============================================================================
  // STORY DATABASE
  // ============================================================================
  // Each tool has 12+ story templates with placeholders:
  // {char} = character name
  // {a}, {b} = numbers
  // {total} = total number
  // {ones} = ones place in teen number
  // {obj} = objects being counted
  // {setting} = location
  // {action} = verb phrase

  const STORIES = {
    // -------------------------------------------------------------------------
    // number-bonds: Composing/decomposing numbers into parts
    // -------------------------------------------------------------------------
    'number-bonds': [
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya has {total} toy cars. Some are red and some are blue. Can you find all the ways to split {total} into two groups?',
        followUp: 'How many different ways can {total} be split?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás picked {total} apples. Some went in the red basket and some in the green basket. What are all the different ways he could split {total} apples?',
        followUp: 'Show me the apple pairs!'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara found {total} beautiful shells. She wants to make two different piles. How many ways can she split them?',
        followUp: 'What are all the shell pairs?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai collected {total} smooth pebbles at the playground. He wants to put some in his left pocket and some in his right pocket. What are all the ways?',
        followUp: 'How many pebbles in each pocket?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki\'s garden has {total} flowers blooming. Some are yellow and some are pink. Find all the ways to group them.',
        followUp: 'What\'s another way to split the flowers?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo needs to arrange {total} cookies on two different plates. How many different ways can he do this?',
        followUp: 'Show me the pairs!'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya has {total} books on her desk. She wants to put some on one shelf and some on another. What are all the possibilities?',
        followUp: 'List the book arrangements.'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah sorted {total} action figures into two groups — heroes and villains. How many different ways could he split them?',
        followUp: 'What\'s one way to split them?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked {total} cookies and needs to divide them between two boxes. Find all the ways to split them equally or not equally.',
        followUp: 'How many ways exist?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara has {total} crayons and wants to share them between herself and her friend. What are all the fair and unfair ways?',
        followUp: 'Show all the possibilities.'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus is counting {total} tropical fish. Some are in the left tank and some are in the right tank. How many ways can he arrange them?',
        followUp: 'What are the fish pairs?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia has {total} stickers to decorate two sheets of paper. Find all the different ways she could split the stickers.',
        followUp: 'List all the ways!'
      }
    ],

    // -------------------------------------------------------------------------
    // counting-objects: Counting collections 1-20
    // -------------------------------------------------------------------------
    'counting-objects': [
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara found {n} pretty seashells at the beach! Count them as she puts each one in her bucket.',
        followUp: 'How many shells did Amara find?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Chef Luna baked {n} delicious cupcakes for the birthday party. Count each one as it comes out of the oven!',
        followUp: 'How many cupcakes are there?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai is climbing the big ladder at the playground. There are {n} rungs. Can you count them from bottom to top?',
        followUp: 'How many rungs did you count?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki planted {n} bright sunflower seeds in a line. Count them and watch them grow into tall flowers!',
        followUp: 'How many sunflowers are there?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Leo is setting the table for dinner. He places {n} shiny forks around the table. Count them all!',
        followUp: 'How many forks?'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya\'s favorite library corner has {n} comfortable cushions to sit on. Count the cozy spots!',
        followUp: 'How many cushions?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah is arranging his toy cars in a row on his shelf. He counts {n} cars total. Count along with him!',
        followUp: 'How many cars in a row?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is having a picnic and {n} friendly birds landed on the grass nearby. Count the visitors!',
        followUp: 'How many birds visited?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus is looking at the goldfish tank. He counts {n} shimmering goldfish swimming around. Count them!',
        followUp: 'How many goldfish?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia\'s class decorated a bulletin board with {n} colorful paper stars. Count every star!',
        followUp: 'How many stars total?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás counted {n} hens in the chicken coop. Count them as they peck for grain!',
        followUp: 'How many hens?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya is building a tower with {n} wooden blocks. Count each block as it goes higher and higher!',
        followUp: 'How many blocks tall?'
      }
    ],

    // -------------------------------------------------------------------------
    // add-subtract: Addition and subtraction within 10/20
    // -------------------------------------------------------------------------
    'add-subtract': [
      // === ADDITION STORIES (op: 'add') ===
      {
        character: 'Kai',
        setting: 'playroom',
        op: 'add',
        template: 'Kai had {a} toy dinosaurs. His friend gave him {b} more! How many dinosaurs does Kai have now?',
        followUp: 'How many dinosaurs altogether?'
      },
      {
        character: 'Noah',
        setting: 'playground',
        op: 'add',
        template: 'Noah found {a} smooth pebbles. Then he found {b} more! How many pebbles does he have?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        op: 'add',
        template: 'Luna made {a} brownies and then baked {b} more. How many brownies did she make altogether?',
        followUp: 'How many total brownies?'
      },
      {
        character: 'Zara',
        setting: 'beach',
        op: 'add',
        template: 'Zara had {a} pretty shells in her bucket. The waves brought {b} more shells to shore! How many does she have now?',
        followUp: 'What\'s her new total?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        op: 'add',
        template: 'Marcus had {a} goldfish in his tank. His family got {b} more goldfish. How many goldfish are swimming now?',
        followUp: 'How many fish total?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        op: 'add',
        template: 'Sofia colored {a} pictures on Monday and {b} pictures on Tuesday. How many pictures did she color?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        op: 'add',
        template: 'Farmer Tomás had {a} apples. He picked {b} more from the tree. How many apples does he have?',
        followUp: 'How many apples total?'
      },
      {
        character: 'Amara',
        setting: 'garden',
        op: 'add',
        template: 'Amara planted {a} flower seeds. She planted {b} more yesterday. How many seeds did she plant?',
        followUp: 'How many seeds in total?'
      },
      {
        character: 'Yuki',
        setting: 'library',
        op: 'add',
        template: 'Yuki checked out {a} books from the library. Then she got {b} more books. How many books does she have?',
        followUp: 'How many books altogether?'
      },
      // === SUBTRACTION STORIES (op: 'subtract') ===
      {
        character: 'Priya',
        setting: 'kitchen',
        op: 'subtract',
        template: 'Priya had {a} strawberries on her plate. She ate {b} of them. How many strawberries are left?',
        followUp: 'How many strawberries remain?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        op: 'subtract',
        template: 'Chef Leo had {a} eggs. He used {b} eggs to make breakfast. How many eggs are left?',
        followUp: 'How many eggs remain?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        op: 'subtract',
        template: 'Maya had {a} colorful ribbons. Her sister took away {b} ribbons. How many ribbons does Maya have left?',
        followUp: 'How many ribbons now?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        op: 'subtract',
        template: 'Kai had {a} toy cars at the playground. He gave {b} to his friend. How many toy cars does Kai have left?',
        followUp: 'How many cars remain?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        op: 'subtract',
        template: 'Noah had {a} action figures on his shelf. He packed {b} into a box. How many are still on the shelf?',
        followUp: 'How many figures are left?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        op: 'subtract',
        template: 'Luna baked {a} cookies and shared {b} with her neighbors. How many cookies does Luna have left?',
        followUp: 'How many cookies remain?'
      },
      {
        character: 'Zara',
        setting: 'park',
        op: 'subtract',
        template: 'Zara had {a} stickers. She gave {b} stickers to her classmates. How many stickers does Zara have now?',
        followUp: 'How many stickers are left?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        op: 'subtract',
        template: 'Sofia had {a} pencils in her pencil box. She lent {b} pencils to her friends. How many pencils are still in the box?',
        followUp: 'How many pencils remain?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        op: 'subtract',
        template: 'Farmer Tomás had {a} oranges. He sold {b} at the market. How many oranges does he have left?',
        followUp: 'How many oranges remain?'
      }
    ],

    // -------------------------------------------------------------------------
    // teen-number-factory: Composing teen numbers (11-19) as 10+ones
    // -------------------------------------------------------------------------
    'teen-number-factory': [
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah packed {total} books into boxes. He filled one big box with exactly 10 books. How many books are left over?',
        followUp: 'What is {total} as 10 and extras?'
      },
      {
        character: 'Amara',
        setting: 'classroom',
        template: 'Amara organized {total} crayons. She put 10 crayons in one neat row. How many crayons are in the second row?',
        followUp: 'What is {total}?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai found {total} smooth pebbles at the beach. He made a group of 10 and a smaller group. What\'s the smaller group?',
        followUp: 'How is {total} made?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked {total} cookies. She put 10 cookies in a big box and the rest on a plate. How many are on the plate?',
        followUp: 'How many extras are there?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara brought {total} stickers to school. 10 stickers fill one page. How many go on the second page?',
        followUp: 'What is the extra number?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus counted {total} goldfish. When he put 10 in one tank, how many went in the other tank?',
        followUp: 'How many are the extras?'
      },
      {
        character: 'Sofia',
        setting: 'library',
        template: 'Sofia arranged {total} books on her shelf. The first shelf holds 10 books perfectly. How many are on the second shelf?',
        followUp: 'What\'s the breakdown?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás gathered {total} eggs. His basket holds exactly 10. How many eggs are in his hand?',
        followUp: 'How many extras?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki picked {total} flowers. She put 10 in a vase. How many more flowers are in her hand?',
        followUp: 'How many are left?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo lined up {total} eggs for baking. 10 eggs fit in one carton. How many are in the second carton?',
        followUp: 'What\'s the split?'
      },
      {
        character: 'Priya',
        setting: 'playroom',
        template: 'Priya organized {total} toy cars. She parked 10 on one shelf. How many cars go on the other shelf?',
        followUp: 'How many extras?'
      },
      {
        character: 'Maya',
        setting: 'beach',
        template: 'Maya collected {total} seashells. She put 10 in a bucket. How many shells are left?',
        followUp: 'What is {total}?'
      }
    ],

    // -------------------------------------------------------------------------
    // number-compare: Comparing numbers with >, <, =
    // -------------------------------------------------------------------------
    'number-compare': [
      {
        character: 'Zara',
        setting: 'garden',
        template: 'Zara picked {a} daisies and Marcus picked {b} sunflowers. Who picked more flowers?',
        followUp: 'Is {a} bigger than {b}?'
      },
      {
        character: 'Kai',
        setting: 'pet store',
        template: 'Kai saw {a} blue fish and {b} red fish in the tank. Which color has more fish?',
        followUp: 'Compare {a} and {b}.'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked {a} chocolate cookies and {b} vanilla cookies. Which kind has more?',
        followUp: 'Is {a} more, less, or equal to {b}?'
      },
      {
        character: 'Noah',
        setting: 'playground',
        template: 'Noah collected {a} acorns and Amara collected {b} acorns. Who found more acorns?',
        followUp: 'Who has more?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia has {a} stickers and Yuki has {b} stickers. Who has more stickers?',
        followUp: 'Compare the amounts.'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás harvested {a} carrots and {b} tomatoes. Which vegetable has more?',
        followUp: 'Is {a} greater than {b}?'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya read {a} pages on Monday and {b} pages on Tuesday. On which day did she read more?',
        followUp: 'Compare {a} and {b}.'
      },
      {
        character: 'Marcus',
        setting: 'playroom',
        template: 'Marcus has {a} toy cars and Leo has {b} toy cars. Who has fewer cars?',
        followUp: 'Is {a} less than {b}?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara found {a} seashells and Maya found {b} seashells. Who found fewer shells?',
        followUp: 'Compare the shells.'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki saw {a} red flowers and {b} yellow flowers blooming. Which color bloomed more?',
        followUp: 'Which is bigger?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo has {a} apples and {b} oranges. Does he have the same amount of each?',
        followUp: 'Are they equal?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya has {a} dolls and Kai has {b} dolls. Who has more dolls?',
        followUp: 'Is {a} equal to {b}?'
      }
    ],

    // -------------------------------------------------------------------------
    // number-recognition: Recognizing numerals 0-20
    // -------------------------------------------------------------------------
    'number-recognition': [
      {
        character: 'Maya',
        setting: 'cloud watching',
        template: 'Maya is watching fluffy clouds drift by. One cloud looks just like the number {n}! Can you see the number too?',
        followUp: 'What number is hiding in the clouds?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara is playing in the sand. The waves left a number in the sand. It looks like {n}! Can you read the sand number?',
        followUp: 'What number did the waves write?'
      },
      {
        character: 'Kai',
        setting: 'classroom',
        template: 'Kai is looking at the calendar on the classroom wall. He points to the number {n}. Can you find that number too?',
        followUp: 'What number is Kai pointing to?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna is decorating a birthday cake with number candles. She needs to place the candle that looks like {n}. Which candle is it?',
        followUp: 'What number candle goes here?'
      },
      {
        character: 'Zara',
        setting: 'playground',
        template: 'Zara is playing a number hop game. She needs to land on the spot marked {n}! Can you spot the number?',
        followUp: 'Find the number {n}!'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus sees a price tag with the number {n} on the fish food. What number is on the tag?',
        followUp: 'Can you read the price?'
      },
      {
        character: 'Sofia',
        setting: 'library',
        template: 'Sofia is looking for a book on shelf number {n}. Can you find the shelf label that shows {n}?',
        followUp: 'What number shelf?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás has a barn door numbered {n}. That\'s his favorite barn! Can you read the number on the door?',
        followUp: 'What number is on the barn?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki planted seeds in a row. The seed packet shows the number {n}. What number is it?',
        followUp: 'What does the packet say?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo is setting the oven to temperature {n}. Can you help him read the number on the dial?',
        followUp: 'What number is the oven at?'
      },
      {
        character: 'Priya',
        setting: 'playroom',
        template: 'Priya\'s favorite puzzle has numbers. She found the piece with {n} on it. What number is it?',
        followUp: 'What number did Priya find?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah is counting the numbers on his growth chart on the wall. He stops at {n}. What number is he pointing to?',
        followUp: 'What\'s the number?'
      }
    ],

    // -------------------------------------------------------------------------
    // teen-numbers: Understanding 11-19 as 10+ones (ten-frames)
    // -------------------------------------------------------------------------
    'teen-numbers': [
      {
        character: 'Amara',
        setting: 'classroom',
        template: 'Amara has a ten-frame on her desk. There are 10 crayons filling it completely. She has {ones} more crayons sitting next to it. How many crayons altogether?',
        followUp: 'What\'s 10 + {ones}?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai made a line of 10 pebbles. Then he added {ones} more pebbles to the line. How many pebbles in total?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna arranged 10 cupcakes in a neat row. She baked {ones} more special cupcakes. How many does she have?',
        followUp: 'What\'s 10 and {ones}?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara filled one page with 10 stickers. She has {ones} more stickers to place. How many stickers altogether?',
        followUp: 'What\'s the number?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus put 10 goldfish in one tank. He put {ones} goldfish in a small bowl. How many goldfish does he have?',
        followUp: 'How many total?'
      },
      {
        character: 'Sofia',
        setting: 'library',
        template: 'Sofia stacked 10 books neatly. Then she added {ones} more books on top. How many books is that?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás filled one basket with exactly 10 eggs. He has {ones} more eggs in his hand. How many eggs altogether?',
        followUp: 'How many eggs?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki planted 10 flowers in a straight row. She planted {ones} more flowers nearby. How many did she plant?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo arranged 10 cookies on a plate in a circle. He added {ones} more cookies to the plate. How many cookies now?',
        followUp: 'What\'s 10 + {ones}?'
      },
      {
        character: 'Priya',
        setting: 'playroom',
        template: 'Priya lined up 10 toy cars in a row. She added {ones} more cars. How many cars in total?',
        followUp: 'How many cars?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah has a ten-frame poster on his wall with 10 pictures. He draws {ones} more pictures. How many pictures altogether?',
        followUp: 'What\'s the total?'
      },
      {
        character: 'Maya',
        setting: 'beach',
        template: 'Maya found 10 seashells in a bucket. She found {ones} more shells in the sand. How many shells did she find?',
        followUp: 'How many altogether?'
      }
    ],

    // -------------------------------------------------------------------------
    // pattern-machine: AB, ABC, AAB patterns with repetition
    // -------------------------------------------------------------------------
    'pattern-machine': [
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Chef Luna is decorating cookies with a pattern! She places: star, heart, star, heart, star, heart. What comes next in the pattern?',
        followUp: 'What\'s the next item?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia is creating a pattern with colored beads: red, blue, red, blue, red, blue. What color bead comes next?',
        followUp: 'What color is next?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara is arranging shells in a pattern on the sand: big, small, big, small, big, small. What size shell comes next?',
        followUp: 'Big or small?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai is jumping in a pattern: hop, skip, hop, skip, hop, skip. What does he do next?',
        followUp: 'What\'s the next move?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki planted flowers in a pattern: yellow, pink, yellow, pink, yellow, pink. What color flower comes next?',
        followUp: 'What color is next?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus arranged the aquarium decorations: plant, rock, plant, rock, plant, rock. What goes next?',
        followUp: 'Plant or rock?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo pipes frosting flowers on a cake in a pattern: small flower, big flower, small flower, big flower. What size comes next?',
        followUp: 'Small or big?'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya arranged books on her shelf in a pattern: tall book, short book, tall book, short book. What goes next?',
        followUp: 'Tall or short?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah is building with blocks in a pattern: red, yellow, blue, red, yellow, blue. What color block comes next?',
        followUp: 'What\'s the next color?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is arranging leaves in a pattern: oak, maple, oak, maple, oak, maple. What type of leaf comes next?',
        followUp: 'Oak or maple?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás planted crops in rows in a pattern: corn, carrots, corn, carrots. What does he plant next?',
        followUp: 'Corn or carrots?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya is making a necklace with beads in this pattern: circle, square, circle, square, circle, square. What shape comes next?',
        followUp: 'Circle or square?'
      }
    ],

    // -------------------------------------------------------------------------
    // shape-sorter: Sorting shapes by attributes (color, size, number of sides)
    // -------------------------------------------------------------------------
    'shape-sorter': [
      {
        character: 'Kai',
        setting: 'toy store',
        template: 'The toy store mixed up all the blocks! Kai needs to sort them. All the triangles go on one shelf, and all the circles go on another. Can you help him sort?',
        followUp: 'Where does each shape go?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia is sorting the shape cutouts on the bulletin board. Red shapes go in one pile, and blue shapes go in another. Can you sort them for her?',
        followUp: 'How do you group them?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo cut cookies in different shapes: circles, squares, and stars. Can you sort them into three different piles?',
        followUp: 'How many shapes of each kind?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara found rocks of different sizes on the beach. She wants to make a pile of big rocks and a pile of small rocks. Can you sort them?',
        followUp: 'Big or small rocks?'
      },
      {
        character: 'Priya',
        setting: 'playroom',
        template: 'Priya is organizing her toys. Blocks with 4 sides go in the blue bin, and blocks with 3 sides go in the red bin. Can you sort them?',
        followUp: 'Which bin does each shape go in?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah is organizing his shape stickers. Stars go in one pile, hearts go in another, and circles go in a third. Can you sort them?',
        followUp: 'Where does each sticker go?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki found sticks and leaves. Long sticks go in one basket, and short sticks go in another. Can you sort them?',
        followUp: 'Long or short?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus is organizing the toy animals. Animals with four legs go on one shelf, and animals with two legs go on another shelf. Can you help sort?',
        followUp: 'How many legs?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked cookies of different shapes. Round cookies go on the top shelf, and square cookies go on the bottom shelf. Can you sort them?',
        followUp: 'What shape goes where?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is collecting things for an art project. She wants to sort: things with wheels and things without wheels. Can you sort them?',
        followUp: 'Wheels or no wheels?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás is sorting his tools. Long tools go in one rack, and short tools go in another. Can you help him sort?',
        followUp: 'Long or short tools?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya is sorting her toy shapes. Shapes with points go in the pointy pile, and shapes that are smooth go in the smooth pile. Can you sort them?',
        followUp: 'Pointy or smooth?'
      }
    ],

    // -------------------------------------------------------------------------
    // shape-builder: Composing shapes from smaller shapes
    // -------------------------------------------------------------------------
    'shape-builder': [
      {
        character: 'Leo',
        setting: 'art class',
        template: 'Leo is making a picture using shapes! He needs to build a house. He has triangles for the roof, a square for the walls, and a small rectangle for the door. Can you help him build it?',
        followUp: 'What shapes make a house?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia wants to create a robot from shapes. She needs a square for the body, a smaller square for the head, rectangles for arms, and circles for the eyes. Can you arrange them?',
        followUp: 'What shapes make a robot?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara is making pictures in the sand with a stick. She draws a triangle on top of a rectangle to make a beach house. Can you see the shapes?',
        followUp: 'What shapes did she draw?'
      },
      {
        character: 'Kai',
        setting: 'playroom',
        template: 'Kai is building a snowman from shapes. He needs three circles stacked on top of each other, and small circles for the eyes. Can you show him where the shapes go?',
        followUp: 'How many circles?'
      },
      {
        character: 'Yuki',
        setting: 'art room',
        template: 'Yuki is creating a flower using shapes. She has a circle for the center and triangles for the petals. Can you build the flower with her?',
        followUp: 'What shapes make a flower?'
      },
      {
        character: 'Priya',
        setting: 'classroom',
        template: 'Priya is making a picture of a tree. She uses a rectangle for the trunk and a big circle for the leaves. Can you place them?',
        followUp: 'What shapes are in the tree?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah wants to build a car from shapes. He needs rectangles for the body, circles for the wheels, and a small rectangle for the window. Can you arrange them?',
        followUp: 'What shapes make a car?'
      },
      {
        character: 'Marcus',
        setting: 'art class',
        template: 'Marcus is creating a fish from shapes. He uses a triangle for the body, a small triangle for the tail, and circles for the eye. Can you build it?',
        followUp: 'What shapes are in the fish?'
      },
      {
        character: 'Luna',
        setting: 'kitchen',
        template: 'Luna is making a pizza shape! She needs a big circle for the pizza and small triangles to show the slices. Can you help arrange them?',
        followUp: 'What shapes make a pizza?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is drawing a butterfly with shapes. She needs circles for the body, triangles for the wings, and small circles for the spots. Can you draw it?',
        followUp: 'What shapes make a butterfly?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás is showing a barn made of shapes. A big rectangle for the walls and a triangle for the roof. Can you see the shapes?',
        followUp: 'What shapes are in the barn?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya is building a castle from shapes. She uses rectangles for walls, a triangle for a tower roof, and small squares for windows. Can you build it?',
        followUp: 'What shapes make a castle?'
      }
    ],

    // -------------------------------------------------------------------------
    // 3d-shape-builder: Understanding 3D shapes (faces, edges, vertices)
    // -------------------------------------------------------------------------
    '3d-shape-builder': [
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia is building a castle with blocks. This block has 6 flat faces and 8 pointy corners. It\'s a cube! Can you feel the corners and sides?',
        followUp: 'What shape is it?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo has a box of canned soup. It has rectangular flat sides, straight edges, and corners where sides meet. Can you count the faces?',
        followUp: 'How many flat faces?'
      },
      {
        character: 'Noah',
        setting: 'playground',
        template: 'Noah brought a ball to the playground. It\'s round with no flat faces, no corners, and no edges. It\'s a sphere! Can you roll it?',
        followUp: 'What shape is the ball?'
      },
      {
        character: 'Amara',
        setting: 'birthday party',
        template: 'Amara\'s party hat is shaped like a cone! It has one flat circular face on the bottom and comes to a point at the top. Feel the pointy top!',
        followUp: 'What is the hat shape?'
      },
      {
        character: 'Kai',
        setting: 'art class',
        template: 'Kai is stacking ice cream cones! A cone has one round face on top and comes to a point at the bottom. Can you build a tower of cones?',
        followUp: 'What\'s an ice cream cone?'
      },
      {
        character: 'Yuki',
        setting: 'classroom',
        template: 'Yuki found a pencil that\'s shaped like a cylinder. It has two flat round faces on the ends and a curved side. Can you roll it gently?',
        followUp: 'What shape is the pencil?'
      },
      {
        character: 'Priya',
        setting: 'playroom',
        template: 'Priya has a pyramid-shaped toy. It has a square face on the bottom and triangular faces on the sides that meet at a point. Can you count the faces?',
        followUp: 'How many faces does a pyramid have?'
      },
      {
        character: 'Marcus',
        setting: 'toy store',
        template: 'Marcus is holding a rectangular prism block. It has 6 rectangular faces and lots of edges. Can you find all the corners?',
        followUp: 'How many corners?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked a spherical cake! It\'s perfectly round like a ball. It has no flat faces and no corners. Can you spin it gently?',
        followUp: 'What shape is the cake?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is playing with building blocks. A cube block has 6 faces, 12 edges, and 8 corners. Can you count them all?',
        followUp: 'How many edges on a cube?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás has a barrel-shaped container. It\'s a cylinder with two round faces and a curved side. Can you roll it?',
        followUp: 'What shape is it?'
      },
      {
        character: 'Maya',
        setting: 'bedroom',
        template: 'Maya has a triangular prism block. It has two triangular faces and three rectangular faces. Can you feel all the sides?',
        followUp: 'How many faces are there?'
      }
    ],

    // -------------------------------------------------------------------------
    // classify-count: Classifying objects and counting by attributes
    // -------------------------------------------------------------------------
    'classify-count': [
      {
        character: 'Yuki',
        setting: 'pet store',
        template: 'Yuki went to the pet store! There are dogs, cats, and birds all mixed together. Can you count how many of each kind of pet you see?',
        followUp: 'How many dogs, cats, and birds?'
      },
      {
        character: 'Amara',
        setting: 'fruit market',
        template: 'Amara is at the farmer\'s market. She sees apples, oranges, and bananas. Can you count the fruit and sort them by type?',
        followUp: 'How many of each fruit?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai is watching children play. Some are on the swings, some are on the slide, and some are playing tag. Can you count how many are in each group?',
        followUp: 'How many children in each spot?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia\'s class is sorting buttons for an art project. Some buttons have 2 holes, some have 4 holes. Can you count each type?',
        followUp: 'How many 2-hole and 4-hole buttons?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo is organizing vegetables. He has carrots, potatoes, and onions. Can you count and sort them by type?',
        followUp: 'How many of each vegetable?'
      },
      {
        character: 'Priya',
        setting: 'toy box',
        template: 'Priya is cleaning her toy box. She finds blocks, dolls, and cars all jumbled up. Can you sort and count them?',
        followUp: 'How many toys of each kind?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah is organizing his toy cars. Some are big cars, some are small cars. Can you sort them and count each size?',
        followUp: 'How many big and small cars?'
      },
      {
        character: 'Marcus',
        setting: 'craft room',
        template: 'Marcus is sorting colored markers. Some are red, some are blue, and some are yellow. Can you count each color?',
        followUp: 'How many markers of each color?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna made three kinds of cookies: chocolate, vanilla, and sugar cookies. Can you count how many of each kind are cooling on the rack?',
        followUp: 'How many of each kind?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara is watching the ducks and geese at the pond. Can you count the ducks in one group and the geese in another?',
        followUp: 'How many ducks and geese?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás is counting his animals. He has chickens, goats, and sheep in the barn. Can you count each group?',
        followUp: 'How many of each animal?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya is organizing her blocks into groups. Some are wooden, some are plastic. Can you sort and count them?',
        followUp: 'How many of each kind?'
      }
    ],

    // -------------------------------------------------------------------------
    // measurement-compare: Comparing lengths and weights (longer/shorter, heavier/lighter)
    // -------------------------------------------------------------------------
    'measurement-compare': [
      {
        character: 'Marcus',
        setting: 'zoo',
        template: 'Two snakes live at the zoo! Sunny is long and Ziggy is short. Which snake is longer? Can you use your finger to show how much longer?',
        followUp: 'Who is longer?'
      },
      {
        character: 'Priya',
        setting: 'kitchen',
        template: 'Priya has two pencils. One pencil is long and one is short. Which pencil is longer?',
        followUp: 'Which one is longer?'
      },
      {
        character: 'Leo',
        setting: 'art class',
        template: 'Chef Leo has two ribbons. The red ribbon is long and the blue ribbon is short. Which ribbon is shorter?',
        followUp: 'Which is shorter?'
      },
      {
        character: 'Amara',
        setting: 'playground',
        template: 'Amara is comparing two boards on the playground. One board is long and sturdy, and one is short. Which board is longer?',
        followUp: 'Long or short?'
      },
      {
        character: 'Kai',
        setting: 'park',
        template: 'Kai found two branches. One branch is very long and one is very short. Can you hold them and compare?',
        followUp: 'Which branch is longer?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki is looking at two garden hoses. One hose is long and stretches far. One hose is short. Which hose is longer?',
        followUp: 'Long or short?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia is comparing two pieces of string. The purple string is long and the yellow string is short. Which is longer?',
        followUp: 'Which string is longer?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah has two toy snakes. One is long like a rope and one is short like a caterpillar. Which is shorter?',
        followUp: 'Short or long?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna has two rolling pins. One rolling pin is long and one is short. Which rolling pin is shorter?',
        followUp: 'Which is shorter?'
      },
      {
        character: 'Zara',
        setting: 'beach',
        template: 'Zara found two seaweed pieces. One is long and stretches far. One is short and crumpled. Which is longer?',
        followUp: 'Which is longer?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás has two rows of plants. One row is long with many plants. One row is short with just a few. Which row is longer?',
        followUp: 'Which row is longer?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya has two scarves. One scarf is long and flows like a river. One scarf is short and fits in her hand. Which is longer?',
        followUp: 'Which scarf is longer?'
      }
    ],

    // -------------------------------------------------------------------------
    // position-words: Understanding spatial relationships
    // -------------------------------------------------------------------------
    'position-words': [
      {
        character: 'Amara',
        setting: 'bedroom',
        template: 'The cat is hiding! Is it above the table or below the chair? Look carefully and use position words to find where the cat is hiding!',
        followUp: 'Where is the cat?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai\'s ball rolled away! Is it beside the tree or between the two benches? Can you say where the ball went using position words?',
        followUp: 'Where is the ball?'
      },
      {
        character: 'Luna',
        setting: 'kitchen',
        template: 'Luna put the cookies somewhere special. Are they inside the cupboard or on top of the counter? Can you find them and use position words?',
        followUp: 'Where are the cookies?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia is playing hide and seek! Is she behind the door, under the desk, or beside the window? Look around and tell me her position!',
        followUp: 'Where is Sofia?'
      },
      {
        character: 'Yuki',
        setting: 'garden',
        template: 'Yuki hid a toy in the garden. Is it beneath the flower, next to the fence, or above the rock? Use position words to describe where!',
        followUp: 'Where is the toy?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus is looking for his toy fish. Did it go inside the tank, between the rocks, or below the plant? Tell me using position words!',
        followUp: 'Where is the fish?'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya\'s bookmark fell! Is it between the book pages, on top of the shelf, or underneath the table? Use position words to find it!',
        followUp: 'Where is the bookmark?'
      },
      {
        character: 'Noah',
        setting: 'bedroom',
        template: 'Noah hid his favorite toy car. Is it under the bed, beside the dresser, or above the shelf? Tell me where using position words!',
        followUp: 'Where is the car?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara\'s kite got stuck! Is it above the trees, behind the building, or between the branches? Use position words to describe!',
        followUp: 'Where is the kite?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás lost his hat. Is it on top of the fence, beside the barn door, or under the hay pile? Tell me using position words!',
        followUp: 'Where is the hat?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo is looking for his apron. Is it hanging above the stove, beside the sink, or inside the cupboard? Find it with position words!',
        followUp: 'Where is the apron?'
      },
      {
        character: 'Maya',
        setting: 'playroom',
        template: 'Maya hid a surprise! Is it behind the door, underneath the rug, or between the cushions? Tell me where using position words!',
        followUp: 'Where is the surprise?'
      }
    ],

    // -------------------------------------------------------------------------
    // story-problem-theater: Enhanced word problems (this tool has existing stories)
    // -------------------------------------------------------------------------
    'story-problem-theater': [
      {
        character: 'Maya',
        setting: 'garden',
        template: 'Maya planted {a} beautiful flowers in her garden in the morning. Then {b} more flowers bloomed in the sunshine in the afternoon! How many flowers does Maya have now?',
        followUp: 'How many flowers in total?'
      },
      {
        character: 'Kai',
        setting: 'playground',
        template: 'Kai had {a} toy dinosaurs that he loved. His best friend gave him {b} more dinosaurs as a present! How many dinosaurs does Kai have now?',
        followUp: 'How many toys does Kai have?'
      },
      {
        character: 'Luna',
        setting: 'bakery',
        template: 'Luna baked {a} yummy cookies on Monday. She baked {b} more cookies on Tuesday. How many cookies did Luna bake altogether?',
        followUp: 'How many cookies total?'
      },
      {
        character: 'Amara',
        setting: 'beach',
        template: 'Amara collected {a} pretty seashells. Then the waves brought {b} more shells to shore. How many shells does she have in total?',
        followUp: 'How many shells altogether?'
      },
      {
        character: 'Priya',
        setting: 'library',
        template: 'Priya read {a} books during the week. She read {b} more books over the weekend. How many books did Priya read?',
        followUp: 'How many books in total?'
      },
      {
        character: 'Tomás',
        setting: 'farm',
        template: 'Farmer Tomás harvested {a} tomatoes from his garden. He picked {b} more tomatoes the next day. How many tomatoes did he pick?',
        followUp: 'How many tomatoes altogether?'
      },
      {
        character: 'Yuki',
        setting: 'classroom',
        template: 'Yuki made {a} paper flowers for the classroom. Her friend made {b} paper flowers too. How many flowers did they make together?',
        followUp: 'How many flowers total?'
      },
      {
        character: 'Marcus',
        setting: 'pet store',
        template: 'Marcus saw {a} goldfish in one tank. There were {b} goldfish in another tank. How many goldfish did Marcus see?',
        followUp: 'How many fish altogether?'
      },
      {
        character: 'Sofia',
        setting: 'classroom',
        template: 'Sofia drew {a} beautiful pictures in art class. She drew {b} more pictures at home. How many pictures did she draw?',
        followUp: 'How many pictures in total?'
      },
      {
        character: 'Leo',
        setting: 'kitchen',
        template: 'Chef Leo had {a} fresh eggs. His neighbor gave him {b} more eggs. How many eggs does Leo have now?',
        followUp: 'How many eggs altogether?'
      },
      {
        character: 'Noah',
        setting: 'playground',
        template: 'Noah found {a} acorns under one tree. He found {b} more acorns under another tree. How many acorns did Noah find?',
        followUp: 'How many acorns total?'
      },
      {
        character: 'Zara',
        setting: 'park',
        template: 'Zara brought {a} stickers to school. Her teacher gave her {b} more stickers. How many stickers does Zara have now?',
        followUp: 'How many stickers altogether?'
      }
    ]
  };

  // ============================================================================
  // CHARACTER AND SETTING POOLS
  // ============================================================================
  const CHARACTERS = [
    'Maya', 'Kai', 'Tomás', 'Amara', 'Yuki', 'Leo', 'Priya', 'Noah', 'Luna', 'Zara', 'Marcus', 'Ava', 'Jamal', 'Sofia', 'Wei'
  ];

  const SETTINGS = [
    'garden', 'kitchen', 'playground', 'beach', 'farm', 'bakery', 'pet store', 'library', 'zoo', 'park', 'market', 'classroom'
  ];

  // ============================================================================
  // STORY FILLING ENGINE
  // ============================================================================

  /**
   * Fill story template with given parameters
   * @param {string} template - Template string with {placeholder} syntax
   * @param {object} params - Values for placeholders
   * @returns {string} Filled story text
   */
  function fillTemplate(template, params) {
    let text = template;
    for (const [key, value] of Object.entries(params)) {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      text = text.replace(regex, value);
    }
    return text;
  }

  /**
   * Get a random element from an array
   */
  function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Interpolate character/setting/objects into a story
   * @param {object} storyTemplate - Template object from STORIES
   * @param {object} params - Math parameters {total, a, b, n, ones}
   * @returns {object} {story: string, question: string}
   */
  function buildStory(storyTemplate, params) {
    const story = fillTemplate(storyTemplate.template, params);
    const question = fillTemplate(storyTemplate.followUp, params);
    return { story, question };
  }

  // ============================================================================
  // WEB SPEECH API - READ ALOUD SYSTEM
  // ============================================================================

  const speechState = {
    utterances: [],
    currentIndex: 0,
    isReading: false,
    rate: 0.85
  };

  /**
   * Split text into sentences for sentence-by-sentence reading
   * @param {string} text - Text to split
   * @returns {array} Array of sentences
   */
  function splitIntoSentences(text) {
    return text.match(/[^.!?]+[.!?]+/g) || [text];
  }

  /**
   * Read text aloud using Web Speech API
   * @param {string} text - Text to read
   * @param {object} options - {rate: 0.7-1.2, onSentenceStart: function, onComplete: function}
   */
  function readAloud(text, options = {}) {
    // Check if SpeechSynthesis is available
    if (!window.speechSynthesis) {
      console.warn('Web Speech API not available in this browser');
      if (options.onComplete) options.onComplete();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const rate = options.rate || speechState.rate;
    const onSentenceStart = options.onSentenceStart || (() => {});
    const onComplete = options.onComplete || (() => {});

    const sentences = splitIntoSentences(text);
    speechState.utterances = sentences;
    speechState.currentIndex = 0;
    speechState.isReading = true;

    function speakNextSentence(index) {
      if (index >= sentences.length) {
        speechState.isReading = false;
        onComplete();
        return;
      }

      const sentence = sentences[index].trim();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = rate;

      // Fire callback when this sentence starts
      utterance.onstart = () => onSentenceStart(index);

      // Speak next sentence when this one ends
      utterance.onend = () => {
        speakNextSentence(index + 1);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        speakNextSentence(index + 1);
      };

      window.speechSynthesis.speak(utterance);
    }

    speakNextSentence(0);
  }

  /**
   * Stop reading aloud
   */
  function stopReading() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speechState.isReading = false;
  }

  /**
   * Check if currently reading
   */
  function isReading() {
    return speechState.isReading;
  }

  /**
   * Set speech rate (0.7 to 1.2)
   */
  function setReadAloudRate(rate) {
    if (rate >= 0.7 && rate <= 1.2) {
      speechState.rate = rate;
    }
  }

  // ============================================================================
  // HTML BANNER GENERATOR
  // ============================================================================

  /**
   * Create an HTML banner to display a story with read-aloud button
   * @param {string} toolName - Tool identifier
   * @param {object} params - Math parameters
   * @returns {string} HTML string for banner
   */
  function createStoryBanner(toolName, params = {}) {
    const story = getStory(toolName, params);
    if (!story) return '';

    const storyHTML = story.story.replace(/\n/g, '<br>');
    const questionHTML = story.question.replace(/\n/g, '<br>');

    // Create a unique ID for this banner
    const bannerId = `story-banner-${Math.random().toString(36).substr(2, 9)}`;

    return `
<div class="vinculum-story-banner" id="${bannerId}" style="
  background: #faf8f3;
  border: 2px solid #d4c5b9;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #2c2416;
">
  <div style="display: flex; justify-content: space-between; align-items: start; gap: 12px;">
    <div style="flex: 1;">
      <p style="margin: 0 0 8px 0; font-weight: 500; font-size: 15px;">
        ${storyHTML}
      </p>
      <p style="margin: 8px 0 0 0; font-weight: 600; color: #6b5d52; font-size: 14px;">
        ${questionHTML}
      </p>
    </div>
    <div style="display: flex; gap: 8px; flex-shrink: 0;">
      <button class="vinculum-read-aloud-btn" data-banner-id="${bannerId}" style="
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
      " title="Read aloud" aria-label="Read aloud">
        🔊
      </button>
      <button class="vinculum-new-story-btn" data-tool-name="${toolName}" style="
        background: #d4c5b9;
        border: none;
        color: #2c2416;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      " title="Get a new story" aria-label="Get a new story">
        New Story
      </button>
    </div>
  </div>
</div>
`;
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  window.VinculumStories = {
    /**
     * Get a story for a tool with interpolated parameters
     * @param {string} toolName - Tool identifier (e.g., 'number-bonds')
     * @param {object} params - Math parameters (e.g., {total: 5})
     * @returns {object|null} {story: string, question: string} or null
     */
    getStory(toolName, params = {}) {
      if (!STORIES[toolName] || STORIES[toolName].length === 0) {
        return null;
      }

      let templates = STORIES[toolName];

      // Filter by operation type if specified (e.g., 'add' or 'subtract')
      // Stories without an op tag are treated as universal (match any operation)
      if (params.op) {
        const filtered = templates.filter(t => !t.op || t.op === params.op);
        if (filtered.length > 0) templates = filtered;
      }

      const template = randomElement(templates);
      return buildStory(template, params);
    },

    /**
     * Get a random story template for a tool (without interpolation)
     * @param {string} toolName - Tool identifier
     * @returns {object|null} Template object or null
     */
    getRandomStory(toolName) {
      if (!STORIES[toolName] || STORIES[toolName].length === 0) {
        return null;
      }
      return randomElement(STORIES[toolName]);
    },

    /**
     * Get all story templates for a tool
     * @param {string} toolName - Tool identifier
     * @returns {array} Array of template objects
     */
    getAllStories(toolName) {
      return STORIES[toolName] || [];
    },

    /**
     * Read text aloud using Web Speech API
     * @param {string} text - Text to read
     * @param {object} options - {rate: 0.7-1.2, onSentenceStart, onComplete}
     */
    readAloud(text, options = {}) {
      readAloud(text, options);
    },

    /**
     * Stop current read-aloud
     */
    stopReading() {
      stopReading();
    },

    /**
     * Check if currently reading
     * @returns {boolean}
     */
    isReading() {
      return isReading();
    },

    /**
     * Set read-aloud rate (0.7 to 1.2)
     * @param {number} rate
     */
    setReadAloudRate(rate) {
      setReadAloudRate(rate);
    },

    /**
     * Create HTML banner for displaying a story
     * @param {string} toolName
     * @param {object} params
     * @returns {string} HTML
     */
    createStoryBanner(toolName, params = {}) {
      return createStoryBanner(toolName, params);
    },

    /**
     * Get list of available tools
     * @returns {array} Tool names
     */
    getAvailableTools() {
      return Object.keys(STORIES);
    },

    /**
     * Get random character name
     * @returns {string}
     */
    getRandomCharacter() {
      return randomElement(CHARACTERS);
    },

    /**
     * Get random setting
     * @returns {string}
     */
    getRandomSetting() {
      return randomElement(SETTINGS);
    }
  };

  // ============================================================================
  // BANNER INTERACTIVITY (auto-attach to dynamically created banners)
  // ============================================================================

  // Listen for button clicks on the document
  document.addEventListener('click', function(event) {
    // Read aloud button
    if (event.target.classList.contains('vinculum-read-aloud-btn')) {
      const bannerId = event.target.dataset.bannerId;
      const banner = document.getElementById(bannerId);
      if (banner) {
        const text = banner.querySelector('p').textContent;
        window.VinculumStories.readAloud(text, {
          rate: 0.85,
          onComplete: () => {}
        });
      }
    }

    // New story button
    if (event.target.classList.contains('vinculum-new-story-btn')) {
      const toolName = event.target.dataset.toolName;
      const bannerId = event.target.parentElement.parentElement.parentElement.id;
      const banner = document.getElementById(bannerId);
      if (banner) {
        const newStory = window.VinculumStories.getStory(toolName);
        if (newStory) {
          banner.querySelector('p').innerHTML = newStory.story.replace(/\n/g, '<br>');
          banner.querySelectorAll('p')[1].innerHTML = newStory.question.replace(/\n/g, '<br>');
        }
      }
    }
  });

})();
