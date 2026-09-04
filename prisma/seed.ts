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

interface VocabSeed {
  dutch: string;
  english: string;
  exampleNl: string;
  exampleEn: string;
}

interface ModuleSeed {
  slug: string;
  examPart: ExamPart;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: LessonSeed[];
  vocabulary: VocabSeed[];
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
      {
        slug: "reading-forms",
        title: "Reading and filling in Dutch forms",
        summary: "Recognising field labels on official application forms.",
        minutes: 13,
        content: `## Forms are everywhere

Whether it's DigiD, a housing application, or a library card, Dutch forms (formulieren) reuse the same field labels again and again. Recognising them on sight saves real time in the exam — and in daily life.

### Common form fields
| Dutch label | English meaning |
|---|---|
| Voornaam | First name |
| Achternaam / Familienaam | Last name / Surname |
| Geboortedatum | Date of birth |
| Geboorteplaats | Place of birth |
| Nationaliteit | Nationality |
| Adres | Address |
| Postcode | Postal code |
| Woonplaats | City of residence |
| Burgerlijke staat | Marital status |
| Handtekening | Signature |
| Datum | Date |

### Reading instructions on forms
Forms often include short instruction phrases:
- *"Vul in blokletters in"* — Fill in using block letters
- *"Kruis het juiste vakje aan"* — Tick the correct box
- *"Verplicht veld"* — Required field
- *"Niet van toepassing"* — Not applicable (often abbreviated **n.v.t.**)

> **Exam tip:** In the reading exam, a form-reading question usually asks you to match a piece of personal information to the correct field label. Practice by looking at any real form you receive and naming each field in Dutch before checking your answer.`,
      },
      {
        slug: "reading-news",
        title: "Reading simplified Dutch news",
        summary: "Getting comfortable with headlines and short news items.",
        minutes: 11,
        content: `## Building up to real news

Dutch news articles use more advanced vocabulary than official letters, but you don't need to jump straight to a full newspaper. A good progression:

1. **NOS Jeugdjournaal** (news for children) — short articles, simple sentence structure, ideal starting point.
2. **NU.nl short articles** — everyday news written in fairly plain language.
3. **Metro / free newspapers** — short articles, practical topics (weather, local events, transport).

### Reading a headline
Dutch headlines often drop small words to stay short, which can make them feel harder than they are. For example:
*"Trein vertraagd door werkzaamheden"* (Train delayed due to roadworks) — notice there's no "is" (the train **is** delayed); this dropped-verb style is common in headlines specifically, not in normal sentences.

### A simple three-step approach
1. Read the headline and guess the topic.
2. Read the first paragraph only — Dutch news articles usually put the most important fact first (an "inverted pyramid" structure).
3. Only read further if a question asks for more detail.

> **Practice tip:** Pick one short NOS Jeugdjournaal article a day. Don't aim to understand 100% — aim to answer "what happened, where, and when?" from the first paragraph alone.`,
      },
    ],
    vocabulary: [
      { dutch: "de brief", english: "the letter", exampleNl: "Ik heb een brief van de gemeente ontvangen.", exampleEn: "I received a letter from the municipality." },
      { dutch: "de afspraak", english: "the appointment", exampleNl: "Mijn afspraak is op maandag om negen uur.", exampleEn: "My appointment is on Monday at nine o'clock." },
      { dutch: "het formulier", english: "the form", exampleNl: "Kunt u dit formulier invullen?", exampleEn: "Can you fill in this form?" },
      { dutch: "de handtekening", english: "the signature", exampleNl: "Vergeet uw handtekening niet.", exampleEn: "Don't forget your signature." },
      { dutch: "geldig", english: "valid", exampleNl: "Mijn paspoort is nog geldig.", exampleEn: "My passport is still valid." },
      { dutch: "de aanvraag", english: "the application", exampleNl: "Ik doe een aanvraag voor huurtoeslag.", exampleEn: "I'm applying for rent subsidy." },
      { dutch: "verplicht", english: "mandatory / required", exampleNl: "Een verblijfsvergunning is verplicht.", exampleEn: "A residence permit is mandatory." },
      { dutch: "inleveren", english: "to hand in / submit", exampleNl: "U moet het formulier voor vrijdag inleveren.", exampleEn: "You must submit the form by Friday." },
      { dutch: "controleren", english: "to check", exampleNl: "Controleer uw gegevens goed.", exampleEn: "Check your details carefully." },
      { dutch: "ontvangen", english: "to receive", exampleNl: "Wanneer ontvang ik het antwoord?", exampleEn: "When will I receive the answer?" },
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
        {
          prompt: "On a Dutch form, what does 'n.v.t.' mean?",
          explanation: "'n.v.t.' is short for 'niet van toepassing' — not applicable.",
          options: ["Not applicable", "Not valid today", "New value type", "Not verified there"],
        },
        {
          prompt: "Where do Dutch news articles usually put the most important fact?",
          explanation: "Dutch news, like most news writing, uses an 'inverted pyramid' — most important information first.",
          options: [
            "In the first paragraph",
            "In the last paragraph",
            "In the headline only, never in the text",
            "Only in a summary box",
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
      {
        slug: "writing-forms",
        title: "Filling in Dutch forms correctly",
        summary: "Writing your own details accurately on official paperwork.",
        minutes: 9,
        content: `## From reading forms to filling them in

You already learned to *recognise* form fields in the Reading module — now it's time to *fill them in* correctly and neatly, since this is also tested in the writing exam.

### Golden rules for filling in forms
- Write in **block letters (blokletters)** if asked — this avoids handwriting confusion.
- Use the **Dutch date format**: day-month-year (e.g. 05-03-2026, not March 5).
- For "Burgerlijke staat" (marital status), common answers are: *ongehuwd* (single), *gehuwd* (married), *gescheiden* (divorced), *weduwe/weduwnaar* (widow/widower).
- Leave a field empty or write **n.v.t.** only when a field truly does not apply to you — never guess.

### Example: a simple registration form
\`\`\`
Voornaam:         Amina
Achternaam:       Yilmaz
Geboortedatum:    12-04-1997
Nationaliteit:    Turks
Adres:            Kerkstraat 22
Postcode:         5611 AB
Woonplaats:       Eindhoven
Burgerlijke staat: Gehuwd
Datum:            04-09-2026
Handtekening:     A. Yilmaz
\`\`\`

> **Exam tip:** Practice writing out your own real details in Dutch form-style at least once. It builds muscle memory you'll use for the rest of your life in the Netherlands, not just the exam.`,
      },
      {
        slug: "writing-about-yourself",
        title: "Writing a short introduction about yourself",
        summary: "A reusable paragraph structure for exams, forms and daily life.",
        minutes: 10,
        content: `## The self-introduction paragraph

Both the writing and speaking exams often ask you to describe yourself, your family, or your daily life. A simple, reusable structure works for almost any version of this task:

1. **Who you are** — name, where you're from, how long you've lived in the Netherlands
2. **What you do** — work, study, or care responsibilities
3. **Your family situation** — who you live with
4. **One personal detail** — a hobby, goal, or opinion

### Example
\`\`\`
Ik heet Amina Yilmaz. Ik kom uit Turkije en woon sinds vier maanden
in Eindhoven. Ik werk drie dagen per week in een winkel en ik leer
Nederlands. Ik woon samen met mijn man. In mijn vrije tijd lees ik
graag en ik wandel in het park.
\`\`\`

Notice each sentence is short and covers exactly one idea — this is much easier to get right than one long, complicated sentence.

> **Practice tip:** Write your own version of this paragraph, then read it aloud. You now have a ready-made answer for both the writing exam and the speaking exam's "tell me about yourself" question.`,
      },
    ],
    vocabulary: [
      { dutch: "de voornaam", english: "first name", exampleNl: "Mijn voornaam is Amina.", exampleEn: "My first name is Amina." },
      { dutch: "de achternaam", english: "last name / surname", exampleNl: "Wat is uw achternaam?", exampleEn: "What is your last name?" },
      { dutch: "de geboortedatum", english: "date of birth", exampleNl: "Vul uw geboortedatum in.", exampleEn: "Fill in your date of birth." },
      { dutch: "het adres", english: "the address", exampleNl: "Wat is uw nieuwe adres?", exampleEn: "What is your new address?" },
      { dutch: "de postcode", english: "postal code", exampleNl: "De postcode staat op de envelop.", exampleEn: "The postal code is on the envelope." },
      { dutch: "burgerlijke staat", english: "marital status", exampleNl: "Mijn burgerlijke staat is gehuwd.", exampleEn: "My marital status is married." },
      { dutch: "de datum", english: "the date", exampleNl: "Schrijf de datum bovenaan.", exampleEn: "Write the date at the top." },
      { dutch: "de woonplaats", english: "place of residence", exampleNl: "Mijn woonplaats is Eindhoven.", exampleEn: "My place of residence is Eindhoven." },
      { dutch: "invullen", english: "to fill in", exampleNl: "Kunt u dit formulier invullen?", exampleEn: "Can you fill in this form?" },
      { dutch: "de groet", english: "the greeting / regards", exampleNl: "Met vriendelijke groet.", exampleEn: "Kind regards." },
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
        {
          prompt: "What is the correct Dutch date format?",
          explanation: "Dutch dates are written day-month-year, e.g. 05-03-2026.",
          options: ["Day-month-year (05-03-2026)", "Month-day-year (03-05-2026)", "Year-day-month", "Month name only"],
        },
        {
          prompt: "In a short self-introduction paragraph, what should come first?",
          explanation: "Starting with who you are (name, origin, how long in NL) gives the reader context before other details.",
          options: [
            "Who you are — name and background",
            "Your opinion about the weather",
            "A random hobby with no context",
            "The date you are writing",
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
      {
        slug: "listening-announcements",
        title: "Understanding public announcements",
        summary: "Train stations, weather forecasts, and shop announcements.",
        minutes: 10,
        content: `## Announcements come in predictable patterns

Public announcements (omroepberichten) always follow a similar structure, which makes them easier to prepare for than free conversation.

### Train and bus announcements
- "De trein naar Utrecht heeft een vertraging van tien minuten." — The train to Utrecht has a delay of ten minutes.
- "Reizigers voor Amsterdam wordt verzocht over te stappen op perron 4." — Passengers for Amsterdam are requested to change at platform 4.
- Listen especially for: destination city, platform number (perron), and the delay/reason.

### Weather forecasts (weerbericht)
- "Vandaag wordt het bewolkt met kans op regen." — Today will be cloudy with a chance of rain.
- "Morgen schijnt de zon en wordt het achttien graden." — Tomorrow the sun will shine and it will be eighteen degrees.
- Key words: *bewolkt* (cloudy), *zonnig* (sunny), *regen* (rain), *graden* (degrees), *wind* (wind).

### Shop and supermarket announcements
- "Let op: de winkel sluit over tien minuten." — Attention: the shop closes in ten minutes.
- "Klant aan kassa 3 wordt verwacht." — Customer expected at checkout 3.

> **Practice tip:** These announcements repeat the same handful of sentence patterns constantly — once you've heard a few, you'll start predicting what comes next, which is exactly the skill the exam rewards.`,
      },
      {
        slug: "listening-tone",
        title: "Listening for tone and emotion",
        summary: "Recognising politeness, urgency and hesitation in spoken Dutch.",
        minutes: 9,
        content: `## It's not just what is said — it's how

Some listening exam questions ask about a speaker's *feeling* or *intention*, not just facts. Dutch speakers signal tone in fairly recognisable ways.

### Politeness and hedging
Dutch, despite its reputation for directness, uses softening words in service situations:
- "Zou u misschien..." — "Would you perhaps..." (a polite request)
- "Het spijt me, maar..." — "I'm sorry, but..." (a polite refusal is coming)
- "Helaas..." — "Unfortunately..." (signals bad news follows)

### Urgency
- A faster speaking pace, combined with words like *nu meteen* (right now) or *dringend* (urgent), signals real urgency — for example in a medical or safety context.

### Hesitation or uncertainty
- "Ik weet het niet zeker, maar..." — "I'm not sure, but..."
- "Misschien..." — "Maybe..."
- A speaker trailing off or using "eh..." (um...) often signals they are unsure or thinking.

> **Exam tip:** If a question asks "how does the speaker feel?" or "what does the speaker want?", listen for these tone signals rather than searching for one exact keyword — the answer is often about *how* something is said.`,
      },
    ],
    vocabulary: [
      { dutch: "de vertraging", english: "the delay", exampleNl: "De trein heeft een vertraging van tien minuten.", exampleEn: "The train has a delay of ten minutes." },
      { dutch: "het perron", english: "the platform", exampleNl: "De trein vertrekt van perron 2.", exampleEn: "The train departs from platform 2." },
      { dutch: "de aankomst", english: "the arrival", exampleNl: "Wat is de aankomsttijd?", exampleEn: "What is the arrival time?" },
      { dutch: "het vertrek", english: "the departure", exampleNl: "Het vertrek is om acht uur.", exampleEn: "The departure is at eight o'clock." },
      { dutch: "het weerbericht", english: "the weather forecast", exampleNl: "Heb je het weerbericht gehoord?", exampleEn: "Did you hear the weather forecast?" },
      { dutch: "bewolkt", english: "cloudy", exampleNl: "Morgen is het bewolkt.", exampleEn: "Tomorrow it will be cloudy." },
      { dutch: "zonnig", english: "sunny", exampleNl: "Het wordt een zonnige dag.", exampleEn: "It will be a sunny day." },
      { dutch: "druk", english: "busy / crowded", exampleNl: "Het station is erg druk vandaag.", exampleEn: "The station is very busy today." },
      { dutch: "rustig", english: "quiet / calm", exampleNl: "De trein was rustig, bijna leeg.", exampleEn: "The train was quiet, almost empty." },
      { dutch: "herhalen", english: "to repeat", exampleNl: "Kunt u dat nog een keer herhalen?", exampleEn: "Can you repeat that once more?" },
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
        {
          prompt: "In a train announcement, what does 'perron' mean?",
          explanation: "'Perron' means 'platform' — the place where you board the train.",
          options: ["Platform", "Ticket", "Delay", "Driver"],
        },
        {
          prompt: "If a speaker says 'Het spijt me, maar...', what usually follows?",
          explanation: "'Het spijt me, maar...' ('I'm sorry, but...') signals a polite refusal or bad news is coming.",
          options: [
            "A polite refusal or piece of bad news",
            "An enthusiastic yes",
            "A joke",
            "A phone number",
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
      {
        slug: "speaking-work-routine",
        title: "Talking about work and your daily routine",
        summary: "A ready-made vocabulary set for one of the most common exam topics.",
        minutes: 10,
        content: `## Describing your day

"Tell me about your daily routine" is one of the most predictable speaking exam questions — which means it's one of the easiest to prepare for in advance.

### A simple daily routine script
\`\`\`
Ik sta meestal om zeven uur op. Ik ontbijt en dan ga ik naar mijn werk.
Ik werk als [beroep] bij [bedrijf]. 's Middags eet ik met mijn collega's.
Na mijn werk ga ik naar huis en kook ik. 's Avonds kijk ik televisie of
ik leer Nederlands.
\`\`\`

### Useful time markers
| Dutch | Meaning |
|---|---|
| 's ochtends | in the morning |
| 's middags | in the afternoon |
| 's avonds | in the evening |
| meestal | usually |
| daarna | after that |
| eerst... dan... | first... then... |

### Talking about work specifically
- "Ik werk als [job title]." — "I work as a [job title]."
- "Ik werk fulltime / parttime." — "I work full-time / part-time."
- "Mijn collega's zijn aardig." — "My colleagues are nice."

> **Practice tip:** Write out your own real daily routine using this script, then say it out loud three times until it feels automatic — you'll likely be asked a version of this question in the real exam.`,
      },
      {
        slug: "speaking-small-talk",
        title: "Making small talk like a local",
        summary: "Weather, weekends, and the untranslatable word 'gezellig'.",
        minutes: 9,
        content: `## Small talk, Dutch style

Dutch small talk (een praatje maken) is shorter and more direct than in many cultures, but it still follows predictable patterns — useful both for the exam and for daily life.

### The weather — always a safe topic
- "Wat een mooi weer, hè?" — "Lovely weather, isn't it?"
- "Zeg, wat regent het hard!" — "Wow, it's really raining hard!"

### Asking about someone's weekend
- "Heb je een leuk weekend gehad?" — "Did you have a nice weekend?"
- "Wat ga je dit weekend doen?" — "What are you going to do this weekend?"

### The word every learner should know: gezellig
*Gezellig* has no direct English translation — it describes a warm, cosy, sociable feeling. A crowded, friendly café is *gezellig*. A pleasant evening with friends is *gezellig*. Dutch people use this word constantly, and using it naturally yourself is a strong sign of cultural fluency.

- "Wat gezellig hier!" — "What a nice, cosy atmosphere here!"
- "Het was gezellig gisteren." — "It was pleasant/fun yesterday."

> **Exam tip:** Examiners like to hear natural social phrases like these — they show you can function socially in Dutch, not just answer direct questions.`,
      },
    ],
    vocabulary: [
      { dutch: "de baan", english: "the job", exampleNl: "Ik heb een nieuwe baan gevonden.", exampleEn: "I found a new job." },
      { dutch: "de collega", english: "the colleague", exampleNl: "Mijn collega's zijn erg aardig.", exampleEn: "My colleagues are very nice." },
      { dutch: "dagelijks", english: "daily", exampleNl: "Dit is mijn dagelijkse routine.", exampleEn: "This is my daily routine." },
      { dutch: "de ochtend", english: "the morning", exampleNl: "'s Ochtends drink ik koffie.", exampleEn: "In the morning I drink coffee." },
      { dutch: "de avond", english: "the evening", exampleNl: "'s Avonds leer ik Nederlands.", exampleEn: "In the evening I study Dutch." },
      { dutch: "het weekend", english: "the weekend", exampleNl: "Wat doe je dit weekend?", exampleEn: "What are you doing this weekend?" },
      { dutch: "de vrije tijd", english: "free time", exampleNl: "In mijn vrije tijd lees ik graag.", exampleEn: "In my free time I like to read." },
      { dutch: "de hobby", english: "the hobby", exampleNl: "Wat is jouw hobby?", exampleEn: "What is your hobby?" },
      { dutch: "gezellig", english: "cosy / pleasant (untranslatable Dutch feeling)", exampleNl: "Het was heel gezellig gisteren.", exampleEn: "It was really nice and cosy yesterday." },
      { dutch: "een praatje maken", english: "to make small talk", exampleNl: "Ik maak graag een praatje met de buren.", exampleEn: "I like to make small talk with the neighbours." },
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
        {
          prompt: "What does 'gezellig' describe?",
          explanation: "'Gezellig' is a uniquely Dutch word describing a warm, cosy, sociable atmosphere.",
          options: [
            "A warm, cosy, sociable feeling or atmosphere",
            "A type of Dutch food",
            "An official government document",
            "A grammar rule about verbs",
          ],
        },
        {
          prompt: "Which phrase would you use to ask about someone's weekend?",
          explanation: "'Heb je een leuk weekend gehad?' is a natural, common small-talk question.",
          options: [
            "Heb je een leuk weekend gehad?",
            "Wat is uw burgerlijke staat?",
            "Kunt u dit formulier invullen?",
            "Wat is de postcode?",
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
      {
        slug: "knm-history-culture",
        title: "Dutch history and culture essentials",
        summary: "The Golden Age, water management, WWII, and national holidays.",
        minutes: 16,
        content: `## History that shapes daily life today

You don't need a full history degree for the KNM exam, but a handful of well-known events and facts come up repeatedly because they explain *why* Dutch society works the way it does today.

### Water and the land
A large part of the Netherlands lies below sea level — the word "Nederland" literally means "low country." The Dutch have managed water for centuries using **dijken** (dikes), **polders** (reclaimed land), and pumping systems (historically windmills, today electric pumps). The **Watersnoodramp** (flood disaster) of 1953 killed over 1,800 people and led to the **Deltawerken** (Delta Works), a massive modern flood-defence system.

### The Gouden Eeuw (Golden Age)
In the 17th century, the Dutch Republic became a major global trading power, with Amsterdam as a wealthy trade hub. This period produced famous painters like Rembrandt and Vermeer, and also the Dutch East India Company (VOC) — a period with significant historical complexity, including colonialism, that is increasingly discussed openly today.

### World War II
The Netherlands was occupied by Nazi Germany from 1940 to 1945. **Bevrijdingsdag** (Liberation Day, 5 May) commemorates the end of the occupation, and **Dodenherdenking** (Remembrance Day, 4 May) honours those who died. Anne Frank's diary, written while hiding in Amsterdam, is one of the most well-known accounts of this period worldwide.

### National holidays worth knowing
| Dutch | English | When |
|---|---|---|
| Koningsdag | King's Day | 27 April |
| Bevrijdingsdag | Liberation Day | 5 May |
| Sinterklaas | St. Nicholas' Eve | 5 December |
| Kerstmis | Christmas | 25-26 December |`,
      },
      {
        slug: "knm-values-daily-life",
        title: "Dutch values, norms and daily life",
        summary: "Directness, punctuality, cycling culture and equality.",
        minutes: 13,
        content: `## Cultural norms that surprise newcomers

The KNM exam often tests whether you understand common Dutch social norms — not because there's one "correct" culture, but because understanding these norms helps you navigate daily interactions confidently.

### Directness (directheid)
Dutch communication style is often very direct compared to many other cultures. A Dutch person might say "no" plainly, or give blunt feedback, without intending to be rude — this is simply considered honest and efficient, not impolite.

### Punctuality (stiptheid)
Being on time for appointments — including doctor's appointments, work meetings, and even social visits — is taken seriously. Being more than a few minutes late without notice is generally considered impolite.

### Fietscultuur (cycling culture)
Cycling is a core part of Dutch daily life, used for commuting, shopping, and school runs by people of all ages — not primarily a sport or hobby. Understanding basic cycling rules (staying right, using hand signals, respecting bike paths) is practically important, not just cultural trivia.

### Equality and tolerance
Dutch law strongly protects equal treatment regardless of gender, sexuality, religion, or origin (this is enshrined in Article 1 of the **Grondwet**, the Dutch constitution). The Netherlands was the first country in the world to legalise same-sex marriage, in 2001.

### Key vocabulary
| Dutch | English |
|---|---|
| Directheid | Directness |
| Stiptheid | Punctuality |
| Gelijkheid | Equality |
| Tolerantie | Tolerance |
| Grondwet | Constitution |`,
      },
    ],
    vocabulary: [
      { dutch: "de Koning", english: "the King", exampleNl: "De Koning woont in Den Haag.", exampleEn: "The King lives in The Hague." },
      { dutch: "de gemeente", english: "the municipality", exampleNl: "Ik moet naar de gemeente voor mijn paspoort.", exampleEn: "I need to go to the municipality for my passport." },
      { dutch: "de dijk", english: "the dike", exampleNl: "De dijk beschermt het land tegen water.", exampleEn: "The dike protects the land against water." },
      { dutch: "de polder", english: "the polder (reclaimed land)", exampleNl: "Veel Nederlandse steden liggen in een polder.", exampleEn: "Many Dutch cities lie in a polder." },
      { dutch: "de fiets", english: "the bicycle", exampleNl: "Ik ga met de fiets naar mijn werk.", exampleEn: "I go to work by bicycle." },
      { dutch: "Koningsdag", english: "King's Day", exampleNl: "Op Koningsdag draagt iedereen oranje.", exampleEn: "On King's Day everyone wears orange." },
      { dutch: "Bevrijdingsdag", english: "Liberation Day", exampleNl: "Bevrijdingsdag is op 5 mei.", exampleEn: "Liberation Day is on 5 May." },
      { dutch: "de gelijkheid", english: "equality", exampleNl: "Gelijkheid staat in de Grondwet.", exampleEn: "Equality is written in the Constitution." },
      { dutch: "de belasting", english: "the tax", exampleNl: "Ik betaal elk jaar belasting.", exampleEn: "I pay tax every year." },
      { dutch: "de verzekering", english: "the insurance", exampleNl: "Iedereen heeft een zorgverzekering nodig.", exampleEn: "Everyone needs health insurance." },
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
        {
          prompt: "What event does Bevrijdingsdag (5 May) commemorate?",
          explanation: "Bevrijdingsdag celebrates the liberation of the Netherlands from Nazi occupation at the end of World War II.",
          options: [
            "The end of Nazi occupation in 1945",
            "The founding of the monarchy",
            "The start of the Golden Age",
            "A national cycling day",
          ],
        },
        {
          prompt: "Which best describes typical Dutch communication style?",
          explanation: "Dutch communication is often very direct — this is generally considered honest and efficient, not rude.",
          options: [
            "Direct and honest, even when giving critical feedback",
            "Always indirect to avoid conflict",
            "Silent and reserved in all situations",
            "Focused only on formal written communication",
          ],
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

    await prisma.vocabularyItem.deleteMany({ where: { moduleId: moduleRecord.id } });
    for (let v = 0; v < m.vocabulary.length; v++) {
      const item = m.vocabulary[v];
      await prisma.vocabularyItem.create({
        data: {
          moduleId: moduleRecord.id,
          dutch: item.dutch,
          english: item.english,
          exampleNl: item.exampleNl,
          exampleEn: item.exampleEn,
          order: v,
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

    console.log(
      `  ✓ ${m.title}: ${m.lessons.length} lessons, ${m.vocabulary.length} vocab items, ${m.quiz.questions.length} quiz questions`
    );
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
