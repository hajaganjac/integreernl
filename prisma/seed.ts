import { PrismaClient, ExamPart } from "@prisma/client";

const prisma = new PrismaClient();

interface QuestionSeed {
  prompt: string;
  explanation: string;
  options: string[]; // first option is always correct
}

interface LessonSeed {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  content: string;
}

interface ModuleSeed {
  slug: string;
  examPart: ExamPart;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: LessonSeed[];
  quiz: { slug: string; title: string; questions: QuestionSeed[] };
}

const MODULES: ModuleSeed[] = [
  {
    slug: "reading",
    examPart: "READING",
    title: "Reading (Lezen)",
    description:
      "Build the skills to understand Dutch letters, forms, notices and short articles at B1 level.",
    icon: "BookOpen",
    color: "brand",
    lessons: [
      {
        slug: "reading-strategies",
        title: "Reading strategies for the exam",
        summary: "Skimming, scanning, and dealing with words you don't know.",
        minutes: 12,
        content: `## Why reading strategy matters

At B1 level, the exam does not expect you to understand every single word. It expects you to get the **main idea** and find **specific information** quickly. Two strategies help enormously:

### 1. Skimming (globaal lezen)
Read the text quickly to understand what it is about, without stopping at unknown words. Look at:
- The **title** and any **subtitles**
- The **first sentence** of each paragraph
- Any **bold text** or numbers

### 2. Scanning (zoekend lezen)
When a question asks for a specific fact (a date, a price, a name), don't read the whole text again. Scan for capital letters, numbers, or keywords from the question.

### Dealing with unknown words
You will always see words you don't know — that is normal, even for native speakers reading formal Dutch. Try this order:
1. Can you guess the meaning from the words *around* it?
2. Does the word look like an English or a word from your own language (a "cognate")?
3. Can you skip it and still answer the question? Often, yes.

> **Exam tip:** Official Dutch letters (from de gemeente, DUO, or your zorgverzekering) often follow a fixed structure: sender, date, subject line (*Betreft:*), a greeting, the message, and a closing. Recognising this structure helps you find information fast.`,
      },
      {
        slug: "reading-official-letters",
        title: "Understanding official Dutch letters",
        summary: "Common phrases used by the gemeente, DUO, and Belastingdienst.",
        minutes: 15,
        content: `## Reading government letters

Dutch institutions (de gemeente, DUO, de Belastingdienst, your zorgverzekeraar) write in a fairly formal, repetitive style. Once you recognise the common phrases, these letters become much easier.

### Common opening phrases
| Dutch | Meaning |
|---|---|
| Geachte heer/mevrouw | Dear Sir/Madam |
| Betreft: | Subject: |
| Hierbij ontvangt u ... | Please find enclosed ... |
| Wij verzoeken u ... | We request that you ... |
| Naar aanleiding van uw ... | Following your ... |

### Common closing phrases
| Dutch | Meaning |
|---|---|
| Met vriendelijke groet | Kind regards |
| Voor vragen kunt u contact opnemen met ... | For questions, contact ... |
| Wij zien uw reactie graag tegemoet | We look forward to your response |

### Deadlines matter
Look carefully for **dates** and words like *uiterlijk* (by/at the latest), *binnen ... dagen* (within ... days), and *voor* (before). Missing a deadline from DUO or de Belastingdienst can have real consequences, so always double-check any date in an official letter.

> **Practice tip:** Every time you receive a real letter in the mail, try reading it before translating it — then check your understanding.`,
      },
      {
        slug: "reading-practice-text",
        title: "Practice text: a letter from the gemeente",
        summary: "A worked example with comprehension questions.",
        minutes: 10,
        content: `## Worked example

Read the short letter below, then look at how the questions are answered.

> **Gemeente Eindhoven**
> Betreft: Uitnodiging inburgeringsgesprek
>
> Geachte mevrouw Yilmaz,
>
> Wij nodigen u uit voor een gesprek over uw inburgering op **12 oktober om 10:00 uur** bij het Stadskantoor, Stadhuisplein 1. Neemt u alstublieft uw paspoort en verblijfsdocument mee.
>
> Kunt u niet op deze afspraak komen? Neem dan **uiterlijk 5 oktober** contact op via telefoonnummer 040-238 6000.
>
> Met vriendelijke groet,
> Team Inburgering

**Question: What must Mrs. Yilmaz bring to the appointment?**
Scan for a sentence that mentions "meenemen" (to bring). Answer: her passport and residence document.

**Question: By when must she cancel if she cannot attend?**
Scan for a date near "uiterlijk". Answer: 5 October.

This is exactly the pattern used in the real reading exam: a short official text, followed by direct factual questions you can answer by scanning.`,
      },
    ],
    quiz: {
      slug: "reading-check",
      title: "Reading module check",
      questions: [
        {
          prompt: "What is the best first step when you see a long, unfamiliar Dutch text?",
          explanation: "Skimming gives you the overall topic before you worry about individual words.",
          options: [
            "Skim the title, subtitles and first sentences to get the main idea",
            "Translate every single word one by one",
            "Skip the text completely",
            "Read only the last paragraph",
          ],
        },
        {
          prompt: "What does 'uiterlijk 5 oktober' mean in an official letter?",
          explanation: "'Uiterlijk' means 'at the latest' — it marks a deadline.",
          options: [
            "By 5 October at the latest",
            "Starting from 5 October",
            "Only on 5 October",
            "Never before 5 October",
          ],
        },
        {
          prompt: "'Geachte heer/mevrouw' is used to...",
          explanation: "It is the formal Dutch equivalent of 'Dear Sir/Madam'.",
          options: [
            "formally greet the reader of a letter",
            "close a letter",
            "ask a question",
            "give a phone number",
          ],
        },
        {
          prompt: "Which strategy is 'scanning' (zoekend lezen)?",
          explanation: "Scanning means searching for a specific detail rather than reading everything.",
          options: [
            "Quickly searching for one specific piece of information, like a date or price",
            "Reading every word slowly and carefully",
            "Reading the text out loud",
            "Memorising the whole text",
          ],
        },
        {
          prompt: "In a letter, 'Met vriendelijke groet' appears...",
          explanation: "It's the standard formal Dutch sign-off, equivalent to 'Kind regards'.",
          options: [
            "at the end, as a polite closing",
            "at the very beginning",
            "only in emails, never in letters",
            "as a question to the reader",
          ],
        },
      ],
    },
  },
  {
    slug: "writing",
    examPart: "WRITING",
    title: "Writing (Schrijven)",
    description:
      "Learn to structure short Dutch texts, formal messages and everyday forms with confidence.",
    icon: "PenLine",
    color: "accent",
    lessons: [
      {
        slug: "writing-structure",
        title: "Structuring a short Dutch message",
        summary: "Greeting, body, closing — the shape every message follows.",
        minutes: 10,
        content: `## The three-part shape

Almost every short Dutch text you'll be asked to write in the exam — an email, a note, a short letter — follows the same shape:

1. **Greeting (aanhef)** — e.g. *Beste Jan,* (informal) or *Geachte heer/mevrouw,* (formal)
2. **Body (kern)** — 2-4 short sentences with your message
3. **Closing (afsluiting)** — e.g. *Groetjes,* (informal) or *Met vriendelijke groet,* (formal)

### Formal vs informal
Use **formal** language for the gemeente, your employer, a doctor, or anyone you don't know well. Use **informal** language for friends, family, or close colleagues.

| Situation | Greeting | Closing |
|---|---|---|
| Formal (gemeente, dokter) | Geachte heer/mevrouw | Met vriendelijke groet |
| Informal (vriend, familie) | Beste / Hoi [naam] | Groetjes / Doei |

### Keep it simple
At B1 level, examiners want clear, correctly structured sentences — not complicated vocabulary. Short, accurate sentences score better than long sentences with mistakes.`,
      },
      {
        slug: "writing-common-situations",
        title: "Common exam situations",
        summary: "Calling in sick, cancelling an appointment, asking a question.",
        minutes: 14,
        content: `## Typical writing tasks

The writing exam usually asks you to respond to an everyday situation. Common tasks include:

### Calling in sick to work
\`\`\`
Beste [naam],

Ik voel me niet goed en kan vandaag niet werken.
Ik denk dat ik morgen weer kan komen.
Sorry voor het ongemak.

Groetjes,
[jouw naam]
\`\`\`

### Cancelling an appointment
\`\`\`
Geachte heer/mevrouw,

Ik kan helaas niet aanwezig zijn bij mijn afspraak op [datum].
Kunnen we een nieuwe afspraak maken?

Met vriendelijke groet,
[jouw naam]
\`\`\`

### Asking your child's school a question
\`\`\`
Beste meneer/mevrouw [naam],

Mijn kind [naam] is ziek en kan vandaag niet naar school komen.
Kunt u het huiswerk doorgeven?

Met vriendelijke groet,
[jouw naam]
\`\`\`

Notice how each message is short, direct, and follows the greeting-body-closing shape from the previous lesson.

> **Exam tip:** Always re-read your message and check three things: did you answer the actual question, is the greeting/closing appropriate for the situation, and are your verbs conjugated correctly (ik werk, jij werkt, hij/zij werkt)?`,
      },
      {
        slug: "writing-connectors",
        title: "Useful connecting words",
        summary: "Small words that make your writing sound natural.",
        minutes: 8,
        content: `## Connectors that instantly improve your writing

Simple connecting words make short texts sound much more natural and score better, because they show you can link ideas — not just list them.

| Dutch | Meaning | Example |
|---|---|---|
| en | and | Ik werk en ik studeer. |
| maar | but | Ik wil komen, maar ik ben ziek. |
| dus | so | Ik ben ziek, dus ik blijf thuis. |
| omdat | because | Ik bel u omdat ik ziek ben. |
| daarom | that's why | Ik ben ziek. Daarom kan ik niet komen. |
| ook | also | Ik spreek Engels. Ik spreek ook Nederlands. |

### Practice
Try combining these two short sentences using a connector:
*Ik kan niet komen. Ik ben ziek.*

→ **Ik kan niet komen, omdat ik ziek ben.**
→ **Ik ben ziek, dus ik kan niet komen.**

Both are correct — using connectors like this is one of the fastest ways to sound more fluent in writing without learning new vocabulary.`,
      },
    ],
    quiz: {
      slug: "writing-check",
      title: "Writing module check",
      questions: [
        {
          prompt: "Which greeting is correct for a formal letter to the gemeente?",
          explanation: "'Geachte heer/mevrouw' is the formal greeting used for institutions and strangers.",
          options: [
            "Geachte heer/mevrouw",
            "Hoi!",
            "Doei",
            "Beste vriend",
          ],
        },
        {
          prompt: "Which sentence correctly uses a connector to combine ideas?",
          explanation: "'Omdat' ('because') correctly links the reason to the main clause.",
          options: [
            "Ik bel u omdat ik ziek ben.",
            "Ik bel u. Ziek ben ik.",
            "Ik ziek bel u ben.",
            "Bel ik u ziek ben.",
          ],
        },
        {
          prompt: "What are the three parts of a short Dutch message?",
          explanation: "Every short message follows greeting, body, closing.",
          options: [
            "Greeting, body, closing",
            "Title, footnote, signature",
            "Question, answer, thanks",
            "Date, address, stamp",
          ],
        },
        {
          prompt: "Which closing fits an informal message to a friend?",
          explanation: "'Groetjes' is a warm, informal closing used between friends and family.",
          options: [
            "Groetjes",
            "Met vriendelijke groet",
            "Hoogachtend",
            "Geachte heer",
          ],
        },
        {
          prompt: "At B1 level, exam writing is scored mainly on...",
          explanation: "Clear, correct, well-structured short sentences score higher than long complex ones with mistakes.",
          options: [
            "Clear structure and correct simple sentences",
            "Using the longest words possible",
            "Writing as many pages as possible",
            "Avoiding all greetings",
          ],
        },
      ],
    },
  },
  {
    slug: "listening",
    examPart: "LISTENING",
    title: "Listening (Luisteren)",
    description:
      "Train your ear for everyday spoken Dutch — announcements, phone calls and conversations.",
    icon: "Headphones",
    color: "brand",
    lessons: [
      {
        slug: "listening-mindset",
        title: "Listening without translating",
        summary: "Why translating word-for-word in your head slows you down.",
        minutes: 9,
        content: `## Stop translating, start recognising

A very common trap: trying to translate every spoken word into your own language in real time. Spoken Dutch is fast, and by the time you've translated one sentence, you've missed the next three.

### Train yourself to recognise patterns instead
- Numbers and times (*half negen* = 8:30, *kwart voor drie* = 2:45)
- Question words (*wie, wat, waar, wanneer, waarom, hoe*)
- Signal words for a change of topic (*maar, trouwens, overigens*)

### Practice with real audio
Dutch public radio (NPO Radio 1), and NOS Jeugdjournaal (news for children, spoken slowly and clearly) are excellent free listening practice — much closer to daily spoken Dutch than textbook audio.

> **Exam tip:** In the real exam, you usually hear each audio fragment **twice**. Use the first listen for the general idea, and the second listen to catch specific details for the questions.`,
      },
      {
        slug: "listening-numbers-time",
        title: "Numbers, times and dates by ear",
        summary: "The listening skill that trips up almost everyone at first.",
        minutes: 12,
        content: `## Telling time in spoken Dutch

Dutch tells time relative to the *next* hour, which is different from English and confuses many learners at first.

| Dutch | Meaning |
|---|---|
| half negen | 8:30 (halfway to nine) |
| kwart voor negen | 8:45 |
| kwart over acht | 8:15 |
| vijf voor half negen | 8:25 |
| vijf over half negen | 8:35 |

### Numbers
Dutch numbers between 20-99 say the **units before the tens** — the reverse of English:
- 21 = eenentwintig ("one-and-twenty")
- 45 = vijfenveertig ("five-and-forty")
- 67 = zevenenzestig ("seven-and-sixty")

This reversal is one of the biggest reasons phone numbers, prices, and appointment times feel hard to catch by ear — your brain expects the tens first. With practice, it becomes automatic.

> **Practice tip:** Say your own phone number, birth date, and home address out loud in Dutch every day for a week. This single habit dramatically improves how fast you recognise numbers by ear.`,
      },
      {
        slug: "listening-phone-calls",
        title: "Understanding a phone call",
        summary: "Common phrases used when calling a doctor, school or company.",
        minutes: 11,
        content: `## Phone call phrases

Phone conversations are common in the listening exam because they reflect real situations: calling a huisarts (GP), a school, or a company.

### Common opening phrases you'll hear
- "Met [naam], waarmee kan ik u helpen?" — "[Name] speaking, how can I help you?"
- "U spreekt met de assistente van..." — "You're speaking with the assistant of..."
- "Kunt u uw naam en geboortedatum geven?" — "Can you give your name and date of birth?"

### Common questions to expect
- "Wanneer komt het u uit?" — "When does it suit you?"
- "Heeft u nog andere klachten?" — "Do you have any other complaints/symptoms?"
- "Kunt u dat herhalen?" — "Can you repeat that?" (useful for *you* to say too!)

### Your turn: useful phrases when *you* call
- "Ik bel omdat..." — "I'm calling because..."
- "Kan ik een afspraak maken?" — "Can I make an appointment?"
- "Sorry, kunt u langzamer praten?" — "Sorry, can you speak more slowly?"

Knowing this last phrase is genuinely useful in real life, not just the exam — Dutch speakers are usually happy to slow down if you ask politely.`,
      },
    ],
    quiz: {
      slug: "listening-check",
      title: "Listening module check",
      questions: [
        {
          prompt: "What does 'half negen' mean?",
          explanation: "'Half negen' literally means 'half to nine' — i.e. 8:30.",
          options: ["8:30", "9:30", "9:00", "8:15"],
        },
        {
          prompt: "How is the number 34 said in Dutch?",
          explanation: "Dutch says the unit before the ten: 'vier-en-dertig' = four-and-thirty.",
          options: ["vierendertig (four-and-thirty)", "dertigvier (thirty-four)", "veertigdrie", "drieveertig"],
        },
        {
          prompt: "What is the best strategy for exam listening fragments?",
          explanation: "You usually hear each fragment twice — first for gist, second for detail.",
          options: [
            "Use the first listen for the general idea, second for details",
            "Try to write down every single word",
            "Translate each word into your own language as you hear it",
            "Ignore the first listen completely",
          ],
        },
        {
          prompt: "'Kunt u dat herhalen?' means...",
          explanation: "'Herhalen' means 'to repeat' — a very useful phrase in real conversations too.",
          options: ["Can you repeat that?", "Can you help me?", "What time is it?", "Where are you?"],
        },
        {
          prompt: "Which is a good free way to practice everyday spoken Dutch?",
          explanation: "NOS Jeugdjournaal is spoken slowly and clearly, making it ideal listening practice for learners.",
          options: [
            "NOS Jeugdjournaal (news for children)",
            "Only textbook audio",
            "Watching films with no sound",
            "Reading silently",
          ],
        },
      ],
    },
  },
  {
    slug: "speaking",
    examPart: "SPEAKING",
    title: "Speaking (Spreken)",
    description:
      "Practice everyday spoken interactions you'll need for the exam and for daily life in the Netherlands.",
    icon: "Mic",
    color: "accent",
    lessons: [
      {
        slug: "speaking-confidence",
        title: "Speaking with confidence at B1",
        summary: "Why fluency matters more than perfect grammar in the exam.",
        minutes: 9,
        content: `## Fluency over perfection

At B1 level, examiners want to see that you can **keep a conversation going** on everyday topics — not that your grammar is flawless. A slightly imperfect sentence that communicates clearly scores better than silence while you search for the "perfect" sentence.

### Three habits that help
1. **Use simple sentence structures you're confident with**, rather than reaching for complex ones you're unsure of.
2. **Buy yourself thinking time** with natural filler phrases: *"Even denken..."* (let me think), *"Nou, eh..."* (well, um...).
3. **Ask for repetition or clarification** if needed — this is a normal, expected part of real conversations, not a failure: *"Sorry, kunt u dat herhalen?"*

### Common exam topics
Work, family, housing, health, shopping, and your daily routine. Practicing how to talk about these five topics for 1-2 minutes each covers most of what comes up.`,
      },
      {
        slug: "speaking-everyday-situations",
        title: "Everyday speaking situations",
        summary: "At the huisarts, in a shop, talking to a neighbour.",
        minutes: 13,
        content: `## Role-play: common situations

### At the huisarts (GP)
- "Ik heb pijn in mijn buik sinds gisteren." — "I've had stomach pain since yesterday."
- "Moet ik medicijnen nemen?" — "Do I need to take medicine?"

### In a shop
- "Heeft u dit ook in een andere maat?" — "Do you also have this in another size?"
- "Mag ik dit passen?" — "May I try this on?"

### Talking to a neighbour
- "Hoe bevalt het wonen hier?" — "How do you like living here?"
- "Sorry voor het lawaai gisteravond." — "Sorry for the noise last night."

### Structure for a longer answer
When asked to describe something (your job, your week, your family), use this simple pattern:
1. **State the fact** — "Ik werk in een winkel."
2. **Add a detail** — "Ik werk daar drie dagen per week."
3. **Give an opinion or feeling** — "Ik vind het leuk werk."

This three-step pattern turns a one-word answer into a natural, complete response — exactly what the speaking exam is looking for.`,
      },
      {
        slug: "speaking-practice-with-ai",
        title: "Practicing out loud, safely",
        summary: "How to use the AI assistant and other free resources to rehearse speaking.",
        minutes: 8,
        content: `## Practicing without embarrassment

Many learners avoid speaking practice because they're afraid of making mistakes in front of people. A few low-pressure ways to build confidence:

- **Talk to yourself** — describe what you're doing while cooking or commuting, out loud, in Dutch.
- **Use the IntegreerNL AI assistant** to practice a short role-play (e.g. "Let's practice a doctor's appointment") and get simple feedback on your phrasing.
- **Record yourself** on your phone answering a common exam question, then listen back after a day — you'll often hear your own mistakes more clearly with fresh ears.
- **Find a taalcoach** through your gemeente or Vluchtelingenwerk — many municipalities offer free conversation partners for exactly this purpose.

> **Reminder:** The AI assistant is a practice partner, not an official exam source. Use it to rehearse, then verify anything important against your course materials or a teacher.`,
      },
    ],
    quiz: {
      slug: "speaking-check",
      title: "Speaking module check",
      questions: [
        {
          prompt: "At B1 level, what matters most for the speaking exam?",
          explanation: "Keeping the conversation flowing clearly matters more than perfect grammar.",
          options: [
            "Keeping the conversation going clearly, even with small mistakes",
            "Never making a single grammar mistake",
            "Speaking as fast as possible",
            "Using only very complex sentences",
          ],
        },
        {
          prompt: "What is a good filler phrase while you think of an answer?",
          explanation: "'Even denken...' is a natural way to buy thinking time in Dutch.",
          options: ["Even denken...", "Tot ziens", "Dank u wel", "Goedemorgen"],
        },
        {
          prompt: "What is the 3-step pattern for a longer spoken answer?",
          explanation: "Fact, detail, opinion — this pattern turns a short answer into a full response.",
          options: [
            "State a fact, add a detail, give an opinion",
            "Say hello, say goodbye, say thanks",
            "Ask a question, wait, repeat the question",
            "List ten random words",
          ],
        },
        {
          prompt: "Where can you find a free conversation partner (taalcoach)?",
          explanation: "Many gemeentes and Vluchtelingenwerk organise free conversation partners for language learners.",
          options: [
            "Through your gemeente or Vluchtelingenwerk",
            "Only through a paid course",
            "Only at the exam centre",
            "It is not possible to find one for free",
          ],
        },
        {
          prompt: "How should you treat the IntegreerNL AI assistant?",
          explanation: "It's a helpful practice partner, but not an official or guaranteed-correct source.",
          options: [
            "As a useful practice partner, not an official source",
            "As the official government exam authority",
            "As a replacement for the real exam",
            "As something to avoid entirely",
          ],
        },
      ],
    },
  },
  {
    slug: "knm",
    examPart: "KNM",
    title: "Dutch Society (KNM)",
    description:
      "Kennis van de Nederlandse Maatschappij — how Dutch government, housing, healthcare and daily life work.",
    icon: "Landmark",
    color: "brand",
    lessons: [
      {
        slug: "knm-government",
        title: "How Dutch government works",
        summary: "King, parliament, provinces, and your local gemeente.",
        minutes: 14,
        content: `## The structure of Dutch government

The Netherlands is a **constitutional monarchy** with a **parliamentary democracy**. The King (currently **Willem-Alexander**) is the head of state, but has a mostly ceremonial role — real political power lies with elected politicians.

### Three levels of government
1. **Rijksoverheid (national government)** — the Tweede Kamer (House of Representatives, elected) and Eerste Kamer (Senate) make national laws. The Prime Minister (minister-president) leads the cabinet.
2. **Provincie (province)** — the Netherlands has 12 provinces, each with a provincial government (Provinciale Staten).
3. **Gemeente (municipality)** — your most direct contact with government. The gemeente handles things like your address registration (BRP), passports, parking permits, and — importantly — your **inburgering** obligations.

### Elections
Dutch citizens (and in some cases long-term residents) can vote in different elections: Tweede Kamer (every 4 years), provincial, and municipal elections. Voting is not compulsory in the Netherlands, unlike some other countries.

### Key vocabulary
| Dutch | English |
|---|---|
| Gemeente | Municipality |
| Rijksoverheid | National government |
| Koning | King |
| Verkiezingen | Elections |
| Grondwet | Constitution |`,
      },
      {
        slug: "knm-housing-healthcare",
        title: "Housing and healthcare basics",
        summary: "Renting, huurtoeslag, and the mandatory health insurance system.",
        minutes: 16,
        content: `## Housing in the Netherlands

Housing is often arranged through either the **social housing** sector (sociale huurwoning, via a housing corporation — woningcorporatie) or the **private rental/purchase market** (vrije sector).

- **Sociale huurwoning**: rent is capped and income-dependent; waiting lists (wachtlijst) can be long, often years in bigger cities.
- **Huurtoeslag**: a rent subsidy from the government for lower-income households renting below a certain price — applied for via the Belastingdienst.

### Mandatory health insurance
Everyone living or working in the Netherlands **must** have basic health insurance (basisverzekering) from a Dutch health insurer (zorgverzekeraar), usually within **4 months** of registering or starting work. This is a legal requirement, not optional.

- **Eigen risico**: a mandatory annual deductible (excess) — in recent years typically around €385 per year — that you pay yourself before insurance covers certain costs.
- **Zorgtoeslag**: a healthcare allowance from the government to help lower-income households pay their insurance premium.

### Key vocabulary
| Dutch | English |
|---|---|
| Huurtoeslag | Rent subsidy |
| Zorgverzekering | Health insurance |
| Eigen risico | Deductible/excess |
| Huisarts | GP / family doctor |
| Woningcorporatie | Housing corporation |`,
      },
      {
        slug: "knm-work-education",
        title: "Work, taxes and education",
        summary: "DigiD, the Belastingdienst, school types, and the labour market.",
        minutes: 15,
        content: `## Working and paying tax

If you work in the Netherlands, income tax (inkomstenbelasting) is usually withheld directly from your salary by your employer. Every year, most people file a tax return (belastingaangifte) with the **Belastingdienst** (tax office), often between March and May.

**DigiD** is your personal digital login for almost all Dutch government services — tax returns, healthcare allowance applications, and your gemeente's website. Setting one up early is one of the most useful practical steps a newcomer can take.

### The Dutch education system (simplified)
- **Basisschool** (primary school): ages 4-12
- **Voortgezet onderwijs** (secondary school): splits into levels — **vmbo** (more practical/vocational), **havo**, and **vwo** (more academic, prepares for university)
- **MBO** (vocational college), **HBO** (university of applied sciences), and **WO** (research university) follow secondary school

### The labour market
The Netherlands has a relatively flexible labour market with strong worker protections: a minimum wage (minimumloon), holiday allowance (vakantiegeld, usually 8% of your annual salary paid in May), and a legal minimum of 4x your weekly working hours in paid holiday days per year.

### Key vocabulary
| Dutch | English |
|---|---|
| Belastingdienst | Tax office |
| DigiD | Digital government login |
| Minimumloon | Minimum wage |
| Vakantiegeld | Holiday allowance |`,
      },
    ],
    quiz: {
      slug: "knm-check",
      title: "Dutch Society module check",
      questions: [
        {
          prompt: "What kind of government does the Netherlands have?",
          explanation: "The Netherlands is a constitutional monarchy with a parliamentary democracy.",
          options: [
            "A constitutional monarchy with a parliamentary democracy",
            "An absolute monarchy",
            "A one-party republic",
            "A direct democracy with no elected parliament",
          ],
        },
        {
          prompt: "Which level of government usually handles your inburgering process directly?",
          explanation: "The gemeente (municipality) is your direct point of contact for inburgering.",
          options: ["De gemeente (municipality)", "De provincie", "De Rijksoverheid only", "The King directly"],
        },
        {
          prompt: "Is basic health insurance mandatory in the Netherlands?",
          explanation: "Everyone living or working in the Netherlands must have a basisverzekering, usually within 4 months of arrival.",
          options: [
            "Yes, it is legally required for everyone living or working there",
            "No, it is optional",
            "Only for people over 65",
            "Only for Dutch citizens",
          ],
        },
        {
          prompt: "What is DigiD used for?",
          explanation: "DigiD is the personal digital login used for most Dutch government online services.",
          options: [
            "Logging into Dutch government services online",
            "A type of health insurance",
            "A public transport card",
            "A school exam certificate",
          ],
        },
        {
          prompt: "What is 'huurtoeslag'?",
          explanation: "Huurtoeslag is a government subsidy that helps lower-income renters pay their rent.",
          options: [
            "A government subsidy to help pay rent",
            "A tax on rented homes",
            "A type of mortgage",
            "A parking permit",
          ],
        },
        {
          prompt: "In the Dutch secondary school system, which track is the most academic, preparing for university?",
          explanation: "VWO is the most academically oriented secondary track, preparing students for university (WO).",
          options: ["vwo", "vmbo", "basisschool", "mbo"],
        },
      ],
    },
  },
];

