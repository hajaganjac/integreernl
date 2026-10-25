import { PrismaClient, Level, Speaker } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed content for the first interactive prototype.
 *
 * Analysis v2 ch. 3: the target group is expat beginners (A0–A2) who want
 * practical Dutch for daily life. Content is therefore organised by everyday
 * situation.
 *
 * EVIDENCE STATUS — design hypothesis, not a finding.
 * The interviews (ch. 8) and survey (ch. 10) are still planned, so the list of
 * situations below is my best guess at what matters, not a research result.
 * One situation is written in full on purpose: it is enough to test the idea
 * with real users before investing in more content.
 */

interface ChoiceSeed {
  dutch: string;
  english: string;
  isCorrect: boolean;
  feedback: string;
}

interface StepSeed {
  speaker: Speaker;
  dutch: string;
  english: string;
  hint?: string;
  choices?: ChoiceSeed[];
}

interface ScenarioSeed {
  slug: string;
  title: string;
  dutchTitle: string;
  description: string;
  setting?: string;
  level: Level;
  icon: string;
  minutes: number;
  published: boolean;
  steps?: StepSeed[];
}

const SCENARIOS: ScenarioSeed[] = [
  // ---------------------------------------------------------------------
  // The one fully written situation.
  // ---------------------------------------------------------------------
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
        speaker: "PARTNER",
        dutch: "Goedemorgen! Wat wilt u bestellen?",
        english: "Good morning! What would you like to order?",
      },
      {
        speaker: "LEARNER",
        dutch: "Order a coffee.",
        english: "Say what you would like.",
        hint: "“Ik wil graag…” means “I would like…”. It is the polite, normal way to order.",
        choices: [
          {
            dutch: "Ik wil graag een koffie, alstublieft.",
            english: "I would like a coffee, please.",
            isCorrect: true,
            feedback:
              "This is the standard way to order. “Ik wil graag” (I would like) is polite, and “alstublieft” is the formal “please” you use with staff.",
          },
          {
            dutch: "Ik wil koffie.",
            english: "I want coffee.",
            isCorrect: false,
            feedback:
              "People will understand you, but this sounds blunt — like “I want coffee”. Adding “graag” and “alstublieft” makes it polite without being complicated.",
          },
          {
            dutch: "Heb je koffie?",
            english: "Do you have coffee?",
            isCorrect: false,
            feedback:
              "This asks whether they sell coffee at all, which is a bit odd in a café. It also uses “je” (informal) with someone serving you; “u” is the safer choice.",
          },
        ],
      },
      {
        speaker: "PARTNER",
        dutch: "Natuurlijk. Wilt u er melk en suiker bij?",
        english: "Of course. Would you like milk and sugar with that?",
      },
      {
        speaker: "LEARNER",
        dutch: "Say you want milk but no sugar.",
        english: "Answer the barista's question.",
        hint: "“Wel” and “geen” are useful here: “wel melk” (milk yes), “geen suiker” (no sugar).",
        choices: [
          {
            dutch: "Wel melk, maar geen suiker, dank u.",
            english: "Milk yes, but no sugar, thank you.",
            isCorrect: true,
            feedback:
              "Exactly right. “Geen” is how you say “no” before a noun — “geen suiker”, “geen melk”. “Dank u” is the formal thank you.",
          },
          {
            dutch: "Ja, melk. Nee, suiker.",
            english: "Yes, milk. No, sugar.",
            isCorrect: false,
            feedback:
              "This is confusing — “nee, suiker” sounds like you are asking for sugar. Use “geen suiker” to say you do not want it.",
          },
          {
            dutch: "Niet suiker, melk graag.",
            english: "Not sugar, milk please.",
            isCorrect: false,
            feedback:
              "Close. The word order is fine, but before a noun Dutch uses “geen”, not “niet”. So: “geen suiker”.",
          },
        ],
      },
      {
        speaker: "PARTNER",
        dutch: "Prima. Dat is dan drie euro vijftig. Betaalt u met pin of contant?",
        english: "Great. That will be three euros fifty. Are you paying by card or cash?",
      },
      {
        speaker: "LEARNER",
        dutch: "Say you will pay by card.",
        english: "Tell the barista how you want to pay.",
        hint: "In the Netherlands “pinnen” means paying by debit card. It is by far the most common way to pay.",
        choices: [
          {
            dutch: "Met pin, graag.",
            english: "By card, please.",
            isCorrect: true,
            feedback:
              "Short and completely natural. “Pinnen” is the normal Dutch word for paying by debit card — you will hear it everywhere.",
          },
          {
            dutch: "Ik betaal met geld.",
            english: "I pay with money.",
            isCorrect: false,
            feedback:
              "“Geld” just means money in general, so this does not answer the question. Say “met pin” (card) or “contant” (cash).",
          },
          {
            dutch: "Met creditcard.",
            english: "By credit card.",
            isCorrect: false,
            feedback:
              "Grammatically fine, but many Dutch cafés do not take credit cards. “Pin” (debit card) is the normal answer.",
          },
        ],
      },
      {
        speaker: "PARTNER",
        dutch: "Dank u wel. Een fijne dag nog!",
        english: "Thank you. Have a nice day!",
      },
      {
        speaker: "LEARNER",
        dutch: "Say goodbye.",
        english: "Close the conversation politely.",
        hint: "“U ook” means “you too” — a short, very common way to return a wish.",
        choices: [
          {
            dutch: "Dank u wel, u ook!",
            english: "Thank you, you too!",
            isCorrect: true,
            feedback:
              "Perfect. “U ook” is what most people actually say back. Short, polite, and it sounds natural.",
          },
          {
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

  // ---------------------------------------------------------------------
  // Planned situations. Listed so the direction is visible and so I can ask
  // interview participants which of these they would actually want.
  // ---------------------------------------------------------------------
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

async function main() {
  console.log("Seeding IntegreerNL situations...");

  for (let i = 0; i < SCENARIOS.length; i++) {
    const s = SCENARIOS[i];

    const scenario = await prisma.scenario.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        dutchTitle: s.dutchTitle,
        description: s.description,
        setting: s.setting ?? "",
        level: s.level,
        icon: s.icon,
        minutes: s.minutes,
        published: s.published,
        order: i,
      },
      create: {
        slug: s.slug,
        title: s.title,
        dutchTitle: s.dutchTitle,
        description: s.description,
        setting: s.setting ?? "",
        level: s.level,
        icon: s.icon,
        minutes: s.minutes,
        published: s.published,
        order: i,
      },
    });

    // Rewrite the conversation from scratch so the seed stays idempotent.
    await prisma.scenarioStep.deleteMany({ where: { scenarioId: scenario.id } });

    for (let j = 0; j < (s.steps?.length ?? 0); j++) {
      const step = s.steps![j];
      const created = await prisma.scenarioStep.create({
        data: {
          scenarioId: scenario.id,
          order: j,
          speaker: step.speaker,
          dutch: step.dutch,
          english: step.english,
          hint: step.hint ?? "",
        },
      });

      for (let k = 0; k < (step.choices?.length ?? 0); k++) {
        const c = step.choices![k];
        await prisma.scenarioChoice.create({
          data: {
            stepId: created.id,
            order: k,
            dutch: c.dutch,
            english: c.english,
            isCorrect: c.isCorrect,
            feedback: c.feedback,
          },
        });
      }
    }

    const turns = s.steps?.length ?? 0;
    console.log(`  ✓ ${s.title}${s.published ? ` — ${turns} turns` : " (planned)"}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
