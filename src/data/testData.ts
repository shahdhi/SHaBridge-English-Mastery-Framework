import { TestSection } from '../types/test';

export const testSections: TestSection[] = [
  {
    id: 'grammar-vocabulary',
    title: 'Core Grammar & Vocabulary',
    timeLimit: 20,
    instructions: 'Choose the best answer (A, B, C, or D) for each question.',
    questions: [
      {
        id: 1,
        question: 'If I _________ more time, I would learn to play the guitar.',
        options: ['have', 'had', 'would have', 'having'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 2,
        question: 'By the time we arrived, the meeting _________.',
        options: ['had already started', 'already starts', 'has already started', 'is already starting'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 3,
        question: "She's the colleague _________ project won the company award.",
        options: ['who', 'which', 'whose', 'whom'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 4,
        question: 'We look forward to _________ from you soon.',
        options: ['hear', 'hearing', 'heard', 'be hearing'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 5,
        question: 'He _________ in London for five years before he moved to Paris.',
        options: ['lived', 'has lived', 'had lived', 'was living'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 6,
        question: "Could you please turn _________ the music? It's a bit loud.",
        options: ['on', 'off', 'down', 'up'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 7,
        question: 'Neither the manager nor the employees _________ happy with the new policy.',
        options: ['is', 'are', 'be', 'been'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 8,
        question: 'This report _________ by the finance team yesterday.',
        options: ['was written', 'written', 'is written', 'wrote'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 9,
        question: "I'll send you the data _________ I get back to my desk.",
        options: ['while', 'until', 'as soon as', 'during'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 10,
        question: "It's important _________ your goals clearly.",
        options: ['to define', 'defining', 'define', 'defined'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 11,
        question: 'The manager **commended** the team on their hard work.',
        options: ['criticized', 'praised', 'joined', 'dismissed'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 12,
        question: 'The **objective** of the meeting is to brainstorm new ideas.',
        options: ['location', 'purpose', 'length', 'problem'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 13,
        question: "Her response was rather **vague** and didn't answer the question directly.",
        options: ['clear', 'quick', 'unclear', 'angry'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 14,
        question: 'We need to **postpone** the event until next week.',
        options: ['cancel', 'attend', 'delay', 'plan'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 15,
        question: 'The software has a built-in feature to **streamline** the process.',
        options: ['complicate', 'describe', 'make more efficient', 'slow down'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 16,
        question: "The project's **feasibility** is still being studied.",
        options: ['cost', 'possibility', 'timeline', 'manager'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 17,
        question: 'Please **review** the document before the meeting.',
        options: ['forget', 'examine', 'lose', 'write'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 18,
        question: 'They had a **brief** conversation in the hallway.',
        options: ['long', 'short', 'loud', 'angry'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 19,
        question: 'The company is looking to **expand** into new markets.',
        options: ['reduce', 'leave', 'grow', 'invest'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      },
      {
        id: 20,
        question: 'Her argument was very **persuasive**.',
        options: ['confusing', 'convincing', 'weak', 'long'],
        type: 'multiple-choice',
        section: 'grammar-vocabulary'
      }
    ]
  },
  {
    id: 'reading-writing',
    title: 'Core Reading & Writing',
    timeLimit: 35,
    instructions: 'Read the text carefully and answer all questions. Write your answers in the spaces provided.',
    questions: [
      // Story continuation questions (1-15)
      {
        id: 21,
        question: 'Maria had been saving money for months. She finally had enough to buy the concert tickets she had been dreaming of. She logged onto the website exactly at 10 am, her heart pounding...',
        options: ['The website was confusing and difficult to navigate.', 'She decided to save her money for a new phone instead.', 'A message appeared: "Sold Out in 2 Minutes."', 'She had forgotten her password and had to reset it.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 22,
        question: 'The sky, which had been clear all morning, suddenly grew dark. Large, heavy clouds rolled in, and a cold wind began to blow through the trees...',
        options: ['It was the perfect day for a picnic.', 'The weather forecast had predicted sunshine.', 'People on the street quickened their pace, looking for shelter.', 'The sun came out and everything was beautiful again.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 23,
        question: 'David had never been particularly good at cooking. Tonight, however, he was determined to impress his date by making a complicated recipe from a famous chef...',
        options: ['He ordered a pizza and pretended he made it.', 'The kitchen was soon filled with smoke and the smell of something burning.', 'His date was a professional chef and took over immediately.', 'The meal was a stunning success and received a Michelin star.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 24,
        question: 'The old map was found in a dusty attic trunk. It showed a route to a place marked with a large \'X\' deep within the forest...',
        options: ['The map was immediately thrown away as useless junk.', 'They decided to frame it and hang it on the wall as decoration.', 'The forest had been turned into a shopping mall years ago.', 'The siblings looked at each other, excitement in their eyes, and began planning an expedition.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 25,
        question: 'After years of using public transportation, Lena decided it was finally time to learn how to drive. She booked her first lesson with a nervous excitement...',
        options: ['She realized she hated cars and preferred the bus.', 'Her instructor was very patient, but she stalled the car five times in the first ten minutes.', 'She passed her driving test on the first try with a perfect score.', 'She bought a car before even taking the lesson.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 26,
        question: 'The instructions for assembling the new bookshelf were unclear. There were extra screws and a piece of wood that didn\'t seem to fit anywhere...',
        options: ['The bookshelf assembled itself magically.', 'He gave up and used the shelves as firewood.', 'After three hours of frustration, the bookshelf was leaning dangerously to one side.', 'He called a professional carpenter to assemble a simple IKEA shelf.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 27,
        question: 'The message in the bottle had traveled thousands of miles across the ocean. A young girl found it washed up on the beach and carefully pulled out the note inside...',
        options: ['The note was a shopping list from 1985.', 'It was a desperate cry for help from a shipwrecked sailor.', 'She threw the bottle back into the water without reading it.', 'The writing was faded and impossible to read.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 28,
        question: 'My phone battery was at 1% as I walked through the unfamiliar part of the city. I needed to use the map to find my way back to the hotel...',
        options: ['I found a charger immediately in my pocket.', 'My phone died, and I had to ask strangers for directions.', 'I decided to live in the unfamiliar neighborhood forever.', 'The phone battery lasted for another 8 hours miraculously.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 29,
        question: 'The scientist mixed the two clear liquids together, hoping this new formula would finally be the breakthrough she needed...',
        options: ['Nothing happened, and she was disappointed.', 'The mixture instantly turned a brilliant blue and began to glow faintly.', 'She realized she had used salt water instead of the chemical compound.', 'The mixture exploded, covering the lab in green slime.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 30,
        question: 'He was the last runner to start the marathon. Everyone else had a significant head start...',
        options: ['He sat down and waited for the race to be over.', 'He sprinted with all his might, determined to catch up.', 'The race officials disqualified him for starting late.', 'He took a shortcut and won the race unfairly.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 31,
        question: 'The joke was so funny that Anna couldn\'t stop laughing. She laughed during the meeting, on the bus, and even while cooking dinner...',
        options: ['No one else found the joke amusing.', 'Her family started to get worried about her unusual behavior.', 'She forgot the punchline of the joke.', 'She was hired as a professional comedian the next day.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 32,
        question: 'The key didn\'t fit in the lock. Sarah was sure this was the right apartment, but the key she had just been given wouldn\'t turn...',
        options: ['She was trying to unlock her car door.', 'She realized the landlord had given her the wrong key by mistake.', 'The door was already unlocked, so she just walked in.', 'She kicked the door down and broke into her own apartment.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 33,
        question: 'The garden was overgrown with weeds after the long winter. It looked like a jungle, but Mr. Evans was not discouraged...',
        options: ['He moved to a new house with a smaller garden.', 'He hired a team of gardeners to solve the problem.', 'He rolled up his sleeves, grabbed his tools, and started cleaning.', 'He decided he preferred the wild, natural look.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 34,
        question: 'The test was much harder than Emma had expected. She read the first question again and again, but her mind went completely blank...',
        options: ['She remembered she had studied the wrong chapter.', 'She confidently wrote down all the answers and finished early.', 'The teacher announced the test was cancelled.', 'She had a photographic memory and remembered everything.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      {
        id: 35,
        question: 'The sign on the door clearly read, "Do Not Enter." But Leo could hear a strange, faint noise coming from the other side...',
        options: ['He respected the sign and walked away immediately.', 'He called security to report the noise.', 'His curiosity got the better of him, and he slowly pushed the door open.', 'The noise was just the wind from an open window.'],
        type: 'multiple-choice',
        section: 'reading-writing'
      },
      // Sentence ordering questions (36-40)
      {
        id: 36,
        question: 'Put the sentences in the correct order to form a logical paragraph. Topic: A Morning Routine. First sentence: "I always start my day with a hot cup of coffee." Order these sentences: (A) This routine helps me feel prepared and focused by the time I leave the house. (B) While it brews, I take a quick shower to help wake myself up. (C) After that, I check my emails and make a plan for the day ahead. (D) Finally, I drink my coffee while reading the news online.',
        type: 'sentence-ordering',
        section: 'reading-writing'
      },
      {
        id: 37,
        question: 'Put the sentences in the correct order to form a logical paragraph. Topic: Planning a Trip. First sentence: "Last year, my friends and I decided to plan a hiking trip to Scotland." Order these sentences: (A) Once that was settled, we began looking into flights and renting a car. (B) We spent evenings researching the best trails and affordable accommodation. (C) First, we all had to agree on a suitable date that worked for everyone. (D) The effort was worth it, as the trip was absolutely unforgettable.',
        type: 'sentence-ordering',
        section: 'reading-writing'
      },
      {
        id: 38,
        question: 'Put the sentences in the correct order to form a logical paragraph. Topic: A Lost Item. First sentence: "I realized my wallet was missing just as I reached the checkout counter." Order these sentences: (A) I felt a wave of panic as I searched my pockets and bag. (B) The cashier was very understanding and held my groceries for me. (C) I quickly retraced my steps through the supermarket aisles. (D) To my great relief, I found it next to a box of cereal in the breakfast aisle.',
        type: 'sentence-ordering',
        section: 'reading-writing'
      },
      {
        id: 39,
        question: 'Put the sentences in the correct order to form a logical paragraph. Topic: A Change in the Weather. First sentence: "The children were playing happily in the park under the bright sun." Order these sentences: (A) They managed to get inside just moments before the heavy rain started to pour. (B) Dark clouds began to gather quickly on the horizon. (C) Suddenly, a strong wind started to blow, and they heard distant thunder. (D) Their parents called them to pack up their things and head home immediately.',
        type: 'sentence-ordering',
        section: 'reading-writing'
      },
      {
        id: 40,
        question: 'Put the sentences in the correct order to form a logical paragraph. Topic: Learning a New Skill. First sentence: "I\'ve always wanted to learn how to play the guitar." Order these sentences: (A) Now, I can play several of my favourite songs, and it brings me so much joy. (B) At first, my fingers were sore and the chords sounded terrible. (C) So, for my birthday, I signed up for weekly lessons with a local teacher. (D) However, I practiced every day and slowly began to see improvement.',
        type: 'sentence-ordering',
        section: 'reading-writing'
      },
      // Original reading comprehension and writing questions (41-44)
      {
        id: 41,
        question: 'List two advantages of remote work mentioned in the text.',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 42,
        question: 'List two challenges of remote work mentioned in the text.',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 43,
        question: 'What is the main goal for companies according to the final sentence?',
        type: 'text',
        section: 'reading-writing'
      },
      {
        id: 44,
        question: 'Based on the text above, write a short paragraph (approx. 100-150 words) arguing for either the advantages or the disadvantages of remote work. Use your own ideas to support your argument.',
        type: 'essay',
        section: 'reading-writing'
      }
    ]
  },
  {
    id: 'listening',
    title: 'Core Listening',
    timeLimit: 10,
    instructions: 'You will hear a short audio recording ONCE. Then, answer the questions.',
    questions: [
      // Library Announcement (45-47)
      {
        id: 45,
        question: 'What is the main purpose of this announcement?',
        options: ['To announce the library\'s closing hours.', 'To inform people about a problem with the heating.', 'To introduce new library staff.', 'To advertise study carrels.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/library-announcement.mp3',
        audioGroup: 'library'
      },
      {
        id: 46,
        question: 'What are listeners encouraged to do?',
        options: ['Go home and come back later.', 'Move to a different floor of the library.', 'Help the maintenance staff fix the problem.', 'Complain at the front desk.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/library-announcement.mp3',
        audioGroup: 'library'
      },
      {
        id: 47,
        question: 'Where is the problem located?',
        options: ['On the ground floor.', 'On the first floor.', 'On the second floor.', 'In all study carrels.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/library-announcement.mp3',
        audioGroup: 'library'
      },
      // Friends Conversation (48-50)
      {
        id: 48,
        question: 'What is the main purpose of this announcement?',
        options: ['To welcome new visitors to the museum.', 'To inform visitors that the museum is closing shortly.', 'To advertise the museum\'s opening hours.', 'To announce a new exhibition.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/museum-announcement.mp3',
        audioGroup: 'friends'
      },
      {
        id: 49,
        question: 'What are visitors asked to do?',
        options: ['Move to the second floor.', 'Return any borrowed equipment.', 'Purchase tickets for their next visit.', 'Wait by the exhibition rooms.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/museum-announcement.mp3',
        audioGroup: 'friends'
      },
      {
        id: 50,
        question: 'According to the announcement, when is the museum open?',
        options: ['Every day from ten to five.', 'On weekends only.', 'From Tuesday to Sunday.', 'For thirty more minutes today.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/museum-announcement.mp3',
        audioGroup: 'friends'
      },
      // Voicemail Message (51-53)
      {
        id: 51,
        question: 'Who is leaving the message?',
        options: ['Mrs. Davies.', 'A receptionist from a vet\'s office.', 'A doctor from a hospital.', 'A dog trainer.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/voicemail-message.mp3',
        audioGroup: 'voicemail'
      },
      {
        id: 52,
        question: 'What is the reason for the call?',
        options: ['To cancel an appointment.', 'To give test results.', 'To schedule vaccinations for a pet.', 'To inform about changed opening hours.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/voicemail-message.mp3',
        audioGroup: 'voicemail'
      },
      {
        id: 53,
        question: 'What should Mrs. Davies do next?',
        options: ['Visit the clinic immediately.', 'Call back to make an appointment.', 'Wait for another call next week.', 'Bring Bailey in for surgery.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/voicemail-message.mp3',
        audioGroup: 'voicemail'
      },
      // Travel Report (54-56)
      {
        id: 54,
        question: 'What is the main problem reported?',
        options: ['A train has been cancelled.', 'There is heavy traffic on a motorway.', 'All city centre roads are closed.', 'There are no alternative routes.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/travel-report.mp3',
        audioGroup: 'travel'
      },
      {
        id: 55,
        question: 'What is the cause of the problem?',
        options: ['Roadworks.', 'Bad weather.', 'An accident.', 'A public event.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/travel-report.mp3',
        audioGroup: 'travel'
      },
      {
        id: 56,
        question: 'What are drivers recommended to do?',
        options: ['Wait in their cars patiently.', 'Take a different road.', 'Use the train instead.', 'Drive towards the city centre.'],
        type: 'multiple-choice',
        section: 'listening',
        audioFile: '/audio/travel-report.mp3',
        audioGroup: 'travel'
      }
    ]
  }
];

export const readingText = `Remote work, once a rarity, has become increasingly common. This shift offers significant advantages such as greater flexibility for employees, reduced commute times, and access to a wider global talent pool for employers. However, it also presents challenges like potential feelings of isolation among staff, difficulties in maintaining company culture, and the need for robust digital security measures. Companies are now tasked with developing new strategies to maximize the benefits of remote work while effectively mitigating its drawbacks.`;

export const listeningScript = `Hi Mark, have you had a chance to look at the quarterly sales report yet?

Hi Anna, yes, I went through it this morning. The figures are generally positive, especially in the Asian market. However, I'm a bit concerned about the dip in sales last month in Europe.

I saw that too. I think it might be related to the delayed marketing campaign. Let's schedule a brief meeting with the European team to discuss it. How about tomorrow at 10 am?

That works for me. I'll send out the calendar invites. Should we ask them to prepare some initial thoughts on the decline?

That's a good idea. Let's ask them to bring any data they have on customer feedback from that period as well.`;