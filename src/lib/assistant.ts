export const ASSISTANT_SYSTEM_PROMPT = `You are the IntegreerNL study assistant, a friendly Dutch tutor for adult beginners (roughly A0-A2) who live, work or study in the Netherlands.

Rules:
- Keep answers short, simple and encouraging. The learner is a beginner and may be tired after work.
- Explain in English, with Dutch examples. Always give at least one example sentence in Dutch with its English translation.
- Focus on everyday, practical Dutch: shops, cafes, neighbours, colleagues, appointments, getting around.
- Do not assume the learner is preparing for the inburgering exam. If they ask about it, say plainly that this platform is not built for exam preparation and point them to inburgeren.nl.
- Say when you are unsure. Never invent legal, financial or immigration facts.`;

interface KeywordReply {
  keywords: string[];
  reply: string;
}

/**
 * Pre-written answers used when no language-model key is configured.
 *
 * EVIDENCE STATUS: design hypothesis. These topics are my guess at what
 * beginners ask most; the interviews (Analysis ch. 8) have not happened yet.
 * Which questions learners actually bring is worth measuring — the stored
 * ChatMessage rows give a cheap way to look at that later.
 */
const FALLBACK_LIBRARY: KeywordReply[] = [
  {
    keywords: ["hebben", "zijn", "auxiliary", "hulpwerkwoord"],
    reply:
      "Good question. In the perfect tense most Dutch verbs use **hebben**, but verbs of movement or a change of state usually take **zijn**.\n\n- *Ik heb gewerkt.* (I have worked — hebben)\n- *Ik ben gegaan.* (I have gone — zijn, because it is movement)\n\nRule of thumb: if the verb describes moving from A to B, or becoming something, try **zijn** first.",
  },
  {
    keywords: ["de", "het", "lidwoord", "article"],
    reply:
      "Dutch has two words for *the*: **de** and **het**. There is no reliable rule, but plurals always use *de* (de huizen) and most -je words use *het* (het huisje). The practical advice: learn the article together with the word, so \"de tafel\" and \"het huis\" as one unit.",
  },
  {
    keywords: ["u ", "jij", "beleefd", "formal", "polite", "informal"],
    reply:
      "**u** is the polite form, **jij/je** is informal.\n\nUse **u** with staff in shops, doctors, older people and strangers. Use **jij** with friends, and usually with colleagues your own age.\n\n- *Wilt u koffie?* (polite)\n- *Wil je koffie?* (informal)\n\nIf you are unsure, **u** is the safe choice — nobody is offended by it.",
  },
  {
    keywords: ["geen", "niet", "negation", "ontkenning"],
    reply:
      "Both mean *not*, but they are used differently.\n\n- **geen** goes before a noun: *Ik wil geen suiker.* (I do not want sugar.)\n- **niet** is for everything else: *Ik begrijp het niet.* (I do not understand it.)\n\nIf the next word is a thing, use **geen**.",
  },
  {
    keywords: ["bestellen", "koffie", "coffee", "cafe", "order", "restaurant"],
    reply:
      "The usual way to order is **Ik wil graag…** followed by what you want, then **alstublieft**.\n\n- *Ik wil graag een koffie, alstublieft.*\n\nIf they ask how you are paying, **met pin** means by debit card, which is the normal way in the Netherlands. There is a full practice conversation for this under Practice.",
  },
  {
    keywords: ["winkel", "supermarkt", "shop", "supermarket", "boodschappen"],
    reply:
      "Two phrases do most of the work in a shop:\n\n- *Waar kan ik … vinden?* (Where can I find …?)\n- *Heeft u …?* (Do you have …?)\n\nAt the till you will often hear *Wilt u de bon?* — do you want the receipt. **Ja, graag** or **Nee, dank u** both work.",
  },
  {
    keywords: ["oefenen", "practice", "spreken", "speak", "gesprek", "english"],
    reply:
      "The hardest part is usually that people switch to English the moment they hear an accent. One thing that helps is opening in Dutch yourself and saying *Ik leer Nederlands, mag ik het in het Nederlands proberen?* (I am learning Dutch, may I try in Dutch?). Most people are happy to play along.",
  },
  {
    keywords: ["inburgering", "exam", "examen", "duo", "b1"],
    reply:
      "This platform is not built for the inburgering exam — it focuses on everyday Dutch for beginners, which is a different level and different content. For anything official about the exam, registration or fees, use inburgeren.nl or contact DUO directly.",
  },
];

const GENERIC_FALLBACKS = [
  "Good question. Can you tell me a bit more? For example, is it about a word, a grammar point, or a situation you were in?",
  "I want to give you something useful here. Try asking about something specific — \"when do I use u or jij\", or \"how do I order a coffee\" — and I will walk you through it with examples.",
];

export function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();

  for (const entry of FALLBACK_LIBRARY) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.reply;
    }
  }

  const hash = Array.from(message).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GENERIC_FALLBACKS[hash % GENERIC_FALLBACKS.length];
}

export async function callOpenAI(
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...history],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}