async function main() {
  console.log("Seeding IntegreerNL course content...");

  for (let i = 0; i < MODULES.length; i++) {
    const m = MODULES[i];

    const moduleRecord = await prisma.module.upsert({
      where: { slug: m.slug },
      update: {
        examPart: m.examPart,
        title: m.title,
        description: m.description,
        icon: m.icon,
        color: m.color,
        order: i,
      },
      create: {
        slug: m.slug,
        examPart: m.examPart,
        title: m.title,
        description: m.description,
        icon: m.icon,
        color: m.color,
        order: i,
      },
    });

    for (let j = 0; j < m.lessons.length; j++) {
      const l = m.lessons[j];
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: moduleRecord.id, slug: l.slug } },
        update: {
          title: l.title,
          summary: l.summary,
          content: l.content,
          minutes: l.minutes,
          order: j,
        },
        create: {
          moduleId: moduleRecord.id,
          slug: l.slug,
          title: l.title,
          summary: l.summary,
          content: l.content,
          minutes: l.minutes,
          order: j,
        },
      });
    }

    const existingQuiz = await prisma.quiz.findUnique({
      where: { moduleId_slug: { moduleId: moduleRecord.id, slug: m.quiz.slug } },
    });

    if (existingQuiz) {
      await prisma.question.deleteMany({ where: { quizId: existingQuiz.id } });
    }

    const quizRecord = await prisma.quiz.upsert({
      where: { moduleId_slug: { moduleId: moduleRecord.id, slug: m.quiz.slug } },
      update: { title: m.quiz.title, order: 0 },
      create: {
        moduleId: moduleRecord.id,
        slug: m.quiz.slug,
        title: m.quiz.title,
        order: 0,
      },
    });

    for (let k = 0; k < m.quiz.questions.length; k++) {
      const q = m.quiz.questions[k];
      const question = await prisma.question.create({
        data: {
          quizId: quizRecord.id,
          prompt: q.prompt,
          explanation: q.explanation,
          order: k,
        },
      });

      const shuffled = q.options.map((label, idx) => ({ label, isCorrect: idx === 0 }));

      for (let o = 0; o < shuffled.length; o++) {
        await prisma.option.create({
          data: {
            questionId: question.id,
            label: shuffled[o].label,
            isCorrect: shuffled[o].isCorrect,
            order: o,
          },
        });
      }
    }

    console.log(`  ✓ ${m.title}: ${m.lessons.length} lessons, ${m.quiz.questions.length} quiz questions`);
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
