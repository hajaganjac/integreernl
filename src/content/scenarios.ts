/**
 * The situations, as plain data.
 *
 * This used to live in a database, which meant the prototype could not be put
 * online without hosting Postgres and configuring secrets. The content never
 * changed at runtime — it is written by me, in the repo — so it belongs here.
 * Editing this file and pushing is now the whole content workflow.
 *
 * EVIDENCE STATUS — design hypothesis, not a finding (Analysis ch. 8–11 are
 * still planned). The list of situations is my best guess at what matters;
 * the interviews decide what actually gets built.
 */

export type Level = "A0" | "A1" | "A2";

export interface Choice {
  id: string;
  dutch: string;
  english: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Step {
  id: string;
  speaker: "PARTNER" | "LEARNER";
  dutch: string;
  english: string;
  hint?: string;
  choices?: Choice[];
}

export interface Scenario {
  slug: string;
  title: string;
  dutchTitle: string;
  description: string;
  setting?: string;
  level: Level;
  icon: string;
  minutes: number;
  published: boolean;
  steps?: Step[];
}

export const SCENARIOS: Scenario[] = [
  {
    slug: "ordering-coffee",
    title: "Ordering coffee",
    dutchTitle: "Koffie bestellen",
    description:
      "Order a drink at the counter, say how you want it, and pay. One of the first conversations most people have in Dutch.",
    setting: "You walk into a café in the morning. The barista greets you.",
    level: "A1",
    icon: "Coffee",
    minutes: 5,
    published: true,
    steps: [
      {
        id: "coffee-1",
        speaker: "PARTNER",
        dutch: "Goedemorgen! Wat wilt u bestellen?",
        english: "Good morning! What would you like to order?",
      },
      {
        id: "coffee-2",
        speaker: "LEARNER",
        dutch: "Order a coffee.",
        english: "Say what you would like.",
        hint: "“Ik wil graag…” means “I would like…”. It is the polite, normal way to order.",
        choices: [
          {
            id: "coffee-2a",
            dutch: "Ik wil graag een koffie, alstublieft.",
            english: "I would like a coffee, please.",
            isCorrect: true,
            feedback:
              "This is the standard way to order. “Ik wil graag” (I would like) is polite, and “alstublieft” is the formal “please” you use with staff.",
          },
          {
            id: "coffee-2b",
            dutch: "Ik wil koffie.",
            english: "I want coffee.",
            isCorrect: false,
            feedback:
              "People will understand you, but this sounds blunt — like “I want coffee”. Adding “graag” and “alstublieft” makes it polite without being complicated.",
          },
          {
            id: "coffee-2c",
            dutch: "Heb je koffie?",
            english: "Do you have coffee?",
            isCorrect: false,
            feedback:
              "This asks whether they sell coffee at all, which is a bit odd in a café. It also uses “je” (informal) with someone serving you; “u” is the safer choice.",
          },
        ],
      },
      {
        id: "coffee-3",
        speaker: "PARTNER",
        dutch: "Natuurlijk. Wilt u er melk en suiker bij?",
        english: "Of course. Would you like milk and sugar with that?",
      },
      {
        id: "coffee-4",
        speaker: "LEARNER",
        dutch: "Say you want milk but no sugar.",
        english: "Answer the barista's question.",
        hint: "“Wel” and “geen” are useful here: “wel melk” (milk yes), “geen suiker” (no sugar).",
        choices: [
          {
            id: "coffee-4a",
            dutch: "Wel melk, maar geen suiker, dank u.",
            english: "Milk yes, but no sugar, thank you.",
            isCorrect: true,
            feedback:
              "Exactly right. “Geen” is how you say “no” before a noun — “geen suiker”, “geen melk”. “Dank u” is the formal thank you.",
          },
          {
            id: "coffee-4b",
            dutch: "Ja, melk. Nee, suiker.",
            english: "Yes, milk. No, sugar.",
            isCorrect: false,
            feedback:
              "This is confusing — “nee, suiker” sounds like you are asking for sugar. Use “geen suiker” to say you do not want it.",
          },
          {
            id: "coffee-4c",
            dutch: "Niet suiker, melk graag.",
            english: "Not sugar, milk please.",
            isCorrect: false,
            feedback:
              "Close. The word order is fine, but before a noun Dutch uses “geen”, not “niet”. So: “geen suiker”.",
          },
        ],
      },
      {
        id: "coffee-5",
        speaker: "PARTNER",
        dutch: "Prima. Dat is dan drie euro vijftig. Betaalt u met pin of contant?",
        english: "Great. That will be three euros fifty. Are you paying by card or cash?",
      },
      {
        id: "coffee-6",
        speaker: "LEARNER",
        dutch: "Say you will pay by card.",
        english: "Tell the barista how you want to pay.",
        hint: "In the Netherlands “pinnen” means paying by debit card. It is by far the most common way to pay.",
        choices: [
          {
            id: "coffee-6a",
            dutch: "Met pin, graag.",
            english: "By card, please.",
            isCorrect: true,
            feedback:
              "Short and completely natural. “Pinnen” is the normal Dutch word for paying by debit card — you will hear it everywhere.",
          },
          {
            id: "coffee-6b",
            dutch: "Ik betaal met geld.",
            english: "I pay with money.",
            isCorrect: false,
            feedback:
              "“Geld” just means money in general, so this does not answer the question. Say “met pin” (card) or “contant” (cash).",
          },
          {
            id: "coffee-6c",
            dutch: "Met creditcard.",
            english: "By credit card.",
            isCorrect: false,
            feedback:
              "Grammatically fine, but many Dutch cafés do not take credit cards. “Pin” (debit card) is the normal answer.",
          },
        ],
      },
      {
        id: "coffee-7",
        speaker: "PARTNER",
        dutch: "Dank u wel. Een fijne dag nog!",
        english: "Thank you. Have a nice day!",
      },
      {
        id: "coffee-8",
        speaker: "LEARNER",
        dutch: "Say goodbye.",
        english: "Close the conversation politely.",
        hint: "“U ook” means “you too” — a short, very common way to return a wish.",
        choices: [
          {
            id: "coffee-8a",
            dutch: "Dank u wel, u ook!",
            english: "Thank you, you too!",
            isCorrect: true,
            feedback:
              "Perfect. “U ook” is what most people actually say back. Short, polite, and it sounds natural.",
          },
          {
            id: "coffee-8b",
            dutch: "Tot ziens.",
            english: "Goodbye.",
            isCorrect: false,
            feedback:
              "Not wrong, and people will understand you — but it ignores the nice thing they just said. Returning the wish with “u ook” sounds warmer.",
          },
        ],
      },
    ],
  },

  // Candidates — listed so the direction is visible and so interview
  // participants can say which of these they would actually want.
  {
    slug: "introducing-yourself",
    title: "Introducing yourself",
    dutchTitle: "Jezelf voorstellen",
    description: "Say your name, where you are from, and what you do.",
    level: "A0",
    icon: "Hand",
    minutes: 5,
    published: false,
  },
  {
    slug: "at-the-supermarket",
    title: "At the supermarket",
    dutchTitle: "In de supermarkt",
    description: "Find what you need, ask where something is, and get through the checkout.",
    level: "A1",
    icon: "ShoppingBasket",
    minutes: 6,
    published: false,
  },
  {
    slug: "asking-for-directions",
    title: "Asking for directions",
    dutchTitle: "De weg vragen",
    description: "Ask how to get somewhere and understand the answer.",
    level: "A1",
    icon: "Map",
    minutes: 6,
    published: false,
  },
  {
    slug: "making-an-appointment",
    title: "Making an appointment",
    dutchTitle: "Een afspraak maken",
    description: "Call to arrange a time, for example at the doctor or the hairdresser.",
    level: "A2",
    icon: "CalendarCheck",
    minutes: 7,
    published: false,
  },
  {
    slug: "small-talk-with-colleagues",
    title: "Small talk with colleagues",
    dutchTitle: "Praten met collega's",
    description: "Handle the short conversations around the coffee machine.",
    level: "A2",
    icon: "Users",
    minutes: 7,
    published: false,
  },
];

export const getScenario = (slug: string) => SCENARIOS.find((s) => s.slug === slug);
export const publishedScenarios = () => SCENARIOS.filter((s) => s.published);

/** Looks up a single choice across all situations, for server-side grading. */
export function findChoice(choiceId: string): Choice | undefined {
  for (const s of SCENARIOS) {
    for (const step of s.steps ?? []) {
      const hit = step.choices?.find((c) => c.id === choiceId);
      if (hit) return hit;
    }
  }
  return undefined;
}
